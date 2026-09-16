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
  window.TeacherMode = (function(){
    var _active = false;
    var CSS = [
      '.tm-meta{display:flex;gap:6px;flex-wrap:wrap;padding:3px 0 8px;font-size:11px;line-height:1.3}',
      '.tm-id{background:#e0e7ff;color:#3730a3;padding:1px 6px;border-radius:4px;font-family:monospace}',
      '.tm-dom{background:#f0fdf4;color:#166534;padding:1px 6px;border-radius:4px}',
      '.tm-diff-easy{background:#dcfce7;color:#15803d;padding:1px 6px;border-radius:4px}',
      '.tm-diff-medium{background:#fef9c3;color:#854d0e;padding:1px 6px;border-radius:4px}',
      '.tm-diff-hard{background:#fee2e2;color:#991b1b;padding:1px 6px;border-radius:4px}',
      '.tm-diff-review{background:#ede9fe;color:#5b21b6;padding:1px 6px;border-radius:4px}',
      '.tm-src{background:#f1f5f9;color:#475569;padding:1px 6px;border-radius:4px}',
      '.tm-toolbar{position:fixed;bottom:90px;right:16px;z-index:9000;background:#1e1b4b;color:#fff;',
      'border-radius:12px;padding:10px 18px;font-size:13px;display:flex;gap:10px;align-items:center;',
      'box-shadow:0 4px 20px rgba(0,0,0,.3)}',
      '.tm-toolbar button{background:#4f46e5;color:#fff;border:none;border-radius:7px;padding:5px 12px;cursor:pointer;font-size:12px}',
      '@media print{.cq-sol{display:block!important}.tm-meta{display:flex!important}',
      'nav,.sidebar,#tm-toolbar,#chatFab,#daily-goal-bar,#exam-countdown-bar,#weak-recs{display:none!important}}'
    ].join('');

    function _injectCSS(){
      if(document.getElementById('tm-style')) return;
      var s=document.createElement('style'); s.id='tm-style'; s.textContent=CSS;
      document.head.appendChild(s);
    }

    function toggle(){
      _active=!_active;
      window._teacherMode=_active;
      document.body.classList.toggle('teacher-mode',_active);
      _renderToolbar();
      /* update checkbox if open */
      var cb=document.getElementById('teacher-mode-toggle');
      if(cb) cb.checked=_active;
    }

    function _renderToolbar(){
      var existing=document.getElementById('tm-toolbar');
      if(!_active){ if(existing) existing.remove(); return; }
      if(!existing){
        var bar=document.createElement('div');
        bar.id='tm-toolbar'; bar.className='tm-toolbar';
        if(_ttAr()) bar.dir='rtl';
        bar.innerHTML=_tt('tmTeacherMode')
          +' <button onclick="window.TeacherMode.printLessonPlan()">'+_tt('tmLessonPlan')+'</button>'
          +' <button onclick="window.TeacherMode.exportPDF()">'+_tt('tmPrintChapterPdf')+'</button>'
          +' <button onclick="window.TeacherMode.exportWord()">'+_tt('tmQuizWordExport')+'</button>'
          +' <button onclick="window.CSExport&&window.CSExport.downloadChapterDocx(null)">'+_tt('tmChapterDocx')+'</button>'
          +' <button onclick="window.CSAssign&&window.CSAssign.open()">'+_tt('tmAssignment')+'</button>'
          +' <button onclick="window.CSReport&&window.CSReport.generate()">'+_tt('tmProgressReport')+'</button>'
          +' <button onclick="window.TeacherMode.toggle()" style="background:#7f1d1d">'+_tt('tmOff')+'</button>';
        document.body.appendChild(bar);
      }
    }

    function exportPDF(){
      if(window.CSExport){
        window.CSExport.printActiveChapter({teacherMode:true});
      } else {
        window.print();
      }
    }

    function exportWord(){
      var items=Array.from(document.querySelectorAll('.cq-item'));
      if(!items.length){ alert(_tt('generateQuizFirst')); return; }
      if(typeof JSZip==='undefined'){ alert(_tt('docxLoading')); return; }
      var _ar=_ttAr();

      var _view=document.querySelector('.view.active');
      var _h1=_view&&_view.querySelector('.subject-head h1');
      var _track=_view&&_view.querySelector('.subject-head .eyebrow');
      var _lhTitle=_h1?_h1.textContent.trim():'ClipSAT Math';
      var _lhTrack=_track?_track.textContent.trim():'';

      /* Use OMML helpers from CSExport if available */
      var _omml=window.CSExport&&window.CSExport.latexToOmml||function(){return '';};
      var _mrun=window.CSExport&&window.CSExport.mixedRunsXml||function(s){return '<w:r><w:t xml:space="preserve">'+String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</w:t></w:r>';};

      function _xmlEnc(t){return String(t||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
      function _rawEl(el){if(!el)return '';var r=el.getAttribute&&el.getAttribute('data-raw');return r!=null?r:el.textContent||'';}

      /* Build a table cell with mixed text+math content */
      function _tc(widthDxa, content, rprXml, tcOpts){
        tcOpts=tcOpts||{};
        var bg=tcOpts.bg?'<w:shd w:val="clear" w:color="auto" w:fill="'+tcOpts.bg+'"/>':'';
        var vAlign=tcOpts.vAlign?'<w:vAlign w:val="'+tcOpts.vAlign+'"/>':'';
        var innerXml=_mrun(String(content||''), rprXml||'');
        var pPr='<w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:spacing w:after="0"/></w:pPr>';
        return '<w:tc>'
          +'<w:tcPr><w:tcW w:w="'+widthDxa+'" w:type="dxa"/>'+bg+vAlign
          +'<w:tcMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar>'
          +'</w:tcPr>'
          +'<w:p>'+pPr+innerXml+'</w:p>'
          +'</w:tc>';
      }

      /* Table borders XML */
      var tblBorders='<w:tblBorders>'
        +'<w:top w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'<w:left w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'<w:bottom w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'<w:right w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'<w:insideH w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'<w:insideV w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>'
        +'</w:tblBorders>';
      /* Column widths (twips, A4 landscape usable ~13680 minus margins ~1440 = ~12240) */
      /* Using US Letter landscape: 15840 - 1440 margins = 14400 usable */
      /* Cols: # 480, Question 9600 (67%), Solution 2880 (20%), Info 1440 (10%) */
      var C1=480, C2=9600, C3=2880, C4=1440;
      var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});

      /* Helper: make RPr XML */
      function rpr(bold,italic,color,size){
        return '<w:rPr>'+(bold?'<w:b/>':'')+(italic?'<w:i/>':'')
          +(color?'<w:color w:val="'+color+'"/>':'')
          +(size?'<w:sz w:val="'+size+'"/><w:szCs w:val="'+size+'"/>':'')+(_ar?'<w:rtl/>':'')+'</w:rPr>';
      }

      var body='';
      /* Branding, title and track now live in the repeating page header (see
         window.CSExport.buildLetterhead) — the body just needs the date. */
      body+='<w:p><w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:spacing w:after="200"/></w:pPr>'
        +'<w:r>'+rpr(false,true,'566173','18')+'<w:t>'+_tt('generatedLabel')+_xmlEnc(today)+'</w:t></w:r></w:p>';

      /* Header row */
      var hRpr=rpr(true,false,'FFFFFF','20');
      var headerRow='<w:tr>'
        +'<w:trPr><w:trStyle w:val="TableHead"/></w:trPr>'
        +_tc(C1,_tt('colNum'),hRpr,{bg:'1A1A2E',vAlign:'center'})
        +_tc(C2,_tt('colQuestionChoices'),hRpr,{bg:'1A1A2E',vAlign:'center'})
        +_tc(C3,_tt('colAnswerSolution'),hRpr,{bg:'1A1A2E',vAlign:'center'})
        +_tc(C4,_tt('colInfo'),hRpr,{bg:'1A1A2E',vAlign:'center'})
        +'</w:tr>';

      /* ── Per-item figure capture for inline placement inside question cells ── */
      var _captureImgs=window.CSExport&&window.CSExport.captureContainerImages
        ?window.CSExport.captureContainerImages:function(){return Promise.resolve([]);};
      var _imgPara=window.CSExport&&window.CSExport.imgParaXml?window.CSExport.imgParaXml:function(){return '';};
      var _fetchLogo=window.CSExport&&window.CSExport.fetchLogoBase64?window.CSExport.fetchLogoBase64:function(){return Promise.resolve(null);};
      var _buildLh=window.CSExport&&window.CSExport.buildLetterhead?window.CSExport.buildLetterhead:function(){return {docRelsXml:'',contentTypesXml:'',sectPrRefs:''};};

      Promise.all([
        Promise.all(items.map(function(item){
          var figEl=item.querySelector('.cq-figure,figure,.fig-wrap,.svg-fig');
          return figEl?_captureImgs(figEl):Promise.resolve([]);
        })),
        _fetchLogo()
      ]).then(function(_cap){
        var perItemImgs=_cap[0], _logoB64=_cap[1];
        var zip=new JSZip();
        var imgIdx=0;
        var imgRelsXml='';
        var _letterhead=_buildLh(zip,{title:_lhTitle,chapter:'Quiz Export',track:_lhTrack},_logoB64);
        imgRelsXml+=_letterhead.docRelsXml;

        /* Pre-assign rIds for every captured image */
        var perItemRefs=perItemImgs.map(function(imgs){
          return imgs.map(function(img){
            imgIdx++;
            var rId='rId'+(imgIdx+1);
            zip.folder('word').folder('media').file('fig'+imgIdx+'.png',img.imageData,{base64:true});
            imgRelsXml+='<Relationship Id="'+rId+'" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/fig'+imgIdx+'.png"/>';
            return {rId:rId,wEmu:img.widthEmu,hEmu:img.heightEmu};
          });
        });

        /* Question rows — images appear inline inside question cell */
        var tableRows=headerRow;
        items.forEach(function(item,i){
          /* 1. Question stem */
          var stemRaw=item.getAttribute('data-raw')||'';
          if(!stemRaw){ var sEl=item.querySelector('.cq-qt,.cq-stem'); stemRaw=sEl?_rawEl(sEl):''; }

          /* 2. MCQ choices */
          var choiceParas='';
          item.querySelectorAll('.cq-opt').forEach(function(opt,j){
            var ct=opt.getAttribute('data-raw')||opt.querySelector('.cq-ct')?opt.querySelector('.cq-ct').textContent:'';
            if(!ct)ct=opt.getAttribute('data-raw')||'';
            var letter=String.fromCharCode(65+j);
            var chRpr=rpr(false,false,'444444','20');
            choiceParas+='<w:p><w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:ind w:left="240"/><w:spacing w:after="30"/></w:pPr>'+_mrun(letter+'.  '+ct,chRpr)+'</w:p>';
          });

          /* 3. Inline figure paragraphs for this question */
          var inlineImgXml=perItemRefs[i].map(function(ref){
            return _imgPara(ref.rId,ref.wEmu,ref.hEmu);
          }).join('');

          /* 4. Question cell: stem → inline figure(s) → choices */
          var stemRpr=rpr(true,false,'','22');
          var qCell='<w:tc>'
            +'<w:tcPr><w:tcW w:w="'+C2+'" w:type="dxa"/>'
            +'<w:tcMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar>'
            +'</w:tcPr>'
            +'<w:p><w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:spacing w:after="60"/></w:pPr>'+_mrun(stemRaw,stemRpr)+'</w:p>'
            +inlineImgXml
            +choiceParas
            +'</w:tc>';

          /* 5. Solution */
          var solEl=item.querySelector('.cq-sol-box,.cq-sol');
          var solRaw=solEl?_rawEl(solEl):'';
          solRaw=solRaw.replace(/^Solution:\s*/i,'').trim();
          var solRpr=rpr(false,true,'166534','20');
          var solCell='<w:tc>'
            +'<w:tcPr><w:tcW w:w="'+C3+'" w:type="dxa"/>'
            +'<w:tcMar><w:top w:w="80" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="80" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tcMar>'
            +'</w:tcPr>'
            +'<w:p><w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:spacing w:after="0"/></w:pPr>'+_mrun(solRaw,solRpr)+'</w:p>'
            +'</w:tc>';

          /* 6. Info/meta */
          var metaEl=item.querySelector('.tm-meta,.cq-meta');
          var meta=metaEl?_xmlEnc(metaEl.textContent.trim()):'';
          var metaRpr=rpr(false,false,'888888','18');

          tableRows+='<w:tr>'
            +'<w:tc><w:tcPr><w:tcW w:w="'+C1+'" w:type="dxa"/><w:vAlign w:val="top"/></w:tcPr>'
            +'<w:p><w:pPr>'+(_ar?'<w:bidi/>':'')+'<w:jc w:val="center"/><w:spacing w:after="0"/></w:pPr>'
            +'<w:r>'+rpr(true,false,'1A1A2E','22')+'<w:t>'+_xmlEnc(String(i+1))+'</w:t></w:r></w:p></w:tc>'
            +qCell+solCell
            +'<w:tc><w:tcPr><w:tcW w:w="'+C4+'" w:type="dxa"/><w:vAlign w:val="top"/></w:tcPr>'
            +'<w:p><w:pPr>'+(_ar?'<w:bidi/><w:jc w:val="right"/>':'')+'<w:spacing w:after="0"/></w:pPr>'
            +'<w:r>'+metaRpr+'<w:t xml:space="preserve">'+meta+'</w:t></w:r></w:p></w:tc>'
            +'</w:tr>';
        });

        body+='<w:tbl>'
          +'<w:tblPr>'+(_ar?'<w:bidiVisual/>':'')+'<w:tblW w:w="'+(C1+C2+C3+C4)+'" w:type="dxa"/>'+tblBorders
          +'<w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0" w:firstColumn="1" w:lastColumn="0" w:noHBand="0" w:noVBand="1"/></w:tblPr>'
          +'<w:tblGrid><w:gridCol w:w="'+C1+'"/><w:gridCol w:w="'+C2+'"/><w:gridCol w:w="'+C3+'"/><w:gridCol w:w="'+C4+'"/></w:tblGrid>'
          +tableRows+'</w:tbl>';

        var wNS='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
        var mNS='xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"';
        var rNS='xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
        var wpNS='xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"';
        var aNS='xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"';
        var picNS='xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"';
        var wDoc='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
          +'<w:document '+wNS+' '+mNS+' '+rNS+' '+wpNS+' '+aNS+' '+picNS+'>'
          +'<w:body>'+body
          +'<w:sectPr>'+_letterhead.sectPrRefs+'<w:pgSz w:w="15840" w:h="12240" w:orient="landscape"/>'
          +'<w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="720" w:footer="720"/>'
          +'</w:sectPr></w:body></w:document>';
        var ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
          +'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
          +'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
          +'<Default Extension="xml" ContentType="application/xml"/>'
          +'<Default Extension="png" ContentType="image/png"/>'
          +'<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
          +_letterhead.contentTypesXml
          +'</Types>';
        var rels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
          +'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
          +'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
          +'</Relationships>';
        zip.file('[Content_Types].xml',ct);
        zip.folder('_rels').file('.rels',rels);
        zip.folder('word').file('document.xml',wDoc);
        var wRels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+imgRelsXml+'</Relationships>';
        zip.folder('word').folder('_rels').file('document.xml.rels',wRels);
        return zip.generateAsync({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
      }).then(function(blob){
        var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='clipsat-quiz.docx';
        document.body.appendChild(a); a.click();
        setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},1500);
      }).catch(function(){alert('Sorry — the .docx could not be generated in this browser.');});
    }

    /* ══ LESSON PLAN PRINTER ═══════════════════════════════════════════ */
    function printLessonPlan(){
      var view=document.querySelector('.view.active');
      if(!view){alert(_tt('navigateFirst'));return;}
      var _dir=_ttDir();

      var subjEl=view.querySelector('.subject-head h1');
      var subject=subjEl?subjEl.textContent.trim():'Mathematics';
      var eyebrow=view.querySelector('.subject-head .eyebrow');
      var track=eyebrow?eyebrow.textContent.trim():'';
      /* Exclude testgen chapters — when teacher is viewing quiz output, ch-active
         is the testgen chapter which has no definitions or practice problems */
      var chapter=view.querySelector('.chapter.ch-active:not(.testgen)')||view.querySelector('.chapter:not(.testgen)');
      var chTitle='';
      if(chapter){var chH=chapter.querySelector('.chead h2');if(chH)chTitle=chH.textContent.replace(/^[^a-zA-Z؀-ۿ]+/,'').trim();}
      var today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});

      function esc(t){return t?t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'):''; }

      /* Extract content */
      var objectives=[];
      var defs=[];
      var examples=[];
      var probs=[];
      if(chapter){
        chapter.querySelectorAll('.callout').forEach(function(c){var l=c.querySelector('.lab');if(l)objectives.push(l.textContent.trim());});
        chapter.querySelectorAll('.callout.def').forEach(function(d){
          var l=d.querySelector('.lab');
          if(!l)return;
          /* Use data-raw (pre-typeset LaTeX source) so MathJax re-renders in popup */
          var rawDef=d.getAttribute('data-raw')||d.innerHTML;
          var _tmp=document.createElement('div');_tmp.innerHTML=rawDef;
          var _bp=_tmp.querySelector('p,.body');
          /* defHtml: raw HTML with \(...\) intact for MathJax; strip .lab span first */
          var defHtml=_bp?_bp.innerHTML:(rawDef.replace(/<span[^>]*class="lab"[^>]*>[\s\S]*?<\/span>/i,'').trim());
          defs.push({term:l.textContent.trim(),def:defHtml});
        });
        chapter.querySelectorAll('.example').forEach(function(ex,i){var t=ex.querySelector('.et,.ex-title,.lab');
          /* Use data-raw (pre-typeset LaTeX source) so MathJax in popup can re-render */
          var rawHtml=ex.getAttribute('data-raw')||ex.innerHTML;
          examples.push({n:i+1,title:t?t.textContent.trim():_tt('exampleWord')+' '+(i+1),html:rawHtml});});
        var ps=chapter.querySelectorAll('.problem');for(var pi=0;pi<Math.min(3,ps.length);pi++){
          /* Use .pq data-raw (pre-typeset LaTeX) so MathJax re-renders in popup */
          var _pq=ps[pi].querySelector('.pq');
          probs.push(_pq?(_pq.getAttribute('data-raw')||_pq.innerHTML):(ps[pi].getAttribute('data-raw')||ps[pi].innerHTML));}
      }
      if(!objectives.length)objectives.push(_tt('understandKeyConcepts')+subject);

      var css='@page{margin:20mm 18mm 24mm 18mm}'
        +'*{box-sizing:border-box}'
        +'body{margin:0;padding:0 0 0 24pt;font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.55;color:#111;background:#fff}'
        +'.lp-header{display:flex;align-items:center;justify-content:space-between;gap:8pt;border-bottom:2.5pt solid #1a1a2e;padding:6pt 0 6pt;margin-bottom:14pt;width:100%;box-sizing:border-box;overflow:hidden}'
        +'.lp-brand{display:flex;align-items:center;gap:7pt;flex-shrink:0;min-width:0}'
        +'.lp-logo{width:32pt;height:32pt;border-radius:6pt;background:#1a1a2e;color:#fff;display:flex;align-items:center;justify-content:center;font-size:15pt;font-weight:700;font-family:Georgia,serif;flex-shrink:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
        +'.lp-logo-img{height:32pt;width:auto;border-radius:4pt;object-fit:contain;max-width:80pt;flex-shrink:0}'
        +'.lp-brand-text .lp-name{font-size:11pt;font-weight:700;color:#1a1a2e;white-space:nowrap}'
        +'.lp-brand-text .lp-author{font-size:7pt;letter-spacing:.10em;text-transform:uppercase;color:#566173;white-space:nowrap}'
        +'.lp-title-block{flex:1;text-align:center;min-width:0;padding:0 6pt;overflow:hidden}'
        +'.lp-doc-label{font-size:7pt;letter-spacing:.16em;text-transform:uppercase;color:#B8801F;font-weight:700}'
        +'.lp-subject{font-size:12pt;font-weight:700;color:#1a1a2e;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
        +'.lp-chapter{font-size:9pt;color:#566173;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
        +'.lp-track{font-size:7.5pt;color:#8892a4;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}'
        +'.lp-meta{font-size:8pt;text-align:right;line-height:1.7;color:#566173;flex-shrink:0;white-space:nowrap}'
        +'.lp-meta strong{color:#1a1a2e}'
        +'.lp-section{margin-bottom:16pt;page-break-inside:avoid}'
        +'.lp-section-head{background:#1a1a2e;color:#fff;font-size:9pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4pt 10pt;margin-bottom:8pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
        +'.lp-amber-head{background:#92650F;color:#fff;font-size:9pt;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:4pt 10pt;margin-bottom:8pt;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
        +'.lp-field-grid{display:grid;grid-template-columns:1fr 1fr;gap:8pt 20pt;margin-bottom:10pt}'
        +'.lp-field{border-bottom:1pt solid #ccc;padding-bottom:6pt}'
        +'.lp-field label{display:block;font-size:7.5pt;letter-spacing:.1em;text-transform:uppercase;color:#888;margin-bottom:4pt;font-weight:700}'
        +'.lp-field-val{font-size:10pt;min-height:14pt}'
        +'.lp-obj-list{margin:0;padding-left:14pt}'
        +'.lp-obj-list li{margin-bottom:5pt;font-size:10.5pt}'
        +'.lp-vocab{width:100%;border-collapse:collapse;font-size:10pt}'
        +'.lp-vocab th{background:#e8edf8;border:1pt solid #c5cde8;padding:5pt 8pt;text-align:left;font-size:8.5pt;text-transform:uppercase;letter-spacing:.06em;-webkit-print-color-adjust:exact;print-color-adjust:exact}'
        +'.lp-vocab td{border:1pt solid #dde2ec;padding:5pt 8pt;vertical-align:top}'
        +'.lp-vocab tr:nth-child(even) td{background:#f8f9fc}'
        +'.lp-example{border:1pt solid #dde2ec;border-radius:4pt;padding:8pt 10pt;margin-bottom:8pt;page-break-inside:avoid}'
        +'.lp-example-title{font-weight:700;font-size:9.5pt;color:#1a1a2e;margin-bottom:5pt}'
        +'.lp-strat-grid{display:grid;grid-template-columns:1fr 1fr;gap:8pt}'
        +'.lp-strat-box{border:1pt solid #dde2ec;border-radius:4pt;padding:8pt 10pt}'
        +'.lp-strat-title{font-weight:700;font-size:9.5pt;color:#1a1a2e;margin-bottom:4pt}'
        +'.lp-note-lines .nl{border-bottom:1pt solid #ddd;height:24pt}'
        +'.lp-q{display:flex;gap:8pt;margin-bottom:12pt;page-break-inside:avoid;align-items:flex-start}'
        +'.lp-qn{width:18pt;height:18pt;border-radius:50%;border:1.5pt solid #1a1a2e;display:flex;align-items:center;justify-content:center;font-size:8.5pt;font-weight:700;flex-shrink:0}'
        +'.lp-qbody{flex:1;font-size:10.5pt}'
        +'.lp-footer{position:fixed;bottom:0;left:0;right:0;border-top:1pt solid #1a1a2e;padding:3pt 18pt;display:flex;justify-content:space-between;font-size:7.5pt;color:#888;background:#fff}'
        +'mjx-container{display:inline!important;visibility:visible!important}'
        +'mjx-container[display="true"]{display:block!important;visibility:visible!important;margin:5pt 0!important}'
        +'mjx-container svg{display:inline-block!important;visibility:visible!important}'
        +'mjx-container *{visibility:visible!important}'
        +'.MathJax,.MathJax_SVG{display:inline!important;visibility:visible!important}'
        /* Qudrat/Tahsili + Arabic mode only — see _ttAr(). Math stays LTR,
           matching the site's own established RTL convention. */
        +'body[dir="rtl"]{direction:rtl;text-align:right;padding:0 24pt 0 0}'
        +'body[dir="rtl"] .lp-header{direction:rtl}'
        +'body[dir="rtl"] .lp-meta{text-align:left}'
        +'body[dir="rtl"] .lp-obj-list{padding-left:0;padding-right:14pt}'
        +'body[dir="rtl"] .lp-vocab th{text-align:right}'
        +'body[dir="rtl"] .lp-footer{direction:rtl}'
        +'body[dir="rtl"] mjx-container,body[dir="rtl"] .MathJax{direction:ltr}';

      var objHTML='<ul class="lp-obj-list">';
      objectives.slice(0,6).forEach(function(o){objHTML+='<li>'+_tt('studentsWillUnderstand')+esc(o)+'<\/li>';});
      objHTML+='<li>'+_tt('studentsWillApply')+'<\/li><\/ul>';

      var vocabHTML='<table class="lp-vocab"><thead><tr><th>'+_tt('termConcept')+'<\/th><th>'+_tt('defDescription')+'<\/th><\/tr><\/thead><tbody>';
      if(defs.length){defs.forEach(function(d){
        /* d.def is raw HTML with LaTeX \(...\) intact — do NOT esc() it so MathJax renders */
        vocabHTML+='<tr><td><strong>'+esc(d.term)+'<\/strong><\/td><td>'+d.def+'<\/td><\/tr>';
      });}
      else{for(var vi=0;vi<3;vi++)vocabHTML+='<tr><td><\/td><td><\/td><\/tr>';}
      vocabHTML+='<\/tbody><\/table>';

      var exHTML='';
      if(examples.length){examples.slice(0,3).forEach(function(ex){exHTML+='<div class="lp-example"><div class="lp-example-title">'+_tt('exampleWord')+' '+ex.n+(ex.title&&ex.title!==_tt('exampleWord')+' '+ex.n?' — '+esc(ex.title):'')+'<\/div>'+ex.html+'<\/div>';});}
      else{exHTML='<div class="lp-example" style="min-height:80pt"><div class="lp-example-title">'+_tt('workedExamples')+'<\/div><\/div>';}

      var noteLines='<div class="lp-note-lines">';
      for(var ni=0;ni<8;ni++)noteLines+='<div class="nl"><\/div>';
      noteLines+='<\/div>';

      var assessHTML='';
      if(probs.length){probs.forEach(function(p,i){assessHTML+='<div class="lp-q"><div class="lp-qn">'+(i+1)+'<\/div><div class="lp-qbody">'+_inlineMjx(p)+'<\/div><\/div>';});}
      else{for(var qi=1;qi<=3;qi++){assessHTML+='<div class="lp-q"><div class="lp-qn">'+qi+'<\/div><div class="lp-qbody" style="min-height:40pt"><\/div><\/div>';}}

      /* MathJax 3 SVG mode stores reusable path defs in a hidden <svg> in the main
         document. Copied innerHTML uses <use href="#MJX-..."/> which resolves to
         that hidden element — but NOT in a new popup where it doesn't exist.
         Fix: serialize the global SVG cache and inject it into the popup body. */
      var _mjxDefs='';
      var _mjxCacheEl=null;
      (function(){
        /* Robust selector: find the MathJax glyph-cache SVG several ways */
        var _sc=document.querySelector('svg[style*="display:none"],svg[style*="display: none"]');
        if(!_sc){var _d=document.querySelector('defs [id^="MJX-"]');if(_d)_sc=_d.closest('svg');}
        if(!_sc){var _all=document.querySelectorAll('body > svg');for(var _i=0;_i<_all.length;_i++){if(_all[_i].querySelector('defs')){_sc=_all[_i];break;}}}
        if(_sc){
          _mjxCacheEl=_sc;
          _mjxDefs=_sc.outerHTML.replace(/(<svg[^>]*?)\s+style\s*=\s*["'][^"']*?["']/i,
            '$1 style="position:absolute;width:0;height:0;overflow:hidden;"');
        }
      }());
      /* Inline every <use href="#MJX-…"> → actual <path> so the popup HTML is
         fully self-contained and works in blob: URLs without cross-doc lookups */
      function _inlineMjx(html){
        if(!_mjxCacheEl||!html)return html;
        var tmp=document.createElement('div');
        tmp.innerHTML=html;
        tmp.querySelectorAll('use').forEach(function(u){
          var ref=u.getAttribute('href')||u.getAttributeNS('http://www.w3.org/1999/xlink','href');
          if(!ref||ref.charAt(0)!=='#')return;
          var target=_mjxCacheEl.querySelector('[id="'+ref.slice(1)+'"]');
          if(!target)return;
          var clone=target.cloneNode(true);
          clone.removeAttribute('id');
          ['x','y','width','height','transform','fill','stroke'].forEach(function(a){
            var v=u.getAttribute(a);if(v)clone.setAttribute(a,v);
          });
          u.parentNode.replaceChild(clone,u);
        });
        return tmp.innerHTML;
      }

      var lpHTML='<!DOCTYPE html><html lang="'+(_dir==='rtl'?'ar':'en')+'" dir="'+_dir+'"><head>'
        +'<meta charset="utf-8"><title>'+_tt('lessonPlanDocTitlePrefix')+esc(subject)+'<\/title>'
        +'<style>'+css+'<\/style>'
        +'<script>MathJax={tex:{inlineMath:[["\\\\(","\\\\)"]],displayMath:[["\\\\[","\\\\]"]],tags:"none"},svg:{fontCache:"global",scale:1},options:{skipHtmlTags:["script","noscript","style","textarea","pre","code"]}};<\/script>'
        +'<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js"><\/script>'
        +'<\/head><body dir="'+_dir+'">'
        +'<div class="lp-header">'
          +'<div class="lp-brand">'
            +(window.CSExport&&window.CSExport.logoSrc()
              ?'<img src="'+window.CSExport.logoSrc()+'" class="lp-logo-img" alt="ClipSAT">'
              :'<div class="lp-logo">C<\/div>')
            +'<div class="lp-brand-text"><div class="lp-name">ClipSAT<\/div><div class="lp-author">Mr. Mohamed Abdallah<\/div><\/div><\/div>'
          +'<div class="lp-title-block">'
            +'<div class="lp-doc-label">'+_tt('lessonPlanLabel')+'<\/div>'
            +'<div class="lp-subject">'+esc(subject)+'<\/div>'
            +(chTitle?'<div class="lp-chapter">'+esc(chTitle)+'<\/div>':'')
            +(track?'<div class="lp-track">'+esc(track)+'<\/div>':'')
          +'<\/div>'
          +'<div class="lp-meta"><div>'+_tt('dateLabel')+' <strong>'+today+'<\/strong><\/div><div>'+_tt('durationLabel')+' <strong>'+_tt('durationPlaceholder')+'<\/strong><\/div><div>'+_tt('classLabel')+' <strong>________________<\/strong><\/div><\/div>'
        +'<\/div>'
        +'<div class="lp-section"><div class="lp-section-head">'+_tt('lessonInfo')+'<\/div>'
          +'<div class="lp-field-grid">'
            +'<div class="lp-field"><label>'+_tt('unitTopic')+'<\/label><div class="lp-field-val">'+esc(chTitle||subject)+'<\/div><\/div>'
            +'<div class="lp-field"><label>'+_tt('gradeLevel')+'<\/label><div class="lp-field-val"><\/div><\/div>'
            +'<div class="lp-field"><label>'+_tt('curriculumBoard')+'<\/label><div class="lp-field-val">'+esc(track||'')+'<\/div><\/div>'
            +'<div class="lp-field"><label>'+_tt('priorKnowledge')+'<\/label><div class="lp-field-val"><\/div><\/div>'
          +'<\/div><\/div>'
        +'<div class="lp-section"><div class="lp-section-head">'+_tt('learningObjectives')+'<\/div>'+objHTML+'<\/div>'
        +'<div class="lp-section"><div class="lp-section-head">'+_tt('keyVocab')+'<\/div>'+vocabHTML+'<\/div>'
        +'<div class="lp-section"><div class="lp-amber-head">'+_tt('teachingStrategy')+'<\/div>'
          +'<div class="lp-strat-grid">'
            +'<div class="lp-strat-box"><div class="lp-strat-title">&#128218; '+_tt('educationalTools')+'<\/div>'+_tt('educationalToolsBody')+'<\/div>'
            +'<div class="lp-strat-box"><div class="lp-strat-title">&#128187; '+_tt('digitalDevices')+'<\/div>'+_tt('digitalDevicesBody')+'<\/div>'
            +'<div class="lp-strat-box"><div class="lp-strat-title">&#128203; '+_tt('pedagogicalApproach')+'<\/div>'+_tt('pedagogicalApproachBody')+'<\/div>'
            +'<div class="lp-strat-box"><div class="lp-strat-title">&#8987; '+_tt('timing')+'<\/div>'+_tt('timingBody')+'<\/div>'
          +'<\/div><\/div>'
        +'<div class="lp-section"><div class="lp-section-head">'+_tt('workedExamples')+'<\/div>'+exHTML+'<\/div>'
        +'<div class="lp-section"><div class="lp-section-head">'+_tt('studentNotes')+'<\/div>'+noteLines+'<\/div>'
        +'<div class="lp-section"><div class="lp-amber-head">'+_tt('practiceAssess')+'<\/div>'+assessHTML+'<\/div>'
        +'<div class="lp-footer"><span>ClipSAT &middot; Mr. Mohamed Abdallah<\/span><span>'+_tt('lessonPlanDocTitlePrefix')+esc(subject)+'<\/span><span>'+today+'<\/span><\/div>'
        /* MathJax script is sync (no async); startup.promise resolves after full typeset */
        +'<script>MathJax.startup.promise.then(function(){setTimeout(window.print,400);});<\/script>'
        +'<\/body><\/html>';

      var _lpBlob=new Blob([lpHTML],{type:'text/html;charset=utf-8'});
      var _lpUrl=URL.createObjectURL(_lpBlob);
      var lpWin=window.open(_lpUrl,'_blank','width=940,height=780');
      if(!lpWin){alert('Please allow pop-ups to print the lesson plan.');URL.revokeObjectURL(_lpUrl);return;}
      setTimeout(function(){URL.revokeObjectURL(_lpUrl);},120000);
    }

    _injectCSS();
    return {toggle:toggle, exportPDF:exportPDF, exportWord:exportWord, printLessonPlan:printLessonPlan, isActive:function(){ return _active; }};
  }());


  /* ===================== i18n — EN / AR ===================== */
  window.i18n = (function(){
    var _strings = {
      en: {
        'nav.home':'Home','nav.mistakes':'Mistakes','nav.whats-new':"What's New?",
        'quiz.generate':'Generate Quiz','quiz.level':'Level','quiz.count':'Questions',
        'quiz.chapterQuiz':'Chapter Quiz',
        'quiz.mixed':'Mixed','quiz.easy':'Easy','quiz.medium':'Medium','quiz.hard':'Hard',
        'ix.head':'Interactive Practice','ix.badge.qc':'Quick Check','ix.badge.sr':'Worked Example','ix.badge.fn':'Explorer',
        'ix.tryAgain':'Try again','ix.correct':'✓ Correct! ','ix.incorrect':'✗ Not quite. ',
        'ix.sr.showFirst':'Show first step ▸','ix.sr.showNext':'Show next step ▸ ({n}/{m})','ix.sr.restart':'↺ Restart',
        'mistake.empty':'🎉 No mistakes yet! Keep it up.',
        'mistake.quiz-me':'🔁 Quiz Me On Mistakes','mistake.clear':'🗑 Clear All',
        'mistake.explain':'🤖 Explain this',
        'daily.goal-met':'✓ Goal met!','daily.streak':'{n} day streak',
        'weak.heading':'⚠ Focus areas','weak.quiz-all':'🔁 Quiz me on mistakes',
        'teacher.on':'📐 Teacher Mode ON','teacher.pdf':'📄 PDF','teacher.word':'📝 Word','teacher.off':'✕ Off',
        'solution.show':'Show solution','solution.hide':'Hide solution',
        /* Site chrome — Pillar 4 Scale-phase pilot (see below). Deliberately
           NOT extended to chapter prose/proofs/question banks: that's
           exam-critical mathematical content needing a subject-matter
           reviewer, not a bulk pass — matches the roadmap's "don't dilute
           the proof-and-explorer bar" rule. */
        'search.placeholder':'Search topics…',
        'nav.progress':'Progress','nav.teacher':'Teacher','nav.support':'Support',
        'nav.calculator':'Calculator','nav.more':'More',
        'nav.whats-new-label':"What's New",
        'hero.h1':'Math you can <span class="q1">see</span> —<br>built for the <span class="q2">exam</span>.',
        'hero.lede':'ClipSAT turns every topic into something you can watch move: readable notes, live interactive figures, worked solutions, and printable packets. All 22 exam tracks are live now — pick yours below.',
        'hero.cta-calc':'Start with Calculus <span class="arr">→</span>',
        'hero.cta-algebra':'Explore Algebra',
        'hero.fig-title':'Calculus preview · drag the point',
        'hero.chip-slope':'slope','hero.chip-area':'area',
        'hero.toggle-area':'Show area','hero.toggle-tan':'Show tangent',
        'hero.fig-hint':'Indigo tangent = the derivative · amber region = the integral',

        /* Home page — full-page translation (every band below the hero:
           Egypt promo, about-the-educator, results, testimonials, course
           catalog, both interactive explorers, "four ways in", the
           deep-content math sample, and resources). EN entries match the
           raw home.html verbatim, same convention as contact/privacy/terms/
           cookies above — _applyToDOM() always runs the swap, in either
           locale. Dynamically-generated JS strings inside the two
           explorers' "view as data" accessibility panels (derivDataDesc /
           riemannDataDesc, built from live slider values) are NOT covered
           here — same scope boundary as everywhere else on the site where a
           number-driven sentence is assembled in JS rather than static HTML. */
        'home.egypt.link-aria':'Visit ClipSAT for Egypt (opens in a new tab)',
        'home.egypt.flag-aria':'Egyptian flag',
        'home.egypt.for-egypt':'for Egypt',
        'home.egypt.eyebrow':'Sister site',
        'home.egypt.h2':"Studying Egypt's national curriculum?",
        'home.egypt.p':'ClipSAT for Egypt is a companion site built for students on Egypt\'s national math curriculum — the same read‑it, see‑it, practice‑it approach as ClipSAT, tailored to Egypt.',
        'home.egypt.cta':'Visit ClipSAT for Egypt',

        'home.about.eyebrow':'About the educator',
        'home.about.h2':"Taught by someone who's spent a career watching students get stuck in the exact same places.",
        'home.about.p1':'Mr. Mohamed Abdallah holds a <strong>B.Sc. in Mathematics &amp; Education</strong> from the Faculty of Education, Alexandria University, Egypt, and a <strong>Diploma in Math Education</strong> from the University of Maryland, Baltimore County (UMBC), USA, where he completed the Egyptian Mathematics and Science Teacher-Scholar Program. He is a Google Certified Educator and Microsoft Certified Innovator, holds a Saudi Teaching License in Mathematics with a 96% score, and in 2023 won Egypt\'s first Global Certificate in Mathematics competition for adults.',
        'home.about.p2':'In <strong>33+ years</strong> teaching mathematics — including as Head of Mathematics at Asia International School in Al Khobar and currently at Edugates International School in Jeddah — across Cambridge IGCSE/GCSE and AS/A-Level, AP Calculus AB/BC and AP Statistics, the Digital SAT and ACT, and the Saudi national exams GAT Qudrat and SAAT Tahsili, he has led curriculum design, teacher mentoring, and data-driven intervention programs that raised student achievement by 15%.',
        'home.about.p3':'That breadth across curricula is the real asset: the algebra mistake that trips up a Digital SAT student is the same one that trips up an AP Calculus student a year later, and teaching every level at once makes those patterns hard to miss.',
        'home.about.p4':'ClipSAT grew directly out of that classroom experience. Every explorer on this site exists because a verbal explanation of "the tangent line\'s slope approaches the derivative" wasn\'t landing — but dragging a point and watching it happen always did. The same philosophy shapes every track: read the idea in plain language, watch it move, practice it until it\'s automatic, then keep a clean copy for review before the exam.',
        'home.about.stat-years':'Years teaching','home.about.stat-tracks':'Exam tracks covered',
        'home.about.stat-questions':'Practice questions','home.about.stat-explorers':'Interactive explorers',
        'home.about.credentials':'B.Sc. Mathematics &amp; Education, Alexandria University · Diploma in Math Education, UMBC (USA) · Google Certified Educator · Microsoft Certified Innovator. Curricula ClipSAT covers: IGCSE · Cambridge A-Level · IB (SL/HL) · AP · Digital SAT &amp; ACT · Qudrat &amp; Tahsili. <a href="https://wa.me/966597688647" target="_blank" rel="noopener">1:1 tutoring on WhatsApp →</a>',

        'home.results.eyebrow':'Real results',
        'home.results.h2':'Students who worked the material, not just watched it.',
        'home.results.p':"A sample of real outcomes from Mr. Mohamed's classroom, first names only.",
        'home.results.card1-label':'on the AP Exam',
        'home.results.card1-names':'Omar, Salma, Noor, Yasmeen, Mohamed, and more — perfect 5s on AP Calculus AB/BC.',
        'home.results.card2-label':'Cambridge Mathematics',
        'home.results.card2-names':'Nadine, Yousf, Nour, Haya, and more — A and A* grades across IGCSE, AS-Level, and A2-Level.',
        'home.results.card3-label':'on ACT Math',
        'home.results.card3-names':'Mohamed and Shereen — a perfect score on ACT Math.',

        'home.testi.eyebrow':'Testimonials','home.testi.h2':'What families say.',
        'home.testi.p1':'Mr. Mohamed Abdallah is an exceptional mathematics teacher who delivers outstanding results. Under his guidance, our students have achieved remarkable success: Omar, Salma, Noor, Yasmeen, Mohamed, and many more students scored a perfect 5 in AP Calculus AB/BC. Nadine, Yousf, Nour, Haya, and a long list of others earned A and A* grades in IGCSE Mathematics (AS and A2 levels). Mohamed and Shereen achieved an impressive 36 in ACT Math.',
        'home.testi.p2':"Mr. Mohamed's teaching style is clear, engaging, and highly effective. He breaks down complex topics like calculus, trigonometry, quadratics, and integrals into understandable concepts and provides excellent revision sheets, practice problems, and targeted exam strategies. His dedication and expertise helped our children not only master the material but also build confidence for top university placements.",
        'home.testi.p3':'We highly recommend Mr. Mohamed Abdallah for any student aiming for excellence in IGCSE, AP, or ACT mathematics. He is truly one of the best math tutors in Jeddah!',
        'home.testi.attr':'— Satisfied Parents &amp; Students, Jeddah International Schools',

        'home.catalog.eyebrow':'Course catalog','home.catalog.h2':'Every track ClipSAT covers.',
        'home.catalog.p':'All 23 tracks below share the same structure — notes, visual explorers, practice, and downloads — and are live today.',
        'home.cat.calculus.ct':'MATH · DIFFERENTIAL &amp; INTEGRAL','home.cat.calculus.h3':'Calculus',
        'home.cat.calculus.p':'Limits, derivatives, integrals, and the Fundamental Theorem — with interactive tangent and area explorers.',
        'home.cat.algebra.ct':'MATH · FOUNDATIONS','home.cat.algebra.h3':'Algebra',
        'home.cat.algebra.p':'Linear equations, quadratics, exponents and polynomials — with live line and parabola explorers.',
        'home.cat.alg2.ct':'MATH · ALGEBRA II','home.cat.alg2.h3':'Algebra 2',
        'home.cat.alg2.p':'Functions, quadratics &amp; complex numbers, polynomials, rationals, exp/log, radicals, series and conics — eleven chapters, three explorers, 50 problems.',
        'home.cat.geo.ct':'MATH · EUCLIDEAN GEOMETRY','home.cat.geo.h3':'Geometry',
        'home.cat.geo.p':'Proof and reasoning, parallel lines, triangles and congruence, similarity, right-triangle trigonometry, circles, and area &amp; volume. Eleven chapters, three explorers, 50 problems.',
        'home.cat.precalc.ct':'HIGH SCHOOL · PRECALCULUS','home.cat.precalc.h3':'Pre-Calculus',
        'home.cat.precalc.p':'Trigonometry, conic sections, vectors, polar & parametric coordinates, and limits — the essential bridge from Algebra 2 to Calculus.',
        'home.cat.linalg.ct':'UNIVERSITY · LINEAR ALGEBRA','home.cat.linalg.h3':'Linear Algebra',
        'home.cat.linalg.p':"Vectors, systems of equations, matrices and determinants — every theorem proved in full. Four chapters, the post-calculus foundation for engineering and CS.",
        'home.cat.mvc.ct':'UNIVERSITY · MULTIVARIABLE CALCULUS','home.cat.mvc.h3':'Multivariable Calculus',
        'home.cat.mvc.p':"Partial derivatives, gradients, optimization and double integrals — every theorem proved in full. Four chapters, built on Linear Algebra's vectors and determinants.",
        'home.cat.odes.ct':'UNIVERSITY · DIFFERENTIAL EQUATIONS','home.cat.odes.h3':'Differential Equations',
        'home.cat.odes.p':'First-order and separable equations, proved from the chain rule rather than asserted — the first chapter of a growing track.',
        'home.cat.apab.ct':'COLLEGE BOARD · AP','home.cat.apab.h3':'AP Calculus AB',
        'home.cat.apab.p':'Units 1–8 at AP depth — limits through integrals, with exam-style multiple choice and free response.',
        'home.cat.apbc.ct':'COLLEGE BOARD · AP','home.cat.apbc.h3':'AP Calculus BC',
        'home.cat.apbc.p':'All of AB plus series, parametric and polar curves, and advanced integration techniques.',
        'home.cat.appc.ct':'AP · PRECALCULUS','home.cat.appc.h3':'AP Precalculus',
        'home.cat.appc.p':'College Board AP Precalculus: polynomial, rational, exponential, logarithmic, trigonometric, and sinusoidal functions — with full exam prep.',
        'home.cat.apstats.ct':'AP · STATISTICS','home.cat.apstats.h3':'AP Statistics',
        'home.cat.apstats.p':'Exploring data, sampling distributions, probability, inference — confidence intervals, hypothesis tests, regression — full College Board coverage.',
        'home.cat.igcse.ct':'CAMBRIDGE · IGCSE 0580','home.cat.igcse.h3':'IGCSE 0580',
        'home.cat.igcse.p':'Cambridge IGCSE Mathematics — Core and Extended. Ten chapters, three explorers, and a 50-question paper-style bank.',
        'home.cat.aslevel.ct':'CAMBRIDGE · AS LEVEL','home.cat.aslevel.h3':'AS Level',
        'home.cat.aslevel.p':'Pure Mathematics 1 with the foundations of trigonometry, calculus and statistics. Eleven chapters, three explorers, 50 problems.',
        'home.cat.a2level.ct':'CAMBRIDGE · A2 LEVEL','home.cat.a2level.h3':'A2 Level',
        'home.cat.a2level.p':'Pure 2 &amp; 3 — functions, logarithms, advanced trig, calculus, series and vectors, completing the full A Level. Eleven chapters, three explorers, 50 problems.',
        'home.cat.ibsl.ct':'IB · MATHEMATICS SL','home.cat.ibsl.h3':'IB Math SL (AA/AI)',
        'home.cat.ibsl.p':'IB Mathematics Standard Level covering algebra, functions, trigonometry, statistics and calculus for both Analysis &amp; Approaches and Applications &amp; Interpretation.',
        'home.cat.ibhl.ct':'IB · MATHEMATICS HL','home.cat.ibhl.h3':'IB Math HL (AA/AI)',
        'home.cat.ibhl.p':'IB Mathematics Higher Level — all SL topics plus complex numbers, proof, 3D vectors, advanced calculus, differential equations and (AI HL) matrices and graph theory.',
        'home.cat.sat.ct':'COLLEGE BOARD · DIGITAL SAT','home.cat.sat.h3':'Digital SAT Math',
        'home.cat.sat.p':'The four math domains — algebra, advanced math, problem-solving &amp; data analysis, and geometry &amp; trigonometry — with Desmos tactics for the adaptive test. Eight chapters, three explorers, 50 problems.',
        'home.cat.act.ct':'ACT · MATHEMATICS','home.cat.act.h3':'ACT Math',
        'home.cat.act.p':'All 60 questions — pre-algebra through trigonometry, with pacing and calculator strategy. Eight chapters, three explorers, 50 problems.',
        'home.cat.act2.ct':'ACT · SUBJECT TEST','home.cat.act2.h3':'ACT 2 Math Level 1',
        'home.cat.act2.p':'Deep-dive ACT practice — advanced algebra, functions, coordinate geometry and trigonometry with timed section strategy and full-length drills.',
        'home.cat.act2l2.ct':'ACT · SUBJECT TEST','home.cat.act2l2.h3':'ACT 2 Math Level 2',
        'home.cat.act2l2.p':'The advanced AIST Math 2 test — complex numbers, matrices and vectors, advanced functions, limits, and polar/trigonometric precalculus.',
        'home.cat.est.ct':'EST I · EGYPT','home.cat.est.h3':'EST Math',
        'home.cat.est.p':'The Electronic Scholastic Test — algebra, functions, geometry and data analysis, for American Diploma students seeking Egyptian university admission.',
        'home.cat.est2.ct':'EST II · LEVEL 1','home.cat.est2.h3':'EST 2 Math Level 1',
        'home.cat.est2l2.ct':'EST II · LEVEL 2','home.cat.est2l2.h3':'EST 2 Math Level 2',
        'home.cat.est2l2.p':'The advanced EST II component — complex numbers, matrices and vectors, sequences and series, and an introduction to calculus.',
        'home.cat.est2.p':'Advanced EST — extended content covering trigonometry, sequences, logarithms and introductory calculus for the second-level paper.',
        'home.cat.qudrat.ct':'QIYAS · GAT (QUDRAT)','home.cat.qudrat.h3':'GAT Qudrat Math',
        'home.cat.qudrat.p':'The quantitative section of the General Aptitude Test — arithmetic, ratios and percentages, algebra, geometry, sequences, data, and the signature quantitative-comparison questions. Eight chapters, three explorers, 50 problems.',
        'home.cat.tahsili.ct':'QIYAS · SAAT (TAHSILI)','home.cat.tahsili.h3':'SAAT Tahsili Math',
        'home.cat.tahsili.p':'Achievement-test mathematics — high-school algebra, functions, sequences, trigonometry, coordinate geometry and introductory calculus, mapped to the exam. Nine chapters, three explorers, 50 problems.',

        'home.explorers.eyebrow':'See it before you solve it','home.explorers.h2':'Two instruments, not two pictures.',
        'home.explorers.p':"These aren't screenshots — drag them, type into them, break them. Pick a function, then watch the definitions from the textbook stop being definitions.",
        'home.deriv.title':'📐 Derivative &amp; Tangent Explorer',
        'home.deriv.canvas-aria':'A curve with a draggable point, its tangent line, and a secant line that converges to the tangent as h approaches zero',
        'home.deriv.caption':'Sampled points across the current view: the curve, its tangent line at a, and the secant line through a and a+h',
        'home.deriv.th-tangent':'tangent y','home.deriv.th-secant':'secant y',
        'home.deriv.lbl-point':'point','home.deriv.aria-a':'Value of a',
        'home.deriv.lbl-secant':'secant offset','home.deriv.aria-h':'Secant offset h',
        'home.deriv.hint-secant':'(drag to 0 to watch the secant become the tangent)',
        'home.deriv.readout-secant':'secant slope (h ≠ 0)','home.deriv.readout-deriv':'f′(a) — exact derivative',
        'home.riemann.title':'∫ Riemann Sum &amp; Definite Integral Explorer',
        'home.riemann.canvas-aria':'A curve over an interval, approximated by rectangles or trapezoids whose count and rule can be changed',
        'home.riemann.caption':"Every subinterval of the current partition: its bounds, the sample point the current rule uses, the height sampled there, and that shape's area",
        'home.riemann.th-sample':'sample x*','home.riemann.th-area':'area',
        'home.riemann.lbl-interval':'interval','home.riemann.hint-interval':'(drag the handles on the plot, or type below)',
        'home.riemann.aria-a':'Left endpoint a','home.riemann.aria-b':'Right endpoint b',
        'home.riemann.lbl-partitions':'partitions','home.riemann.aria-n':'Number of partitions n',
        'home.riemann.ctrl-rule':'rule','home.riemann.rule-aria':'Choose a Riemann sum rule',
        'home.riemann.rule-left':'Left','home.riemann.rule-right':'Right','home.riemann.rule-mid':'Midpoint','home.riemann.rule-trap':'Trapezoidal',
        'home.riemann.readout-approx':'approximation','home.riemann.readout-exact':'exact value ∫ f(x) dx',
        'home.exp.ctrl-function':'function','home.exp.radios-aria':'Choose a function','home.exp.reset':'↺ Reset to default',

        'home.tools.eyebrow':'How each subject works','home.tools.h2':'Four ways in.',
        'home.tools.p':'Every topic pairs the same four study tools, so students always know where to look.',
        'home.tools.n1':'01 · Read','home.tools.h3-1':'Notes &amp; theory','home.tools.p1':'Definitions and theorems set in clean typography, numbered for easy reference.',
        'home.tools.n2':'02 · See','home.tools.h3-2':'Visual explorers','home.tools.p2':'Drag a slider and watch a tangent tilt or an area converge in real time.',
        'home.tools.n3':'03 · Practice','home.tools.h3-3':'Problems &amp; solutions','home.tools.p3':'Graded problem sets with full worked solutions hidden until you want them.',
        'home.tools.n4':'04 · Keep','home.tools.h3-4':'Downloads','home.tools.p4':'Print a clean PDF packet, or request a native Word version with editable equations.',

        'home.deep.eyebrow':'A sample of the rigor','home.deep.h2':'Three ideas, done properly.',
        'home.deep.p':'Every chapter on ClipSAT follows this same shape — definition, theorem, proof, worked example — not just answers.',
        'home.deep.copy-latex':'📋 Copy LaTeX','home.deep.proof-label':'Proof','home.deep.example-label':'Worked example','home.deep.remark-label':'◆ Remark',
        'home.deep.h3-1':'1 · The Fundamental Theorem of Calculus',
        'home.deep.def1-label':'● Definition — Antiderivative',
        'home.deep.def1-body':'A function \\( F \\) is an <strong>antiderivative</strong> of \\( f \\) on an interval if \\( F\'(x)=f(x) \\) for every \\( x \\) in that interval.',
        'home.deep.thm1-label':'▲ Theorem — Fundamental Theorem of Calculus (evaluation form)',
        'home.deep.thm1-body':'If \\( f \\) is continuous on \\( [a,b] \\) and \\( F \\) is <em>any</em> antiderivative of \\( f \\), then \\[ \\int_a^b f(x)\\,dx = F(b)-F(a). \\]',
        'home.deep.pf1-body':"Let \\( G(x)=\\int_a^x f(t)\\,dt \\). The theorem's first part (not restated here) gives \\( G'(x)=f(x) \\), so \\( G \\) is also an antiderivative of \\( f \\). Two antiderivatives of the same function differ by a constant, so \\( F(x)=G(x)+C \\) for some \\( C \\). Then \\[ F(b)-F(a) = \\big(G(b)+C\\big)-\\big(G(a)+C\\big) = G(b)-G(a) = \\int_a^b f(t)\\,dt - \\int_a^a f(t)\\,dt = \\int_a^b f(t)\\,dt, \\] since \\( \\int_a^a f(t)\\,dt=0 \\).",
        'home.deep.ex1-body':'Evaluate \\( \\displaystyle\\int_1^3 (3x^2-1)\\,dx \\). An antiderivative of \\( 3x^2-1 \\) is \\( F(x)=x^3-x \\). So the integral equals \\[ F(3)-F(1) = (27-3)-(1-1) = 24-0 = 24. \\]',
        'home.deep.rmk1-body':'This is exactly what the Riemann Sum explorer above is showing you converge to as \\( n\\to\\infty \\) — and \\( F\'(x)=f(x) \\) is exactly the tangent-slope statement from the Derivative explorer, run in reverse.',
        'home.deep.h3-2':'2 · Completing the Square &amp; the Quadratic Formula',
        'home.deep.def2-label':'● Definition — Perfect-square trinomial',
        'home.deep.def2-body':'For a real number \\( p \\), the trinomial \\( x^2+2px+p^2 \\) factors as \\( (x+p)^2 \\). "Completing the square" means adding the right constant to a quadratic expression so it takes this form.',
        'home.deep.thm2-label':'▲ Theorem — The Quadratic Formula',
        'home.deep.thm2-body':'For \\( a\\neq 0 \\), the solutions of \\( ax^2+bx+c=0 \\) are \\[ x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}. \\]',
        'home.deep.pf2-body':'Divide by \\( a \\): \\( x^2+\\tfrac{b}{a}x+\\tfrac{c}{a}=0 \\), so \\( x^2+\\tfrac{b}{a}x=-\\tfrac{c}{a} \\). Add \\( \\left(\\tfrac{b}{2a}\\right)^2 \\) to both sides to complete the square on the left: \\[ x^2+\\frac{b}{a}x+\\left(\\frac{b}{2a}\\right)^2 = \\left(\\frac{b}{2a}\\right)^2-\\frac{c}{a}. \\] The left side is \\( \\left(x+\\tfrac{b}{2a}\\right)^2 \\); the right side simplifies to \\( \\tfrac{b^2-4ac}{4a^2} \\). Taking square roots, \\( x+\\tfrac{b}{2a} = \\pm\\tfrac{\\sqrt{b^2-4ac}}{2a} \\), so \\( x = \\tfrac{-b\\pm\\sqrt{b^2-4ac}}{2a} \\).',
        'home.deep.ex2-body':'Solve \\( 2x^2+8x-10=0 \\) by completing the square. Divide by 2: \\( x^2+4x-5=0 \\Rightarrow x^2+4x=5 \\). Add \\( 2^2=4 \\): \\( x^2+4x+4=9 \\Rightarrow (x+2)^2=9 \\Rightarrow x+2=\\pm3 \\Rightarrow x=1 \\) or \\( x=-5 \\).',
        'home.deep.rmk2-body':'The quantity under the root, \\( b^2-4ac \\), is the <strong>discriminant</strong>: positive gives two real roots, zero gives one repeated root, negative gives two complex roots.',
        'home.deep.h3-3':'3 · The Unit Circle &amp; Exact Trigonometric Values',
        'home.deep.def3-label':'● Definition — Sine and cosine on the unit circle',
        'home.deep.def3-body':'Let \\( \\theta \\) be an angle measured counterclockwise from the positive \\( x \\)-axis, and let \\( P=(x,y) \\) be the point where its terminal side meets the unit circle \\( x^2+y^2=1 \\). Define \\( \\cos\\theta = x \\) and \\( \\sin\\theta = y \\).',
        'home.deep.thm3-label':'▲ Theorem — Pythagorean identity',
        'home.deep.thm3-body':'For every angle \\( \\theta \\), \\[ \\sin^2\\theta + \\cos^2\\theta = 1. \\]',
        'home.deep.pf3-body':'By definition, \\( P=(\\cos\\theta,\\sin\\theta) \\) lies on the unit circle, which is exactly the set of points satisfying \\( x^2+y^2=1 \\). Substituting gives \\( \\cos^2\\theta+\\sin^2\\theta=1 \\).',
        'home.deep.ex3-body':'Find the exact values of \\( \\sin\\frac{\\pi}{3} \\) and \\( \\cos\\frac{\\pi}{3} \\) (60°). A 30–60–90 triangle with hypotenuse 1 has legs \\( \\tfrac12 \\) (opposite 30°) and \\( \\tfrac{\\sqrt3}{2} \\) (opposite 60°), so \\( \\cos\\frac{\\pi}{3}=\\tfrac12 \\) and \\( \\sin\\frac{\\pi}{3}=\\tfrac{\\sqrt3}{2} \\). Check: \\( \\left(\\tfrac12\\right)^2+\\left(\\tfrac{\\sqrt3}{2}\\right)^2=\\tfrac14+\\tfrac34=1 \\). ✓',
        'home.deep.rmk3-body':'Since adding a full turn returns \\( P \\) to the same point, \\( \\sin(\\theta+2\\pi)=\\sin\\theta \\) and \\( \\cos(\\theta+2\\pi)=\\cos\\theta \\) — both functions are periodic with period \\( 2\\pi \\).',

        'home.res.eyebrow':'Resources &amp; downloads','home.res.h2':'Take it with you.',
        'home.res.p':'Everything below is real and working today — not a roadmap.',
        'home.res.h3-1':'Printable PDF packets','home.res.p1':'Every chapter exports a clean, print-ready packet with the ClipSAT letterhead, ready for offline review.',
        'home.res.h3-2':'Native Word exports','home.res.p2':'Download a .docx version with real, editable equations — not images or plain-text LaTeX.',
        'home.res.h3-3':'Formula quick-reference','home.res.p3':'A collapsible sidebar surfaces the formulas for whichever chapter is open, so you never lose your place.',
        'home.res.h3-4':'Timed practice sets','home.res.p4':'Generate an exam-length set and run it against the built-in countdown timer, same as test day.',
        'home.visitors.eyebrow':'Community',
        'home.visitors.h2':'Growing every day.',
        'home.visitors.p':'A live, public tally of visits to ClipSAT — no accounts, no cookies set by us, just a running count.',
        'home.visitors.note':'Counts one visit per browser tab, site-wide — see the <a href="/cookies/">Cookie Policy</a> for details.',

        'foot.explore':'Explore','foot.all-courses':'All courses',
        'foot.legal':'Legal','foot.contact':'Contact','foot.privacy':'Privacy Policy','foot.terms':'Terms of Service',
        'foot.cookies':'Cookie Policy','foot.rigor':'Rigor Standard','foot.free-tier':'Free-Tier Promise',
        'foot.report':'🐛 Report an error or suggestion',
        /* Contact / Privacy / Terms / Cookies pages — none of these had any
           Arabic support at all before (no data-i18n anywhere in their
           source), so the footer's language toggle silently left them in
           English even when every other page switched. EN entries here
           intentionally match the raw HTML verbatim — _applyToDOM() always
           runs the swap, in either locale, so a missing/mismatched EN
           value would blank these out on first load in English too, not
           just fail to translate. */
        'calc.page.h1':'Graphing, 3D, Scientific, Geometry & Exam-Mode Calculator',
        'calc.page.lede':'This is the real Desmos calculator, not a lookalike — the same engine the digital SAT, many AP exams, and most U.S. state tests actually hand students. Switch modes below: full Graphing, 3D, and Geometry calculators for coursework, a Scientific calculator for quick computation, or Exam Mode, a restricted skin matching what you get on test day (no images, no notes, no extra menus).',
        'calc.mode.graphing':'Graphing','calc.mode.3d':'3D','calc.mode.scientific':'Scientific','calc.mode.geometry':'Geometry','calc.mode.exam':'Exam Mode',
        'calc.openExternal':'Open in a tab','calc.loadingExam':'Loading Exam Mode…',
        'calc.presets.toggle':'Presets','calc.presets.heading':'Curriculum Presets',
        'calc.presets.info':'Select any preset to auto-switch mode and copy its equations ready to paste.',
        'calc.presets.apply':'Apply Preset','calc.presets.copy':'Copy equations',
        'calc.presets.copiedToast':'Copied {n} expressions! Paste (Ctrl+V) into Desmos.',
        'calc.presets.close':'Close presets',
        'calc.presets.cat.all':'All','calc.presets.cat.calculus':'Calculus',
        'calc.presets.cat.solid_3d':'3D Solid','calc.presets.cat.statics_dynamics':'Applied',
        'calc.presets.cat.scientific':'Scientific',
        'contact.h1':'Contact',
        'contact.lede':'For questions about ClipSAT, tutoring, or anything else',
        'contact.p1':'Stuck on a specific problem right now? The <strong>"Ask Mr. Mohamed"</strong> chat button on every page is the fastest way to get unstuck — it\'s a live AI tutor trained to walk through your exact question.',
        'contact.p2':'For everything else — tutoring, feedback, corrections, or just to say hello — reach Mr. Mohamed Abdallah directly:',
        'contact.p3':'Found a bug, a math error, or have a suggestion? Email <a href="mailto:admin@clipsat.org">admin@clipsat.org</a> — every page also has a "Report an error or suggestion" link in the footer that opens this same address.',
        'contact.p4':'WhatsApp and Telegram are the fastest way to reach Mr. Mohamed Abdallah directly, including for 1:1 tutoring inquiries. The social channels above are best for general updates and new content — replies there may take longer.',
        'privacy.h2':'Privacy Policy',
        'privacy.updated':'Last updated July 14, 2026',
        'privacy.intro':'ClipSAT is a static study site with no user accounts and no server-side database of your personal information. This page explains what little data does exist and how it\'s handled.',
        'privacy.h3-device':'What\'s stored on your device',
        'privacy.li-device1':'Progress, streaks, mistake log, and dark-mode preference are saved in your browser\'s local storage. They never leave your device and are not visible to us.',
        'privacy.li-device2':'If you use "Ask Mr. Mohamed," your questions are sent directly to a third-party AI provider to generate a reply; they are not stored on any ClipSAT server.',
        'privacy.h3-counter':'Visitor counter',
        'privacy.counter':'The home page displays a live, site-wide visit count, stored in ClipSAT\'s own Supabase project — the same optional backend used for cloud sync, described above. Each browser tab counts itself at most once per visit, by calling a small server-side function that only ever increments one shared number; no page content, device identifiers, or account information is attached to that call. As with any request made over the internet, Supabase\'s own infrastructure sees the request (including your device\'s IP address) the way any web host does, but ClipSAT\'s own code never stores or has access to that information — only the running total the function returns.',
        'privacy.h3-ads':'Advertising &amp; cookies',
        'privacy.ads':'ClipSAT may show ads served by Google and other third-party vendors. These vendors, including Google, use cookies to serve ads based on a user\'s prior visits to this or other websites. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://adssettings.google.com/" target="_blank" rel="noopener">Google Ads Settings</a>. You can also control cookies through your browser settings; disabling cookies may affect some site features.',
        'privacy.h3-forms':'Google Forms integration',
        'privacy.forms-intro':'Teachers can optionally connect a Google account to turn a ClipSAT-generated quiz or worksheet into a Google Form, with a shareable link they can post anywhere — Google Classroom, Canvas, Moodle, or any other LMS. This is entirely opt-in — nothing is sent to Google unless a teacher clicks "Connect Google Account" and approves the specific permissions requested. Key points:',
        'privacy.forms-li1':'ClipSAT requests only the permissions needed to create a Form, read its own responses, and save the question images it renders to a teacher\'s Google Drive (a permission scoped only to files ClipSAT itself creates — it cannot see or touch anything else already in that Drive). ClipSAT never reads or changes anything else in a connected Google account, and never requests access to a teacher\'s Google Classroom courses or roster.',
        'privacy.forms-li2':'Questions and answer choices containing complex math are rendered into an image (so they display correctly in Forms, which cannot show math notation) and uploaded to that teacher\'s own Google Drive, set to "anyone with the link can view" so the Form can display it. These images are not stored anywhere by ClipSAT — only in the teacher\'s own Drive.',
        'privacy.forms-li3':'This connection happens entirely in your browser. ClipSAT has no backend server, so no quiz content, response data, or access token passes through or is stored on any ClipSAT server — each Google API call is made directly from the teacher\'s browser to Google, using a token that Google itself issues and that ClipSAT never persists beyond the current browser tab.',
        'privacy.forms-li4':'Any results shown inside ClipSAT (a per-student score summary) are fetched live from Google each time the page is viewed, not stored anywhere by ClipSAT.',
        'privacy.forms-li5':'Google\'s own Privacy Policy governs how Google handles data once ClipSAT\'s requests reach it — see <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.',
        'privacy.forms-li6':'A teacher can revoke ClipSAT\'s access at any time from their <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener">Google Account permissions</a> page.',
        'privacy.h3-thirdparty':'Third-party links',
        'privacy.thirdparty':'Links to WhatsApp, Telegram, YouTube, Instagram, TikTok, Facebook, and PayPal take you to those companies\' own sites, each governed by its own privacy policy.',
        'privacy.h3-contact':'Contact',
        'privacy.contact-p':'Questions about this policy can be sent via <a href="https://wa.me/966597688647" target="_blank" rel="noopener">WhatsApp</a> or <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">Telegram</a>.',
        'terms.h2':'Terms of Service',
        'terms.updated':'Last updated July 8, 2026',
        'terms.intro':'By using ClipSAT you agree to the following.',
        'terms.h3-content':'Use of content',
        'terms.content':'Notes, explorers, and practice questions are provided for personal study. Downloaded packets may be used for your own review; please don\'t redistribute or resell them.',
        'terms.h3-guarantee':'No guarantee of results',
        'terms.guarantee':'ClipSAT is a study aid, not a guarantee of any particular exam score. Always check official curriculum documents (e.g. Cambridge, IB, College Board, Qiyas) for the authoritative syllabus.',
        'terms.h3-ai':'AI tutor',
        'terms.ai':'"Ask Mr. Mohamed" is an AI assistant, not Mr. Mohamed Abdallah himself. Double-check important steps and final answers yourself.',
        'terms.h3-contact':'Contact',
        'terms.contact-p':'Questions can be sent via <a href="https://wa.me/966597688647" target="_blank" rel="noopener">WhatsApp</a> or <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">Telegram</a>.',
        'cookies.h2':'Cookie Policy',
        'cookies.updated':'Last updated July 13, 2026',
        'cookies.intro':'ClipSAT does not set any cookies itself, and runs no advertising or analytics scripts. The one exception is a small visit counter on the home page, described below. This page explains exactly what\'s stored, using the same plain terms as the <a href="/privacy/">Privacy Policy</a>.',
        'cookies.h3-stores':'What ClipSAT itself stores',
        'cookies.stores':'Your progress, streaks, mistake log, flashcard review schedule, and dark-mode preference are saved using your browser\'s <strong>local storage</strong> — a different, more limited mechanism than cookies. This data stays on your device, is never transmitted to any ClipSAT server, and isn\'t shared with anyone. You can clear it at any time from your browser\'s settings.',
        'cookies.h3-counter':'Visitor counter',
        'cookies.counter':'The home page shows a live, site-wide visit count, read from ClipSAT\'s own Supabase project rather than a third-party badge. Each browser tab counts one visit — via a small server-side function that only ever increments a single shared number — and remembers that it already did so for the rest of that tab\'s session using <strong>session storage</strong> (cleared automatically when the tab closes; not a cookie), so navigating between pages in the same tab isn\'t counted twice. No page content, device identifiers, or account information is attached to the call itself. As with any request over the internet, the underlying network request is visible to ClipSAT\'s hosting infrastructure the way any request is, but ClipSAT\'s own code never stores or has access to that information — only the running total.',
        'cookies.h3-embeds':'Third-party embeds',
        'cookies.embeds':'Links to WhatsApp, Telegram, YouTube, Instagram, TikTok, Facebook, and PayPal take you to those companies\' own sites, each of which may set its own cookies under its own policy once you\'re there. ClipSAT doesn\'t control or receive data from those cookies.',
        'cookies.h3-changes':'If this changes',
        'cookies.changes':'If ClipSAT adds advertising or analytics in the future, this page will be updated first to describe exactly what\'s added and why, along with a way to control it, before anything goes live.',
        'cookies.h3-contact':'Contact',
        'cookies.contact-p':'Questions about this policy can be sent via <a href="https://wa.me/966597688647" target="_blank" rel="noopener">WhatsApp</a> or <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">Telegram</a>.',
        /* Qudrat ch.1 "Arithmetic & Number Sense" — Pillar 4 Scale-phase pilot,
           first chapter of actual chapter CONTENT (not just site chrome) to be
           translated. Deliberately scoped to one chapter: chapter prose/proofs
           are exam-critical and need a subject-matter reviewer before this
           pattern is applied to the rest of Qudrat/Tahsili — see roadmap. */
        'qud.arith.title':'Arithmetic & Number Sense',
        'qud.arith.intro':'The foundation: order of operations, fractions, factors and multiples, and quick estimation.',
        'qud.arith.ref-label':'▲ Reference — Number facts',
        'qud.arith.ref-body':"Follow order of operations (brackets, powers, ×÷, +−). To compare fractions, cross-multiply or use a common denominator. A number's prime factorisation reveals its factors, GCD and LCM.",
        'qud.arith.card-order-t':'Order','qud.arith.card-order-b':'brackets → powers → ×÷ → +−',
        'qud.arith.card-compare-t':'Compare','qud.arith.card-percent-t':'Percent','qud.arith.card-average-t':'Average',
        'qud.arith.ex1a-label':'Worked example 1.A',
        'qud.arith.ex1a-p1':'Which is larger, \\( \\tfrac23 \\) or \\( \\tfrac35 \\)?',
        'qud.arith.ex1a-p2':'Cross-multiply: \\( 2\\times5=10 \\) versus \\( 3\\times3=9 \\). Since \\( 10>9 \\),',
        'qud.arith.ex1b-label':'Worked example 1.B',
        'qud.arith.ex1b-p1':'Find \\( 15\\% \\) of \\( 200 \\).',
        'qud.arith.practice-label':'Practice Problem',
        'qud.arith.practice-q':'What is \\(\\dfrac{5}{6}+\\dfrac{7}{9}-\\dfrac{1}{3}\\)?',
        'qud.arith.practice-solution':'LCD\\(=18:\\quad\\dfrac{15}{18}+\\dfrac{14}{18}-\\dfrac{6}{18}=\\dfrac{23}{18}=1\\dfrac{5}{18}.\\)',

        'ix.badge.mt':'Matching','ix.mt.allMatched':'🎉 All pairs matched!',
        'ix.badge.tf':'True / False','ix.tf.trueCorrect':'✓ True — ','ix.tf.falseCorrect':'✓ False — ','ix.tf.true':'True','ix.tf.false':'False',
        'ix.badge.sb':'Step Builder','ix.sb.hintPrefix':'Hint: ','ix.sb.checkAnswers':'Check Answers',
        'ix.sb.allCorrect':'✓ All {n} steps correct!','ix.sb.someCorrect':'{ok}/{total} correct. Hints: ','ix.sb.stepN':'Step {n}: ',
        'exp.interactive':'interactive','exp.viewAsData':'📊 View as data (non-visual equivalent)',
        'exp.quantity':'quantity','exp.value':'value',

        'qud.about.title':'Test format & strategy',
        'qud.about.intro':'The General Aptitude Test (GAT — <span dir="rtl">القدرات العامة</span>, "Qudrat") is administered by Qiyas. Alongside a verbal section it has a <strong>quantitative</strong> section that measures reasoning with numbers rather than memorised content.',
        'qud.about.expect-label':'What to expect',
        'qud.about.expect-body':'Questions are multiple choice and are answered <strong>without a calculator</strong>, so speed and clean mental methods matter as much as the mathematics. The quantitative material draws on arithmetic, algebra, geometry and data — at roughly a middle- to early-secondary level — plus a distinctive <strong>quantitative-comparison</strong> question type covered in Chapter 5.',
        'qud.about.map-label':'GAT Qudrat — Quantitative Section Map',
        'qud.about.map-th-chapter':'Chapter','qud.about.map-th-topics':'Topics tested','qud.about.map-th-share':'Typical share',
        'qud.about.map-r1-ch':'1 — Arithmetic','qud.about.map-r1-tp':'Operations, fractions, LCM/GCD, estimation',
        'qud.about.map-r2-ch':'2 — Ratios & %','qud.about.map-r2-tp':'Part:whole ratios, percentage change, proportions',
        'qud.about.map-r3-ch':'3 — Algebra','qud.about.map-r3-tp':'Linear equations, systems, expansion, substitution',
        'qud.about.map-r4-ch':'4 — Geometry','qud.about.map-r4-tp':'Perimeter, area, angles, triangles, circles',
        'qud.about.map-r5-ch':'5 — QC Questions','qud.about.map-r5-tp':'Compare Quantity A vs B; 4-choice response',
        'qud.about.map-r6-ch':'6 — Sequences','qud.about.map-r6-tp':'Arithmetic/geometric nth term, visual patterns',
        'qud.about.map-r7-ch':'7 — Data & Probability','qud.about.map-r7-tp':'Mean, median, mode; table reading; basic probability',
        'qud.about.map-footer':'<strong>Format:</strong> Multiple choice, no calculator. Questions are in Arabic. Key strategy: estimate first, test special values on QC questions.',
        'qud.about.card-format-t':'Format','qud.about.card-format-v':'multiple choice',
        'qud.about.card-calc-t':'Calculator','qud.about.card-calc-v':'not permitted',
        'qud.about.card-skills-t':'Skills','qud.about.card-skills-v':'arithmetic · algebra · geometry · data',
        'qud.about.card-sig-t':'Signature','qud.about.card-sig-v':'quantitative comparisons',
        'qud.about.habits-label':'▲ Three habits that save time',
        'qud.about.habits-body':'Estimate before computing; keep fractions instead of converting to decimals where possible; and on comparison questions, test convenient values (such as \\( 0 \\), \\( 1 \\), and a negative) before committing to an answer.',
        'qud.about.practice-label':'Practice Problem',
        'qud.about.practice-q':'A student answers 36 out of 45 questions correctly. What percentage is that?',

        'qud.ratio.title':'Ratios, Proportion & Percentages',
        'qud.ratio.intro':'Ratios share a quantity in parts; percentages express change. Both appear constantly on the test, often disguised in word problems.',
        'qud.ratio.ref-label':'▲ Reference — Ratio & percent',
        'qud.ratio.ref-body':'To split a total in ratio \\( a:b \\), there are \\( a+b \\) equal parts. Percentage change is \\( \\dfrac{\\text{new}-\\text{old}}{\\text{old}}\\times100\\% \\). A rise of \\( p\\% \\) then a fall of \\( p\\% \\) does <em>not</em> return to the start.',
        'qud.ratio.exp1-intro':'Adjust the two parts of the ratio below and watch how a total of 120 divides between them.',
        'qud.ratio.exp1-et':'⊙ Explorer · Sharing in a ratio',
        'qud.ratio.exp1-aria':'A bar of total 120 split between two parts of an adjustable ratio',
        'qud.ratio.exp1-caption':'The split of the total by the current ratio',
        'qud.ratio.exp1-ctrl-a':'Part <b>a =</b>','qud.ratio.exp1-ctrl-a-aria':'Part a',
        'qud.ratio.exp1-ctrl-b':'Part <b>b =</b>','qud.ratio.exp1-ctrl-b-aria':'Part b',
        'qud.ratio.exp1-readout-a':'first share','qud.ratio.exp1-readout-b':'second share',
        'qud.ratio.exp1-note':'Each part is \\( \\tfrac{120}{a+b} \\); the shares are \\( a \\) and \\( b \\) of those parts.',
        'qud.ratio.exp2-intro':'Now fix an original value of 80 and slide the new value to read the percentage change directly.',
        'qud.ratio.exp2-et':'⊙ Explorer · Percentage change',
        'qud.ratio.exp2-aria':'Two bars comparing an original value of 80 with an adjustable new value',
        'qud.ratio.exp2-caption':'Original and new values, and the percent change',
        'qud.ratio.exp2-ctrl-pre':'New value =','qud.ratio.exp2-ctrl-post':'(original 80)','qud.ratio.exp2-ctrl-aria':'New value',
        'qud.ratio.exp2-readout':'percentage change',
        'qud.ratio.exp2-note':'\\( \\dfrac{\\text{new}-80}{80}\\times100\\% \\). Equal bars mean \\( 0\\% \\) change.',
        'qud.ratio.card-share-t':'Share','qud.ratio.card-pctchange-t':'% change','qud.ratio.card-increase-t':'Increase','qud.ratio.card-decrease-t':'Decrease',
        'qud.ratio.ex2a-label':'Worked example 2.A',
        'qud.ratio.ex2a-p1':'Share \\( 150 \\) in the ratio \\( 2:3 \\).',
        'qud.ratio.ex2a-p2':'Five parts, each \\( 30 \\):',
        'qud.ratio.ex2b-label':'Worked example 2.B',
        'qud.ratio.ex2b-p1':'A price of \\( 100 \\) rises \\( 10\\% \\), then falls \\( 10\\% \\). Find the final price.',
        'qud.ratio.practice-label':'Practice Problem',
        'qud.ratio.practice-q':'A class has boys to girls in the ratio 3:5. If there are 40 girls, how many students in total?',
        'qud.ratio.practice-solution':'Total parts\\(=3+5=8.\\quad\\)Total students\\(=8\\times8=64.\\)',

        'qud.algebra.title':'Algebra Essentials',
        'qud.algebra.intro':'Linear equations, simple systems, expansion and substitution — the algebra that the quantitative section relies on.',
        'qud.algebra.ref-label':'▲ Reference — Working with unknowns',
        'qud.algebra.ref-body':'Solve a linear equation by isolating the variable. A system of two equations can be solved by elimination or substitution. Expand \\( (x+a)(x+b)=x^2+(a+b)x+ab \\).',
        'qud.algebra.card-linear-t':'Linear','qud.algebra.card-expand-t':'Expand',
        'qud.algebra.card-system-t':'System','qud.algebra.card-system-v':'eliminate or substitute',
        'qud.algebra.card-powers-t':'Powers',
        'qud.algebra.ex3a-label':'Worked example 3.A',
        'qud.algebra.ex3a-p1':'Solve \\( 2x+5=17 \\).',
        'qud.algebra.ex3b-label':'Worked example 3.B',
        'qud.algebra.ex3b-p1':'If \\( x+y=10 \\) and \\( x-y=4 \\), find \\( x \\).',
        'qud.algebra.ex3b-p2':'Add the equations: \\( 2x=14 \\).',
        'qud.algebra.practice-label':'Practice Problem',
        'qud.algebra.practice-q':'Solve: \\(2x+y=11\\) and \\(x-y=1.\\)',
        'qud.algebra.practice-solution1':'Add: \\(3x=12\\Rightarrow x=4.\\)',

        'rail.chapters':'Chapters','rail.practiceSet':'Practice set','rail.testGenerator':'Test generator','rail.downloads':'Downloads',
        'qud.rail.ratio':'Ratios & Percentages','qud.rail.geometry':'Geometry & Measurement',
        'qud.rail.compare':'Quantitative Comparisons','qud.rail.patterns':'Sequences & Patterns',
        'qud.rail.data':'Data & Probability','qud.rail.word':'Word Problems & Reasoning',
        'tah.rail.algebra':'Algebra & Equations','tah.rail.functions':'Functions',
        'tah.rail.sequences':'Sequences & Series','tah.rail.trig':'Trigonometry',
        'tah.rail.geometry':'Geometry & Coordinates','tah.rail.calc1':'Limits & Derivatives',
        'tah.rail.calc2':'Integration & Applications','tah.rail.explog':'Exponentials & Logarithms',
        'tah.rail.stats':'Statistics & Probability',

        'qud.geo.intro':'Angles, triangles, area, perimeter and volume — applied quickly, usually without a calculator.',
        'qud.geo.ref-label':'▲ Reference — Shapes & space',
        'qud.geo.ref-body':'Triangle angles sum to \\( 180^{\\circ} \\); a quadrilateral to \\( 360^{\\circ} \\). Pythagoras: \\( a^2+b^2=c^2 \\). Circle area \\( \\pi r^2 \\), circumference \\( 2\\pi r \\).',
        'qud.geo.card-triangle-t':'Triangle','qud.geo.card-triangle-v':'angles',
        'qud.geo.card-rect-t':'Rectangle','qud.geo.card-circle-t':'Circle','qud.geo.card-pyth-t':'Pythagoras',
        'qud.geo.ex4a-label':'Worked example 4.A',
        'qud.geo.ex4a-p1':'A right triangle has legs \\( 6 \\) and \\( 8 \\). Find the hypotenuse.',
        'qud.geo.ex4b-label':'Worked example 4.B',
        'qud.geo.ex4b-p1':'Find the area of a circle with \\( r=7 \\), taking \\( \\pi=\\tfrac{22}{7} \\).',
        'qud.geo.practice-label':'Practice Problem',
        'qud.geo.practice-q':'A rectangle has length \\((2x+3)\\) cm and width \\((x+1)\\) cm with perimeter 38 cm. Find the area.',
        'qud.geo.practice-solution2':'Length\\(=13\\) cm, Width\\(=6\\) cm. Area\\(=78\\) cm\\(^2.\\)',

        'qud.compare.intro':'The question type most associated with Qudrat: two quantities, <strong>A</strong> and <strong>B</strong>, and a single decision to make.',
        'qud.compare.def-label':'● The four responses',
        'qud.compare.def-body':'Choose: <strong>A &gt; B</strong>, <strong>A &lt; B</strong>, <strong>A = B</strong>, or <strong>cannot be determined</strong> — the last when the relationship changes depending on unknown values. Always test convenient numbers before deciding.',
        'qud.compare.exp-intro':'Here \\( A=2x \\) and \\( B=x+3 \\). Slide \\( x \\): notice the order of A and B <em>flips</em>, so with \\( x \\) unknown the honest answer is "cannot be determined".',
        'qud.compare.exp-et':'⊙ Explorer · A vs B',
        'qud.compare.exp-aria':'A number line comparing quantity A equals 2x with quantity B equals x plus 3',
        'qud.compare.exp-caption':'Quantity A and B at the current x, and how the relation changes across x',
        'qud.compare.exp-th-relation':'relation',
        'qud.compare.exp-ctrl-aria':'Value of x',
        'qud.compare.exp-readout-rel':'relationship',
        'qud.compare.exp-note':'They are equal at \\( x=3 \\); to the left \\( B \\) leads, to the right \\( A \\) leads.',
        'qud.compare.ex5a-label':'Worked example 5.A',
        'qud.compare.ex5a-p1':'<strong>A:</strong> \\( 25\\% \\) of \\( 80 \\). &nbsp; <strong>B:</strong> \\( 20 \\). Compare.',
        'qud.compare.ex5a-p2':'\\( 25\\% \\) of \\( 80=20 \\), so',
        'qud.compare.ex5b-label':'Worked example 5.B',
        'qud.compare.ex5b-p1':'<strong>A:</strong> \\( x \\). &nbsp; <strong>B:</strong> \\( x^{2} \\), for a real number \\( x \\). Compare.',
        'qud.compare.ex5b-p2':'If \\( x=\\tfrac12 \\) then \\( B&lt;A \\); if \\( x=2 \\) then \\( B&gt;A \\). Therefore',
        'qud.compare.strategy-label':'▲ Quantitative comparison strategy',
        'qud.compare.strategy-body':'Each QC question gives two quantities, A and B. You choose: A&gt;B, B&gt;A, A=B, or cannot be determined. Plug in special values (0, 1, −1, fractions) to test.',
        'qud.compare.card-s1-t':'Strategy 1','qud.compare.card-s1-v':'Simplify both columns algebraically before comparing',
        'qud.compare.card-s2-t':'Strategy 2','qud.compare.card-s2-v':'Plug in 0, 1, −1, ½ to check if relationship is constant',
        'qud.compare.card-s3-t':'Strategy 3','qud.compare.card-s3-v':'If a variable could make either column larger: "cannot determine"',
        'qud.compare.card-tip-t':'Geometry tip','qud.compare.card-tip-v':'Draw a diagram; do not assume figures are to scale',
        'qud.compare.ex-generic-label':'Worked example',
        'qud.compare.ex-generic-p1':'Column A: \\( x^2 \\). Column B: \\( x \\). Compare.',
        'qud.compare.ex-generic-p2':'If \\( x=2 \\): \\( 4&gt;2 \\). If \\( x=\\frac{1}{2} \\): \\( \\frac{1}{4}&lt;\\frac{1}{2} \\). If \\( x=0 \\): equal. → Cannot be determined.',
        'qud.compare.practice-label':'Practice Problem',
        'qud.compare.practice-q':'<strong>Quantity A:</strong> \\((x-3)^2\\) &nbsp; <strong>Quantity B:</strong> \\(x^2-6x+9\\) for any real \\(x\\). Compare.',
        'qud.compare.practice-solution1':'Expand A: \\((x-3)^2=x^2-6x+9.\\)',
        'qud.compare.practice-solution2':'<strong>A = B</strong> (always).'
      },
      ar: {
        'nav.home':'الرئيسية','nav.mistakes':'الأخطاء','nav.whats-new':'الجديد؟',
        'quiz.generate':'إنشاء اختبار','quiz.level':'المستوى','quiz.count':'عدد الأسئلة',
        'quiz.chapterQuiz':'اختبار الفصل',
        'quiz.mixed':'مختلط','quiz.easy':'سهل','quiz.medium':'متوسط','quiz.hard':'صعب',
        'ix.head':'تدريب تفاعلي','ix.badge.qc':'فحص سريع','ix.badge.sr':'مثال محلول','ix.badge.fn':'مستكشف',
        'ix.tryAgain':'حاول مرة أخرى','ix.correct':'✓ إجابة صحيحة! ','ix.incorrect':'✗ ليست صحيحة تمامًا. ',
        'ix.sr.showFirst':'إظهار الخطوة الأولى ◂','ix.sr.showNext':'إظهار الخطوة التالية ◂ ({n}/{m})','ix.sr.restart':'↺ إعادة',
        'mistake.empty':'🎉 لا أخطاء حتى الآن! أحسنت.',
        'mistake.quiz-me':'🔁 اختبرني على أخطائي','mistake.clear':'🗑 مسح الكل',
        'mistake.explain':'🤖 اشرح لي',
        'daily.goal-met':'✓ تحقق الهدف!','daily.streak':'سلسلة {n} يوم',
        'weak.heading':'⚠ مجالات تحتاج مراجعة','weak.quiz-all':'🔁 اختبرني على كل الأخطاء',
        'teacher.on':'📐 وضع المعلم مفعّل','teacher.pdf':'📄 PDF','teacher.word':'📝 Word','teacher.off':'✕ إيقاف',
        'solution.show':'عرض الحل','solution.hide':'إخفاء الحل',
        'search.placeholder':'ابحث عن موضوع…',
        'nav.progress':'التقدم','nav.teacher':'المعلم','nav.support':'ادعم الموقع',
        'nav.calculator':'الآلة الحاسبة','nav.more':'المزيد',
        'nav.whats-new-label':'الجديد',
        'hero.h1':'رياضيات <span class="q1">تراها</span> —<br>مصمَّمة <span class="q2">للامتحان</span>.',
        'hero.lede':'يحوّل ClipSAT كل موضوع إلى شيء تشاهده يتحرك: ملاحظات واضحة، رسوم تفاعلية حية، حلول مشروحة، وملفات قابلة للطباعة. جميع المسارات الـ٢١ متاحة الآن — اختر مسارك أدناه.',
        'hero.cta-calc':'ابدأ بالتفاضل والتكامل <span class="arr">←</span>',
        'hero.cta-algebra':'استكشف الجبر',
        'hero.fig-title':'معاينة التفاضل والتكامل · اسحب النقطة',
        'hero.chip-slope':'الميل','hero.chip-area':'المساحة',
        'hero.toggle-area':'إظهار المساحة','hero.toggle-tan':'إظهار المماس',
        'hero.fig-hint':'الخط النيلي هو المشتقة · والمنطقة الكهرمانية هي التكامل',

        'home.egypt.link-aria':'زيارة ClipSAT لمصر (يفتح في تبويب جديد)',
        'home.egypt.flag-aria':'علم مصر',
        'home.egypt.for-egypt':'لمصر',
        'home.egypt.eyebrow':'موقع شقيق',
        'home.egypt.h2':'هل تدرس المنهج الوطني المصري؟',
        'home.egypt.p':'ClipSAT لمصر هو موقع شقيق مصمَّم لطلاب منهج الرياضيات الوطني في مصر — بنفس أسلوب ClipSAT: اقرأ، شاهد، تدرّب — مصمَّم خصيصًا لمصر.',
        'home.egypt.cta':'زيارة ClipSAT لمصر',

        'home.about.eyebrow':'عن المعلم',
        'home.about.h2':'علّمه شخصٌ أمضى مسيرته المهنية يرى الطلاب يتعثرون في الأماكن نفسها تمامًا.',
        'home.about.p1':'يحمل الأستاذ محمد عبدالله <strong>بكالوريوس في الرياضيات والتربية</strong> من كلية التربية، جامعة الإسكندرية، مصر، و<strong>دبلوم في تعليم الرياضيات</strong> من جامعة ماريلاند، مقاطعة بالتيمور (UMBC)، الولايات المتحدة، حيث أتم برنامج معلمي وعلماء الرياضيات والعلوم المصري. وهو معلم معتمد من جوجل ومبتكر معتمد من مايكروسوفت، يحمل رخصة التدريس السعودية في الرياضيات بنسبة 96%، وفاز عام 2023 بأول شهادة عالمية في الرياضيات للبالغين تُمنح لمصري.',
        'home.about.p2':'على مدار أكثر من <strong>33 عامًا</strong> في تدريس الرياضيات — بما في ذلك منصب رئيس قسم الرياضيات في مدرسة آسيا الدولية بالخبر، وحاليًا في مدرسة إيدوجيتس الدولية بجدة — عبر مناهج IGCSE وAS/A-Level من كامبريدج، وAP Calculus AB/BC وAP Statistics، والاختبار الرقمي SAT وACT، والاختبارات الوطنية السعودية GAT القدرات وSAAT التحصيلي، قاد تصميم المناهج، وتوجيه المعلمين، وبرامج التدخل القائمة على البيانات التي رفعت تحصيل الطلاب بنسبة 15%.',
        'home.about.p3':'هذا الاتساع عبر المناهج هو الميزة الحقيقية: خطأ الجبر الذي يُعثر طالب الاختبار الرقمي SAT هو نفسه الذي يُعثر طالب AP Calculus بعد عام — وتدريس كل المستويات في آنٍ واحد يجعل هذه الأنماط يصعب تفويتها.',
        'home.about.p4':'نشأ ClipSAT مباشرة من تلك الخبرة الصفّية. كل مستكشف تفاعلي على هذا الموقع وُجد لأن الشرح اللفظي لعبارة "ميل خط المماس يقترب من المشتقة" لم يكن يصل — لكن سحب نقطة ومشاهدتها تتحرك كان يصل دائمًا. الفلسفة نفسها تحكم كل مسار: اقرأ الفكرة بلغة بسيطة، شاهدها تتحرك، تدرّب عليها حتى تصبح تلقائية، ثم احتفظ بنسخة نظيفة للمراجعة قبل الامتحان.',
        'home.about.stat-years':'سنوات التدريس','home.about.stat-tracks':'مسارات امتحانية مغطاة',
        'home.about.stat-questions':'سؤال تدريبي','home.about.stat-explorers':'مستكشف تفاعلي',
        'home.about.credentials':'بكالوريوس في الرياضيات والتربية، جامعة الإسكندرية · دبلوم في تعليم الرياضيات، UMBC (الولايات المتحدة) · معلم معتمد من جوجل · مبتكر معتمد من مايكروسوفت. المناهج التي يغطيها ClipSAT: IGCSE · A-Level من كامبريدج · IB (SL/HL) · AP · الاختبار الرقمي SAT وACT · القدرات والتحصيلي. <a href="https://wa.me/966597688647" target="_blank" rel="noopener">تدريس فردي عبر واتساب ←</a>',

        'home.results.eyebrow':'نتائج حقيقية',
        'home.results.h2':'طلاب عملوا على المادة الدراسية، لا مجرد مشاهدتها.',
        'home.results.p':'عيّنة من نتائج حقيقية من فصل الأستاذ محمد، بالأسماء الأولى فقط.',
        'home.results.card1-label':'في اختبار AP',
        'home.results.card1-names':'عمر، سلمى، نور، ياسمين، محمد، وغيرهم — درجة 5 كاملة في AP Calculus AB/BC.',
        'home.results.card2-label':'رياضيات كامبريدج',
        'home.results.card2-names':'ناردين، يوسف، نور، هيا، وغيرهم — تقديرات A وA* في IGCSE وAS-Level وA2-Level.',
        'home.results.card3-label':'في اختبار ACT للرياضيات',
        'home.results.card3-names':'محمد وشيرين — الدرجة الكاملة في ACT للرياضيات.',

        'home.testi.eyebrow':'آراء','home.testi.h2':'ماذا تقول العائلات.',
        'home.testi.p1':'الأستاذ محمد عبدالله معلّم رياضيات استثنائي يحقق نتائج متميزة. تحت إشرافه، حقق طلابنا نجاحًا لافتًا: عمر، سلمى، نور، ياسمين، محمد، والعديد غيرهم حصلوا على الدرجة الكاملة 5 في AP Calculus AB/BC. ناردين، يوسف، نور، هيا، وقائمة طويلة من آخرين حصلوا على تقديرات A وA* في رياضيات IGCSE (مستويي AS وA2). محمد وشيرين حققا نتيجة مبهرة 36 في ACT للرياضيات.',
        'home.testi.p2':'أسلوب الأستاذ محمد في التدريس واضح وجذاب وفعّال للغاية. فهو يبسّط مواضيع معقدة كالتفاضل والتكامل وحساب المثلثات والمعادلات التربيعية والتكاملات إلى مفاهيم مفهومة، ويقدّم أوراق مراجعة ممتازة، ومسائل تدريبية، واستراتيجيات امتحانية مركّزة. ساعد تفانيه وخبرته أبناءنا ليس فقط على إتقان المادة، بل أيضًا على بناء الثقة اللازمة للقبول في أرقى الجامعات.',
        'home.testi.p3':'نوصي بشدة بالأستاذ محمد عبدالله لأي طالب يطمح للتميّز في رياضيات IGCSE أو AP أو ACT. إنه حقًا أحد أفضل معلمي الرياضيات في جدة!',
        'home.testi.attr':'— أولياء أمور وطلاب راضون، مدارس جدة الدولية',

        'home.catalog.eyebrow':'دليل المقررات','home.catalog.h2':'كل مسار يغطيه ClipSAT.',
        'home.catalog.p':'كل المسارات الـ٢٣ أدناه تشترك في البنية نفسها — ملاحظات، مستكشفات بصرية، تدريب، وملفات للتحميل — وجميعها متاحة اليوم.',
        'home.cat.calculus.ct':'رياضيات · التفاضل والتكامل','home.cat.calculus.h3':'التفاضل والتكامل',
        'home.cat.calculus.p':'النهايات، المشتقات، التكاملات، والمبرهنة الأساسية للتفاضل والتكامل — مع مستكشفات تفاعلية للمماس والمساحة.',
        'home.cat.algebra.ct':'رياضيات · الأساسيات','home.cat.algebra.h3':'الجبر',
        'home.cat.algebra.p':'المعادلات الخطية، التربيعية، الأسس وكثيرات الحدود — مع مستكشفات حية للخط المستقيم والقطع المكافئ.',
        'home.cat.alg2.ct':'رياضيات · الجبر 2','home.cat.alg2.h3':'الجبر 2',
        'home.cat.alg2.p':'الدوال، المعادلات التربيعية والأعداد المركّبة، كثيرات الحدود، الكسور الجبرية، الأسي واللوغاريتمي، الجذور، المتسلسلات والقطوع المخروطية — أحد عشر فصلاً، ثلاثة مستكشفات، 50 مسألة.',
        'home.cat.geo.ct':'رياضيات · الهندسة الإقليدية','home.cat.geo.h3':'الهندسة',
        'home.cat.geo.p':'البرهان والاستدلال، الخطوط المتوازية، المثلثات والتطابق، التشابه، حساب مثلثات المثلث القائم، الدوائر، والمساحة والحجم. أحد عشر فصلاً، ثلاثة مستكشفات، 50 مسألة.',
        'home.cat.precalc.ct':'المرحلة الثانوية · ما قبل التفاضل والتكامل','home.cat.precalc.h3':'ما قبل التفاضل والتكامل',
        'home.cat.precalc.p':'حساب المثلثات، القطوع المخروطية، المتجهات، الإحداثيات القطبية والبارامترية، والنهايات — الجسر الأساسي من الجبر 2 إلى التفاضل والتكامل.',
        'home.cat.linalg.ct':'جامعي · الجبر الخطي','home.cat.linalg.h3':'الجبر الخطي',
        'home.cat.linalg.p':'المتجهات، أنظمة المعادلات، المصفوفات والمحدّدات — كل مبرهنة مُبرهنة بالكامل. أربعة فصول، الأساس اللاحق للتفاضل والتكامل في الهندسة وعلوم الحاسب.',
        'home.cat.mvc.ct':'جامعي · تفاضل وتكامل متعدد المتغيرات','home.cat.mvc.h3':'التفاضل والتكامل متعدد المتغيرات',
        'home.cat.mvc.p':'المشتقات الجزئية، التدرّجات، الأمثلية والتكاملات المزدوجة — كل مبرهنة مُبرهنة بالكامل. أربعة فصول، مبنية على متجهات ومحدّدات الجبر الخطي.',
        'home.cat.odes.ct':'جامعي · المعادلات التفاضلية','home.cat.odes.h3':'المعادلات التفاضلية',
        'home.cat.odes.p':'المعادلات من الرتبة الأولى والمعادلات القابلة للفصل، مُبرهنة من قاعدة السلسلة لا مجرد مذكورة — الفصل الأول من مسار متنامٍ.',
        'home.cat.apab.ct':'مجلس الكلية · AP','home.cat.apab.h3':'AP Calculus AB',
        'home.cat.apab.p':'الوحدات 1–8 بعمق AP — من النهايات إلى التكاملات، مع أسئلة اختيار من متعدد وإجابات مقالية بأسلوب الامتحان.',
        'home.cat.apbc.ct':'مجلس الكلية · AP','home.cat.apbc.h3':'AP Calculus BC',
        'home.cat.apbc.p':'كل محتوى AB بالإضافة إلى المتسلسلات، المنحنيات البارامترية والقطبية، وتقنيات تكامل متقدمة.',
        'home.cat.appc.ct':'AP · ما قبل التفاضل والتكامل','home.cat.appc.h3':'AP Precalculus',
        'home.cat.appc.p':'مقرر College Board لما قبل التفاضل والتكامل: الدوال كثيرة الحدود، الكسرية، الأسية، اللوغاريتمية، المثلثية والجيبية — مع تحضير كامل للامتحان.',
        'home.cat.apstats.ct':'AP · الإحصاء','home.cat.apstats.h3':'AP Statistics',
        'home.cat.apstats.p':'استكشاف البيانات، توزيعات المعاينة، الاحتمالات، الاستدلال — فترات الثقة، اختبارات الفرضيات، الانحدار — تغطية كاملة لمنهج College Board.',
        'home.cat.igcse.ct':'كامبريدج · IGCSE 0580','home.cat.igcse.h3':'IGCSE 0580',
        'home.cat.igcse.p':'رياضيات IGCSE من كامبريدج — المستويين الأساسي والموسّع. عشرة فصول، ثلاثة مستكشفات، وبنك أسئلة بأسلوب الورقة الامتحانية من 50 سؤالاً.',
        'home.cat.aslevel.ct':'كامبريدج · AS Level','home.cat.aslevel.h3':'AS Level',
        'home.cat.aslevel.p':'الرياضيات البحتة 1 مع أساسيات حساب المثلثات والتفاضل والتكامل والإحصاء. أحد عشر فصلاً، ثلاثة مستكشفات، 50 مسألة.',
        'home.cat.a2level.ct':'كامبريدج · A2 Level','home.cat.a2level.h3':'A2 Level',
        'home.cat.a2level.p':'البحتة 2 و3 — الدوال، اللوغاريتمات، حساب المثلثات المتقدم، التفاضل والتكامل، المتسلسلات والمتجهات، لإكمال الـ A Level كاملاً. أحد عشر فصلاً، ثلاثة مستكشفات، 50 مسألة.',
        'home.cat.ibsl.ct':'IB · رياضيات SL','home.cat.ibsl.h3':'IB رياضيات SL (AA/AI)',
        'home.cat.ibsl.p':'رياضيات IB المستوى المعياري (SL)، تغطي الجبر والدوال وحساب المثلثات والإحصاء والتفاضل والتكامل لكل من مسارَي Analysis &amp; Approaches وApplications &amp; Interpretation.',
        'home.cat.ibhl.ct':'IB · رياضيات HL','home.cat.ibhl.h3':'IB رياضيات HL (AA/AI)',
        'home.cat.ibhl.p':'رياضيات IB المستوى العالي (HL) — كل مواضيع SL بالإضافة إلى الأعداد المركّبة، البرهان، المتجهات ثلاثية الأبعاد، التفاضل والتكامل المتقدم، المعادلات التفاضلية، و(في AI HL) المصفوفات ونظرية الجرافات.',
        'home.cat.sat.ct':'مجلس الكلية · SAT الرقمي','home.cat.sat.h3':'SAT الرقمي للرياضيات',
        'home.cat.sat.p':'المجالات الرياضية الأربعة — الجبر، الرياضيات المتقدمة، حل المسائل وتحليل البيانات، والهندسة وحساب المثلثات — مع استراتيجيات Desmos للاختبار التكيفي. ثمانية فصول، ثلاثة مستكشفات، 50 مسألة.',
        'home.cat.act.ct':'ACT · الرياضيات','home.cat.act.h3':'ACT للرياضيات',
        'home.cat.act.p':'كل الأسئلة الـ60 — من ما قبل الجبر إلى حساب المثلثات، مع استراتيجيات لإدارة الوقت واستخدام الآلة الحاسبة. ثمانية فصول، ثلاثة مستكشفات، 50 مسألة.',
        'home.cat.act2.ct':'ACT · اختبار المواد','home.cat.act2.h3':'ACT 2 للرياضيات - المستوى الأول',
        'home.cat.act2l2.ct':'ACT · اختبار المواد','home.cat.act2l2.h3':'ACT 2 للرياضيات - المستوى الثاني',
        'home.cat.act2.p':'تدريب معمّق على ACT — الجبر المتقدم، الدوال، الهندسة الإحداثية وحساب المثلثات، مع استراتيجية الأقسام الموقوتة وتدريبات كاملة الطول.',
        'home.cat.est.ct':'مصر · EST I','home.cat.est.h3':'EST للرياضيات',
        'home.cat.est.p':'الاختبار الإلكتروني المدرسي (EST) — الجبر، الدوال، الهندسة وتحليل البيانات، لطلاب الدبلوما الأمريكية الراغبين في القبول الجامعي المصري.',
        'home.cat.est2.ct':'EST II · المستوى الأول','home.cat.est2.h3':'EST 2 للرياضيات - المستوى الأول',
        'home.cat.est2l2.ct':'EST II · المستوى الثاني','home.cat.est2l2.h3':'EST 2 للرياضيات - المستوى الثاني',
        'home.cat.est2.p':'EST المتقدم — محتوى موسَّع يغطي حساب المثلثات، المتتاليات، اللوغاريتمات ومقدمة في التفاضل والتكامل لورقة المستوى الثاني.',
        'home.cat.qudrat.ct':'قياس · القدرات العامة (GAT)','home.cat.qudrat.h3':'القدرات العامة GAT للرياضيات',
        'home.cat.qudrat.p':'القسم الكمّي من اختبار القدرات العامة — الحساب، النسب والمئويات، الجبر، الهندسة، المتتاليات، البيانات، وأسئلة المقارنة الكمّية المميّزة. ثمانية فصول، ثلاثة مستكشفات، 50 مسألة.',
        'home.cat.tahsili.ct':'قياس · التحصيلي (SAAT)','home.cat.tahsili.h3':'التحصيلي SAAT للرياضيات',
        'home.cat.tahsili.p':'رياضيات اختبار التحصيلي — جبر المرحلة الثانوية، الدوال، المتتاليات، حساب المثلثات، الهندسة الإحداثية ومقدمة في التفاضل والتكامل، مطابقة للاختبار. تسعة فصول، ثلاثة مستكشفات، 50 مسألة.',

        'home.explorers.eyebrow':'شاهدها قبل أن تحلّها','home.explorers.h2':'أداتان، لا صورتان.',
        'home.explorers.p':'هذه ليست لقطات شاشة — اسحبها، اكتب فيها، جرّب كسرها. اختر دالة، وشاهد تعريفات الكتاب المدرسي تتوقف عن كونها مجرد تعريفات.',
        'home.deriv.title':'📐 مستكشف المشتقة والمماس',
        'home.deriv.canvas-aria':'منحنى مع نقطة قابلة للسحب، خط مماس لها، وخط قاطع يتقارب نحو المماس مع اقتراب h من الصفر',
        'home.deriv.caption':'نقاط مأخوذة عبر النطاق الحالي: المنحنى، خط مماسه عند a، وخط القاطع عبر a وa+h',
        'home.deriv.th-tangent':'y المماس','home.deriv.th-secant':'y القاطع',
        'home.deriv.lbl-point':'النقطة','home.deriv.aria-a':'قيمة a',
        'home.deriv.lbl-secant':'إزاحة القاطع','home.deriv.aria-h':'إزاحة القاطع h',
        'home.deriv.hint-secant':'(اسحب إلى 0 لتشاهد القاطع يصبح المماس)',
        'home.deriv.readout-secant':'ميل القاطع (h ≠ 0)','home.deriv.readout-deriv':'f′(a) — المشتقة الدقيقة',
        'home.riemann.title':'∫ مستكشف مجموع ريمان والتكامل المحدود',
        'home.riemann.canvas-aria':'منحنى على فترة، مقرَّب بمستطيلات أو أشباه منحرف يمكن تغيير عددها وقاعدتها',
        'home.riemann.caption':'كل فترة جزئية من التقسيم الحالي: حدودها، نقطة العينة التي تستخدمها القاعدة الحالية، الارتفاع المأخوذ عندها، ومساحة ذلك الشكل',
        'home.riemann.th-sample':'نقطة العينة x*','home.riemann.th-area':'المساحة',
        'home.riemann.lbl-interval':'الفترة','home.riemann.hint-interval':'(اسحب المقابض على الرسم، أو اكتب أدناه)',
        'home.riemann.aria-a':'الطرف الأيسر a','home.riemann.aria-b':'الطرف الأيمن b',
        'home.riemann.lbl-partitions':'التقسيمات','home.riemann.aria-n':'عدد التقسيمات n',
        'home.riemann.ctrl-rule':'القاعدة','home.riemann.rule-aria':'اختر قاعدة مجموع ريمان',
        'home.riemann.rule-left':'اليسار','home.riemann.rule-right':'اليمين','home.riemann.rule-mid':'نقطة المنتصف','home.riemann.rule-trap':'شبه المنحرف',
        'home.riemann.readout-approx':'التقريب','home.riemann.readout-exact':'القيمة الدقيقة ∫ f(x) dx',
        'home.exp.ctrl-function':'الدالة','home.exp.radios-aria':'اختر دالة','home.exp.reset':'↺ إعادة إلى الافتراضي',

        'home.tools.eyebrow':'كيف يعمل كل موضوع','home.tools.h2':'أربع طرق للدخول.',
        'home.tools.p':'كل موضوع يقترن بأدوات الدراسة الأربع نفسها، بحيث يعرف الطلاب دائمًا أين ينظرون.',
        'home.tools.n1':'01 · اقرأ','home.tools.h3-1':'الملاحظات والنظرية','home.tools.p1':'تعريفات ومبرهنات بخط أنيق، مرقّمة لسهولة الرجوع إليها.',
        'home.tools.n2':'02 · شاهد','home.tools.h3-2':'المستكشفات البصرية','home.tools.p2':'اسحب شريط التمرير وشاهد المماس يميل أو المساحة تتقارب في الزمن الحقيقي.',
        'home.tools.n3':'03 · تدرّب','home.tools.h3-3':'المسائل والحلول','home.tools.p3':'مجموعات مسائل متدرّجة مع حلول كاملة مخفية حتى تريد رؤيتها.',
        'home.tools.n4':'04 · احتفظ','home.tools.h3-4':'التنزيلات','home.tools.p4':'اطبع حزمة PDF نظيفة، أو اطلب نسخة Word أصلية بمعادلات قابلة للتحرير.',

        'home.deep.eyebrow':'عيّنة من الدقة','home.deep.h2':'ثلاث أفكار، معالَجة بشكل صحيح.',
        'home.deep.p':'كل فصل في ClipSAT يتبع البنية نفسها — تعريف، مبرهنة، برهان، مثال محلول — لا مجرد إجابات.',
        'home.deep.copy-latex':'📋 نسخ LaTeX','home.deep.proof-label':'البرهان','home.deep.example-label':'مثال محلول','home.deep.remark-label':'◆ ملاحظة',
        'home.deep.h3-1':'١ · المبرهنة الأساسية للتفاضل والتكامل',
        'home.deep.def1-label':'● تعريف — الدالة الأصلية',
        'home.deep.def1-body':'الدالة \\( F \\) هي <strong>دالة أصلية</strong> للدالة \\( f \\) على فترة ما إذا كان \\( F\'(x)=f(x) \\) لكل \\( x \\) في تلك الفترة.',
        'home.deep.thm1-label':'▲ مبرهنة — المبرهنة الأساسية للتفاضل والتكامل (صيغة التقييم)',
        'home.deep.thm1-body':'إذا كانت \\( f \\) متصلة على \\( [a,b] \\) وكانت \\( F \\) <em>أي</em> دالة أصلية لـ \\( f \\)، فإن \\[ \\int_a^b f(x)\\,dx = F(b)-F(a). \\]',
        'home.deep.pf1-body':'لنفرض \\( G(x)=\\int_a^x f(t)\\,dt \\). يعطي الجزء الأول من المبرهنة (غير معاد ذكره هنا) أن \\( G\'(x)=f(x) \\)، إذن \\( G \\) أيضًا دالة أصلية لـ \\( f \\). أي دالتين أصليتين لنفس الدالة تختلفان بثابت، فيكون \\( F(x)=G(x)+C \\) لثابت ما \\( C \\). إذن \\[ F(b)-F(a) = \\big(G(b)+C\\big)-\\big(G(a)+C\\big) = G(b)-G(a) = \\int_a^b f(t)\\,dt - \\int_a^a f(t)\\,dt = \\int_a^b f(t)\\,dt, \\] لأن \\( \\int_a^a f(t)\\,dt=0 \\).',
        'home.deep.ex1-body':'احسب \\( \\displaystyle\\int_1^3 (3x^2-1)\\,dx \\). إحدى الدوال الأصلية لـ \\( 3x^2-1 \\) هي \\( F(x)=x^3-x \\). إذن التكامل يساوي \\[ F(3)-F(1) = (27-3)-(1-1) = 24-0 = 24. \\]',
        'home.deep.rmk1-body':'هذا بالضبط ما يريك مستكشف مجموع ريمان أعلاه يتقارب إليه عندما \\( n\\to\\infty \\) — و\\( F\'(x)=f(x) \\) هي بالضبط عبارة ميل المماس من مستكشف المشتقة، مُشغَّلة بالعكس.',
        'home.deep.h3-2':'٢ · إكمال المربع وقانون الصيغة التربيعية',
        'home.deep.def2-label':'● تعريف — ثلاثية الحدود التربيعية الكاملة',
        'home.deep.def2-body':'لعدد حقيقي \\( p \\)، تتحلّل ثلاثية الحدود \\( x^2+2px+p^2 \\) إلى \\( (x+p)^2 \\). "إكمال المربع" يعني إضافة الثابت المناسب إلى مقدار تربيعي حتى يأخذ هذه الصورة.',
        'home.deep.thm2-label':'▲ مبرهنة — قانون الصيغة التربيعية',
        'home.deep.thm2-body':'من أجل \\( a\\neq 0 \\)، حلول المعادلة \\( ax^2+bx+c=0 \\) هي \\[ x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}. \\]',
        'home.deep.pf2-body':'اقسم على \\( a \\): \\( x^2+\\tfrac{b}{a}x+\\tfrac{c}{a}=0 \\)، إذن \\( x^2+\\tfrac{b}{a}x=-\\tfrac{c}{a} \\). أضف \\( \\left(\\tfrac{b}{2a}\\right)^2 \\) لكلا الطرفين لإكمال المربع في الطرف الأيسر: \\[ x^2+\\frac{b}{a}x+\\left(\\frac{b}{2a}\\right)^2 = \\left(\\frac{b}{2a}\\right)^2-\\frac{c}{a}. \\] الطرف الأيسر هو \\( \\left(x+\\tfrac{b}{2a}\\right)^2 \\)؛ ويُبسَّط الطرف الأيمن إلى \\( \\tfrac{b^2-4ac}{4a^2} \\). وبأخذ الجذر التربيعي، \\( x+\\tfrac{b}{2a} = \\pm\\tfrac{\\sqrt{b^2-4ac}}{2a} \\)، إذن \\( x = \\tfrac{-b\\pm\\sqrt{b^2-4ac}}{2a} \\).',
        'home.deep.ex2-body':'حل \\( 2x^2+8x-10=0 \\) بإكمال المربع. اقسم على 2: \\( x^2+4x-5=0 \\Rightarrow x^2+4x=5 \\). أضف \\( 2^2=4 \\): \\( x^2+4x+4=9 \\Rightarrow (x+2)^2=9 \\Rightarrow x+2=\\pm3 \\Rightarrow x=1 \\) أو \\( x=-5 \\).',
        'home.deep.rmk2-body':'المقدار تحت الجذر، \\( b^2-4ac \\)، يسمى <strong>المميّز</strong>: إذا كان موجبًا فهناك جذران حقيقيان، وإذا كان صفرًا فهناك جذر واحد مكرر، وإذا كان سالبًا فهناك جذران مركّبان.',
        'home.deep.h3-3':'٣ · دائرة الوحدة والقيم المثلثية الدقيقة',
        'home.deep.def3-label':'● تعريف — الجيب وجيب التمام على دائرة الوحدة',
        'home.deep.def3-body':'لتكن \\( \\theta \\) زاوية مقاسة عكس اتجاه عقارب الساعة من المحور \\( x \\) الموجب، ولتكن \\( P=(x,y) \\) النقطة التي يلتقي عندها الضلع الطرفي بدائرة الوحدة \\( x^2+y^2=1 \\). نُعرّف \\( \\cos\\theta = x \\) و\\( \\sin\\theta = y \\).',
        'home.deep.thm3-label':'▲ مبرهنة — متطابقة فيثاغورس',
        'home.deep.thm3-body':'لكل زاوية \\( \\theta \\)، \\[ \\sin^2\\theta + \\cos^2\\theta = 1. \\]',
        'home.deep.pf3-body':'بحسب التعريف، \\( P=(\\cos\\theta,\\sin\\theta) \\) تقع على دائرة الوحدة، وهي بالضبط مجموعة النقاط المحققة لـ \\( x^2+y^2=1 \\). بالتعويض نحصل على \\( \\cos^2\\theta+\\sin^2\\theta=1 \\).',
        'home.deep.ex3-body':'أوجد القيم الدقيقة لـ \\( \\sin\\frac{\\pi}{3} \\) و\\( \\cos\\frac{\\pi}{3} \\) (°60). المثلث 90-60-30 ذو الوتر 1 له ضلعان \\( \\tfrac12 \\) (مقابل °30) و\\( \\tfrac{\\sqrt3}{2} \\) (مقابل °60)، إذن \\( \\cos\\frac{\\pi}{3}=\\tfrac12 \\) و\\( \\sin\\frac{\\pi}{3}=\\tfrac{\\sqrt3}{2} \\). تحقّق: \\( \\left(\\tfrac12\\right)^2+\\left(\\tfrac{\\sqrt3}{2}\\right)^2=\\tfrac14+\\tfrac34=1 \\). ✓',
        'home.deep.rmk3-body':'بما أن إضافة دورة كاملة تُعيد \\( P \\) إلى النقطة نفسها، فإن \\( \\sin(\\theta+2\\pi)=\\sin\\theta \\) و\\( \\cos(\\theta+2\\pi)=\\cos\\theta \\) — أي أن كلتا الدالتين دوريتان بدور \\( 2\\pi \\).',

        'home.res.eyebrow':'الموارد والتنزيلات','home.res.h2':'خذها معك.',
        'home.res.p':'كل ما أدناه حقيقي ويعمل اليوم — وليس مجرد خطة مستقبلية.',
        'home.res.h3-1':'حزم PDF قابلة للطباعة','home.res.p1':'يصدّر كل فصل حزمة نظيفة جاهزة للطباعة برأسية ClipSAT، جاهزة للمراجعة دون اتصال بالإنترنت.',
        'home.res.h3-2':'تصدير Word أصلي','home.res.p2':'نزّل نسخة .docx بمعادلات حقيقية قابلة للتحرير — وليست صورًا أو نصًا خامًا بصيغة LaTeX.',
        'home.res.h3-3':'مرجع سريع للصيغ','home.res.p3':'شريط جانبي قابل للطي يعرض صيغ الفصل المفتوح حاليًا، بحيث لا تفقد مكانك أبدًا.',
        'home.res.h3-4':'مجموعات تدريب موقوتة','home.res.p4':'أنشئ مجموعة بطول الامتحان وشغّلها مع العدّاد التنازلي المدمج، تمامًا كيوم الاختبار.',
        'home.visitors.eyebrow':'مجتمعنا',
        'home.visitors.h2':'ينمو كل يوم.',
        'home.visitors.p':'عدّاد زيارات حي وعلني لـ ClipSAT — بلا حسابات، وبلا ملفات تعريف ارتباط نضعها نحن، مجرد عدّاد متزايد.',
        'home.visitors.note':'يُحتسب زيارة واحدة لكل علامة تبويب على مستوى الموقع بأكمله — راجع <a href="/cookies/">سياسة ملفات تعريف الارتباط</a> للتفاصيل.',

        'foot.explore':'استكشف','foot.all-courses':'كل المقررات',
        'foot.legal':'قانوني','foot.contact':'اتصل بنا','foot.privacy':'سياسة الخصوصية','foot.terms':'شروط الخدمة',
        'foot.cookies':'سياسة ملفات تعريف الارتباط','foot.rigor':'معيار الدقة','foot.free-tier':'وعد النسخة المجانية',
        'foot.report':'🐛 الإبلاغ عن خطأ أو اقتراح',
        'calc.page.h1':'آلة حاسبة بيانية وثلاثية الأبعاد وعلمية وهندسية ووضع اختبار',
        'calc.page.lede':'هذه هي آلة Desmos الحاسبة الحقيقية، وليست محاكاة لها — نفس المحرك الذي يُقدَّم فعليًا لطلاب اختبار SAT الرقمي، والعديد من اختبارات AP، ومعظم اختبارات الولايات الأمريكية. بدّل بين الأوضاع أدناه: آلة حاسبة بيانية كاملة وأخرى ثلاثية الأبعاد وأخرى هندسية لأعمال المقرر، آلة حاسبة علمية للحساب السريع، أو وضع الاختبار — نسخة مقيَّدة تطابق ما تحصل عليه فعليًا يوم الاختبار (بلا صور، ولا ملاحظات، ولا قوائم إضافية).',
        'calc.mode.graphing':'بياني','calc.mode.3d':'ثلاثي الأبعاد','calc.mode.scientific':'علمي','calc.mode.geometry':'هندسي','calc.mode.exam':'وضع الاختبار',
        'calc.openExternal':'فتح في تبويب','calc.loadingExam':'جارٍ تحميل وضع الاختبار…',
        'calc.presets.toggle':'نماذج','calc.presets.heading':'نماذج المنهج',
        'calc.presets.info':'اختر أي نموذج وسيتم ضبط الوضع ونسخ معادلاته تلقائياً لتلصقها في ديسموس.',
        'calc.presets.apply':'تطبيق النموذج','calc.presets.copy':'نسخ المعادلات',
        'calc.presets.copiedToast':'تم نسخ {n} معادلة إلى الحافظة! الصقها (Ctrl+V) في ديسموس.',
        'calc.presets.close':'إغلاق النماذج',
        'calc.presets.cat.all':'الكل','calc.presets.cat.calculus':'التفاضل',
        'calc.presets.cat.solid_3d':'الفراغية','calc.presets.cat.statics_dynamics':'التطبيقية',
        'calc.presets.cat.scientific':'العلمية',
        'contact.h1':'اتصل بنا',
        'contact.lede':'لأي أسئلة حول ClipSAT، أو الدروس الخصوصية، أو أي شيء آخر',
        'contact.p1':'هل تواجه صعوبة في مسألة معينة الآن؟ زر الدردشة <strong>«اسأل الأستاذ محمد»</strong> الموجود في كل صفحة هو أسرع طريقة للخروج من العالقة — إنه معلّم ذكاء اصطناعي مباشر مدرَّب على شرح سؤالك بالتحديد.',
        'contact.p2':'لأي شيء آخر — الدروس الخصوصية، الملاحظات، التصحيحات، أو لمجرد إلقاء التحية — تواصل مع الأستاذ محمد عبدالله مباشرة:',
        'contact.p3':'وجدت خطأً برمجياً، خطأً رياضياً، أو لديك اقتراح؟ راسلنا على <a href="mailto:admin@clipsat.org">admin@clipsat.org</a> — تحتوي كل صفحة أيضاً على رابط «الإبلاغ عن خطأ أو اقتراح» في التذييل يفتح نفس العنوان.',
        'contact.p4':'واتساب وتيليجرام هما أسرع وسيلة للتواصل المباشر مع الأستاذ محمد عبدالله، بما في ذلك الاستفسارات عن الدروس الخصوصية الفردية. القنوات الاجتماعية أعلاه هي الأنسب للتحديثات العامة والمحتوى الجديد — قد تستغرق الردود هناك وقتاً أطول.',
        'privacy.h2':'سياسة الخصوصية',
        'privacy.updated':'آخر تحديث: 14 يوليو 2026',
        'privacy.intro':'ClipSAT موقع دراسي ثابت بلا حسابات مستخدمين وبلا قاعدة بيانات على خادم لمعلوماتك الشخصية. توضح هذه الصفحة القدر القليل من البيانات الموجودة فعلاً وكيفية التعامل معها.',
        'privacy.h3-device':'ما الذي يُحفظ على جهازك',
        'privacy.li-device1':'يُحفظ التقدّم، وأيام الاستمرار، وسجل الأخطاء، وتفضيل الوضع الداكن في التخزين المحلي لمتصفحك. لا تغادر هذه البيانات جهازك أبداً وغير مرئية لنا.',
        'privacy.li-device2':'إذا استخدمت خاصية «اسأل الأستاذ محمد»، تُرسل أسئلتك مباشرة إلى مزوّد ذكاء اصطناعي خارجي لإنشاء الرد؛ ولا تُحفظ على أي خادم تابع لـ ClipSAT.',
        'privacy.h3-counter':'عدّاد الزيارات',
        'privacy.counter':'تعرض الصفحة الرئيسية عدّاد زيارات حياً على مستوى الموقع بأكمله، مُخزَّناً في مشروع Supabase الخاص بـ ClipSAT نفسه — وهو نفس الخادم الاختياري المستخدم لمزامنة السحابة، الموضّح أعلاه. تحتسب كل علامة تبويب زيارة واحدة على الأكثر، عبر استدعاء دالة صغيرة من جانب الخادم لا تفعل شيئاً سوى زيادة رقم واحد مشترك؛ لا تُرفق أي محتوى للصفحة أو معرّفات جهاز أو معلومات حساب بهذا الاستدعاء. وكما هو الحال مع أي طلب عبر الإنترنت، تطّلع البنية التحتية لـ Supabase على الطلب (بما في ذلك عنوان IP الخاص بجهازك) تمامًا كما يفعل أي خادم ويب، لكن كود ClipSAT نفسه لا يخزّن هذه المعلومات أبداً ولا يملك وصولاً إليها — فقط الرقم الإجمالي الذي تُعيده الدالة.',
        'privacy.h3-ads':'الإعلانات وملفات تعريف الارتباط',
        'privacy.ads':'قد يعرض ClipSAT إعلانات من Google وجهات خارجية أخرى. تستخدم هذه الجهات، ومنها Google، ملفات تعريف الارتباط لعرض إعلانات بناءً على زيارات المستخدم السابقة لهذا الموقع أو مواقع أخرى. استخدام Google لملفات تعريف ارتباط الإعلانات يتيح لها ولشركائها عرض إعلانات بناءً على زيارتك لهذا الموقع و/أو مواقع أخرى على الإنترنت. يمكنك إلغاء الاشتراك في الإعلانات المخصصة عبر زيارة <a href="https://adssettings.google.com/" target="_blank" rel="noopener">إعدادات إعلانات Google</a>. يمكنك أيضاً التحكم بملفات تعريف الارتباط من إعدادات متصفحك؛ تعطيلها قد يؤثر على بعض ميزات الموقع.',
        'privacy.h3-forms':'التكامل مع نماذج Google',
        'privacy.forms-intro':'يمكن للمعلمين اختيارياً ربط حساب Google لتحويل اختبار أو ورقة عمل تم إنشاؤها بواسطة ClipSAT إلى نموذج Google، برابط قابل للمشاركة يمكن نشره في أي مكان — Google Classroom، أو Canvas، أو Moodle، أو أي نظام إدارة تعلّم آخر. هذا اختياري بالكامل — لا يُرسل شيء إلى Google إلا إذا ضغط المعلم على «ربط حساب Google» ووافق على الأذونات المحددة المطلوبة. النقاط الأساسية:',
        'privacy.forms-li1':'يطلب ClipSAT فقط الأذونات اللازمة لإنشاء نموذج، وقراءة استجاباته الخاصة، وحفظ صور الأسئلة التي يعرضها في Google Drive الخاص بالمعلم (وهو إذن مقتصر فقط على الملفات التي ينشئها ClipSAT نفسه — ولا يمكنه رؤية أو لمس أي شيء آخر موجود مسبقاً في ذلك الـ Drive). لا يقرأ ClipSAT أو يغيّر أي شيء آخر في حساب Google المرتبط، ولا يطلب أبداً الوصول إلى مقررات أو قوائم طلاب المعلم في Google Classroom.',
        'privacy.forms-li2':'يتم تحويل الأسئلة وخيارات الإجابة التي تحتوي رياضيات معقدة إلى صورة (لتظهر بشكل صحيح في النماذج، التي لا تستطيع عرض الرموز الرياضية) ويتم رفعها إلى Google Drive الخاص بالمعلم نفسه، مع إعداد «أي شخص لديه الرابط يمكنه العرض» ليتمكن النموذج من عرضها. لا يُخزّن ClipSAT هذه الصور في أي مكان — فقط في Drive الخاص بالمعلم.',
        'privacy.forms-li3':'يحدث هذا الربط بالكامل داخل متصفحك. لا يملك ClipSAT خادماً خلفياً، لذا لا يمر أي محتوى اختبار أو بيانات استجابة أو رمز وصول عبر أي خادم تابع لـ ClipSAT أو يُخزَّن عليه — يتم كل استدعاء لواجهة Google البرمجية مباشرة من متصفح المعلم إلى Google، باستخدام رمز تصدره Google نفسها ولا يحتفظ به ClipSAT أبداً بعد إغلاق تبويب المتصفح الحالي.',
        'privacy.forms-li4':'أي نتائج تظهر داخل ClipSAT (ملخص درجات لكل طالب) تُجلب مباشرة من Google في كل مرة تُعرض فيها الصفحة، ولا يخزّنها ClipSAT في أي مكان.',
        'privacy.forms-li5':'تحكم سياسة خصوصية Google الخاصة بها كيفية تعامل Google مع البيانات بمجرد وصول طلبات ClipSAT إليها — راجع <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.',
        'privacy.forms-li6':'يمكن للمعلم إلغاء وصول ClipSAT في أي وقت من صفحة <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener">أذونات حساب Google</a> الخاصة به.',
        'privacy.h3-thirdparty':'روابط خارجية',
        'privacy.thirdparty':'تنقلك روابط واتساب وتيليجرام ويوتيوب وإنستغرام وتيك توك وفيسبوك وباي بال إلى مواقع تلك الشركات الخاصة، ويحكم كل منها سياسة خصوصيته الخاصة به.',
        'privacy.h3-contact':'تواصل معنا',
        'privacy.contact-p':'يمكن إرسال الأسئلة حول هذه السياسة عبر <a href="https://wa.me/966597688647" target="_blank" rel="noopener">واتساب</a> أو <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">تيليجرام</a>.',
        'terms.h2':'شروط الخدمة',
        'terms.updated':'آخر تحديث: 8 يوليو 2026',
        'terms.intro':'باستخدامك ClipSAT فإنك توافق على ما يلي.',
        'terms.h3-content':'استخدام المحتوى',
        'terms.content':'الملاحظات، والرسوم التفاعلية، وأسئلة التدريب متاحة للمذاكرة الشخصية. يمكن استخدام الملفات التي تم تنزيلها لمراجعتك الخاصة؛ يُرجى عدم إعادة توزيعها أو بيعها.',
        'terms.h3-guarantee':'لا ضمان للنتائج',
        'terms.guarantee':'ClipSAT وسيلة مساعدة للمذاكرة، وليس ضماناً لأي درجة معينة في الامتحان. راجع دائماً الوثائق الرسمية للمنهج (مثل Cambridge أو IB أو College Board أو قياس) للحصول على المنهج المعتمد.',
        'terms.h3-ai':'المعلّم الذكي',
        'terms.ai':'«اسأل الأستاذ محمد» هو مساعد ذكاء اصطناعي، وليس الأستاذ محمد عبدالله نفسه. تأكد بنفسك من الخطوات المهمة والإجابات النهائية.',
        'terms.h3-contact':'تواصل معنا',
        'terms.contact-p':'يمكن إرسال الأسئلة عبر <a href="https://wa.me/966597688647" target="_blank" rel="noopener">واتساب</a> أو <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">تيليجرام</a>.',
        'cookies.h2':'سياسة ملفات تعريف الارتباط',
        'cookies.updated':'آخر تحديث: 13 يوليو 2026',
        'cookies.intro':'لا يضع ClipSAT أي ملفات تعريف ارتباط بنفسه، ولا يشغّل أي برمجيات إعلانات أو تحليلات. الاستثناء الوحيد هو عدّاد زيارات صغير في الصفحة الرئيسية، موضّح أدناه. توضح هذه الصفحة بالتحديد ما يُحفظ، بنفس العبارات الواضحة المستخدمة في <a href="/privacy/">سياسة الخصوصية</a>.',
        'cookies.h3-stores':'ما الذي يحفظه ClipSAT بنفسه',
        'cookies.stores':'يُحفظ تقدّمك، وأيام الاستمرار، وسجل الأخطاء، وجدول مراجعة البطاقات التعليمية، وتفضيل الوضع الداكن باستخدام <strong>التخزين المحلي</strong> لمتصفحك — وهي آلية مختلفة وأكثر محدودية من ملفات تعريف الارتباط. تبقى هذه البيانات على جهازك، ولا تُنقل أبداً إلى أي خادم تابع لـ ClipSAT، ولا تُشارَك مع أحد. يمكنك مسحها في أي وقت من إعدادات متصفحك.',
        'cookies.h3-counter':'عدّاد الزيارات',
        'cookies.counter':'تعرض الصفحة الرئيسية عدّاد زيارات حياً على مستوى الموقع بأكمله، يُقرأ من مشروع Supabase الخاص بـ ClipSAT نفسه بدلاً من شارة خارجية. تحتسب كل علامة تبويب زيارة واحدة — عبر دالة صغيرة من جانب الخادم لا تفعل شيئاً سوى زيادة رقم واحد مشترك — وتتذكّر أنها فعلت ذلك بالفعل لبقية جلسة تلك العلامة باستخدام <strong>تخزين الجلسة</strong> (يُمسح تلقائياً عند إغلاق علامة التبويب؛ وليس ملف تعريف ارتباط)، بحيث لا يُحتسب التنقّل بين الصفحات داخل نفس علامة التبويب مرتين. لا يُرفق أي محتوى للصفحة أو معرّفات جهاز أو معلومات حساب بهذا الاستدعاء نفسه. وكما هو الحال مع أي طلب عبر الإنترنت، يكون الطلب الشبكي الأساسي مرئياً للبنية التحتية المستضيفة لـ ClipSAT كما هو الحال مع أي طلب، لكن كود ClipSAT نفسه لا يخزّن هذه المعلومات أبداً ولا يملك وصولاً إليها — فقط الرقم الإجمالي.',
        'cookies.h3-embeds':'التضمينات الخارجية',
        'cookies.embeds':'تنقلك روابط واتساب وتيليجرام ويوتيوب وإنستغرام وتيك توك وفيسبوك وباي بال إلى مواقع تلك الشركات الخاصة، وقد يضع كل منها ملفات تعريف ارتباط خاصة به وفق سياسته الخاصة بمجرد وصولك إليه. لا يتحكم ClipSAT بتلك الملفات ولا يتلقى بيانات منها.',
        'cookies.h3-changes':'في حال تغيّر هذا',
        'cookies.changes':'إذا أضاف ClipSAT إعلانات أو تحليلات مستقبلاً، ستُحدَّث هذه الصفحة أولاً لتوضيح بالتحديد ما الذي أُضيف ولماذا، مع طريقة للتحكم به، قبل تفعيل أي شيء.',
        'cookies.h3-contact':'تواصل معنا',
        'cookies.contact-p':'يمكن إرسال الأسئلة حول هذه السياسة عبر <a href="https://wa.me/966597688647" target="_blank" rel="noopener">واتساب</a> أو <a href="https://t.me/ClipSAT22" target="_blank" rel="noopener">تيليجرام</a>.',
        'qud.arith.title':'الحساب والحس العددي',
        'qud.arith.intro':'الأساس: ترتيب العمليات الحسابية، الكسور، العوامل والمضاعفات، والتقدير السريع.',
        'qud.arith.ref-label':'▲ مرجع — حقائق عددية',
        'qud.arith.ref-body':'اتّبع ترتيب العمليات الحسابية (الأقواس، الأسس، الضرب والقسمة، الجمع والطرح). لمقارنة الكسور، استخدم الضرب التبادلي أو المقام المشترك. التحليل إلى عوامل أوّلية يكشف عوامل العدد، وقاسمه المشترك الأكبر، ومضاعفه المشترك الأصغر.',
        'qud.arith.card-order-t':'الترتيب','qud.arith.card-order-b':'الأقواس ← الأسس ← الضرب والقسمة ← الجمع والطرح',
        'qud.arith.card-compare-t':'المقارنة','qud.arith.card-percent-t':'النسبة المئوية','qud.arith.card-average-t':'المتوسط',
        'qud.arith.ex1a-label':'مثال محلول 1.أ',
        'qud.arith.ex1a-p1':'أيّهما أكبر، \\( \\tfrac23 \\) أم \\( \\tfrac35 \\)؟',
        'qud.arith.ex1a-p2':'بالضرب التبادلي: \\( 2\\times5=10 \\) مقابل \\( 3\\times3=9 \\). وبما أنّ \\( 10>9 \\)،',
        'qud.arith.ex1b-label':'مثال محلول 1.ب',
        'qud.arith.ex1b-p1':'أوجد \\( 15\\% \\) من \\( 200 \\).',
        'qud.arith.practice-label':'سؤال تدريبي',
        'qud.arith.practice-q':'ما قيمة \\(\\dfrac{5}{6}+\\dfrac{7}{9}-\\dfrac{1}{3}\\)؟',
        'qud.arith.practice-solution':'المقام المشترك الأصغر \\(=18:\\quad\\dfrac{15}{18}+\\dfrac{14}{18}-\\dfrac{6}{18}=\\dfrac{23}{18}=1\\dfrac{5}{18}.\\)',

        'ix.badge.mt':'مطابقة','ix.mt.allMatched':'🎉 تم مطابقة جميع الأزواج!',
        'ix.badge.tf':'صحيح / خطأ','ix.tf.trueCorrect':'✓ صحيح — ','ix.tf.falseCorrect':'✓ خطأ — ','ix.tf.true':'صحيح','ix.tf.false':'خطأ',
        'ix.badge.sb':'باني الخطوات','ix.sb.hintPrefix':'تلميح: ','ix.sb.checkAnswers':'تحقّق من الإجابات',
        'ix.sb.allCorrect':'✓ كل الخطوات الـ{n} صحيحة!','ix.sb.someCorrect':'{ok}/{total} صحيحة. تلميحات: ','ix.sb.stepN':'الخطوة {n}: ',
        'exp.interactive':'تفاعلي','exp.viewAsData':'📊 عرض كبيانات (بديل غير بصري)',
        'exp.quantity':'الكمية','exp.value':'القيمة',

        'qud.about.title':'شكل الاختبار والاستراتيجية',
        'qud.about.intro':'يُدار اختبار القدرات العامة (GAT) من قِبل المركز الوطني للقياس ("قياس"). إلى جانب القسم اللفظي، يضم الاختبار قسمًا <strong>كمّيًا</strong> يقيس التفكير المنطقي بالأرقام بدلاً من المحتوى المحفوظ.',
        'qud.about.expect-label':'ما الذي يمكن توقعه',
        'qud.about.expect-body':'الأسئلة من نوع الاختيار من متعدد وتُحل <strong>بدون آلة حاسبة</strong>، لذا فإن السرعة وسلامة الطرق الذهنية لا تقل أهمية عن الرياضيات نفسها. يعتمد المحتوى الكمّي على الحساب والجبر والهندسة والبيانات — بمستوى يقارب المرحلة المتوسطة إلى بداية الثانوية — إضافة إلى نوع مميز من الأسئلة هو <strong>المقارنة الكمّية</strong> الذي يُغطى في الفصل الخامس.',
        'qud.about.map-label':'خريطة القسم الكمّي — اختبار القدرات',
        'qud.about.map-th-chapter':'الفصل','qud.about.map-th-topics':'المواضيع المُختبرة','qud.about.map-th-share':'النسبة التقريبية',
        'qud.about.map-r1-ch':'1 — الحساب','qud.about.map-r1-tp':'العمليات الحسابية، الكسور، م.م.أ وق.م.أ، التقدير',
        'qud.about.map-r2-ch':'2 — النسب والمئويات','qud.about.map-r2-tp':'نسب الجزء إلى الكل، التغيّر المئوي، التناسب',
        'qud.about.map-r3-ch':'3 — الجبر','qud.about.map-r3-tp':'المعادلات الخطية، الأنظمة، الفك، التعويض',
        'qud.about.map-r4-ch':'4 — الهندسة','qud.about.map-r4-tp':'المحيط، المساحة، الزوايا، المثلثات، الدوائر',
        'qud.about.map-r5-ch':'5 — أسئلة المقارنة الكمّية','qud.about.map-r5-tp':'مقارنة الكمية أ بالكمية ب؛ إجابة من 4 اختيارات',
        'qud.about.map-r6-ch':'6 — المتتاليات','qud.about.map-r6-tp':'الحد النوني للمتتالية الحسابية/الهندسية، الأنماط البصرية',
        'qud.about.map-r7-ch':'7 — البيانات والاحتمالات','qud.about.map-r7-tp':'الوسط الحسابي، الوسيط، المنوال؛ قراءة الجداول؛ احتمالات أساسية',
        'qud.about.map-footer':'<strong>الشكل:</strong> اختيار من متعدد، بدون آلة حاسبة. الأسئلة باللغة العربية. الاستراتيجية الأساسية: قدّر أولًا، وجرّب قيمًا خاصة في أسئلة المقارنة الكمّية.',
        'qud.about.card-format-t':'الشكل','qud.about.card-format-v':'اختيار من متعدد',
        'qud.about.card-calc-t':'الآلة الحاسبة','qud.about.card-calc-v':'غير مسموحة',
        'qud.about.card-skills-t':'المهارات','qud.about.card-skills-v':'حساب · جبر · هندسة · بيانات',
        'qud.about.card-sig-t':'السمة المميزة','qud.about.card-sig-v':'المقارنات الكمّية',
        'qud.about.habits-label':'▲ ثلاث عادات توفّر الوقت',
        'qud.about.habits-body':'قدّر قبل الحساب؛ واحتفظ بالكسور بدلاً من تحويلها إلى أعداد عشرية كلما أمكن ذلك؛ وفي أسئلة المقارنة، جرّب قيمًا مناسبة (مثل \\( 0 \\)، و\\( 1 \\)، وعددًا سالبًا) قبل اختيار الإجابة النهائية.',
        'qud.about.practice-label':'سؤال تدريبي',
        'qud.about.practice-q':'أجاب طالب إجابةً صحيحة عن 36 من أصل 45 سؤالًا. ما النسبة المئوية لذلك؟',

        'qud.ratio.title':'النسب والتناسب والمئويات',
        'qud.ratio.intro':'تُقسّم النسب كمية إلى أجزاء؛ بينما تعبّر المئويات عن التغيّر. يظهر كلاهما باستمرار في الاختبار، وغالبًا ما يكونان مموَّهين داخل مسائل لفظية.',
        'qud.ratio.ref-label':'▲ مرجع — النسبة والمئوية',
        'qud.ratio.ref-body':'لتقسيم كمية إجمالية بنسبة \\( a:b \\)، يكون هناك \\( a+b \\) جزءًا متساويًا. التغيّر المئوي هو \\( \\dfrac{\\text{new}-\\text{old}}{\\text{old}}\\times100\\% \\). ارتفاع بنسبة \\( p\\% \\) يليه انخفاض بنسبة \\( p\\% \\) <em>لا</em> يُعيد القيمة إلى ما كانت عليه.',
        'qud.ratio.exp1-intro':'عدّل جزأي النسبة أدناه، وراقب كيف يُقسَّم إجمالي قدره 120 بينهما.',
        'qud.ratio.exp1-et':'⊙ مستكشف · التقسيم حسب نسبة',
        'qud.ratio.exp1-aria':'شريط بإجمالي 120 مقسوم بين جزأين بنسبة قابلة للتعديل',
        'qud.ratio.exp1-caption':'تقسيم الإجمالي وفق النسبة الحالية',
        'qud.ratio.exp1-ctrl-a':'الجزء <b>a =</b>','qud.ratio.exp1-ctrl-a-aria':'الجزء a',
        'qud.ratio.exp1-ctrl-b':'الجزء <b>b =</b>','qud.ratio.exp1-ctrl-b-aria':'الجزء b',
        'qud.ratio.exp1-readout-a':'النصيب الأول','qud.ratio.exp1-readout-b':'النصيب الثاني',
        'qud.ratio.exp1-note':'كل جزء يساوي \\( \\tfrac{120}{a+b} \\)؛ والنصيبان هما \\( a \\) و\\( b \\) من تلك الأجزاء.',
        'qud.ratio.exp2-intro':'الآن، ثبّت القيمة الأصلية عند 80 وحرّك القيمة الجديدة لقراءة نسبة التغيّر مباشرة.',
        'qud.ratio.exp2-et':'⊙ مستكشف · التغيّر المئوي',
        'qud.ratio.exp2-aria':'شريطان يقارنان قيمة أصلية 80 بقيمة جديدة قابلة للتعديل',
        'qud.ratio.exp2-caption':'القيمة الأصلية والجديدة، ونسبة التغيّر',
        'qud.ratio.exp2-ctrl-pre':'القيمة الجديدة =','qud.ratio.exp2-ctrl-post':'(الأصلية 80)','qud.ratio.exp2-ctrl-aria':'القيمة الجديدة',
        'qud.ratio.exp2-readout':'نسبة التغيّر',
        'qud.ratio.exp2-note':'\\( \\dfrac{\\text{new}-80}{80}\\times100\\% \\). تساوي الشريطين يعني تغيّرًا نسبته \\( 0\\% \\).',
        'qud.ratio.card-share-t':'النصيب','qud.ratio.card-pctchange-t':'نسبة التغيّر','qud.ratio.card-increase-t':'الزيادة','qud.ratio.card-decrease-t':'النقصان',
        'qud.ratio.ex2a-label':'مثال محلول 2.أ',
        'qud.ratio.ex2a-p1':'اقسم \\( 150 \\) بنسبة \\( 2:3 \\).',
        'qud.ratio.ex2a-p2':'خمسة أجزاء، كل جزء \\( 30 \\):',
        'qud.ratio.ex2b-label':'مثال محلول 2.ب',
        'qud.ratio.ex2b-p1':'يرتفع سعر \\( 100 \\) بنسبة \\( 10\\% \\)، ثم ينخفض بنسبة \\( 10\\% \\). أوجد السعر النهائي.',
        'qud.ratio.practice-label':'سؤال تدريبي',
        'qud.ratio.practice-q':'في أحد الصفوف، نسبة عدد الأولاد إلى البنات هي 3:5. إذا كان عدد البنات 40، فكم عدد الطلاب الإجمالي؟',
        'qud.ratio.practice-solution':'إجمالي الأجزاء\\(=3+5=8.\\quad\\)إجمالي الطلاب\\(=8\\times8=64.\\)',

        'qud.algebra.title':'أساسيات الجبر',
        'qud.algebra.intro':'المعادلات الخطية، الأنظمة البسيطة، الفك والتعويض — الجبر الذي يعتمد عليه القسم الكمّي.',
        'qud.algebra.ref-label':'▲ مرجع — التعامل مع المجاهيل',
        'qud.algebra.ref-body':'لحل معادلة خطية، اعزل المتغيّر. يمكن حل نظام من معادلتين بالحذف أو بالتعويض. افرد \\( (x+a)(x+b)=x^2+(a+b)x+ab \\).',
        'qud.algebra.card-linear-t':'خطية','qud.algebra.card-expand-t':'الفك',
        'qud.algebra.card-system-t':'النظام','qud.algebra.card-system-v':'حذف أو تعويض',
        'qud.algebra.card-powers-t':'الأسس',
        'qud.algebra.ex3a-label':'مثال محلول 3.أ',
        'qud.algebra.ex3a-p1':'حلّ \\( 2x+5=17 \\).',
        'qud.algebra.ex3b-label':'مثال محلول 3.ب',
        'qud.algebra.ex3b-p1':'إذا كان \\( x+y=10 \\) و\\( x-y=4 \\)، أوجد \\( x \\).',
        'qud.algebra.ex3b-p2':'بجمع المعادلتين: \\( 2x=14 \\).',
        'qud.algebra.practice-label':'سؤال تدريبي',
        'qud.algebra.practice-q':'حلّ: \\(2x+y=11\\) و\\(x-y=1.\\)',
        'qud.algebra.practice-solution1':'بالجمع: \\(3x=12\\Rightarrow x=4.\\)',

        'rail.chapters':'الفصول','rail.practiceSet':'مجموعة تدريبية','rail.testGenerator':'مولّد الاختبارات','rail.downloads':'تنزيلات',
        'qud.rail.ratio':'النسب والمئويات','qud.rail.geometry':'الهندسة والقياس',
        'qud.rail.compare':'المقارنات الكمّية','qud.rail.patterns':'المتتاليات والأنماط',
        'qud.rail.data':'البيانات والاحتمالات','qud.rail.word':'المسائل اللفظية والاستدلال',
        'tah.rail.algebra':'الجبر والمعادلات','tah.rail.functions':'الدوال',
        'tah.rail.sequences':'المتتاليات والمتسلسلات','tah.rail.trig':'المثلثات',
        'tah.rail.geometry':'الهندسة والإحداثيات','tah.rail.calc1':'النهايات والمشتقات',
        'tah.rail.calc2':'التكامل وتطبيقاته','tah.rail.explog':'الأسس واللوغاريتمات',
        'tah.rail.stats':'الإحصاء والاحتمالات',

        'qud.geo.intro':'الزوايا، المثلثات، المساحة، المحيط والحجم — تُطبَّق بسرعة، عادة دون آلة حاسبة.',
        'qud.geo.ref-label':'▲ مرجع — الأشكال والفراغ',
        'qud.geo.ref-body':'مجموع زوايا المثلث \\( 180^{\\circ} \\)؛ والرباعي \\( 360^{\\circ} \\). فيثاغورس: \\( a^2+b^2=c^2 \\). مساحة الدائرة \\( \\pi r^2 \\)، ومحيطها \\( 2\\pi r \\).',
        'qud.geo.card-triangle-t':'المثلث','qud.geo.card-triangle-v':'الزوايا',
        'qud.geo.card-rect-t':'المستطيل','qud.geo.card-circle-t':'الدائرة','qud.geo.card-pyth-t':'فيثاغورس',
        'qud.geo.ex4a-label':'مثال محلول 4.أ',
        'qud.geo.ex4a-p1':'مثلث قائم الزاوية ضلعاه \\( 6 \\) و\\( 8 \\). أوجد الوتر.',
        'qud.geo.ex4b-label':'مثال محلول 4.ب',
        'qud.geo.ex4b-p1':'أوجد مساحة دائرة نصف قطرها \\( r=7 \\)، باعتبار \\( \\pi=\\tfrac{22}{7} \\).',
        'qud.geo.practice-label':'سؤال تدريبي',
        'qud.geo.practice-q':'مستطيل طوله \\((2x+3)\\) سم وعرضه \\((x+1)\\) سم ومحيطه 38 سم. أوجد مساحته.',
        'qud.geo.practice-solution2':'الطول\\(=13\\) سم، العرض\\(=6\\) سم. المساحة\\(=78\\) سم\\(^2.\\)',

        'qud.compare.intro':'نوع السؤال الأكثر ارتباطًا باختبار القدرات: كميتان، <strong>A</strong> و<strong>B</strong>، وقرار واحد يجب اتخاذه.',
        'qud.compare.def-label':'● الإجابات الأربع',
        'qud.compare.def-body':'اختر: <strong>A &gt; B</strong>، <strong>A &lt; B</strong>، <strong>A = B</strong>، أو <strong>لا يمكن التحديد</strong> — وتُستخدم الأخيرة عندما تتغيّر العلاقة حسب القيم المجهولة. اختبر دائمًا أعدادًا مناسبة قبل اتخاذ القرار.',
        'qud.compare.exp-intro':'هنا \\( A=2x \\) و\\( B=x+3 \\). حرّك \\( x \\): لاحظ أن ترتيب A وB <em>ينعكس</em>، لذا فإن الإجابة الصادقة مع \\( x \\) مجهول هي "لا يمكن التحديد".',
        'qud.compare.exp-et':'⊙ مستكشف · A مقابل B',
        'qud.compare.exp-aria':'خط أعداد يقارن الكمية A تساوي 2x بالكمية B تساوي x زائد 3',
        'qud.compare.exp-caption':'الكميتان A وB عند قيمة x الحالية، وكيف تتغيّر العلاقة عبر x',
        'qud.compare.exp-th-relation':'العلاقة',
        'qud.compare.exp-ctrl-aria':'قيمة x',
        'qud.compare.exp-readout-rel':'العلاقة',
        'qud.compare.exp-note':'يتساويان عند \\( x=3 \\)؛ إلى اليسار تتصدّر \\( B \\)، وإلى اليمين تتصدّر \\( A \\).',
        'qud.compare.ex5a-label':'مثال محلول 5.أ',
        'qud.compare.ex5a-p1':'<strong>A:</strong> \\( 25\\% \\) من \\( 80 \\). &nbsp; <strong>B:</strong> \\( 20 \\). قارن.',
        'qud.compare.ex5a-p2':'\\( 25\\% \\) من \\( 80=20 \\)، إذن',
        'qud.compare.ex5b-label':'مثال محلول 5.ب',
        'qud.compare.ex5b-p1':'<strong>A:</strong> \\( x \\). &nbsp; <strong>B:</strong> \\( x^{2} \\)، لعدد حقيقي \\( x \\). قارن.',
        'qud.compare.ex5b-p2':'إذا كان \\( x=\\tfrac12 \\) فإن \\( B&lt;A \\)؛ وإذا كان \\( x=2 \\) فإن \\( B&gt;A \\). إذن',
        'qud.compare.strategy-label':'▲ استراتيجية المقارنة الكمّية',
        'qud.compare.strategy-body':'يقدّم كل سؤال مقارنة كمّية كميتين، A وB. تختار: A&gt;B، أو B&gt;A، أو A=B، أو لا يمكن التحديد. جرّب قيمًا خاصة (0، 1، −1، كسور) للاختبار.',
        'qud.compare.card-s1-t':'الاستراتيجية 1','qud.compare.card-s1-v':'بسّط العمودين جبريًا قبل المقارنة',
        'qud.compare.card-s2-t':'الاستراتيجية 2','qud.compare.card-s2-v':'جرّب 0، 1، −1، ½ للتحقق مما إذا كانت العلاقة ثابتة',
        'qud.compare.card-s3-t':'الاستراتيجية 3','qud.compare.card-s3-v':'إذا كان بإمكان متغيّر أن يجعل أي عمود أكبر: "لا يمكن التحديد"',
        'qud.compare.card-tip-t':'نصيحة هندسية','qud.compare.card-tip-v':'ارسم شكلًا؛ ولا تفترض أن الأشكال مرسومة بمقياس رسم دقيق',
        'qud.compare.ex-generic-label':'مثال محلول',
        'qud.compare.ex-generic-p1':'العمود A: \\( x^2 \\). العمود B: \\( x \\). قارن.',
        'qud.compare.ex-generic-p2':'إذا كان \\( x=2 \\): \\( 4&gt;2 \\). وإذا كان \\( x=\\frac{1}{2} \\): \\( \\frac{1}{4}&lt;\\frac{1}{2} \\). وإذا كان \\( x=0 \\): متساويان. ← لا يمكن التحديد.',
        'qud.compare.practice-label':'سؤال تدريبي',
        'qud.compare.practice-q':'<strong>الكمية A:</strong> \\((x-3)^2\\) &nbsp; <strong>الكمية B:</strong> \\(x^2-6x+9\\) لأي عدد حقيقي \\(x\\). قارن.',
        'qud.compare.practice-solution1':'افرد A: \\((x-3)^2=x^2-6x+9.\\)',
        'qud.compare.practice-solution2':'<strong>A = B</strong> (دائمًا).'
      }
    };

    var _locale = localStorage.getItem('clipsat_locale') || 'en';

    function t(key, vars){
      var str = (_strings[_locale]||_strings.en)[key] || key;
      if(vars) Object.keys(vars).forEach(function(k){ str=str.replace('{'+k+'}',vars[k]); });
      return str;
    }

    /* Containers actually translated so far — must stay in exact sync with
       the `body.rtl ...{direction:rtl}` selectors in the CSS block above
       ("RTL / ARABIC" comment). Setting `dir` here (not just CSS `direction`)
       matters for the Unicode Bidi Algorithm on real Arabic text runs, not
       just visual alignment. Deliberately NOT html/body-level — the rest of
       each track's chapter content is untranslated English and must stay LTR. */
    var RTL_SCOPE_SELECTOR = 'header.site, .hero, footer.site, #qud-arithmetic .i18n-content, #qud-about .i18n-content, #qud-ratio .i18n-content, #qud-algebra .i18n-content, #qud-geometry .i18n-content, #qud-compare .i18n-content, #view-contact, #view-privacy, #view-terms, #view-cookies, #view-calculator, #view-home';

    function setLocale(loc){
      _locale = loc;
      localStorage.setItem('clipsat_locale', loc);
      document.documentElement.lang = loc; // safe globally — lang is metadata, doesn't affect layout/inheritance
      document.body.classList.toggle('rtl', loc==='ar'); // CSS mirroring hook — see body.rtl rules
      document.querySelectorAll(RTL_SCOPE_SELECTOR).forEach(function(el){
        el.dir = loc==='ar' ? 'rtl' : 'ltr';
      });
      _applyToDOM();
      /* re-translate already-injected Interactive Practice widgets (chrome +
         any reviewed-chapter Arabic content) — see _inject()'s locale guard */
      if(window.ClipSATIX)window.ClipSATIX.refreshAll();
      /* update toggle button label */
      var btn=document.getElementById('i18n-toggle-btn');
      if(btn){
        btn.textContent = loc==='ar' ? '🌐 EN' : '🌐 ع';
        btn.title = loc==='ar' ? 'Switch to English' : 'Switch to Arabic';
      }
      if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise();
    }

    function getLocale(){ return _locale; }

    function _applyToDOM(){
      document.querySelectorAll('[data-i18n]').forEach(function(el){
        el.textContent = t(el.getAttribute('data-i18n'));
      });
      /* data-i18n-html: same as data-i18n but the English source string itself
         contains a styled child element (e.g. the hero H1's <span class="q1">),
         so it needs an innerHTML swap instead of a plain textContent one. */
      document.querySelectorAll('[data-i18n-html]').forEach(function(el){
        el.innerHTML = t(el.getAttribute('data-i18n-html'));
      });
      /* data-i18n-attr="attrName:key" — translates a single named attribute
         (placeholders, titles) instead of the element's own content. */
      document.querySelectorAll('[data-i18n-attr]').forEach(function(el){
        var spec=el.getAttribute('data-i18n-attr').split(':');
        el.setAttribute(spec[0], t(spec[1]));
      });
      /* data-bilingual: content migrated to content/{track}/*.json (docs/CONTENT_MODEL.md)
         embeds BOTH languages directly as two child elements (.i18n-en / .i18n-ar) instead
         of a dictionary-key lookup — there is no key, so nothing above applies to it. Toggle
         which child is visible; if there's no .i18n-ar (the source string's "ar" was null,
         i.e. not yet translated), the English one just stays visible regardless of locale.
         Purely additive: pages with no [data-bilingual] elements (everything before this was
         written) are unaffected — the querySelectorAll below simply returns nothing. */
      document.querySelectorAll('[data-bilingual]').forEach(function(el){
        var en = el.querySelector(':scope > .i18n-en');
        var ar = el.querySelector(':scope > .i18n-ar');
        if(!en) return;
        var showAr = _locale === 'ar' && !!ar;
        en.hidden = showAr;
        if(ar) ar.hidden = !showAr;
      });
      /* data-bilingual-attrs="attr1,attr2": companion to data-bilingual above, for values
         that must be plain attributes (aria-label, etc.) rather than visible content, so the
         dual-span trick doesn't apply. Reads data-{attr}-en / data-{attr}-ar and sets attr to
         whichever matches the current locale (falls back to -en if no -ar exists). */
      document.querySelectorAll('[data-bilingual-attrs]').forEach(function(el){
        el.getAttribute('data-bilingual-attrs').split(',').forEach(function(attr){
          var en = el.getAttribute('data-'+attr+'-en');
          var ar = el.getAttribute('data-'+attr+'-ar');
          var val = (_locale === 'ar' && ar) ? ar : en;
          if(val != null) el.setAttribute(attr, val);
        });
      });
    }

    /* Apply on load — always through setLocale() so the toggle-button label,
       lang/dir attributes, and body.rtl class all end up consistent
       regardless of whether the script runs before or after DOMContentLoaded. */
    if(document.readyState==='loading'){
      document.addEventListener('DOMContentLoaded', function(){ setLocale(_locale); });
    } else {
      setLocale(_locale);
    }

    return {t:t, setLocale:setLocale, getLocale:getLocale};
  }());


  /* ── TITLE + META INJECTOR ── */
  (function(){
    document.querySelectorAll('main[id^="view-"]').forEach(function(view){
      var sh = view.querySelector('.subject-head');
      if(!sh) return;

      // Put course name into the existing .rt heading (no extra bar)
      var rail = view.querySelector('.rail');
      var titleText = (sh.querySelector('h1')||{textContent:''}).textContent.trim();
      if(rail && titleText){
        var rtEl = rail.querySelector('p.rt');
        if(rtEl) rtEl.textContent = titleText;
      }

      // Clone meta into testgen section
      var metaDiv = sh.querySelector('.meta');
      var testgenSec = view.querySelector('section.testgen');
      if(metaDiv && testgenSec){
        var clone = metaDiv.cloneNode(true);
        clone.className = 'testgen-meta';
        var chead = testgenSec.querySelector('.chead');
        if(chead && chead.nextSibling){
          testgenSec.insertBefore(clone, chead.nextSibling);
        } else {
          testgenSec.insertBefore(clone, testgenSec.firstChild);
        }
      }
    });
  })();


})();


/* ══════════════════════════════════════════════════════════════════
   CLIPSAT PRINT SYSTEM — Quiz + Exam
   ══════════════════════════════════════════════════════════════════ */
