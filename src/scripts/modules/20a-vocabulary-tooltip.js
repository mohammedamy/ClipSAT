(function(){
  /* ── Comprehensive Bilingual Mathematics Dictionary ── */
  var VOCAB = {
    /* ── Algebra & Functions ── */
    'slope': {
      en: 'The rate of change of y with respect to x; rise over run: m = Δy/Δx.',
      ar: 'الميل / معدل التغير',
      arDef: 'معدل تغير الإحداثي الصادي بالنسبة للإحداثي السيني، ويساوي فرق الصادات مقسوماً على فرق السينات.',
      domain: 'algebra'
    },
    'y-intercept': {
      en: 'The point where a line or curve crosses the y-axis (where x = 0).',
      ar: 'المقطع الصادي',
      arDef: 'نقطة تقاطع المنحنى أو المستقيم مع محور الصادات عندما تكون س = 0.',
      domain: 'algebra'
    },
    'x-intercept': {
      en: 'The point where a line or curve crosses the x-axis (where y = 0); also called a root or zero.',
      ar: 'المقطع السيني / الصفر',
      arDef: 'نقطة تقاطع المنحنى مع محور السينات عندما تكون ص = 0، وتسمى أيضاً جذر أو صفر الدالة.',
      domain: 'algebra'
    },
    'vertex': {
      en: 'The maximum or minimum turning point of a parabola; coordinates (-b/(2a), f(-b/(2a))).',
      ar: 'رأس القطع المكافئ',
      arDef: 'أعلى أو أدنى نقطة في منحنى الدالة التربيعية، وتحدد القيمة العظمى أو الصغرى.',
      domain: 'algebra'
    },
    'parabola': {
      en: 'The U-shaped symmetrical curve of a quadratic function (y = ax² + bx + c).',
      ar: 'القطع المكافئ',
      arDef: 'المنحنى المتماثل المميز للدوال التربيعية المتجه للأعلى أو للأسفل.',
      domain: 'algebra'
    },
    'quadratic': {
      en: 'A second-degree polynomial equation or function of the form ax² + bx + c = 0.',
      ar: 'معادلة / دالة تربيعية',
      arDef: 'دالة أو معادلة من الدرجة الثانية يكون فيها أعلى أُس للمتغير يساوي 2.',
      domain: 'algebra'
    },
    'discriminant': {
      en: 'The expression b² − 4ac in the quadratic formula; determines the number and type of roots.',
      ar: 'المميز (Δ)',
      arDef: 'المقدار (b² − 4ac) الذي يحدد عدد ونوع الجذور الحقيقية أو المركبة للمعادلة التربيعية.',
      domain: 'algebra'
    },
    'system of equations': {
      en: 'A set of two or more equations containing the same variables whose common solution is sought.',
      ar: 'نظام معادلات',
      arDef: 'مجموعة من معادلتين أو أكثر تحتوي على نفس المتغيرات، ويبحث حلها عن القيم المشتركة التي تحقق جميع المعادلات معاً.',
      domain: 'algebra'
    },
    'extraneous solution': {
      en: 'A solution derived from solving an equation that does not satisfy the original equation when substituted back.',
      ar: 'حل دخيل',
      arDef: 'قيمة تنتج أثناء خطوات الحل الرياضي ولكنها لا تحقق المعادلة الأصلية (مثل إعطاء صفر في المقام).',
      domain: 'algebra'
    },
    'domain': {
      en: 'The set of all permissible input values (x-values) for which a function is defined.',
      ar: 'المجال',
      arDef: 'مجموعة جميع قيم المدخلات الممكنة (س) التي تكون الدالة عندها معرفة.',
      domain: 'algebra'
    },
    'range': {
      en: 'The set of all resulting output values (y-values) produced by a function.',
      ar: 'المدى',
      arDef: 'مجموعة جميع قيم المخرجات الممكنة (ص) التي تنتجها الدالة.',
      domain: 'algebra'
    },
    'asymptote': {
      en: 'A line that a curve approaches arbitrarily closely as coordinates tend to infinity.',
      ar: 'خط التقارب',
      arDef: 'مستقيم يقترب منه منحنى الدالة بشكل لا نهائي دون أن يمسه أو يقطعه عند المالانهاية.',
      domain: 'algebra'
    },
    'inequality': {
      en: 'A mathematical statement comparing two expressions using <, >, ≤, or ≥.',
      ar: 'متباينة',
      arDef: 'علاقة رياضية تعبر عن عدم التساوي بين طرفين باستخدام رموز المقارنة (أكبر من، أصغر من).',
      domain: 'algebra'
    },
    'absolute value': {
      en: 'The non-negative distance of a number from zero on the number line (|x|).',
      ar: 'القيمة المطلقة',
      arDef: 'المسافة غير السالبة التي يبعدها العدد عن نقطة الصفر على خط الأعداد.',
      domain: 'algebra'
    },
    'polynomial': {
      en: 'An expression with one or more terms involving non-negative integer exponents.',
      ar: 'كثيرة حدود',
      arDef: 'مقدار جبري يتكون من حد واحد أو أكثر بأسس صحيحة غير سالبة للمتغيرات.',
      domain: 'algebra'
    },
    'factoring': {
      en: 'Breaking an expression into a product of simpler irreducible expressions.',
      ar: 'التحليل إلى عوامل',
      arDef: 'تفكيك المقدار الجبري إلى حاصل ضرب مقادير أبسط غير قابلة للتحليل.',
      domain: 'algebra'
    },
    'direct variation': {
      en: 'A relationship where y = kx; as x increases, y increases at a constant rate.',
      ar: 'تناسب طردي',
      arDef: 'علاقة بين متغيرين تزداد فيها قيمة أحدهما بزيادة الآخر بنسبة ثابتة (ص = ك س).',
      domain: 'algebra'
    },
    'inverse variation': {
      en: 'A relationship where xy = k; as one variable increases, the other decreases proportionally.',
      ar: 'تناسب عكسي',
      arDef: 'علاقة يكون فيها حاصل ضرب المتغيرين ثابتاً، بحيث إذا زاد أحدهما نقص الآخر (س ص = ك).',
      domain: 'algebra'
    },
    'arithmetic sequence': {
      en: 'A sequence where consecutive terms differ by a constant common difference (d).',
      ar: 'متتابعة حسابية',
      arDef: 'متتالية عددية يكون الفرق بين كل حد والحد السابق له ثابتاً (أساس المتتابعة d).',
      domain: 'algebra'
    },
    'geometric sequence': {
      en: 'A sequence where each term is found by multiplying the previous term by a common ratio (r).',
      ar: 'متتابعة هندسية',
      arDef: 'متتالية عددية يُحسب فيها كل حد بضرب الحد السابق في نسبة ثابتة (الأساس r).',
      domain: 'algebra'
    },
    'matrix': {
      en: 'A rectangular array of numbers arranged in rows and columns.',
      ar: 'مصفوفة',
      arDef: 'ترتيب مستطيل من الأعداد في صفوف وأعمدة يُعبر عن بيانات أو معاملات أنظمة خطية.',
      domain: 'algebra'
    },
    'determinant': {
      en: 'A scalar value computed from a square matrix; used to find inverses and solve systems.',
      ar: 'محددة المصفوفة',
      arDef: 'قيمة عددية تُحسب للمصفوفات المربعة؛ تدل على قابلية المصفوفة للعكس وحل الأنظمة.',
      domain: 'algebra'
    },
    'composite function': {
      en: 'A function formed by applying one function to the result of another: f(g(x)).',
      ar: 'تركيب الدوال',
      arDef: 'دالة مركبة تنتج من تطبيق دالة على مخرجات دالة أخرى: د(ر(س)).',
      domain: 'algebra'
    },
    'inverse function': {
      en: 'A function that reverses the operation of another: f⁻¹(f(x)) = x.',
      ar: 'الدالة العكسية',
      arDef: 'دالة تعكس تأثير الدالة الأصلية وتبدل بين المدخلات والمخرجات.',
      domain: 'algebra'
    },

    /* ── Geometry & Trigonometry ── */
    'hypotenuse': {
      en: 'The longest side of a right-angled triangle, opposite the 90° right angle.',
      ar: 'الوتر',
      arDef: 'أطول أضلاع المثلث القائم الزاوية، ويقابل الزاوية القائمة مباشرة.',
      domain: 'geometry'
    },
    'perpendicular': {
      en: 'Intersecting at a 90° right angle; perpendicular slopes satisfy m₁ · m₂ = −1.',
      ar: 'متعامد',
      arDef: 'يتقاطعان بزاوية قائمة قياسها 90 درجة؛ وحاصل ضرب ميليهما يساوي -1.',
      domain: 'geometry'
    },
    'parallel': {
      en: 'Lines in the same plane that never intersect, having identical slopes (m₁ = m₂).',
      ar: 'متوازي',
      arDef: 'مستقيمان في نفس المستوى لا يتقاطعان أبداً، ولهما نفس الميل تماماً.',
      domain: 'geometry'
    },
    'bearing': {
      en: 'A navigation direction measured clockwise from the North line, written with 3 digits (e.g., 045°).',
      ar: 'الاتجاه / زاوية الاتجاه',
      arDef: 'زاوية ملاحية تُقاس باتجاه حركة عقارب الساعة بدءاً من الشمال، وتُكتب بثلاثة أرقام (مثل 045°).',
      domain: 'geometry'
    },
    'congruent': {
      en: 'Figures that have identical shape and size with equal corresponding sides and angles.',
      ar: 'متطابق',
      arDef: 'أشكال هندسية لها نفس الأبعاد والشكل تماماً (الأضلاع والزوايا المتناظرة متساوية).',
      domain: 'geometry'
    },
    'similar': {
      en: 'Figures that have the same shape with equal corresponding angles and proportional sides.',
      ar: 'متشابه',
      arDef: 'أشكال هندسية لها نفس الشكل ولكن بأحجام مختلفة؛ زواياها متساوية وأضلاعها المتناظرة متناسبة.',
      domain: 'geometry'
    },
    'arc length': {
      en: 'The distance along the curved edge of a circular arc: s = rθ (with θ in radians).',
      ar: 'طول القوس',
      arDef: 'المسافة على محيط الدائرة التي تقابل زاوية مركزية: ل = نق × هـ (بالراديان).',
      domain: 'geometry'
    },
    'sector': {
      en: 'A pie-slice region of a circle bounded by two radii and an arc; area = ½r²θ.',
      ar: 'القطاع الدائري',
      arDef: 'جزء من مساحة الدائرة محصور بين نصفي قطر وقوس الدائرة المقابل لهما.',
      domain: 'geometry'
    },
    'tangent line': {
      en: 'A line touching a circle or curve at exactly one point without crossing it there.',
      ar: 'المماس',
      arDef: 'مستقيم يمس الدائرة أو المنحنى عند نقطة واحدة فقط دون أن يقطعه.',
      domain: 'geometry'
    },
    'Pythagorean theorem': {
      en: 'In a right triangle with legs a, b and hypotenuse c: a² + b² = c².',
      ar: 'نظرية فيثاغورس',
      arDef: 'في أي مثلث قائم الزاوية: مربع طول الوتر يساوي مجموع مربعي طولي الضلعين الآخرين (أ² + ب² = جـ²).',
      domain: 'geometry'
    },
    'radian': {
      en: 'A standard unit of angle measure; π radians = 180° (1 rad ≈ 57.3°).',
      ar: 'الراديان (التقدير الدائري)',
      arDef: 'وحدة قياس الزوايا المستوية؛ حيث تعادل زاوية نصف قطرية، وتساوي π راديان 180 درجة.',
      domain: 'trig'
    },
    'unit circle': {
      en: 'A circle of radius 1 centered at the origin (0,0); coordinates are (cos θ, sin θ).',
      ar: 'دائرة الوحدة',
      arDef: 'دائرة نصف قطرها 1 ومركزها نقطة الأصل، وتحدد إحداثيات أي نقطة عليها: (جتا هـ، جا هـ).',
      domain: 'trig'
    },
    'amplitude': {
      en: 'The vertical peak height from the midline of a periodic sinusoidal wave.',
      ar: 'السعة',
      arDef: 'المسافة الرأسية من خط المنتصف إلى قمة أو قاع المنحنى الجيبي الدوري.',
      domain: 'trig'
    },
    'period': {
      en: 'The horizontal length of one complete cycle of a periodic function (T = 2π/B).',
      ar: 'دورة الدالة / الزمن الدوري',
      arDef: 'المسافة الأفقية اللازمة لتكرار دورة واحدة كاملة من المنحنى الدوري.',
      domain: 'trig'
    },
    'sine': {
      en: 'In a right triangle: opposite side divided by hypotenuse (sin θ).',
      ar: 'الجيب (جا / sin)',
      arDef: 'النسبة المثلثية بين طول الضلع المقابل إلى طول الوتر في المثلث القائم الزاوية.',
      domain: 'trig'
    },
    'cosine': {
      en: 'In a right triangle: adjacent side divided by hypotenuse (cos θ).',
      ar: 'جيب التمام (جتا / cos)',
      arDef: 'النسبة المثلثية بين طول الضلع المجاور إلى طول الوتر في المثلث القائم الزاوية.',
      domain: 'trig'
    },
    'tangent': {
      en: 'In a right triangle: opposite side divided by adjacent side (tan θ = sin θ / cos θ).',
      ar: 'الظل (ظا / tan)',
      arDef: 'النسبة المثلثية بين طول الضلع المقابل إلى طول الضلع المجاور في المثلث القائم الزاوية.',
      domain: 'trig'
    },

    /* ── Statistics & Probability ── */
    'mean': {
      en: 'The arithmetic average obtained by summing all values and dividing by the total count.',
      ar: 'المتوسط الحسابي',
      arDef: 'مجموع كل القيم مقسوماً على عددها الإجمالي.',
      domain: 'statistics'
    },
    'median': {
      en: 'The middle value separating the higher half from the lower half of an ordered data set.',
      ar: 'الوسيط',
      arDef: 'القيمة التي تقع في المنتصف تماماً بعد ترتيب البيانات تصاعدياً أو تنازلياً.',
      domain: 'statistics'
    },
    'mode': {
      en: 'The data value that appears most frequently in a dataset.',
      ar: 'المنوال',
      arDef: 'القيمة الأكثر تكراراً وشيوعاً بين قيم مجموعة البيانات.',
      domain: 'statistics'
    },
    'standard deviation': {
      en: 'A measure of the dispersion or spread of data values around their arithmetic mean (σ).',
      ar: 'الانحراف المعياري (σ)',
      arDef: 'مقياس إحصائي يقيس مدى تشتت وتباعد القيم عن متوسطها الحسابي.',
      domain: 'statistics'
    },
    'interquartile range': {
      en: 'The spread of the middle 50% of ordered observations: IQR = Q3 − Q1.',
      ar: 'المدى الربيعي (IQR)',
      arDef: 'الفرق بين الربيع الثالث والربيع الأول (IQR = Q3 − Q1)، ويمثل تشتت الـ 50% الوسطى من البيانات.',
      domain: 'statistics'
    },
    'box plot': {
      en: 'A 5-number summary graphical display showing minimum, Q1, median, Q3, and maximum.',
      ar: 'مخطط الصندوق وطرفيه',
      arDef: 'رسم بياني يعتمد على القيم الخمس: القيمة الصغرى، الربيع الأول، الوسيط، الربيع الثالث، والقيمة العظمى.',
      domain: 'statistics'
    },
    'cumulative frequency': {
      en: 'The running total of frequencies across successive intervals, plotted as an S-shaped ogive.',
      ar: 'التكرار التراكمي',
      arDef: 'المجموع التراكمي لتكرارات الفئات المتتالية، ويُمثل بيانياً بمنحنى تصاعدي لتحديد الوسيط والربيعات.',
      domain: 'statistics'
    },
    'tree diagram': {
      en: 'A branching visual diagram depicting sequential stages of probability and conditional outcomes.',
      ar: 'مخطط الشجرة الاحتمالية',
      arDef: 'رسم شجري يُظهر جميع النواتج الممكنة للتجارب الاحتمالية متعددة المراحل وحساب الاحتمال المركب.',
      domain: 'statistics'
    },
    'normal distribution': {
      en: 'A symmetrical bell-shaped distribution where 68% falls within 1σ, 95% within 2σ, and 99.7% within 3σ.',
      ar: 'التوزيع الطبيعي (الجرسي)',
      arDef: 'توزيع احتمالي متماثل يشبه الجرس، يتساوى فيه المتوسط والوسيط والمنوال، ويتبع القاعدة 68-95-99.7%.',
      domain: 'statistics'
    },
    'mutually exclusive': {
      en: 'Events that cannot happen simultaneously; P(A ∩ B) = 0 and P(A ∪ B) = P(A) + P(B).',
      ar: 'أحداث متنافية',
      arDef: 'أحداث يستحيل وقوعها معاً في نفس الوقت، ويكون احتمال تقاطعها يساوي صفراً.',
      domain: 'statistics'
    },
    'independent events': {
      en: 'Events where the occurrence of one does not change the probability of the other: P(A|B) = P(A).',
      ar: 'أحداث مستقلة',
      arDef: 'أحداث لا يؤثر وقوع أحدها على احتمال وقوع الحدث الآخر إطلاقاً.',
      domain: 'statistics'
    },
    'margin of error': {
      en: 'The maximum expected difference between a sample statistic and the true population parameter.',
      ar: 'هامش الخطأ',
      arDef: 'المدى المتوقع للفرق الإحصائي بين تقدير العينة والقيمة الفعلية الحقيقية لمجتمع الدراسة.',
      domain: 'statistics'
    },
    'residual': {
      en: 'The vertical difference between the observed actual y-value and the predicted line value: y − ŷ.',
      ar: 'الباقي / فرق التنبؤ',
      arDef: 'الفرق الرأسي بين القيمة الفعلية المرصودة والقيمة المتوقعة من خط الاتجاه الأفضل (ص − ص̂).',
      domain: 'statistics'
    },

    /* ── Calculus ── */
    'limit': {
      en: 'The value that a function approaches as the input gets closer to a target value: lim_{x→c} f(x).',
      ar: 'النهاية',
      arDef: 'القيمة التي تقترب منها الدالة كلما اقتربت المدخلات من نقطة محددة.',
      domain: 'calculus'
    },
    'derivative': {
      en: 'The instantaneous rate of change of a function, representing the slope of the tangent line at any point.',
      ar: 'المشتقة',
      arDef: 'معدل التغير اللحظي للدالة عند نقطة ما، ويمثل هندسياً ميل المماس للمنحنى.',
      domain: 'calculus'
    },
    'integral': {
      en: 'The accumulation of quantities or net signed area under a curve; the reverse of differentiation.',
      ar: 'التكامل',
      arDef: 'العملية العكسية للتفاضل التي تُعنى بحساب التراكم والمساحة الصافية المحصورة تحت المنحنى.',
      domain: 'calculus'
    },
    'chain rule': {
      en: 'A rule for differentiating composite functions: d/dx[f(g(x))] = f\'(g(x)) · g\'(x).',
      ar: 'قاعدة السلسلة',
      arDef: 'قاعدة تفاضل الدوال المركبة: مشتقة الدالة الخارجية مضروبة في مشتقة الدالة الداخلية.',
      domain: 'calculus'
    },
    'critical point': {
      en: 'A point in the domain of a function where its first derivative is zero or undefined.',
      ar: 'النقطة الحرجة',
      arDef: 'نقطة في مجال الدالة تكون عندها المشتقة الأولى مساوية للصفر أو غير معرفة.',
      domain: 'calculus'
    },
    'inflection point': {
      en: 'A point on a curve where the concavity changes from upward to downward (or vice versa).',
      ar: 'نقطة الانعطاف',
      arDef: 'نقطة على المنحنى يتغير عندها اتجاه التقعر من الأعلى إلى الأسفل أو العكس.',
      domain: 'calculus'
    },
    'Riemann sum': {
      en: 'An approximation of a definite integral using the sum of areas of approximating rectangles.',
      ar: 'مجموع ريمان',
      arDef: 'طريقة لتقريب قيمة التكامل المحدد بحساب مجموع مساحات مستطيلات التقريب تحت المنحنى.',
      domain: 'calculus'
    },
    'slope field': {
      en: 'A graphical visual display of mini tangent lines representing solutions of dy/dx = f(x,y).',
      ar: 'حقل الاتجاهات / الميل',
      arDef: 'تمثيل بصري لحلول المعادلات التفاضلية عبر قطع مستقيمة صغيرة توضح الميل عند كل نقطة.',
      domain: 'calculus'
    }
  };

  /* Sort keys longest-first so multi-word terms match before their sub-words */
  var KEYS = Object.keys(VOCAB).sort(function(a,b){ return b.length - a.length; });
  /* Build a single regex — word-boundary aware, case-insensitive */
  var escaped = KEYS.map(function(k){ return k.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&'); });
  var VOCAB_RE = new RegExp('\\b(' + escaped.join('|') + ')\\b', 'gi');

  /* ── Popup element ── */
  var _pop = null;
  function _hidePop(){ if(_pop){ _pop.remove(); _pop=null; } }
  document.addEventListener('click', function(e){
    if(_pop && !_pop.contains(e.target) && !e.target.classList.contains('mv-term')) _hidePop();
  });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') _hidePop(); });

  function _showPop(term, defn, anchor){
    _hidePop();
    _pop = document.createElement('div');
    _pop.className = 'mv-popup';
    var isObj = (defn && typeof defn === 'object');
    var en = isObj ? (defn.en || '') : String(defn);
    var ar = isObj ? (defn.ar || '') : '';
    var arDef = isObj ? (defn.arDef || '') : '';

    var h = '<button class="mv-popup-close" title="Close">&times;</button>';
    if(ar){
      h += '<div class="mv-popup-header">'
        + '<span class="mv-popup-term">' + term + '</span>'
        + '<span class="mv-popup-ar" dir="rtl">' + ar + '</span>'
        + '</div>';
    } else {
      h += '<span class="mv-popup-term">' + term + '</span>';
    }
    h += '<div class="mv-popup-def-en">' + en + '</div>';
    if(arDef){
      h += '<div class="mv-popup-def-ar" dir="rtl">' + arDef + '</div>';
    }
    _pop.innerHTML = h;
    _pop.querySelector('.mv-popup-close').onclick = _hidePop;
    document.body.appendChild(_pop);
    /* Position near the clicked element */
    var r = anchor.getBoundingClientRect();
    var pw = _pop.offsetWidth || 280;
    var ph = _pop.offsetHeight || 100;
    var left = Math.min(r.left, window.innerWidth - pw - 12);
    var top  = r.bottom + 8;
    if(top + ph > window.innerHeight - 12) top = r.top - ph - 8;
    _pop.style.left = Math.max(8, left) + 'px';
    _pop.style.top  = Math.max(8, top)  + 'px';
  }

  /* ── Mark vocabulary in a DOM node ── */
  var SKIP_TAGS = {SCRIPT:1,STYLE:1,TEXTAREA:1,INPUT:1,BUTTON:1,
                   'MJX-CONTAINER':1,'MATH':1,'svg':1,'SVG':1};
  function _markNode(root){
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function(n){
        var p = n.parentNode;
        while(p && p !== root){
          if(SKIP_TAGS[p.tagName] || p.classList.contains('mv-term')
             || p.classList.contains('mv-popup')
             || p.getAttribute('class')==='MathJax'
             || (p.tagName && p.tagName.startsWith('MJX'))) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    }, false);
    var nodes = [];
    var n;
    while((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function(node){
      if(!VOCAB_RE.test(node.textContent)) return;
      VOCAB_RE.lastIndex = 0;
      var html = node.textContent.replace(VOCAB_RE, function(match){
        var key = match.toLowerCase();
        if(!VOCAB[key]) return match;
        return '<span class="mv-term" data-term="'+key+'">'+match+'</span>';
      });
      if(html === node.textContent) return;
      var span = document.createElement('span');
      span.innerHTML = html;
      node.parentNode.replaceChild(span, node);
    });
  }

  /* ── Click handler (delegated) ── */
  document.addEventListener('click', function(e){
    var t = e.target.closest('.mv-term');
    if(!t) return;
    e.stopPropagation();
    var key = t.getAttribute('data-term');
    var defn = VOCAB[key];
    if(defn) _showPop(t.textContent, defn, t);
  });

  /* ── Scan on load ── */
  function _scanAll(){
    document.querySelectorAll('.view section, .cq-paper, #pq-overlay, #mq-review-overlay, .fep-body').forEach(_markNode);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(_scanAll, 1500); });
  } else {
    setTimeout(_scanAll, 1500);
  }

  /* ── Rescan after quiz / exam generation ── */
  (function(){
    var _origGCQ = window.genChapterQuiz;
    window.genChapterQuiz = function(){
      _origGCQ && _origGCQ.apply(this, arguments);
      setTimeout(function(){
        var boxes = document.querySelectorAll('.cq-paper');
        boxes.forEach(_markNode);
      }, 800);
    };
    var _origGFE = window.genFullExam;
    window.genFullExam = function(){
      var r = _origGFE && _origGFE.apply(this, arguments);
      Promise.resolve(r).then(function(){
        setTimeout(function(){
          var boxes = document.querySelectorAll('.fep-body');
          boxes.forEach(_markNode);
        }, 1200);
      });
      return r;
    };
  })();

  /* ── Interactive Bilingual Glossary Modal ── */
  var CSGlossary = {
    vocab: VOCAB,
    activeDomain: 'all',
    open: function(){
      var overlay = document.getElementById('glossaryOverlay');
      if(!overlay) return;
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      var inp = document.getElementById('glossarySearchInput');
      if(inp){ inp.value = ''; inp.focus(); }
      CSGlossary.filter('all');
    },
    close: function(){
      var overlay = document.getElementById('glossaryOverlay');
      if(!overlay) return;
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
    },
    filter: function(domain){
      CSGlossary.activeDomain = domain || 'all';
      document.querySelectorAll('.glossary-filter-pill').forEach(function(p){
        p.classList.toggle('active', p.getAttribute('data-domain') === CSGlossary.activeDomain);
      });
      var q = (document.getElementById('glossarySearchInput') ? document.getElementById('glossarySearchInput').value : '').toLowerCase().trim();
      CSGlossary.render(q);
    },
    render: function(query){
      var body = document.getElementById('glossaryBody');
      if(!body) return;
      var q = (query || '').toLowerCase().trim();
      var dom = CSGlossary.activeDomain;
      var keys = Object.keys(VOCAB).sort();
      var matches = [];
      keys.forEach(function(k){
        var item = VOCAB[k];
        if(dom !== 'all' && item.domain !== dom) return;
        if(q){
          var enMatch = k.toLowerCase().indexOf(q) !== -1 || (item.en && item.en.toLowerCase().indexOf(q) !== -1);
          var arMatch = (item.ar && item.ar.indexOf(q) !== -1) || (item.arDef && item.arDef.indexOf(q) !== -1);
          if(!enMatch && !arMatch) return;
        }
        matches.push({ key: k, item: item });
      });

      if(matches.length === 0){
        body.innerHTML = '<div class="glossary-empty">No matching math terms found / لا توجد مصطلحات مطابقة</div>';
        return;
      }

      var h = '';
      matches.forEach(function(m){
        var it = m.item;
        h += '<div class="glossary-card">'
          + '<div class="glossary-card-top">'
          + '<span class="glossary-card-en">' + m.key + '</span>'
          + '<span class="glossary-card-ar" dir="rtl">' + (it.ar || '') + '</span>'
          + '</div>'
          + '<div class="glossary-card-def-en">' + (it.en || '') + '</div>'
          + (it.arDef ? '<div class="glossary-card-def-ar" dir="rtl">' + it.arDef + '</div>' : '')
          + '</div>';
      });
      body.innerHTML = h;
    }
  };
  window.CSGlossary = CSGlossary;
  window.openGlossaryModal = CSGlossary.open;
  window.closeGlossaryModal = CSGlossary.close;
})();
