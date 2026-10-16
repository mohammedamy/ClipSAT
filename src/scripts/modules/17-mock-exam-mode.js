(function(){
  "use strict";

  /* ═══════════════════════════════════════════════════════════════════
     CLIP-SAT COMPUTER-BASED TESTING (CBT) EXAM SIMULATOR
     Authentic testing environment for Digital SAT, Qiyas (GAT/SAAT),
     ACT, EST, Cambridge IGCSE / A-Level, AP, and IB Mathematics.
     Features: Single-question flow, Question Navigator Palette,
     Mark for Review, Pre-Submission Review Screen, Scaled Score Engine,
     and Deep Domain Diagnostics.
     ═══════════════════════════════════════════════════════════════════ */

  var _tmr = null, _secs = 0, _totalSecs = 0;
  var _trackId = '', _pidx = 0;
  var _paper = null;
  var _pool = [];
  var _curIdx = 0;
  var _answers = {}; // qIndex -> string or choice index
  var _flags = {}; // qIndex -> bool
  var _viewMode = 'cbt'; // 'cbt' (single question) or 'all' (stacked review)
  var _isSubmitted = false;

  var PAPERS = {
    qudrat: [
      { name: 'القسم الكمي — اختبار محوسب كامل (Qudrat CBT)', minutes: 25, qCount: 24, calc: false, domains: ['arithmetic', 'algebra', 'geometry', 'ratio', 'percent', 'speed', 'comparison'] },
      { name: 'قسم المقارنات الرياضية (Quantitative Comparisons)', minutes: 20, qCount: 20, calc: false, domains: ['comparison', 'arithmetic', 'geometry'] }
    ],
    tahsili: [
      { name: 'رياضيات التحصيلي — اختبار محوسب تجريبي (SAAT Math CBT)', minutes: 25, qCount: 22, calc: false, domains: ['functions', 'algebra', 'trig', 'vectors', 'matrices', 'calculus', 'probability'] }
    ],
    sat: [
      { name: 'Digital SAT® Math — Module 1 (Standard Stage)', minutes: 35, qCount: 22, calc: true, domains: ['algebra', 'advanced', 'problem-solving', 'geometry', 'trigonometry'] },
      { name: 'Digital SAT® Math — Module 2 (Adaptive Stage)', minutes: 35, qCount: 22, calc: true, domains: ['algebra', 'advanced', 'problem-solving', 'geometry', 'trigonometry'] }
    ],
    igcse: [
      { name: 'Cambridge IGCSE® 0580 — Paper 2 (Non-Calculator)', minutes: 90, qCount: 20, calc: false, domains: ['number', 'algebra', 'geometry', 'trigonometry', 'probability', 'statistics'] },
      { name: 'Cambridge IGCSE® 0580 — Paper 4 (Calculator Allowed)', minutes: 120, qCount: 24, calc: true, domains: ['number', 'algebra', 'mensuration', 'geometry', 'trigonometry', 'statistics'] }
    ],
    act: [
      { name: 'ACT® Mathematics — Enhanced 4-Choice CBT', minutes: 50, qCount: 45, calc: true, domains: ['pre-algebra', 'elementary-algebra', 'intermediate-algebra', 'coordinate-geometry', 'plane-geometry', 'trigonometry'] }
    ],
    est: [
      { name: 'EST I — Mathematics Section (Egyptian Scholastic Test)', minutes: 55, qCount: 38, calc: true, domains: ['algebra', 'functions', 'geometry', 'statistics'] }
    ],
    est2: [
      { name: 'EST II — Mathematics Level 1', minutes: 60, qCount: 50, calc: true, domains: ['algebra', 'geometry', 'trigonometry', 'statistics'] }
    ],
    est2l2: [
      { name: 'EST II — Mathematics Level 2 (Advanced)', minutes: 60, qCount: 50, calc: true, domains: ['algebra', 'complex', 'vectors', 'matrices', 'calculus', 'trigonometry'] }
    ],
    apab: [
      { name: 'AP® Calculus AB — Section I Part A (Non-Calculator)', minutes: 60, qCount: 28, calc: false, domains: ['limits', 'derivatives', 'integrals', 'applications'] },
      { name: 'AP® Calculus AB — Section I Part B (Graphing Calculator)', minutes: 40, qCount: 14, calc: true, domains: ['derivatives', 'integrals', 'applications'] }
    ],
    apbc: [
      { name: 'AP® Calculus BC — Section I Part A (Non-Calculator)', minutes: 60, qCount: 28, calc: false, domains: ['derivatives', 'integrals', 'series', 'parametrics', 'polars'] },
      { name: 'AP® Calculus BC — Section I Part B (Graphing Calculator)', minutes: 40, qCount: 14, calc: true, domains: ['derivatives', 'integrals', 'series', 'vector-calculus'] }
    ],
    appc: [
      { name: 'AP® Precalculus — Section I Part A (Non-Calculator)', minutes: 65, qCount: 28, calc: false, domains: ['polynomials', 'rationals', 'exponential', 'logarithmic', 'trigonometry'] },
      { name: 'AP® Precalculus — Section I Part B (Graphing Calculator)', minutes: 40, qCount: 12, calc: true, domains: ['trigonometry', 'parameters', 'matrices'] }
    ],
    apstats: [
      { name: 'AP® Statistics — Section I Multiple Choice', minutes: 90, qCount: 40, calc: true, domains: ['exploring-data', 'sampling-experimentation', 'probability', 'inference'] }
    ],
    aslevel: [
      { name: 'Paper 1 — Pure Maths 1 (Cambridge 9709)', minutes: 105, qCount: 12, calc: true, domains: ['pure', 'algebra', 'quadratic', 'trigonometry', 'sequence', 'series', 'differentiation', 'integration'] },
      { name: 'Paper 4 — Mechanics 1 (Cambridge 9709)', minutes: 75, qCount: 10, calc: true, domains: ['mechanic', 'forces', 'newton', 'energy', 'kinematics', 'work', 'power'] },
      { name: 'Paper 5 — Statistics 1 (Cambridge 9709)', minutes: 75, qCount: 10, calc: true, domains: ['statistic', 'normal', 'binomial', 'permutation', 'combination', 'probability'] }
    ],
    a2level: [
      { name: 'Paper 3 — Pure Maths 3 (Cambridge 9709)', minutes: 110, qCount: 12, calc: true, domains: ['pure', 'complex', 'vector', 'differential equation', 'integration', 'series', 'numerical'] },
      { name: 'Paper 6 — Statistics 2 (Cambridge 9709)', minutes: 75, qCount: 10, calc: true, domains: ['poisson', 'continuous random', 'sampling', 'hypothesis', 'estimation'] }
    ],
    ibsl: [
      { name: 'IB Math SL — Paper 1 (Non-Calculator)', minutes: 90, qCount: 12, calc: false, domains: ['algebra', 'functions', 'trigonometry', 'calculus', 'statistics'] },
      { name: 'IB Math SL — Paper 2 (GDC Required)', minutes: 90, qCount: 12, calc: true, domains: ['functions', 'trigonometry', 'calculus', 'statistics', 'vectors'] }
    ],
    ibhl: [
      { name: 'IB Math HL — Paper 1 (Non-Calculator)', minutes: 120, qCount: 14, calc: false, domains: ['algebra', 'functions', 'trigonometry', 'vectors', 'calculus'] },
      { name: 'IB Math HL — Paper 2 (GDC Required)', minutes: 120, qCount: 14, calc: true, domains: ['functions', 'complex', 'vectors', 'calculus', 'statistics'] }
    ]
  };

  function _ensureBank(viewId){
    if(window.fullExamBank && window.fullExamBank[viewId] && window.fullExamBank[viewId].pool){
      return Promise.resolve(window.fullExamBank[viewId]);
    }
    if(window.CS_loadTrackBank){
      return window.CS_loadTrackBank(viewId);
    }
    return fetch('/bank-data/' + viewId + '.json')
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(d){
        if(d){
          window.fullExamBank = window.fullExamBank || {};
          window.fullExamBank[viewId] = d;
        }
        return d;
      })
      .catch(function(){ return null; });
  }

  function _renderQFig(q){
    var f = q.figure || q.fig || q.table;
    if(!f) return '';
    if(typeof f === 'string') return f;
    if(f.type === 'table' || f.headers || f.rows){
      var hdrs = (f.headers||[]).map(function(th){
        return '<th>' + (typeof window._autoMath === 'function' ? window._autoMath(th != null ? String(th) : '') : th) + '</th>';
      }).join('');
      var rws = (f.rows || f.data || []).map(function(r){
        return '<tr>' + (Array.isArray(r) ? r.map(function(c){
          return '<td>' + (typeof window._autoMath === 'function' ? window._autoMath(c != null ? String(c) : '') : c) + '</td>';
        }).join('') : '<td>' + String(r) + '</td>') + '</tr>';
      }).join('');
      return '<div class="table-wrap"><table class="exam-table">' + (hdrs ? '<thead><tr>' + hdrs + '</tr></thead>' : '') + '<tbody>' + rws + '</tbody></table></div>';
    }
    if(window._renderFig) return window._renderFig(f);
    if(window.renderMathFigure) return window.renderMathFigure(f);
    return '';
  }

  function _isQuantComp(q){
    if(!q) return false;
    if(q.domain === 'Quantitative Comparisons') return true;
    var t = (q.text || q.q || '').trim();
    return (
      t.indexOf('قارن') !== -1 ||
      t.indexOf('Compare') !== -1 ||
      (t.indexOf('العمود A') !== -1 && t.indexOf('العمود B') !== -1) ||
      (t.indexOf('العمود أ') !== -1 && t.indexOf('العمود ب') !== -1) ||
      (t.indexOf('Quantity A') !== -1 && t.indexOf('Quantity B') !== -1) ||
      (t.indexOf('القيمة الأولى') !== -1 && t.indexOf('القيمة الثانية') !== -1) ||
      (q.val1 && q.val2)
    );
  }

  function _parseCompBoxes(q){
    var t = (q.text || q.q || '').trim();
    var val1 = q.val1 || '', val2 = q.val2 || '', context = q.context || '';

    if(!val1 && !val2){
      var clean = t.replace(/<strong>قارن\s*\/?\s*Compare:?<\/strong>/i, '').trim();
      var emMatch = clean.match(/<em>([\s\S]*?)<\/em>/i);
      var arPart = clean.replace(/<em>[\s\S]*?<\/em>/i, '').trim();
      var enPart = emMatch ? emMatch[1].trim() : '';

      var colAMatch = arPart.match(/(?:العمود\s*[Aأ]|القيمة\s*الأولى|Quantity\s*A)\s*[:：\-]?\s*([^\n\r<]+)/i);
      var colBMatch = arPart.match(/(?:العمود\s*[Bب]|القيمة\s*الثانية|Quantity\s*B)\s*[:：\-]?\s*([^\n\r<]+)/i);

      var splitColA = arPart.split(/(?:العمود\s*[Aأ]|القيمة\s*الأولى|Quantity\s*A)\s*[:：\-]?/i);
      if(splitColA.length > 1){
        var rawCtx = splitColA[0].replace(/<br\s*\/?>/gi, ' ').trim();
        if(rawCtx){
          context = rawCtx;
        }
      }

      if(colAMatch) val1 = colAMatch[1].trim();
      if(colBMatch) val2 = colBMatch[1].trim();

      if(enPart){
        var enColAMatch = enPart.match(/Quantity\s*A\s*[:：\-]?\s*([^\n\r<]+)/i);
        var enColBMatch = enPart.match(/Quantity\s*B\s*[:：\-]?\s*([^\n\r<]+)/i);
        var enSplit = enPart.split(/Quantity\s*A\s*[:：\-]?/i);
        var enCtx = (enSplit.length > 1) ? enSplit[0].replace(/<br\s*\/?>/gi, ' ').trim() : '';

        if(enCtx && context && context !== enCtx){
          context = context + ' / ' + enCtx;
        } else if(!context && enCtx){
          context = enCtx;
        }

        if(enColAMatch && enColAMatch[1].trim() !== val1){
          val1 = val1 + ' <span style="color:var(--muted,#64748b);font-size:.85em">(' + enColAMatch[1].trim() + ')</span>';
        }
        if(enColBMatch && enColBMatch[1].trim() !== val2){
          val2 = val2 + ' <span style="color:var(--muted,#64748b);font-size:.85em">(' + enColBMatch[1].trim() + ')</span>';
        }
      }
    }
    return { context: context, val1: val1, val2: val2 };
  }

  function _isQuestionAnswered(idx){
    var ans = _answers[idx];
    return ans !== undefined && ans !== null && String(ans).trim() !== '';
  }

  function _goToQuestion(idx){
    if(idx < 0 || idx >= _pool.length) return;
    _curIdx = idx;

    var body = document.getElementById('mock-exam-body');
    if(!body) return;

    var qs = body.querySelectorAll('.mock-q');
    qs.forEach(function(el, i){
      if(_viewMode === 'all'){
        el.classList.remove('cbt-hidden');
      } else {
        if(i === idx) el.classList.remove('cbt-hidden');
        else el.classList.add('cbt-hidden');
      }
    });

    _updateHeaderTools();
    _updateFooterNav();
    _typesetMath(body);

    body.scrollTop = 0;
  }

  function _toggleFlag(){
    _flags[_curIdx] = !_flags[_curIdx];
    _updateHeaderTools();
    _updateFooterNav();
  }

  function _toggleViewMode(){
    _viewMode = (_viewMode === 'cbt' ? 'all' : 'cbt');
    _goToQuestion(_curIdx);
  }

  function _toggleFullscreen(){
    var overlay = document.getElementById('mock-exam-overlay');
    if(!document.fullscreenElement){
      if(overlay && overlay.requestFullscreen) overlay.requestFullscreen();
    } else {
      if(document.exitFullscreen) document.exitFullscreen();
    }
  }

  function _updateHeaderTools(){
    var flagBtn = document.getElementById('cbt-flag-btn');
    if(flagBtn){
      var isFlagged = !!_flags[_curIdx];
      flagBtn.classList.toggle('flagged', isFlagged);
      flagBtn.innerHTML = isFlagged ? '🚩 Flagged' : '🏳️ Flag for Review';
      flagBtn.style.display = _isSubmitted ? 'none' : 'inline-flex';
    }
  }

  function _updateFooterNav(){
    var footer = document.getElementById('mock-exam-footer');
    if(!footer || _isSubmitted) return;

    var isLast = (_curIdx === _pool.length - 1);
    var isFirst = (_curIdx === 0);

    var answeredCount = 0;
    for(var i = 0; i < _pool.length; i++){
      if(_isQuestionAnswered(i)) answeredCount++;
    }

    var html = '<div class="mock-cbt-nav">'
      + '<button type="button" class="cbt-nav-btn" onclick="window.cbtPrevQuestion()" ' + (isFirst ? 'disabled' : '') + '>← Previous</button>'
      + '<div style="display:flex;align-items:center;gap:8px">'
      + '  <button type="button" class="cbt-q-pill" onclick="window.toggleCBTPalette()">'
      + '    <span>▤ Question ' + (_curIdx + 1) + ' of ' + _pool.length + '</span>'
      + '    <span style="font-size:.72rem;background:rgba(0,0,0,.08);padding:2px 7px;border-radius:10px">' + answeredCount + '/' + _pool.length + '</span>'
      + '  </button>'
      + '  <button type="button" class="cbt-nav-btn" style="padding:7px 12px;font-size:.78rem" onclick="window.cbtToggleViewMode()">' + (_viewMode === 'cbt' ? '📄 View All' : '🎯 Single Q') + '</button>'
      + '</div>';

    if(isLast){
      html += '<button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.cbtShowReviewScreen()">Review & Finish →</button>';
    } else {
      html += '<button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.cbtNextQuestion()">Next →</button>';
    }
    html += '</div>';

    footer.innerHTML = html;
  }

  window.cbtPrevQuestion = function(){
    if(_curIdx > 0) _goToQuestion(_curIdx - 1);
  };

  window.cbtNextQuestion = function(){
    if(_curIdx < _pool.length - 1) _goToQuestion(_curIdx + 1);
    else window.cbtShowReviewScreen();
  };

  window.cbtToggleViewMode = function(){
    _toggleViewMode();
  };

  window.toggleCBTPalette = function(){
    var modal = document.getElementById('cbt-palette-modal');
    if(!modal) return;
    if(modal.classList.contains('show')){
      modal.classList.remove('show');
    } else {
      _renderPalette(modal);
      modal.classList.add('show');
    }
  };

  window.closeCBTPalette = function(){
    var modal = document.getElementById('cbt-palette-modal');
    if(modal) modal.classList.remove('show');
  };

  function _renderPalette(container){
    var answeredCount = 0;
    var flaggedCount = 0;
    var gridHtml = '';

    for(var i = 0; i < _pool.length; i++){
      var ans = _isQuestionAnswered(i);
      var flg = !!_flags[i];
      var act = (i === _curIdx);
      if(ans) answeredCount++;
      if(flg) flaggedCount++;

      var cls = 'cbt-pal-item' + (ans ? ' answered' : '') + (flg ? ' flagged' : '') + (act ? ' active' : '');
      gridHtml += '<button type="button" class="' + cls + '" onclick="window.cbtJumpQuestion(' + i + ')">' + (i + 1) + '</button>';
    }

    container.innerHTML = [
      '<div class="cbt-palette-card">',
        '<div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border,#cbd5e1);padding-bottom:12px;margin-bottom:14px">',
          '<h4 style="margin:0;font-size:1.1rem;font-weight:700">Question Navigator Palette</h4>',
          '<button type="button" class="mock-exit-btn" onclick="window.closeCBTPalette()" style="padding:2px 8px;font-size:1.2rem">&times;</button>',
        '</div>',
        '<div style="display:flex;gap:12px;font-size:.78rem;color:var(--muted,#64748b);margin-bottom:14px;flex-wrap:wrap">',
          '<span style="display:flex;align-items:center;gap:5px"><span style="width:12px;height:12px;border-radius:3px;background:#dbeafe;border:1.5px solid #3b82f6;display:inline-block"></span> Answered (' + answeredCount + ')</span>',
          '<span style="display:flex;align-items:center;gap:5px"><span style="width:12px;height:12px;border-radius:3px;background:#fff;border:1.5px solid #cbd5e1;display:inline-block"></span> Unanswered (' + (_pool.length - answeredCount) + ')</span>',
          '<span style="display:flex;align-items:center;gap:5px">🚩 Marked for Review (' + flaggedCount + ')</span>',
        '</div>',
        '<div class="cbt-palette-grid">' + gridHtml + '</div>',
        '<div style="margin-top:16px;display:flex;justify-content:space-between;gap:10px">',
          '<button type="button" class="cbt-nav-btn" onclick="window.cbtShowReviewScreen()">Review Summary Screen</button>',
          '<button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.closeCBTPalette()">Back to Current Question</button>',
        '</div>',
      '</div>'
    ].join('');
  }

  window.cbtJumpQuestion = function(idx){
    window.closeCBTPalette();
    _goToQuestion(idx);
  };

  window.cbtShowReviewScreen = function(){
    window.closeCBTPalette();
    var body = document.getElementById('mock-exam-body');
    if(!body) return;

    var answeredCount = 0;
    var flaggedCount = 0;
    var rowsHtml = '';

    for(var i = 0; i < _pool.length; i++){
      var q = _pool[i];
      var ans = _isQuestionAnswered(i);
      var flg = !!_flags[i];
      if(ans) answeredCount++;
      if(flg) flaggedCount++;

      var statusBadge = ans
        ? '<span style="background:#dcfce7;color:#15803d;padding:3px 8px;border-radius:4px;font-size:.75rem;font-weight:700">✓ Answered</span>'
        : '<span style="background:#fef3c7;color:#b45309;padding:3px 8px;border-radius:4px;font-size:.75rem;font-weight:700">⚠️ Unanswered</span>';

      var flagBadge = flg
        ? '<span style="background:#fef2f2;color:#b91c1c;padding:3px 8px;border-radius:4px;font-size:.75rem;font-weight:700">🚩 For Review</span>'
        : '';

      rowsHtml += '<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--border,#e2e8f0);background:var(--paper,#fff);justify-content:space-between">'
        + '<div style="display:flex;align-items:center;gap:12px">'
        + '  <span style="font-weight:800;font-size:.9rem;color:var(--indigo,#1e3e70);width:32px">#' + (i + 1) + '</span>'
        + '  <span style="font-size:.82rem;color:var(--muted,#64748b)">' + (q.domain || 'Mathematics') + '</span>'
        + '</div>'
        + '<div style="display:flex;align-items:center;gap:8px">'
        + statusBadge + flagBadge
        + '  <button type="button" class="cbt-nav-btn" style="padding:4px 10px;font-size:.76rem" onclick="window.cbtReturnToQuestion(' + i + ')">Go to Q →</button>'
        + '</div>'
        + '</div>';
    }

    var alertMsg = (answeredCount === _pool.length)
      ? '<div style="background:#f0fdf4;border:1px solid #86efac;color:#166534;padding:12px;border-radius:8px;margin-bottom:16px;font-size:.88rem;font-weight:600">Great job! You have answered all ' + _pool.length + ' questions. Ready to submit?</div>'
      : '<div style="background:#fffbeb;border:1px solid #fde68a;color:#92400e;padding:12px;border-radius:8px;margin-bottom:16px;font-size:.88rem;font-weight:600">⚠️ Notice: You still have <strong>' + (_pool.length - answeredCount) + ' unanswered question(s)</strong>. Are you sure you want to finish now?</div>';

    body.innerHTML = [
      '<div style="max-width:760px;margin:0 auto">',
        '<div style="background:var(--panel,#fff);border:1px solid var(--border,#cbd5e1);border-radius:12px;padding:24px;box-shadow:0 8px 24px rgba(0,0,0,.06)">',
          '<h3 style="margin-top:0;font-size:1.3rem;font-weight:800;color:var(--indigo,#132746)">Examination Section Review</h3>',
          '<p style="color:var(--muted,#64748b);font-size:.88rem;margin-bottom:16px">Check your answers and flagged items before submitting your paper.</p>',
          alertMsg,
          '<div style="border:1px solid var(--border,#cbd5e1);border-radius:8px;overflow:hidden;margin-bottom:20px;max-height:55vh;overflow-y:auto">' + rowsHtml + '</div>',
          '<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">',
            '<button type="button" class="cbt-nav-btn" onclick="window.cbtReturnToQuestion(' + _curIdx + ')">← Return to Questions</button>',
            '<button type="button" class="mock-submit-btn" style="padding:10px 24px;font-size:.95rem" onclick="submitMockExam()">Submit Final Examination ✓</button>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

    var footer = document.getElementById('mock-exam-footer');
    if(footer) footer.innerHTML = '';
  };

  window.cbtReturnToQuestion = function(idx){
    // Re-render questions into body and jump
    _renderQuestionsDOM();
    _goToQuestion(idx || 0);
  };

  function _typesetMath(el){
    if(window.renderMathInElement){
      try {
        window.renderMathInElement(el, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\)', display: false},
            {left: '$', right: '$', display: false}
          ],
          throwOnError: false
        });
      } catch(e){}
    } else if(window.MathJax && MathJax.typesetPromise){
      MathJax.typesetPromise([el]).catch(function(){});
    }
  }

  function _renderQuestionsDOM(){
    var body = document.getElementById('mock-exam-body');
    if(!body) return;

    var h = '';
    var letters = ['A', 'B', 'C', 'D', 'E'];
    var _fmtBi = window.CSFormatBilingual || function(s){ return s; };

    _pool.forEach(function(q, i){
      var isComp = _isQuantComp(q);
      var figHtml = _renderQFig(q);
      var qText = (q.text || q.q || '').trim();
      var isFlagged = !!_flags[i];

      h += '<div class="mock-q' + (i === _curIdx ? '' : ' cbt-hidden') + '" id="mock-q-' + i + '">'
        + '<div class="mq-num" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'
        + '  <div>'
        + '    <span style="font-weight:800;font-size:.9rem;color:var(--indigo,#1e3e70)">Question ' + (i + 1) + ' of ' + _pool.length + '</span>'
        + '    <span style="font-size:.76rem;background:var(--paper-2,#f1f5f9);padding:2px 8px;border-radius:4px;color:var(--muted,#64748b);margin-left:8px">' + (q.domain || 'Math') + '</span>'
        + '  </div>'
        + '  <button type="button" class="cbt-flag-btn' + (isFlagged ? ' flagged' : '') + '" onclick="window.cbtToggleFlagCurrent(' + i + ')">' + (isFlagged ? '🚩 Flagged' : '🏳️ Flag') + '</button>'
        + '</div>';

      if(figHtml){
        h += '<div class="mock-q-figure" style="margin-bottom:14px">' + figHtml + '</div>';
      }

      if(isComp){
        var comp = _parseCompBoxes(q);
        h += '<div class="mq-text" dir="rtl" style="font-weight:700;margin-bottom:10px">قارن بين القيمتين التاليتين / Compare the two quantities:</div>';
        if(comp.context){
          h += '<div class="mock-qc-context" style="background:var(--paper-2,#f8fafc);border-left:3px solid var(--indigo,#1e3e70);border-right:3px solid var(--indigo,#1e3e70);padding:8px 12px;margin-bottom:12px;border-radius:4px;font-size:1rem;font-weight:600">' + _fmtBi(comp.context) + '</div>';
        }
        h += '<div class="mock-qc-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">'
          + '<div class="mock-qc-box" style="background:var(--paper-2,#f8fafc);border:1.5px solid var(--border,#cbd5e1);border-radius:8px;padding:12px;text-align:center">'
          + '<div style="font-size:.82rem;font-weight:700;color:var(--indigo,#1e3e70);margin-bottom:4px">القيمة الأولى (Column A)</div>'
          + '<div style="font-size:1.05rem;font-weight:600">' + _fmtBi(comp.val1 || qText) + '</div>'
          + '</div>'
          + '<div class="mock-qc-box" style="background:var(--paper-2,#f8fafc);border:1.5px solid var(--border,#cbd5e1);border-radius:8px;padding:12px;text-align:center">'
          + '<div style="font-size:.82rem;font-weight:700;color:var(--amber,#9e6515);margin-bottom:4px">القيمة الثانية (Column B)</div>'
          + '<div style="font-size:1.05rem;font-weight:600">' + _fmtBi(comp.val2 || '—') + '</div>'
          + '</div>'
          + '</div>';
      } else {
        h += '<div class="mq-text" style="font-size:1.02rem;line-height:1.65;margin-bottom:16px">' + _fmtBi(qText) + '</div>';
      }

      var isSPR = (q.type === 'spr' || q.isSPR);
      var currentAns = _answers[i];

      if(isSPR){
        h += '<div class="mock-spr-wrap" style="margin:14px 0">'
          + '<label style="display:block;font-size:.84rem;color:var(--muted,#64748b);margin-bottom:6px;font-weight:600">Student-Produced Response (Grid-in):</label>'
          + '<input type="text" class="mock-spr-input" name="mq' + i + '" value="' + (currentAns != null ? String(currentAns).replace(/"/g, '&quot;') : '') + '" placeholder="e.g. 7/4 or 1.75" oninput="window.cbtRecordAnswer(' + i + ', this.value)" style="width:180px;padding:10px 14px;border:1.5px solid var(--border,#cbd5e1);border-radius:8px;font-family:var(--mono,monospace);font-size:1.05rem">'
          + '</div>';
      } else if(q.choices && q.choices.length){
        h += '<div class="mock-choices-list" style="display:flex;flex-direction:column;gap:8px">';
        q.choices.forEach(function(c, ci){
          var letLabel = letters[ci] || String.fromCharCode(65 + ci);
          var chText = (typeof window.CSAutoMath === 'function' ? window.CSAutoMath(c) : String(c || ''));
          var isChecked = (currentAns === ci);
          h += '<label class="mock-choice-row" style="display:flex;align-items:flex-start;gap:10px;padding:11px 14px;border:1.5px solid ' + (isChecked ? '#3b82f6' : 'var(--border,#e2e8f0)') + ';border-radius:8px;cursor:pointer;background:' + (isChecked ? '#eff6ff' : 'var(--paper,#fff)') + ';transition:all .15s ease">'
            + '<input type="radio" name="mq' + i + '" value="' + ci + '" ' + (isChecked ? 'checked' : '') + ' onchange="window.cbtRecordAnswer(' + i + ', ' + ci + ')" style="margin-top:4px">'
            + '<span style="font-weight:800;color:var(--indigo,#1e3e70)">' + letLabel + '.</span>'
            + '<span style="flex:1">' + _fmtBi(chText) + '</span>'
            + '</label>';
        });
        h += '</div>';
      } else {
        h += '<div style="margin:14px 0"><textarea class="mock-frq-area" name="mq' + i + '" oninput="window.cbtRecordAnswer(' + i + ', this.value)" placeholder="Type your algebraic derivation, proof, or numerical answer here..." style="width:100%;min-height:100px;padding:10px 14px;border:1.5px solid var(--border,#cbd5e1);border-radius:8px;font-family:var(--sans);font-size:.92rem">' + (currentAns || '') + '</textarea></div>';
      }

      h += '</div>';
    });

    body.innerHTML = h;
    body.setAttribute('data-pool', JSON.stringify(_pool.map(function(q){
      return {
        answer: q.answer,
        ans: q.ans || q.answer,
        type: q.type || 'mcq',
        domain: q.domain || 'Math',
        sol: q.sol || q.expl || ''
      };
    })));
  }

  window.cbtRecordAnswer = function(qIdx, val){
    _answers[qIdx] = val;
    // Highlight choice row if radio
    var qEl = document.getElementById('mock-q-' + qIdx);
    if(qEl){
      var rows = qEl.querySelectorAll('.mock-choice-row');
      rows.forEach(function(r, ci){
        var checked = (val === ci);
        r.style.borderColor = checked ? '#3b82f6' : 'var(--border,#e2e8f0)';
        r.style.background = checked ? '#eff6ff' : 'var(--paper,#fff)';
      });
    }
    _updateFooterNav();
  };

  window.cbtToggleFlagCurrent = function(idx){
    _flags[idx] = !_flags[idx];
    var qEl = document.getElementById('mock-q-' + idx);
    if(qEl){
      var btn = qEl.querySelector('.cbt-flag-btn');
      if(btn){
        var flg = !!_flags[idx];
        btn.classList.toggle('flagged', flg);
        btn.innerHTML = flg ? '🚩 Flagged' : '🏳️ Flag';
      }
    }
    _updateHeaderTools();
    _updateFooterNav();
  };

  window.openMockExam = function(viewId, pidx){
    var trackId = String(viewId || '').toLowerCase().trim();
    if(!trackId && typeof window !== 'undefined'){
      if(window.location && window.location.pathname){
        var match = window.location.pathname.match(/\/([a-z0-9_-]+)/);
        if(match && match[1] && match[1] !== 'home') trackId = match[1];
      }
      if(!trackId && window.CLIPSAT_TRACK && window.CLIPSAT_TRACK !== 'home'){
        trackId = window.CLIPSAT_TRACK;
      }
    }
    if(!trackId) trackId = 'sat';

    pidx = parseInt(pidx, 10) || 0;
    _trackId = trackId;
    _pidx = pidx;
    _curIdx = 0;
    _answers = {};
    _flags = {};
    _viewMode = 'cbt';
    _isSubmitted = false;

    var overlay = document.getElementById('mock-exam-overlay');
    if(!overlay) return;

    var body = document.getElementById('mock-exam-body');
    if(body){
      body.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--muted)">'
        + '<div class="ai-spinner" style="margin:0 auto 16px"></div>'
        + '<p style="font-size:1.05rem;font-weight:600;margin-bottom:6px">Preparing Computer-Based Test (CBT) environment…</p>'
        + '<p style="font-size:.85rem;color:var(--muted,#64748b)">Loading question bank & rendering engine for ' + trackId.toUpperCase() + '</p>'
        + '</div>';
    }
    overlay.classList.add('show');
    document.body.classList.add('cbt-open');

    var loadFigures = (typeof window._ensureFigures === 'function')
      ? window._ensureFigures().catch(function(){})
      : Promise.resolve();

    Promise.all([_ensureBank(trackId), loadFigures]).then(function(res){
      var bank = res[0];
      if(!bank){
        if(body){
          body.innerHTML = '<div style="text-align:center;padding:60px 20px">'
            + '<div style="font-size:2.4rem;margin-bottom:12px">⚠️</div>'
            + '<h3 style="color:#dc2626;font-size:1.25rem;font-weight:700;margin-bottom:8px">Question Bank Unavailable</h3>'
            + '<p style="color:var(--muted,#64748b);font-size:.92rem;max-width:480px;margin:0 auto 20px">The question bank for "<strong>' + trackId.toUpperCase() + '</strong>" could not be loaded. Please check your network connection and try again.</p>'
            + '<div style="display:flex;gap:12px;justify-content:center">'
            + '  <button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.openMockExam(\'' + trackId + '\',' + pidx + ')">↻ Retry</button>'
            + '  <button type="button" class="cbt-nav-btn" onclick="window.closeMockExam()">✕ Close</button>'
            + '</div></div>';
        }
        return;
      }

      var papers = PAPERS[trackId] || [
        { name: trackId.toUpperCase() + ' Comprehensive CBT Practice', minutes: 45, qCount: 15, calc: true }
      ];
      var paper = papers[pidx] || papers[0];
      _paper = paper;
      var domainFilter = paper.domains || null;

      // Extract pool
      var allPool = [];
      if(Array.isArray(bank.pool) && bank.pool.length){
        allPool = bank.pool.slice();
      } else if(bank.easy || bank.medium || bank.hard){
        var cvt = function(a, diff){
          return (a || []).map(function(q){
            return Object.assign({}, q, {
              type: q.type || 'mcq',
              difficulty: diff,
              domain: q.domain || 'Mathematics',
              text: q.text || q.q || '',
              choices: q.choices || [],
              answer: q.answer,
              sol: q.sol || q.expl || '',
              figure: q.figure || q.fig
            });
          });
        };
        allPool = cvt(bank.easy, 'easy').concat(cvt(bank.medium, 'medium')).concat(cvt(bank.hard, 'hard'));
      }

      // Filter out meta trivia
      allPool = allPool.filter(function(q){
        var d = (q.domain || '').toLowerCase();
        return d.indexOf('format') === -1 && d.indexOf('strategy') === -1 && d.indexOf('overview') === -1;
      });

      // Filter by paper domains if specified
      var pool = allPool;
      if(domainFilter && domainFilter.length){
        var filtered = allPool.filter(function(q){
          var d = ((q.domain || '') + ' ' + (q.text || q.q || '')).toLowerCase();
          return domainFilter.some(function(f){ return d.indexOf(f.toLowerCase()) !== -1; });
        });
        if(filtered.length >= 8) pool = filtered;
      }

      var targetCount = Math.min(paper.qCount || 20, pool.length);

      // Guarantee healthy presence of diagrams and graphs
      var withFig = pool.filter(function(q){ return !!(q.figure || q.fig || q.table); });
      var noFig = pool.filter(function(q){ return !(q.figure || q.fig || q.table); });

      // Shuffle withFig and noFig
      for(var wf = withFig.length - 1; wf > 0; wf--){
        var rwf = Math.floor(Math.random() * (wf + 1));
        var twf = withFig[wf]; withFig[wf] = withFig[rwf]; withFig[rwf] = twf;
      }
      for(var nf = noFig.length - 1; nf > 0; nf--){
        var rnf = Math.floor(Math.random() * (nf + 1));
        var tnf = noFig[nf]; noFig[nf] = noFig[rnf]; noFig[rnf] = tnf;
      }

      var targetFigs = Math.min(withFig.length, Math.max(1, Math.ceil(targetCount * 0.30)));
      var picked = [];
      var tracker = window.ClipSATRedundancy ? window.ClipSATRedundancy.tracker() : null;
      var seenKeys = new Set();

      // Pick diagrams first
      for(var f = 0; f < withFig.length && picked.length < targetFigs; f++){
        var qf = withFig[f];
        var kf = (qf.text || qf.q || '').trim();
        if(!seenKeys.has(kf) && (!tracker || tracker.add(qf))){
          seenKeys.add(kf);
          picked.push(qf);
        }
      }

      // Fill remainder
      var remainder = noFig.concat(withFig.filter(function(x){ return picked.indexOf(x) === -1; }));
      for(var r = 0; r < remainder.length && picked.length < targetCount; r++){
        var qr = remainder[r];
        var kr = (qr.text || qr.q || '').trim();
        if(!seenKeys.has(kr) && (!tracker || tracker.add(qr))){
          seenKeys.add(kr);
          picked.push(qr);
        }
      }

      if(picked.length < targetCount && allPool.length > picked.length){
        for(var a = 0; a < allPool.length && picked.length < targetCount; a++){
          var qA = allPool[a];
          var kA = (qA.text || qA.q || '').trim();
          if(!seenKeys.has(kA) && (!tracker || tracker.add(qA))){
            seenKeys.add(kA);
            picked.push(qA);
          }
        }
      }

      // If still under targetCount due to strict idea template filtering, backfill from non-duplicate items
      if(picked.length < targetCount && pool.length > picked.length){
        for(var b = 0; b < pool.length && picked.length < targetCount; b++){
          var qB = pool[b];
          var kB = (qB.text || qB.q || '').trim();
          if(!seenKeys.has(kB)){
            seenKeys.add(kB);
            picked.push(qB);
          }
        }
      }

      // Distribute diagram questions naturally across the exam
      for(var s = picked.length - 1; s > 0; s--){
        var js = Math.floor(Math.random() * (s + 1));
        var ts = picked[s]; picked[s] = picked[js]; picked[js] = ts;
      }

      _pool = picked.map(function(q){ return window._shuffleQ ? window._shuffleQ(q) : q; });
      if(!_pool.length){
        if(body){
          body.innerHTML = '<div style="text-align:center;padding:60px 20px">'
            + '<h3 style="color:#b45309;font-size:1.2rem;margin-bottom:8px">No Questions Available</h3>'
            + '<p style="color:var(--muted);font-size:.9rem;margin-bottom:16px">No questions could be matched for this paper.</p>'
            + '<button type="button" class="cbt-nav-btn" onclick="window.closeMockExam()">✕ Close</button>'
            + '</div>';
        }
        return;
      }

      // Render Header Tools
      var titleEl = document.getElementById('mock-exam-title');
      if(titleEl){
        var calcBadge = paper.calc
          ? '<span style="background:rgba(255,255,255,.18);padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:600">🖩 Calculator Allowed</span>'
          : '<span style="background:#b91c1c;padding:3px 8px;border-radius:6px;font-size:.76rem;margin-left:8px;font-weight:700">🚫 No Calculator</span>';
        titleEl.innerHTML = '<span>' + paper.name + '</span> ' + calcBadge;
      }

      if(typeof window.setFloatingCalcLocked === 'function'){
        window.setFloatingCalcLocked(paper.calc === false, paper.name);
      }

      var hdr = document.getElementById('mock-exam-header');
      if(hdr){
        var toolsDiv = hdr.querySelector('.mock-tools-wrap');
        if(!toolsDiv){
          toolsDiv = document.createElement('div');
          toolsDiv.className = 'mock-tools-wrap';
          toolsDiv.style.cssText = 'display:flex;align-items:center;gap:8px;margin-left:auto;margin-right:12px';
          var timerEl = document.getElementById('mock-exam-timer');
          if(timerEl) hdr.insertBefore(toolsDiv, timerEl);
        }

        var calcBtnHtml = (paper.calc !== false)
          ? '<button type="button" class="hdr-btn" onclick="window.toggleFloatingCalc&&window.toggleFloatingCalc()" title="Open Desmos Graphing Calculator (Alt+C)">🧮 Calculator</button>'
          : '';

        var langToggleHtml = '';
        if(trackId === 'qudrat' || trackId === 'tahsili'){
          var curLang = 'both';
          try{ curLang = localStorage.getItem('clipsat_exam_lang') || 'both'; }catch(e){}
          langToggleHtml = '<div class="cs-lang-toggle-group" style="margin-right:4px">'
            + '<button type="button" class="cs-lt-btn'+(curLang==='ar'?' active':'')+'" data-lang="ar" onclick="window.ClipSATSetExamLang&&window.ClipSATSetExamLang(\'ar\',this)" title="Arabic Only">🇸🇦 عربي</button>'
            + '<button type="button" class="cs-lt-btn'+(curLang==='en'?' active':'')+'" data-lang="en" onclick="window.ClipSATSetExamLang&&window.ClipSATSetExamLang(\'en\',this)" title="English Only">🇬🇧 English</button>'
            + '<button type="button" class="cs-lt-btn'+(curLang==='both'?' active':'')+'" data-lang="both" onclick="window.ClipSATSetExamLang&&window.ClipSATSetExamLang(\'both\',this)" title="Bilingual">🌐 ثنائي</button>'
            + '</div>';
        }

        toolsDiv.innerHTML = langToggleHtml + calcBtnHtml
          + '<button type="button" class="hdr-btn" onclick="window.openFormulaModal&&window.openFormulaModal()" title="Reference Formulas">📐 Formulas</button>'
          + '<button type="button" class="hdr-btn" id="cbt-scratchpad-btn" onclick="window.toggleWhiteboard&&window.toggleWhiteboard()" title="Open Scratchpad (Alt+S)">✏️ Scratchpad</button>'
          + '<button type="button" class="cbt-flag-btn" id="cbt-flag-btn" onclick="window.cbtToggleFlagCurrent(' + _curIdx + ')">🏳️ Flag for Review</button>'
          + '<button type="button" class="hdr-btn" onclick="window.cbtToggleFullscreen()" title="Toggle Fullscreen">⛶</button>';
      }

      _secs = (paper.minutes || 45) * 60;
      _totalSecs = _secs;

      // Render questions DOM and navigate to question 0
      _renderQuestionsDOM();
      _goToQuestion(0);

      if(_tmr) clearInterval(_tmr);
      _renderTimer();
      _tmr = setInterval(function(){
        _secs--;
        _renderTimer();
        if(_secs <= 0){
          clearInterval(_tmr);
          _tmr = null;
          submitMockExam();
        }
      }, 1000);
    }).catch(function(err){
      console.error('CBT initialization error:', err);
      if(body){
        body.innerHTML = '<div style="text-align:center;padding:60px 20px">'
          + '<div style="font-size:2.4rem;margin-bottom:12px">⚠️</div>'
          + '<h3 style="color:#dc2626;font-size:1.25rem;font-weight:700;margin-bottom:8px">CBT Preparation Error</h3>'
          + '<p style="color:var(--muted,#64748b);font-size:.92rem;max-width:480px;margin:0 auto 20px">' + String((err && err.message) || 'An unexpected error occurred while loading CBT.') + '</p>'
          + '<div style="display:flex;gap:12px;justify-content:center">'
          + '  <button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.openMockExam(\'' + trackId + '\',' + pidx + ')">↻ Retry</button>'
          + '  <button type="button" class="cbt-nav-btn" onclick="window.closeMockExam()">✕ Close</button>'
          + '</div></div>';
      }
    });
  };

  window.cbtToggleFullscreen = function(){
    _toggleFullscreen();
  };

  function _renderTimer(){
    var el = document.getElementById('mock-exam-timer');
    if(!el) return;
    var m = Math.floor(Math.max(0, _secs) / 60);
    var s = Math.max(0, _secs) % 60;
    el.textContent = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
    el.style.color = _secs < 300 ? '#fca5a5' : '#ffffff';
  }

  function _getScaledScoreEstimate(trackId, correct, total){
    var p = total > 0 ? (correct / total) : 0;
    if(trackId === 'sat'){
      var satScore = 200 + Math.round(p * 600);
      if(p >= 0.95) satScore = 800;
      else if(p >= 0.88) satScore = 740 + Math.round((p - 0.88) * 800);
      else if(p >= 0.75) satScore = 650 + Math.round((p - 0.75) * 690);
      else if(p >= 0.50) satScore = 500 + Math.round((p - 0.50) * 600);
      return { label: 'Projected SAT Math Score', value: satScore + ' / 800', badge: satScore >= 700 ? '95th+ Percentile' : 'Competitive' };
    }
    if(trackId === 'qudrat' || trackId === 'tahsili'){
      var qScore = Math.round(50 + p * 50);
      return { label: 'Estimated Qiyas Scale Score', value: qScore + ' / 100', badge: qScore >= 90 ? 'ممتاز (Top 5%)' : 'جيد جداً' };
    }
    if(trackId === 'act'){
      var actScore = Math.max(1, Math.min(36, Math.round(p * 36)));
      return { label: 'Projected ACT Math Score', value: actScore + ' / 36', badge: actScore >= 30 ? 'Elite' : 'Standard' };
    }
    if(trackId === 'igcse' || trackId === 'aslevel' || trackId === 'a2level'){
      var g = p >= 0.85 ? 'Grade 9 (A*)' : p >= 0.72 ? 'Grade 8 (A)' : p >= 0.60 ? 'Grade 7 (A)' : p >= 0.50 ? 'Grade 6 (B)' : 'Grade 5 (C)';
      return { label: 'Projected Cambridge Grade', value: g, badge: p >= 0.72 ? 'Distinction' : 'Passing' };
    }
    if(trackId === 'ibsl' || trackId === 'ibhl'){
      var ibG = p >= 0.80 ? 'Grade 7' : p >= 0.68 ? 'Grade 6' : p >= 0.55 ? 'Grade 5' : p >= 0.40 ? 'Grade 4' : 'Grade 3';
      return { label: 'Projected IB Boundary', value: ibG, badge: p >= 0.68 ? 'Top Band' : 'Standard' };
    }
    return { label: 'Accuracy Rating', value: Math.round(p * 100) + '%', badge: 'Completed' };
  }

  function submitMockExam(){
    if(_tmr){ clearInterval(_tmr); _tmr = null; }
    _isSubmitted = true;

    if(typeof window.setFloatingCalcLocked === 'function'){
      window.setFloatingCalcLocked(false);
    }

    var body = document.getElementById('mock-exam-body');
    if(!body) return;

    // Ensure all question cards are visible in review mode
    var allQEls = body.querySelectorAll('.mock-q');
    allQEls.forEach(function(el){ el.classList.remove('cbt-hidden'); });

    var pool = JSON.parse(body.getAttribute('data-pool') || '[]');
    var correct = 0, totalGraded = 0;
    var domainStats = {};

    _pool.forEach(function(q, i){
      var meta = pool[i] || {};
      var d = q.domain || meta.domain || 'Math';
      if(!domainStats[d]) domainStats[d] = { total: 0, correct: 0 };
      domainStats[d].total++;

      var qEl = document.getElementById('mock-q-' + i);
      if(!qEl) return;

      var isSPR = (meta.type === 'spr' || meta.isSPR);
      var sprInput = qEl.querySelector('.mock-spr-input');
      var radios = qEl.querySelectorAll('input[type=radio]');
      var userAns = _answers[i];
      var isRight = false;
      var targetAns = String(meta.sprAnswer != null ? meta.sprAnswer : (meta.ans != null ? meta.ans : (Array.isArray(meta.choices) && meta.answer != null ? meta.choices[meta.answer] : meta.answer))).trim().toLowerCase();

      if(isSPR){
        totalGraded++;
        var val = userAns != null ? String(userAns).trim().toLowerCase() : '';
        isRight = (val === targetAns);

        if(!isRight){
          var _toNum = function(s){
            if(!s) return NaN;
            s = String(s).trim();
            if(s.indexOf('/') !== -1){
              var p = s.split('/');
              var n = parseFloat(p[0]), den = parseFloat(p[1]);
              return (den !== 0 && !isNaN(n) && !isNaN(den)) ? (n / den) : NaN;
            }
            return parseFloat(s);
          };
          var vNum = _toNum(val);
          var tNum = _toNum(targetAns);
          if(!isNaN(vNum) && !isNaN(tNum) && Math.abs(vNum - tNum) < 1e-4){
            isRight = true;
          }
        }

        if(isRight){
          correct++;
          domainStats[d].correct++;
          if(sprInput){
            sprInput.style.borderColor = '#16a34a';
            sprInput.style.background = '#f0fdf4';
          }
        } else if(sprInput){
          sprInput.style.borderColor = '#dc2626';
          sprInput.style.background = '#fef2f2';
        }

        qEl.setAttribute('data-correct', isRight ? '1' : '0');

        var resBox = document.createElement('div');
        resBox.className = 'mock-res-feedback';
        resBox.style.cssText = 'margin-top:12px;padding:12px 16px;border-radius:8px;font-size:.88rem;line-height:1.6;' + (isRight ? 'background:#f0fdf4;border:1px solid #86efac;color:#166534' : 'background:#fef2f2;border:1px solid #fca5a5;color:#991b1b');
        resBox.innerHTML = '<div style="font-weight:700;font-size:.95rem;margin-bottom:4px">' + (isRight ? '✓ Correct Answer' : '✗ Incorrect') + '</div>'
          + '<div>Your Answer: <code>' + (val || '(Blank)') + '</code> · Correct: <code>' + targetAns + '</code></div>'
          + (meta.sol ? '<div style="margin-top:8px;border-top:1px dashed rgba(0,0,0,.15);padding-top:8px;color:var(--ink,#1e293b)"><strong>Mathematical Explanation:</strong><br>' + meta.sol + '</div>' : '');
        qEl.appendChild(resBox);

      } else if(radios.length){
        totalGraded++;
        var chosen = (userAns !== undefined && userAns !== null) ? parseInt(userAns, 10) : -1;
        isRight = (chosen === meta.answer);
        if(isRight){
          correct++;
          domainStats[d].correct++;
        }

        qEl.setAttribute('data-correct', isRight ? '1' : '0');

        radios.forEach(function(r, ci){
          var row = r.closest('.mock-choice-row');
          if(!row) return;
          if(ci === meta.answer){
            row.style.background = '#f0fdf4';
            row.style.borderColor = '#22c55e';
            row.style.fontWeight = '700';
          } else if(ci === chosen && !isRight){
            row.style.background = '#fef2f2';
            row.style.borderColor = '#ef4444';
          }
        });

        var resBox = document.createElement('div');
        resBox.className = 'mock-res-feedback';
        resBox.style.cssText = 'margin-top:12px;padding:12px 16px;border-radius:8px;font-size:.88rem;line-height:1.6;' + (isRight ? 'background:#f0fdf4;border:1px solid #86efac;color:#166534' : 'background:#fef2f2;border:1px solid #fca5a5;color:#991b1b');
        resBox.innerHTML = '<div style="font-weight:700;font-size:.95rem;margin-bottom:4px">' + (isRight ? '✓ Correct Answer' : '✗ Incorrect') + '</div>'
          + (meta.sol ? '<div style="margin-top:8px;border-top:1px dashed rgba(0,0,0,.15);padding-top:8px;color:var(--ink,#1e293b)"><strong>Mathematical Explanation:</strong><br>' + meta.sol + '</div>' : '');
        qEl.appendChild(resBox);
      }
    });

    var pct = totalGraded ? Math.round((correct / totalGraded) * 100) : 0;
    var scaled = _getScaledScoreEstimate(_trackId, correct, totalGraded);

    var title = document.getElementById('mock-exam-title');
    if(title){
      title.innerHTML = 'Examination Completed — <strong>Score: ' + correct + '/' + totalGraded + ' (' + pct + '%)</strong>';
    }

    // Build Domain Breakdown HTML
    var domainBarsHtml = '';
    Object.keys(domainStats).forEach(function(dName){
      var st = domainStats[dName];
      var dPct = st.total > 0 ? Math.round((st.correct / st.total) * 100) : 0;
      var barColor = dPct >= 80 ? '#16a34a' : dPct >= 50 ? '#d97706' : '#dc2626';
      domainBarsHtml += '<div style="margin-bottom:8px">'
        + '<div style="display:flex;justify-content:space-between;font-size:.78rem;font-weight:700;margin-bottom:3px">'
        + '  <span>' + dName + '</span>'
        + '  <span>' + st.correct + '/' + st.total + ' (' + dPct + '%)</span>'
        + '</div>'
        + '<div style="height:6px;background:var(--border,#e2e8f0);border-radius:4px;overflow:hidden">'
        + '  <div style="width:' + dPct + '%;height:100%;background:' + barColor + ';border-radius:4px"></div>'
        + '</div>'
        + '</div>';
    });

    var heroHtml = [
      '<div id="cbt-results-hero" style="background:var(--panel,#fff);border:1.5px solid var(--border,#cbd5e1);border-radius:14px;padding:24px;margin-bottom:24px;box-shadow:0 10px 30px rgba(0,0,0,.08)">',
        '<div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border,#e2e8f0);padding-bottom:16px;margin-bottom:16px;flex-wrap:wrap;gap:12px">',
          '<div>',
            '<div style="font-size:.82rem;font-weight:700;color:var(--muted,#64748b);text-transform:uppercase;letter-spacing:.5px">Official CBT Performance Report</div>',
            '<h2 style="margin:4px 0 0;font-size:1.6rem;font-weight:800;color:var(--indigo,#132746)">' + (_paper ? _paper.name : 'Mathematics CBT') + '</h2>',
          '</div>',
          '<div style="text-align:right">',
            '<div style="font-size:1.8rem;font-weight:900;color:' + (pct >= 70 ? '#16a34a' : '#d97706') + '">' + correct + ' <span style="font-size:1.1rem;color:var(--muted)">/ ' + totalGraded + ' (' + pct + '%)</span></div>',
            '<div style="font-size:.8rem;font-weight:700;color:#2563eb">' + scaled.label + ': ' + scaled.value + '</div>',
          '</div>',
        '</div>',
        '<div style="margin-bottom:18px">' + domainBarsHtml + '</div>',
        '<div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--border,#e2e8f0);padding-top:14px;flex-wrap:wrap;gap:10px">',
          '<div style="display:flex;gap:6px" id="cbt-filter-group">',
            '<button type="button" class="cbt-nav-btn cbt-nav-primary" onclick="window.cbtFilterReview(\'all\', this)">All Questions (' + totalGraded + ')</button>',
            '<button type="button" class="cbt-nav-btn" onclick="window.cbtFilterReview(\'mistakes\', this)">Mistakes Only (' + (totalGraded - correct) + ')</button>',
            '<button type="button" class="cbt-nav-btn" onclick="window.cbtFilterReview(\'flagged\', this)">Flagged</button>',
          '</div>',
          '<div style="display:flex;gap:8px">',
            '<button type="button" class="cbt-nav-btn" onclick="window.print()">📄 Save PDF</button>',
            '<button type="button" class="cbt-nav-btn" onclick="window.openMockExam(\'' + _trackId + '\',' + _pidx + ')">🔄 Retake</button>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');

    body.insertAdjacentHTML('afterbegin', heroHtml);

    var footer = document.getElementById('mock-exam-footer');
    if(footer){
      footer.innerHTML = '<div style="display:flex;justify-content:space-between;width:100%">'
        + '<button class="mock-exit-btn" onclick="exitMockExam()" style="background:var(--indigo,#132746);color:#fff;border:none;padding:10px 24px;font-weight:700">Close CBT Simulator</button>'
        + '<button class="cbt-nav-btn cbt-nav-primary" onclick="window.openMockExam(\'' + _trackId + '\',' + _pidx + ')">🔄 Practice Again</button>'
        + '</div>';
    }

    _typesetMath(body);

    if(window.CSGamify && window.CSGamify.wbActive && window.CSGamify.toggleWhiteboard){
      window.CSGamify.toggleWhiteboard();
    }
    body.scrollTop = 0;
  }
  window.submitMockExam = submitMockExam;

  window.cbtFilterReview = function(filter, btn){
    var body = document.getElementById('mock-exam-body');
    if(!body) return;

    if(btn){
      var group = btn.parentElement.querySelectorAll('button');
      group.forEach(function(b){ b.classList.remove('cbt-nav-primary'); });
      btn.classList.add('cbt-nav-primary');
    }

    var qs = body.querySelectorAll('.mock-q');
    qs.forEach(function(qEl, i){
      var isRight = (qEl.getAttribute('data-correct') === '1');
      var isFlagged = !!_flags[i];
      if(filter === 'mistakes'){
        qEl.style.display = isRight ? 'none' : 'block';
      } else if(filter === 'flagged'){
        qEl.style.display = isFlagged ? 'block' : 'none';
      } else {
        qEl.style.display = 'block';
      }
    });
  };

  window.exitMockExam = function(){
    if(!_isSubmitted && _totalSecs > 0 && _secs > 0){
      var answered = 0;
      for(var i = 0; i < _pool.length; i++){ if(_isQuestionAnswered(i)) answered++; }
      var confirmMsg = 'You have completed ' + answered + ' of ' + _pool.length + ' questions.\nAre you sure you want to exit the CBT Simulator without saving?';
      if(!confirm(confirmMsg)) return;
    }

    if(_tmr){ clearInterval(_tmr); _tmr = null; }
    if(typeof window.setFloatingCalcLocked === 'function'){
      window.setFloatingCalcLocked(false);
    }
    var overlay = document.getElementById('mock-exam-overlay');
    if(overlay) overlay.classList.remove('show');
    document.body.classList.remove('cbt-open');

    if(window.CSGamify && window.CSGamify.wbActive && window.CSGamify.toggleWhiteboard){
      window.CSGamify.toggleWhiteboard();
    }
  };

})();
