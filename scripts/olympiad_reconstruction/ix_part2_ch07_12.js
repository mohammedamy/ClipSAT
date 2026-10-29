'use strict';

const { makeChapterIx } = require('./ix_part1_ch01_06');

const part2 = {
  'ol-triangle-centers-trig': makeChapterIx({
    nameEn: 'Triangle Centers, Ceva, Menelaus & Stewart',
    nameAr: 'مراكز المثلث ومبرهنات تشيفا ومينيلاوس وستيوارت',
    shortEn: 'Ceva, Menelaus, Stewart & Euler Line',
    shortAr: 'تشيفا ومينيلاوس وستيوارت وخط أويلر',
    qc: {
      q: 'In \\( \\triangle ABC \\) with side lengths \\( a = 13,\\; b = 14,\\; c = 15 \\), what is the exact inradius \\( r \\)?',
      q_ar: 'في المثلث \\( \\triangle ABC \\) الذي أطوال أضلاعه \\( a = 13,\\; b = 14,\\; c = 15 \\)، ما نصف قطر الدائرة الداخلة \\( r \\)؟',
      o: ['\\( 4 \\)', '\\( 3.5 \\)', '\\( 5 \\)', '\\( 6 \\)'],
      a: 0,
      ex: 'Semiperimeter \\( s = \\frac{13 + 14 + 15}{2} = 21 \\); by Heron\'s formula \\( [ABC] = \\sqrt{21 \\cdot 8 \\cdot 7 \\cdot 6} = 84 \\), so \\( r = \\frac{[ABC]}{s} = \\frac{84}{21} = 4 \\).',
      ex_ar: 'نصف المحيط \\( s = 21 \\)، وبصيغة هيرون المساحة \\( [ABC] = 84 \\)، ومن ثم \\( r = \\frac{84}{21} = 4 \\).'
    },
    tf: [
      { en: 'Along the Euler line of any non-equilateral triangle, the centroid \\( G \\) lies between \\( O \\) and \\( H \\) with \\( OG : GH = 1 : 2 \\).', ar: 'على خط أويلر لأي مثلث غير متطابق الأضلاع، يقع مركز الثقل \\( G \\) بين \\( O \\) و\\( H \\) بنسبة \\( OG : GH = 1 : 2 \\).', a: true },
      { en: 'Euler\'s formula relates the circumradius \\( R \\), inradius \\( r \\), and distance \\( OI \\) by \\( OI^2 = R(R - 2r) \\).', ar: 'تربط صيغة أويلر بين \\( R \\) و\\( r \\) والمسافة \\( OI \\) بالعلاقة \\( OI^2 = R(R - 2r) \\).', a: true },
      { en: 'Ceva\'s Theorem applies whenever three lines intersect a triangle\'s sides in three collinear points.', ar: 'تنطبق مبرهنة تشيفا عندما يقطع مستقيم أضلاع المثلث في ثلاث نقاط على استقامة واحدة.', a: false }
    ],
    mt: [
      { l: '\\( \\frac{BD}{DC}\\cdot\\frac{CE}{EA}\\cdot\\frac{AF}{FB} = 1 \\)', rEn: 'Ceva\'s Concurrency Theorem', rAr: 'مبرهنة تشيفا لتلاقي المستقيمات' },
      { l: '\\( b^2 m + c^2 n = a(d^2 + mn) \\)', rEn: 'Stewart\'s Cevian Length Theorem', rAr: 'مبرهنة ستيوارت لطول المستقيم التشيفاني' },
      { l: '\\( OI^2 = R(R - 2r) \\implies R \\ge 2r \\)', rEn: 'Euler\'s Triangle Inequality & Distance', rAr: 'علاقة ومتباينة أويلر في المثلث' },
      { l: '\\( R_9 = \\frac{1}{2}R \\) (center \\( N \\) at midpoint of \\( OH \\))', rEn: 'Nine-Point Circle Radius & Center', rAr: 'نصف قطر ومركز دائرة النقاط التسع' }
    ],
    se: {
      q: 'A student uses Menelaus\'s Theorem on \\( \\triangle ABC \\) with transversal \\( D\\text{-}E\\text{-}F \\) where \\( D \\) is on \\( BC \\) extended (\\( BD = 10,\\; CD = 4 \\)), \\( E \\) is on segment \\( AC \\) (\\( CE = 3,\\; EA = 5 \\)), to find \\( AF : FB \\). Spot the error!',
      q_ar: 'يطبق طالب مبرهنة مينيلاوس على \\( \\triangle ABC \\) مع القاطع \\( D\\text{-}E\\text{-}F \\) حيث \\( D \\) على امتداد \\( BC \\) (\\( BD = 10,\\; CD = 4 \\)) و\\( E \\) على \\( AC \\) (\\( CE = 3,\\; EA = 5 \\)) لإيجاد \\( AF : FB \\). اكتشف الخطأ!',
      steps: [
        { en: 'Write Menelaus\'s unsigned ratio product: \\( \\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1 \\).', ar: 'كتابة جداء النسب غير الموجهة لمينيلاوس: \\( \\frac{BD}{DC} \\cdot \\frac{CE}{EA} \\cdot \\frac{AF}{FB} = 1 \\).' },
        { en: 'Substitute \\( BD = 10 \\) and \\( DC = BD - BC = 6 \\) instead of the given \\( CD = 4 \\): \\( \\frac{10}{6} \\cdot \\frac{3}{5} \\cdot \\frac{AF}{FB} = 1 \\).', ar: 'تعويض \\( DC = 6 \\) بدلاً من \\( CD = 4 \\) المعطاة: \\( \\frac{10}{6} \\cdot \\frac{3}{5} \\cdot \\frac{AF}{FB} = 1 \\).' },
        { en: 'Conclude \\( AF : FB = 1 : 1 \\).', ar: 'استنتاج أن \\( AF : FB = 1 : 1 \\).' }
      ],
      errorStep: 2,
      reasons: [
        { en: 'The denominator in Menelaus\'s first factor is literally \\( DC = CD = 4 \\) (from \\( D \\) back to vertex \\( C \\)), NOT \\( BC = 6 \\)! Using \\( \\frac{10}{4} \\cdot \\frac{3}{5} \\cdot \\frac{AF}{FB} = 1 \\) gives \\( \\frac{3}{2} \\cdot \\frac{AF}{FB} = 1 \\implies AF : FB = 2 : 3 \\).', ar: 'المقام في النسبة الأولى لمينيلاوس هو المسافة \\( DC = 4 \\) نفسها وليس \\( BC = 6 \\)! بالتعويض الصحيح \\( \\frac{10}{4}\\cdot\\frac{3}{5}\\cdot\\frac{AF}{FB}=1 \\) نجد \\( AF : FB = 2 : 3 \\).' },
        { en: 'Menelaus\'s product must equal 2 instead of 1.', ar: 'جداء نسب مينيلاوس يساوي 2 وليس 1.' },
        { en: 'Menelaus cannot be applied when a point lies on an extended side.', ar: 'لا تنطبق مبرهنة مينيلاوس إذا وقعت نقطة على امتداد ضلع.' }
      ],
      h: 'Trace the vertex-to-point-to-vertex cycle carefully: \\( B \\to D \\to C \\to E \\to A \\to F \\to B \\)!',
      h_ar: 'تتبع دورة الرؤوس ونقاط التقاطع بالترتيب: \\( B \\to D \\to C \\to E \\to A \\to F \\to B \\)!',
      sol: 'Following \\( B \\to D \\to C \\), \\( BD = 10 \\) and \\( DC = 4 \\), so \\( \\frac{10}{4} \\cdot \\frac{3}{5} \\cdot \\frac{AF}{FB} = 1 \\implies \\frac{AF}{FB} = \\frac{2}{3} \\).',
      sol_ar: 'بتتبع \\( B \\to D \\to C \\) لدينا \\( BD = 10 \\) و\\( DC = 4 \\)، ومنه \\( \\frac{AF}{FB} = \\frac{2}{3} \\).'
    },
    ms: {
      q: 'In \\( \\triangle ABC \\), cevians \\( AD, BE, CF \\) concur at \\( P \\) with \\( BD : DC = 2 : 3 \\) and \\( CE : EA = 3 : 4 \\). Find \\( AF : FB \\) and \\( AP : PD \\) via Mass Points.',
      q_ar: 'في \\( \\triangle ABC \\)، تتلاقى المستقيمات \\( AD, BE, CF \\) في \\( P \\) حيث \\( BD : DC = 2 : 3 \\) و\\( CE : EA = 3 : 4 \\). أوجد \\( AF : FB \\) و\\( AP : PD \\) بطريقة الكتل النقطية.',
      parts: [
        {
          labelEn: 'Part (a) — Balanced Vertex Masses',
          labelAr: 'الجزء (أ) — موازنة كتل الرؤوس',
          rubric: [
            { code: 'M1', marks: 1, en: 'Assign \\( m_C = 4 \\); balance \\( BC \\) at \\( D \\) (\\( 2 m_B = 3 m_C \\implies m_B = 6 \\)) and \\( CA \\) at \\( E \\) (\\( 3 m_C = 4 m_A \\implies m_A = 3 \\)).', ar: 'إسناد \\( m_C = 4 \\)، وموازنة \\( BC \\) لإيجاد \\( m_B = 6 \\) و\\( CA \\) لإيجاد \\( m_A = 3 \\).' },
            { code: 'A1', marks: 1, en: 'Deduce \\( AF : FB = m_B : m_A = 6 : 3 = 2 : 1 \\).', ar: 'استنتاج \\( AF : FB = m_B : m_A = 6 : 3 = 2 : 1 \\).' }
          ]
        },
        {
          labelEn: 'Part (b) — Internal Cevian Ratio AP : PD',
          labelAr: 'الجزء (ب) — نسبة تقسيم المستقيم التشيفاني AP : PD',
          rubric: [
            { code: 'M1', marks: 1, en: 'Compute total fulcrum mass at \\( D \\): \\( m_D = m_B + m_C = 6 + 4 = 10 \\).', ar: 'حساب كتلة نقطة الارتكاز \\( m_D = m_B + m_C = 10 \\).' },
            { code: 'A1', marks: 1, en: 'Balance segment \\( AD \\) at \\( P \\): \\( AP : PD = m_D : m_A = 10 : 3 \\).', ar: 'موازنة \\( AD \\) عند \\( P \\): \\( AP : PD = m_D : m_A = 10 : 3 \\).' }
          ]
        }
      ],
      tip: 'Mass Points gives BOTH boundary ratios (Ceva) and internal cevian ratios (Van Obel: \\( \\frac{AP}{PD} = \\frac{AE}{EC} + \\frac{AF}{FB} = \\frac{4}{3} + 2 = \\frac{10}{3} \\)) simultaneously!',
      tip_ar: 'تعطي طريقة الكتل النقطية نسب الأضلاع الخارجية ونسب التقسيم الداخلية في خطوة واحدة (وتطابق مبرهنة فان أوبل \\( \\frac{AP}{PD} = \\frac{4}{3} + 2 = \\frac{10}{3} \\))!'
    },
    sb: [
      { lEn: 'In \\( \\triangle ABC \\) with \\( AB = 13,\\; AC = 15,\\; BC = 14 \\) and cevian \\( AD \\) having \\( BD = 6,\\; DC = 8 \\), compute \\( b^2 m + c^2 n = 15^2(6) + 13^2(8) = \\)', lAr: 'في المثلث \\( AB=13, AC=15, BC=14 \\) مع \\( BD=6, DC=8 \\)، احسب \\( 15^2(6) + 13^2(8) = \\)', a: '2702', hEn: '1350 + 1352.', hAr: 'احسب 1350 + 1352.' },
      { lEn: 'Divide by \\( a = 14 \\) in Stewart\'s Theorem to obtain \\( d^2 + mn = 2702 / 14 = \\)', lAr: 'اقسم على \\( a = 14 \\) في مبرهنة ستيوارت لإيجاد \\( d^2 + mn = \\)', a: '193', hEn: '2702 ÷ 14.', hAr: 'اقسم 2702 على 14.' },
      { lEn: 'Subtract \\( mn = 6 \\times 8 = 48 \\) to find \\( AD^2 = d^2 = \\)', lAr: 'اطرح \\( mn = 48 \\) لإيجاد \\( AD^2 = \\)', a: '145', hEn: '193 − 48.', hAr: 'احسب 193 − 48.' }
    ],
    num: {
      q: 'A triangle has circumradius \\( R = 9 \\) and inradius \\( r = 4 \\). Using Euler\'s distance formula, find the exact distance \\( OI \\) between its circumcenter \\( O \\) and incenter \\( I \\).',
      q_ar: 'مثلث نصف قطر دائرته المحيطة \\( R = 9 \\) ونصف قطر دائرته الداخلة \\( r = 4 \\). باستخدام صيغة أويلر للمسافة، أوجد المسافة الدقيقة \\( OI \\) بين مركزَي الدائرتين.',
      a: 3,
      h: 'Recall Euler\'s Theorem: \\( OI^2 = R(R - 2r) \\).',
      h_ar: 'تذكر صيغة أويلر: \\( OI^2 = R(R - 2r) \\).',
      sol: 'By Euler\'s formula, \\( OI^2 = R(R - 2r) = 9(9 - 8) = 9 \\implies OI = 3 \\).',
      sol_ar: 'بتعويض صيغة أويلر: \\( OI^2 = 9(9 - 2 \\times 4) = 9 \\implies OI = 3 \\).'
    },
    ord: {
      prompt: 'Order the steps to prove Euler\'s Incenter-Excenter / Circumcircle Lemma ("Fact 5" / Mansion\'s Theorem): midpoint \\( M \\) of minor arc \\( \\widehat{BC} \\) is equidistant from \\( B, C, I \\):',
      prompt_ar: 'رتّب خطوات إثبات توطئة المنصف والمنتصف القوسي («توطئة القصر / Fact 5»): منتصف القوس الأصغر \\( M \\) متساوي البعد عن \\( B, C, I \\):',
      items: [
        { en: 'Let the internal angle bisector of \\( \\angle A \\) meet the circumcircle \\( (ABC) \\) again at \\( M \\) (midpoint of minor arc \\( \\widehat{BC} \\)), so \\( MB = MC \\).', ar: 'ليقطع منصف \\( \\angle A \\) الدائرة المحيطة في \\( M \\) منتصف القوس \\( \\widehat{BC} \\)، فيكون \\( MB = MC \\).' },
        { en: 'Compute inscribed angle \\( \\angle MBC = \\angle MAC = \\frac{1}{2}\\angle A \\), hence \\( \\angle MBI = \\angle MBC + \\angle CBI = \\frac{1}{2}\\angle A + \\frac{1}{2}\\angle B \\).', ar: 'حساب \\( \\angle MBI = \\angle MBC + \\angle CBI = \\frac{1}{2}\\angle A + \\frac{1}{2}\\angle B \\).' },
        { en: 'Apply the exterior angle theorem to \\( \\triangle ABI \\): \\( \\angle BIM = \\angle BAI + \\angle ABI = \\frac{1}{2}\\angle A + \\frac{1}{2}\\angle B \\).', ar: 'تطبيق الزاوية الخارجية في \\( \\triangle ABI \\): \\( \\angle BIM = \\frac{1}{2}\\angle A + \\frac{1}{2}\\angle B \\).' },
        { en: 'Since \\( \\angle MBI = \\angle BIM \\), \\( \\triangle MBI \\) is isosceles with \\( MB = MI = MC \\)!', ar: 'بما أن \\( \\angle MBI = \\angle BIM \\) فإن \\( MB = MI = MC \\)!' }
      ],
      ex: 'Incenter-Circumcircle Lemma ("Fact 5") is arguably the single most frequently used lemma in IMO and NSMO Olympiad geometry!',
      ex_ar: 'تُعدّ هذه التوطئة («توطئة القصر») الأداة الأكثر تكراراً في هندسة الأولمبياد الدولي IMO ونسما!'
    },
    cat: {
      catsEn: ['Concurrency Proof Tool', 'Collinearity Proof Tool', 'Segment / Distance Metric'],
      catsAr: ['أداة إثبات تلاقي المستقيمات', 'أداة إثبات الاستقامة الواحدة', 'حساب الأطوال والمسافات'],
      items: [
        { en: 'Trigonometric Ceva\'s Theorem', ar: 'الصيغة المثلثية لمبرهنة تشيفا', cat: 0 },
        { en: 'Menelaus\'s Transversal Theorem', ar: 'مبرهنة مينيلاوس للقاطع', cat: 1 },
        { en: 'Stewart\'s Theorem \\( dad + man = bmb + cnc \\)', ar: 'مبرهنة ستيوارت لطول التشيفاني', cat: 2 },
        { en: 'Euler\'s \\( OI^2 = R^2 - 2Rr \\)', ar: 'صيغة أويلر \\( OI^2 = R^2 - 2Rr \\)', cat: 2 }
      ],
      ex: 'Ceva proves concurrency of 3 cevians; Menelaus proves collinearity of 3 points; Stewart and Euler compute exact segment lengths.',
      ex_ar: 'تشيفا لتلاقي المستقيمات، ومينيلاوس للاستقامة الواحدة، وستيوارت وأويلر لحساب الأطوال الدقيقة.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Prove \\( [ABC] = \\frac{abc}{4R} \\) using the Extended Law of Sines.', ar: '<strong>الهدف:</strong> إثبات صيغة المساحة \\( [ABC] = \\frac{abc}{4R} \\) باستخدام قانون الجيوب الموسع.' },
      { en: '<strong>Step 1 (Trig Area):</strong> Write \\( [ABC] = \\frac{1}{2} ab \\sin C \\).', ar: '<strong>الخطوة 1 (مساحة المثلث):</strong> كتابة \\( [ABC] = \\frac{1}{2} ab \\sin C \\).' },
      { en: '<strong>Step 2 (Extended Sine Law):</strong> Substitute \\( \\sin C = \\frac{c}{2R} \\) to obtain \\( [ABC] = \\frac{1}{2} ab \\cdot \\frac{c}{2R} = \\frac{abc}{4R} \\)!', ar: '<strong>الخطوة 2 (قانون الجيوب الموسع):</strong> تعويض \\( \\sin C = \\frac{c}{2R} \\) يعطي \\( [ABC] = \\frac{abc}{4R} \\) مباشرة!' }
    ]
  }),

  'ol-invariants-extremal': makeChapterIx({
    nameEn: 'Invariants, Monovariants, Coloring & Games',
    nameAr: 'اللامتغيرات وشبه اللامتغيرات والتلوين والألعاب',
    shortEn: 'Invariants, Coloring, Extremal & Nim',
    shortAr: 'اللامتغيرات والتلوين ومبدأ التطرف ونيم',
    qc: {
      q: 'In three-heap Nim with heap sizes \\( (5, 9, 13) \\), what is the Nim-sum \\( 5 \\oplus 9 \\oplus 13 \\), and which player has a winning strategy?',
      q_ar: 'في لعبة نيم ذات الأكوام الثلاث \\( (5, 9, 13) \\)، ما قيمة المجموع الثنائي \\( 5 \\oplus 9 \\oplus 13 \\) ومن يملك استراتيجية الفوز؟',
      o: [
        'Nim-sum \\( = 1 \\neq 0 \\); the first player wins (remove \\( 1 \\) stone from any heap)',
        'Nim-sum \\( = 0 \\); the second player wins',
        'Nim-sum \\( = 9 \\); the first player must empty heap 9',
        'Nim-sum \\( = 27 \\); the second player wins'
      ],
      o_ar: [
        'مجموع نيم \\( = 1 \\neq 0 \\)؛ اللاعب الأول يفوز (بإزالة حجر واحد من أي كومة)',
        'مجموع نيم \\( = 0 \\)؛ اللاعب الثاني يفوز',
        'مجموع نيم \\( = 9 \\)؛ يجب إفراغ الكومة 9',
        'مجموع نيم \\( = 27 \\)؛ اللاعب الثاني يفوز'
      ],
      a: 0,
      ex: 'In binary: \\( 5 = 0101_2,\\; 9 = 1001_2,\\; 13 = 1101_2 \\). XORing bit-by-bit gives \\( 0001_2 = 1 \\neq 0 \\) (an N-position); reducing \\( 5 \\to 4 \\) or \\( 9 \\to 8 \\) or \\( 13 \\to 12 \\) leaves Nim-sum \\( 0 \\)!',
      ex_ar: 'بالتمثيل الثنائي: \\( 0101_2 \\oplus 1001_2 \\oplus 1101_2 = 0001_2 = 1 \\neq 0 \\)، فالفوز للأول بإنقاص حجر واحد من أي كومة!'
    },
    tf: [
      { en: 'An integer-valued monovariant that is bounded below by \\( 0 \\) and strictly decreases by at least \\( 1 \\) on every step guarantees finite termination.', ar: 'شبه اللامتغير الصحيح المحدود من الأسفل بـ \\( 0 \\) والمتناقص فعلياً بمقدار \\( 1 \\) على الأقل في كل خطوة يضمن توقف العملية في عدد منتهٍ من الخطوات.', a: true },
      { en: 'A \\( 10 \\times 10 \\) board cannot be tiled by \\( 25 \\) straight \\( 1 \\times 4 \\) tetrominoes, proven by cyclic \\( 4 \\)-coloring or \\( 2 \\times 2 \\) block coloring.', ar: 'لا يمكن تبليط رقعة \\( 10 \\times 10 \\) باستخدام \\( 25 \\) قطعة مستقيمة من مقاس \\( 1 \\times 4 \\)، ويثبت ذلك بالتلوين الرباعي.', a: true },
      { en: 'In Sprague-Grundy theory, a position with Grundy value \\( G(P) = 0 \\) is a winning position for the player about to move.', ar: 'في نظرية سبراغ-غروندي، الموضع الذي قيمته \\( G(P) = 0 \\) هو موضع رابح للاعب الذي عليه الدور.', a: false }
    ],
    mt: [
      { l: '\\( I(S\') = I(S) \\) while \\( I(S_{\\text{target}}) \\neq I(S_0) \\)', rEn: 'Invariant Impossibility Proof', rAr: 'برهان الاستحالة باللامتغير' },
      { l: '\\( M(S_{k+1}) < M(S_k) \\in \\mathbb{Z}_{\\ge 0} \\)', rEn: 'Monovariant Termination Proof', rAr: 'برهان التوقف بشبه اللامتغير' },
      { l: 'Pick configuration minimizing perimeter / distance', rEn: 'Extremal Principle', rAr: 'مبدأ التطرف (اختيار الحالة الحدية)' },
      { l: '\\( n_1 \\oplus n_2 \\oplus \\dots \\oplus n_k = 0 \\)', rEn: 'Bouton\'s P-position Criterion in Nim', rAr: 'شرط بوتون للموضع الخاسر P-position في نيم' }
    ],
    se: {
      q: 'The numbers \\( 1, 2, \\dots, 2026 \\) are on a board; each move replaces \\( x, y \\) by \\( |x - y| \\). A student argues \\( 0 \\) can remain at the end. Find the error!',
      q_ar: 'الأعداد \\( 1, 2, \\dots, 2026 \\) مكتوبة على سبورة؛ في كل خطوة نستبدل \\( x, y \\) بـ \\( |x - y| \\). يدّعي طالب إمكانية بقاء \\( 0 \\) في النهاية. أين الخطأ؟',
      steps: [
        { en: 'Note that \\( |x - y| \\equiv x + y \\pmod 2 \\), so the parity of the sum of all numbers on the board is invariant.', ar: 'ملاحظة أن \\( |x - y| \\equiv x + y \\pmod 2 \\)، فزوجية مجموع الأعداد لامتغير.' },
        { en: 'Compute the initial sum \\( S = \\frac{2026 \\times 2027}{2} = 1013 \\times 2027 \\) and claim \\( S \\) is even because \\( 2026 \\) is even.', ar: 'حساب المجموع الابتدائي \\( S = 1013 \\times 2027 \\) والادعاء أنه زوجي لأن \\( 2026 \\) زوجي.' },
        { en: 'Conclude the final number is even, so \\( 0 \\) is achievable.', ar: 'استنتاج أن العدد النهائي زوجي وبالتالي يمكن الوصول إلى \\( 0 \\).' }
      ],
      errorStep: 2,
      reasons: [
        { en: 'Both \\( 1013 \\) and \\( 2027 \\) are ODD, so their product \\( S = 1013 \\times 2027 \\) is ODD! By parity invariance, the final remaining number must be odd, so \\( 0 \\) is impossible!', ar: 'كل من \\( 1013 \\) و\\( 2027 \\) عدد فردي، فحاصل ضربهما \\( S \\) فردي! وبثبات الزوجية يجب أن يكون العدد الأخير فردياً فيستحيل بقاء \\( 0 \\)!' },
        { en: '|x − y| does not have the same parity as x + y.', ar: '|x − y| لا يطابق x + y بترديد 2.' },
        { en: 'The process does not terminate after 2025 moves.', ar: 'العملية لا تنتهي بعد 2025 خطوة.' }
      ],
      h: 'Check \\( 2026 \\pmod 4 \\): when \\( n \\equiv 2 \\pmod 4 \\), \\( n/2 \\) is odd and \\( n + 1 \\) is odd!',
      h_ar: 'افحص \\( 2026 \\pmod 4 \\): عندما \\( n \\equiv 2 \\pmod 4 \\) يكون كل من \\( n/2 \\) و\\( n+1 \\) فردياً!',
      sol: 'Since \\( 2026 \\equiv 2 \\pmod 4 \\), \\( S = 1013 \\times 2027 \\equiv 1 \\pmod 2 \\). Every move preserves sum parity, so the final number is odd (never \\( 0 \\)).',
      sol_ar: 'المجموع الابتدائي فردي وزوجية المجموع محفوظة، لذا يستحيل أن يكون العدد المتبقي زوجياً أو صفراً.'
    },
    ms: {
      q: 'Prove Sylvester-Gallai\'s Theorem via Kelly\'s Extremal Proof: given a finite non-collinear set \\( \\mathcal{P} \\) in the plane, some line through \\( \\mathcal{P} \\) contains exactly two points of \\( \\mathcal{P} \\).',
      q_ar: 'أثبت مبرهنة سيلفستر-غالاي ببرهان كيلي التطرفي: لأي مجموعة منتهية \\( \\mathcal{P} \\) ليست على استقامة واحدة، يوجد مستقيم يمر بنقطتين فقط من \\( \\mathcal{P} \\).',
      parts: [
        {
          labelEn: 'Part (a) — Extremal Pair Selection',
          labelAr: 'الجزء (أ) — اختيار الزوج الحدي الأدنى',
          rubric: [
            { code: 'M1', marks: 1, en: 'Assume for contradiction every line through \\( \\ge 2 \\) points of \\( \\mathcal{P} \\) has \\( \\ge 3 \\) points; consider all pairs \\( (P, \\ell) \\) with \\( P \\notin \\ell \\).', ar: 'فرض العكس (كل مستقيم يحوي 3 نقاط على الأقل) ودراسة الأزواج \\( (P, \\ell) \\) حيث \\( P \\notin \\ell \\).' },
            { code: 'A1', marks: 1, en: 'By finiteness, choose \\( (P, \\ell) \\) minimizing the positive perpendicular distance \\( d(P, \\ell) > 0 \\).', ar: 'اختيار الزوج \\( (P, \\ell) \\) ذي المسافة العمودية الصغرى \\( d(P, \\ell) > 0 \\).' }
          ]
        },
        {
          labelEn: 'Part (b) — Strict Distance Reduction Contradiction',
          labelAr: 'الجزء (ب) — تناقض تقليص المسافة',
          rubric: [
            { code: 'M1', marks: 1, en: 'Drop altitude \\( Q \\) from \\( P \\) to \\( \\ell \\); by pigeonhole among \\( \\ge 3 \\) points on \\( \\ell \\), two points \\( B, C \\) lie on the same closed ray from \\( Q \\) (with \\( B \\) closer to \\( Q \\) than \\( C \\)).', ar: 'إسقاط العمود \\( PQ \\) على \\( \\ell \\)؛ من بين 3 نقاط تقع نقطتان \\( B, C \\) في نفس الجهة من \\( Q \\).' },
            { code: 'A1', marks: 1, en: 'Show \\( d(B, PC) < d(P, \\ell) \\) in right triangle geometry, contradicting minimality of \\( (P, \\ell) \\)!', ar: 'إثبات أن \\( d(B, PC) < d(P, \\ell) \\) مما يناقض أصغرية المسافة المختارة!' }
          ]
        }
      ],
      tip: 'In Extremal Principle proofs, clearly justify WHY the minimum exists (finite non-empty set of positive real numbers)!',
      tip_ar: 'في براهين مبدأ التطرف، احرص دائماً على تبرير سبب وجود القيمة الصغرى (مجموعة منتهية غير خالية)!'
    },
    sb: [
      { lEn: 'Remove two opposite corners \\( (1,1) \\) and \\( (8,8) \\) from an \\( 8 \\times 8 \\) chessboard. Total remaining squares \\( = \\)', lAr: 'احذف ركنين متقابلين من رقعة \\( 8 \\times 8 \\). عدد المربعات المتبقية \\( = \\)', a: '62', hEn: '64 − 2.', hAr: 'احسب 64 − 2.' },
      { lEn: 'Since \\( 1+1=2 \\) and \\( 8+8=16 \\) are both even, both removed corners share the same color! Remaining squares of that color \\( = \\)', lAr: 'كلا الركنين المحذوفين من نفس اللون! عدد المربعات المتبقية من هذا اللون \\( = \\)', a: '30', hEn: '32 − 2.', hAr: 'احسب 32 − 2.' },
      { lEn: 'Since each \\( 1 \\times 2 \\) domino covers \\( 1 \\) white and \\( 1 \\) black square, at most how many non-overlapping dominoes can be placed? \\( = \\)', lAr: 'ما أقصى عدد من قطع الدومينو \\( 1 \\times 2 \\) غير المتداخلة التي يمكن وضعها؟ \\( = \\)', a: '30', hEn: 'Limited by the scarcer color (30 < 31).', hAr: 'محدود باللون الأقل عدداً (30 < 31).' }
    ],
    num: {
      q: 'Start with the four numbers \\( \\{1, 2, 3, 4\\} \\). At each step, replace any two numbers \\( a, b \\) by \\( ab + a + b \\) until one number remains. What is that final number?',
      q_ar: 'نبدأ بالأعداد الأربعة \\( \\{1, 2, 3, 4\\} \\)، وفي كل خطوة نستبدل أي عددين \\( a, b \\) بالعدد \\( ab + a + b \\) حتى يتبقى عدد واحد فقط. ما قيمة هذا العدد النهائي؟',
      a: 119,
      h: 'Notice \\( ab + a + b + 1 = (a + 1)(b + 1) \\), so \\( \\prod (x_i + 1) \\) is a strict invariant!',
      h_ar: 'لاحظ أن \\( ab + a + b + 1 = (a + 1)(b + 1) \\)، فالجداء \\( \\prod (x_i + 1) \\) لامتغير ثابت!',
      sol: 'Since \\( (ab + a + b) + 1 = (a + 1)(b + 1) \\), the product \\( \\prod (x_i + 1) = (1+1)(2+1)(3+1)(4+1) = 2 \\cdot 3 \\cdot 4 \\cdot 5 = 120 \\) is invariant. When one number \\( X \\) remains, \\( X + 1 = 120 \\implies X = 119 \\).',
      sol_ar: 'الجداء \\( \\prod (x_i + 1) = 2 \\times 3 \\times 4 \\times 5 = 120 \\) لامتغير، وعند بقاء عدد واحد \\( X \\) يكون \\( X + 1 = 120 \\implies X = 119 \\).'
    },
    ord: {
      prompt: 'Order the steps to construct a Symmetry Strategy win for Player 1 placing identical coins of radius \\( r \\) on a circular table of radius \\( R \\ge r \\):',
      prompt_ar: 'رتّب خطوات بناء استراتيجية التناظر المركزي لفوز اللاعب الأول بوضع قطع نقدية متماثلة نصف قطرها \\( r \\) على طاولة دائرية نصف قطرها \\( R \\ge r \\):',
      items: [
        { en: 'Player 1 places the very first coin dead-center at the origin \\( O \\) of the circular table.', ar: 'يضع اللاعب الأول القطعة الأولى في مركز الطاولة \\( O \\) تماماً.' },
        { en: 'Maintain the invariant that after every Player 1 move, the configuration of placed coins is symmetric under \\( 180^\\circ \\) point reflection through \\( O \\).', ar: 'الحفاظ على لامتغير التناظر النقطي بزاوية \\( 180^\\circ \\) حول المركز \\( O \\) بعد كل نقلة للأول.' },
        { en: 'Whenever Player 2 legally places a coin centered at \\( P \\), its reflection \\( P\' = -P \\) lies on the table and cannot overlap \\( P \\) (since \\( O \\) is already covered) or any prior coin.', ar: 'كلما وضع الثاني قطعة عند \\( P \\)، يكون انعكاسها \\( -P \\) متاحاً وخالياً من أي تداخل.' },
        { en: 'Since the table area is finite, Player 2 eventually runs out of legal moves first, so Player 1 wins!', ar: 'لمحدودية المساحة ينفد مكان اللعب من الثاني أولاً فيفوز اللاعب الأول حتماً!' }
      ],
      ex: 'Symmetry stealing + geometric invariance guarantees a constructive win without enumerating game trees.',
      ex_ar: 'استراتيجية التناظر المركزي تضمن الفوز البنائي دون الحاجة لتتبع شجرة احتمالات هائلة.'
    },
    cat: {
      catsEn: ['Exact Invariant', 'Strict Monovariant', 'Board Coloring Obstruction'],
      catsAr: ['لامتغير تام', 'شبه لامتغير رتيب', 'استحالة بتلوين الرقعة'],
      items: [
        { en: 'Product \\( \\prod (x_i + 1) \\) under \\( (a, b) \\mapsto ab + a + b \\)', ar: 'الجداء \\( \\prod (x_i + 1) \\) تحت التحويل \\( ab + a + b \\)', cat: 0 },
        { en: 'Number of inversions decreasing under adjacent sorting swaps', ar: 'تناقص عدد الانقلابات عند تبديل العناصر المتجاورة', cat: 1 },
        { en: 'Cyclic \\( 1, \\omega, \\omega^2 \\) weights blocking \\( 1 \\times 3 \\) trimino tiling', ar: 'أوزان الجذور التكعيبية لإثبات استحالة التبليط بقطع \\( 1 \\times 3 \\)', cat: 2 },
        { en: 'Sum of squares \\( \\sum x_i^2 \\) strictly increasing when \\( (a, b) \\mapsto (a-1, b+1) \\) for \\( b \\ge a \\)', ar: 'تزايد \\( \\sum x_i^2 \\) عند إبعاد عددين عن بعضهما', cat: 1 }
      ],
      ex: 'Invariants prove unreachability, monovariants prove termination, and modular/complex board weights obstruct tilings.',
      ex_ar: 'اللامتغيرات تثبت عدم قابلية الوصول، وشبه اللامتغيرات تثبت التوقف، وأوزان التلوين تمنع التبليط المستحيل.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Prove every Bubble Sort on a permutation of \\( \\{1, \\dots, n\\} \\) terminates in at most \\( \\binom{n}{2} \\) swaps.', ar: '<strong>الهدف:</strong> إثبات توقف الترتيب بالتبديل المتجاور في ما لا يزيد عن \\( \\binom{n}{2} \\) خطوة.' },
      { en: '<strong>Step 1 (Define Monovariant):</strong> Let \\( I(\\pi) \\) be the number of inversions \\( (i < j,\\; \\pi_i > \\pi_j) \\), bounded by \\( 0 \\le I(\\pi) \\le \\binom{n}{2} \\).', ar: '<strong>الخطوة 1 (تعريف شبه اللامتغير):</strong> عدد الانقلابات \\( I(\\pi) \\) محصور بين \\( 0 \\) و\\( \\binom{n}{2} \\).' },
      { en: '<strong>Step 2 (Unit Drop):</strong> Swapping adjacent out-of-order elements decreases \\( I(\\pi) \\) by exactly \\( 1 \\), forcing termination in \\( \\le \\binom{n}{2} \\) steps!', ar: '<strong>الخطوة 2 (النقصان بمقدار 1):</strong> كل تبديل متجاور ينقص \\( I(\\pi) \\) بمقدار \\( 1 \\) بالضبط، فيتوقف حتماً خلال \\( \\le \\binom{n}{2} \\) خطوة!' }
    ]
  }),

  'ol-nsmo-stage1-2': makeChapterIx({
    nameEn: 'NSMO of KSA: Screening & Regional Qualifiers',
    nameAr: 'أولمبياد «نسما» السعودي (NSMO): الفرز والتصفيات المناطقية',
    shortEn: 'NSMO KSA Stage 1 & Stage 2',
    shortAr: 'نسما السعودية — المرحلتان 1 و2',
    qc: {
      q: '[NSMO Stage 2 Style] What is the remainder when \\( 2^{2026} + 3^{2026} \\) is divided by \\( 5 \\)?',
      q_ar: '[نمط المرحلة الثانية — نسما] ما باقي قسمة العدد \\( 2^{2026} + 3^{2026} \\) على \\( 5 \\)؟',
      o: ['\\( 3 \\)', '\\( 0 \\)', '\\( 1 \\)', '\\( 2 \\)'],
      a: 0,
      ex: 'By Fermat\'s Little Theorem mod \\( 5 \\), \\( 2^4 \\equiv 3^4 \\equiv 1 \\pmod 5 \\). Since \\( 2026 \\equiv 2 \\pmod 4 \\), \\( 2^{2026} + 3^{2026} \\equiv 2^2 + 3^2 = 4 + 9 = 13 \\equiv 3 \\pmod 5 \\).',
      ex_ar: 'بترديد \\( 5 \\): \\( 2^4 \\equiv 3^4 \\equiv 1 \\)، وبما أن \\( 2026 \\equiv 2 \\pmod 4 \\) فإن المجموع يطابق \\( 2^2 + 3^2 = 13 \\equiv 3 \\pmod 5 \\).'
    },
    tf: [
      { en: 'NSMO of KSA (أولمبياد العلوم والرياضيات الوطني «نسما») is organized by Mawhiba and the Saudi Ministry of Education as the official national pathway toward international math olympiads.', ar: 'يُنظَّم أولمبياد العلوم والرياضيات الوطني «نسما» بشراكة بين مؤسسة «موهبة» ووزارة التعليم السعودية بصفته المسار الوطني الرسمي نحو الأولمبيادات الدولية.', a: true },
      { en: 'Telescoping \\( \\sum_{k=1}^n \\frac{1}{k(k+1)} = \\sum_{k=1}^n \\left(\\frac{1}{k} - \\frac{1}{k+1}\\right) \\) simplifies directly to \\( \\frac{n}{n+1} \\).', ar: 'يتبسط المجموع التلسكوبي \\( \\sum_{k=1}^n \\frac{1}{k(k+1)} \\) مباشرة إلى \\( \\frac{n}{n+1} \\).', a: true },
      { en: 'In NSMO Stage 1 & Stage 2 qualifiers, students are expected to use programmable graphing calculators to approximate decimal answers.', ar: 'يُسمح في مرحلتَي الفرز والتصفيات لأولمبياد «نسما» باستخدام الحاسبات البيانية القابلة للبرمجة لتقريب الإجابات.', a: false }
    ],
    mt: [
      { l: '\\( \\frac{1}{\\sqrt{k} + \\sqrt{k+1}} = \\sqrt{k+1} - \\sqrt{k} \\)', rEn: 'Conjugate Radical Telescoping (NSMO Algebra)', rAr: 'التلسكوب بإنطاق المقام الجذري (جبر نسما)' },
      { l: '\\( \\tau(n) = \\prod (e_i + 1) \\) is odd \\( \\iff n = m^2 \\)', rEn: 'Divisor Parity / Light-Bulb Criterion', rAr: 'فردية عدد القواسم تميز المربعات الكاملة' },
      { l: '\\( \\operatorname{lcm}(a, b) \\cdot \\gcd(a, b) = ab \\)', rEn: 'Prime-Exponent Min/Max Duality', rAr: 'ثنائية القاسم المشترك الأكبر والمضاعف الأصغر' },
      { l: 'Area scaling of medial triangle \\( = \\frac{1}{4}[ABC] \\)', rEn: 'Homothety Ratio \\( k = 1/2 \\implies k^2 = 1/4 \\)', rAr: 'نسبة التحاكي \\( 1/2 \\) تعطي ربع المساحة' }
    ],
    se: {
      q: '[NSMO Stage 2 Trap] Count how many positive integers \\( n \\le 200 \\) are divisible by \\( 4 \\) or \\( 6 \\), using Inclusion-Exclusion. Spot the error!',
      q_ar: '[فخ شائع في نسما] عدّ الأعداد الصحيحة الموجبة \\( n \\le 200 \\) القابلة للقسمة على \\( 4 \\) أو \\( 6 \\) بمبدأ التضمين والإقصاء. اكتشف الخطأ!',
      steps: [
        { en: 'Count multiples of \\( 4 \\): \\( \\lfloor 200/4 \\rfloor = 50 \\), and multiples of \\( 6 \\): \\( \\lfloor 200/6 \\rfloor = 33 \\).', ar: 'مضاعفات \\( 4 \\) عددها \\( 50 \\)، ومضاعفات \\( 6 \\) عددها \\( 33 \\).' },
        { en: 'Subtract numbers divisible by both \\( 4 \\) and \\( 6 \\) using \\( 4 \\times 6 = 24 \\): \\( \\lfloor 200/24 \\rfloor = 8 \\).', ar: 'طرح المشتركات بالقسمة على \\( 4 \\times 6 = 24 \\): \\( \\lfloor 200/24 \\rfloor = 8 \\).' },
        { en: 'Conclude the count is \\( 50 + 33 - 8 = 75 \\).', ar: 'استنتاج أن العدد يساوي \\( 50 + 33 - 8 = 75 \\).' }
      ],
      errorStep: 2,
      reasons: [
        { en: 'An integer is divisible by both \\( 4 \\) and \\( 6 \\) iff it is divisible by \\( \\operatorname{lcm}(4, 6) = 12 \\) (NOT \\( 4 \\times 6 = 24 \\))! Subtracting \\( \\lfloor 200/12 \\rfloor = 16 \\) gives \\( 50 + 33 - 16 = 67 \\).', ar: 'القابلية للقسمة على \\( 4 \\) و\\( 6 \\) معاً تكافئ القسمة على \\( \\operatorname{lcm}(4, 6) = 12 \\) لا على \\( 24 \\)! بطرح \\( \\lfloor 200/12 \\rfloor = 16 \\) نجد \\( 67 \\).' },
        { en: 'Inclusion-Exclusion adds the intersection instead of subtracting it.', ar: 'مبدأ التضمين والإقصاء يجمع التقاطع بدلاً من طرحه.' },
        { en: '200 divided by 6 has floor 34, not 33.', ar: 'خارج قسمة 200 على 6 يساوي 34 وليس 33.' }
      ],
      h: 'Is \\( 12 \\) counted in both multiples of \\( 4 \\) and multiples of \\( 6 \\)? Was \\( 12 \\) subtracted when dividing by \\( 24 \\)?',
      h_ar: 'هل العدد \\( 12 \\) محسوب في المجموعتين؟ وهل حُذف عند القسمة على \\( 24 \\)؟',
      sol: 'Always intersect divisibility sets via \\( \\operatorname{lcm}(a, b) \\): \\( 50 + 33 - \\lfloor 200/12 \\rfloor = 83 - 16 = 67 \\).',
      sol_ar: 'تقاطع مجموعتَي المضاعفات يحسب دائماً بالمضاعف المشترك الأصغر \\( \\operatorname{lcm}(4,6)=12 \\): \\( 50 + 33 - 16 = 67 \\).'
    },
    ms: {
      q: '[NSMO Stage 2 Written Short Proof] Find all ordered pairs of positive integers \\( (x, y) \\) satisfying \\( x^2 - y^2 = 45 \\).',
      q_ar: '[برهان قصير — المرحلة الثانية لنسما] أوجد جميع الأزواج المرتبة الصحيحة الموجبة \\( (x, y) \\) التي تحقق \\( x^2 - y^2 = 45 \\).',
      parts: [
        {
          labelEn: 'Part (a) — Factoring & Parity Check',
          labelAr: 'الجزء (أ) — التحليل وفحص الزوجية',
          rubric: [
            { code: 'M1', marks: 1, en: 'Factor \\( (x - y)(x + y) = 45 \\) with \\( 0 < x - y < x + y \\) since \\( x, y \\in \\mathbb{Z}^+ \\).', ar: 'تحليل \\( (x - y)(x + y) = 45 \\) مع \\( 0 < x - y < x + y \\).' },
            { code: 'A1', marks: 1, en: 'Note \\( (x + y) + (x - y) = 2x \\) is even; since \\( 45 \\) is odd, every factor pair \\( (d_1, d_2) \\) of \\( 45 \\) has two odd factors (automatically same parity!).', ar: 'بما أن \\( 45 \\) فردي فجميع أزواج قواسمه فردية من نفس الزوجية.' }
          ]
        },
        {
          labelEn: 'Part (b) — Exhaustive Divisor Enumeration',
          labelAr: 'الجزء (ب) — حصر جميع أزواج القواسم',
          rubric: [
            { code: 'M1', marks: 1, en: 'List all \\( 3 \\) ordered factor pairs \\( (x-y, x+y) \\in \\{(1, 45), (3, 15), (5, 9)\\} \\).', ar: 'حصر الحالات الثلاث \\( (x-y, x+y) \\in \\{(1, 45), (3, 15), (5, 9)\\} \\).' },
            { code: 'A1', marks: 1, en: 'Obtain all \\( 3 \\) solutions: \\( (23, 22),\\; (9, 6),\\; (7, 2) \\).', ar: 'استخراج الحلول الثلاثة كاملة: \\( (23, 22),\\; (9, 6),\\; (7, 2) \\).' }
          ]
        }
      ],
      tip: 'For \\( x^2 - y^2 = N \\), when \\( N \\equiv 2 \\pmod 4 \\) there are ZERO integer solutions because the factors cannot share parity!',
      tip_ar: 'في معادلة فرق المربعين \\( x^2 - y^2 = N \\)، إذا كان \\( N \\equiv 2 \\pmod 4 \\) فلا يوجد أي حل صحيح لاستحالة تطابق الزوجية!'
    },
    sb: [
      { lEn: 'Evaluate the NSMO telescoping sum \\( S = \\sum_{k=1}^{99} \\frac{1}{\\sqrt{k} + \\sqrt{k+1}} \\). Rationalizing gives \\( \\sqrt{k+1} - \\sqrt{k} \\); at \\( k = 1 \\), \\( \\sqrt{1} = \\)', lAr: 'في المجموع التلسكوبي \\( \\sum_{k=1}^{99} \\frac{1}{\\sqrt{k}+\\sqrt{k+1}} = \\sum (\\sqrt{k+1}-\\sqrt{k}) \\)، قيمة الحد الأدنى \\( \\sqrt{1} = \\)', a: '1', hEn: 'Square root of 1.', hAr: 'الجذر التربيعي لـ 1.' },
      { lEn: 'At the upper index \\( k = 99 \\), the surviving leading radical is \\( \\sqrt{99 + 1} = \\)', lAr: 'عند \\( k = 99 \\)، قيمة الجذر الأكبر المتبقي \\( \\sqrt{100} = \\)', a: '10', hEn: 'Square root of 100.', hAr: 'الجذر التربيعي لـ 100.' },
      { lEn: 'After all interior radicals cancel in pairs, \\( S = 10 - 1 = \\)', lAr: 'بعد اختصار جميع الحدود الوسطى، قيمة المجموع \\( S = \\)', a: '9', hEn: '10 minus 1.', hAr: 'احسب 10 − 1.' }
    ],
    num: {
      q: '[NSMO Regional Geometry] Regular hexagon \\( ABCDEF \\) has total area \\( 120 \\). Inscribed equilateral triangles \\( \\triangle ACE \\) and \\( \\triangle BDF \\) overlap in a central regular hexagon. What is the area of that central overlap hexagon?',
      q_ar: '[هندسة التصفيات المناطقية — نسما] سداسي منتظم \\( ABCDEF \\) مساحته الكلية \\( 120 \\). يتقاطع المثلثان المتطابقا الأضلاع \\( \\triangle ACE \\) و\\( \\triangle BDF \\) في سداسي منتظم مركزي. ما مساحة هذا السداسي المركزي؟',
      a: 40,
      h: 'Tile \\( ABCDEF \\) into congruent small equilateral triangles (a Star of David / hexagram grid) or compare circumradii (scale factor \\( 1/\\sqrt{3} \\))!',
      h_ar: 'قسّم السداسي إلى مثلثات صغيرة متطابقة أو لاحظ أن معامل التشابه بين السداسي الداخلي والخارجي هو \\( 1/\\sqrt{3} \\)!',
      sol: 'Chord \\( AC \\) has distance \\( R/2 \\) from the center, which is the apothem of the inner hexagon, so the inner hexagon has circumradius \\( \\frac{R/2}{\\cos 30^\\circ} = \\frac{R}{\\sqrt{3}} \\). By area scaling \\( (1/\\sqrt{3})^2 = 1/3 \\), the overlap area is \\( \\frac{120}{3} = 40 \\).',
      sol_ar: 'نصف قطر السداسي الداخلي يساوي \\( R/\\sqrt{3} \\)، فمساحته تساوي \\( (1/\\sqrt{3})^2 = \\frac{1}{3} \\) من مساحة السداسي الأصلي، أي \\( 120 / 3 = 40 \\).'
    },
    ord: {
      prompt: 'Order the official progression stages of Saudi Arabia\'s NSMO (أولمبياد العلوم والرياضيات الوطني «نسما») & Mawhiba Olympiad pathway:',
      prompt_ar: 'رتّب المراحل الرسمية للتأهل في أولمبياد «نسما» الوطني ومسار «موهبة» للأولمبيادات الدولية:',
      items: [
        { en: 'Stage 1 — Kingdom-Wide Diagnostic & Screening Test (اختبار الفرز الأولي across Saudi education directorates).', ar: 'المرحلة الأولى — اختبار الفرز الأولي الشامل على مستوى إدارات التعليم في المملكة.' },
        { en: 'Stage 2 — Intensive Mawhiba Zone Training & Regional Qualifier Exam (التصفيات المناطقية).', ar: 'المرحلة الثانية — التدريب المكثف واختبار التصفيات المناطقية.' },
        { en: 'Stage 3 — NSMO National Finals in Riyadh (النهائيات الوطنية بالرياض — multi-hour proof paper for Gold/Silver/Bronze medals).', ar: 'المرحلة الثالثة — النهائيات الوطنية بالرياض (اختبار براهين مطوّل للميداليات الذهبية والفضية والبرونزية).' },
        { en: 'Stage 4 — Mawhiba Winter/Spring/Summer Camps & Team Selection Tests (TSTs) for BMO, APMO, EGMO, and IMO!', ar: 'المرحلة الرابعة — ملتقيات «موهبة» الموسمية واختبارات ترشيح المنتخب السعودي للأولمبيادات الإقليمية والدولية IMO!' }
      ],
      ex: 'Mastering fast exact structural insight in Stages 1–2 unlocks full proof competition at the Riyadh National Finals and IMO camps.',
      ex_ar: 'إتقان سرعة البصيرة البنيوية في المرحلتين 1 و2 يفتح باب المنافسة البرهانية في نهائيات الرياض ومعسكرات المنتخب السعودي.'
    },
    cat: {
      catsEn: ['Telescoping & Symmetric Sums', 'Modular Cyclicity & Divisibility', 'Area Ratios & Homothety'],
      catsAr: ['المجاميع التلسكوبية والمتماثلة', 'الدورية المعيارية وقابلية القسمة', 'نسب المساحات والتحاكي'],
      items: [
        { en: '\\( \\sum_{k=1}^{99} \\frac{1}{k(k+1)} = \\frac{99}{100} \\)', cat: 0 },
        { en: 'Last two digits of \\( 7^{2026} \\) via \\( \\bmod 100 \\)', ar: 'آخر خانتين للعدد \\( 7^{2026} \\) بترديد \\( 100 \\)', cat: 1 },
        { en: 'Ratio \\( [AEF] : [ABC] = \\cos^2 A \\) for orthic feet \\( E, F \\)', ar: 'نسبة مساحة مثلث قدمَي الارتفاعين \\( \\cos^2 A \\)', cat: 2 },
        { en: '\\( x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)^3 - 3\\left(x + \\frac{1}{x}\\right) \\)', cat: 0 }
      ],
      ex: 'NSMO Stage 1–2 tests rapid recognition across telescoping algebra, modular cycles, and synthetic area ratios.',
      ex_ar: 'تركز المرحلتان 1 و2 في نسما على الكشف السريع للتلسكوب الجبري والدورية المعيارية ونسب المساحات الهندسية.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Solve the NSMO Stage 2 system: \\( x + \\frac{1}{x} = 3 \\implies \\) find \\( x^5 + \\frac{1}{x^5} \\).', ar: '<strong>الهدف:</strong> إذا كان \\( x + \\frac{1}{x} = 3 \\)، فأوجد \\( x^5 + \\frac{1}{x^5} \\) بدون حل المعادلة التربيعية.' },
      { en: '<strong>Step 1 (Build \\( S_2, S_3 \\)):</strong> \\( S_2 = x^2 + x^{-2} = 3^2 - 2 = 7 \\), and \\( S_3 = x^3 + x^{-3} = 3(7) - 3 = 18 \\).', ar: '<strong>الخطوة 1 (حساب \\( S_2, S_3 \\)):</strong> \\( S_2 = 9 - 2 = 7 \\)، و\\( S_3 = 3(7) - 3 = 18 \\).' },
      { en: '<strong>Step 2 (Combine \\( S_2 S_3 \\)):</strong> \\( (x^2 + x^{-2})(x^3 + x^{-3}) = (x^5 + x^{-5}) + (x + x^{-1}) \\implies S_5 = 7 \\times 18 - 3 = 123 \\)!', ar: '<strong>الخطوة 2 (ضرب \\( S_2 S_3 \\)):</strong> \\( S_5 = S_2 S_3 - S_1 = 7 \\times 18 - 3 = 123 \\)!' }
    ]
  }),

  'ol-nsmo-national-finals': makeChapterIx({
    nameEn: 'NSMO of KSA: National Finals & Mawhiba IMO Pathway',
    nameAr: 'النهائيات الوطنية لأولمبياد «نسما» ومسار موهبة نحو IMO',
    shortEn: 'NSMO Riyadh Finals & IMO Proofs',
    shortAr: 'نهائيات نسما بالرياض وبراهين IMO',
    qc: {
      q: '[NSMO National Finals — LTE] What is the exact 3-adic valuation \\( v_3(5^{18} - 2^{18}) \\) (the highest power of \\( 3 \\) dividing \\( 5^{18} - 2^{18} \\))?',
      q_ar: '[نهائيات نسما الوطنية — توطئة LTE] ما الأس الأكبر \\( v_3(5^{18} - 2^{18}) \\) للعدد \\( 3 \\) الذي يقسم \\( 5^{18} - 2^{18} \\)؟',
      o: ['\\( 3 \\)', '\\( 2 \\)', '\\( 4 \\)', '\\( 1 \\)'],
      a: 0,
      ex: 'Since \\( p = 3 \\) is an odd prime with \\( 3 \\mid (5 - 2) \\) and \\( 3 \\nmid 5 \\cdot 2 \\), LTE gives \\( v_3(5^{18} - 2^{18}) = v_3(5 - 2) + v_3(18) = 1 + 2 = 3 \\) (divisible by \\( 27 \\), not \\( 81 \\)).',
      ex_ar: 'بما أن \\( p = 3 \\) فردي أولي ويحقق \\( 3 \\mid (5-2) \\) و\\( 3 \\nmid 10 \\)، فإن توطئة رفع الأس تعطي \\( v_3(5^{18}-2^{18}) = v_3(3) + v_3(18) = 1 + 2 = 3 \\).'
    },
    tf: [
      { en: 'In any acute \\( \\triangle ABC \\) with orthocenter \\( H \\), reflecting \\( H \\) across side \\( BC \\) AND reflecting \\( H \\) across the midpoint \\( M_A \\) of \\( BC \\) BOTH land on the circumcircle \\( (ABC) \\)!', ar: 'في أي مثلث حاد \\( \\triangle ABC \\) ملتقى ارتفاعاته \\( H \\)، يقع كل من انعكاس \\( H \\) حول الضلع \\( BC \\) وانعكاسه حول منتصف \\( BC \\) على الدائرة المحيطة \\( (ABC) \\)!', a: true },
      { en: 'On a 7-point NSMO National Finals proof question, writing a heuristic pattern from \\( n = 1, 2, 3 \\) without proving the general case typically earns 6 out of 7 points.', ar: 'في أسئلة البراهين ذات الـ 7 درجات بنهائيات نسما، يأخذ الطالب 6 من 7 درجات بمجرد استنتاج النمط من الحالات الصغيرة دون برهان عام.', a: false },
      { en: 'Every Cauchy additive function \\( f: \\mathbb{Q} \\to \\mathbb{Q} \\) satisfying \\( f(x + y) = f(x) + f(y) \\) must be of the form \\( f(x) = cx \\) where \\( c = f(1) \\).', ar: 'كل دالة جمعية لكوشي \\( f: \\mathbb{Q} \\to \\mathbb{Q} \\) تحقق \\( f(x+y)=f(x)+f(y) \\) تكون حتماً على الصورة \\( f(x) = cx \\) حيث \\( c = f(1) \\).', a: true }
    ],
    mt: [
      { l: '\\( AH^2 + BC^2 = 4R^2 \\) (with \\( AH = 2\\,OM_A \\))', rEn: 'Orthocenter-Antipode Parallelogram Identity', rAr: 'متطابقة ملتقى الارتفاعات والنقطة القطرية المقابلة' },
      { l: 'Substitute \\( y = -f(x) \\) or prove injectivity/surjectivity', rEn: 'Olympiad Functional Equation Strategy', rAr: 'استراتيجية المعادلات الدالية الأولمبية' },
      { l: 'Fix total degree \\( 3 \\) by multiplying \\( abc = 1 \\) constraints', rEn: 'Homogenization of Conditional Inequalities', rAr: 'تجانس الدرجات في المتباينات المشروطة' },
      { l: 'Bound \\( \\sum d_i = 2|E| \\) and \\( \\sum \\binom{d_i}{2} \\le \\binom{n}{2} \\)', rEn: 'Kővári–Sós–Turán Double Counting', rAr: 'العد المزدوج لكوفاري-شوش-توران في المخططات' }
    ],
    se: {
      q: '[NSMO Functional Equation Grading] A student solves \\( f: \\mathbb{R} \\to \\mathbb{R} \\) given \\( f(x + f(y)) = x + y \\) for all \\( x, y \\in \\mathbb{R} \\). Spot the logical flaw!',
      q_ar: '[تصحيح معادلات دالية — نهائيات نسما] يحل طالب المعادلة الدالية \\( f(x + f(y)) = x + y \\) لكل \\( x, y \\in \\mathbb{R} \\). أين الخلل المنطقي؟',
      steps: [
        { en: 'Assume without proof that \\( f(x) = cx + d \\) MUST be a linear function because the right-hand side \\( x + y \\) is linear.', ar: 'افتراض أن \\( f(x) = cx + d \\) دالة خطية بدون برهان بحجة أن الطرف الأيمن خطي.' },
        { en: 'Substitute \\( c(x + cy + d) + d = x + y \\implies c = 1,\\; c^2 = 1,\\; cd + d = 0 \\implies d = 0 \\).', ar: 'تعويض الصيغة الخطية لإيجاد \\( c = 1 \\) و\\( d = 0 \\).' },
        { en: 'Claim full 7/7 marks for proving \\( f(x) = x \\) is the unique solution over ALL functions \\( \\mathbb{R} \\to \\mathbb{R} \\).', ar: 'ادعاء استحقاق العلامة الكاملة 7/7 لإثبات التفرد على جميع الدوال الحقيقية.' }
      ],
      errorStep: 1,
      reasons: [
        { en: 'Assuming \\( f \\) is linear ("ansatz guessing") ignores non-linear functions and earns 0–1 points on an Olympiad proof! Instead, set \\( x = 0 \\implies f(f(y)) = y \\) (involution), then substitute \\( y \\mapsto f(y) \\) into \\( f(x + f(y)) = x + y \\) to prove \\( f(x + y) = x + f(y) \\implies f(z) = z + f(0) \\), and \\( f(f(0)) = 0 \\implies 2f(0) = 0 \\implies f(z) = z \\) rigorously!', ar: 'افتراض الخطية مسبقاً مرفوض تماماً في تحكيم الأولمبياد! البرهان الصحيح يضع \\( x = 0 \\) لإثبات \\( f(f(y)) = y \\)، ثم يعوض \\( y \\mapsto f(y) \\) ليستنتج \\( f(x+y) = x + f(y) \\) ومنها \\( f(z) = z \\) بدقة تامة!' },
        { en: 'f(x) = −x is also a valid solution.', ar: 'الدالة f(x) = −x تحقق المعادلة أيضاً.' },
        { en: 'Functional equations over R never have unique solutions.', ar: 'المعادلات الدالية على R ليس لها حل وحيد أبداً.' }
      ],
      h: 'What happens if you plug \\( x = 0 \\) first, and then replace \\( y \\) by \\( f(y) \\)?',
      h_ar: 'ماذا ينتج عند تعويض \\( x = 0 \\) أولاً، ثم استبدال \\( y \\) بـ \\( f(y) \\)؟',
      sol: 'Setting \\( x = 0 \\) gives \\( f(f(y)) = y \\). Replacing \\( y \\) with \\( f(y) \\) gives \\( f(x + y) = x + f(y) \\); setting \\( y = 0 \\) yields \\( f(x) = x + c \\), and \\( f(f(0)) = 0 \\implies 2c = 0 \\implies f(x) = x \\).',
      sol_ar: 'من \\( x=0 \\) نجد \\( f(f(y))=y \\)، وبتعويض \\( y \\mapsto f(y) \\) نجد \\( f(x+y)=x+f(y) \\)، ومن \\( y=0 \\) نثبت \\( f(x)=x \\) بلا أي فرض مسبق.'
    },
    ms: {
      q: '[NSMO National Finals — 7-Mark Inequality] Prove Nesbitt\'s Inequality: for all \\( a, b, c > 0 \\), \\( \\frac{a}{b + c} + \\frac{b}{c + a} + \\frac{c}{a + b} \\ge \\frac{3}{2} \\), and state the equality condition.',
      q_ar: '[نهائيات نسما — متباينة من 7 درجات] أثبت متباينة نسبيت لكل \\( a, b, c > 0 \\): \\( \\frac{a}{b + c} + \\frac{b}{c + a} + \\frac{c}{a + b} \\ge \\frac{3}{2} \\)، مع تحديد شرط المساواة.',
      parts: [
        {
          labelEn: 'Part (a) — Titu\'s Lemma Preparation',
          labelAr: 'الجزء (أ) — التهيئة لتطبيق متباينة تيتو',
          rubric: [
            { code: 'M1', marks: 2, en: 'Rewrite each fraction with a square numerator and positive denominator: \\( S = \\frac{a^2}{ab + ac} + \\frac{b^2}{bc + ba} + \\frac{c^2}{ca + cb} \\).', ar: 'كتابة كل كسر ببسط مربع ومقام موجب: \\( \\frac{a^2}{ab+ac} + \\frac{b^2}{bc+ba} + \\frac{c^2}{ca+cb} \\).' },
            { code: 'A1', marks: 2, en: 'Apply Titu\'s Lemma (Cauchy-Schwarz) to obtain \\( S \\ge \\frac{(a + b + c)^2}{2(ab + bc + ca)} \\).', ar: 'تطبيق متباينة تيتو للحصول على \\( S \\ge \\frac{(a+b+c)^2}{2(ab+bc+ca)} \\).' }
          ]
        },
        {
          labelEn: 'Part (b) — Quadratic Bound & Equality Case',
          labelAr: 'الجزء (ب) — المتباينة التربيعية وشرط المساواة',
          rubric: [
            { code: 'M1', marks: 2, en: 'Prove \\( (a + b + c)^2 - 3(ab + bc + ca) = \\frac{1}{2}\\big[(a-b)^2 + (b-c)^2 + (c-a)^2\\big] \\ge 0 \\), so \\( \\frac{(a+b+c)^2}{2(ab+bc+ca)} \\ge \\frac{3}{2} \\).', ar: 'إثبات أن \\( (a+b+c)^2 \\ge 3(ab+bc+ca) \\) ومنه \\( S \\ge \\frac{3}{2} \\).' },
            { code: 'A1', marks: 1, en: 'State explicitly that equality holds if and only if \\( a = b = c \\).', ar: 'النص صراحةً على أن المساواة تتحقق إذا وفقط إذا كان \\( a = b = c \\).' }
          ]
        }
      ],
      tip: 'In NSMO National Finals & IMO rubrics, omitting the equality condition ("equality iff \\( a = b = c \\)") or forgetting positivity of denominators costs 1 mark!',
      tip_ar: 'في سلالم التصحيح الأولمبية (نسما وIMO)، يُخصم درجة كاملة عند إغفال ذكر شرط تحقق المساواة!'
    },
    sb: [
      { lEn: 'Acute \\( \\triangle ABC \\) has circumradius \\( R = 13 \\) and side \\( BC = 24 \\). Compute \\( 4R^2 = 4 \\times 13^2 = \\)', lAr: 'مثلث حاد نصف قطر دائرته المحيطة \\( R = 13 \\) وضلع \\( BC = 24 \\). احسب \\( 4R^2 = \\)', a: '676', hEn: '4 × 169.', hAr: 'احسب 4 × 169.' },
      { lEn: 'Using the NSMO/IMO identity \\( AH^2 + BC^2 = 4R^2 \\), compute \\( AH^2 = 676 - 24^2 = \\)', lAr: 'باستخدام المتطابقة \\( AH^2 + BC^2 = 4R^2 \\)، احسب \\( AH^2 = 676 - 576 = \\)', a: '100', hEn: '676 − 576.', hAr: 'احسب 676 − 576.' },
      { lEn: 'Deduce the distance \\( AH \\) from vertex \\( A \\) to orthocenter \\( H \\): \\( AH = \\)', lAr: 'استنتج المسافة \\( AH \\) بين الرأس \\( A \\) وملتقى الارتفاعات \\( H \\): \\( AH = \\)', a: '10', hEn: 'Square root of 100 (equal to 2 × OM_A = 2 × 5).', hAr: 'الجذر التربيعي لـ 100.' }
    ],
    num: {
      q: '[NSMO National Finals — Functional Equation] A function \\( f: \\mathbb{Z} \\to \\mathbb{Z} \\) satisfies \\( f(x + y) = f(x) + f(y) + 2xy \\) for all integers \\( x, y \\), and \\( f(1) = 5 \\). Find \\( f(10) \\).',
      q_ar: '[نهائيات نسما — معادلة دالية] دالة \\( f: \\mathbb{Z} \\to \\mathbb{Z} \\) تحقق \\( f(x + y) = f(x) + f(y) + 2xy \\) لكل \\( x, y \\in \\mathbb{Z} \\)، وكان \\( f(1) = 5 \\). أوجد قيمة \\( f(10) \\).',
      a: 140,
      h: 'Notice \\( (x + y)^2 = x^2 + y^2 + 2xy \\)! Define \\( g(x) = f(x) - x^2 \\) so \\( g \\) becomes purely additive!',
      h_ar: 'لاحظ أن \\( (x+y)^2 = x^2 + y^2 + 2xy \\)! عرّف \\( g(x) = f(x) - x^2 \\) فتصبح \\( g \\) دالة جمعية خطية على \\( \\mathbb{Z} \\)!',
      sol: 'Let \\( g(x) = f(x) - x^2 \\). Then \\( g(x + y) = g(x) + g(y) \\) on \\( \\mathbb{Z} \\), so \\( g(x) = g(1)x = (5 - 1)x = 4x \\). Hence \\( f(x) = x^2 + 4x \\), giving \\( f(10) = 100 + 40 = 140 \\).',
      sol_ar: 'بوضع \\( g(x) = f(x) - x^2 \\) نجد \\( g(x+y)=g(x)+g(y) \\)، ومن \\( g(1) = 5 - 1 = 4 \\) تكون \\( f(x) = x^2 + 4x \\)، ومنه \\( f(10) = 100 + 40 = 140 \\).'
    },
    ord: {
      prompt: 'Order the synthetic proof steps showing why \\( AH = 2\\,OM_A \\) in acute \\( \\triangle ABC \\) using circumcircle antipode \\( A\' \\):',
      prompt_ar: 'رتّب خطوات البرهان التركيبي لإثبات \\( AH = 2\\,OM_A \\) في المثلث الحاد \\( \\triangle ABC \\) باستخدام النقطة القطرية المقابلة \\( A\' \\):',
      items: [
        { en: 'Construct diameter \\( AA\' \\) of circumcircle \\( (ABC) \\) passing through circumcenter \\( O \\).', ar: 'رسم القطر \\( AA\' \\) في الدائرة المحيطة \\( (ABC) \\) ماراً بالمركز \\( O \\).' },
        { en: 'By Thales\'s Theorem, \\( \\angle ABA\' = 90^\\circ \\implies BA\' \\perp AB \\); since altitude \\( CH \\perp AB \\), deduce \\( BA\' \\parallel CH \\) (and similarly \\( CA\' \\parallel BH \\)).', ar: 'من مبرهنة طاليس \\( BA\' \\perp AB \\) وبما أن \\( CH \\perp AB \\) فإن \\( BA\' \\parallel CH \\) وكذلك \\( CA\' \\parallel BH \\).' },
        { en: 'Conclude \\( BHCA\' \\) is a parallelogram, so its diagonals \\( BC \\) and \\( HA\' \\) bisect each other at midpoint \\( M_A \\)!', ar: 'استنتاج أن \\( BHCA\' \\) متوازي أضلاع، فقطراه \\( BC \\) و\\( HA\' \\) يتناصفان عند \\( M_A \\)!' },
        { en: 'Apply the Midline Theorem to \\( \\triangle AHA\' \\) (with midpoints \\( O \\) of \\( AA\' \\) and \\( M_A \\) of \\( HA\' \\)) to conclude \\( OM_A = \\frac{1}{2}AH \\)!', ar: 'تطبيق نظرية القطعة المنصفة في \\( \\triangle AHA\' \\) لاستنتاج \\( AH = 2\\,OM_A \\) مباشرة!' }
      ],
      ex: 'Constructing the antipode A\' turns orthocenter geometry into a clean parallelogram + midline configuration.',
      ex_ar: 'إنشاء النقطة القطرية المقابلة A\' يحول خصائص ملتقى الارتفاعات إلى متوازي أضلاع وقطعة منصفة بمنتهى الأناقة.'
    },
    cat: {
      catsEn: ['Functional Equations', 'Olympiad Number Theory (LTE / Orders)', 'Synthetic Lemmas (Orthocenter / Spiral)'],
      catsAr: ['المعادلات الدالية', 'نظرية الأعداد المتقدمة (LTE والرتبة)', 'التوطئات الهندسية التركيبية'],
      items: [
        { en: 'Proving injectivity \\( f(a)=f(b) \\implies a=b \\) before substituting', ar: 'إثبات المتباينية \\( f(a)=f(b)\\implies a=b \\)', cat: 0 },
        { en: 'Showing \\( p \\mid (a^p + b^p) \\implies v_p(a^p + b^p) = v_p(a+b) + 1 \\)', ar: 'حساب \\( v_p(a^p + b^p) = v_p(a+b) + 1 \\) بتوطئة LTE', cat: 1 },
        { en: 'Reflecting \\( H \\) across \\( BC \\) and \\( M_A \\) onto \\( (ABC) \\)', ar: 'انعكاس ملتقى الارتفاعات \\( H \\) على الدائرة المحيطة', cat: 2 },
        { en: 'Using \\( \\text{ord}_p(a) \\mid \\gcd(n, p-1) \\) to restrict prime divisors', ar: 'استخدام الرتبة الضربية \\( \\text{ord}_p(a) \\) لحصر العوامل الأولية', cat: 1 }
      ],
      ex: 'NSMO National Finals tests all four IMO pillars: Algebra (FE/Inequalities), Number Theory (LTE/ord), Geometry, and Combinatorics.',
      ex_ar: 'تغطي النهائيات الوطنية لنسما محاور IMO الأربعة: الجبر، ونظرية الأعداد، والهندسة التركيبية، والتركيبات.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Prove \\( p \\equiv 1 \\pmod 4 \\) for every odd prime divisor \\( p \\) of \\( n^2 + 1 \\) (NSMO / IMO Number Theory).', ar: '<strong>الهدف:</strong> إثبات أن كل قاسم أولي فردي \\( p \\) للعدد \\( n^2 + 1 \\) يحقق \\( p \\equiv 1 \\pmod 4 \\).' },
      { en: '<strong>Step 1 (Multiplicative Order):</strong> \\( n^2 \\equiv -1 \\pmod p \\implies n^4 \\equiv 1 \\pmod p \\) while \\( n^2 \\not\\equiv 1 \\pmod p \\), so \\( \\text{ord}_p(n) = 4 \\).', ar: '<strong>الخطوة 1 (الرتبة الضربية):</strong> \\( n^2 \\equiv -1 \\) و\\( n^4 \\equiv 1 \\pmod p \\)، فالرتبة \\( \\text{ord}_p(n) = 4 \\).' },
      { en: '<strong>Step 2 (Fermat Divisibility):</strong> By Fermat\'s Little Theorem \\( n^{p-1} \\equiv 1 \\pmod p \\), so \\( 4 = \\text{ord}_p(n) \\mid (p - 1) \\implies p \\equiv 1 \\pmod 4 \\)!', ar: '<strong>الخطوة 2 (مبرهنة فيرما الصغرى):</strong> بما أن \\( \\text{ord}_p(n) \\mid (p-1) \\) فإن \\( 4 \\mid (p-1) \\) أي \\( p \\equiv 1 \\pmod 4 \\)!' }
    ]
  }),

  'ol-kaust-kmc-qualifier': makeChapterIx({
    nameEn: 'KAUST Mathematics Competition: Regional Qualifier',
    nameAr: 'مسابقة كاوست للرياضيات (KMC): التصفيات الإقليمية',
    shortEn: 'KAUST KMC Qualifier',
    shortAr: 'تصفيات مسابقة كاوست KMC',
    qc: {
      q: '[KAUST KMC Qualifier] Evaluate the exact floor sum \\( \\sum_{k=1}^{35} \\lfloor \\sqrt{k} \\rfloor \\).',
      q_ar: '[تصفيات مسابقة كاوست KMC] احسب القيمة الدقيقة للمجموع \\( \\sum_{k=1}^{35} \\lfloor \\sqrt{k} \\rfloor \\).',
      o: ['\\( 125 \\)', '\\( 120 \\)', '\\( 130 \\)', '\\( 115 \\)'],
      a: 0,
      ex: 'Group by \\( m = \\lfloor \\sqrt{k} \\rfloor \\): for \\( m = 1, 2, 3, 4 \\) there are \\( 2m + 1 = 3, 5, 7, 9 \\) terms, and for \\( m = 5 \\) (\\( 25 \\le k \\le 35 \\)) there are \\( 11 \\) terms: \\( 1(3) + 2(5) + 3(7) + 4(9) + 5(11) = 3 + 10 + 21 + 36 + 55 = 125 \\).',
      ex_ar: 'نجمع حسب قيمة \\( m = \\lfloor \\sqrt{k} \\rfloor \\): \\( 1(3) + 2(5) + 3(7) + 4(9) + 5(11) = 3 + 10 + 21 + 36 + 55 = 125 \\).'
    },
    tf: [
      { en: 'Hosted by KAUST Academy (جامعة الملك عبدالله للعلوم والتقنية — ثول), the KAUST Mathematics Competition (KMC) selects top secondary talent via Regional Qualifiers into the Thuwal Campus Finals and KAUST–Cambridge summer pathway.', ar: 'تنظم أكاديمية كاوست (جامعة الملك عبدالله للعلوم والتقنية بثول) مسابقة كاوست للرياضيات (KMC) لاختيار نخبة الطلبة عبر التصفيات الإقليمية إلى نهائيات الحرم الجامعي بثول والبرنامج الصيفي بالتعاون مع كامبريدج.', a: true },
      { en: 'If a monic cubic \\( P(x) \\) satisfies \\( P(1) = 2,\\; P(2) = 4,\\; P(3) = 6 \\), then \\( P(4) \\) MUST equal \\( 8 \\).', ar: 'إذا كانت كثيرة الحدود التكعيبية الرئيسية \\( P(x) \\) تحقق \\( P(1)=2,\\; P(2)=4,\\; P(3)=6 \\) فإن \\( P(4) \\) يساوي \\( 8 \\) فقط.', a: false },
      { en: 'In a geometric region \\( \\Omega \\), if event \\( E \\) corresponds to sub-region \\( A \\subseteq \\Omega \\) under uniform measure, then \\( P(E) = \\frac{\\text{Area}(A)}{\\text{Area}(\\Omega)} \\).', ar: 'في الاحتمال الهندسي المنتظم على منطقة \\( \\Omega \\)، يُعطى احتمال الحدث \\( A \\subseteq \\Omega \\) بنسبة المساحتين \\( \\frac{\\text{Area}(A)}{\\text{Area}(\\Omega)} \\).', a: true }
    ],
    mt: [
      { l: '\\( P(x) - 2x = (x-1)(x-2)(x-3) \\)', rEn: 'Auxiliary Polynomial Root Trick (KMC Algebra)', rAr: 'خدعة كثيرة الحدود المساعدة (جبر كاوست)' },
      { l: '\\( dp(x, y) = dp(x-1, y) + dp(x, y-1) \\) (0 on blocked cells)', rEn: 'KAUST Blocked-Grid Lattice Path DP', rAr: 'البرمجة الديناميكية لمسارات الشبكة المحظورة' },
      { l: '\\( [x - y] < t \\iff \\text{hexagonal strip in } [0, T]^2 \\)', rEn: 'Rendezvous / Meeting-Window Geometric Probability', rAr: 'الاحتمال الهندسي لمسألة اللقاء الزمني' },
      { l: '\\( \\sum_{k=m^2}^{m^2+2m} \\lfloor \\sqrt{k} \\rfloor = m(2m + 1) \\)', rEn: 'Square-Interval Floor Grouping', rAr: 'تجميع دالة الجزء الصحيح بين المربعات المتتالية' }
    ],
    se: {
      q: '[KAUST KMC Classic Polynomial Trap] Let \\( P(x) \\) be a MONIC polynomial of degree \\( 3 \\) with \\( P(1) = 1,\\; P(2) = 2,\\; P(3) = 3 \\). A student computes \\( P(4) \\). Find the error!',
      q_ar: '[فخ شهير في تصفيات كاوست KMC] لتكن \\( P(x) \\) كثيرة حدود رئيسية (معامل \\( x^3 \\) يساوي \\( 1 \\)) من الدرجة الثالثة تحقق \\( P(1) = 1,\\; P(2) = 2,\\; P(3) = 3 \\). يحسب طالب \\( P(4) \\). أين الخطأ؟',
      steps: [
        { en: 'Observe the pattern \\( P(k) = k \\) for \\( k = 1, 2, 3 \\).', ar: 'ملاحظة النمط \\( P(k) = k \\) للقيم \\( k = 1, 2, 3 \\).' },
        { en: 'Conclude \\( P(x) = x \\) identically, so \\( P(4) = 4 \\).', ar: 'استنتاج أن \\( P(x) = x \\) وبالتالي \\( P(4) = 4 \\).' },
        { en: 'Report \\( 4 \\) on the KMC Qualifier answer sheet.', ar: 'كتابة الإجابة \\( 4 \\) في ورقة إجابة المسابقة.' }
      ],
      errorStep: 2,
      reasons: [
        { en: '\\( P(x) \\) is a MONIC CUBIC (\\( \\deg P = 3 \\), leading term \\( x^3 \\)), so \\( Q(x) = P(x) - x \\) is a monic cubic vanishing at \\( 1, 2, 3 \\): \\( P(x) - x = (x - 1)(x - 2)(x - 3) \\)! Thus \\( P(4) = 4 + 3 \\cdot 2 \\cdot 1 = 10 \\)!', ar: '\\( P(x) \\) تكعيبية رئيسية، فتكون \\( P(x) - x = (x - 1)(x - 2)(x - 3) \\)، وعند \\( x = 4 \\) نجد \\( P(4) = 4 + 6 = 10 \\) لا \\( 4 \\)!' },
        { en: 'A cubic polynomial can have at most 2 real roots.', ar: 'كثيرة الحدود التكعيبية لا تملك أكثر من جذرين.' },
        { en: '(4−1)(4−2)(4−3) equals 24, so P(4) = 28.', ar: 'قيمة الجداء تساوي 24.' }
      ],
      h: 'What is the degree and leading coefficient of \\( Q(x) = P(x) - x \\)?',
      h_ar: 'ما درجة كثيرة الحدود المساعدة \\( Q(x) = P(x) - x \\) وما معاملها الرئيسي؟',
      sol: 'Since \\( Q(x) = P(x) - x \\) is monic of degree \\( 3 \\) with roots \\( 1, 2, 3 \\), \\( P(x) = x + (x-1)(x-2)(x-3) \\), giving \\( P(4) = 4 + 6 = 10 \\).',
      sol_ar: 'بما أن \\( P(x) - x = (x-1)(x-2)(x-3) \\) فإن \\( P(4) = 4 + 3 \\times 2 \\times 1 = 10 \\).'
    },
    ms: {
      q: '[KAUST KMC Qualifier — Functional System] Solve \\( 2f(x) + f(1 - x) = 3x^2 \\) for all \\( x \\in \\mathbb{R} \\) and compute \\( f(4) \\).',
      q_ar: '[تصفيات كاوست KMC — معادلة دالية] حل المعادلة \\( 2f(x) + f(1 - x) = 3x^2 \\) لكل \\( x \\in \\mathbb{R} \\) واحسب \\( f(4) \\).',
      parts: [
        {
          labelEn: 'Part (a) — Involution Substitution x ↦ 1 − x',
          labelAr: 'الجزء (أ) — تعويض التحويل العكسي x ↦ 1 − x',
          rubric: [
            { code: 'M1', marks: 1, en: 'Replace \\( x \\) by \\( 1 - x \\) to obtain the dual equation \\( 2f(1 - x) + f(x) = 3(1 - x)^2 \\).', ar: 'استبدال \\( x \\) بـ \\( 1 - x \\) للحصول على \\( 2f(1 - x) + f(x) = 3(1 - x)^2 \\).' },
            { code: 'A1', marks: 1, en: 'Eliminate \\( f(1 - x) \\) by taking \\( 2 \\times (\\text{Eq. 1}) - (\\text{Eq. 2}) \\): \\( 3f(x) = 6x^2 - 3(1 - x)^2 \\).', ar: 'حذف \\( f(1-x) \\) بضرب الأولى في \\( 2 \\) وطرح الثانية: \\( 3f(x) = 6x^2 - 3(1 - x)^2 \\).' }
          ]
        },
        {
          labelEn: 'Part (b) — Explicit Formula & Evaluation',
          labelAr: 'الجزء (ب) — الصيغة الصريحة وحساب f(4)',
          rubric: [
            { code: 'M1', marks: 1, en: 'Divide by \\( 3 \\) and simplify: \\( f(x) = 2x^2 - (1 - 2x + x^2) = x^2 + 2x - 1 \\).', ar: 'القسمة على \\( 3 \\) والتبسيط: \\( f(x) = x^2 + 2x - 1 \\).' },
            { code: 'A1', marks: 1, en: 'Evaluate \\( f(4) = 16 + 8 - 1 = 23 \\) (and verify \\( 2f(4) + f(-3) = 46 + 2 = 48 = 3(16) \\)).', ar: 'حساب \\( f(4) = 16 + 8 - 1 = 23 \\) مع التحقق المباشر.' }
          ]
        }
      ],
      tip: 'Any functional equation pairing \\( f(x) \\) with \\( f(a - x) \\), \\( f(1/x) \\), or \\( f(\\frac{x-1}{x}) \\) closes into a finite linear system under repeated substitution!',
      tip_ar: 'كل معادلة دالية تجمع \\( f(x) \\) مع تحويل دوري مثل \\( f(a-x) \\) أو \\( f(1/x) \\) تتحول إلى نظام خطي مغلق بالتعويض المتكرر!'
    },
    sb: [
      { lEn: 'Count lattice paths from \\( (0, 0) \\) to \\( (4, 4) \\) using \\( R, U \\) steps that AVOID \\( (2, 2) \\). Unrestricted paths \\( = \\binom{8}{4} = \\)', lAr: 'عدّ المسارات الصاعدة من \\( (0,0) \\) إلى \\( (4,4) \\) مع تجنب \\( (2,2) \\). عدد المسارات الكلية \\( \\binom{8}{4} = \\)', a: '70', hEn: '8! / (4! 4!).', hAr: 'احسب 8! / (4! 4!).' },
      { lEn: 'Paths passing THROUGH \\( (2, 2) \\) equal \\( \\binom{4}{2} \\times \\binom{4}{2} = \\)', lAr: 'عدد المسارات المارة عبر \\( (2,2) \\) يساوي \\( \\binom{4}{2} \\times \\binom{4}{2} = \\)', a: '36', hEn: '6 × 6.', hAr: 'احسب 6 × 6.' },
      { lEn: 'Subtracting gives valid KMC obstacle-avoiding paths \\( = 70 - 36 = \\)', lAr: 'بطرح المسارات المحظورة، عدد المسارات المسموحة \\( = \\)', a: '34', hEn: '70 − 36.', hAr: 'احسب 70 − 36.' }
    ],
    num: {
      q: '[KAUST KMC Qualifier] A polynomial \\( P(x) \\) leaves remainder \\( 5 \\) when divided by \\( x - 2 \\) and remainder \\( 17 \\) when divided by \\( x - 6 \\). Let \\( R(x) = ax + b \\) be the remainder when \\( P(x) \\) is divided by \\( (x - 2)(x - 6) \\). Find \\( R(10) \\).',
      q_ar: '[تصفيات مسابقة كاوست KMC] تترك كثيرة الحدود \\( P(x) \\) الباقي \\( 5 \\) عند قسمتها على \\( x - 2 \\) والباقي \\( 17 \\) عند قسمتها على \\( x - 6 \\). إذا كان \\( R(x) = ax + b \\) هو باقي قسمتها على \\( (x - 2)(x - 6) \\)، فأوجد \\( R(10) \\).',
      a: 29,
      h: 'By the Remainder Theorem, \\( R(2) = P(2) = 5 \\) and \\( R(6) = P(6) = 17 \\), and \\( R(x) \\) is linear!',
      h_ar: 'بنظرية الباقي \\( R(2) = 5 \\) و\\( R(6) = 17 \\)، وبما أن \\( R(x) \\) خطية فميلها ثابت!',
      sol: 'Since \\( R(x) = ax + b \\) satisfies \\( R(2) = 5 \\) and \\( R(6) = 17 \\), its slope is \\( a = \\frac{17 - 5}{6 - 2} = 3 \\), so \\( R(x) = 3x - 1 \\) and \\( R(10) = 29 \\).',
      sol_ar: 'ميل الباقي الخطي \\( a = \\frac{17-5}{6-2} = 3 \\)، فيكون \\( R(x) = 3x - 1 \\) ومنه \\( R(10) = 29 \\).'
    },
    ord: {
      prompt: 'Order the steps to solve a KAUST KMC Rendezvous Geometric Probability problem (two researchers arrive independently in \\( [0, 60] \\) min and wait \\( 15 \\) min):',
      prompt_ar: 'رتّب خطوات حل مسألة الاحتمال الهندسي للقاء باحثَين في كاوست يصلان باستقلال خلال \\( [0, 60] \\) دقيقة وينتظر كل منهما \\( 15 \\) دقيقة:',
      items: [
        { en: 'Model arrival times \\( (x, y) \\) uniformly on the square \\( \\Omega = [0, 60]^2 \\) of total area \\( 60^2 = 3600 \\).', ar: 'تمثيل زمنَي الوصول \\( (x, y) \\) بانتظام على المربع \\( [0, 60]^2 \\) ذي المساحة \\( 3600 \\).' },
        { en: 'Express the meeting condition as the absolute-value strip \\( |x - y| \\le 15 \\) inside \\( [0, 60]^2 \\).', ar: 'كتابة شرط اللقاء على صورة الشريط \\( |x - y| \\le 15 \\) داخل المربع.' },
        { en: 'Compute the complement area of the two corner right triangles \\( x - y > 15 \\) and \\( y - x > 15 \\), each of leg \\( 45 \\): combined area \\( = 45^2 = 2025 \\).', ar: 'حساب مساحة المثلثين القائمين المتممين في الركنين وطول ضلع كل منهما \\( 45 \\): مجموع مساحتيهما \\( 45^2 = 2025 \\).' },
        { en: 'Divide favorable area by total area: \\( P = 1 - \\left(\\frac{45}{60}\\right)^2 = 1 - \\frac{9}{16} = \\frac{7}{16} \\)!', ar: 'حساب الاحتمال: \\( P = 1 - (3/4)^2 = \\frac{7}{16} \\)!' }
      ],
      ex: 'Complement corner triangles turn |x − y| ≤ w on [0, T]² into the instant formula 1 − (1 − w/T)².',
      ex_ar: 'حساب المثلثين المتممين يحول مسائل اللقاء الزمني مباشرة إلى الصيغة السريعة \\( 1 - (1 - w/T)^2 \\).'
    },
    cat: {
      catsEn: ['Auxiliary Polynomial Interpolation', 'Lattice / Markov Counting', 'Coordinate / Vector Geometry'],
      catsAr: ['استيفاء كثيرات الحدود المساعدة', 'العد الشبكي وسلاسل ماركوف', 'الهندسة الإحداثية والمتجهية'],
      items: [
        { en: 'Writing \\( P(x) - x^2 = c(x-1)(x-2)(x-3) \\)', cat: 0 },
        { en: 'Shoelace Formula \\( \\frac{1}{2}|\\sum (x_i y_{i+1} - x_{i+1} y_i)| \\) + Pick\'s Theorem', ar: 'صيغة رباط الحذاء ومبرهنة بيك الشبكية', cat: 2 },
        { en: 'Subtracting paths through \\( (a, b) \\) from \\( \\binom{m+n}{m} \\)', ar: 'طرح المسارات المارة بنقطة محظورة من \\( \\binom{m+n}{m} \\)', cat: 1 },
        { en: 'CRT Polynomial Remainder \\( R(x) \\) modulo \\( (x - r_1)(x - r_2) \\)', ar: 'باقي قسمة كثيرة الحدود على \\( (x-r_1)(x-r_2) \\)', cat: 0 }
      ],
      ex: 'KAUST KMC Regional Qualifiers blend algebraic structure, algorithmic counting, and clean coordinate/synthetic geometry.',
      ex_ar: 'تجمع تصفيات مسابقة كاوست KMC بين البنية الجبرية، والعد الخوارزمي، والهندسة الإحداثية والتركيبية.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Find the number of interior lattice points \\( I \\) inside triangle \\( O(0,0), A(6,0), B(0,8) \\) via Pick\'s Theorem.', ar: '<strong>الهدف:</strong> إيجاد عدد النقاط الشبكية الداخلية \\( I \\) للمثلث القائم \\( (0,0), (6,0), (0,8) \\) بمبرهنة بيك.' },
      { en: '<strong>Step 1 (Area & Boundary Points \\( B \\)):</strong> Area \\( [OAB] = \\frac{1}{2}(6)(8) = 24 \\). Boundary segments contain \\( \\gcd(6,0) + \\gcd(0,8) + \\gcd(6,8) = 6 + 8 + 2 = 16 \\) lattice points.', ar: '<strong>الخطوة 1 (المساحة ونقاط المحيط \\( B \\)):</strong> المساحة \\( 24 \\)، ونقاط المحيط \\( B = 6 + 8 + \\gcd(6,8) = 16 \\).' },
      { en: '<strong>Step 2 (Pick\'s Formula \\( A = I + \\frac{B}{2} - 1 \\)):</strong> \\( 24 = I + 8 - 1 \\implies I = 17 \\) interior lattice points!', ar: '<strong>الخطوة 2 (مبرهنة بيك):</strong> \\( 24 = I + 8 - 1 \\implies I = 17 \\) نقطة شبكية داخلية!' }
    ]
  }),

  'ol-kaust-finals-academy': makeChapterIx({
    nameEn: 'KAUST Campus Finals & Academy Advanced Synthesis',
    nameAr: 'نهائيات كاوست (ثول) والتوليف المتقدم لأكاديمية كاوست',
    shortEn: 'KAUST Thuwal Finals & Academy',
    shortAr: 'نهائيات كاوست بثول والأكاديمية',
    qc: {
      q: '[KAUST Thuwal Finals — Roots of Unity] Let \\( \\omega = e^{2\\pi i / 7} \\) be a primitive 7th root of unity. What is the exact value of \\( \\prod_{k=1}^{6} (2 - \\omega^k) \\)?',
      q_ar: '[نهائيات كاوست بثول — الجذور السابعة للواحد] ليكن \\( \\omega = e^{2\\pi i / 7} \\) جذراً سابعاً بدائياً للواحد. ما القيمة الدقيقة للجداء \\( \\prod_{k=1}^{6} (2 - \\omega^k) \\)؟',
      o: ['\\( 127 \\)', '\\( 128 \\)', '\\( 63 \\)', '\\( 7 \\)'],
      a: 0,
      ex: 'Factor \\( \\frac{z^7 - 1}{z - 1} = 1 + z + z^2 + \\dots + z^6 = \\prod_{k=1}^{6} (z - \\omega^k) \\). Evaluating at \\( z = 2 \\) yields \\( \\frac{2^7 - 1}{2 - 1} = 127 \\)!',
      ex_ar: 'من التحليل \\( \\prod_{k=1}^{6}(z - \\omega^k) = \\frac{z^7 - 1}{z - 1} \\)، بالتعويض عند \\( z = 2 \\) نجد \\( \\frac{128 - 1}{1} = 127 \\)!'
    },
    tf: [
      { en: 'By the Roots of Unity Filter with \\( \\omega = e^{2\\pi i / 3} \\), \\( \\sum_{k \\equiv 0 \\pmod 3} \\binom{n}{k} = \\frac{2^n + (1+\\omega)^n + (1+\\omega^2)^n}{3} \\).', ar: 'بمرشح جذور الواحد التكعيبية \\( \\omega = e^{2\\pi i / 3} \\)، يُعطى مجموع التوافيق لمضاعفات 3 بـ \\( \\frac{2^n + (1+\\omega)^n + (1+\\omega^2)^n}{3} \\).', a: true },
      { en: 'Lagrange\'s Vector Identity in \\( \\mathbb{R}^3 \\) states \\( \\|\\mathbf{u} \\times \\mathbf{v}\\|^2 + (\\mathbf{u} \\cdot \\mathbf{v})^2 = \\|\\mathbf{u}\\|^2 \\|\\mathbf{v}\\|^2 \\).', ar: 'تنص متطابقة لاغرانج للمتجهات في \\( \\mathbb{R}^3 \\) على أن \\( \\|\\mathbf{u} \\times \\mathbf{v}\\|^2 + (\\mathbf{u} \\cdot \\mathbf{v})^2 = \\|\\mathbf{u}\\|^2 \\|\\mathbf{v}\\|^2 \\).', a: true },
      { en: 'In a KAUST KMC Team Relay round, Seat 3 receives Seat 2\'s full written scratchwork rather than just the single numerical value \\( T_2 \\).', ar: 'في جولة التتابع الجماعي بنهائيات كاوست، يستلم المقعد الثالث مسودة الحل الكاملة من المقعد الثاني وليس الرقم \\( T_2 \\) فقط.', a: false }
    ],
    mt: [
      { l: '\\( \\frac{1}{m}\\sum_{j=0}^{m-1} \\zeta^{-jr} P(\\zeta^j) \\)', rEn: 'Roots of Unity Coefficient Filter (mod m)', rAr: 'مرشح جذور الواحد لعزل المعاملات بترديد m' },
      { l: '\\( [x^N](1 - x)^{-m} = \\binom{N + m - 1}{m - 1} \\)', rEn: 'Generalized Negative Binomial Generating Function', rAr: 'الدالة المولدة لذات الحدين بالأس السالب' },
      { l: '\\( \\prod_{k=1}^{n-1}(1 - \\zeta^k) = n \\)', rEn: 'Cyclotomic Derivative Product Identity at z = 1', rAr: 'متطابقة جداء فروق جذور الواحد عند z = 1' },
      { l: 'Pre-solve \\( T_3 = g(T_2) \\) symbolically before \\( T_2 \\) arrives', rEn: 'KAUST Finals Relay Parameterization Tactic', rAr: 'تكتيك الحل الرمزي المسبق في جولة التتابع بكاوست' }
    ],
    se: {
      q: '[KAUST Academy Generating Functions] A student uses the Roots of Unity Filter to evaluate \\( S = \\sum_{k=0}^{6} \\binom{18}{3k} \\). Spot the error!',
      q_ar: '[أكاديمية كاوست — مرشح جذور الواحد] يستخدم طالب مرشح الجذور التكعيبية للواحد لحساب \\( S = \\sum_{k=0}^{6} \\binom{18}{3k} \\). اكتشف الخطأ!',
      steps: [
        { en: 'Let \\( \\omega = e^{2\\pi i / 3} \\) and write \\( S = \\frac{(1+1)^{18} + (1+\\omega)^{18} + (1+\\omega^2)^{18}}{3} \\).', ar: 'وضع \\( \\omega = e^{2\\pi i/3} \\) وكتابة \\( S = \\frac{2^{18} + (1+\\omega)^{18} + (1+\\omega^2)^{18}}{3} \\).' },
        { en: 'Simplify \\( 1 + \\omega \\) using \\( 1 + \\omega + \\omega^2 = 0 \\implies 1 + \\omega = -\\omega^2 \\), and claim \\( (-\\omega^2)^{18} = -\\omega^{36} = -1 \\).', ar: 'التعويض بـ \\( 1 + \\omega = -\\omega^2 \\) والادعاء أن \\( (-\\omega^2)^{18} = -1 \\).' },
        { en: 'Conclude \\( S = \\frac{2^{18} - 2}{3} \\).', ar: 'استنتاج أن \\( S = \\frac{2^{18} - 2}{3} \\).' }
      ],
      errorStep: 2,
      reasons: [
        { en: 'Because the exponent \\( 18 \\) is EVEN, \\( (-1)^{18} = +1 \\) (NOT \\( -1 \\))! Thus \\( (-\\omega^2)^{18} = +(\\omega^3)^{12} = +1 \\) and \\( (-\\omega)^{18} = +1 \\), giving \\( S = \\frac{2^{18} + 2}{3} = 87382 \\) (notice \\( 2^{18} - 2 \\) is not even divisible by \\( 3 \\) since \\( 2^{18} \\equiv 1 \\pmod 3 \\)!).', ar: 'الأس \\( 18 \\) زوجي، لذا \\( (-1)^{18} = +1 \\) وليس \\( -1 \\)! فيكون \\( (-\\omega^2)^{18} = +1 \\) والمجموع الصحيح \\( \\frac{2^{18} + 2}{3} = 87382 \\) (ولاحظ أن \\( 2^{18}-2 \\) لا يقبل القسمة على \\( 3 \\) أصلاً!).' },
        { en: '1 + ω equals +ω², not −ω².', ar: '1 + ω يساوي +ω² وليس −ω².' },
        { en: 'The denominator of the filter for mod 3 is 6, not 3.', ar: 'المقام في مرشح الترديد 3 هو 6 وليس 3.' }
      ],
      h: 'Quick sanity check mod \\( 3 \\): must \\( S \\) be an integer? Check whether \\( 2^{18} - 2 \\) or \\( 2^{18} + 2 \\) is divisible by \\( 3 \\)!',
      h_ar: 'فحص سريع بترديد \\( 3 \\): بما أن \\( S \\) عدد صحيح، أيّهما يقبل القسمة على \\( 3 \\): \\( 2^{18} - 2 \\) أم \\( 2^{18} + 2 \\)؟',
      sol: 'Since \\( (-\\omega^2)^{18} = (-1)^{18} \\omega^{36} = +1 \\), both complex terms equal \\( +1 \\), giving \\( S = \\frac{2^{18} + 2}{3} = 87382 \\).',
      sol_ar: 'بما أن \\( (-1)^{18} = +1 \\) و\\( \\omega^{36} = 1 \\)، فإن \\( S = \\frac{2^{18} + 2}{3} = 87382 \\).'
    },
    ms: {
      q: '[KAUST Academy Synthesis] Prove that for any regular \\( n \\)-gon \\( A_0 A_1 \\dots A_{n-1} \\) inscribed in a circle of radius \\( R \\), the product of chord lengths from \\( A_0 \\) to the other \\( n - 1 \\) vertices equals \\( n R^{n-1} \\).',
      q_ar: '[أكاديمية كاوست — برهان مركّب] أثبت أنه في أي مضلع منتظم \\( A_0 A_1 \\dots A_{n-1} \\) محاط بدائرة نصف قطرها \\( R \\)، يساوي جداء أطوال الأوتار الخارجة من \\( A_0 \\) إلى بقية الرؤوس \\( n R^{n-1} \\).',
      parts: [
        {
          labelEn: 'Part (a) — Complex Plane Embedding',
          labelAr: 'الجزء (أ) — التمثيل في المستوى المركب',
          rubric: [
            { code: 'M1', marks: 2, en: 'Place vertices at \\( A_k = R \\zeta^k \\) where \\( \\zeta = e^{2\\pi i / n} \\), so \\( A_0 A_k = |R - R\\zeta^k| = R|1 - \\zeta^k| \\).', ar: 'وضع الرؤوس عند \\( A_k = R\\zeta^k \\) حيث \\( \\zeta = e^{2\\pi i/n} \\)، فيكون \\( A_0 A_k = R|1 - \\zeta^k| \\).' },
            { code: 'A1', marks: 1, en: 'Factor out \\( R^{n-1} \\): \\( \\prod_{k=1}^{n-1} A_0 A_k = R^{n-1} \\left| \\prod_{k=1}^{n-1} (1 - \\zeta^k) \\right| \\).', ar: 'إخراج العامل \\( R^{n-1} \\) من الجداء.' }
          ]
        },
        {
          labelEn: 'Part (b) — Cyclotomic Polynomial Limit at z = 1',
          labelAr: 'الجزء (ب) — نهاية كثيرة الحدود الدويرية عند z = 1',
          rubric: [
            { code: 'M1', marks: 2, en: 'Write the algebraic identity \\( \\prod_{k=1}^{n-1}(z - \\zeta^k) = \\frac{z^n - 1}{z - 1} = 1 + z + z^2 + \\dots + z^{n-1} \\).', ar: 'كتابة المتطابقة \\( \\prod_{k=1}^{n-1}(z - \\zeta^k) = 1 + z + \\dots + z^{n-1} \\).' },
            { code: 'A1', marks: 2, en: 'Substitute \\( z = 1 \\) to get \\( \\prod_{k=1}^{n-1}(1 - \\zeta^k) = n \\), concluding \\( \\prod_{k=1}^{n-1} A_0 A_k = n R^{n-1} \\)!', ar: 'تعويض \\( z = 1 \\) يعطي \\( n \\)، ومن ثم الجداء الكلي يساوي \\( n R^{n-1} \\)!' }
          ]
        }
      ],
      tip: 'Complex coordinates turn intricate regular-polygon chord products and sums into 3-line polynomial evaluations!',
      tip_ar: 'يحول التمثيل المركب جداءات ومجاميع أوتار المضلعات المنتظمة إلى تعويض مباشر في كثيرات الحدود!'
    },
    sb: [
      { lEn: '[KAUST Thuwal Finals Team Relay] Seat 1: Let \\( T_1 \\) be the positive root of \\( x^2 - 4x - 12 = 0 \\). Compute \\( T_1 = \\)', lAr: '[تتابع نهائيات كاوست بثول] المقعد 1: ليكن \\( T_1 \\) الجذر الموجب لـ \\( x^2 - 4x - 12 = 0 \\). احسب \\( T_1 = \\)', a: '6', hEn: '(x − 6)(x + 2) = 0.', hAr: 'حلل (x − 6)(x + 2) = 0.' },
      { lEn: 'Seat 2 receives \\( T_1 = 6 \\): Let \\( T_2 \\) be the number of positive divisors of \\( 10 T_1 = 60 = 2^2 \\cdot 3^1 \\cdot 5^1 \\). Compute \\( T_2 = \\)', lAr: 'المقعد 2 يستلم \\( T_1 = 6 \\): ليكن \\( T_2 \\) عدد القواسم الموجبة للعدد \\( 10 T_1 = 60 \\). احسب \\( T_2 = \\)', a: '12', hEn: '(2+1)(1+1)(1+1).', hAr: 'احسب (2+1)(1+1)(1+1).' },
      { lEn: 'Seat 3 receives \\( T_2 = 12 \\): Find the area \\( T_3 \\) of a right triangle with hypotenuse \\( T_2 + 1 = 13 \\) and one leg \\( 5 \\): \\( T_3 = \\)', lAr: 'المقعد 3 يستلم \\( T_2 = 12 \\): أوجد مساحة مثلث قائم وتره \\( T_2 + 1 = 13 \\) وأحد ساقيه \\( 5 \\): \\( T_3 = \\)', a: '30', hEn: 'Other leg is 12; area = ½ × 5 × 12.', hAr: 'الساق الأخرى 12، والمساحة ½ × 5 × 12.' }
    ],
    num: {
      q: '[KAUST Academy Vector Algebra] Vectors \\( \\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^3 \\) satisfy \\( \\|\\mathbf{u}\\| = 5 \\), \\( \\|\\mathbf{v}\\| = 6 \\), and \\( \\mathbf{u} \\cdot \\mathbf{v} = 18 \\). Using Lagrange\'s Identity, find the exact magnitude \\( \\|\\mathbf{u} \\times \\mathbf{v}\\| \\).',
      q_ar: '[أكاديمية كاوست — الجبر المتجهي] متجهان \\( \\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^3 \\) يحققان \\( \\|\\mathbf{u}\\| = 5 \\) و\\( \\|\\mathbf{v}\\| = 6 \\) و\\( \\mathbf{u} \\cdot \\mathbf{v} = 18 \\). باستخدام متطابقة لاغرانج، أوجد المقدار الدقيق \\( \\|\\mathbf{u} \\times \\mathbf{v}\\| \\).',
      a: 24,
      h: 'Lagrange\'s Identity: \\( \\|\\mathbf{u} \\times \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\|\\mathbf{v}\\|^2 - (\\mathbf{u} \\cdot \\mathbf{v})^2 \\).',
      h_ar: 'متطابقة لاغرانج: \\( \\|\\mathbf{u} \\times \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\|\\mathbf{v}\\|^2 - (\\mathbf{u} \\cdot \\mathbf{v})^2 \\).',
      sol: 'By Lagrange\'s Identity, \\( \\|\\mathbf{u} \\times \\mathbf{v}\\|^2 = 5^2 \\cdot 6^2 - 18^2 = 900 - 324 = 576 \\implies \\|\\mathbf{u} \\times \\mathbf{v}\\| = 24 \\).',
      sol_ar: 'بمتطابقة لاغرانج: \\( \\|\\mathbf{u} \\times \\mathbf{v}\\|^2 = 25 \\times 36 - 324 = 576 \\implies \\|\\mathbf{u} \\times \\mathbf{v}\\| = 24 \\).'
    },
    ord: {
      prompt: 'Order the generating-function steps to count solutions to \\( x_1 + x_2 + x_3 = 12 \\) with \\( 0 \\le x_i \\le 5 \\) (KAUST Academy Combinatorics):',
      prompt_ar: 'رتّب خطوات الدوال المولدة لحساب عدد حلول \\( x_1 + x_2 + x_3 = 12 \\) بشرط \\( 0 \\le x_i \\le 5 \\) (تركيبات أكاديمية كاوست):',
      items: [
        { en: 'Encode each bounded variable \\( 0 \\le x_i \\le 5 \\) by the geometric polynomial \\( 1 + z + z^2 + z^3 + z^4 + z^5 = \\frac{1 - z^6}{1 - z} \\).', ar: 'تمثيل كل متغير مقيد بـ \\( \\frac{1 - z^6}{1 - z} \\).' },
        { en: 'Form the three-variable generating function \\( G(z) = (1 - z^6)^3 (1 - z)^{-3} \\) and seek \\( [z^{12}]G(z) \\).', ar: 'تكوين الدالة المولدة \\( G(z) = (1 - z^6)^3 (1 - z)^{-3} \\) والبحث عن معامل \\( z^{12} \\).' },
        { en: 'Expand \\( (1 - z^6)^3 = 1 - 3z^6 + 3z^{12} - z^{18} \\) and \\( (1 - z)^{-3} = \\sum_{k \\ge 0} \\binom{k + 2}{2} z^k \\).', ar: 'فك \\( (1 - z^6)^3 \\) مع المتسلسلة \\( (1 - z)^{-3} = \\sum \\binom{k+2}{2} z^k \\).' },
        { en: 'Extract \\( [z^{12}]G(z) = \\binom{14}{2} - 3\\binom{8}{2} + 3\\binom{2}{2} = 91 - 84 + 3 = 10 \\) (matching complement symmetry \\( y_i = 5 - x_i \\implies y_1+y_2+y_3 = 3 \\implies \\binom{5}{2} = 10 \\))!', ar: 'استخراج المعامل \\( \\binom{14}{2} - 3\\binom{8}{2} + 3\\binom{2}{2} = 91 - 84 + 3 = 10 \\)!' }
      ],
      ex: 'Generating functions systematically turn Inclusion-Exclusion with upper bounds into polynomial multiplication!',
      ex_ar: 'تحول الدوال المولدة مسائل التضمين والإقصاء ذات القيود العليا إلى ضرب جبري منظم لكثيرات الحدود!'
    },
    cat: {
      catsEn: ['Complex Plane & Roots of Unity', 'Generating Functions', 'Linear-Algebraic Combinatorics / Vectors'],
      catsAr: ['المستوى المركب وجذور الواحد', 'الدوال المولدة', 'الجبر الخطي التوافقي والمتجهات'],
      items: [
        { en: 'Euler-circle chord identity \\( \\prod_{k=1}^{n-1} |1 - \\zeta^k| = n \\)', cat: 0 },
        { en: 'Partition identity \\( \\prod_{k \\ge 1}(1 + z^k) = \\prod_{j \\ge 1} \\frac{1}{1 - z^{2j-1}} \\)', ar: 'تساوي عدد تجزئات الأعداد المختلفة مع التجزئات الفردية', cat: 1 },
        { en: 'Rank-bound proof of Fisher\'s / Oddtown Theorem (\\( m \\le n \\))', ar: 'برهان رتبة المصفوفة لمبرهنة أودتاون (\\( m \\le n \\))', cat: 2 },
        { en: 'Triple scalar product \\( |\\mathbf{a} \\cdot (\\mathbf{b} \\times \\mathbf{c})| / 6 \\) for tetrahedron volume', ar: 'حجم رباعي الوجوه بالضرب الثلاثي القياسي', cat: 2 }
      ],
      ex: 'KAUST Finals & Academy synthesis unites complex roots of unity, generating functions, and linear-algebraic methods.',
      ex_ar: 'تجمع نهائيات كاوست وأكاديمية كاوست بين الجذور المركبة للواحد والدوال المولدة والجبر الخطي التوافقي.'
    },
    sr: [
      { en: '<strong>Goal:</strong> Prove Oddtown\'s Theorem (KAUST Academy Linear-Algebraic Combinatorics): at most \\( n \\) clubs on \\( n \\) citizens if every club has odd size and every pair of clubs has even intersection.', ar: '<strong>الهدف:</strong> إثبات مبرهنة «أودتاون»: لا يمكن تكوين أكثر من \\( n \\) نادياً من \\( n \\) أشخاص إذا كان حجم كل نادٍ فردياً وتقاطع أي ناديين زوجياً.' },
      { en: '<strong>Step 1 (Incidence Vectors over \\( \\mathbb{F}_2 \\)):</strong> Represent club \\( C_i \\) by \\( \\mathbf{v}_i \\in \\mathbb{F}_2^n \\); the rules say \\( \\mathbf{v}_i \\cdot \\mathbf{v}_i \\equiv 1 \\pmod 2 \\) and \\( \\mathbf{v}_i \\cdot \\mathbf{v}_j \\equiv 0 \\pmod 2 \\) for \\( i \\neq j \\).', ar: '<strong>الخطوة 1 (متجهات الانتماء على \\( \\mathbb{F}_2 \\)):</strong> من الشروط نجد \\( \\mathbf{v}_i \\cdot \\mathbf{v}_i = 1 \\) و\\( \\mathbf{v}_i \\cdot \\mathbf{v}_j = 0 \\) في الحقل \\( \\mathbb{F}_2 \\).' },
      { en: '<strong>Step 2 (Linear Independence Bound):</strong> Taking dot products with \\( \\mathbf{v}_k \\) in \\( \\sum c_i \\mathbf{v}_i = \\mathbf{0} \\) forces \\( c_k = 0 \\) in \\( \\mathbb{F}_2 \\), so \\( \\{\\mathbf{v}_1, \\dots, \\mathbf{v}_m\\} \\) are linearly independent in \\( \\mathbb{F}_2^n \\implies m \\le \\dim(\\mathbb{F}_2^n) = n \\)!', ar: '<strong>الخطوة 2 (الاستقلال الخطي):</strong> المتجهات مستقلة خطياً في الفضاء \\( \\mathbb{F}_2^n \\) ذي البعد \\( n \\)، وبالتالي \\( m \\le n \\) في ثلاث خطوات فقط!' }
    ]
  })
};

module.exports = { part2 };
