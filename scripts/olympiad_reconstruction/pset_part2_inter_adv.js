'use strict';

module.exports = [
  // ======================== INTERMEDIATE (28 - 36) ========================
  {
    number: 28,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 9 · NSMO Stage 2 · Cyclotomic Polynomial Remainder] Find the linear remainder \\( R(x) = ax + b \\) when \\( P(x) = x^{2026} + 2x^{1013} + 5 \\) is divided by \\( x^2 + x + 1 \\).',
      ar: '[الفصل 9 · نسما المرحلة 2 · باقي قسمة كثيرات الحدود الدورية] أوجد باقي القسمة الخطي \\( R(x) = ax + b \\) عند قسمة كثيرة الحدود \\( P(x) = x^{2026} + 2x^{1013} + 5 \\) على \\( x^2 + x + 1 \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Cube Roots of Unity Trick):</strong> Let \\( \\omega \\) be a primitive cube root of unity satisfying \\( \\omega^2 + \\omega + 1 = 0 \\), which implies \\( \\omega^3 = 1 \\). Write \\( P(x) = (x^2 + x + 1)Q(x) + ax + b \\) with \\( a, b \\in \\mathbb{R} \\).</p><p><strong>Step 2 (Reduce Exponents Modulo \\( 3 \\)):</strong> Since \\( 2026 = 3(675) + 1 \\equiv 1 \\pmod 3 \\) and \\( 1013 = 3(337) + 2 \\equiv 2 \\pmod 3 \\), evaluating at \\( x = \\omega \\) gives:<br>\\[ a\\omega + b = P(\\omega) = \\omega^1 + 2\\omega^2 + 5. \\]</p><p><strong>Step 3 (Use \\( \\omega^2 = -\\omega - 1 \\) &amp; Linear Independence):</strong><br>\\[ \\omega + 2(-\\omega - 1) + 5 = -\\omega + 3. \\]<br>Since \\( \\{1, \\omega\\} \\) is linearly independent over \\( \\mathbb{R} \\) (as \\( \\omega \\notin \\mathbb{R} \\)), comparing real coefficients gives \\( a = -1 \\) and \\( b = 3 \\).<br><strong>Final Answer:</strong> \\( R(x) = -x + 3 \\).</p>',
      ar: '<p><strong>الخطوة 1 (توظيف الجذور التكعيبية للواحد):</strong> ليكن \\( \\omega \\) جذراً تكعيبياً غير حقيقي للواحد يحقق \\( \\omega^2 + \\omega + 1 = 0 \\) ومن ثم \\( \\omega^3 = 1 \\). نكتب \\( P(x) = (x^2 + x + 1)Q(x) + ax + b \\) حيث \\( a, b \\in \\mathbb{R} \\).</p><p><strong>الخطوة 2 (اختزال الأسس بترديد \\( 3 \\)):</strong> بما أن \\( 2026 \\equiv 1 \\pmod 3 \\) و\\( 1013 \\equiv 2 \\pmod 3 \\)، فإن التعويض عند \\( x = \\omega \\) يعطي:<br>\\[ a\\omega + b = \\omega + 2\\omega^2 + 5. \\]</p><p><strong>الخطوة 3 (التعويض بـ \\( \\omega^2 = -\\omega - 1 \\)):</strong><br>\\[ a\\omega + b = \\omega + 2(-\\omega - 1) + 5 = -\\omega + 3. \\]<br>وبما أن \\( \\omega \\notin \\mathbb{R} \\) و\\( a, b \\in \\mathbb{R} \\)، نستنتج بمطابقة المعاملات أن \\( a = -1 \\) و\\( b = 3 \\).<br><strong>الإجابة النهائية:</strong> باقي القسمة هو \\( R(x) = -x + 3 \\).</p>'
    }
  },
  {
    number: 29,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 9 · NSMO Stage 2 · Euler\'s Triangle Formula] Right triangle \\( ABC \\) has legs \\( 8 \\) and \\( 15 \\). Find its circumradius \\( R \\), its inradius \\( r \\), and the exact distance \\( OI \\) between its circumcenter \\( O \\) and incenter \\( I \\).',
      ar: '[الفصل 9 · نسما المرحلة 2 · علاقة أويلر بين مركزَي الدائرتين] مثلث قائم الزاوية \\( ABC \\) طولا ضلعَي قائمته \\( 8 \\) و\\( 15 \\). أوجد نصف قطر دائرته المحيطة \\( R \\)، ونصف قطر دائرته الداخلية \\( r \\)، والمسافة الدقيقة \\( OI \\) بين مركزَي الدائرتين.'
    },
    solution: {
      en: '<p><strong>Step 1 (Hypotenuse, Circumradius &amp; Inradius):</strong> By Pythagoras, the hypotenuse is \\( c = \\sqrt{8^2 + 15^2} = \\sqrt{289} = 17 \\). In any right triangle:<br>\\[ R = \\frac{c}{2} = \\frac{17}{2}, \\qquad r = \\frac{a + b - c}{2} = \\frac{8 + 15 - 17}{2} = 3. \\]</p><p><strong>Step 2 (Euler\'s Distance Formula \\( OI^2 = R(R - 2r) \\)):</strong><br>\\[ OI^2 = \\frac{17}{2}\\left(\\frac{17}{2} - 6\\right) = \\frac{17}{2} \\cdot \\frac{5}{2} = \\frac{85}{4} \\implies OI = \\frac{\\sqrt{85}}{2}. \\]<br>(Coordinate verification: place \\( C = (0,0), B = (8,0), A = (0,15) \\); then \\( O = (4, 15/2) \\) and \\( I = (3, 3) \\), so \\( OI^2 = 1^2 + (9/2)^2 = 85/4 \\).)<br><strong>Final Answer:</strong> \\( R = \\frac{17}{2} \\), \\( r = 3 \\), and \\( OI = \\frac{\\sqrt{85}}{2} \\).</p>',
      ar: '<p><strong>الخطوة 1 (حساب الوتر ونصفَي القطرين \\( R \\) و\\( r \\)):</strong> حسب فيثاغورس \\( c = \\sqrt{8^2 + 15^2} = 17 \\). وفي أي مثلث قائم الزاوية:<br>\\[ R = \\frac{c}{2} = \\frac{17}{2}, \\qquad r = \\frac{a + b - c}{2} = \\frac{8 + 15 - 17}{2} = 3. \\]</p><p><strong>الخطوة 2 (تطبيق علاقة أويلر \\( OI^2 = R(R - 2r) \\)):</strong><br>\\[ OI^2 = \\frac{17}{2}\\left(\\frac{17}{2} - 6\\right) = \\frac{17}{2} \\cdot \\frac{5}{2} = \\frac{85}{4} \\implies OI = \\frac{\\sqrt{85}}{2}. \\]<br><strong>الإجابة النهائية:</strong> \\( R = \\frac{17}{2} \\)، و\\( r = 3 \\)، والمسافة \\( OI = \\frac{\\sqrt{85}}{2} \\).</p>'
    },
    fig: {
      type: 'triangle',
      A: [0, 8],
      B: [15, 0],
      C: [0, 0],
      rightAngleAt: 'C',
      labels: { A: 'A', B: 'B', C: 'C' },
      sides: { a: '15', b: '8', c: '17' }
    }
  },
  {
    number: 30,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 10 · NSMO Finals Bridge · Exponential Diophantine] Find ALL triples of positive integers \\( (x, y, z) \\) satisfying \\( 2^x + 3^y = z^2 \\).',
      ar: '[الفصل 10 · تمهيد نهائيات نسما · المعادلات الديوفانتية الأسية] أوجد جميع الثلاثيات من الأعداد الصحيحة الموجبة \\( (x, y, z) \\) التي تحقق المعادلة \\( 2^x + 3^y = z^2 \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Parity of \\( x \\) via Modulo \\( 3 \\)):</strong> Since \\( y \\ge 1 \\), reducing \\( 2^x + 3^y = z^2 \\) modulo \\( 3 \\) gives \\( (-1)^x \\equiv z^2 \\pmod 3 \\). Squares modulo \\( 3 \\) are \\( 0 \\) or \\( 1 \\), and \\( 3 \\nmid 2^x \\), so \\( (-1)^x \\equiv 1 \\pmod 3 \\), forcing \\( x = 2a \\) to be even (\\( a \\ge 1 \\)).</p><p><strong>Step 2 (Difference of Squares &amp; Coprimality):</strong> Rewrite as \\( (z - 2^a)(z + 2^a) = 3^y \\). Any common prime factor of \\( z - 2^a \\) and \\( z + 2^a \\) must divide both \\( 3^y \\) and their difference \\( 2^{a+1} \\); hence the two factors are coprime powers of \\( 3 \\), forcing:<br>\\[ z - 2^a = 1, \\qquad z + 2^a = 3^y \\implies 3^y - 1 = 2^{a+1}. \\]</p><p><strong>Step 3 (Bound \\( y \\) Modulo \\( 4 \\)):</strong> For \\( a = 1 \\), \\( 3^y = 5 \\) (no). For \\( a \\ge 2 \\), \\( 8 \\mid 2^{a+1} \\implies 3^y \\equiv 1 \\pmod 4 \\implies y = 2b \\) is even! Factoring again gives \\( (3^b - 1)(3^b + 1) = 2^{a+1} \\). Two powers of \\( 2 \\) differing by \\( 2 \\) must be \\( 2 \\) and \\( 4 \\), so \\( 3^b - 1 = 2 \\implies b = 1 \\implies y = 2,\\; a = 2,\\; x = 4,\\; z = 5 \\) (check: \\( 16 + 9 = 25 \\)).<br><strong>Final Answer:</strong> Unique positive solution \\( (x, y, z) = (4, 2, 5) \\).</p>',
      ar: '<p><strong>الخطوة 1 (إثبات زوجية \\( x \\) بترديد \\( 3 \\)):</strong> بما أن \\( y \\ge 1 \\)، يعطي الاختزال بترديد \\( 3 \\): \\( (-1)^x \\equiv z^2 \\equiv 1 \\pmod 3 \\)، ومن ثم \\( x = 2a \\) عدد زوجي (\\( a \\ge 1 \\)).</p><p><strong>الخطوة 2 (تحليل فرق المربعين):</strong> نكتب \\( (z - 2^a)(z + 2^a) = 3^y \\). بما أن الفرق بين العاملين هو \\( 2^{a+1} \\) ولا يقبل القسمة على \\( 3 \\)، يجب أن يكون الأصغر مساوياً لـ \\( 1 \\):<br>\\[ z - 2^a = 1, \\qquad z + 2^a = 3^y \\implies 3^y - 1 = 2^{a+1}. \\]</p><p><strong>الخطوة 3 (تحليل المعادلة الثنائية):</strong> عند \\( a = 1 \\) نجد \\( 3^y = 5 \\) (مرفوض). وعند \\( a \\ge 2 \\) يقتضي الترديد \\( \\pmod 4 \\) أن \\( y = 2b \\) زوجي، فيتحلل \\( (3^b - 1)(3^b + 1) = 2^{a+1} \\). قوتان للعدد \\( 2 \\) فرقهما \\( 2 \\) هما حصراً \\( 2 \\) و\\( 4 \\)، أي \\( 3^b - 1 = 2 \\implies b = 1 \\)، فنجد \\( y = 2,\\; x = 4,\\; z = 5 \\).<br><strong>الإجابة النهائية:</strong> الحل الموجب الوحيد هو \\( (4, 2, 5) \\).</p>'
    }
  },
  {
    number: 31,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 10 · Extremal Graph Theory · NSMO Stage 2/3] A communication network at a Mawhiba camp connects \\( 13 \\) routers such that no \\( 3 \\) routers are mutually connected (the graph is triangle-free). What is the maximum possible number of edges in this network, and what unique graph achieves it?',
      ar: '[الفصل 10 · نظرية البيان المتطرفة · نسما المرحلة 2/3] تربط شبكة اتصالات في معسكر موهبة بين \\( 13 \\) موجّهاً (رأساً) بحيث لا توجد أي \\( 3 \\) موجّهات متصلة ببعضها مثنى مثنى (بيان خالٍ من المثلثات). ما أكبر عدد ممكن من الوصلات (الأضلاع) في هذه الشبكة، وما البنية الوحيدة التي تحقق ذلك؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Mantel\'s Theorem Statement &amp; Proof Idea):</strong> Let \\( v \\) be a vertex of maximum degree \\( \\Delta \\) in a triangle-free graph \\( G = (V, E) \\) on \\( n \\) vertices, and let \\( A = N(v) \\) (\\( |A| = \\Delta \\)) and \\( B = V \\setminus A \\) (\\( |B| = n - \\Delta \\)). Because \\( G \\) is triangle-free, \\( A \\) contains NO internal edges! Every edge has at least one endpoint in \\( B \\), so:<br>\\[ |E| \\le \\sum_{u \\in B} \\deg(u) \\le |B| \\cdot \\Delta = \\Delta(n - \\Delta) \\le \\left\\lfloor \\frac{n^2}{4} \\right\\rfloor. \\]</p><p><strong>Step 2 (Evaluate at \\( n = 13 \\)):</strong> For \\( n = 13 \\), \\( \\Delta(13 - \\Delta) \\) is maximized at \\( \\Delta \\in \\{6, 7\\} \\), giving:<br>\\[ |E|_{\\max} = \\left\\lfloor \\frac{169}{4} \\right\\rfloor = 6 \\times 7 = 42. \\]</p><p><strong>Step 3 (Extremal Graph):</strong> Equality holds uniquely for the complete bipartite graph \\( K_{6, 7} \\).<br><strong>Final Answer:</strong> Maximum \\( 42 \\) edges, achieved uniquely by \\( K_{6, 7} \\).</p>',
      ar: '<p><strong>الخطوة 1 (مبرهنة مانتل للبيانات الخالية من المثلثات):</strong> ليكن \\( v \\) رأساً ذا أكبر درجة \\( \\Delta \\) في البيان \\( G \\) المكوّن من \\( n \\) رأساً، ولنضع \\( A = N(v) \\) و\\( B = V \\setminus A \\). لخلوّ البيان من المثلثات، لا يوجد أي ضلع داخل \\( A \\)! لذا فإن لكل ضلع طرفاً واحداً على الأقل في \\( B \\):<br>\\[ |E| \\le \\sum_{u \\in B} \\deg(u) \\le (n - \\Delta)\\Delta \\le \\left\\lfloor \\frac{n^2}{4} \\right\\rfloor. \\]</p><p><strong>الخطوة 2 (التعويض عند \\( n = 13 \\)):</strong> يتحقق الحد الأقصى عند \\( \\Delta \\in \\{6, 7\\} \\):<br>\\[ |E|_{\\max} = \\left\\lfloor \\frac{169}{4} \\right\\rfloor = 6 \\times 7 = 42. \\]</p><p><strong>الخطوة 3 (البنية الحدية الوحيدة):</strong> تتحقق المساواة حصراً في البيان الثنائي الكامل \\( K_{6, 7} \\).<br><strong>الإجابة النهائية:</strong> أكبر عدد أضلاع هو \\( 42 \\) في البيان \\( K_{6, 7} \\).</p>'
    },
    fig: {
      type: 'network_graph',
      title: 'Bipartite Triangle-Free Core Structure (K₃,₃ Sub-Illustration)',
      nodes: [
        { id: 'A1', x: 70, y: 40, label: 'U₁' },
        { id: 'A2', x: 70, y: 100, label: 'U₂' },
        { id: 'A3', x: 70, y: 160, label: 'U₃' },
        { id: 'B1', x: 260, y: 40, label: 'V₁' },
        { id: 'B2', x: 260, y: 100, label: 'V₂' },
        { id: 'B3', x: 260, y: 160, label: 'V₃' }
      ],
      edges: [
        { from: 'A1', to: 'B1' }, { from: 'A1', to: 'B2' }, { from: 'A1', to: 'B3' },
        { from: 'A2', to: 'B1' }, { from: 'A2', to: 'B2' }, { from: 'A2', to: 'B3' },
        { from: 'A3', to: 'B1' }, { from: 'A3', to: 'B2' }, { from: 'A3', to: 'B3' }
      ]
    }
  },
  {
    number: 32,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 11 · KAUST KMC Qualifier · Telescoping Arctangent Sum] Evaluate \\( S = \\sum_{k=1}^{10} \\arctan\\!\\left(\\frac{1}{k^2 + k + 1}\\right) \\) in the form \\( \\arctan(p/q) \\) for coprime positive integers \\( p, q \\).',
      ar: '[الفصل 11 · تصفيات مسابقة كاوست · مجموع دالة الظل العكسي المتداخل] احسب المجموع \\( S = \\sum_{k=1}^{10} \\arctan\\!\\left(\\frac{1}{k^2 + k + 1}\\right) \\) واكتبه على الصورة \\( \\arctan(p/q) \\) لعددين صحيحين موجبين أوليين نسبياً \\( p, q \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Arctangent Difference Identity):</strong> Recall that for \\( uv > -1 \\), \\( \\arctan u - \\arctan v = \\arctan\\!\\left(\\frac{u - v}{1 + uv}\\right) \\). Setting \\( u = k + 1 \\) and \\( v = k \\) yields:<br>\\[ \\arctan(k + 1) - \\arctan(k) = \\arctan\\!\\left(\\frac{(k + 1) - k}{1 + k(k + 1)}\\right) = \\arctan\\!\\left(\\frac{1}{k^2 + k + 1}\\right)! \\]</p><p><strong>Step 2 (Telescope from \\( k = 1 \\) to \\( 10 \\)):</strong><br>\\[ S = \\sum_{k=1}^{10} \\bigl(\\arctan(k + 1) - \\arctan(k)\\bigr) = \\arctan(11) - \\arctan(1). \\]</p><p><strong>Step 3 (Recombine into a Single Arctangent):</strong><br>\\[ S = \\arctan\\!\\left(\\frac{11 - 1}{1 + 11 \\cdot 1}\\right) = \\arctan\\!\\left(\\frac{10}{12}\\right) = \\arctan\\!\\left(\\frac{5}{6}\\right). \\]<br><strong>Final Answer:</strong> \\( \\arctan\\!\\left(\\frac{5}{6}\\right) \\) (so \\( p = 5, q = 6 \\)).</p>',
      ar: '<p><strong>الخطوة 1 (متطابقة فرق قوس الظل):</strong> نعلم أنه عندما \\( uv > -1 \\) يتحقق \\( \\arctan u - \\arctan v = \\arctan\\!\\left(\\frac{u - v}{1 + uv}\\right) \\). بوضع \\( u = k + 1 \\) و\\( v = k \\) نحصل على:<br>\\[ \\arctan\\!\\left(\\frac{1}{k^2 + k + 1}\\right) = \\arctan(k + 1) - \\arctan(k). \\]</p><p><strong>الخطوة 2 (الجمع التلسكوبي من \\( k = 1 \\) إلى \\( 10 \\)):</strong><br>\\[ S = \\arctan(11) - \\arctan(1). \\]</p><p><strong>الخطوة 3 (دمج الناتج في قوس ظل واحد):</strong><br>\\[ S = \\arctan\\!\\left(\\frac{11 - 1}{1 + 11(1)}\\right) = \\arctan\\!\\left(\\frac{10}{12}\\right) = \\arctan\\!\\left(\\frac{5}{6}\\right). \\]<br><strong>الإجابة النهائية:</strong> \\( \\arctan\\!\\left(\\frac{5}{6}\\right) \\).</p>'
    }
  },
  {
    number: 33,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 11 · KAUST KMC Qualifier · Weighted Binomial Identity] Compute the exact integer value of \\( W = \\sum_{k=1}^{12} k^2 \\binom{12}{k} \\).',
      ar: '[الفصل 11 · تصفيات مسابقة كاوست · المجاميع التوافقية الموزونة] احسب القيمة الصحيحة الدقيقة للمجموع التوافقي \\( W = \\sum_{k=1}^{12} k^2 \\binom{12}{k} \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Falling-Factorial Decomposition):</strong> Decompose \\( k^2 = k(k - 1) + k \\) and apply the absorption identities \\( k\\binom{n}{k} = n\\binom{n-1}{k-1} \\) and \\( k(k - 1)\\binom{n}{k} = n(n - 1)\\binom{n-2}{k-2} \\).</p><p><strong>Step 2 (Sum Over All Subsets):</strong> For general \\( n \\):<br>\\[ \\sum_{k=1}^{n} k^2 \\binom{n}{k} = n(n - 1) \\sum_{k=2}^{n} \\binom{n-2}{k-2} + n \\sum_{k=1}^{n} \\binom{n-1}{k-1} = n(n - 1)2^{n-2} + n 2^{n-1} = n(n + 1)2^{n-2}. \\]</p><p><strong>Step 3 (Evaluate at \\( n = 12 \\)):</strong><br>\\[ W = 12 \\times 13 \\times 2^{10} = 156 \\times 1024 = 159744. \\]<br><strong>Final Answer:</strong> \\( 159744 \\).</p>',
      ar: '<p><strong>الخطوة 1 (تفكيك \\( k^2 \\) إلى قوى هابطة):</strong> نكتب \\( k^2 = k(k - 1) + k \\) ونطبّق متطابقتَي الامتصاص \\( k\\binom{n}{k} = n\\binom{n-1}{k-1} \\) و\\( k(k - 1)\\binom{n}{k} = n(n - 1)\\binom{n-2}{k-2} \\).</p><p><strong>الخطوة 2 (حساب المجموع بدلالة \\( n \\)):</strong><br>\\[ \\sum_{k=1}^{n} k^2 \\binom{n}{k} = n(n - 1)2^{n-2} + n 2^{n-1} = n(n + 1)2^{n-2}. \\]</p><p><strong>الخطوة 3 (التعويض عند \\( n = 12 \\)):</strong><br>\\[ W = 12 \\times 13 \\times 2^{10} = 156 \\times 1024 = 159744. \\]<br><strong>الإجابة النهائية:</strong> \\( 159744 \\).</p>'
    }
  },
  {
    number: 34,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 12 · KAUST Relay · Radical Axis & Common Chord] Circles \\( \\omega_1 : (x - 1)^2 + (y - 2)^2 = 25 \\) and \\( \\omega_2 : (x - 5)^2 + (y - 4)^2 = 29 \\) intersect at two points \\( A \\) and \\( B \\). Find the equation of the radical axis \\( AB \\) and the exact length of the common chord \\( AB \\).',
      ar: '[الفصل 12 · جولة التتابع في كاوست · المحور الأساسي والوتر المشترك] تتقاطع الدائرتان \\( \\omega_1 : (x - 1)^2 + (y - 2)^2 = 25 \\) و\\( \\omega_2 : (x - 5)^2 + (y - 4)^2 = 29 \\) في نقطتين \\( A \\) و\\( B \\). أوجد معادلة المحور الأساسي \\( AB \\) والطول الدقيق للوتر المشترك \\( AB \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Subtract Circle Equations to Isolate the Radical Axis):</strong> Expand both equations in standard power form:<br>• \\( \\omega_1 : x^2 + y^2 - 2x - 4y - 20 = 0 \\)<br>• \\( \\omega_2 : x^2 + y^2 - 10x - 8y + 12 = 0 \\).<br>Subtracting \\( \\omega_2 \\) from \\( \\omega_1 \\) cancels \\( x^2 + y^2 \\):<br>\\[ 8x + 4y - 32 = 0 \\iff 2x + y = 8. \\]</p><p><strong>Step 2 (Distance from Center \\( O_1(1, 2) \\) to Line \\( 2x + y - 8 = 0 \\)):</strong><br>\\[ d = \\frac{|2(1) + 1(2) - 8|}{\\sqrt{2^2 + 1^2}} = \\frac{4}{\\sqrt{5}}. \\]</p><p><strong>Step 3 (Chord Length by Pythagoras in \\( \\omega_1 \\) of Radius \\( R_1 = 5 \\)):</strong><br>\\[ AB = 2\\sqrt{R_1^2 - d^2} = 2\\sqrt{25 - \\frac{16}{5}} = 2\\sqrt{\\frac{109}{5}} = \\frac{2\\sqrt{545}}{5}. \\]<br><strong>Final Answer:</strong> Radical axis \\( 2x + y = 8 \\); chord length \\( AB = \\frac{2\\sqrt{545}}{5} \\).</p>',
      ar: '<p><strong>الخطوة 1 (طرح معادلتَي الدائرتين لإيجاد المحور الأساسي):</strong> نفك المعادلتين:<br>• \\( \\omega_1 : x^2 + y^2 - 2x - 4y - 20 = 0 \\)<br>• \\( \\omega_2 : x^2 + y^2 - 10x - 8y + 12 = 0 \\).<br>بطرح المعادلتين تختفي الحدود التربيعية:<br>\\[ 8x + 4y - 32 = 0 \\iff 2x + y = 8. \\]</p><p><strong>الخطوة 2 (بُعد المركز \\( O_1(1, 2) \\) عن المستقيم \\( 2x + y - 8 = 0 \\)):</strong><br>\\[ d = \\frac{|2(1) + 2 - 8|}{\\sqrt{2^2 + 1^2}} = \\frac{4}{\\sqrt{5}}. \\]</p><p><strong>الخطوة 3 (حساب طول الوتر المشترك بنظرية فيثاغورس مع \\( R_1 = 5 \\)):</strong><br>\\[ AB = 2\\sqrt{25 - \\frac{16}{5}} = 2\\sqrt{\\frac{109}{5}} = \\frac{2\\sqrt{545}}{5}. \\]<br><strong>الإجابة النهائية:</strong> المحور الأساسي \\( 2x + y = 8 \\)، وطول الوتر \\( AB = \\frac{2\\sqrt{545}}{5} \\).</p>'
    },
    fig: {
      type: 'circle',
      r: 5,
      center: ['O₁', '(1, 2)'],
      title: 'Circle ω₁ (R₁ = 5) Cut by Radical Axis 2x + y = 8'
    }
  },
  {
    number: 35,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 7 · Olympiad Trigonometric Products · AMC 12 / KMC] Without a calculator, prove the exact values of \\( P = \\cos 20^\\circ \\cos 40^\\circ \\cos 80^\\circ \\) and \\( Q = \\sin 20^\\circ \\sin 40^\\circ \\sin 80^\\circ \\).',
      ar: '[الفصل 7 · الجداءات المثلثية الأولمبية · مسابقة كاوست] دون استخدام آلة حاسبة، أثبت وأوجد القيمتين الدقيقتين لكلٍّ من \\( P = \\cos 20^\\circ \\cos 40^\\circ \\cos 80^\\circ \\) و\\( Q = \\sin 20^\\circ \\sin 40^\\circ \\sin 80^\\circ \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Doubling-Angle Cascade for \\( P \\)):</strong> Multiply \\( P \\) by \\( 8\\sin 20^\\circ \\neq 0 \\) and apply \\( 2\\sin\\theta\\cos\\theta = \\sin 2\\theta \\) three times:<br>\\[ (8\\sin 20^\\circ) P = 4(\\sin 40^\\circ)\\cos 40^\\circ \\cos 80^\\circ = 2(\\sin 80^\\circ)\\cos 80^\\circ = \\sin 160^\\circ. \\]<br>Since \\( \\sin 160^\\circ = \\sin(180^\\circ - 20^\\circ) = \\sin 20^\\circ \\), dividing by \\( 8\\sin 20^\\circ \\) gives \\( P = \\frac{1}{8} \\)!</p><p><strong>Step 2 (Triple-Angle Identity for \\( Q \\)):</strong> Using \\( \\sin(60^\\circ - \\theta)\\sin(60^\\circ + \\theta) = \\sin^2 60^\\circ - \\sin^2\\theta = \\frac{3}{4} - \\sin^2\\theta \\), multiplying by \\( 4\\sin\\theta \\) yields:<br>\\[ 4\\sin\\theta \\sin(60^\\circ - \\theta)\\sin(60^\\circ + \\theta) = 3\\sin\\theta - 4\\sin^3\\theta = \\sin(3\\theta). \\]</p><p><strong>Step 3 (Evaluate at \\( \\theta = 20^\\circ \\)):</strong> Setting \\( \\theta = 20^\\circ \\) gives \\( 4 Q = \\sin 60^\\circ = \\frac{\\sqrt{3}}{2} \\implies Q = \\frac{\\sqrt{3}}{8} \\).<br><strong>Final Answer:</strong> \\( P = \\frac{1}{8} \\) and \\( Q = \\frac{\\sqrt{3}}{8} \\).</p>',
      ar: '<p><strong>الخطوة 1 (متتالية ضعف الزاوية لحساب \\( P \\)):</strong> نضرب \\( P \\) في \\( 8\\sin 20^\\circ \\neq 0 \\) ونطبّق \\( 2\\sin\\theta\\cos\\theta = \\sin 2\\theta \\) ثلاث مرات متتالية:<br>\\[ 8\\sin 20^\\circ \\cdot P = 4\\sin 40^\\circ \\cos 40^\\circ \\cos 80^\\circ = 2\\sin 80^\\circ \\cos 80^\\circ = \\sin 160^\\circ = \\sin 20^\\circ. \\]<br>بقسمة الطرفين على \\( 8\\sin 20^\\circ \\) نجد \\( P = \\frac{1}{8} \\)!</p><p><strong>الخطوة 2 (متطابقة ثلاثة أمثال الزاوية لحساب \\( Q \\)):</strong> نلاحظ أن \\( \\sin(60^\\circ - \\theta)\\sin(60^\\circ + \\theta) = \\sin^2 60^\\circ - \\sin^2\\theta = \\frac{3}{4} - \\sin^2\\theta \\)، وبضرب الطرفين في \\( 4\\sin\\theta \\) نحصل على:<br>\\[ 4\\sin\\theta \\sin(60^\\circ - \\theta)\\sin(60^\\circ + \\theta) = 3\\sin\\theta - 4\\sin^3\\theta = \\sin(3\\theta). \\]</p><p><strong>الخطوة 3 (التعويض عند \\( \\theta = 20^\\circ \\)):</strong> نجد \\( 4Q = \\sin 60^\\circ = \\frac{\\sqrt{3}}{2} \\implies Q = \\frac{\\sqrt{3}}{8} \\).<br><strong>الإجابة النهائية:</strong> \\( P = \\frac{1}{8} \\) و\\( Q = \\frac{\\sqrt{3}}{8} \\).</p>'
    },
    fig: {
      type: 'fn',
      title: 'Triple-Angle Wave sin(3x) = 4 sin(x) sin(π/3 − x) sin(π/3 + x)',
      xrange: [0, 3.2],
      yrange: [-1.2, 1.2],
      fns: [
        { fn: 'Math.sin(3*x)', label: 'y = sin(3x)' },
        { fn: 'Math.sin(x)', label: 'y = sin(x)' }
      ],
      points: [{ x: 0.3491, y: 0.866, label: 'x = 20°' }]
    }
  },
  {
    number: 36,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 8 · Combinatorial Game Strategy · NSMO Stage 2] Two players, Sara and Omar, play a game with a pile of \\( 100 \\) stones. Sara moves first, and on each turn a player must remove \\( 1, 2, 3, 4, \\) or \\( 5 \\) stones; the player who takes the last stone wins. Who has a guaranteed winning strategy, and what exact move must be played on Turn 1?',
      ar: '[الفصل 8 · استراتيجيات الألعاب التوافقية · نسما المرحلة 2] تلعب سارة وعمر لعبة بكومة تحوي \\( 100 \\) حجر. تبدأ سارة أولاً، وفي كل دور يسحب اللاعب \\( 1 \\) أو \\( 2 \\) أو \\( 3 \\) أو \\( 4 \\) أو \\( 5 \\) أحجار، ويفوز من يسحب الحجر الأخير. من يملك استراتيجية فوز مضمونة، وما الحركة الدقيقة الواجبة في الدور الأول؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Classify P-Positions and N-Positions Modulo \\( 6 \\)):</strong> Since the allowed move set is \\( \\{1, 2, 3, 4, 5\\} \\) of max size \\( 5 \\), the critical period is \\( 1 + 5 = 6 \\):<br>• \\( n = 0 \\) is a losing position (P-position).<br>• From any \\( n \\equiv r \\not\\equiv 0 \\pmod 6 \\) (\\( r \\in \\{1, 2, 3, 4, 5\\} \\)), removing \\( r \\) stones lands on a multiple of \\( 6 \\).<br>• From any multiple \\( 6k \\), whatever \\( m \\in \\{1, \\dots, 5\\} \\) the opponent removes leaves \\( 6k - m \\not\\equiv 0 \\pmod 6 \\), allowing the winning player to remove \\( 6 - m \\) and restore a multiple of \\( 6 \\)!</p><p><strong>Step 2 (Analyze \\( n = 100 \\)):</strong> Compute \\( 100 = 6 \\times 16 + 4 \\equiv 4 \\pmod 6 \\). Since \\( 100 \\not\\equiv 0 \\pmod 6 \\), \\( 100 \\) is a winning N-position for the first player (Sara)!</p><p><strong>Step 3 (Unique Winning Opening Move):</strong> Sara MUST remove \\( 4 \\) stones on Turn 1 to leave \\( 96 = 6 \\times 16 \\), and thereafter reply \\( 6 - m \\) to every move \\( m \\) of Omar until she takes the final stone.<br><strong>Final Answer:</strong> Sara wins by removing \\( 4 \\) stones on Turn 1.</p>',
      ar: '<p><strong>الخطوة 1 (تصنيف المواضع الرابحة والخاسرة بترديد \\( 6 \\)):</strong> بما أن أقصى سحب هو \\( 5 \\) وأدناه \\( 1 \\)، فإن الدورة الحاكمة هي \\( 1 + 5 = 6 \\). المواضع الخاسرة (P-positions) هي مضاعفات \\( 6 \\) تماماً؛ لأن أي سحب \\( m \\in \\{1, \\dots, 5\\} \\) من مضاعف لـ \\( 6 \\) يترك عدداً غير قابل للقسمة على \\( 6 \\)، ومن أي عدد غير مضاعف لـ \\( 6 \\) يمكن سحب الباقي للعودة إلى مضاعف لـ \\( 6 \\)!</p><p><strong>الخطوة 2 (تحليل العدد الابتدائي \\( 100 \\)):</strong> بما أن \\( 100 = 6 \\times 16 + 4 \\equiv 4 \\pmod 6 \\)، فالبداية موضع رابح للاعبة الأولى (سارة).</p><p><strong>الخطوة 3 (الحركة الافتتاحية الوحيدة للربح):</strong> تسحب سارة \\( 4 \\) أحجار في الدور الأول لتترك \\( 96 \\) حجراً، ثم ترد دائماً بسحب \\( 6 - m \\) مقابل كل سحب \\( m \\) لعمر.<br><strong>الإجابة النهائية:</strong> تفوز سارة بسحب \\( 4 \\) أحجار في الدور الأول.</p>'
    }
  },

  // ======================== ADVANCED (37 - 54) ========================
  {
    number: 37,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 1 · Nesbitt\'s Inequality & Cyclic Cauchy-Schwarz · NSMO Finals] Let \\( a, b, c > 0 \\) satisfy \\( a + b + c = 6 \\). Prove Nesbitt\'s inequality \\( \\frac{a}{b + c} + \\frac{b}{c + a} + \\frac{c}{a + b} \\ge \\frac{3}{2} \\), and determine the minimum possible value of \\( K = \\frac{a^2}{b + c} + \\frac{b^2}{c + a} + \\frac{c^2}{a + b} \\).',
      ar: '[الفصل 1 · متباينة نسبيت وكوشي-شوارتز الدورية · نهائيات نسما] لتكن \\( a, b, c > 0 \\) أعداداً حقيقية موجبة تحقق \\( a + b + c = 6 \\). أثبت متباينة نسبيت \\( \\frac{a}{b + c} + \\frac{b}{c + a} + \\frac{c}{a + b} \\ge \\frac{3}{2} \\)، ثم أوجد القيمة الصغرى الدقيقة للمقدار \\( K = \\frac{a^2}{b + c} + \\frac{b^2}{c + a} + \\frac{c^2}{a + b} \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Proof of Nesbitt\'s Inequality):</strong> Add \\( 1 \\) to each of the three cyclic fractions and let \\( S = a + b + c \\):<br>\\[ \\left(\\sum_{\\text{cyc}} \\frac{a}{b + c}\\right) + 3 = \\sum_{\\text{cyc}} \\frac{a + b + c}{b + c} = S \\sum_{\\text{cyc}} \\frac{1}{b + c}. \\]<br>Since \\( 2S = (b + c) + (c + a) + (a + b) \\), applying Cauchy-Schwarz \\( \\bigl(\\sum (b+c)\\bigr)\\bigl(\\sum \\frac{1}{b+c}\\bigr) \\ge (1 + 1 + 1)^2 = 9 \\) gives \\( S \\sum \\frac{1}{b+c} \\ge \\frac{9}{2} \\). Subtracting \\( 3 \\) yields \\( \\sum_{\\text{cyc}} \\frac{a}{b + c} \\ge \\frac{9}{2} - 3 = \\frac{3}{2} \\)!</p><p><strong>Step 2 (Minimize \\( K \\) via Titu\'s Lemma):</strong> Apply Titu\'s Lemma directly to \\( K \\):<br>\\[ K = \\frac{a^2}{b + c} + \\frac{b^2}{c + a} + \\frac{c^2}{a + b} \\ge \\frac{(a + b + c)^2}{(b + c) + (c + a) + (a + b)} = \\frac{a + b + c}{2}. \\]</p><p><strong>Step 3 (Substitute \\( a + b + c = 6 \\)):</strong> \\( K_{\\min} = \\frac{6}{2} = 3 \\), attained uniquely at \\( a = b = c = 2 \\).<br><strong>Final Answer:</strong> Nesbitt bound \\( \\frac{3}{2} \\); minimum \\( K = 3 \\) at \\( (2, 2, 2) \\).</p>',
      ar: '<p><strong>الخطوة 1 (برهان متباينة نسبيت):</strong> نضيف \\( 1 \\) إلى كل كسر من الكسور الثلاثة مع وضع \\( S = a + b + c \\):<br>\\[ \\left(\\sum_{\\text{cyc}} \\frac{a}{b + c}\\right) + 3 = S\\left(\\frac{1}{b + c} + \\frac{1}{c + a} + \\frac{1}{a + b}\\right). \\]<br>وبما أن \\( (b+c) + (c+a) + (a+b) = 2S \\)، تعطي متباينة كوشي-شوارتز \\( 2S \\sum \\frac{1}{b+c} \\ge 9 \\implies S \\sum \\frac{1}{b+c} \\ge \\frac{9}{2} \\)، وبطرح \\( 3 \\) ينتج \\( \\frac{3}{2} \\)!</p><p><strong>الخطوة 2 (إيجاد القيمة الصغرى لـ \\( K \\) بمتباينة تيتو):</strong><br>\\[ K = \\sum_{\\text{cyc}} \\frac{a^2}{b + c} \\ge \\frac{(a + b + c)^2}{2(a + b + c)} = \\frac{a + b + c}{2}. \\]</p><p><strong>الخطوة 3 (التعويض بـ \\( a + b + c = 6 \\)):</strong> نجد \\( K_{\\min} = \\frac{6}{2} = 3 \\) وتتحقق عند \\( a = b = c = 2 \\).<br><strong>الإجابة النهائية:</strong> القيمة الصغرى لـ \\( K \\) تساوي \\( 3 \\).</p>'
    },
    fig: {
      type: 'fn',
      title: 'Symmetric Slice K(x) for (a, b, c) = (x, (6−x)/2, (6−x)/2) Attaining Minimum 3 at x = 2',
      xrange: [0.3, 5.4],
      yrange: [2.5, 9],
      fns: [{ fn: 'x*x/(6 - x) + 2*((6 - x)/2)*((6 - x)/2)/(x + (6 - x)/2)', label: 'y = K(x)' }],
      points: [{ x: 2, y: 3, label: 'Min (2, 3)' }]
    }
  },
  {
    number: 38,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 1 · Quintic Newton Sums · KAUST Finals] Find ALL ordered pairs of real numbers \\( (x, y) \\) satisfying the symmetric system \\( x + y = 3 \\) and \\( x^5 + y^5 = 33 \\).',
      ar: '[الفصل 1 · مجاميع نيوتن من الدرجة الخامسة · نهائيات كاوست] أوجد جميع الأزواج المرتبة من الأعداد الحقيقية \\( (x, y) \\) التي تحقق النظام المتماثل \\( x + y = 3 \\) و\\( x^5 + y^5 = 33 \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Express \\( x^5 + y^5 \\) in Terms of \\( s = x + y = 3 \\) and \\( p = xy \\)):</strong> Compute lower power sums iteratively:<br>• \\( p_2 = x^2 + y^2 = s^2 - 2p = 9 - 2p \\)<br>• \\( p_3 = x^3 + y^3 = s^3 - 3sp = 27 - 9p \\)<br>• Using \\( p_5 = p_2 p_3 - x^2 y^2 (x + y) \\):<br>\\[ x^5 + y^5 = (9 - 2p)(27 - 9p) - 3p^2 = 243 - 135p + 18p^2 - 3p^2 = 15p^2 - 135p + 243. \\]</p><p><strong>Step 2 (Solve the Quadratic in \\( p \\)):</strong> Setting \\( 15p^2 - 135p + 243 = 33 \\):<br>\\[ 15p^2 - 135p + 210 = 0 \\iff p^2 - 9p + 14 = 0 \\iff (p - 2)(p - 7) = 0. \\]</p><p><strong>Step 3 (Filter by Real-Root Discriminant):</strong> Real \\( x, y \\) satisfy \\( t^2 - 3t + p = 0 \\), which has real roots iff \\( \\Delta = 9 - 4p \\ge 0 \\). Thus \\( p = 7 \\) gives complex non-real roots (\\( \\Delta = -19 < 0 \\)), while \\( p = 2 \\) gives \\( t^2 - 3t + 2 = (t - 1)(t - 2) = 0 \\).<br><strong>Final Answer:</strong> Two real pairs: \\( (1, 2) \\) and \\( (2, 1) \\).</p>',
      ar: '<p><strong>الخطوة 1 (كتابة \\( x^5 + y^5 \\) بدلالة \\( s = x + y = 3 \\) و\\( p = xy \\)):</strong> نحسب مجاميع القوى تباعاً:<br>• \\( x^2 + y^2 = 9 - 2p \\)<br>• \\( x^3 + y^3 = 27 - 9p \\)<br>• ومن العلاقة \\( x^5 + y^5 = (x^2 + y^2)(x^3 + y^3) - x^2 y^2 (x + y) \\):<br>\\[ x^5 + y^5 = (9 - 2p)(27 - 9p) - 3p^2 = 15p^2 - 135p + 243. \\]</p><p><strong>الخطوة 2 (حل معادلة الجداء \\( p \\)):</strong> بمساواة الناتج بـ \\( 33 \\) والقسمة على \\( 15 \\):<br>\\[ p^2 - 9p + 14 = 0 \\iff (p - 2)(p - 7) = 0. \\]</p><p><strong>الخطوة 3 (شرط الجذور الحقيقية للمميز):</strong> المعادلة \\( t^2 - 3t + p = 0 \\) تقبل جذوراً حقيقية إذا وفقط إذا كان \\( \\Delta = 9 - 4p \\ge 0 \\)، لذا نستبعد \\( p = 7 \\) ونقبل \\( p = 2 \\) الذي يعطي \\( (t - 1)(t - 2) = 0 \\).<br><strong>الإجابة النهائية:</strong> الزوجان الحقيقيان \\( (1, 2) \\) و\\( (2, 1) \\).</p>'
    }
  },
  {
    number: 39,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 2 · Lifting the Exponent Lemma (LTE) · NSMO Riyadh Finals] Compute the exact \\( 3 \\)-adic valuation \\( v_3(7^{81} - 1) \\), and determine the smallest positive integer \\( n \\) such that \\( 3^6 \\mid (7^n - 1) \\).',
      ar: '[الفصل 2 · توطئة رفع الأس (LTE) · نهائيات نسما الوطنية] احسب التقييم الأولي الدقيق \\( v_3(7^{81} - 1) \\)، وحدّد أصغر عدد صحيح موجب \\( n \\) يحقق \\( 3^6 \\mid (7^n - 1) \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Verify LTE Hypotheses for Odd Prime \\( p = 3 \\)):</strong> Here \\( p = 3 \\) is an odd prime, \\( 3 \\nmid 7 \\), \\( 3 \\nmid 1 \\), and \\( 3 \\mid (7 - 1) = 6 \\). By the Lifting the Exponent Lemma:<br>\\[ v_3(7^n - 1^n) = v_3(7 - 1) + v_3(n) = 1 + v_3(n) \\quad \\text{for EVERY } n \\ge 1! \\]</p><p><strong>Step 2 (Evaluate at \\( n = 81 = 3^4 \\)):</strong><br>\\[ v_3(7^{81} - 1) = 1 + v_3(3^4) = 1 + 4 = 5 \\quad (\\text{so } 3^5 = 243 \\parallel 7^{81} - 1). \\]</p><p><strong>Step 3 (Minimal \\( n \\) for \\( 3^6 \\mid (7^n - 1) \\)):</strong> We require \\( v_3(7^n - 1) \\ge 6 \\iff 1 + v_3(n) \\ge 6 \\iff v_3(n) \\ge 5 \\iff 3^5 \\mid n \\). Thus the smallest positive integer \\( n \\) is \\( 3^5 = 243 \\).<br><strong>Final Answer:</strong> \\( v_3(7^{81} - 1) = 5 \\) and \\( n_{\\min} = 243 \\).</p>',
      ar: '<p><strong>الخطوة 1 (التحقق من شروط توطئة LTE للعدد الأولي الفردي \\( p = 3 \\)):</strong> بما أن \\( 3 \\nmid 7 \\) و\\( 3 \\mid (7 - 1) = 6 \\)، تنطبق توطئة رفع الأس لأي عدد صحيح موجب \\( n \\):<br>\\[ v_3(7^n - 1) = v_3(7 - 1) + v_3(n) = 1 + v_3(n). \\]</p><p><strong>الخطوة 2 (التعويض عند \\( n = 81 = 3^4 \\)):</strong><br>\\[ v_3(7^{81} - 1) = 1 + 4 = 5. \\]</p><p><strong>الخطوة 3 (إيجاد أصغر \\( n \\) يحقق \\( 3^6 \\mid (7^n - 1) \\)):</strong> نحتاج \\( 1 + v_3(n) \\ge 6 \\iff v_3(n) \\ge 5 \\iff 3^5 \\mid n \\)، ومنه أصغر عدد موجب هو \\( n = 3^5 = 243 \\).<br><strong>الإجابة النهائية:</strong> \\( v_3(7^{81} - 1) = 5 \\) وأصغر قيمة هي \\( n = 243 \\).</p>'
    }
  },
  {
    number: 40,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 2 · Lucas\'s Theorem Modulo Primes · Mawhiba IMO Camp] Using Lucas\'s Theorem in base \\( 13 \\), find the remainders when \\( \\binom{2026}{1013} \\) and \\( \\binom{2026}{850} \\) are each divided by \\( 13 \\).',
      ar: '[الفصل 2 · مبرهنة لوكاس بترديد الأعداد الأولية · معسكر موهبة الدولي] باستخدام مبرهنة لوكاس في نظام العد ذي الأساس \\( 13 \\)، أوجد باقي قسمة كلٍّ من \\( \\binom{2026}{1013} \\) و\\( \\binom{2026}{850} \\) على العدد الأولي \\( 13 \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Base-\\( 13 \\) Expansions):</strong> Since \\( 13^2 = 169 \\):<br>• \\( 2026 = 11(169) + 12(13) + 11 = (11, 12, 11)_{13} \\)<br>• \\( 1013 = 5(169) + 12(13) + 12 = (5, 12, 12)_{13} \\)<br>• \\( 850 = 5(169) + 0(13) + 5 = (5, 0, 5)_{13} \\).</p><p><strong>Step 2 (Apply Lucas\'s Theorem to \\( \\binom{2026}{1013} \\)):</strong><br>\\[ \\binom{2026}{1013} \\equiv \\binom{11}{5}\\binom{12}{12}\\binom{11}{12} \\equiv 0 \\pmod{13} \\]<br>because in the units digit \\( 12 > 11 \\implies \\binom{11}{12} = 0 \\)!</p><p><strong>Step 3 (Apply Lucas\'s Theorem to \\( \\binom{2026}{850} \\)):</strong><br>\\[ \\binom{2026}{850} \\equiv \\binom{11}{5}\\binom{12}{0}\\binom{11}{5} = 462 \\times 1 \\times 462 \\pmod{13}. \\]<br>Since \\( 462 = 13 \\times 35 + 7 \\equiv 7 \\pmod{13} \\), we get \\( 7^2 = 49 \\equiv 10 \\pmod{13} \\).<br><strong>Final Answer:</strong> Remainders \\( 0 \\) and \\( 10 \\), respectively.</p>',
      ar: '<p><strong>الخطوة 1 (التمثيل في الأساس \\( 13 \\) حيث \\( 13^2 = 169 \\)):</strong><br>• \\( 2026 = 11(169) + 12(13) + 11 = (11, 12, 11)_{13} \\)<br>• \\( 1013 = 5(169) + 12(13) + 12 = (5, 12, 12)_{13} \\)<br>• \\( 850 = 5(169) + 0(13) + 5 = (5, 0, 5)_{13} \\).</p><p><strong>الخطوة 2 (تطبيق مبرهنة لوكاس على \\( \\binom{2026}{1013} \\)):</strong><br>\\[ \\binom{2026}{1013} \\equiv \\binom{11}{5}\\binom{12}{12}\\binom{11}{12} = 0 \\pmod{13} \\]<br>لأن خانة الآحاد تحقق \\( 12 > 11 \\) فيكون \\( \\binom{11}{12} = 0 \\)!</p><p><strong>الخطوة 3 (تطبيق مبرهنة لوكاس على \\( \\binom{2026}{850} \\)):</strong><br>\\[ \\binom{2026}{850} \\equiv \\binom{11}{5}\\binom{12}{0}\\binom{11}{5} = 462^2 \\equiv 7^2 = 49 \\equiv 10 \\pmod{13}. \\]<br><strong>الإجابة النهائية:</strong> الباقيان هما \\( 0 \\) و\\( 10 \\) على الترتيب.</p>'
    }
  },
  {
    number: 41,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 3 · Vieta Root Flipping · IMO 1988 Legend / NSMO Finals] Suppose positive integers \\( a, b \\) satisfy \\( (ab + 1) \\mid (a^2 + b^2) \\). Prove via Vieta jumping that \\( k = \\frac{a^2 + b^2}{ab + 1} \\) MUST be a perfect square, and list the first three ordered pairs \\( (a, b) \\) with \\( 0 \\le a < b \\) when \\( k = 4 \\).',
      ar: '[الفصل 3 · القفز الفييتي · أسطورة IMO 1988 ونهائيات نسما] إذا كان \\( a, b \\) عددين صحيحين موجبين يحققان \\( (ab + 1) \\mid (a^2 + b^2) \\)، فأثبت عبر القفز الفييتي أن خارج القسمة \\( k = \\frac{a^2 + b^2}{ab + 1} \\) يجب أن يكون مربعاً كاملاً، واذكر أول ثلاثة أزواج \\( 0 \\le a < b \\) عندما \\( k = 4 \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Minimal Counterexample Setup):</strong> Fix a non-square positive integer \\( k \\) and suppose solutions exist; choose a solution \\( (a, b) \\in (\\mathbb{Z}_{\\ge 0})^2 \\) minimizing \\( a + b \\) with \\( a \\ge b \\). If \\( b = 0 \\), then \\( k = a^2 \\), a square! Thus \\( a \\ge b \\ge 1 \\), and \\( a > b \\) (since \\( a = b \\implies k = \\frac{2b^2}{b^2 + 1} < 2 \\implies k = 1 = 1^2 \\)).</p><p><strong>Step 2 (Vieta Root Flip):</strong> View \\( a \\) as a root of \\( x^2 - kbx + (b^2 - k) = 0 \\). Its second root \\( x_2 \\) satisfies:<br>\\[ x_2 = kb - a \\in \\mathbb{Z}, \\qquad a x_2 = b^2 - k. \\]<br>Since \\( k \\) is NOT a square, \\( x_2 \\neq 0 \\). If \\( x_2 < 0 \\), then \\( x_2 \\le -1 \\implies x_2^2 - kbx_2 + b^2 - k \\ge 1 + kb + b^2 - k > 0 \\), impossible! Hence \\( x_2 \\ge 1 \\), and minimality forces \\( x_2 \\ge a \\implies \\frac{b^2 - k}{a} \\ge a \\implies b^2 - k \\ge a^2 \\), contradicting \\( a > b \\)! Thus \\( k = m^2 \\) MUST be a square.</p><p><strong>Step 3 (Generate the \\( k = 4 \\) Ladder from \\( (0, 2) \\)):</strong> Using \\( (a, b) \\mapsto (b, 4b - a) \\) starting at \\( (0, 2) \\):<br>• \\( (0, 2) \\to (2, 8) \\to (8, 30) \\) (check \\( (8, 30) \\): \\( \\frac{64 + 900}{240 + 1} = \\frac{964}{241} = 4 \\)!).<br><strong>Final Answer:</strong> \\( k \\) is always a perfect square; for \\( k = 4 \\), the first three pairs are \\( (0, 2),\\; (2, 8),\\; (8, 30) \\).</p>',
      ar: '<p><strong>الخطوة 1 (اختيار الحل الأصغر على فرض أن \\( k \\) ليس مربعاً):</strong> نفرض جدلاً وجود حلول لقيمة \\( k \\) غير مربعة، ونختار الزوج \\( (a, b) \\) في \\( \\mathbb{Z}_{\\ge 0}^2 \\) الذي يصغّر المجموع \\( a + b \\) مع \\( a \\ge b \\). لا يمكن أن يكون \\( b = 0 \\) وإلا كان \\( k = a^2 \\) مربعاً كاملاً، ولا \\( a = b \\) لأن \\( \\frac{2b^2}{b^2 + 1} < 2 \\implies k = 1 \\). إذن \\( a > b \\ge 1 \\).</p><p><strong>الخطوة 2 (قلب الجذر الفييتي والوصول للتناقض):</strong> باعتبار \\( a \\) جذراً للمعادلة \\( x^2 - kbx + (b^2 - k) = 0 \\)، يحقق الجذر الثاني \\( x_2 = kb - a \\in \\mathbb{Z} \\) و\\( ax_2 = b^2 - k \\). لا يساوي \\( x_2 \\) صفراً لأن \\( k \\) ليس مربعاً، ولو كان \\( x_2 \\le -1 \\) لكان \\( x_2^2 - kbx_2 + b^2 - k \\ge 1 + k(b - 1) + b^2 > 0 \\) مستحيلاً! إذن \\( x_2 \\ge 1 \\)، لكن \\( x_2 = \\frac{b^2 - k}{a} < \\frac{b^2}{a} < b < a \\)، مما يعطي حلاً موجب المكونات أصغر مجموعاً — تناقض!</p><p><strong>الخطوة 3 (توليد سلم الحلول عند \\( k = 4 \\)):</strong> بالانطلاق من \\( (0, 2) \\) وتطبيق \\( (a, b) \\mapsto (b, 4b - a) \\) نحصل على \\( (0, 2),\\; (2, 8),\\; (8, 30) \\).<br><strong>الإجابة النهائية:</strong> \\( k \\) مربع كامل دائماً؛ وعند \\( k = 4 \\) الأزواج الثلاثة الأولى هي \\( (0, 2),\\; (2, 8),\\; (8, 30) \\).</p>'
    }
  },
  {
    number: 42,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 4 · Symmetry & Vandermonde\'s Convolution · KAUST Finals] Prove a closed-form binomial expression for \\( S_n = \\sum_{k=0}^{n} k \\binom{n}{k}^2 \\), and compute the exact integer value of \\( S_{10} \\).',
      ar: '[الفصل 4 · التناظر ولفّ فاندرموند التوافقي · نهائيات كاوست] استنتج صيغة مغلقة للمجموع \\( S_n = \\sum_{k=0}^{n} k \\binom{n}{k}^2 \\)، ثم احسب القيمة الصحيحة الدقيقة لـ \\( S_{10} \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Index Reversal Symmetry):</strong> Replace \\( k \\) by \\( n - k \\) and use \\( \\binom{n}{n-k} = \\binom{n}{k} \\):<br>\\[ S_n = \\sum_{k=0}^{n} (n - k)\\binom{n}{n-k}^2 = n \\sum_{k=0}^{n} \\binom{n}{k}^2 - S_n \\implies 2 S_n = n \\sum_{k=0}^{n} \\binom{n}{k}^2. \\]</p><p><strong>Step 2 (Vandermonde\'s Convolution):</strong> Since \\( \\sum_{k=0}^{n} \\binom{n}{k}\\binom{n}{n-k} = \\binom{2n}{n} \\) (choosing \\( n \\) people from \\( n \\) men and \\( n \\) women), we obtain:<br>\\[ S_n = \\frac{n}{2} \\binom{2n}{n} \\quad \\left(\\text{equivalently } n \\binom{2n - 1}{n - 1}\\right). \\]</p><p><strong>Step 3 (Evaluate at \\( n = 10 \\)):</strong> Since \\( \\binom{20}{10} = 184756 \\):<br>\\[ S_{10} = \\frac{10}{2} \\times 184756 = 5 \\times 184756 = 923780. \\]<br><strong>Final Answer:</strong> \\( S_n = \\frac{n}{2}\\binom{2n}{n} \\) and \\( S_{10} = 923780 \\).</p>',
      ar: '<p><strong>الخطوة 1 (تناظر عكس الدليل \\( k \\leftrightarrow n - k \\)):</strong> باستخدام \\( \\binom{n}{n-k} = \\binom{n}{k} \\):<br>\\[ S_n = \\sum_{k=0}^{n} (n - k)\\binom{n}{k}^2 = n \\sum_{k=0}^{n} \\binom{n}{k}^2 - S_n \\implies 2S_n = n \\sum_{k=0}^{n} \\binom{n}{k}^2. \\]</p><p><strong>الخطوة 2 (تطبيق متطابقة فاندرموند):</strong> نعلم أن \\( \\sum_{k=0}^{n} \\binom{n}{k}^2 = \\binom{2n}{n} \\)، ومنه:<br>\\[ S_n = \\frac{n}{2}\\binom{2n}{n}. \\]</p><p><strong>الخطوة 3 (التعويض عند \\( n = 10 \\)):</strong> بما أن \\( \\binom{20}{10} = 184756 \\)، نجد \\( S_{10} = 5 \\times 184756 = 923780 \\).<br><strong>الإجابة النهائية:</strong> \\( S_{10} = 923780 \\).</p>'
    }
  },
  {
    number: 43,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 4 · Catalan Numbers & Reflection Principle · NSMO Finals] Consider sequences \\( (a_1, a_2, \\dots, a_{12}) \\in \\{+1, -1\\}^{12} \\) with total sum \\( 0 \\). (a) How many have ALL partial sums \\( s_m = a_1 + \\dots + a_m \\ge 0 \\) for \\( 1 \\le m \\le 12 \\)? (b) How many have STRICTLY positive interior partial sums \\( s_m > 0 \\) for every \\( 1 \\le m \\le 11 \\)?',
      ar: '[الفصل 4 · أعداد كاتالان ومبدأ الانعكاس · نهائيات نسما] نعتبر المتتاليات \\( (a_1, a_2, \\dots, a_{12}) \\in \\{+1, -1\\}^{12} \\) التي مجموعها الكلي \\( 0 \\). (أ) كم متتالية تحقق \\( s_m = a_1 + \\dots + a_m \\ge 0 \\) لكل \\( 1 \\le m \\le 12 \\)؟ (ب) كم متتالية تحقق مجاميع جزئية موجبة قطعاً \\( s_m > 0 \\) لكل \\( 1 \\le m \\le 11 \\)؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Part (a) — Catalan Dyck Paths via André\'s Reflection):</strong> A sequence of six \\( +1 \\)\'s and six \\( -1 \\)\'s is a Dyck path of semilength \\( n = 6 \\). Reflecting any path after its first hit of \\( y = -1 \\) bijects bad paths onto paths of six \\( +1 \\)\'s and six \\( -1 \\)\'s transformed into five \\( +1 \\)\'s and seven \\( -1 \\)\'s:<br>\\[ C_6 = \\binom{12}{6} - \\binom{12}{5} = \\frac{1}{7}\\binom{12}{6} = \\frac{924}{7} = 132. \\]</p><p><strong>Step 2 (Part (b) — Elevated Primitive Dyck Paths):</strong> Every sequence of length \\( 12 \\) with \\( s_m > 0 \\) for \\( 1 \\le m \\le 11 \\) MUST begin with \\( a_1 = +1 \\) (so \\( s_1 = 1 \\)) and end with \\( a_{12} = -1 \\) (since \\( s_{11} = 1 \\)). Stripping \\( a_1 \\) and \\( a_{12} \\) leaves a sequence \\( (a_2, \\dots, a_{11}) \\) of length \\( 10 \\) whose partial sums never drop below \\( 0 \\) — an unrestricted Dyck path of semilength \\( 5 \\)!</p><p><strong>Step 3 (Compute \\( C_5 \\)):</strong> \\( C_5 = \\frac{1}{6}\\binom{10}{5} = \\frac{252}{6} = 42 \\).<br><strong>Final Answer:</strong> (a) \\( 132 \\); (b) \\( 42 \\).</p>',
      ar: '<p><strong>الخطوة 1 (الفرع أ — مسارات دايك وأعداد كاتالان بمبدأ الانعكاس):</strong> المتتالية المكوّنة من ست إشارات \\( +1 \\) وست إشارات \\( -1 \\) دون هبوط تحت الصفر تمثّل عدد كاتالان السادس:<br>\\[ C_6 = \\binom{12}{6} - \\binom{12}{5} = \\frac{1}{7}\\binom{12}{6} = \\frac{924}{7} = 132. \\]</p><p><strong>الخطوة 2 (الفرع ب — المسارات الأولية المرتفعة فوق الصفر):</strong> لكي يظل \\( s_m \\ge 1 \\) لكل \\( 1 \\le m \\le 11 \\)، يجب أن تبدأ المتتالية بـ \\( a_1 = +1 \\) وتنتهي بـ \\( a_{12} = -1 \\). بحذف الحدين الأول والأخير نحصل على تقابل تام مع مسارات دايك التي طولها \\( 10 \\) (أي \\( n = 5 \\))!</p><p><strong>الخطوة 3 (حساب \\( C_5 \\)):</strong> \\( C_5 = \\frac{1}{6}\\binom{10}{5} = \\frac{252}{6} = 42 \\).<br><strong>الإجابة النهائية:</strong> (أ) \\( 132 \\)؛ (ب) \\( 42 \\).</p>'
    },
    fig: {
      type: 'bar',
      title: 'Catalan Number Growth C₁ through C₆',
      data: [
        { label: 'C₁', val: 1 },
        { label: 'C₂', val: 2 },
        { label: 'C₃', val: 5 },
        { label: 'C₄', val: 14 },
        { label: 'C₅', val: 42 },
        { label: 'C₆', val: 132 }
      ]
    }
  },
  {
    number: 44,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 5 · Characteristic Roots & Modular Periodicity · KAUST Finals] Define \\( (a_n)_{n \\ge 0} \\) by \\( a_0 = 2 \\), \\( a_1 = 5 \\), and \\( a_n = 5a_{n-1} - 6a_{n-2} \\) for \\( n \\ge 2 \\). Derive the closed form of \\( a_n \\) and find the last two decimal digits of \\( a_{2026} \\).',
      ar: '[الفصل 5 · المعادلة المميزة والدورية المعيارية · نهائيات كاوست] عُرِّفت المتتالية \\( (a_n)_{n \\ge 0} \\) بالشروط \\( a_0 = 2 \\)، و\\( a_1 = 5 \\)، و\\( a_n = 5a_{n-1} - 6a_{n-2} \\) لكل \\( n \\ge 2 \\). استنتج الصيغة الصريحة للحد العام \\( a_n \\)، ثم أوجد آخر خانتين عشريتين للعدد \\( a_{2026} \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Characteristic Polynomial):</strong> Solving \\( r^2 - 5r + 6 = (r - 2)(r - 3) = 0 \\) gives roots \\( 2, 3 \\), so \\( a_n = A \\cdot 2^n + B \\cdot 3^n \\). Matching \\( a_0 = A + B = 2 \\) and \\( a_1 = 2A + 3B = 5 \\) gives \\( A = 1, B = 1 \\), so \\( a_n = 2^n + 3^n \\).</p><p><strong>Step 2 (Compute \\( 2^{2026} \\pmod{100} \\) via CRT on \\( 4 \\) and \\( 25 \\)):</strong> Clearly \\( 2^{2026} \\equiv 0 \\pmod 4 \\). Modulo \\( 25 \\), Euler\'s totient gives \\( \\varphi(25) = 20 \\), so \\( 2^{20} \\equiv 1 \\pmod{25} \\). Since \\( 2026 = 20(101) + 6 \\), \\( 2^{2026} \\equiv 2^6 = 64 \\equiv 14 \\pmod{25} \\). Combining \\( 0 \\pmod 4 \\) and \\( 14 \\pmod{25} \\) gives \\( 2^{2026} \\equiv 64 \\pmod{100} \\).</p><p><strong>Step 3 (Compute \\( 3^{2026} \\pmod{100} \\) and Sum):</strong> Since \\( \\gcd(3, 100) = 1 \\) and \\( \\lambda(100) = \\operatorname{lcm}(\\varphi(4), \\varphi(25)) = 20 \\), \\( 3^{20} \\equiv 1 \\pmod{100} \\). Thus \\( 3^{2026} \\equiv 3^6 = 729 \\equiv 29 \\pmod{100} \\). Adding:<br>\\[ a_{2026} \\equiv 64 + 29 = 93 \\pmod{100}. \\]<br><strong>Final Answer:</strong> \\( a_n = 2^n + 3^n \\); last two digits of \\( a_{2026} \\) are \\( 93 \\).</p>',
      ar: '<p><strong>الخطوة 1 (المعادلة المميزة والصيغة الصريحة):</strong> جذرا \\( r^2 - 5r + 6 = 0 \\) هما \\( 2 \\) و\\( 3 \\)، فيكون \\( a_n = A \\cdot 2^n + B \\cdot 3^n \\). من \\( a_0 = 2 \\) و\\( a_1 = 5 \\) نجد \\( A = B = 1 \\)، أي \\( a_n = 2^n + 3^n \\).</p><p><strong>الخطوة 2 (حساب \\( 2^{2026} \\pmod{100} \\) عبر \\( 4 \\) و\\( 25 \\)):</strong> لدينا \\( 2^{2026} \\equiv 0 \\pmod 4 \\)، وبترديد \\( 25 \\) تعطينا مبرهنة أويلر \\( 2^{20} \\equiv 1 \\pmod{25} \\)؛ وبما أن \\( 2026 \\equiv 6 \\pmod{20} \\) فإن \\( 2^{2026} \\equiv 2^6 = 64 \\pmod{100} \\).</p><p><strong>الخطوة 3 (حساب \\( 3^{2026} \\pmod{100} \\) والجمع):</strong> بما أن \\( \\gcd(3, 100) = 1 \\) ودالة كارمايكل \\( \\lambda(100) = 20 \\)، فإن \\( 3^{2026} \\equiv 3^6 = 729 \\equiv 29 \\pmod{100} \\). وبجمع الباقيين:<br>\\[ a_{2026} \\equiv 64 + 29 = 93 \\pmod{100}. \\]<br><strong>الإجابة النهائية:</strong> \\( a_n = 2^n + 3^n \\)، وآخر خانتين هما \\( 93 \\).</p>'
    }
  },
  {
    number: 45,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 6 · Orthocenter Similarity & Circumradius · NSMO Riyadh Finals] Acute triangle \\( ABC \\) has side lengths \\( AB = 13 \\), \\( BC = 14 \\), and \\( CA = 15 \\). Altitudes \\( AD, BE, CF \\) concur at orthocenter \\( H \\) (with \\( D \\in BC \\)). Compute exact values for \\( [ABC] \\), the circumradius \\( R \\), segments \\( AH \\) and \\( HD \\), and verify that the reflection \\( H\' \\) of \\( H \\) across \\( BC \\) lies on the circumcircle \\( (ABC) \\) using Power of a Point!',
      ar: '[الفصل 6 · مركز التعامد وقوة النقطة وانعكاسه · نهائيات نسما الوطنية] مثلث حاد الزوايا \\( ABC \\) أطوال أضلاعه \\( AB = 13 \\)، و\\( BC = 14 \\)، و\\( CA = 15 \\). تلتقي ارتفاعاته \\( AD, BE, CF \\) في مركز التعامد \\( H \\) (حيث \\( D \\in BC \\)). احسب القيم الدقيقة للمساحة \\( [ABC] \\)، ونصف القطر المحيط \\( R \\)، وطولَي \\( AH \\) و\\( HD \\)، وتحقق عبر قوة النقطة من وقوع انعكاس \\( H \\) حول \\( BC \\) على الدائرة المحيطة \\( (ABC) \\)!'
    },
    solution: {
      en: '<p><strong>Step 1 (Heron\'s Area, Altitude \\( AD \\) &amp; Circumradius \\( R \\)):</strong> With semiperimeter \\( s = \\frac{13 + 14 + 15}{2} = 21 \\):<br>\\[ [ABC] = \\sqrt{21(8)(7)(6)} = 84, \\qquad AD = \\frac{2[ABC]}{BC} = \\frac{168}{14} = 12, \\qquad R = \\frac{abc}{4[ABC]} = \\frac{13 \\cdot 14 \\cdot 15}{336} = \\frac{65}{8}. \\]<br>By Pythagoras in \\( \\triangle ABD \\) and \\( \\triangle ACD \\), \\( BD = \\sqrt{13^2 - 12^2} = 5 \\) and \\( DC = 9 \\).</p><p><strong>Step 2 (Orthocenter Segments via \\( \\triangle BDH \\sim \\triangle ADC \\)):</strong> Since \\( \\angle BHD = 90^\\circ - \\angle HBD = \\angle C \\), right triangles \\( \\triangle BDH \\) and \\( \\triangle ADC \\) are similar:<br>\\[ \\frac{HD}{BD} = \\frac{DC}{AD} \\implies HD = \\frac{5 \\times 9}{12} = \\frac{15}{4}, \\qquad AH = AD - HD = 12 - \\frac{15}{4} = \\frac{33}{4}. \\]</p><p><strong>Step 3 (Circumcircle Reflection Verification):</strong> Let line \\( AD \\) meet \\( (ABC) \\) again at \\( K \\). By Intersecting Chords at \\( D \\):<br>\\[ AD \\cdot DK = BD \\cdot DC = 5 \\times 9 = 45 \\implies DK = \\frac{45}{12} = \\frac{15}{4} = HD! \\]<br>Hence \\( K = H\' \\), confirming \\( DH\' = HD \\)!<br><strong>Final Answer:</strong> \\( [ABC] = 84 \\), \\( R = \\frac{65}{8} \\), \\( AH = \\frac{33}{4} \\), \\( HD = \\frac{15}{4} \\).</p>',
      ar: '<p><strong>الخطوة 1 (صيغة هيرون، الارتفاع \\( AD \\)، ونصف القطر \\( R \\)):</strong> نصف المحيط \\( s = 21 \\)، ومنه:<br>\\[ [ABC] = \\sqrt{21(8)(7)(6)} = 84, \\qquad AD = \\frac{168}{14} = 12, \\qquad R = \\frac{13 \\cdot 14 \\cdot 15}{4(84)} = \\frac{65}{8}. \\]<br>ومن فيثاغورس نجد \\( BD = 5 \\) و\\( DC = 9 \\).</p><p><strong>الخطوة 2 (تشابه المثلثين القائمين \\( \\triangle BDH \\sim \\triangle ADC \\)):</strong> بما أن \\( \\angle BHD = \\angle C \\)، فإن:<br>\\[ \\frac{HD}{BD} = \\frac{DC}{AD} \\implies HD = \\frac{5 \\times 9}{12} = \\frac{15}{4}, \\qquad AH = 12 - \\frac{15}{4} = \\frac{33}{4}. \\]</p><p><strong>الخطوة 3 (التحقق من انعكاس مركز التعامد بقوة النقطة \\( D \\)):</strong> إذا قطع \\( AD \\) الدائرة المحيطة ثانيةً في \\( K \\)، فإن مبرهنة الأوتار المتقاطعة عند \\( D \\) تعطي \\( AD \\cdot DK = BD \\cdot DC = 45 \\implies DK = \\frac{45}{12} = \\frac{15}{4} = HD \\)، أي أن \\( K \\) هي انعكاس \\( H \\) حول \\( BC \\) تماماً!<br><strong>الإجابة النهائية:</strong> \\( [ABC] = 84 \\)، \\( R = \\frac{65}{8} \\)، \\( AH = \\frac{33}{4} \\)، \\( HD = \\frac{15}{4} \\).</p>'
    },
    fig: {
      type: 'triangle',
      A: [5, 12],
      B: [0, 0],
      C: [14, 0],
      labels: { A: 'A', B: 'B', C: 'C' },
      sides: { c: '13', a: '14 (BD=5, DC=9)', b: '15' }
    }
  },
  {
    number: 46,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 6 · Tangent Circles & Ford/Descartes Curvature · KAUST Finals] Externally tangent circles \\( \\omega_1 \\) (radius \\( r_1 = 4 \\)) and \\( \\omega_2 \\) (radius \\( r_2 = 9 \\)) both touch line \\( \\ell \\) on the same side at points \\( A \\) and \\( B \\). Find (a) the segment \\( AB \\), and (b) the exact radius \\( r_3 \\) of the smaller circle \\( \\omega_3 \\) externally tangent to \\( \\omega_1, \\omega_2 \\), and \\( \\ell \\).',
      ar: '[الفصل 6 · الدوائر المتماسة وانحناء فورد-ديكارت · نهائيات كاوست] دائرتان متماستان من الخارج \\( \\omega_1 \\) (نصف قطرها \\( r_1 = 4 \\)) و\\( \\omega_2 \\) (نصف قطرها \\( r_2 = 9 \\)) تمسان المستقيم \\( \\ell \\) في الجهة نفسها عند النقطتين \\( A \\) و\\( B \\). أوجد: (أ) طول القطعة \\( AB \\)، و(ب) نصف القطر الدقيق \\( r_3 \\) للدائرة الصغيرة \\( \\omega_3 \\) المماسة من الخارج لكلٍّ من \\( \\omega_1 \\) و\\( \\omega_2 \\) والمستقيم \\( \\ell \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (External Common Tangent Formula):</strong> Drop a perpendicular from \\( O_1 \\) to the radius \\( O_2 B \\) of \\( \\omega_2 \\). This forms a right triangle with hypotenuse \\( O_1 O_2 = r_1 + r_2 \\) and vertical leg \\( |r_2 - r_1| \\), so the horizontal leg \\( AB \\) satisfies:<br>\\[ AB = \\sqrt{(r_1 + r_2)^2 - (r_2 - r_1)^2} = 2\\sqrt{r_1 r_2} = 2\\sqrt{4 \\times 9} = 12. \\]</p><p><strong>Step 2 (Apply the Tangent-Segment Additive Law to \\( \\omega_3 \\)):</strong> Let \\( \\omega_3 \\) touch \\( \\ell \\) at \\( C \\) between \\( A \\) and \\( B \\). Applying the exact same lemma to \\( (\\omega_1, \\omega_3) \\) and \\( (\\omega_3, \\omega_2) \\) gives \\( AC = 2\\sqrt{r_1 r_3} \\) and \\( CB = 2\\sqrt{r_3 r_2} \\). Since \\( AC + CB = AB \\):<br>\\[ 2\\sqrt{r_1 r_3} + 2\\sqrt{r_3 r_2} = 2\\sqrt{r_1 r_2} \\implies \\frac{1}{\\sqrt{r_3}} = \\frac{1}{\\sqrt{r_1}} + \\frac{1}{\\sqrt{r_2}}! \\]</p><p><strong>Step 3 (Compute \\( r_3 \\)):</strong> \\( \\frac{1}{\\sqrt{r_3}} = \\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6} \\implies \\sqrt{r_3} = \\frac{6}{5} \\implies r_3 = \\frac{36}{25} \\).<br><strong>Final Answer:</strong> (a) \\( AB = 12 \\); (b) \\( r_3 = \\frac{36}{25} \\).</p>',
      ar: '<p><strong>الخطوة 1 (صيغة طول قطعة المماس المشترك الخارجي):</strong> بإسقاط عمود من \\( O_1 \\) على نصف القطر \\( O_2 B \\) نحصل على مثلث قائم وتره \\( r_1 + r_2 \\) وضلع قائمته الرأسي \\( |r_2 - r_1| \\)، فيكون:<br>\\[ AB = \\sqrt{(r_1 + r_2)^2 - (r_2 - r_1)^2} = 2\\sqrt{r_1 r_2} = 2\\sqrt{4 \\times 9} = 12. \\]</p><p><strong>الخطوة 2 (علاقة جمع الجذور العكسية للدائرة المحصورة \\( \\omega_3 \\)):</strong> إذا مست \\( \\omega_3 \\) المستقيم \\( \\ell \\) في \\( C \\) بين \\( A \\) و\\( B \\)، فإن \\( AC + CB = AB \\) تعطي:<br>\\[ 2\\sqrt{r_1 r_3} + 2\\sqrt{r_3 r_2} = 2\\sqrt{r_1 r_2} \\implies \\frac{1}{\\sqrt{r_3}} = \\frac{1}{\\sqrt{r_1}} + \\frac{1}{\\sqrt{r_2}}. \\]</p><p><strong>الخطوة 3 (حساب \\( r_3 \\)):</strong> \\( \\frac{1}{\\sqrt{r_3}} = \\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6} \\implies r_3 = \\frac{36}{25} \\).<br><strong>الإجابة النهائية:</strong> (أ) \\( AB = 12 \\)؛ (ب) \\( r_3 = \\frac{36}{25} \\).</p>'
    },
    fig: {
      type: 'circle',
      r: 9,
      center: ['O₂', 'r₂ = 9'],
      title: 'Ford–Descartes Tangent Circle Configuration (AB = 2√(r₁r₂) = 12)'
    }
  },
  {
    number: 47,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 7 · Langley\'s Adventitious Angles · Olympiad Geometry Classic] In isosceles \\( \\triangle ABC \\) with \\( AB = AC \\) and apex angle \\( \\angle BAC = 20^\\circ \\), point \\( D \\) lies on \\( AC \\) with \\( \\angle DBC = 60^\\circ \\) and point \\( E \\) lies on \\( AB \\) with \\( \\angle ECB = 50^\\circ \\). Prove synthetically (via an auxiliary equilateral triangle) that \\( \\angle EDB = 30^\\circ \\).',
      ar: '[الفصل 7 · مسألة لانغلي الشهيرة للزوايا الأولمبية · كلاسيكيات الأولمبياد] في المثلث المتطابق الضلعين \\( \\triangle ABC \\) حيث \\( AB = AC \\) وزاوية الرأس \\( \\angle BAC = 20^\\circ \\)، تقع \\( D \\) على \\( AC \\) بحيث \\( \\angle DBC = 60^\\circ \\) وتقع \\( E \\) على \\( AB \\) بحيث \\( \\angle ECB = 50^\\circ \\). أثبت هندسياً (عبر إنشاء مثلث متطابق الأضلاع مساعد) أن \\( \\angle EDB = 30^\\circ \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Hidden Isosceles Triangles from \\( 80^\\circ \\) Base Angles):</strong> Here \\( \\angle ABC = \\angle ACB = 80^\\circ \\). In \\( \\triangle EBC \\), \\( \\angle BEC = 180^\\circ - 80^\\circ - 50^\\circ = 50^\\circ = \\angle ECB \\), so \\( BC = BE \\)!</p><p><strong>Step 2 (Auxiliary Point \\( F \\) Creating an Equilateral Triangle):</strong> Choose \\( F \\) on \\( AC \\) such that \\( \\angle FBC = 20^\\circ \\). In \\( \\triangle FBC \\), \\( \\angle BFC = 180^\\circ - 20^\\circ - 80^\\circ = 80^\\circ = \\angle C \\), so \\( BF = BC = BE \\)! Moreover, \\( \\angle EBF = \\angle ABC - \\angle FBC = 80^\\circ - 20^\\circ = 60^\\circ \\). Since \\( BE = BF \\) with included angle \\( 60^\\circ \\), \\( \\triangle EBF \\) is <strong>equilateral</strong> (\\( EF = BF = BE \\))!</p><p><strong>Step 3 (Isosceles \\( \\triangle BFD \\) and \\( \\triangle FDE \\)):</strong> In \\( \\triangle BFD \\), \\( \\angle DBF = 60^\\circ - 20^\\circ = 40^\\circ \\) and \\( \\angle BDF = 180^\\circ - 60^\\circ - 80^\\circ = 40^\\circ \\), so \\( DF = BF = EF \\)! Thus \\( \\triangle FDE \\) is isosceles with \\( FD = FE \\) and apex angle \\( \\angle DFE = 180^\\circ - \\angle BFC - \\angle BFE = 180^\\circ - 80^\\circ - 60^\\circ = 40^\\circ \\). Hence \\( \\angle FDE = \\frac{180^\\circ - 40^\\circ}{2} = 70^\\circ \\), giving:<br>\\[ \\angle EDB = \\angle FDE - \\angle BDF = 70^\\circ - 40^\\circ = 30^\\circ! \\]<br><strong>Final Answer:</strong> \\( \\angle EDB = 30^\\circ \\).</p>',
      ar: '<p><strong>الخطوة 1 (اكتشاف المثلث المتطابق الضلعين الأول):</strong> زاويتا القاعدة هما \\( \\angle B = \\angle C = 80^\\circ \\). في \\( \\triangle EBC \\) نجد \\( \\angle BEC = 180^\\circ - 80^\\circ - 50^\\circ = 50^\\circ = \\angle ECB \\)، إذن \\( BC = BE \\)!</p><p><strong>الخطوة 2 (إنشاء النقطة المساعدة \\( F \\) والمثلث المتطابق الأضلاع):</strong> نختار \\( F \\) على \\( AC \\) بحيث \\( \\angle FBC = 20^\\circ \\)، فيكون \\( \\angle BFC = 80^\\circ = \\angle C \\implies BF = BC = BE \\). وبما أن \\( \\angle EBF = 80^\\circ - 20^\\circ = 60^\\circ \\)، فإن المثلث \\( \\triangle EBF \\) <strong>متطابق الأضلاع</strong> (\\( EF = BF = BE \\))!</p><p><strong>الخطوة 3 (تساوي الساقين في \\( \\triangle BFD \\) و\\( \\triangle FDE \\)):</strong> في \\( \\triangle BFD \\) لدينا \\( \\angle DBF = 40^\\circ \\) و\\( \\angle BDF = 180^\\circ - 60^\\circ - 80^\\circ = 40^\\circ \\)، أي \\( DF = BF = EF \\)! وفي المثلث المتطابق الضلعين \\( \\triangle FDE \\) زاوية الرأس \\( \\angle DFE = 180^\\circ - 80^\\circ - 60^\\circ = 40^\\circ \\)، فتكون زاوية القاعدة \\( \\angle FDE = 70^\\circ \\)، ومن ثم:<br>\\[ \\angle EDB = \\angle FDE - \\angle BDF = 70^\\circ - 40^\\circ = 30^\\circ! \\]<br><strong>الإجابة النهائية:</strong> \\( \\angle EDB = 30^\\circ \\).</p>'
    },
    fig: {
      type: 'triangle',
      A: [3, 14],
      B: [0, 0],
      C: [6, 0],
      labels: { A: 'A (20°)', B: 'B (80°)', C: 'C (80°)' },
      sides: { c: 'AB (E on AB)', a: 'BC', b: 'AC (D on AC)' }
    }
  },
  {
    number: 48,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 8 · Extremal Principle on Graphs · Mawhiba IMO Selection] Prove that for EVERY finite simple graph \\( G = (V, E) \\), there exists a partition \\( V = V_1 \\sqcup V_2 \\) such that every vertex \\( v \\in V \\) has at least half of its neighbors in the opposite part, and deduce \\( |E(V_1, V_2)| \\ge \\frac{1}{2}|E| \\). What is the exact maximum bipartite cut size when \\( G = K_7 \\)?',
      ar: '[الفصل 8 · مبدأ القيم القصوى في نظرية البيان · تصفية المنتخب الدولي موهبة] أثبت أنه لأي بيان بسيط منتهٍ \\( G = (V, E) \\) يوجد تجزيء للرؤوس \\( V = V_1 \\sqcup V_2 \\) بحيث يرتبط كل رأس \\( v \\in V \\) بنصف جيرانه على الأقل في الجزء المقابل، واستنتج أن \\( |E(V_1, V_2)| \\ge \\frac{1}{2}|E| \\). وما أكبر عدد أضلاع لقطع ثنائي عندما \\( G = K_7 \\)؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Extremal Choice — Maximize the Cut):</strong> Since \\( V \\) is finite, there are finitely many partitions \\( (V_1, V_2) \\) (at most \\( 2^{|V|} \\)). Choose an extremal partition \\( (V_1^*, V_2^*) \\) that <strong>maximizes</strong> the number of crossing edges \\( |E(V_1, V_2)| \\).</p><p><strong>Step 2 (Local Flip Contradiction):</strong> Take any vertex \\( v \\in V_1^* \\); let \\( d_{\\text{in}}(v) \\) be its neighbors in \\( V_1^* \\) and \\( d_{\\text{across}}(v) \\) its neighbors in \\( V_2^* \\). If \\( d_{\\text{across}}(v) < \\frac{1}{2}\\deg(v) \\), then \\( d_{\\text{in}}(v) > d_{\\text{across}}(v) \\). Moving \\( v \\) from \\( V_1^* \\) to \\( V_2^* \\) changes the cut size by \\( +d_{\\text{in}}(v) - d_{\\text{across}}(v) \\ge 1 \\), contradicting maximality! Hence \\( d_{\\text{across}}(v) \\ge \\frac{1}{2}\\deg(v) \\) for all \\( v \\). Summing over \\( v \\in V \\) gives \\( 2|E(V_1^*, V_2^*)| = \\sum_{v} d_{\\text{across}}(v) \\ge \\frac{1}{2}\\sum_v \\deg(v) = |E| \\implies |E(V_1^*, V_2^*)| \\ge \\frac{1}{2}|E| \\).</p><p><strong>Step 3 (Exact Maximum Cut of \\( K_7 \\)):</strong> Partitioning \\( 7 \\) vertices into sizes \\( k \\) and \\( 7 - k \\) gives \\( k(7 - k) \\) crossing edges, maximized at \\( \\{3, 4\\} \\) with \\( 3 \\times 4 = 12 \\) edges (exceeding \\( \\frac{1}{2}\\binom{7}{2} = 10.5 \\)).<br><strong>Final Answer:</strong> Proven by extremal cut; max cut of \\( K_7 \\) is \\( 12 \\).</p>',
      ar: '<p><strong>الخطوة 1 (اختيار التجزيء الأقصى):</strong> بما أن عدد التجزيئات منتهٍ، نختار التجزيء \\( (V_1^*, V_2^*) \\) الذي <strong>يعظّم</strong> عدد الأضلاع العابرة \\( |E(V_1, V_2)| \\).</p><p><strong>الخطوة 2 (برهان التناقض بنقل رأس واحد):</strong> لأي رأس \\( v \\in V_1^* \\)، لو كان عدد جيرانه في الجزء المقابل أقل من نصف درجته، لكان عدد جيرانه داخل \\( V_1^* \\) أكبر قطعاً من جيرانه في \\( V_2^* \\)! وعندئذٍ فإن نقل \\( v \\) إلى \\( V_2^* \\) يزيد عدد الأضلاع العابرة بمقدار \\( \\ge 1 \\)، مما يناقض القصوية! وبجمع \\( d_{\\text{across}}(v) \\ge \\frac{1}{2}\\deg(v) \\) على جميع الرؤوس نحصل على \\( 2|E(V_1^*, V_2^*)| \\ge |E| \\).</p><p><strong>الخطوة 3 (حساب أقصى قطع ثنائي للبيان الكامل \\( K_7 \\)):</strong> تجزيء \\( 7 \\) رؤوس إلى مجموعتين بحجمَي \\( k \\) و\\( 7 - k \\) يعطي \\( k(7 - k) \\) ضلعاً، وأكبر قيمة هي \\( 3 \\times 4 = 12 \\).<br><strong>الإجابة النهائية:</strong> أقصى قطع ثنائي لـ \\( K_7 \\) يساوي \\( 12 \\) ضلعاً.</p>'
    }
  },
  {
    number: 49,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 9 · NSMO Stage 2 Finale · Multiplicative LCM Pair Counting] How many ordered pairs of positive integers \\( (a, b) \\) satisfy \\( \\operatorname{lcm}(a, b) = 16200 \\), and how many unordered sets \\( \\{a, b\\} \\) satisfy \\( \\operatorname{lcm}(a, b) = 16200 \\)?',
      ar: '[الفصل 9 · ختام المرحلة 2 لأولمبياد نسما · عدّ أزواج المضاعف المشترك الأصغر] كم زوجاً مرتباً من الأعداد الصحيحة الموجبة \\( (a, b) \\) يحقق \\( \\operatorname{lcm}(a, b) = 16200 \\)، وكم مجموعة غير مرتبة \\( \\{a, b\\} \\) تحقق الشرط ذاته؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Prime Factorization of \\( 16200 \\)):</strong> Factor \\( 16200 = 162 \\times 100 = (2 \\cdot 3^4)(2^2 \\cdot 5^2) = 2^3 \\cdot 3^4 \\cdot 5^2 \\).</p><p><strong>Step 2 (Prime-by-Prime Exponent Maximum Counting):</strong> Write \\( a = 2^{u_1} 3^{u_2} 5^{u_3} \\) and \\( b = 2^{v_1} 3^{v_2} 5^{v_3} \\). Then \\( \\operatorname{lcm}(a, b) = 2^3 3^4 5^2 \\iff \\max(u_1, v_1) = 3,\\; \\max(u_2, v_2) = 4,\\; \\max(u_3, v_3) = 2 \\). For any exponent \\( e \\ge 0 \\), the number of ordered pairs \\( (u, v) \\in \\{0, \\dots, e\\}^2 \\) with \\( \\max(u, v) = e \\) is \\( (e + 1)^2 - e^2 = 2e + 1 \\)! Multiplying across primes:<br>\\[ (2 \\cdot 3 + 1)(2 \\cdot 4 + 1)(2 \\cdot 2 + 1) = 7 \\times 9 \\times 5 = 315 \\text{ ordered pairs.} \\]</p><p><strong>Step 3 (Unordered Pairs \\( \\{a, b\\} \\)):</strong> Only \\( a = b = 16200 \\) is symmetric; the remaining \\( 314 \\) ordered pairs pair up into \\( 157 \\) two-element sets, giving \\( 1 + 157 = \\frac{315 + 1}{2} = 158 \\) unordered pairs.<br><strong>Final Answer:</strong> \\( 315 \\) ordered pairs and \\( 158 \\) unordered sets.</p>',
      ar: '<p><strong>الخطوة 1 (التحليل الأولي للعدد \\( 16200 \\)):</strong> نجد \\( 16200 = 162 \\times 100 = 2^3 \\cdot 3^4 \\cdot 5^2 \\).</p><p><strong>الخطوة 2 (عدّ الأزواج المرتبة لكل أس أولي على حدة):</strong> يتحقق \\( \\max(u, v) = e \\) في \\( (e + 1)^2 - e^2 = 2e + 1 \\) زوجاً مرتباً! وبضرب الخيارات المستقلة للأسس \\( 3, 4, 2 \\):<br>\\[ (2 \\cdot 3 + 1)(2 \\cdot 4 + 1)(2 \\cdot 2 + 1) = 7 \\times 9 \\times 5 = 315 \\text{ زوجاً مرتباً.} \\]</p><p><strong>الخطوة 3 (عدّ المجموعات غير المرتبة \\( \\{a, b\\} \\)):</strong> الزوج المتماثل الوحيد هو \\( (16200, 16200) \\)، وتنقسم الـ \\( 314 \\) زوجاً الأخرى مثنى مثنى، فيكون العدد \\( \\frac{315 + 1}{2} = 158 \\).<br><strong>الإجابة النهائية:</strong> \\( 315 \\) زوجاً مرتباً و\\( 158 \\) مجموعة غير مرتبة.</p>'
    }
  },
  {
    number: 50,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 10 · NSMO Riyadh National Finals · Olympiad Functional Equation] Find ALL functions \\( f : \\mathbb{R} \\to \\mathbb{R} \\) satisfying \\( f\\bigl(x^2 + f(y)\\bigr) = y + \\bigl(f(x)\\bigr)^2 \\) for all real numbers \\( x, y \\in \\mathbb{R} \\), proving uniqueness rigorously over \\( \\mathbb{R} \\) without assuming continuity.',
      ar: '[الفصل 10 · النهائيات الوطنية لأولمبياد نسما بالرياض · المعادلات الدالية الأولمبية] أوجد جميع الدوال \\( f : \\mathbb{R} \\to \\mathbb{R} \\) التي تحقق \\( f\\bigl(x^2 + f(y)\\bigr) = y + \\bigl(f(x)\\bigr)^2 \\) لكل \\( x, y \\in \\mathbb{R} \\)، مع إثبات الوحدانية بدقة تامة على \\( \\mathbb{R} \\) دون افتراض الاتصال.'
    },
    solution: {
      en: '<p><strong>Step 1 (Bijectivity &amp; \\( f(0) = 0 \\)):</strong> Setting \\( x = 0 \\) gives \\( f(f(y)) = y + c^2 \\) where \\( c = f(0) \\), which immediately proves \\( f \\) is bijective (surjective since \\( y + c^2 \\) hits all of \\( \\mathbb{R} \\); injective since \\( f(y_1) = f(y_2) \\implies y_1 = y_2 \\)). Choose \\( a \\) with \\( f(a) = 0 \\). Setting \\( y = a \\) gives \\( f(x^2) = a + f(x)^2 \\), and setting \\( x = 0 \\) there yields \\( c = a + c^2 \\). Next substitute \\( x = a,\\; y = 0 \\): \\( f(a^2 + c) = 0 + f(a)^2 = 0 = f(a) \\implies a^2 + c = a \\) by injectivity! Adding \\( c = a + c^2 \\) and \\( a = c + a^2 \\) gives \\( a^2 + c^2 = 0 \\implies a = c = 0 \\), so \\( f(0) = 0 \\)! Moreover, \\( f(-x)^2 = f(x^2) = f(x)^2 \\); since \\( f \\) is injective and \\( f(0) = 0 \\), \\( f(-x) = -f(x) \\) for all \\( x \\).</p><p><strong>Step 2 (Additivity &amp; Positivity):</strong> With \\( f(0) = 0 \\), we have \\( f(f(y)) = y \\), \\( f(x^2) = f(x)^2 \\ge 0 \\) (so \\( u \\ge 0 \\implies f(u) \\ge 0 \\)), and \\( f(x^2 + z) = f(z) + f(x)^2 = f(z) + f(x^2) \\) (substituting \\( y = f(z) \\)). Hence \\( f(u + z) = f(u) + f(z) \\) for all \\( u \\ge 0, z \\in \\mathbb{R} \\), and since \\( f(-u) = -f(u) \\), \\( f \\) is additive on ALL of \\( \\mathbb{R} \\)!</p><p><strong>Step 3 (Rigidity of Monotone Cauchy Functions):</strong> Since \\( u \\ge v \\implies u - v \\ge 0 \\implies f(u) - f(v) = f(u - v) \\ge 0 \\), \\( f \\) is non-decreasing and additive, forcing \\( f(x) = kx \\). Substituting into \\( f(x^2) = f(x)^2 \\) gives \\( k = k^2 \\), and bijectivity rules out \\( k = 0 \\), leaving \\( f(x) = x \\) uniquely.<br><strong>Final Answer:</strong> \\( f(x) = x \\) for all \\( x \\in \\mathbb{R} \\).</p>',
      ar: '<p><strong>الخطوة 1 (التقابل وإثبات \\( f(0) = 0 \\)):</strong> بوضع \\( x = 0 \\) نجد \\( f(f(y)) = y + c^2 \\) حيث \\( c = f(0) \\)، مما يثبت فوراً أن \\( f \\) تقابل شامل ومتباين! نختار \\( a \\) بحيث \\( f(a) = 0 \\)؛ بوضع \\( y = a \\) نحصل على \\( f(x^2) = a + f(x)^2 \\)، وعند \\( x = 0 \\) نجد \\( c = a + c^2 \\). وبالتعويض \\( x = a,\\; y = 0 \\) نجد \\( f(a^2 + c) = 0 = f(a) \\implies a^2 + c = a \\). بجمع \\( c = a + c^2 \\) و\\( a = c + a^2 \\) نحصل على \\( a^2 + c^2 = 0 \\implies a = c = 0 \\)، أي \\( f(0) = 0 \\)!</p><p><strong>الخطوة 2 (الجمعية وحفظ الإشارة الموجبة):</strong> يصبح لدينا \\( f(f(y)) = y \\) و\\( f(x^2) = f(x)^2 \\ge 0 \\) (أي أن كل عدد غير سالب صورته غير سالبة!)، وبوضع \\( y = f(z) \\) نحصل على \\( f(u + z) = f(u) + f(z) \\) لكل \\( u \\ge 0 \\)، ومن فردية \\( f(-x) = -f(x) \\) تكون \\( f \\) جمعية على \\( \\mathbb{R} \\) كاملةً!</p><p><strong>الخطوة 3 (صلابة معادلة كوشي الرتيبة):</strong> بما أن \\( u \\ge v \\implies f(u) - f(v) = f(u - v) \\ge 0 \\)، فالدالة جمعية وغير متناقصة على \\( \\mathbb{R} \\)، أي \\( f(x) = kx \\). ومن \\( f(1) = f(1)^2 \\) والتقابل نجد \\( k = 1 \\).<br><strong>الإجابة النهائية:</strong> الحل الوحيد هو \\( f(x) = x \\) لكل \\( x \\in \\mathbb{R} \\).</p>'
    }
  },
  {
    number: 51,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 10 · NSMO Riyadh National Finals · Prime-Power Catalan Equation] Find ALL triples \\( (p, x, y) \\), where \\( p \\) is prime and \\( x, y \\) are positive integers, satisfying \\( p^x - y^3 = 1 \\).',
      ar: '[الفصل 10 · النهائيات الوطنية لأولمبياد نسما · معادلة كاتالان الأولية] أوجد جميع الثلاثيات \\( (p, x, y) \\) حيث \\( p \\) عدد أولي و\\( x, y \\) عددان صحيحان موجبان تحقق المعادلة \\( p^x - y^3 = 1 \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Sum of Cubes &amp; GCD Bound):</strong> Factor \\( p^x = y^3 + 1 = (y + 1)(y^2 - y + 1) \\). Compute the GCD of the two factors via Euclidean reduction: since \\( y^2 - y + 1 = (y + 1)(y - 2) + 3 \\),<br>\\[ \\gcd(y + 1,\\; y^2 - y + 1) = \\gcd(y + 1,\\; 3) \\in \\{1, 3\\}! \\]</p><p><strong>Step 2 (Case 1 — \\( p \\neq 3 \\)):</strong> Both factors are powers of \\( p \\) and coprime! Since \\( y \\ge 1 \\implies y + 1 \\ge 2 \\), the second factor MUST equal \\( 1 \\): \\( y^2 - y + 1 = 1 \\implies y(y - 1) = 0 \\implies y = 1 \\), giving \\( p^x = 2 \\implies (p, x, y) = (2, 1, 1) \\).</p><p><strong>Step 3 (Case 2 — \\( p = 3 \\)):</strong> Both \\( y + 1 = 3^a \\) and \\( y^2 - y + 1 = 3^b \\) are powers of \\( 3 \\) with \\( 3 \\mid (y + 1) \\). Write \\( y = 3k - 1 \\) (\\( k \\ge 1 \\)):<br>\\[ y^2 - y + 1 = (9k^2 - 6k + 1) - (3k - 1) + 1 = 9k^2 - 9k + 3 = 3(3k^2 - 3k + 1). \\]<br>Notice \\( 3 \\nmid (3k^2 - 3k + 1) \\), so \\( 9 \\nmid (y^2 - y + 1) \\)! Thus \\( 3^b \\mid 3 \\implies b \\in \\{0, 1\\} \\). For \\( y \\ge 2 \\), \\( b = 1 \\implies y^2 - y + 1 = 3 \\implies (y - 2)(y + 1) = 0 \\implies y = 2 \\), yielding \\( 3^x = 9 \\implies (p, x, y) = (3, 2, 2) \\).<br><strong>Final Answer:</strong> Exactly two triples: \\( (2, 1, 1) \\) and \\( (3, 2, 2) \\).</p>',
      ar: '<p><strong>الخطوة 1 (تحليل مجموع المكعبين وحساب القاسم المشترك):</strong> نحلل \\( p^x = y^3 + 1 = (y + 1)(y^2 - y + 1) \\). وبما أن \\( y^2 - y + 1 = (y + 1)(y - 2) + 3 \\)، فإن:<br>\\[ \\gcd(y + 1,\\; y^2 - y + 1) = \\gcd(y + 1,\\; 3) \\in \\{1, 3\\}! \\]</p><p><strong>الخطوة 2 (الحالة الأولى \\( p \\neq 3 \\)):</strong> العاملان قوتان أوليتان لـ \\( p \\) وأوليان نسبياً، وبما أن \\( y + 1 \\ge 2 \\) يجب أن يكون \\( y^2 - y + 1 = 1 \\implies y = 1 \\)، فنجد \\( (p, x, y) = (2, 1, 1) \\).</p><p><strong>الخطوة 3 (الحالة الثانية \\( p = 3 \\)):</strong> نضع \\( y = 3k - 1 \\) فنجد \\( y^2 - y + 1 = 3(3k^2 - 3k + 1) \\)، وهو مقدار يقبل القسمة على \\( 3 \\) مرة واحدة فقط ولا يقبل القسمة على \\( 9 \\) أبداً! إذن القوة \\( y^2 - y + 1 \\) تساوي \\( 3 \\) حصراً، ومنه \\( y = 2 \\) و\\( 3^x = 9 \\implies x = 2 \\).<br><strong>الإجابة النهائية:</strong> ثلاثيتان فقط هما \\( (2, 1, 1) \\) و\\( (3, 2, 2) \\).</p>'
    }
  },
  {
    number: 52,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 11 · KAUST KMC Final Problem · Quadratic Gauss Periods] Let \\( \\zeta = e^{2\\pi i / 7} \\) be a primitive \\( 7 \\)-th root of unity, and define \\( \\alpha = \\zeta + \\zeta^2 + \\zeta^4 \\) and \\( \\beta = \\zeta^3 + \\zeta^5 + \\zeta^6 \\). Compute \\( \\alpha + \\beta \\) and \\( \\alpha\\beta \\), find the monic quadratic equation with integer coefficients having roots \\( \\alpha, \\beta \\), and determine \\( |\\alpha - \\beta|^2 \\).',
      ar: '[الفصل 11 · المسألة الختامية لتصفيات كاوست · مجاميع غاوس وجذور الواحد] ليكن \\( \\zeta = e^{2\\pi i / 7} \\) جذراً سابعاً بدائياً للواحد، ونعرّف \\( \\alpha = \\zeta + \\zeta^2 + \\zeta^4 \\) و\\( \\beta = \\zeta^3 + \\zeta^5 + \\zeta^6 \\). احسب \\( \\alpha + \\beta \\) و\\( \\alpha\\beta \\)، واستنتج المعادلة التربيعية ذات المعاملات الصحيحة التي جذراها \\( \\alpha, \\beta \\)، وحدّد قيمة \\( |\\alpha - \\beta|^2 \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Sum via Cyclotomic Vanishing):</strong> Since \\( \\zeta \\neq 1 \\) and \\( \\zeta^7 = 1 \\), we have \\( 1 + \\zeta + \\zeta^2 + \\zeta^3 + \\zeta^4 + \\zeta^5 + \\zeta^6 = 0 \\). Notice the exponents \\( \\{1, 2, 4\\} \\) are the quadratic residues \\( \\pmod 7 \\) and \\( \\{3, 5, 6\\} \\) are the non-residues, so:<br>\\[ \\alpha + \\beta = \\sum_{k=1}^{6} \\zeta^k = -1. \\]</p><p><strong>Step 2 (Expand the Product \\( \\alpha\\beta \\) Modulo \\( 7 \\) in Exponents):</strong> Multiplying the \\( 3 \\times 3 = 9 \\) terms and reducing exponents modulo \\( 7 \\):<br>\\[ \\alpha\\beta = (\\zeta^4 + \\zeta^6 + \\zeta^7) + (\\zeta^5 + \\zeta^7 + \\zeta^8) + (\\zeta^7 + \\zeta^9 + \\zeta^{10}) = (\\zeta^4 + \\zeta^6 + 1) + (\\zeta^5 + 1 + \\zeta) + (1 + \\zeta^2 + \\zeta^3). \\]<br>Grouping gives \\( \\alpha\\beta = 3 + (\\zeta + \\zeta^2 + \\zeta^3 + \\zeta^4 + \\zeta^5 + \\zeta^6) = 3 - 1 = 2 \\)!</p><p><strong>Step 3 (Monic Quadratic &amp; Gauss Sum Magnitude):</strong> By Vieta\'s Theorem, \\( \\alpha, \\beta \\) are the roots of \\( t^2 + t + 2 = 0 \\), giving \\( \\{\\alpha, \\beta\\} = \\left\\{\\frac{-1 + i\\sqrt{7}}{2},\\; \\frac{-1 - i\\sqrt{7}}{2}\\right\\} \\). Therefore \\( (\\alpha - \\beta)^2 = (-1)^2 - 4(2) = -7 \\implies |\\alpha - \\beta|^2 = 7 \\)!<br><strong>Final Answer:</strong> \\( \\alpha + \\beta = -1 \\), \\( \\alpha\\beta = 2 \\), quadratic \\( t^2 + t + 2 = 0 \\), and \\( |\\alpha - \\beta|^2 = 7 \\).</p>',
      ar: '<p><strong>الخطوة 1 (حساب المجموع من متطابقة جذور الواحد):</strong> بما أن \\( \\zeta^7 = 1 \\) و\\( \\zeta \\neq 1 \\)، فإن \\( 1 + \\zeta + \\zeta^2 + \\dots + \\zeta^6 = 0 \\)، ومنه فوراً:<br>\\[ \\alpha + \\beta = \\sum_{k=1}^{6} \\zeta^k = -1. \\]</p><p><strong>الخطوة 2 (حساب الجداء \\( \\alpha\\beta \\) باختزال الأسس بترديد \\( 7 \\)):</strong> بضرب الحدود التسعة وتطبيق \\( \\zeta^7 = 1 \\):<br>\\[ \\alpha\\beta = (\\zeta^4 + \\zeta^6 + 1) + (\\zeta^5 + 1 + \\zeta) + (1 + \\zeta^2 + \\zeta^3) = 3 + \\sum_{k=1}^{6}\\zeta^k = 3 - 1 = 2. \\]</p><p><strong>الخطوة 3 (المعادلة التربيعية ومربع المسافة):</strong> حسب فييتا، \\( \\alpha \\) و\\( \\beta \\) هما جذرا المعادلة \\( t^2 + t + 2 = 0 \\)، أي \\( \\frac{-1 \\pm i\\sqrt{7}}{2} \\). ومنه \\( (\\alpha - \\beta)^2 = 1 - 8 = -7 \\implies |\\alpha - \\beta|^2 = 7 \\)!<br><strong>الإجابة النهائية:</strong> \\( \\alpha + \\beta = -1 \\)، \\( \\alpha\\beta = 2 \\)، المعادلة \\( t^2 + t + 2 = 0 \\)، و\\( |\\alpha - \\beta|^2 = 7 \\).</p>'
    }
  },
  {
    number: 53,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 12 · KAUST Campus Finals · Shoelace & Pick\'s Lattice Theorem] Convex lattice quadrilateral \\( ABCD \\) has vertices \\( A(0, 0) \\), \\( B(7, 2) \\), \\( C(9, 8) \\), and \\( D(2, 9) \\). Find (a) the exact area \\( [ABCD] \\), (b) the number of boundary lattice points \\( B \\), and (c) the exact number of strictly interior lattice points \\( I \\).',
      ar: '[الفصل 12 · نهائيات حرم كاوست بثول · مبرهنة بيك ومساحة المضلعات الشبكية] رباعي محدب شبكي \\( ABCD \\) رؤوسه \\( A(0, 0) \\)، و\\( B(7, 2) \\)، و\\( C(9, 8) \\)، و\\( D(2, 9) \\). أوجد: (أ) المساحة الدقيقة \\( [ABCD] \\)، و(ب) عدد النقاط الشبكية على المحيط \\( B \\)، و(ج) عدد النقاط الشبكية الواقعة داخل الرباعي تماماً \\( I \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Shoelace Area Formula):</strong> Listing vertices counterclockwise \\( (0,0) \\to (7,2) \\to (9,8) \\to (2,9) \\to (0,0) \\):<br>\\[ [ABCD] = \\frac{1}{2}\\bigl|(0\\cdot 2 + 7\\cdot 8 + 9\\cdot 9 + 2\\cdot 0) - (0\\cdot 7 + 2\\cdot 9 + 8\\cdot 2 + 9\\cdot 0)\\bigr| = \\frac{1}{2}|137 - 34| = \\frac{103}{2} = 51.5. \\]</p><p><strong>Step 2 (Boundary Lattice Points via \\( \\gcd(\\Delta x, \\Delta y) \\)):</strong> A segment from \\( (x_1, y_1) \\) to \\( (x_2, y_2) \\) contains \\( \\gcd(|x_2 - x_1|, |y_2 - y_1|) \\) half-open edge lattice points:<br>\\[ B = \\gcd(7, 2) + \\gcd(2, 6) + \\gcd(7, 1) + \\gcd(2, 9) = 1 + 2 + 1 + 1 = 5. \\]</p><p><strong>Step 3 (Pick\'s Theorem \\( [ABCD] = I + \\frac{B}{2} - 1 \\)):</strong><br>\\[ 51.5 = I + \\frac{5}{2} - 1 = I + 1.5 \\implies I = 50. \\]<br><strong>Final Answer:</strong> (a) Area \\( = 51.5 \\); (b) \\( B = 5 \\); (c) \\( I = 50 \\) interior lattice points.</p>',
      ar: '<p><strong>الخطوة 1 (حساب المساحة بقاعدة رباط الحذاء Shoelace):</strong> نرتّب الرؤوس عكس عقارب الساعة:<br>\\[ [ABCD] = \\frac{1}{2}\\bigl|(0 + 56 + 81 + 0) - (0 + 18 + 16 + 0)\\bigr| = \\frac{1}{2}|137 - 34| = \\frac{103}{2} = 51.5. \\]</p><p><strong>الخطوة 2 (النقاط الشبكية على المحيط عبر \\( \\gcd(|\\Delta x|, |\\Delta y|) \\)):</strong><br>\\[ B = \\gcd(7, 2) + \\gcd(2, 6) + \\gcd(7, 1) + \\gcd(2, 9) = 1 + 2 + 1 + 1 = 5. \\]</p><p><strong>الخطوة 3 (مبرهنة بيك \\( [ABCD] = I + \\frac{B}{2} - 1 \\)):</strong><br>\\[ 51.5 = I + \\frac{5}{2} - 1 = I + 1.5 \\implies I = 50. \\]<br><strong>الإجابة النهائية:</strong> (أ) المساحة \\( 51.5 \\)؛ (ب) \\( B = 5 \\)؛ (ج) \\( I = 50 \\) نقطة داخلية.</p>'
    },
    fig: {
      type: 'polygon',
      title: 'Lattice Quadrilateral A(0,0)–B(7,2)–C(9,8)–D(2,9)',
      vertices: [
        [0, 0],
        [7, 2],
        [9, 8],
        [2, 9]
      ],
      labels: ['A(0,0)', 'B(7,2)', 'C(9,8)', 'D(2,9)']
    }
  },
  {
    number: 54,
    difficulty: 'Advanced',
    question: {
      en: '[Ch 12 · KAUST Academy Synthesis · Generating Functions & Bounded Compositions] Using generating functions, find the exact number of \\( 6 \\)-tuples of integers \\( (x_1, x_2, x_3, x_4, x_5, x_6) \\in \\{0, 1, 2, 3, 4\\}^6 \\) such that \\( x_1 + x_2 + x_3 + x_4 + x_5 + x_6 = 15 \\).',
      ar: '[الفصل 12 · التركيب المتقدم لأكاديمية كاوست · الدوال المولدة] باستخدام الدوال المولدة، أوجد العدد الدقيق للسداسيات المرتبة \\( (x_1, x_2, x_3, x_4, x_5, x_6) \\in \\{0, 1, 2, 3, 4\\}^6 \\) التي تحقق \\( x_1 + x_2 + x_3 + x_4 + x_5 + x_6 = 15 \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Encode as a Generating Function):</strong> Each \\( x_i \\in \\{0, 1, 2, 3, 4\\} \\) has generating polynomial \\( 1 + z + z^2 + z^3 + z^4 = \\frac{1 - z^5}{1 - z} \\). Thus we seek \\( [z^{15}] \\) in:<br>\\[ F(z) = (1 + z + z^2 + z^3 + z^4)^6 = (1 - z^5)^6 (1 - z)^{-6} = \\left(\\sum_{j=0}^{6} (-1)^j \\binom{6}{j} z^{5j}\\right)\\left(\\sum_{m=0}^{\\infty} \\binom{m + 5}{5} z^m\\right). \\]</p><p><strong>Step 2 (Extract \\( [z^{15}] \\) via \\( 5j + m = 15 \\)):</strong> Even faster, invoke palindromic symmetry \\( y_i = 4 - x_i \\in \\{0, 1, 2, 3, 4\\} \\): \\( \\sum y_i = 24 - 15 = 9 \\), so \\( [z^{15}]F(z) = [z^9]F(z) \\), requiring only \\( j \\in \\{0, 1\\} \\)! Let us verify BOTH ways:<br>• Via \\( [z^9] \\): \\( \\binom{9 + 5}{5} - \\binom{6}{1}\\binom{4 + 5}{5} = \\binom{14}{5} - 6\\binom{9}{5} = 2002 - 6(126) = 2002 - 756 = 1246 \\).<br>• Direct \\( [z^{15}] \\) check: \\( \\binom{20}{5} - 6\\binom{15}{5} + 15\\binom{10}{5} - 20\\binom{5}{5} = 15504 - 18018 + 3780 - 20 = 1246 \\)!</p><p><strong>Final Answer:</strong> \\( 1246 \\) ordered \\( 6 \\)-tuples.</p>',
      ar: '<p><strong>الخطوة 1 (التمثيل بالدالة المولدة):</strong> العدد المطلوب يساوي معامل \\( [z^{15}] \\) في مفكوك الدالة المولدة:<br>\\[ F(z) = (1 + z + z^2 + z^3 + z^4)^6 = (1 - z^5)^6 (1 - z)^{-6} = \\left(\\sum_{j=0}^{6} (-1)^j \\binom{6}{j} z^{5j}\\right)\\left(\\sum_{m \\ge 0} \\binom{m + 5}{5} z^m\\right). \\]</p><p><strong>الخطوة 2 (استثمار التناظر \\( y_i = 4 - x_i \\) لتقليص الحساب):</strong> بوضع \\( y_i = 4 - x_i \\in \\{0, 1, 2, 3, 4\\} \\) يصبح المجموع المكافئ \\( \\sum y_i = 24 - 15 = 9 \\)، أي \\( [z^{15}]F(z) = [z^9]F(z) \\) الذي لا يتطلب سوى \\( j = 0, 1 \\):<br>\\[ \\binom{14}{5} - \\binom{6}{1}\\binom{9}{5} = 2002 - 6(126) = 2002 - 756 = 1246. \\]<br>(والمطابقة المباشرة عند \\( z^{15} \\): \\( 15504 - 18018 + 3780 - 20 = 1246 \\).)<br><strong>الإجابة النهائية:</strong> \\( 1246 \\) سداسية مرتبة.</p>'
    }
  }
];
