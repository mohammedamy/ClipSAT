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

const ch01 = {
  id: 'ol-algebraic-techniques',
  chapterNumber: '1',
  railGroupLabel: bi('I · Core Olympiad Pillars', 'أولاً · المحاور الأولمبية العالمية'),
  subsectionBanner: SUBSEC_1,
  title: bi(
    "Olympiad Algebra: Symmetric Polynomials, Vieta's Relations & Classical Inequalities",
    'الجبر الأولمبي: كثيرات الحدود المتماثلة وعلاقات فييتا والمتباينات الكلاسيكية'
  ),
  railLabel: bi('Algebra, Vieta & Inequalities', 'الجبر وعلاقات فييتا والمتباينات'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '🏆',
    category: 'Core Pillar 1 — Olympiad Algebra & Inequalities',
    badges: [{ text: 'IMO · NSMO · KAUST KMC', className: 'tier-e' }],
    topics: [
      "Vieta's formulas & Newton–Girard power sums",
      "Sophie Germain & Gauss cyclic cubic identity",
      'AM–GM–HM & Cauchy–Schwarz (Titu Lemma)',
      'Telescoping sums & products',
      'Polynomial Remainder & Factor Theorems'
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'Olympiad algebra replaces brute-force root-finding with <strong>structural symmetry</strong>, <strong>non-trivial factorizations</strong>, and <strong>classical inequalities</strong>. Whether tackling an NSMO National Finals proof, a KAUST Mathematics Competition (KMC) tie-breaker, or an AIME qualifier, mastering Vieta–Newton recurrences, Sophie Germain factorizations, and Cauchy–Schwarz / AM–GM equality conditions allows you to evaluate high-degree expressions and sharp extrema without ever solving for individual roots.',
          'يرتكز الجبر الأولمبي على استبدال الحسابات المطوّلة وإيجاد الجذور الصريحة بـ<strong>التناظر البنيوي</strong> و<strong>التحليلات الجبرية غير التقليدية</strong> و<strong>المتباينات الكلاسيكية</strong>. سواء في التصفيات النهائية لأولمبياد «نسما» الوطني (NSMO)، أو مسابقة كاوست للرياضيات (KMC)، أو اختبارات AMC/AIME، يمنحك إتقان علاقات فييتا-نيوتن ومتطابقة صوفي جيرمان ومتباينتَي AM–GM وكوشي-شوارتز القدرة على حسم المسائل ذات الدرجات العليا بدقة وبرهان محكم.'
        )
      },
      {
        kind: 'syllabusMap',
        title: '📊 Mathematical Olympiad Track — Complete 3-Subsection Blueprint (Core · NSMO KSA · KAUST KMC)',
        rows: [
          {
            topic: 'Subsection I (Ch 1–3) · Core Olympiad Algebra, Modular Number Theory & Diophantine SFFT',
            barPercent: 28,
            pctText: '~28%',
            tags: [{ text: 'CORE PILLARS', className: 'sat-tag', style: 'font-size:11px' }]
          },
          {
            topic: 'Subsection I (Ch 4–5) · Bijective Combinatorics, PIE, Pigeonhole & Recurrence States',
            barPercent: 20,
            pctText: '~20%',
            tags: [{ text: 'CORE PILLARS', className: 'sat-tag', style: 'font-size:11px' }]
          },
          {
            topic: 'Subsection I (Ch 6–8) · Circle Power, Ceva/Stewart Geometry, Invariants & Games',
            barPercent: 22,
            pctText: '~22%',
            tags: [{ text: 'CORE PILLARS', className: 'sat-tag', style: 'font-size:11px' }]
          },
          {
            topic: 'Subsection II (Ch 9–10) · NSMO of KSA (Mawhiba Stages 1–3 & Saudi IMO Team Pathway)',
            barPercent: 15,
            pctText: '~15%',
            tags: [{ text: 'NSMO KSA · نسما', className: 'sat-tag', style: 'font-size:11px' }]
          },
          {
            topic: 'Subsection III (Ch 11–12) · KAUST Mathematics Competition (KMC) & KAUST Academy Finals',
            barPercent: 15,
            pctText: '~15%',
            tags: [{ text: 'KAUST KMC', className: 'sat-tag', style: 'font-size:11px' }]
          }
        ],
        note: 'Aligned with Mawhiba NSMO (Kingdom of Saudi Arabia), KAUST Mathematics Competition (KMC), MAA AMC 10/12 & AIME, and IMO syllabus pillars.'
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          "● Definition 1.1 — Vieta's Relations & Newton–Girard Power Sums",
          '● تعريف 1.1 — علاقات فييتا ومجاميع قوى الجذور لنيوتن-جيرارد'
        ),
        body: bi(
          "<p>Let \\( P(x) = a_n x^n + a_{n-1}x^{n-1} + \\cdots + a_1 x + a_0 \\) (\\( a_n \\ne 0 \\)) have complex roots \\( r_1, r_2, \\dots, r_n \\) counted with multiplicity. Elementary symmetric polynomials \\( e_k \\) satisfy <strong>Vieta's Formulas</strong>:</p>\\[ e_1 = \\sum_{i=1}^n r_i = -\\frac{a_{n-1}}{a_n}, \\qquad e_2 = \\sum_{1 \\le i < j \\le n} r_i r_j = \\frac{a_{n-2}}{a_n}, \\qquad e_n = r_1 r_2 \\cdots r_n = (-1)^n \\frac{a_0}{a_n}. \\]<p>Defining the \\( k \\)-th power sum \\( p_k = r_1^k + r_2^k + \\cdots + r_n^k \\), <strong>Newton's Identities</strong> give \\( p_1 = e_1 \\), \\( p_2 = e_1^2 - 2e_2 \\), and for a cubic \\( x^3 - e_1 x^2 + e_2 x - e_3 = 0 \\):</p>\\[ p_3 = e_1 p_2 - e_2 p_1 + 3e_3, \\qquad p_k = e_1 p_{k-1} - e_2 p_{k-2} + e_3 p_{k-3} \\quad (k \\ge 3). \\]",
          '<p>لتكن \\( P(x) = a_n x^n + a_{n-1}x^{n-1} + \\cdots + a_1 x + a_0 \\) (حيث \\( a_n \\ne 0 \\)) كثيرة حدود جذورها \\( r_1, r_2, \\dots, r_n \\) مع احتساب التكرار. تربط <strong>علاقات فييتا</strong> كثيرات الحدود المتماثلة الابتدائية \\( e_k \\) بالمعاملات مباشرةً:</p>\\[ e_1 = \\sum_{i=1}^n r_i = -\\frac{a_{n-1}}{a_n}, \\qquad e_2 = \\sum_{1 \\le i < j \\le n} r_i r_j = \\frac{a_{n-2}}{a_n}, \\qquad e_n = r_1 r_2 \\cdots r_n = (-1)^n \\frac{a_0}{a_n}. \\]<p>وبتعريف مجموع القوى \\( p_k = r_1^k + r_2^k + \\cdots + r_n^k \\)، تعطي <strong>متطابقات نيوتن</strong> \\( p_1 = e_1 \\) و\\( p_2 = e_1^2 - 2e_2 \\)، وللمعادلة التكعيبية \\( x^3 - e_1 x^2 + e_2 x - e_3 = 0 \\):</p>\\[ p_3 = e_1 p_2 - e_2 p_1 + 3e_3, \\qquad p_k = e_1 p_{k-1} - e_2 p_{k-2} + e_3 p_{k-3} \\quad (k \\ge 3). \\]'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          "● Theorem 1.2 — AM–GM–HM Chain, Cauchy–Schwarz & Titu's Lemma",
          '● مبرهنة 1.2 — سلسلة المتباينات AM–GM–HM وكوشي-شوارتز وتيتو'
        ),
        body: bi(
          "<p><strong>1. AM–GM–HM Chain:</strong> For positive reals \\( x_1, x_2, \\dots, x_n > 0 \\),</p>\\[ \\frac{x_1 + x_2 + \\cdots + x_n}{n} \\ge \\sqrt[n]{x_1 x_2 \\cdots x_n} \\ge \\frac{n}{\\frac{1}{x_1} + \\frac{1}{x_2} + \\cdots + \\frac{1}{x_n}}, \\]<p>with equality if and only if \\( x_1 = x_2 = \\cdots = x_n \\).</p><p><strong>2. Cauchy–Schwarz &amp; Titu's Lemma (Engel Form):</strong> For any reals \\( a_i \\) and positive reals \\( x_i > 0 \\),</p>\\[ \\left(\\sum_{i=1}^n a_i^2\\right)\\left(\\sum_{i=1}^n b_i^2\\right) \\ge \\left(\\sum_{i=1}^n a_i b_i\\right)^2 \\implies \\sum_{i=1}^n \\frac{a_i^2}{x_i} \\ge \\frac{(a_1 + a_2 + \\cdots + a_n)^2}{x_1 + x_2 + \\cdots + x_n}, \\]<p>with equality in Titu's Lemma if and only if \\( \\frac{a_1}{x_1} = \\frac{a_2}{x_2} = \\cdots = \\frac{a_n}{x_n} \\).</p>",
          '<p><strong>1. سلسلة الأوساط (الحسابي–الهندسي–التوافقي):</strong> لأي أعداد حقيقية موجبة \\( x_1, x_2, \\dots, x_n > 0 \\):</p>\\[ \\frac{x_1 + x_2 + \\cdots + x_n}{n} \\ge \\sqrt[n]{x_1 x_2 \\cdots x_n} \\ge \\frac{n}{\\frac{1}{x_1} + \\frac{1}{x_2} + \\cdots + \\frac{1}{x_n}}, \\]<p>وتتحقق المساواة إذا وفقط إذا كان \\( x_1 = x_2 = \\cdots = x_n \\).</p><p><strong>2. متباينة كوشي-شوارتز ولمّة تيتو (صيغة إنغل):</strong> لأي أعداد حقيقية \\( a_i \\) وأعداد موجبة \\( x_i > 0 \\):</p>\\[ \\left(\\sum_{i=1}^n a_i^2\\right)\\left(\\sum_{i=1}^n b_i^2\\right) \\ge \\left(\\sum_{i=1}^n a_i b_i\\right)^2 \\implies \\sum_{i=1}^n \\frac{a_i^2}{x_i} \\ge \\frac{(a_1 + a_2 + \\cdots + a_n)^2}{x_1 + x_2 + \\cdots + x_n}, \\]<p>وتتحقق المساواة في لمّة تيتو إذا وفقط إذا كان \\( \\frac{a_1}{x_1} = \\frac{a_2}{x_2} = \\cdots = \\frac{a_n}{x_n} \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          "◆ Proof — Sophie Germain's Factorization & Titu's Lemma from Non-Negative Squares",
          '◆ البرهان الأولمبي — متطابقة صوفي جيرمان واشتقاق لمّة تيتو من مجموع المربعات'
        ),
        body: bi(
          "<p><strong>1. Sophie Germain's Identity:</strong> Instead of completing the square by subtracting the constant, complete the square across the middle term \\( +4a^2b^2 \\):</p>\\[ a^4 + 4b^4 = (a^4 + 4a^2b^2 + 4b^4) - 4a^2b^2 = (a^2 + 2b^2)^2 - (2ab)^2 = (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2). \\]<p><strong>2. Titu's Lemma Proof:</strong> Set \\( u_i = \\frac{a_i}{\\sqrt{x_i}} \\) and \\( v_i = \\sqrt{x_i} \\) in Cauchy–Schwarz (which itself follows from \\( \\sum_{i<j}(u_i v_j - u_j v_i)^2 \\ge 0 \\)):</p>\\[ \\left(\\sum_{i=1}^n \\frac{a_i^2}{x_i}\\right)\\left(\\sum_{i=1}^n x_i\\right) \\ge \\left(\\sum_{i=1}^n \\frac{a_i}{\\sqrt{x_i}}\\sqrt{x_i}\\right)^2 = \\left(\\sum_{i=1}^n a_i\\right)^2. \\qquad \\blacksquare \\]",
          '<p><strong>1. متطابقة صوفي جيرمان:</strong> بدلاً من إكمال المربع التقليدي، نضيف ونطرح الحد الأوسط \\( 4a^2b^2 \\) للحصول على فرق بين مربعين:</p>\\[ a^4 + 4b^4 = (a^4 + 4a^2b^2 + 4b^4) - 4a^2b^2 = (a^2 + 2b^2)^2 - (2ab)^2 = (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2). \\]<p><strong>2. برهان لمّة تيتو:</strong> نضع \\( u_i = \\frac{a_i}{\\sqrt{x_i}} \\) و\\( v_i = \\sqrt{x_i} \\) في متباينة كوشي-شوارتز (التي تنتج من متطابقة لاغرانج \\( \\sum_{i<j}(u_i v_j - u_j v_i)^2 \\ge 0 \\)):</p>\\[ \\left(\\sum_{i=1}^n \\frac{a_i^2}{x_i}\\right)\\left(\\sum_{i=1}^n x_i\\right) \\ge \\left(\\sum_{i=1}^n \\frac{a_i}{\\sqrt{x_i}}\\sqrt{x_i}\\right)^2 = \\left(\\sum_{i=1}^n a_i\\right)^2. \\qquad \\blacksquare \\]'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'Essential Olympiad Algebraic Factorizations & Inequality Signatures',
          'الجدول المرجعي للتحليلات الجبرية الأولمبية والمتباينات القياسية'
        ),
        columns: [
          bi('Name / Tool', 'الأداة / المتطابقة'),
          bi('Canonical Olympiad Form', 'الصيغة الرياضية المعتمدة'),
          bi('Contest Trigger', 'متى نستخدمها في المسابقات؟')
        ],
        rows: [
          [
            bi('Gauss Cyclic Cubic', 'متطابقة غاوس التكعيبية الدورية'),
            bi('\\(a^3+b^3+c^3-3abc = \\frac{1}{2}(a+b+c)[(a-b)^2+(b-c)^2+(c-a)^2]\\)', '\\(a^3+b^3+c^3-3abc = \\frac{1}{2}(a+b+c)[(a-b)^2+(b-c)^2+(c-a)^2]\\)'),
            bi('Whenever \\(a+b+c=0\\) or \\(a^3+b^3+c^3=3abc\\)', 'عندما يكون \\(a+b+c=0\\) أو \\(a^3+b^3+c^3=3abc\\)')
          ],
          [
            bi('Sophie Germain', 'متطابقة صوفي جيرمان'),
            bi('\\(a^4 + 4b^4 = (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2)\\)', '\\(a^4 + 4b^4 = (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2)\\)'),
            bi('Primality of \\(n^4+4^n\\) and telescoping quartic products', 'اختبار أولية \\(n^4+4^n\\) والجداءات التلسكوبية من الدرجة الرابعة')
          ],
          [
            bi("Nesbitt's Inequality", 'متباينة نيسبيت الشهيرة'),
            bi('\\(\\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b} \\ge \\frac{3}{2}\\) for \\(a,b,c>0\\)', '\\(\\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b} \\ge \\frac{3}{2}\\) لكل \\(a,b,c>0\\)'),
            bi('Cyclic rational sums; rewrite \\(\\frac{a}{b+c} = \\frac{a^2}{ab+ac}\\) + Titu', 'المجاميع الكسرية الدورية؛ تُكتب \\(\\frac{a^2}{ab+ac}\\) وتُحسم بلمّة تيتو')
          ],
          [
            bi('Telescoping Product', 'الجداء التلسكوبي للكسور'),
            bi('\\(\\prod_{k=2}^n \\left(1 - \\frac{1}{k^2}\\right) = \\prod_{k=2}^n \\frac{(k-1)(k+1)}{k^2} = \\frac{n+1}{2n}\\)', '\\(\\prod_{k=2}^n \\left(1 - \\frac{1}{k^2}\\right) = \\prod_{k=2}^n \\frac{(k-1)(k+1)}{k^2} = \\frac{n+1}{2n}\\)'),
            bi('Long products with difference-of-squares or factorial cancellation', 'الجداءات الطويلة القابلة للتحليل إلى فرق مربعين واختصار الحدود المتتالية')
          ]
        ]
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('Reciprocal Power Recurrence', 'علاقة القوى المتبادلة'),
            value: bi('If \\(x + \\frac{1}{x} = s\\), then \\(x^n + x^{-n} = s(x^{n-1}+x^{1-n}) - (x^{n-2}+x^{2-n})\\)', 'إذا كان \\(x + \\frac{1}{x} = s\\) فإن \\(x^n + x^{-n} = s(x^{n-1}+x^{1-n}) - (x^{n-2}+x^{2-n})\\)')
          },
          {
            label: bi('AM–GM Equality Lock', 'شرط المساواة في AM–GM'),
            value: bi('Minimum exists ONLY if \\(x_1 = x_2 = \\dots = x_n\\) is attainable on the domain!', 'لا تتحقق القيمة الصغرى إلا إذا أمكن مساواة جميع الحدود المطبّق عليها داخل المجال')
          },
          {
            label: bi('Polynomial Remainder Trick', 'حيلة باقي القسمة لكثيرات الحدود'),
            value: bi('If \\(P(k)=c\\) for \\(k=1,\\dots,d\\), write \\(P(x)-c = A\\prod_{k=1}^d(x-k)\\)', 'إذا كان \\(P(k)=c\\) عند \\(d\\) قيماً، نكتب \\(P(x)-c = A\\prod_{k=1}^d(x-k)\\)')
          },
          {
            label: bi('Titu Sum Lower Bound', 'الحد الأدنى عبر لمّة تيتو'),
            value: bi('\\(\\frac{a^2}{x} + \\frac{b^2}{y} + \\frac{c^2}{z} \\ge \\frac{(a+b+c)^2}{x+y+z}\\)', '\\(\\frac{a^2}{x} + \\frac{b^2}{y} + \\frac{c^2}{z} \\ge \\frac{(a+b+c)^2}{x+y+z}\\)')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'AM–GM Convexity & Reciprocal Sum f(x) = x + 4/x (Minimum = 4 at x = 2)',
          xrange: [0.3, 6.5],
          yrange: [0, 9.5],
          fns: [
            { fn: 'x + 4/x', color: 'var(--fig-indigo)', label: 'f(x) = x + 4/x' },
            { fn: '4', color: 'var(--fig-amber)', dash: '4,4', label: 'AM–GM bound y = 4' }
          ],
          points: [{ x: 2, y: 4, label: 'Equality (2, 4)' }]
        },
        caption: bi(
          'Geometric visualization of AM–GM on \\(f(x) = x + \\frac{4}{x}\\) for \\(x > 0\\): the curve stays strictly above \\(y = 2\\sqrt{x \\cdot (4/x)} = 4\\) except at the unique equality point \\(x = \\frac{4}{x} \\iff x = 2\\).',
          'التمثيل الهندسي لمتباينة AM–GM على الدالة \\(f(x) = x + \\frac{4}{x}\\) لكل \\(x > 0\\): يظل المنحنى فوق المستقيم \\(y = 4\\) ويلمسه حصراً عند نقطة المساواة الوحيدة \\(x = 2\\).'
        )
      },
      makeExplorerBlock({
        canvasId: 'olalgebraictechniquesExCanvas',
        titleEn: "⊙ Explorer · Vieta's Cubic/Quadratic Power Sums & AM–GM Envelope Lab",
        titleAr: '⊙ مستكشف تفاعلي · مختبر مجاميع قوى فييتا-نيوتن وغلاف متباينة AM–GM',
        ariaEn: "Interactive Olympiad Algebra canvas plotting monic quadratic roots, symmetric power sums, and AM-GM equality bounds.",
        ariaAr: 'لوحة تفاعلية للجبر الأولمبي تعرض جذور كثيرة الحدود والمجاميع المتماثلة لقوى الجذور وحدود متباينة AM–GM.',
        captionEn: 'Live Vieta elementary symmetric polynomials and Newton power sums \\(p_1, p_2, p_3\\)',
        captionAr: 'جدول حي لقيم كثيرات الحدود المتماثلة ومجاميع قوى نيوتن \\(p_1, p_2, p_3\\)',
        s0LabelEn: 'Root <b>\\(r_1 =\\)</b>',
        s0LabelAr: 'الجذر الأول <b>\\(r_1 =\\)</b>',
        s0Min: -4, s0Max: 4, s0Val: 1, s0Step: 0.5,
        s0AriaEn: 'First polynomial root r1', s0AriaAr: 'الجذر الأول r1',
        s1LabelEn: 'Root <b>\\(r_2 =\\)</b>',
        s1LabelAr: 'الجذر الثاني <b>\\(r_2 =\\)</b>',
        s1Min: -4, s1Max: 4, s1Val: 3, s1Step: 0.5,
        s1AriaEn: 'Second polynomial root r2', s1AriaAr: 'الجذر الثاني r2',
        r0LabelEn: 'Vieta \\((e_1, e_2)\\)', r0LabelAr: 'معاملات فييتا \\((e_1, e_2)\\)', r0Init: '(4.0, 3.0)',
        r1LabelEn: 'Power Sum \\(p_2 = r_1^2+r_2^2\\)', r1LabelAr: 'مجموع المربعات \\(p_2 = r_1^2+r_2^2\\)', r1Init: '10.00',
        r2LabelEn: 'Cubic Sum \\(p_3 = r_1^3+r_2^3\\)', r2LabelAr: 'مجموع المكعبات \\(p_3 = r_1^3+r_2^3\\)', r2Init: '28.00',
        noteEn: 'Adjust \\(r_1\\) and \\(r_2\\) (or drag directly on the coordinate plane) to verify \\(p_2 = e_1^2 - 2e_2\\) and \\(p_3 = e_1^3 - 3e_1 e_2\\), and observe when \\(r_1 = r_2 > 0\\) locks AM–GM equality.',
        noteAr: 'حرّك \\(r_1\\) و\\(r_2\\) (أو اسحب مباشرة على المستوى) للتحقق من متطابقات نيوتن \\(p_2 = e_1^2 - 2e_2\\) و\\(p_3 = e_1^3 - 3e_1 e_2\\) وملاحظة تحقق المساواة عندما \\(r_1 = r_2 > 0\\).'
      }),
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'Monic Quartic Remainder Construction Q(x) = P(x) − x² = (x−1)(x−2)(x−3)(x−4)',
          xrange: [0.5, 4.5],
          yrange: [-1.5, 4.5],
          fns: [
            { fn: '(x-1)*(x-2)*(x-3)*(x-4)', color: 'var(--fig-teal)', label: 'Q(x) = P(x) − x²' }
          ],
          points: [
            { x: 1, y: 0, label: 'x=1' },
            { x: 2, y: 0, label: 'x=2' },
            { x: 3, y: 0, label: 'x=3' },
            { x: 4, y: 0, label: 'x=4' }
          ]
        },
        caption: bi(
          'Auxiliary polynomial trick: if monic quartic \\(P(x)\\) satisfies \\(P(k) = k^2\\) for \\(k = 1,2,3,4\\), then \\(Q(x) = P(x) - x^2\\) vanishes at \\(1,2,3,4\\), forcing \\(P(x) = x^2 + (x-1)(x-2)(x-3)(x-4)\\) and \\(P(5) = 25 + 24 = 49\\) rather than the naive pattern guess \\(25\\)!',
          'حيلة الدالة المساعدة: إذا حققت كثيرة حدود واحدية من الدرجة الرابعة \\(P(k) = k^2\\) عند \\(k=1,2,3,4\\)، فإن \\(Q(x) = P(x) - x^2\\) تنعدم عند هذه النقاط الأربع، فتكون \\(P(5) = 25 + 4! = 49\\) وليس التخمين الخاطئ \\(25\\)!'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 1.A — Cubic Newton Sums Without Root-Finding (AMC 12 / NSMO Stage 2)',
          'مثال محلول 1.A — مجاميع قوى نيوتن لمعادلة تكعيبية دون إيجاد الجذور (AMC 12 / نسما 2)'
        ),
        body: bi(
          "<p><strong>Problem:</strong> Let \\( r, s, t \\) be the complex roots of \\( x^3 - 4x^2 + 2x - 5 = 0 \\). Compute the exact value of \\( r^3 + s^3 + t^3 \\) and \\( \\frac{1}{r^2} + \\frac{1}{s^2} + \\frac{1}{t^2} \\).</p><p><strong>Solution:</strong> By Vieta's formulas, \\( e_1 = r+s+t = 4 \\), \\( e_2 = rs+st+tr = 2 \\), and \\( e_3 = rst = 5 \\).<br>1. Compute \\( p_2 = r^2+s^2+t^2 = e_1^2 - 2e_2 = 4^2 - 2(2) = 12 \\).<br>2. Since each root satisfies \\( x^3 = 4x^2 - 2x + 5 \\), summing over \\( r, s, t \\) yields:<br>\\[ p_3 = 4p_2 - 2p_1 + 3(5) = 4(12) - 2(4) + 15 = 48 - 8 + 15 = 55. \\]<br>3. For the reciprocal squares, combine over the common denominator \\( (rst)^2 = e_3^2 = 25 \\):<br>\\[ \\frac{(rs)^2 + (st)^2 + (tr)^2}{(rst)^2} = \\frac{e_2^2 - 2e_1 e_3}{e_3^2} = \\frac{2^2 - 2(4)(5)}{25} = \\frac{4 - 40}{25} = -\\frac{36}{25}. \\]<br><em>Notice the negative result \\(-36/25\\) proves instantaneously that two of the three roots are non-real complex conjugates!</em></p>",
          '<p><strong>المسألة:</strong> لتكن \\( r, s, t \\) الجذور المركبة للمعادلة \\( x^3 - 4x^2 + 2x - 5 = 0 \\). أوجد القيمة الدقيقة لكل من \\( r^3 + s^3 + t^3 \\) والمقدار \\( \\frac{1}{r^2} + \\frac{1}{s^2} + \\frac{1}{t^2} \\).</p><p><strong>الحل الأولمبي:</strong> من علاقات فييتا: \\( e_1 = r+s+t = 4 \\)، و\\( e_2 = rs+st+tr = 2 \\)، و\\( e_3 = rst = 5 \\).<br>1. نحسب \\( p_2 = r^2+s^2+t^2 = e_1^2 - 2e_2 = 16 - 4 = 12 \\).<br>2. بما أن كل جذر يحقق \\( x^3 = 4x^2 - 2x + 5 \\)، بجمع المعادلات للجذور الثلاثة نجد:<br>\\[ p_3 = 4p_2 - 2p_1 + 15 = 4(12) - 2(4) + 15 = 55. \\]<br>3. لمجموع مقلوبات المربعات نوحد المقامات على \\( (rst)^2 = 25 \\):<br>\\[ \\frac{(rs)^2 + (st)^2 + (tr)^2}{(rst)^2} = \\frac{e_2^2 - 2e_1 e_3}{e_3^2} = \\frac{4 - 2(4)(5)}{25} = -\\frac{36}{25}. \\]<br><em>لاحظ أن الإشارة السالبة \\(-36/25\\) تثبت فوراً وجود جذرين مركبين غير حقيقيين!</em></p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 1.B — Sophie Germain Telescoping Product (KAUST KMC / AIME Style)',
          'مثال محلول 1.B — الجداء التلسكوبي عبر متطابقة صوفي جيرمان (مسابقة كاوست / AIME)'
        ),
        body: bi(
          "<p><strong>Problem:</strong> Evaluate in simplest fraction form:<br>\\[ P = \\frac{(2^4 + 4)(6^4 + 4)(10^4 + 4)(14^4 + 4)}{(4^4 + 4)(8^4 + 4)(12^4 + 4)(16^4 + 4)}. \\]</p><p><strong>Solution:</strong> Apply Sophie Germain's identity \\( a^4 + 4(1)^4 = (a^2 - 2a + 2)(a^2 + 2a + 2) = [(a-1)^2 + 1][(a+1)^2 + 1] \\). Define \\( g(m) = m^2 + 1 \\), so \\( a^4 + 4 = g(a-1)g(a+1) \\).<br>1. Numerator factors: \\( [g(1)g(3)][g(5)g(7)][g(9)g(11)][g(13)g(15)] \\).<br>2. Denominator factors: \\( [g(3)g(5)][g(7)g(9)][g(11)g(13)][g(15)g(17)] \\).<br>3. Every interior factor \\( g(3), g(5), g(7), g(9), g(11), g(13), g(15) \\) cancels cleanly, leaving only the boundary terms:<br>\\[ P = \\frac{g(1)}{g(17)} = \\frac{1^2 + 1}{17^2 + 1} = \\frac{2}{290} = \\frac{1}{145}. \\]</p>",
          '<p><strong>المسألة:</strong> احسب في أبسط صورة كسرية قيمة الجداء:<br>\\[ P = \\frac{(2^4 + 4)(6^4 + 4)(10^4 + 4)(14^4 + 4)}{(4^4 + 4)(8^4 + 4)(12^4 + 4)(16^4 + 4)}. \\]</p><p><strong>الحل الأولمبي:</strong> بتطبيق متطابقة صوفي جيرمان عند \\( b = 1 \\): \\( a^4 + 4 = (a^2 - 2a + 2)(a^2 + 2a + 2) = [(a-1)^2 + 1][(a+1)^2 + 1] \\). نضع \\( g(m) = m^2 + 1 \\)، فيكون \\( a^4 + 4 = g(a-1)g(a+1) \\).<br>1. البسط يتحلل إلى: \\( [g(1)g(3)][g(5)g(7)][g(9)g(11)][g(13)g(15)] \\).<br>2. المقام يتحلل إلى: \\( [g(3)g(5)][g(7)g(9)][g(11)g(13)][g(15)g(17)] \\).<br>3. تختصر جميع العوامل الداخلية تلسكوبياً ولا يبقى سوى الطرفين الأول والأخير:<br>\\[ P = \\frac{g(1)}{g(17)} = \\frac{1^2 + 1}{17^2 + 1} = \\frac{2}{290} = \\frac{1}{145}. \\]</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          "Worked Example 1.C — Constrained Minimum via Titu's Lemma (NSMO Finals / BMO)",
          'مثال محلول 1.C — إيجاد القيمة الصغرى المشروطة عبر لمّة تيتو (نهائيات نسما / BMO)'
        ),
        body: bi(
          "<p><strong>Problem:</strong> Let \\( x, y, z > 0 \\) be positive real numbers satisfying \\( x + 2y + 3z = 12 \\). Find the exact minimum possible value of \\( S = \\frac{9}{x} + \\frac{8}{y} + \\frac{3}{z} \\), and determine the triple \\( (x, y, z) \\) at which equality holds.</p><p><strong>Solution:</strong> To match the linear constraint denominator \\( x + 2y + 3z = 12 \\), rewrite each fraction so its denominator matches a summand of \\( x + 2y + 3z \\):<br>\\[ S = \\frac{9}{x} + \\frac{16}{2y} + \\frac{9}{3z} = \\frac{3^2}{x} + \\frac{4^2}{2y} + \\frac{3^2}{3z}. \\]<br>Applying Titu's Lemma directly:<br>\\[ S \\ge \\frac{(3 + 4 + 3)^2}{x + 2y + 3z} = \\frac{10^2}{12} = \\frac{100}{12} = \\frac{25}{3}. \\]<br><strong>Equality Check:</strong> Equality holds iff \\( \\frac{3}{x} = \\frac{4}{2y} = \\frac{3}{3z} = \\lambda \\), giving \\( x = \\frac{3}{\\lambda},\\; y = \\frac{2}{\\lambda},\\; z = \\frac{1}{\\lambda} \\). Substituting into \\( x + 2y + 3z = 12 \\) gives \\( \\frac{3 + 4 + 3}{\\lambda} = 12 \\implies \\lambda = \\frac{5}{6} \\), so \\( (x, y, z) = \\left(\\frac{18}{5}, \\frac{12}{5}, \\frac{6}{5}\\right) \\). Thus the exact minimum is \\( \\frac{25}{3} \\).</p>",
          '<p><strong>المسألة:</strong> لتكن \\( x, y, z > 0 \\) أعداداً حقيقية موجبة تحقق الشرط \\( x + 2y + 3z = 12 \\). أوجد القيمة الصغرى الدقيقة للمقدار \\( S = \\frac{9}{x} + \\frac{8}{y} + \\frac{3}{z} \\)، وحدد الثلاثية \\( (x, y, z) \\) التي تحقق المساواة.</p><p><strong>الحل الأولمبي:</strong> لمواءمة القيد الخطي \\( x + 2y + 3z = 12 \\)، نعيد كتابة الكسور بحيث تطابق مقاماتها حدود القيد:<br>\\[ S = \\frac{9}{x} + \\frac{16}{2y} + \\frac{9}{3z} = \\frac{3^2}{x} + \\frac{4^2}{2y} + \\frac{3^2}{3z}. \\]<br>وبتطبيق لمّة تيتو مباشرةً:<br>\\[ S \\ge \\frac{(3 + 4 + 3)^2}{x + 2y + 3z} = \\frac{100}{12} = \\frac{25}{3}. \\]<br><strong>التحقق من شرط المساواة:</strong> تتحقق المساواة عندما \\( \\frac{3}{x} = \\frac{4}{2y} = \\frac{3}{3z} = \\lambda \\)، أي \\( x = \\frac{3}{\\lambda},\\; y = \\frac{2}{\\lambda},\\; z = \\frac{1}{\\lambda} \\). وبالتعويض في \\( x + 2y + 3z = 12 \\) نجد \\( \\lambda = \\frac{5}{6} \\)، ومنه \\( (x, y, z) = \\left(\\frac{18}{5}, \\frac{12}{5}, \\frac{6}{5}\\right) \\)، فتكون القيمة الصغرى الفعلية \\( \\frac{25}{3} \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 1.D — Auxiliary Polynomial Interpolation (Olympiad Classic)',
          'مثال محلول 1.D — استيفاء كثيرات الحدود بالدالة المساعدة (كلاسيكيات الأولمبياد)'
        ),
        body: bi(
          "<p><strong>Problem:</strong> Let \\( P(x) \\) be a monic polynomial of degree \\( 4 \\) such that \\( P(1) = 3,\\; P(2) = 7,\\; P(3) = 13, \\) and \\( P(4) = 21 \\). Determine \\( P(6) \\).</p><p><strong>Solution:</strong> Observe the pattern of values at \\( k \\in \\{1, 2, 3, 4\\} \\): \\( 3 = 1^2+1+1 \\), \\( 7 = 2^2+2+1 \\), \\( 13 = 3^2+3+1 \\), \\( 21 = 4^2+4+1 \\). That is, \\( P(k) = k^2 + k + 1 \\) for \\( k = 1, 2, 3, 4 \\).<br>Define the auxiliary polynomial \\( Q(x) = P(x) - (x^2 + x + 1) \\). Since \\( P(x) \\) is monic of degree \\( 4 \\), \\( Q(x) \\) is ALSO monic of degree \\( 4 \\), and its four roots are \\( 1, 2, 3, 4 \\):<br>\\[ Q(x) = (x - 1)(x - 2)(x - 3)(x - 4) \\implies P(x) = x^2 + x + 1 + (x - 1)(x - 2)(x - 3)(x - 4). \\]<br>Evaluating at \\( x = 6 \\): \\( P(6) = (36 + 6 + 1) + (5)(4)(3)(2) = 43 + 120 = 163 \\).</p>",
          '<p><strong>المسألة:</strong> لتكن \\( P(x) \\) كثيرة حدود واحدية (معاملها الرئيس \\( 1 \\)) من الدرجة الرابعة تحقق \\( P(1) = 3,\\; P(2) = 7,\\; P(3) = 13,\\; P(4) = 21 \\). أوجد قيمة \\( P(6) \\).</p><p><strong>الحل الأولمبي:</strong> نلاحظ أن القيم عند \\( k \\in \\{1, 2, 3, 4\\} \\) تتبع القاعدة \\( P(k) = k^2 + k + 1 \\). نعرّف كثيرة الحدود المساعدة \\( Q(x) = P(x) - (x^2 + x + 1) \\). بما أن \\( P(x) \\) واحدية من الدرجة الرابعة، فإن \\( Q(x) \\) واحدية أيضاً من الدرجة الرابعة وجذورها الأربعة هي \\( 1, 2, 3, 4 \\):<br>\\[ Q(x) = (x - 1)(x - 2)(x - 3)(x - 4) \\implies P(x) = x^2 + x + 1 + (x - 1)(x - 2)(x - 3)(x - 4). \\]<br>بالتعويض عند \\( x = 6 \\): \\( P(6) = (36 + 6 + 1) + 5 \\cdot 4 \\cdot 3 \\cdot 2 = 43 + 120 = 163 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ Olympiad Trap — Unattainable AM–GM Equality & Splitting Terms Correctly',
          '⚠ فخ أولمبي شائع — عدم تحقق شرط المساواة في AM–GM وكيفية تجزئة الحدود'
        ),
        body: bi(
          '<p><strong>Never claim an AM–GM minimum without verifying equality!</strong> For example, to minimize \\( f(x) = x^2 + \\frac{16}{x} \\) for \\( x > 0 \\), naive 2-term AM–GM gives \\( x^2 + \\frac{16}{x} \\ge 2\\sqrt{16x} \\), which still depends on \\( x \\)! Instead, <strong>split the linear denominator</strong> so exponents cancel: write \\( x^2 + \\frac{8}{x} + \\frac{8}{x} \\ge 3\\sqrt[3]{x^2 \\cdot \\frac{8}{x} \\cdot \\frac{8}{x}} = 3\\sqrt[3]{64} = 12 \\), where equality holds cleanly at \\( x^2 = \\frac{8}{x} \\iff x = 2 \\)!</p>',
          '<p><strong>إياك وإعلان قيمة صغرى بمتباينة AM–GM دون التحقق من تحقق المساواة!</strong> على سبيل المثال، لإيجاد أصغر قيمة للمقدار \\( f(x) = x^2 + \\frac{16}{x} \\) حيث \\( x > 0 \\)، فإن تطبيق AM–GM لحدين لا يختزل \\( x \\). الحل الصحيح هو <strong>تجزئة الحد الكسري إلى حدين متساويين</strong> لإلغاء الأسس: \\( x^2 + \\frac{8}{x} + \\frac{8}{x} \\ge 3\\sqrt[3]{x^2 \\cdot \\frac{8}{x} \\cdot \\frac{8}{x}} = 12 \\)، وتتحقق المساواة بدقة عند \\( x^2 = \\frac{8}{x} \\iff x = 2 \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ Contest Strategy — Balancing Weights Before Applying AM–GM or Cauchy–Schwarz',
          '▲ استراتيجية المسابقات — موازنة الأوزان من نقطة المساواة المتوقعة'
        ),
        body: bi(
          '<p><strong>Guess Equality First:</strong> In symmetric Olympiad inequalities (e.g., over \\( a, b, c > 0 \\) with \\( a+b+c = 3 \\)), test \\( a = b = c = 1 \\) first! Knowing equality occurs at \\( (1,1,1) \\) tells you immediately which terms can be grouped together in AM–GM or how to weight Cauchy–Schwarz so every grouped pair is equal at \\( (1,1,1) \\).</p>',
          '<p><strong>استنتج نقطة المساواة أولاً:</strong> في المتباينات المتماثلة (مثل \\( a+b+c = 3 \\))، اختبر التساوي \\( a = b = c = 1 \\) في البداية! معرفة نقطة التساوي ترشدك فوراً إلى كيفية تجميع الحدود المتكافئة في القيمة قبل تطبيق AM–GM أو كوشي-شوارتز.</p>'
        )
      },
      makePractice(
        'Practice 1.1 · NSMO Stage 1 / Easy', 'تدريب 1.1 · نسما المرحلة 1 / سهل',
        'If \\( x > 0 \\) satisfies \\( x + \\frac{1}{x} = 5 \\), find the exact value of \\( x^3 + \\frac{1}{x^3} \\).',
        'إذا كان \\( x > 0 \\) يحقق \\( x + \\frac{1}{x} = 5 \\)، فأوجد القيمة الدقيقة للمقدار \\( x^3 + \\frac{1}{x^3} \\).',
        'Cube the identity \\( \\left(x + \\frac{1}{x}\\right)^3 = x^3 + \\frac{1}{x^3} + 3\\left(x + \\frac{1}{x}\\right) \\).',
        'كعّب الطرفين باستخدام المتطابقة \\( \\left(x + \\frac{1}{x}\\right)^3 = x^3 + \\frac{1}{x^3} + 3\\left(x + \\frac{1}{x}\\right) \\).',
        'Substitute \\( x + \\frac{1}{x} = 5 \\) into both places in the identity.',
        'عوّض بالقيمة \\( x + \\frac{1}{x} = 5 \\) في الطرفين.',
        'Compute \\( 5^3 - 3(5) \\).',
        'احسب الناتج \\( 5^3 - 3(5) \\).',
        'Using \\( x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)^3 - 3\\left(x + \\frac{1}{x}\\right) \\), we obtain \\( 5^3 - 3(5) = 125 - 15 = 110 \\).',
        'باستخدام المتطابقة \\( x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)^3 - 3\\left(x + \\frac{1}{x}\\right) \\)، نحصل على \\( 125 - 15 = 110 \\).'
      ),
      makePractice(
        'Practice 1.2 · KAUST KMC Regional / Easy', 'تدريب 1.2 · تصفيات كاوست / سهل',
        'Find the minimum value of \\( f(x) = x^2 + \\frac{54}{x} \\) over all positive real numbers \\( x > 0 \\).',
        'أوجد القيمة الصغرى للدالة \\( f(x) = x^2 + \\frac{54}{x} \\) لكل عدد حقيقي موجب \\( x > 0 \\).',
        'Split \\( \\frac{54}{x} \\) into two equal terms \\( \\frac{27}{x} + \\frac{27}{x} \\) so the product of all three terms cancels \\( x \\).',
        'جزّئ الحد الكسري \\( \\frac{54}{x} \\) إلى \\( \\frac{27}{x} + \\frac{27}{x} \\) حتى يُختصر المتغير \\( x \\) عند الضرب.',
        'Apply 3-term AM–GM to \\( x^2,\\; \\frac{27}{x},\\; \\frac{27}{x} \\).',
        'طبّق متباينة AM–GM لثلاثة حدود على \\( x^2,\\; \\frac{27}{x},\\; \\frac{27}{x} \\).',
        'Verify equality holds when \\( x^2 = \\frac{27}{x} \\iff x = 3 \\).',
        'تحقق من شرط المساواة عند \\( x^2 = \\frac{27}{x} \\iff x = 3 \\).',
        'By 3-term AM–GM, \\( x^2 + \\frac{27}{x} + \\frac{27}{x} \\ge 3\\sqrt[3]{x^2 \\cdot \\frac{27}{x} \\cdot \\frac{27}{x}} = 3\\sqrt[3]{729} = 3(9) = 27 \\). Equality holds at \\( x = 3 \\), so the minimum is \\( 27 \\).',
        'بتطبيق متباينة AM–GM لثلاثة حدود: \\( x^2 + \\frac{27}{x} + \\frac{27}{x} \\ge 3\\sqrt[3]{729} = 27 \\)، وتتحقق المساواة عند \\( x = 3 \\)، إذن القيمة الصغرى هي \\( 27 \\).'
      ),
      makePractice(
        'Practice 1.3 · NSMO Stage 2 / Medium', 'تدريب 1.3 · نسما المرحلة 2 / متوسط',
        'Let \\( a, b, c \\) be non-zero real numbers with \\( a + b + c = 0 \\). Evaluate \\( \\frac{a^2}{bc} + \\frac{b^2}{ca} + \\frac{c^2}{ab} \\).',
        'لتكن \\( a, b, c \\) أعداداً حقيقية غير صفرية تحقق \\( a + b + c = 0 \\). احسب قيمة \\( \\frac{a^2}{bc} + \\frac{b^2}{ca} + \\frac{c^2}{ab} \\).',
        'Combine the three fractions over the common denominator \\( abc \\).',
        'وحّد مقامات الكسور الثلاثة على المقام المشترك \\( abc \\).',
        'Recall Gauss cyclic cubic identity \\( a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca) \\).',
        'استحضر متطابقة غاوس التكعيبية \\( a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca) \\).',
        'Since \\( a + b + c = 0 \\), deduce \\( a^3 + b^3 + c^3 = 3abc \\) and divide by \\( abc \\).',
        'بما أن \\( a + b + c = 0 \\)، استنتج أن \\( a^3 + b^3 + c^3 = 3abc \\) ثم اقسم على \\( abc \\).',
        'Over common denominator \\( abc \\), the expression equals \\( \\frac{a^3 + b^3 + c^3}{abc} \\). Since \\( a + b + c = 0 \\), Gauss identity yields \\( a^3 + b^3 + c^3 = 3abc \\), so \\( \\frac{3abc}{abc} = 3 \\).',
        'بتوحيد المقامات يصبح المقدار \\( \\frac{a^3 + b^3 + c^3}{abc} \\). ومن شرط \\( a + b + c = 0 \\) تعطي متطابقة غاوس \\( a^3 + b^3 + c^3 = 3abc \\)، فيكون الناتج \\( \\frac{3abc}{abc} = 3 \\).'
      ),
      makePractice(
        'Practice 1.4 · AMC 12 / KAUST KMC / Hard', 'تدريب 1.4 · AMC 12 / مسابقة كاوست / متقدم',
        'Let \\( r_1, r_2, r_3 \\) be the roots of \\( x^3 - 6x^2 + 5x - 3 = 0 \\). Compute \\( (r_1 + r_2)(r_2 + r_3)(r_3 + r_1) \\).',
        'لتكن \\( r_1, r_2, r_3 \\) جذور المعادلة \\( x^3 - 6x^2 + 5x - 3 = 0 \\). أوجد قيمة \\( (r_1 + r_2)(r_2 + r_3)(r_3 + r_1) \\).',
        'By Vieta, \\( r_1 + r_2 + r_3 = 6 \\), so rewrite \\( r_1 + r_2 = 6 - r_3 \\), and similarly for the other two factors.',
        'من علاقات فييتا \\( r_1 + r_2 + r_3 = 6 \\)؛ استبدل \\( r_1 + r_2 \\) بـ \\( 6 - r_3 \\) وبالمثل للعاملين الآخرين.',
        'Notice \\( P(x) = (x - r_1)(x - r_2)(x - r_3) = x^3 - 6x^2 + 5x - 3 \\).',
        'لاحظ أن \\( P(x) = (x - r_1)(x - r_2)(x - r_3) = x^3 - 6x^2 + 5x - 3 \\).',
        'Evaluate \\( P(6) = (6 - r_1)(6 - r_2)(6 - r_3) \\)!',
        'احسب مباشرةً \\( P(6) = (6 - r_1)(6 - r_2)(6 - r_3) \\)!',
        'Since \\( r_1 + r_2 + r_3 = 6 \\), the product equals \\( (6 - r_3)(6 - r_1)(6 - r_2) = P(6) = 6^3 - 6(6^2) + 5(6) - 3 = 216 - 216 + 30 - 3 = 27 \\) (equivalently \\( e_1 e_2 - e_3 = 6(5) - 3 = 27 \\)).',
        'بما أن \\( r_1 + r_2 + r_3 = 6 \\)، فإن الجداء يساوي \\( (6 - r_1)(6 - r_2)(6 - r_3) = P(6) = 216 - 216 + 30 - 3 = 27 \\) (أو مباشرةً \\( e_1 e_2 - e_3 = 6(5) - 3 = 27 \\)).'
      ),
      makePractice(
        'Practice 1.5 · NSMO National Finals / KAUST Finals', 'تدريب 1.5 · نهائيات نسما وكاوست',
        'For positive reals \\( a, b, c > 0 \\) satisfying \\( a + b + c = 6 \\), find the exact minimum value of \\( \\frac{4}{a + b} + \\frac{9}{b + c} + \\frac{16}{c + a} \\).',
        'لأي أعداد حقيقية موجبة \\( a, b, c > 0 \\) تحقق \\( a + b + c = 6 \\)، أوجد القيمة الصغرى الدقيقة للمقدار \\( \\frac{4}{a + b} + \\frac{9}{b + c} + \\frac{16}{c + a} \\).',
        'Write the numerators as squares \\( 2^2, 3^2, 4^2 \\) and apply Titu Lemma.',
        'اكتب البسوط على صورة مربعات \\( 2^2, 3^2, 4^2 \\) وطبّق لمّة تيتو.',
        'Sum the denominators: \\( (a+b) + (b+c) + (c+a) = 2(a+b+c) = 12 \\).',
        'اجمع المقامات: \\( (a+b) + (b+c) + (c+a) = 2(a+b+c) = 12 \\).',
        'Verify strictly positive equality \\( \\frac{2}{a+b} = \\frac{3}{b+c} = \\frac{4}{c+a} = \\frac{3}{4} \\) gives \\( (a, b, c) = \\left(2, \\frac{2}{3}, \\frac{10}{3}\\right) \\).',
        'تحقق من شرط المساواة الموجب تماماً \\( \\frac{2}{a+b} = \\frac{3}{b+c} = \\frac{4}{c+a} = \\frac{3}{4} \\) الذي يعطي \\( (a, b, c) = \\left(2, \\frac{2}{3}, \\frac{10}{3}\\right) \\).',
        "By Titu's Lemma, \\( \\frac{2^2}{a+b} + \\frac{3^2}{b+c} + \\frac{4^2}{c+a} \\ge \\frac{(2+3+4)^2}{(a+b)+(b+c)+(c+a)} = \\frac{81}{12} = \\frac{27}{4} \\). Equality holds when \\( a+b = \\frac{8}{3},\\; b+c = 4,\\; c+a = \\frac{16}{3} \\), yielding strictly positive \\( (a, b, c) = \\left(2, \\frac{2}{3}, \\frac{10}{3}\\right) \\). Thus the exact minimum is \\( \\frac{27}{4} \\).",
        'بتطبيق لمّة تيتو: \\( \\frac{2^2}{a+b} + \\frac{3^2}{b+c} + \\frac{4^2}{c+a} \\ge \\frac{(2+3+4)^2}{2(a+b+c)} = \\frac{81}{12} = \\frac{27}{4} \\). وتتحقق المساواة عندما \\( a+b = \\frac{8}{3},\\; b+c = 4,\\; c+a = \\frac{16}{3} \\)، مما يعطي القيم الموجبة تماماً \\( (a, b, c) = \\left(2, \\frac{2}{3}, \\frac{10}{3}\\right) \\)، فتكون القيمة الصغرى هي \\( \\frac{27}{4} \\).'
      ),
      ...uge.mainfnBlocks,
      {
        kind: 'seeAlso',
        links: [
          { label: 'Number Theory I: Divisibility, Fermat–Euler & CRT', chapterId: 'ol-modular-number-theory', trackId: 'olympiad' },
          { label: 'NSMO of KSA — Stages 1 & 2', chapterId: 'ol-nsmo-stage1-2', trackId: 'olympiad' },
          { label: 'KAUST Mathematics Competition (KMC) Qualifier', chapterId: 'ol-kaust-kmc-qualifier', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['Olympiad Algebra, Vieta & Inequalities']
  }
};

const ch02 = {
  id: 'ol-modular-number-theory',
  chapterNumber: '2',
  subsectionBanner: SUBSEC_1,
  title: bi(
    'Number Theory I: Divisibility, Primes, Fermat–Euler Theorems & Chinese Remainder Theorem',
    'نظرية الأعداد (1): قابلية القسمة والأعداد الأولية ومبرهنات فيرما وأويلر والباقي الصيني'
  ),
  railLabel: bi('Modular Number Theory & CRT', 'نظرية الأعداد والحساب المعياري'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '🔢',
    category: 'Core Pillar 2 — Olympiad Number Theory I',
    badges: [{ text: 'IMO · NSMO · KAUST KMC', className: 'tier-e' }],
    topics: [
      "Euclidean algorithm & Bézout's identity",
      'Multiplicative functions τ(n), σ(n), φ(n)',
      "Fermat's Little, Euler's Totient & Wilson's Theorems",
      'Chinese Remainder Theorem (CRT)',
      "Legendre's formula & p-adic valuation v_p(n!)"
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'Number theory is the signature battleground of Saudi NSMO, KAUST KMC, AIME, and the IMO. Mastering <strong>congruence arithmetic</strong> \\(\\pmod m\\), <strong>Euler’s totient theorem</strong>, the <strong>Chinese Remainder Theorem (CRT)</strong>, and <strong>\\(p\\)-adic valuation \\(v_p(n)\\)</strong> converts enormous exponential expressions and divisibility claims into crisp, finite modular deductions.',
          'تُعدّ نظرية الأعداد الميدان الأبرز للتمييز في أولمبياد «نسما» الوطني (NSMO)، ومسابقة كاوست (KMC)، واختبار AIME، والأولمبياد الدولي IMO. إن إتقان <strong>الحساب المعياري</strong> \\(\\pmod m\\)، و<strong>مبرهنة أويلر</strong>، و<strong>مبرهنة الباقي الصيني (CRT)</strong>، و<strong>التقييم \\(p\\)-آدي \\(v_p(n)\\)</strong> يحوّل الأسس العملاقة ومسائل قابلية القسمة إلى استنتاجات منتهية فائقة الأناقة.'
        )
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          '● Definition 2.1 — Prime Factorization, Arithmetic Functions & p-adic Valuation',
          '● تعريف 2.1 — التحليل الأولي والدوال الحسابية والتقييم الأسّي \\(v_p\\)'
        ),
        body: bi(
          "<p>By the Fundamental Theorem of Arithmetic, every integer \\( n > 1 \\) factors uniquely as \\( n = p_1^{e_1} p_2^{e_2} \\cdots p_k^{e_k} \\). Its key multiplicative invariants are:</p>\\[ \\tau(n) = \\prod_{i=1}^k (e_i + 1), \\qquad \\sigma(n) = \\prod_{i=1}^k \\frac{p_i^{e_i+1} - 1}{p_i - 1}, \\qquad \\varphi(n) = n \\prod_{i=1}^k \\left(1 - \\frac{1}{p_i}\\right). \\]<p>For a prime \\( p \\), the <strong>\\( p \\)-adic valuation</strong> \\( v_p(n) \\) is the largest exponent \\( e \\) such that \\( p^e \\mid n \\). <strong>Legendre's Theorem</strong> gives the exact prime power dividing \\( n! \\):</p>\\[ v_p(n!) = \\sum_{j=1}^{\\infty} \\left\\lfloor \\frac{n}{p^j} \\right\\rfloor = \\frac{n - s_p(n)}{p - 1}, \\]<p>where \\( s_p(n) \\) is the sum of the base-\\( p \\) digits of \\( n \\).</p>",
          '<p>حسب المبرهنة الأساسية في الحساب، يتحلل كل عدد صحيح \\( n > 1 \\) بصورة وحيدة إلى عوامل أولية \\( n = p_1^{e_1} p_2^{e_2} \\cdots p_k^{e_k} \\)، وتعطى دواله الضربية الأساسية بالعلاقات:</p>\\[ \\tau(n) = \\prod_{i=1}^k (e_i + 1), \\qquad \\sigma(n) = \\prod_{i=1}^k \\frac{p_i^{e_i+1} - 1}{p_i - 1}, \\qquad \\varphi(n) = n \\prod_{i=1}^k \\left(1 - \\frac{1}{p_i}\\right). \\]<p>ولأي عدد أولي \\( p \\)، يُعرَّف <strong>التقييم \\( v_p(n) \\)</strong> بأنه أكبر أس \\( e \\) يحقق \\( p^e \\mid n \\). وتعطي <strong>صيغة ليجاندر</strong> الأس الدقيق للعدد الأولي \\( p \\) في \\( n! \\):</p>\\[ v_p(n!) = \\sum_{j=1}^{\\infty} \\left\\lfloor \\frac{n}{p^j} \\right\\rfloor = \\frac{n - s_p(n)}{p - 1}, \\]<p>حيث \\( s_p(n) \\) مجموع أرقام العدد \\( n \\) مكتوباً في الأساس \\( p \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          "● Theorem 2.2 — Fermat's Little, Euler's Totient, Wilson's Theorem & CRT",
          '● مبرهنة 2.2 — مبرهنات فيرما الصغرى وأويلر وويلسون والباقي الصيني (CRT)'
        ),
        body: bi(
          "<p><strong>1. Euler's &amp; Fermat's Theorems:</strong> If \\( \\gcd(a, m) = 1 \\), then \\( a^{\\varphi(m)} \\equiv 1 \\pmod m \\). In particular, for prime \\( p \\nmid a \\), \\( a^{p-1} \\equiv 1 \\pmod p \\).</p><p><strong>2. Wilson's Theorem:</strong> An integer \\( p > 1 \\) is prime if and only if \\( (p - 1)! \\equiv -1 \\pmod p \\) (and \\( (p - 2)! \\equiv 1 \\pmod p \\)).</p><p><strong>3. Chinese Remainder Theorem (CRT):</strong> If \\( m_1, m_2, \\dots, m_r \\) are pairwise coprime (\\( \\gcd(m_i, m_j) = 1 \\)), then the system \\( x \\equiv c_i \\pmod{m_i} \\) has a <strong>unique solution modulo \\( M = m_1 m_2 \\cdots m_r \\)</strong>.</p>",
          '<p><strong>1. مبرهنتا أويلر وفيرما الصغرى:</strong> إذا كان \\( \\gcd(a, m) = 1 \\)، فإن \\( a^{\\varphi(m)} \\equiv 1 \\pmod m \\). وبوجه خاص لعدد أولي \\( p \\nmid a \\): \\( a^{p-1} \\equiv 1 \\pmod p \\).</p><p><strong>2. مبرهنة ويلسون:</strong> يكون العدد \\( p > 1 \\) أولياً إذا وفقط إذا كان \\( (p - 1)! \\equiv -1 \\pmod p \\) (ومنه \\( (p - 2)! \\equiv 1 \\pmod p \\)).</p><p><strong>3. مبرهنة الباقي الصيني (CRT):</strong> إذا كانت المقاسات \\( m_1, m_2, \\dots, m_r \\) أولية فيما بينها مثنى مثنى (\\( \\gcd(m_i, m_j) = 1 \\))، فإن نظام التطابقات \\( x \\equiv c_i \\pmod{m_i} \\) يمتلك <strong>حلاً وحيداً بترديد \\( M = m_1 m_2 \\cdots m_r \\)</strong>.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          "◆ Proof — Bijective Residue Permutation Proof of Euler's Totient Theorem",
          '◆ البرهان الأولمبي — برهان مبرهنة أويلر عبر تبديل البواقي الأولية نسبياً'
        ),
        body: bi(
          "<p>Let \\( R = \\{r_1, r_2, \\dots, r_{\\varphi(m)}\\} \\) be a reduced residue system modulo \\( m \\) (all \\( 1 \\le r_i \\le m \\) with \\( \\gcd(r_i, m) = 1 \\)). Since \\( \\gcd(a, m) = 1 \\), multiplication by \\( a \\) is injective modulo \\( m \\): if \\( ar_i \\equiv ar_j \\pmod m \\), multiplying by \\( a^{-1} \\pmod m \\) yields \\( r_i \\equiv r_j \\pmod m \\). Moreover \\( \\gcd(ar_i, m) = 1 \\), so \\( \\{ar_1, \\dots, ar_{\\varphi(m)}\\} \\) is simply a permutation of \\( R \\) modulo \\( m \\)! Multiplying all elements together gives:</p>\\[ (ar_1)(ar_2)\\cdots(ar_{\\varphi(m)}) \\equiv r_1 r_2 \\cdots r_{\\varphi(m)} \\pmod m \\implies a^{\\varphi(m)} \\prod_{i=1}^{\\varphi(m)} r_i \\equiv \\prod_{i=1}^{\\varphi(m)} r_i \\pmod m. \\]<p>Since \\( \\gcd\\!\\left(\\prod r_i, m\\right) = 1 \\), we cancel \\( \\prod r_i \\) to obtain \\( a^{\\varphi(m)} \\equiv 1 \\pmod m \\). \\( \\blacksquare \\)</p>",
          '<p>لتكن \\( R = \\{r_1, r_2, \\dots, r_{\\varphi(m)}\\} \\) مجموعة البواقي المختزلة بترديد \\( m \\) (حيث \\( \\gcd(r_i, m) = 1 \\)). بما أن \\( \\gcd(a, m) = 1 \\)، فإن الضرب في \\( a \\) يمثل دالة تقابل على \\( R \\) بترديد \\( m \\): إذا كان \\( ar_i \\equiv ar_j \\pmod m \\) فإن الضرب في النظير الضربي \\( a^{-1} \\) يعطي \\( r_i \\equiv r_j \\pmod m \\). إذن المجموعة \\( \\{ar_1, \\dots, ar_{\\varphi(m)}\\} \\) هي مجرد تبديل لعناصر \\( R \\) بترديد \\( m \\)! بضرب جميع العناصر معاً نجد:</p>\\[ a^{\\varphi(m)} \\prod_{i=1}^{\\varphi(m)} r_i \\equiv \\prod_{i=1}^{\\varphi(m)} r_i \\pmod m. \\]<p>وبما أن \\( \\gcd\\!\\left(\\prod r_i, m\\right) = 1 \\)، نختصر الجداء من الطرفين فنحصل على \\( a^{\\varphi(m)} \\equiv 1 \\pmod m \\). \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'High-Speed Olympiad Modular & Valuation Reference Table',
          'الجدول المرجعي السريع للتطابقات والتقييم الأسّي في المسابقات'
        ),
        columns: [
          bi('Property / Modulus', 'الخاصية / الترديد'),
          bi('Key Olympiad Fact', 'القاعدة الأولمبية الحاسمة'),
          bi('Application', 'التطبيق المباشر')
        ],
        rows: [
          [
            bi('Squares \\(\\pmod 4, 8\\)', 'المربعات الكاملة \\(\\pmod{4, 8}\\)'),
            bi('\\(n^2 \\equiv 0, 1 \\pmod 4\\); odd \\(n^2 \\equiv 1 \\pmod 8\\)', '\\(n^2 \\equiv 0, 1 \\pmod 4\\)؛ وللفردي \\(n^2 \\equiv 1 \\pmod 8\\)'),
            bi('Ruling out sum-of-squares Diophantine solutions', 'إثبات استحالة الحلول الصحيحة لمعادلات مجموع المربعات')
          ],
          [
            bi('Cubes \\(\\pmod 7, 9\\)', 'المكعبات الكاملة \\(\\pmod{7, 9}\\)'),
            bi('\\(n^3 \\equiv 0, \\pm 1 \\pmod 7\\) and \\(n^3 \\equiv 0, \\pm 1 \\pmod 9\\)', '\\(n^3 \\equiv 0, \\pm 1 \\pmod 7\\) وكذلك \\(\\pmod 9\\)'),
            bi('Cubic Diophantine equations like \\(x^3+y^3+z^3 = 9k \\pm 4\\)', 'حسم المعادلات التكعيبية مثل استحالة \\(x^3+y^3+z^3 = 9k \\pm 4\\)')
          ],
          [
            bi('Lifting the Exponent (LTE)', 'رفع الأس (لمّة LTE)'),
            bi('Odd prime \\(p \\mid x-y,\\; p \\nmid xy \\Rightarrow v_p(x^n - y^n) = v_p(x - y) + v_p(n)\\)', 'لأولي فردي \\(p \\mid x-y,\\; p \\nmid xy \\Rightarrow v_p(x^n - y^n) = v_p(x - y) + v_p(n)\\)'),
            bi('Exact power of \\(p\\) dividing \\(a^n \\pm b^n\\) in NSMO/IMO', 'حساب أعلى قوة لعدد أولي تقسم \\(a^n \\pm b^n\\) في نهائيات نسما وIMO')
          ],
          [
            bi('Multiplicative Order \\(\\operatorname{ord}_m(a)\\)', 'الرتبة الضربية \\(\\operatorname{ord}_m(a)\\)'),
            bi('\\(a^k \\equiv 1 \\pmod m \\iff \\operatorname{ord}_m(a) \\mid k\\); in particular \\(\\operatorname{ord}_m(a) \\mid \\varphi(m)\\)', '\\(a^k \\equiv 1 \\pmod m \\iff \\operatorname{ord}_m(a) \\mid k\\)؛ ودائماً \\(\\operatorname{ord}_m(a) \\mid \\varphi(m)\\)'),
            bi('Prime divisors of \\(2^p - 1\\) satisfy \\(q \\equiv 1 \\pmod p\\)', 'إثبات أن أي قاسم أولي \\(q\\) للعدد \\(2^p - 1\\) يحقق \\(q \\equiv 1 \\pmod p\\)')
          ]
        ]
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi("Bézout's Identity", 'متطابقة بيزو'),
            value: bi('\\(\\exists x,y \\in \\mathbb{Z}: ax + by = \\gcd(a,b)\\); modular inverse exists iff \\(\\gcd(a,m)=1\\)', 'يوجد عددان صحيحان \\(ax + by = \\gcd(a,b)\\)؛ والنظير الضربي موجود \\(\\iff \\gcd(a,m)=1\\)')
          },
          {
            label: bi('Divisor Product Identity', 'جداء جميع القواسم الموجبة'),
            value: bi('Product of all positive divisors of \\(n\\) is \\(n^{\\tau(n)/2}\\)', 'حاصل ضرب جميع القواسم الموجبة للعدد \\(n\\) يساوي \\(n^{\\tau(n)/2}\\)')
          },
          {
            label: bi('Euclidean Polynomial Trick', 'خوارزمية إقليدس الجبرية'),
            value: bi('\\(\\gcd(n^2+1, n+1) = \\gcd((-1)^2+1, n+1) = \\gcd(2, n+1)\\)', '\\(\\gcd(n^2+1, n+1) = \\gcd(2, n+1)\\) بالتعويض المباشر')
          },
          {
            label: bi('Trailing Zeros of \\(n!\\)', 'الأصفار الطرفية في \\(n!\\)'),
            value: bi('Since \\(v_2(n!) \\ge v_5(n!)\\), trailing zeros equal \\(v_5(n!) = \\sum_{k \\ge 1} \\lfloor n/5^k \\rfloor\\)', 'عدد الأصفار في يمين \\(n!\\) يساوي \\(v_5(n!) = \\sum_{k \\ge 1} \\lfloor n/5^k \\rfloor\\)')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'numberline',
          min: 0,
          max: 35,
          step: 5,
          points: [
            { x: 2, label: 'x≡2 (mod 5)' },
            { x: 9, label: '9' },
            { x: 17, label: 'x=17 (CRT)' },
            { x: 32, label: '32' }
          ]
        },
        caption: bi(
          'Chinese Remainder Theorem intersection on the integer line: numbers \\(\\equiv 2 \\pmod 5\\) (\\(2, 7, 12, 17, 22, 27, 32\\)) meet numbers \\(\\equiv 3 \\pmod 7\\) (\\(3, 10, 17, 24, 31\\)) uniquely modulo \\(35\\) at \\(x \\equiv 17 \\pmod{35}\\).',
          'تقاطع مبرهنة الباقي الصيني على خط الأعداد: الأعداد التي تحقق \\(x \\equiv 2 \\pmod 5\\) تتقاطع مع \\(x \\equiv 3 \\pmod 7\\) في حل وحيد بترديد \\(35\\) عند \\(x \\equiv 17 \\pmod{35}\\).'
        )
      },
      makeExplorerBlock({
        canvasId: 'olmodularnumbertheoryExCanvas',
        titleEn: "⊙ Explorer · Euclidean GCD Tiling, Bézout Inverse & Euler Totient Lab",
        titleAr: '⊙ مستكشف تفاعلي · مختبر خوارزمية إقليدس ومعاملات بيزو ودالة أويلر',
        ariaEn: 'Interactive Number Theory lab visualizing Euclidean rectangle tiling for gcd(a, b), Bezout linear combinations, and Euler totient phi(a).',
        ariaAr: 'مختبر تفاعلي لنظرية الأعداد يعرض تبليط خوارزمية إقليدس لحساب القاسم المشترك الأكبر ومعاملات بيزو ودالة أويلر.',
        captionEn: 'Euclidean algorithm steps, Bézout coefficients \\((x, y)\\), and totient \\(\\varphi(a)\\)',
        captionAr: 'خطوات خوارزمية إقليدس ومعاملات بيزو \\((x, y)\\) وقيمة دالة أويلر \\(\\varphi(a)\\)',
        s0LabelEn: 'Integer <b>\\(a =\\)</b>', s0LabelAr: 'العدد الأول <b>\\(a =\\)</b>',
        s0Min: 6, s0Max: 48, s0Val: 42, s0Step: 1,
        s0AriaEn: 'First positive integer a', s0AriaAr: 'العدد الصحيح الموجب a',
        s1LabelEn: 'Modulus / Integer <b>\\(b =\\)</b>', s1LabelAr: 'العدد الثاني / المقاس <b>\\(b =\\)</b>',
        s1Min: 4, s1Max: 48, s1Val: 18, s1Step: 1,
        s1AriaEn: 'Second positive integer b', s1AriaAr: 'العدد الصحيح الموجب b',
        r0LabelEn: '\\(\\gcd(a, b)\\) & \\(\\operatorname{lcm}(a, b)\\)', r0LabelAr: '\\(\\gcd(a, b)\\) و \\(\\operatorname{lcm}(a, b)\\)', r0Init: 'gcd = 6, lcm = 126',
        r1LabelEn: 'Bézout \\(ax + by = d\\)', r1LabelAr: 'متطابقة بيزو \\(ax + by = d\\)', r1Init: '42(1) + 18(−2) = 6',
        r2LabelEn: 'Totient \\(\\varphi(a)\\) & \\(\\tau(a)\\)', r2LabelAr: 'دالة أويلر \\(\\varphi(a)\\) و \\(\\tau(a)\\)', r2Init: 'φ(42)=12, τ(42)=8',
        noteEn: 'Slide \\(a\\) and \\(b\\) to watch Euclidean square-tiling peel off quotients until the final square side equals \\(\\gcd(a, b)\\). Whenever \\(\\gcd(a, b) = 1\\), the Bézout coefficient \\(x \\bmod b\\) gives the modular inverse \\(a^{-1} \\pmod b\\)!',
        noteAr: 'حرّك \\(a\\) و\\(b\\) لمشاهدة التبليط الإقليدي بالمربعات حتى يظهر المربع الأصغر الذي يساوي ضلعه \\(\\gcd(a, b)\\). وعندما يكون \\(\\gcd(a, b) = 1\\)، يعطيك معامل بيزو \\(x \\bmod b\\) النظير الضربي \\(a^{-1} \\pmod b\\)!'
      }),
      {
        kind: 'figure',
        figure: {
          type: 'circle',
          r: 1,
          centerLabel: 'mod 7',
          chords: [[0, 102.8], [102.8, 205.7], [205.7, 308.5], [308.5, 51.4], [51.4, 154.3], [154.3, 257.1], [257.1, 0]],
          points: [
            { angle: 90, label: '1' },
            { angle: 38.6, label: '3¹≡3' },
            { angle: -12.9, label: '3²≡2' },
            { angle: -64.3, label: '3³≡6' },
            { angle: -115.7, label: '3⁴≡4' },
            { angle: 192.9, label: '3⁵≡5' }
          ]
        },
        caption: bi(
          'Primitive-root star polygon modulo \\(7\\): powers of \\(3 \\pmod 7\\) cycle through all \\(\\varphi(7) = 6\\) nonzero residues \\(3 \\to 2 \\to 6 \\to 4 \\to 5 \\to 1\\), illustrating multiplicative order \\(\\operatorname{ord}_7(3) = 6\\).',
          'المضلع النجمي للجذر البدائي بترديد \\(7\\): قوى العدد \\(3 \\pmod 7\\) تمر بجميع البواقي الستة غير الصفرية \\(3 \\to 2 \\to 6 \\to 4 \\to 5 \\to 1\\)، مما يوضح الرتبة الضربية \\(\\operatorname{ord}_7(3) = 6\\).'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 2.A — Last Two Digits of a Power Tower via CRT + Euler (NSMO / KAUST)',
          'مثال محلول 2.A — آخر رقمين لقوة أسية كبيرة عبر أويلر والباقي الصيني (نسما / كاوست)'
        ),
        body: bi(
          "<p><strong>Problem:</strong> Find the last two decimal digits of \\( 7^{2026} \\) (i.e., compute \\( 7^{2026} \\bmod 100 \\)).</p><p><strong>Solution:</strong> Since \\( 100 = 4 \\times 25 \\) with \\( \\gcd(4, 25) = 1 \\), split modulo \\( 4 \\) and modulo \\( 25 \\) (or use \\( \\varphi(100) = 40 \\)):<br>1. Modulo \\( 4 \\): \\( 7 \\equiv -1 \\pmod 4 \\implies 7^{2026} \\equiv (-1)^{2026} = 1 \\pmod 4 \\).<br>2. Modulo \\( 25 \\): \\( \\varphi(25) = 25(1 - \\frac{1}{5}) = 20 \\), or even faster notice \\( 7^2 = 49 \\equiv -1 \\pmod{25} \\)! Thus \\( 7^4 \\equiv 1 \\pmod{25} \\) (multiplicative order \\( 4 \\) modulo \\( 100 \\)!).<br>3. Write \\( 2026 = 4(506) + 2 \\):<br>\\[ 7^{2026} = (7^4)^{506} \\cdot 7^2 \\equiv 1^{506} \\cdot 49 = 49 \\pmod{100} \\]<br>(checking \\( 49 \\equiv 1 \\pmod 4 \\) and \\( 49 \\equiv -1 \\pmod{25} \\) — both match!). Hence the last two digits are <strong>\\( 49 \\)</strong>.</p>",
          '<p><strong>المسألة:</strong> أوجد رقمَي الآحاد والعشرات للعدد \\( 7^{2026} \\) (أي احسب \\( 7^{2026} \\bmod 100 \\)).</p><p><strong>الحل الأولمبي:</strong> بما أن \\( 100 = 4 \\times 25 \\) و\\( \\gcd(4, 25) = 1 \\)، نفكك التطابق إلى \\( \\pmod 4 \\) و\\( \\pmod{25} \\):<br>1. بترديد \\( 4 \\): \\( 7 \\equiv -1 \\pmod 4 \\implies 7^{2026} \\equiv (-1)^{2026} = 1 \\pmod 4 \\).<br>2. بترديد \\( 25 \\): نلاحظ الحيلة السريعة \\( 7^2 = 49 \\equiv -1 \\pmod{25} \\)، ومنها \\( 7^4 \\equiv 1 \\pmod{25} \\) (أي أن رتبة \\( 7 \\) بترديد \\( 100 \\) تساوي \\( 4 \\) فقط!).<br>3. بقسمة الأس على \\( 4 \\): \\( 2026 = 4(506) + 2 \\)، إذن:<br>\\[ 7^{2026} = (7^4)^{506} \\cdot 7^2 \\equiv 1 \\cdot 49 = 49 \\pmod{100}. \\]<br>إذن آخر رقمين هما <strong>\\( 49 \\)</strong>.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          "Worked Example 2.B — Wilson's Theorem Factorial Remainder (Olympiad Classic)",
          'مثال محلول 2.B — باقي قسمة المضروب عبر مبرهنة ويلسون (كلاسيكيات الأولمبياد)'
        ),
        body: bi(
          "<p><strong>Problem:</strong> Find the remainder when \\( 97! \\) is divided by \\( 101 \\).</p><p><strong>Solution:</strong> Since \\( 101 \\) is prime, Wilson's Theorem gives \\( 100! \\equiv -1 \\pmod{101} \\). Expand the top three factors modulo \\( 101 \\):<br>\\[ 100! = 100 \\cdot 99 \\cdot 98 \\cdot 97! \\equiv (-1)(-2)(-3) \\cdot 97! = -6 \\cdot 97! \\pmod{101}. \\]<br>Therefore \\( -6 \\cdot 97! \\equiv -1 \\pmod{101} \\iff 6 \\cdot 97! \\equiv 1 \\pmod{101} \\).<br>To invert \\( 6 \\pmod{101} \\), notice \\( 101 + 1 = 102 = 6 \\times 17 \\), so \\( 6 \\times 17 = 102 \\equiv 1 \\pmod{101} \\).<br>Multiplying both sides of \\( 6 \\cdot 97! \\equiv 1 \\pmod{101} \\) by \\( 17 \\) gives \\( 97! \\equiv 17 \\pmod{101} \\).</p>",
          '<p><strong>المسألة:</strong> أوجد باقي قسمة \\( 97! \\) على العدد الأولي \\( 101 \\).</p><p><strong>الحل الأولمبي:</strong> بما أن \\( 101 \\) عدد أولي، تعطي مبرهنة ويلسون \\( 100! \\equiv -1 \\pmod{101} \\). نفكك آخر ثلاثة عوامل بترديد \\( 101 \\):<br>\\[ 100! = 100 \\cdot 99 \\cdot 98 \\cdot 97! \\equiv (-1)(-2)(-3) \\cdot 97! = -6 \\cdot 97! \\pmod{101}. \\]<br>ومنه \\( -6 \\cdot 97! \\equiv -1 \\pmod{101} \\iff 6 \\cdot 97! \\equiv 1 \\pmod{101} \\).<br>لإيجاد النظير الضربي للعدد \\( 6 \\pmod{101} \\)، نلاحظ أن \\( 101 + 1 = 102 = 6 \\times 17 \\)، أي \\( 6 \\times 17 \\equiv 1 \\pmod{101} \\). بضرب الطرفين في \\( 17 \\) نجد الباقي \\( 97! \\equiv 17 \\pmod{101} \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 2.C — Chinese Remainder Theorem Reconstruction (AIME / NSMO Stage 2)',
          'مثال محلول 2.C — حل نظام تطابقات عبر مبرهنة الباقي الصيني (AIME / نسما 2)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Find the smallest positive integer \\( N > 10 \\) that leaves remainder \\( 2 \\) when divided by \\( 5 \\), remainder \\( 4 \\) when divided by \\( 7 \\), and remainder \\( 6 \\) when divided by \\( 9 \\).</p><p><strong>Solution:</strong> Look for a structural pattern in the remainders before brute-forcing CRT! At \\( m = 5, 7, 9 \\), the differences \\( m - r \\) are \\( 5 - 2 = 3 \\), \\( 7 - 4 = 3 \\), and \\( 9 - 6 = 3 \\) — every single remainder is <strong>3 less than its modulus</strong>! That means:<br>\\[ N \\equiv -3 \\pmod 5, \\quad N \\equiv -3 \\pmod 7, \\quad N \\equiv -3 \\pmod 9. \\]<br>Since \\( 5, 7, 9 \\) are pairwise coprime with \\( \\operatorname{lcm}(5, 7, 9) = 315 \\), CRT immediately gives \\( N \\equiv -3 \\equiv 312 \\pmod{315} \\). Thus the smallest positive solution is <strong>\\( N = 312 \\)</strong>.</p>',
          '<p><strong>المسألة:</strong> أوجد أصغر عدد صحيح موجب \\( N > 10 \\) يترك باقياً \\( 2 \\) عند قسمته على \\( 5 \\)، وباقياً \\( 4 \\) عند قسمته على \\( 7 \\)، وباقياً \\( 6 \\) عند قسمته على \\( 9 \\).</p><p><strong>الحل الأولمبي:</strong> ابحث أولاً عن النمط البنيوي بين المقاسات والبواقي قبل الحساب التقليدي! لاحظ الفروق:<br>\\( 5 - 2 = 3 \\)، و\\( 7 - 4 = 3 \\)، و\\( 9 - 6 = 3 \\)!<br>أي أن \\( N + 3 \\) يقبل القسمة على كل من \\( 5 \\) و\\( 7 \\) و\\( 9 \\) في آنٍ واحد:<br>\\[ N \\equiv -3 \\pmod 5, \\qquad N \\equiv -3 \\pmod 7, \\qquad N \\equiv -3 \\pmod 9. \\]<br>وبما أن الأعداد \\( 5, 7, 9 \\) أولية مثنى مثنى ومضاعفها المشترك الأصغر \\( 315 \\)، فإن مبرهنة الباقي الصيني تعطي فوراً \\( N \\equiv -3 \\equiv 312 \\pmod{315} \\)، وأصغر حل موجب هو <strong>\\( 312 \\)</strong>.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          "Worked Example 2.D — Legendre's Valuation & Divisor Count (KAUST Finals / IMO Shortlist)",
          'مثال محلول 2.D — صيغة ليجاندر والتقييم الأولي لـ \\(n!\\) (نهائيات كاوست)'
        ),
        body: bi(
          "<p><strong>Problem:</strong> Find the largest integer \\( k \\) such that \\( 12^k \\) divides \\( 60! \\).</p><p><strong>Solution:</strong> Prime-factor the base first: \\( 12 = 2^2 \\cdot 3 \\), so \\( 12^k = 2^{2k} \\cdot 3^k \\). Thus \\( 12^k \\mid 60! \\iff 2k \\le v_2(60!) \\) AND \\( k \\le v_3(60!) \\), meaning \\( k = \\min\\!\\left(\\left\\lfloor \\frac{v_2(60!)}{2} \\right\\rfloor,\\; v_3(60!)\\right) \\).<br>1. Compute \\( v_3(60!) \\) by Legendre's formula:<br>\\[ v_3(60!) = \\left\\lfloor \\frac{60}{3} \\right\\rfloor + \\left\\lfloor \\frac{60}{9} \\right\\rfloor + \\left\\lfloor \\frac{60}{27} \\right\\rfloor = 20 + 6 + 2 = 28. \\]<br>2. Compute \\( v_2(60!) \\):<br>\\[ v_2(60!) = \\left\\lfloor \\frac{60}{2} \\right\\rfloor + \\left\\lfloor \\frac{60}{4} \\right\\rfloor + \\left\\lfloor \\frac{60}{8} \\right\\rfloor + \\left\\lfloor \\frac{60}{16} \\right\\rfloor + \\left\\lfloor \\frac{60}{32} \\right\\rfloor = 30 + 15 + 7 + 3 + 1 = 56. \\]<br>3. Compare constraints: \\( \\lfloor 56 / 2 \\rfloor = 28 \\) and \\( v_3(60!) = 28 \\)! Both bounds Tie at \\( 28 \\) — had you lazily assumed \\( 3 \\) is always the bottleneck without checking \\( 2^2 \\), you could miss cases like \\( 8! \\) (where \\( v_3(8!) = 2 \\) and \\( \\lfloor v_2(8!)/2 \\rfloor = \\lfloor 7/2 \\rfloor = 3 \\), vs \\( 9! \\) where \\( v_3(9!) = 4 > \\lfloor 7/2 \\rfloor = 3 \\)!). Here \\( k = \\min(28, 28) = 28 \\).</p>",
          '<p><strong>المسألة:</strong> أوجد أكبر عدد صحيح \\( k \\) بحيث يقسم \\( 12^k \\) العدد \\( 60! \\).</p><p><strong>الحل الأولمبي:</strong> نحلل الأساس أولاً: \\( 12 = 2^2 \\cdot 3 \\)، أي \\( 12^k = 2^{2k} \\cdot 3^k \\). ولكي يتحقق \\( 12^k \\mid 60! \\) يجب أن يتحقق الشرطان \\( 2k \\le v_2(60!) \\) و\\( k \\le v_3(60!) \\) معاً، أي \\( k = \\min\\!\\left(\\lfloor v_2(60!)/2 \\rfloor,\\; v_3(60!)\\right) \\).<br>1. حساب \\( v_3(60!) \\) بصيغة ليجاندر: \\( 20 + 6 + 2 = 28 \\).<br>2. حساب \\( v_2(60!) \\): \\( 30 + 15 + 7 + 3 + 1 = 56 \\implies \\lfloor 56/2 \\rfloor = 28 \\).<br>3. بمقارنة القيدين نجد \\( k = \\min(28, 28) = 28 \\) (انتبه: في حالات مثل \\( 9! \\) يكون \\( v_3(9!) = 4 \\) بينما \\( \\lfloor v_2(9!)/2 \\rfloor = 3 \\)، لذا فحص القيدين معاً إلزامي دائماً!).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ Olympiad Trap — Never Reduce Exponents Modulo m Instead of φ(m)!',
          '⚠ فخ أولمبي قاتل — إياك واختزال الأسس بترديد \\(m\\) بدلاً من \\(\\varphi(m)\\)!'
        ),
        body: bi(
          '<p><strong>Exponents live modulo \\( \\varphi(m) \\), NOT modulo \\( m \\)!</strong> Moreover, \\( a^{\\varphi(m)} \\equiv 1 \\pmod m \\) requires \\( \\gcd(a, m) = 1 \\). If \\( \\gcd(a, m) > 1 \\) (for instance \\( 6^{100} \\bmod 40 \\)), split \\( 40 = 8 \\times 5 \\) into prime-power moduli via CRT: clearly \\( 6^{100} \\equiv 0 \\pmod 8 \\) (since \\( 100 \\ge 3 \\)) and \\( 6^{100} \\equiv 1^{100} = 1 \\pmod 5 \\), yielding \\( 6^{100} \\equiv 16 \\pmod{40} \\) — NOT \\( 1 \\)!</p>',
          '<p><strong>تُختزل الأسس بترديد \\( \\varphi(m) \\) وليس بترديد \\( m \\)!</strong> والأهم من ذلك أن مبرهنة أويلر \\( a^{\\varphi(m)} \\equiv 1 \\pmod m \\) تشترط \\( \\gcd(a, m) = 1 \\). إذا لم يتحقق الشرط (مثل حساب \\( 6^{100} \\bmod 40 \\))، فكك المقاس عبر الباقي الصيني إلى قوى أولية \\( 40 = 8 \\times 5 \\): \\( 6^{100} \\equiv 0 \\pmod 8 \\) و\\( 6^{100} \\equiv 1 \\pmod 5 \\)، فيكون الناتج \\( 16 \\) وليس \\( 1 \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ Contest Strategy — Euclidean Elimination on Variable Expressions',
          '▲ استراتيجية المسابقات — الحذف الإقليدي للعبارات الجبرية المتغيرة'
        ),
        body: bi(
          '<p>Whenever asked for the maximum possible value of \\( \\gcd(A(n), B(n)) \\) as \\( n \\) varies over \\( \\mathbb{Z}^+ \\) (e.g., \\( \\gcd(3n + 7, 5n + 2) \\)), eliminate \\( n \\) linearly: \\( d \\mid 5(3n+7) - 3(5n+2) = 35 - 6 = 29 \\). Thus \\( d \\in \\{1, 29\\} \\), and checking \\( 3n + 7 \\equiv 0 \\pmod{29} \\implies n = 27 \\) confirms \\( 29 \\) is achieved!</p>',
          '<p>عندما يُطلب أكبر قيمة ممكنة للقاسم المشترك الأكبر \\( \\gcd(A(n), B(n)) \\) مثل \\( \\gcd(3n + 7, 5n + 2) \\)، احذف \\( n \\) خطياً: أي قاسم مشترك \\( d \\) يقسم \\( 5(3n+7) - 3(5n+2) = 29 \\)، فيكون أقصى قاسم ممكن هو \\( 29 \\) (ويتحقق فعلياً عند \\( n = 27 \\)).</p>'
        )
      },
      makePractice(
        'Practice 2.1 · NSMO Stage 1 / Easy', 'تدريب 2.1 · نسما المرحلة 1 / سهل',
        'How many positive integer divisors of \\( 720 \\) are perfect squares?',
        'كم قاسماً موجباً للعدد \\( 720 \\) يمثل مربعاً كاملاً؟',
        'Write the prime factorization \\( 720 = 2^4 \\cdot 3^2 \\cdot 5^1 \\).',
        'حلل العدد إلى عوامله الأولية: \\( 720 = 2^4 \\cdot 3^2 \\cdot 5^1 \\).',
        'A divisor \\( 2^a 3^b 5^c \\) is a perfect square iff \\( a, b, c \\) are all even.',
        'يكون القاسم \\( 2^a 3^b 5^c \\) مربعاً كاملاً إذا وفقط إذا كانت الأسس \\( a, b, c \\) زوجية جميعاً.',
        'Count valid choices: \\( a \\in \\{0,2,4\\} \\), \\( b \\in \\{0,2\\} \\), \\( c \\in \\{0\\} \\).',
        'احسب عدد الخيارات الممكنة: \\( a \\in \\{0,2,4\\} \\)، و\\( b \\in \\{0,2\\} \\)، و\\( c \\in \\{0\\} \\).',
        'Since \\( 720 = 2^4 \\cdot 3^2 \\cdot 5^1 \\), even exponents allow \\( 3 \\) choices for \\( a \\) (\\(0,2,4\\)), \\( 2 \\) choices for \\( b \\) (\\(0,2\\)), and \\( 1 \\) choice for \\( c \\) (\\(0\\)), giving \\( 3 \\times 2 \\times 1 = 6 \\) square divisors.',
        'بما أن \\( 720 = 2^4 \\cdot 3^2 \\cdot 5^1 \\)، فاختيار الأسس الزوجية يعطي \\( 3 \\) خيارات لـ \\( a \\) وخيارين لـ \\( b \\) وخياراً واحداً لـ \\( c \\)، أي \\( 3 \\times 2 \\times 1 = 6 \\) قواسم مربعة.'
      ),
      makePractice(
        'Practice 2.2 · KAUST KMC / Easy', 'تدريب 2.2 · مسابقة كاوست / سهل',
        'Compute Euler totient \\( \\varphi(360) \\) — the number of integers \\( 1 \\le k \\le 360 \\) coprime to \\( 360 \\).',
        'احسب قيمة دالة أويلر \\( \\varphi(360) \\)، أي عدد الأعداد الصحيحة من \\( 1 \\) إلى \\( 360 \\) الأولية نسبياً مع \\( 360 \\).',
        'Find the distinct prime factors of \\( 360 = 2^3 \\cdot 3^2 \\cdot 5 \\): primes \\( 2, 3, 5 \\).',
        'استخرج العوامل الأولية المختلفة للعدد \\( 360 = 2^3 \\cdot 3^2 \\cdot 5 \\) وهي \\( 2, 3, 5 \\).',
        'Apply \\( \\varphi(360) = 360\\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{3}\\right)\\left(1 - \\frac{1}{5}\\right) \\).',
        'طبّق القانون \\( \\varphi(360) = 360\\left(1 - \\frac{1}{2}\\right)\\left(1 - \\frac{1}{3}\\right)\\left(1 - \\frac{1}{5}\\right) \\).',
        'Multiply \\( 360 \\times \\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{4}{5} \\).',
        'احسب ناتج الضرب \\( 360 \\times \\frac{1}{2} \\times \\frac{2}{3} \\times \\frac{4}{5} \\).',
        'Using \\( 360 = 2^3 \\cdot 3^2 \\cdot 5 \\), we obtain \\( \\varphi(360) = 360 \\cdot \\frac{1}{2} \\cdot \\frac{2}{3} \\cdot \\frac{4}{5} = 96 \\).',
        'بتطبيق صيغة أويلر على \\( 360 = 2^3 \\cdot 3^2 \\cdot 5 \\) نحصل على \\( \\varphi(360) = 360 \\cdot \\frac{1}{2} \\cdot \\frac{2}{3} \\cdot \\frac{4}{5} = 96 \\).'
      ),
      makePractice(
        'Practice 2.3 · NSMO Stage 2 / Medium', 'تدريب 2.3 · نسما المرحلة 2 / متوسط',
        'Find the remainder when \\( 3^{2026} \\) is divided by \\( 13 \\).',
        'أوجد باقي قسمة \\( 3^{2026} \\) على \\( 13 \\).',
        'Test small powers of \\( 3 \\) modulo \\( 13 \\) before using \\( \\varphi(13) = 12 \\)!',
        'اختبر القوى الصغيرة للعدد \\( 3 \\) بترديد \\( 13 \\) لاكتشاف الرتبة الضربية أولاً!',
        'Observe that \\( 3^3 = 27 = 2(13) + 1 \\equiv 1 \\pmod{13} \\)!',
        'لاحظ أن \\( 3^3 = 27 \\equiv 1 \\pmod{13} \\)!',
        'Reduce the exponent \\( 2026 \\) modulo \\( 3 \\): sum of digits \\( 2+0+2+6 = 10 \\equiv 1 \\pmod 3 \\).',
        'اختزل الأس \\( 2026 \\) بترديد \\( 3 \\): مجموع الأرقام \\( 10 \\equiv 1 \\pmod 3 \\).',
        'Since \\( 3^3 \\equiv 1 \\pmod{13} \\) and \\( 2026 = 3(675) + 1 \\), we have \\( 3^{2026} = (3^3)^{675} \\cdot 3^1 \\equiv 1 \\cdot 3 = 3 \\pmod{13} \\).',
        'بما أن \\( 3^3 \\equiv 1 \\pmod{13} \\) وأن \\( 2026 = 3(675) + 1 \\)، فإن \\( 3^{2026} \\equiv 3^1 = 3 \\pmod{13} \\).'
      ),
      makePractice(
        'Practice 2.4 · AIME / KAUST KMC / Hard', 'تدريب 2.4 · AIME / مسابقة كاوست / متقدم',
        'Find the unique integer \\( x \\in \\{0, 1, \\dots, 104\\} \\) satisfying \\( x \\equiv 1 \\pmod 3 \\), \\( x \\equiv 2 \\pmod 5 \\), and \\( x \\equiv 3 \\pmod 7 \\).',
        'أوجد العدد الصحيح الوحيد \\( x \\in \\{0, 1, \\dots, 104\\} \\) الذي يحقق \\( x \\equiv 1 \\pmod 3 \\) و\\( x \\equiv 2 \\pmod 5 \\) و\\( x \\equiv 3 \\pmod 7 \\).',
        'Check the linear combination \\( 2x + 1 \\) against all three moduli \\( 3, 5, 7 \\)!',
        'افحص المقدار \\( 2x + 1 \\) بترديد كل من \\( 3, 5, 7 \\)!',
        'Notice \\( 2(1)+1 = 3 \\equiv 0 \\pmod 3 \\), \\( 2(2)+1 = 5 \\equiv 0 \\pmod 5 \\), and \\( 2(3)+1 = 7 \\equiv 0 \\pmod 7 \\)!',
        'لاحظ أن \\( 2x + 1 \\) يقبل القسمة على \\( 3 \\) و\\( 5 \\) و\\( 7 \\) معاً!',
        'Thus \\( 2x + 1 \\equiv 0 \\pmod{105} \\implies 2x = 105 - 1 = 104 \\).',
        'إذن \\( 2x + 1 \\equiv 0 \\pmod{105} \\)، وأصغر مضاعف فردي لـ \\( 105 \\) هو \\( 105 \\) نفسه.',
        'In all three congruences, \\( 2x + 1 \\equiv 0 \\pmod m \\) for \\( m \\in \\{3, 5, 7\\} \\). By CRT, \\( 2x + 1 \\equiv 0 \\pmod{105} \\). Taking \\( 2x + 1 = 105 \\) gives \\( x = 52 \\) (checking: \\( 52 = 17(3)+1 = 10(5)+2 = 7(7)+3 \\)).',
        'نلاحظ أن \\( 2x + 1 \\) مضاعف مشترك لـ \\( 3, 5, 7 \\)، أي \\( 2x + 1 \\equiv 0 \\pmod{105} \\). وبوضع \\( 2x + 1 = 105 \\) نحصل فوراً على \\( x = 52 \\).'
      ),
      makePractice(
        'Practice 2.5 · NSMO National Finals / LTE', 'تدريب 2.5 · نهائيات نسما / لمّة LTE',
        'Using Lifting-the-Exponent (LTE), find the exact 3-adic valuation \\( v_3(7^{54} - 1) \\) — i.e., the largest integer \\( k \\) such that \\( 3^k \\mid (7^{54} - 1) \\).',
        'باستخدام لمّة رفع الأس (LTE)، أوجد قيمة \\( v_3(7^{54} - 1) \\)، أي أكبر عدد صحيح \\( k \\) يحقق \\( 3^k \\mid (7^{54} - 1) \\).',
        'Check LTE conditions for odd prime \\( p = 3 \\): \\( x = 7, y = 1 \\), so \\( 3 \\mid (7 - 1) = 6 \\) and \\( 3 \\nmid 7 \\cdot 1 \\).',
        'تحقق من شروط لمّة LTE للعدد الأولي الفردي \\( p = 3 \\): لدينا \\( 3 \\mid (7 - 1) = 6 \\) و\\( 3 \\nmid 7 \\).',
        'Apply \\( v_3(x^n - y^n) = v_3(x - y) + v_3(n) \\) with \\( x = 7, y = 1, n = 54 \\).',
        'طبّق قانون LTE مباشرةً: \\( v_3(7^{54} - 1) = v_3(7 - 1) + v_3(54) \\).',
        'Compute \\( v_3(6) = 1 \\) and \\( v_3(54) = v_3(2 \\cdot 3^3) = 3 \\).',
        'احسب \\( v_3(6) = 1 \\) و\\( v_3(54) = v_3(2 \\cdot 27) = 3 \\).',
        'Since \\( p = 3 \\) is an odd prime with \\( 3 \\mid (7 - 1) \\) and \\( 3 \\nmid 7 \\), LTE gives \\( v_3(7^{54} - 1) = v_3(6) + v_3(54) = 1 + 3 = 4 \\). Thus \\( 3^4 = 81 \\) is the highest power of \\( 3 \\) dividing \\( 7^{54} - 1 \\).',
        'بما أن \\( p = 3 \\) أولي فردي ويحقق \\( 3 \\mid (7 - 1) \\)، تعطي لمّة LTE: \\( v_3(7^{54} - 1) = v_3(6) + v_3(54) = 1 + 3 = 4 \\)، أي أن أعلى قوة لـ \\( 3 \\) هي \\( 3^4 = 81 \\).'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'Number Theory II: Diophantine Equations, SFFT & Vieta Jumping', chapterId: 'ol-diophantine-equations', trackId: 'olympiad' },
          { label: 'NSMO of KSA — National Finals & IMO Pathway', chapterId: 'ol-nsmo-national-finals', trackId: 'olympiad' },
          { label: 'KAUST KMC Regional Qualifier', chapterId: 'ol-kaust-kmc-qualifier', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['Modular Arithmetic, Primes & Divisibility']
  }
};

