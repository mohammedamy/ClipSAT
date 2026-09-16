(function(){
  /* ── Dictionary ── */
  var VOCAB = {
    /* Calculus */
    'limit':'The value a function approaches as the input gets closer to a given value.',
    'derivative':'The instantaneous rate of change of a function at a point; the slope of the tangent line.',
    'integral':'The area under a curve; the reverse process of differentiation.',
    'antiderivative':'A function whose derivative equals a given function; used in integration.',
    'continuity':'A function is continuous if there are no breaks, holes, or jumps in its graph.',
    'differentiable':'A function is differentiable at a point if its derivative exists there.',
    'chain rule':'A rule for differentiating composite functions: d/dx[f(g(x))] = f\'(g(x))·g\'(x).',
    'product rule':'A rule for differentiating products: d/dx[f·g] = f\'g + fg\'.',
    'quotient rule':'A rule for differentiating quotients: d/dx[f/g] = (f\'g − fg\')/g².',
    'critical point':'A point where the derivative is zero or undefined.',
    'inflection point':'A point where the concavity of a function changes.',
    'concave up':'A curve that opens upward; the second derivative is positive.',
    'concave down':'A curve that opens downward; the second derivative is negative.',
    'asymptote':'A line that a curve approaches but never reaches.',
    'convergent':'A series or sequence that approaches a finite limit.',
    'divergent':'A series or sequence that does not approach a finite limit.',
    'Taylor series':'An infinite sum of terms expressing a function around a point using its derivatives.',
    'Maclaurin series':'A Taylor series centered at x = 0.',
    'power series':'An infinite series of the form Σ aₙxⁿ.',
    'implicit differentiation':'Differentiating both sides of an equation with respect to x without solving for y first.',
    'related rates':'Problems involving how two rates of change are related through an equation.',
    'Riemann sum':'An approximation of a definite integral using rectangles.',
    'fundamental theorem of calculus':'Links differentiation and integration: ∫ₐᵇ f(x)dx = F(b) − F(a).',
    'integration by parts':'A method: ∫u dv = uv − ∫v du.',
    'partial fractions':'A technique to decompose rational functions into simpler fractions for integration.',
    'L\'Hopital\'s rule':'A rule to evaluate limits of indeterminate forms using derivatives.',
    'Rolle\'s theorem':'If f(a)=f(b), then there exists c in (a,b) where f\'(c)=0.',
    'mean value theorem':'There exists c in (a,b) where f\'(c) = [f(b)−f(a)]/(b−a).',
    /* Algebra */
    'variable':'A symbol (usually a letter) that represents an unknown or changing quantity.',
    'coefficient':'The numerical factor multiplying a variable in a term.',
    'constant':'A fixed value that does not change.',
    'polynomial':'An expression with one or more terms involving non-negative integer exponents.',
    'monomial':'A polynomial with exactly one term.',
    'binomial':'A polynomial with exactly two terms.',
    'trinomial':'A polynomial with exactly three terms.',
    'degree':'The highest power (exponent) of the variable in a polynomial.',
    'factor':'A number or expression that divides another exactly.',
    'factoring':'Breaking an expression into a product of simpler expressions.',
    'quadratic':'A polynomial of degree 2, in the form ax² + bx + c.',
    'discriminant':'b² − 4ac; determines the nature of the roots of a quadratic.',
    'vertex':'The highest or lowest point of a parabola.',
    'parabola':'The U-shaped graph of a quadratic function.',
    'function':'A relation where each input has exactly one output.',
    'domain':'The set of all valid input values of a function.',
    'range':'The set of all possible output values of a function.',
    'inverse function':'A function that reverses the effect of the original function.',
    'composite function':'A function formed by applying one function to the result of another.',
    'linear equation':'An equation whose graph is a straight line; highest degree is 1.',
    'slope':'The rate of change of y with respect to x; rise over run.',
    'y-intercept':'The point where a graph crosses the y-axis (x = 0).',
    'x-intercept':'The point where a graph crosses the x-axis (y = 0).',
    'system of equations':'A set of two or more equations with the same variables.',
    'inequality':'A mathematical statement comparing two expressions using <, >, ≤, or ≥.',
    'absolute value':'The distance of a number from zero on the number line; always non-negative.',
    'exponent':'A number that indicates how many times the base is multiplied by itself.',
    'logarithm':'The inverse of exponentiation; logₐ(b) = c means aᶜ = b.',
    'exponential function':'A function of the form f(x) = aˣ where a > 0.',
    'arithmetic sequence':'A sequence where consecutive terms differ by a constant (common difference).',
    'geometric sequence':'A sequence where consecutive terms have a constant ratio.',
    'common difference':'The constant amount added in each step of an arithmetic sequence.',
    'common ratio':'The constant factor multiplied in each step of a geometric sequence.',
    'matrix':'A rectangular array of numbers arranged in rows and columns.',
    'determinant':'A scalar value computed from a square matrix; used to find inverses and solve systems.',
    /* Geometry */
    'perimeter':'The total distance around the outside of a shape.',
    'circumference':'The distance around a circle; C = 2πr.',
    'area':'The amount of space inside a 2D shape.',
    'volume':'The amount of space inside a 3D shape.',
    'radius':'The distance from the center of a circle to any point on its edge.',
    'diameter':'The distance across a circle through its center; d = 2r.',
    'chord':'A line segment whose endpoints both lie on a circle.',
    'arc':'A portion of the circumference of a circle.',
    'sector':'A "pie slice" region bounded by two radii and an arc.',
    'tangent line':'A line that touches a curve at exactly one point without crossing it.',
    'perpendicular':'Two lines that meet at a 90° angle.',
    'parallel':'Lines in the same plane that never intersect.',
    'congruent':'Figures that have the same shape and size.',
    'similar':'Figures that have the same shape but not necessarily the same size.',
    'hypotenuse':'The longest side of a right triangle, opposite the right angle.',
    'Pythagorean theorem':'In a right triangle: a² + b² = c², where c is the hypotenuse.',
    'right angle':'An angle that measures exactly 90°.',
    'acute angle':'An angle that measures less than 90°.',
    'obtuse angle':'An angle that measures between 90° and 180°.',
    'supplementary angles':'Two angles whose measures add up to 180°.',
    'complementary angles':'Two angles whose measures add up to 90°.',
    'vertical angles':'Opposite angles formed by two intersecting lines; they are equal.',
    'transversal':'A line that crosses two or more other lines.',
    'polygon':'A closed figure with three or more straight sides.',
    'regular polygon':'A polygon with all sides equal and all angles equal.',
    'symmetry':'A shape has symmetry if it looks the same after a transformation.',
    'translation':'Sliding a shape without rotating or flipping it.',
    'rotation':'Turning a shape around a fixed point.',
    'reflection':'Flipping a shape over a line of symmetry.',
    /* Trigonometry */
    'sine':'In a right triangle: opposite/hypotenuse. Abbreviated sin.',
    'cosine':'In a right triangle: adjacent/hypotenuse. Abbreviated cos.',
    'tangent':'In a right triangle: opposite/adjacent. Abbreviated tan.',
    'cosecant':'The reciprocal of sine: csc = 1/sin.',
    'secant':'The reciprocal of cosine: sec = 1/cos.',
    'cotangent':'The reciprocal of tangent: cot = 1/tan.',
    'unit circle':'A circle of radius 1 centered at the origin, used to define trig functions for all angles.',
    'radian':'A unit of angle measure; 2π radians = 360°.',
    'amplitude':'The maximum displacement from the midline of a sinusoidal function.',
    'period':'The length of one complete cycle of a periodic function.',
    'phase shift':'A horizontal translation of a trigonometric function.',
    'frequency':'The number of cycles per unit; f = 1/period.',
    'identity':'An equation that is true for all values of the variable.',
    'Pythagorean identity':'sin²θ + cos²θ = 1 (and related forms).',
    /* Statistics & Probability */
    'mean':'The average of a data set; sum divided by the number of values.',
    'median':'The middle value of an ordered data set.',
    'mode':'The value that appears most frequently in a data set.',
    'standard deviation':'A measure of how spread out data values are from the mean.',
    'variance':'The average of the squared deviations from the mean; σ².',
    'probability':'A measure of the likelihood of an event; a number between 0 and 1.',
    'sample space':'The set of all possible outcomes of an experiment.',
    'independent events':'Events where the outcome of one does not affect the other.',
    'mutually exclusive':'Events that cannot both occur at the same time.',
    'normal distribution':'A symmetric bell-shaped distribution; mean = median = mode.',
    'z-score':'The number of standard deviations a value is from the mean.',
    'hypothesis test':'A statistical procedure to evaluate a claim about a population.',
    'p-value':'The probability of obtaining results at least as extreme as observed, assuming the null hypothesis is true.',
    'confidence interval':'A range of values that likely contains the true population parameter.',
    'correlation':'A statistical measure of the strength and direction of a linear relationship.',
    'regression':'A method to model the relationship between variables using a best-fit line or curve.',
    'outlier':'A data value significantly different from the rest of the data set.',
    'interquartile range':'The range of the middle 50% of data; IQR = Q3 − Q1.',
    'percentile':'A value below which a given percentage of data falls.',
    /* Number Theory */
    'prime number':'A natural number greater than 1 with no factors other than 1 and itself.',
    'composite number':'A natural number greater than 1 that has factors other than 1 and itself.',
    'rational number':'A number that can be written as a fraction p/q where p and q are integers and q ≠ 0.',
    'irrational number':'A number that cannot be written as a simple fraction; e.g., π, √2.',
    'integer':'A whole number, including negatives and zero.',
    'real number':'All rational and irrational numbers; the entire number line.',
    'complex number':'A number in the form a + bi, where i = √(−1).',
    'imaginary number':'A multiple of i = √(−1); e.g., 3i.',
    'greatest common factor':'The largest factor shared by two or more numbers.',
    'least common multiple':'The smallest multiple shared by two or more numbers.',
    /* Conic Sections */
    'ellipse':'A closed oval-shaped curve defined by two focal points.',
    'hyperbola':'A curve with two branches defined by the difference of distances from two foci.',
    'focus':'A special point used to define conic sections.',
    'directrix':'A fixed line used to define a parabola.',
    'eccentricity':'A measure of how stretched a conic section is (0 for circle, 1 for parabola).',
  };

  /* Sort keys longest-first so multi-word terms match before their sub-words */
  var KEYS = Object.keys(VOCAB).sort(function(a,b){ return b.length - a.length; });
  /* Build a single regex — word-boundary aware, case-insensitive */
  var escaped = KEYS.map(function(k){ return k.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&'); });
  var VOCAB_RE = new RegExp('\\\\b(' + escaped.join('|') + ')\\\\b', 'gi');

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
    _pop.innerHTML = '<button class="mv-popup-close" title="Close">&times;</button>'
      + '<span class="mv-popup-term">' + term + '</span>'
      + defn;
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
      _origGFE && _origGFE.apply(this, arguments);
      setTimeout(function(){
        var boxes = document.querySelectorAll('.fep-body');
        boxes.forEach(_markNode);
      }, 1200);
    };
  })();

  /* ===================== TEACHER MODE ===================== */
  })();
