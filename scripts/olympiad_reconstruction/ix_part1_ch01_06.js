'use strict';

function makeChapterIx(spec) {
  return [
    {
      t: 'qc',
      ti: `Quick Check: ${spec.nameEn}`,
      ti_ar: `فحص سريع: ${spec.nameAr}`,
      q: spec.qc.q,
      q_ar: spec.qc.q_ar,
      o: spec.qc.o,
      o_ar: spec.qc.o_ar || spec.qc.o,
      a: spec.qc.a,
      ex: spec.qc.ex,
      ex_ar: spec.qc.ex_ar
    },
    {
      t: 'tf',
      ti: `True / False: Olympiad Theorems (${spec.shortEn})`,
      ti_ar: `صح / خطأ: النظريات الأولمبية (${spec.shortAr})`,
      items: spec.tf.map(x => ({ s: x.en, a: x.a })),
      items_ar: spec.tf.map(x => ({ s: x.ar, a: x.a }))
    },
    {
      t: 'mt',
      ti: `Matching: Olympiad Tools & Identities (${spec.shortEn})`,
      ti_ar: `مطابقة: الأدوات والمتطابقات الأولمبية (${spec.shortAr})`,
      p: spec.mt.map(x => ({ l: x.l, r: x.rEn })),
      p_ar: spec.mt.map(x => ({ l: x.lAr || x.l, r: x.rAr }))
    },
    {
      t: 'se',
      ti: `Spot the Proof Fallacy: ${spec.shortEn}`,
      ti_ar: `اكتشف المغالطة البرهانية: ${spec.shortAr}`,
      q: spec.se.q,
      q_ar: spec.se.q_ar,
      steps: spec.se.steps.map(x => x.en),
      steps_ar: spec.se.steps.map(x => x.ar),
      errorStep: spec.se.errorStep,
      reasons: spec.se.reasons.map(x => x.en),
      reasons_ar: spec.se.reasons.map(x => x.ar),
      correctReason: 0,
      h: spec.se.h,
      h_ar: spec.se.h_ar,
      sol: spec.se.sol,
      sol_ar: spec.se.sol_ar
    },
    {
      t: 'ms',
      ti: `Olympiad Proof Jury Rubric: ${spec.shortEn}`,
      ti_ar: `سلم تصحيح لجنة التحكيم الأولمبية: ${spec.shortAr}`,
      q: spec.ms.q,
      q_ar: spec.ms.q_ar,
      parts: spec.ms.parts.map(pt => ({
        label: pt.labelEn,
        marks: pt.rubric.reduce((s, r) => s + r.marks, 0),
        rubric: pt.rubric.map(r => ({ code: r.code, marks: r.marks, text: r.en }))
      })),
      parts_ar: spec.ms.parts.map(pt => ({
        label: pt.labelAr,
        marks: pt.rubric.reduce((s, r) => s + r.marks, 0),
        rubric: pt.rubric.map(r => ({ code: r.code, marks: r.marks, text: r.ar }))
      })),
      examinerTip: spec.ms.tip,
      examinerTip_ar: spec.ms.tip_ar
    },
    {
      t: 'sb',
      ti: `Step Builder: Guided Olympiad Derivation (${spec.shortEn})`,
      ti_ar: `بناء الحل خطوة بخطوة (${spec.shortAr})`,
      steps: spec.sb.map(x => ({ l: x.lEn, a: x.a, h: x.hEn })),
      steps_ar: spec.sb.map(x => ({ l: x.lAr, a: x.a, h: x.hAr }))
    },
    {
      t: 'num',
      ti: `Short-Answer Sprint: ${spec.shortEn}`,
      ti_ar: `إدخال رقمي أولمبي: ${spec.shortAr}`,
      q: spec.num.q,
      q_ar: spec.num.q_ar,
      a: spec.num.a,
      h: spec.num.h,
      h_ar: spec.num.h_ar,
      sol: spec.num.sol,
      sol_ar: spec.num.sol_ar
    },
    {
      t: 'ord',
      ti: `Order the Proof Architecture: ${spec.shortEn}`,
      ti_ar: `رتّب هيكل البرهان الأولمبي: ${spec.shortAr}`,
      prompt: spec.ord.prompt,
      prompt_ar: spec.ord.prompt_ar,
      items: spec.ord.items.map(x => x.en),
      items_ar: spec.ord.items.map(x => x.ar),
      ex: spec.ord.ex,
      ex_ar: spec.ord.ex_ar
    },
    {
      t: 'cat',
      ti: `Classify the Olympiad Technique: ${spec.shortEn}`,
      ti_ar: `تصنيف التقنية الأولمبية: ${spec.shortAr}`,
      categories: spec.cat.catsEn,
      categories_ar: spec.cat.catsAr,
      items: spec.cat.items.map(x => ({ s: x.en, s_ar: x.ar || x.en, cat: x.cat })),
      ex: spec.cat.ex,
      ex_ar: spec.cat.ex_ar
    },
    {
      t: 'sr',
      ti: `Step Reveal Proof Walkthrough: ${spec.shortEn}`,
      ti_ar: `استعراض البرهان المتدرج: ${spec.shortAr}`,
      steps: spec.sr.map(x => x.en),
      steps_ar: spec.sr.map(x => x.ar)
    }
  ];
}