const ch03 = {
  id: 'ol-diophantine-equations',
  chapterNumber: '3',
  subsectionBanner: SUBSEC_1,
  title: bi(
    'Number Theory II: Diophantine Equations, SFFT, Bounding & Vieta Jumping',
    'نظرية الأعداد (2): المعادلات الديوفانتية وتحليل سايمون (SFFT) والقفز الفييتي'
  ),
  railLabel: bi('Diophantine Equations & SFFT', 'المعادلات الديوفانتية و SFFT'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '🧩',
    category: 'Core Pillar 3 — Olympiad Number Theory II',
    badges: [{ text: 'IMO · NSMO · KAUST KMC', className: 'tier-e' }],
    topics: [
      'Linear Diophantine equations & Chicken McNugget Theorem',
      "Simon's Favorite Factoring Trick (SFFT)",
      'Modular quadratic obstructions & infinite descent',
      'Inequality bounding & discriminant tests',
      'Vieta root flipping (IMO 1988 Q6 technique)'
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'A <strong>Diophantine equation</strong> asks for integer (or positive integer) solutions to a polynomial equation with fewer equations than unknowns. Because integers are discrete, Olympiad solvers unlock Diophantine equations using five decisive weapons: <strong>factoring into divisor pairs (SFFT)</strong>, <strong>modular contradictions</strong>, <strong>monotonic inequality bounding</strong>, <strong>Fermat infinite descent</strong>, and <strong>Vieta root flipping</strong>.',
          'تبحث <strong>المعادلة الديوفانتية</strong> عن حلول صحيحة (أو موجبة) لمعادلة بعدد مجاهيل يفوق عدد المعادلات. ونظراً لطبيعة الأعداد الصحيحة المتقطعة، يحسم المتسابقون هذه المعادلات بخمس أدوات أولمبية قاطعة: <strong>التحليل إلى أزواج قواسم (SFFT)</strong>، و<strong>التناقضات المعيارية</strong>، و<strong>الحصر بالمتباينات</strong>، و<strong>النزول اللانهائي لفيرما</strong>، و<strong>القفز الفييتي للجذور</strong>.'
        )
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          "● Definition 3.1 — Linear Parameterization, Chicken McNugget & SFFT",
          '● تعريف 3.1 — الحل العام الخطي ومبرهنة فروبينيوس وتحليل سايمون (SFFT)'
        ),
        body: bi(
          "<p><strong>1. Linear Diophantine Theorem:</strong> \\( ax + by = c \\) has integer solutions iff \\( d = \\gcd(a,b) \\mid c \\). Given one particular solution \\( (x_0, y_0) \\), ALL integer solutions are parameterized by \\( t \\in \\mathbb{Z} \\):</p>\\[ x = x_0 + \\frac{b}{d}t, \\qquad y = y_0 - \\frac{a}{d}t. \\]<p><strong>2. Frobenius Coin (Chicken McNugget) Theorem:</strong> For coprime \\( a, b > 1 \\), the largest integer NOT representable as \\( ax + by \\) with \\( x, y \\in \\mathbb{Z}_{\\ge 0} \\) is \\( ab - a - b \\), and exactly \\( \\frac{(a-1)(b-1)}{2} \\) non-negative integers are non-representable.</p><p><strong>3. Simon's Favorite Factoring Trick (SFFT):</strong> Every bilinear equation \\( xy + rx + sy = c \\) factors by adding \\( rs \\) to both sides:</p>\\[ (x + s)(y + r) = c + rs. \\]",
          '<p><strong>1. المعادلة الديوفانتية الخطية:</strong> تقبل \\( ax + by = c \\) حلولاً صحيحة إذا وفقط إذا كان \\( d = \\gcd(a,b) \\mid c \\). وبمعرفة حل خاص واحد \\( (x_0, y_0) \\)، تُعطى جميع الحلول الصحيحة بالوسيط \\( t \\in \\mathbb{Z} \\):</p>\\[ x = x_0 + \\frac{b}{d}t, \\qquad y = y_0 - \\frac{a}{d}t. \\]<p><strong>2. مبرهنة العملات لفروبينيوس:</strong> لعددين أوليين نسبياً \\( a, b > 1 \\)، أكبر عدد صحيح لا يمكن كتابته على الصورة \\( ax + by \\) مع \\( x, y \\ge 0 \\) هو \\( ab - a - b \\)، وعدد الأعداد غير القابلة للتمثيل يساوي \\( \\frac{(a-1)(b-1)}{2} \\).</p><p><strong>3. حيلة تحليل سايمون (SFFT):</strong> كل معادلة ثنائية الخطية \\( xy + rx + sy = c \\) تتحلل بإضافة \\( rs \\) إلى الطرفين:</p>\\[ (x + s)(y + r) = c + rs. \\]'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          '● Theorem 3.2 — Pythagorean Triples, Floor Hermite Identity & Vieta Jumping',
          '● مبرهنة 3.2 — ثلاثيات فيثاغورس ومتطابقة هيرميت لدالة الصحيح والقفز الفييتي'
        ),
        body: bi(
          "<p><strong>1. Primitive Pythagorean Triples:</strong> Every solution to \\( x^2 + y^2 = z^2 \\) in coprime positive integers (with \\( x \\) odd, \\( y \\) even) has the form \\( x = m^2 - n^2,\\; y = 2mn,\\; z = m^2 + n^2 \\) for coprime \\( m > n \\ge 1 \\) of opposite parity.</p><p><strong>2. Hermite's Floor Identity:</strong> For any real \\( x \\) and positive integer \\( n \\), \\( \\sum_{k=0}^{n-1} \\left\\lfloor x + \\frac{k}{n} \\right\\rfloor = \\lfloor nx \\rfloor \\).</p><p><strong>3. Vieta Root Flipping (IMO 1988 Q6):</strong> When a symmetric quadratic Diophantine relation \\( x^2 - kxy + y^2 + c = 0 \\) holds, fixing \\( y \\) and viewing it as a quadratic in \\( x \\) with one integer root \\( x_1 \\) produces a second integer root \\( x_2 = ky - x_1 = \\frac{y^2 + c}{x_1} \\), jumping to a strictly smaller minimal solution unless \\( c \\) forces a fixed value of \\( k \\)!</p>",
          '<p><strong>1. ثلاثيات فيثاغورس البدائية:</strong> كل حل للمعادلة \\( x^2 + y^2 = z^2 \\) بأعداد موجبة أولية نسبياً (مع \\( x \\) فردي و\\( y \\) زوجي) يُكتب على الصورة \\( x = m^2 - n^2,\\; y = 2mn,\\; z = m^2 + n^2 \\) حيث \\( m > n \\ge 1 \\) أوليان نسبياً ومختلفا الزوجية.</p><p><strong>2. متطابقة هيرميت لدالة الجزء الصحيح:</strong> لأي عدد حقيقي \\( x \\) وعدد صحيح موجب \\( n \\): \\( \\sum_{k=0}^{n-1} \\left\\lfloor x + \\frac{k}{n} \\right\\rfloor = \\lfloor nx \\rfloor \\).</p><p><strong>3. القفز الفييتي للجذور (مسألة IMO 1988 الشهيرة):</strong> في معادلة تربيعية متماثلة مثل \\( x^2 - kxy + y^2 + c = 0 \\)، تثبيت \\( y \\) واعتبارها معادلة في \\( x \\) يولّد جذراً صحيحاً ثانياً \\( x_2 = ky - x_1 = \\frac{y^2 + c}{x_1} \\)، مما يسمح بالنزول إلى حل أصغر حتى نصل إلى الشرط الحدي الحاسم لقيمة \\( k \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          '◆ Proof — Classic IMO 1988 Problem 6 Core Step via Vieta Jumping',
          '◆ البرهان الأولمبي — جوهر مسألة IMO 1988 رقم 6 عبر القفز الفييتي'
        ),
        body: bi(
          "<p>Suppose \\( a, b \\in \\mathbb{Z}^+ \\) satisfy \\( \\frac{a^2 + b^2}{ab + 1} = k \\in \\mathbb{Z}^+ \\). Assume \\( k \\) is NOT a perfect square, and among all positive integer solutions \\( (a, b) \\) for this fixed \\( k \\), choose the pair minimizing \\( a + b \\), with \\( a \\ge b \\ge 1 \\). Rewrite as a quadratic in \\( x = a \\): \\( x^2 - (kb)x + (b^2 - k) = 0 \\). One root is \\( x_1 = a \\); by Vieta, the second root satisfies:</p>\\[ x_2 = kb - a \\in \\mathbb{Z} \\qquad \\text{and} \\qquad x_2 = \\frac{b^2 - k}{a}. \\]<p>Since \\( k \\) is not a square, \\( x_2 \\ne 0 \\). If \\( x_2 < 0 \\), then \\( x_2 \\le -1 \\implies x_2^2 - kbx_2 + b^2 - k \\ge 1 + kb + b^2 - k = b^2 + k(b-1) + 1 > 0 \\), contradicting \\( x_2 \\) being a root! Thus \\( x_2 \\ge 1 \\) is a positive integer, AND \\( x_2 = \\frac{b^2 - k}{a} < \\frac{a^2}{a} = a \\), contradicting the minimality of \\( a + b \\)! Therefore \\( k \\) <strong>must be a perfect square</strong>. \\( \\blacksquare \\)</p>",
          '<p>لنفترض أن \\( a, b \\in \\mathbb{Z}^+ \\) يحققان \\( \\frac{a^2 + b^2}{ab + 1} = k \\in \\mathbb{Z}^+ \\). نفرض جدلاً أن \\( k \\) ليس مربعاً كاملاً، ونختار الزوج \\( (a, b) \\) ذا المجموع الأصغر \\( a + b \\) مع \\( a \\ge b \\ge 1 \\). نكتب المعادلة تربيعيةً في \\( x = a \\): \\( x^2 - (kb)x + (b^2 - k) = 0 \\). جذرها الأول \\( x_1 = a \\)، ومن علاقات فييتا يحقق الجذر الثاني:</p>\\[ x_2 = kb - a \\in \\mathbb{Z} \\qquad \\text{وكذلك} \\qquad x_2 = \\frac{b^2 - k}{a}. \\]<p>بما أن \\( k \\) ليس مربعاً كاملاً فإن \\( x_2 \\ne 0 \\). ولو كان \\( x_2 < 0 \\) لكان \\( x_2 \\le -1 \\) ومنه \\( x_2^2 - kbx_2 + b^2 - k \\ge 1 + kb + b^2 - k = b^2 + k(b-1) + 1 > 0 \\)، وهذا يناقض كونه جذراً! إذن \\( x_2 \\ge 1 \\) عدد صحيح موجب، وبما أن \\( x_2 = \\frac{b^2 - k}{a} < \\frac{a^2}{a} = a \\) نحصل على حل موجب بمجموع أصغر \\( x_2 + b < a + b \\)، تناقض! وعليه لا بد أن يكون \\( k \\) <strong>مربعاً كاملاً</strong>. \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'Olympiad Diophantine Diagnostic Matrix: Matching Equation Shape to Method',
          'مصفوفة تشخيص المعادلات الديوفانتية: اختيار الطريقة الأولمبية المناسبة'
        ),
        columns: [
          bi('Equation Structure', 'بنية المعادلة'),
          bi('Primary Olympiad Technique', 'الأداة الأولمبية الأساسية'),
          bi('Key Reduction', 'التحويل الجوهري')
        ],
        rows: [
          [
            bi('\\(\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{n}\\) or \\(xy + ax + by = c\\)', '\\(\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{n}\\) أو \\(xy + ax + by = c\\)'),
            bi("Simon's Favorite Factoring Trick (SFFT)", 'حيلة تحليل سايمون (SFFT)'),
            bi('\\((x - n)(y - n) = n^2\\) → count \\(\\tau(n^2)\\) divisors', '\\((x - n)(y - n) = n^2\\) وحساب قواسم \\(\\tau(n^2)\\)')
          ],
          [
            bi('\\(x^2 - dy^2 = N\\) or \\(x^2 + y^2 = 4k + 3\\)', '\\(x^2 - dy^2 = N\\) أو \\(x^2 + y^2 = 4k + 3\\)'),
            bi('Modular Residue Obstruction', 'التناقض المعياري للبواقي التربيعية'),
            bi('\\(x^2 + y^2 \\equiv 0, 1, 2 \\pmod 4\\) → never \\(3 \\pmod 4\\)!', 'مجموع مربعين لا يطابق \\(3 \\pmod 4\\) أبداً!')
          ],
          [
            bi('\\(\\frac{1}{x} + \\frac{1}{y} + \\frac{1}{z} = 1\\) (symmetric)', '\\(\\frac{1}{x} + \\frac{1}{y} + \\frac{1}{z} = 1\\) (متماثلة)'),
            bi('WLOG Ordering & Bounding', 'افترض دون إخلال بالعمومية \\(x \\le y \\le z\\)'),
            bi('\\(1 \\le \\frac{3}{x} \\implies x \\in \\{2, 3\\}\\), reducing to 2 variables!', '\\(1 \\le \\frac{3}{x} \\implies x \\in \\{2, 3\\}\\) وتتحول إلى مجهولين!')
          ],
          [
            bi('\\(2^x - 3^y = \\pm 1\\) (Exponential Diophantine)', '\\(2^x - 3^y = \\pm 1\\) (معادلات أسية صحيحة)'),
            bi('Parity / Mod \\(3, 4, 8\\) + Difference of Squares', 'الزوجية والترديد \\(\\pmod{3,4,8}\\) + فرق المربعين'),
            bi('Even exponent forces \\((2^{x/2}-1)(2^{x/2}+1) = 3^y\\)', 'الأس الزوجي يجبر العاملين المتتاليين على قوى لـ \\(3\\)')
          ]
        ]
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('Unit-Fraction Formula', 'معادلة مجموع كسرين وحيدين'),
            value: bi('Ordered positive solutions to \\(\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{n}\\) equal \\(\\tau(n^2)\\)', 'عدد الحلول الموجبة المرتبة لـ \\(\\frac{1}{x} + \\frac{1}{y} = \\frac{1}{n}\\) يساوي \\(\\tau(n^2)\\)')
          },
          {
            label: bi('Consecutive Square Squeeze', 'الحصر بين مربعين متتاليين'),
            value: bi('No integer square lies strictly between \\(n^2\\) and \\((n+1)^2 = n^2+2n+1\\)!', 'لا يوجد أي مربع كامل محصور قطعاً بين \\(n^2\\) و\\((n+1)^2 = n^2+2n+1\\)!')
          },
          {
            label: bi('Discriminant Integrality', 'شرط المميز المربع الكامل'),
            value: bi('If \\(ax^2+bx+c=0\\) has \\(x \\in \\mathbb{Z}\\), then \\(\\Delta = b^2 - 4ac = m^2\\) for some \\(m \\in \\mathbb{Z}_{\\ge 0}\\)', 'إذا كان \\(x \\in \\mathbb{Z}\\) فلا بد أن يكون المميز \\(\\Delta = b^2 - 4ac = m^2\\) مربعاً كاملاً')
          },
          {
            label: bi('Floor Decomposition', 'تفكيك الجزء الصحيح والكسر'),
            value: bi('Always write \\(x = n + r\\) with \\(n = \\lfloor x \\rfloor \\in \\mathbb{Z}\\) and \\(0 \\le r < 1\\)', 'اكتب دائماً \\(x = n + r\\) حيث \\(n = \\lfloor x \\rfloor \\in \\mathbb{Z}\\) و\\(0 \\le r < 1\\)')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'SFFT Hyperbola (x − 2)(y − 3) = 6 and Its Lattice Solutions in ℤ²',
          xrange: [-5, 9],
          yrange: [-4, 10],
          fns: [
            { fn: '3 + 6/(x - 2)', color: 'var(--fig-indigo)', label: '(x − 2)(y − 3) = 6' }
          ],
          points: [
            { x: 3, y: 9, label: '(3, 9)' },
            { x: 4, y: 6, label: '(4, 6)' },
            { x: 5, y: 5, label: '(5, 5)' },
            { x: 8, y: 4, label: '(8, 4)' },
            { x: 1, y: -3, label: '(1, −3)' },
            { x: 0, y: 0, label: '(0, 0)' }
          ]
        },
        caption: bi(
          'Geometric meaning of SFFT: \\(xy - 3x - 2y = 0 \\iff (x - 2)(y - 3) = 6\\) is a rectangular hyperbola with asymptotes \\(x = 2\\) and \\(y = 3\\); its integer lattice points correspond 1-to-1 with the \\(2\\tau(6) = 8\\) signed divisors of \\(6\\).',
          'المعنى الهندسي لتحليل سايمون (SFFT): تمثل المعادلة \\((x - 2)(y - 3) = 6\\) قطعاً زائداً مقارباه \\(x = 2\\) و\\(y = 3\\)، وتتقابل نقاطه الصحيحة واحداً لواحد مع جميع قواسم العدد \\(6\\) الموجبة والسالبة (\\(8\\) حلول).'
        )
      },
      makeExplorerBlock({
        canvasId: 'oldiophantineequationsExCanvas',
        titleEn: "⊙ Explorer · SFFT Hyperbola Lattice & Divisor-Pair Solutions Lab",
        titleAr: '⊙ مستكشف تفاعلي · مختبر الشبكة الصحيحة لتحليل سايمون (SFFT) وأزواج القواسم',
        ariaEn: 'Interactive Diophantine explorer graphing the hyperbola (x - a)(y - a) = N and highlighting all integer lattice points.',
        ariaAr: 'مستكشف تفاعلي للمعادلات الديوفانتية يرسم القطع الزائد (x - a)(y - a) = N ويبرز جميع نقاط الشبكة الصحيحة.',
        captionEn: 'Exact integer lattice solutions to \\((x - a)(y - a) = N\\)',
        captionAr: 'جميع الحلول الصحيحة للمعادلة \\((x - a)(y - a) = N\\)',
        s0LabelEn: 'Asymptote Shift <b>\\(a =\\)</b>', s0LabelAr: 'إزاحة المقارب <b>\\(a =\\)</b>',
        s0Min: 1, s0Max: 5, s0Val: 2, s0Step: 1,
        s0AriaEn: 'Asymptote shift parameter a', s0AriaAr: 'معامل إزاحة خط المقارب a',
        s1LabelEn: 'Factorized Constant <b>\\(N =\\)</b>', s1LabelAr: 'ثابت التحليل <b>\\(N =\\)</b>',
        s1Min: 2, s1Max: 18, s1Val: 6, s1Step: 1,
        s1AriaEn: 'Right-hand constant N', s1AriaAr: 'الثابت الصحيح N',
        r0LabelEn: 'Positive Divisors \\(\\tau(N)\\)', r0LabelAr: 'القواسم الموجبة \\(\\tau(N)\\)', r0Init: 'τ(6) = 4',
        r1LabelEn: 'Total \\(\\mathbb{Z}^2\\) Solutions \\(2\\tau(N)\\)', r1LabelAr: 'إجمالي حلول \\(\\mathbb{Z}^2\\)', r1Init: '8 lattice pts',
        r2LabelEn: 'Closest Pair \\((x, y)\\)', r2LabelAr: 'أقرب زوج حلول \\((x, y)\\)', r2Init: '(4, 5)',
        noteEn: 'Vary \\(a\\) and \\(N\\) to watch the hyperbola \\((x - a)(y - a) = N\\) pass through integer grid intersections. Notice prime values of \\(N\\) yield only \\(4\\) total integer points, while highly composite \\(N = 12, 18\\) light up \\(12\\) lattice solutions!',
        noteAr: 'غيّر \\(a\\) و\\(N\\) لمراقبة مرور القطع الزائد \\((x - a)(y - a) = N\\) بنقاط الشبكة الصحيحة؛ لاحظ أن القيم الأولية لـ \\(N\\) تعطي \\(4\\) نقاط فقط بينما القيم المركبة كالعدد \\(12\\) تضيء \\(12\\) نقطة صحيحة!'
      }),
      {
        kind: 'figure',
        figure: {
          type: 'fn',
          title: 'Square-Squeeze Trap: y² = x² + 3x + 5 Lies Strictly Between (x+1)² and (x+2)² for x ≥ 2',
          xrange: [0, 6],
          yrange: [0, 60],
          fns: [
            { fn: '(x+1)*(x+1)', color: 'var(--fig-teal)', dash: '4,4', label: '(x + 1)²' },
            { fn: 'x*x + 3*x + 5', color: 'var(--fig-indigo)', label: 'x² + 3x + 5' },
            { fn: '(x+2)*(x+2)', color: 'var(--fig-amber)', dash: '4,4', label: '(x + 2)²' }
          ],
          points: [{ x: 1, y: 9, label: 'x=1: y²=9 ✓' }]
        },
        caption: bi(
          'Consecutive-square bounding in action: for \\(x > 1\\), \\((x+1)^2 = x^2+2x+1 < x^2+3x+5 < x^2+4x+4 = (x+2)^2\\) whenever \\(x > 1\\), trapping \\(y^2\\) strictly between two consecutive squares and leaving only finite check \\(x = 1 \\implies y = \\pm 3\\)!',
          'آلية الحصر بين مربعين متتاليين: لكل \\(x > 1\\) يتحقق \\((x+1)^2 < x^2+3x+5 < (x+2)^2\\)، مما يحبس \\(y^2\\) قطعاً بين مربعين متتاليين ويجعل الحل الموجب الوحيد عند التقاطع \\(x = 1 \\implies y = 3\\)!'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 3.A — Counting Unit-Fraction Solutions via SFFT (AMC 10/12 & NSMO)',
          'مثال محلول 3.A — عدّ حلول معادلة الكسور الوحيدة عبر SFFT (AMC 10/12 ونسما)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> How many ordered pairs of positive integers \\( (x, y) \\) satisfy \\( \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{18} \\)?</p><p><strong>Solution:</strong> Clear denominators (noting \\( x, y > 18 \\) since \\( \\frac{1}{x} < \\frac{1}{18} \\)):<br>\\[ 18(x + y) = xy \\iff xy - 18x - 18y = 0. \\]<br>Add \\( (-18)(-18) = 324 \\) to both sides (SFFT):<br>\\[ (x - 18)(y - 18) = 324 = 2^2 \\cdot 3^4. \\]<br>Since \\( x, y \\ge 1 \\), we have \\( x - 18 > -18 \\) and \\( y - 18 > -18 \\). If \\( x - 18 < 0 \\), both factors are negative with product \\( 324 \\), which is impossible since \\( (-17)(-17) = 289 < 324 \\)! Thus every positive divisor \\( d \\mid 324 \\) gives a unique valid positive pair \\( x = 18 + d,\\; y = 18 + \\frac{324}{d} \\).<br>The number of ordered pairs is \\( \\tau(324) = (2 + 1)(4 + 1) = 15 \\).</p>',
          '<p><strong>المسألة:</strong> كم زوجاً مرتباً من الأعداد الصحيحة الموجبة \\( (x, y) \\) يحقق المعادلة \\( \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{18} \\)؟</p><p><strong>الحل الأولمبي:</strong> بضرب الطرفين في \\( 18xy \\) وترتيب الحدود:<br>\\[ xy - 18x - 18y = 0 \\iff (x - 18)(y - 18) = 18^2 = 324 = 2^2 \\cdot 3^4. \\]<br>لا يمكن أن يكون العاملان سالبين معاً لأن \\( x, y \\ge 1 \\implies x - 18 \\ge -17 \\) وأقصى جداء لعاملين سالبين هو \\( (-17)(-17) = 289 < 324 \\). إذن كل قاسم موجب \\( d \\) للعدد \\( 324 \\) يعطي حلاً موجباً وحيداً \\( (18 + d,\\; 18 + 324/d) \\)، وعدد الأزواج المرتبة يساوي \\( \\tau(324) = (2+1)(4+1) = 15 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 3.B — Exponential Diophantine Equation (NSMO Stage 3 / BMO)',
          'مثال محلول 3.B — حل معادلة ديوفانتية أسية بالكامل (نهائيات نسما / BMO)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Find all pairs of non-negative integers \\( (x, y) \\) satisfying \\( 3^x - 2^y = 7 \\).</p><p><strong>Solution:</strong><br>1. Check small \\( y \\) first: \\( y = 0 \\implies 3^x = 8 \\) (no); \\( y = 1 \\implies 3^x = 9 \\implies (x, y) = (2, 1) \\); \\( y = 2 \\implies 3^x = 11 \\) (no).<br>2. Now assume \\( y \\ge 3 \\), so \\( 8 \\mid 2^y \\), meaning \\( 2^y \\equiv 0 \\pmod 8 \\). Reducing the equation modulo \\( 8 \\) gives \\( 3^x = 2^y + 7 \\equiv 7 \\pmod 8 \\). However, powers of \\( 3 \\pmod 8 \\) alternate exclusively between \\( 1 \\) and \\( 3 \\) (\\( 3^{2k} \\equiv 1,\\; 3^{2k+1} \\equiv 3 \\pmod 8 \\)) and can never equal \\( 7 \\pmod 8 \\)!<br>Therefore \\( (x, y) = (2, 1) \\) is the <strong>unique solution</strong> in non-negative integers!</p>',
          '<p><strong>المسألة:</strong> أوجد جميع أزواج الأعداد الصحيحة غير السالبة \\( (x, y) \\) التي تحقق المعادلة \\( 3^x - 2^y = 7 \\).</p><p><strong>الحل الأولمبي:</strong><br>1. نفحص القيم الصغيرة لـ \\( y \\) أولاً: عند \\( y = 0 \\implies 3^x = 8 \\) (مستحيل)؛ عند \\( y = 1 \\implies 3^x = 9 \\implies (x, y) = (2, 1) \\)؛ عند \\( y = 2 \\implies 3^x = 11 \\) (مستحيل).<br>2. نفترض الآن \\( y \\ge 3 \\)، فيكون \\( 2^y \\equiv 0 \\pmod 8 \\)، وتقتضي المعادلة \\( 3^x = 2^y + 7 \\equiv 7 \\pmod 8 \\). لكن قوى العدد \\( 3 \\) بترديد \\( 8 \\) تتناوب حصراً بين \\( 1 \\) و\\( 3 \\) (\\( 3^{2k} \\equiv 1,\\; 3^{2k+1} \\equiv 3 \\pmod 8 \\)) ولا تساوي \\( 7 \\) أبداً!<br>إذن لا توجد أي حلول أخرى، والحل الوحيد هو <strong>\\( (2, 1) \\)</strong>.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 3.C — Consecutive-Square Bounding in Quartic/Quadratic Equations (KAUST KMC)',
          'مثال محلول 3.C — الحصر بين مربعين متتاليين (مسابقة كاوست للرياضيات)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Find all positive integers \\( n \\) such that \\( n^4 + 2n^3 + 2n^2 + 2n + 1 \\) is a perfect square.</p><p><strong>Solution:</strong> Compare \\( E(n) = n^4 + 2n^3 + 2n^2 + 2n + 1 \\) with nearby squares of monic quadratics \\( (n^2 + n + c)^2 \\):<br>1. Lower square: \\( (n^2 + n)^2 = n^4 + 2n^3 + n^2 < E(n) \\) for all \\( n \\ge 1 \\) (since \\( n^2 + 2n + 1 = (n+1)^2 > 0 \\)).<br>2. Upper square: \\( (n^2 + n + 1)^2 = n^4 + 2n^3 + 3n^2 + 2n + 1 \\). Comparing with \\( E(n) \\):<br>\\[ (n^2 + n + 1)^2 - E(n) = n^2 > 0 \\quad \\text{for all } n \\ge 1. \\]<br>Hence for every positive integer \\( n \\ge 1 \\),<br>\\[ (n^2 + n)^2 < n^4 + 2n^3 + 2n^2 + 2n + 1 < (n^2 + n + 1)^2! \\]<br>Because \\( E(n) \\) is strictly trapped between two consecutive integer squares, there are <strong>zero positive integer solutions</strong>! (Algebraic confirmation: \\( E(n) = (n^2 + 1)(n + 1)^2 \\), which is a square iff \\( n^2 + 1 \\) is a square — impossible for \\( n \\ge 1 \\)!)</p>',
          '<p><strong>المسألة:</strong> أوجد جميع الأعداد الصحيحة الموجبة \\( n \\) التي تجعل المقدار \\( n^4 + 2n^3 + 2n^2 + 2n + 1 \\) مربعاً كاملاً.</p><p><strong>الحل الأولمبي (بطريقتين):</strong><br><strong>الطريقة الأولى (الحصر بين مربعين متتاليين):</strong> لكل \\( n \\ge 1 \\) نقارن المقدار \\( E(n) \\) بمربعَي عددين متتاليين:<br>\\[ (n^2 + n)^2 = n^4 + 2n^3 + n^2 < E(n) < n^4 + 2n^3 + 3n^2 + 2n + 1 = (n^2 + n + 1)^2. \\]<br>بما أن \\( E(n) \\) محصور قطعاً بين مربعين متتاليين، فلا يمكن أن يكون مربعاً كاملاً لأي \\( n \\ge 1 \\)!<br><strong>الطريقة الثانية (التحليل الأولمبي):</strong> نلاحظ أن \\( E(n) = (n^2 + 1)(n + 1)^2 \\)، ولكي يكون مربعاً كاملاً يجب أن يكون \\( n^2 + 1 \\) مربعاً كاملاً، وهو مستحيل لكل \\( n \\ge 1 \\)! إذن <strong>لا توجد حلول موجبة</strong>.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 3.D — Fractional-Part Floor-Sum Jump Analysis (AIME / KAUST Finals)',
          'مثال محلول 3.D — تحليل قفزات مجاميع دالة الجزء الصحيح (AIME / نهائيات كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Among the \\( 60 \\) integers \\( \\{0, 1, 2, \\dots, 59\\} \\), how many can NEVER be expressed in the form \\( g(x) = \\lfloor x \\rfloor + \\lfloor 2x \\rfloor + \\lfloor 3x \\rfloor \\) for any real number \\( x \\)?</p><p><strong>Solution:</strong> Write \\( x = n + r \\) where \\( n = \\lfloor x \\rfloor \\in \\mathbb{Z} \\) and \\( r = \\{x\\} \\in [0, 1) \\). Then:<br>\\[ g(x) = n + (2n + \\lfloor 2r \\rfloor) + (3n + \\lfloor 3r \\rfloor) = 6n + \\lfloor 2r \\rfloor + \\lfloor 3r \\rfloor. \\]<br>Partition \\( r \\in [0, 1) \\) at the jump thresholds \\( \\frac{1}{3}, \\frac{1}{2}, \\frac{2}{3} \\):<br>• \\( r \\in [0, \\frac{1}{3}) \\implies 0 + 0 = 0 \\)<br>• \\( r \\in [\\frac{1}{3}, \\frac{1}{2}) \\implies 0 + 1 = 1 \\)<br>• \\( r \\in [\\frac{1}{2}, \\frac{2}{3}) \\implies 1 + 1 = 2 \\)<br>• \\( r \\in [\\frac{2}{3}, 1) \\implies 1 + 2 = 3 \\).<br>Thus in every block of \\( 6 \\) consecutive integers \\( \\{6n, 6n+1, \\dots, 6n+5\\} \\), \\( g(x) \\) attains the \\( 4 \\) residues \\( 6n + \\{0, 1, 2, 3\\} \\) and strictly skips the \\( 2 \\) residues \\( 6n + 4 \\) and \\( 6n + 5 \\)! Since \\( \\{0, 1, \\dots, 59\\} \\) consists of \\( 10 \\) complete blocks of length \\( 6 \\), exactly \\( 10 \\times 2 = 20 \\) integers are skipped.</p>',
          '<p><strong>المسألة:</strong> من بين الأعداد الصحيحة \\( \\{0, 1, 2, \\dots, 59\\} \\)، كم عدداً لا يمكن كتابته أبداً على الصورة \\( g(x) = \\lfloor x \\rfloor + \\lfloor 2x \\rfloor + \\lfloor 3x \\rfloor \\) لأي عدد حقيقي \\( x \\)؟</p><p><strong>الحل الأولمبي:</strong> نكتب \\( x = n + r \\) حيث \\( n = \\lfloor x \\rfloor \\in \\mathbb{Z} \\) والجزء الكسري \\( r \\in [0, 1) \\)، فيصبح:<br>\\[ g(x) = 6n + \\lfloor 2r \\rfloor + \\lfloor 3r \\rfloor. \\]<br>نقسّم الفترة \\( [0, 1) \\) عند نقاط القفز \\( \\frac{1}{3}, \\frac{1}{2}, \\frac{2}{3} \\):<br>• \\( r \\in [0, \\frac{1}{3}) \\implies 0 + 0 = 0 \\)<br>• \\( r \\in [\\frac{1}{3}, \\frac{1}{2}) \\implies 0 + 1 = 1 \\)<br>• \\( r \\in [\\frac{1}{2}, \\frac{2}{3}) \\implies 1 + 1 = 2 \\)<br>• \\( r \\in [\\frac{2}{3}, 1) \\implies 1 + 2 = 3 \\).<br>إذن في كل دورة طولها \\( 6 \\) أعداد \\( \\{6n, \\dots, 6n+5\\} \\)، يأخذ المقدار البواقي \\( 0, 1, 2, 3 \\) ويقفز دائماً عن العددين \\( 6n + 4 \\) و\\( 6n + 5 \\)! وبما أن \\( \\{0, \\dots, 59\\} \\) تتكون من \\( 10 \\) دورات كاملة، فإن عدد الأعداد غير القابلة للتمثيل هو \\( 10 \\times 2 = 20 \\) عدداً.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ Olympiad Trap — Forgetting Negative Divisors & Zero Edge Cases in SFFT',
          '⚠ فخ أولمبي شائع — إغفال القواسم السالبة وحالة الصفر في تحليل SFFT'
        ),
        body: bi(
          '<p>When solving \\( (x + s)(y + r) = N \\), carefully read whether the domain specifies <strong>all integers \\( \\mathbb{Z} \\)</strong>, <strong>non-negative integers \\( \\mathbb{Z}_{\\ge 0} \\)</strong>, or <strong>positive integers \\( \\mathbb{Z}^+ \\)</strong>! Over \\( \\mathbb{Z} \\), every negative divisor pair \\( (-d, -N/d) \\) is also valid, doubling the count to \\( 2\\tau(|N|) \\); over \\( \\mathbb{Z}^+ \\), you must explicitly filter out pairs that yield \\( x \\le 0 \\) or \\( y \\le 0 \\).</p>',
          '<p>عند حل \\( (x + s)(y + r) = N \\)، انتبه بدقة لمجال المسألة: هل المطلوب <strong>جميع الأعداد الصحيحة \\( \\mathbb{Z} \\)</strong> أم <strong>الأعداد الموجبة \\( \\mathbb{Z}^+ \\)</strong>؟ في \\( \\mathbb{Z} \\) تُحتسب أزواج القواسم السالبة \\( (-d, -N/d) \\) أيضاً فيتضاعف العدد إلى \\( 2\\tau(|N|) \\)، بينما في \\( \\mathbb{Z}^+ \\) يجب استبعاد أي قاسم يعطي \\( x \\le 0 \\) أو \\( y \\le 0 \\).</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ Contest Strategy — Coprime GCD Factoring for Powers',
          '▲ استراتيجية المسابقات — استغلال الأولية النسبية للعوامل في المعادلات الأسية'
        ),
        body: bi(
          '<p>Whenever \\( AB = z^k \\) in positive integers (such as \\( n(n+1) = z^2 \\) or \\( (x-1)(x+1) = 3^y \\)), compute \\( g = \\gcd(A, B) \\) FIRST! Since \\( \\gcd(n, n+1) = 1 \\), BOTH \\( n \\) and \\( n+1 \\) would have to be individual \\( k \\)-th powers — immediately forcing \\( n = 0 \\)!</p>',
          '<p>كلما ظهر جداء يساوي قوة كاملة \\( AB = z^k \\) (مثل \\( n(n+1) = z^2 \\) أو \\( (x-1)(x+1) = 3^y \\))، احسب \\( g = \\gcd(A, B) \\) أولاً! فإذا كان العاملان أوليين نسبياً (\\( g = 1 \\))، وجب أن يكون كل عامل بمفرده قوة كاملة من الدرجة \\( k \\)!</p>'
        )
      },
      makePractice(
        'Practice 3.1 · NSMO Stage 1 / Easy', 'تدريب 3.1 · نسما المرحلة 1 / سهل',
        'What is the largest positive integer that CANNOT be written in the form \\( 7a + 11b \\) for non-negative integers \\( a, b \\ge 0 \\)?',
        'ما أكبر عدد صحيح موجب لا يمكن كتابته على الصورة \\( 7a + 11b \\) حيث \\( a, b \\ge 0 \\) عددان صحيحان غير سالبين؟',
        'Check that \\( \\gcd(7, 11) = 1 \\), so the Frobenius Coin (Chicken McNugget) theorem applies.',
        'بما أن \\( \\gcd(7, 11) = 1 \\)، تنطبق مبرهنة العملات لفروبينيوس مباشرةً.',
        'Recall the formula \\( ab - a - b \\) for non-negative coefficients.',
        'استخدم الصيغة \\( ab - a - b \\) للمعاملات غير السالبة.',
        'Compute \\( 7 \\times 11 - 7 - 11 \\).',
        'احسب \\( 77 - 7 - 11 \\).',
        'By the Chicken McNugget Theorem for coprime \\( 7 \\) and \\( 11 \\), the largest non-representable integer is \\( 7(11) - 7 - 11 = 77 - 18 = 59 \\).',
        'حسب مبرهنة فروبينيوس للعددين الأوليين نسبياً \\( 7 \\) و\\( 11 \\)، أكبر عدد لا يمكن تمثيله هو \\( 7(11) - 7 - 11 = 59 \\).'
      ),
      makePractice(
        'Practice 3.2 · KAUST KMC / Easy', 'تدريب 3.2 · مسابقة كاوست / سهل',
        'Find the sum \\( x + y \\) for the unique pair of positive integers \\( (x, y) \\) with \\( x \\le y \\) satisfying \\( xy + 3x + 5y = 62 \\).',
        'أوجد المجموع \\( x + y \\) للزوج الوحيد من الأعداد الصحيحة الموجبة \\( (x, y) \\) مع \\( x \\le y \\) الذي يحقق \\( xy + 3x + 5y = 62 \\).',
        'Add \\( 3 \\times 5 = 15 \\) to both sides to factor by SFFT.',
        'أضف \\( 3 \\times 5 = 15 \\) إلى الطرفين لتطبيق تحليل SFFT.',
        'Rewrite as \\( (x + 5)(y + 3) = 62 + 15 = 77 = 7 \\times 11 \\).',
        'تصبح المعادلة \\( (x + 5)(y + 3) = 77 = 7 \\times 11 \\).',
        'Since \\( x \\ge 1 \\implies x + 5 \\ge 6 \\) and \\( y \\ge x \\), match the prime factors \\( 7 \\) and \\( 11 \\)!',
        'بما أن \\( x + 5 \\ge 6 \\) و\\( x \\le y \\)، طابق العاملين الأوليين \\( 7 \\) و\\( 11 \\)!',
        'Adding \\( 15 \\) gives \\( (x + 5)(y + 3) = 77 = 7 \\times 11 \\). Since \\( x \\ge 1 \\implies x + 5 \\ge 6 \\) and \\( x \\le y \\), the unique solution with \\( x \\le y \\) is \\( x + 5 = 7,\\; y + 3 = 11 \\implies (x, y) = (2, 8) \\), giving \\( x + y = 10 \\).',
        'بإضافة \\( 15 \\) نحصل على \\( (x + 5)(y + 3) = 77 = 7 \\times 11 \\). وبما أن \\( x + 5 \\ge 6 \\) و\\( x \\le y \\)، فإن الحل الوحيد هو \\( x + 5 = 7,\\; y + 3 = 11 \\implies (x, y) = (2, 8) \\)، ومجموعهما \\( x + y = 10 \\).'
      ),
      makePractice(
        'Practice 3.3 · NSMO Stage 2 / Medium', 'تدريب 3.3 · نسما المرحلة 2 / متوسط',
        'How many pairs of integers \\( (x, y) \\in \\mathbb{Z}^2 \\) satisfy \\( x^2 - 4y^2 = 2026 \\)?',
        'كم زوجاً من الأعداد الصحيحة \\( (x, y) \\in \\mathbb{Z}^2 \\) يحقق المعادلة \\( x^2 - 4y^2 = 2026 \\)؟',
        'Reduce the entire equation modulo \\( 4 \\)!',
        'اختزل المعادلة بأكملها بترديد \\( 4 \\)!',
        'Notice \\( -4y^2 \\equiv 0 \\pmod 4 \\), while \\( 2026 = 4(506) + 2 \\equiv 2 \\pmod 4 \\).',
        'لاحظ أن \\( -4y^2 \\equiv 0 \\pmod 4 \\) بينما \\( 2026 \\equiv 2 \\pmod 4 \\).',
        'What are the possible residues of \\( x^2 \\pmod 4 \\)?',
        'ما البواقي الممكنة لأي مربع كامل \\( x^2 \\pmod 4 \\)؟',
        'Reducing modulo \\( 4 \\) gives \\( x^2 \\equiv 2026 \\equiv 2 \\pmod 4 \\). However, every integer square satisfies \\( x^2 \\equiv 0 \\) or \\( 1 \\pmod 4 \\), never \\( 2 \\pmod 4 \\). Hence there are \\( 0 \\) integer solutions.',
        'بأخذ الترديد \\( \\pmod 4 \\) نجد \\( x^2 \\equiv 2026 \\equiv 2 \\pmod 4 \\)، ولكن أي مربع كامل يطابق \\( 0 \\) أو \\( 1 \\pmod 4 \\) فقط، ومن ثم فإن عدد الحلول يساوي \\( 0 \\).'
      ),
      makePractice(
        'Practice 3.4 · AIME / KAUST KMC / Hard', 'تدريب 3.4 · AIME / مسابقة كاوست / متقدم',
        'Find all ordered triples of positive integers \\( (x, y, z) \\) with \\( x \\le y \\le z \\) satisfying \\( \\frac{1}{x} + \\frac{1}{y} + \\frac{1}{z} = 1 \\), and compute the largest possible value of \\( z \\).',
        'أوجد جميع الثلاثيات المرتبة من الأعداد الصحيحة الموجبة \\( x \\le y \\le z \\) التي تحقق \\( \\frac{1}{x} + \\frac{1}{y} + \\frac{1}{z} = 1 \\)، وحدد أكبر قيمة ممكنة للعدد \\( z \\).',
        'Since \\( x \\le y \\le z \\), \\( 1 = \\frac{1}{x} + \\frac{1}{y} + \\frac{1}{z} \\le \\frac{3}{x} \\implies x \\in \\{2, 3\\} \\) (since \\( x = 1 \\) leaves \\( 0 \\)).',
        'بما أن \\( x \\le y \\le z \\)، فإن \\( 1 \\le \\frac{3}{x} \\implies x \\in \\{2, 3\\} \\).',
        'For \\( x = 3 \\), \\( \\frac{1}{y} + \\frac{1}{z} = \\frac{2}{3} \\le \\frac{2}{y} \\implies y = 3, z = 3 \\).',
        'عند \\( x = 3 \\) نجد \\( y = z = 3 \\).',
        'For \\( x = 2 \\), solve \\( \\frac{1}{y} + \\frac{1}{z} = \\frac{1}{2} \\iff (y - 2)(z - 2) = 4 \\) for \\( 2 \\le y \\le z \\).',
        'عند \\( x = 2 \\) حل \\( (y - 2)(z - 2) = 4 \\) مع \\( y \\le z \\).',
        'For \\( x = 2 \\), \\( (y - 2)(z - 2) = 4 \\) gives \\( (y-2, z-2) \\in \\{(1,4), (2,2)\\} \\), yielding \\( (2, 3, 6) \\) and \\( (2, 4, 4) \\). Together with \\( (3, 3, 3) \\), there are three ordered solutions and the largest \\( z \\) is \\( 6 \\).',
        'عند \\( x = 2 \\) تعطي \\( (y - 2)(z - 2) = 4 \\) الحلين \\( (2, 3, 6) \\) و\\( (2, 4, 4) \\)، ومع \\( (3, 3, 3) \\) تكون أكبر قيمة ممكنة لـ \\( z \\) هي \\( 6 \\).'
      ),
      makePractice(
        'Practice 3.5 · NSMO National Finals / Vieta Jumping', 'تدريب 3.5 · نهائيات نسما / القفز الفييتي',
        'Suppose positive integers \\( a, b \\) satisfy \\( \\frac{a^2 + b^2}{ab - 1} = k \\) for a positive integer \\( k \\). Find the sum of ALL possible integer values of \\( k \\).',
        'إذا كان \\( a, b \\) عددين صحيحين موجبين يحققان \\( \\frac{a^2 + b^2}{ab - 1} = k \\) لعدد صحيح موجب \\( k \\)، فأوجد مجموع جميع القيم الصحيحة الممكنة للعدد \\( k \\).',
        'Apply Vieta root flipping on a minimal pair \\( a \\ge b \\ge 1 \\) for \\( x^2 - kbx + (b^2 + k) = 0 \\).',
        'طبّق القفز الفييتي على الزوج الأصغر \\( a \\ge b \\ge 1 \\) في المعادلة \\( x^2 - kbx + (b^2 + k) = 0 \\).',
        'Here \\( x_2 = \\frac{b^2 + k}{a} > 0 \\) is ALWAYS positive! Minimality forces \\( x_2 \\ge a \\implies b^2 + k \\ge a^2 \\), or check small base pairs \\( (a, b) = (2, 1) \\) and \\( (3, 2) \\)!',
        'لاحظ أن \\( x_2 = \\frac{b^2 + k}{a} > 0 \\) موجب دائماً! اختبر الحالات الأساسية عندما يتساوى أو يصغر الجذر مثل \\( b = 1 \\) أو \\( b = 2 \\).',
        'At \\( (a, b) = (2, 1) \\) and \\( (3, 1) \\), \\( k = \\frac{4 + 1}{2 - 1} = \\frac{9 + 1}{3 - 1} = 5 \\)! Check that \\( a = b \\) gives \\( (a^2 - 1) \\mid 2 \\) (impossible for \\( ab > 1 \\)) and Vieta descent reduces any \\( a > b \\ge 2 \\) down to \\( b = 1 \\).',
        'عند \\( (2, 1) \\) نجد \\( k = 5 \\)، وعند \\( (3, 1) \\) نجد \\( k = 5 \\) أيضاً! وإذا كان \\( a > b \\ge 2 \\) فإن النزول الفييتي يصل حتماً إلى \\( b = 1 \\)، حيث \\( a - 1 \\mid a^2 + 1 = (a-1)(a+1) + 2 \\implies a - 1 \\in \\{1, 2\\} \\implies a \\in \\{2, 3\\} \\)!',
        'By Vieta jumping on minimal \\( (a, b) \\) with \\( a > b \\) (since \\( a = b \\ge 2 \\implies a^2 - 1 \\mid 2 \\), impossible), if \\( b \\ge 2 \\) and \\( x_2 \\ge a \\), careful descent shows every solution reduces to \\( b = 1 \\), where \\( k = \\frac{a^2 + 1}{a - 1} = a + 1 + \\frac{2}{a - 1} \\). Thus \\( (a - 1) \\mid 2 \\implies a \\in \\{2, 3\\} \\), both giving \\( k = 5 \\)! Hence \\( k = 5 \\) is the ONLY possible integer value.',
        'ينزل القفز الفييتي بأي حل موجب \\( a > b \\) حتى نصل إلى الحالة الحدية \\( b = 1 \\)، وعندها \\( k = \\frac{a^2 + 1}{a - 1} = a + 1 + \\frac{2}{a - 1} \\). إذن \\( (a - 1) \\mid 2 \\implies a \\in \\{2, 3\\} \\)، وفي الحالتين معاً \\( k = 5 \\) فقط! إذن القيمة الوحيدة الممكنة هي \\( 5 \\).'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'Number Theory I: Divisibility, Fermat–Euler & CRT', chapterId: 'ol-modular-number-theory', trackId: 'olympiad' },
          { label: 'Combinatorics I: Bijective Counting, Stars & Bars & PIE', chapterId: 'ol-combinatorics-counting', trackId: 'olympiad' },
          { label: 'NSMO of KSA — National Finals & Mawhiba IMO Pathway', chapterId: 'ol-nsmo-national-finals', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['Diophantine Equations, SFFT & Floor Functions']
  }
};

