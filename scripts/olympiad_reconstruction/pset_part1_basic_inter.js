'use strict';

module.exports = [
  // ======================== BASIC (1 - 18) ========================
  {
    number: 1,
    difficulty: 'Basic',
    question: {
      en: '[Ch 1 · Vieta & Symmetric Sums · NSMO Stage 1] Let \\( r \\) and \\( s \\) be the roots of \\( x^2 - 7x + 3 = 0 \\). Compute the exact value of \\( r^3 + s^3 \\) and \\( \\frac{r^2}{s} + \\frac{s^2}{r} \\).',
      ar: '[الفصل 1 · علاقات فييتا والمجاميع المتماثلة · نسما المرحلة 1] ليكن \\( r \\) و\\( s \\) جذرَي المعادلة \\( x^2 - 7x + 3 = 0 \\). احسب القيمة الدقيقة لكلٍّ من \\( r^3 + s^3 \\) و\\( \\frac{r^2}{s} + \\frac{s^2}{r} \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Vieta\'s Relations):</strong> From \\( x^2 - 7x + 3 = 0 \\), the elementary symmetric sums are \\( e_1 = r + s = 7 \\) and \\( e_2 = rs = 3 \\).</p><p><strong>Step 2 (Newton Cubic Sum):</strong> Using the identity \\( r^3 + s^3 = (r + s)^3 - 3rs(r + s) \\):<br>\\[ r^3 + s^3 = 7^3 - 3(3)(7) = 343 - 63 = 280. \\]</p><p><strong>Step 3 (Symmetric Rational Combination):</strong> Combine over the common denominator \\( rs \\):<br>\\[ \\frac{r^2}{s} + \\frac{s^2}{r} = \\frac{r^3 + s^3}{rs} = \\frac{280}{3}. \\]<br><strong>Final Answer:</strong> \\( r^3 + s^3 = 280 \\) and \\( \\frac{r^2}{s} + \\frac{s^2}{r} = \\frac{280}{3} \\).</p>',
      ar: '<p><strong>الخطوة 1 (علاقات فييتا):</strong> من المعادلة التربيعية \\( x^2 - 7x + 3 = 0 \\)، نحصل على المجموعين المتماثلين الأساسيين \\( r + s = 7 \\) و\\( rs = 3 \\).</p><p><strong>الخطوة 2 (مجموع المكعبين بصيغة نيوتن):</strong> بتطبيق المتطابقة \\( r^3 + s^3 = (r + s)^3 - 3rs(r + s) \\):<br>\\[ r^3 + s^3 = 7^3 - 3(3)(7) = 343 - 63 = 280. \\]</p><p><strong>الخطوة 3 (توحيد المقامات في المقدار الكسري):</strong> نوحّد المقامات على \\( rs \\):<br>\\[ \\frac{r^2}{s} + \\frac{s^2}{r} = \\frac{r^3 + s^3}{rs} = \\frac{280}{3}. \\]<br><strong>الإجابة النهائية:</strong> \\( r^3 + s^3 = 280 \\) و\\( \\frac{r^2}{s} + \\frac{s^2}{r} = \\frac{280}{3} \\).</p>'
    },
    fig: {
      type: 'fn',
      title: 'Quadratic P(x) = x² − 7x + 3 and Symmetric Roots r, s',
      xrange: [-1, 8],
      yrange: [-11, 12],
      fns: [{ fn: 'x*x - 7*x + 3', label: 'y = x² − 7x + 3' }],
      points: [
        { x: 0.4586, y: 0, label: 'r' },
        { x: 6.5414, y: 0, label: 's' },
        { x: 3.5, y: -9.25, label: 'Vertex (3.5, −9.25)' }
      ]
    }
  },
  {
    number: 2,
    difficulty: 'Basic',
    question: {
      en: '[Ch 1 · Telescoping Series · KAUST KMC Qualifier] Evaluate the exact value of the finite telescoping sum \\( S = \\sum_{k=1}^{24} \\frac{1}{\\sqrt{k} + \\sqrt{k+1}} \\).',
      ar: '[الفصل 1 · المجاميع المتداخلة · تصفيات مسابقة كاوست] أوجد القيمة الدقيقة للمجموع المنتهي المتداخل \\( S = \\sum_{k=1}^{24} \\frac{1}{\\sqrt{k} + \\sqrt{k+1}} \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Conjugate Rationalization):</strong> Multiply numerator and denominator of the general term by \\( \\sqrt{k+1} - \\sqrt{k} \\):<br>\\[ \\frac{1}{\\sqrt{k} + \\sqrt{k+1}} = \\frac{\\sqrt{k+1} - \\sqrt{k}}{(k+1) - k} = \\sqrt{k+1} - \\sqrt{k}. \\]</p><p><strong>Step 2 (Telescoping Collapse):</strong> Summing from \\( k = 1 \\) to \\( k = 24 \\) cancels all interior radicals:<br>\\[ S = (\\sqrt{2} - \\sqrt{1}) + (\\sqrt{3} - \\sqrt{2}) + \\dots + (\\sqrt{25} - \\sqrt{24}) = \\sqrt{25} - \\sqrt{1} = 5 - 1 = 4. \\]<br><strong>Final Answer:</strong> \\( S = 4 \\).</p>',
      ar: '<p><strong>الخطوة 1 (إنطاق المقام بالمرافق):</strong> نضرب بسط ومقام الحد العام في المرافق \\( \\sqrt{k+1} - \\sqrt{k} \\):<br>\\[ \\frac{1}{\\sqrt{k} + \\sqrt{k+1}} = \\frac{\\sqrt{k+1} - \\sqrt{k}}{(k+1) - k} = \\sqrt{k+1} - \\sqrt{k}. \\]</p><p><strong>الخطوة 2 (الاختصار التلسكوبي المتداخل):</strong> بجمع الحدود من \\( k = 1 \\) إلى \\( k = 24 \\) تختفي جميع الجذور الداخلية بالتناوب:<br>\\[ S = (\\sqrt{2} - \\sqrt{1}) + (\\sqrt{3} - \\sqrt{2}) + \\dots + (\\sqrt{25} - \\sqrt{24}) = \\sqrt{25} - \\sqrt{1} = 5 - 1 = 4. \\]<br><strong>الإجابة النهائية:</strong> \\( S = 4 \\).</p>'
    }
  },
  {
    number: 3,
    difficulty: 'Basic',
    question: {
      en: '[Ch 2 · Divisibility & Modular Arithmetic · NSMO Stage 1] Find the remainder when \\( 7^{2026} \\) is divided by \\( 100 \\) (that is, determine the last two digits of \\( 7^{2026} \\)).',
      ar: '[الفصل 2 · الحساب المعياري · نسما المرحلة 1] أوجد باقي قسمة العدد \\( 7^{2026} \\) على \\( 100 \\) (أي حدّد آخر خانتين عشريتين للعدد \\( 7^{2026} \\)).'
    },
    solution: {
      en: '<p><strong>Step 1 (Order of \\( 7 \\) Modulo \\( 100 \\)):</strong> Compute the first powers of \\( 7 \\) modulo \\( 100 \\):<br>\\[ 7^1 \\equiv 07, \\quad 7^2 \\equiv 49, \\quad 7^3 = 343 \\equiv 43, \\quad 7^4 = 2401 \\equiv 1 \\pmod{100}. \\]<br>Thus the multiplicative order of \\( 7 \\) modulo \\( 100 \\) is \\( d = 4 \\).</p><p><strong>Step 2 (Exponent Reduction):</strong> Reduce the exponent \\( 2026 \\) modulo \\( 4 \\): since \\( 2026 = 4 \\times 506 + 2 \\), we obtain:<br>\\[ 7^{2026} = (7^4)^{506} \\cdot 7^2 \\equiv 1^{506} \\cdot 49 \\equiv 49 \\pmod{100}. \\]<br><strong>Final Answer:</strong> The remainder is \\( 49 \\) (last two digits \\( 49 \\)).</p>',
      ar: '<p><strong>الخطوة 1 (إيجاد رتبة العدد \\( 7 \\) بترديد \\( 100 \\)):</strong> نحسب القوى المتتالية الأولى للعدد \\( 7 \\) بترديد \\( 100 \\):<br>\\[ 7^1 \\equiv 07, \\quad 7^2 \\equiv 49, \\quad 7^3 = 343 \\equiv 43, \\quad 7^4 = 2401 \\equiv 1 \\pmod{100}. \\]<br>إذن رتبة \\( 7 \\) بترديد \\( 100 \\) تساوي \\( 4 \\) فقط!</p><p><strong>الخطوة 2 (اختزال الأس بترديد الرتبة):</strong> بما أن \\( 2026 = 4 \\times 506 + 2 \\)، نجد:<br>\\[ 7^{2026} = (7^4)^{506} \\cdot 7^2 \\equiv 1^{506} \\cdot 49 \\equiv 49 \\pmod{100}. \\]<br><strong>الإجابة النهائية:</strong> الباقي هو \\( 49 \\).</p>'
    }
  },
  {
    number: 4,
    difficulty: 'Basic',
    question: {
      en: '[Ch 2 · Prime Factorization & Divisors · Kangaroo Senior] How many positive divisors of \\( N = 3600 \\) are perfect squares, and what is the sum of those square divisors?',
      ar: '[الفصل 2 · التحليل الأولي والقواسم · كانجارو الثانوي] كم قاسماً موجباً للعدد \\( N = 3600 \\) يُمثّل مربعاً كاملاً، وما مجموع هذه القواسم المربعة؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Canonical Prime Factorization):</strong> Factor \\( 3600 = 36 \\times 100 = (2^2 \\cdot 3^2)(2^2 \\cdot 5^2) = 2^4 \\cdot 3^2 \\cdot 5^2 \\).</p><p><strong>Step 2 (Counting Square Divisors):</strong> A divisor \\( d = 2^a 3^b 5^c \\) of \\( 3600 \\) is a perfect square if and only if \\( a \\in \\{0, 2, 4\\} \\) (\\( 3 \\) choices), \\( b \\in \\{0, 2\\} \\) (\\( 2 \\) choices), and \\( c \\in \\{0, 2\\} \\) (\\( 2 \\) choices). Hence there are \\( 3 \\times 2 \\times 2 = 12 \\) perfect-square divisors.</p><p><strong>Step 3 (Multiplicative Sum of Square Divisors):</strong> Factor the sum across prime powers:<br>\\[ (1 + 2^2 + 2^4)(1 + 3^2)(1 + 5^2) = (1 + 4 + 16)(1 + 9)(1 + 25) = 21 \\times 10 \\times 26 = 5460. \\]<br><strong>Final Answer:</strong> \\( 12 \\) square divisors with sum \\( 5460 \\).</p>',
      ar: '<p><strong>الخطوة 1 (التحليل القانوني إلى عوامل أولية):</strong> نحلل \\( 3600 = 36 \\times 100 = 2^4 \\cdot 3^2 \\cdot 5^2 \\).</p><p><strong>الخطوة 2 (عدّ القواسم التي تمثل مربعاً كاملاً):</strong> القاسم \\( d = 2^a 3^b 5^c \\) يكون مربعاً كاملاً إذا وفقط إذا كانت جميع أسسه زوجية: \\( a \\in \\{0, 2, 4\\} \\) (\\( 3 \\) خيارات)، و\\( b \\in \\{0, 2\\} \\) (خياران)، و\\( c \\in \\{0, 2\\} \\) (خياران). إذن عدد القواسم المربعة هو \\( 3 \\times 2 \\times 2 = 12 \\).</p><p><strong>الخطوة 3 (حساب مجموع القواسم المربعة):</strong> نضرب مجاميع القوى الزوجية لكل عامل أولي:<br>\\[ (1 + 4 + 16)(1 + 9)(1 + 25) = 21 \\times 10 \\times 26 = 5460. \\]<br><strong>الإجابة النهائية:</strong> عدد القواسم المربعة \\( 12 \\) ومجموعها \\( 5460 \\).</p>'
    },
    fig: {
      type: 'bar',
      title: 'Prime Exponents of 3600 = 2⁴ · 3² · 5² and Even-Exponent Choices',
      data: [
        { label: 'Prime 2 (exp 4)', val: 4 },
        { label: 'Prime 3 (exp 2)', val: 2 },
        { label: 'Prime 5 (exp 2)', val: 2 },
        { label: 'Square Divisors', val: 12 }
      ]
    }
  },
  {
    number: 5,
    difficulty: 'Basic',
    question: {
      en: '[Ch 3 · Simon\'s Favorite Factoring Trick · KAUST KMC] Find all ordered pairs of positive integers \\( (x, y) \\) satisfying \\( xy + 4x + 7y = 67 \\), and compute the maximum value of \\( x + y \\).',
      ar: '[الفصل 3 · خدعة التحليل المفضلة لسايمون · مسابقة كاوست] أوجد جميع الأزواج المرتبة من الأعداد الصحيحة الموجبة \\( (x, y) \\) التي تحقق \\( xy + 4x + 7y = 67 \\)، واحسب أكبر قيمة ممكنة للمجموع \\( x + y \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Complete the Rectangle via SFFT):</strong> Add \\( 4 \\times 7 = 28 \\) to both sides of the equation:<br>\\[ xy + 4x + 7y + 28 = 67 + 28 \\iff (x + 7)(y + 4) = 95. \\]</p><p><strong>Step 2 (Divisor Bounds in Positive Integers):</strong> Since \\( x \\ge 1 \\) and \\( y \\ge 1 \\), we require \\( x + 7 \\ge 8 \\) and \\( y + 4 \\ge 5 \\). Factor \\( 95 = 5 \\times 19 \\); its positive divisor pairs \\( (d_1, d_2) \\) are \\( (1, 95), (5, 19), (19, 5), (95, 1) \\).</p><p><strong>Step 3 (Filter Valid Pairs):</strong> Only \\( (x + 7, y + 4) = (19, 5) \\) satisfies both \\( x + 7 \\ge 8 \\) and \\( y + 4 \\ge 5 \\), yielding the unique positive solution \\( (x, y) = (12, 1) \\) (check: \\( 12(1) + 48 + 7 = 67 \\)).<br><strong>Final Answer:</strong> \\( (x, y) = (12, 1) \\) and \\( x + y = 13 \\).</p>',
      ar: '<p><strong>الخطوة 1 (إكمال المستطيل عبر SFFT):</strong> نضيف \\( 4 \\times 7 = 28 \\) إلى طرفَي المعادلة:<br>\\[ xy + 4x + 7y + 28 = 67 + 28 \\iff (x + 7)(y + 4) = 95. \\]</p><p><strong>الخطوة 2 (قيود الأعداد الصحيحة الموجبة):</strong> بما أن \\( x \\ge 1 \\) و\\( y \\ge 1 \\)، يجب أن يكون \\( x + 7 \\ge 8 \\) و\\( y + 4 \\ge 5 \\). وبما أن \\( 95 = 5 \\times 19 \\)، فإن أزواج قواسمه الموجبة هي \\( (1, 95), (5, 19), (19, 5), (95, 1) \\).</p><p><strong>الخطوة 3 (تحديد الحلول المقبولة):</strong> الزوج الوحيد الذي يحقق الشرطين معاً هو \\( (x + 7, y + 4) = (19, 5) \\)، ومنه \\( (x, y) = (12, 1) \\).<br><strong>الإجابة النهائية:</strong> الحل الموجب الوحيد هو \\( (12, 1) \\) ومجموعه \\( x + y = 13 \\).</p>'
    }
  },
  {
    number: 6,
    difficulty: 'Basic',
    question: {
      en: '[Ch 3 · Frobenius Coin Theorem · NSMO Stage 1] A Mawhiba robotics kit uses spacer rods of lengths \\( 9\\text{ mm} \\) and \\( 13\\text{ mm} \\). What is the largest integer length (in mm) that CANNOT be formed by placing non-negative numbers of \\( 9\\text{ mm} \\) and \\( 13\\text{ mm} \\) rods end-to-end, and how many positive integer lengths cannot be formed in total?',
      ar: '[الفصل 3 · مبرهنة العملات لفروبينيوس · نسما المرحلة 1] تحتوي حقيبة روبوتات موهبة على قضبان مباعدة بطولَي \\( 9\\text{ mm} \\) و\\( 13\\text{ mm} \\). ما أكبر طول صحيح (بالمليمتر) لا يمكن تكوينه بوضع أعداد غير سالبة من هذه القضبان متجاورةً، وكم طولاً صحيحاً موجباً لا يمكن تكوينه إجمالاً؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Coprimality Verification):</strong> Check \\( \\gcd(9, 13) = 1 \\). Since \\( 9 \\) and \\( 13 \\) are coprime, the Frobenius Coin (Chicken McNugget) Theorem applies directly to \\( 9a + 13b \\) with \\( a, b \\in \\mathbb{Z}_{\\ge 0} \\).</p><p><strong>Step 2 (Largest Non-Representable Integer):</strong> Applying \\( g(a, b) = ab - a - b \\):<br>\\[ g(9, 13) = 9 \\times 13 - 9 - 13 = 117 - 22 = 95\\text{ mm}. \\]</p><p><strong>Step 3 (Count of Non-Representable Positive Integers):</strong> By Sylvester\'s theorem for two coprime denominations, exactly half of the integers in \\( [0, (a-1)(b-1) - 1] \\) are non-representable:<br>\\[ N(9, 13) = \\frac{(9 - 1)(13 - 1)}{2} = \\frac{8 \\times 12}{2} = 48. \\]<br><strong>Final Answer:</strong> Largest impossible length \\( = 95\\text{ mm} \\); total impossible positive integer lengths \\( = 48 \\).</p>',
      ar: '<p><strong>الخطوة 1 (التحقق من الأولية النسبية):</strong> نلاحظ أن \\( \\gcd(9, 13) = 1 \\)، فتطبّق مبرهنة العملات لفروبينيوس (وسيلفستر) على التوليفات \\( 9a + 13b \\) مع \\( a, b \\in \\mathbb{Z}_{\\ge 0} \\).</p><p><strong>الخطوة 2 (أكبر طول غير قابل للتكوين):</strong> بتطبيق الصيغة \\( ab - a - b \\):<br>\\[ 9 \\times 13 - 9 - 13 = 117 - 22 = 95\\text{ mm}. \\]</p><p><strong>الخطوة 3 (إجمالي الأطوال الموجبة غير القابلة للتكوين):</strong> حسب مبرهنة سيلفستر، عدد الأعداد الصحيحة الموجبة غير القابلة للتمثيل يساوي:<br>\\[ \\frac{(9 - 1)(13 - 1)}{2} = \\frac{8 \\times 12}{2} = 48. \\]<br><strong>الإجابة النهائية:</strong> أكبر طول مستحيل هو \\( 95\\text{ mm} \\)، وعدد الأطوال الموجبة المستحيلة \\( 48 \\).</p>'
    },
    fig: {
      type: 'numberline',
      min: 85,
      max: 102,
      closed: 95,
      ticks: [85, 88, 90, 91, 94, 95, 97, 99, 100, 102]
    }
  },
  {
    number: 7,
    difficulty: 'Basic',
    question: {
      en: '[Ch 4 · Stars and Bars · NSMO Stage 1] Find the number of ordered quadruples of integers \\( (x_1, x_2, x_3, x_4) \\) satisfying \\( x_1 + x_2 + x_3 + x_4 = 19 \\) subject to \\( x_1 \\ge 2,\\; x_2 \\ge 1,\\; x_3 \\ge 0,\\; x_4 \\ge 3 \\).',
      ar: '[الفصل 4 · النجوم والفواصل · نسما المرحلة 1] أوجد عدد الرباعيات المرتبة من الأعداد الصحيحة \\( (x_1, x_2, x_3, x_4) \\) التي تحقق \\( x_1 + x_2 + x_3 + x_4 = 19 \\) بشرط \\( x_1 \\ge 2,\\; x_2 \\ge 1,\\; x_3 \\ge 0,\\; x_4 \\ge 3 \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Shift to Non-Negative Variables):</strong> Define \\( y_1 = x_1 - 2 \\ge 0 \\), \\( y_2 = x_2 - 1 \\ge 0 \\), \\( y_3 = x_3 \\ge 0 \\), and \\( y_4 = x_4 - 3 \\ge 0 \\). Summing the shifted variables:<br>\\[ y_1 + y_2 + y_3 + y_4 = 19 - (2 + 1 + 0 + 3) = 13. \\]</p><p><strong>Step 2 (Stars and Bars Formula):</strong> The number of non-negative integer solutions to \\( y_1 + y_2 + y_3 + y_4 = 13 \\) with \\( k = 4 \\) variables and \\( n = 13 \\) remaining units is:<br>\\[ \\binom{n + k - 1}{k - 1} = \\binom{13 + 4 - 1}{4 - 1} = \\binom{16}{3} = \\frac{16 \\times 15 \\times 14}{6} = 560. \\]<br><strong>Final Answer:</strong> \\( 560 \\) ordered quadruples.</p>',
      ar: '<p><strong>الخطوة 1 (إزاحة المتغيرات إلى أعداد غير سالبة):</strong> نضع \\( y_1 = x_1 - 2 \\ge 0 \\)، و\\( y_2 = x_2 - 1 \\ge 0 \\)، و\\( y_3 = x_3 \\ge 0 \\)، و\\( y_4 = x_4 - 3 \\ge 0 \\). بجمع المتغيرات الجديدة:<br>\\[ y_1 + y_2 + y_3 + y_4 = 19 - (2 + 1 + 0 + 3) = 13. \\]</p><p><strong>الخطوة 2 (قانون النجوم والفواصل):</strong> عدد الحلول غير السالبة لـ \\( k = 4 \\) متغيرات ومجموع \\( n = 13 \\) هو:<br>\\[ \\binom{13 + 4 - 1}{4 - 1} = \\binom{16}{3} = \\frac{16 \\times 15 \\times 14}{6} = 560. \\]<br><strong>الإجابة النهائية:</strong> \\( 560 \\) رباعية مرتبة.</p>'
    }
  },
  {
    number: 8,
    difficulty: 'Basic',
    question: {
      en: '[Ch 4 · Inclusion-Exclusion Principle · KAUST KMC] Among the \\( 120 \\) finalists at a Saudi STEM camp, \\( 72 \\) compete in Mathematics, \\( 54 \\) compete in Physics, \\( 45 \\) compete in Informatics, \\( 28 \\) do both Math and Physics, \\( 22 \\) do both Math and Informatics, \\( 18 \\) do both Physics and Informatics, and \\( 10 \\) compete in all three olympiads. How many finalists compete in NONE of the three olympiads?',
      ar: '[الفصل 4 · مبدأ الشمول والإقصاء · مسابقة كاوست] من بين \\( 120 \\) متأهلاً في ملتقى علمي بالمملكة، يشارك \\( 72 \\) في الرياضيات، و\\( 54 \\) في الفيزياء، و\\( 45 \\) في المعلوماتية، و\\( 28 \\) في الرياضيات والفيزياء معاً، و\\( 22 \\) في الرياضيات والمعلوماتية، و\\( 18 \\) في الفيزياء والمعلوماتية، و\\( 10 \\) في التخصصات الثلاثة معاً. كم طالباً لا يشارك في أيٍّ من الأولمبيادات الثلاثة؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Three-Set Inclusion-Exclusion):</strong> Let \\( M, P, I \\) denote the sets of students in Mathematics, Physics, and Informatics. By PIE:<br>\\[ |M \\cup P \\cup I| = (|M| + |P| + |I|) - (|M \\cap P| + |M \\cap I| + |P \\cap I|) + |M \\cap P \\cap I|. \\]</p><p><strong>Step 2 (Substitute the Counts):</strong><br>\\[ |M \\cup P \\cup I| = (72 + 54 + 45) - (28 + 22 + 18) + 10 = 171 - 68 + 10 = 113. \\]</p><p><strong>Step 3 (Complement Count):</strong> Subtracting from the universal set of \\( 120 \\) finalists gives \\( 120 - 113 = 7 \\) students in none of the three tracks.<br><strong>Final Answer:</strong> \\( 7 \\) finalists.</p>',
      ar: '<p><strong>الخطوة 1 (مبدأ الشمول والإقصاء لثلاث مجموعات):</strong> نرمز لمجموعات الرياضيات والفيزياء والمعلوماتية بالرموز \\( M, P, I \\):<br>\\[ |M \\cup P \\cup I| = (|M| + |P| + |I|) - (|M \\cap P| + |M \\cap I| + |P \\cap I|) + |M \\cap P \\cap I|. \\]</p><p><strong>الخطوة 2 (التعويض العددي):</strong><br>\\[ |M \\cup P \\cup I| = (72 + 54 + 45) - (28 + 22 + 18) + 10 = 171 - 68 + 10 = 113. \\]</p><p><strong>الخطوة 3 (حساب المتممة):</strong> بطرح الناتج من إجمالي المتأهلين \\( 120 \\) نجد \\( 120 - 113 = 7 \\) طلاب.<br><strong>الإجابة النهائية:</strong> \\( 7 \\) طلاب.</p>'
    },
    fig: {
      type: 'venn_populated',
      title: 'STEM Camp Olympiad Overlap (Math vs Physics Projection)',
      labelA: 'Math (72)',
      labelB: 'Physics (54)',
      onlyA: 44,
      both: 28,
      onlyB: 26,
      outside: 22
    }
  },
  {
    number: 9,
    difficulty: 'Basic',
    question: {
      en: '[Ch 5 · Linear Recurrence Tiling · NSMO Stage 1] In how many ways can a \\( 2 \\times 9 \\) walkway be completely tiled using identical \\( 1 \\times 2 \\) dominoes (placed horizontally or vertically)?',
      ar: '[الفصل 5 · التبليط والعلاقات التكرارية · نسما المرحلة 1] بكم طريقة مختلفة يمكن تبليط ممر شبكي أبعاده \\( 2 \\times 9 \\) بالكامل باستخدام قطع دومينو متطابقة أبعادها \\( 1 \\times 2 \\) (توضع أفقياً أو رأسياً)؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Establish the Recurrence):</strong> Let \\( T_n \\) be the number of domino tilings of a \\( 2 \\times n \\) board. Examine the rightmost column:<br>• One vertical domino covers column \\( n \\) in \\( T_{n-1} \\) ways.<br>• Two stacked horizontal dominoes cover columns \\( n - 1 \\) and \\( n \\) in \\( T_{n-2} \\) ways.<br>Hence \\( T_n = T_{n-1} + T_{n-2} \\) with base cases \\( T_1 = 1 \\) and \\( T_2 = 2 \\).</p><p><strong>Step 2 (Iterative Computation up to \\( n = 9 \\)):</strong><br>\\[ T_1 = 1,\\; T_2 = 2,\\; T_3 = 3,\\; T_4 = 5,\\; T_5 = 8,\\; T_6 = 13,\\; T_7 = 21,\\; T_8 = 34,\\; T_9 = 55. \\]<br><strong>Final Answer:</strong> \\( 55 \\) tilings.</p>',
      ar: '<p><strong>الخطوة 1 (بناء العلاقة التكرارية):</strong> ليكن \\( T_n \\) عدد طرق تبليط الشبكة \\( 2 \\times n \\). ندرس تغطية العمود الأخير:<br>• قطعة دومينو رأسية واحدة تترك لوحة \\( 2 \\times (n-1) \\) بعدد \\( T_{n-1} \\) طريقة.<br>• قطعتان أفقيتان متطابقتان تغطيان آخر عمودين وتتركان \\( T_{n-2} \\) طريقة.<br>إذن \\( T_n = T_{n-1} + T_{n-2} \\) مع شروط البداية \\( T_1 = 1 \\) و\\( T_2 = 2 \\).</p><p><strong>الخطوة 2 (الحساب التتابعي حتى \\( n = 9 \\)):</strong><br>\\[ T_1 = 1,\\; T_2 = 2,\\; T_3 = 3,\\; T_4 = 5,\\; T_5 = 8,\\; T_6 = 13,\\; T_7 = 21,\\; T_8 = 34,\\; T_9 = 55. \\]<br><strong>الإجابة النهائية:</strong> \\( 55 \\) طريقة.</p>'
    }
  },
  {
    number: 10,
    difficulty: 'Basic',
    question: {
      en: '[Ch 5 · Geometric Probability · AMC 10 / KMC] Two robotics shuttles arrive independently and uniformly at random between \\( 09{:}00 \\) and \\( 10{:}00 \\) at the KAUST Thuwal station. Each shuttle waits \\( 15 \\) minutes before departing. Find the exact probability that the two shuttles meet at the station.',
      ar: '[الفصل 5 · الاحتمال الهندسي · مسابقة كاوست] تصل حافلتان ذاتيتا القيادة بشكل مستقل وباحتمال منتظم عشوائياً بين الساعة \\( 09{:}00 \\) و\\( 10{:}00 \\) إلى محطة كاوست في ثول، وتنتظر كل حافلة \\( 15 \\) دقيقة قبل المغادرة. ما الاحتمال الدقيق لالتقاء الحافلتين في المحطة؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Sample Space Square):</strong> Model the arrival times (in fractions of an hour) as \\( (x, y) \\in [0, 1]^2 \\), which has total area \\( 1 \\). Waiting \\( 15 \\) minutes equals \\( \\frac{1}{4} \\) hour, so the shuttles meet if and only if \\( |x - y| \\le \\frac{1}{4} \\).</p><p><strong>Step 2 (Complement Triangle Area):</strong> The non-meeting region \\( |x - y| > \\frac{1}{4} \\) consists of two congruent right isosceles triangles in the upper-left and lower-right corners of \\( [0, 1]^2 \\), each of leg length \\( 1 - \\frac{1}{4} = \\frac{3}{4} \\).</p><p><strong>Step 3 (Probability Calculation):</strong><br>\\[ P(\\text{meet}) = 1 - 2 \\cdot \\frac{1}{2}\\left(\\frac{3}{4}\\right)^2 = 1 - \\frac{9}{16} = \\frac{7}{16}. \\]<br><strong>Final Answer:</strong> \\( \\frac{7}{16} \\).</p>',
      ar: '<p><strong>الخطوة 1 (تمثيل فضاء العينة بالمربع):</strong> نمثّل زمنَي الوصول بالساعات على الصورة \\( (x, y) \\in [0, 1]^2 \\) بمساحة كلية \\( 1 \\). مدة الانتظار \\( 15 \\) دقيقة تعادل \\( \\frac{1}{4} \\) ساعة، فيلتقيان إذا وفقط إذا كان \\( |x - y| \\le \\frac{1}{4} \\).</p><p><strong>الخطوة 2 (مساحة المثلثين المتممين):</strong> منطقة عدم الالتقاء \\( |x - y| > \\frac{1}{4} \\) تتألف من مثلثين قائمين متطابقين في ركنَي المربع، طول ضلع القائمة في كلٍّ منهما \\( 1 - \\frac{1}{4} = \\frac{3}{4} \\).</p><p><strong>الخطوة 3 (حساب الاحتمال):</strong><br>\\[ P = 1 - 2 \\cdot \\frac{1}{2}\\left(\\frac{3}{4}\\right)^2 = 1 - \\frac{9}{16} = \\frac{7}{16}. \\]<br><strong>الإجابة النهائية:</strong> \\( \\frac{7}{16} \\).</p>'
    },
    fig: {
      type: 'polygon',
      title: 'Meeting Band |x − y| ≤ 1/4 Inside Unit Square [0, 1] × [0, 1]',
      vertices: [
        [0, 0],
        [1, 0],
        [4, 3],
        [4, 4],
        [3, 4],
        [0, 1]
      ],
      labels: ['(0,0)', '(1/4,0)', '(1,3/4)', '(1,1)', '(3/4,1)', '(0,1/4)']
    }
  },
  {
    number: 11,
    difficulty: 'Basic',
    question: {
      en: '[Ch 6 · Intersecting Chords & Power of a Point · NSMO Stage 1] Inside circle \\( \\omega \\), chords \\( AB \\) and \\( CD \\) intersect at point \\( P \\). Given \\( AP = 6 \\), \\( PB = 14 \\), and \\( CD = 19 \\) with \\( CP < PD \\), find the exact lengths of \\( CP \\) and \\( PD \\).',
      ar: '[الفصل 6 · تقاطع الأوتار وقوة النقطة · نسما المرحلة 1] داخل الدائرة \\( \\omega \\)، يتقاطع الوتران \\( AB \\) و\\( CD \\) في النقطة \\( P \\). إذا علمت أن \\( AP = 6 \\)، و\\( PB = 14 \\)، وطول الوتر \\( CD = 19 \\) مع \\( CP < PD \\)، فأوجد طولَي \\( CP \\) و\\( PD \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Intersecting Chords Theorem):</strong> By Power of an Interior Point \\( P \\), \\( AP \\cdot PB = CP \\cdot PD \\). Let \\( CP = x \\); since \\( CP + PD = CD = 19 \\), we have \\( PD = 19 - x \\).</p><p><strong>Step 2 (Quadratic Equation):</strong><br>\\[ x(19 - x) = 6 \\times 14 = 84 \\iff x^2 - 19x + 84 = 0 \\iff (x - 7)(x - 12) = 0. \\]</p><p><strong>Step 3 (Select Ordered Segments):</strong> Since \\( CP < PD \\), we obtain \\( CP = 7 \\) and \\( PD = 12 \\).<br><strong>Final Answer:</strong> \\( CP = 7 \\) and \\( PD = 12 \\).</p>',
      ar: '<p><strong>الخطوة 1 (مبرهنة الأوتار المتقاطعة):</strong> حسب قوة النقطة الداخلية \\( P \\)، يتحقق \\( AP \\cdot PB = CP \\cdot PD \\). نفرض \\( CP = x \\)، فيكون \\( PD = 19 - x \\).</p><p><strong>الخطوة 2 (تكوين المعادلة التربيعية وحلها):</strong><br>\\[ x(19 - x) = 6 \\times 14 = 84 \\iff x^2 - 19x + 84 = 0 \\iff (x - 7)(x - 12) = 0. \\]</p><p><strong>الخطوة 3 (مراعاة شرط الترتيب \\( CP < PD \\)):</strong> نجد \\( CP = 7 \\) و\\( PD = 12 \\).<br><strong>الإجابة النهائية:</strong> \\( CP = 7 \\) و\\( PD = 12 \\).</p>'
    },
    fig: {
      type: 'circle_chords_similarity',
      a: '6',
      b: '14',
      c: 'x',
      d: '19 − x'
    }
  },
  {
    number: 12,
    difficulty: 'Basic',
    question: {
      en: '[Ch 6 · Tangent-Secant Power · KAUST KMC] From an external point \\( P \\), tangent \\( PT \\) touches circle \\( \\omega \\) at \\( T \\) with \\( PT = 12 \\), and secant \\( PAB \\) intersects \\( \\omega \\) at \\( A \\) and \\( B \\) (with \\( PA < PB \\)) such that the chord \\( AB = 7 \\). Find \\( PA \\) and \\( PB \\).',
      ar: '[الفصل 6 · مبرهنة المماس والقاطع · مسابقة كاوست] من نقطة خارجية \\( P \\)، يمس المستقيم \\( PT \\) الدائرة \\( \\omega \\) في \\( T \\) بطول \\( PT = 12 \\)، ويقطع القاطع \\( PAB \\) الدائرة في \\( A \\) و\\( B \\) (حيث \\( PA < PB \\)) بحيث يكون طول الوتر \\( AB = 7 \\). أوجد \\( PA \\) و\\( PB \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Tangent-Secant Theorem):</strong> The power of external point \\( P \\) with respect to \\( \\omega \\) satisfies \\( PT^2 = PA \\cdot PB \\). Let \\( PA = x > 0 \\); then \\( PB = PA + AB = x + 7 \\).</p><p><strong>Step 2 (Solve for \\( x \\)):</strong><br>\\[ x(x + 7) = 12^2 = 144 \\iff x^2 + 7x - 144 = 0 \\iff (x - 9)(x + 16) = 0. \\]</p><p><strong>Step 3 (Extract Lengths):</strong> Taking \\( x > 0 \\) gives \\( PA = 9 \\) and \\( PB = 9 + 7 = 16 \\) (check: \\( 9 \\times 16 = 144 = 12^2 \\)).<br><strong>Final Answer:</strong> \\( PA = 9 \\) and \\( PB = 16 \\).</p>',
      ar: '<p><strong>الخطوة 1 (مبرهنة المماس والقاطع):</strong> قوة النقطة الخارجية \\( P \\) تحقق \\( PT^2 = PA \\cdot PB \\). نفرض \\( PA = x > 0 \\)، فيكون \\( PB = x + 7 \\).</p><p><strong>الخطوة 2 (حل المعادلة التربيعية):</strong><br>\\[ x(x + 7) = 12^2 = 144 \\iff x^2 + 7x - 144 = 0 \\iff (x - 9)(x + 16) = 0. \\]</p><p><strong>الخطوة 3 (استخلاص الأطوال الموجبة):</strong> بما أن \\( x > 0 \\) نحصل على \\( PA = 9 \\) و\\( PB = 9 + 7 = 16 \\).<br><strong>الإجابة النهائية:</strong> \\( PA = 9 \\) و\\( PB = 16 \\).</p>'
    },
    fig: {
      type: 'circle_tangent_segment',
      r: 'R',
      t: '12',
      ext: 'PA = x'
    }
  },
  {
    number: 13,
    difficulty: 'Basic',
    question: {
      en: '[Ch 7 · Angle Bisector & Stewart\'s Theorem · NSMO Stage 1] In \\( \\triangle ABC \\) with sides \\( AB = 10 \\), \\( AC = 15 \\), and \\( BC = 20 \\), the internal angle bisector of \\( \\angle A \\) meets \\( BC \\) at \\( D \\). Find \\( BD \\), \\( DC \\), and the exact bisector length \\( AD \\).',
      ar: '[الفصل 7 · منصف الزاوية ومبرهنة ستيوارت · نسما المرحلة 1] في المثلث \\( \\triangle ABC \\) الذي أطوال أضلاعه \\( AB = 10 \\)، و\\( AC = 15 \\)، و\\( BC = 20 \\)، يلاقي المنصف الداخلي للزاوية \\( \\angle A \\) الضلعَ \\( BC \\) في النقطة \\( D \\). أوجد \\( BD \\) و\\( DC \\) والطول الدقيق للمنصف \\( AD \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Angle Bisector Ratio):</strong> By the Angle Bisector Theorem, \\( \\frac{BD}{DC} = \\frac{AB}{AC} = \\frac{10}{15} = \\frac{2}{3} \\). Since \\( BD + DC = 20 \\), we obtain:<br>\\[ BD = \\frac{2}{5}(20) = 8, \\qquad DC = \\frac{3}{5}(20) = 12. \\]</p><p><strong>Step 2 (Angle Bisector Length Formula / Stewart\'s Corollary):</strong> Using \\( AD^2 = AB \\cdot AC - BD \\cdot DC \\):<br>\\[ AD^2 = (10)(15) - (8)(12) = 150 - 96 = 54 \\implies AD = \\sqrt{54} = 3\\sqrt{6}. \\]<br><strong>Final Answer:</strong> \\( BD = 8 \\), \\( DC = 12 \\), and \\( AD = 3\\sqrt{6} \\).</p>',
      ar: '<p><strong>الخطوة 1 (مبرهنة منصف الزاوية):</strong> يقسم المنصف \\( AD \\) الضلع المقابل بنسبة الضلعين المجاورين \\( \\frac{BD}{DC} = \\frac{10}{15} = \\frac{2}{3} \\). وبما أن \\( BD + DC = 20 \\) نجد:<br>\\[ BD = 8, \\qquad DC = 12. \\]</p><p><strong>الخطوة 2 (صيغة طول المنصف المستنتجة من ستيوارت):</strong> بتطبيق العلاقة \\( AD^2 = AB \\cdot AC - BD \\cdot DC \\):<br>\\[ AD^2 = 10 \\times 15 - 8 \\times 12 = 150 - 96 = 54 \\implies AD = 3\\sqrt{6}. \\]<br><strong>الإجابة النهائية:</strong> \\( BD = 8 \\)، و\\( DC = 12 \\)، و\\( AD = 3\\sqrt{6} \\).</p>'
    },
    fig: {
      type: 'angle_bisector',
      AB: '10',
      AC: '15',
      BD: '8',
      DC: '12'
    }
  },
  {
    number: 14,
    difficulty: 'Basic',
    question: {
      en: '[Ch 8 · Parity Invariants · NSMO Stage 1] The numbers \\( 1, 2, 3, \\dots, 2026 \\) are written on a whiteboard. Repeatedly erase any two numbers \\( a, b \\) and replace them with \\( |a - b| \\) until a single number \\( F \\) remains. Determine whether \\( F \\) is even or odd, and prove whether \\( F = 0 \\) is achievable.',
      ar: '[الفصل 8 · لامتغير الزوجية · نسما المرحلة 1] كُتبت الأعداد \\( 1, 2, 3, \\dots, 2026 \\) على سبورة. في كل خطوة نمسح أي عددين \\( a, b \\) ونكتب مكانهما \\( |a - b| \\) حتى يتبقى عدد واحد \\( F \\). حدّد زوجية العدد \\( F \\)، وأثبت هل يمكن أن يكون \\( F = 0 \\) أم لا.'
    },
    solution: {
      en: '<p><strong>Step 1 (Parity Invariant):</strong> Let \\( S \\) be the sum of all numbers currently on the board. Replacing \\( a, b \\) with \\( |a - b| \\) changes \\( S \\) by \\( (a + b) - |a - b| = 2\\min(a, b) \\), which is always EVEN! Thus \\( S \\pmod 2 \\) is a strict invariant.</p><p><strong>Step 2 (Initial Sum Parity):</strong> Compute the parity of the initial sum:<br>\\[ S_0 = \\frac{2026 \\times 2027}{2} = 1013 \\times 2027. \\]<br>Since both \\( 1013 \\) and \\( 2027 \\) are odd, \\( S_0 \\) is ODD!</p><p><strong>Step 3 (Conclusion):</strong> The final number \\( F \\) satisfies \\( F \\equiv S_0 \\equiv 1 \\pmod 2 \\), so \\( F \\) MUST be odd. Because \\( 0 \\) is even, \\( F = 0 \\) is strictly impossible!<br><strong>Final Answer:</strong> \\( F \\) is always odd; \\( F = 0 \\) is impossible.</p>',
      ar: '<p><strong>الخطوة 1 (لامتغير الزوجية):</strong> ليكن \\( S \\) مجموع الأعداد المكتوبة على السبورة. عند استبدال \\( a, b \\) بالمقدار \\( |a - b| \\) ينقص المجموع بمقدار \\( (a + b) - |a - b| = 2\\min(a, b) \\) وهو عدد زوجي دائماً! إذن \\( S \\pmod 2 \\) لامتغير ثابت.</p><p><strong>الخطوة 2 (زوجية المجموع الابتدائي):</strong> نحسب المجموع الابتدائي:<br>\\[ S_0 = \\frac{2026 \\times 2027}{2} = 1013 \\times 2027. \\]<br>جداء عددين فرديين هو عدد فردي حتماً!</p><p><strong>الخطوة 3 (الاستنتاج النهائي):</strong> يجب أن يحقق العدد المتبقي \\( F \\equiv S_0 \\equiv 1 \\pmod 2 \\)، أي أن \\( F \\) فردي دائماً، وبما أن \\( 0 \\) زوجي يستحيل الحصول على \\( F = 0 \\).<br><strong>الإجابة النهائية:</strong> \\( F \\) عدد فردي دائماً، ويستحيل أن يساوي \\( 0 \\).</p>'
    }
  },
  {
    number: 15,
    difficulty: 'Basic',
    question: {
      en: '[Ch 9 · NSMO of KSA Screening · Digit-Sum Congruence] A six-digit multiple of \\( 36 \\) has the decimal form \\( \\overline{4 A 2 7 3 B} \\). Find ALL possible ordered pairs of digits \\( (A, B) \\).',
      ar: '[الفصل 9 · الفرز الأولي لأولمبياد نسما · قابلية القسمة المركبة] عدد مكوّن من ست خانات على الصورة \\( \\overline{4 A 2 7 3 B} \\) يقبل القسمة على \\( 36 \\). أوجد جميع الأزواج المرتبة الممكنة للخانتين \\( (A, B) \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Split into Coprime Moduli):</strong> Since \\( 36 = 4 \\times 9 \\) with \\( \\gcd(4, 9) = 1 \\), the integer \\( N = \\overline{4A273B} \\) is divisible by \\( 36 \\) if and only if \\( 4 \\mid N \\) AND \\( 9 \\mid N \\).</p><p><strong>Step 2 (Divisibility by \\( 4 \\)):</strong> The last two digits \\( \\overline{3B} \\) must be divisible by \\( 4 \\). Checking \\( 30..39 \\), only \\( 32 \\) and \\( 36 \\) are multiples of \\( 4 \\), so \\( B \\in \\{2, 6\\} \\).</p><p><strong>Step 3 (Divisibility by \\( 9 \\)):</strong> The digit sum \\( 4 + A + 2 + 7 + 3 + B = 16 + A + B \\) must be a multiple of \\( 9 \\):<br>• If \\( B = 2 \\): \\( 18 + A \\equiv 0 \\pmod 9 \\implies A \\in \\{0, 9\\} \\) (both valid since \\( A \\) is the second digit!).<br>• If \\( B = 6 \\): \\( 22 + A \\equiv 0 \\pmod 9 \\implies A = 5 \\).<br><strong>Final Answer:</strong> Three valid pairs: \\( (0, 2),\\; (9, 2),\\; (5, 6) \\).</p>',
      ar: '<p><strong>الخطوة 1 (تفكيك القاسم إلى عاملين أوليين نسبياً):</strong> بما أن \\( 36 = 4 \\times 9 \\) و\\( \\gcd(4, 9) = 1 \\)، فإن العدد يقبل القسمة على \\( 36 \\) إذا وفقط إذا قبل القسمة على \\( 4 \\) وعلى \\( 9 \\) معاً.</p><p><strong>الخطوة 2 (شرط القسمة على \\( 4 \\)):</strong> يجب أن يقبل العدد المكوّن من آخر خانتين \\( \\overline{3B} \\) القسمة على \\( 4 \\)، ومنه \\( \\overline{3B} \\in \\{32, 36\\} \\implies B \\in \\{2, 6\\} \\).</p><p><strong>الخطوة 3 (شرط القسمة على \\( 9 \\)):</strong> مجموع الخانات \\( 16 + A + B \\) يجب أن يقبل القسمة على \\( 9 \\):<br>• عند \\( B = 2 \\): \\( 18 + A \\equiv 0 \\pmod 9 \\implies A \\in \\{0, 9\\} \\).<br>• عند \\( B = 6 \\): \\( 22 + A \\equiv 0 \\pmod 9 \\implies A = 5 \\).<br><strong>الإجابة النهائية:</strong> ثلاثة أزواج ممكنة: \\( (0, 2),\\; (9, 2),\\; (5, 6) \\).</p>'
    }
  },
  {
    number: 16,
    difficulty: 'Basic',
    question: {
      en: '[Ch 9 · NSMO of KSA Stage 1 · Grid Path Counting] On a coordinate lattice from \\( (0, 0) \\) to \\( (6, 4) \\), a courier moves only one unit Right (\\( R \\)) or one unit Up (\\( U \\)) per step, and is forbidden from passing through the blocked intersection \\( (3, 2) \\). How many valid shortest paths exist?',
      ar: '[الفصل 9 · نسما المرحلة 1 · عدّ المسارات الشبكية] على شبكة إحداثية من \\( (0, 0) \\) إلى \\( (6, 4) \\)، يتحرك مسبار خطوة واحدة لليمين (\\( R \\)) أو للأعلى (\\( U \\)) فقط في كل حركة، ويُمنع من المرور بالنقطة المغلقة \\( (3, 2) \\). كم مساراً أقصر مسموحاً يوجد؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Unrestricted Lattice Paths):</strong> Every shortest path from \\( (0, 0) \\) to \\( (6, 4) \\) uses \\( 6 \\) steps Right and \\( 4 \\) steps Up in some order, giving \\( \\binom{6+4}{4} = \\binom{10}{4} = 210 \\) total paths.</p><p><strong>Step 2 (Paths Hitting the Blocked Node \\( (3, 2) \\)):</strong> A path visiting \\( (3, 2) \\) decomposes uniquely into a subpath \\( (0, 0) \\to (3, 2) \\) followed by \\( (3, 2) \\to (6, 4) \\):<br>\\[ \\binom{3+2}{2} \\times \\binom{(6-3)+(4-2)}{4-2} = \\binom{5}{2} \\times \\binom{5}{2} = 10 \\times 10 = 100. \\]</p><p><strong>Step 3 (Complementary Subtraction):</strong> Valid paths \\( = 210 - 100 = 110 \\).<br><strong>Final Answer:</strong> \\( 110 \\) shortest paths.</p>',
      ar: '<p><strong>الخطوة 1 (إجمالي المسارات دون قيد):</strong> كل مسار أقصر من \\( (0, 0) \\) إلى \\( (6, 4) \\) يتكون من \\( 6 \\) خطوات يميناً و\\( 4 \\) خطوات للأعلى، وعددها \\( \\binom{10}{4} = 210 \\).</p><p><strong>الخطوة 2 (المسارات المارة بالنقطة المحظورة \\( (3, 2) \\)):</strong> ينقسم كل مسار يمر بـ \\( (3, 2) \\) إلى جزأين مستقلين \\( (0,0) \\to (3,2) \\) ثم \\( (3,2) \\to (6,4) \\):<br>\\[ \\binom{5}{2} \\times \\binom{5}{2} = 10 \\times 10 = 100. \\]</p><p><strong>الخطوة 3 (الطرح التكميلي):</strong> عدد المسارات المسموحة يساوي \\( 210 - 100 = 110 \\).<br><strong>الإجابة النهائية:</strong> \\( 110 \\) مساراً.</p>'
    },
    fig: {
      type: 'polygon',
      title: '6 × 4 Lattice Grid Bounding Box (0,0) to (6,4)',
      vertices: [
        [0, 0],
        [6, 0],
        [6, 4],
        [0, 4]
      ],
      labels: ['(0,0)', '(6,0)', '(6,4)', '(0,4)'],
      sides: ['6 steps R', '4 steps U', '6', '4']
    }
  },
  {
    number: 17,
    difficulty: 'Basic',
    question: {
      en: '[Ch 11 · KAUST KMC Regional Qualifier · Functional Evaluation] Suppose \\( f : \\mathbb{R} \\setminus \\{0, 1\\} \\to \\mathbb{R} \\) satisfies \\( f(x) + 2 f\\!\\left(\\frac{x - 1}{x}\\right) = 6x \\) for all \\( x \\notin \\{0, 1\\} \\). Compute \\( f(2) \\).',
      ar: '[الفصل 11 · التصفيات الإقليمية لمسابقة كاوست · المعادلات الدالية] إذا كانت الدالة \\( f : \\mathbb{R} \\setminus \\{0, 1\\} \\to \\mathbb{R} \\) تحقق \\( f(x) + 2 f\\!\\left(\\frac{x - 1}{x}\\right) = 6x \\) لكل \\( x \\notin \\{0, 1\\} \\)، فاحسب القيمة الدقيقة لـ \\( f(2) \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Three-Cycle Substitution Orbit):</strong> Notice the Möbius map \\( g(x) = \\frac{x - 1}{x} \\) has period \\( 3 \\): starting from \\( x = 2 \\), \\( g(2) = \\frac{1}{2} \\), \\( g(1/2) = -1 \\), and \\( g(-1) = 2 \\)! Substitute all three orbit points into the functional equation:<br>1. \\( x = 2 \\): \\( f(2) + 2f(1/2) = 12 \\)<br>2. \\( x = 1/2 \\): \\( f(1/2) + 2f(-1) = 3 \\)<br>3. \\( x = -1 \\): \\( f(-1) + 2f(2) = -6 \\).</p><p><strong>Step 2 (Eliminate \\( f(1/2) \\) and \\( f(-1) \\)):</strong> Take \\( (1) - 2 \\times (2) + 4 \\times (3) \\):<br>\\[ [f(2) + 2f(1/2)] - 2[f(1/2) + 2f(-1)] + 4[f(-1) + 2f(2)] = 12 - 6 + (-24) \\]<br>\\[ 9 f(2) = -18 \\implies f(2) = -2. \\]<br><strong>Final Answer:</strong> \\( f(2) = -2 \\).</p>',
      ar: '<p><strong>الخطوة 1 (مدار التحويل الكسري ثلاثي الدورة):</strong> نلاحظ أن التحويل \\( g(x) = \\frac{x - 1}{x} \\) دورته \\( 3 \\)؛ فعند البدء بـ \\( x = 2 \\) نجد \\( g(2) = \\frac{1}{2} \\)، ثم \\( g(1/2) = -1 \\)، ثم \\( g(-1) = 2 \\)! نعوّض القيم الثلاث في المعادلة الدالية:<br>1. عند \\( x = 2 \\): \\( f(2) + 2f(1/2) = 12 \\)<br>2. عند \\( x = 1/2 \\): \\( f(1/2) + 2f(-1) = 3 \\)<br>3. عند \\( x = -1 \\): \\( f(-1) + 2f(2) = -6 \\).</p><p><strong>الخطوة 2 (الحذف الخطي للمجاهيل المساعدة):</strong> نكوّن التوليفة \\( (1) - 2(2) + 4(3) \\):<br>\\[ 9 f(2) = 12 - 2(3) + 4(-6) = -18 \\implies f(2) = -2. \\]<br><strong>الإجابة النهائية:</strong> \\( f(2) = -2 \\).</p>'
    }
  },
  {
    number: 18,
    difficulty: 'Basic',
    question: {
      en: '[Ch 11 · KAUST KMC Speed Sprint · Nested Radicals] Simplify \\( E = \\sqrt{19 + 8\\sqrt{3}} + \\sqrt{19 - 8\\sqrt{3}} \\) to an exact integer without a calculator.',
      ar: '[الفصل 11 · جولة السرعة في مسابقة كاوست · تبسيط الجذور المتداخلة] بسّط المقدار \\( E = \\sqrt{19 + 8\\sqrt{3}} + \\sqrt{19 - 8\\sqrt{3}} \\) إلى عدد صحيح دقيق دون آلة حاسبة.'
    },
    solution: {
      en: '<p><strong>Step 1 (Un-nest via Binomial Square):</strong> Seek \\( a > b > 0 \\) with \\( (a + b)^2 = a^2 + b^2 + 2ab = 19 + 8\\sqrt{3} \\). Matching \\( 2ab = 8\\sqrt{3} \\implies ab = 4\\sqrt{3} \\) and \\( a^2 + b^2 = 19 \\), choosing \\( a = 4 \\) and \\( b = \\sqrt{3} \\) gives \\( 4^2 + (\\sqrt{3})^2 = 16 + 3 = 19 \\).</p><p><strong>Step 2 (Extract Principal Positive Roots):</strong> Since \\( 4 > \\sqrt{3} \\),<br>\\[ \\sqrt{19 + 8\\sqrt{3}} = 4 + \\sqrt{3}, \\qquad \\sqrt{19 - 8\\sqrt{3}} = |4 - \\sqrt{3}| = 4 - \\sqrt{3}. \\]</p><p><strong>Step 3 (Sum &amp; Squaring Verification):</strong> Adding gives \\( E = (4 + \\sqrt{3}) + (4 - \\sqrt{3}) = 8 \\). (Squaring check: \\( E^2 = 19 + 8\\sqrt{3} + 19 - 8\\sqrt{3} + 2\\sqrt{361 - 192} = 38 + 2\\sqrt{169} = 38 + 26 = 64 \\implies E = 8 \\).)<br><strong>Final Answer:</strong> \\( E = 8 \\).</p>',
      ar: '<p><strong>الخطوة 1 (إزالة التداخل عبر المربع الكامل):</strong> نبحث عن \\( a > b > 0 \\) بحيث \\( (a + b)^2 = a^2 + b^2 + 2ab = 19 + 8\\sqrt{3} \\). باختيار \\( a = 4 \\) و\\( b = \\sqrt{3} \\) نتحقق أن \\( 4^2 + (\\sqrt{3})^2 = 16 + 3 = 19 \\) و\\( 2(4)\\sqrt{3} = 8\\sqrt{3} \\).</p><p><strong>الخطوة 2 (أخذ الجذر التربيعي الموجب):</strong> بما أن \\( 4 > \\sqrt{3} \\)، فإن:<br>\\[ \\sqrt{19 + 8\\sqrt{3}} = 4 + \\sqrt{3}, \\qquad \\sqrt{19 - 8\\sqrt{3}} = |4 - \\sqrt{3}| = 4 - \\sqrt{3}. \\]</p><p><strong>الخطوة 3 (الجمع والتحقق بالتربيع):</strong> بجمع المقدارين يختفي الجذر الأصم فنحصل على \\( E = 8 \\) (ويمكن التحقق بتربيع \\( E > 0 \\): \\( E^2 = 38 + 2\\sqrt{361 - 192} = 38 + 26 = 64 \\)).<br><strong>الإجابة النهائية:</strong> \\( E = 8 \\).</p>'
    }
  },

  // ======================== INTERMEDIATE (19 - 27) ========================
  {
    number: 19,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 1 · Cauchy-Schwarz / Titu\'s Lemma · NSMO Stage 2] For positive real numbers \\( x, y, z > 0 \\) satisfying \\( x + 2y + 3z = 12 \\), find the minimum possible value of \\( M = \\frac{3}{x} + \\frac{6}{y} + \\frac{9}{z} \\) and the unique triple \\( (x, y, z) \\) attaining it.',
      ar: '[الفصل 1 · متباينة كوشي-شوارتز (تيتو) · نسما المرحلة 2] للأعداد الحقيقية الموجبة \\( x, y, z > 0 \\) التي تحقق \\( x + 2y + 3z = 12 \\)، أوجد أصغر قيمة ممكنة للمقدار \\( M = \\frac{3}{x} + \\frac{6}{y} + \\frac{9}{z} \\) والثلاثية الوحيدة \\( (x, y, z) \\) التي تحققها.'
    },
    solution: {
      en: '<p><strong>Step 1 (Align Denominators with the Constraint):</strong> Match the linear constraint \\( x + 2y + 3z = 12 \\) by rewriting \\( M \\) with denominators \\( x,\\; 2y,\\; 3z \\):<br>\\[ M = \\frac{3}{x} + \\frac{12}{2y} + \\frac{27}{3z} = 3\\left(\\frac{1^2}{x} + \\frac{2^2}{2y} + \\frac{3^2}{3z}\\right). \\]</p><p><strong>Step 2 (Apply Titu\'s Lemma):</strong><br>\\[ M \\ge 3 \\cdot \\frac{(1 + 2 + 3)^2}{x + 2y + 3z} = 3 \\cdot \\frac{36}{12} = 9. \\]</p><p><strong>Step 3 (Equality Condition):</strong> Equality holds iff \\( \\frac{1}{x} = \\frac{2}{2y} = \\frac{3}{3z} \\iff x = y = z \\). Substituting into \\( x + 2y + 3z = 12 \\) gives \\( 6x = 12 \\implies (x, y, z) = (2, 2, 2) \\) (check: \\( \\frac{3}{2} + \\frac{6}{2} + \\frac{9}{2} = 9 \\)).<br><strong>Final Answer:</strong> Minimum \\( M = 9 \\) at \\( (x, y, z) = (2, 2, 2) \\).</p>',
      ar: '<p><strong>الخطوة 1 (مواءمة المقامات مع القيد الخطي):</strong> نعيد كتابة \\( M \\) لتصبح مقاماته مطابقة لحدود القيد \\( x + 2y + 3z = 12 \\):<br>\\[ M = \\frac{3}{x} + \\frac{12}{2y} + \\frac{27}{3z} = 3\\left(\\frac{1^2}{x} + \\frac{2^2}{2y} + \\frac{3^2}{3z}\\right). \\]</p><p><strong>الخطوة 2 (تطبيق متباينة تيتو / كوشي-شوارتز الكسرية):</strong><br>\\[ M \\ge 3 \\cdot \\frac{(1 + 2 + 3)^2}{x + 2y + 3z} = 3 \\cdot \\frac{36}{12} = 9. \\]</p><p><strong>الخطوة 3 (شرط تحقق المساواة):</strong> تتحقق المساواة إذا وفقط إذا كان \\( \\frac{1}{x} = \\frac{2}{2y} = \\frac{3}{3z} \\iff x = y = z \\)، وبالتعويض في \\( 6x = 12 \\) نجد \\( (x, y, z) = (2, 2, 2) \\).<br><strong>الإجابة النهائية:</strong> القيمة الصغرى هي \\( 9 \\) عند \\( (2, 2, 2) \\).</p>'
    }
  },
  {
    number: 20,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 2 · Chinese Remainder Theorem · NSMO Stage 2] Find the smallest positive integer \\( N \\) satisfying the simultaneous congruences \\( N \\equiv 3 \\pmod 7 \\), \\( N \\equiv 5 \\pmod 9 \\), and \\( N \\equiv 4 \\pmod{11} \\).',
      ar: '[الفصل 2 · مبرهنة الباقي الصيني · نسما المرحلة 2] أوجد أصغر عدد صحيح موجب \\( N \\) يحقق نظام التطابقات \\( N \\equiv 3 \\pmod 7 \\)، و\\( N \\equiv 5 \\pmod 9 \\)، و\\( N \\equiv 4 \\pmod{11} \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Combine First Two Congruences):</strong> From \\( N \\equiv 5 \\pmod 9 \\), write \\( N = 9k + 5 \\). Substitute into \\( N \\equiv 3 \\pmod 7 \\):<br>\\[ 9k + 5 \\equiv 3 \\pmod 7 \\iff 2k \\equiv -2 \\pmod 7 \\iff k \\equiv -1 \\equiv 6 \\pmod 7. \\]<br>Writing \\( k = 7m + 6 \\) gives \\( N = 9(7m + 6) + 5 = 63m + 59 \\) (check: \\( 59 = 7(8) + 3 \\) and \\( 59 = 9(6) + 5 \\)).</p><p><strong>Step 2 (Merge with Modulus \\( 11 \\)):</strong> Substitute \\( N = 63m + 59 \\) into \\( N \\equiv 4 \\pmod{11} \\): since \\( 63 \\equiv 8 \\pmod{11} \\) and \\( 59 \\equiv 4 \\pmod{11} \\),<br>\\[ 8m + 4 \\equiv 4 \\pmod{11} \\iff 8m \\equiv 0 \\pmod{11} \\iff m \\equiv 0 \\pmod{11}! \\]</p><p><strong>Step 3 (Minimal Positive Solution):</strong> Taking \\( m = 0 \\) yields \\( N = 59 \\) modulo \\( 7 \\times 9 \\times 11 = 693 \\) (check: \\( 59 = 11(5) + 4 \\)).<br><strong>Final Answer:</strong> \\( N = 59 \\).</p>',
      ar: '<p><strong>الخطوة 1 (دمج التطابقين الأول والثاني):</strong> من \\( N \\equiv 5 \\pmod 9 \\) نضع \\( N = 9k + 5 \\)، ونعوّض في \\( N \\equiv 3 \\pmod 7 \\):<br>\\[ 9k + 5 \\equiv 3 \\pmod 7 \\iff 2k \\equiv -2 \\pmod 7 \\iff k \\equiv -1 \\equiv 6 \\pmod 7. \\]<br>إذن \\( k = 7m + 6 \\implies N = 9(7m + 6) + 5 = 63m + 59 \\).</p><p><strong>الخطوة 2 (الدمج مع التطابق الثالث بترديد \\( 11 \\)):</strong> بما أن \\( 59 = 5 \\times 11 + 4 \\equiv 4 \\pmod{11} \\) و\\( 63 \\equiv 8 \\pmod{11} \\):<br>\\[ 8m + 4 \\equiv 4 \\pmod{11} \\iff m \\equiv 0 \\pmod{11}. \\]</p><p><strong>الخطوة 3 (استخلاص أصغر حل موجب):</strong> عند \\( m = 0 \\) نحصل مباشرةً على \\( N = 59 \\) (وهو الوحيد بترديد \\( 693 \\)).<br><strong>الإجابة النهائية:</strong> \\( N = 59 \\).</p>'
    }
  },
  {
    number: 21,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 2 · Legendre\'s Formula & Trailing Zeros · KAUST KMC] How many trailing zeros does \\( 125! \\) end with when written in base \\( 10 \\), and what is its number of trailing zeros when written in base \\( 12 \\)?',
      ar: '[الفصل 2 · صيغة ليجاندر والأصفار الطرفية · مسابقة كاوست] بكم صفراً ينتهي العدد \\( 125! \\) عند كتابته في النظام العشري (الأساس \\( 10 \\))، وبكم صفراً ينتهي عند كتابته في نظام العد ذي الأساس \\( 12 \\)؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Base \\( 10 = 2 \\cdot 5 \\)):</strong> Since \\( v_2(125!) > v_5(125!) \\), the number of base-\\( 10 \\) trailing zeros equals \\( v_5(125!) \\):<br>\\[ v_5(125!) = \\left\\lfloor \\frac{125}{5} \\right\\rfloor + \\left\\lfloor \\frac{125}{25} \\right\\rfloor + \\left\\lfloor \\frac{125}{125} \\right\\rfloor = 25 + 5 + 1 = 31. \\]</p><p><strong>Step 2 (Base \\( 12 = 2^2 \\cdot 3 \\)):</strong> The highest power \\( 12^k \\mid 125! \\) equals \\( k = \\min\\!\\left(\\lfloor v_2(125!)/2 \\rfloor,\\; v_3(125!)\\right) \\). Compute both valuations:<br>\\[ v_3(125!) = 41 + 13 + 4 + 1 = 59, \\qquad v_2(125!) = 62 + 31 + 15 + 7 + 3 + 1 = 119. \\]</p><p><strong>Step 3 (Compare Bottlenecks):</strong> Since \\( \\lfloor 119 / 2 \\rfloor = 59 \\) and \\( v_3(125!) = 59 \\), both prime-power constraints tie at \\( k = \\min(59, 59) = 59 \\)!<br><strong>Final Answer:</strong> \\( 31 \\) zeros in base \\( 10 \\), and \\( 59 \\) zeros in base \\( 12 \\).</p>',
      ar: '<p><strong>الخطوة 1 (النظام العشري ذو الأساس \\( 10 = 2 \\cdot 5 \\)):</strong> يحدد العامل الأولي \\( 5 \\) عدد الأصفار الطرفية بصيغة ليجاندر:<br>\\[ v_5(125!) = \\left\\lfloor \\frac{125}{5} \\right\\rfloor + \\left\\lfloor \\frac{125}{25} \\right\\rfloor + \\left\\lfloor \\frac{125}{125} \\right\\rfloor = 25 + 5 + 1 = 31. \\]</p><p><strong>الخطوة 2 (الأساس \\( 12 = 2^2 \\cdot 3 \\)):</strong> عدد الأصفار الطرفية يساوي \\( k = \\min\\!\\left(\\lfloor v_2(125!)/2 \\rfloor,\\; v_3(125!)\\right) \\). نحسب التقييمين:<br>\\[ v_3(125!) = 41 + 13 + 4 + 1 = 59, \\qquad v_2(125!) = 62 + 31 + 15 + 7 + 3 + 1 = 119. \\]</p><p><strong>الخطوة 3 (مقارنة القيدين):</strong> نجد \\( \\lfloor 119 / 2 \\rfloor = 59 \\) و\\( v_3(125!) = 59 \\)، فيتساوى القيدان عند \\( k = 59 \\)!<br><strong>الإجابة النهائية:</strong> \\( 31 \\) صفراً في الأساس \\( 10 \\)، و\\( 59 \\) صفراً في الأساس \\( 12 \\).</p>'
    }
  },
  {
    number: 22,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 3 · Fractional-Part & Floor Equations · AIME / NSMO Stage 2] Find all positive real solutions \\( x \\) to the floor equation \\( \\lfloor x \\rfloor + \\lfloor 2x \\rfloor + \\lfloor 4x \\rfloor = 17 \\). Express your answer as a half-open interval.',
      ar: '[الفصل 3 · معادلات دالة الجزء الصحيح · نسما المرحلة 2] أوجد جميع الحلول الحقيقية الموجبة \\( x \\) لمعادلة الجزء الصحيح \\( \\lfloor x \\rfloor + \\lfloor 2x \\rfloor + \\lfloor 4x \\rfloor = 17 \\)، واكتب مجموعة الحل على صورة فترة نصف مغلقة.'
    },
    solution: {
      en: '<p><strong>Step 1 (Isolate the Integer Part \\( n = \\lfloor x \\rfloor \\)):</strong> Write \\( x = n + r \\) with \\( n \\in \\mathbb{Z}_{\\ge 0} \\) and \\( r \\in [0, 1) \\). Then:<br>\\[ 17 = n + (2n + \\lfloor 2r \\rfloor) + (4n + \\lfloor 4r \\rfloor) = 7n + \\lfloor 2r \\rfloor + \\lfloor 4r \\rfloor. \\]<br>Since \\( 0 \\le \\lfloor 2r \\rfloor + \\lfloor 4r \\rfloor \\le 1 + 3 = 4 \\), we require \\( 13 \\le 7n \\le 17 \\), which uniquely forces \\( n = 2 \\)!</p><p><strong>Step 2 (Solve for the Fractional Part \\( r \\)):</strong> Substituting \\( n = 2 \\) gives \\( \\lfloor 2r \\rfloor + \\lfloor 4r \\rfloor = 17 - 14 = 3 \\). Testing the quarter-intervals of \\( [0, 1) \\):<br>• \\( r \\in [0, 1/4) \\implies 0 + 0 = 0 \\)<br>• \\( r \\in [1/4, 1/2) \\implies 0 + 1 = 1 \\)<br>• \\( r \\in [1/2, 3/4) \\implies 1 + 2 = 3 \\) ✓<br>• \\( r \\in [3/4, 1) \\implies 1 + 3 = 4 \\).</p><p><strong>Step 3 (Reconstruct \\( x = 2 + r \\)):</strong> Adding \\( n = 2 \\) to \\( r \\in [1/2, 3/4) \\) yields \\( x \\in [5/2, 11/4) \\) (check at \\( x = 2.6 \\): \\( 2 + 5 + 10 = 17 \\)).<br><strong>Final Answer:</strong> \\( x \\in \\left[\\frac{5}{2},\\; \\frac{11}{4}\\right) \\).</p>',
      ar: '<p><strong>الخطوة 1 (حصر الجزء الصحيح \\( n = \\lfloor x \\rfloor \\)):</strong> نضع \\( x = n + r \\) حيث \\( n \\in \\mathbb{Z}_{\\ge 0} \\) و\\( r \\in [0, 1) \\)، فتصبح المعادلة:<br>\\[ 17 = 7n + \\lfloor 2r \\rfloor + \\lfloor 4r \\rfloor. \\]<br>وبما أن \\( 0 \\le \\lfloor 2r \\rfloor + \\lfloor 4r \\rfloor \\le 4 \\)، فإن \\( 13 \\le 7n \\le 17 \\)، مما يفرض حصراً \\( n = 2 \\)!</p><p><strong>الخطوة 2 (تحديد فترة الجزء الكسري \\( r \\)):</strong> عند \\( n = 2 \\) نحتاج \\( \\lfloor 2r \\rfloor + \\lfloor 4r \\rfloor = 3 \\). بفحص أرباع الفترة \\( [0, 1) \\) نجد أن المجموع يساوي \\( 0, 1, 3, 4 \\) على الترتيب، ويتحقق المجموع \\( 3 \\) حصراً عندما \\( r \\in [1/2, 3/4) \\) حيث \\( 1 + 2 = 3 \\).</p><p><strong>الخطوة 3 (كتابة فترة الحل):</strong> بإضافة \\( n = 2 \\) نحصل على \\( x \\in [5/2, 11/4) \\).<br><strong>الإجابة النهائية:</strong> \\( x \\in \\left[\\frac{5}{2},\\; \\frac{11}{4}\\right) \\).</p>'
    }
  },
  {
    number: 23,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 4 · Derangements & PIE · NSMO Stage 2] Six Mawhiba researchers sit in \\( 6 \\) assigned lab stations. After a break, they return randomly such that EXACTLY \\( 2 \\) researchers sit in their original stations and the remaining \\( 4 \\) researchers all sit in someone else\'s station. In how many ways can this occur?',
      ar: '[الفصل 4 · التبديلات الخالية من النقاط الثابتة · نسما المرحلة 2] يجلس \\( 6 \\) باحثين من موهبة في \\( 6 \\) محطات مختبر مخصصة. وبعد الاستراحة عادوا للجلوس بحيث جلس باحثان اثنان بالضبط في محطتيهما الأصليتين، وجلس الباحثون الـ \\( 4 \\) الآخرون جميعاً في محطات غير محطاتهم. بكم طريقة يمكن أن يحدث ذلك؟'
    },
    solution: {
      en: '<p><strong>Step 1 (Choose the Fixed Points):</strong> Select which \\( 2 \\) of the \\( 6 \\) researchers return to their own stations:<br>\\[ \\binom{6}{2} = \\frac{6 \\times 5}{2} = 15 \\text{ ways.} \\]</p><p><strong>Step 2 (Derange the Remaining \\( 4 \\) Researchers):</strong> None of the other \\( 4 \\) researchers may sit in their own station, so they must form a derangement \\( D_4 \\):<br>\\[ D_4 = 4!\\left(1 - \\frac{1}{1!} + \\frac{1}{2!} - \\frac{1}{3!} + \\frac{1}{4!}\\right) = 24\\left(\\frac{1}{2} - \\frac{1}{6} + \\frac{1}{24}\\right) = 12 - 4 + 1 = 9. \\]</p><p><strong>Step 3 (Multiply Independent Choices):</strong> Total valid seating permutations \\( = \\binom{6}{2} \\cdot D_4 = 15 \\times 9 = 135 \\).<br><strong>Final Answer:</strong> \\( 135 \\) ways.</p>',
      ar: '<p><strong>الخطوة 1 (اختيار النقطتين الثابتتين):</strong> نختار الباحثَين اللذين سيجلسان في محطتيهما الأصليتين من بين \\( 6 \\) باحثين:<br>\\[ \\binom{6}{2} = 15 \\text{ طريقة.} \\]</p><p><strong>الخطوة 2 (تبديل الـ \\( 4 \\) الباقين دون أي نقطة ثابتة \\( D_4 \\)):</strong> يجب ألا يجلس أيٌّ من الـ \\( 4 \\) الباقين في مكانه الأصلي:<br>\\[ D_4 = 4!\\left(\\frac{1}{2!} - \\frac{1}{3!} + \\frac{1}{4!}\\right) = 12 - 4 + 1 = 9. \\]</p><p><strong>الخطوة 3 (قاعدة الضرب):</strong> إجمالي التراتيب يساوي \\( 15 \\times 9 = 135 \\) طريقة.<br><strong>الإجابة النهائية:</strong> \\( 135 \\) طريقة.</p>'
    }
  },
  {
    number: 24,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 5 · Markov Chain / Expected Waiting Time · KAUST KMC] A fair coin is tossed repeatedly until the pattern \\( HTH \\) (Heads–Tails–Heads) appears on three consecutive tosses. Compute the exact expected number of tosses \\( E \\) required.',
      ar: '[الفصل 5 · سلاسل ماركوف والتوقع الشرطي · مسابقة كاوست] تُرمى قطعة نقد عادلة مراراً حتى يظهر النمط المتتالي \\( HTH \\) (صورة–كتابة–صورة) لأول مرة. احسب القيمة المتوقعة الدقيقة \\( E \\) لعدد الرميات اللازمة.'
    },
    solution: {
      en: '<p><strong>Step 1 (Define Prefix States):</strong> Let \\( e_0 = E \\) be the expected remaining tosses from start (no prefix matched), \\( e_1 \\) after last toss \\( H \\), and \\( e_2 \\) after last two tosses \\( HT \\). Notice the crucial overlap when \\( HT \\) is followed by \\( T \\) vs when \\( HTH \\) completes!</p><p><strong>Step 2 (Set Up First-Step Equations):</strong><br>1. \\( e_0 = 1 + \\frac{1}{2}e_1 + \\frac{1}{2}e_0 \\implies e_0 = e_1 + 2 \\).<br>2. From \\( H \\), tossing \\( H \\) stays in state \\( H \\) while \\( T \\) advances to \\( HT \\): \\( e_1 = 1 + \\frac{1}{2}e_1 + \\frac{1}{2}e_2 \\implies e_1 = e_2 + 2 \\).<br>3. From \\( HT \\), tossing \\( H \\) finishes (\\( 0 \\) more tosses!), while tossing \\( T \\) resets completely to \\( e_0 \\) (since \\( HTT \\) has no prefix of \\( HTH \\)): \\( e_2 = 1 + \\frac{1}{2}(0) + \\frac{1}{2}e_0 \\).</p><p><strong>Step 3 (Solve the Linear System):</strong> Expressing in terms of \\( e_0 \\): \\( e_2 = e_1 - 2 = e_0 - 4 \\). Substituting into (3):<br>\\[ e_0 - 4 = 1 + \\frac{1}{2}e_0 \\implies \\frac{1}{2}e_0 = 5 \\implies e_0 = 10. \\]<br><strong>Final Answer:</strong> \\( E = 10 \\) tosses.</p>',
      ar: '<p><strong>الخطوة 1 (تعريف حالات البادئة):</strong> نرمز بـ \\( e_0 = E \\) لعدد الرميات المتوقع من البداية، وبـ \\( e_1 \\) بعد الحصول على البادئة \\( H \\)، وبـ \\( e_2 \\) بعد الحصول على البادئة \\( HT \\).</p><p><strong>الخطوة 2 (كتابة معادلات الخطوة الأولى):</strong><br>1. من البداية: \\( e_0 = 1 + \\frac{1}{2}e_1 + \\frac{1}{2}e_0 \\implies e_0 = e_1 + 2 \\).<br>2. من الحالة \\( H \\): ظهور \\( H \\) يُبقينا في \\( H \\) وظهور \\( T \\) ينقلنا إلى \\( HT \\)، أي \\( e_1 = 1 + \\frac{1}{2}e_1 + \\frac{1}{2}e_2 \\implies e_1 = e_2 + 2 \\).<br>3. من الحالة \\( HT \\): ظهور \\( H \\) يُكمل النمط \\( HTH \\) فوراً، بينما ظهور \\( T \\) يعيدنا إلى \\( e_0 \\): \\( e_2 = 1 + \\frac{1}{2}(0) + \\frac{1}{2}e_0 \\).</p><p><strong>الخطوة 3 (حل النظام الخطي):</strong> بالتعويض \\( e_2 = e_0 - 4 \\) في المعادلة الثالثة نجد \\( e_0 - 4 = 1 + \\frac{1}{2}e_0 \\implies e_0 = 10 \\).<br><strong>الإجابة النهائية:</strong> التوقع الرياضي \\( E = 10 \\) رميات.</p>'
    },
    fig: {
      type: 'network_graph',
      title: 'State-Transition Automaton for Pattern HTH',
      nodes: [
        { id: 'S0', x: 45, y: 95, label: 'Start' },
        { id: 'S1', x: 135, y: 95, label: 'H' },
        { id: 'S2', x: 225, y: 95, label: 'HT' },
        { id: 'S3', x: 315, y: 95, label: 'HTH' }
      ],
      edges: [
        { from: 'S0', to: 'S1', weight: '1/2' },
        { from: 'S1', to: 'S2', weight: '1/2' },
        { from: 'S2', to: 'S3', weight: '1/2' },
        { from: 'S2', to: 'S0', weight: '1/2' }
      ]
    }
  },
  {
    number: 25,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 6 · Ptolemy\'s Theorem · NSMO Stage 2] Equilateral triangle \\( ABC \\) of side length \\( 19 \\) is inscribed in circle \\( \\omega \\). Point \\( P \\) lies on minor arc \\( \\widehat{BC} \\) with \\( PB = 5 \\). Find the exact lengths of \\( PC \\) and \\( PA \\).',
      ar: '[الفصل 6 · مبرهنة بطليموس · نسما المرحلة 2] مثلث متطابق الأضلاع \\( ABC \\) طول ضلعه \\( 19 \\) محاط بالدائرة \\( \\omega \\). تقع النقطة \\( P \\) على القوس الأصغر \\( \\widehat{BC} \\) بحيث \\( PB = 5 \\). أوجد الطولين الدقيقين لكلٍّ من \\( PC \\) و\\( PA \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Van Schooten\'s Corollary of Ptolemy\'s Theorem):</strong> Since \\( P \\) lies on minor arc \\( \\widehat{BC} \\), quadrilateral \\( ABPC \\) is cyclic with diagonals \\( PA \\) and \\( BC \\). Applying Ptolemy\'s Theorem:<br>\\[ PA \\cdot BC = AB \\cdot PC + AC \\cdot PB. \\]<br>Dividing by \\( AB = BC = AC = 19 \\) yields the golden Olympiad identity \\( PA = PB + PC = 5 + PC \\)!</p><p><strong>Step 2 (Inscribed Angle &amp; Law of Cosines in \\( \\triangle BPC \\)):</strong> Because \\( ABPC \\) is cyclic and \\( \\angle BAC = 60^\\circ \\), \\( \\angle BPC = 180^\\circ - 60^\\circ = 120^\\circ \\). Let \\( PC = x > 0 \\); by the Law of Cosines in \\( \\triangle BPC \\):<br>\\[ 19^2 = 5^2 + x^2 - 2(5)(x)\\cos 120^\\circ \\implies 361 = 25 + x^2 + 5x. \\]</p><p><strong>Step 3 (Solve the Eisenstein Quadratic):</strong> \\( x^2 + 5x - 336 = 0 \\iff (x - 16)(x + 21) = 0 \\implies PC = 16 \\), and therefore \\( PA = 5 + 16 = 21 \\).<br><strong>Final Answer:</strong> \\( PC = 16 \\) and \\( PA = 21 \\).</p>',
      ar: '<p><strong>الخطوة 1 (نتيجة فان سخوتن لمبرهنة بطليموس):</strong> بما أن \\( P \\) تقع على القوس الأصغر \\( \\widehat{BC} \\)، فالرباعي \\( ABPC \\) دائري قطراه \\( PA \\) و\\( BC \\). بتطبيق مبرهنة بطليموس والقسمة على \\( AB = BC = AC = 19 \\) نحصل على المتطابقة الشهيرة \\( PA = PB + PC = 5 + PC \\)!</p><p><strong>الخطوة 2 (قانون جيب التمام في المثلث \\( \\triangle BPC \\)):</strong> الزاوية المحيطية المقابلة للوتر \\( BC \\) تحقق \\( \\angle BPC = 180^\\circ - 60^\\circ = 120^\\circ \\). بفرض \\( PC = x > 0 \\):<br>\\[ 19^2 = 5^2 + x^2 - 2(5)(x)\\cos 120^\\circ \\implies 361 = 25 + x^2 + 5x. \\]</p><p><strong>الخطوة 3 (حل المعادلة واستنتاج \\( PA \\)):</strong> نحل \\( x^2 + 5x - 336 = (x - 16)(x + 21) = 0 \\) فنحصل على \\( PC = 16 \\)، ومنه \\( PA = 5 + 16 = 21 \\).<br><strong>الإجابة النهائية:</strong> \\( PC = 16 \\) و\\( PA = 21 \\).</p>'
    },
    fig: {
      type: 'circle',
      r: 11,
      center: ['O', ''],
      title: 'Equilateral △ABC Inscribed in ω with P on Minor Arc BC'
    }
  },
  {
    number: 26,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 7 · Ceva\'s & Menelaus\'s Area Ratios · NSMO Stage 2] In \\( \\triangle ABC \\) of total area \\( 140 \\), point \\( D \\) lies on \\( BC \\) with \\( BD : DC = 2 : 3 \\), and point \\( E \\) lies on \\( AC \\) with \\( AE : EC = 3 : 1 \\). Segments \\( AD \\) and \\( BE \\) intersect at \\( P \\). Find the exact ratio \\( AP : PD \\) and the area \\( [ABP] \\).',
      ar: '[الفصل 7 · مبرهنتا سيفا ومينيلاوس ونسب المساحات · نسما المرحلة 2] في المثلث \\( \\triangle ABC \\) الذي مساحته الكلية \\( 140 \\)، تقع \\( D \\) على \\( BC \\) بنسبة \\( BD : DC = 2 : 3 \\)، وتقع \\( E \\) على \\( AC \\) بنسبة \\( AE : EC = 3 : 1 \\). يتقاطع \\( AD \\) و\\( BE \\) في النقطة \\( P \\). أوجد النسبة الدقيقة \\( AP : PD \\) ومساحة المثلث \\( [ABP] \\).'
    },
    solution: {
      en: '<p><strong>Step 1 (Mass Points / Menelaus on \\( \\triangle ADC \\) with Transversal \\( B-P-E \\)):</strong> Assign mass \\( m_C = 6 \\). Since \\( BD : DC = 2 : 3 \\), balance \\( BC \\) at \\( D \\) with \\( m_B = 9 \\) so \\( m_D = 9 + 6 = 15 \\). Since \\( AE : EC = 3 : 1 \\), balance \\( AC \\) at \\( E \\) with \\( m_A = 2 \\) so \\( 3 m_A = 1 m_C = 6 \\).</p><p><strong>Step 2 (Ratio Along \\( AD \\)):</strong> Balancing segment \\( AD \\) at \\( P \\) gives:<br>\\[ \\frac{AP}{PD} = \\frac{m_D}{m_A} = \\frac{15}{2}. \\]<br>(Menelaus check on \\( \\triangle ADC \\) with line \\( BPE \\): \\( \\frac{BC}{BD} \\cdot \\frac{DP}{PA} \\cdot \\frac{AE}{EC} = 1 \\implies \\frac{5}{2} \\cdot \\frac{DP}{PA} \\cdot \\frac{3}{1} = 1 \\implies \\frac{AP}{PD} = \\frac{15}{2} \\).)</p><p><strong>Step 3 (Area Chain):</strong> First \\( [ABD] = \\frac{BD}{BC}[ABC] = \\frac{2}{5}(140) = 56 \\). Then:<br>\\[ [ABP] = \\frac{AP}{AD}[ABD] = \\frac{15}{15 + 2}(56) = \\frac{840}{17}. \\]<br><strong>Final Answer:</strong> \\( AP : PD = 15 : 2 \\) and \\( [ABP] = \\frac{840}{17} \\).</p>',
      ar: '<p><strong>الخطوة 1 (طريقة الكتل النقطية / مينيلاوس):</strong> نضع كتلة \\( m_C = 6 \\). لموازنة \\( BC \\) عند \\( D \\) حيث \\( BD : DC = 2 : 3 \\)، نضع \\( m_B = 9 \\) فتكون كتلة \\( D \\) هي \\( m_D = 15 \\). ولموازنة \\( AC \\) عند \\( E \\) حيث \\( AE : EC = 3 : 1 \\)، نضع \\( m_A = 2 \\).</p><p><strong>الخطوة 2 (حساب النسبة \\( AP : PD \\)):</strong> بموازنة القطعة \\( AD \\) عند \\( P \\) نجد:<br>\\[ \\frac{AP}{PD} = \\frac{m_D}{m_A} = \\frac{15}{2}. \\]</p><p><strong>الخطوة 3 (حساب المساحة عبر نسب القواعد):</strong> مساحة \\( [ABD] = \\frac{2}{5}(140) = 56 \\)، ومن ثم:<br>\\[ [ABP] = \\frac{15}{15 + 2}[ABD] = \\frac{15}{17}(56) = \\frac{840}{17}. \\]<br><strong>الإجابة النهائية:</strong> \\( AP : PD = 15 : 2 \\) ومساحة \\( [ABP] = \\frac{840}{17} \\).</p>'
    },
    fig: {
      type: 'triangle',
      A: [3, 8],
      B: [0, 0],
      C: [10, 0],
      labels: { A: 'A', B: 'B', C: 'C' },
      sides: { c: 'AB', a: 'BC (2:3 at D)', b: 'AC (3:1 at E)' }
    }
  },
  {
    number: 27,
    difficulty: 'Intermediate',
    question: {
      en: '[Ch 8 · Chessboard Domino Coloring · KAUST KMC] From an \\( 8 \\times 8 \\) chessboard, two opposite corner squares \\( (1, 1) \\) and \\( (8, 8) \\) are removed, leaving \\( 62 \\) squares. Prove rigorously whether the remaining \\( 62 \\) squares can be tiled by \\( 31 \\) non-overlapping \\( 1 \\times 2 \\) dominoes, and contrast this with removing one black square and one white square.',
      ar: '[الفصل 8 · تلوين رقعة الشطرنج واللامتغيرات · مسابقة كاوست] أُزيل المربعان الركنيان المتقابلان \\( (1, 1) \\) و\\( (8, 8) \\) من رقعة شطرنج أبعادها \\( 8 \\times 8 \\) فتبقى \\( 62 \\) مربعاً. أثبت بدقة هل يمكن تبليط المربعات المتبقية بـ \\( 31 \\) قطعة دومينو \\( 1 \\times 2 \\)، وقارن ذلك بحالة إزالة مربع أسود واحد ومربع أبيض واحد.'
    },
    solution: {
      en: '<p><strong>Step 1 (Bipartite Coloring Invariant):</strong> Color square \\( (i, j) \\) black if \\( i + j \\) is even and white if \\( i + j \\) is odd. The full \\( 8 \\times 8 \\) board has \\( 32 \\) black and \\( 32 \\) white squares. Every \\( 1 \\times 2 \\) domino covers two adjacent squares of opposite parities, hence ALWAYS \\( 1 \\) black and \\( 1 \\) white square.</p><p><strong>Step 2 (Opposite Corners Impossibility):</strong> Both \\( (1, 1) \\) and \\( (8, 8) \\) have even coordinate sums (\\( 2 \\) and \\( 16 \\)), so BOTH removed corners are black! The remaining board has \\( 30 \\) black and \\( 32 \\) white squares, whereas \\( 31 \\) dominoes would cover \\( 31 \\) black and \\( 31 \\) white squares — a contradiction! Thus tiling is <strong>impossible</strong>.</p><p><strong>Step 3 (Gomory\'s Theorem Contrast):</strong> Removing ANY \\( 1 \\) black and \\( 1 \\) white square ALWAYS allows a valid \\( 31 \\)-domino tiling, proved by threading a closed Hamiltonian cycle of length \\( 64 \\) through the board: the two opposite-color squares cut the cycle into two even-length paths, each tilable greedily!<br><strong>Final Answer:</strong> Impossible for opposite corners (\\( 30 \\) black vs \\( 32 \\) white); always possible when \\( 1 \\) black and \\( 1 \\) white square are removed.</p>',
      ar: '<p><strong>الخطوة 1 (لامتغير التلوين الثنائي):</strong> نلوّن المربع \\( (i, j) \\) بالأسود إذا كان \\( i + j \\) زوجياً وبالأبيض إذا كان فردياً، فتحوي الرقعة الكاملة \\( 32 \\) مربعاً أسود و\\( 32 \\) أبيض. كل قطعة دومينو \\( 1 \\times 2 \\) تغطي مربعين متجاورين، أي مربعاً أسود واحداً ومربعاً أبيض واحداً دائماً.</p><p><strong>الخطوة 2 (استحالة التبليط عند حذف ركنين متقابلين):</strong> الركنان \\( (1, 1) \\) و\\( (8, 8) \\) كلاهما زوجي المجموع، أي كلاهما أسود! فيتبقى \\( 30 \\) مربعاً أسود مقابل \\( 32 \\) مربعاً أبيض، بينما تغطي \\( 31 \\) قطعة دومينو \\( 31 \\) أسود و\\( 31 \\) أبيض حصراً — تناقض قاطع!</p><p><strong>الخطوة 3 (مبرهنة غوموري للمقارنة):</strong> أما عند حذف أي مربع أسود واحد وأي مربع أبيض واحد، فيمكن دائماً تبليط الرقعة عبر تمرير مسار هاملتوني مغلق طوله \\( 64 \\) ينقسم إلى سلسلتين زوجيتَي الطول.<br><strong>الإجابة النهائية:</strong> مستحيل عند حذف ركنين متقابلين؛ وممكن دائماً عند حذف مربع أسود ومربع أبيض.</p>'
    }
  }
];