const part1 = {
  'ol-algebraic-techniques': makeChapterIx({
    nameEn: 'Olympiad Algebra, Vieta & Inequalities',
    nameAr: 'الجبر الأولمبي وعلاقات فييتا والمتباينات',
    shortEn: 'Vieta, Newton Sums & Inequalities',
    shortAr: 'فييتا ومجاميع نيوتن والمتباينات',
    qc: {
      q: 'Let \\( r, s, t \\) be the roots of \\( x^3 - 5x^2 + 6x - 3 = 0 \\). What is the exact value of \\( r^2 + s^2 + t^2 \\)?',
      q_ar: 'لتكن \\( r, s, t \\) جذور المعادلة التكعيبية \\( x^3 - 5x^2 + 6x - 3 = 0 \\). ما القيمة الدقيقة للمجموع \\( r^2 + s^2 + t^2 \\)؟',
      o: ['\\( 13 \\)', '\\( 19 \\)', '\\( 25 \\)', '\\( 37 \\)'],
      a: 0,
      ex: 'By Vieta, \\( e_1 = 5 \\) and \\( e_2 = 6 \\), so \\( p_2 = e_1^2 - 2e_2 = 25 - 12 = 13 \\).',
      ex_ar: 'من علاقات فييتا \\( e_1 = 5 \\) و\\( e_2 = 6 \\)، ومن ثم \\( r^2 + s^2 + t^2 = e_1^2 - 2e_2 = 25 - 12 = 13 \\).'
    },
    tf: [
      { en: 'Sophie Germain\'s identity states \\( a^4 + 4b^4 = (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2) \\) for all real \\( a, b \\).', ar: 'تنص متطابقة صوفي جيرمان على أن \\( a^4 + 4b^4 = (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2) \\) لكل \\( a, b \\in \\mathbb{R} \\).', a: true },
      { en: 'By Titu\'s Lemma, for \\( x, y > 0 \\), \\( \\frac{a^2}{x} + \\frac{b^2}{y} \\ge \\frac{(a + b)^2}{x + y} \\).', ar: 'حسب متباينة تيتو، لكل \\( x, y > 0 \\) يتحقق \\( \\frac{a^2}{x} + \\frac{b^2}{y} \\ge \\frac{(a + b)^2}{x + y} \\).', a: true },
      { en: 'Whenever \\( a + b + c = 0 \\), the cubic sum \\( a^3 + b^3 + c^3 \\) always equals \\( 0 \\).', ar: 'كلما كان \\( a + b + c = 0 \\) فإن \\( a^3 + b^3 + c^3 = 0 \\) دائماً.', a: false }
    ],
    mt: [
      { l: '\\( a^3 + b^3 + c^3 - 3abc \\)', rEn: '\\( (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) \\)', rAr: '\\( (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) \\)' },
      { l: '\\( a^4 + 4b^4 \\)', rEn: 'Sophie Germain quartic factorization', rAr: 'تحليل صوفي جيرمان من الدرجة الرابعة' },
      { l: '\\( \\sum \\frac{a_i^2}{b_i} \\ge \\frac{(\\sum a_i)^2}{\\sum b_i} \\)', rEn: 'Titu\'s Lemma (Engel Cauchy-Schwarz)', rAr: 'توطئة تيتو (صورة إنجل لكوشي-شوارتز)' },
      { l: '\\( \\frac{1}{k(k+2)} = \\frac{1}{2}\\left(\\frac{1}{k} - \\frac{1}{k+2}\\right) \\)', rEn: 'Two-step telescoping partial fraction', rAr: 'تفكيك كسري متداخل بخطوتين' }
    ],
    se: {
      q: 'A contestant attempts to minimize \\( f(x) = \\sqrt{x^2 + 9} + \\frac{1}{\\sqrt{x^2 + 9}} \\) for real \\( x \\in \\mathbb{R} \\). Which step is flawed?',
      q_ar: 'يحاول متسابق إيجاد القيمة الصغرى للدالة \\( f(x) = \\sqrt{x^2 + 9} + \\frac{1}{\\sqrt{x^2 + 9}} \\) على \\( \\mathbb{R} \\). أي خطوة تحوي مغالطة؟',
      steps: [
        { en: 'Let \\( t = \\sqrt{x^2 + 9} > 0 \\), so \\( f(x) = t + \\frac{1}{t} \\).', ar: 'نضع \\( t = \\sqrt{x^2 + 9} > 0 \\)، فتصبح الدالة \\( t + \\frac{1}{t} \\).' },
        { en: 'Apply AM-GM to the two positive terms: \\( t + \\frac{1}{t} \\ge 2\\sqrt{t \\cdot \\frac{1}{t}} = 2 \\).', ar: 'نطبّق متباينة AM-GM على الحدين الموجبين: \\( t + \\frac{1}{t} \\ge 2 \\).' },
        { en: 'Conclude immediately that the minimum value of \\( f(x) \\) over \\( \\mathbb{R} \\) is \\( 2 \\).', ar: 'نستنتج فوراً أن القيمة الصغرى للدالة \\( f(x) \\) على \\( \\mathbb{R} \\) تساوي \\( 2 \\).' }
      ],
      errorStep: 3,
      reasons: [
        { en: 'Equality in AM-GM requires \\( t = 1 \\), whereas \\( t = \\sqrt{x^2 + 9} \\ge 3 \\) for all real \\( x \\); since \\( t + 1/t \\) increases on \\( [3, \\infty) \\), the true minimum is \\( 3 + 1/3 = 10/3 \\) at \\( x = 0 \\).', ar: 'المساواة في AM-GM تتطلب \\( t = 1 \\)، بينما \\( t = \\sqrt{x^2 + 9} \\ge 3 \\) دائماً؛ وبما أن \\( t + 1/t \\) متزايدة على \\( [3, \\infty) \\) فإن القيمة الصغرى الحقيقية هي \\( 10/3 \\) عند \\( x = 0 \\).' },
        { en: 'AM-GM cannot be applied to square roots.', ar: 'لا يمكن تطبيق AM-GM على الجذور التربيعية.' },
        { en: 'The expression \\( t \\cdot (1/t) \\) does not equal \\( 1 \\).', ar: 'حاصل الضرب \\( t \\cdot (1/t) \\) لا يساوي \\( 1 \\).' }
      ],
      h: 'Check whether \\( \\sqrt{x^2 + 9} = 1 \\) has any real solution \\( x \\)!',
      h_ar: 'تحقق هل للمعادلة \\( \\sqrt{x^2 + 9} = 1 \\) أي حل حقيقي \\( x \\)!',
      sol: 'Because \\( t = \\sqrt{x^2 + 9} \\ge 3 \\), \\( t = 1 \\) is unattainable; monotonicity on \\( [3, \\infty) \\) gives minimum \\( 10/3 \\) at \\( x = 0 \\).',
      sol_ar: 'بما أن \\( t \\ge 3 \\) يستحيل تحقق \\( t = 1 \\)، واطراد الدالة \\( t + 1/t \\) على \\( [3, \\infty) \\) يعطي القيمة الصغرى \\( 10/3 \\) عند \\( x = 0 \\).'
    },
    ms: {
      q: 'For \\( a, b, c > 0 \\) with \\( a + b + c = 9 \\), prove that \\( \\frac{1}{a} + \\frac{4}{b} + \\frac{9}{c} \\ge 4 \\) and find the unique equality triple.',
      q_ar: 'للأعداد الموجبة \\( a, b, c > 0 \\) التي تحقق \\( a + b + c = 9 \\)، أثبت أن \\( \\frac{1}{a} + \\frac{4}{b} + \\frac{9}{c} \\ge 4 \\) وأوجد الثلاثية الوحيدة للمساواة.',
      parts: [
        {
          labelEn: 'Part (a) — Titu\'s Lemma Lower Bound',
          labelAr: 'الجزء (أ) — تطبيق متباينة تيتو',
          rubric: [
            { code: 'M1', marks: 1, en: 'Rewrite numerators as squares \\( \\frac{1^2}{a} + \\frac{2^2}{b} + \\frac{3^2}{c} \\) and invoke Titu\'s Lemma.', ar: 'كتابة البسوط كمربعات \\( \\frac{1^2}{a} + \\frac{2^2}{b} + \\frac{3^2}{c} \\) وتطبيق متباينة تيتو.' },
            { code: 'A1', marks: 1, en: 'Evaluate \\( \\frac{(1 + 2 + 3)^2}{a + b + c} = \\frac{36}{9} = 4 \\).', ar: 'حساب الحد الأدنى \\( \\frac{(1 + 2 + 3)^2}{9} = \\frac{36}{9} = 4 \\).' }
          ]
        },
        {
          labelEn: 'Part (b) — Equality Condition',
          labelAr: 'الجزء (ب) — شرط تحقق المساواة',
          rubric: [
            { code: 'M1', marks: 1, en: 'Set \\( \\frac{1}{a} = \\frac{2}{b} = \\frac{3}{c} = \\lambda \\) and sum \\( a + b + c = \\frac{6}{\\lambda} = 9 \\).', ar: 'وضع شرط التناسب \\( \\frac{1}{a} = \\frac{2}{b} = \\frac{3}{c} = \\lambda \\) والجمع.' },
            { code: 'A1', marks: 1, en: 'Deduce \\( (a, b, c) = \\left(\\frac{3}{2}, 3, \\frac{9}{2}\\right) \\).', ar: 'استنتاج الثلاثية \\( (a, b, c) = \\left(\\frac{3}{2}, 3, \\frac{9}{2}\\right) \\).' }
          ]
        }
      ],
      tip: 'In Olympiad inequality proofs, full marks ALWAYS require explicitly verifying that a valid positive tuple achieves equality.',
      tip_ar: 'في براهين المتباينات الأولمبية، يشترط للحصول على الدرجة الكاملة التحقق الصريح من وجود قيم موجبة تحقق المساواة.'
    },
    sb: [
      { lEn: 'For \\( x^2 - 5x + 3 = 0 \\) with roots \\( r, s \\), find \\( r + s = \\)', lAr: 'للمعادلة \\( x^2 - 5x + 3 = 0 \\) ذات الجذرين \\( r, s \\)، قيمة \\( r + s = \\)', a: '5', hEn: 'Read −b/a from Vieta.', hAr: 'اقرأ −b/a من علاقات فييتا.' },
      { lEn: 'Compute \\( p_2 = r^2 + s^2 = (r+s)^2 - 2rs = \\)', lAr: 'احسب \\( p_2 = r^2 + s^2 = (r+s)^2 - 2rs = \\)', a: '19', hEn: 'Compute 25 − 6.', hAr: 'احسب 25 − 6.' },
      { lEn: 'Compute \\( p_3 = r^3 + s^3 = (r+s)p_2 - rs(r+s) = \\)', lAr: 'احسب \\( p_3 = r^3 + s^3 = (r+s)p_2 - rs(r+s) = \\)', a: '80', hEn: 'Compute 5(19) − 3(5).', hAr: 'احسب 5(19) − 15.' }
    ],
    num: {
      q: 'Evaluate \\( 99 \\times \\sum_{k=1}^{98} \\frac{1}{k(k+1)} \\).',
      q_ar: 'احسب القيمة الدقيقة للمقدار \\( 99 \\times \\sum_{k=1}^{98} \\frac{1}{k(k+1)} \\).',
      a: 98,
      h: 'Telescope \\( \\frac{1}{k(k+1)} = \\frac{1}{k} - \\frac{1}{k+1} \\) to get \\( 1 - \\frac{1}{99} \\).',
      h_ar: 'فكّك \\( \\frac{1}{k(k+1)} = \\frac{1}{k} - \\frac{1}{k+1} \\) لتحصل على \\( 1 - \\frac{1}{99} \\).',
      sol: 'The telescoping sum equals \\( 1 - \\frac{1}{99} = \\frac{98}{99} \\); multiplying by \\( 99 \\) gives \\( 98 \\).',
      sol_ar: 'يساوي المجموع المتداخل \\( 1 - \\frac{1}{99} = \\frac{98}{99} \\)، وبضربه في \\( 99 \\) نحصل على \\( 98 \\).'
    },
    ord: {
      prompt: 'Order the steps to prove \\( (a + b)(b + c)(c + a) \\ge 8abc \\) for \\( a, b, c > 0 \\):',
      prompt_ar: 'رتّب خطوات برهان المتباينة \\( (a + b)(b + c)(c + a) \\ge 8abc \\) للأعداد الموجبة \\( a, b, c > 0 \\):',
      items: [
        { en: 'Verify positivity \\( a, b, c > 0 \\) so two-variable AM-GM applies to each cyclic pair.', ar: 'التحقق من كون \\( a, b, c > 0 \\) لتطبيق AM-GM على كل زوج دوري.' },
        { en: 'Write \\( a + b \\ge 2\\sqrt{ab} \\), \\( b + c \\ge 2\\sqrt{bc} \\), and \\( c + a \\ge 2\\sqrt{ca} \\).', ar: 'كتابة المتباينات الثلاث \\( a + b \\ge 2\\sqrt{ab} \\) و\\( b + c \\ge 2\\sqrt{bc} \\) و\\( c + a \\ge 2\\sqrt{ca} \\).' },
        { en: 'Multiply the three positive inequalities to get \\( (a+b)(b+c)(c+a) \\ge 8\\sqrt{a^2 b^2 c^2} = 8abc \\).', ar: 'ضرب المتباينات الموجبة الثلاث للحصول على \\( 8\\sqrt{a^2b^2c^2} = 8abc \\).' },
        { en: 'Verify simultaneous equality holds if and only if \\( a = b = c \\).', ar: 'التحقق من أن المساواة المتزامنة تتحقق إذا وفقط إذا كان \\( a = b = c \\).' }
      ],
      ex: 'Apply 2-term AM-GM to each factor, multiply positive bounds, and check simultaneous equality.',
      ex_ar: 'طبّق AM-GM على كل قوس، ثم اضرب الحدود الموجبة وتحقق من تزامن شروط المساواة.'
    },
    cat: {
      catsEn: ['Sophie Germain Factorization', 'Gauss Cyclic Cubic Identity', 'Titu / Cauchy-Schwarz Inequality'],
      catsAr: ['تحليل صوفي جيرمان', 'متطابقة غاوس التكعيبية الدورية', 'متباينة تيتو / كوشي-شوارتز'],
      items: [
        { en: '\\( n^4 + 64 = n^4 + 4 \\cdot 2^4 \\)', cat: 0 },
        { en: '\\( x^3 + y^3 + z^3 = 3xyz \\) when \\( x + y + z = 0 \\)', ar: '\\( x^3 + y^3 + z^3 = 3xyz \\) عندما \\( x + y + z = 0 \\)', cat: 1 },
        { en: '\\( \\frac{a^2}{b+c} + \\frac{b^2}{c+a} + \\frac{c^2}{a+b} \\ge \\frac{a+b+c}{2} \\)', cat: 2 },
        { en: '\\( k^4 + 4 = ((k-1)^2 + 1)((k+1)^2 + 1) \\)', cat: 0 }
      ],
      ex: 'Match quartics of the form a⁴+4b⁴ to Sophie Germain, symmetric cubics to Gauss, and squared-numerator sums to Titu.',
      ex_ar: 'اربط المقادير الرباعية من الشكل a⁴+4b⁴ بصوفي جيرمان، والمكعبات المتماثلة بمتطابقة غاوس، ومجاميع المربعات الكسرية بتيتو.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Prove \\( n^4 + 4^n \\) is composite for every integer \\( n > 1 \\).', ar: '<strong>الهدف:</strong> إثبات أن \\( n^4 + 4^n \\) عدد مركب لكل عدد صحيح \\( n > 1 \\).' },
      { en: '<strong>Case 1 (Even \\( n \\)):</strong> For \\( n \\ge 2 \\) even, both \\( n^4 \\) and \\( 4^n \\) are even with \\( n^4 + 4^n > 2 \\), hence divisible by \\( 2 \\) and composite.', ar: '<strong>الحالة 1 (\\( n \\) زوجي):</strong> كلا الحدين زوجي ومجموعهما أكبر من \\( 2 \\)، فهو يقبل القسمة على \\( 2 \\).' },
      { en: '<strong>Case 2 (Odd \\( n = 2k + 1 \\ge 3 \\)):</strong> Rewrite \\( 4^{2k+1} = 4 \\cdot (2^k)^4 \\) and apply Sophie Germain with \\( a = n,\\; b = 2^k \\): \\( (n^2 - 2^{k+1}n + 2^{2k+1})(n^2 + 2^{k+1}n + 2^{2k+1}) \\), where the smaller factor \\( (n - 2^k)^2 + 2^{2k} \\ge 4 + 1 = 5 > 1 \\)!', ar: '<strong>الحالة 2 (\\( n = 2k + 1 \\ge 3 \\) فردي):</strong> نكتب \\( 4^{2k+1} = 4(2^k)^4 \\) ونطبّق صوفي جيرمان، ويكون العامل الأصغر \\( (n - 2^k)^2 + 2^{2k} \\ge 5 > 1 \\)!' }
    ]
  }),

  'ol-modular-number-theory': makeChapterIx({
    nameEn: 'Modular Arithmetic, Primes & Divisibility',
    nameAr: 'الحساب المعياري والأعداد الأولية وقابلية القسمة',
    shortEn: 'Fermat, Euler, CRT & LTE',
    shortAr: 'فيرما وأويلر والباقي الصيني وLTE',
    qc: {
      q: 'What is the highest power \\( v_5(100!) \\) of \\( 5 \\) dividing \\( 100! \\) (i.e., the number of trailing zeros of \\( 100! \\))?',
      q_ar: 'ما أعلى أس \\( v_5(100!) \\) للعدد \\( 5 \\) يقسم \\( 100! \\) (أي عدد الأصفار الطرفية لـ \\( 100! \\))؟',
      o: ['\\( 24 \\)', '\\( 20 \\)', '\\( 25 \\)', '\\( 21 \\)'],
      a: 0,
      ex: 'By Legendre\'s formula, \\( v_5(100!) = \\lfloor 100/5 \\rfloor + \\lfloor 100/25 \\rfloor = 20 + 4 = 24 \\).',
      ex_ar: 'بصيغة ليجاندر: \\( v_5(100!) = \\lfloor 100/5 \\rfloor + \\lfloor 100/25 \\rfloor = 20 + 4 = 24 \\).'
    },
    tf: [
      { en: 'Wilson\'s Theorem states that an integer \\( p \\ge 2 \\) is prime if and only if \\( (p - 1)! \\equiv -1 \\pmod p \\).', ar: 'تنص مبرهنة ويلسون على أن العدد \\( p \\ge 2 \\) أولي إذا وفقط إذا كان \\( (p - 1)! \\equiv -1 \\pmod p \\).', a: true },
      { en: 'For any odd prime \\( p \\) with \\( p \\mid (x - y) \\) and \\( p \\nmid xy \\), LTE gives \\( v_p(x^n - y^n) = v_p(x - y) + v_p(n) \\).', ar: 'لأي عدد أولي فردي \\( p \\) يحقق \\( p \\mid (x - y) \\) و\\( p \\nmid xy \\)، تعطي توطئة LTE أن \\( v_p(x^n - y^n) = v_p(x - y) + v_p(n) \\).', a: true },
      { en: 'If \\( 6x \\equiv 6y \\pmod{15} \\), then it always follows that \\( x \\equiv y \\pmod{15} \\).', ar: 'إذا كان \\( 6x \\equiv 6y \\pmod{15} \\) فإنه يلزم دائماً أن \\( x \\equiv y \\pmod{15} \\).', a: false }
    ],
    mt: [
      { l: '\\( a^{\\varphi(m)} \\equiv 1 \\pmod m \\)', rEn: 'Euler\'s Totient Theorem (\\( \\gcd(a,m)=1 \\))', rAr: 'مبرهنة أويلر (بشرط \\( \\gcd(a,m)=1 \\))' },
      { l: '\\( (p - 1)! \\equiv -1 \\pmod p \\)', rEn: 'Wilson\'s Primality Criterion', rAr: 'معيار ويلسون للأعداد الأولية' },
      { l: '\\( v_p(n!) = \\frac{n - s_p(n)}{p - 1} \\)', rEn: 'Legendre\'s base-p digit-sum identity', rAr: 'صيغة ليجاندر بدلالة مجموع خانات الأساس p' },
      { l: '\\( \\text{ord}_m(a) \\mid k \\iff a^k \\equiv 1 \\pmod m \\)', rEn: 'Multiplicative Order Divisibility Law', rAr: 'قانون قابلية القسمة للرتبة الضربية' }
    ],
    se: {
      q: 'A student solves \\( 6x \\equiv 12 \\pmod{18} \\) over residues modulo \\( 18 \\). Identify the invalid step.',
      q_ar: 'يحل طالب التطابق \\( 6x \\equiv 12 \\pmod{18} \\) في مجموعة البواقي بترديد \\( 18 \\). حدّد الخطوة الخاطئة.',
      steps: [
        { en: 'Observe that \\( 6 \\) divides both \\( 6x \\) and \\( 12 \\).', ar: 'ملاحظة أن \\( 6 \\) يقسم الطرفين \\( 6x \\) و\\( 12 \\).' },
        { en: 'Divide both sides by \\( 6 \\) while keeping the modulus \\( 18 \\) unchanged: \\( x \\equiv 2 \\pmod{18} \\).', ar: 'قسمة الطرفين على \\( 6 \\) مع إبقاء المقاس \\( 18 \\) دون تغيير: \\( x \\equiv 2 \\pmod{18} \\).' },
        { en: 'Conclude there is only \\( 1 \\) solution modulo \\( 18 \\), namely \\( x = 2 \\).', ar: 'استنتاج وجود حل واحد فقط بترديد \\( 18 \\) هو \\( x = 2 \\).' }
      ],
      errorStep: 2,
      reasons: [
        { en: 'Since \\( \\gcd(6, 18) = 6 \\), dividing by \\( 6 \\) MUST also divide the modulus by \\( 6 \\), giving \\( x \\equiv 2 \\pmod 3 \\), which lifts to \\( 6 \\) distinct solutions modulo \\( 18 \\): \\( \\{2, 5, 8, 11, 14, 17\\} \\).', ar: 'بما أن \\( \\gcd(6, 18) = 6 \\)، يجب قسمة المقاس أيضاً على \\( 6 \\) فنحصل على \\( x \\equiv 2 \\pmod 3 \\)، أي \\( 6 \\) حلول مختلفة بترديد \\( 18 \\).' },
        { en: 'You can never divide a congruence by an even number.', ar: 'لا تجوز قسمة التطابقات على عدد زوجي مطلقاً.' },
        { en: '12 divided by 6 is not 2.', ar: 'قسمة 12 على 6 لا تساوي 2.' }
      ],
      h: 'Test \\( x = 5 \\) in \\( 6x \\equiv 12 \\pmod{18} \\): \\( 30 - 12 = 18 \\)!',
      h_ar: 'جرب التعويض بـ \\( x = 5 \\): \\( 30 - 12 = 18 \\) يقبل القسمة على \\( 18 \\)!',
      sol: 'Cancellation law: \\( ca \\equiv cb \\pmod m \\iff a \\equiv b \\pmod{m / \\gcd(c, m)} \\). Here \\( 18/6 = 3 \\), giving \\( 6 \\) solutions mod \\( 18 \\).',
      sol_ar: 'قانون الاختزال المعياري يقسم المقاس على \\( \\gcd(6, 18) = 6 \\)، فيعطي \\( x \\equiv 2 \\pmod 3 \\) أي \\( 6 \\) حلول بترديد \\( 18 \\).'
    },
    ms: {
      q: 'Prove that \\( p = 13 \\) divides \\( 10! + 7 \\) using Wilson\'s Theorem.',
      q_ar: 'أثبت باستخدام مبرهنة ويلسون أن العدد الأولي \\( p = 13 \\) يقسم \\( 10! + 7 \\).',
      parts: [
        {
          labelEn: 'Part (a) — Wilson\'s Theorem Reduction',
          labelAr: 'الجزء (أ) — تطبيق مبرهنة ويلسون',
          rubric: [
            { code: 'M1', marks: 1, en: 'State \\( 12! \\equiv -1 \\pmod{13} \\) since \\( 13 \\) is prime.', ar: 'كتابة \\( 12! \\equiv -1 \\pmod{13} \\) لأن \\( 13 \\) عدد أولي.' },
            { code: 'A1', marks: 1, en: 'Rewrite \\( 12! = 12 \\cdot 11 \\cdot 10! \\equiv (-1)(-2) \\cdot 10! = 2 \\cdot 10! \\pmod{13} \\).', ar: 'فك \\( 12! \\equiv (-1)(-2) \\cdot 10! = 2 \\cdot 10! \\pmod{13} \\).' }
          ]
        },
        {
          labelEn: 'Part (b) — Modular Inversion',
          labelAr: 'الجزء (ب) — النظير الضربي بترديد 13',
          rubric: [
            { code: 'M1', marks: 1, en: 'Multiply \\( 2 \\cdot 10! \\equiv -1 \\pmod{13} \\) by \\( 7 \\) (since \\( 2 \\cdot 7 = 14 \\equiv 1 \\pmod{13} \\)).', ar: 'ضرب التطابق \\( 2 \\cdot 10! \\equiv -1 \\pmod{13} \\) في النظير \\( 7 \\).' },
            { code: 'A1', marks: 1, en: 'Obtain \\( 10! \\equiv -7 \\pmod{13} \\), hence \\( 10! + 7 \\equiv 0 \\pmod{13} \\) and \\( 13 \\mid (10! + 7) \\).', ar: 'الحصول على \\( 10! \\equiv -7 \\pmod{13} \\) ومنه \\( 13 \\mid (10! + 7) \\).' }
          ]
        }
      ],
      tip: 'Always verify \\( 2 \\times (-7) = -14 \\equiv -1 \\pmod{13} \\) right after inverting!',
      tip_ar: 'تحقق دائماً من الإشارة بتعويض الباقي مباشرة في التطابق الأصلي!'
    },
    sb: [
      { lEn: 'Compute Euler\'s totient \\( \\varphi(40) \\) for \\( 40 = 2^3 \\cdot 5 \\): \\( \\varphi(40) = \\)', lAr: 'احسب دالة أويلر \\( \\varphi(40) \\) حيث \\( 40 = 2^3 \\cdot 5 \\):', a: '16', hEn: '40 × (1 − 1/2) × (1 − 1/5).', hAr: 'احسب 40 × (1/2) × (4/5).' },
      { lEn: 'Reduce the exponent \\( 100 \\) modulo \\( \\varphi(40) = 16 \\): \\( 100 \\bmod 16 = \\)', lAr: 'اختزل الأس \\( 100 \\) بترديد \\( 16 \\): \\( 100 \\bmod 16 = \\)', a: '4', hEn: '16 × 6 = 96.', hAr: 'لاحظ أن 16 × 6 = 96.' },
      { lEn: 'Since \\( \\gcd(3, 40) = 1 \\), find \\( 3^{100} \\bmod 40 = 3^4 \\bmod 40 = \\)', lAr: 'بما أن \\( \\gcd(3, 40) = 1 \\)، فإن \\( 3^{100} \\bmod 40 = 3^4 \\bmod 40 = \\)', a: '1', hEn: '81 mod 40.', hAr: 'احسب باقي 81 على 40.' }
    ],
    num: {
      q: 'Find the smallest positive integer \\( n \\) leaving remainder \\( 1 \\) modulo \\( 3 \\), remainder \\( 2 \\) modulo \\( 4 \\), and remainder \\( 3 \\) modulo \\( 5 \\).',
      q_ar: 'أوجد أصغر عدد صحيح موجب \\( n \\) يترك باقياً \\( 1 \\) عند قسمته على \\( 3 \\)، و\\( 2 \\) على \\( 4 \\)، و\\( 3 \\) على \\( 5 \\).',
      a: 58,
      h: 'Notice every remainder is 2 less than its modulus: \\( n + 2 \\) is divisible by \\( 3, 4, 5 \\)!',
      h_ar: 'لاحظ أن كل باقٍ يقل بمقدار 2 عن مقاسه، أي أن \\( n + 2 \\) يقبل القسمة على 3 و4 و5!',
      sol: 'Since \\( n \\equiv -2 \\pmod{3, 4, 5} \\) and \\( \\operatorname{lcm}(3, 4, 5) = 60 \\), the smallest positive solution is \\( 60 - 2 = 58 \\).',
      sol_ar: 'بما أن \\( n \\equiv -2 \\pmod{3, 4, 5} \\) والمضاعف المشترك الأصغر هو \\( 60 \\)، فإن أصغر حل موجب هو \\( 60 - 2 = 58 \\).'
    },
    ord: {
      prompt: 'Order the steps to prove no prime \\( p \\equiv 3 \\pmod 4 \\) divides \\( n^2 + 1 \\):',
      prompt_ar: 'رتّب خطوات إثبات أنه لا يوجد عدد أولي \\( p \\equiv 3 \\pmod 4 \\) يقسم \\( n^2 + 1 \\):',
      items: [
        { en: 'Suppose for contradiction that \\( p \\equiv 3 \\pmod 4 \\) satisfies \\( n^2 \\equiv -1 \\pmod p \\) (so \\( p \\nmid n \\)).', ar: 'افترض جدلاً أن \\( p \\equiv 3 \\pmod 4 \\) يحقق \\( n^2 \\equiv -1 \\pmod p \\) (ومنه \\( p \\nmid n \\)).' },
        { en: 'Raise both sides to the odd power \\( \\frac{p - 1}{2} \\): \\( n^{p-1} \\equiv (-1)^{(p-1)/2} \\pmod p \\).', ar: 'ارفع الطرفين إلى القوة الفردية \\( \\frac{p - 1}{2} \\): \\( n^{p-1} \\equiv (-1)^{(p-1)/2} \\pmod p \\).' },
        { en: 'Since \\( p = 4k + 3 \\), \\( \\frac{p - 1}{2} = 2k + 1 \\) is odd, so the RHS equals \\( -1 \\pmod p \\).', ar: 'بما أن \\( \\frac{p - 1}{2} = 2k + 1 \\) فردي، فإن الطرف الأيمن يطابق \\( -1 \\pmod p \\).' },
        { en: 'Invoke Fermat\'s Little Theorem \\( n^{p-1} \\equiv +1 \\pmod p \\) to obtain \\( 1 \\equiv -1 \\pmod p \\), contradicting \\( p \\ge 3 \\).', ar: 'استدعِ مبرهنة فيرما الصغرى \\( n^{p-1} \\equiv +1 \\pmod p \\) للوصول للتناقض \\( 1 \\equiv -1 \\pmod p \\).' }
      ],
      ex: 'Assume n² ≡ −1 (mod p), raise to (p−1)/2, use oddness of (p−1)/2, and contradict Fermat\'s Little Theorem.',
      ex_ar: 'افترض n² ≡ −1 (mod p)، وارفع للأس الفردي (p−1)/2 للوصول إلى تناقض مع مبرهنة فيرما الصغرى.'
    },
    cat: {
      catsEn: ['Legendre / Factorial Valuation', 'Chinese Remainder Theorem (CRT)', 'Fermat / Euler Power Reduction'],
      catsAr: ['صيغة ليجاندر وتقييم المضروب', 'مبرهنة الباقي الصيني (CRT)', 'اختزال القوى بفيرما وأويلر'],
      items: [
        { en: 'Finding the highest power of \\( 7 \\) dividing \\( 2026! \\)', ar: 'إيجاد أعلى أس للعدد \\( 7 \\) يقسم \\( 2026! \\)', cat: 0 },
        { en: 'Solving \\( x \\equiv 2 \\pmod 5 \\) and \\( x \\equiv 6 \\pmod{11} \\)', ar: 'حل النظام \\( x \\equiv 2 \\pmod 5 \\) و\\( x \\equiv 6 \\pmod{11} \\)', cat: 1 },
        { en: 'Computing \\( 13^{2026} \\pmod{37} \\)', ar: 'حساب باقي \\( 13^{2026} \\pmod{37} \\)', cat: 2 },
        { en: 'Proving \\( \\binom{2p}{p} \\) is divisible by \\( 2 \\) via \\( p \\)-adic exponents', ar: 'حساب الأسس الأولية للمعامل التوافقي \\( \\binom{2p}{p} \\)', cat: 0 }
      ],
      ex: 'Factorial prime powers use Legendre; simultaneous coprime moduli use CRT; large exponents use Fermat/Euler.',
      ex_ar: 'أسس المضروب تستخدم ليجاندر، وأنظمة التطابقات تستخدم الباقي الصيني، والأسس الضخمة تختزل بفيرما وأويلر.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Prove \\( n^5 - n \\) is divisible by \\( 30 \\) for every integer \\( n \\).', ar: '<strong>الهدف:</strong> إثبات أن \\( n^5 - n \\) يقبل القسمة على \\( 30 \\) لكل عدد صحيح \\( n \\).' },
      { en: '<strong>Step 1 (Mod \\( 5 \\)):</strong> By Fermat\'s Little Theorem, \\( n^5 \\equiv n \\pmod 5 \\) for every integer \\( n \\).', ar: '<strong>الخطوة 1 (بترديد \\( 5 \\)):</strong> حسب مبرهنة فيرما الصغرى يتحقق \\( n^5 \\equiv n \\pmod 5 \\) لكل \\( n \\).' },
      { en: '<strong>Step 2 (Mod \\( 2 \\) &amp; Mod \\( 3 \\) + CRT):</strong> Factor \\( n^5 - n = n(n - 1)(n + 1)(n^2 + 1) \\); the three consecutive integers \\( (n-1)n(n+1) \\) are divisible by \\( 6 \\), and \\( \\operatorname{lcm}(5, 6) = 30 \\)!', ar: '<strong>الخطوة 2 (بترديد \\( 6 \\) والدمج):</strong> نحلل \\( n(n-1)(n+1)(n^2+1) \\)؛ جداء ثلاثة أعداد متتالية يقبل القسمة على \\( 6 \\)، ومن \\( \\gcd(5,6)=1 \\) يقبل القسمة على \\( 30 \\)!' }
    ]
  }),

  'ol-diophantine-equations': makeChapterIx({
    nameEn: 'Diophantine Equations, SFFT & Floor Functions',
    nameAr: 'المعادلات الديوفانتية وتحليل SFFT ودالة الصحيح',
    shortEn: 'SFFT, Bounding, Vieta Jumping & Floors',
    shortAr: 'تحليل SFFT والحصر والقفز الفييتي ودالة الصحيح',
    qc: {
      q: 'How many ordered pairs of integers \\( (x, y) \\in \\mathbb{Z}^2 \\) satisfy \\( xy - 3x + 2y = 14 \\)?',
      q_ar: 'كم زوجاً مرتباً من الأعداد الصحيحة \\( (x, y) \\in \\mathbb{Z}^2 \\) يحقق المعادلة \\( xy - 3x + 2y = 14 \\)؟',
      o: ['\\( 8 \\)', '\\( 4 \\)', '\\( 6 \\)', '\\( 12 \\)'],
      a: 0,
      ex: 'SFFT gives \\( (x + 2)(y - 3) = 14 - 6 = 8 \\). Since \\( \\tau(8) = 4 \\) and negative divisors also work in \\( \\mathbb{Z} \\), there are \\( 2 \\times 4 = 8 \\) integer pairs.',
      ex_ar: 'بتحليل SFFT نجد \\( (x + 2)(y - 3) = 8 \\). للعدد \\( 8 \\) أربعة قواسم موجبة وأربعة سالبة، أي \\( 8 \\) أزواج في \\( \\mathbb{Z}^2 \\).'
    },
    tf: [
      { en: 'For coprime positive integers \\( a, b \\), the largest integer NOT of the form \\( ax + by \\) (\\( x, y \\ge 0 \\)) is \\( ab - a - b \\).', ar: 'للعددين الأوليين نسبياً \\( a, b \\)، أكبر عدد لا يُكتب على الصورة \\( ax + by \\) (\\( x, y \\ge 0 \\)) هو \\( ab - a - b \\).', a: true },
      { en: 'Every integer square \\( n^2 \\) satisfies \\( n^2 \\equiv 0, 1, \\) or \\( 4 \\pmod 8 \\).', ar: 'كل مربع كامل \\( n^2 \\) يطابق \\( 0 \\) أو \\( 1 \\) أو \\( 4 \\) بترديد \\( 8 \\) فقط.', a: true },
      { en: 'The equation \\( x^2 + y^2 = 2027 \\) has infinitely many integer solutions because \\( 2027 \\) is odd.', ar: 'للمعادلة \\( x^2 + y^2 = 2027 \\) عدد لا نهائي من الحلول الصحيحة لأن \\( 2027 \\) عدد فردي.', a: false }
    ],
    mt: [
      { l: '\\( xy + rx + sy = N \\iff (x+s)(y+r) = N+rs \\)', rEn: 'Simon\'s Favorite Factoring Trick (SFFT)', rAr: 'خدعة التحليل المفضلة لسايمون (SFFT)' },
      { l: '\\( \\sum_{k=0}^{n-1} \\lfloor x + k/n \\rfloor = \\lfloor nx \\rfloor \\)', rEn: 'Hermite\'s Floor Identity', rAr: 'متطابقة هيرميت لدالة الجزء الصحيح' },
      { l: '\\( ab - a - b \\) for \\( \\gcd(a,b)=1 \\)', rEn: 'Frobenius Coin / Chicken McNugget Number', rAr: 'عدد فروبينيوس للعملات الأولية نسبياً' },
      { l: '\\( (n^2)^2 < n^4 + n^2 + 1 < (n^2 + 1)^2 \\)', rEn: 'Consecutive-square bounding trap (for \\( n \\ge 1 \\))', rAr: 'الحصر بين مربعين متتاليين (لكل \\( n \\ge 1 \\))' }
    ],
    se: {
      q: 'A student counts ALL integer pairs \\( (x, y) \\in \\mathbb{Z}^2 \\) satisfying \\( \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{5} \\). Where is the error?',
      q_ar: 'يعدّ طالب جميع أزواج الأعداد الصحيحة \\( (x, y) \\in \\mathbb{Z}^2 \\) التي تحقق \\( \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{5} \\). أين وقع الخطأ؟',
      steps: [
        { en: 'Clear denominators (for \\( xy \\neq 0 \\)) and rearrange: \\( xy - 5x - 5y = 0 \\).', ar: 'التخلص من المقامات (حيث \\( xy \\neq 0 \\)): \\( xy - 5x - 5y = 0 \\).' },
        { en: 'Add \\( 25 \\) to both sides by SFFT: \\( (x - 5)(y - 5) = 25 \\).', ar: 'إضافة \\( 25 \\) للطرفين: \\( (x - 5)(y - 5) = 25 \\).' },
        { en: 'Since \\( 25 \\) has \\( 3 \\) positive divisors \\( (1, 5, 25) \\) and \\( 3 \\) negative divisors \\( (-1, -5, -25) \\), conclude there are \\( 6 \\) valid solutions \\( (x, y) \\).', ar: 'بما أن لـ \\( 25 \\) ستة قواسم صحيحة \\( \\pm 1, \\pm 5, \\pm 25 \\)، الاستنتاج أن عدد الحلول الصحيحة المقبولة هو \\( 6 \\).' }
      ],
      errorStep: 3,
      reasons: [
        { en: 'The negative divisor pair \\( (x - 5, y - 5) = (-5, -5) \\) gives \\( (x, y) = (0, 0) \\), which makes \\( \\frac{1}{x} \\) and \\( \\frac{1}{y} \\) undefined! Rejecting \\( (0, 0) \\) leaves \\( 5 \\) valid integer solutions.', ar: 'زوج القواسم \\( (-5, -5) \\) يعطي \\( (x, y) = (0, 0) \\) الذي يصفر المقامين في المعادلة الأصلية! باستبعاده يتبقى \\( 5 \\) حلول فقط.' },
        { en: '25 has 4 positive divisors, not 3.', ar: 'للعدد 25 أربعة قواسم موجبة وليس 3.' },
        { en: 'SFFT requires subtracting 25 instead of adding 25.', ar: 'يتطلب تحليل SFFT طرح 25 بدلاً من إضافتها.' }
      ],
      h: 'Check what \\( x - 5 = -5 \\) and \\( y - 5 = -5 \\) produce for \\( x \\) and \\( y \\)!',
      h_ar: 'تحقق من قيمتَي \\( x, y \\) عندما \\( x - 5 = -5 \\) و\\( y - 5 = -5 \\)!',
      sol: 'Clearing denominators introduces the extraneous origin \\( (0, 0) \\) from \\( (-5)(-5) = 25 \\); hence there are \\( 6 - 1 = 5 \\) valid integer pairs.',
      sol_ar: 'ضرب المقامات يُدخل الحل الدخيل \\( (0, 0) \\) الناتج من \\( (-5)(-5) = 25 \\)، فيتبقى \\( 5 \\) حلول صحيحة فقط.'
    },
    ms: {
      q: 'Prove that \\( x^2 - 3y^2 = 2027 \\) has NO solutions in integers \\( (x, y) \\in \\mathbb{Z}^2 \\).',
      q_ar: 'أثبت عدم وجود أي حل في الأعداد الصحيحة \\( (x, y) \\in \\mathbb{Z}^2 \\) للمعادلة \\( x^2 - 3y^2 = 2027 \\).',
      parts: [
        {
          labelEn: 'Part (a) — Modular Obstruction Selection',
          labelAr: 'الجزء (أ) — اختيار المقاس الكاشف للتناقض',
          rubric: [
            { code: 'M1', marks: 1, en: 'Reduce the equation modulo \\( 3 \\) to annihilate \\( -3y^2 \\).', ar: 'اختزال طرفَي المعادلة بترديد \\( 3 \\) لحذف الحد \\( -3y^2 \\).' },
            { code: 'A1', marks: 1, en: 'Compute \\( 2027 \\equiv 2 + 0 + 2 + 7 = 11 \\equiv 2 \\pmod 3 \\), giving \\( x^2 \\equiv 2 \\pmod 3 \\).', ar: 'حساب \\( 2027 \\equiv 2 \\pmod 3 \\)، ومنه \\( x^2 \\equiv 2 \\pmod 3 \\).' }
          ]
        },
        {
          labelEn: 'Part (b) — Quadratic Residue Contradiction',
          labelAr: 'الجزء (ب) — تناقض البواقي التربيعية',
          rubric: [
            { code: 'B1', marks: 1, en: 'List all squares modulo \\( 3 \\): \\( 0^2 \\equiv 0,\\; (\\pm 1)^2 \\equiv 1 \\pmod 3 \\).', ar: 'حصر المربعات بترديد \\( 3 \\): \\( x^2 \\in \\{0, 1\\} \\pmod 3 \\).' },
            { code: 'A1', marks: 1, en: 'Conclude \\( 2 \\) is a quadratic non-residue mod \\( 3 \\), so zero integer solutions exist.', ar: 'استنتاج استحالة \\( x^2 \\equiv 2 \\pmod 3 \\) وعدم وجود حلول صحيحة.' }
          ]
        }
      ],
      tip: 'Before attempting algebraic factoring on \\( ax^2 + by^2 = c \\), ALWAYS test quadratic residues modulo \\( 3, 4, 5, 8 \\) and prime divisors of \\( a, b \\)!',
      tip_ar: 'قبل محاولة التحليل في \\( ax^2 + by^2 = c \\)، افحص دائماً البواقي التربيعية بترديد \\( 3, 4, 8 \\) والعوامل الأولية للمعاملات!'
    },
    sb: [
      { lEn: 'To solve \\( \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{6} \\) in \\( \\mathbb{Z}^+ \\), form \\( (x - 6)(y - 6) = \\)', lAr: 'لحل \\( \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{6} \\) في \\( \\mathbb{Z}^+ \\)، نكوّن \\( (x - 6)(y - 6) = \\)', a: '36', hEn: 'Add 6² = 36.', hAr: 'أضف 6² = 36.' },
      { lEn: 'Count the positive divisors \\( \\tau(36) \\) of \\( 36 = 2^2 \\cdot 3^2 \\): \\( \\tau(36) = \\)', lAr: 'احسب عدد القواسم الموجبة \\( \\tau(36) \\) للعدد \\( 36 = 2^2 \\cdot 3^2 \\):', a: '9', hEn: '(2 + 1)(2 + 1).', hAr: 'احسب (2 + 1)(2 + 1).' },
      { lEn: 'Find the maximum possible value of \\( x + y \\) over positive integers \\( (x, y) \\):', lAr: 'أوجد أكبر قيمة ممكنة للمجموع \\( x + y \\) في الأعداد الصحيحة الموجبة:', a: '49', hEn: 'Take divisor pair (1, 36) so x = 7, y = 42.', hAr: 'اختر زوج القواسم المتطرف (1, 36) فيكون x = 7 وy = 42.' }
    ],
    num: {
      q: 'What is the largest integer that CANNOT be expressed as \\( 8a + 15b \\) for non-negative integers \\( a, b \\ge 0 \\)?',
      q_ar: 'ما أكبر عدد صحيح لا يمكن كتابته على الصورة \\( 8a + 15b \\) حيث \\( a, b \\ge 0 \\) عددان صحيحان غير سالبين؟',
      a: 97,
      h: 'Since \\( \\gcd(8, 15) = 1 \\), compute \\( 8 \\times 15 - 8 - 15 \\).',
      h_ar: 'بما أن \\( \\gcd(8, 15) = 1 \\)، احسب \\( 8 \\times 15 - 8 - 15 \\).',
      sol: 'By the Frobenius Coin Theorem, \\( 8(15) - 8 - 15 = 120 - 23 = 97 \\).',
      sol_ar: 'حسب مبرهنة فروبينيوس للعملات: \\( 8(15) - 8 - 15 = 120 - 23 = 97 \\).'
    },
    ord: {
      prompt: 'Order the steps of Fermat\'s Infinite Descent to prove \\( x^2 + y^2 = 3z^2 \\) has only \\( (0, 0, 0) \\) in \\( \\mathbb{Z}^3 \\):',
      prompt_ar: 'رتّب خطوات النزول اللانهائي لفيرما لإثبات أن \\( x^2 + y^2 = 3z^2 \\) لا تملك سوى الحل الصفري في \\( \\mathbb{Z}^3 \\):',
      items: [
        { en: 'Assume a non-trivial integer solution exists and choose one minimizing \\( |x| + |y| + |z| > 0 \\).', ar: 'افترض وجود حل غير صفري واختر الحل الأصغر الذي يصغّر \\( |x| + |y| + |z| > 0 \\).' },
        { en: 'Reduce modulo \\( 3 \\): \\( x^2 + y^2 \\equiv 0 \\pmod 3 \\) forces \\( 3 \\mid x \\) and \\( 3 \\mid y \\) since \\( u^2 \\in \\{0, 1\\} \\pmod 3 \\).', ar: 'باختزال المعادلة بترديد \\( 3 \\)، يلزم من \\( x^2 + y^2 \\equiv 0 \\pmod 3 \\) أن \\( 3 \\mid x \\) و\\( 3 \\mid y \\).' },
        { en: 'Substitute \\( x = 3x_1,\\; y = 3y_1 \\) to get \\( 9(x_1^2 + y_1^2) = 3z^2 \\implies z^2 = 3(x_1^2 + y_1^2) \\implies 3 \\mid z \\).', ar: 'عوّض \\( x = 3x_1,\\; y = 3y_1 \\) فينتج \\( z^2 = 3(x_1^2 + y_1^2) \\) ومنه \\( 3 \\mid z \\) أيضاً.' },
        { en: 'Set \\( z = 3z_1 \\) to obtain \\( x_1^2 + y_1^2 = 3z_1^2 \\) with \\( |x_1| + |y_1| + |z_1| = \\frac{1}{3}(|x|+|y|+|z|) \\), contradicting minimality!', ar: 'ضع \\( z = 3z_1 \\) فتحصل على حل جديد \\( (x_1, y_1, z_1) \\) ثلث الحل الأصغر — تناقض!' }
      ],
      ex: 'Choose a minimal positive solution, use mod 3 to show 3 divides x, y, and z, then divide by 3 to contradict minimality.',
      ex_ar: 'اختر الحل الأصغر، وأثبت قابلية قسمة المتغيرات الثلاثة على 3، ثم اقسم على 3 لمناقضة الأصغرية.'
    },
    cat: {
      catsEn: ['SFFT Factoring', 'Modular Obstruction (No Solution)', 'Consecutive-Square Bounding'],
      catsAr: ['تحليل سايمون (SFFT)', 'استحالة معيارية (لا حلول)', 'الحصر بين مربعين متتاليين'],
      items: [
        { en: '\\( xy + 5x - 3y = 22 \\)', cat: 0 },
        { en: '\\( x^2 + y^2 = 8003 \\) (\\( \\equiv 3 \\pmod 4 \\))', cat: 1 },
        { en: '\\( n^2 + n + 2 = m^2 \\) for \\( n \\ge 2 \\)', ar: '\\( n^2 + n + 2 = m^2 \\) لكل \\( n \\ge 2 \\)', cat: 2 },
        { en: '\\( x^2 - 4y = 2026 \\) (\\( 2026 \\equiv 2 \\pmod 4 \\))', ar: '\\( x^2 - 4y = 2026 \\) (حيث \\( 2026 \\equiv 2 \\pmod 4 \\))', cat: 1 }
      ],
      ex: 'Bilinear equations factor via SFFT; impossible residues mod 4 prove non-existence; polynomials near squares are trapped between consecutive squares.',
      ex_ar: 'المعادلات الثنائية الخطية تُحلل بـ SFFT، والبواقي المستحيلة بترديد 4 تثبت انعدام الحل، وكثيرات الحدود القريبة من مربع تُحصر بين مربعين متتاليين.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Solve \\( 2^x - 3^y = 1 \\) in positive integers \\( (x, y) \\).', ar: '<strong>الهدف:</strong> حل المعادلة الأسية \\( 2^x - 3^y = 1 \\) في الأعداد الصحيحة الموجبة.' },
      { en: '<strong>Step 1 (Mod \\( 3 \\) Parity of \\( x \\)):</strong> \\( (-1)^x \\equiv 1 \\pmod 3 \\) forces \\( x = 2k \\) to be even!', ar: '<strong>الخطوة 1 (اختبار بترديد \\( 3 \\)):</strong> \\( (-1)^x \\equiv 1 \\pmod 3 \\) يفرض أن يكون \\( x = 2k \\) عدداً زوجياً!' },
      { en: '<strong>Step 2 (Factor \\( (2^k - 1)(2^k + 1) = 3^y \\)):</strong> Since \\( \\gcd(2^k - 1, 2^k + 1) = 1 \\), we must have \\( 2^k - 1 = 1 \\implies k = 1 \\implies x = 2,\\; y = 1 \\) uniquely (\\( 4 - 3 = 1 \\))!', ar: '<strong>الخطوة 2 (تحليل فرق المربعين):</strong> من \\( (2^k - 1)(2^k + 1) = 3^y \\) والأولية النسبية يلزم \\( 2^k - 1 = 1 \\implies k = 1 \\)، والحل الوحيد هو \\( (2, 1) \\)!' }
    ]
  }),

  'ol-combinatorics-counting': makeChapterIx({
    nameEn: 'Bijective Counting, Inclusion-Exclusion & Pigeonhole',
    nameAr: 'العد التقابلي ومبدأ الشمول والإقصاء وبرج الحمام',
    shortEn: 'Bijections, PIE & Pigeonhole',
    shortAr: 'التقابلات والشمول والإقصاء وبرج الحمام',
    qc: {
      q: 'In how many ways can \\( 4 \\) non-adjacent books be chosen from a shelf of \\( 11 \\) distinct books in a row?',
      q_ar: 'بكم طريقة يمكن اختيار \\( 4 \\) كتب غير متجاورة من رف يضم \\( 11 \\) كتاباً متمايزاً في صف واحد؟',
      o: ['\\( 70 \\)', '\\( 330 \\)', '\\( 56 \\)', '\\( 126 \\)'],
      a: 0,
      ex: 'By Kaplansky\'s spacing bijection, \\( \\binom{n - k + 1}{k} = \\binom{11 - 4 + 1}{4} = \\binom{8}{4} = 70 \\).',
      ex_ar: 'بتقابل كابلانسكي للمسافات الفاصلة: \\( \\binom{11 - 4 + 1}{4} = \\binom{8}{4} = 70 \\).'
    },
    tf: [
      { en: 'The Hockey-Stick Identity states \\( \\sum_{j=k}^{n} \\binom{j}{k} = \\binom{n+1}{k+1} \\).', ar: 'تنص متطابقة عصا الهوكي على أن \\( \\sum_{j=k}^{n} \\binom{j}{k} = \\binom{n+1}{k+1} \\).', a: true },
      { en: 'Among ANY \\( 5 \\) points placed inside a \\( 2 \\times 2 \\) square, some pair lies within distance \\( \\le \\sqrt{2} \\).', ar: 'من بين أي \\( 5 \\) نقاط داخل مربع \\( 2 \\times 2 \\)، توجد نقطتان على الأقل المسافة بينهما \\( \\le \\sqrt{2} \\).', a: true },
      { en: 'The number of derangements \\( D_4 \\) of \\( 4 \\) elements equals \\( 10 \\).', ar: 'عدد التبديلات الخالية من النقاط الثابتة \\( D_4 \\) لأربعة عناصر يساوي \\( 10 \\).', a: false }
    ],
    mt: [
      { l: '\\( \\binom{n + k - 1}{k - 1} \\)', rEn: 'Stars & Bars (non-negative solutions to \\( x_1+\\dots+x_k=n \\))', rAr: 'النجوم والفواصل (حلول غير سالبة لـ \\( x_1+\\dots+x_k=n \\))' },
      { l: '\\( \\sum_{k=0}^{r} \\binom{m}{k}\\binom{n}{r-k} = \\binom{m+n}{r} \\)', rEn: 'Vandermonde\'s Convolution Identity', rAr: 'متطابقة فاندرموند التوافقية' },
      { l: '\\( D_n = n! \\sum_{j=0}^{n} \\frac{(-1)^j}{j!} \\)', rEn: 'Derangement Count via PIE', rAr: 'عدّ التبديلات الكاملة الإزاحة عبر PIE' },
      { l: '\\( \\lceil N / k \\rceil \\)', rEn: 'Generalized Pigeonhole Threshold', rAr: 'عتبة مبدأ برج الحمام المعمم' }
    ],
    se: {
      q: 'A student counts \\( 5 \\)-card poker hands from a \\( 52 \\)-card deck containing AT LEAST ONE Ace. Find the overcounting fallacy!',
      q_ar: 'يحسب طالب عدد تشكيلات البوكر المكونة من \\( 5 \\) أوراق (من أصل \\( 52 \\)) التي تحوي آساً واحداً على الأقل. أين تقع مغالطة التكرار؟',
      steps: [
        { en: 'First pick \\( 1 \\) guaranteed Ace from the \\( 4 \\) Aces in \\( \\binom{4}{1} = 4 \\) ways.', ar: 'اختيار ورقة آس واحدة أولاً لضمان الشرط بـ \\( \\binom{4}{1} = 4 \\) طرق.' },
        { en: 'Then choose the remaining \\( 4 \\) cards freely from the remaining \\( 51 \\) cards in \\( \\binom{51}{4} \\) ways.', ar: 'اختيار الأوراق الـ \\( 4 \\) المتبقية من الـ \\( 51 \\) ورقة الباقية بـ \\( \\binom{51}{4} \\) طريقة.' },
        { en: 'Multiply to conclude there are \\( 4 \\times \\binom{51}{4} \\) hands with at least one Ace.', ar: 'الضرب لاستنتاج أن العدد يساوي \\( 4 \\times \\binom{51}{4} \\).' }
      ],
      errorStep: 3,
      reasons: [
        { en: 'Any hand containing \\( m \\ge 2 \\) Aces is counted \\( m \\) distinct times (once for each Ace chosen in Step 1)! Complementary counting gives the exact answer \\( \\binom{52}{5} - \\binom{48}{5} \\).', ar: 'أي تشكيلة تحوي \\( m \\ge 2 \\) من أوراق الآس تُحتسب \\( m \\) مرات مختلفة! العد التكميلي يعطي الإجابة الصحيحة \\( \\binom{52}{5} - \\binom{48}{5} \\).' },
        { en: 'There are only 50 remaining cards after picking one Ace.', ar: 'يتبقى 50 ورقة فقط بعد سحب آس واحد.' },
        { en: 'Order of cards matters in a poker hand.', ar: 'ترتيب الأوراق مهم في تشكيلة اليد.' }
      ],
      h: 'Consider the hand \\( \\{A\\spadesuit, A\\heartsuit, 2\\clubsuit, 3\\clubsuit, 4\\clubsuit\\} \\): how many times does Step 1+2 generate it?',
      h_ar: 'تأمل تشكيلة فيها ورقتا آس: كم مرة تُولّدها الخطوتان 1 و2؟',
      sol: 'Distinguishing a "first Ace" overcounts multi-Ace hands; subtract Ace-free hands \\( \\binom{52}{5} - \\binom{48}{5} \\) instead.',
      sol_ar: 'تمييز آس أول يكرر التشكيلات متعددة الآس؛ الحل الدقيق بالعد التكميلي \\( \\binom{52}{5} - \\binom{48}{5} \\).'
    },
    ms: {
      q: 'Prove via Pigeonhole Principle that among any \\( n + 1 \\) integers chosen from \\( \\{1, 2, \\dots, 2n\\} \\), one divides another.',
      q_ar: 'أثبت بمبدأ برج الحمام أنه من بين أي \\( n + 1 \\) عدداً مختاراً من \\( \\{1, 2, \\dots, 2n\\} \\)، يقسم أحدها الآخر حتماً.',
      parts: [
        {
          labelEn: 'Part (a) — Odd-Core Pigeonhole Design',
          labelAr: 'الجزء (أ) — تصميم الصناديق عبر الجزء الفردي',
          rubric: [
            { code: 'M1', marks: 1, en: 'Factor every chosen integer uniquely as \\( x_i = 2^{a_i} m_i \\) with \\( m_i \\) odd.', ar: 'كتابة كل عدد مختار بصورة وحيدة \\( x_i = 2^{a_i} m_i \\) حيث \\( m_i \\) فردي.' },
            { code: 'A1', marks: 1, en: 'Observe \\( \\{1, 2, \\dots, 2n\\} \\) contains only \\( n \\) odd numbers \\( \\{1, 3, \\dots, 2n - 1\\} \\).', ar: 'ملاحظة أن المجموعة تحوي \\( n \\) عدداً فردياً فقط.' }
          ]
        },
        {
          labelEn: 'Part (b) — Collision & Divisibility',
          labelAr: 'الجزء (ب) — التصادم واستنتاج القسمة',
          rubric: [
            { code: 'M1', marks: 1, en: 'By PHP, two of the \\( n + 1 \\) chosen integers share the same odd part \\( m \\): \\( x_i = 2^a m \\) and \\( x_j = 2^b m \\) with \\( a < b \\).', ar: 'بمبدأ برج الحمام يشترك عددان في الجزء الفردي نفسه \\( 2^a m \\) و\\( 2^b m \\) مع \\( a < b \\).' },
            { code: 'A1', marks: 1, en: 'Conclude \\( x_i \\mid x_j \\) since \\( x_j / x_i = 2^{b-a} \\in \\mathbb{Z}^+ \\).', ar: 'استنتاج أن الأصغر يقسم الأكبر لأن خارج القسمة \\( 2^{b-a} \\) عدد صحيح.' }
          ]
        }
      ],
      tip: 'Erdős\'s favorite proof! In Olympiad PHP problems, designing the right invariant "pigeonholes" (here, the odd part) is 90% of the solution.',
      tip_ar: 'برهان إردوش المفضل! سر مسائل برج الحمام الأولمبية هو ابتكار تعريف ذكي للصناديق (الجزء الفردي هنا).'
    },
    sb: [
      { lEn: 'Count derangements \\( D_3 \\) of \\( 3 \\) items: \\( D_3 = \\)', lAr: 'احسب عدد التبديلات الكاملة الإزاحة \\( D_3 \\) لثلاثة عناصر:', a: '2', hEn: 'Only cyclic shifts (2,3,1) and (3,1,2).', hAr: 'الإزاحتان الدوريتان فقط.' },
      { lEn: 'Use \\( D_4 = 4 D_3 + (-1)^4 \\) to compute \\( D_4 = \\)', lAr: 'استخدم \\( D_4 = 4 D_3 + 1 \\) لحساب \\( D_4 = \\)', a: '9', hEn: '4 × 2 + 1.', hAr: 'احسب 4 × 2 + 1.' },
      { lEn: 'Use \\( D_5 = 5 D_4 + (-1)^5 \\) to compute \\( D_5 = \\)', lAr: 'استخدم \\( D_5 = 5 D_4 - 1 \\) لحساب \\( D_5 = \\)', a: '44', hEn: '5 × 9 − 1.', hAr: 'احسب 5 × 9 − 1.' }
    ],
    num: {
      q: 'Evaluate \\( \\sum_{k=0}^{6} \\binom{6}{k}^2 \\).',
      q_ar: 'احسب القيمة الصحيحة الدقيقة للمجموع \\( \\sum_{k=0}^{6} \\binom{6}{k}^2 \\).',
      a: 924,
      h: 'By Vandermonde\'s Identity, \\( \\sum_{k=0}^{n} \\binom{n}{k}^2 = \\binom{2n}{n} \\).',
      h_ar: 'حسب متطابقة فاندرموند: \\( \\sum_{k=0}^{6} \\binom{6}{k}^2 = \\binom{12}{6} \\).',
      sol: 'By Vandermonde\'s Convolution, \\( \\sum_{k=0}^{6} \\binom{6}{k}^2 = \\binom{12}{6} = 924 \\).',
      sol_ar: 'حسب متطابقة فاندرموند يساوي المجموع \\( \\binom{12}{6} = 924 \\).'
    },
    ord: {
      prompt: 'Order the double-counting proof of the Handshaking Lemma \\( \\sum_{v \\in V} \\deg(v) = 2|E| \\):',
      prompt_ar: 'رتّب خطوات برهان العدّ المزدوج لتوطئة المصافحة \\( \\sum_{v \\in V} \\deg(v) = 2|E| \\):',
      items: [
        { en: 'Define the incidence set \\( I = \\{(v, e) \\in V \\times E : v \\text{ is an endpoint of } e\\} \\).', ar: 'عرّف مجموعة الوقوع \\( I = \\{(v, e) \\in V \\times E : v \\text{ طرف للضلع } e\\} \\).' },
        { en: 'Count \\( |I| \\) by grouping over vertices \\( v \\in V \\): each \\( v \\) contributes \\( \\deg(v) \\) pairs, giving \\( \\sum_{v \\in V} \\deg(v) \\).', ar: 'عُدّ \\( |I| \\) بتجميع الأزواج حسب الرؤوس \\( v \\in V \\) فتحصل على \\( \\sum \\deg(v) \\).' },
        { en: 'Count \\( |I| \\) by grouping over edges \\( e \\in E \\): every simple edge has \\( 2 \\) endpoints, giving \\( 2|E| \\).', ar: 'عُدّ \\( |I| \\) ثانيةً حسب الأضلاع \\( e \\in E \\): لكل ضلع طرفان اثنان، فينتج \\( 2|E| \\).' },
        { en: 'Equate the two counts of \\( |I| \\) to conclude \\( \\sum_{v \\in V} \\deg(v) = 2|E| \\).', ar: 'ساوِ ناتجَي العدّ للمجموعة نفسها لاستنتاج \\( \\sum \\deg(v) = 2|E| \\).' }
      ],
      ex: 'Form the vertex-edge incidence matrix/set and equate row sums (degrees) to column sums (2 per edge).',
      ex_ar: 'كوّن أزواج الوقوع (رأس، ضلع) وساوِ مجموع الصفوف بمجموع الأعمدة.'
    },
    cat: {
      catsEn: ['Stars and Bars', 'Inclusion-Exclusion (PIE)', 'Pigeonhole Principle (PHP)'],
      catsAr: ['النجوم والفواصل', 'مبدأ الشمول والإقصاء (PIE)', 'مبدأ برج الحمام (PHP)'],
      items: [
        { en: 'Counting solutions to \\( a + b + c + d = 20 \\) in \\( \\mathbb{Z}_{\\ge 0} \\)', ar: 'عدّ الحلول غير السالبة للمعادلة \\( a + b + c + d = 20 \\)', cat: 0 },
        { en: 'Counting integers in \\( \\{1, \\dots, 1000\\} \\) coprime to \\( 30 \\)', ar: 'عدّ الأعداد في \\( \\{1, \\dots, 1000\\} \\) الأولية نسبياً مع \\( 30 \\)', cat: 1 },
        { en: 'Proving some subset of \\( 10 \\) integers has sum divisible by \\( 10 \\)', ar: 'إثبات وجود متتالية جزئية من \\( 10 \\) أعداد يقبل مجموعها القسمة على \\( 10 \\)', cat: 2 },
        { en: 'Counting surjective (onto) functions from a \\( 7 \\)-set to a \\( 4 \\)-set', ar: 'عدّ الدوال الشاملة من مجموعة ذات \\( 7 \\) عناصر إلى مجموعة ذات \\( 4 \\) عناصر', cat: 1 }
      ],
      ex: 'Indistinguishable distribution uses Stars & Bars; forbidden properties/surjections use PIE; existence guarantees use PHP.',
      ex_ar: 'التوزيع غير المميز يستخدم النجوم والفواصل، وتقاطع الشروط والدوال الشاملة يستخدم PIE، وإثبات الوجود الحتمي يستخدم برج الحمام.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Prove every sequence of \\( n \\) integers contains a contiguous block whose sum is divisible by \\( n \\).', ar: '<strong>الهدف:</strong> إثبات أن أي متتالية من \\( n \\) عدداً صحيحاً تحوي مقطعاً متصلاً يقبل مجموعه القسمة على \\( n \\).' },
      { en: '<strong>Step 1 (Prefix Sums):</strong> Form the \\( n + 1 \\) prefix sums \\( S_0 = 0,\\; S_1 = a_1,\\; \\dots,\\; S_n = a_1 + \\dots + a_n \\).', ar: '<strong>الخطوة 1 (المجاميع البادئة):</strong> نكوّن \\( n + 1 \\) مجموعاً بادئاً \\( S_0 = 0, S_1, \\dots, S_n \\).' },
      { en: '<strong>Step 2 (Pigeonhole Modulo \\( n \\)):</strong> With \\( n + 1 \\) prefix sums and only \\( n \\) residue classes mod \\( n \\), some \\( S_j \\equiv S_i \\pmod n \\) (\\( i < j \\)), so \\( a_{i+1} + \\dots + a_j = S_j - S_i \\) is divisible by \\( n \\)!', ar: '<strong>الخطوة 2 (برج الحمام بترديد \\( n \\)):</strong> لدينا \\( n + 1 \\) مجموعاً و\\( n \\) بواقٍ فقط، فيتطابق اثنان \\( S_j \\equiv S_i \\pmod n \\) ويكون فرقهما مقسوماً على \\( n \\)!' }
    ]
  }),

  'ol-recurrence-probability': makeChapterIx({
    nameEn: 'Recurrence Relations & Geometric Probability',
    nameAr: 'العلاقات التكرارية والاحتمال الهندسي',
    shortEn: 'Recurrences, Markov States & Catalan',
    shortAr: 'العلاقات التكرارية وسلاسل ماركوف وكاتالان',
    qc: {
      q: 'How many binary strings of length \\( 6 \\) contain NO two consecutive \\( 1 \\)\'s?',
      q_ar: 'كم سلسلة ثنائية (من \\( 0 \\) و\\( 1 \\)) طولها \\( 6 \\) لا تحتوي على رقمَي \\( 1 \\) متجاورين؟',
      o: ['\\( 21 \\)', '\\( 13 \\)', '\\( 34 \\)', '\\( 16 \\)'],
      a: 0,
      ex: 'Let \\( b_n \\) be the count: \\( b_1 = 2, b_2 = 3 \\), and \\( b_n = b_{n-1} + b_{n-2} \\), giving \\( 2, 3, 5, 8, 13, 21 \\) at \\( n = 6 \\).',
      ex_ar: 'تحقق \\( b_n = b_{n-1} + b_{n-2} \\) مع \\( b_1 = 2, b_2 = 3 \\)، فنجد \\( 2, 3, 5, 8, 13, 21 \\) عند \\( n = 6 \\).'
    },
    tf: [
      { en: 'Linearity of expectation \\( \\mathbb{E}[X + Y] = \\mathbb{E}[X] + \\mathbb{E}[Y] \\) holds even when \\( X \\) and \\( Y \\) are strongly dependent!', ar: 'تظل خطية التوقع \\( \\mathbb{E}[X + Y] = \\mathbb{E}[X] + \\mathbb{E}[Y] \\) صحيحة حتى لو كان المتغيران \\( X, Y \\) غير مستقلين!', a: true },
      { en: 'The \\( n \\)-th Catalan number \\( C_n = \\frac{1}{n+1}\\binom{2n}{n} \\) counts triangulations of a convex \\( (n+2) \\)-gon.', ar: 'يعدّ عدد كاتالان \\( C_n = \\frac{1}{n+1}\\binom{2n}{n} \\) طرق تثليث مضلع محدب ذي \\( n + 2 \\) ضلعاً.', a: true },
      { en: 'If \\( r = 3 \\) is a repeated double root of a second-order characteristic equation, the general solution is \\( c_1 3^n + c_2 9^n \\).', ar: 'إذا كان \\( r = 3 \\) جذراً مزدوجاً للمعادلة المميزة من الدرجة الثانية، فالحل العام هو \\( c_1 3^n + c_2 9^n \\).', a: false }
    ],
    mt: [
      { l: '\\( a_n = (c_1 + c_2 n) r^n \\)', rEn: 'Repeated characteristic root \\( (x - r)^2 = 0 \\)', rAr: 'حالة الجذر المميز المكرر \\( (x - r)^2 = 0 \\)' },
      { l: '\\( C_n = \\frac{1}{n+1}\\binom{2n}{n} \\)', rEn: 'Catalan number (Dyck paths & parenthesizations)', rAr: 'عدد كاتالان (مسارات دايك والأقواس المتوازنة)' },
      { l: '\\( \\mathbb{E}[\\text{fixed points}] = n \\cdot \\frac{1}{n} = 1 \\)', rEn: 'Indicator expectation on a random permutation', rAr: 'توقع النقاط الثابتة في تبديل عشوائي بالمؤشرات' },
      { l: '\\( P = \\frac{\\text{Area}(\\mathcal{F})}{\\text{Area}(\\Omega)} \\)', rEn: 'Continuous Geometric Probability measure', rAr: 'قانون الاحتمال الهندسي المتصل بالمساحات' }
    ],
    se: {
      q: 'A student computes the expected number of fair coin tosses to get two consecutive Heads (\\( HH \\)). Identify the flawed equation!',
      q_ar: 'يحسب طالب التوقع الرياضي لعدد رميات قطعة نقد عادلة للحصول على صورتين متتاليتين \\( HH \\). أي خطوة خاطئة؟',
      steps: [
        { en: 'Let \\( E \\) be expected tosses from start, and \\( E_H \\) after seeing a single \\( H \\).', ar: 'نرمز بـ \\( E \\) للتوقع من البداية وبـ \\( E_H \\) بعد ظهور \\( H \\) واحدة.' },
        { en: 'From start: \\( E = 1 + \\frac{1}{2}E_H + \\frac{1}{2}E \\implies E = E_H + 2 \\).', ar: 'من البداية: \\( E = 1 + \\frac{1}{2}E_H + \\frac{1}{2}E \\implies E = E_H + 2 \\).' },
        { en: 'From state \\( H \\), write \\( E_H = 1 + \\frac{1}{2}(0) + \\frac{1}{2}E_H \\) (claiming \\( T \\) keeps us in state \\( H \\)), giving \\( E_H = 2 \\) and \\( E = 4 \\).', ar: 'من الحالة \\( H \\)، كتابة \\( E_H = 1 + \\frac{1}{2}(0) + \\frac{1}{2}E_H \\) واستنتاج \\( E = 4 \\).' }
      ],
      errorStep: 3,
      reasons: [
        { en: 'Tossing \\( T \\) from state \\( H \\) breaks the streak completely and resets to the start state \\( E \\) (NOT \\( E_H \\)), so \\( E_H = 1 + \\frac{1}{2}E \\), yielding \\( E = (1 + \\frac{1}{2}E) + 2 \\implies E = 6 \\)!', ar: 'ظهور \\( T \\) بعد \\( H \\) يقطع السلسلة ويعيدنا للبداية \\( E \\) لا إلى \\( E_H \\)، أي \\( E_H = 1 + \\frac{1}{2}E \\) ومنه \\( E = 6 \\)!' },
        { en: 'A fair coin has probability 1/4 on a single toss.', ar: 'احتمال الرمية الواحدة هو 1/4.' },
        { en: 'The +1 toss cost should not appear in step equations.', ar: 'لا تضاف 1 لتكلفة الرمية في المعادلة.' }
      ],
      h: 'After tossing \\( HT \\), how many trailing Heads do you currently have?',
      h_ar: 'بعد ظهور \\( HT \\)، كم صورة متتالية لديك في نهاية السلسلة؟ صفر!',
      sol: 'With \\( E = E_H + 2 \\) and \\( E_H = 1 + \\frac{1}{2}E \\), solving gives \\( \\frac{1}{2}E = 3 \\implies E = 6 \\) tosses (whereas \\( HT \\) takes \\( 4 \\)!).',
      sol_ar: 'بحل \\( E = E_H + 2 \\) مع \\( E_H = 1 + \\frac{1}{2}E \\) نجد \\( E = 6 \\) رميات.'
    },
    ms: {
      q: 'Solve the recurrence \\( a_0 = 1,\\; a_1 = 6,\\; a_n = 4a_{n-1} - 4a_{n-2} \\) for \\( n \\ge 2 \\) in closed form.',
      q_ar: 'أوجد الصيغة المغلقة للمتتالية \\( a_0 = 1,\\; a_1 = 6,\\; a_n = 4a_{n-1} - 4a_{n-2} \\) لكل \\( n \\ge 2 \\).',
      parts: [
        {
          labelEn: 'Part (a) — Repeated Characteristic Root',
          labelAr: 'الجزء (أ) — الجذر المكرر للمعادلة المميزة',
          rubric: [
            { code: 'M1', marks: 1, en: 'Form \\( r^2 - 4r + 4 = (r - 2)^2 = 0 \\), identifying double root \\( r = 2 \\).', ar: 'تكوين \\( r^2 - 4r + 4 = (r - 2)^2 = 0 \\) وتحديد الجذر المكرر \\( r = 2 \\).' },
            { code: 'A1', marks: 1, en: 'Write general solution \\( a_n = (c_1 + c_2 n)2^n \\).', ar: 'كتابة الشكل العام \\( a_n = (c_1 + c_2 n)2^n \\).' }
          ]
        },
        {
          labelEn: 'Part (b) — Initial Conditions',
          labelAr: 'الجزء (ب) — تطبيق شروط البداية',
          rubric: [
            { code: 'M1', marks: 1, en: 'From \\( a_0 = 1 \\implies c_1 = 1 \\); from \\( a_1 = (1 + c_2)\\cdot 2 = 6 \\implies c_2 = 2 \\).', ar: 'من \\( a_0 = 1 \\) نجد \\( c_1 = 1 \\)، ومن \\( a_1 = 6 \\) نجد \\( c_2 = 2 \\).' },
            { code: 'A1', marks: 1, en: 'Conclude \\( a_n = (2n + 1)2^n \\) (check \\( a_2 = 5 \\cdot 4 = 20 = 4(6) - 4(1) \\)).', ar: 'استنتاج \\( a_n = (2n + 1)2^n \\).' }
          ]
        }
      ],
      tip: 'Always check \\( n = 2 \\) by hand against the recurrence to confirm your constants \\( c_1, c_2 \\)!',
      tip_ar: 'تحقق دائماً من قيمة \\( a_2 \\) يدوياً في العلاقة التكرارية للتأكد من الثوابت!'
    },
    sb: [
      { lEn: 'Compute the 3rd Catalan number \\( C_3 = \\frac{1}{4}\\binom{6}{3} = \\)', lAr: 'احسب عدد كاتالان الثالث \\( C_3 = \\frac{1}{4}\\binom{6}{3} = \\)', a: '5', hEn: '20 / 4.', hAr: 'اقسم 20 على 4.' },
      { lEn: 'Compute the 4th Catalan number \\( C_4 = \\frac{1}{5}\\binom{8}{4} = \\)', lAr: 'احسب عدد كاتالان الرابع \\( C_4 = \\frac{1}{5}\\binom{8}{4} = \\)', a: '14', hEn: '70 / 5.', hAr: 'اقسم 70 على 5.' },
      { lEn: 'Compute the 5th Catalan number \\( C_5 = \\frac{1}{6}\\binom{10}{5} = \\)', lAr: 'احسب عدد كاتالان الخامس \\( C_5 = \\frac{1}{6}\\binom{10}{5} = \\)', a: '42', hEn: '252 / 6.', hAr: 'اقسم 252 على 6.' }
    ],
    num: {
      q: 'Into how many maximal regions do \\( n = 10 \\) lines in general position (no two parallel, no three concurrent) divide the Euclidean plane?',
      q_ar: 'إلى كم منطقة قصوى يقسم \\( 10 \\) مستقيمات في وضع عام (لا يوجد مستقيمان متوازيان ولا ثلاثة متلاقية) المستوى الإقليدي؟',
      a: 56,
      h: 'Use \\( R_n = 1 + \\frac{n(n+1)}{2} \\).',
      h_ar: 'طبّق العلاقة \\( R_n = 1 + \\frac{n(n+1)}{2} \\).',
      sol: 'Since \\( R_0 = 1 \\) and the \\( k \\)-th line adds \\( k \\) new regions, \\( R_{10} = 1 + \\frac{10 \\times 11}{2} = 1 + 55 = 56 \\).',
      sol_ar: 'المستقيم الـ \\( k \\) يضيف \\( k \\) مناطق جديدة، ومنه \\( R_{10} = 1 + \\frac{10 \\times 11}{2} = 56 \\).'
    },
    ord: {
      prompt: 'Order the steps to find \\( \\mathbb{P}(\\text{even number of } 1\\text{\'s}) \\) in a random \\( n \\)-digit string from \\( \\{1, 2, 3, 4, 5\\}^n \\):',
      prompt_ar: 'رتّب خطوات إيجاد احتمال ظهور الرقم \\( 1 \\) عدداً زوجياً من المرات في سلسلة عشوائية طولها \\( n \\) من \\( \\{1, 2, 3, 4, 5\\}^n \\):',
      items: [
        { en: 'Let \\( p_n \\) be the probability of an even count of \\( 1 \\)\'s after \\( n \\) digits, with \\( p_0 = 1 \\).', ar: 'افرض \\( p_n \\) احتمال زوجية عدد الواحدات بعد \\( n \\) خانة، مع \\( p_0 = 1 \\).' },
        { en: 'Condition on the \\( n \\)-th digit (prob \\( 1/5 \\) for \\( 1 \\), \\( 4/5 \\) otherwise): \\( p_n = \\frac{4}{5}p_{n-1} + \\frac{1}{5}(1 - p_{n-1}) \\).', ar: 'شرّط على الخانة الأخيرة: \\( p_n = \\frac{4}{5}p_{n-1} + \\frac{1}{5}(1 - p_{n-1}) \\).' },
        { en: 'Center around the fixed point \\( 1/2 \\): \\( p_n - \\frac{1}{2} = \\frac{3}{5}\\left(p_{n-1} - \\frac{1}{2}\\right) \\).', ar: 'أزح حول النقطة الثابتة \\( 1/2 \\): \\( p_n - \\frac{1}{2} = \\frac{3}{5}\\left(p_{n-1} - \\frac{1}{2}\\right) \\).' },
        { en: 'Iterate \\( n \\) times from \\( p_0 - \\frac{1}{2} = \\frac{1}{2} \\) to get \\( p_n = \\frac{1 + (3/5)^n}{2} \\).', ar: 'كرر العلاقة \\( n \\) مرة لتحصل على \\( p_n = \\frac{1 + (3/5)^n}{2} \\).' }
      ],
      ex: 'Define state probability p_n, write the first-step recurrence, subtract the fixed point 1/2, and iterate geometrically.',
      ex_ar: 'عرّف احتمال الحالة p_n، واكتب علاقة الخطوة الأولى، ثم أزح حول 1/2 للحصول على متتالية هندسية.'
    },
    cat: {
      catsEn: ['Fibonacci-Type Linear Recurrence', 'Catalan Convolution Recurrence', 'Geometric Probability Area Ratio'],
      catsAr: ['علاقة تكرارية خطية فيبوناتشية', 'علاقة كاتالان الالتفافية', 'احتمال هندسي بنسبة المساحات'],
      items: [
        { en: 'Tiling a \\( 2 \\times n \\) board with \\( 1 \\times 2 \\) dominoes', ar: 'تبليط لوحة \\( 2 \\times n \\) بقطع دومينو \\( 1 \\times 2 \\)', cat: 0 },
        { en: 'Counting non-crossing chord matchings of \\( 2n \\) points on a circle', ar: 'عدّ الأوتار غير المتقاطعة لـ \\( 2n \\) نقطة على دائرة', cat: 1 },
        { en: 'Probability two random points in \\( [0,1] \\) satisfy \\( |x - y| \\le 1/3 \\)', ar: 'احتمال تحقق \\( |x - y| \\le 1/3 \\) لنقطتين عشوائيتين في \\( [0,1] \\)', cat: 2 },
        { en: 'Climbing \\( n \\) stairs taking \\( 1 \\) or \\( 2 \\) steps at a time', ar: 'صعود \\( n \\) درجة بخطوة واحدة أو خطوتين في كل مرة', cat: 0 }
      ],
      ex: '1D local extensions obey Fibonacci; binary tree/chord splits obey Catalan; continuous intervals map to 2D areas.',
      ex_ar: 'الامتدادات الخطية تتبع فيبوناتشي، وتفريعات الأشجار والأوتار تتبع كاتالان، والفترات المتصلة تمثّل بالمساحات.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Find the probability that a stick broken at two independent uniform points \\( x, y \\in (0, 1) \\) forms a triangle.', ar: '<strong>الهدف:</strong> إيجاد احتمال تكوين مثلث عند كسر عصا في نقطتين عشوائيتين مستقلتين \\( x, y \\in (0, 1) \\).' },
      { en: '<strong>Step 1 (Triangle Inequality):</strong> Each of the three pieces must have length strictly less than \\( 1/2 \\)!', ar: '<strong>الخطوة 1 (متباينة المثلث):</strong> يجب أن يكون طول كل قطعة من القطع الثلاث أصغر قطعاً من \\( 1/2 \\)!' },
      { en: '<strong>Step 2 (Area in \\( [0, 1]^2 \\)):</strong> For \\( x < y \\), we need \\( x < 1/2,\\; y > 1/2,\\; y - x < 1/2 \\) (area \\( 1/8 \\)); by symmetry for \\( y < x \\), total probability is \\( 2 \\times \\frac{1}{8} = \\frac{1}{4} \\)!', ar: '<strong>الخطوة 2 (حساب المساحة في المربع):</strong> عند \\( x < y \\) نحتاج \\( x < 1/2,\\; y > 1/2,\\; y - x < 1/2 \\) ومساحتها \\( 1/8 \\)، وبالتناظر لـ \\( y < x \\) يكون الاحتمال الكلي \\( \\frac{1}{4} \\)!' }
    ]
  }),

  'ol-euclidean-circles': makeChapterIx({
    nameEn: 'Circle Geometry, Power of a Point & Radical Axes',
    nameAr: 'هندسة الدائرة وقوة النقطة والمحاور الأساسية',
    shortEn: 'Cyclic Quads, Power of a Point & Radical Axis',
    shortAr: 'الرباعيات الدائرية وقوة النقطة والمحور الأساسي',
    qc: {
      q: 'Two externally tangent circles have radii \\( r_1 = 9 \\) and \\( r_2 = 16 \\). What is the length of their common external tangent segment \\( AB \\)?',
      q_ar: 'دائرتان متماستان من الخارج نصفا قطرَيهما \\( r_1 = 9 \\) و\\( r_2 = 16 \\). ما طول قطعة المماس المشترك الخارجي \\( AB \\) بينهما؟',
      o: ['\\( 24 \\)', '\\( 25 \\)', '\\( 12 \\)', '\\( 20 \\)'],
      a: 0,
      ex: 'For externally tangent circles, \\( AB = 2\\sqrt{r_1 r_2} = 2\\sqrt{9 \\times 16} = 2 \\times 12 = 24 \\).',
      ex_ar: 'للدائرتين المتماستين من الخارج: \\( AB = 2\\sqrt{r_1 r_2} = 2\\sqrt{9 \\times 16} = 24 \\).'
    },
    tf: [
      { en: 'In any cyclic quadrilateral \\( ABCD \\), Ptolemy\'s Theorem states \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot AD \\).', ar: 'في أي رباعي دائري \\( ABCD \\)، تنص مبرهنة بطليموس على أن \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot AD \\).', a: true },
      { en: 'The three pairwise radical axes of three circles with non-collinear centers always concur at a single Radical Center.', ar: 'المحاور الأساسية الثلاثة لثلاث دوائر مراكزها ليست على استقامة واحدة تلتقي دائماً في نقطة واحدة (المركز الأساسي).', a: true },
      { en: 'If \\( P \\) lies inside circle \\( \\omega \\) of radius \\( R \\) at distance \\( d < R \\) from \\( O \\), then \\( \\operatorname{Pow}_\\omega(P) = d^2 - R^2 \\) is positive.', ar: 'إذا وقعت \\( P \\) داخل الدائرة \\( \\omega \\) على بُعد \\( d < R \\)، فإن قوة النقطة \\( d^2 - R^2 \\) موجبة.', a: false }
    ],
    mt: [
      { l: '\\( PA \\cdot PB = PT^2 = d^2 - R^2 \\)', rEn: 'External Tangent-Secant Power of a Point', rAr: 'قوة النقطة الخارجية (المماس والقاطع)' },
      { l: '\\( \\angle BAC = \\angle BDC \\) (same side of \\( BC \\))', rEn: 'Bowtie Concyclicity Criterion', rAr: 'شرط الرباعي الدائري (تساوي زاويتين على قاعدة واحدة)' },
      { l: '\\( AC \\cdot BD = AB \\cdot CD + AD \\cdot BC \\)', rEn: 'Ptolemy\'s Cyclic Quadrilateral Theorem', rAr: 'مبرهنة بطليموس للرباعي الدائري' },
      { l: 'Collinear feet of perpendiculars from \\( P \\in (ABC) \\)', rEn: 'Simson–Wallace Line Theorem', rAr: 'مبرهنة مستقيم سيمسون-والاس' }
    ],
    se: {
      q: 'From external point \\( P \\), a secant meets circle \\( \\omega \\) at \\( A \\) then \\( B \\) with \\( PA = 4 \\) and chord \\( AB = 5 \\), and tangent \\( PT \\) touches \\( \\omega \\). Spot the common contest mistake!',
      q_ar: 'من نقطة خارجية \\( P \\)، يقطع قاطع الدائرة \\( \\omega \\) في \\( A \\) ثم \\( B \\) بحيث \\( PA = 4 \\) وطول الوتر \\( AB = 5 \\)، ويمسها \\( PT \\). اكتشف الخطأ الشائع!',
      steps: [
        { en: 'Invoke the Tangent-Secant Power of a Point relation from \\( P \\).', ar: 'استدعاء علاقة قوة النقطة للمماس والقاطع من \\( P \\).' },
        { en: 'Multiply the exterior segment by the interior chord: \\( PT^2 = PA \\cdot AB = 4 \\times 5 = 20 \\).', ar: 'ضرب الجزء الخارجي في الوتر الداخلي: \\( PT^2 = PA \\cdot AB = 4 \\times 5 = 20 \\).' },
        { en: 'Conclude \\( PT = 2\\sqrt{5} \\).', ar: 'استنتاج أن \\( PT = 2\\sqrt{5} \\).' }
      ],
      errorStep: 2,
      reasons: [
        { en: 'Power of an external point multiplies \\( PA \\) by the WHOLE secant \\( PB = PA + AB = 4 + 5 = 9 \\) (NEVER \\( PA \\cdot AB \\)), so \\( PT^2 = 4 \\times 9 = 36 \\implies PT = 6 \\)!', ar: 'قوة النقطة الخارجية تضرب \\( PA \\) في طول القاطع الكامل \\( PB = PA + AB = 9 \\) لا في الوتر الداخلي، فيكون \\( PT^2 = 36 \\implies PT = 6 \\)!' },
        { en: 'Tangent-Secant requires adding PA and PB.', ar: 'مبرهنة المماس والقاطع تجمع القطعتين بدلاً من ضربهما.' },
        { en: 'Square root of 20 is 10.', ar: 'الجذر التربيعي للعدد 20 هو 10.' }
      ],
      h: 'Both segments in Power of a Point MUST start at the point \\( P \\): \\( PA \\) and \\( PB \\)!',
      h_ar: 'يجب أن تبدأ القطعتان معاً من النقطة \\( P \\) نفسها: \\( PA \\) و\\( PB \\)!',
      sol: 'With \\( PA = 4 \\) and \\( PB = 4 + 5 = 9 \\), \\( PT^2 = PA \\cdot PB = 36 \\implies PT = 6 \\).',
      sol_ar: 'بما أن \\( PA = 4 \\) و\\( PB = 9 \\)، فإن \\( PT^2 = 4 \\times 9 = 36 \\implies PT = 6 \\).'
    },
    ms: {
      q: 'Prove the Radical Center Theorem: for three circles \\( \\omega_1, \\omega_2, \\omega_3 \\) with non-collinear centers, their three pairwise radical axes concur.',
      q_ar: 'أثبت مبرهنة المركز الأساسي: المحاور الأساسية المثناة لثلاث دوائر مراكزها غير متسامتة تلتقي في نقطة واحدة.',
      parts: [
        {
          labelEn: 'Part (a) — Intersection of First Two Radical Axes',
          labelAr: 'الجزء (أ) — تقاطع المحورين الأول والثاني',
          rubric: [
            { code: 'M1', marks: 1, en: 'Since \\( \\ell_{12} \\perp O_1 O_2 \\) and \\( \\ell_{23} \\perp O_2 O_3 \\) with \\( O_1, O_2, O_3 \\) non-collinear, \\( \\ell_{12} \\) and \\( \\ell_{23} \\) are non-parallel and meet at a unique point \\( K \\).', ar: 'بما أن \\( \\ell_{12} \\perp O_1 O_2 \\) و\\( \\ell_{23} \\perp O_2 O_3 \\) والمراكز غير متسامتة، يتقاطع المستقيمان في نقطة وحيدة \\( K \\).' }
          ]
        },
        {
          labelEn: 'Part (b) — Transitivity of Power',
          labelAr: 'الجزء (ب) — تعدّي تساوي القوة',
          rubric: [
            { code: 'M1', marks: 1, en: 'On \\( \\ell_{12} \\), \\( \\operatorname{Pow}_{\\omega_1}(K) = \\operatorname{Pow}_{\\omega_2}(K) \\); on \\( \\ell_{23} \\), \\( \\operatorname{Pow}_{\\omega_2}(K) = \\operatorname{Pow}_{\\omega_3}(K) \\).', ar: 'وقوع \\( K \\) على \\( \\ell_{12} \\) و\\( \\ell_{23} \\) يعطي تساوي قوتها بالنسبة للدوائر الثلاث.' },
            { code: 'A1', marks: 1, en: 'By transitivity \\( \\operatorname{Pow}_{\\omega_1}(K) = \\operatorname{Pow}_{\\omega_3}(K) \\), so \\( K \\) lies on \\( \\ell_{13} \\)!', ar: 'بالتعدّي تتساوى قوة \\( K \\) بالنسبة لـ \\( \\omega_1 \\) و\\( \\omega_3 \\)، فتقع \\( K \\) على \\( \\ell_{13} \\)!' }
          ]
        }
      ],
      tip: 'In Olympiad geometry, proving 3 lines concur by interpreting them as pairwise radical axes of 3 circles (possibly point-circles of radius 0!) is one of the fastest weapons in IMO history.',
      tip_ar: 'في هندسة الأولمبياد، يُعدّ تحويل إثبات تلاقي 3 مستقيمات إلى محاور أساسية لثلاث دوائر من أقوى وأسرع براهين IMO.'
    },
    sb: [
      { lEn: 'Circle \\( \\omega \\) has radius \\( R = 7 \\) and point \\( P \\) has \\( OP = 25 \\). Compute \\( \\operatorname{Pow}_\\omega(P) = 25^2 - 7^2 = \\)', lAr: 'دائرة نصف قطرها \\( R = 7 \\) ونقطة \\( OP = 25 \\). احسب \\( \\operatorname{Pow}_\\omega(P) = 25^2 - 7^2 = \\)', a: '576', hEn: '625 − 49.', hAr: 'احسب 625 − 49.' },
      { lEn: 'Deduce the tangent length \\( PT = \\sqrt{576} = \\)', lAr: 'استنتج طول المماس \\( PT = \\sqrt{576} = \\)', a: '24', hEn: '7-24-25 triple!', hAr: 'ثلاثية فيثاغورس 7-24-25!' },
      { lEn: 'If secant \\( PAB \\) has \\( PA = 18 \\), find \\( PB = 576 / 18 = \\)', lAr: 'إذا كان القاطع \\( PAB \\) يحقق \\( PA = 18 \\)، فأوجد \\( PB = 576 / 18 = \\)', a: '32', hEn: 'Divide 576 by 18.', hAr: 'اقسم 576 على 18.' }
    ],
    num: {
      q: 'Brahmagupta\'s cyclic quadrilateral \\( ABCD \\) has sides \\( AB = 7,\\; BC = 15,\\; CD = 20,\\; DA = 24 \\) and diagonal \\( AC = 20 \\). Find the exact length of diagonal \\( BD \\).',
      q_ar: 'رباعي براهماغوبتا الدائري \\( ABCD \\) أطوال أضلاعه \\( AB = 7,\\; BC = 15,\\; CD = 20,\\; DA = 24 \\) وطول قطره \\( AC = 20 \\). أوجد الطول الدقيق للقطر \\( BD \\).',
      a: 25,
      h: 'Apply Ptolemy\'s Theorem: \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot DA \\).',
      h_ar: 'طبّق مبرهنة بطليموس: \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot DA \\).',
      sol: 'By Ptolemy\'s Theorem, \\( 20 \\cdot BD = 7(20) + 15(24) = 140 + 360 = 500 \\implies BD = 25 \\) (in fact \\( BD = 25 \\) is the diameter of the circumcircle since \\( 7^2 + 24^2 = 15^2 + 20^2 = 25^2 \\)!).',
      sol_ar: 'بمبرهنة بطليموس: \\( 20 \\cdot BD = 7(20) + 15(24) = 140 + 360 = 500 \\implies BD = 25 \\).'
    },
    ord: {
      prompt: 'Order the angle-chasing steps to prove the Miquel / Orthocenter cyclic quadrilateral \\( B F E C \\) when altitudes \\( BE, CF \\) are drawn in acute \\( \\triangle ABC \\):',
      prompt_ar: 'رتّب خطوات تتبع الزوايا لإثبات دائرية الرباعي \\( BFEC \\) المكون من قدمَي الارتفاعين \\( BE, CF \\) في المثلث الحاد \\( \\triangle ABC \\):',
      items: [
        { en: 'Identify the right angles \\( \\angle BFC = 90^\\circ \\) (since \\( CF \\perp AB \\)) and \\( \\angle BEC = 90^\\circ \\) (since \\( BE \\perp AC \\)).', ar: 'تحديد الزاويتين القائمتين \\( \\angle BFC = 90^\\circ \\) و\\( \\angle BEC = 90^\\circ \\).' },
        { en: 'Observe \\( F \\) and \\( E \\) lie on the same side of segment \\( BC \\) with \\( \\angle BFC = \\angle BEC = 90^\\circ \\).', ar: 'ملاحظة وقوع \\( F, E \\) في جهة واحدة من \\( BC \\) وتساوي الزاويتين المقابلتين له.' },
        { en: 'Conclude \\( B, F, E, C \\) lie on the circle with diameter \\( BC \\) (midpoint \\( M_{BC} \\)).', ar: 'استنتاج وقوع \\( B, F, E, C \\) على الدائرة التي قطرها \\( BC \\).' },
        { en: 'Deduce by Power of Vertex \\( A \\) that \\( AF \\cdot AB = AE \\cdot AC \\) (giving antiparallel \\( \\triangle AEF \\sim \\triangle ABC \\))!', ar: 'استنتاج \\( AF \\cdot AB = AE \\cdot AC \\) بقوة النقطة \\( A \\) وتشابه \\( \\triangle AEF \\sim \\triangle ABC \\)!' }
      ],
      ex: 'Spot equal 90° angles on diameter BC, invoke Bowtie concyclicity, then harvest Power of A.',
      ex_ar: 'حدد الزاويتين القائمتين على القطر BC، وأثبت الدائرية، ثم استثمر قوة الرأس A.'
    },
    cat: {
      catsEn: ['Interior Intersecting Chords', 'Exterior Tangent-Secant Power', 'Concyclic Angle Criterion'],
      catsAr: ['قوة النقطة الداخلية (الأوتار)', 'قوة النقطة الخارجية (مماس وقاطع)', 'شرط الزوايا للرباعي الدائري'],
      items: [
        { en: '\\( AP \\cdot PB = CP \\cdot PD \\) inside circle \\( \\omega \\)', ar: '\\( AP \\cdot PB = CP \\cdot PD \\) داخل الدائرة \\( \\omega \\)', cat: 0 },
        { en: '\\( \\angle ABC + \\angle ADC = 180^\\circ \\)', cat: 2 },
        { en: '\\( PT^2 = PA \\cdot PB \\) from external point \\( P \\)', ar: '\\( PT^2 = PA \\cdot PB \\) من نقطة خارجية \\( P \\)', cat: 1 },
        { en: 'Exterior angle at \\( C \\) equals interior opposite \\( \\angle BAD \\)', ar: 'الزاوية الخارجية عند \\( C \\) تساوي المقابلة الداخلية \\( \\angle BAD \\)', cat: 2 }
      ],
      ex: 'Chord products hold inside ω, tangent-secant products hold outside ω, and supplementary/bowtie angles test concyclicity.',
      ex_ar: 'جداء الأجزاء للوترين داخل الدائرة، والمماس والقاطع خارجها، وتكامل الزوايا المتقابلة يختبر الدائرية.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Prove Van Schooten\'s Theorem: for equilateral \\( \\triangle ABC \\) and \\( P \\) on minor arc \\( \\widehat{BC} \\), \\( PA = PB + PC \\).', ar: '<strong>الهدف:</strong> إثبات مبرهنة فان سخوتن: للمثلث المتطابق الأضلاع \\( \\triangle ABC \\) والنقطة \\( P \\) على القوس الأصغر \\( \\widehat{BC} \\) يتحقق \\( PA = PB + PC \\).' },
      { en: '<strong>Step 1 (Cyclic Quadrilateral):</strong> \\( ABPC \\) is cyclic with diagonals \\( PA \\) and \\( BC \\).', ar: '<strong>الخطوة 1 (الرباعي الدائري):</strong> الشكل \\( ABPC \\) رباعي دائري قطراه \\( PA \\) و\\( BC \\).' },
      { en: '<strong>Step 2 (Ptolemy\'s Theorem):</strong> \\( PA \\cdot BC = AB \\cdot PC + AC \\cdot PB \\); dividing by \\( s = AB = BC = AC \\) gives \\( PA = PB + PC \\) immediately!', ar: '<strong>الخطوة 2 (مبرهنة بطليموس):</strong> \\( PA \\cdot BC = AB \\cdot PC + AC \\cdot PB \\)، وبالقسمة على طول الضلع المتساوي ينتج \\( PA = PB + PC \\) فوراً!' }
    ]
  })
};

module.exports = { makeChapterIx, part1 };