// Fix Practice 3.2 stem cleanly so question and solution both use 62!
ch03.content.blocks.forEach((b) => {
  if (b.kind === 'practiceProblem' && b.question.en.includes('Practice 3.2')) {
    b.question = bi(
      '<strong>[Practice 3.2 · KAUST KMC / Easy]</strong> Find the sum \\( x + y \\) for the unique pair of positive integers \\( (x, y) \\) with \\( x \\le y \\) satisfying \\( xy + 3x + 5y = 62 \\).',
      '<strong>[تدريب 3.2 · مسابقة كاوست / سهل]</strong> أوجد المجموع \\( x + y \\) للزوج الوحيد من الأعداد الصحيحة الموجبة \\( (x, y) \\) مع \\( x \\le y \\) الذي يحقق المعادلة \\( xy + 3x + 5y = 62 \\).'
    );
    b.hints = [
      bi('Add \\( 3 \\times 5 = 15 \\) to both sides to factor via SFFT.', 'أضف \\( 3 \\times 5 = 15 \\) إلى الطرفين لتطبيق تحليل SFFT.'),
      bi('Rewrite as \\( (x + 5)(y + 3) = 62 + 15 = 77 = 7 \\times 11 \\).', 'تصبح المعادلة \\( (x + 5)(y + 3) = 77 = 7 \\times 11 \\).'),
      bi('Since \\( x \\ge 1 \\implies x + 5 \\ge 6 \\) and \\( y \\ge 1 \\implies y + 3 \\ge 4 \\), match \\( (7, 11) \\) or \\( (11, 7) \\) with \\( x \\le y \\).', 'بما أن \\( x + 5 \\ge 6 \\) و\\( y + 3 \\ge 4 \\)، قارن بين \\( (7, 11) \\) و\\( (11, 7) \\) مع شرط \\( x \\le y \\).')
    ];
    b.solution = bi(
      'Adding \\( 15 \\) to both sides yields \\( (x + 5)(y + 3) = 77 \\). Since \\( x + 5 \\ge 6 \\) and \\( y + 3 \\ge 4 \\), the factor pairs of \\( 77 \\) are \\( (7, 11) \\implies (x, y) = (2, 8) \\) and \\( (11, 7) \\implies (x, y) = (6, 4) \\). With \\( x \\le y \\), \\( (x, y) = (2, 8) \\) and \\( x + y = 10 \\).',
      'بإضافة \\( 15 \\) للطرفين نحصل على \\( (x + 5)(y + 3) = 77 \\). وبما أن \\( x + 5 \\ge 6 \\) و\\( y + 3 \\ge 4 \\)، فإن الزوج الموافق لشرط \\( x \\le y \\) هو \\( x + 5 = 7,\\; y + 3 = 11 \\implies (x, y) = (2, 8) \\)، ومنه \\( x + y = 10 \\).'
    );
  }
});

