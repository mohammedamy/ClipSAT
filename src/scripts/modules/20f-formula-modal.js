(function(){
  /* ── Official Formula & Reference Sheets Engine ── */
  var FORMULA_DATA = {
    'sat': {
      title: 'Digital SAT & ACT Reference Sheet',
      titleAr: 'ورقة القوانين الرسمية لاختبار سات و إيه سي تي',
      desc: 'Authorized geometric and algebraic formulas for the College Board Digital SAT, ACT, and EST examinations.',
      cards: [
        {
          title: 'Circles & 2D Geometry',
          titleAr: 'الدائرة والأشكال ثنائية الأبعاد',
          body: 'Circle Area: \\(A = \\pi r^2\\)<br>Circumference: \\(C = 2\\pi r = \\pi d\\)<br>Arc length: \\(s = r\\theta\\) (\\(\\theta\\) in radians) or \\(s = \\frac{\\theta^\\circ}{360^\\circ} \\times 2\\pi r\\)<br>Sector area: \\(A = \\frac{1}{2}r^2\\theta\\) or \\(A = \\frac{\\theta^\\circ}{360^\\circ} \\times \\pi r^2\\)<br>Triangle area: \\(A = \\frac{1}{2}bh\\) · Rectangle: \\(A = lw\\)'
        },
        {
          title: 'Special Right Triangles',
          titleAr: 'المثلثات القائمة الخاصة',
          body: 'Pythagorean Theorem: \\(a^2 + b^2 = c^2\\)<br>\\(30^\\circ-60^\\circ-90^\\circ\\) triangle: side ratio is \\(x : x\\sqrt{3} : 2x\\)<br>\\(45^\\circ-45^\\circ-90^\\circ\\) triangle: side ratio is \\(s : s : s\\sqrt{2}\\)<br>Famous Pythagorean triples: \\((3, 4, 5)\\), \\((5, 12, 13)\\), \\((8, 15, 17)\\), \\((7, 24, 25)\\)'
        },
        {
          title: '3D Solids & Volumes',
          titleAr: 'المجسمات الثلاثية والحجوم',
          body: 'Rectangular prism: \\(V = lwh\\)<br>Right cylinder: \\(V = \\pi r^2 h\\)<br>Sphere: \\(V = \\frac{4}{3}\\pi r^3\\)<br>Cone: \\(V = \\frac{1}{3}\\pi r^2 h\\)<br>Pyramid: \\(V = \\frac{1}{3}lwh\\)'
        },
        {
          title: 'Algebra & Coordinate Geometry',
          titleAr: 'الجبر والهندسة الإحداثية',
          body: 'Slope: \\(m = \\frac{y_2 - y_1}{x_2 - x_1}\\) · Point-slope: \\(y - y_1 = m(x - x_1)\\)<br>Parabola vertex: \\(x = -\\frac{b}{2a}\\) · Vertex form: \\(y = a(x - h)^2 + k\\)<br>Quadratic formula: \\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)<br>Discriminant: \\(\\Delta = b^2 - 4ac\\) (\\(>0\\): 2 real roots, \\(=0\\): 1 real root, \\(<0\\): 0 real roots)<br>Exponential growth / decay: \\(A(t) = P(1 \\pm r)^t\\)'
        },
        {
          title: 'Digital SAT SPR (Grid-In) Rules',
          titleAr: 'قواعد إدخال الإجابة (SPR) في سات الرقمي',
          body: 'Enter up to 5 characters for positive numbers, or 6 characters for negative numbers.<br>Acceptable forms: exact integers, decimals, or proper/improper fractions (e.g., <code>7/4</code> or <code>1.75</code>).<br>Never enter mixed numbers (enter <code>3.5</code> or <code>7/2</code>, never <code>3 1/2</code>).<br>Recurring decimals: fill all available decimal spaces (e.g., \\(2/3\\) must be entered as <code>.6666</code> or <code>.6667</code>).'
        }
      ]
    },
    'cambridge': {
      title: 'Cambridge IGCSE® Mathematics 0580 & Pearson Edexcel 4MA1',
      titleAr: 'قوانين كامبريدج وإدكسل IGCSE (المستوى الممتد)',
      desc: 'Authorized formulas for IGCSE Mathematics Extended Tier (Paper 2 Non-Calculator & Paper 4 Calculator).',
      cards: [
        {
          title: 'Algebra & Equations',
          titleAr: 'الجبر والمعادلات',
          body: 'Quadratic equation: \\(ax^2 + bx + c = 0\\)<br>\\[x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\]<br>Indices: \\(a^m \\times a^n = a^{m+n}\\), \\(\\frac{a^m}{a^n} = a^{m-n}\\), \\((a^m)^n = a^{mn}\\), \\(a^{-n} = \\frac{1}{a^n}\\), \\(a^{1/n} = \\sqrt[n]{a}\\)<br>Difference of two squares: \\(a^2 - b^2 = (a-b)(a+b)\\)'
        },
        {
          title: 'Mensuration (Perimeter, Area & Volume)',
          titleAr: 'القياس والمساحات والحجوم',
          body: 'Curved surface area of a cylinder = \\(2\\pi rh\\)<br>Curved surface area of a cone = \\(\\pi r l\\) (where \\(l = \\sqrt{r^2 + h^2}\\))<br>Surface area of a sphere = \\(4\\pi r^2\\)<br>Volume of a sphere = \\(\\frac{4}{3}\\pi r^3\\)<br>Volume of a cone = \\(\\frac{1}{3}\\pi r^2 h\\)<br>Volume of a pyramid = \\(\\frac{1}{3} \\times \\text{base area} \\times h\\)'
        },
        {
          title: 'Trigonometry & Bearings',
          titleAr: 'حساب المثلثات والاتجاهات',
          body: 'Sine rule: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\)<br>Cosine rule: \\(a^2 = b^2 + c^2 - 2bc\\cos A \\iff \\cos A = \\frac{b^2 + c^2 - a^2}{2bc}\\)<br>Area of a triangle: \\(\\text{Area} = \\frac{1}{2}ab\\sin C\\)<br>Three-figure Bearings: Measured clockwise from North (000° to 360°).'
        },
        {
          title: 'Statistics & Probability',
          titleAr: 'الإحصاء والاحتمالات',
          body: 'Mean from frequency table: \\(\\bar{x} = \\frac{\\sum fx}{\\sum f}\\)<br>Interquartile range (IQR) = \\(Q_3 - Q_1\\)<br>Probability of mutually exclusive events: \\(P(A \\cup B) = P(A) + P(B)\\)<br>Independent events: \\(P(A \\cap B) = P(A) \\times P(B)\\)<br>General addition rule: \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)'
        }
      ]
    },
    'addmath': {
      title: 'Cambridge IGCSE® 0606 & Edexcel Further Pure 4PM1 Additional Mathematics',
      titleAr: 'قوانين الرياضيات الإضافية (كامبريدج 0606 وإدكسل 4PM1)',
      desc: 'Authorized reference sheet for Additional Mathematics, bridging IGCSE to AS/A2 and IB Higher Level.',
      cards: [
        {
          title: 'Circular Measure & Trigonometry',
          titleAr: 'القياس الدائري وحساب المثلثات',
          body: 'Arc length: \\(s = r\\theta\\) (\\(\\theta\\) in radians)<br>Sector area: \\(A = \\frac{1}{2}r^2\\theta\\)<br>Segment area: \\(A = \\frac{1}{2}r^2(\\theta - \\sin\\theta)\\)<br>Identities: \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), \\(\\sec^2\\theta = 1 + \\tan^2\\theta\\), \\(\\csc^2\\theta = 1 + \\cot^2\\theta\\)<br>Trig equations: solve in radians or degrees over specified ranges.'
        },
        {
          title: 'Algebra, Quadratics & Binomial Theorem',
          titleAr: 'الجبر والمعادلات التربيعية وذات الحدين',
          body: 'Discriminant \\(\\Delta = b^2 - 4ac\\) (\\(>0\\) two real roots, \\(=0\\) repeated, \\(<0\\) no real roots)<br>Quadratic forms: \\(y = a(x-h)^2 + k\\) vertex at \\((h, k)\\)<br>Remainder & Factor Theorems: \\(P(c) = \\text{remainder}\\) when divided by \\((x-c)\\); if \\(P(c)=0\\), \\((x-c)\\) is a factor.<br>Binomial theorem: \\((a+b)^n = \\sum_{r=0}^n \\binom{n}{r} a^{n-r}b^r\\) where \\(\\binom{n}{r} = \\frac{n!}{r!(n-r)!}\\)'
        },
        {
          title: 'Differentiation & Rates of Change',
          titleAr: 'التفاضل وقواعد الاشتقاق ومعدلات التغير',
          body: 'Product rule: \\((uv)\' = u\'v + uv\'\\) · Quotient rule: \\(\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}\\)<br>Chain rule: \\(\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}\\) · Connected rates: \\(\\frac{dy}{dt} = \\frac{dy}{dx} \\cdot \\frac{dx}{dt}\\)<br>Special derivatives: \\(\\frac{d}{dx}[e^{ax+b}] = a e^{ax+b}\\), \\(\\frac{d}{dx}[\\ln(ax+b)] = \\frac{a}{ax+b}\\)<br>\\(\\frac{d}{dx}[\\sin(ax+b)] = a\\cos(ax+b)\\), \\(\\frac{d}{dx}[\\cos(ax+b)] = -a\\sin(ax+b)\\), \\(\\frac{d}{dx}[\\tan(ax+b)] = a\\sec^2(ax+b)\\)'
        },
        {
          title: 'Integration, Kinematics & 2D Vectors',
          titleAr: 'التكامل وعلم الحركة والمتجهات المستوية',
          body: 'Standard integrals: \\(\\int (ax+b)^n dx = \\frac{(ax+b)^{n+1}}{a(n+1)} + c\\) (\\(n \\neq -1\\)), \\(\\int e^{ax+b} dx = \\frac{1}{a}e^{ax+b} + c\\)<br>\\(\\int \\frac{1}{ax+b} dx = \\frac{1}{a}\\ln|ax+b| + c\\), \\(\\int \\cos(ax+b) dx = \\frac{1}{a}\\sin(ax+b) + c\\)<br>Kinematics: \\(v = \\frac{ds}{dt}\\), \\(a = \\frac{dv}{dt} = v\\frac{dv}{ds}\\), \\(s = \\int v dt\\), \\(v = \\int a dt\\)<br>Vectors in 2D: \\(\\vec{r} = x\\mathbf{i} + y\\mathbf{j}\\), \\(|\\vec{r}| = \\sqrt{x^2 + y^2}\\), unit vector \\(\\hat{r} = \\frac{\\vec{r}}{|\\vec{r}|}\\)'
        }
      ]
    },
    'alevel': {
      title: 'Cambridge International AS & A Level 9709 (MF19) & IB Math',
      titleAr: 'قوانين كامبريدج A-Level (MF19) والبكالوريا الدولية IB',
      desc: 'Selected formulas from the Cambridge MF19 Formula Booklet and IB DP Mathematics Formula Booklet.',
      cards: [
        {
          title: 'Algebra & Series',
          titleAr: 'الجبر والمتسلسلات',
          body: 'Arithmetic progression: \\(u_n = a + (n-1)d\\), \\(S_n = \\frac{n}{2}(2a + (n-1)d) = \\frac{n}{2}(a + l)\\)<br>Geometric progression: \\(u_n = ar^{n-1}\\), \\(S_n = \\frac{a(1-r^n)}{1-r}\\), \\(S_\\infty = \\frac{a}{1-r}\\) (for \\(|r| < 1\\))<br>Binomial series: \\((1+x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\dots\\) (valid for \\(|x| < 1\\))'
        },
        {
          title: 'Trigonometry & Double Angles',
          titleAr: 'المتطابقات المثلثية والزوايا المضاعفة',
          body: 'Compound angles: \\(\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B\\)<br>\\(\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B\\)<br>\\(\\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}\\)<br>Double angles: \\(\\sin 2A = 2\\sin A\\cos A\\), \\(\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A\\)<br>Pythagorean: \\(\\tan^2\\theta + 1 = \\sec^2\\theta\\), \\(1 + \\cot^2\\theta = \\csc^2\\theta\\)'
        },
        {
          title: 'Differentiation',
          titleAr: 'قواعد الاشتقاق والتفاضل',
          body: 'Product rule: \\((uv)\' = u\'v + uv\'\\)<br>Quotient rule: \\(\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}\\)<br>Chain rule: \\(\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}\\)<br>Standard derivatives: \\(\\frac{d}{dx}[e^{kx}] = k e^{kx}\\), \\(\\frac{d}{dx}[\\ln x] = \\frac{1}{x}\\), \\(\\frac{d}{dx}[\\tan x] = \\sec^2 x\\)'
        },
        {
          title: 'Integration & Volume of Revolution',
          titleAr: 'التكامل وحجوم الدوران',
          body: 'Integration by parts: \\(\\int u \\frac{dv}{dx} dx = uv - \\int v \\frac{du}{dx} dx\\)<br>Standard integrals: \\(\\int \\frac{1}{x} dx = \\ln|x| + c\\), \\(\\int e^{kx} dx = \\frac{1}{k}e^{kx} + c\\)<br>\\(\\int \\frac{1}{a^2 + x^2} dx = \\frac{1}{a}\\arctan\\left(\\frac{x}{a}\\right) + c\\)<br>Volume around x-axis: \\(V = \\pi \\int_a^b y^2 dx\\)'
        }
      ]
    },
    'qudrat': {
      title: 'ورقة القوانين الذهبية للقدرات العامة والتحصيلي (قياس)',
      titleAr: 'ورقة القوانين الذهبية للقدرات العامة والتحصيلي (قياس)',
      desc: 'قوانين الحساب الذهني والهندسة والجبر المعتمدة لاختبارات المركز الوطني للقياس — بدون استخدام الآلة الحاسبة.',
      cards: [
        {
          title: 'قوانين الهندسة والمضلعات والمحيطات',
          titleAr: 'قوانين الهندسة والمضلعات والمحيطات',
          body: 'محيط الدائرة = \\(2\\pi r\\) · مساحة الدائرة = \\(\\pi r^2\\)<br>مساحة المثلث = \\(\\frac{1}{2} \\times \\text{القاعدة} \\times \\text{الارتفاع}\\)<br>مجموع الزوايا الداخلية لأي مضلع = \\((n - 2) \\times 180^\\circ\\)<br>قياس الزاوية الداخلية للمضلع المنتظم = \\(\\frac{(n-2)\\times 180^\\circ}{n}\\)<br>عدد أقطار أي مضلع = \\(\\frac{n(n-3)}{2}\\)<br>أشهر مثلثات فيثاغورس: (3، 4، 5) ومضاعفاتها، (5، 12، 13)، (8، 15، 17)'
        },
        {
          title: 'قوانين السرعة والزمن والالتقاء',
          titleAr: 'قوانين السرعة والزمن والالتقاء',
          body: 'المسافة = السرعة \\(\\times\\) الزمن<br>السرعة المتوسطة (ذهاباً وإياباً لمسافة متساوية) = \\(\\frac{2 \\times v_1 \\times v_2}{v_1 + v_2}\\)<br>زمن الالتقاء لجسمين يسيران باتجاهين متعاكسين = \\(\\frac{\\text{المسافة}}{\\text{مجموع السرعتين}}\\)<br>زمن اللحاق لجسمين يسيران في نفس الاتجاه = \\(\\frac{\\text{فارق المسافة}}{\\text{فارق السرعتين}}\\)'
        },
        {
          title: 'المتطابقات والتحليل والأسس',
          titleAr: 'المتطابقات والتحليل والأسس',
          body: '\\((a+b)^2 = a^2 + 2ab + b^2\\)<br>\\((a-b)^2 = a^2 - 2ab + b^2\\)<br>الفرق بين مربعين: \\(a^2 - b^2 = (a-b)(a+b)\\)<br>المتتابعة الحسابية: \\(a_n = a_1 + (n-1)d\\) · المجموع: \\(S_n = \\frac{n}{2}(a_1+a_n)\\)<br>المتتابعة الهندسية: \\(a_n = a_1 r^{n-1}\\) · المجموع اللانهائي: \\(S_\\infty = \\frac{a_1}{1-r}\\) (إذا كان \\(|r|<1\\))'
        },
        {
          title: 'النسبة المئوية والتناسب والربح',
          titleAr: 'النسبة المئوية والتناسب والربح',
          body: 'التناسب الطردي (زيادة تقابلها زيادة): \\(\\frac{x_1}{y_1} = \\frac{x_2}{y_2}\\)<br>التناسب العكسي (زيادة يقابلها نقصان كأيام العمل والعمال): \\(x_1 y_1 = x_2 y_2\\)<br>النسبة المئوية للزيادة / النقصان = \\(\\frac{\\text{مقدار التغير}}{\\text{القيمة الأصلية}} \\times 100\\%\\)<br>زاوية القطاع الدائري = النسبة المئوية \\(\\times 360^\\circ\\)'
        },
        {
          title: 'قوانين التحصيلي (رياضيات ثانوي)',
          titleAr: 'قوانين التحصيلي (رياضيات ثانوي)',
          body: 'الضرب القياسي للمتجهات: \\(\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2 = |\\vec{u}||\\vec{v}|\\cos\\theta\\)<br>شرط تعامد متجهين: \\(\\vec{u} \\cdot \\vec{v} = 0\\)<br>المحدد: \\(\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc\\)<br>المشتقة: \\(\\frac{d}{dx}[x^n] = n x^{n-1}\\) · التكامل: \\(\\int x^n dx = \\frac{x^{n+1}}{n+1} + C\\)'
        }
      ]
    },
    'ap': {
      title: 'AP® Calculus & AP® Statistics Official Reference',
      titleAr: 'قوانين اختبارات AP في التفاضل والتكامل والإحصاء',
      desc: 'Authorized formulas and theorems for College Board AP Calculus AB/BC and AP Statistics.',
      cards: [
        {
          title: 'Limits & Derivatives',
          titleAr: 'النهايات والاشتقاق',
          body: 'Definition of derivative: \\(f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}\\)<br>Product rule: \\((uv)\' = u\'v + uv\'\\) · Quotient rule: \\(\\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}\\)<br>Chain rule: \\(\\frac{d}{dx}[f(g(x))] = f\'(g(x))g\'(x)\\)<br>L\'Hôpital\'s Rule: If \\(\\lim \\frac{f(x)}{g(x)} = \\frac{0}{0}\\) or \\(\\frac{\\pm\\infty}{\\pm\\infty}\\), then \\(\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f\'(x)}{g\'(x)}\\)'
        },
        {
          title: 'Integrals & FTC',
          titleAr: 'التكامل والنظرية الأساسية',
          body: 'FTC Part 1: \\(\\frac{d}{dx}\\int_a^x f(t)dt = f(x)\\)<br>FTC Part 2: \\(\\int_a^b f(x)dx = F(b) - F(a)\\)<br>Average value: \\(f_{\\text{avg}} = \\frac{1}{b-a}\\int_a^b f(x)dx\\)<br>Arc length: \\(L = \\int_a^b \\sqrt{1 + [f\'(x)]^2} dx\\)'
        },
        {
          title: 'Volumes of Revolution & Cross-Sections',
          titleAr: 'حجوم الدوران والمقاطع العرضية',
          body: 'Disk Method: \\(V = \\pi \\int_a^b [R(x)]^2 dx\\)<br>Washer Method: \\(V = \\pi \\int_a^b \\left([R(x)]^2 - [r(x)]^2\\right) dx\\)<br>Known cross-sections: \\(V = \\int_a^b A(x) dx\\) (Square: \\(s^2\\), Semicircle: \\(\\frac{\\pi}{8}d^2\\), Equilateral triangle: \\(\\frac{\\sqrt{3}}{4}s^2\\))'
        },
        {
          title: 'AP Statistics Formulas',
          titleAr: 'قوانين الإحصاء المتقدم',
          body: 'Mean: \\(\\bar{x} = \\frac{1}{n}\\sum x_i\\) · Standard deviation: \\(s = \\sqrt{\\frac{1}{n-1}\\sum (x_i - \\bar{x})^2}\\)<br>Binomial: \\(P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}\\), \\(\\mu = np\\), \\(\\sigma = \\sqrt{np(1-p)}\\)<br>Standardized test statistic: \\(z = \\frac{\\text{statistic} - \\text{parameter}}{\\text{standard error}}\\)<br>Empirical rule: 68% within \\(1\\sigma\\), 95% within \\(2\\sigma\\), 99.7% within \\(3\\sigma\\)'
        }
      ]
    },
    'mathai': {
      title: 'Mathematics for Artificial Intelligence & Data Science Reference',
      titleAr: 'مرجع الرياضيات للذكاء الاصطناعي وعلوم البيانات',
      desc: 'Essential vector, matrix, calculus, and probability formulas used in Machine Learning, Neural Networks, and Data Science.',
      cards: [
        {
          title: 'Vectors, Norms & Cosine Similarity',
          titleAr: 'المتجهات والمعايير والتشابه الجيبي',
          body: 'Dot product: \\(\\vec{u} \\cdot \\vec{v} = \\sum_{i=1}^n u_i v_i = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta\\)<br>Euclidean (\\(L_2\\)) norm: \\(\\|\\vec{v}\\|_2 = \\sqrt{\\sum v_i^2}\\) · Manhattan (\\(L_1\\)) norm: \\(\\|\\vec{v}\\|_1 = \\sum |v_i|\\)<br>Cosine Similarity: \\(S_C(\\vec{u}, \\vec{v}) = \\frac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\|\\|\\vec{v}\\|} \\in [-1, 1]\\)<br>Word embeddings: Semantically similar concepts have cosine similarity close to 1.'
        },
        {
          title: 'Matrices & Linear Neural Layers',
          titleAr: 'المصفوفات والطبقات الخطية في الشبكات العصبية',
          body: 'Linear feed-forward layer: \\(\\vec{y} = W\\vec{x} + \\vec{b}\\) (where \\(W \\in \\mathbb{R}^{m \\times n}\\), \\(\\vec{x} \\in \\mathbb{R}^n\\))<br>Matrix multiplication: \\((AB)_{ij} = \\sum_k A_{ik} B_{kj}\\) · Transpose property: \\((AB)^T = B^T A^T\\)<br>Determinant: \\(\\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc\\)<br>Eigenvalues & Eigenvectors: \\(A\\vec{v} = \\lambda\\vec{v} \\iff \\det(A - \\lambda I) = 0\\)'
        },
        {
          title: 'Optimization & Gradient Descent',
          titleAr: 'التحسين والنزول الاشتقاقي',
          body: 'Gradient vector: \\(\\nabla_\\theta L(\\theta) = \\left[ \\frac{\\partial L}{\\partial \\theta_1}, \\dots, \\frac{\\partial L}{\\partial \\theta_d} \\right]^T\\)<br>Gradient Descent update: \\(\\theta \\leftarrow \\theta - \\eta \\nabla_\\theta L(\\theta)\\) (learning rate \\(\\eta > 0\\))<br>Mean Squared Error (MSE): \\(L_{\\text{MSE}} = \\frac{1}{2n}\\sum_{i=1}^n (y_i - \\hat{y}_i)^2\\)<br>Sigmoid activation: \\(\\sigma(z) = \\frac{1}{1 + e^{-z}}\\) with derivative \\(\\sigma\'(z) = \\sigma(z)(1 - \\sigma(z))\\)<br>Binary Cross-Entropy Loss: \\(L_{\\text{BCE}} = -\\frac{1}{n}\\sum [y_i \\ln \\hat{y}_i + (1 - y_i)\\ln(1 - \\hat{y}_i)]\\)'
        },
        {
          title: 'Probability, Bayes & PCA',
          titleAr: 'الاحتمالات، مبرهنة بيز، وتحليل المكونات الرئيسية',
          body: 'Bayes\' Theorem: \\(P(A|B) = \\frac{P(B|A)P(A)}{P(B)} = \\frac{P(B|A)P(A)}{\\sum_k P(B|A_k)P(A_k)}\\)<br>Softmax: \\(\\operatorname{softmax}(z)_i = \\frac{e^{z_i}}{\\sum_{j=1}^K e^{z_j}}\\)<br>Covariance matrix: \\(\\Sigma = \\frac{1}{n-1} X^T X\\) (for centered data \\(X\\))<br>PCA Dimensionality Reduction: Project onto top \\(k\\) eigenvectors of \\(\\Sigma\\) maximizing variance: \\(Z = X V_k\\).'
        }
      ]
    }
  };

  var CSFormula = {
    activeTab: 'sat',
    open: function(tab){
      var overlay = document.getElementById('formulaOverlay');
      if(!overlay) return;
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      CSFormula.setTab(tab || CSFormula.activeTab || 'sat');
    },
    close: function(){
      var overlay = document.getElementById('formulaOverlay');
      if(!overlay) return;
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    },
    setTab: function(tabKey, btn){
      if(!FORMULA_DATA[tabKey]) tabKey = 'sat';
      CSFormula.activeTab = tabKey;
      document.querySelectorAll('.formula-tab-pill').forEach(function(p){
        var isActive = p.getAttribute('data-curriculum') === tabKey;
        p.classList.toggle('active', isActive);
        p.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      CSFormula.render();
    },
    render: function(){
      var body = document.getElementById('formulaBody');
      if(!body) return;
      var cur = FORMULA_DATA[CSFormula.activeTab];
      if(!cur) return;

      var h = '<div class="formula-sheet-header">'
        + '<h4 class="formula-sheet-title">' + cur.title + '</h4>'
        + '<p class="formula-sheet-desc">' + cur.desc + '</p>'
        + '</div>'
        + '<div class="formula-cards-grid">';

      cur.cards.forEach(function(c){
        h += '<div class="formula-card">'
          + '<div class="formula-card-head">'
          + '<h5>' + c.title + '</h5>'
          + '<span class="formula-card-head-ar" dir="rtl">' + (c.titleAr || '') + '</span>'
          + '</div>'
          + '<div class="formula-card-content">' + c.body + '</div>'
          + '</div>';
      });
      h += '</div>';

      body.innerHTML = h;

      if(window.renderMathInElement){
        try {
          window.renderMathInElement(body, {
            delimiters: [
              {left: '$$', right: '$$', display: true},
              {left: '\\[', right: '\\]', display: true},
              {left: '\\(', right: '\\)', display: false}
            ],
            throwOnError: false
          });
        } catch(e){}
      } else if(window.MathJax && MathJax.typesetPromise){
        MathJax.typesetPromise([body]).catch(function(){});
      }
    }
  };

  window.CSFormula = CSFormula;
  window.openFormulaModal = CSFormula.open;
  window.closeFormulaModal = CSFormula.close;
})();
