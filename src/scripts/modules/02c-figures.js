/* The figure renderers, moved verbatim (Plan 5 Phase 5.015, ADR 0045):
   - from 02-core-app.js: the shared FIG_* palette and window._renderFig, which draws
     question-bank figures (chapter quizzes, question-bank papers);
   - from 05-test-generator-and-ai-settings.js: window.renderMathFigure and its SVG renderers
     (function graphs, 2D/3D geometry, charts, number lines), the schema AI tests use. _renderFig
     routes figures in that schema to it.
   Ships as public/js/figures.js. 02's _ensureFigures() loads it the first time a chapter quiz or
   paper needs a figure; _ensureBankExam() (and so _ensureAIExam()) loads it too. */
(function(){
  "use strict";

  /* ===================== FIGURE RENDERER ===================== */
  /* ── Shared figure-rendering palette — brand-consistent across every quiz/exam/worksheet
     figure (mirrors the INDIGO/AMBER/TEAL system already used by the PDF worksheet generator
     in tools/worksheet_gen/generate.py, so a diagram looks the same whether it's on a live
     quiz page or a downloaded worksheet). ── */
  /* declared on window (not a local var) so both this closure and the private
     renderMathFigure/renderGeom2D/renderGeom3D/etc. closure elsewhere in this
     script can see the same palette without needing a second declaration. */
  window.FIG_INDIGO='var(--fig-indigo, var(--indigo, #1E3A6E))';
  window.FIG_INDIGO2='var(--fig-indigo-2, var(--indigo-2, #2B5BA8))';
  window.FIG_INDIGO_FILL='var(--fig-indigo-soft, var(--indigo-soft, rgba(30,58,110,0.08)))';
  window.FIG_INDIGO_FILL2='var(--fig-indigo-fill2, rgba(43,91,168,0.16))';
  window.FIG_AMBER='var(--fig-amber, var(--amber-2, #C8902A))';
  window.FIG_AMBER_TEXT='var(--fig-amber-text, var(--amber-text, #8A6017))';
  window.FIG_AMBER_FILL='var(--fig-amber-soft, var(--amber-soft, rgba(200,144,42,0.16)))';
  window.FIG_TEAL='var(--fig-teal, var(--teal, #0e9f8f))';
  window.FIG_INK='var(--fig-ink, var(--ink, #0E1726))';
  window.FIG_MUTED='var(--fig-muted, var(--muted, #5a6577))';
  window.FIG_GRID='var(--fig-grid, var(--grid, #c9d4e8))';
  window.FIG_BORDER='var(--fig-border, var(--line, #dde4f0))';
  window.FIG_BG='var(--fig-bg, var(--paper, #fbfcfe))';
  window.FIG_SERIES=[window.FIG_INDIGO2,window.FIG_AMBER,window.FIG_TEAL,'var(--fig-purple, #8B5CF6)','var(--fig-rose, #DB5C6B)'];
  var FIG_INDIGO=window.FIG_INDIGO, FIG_INDIGO2=window.FIG_INDIGO2, FIG_INDIGO_FILL=window.FIG_INDIGO_FILL,
      FIG_INDIGO_FILL2=window.FIG_INDIGO_FILL2, FIG_AMBER=window.FIG_AMBER, FIG_AMBER_TEXT=window.FIG_AMBER_TEXT,
      FIG_AMBER_FILL=window.FIG_AMBER_FILL, FIG_TEAL=window.FIG_TEAL, FIG_INK=window.FIG_INK,
      FIG_MUTED=window.FIG_MUTED, FIG_GRID=window.FIG_GRID, FIG_BORDER=window.FIG_BORDER, FIG_BG=window.FIG_BG,
      FIG_SERIES=window.FIG_SERIES;

  var _SUPERS = {'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','+':'⁺','-':'⁻','−':'⁻','=':'⁼','(':'⁽',')':'⁾','/':'ᐟ','a':'ᵃ','b':'ᵇ','c':'ᶜ','d':'ᵈ','e':'ᵉ','f':'ᶠ','g':'ᵍ','h':'ʰ','i':'ⁱ','j':'ʲ','k':'ᵏ','l':'ˡ','m':'ᵐ','n':'ⁿ','o':'ᵒ','p':'ᵖ','r':'ʳ','s':'ˢ','t':'ᵗ','u':'ᵘ','v':'ᵛ','w':'ʷ','x':'ˣ','y':'ʸ','z':'ᶻ'};
  var _SUBS = {'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'⁶','7':'⁷','8':'₈','9':'₉','+':'₊','-':'₋','−':'₋','=':'₌','(':'₍',')':'₎','a':'ₐ','e':'ₑ','h':'ₕ','i':'ᵢ','j':'ⱼ','k':'ₖ','l':'ₗ','m':'ₘ','n':'ₙ','o':'ₒ','p':'ₚ','r':'ᵣ','s':'ₛ','t':'ₜ','u':'ᵤ','v':'ᵥ','x':'ₓ'};

  function _prettifyMathText(str){
    if(str == null) return '';
    var res = String(str);
    if(!res || res.indexOf('|') !== -1) return res;
    res = res
      .replace(/\\\(|\\\)|\\\[|\\\]|\$/g, '')
      .replace(/\\frac\s*\{\s*([^{}]+)\s*\}\s*\{\s*([^{}]+)\s*\}/g, function(_, num, den){
        var n = num.trim(), d = den.trim();
        var nWrap = /^[0-9a-zA-Zπθ√]+$/.test(n) ? n : '(' + n + ')';
        var dWrap = /^[0-9a-zA-Zπθ√]+$/.test(d) ? d : '(' + d + ')';
        return nWrap + '/' + dWrap;
      })
      .replace(/\\sqrt\s*\{\s*([^{}]+)\s*\}/g, function(_, rad){
        var r = rad.trim();
        return /^[0-9a-zA-Zπθ]+$/.test(r) ? '√' + r : '√(' + r + ')';
      })
      .replace(/\bsqrt\s*\(\s*([^()]+)\s*\)/g, function(_, rad){
        var r = rad.trim();
        return /^[0-9a-zA-Zπθ]+$/.test(r) ? '√' + r : '√(' + r + ')';
      })
      .replace(/\\pi\b/g, 'π')
      .replace(/\\theta\b|\btheta\b/g, 'θ')
      .replace(/\\alpha\b/g, 'α')
      .replace(/\\beta\b/g, 'β')
      .replace(/\\gamma\b/g, 'γ')
      .replace(/\\delta\b/g, 'δ')
      .replace(/\\Delta\b/g, 'Δ')
      .replace(/\\sigma\b/g, 'σ')
      .replace(/\\mu\b/g, 'μ')
      .replace(/\\lambda\b/g, 'λ')
      .replace(/\\omega\b/g, 'ω')
      .replace(/\\phi\b/g, 'φ')
      .replace(/\\mathbb\s*\{\s*R\s*\}/g, 'ℝ')
      .replace(/\\mathbb\s*\{\s*C\s*\}/g, 'ℂ')
      .replace(/\\mathbb\s*\{\s*Z\s*\}/g, 'ℤ')
      .replace(/\\mathbb\s*\{\s*N\s*\}/g, 'ℕ')
      .replace(/\\mathbb\s*\{\s*Q\s*\}/g, 'ℚ')
      .replace(/\\(?:mathbf|textbf|boldsymbol|mathrm|text|mbox|mathit)\s*\{\s*([^{}]+)\s*\}/g, '$1')
      .replace(/\\(?:vec|overrightarrow)\s*\{\s*([^{}]+)\s*\}/g, '$1⃗')
      .replace(/\\hat\s*\{\s*([^{}]+)\s*\}/g, '$1̂')
      .replace(/\\(?:bar|overline)\s*\{\s*([^{}]+)\s*\}/g, '$1̄')
      .replace(/\\(?:le|leq)\b|<=/g, '≤')
      .replace(/\\(?:ge|geq)\b|>=/g, '≥')
      .replace(/\\(?:ne|neq)\b|!=/g, '≠')
      .replace(/\\approx\b/g, '≈')
      .replace(/\\pm\b|\+-/g, '±')
      .replace(/\\infty\b|\binfty\b/g, '∞')
      .replace(/\\(?:to|rightarrow)\b|->/g, '→')
      .replace(/\\cdot\b/g, '·')
      .replace(/\\times\b/g, '×')
      .replace(/\^\s*\\circ\b|\\circ\b/g, '°');
    res = res.replace(/\^(\{[^{}]+\}|\([^()]+\)|[0-9a-zA-Z+\-=/]+)/g, function(full, exp){
      var inner = exp.replace(/^\{|\}$|^\(|\)$/g, '');
      var out = '';
      for(var i=0; i<inner.length; i++){
        var mapped = _SUPERS[inner[i]];
        if(!mapped) return full;
        out += mapped;
      }
      return out;
    });
    res = res.replace(/([a-zA-Z0-9α-ωΑ-Ω])_(\{[^{}]+\}|[0-9a-z+\-=]+)/g, function(full, base, sub){
      var inner = sub.replace(/^\{|\}$/g, '');
      var out = '';
      for(var i=0; i<inner.length; i++){
        var mapped = _SUBS[inner[i]];
        if(!mapped) return full;
        out += mapped;
      }
      return base + out;
    });
    res = res.replace(/([0-9])\s*\*\s*([a-zA-Z(])/g, '$1$2');
    res = res.replace(/(^|[^0-9.])1([xty]\b)/g, '$1$2');
    res = res.replace(/\s+-\s+/g, ' − ');
    res = res.replace(/(=\s*|[\(\[,]\s*)-\s*([0-9a-zA-Z√πθ])/g, '$1−$2');
    return res;
  }
  window._prettifyMathText = _prettifyMathText;

  function esc(s){
    var raw = String(s==null?'':s)
      .replace(/&amp;/g,'&')
      .replace(/&#39;/g,"'")
      .replace(/&quot;/g,'"')
      .replace(/&lt;/g,'<')
      .replace(/&gt;/g,'>');
    raw = _prettifyMathText(raw);
    return raw.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  window._figEsc = esc;

  function _svgTitle(title, W, y, maxFs, fill){
    if(!title) return '';
    var clean = String(title).replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').trim();
    if(!clean) return '';
    while(clean.length > 52 && clean.indexOf(' — ') !== -1){
      clean = clean.slice(clean.indexOf(' — ') + 3).trim();
    }
    var mFs = maxFs || 10.5;
    var availW = W - 18;
    var fs = Math.max(5.8, Math.min(mFs, availW / (clean.length * 0.58)));
    var fitAttr = (clean.length * fs * 0.56 > availW) ? (' textLength="' + Math.round(availW) + '" lengthAdjust="spacingAndGlyphs"') : '';
    return '<text x="' + (W / 2) + '" y="' + (y || 15) + '" font-size="' + fs.toFixed(1) + '" font-weight="bold" fill="' + (fill || FIG_INK) + '" text-anchor="middle"' + fitAttr + '>' + esc(clean) + '</text>';
  }
  window._svgTitle = _svgTitle;

  function _clampLabelX(x, text, fs, anchor, minX, maxX){
    var clean = String(text || '').replace(/&amp;/g,'&');
    var estW = clean.length * (fs || 9.5) * 0.55;
    var lo = minX != null ? minX : 6;
    var hi = maxX != null ? maxX : 314;
    if(anchor === 'middle'){
      return Math.max(lo + estW / 2, Math.min(hi - estW / 2, x));
    } else if(anchor === 'end'){
      return Math.max(lo + estW, Math.min(hi, x));
    } else {
      return Math.max(lo, Math.min(hi - estW, x));
    }
  }
  window._clampLabelX = _clampLabelX;

  function _figA11yLabel(fig){
    if(!fig) return 'Mathematical diagram';
    if(typeof fig === 'string') return 'Mathematical diagram';
    var t = fig.type;
    var res = '';
    if(t === 'fn' || t === 'axes' || t === 'function_graph'){
      res = 'Coordinate plane';
      var fns = fig.fns || [];
      if(fns.length){
        var fnDescs = fns.map(function(f){
          if(typeof f === 'string') return f;
          return f.label || (f.fn ? 'y = ' + f.fn : 'function curve');
        });
        res += ' with graph of ' + fnDescs.join(', ');
      }
      if(fig.points && fig.points.length){
        var ptDescs = fig.points.map(function(p){
          var pLbl = (p && p.label && p.label !== 'undefined' && p.label !== 'null') ? (p.label + ' ') : '';
          return pLbl + '(' + (p&&p.x!=null?p.x:0) + ', ' + (p&&p.y!=null?p.y:0) + ')';
        });
        res += '; marked points ' + ptDescs.join(', ');
      }
      if(fig.vlines && fig.vlines.length){
        var vlDescs = fig.vlines.map(function(v){ return (v.label ? v.label + ' ' : '') + 'x = ' + v.x; });
        res += '; vertical lines ' + vlDescs.join(', ');
      }
      if(fig.shade && fig.shade.length) res += '; shaded area';
    } else if(t === 'triangle'){
      var lblArr = Array.isArray(fig.labels) ? fig.labels : (fig.labels && typeof fig.labels === 'object' ? [fig.labels.A, fig.labels.B, fig.labels.C] : []);
      var name = lblArr.length ? lblArr.filter(Boolean).join('') : '';
      res = name ? 'Triangle ' + name : 'Triangle';
      var sideArr = Array.isArray(fig.sides) ? fig.sides : (fig.sides && typeof fig.sides === 'object' ? Object.keys(fig.sides).map(function(k){ return fig.sides[k]; }) : []);
      if(sideArr.some(Boolean)){
        res += ' with sides ' + sideArr.filter(Boolean).join(', ');
      }
      var angArr = Array.isArray(fig.angles) ? fig.angles : (fig.angles && typeof fig.angles === 'object' ? Object.keys(fig.angles).map(function(k){ return fig.angles[k]; }) : []);
      if(angArr.some(Boolean)){
        res += ' and angles ' + angArr.filter(Boolean).join(', ');
      }
      if(fig.right !== undefined || fig.rightAt !== undefined){
        var rv = fig.rightAt || (lblArr[fig.right] ? lblArr[fig.right] : ('vertex ' + ((+fig.right || 0) + 1)));
        res += '; right angle at ' + rv;
      }
      if(fig.ext_angle) res += '; showing exterior angle';
      if(fig.cevian_parallel) res += '; showing line segment parallel to base';
    } else if(t === 'geometry_2d'){
      var shs = fig.shapes || [];
      var shNames = shs.map(function(s){ return s.shape || 'shape'; });
      res = 'Geometric diagram with ' + (shNames.length ? shNames.join(' and ') : 'shapes');
      if(fig.title) res += ': ' + fig.title;
    } else if(t === 'polygon' || t === 'rect'){
      var isRect = t === 'rect' || (fig.w2 && fig.h2);
      var polyName = isRect ? 'Rectangle' : 'Polygon';
      if(Array.isArray(fig.labels) && fig.labels.length) polyName += ' ' + fig.labels.filter(Boolean).join('');
      res = polyName;
      if(Array.isArray(fig.sides) && fig.sides.some(Boolean)) res += ' with sides ' + fig.sides.filter(Boolean).join(', ');
      if(fig.semicircle) res += ' and attached semicircle';
      if(fig.inner) res += ' with inner region';
    } else if(t === 'circle'){
      res = 'Circle';
      if(fig.center) res += ' centered at ' + fig.center;
      if(fig.radius) res += ' with radius ' + fig.radius;
      if(fig.diameter) res += ' with diameter ' + fig.diameter;
      if(fig.sector) res += ' with shaded sector ' + (fig.sector.label || '');
      if(fig.arc) res += ' showing marked arc';
      if(fig.chords && fig.chords.length) res += ' with chords';
      if(fig.chord_segs) res += ' with intersecting chords';
      if(fig.secant_lines) res += ' with secant lines';
      if(fig.rings && fig.rings.length) res += ' with concentric circles';
    } else if(t === 'nested_triangles' || t === 'thales' || t === 'triangle_transversal'){
      res = 'Triangle with parallel transversal line segment';
      if(Array.isArray(fig.labels) && fig.labels.length) res += ' ' + fig.labels.join('');
    } else if(t === 'bowtie' || t === 'hourglass'){
      res = 'Hourglass or bowtie similar triangles with vertical angles';
      if(Array.isArray(fig.labels) && fig.labels.length) res += ' ' + fig.labels.join('');
    } else if(t === 'right_triangle_altitude' || t === 'altitude_hypotenuse' || t === 'geometric_mean'){
      res = 'Right triangle with altitude drawn to hypotenuse';
    } else if(t === 'shadow_similarity' || t === 'indirect_measurement'){
      res = 'Indirect measurement diagram with parallel sunlight rays and shadows';
    } else if(t === 'angle_bisector'){
      res = 'Triangle with an angle bisector';
    } else if(t === 'circle_chords_similarity'){
      res = 'Circle with intersecting chords forming similar triangles';
    } else if(t === 'overlapping_triangles' || t === 'inverted_similar'){
      res = 'Overlapping similar triangles with shared angle';
    } else if(t === 'trapezoid_diagonals'){
      res = 'Trapezoid with diagonals intersecting to form similar triangles';
    } else if(t === 'similar'){
      res = 'Two similar figures side by side';
      if(fig.left && fig.left.caption) res += ' (' + fig.left.caption + ' and ' + (fig.right ? fig.right.caption : '') + ')';
    } else if(t === 'vertex_angles'){
      if(fig.mode === 'vertical') res = 'Vertical angles diagram';
      else if(fig.mode === 'linear') res = 'Linear pair angles diagram along a straight line';
      else res = 'Complementary right-angle split diagram';
    } else if(t === 'transversal' || t === 'lines'){
      res = 'Parallel lines intersected by a transversal line';
    } else if(t === 'bar' || t === 'bars' || t === 'bar_chart'){
      res = 'Bar chart';
      if(fig.title) res += ': ' + fig.title;
      var bData = fig.data || fig.bars || [];
      if((!bData || !bData.length) && Array.isArray(fig.labels) && Array.isArray(fig.values)){
        bData = fig.labels.map(function(lbl, idx){ return { label: lbl, val: fig.values[idx] }; });
      }
      if(bData.length){
        res += ' with categories: ' + bData.map(function(d){ var v = d && (d.val != null ? d.val : d.value); return (d.label || '') + ' (' + (v != null ? v : '') + ')'; }).join(', ');
      }
    } else if(t === 'dots'){
      res = 'Dot diagram showing ' + (fig.total || 'a collection of') + ' items';
      if(fig.groups && fig.groups.length){
        res += ' in groups: ' + fig.groups.map(function(g){ return g.n + ' ' + (g.label || 'items'); }).join(', ');
      }
    } else if(t === 'venn'){
      res = 'Venn diagram' + (fig.title ? ': ' + fig.title : '') + (fig.textA ? '; A: ' + fig.textA : '') + (fig.textB ? '; B: ' + fig.textB : '');
    } else if(t === 'scatter'){
      res = 'Scatter plot' + (fig.title ? ': ' + fig.title : '');
      if(fig.xlabel) res += '; x: ' + fig.xlabel;
      if(fig.ylabel) res += '; y: ' + fig.ylabel;
    } else if(t === 'numberline' || t === 'number_line'){
      var nR = fig.range || [fig.min != null ? fig.min : -5, fig.max != null ? fig.max : 5];
      res = 'Number line from ' + nR[0] + ' to ' + nR[1];
      if(fig.points && fig.points.length) res += ' with marked points';
      if(fig.shade || fig.regions) res += ' with shaded range';
    } else if(t === 'geometry_3d'){
      var solidName = String(fig.solid || 'solid').replace(/_/g, ' ');
      res = 'Three-dimensional ' + solidName;
      if(fig.dims) res += ' with dimensions ' + fig.dims.join(' by ');
      if(fig.radius) res += ' with radius ' + fig.radius;
      if(fig.height) res += ' and height ' + fig.height;
    } else if(t === 'pie'){
      res = 'Pie chart' + (fig.title ? ': ' + fig.title : '');
      if(fig.slices && fig.slices.length){
        res += ' showing ' + fig.slices.map(function(sl){ var sv = sl.val != null ? sl.val : sl.value; return sl.label + ' (' + (sv != null ? sv : '') + ')'; }).join(', ');
      }
    } else if(t === 'box_plot'){
      var bMin = fig.min!=null?fig.min:'', bQ1 = fig.q1!=null?fig.q1:'', bMed = fig.med!=null?fig.med:(fig.median!=null?fig.median:'');
      var bQ3 = fig.q3!=null?fig.q3:'', bMax = fig.max!=null?fig.max:'';
      res = 'Box plot summary: Min ' + bMin + ', Q1 ' + bQ1 + ', Median ' + bMed + ', Q3 ' + bQ3 + ', Max ' + bMax;
      if(fig.outliers && fig.outliers.length) res += ' with ' + fig.outliers.length + ' outlier(s)';
      if(fig.title) res = fig.title + ' — ' + res;
    } else if(t === 'histogram'){
      var bCnt = (fig.bins && fig.bins.length) || (fig.freqs && fig.freqs.length) || (fig.data && fig.data.length) || 0;
      res = 'Histogram with ' + bCnt + ' frequency bins' + (fig.title ? ': ' + fig.title : '');
    } else if(t === 'dot_plot'){
      res = 'Dot plot' + (fig.title ? ': ' + fig.title : '');
      if(fig.xlabel) res += '; x: ' + fig.xlabel;
    } else if(t === 'unit_circle'){
      res = 'Unit circle diagram' + (fig.angle!=null ? ' showing terminal angle ' + fig.angle : '') + (fig.title ? ': ' + fig.title : '');
    } else if(t === 'sinusoid'){
      res = 'Sinusoidal graph' + (fig.amp!=null ? ' with amplitude ' + fig.amp : '') + (fig.period!=null ? ', period ' + fig.period : '') + (fig.midline!=null ? ', midline y = ' + fig.midline : '') + (fig.title ? ': ' + fig.title : '');
    } else if(t === 'normal_curve' || t === 'normal_dist'){
      res = 'Normal distribution bell curve (mean ' + (fig.mean!=null?fig.mean:0) + ', sd ' + (fig.sd!=null?fig.sd:1) + ')' + (fig.title ? ': ' + fig.title : '');
      if(fig.shade) res += ' showing shaded probability region';
    } else if(t === 'slope_field'){
      res = 'Slope field for differential equation dy/dx = ' + (fig.fn || fig.expr || 'f(x,y)') + (fig.title ? ': ' + fig.title : '');
    } else if(t === 'two_way_table'){
      res = 'Two-way frequency table' + (fig.title ? ': ' + fig.title : '');
    } else if(t === 'cumulative_frequency'){
      res = 'Cumulative frequency curve (ogive)' + (fig.title ? ': ' + fig.title : '');
    } else if(t === 'tree_diagram'){
      res = 'Probability tree diagram' + (fig.title ? ': ' + fig.title : '');
    } else if(t === 'bearings'){
      res = 'Compass bearing diagram' + (fig.bearing ? ' showing bearing ' + fig.bearing : '') + (fig.title ? ': ' + fig.title : '');
    } else if(t === 'sign_chart'){
      res = 'Derivative sign chart showing intervals and function behavior' + (fig.title ? ': ' + fig.title : '');
    } else if(t === 'transformation_grid'){
      res = 'Coordinate transformation grid showing object and transformed image' + (fig.title ? ': ' + fig.title : '');
    } else if(t === 'voronoi'){
      res = 'Voronoi diagram with ' + (fig.sites ? fig.sites.length + ' sites' : 'cells') + (fig.title ? ': ' + fig.title : '');
      if(fig.queryPoint) res += ' and marked query point';
    } else if(t === 'argand' || t === 'argand_diagram' || t === 'complex_plane'){
      res = 'Argand diagram on the complex plane (Re vs Im)' + (fig.title ? ': ' + fig.title : '');
      if(fig.points && fig.points.length) res += ' showing ' + fig.points.length + ' complex number(s)';
    } else if(t === 'network_graph' || t === 'weighted_graph' || t === 'graph_network'){
      res = 'Weighted network graph' + (fig.title ? ': ' + fig.title : '');
      if(fig.nodes && fig.nodes.length) res += ' with ' + fig.nodes.length + ' vertices';
    } else {
      res = fig.title || fig.label || 'Mathematical figure';
    }
    if(fig.title && res.indexOf(fig.title) === -1) res = fig.title + ' — ' + res;
    return res.trim() || 'Mathematical diagram';
  }
  window._figA11yLabel = _figA11yLabel;

  function _safeEval(exprInput, xVal){
    try {
      var raw = (exprInput && typeof exprInput === 'object') ? exprInput.fn : exprInput;
      var e = String(raw == null ? '' : raw).trim();
      if(!e || e === 'sp.nan' || e === 'nan' || e === 'NaN' || e === 'None' || e === 'null') return NaN;
      var domMatch = e.match(/^(.*?)\s+for\s+[a-zA-Z]\s+in\s+([\[\(])\s*([^,\]\)]+)(?:\s*,\s*[^,\]\)]+)*\s*,\s*([^,\]\)]+)\s*([\]\)])$/i);
      if(domMatch){
        e = domMatch[1].trim();
        var dMin = parseFloat(domMatch[3]), dMax = parseFloat(domMatch[4]);
        if(isFinite(dMin) && (domMatch[2] === '(' ? xVal <= dMin : xVal < dMin)) return NaN;
        if(isFinite(dMax) && (domMatch[5] === ')' ? xVal >= dMax : xVal > dMax)) return NaN;
      }
      var pyIf = e.match(/^(.*?)\s+if\s+(.*?)\s+else\s+(.*)$/i);
      if(pyIf){
        e = '((' + pyIf[2] + ') ? (' + pyIf[1] + ') : (' + pyIf[3] + '))';
      }
      e = e.replace(/\band\b/g, '&&').replace(/\bor\b/g, '||');
      e = e.replace(/\b(?:sp|np|math|Math)\.Integer\s*\(\s*([^)]+)\s*\)/g, '($1)');
      e = e.replace(/\b(?:sp|np|math|Math)\.Rational\s*\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/g, '(($1)/($2))');
      e = e.replace(/\b(?:sp|np|math|Math)\.log\s*\(\s*([^,()]+)\s*,\s*([^,()]+)\s*\)/g, '(Math.log($1)/Math.log($2))');
      e = e.replace(/\b(?:sp|np|math|Math)\./g, '');
      e = e.replace(/-\s*-/g, '+ ');
      e = e.replace(/\*\*/g, '^');
      e = e.replace(/(^|[^a-zA-Z0-9_])(\d+(?:\.\d+)?)\s*([xtw]\b|\(|(?:sin|cos|tan|asin|acos|atan|sqrt|cbrt|abs|ln|log|log2|log10|exp|pi|PI)\b)/g, '$1$2*$3');
      e = e.replace(/\)\s*(\(|[xtw]\b|\d)/g, ')*$1');
      for(var mi = 0; mi < 3; mi++){
        e = e.replace(/(^|[^a-zA-Z0-9_\.])ln\s*\(/g, '$1Math.log(');
        e = e.replace(/(^|[^a-zA-Z0-9_\.])(sin|cos|tan|asin|acos|atan|atan2|sinh|cosh|tanh|sqrt|cbrt|abs|log|log2|log10|exp|floor|ceil|round|min|max|pow|sign|hypot|trunc)\s*\(/g, '$1Math.$2(');
      }
      e = e.replace(/(^|[^a-zA-Z0-9_\.])(?:pi|PI)([^a-zA-Z0-9_]|$)/g, '$1Math.PI$2');
      e = e.replace(/(^|[^a-zA-Z0-9_\.])e([^a-zA-Z0-9_]|$)/g, '$1Math.E$2');
      for(var pi = 0; pi < 4; pi++){
        var prevE = e;
        e = e.replace(/(\([^()]+\)|[a-zA-Z0-9_\.]+)\s*\^\s*(-?\s*\([^()]+\)|-?\s*[a-zA-Z0-9_\.]+)/g, 'Math.pow($1, $2)');
        if(e === prevE) break;
      }
      e = e.replace(/\^/g, '**');
      var val = (new Function('x', 'Math', 'var t=x,w=x,a=1,b=1,c=0,C=0,k=1,y=0,True=true,False=false,piecewise=function(arr){for(var i=0;i<arr.length;i++){if(arr[i][1])return arr[i][0];}return NaN;}; try { return (' + e + '); } catch(err){ return NaN; }'))(xVal, Math);
      return (typeof val === 'number' && isFinite(val)) ? val : NaN;
    } catch(err){ return NaN; }
  }
  window._safeEval = _safeEval;

  function _formatMathLabel(str){
    if(str == null) return '';
    if(typeof str !== 'string') str = String(str);
    var trimmed = str.trim();
    if(!trimmed || trimmed === 'unknown' || trimmed === 'null' || trimmed === 'undefined') return '';
    return _prettifyMathText(trimmed).trim();
  }
  window._formatMathLabel = _formatMathLabel;

  function _solvePointLabels(points, fns, xl, yl, W, H, pad, sx, sy, ox, oy, seedPlaced, geomOpts){
    var placed = Array.isArray(seedPlaced) ? seedPlaced.slice() : [];
    var gOpt = geomOpts || {};
    var padL = gOpt.padL != null ? gOpt.padL : pad;
    var padR = gOpt.padR != null ? gOpt.padR : pad;
    var padT = gOpt.padT != null ? gOpt.padT : pad;
    var padB = gOpt.padB != null ? gOpt.padB : pad;
    var vlines = Array.isArray(gOpt.vlines) ? gOpt.vlines : [];
    var hlines = Array.isArray(gOpt.hlines) ? gOpt.hlines : [];
    var asymX = gOpt.asymptoteX;

    function getBBox(px, py, text, pos, fs){
      var charW = (fs || 9.5) * 0.56;
      var w = text.length * charW + 6;
      var h = (fs || 9.5) + 3;
      var x = px + pos.dx;
      var y = py + pos.dy;
      var x1, x2;
      if(pos.anchor === 'middle'){ x1 = x - w/2; x2 = x + w/2; }
      else if(pos.anchor === 'end'){ x1 = x - w; x2 = x; }
      else { x1 = x; x2 = x + w; }
      if(x1 < 6){ var shL = 6 - x1; x += shL; x1 += shL; x2 += shL; }
      if(x2 > W - 6){ var shR = x2 - (W - 6); x -= shR; x1 -= shR; x2 -= shR; }
      var y1 = y - h + 2, y2 = y + 3;
      if(y1 < 12){ var shT = 12 - y1; y += shT; y1 += shT; y2 += shT; }
      if(y2 > H - 6){ var shB = y2 - (H - 6); y -= shB; y1 -= shB; y2 -= shB; }
      return { x1: x1, x2: x2, y1: y1, y2: y2, x: x, y: y, anchor: pos.anchor, w: w, h: h };
    }
    function aabbOverlap(b1, b2){
      var ovX = Math.max(0, Math.min(b1.x2, b2.x2) - Math.max(b1.x1, b2.x1));
      var ovY = Math.max(0, Math.min(b1.y2, b2.y2) - Math.max(b1.y1, b2.y1));
      return ovX * ovY;
    }

    var results = [];
    for(var idx=0; idx<points.length; idx++){
      var p = points[idx];
      if(!p.label){ results.push(null); continue; }
      var fmtLabel = _formatMathLabel(p.label);
      var px = padL + (p.x - xl[0]) * sx;
      var py = padT + (yl[1] - p.y) * sy;

      var isMin = false, isMax = false;
      if(fns && fns[0] && fns[0].fn){
        var h_step = Math.max(0.05, (xl[1] - xl[0]) * 0.02);
        var yL = _safeEval(fns[0].fn, p.x - h_step);
        var yR = _safeEval(fns[0].fn, p.x + h_step);
        if(!isNaN(yL) && !isNaN(yR)){
          if(yL > p.y + 0.001 && yR > p.y + 0.001) isMin = true;
          if(yL < p.y - 0.001 && yR < p.y - 0.001) isMax = true;
        }
      }

      var candidates = [
        { name: 'TL',  dx: -8,  dy: -8,  anchor: 'end' },
        { name: 'TR',  dx: 8,   dy: -8,  anchor: 'start' },
        { name: 'BL',  dx: -8,  dy: 15,  anchor: 'end' },
        { name: 'BR',  dx: 8,   dy: 15,  anchor: 'start' },
        { name: 'UL',  dx: -8,  dy: -3,  anchor: 'end' },
        { name: 'UR',  dx: 8,   dy: -3,  anchor: 'start' },
        { name: 'DL',  dx: -8,  dy: 11,  anchor: 'end' },
        { name: 'DR',  dx: 8,   dy: 11,  anchor: 'start' },
        { name: 'T',   dx: 0,   dy: -11, anchor: 'middle' },
        { name: 'B',   dx: 0,   dy: 17,  anchor: 'middle' },
        { name: 'R',   dx: 10,  dy: 4,   anchor: 'start' },
        { name: 'L',   dx: -10, dy: 4,   anchor: 'end' },
        { name: 'TL2', dx: -12, dy: -15, anchor: 'end' },
        { name: 'TR2', dx: 12,  dy: -15, anchor: 'start' },
        { name: 'BL2', dx: -12, dy: 22,  anchor: 'end' },
        { name: 'BR2', dx: 12,  dy: 22,  anchor: 'start' },
        { name: 'R2',  dx: 16,  dy: 4,   anchor: 'start' },
        { name: 'L2',  dx: -16, dy: 4,   anchor: 'end' },
        { name: 'T2',  dx: 0,   dy: -20, anchor: 'middle' },
        { name: 'B2',  dx: 0,   dy: 25,  anchor: 'middle' }
      ];
      if(p.dx !== undefined && p.dy !== undefined){
        candidates.unshift({ name: 'CUSTOM', dx: p.dx, dy: p.dy, anchor: p.anchor || 'start', bonus: -600 });
      }

      var bestCand = null;
      var bestPenalty = Infinity;

      for(var ci=0; ci<candidates.length; ci++){
        var cand = candidates[ci];
        var cBox = getBBox(px, py, fmtLabel, cand, 9.5);
        var penalty = cand.bonus || 0;

        // 1. Overlap with previously placed labels and tick boxes
        for(var pi=0; pi<placed.length; pi++){
          var ov = aabbOverlap(cBox, placed[pi]);
          if(ov > 0) penalty += 25000 + ov * 100;
        }

        // 2. Off-plot-area penalties
        if(cBox.x1 < padL - 10) penalty += 4000 + (padL - 10 - cBox.x1) * 35;
        if(cBox.x2 > W - padR + 10) penalty += 4000 + (cBox.x2 - (W - padR + 10)) * 35;
        if(cBox.y1 < padT - 8) penalty += 4000 + (padT - 8 - cBox.y1) * 35;
        if(cBox.y2 > H - padB + 8) penalty += 4000 + (cBox.y2 - (H - padB + 8)) * 35;

        // 3. Proximity / cover of ANY point circle (including own circle)
        for(var oi=0; oi<points.length; oi++){
          var op = points[oi];
          var opx = padL + (op.x - xl[0]) * sx;
          var opy = padT + (yl[1] - op.y) * sy;
          if(opx >= cBox.x1 - 5 && opx <= cBox.x2 + 5 && opy >= cBox.y1 - 5 && opy <= cBox.y2 + 5){
            penalty += 12000;
          }
          if(oi !== idx){
            if(cBox.anchor !== 'end' && op.x > p.x && (cBox.x2 > opx - 10) && Math.abs(opy - py) < 18){
              penalty += 1800;
            }
            if(cBox.anchor !== 'start' && op.x < p.x && (cBox.x1 < opx + 10) && Math.abs(opy - py) < 18){
              penalty += 1800;
            }
          }
        }

        // 4. Never straddle or touch the y-axis line (x = ox) or x-axis line (y = oy)
        if(cBox.x1 < ox + 2.5 && cBox.x2 > ox - 2.5){
          penalty += 8000;
        }
        if(cBox.y1 < oy + 2.5 && cBox.y2 > oy - 2.5){
          penalty += 8000;
        }

        // 5. Never straddle or touch any vertical/horizontal reference line or asymptote
        if(asymX != null){
          var axPx0 = padL + (asymX - xl[0]) * sx;
          if(cBox.x1 < axPx0 + 3 && cBox.x2 > axPx0 - 3) penalty += 8000;
        }
        for(var vi=0; vi<vlines.length; vi++){
          if(vlines[vi] && vlines[vi].x != null){
            var vpx = padL + (vlines[vi].x - xl[0]) * sx;
            if(cBox.x1 < vpx + 3 && cBox.x2 > vpx - 3) penalty += 8000;
          }
        }
        for(var hi=0; hi<hlines.length; hi++){
          if(hlines[hi] && hlines[hi].y != null){
            var hpy = padT + (yl[1] - hlines[hi].y) * sy;
            if(cBox.y1 < hpy + 3 && cBox.y2 > hpy - 3) penalty += 8000;
          }
        }

        // 6. Never cross or sit on any function curve
        if(Array.isArray(fns)){
          var midY = (cBox.y1 + cBox.y2) / 2;
          for(var fi=0; fi<fns.length; fi++){
            var fnExpr = fns[fi] && fns[fi].fn;
            if(!fnExpr) continue;
            for(var si=0; si<=6; si++){
              var sPx = (cBox.x1 - 2) + (cBox.x2 - cBox.x1 + 4) * (si / 6);
              var sX = xl[0] + (sPx - padL) / sx;
              var sY = _safeEval(fnExpr, sX);
              if(isFinite(sY)){
                var cPy = padT + (yl[1] - sY) * sy;
                if(cPy >= cBox.y1 - 2.5 && cPy <= cBox.y2 + 2.5){
                  penalty += 6000 + (8 - Math.min(8, Math.abs(cPy - midY))) * 150;
                }
              }
            }
          }
        }

        // 7. Extrema preference
        if(isMin){
          if(cand.dy > 0) penalty -= 400;
          else if(cand.dy < 0) penalty += 1200;
        }
        if(isMax){
          if(cand.dy < 0) penalty -= 400;
          else if(cand.dy > 0) penalty += 1200;
        }

        // 8. Slight preference for compact offsets when penalty is tied
        penalty += (Math.abs(cand.dx) + Math.abs(cand.dy)) * 2;

        if(penalty < bestPenalty){
          bestPenalty = penalty;
          bestCand = cBox;
        }
      }

      placed.push(bestCand);
      results.push({ x: bestCand.x, y: bestCand.y, anchor: bestCand.anchor, label: fmtLabel, box: bestCand });
    }
    results._placedBoxes = placed;
    return results;
  }
  window._solvePointLabels = _solvePointLabels;

  window._renderFig=function(fig){
    try{
    if(!fig) return '';
    if(typeof fig==='string') return fig;
    if(fig.type==='3d_solid'){
      var sCopy = {};
      for(var k3 in fig){ if(Object.prototype.hasOwnProperty.call(fig, k3)) sCopy[k3] = fig[k3]; }
      sCopy.type = 'geometry_3d';
      sCopy.solid = fig.shape || fig.solid || 'cylinder';
      sCopy.labels = sCopy.labels || {};
      if(fig.r != null && !sCopy.labels.r) sCopy.labels.r = 'r = ' + fig.r;
      if(fig.h != null && !sCopy.labels.h) sCopy.labels.h = 'h = ' + fig.h;
      if(fig.l != null && !sCopy.labels.l) sCopy.labels.l = 'l = ' + fig.l;
      if(fig.w != null && !sCopy.labels.w) sCopy.labels.w = 'w = ' + fig.w;
      sCopy.radius = fig.r != null ? fig.r : fig.radius;
      sCopy.height = fig.h != null ? fig.h : fig.height;
      sCopy.dims = fig.dims || [fig.l || (fig.r ? fig.r*2 : 4), fig.w || (fig.r ? fig.r*2 : 3), fig.h || 4];
      fig = sCopy;
    } else if(fig.type==='area_between'){
      var aCopy = {};
      for(var ka in fig){ if(Object.prototype.hasOwnProperty.call(fig, ka)) aCopy[ka] = fig[ka]; }
      aCopy.type = 'fn';
      aCopy.fns = aCopy.fns || [fig.fn1 || 'x', fig.fn2 || 'x^2'];
      var abDomain = fig.domain || fig.shade_x || [-2, 2];
      aCopy.xrange = fig.xrange || [abDomain[0] - 1, abDomain[1] + 1];
      aCopy.shade = [{ fn: aCopy.fns[0], fn2: aCopy.fns[1], x1: abDomain[0], x2: abDomain[1] }];
      fig = aCopy;
    }
    /* one shared entry point: figures authored in the richer renderMathFigure schema
       (function_graph / geometry_2d / geometry_3d / bar_chart / pie / number_line / table /
        box_plot / histogram / dot_plot / unit_circle / sinusoid / normal_curve / slope_field / two_way_table)
       are routed to the same renderers used by the AI test generator and lesson figures,
       so every figure — regardless of which schema authored it — renders through one call surface. */
    if(typeof window.renderMathFigure==='function' &&
       (fig.type==='function_graph'||fig.type==='functionGraph'||fig.type==='plot'||fig.type==='fn_graph'||
        fig.type==='geometry_2d'||fig.type==='geometry2d'||fig.type==='geom2d'||
        fig.type==='geometry_3d'||fig.type==='geometry3d'||fig.type==='geom3d'||
        fig.type==='bar_chart'||fig.type==='barChart'||fig.type==='barchart'||
        fig.type==='scatter'||fig.type==='scatter_plot'||fig.type==='scatterPlot'||fig.type==='scatterplot'||
        fig.type==='pie'||fig.type==='pie_chart'||fig.type==='pieChart'||
        fig.type==='number_line'||fig.type==='numberLine'||
        fig.type==='table'||
        fig.type==='box_plot'||fig.type==='boxPlot'||fig.type==='boxplot'||fig.type==='box'||
        fig.type==='histogram'||
        fig.type==='dot_plot'||fig.type==='dotPlot'||fig.type==='dotplot'||
        fig.type==='unit_circle'||fig.type==='unitCircle'||fig.type==='unitcircle'||
        fig.type==='sinusoid'||
        fig.type==='normal_curve'||fig.type==='normalCurve'||fig.type==='normal_dist'||fig.type==='normalDist'||fig.type==='normal'||
        fig.type==='slope_field'||fig.type==='slopeField'||fig.type==='slopefield'||
        fig.type==='two_way_table'||fig.type==='twoWayTable'||fig.type==='twowaytable'||
        fig.type==='cumulative_frequency'||fig.type==='cumulativeFrequency'||fig.type==='cumulative_freq'||fig.type==='cumulativeFreq'||fig.type==='ogive'||
        fig.type==='tree_diagram'||fig.type==='treeDiagram'||fig.type==='tree'||
        fig.type==='bearings'||fig.type==='bearing'||fig.type==='bearingDiagram'||fig.type==='bearing_diagram'||
        fig.type==='sign_chart'||fig.type==='signChart'||
        fig.type==='transformation_grid'||fig.type==='transformationGrid'||fig.type==='transformation'||
        fig.type==='voronoi'||
        fig.type==='argand'||fig.type==='argand_diagram'||fig.type==='complex_plane'||
        fig.type==='network_graph'||fig.type==='weighted_graph'||fig.type==='graph_network'||
        fig.type==='shaded_region'||fig.type==='qudrat_shaded'||
        fig.type==='conic_section'||fig.type==='conic')){
      var inner=window.renderMathFigure(fig);
      if(!inner) return '';
      if(fig.type==='table'||fig.type==='two_way_table'||fig.type==='twoWayTable'||fig.type==='twowaytable') return inner;
      var capW=fig.width||fig.w||460;
      return '<span style="display:inline-block;width:100%;max-width:'+capW+'px">'+inner+'</span>';
    }
    var isCoordGraph = (fig.type==='fn'||fig.type==='axes'||fig.type==='graph');
    var W = (+fig.w>40 ? (isCoordGraph ? Math.max(380, +fig.w) : +fig.w) : (isCoordGraph ? 400 : (fig.type==='similar'||fig.type==='polygon'||fig.type==='rect'?340:280)));
    var baseH = (+fig.h>40 ? (isCoordGraph ? Math.max(240, +fig.h) : +fig.h) : (isCoordGraph ? 250 : 210));
    var H = baseH;
    var normFns = [], legendRows = [];
    if(isCoordGraph){
      var rawFns0 = Array.isArray(fig.fns) ? fig.fns.slice() : (Array.isArray(fig.lines) ? fig.lines.slice() : []);
      if(!rawFns0.length && fig.fn) rawFns0.push(fig.fn);
      if(fig.fn2) rawFns0.push({ fn: fig.fn2, dashed: '4,3' });
      var fnLabs0 = Array.isArray(fig.labels) ? fig.labels : [];
      normFns = rawFns0.map(function(f, idx){
        var o = typeof f === 'string' ? { fn: f } : (f ? Object.assign({}, f) : {});
        if(!o.label && fnLabs0[idx]) o.label = fnLabs0[idx];
        return o;
      });
      var legendItems = [];
      normFns.forEach(function(f, fi){
        if(f && f.label){
          var lbl = _formatMathLabel(f.label);
          if(lbl) legendItems.push({ label: lbl, color: f.color || FIG_SERIES[fi % FIG_SERIES.length], dash: f.dashed || f.dash || '' });
        }
      });
      (fig.vlines||[]).forEach(function(vl){
        if(vl && vl.label){
          var lbl = _formatMathLabel(vl.label);
          if(lbl) legendItems.push({ label: lbl, color: vl.color || FIG_MUTED, dash: vl.dash || '4,3' });
        }
      });
      (fig.hlines||[]).forEach(function(hl){
        if(hl && hl.label){
          var lbl = _formatMathLabel(hl.label);
          if(lbl) legendItems.push({ label: lbl, color: hl.color || FIG_MUTED, dash: hl.dash || '4,3' });
        }
      });
      var curRow = [], curRowW = 0;
      legendItems.forEach(function(it){
        var itW = 24 + it.label.length * 5.4;
        if(curRow.length > 0 && (curRow.length >= 2 || curRowW + 18 + itW > W - 24)){
          legendRows.push(curRow);
          curRow = [it];
          curRowW = itW;
        } else {
          if(curRow.length > 0) curRowW += 18;
          curRow.push(it);
          curRowW += itW;
        }
      });
      if(curRow.length > 0) legendRows.push(curRow);
      if(legendRows.length > 0) H = baseH + legendRows.length * 18 + 10;
    }
    var a11y=_figA11yLabel(fig);
    var s='<svg class="mfig-svg" shape-rendering="geometricPrecision" role="img" aria-label="'+esc(a11y)+'" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:var(--font-sans, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif);background:'+FIG_BG+';border-radius:8px;border:1px solid '+FIG_BORDER+';box-shadow:0 1px 3px rgba(0,0,0,0.04);">';
    s+='<title>'+esc(a11y)+'</title>';
    /* ── coordinate axes + function plots ── */
    if(isCoordGraph){
      var xl=fig.xrange||fig.xRange||fig.xlim||fig.xLim||(fig.xmin!=null&&fig.xmax!=null?[fig.xmin,fig.xmax]:[-5,5]);
      var yl=fig.yrange||fig.yRange||fig.ylim||fig.yLim||(fig.ymin!=null&&fig.ymax!=null?[fig.ymin,fig.ymax]:[-5,5]);
      var padL=42, padR=26, padT=fig.title?34:22, padB=28;
      var plotH=baseH;
      var gw=W-padL-padR, gh=plotH-padT-padB;
      var sx=gw/((xl[1]-xl[0])||1), sy=gh/((yl[1]-yl[0])||1);
      var ox=Math.max(padL, Math.min(W-padR, padL+(-xl[0])*sx));
      var oy=Math.max(padT, Math.min(plotH-padB, padT+(yl[1])*sy));
      var COLS=FIG_SERIES;
      var cleanPts = [];
      (fig.points||[]).forEach(function(p){
        if(!p) return;
        var pxVal = (p.x !== null && p.x !== '' && p.x !== undefined) ? +p.x : NaN;
        if(!isFinite(pxVal)) return;
        var pyVal = (p.y !== null && p.y !== '' && p.y !== undefined) ? +p.y : NaN;
        if(!isFinite(pyVal) && normFns.length > 0){
          pyVal = _safeEval(normFns[0].fn, pxVal);
        }
        if(!isFinite(pyVal)) return;
        var lbl = (p.label && p.label !== 'undefined' && p.label !== 'null') ? String(p.label) : '';
        cleanPts.push({ x: pxVal, y: pyVal, label: lbl, open: p.open, color: p.color, r: p.r, dx: p.dx, dy: p.dy, anchor: p.anchor });
      });
      if((cleanPts.length === 0 || fig.showKeyPoints) && normFns.length > 0 && normFns[0].fn){
        var fn0Expr = normFns[0].fn;
        var hasNearPt = function(x0, y0){
          return cleanPts.some(function(cp){ return Math.abs(cp.x - x0) < (xl[1]-xl[0])*0.04 && Math.abs(cp.y - y0) < (yl[1]-yl[0])*0.04; });
        };
        if(xl[0] <= 0 && xl[1] >= 0){
          var yInt = _safeEval(fn0Expr, 0);
          if(isFinite(yInt) && yInt >= yl[0] && yInt <= yl[1] && !hasNearPt(0, yInt)){
            cleanPts.push({ x: 0, y: Math.round(yInt*100)/100, label: fig.showKeyPoints ? ('(0, ' + (Math.round(yInt*100)/100) + ')') : '', color: FIG_INDIGO2, r: 3.4 });
          }
        }
        var nScan = 200, dxScan = (xl[1] - xl[0]) / nScan;
        var prevY = _safeEval(fn0Expr, xl[0]), prevSlope = null;
        for(var ks = 1; ks <= nScan; ks++){
          var curX = xl[0] + ks * dxScan;
          var curY = _safeEval(fn0Expr, curX);
          if(isFinite(prevY) && isFinite(curY) && Math.abs(curY - prevY) < (yl[1] - yl[0]) * 0.4){
            if((prevY <= 0 && curY >= 0) || (prevY >= 0 && curY <= 0)){
              var rX = Math.abs(curY - prevY) > 1e-9 ? (curX - dxScan + (-prevY / (curY - prevY)) * dxScan) : (curX - 0.5*dxScan);
              var rXRound = Math.round(rX * 100) / 100;
              if(Math.abs(_safeEval(fn0Expr, rXRound)) < (yl[1]-yl[0])*0.05 && !hasNearPt(rXRound, 0)){
                cleanPts.push({ x: rXRound, y: 0, label: fig.showKeyPoints ? ('(' + rXRound + ', 0)') : '', color: FIG_INDIGO2, r: 3.4 });
              }
            }
            var curSlope = (curY - prevY) / dxScan;
            if(prevSlope !== null && ((prevSlope > 1e-4 && curSlope < -1e-4) || (prevSlope < -1e-4 && curSlope > 1e-4))){
              var extX = Math.round((curX - 0.5 * dxScan) * 100) / 100;
              var extY = Math.round(_safeEval(fn0Expr, extX) * 100) / 100;
              if(isFinite(extY) && extY >= yl[0] && extY <= yl[1] && !hasNearPt(extX, extY)){
                var isMax = prevSlope > 0 && curSlope < 0;
                cleanPts.push({ x: extX, y: extY, label: fig.showKeyPoints ? ((isMax ? 'Max (' : 'Min (') + extX + ', ' + extY + ')') : '', color: FIG_AMBER, r: 3.8 });
              }
            }
            prevSlope = curSlope;
          } else {
            prevSlope = null;
          }
          prevY = curY;
        }
      }
      if(fig.title){
        s+=_svgTitle(fig.title, W, 16, 10.5, FIG_INK);
      }
      /* 1. Shaded regions (drawn first so grid, axes, curves, and labels sit cleanly on top) */
      var shadeList = Array.isArray(fig.shade) ? fig.shade : (fig.shade ? [fig.shade] : []);
      shadeList.forEach(function(r){
        var steps2=80,pts2=[];
        var rx1 = r.x1!=null?r.x1:(r.a!=null?r.a:(r.from!=null&&typeof r.from==='number'?r.from:xl[0]));
        var rx2 = r.x2!=null?r.x2:(r.b!=null?r.b:(r.to!=null&&typeof r.to==='number'?r.to:xl[1]));
        var rFn = (r.fn && r.fn !== 'fn0') ? r.fn : ((normFns[0] && normFns[0].fn) || 'x');
        var rFn2 = (r.fn2 && r.fn2 !== 'fn1') ? r.fn2 : (r.to === 'fn1' && normFns[1] ? normFns[1].fn : null);
        if(rFn2){
          for(var si2=0;si2<=steps2;si2++){var xx2=rx1+(rx2-rx1)*si2/steps2;var yy2=_safeEval(rFn, xx2);if(isNaN(yy2)) continue;var cy2=Math.max(yl[0],Math.min(yl[1],yy2));pts2.push((padL+(xx2-xl[0])*sx).toFixed(1)+','+(padT+(yl[1]-cy2)*sy).toFixed(1));}
          for(var si3=steps2;si3>=0;si3--){var xx3=rx1+(rx2-rx1)*si3/steps2;var yy3=_safeEval(rFn2, xx3);if(isNaN(yy3)) continue;var cy3=Math.max(yl[0],Math.min(yl[1],yy3));pts2.push((padL+(xx3-xl[0])*sx).toFixed(1)+','+(padT+(yl[1]-cy3)*sy).toFixed(1));}
        } else {
          for(var si2=0;si2<=steps2;si2++){var xx2=rx1+(rx2-rx1)*si2/steps2;var yy2=_safeEval(rFn, xx2);if(isNaN(yy2)) continue;var cy2=Math.max(yl[0],Math.min(yl[1],yy2));pts2.push((padL+(xx2-xl[0])*sx).toFixed(1)+','+(padT+(yl[1]-cy2)*sy).toFixed(1));}
          pts2.push((padL+(rx2-xl[0])*sx).toFixed(1)+','+oy.toFixed(1));pts2.push((padL+(rx1-xl[0])*sx).toFixed(1)+','+oy.toFixed(1));
        }
        if(pts2.length>2) s+='<polygon points="'+pts2.join(' ')+'" fill="'+(r.color||FIG_INDIGO_FILL2)+'"/>';
      });
      /* 2. Grid */
      s+='<g stroke="'+FIG_GRID+'" stroke-width="0.5" stroke-opacity="0.75">';
      var gStepX = Math.max(1, Math.ceil((xl[1]-xl[0])/16));
      var gStepY = Math.max(1, Math.ceil((yl[1]-yl[0])/16));
      for(var gx=Math.ceil(xl[0]/gStepX)*gStepX;gx<=xl[1];gx+=gStepX){var px=padL+(gx-xl[0])*sx;s+='<line x1="'+px.toFixed(1)+'" y1="'+padT+'" x2="'+px.toFixed(1)+'" y2="'+(plotH-padB)+'"/>';}
      for(var gy=Math.ceil(yl[0]/gStepY)*gStepY;gy<=yl[1];gy+=gStepY){var py=padT+(yl[1]-gy)*sy;s+='<line x1="'+padL+'" y1="'+py.toFixed(1)+'" x2="'+(W-padR)+'" y2="'+py.toFixed(1)+'"/>';}
      s+='</g>';
      /* 3. Axes */
      s+='<line x1="'+padL+'" y1="'+oy.toFixed(1)+'" x2="'+(W-padR)+'" y2="'+oy.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.25" marker-end="url(#arr)"/>';
      s+='<line x1="'+ox.toFixed(1)+'" y1="'+(plotH-padB)+'" x2="'+ox.toFixed(1)+'" y2="'+padT+'" stroke="'+FIG_INK+'" stroke-width="1.25" marker-end="url(#arr2)"/>';
      s+='<defs><marker id="arr" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M1,1 L5,3 L1,5 Z" fill="'+FIG_INK+'"/></marker><marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="2" orient="auto"><path d="M1,5 L3,1 L5,5 Z" fill="'+FIG_INK+'"/></marker></defs>';
      /* 4. Tick labels */
      var _step=function(span,px){
        var room=Math.max(3,Math.floor(px/28));
        var raw=Math.ceil(span/room);
        return [1,2,5,10,20,25,50,100,200,500].find(function(n){return n>=raw;})||Math.ceil(raw/10)*10;
      };
      var stepX=_step(xl[1]-xl[0],gw), stepY=_step(yl[1]-yl[0],gh);
      var seedBoxes = [
        { x1: W-padR+2, x2: W-padR+18, y1: oy-8, y2: oy+6 },
        { x1: ox+2, x2: ox+16, y1: padT-16, y2: padT-2 }
      ];
      if(fig.title) seedBoxes.push({ x1: 8, x2: W-8, y1: 2, y2: 22 });
      s+='<g font-size="8.5" font-weight="500" fill="'+FIG_MUTED+'" text-anchor="middle">';
      for(var tx=Math.ceil(xl[0]);tx<=Math.floor(xl[1]);tx++){
        if(tx===0||tx%stepX!==0)continue;
        var tpx=padL+(tx-xl[0])*sx;
        if(tpx<padL+6||tpx>W-padR-6)continue;
        s+='<line x1="'+tpx.toFixed(1)+'" y1="'+(oy-3).toFixed(1)+'" x2="'+tpx.toFixed(1)+'" y2="'+(oy+3).toFixed(1)+'" stroke="'+FIG_MUTED+'" stroke-width="0.75"/>';
        var skipTx = cleanPts.some(function(cp){ return cp.label && Math.abs(cp.x - tx) < 0.05 && Math.abs(cp.y) < 0.05; });
        if(!skipTx){
          var txStr = String(tx);
          var txW = txStr.length * 5.2 + 4;
          seedBoxes.push({ x1: tpx - txW/2, x2: tpx + txW/2, y1: oy + 2, y2: oy + 16 });
          s+='<text x="'+tpx.toFixed(1)+'" y="'+(oy+13).toFixed(1)+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5" stroke-linejoin="round">'+esc(txStr)+'</text>';
        }
      }
      s+='</g><g font-size="8.5" font-weight="500" fill="'+FIG_MUTED+'" text-anchor="end">';
      for(var ty=Math.ceil(yl[0]);ty<=Math.floor(yl[1]);ty++){
        if(ty===0||ty%stepY!==0)continue;
        var tpy=padT+(yl[1]-ty)*sy;
        if(tpy<padT+6||tpy>plotH-padB-6)continue;
        s+='<line x1="'+(ox-3).toFixed(1)+'" y1="'+tpy.toFixed(1)+'" x2="'+(ox+3).toFixed(1)+'" y2="'+tpy.toFixed(1)+'" stroke="'+FIG_MUTED+'" stroke-width="0.75"/>';
        var skipTy = cleanPts.some(function(cp){ return cp.label && Math.abs(cp.y - ty) < 0.05 && Math.abs(cp.x) < 0.05; });
        if(!skipTy){
          var tyStr = String(ty);
          var tyW = tyStr.length * 5.2 + 5;
          seedBoxes.push({ x1: ox - 5 - tyW, x2: ox - 2, y1: tpy - 5, y2: tpy + 5 });
          s+='<text x="'+(ox-5).toFixed(1)+'" y="'+(tpy+3).toFixed(1)+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5" stroke-linejoin="round">'+esc(tyStr)+'</text>';
        }
      }
      s+='</g>';
      s+='<text x="'+(W-padR+8)+'" y="'+(oy+4).toFixed(1)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2">x</text>';
      s+='<text x="'+(ox+6).toFixed(1)+'" y="'+(padT-6)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2">y</text>';
      /* 5. Reference lines & asymptotes (lines drawn before curves/labels) */
      if(fig.asymptoteX!=null){
        var axPx=padL+(fig.asymptoteX-xl[0])*sx;
        if(axPx>=padL && axPx<=W-padR){
          s+='<line x1="'+axPx.toFixed(1)+'" y1="'+padT+'" x2="'+axPx.toFixed(1)+'" y2="'+(plotH-padB)+'" stroke="'+FIG_AMBER+'" stroke-width="1.3" stroke-dasharray="4,3"/>';
        }
      }
      (fig.hlines||[]).forEach(function(hl){
        var py2=padT+(yl[1]-hl.y)*sy;
        if(py2>=padT-2 && py2<=plotH-padB+2){
          s+='<line x1="'+padL+'" y1="'+py2.toFixed(1)+'" x2="'+(W-padR)+'" y2="'+py2.toFixed(1)+'" stroke="'+(hl.color||FIG_MUTED)+'" stroke-width="1.2" stroke-dasharray="'+(hl.dash||'4,3')+'"/>';
        }
      });
      (fig.vlines||[]).forEach(function(vl){
        var px2=padL+(vl.x-xl[0])*sx;
        if(px2>=padL-2 && px2<=W-padR+2){
          s+='<line x1="'+px2.toFixed(1)+'" y1="'+padT+'" x2="'+px2.toFixed(1)+'" y2="'+(plotH-padB)+'" stroke="'+(vl.color||FIG_MUTED)+'" stroke-width="1.2" stroke-dasharray="'+(vl.dash||'4,3')+'"/>';
        }
      });
      /* 6. Function curve polylines (breaking on vertical asymptotes / out-of-range) */
      var ySpan = (yl[1] - yl[0]) || 1;
      normFns.forEach(function(f,fi){
        var col=f.color||COLS[fi%COLS.length];
        var fDash=f.dashed||f.dash;
        var pts=[],steps=320,prevYy=null,prevXx=null;
        for(var si=0;si<=steps;si++){
          var xx=xl[0]+(xl[1]-xl[0])*si/steps;
          var yy=_safeEval(f.fn, xx);
          var isJump = (prevYy !== null && isFinite(yy) && Math.abs(yy - prevYy) > ySpan * 0.65);
          var inBounds = isFinite(yy) && !isNaN(yy) && yy >= yl[0] - 0.04*ySpan && yy <= yl[1] + 0.04*ySpan;
          if(!inBounds || isJump){
            if(pts.length >= 1 && prevYy !== null && isFinite(yy) && !isJump){
              var targetY = yy > yl[1] ? yl[1] + 0.02*ySpan : yl[0] - 0.02*ySpan;
              var tInterp = (targetY - prevYy) / ((yy - prevYy) || 1e-9);
              if(tInterp > 0 && tInterp <= 1){
                var xEdge = prevXx + tInterp * (xx - prevXx);
                pts.push((padL+(xEdge-xl[0])*sx).toFixed(1)+','+(padT+(yl[1]-targetY)*sy).toFixed(1));
              }
            }
            if(pts.length>1){
              s+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+col+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"'+(fDash?' stroke-dasharray="'+(typeof fDash==='string'?fDash:'4,3')+'"':'')+'/>';
            }
            pts=[];
            prevYy = (!isFinite(yy)||isNaN(yy)||isJump) ? null : yy;
            prevXx = xx;
            if(inBounds && !isJump){
              pts.push((padL+(xx-xl[0])*sx).toFixed(1)+','+(padT+(yl[1]-yy)*sy).toFixed(1));
            }
            continue;
          }
          if(pts.length === 0 && prevYy !== null && isFinite(prevYy) && (prevYy < yl[0] - 0.04*ySpan || prevYy > yl[1] + 0.04*ySpan)){
            var entryY = prevYy > yl[1] ? yl[1] + 0.02*ySpan : yl[0] - 0.02*ySpan;
            var tEntry = (entryY - prevYy) / ((yy - prevYy) || 1e-9);
            if(tEntry >= 0 && tEntry < 1){
              var xEntry = prevXx + tEntry * (xx - prevXx);
              pts.push((padL+(xEntry-xl[0])*sx).toFixed(1)+','+(padT+(yl[1]-entryY)*sy).toFixed(1));
            }
          }
          prevYy = yy;
          prevXx = xx;
          pts.push((padL+(xx-xl[0])*sx).toFixed(1)+','+(padT+(yl[1]-yy)*sy).toFixed(1));
        }
        if(pts.length>1)s+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+col+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"'+(fDash?' stroke-dasharray="'+(typeof fDash==='string'?fDash:'4,3')+'"':'')+'/>';
      });
      /* 7. Point circles */
      cleanPts.forEach(function(p){
        var px=padL+(p.x-xl[0])*sx,py=padT+(yl[1]-p.y)*sy;
        s+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="'+(p.r||4.2)+'" fill="'+(p.open?FIG_BG:(p.color||FIG_INDIGO2))+'" stroke="'+(p.open?(p.color||FIG_INDIGO2):FIG_BG)+'" stroke-width="'+(p.open?1.8:2)+'"/>';
      });
      /* 8. Obstacle-free point label placement */
      var solvedLabels = _solvePointLabels(cleanPts, normFns, xl, yl, W, plotH, padL, sx, sy, ox, oy, seedBoxes, {
        padL: padL, padR: padR, padT: padT, padB: padB,
        vlines: fig.vlines, hlines: fig.hlines, asymptoteX: fig.asymptoteX
      });
      cleanPts.forEach(function(p, pIdx){
        var sl = solvedLabels[pIdx];
        if(sl && sl.label){
          s+='<text x="'+sl.x.toFixed(1)+'" y="'+sl.y.toFixed(1)+'" font-size="9.5" font-weight="600" fill="'+FIG_INK+'" text-anchor="'+sl.anchor+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'+esc(sl.label)+'</text>';
        }
      });
      /* 9. Dedicated Legend Footer below the plot for all curve, vline, and hline equations */
      if(legendRows.length > 0){
        s+='<line x1="16" y1="'+(baseH - 2)+'" x2="'+(W - 16)+'" y2="'+(baseH - 2)+'" stroke="'+FIG_BORDER+'" stroke-width="1"/>';
        legendRows.forEach(function(row, rIdx){
          var rowY = baseH + 13 + rIdx * 18;
          var totalRowW = 0;
          row.forEach(function(it, iIdx){
            totalRowW += 24 + it.label.length * 5.4 + (iIdx > 0 ? 18 : 0);
          });
          var curX = Math.max(14, (W - totalRowW) / 2);
          row.forEach(function(it){
            var dashAttr = it.dash ? (' stroke-dasharray="' + (typeof it.dash === 'string' ? it.dash : '4,3') + '"') : '';
            s+='<line x1="'+curX.toFixed(1)+'" y1="'+(rowY - 3.5).toFixed(1)+'" x2="'+(curX + 18).toFixed(1)+'" y2="'+(rowY - 3.5).toFixed(1)+'" stroke="'+it.color+'" stroke-width="2.2" stroke-linecap="round"'+dashAttr+'/>';
            s+='<text x="'+(curX + 23).toFixed(1)+'" y="'+rowY.toFixed(1)+'" font-size="9.2" font-weight="600" fill="'+FIG_INK+'" text-anchor="start">'+esc(it.label)+'</text>';
            curX += 24 + it.label.length * 5.4 + 18;
          });
        });
      }
    }
    /* ── triangle ── */
    else if(fig.type==='triangle'){
      var verts=fig.vertices;
      if((!Array.isArray(verts)||verts.length<3) && Array.isArray(fig.A) && Array.isArray(fig.B) && Array.isArray(fig.C)){
        verts=[fig.A, fig.B, fig.C];
      }
      var hasNamedC90 = (fig.angleC === '90°' || fig.angleC === '90');
      if(!Array.isArray(verts)||verts.length<3){
        var tA=+fig.a||5, tB=+fig.b||12;
        verts=[[0,0],[tB,0],(fig.rightAngle||fig.right!==undefined||hasNamedC90)?[0,tA]:[tB*0.35,tA*0.9]];
      }
      var triLabels = Array.isArray(fig.labels) ? fig.labels : ((fig.labels && typeof fig.labels==='object' && (fig.labels.A||fig.labels.B||fig.labels.C)) ? [fig.labels.A||'A', fig.labels.B||'B', fig.labels.C||'C'] : (hasNamedC90 ? ['C','A','B'] : ['B','C','A']));
      var triSides = Array.isArray(fig.sides) ? fig.sides : ((fig.sides && typeof fig.sides==='object') ? [fig.sides.c||fig.sides.ab, fig.sides.a||fig.sides.bc, fig.sides.b||fig.sides.ac] : ((fig.labels && typeof fig.labels==='object' && !Array.isArray(fig.labels)) ? [fig.labels.bc||fig.b, fig.labels.ac||fig.c, fig.labels.ab||fig.a] : (fig.labelA||fig.labelB||fig.labelC||fig.a||fig.b||fig.c ? [fig.labelB||fig.b, fig.labelC||fig.c, fig.labelA||fig.a] : [])));
      var triRight = fig.right;
      if(triRight === undefined && hasNamedC90) triRight = 0;
      if(triRight === undefined && fig.rightAt !== undefined){
        if(fig.rightAt === 'A') triRight = 0;
        else if(fig.rightAt === 'B') triRight = 1;
        else if(fig.rightAt === 'C') triRight = 2;
        else { var rIdx = triLabels.indexOf(fig.rightAt); if(rIdx >= 0) triRight = rIdx; }
      }
      var triAngles = Array.isArray(fig.angles) ? fig.angles : ((fig.angleA||fig.angleB||fig.angleC) ? (hasNamedC90 ? ['', fig.angleA||'', fig.angleB||''] : [fig.angleB||'', fig.angleC||'', fig.angleA||'']) : []);
      var pad3=32;
      /* if an exterior-angle construction is requested, its extension point(s)
         must be included in the bbox BEFORE scaling, or the auxiliary ray gets
         clipped off canvas. Computed in DATA space, same as the vertices. */
      var extDataPts=[];
      if(fig.ext_angle){
        var eaD=fig.ext_angle, atD=eaD.at;
        if(eaD.mode==='side'){
          var fromD=eaD.from, AD=verts[fromD], BD=verts[atD];
          var dxD=BD[0]-AD[0], dyD=BD[1]-AD[1], lenD=Math.sqrt(dxD*dxD+dyD*dyD)||1, extLenD=lenD*0.65;
          extDataPts.push([BD[0]+dxD/lenD*extLenD, BD[1]+dyD/lenD*extLenD]);
        } else if(eaD.mode==='parallel'){
          var spanD=(Math.max(verts[0][0],verts[1][0],verts[2][0])-Math.min(verts[0][0],verts[1][0],verts[2][0]))*0.55||3;
          extDataPts.push([verts[atD][0]-spanD, verts[atD][1]], [verts[atD][0]+spanD, verts[atD][1]]);
        }
      }
      var bboxPts=[verts[0],verts[1],verts[2]].concat(extDataPts);
      var minx2=Math.min.apply(null,bboxPts.map(function(p){return p[0];})),maxx2=Math.max.apply(null,bboxPts.map(function(p){return p[0];}));
      var miny2=Math.min.apply(null,bboxPts.map(function(p){return p[1];})),maxy2=Math.max.apply(null,bboxPts.map(function(p){return p[1];}));
      var sc3=Math.min((W-2*pad3)/(maxx2-minx2||1),(H-2*pad3)/(maxy2-miny2||1));
      var toS=function(v){return [(v[0]-minx2)*sc3+pad3,H-(v[1]-miny2)*sc3-pad3];};
      var p0=toS(verts[0]),p1=toS(verts[1]),p2=toS(verts[2]);
      var pts3=[p0,p1,p2].map(function(p){return p[0]+','+p[1];}).join(' ');
      s+='<polygon points="'+pts3+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      /* exterior-angle construction: a dashed auxiliary ray plus the resulting
         exterior angle, marked and labelled. 'side' extends an existing side
         past a vertex (classic exterior-angle-theorem figure); 'parallel'
         draws a line through a vertex parallel to the OPPOSITE side (always
         horizontal here, since every triangle in this schema has its base
         v0-v1 laid horizontal by construction) — the alternate-interior-angle
         proof of the same theorem. */
      if(fig.ext_angle){
        var eaP=[p0,p1,p2];
        if(fig.ext_angle.mode==='side'){
          var atP=eaP[fig.ext_angle.at], throughOther=eaP[fig.ext_angle.at===2?(fig.ext_angle.from===0?1:0):(fig.ext_angle.at===0?1:2)];
          var extScreen=toS(extDataPts[0]);
          s+='<line x1="'+atP[0].toFixed(1)+'" y1="'+atP[1].toFixed(1)+'" x2="'+extScreen[0].toFixed(1)+'" y2="'+extScreen[1].toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5,3"/>';
          /* exterior-angle arc: between the extension ray and the side NOT used to extend */
          var thirdIdx=3-fig.ext_angle.at-fig.ext_angle.from;
          var thirdP=eaP[thirdIdx];
          var vA=[extScreen[0]-atP[0],extScreen[1]-atP[1]], vB=[thirdP[0]-atP[0],thirdP[1]-atP[1]];
          var lA=Math.hypot(vA[0],vA[1])||1, lB=Math.hypot(vB[0],vB[1])||1;
          var angA=Math.atan2(vA[1],vA[0]), angB=Math.atan2(vB[1],vB[0]);
          var arR=16, sA=atP[0]+arR*Math.cos(angA), sY=atP[1]+arR*Math.sin(angA);
          var eA=atP[0]+arR*Math.cos(angB), eY=atP[1]+arR*Math.sin(angB);
          var crossD=vA[0]/lA*vB[1]/lB-vA[1]/lA*vB[0]/lB, sweepD=crossD>0?1:0;
          s+='<path d="M'+sA.toFixed(1)+','+sY.toFixed(1)+' A'+arR+','+arR+' 0 0,'+sweepD+' '+eA.toFixed(1)+','+eY.toFixed(1)+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
          var diffD=angB-angA;while(diffD>Math.PI)diffD-=2*Math.PI;while(diffD<-Math.PI)diffD+=2*Math.PI;
          var midD=angA+(crossD>0?1:-1)*Math.abs(diffD)/2;
          s+='<text x="'+(atP[0]+(arR+11)*Math.cos(midD)).toFixed(1)+'" y="'+(atP[1]+(arR+11)*Math.sin(midD)+3).toFixed(1)+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+(fig.ext_angle.label||'?')+'</text>';
        } else if(fig.ext_angle.mode==='parallel'){
          var e1=toS(extDataPts[0]), e2=toS(extDataPts[1]);
          s+='<line x1="'+e1[0].toFixed(1)+'" y1="'+e1[1].toFixed(1)+'" x2="'+e2[0].toFixed(1)+'" y2="'+e2[1].toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5,3"/>';
          var atPp=eaP[fig.ext_angle.at];
          s+='<text x="'+atPp[0].toFixed(1)+'" y="'+(atPp[1]-10).toFixed(1)+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+(fig.ext_angle.label||'?')+'</text>';
        }
      }
      /* right angle */
      if(triRight!==undefined){
        var ri=triRight,rv=[p0,p1,p2][ri],others=[[p0,p1,p2][(ri+1)%3],[p0,p1,p2][(ri+2)%3]];
        var v1=[others[0][0]-rv[0],others[0][1]-rv[1]],v2=[others[1][0]-rv[0],others[1][1]-rv[1]];
        var l1=Math.sqrt(v1[0]*v1[0]+v1[1]*v1[1])||1,l2=Math.sqrt(v2[0]*v2[0]+v2[1]*v2[1])||1;
        var u1=[v1[0]/l1*10,v1[1]/l1*10],u2=[v2[0]/l2*10,v2[1]/l2*10];
        s+='<polyline points="'+(rv[0]+u1[0]).toFixed(1)+','+(rv[1]+u1[1]).toFixed(1)+' '+(rv[0]+u1[0]+u2[0]).toFixed(1)+','+(rv[1]+u1[1]+u2[1]).toFixed(1)+' '+(rv[0]+u2[0]).toFixed(1)+','+(rv[1]+u2[1]).toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.5"/>';
      }
      /* equal-side tick marks (optional list of side indices, mirrors the geometry_2d schema) */
      (fig.equal_sides||[]).forEach(function(si){
        var pts9=[p0,p1,p2],a9=pts9[si%3],b9=pts9[(si+1)%3];
        var mx9=(a9[0]+b9[0])/2,my9=(a9[1]+b9[1])/2;
        var ang9=Math.atan2(b9[1]-a9[1],b9[0]-a9[0]),perp9=ang9+Math.PI/2,t9=5;
        s+='<line x1="'+(mx9+Math.cos(perp9)*t9).toFixed(1)+'" y1="'+(my9+Math.sin(perp9)*t9).toFixed(1)+'" x2="'+(mx9-Math.cos(perp9)*t9).toFixed(1)+'" y2="'+(my9-Math.sin(perp9)*t9).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
      });
      /* vertex labels */
      var cx3=(p0[0]+p1[0]+p2[0])/3,cy3=(p0[1]+p1[1]+p2[1])/3;
      (triLabels||[]).forEach(function(lbl,i){
        if(!lbl)return;
        var pt=[p0,p1,p2][i],dx=pt[0]-cx3,dy=pt[1]-cy3,len=Math.sqrt(dx*dx+dy*dy)||1;
        var vx = _clampLabelX(pt[0]+dx/len*15, String(lbl), 11.5, 'middle', 8, W-8);
        var vy = Math.max(14, Math.min(H-6, pt[1]+dy/len*15+4));
        s+='<text x="'+vx.toFixed(1)+'" y="'+vy.toFixed(1)+'" font-size="11.5" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3" stroke-linejoin="round">'+esc(lbl)+'</text>';
      });
      /* side labels */
      (triSides||[]).forEach(function(side,i){
        if(!side)return;
        var pts4=[p0,p1,p2],a=pts4[i],b=pts4[(i+1)%3];
        var mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
        var dx=b[0]-a[0],dy=b[1]-a[1],len=Math.sqrt(dx*dx+dy*dy)||1;
        var nx=-dy/len*14,ny=dx/len*14;
        if((mx+nx-cx3)*nx+(my+ny-cy3)*ny<0){nx=-nx;ny=-ny;}
        var fmtS = _formatMathLabel(side);
        var sxL = _clampLabelX(mx+nx, fmtS, 10, 'middle', 8, W-8);
        var syL = Math.max(14, Math.min(H-6, my+ny+3));
        s+='<text x="'+sxL.toFixed(1)+'" y="'+syL.toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3" stroke-linejoin="round">'+esc(fmtS)+'</text>';
      });
      /* angle arcs with labels */
      var placedTriAngs = [];
      (triAngles||[]).forEach(function(ang,i){
        if(!ang)return;
        var pts5=[p0,p1,p2],rv2=pts5[i];
        var oth1=pts5[(i+1)%3],oth2=pts5[(i+2)%3];
        var v1=[oth1[0]-rv2[0],oth1[1]-rv2[1]],v2=[oth2[0]-rv2[0],oth2[1]-rv2[1]];
        var l1=Math.sqrt(v1[0]*v1[0]+v1[1]*v1[1])||1,l2=Math.sqrt(v2[0]*v2[0]+v2[1]*v2[1])||1;
        var minSide=Math.min(l1,l2);
        var a1=Math.atan2(v1[1],v1[0]),a2=Math.atan2(v2[1],v2[0]);
        var ar=Math.min(14, Math.max(7, minSide*0.26));
        var sx2=(rv2[0]+ar*Math.cos(a1)).toFixed(1),sy2=(rv2[1]+ar*Math.sin(a1)).toFixed(1);
        var ex2=(rv2[0]+ar*Math.cos(a2)).toFixed(1),ey2=(rv2[1]+ar*Math.sin(a2)).toFixed(1);
        var cross=v1[0]/l1*v2[1]/l2-v1[1]/l1*v2[0]/l2;
        var sweep=cross>0?1:0;
        s+='<path d="M'+sx2+','+sy2+' A'+ar.toFixed(1)+','+ar.toFixed(1)+' 0 0,'+sweep+' '+ex2+','+ey2+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
        var diff=a2-a1;while(diff>Math.PI)diff-=2*Math.PI;while(diff<-Math.PI)diff+=2*Math.PI;
        var midA=a1+(cross>0?1:-1)*Math.abs(diff)/2;
        var lblDist=Math.min(ar+9, Math.max(11, minSide*0.4));
        var lxNum=rv2[0]+lblDist*Math.cos(midA), lyNum=rv2[1]+lblDist*Math.sin(midA)+3;
        placedTriAngs.forEach(function(prev){
          if(Math.abs(lxNum-prev[0])<18 && Math.abs(lyNum-prev[1])<11){
            lyNum += (lyNum < prev[1] ? -9 : 9);
            lxNum += (lxNum < prev[0] ? -6 : 6);
          }
        });
        placedTriAngs.push([lxNum, lyNum]);
        s+='<text x="'+lxNum.toFixed(1)+'" y="'+lyNum.toFixed(1)+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5" stroke-linejoin="round">'+_formatMathLabel(ang)+'</text>';
      });
      /* a segment DE parallel to the base, D on side v0-v1 and E on v0-v2 —
         drawn at a FIXED schematic parameter (not the real AD/AB ratio,
         which the question usually gives while leaving EC/AE to solve for)
         so the picture illustrates the Triangle Proportionality Theorem
         setup without its own proportions revealing the unknown length. */
      if(fig.cevian_parallel){
        var cpT=fig.cevian_parallel.t!==undefined?fig.cevian_parallel.t:0.55;
        var cpD=[p0[0]+(p1[0]-p0[0])*cpT, p0[1]+(p1[1]-p0[1])*cpT];
        var cpE=[p0[0]+(p2[0]-p0[0])*cpT, p0[1]+(p2[1]-p0[1])*cpT];
        s+='<line x1="'+cpD[0].toFixed(1)+'" y1="'+cpD[1].toFixed(1)+'" x2="'+cpE[0].toFixed(1)+'" y2="'+cpE[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';
        s+='<circle cx="'+cpD[0].toFixed(1)+'" cy="'+cpD[1].toFixed(1)+'" r="2.6" fill="'+FIG_INK+'"/>';
        s+='<circle cx="'+cpE[0].toFixed(1)+'" cy="'+cpE[1].toFixed(1)+'" r="2.6" fill="'+FIG_INK+'"/>';
        var cpLbl=fig.cevian_parallel.labels||{};
        if(cpLbl.d)s+='<text x="'+cpD[0].toFixed(1)+'" y="'+(cpD[1]+13).toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">D</text>';
        if(cpLbl.e)s+='<text x="'+(cpE[0]+11).toFixed(1)+'" y="'+cpE[1].toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">E</text>';
        var cpMid=function(a,b){return [(a[0]+b[0])/2,(a[1]+b[1])/2];};
        var cpAD=cpMid(p0,cpD), cpDB=cpMid(cpD,p1), cpAE=cpMid(p0,cpE), cpEC=cpMid(cpE,p2);
        [[cpAD,cpLbl.ad],[cpDB,cpLbl.db],[cpAE,cpLbl.ae],[cpEC,cpLbl.ec]].forEach(function(pr){
          if(!pr[1])return;
          s+='<text x="'+pr[0][0].toFixed(1)+'" y="'+(pr[0][1]-6).toFixed(1)+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+pr[1]+'</text>';
        });
      }
    }
    /* ── circle ── */
    /* ── two SIMILAR shapes side by side ──
       Both shapes share one `vertices` list and differ only by `ratio`, so they
       are guaranteed genuinely similar rather than two drawings that merely look
       alike — that similarity IS the mathematical content of these questions.
       Each side carries its own side-labels and caption. */
    /* ── Shared helpers for authentic geometry diagrams ── */
    var _drawChevrons=function(p1, p2, count, strokeCol){
      var dx = p2[0] - p1[0], dy = p2[1] - p1[1];
      var len = Math.hypot(dx, dy) || 1;
      var ux = dx / len, uy = dy / len;
      var nx = -uy, ny = ux;
      var mx = (p1[0] + p2[0]) / 2, my = (p1[1] + p2[1]) / 2;
      var s = 5, gap = 5;
      var col = strokeCol || FIG_INDIGO;
      var offsets = count === 2 ? [-gap / 2, gap / 2] : [0];
      var out = '';
      offsets.forEach(function(off){
        var cx = mx + ux * off, cy = my + uy * off;
        var tip = [cx + ux * 2, cy + uy * 2];
        var w1 = [cx - ux * s + nx * s, cy - uy * s + ny * s];
        var w2 = [cx - ux * s - nx * s, cy - uy * s - ny * s];
        out += '<polyline points="' + w1[0].toFixed(1) + ',' + w1[1].toFixed(1) + ' ' + tip[0].toFixed(1) + ',' + tip[1].toFixed(1) + ' ' + w2[0].toFixed(1) + ',' + w2[1].toFixed(1) + '" fill="none" stroke="' + col + '" stroke-width="1.6" stroke-linejoin="round"/>';
      });
      return out;
    };
    var _drawRtBox=function(v0, v1, v2, size, strokeCol){
      var d1 = [v1[0] - v0[0], v1[1] - v0[1]], d2 = [v2[0] - v0[0], v2[1] - v0[1]];
      var l1 = Math.hypot(d1[0], d1[1]) || 1, l2 = Math.hypot(d2[0], d2[1]) || 1;
      var q = size || 9;
      var u1 = [d1[0] / l1 * q, d1[1] / l1 * q], u2 = [d2[0] / l2 * q, d2[1] / l2 * q];
      var col = strokeCol || FIG_INDIGO;
      return '<polyline points="' + (v0[0] + u1[0]).toFixed(1) + ',' + (v0[1] + u1[1]).toFixed(1) + ' ' +
        (v0[0] + u1[0] + u2[0]).toFixed(1) + ',' + (v0[1] + u1[1] + u2[1]).toFixed(1) + ' ' +
        (v0[0] + u2[0]).toFixed(1) + ',' + (v0[1] + u2[1]).toFixed(1) + '" fill="none" stroke="' + col + '" stroke-width="1.4"/>';
    };
    var _drawAngleArc=function(v0, v1, v2, rad, label, strokeCol, isDouble){
      var d1 = [v1[0] - v0[0], v1[1] - v0[1]], d2 = [v2[0] - v0[0], v2[1] - v0[1]];
      var l1 = Math.hypot(d1[0], d1[1]) || 1, l2 = Math.hypot(d2[0], d2[1]) || 1;
      var a1 = Math.atan2(d1[1], d1[0]), a2 = Math.atan2(d2[1], d2[0]);
      var cross = d1[0]/l1 * d2[1]/l2 - d1[1]/l1 * d2[0]/l2;
      var sweep = cross > 0 ? 1 : 0;
      var r = rad || 13;
      var col = strokeCol || FIG_AMBER;
      var out = '';
      var sx = (v0[0] + r * Math.cos(a1)).toFixed(1), sy = (v0[1] + r * Math.sin(a1)).toFixed(1);
      var ex = (v0[0] + r * Math.cos(a2)).toFixed(1), ey = (v0[1] + r * Math.sin(a2)).toFixed(1);
      out += '<path d="M' + sx + ',' + sy + ' A' + r + ',' + r + ' 0 0,' + sweep + ' ' + ex + ',' + ey + '" fill="none" stroke="' + col + '" stroke-width="1.3"/>';
      if(isDouble){
        var r2 = r + 4;
        var sx2 = (v0[0] + r2 * Math.cos(a1)).toFixed(1), sy2 = (v0[1] + r2 * Math.sin(a1)).toFixed(1);
        var ex2 = (v0[0] + r2 * Math.cos(a2)).toFixed(1), ey2 = (v0[1] + r2 * Math.sin(a2)).toFixed(1);
        out += '<path d="M' + sx2 + ',' + sy2 + ' A' + r2 + ',' + r2 + ' 0 0,' + sweep + ' ' + ex2 + ',' + ey2 + '" fill="none" stroke="' + col + '" stroke-width="1.3"/>';
      }
      if(label){
        var diff = a2 - a1; while(diff > Math.PI) diff -= 2 * Math.PI; while(diff < -Math.PI) diff += 2 * Math.PI;
        var midA = a1 + (cross > 0 ? 1 : -1) * Math.abs(diff) / 2;
        var lr = (isDouble ? r + 14 : r + 10);
        var lx = (v0[0] + lr * Math.cos(midA)).toFixed(1), ly = (v0[1] + lr * Math.sin(midA) + 3).toFixed(1);
        out += '<text x="' + lx + '" y="' + ly + '" font-size="9.5" font-weight="700" fill="' + FIG_AMBER_TEXT + '" text-anchor="middle" paint-order="stroke fill" stroke="' + FIG_BG + '" stroke-width="2.5">' + _formatMathLabel(label) + '</text>';
      }
      return out;
    };

    var _parseNum=function(v, dflt){
      if(typeof v==='number' && isFinite(v)) return v;
      if(typeof v==='string'){
        var mF=v.match(/^\s*(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)\s*$/);
        if(mF) return parseFloat(mF[1])/(parseFloat(mF[2])||1);
        var pF=parseFloat(v);
        if(isFinite(pF)) return pF;
      }
      return dflt;
    };

    /* ── 1. NESTED TRIANGLES / THALES' THEOREM (Parallel Transversal) ── */
    if(fig.type==='nested_triangles'||fig.type==='thales'||fig.type==='triangle_transversal'){
      var lblsN=fig.labels||['A','B','C','D','E'];
      var AN=[W*0.44, 26];
      var BN=[36, H-34];
      var CN=[W-36, H-34];
      var tN=_parseNum(fig.t, 0.52);
      if(!isFinite(tN)||tN<=0.05||tN>=0.95) tN=0.52;
      var DN=[AN[0]+tN*(BN[0]-AN[0]), AN[1]+tN*(BN[1]-AN[1])];
      var EN=[AN[0]+tN*(CN[0]-AN[0]), AN[1]+tN*(CN[1]-AN[1])];
      if(fig.shade==='top'){
        s+='<polygon points="'+AN[0].toFixed(1)+','+AN[1].toFixed(1)+' '+DN[0].toFixed(1)+','+DN[1].toFixed(1)+' '+EN[0].toFixed(1)+','+EN[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'"/>';
      } else if(fig.shade==='bottom'||fig.shade==='trap'){
        s+='<polygon points="'+DN[0].toFixed(1)+','+DN[1].toFixed(1)+' '+BN[0].toFixed(1)+','+BN[1].toFixed(1)+' '+CN[0].toFixed(1)+','+CN[1].toFixed(1)+' '+EN[0].toFixed(1)+','+EN[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'"/>';
      }
      s+='<polygon points="'+AN[0].toFixed(1)+','+AN[1].toFixed(1)+' '+BN[0].toFixed(1)+','+BN[1].toFixed(1)+' '+CN[0].toFixed(1)+','+CN[1].toFixed(1)+'" fill="'+(fig.shade?FIG_BG:FIG_INDIGO_FILL)+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      s+='<line x1="'+DN[0].toFixed(1)+'" y1="'+DN[1].toFixed(1)+'" x2="'+EN[0].toFixed(1)+'" y2="'+EN[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="2"/>';
      /* parallel chevrons */
      s+=_drawChevrons(DN, EN, 2, FIG_TEAL);
      s+=_drawChevrons(BN, CN, 2, FIG_INDIGO);
      /* points */
      [AN,BN,CN,DN,EN].forEach(function(pt){
        s+='<circle cx="'+pt[0].toFixed(1)+'" cy="'+pt[1].toFixed(1)+'" r="2.8" fill="'+FIG_INK+'"/>';
      });
      /* vertex letter labels */
      if(lblsN[0]) s+='<text x="'+AN[0].toFixed(1)+'" y="'+(AN[1]-11).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsN[0]+'</text>';
      if(lblsN[1]) s+='<text x="'+(BN[0]-12).toFixed(1)+'" y="'+(BN[1]+12).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsN[1]+'</text>';
      if(lblsN[2]) s+='<text x="'+(CN[0]+12).toFixed(1)+'" y="'+(CN[1]+12).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsN[2]+'</text>';
      if(lblsN[3]) s+='<text x="'+(DN[0]-14).toFixed(1)+'" y="'+(DN[1]+3).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsN[3]+'</text>';
      if(lblsN[4]) s+='<text x="'+(EN[0]+14).toFixed(1)+'" y="'+(EN[1]+3).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsN[4]+'</text>';
      /* side segment labels */
      var sdsN=fig.sides||{};
      var drawSideN=function(p1,p2,lbl,off,sideFlip){
        if(!lbl) return;
        var mx=(p1[0]+p2[0])/2, my=(p1[1]+p2[1])/2;
        var ex=p2[0]-p1[0], ey=p2[1]-p1[1], el=Math.hypot(ex,ey)||1;
        var nx=-ey/el*(sideFlip?-1:1), ny=ex/el*(sideFlip?-1:1);
        s+='<text x="'+(mx+nx*off).toFixed(1)+'" y="'+(my+ny*off+3).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(lbl)+'</text>';
      };
      drawSideN(AN, DN, sdsN.ad, 14, false);
      drawSideN(DN, BN, sdsN.db, 14, false);
      drawSideN(AN, EN, sdsN.ae, 14, true);
      drawSideN(EN, CN, sdsN.ec, 14, true);
      if(sdsN.de) s+='<text x="'+((DN[0]+EN[0])/2).toFixed(1)+'" y="'+((DN[1]+EN[1])/2-10).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sdsN.de)+'</text>';
      if(sdsN.bc) s+='<text x="'+((BN[0]+CN[0])/2).toFixed(1)+'" y="'+(BN[1]+18).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sdsN.bc)+'</text>';
      if(fig.angles){
        if(fig.angles.a) s+=_drawAngleArc(AN, BN, CN, 14, fig.angles.a);
        if(fig.angles.d) s+=_drawAngleArc(DN, EN, AN, 13, fig.angles.d);
        if(fig.angles.b) s+=_drawAngleArc(BN, CN, AN, 14, fig.angles.b);
      }
      s+='</svg>';
      return s;
    }

    /* ── 2. BOWTIE / HOURGLASS SIMILAR TRIANGLES ── */
    else if(fig.type==='bowtie'||fig.type==='hourglass'){
      var lblsB=fig.labels||['A','B','C','D','E'];
      var rtB=fig.ratio!=null?fig.ratio:0.65;
      var yT=28, yB=H-32;
      var spanT=Math.min(W*0.38*rtB, W*0.35);
      var spanB=Math.min(spanT/rtB, W*0.42);
      var cxB=W/2;
      var AB=[cxB-spanT, yT], BB=[cxB+spanT, yT];
      var DB=[cxB-spanB, yB], CB=[cxB+spanB, yB];
      var tB=rtB/(1+rtB);
      var EB=[cxB, yT+tB*(yB-yT)];
      s+='<polygon points="'+AB[0].toFixed(1)+','+AB[1].toFixed(1)+' '+BB[0].toFixed(1)+','+BB[1].toFixed(1)+' '+EB[0].toFixed(1)+','+EB[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      s+='<polygon points="'+CB[0].toFixed(1)+','+CB[1].toFixed(1)+' '+DB[0].toFixed(1)+','+DB[1].toFixed(1)+' '+EB[0].toFixed(1)+','+EB[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      s+=_drawChevrons(AB, BB, 2, FIG_INDIGO);
      s+=_drawChevrons(DB, CB, 2, FIG_INDIGO);
      s+=_drawAngleArc(EB, AB, BB, 12, null, FIG_AMBER);
      s+=_drawAngleArc(EB, CB, DB, 12, null, FIG_AMBER);
      [AB,BB,CB,DB,EB].forEach(function(pt){
        s+='<circle cx="'+pt[0].toFixed(1)+'" cy="'+pt[1].toFixed(1)+'" r="2.8" fill="'+FIG_INK+'"/>';
      });
      if(lblsB[0]) s+='<text x="'+(AB[0]-11).toFixed(1)+'" y="'+(AB[1]-4).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsB[0]+'</text>';
      if(lblsB[1]) s+='<text x="'+(BB[0]+11).toFixed(1)+'" y="'+(BB[1]-4).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsB[1]+'</text>';
      if(lblsB[2]) s+='<text x="'+(CB[0]+12).toFixed(1)+'" y="'+(CB[1]+10).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsB[2]+'</text>';
      if(lblsB[3]) s+='<text x="'+(DB[0]-12).toFixed(1)+'" y="'+(DB[1]+10).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsB[3]+'</text>';
      if(lblsB[4]) s+='<text x="'+(EB[0]+14).toFixed(1)+'" y="'+(EB[1]+3).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsB[4]+'</text>';
      var sdsB=fig.sides||{};
      var drawSideB=function(p1,p2,lbl,off,sideFlip){
        if(!lbl) return;
        var mx=(p1[0]+p2[0])/2, my=(p1[1]+p2[1])/2;
        var ex=p2[0]-p1[0], ey=p2[1]-p1[1], el=Math.hypot(ex,ey)||1;
        var nx=-ey/el*(sideFlip?-1:1), ny=ex/el*(sideFlip?-1:1);
        s+='<text x="'+(mx+nx*off).toFixed(1)+'" y="'+(my+ny*off+3).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(lbl)+'</text>';
      };
      if(sdsB.ab) s+='<text x="'+cxB+'" y="'+(yT-10)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sdsB.ab)+'</text>';
      if(sdsB.cd) s+='<text x="'+cxB+'" y="'+(yB+16)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sdsB.cd)+'</text>';
      drawSideB(AB, EB, sdsB.ae, 12, false);
      drawSideB(EB, CB, sdsB.ec, 12, false);
      drawSideB(BB, EB, sdsB.be, 12, true);
      drawSideB(EB, DB, sdsB.ed, 12, true);
      s+='</svg>';
      return s;
    }

    /* ── 3. RIGHT TRIANGLE ALTITUDE (Geometric Mean Theorem) ── */
    else if(fig.type==='right_triangle_altitude'||fig.type==='altitude_hypotenuse'||fig.type==='geometric_mean'){
      var lblsR=fig.labels||['A','B','C','D'];
      var AR=[32, H-36], BR=[W-32, H-36];
      var LR=BR[0]-AR[0];
      var tR=fig.t!=null?fig.t:0.36;
      var DR=[AR[0]+tR*LR, H-36];
      var hR=LR*Math.sqrt(tR*(1-tR));
      var CR=[DR[0], (H-36)-hR];
      s+='<polygon points="'+AR[0].toFixed(1)+','+AR[1].toFixed(1)+' '+BR[0].toFixed(1)+','+BR[1].toFixed(1)+' '+CR[0].toFixed(1)+','+CR[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      s+='<line x1="'+DR[0].toFixed(1)+'" y1="'+DR[1].toFixed(1)+'" x2="'+CR[0].toFixed(1)+'" y2="'+CR[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="2"/>';
      s+=_drawRtBox(DR, CR, AR, 10, FIG_INDIGO);
      s+=_drawRtBox(CR, AR, BR, 10, FIG_INDIGO);
      [AR,BR,CR,DR].forEach(function(pt){
        s+='<circle cx="'+pt[0].toFixed(1)+'" cy="'+pt[1].toFixed(1)+'" r="2.8" fill="'+FIG_INK+'"/>';
      });
      if(lblsR[0]) s+='<text x="'+(AR[0]-12).toFixed(1)+'" y="'+(AR[1]+12).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsR[0]+'</text>';
      if(lblsR[1]) s+='<text x="'+(BR[0]+12).toFixed(1)+'" y="'+(BR[1]+12).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsR[1]+'</text>';
      if(lblsR[2]) s+='<text x="'+CR[0].toFixed(1)+'" y="'+(CR[1]-11).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsR[2]+'</text>';
      if(lblsR[3]) s+='<text x="'+DR[0].toFixed(1)+'" y="'+(DR[1]+14).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsR[3]+'</text>';
      if(fig.p) s+='<text x="'+((AR[0]+DR[0])/2).toFixed(1)+'" y="'+(DR[1]+14).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(fig.p)+'</text>';
      if(fig.q) s+='<text x="'+((DR[0]+BR[0])/2).toFixed(1)+'" y="'+(DR[1]+14).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(fig.q)+'</text>';
      if(fig.altitude||fig.h) s+='<text x="'+(DR[0]+12).toFixed(1)+'" y="'+((CR[1]+DR[1])/2).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_TEAL+'" text-anchor="start" dominant-baseline="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(fig.altitude||fig.h)+'</text>';
      if(fig.b||fig.ac){
        var acMx=(AR[0]+CR[0])/2-12, acMy=(AR[1]+CR[1])/2-6;
        s+='<text x="'+acMx.toFixed(1)+'" y="'+acMy.toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(fig.b||fig.ac)+'</text>';
      }
      if(fig.a||fig.bc){
        var bcMx=(BR[0]+CR[0])/2+12, bcMy=(BR[1]+CR[1])/2-6;
        s+='<text x="'+bcMx.toFixed(1)+'" y="'+bcMy.toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(fig.a||fig.bc)+'</text>';
      }
      if(fig.c||fig.hyp){
        s+='<text x="'+((AR[0]+BR[0])/2).toFixed(1)+'" y="'+(DR[1]+28).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(fig.c||fig.hyp)+'</text>';
      }
      s+='</svg>';
      return s;
    }

    /* ── 4. SHADOW SIMILARITY / REALISTIC INDIRECT MEASUREMENT ── */
    else if(fig.type==='shadow_similarity'||fig.type==='indirect_measurement'){
      var yG=H-34;
      var obj1=fig.obj1||{label:'Person',height:'6 ft',shadow:'4 ft'};
      var obj2=fig.obj2||{label:'Flagpole',height:'30 ft',shadow:'20 ft'};
      s+='<line x1="16" y1="'+yG+'" x2="'+(W-16)+'" y2="'+yG+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
      for(var gx=22; gx<W-20; gx+=14){
        s+='<line x1="'+gx+'" y1="'+yG+'" x2="'+(gx-4)+'" y2="'+(yG+6)+'" stroke="'+FIG_BORDER+'" stroke-width="1.2"/>';
      }
      /* Sun icon at top-left */
      s+='<circle cx="28" cy="24" r="8" fill="'+FIG_AMBER+'" opacity="0.9"/>';
      var sunRays=[[0,-11],[11,0],[0,11],[-11,0],[8,-8],[8,8],[-8,8],[-8,-8]];
      sunRays.forEach(function(sr){
        s+='<line x1="'+(28+sr[0]*0.9).toFixed(1)+'" y1="'+(24+sr[1]*0.9).toFixed(1)+'" x2="'+(28+sr[0]*1.4).toFixed(1)+'" y2="'+(24+sr[1]*1.4).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
      });
      /* Object 1 */
      var h1=40, s1=46;
      var b1x=44, t1x=44, t1y=yG-h1, s1x=b1x+s1;
      s+='<polygon points="'+b1x+','+yG+' '+t1x+','+t1y+' '+s1x+','+yG+'" fill="'+FIG_INDIGO_FILL+'"/>';
      s+='<line x1="'+b1x+'" y1="'+yG+'" x2="'+t1x+'" y2="'+t1y+'" stroke="'+FIG_INDIGO+'" stroke-width="2.5" stroke-linecap="round"/>';
      s+='<line x1="'+(t1x-12).toFixed(1)+'" y1="'+(t1y-9).toFixed(1)+'" x2="'+s1x+'" y2="'+yG+'" stroke="'+FIG_AMBER+'" stroke-width="1.6" stroke-dasharray="5,3"/>';
      s+=_drawRtBox([b1x,yG], [b1x,t1y], [s1x,yG], 8, FIG_INDIGO);
      s+='<line x1="'+b1x+'" y1="'+yG+'" x2="'+s1x+'" y2="'+yG+'" stroke="'+FIG_INDIGO+'" stroke-width="3"/>';
      if(obj1.height) s+='<text x="'+(b1x-6)+'" y="'+(yG-h1/2+3)+'" font-size="9.5" font-weight="700" fill="'+FIG_INK+'" text-anchor="end" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(obj1.height)+'</text>';
      if(obj1.shadow) s+='<text x="'+((b1x+s1x)/2)+'" y="'+(yG+14)+'" font-size="9.5" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(obj1.shadow)+'</text>';
      if(obj1.label) s+='<text x="'+(b1x+10)+'" y="'+(t1y-12)+'" font-size="9.5" font-weight="700" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(obj1.label)+'</text>';
      s+=_drawAngleArc([s1x,yG], [t1x,t1y], [b1x,yG], 14, fig.angle_label||null, FIG_AMBER);
      /* Object 2 */
      var h2=92, s2=110;
      var b2x=W-18-s2, t2x=b2x, t2y=yG-h2, s2x=b2x+s2;
      s+='<polygon points="'+b2x+','+yG+' '+t2x+','+t2y+' '+s2x+','+yG+'" fill="'+FIG_INDIGO_FILL+'"/>';
      s+='<line x1="'+b2x+'" y1="'+yG+'" x2="'+t2x+'" y2="'+t2y+'" stroke="'+FIG_INDIGO+'" stroke-width="3" stroke-linecap="round"/>';
      s+='<line x1="'+(t2x-12).toFixed(1)+'" y1="'+(t2y-9).toFixed(1)+'" x2="'+s2x+'" y2="'+yG+'" stroke="'+FIG_AMBER+'" stroke-width="1.6" stroke-dasharray="5,3"/>';
      s+=_drawRtBox([b2x,yG], [b2x,t2y], [s2x,yG], 9, FIG_INDIGO);
      s+='<line x1="'+b2x+'" y1="'+yG+'" x2="'+s2x+'" y2="'+yG+'" stroke="'+FIG_INDIGO+'" stroke-width="3"/>';
      if(obj2.height) s+='<text x="'+(b2x-8)+'" y="'+(t2y+26)+'" font-size="9.5" font-weight="700" fill="'+FIG_INK+'" text-anchor="end" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(obj2.height)+'</text>';
      if(obj2.shadow) s+='<text x="'+((b2x+s2x)/2)+'" y="'+(yG+14)+'" font-size="9.5" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(obj2.shadow)+'</text>';
      if(obj2.label) s+='<text x="'+(b2x+18)+'" y="'+(t2y-10)+'" font-size="9.5" font-weight="700" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(obj2.label)+'</text>';
      s+=_drawAngleArc([s2x,yG], [t2x,t2y], [b2x,yG], 16, fig.angle_label||null, FIG_AMBER);
      s+='</svg>';
      return s;
    }

    /* ── 5. ANGLE BISECTOR THEOREM ── */
    else if(fig.type==='angle_bisector'){
      var lblsAB=fig.labels||['A','B','C','D'];
      var AAB=[W*0.42, 28];
      var BAB=[36, H-34];
      var CAB=[W-36, H-34];
      var cAB=Math.hypot(BAB[0]-AAB[0], BAB[1]-AAB[1]);
      var bAC=Math.hypot(CAB[0]-AAB[0], CAB[1]-AAB[1]);
      var tAB=cAB/(cAB+bAC);
      var DAB=[BAB[0]+tAB*(CAB[0]-BAB[0]), BAB[1]+tAB*(CAB[1]-BAB[1])];
      s+='<polygon points="'+AAB[0].toFixed(1)+','+AAB[1].toFixed(1)+' '+BAB[0].toFixed(1)+','+BAB[1].toFixed(1)+' '+CAB[0].toFixed(1)+','+CAB[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      s+='<line x1="'+AAB[0].toFixed(1)+'" y1="'+AAB[1].toFixed(1)+'" x2="'+DAB[0].toFixed(1)+'" y2="'+DAB[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="2"/>';
      s+=_drawAngleArc(AAB, BAB, DAB, 16, null, FIG_AMBER);
      s+=_drawAngleArc(AAB, DAB, CAB, 16, null, FIG_AMBER);
      var midA1=(Math.atan2(BAB[1]-AAB[1],BAB[0]-AAB[0])+Math.atan2(DAB[1]-AAB[1],DAB[0]-AAB[0]))/2;
      var midA2=(Math.atan2(DAB[1]-AAB[1],DAB[0]-AAB[0])+Math.atan2(CAB[1]-AAB[1],CAB[0]-AAB[0]))/2;
      [midA1, midA2].forEach(function(ang){
        var tx=AAB[0]+16*Math.cos(ang), ty=AAB[1]+16*Math.sin(ang);
        var nx=-Math.sin(ang)*4, ny=Math.cos(ang)*4;
        s+='<line x1="'+(tx-nx).toFixed(1)+'" y1="'+(ty-ny).toFixed(1)+'" x2="'+(tx+nx).toFixed(1)+'" y2="'+(ty+ny).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
      });
      [AAB,BAB,CAB,DAB].forEach(function(pt){
        s+='<circle cx="'+pt[0].toFixed(1)+'" cy="'+pt[1].toFixed(1)+'" r="2.8" fill="'+FIG_INK+'"/>';
      });
      if(lblsAB[0]) s+='<text x="'+AAB[0].toFixed(1)+'" y="'+(AAB[1]-11).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsAB[0]+'</text>';
      if(lblsAB[1]) s+='<text x="'+(BAB[0]-12).toFixed(1)+'" y="'+(BAB[1]+12).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsAB[1]+'</text>';
      if(lblsAB[2]) s+='<text x="'+(CAB[0]+12).toFixed(1)+'" y="'+(CAB[1]+12).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsAB[2]+'</text>';
      if(lblsAB[3]) s+='<text x="'+DAB[0].toFixed(1)+'" y="'+(DAB[1]+15).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsAB[3]+'</text>';
      var sdsAB=fig.sides||{};
      var drawSideAB=function(p1,p2,lbl,off,sideFlip){
        if(!lbl) return;
        var mx=(p1[0]+p2[0])/2, my=(p1[1]+p2[1])/2;
        var ex=p2[0]-p1[0], ey=p2[1]-p1[1], el=Math.hypot(ex,ey)||1;
        var nx=-ey/el*(sideFlip?-1:1), ny=ex/el*(sideFlip?-1:1);
        s+='<text x="'+(mx+nx*off).toFixed(1)+'" y="'+(my+ny*off+3).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(lbl)+'</text>';
      };
      drawSideAB(AAB, BAB, sdsAB.ab, 14, false);
      drawSideAB(AAB, CAB, sdsAB.ac, 14, true);
      if(sdsAB.bd) s+='<text x="'+((BAB[0]+DAB[0])/2).toFixed(1)+'" y="'+(BAB[1]+16).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sdsAB.bd)+'</text>';
      if(sdsAB.dc) s+='<text x="'+((DAB[0]+CAB[0])/2).toFixed(1)+'" y="'+(CAB[1]+16).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sdsAB.dc)+'</text>';
      s+='</svg>';
      return s;
    }

    /* ── 6. OVERLAPPING / INVERTED SIMILAR TRIANGLES ── */
    else if(fig.type==='overlapping_triangles'||fig.type==='inverted_similar'){
      var lblsO=fig.labels||['A','B','C','D','E'];
      var AO=[W*0.44, 26];
      var BO=[36, H-34];
      var CO=[W-36, H-34];
      var tD=0.62, tE=0.38;
      var DO=[AO[0]+tD*(BO[0]-AO[0]), AO[1]+tD*(BO[1]-AO[1])];
      var EO=[AO[0]+tE*(CO[0]-AO[0]), AO[1]+tE*(CO[1]-AO[1])];
      s+='<polygon points="'+AO[0].toFixed(1)+','+AO[1].toFixed(1)+' '+BO[0].toFixed(1)+','+BO[1].toFixed(1)+' '+CO[0].toFixed(1)+','+CO[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      s+='<polygon points="'+AO[0].toFixed(1)+','+AO[1].toFixed(1)+' '+DO[0].toFixed(1)+','+DO[1].toFixed(1)+' '+EO[0].toFixed(1)+','+EO[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_TEAL+'" stroke-width="2" stroke-linejoin="round"/>';
      s+=_drawAngleArc(DO, EO, AO, 14, null, FIG_AMBER, true);
      s+=_drawAngleArc(CO, BO, AO, 14, null, FIG_AMBER, true);
      s+=_drawAngleArc(AO, BO, CO, 15, null, FIG_AMBER, false);
      [AO,BO,CO,DO,EO].forEach(function(pt){
        s+='<circle cx="'+pt[0].toFixed(1)+'" cy="'+pt[1].toFixed(1)+'" r="2.8" fill="'+FIG_INK+'"/>';
      });
      if(lblsO[0]) s+='<text x="'+AO[0].toFixed(1)+'" y="'+(AO[1]-11).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsO[0]+'</text>';
      if(lblsO[1]) s+='<text x="'+(BO[0]-12).toFixed(1)+'" y="'+(BO[1]+12).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsO[1]+'</text>';
      if(lblsO[2]) s+='<text x="'+(CO[0]+12).toFixed(1)+'" y="'+(CO[1]+12).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsO[2]+'</text>';
      if(lblsO[3]) s+='<text x="'+(DO[0]-14).toFixed(1)+'" y="'+(DO[1]+3).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsO[3]+'</text>';
      if(lblsO[4]) s+='<text x="'+(EO[0]+14).toFixed(1)+'" y="'+(EO[1]+3).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsO[4]+'</text>';
      var sdsO=fig.sides||{};
      var drawSideO=function(p1,p2,lbl,off,sideFlip){
        if(!lbl) return;
        var mx=(p1[0]+p2[0])/2, my=(p1[1]+p2[1])/2;
        var ex=p2[0]-p1[0], ey=p2[1]-p1[1], el=Math.hypot(ex,ey)||1;
        var nx=-ey/el*(sideFlip?-1:1), ny=ex/el*(sideFlip?-1:1);
        s+='<text x="'+(mx+nx*off).toFixed(1)+'" y="'+(my+ny*off+3).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(lbl)+'</text>';
      };
      drawSideO(AO, DO, sdsO.ad, 14, false);
      drawSideO(DO, BO, sdsO.db, 14, false);
      drawSideO(AO, EO, sdsO.ae, 14, true);
      drawSideO(EO, CO, sdsO.ec, 14, true);
      if(sdsO.de) s+='<text x="'+((DO[0]+EO[0])/2).toFixed(1)+'" y="'+((DO[1]+EO[1])/2-10).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sdsO.de)+'</text>';
      if(sdsO.bc) s+='<text x="'+((BO[0]+CO[0])/2).toFixed(1)+'" y="'+(BO[1]+18).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sdsO.bc)+'</text>';
      s+='</svg>';
      return s;
    }

    /* ── 7. CIRCLE INTERSECTING CHORDS SIMILARITY ── */
    else if(fig.type==='circle_chords_similarity'){
      var lblsC=fig.labels||['A','B','C','D','P'];
      var cxC=W/2, cyC=H/2-4, radC=Math.min(W,H)*0.36;
      s+='<circle cx="'+cxC+'" cy="'+cyC+'" r="'+radC.toFixed(1)+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      var aA=2.6, aB=-0.4, aC=1.1, aD=-2.0;
      var AC=[cxC+radC*Math.cos(aA), cyC+radC*Math.sin(aA)];
      var BC=[cxC+radC*Math.cos(aB), cyC+radC*Math.sin(aB)];
      var CC=[cxC+radC*Math.cos(aC), cyC+radC*Math.sin(aC)];
      var DC=[cxC+radC*Math.cos(aD), cyC+radC*Math.sin(aD)];
      var x1C=AC[0], y1C=AC[1], x2C=BC[0], y2C=BC[1], x3C=CC[0], y3C=CC[1], x4C=DC[0], y4C=DC[1];
      var denomC=(x1C-x2C)*(y3C-y4C)-(y1C-y2C)*(x3C-x4C)||1;
      var pxC=((x1C*y2C-y1C*x2C)*(x3C-x4C)-(x1C-x2C)*(x3C*y4C-y3C*x4C))/denomC;
      var pyC=((x1C*y2C-y1C*x2C)*(y3C-y4C)-(y1C-y2C)*(x3C*y4C-y3C*x4C))/denomC;
      var PC=[pxC, pyC];
      s+='<line x1="'+AC[0].toFixed(1)+'" y1="'+AC[1].toFixed(1)+'" x2="'+CC[0].toFixed(1)+'" y2="'+CC[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.6" stroke-dasharray="4,3"/>';
      s+='<line x1="'+DC[0].toFixed(1)+'" y1="'+DC[1].toFixed(1)+'" x2="'+BC[0].toFixed(1)+'" y2="'+BC[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.6" stroke-dasharray="4,3"/>';
      s+='<line x1="'+AC[0].toFixed(1)+'" y1="'+AC[1].toFixed(1)+'" x2="'+BC[0].toFixed(1)+'" y2="'+BC[1].toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      s+='<line x1="'+CC[0].toFixed(1)+'" y1="'+CC[1].toFixed(1)+'" x2="'+DC[0].toFixed(1)+'" y2="'+DC[1].toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      s+=_drawAngleArc(AC, CC, BC, 14, null, FIG_AMBER);
      s+=_drawAngleArc(DC, BC, CC, 14, null, FIG_AMBER);
      [AC,BC,CC,DC,PC].forEach(function(pt){
        s+='<circle cx="'+pt[0].toFixed(1)+'" cy="'+pt[1].toFixed(1)+'" r="2.8" fill="'+FIG_INK+'"/>';
      });
      var outLabelC=function(pt,lbl,ang){
        if(!lbl) return;
        var lx=pt[0]+14*Math.cos(ang), ly=pt[1]+14*Math.sin(ang)+4;
        s+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lbl+'</text>';
      };
      outLabelC(AC, lblsC[0], aA);
      outLabelC(BC, lblsC[1], aB);
      outLabelC(CC, lblsC[2], aC);
      outLabelC(DC, lblsC[3], aD);
      if(lblsC[4]) s+='<text x="'+(PC[0]+12).toFixed(1)+'" y="'+(PC[1]-6).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsC[4]+'</text>';
      var sdsC=fig.sides||{};
      var drawSideC=function(p1,p2,lbl){
        if(!lbl) return;
        var mx=(p1[0]+p2[0])/2, my=(p1[1]+p2[1])/2;
        s+='<text x="'+mx.toFixed(1)+'" y="'+(my+3).toFixed(1)+'" font-size="10.5" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(lbl)+'</text>';
      };
      drawSideC(PC, AC, sdsC.pa);
      drawSideC(PC, BC, sdsC.pb);
      drawSideC(PC, CC, sdsC.pc);
      drawSideC(PC, DC, sdsC.pd);
      s+='</svg>';
      return s;
    }

    /* ── 8. TRAPEZOID DIAGONALS SIMILARITY ── */
    else if(fig.type==='trapezoid_diagonals'){
      var lblsT=fig.labels||['A','B','C','D','P'];
      var yTop=30, yBot=H-34;
      var spanTop=W*0.26, spanBot=W*0.42;
      var cxT=W/2;
      var AT=[cxT-spanTop, yTop], BT=[cxT+spanTop, yTop];
      var DT=[cxT-spanBot, yBot], CT=[cxT+spanBot, yBot];
      var rT=(2*spanTop)/(2*spanBot);
      var tT=rT/(1+rT);
      var PT=[cxT, yTop+tT*(yBot-yTop)];
      s+='<polygon points="'+AT[0].toFixed(1)+','+AT[1].toFixed(1)+' '+BT[0].toFixed(1)+','+BT[1].toFixed(1)+' '+CT[0].toFixed(1)+','+CT[1].toFixed(1)+' '+DT[0].toFixed(1)+','+DT[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      s+='<line x1="'+AT[0].toFixed(1)+'" y1="'+AT[1].toFixed(1)+'" x2="'+CT[0].toFixed(1)+'" y2="'+CT[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';
      s+='<line x1="'+BT[0].toFixed(1)+'" y1="'+BT[1].toFixed(1)+'" x2="'+DT[0].toFixed(1)+'" y2="'+DT[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';
      s+=_drawChevrons(AT, BT, 2, FIG_INDIGO);
      s+=_drawChevrons(DT, CT, 2, FIG_INDIGO);
      [AT,BT,CT,DT,PT].forEach(function(pt){
        s+='<circle cx="'+pt[0].toFixed(1)+'" cy="'+pt[1].toFixed(1)+'" r="2.8" fill="'+FIG_INK+'"/>';
      });
      if(lblsT[0]) s+='<text x="'+(AT[0]-10).toFixed(1)+'" y="'+(AT[1]-6).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsT[0]+'</text>';
      if(lblsT[1]) s+='<text x="'+(BT[0]+10).toFixed(1)+'" y="'+(BT[1]-6).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsT[1]+'</text>';
      if(lblsT[2]) s+='<text x="'+(CT[0]+12).toFixed(1)+'" y="'+(CT[1]+12).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsT[2]+'</text>';
      if(lblsT[3]) s+='<text x="'+(DT[0]-12).toFixed(1)+'" y="'+(DT[1]+12).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsT[3]+'</text>';
      if(lblsT[4]) s+='<text x="'+(PT[0]+14).toFixed(1)+'" y="'+(PT[1]+3).toFixed(1)+'" font-size="12" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lblsT[4]+'</text>';
      var sdsT=fig.sides||{};
      if(sdsT.ab) s+='<text x="'+cxT+'" y="'+(yTop-10)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sdsT.ab)+'</text>';
      if(sdsT.dc||sdsT.cd) s+='<text x="'+cxT+'" y="'+(yBot+16)+'" font-size="11" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sdsT.dc||sdsT.cd)+'</text>';
      s+='</svg>';
      return s;
    }

    /* ── 9. POLISHED SIDE-BY-SIDE SIMILAR SHAPES ── */
    else if(fig.type==='similar'){
      var vsim=fig.vertices||[[0,0],[10,0],[0,10]];
      var rt=fig.ratio||0.55, capH=15, padS=16;
      var xsS=vsim.map(function(v){return v[0];}), ysS=vsim.map(function(v){return v[1];});
      var mnx=Math.min.apply(null,xsS), mxx=Math.max.apply(null,xsS);
      var mny=Math.min.apply(null,ysS), mxy=Math.max.apply(null,ysS);
      var bw=(mxx-mnx)||1, bh=(mxy-mny)||1;
      var scS=Math.min((W/2-2*padS)/bw, (H-2*padS-capH)/bh);
      var baseY=H-padS-capH;
      var drawOne=function(cfg,cxc,scale){
        if(!cfg) return '';
        var out='', pts=vsim.map(function(v){
          return [cxc+(v[0]-(mnx+mxx)/2)*scale, baseY-(v[1]-mny)*scale];
        });
        out+='<polygon points="'+pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ')+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
        if(fig.right_angle!==undefined&&fig.right_angle!==null){
          var ri=fig.right_angle, v0=pts[ri], vp=pts[(ri+2)%pts.length], vn=pts[(ri+1)%pts.length];
          out+=_drawRtBox(v0, vp, vn, 9, FIG_INDIGO);
        }
        var cen=[pts.reduce(function(a,p){return a+p[0];},0)/pts.length, pts.reduce(function(a,p){return a+p[1];},0)/pts.length];
        (cfg.sides||[]).forEach(function(sd,i){
          if(!sd) return;
          var a=pts[i], b=pts[(i+1)%pts.length];
          var mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
          var ex=b[0]-a[0], ey=b[1]-a[1], el=Math.hypot(ex,ey)||1;
          var nx=-ey/el, ny=ex/el;
          if((mx+nx-cen[0])*nx+(my+ny-cen[1])*ny<0){nx=-nx;ny=-ny;}
          out+='<text x="'+(mx+nx*13).toFixed(1)+'" y="'+(my+ny*13+3).toFixed(1)+'" font-size="10.5" font-weight="700" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+_formatMathLabel(sd)+'</text>';
        });
        (cfg.labels||[]).forEach(function(lbl,i){
          if(!lbl) return;
          var pt=pts[i], dx=pt[0]-cen[0], dy=pt[1]-cen[1], len=Math.hypot(dx,dy)||1;
          out+='<circle cx="'+pt[0].toFixed(1)+'" cy="'+pt[1].toFixed(1)+'" r="2.5" fill="'+FIG_INK+'"/>';
          out+='<text x="'+(pt[0]+dx/len*14).toFixed(1)+'" y="'+(pt[1]+dy/len*14+4).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3">'+lbl+'</text>';
        });
        (cfg.angles||[]).forEach(function(ang,i){
          if(!ang) return;
          var v0=pts[i], oth1=pts[(i+1)%pts.length], oth2=pts[(i+2)%pts.length];
          out+=_drawAngleArc(v0, oth1, oth2, 12, ang, FIG_AMBER);
        });
        (fig.tick_sides||[]).forEach(function(ts){
          var i=ts.i, n=ts.n||1;
          var a=pts[i%pts.length], b=pts[(i+1)%pts.length];
          var ex=b[0]-a[0], ey=b[1]-a[1], el=Math.hypot(ex,ey)||1;
          var ux=ex/el, uy=ey/el, px=-uy, py=ux;
          for(var k=0;k<n;k++){
            var t=0.5+(k-(n-1)/2)*0.11;
            var tx=a[0]+ex*t, ty=a[1]+ey*t;
            out+='<line x1="'+(tx-px*5).toFixed(1)+'" y1="'+(ty-py*5).toFixed(1)+'" x2="'+(tx+px*5).toFixed(1)+'" y2="'+(ty+py*5).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6"/>';
          }
        });
        (fig.tick_angles||[]).forEach(function(ta){
          var i=ta.i, n=ta.n||1;
          var v0=pts[i%pts.length], oth1=pts[(i+1)%pts.length], oth2=pts[(i+2)%pts.length];
          for(var k2=0;k2<n;k2++){
            out+=_drawAngleArc(v0, oth1, oth2, 9+k2*4, null, FIG_AMBER);
          }
        });
        if(cfg.caption){
          var capClean = String(cfg.caption).replace(/&amp;/g,'&');
          var halfMin = cxc < W/2 ? 4 : W/2 + 4;
          var halfMax = cxc < W/2 ? W/2 - 4 : W - 4;
          var halfW = halfMax - halfMin;
          var capFs = Math.max(7.2, Math.min(10, halfW / Math.max(1, capClean.length * 0.56)));
          var capFit = (capClean.length * capFs * 0.54 > halfW) ? (' textLength="' + Math.round(halfW) + '" lengthAdjust="spacingAndGlyphs"') : '';
          var capX = capFit ? ((halfMin + halfMax) / 2) : _clampLabelX(cxc, capClean, capFs, 'middle', halfMin, halfMax);
          out+='<text x="'+capX.toFixed(1)+'" y="'+(H-4)+'" font-size="'+capFs.toFixed(1)+'" font-weight="600" fill="'+FIG_MUTED+'" text-anchor="middle"'+capFit+'>'+esc(capClean)+'</text>';
        }
        return out;
      };
      s+=drawOne(fig.left, W*0.26, scS*rt);
      s+=drawOne(fig.right, W*0.74, scS);
      if(fig.tilde) s+='<text x="'+(W/2)+'" y="'+(baseY-8)+'" font-size="14" font-weight="700" fill="'+FIG_MUTED+'" text-anchor="middle">~</text>';
      s+='</svg>';
      return s;
    }
    /* ── a single-vertex angle relationship: vertical / linear pair / complementary ──
       These are GEOMETRIC FACTS independent of the specific numbers (vertical
       angles are ALWAYS equal by position, a linear pair ALWAYS sums to 180 by
       construction, a complementary split ALWAYS sums to 90 by construction) —
       so a fixed, arbitrary split is truthful for ANY labels, including
       algebraic expressions whose numeric value isn't known until solved. */
    else if(fig.type==='vertex_angles'){
      var vaCx=W/2, vaCy=fig.mode==='complementary'?H*0.82:H/2, vaLen=Math.min(W,H)*0.42;
      var lbv=fig.labels||{};
      /* a line through the centre spanning direction ang1 to direction ang2
         (each endpoint independently placed by the standard polar formula —
         both must use the SAME sign convention or the two ends don't align
         into one straight line through the centre). */
      var vaLine=function(ang1,ang2,col,dash){
        var a1=ang1*Math.PI/180, a2=ang2*Math.PI/180;
        s+='<line x1="'+(vaCx+vaLen*Math.cos(a1)).toFixed(1)+'" y1="'+(vaCy-vaLen*Math.sin(a1)).toFixed(1)+'" x2="'+(vaCx+vaLen*Math.cos(a2)).toFixed(1)+'" y2="'+(vaCy-vaLen*Math.sin(a2)).toFixed(1)+'" stroke="'+(col||FIG_INDIGO)+'" stroke-width="2"'+(dash?' stroke-dasharray="5,3"':'')+'/>';
      };
      var vaLabel=function(midDeg,key,rad){
        if(!lbv[key])return;
        var t=midDeg*Math.PI/180, lx=vaCx+(rad||30)*Math.cos(t), ly=vaCy-(rad||30)*Math.sin(t);
        s+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="600">'+lbv[key]+'</text>';
      };
      if(fig.mode==='vertical'){
        var sl=fig.slant!==undefined?fig.slant:32;
        vaLine(180,0);                                    /* first line, full width, horizontal */
        vaLine(180+sl,sl);                                /* second line through the same centre, slanted */
        s+='<circle cx="'+vaCx+'" cy="'+vaCy+'" r="2.5" fill="'+FIG_INK+'"/>';
        vaLabel(sl/2,'1',26); vaLabel(180+sl/2,'2',26);     /* top / bottom wedge = a true vertical pair */
        vaLabel(90+sl/2,'3',26); vaLabel(270+sl/2,'4',26);  /* the other (also vertical) pair, if labelled */
      } else if(fig.mode==='linear'){
        var sl2=fig.slant!==undefined?fig.slant:55;
        vaLine(180,0);                                    /* the straight line, full width */
        var a3=sl2*Math.PI/180;
        s+='<line x1="'+vaCx.toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+(vaCx+vaLen*0.85*Math.cos(a3)).toFixed(1)+'" y2="'+(vaCy-vaLen*0.85*Math.sin(a3)).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        s+='<circle cx="'+vaCx+'" cy="'+vaCy+'" r="2.5" fill="'+FIG_INK+'"/>';
        vaLabel(sl2/2,'1',24);            /* wedge from 0 to sl2 */
        vaLabel((sl2+180)/2,'2',24);      /* wedge from sl2 to 180 — the two always sum to 180 */
      } else { /* complementary: a right-angle corner (tick-marked) split into two */
        s+='<line x1="'+(vaCx-vaLen*0.85).toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+vaCx.toFixed(1)+'" y2="'+vaCy.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        s+='<line x1="'+vaCx.toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+vaCx.toFixed(1)+'" y2="'+(vaCy-vaLen*0.85).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        var sl4=fig.slant!==undefined?fig.slant:38, a4=sl4*Math.PI/180;
        s+='<line x1="'+vaCx.toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+(vaCx+vaLen*0.7*Math.cos(a4)).toFixed(1)+'" y2="'+(vaCy-vaLen*0.7*Math.sin(a4)).toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8"/>';
        s+='<rect x="'+(vaCx-9).toFixed(1)+'" y="'+(vaCy-9).toFixed(1)+'" width="9" height="9" fill="none" stroke="'+FIG_INK+'" stroke-width="1"/>';
        s+='<circle cx="'+vaCx+'" cy="'+vaCy+'" r="2.5" fill="'+FIG_INK+'"/>';
        vaLabel(sl4/2,'1',22);            /* wedge from 0 to sl4 */
        vaLabel((sl4+90)/2,'2',22);       /* wedge from sl4 to 90 — the two always sum to 90 */
      }
      s+='</svg>';
      return s;
    }
    /* ── two parallel lines cut by a transversal ──
       Angles use the standard textbook numbering: 1-4 at the upper
       intersection, 5-8 at the lower, each as upper-left, upper-right,
       lower-left, lower-right. Label positions are computed from the actual
       region BISECTORS rather than fixed offsets, so a label always lands
       inside its own wedge whatever the transversal's slant. */
    else if(fig.type==='transversal'||fig.type==='lines'){
      var tAng=fig.angle||72, yA=62, yB=146, mL=22;
      var tdy=yB-yA, tdx=tdy/Math.tan(tAng*Math.PI/180);
      var IA=[W/2-tdx/2, yA], IB=[W/2+tdx/2, yB];
      var tlen=Math.sqrt(tdx*tdx+tdy*tdy), ux=tdx/tlen, uy=tdy/tlen, ext=30;
      if(fig.title) s+=_svgTitle(fig.title, W, 17, 10.5, FIG_INK);
      /* the two parallel lines */
      [yA,yB].forEach(function(yy){
        s+='<line x1="'+mL+'" y1="'+yy+'" x2="'+(W-mL)+'" y2="'+yy+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        /* matching chevrons = the standard "these are parallel" mark */
        var mx=W-mL-30;
        s+='<polyline points="'+(mx-5)+','+(yy-5)+' '+mx+','+yy+' '+(mx-5)+','+(yy+5)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.6"/>';
      });
      /* the transversal */
      s+='<line x1="'+(IA[0]-ux*ext).toFixed(1)+'" y1="'+(IA[1]-uy*ext).toFixed(1)+'" x2="'+(IB[0]+ux*ext).toFixed(1)+'" y2="'+(IB[1]+uy*ext).toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="2"/>';
      var _bis=function(a,b){var n=[a[0]+b[0],a[1]+b[1]],m=Math.sqrt(n[0]*n[0]+n[1]*n[1])||1;return [n[0]/m,n[1]/m];};
      var L=[-1,0], R=[1,0], U=[-ux,-uy], D=[ux,uy];
      var dirs={UL:_bis(L,U), UR:_bis(U,R), LR:_bis(R,D), LL:_bis(D,L)};
      var slot={1:['UL',IA],2:['UR',IA],3:['LL',IA],4:['LR',IA],
                5:['UL',IB],6:['UR',IB],7:['LL',IB],8:['LR',IB]};
      var lbs=fig.labels||{};
      var hasAltAngles = !!(fig.angles || fig.angle_marks || fig.angle_measures || fig.angle_aef);
      if(Array.isArray(lbs)){
        if(!hasAltAngles){
          lbs = { 2: lbs[0], 6: lbs[1], 3: lbs[2], 7: lbs[3] };
        } else {
          lbs = {};
        }
      }
      var hasNumericSlots = Object.keys(lbs).some(function(k){ return slot[k] && lbs[k]; });
      if(!hasNumericSlots){
        var fallbackAngles = fig.angles || fig.angle_marks || fig.angle_measures || [];
        var extracted = [];
        if(Array.isArray(fallbackAngles)){
          fallbackAngles.forEach(function(a){
            if(!a) return;
            var valStr = (a.value != null && String(a.value).trim() !== '' && a.value !== a.label)
              ? (a.label ? (a.label + ' = ' + a.value) : String(a.value))
              : String(a.label || a.angle || '');
            if(valStr) extracted.push(_formatMathLabel(valStr));
          });
        } else if(typeof fallbackAngles === 'object'){
          Object.keys(fallbackAngles).forEach(function(ak){
            extracted.push(_formatMathLabel(String(fallbackAngles[ak])));
          });
        }
        if(extracted.length && !hasNumericSlots){
          lbs = { 2: extracted[0], 6: extracted[1], 3: extracted[2], 7: extracted[3] };
        }
      }
      Object.keys(lbs).forEach(function(k){
        var sl=slot[k]; if(!sl || !lbs[k]) return;
        var dv=dirs[sl[0]], base=sl[1], rad=fig.lrad||26;
        var hot=(fig.highlight||[]).indexOf(+k)>=0;
        var fmtA = _formatMathLabel(lbs[k]);
        var axL = _clampLabelX(base[0]+dv[0]*rad, fmtA, 10, 'middle', 8, W-8);
        s+='<text x="'+axL.toFixed(1)+'" y="'+(base[1]+dv[1]*rad).toFixed(1)+'" font-size="10" fill="'+(hot?FIG_AMBER_TEXT:FIG_INK)+'" text-anchor="middle" dominant-baseline="middle" font-weight="'+(hot?'700':'400')+'">'+esc(fmtA)+'</text>';
      });
      s+='</svg>';
      return s;
    }
    else if(fig.type==='circle'||fig.type==='circle_sector'||fig.type==='circle_chord'||fig.type==='circle_tangent_segment'||fig.type==='circle_inscribed_rect'||fig.type==='square_circumscribed_circle'){
      /* external-point secant figures need extra room BELOW the circle for the
         external point, so they're anchored high rather than dead-centre. */
      var cx4=W/2,cy4=fig.secant_lines?Math.min(H-40,110):H/2;
      /* when the external point is very far from the circle (large `r`
         multiplier), shrink the circle itself to fit rather than letting the
         point run off the canvas — better a smaller circle than a truncated
         construction. */
      var r=fig.secant_lines?Math.min(Math.min(W,H)/2-30,(H-cy4-24)/(+fig.secant_lines.r)):Math.min(W,H)/2-30;
      /* polar helper: math-convention angles (CCW, 0deg = east) mapped onto the
         SVG's y-down screen space. Because y is flipped, an INCREASING math
         angle sweeps counter-clockwise on screen, which is SVG sweep-flag 0. */
      var _pol=function(a,rad){var t=a*Math.PI/180;return [cx4+(rad===undefined?r:rad)*Math.cos(t), cy4-(rad===undefined?r:rad)*Math.sin(t)];};
      var _span=function(a1,a2){return ((a2-a1)%360+360)%360;};
      if(fig.type==='square_circumscribed_circle'){
        s+='<rect x="'+(cx4-r).toFixed(1)+'" y="'+(cy4-r).toFixed(1)+'" width="'+(2*r).toFixed(1)+'" height="'+(2*r).toFixed(1)+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
      }
      if(fig.rings&&fig.rings.length){
        var rmaxR=Math.max.apply(null,fig.rings.map(function(x){return +x.r;}))||1;
        fig.rings.slice().sort(function(a,b){return (+b.r)-(+a.r);}).forEach(function(rg,ri){
          var rr=r*(+rg.r)/rmaxR;
          var fc=rg.fill==='amber'?FIG_AMBER_FILL:(rg.fill==='base'?FIG_INDIGO_FILL:(ri===0?FIG_INDIGO_FILL:'none'));
          s+='<circle cx="'+cx4+'" cy="'+cy4+'" r="'+rr.toFixed(1)+'" fill="'+fc+'" stroke="'+FIG_INDIGO+'" stroke-width="1.7"/>';
          if(rg.label) s+='<text x="'+cx4+'" y="'+(cy4-rr-4).toFixed(1)+'" font-size="10" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(rg.label)+'</text>';
        });
      }
      else s+='<circle cx="'+cx4+'" cy="'+cy4+'" r="'+r+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      if(fig.type==='circle_inscribed_rect'){
        var rw=r*1.5, rh=r*1.1;
        s+='<rect x="'+(cx4-rw/2).toFixed(1)+'" y="'+(cy4-rh/2).toFixed(1)+'" width="'+rw.toFixed(1)+'" height="'+rh.toFixed(1)+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
        s+='<line x1="'+(cx4-rw/2).toFixed(1)+'" y1="'+(cy4+rh/2).toFixed(1)+'" x2="'+(cx4+rw/2).toFixed(1)+'" y2="'+(cy4-rh/2).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.6" stroke-dasharray="4,3"/>';
        if(fig.rectLength) s+='<text x="'+cx4+'" y="'+(cy4+rh/2+13).toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+esc(fig.rectLength)+'</text>';
      }
      if(fig.type==='circle_tangent_segment'){
        var tPt=[cx4, cy4-r], extPt=[cx4+r*1.45, cy4-r];
        s+='<line x1="'+cx4+'" y1="'+cy4+'" x2="'+tPt[0]+'" y2="'+tPt[1]+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
        s+='<line x1="'+tPt[0]+'" y1="'+tPt[1]+'" x2="'+extPt[0].toFixed(1)+'" y2="'+extPt[1].toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="2"/>';
        s+='<line x1="'+cx4+'" y1="'+cy4+'" x2="'+extPt[0].toFixed(1)+'" y2="'+extPt[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8" stroke-dasharray="4,3"/>';
        if(fig.tangentLabel) s+='<text x="'+((tPt[0]+extPt[0])/2).toFixed(1)+'" y="'+(tPt[1]-7).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(fig.tangentLabel)+'</text>';
      }
      /* sector wedge (central angle) */
      var rawCentral = fig.centralAngle != null ? fig.centralAngle : fig.angle;
      var secSpec = fig.sector || (rawCentral != null ? { start_deg: 0, end_deg: parseFloat(rawCentral)||60, label: String(rawCentral) } : (fig.chordAngle ? { start_deg: 0, end_deg: +fig.chordAngle||90, label: fig.chordAngle+'°' } : null));
      if(secSpec){
        var sa = typeof secSpec === 'object' ? (+secSpec.start_deg||0) : 0;
        var sb = typeof secSpec === 'object' ? (secSpec.end_deg===undefined?90:+secSpec.end_deg) : (+secSpec||60);
        var sp=_span(sa,sb), pA=_pol(sa), pB=_pol(sb), lg=sp>180?1:0;
        s+='<path d="M'+cx4+','+cy4+' L'+pA[0].toFixed(1)+','+pA[1].toFixed(1)+' A'+r+','+r+' 0 '+lg+' 0 '+pB[0].toFixed(1)+','+pB[1].toFixed(1)+' Z" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="1.6"/>';
        var secLbl = (typeof secSpec === 'object' && secSpec.label) ? _formatMathLabel(secSpec.label) : (typeof secSpec === 'number' ? secSpec+'°' : '');
        if(secLbl){var lm=_pol(sa+sp/2, r*0.52);s+='<text x="'+lm[0].toFixed(1)+'" y="'+lm[1].toFixed(1)+'" font-size="11" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="600">'+esc(secLbl)+'</text>';}
        if(fig.arcLabel){
          var amArc=_pol(sa+sp/2, r+14);
          var fmtArcL = _formatMathLabel(fig.arcLabel);
          var arcLx = _clampLabelX(amArc[0], fmtArcL, 10, 'middle', 8, W-8);
          var arcLy = Math.max(12, Math.min(H-8, amArc[1]));
          s+='<text x="'+arcLx.toFixed(1)+'" y="'+arcLy.toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="600">'+esc(fmtArcL)+'</text>';
        }
      }
      /* highlighted arc(s) — accepts one {start_deg,end_deg,label} or an array */
      [].concat(fig.arc||[]).forEach(function(ac){
        var aa=+ac.start_deg||0, ab=(ac.end_deg===undefined?90:+ac.end_deg);
        var asp=_span(aa,ab), qA=_pol(aa), qB=_pol(ab), alg=asp>180?1:0;
        s+='<path d="M'+qA[0].toFixed(1)+','+qA[1].toFixed(1)+' A'+r+','+r+' 0 '+alg+' 0 '+qB[0].toFixed(1)+','+qB[1].toFixed(1)+'" fill="none" stroke="'+(ac.color||FIG_AMBER)+'" stroke-width="3.6" stroke-linecap="round"/>';
        if(ac.label){
          var am=_pol(aa+asp/2, r+14);
          var fmtAc = _formatMathLabel(ac.label);
          var acX = _clampLabelX(am[0], fmtAc, 10, 'middle', 8, W-8);
          var acY = Math.max(12, Math.min(H-8, am[1]));
          s+='<text x="'+acX.toFixed(1)+'" y="'+acY.toFixed(1)+'" font-size="10" fill="'+(ac.color||FIG_AMBER_TEXT)+'" text-anchor="middle" dominant-baseline="middle">'+esc(fmtAc)+'</text>';
        }
      });
      /* chords: [[a1,a2],...] — several chords (e.g. an inscribed angle's two rays) */
      (fig.chords||[]).forEach(function(cd){
        var c1=_pol(+cd[0]),c2=_pol(+cd[1]);
        s+='<line x1="'+c1[0].toFixed(1)+'" y1="'+c1[1].toFixed(1)+'" x2="'+c2[0].toFixed(1)+'" y2="'+c2[1].toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8"/>';
      });
      if(fig.chord_segs){
        var cs=fig.chord_segs, A=_pol(+cs.c1[0]),C=_pol(+cs.c1[1]),B=_pol(+cs.c2[0]),D=_pol(+cs.c2[1]);
        var d1x=C[0]-A[0],d1y=C[1]-A[1],d2x=D[0]-B[0],d2y=D[1]-B[1];
        var den=d1x*d2y-d1y*d2x, tX=den?((B[0]-A[0])*d2y-(B[1]-A[1])*d2x)/den:0.5;
        var X=[A[0]+tX*d1x, A[1]+tX*d1y];
        [[A,C],[B,D]].forEach(function(pr){
          s+='<line x1="'+pr[0][0].toFixed(1)+'" y1="'+pr[0][1].toFixed(1)+'" x2="'+pr[1][0].toFixed(1)+'" y2="'+pr[1][1].toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8"/>';
        });
        s+='<circle cx="'+X[0].toFixed(1)+'" cy="'+X[1].toFixed(1)+'" r="2.5" fill="'+FIG_INK+'"/>';
        var lbl=cs.labels||{};
        [['a',A],['c',C],['b',B],['d',D]].forEach(function(pl){
          if(!lbl[pl[0]])return;
          var m=[(pl[1][0]+X[0])/2,(pl[1][1]+X[1])/2];
          var ox=(m[0]-cx4), oy=(m[1]-cy4), ol=Math.sqrt(ox*ox+oy*oy)||1;
          s+='<text x="'+(m[0]+ox/ol*9).toFixed(1)+'" y="'+(m[1]+oy/ol*9+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(lbl[pl[0]])+'</text>';
        });
      }
      (fig.points||[]).forEach(function(p){
        var ang;
        if(p.angle != null) ang = +p.angle;
        else if(p.x != null && p.y != null) ang = Math.atan2((p.y - (fig.cy || 0)), (p.x - (fig.cx || 0))) * 180 / Math.PI;
        else ang = 0;
        if(isNaN(ang)) ang = 0;
        var pp=_pol(ang);
        if(isNaN(pp[0]) || isNaN(pp[1])) return;
        s+='<circle cx="'+pp[0].toFixed(1)+'" cy="'+pp[1].toFixed(1)+'" r="3.4" fill="'+FIG_INK+'"/>';
        if(p.label){
          var lp=_pol(ang, r+13);
          var pLx = _clampLabelX(lp[0], String(p.label), 10, 'middle', 8, W-8);
          var pLy = Math.max(12, Math.min(H-8, lp[1]));
          s+='<text x="'+pLx.toFixed(1)+'" y="'+pLy.toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="middle" font-weight="600">'+esc(p.label)+'</text>';
        }
      });
      if(fig.secant_lines){
        var slx=fig.secant_lines, spR=r*(+slx.r), pAng=270*Math.PI/180;
        var pXY=[cx4+spR*Math.cos(pAng), cy4-spR*Math.sin(pAng)];
        s+='<circle cx="'+pXY[0].toFixed(1)+'" cy="'+pXY[1].toFixed(1)+'" r="3" fill="'+FIG_INK+'"/>';
        if(slx.label)s+='<text x="'+pXY[0].toFixed(1)+'" y="'+(pXY[1]+16).toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+esc(slx.label)+'</text>';
        (slx.through||[]).forEach(function(fa){
          var fp=_pol(+fa);
          s+='<line x1="'+pXY[0].toFixed(1)+'" y1="'+pXY[1].toFixed(1)+'" x2="'+fp[0].toFixed(1)+'" y2="'+fp[1].toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6" stroke-dasharray="5,3"/>';
        });
      }
      if(fig.center || fig.centerLabel){
        var cLbl = fig.center || fig.centerLabel;
        s+='<circle cx="'+cx4+'" cy="'+cy4+'" r="3" fill="'+FIG_INDIGO+'"/>';
        s+='<text x="'+(cx4-6)+'" y="'+(cy4+13)+'" font-size="10.5" fill="'+FIG_INK+'" text-anchor="end">'+esc(cLbl)+'</text>';
      }
      var radLbl = _formatMathLabel(fig.labelR || fig.radius || (fig.r ? 'r = '+fig.r : ''));
      if(radLbl){
        var radY = secSpec ? (cy4 + 14) : (cy4 - 8);
        s+='<line x1="'+cx4+'" y1="'+cy4+'" x2="'+(cx4+r)+'" y2="'+cy4+'" stroke="'+FIG_AMBER+'" stroke-width="1.8" stroke-dasharray="5,3"/>';
        s+='<text x="'+(cx4+r/2)+'" y="'+radY.toFixed(1)+'" font-size="10.5" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(radLbl)+'</text>';
      }
      if(fig.diameter){s+='<line x1="'+(cx4-r)+'" y1="'+cy4+'" x2="'+(cx4+r)+'" y2="'+cy4+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8" stroke-dasharray="5,3"/>';s+='<text x="'+cx4+'" y="'+(cy4-10)+'" font-size="10.5" fill="'+FIG_INDIGO2+'" text-anchor="middle">'+esc(_formatMathLabel(fig.diameter))+'</text>';}
      if(fig.chord || fig.type==='circle_chord'){
        var ca = Array.isArray(fig.chord) ? fig.chord : [35, 145];
        s+='<line x1="'+(cx4+r*Math.cos(ca[0]*Math.PI/180)).toFixed(1)+'" y1="'+(cy4-r*Math.sin(ca[0]*Math.PI/180)).toFixed(1)+'" x2="'+(cx4+r*Math.cos(ca[1]*Math.PI/180)).toFixed(1)+'" y2="'+(cy4-r*Math.sin(ca[1]*Math.PI/180)).toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="2"/>';
        if(fig.chordLabel) s+='<text x="'+cx4+'" y="'+(cy4-r*0.58-6).toFixed(1)+'" font-size="10" fill="'+FIG_TEAL+'" text-anchor="middle">'+esc(fig.chordLabel)+'</text>';
      }
      if(fig.label || fig.side)s+='<text x="'+cx4+'" y="'+(cy4+r+18)+'" font-size="10.5" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(fig.label || fig.side)+'</text>';
    }
    /* ── bar chart ── */
    else if(fig.type==='bar'||fig.type==='bars'){
      var data=fig.data||fig.bars||[];
      if((!data||!data.length)&&Array.isArray(fig.labels)&&Array.isArray(fig.values)){
        data=fig.labels.map(function(lbl,idx){
          return {label:lbl,val:fig.values[idx]!=null?fig.values[idx]:0};
        });
      }
      var vals=data.map(function(d){var v=typeof d==='number'?d:(d&&(d.val!=null?d.val:d.value));return isFinite(+v)?+v:0;});
      var maxv=vals.length?Math.max.apply(null,vals):1;
      if(!isFinite(maxv)||maxv<=0) maxv=1;
      var dataLen=Math.max(1,data.length);
      var padL=38,padB=38,padT=fig.title?30:16,padR=10,bw=(W-padL-padR)/dataLen,barMaxH=H-padT-padB;
      var anyLongLbl = data.some(function(d,i){
        var dl = (typeof d==='object'&&d&&d.label!=null)?String(d.label):((Array.isArray(fig.labels)&&fig.labels[i]!=null)?String(fig.labels[i]):'');
        return dl.length * 4.8 > bw * 0.92;
      });
      /* y-axis */
      s+='<line x1="'+padL+'" y1="'+padT+'" x2="'+padL+'" y2="'+(H-padB)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      s+='<line x1="'+padL+'" y1="'+(H-padB)+'" x2="'+(W-padR)+'" y2="'+(H-padB)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      /* y grid & labels */
      var ySteps=4;
      for(var ys=0;ys<=ySteps;ys++){
        var yv=maxv*ys/ySteps,yp=H-padB-(yv/maxv*barMaxH);
        s+='<line x1="'+(padL-3)+'" y1="'+yp.toFixed(1)+'" x2="'+(W-padR)+'" y2="'+yp.toFixed(1)+'" stroke="'+(ys===0?FIG_INK:FIG_GRID)+'" stroke-width="'+(ys===0?'1.5':'0.5')+'"/>';
        s+='<text x="'+(padL-6)+'" y="'+(yp+3).toFixed(1)+'" font-size="8" fill="'+FIG_MUTED+'" text-anchor="end">'+Math.round(yv)+'</text>';
      }
      data.forEach(function(d,i){
        var rawV=typeof d==='number'?d:(d&&(d.val!=null?d.val:d.value)!=null?(d.val!=null?d.val:d.value):0);
        var dVal=isFinite(+rawV)?+rawV:(d&&isFinite(+d.plotVal)?+d.plotVal:maxv*0.55);
        var dLbl=String((typeof d==='object'&&d&&d.label!=null)?d.label:((Array.isArray(fig.labels)&&fig.labels[i]!=null)?fig.labels[i]:(Array.isArray(fig.categories)&&fig.categories[i]!=null?fig.categories[i]:'')));
        var bh=(dVal/maxv)*barMaxH,bx=padL+i*bw+bw*0.12,by=H-padB-bh;
        s+='<rect x="'+bx.toFixed(1)+'" y="'+by.toFixed(1)+'" width="'+(bw*0.76).toFixed(1)+'" height="'+bh.toFixed(1)+'" fill="'+(d&&d.color||FIG_SERIES[i%FIG_SERIES.length])+'" rx="2" opacity="0.92"/>';
        var catFs = Math.max(7, Math.min(8.8, (bw * 1.45) / Math.max(1, dLbl.length * 0.56)));
        var catY = (H - padB + 12) + (anyLongLbl && (i % 2 === 1) ? 10 : 0);
        var catX = _clampLabelX(padL + (i + 0.5) * bw, dLbl, catFs, 'middle', 6, W - 6);
        s+='<text x="'+catX.toFixed(1)+'" y="'+catY.toFixed(1)+'" font-size="'+catFs.toFixed(1)+'" fill="'+FIG_INK+'" text-anchor="middle">'+esc(dLbl)+'</text>';
        var valY = Math.max(padT - 2, by - 4);
        s+='<text x="'+(bx+(bw*0.38)).toFixed(1)+'" y="'+valY.toFixed(1)+'" font-size="8" fill="'+FIG_INK+'" text-anchor="middle">'+esc(rawV)+'</text>';
      });
      if(fig.ylabel)s+='<text x="12" y="'+(H/2)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90 12,'+(H/2)+')">'+esc(fig.ylabel)+'</text>';
      if(fig.title)s+=_svgTitle(fig.title, W, 14, 10, FIG_INK);
    }
    /* ── a grid of dots (marbles/objects in a bag) — `groups` are drawn in
       order so the FIRST `groups[0].n` dots are colored group 0, etc.; this
       is a literal restatement of counts already given in the question text
       (e.g. "18 marbles, 12 red"), not a new computation, so it never
       spoils a probability-from-counts answer. ── */
    else if(fig.type==='dots'){
      if(Array.isArray(fig.counts)&&fig.counts.length){
        var cArr=fig.counts, nCols=cArr.length, padTop=fig.title?26:14, padBot=24, padX=24;
        if(fig.title) s+=_svgTitle(fig.title, W, 15, 10, FIG_INK);
        var colSpan=(W-2*padX)/nCols;
        cArr.forEach(function(cnt,ci){
          var cxBase=padX+(ci+0.5)*colSpan;
          var subCols=cnt>10?2:1, subRows=Math.ceil(cnt/subCols);
          var availH=H-padTop-padBot;
          var stepY=Math.min(12, availH/Math.max(1,subRows));
          var dotR=Math.min(3.5, stepY*0.38);
          for(var di=0;di<cnt;di++){
            var sc=di%subCols, sr=Math.floor(di/subCols);
            var dcx=cxBase+(subCols>1?(sc-0.5)*dotR*2.8:0);
            var dcy=(H-padBot-dotR-2)-sr*stepY;
            s+='<circle cx="'+dcx.toFixed(1)+'" cy="'+dcy.toFixed(1)+'" r="'+dotR.toFixed(1)+'" fill="'+(fig.color||FIG_INDIGO2)+'" stroke="'+FIG_INK+'" stroke-width="0.6"/>';
          }
          s+='<text x="'+cxBase.toFixed(1)+'" y="'+(H-8)+'" font-size="9" font-weight="600" fill="'+FIG_INK+'" text-anchor="middle">a'+(ci+1)+' = '+cnt+'</text>';
        });
      } else {
        var totalD=fig.total||0, groupsD=fig.groups||[];
        var grpLegend = (!fig.label && groupsD.length) ? groupsD.map(function(g){ return (g.label||'Group') + ' (' + g.n + ')'; }).join(' · ') : (fig.label || '');
        var topOff = fig.title ? 20 : 0;
        var hD = grpLegend ? (H - 20) : H;
        if(fig.title) s+=_svgTitle(fig.title, W, 14, 10, FIG_INK);
        var colsD=Math.ceil(Math.sqrt(totalD*(W/(hD-topOff))))||1, rowsD=Math.ceil(totalD/colsD);
        var padD=28, cellW=(W-2*padD)/colsD, cellH=(hD-topOff-2*padD)/rowsD, rD=Math.min(cellW,cellH)*0.34;
        if(fig.bag){
          s+='<rect x="'+(padD*0.4)+'" y="'+(topOff+padD*0.5)+'" width="'+(W-padD*0.8)+'" height="'+(hD-topOff-padD*0.8)+'" rx="16" fill="none" stroke="'+FIG_MUTED+'" stroke-width="1.5" stroke-dasharray="4,3"/>';
        }
        var idxD=0, seqColor=[];
        groupsD.forEach(function(g, gi){for(var k=0;k<g.n;k++)seqColor.push(g.color||FIG_SERIES[gi%FIG_SERIES.length]);});
        for(var i=0;i<totalD;i++){
          var col=i%colsD, row=Math.floor(i/colsD);
          var cx=padD+cellW*(col+0.5), cy=topOff+padD+cellH*(row+0.5);
          s+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+rD.toFixed(1)+'" fill="'+(seqColor[i]||FIG_GRID)+'" stroke="'+FIG_INK+'" stroke-width="0.8"/>';
        }
        if(grpLegend)s+=_svgTitle(grpLegend, W, H-6, 9.5, FIG_MUTED);
      }
    }
    /* ── two-circle Venn diagram, GENERIC fixed overlap (not scaled to the
       real P(A and B)) — for independent-event problems where the whole
       point is applying a rule (P(A)*P(B) or P(A)+P(B)-P(A and B)) rather
       than reading an answer off the picture; drawing the true overlap area
       would visually pre-compute the intersection, so like `vertex_angles`
       the fixed shape carries no numeric truth, only the labels do. ── */
    else if(fig.type==='venn'||fig.type==='venn_populated'){
      var vcx=W/2, vcy=H/2+6, vr=Math.min(W,H)*0.26, voff=vr*0.62;
      if(fig.type==='venn_populated' || fig.neither != null || fig.regionOutside != null || fig.countOutside != null){
        s+='<rect x="14" y="22" width="'+(W-28)+'" height="'+(H-32)+'" rx="6" fill="none" stroke="'+FIG_MUTED+'" stroke-width="1.3"/>';
        s+='<text x="24" y="35" font-size="10" font-weight="bold" fill="'+FIG_MUTED+'">ξ</text>';
      }
      s+='<circle cx="'+(vcx-voff)+'" cy="'+vcy+'" r="'+vr+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      s+='<circle cx="'+(vcx+voff)+'" cy="'+vcy+'" r="'+vr+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="2"/>';
      var lblSetA = String(fig.setA || fig.labelA || 'A');
      var lblSetB = String(fig.setB || fig.labelB || 'B');
      var fsSetA = Math.max(8, Math.min(11, (W*0.42) / Math.max(1, lblSetA.length*0.58)));
      var fsSetB = Math.max(8, Math.min(11, (W*0.42) / Math.max(1, lblSetB.length*0.58)));
      var xSetA = _clampLabelX(vcx-voff-vr*0.35, lblSetA, fsSetA, 'middle', 18, vcx-6);
      var xSetB = _clampLabelX(vcx+voff+vr*0.35, lblSetB, fsSetB, 'middle', vcx+6, W-18);
      s+='<text x="'+xSetA.toFixed(1)+'" y="'+(vcy-vr-5).toFixed(1)+'" font-size="'+fsSetA.toFixed(1)+'" font-weight="bold" fill="'+FIG_INDIGO+'" text-anchor="middle">'+esc(lblSetA)+'</text>';
      s+='<text x="'+xSetB.toFixed(1)+'" y="'+(vcy-vr-5).toFixed(1)+'" font-size="'+fsSetB.toFixed(1)+'" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(lblSetB)+'</text>';
      var tA = fig.textA != null ? fig.textA : (fig.regionOnlyA != null ? fig.regionOnlyA : (fig.onlyA != null ? fig.onlyA : fig.countA));
      var tB = fig.textB != null ? fig.textB : (fig.regionOnlyB != null ? fig.regionOnlyB : (fig.onlyB != null ? fig.onlyB : fig.countB));
      var tBoth = fig.regionBoth != null ? fig.regionBoth : (fig.both != null ? fig.both : fig.countBoth);
      var tOut = fig.regionOutside != null ? fig.regionOutside : (fig.neither != null ? fig.neither : fig.countOutside);
      if(tA!=null)s+='<text x="'+(vcx-voff-vr*0.35).toFixed(1)+'" y="'+(vcy+4).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle">'+esc(tA)+'</text>';
      if(tB!=null)s+='<text x="'+(vcx+voff+vr*0.35).toFixed(1)+'" y="'+(vcy+4).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle">'+esc(tB)+'</text>';
      if(tBoth!=null)s+='<text x="'+vcx.toFixed(1)+'" y="'+(vcy+4).toFixed(1)+'" font-size="11" font-weight="700" fill="'+FIG_INK+'" text-anchor="middle">'+esc(tBoth)+'</text>';
      if(tOut!=null)s+='<text x="'+(W-22)+'" y="'+(H-16)+'" font-size="10.5" font-weight="600" fill="'+FIG_MUTED+'" text-anchor="end">'+esc(tOut)+'</text>';
      if(fig.title)s+=_svgTitle(fig.title, W, 15, 10.5, FIG_INK);
    }
    /* ── scatter plot ── */
    else if(fig.type==='scatter'){
      var pts6=fig.pts||fig.data||fig.points||[],padS=38;
      pts6=pts6.map(function(p){return Array.isArray(p)?p:[+p.x||0,+p.y||0];});
      var xs=pts6.map(function(p){return p[0];}),ys=pts6.map(function(p){return p[1];});
      var xmin=xs.length?Math.min.apply(null,xs):0,xmax=xs.length?Math.max.apply(null,xs):10,ymin=ys.length?Math.min.apply(null,ys):0,ymax=ys.length?Math.max.apply(null,ys):10;
      var xpad=(xmax-xmin)*0.1||1,ypad=(ymax-ymin)*0.1||1;
      xmin-=xpad;xmax+=xpad;ymin-=ypad;ymax+=ypad;
      var scx2=(W-2*padS)/((xmax-xmin)||1),scy2=(H-2*padS)/((ymax-ymin)||1);
      s+='<line x1="'+padS+'" y1="'+(H-padS)+'" x2="'+(W-padS)+'" y2="'+(H-padS)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      s+='<line x1="'+padS+'" y1="'+padS+'" x2="'+padS+'" y2="'+(H-padS)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      pts6.forEach(function(p){var px=(p[0]-xmin)*scx2+padS,py=H-padS-(p[1]-ymin)*scy2;s+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="4" fill="'+(fig.color||FIG_INDIGO2)+'" opacity="0.8"/>';});
      if(fig.line){var lx1=xmin,ly1=fig.line.m*lx1+fig.line.b,lx2=xmax,ly2=fig.line.m*lx2+fig.line.b;var spx1=(lx1-xmin)*scx2+padS,spy1=H-padS-(ly1-ymin)*scy2,spx2=(lx2-xmin)*scx2+padS,spy2=H-padS-(ly2-ymin)*scy2;s+='<line x1="'+spx1+'" y1="'+spy1+'" x2="'+spx2+'" y2="'+spy2+'" stroke="'+FIG_AMBER+'" stroke-width="1.5" stroke-dasharray="5,3"/>';}
      if(fig.xlabel)s+='<text x="'+(W/2)+'" y="'+(H-padS+20)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(fig.xlabel)+'</text>';
      if(fig.ylabel)s+='<text x="12" y="'+(H/2)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90 12,'+(H/2)+')">'+esc(fig.ylabel)+'</text>';
    }
    /* ── number line ── */
    else if(fig.type==='numberline'){
      var rawRange = (Array.isArray(fig.range) && fig.range[1] > fig.range[0]) ? fig.range : null;
      var nl=rawRange||[fig.min!=null?fig.min:-5, fig.max!=null?fig.max:5],padN=30;
      if(nl[1]<=nl[0]) nl=[nl[0]-5, nl[0]+5];
      var nlW=W-2*padN,scnl=nlW/((nl[1]-nl[0])||1);
      var my=H/2;
      s+='<line x1="'+padN+'" y1="'+my+'" x2="'+(W-padN)+'" y2="'+my+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
      /* shaded sub-intervals (favourable region for a length-probability question) */
      (fig.shade||[]).forEach(function(sh){
        var a=padN+(sh[0]-nl[0])*scnl, b=padN+(sh[1]-nl[0])*scnl;
        s+='<line x1="'+a.toFixed(1)+'" y1="'+my+'" x2="'+b.toFixed(1)+'" y2="'+my+'" stroke="'+FIG_AMBER+'" stroke-width="7" stroke-linecap="butt" opacity="0.9"/>';
      });
      var nlStep = Math.max(1, Math.ceil((nl[1]-nl[0])/10));
      for(var ni=Math.ceil(nl[0]);ni<=nl[1];ni+=nlStep){var npx=padN+(ni-nl[0])*scnl;s+='<line x1="'+npx.toFixed(1)+'" y1="'+(my-6)+'" x2="'+npx.toFixed(1)+'" y2="'+(my+6)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';s+='<text x="'+npx.toFixed(1)+'" y="'+(my+18)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+ni+'</text>';}
      var nlPts = (fig.points||[]).slice();
      if(!nlPts.length && Array.isArray(fig.marks)){
        fig.marks.forEach(function(mv, mi){ nlPts.push({ x: mv, label: (fig.labels && fig.labels[mi]) || String(mv), open: fig.closed===false }); });
      }
      var nlPlaced = [];
      nlPts.forEach(function(p){
        var val = (p.x !== undefined ? p.x : (p.val !== undefined ? p.val : (typeof p === 'number' ? p : 0)));
        var px=padN+(val-nl[0])*scnl;
        s+='<circle cx="'+px.toFixed(1)+'" cy="'+my+'" r="6" fill="'+(p.open?FIG_BG:(p.color||FIG_AMBER))+'" stroke="'+(p.color||FIG_AMBER)+'" stroke-width="2"/>';
        if(p.label){
          var pStr = String(p.label);
          var lx = _clampLabelX(px, pStr, 9.5, 'middle', 6, W-6);
          var wEst = pStr.length * 5.4 + 6;
          var ySlots = [my - 14, my - 26, my + 30, my - 38];
          var chosenY = ySlots[0];
          for(var si = 0; si < ySlots.length; si++){
            var candY = ySlots[si];
            var conflict = nlPlaced.some(function(b){
              return Math.abs(b.y - candY) < 10 && Math.max(0, Math.min(lx + wEst/2, b.x2) - Math.max(lx - wEst/2, b.x1)) > 0;
            });
            if(!conflict){ chosenY = candY; break; }
          }
          nlPlaced.push({ x1: lx - wEst/2, x2: lx + wEst/2, y: chosenY });
          s+='<text x="'+lx.toFixed(1)+'" y="'+chosenY.toFixed(1)+'" font-size="9.5" fill="'+(p.color||FIG_AMBER_TEXT)+'" text-anchor="middle">'+esc(pStr)+'</text>';
        }
      });
      (fig.arrows||[]).forEach(function(a){var ax1=padN+(a.x1-nl[0])*scnl,ax2=padN+(a.x2-nl[0])*scnl;var col=a.color||FIG_INDIGO2;s+='<line x1="'+ax1+'" y1="'+my+'" x2="'+ax2+'" y2="'+my+'" stroke="'+col+'" stroke-width="3" marker-end="url(#nlarr'+a.x2+')"/><defs><marker id="nlarr'+a.x2+'" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="'+col+'"/></marker></defs>';});
    }
    /* ── rectangle / polygon ── */
    else if(fig.type==='rect'||fig.type==='polygon'){
      var regVerts = null;
      if(!fig.vertices && (!Array.isArray(fig.points) || !fig.points.length) && typeof fig.sides === 'number' && fig.sides >= 3){
        regVerts = [];
        for(var rpi=0; rpi<fig.sides; rpi++){
          var rpAng = -Math.PI/2 + 2*Math.PI*rpi/fig.sides;
          regVerts.push([Math.cos(rpAng)*3, Math.sin(rpAng)*3]);
        }
      }
      var verts2=fig.vertices||(Array.isArray(fig.points)&&fig.points.length?fig.points.map(function(p){return Array.isArray(p)?p:[+p.x||0,+p.y||0];}):(regVerts||[[0,0],[fig.w2||4,0],[fig.w2||4,fig.h2||3],[0,fig.h2||3]]));
      var padP=30;
      var bboxSrc=verts2;
      if(fig.semicircle){
        var scI=fig.semicircle.side||0, scN=verts2.length;
        var scA=verts2[scI], scB=verts2[(scI+1)%scN];
        var scDx=scB[0]-scA[0], scDy=scB[1]-scA[1], scLen=Math.sqrt(scDx*scDx+scDy*scDy)||1, scRad=scLen/2;
        var scMx=(scA[0]+scB[0])/2, scMy=(scA[1]+scB[1])/2;
        var scCent=verts2.reduce(function(a,v){return [a[0]+v[0],a[1]+v[1]];},[0,0]);
        scCent=[scCent[0]/scN, scCent[1]/scN];
        var scNx=-scDy/scLen, scNy=scDx/scLen;
        if((scMx+scNx-scCent[0])*scNx+(scMy+scNy-scCent[1])*scNy<0){scNx=-scNx;scNy=-scNy;}
        bboxSrc=verts2.concat([[scMx+scNx*scRad, scMy+scNy*scRad]]);
      }
      var minxP=Math.min.apply(null,bboxSrc.map(function(v){return v[0];})),maxxP=Math.max.apply(null,bboxSrc.map(function(v){return v[0];}));
      var minyP=Math.min.apply(null,bboxSrc.map(function(v){return v[1];})),maxyP=Math.max.apply(null,bboxSrc.map(function(v){return v[1];}));
      var scP=Math.min((W-2*padP)/(maxxP-minxP||1),(H-2*padP)/(maxyP-minyP||1));
      var toSP=function(v){return [(v[0]-minxP)*scP+padP,H-(v[1]-minyP)*scP-padP];};
      var ptsP=verts2.map(function(v){var sv=toSP(v);return sv[0]+','+sv[1];}).join(' ');
      s+='<polygon points="'+ptsP+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      if(fig.inner&&fig.inner.vertices){
        var ipts=fig.inner.vertices.map(function(v){var sv=toSP(v);return sv[0].toFixed(1)+','+sv[1].toFixed(1);}).join(' ');
        s+='<polygon points="'+ipts+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="1.7"/>';
        if(fig.inner.label){
          var ic=fig.inner.vertices.reduce(function(a,v){return [a[0]+v[0],a[1]+v[1]];},[0,0]);
          var icm=toSP([ic[0]/fig.inner.vertices.length, ic[1]/fig.inner.vertices.length]);
          s+='<text x="'+icm[0].toFixed(1)+'" y="'+(icm[1]+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(fig.inner.label)+'</text>';
        }
      }
      if(Array.isArray(fig.labels)){
        var polyLblPlaced = [];
        fig.labels.forEach(function(lbl,i){
          if(lbl && typeof lbl === 'object' && lbl.text != null){
            var lsv=toSP([+lbl.x||0, +lbl.y||0]);
            var txtS = String(lbl.text);
            var lxObj = _clampLabelX(lsv[0], txtS, 10, 'middle', 8, W-8);
            var lyObj = Math.max(16, Math.min(H-8, lsv[1]));
            var wEst = txtS.length * 5.5 + 8;
            polyLblPlaced.forEach(function(pb){
              if(Math.abs(pb.y - lyObj) < 12 && Math.min(lxObj + wEst/2, pb.x2) - Math.max(lxObj - wEst/2, pb.x1) > 0){
                lyObj = pb.y + 18 <= H - 8 ? pb.y + 18 : pb.y - 18;
              }
            });
            polyLblPlaced.push({ x1: lxObj - wEst/2, x2: lxObj + wEst/2, y: lyObj });
            s+='<text x="'+lxObj.toFixed(1)+'" y="'+lyObj.toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(txtS)+'</text>';
          } else if(verts2[i]) {
            var sv=toSP(verts2[i]);
            var lxV = _clampLabelX(sv[0]+(i%2===0?-14:14), String(lbl), 11, 'middle', 8, W-8);
            var lyV = Math.max(14, Math.min(H-6, sv[1]+(i<2?14:-14)));
            s+='<text x="'+lxV.toFixed(1)+'" y="'+lyV.toFixed(1)+'" font-size="11" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(lbl)+'</text>';
          }
        });
      }
      if(fig.vertex_angle_labels){
        var vaCenter=verts2.reduce(function(a,v){return [a[0]+v[0],a[1]+v[1]];},[0,0]).map(function(c){return c/verts2.length;});
        var vaCenterS=toSP(vaCenter);
        fig.vertex_angle_labels.forEach(function(lbl,i){
          if(!lbl)return;
          var sv=toSP(verts2[i]);
          var dx=vaCenterS[0]-sv[0], dy=vaCenterS[1]-sv[1], dl=Math.hypot(dx,dy)||1;
          s+='<text x="'+(sv[0]+dx/dl*20).toFixed(1)+'" y="'+(sv[1]+dy/dl*20+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(lbl)+'</text>';
        });
      }
      if(Array.isArray(fig.sides)){
        var vl=verts2.length;
        var polyCentS = verts2.reduce(function(acc,v){var sv=toSP(v);return [acc[0]+sv[0]/vl, acc[1]+sv[1]/vl];},[0,0]);
        fig.sides.forEach(function(side,i){
          if(!side)return;
          var a=toSP(verts2[i]),b=toSP(verts2[(i+1)%vl]);
          var mx=(a[0]+b[0])/2,my2=(a[1]+b[1])/2;
          var dx=b[0]-a[0],dy=b[1]-a[1],len=Math.sqrt(dx*dx+dy*dy)||1;
          var nx=-dy/len*14,ny=dx/len*14;
          if((mx+nx-polyCentS[0])*nx+(my2+ny-polyCentS[1])*ny<0){nx=-nx;ny=-ny;}
          var fmtSd = _formatMathLabel(side);
          var sxP = _clampLabelX(mx+nx, fmtSd, 10, 'middle', 8, W-8);
          var syP = Math.max(14, Math.min(H-6, my2+ny+3));
          s+='<text x="'+sxP.toFixed(1)+'" y="'+syP.toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(fmtSd)+'</text>';
        });
      }
      if(fig.semicircle){
        var scSide=fig.semicircle.side||0, vlS=verts2.length;
        var aS=toSP(verts2[scSide]), bS=toSP(verts2[(scSide+1)%vlS]);
        var dxS=bS[0]-aS[0], dyS=bS[1]-aS[1], dlenS=Math.hypot(dxS,dyS)||1, radS=dlenS/2;
        var midxS=(aS[0]+bS[0])/2, midyS=(aS[1]+bS[1])/2;
        var centS=verts2.reduce(function(acc,v){var sv=toSP(v);return [acc[0]+sv[0],acc[1]+sv[1]];},[0,0]);
        centS=[centS[0]/vlS, centS[1]/vlS];
        var nxS=-dyS/dlenS, nyS=dxS/dlenS;
        if((midxS+nxS-centS[0])*nxS+(midyS+nyS-centS[1])*nyS<0){nxS=-nxS;nyS=-nyS;}
        var sweepS=(dxS*nyS-dyS*nxS)>0?0:1;
        s+='<path d="M'+aS[0].toFixed(1)+','+aS[1].toFixed(1)+' A'+radS.toFixed(1)+','+radS.toFixed(1)+' 0 0,'+sweepS+' '+bS[0].toFixed(1)+','+bS[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        if(fig.semicircle.label){
          var lxS=midxS+nxS*radS*0.55, lyS=midyS+nyS*radS*0.55;
          s+='<text x="'+lxS.toFixed(1)+'" y="'+(lyS+3).toFixed(1)+'" font-size="9" fill="'+FIG_INDIGO+'" text-anchor="middle">'+esc(fig.semicircle.label)+'</text>';
        }
      }
      (fig.dlines||[]).forEach(function(dl){
        var a=toSP(dl.from),b=toSP(dl.to);
        s+='<line x1="'+a[0].toFixed(1)+'" y1="'+a[1].toFixed(1)+'" x2="'+b[0].toFixed(1)+'" y2="'+b[1].toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.4" stroke-dasharray="5,3"/>';
        if(dl.right){
          var ux=(a[0]-b[0]),uy=(a[1]-b[1]),ul=Math.sqrt(ux*ux+uy*uy)||1;ux/=ul;uy/=ul;
          var px=-uy,py=ux,sz=7;
          s+='<polyline points="'+(b[0]+px*sz).toFixed(1)+','+(b[1]+py*sz).toFixed(1)+' '+(b[0]+px*sz+ux*sz).toFixed(1)+','+(b[1]+py*sz+uy*sz).toFixed(1)+' '+(b[0]+ux*sz).toFixed(1)+','+(b[1]+uy*sz).toFixed(1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1"/>';
        }
        if(dl.label){var lx=(a[0]+b[0])/2,ly=(a[1]+b[1])/2;s+='<text x="'+(lx+(dl.dx==null?6:dl.dx)).toFixed(1)+'" y="'+(ly+(dl.dy==null?-3:dl.dy)).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="start">'+esc(dl.label)+'</text>';}
      });
    }
    /* auxiliary dashed lines (drawn on top of everything) */
    (fig.aux||[]).forEach(function(ln){
      s+='<line x1="'+ln.x1+'" y1="'+ln.y1+'" x2="'+ln.x2+'" y2="'+ln.y2+'" stroke="'+(ln.color||FIG_MUTED)+'" stroke-width="'+(ln.w||1.2)+'" stroke-dasharray="'+(ln.dash||'5,3')+'"/>';
      if(ln.label){var mx=(+ln.x1+(+ln.x2))/2,myl=(+ln.y1+(+ln.y2))/2;s+='<text x="'+(mx+(ln.dx||0))+'" y="'+(myl+(ln.dy||-8))+'" font-size="9" fill="'+(ln.color||FIG_MUTED)+'" text-anchor="middle">'+esc(ln.label)+'</text>';}
    });
    s+='</svg>';
    return s;
    }catch(e){console.warn('_renderFig:',e);return '';}
  };
})();

(function(){
'use strict';

var FIG_INDIGO=window.FIG_INDIGO||'var(--fig-indigo, var(--indigo, #1E3A6E))',
    FIG_INDIGO2=window.FIG_INDIGO2||'var(--fig-indigo-2, var(--indigo-2, #2B5BA8))',
    FIG_INDIGO_FILL=window.FIG_INDIGO_FILL||'var(--fig-indigo-soft, var(--indigo-soft, rgba(30,58,110,0.08)))',
    FIG_INDIGO_FILL2=window.FIG_INDIGO_FILL2||'var(--fig-indigo-fill2, rgba(43,91,168,0.16))',
    FIG_AMBER=window.FIG_AMBER||'var(--fig-amber, var(--amber-2, #C8902A))',
    FIG_AMBER_TEXT=window.FIG_AMBER_TEXT||'var(--fig-amber-text, var(--amber-text, #8A6017))',
    FIG_AMBER_FILL=window.FIG_AMBER_FILL||'var(--fig-amber-soft, var(--amber-soft, rgba(200,144,42,0.16)))',
    FIG_TEAL=window.FIG_TEAL||'var(--fig-teal, var(--teal, #0e9f8f))',
    FIG_INK=window.FIG_INK||'var(--fig-ink, var(--ink, #0E1726))',
    FIG_MUTED=window.FIG_MUTED||'var(--fig-muted, var(--muted, #5a6577))',
    FIG_GRID=window.FIG_GRID||'var(--fig-grid, var(--grid, #c9d4e8))',
    FIG_BORDER=window.FIG_BORDER||'var(--fig-border, var(--line, #dde4f0))',
    FIG_BG=window.FIG_BG||'var(--fig-bg, var(--paper, #fbfcfe))',
    FIG_SERIES=window.FIG_SERIES||[FIG_INDIGO2,FIG_AMBER,FIG_TEAL,'var(--fig-purple, #8B5CF6)','var(--fig-rose, #DB5C6B)'];

var esc = window._figEsc || function(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); };
var _svgTitle = window._svgTitle;
var _clampLabelX = window._clampLabelX;
var _figA11yLabel = window._figA11yLabel;
var _solvePointLabels = window._solvePointLabels;
var _svgTitle = window._svgTitle;
var _clampLabelX = window._clampLabelX;

/* ── SVG Figure Renderer ────────────────────────────────────────── */
function evalFn(expr,x){
  if(typeof window._safeEval === 'function') return window._safeEval(expr, x);
  return NaN;
}

function renderTableFigure(spec){
  if(!spec) return '';
  if(typeof spec==='string') return spec;
  var headers = spec.headers || [];
  var rows = spec.rows || spec.data || [];
  var caption = spec.caption || '';
  var cls = spec.cls || 'exam-table';
  var h = '<table class="' + cls + '">';
  if(caption) h += '<caption>' + caption + '</caption>';
  if(headers && headers.length){
    h += '<thead><tr>';
    for(var i=0; i<headers.length; i++){
      var hdr = headers[i];
      h += '<th>' + (hdr ? hdr : '<span class="sr-only">Label</span>') + '</th>';
    }
    h += '</tr></thead>';
  }
  if(rows && rows.length){
    h += '<tbody>';
    for(var r=0; r<rows.length; r++){
      h += '<tr>';
      var row = rows[r];
      if(Array.isArray(row)){
        for(var c=0; c<row.length; c++){
          h += '<td>' + (row[c] != null ? row[c] : '') + '</td>';
        }
      } else {
        h += '<td>' + row + '</td>';
      }
      h += '</tr>';
    }
    h += '</tbody>';
  }
  h += '</table>';
  return h;
}
window.renderTableFigure = renderTableFigure;

function renderMathFigure(spec){
  if(!spec) return '';
  if(typeof spec==='string') return spec;
  if(spec.svg) return spec.svg;
  if(!spec.type) return '';
  switch(spec.type){
    case 'function_graph':
    case 'functionGraph':
    case 'plot':
    case 'fn_graph':
      return renderFnGraph(spec);
    case 'geometry_2d':
    case 'geometry2d':
    case 'geom2d':
      return renderGeom2D(spec);
    case 'geometry_3d':
    case 'geometry3d':
    case 'geom3d':
      return renderGeom3D(spec);
    case 'bar_chart':
    case 'barChart':
    case 'barchart':
      return renderBarChart(spec);
    case 'scatter':
    case 'scatter_plot':
    case 'scatterPlot':
    case 'scatterplot':
      return renderScatter(spec);
    case 'pie':
    case 'pie_chart':
    case 'pieChart':
      return renderPie(spec);
    case 'number_line':
    case 'numberLine':
    case 'numberline':
      return renderNumberLine(spec);
    case 'table':
      return renderTableFigure(spec);
    case 'box_plot':
    case 'boxPlot':
    case 'boxplot':
    case 'box':
      return renderBoxPlot(spec);
    case 'histogram':
      return renderHistogram(spec);
    case 'dot_plot':
    case 'dotPlot':
    case 'dotplot':
      return renderDotPlot(spec);
    case 'unit_circle':
    case 'unitCircle':
    case 'unitcircle':
      return renderUnitCircle(spec);
    case 'sinusoid':
      return renderSinusoid(spec);
    case 'normal_curve':
    case 'normalCurve':
    case 'normal_dist':
    case 'normalDist':
    case 'normal':
      return renderNormalCurve(spec);
    case 'slope_field':
    case 'slopeField':
    case 'slopefield':
      return renderSlopeField(spec);
    case 'two_way_table':
    case 'twoWayTable':
    case 'twowaytable':
      return renderTwoWayTable(spec);
    case 'cumulative_frequency':
    case 'cumulativeFrequency':
    case 'cumulative_freq':
    case 'cumulativeFreq':
    case 'ogive':
      return renderCumulativeFrequency(spec);
    case 'tree_diagram':
    case 'treeDiagram':
    case 'tree':
      return renderTreeDiagram(spec);
    case 'bearings':
    case 'bearing':
    case 'bearingDiagram':
    case 'bearing_diagram':
      return renderBearings(spec);
    case 'sign_chart':
    case 'signChart':
      return renderSignChart(spec);
    case 'transformation_grid':
    case 'transformationGrid':
    case 'transformation':
      return renderTransformationGrid(spec);
    case 'voronoi':
      return renderVoronoi(spec);
    case 'argand':
    case 'argand_diagram':
    case 'complex_plane':
      return renderArgand(spec);
    case 'network_graph':
    case 'weighted_graph':
    case 'graph_network':
      return renderNetworkGraph(spec);
    case 'shaded_region':
    case 'qudrat_shaded':
      return renderShadedRegion(spec);
    case 'conic_section':
    case 'conic':
      return renderConicSection(spec);
    case 'nested_triangles':
    case 'thales':
    case 'triangle_transversal':
    case 'bowtie':
    case 'hourglass':
    case 'right_triangle_altitude':
    case 'altitude_hypotenuse':
    case 'geometric_mean':
    case 'shadow_similarity':
    case 'indirect_measurement':
    case 'angle_bisector':
    case 'circle_chords_similarity':
    case 'overlapping_triangles':
    case 'inverted_similar':
    case 'trapezoid_diagonals':
    case 'similar':
      return typeof window._renderFig === 'function' ? window._renderFig(spec) : '';
    default:
      if(typeof window._renderFig === 'function' && !spec._inRMF){
        spec._inRMF = true;
        try { return window._renderFig(spec) || ''; }
        finally { delete spec._inRMF; }
      }
      return '';
  }
}
window.renderMathFigure = renderMathFigure; // expose to _renderFig, which lives in a separate scope

/* ── Function Graph ─────────────────────────────────── */
function renderFnGraph(s){
  var copy = {};
  for(var k in s){ if(Object.prototype.hasOwnProperty.call(s, k)) copy[k] = s[k]; }
  copy.type = 'fn';
  var rawFns = Array.isArray(s.fns) ? s.fns.slice() : [];
  var labs = Array.isArray(s.labels) ? s.labels : [];
  copy.fns = rawFns.map(function(f, idx){
    var obj = typeof f === 'string' ? { fn: f } : (f ? Object.assign({}, f) : { fn: 'x' });
    if(!obj.label && labs[idx]) obj.label = labs[idx];
    return obj;
  });
  if(s.shade && !Array.isArray(s.shade) && (s.shade.from || s.shade.to || s.shade.a != null || s.shade.b != null)){
    var sh = s.shade;
    var f0 = (copy.fns[0] && copy.fns[0].fn) || 'x';
    var f1 = (copy.fns[1] && copy.fns[1].fn) || null;
    copy.shade = [{
      x1: sh.a != null ? sh.a : sh.x1,
      x2: sh.b != null ? sh.b : sh.x2,
      fn: sh.from === 'fn1' && f1 ? f1 : f0,
      fn2: sh.to === 'fn1' && f1 ? f1 : undefined,
      color: sh.color || FIG_AMBER_FILL
    }];
  }
  return window._renderFig(copy);
}

/* ── 2D Geometry ───────────────────────────────────────── */
function renderGeom2D(s){
  var W=300,H=230,mg=38;
  var shapes=s.shapes||[];
  // Collect all points for auto-scaling
  var allx=[],ally=[];
  shapes.forEach(function(sh){
    (sh.pts||[]).forEach(function(p){allx.push(p[0]);ally.push(p[1]);});
    if(sh.cx!=null){allx.push(sh.cx-sh.r,sh.cx+sh.r);ally.push(sh.cy-sh.r,sh.cy+sh.r);}
  });
  if(!allx.length){allx=[0,4];ally=[0,3];}
  var mxmin=Math.min.apply(null,allx),mxmax=Math.max.apply(null,allx);
  var mymin=Math.min.apply(null,ally),mymax=Math.max.apply(null,ally);
  var dx=mxmax-mxmin||1,dy=mymax-mymin||1;
  mxmin-=dx*0.18;mxmax+=dx*0.18;mymin-=dy*0.18;mymax+=dy*0.18;
  function sx(mx){return mg+(mx-mxmin)/(mxmax-mxmin)*(W-2*mg);}
  function sy(my){return (H-mg)-(my-mymin)/(mymax-mymin)*(H-2*mg);}
  function norm2(v){var l=Math.sqrt(v[0]*v[0]+v[1]*v[1])||1;return [v[0]/l,v[1]/l];}

  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<title>'+esc(a11y)+'</title>';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  shapes.forEach(function(sh){
    // POLYGON / TRIANGLE
    if(sh.shape==='triangle'||sh.shape==='polygon'){
      var pts=sh.pts.map(function(p){return [sx(p[0]),sy(p[1])];});
      var pstr=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ');
      svg+='<polygon points="'+pstr+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      // Right angle mark
      if(sh.right_angle!=null){
        var ri=sh.right_angle%pts.length;
        var rp=pts[ri];
        var p1=pts[(ri+1)%pts.length];
        var p2=pts[(ri+pts.length-1)%pts.length];
        var d1=norm2([p1[0]-rp[0],p1[1]-rp[1]]);
        var d2=norm2([p2[0]-rp[0],p2[1]-rp[1]]);
        var s2=12;
        var q1=[rp[0]+d1[0]*s2,rp[1]+d1[1]*s2];
        var q2=[rp[0]+d1[0]*s2+d2[0]*s2,rp[1]+d1[1]*s2+d2[1]*s2];
        var q3=[rp[0]+d2[0]*s2,rp[1]+d2[1]*s2];
        svg+='<path d="M'+q1[0].toFixed(1)+','+q1[1].toFixed(1)+' L'+q2[0].toFixed(1)+','+q2[1].toFixed(1)+' L'+q3[0].toFixed(1)+','+q3[1].toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
      }
      // Angle arcs (non-right angles)
      if(sh.angle_marks){
        sh.angle_marks.forEach(function(ai){
          var ap=pts[ai%pts.length];
          var pp=pts[(ai+pts.length-1)%pts.length];
          var np=pts[(ai+1)%pts.length];
          var d3=norm2([pp[0]-ap[0],pp[1]-ap[1]]);
          var d4=norm2([np[0]-ap[0],np[1]-ap[1]]);
          var r3=14;
          var x1=ap[0]+d3[0]*r3,y1=ap[1]+d3[1]*r3;
          var x2=ap[0]+d4[0]*r3,y2=ap[1]+d4[1]*r3;
          svg+='<path d="M'+x1.toFixed(1)+','+y1.toFixed(1)+' Q'+ap[0]+','+ap[1]+' '+x2.toFixed(1)+','+y2.toFixed(1)+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.4"/>';
        });
      }
      // Side tick marks (equal sides)
      if(sh.equal_sides){
        sh.equal_sides.forEach(function(pair){
          [pair].flat().forEach(function(si){
            var i0=si%pts.length, i1=(si+1)%pts.length;
            var mx=(pts[i0][0]+pts[i1][0])/2,my=(pts[i0][1]+pts[i1][1])/2;
            var ang=Math.atan2(pts[i1][1]-pts[i0][1],pts[i1][0]-pts[i0][0]);
            var perp=ang+Math.PI/2;
            var t=5;
            svg+='<line x1="'+(mx+Math.cos(perp)*t).toFixed(1)+'" y1="'+(my+Math.sin(perp)*t).toFixed(1)+'" x2="'+(mx-Math.cos(perp)*t).toFixed(1)+'" y2="'+(my-Math.sin(perp)*t).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
          });
        });
      }
      // Side labels
      var sides=sh.sides||[];
      sides.forEach(function(lbl,si){
        if(!lbl) return;
        var i0=si%pts.length, i1=(si+1)%pts.length;
        var mx=(pts[i0][0]+pts[i1][0])/2,my2=(pts[i0][1]+pts[i1][1])/2;
        var dx2=pts[i1][0]-pts[i0][0],dy2=pts[i1][1]-pts[i0][1];
        var len=Math.sqrt(dx2*dx2+dy2*dy2)||1;
        var off=14;
        var lx=mx+(-dy2/len)*off, ly=my2+(dx2/len)*off;
        svg+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="11.5" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="700">'+esc(lbl)+'</text>';
      });
      // Vertex labels
      var labels=sh.labels||[];
      var cx3=pts.reduce(function(a,p){return a+p[0];},0)/pts.length;
      var cy3=pts.reduce(function(a,p){return a+p[1];},0)/pts.length;
      labels.forEach(function(lbl,li){
        if(li>=pts.length||!lbl) return;
      var lx=pts[li][0],ly=pts[li][1];
        var ox=lx-cx3,oy=ly-cy3,ol=Math.sqrt(ox*ox+oy*oy)||1;
        lx= _clampLabelX(lx+ox/ol*16, lbl, 13, 'middle', 8, W-8);
        ly= Math.max(16, Math.min(H-8, ly+oy/ol*16));
        svg+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="middle" font-weight="700">'+esc(lbl)+'</text>';
      });
    }
    // CIRCLE
    if(sh.shape==='circle'){
      var cxp=sx(sh.cx||0),cyp=sy(sh.cy||0);
      var rp=(sh.r||1)/(mxmax-mxmin)*(W-2*mg);
      svg+='<circle cx="'+cxp.toFixed(1)+'" cy="'+cyp.toFixed(1)+'" r="'+rp.toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      svg+='<circle cx="'+cxp.toFixed(1)+'" cy="'+cyp.toFixed(1)+'" r="3" fill="'+FIG_INK+'"/>';
      if(sh.center_label) svg+='<text x="'+(cxp+6)+'" y="'+(cyp-6)+'" font-size="11.5" fill="'+FIG_INK+'" font-weight="700">'+esc(sh.center_label)+'</text>';
      if(sh.radius_angle!=null){
        var ra=sh.radius_angle*Math.PI/180;
        var rx=cxp+rp*Math.cos(ra),ry=cyp-rp*Math.sin(ra);
        svg+='<line x1="'+cxp.toFixed(1)+'" y1="'+cyp.toFixed(1)+'" x2="'+rx.toFixed(1)+'" y2="'+ry.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6" stroke-dasharray="5 3"/>';
        if(sh.radius_label){
          var mlx=(cxp+rx)/2+8,mly=(cyp+ry)/2;
          svg+='<text x="'+mlx.toFixed(1)+'" y="'+mly.toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(sh.radius_label)+'</text>';
        }
      }
      if(sh.chord&&sh.chord.length===2){
        svg+='<line x1="'+sx(sh.chord[0][0]).toFixed(1)+'" y1="'+sy(sh.chord[0][1]).toFixed(1)+'" x2="'+sx(sh.chord[1][0]).toFixed(1)+'" y2="'+sy(sh.chord[1][1]).toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';
      }
      if(sh.tangent){
        var ta=sh.tangent*Math.PI/180;
        var tx=cxp+rp*Math.cos(ta),ty=cyp-rp*Math.sin(ta);
        var tpx=-Math.sin(ta)*25,tpy=-Math.cos(ta)*25;
        svg+='<line x1="'+(tx-tpx).toFixed(1)+'" y1="'+(ty-tpy).toFixed(1)+'" x2="'+(tx+tpx).toFixed(1)+'" y2="'+(ty+tpy).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.8"/>';
      }
    }
    // RECTANGLE
    if(sh.shape==='rectangle'){
      var rx2=sx(sh.x||0),ry2=sy((sh.y||0)+(sh.h||0));
      var rw=(sh.w||4)/(mxmax-mxmin)*(W-2*mg);
      var rh=(sh.h||3)/(mymax-mymin)*(H-2*mg);
      svg+='<rect x="'+rx2.toFixed(1)+'" y="'+ry2.toFixed(1)+'" width="'+rw.toFixed(1)+'" height="'+rh.toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      // dimension labels
      if(sh.width_label){var wlx=_clampLabelX(rx2+rw/2,sh.width_label,11,'middle',6,W-6),wly=Math.min(H-6,ry2+rh+14);svg+='<text x="'+wlx.toFixed(1)+'" y="'+wly.toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(sh.width_label)+'</text>';}
      if(sh.height_label){var hlx=_clampLabelX(rx2+rw+12,sh.height_label,11,'start',6,W-6),hly=ry2+rh/2;svg+='<text x="'+hlx.toFixed(1)+'" y="'+hly.toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" dominant-baseline="middle" font-weight="600">'+esc(sh.height_label)+'</text>';}
    }
  });

  if(s.title) svg+=_svgTitle(s.title, W, 14, 10.5, FIG_INK);
  svg+='</svg>';
  return svg;
}

/* ── 3D Geometry (isometric projection) ─────────────── */
function renderGeom3D(s){
  var W=340,H=240;
  var solid=s.solid||'rectangular_prism';
  var dims=s.dims||[4,3,2];
  var lw=+dims[0]||4, dw=+dims[1]||3, ht=+dims[2]||2;
  var sc=Math.min(42,Math.min((W-90)/((lw+dw)*0.866||1),(H-72)/(ht+(lw+dw)*0.5||1)));
  var midX3=(lw-dw)*sc*0.866*0.5;
  var midY3=(-ht*sc+(lw+dw)*sc*0.5)*0.5;
  var cx=W/2-midX3, cy=H/2-midY3+(s.title?8:0);
  function iso(ix,iy,iz){
    return{x:cx+(ix-iz)*sc*0.866,y:cy-iy*sc+(ix+iz)*sc*0.5};
  }
  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<title>'+esc(a11y)+'</title>';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  function pt(ix,iy,iz){var p=iso(ix,iy,iz);return p.x.toFixed(1)+','+p.y.toFixed(1);}
  function line3(x1,y1,z1,x2,y2,z2,col,dash){
    var a=iso(x1,y1,z1),b=iso(x2,y2,z2);
    return '<line x1="'+a.x.toFixed(1)+'" y1="'+a.y.toFixed(1)+'" x2="'+b.x.toFixed(1)+'" y2="'+b.y.toFixed(1)+'" stroke="'+(col||FIG_INK)+'" stroke-width="1.8"'+(dash?' stroke-dasharray="5 3"':'')+'/>';
  }
  function face(pts4, fill){
    return '<polygon points="'+pts4.join(' ')+'" fill="'+fill+'" stroke="'+FIG_INDIGO+'" stroke-width="1.5" stroke-linejoin="round"/>';
  }
  /* three-tone face shading (front/right/top), consistent across every solid so the same
     light source reads correctly no matter which shape is drawn */
  var FACE_FRONT=FIG_INDIGO_FILL2, FACE_SIDE='rgba(43,91,168,0.28)', FACE_TOP='rgba(43,91,168,0.10)';

  if(solid==='rectangular_prism'||solid==='cube'||solid==='prism'){
    var l=lw,w=dw,h=ht;
    // Hidden edges (dashed)
    svg+=line3(0,0,0,l,0,0,FIG_INK,true);
    svg+=line3(0,0,0,0,0,w,FIG_INK,true);
    svg+=line3(0,0,0,0,h,0,FIG_INK,true);
    // Front face (left face in isometric)
    svg+=face([pt(0,0,w),pt(0,h,w),pt(l,h,w),pt(l,0,w)],FACE_FRONT);
    // Right face
    svg+=face([pt(l,0,w),pt(l,h,w),pt(l,h,0),pt(l,0,0)],FACE_SIDE);
    // Top face
    svg+=face([pt(0,h,0),pt(0,h,w),pt(l,h,w),pt(l,h,0)],FACE_TOP);
    // Dimension labels
    var lbs=s.labels||{};
    var lblL = lbs.l || (typeof dims[0]==='string' && isNaN(+dims[0]) ? dims[0] : '');
    var lblW = lbs.w || (typeof dims[1]==='string' && isNaN(+dims[1]) ? dims[1] : '');
    var lblH = lbs.h || (typeof dims[2]==='string' && isNaN(+dims[2]) ? dims[2] : '');
    if(lblL){
      var ml2=iso(l/2,0,w);
      var lxL=_clampLabelX(ml2.x-6, String(lblL), 10, 'middle', 8, W-8);
      var lyL=Math.min(H-6, ml2.y+15);
      svg+='<text x="'+lxL.toFixed(1)+'" y="'+lyL.toFixed(1)+'" font-size="10" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(lblL)+'</text>';
    }
    if(lblW){
      var mw2=iso(l,0,w/2);
      var lxW=_clampLabelX(mw2.x+8, String(lblW), 10, 'start', 8, W-8);
      var lyW=Math.min(H-6, mw2.y+12);
      svg+='<text x="'+lxW.toFixed(1)+'" y="'+lyW.toFixed(1)+'" font-size="10" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(lblW)+'</text>';
    }
    if(lblH){
      var mh2=iso(l,h/2,0);
      var lxH=_clampLabelX(mh2.x+8, String(lblH), 10, 'start', 8, W-8);
      var lyH=Math.max(20, Math.min(H-18, mh2.y-2));
      svg+='<text x="'+lxH.toFixed(1)+'" y="'+lyH.toFixed(1)+'" font-size="10" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(lblH)+'</text>';
    }
  }

  /* Cylinder and cone are drawn upright (not isometric), to scale: radius and height keep the
     question's proportions, the base's hidden back half is dashed, and labels sit clear of the
     outline — a radius line on the top face, a height dimension line with end ticks. */
  function upright(rad,hgt){
    var k=Math.min(80/rad,150/hgt), rx=Math.max(28,rad*k), hp=Math.max(40,hgt*k), ry=Math.max(10,rx*0.28);
    var top=(H-hp)/2+ry/2, x0=W/2-22;
    return {cx:x0,top:top,bot:top+hp,rx:rx,ry:ry};
  }
  function arc(f,y,sweep){ return 'M'+(f.cx-f.rx).toFixed(1)+','+y.toFixed(1)+' A'+f.rx.toFixed(1)+' '+f.ry.toFixed(1)+' 0 0 '+sweep+' '+(f.cx+f.rx).toFixed(1)+','+y.toFixed(1); }
  function lbl(x,y,t,anchor){ return '<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" font-size="12" fill="'+FIG_INDIGO+'" text-anchor="'+(anchor||'middle')+'" dominant-baseline="middle" font-weight="600">'+esc(t)+'</text>'; }
  function dimLine(x,y1,y2,t){
    return '<line x1="'+x.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.3"/>'+
      '<line x1="'+(x-4).toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+(x+4).toFixed(1)+'" y2="'+y1.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.3"/>'+
      '<line x1="'+(x-4).toFixed(1)+'" y1="'+y2.toFixed(1)+'" x2="'+(x+4).toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.3"/>'+
      (t?lbl(x+8,(y1+y2)/2,t,'start'):'');
  }
  function radiusLine(f,y,t,above){
    return '<circle cx="'+f.cx.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="2" fill="'+FIG_INDIGO+'"/>'+
      '<line x1="'+f.cx.toFixed(1)+'" y1="'+y.toFixed(1)+'" x2="'+(f.cx+f.rx).toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4" stroke-dasharray="4 2"/>'+
      (t?lbl(f.cx+f.rx/2,above?(f.ry>=16?y-7:y-f.ry-8):(y+f.ry+12),t):'');
  }
  var L3=s.labels||{};

  if(solid==='cylinder'){
    var cr=+s.radius||lw/2, ch=+s.height||ht, f=upright(cr,ch);
    svg+='<path d="M'+(f.cx-f.rx).toFixed(1)+','+f.top.toFixed(1)+' L'+(f.cx-f.rx).toFixed(1)+','+f.bot.toFixed(1)+' '+arc(f,f.bot,0).replace(/^M[^A]*/,'')+' L'+(f.cx+f.rx).toFixed(1)+','+f.top.toFixed(1)+' Z" fill="'+FACE_SIDE+'" stroke="none"/>';
    svg+='<path d="'+arc(f,f.bot,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
    svg+='<path d="'+arc(f,f.bot,0)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(f.cx-f.rx).toFixed(1)+'" y1="'+f.top.toFixed(1)+'" x2="'+(f.cx-f.rx).toFixed(1)+'" y2="'+f.bot.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(f.cx+f.rx).toFixed(1)+'" y1="'+f.top.toFixed(1)+'" x2="'+(f.cx+f.rx).toFixed(1)+'" y2="'+f.bot.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<ellipse cx="'+f.cx.toFixed(1)+'" cy="'+f.top.toFixed(1)+'" rx="'+f.rx.toFixed(1)+'" ry="'+f.ry.toFixed(1)+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    if(L3.r) svg+=radiusLine(f,f.top,L3.r,true);
    else if(L3.d) svg+='<line x1="'+(f.cx-f.rx).toFixed(1)+'" y1="'+f.top.toFixed(1)+'" x2="'+(f.cx+f.rx).toFixed(1)+'" y2="'+f.top.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4" stroke-dasharray="4 2"/>'+lbl(f.cx,f.top-f.ry-8,L3.d);
    if(L3.h) svg+=dimLine(f.cx+f.rx+14,f.top,f.bot,L3.h);
  }

  if(solid==='cone'){
    var kr=+s.radius||lw/2, kh=+s.height||ht, g=upright(kr,kh);
    svg+='<path d="M'+(g.cx-g.rx).toFixed(1)+','+g.bot.toFixed(1)+' L'+g.cx.toFixed(1)+','+g.top.toFixed(1)+' L'+(g.cx+g.rx).toFixed(1)+','+g.bot.toFixed(1)+' A'+g.rx.toFixed(1)+' '+g.ry.toFixed(1)+' 0 0 1 '+(g.cx-g.rx).toFixed(1)+','+g.bot.toFixed(1)+' Z" fill="'+FACE_FRONT+'" stroke="none"/>';
    svg+='<path d="'+arc(g,g.bot,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
    svg+='<path d="'+arc(g,g.bot,0)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(g.cx-g.rx).toFixed(1)+'" y1="'+g.bot.toFixed(1)+'" x2="'+g.cx.toFixed(1)+'" y2="'+g.top.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(g.cx+g.rx).toFixed(1)+'" y1="'+g.bot.toFixed(1)+'" x2="'+g.cx.toFixed(1)+'" y2="'+g.top.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    if(L3.r) svg+=radiusLine(g,g.bot,'',false)+lbl(g.cx+g.rx+8,g.bot,L3.r,'start');
    if(L3.h){
      svg+='<line x1="'+g.cx.toFixed(1)+'" y1="'+g.top.toFixed(1)+'" x2="'+g.cx.toFixed(1)+'" y2="'+g.bot.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 2"/>';
      svg+='<polyline points="'+g.cx.toFixed(1)+','+(g.bot-7).toFixed(1)+' '+(g.cx-7).toFixed(1)+','+(g.bot-7).toFixed(1)+' '+(g.cx-7).toFixed(1)+','+g.bot.toFixed(1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1"/>';
      svg+=lbl(g.cx-8,(g.top+g.bot)/2,L3.h,'end');
    }
    if(L3.l) svg+=lbl(g.cx+g.rx/2+10,(g.top+g.bot)/2,L3.l,'start');
  }

  if(solid==='square_pyramid'){
    /* Honors dims[1] as the base depth, so a rectangular base (e.g. a 2x12
       pyramid) draws truthfully instead of silently squaring off and
       contradicting its own "2 x 12" label. dims[0]===dims[1] still gives the
       square pyramid the name implies. */
    var l4=lw,d4=dw,h4=ht;
    var apex4=iso(l4/2,h4,d4/2);
    var bases=[[0,0,0],[l4,0,0],[l4,0,d4],[0,0,d4]];
    var faceColors=[FACE_FRONT,FACE_SIDE,FACE_FRONT,FACE_SIDE];
    for(var fi=0;fi<4;fi++){
      var b1=bases[fi],b2=bases[(fi+1)%4];
      svg+=face([pt(b1[0],b1[1],b1[2]),pt(b2[0],b2[1],b2[2]),apex4.x.toFixed(1)+','+apex4.y.toFixed(1)],faceColors[fi]);
    }
    var lbs4=s.labels||{};
    if(lbs4.base){var mb=iso(l4/2,0,d4+0.5);svg+='<text x="'+mb.x+'" y="'+(mb.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs4.base)+'</text>';}
    if(lbs4.h){svg+='<line x1="'+iso(l4/2,0,d4/2).x+'" y1="'+iso(l4/2,0,d4/2).y+'" x2="'+apex4.x+'" y2="'+apex4.y+'" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 2"/><text x="'+(apex4.x+12)+'" y="'+(apex4.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(lbs4.h)+'</text>';}
  }

  if(solid==='triangular_prism'){
    // base triangle in the x-z plane, extruded along y (height ht)
    var l6=lw,d6=dw,h6=ht;
    var baseTri=[[0,0,0],[l6,0,0],[l6/2,0,d6]];
    var topTri=baseTri.map(function(p){return [p[0],h6,p[2]];});
    // hidden bottom edges (dashed)
    svg+=line3(baseTri[0][0],0,baseTri[0][2],baseTri[1][0],0,baseTri[1][2],FIG_INK,true);
    svg+=line3(baseTri[1][0],0,baseTri[1][2],baseTri[2][0],0,baseTri[2][2],FIG_INK,true);
    svg+=line3(baseTri[2][0],0,baseTri[2][2],baseTri[0][0],0,baseTri[0][2],FIG_INK,true);
    // two visible rectangular side faces + one visible triangular end face
    svg+=face([pt(baseTri[0][0],0,baseTri[0][2]),pt(baseTri[1][0],0,baseTri[1][2]),pt(topTri[1][0],h6,topTri[1][2]),pt(topTri[0][0],h6,topTri[0][2])],FACE_FRONT);
    svg+=face([pt(baseTri[1][0],0,baseTri[1][2]),pt(baseTri[2][0],0,baseTri[2][2]),pt(topTri[2][0],h6,topTri[2][2]),pt(topTri[1][0],h6,topTri[1][2])],FACE_SIDE);
    svg+=face([pt(topTri[0][0],h6,topTri[0][2]),pt(topTri[1][0],h6,topTri[1][2]),pt(topTri[2][0],h6,topTri[2][2])],FACE_TOP);
    var lbs6=s.labels||{};
    if(lbs6.base){var mb6=iso((baseTri[0][0]+baseTri[1][0])/2,0,baseTri[0][2]-0.4);svg+='<text x="'+mb6.x.toFixed(1)+'" y="'+(mb6.y+10).toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs6.base)+'</text>';}
    if(lbs6.h){var mh6=iso(l6+0.3,h6/2,0);svg+='<text x="'+(mh6.x+6).toFixed(1)+'" y="'+mh6.y.toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs6.h)+'</text>';}
  }

  if(solid==='sphere'){
    var r5=Math.min(lw,dw,ht)/2;
    var c5=iso(0,r5,0);
    var rp5=r5*sc;
    svg+='<circle cx="'+c5.x.toFixed(1)+'" cy="'+c5.y.toFixed(1)+'" r="'+rp5.toFixed(1)+'" fill="url(#sphereGrad)" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<defs><radialGradient id="sphereGrad" cx="38%" cy="35%"><stop offset="0%" stop-color="'+FIG_INDIGO_FILL+'"/><stop offset="100%" stop-color="'+FIG_INDIGO2+'" stop-opacity="0.55"/></radialGradient></defs>';
    svg+='<ellipse cx="'+c5.x.toFixed(1)+'" cy="'+c5.y.toFixed(1)+'" rx="'+rp5.toFixed(1)+'" ry="'+(rp5*0.35).toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1" stroke-dasharray="5 3"/>';
    var lbs5=s.labels||{};
    if(lbs5.r) svg+='<text x="'+(c5.x+rp5/1.4)+'" y="'+(c5.y-rp5/1.4)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(lbs5.r)+'</text>';
  }

  if(solid==='cross_section'){
    // a rectangular prism sliced by a horizontal plane at a given fractional height,
    // showing the cut face — used for volume/cross-section questions (Calc, Geometry)
    var l7=lw,w7=dw,h7=ht,cutFrac=s.cut!=null?s.cut:0.5,ch=h7*cutFrac;
    svg+=line3(0,0,0,l7,0,0,FIG_INK,true);
    svg+=line3(0,0,0,0,0,w7,FIG_INK,true);
    svg+=line3(0,0,0,0,ch,0,FIG_INK,true);
    svg+=face([pt(0,0,w7),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,0,w7)],FACE_FRONT);
    svg+=face([pt(l7,0,w7),pt(l7,ch,w7),pt(l7,ch,0),pt(l7,0,0)],FACE_SIDE);
    // cut face at the top of the visible slice — amber, to draw the eye to what's being measured
    svg+=face([pt(0,ch,0),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,ch,0)],FIG_AMBER_FILL);
    // ghost outline of the full solid above the cut, dashed, so students see what was removed
    svg+='<polygon points="'+[pt(0,ch,0),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,ch,0)].join(' ')+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.6" stroke-dasharray="5 3"/>';
    svg+=line3(0,ch,0,0,h7,0,FIG_MUTED,true);
    svg+=line3(l7,ch,0,l7,h7,0,FIG_MUTED,true);
    svg+=line3(l7,ch,w7,l7,h7,w7,FIG_MUTED,true);
    svg+=line3(0,ch,w7,0,h7,w7,FIG_MUTED,true);
    var lbs7=s.labels||{};
    if(lbs7.l){var ml7=iso(l7/2,0,w7+0.3);svg+='<text x="'+ml7.x.toFixed(1)+'" y="'+(ml7.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs7.l)+'</text>';}
    if(lbs7.w){var mw7=iso(l7+0.3,0,w7/2);svg+='<text x="'+(mw7.x+5)+'" y="'+(mw7.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs7.w)+'</text>';}
    if(lbs7.h){var mh7=iso(l7+0.3,ch/2,0);svg+='<text x="'+(mh7.x+5)+'" y="'+(mh7.y+4)+'" font-size="11" fill="'+FIG_AMBER_TEXT+'" text-anchor="start" font-weight="600">'+esc(lbs7.h)+'</text>';}
  }

  if(s.title) svg+=_svgTitle(s.title, W, 14, 10.5, FIG_INK);
  svg+='</svg>';
  return svg;
}

/* ── Bar Chart ──────────────────────────────────────── */
function renderBarChart(s){
  var bars=s.bars||[];
  if(!bars.length) return '';
  var W=320,H=210,ml=44,mr=14,mt=24,mb=38;
  var pw=W-ml-mr,ph=H-mt-mb;
  var maxVal=Math.max.apply(null,bars.map(function(b){return b.val||0;}))||1;
  var yScale=Math.ceil(maxVal/5)*5; // round up to nice number
  var bw=Math.min(40,(pw/bars.length)*0.65);
  var gap=(pw-bw*bars.length)/(bars.length+1);
  var colors=FIG_SERIES;
  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<title>'+esc(a11y)+'</title>';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Title
  if(s.title) svg+=_svgTitle(s.title, W, 15, 10.5, FIG_INK);
  // Y axis grid
  for(var g=0;g<=5;g++){
    var gv=yScale*g/5, gy=mt+ph-(gv/yScale)*ph;
    svg+='<line x1="'+ml+'" y1="'+gy.toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+gy.toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+(ml-5)+'" y="'+(gy+3.5)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+Math.round(gv)+'</text>';
  }
  // Axes
  svg+='<line x1="'+ml+'" y1="'+mt+'" x2="'+ml+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg+='<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+(ml+pw)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  // Axis labels
  if(s.ylabel) svg+='<text x="12" y="'+(mt+ph/2)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90,12,'+(mt+ph/2)+')">'+esc(s.ylabel)+'</text>';
  if(s.xlabel) svg+='<text x="'+(ml+pw/2)+'" y="'+(H-4)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.xlabel)+'</text>';
  // Bars
  var slotW = bw + gap;
  bars.forEach(function(b,i){
    var bx=ml+gap+i*(bw+gap);
    var bh=(b.val/yScale)*ph;
    var by=mt+ph-bh;
    var col=colors[i%colors.length];
    svg+='<rect x="'+bx.toFixed(1)+'" y="'+by.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+bh.toFixed(1)+'" fill="'+col+'" rx="3"/>';
    // Value label on top
    svg+='<text x="'+(bx+bw/2).toFixed(1)+'" y="'+Math.max(mt+8, by-4).toFixed(1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle" font-weight="600">'+b.val+'</text>';
    // Category label
    var lbl=String(b.label||'');
    var cfs = lbl.length * 5.2 > slotW ? Math.max(7.2, Math.floor((slotW / Math.max(1, lbl.length * 0.56))*10)/10) : 9;
    var cyOff = (lbl.length * cfs * 0.56 > slotW && bars.length > 4 && i % 2 === 1) ? 22 : 13;
    var cxLbl = _clampLabelX(bx+bw/2, lbl, cfs, 'middle', 6, W-6);
    svg+='<text x="'+cxLbl.toFixed(1)+'" y="'+(mt+ph+cyOff)+'" font-size="'+cfs+'" fill="'+FIG_INK+'" text-anchor="middle">'+esc(lbl)+'</text>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Scatter Plot ───────────────────────────────────── */
function renderScatter(s){
  var rawPts=s.pts||s.data||s.points||[];
  var pts=rawPts.map(function(p){
    if(Array.isArray(p)) return [+p[0]||0, +p[1]||0];
    if(p && typeof p==='object') return [+(p.x!=null?p.x:p[0])||0, +(p.y!=null?p.y:p[1])||0];
    return [0,0];
  });
  if(!pts.length){
    var x0 = s.xmin!=null ? +s.xmin : (Array.isArray(s.xlim)?+s.xlim[0]:0);
    var x1 = s.xmax!=null ? +s.xmax : (Array.isArray(s.xlim)?+s.xlim[1]:10);
    var y0 = s.ymin!=null ? +s.ymin : (Array.isArray(s.ylim)?+s.ylim[0]:0);
    var y1 = s.ymax!=null ? +s.ymax : (Array.isArray(s.ylim)?+s.ylim[1]:100);
    var bfl = s.best_fit_line || s.line;
    var m0 = bfl && bfl.m != null ? +bfl.m : ((y1 - y0) / ((x1 - x0) || 1));
    var c0 = bfl && (bfl.c != null || bfl.b != null) ? +(bfl.c != null ? bfl.c : bfl.b) : y0;
    for(var si=1; si<=6; si++){
      var sxv = x0 + (x1 - x0) * (si / 7);
      var syv = m0 * sxv + c0 + (si % 2 === 0 ? 1 : -1) * (y1 - y0) * 0.04;
      pts.push([Math.round(sxv*10)/10, Math.round(syv*10)/10]);
    }
  }
  var W=310,H=210,ml=42,mr=18,mt=22,mb=34;
  var pw=W-ml-mr,ph=H-mt-mb;
  var xs=pts.map(function(p){return p[0];}),ys=pts.map(function(p){return p[1];});
  var xmin2=Math.min.apply(null,xs),xmax2=Math.max.apply(null,xs);
  var ymin2=Math.min.apply(null,ys),ymax2=Math.max.apply(null,ys);
  var xpad=(xmax2-xmin2)*0.12||1, ypad=(ymax2-ymin2)*0.15||1;
  xmin2-=xpad;xmax2+=xpad;ymin2-=ypad;ymax2+=ypad;
  function sx2(x){return ml+(x-xmin2)/(xmax2-xmin2)*pw;}
  function sy2(y){return mt+ph-(y-ymin2)/(ymax2-ymin2)*ph;}
  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<title>'+esc(a11y)+'</title>';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  if(s.title) svg+=_svgTitle(s.title, W, 14, 10.5, FIG_INK);
  // Grid
  var nxg=5,nyg=5;
  for(var gi=0;gi<=nxg;gi++){
    var gx=(xmin2+(xmax2-xmin2)*gi/nxg);
    svg+='<line x1="'+sx2(gx).toFixed(1)+'" y1="'+mt+'" x2="'+sx2(gx).toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+sx2(gx).toFixed(1)+'" y="'+(mt+ph+12)+'" font-size="8.5" fill="'+FIG_INK+'" text-anchor="middle">'+gx.toFixed(0)+'</text>';
  }
  for(var gi2=0;gi2<=nyg;gi2++){
    var gy2=(ymin2+(ymax2-ymin2)*gi2/nyg);
    svg+='<line x1="'+ml+'" y1="'+sy2(gy2).toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+sy2(gy2).toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+(ml-5)+'" y="'+(sy2(gy2)+3)+'" font-size="8.5" fill="'+FIG_INK+'" text-anchor="end">'+gy2.toFixed(0)+'</text>';
  }
  // Axes
  svg+='<line x1="'+ml+'" y1="'+mt+'" x2="'+ml+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg+='<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+(ml+pw)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  if(s.xlabel) svg+='<text x="'+(ml+pw/2)+'" y="'+(H-3)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.xlabel)+'</text>';
  if(s.ylabel) svg+='<text x="11" y="'+(mt+ph/2)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90,11,'+(mt+ph/2)+')">'+esc(s.ylabel)+'</text>';
  // Trend line
  if(s.trendline&&pts.length>1){
    var n=pts.length;
    var sumx=0,sumy=0,sumxy=0,sumx2=0;
    pts.forEach(function(p){sumx+=p[0];sumy+=p[1];sumxy+=p[0]*p[1];sumx2+=p[0]*p[0];});
    var m2=(n*sumxy-sumx*sumy)/(n*sumx2-sumx*sumx);
    var b2=(sumy-m2*sumx)/n;
    var tx1=xmin2+xpad*0.5,tx2=xmax2-xpad*0.5;
    svg+='<line x1="'+sx2(tx1).toFixed(1)+'" y1="'+sy2(m2*tx1+b2).toFixed(1)+'" x2="'+sx2(tx2).toFixed(1)+'" y2="'+sy2(m2*tx2+b2).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.8" stroke-dasharray="6 3"/>';
  }
  // Points
  pts.forEach(function(p){
    var ptInfo = '(' + p[0] + ', ' + p[1] + ')';
    svg+='<circle cx="'+sx2(p[0]).toFixed(1)+'" cy="'+sy2(p[1]).toFixed(1)+'" r="4.5" fill="'+FIG_INDIGO2+'" fill-opacity="0.85" stroke="'+FIG_BG+'" stroke-width="1.2" class="mfig-inspect-pt" data-inspect="'+esc(ptInfo)+'" data-x="'+p[0]+'" data-y="'+p[1]+'"><title>'+esc(ptInfo)+'</title></circle>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Pie Chart ──────────────────────────────────────── */
function renderPie(s){
  var slices=s.slices||[];
  if(!slices.length) return '';
  var W=300,H=210,cx4=78,cy4=H/2+4,r6=62;
  var total=slices.reduce(function(a,sl){return a+(+(sl.val!=null?sl.val:sl.value)||0);},0)||1;
  var colors=FIG_SERIES;
  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<title>'+esc(a11y)+'</title>';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  if(s.title) svg+=_svgTitle(s.title, W, 14, 10.5, FIG_INK);
  var ang=-Math.PI/2;
  slices.forEach(function(sl,si){
    var sVal=+(sl.val!=null?sl.val:sl.value)||0;
    var sweep=2*Math.PI*sVal/total;
    var x1=cx4+r6*Math.cos(ang),y1=cy4+r6*Math.sin(ang);
    var x2=cx4+r6*Math.cos(ang+sweep),y2=cy4+r6*Math.sin(ang+sweep);
    var large=sweep>Math.PI?1:0;
    var col=sl.color||colors[si%colors.length];
    svg+='<path d="M'+cx4+','+cy4+' L'+x1.toFixed(1)+','+y1.toFixed(1)+' A'+r6+','+r6+' 0 '+large+',1 '+x2.toFixed(1)+','+y2.toFixed(1)+' Z" fill="'+col+'" stroke="'+FIG_BG+'" stroke-width="1.5"/>';
    ang+=sweep;
  });
  // Legend (right side)
  var legX=152,legY=Math.max(24, cy4-slices.length*9);
  slices.forEach(function(sl,si){
    var sVal=+(sl.val!=null?sl.val:sl.value)||0;
    var col=sl.color||colors[si%colors.length];
    var pct=Math.round(sVal/total*100);
    var legTxt = String(sl.label||'') + (String(sl.label||'').indexOf('%')>=0?'':(' ('+pct+'%)'));
    var legFs = Math.max(7.2, Math.min(9.5, (W - legX - 20) / Math.max(1, legTxt.length * 0.56)));
    svg+='<rect x="'+legX+'" y="'+(legY+si*19)+'" width="11" height="11" fill="'+col+'" rx="2"/>';
    svg+='<text x="'+(legX+15)+'" y="'+(legY+si*19+9.5)+'" font-size="'+legFs.toFixed(1)+'" fill="'+FIG_INK+'">'+esc(legTxt)+'</text>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Number Line ────────────────────────────────────── */
function renderNumberLine(s){
  var W=310,H=96,my=54,ml=28,mr=28;
  var pw=W-ml-mr;
  var mn=s.min!=null?+s.min:(s.range?+s.range[0]:-5), mx=s.max!=null?+s.max:(s.range?+s.range[1]:5);
  if(!isFinite(mn)) mn=-5;
  if(!isFinite(mx)) mx=5;
  if(Math.abs(mx-mn)<1e-6){ mn-=5; mx+=5; }
  function sx3(v){return ml+(v-mn)/(mx-mn)*pw;}
  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<title>'+esc(a11y)+'</title>';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Line
  svg+='<line x1="'+ml+'" y1="'+my+'" x2="'+(W-mr)+'" y2="'+my+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  svg+='<polygon points="'+(W-mr)+','+my+' '+(W-mr-7)+','+(my-3)+' '+(W-mr-7)+','+(my+3)+'" fill="'+FIG_INK+'"/>';
  svg+='<polygon points="'+ml+','+my+' '+(ml+7)+','+(my-3)+' '+(ml+7)+','+(my+3)+'" fill="'+FIG_INK+'"/>';
  // Ticks
  var tStep=Math.max(1, Math.round((mx-mn)/10));
  for(var tv=Math.ceil(mn);tv<=Math.floor(mx);tv+=tStep){
    var tx4=sx3(tv);
    svg+='<line x1="'+tx4.toFixed(1)+'" y1="'+(my-5)+'" x2="'+tx4.toFixed(1)+'" y2="'+(my+5)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    svg+='<text x="'+tx4.toFixed(1)+'" y="'+(my+18)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+tv+'</text>';
  }
  // Shaded regions
  (s.regions||[]).forEach(function(rg){
    var rx1=sx3(rg.from),rx2=sx3(rg.to);
    svg+='<rect x="'+rx1.toFixed(1)+'" y="'+(my-4)+'" width="'+(rx2-rx1).toFixed(1)+'" height="8" fill="'+FIG_INDIGO2+'" fill-opacity="0.28"/>';
    // Endpoints
    svg+='<circle cx="'+rx1.toFixed(1)+'" cy="'+my+'" r="5" fill="'+(rg.closed_left?FIG_INDIGO2:FIG_BG)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2"/>';
    svg+='<circle cx="'+rx2.toFixed(1)+'" cy="'+my+'" r="5" fill="'+(rg.closed_right?FIG_INDIGO2:FIG_BG)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2"/>';
  });
  // Points
  var nlPlacedX = [];
  (s.points||s.marks||[]).forEach(function(pt){
    var val = (pt.x !== undefined ? pt.x : (pt.val !== undefined ? pt.val : (typeof pt === 'number' ? pt : 0)));
    var px=sx3(val);
    svg+='<circle cx="'+px.toFixed(1)+'" cy="'+my+'" r="5.5" fill="'+(pt.open?FIG_BG:FIG_AMBER)+'" stroke="'+FIG_AMBER+'" stroke-width="2"/>';
    if(pt.label){
      var lx = _clampLabelX(px, pt.label, 9.5, 'middle', 6, W-6);
      var ly = my - 12;
      for(var ni=0; ni<nlPlacedX.length; ni++){
        if(Math.abs(lx - nlPlacedX[ni]) < 28){ ly -= 11; break; }
      }
      nlPlacedX.push(lx);
      svg+='<text x="'+lx.toFixed(1)+'" y="'+Math.max(14, ly).toFixed(1)+'" font-size="9.5" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" font-weight="600">'+esc(pt.label)+'</text>';
    }
  });
  if(s.title) svg+=_svgTitle(s.title, W, 14, 10.5, FIG_INK);
  svg+='</svg>';
  return svg;
}

/* ── Box Plot (Box & Whisker) ─────────────────────────── */
function renderBoxPlot(s){
  var W=(+s.w>60?+s.w:(+s.width>60?+s.width:320)), H=(+s.h>40?+s.h:(+s.height>40?+s.height:165));
  var five = Array.isArray(s.fiveNum) && s.fiveNum.length >= 5 ? s.fiveNum : (Array.isArray(s.data) && s.data.length >= 5 ? s.data : null);
  var rawMin = s.min!=null ? s.min : (s.whisker_low!=null ? s.whisker_low : (five ? five[0] : 0));
  var rawMax = s.max!=null ? s.max : (s.whisker_high!=null ? s.whisker_high : (five ? five[4] : 100));
  var rawQ1  = s.q1!=null ? s.q1 : (five ? five[1] : 25);
  var rawMed = s.med!=null ? s.med : (s.median!=null ? s.median : (five ? five[2] : 50));
  var rawQ3  = s.q3!=null ? s.q3 : (five ? five[3] : 75);

  var min = isFinite(+rawMin) ? +rawMin : 0;
  var max = isFinite(+rawMax) ? +rawMax : 100;
  var med = isFinite(+rawMed) ? +rawMed : (min+max)*0.5;
  var q3  = isFinite(+rawQ3)  ? +rawQ3  : (med+max)*0.5;
  var q1  = isFinite(+rawQ1)  ? +rawQ1  : (min+med)*0.5;

  // Ensure monotonic ordering for visual layout even when symbolic parameters ("x") are used
  if(q3 <= med && max > med) q3 = Math.round((med + max)*0.5);
  if(q1 >= med && min < med) q1 = Math.round((min + med)*0.5);
  if(min > q1) min = q1 - 10;
  if(max < q3) max = q3 + 10;

  var outliers=Array.isArray(s.outliers)?s.outliers.filter(function(o){return isFinite(+o);}).map(Number):[];
  var allVals=[min,q1,med,q3,max].concat(outliers);
  var axMin=(s.axis&&isFinite(+s.axis.min))?+s.axis.min:(isFinite(+s.xmin)?+s.xmin:Math.min.apply(null,allVals));
  var axMax=(s.axis&&isFinite(+s.axis.max))?+s.axis.max:(isFinite(+s.xmax)?+s.xmax:Math.max.apply(null,allVals));
  var span=(axMax-axMin)||1;
  axMin-=span*0.08; axMax+=span*0.08; span=axMax-axMin;

  var ml=32, mr=32, mt=s.title?34:24, mb=38;
  var pw=W-ml-mr;
  function sx(v){ return ml+((v-axMin)/span)*pw; }

  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg+='<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg+=_svgTitle(s.title, W, 16, 10.5, FIG_INK);
  }

  var cy=mt+(H-mt-mb)/2 + 4;
  var bH=32, bTop=cy-bH/2;

  // Whiskers
  svg+='<line x1="'+sx(min).toFixed(1)+'" y1="'+cy.toFixed(1)+'" x2="'+sx(q1).toFixed(1)+'" y2="'+cy.toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8" stroke-dasharray="3,2"/>';
  svg+='<line x1="'+sx(min).toFixed(1)+'" y1="'+(cy-10).toFixed(1)+'" x2="'+sx(min).toFixed(1)+'" y2="'+(cy+10).toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2" class="mfig-inspect-pt" data-inspect="Minimum: '+esc(rawMin)+'"><title>Minimum: '+esc(rawMin)+'</title></line>';
  svg+='<line x1="'+sx(q3).toFixed(1)+'" y1="'+cy.toFixed(1)+'" x2="'+sx(max).toFixed(1)+'" y2="'+cy.toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8" stroke-dasharray="3,2"/>';
  svg+='<line x1="'+sx(max).toFixed(1)+'" y1="'+(cy-10).toFixed(1)+'" x2="'+sx(max).toFixed(1)+'" y2="'+(cy+10).toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2" class="mfig-inspect-pt" data-inspect="Maximum: '+esc(rawMax)+'"><title>Maximum: '+esc(rawMax)+'</title></line>';

  // IQR Box
  var boxW=Math.max(2, sx(q3)-sx(q1));
  var iqrInfo = 'Q₁ = ' + rawQ1 + ', Q₃ = ' + rawQ3;
  svg+='<rect x="'+sx(q1).toFixed(1)+'" y="'+bTop.toFixed(1)+'" width="'+boxW.toFixed(1)+'" height="'+bH+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO2+'" stroke-width="2" rx="3" class="mfig-inspect-bar" data-inspect="'+esc(iqrInfo)+'"><title>'+esc(iqrInfo)+'</title></rect>';

  // Median line
  svg+='<line x1="'+sx(med).toFixed(1)+'" y1="'+bTop.toFixed(1)+'" x2="'+sx(med).toFixed(1)+'" y2="'+(bTop+bH).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="2.6" class="mfig-inspect-pt" data-inspect="Median (Q₂): '+esc(rawMed)+'"><title>Median (Q₂): '+esc(rawMed)+'</title></line>';

  // Value labels above key five-number summary positions (stagger or deduplicate if close)
  var bpPositions = [
    { x: sx(min), txt: String(rawMin), fs: 9, w: '600', col: FIG_MUTED },
    { x: sx(q1),  txt: String(rawQ1),  fs: 9.5, w: 'bold', col: FIG_INDIGO2 },
    { x: sx(med), txt: String(rawMed), fs: 9.5, w: 'bold', col: FIG_AMBER_TEXT },
    { x: sx(q3),  txt: String(rawQ3),  fs: 9.5, w: 'bold', col: FIG_INDIGO2 },
    { x: sx(max), txt: String(rawMax), fs: 9, w: '600', col: FIG_MUTED }
  ];
  var bpPlaced = [];
  for(var bi2=0; bi2<bpPositions.length; bi2++){
    var bp = bpPositions[bi2];
    if(bpPlaced.some(function(prev){ return prev.txt === bp.txt && Math.abs(prev.rawX - bp.x) < 4; })) continue;
    var bxLbl = _clampLabelX(bp.x, bp.txt, bp.fs, 'middle', 6, W-6);
    var yCands = [bTop - 6, bTop + bH + 12, bTop - 16];
    var byLbl = yCands[0];
    for(var yi=0; yi<yCands.length; yi++){
      var yc = yCands[yi];
      var hit = bpPlaced.some(function(prev){ return Math.abs(prev.y - yc) < 9 && Math.abs(prev.x - bxLbl) < 22; });
      if(!hit){ byLbl = yc; break; }
    }
    bpPlaced.push({ x: bxLbl, rawX: bp.x, y: byLbl, txt: bp.txt });
    svg+='<text x="'+bxLbl.toFixed(1)+'" y="'+byLbl.toFixed(1)+'" font-size="'+bp.fs+'" font-weight="'+bp.w+'" fill="'+bp.col+'" text-anchor="middle">'+esc(bp.txt)+'</text>';
  }

  // Outliers
  outliers.forEach(function(ot){
    svg+='<circle cx="'+sx(ot).toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="4" fill="'+FIG_BG+'" stroke="'+FIG_AMBER+'" stroke-width="2" class="mfig-inspect-pt" data-inspect="Outlier: '+ot+'"><title>Outlier: '+ot+'</title></circle>';
  });

  // Number line axis
  var ay=H-20;
  svg+='<line x1="'+ml+'" y1="'+ay+'" x2="'+(W-mr)+'" y2="'+ay+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  var step=(s.axis&&s.axis.step)?s.axis.step:([0.5,1,2,5,10,20,25,50,100,200,500].find(function(n){return n>=span/6;})||Math.ceil(span/6));
  if(span/step>8) step*=2;
  var startVal=Math.ceil(axMin/step)*step;
  for(var v=startVal; v<=axMax; v+=step){
    var vx=sx(v);
    if(vx>=ml-2 && vx<=W-mr+2){
      svg+='<line x1="'+vx.toFixed(1)+'" y1="'+ay+'" x2="'+vx.toFixed(1)+'" y2="'+(ay+4)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
      var vLbl=(Math.round(v*100)/100).toString();
      svg+='<text x="'+vx.toFixed(1)+'" y="'+(ay+14)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle">'+vLbl+'</text>';
    }
  }
  svg+='</svg>';
  return svg;
}

/* ── Histogram ────────────────────────────────────────── */
function renderHistogram(s){
  var W=(+s.w>60?+s.w:(+s.width>60?+s.width:320)), H=(+s.h>40?+s.h:(+s.height>40?+s.height:210));
  var classObjs = (Array.isArray(s.classes) && s.classes.length && typeof s.classes[0]==='object') ? s.classes : null;
  var rawFreqs=s.freqs||s.counts||s.data||(classObjs ? classObjs.map(function(c){ return c.fd!=null?c.fd:(c.freq!=null?c.freq:(c.frequency!=null?c.frequency:1)); }) : [5,10,15,8,3]);
  var numFreqs=rawFreqs.map(function(v){ return isFinite(+v) ? +v : null; });
  var validNums=numFreqs.filter(function(v){ return v!==null; });
  var maxF=validNums.length ? Math.max.apply(null,validNums) : 10;
  var fallbackVal=Math.max(2, Math.round(maxF*0.65));
  var freqs=numFreqs.map(function(v){ return v!==null ? v : fallbackVal; });
  var rawBins=s.bins||s.labels||(classObjs ? classObjs.map(function(c){ return c.label || ((c.from!=null?c.from:0)+'–'+(c.to!=null?c.to:10)); }) : (s.classes||[]));
  var bins=rawBins.map(function(b){ return (b && typeof b==='object') ? (b.label || ((b.from!=null?b.from:0)+'–'+(b.to!=null?b.to:10))) : String(b); });
  if(!bins.length){
    for(var bi=0;bi<freqs.length;bi++) bins.push((bi*10)+'–'+((bi+1)*10));
  }
  var yMax=Math.ceil(maxF*1.25)||10;

  var ml=38, mr=18, mt=s.title?28:16, mb=34;
  var pw=W-ml-mr, ph=H-mt-mb;
  var bw=pw/freqs.length;

  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg+='<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg+=_svgTitle(s.title, W, 16, 10.5, FIG_INK);
  }

  // Y-axis grid & labels
  var yStep=Math.max(1, Math.round(yMax/4));
  for(var yv=0; yv<=yMax; yv+=yStep){
    var ypos=mt+ph-(yv/yMax)*ph;
    svg+='<line x1="'+ml+'" y1="'+ypos.toFixed(1)+'" x2="'+(W-mr)+'" y2="'+ypos.toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+(ml-6)+'" y="'+(ypos+3)+'" font-size="8.5" fill="'+FIG_MUTED+'" text-anchor="end">'+yv+'</text>';
  }

  // Contiguous Bars
  freqs.forEach(function(f,i){
    var rawLbl = rawFreqs[i];
    var bh=(f/yMax)*ph;
    var bx=ml+i*bw;
    var by=mt+ph-bh;
    var bLabel=(bins[i]!==undefined?String(bins[i]):(''+(i+1)));
    var info='Bin: '+bLabel+' | Frequency: '+rawLbl;
    svg+='<rect x="'+bx.toFixed(1)+'" y="'+by.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+bh.toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.4" class="mfig-inspect-bar" data-inspect="'+esc(info)+'"><title>'+esc(info)+'</title></rect>';
    if(f>0){
      svg+='<text x="'+(bx+bw/2).toFixed(1)+'" y="'+Math.max(mt+8, by-4).toFixed(1)+'" font-size="8.5" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(rawLbl)+'</text>';
    }
    var hfs = bLabel.length * 4.8 > bw ? Math.max(7, Math.floor((bw / Math.max(1, bLabel.length * 0.56))*10)/10) : 8;
    svg+='<text x="'+(bx+bw/2).toFixed(1)+'" y="'+(mt+ph+13).toFixed(1)+'" font-size="'+hfs+'" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(bLabel)+'</text>';
  });

  // Axes lines
  svg+='<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+(W-mr)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg+='<line x1="'+ml+'" y1="'+mt+'" x2="'+ml+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';

  if(s.xlabel){
    svg+='<text x="'+(ml+pw/2)+'" y="'+(H-4)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+esc(s.xlabel)+'</text>';
  }
  svg+='</svg>';
  return svg;
}

/* ── Dot Plot ─────────────────────────────────────────── */
function renderDotPlot(s){
  var W=s.w||s.width||300, H=s.h||s.height||160;
  var raw=s.data||s.values||[1,2,2,3,3,3,4,4,5];
  var counts={};
  if(Array.isArray(raw)){
    raw.forEach(function(v){ counts[v]=(counts[v]||0)+1; });
  } else if(typeof raw==='object'){
    counts=raw;
  }
  var keys=Object.keys(counts).map(Number).sort(function(a,b){return a-b;});
  var minK=keys.length?keys[0]:0, maxK=keys.length?keys[keys.length-1]:10;
  var span=(maxK-minK)||1;
  var pad=Math.max(1, Math.round(span*0.1));
  var axMin=minK-pad, axMax=maxK+pad;
  var ml=30, mr=30, mt=s.title?26:14, mb=32;
  var pw=W-ml-mr;
  function sx(k){ return ml+((k-axMin)/(axMax-axMin))*pw; }

  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg+='<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg+=_svgTitle(s.title, W, 15, 10.5, FIG_INK);
  }

  var ay=H-mb+4;
  svg+='<line x1="'+ml+'" y1="'+ay+'" x2="'+(W-mr)+'" y2="'+ay+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';

  for(var v=axMin; v<=axMax; v++){
    var vx=sx(v);
    svg+='<line x1="'+vx.toFixed(1)+'" y1="'+ay+'" x2="'+vx.toFixed(1)+'" y2="'+(ay+4)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    svg+='<text x="'+vx.toFixed(1)+'" y="'+(ay+14)+'" font-size="8.5" fill="'+FIG_MUTED+'" text-anchor="middle">'+v+'</text>';
  }

  // Dots
  keys.forEach(function(k){
    var kx=sx(k);
    var cnt=counts[k]||0;
    for(var dot=0; dot<cnt; dot++){
      var dy=ay-8-(dot*12);
      svg+='<circle cx="'+kx.toFixed(1)+'" cy="'+dy.toFixed(1)+'" r="4.5" fill="'+FIG_INDIGO2+'" stroke="'+FIG_BG+'" stroke-width="1"/>';
    }
  });

  if(s.xlabel){
    svg+='<text x="'+(ml+pw/2)+'" y="'+(H-2)+'" font-size="8.5" fill="'+FIG_INK+'" text-anchor="middle">'+esc(s.xlabel)+'</text>';
  }
  svg+='</svg>';
  return svg;
}

/* ── Unit Circle ──────────────────────────────────────── */
function renderUnitCircle(s){
  var W=s.w||s.width||290, H=s.h||s.height||260;
  var deg=30;
  if(s.angle!=null){
    if(typeof s.angle==='string'){
      if(s.angle.indexOf('pi')!==-1){
        var radExpr=s.angle.replace('pi','Math.PI').replace(/\s+/g,'');
        try{ deg = (new Function('return ('+radExpr+')*180/Math.PI'))(); }catch(e){ deg=30; }
      } else { deg=parseFloat(s.angle)||30; }
    } else { deg=s.angle; }
  }
  var rad=(deg*Math.PI)/180;
  var ox=W/2, oy=H/2+6, R=Math.min(W,H)*0.33;

  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg+='<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg+=_svgTitle(s.title, W, 15, 10.5, FIG_INK);
  }

  // Axes
  svg+='<line x1="'+(ox-R-18)+'" y1="'+oy+'" x2="'+(ox+R+18)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
  svg+='<line x1="'+ox+'" y1="'+(oy+R+18)+'" x2="'+ox+'" y2="'+(oy-R-18)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
  svg+='<text x="'+(ox+R+22)+'" y="'+(oy+4)+'" font-size="10" font-style="italic" fill="'+FIG_INK+'">x</text>';
  svg+='<text x="'+(ox+4)+'" y="'+(oy-R-16)+'" font-size="10" font-style="italic" fill="'+FIG_INK+'">y</text>';

  // Unit Circle
  svg+='<circle cx="'+ox+'" cy="'+oy+'" r="'+R+'" fill="none" stroke="'+FIG_BORDER+'" stroke-width="1.5"/>';

  // Terminal Point
  var px=ox+R*Math.cos(rad);
  var py=oy-R*Math.sin(rad);

  // Reference right triangle
  if(s.showTriangle!==false){
    svg+='<polygon points="'+ox+','+oy+' '+px.toFixed(1)+','+oy+' '+px.toFixed(1)+','+py.toFixed(1)+'" fill="'+FIG_AMBER_FILL+'" stroke="none"/>';
    svg+='<line x1="'+ox+'" y1="'+oy+'" x2="'+px.toFixed(1)+'" y2="'+oy+'" stroke="'+FIG_AMBER+'" stroke-width="1.8"/>';
    svg+='<line x1="'+px.toFixed(1)+'" y1="'+oy+'" x2="'+px.toFixed(1)+'" y2="'+py.toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.8" stroke-dasharray="3,2"/>';
    var sq=8, sxDir=px>=ox? -sq : sq, syDir=py<=oy? sq : -sq;
    svg+='<path d="M'+(px+sxDir)+','+oy+' L'+(px+sxDir)+','+(oy-syDir)+' L'+px+','+(oy-syDir)+'" fill="none" stroke="'+FIG_MUTED+'" stroke-width="1"/>';
  }

  // Radius line
  svg+='<line x1="'+ox+'" y1="'+oy+'" x2="'+px.toFixed(1)+'" y2="'+py.toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2.2"/>';
  svg+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="4.5" fill="'+FIG_INDIGO2+'" stroke="'+FIG_BG+'" stroke-width="1"/>';

  // Angle arc
  var arcR=22;
  var sweepFlag = deg >= 0 ? 0 : 1;
  var aEndX = ox + arcR*Math.cos(rad);
  var aEndY = oy - arcR*Math.sin(rad);
  svg+='<path d="M'+(ox+arcR)+','+oy+' A'+arcR+','+arcR+' 0 0 '+sweepFlag+' '+aEndX.toFixed(1)+','+aEndY.toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
  var midAngle = rad/2;
  var lblR = arcR + 12;
  var lblX = ox + lblR*Math.cos(midAngle);
  var lblY = oy - lblR*Math.sin(midAngle) + 3;
  var degLbl = Math.round(deg * 100) / 100;
  svg+='<text x="'+lblX.toFixed(1)+'" y="'+lblY.toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_INDIGO+'" text-anchor="middle">'+degLbl+'°</text>';

  // Coordinates label (clamped inside viewBox)
  var cosVal=(Math.round(Math.cos(rad)*1000)/1000).toString();
  var sinVal=(Math.round(Math.sin(rad)*1000)/1000).toString();
  var coordText=s.coordText || ('(' + cosVal + ', ' + sinVal + ')');
  var cAnchor=px>=ox?'start':'end';
  var cOffsetX=px>=ox?7:-7;
  var cX = _clampLabelX(px+cOffsetX, coordText, 9, cAnchor, 6, W-6);
  var cY = Math.max(26, Math.min(H-8, py <= oy ? py-7 : py+13));
  svg+='<text x="'+cX.toFixed(1)+'" y="'+cY.toFixed(1)+'" font-size="9" font-weight="600" fill="'+FIG_INK+'" text-anchor="'+cAnchor+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3" stroke-linejoin="round">'+esc(coordText)+'</text>';

  svg+='</svg>';
  return svg;
}

/* ── Sinusoid ─────────────────────────────────────────── */
function renderSinusoid(s){
  var W=(+s.w>60?+s.w:(+s.width>60?+s.width:320)), H=(+s.h>40?+s.h:(+s.height>40?+s.height:220));
  var rawAmp = s.amp!=null ? s.amp : (s.amplitude!=null ? s.amplitude : 2);
  var rawPeriod = s.period!=null ? s.period : 2*Math.PI;
  var rawMid = s.midline!=null ? s.midline : (s.vertical_shift!=null ? s.vertical_shift : 0);

  function parseMathVal(v, dflt){
    if(typeof v==='number' && isFinite(v)) return v;
    if(typeof v==='string'){
      var st=v.replace(/pi/gi, String(Math.PI));
      try {
        var r=(new Function('return ('+st+')'))();
        if(typeof r==='number' && isFinite(r)) return r;
      } catch(e){}
    }
    return dflt;
  }

  var amp = Math.abs(parseMathVal(rawAmp, 3)) || 3;
  var period = Math.abs(parseMathVal(rawPeriod, 2*Math.PI)) || (2*Math.PI);
  var midline = parseMathVal(rawMid, 0);
  var fnType = (s.fnType==='cos' || (typeof s.fn==='string' && s.fn.indexOf('cos')!==-1)) ? 'cos' : 'sin';

  var ml=36, mr=28, mt=s.title?28:16, mb=28;
  var pw=W-ml-mr, ph=H-mt-mb;
  var xmin=-0.25*period, xmax=2.25*period;
  var ymin=midline - amp*1.6, ymax=midline + amp*1.6;

  function sx(x){ return ml+((x-xmin)/(xmax-xmin))*pw; }
  function sy(y){ return mt+ph-((y-ymin)/(ymax-ymin))*ph; }

  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg+='<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg+=_svgTitle(s.title, W, 16, 10.5, FIG_INK);
  }

  // Axes
  var ax0=sx(0), ay0=Math.max(mt, Math.min(mt+ph, sy(0)));
  svg+='<line x1="'+ml+'" y1="'+ay0.toFixed(1)+'" x2="'+(W-mr)+'" y2="'+ay0.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';
  svg+='<line x1="'+ax0.toFixed(1)+'" y1="'+(mt+ph)+'" x2="'+ax0.toFixed(1)+'" y2="'+mt+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';

  // Midline
  var mY=sy(midline);
  svg+='<line x1="'+ml+'" y1="'+mY.toFixed(1)+'" x2="'+(W-mr)+'" y2="'+mY.toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.4" stroke-dasharray="4,3"/>';
  var midLbl = 'y=' + rawMid;
  var midX = _clampLabelX(W-mr-2, midLbl, 8.5, 'end', ml, W-4);
  svg+='<text x="'+midX.toFixed(1)+'" y="'+(mY-4).toFixed(1)+'" font-size="8.5" font-weight="600" fill="'+FIG_AMBER_TEXT+'" text-anchor="end" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(midLbl)+'</text>';

  // Curve points
  var pts=[], steps=160;
  for(var i=0; i<=steps; i++){
    var x=xmin+(i/steps)*(xmax-xmin);
    var y=midline + amp*(fnType==='cos'?Math.cos(2*Math.PI*x/period):Math.sin(2*Math.PI*x/period));
    pts.push(sx(x).toFixed(1)+','+sy(y).toFixed(1));
  }
  svg+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+FIG_INDIGO2+'" stroke-width="2.4" stroke-linejoin="round"/>';

  // Amplitude indicator
  var peakX = fnType==='cos' ? 0 : period/4;
  var pX=sx(peakX), pY=sy(midline+amp);
  svg+='<line x1="'+pX.toFixed(1)+'" y1="'+mY.toFixed(1)+'" x2="'+pX.toFixed(1)+'" y2="'+pY.toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.6"/>';
  svg+='<text x="'+(pX+5).toFixed(1)+'" y="'+((mY+pY)/2+3).toFixed(1)+'" font-size="8.5" font-weight="bold" fill="'+FIG_TEAL+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">A='+esc(rawAmp)+'</text>';

  // Period indicator
  var p1X=sx(0), p2X=sx(period);
  var brY=mt+ph+8;
  svg+='<line x1="'+p1X.toFixed(1)+'" y1="'+brY+'" x2="'+p2X.toFixed(1)+'" y2="'+brY+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
  svg+='<line x1="'+p1X.toFixed(1)+'" y1="'+(brY-3)+'" x2="'+p1X.toFixed(1)+'" y2="'+(brY+3)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
  svg+='<line x1="'+p2X.toFixed(1)+'" y1="'+(brY-3)+'" x2="'+p2X.toFixed(1)+'" y2="'+(brY+3)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
  var pLbl=s.periodLabel || ('Period = ' + (typeof rawPeriod==='string'?rawPeriod:(Math.round(period*100)/100)));
  svg+='<text x="'+((p1X+p2X)/2).toFixed(1)+'" y="'+(brY+12)+'" font-size="8.5" font-weight="600" fill="'+FIG_INDIGO+'" text-anchor="middle">'+esc(pLbl)+'</text>';

  svg+='</svg>';
  return svg;
}

/* ── Normal Distribution Curve ───────────────────────── */
function renderNormalCurve(s){
  var W=s.w||s.width||320, H=s.h||s.height||200;
  var mu=s.mean!=null?s.mean:0;
  var sigma=s.sd!=null?s.sd:1;
  var shade=s.shade; // [from, to] or {from, to}

  var ml=24, mr=24, mt=s.title?26:14, mb=32;
  var pw=W-ml-mr, ph=H-mt-mb;
  var zmin=-3.6, zmax=3.6;

  function sx(z){ return ml+((z-zmin)/(zmax-zmin))*pw; }
  function sy(phi){ return mt+ph - (phi/0.42)*ph; }
  function gauss(z){ return (1/Math.sqrt(2*Math.PI))*Math.exp(-0.5*z*z); }

  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg+='<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg+=_svgTitle(s.title, W, 15, 10.5, FIG_INK);
  }

  // Shading region if specified
  if(shade){
    var zFrom = Array.isArray(shade)?(shade[0]-mu)/sigma:(shade.from!=null?(shade.from-mu)/sigma:(shade.leftOf!=null?-3.6:(shade.rightOf!=null?(shade.rightOf-mu)/sigma:-1)));
    var zTo = Array.isArray(shade)?(shade[1]-mu)/sigma:(shade.to!=null?(shade.to-mu)/sigma:(shade.leftOf!=null?(shade.leftOf-mu)/sigma:(shade.rightOf!=null?3.6:1)));
    zFrom=Math.max(zmin, Math.min(zmax, zFrom));
    zTo=Math.max(zmin, Math.min(zmax, zTo));
    var shadePts=[sx(zFrom).toFixed(1)+','+sy(0).toFixed(1)];
    var sSteps=60;
    for(var si=0; si<=sSteps; si++){
      var sz=zFrom + (si/sSteps)*(zTo-zFrom);
      shadePts.push(sx(sz).toFixed(1)+','+sy(gauss(sz)).toFixed(1));
    }
    shadePts.push(sx(zTo).toFixed(1)+','+sy(0).toFixed(1));
    svg+='<polygon points="'+shadePts.join(' ')+'" fill="'+FIG_INDIGO_FILL2+'" stroke="none"/>';
  }

  // Bell Curve Polyline
  var pts=[], cSteps=120;
  for(var ci=0; ci<=cSteps; ci++){
    var z=zmin+(ci/cSteps)*(zmax-zmin);
    pts.push(sx(z).toFixed(1)+','+sy(gauss(z)).toFixed(1));
  }
  svg+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+FIG_INDIGO2+'" stroke-width="2.4" stroke-linejoin="round"/>';

  // Base Axis
  var ay=sy(0);
  svg+='<line x1="'+ml+'" y1="'+ay.toFixed(1)+'" x2="'+(W-mr)+'" y2="'+ay.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';

  // Standard deviation marks (-3 to +3)
  for(var k=-3; k<=3; k++){
    var kx=sx(k);
    svg+='<line x1="'+kx.toFixed(1)+'" y1="'+ay.toFixed(1)+'" x2="'+kx.toFixed(1)+'" y2="'+(ay+4).toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    var lbl = k===0 ? (s.showMu ? 'μ' : String(mu)) : (k>0 ? ('+'+k+'σ') : (k+'σ'));
    if(!s.showMu && sigma!==1 && k!==0){
      lbl = String(Math.round((mu + k*sigma)*100)/100);
    }
    svg+='<text x="'+kx.toFixed(1)+'" y="'+(ay+14).toFixed(1)+'" font-size="8" fill="'+FIG_MUTED+'" text-anchor="middle">'+lbl+'</text>';
  }

  svg+='</svg>';
  return svg;
}

/* ── Slope Field ──────────────────────────────────────── */
function renderSlopeField(s){
  var W=s.w||s.width||280, H=s.h||s.height||240;
  var expr=s.fn||s.expr||'x - y';
  var xr=s.xrange||s.xlim||[s.xmin!=null?s.xmin:-3, s.xmax!=null?s.xmax:3];
  var yr=s.yrange||s.ylim||[s.ymin!=null?s.ymin:-3, s.ymax!=null?s.ymax:3];

  var ml=32, mr=18, mt=s.title?26:16, mb=26;
  var pw=W-ml-mr, ph=H-mt-mb;
  function sx(x){ return ml+((x-xr[0])/((xr[1]-xr[0])||1))*pw; }
  function sy(y){ return mt+ph-((y-yr[0])/((yr[1]-yr[0])||1))*ph; }

  function slopeEval(x, y){
    try {
      var e=String(expr).replace(/\^/g,'**')
        .replace(/(\d)([xy])/g,'$1*$2')
        .replace(/\bx\b/g, '('+x+')').replace(/\by\b/g, '('+y+')')
        .replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(')
        .replace(/exp\(/g,'Math.exp(').replace(/sqrt\(/g,'Math.sqrt(');
      var res = (new Function('return ('+e+')'))();
      return isFinite(res) ? res : NaN;
    } catch(err){ return NaN; }
  }

  var a11y=_figA11yLabel(s);
  var svg='<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg+='<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg+=_svgTitle(s.title, W, 15, 10.5, FIG_INK);
  }

  // Axes
  var ax0=Math.max(ml, Math.min(W-mr, sx(0))), ay0=Math.max(mt, Math.min(mt+ph, sy(0)));
  svg+='<line x1="'+ml+'" y1="'+ay0.toFixed(1)+'" x2="'+(W-mr)+'" y2="'+ay0.toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="1.2"/>';
  svg+='<line x1="'+ax0.toFixed(1)+'" y1="'+(mt+ph)+'" x2="'+ax0.toFixed(1)+'" y2="'+mt+'" stroke="'+FIG_GRID+'" stroke-width="1.2"/>';

  // Slope Segments Grid
  var segLen = 11;
  var xStep = (xr[1]-xr[0])/9, yStep = (yr[1]-yr[0])/9;
  for(var gx=xr[0]; gx<=xr[1]+1e-5; gx+=xStep){
    for(var gy=yr[0]; gy<=yr[1]+1e-5; gy+=yStep){
      var m = slopeEval(gx, gy);
      if(isNaN(m)) continue;
      var theta = Math.atan(m);
      var dx = (segLen/2)*Math.cos(theta);
      var dy = (segLen/2)*Math.sin(theta);
      var cx = sx(gx), cy = sy(gy);
      svg+='<line x1="'+(cx-dx).toFixed(1)+'" y1="'+(cy+dy).toFixed(1)+'" x2="'+(cx+dx).toFixed(1)+'" y2="'+(cy-dy).toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.5" stroke-linecap="round"/>';
    }
  }

  // Explicit curve points if provided (`s.curvePts`)
  if(Array.isArray(s.curvePts) && s.curvePts.length > 1){
    var cPts = s.curvePts.map(function(pt){ return sx(pt[0]).toFixed(1)+','+sy(pt[1]).toFixed(1); });
    svg+='<polyline points="'+cPts.join(' ')+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>';
  }
  // Optional integral solution curve (backward + forward Euler approximation)
  if(s.solution && s.solution.x0!=null && s.solution.y0!=null){
    var solPts=[], backPts=[];
    var curX=s.solution.x0, curY=s.solution.y0;
    var dt=0.04;
    for(var sb=0; sb<80; sb++){
      if(curX>xr[1]||curX<xr[0]||curY>yr[1]||curY<yr[0]) break;
      backPts.push(sx(curX).toFixed(1)+','+sy(curY).toFixed(1));
      var mb1=slopeEval(curX, curY);
      if(isNaN(mb1)) break;
      curX -= dt;
      curY -= mb1*dt;
    }
    backPts.reverse();
    curX=s.solution.x0; curY=s.solution.y0;
    for(var st=0; st<80; st++){
      if(curX>xr[1]||curX<xr[0]||curY>yr[1]||curY<yr[0]) break;
      if(st>0) solPts.push(sx(curX).toFixed(1)+','+sy(curY).toFixed(1));
      var m1=slopeEval(curX, curY);
      if(isNaN(m1)) break;
      curX += dt;
      curY += m1*dt;
    }
    var fullSol = backPts.concat(solPts);
    if(fullSol.length>1){
      svg+='<polyline points="'+fullSol.join(' ')+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>';
    }
    svg+='<circle cx="'+sx(s.solution.x0).toFixed(1)+'" cy="'+sy(s.solution.y0).toFixed(1)+'" r="3.5" fill="'+FIG_AMBER+'" stroke="'+FIG_BG+'" stroke-width="1.2"/>';
  }

  svg+='</svg>';
  return svg;
}

/* ── Two-Way Table ────────────────────────────────────── */
function renderTwoWayTable(s){
  var a11y = _figA11yLabel(s);
  var rawData = s.data || s.observed || s.cell_values || null;
  var rows = null, cols = null, data = null, corner = '';

  var candCols = s.cols || s.colLabels || s.col_labels || s.column_labels || s.columnLabels || s.columns || null;
  var candRows = s.rows || s.rowLabels || s.row_labels || s.categories || null;

  if(Array.isArray(s.rows) && s.rows.length && typeof s.rows[0] === 'object' && !Array.isArray(s.rows[0])){
    rows = s.rows.map(function(r, i){ return r.label != null ? r.label : ('Row ' + (i+1)); });
    data = s.rows.map(function(r){ return Array.isArray(r.data) ? r.data : (Array.isArray(r.cells) ? r.cells : []); });
    cols = Array.isArray(candCols) ? candCols : (data[0]||[]).map(function(_, i){ return 'Col ' + (i+1); });
  } else if(Array.isArray(s.rows) && s.rows.length && Array.isArray(s.rows[0])){
    if(Array.isArray(candCols) && candCols.length){
      if(candCols.length === s.rows[0].length){
        corner = candCols[0] || '';
        cols = candCols.slice(1);
      } else {
        cols = candCols;
      }
      rows = s.rows.map(function(r){ return r[0]; });
      data = s.rows.map(function(r){ return r.slice(1); });
    } else {
      corner = s.rows[0][0] || '';
      cols = s.rows[0].slice(1);
      rows = s.rows.slice(1).map(function(r){ return r[0]; });
      data = s.rows.slice(1).map(function(r){ return r.slice(1); });
    }
  } else if(!rawData && Array.isArray(s.labels) && s.labels.length && Array.isArray(s.labels[0])){
    corner = s.labels[0][0] || '';
    cols = s.labels[0].slice(1);
    rows = s.labels.slice(1).map(function(r){ return r[0]; });
    data = s.labels.slice(1).map(function(r){ return r.slice(1); });
  } else {
    data = Array.isArray(rawData) ? rawData : [[12, 18], [24, 6]];
    if(Array.isArray(s.labels) && s.labels.length && Array.isArray(s.labels[0])){
      // e.g. qudrat-0020 where labels[0] has [firstRowName, col1, col2, ...]
      if(s.labels[0].length === (data[0]||[]).length + 1){
        cols = s.labels[0].slice(1);
        rows = s.labels.map(function(r){ return r[0]; });
      }
    }
    if(!rows){
      if(Array.isArray(candRows) && typeof candRows[0] !== 'object'){
        if(candRows.length === data.length + 1){
          corner = candRows[0] || corner;
          rows = candRows.slice(1);
        } else {
          rows = candRows;
        }
      } else {
        rows = data.map(function(_, i){ return 'Row ' + (i+1); });
      }
    }
    if(!cols){
      if(Array.isArray(candCols)){
        if(candCols.length === (data[0]||[]).length + 1){
          corner = candCols[0] || corner;
          cols = candCols.slice(1);
        } else {
          cols = candCols;
        }
      } else if(Array.isArray(s.labels) && typeof s.labels[0] === 'string'){
        if(s.labels.length === (data[0]||[]).length + 1){
          corner = s.labels[0] || corner;
          cols = s.labels.slice(1);
        } else {
          cols = s.labels;
        }
      } else {
        cols = (data[0]||['A','B']).map(function(_, i){ return 'Col ' + (i+1); });
      }
    }
    // If data[ri][0] duplicates rows[ri] (e.g. ibhl-t4-1-001), strip leading label column
    if(data.length && Array.isArray(data[0]) && rows.length === data.length && String(data[0][0]) === String(rows[0]) && cols.length === data[0].length){
      corner = cols[0] || corner;
      cols = cols.slice(1);
      data = data.map(function(r){ return r.slice(1); });
    }
  }

  var title = s.title || s.caption || '';
  var h = '<table class="mfig-table" role="table" aria-label="'+esc(a11y)+'" style="margin:8px auto;border-collapse:collapse;font-size:12px;font-family:sans-serif;color:'+FIG_INK+';background:'+FIG_BG+';border:1px solid '+FIG_BORDER+';border-radius:6px;overflow:hidden">';
  if(title) h += '<caption>' + esc(title) + '</caption>';
  h += '<thead><tr style="background:'+FIG_INDIGO_FILL+'">';
  h += '<th style="padding:6px 12px;border:1px solid '+FIG_BORDER+'">' + esc(corner) + '</th>';
  cols.forEach(function(c){ h += '<th style="padding:6px 12px;border:1px solid '+FIG_BORDER+'">' + esc(c) + '</th>'; });
  h += '</tr></thead><tbody>';
  rows.forEach(function(r, ri){
    h += '<tr><th style="padding:6px 12px;border:1px solid '+FIG_BORDER+';background:'+FIG_INDIGO_FILL+'">' + esc(r) + '</th>';
    cols.forEach(function(c, ci){
      var val = (data[ri] && data[ri][ci] != null) ? data[ri][ci] : '';
      var isHigh = s.highlight && s.highlight.row === ri && s.highlight.col === ci;
      var cellStyle = 'padding:6px 12px;text-align:center;border:1px solid '+FIG_BORDER+';';
      if(isHigh) cellStyle += 'background:'+FIG_AMBER_FILL+';font-weight:bold;color:'+FIG_AMBER_TEXT+';';
      h += '<td style="' + cellStyle + '">' + esc(val) + '</td>';
    });
    h += '</tr>';
  });
  h += '</tbody></table>';
  return h;
}

/* ── Cumulative Frequency Curve (Ogive) ──────────────── */
function renderCumulativeFrequency(s){
  var W = (+s.w>60?+s.w:(+s.width>60?+s.width:340)), H = (+s.h>40?+s.h:(+s.height>40?+s.height:240));
  var pts = Array.isArray(s.points) ? s.points : (Array.isArray(s.data) ? s.data : []);
  var ml = 45, mr = 25, mt = s.title ? 34 : 20, mb = 36;
  var pw = W - ml - mr, ph = H - mt - mb;
  
  var xRange = s.xrange || s.xRange || (s.xmin!=null&&s.xmax!=null?[+s.xmin,+s.xmax]:[0, 100]);
  var yRange = s.yrange || s.yRange || (s.ymin!=null&&s.ymax!=null?[+s.ymin,+s.ymax]:[0, 100]);
  if(pts.length > 0 && !s.xrange && !s.xRange && s.xmin==null){
    var xs = pts.map(function(p){ return p[0]; });
    var ys = pts.map(function(p){ return p[1]; });
    xRange = [Math.min.apply(null, xs), Math.max.apply(null, xs)];
    yRange = [0, Math.max.apply(null, ys)];
  }
  var xmin = xRange[0], xmax = xRange[1];
  var ymin = yRange[0], ymax = yRange[1];
  var xspan = xmax - xmin || 1, yspan = ymax - ymin || 1;
  if(!pts.length){
    var mVal = isFinite(+s.median) ? +s.median : xmin + xspan*0.5;
    var q1Val = isFinite(+s.q1) ? +s.q1 : xmin + xspan*0.32;
    var q3Val = isFinite(+s.q3) ? +s.q3 : xmin + xspan*0.68;
    pts = [
      [xmin, ymin],
      [xmin + (q1Val - xmin)*0.5, ymin + yspan*0.08],
      [q1Val, ymin + yspan*0.25],
      [mVal, ymin + yspan*0.50],
      [q3Val, ymin + yspan*0.75],
      [xmax - (xmax - q3Val)*0.4, ymin + yspan*0.93],
      [xmax, ymax]
    ];
  }

  function sx(x){ return ml + ((x - xmin) / xspan) * pw; }
  function sy(y){ return mt + ph - ((y - ymin) / yspan) * ph; }

  var a11y = _figA11yLabel(s);
  var svg = '<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg += '<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg += _svgTitle(s.title, W, 16, 10.5, FIG_INK);
  }

  // Grid lines
  var xStep = s.xstep || Math.pow(10, Math.floor(Math.log10(xspan/5))) || 10;
  if(xspan / xStep > 8) xStep *= 2;
  var yStep = s.ystep || Math.pow(10, Math.floor(Math.log10(yspan/5))) || 10;
  if(yspan / yStep > 8) yStep *= 2;

  svg += '<g stroke="'+FIG_GRID+'" stroke-width="0.8">';
  for(var gx = xmin; gx <= xmax + 1e-9; gx += xStep){
    var px = sx(gx);
    svg += '<line x1="'+px.toFixed(1)+'" y1="'+mt+'" x2="'+px.toFixed(1)+'" y2="'+(mt+ph)+'" />';
  }
  for(var gy = ymin; gy <= ymax + 1e-9; gy += yStep){
    var py = sy(gy);
    svg += '<line x1="'+ml+'" y1="'+py.toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+py.toFixed(1)+'" />';
  }
  svg += '</g>';

  // Axes
  svg += '<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+(ml+pw)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  svg += '<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+ml+'" y2="'+mt+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';

  // Tick labels
  for(var tx = xmin; tx <= xmax + 1e-9; tx += xStep){
    var tpx = sx(tx);
    svg += '<line x1="'+tpx.toFixed(1)+'" y1="'+(mt+ph)+'" x2="'+tpx.toFixed(1)+'" y2="'+(mt+ph+4)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    svg += '<text x="'+tpx.toFixed(1)+'" y="'+(mt+ph+14)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle">'+tx+'</text>';
  }
  for(var ty = ymin; ty <= ymax + 1e-9; ty += yStep){
    var tpy = sy(ty);
    svg += '<line x1="'+(ml-4)+'" y1="'+tpy.toFixed(1)+'" x2="'+ml+'" y2="'+tpy.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    svg += '<text x="'+(ml-6)+'" y="'+(tpy+3)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="end">'+ty+'</text>';
  }

  // Axis Titles
  if(s.xlabel || s.xLabel){
    svg += '<text x="'+(ml+pw/2)+'" y="'+(H-6)+'" font-size="10" font-weight="600" fill="'+FIG_INK+'" text-anchor="middle">'+esc(s.xlabel || s.xLabel)+'</text>';
  }
  if(s.ylabel || s.yLabel){
    svg += '<text x="12" y="'+(mt+ph/2)+'" font-size="10" font-weight="600" fill="'+FIG_INK+'" text-anchor="middle" transform="rotate(-90 12 '+(mt+ph/2)+')">'+esc(s.ylabel || s.yLabel)+'</text>';
  }

  // S-Curve points & monotone cubic Hermite spline (Fritsch-Carlson ogive)
  var sortedPts = pts.slice().sort(function(a, b){ return a[0] - b[0]; });
  if(sortedPts.length > 1){
    var nPts = sortedPts.length;
    var dxArr = [], dyArr = [], deltaArr = [], mArr = new Array(nPts);
    for(var i = 0; i < nPts - 1; i++){
      var dxi = (sortedPts[i+1][0] - sortedPts[i][0]) || 1e-6;
      var dyi = sortedPts[i+1][1] - sortedPts[i][1];
      dxArr.push(dxi);
      dyArr.push(dyi);
      deltaArr.push(dyi / dxi);
    }
    mArr[0] = deltaArr[0] * 0.5;
    mArr[nPts - 1] = deltaArr[nPts - 2] * 0.5;
    for(var j = 1; j < nPts - 1; j++){
      if(deltaArr[j - 1] * deltaArr[j] <= 0) mArr[j] = 0;
      else mArr[j] = 0.5 * (deltaArr[j - 1] + deltaArr[j]);
    }
    for(var k = 0; k < nPts - 1; k++){
      if(deltaArr[k] === 0){
        mArr[k] = 0;
        mArr[k + 1] = 0;
      } else {
        var ak = mArr[k] / deltaArr[k], bk = mArr[k + 1] / deltaArr[k];
        var hk = Math.hypot(ak, bk);
        if(hk > 3){
          var tk = 3 / hk;
          mArr[k] = tk * ak * deltaArr[k];
          mArr[k + 1] = tk * bk * deltaArr[k];
        }
      }
    }
    var pathData = 'M ' + sx(sortedPts[0][0]).toFixed(1) + ' ' + sy(sortedPts[0][1]).toFixed(1);
    for(var seg = 0; seg < nPts - 1; seg++){
      var p0 = sortedPts[seg], p1 = sortedPts[seg + 1], hSeg = dxArr[seg];
      var cx1 = sx(p0[0] + hSeg / 3);
      var cy1 = sy(p0[1] + (hSeg * mArr[seg]) / 3);
      var cx2 = sx(p1[0] - hSeg / 3);
      var cy2 = sy(p1[1] - (hSeg * mArr[seg + 1]) / 3);
      pathData += ' C ' + cx1.toFixed(1) + ' ' + cy1.toFixed(1) + ', ' + cx2.toFixed(1) + ' ' + cy2.toFixed(1) + ', ' + sx(p1[0]).toFixed(1) + ' ' + sy(p1[1]).toFixed(1);
    }
    svg += '<path d="'+pathData+'" fill="none" stroke="'+FIG_INDIGO2+'" stroke-width="2.6" stroke-linecap="round"/>';

    // Points markers
    sortedPts.forEach(function(pt){
      var ptLabel = '(' + pt[0] + ', ' + pt[1] + ')';
      svg += '<circle cx="'+sx(pt[0]).toFixed(1)+'" cy="'+sy(pt[1]).toFixed(1)+'" r="3.5" fill="'+FIG_BG+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8" class="mfig-inspect-pt" data-inspect="'+esc(ptLabel)+'" data-x="'+pt[0]+'" data-y="'+pt[1]+'"><title>'+esc(ptLabel)+'</title></circle>';
    });
  }

  // Optional Quartiles / Median projections
  var quartiles = [];
  if(s.q1 != null && s.q1y != null) quartiles.push({ label: 'Q₁', x: s.q1, y: s.q1y, color: FIG_TEAL });
  else if(s.q1 != null) quartiles.push({ label: 'Q₁', x: s.q1, y: ymax * 0.25, color: FIG_TEAL });
  
  if(s.median != null && s.mediany != null) quartiles.push({ label: 'M', x: s.median, y: s.mediany, color: FIG_AMBER });
  else if(s.median != null) quartiles.push({ label: 'M', x: s.median, y: ymax * 0.5, color: FIG_AMBER });

  if(s.q3 != null && s.q3y != null) quartiles.push({ label: 'Q₃', x: s.q3, y: s.q3y, color: FIG_TEAL });
  else if(s.q3 != null) quartiles.push({ label: 'Q₃', x: s.q3, y: ymax * 0.75, color: FIG_TEAL });

  quartiles.forEach(function(q){
    var qx = sx(q.x), qy = sy(q.y);
    var qInfo = q.label + ': x = ' + q.x + ', Cumulative F = ' + q.y;
    svg += '<line x1="'+ml+'" y1="'+qy.toFixed(1)+'" x2="'+qx.toFixed(1)+'" y2="'+qy.toFixed(1)+'" stroke="'+q.color+'" stroke-width="1.4" stroke-dasharray="4,3"/>';
    svg += '<line x1="'+qx.toFixed(1)+'" y1="'+qy.toFixed(1)+'" x2="'+qx.toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+q.color+'" stroke-width="1.4" stroke-dasharray="4,3"/>';
    svg += '<circle cx="'+qx.toFixed(1)+'" cy="'+qy.toFixed(1)+'" r="4" fill="'+q.color+'" class="mfig-inspect-pt" data-inspect="'+esc(qInfo)+'"><title>'+esc(qInfo)+'</title></circle>';
    svg += '<text x="'+(qx+5).toFixed(1)+'" y="'+(mt+ph-5)+'" font-size="9" font-weight="bold" fill="'+q.color+'" text-anchor="start" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+q.label+'</text>';
  });

  svg += '</svg>';
  return svg;
}

/* ── Probability Tree Diagram ─────────────────────────── */
function renderTreeDiagram(s){
  var W = s.w || s.width || 380, H = s.h || s.height || 235;
  var a11y = _figA11yLabel(s);
  var svg = '<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg += '<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg += _svgTitle(s.title, W, 16, 10.5, FIG_INK);
  }

  var branches = Array.isArray(s.branches) ? s.branches : [];
  if(branches.length === 0){
    svg += '</svg>';
    return svg;
  }

  var startX = 28, stage1X = 132, stage2X = 252, outX = 305;
  var topOffset = (s.title ? 26 : 12) + ((s.firstLabel || s.secondLabel) ? 14 : 0);
  var midY = topOffset + (H - topOffset - 10) / 2;

  if(s.firstLabel){
    svg += '<text x="'+((startX+stage1X)/2)+'" y="'+(topOffset-4)+'" font-size="9" font-weight="600" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.firstLabel)+'</text>';
  }
  if(s.secondLabel){
    svg += '<text x="'+((stage1X+28+stage2X)/2)+'" y="'+(topOffset-4)+'" font-size="9" font-weight="600" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.secondLabel)+'</text>';
  }

  // Root node
  svg += '<circle cx="'+startX+'" cy="'+midY+'" r="3.5" fill="'+FIG_INK+'"/>';
  if(s.root){
    svg += '<text x="'+(startX+4)+'" y="'+(midY-8)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="start">'+esc(s.root)+'</text>';
  }

  var numB1 = branches.length;
  branches.forEach(function(b1, i1){
    var y1 = midY + (i1 - (numB1 - 1) / 2) * ((H - topOffset) * 0.44);
    svg += '<line x1="'+startX+'" y1="'+midY+'" x2="'+stage1X+'" y2="'+y1.toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2"/>';
    if(b1.prob){
      var mx1 = (startX + stage1X) / 2;
      var my1 = (midY + y1) / 2 + (y1 < midY ? -5 : 11);
      svg += '<text x="'+mx1.toFixed(1)+'" y="'+my1.toFixed(1)+'" font-size="9.5" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(b1.prob)+'</text>';
    }
    svg += '<circle cx="'+stage1X+'" cy="'+y1.toFixed(1)+'" r="3.5" fill="'+FIG_INDIGO2+'"/>';
    var b1Lbl = String(b1.label || '');
    svg += '<text x="'+(stage1X+6)+'" y="'+(y1+3.5).toFixed(1)+'" font-size="9.5" font-weight="600" fill="'+FIG_INK+'">'+esc(b1Lbl)+'</text>';
    var b1EndX = stage1X + Math.max(28, Math.min(54, b1Lbl.length * 5.4 + 12));

    var sub = Array.isArray(b1.branches) ? b1.branches : (Array.isArray(b1.children) ? b1.children : []);
    var numB2 = sub.length;
    sub.forEach(function(b2, i2){
      var y2 = y1 + (i2 - (numB2 - 1) / 2) * ((H - topOffset) * 0.22);
      svg += '<line x1="'+b1EndX.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+stage2X+'" y2="'+y2.toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';
      if(b2.prob){
        var mx2 = (b1EndX + stage2X) / 2;
        var my2 = (y1 + y2) / 2 + (y2 < y1 ? -4 : 11);
        svg += '<text x="'+mx2.toFixed(1)+'" y="'+my2.toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(b2.prob)+'</text>';
      }
      svg += '<circle cx="'+stage2X+'" cy="'+y2.toFixed(1)+'" r="3" fill="'+FIG_TEAL+'"/>';
      var b2Lbl = String(b2.label || '');
      var b2Fs = Math.max(7.8, Math.min(9.5, (W - stage2X - 10) / Math.max(1, b2Lbl.length * 0.56)));
      svg += '<text x="'+(stage2X+6)+'" y="'+(y2+3.5).toFixed(1)+'" font-size="'+b2Fs.toFixed(1)+'" fill="'+FIG_INK+'">'+esc(b2Lbl)+'</text>';

      if(b2.outcome || b2.outcomeProb){
        var otText = (b2.outcome || '') + (b2.outcomeProb ? ' = ' + b2.outcomeProb : '');
        var otX = Math.max(outX, stage2X + b2Lbl.length * b2Fs * 0.56 + 12);
        var otClamped = _clampLabelX(otX, otText, 8.5, 'start', stage2X+20, W-6);
        svg += '<text x="'+otClamped.toFixed(1)+'" y="'+(y2+3.5).toFixed(1)+'" font-size="8.5" font-weight="600" fill="'+FIG_MUTED+'">'+esc(otText)+'</text>';
      }
    });
  });

  svg += '</svg>';
  return svg;
}

/* ── Compass Bearings Diagram ─────────────────────────── */
function renderBearings(s){
  var W = s.w || s.width || 320, H = s.h || s.height || 250;
  var a11y = _figA11yLabel(s);
  var svg = '<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg += '<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg += _svgTitle(s.title, W, 16, 10.5, FIG_INK);
  }

  svg += '<defs>';
  svg += '<marker id="northArr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M1,5 L3,1 L5,5 Z" fill="'+FIG_INK+'"/></marker>';
  svg += '<marker id="lineArr" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M1,1 L5,3 L1,5 Z" fill="'+FIG_INDIGO2+'"/></marker>';
  svg += '</defs>';

  // Support 3-point two-leg bearing schema (originLabel, destLabel, thirdLabel, bearing1, bearing2, dist1, dist2)
  if(s.originLabel || s.bearing1 != null || s.bearing2 != null || s.thirdLabel){
    var b1Deg = parseFloat(s.bearing1 != null ? s.bearing1 : (s.bearing != null ? s.bearing : 48)) || 48;
    var b2Deg = parseFloat(s.bearing2 != null ? s.bearing2 : 140) || 140;
    var b1Rad = b1Deg * Math.PI / 180, b2Rad = b2Deg * Math.PI / 180;
    var ax0 = 64, ay0 = 168;
    var leg1 = 92, leg2 = 88;
    var bx0 = ax0 + leg1 * Math.sin(b1Rad), by0 = ay0 - leg1 * Math.cos(b1Rad);
    var cx0 = bx0 + leg2 * Math.sin(b2Rad), cy0 = by0 - leg2 * Math.cos(b2Rad);
    var nLen = 48;
    // North lines at O and A
    svg += '<line x1="'+ax0+'" y1="'+ay0+'" x2="'+ax0+'" y2="'+(ay0-nLen)+'" stroke="'+FIG_INK+'" stroke-width="1.6" marker-end="url(#northArr)"/>';
    svg += '<text x="'+ax0+'" y="'+(ay0-nLen-5)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">N</text>';
    svg += '<line x1="'+bx0.toFixed(1)+'" y1="'+by0.toFixed(1)+'" x2="'+bx0.toFixed(1)+'" y2="'+(by0-nLen).toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="3,2" marker-end="url(#northArr)"/>';
    svg += '<text x="'+bx0.toFixed(1)+'" y="'+(by0-nLen-5).toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">N</text>';
    // Triangle edges O->A, A->B, O--B
    svg += '<line x1="'+ax0+'" y1="'+ay0+'" x2="'+bx0.toFixed(1)+'" y2="'+by0.toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2.2"/>';
    svg += '<line x1="'+bx0.toFixed(1)+'" y1="'+by0.toFixed(1)+'" x2="'+cx0.toFixed(1)+'" y2="'+cy0.toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2.2"/>';
    svg += '<line x1="'+ax0+'" y1="'+ay0+'" x2="'+cx0.toFixed(1)+'" y2="'+cy0.toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.5" stroke-dasharray="5,3"/>';
    // Bearing arcs
    var rA1 = 22, rA2 = 22;
    svg += '<path d="M'+ax0+','+(ay0-rA1)+' A'+rA1+','+rA1+' 0 '+(b1Deg>180?1:0)+',1 '+(ax0+rA1*Math.sin(b1Rad)).toFixed(1)+','+(ay0-rA1*Math.cos(b1Rad)).toFixed(1)+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.6"/>';
    svg += '<text x="'+(ax0+(rA1+12)*Math.sin(b1Rad/2)).toFixed(1)+'" y="'+(ay0-(rA1+12)*Math.cos(b1Rad/2)+3).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(String(b1Deg<100?('00'+b1Deg).slice(-3):b1Deg)+'°')+'</text>';
    svg += '<path d="M'+bx0.toFixed(1)+','+(by0-rA2).toFixed(1)+' A'+rA2+','+rA2+' 0 '+(b2Deg>180?1:0)+',1 '+(bx0+rA2*Math.sin(b2Rad)).toFixed(1)+','+(by0-rA2*Math.cos(b2Rad)).toFixed(1)+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.6"/>';
    svg += '<text x="'+(bx0+(rA2+14)*Math.sin(b2Rad/2)).toFixed(1)+'" y="'+(by0-(rA2+14)*Math.cos(b2Rad/2)+3).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(String(b2Deg<100?('00'+b2Deg).slice(-3):b2Deg)+'°')+'</text>';
    // Distance labels
    if(s.dist1){
      svg += '<text x="'+((ax0+bx0)/2+10).toFixed(1)+'" y="'+((ay0+by0)/2+12).toFixed(1)+'" font-size="9.5" font-weight="600" fill="'+FIG_INDIGO2+'" text-anchor="start">'+esc(s.dist1)+'</text>';
    }
    if(s.dist2){
      svg += '<text x="'+((bx0+cx0)/2+8).toFixed(1)+'" y="'+((by0+cy0)/2-4).toFixed(1)+'" font-size="9.5" font-weight="600" fill="'+FIG_INDIGO2+'" text-anchor="start">'+esc(s.dist2)+'</text>';
    }
    // Points
    svg += '<circle cx="'+ax0+'" cy="'+ay0+'" r="3.8" fill="'+FIG_INK+'"/>';
    svg += '<text x="'+(ax0-8)+'" y="'+(ay0+14)+'" font-size="9.5" font-weight="bold" fill="'+FIG_INK+'" text-anchor="start">'+esc(s.originLabel||'O')+'</text>';
    svg += '<circle cx="'+bx0.toFixed(1)+'" cy="'+by0.toFixed(1)+'" r="3.8" fill="'+FIG_INK+'"/>';
    svg += '<text x="'+(bx0-8).toFixed(1)+'" y="'+(by0-6).toFixed(1)+'" font-size="9.5" font-weight="bold" fill="'+FIG_INK+'" text-anchor="end">'+esc(s.destLabel||'A')+'</text>';
    svg += '<circle cx="'+cx0.toFixed(1)+'" cy="'+cy0.toFixed(1)+'" r="3.8" fill="'+FIG_INK+'"/>';
    svg += '<text x="'+_clampLabelX(cx0, s.thirdLabel||'B', 9.5, 'middle', 8, W-8).toFixed(1)+'" y="'+(cy0+15).toFixed(1)+'" font-size="9.5" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(s.thirdLabel||'B')+'</text>';
    svg += '</svg>';
    return svg;
  }

  var pA = s.pointA || { name: 'A', x: 80, y: 170 };
  var pB = s.pointB || { name: 'B', x: 210, y: 85 };
  var bearingVal = s.bearing != null ? s.bearing : '058°';
  var dist = s.distance || '';

  var ax = pA.x, ay = pA.y;
  var bx = pB.x, by = pB.y;

  // North line at Point A
  var northLen = s.northLength || 65;
  svg += '<line x1="'+ax+'" y1="'+ay+'" x2="'+ax+'" y2="'+(ay - northLen)+'" stroke="'+FIG_INK+'" stroke-width="1.8" marker-end="url(#northArr)"/>';
  svg += '<text x="'+ax+'" y="'+(ay - northLen - 6)+'" font-size="11" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">N</text>';

  // Optional North line at Point B
  if(s.showNorthB){
    svg += '<line x1="'+bx+'" y1="'+by+'" x2="'+bx+'" y2="'+(by - northLen)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="3,2" marker-end="url(#northArr)"/>';
    svg += '<text x="'+bx+'" y="'+(by - northLen - 6)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">N</text>';
  }

  // Connecting line from A to B
  svg += '<line x1="'+ax+'" y1="'+ay+'" x2="'+bx+'" y2="'+by+'" stroke="'+FIG_INDIGO2+'" stroke-width="2.2" marker-end="url(#lineArr)"/>';

  // Clockwise bearing arc from North line
  var dx = bx - ax, dy = by - ay;
  var angleRad = Math.atan2(dx, -dy);
  if(angleRad < 0) angleRad += 2 * Math.PI;
  var deg = angleRad * 180 / Math.PI;

  var arcR = 28;
  var arcStartX = ax, arcStartY = ay - arcR;
  var arcEndX = ax + arcR * Math.sin(angleRad), arcEndY = ay - arcR * Math.cos(angleRad);
  var largeArcFlag = deg > 180 ? 1 : 0;
  var dArc = 'M ' + arcStartX + ' ' + arcStartY + ' A ' + arcR + ' ' + arcR + ' 0 ' + largeArcFlag + ' 1 ' + arcEndX.toFixed(1) + ' ' + arcEndY.toFixed(1);

  svg += '<path d="'+dArc+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.8"/>';

  // Bearing text label
  var midAngle = angleRad / 2;
  var lblR = arcR + 14;
  var lblX = ax + lblR * Math.sin(midAngle);
  var lblY = ay - lblR * Math.cos(midAngle) + 4;
  var bearingText = typeof bearingVal === 'number' ? (bearingVal < 100 ? ('00' + bearingVal).slice(-3) + '°' : bearingVal + '°') : String(bearingVal);
  svg += '<text x="'+lblX.toFixed(1)+'" y="'+lblY.toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_AMBER+'" text-anchor="middle">'+esc(bearingText)+'</text>';

  // Point A marker and label
  svg += '<circle cx="'+ax+'" cy="'+ay+'" r="4" fill="'+FIG_INK+'"/>';
  svg += '<text x="'+(ax-8)+'" y="'+(ay+14)+'" font-size="11" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(pA.name||'A')+'</text>';

  // Point B marker and label
  svg += '<circle cx="'+bx+'" cy="'+by+'" r="4" fill="'+FIG_INK+'"/>';
  svg += '<text x="'+(bx+8)+'" y="'+(by+14)+'" font-size="11" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(pB.name||'B')+'</text>';

  // Distance label
  if(dist){
    var dMidX = (ax + bx) / 2 + 10;
    var dMidY = (ay + by) / 2 - 8;
    svg += '<text x="'+dMidX.toFixed(1)+'" y="'+dMidY.toFixed(1)+'" font-size="10" font-weight="600" fill="'+FIG_INDIGO2+'">'+esc(dist)+'</text>';
  }

  svg += '</svg>';
  return svg;
}

/* ── Derivative & Interval Sign Chart ─────────────────── */
function renderSignChart(s){
  var W = s.w || s.width || 360, H = s.h || s.height || 145;
  var a11y = _figA11yLabel(s);
  var svg = '<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg += '<title>'+esc(a11y)+'</title>';

  if(s.title){
    svg += _svgTitle(s.title, W, 16, 10.5, FIG_INK);
  }

  var rawPts = s.points || s.criticalPoints || s.ticks || [-2, 3];
  var pts = rawPts.map(function(p){
    if(p && typeof p === 'object') return p.x != null ? p.x : (p.val != null ? p.val : (p.label || 0));
    return p;
  });
  var rows = s.rows || [
    { label: s.row1Label || "f'(x)", signs: s.signs || ['+', '0', '-', '0', '+'] },
    { label: s.row2Label || "f(x)", shape: s.behavior || s.behaviors || s.shape || ['↗', 'Max', '↘', 'Min', '↗'] }
  ];

  var leftW = 56;
  var tableW = W - leftW - 16;
  var topY = s.title ? 28 : 16;
  var rowH = Math.min(32, Math.floor((H - topY - 10) / (rows.length + 1)));
  var numCols = (pts.length * 2) + 1;
  var colW = tableW / numCols;

  svg += '<line x1="'+leftW+'" y1="'+(topY+rowH)+'" x2="'+(W-12)+'" y2="'+(topY+rowH)+'" stroke="'+FIG_BORDER+'" stroke-width="1.5"/>';
  svg += '<line x1="'+leftW+'" y1="'+topY+'" x2="'+leftW+'" y2="'+(topY+rowH*(rows.length+1))+'" stroke="'+FIG_BORDER+'" stroke-width="1.5"/>';

  svg += '<text x="'+(leftW/2)+'" y="'+(topY+rowH/2+4)+'" font-size="11" font-weight="bold" font-style="italic" fill="'+FIG_INK+'" text-anchor="middle">x</text>';

  var colIdx = 0;
  for(var p=0; p<=pts.length; p++){
    var intText = '';
    if(p === 0){
      intText = 'x < ' + pts[0];
    } else if(p === pts.length){
      intText = 'x > ' + pts[pts.length-1];
    } else {
      intText = '(' + pts[p-1] + ', ' + pts[p] + ')';
    }
    var cx = leftW + colIdx * colW + colW/2;
    svg += '<text x="'+cx.toFixed(1)+'" y="'+(topY+rowH/2+4)+'" font-size="8.5" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(intText)+'</text>';
    colIdx++;

    if(p < pts.length){
      var ptX = leftW + colIdx * colW + colW/2;
      svg += '<text x="'+ptX.toFixed(1)+'" y="'+(topY+rowH/2+4)+'" font-size="9.5" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(String(pts[p]))+'</text>';
      svg += '<line x1="'+(leftW + colIdx * colW)+'" y1="'+topY+'" x2="'+(leftW + colIdx * colW)+'" y2="'+(topY+rowH*(rows.length+1))+'" stroke="'+FIG_GRID+'" stroke-width="0.8" stroke-dasharray="2,2"/>';
      svg += '<line x1="'+(leftW + (colIdx+1) * colW)+'" y1="'+topY+'" x2="'+(leftW + (colIdx+1) * colW)+'" y2="'+(topY+rowH*(rows.length+1))+'" stroke="'+FIG_GRID+'" stroke-width="0.8" stroke-dasharray="2,2"/>';
      colIdx++;
    }
  }

  rows.forEach(function(row, rIdx){
    var yPos = topY + (rIdx + 1) * rowH;
    svg += '<line x1="10" y1="'+(yPos+rowH)+'" x2="'+(W-12)+'" y2="'+(yPos+rowH)+'" stroke="'+FIG_BORDER+'" stroke-width="1"/>';
    svg += '<text x="'+(leftW/2)+'" y="'+(yPos+rowH/2+4)+'" font-size="10" font-weight="bold" fill="'+FIG_INDIGO2+'" text-anchor="middle">'+esc(row.label)+'</text>';

    var rawVals = row.signs || row.shape || row.vals || [];
    var vals = rawVals.slice();
    // If only interval values (pts.length + 1) were provided, interleave critical point markers
    if(vals.length === pts.length + 1 && numCols === pts.length * 2 + 1){
      var expanded = [];
      for(var vi=0; vi<vals.length; vi++){
        expanded.push(vals[vi]);
        if(vi < pts.length){
          expanded.push(rIdx === 0 ? '0' : '•');
        }
      }
      vals = expanded;
    }
    for(var c=0; c<numCols; c++){
      var val = vals[c] != null ? String(vals[c]) : '';
      if(!val) continue;
      var cellX = leftW + c * colW + colW/2;
      var cellY = yPos + rowH/2 + 4;
      var color = FIG_INK;
      var weight = 'normal';
      var fontSize = 9.5;
      if(val === '+' || val === 'pos' || val === 'positive'){
        val = '+'; color = '#16a34a'; weight = 'bold'; fontSize = 12;
      } else if(val === '-' || val === '−' || val === 'neg' || val === 'negative'){
        val = '−'; color = '#dc2626'; weight = 'bold'; fontSize = 12;
      } else if(val === '0' || val === 'zero'){
        val = '0'; color = FIG_MUTED; weight = 'bold';
      } else if(val === '↗' || val === 'inc' || val === 'increasing' || val.indexOf('Increasing') !== -1){
        val = '↗'; color = '#16a34a'; weight = 'bold'; fontSize = 12;
      } else if(val === '↘' || val === 'dec' || val === 'decreasing' || val.indexOf('Decreasing') !== -1){
        val = '↘'; color = '#dc2626'; weight = 'bold'; fontSize = 12;
      } else if(val.toLowerCase().indexOf('max') !== -1){
        color = '#d97706'; weight = 'bold'; fontSize = 8.5;
      } else if(val.toLowerCase().indexOf('min') !== -1){
        color = '#2563eb'; weight = 'bold'; fontSize = 8.5;
      }
      svg += '<text x="'+cellX.toFixed(1)+'" y="'+cellY.toFixed(1)+'" font-size="'+fontSize+'" font-weight="'+weight+'" fill="'+color+'" text-anchor="middle">'+esc(val)+'</text>';
    }
  });

  svg += '</svg>';
  return svg;
}

/* ── Transformation Grid ──────────────────────────────── */
function renderTransformationGrid(s){
  var W = s.w || s.width || 320, H = s.h || s.height || 270;
  var a11y = _figA11yLabel(s);
  var svg = '<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg += '<title>'+esc(a11y)+'</title>';

  var pad = 28, topPad = s.title ? 30 : 22;
  var gw = W - 2 * pad, gh = H - topPad - pad;
  var objVerts = s.object || s.original || s.vertices || [[1,1], [3,1], [3,3]];
  var imgVerts = s.image || s.transformed || [];
  var allV = objVerts.concat(imgVerts);
  var xmin = s.xmin != null ? s.xmin : -6, xmax = s.xmax != null ? s.xmax : 6;
  var ymin = s.ymin != null ? s.ymin : -6, ymax = s.ymax != null ? s.ymax : 6;
  allV.forEach(function(v){
    if(v[0] - 1 < xmin) xmin = Math.floor(v[0] - 1);
    if(v[0] + 1 > xmax) xmax = Math.ceil(v[0] + 1);
    if(v[1] - 1 < ymin) ymin = Math.floor(v[1] - 1);
    if(v[1] + 1 > ymax) ymax = Math.ceil(v[1] + 1);
  });

  function sx(x){ return pad + (x - xmin) / ((xmax - xmin)||1) * gw; }
  function sy(y){ return topPad + (ymax - y) / ((ymax - ymin)||1) * gh; }

  var xSpan = Math.max(1, xmax - xmin), ySpan = Math.max(1, ymax - ymin);
  var xStep = Math.max(2, Math.ceil(xSpan / 6 / 2) * 2);
  var yStep = Math.max(2, Math.ceil(ySpan / 6 / 2) * 2);
  var gStepX = Math.max(1, Math.floor(xStep / 2)), gStepY = Math.max(1, Math.floor(yStep / 2));

  svg += '<g stroke="'+FIG_GRID+'" stroke-width="0.5" stroke-opacity="0.8">';
  for(var gx = Math.ceil(xmin / gStepX) * gStepX; gx <= xmax; gx += gStepX){
    var px = sx(gx);
    svg += '<line x1="'+px.toFixed(1)+'" y1="'+topPad+'" x2="'+px.toFixed(1)+'" y2="'+(H-pad)+'"/>';
  }
  for(var gy = Math.ceil(ymin / gStepY) * gStepY; gy <= ymax; gy += gStepY){
    var py = sy(gy);
    svg += '<line x1="'+pad+'" y1="'+py.toFixed(1)+'" x2="'+(W-pad)+'" y2="'+py.toFixed(1)+'"/>';
  }
  svg += '</g>';

  var ox = sx(0), oy = sy(0);
  svg += '<line x1="'+pad+'" y1="'+oy.toFixed(1)+'" x2="'+(W-pad)+'" y2="'+oy.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';
  svg += '<line x1="'+ox.toFixed(1)+'" y1="'+(H-pad)+'" x2="'+ox.toFixed(1)+'" y2="'+topPad+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';

  var tgBoxes = [];
  function tgOverlaps(cx, cy, w, h){
    var x1 = cx - w/2, x2 = cx + w/2, y1 = cy - h*0.8, y2 = cy + h*0.2;
    for(var k = 0; k < tgBoxes.length; k++){
      var b = tgBoxes[k];
      if(Math.min(x2, b.x2) - Math.max(x1, b.x1) > 0 && Math.min(y2, b.y2) - Math.max(y1, b.y1) > 0) return true;
    }
    return false;
  }
  function tgRecord(cx, cy, w, h){
    tgBoxes.push({ x1: cx - w/2, x2: cx + w/2, y1: cy - h*0.8, y2: cy + h*0.2 });
  }

  svg += '<g font-size="8" fill="'+FIG_MUTED+'" text-anchor="middle">';
  for(var tx = Math.ceil(xmin / xStep) * xStep; tx <= xmax; tx += xStep){
    if(tx === 0) continue;
    var txX = sx(tx), txY = oy + 11;
    if(Math.abs(txX - ox) < 14) continue;
    var nearVert = allV.some(function(v){ return Math.hypot(sx(v[0]) - txX, sy(v[1]) - (txY - 3)) < 16; });
    if(nearVert) continue;
    var tw = String(tx).length * 6 + 4;
    tgRecord(txX, txY, tw, 12);
    svg += '<text x="'+txX.toFixed(1)+'" y="'+txY.toFixed(1)+'">'+tx+'</text>';
  }
  svg += '</g><g font-size="8" fill="'+FIG_MUTED+'" text-anchor="end">';
  for(var ty = Math.ceil(ymin / yStep) * yStep; ty <= ymax; ty += yStep){
    if(ty === 0) continue;
    var tyX = ox - 4, tyY = sy(ty) + 3;
    if(Math.abs(sy(ty) - oy) < 14) continue;
    var twY = String(ty).length * 6 + 4;
    var nearVertY = allV.some(function(v){ return Math.hypot(sx(v[0]) - (tyX - twY/2), sy(v[1]) - (tyY - 3)) < 16; });
    if(nearVertY || tgOverlaps(tyX - twY/2, tyY, twY, 12)) continue;
    tgRecord(tyX - twY/2, tyY, twY, 12);
    svg += '<text x="'+tyX.toFixed(1)+'" y="'+tyY.toFixed(1)+'">'+ty+'</text>';
  }
  svg += '</g>';

  if(s.mirrorLine || s.line){
    var ml = s.mirrorLine || s.line;
    var x1 = xmin, x2 = xmax;
    var y1 = ml.m != null ? (ml.m * x1 + (ml.c || 0)) : (ml.y != null ? ml.y : x1);
    var y2 = ml.m != null ? (ml.m * x2 + (ml.c || 0)) : (ml.y != null ? ml.y : x2);
    if(ml.x != null){
      svg += '<line x1="'+sx(ml.x).toFixed(1)+'" y1="'+topPad+'" x2="'+sx(ml.x).toFixed(1)+'" y2="'+(H-pad)+'" stroke="'+FIG_AMBER+'" stroke-width="1.5" stroke-dasharray="4,3"/>';
      if(ml.label) svg += '<text x="'+(sx(ml.x)+4).toFixed(1)+'" y="'+(topPad+12)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'">'+esc(ml.label)+'</text>';
    } else {
      svg += '<line x1="'+sx(x1).toFixed(1)+'" y1="'+sy(y1).toFixed(1)+'" x2="'+sx(x2).toFixed(1)+'" y2="'+sy(y2).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.5" stroke-dasharray="4,3"/>';
      if(ml.label) svg += '<text x="'+(sx(x2)-10).toFixed(1)+'" y="'+(sy(y2)-6).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="end">'+esc(ml.label)+'</text>';
    }
  }

  if(s.center){
    var cx = s.center[0] != null ? s.center[0] : (s.center.x || 0);
    var cy = s.center[1] != null ? s.center[1] : (s.center.y || 0);
    svg += '<circle cx="'+sx(cx).toFixed(1)+'" cy="'+sy(cy).toFixed(1)+'" r="4" fill="'+FIG_AMBER+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    svg += '<text x="'+(sx(cx)+6).toFixed(1)+'" y="'+(sy(cy)-4).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'">'+esc(s.centerLabel || 'Center')+'</text>';
  }

  function placeTgVertLabel(vx, vy, cx0, cy0, lbl){
    var dx = vx - cx0, dy = vy - cy0, dl = Math.hypot(dx, dy) || 1;
    var baseAng = Math.atan2(dy, dx);
    var lw = Math.max(10, String(lbl).length * 6.2), lh = 11;
    var cands = [0, 0.5, -0.5, 1.0, -1.0, 1.5, -1.5, 2.2, -2.2, Math.PI];
    for(var ci = 0; ci < cands.length; ci++){
      var ang = baseAng + cands[ci];
      var dist = ci < 3 ? 12 : 14;
      var lx = _clampLabelX(vx + Math.cos(ang)*dist, lbl, 9.5, 'middle', pad+4, W-pad-4);
      var ly = Math.max(topPad+9, Math.min(H-pad-4, vy + Math.sin(ang)*dist + 3));
      if(!tgOverlaps(lx, ly, lw, lh)){
        tgRecord(lx, ly, lw, lh);
        return [lx, ly];
      }
    }
    var flx = _clampLabelX(vx + (dx/dl)*12, lbl, 9.5, 'middle', pad+4, W-pad-4);
    var fly = Math.max(topPad+9, Math.min(H-pad-4, vy + (dy/dl)*12 + 3));
    tgRecord(flx, fly, lw, lh);
    return [flx, fly];
  }

  var objPointsStr = objVerts.map(function(v){ return sx(v[0]).toFixed(1) + ',' + sy(v[1]).toFixed(1); }).join(' ');
  svg += '<polygon points="'+objPointsStr+'" fill="rgba(79,70,229,0.22)" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';

  var objLabels = s.objectLabels || s.labels || ['A', 'B', 'C', 'D'];
  var tgCx1 = objVerts.reduce(function(a,v){return a+sx(v[0]);},0)/Math.max(1,objVerts.length);
  var tgCy1 = objVerts.reduce(function(a,v){return a+sy(v[1]);},0)/Math.max(1,objVerts.length);
  objVerts.forEach(function(v, i){
    var lbl = objLabels[i] || '';
    if(lbl){
      var vx = sx(v[0]), vy = sy(v[1]);
      var pos = placeTgVertLabel(vx, vy, tgCx1, tgCy1, lbl);
      svg += '<circle cx="'+vx.toFixed(1)+'" cy="'+vy.toFixed(1)+'" r="2.5" fill="'+FIG_INDIGO+'"/>';
      svg += '<text x="'+pos[0].toFixed(1)+'" y="'+pos[1].toFixed(1)+'" font-size="9.5" font-weight="bold" fill="'+FIG_INDIGO+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(lbl)+'</text>';
    }
  });

  if(imgVerts.length){
    var imgPointsStr = imgVerts.map(function(v){ return sx(v[0]).toFixed(1) + ',' + sy(v[1]).toFixed(1); }).join(' ');
    svg += '<polygon points="'+imgPointsStr+'" fill="rgba(16,185,129,0.22)" stroke="#059669" stroke-width="2"/>';

    var imgLabels = s.imageLabels || objLabels.map(function(l){ return l + "′"; });
    var tgCx2 = imgVerts.reduce(function(a,v){return a+sx(v[0]);},0)/Math.max(1,imgVerts.length);
    var tgCy2 = imgVerts.reduce(function(a,v){return a+sy(v[1]);},0)/Math.max(1,imgVerts.length);
    imgVerts.forEach(function(v, i){
      var lbl = imgLabels[i] || '';
      if(lbl){
        var vx = sx(v[0]), vy = sy(v[1]);
        var pos2 = placeTgVertLabel(vx, vy, tgCx2, tgCy2, lbl);
        svg += '<circle cx="'+vx.toFixed(1)+'" cy="'+vy.toFixed(1)+'" r="2.5" fill="#059669"/>';
        svg += '<text x="'+pos2[0].toFixed(1)+'" y="'+pos2[1].toFixed(1)+'" font-size="9.5" font-weight="bold" fill="#059669" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(lbl)+'</text>';
      }
    });
  }

  if(s.title){
    svg += _svgTitle(s.title, W, 16, 10, FIG_INK);
  }

  svg += '</svg>';
  return svg;
}

/* ── Voronoi Diagram ──────────────────────────────────── */
function renderVoronoi(s){
  var W = s.w || s.width || 360, H = s.h || s.height || 280;
  var a11y = _figA11yLabel(s);
  var svg = '<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
  svg += '<title>'+esc(a11y)+'</title>';

  var pad = 28, topPad = s.title ? 30 : 24;
  var gw = W - 2 * pad, gh = H - topPad - pad;
  var xmin = s.xmin != null ? s.xmin : (Array.isArray(s.xlim) ? s.xlim[0] : 0);
  var xmax = s.xmax != null ? s.xmax : (Array.isArray(s.xlim) ? s.xlim[1] : 10);
  var ymin = s.ymin != null ? s.ymin : (Array.isArray(s.ylim) ? s.ylim[0] : 0);
  var ymax = s.ymax != null ? s.ymax : (Array.isArray(s.ylim) ? s.ylim[1] : 10);

  function sx(x){ return pad + (x - xmin) / ((xmax - xmin)||1) * gw; }
  function sy(y){ return topPad + (ymax - y) / ((ymax - ymin)||1) * gh; }

  // Draw background grid
  svg += '<g stroke="'+FIG_GRID+'" stroke-width="0.5" stroke-opacity="0.7">';
  for(var gx = Math.ceil(xmin); gx <= xmax; gx++){
    var px = sx(gx);
    svg += '<line x1="'+px.toFixed(1)+'" y1="'+topPad+'" x2="'+px.toFixed(1)+'" y2="'+(H-pad)+'"/>';
  }
  for(var gy = Math.ceil(ymin); gy <= ymax; gy++){
    var py = sy(gy);
    svg += '<line x1="'+pad+'" y1="'+py.toFixed(1)+'" x2="'+(W-pad)+'" y2="'+py.toFixed(1)+'"/>';
  }
  svg += '</g>';

  var sites = Array.isArray(s.sites) ? s.sites : [];
  var cellColors = ['rgba(79,70,229,0.11)', 'rgba(217,119,6,0.11)', 'rgba(14,165,233,0.11)', 'rgba(16,185,129,0.11)', 'rgba(236,72,153,0.11)'];

  // Auto-compute exact Voronoi cells by clipping bounding box against perpendicular bisector half-planes
  function clipPolyHalfPlane(poly, sx0, sy0, ox0, oy0){
    var dx = ox0 - sx0, dy = oy0 - sy0;
    var mx = (sx0 + ox0) / 2, my = (sy0 + oy0) / 2;
    function inside(pt){ return (pt[0] - mx) * dx + (pt[1] - my) * dy <= 1e-9; }
    function intersect(p1, p2){
      var v1 = (p1[0] - mx) * dx + (p1[1] - my) * dy;
      var v2 = (p2[0] - mx) * dx + (p2[1] - my) * dy;
      var t = v1 / ((v1 - v2) || 1e-12);
      return [p1[0] + t * (p2[0] - p1[0]), p1[1] + t * (p2[1] - p1[1])];
    }
    var out = [];
    for(var i = 0; i < poly.length; i++){
      var cur = poly[i], prev = poly[(i + poly.length - 1) % poly.length];
      var curIn = inside(cur), prevIn = inside(prev);
      if(curIn){
        if(!prevIn) out.push(intersect(prev, cur));
        out.push(cur);
      } else if(prevIn){
        out.push(intersect(prev, cur));
      }
    }
    return out;
  }

  var autoCells = [];
  if(!Array.isArray(s.cells) && sites.length >= 2){
    sites.forEach(function(st, i){
      var sx0 = st.x != null ? st.x : (Array.isArray(st) ? st[0] : 0);
      var sy0 = st.y != null ? st.y : (Array.isArray(st) ? st[1] : 0);
      var poly = [[xmin, ymin], [xmax, ymin], [xmax, ymax], [xmin, ymax]];
      sites.forEach(function(other, j){
        if(i === j) return;
        var ox0 = other.x != null ? other.x : (Array.isArray(other) ? other[0] : 0);
        var oy0 = other.y != null ? other.y : (Array.isArray(other) ? other[1] : 0);
        poly = clipPolyHalfPlane(poly, sx0, sy0, ox0, oy0);
      });
      autoCells.push({ points: poly, fill: cellColors[i % cellColors.length] });
    });
  }

  // 1. Shaded Cells & Auto-Computed Voronoi Bisector Edges
  var cellsToDraw = Array.isArray(s.cells) ? s.cells : autoCells;
  cellsToDraw.forEach(function(c, ci){
    if(!c.points || !c.points.length) return;
    var pstr = c.points.map(function(p){ return sx(p[0]).toFixed(1)+','+sy(p[1]).toFixed(1); }).join(' ');
    var fill = c.fill || cellColors[ci % cellColors.length];
    var strokeAttr = (!Array.isArray(s.edges) || !s.edges.length) ? (' stroke="'+FIG_INDIGO2+'" stroke-width="1.7" stroke-linejoin="round"') : ' stroke="none"';
    svg += '<polygon points="'+pstr+'" fill="'+fill+'"'+strokeAttr+'/>';
  });

  // 2. Explicit Voronoi Edges (if provided)
  var edges = Array.isArray(s.edges) ? s.edges : [];
  if(edges.length){
    svg += '<g stroke="'+FIG_INDIGO2+'" stroke-width="1.8" stroke-linecap="round">';
    edges.forEach(function(e){
      var dash = e.dashed ? ' stroke-dasharray="4,3"' : '';
      svg += '<line x1="'+sx(e.x1).toFixed(1)+'" y1="'+sy(e.y1).toFixed(1)+'" x2="'+sx(e.x2).toFixed(1)+'" y2="'+sy(e.y2).toFixed(1)+'"'+dash+'/>';
      if(e.label){
        var mx = (sx(e.x1) + sx(e.x2)) / 2, my = (sy(e.y1) + sy(e.y2)) / 2 - 4;
        svg += '<text x="'+mx.toFixed(1)+'" y="'+my.toFixed(1)+'" font-size="8.5" fill="'+FIG_MUTED+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(e.label)+'</text>';
      }
    });
    svg += '</g>';
  }

  // Bounding box / axes
  svg += '<rect x="'+pad+'" y="'+topPad+'" width="'+gw+'" height="'+gh+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.2"/>';

  // Coordinate numbers along border
  svg += '<g font-size="8.5" fill="'+FIG_MUTED+'" text-anchor="middle">';
  for(var tx = Math.ceil(xmin); tx <= xmax; tx++){
    if(tx % 2 === 0) svg += '<text x="'+sx(tx).toFixed(1)+'" y="'+(H - pad + 13)+'">'+tx+'</text>';
  }
  svg += '</g><g font-size="8.5" fill="'+FIG_MUTED+'" text-anchor="end">';
  for(var ty = Math.ceil(ymin); ty <= ymax; ty++){
    if(ty % 2 === 0) svg += '<text x="'+(pad - 4)+'" y="'+(sy(ty) + 3)+'">'+ty+'</text>';
  }
  svg += '</g>';

  // 3. Maximum Empty Circle / Toxic Waste Site (circumcircle at Voronoi vertex)
  if(s.emptyCircle){
    var ec = s.emptyCircle;
    var ecx = sx(ec.cx || ec.x || 0), ecy = sy(ec.cy || ec.y || 0);
    var ecr = (ec.r || 1) / ((xmax - xmin)||1) * gw;
    svg += '<circle cx="'+ecx.toFixed(1)+'" cy="'+ecy.toFixed(1)+'" r="'+ecr.toFixed(1)+'" fill="rgba(239,68,68,0.08)" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4"/>';
    svg += '<circle cx="'+ecx.toFixed(1)+'" cy="'+ecy.toFixed(1)+'" r="3.5" fill="#ef4444"/>';
    if(ec.label){
      var ecLx = _clampLabelX(ecx + 6, ec.label, 9, 'start', pad+4, W-pad-4);
      svg += '<text x="'+ecLx.toFixed(1)+'" y="'+(ecy-6).toFixed(1)+'" font-size="9" font-weight="bold" fill="#dc2626" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(ec.label)+'</text>';
    }
  }

  // 4. Sites (Generators) — do not repeat coordinates if label already contains '(' and avoid site label overlaps
  var siteColors = [FIG_INDIGO, '#d97706', '#0284c7', '#059669', '#db2777'];
  var vorPlaced = [];
  sites.forEach(function(st, idx){
    var x = st.x != null ? st.x : (Array.isArray(st) ? st[0] : 0);
    var y = st.y != null ? st.y : (Array.isArray(st) ? st[1] : 0);
    var rawLbl = String(st.label || ('S' + (idx + 1)));
    var fullLbl = rawLbl.indexOf('(') !== -1 ? rawLbl : (rawLbl + '(' + x + ', ' + y + ')');
    var col = st.color || siteColors[idx % siteColors.length];
    var px = sx(x), py = sy(y);
    var wEst = fullLbl.length * 5.2 + 6;
    var cands = [
      { dx: 7, dy: -6, anc: 'start' },
      { dx: -7, dy: -6, anc: 'end' },
      { dx: 7, dy: 14, anc: 'start' },
      { dx: -7, dy: 14, anc: 'end' },
      { dx: 0, dy: -10, anc: 'middle' },
      { dx: 0, dy: 16, anc: 'middle' }
    ];
    if(px > W - pad - 65) cands = [cands[1], cands[3], cands[0], cands[2], cands[4], cands[5]];
    var bestL = null, bestPen = Infinity;
    cands.forEach(function(cd){
      var lx = _clampLabelX(px + cd.dx, fullLbl, 9.5, cd.anc, pad+4, W-pad-4);
      var ly = Math.max(topPad + 12, Math.min(H - pad - 5, py + cd.dy));
      var x1 = cd.anc === 'middle' ? lx - wEst/2 : (cd.anc === 'end' ? lx - wEst : lx);
      var x2 = x1 + wEst, y1 = ly - 8, y2 = ly + 3;
      var pen = 0;
      vorPlaced.forEach(function(b){
        var ox = Math.max(0, Math.min(x2, b.x2) - Math.max(x1, b.x1));
        var oy = Math.max(0, Math.min(y2, b.y2) - Math.max(y1, b.y1));
        if(ox > 0 && oy > 0) pen += 10000 + ox * oy * 50;
      });
      sites.forEach(function(ost, oIdx){
        var ox0 = sx(ost.x != null ? ost.x : ost[0]), oy0 = sy(ost.y != null ? ost.y : ost[1]);
        if(ox0 >= x1 - 4 && ox0 <= x2 + 4 && oy0 >= y1 - 4 && oy0 <= y2 + 4) pen += 4000;
      });
      if(pen < bestPen){ bestPen = pen; bestL = { x: lx, y: ly, anc: cd.anc, x1: x1, x2: x2, y1: y1, y2: y2 }; }
    });
    vorPlaced.push(bestL);
    svg += '<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="4.5" fill="'+col+'" stroke="'+FIG_BG+'" stroke-width="1.5"/>';
    svg += '<text x="'+bestL.x.toFixed(1)+'" y="'+bestL.y.toFixed(1)+'" font-size="9.5" font-weight="bold" fill="'+col+'" text-anchor="'+bestL.anc+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3" stroke-linejoin="round">'+esc(fullLbl)+'</text>';
  });

  // 5. Query Point P(x, y) — do not repeat coordinates if label already contains '('
  if(s.queryPoint){
    var qp = s.queryPoint;
    var qpx = sx(qp.x || 0), qpy = sy(qp.y || 0);
    var rawQpLbl = String(qp.label || 'P');
    var fullQpLbl = rawQpLbl.indexOf('(') !== -1 ? rawQpLbl : (rawQpLbl + '(' + (qp.x||0) + ', ' + (qp.y||0) + ')');
    var qpAnc = qpx > W - pad - 70 ? 'end' : 'start';
    var qpLx = _clampLabelX(qpx + (qpAnc === 'end' ? -7 : 7), fullQpLbl, 9.5, qpAnc, pad+4, W-pad-4);
    var qpLy = Math.min(H - pad - 5, qpy + 12);

    svg += '<circle cx="'+qpx.toFixed(1)+'" cy="'+qpy.toFixed(1)+'" r="4" fill="'+FIG_AMBER+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    svg += '<text x="'+qpLx.toFixed(1)+'" y="'+qpLy.toFixed(1)+'" font-size="9.5" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="'+qpAnc+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3" stroke-linejoin="round">'+esc(fullQpLbl)+'</text>';

    if(qp.toSite && sites.length){
      var target = sites.find(function(st){ return (st.label === qp.toSite || String(st.label||'').indexOf(qp.toSite) === 0); }) || sites[0];
      var tx = target.x != null ? target.x : target[0];
      var ty = target.y != null ? target.y : target[1];
      svg += '<line x1="'+qpx.toFixed(1)+'" y1="'+qpy.toFixed(1)+'" x2="'+sx(tx).toFixed(1)+'" y2="'+sy(ty).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.2" stroke-dasharray="3,3"/>';
    }
  }

  // Title
  if(s.title){
    svg += _svgTitle(s.title, W, 16, 10, FIG_INK);
  }

  svg += '</svg>';
  return svg;
}

window.renderBoxPlot = renderBoxPlot;
window.renderHistogram = renderHistogram;
window.renderDotPlot = renderDotPlot;
window.renderUnitCircle = renderUnitCircle;
window.renderSinusoid = renderSinusoid;
window.renderNormalCurve = renderNormalCurve;
window.renderSlopeField = renderSlopeField;
window.renderTwoWayTable = renderTwoWayTable;
window.renderCumulativeFrequency = renderCumulativeFrequency;
window.renderTreeDiagram = renderTreeDiagram;
window.renderBearings = renderBearings;
window.renderSignChart = renderSignChart;
window.renderTransformationGrid = renderTransformationGrid;
window.renderVoronoi = renderVoronoi;

/* ── IB Argand Diagram (Complex Plane, Loci & Roots of Unity) ────────── */
function renderArgand(s){
  var W=360, H=270, ml=42, mr=26, mt=s.title?34:24, mb=30;
  var pw=W-ml-mr, ph=H-mt-mb;
  var xmin=s.xmin!=null?s.xmin:(s.xlim?s.xlim[0]:-4);
  var xmax=s.xmax!=null?s.xmax:(s.xlim?s.xlim[1]:4);
  var ymin=s.ymin!=null?s.ymin:(s.ylim?s.ylim[0]:-4);
  var ymax=s.ymax!=null?s.ymax:(s.ylim?s.ylim[1]:4);
  var pts = s.points || s.vectors || [];
  pts.forEach(function(pt){
    var re = pt.re!=null?pt.re:(pt.x!=null?pt.x:0);
    var im = pt.im!=null?pt.im:(pt.y!=null?pt.y:0);
    if(re - 1 < xmin) xmin = Math.floor(re - 1);
    if(re + 1.5 > xmax) xmax = Math.ceil(re + 1.5);
    if(im - 1 < ymin) ymin = Math.floor(im - 1);
    if(im + 1 > ymax) ymax = Math.ceil(im + 1);
  });
  var circles = s.circles || (s.circle ? [s.circle] : []);
  circles.forEach(function(c){
    var cx0 = c.x||0, cy0 = c.y||0, cr0 = c.r||1;
    if(cx0 - cr0 - 1 < xmin) xmin = Math.floor(cx0 - cr0 - 1);
    if(cx0 + cr0 + 1 > xmax) xmax = Math.ceil(cx0 + cr0 + 1);
    if(cy0 - cr0 - 1 < ymin) ymin = Math.floor(cy0 - cr0 - 1);
    if(cy0 + cr0 + 1 > ymax) ymax = Math.ceil(cy0 + cr0 + 1);
  });
  function sx(x){ return ml + (x - xmin) / ((xmax - xmin)||1) * pw; }
  function sy(y){ return mt + ph - (y - ymin) / ((ymax - ymin)||1) * ph; }
  var ox = sx(0), oy = sy(0);
  var a11y = _figA11yLabel(s);
  var svg = '<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg += '<title>'+esc(a11y)+'</title>';
  svg += '<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  // Grid
  var xi, yi;
  var xStep = (xmax - xmin) > 12 ? 4 : ((xmax - xmin) >= 6 ? 2 : 1);
  var yStep = (ymax - ymin) > 12 ? 4 : ((ymax - ymin) >= 6 ? 2 : 1);
  for(xi = Math.ceil(xmin / xStep) * xStep; xi <= Math.floor(xmax); xi += xStep){
    svg += '<line x1="'+sx(xi).toFixed(1)+'" y1="'+mt+'" x2="'+sx(xi).toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_GRID+'" stroke-width="0.7"/>';
  }
  for(yi = Math.ceil(ymin / yStep) * yStep; yi <= Math.floor(ymax); yi += yStep){
    svg += '<line x1="'+ml+'" y1="'+sy(yi).toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+sy(yi).toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.7"/>';
  }

  var argPlaced = [];
  // Optional modulus circles: s.circles = [{x, y, r, label, dashed, fill}]
  circles.forEach(function(c){
    var cx = sx(c.x||0), cy = sy(c.y||0);
    var rx = Math.abs(sx((c.x||0)+(c.r||1)) - cx);
    var ry = Math.abs(sy((c.y||0)+(c.r||1)) - cy);
    svg += '<ellipse cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" rx="'+rx.toFixed(1)+'" ry="'+ry.toFixed(1)+'" fill="'+(c.fill||FIG_INDIGO_FILL)+'" stroke="'+(c.color||FIG_INDIGO2)+'" stroke-width="1.5"'+(c.dashed?' stroke-dasharray="5,3"':'')+'/>';
    if(c.label){
      var clx = _clampLabelX(cx-rx*0.5, c.label, 9.5, 'end', 6, W-6);
      var cly = Math.min(H-8, cy+ry+13);
      var cw = String(c.label).length * 5.2 + 6;
      argPlaced.push({ x1: clx - cw, x2: clx, y1: cly - 9, y2: cly + 3 });
      svg += '<text x="'+clx.toFixed(1)+'" y="'+cly.toFixed(1)+'" font-size="9.5" font-weight="600" fill="'+(c.color||FIG_INDIGO)+'" text-anchor="end" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(c.label)+'</text>';
    }
  });

  // Optional loci / lines / rays: s.rays = [{x1,y1,x2,y2,label,dashed,color}]
  (s.rays || s.loci || []).forEach(function(r){
    var x1 = sx(r.x1!=null?r.x1:0), y1 = sy(r.y1!=null?r.y1:0);
    var x2 = sx(r.x2!=null?r.x2:2), y2 = sy(r.y2!=null?r.y2:2);
    svg += '<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+(r.color||FIG_TEAL)+'" stroke-width="1.6"'+(r.dashed?' stroke-dasharray="5,3"':'')+'/>';
    if(r.label){
      var mx = (x1+x2)/2, my = (y1+y2)/2;
      var rlx = _clampLabelX(mx+6, r.label, 9.5, 'start', 6, W-6);
      svg += '<text x="'+rlx.toFixed(1)+'" y="'+Math.max(mt+10, my-5).toFixed(1)+'" font-size="9.5" font-weight="600" fill="'+(r.color||FIG_TEAL)+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(r.label)+'</text>';
    }
  });

  // Optional polygon connecting roots of unity
  if(s.polygon && pts.length >= 3){
    var pStr = pts.map(function(pt){
      var px = pt.re!=null?pt.re:(pt.x!=null?pt.x:0);
      var py = pt.im!=null?pt.im:(pt.y!=null?pt.y:0);
      return sx(px).toFixed(1)+','+sy(py).toFixed(1);
    }).join(' ');
    svg += '<polygon points="'+pStr+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="1.3" stroke-dasharray="4,2"/>';
  }

  // Axes Re(z) and Im(z)
  svg += '<line x1="'+ml+'" y1="'+oy.toFixed(1)+'" x2="'+(ml+pw+6)+'" y2="'+oy.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg += '<polygon points="'+(ml+pw+8)+','+oy.toFixed(1)+' '+(ml+pw+2)+','+(oy-3).toFixed(1)+' '+(ml+pw+2)+','+(oy+3).toFixed(1)+'" fill="'+FIG_INK+'"/>';
  svg += '<line x1="'+ox.toFixed(1)+'" y1="'+(mt+ph+4)+'" x2="'+ox.toFixed(1)+'" y2="'+(mt-4)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg += '<polygon points="'+ox.toFixed(1)+','+(mt-6)+' '+(ox-3).toFixed(1)+','+mt+' '+(ox+3).toFixed(1)+','+mt+'" fill="'+FIG_INK+'"/>';
  svg += '<text x="'+(ml+pw+10)+'" y="'+(oy+4).toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'">Re</text>';
  svg += '<text x="'+(ox+6).toFixed(1)+'" y="'+(mt+9).toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'">Im</text>';
  svg += '<text x="'+(ox-8).toFixed(1)+'" y="'+(oy+12).toFixed(1)+'" font-size="9" fill="'+FIG_MUTED+'">O</text>';

  // Ticks
  for(xi = Math.ceil(xmin / xStep) * xStep; xi <= Math.floor(xmax); xi += xStep){
    if(xi === 0) continue;
    var tx = sx(xi);
    svg += '<line x1="'+tx.toFixed(1)+'" y1="'+(oy-2.5).toFixed(1)+'" x2="'+tx.toFixed(1)+'" y2="'+(oy+2.5).toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    svg += '<text x="'+tx.toFixed(1)+'" y="'+(oy+12).toFixed(1)+'" font-size="8.5" fill="'+FIG_MUTED+'" text-anchor="middle">'+xi+'</text>';
  }
  for(yi = Math.ceil(ymin / yStep) * yStep; yi <= Math.floor(ymax); yi += yStep){
    if(yi === 0) continue;
    var ty = sy(yi);
    svg += '<line x1="'+(ox-2.5).toFixed(1)+'" y1="'+ty.toFixed(1)+'" x2="'+(ox+2.5).toFixed(1)+'" y2="'+ty.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    svg += '<text x="'+(ox-5).toFixed(1)+'" y="'+(ty+3).toFixed(1)+'" font-size="8.5" fill="'+FIG_MUTED+'" text-anchor="end">'+yi+'i</text>';
  }

  // Complex vectors and points
  pts.forEach(function(pt, idx){
    var re = pt.re!=null?pt.re:(pt.x!=null?pt.x:0);
    var im = pt.im!=null?pt.im:(pt.y!=null?pt.y:0);
    var px = sx(re), py = sy(im);
    var col = pt.color || FIG_SERIES[idx % FIG_SERIES.length];
    if(pt.vector !== false){
      svg += '<line x1="'+ox.toFixed(1)+'" y1="'+oy.toFixed(1)+'" x2="'+px.toFixed(1)+'" y2="'+py.toFixed(1)+'" stroke="'+col+'" stroke-width="2"/>';
      if(pt.arcLabel){
        var ang = Math.atan2(oy - py, px - ox);
        var ar = 22;
        var ax1 = ox + ar, ay1 = oy;
        var ax2 = ox + ar * Math.cos(ang), ay2 = oy - ar * Math.sin(ang);
        var sweep = ang >= 0 ? 0 : 1;
        svg += '<path d="M'+ax1.toFixed(1)+','+ay1.toFixed(1)+' A'+ar+','+ar+' 0 0,'+sweep+' '+ax2.toFixed(1)+','+ay2.toFixed(1)+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
        var midA = ang / 2;
        svg += '<text x="'+(ox+(ar+11)*Math.cos(midA)).toFixed(1)+'" y="'+(oy-(ar+11)*Math.sin(midA)+3).toFixed(1)+'" font-size="9" font-weight="600" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(pt.arcLabel)+'</text>';
      }
    }
    svg += '<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="4" fill="'+col+'" stroke="'+FIG_BG+'" stroke-width="1.2" data-inspect="'+esc((pt.label||'z')+' = '+re+(im>=0?' + '+im+'i':' - '+Math.abs(im)+'i'))+'"/>';
    if(pt.label){
      var anc = px >= ox ? 'start' : 'end';
      var dx = px >= ox ? 8 : -8;
      var dy = py <= oy ? -7 : 13;
      var lx = _clampLabelX(px + dx, pt.label, 9.5, anc, 6, W - 6);
      var ly = Math.max(mt + 10, Math.min(H - 6, py + dy));
      svg += '<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="9.5" font-weight="bold" fill="'+FIG_INK+'" text-anchor="'+anc+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="3" stroke-linejoin="round">'+esc(pt.label)+'</text>';
    }
  });

  if(s.title){
    svg += _svgTitle(s.title, W, 16, 10, FIG_INK);
  }
  svg += '</svg>';
  return svg;
}
window.renderArgand = renderArgand;

/* ── IB Weighted Network / Graph Theory / Markov Digraph Renderer ─────── */
function renderNetworkGraph(s){
  var W=350, H=250;
  var a11y = _figA11yLabel(s);
  var svg = '<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg += '<title>'+esc(a11y)+'</title>';
  svg += '<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  var nodes = s.nodes || [];
  var nodeMap = {};
  nodes.forEach(function(n){ nodeMap[n.id || n.label] = n; });

  // Edges
  var edges = s.edges || [];
  var netEdgeBoxes = [];
  edges.forEach(function(e){
    var u = nodeMap[e.from], v = nodeMap[e.to];
    if(!u || !v) return;
    var isHi = !!e.highlight;
    var strokeCol = isHi ? FIG_AMBER : (e.color || FIG_INDIGO2);
    var sw = isHi ? 2.8 : 1.7;
    if(u === v){
      var lx = u.x, ly = u.y - 24;
      svg += '<circle cx="'+lx.toFixed(1)+'" cy="'+ly.toFixed(1)+'" r="13" fill="none" stroke="'+strokeCol+'" stroke-width="'+sw+'"/>';
      if(e.weight != null || e.label){
        svg += '<text x="'+lx.toFixed(1)+'" y="'+(ly-16).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(e.label!=null?e.label:e.weight)+'</text>';
      }
      return;
    }
    var dx = v.x - u.x, dy = v.y - u.y, len = Math.hypot(dx, dy) || 1;
    var nx = -dy / len, ny = dx / len;
    var curve = e.curved ? (typeof e.curved === 'number' ? e.curved : 22) : 0;
    var rNode = 15;
    var sx1 = u.x + (dx/len)*rNode, sy1 = u.y + (dy/len)*rNode;
    var sx2 = v.x - (dx/len)*rNode, sy2 = v.y - (dy/len)*rNode;
    var mx, my;
    if(curve !== 0){
      var cx = (u.x + v.x)/2 + nx * curve, cy = (u.y + v.y)/2 + ny * curve;
      svg += '<path d="M'+sx1.toFixed(1)+','+sy1.toFixed(1)+' Q'+cx.toFixed(1)+','+cy.toFixed(1)+' '+sx2.toFixed(1)+','+sy2.toFixed(1)+'" fill="none" stroke="'+strokeCol+'" stroke-width="'+sw+'"'+(e.dashed?' stroke-dasharray="5,3"':'')+'/>';
      mx = (u.x + v.x)/2 + nx * (curve * 0.6);
      my = (u.y + v.y)/2 + ny * (curve * 0.6);
    } else {
      svg += '<line x1="'+sx1.toFixed(1)+'" y1="'+sy1.toFixed(1)+'" x2="'+sx2.toFixed(1)+'" y2="'+sy2.toFixed(1)+'" stroke="'+strokeCol+'" stroke-width="'+sw+'"'+(e.dashed?' stroke-dasharray="5,3"':'')+'/>';
      mx = (u.x + v.x)/2 + nx * 10;
      my = (u.y + v.y)/2 + ny * 10;
    }
    if(e.directed || s.directed){
      var ang = Math.atan2(sy2 - (curve ? ((u.y+v.y)/2 + ny*curve) : sy1), sx2 - (curve ? ((u.x+v.x)/2 + nx*curve) : sx1));
      var ah = 7;
      var p1x = sx2 - ah * Math.cos(ang - 0.42), p1y = sy2 - ah * Math.sin(ang - 0.42);
      var p2x = sx2 - ah * Math.cos(ang + 0.42), p2y = sy2 - ah * Math.sin(ang + 0.42);
      svg += '<polygon points="'+sx2.toFixed(1)+','+sy2.toFixed(1)+' '+p1x.toFixed(1)+','+p1y.toFixed(1)+' '+p2x.toFixed(1)+','+p2y.toFixed(1)+'" fill="'+strokeCol+'"/>';
    }
    if(e.weight != null || e.label){
      var wTxt = String(e.label != null ? e.label : e.weight);
      var pillW = Math.max(18, wTxt.length * 6.2 + 8);
      netEdgeBoxes.forEach(function(eb){
        if(Math.abs(eb.x - mx) < pillW && Math.abs(eb.y - my) < 14){
          my += 16;
        }
      });
      netEdgeBoxes.push({ x: mx, y: my });
      svg += '<rect x="'+(mx - pillW/2).toFixed(1)+'" y="'+(my - 7.5).toFixed(1)+'" width="'+pillW.toFixed(1)+'" height="15" rx="4" fill="'+FIG_BG+'" stroke="'+(isHi?FIG_AMBER:FIG_BORDER)+'" stroke-width="0.9"/>';
      svg += '<text x="'+mx.toFixed(1)+'" y="'+(my + 3.2).toFixed(1)+'" font-size="9.5" font-weight="bold" fill="'+(isHi?FIG_AMBER_TEXT:FIG_INK)+'" text-anchor="middle">'+esc(wTxt)+'</text>';
    }
  });

  // Nodes
  nodes.forEach(function(n){
    var id = n.label || n.id || '';
    var isHi = !!n.highlight;
    var fillCol = isHi ? FIG_AMBER_FILL : FIG_INDIGO_FILL2;
    var strokeCol = isHi ? FIG_AMBER : FIG_INDIGO;
    svg += '<circle cx="'+n.x.toFixed(1)+'" cy="'+n.y.toFixed(1)+'" r="15" fill="'+fillCol+'" stroke="'+strokeCol+'" stroke-width="2" data-inspect="Vertex '+esc(id)+'"/>';
    svg += '<text x="'+n.x.toFixed(1)+'" y="'+(n.y+4).toFixed(1)+'" font-size="11" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(id)+'</text>';
  });

  if(s.title){
    svg += _svgTitle(s.title, W, 16, 10.5, FIG_INK);
  }
  svg += '</svg>';
  return svg;
}
window.renderNetworkGraph = renderNetworkGraph;

/* ── Qiyas / Qudrat Shaded Region Geometry Renderer (مساحة الجزء المظلل) ─────── */
function renderShadedRegion(s){
  var W=340, H=245;
  var a11y = s.title || 'Shaded region geometric figure';
  var svg = '<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg += '<title>'+esc(a11y)+'</title>';
  svg += '<defs><pattern id="qudHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="6" stroke="'+FIG_AMBER+'" stroke-width="1.6" opacity="0.55"/></pattern></defs>';
  svg += '<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  var cx = W/2, cy = H/2 + 6;
  var variant = s.variant || s.subtype || 'square_inscribed_circle';
  if(variant === 'circle_in_square') variant = 'square_inscribed_circle';
  if(variant === 'square_in_circle') variant = 'circle_inscribed_square';
  var rInput = s.r != null ? s.r : s.radius;
  var sideVal = s.side || (rInput ? rInput * 2 : 10);
  var rVal = rInput || (sideVal / 2);
  var S = 148, R = S / 2;

  if(variant === 'square_inscribed_circle'){
    svg += '<rect x="'+(cx-R)+'" y="'+(cy-R)+'" width="'+S+'" height="'+S+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    svg += '<rect x="'+(cx-R)+'" y="'+(cy-R)+'" width="'+S+'" height="'+S+'" fill="url(#qudHatch)"/>';
    svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="'+FIG_BG+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
    svg += '<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+R)+'" y2="'+cy+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.6" stroke-dasharray="4,3"/>';
    svg += '<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INDIGO+'"/>';
    svg += '<text x="'+(cx+R/2)+'" y="'+(cy-6)+'" font-size="10" font-weight="bold" fill="'+FIG_INDIGO+'" text-anchor="middle">'+esc(s.rLabel || ('r = '+rVal))+'</text>';
    svg += '<text x="'+cx+'" y="'+(cy+R+16)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(s.sideLabel || ('s = '+sideVal))+'</text>';
  } else if(variant === 'circle_inscribed_square'){
    var halfSq = R / Math.SQRT2;
    svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
    svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+R+'" fill="url(#qudHatch)"/>';
    svg += '<rect x="'+(cx-halfSq).toFixed(1)+'" y="'+(cy-halfSq).toFixed(1)+'" width="'+(2*halfSq).toFixed(1)+'" height="'+(2*halfSq).toFixed(1)+'" fill="'+FIG_BG+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    svg += '<line x1="'+(cx-halfSq).toFixed(1)+'" y1="'+(cy+halfSq).toFixed(1)+'" x2="'+(cx+halfSq).toFixed(1)+'" y2="'+(cy-halfSq).toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.5" stroke-dasharray="4,3"/>';
    svg += '<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INDIGO+'"/>';
    svg += '<text x="'+(cx+12)+'" y="'+(cy+12)+'" font-size="10" font-weight="bold" fill="'+FIG_INDIGO+'">'+esc(s.rLabel || ('d = '+(2*rVal)))+'</text>';
  } else if(variant === 'four_tangent_circles'){
    var rSmall = R / 2;
    svg += '<rect x="'+(cx-R)+'" y="'+(cy-R)+'" width="'+S+'" height="'+S+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    svg += '<rect x="'+(cx-R)+'" y="'+(cy-R)+'" width="'+S+'" height="'+S+'" fill="url(#qudHatch)"/>';
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(function(d){
      var ccx = cx + d[0]*rSmall, ccy = cy + d[1]*rSmall;
      svg += '<circle cx="'+ccx+'" cy="'+ccy+'" r="'+rSmall+'" fill="'+FIG_BG+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
      svg += '<circle cx="'+ccx+'" cy="'+ccy+'" r="2.2" fill="'+FIG_INDIGO+'"/>';
    });
    if(s.centerSquare){
      svg += '<rect x="'+(cx-rSmall)+'" y="'+(cy-rSmall)+'" width="'+R+'" height="'+R+'" fill="none" stroke="'+FIG_TEAL+'" stroke-width="1.6" stroke-dasharray="4,2"/>';
    }
    svg += '<text x="'+cx+'" y="'+(cy+R+16)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(s.sideLabel || ('s = '+sideVal+', r = '+(sideVal/4)))+'</text>';
  } else if(variant === 'semicircle_triangle'){
    var yBase = cy + 36, radS = 84;
    svg += '<path d="M'+(cx-radS)+','+yBase+' A'+radS+','+radS+' 0 0,1 '+(cx+radS)+','+yBase+' Z" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
    svg += '<path d="M'+(cx-radS)+','+yBase+' A'+radS+','+radS+' 0 0,1 '+(cx+radS)+','+yBase+' Z" fill="url(#qudHatch)"/>';
    var angC = (s.angleDeg || 53.13) * Math.PI / 180;
    var vxC = cx + radS * Math.cos(Math.PI - angC * 2) * 0.28;
    var vyC = yBase - Math.sqrt(Math.max(100, radS*radS - Math.pow(vxC - cx, 2)));
    svg += '<polygon points="'+(cx-radS)+','+yBase+' '+(cx+radS)+','+yBase+' '+vxC.toFixed(1)+','+vyC.toFixed(1)+'" fill="'+FIG_BG+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    svg += '<circle cx="'+cx+'" cy="'+yBase+'" r="3" fill="'+FIG_INDIGO+'"/>';
    svg += '<text x="'+(cx-radS-10)+'" y="'+(yBase+4)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'">A</text>';
    svg += '<text x="'+(cx+radS+8)+'" y="'+(yBase+4)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'">B</text>';
    svg += '<text x="'+vxC.toFixed(1)+'" y="'+(vyC-7).toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">C (90°)</text>';
    svg += '<text x="'+cx+'" y="'+(yBase+18)+'" font-size="10" font-weight="bold" fill="'+FIG_INDIGO+'" text-anchor="middle">'+esc(s.sideLabel || ('Diameter AB = '+sideVal))+'</text>';
  } else if(variant === 'triangle_in_rectangle'){
    var rw = 176, rh = 116;
    var rx0 = cx - rw/2, ry0 = cy - rh/2;
    var apexX = rx0 + rw * (s.apexRatio || 0.62);
    svg += '<rect x="'+rx0+'" y="'+ry0+'" width="'+rw+'" height="'+rh+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
    svg += '<polygon points="'+rx0+','+(ry0+rh)+' '+(rx0+rw)+','+(ry0+rh)+' '+apexX.toFixed(1)+','+ry0+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="2"/>';
    svg += '<polygon points="'+rx0+','+(ry0+rh)+' '+(rx0+rw)+','+(ry0+rh)+' '+apexX.toFixed(1)+','+ry0+'" fill="url(#qudHatch)"/>';
    svg += '<text x="'+cx+'" y="'+(ry0+rh+16)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+esc(s.wLabel || ('w = '+(s.wVal||12)))+'</text>';
    svg += '<text x="'+(rx0-8)+'" y="'+cy+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="end">'+esc(s.hLabel || ('h = '+(s.hVal||8)))+'</text>';
  } else {
    var rOut = 76, rIn = 42;
    svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+rOut+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
    svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+rOut+'" fill="url(#qudHatch)"/>';
    svg += '<circle cx="'+cx+'" cy="'+cy+'" r="'+rIn+'" fill="'+FIG_BG+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    svg += '<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+rOut)+'" y2="'+cy+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6"/>';
    svg += '<line x1="'+cx+'" y1="'+cy+'" x2="'+cx+'" y2="'+(cy-rIn)+'" stroke="'+FIG_TEAL+'" stroke-width="1.6"/>';
    svg += '<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
    svg += '<text x="'+(cx+rOut/2+8)+'" y="'+(cy+13)+'" font-size="9.5" font-weight="bold" fill="'+FIG_INDIGO+'">'+esc(s.rOutLabel || ('R = '+sideVal))+'</text>';
    svg += '<text x="'+(cx-18)+'" y="'+(cy-rIn/2)+'" font-size="9.5" font-weight="bold" fill="'+FIG_TEAL+'">'+esc(s.rInLabel || ('r = '+rVal))+'</text>';
  }

  if(s.title){
    svg += _svgTitle(s.title, W, 16, 10.5, FIG_INK);
  }
  svg += '</svg>';
  return svg;
}
window.renderShadedRegion = renderShadedRegion;

/* ── Tahsili Conic Section Renderer (القطوع المخروطية: مكافئ، ناقص، زائد) ──── */
function renderConicSection(s){
  var W=360, H=265, ml=38, mr=26, mt=s.title?32:22, mb=28;
  var pw=W-ml-mr, ph=H-mt-mb;
  var kind = s.conic || s.subtype || 'ellipse';
  var h = s.h || 0, k = s.k || 0;
  var a = s.a || 4, b = s.b || 3, p = s.p || s.c || 1.5;
  var maxReachX = Math.max(7, Math.ceil((Math.abs(h) + Math.max(a, Math.sqrt(a*a + b*b))) * 1.25));
  var maxReachY = Math.max(5, Math.ceil((Math.abs(k) + Math.max(b, Math.sqrt(a*a + b*b))) * 1.25));
  var xmin=s.xmin!=null?s.xmin:-maxReachX, xmax=s.xmax!=null?s.xmax:maxReachX;
  var ymin=s.ymin!=null?s.ymin:-maxReachY, ymax=s.ymax!=null?s.ymax:maxReachY;
  function sx(x){ return ml + (x - xmin)/((xmax - xmin)||1)*pw; }
  function sy(y){ return mt + ph - (y - ymin)/((ymax - ymin)||1)*ph; }
  var ox=sx(0), oy=sy(0);
  var a11y = s.title || 'Conic section coordinate graph';
  var svg = '<svg role="img" aria-label="'+esc(a11y)+'" viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg += '<title>'+esc(a11y)+'</title>';
  svg += '<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  var gStepX = (xmax - xmin) > 18 ? 2 : 1;
  var gStepY = (ymax - ymin) > 14 ? 2 : 1;
  for(var gx=Math.ceil(xmin/gStepX)*gStepX; gx<=Math.floor(xmax); gx+=gStepX){
    svg += '<line x1="'+sx(gx).toFixed(1)+'" y1="'+mt+'" x2="'+sx(gx).toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_GRID+'" stroke-width="0.6"/>';
  }
  for(var gy=Math.ceil(ymin/gStepY)*gStepY; gy<=Math.floor(ymax); gy+=gStepY){
    svg += '<line x1="'+ml+'" y1="'+sy(gy).toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+sy(gy).toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.6"/>';
  }
  svg += '<line x1="'+ml+'" y1="'+oy.toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+oy.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';
  svg += '<line x1="'+ox.toFixed(1)+'" y1="'+mt+'" x2="'+ox.toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';

  if(kind === 'ellipse'){
    var rx = Math.abs(sx(h + a) - sx(h));
    var ry = Math.abs(sy(k + b) - sy(k));
    var cEll = Math.sqrt(Math.abs(a*a - b*b));
    var horiz = a >= b;
    svg += '<ellipse cx="'+sx(h).toFixed(1)+'" cy="'+sy(k).toFixed(1)+'" rx="'+rx.toFixed(1)+'" ry="'+ry.toFixed(1)+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2.2"/>';
    var f1x = horiz ? h - cEll : h, f1y = horiz ? k : k - cEll;
    var f2x = horiz ? h + cEll : h, f2y = horiz ? k : k + cEll;
    svg += '<circle cx="'+sx(f1x).toFixed(1)+'" cy="'+sy(f1y).toFixed(1)+'" r="3.5" fill="'+FIG_AMBER+'"/>';
    svg += '<circle cx="'+sx(f2x).toFixed(1)+'" cy="'+sy(f2y).toFixed(1)+'" r="3.5" fill="'+FIG_AMBER+'"/>';
    svg += '<circle cx="'+sx(h).toFixed(1)+'" cy="'+sy(k).toFixed(1)+'" r="3" fill="'+FIG_INDIGO+'"/>';
    svg += '<text x="'+(horiz?sx(f2x):sx(f2x)+10).toFixed(1)+'" y="'+(horiz?sy(f2y)-7:sy(f2y)+3).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">F₂</text>';
    svg += '<text x="'+(horiz?sx(f1x):sx(f1x)+10).toFixed(1)+'" y="'+(horiz?sy(f1y)-7:sy(f1y)+3).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">F₁</text>';
    var abLbl = 'a=' + a + ', b=' + b;
    var abX = _clampLabelX(sx(h+a)+6, abLbl, 9, 'start', 6, W-6);
    svg += '<text x="'+abX.toFixed(1)+'" y="'+(sy(k)+14).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_INDIGO+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">'+esc(abLbl)+'</text>';
  } else if(kind === 'hyperbola'){
    var cHyp = Math.sqrt(a*a + b*b);
    var rxH = Math.abs(sx(h+a)-sx(h)), ryH = Math.abs(sy(k+b)-sy(k));
    svg += '<rect x="'+(sx(h)-rxH).toFixed(1)+'" y="'+(sy(k)-ryH).toFixed(1)+'" width="'+(2*rxH).toFixed(1)+'" height="'+(2*ryH).toFixed(1)+'" fill="none" stroke="'+FIG_MUTED+'" stroke-width="1" stroke-dasharray="3,3"/>';
    svg += '<line x1="'+sx(xmin).toFixed(1)+'" y1="'+sy(k + (b/a)*(xmin-h)).toFixed(1)+'" x2="'+sx(xmax).toFixed(1)+'" y2="'+sy(k + (b/a)*(xmax-h)).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.2" stroke-dasharray="5,3"/>';
    svg += '<line x1="'+sx(xmin).toFixed(1)+'" y1="'+sy(k - (b/a)*(xmin-h)).toFixed(1)+'" x2="'+sx(xmax).toFixed(1)+'" y2="'+sy(k - (b/a)*(xmax-h)).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.2" stroke-dasharray="5,3"/>';
    var pathR='', pathL='';
    for(var t=-1.35; t<=1.35; t+=0.09){
      var coshT = (Math.exp(t)+Math.exp(-t))/2, sinhT = (Math.exp(t)-Math.exp(-t))/2;
      var xR = h + a*coshT, yR = k + b*sinhT;
      var xL = h - a*coshT, yL = k + b*sinhT;
      pathR += (pathR===''?'M':'L')+sx(xR).toFixed(1)+','+sy(yR).toFixed(1)+' ';
      pathL += (pathL===''?'M':'L')+sx(xL).toFixed(1)+','+sy(yL).toFixed(1)+' ';
    }
    svg += '<path d="'+pathR+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="2.2"/>';
    svg += '<path d="'+pathL+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="2.2"/>';
    svg += '<circle cx="'+sx(h+cHyp).toFixed(1)+'" cy="'+sy(k).toFixed(1)+'" r="3.5" fill="'+FIG_AMBER+'"/>';
    svg += '<circle cx="'+sx(h-cHyp).toFixed(1)+'" cy="'+sy(k).toFixed(1)+'" r="3.5" fill="'+FIG_AMBER+'"/>';
    svg += '<text x="'+sx(h+cHyp).toFixed(1)+'" y="'+(sy(k)-8).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">F₂</text>';
    svg += '<text x="'+sx(h-cHyp).toFixed(1)+'" y="'+(sy(k)-8).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">F₁</text>';
  } else {
    var isVert = s.orientation !== 'horizontal';
    var pStr = '';
    if(isVert){
      for(var xv=xmin+0.5; xv<=xmax-0.5; xv+=0.2){
        var yv = k + (xv-h)*(xv-h)/(4*p);
        if(yv >= ymin-0.5 && yv <= ymax+0.5){
          pStr += (pStr===''?'M':'L')+sx(xv).toFixed(1)+','+sy(yv).toFixed(1)+' ';
        }
      }
      var dirY = sy(k - p);
      svg += '<line x1="'+ml+'" y1="'+dirY.toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+dirY.toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.5" stroke-dasharray="5,3"/>';
      svg += '<text x="'+(ml+pw-6)+'" y="'+(dirY-5).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_TEAL+'" text-anchor="end" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">y = '+(k-p)+'</text>';
      svg += '<circle cx="'+sx(h).toFixed(1)+'" cy="'+sy(k+p).toFixed(1)+'" r="3.8" fill="'+FIG_AMBER+'"/>';
      svg += '<text x="'+(sx(h)+8).toFixed(1)+'" y="'+(sy(k+p)-5).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">F('+h+', '+(k+p)+')</text>';
    } else {
      for(var yv2=ymin+0.5; yv2<=ymax-0.5; yv2+=0.2){
        var xv2 = h + (yv2-k)*(yv2-k)/(4*p);
        if(xv2 >= xmin-0.5 && xv2 <= xmax+0.5){
          pStr += (pStr===''?'M':'L')+sx(xv2).toFixed(1)+','+sy(yv2).toFixed(1)+' ';
        }
      }
      var dirX = sx(h - p);
      svg += '<line x1="'+dirX.toFixed(1)+'" y1="'+mt+'" x2="'+dirX.toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_TEAL+'" stroke-width="1.5" stroke-dasharray="5,3"/>';
      svg += '<circle cx="'+sx(h+p).toFixed(1)+'" cy="'+sy(k).toFixed(1)+'" r="3.8" fill="'+FIG_AMBER+'"/>';
      svg += '<text x="'+(sx(h+p)+8).toFixed(1)+'" y="'+(sy(k)-6).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">F('+(h+p)+', '+k+')</text>';
    }
    svg += '<path d="'+pStr+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="2.2"/>';
    svg += '<circle cx="'+sx(h).toFixed(1)+'" cy="'+sy(k).toFixed(1)+'" r="3.5" fill="'+FIG_INDIGO+'"/>';
    svg += '<text x="'+(sx(h)-8).toFixed(1)+'" y="'+(sy(k)+14).toFixed(1)+'" font-size="9" font-weight="bold" fill="'+FIG_INDIGO+'" text-anchor="end" paint-order="stroke fill" stroke="'+FIG_BG+'" stroke-width="2.5">V('+h+', '+k+')</text>';
  }

  if(s.title){
    svg += _svgTitle(s.title, W, 16, 10.5, FIG_INK);
  }
  svg += '</svg>';
  return svg;
}
window.renderConicSection = renderConicSection;

/* ── Figure Data Inspection Engine (Pillar 2.2) ────────── */
function _initFigureInspection(){
  if(typeof document === 'undefined') return;

  function showBadge(target){
    if(document.body.classList.contains('exam-mode')) return;
    var cbtShell = document.querySelector('.cbt-shell');
    if(cbtShell && cbtShell.getAttribute('data-lock-inspect') === 'true') return;

    var text = target.getAttribute('data-inspect');
    if(!text) return;

    var container = target.closest('.mfig') || target.closest('.cq-figure') || target.closest('.fep-figure') || target.closest('.exam-fig') || target.closest('svg');
    if(!container) return;

    var badge = container.querySelector('.mfig-inspect-badge');
    if(!badge){
      badge = document.createElement('div');
      badge.className = 'mfig-inspect-badge';
      if(container.tagName && container.tagName.toLowerCase() === 'svg'){
        if(container.parentElement){
          container.parentElement.style.position = 'relative';
          container.parentElement.appendChild(badge);
        }
      } else {
        container.style.position = 'relative';
        container.appendChild(badge);
      }
    }
    badge.textContent = text;
    badge.classList.add('active');
  }

  function hideBadge(target){
    var container = target.closest('.mfig') || target.closest('.cq-figure') || target.closest('.fep-figure') || target.closest('.exam-fig') || (target.closest('svg') && target.closest('svg').parentElement);
    if(!container) return;
    var badge = container.querySelector('.mfig-inspect-badge');
    if(badge){
      badge.classList.remove('active');
    }
  }

  document.addEventListener('mouseover', function(e){
    var el = e.target && e.target.closest && e.target.closest('[data-inspect]');
    if(el) showBadge(el);
  });

  document.addEventListener('mouseout', function(e){
    var el = e.target && e.target.closest && e.target.closest('[data-inspect]');
    if(el) hideBadge(el);
  });

  document.addEventListener('touchstart', function(e){
    var el = e.target && e.target.closest && e.target.closest('[data-inspect]');
    if(el){
      showBadge(el);
      setTimeout(function(){ hideBadge(el); }, 2500);
    }
  }, { passive: true });
}

if(typeof document !== 'undefined'){
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', _initFigureInspection);
  } else {
    _initFigureInspection();
  }
}

window.initFigureInspection = _initFigureInspection;
})();