const ch04 = {
  id: 'ol-combinatorics-counting',
  chapterNumber: '4',
  subsectionBanner: SUBSEC_1,
  title: bi(
    'Combinatorics I: Bijective Counting, Stars & Bars, Inclusion–Exclusion & Pigeonhole',
    'التركيبات (1): العد التقابلي والنجوم والفواصل والشمول والإقصاء ومبدأ برج الحمام'
  ),
  railLabel: bi('Bijective Counting, PIE & Pigeonhole', 'التركيبات والشمول والإقصاء وبرج الحمام'),
  chapterTag: {
    variant: 'category',
    className: 'igcse-tag',
    emoji: '🎲',
    category: 'Core Pillar 4 — Olympiad Combinatorics I',
    badges: [{ text: 'IMO · NSMO · KAUST KMC', className: 'tier-e' }],
    topics: [
      'Bijective mappings & double counting',
      'Stars and Bars with lower/upper constraints',
      'Hockey-Stick & Vandermonde identities',
      'Principle of Inclusion–Exclusion (PIE) & Derangements',
      'Generalized Pigeonhole Principle & graph degrees'
    ]
  },
  content: {
    blocks: [
      {
        kind: 'text',
        body: bi(
          'Olympiad combinatorics replaces messy casework with <strong>structural bijections</strong>: instead of counting a complicated set \\( A \\) directly, construct a 1-to-1 correspondence \\( f: A \\to B \\) onto a clean set \\( B \\) of binary strings, lattice paths, or subset choices. Paired with <strong>Stars and Bars</strong>, the <strong>Principle of Inclusion–Exclusion (PIE)</strong>, and Dirichlet’s <strong>Pigeonhole Principle</strong>, these tools form the backbone of NSMO, KAUST KMC, AMC/AIME, and IMO combinatorics.',
          'تستبدل التركيبات الأولمبية تقسيم الحالات المرهق بـ<strong>التقابلات البنيوية (Bijections)</strong>: فبدلاً من عدّ مجموعة معقدة \\( A \\) مباشرةً، ننشئ تقابلاً واحداً لواحد \\( f: A \\to B \\) مع مجموعة واضحة من المتتابعات الثنائية أو مسارات الشبكة. وبالاقتران مع <strong>النجوم والفواصل</strong> و<strong>مبدأ الشمول والإقصاء (PIE)</strong> و<strong>مبدأ برج الحمام لديريخليه</strong>، تتشكل الركيزة الأساسية لمسائل التركيبات في نسما وكاوست وAIME وIMO.'
        )
      },
      {
        kind: 'callout',
        style: 'def',
        label: bi(
          '● Definition 4.1 — Stars & Bars, Hockey-Stick & Vandermonde Convolution',
          '● تعريف 4.1 — النجوم والفواصل ومتطابقتا عصا الهوكي وفاندرموند'
        ),
        body: bi(
          "<p><strong>1. Stars and Bars:</strong> The number of solutions to \\( x_1 + x_2 + \\cdots + x_k = n \\) is:</p>\\[ \\binom{n - 1}{k - 1} \\text{ in positive integers } (x_i \\ge 1), \\qquad \\binom{n + k - 1}{k - 1} \\text{ in non-negative integers } (x_i \\ge 0). \\]<p><strong>2. Hockey-Stick &amp; Vandermonde Identities:</strong></p>\\[ \\sum_{i=r}^{n} \\binom{i}{r} = \\binom{n + 1}{r + 1}, \\qquad \\sum_{j=0}^{k} \\binom{m}{j}\\binom{n}{k - j} = \\binom{m + n}{k}, \\qquad \\sum_{j=0}^{n} \\binom{n}{j}^2 = \\binom{2n}{n}. \\]",
          '<p><strong>1. النجوم والفواصل (Stars and Bars):</strong> عدد حلول المعادلة \\( x_1 + x_2 + \\cdots + x_k = n \\) يساوي:</p>\\[ \\binom{n - 1}{k - 1} \\text{ في الأعداد الموجبة } (x_i \\ge 1), \\qquad \\binom{n + k - 1}{k - 1} \\text{ في الأعداد غير السالبة } (x_i \\ge 0). \\]<p><strong>2. متطابقتا عصا الهوكي وفاندرموند:</strong></p>\\[ \\sum_{i=r}^{n} \\binom{i}{r} = \\binom{n + 1}{r + 1}, \\qquad \\sum_{j=0}^{k} \\binom{m}{j}\\binom{n}{k - j} = \\binom{m + n}{k}, \\qquad \\sum_{j=0}^{n} \\binom{n}{j}^2 = \\binom{2n}{n}. \\]'
        )
      },
      {
        kind: 'callout',
        style: 'thm',
        label: bi(
          '● Theorem 4.2 — Principle of Inclusion–Exclusion (PIE), Derangements & Pigeonhole',
          '● مبرهنة 4.2 — مبدأ الشمول والإقصاء والتبديلات الخالية ومبدأ برج الحمام'
        ),
        body: bi(
          "<p><strong>1. Principle of Inclusion–Exclusion (PIE):</strong> For finite subsets \\( A_1, \\dots, A_m \\subseteq U \\), the number of elements in NONE of the \\( A_i \\) is:</p>\\[ \\left|U \\setminus \\bigcup_{i=1}^m A_i\\right| = |U| - \\sum_{i} |A_i| + \\sum_{i<j} |A_i \\cap A_j| - \\cdots + (-1)^m |A_1 \\cap \\cdots \\cap A_m|. \\]<p>In particular, the number of <strong>derangements</strong> \\( D_n \\) (permutations of \\( \\{1,\\dots,n\\} \\) with \\( \\pi(i) \\ne i \\) for all \\( i \\)) is \\( D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!} \\) (\\( D_1=0, D_2=1, D_3=2, D_4=9, D_5=44 \\)).</p><p><strong>2. Generalized Pigeonhole Principle:</strong> Placing \\( N \\) objects into \\( k \\) boxes forces at least one box to contain at least \\( \\lceil N / k \\rceil \\) objects.</p>",
          '<p><strong>1. مبدأ الشمول والإقصاء (PIE):</strong> لمجموعات جزئية منتهية \\( A_1, \\dots, A_m \\subseteq U \\)، عدد عناصر \\( U \\) التي لا تنتمي إلى أيٍّ من \\( A_i \\) يعطى بالصيغة:</p>\\[ \\left|U \\setminus \\bigcup_{i=1}^m A_i\\right| = |U| - \\sum_{i} |A_i| + \\sum_{i<j} |A_i \\cap A_j| - \\cdots + (-1)^m |A_1 \\cap \\cdots \\cap A_m|. \\]<p>وبوجه خاص، عدد <strong>التبديلات الخالية من النقاط الثابتة (Derangements)</strong> يساوي \\( D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!} \\) (حيث \\( D_1=0,\\; D_2=1,\\; D_3=2,\\; D_4=9,\\; D_5=44 \\)).</p><p><strong>2. مبدأ برج الحمام المعمم:</strong> عند توزيع \\( N \\) عنصراً على \\( k \\) صناديق، لا بد من وجود صندوق واحد على الأقل يحوي \\( \\lceil N / k \\rceil \\) عنصراً على الأقل.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'pf',
        label: bi(
          '◆ Proof — Combinatorial Proof of the Hockey-Stick Identity by Last Element',
          '◆ البرهان الأولمبي — البرهان التوافقي لمتطابقة عصا الهوكي عبر العنصر الأكبر'
        ),
        body: bi(
          "<p>How many \\( (r + 1) \\)-element subsets can be chosen from \\( S = \\{1, 2, \\dots, n + 1\\} \\)? On the right-hand side, by definition, there are \\( \\binom{n+1}{r+1} \\) such subsets. On the left-hand side, partition those subsets according to their <strong>largest element</strong> \\( m = i + 1 \\), which must satisfy \\( r + 1 \\le i + 1 \\le n + 1 \\) (so \\( r \\le i \\le n \\)). Once the largest element \\( i + 1 \\) is fixed, the remaining \\( r \\) elements can be chosen freely from \\( \\{1, 2, \\dots, i\\} \\) in \\( \\binom{i}{r} \\) ways. Summing over disjoint cases \\( i = r, r+1, \\dots, n \\) yields \\( \\sum_{i=r}^n \\binom{i}{r} = \\binom{n+1}{r+1} \\). \\( \\blacksquare \\)</p>",
          '<p>بكم طريقة يمكن اختيار مجموعة جزئية مكوّنة من \\( r + 1 \\) عنصراً من المجموعة \\( S = \\{1, 2, \\dots, n + 1\\} \\)؟ الطرف الأيمن يعدّها مباشرةً بـ \\( \\binom{n+1}{r+1} \\). أما الطرف الأيسر فيصنّف هذه المجموعات الجزئية بحسب <strong>أكبر عنصر فيها</strong> وليكن \\( i + 1 \\) حيث \\( r \\le i \\le n \\)؛ فبعد تثبيت العنصر الأكبر \\( i + 1 \\)، نختار العناصر الـ \\( r \\) المتبقية من المجموعة \\( \\{1, 2, \\dots, i\\} \\) بعدد طرق قدره \\( \\binom{i}{r} \\). وبجمع هذه الحالات المتنافية من \\( i = r \\) إلى \\( n \\) يثبت أن \\( \\sum_{i=r}^n \\binom{i}{r} = \\binom{n+1}{r+1} \\). \\( \\blacksquare \\)</p>'
        )
      },
      {
        kind: 'table',
        caption: bi(
          'Classic Olympiad Bijections & Double-Counting Blueprints',
          'خريطة التقابلات الأولمبية الشهيرة ونماذج العد المزدوج'
        ),
        columns: [
          bi('Contest Problem Type', 'نوع مسألة المسابقات'),
          bi('Bijective Transformation', 'التحويل التقابلي الحاسم'),
          bi('Exact Formula', 'الصيغة النهائية')
        ],
        rows: [
          [
            bi('Choose \\(k\\) non-adjacent items from \\(\\{1,\\dots,n\\}\\)', 'اختيار \\(k\\) عناصر غير متجاورة من \\(\\{1,\\dots,n\\}\\)'),
            bi('Insert \\(k\\) chosen balls into the \\(n-k+1\\) gaps around \\(n-k\\) unchosen balls', 'إدراج \\(k\\) عناصر مختارة في الفجوات الـ \\(n-k+1\\) حول العناصر غير المختارة'),
            bi('\\(\\binom{n - k + 1}{k}\\)', '\\(\\binom{n - k + 1}{k}\\)')
          ],
          [
            bi('Non-decreasing sequences \\(1 \\le a_1 \\le a_2 \\le \\dots \\le a_k \\le m\\)', 'متتابعات غير متناقصة \\(1 \\le a_1 \\le \\dots \\le a_k \\le m\\)'),
            bi('Shift \\(b_i = a_i + (i - 1)\\) to get strictly increasing \\(1 \\le b_1 < \\dots < b_k \\le m+k-1\\)', 'الإزاحة \\(b_i = a_i + (i - 1)\\) لتحويلها إلى متزايدة قطعاً'),
            bi('\\(\\binom{m + k - 1}{k}\\)', '\\(\\binom{m + k - 1}{k}\\)')
          ],
          [
            bi('Surjective functions \\(f: \\{1,\\dots,n\\} \\to \\{1,\\dots,k\\}\\)', 'الدوال الشاملة (الغامرة) من مجموعة حجمها \\(n\\) إلى \\(k\\)'),
            bi('PIE on \\(A_i = \\{\\text{functions missing output } i\\}\\)', 'مبدأ الشمول والإقصاء على المخرجات المفقودة'),
            bi('\\(\\sum_{j=0}^k (-1)^j \\binom{k}{j} (k - j)^n\\)', '\\(\\sum_{j=0}^k (-1)^j \\binom{k}{j} (k - j)^n\\)')
          ],
          [
            bi('Diagonal intersections inside convex \\(n\\)-gon (no 3 concurrent)', 'نقاط تقاطع أقطار مضلع محدب ذي \\(n\\) رؤوس بالداخل'),
            bi('Every 4 vertices determine a unique interior diagonal intersection!', 'كل \\(4\\) رؤوس تحدد نقطة تقاطع داخلية وحيدة لقطرين!'),
            bi('\\(\\binom{n}{4}\\)', '\\(\\binom{n}{4}\\)')
          ]
        ]
      },
      {
        kind: 'cards',
        items: [
          {
            label: bi('Handshaking Lemma', 'لمّة المصافحات في الرسوم البيانية'),
            value: bi('\\(\\sum_{v \\in V} \\deg(v) = 2|E|\\); the number of odd-degree vertices is ALWAYS even!', '\\(\\sum_{v \\in V} \\deg(v) = 2|E|\\)؛ عدد الرؤوس ذات الدرجة الفردية زوجي دائماً!')
          },
          {
            label: bi('Derangement Recurrence', 'العلاقة التكرارية للتبديلات الخالية'),
            value: bi('\\(D_n = (n-1)(D_{n-1} + D_{n-2})\\) and \\(D_n = n D_{n-1} + (-1)^n\\)', '\\(D_n = (n-1)(D_{n-1} + D_{n-2})\\) وكذلك \\(D_n = n D_{n-1} + (-1)^n\\)')
          },
          {
            label: bi('Upper-Bound Stars & Bars', 'النجوم والفواصل مع قيد علوي'),
            value: bi('Combine Stars & Bars with PIE on variables exceeding \\(x_i \\ge U + 1\\)', 'ادمج النجوم والفواصل مع الشمول والإقصاء بطرح حالات \\(x_i \\ge U + 1\\)')
          },
          {
            label: bi('Subset-of-Subsets Count', 'الأزواج المرتبة من المجموعات الجزئية'),
            value: bi('Pairs \\((A, B)\\) with \\(A \\subseteq B \\subseteq \\{1,\\dots,n\\}\\) equal \\(3^n\\) (3 states per element)', 'عدد الأزواج \\((A, B)\\) التي تحقق \\(A \\subseteq B \\subseteq \\{1,\\dots,n\\}\\) يساوي \\(3^n\\)')
          }
        ]
      },
      {
        kind: 'figure',
        figure: {
          type: 'venn_populated',
          title: 'PIE Partition on {1, …, 100}: Divisible by 2 (Set A = 50) and by 5 (Set B = 20)',
          setA: 'Div by 2',
          setB: 'Div by 5',
          onlyA: '40',
          both: '10',
          onlyB: '10',
          neither: 'Coprime to 10: 40'
        },
        caption: bi(
          'Principle of Inclusion–Exclusion on \\(\\{1,\\dots,100\\}\\): \\(|A \\cup B| = 50 + 20 - 10 = 60\\), leaving \\(100 - 60 = 40 = \\varphi(100)\\) integers coprime to \\(10\\).',
          'مبدأ الشمول والإقصاء على \\(\\{1,\\dots,100\\}\\): \\(|A \\cup B| = 50 + 20 - 10 = 60\\)، فيتبقى \\(100 - 60 = 40 = \\varphi(100)\\) عدداً أولياً نسبياً مع \\(10\\).'
        )
      },
      makeExplorerBlock({
        canvasId: 'olcombinatoricscountingExCanvas',
        titleEn: "⊙ Explorer · Pascal Binomial Distribution, Stars & Bars & Hockey-Stick Lab",
        titleAr: '⊙ مستكشف تفاعلي · مختبر معاملات باسكال والنجوم والفواصل وعصا الهوكي',
        ariaEn: 'Interactive Combinatorics canvas plotting binomial coefficients C(n, k), cumulative Hockey-Stick sums, and Stars-and-Bars counts.',
        ariaAr: 'لوحة تفاعلية للتركيبات تعرض المعاملات الثنائية ومجاميع عصا الهوكي وعدد حلول النجوم والفواصل.',
        captionEn: 'Exact binomial coefficients \\(\\binom{n}{k}\\), Stars & Bars, and derangement counts',
        captionAr: 'جدول قيم المعاملات التوافقية \\(\\binom{n}{k}\\) والنجوم والفواصل والتبديلات الخالية',
        s0LabelEn: 'Total Items <b>\\(n =\\)</b>', s0LabelAr: 'إجمالي العناصر <b>\\(n =\\)</b>',
        s0Min: 4, s0Max: 12, s0Val: 8, s0Step: 1,
        s0AriaEn: 'Total items n', s0AriaAr: 'العدد الكلي n',
        s1LabelEn: 'Chosen / Bins <b>\\(k =\\)</b>', s1LabelAr: 'العناصر المختارة / الخانات <b>\\(k =\\)</b>',
        s1Min: 1, s1Max: 8, s1Val: 3, s1Step: 1,
        s1AriaEn: 'Chosen count k', s1AriaAr: 'العدد المختار k',
        r0LabelEn: 'Binomial \\(\\binom{n}{k}\\)', r0LabelAr: 'التوافيق \\(\\binom{n}{k}\\)', r0Init: 'C(8, 3) = 56',
        r1LabelEn: 'Stars & Bars \\(\\binom{n+k-1}{k-1}\\)', r1LabelAr: 'النجوم والفواصل \\(\\binom{n+k-1}{k-1}\\)', r1Init: 'C(10, 2) = 45',
        r2LabelEn: 'Non-Adjacent \\(\\binom{n-k+1}{k}\\)', r2LabelAr: 'غير متجاورة \\(\\binom{n-k+1}{k}\\)', r2Init: 'C(6, 3) = 20',
        noteEn: 'Vary \\(n\\) and \\(k\\) to compare standard subset choices \\(\\binom{n}{k}\\), weak compositions \\(\\binom{n+k-1}{k-1}\\), and non-adjacent selections \\(\\binom{n-k+1}{k}\\).',
        noteAr: 'حرّك \\(n\\) و\\(k\\) للمقارنة المباشرة بين التوافيق العادية \\(\\binom{n}{k}\\)، وحلول النجوم والفواصل \\(\\binom{n+k-1}{k-1}\\)، والاختيارات غير المتجاورة \\(\\binom{n-k+1}{k}\\).'
      }),
      {
        kind: 'figure',
        figure: {
          type: 'network_graph',
          title: 'Ramsey K₆ Graph: Any 2-Coloring of C(6,2)=15 Edges Forces a Monochromatic Triangle',
          nodes: [
            { id: '1', x: 50, y: 12, label: 'v₁' },
            { id: '2', x: 85, y: 31, label: 'v₂' },
            { id: '3', x: 85, y: 69, label: 'v₃' },
            { id: '4', x: 50, y: 88, label: 'v₄' },
            { id: '5', x: 15, y: 69, label: 'v₅' },
            { id: '6', x: 15, y: 31, label: 'v₆' }
          ],
          edges: [
            { from: '1', to: '2' }, { from: '1', to: '3' }, { from: '1', to: '4' }, { from: '1', to: '5' }, { from: '1', to: '6' },
            { from: '2', to: '3' }, { from: '3', to: '4' }, { from: '2', to: '4' }
          ]
        },
        caption: bi(
          'Ramsey number \\(R(3,3) = 6\\) via Pigeonhole: vertex \\(v_1\\) has \\(5\\) incident edges in \\(2\\) colors, so by Pigeonhole \\(\\lceil 5/2 \\rceil = 3\\) edges share a color (say to \\(v_2, v_3, v_4\\)); either one edge among \\(\\{v_2,v_3,v_4\\}\\) matches that color (triangle with \\(v_1\\)) or all \\(3\\) have the opposite color (triangle \\(v_2 v_3 v_4\\))!',
          'مبرهنة رامزي \\(R(3,3) = 6\\) عبر برج الحمام: ينطلق من الرأس \\(v_1\\) خمسة أضلاع بلونين، فلا بد من \\(\\lceil 5/2 \\rceil = 3\\) أضلاع من لون واحد نحو \\(v_2, v_3, v_4\\)؛ فإما يظهر ضلع بنفس اللون بينها فيكتمل مثلث مع \\(v_1\\)، أو تتلون الأضلاع الثلاثة جميعاً باللون الآخر فتكوّن المثلث \\(v_2 v_3 v_4\\)!'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 4.A — Stars and Bars with Parity & Lower Bounds (AMC 10/12 & NSMO)',
          'مثال محلول 4.A — النجوم والفواصل مع قيود الزوجية والحدود الدنيا (AMC 10/12 ونسما)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> How many ordered quadruples \\( (w, x, y, z) \\) of positive ODD integers satisfy \\( w + x + y + z = 24 \\)?</p><p><strong>Solution:</strong> Parameterize every positive odd integer cleanly as \\( 2a + 1 \\) with non-negative integer \\( a \\ge 0 \\):<br>Set \\( w = 2a + 1,\\; x = 2b + 1,\\; y = 2c + 1,\\; z = 2d + 1 \\) where \\( a, b, c, d \\in \\mathbb{Z}_{\\ge 0} \\). Substituting into the sum:<br>\\[ (2a + 1) + (2b + 1) + (2c + 1) + (2d + 1) = 24 \\iff 2(a + b + c + d) = 20 \\iff a + b + c + d = 10. \\]<br>Now apply non-negative Stars and Bars with \\( n = 10 \\) stars and \\( k = 4 \\) variables:<br>\\[ \\binom{10 + 4 - 1}{4 - 1} = \\binom{13}{3} = \\frac{13 \\times 12 \\times 11}{6} = 286. \\]</p>',
          '<p><strong>المسألة:</strong> كم رباعية مرتبة \\( (w, x, y, z) \\) من الأعداد الصحيحة الموجبة الفردية تحقق المعادلة \\( w + x + y + z = 24 \\)؟</p><p><strong>الحل الأولمبي:</strong> نمثّل كل عدد موجب فردي بالصورة \\( 2a + 1 \\) حيث \\( a \\ge 0 \\) عدد صحيح غير سالب:<br>نضع \\( w = 2a+1,\\; x = 2b+1,\\; y = 2c+1,\\; z = 2d+1 \\). وبالتعويض في المعادلة:<br>\\[ 2(a + b + c + d) + 4 = 24 \\iff a + b + c + d = 10 \\quad (a,b,c,d \\ge 0). \\]<br>بتطبيق قانون النجوم والفواصل لـ \\( n = 10 \\) و\\( k = 4 \\):<br>\\[ \\binom{10 + 4 - 1}{4 - 1} = \\binom{13}{3} = 286. \\]</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 4.B — Stars and Bars + PIE for Upper Bounds (AIME / KAUST KMC)',
          'مثال محلول 4.B — دمج النجوم والفواصل مع الشمول والإقصاء للقيود العليا (AIME / كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> How many integers between \\( 0 \\) and \\( 9999 \\) inclusive have a sum of decimal digits equal to \\( 14 \\)?</p><p><strong>Solution:</strong> Write a 4-digit padded string \\( d_1 d_2 d_3 d_4 \\) with \\( 0 \\le d_i \\le 9 \\) and \\( d_1 + d_2 + d_3 + d_4 = 14 \\).<br>1. Unrestricted non-negative solutions (\\( d_i \\ge 0 \\)): \\( \\binom{14 + 4 - 1}{3} = \\binom{17}{3} = 680 \\).<br>2. Let \\( A_i \\) be the bad set where \\( d_i \\ge 10 \\). Since \\( 10 + 10 = 20 > 14 \\), <strong>at most ONE digit can be \\( \\ge 10 \\)</strong> (all pairwise intersections \\( A_i \\cap A_j = \\emptyset \\)!).<br>3. For \\( A_1 \\), set \\( d_1\' = d_1 - 10 \\ge 0 \\), giving \\( d_1\' + d_2 + d_3 + d_4 = 4 \\), which has \\( \\binom{4 + 4 - 1}{3} = \\binom{7}{3} = 35 \\) solutions.<br>4. By PIE across the \\( 4 \\) digits:<br>\\[ 680 - \\binom{4}{1} \\cdot 35 = 680 - 140 = 540. \\]</p>',
          '<p><strong>المسألة:</strong> كم عدداً صحيحاً من \\( 0 \\) إلى \\( 9999 \\) يساوي مجموع أرقامه العشرية \\( 14 \\)؟</p><p><strong>الحل الأولمبي:</strong> نمثّل كل عدد بأربع خانات \\( d_1 d_2 d_3 d_4 \\) تحقق \\( 0 \\le d_i \\le 9 \\) و\\( d_1 + d_2 + d_3 + d_4 = 14 \\).<br>1. عدد الحلول غير المقيدة بحد علوي (\\( d_i \\ge 0 \\)): \\( \\binom{17}{3} = 680 \\).<br>2. لتكن \\( A_i \\) مجموعة الحلول المرفوضة التي فيها \\( d_i \\ge 10 \\). بما أن \\( 10 + 10 = 20 > 14 \\)، يستحيل أن يتجاوز رقمان معاً الحد \\( 9 \\) (\\( A_i \\cap A_j = \\emptyset \\))!<br>3. لحساب \\( |A_1| \\) نضع \\( d_1\' = d_1 - 10 \\ge 0 \\) فنحصل على \\( d_1\' + d_2 + d_3 + d_4 = 4 \\)، وعدد حلولها \\( \\binom{7}{3} = 35 \\).<br>4. بتطبيق مبدأ الشمول والإقصاء على الخانات الأربع: \\( 680 - 4(35) = 540 \\) عدداً.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 4.C — Geometric Pigeonhole on Lattice Midpoints & Unit Squares (NSMO)',
          'مثال محلول 4.C — برج الحمام الهندسي على منتصفات الشبكة والمربعات (نسما)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> (a) What is the minimum number of lattice points \\( (x_i, y_i) \\in \\mathbb{Z}^3 \\) in 3D space that MUST be chosen to guarantee at least two chosen points have a midpoint that is ALSO an integer lattice point? (b) If \\( 10 \\) points are placed inside a \\( 3 \\times 3 \\) square, prove two lie at distance \\( \\le \\sqrt{2} \\).</p><p><strong>Solution:</strong><br><strong>(a)</strong> The midpoint \\( \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}, \\frac{z_1+z_2}{2}\\right) \\) is in \\( \\mathbb{Z}^3 \\) iff \\( x_1 \\equiv x_2 \\), \\( y_1 \\equiv y_2 \\), and \\( z_1 \\equiv z_2 \\pmod 2 \\). Each coordinate has \\( 2 \\) parities (Even/Odd), creating \\( 2^3 = 8 \\) parity classes (pigeonholes). Choosing \\( 8 \\) points can place one in each parity class, whereas choosing <strong>\\( 8 + 1 = 9 \\) points</strong> guarantees by Pigeonhole that two share identical parity in all three coordinates!<br><strong>(b)</strong> Partition the \\( 3 \\times 3 \\) square into \\( 9 \\) unit \\( 1 \\times 1 \\) subsquares. With \\( 10 \\) points in \\( 9 \\) boxes, one \\( 1 \\times 1 \\) box contains at least \\( 2 \\) points, and the maximum distance inside a \\( 1 \\times 1 \\) square is its diagonal \\( \\sqrt{1^2 + 1^2} = \\sqrt{2} \\)!</p>',
          '<p><strong>المسألة:</strong> (أ) ما أقل عدد من النقاط الصحيحة \\( (x_i, y_i, z_i) \\in \\mathbb{Z}^3 \\) في الفضاء ثلاثي الأبعاد يجب اختياره لضمان وجود نقطتين منتصفهما نقطة صحيحة أيضاً؟ (ب) برهن أنه عند وضع \\( 10 \\) نقاط داخل مربع \\( 3 \\times 3 \\)، توجد نقطتان المسافة بينهما لا تتجاوز \\( \\sqrt{2} \\).</p><p><strong>الحل الأولمبي:</strong><br><strong>(أ)</strong> يكون المنتصف صحيحاً إذا وفقط إذا تطابقت زوجية الإحداثيات الثلاثة \\( \\pmod 2 \\). هناك \\( 2^3 = 8 \\) أصناف زوجية ممكنة (صناديق)؛ لذا فاختيار <strong>\\( 8 + 1 = 9 \\) نقاط</strong> يضمن بمبدأ برج الحمام وقوع نقطتين في الصنف نفسه!<br><strong>(ب)</strong> نقسّم المربع \\( 3 \\times 3 \\) إلى \\( 9 \\) مربعات وحدة \\( 1 \\times 1 \\). بوجود \\( 10 \\) نقاط في \\( 9 \\) مربعات، يضم أحد المربعات نقطتين على الأقل، وأقصى مسافة داخل مربع الوحدة هي طول قطره \\( \\sqrt{2} \\)!</p>'
        )
      },
      {
        kind: 'callout',
        style: 'example',
        label: bi(
          'Worked Example 4.D — Partial Derangements (KAUST Finals / Olympiad Classic)',
          'مثال محلول 4.D — التبديلات الجزئية الخالية من النقاط الثابتة (نهائيات كاوست)'
        ),
        body: bi(
          '<p><strong>Problem:</strong> Six research fellows at KAUST submit 6 distinct lab notebooks for blind peer review. How many ways can the 6 notebooks be redistributed so that <strong>exactly 2</strong> fellows receive their own notebook and the remaining 4 fellows each receive someone else\'s notebook?</p><p><strong>Solution:</strong> Decompose into two independent decisions:<br>1. Choose WHICH \\( 2 \\) of the \\( 6 \\) fellows are fixed points: \\( \\binom{6}{2} = 15 \\) ways.<br>2. Derange the remaining \\( 4 \\) notebooks so NONE of those \\( 4 \\) fellows receives their own notebook: the number of derangements of \\( 4 \\) items is:<br>\\[ D_4 = 4!\\left(1 - 1 + \\frac{1}{2!} - \\frac{1}{3!} + \\frac{1}{4!}\\right) = 24 - 24 + 12 - 4 + 1 = 9. \\]<br>By the multiplication rule, total valid redistributions \\( = 15 \\times 9 = 135 \\).</p>',
          '<p><strong>المسألة:</strong> قدّم \\( 6 \\) باحثين في كاوست \\( 6 \\) دفاتر أبحاث متمايزة للمراجعة المعمّاة. بكم طريقة يمكن إعادة توزيع الدفاتر الستة بحيث يحصل <strong>باحثان اثنان بالضبط</strong> على دفتريهما الأصليين بينما يحصل كل من الأربعة الباقين على دفتر زميل آخر؟</p><p><strong>الحل الأولمبي:</strong> نفكك العملية إلى خطوتين مستقلتين:<br>1. اختيار الباحثَين اللذين يمثلان نقطتين ثابتتين: \\( \\binom{6}{2} = 15 \\) طريقة.<br>2. تبديل دفاتر الباحثين الأربعة الباقين تبديلاً خالياً تماماً من النقاط الثابتة (\\( D_4 \\)):<br>\\[ D_4 = 4!\\left(\\frac{1}{2!} - \\frac{1}{3!} + \\frac{1}{4!}\\right) = 12 - 4 + 1 = 9. \\]<br>بمبدأ العد الأساسي، عدد الطرق الكلي \\( = 15 \\times 9 = 135 \\) طريقة.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'warn',
        label: bi(
          '⚠ Olympiad Trap — Overcounting Indistinguishable Groups & Fake Sequential Multiplication',
          '⚠ فخ أولمبي قاتل — العدّ المكرر عند الضرب المتتابع بدون مبدأ الشمول والإقصاء'
        ),
        body: bi(
          '<p><strong>Never count "at least one from each category" by picking 1 from each first and multiplying by the rest!</strong> For example, choosing \\( 5 \\) balls from \\( 3 \\) distinct colors so every color appears is NOT \\( \\binom{n_1}{1}\\binom{n_2}{1}\\binom{n_3}{1}\\binom{N-3}{2} \\) — that counts a configuration with \\( 3 \\) red balls three separate times! Always use <strong>PIE</strong> (total minus missing \\( \\ge 1 \\) color plus missing \\( \\ge 2 \\) colors).</p>',
          '<p><strong>إياك وعدّ شرط «واحد على الأقل من كل فئة» باختيار عنصر من كل فئة أولاً ثم ضرب الباقي اعتباطياً!</strong> فهذه الخدعة الخاطئة تعدّ التشكيلات المتعددة مراراً وتكراراً. الأداة السليمة الوحيدة هنا هي <strong>مبدأ الشمول والإقصاء (PIE)</strong> بطرح الحالات التي تغيب فيها فئة أو أكثر.</p>'
        )
      },
      {
        kind: 'callout',
        style: 'tip',
        label: bi(
          '▲ Contest Strategy — Small-n Sanity Verification on Combinatorial Formulas',
          '▲ استراتيجية المسابقات — اختبار الصيغ التوافقية عند قيم صغيرة لـ \\(n\\)'
        ),
        body: bi(
          '<p>Before committing to a combinatorial expression like \\( \\binom{n-k+1}{k} \\) vs \\( \\binom{n-k}{k} \\), plug in \\( n = 4, k = 2 \\) by hand in 5 seconds! For non-adjacent pairs from \\( \\{1,2,3,4\\} \\), the valid pairs are \\( \\{1,3\\}, \\{1,4\\}, \\{2,4\\} \\) (\\( 3 \\) ways), immediately confirming \\( \\binom{4-2+1}{2} = \\binom{3}{2} = 3 \\) rather than \\( \\binom{2}{2} = 1 \\)!</p>',
          '<p>قبل اعتماد أي صيغة توافقية مثل \\( \\binom{n-k+1}{k} \\) مقابل \\( \\binom{n-k}{k} \\)، جرّب حالة يدوية صغيرة مثل \\( n = 4, k = 2 \\) خلال 5 ثوانٍ! للأزواج غير المتجاورة من \\( \\{1,2,3,4\\} \\) نجد \\( \\{1,3\\}, \\{1,4\\}, \\{2,4\\} \\) أي \\( 3 \\) طرق، ما يؤكد فوراً صحة \\( \\binom{3}{2} = 3 \\)!</p>'
        )
      },
      makePractice(
        'Practice 4.1 · NSMO Stage 1 / Easy', 'تدريب 4.1 · نسما المرحلة 1 / سهل',
        'In how many ways can 5 prizes be awarded to 5 winners from a shortlist of 12 finalists if NO finalist can win two adjacent-ranked prizes — wait: let us ask cleanly: In how many ways can 4 books be chosen from a shelf of 11 distinct books in a row so that NO two chosen books were adjacent on the shelf?',
        'بكم طريقة يمكن اختيار 4 كتب من رف يضم 11 كتاباً مختلفاً مرتبة في صف واحد بحيث لا يكون أي كتابين مختارين متجاورين على الرف؟',
        'There are \\( 11 - 4 = 7 \\) unchosen books remaining on the shelf.',
        'يتبقى على الرف \\( 11 - 4 = 7 \\) كتب غير مختارة.',
        'Those 7 unchosen books create \\( 7 + 1 = 8 \\) gaps (including the two ends).',
        'تُحدث هذه الكتب السبعة \\( 7 + 1 = 8 \\) فجوات (بما فيها الطرفان).',
        'Choose \\( 4 \\) of those \\( 8 \\) gaps to place the chosen books: \\( \\binom{8}{4} \\).',
        'اختر \\( 4 \\) فجوات من أصل \\( 8 \\): \\( \\binom{8}{4} \\).',
        'Using the gap bijection \\( \\binom{n - k + 1}{k} \\) with \\( n = 11, k = 4 \\), we obtain \\( \\binom{11 - 4 + 1}{4} = \\binom{8}{4} = \\frac{8 \\times 7 \\times 6 \\times 5}{24} = 70 \\) ways.',
        'بتطبيق تقابل الفجوات \\( \\binom{n - k + 1}{k} \\) عند \\( n = 11, k = 4 \\)، نحصل على \\( \\binom{8}{4} = 70 \\) طريقة.'
      ),
      makePractice(
        'Practice 4.2 · KAUST KMC / Easy', 'تدريب 4.2 · مسابقة كاوست / سهل',
        'Evaluate the Hockey-Stick sum \\( \\binom{3}{3} + \\binom{4}{3} + \\binom{5}{3} + \\cdots + \\binom{10}{3} \\).',
        'احسب قيمة المجموع التوافقي \\( \\binom{3}{3} + \\binom{4}{3} + \\binom{5}{3} + \\cdots + \\binom{10}{3} \\).',
        'Recall the Hockey-Stick Identity \\( \\sum_{i=r}^{n} \\binom{i}{r} = \\binom{n + 1}{r + 1} \\).',
        'طبّق متطابقة عصا الهوكي \\( \\sum_{i=r}^{n} \\binom{i}{r} = \\binom{n + 1}{r + 1} \\).',
        'Substitute \\( r = 3 \\) and \\( n = 10 \\) to obtain \\( \\binom{11}{4} \\).',
        'عوّض بـ \\( r = 3 \\) و\\( n = 10 \\) لتحصل على \\( \\binom{11}{4} \\).',
        'Compute \\( \\frac{11 \\times 10 \\times 9 \\times 8}{24} \\).',
        'احسب \\( \\frac{11 \\times 10 \\times 9 \\times 8}{24} \\).',
        'By the Hockey-Stick Identity, \\( \\sum_{i=3}^{10} \\binom{i}{3} = \\binom{11}{4} = \\frac{11 \\times 10 \\times 9 \\times 8}{24} = 330 \\).',
        'حسب متطابقة عصا الهوكي: \\( \\sum_{i=3}^{10} \\binom{i}{3} = \\binom{11}{4} = 330 \\).'
      ),
      makePractice(
        'Practice 4.3 · NSMO Stage 2 / Medium', 'تدريب 4.3 · نسما المرحلة 2 / متوسط',
        'How many integers in \\( \\{1, 2, \\dots, 1000\\} \\) are divisible by NONE of \\( 2, 3, \\) or \\( 5 \\)?',
        'كم عدداً صحيحاً في المجموعة \\( \\{1, 2, \\dots, 1000\\} \\) لا يقبل القسمة على أيٍّ من \\( 2 \\) أو \\( 3 \\) أو \\( 5 \\)؟',
        'Apply 3-set PIE on \\( A_2, A_3, A_5 \\subseteq \\{1,\\dots,1000\\} \\), or group into blocks of \\( \\operatorname{lcm}(2,3,5) = 30 \\)!',
        'طبّق مبدأ الشمول والإقصاء لثلاث مجموعات، أو قسّم الأعداد إلى دورات طولها \\( 30 \\)!',
        'Using blocks of 30: \\( 990 = 33 \\times 30 \\) gives \\( 33 \\times \\varphi(30) = 33 \\times 8 = 264 \\) integers in \\( \\{1,\\dots,990\\} \\).',
        'في أول \\( 990 = 33 \\times 30 \\) عدداً يوجد \\( 33 \\times \\varphi(30) = 33 \\times 8 = 264 \\) عدداً.',
        'Check the remaining \\( 10 \\) integers \\( \\{991, 992, \\dots, 1000\\} \\) (which mirror \\( \\{1,\\dots,10\\} \\): only \\( 991 \\) and \\( 997 \\) are coprime to \\( 30 \\)).',
        'افحص الأعداد العشرة المتبقية \\( \\{991,\\dots,1000\\} \\) فتجد العددين \\( 991 \\) و\\( 997 \\) فقط.',
        'By 3-set PIE: \\( 1000 - (500 + 333 + 200) + (166 + 100 + 66) - 33 = 1000 - 1033 + 332 - 33 = 266 \\).',
        'بمبدأ الشمول والإقصاء: \\( 1000 - (500 + 333 + 200) + (166 + 100 + 66) - 33 = 266 \\) عدداً.'
      ),
      makePractice(
        'Practice 4.4 · AIME / KAUST KMC / Hard', 'تدريب 4.4 · AIME / مسابقة كاوست / متقدم',
        'How many ordered pairs of subsets \\( (A, B) \\) of \\( S = \\{1, 2, 3, 4, 5\\} \\) satisfy \\( A \\cap B = \\emptyset \\) and \\( A \\cup B \\ne S \\)?',
        'كم زوجاً مرتباً من المجموعات الجزئية \\( (A, B) \\) للمجموعة \\( S = \\{1, 2, 3, 4, 5\\} \\) يحقق \\( A \\cap B = \\emptyset \\) و\\( A \\cup B \\ne S \\)؟',
        'For \\( A \\cap B = \\emptyset \\), each element \\( x \\in S \\) has independently \\( 3 \\) valid states: \\( x \\in A \\) only, \\( x \\in B \\) only, or \\( x \\notin A \\cup B \\).',
        'لتحقيق \\( A \\cap B = \\emptyset \\)، يملك كل عنصر من العناصر الخمسة \\( 3 \\) حالات مستقلة: في \\( A \\) فقط، أو في \\( B \\) فقط، أو خارج \\( A \\cup B \\).',
        'Thus there are \\( 3^5 = 243 \\) disjoint pairs \\( (A, B) \\) in total.',
        'إذن إجمالي الأزواج المنفصلة يساوي \\( 3^5 = 243 \\).',
        'Subtract the pairs where \\( A \\cup B = S \\) (each element has only \\( 2 \\) states: \\( x \\in A \\) or \\( x \\in B \\), giving \\( 2^5 = 32 \\)).',
        'اطرح الأزواج التي تحقق \\( A \\cup B = S \\) (حيث لكل عنصر حالتان فقط: في \\( A \\) أو في \\( B \\)، أي \\( 2^5 = 32 \\)).',
        'Each element of \\( S \\) has \\( 3 \\) disjoint-subset states, giving \\( 3^5 = 243 \\) pairs with \\( A \\cap B = \\emptyset \\). Subtracting the \\( 2^5 = 32 \\) partitions where \\( A \\cup B = S \\) leaves \\( 243 - 32 = 211 \\).',
        'عدد الأزواج التي تحقق \\( A \\cap B = \\emptyset \\) هو \\( 3^5 = 243 \\)، وبطرح الأزواج التي تحقق \\( A \\cup B = S \\) وعددها \\( 2^5 = 32 \\) يتبقى \\( 243 - 32 = 211 \\) زوجاً.'
      ),
      makePractice(
        'Practice 4.5 · NSMO National Finals / Pigeonhole', 'تدريب 4.5 · نهائيات نسما / برج الحمام',
        'What is the minimum number of distinct integers that must be selected from \\( \\{1, 2, \\dots, 50\\} \\) to guarantee that at least two selected integers sum to \\( 51 \\)?',
        'ما أقل عدد من الأعداد الصحيحة المختلفة يجب اختياره من المجموعة \\( \\{1, 2, \\dots, 50\\} \\) لضمان وجود عددين مختارين مجموعهما \\( 51 \\)؟',
        'Pair up the elements of \\( \\{1, \\dots, 50\\} \\) into disjoint boxes that sum to \\( 51 \\): \\( \\{1,50\\}, \\{2,49\\}, \\dots, \\{25,26\\} \\).',
        'قسّم عناصر \\( \\{1, \\dots, 50\\} \\) إلى أزواج منفصلة مجموع كل منها \\( 51 \\): \\( \\{1,50\\}, \\{2,49\\}, \\dots, \\{25,26\\} \\).',
        'How many such two-element pigeonholes are formed?',
        'كم صندوقاً ثنائياً تكوّن لديك؟',
        'With \\( 25 \\) boxes, \\( 25 \\) numbers could take \\( \\{1, 2, \\dots, 25\\} \\) with no sum \\( 51 \\); adding \\( 1 \\) more triggers Pigeonhole!',
        'بوجود \\( 25 \\) صندوقاً، يمكن اختيار \\( \\{1,\\dots,25\\} \\) دون مجموع \\( 51 \\)، أما العنصر التالي فيحسم البرهان!',
        'Partition \\( \\{1, \\dots, 50\\} \\) into \\( 25 \\) pairs \\( \\{k, 51 - k\\} \\) for \\( k = 1, \\dots, 25 \\). Choosing \\( 25 \\) integers (e.g., \\( 1, 2, \\dots, 25 \\)) avoids any pair, whereas by the Pigeonhole Principle, selecting \\( 25 + 1 = 26 \\) integers forces two to fall into the same pair \\( \\{k, 51-k\\} \\) and sum to \\( 51 \\).',
        'بتقسيم المجموعة إلى \\( 25 \\) زوجاً \\( \\{k, 51 - k\\} \\) حيث \\( 1 \\le k \\le 25 \\)، يمكن اختيار \\( 25 \\) عدداً دون تكوين المجموع \\( 51 \\)، ولكن اختيار \\( 25 + 1 = 26 \\) عدداً يجبر بمبدأ برج الحمام عددين على الوقوع في الزوج نفسه فيكون مجموعهما \\( 51 \\).'
      ),
      {
        kind: 'seeAlso',
        links: [
          { label: 'Combinatorics II: Recurrence Relations & Olympiad Probability', chapterId: 'ol-recurrence-probability', trackId: 'olympiad' },
          { label: 'Olympiad Proof Strategies: Invariants, Coloring & Games', chapterId: 'ol-invariants-extremal', trackId: 'olympiad' },
          { label: 'KAUST KMC Regional Qualifier', chapterId: 'ol-kaust-kmc-qualifier', trackId: 'olympiad' }
        ]
      }
    ]
  },
  quizWidget: {
    enabled: true,
    domains: ['Bijective Counting, Inclusion-Exclusion & Pigeonhole']
  }
};

// Clean up Practice 4.1 stem wording cleanly
ch04.content.blocks.forEach((b) => {
  if (b.kind === 'practiceProblem' && b.question.en.includes('Practice 4.1')) {
    b.question = bi(
      '<strong>[Practice 4.1 · NSMO Stage 1 / Easy]</strong> In how many ways can 4 books be chosen from a shelf of 11 distinct books arranged in a row so that NO two chosen books were adjacent on the shelf?',
      '<strong>[تدريب 4.1 · نسما المرحلة 1 / سهل]</strong> بكم طريقة يمكن اختيار 4 كتب من رف يضم 11 كتاباً مختلفاً مرتبة في صف واحد بحيث لا يكون أي كتابين مختارين متجاورين على الرف؟'
    );
  }
});

module.exports = [ch01, ch02, ch03, ch04];
