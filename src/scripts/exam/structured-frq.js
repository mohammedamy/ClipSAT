/* Multi-Part Structured Free-Response & Proof Engine (Wave 3 — WP-38).
   Supports AP Section II, Cambridge IGCSE 0580 / 0606 / AS & A-Level 9709,
   Edexcel 4MA1, IB Math AA/AI SL & HL (Section A, Section B, Paper 3),
   and Olympiad Stage-2 Deductive Proof items.
   Zero dynamic code evaluation (strictly CSP-safe). Exposes window.CSStructuredFRQ + CommonJS export. */
(function (root) {
  'use strict';

  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function parseNumericValue(raw) {
    if (raw == null) return NaN;
    var s = String(raw)
      .trim()
      .replace(/\\[()\[\]]/g, '')
      .replace(/\$/g, '')
      .replace(/[−–—]/g, '-')
      .replace(/,/g, '')
      .trim();
    if (!s) return NaN;
    if (/^[+-]?\d+(?:\.\d+)?\s*\/\s*[+-]?\d+(?:\.\d+)?$/.test(s)) {
      var sp = s.split('/');
      var num = parseFloat(sp[0]);
      var den = parseFloat(sp[1]);
      return den !== 0 && !isNaN(num) && !isNaN(den) ? num / den : NaN;
    }
    if (/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(s)) {
      return parseFloat(s);
    }
    return NaN;
  }

  function checkPartAnswer(userVal, part, checker) {
    var u = String(userVal == null ? '' : userVal).trim();
    var exp = part && part.answer != null ? String(part.answer).trim() : '';
    if (!u || !exp) return false;

    var eqFn =
      (checker && typeof checker.equivalent === 'function' && checker.equivalent) ||
      (root.ClipSATAnswerCheck && typeof root.ClipSATAnswerCheck.equivalent === 'function' && root.ClipSATAnswerCheck.equivalent) ||
      null;

    if (eqFn) {
      try {
        if (eqFn(u, exp)) return true;
      } catch (_e) {}
    }

    var tol = part && typeof part.tolerances === 'number' && part.tolerances >= 0 ? part.tolerances : 1e-3;
    var uNum = parseNumericValue(u);
    var eNum = parseNumericValue(exp);
    if (!isNaN(uNum) && !isNaN(eNum) && Math.abs(uNum - eNum) <= Math.max(tol, 1e-6)) {
      return true;
    }

    return u.toLowerCase().replace(/\s+/g, '') === exp.toLowerCase().replace(/\s+/g, '');
  }

  function computeTotalMarks(q) {
    if (!q) return 1;
    if (Array.isArray(q.parts) && q.parts.length) {
      var sum = 0;
      for (var i = 0; i < q.parts.length; i++) {
        sum += Number(q.parts[i].marks) || 1;
      }
      return sum > 0 ? sum : Number(q.marks) || 1;
    }
    return Number(q.marks) || 1;
  }

  function gradeStructuredResponse(q, state, checker) {
    var parts = (q && Array.isArray(q.parts)) ? q.parts : [];
    var totalMarks = computeTotalMarks(q);
    var partInputs = (state && state.partInputs) || {};
    var checkedCriteria = (state && state.checkedCriteria) || {};
    var awardedMarks = 0;
    var partResults = [];

    for (var pi = 0; pi < parts.length; pi++) {
      var pt = parts[pi];
      var pMarks = Number(pt.marks) || 1;
      var uVal = partInputs[pi] != null ? String(partInputs[pi]) : '';
      var autoCorrect = pt.answer ? checkPartAnswer(uVal, pt, checker) : false;
      var scheme = Array.isArray(pt.markScheme) ? pt.markScheme : [];
      var rubricSum = 0;
      var anyManualCheck = false;

      for (var ci = 0; ci < scheme.length; ci++) {
        var key = pi + ':' + ci;
        if (checkedCriteria[key]) {
          anyManualCheck = true;
          rubricSum += Number(scheme[ci].marks) || 1;
        }
      }

      var earned = 0;
      if (anyManualCheck) {
        earned = Math.min(pMarks, rubricSum);
      } else if (autoCorrect) {
        earned = pMarks;
      }

      awardedMarks += earned;
      partResults.push({
        index: pi,
        label: pt.label || '(' + String.fromCharCode(97 + pi) + ')',
        maxMarks: pMarks,
        earnedMarks: earned,
        autoCorrect: autoCorrect,
        userAnswer: uVal,
        expectedAnswer: pt.answer || ''
      });
    }

    awardedMarks = Math.min(totalMarks, awardedMarks);
    return {
      awardedMarks: awardedMarks,
      totalMarks: totalMarks,
      ratio: totalMarks > 0 ? awardedMarks / totalMarks : 0,
      isFullCredit: awardedMarks >= totalMarks,
      isPassingCredit: totalMarks > 0 ? (awardedMarks / totalMarks) >= 0.6 : false,
      parts: partResults
    };
  }

  function _pickText(enText, arText, langMode) {
    if (langMode === 'ar' && arText) return arText;
    if (langMode === 'both' && arText && enText && arText !== enText) {
      return '<span class="q-lang-ar" dir="rtl" style="display:block;margin-bottom:4px">' + arText + '</span>'
        + '<span class="q-lang-en" dir="ltr" style="display:block;color:var(--muted,#475569);font-size:.92em">' + enText + '</span>';
    }
    return enText || arText || '';
  }

  var _renderedQuestions = {};

  function renderCBTWidget(q, qIdx, savedState, opts) {
    _renderedQuestions[qIdx] = q;
    opts = opts || {};
    var langMode = opts.lang || 'en';
    var fmtFn = opts.formatMath || function (s) { return s; };
    var parts = (q && Array.isArray(q.parts)) ? q.parts : [];
    var st = (savedState && typeof savedState === 'object') ? savedState : { partInputs: {}, checkedCriteria: {}, notes: '' };
    var pInputs = st.partInputs || {};
    var cChecks = st.checkedCriteria || {};
    var totalM = computeTotalMarks(q);
    var isAr = (langMode === 'ar');

    var html = '<div class="cs-sfrq-widget" data-qidx="' + qIdx + '" data-total-marks="' + totalM + '" style="margin-top:12px;border:1.5px solid var(--border,#cbd5e1);border-radius:10px;padding:14px;background:var(--paper-2,#f8fafc)">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--border,#e2e8f0)">'
      + '<span style="font-size:.82rem;font-weight:800;color:var(--indigo,#1e3e70);text-transform:uppercase;letter-spacing:.03em">'
      + (q.type === 'proof' ? (isAr ? 'برهان رياضي مهيكل متعدد الأجزاء' : 'Structured Mathematical Proof') : (isAr ? 'سؤال مقالي مهيكل متعدد الفقرات' : 'Multi-Part Structured Question'))
      + ' · [' + totalM + (isAr ? ' درجات' : ' marks') + ']</span>'
      + '<div style="display:flex;gap:6px;flex-wrap:wrap">'
      + '<button type="button" class="cbt-nav-btn cs-sfrq-toggle-ms" onclick="window.CSStructuredFRQ&&window.CSStructuredFRQ.toggleRubric(' + qIdx + ')" style="padding:4px 10px;font-size:.76rem">'
      + (isAr ? '📋 سلم التصحيح [M1/A1/B1]' : '📋 Self-Score Rubric [M1/A1/B1]') + '</button>'
      + '<button type="button" class="cbt-nav-btn cs-sfrq-ai-btn" onclick="window.CSStructuredFRQ&&window.CSStructuredFRQ.requestAIRubricCheck(' + qIdx + ')" style="padding:4px 10px;font-size:.76rem">'
      + (isAr ? '🤖 فحص بالذكاء الاصطناعي' : '🤖 AI Rubric Check') + '</button>'
      + '</div></div>';

    for (var pi = 0; pi < parts.length; pi++) {
      var pt = parts[pi];
      var lbl = escHtml(pt.label || '(' + String.fromCharCode(97 + pi) + ')');
      var pMarks = Number(pt.marks) || 1;
      var pPrompt = _pickText(pt.prompt || '', pt.prompt_ar || '', langMode);
      var curVal = pInputs[pi] != null ? String(pInputs[pi]) : '';
      var isProofInput = (pt.inputType === 'proof' || pt.inputType === 'text');

      html += '<div class="cs-sfrq-part" data-part-idx="' + pi + '" style="background:var(--paper,#fff);border:1px solid var(--border,#e2e8f0);border-radius:8px;padding:12px;margin-bottom:10px">'
        + '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:8px">'
        + '<div style="font-size:.96rem;line-height:1.6"><strong style="color:var(--indigo,#1e3e70);margin-inline-end:6px">' + lbl + '</strong>' + fmtFn(pPrompt) + '</div>'
        + '<span style="font-size:.75rem;font-weight:700;color:#475569;white-space:nowrap">[' + pMarks + (pMarks === 1 ? (isAr ? ' درجة' : ' mark') : (isAr ? ' درجات' : ' marks')) + ']</span>'
        + '</div>';

      if (isProofInput) {
        html += '<textarea class="cs-sfrq-input" data-qidx="' + qIdx + '" data-pidx="' + pi + '" rows="2" '
          + 'placeholder="' + (isAr ? 'اكتب خطوات الاستنتاج والنتيجة النهائية...' : 'Write your deductive step & final expression...') + '" '
          + 'oninput="window.CSStructuredFRQ&&window.CSStructuredFRQ.onPartInput(' + qIdx + ',' + pi + ',this.value)" '
          + 'style="width:100%;padding:8px 11px;border:1.5px solid var(--border,#cbd5e1);border-radius:6px;font-family:var(--sans);font-size:.9rem">'
          + escHtml(curVal) + '</textarea>';
      } else {
        html += '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'
          + '<label style="font-size:.8rem;font-weight:700;color:var(--muted,#64748b)">' + (isAr ? 'الإجابة النهائية:' : 'Final Answer:') + '</label>'
          + '<input type="text" class="cs-sfrq-input" data-qidx="' + qIdx + '" data-pidx="' + pi + '" value="' + escHtml(curVal) + '" '
          + 'placeholder="' + (pt.inputType === 'numeric' ? 'e.g. 12 or 7/4' : 'e.g. 2x + 3 or 5/2') + '" '
          + 'oninput="window.CSStructuredFRQ&&window.CSStructuredFRQ.onPartInput(' + qIdx + ',' + pi + ',this.value)" '
          + 'style="min-width:210px;padding:7px 11px;border:1.5px solid var(--border,#cbd5e1);border-radius:6px;font-family:var(--mono,monospace);font-size:.95rem">'
          + '</div>';
      }

      var scheme = Array.isArray(pt.markScheme) ? pt.markScheme : [];
      if (scheme.length) {
        html += '<div class="cs-sfrq-rubric" id="cs-sfrq-rubric-' + qIdx + '-' + pi + '" style="display:none;margin-top:10px;padding-top:8px;border-top:1px dashed var(--border,#cbd5e1)">'
          + '<div style="font-size:.76rem;font-weight:800;color:#334155;margin-bottom:5px">'
          + (isAr ? 'معايير التصحيح الجزئي (حدد الخطوات التي أنجزتها):' : 'Official Partial-Credit Mark Scheme (check earned steps):') + '</div>';
        for (var ci = 0; ci < scheme.length; ci++) {
          var crit = scheme[ci];
          var cKey = pi + ':' + ci;
          var isChk = !!cChecks[cKey];
          var critText = _pickText(crit.criterion || '', crit.criterion_ar || '', langMode);
          var badgeBg = /^M/i.test(crit.code) ? '#dbeafe;color:#1e40af' : (/^A/i.test(crit.code) ? '#dcfce7;color:#166534' : '#fef3c7;color:#92400e');
          html += '<label style="display:flex;align-items:flex-start;gap:8px;font-size:.83rem;padding:4px 0;cursor:pointer">'
            + '<input type="checkbox" class="cs-sfrq-crit-cb" data-qidx="' + qIdx + '" data-pidx="' + pi + '" data-cidx="' + ci + '" '
            + (isChk ? 'checked ' : '')
            + 'onchange="window.CSStructuredFRQ&&window.CSStructuredFRQ.onToggleCriterion(' + qIdx + ',' + pi + ',' + ci + ',this.checked)" style="margin-top:3px">'
            + '<span style="font-family:var(--mono,monospace);font-size:.73rem;font-weight:800;padding:1px 6px;border-radius:4px;background:' + badgeBg + '">[' + escHtml(crit.code) + ']</span>'
            + '<span style="flex:1">' + fmtFn(critText) + ' <em>(' + (Number(crit.marks) || 1) + 'm)</em></span>'
            + '</label>';
        }
        html += '</div>';
      }
      html += '</div>';
    }

    // Inline HTML5 Scratchpad Canvas per Structured Question
    html += '<div class="cs-sfrq-scratch-wrap" style="margin-top:10px;background:var(--paper,#fff);border:1px solid var(--border,#cbd5e1);border-radius:8px;padding:10px">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;flex-wrap:wrap;gap:6px">'
      + '<span style="font-size:.78rem;font-weight:700;color:var(--muted,#475569)">✏️ ' + (isAr ? 'مسودة الحل اليدوي (لوحة رسم حرة):' : 'Handwritten Working Scratchpad (Draw equations / diagrams):') + '</span>'
      + '<div style="display:flex;gap:6px">'
      + '<button type="button" class="cbt-nav-btn" style="padding:2px 8px;font-size:.73rem" onclick="window.CSStructuredFRQ&&window.CSStructuredFRQ.clearCanvas(' + qIdx + ')">' + (isAr ? 'مسح اللوحة' : 'Clear Ink') + '</button>'
      + '</div></div>'
      + '<canvas id="cs-sfrq-canvas-' + qIdx + '" class="cs-sfrq-canvas" width="640" height="160" '
      + 'style="width:100%;height:160px;border:1px dashed #cbd5e1;border-radius:6px;background:#ffffff;touch-action:none;cursor:crosshair"></canvas>'
      + '</div>';

    html += '<div id="cs-sfrq-ai-feedback-' + qIdx + '" style="display:none;margin-top:10px;padding:10px 12px;border-radius:8px;background:#eff6ff;border:1px solid #bfdbfe;font-size:.85rem"></div>';
    html += '</div>';
    return html;
  }

  function bindCanvases(container) {
    if (!container || typeof container.querySelectorAll !== 'function') return;
    var canvases = container.querySelectorAll('.cs-sfrq-canvas');
    canvases.forEach(function (cv) {
      if (cv.getAttribute('data-bound') === '1') return;
      cv.setAttribute('data-bound', '1');
      var ctx = cv.getContext && cv.getContext('2d');
      if (!ctx) return;
      var drawing = false;
      function ptPos(e) {
        var r = cv.getBoundingClientRect();
        var scaleX = r.width > 0 ? cv.width / r.width : 1;
        var scaleY = r.height > 0 ? cv.height / r.height : 1;
        return { x: (e.clientX - r.left) * scaleX, y: (e.clientY - r.top) * scaleY };
      }
      cv.addEventListener('pointerdown', function (e) {
        drawing = true;
        cv.setPointerCapture && cv.setPointerCapture(e.pointerId);
        var p = ptPos(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#1e3a8a';
      });
      cv.addEventListener('pointermove', function (e) {
        if (!drawing) return;
        var p = ptPos(e);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        cv.setAttribute('data-dirty', '1');
      });
      function stop() { drawing = false; }
      cv.addEventListener('pointerup', stop);
      cv.addEventListener('pointercancel', stop);
    });
  }

  function clearCanvas(qIdx) {
    if (typeof document === 'undefined') return;
    var cv = document.getElementById('cs-sfrq-canvas-' + qIdx);
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, cv.width, cv.height);
    cv.removeAttribute('data-dirty');
  }

  function toggleRubric(qIdx, forceShow) {
    if (typeof document === 'undefined') return;
    var qEl = document.getElementById('mock-q-' + qIdx) || document;
    var boxes = qEl.querySelectorAll('[id^="cs-sfrq-rubric-' + qIdx + '-"]');
    boxes.forEach(function (el) {
      var show = typeof forceShow === 'boolean' ? forceShow : (el.style.display === 'none');
      el.style.display = show ? 'block' : 'none';
    });
  }

  // Live state bridge into CBT _answers[qIdx]
  var _stateStore = {};
  var _onChangeHook = null;

  function setOnChangeHook(fn) {
    _onChangeHook = fn;
  }

  function resetStore() {
    _stateStore = {};
  }

  function getState(qIdx) {
    if (!_stateStore[qIdx]) {
      _stateStore[qIdx] = { partInputs: {}, checkedCriteria: {} };
    }
    return _stateStore[qIdx];
  }

  function onPartInput(qIdx, pIdx, val) {
    var st = getState(qIdx);
    st.partInputs[pIdx] = val;
    if (typeof _onChangeHook === 'function') _onChangeHook(qIdx, st);
  }

  function onToggleCriterion(qIdx, pIdx, cIdx, checked) {
    var st = getState(qIdx);
    var k = pIdx + ':' + cIdx;
    if (checked) st.checkedCriteria[k] = true;
    else delete st.checkedCriteria[k];
    if (typeof _onChangeHook === 'function') _onChangeHook(qIdx, st);
  }

  function isStateAnswered(st) {
    if (!st || typeof st !== 'object') return false;
    var pi = st.partInputs || {};
    var keys = Object.keys(pi);
    for (var i = 0; i < keys.length; i++) {
      if (String(pi[keys[i]] || '').trim().length > 0) return true;
    }
    return Object.keys(st.checkedCriteria || {}).length > 0;
  }

  function requestAIRubricCheck(qIdx) {
    if (typeof document === 'undefined') return;
    var fb = document.getElementById('cs-sfrq-ai-feedback-' + qIdx);
    var st = getState(qIdx);
    var q = _renderedQuestions[qIdx] || null;
    var stemCtx = q ? String(q.text || q.q || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 400) : '';
    var schemeCtx = '';
    if (q && Array.isArray(q.parts)) {
      schemeCtx = q.parts.map(function (pt, idx) {
        var lbl = pt.label || '(' + String.fromCharCode(97 + idx) + ')';
        var crits = Array.isArray(pt.markScheme) ? pt.markScheme.map(function (c) {
          return '[' + c.code + '] ' + (c.criterion || '');
        }).join('; ') : '';
        return lbl + ' ' + String(pt.prompt || '').slice(0, 140) + (crits ? ' | Rubric: ' + crits : '');
      }).join(' || ').slice(0, 700);
    }
    var summaryParts = Object.keys(st.partInputs || {}).map(function (k) {
      return 'Part ' + (Number(k) + 1) + ': ' + st.partInputs[k];
    }).join('; ');
    toggleRubric(qIdx, true);
    if (typeof root.openChatWith === 'function') {
      var prompt = 'Please grade my multi-part structured working against [M1]/[A1]/[B1] criteria.'
        + (stemCtx ? '\nQuestion: ' + stemCtx : '')
        + (schemeCtx ? '\nParts & Mark Scheme: ' + schemeCtx : '')
        + '\nMy working: ' + (summaryParts || '(see my steps)');
      root.openChatWith(prompt);
      return;
    }
    if (fb) {
      fb.style.display = 'block';
      fb.innerHTML = '<strong>Rubric Opened Above:</strong> Tick each earned <code>[M1]</code>, <code>[A1]</code>, and <code>[B1]</code> criterion directly, or sign in to run live AI step grading.';
    }
  }

  function renderPrintableSubparts(q, fmtMath, langMode) {
    if (!q || !Array.isArray(q.parts) || !q.parts.length) return '';
    fmtMath = fmtMath || function (s) { return s; };
    var out = '<div class="fep-structured-parts" style="margin-top:10px">';
    for (var i = 0; i < q.parts.length; i++) {
      var pt = q.parts[i];
      var lbl = escHtml(pt.label || '(' + String.fromCharCode(97 + i) + ')');
      var m = Number(pt.marks) || 1;
      var prm = _pickText(pt.prompt || '', pt.prompt_ar || '', langMode || 'en');
      out += '<div class="fep-subpart" style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;margin:8px 0;padding-left:8px">'
        + '<div><strong>' + lbl + '</strong> ' + fmtMath(prm) + '</div>'
        + '<span style="font-weight:700;font-size:.82rem;color:#475569;white-space:nowrap">[' + m + ']</span>'
        + '</div>';
    }
    out += '</div>';
    return out;
  }

  function renderPrintableMarkScheme(q, fmtMath, langMode) {
    if (!q || !Array.isArray(q.parts) || !q.parts.length) return '';
    fmtMath = fmtMath || function (s) { return s; };
    var rows = '';
    for (var i = 0; i < q.parts.length; i++) {
      var pt = q.parts[i];
      var lbl = escHtml(pt.label || '(' + String.fromCharCode(97 + i) + ')');
      var scheme = Array.isArray(pt.markScheme) ? pt.markScheme : [];
      for (var j = 0; j < scheme.length; j++) {
        var c = scheme[j];
        var critTxt = _pickText(c.criterion || '', c.criterion_ar || '', langMode || 'en');
        rows += '<tr>'
          + '<td style="padding:4px 8px;border:1px solid #cbd5e1;font-weight:700;white-space:nowrap">' + (j === 0 ? lbl : '') + '</td>'
          + '<td style="padding:4px 8px;border:1px solid #cbd5e1;font-family:var(--mono,monospace);font-weight:800;text-align:center">[' + escHtml(c.code) + ']</td>'
          + '<td style="padding:4px 8px;border:1px solid #cbd5e1">' + fmtMath(critTxt) + '</td>'
          + '<td style="padding:4px 8px;border:1px solid #cbd5e1;text-align:center">' + (Number(c.marks) || 1) + '</td>'
          + '</tr>';
      }
    }
    if (!rows) return '';
    return '<table class="fep-markscheme-table" style="width:100%;border-collapse:collapse;margin-top:8px;font-size:.82rem">'
      + '<thead><tr style="background:#f1f5f9">'
      + '<th style="padding:4px 8px;border:1px solid #cbd5e1;text-align:left">Part</th>'
      + '<th style="padding:4px 8px;border:1px solid #cbd5e1;text-align:center">Mark</th>'
      + '<th style="padding:4px 8px;border:1px solid #cbd5e1;text-align:left">Marking Criterion</th>'
      + '<th style="padding:4px 8px;border:1px solid #cbd5e1;text-align:center">Pts</th>'
      + '</tr></thead><tbody>' + rows + '</tbody></table>';
  }

  var api = {
    parseNumericValue: parseNumericValue,
    checkPartAnswer: checkPartAnswer,
    computeTotalMarks: computeTotalMarks,
    gradeStructuredResponse: gradeStructuredResponse,
    renderCBTWidget: renderCBTWidget,
    bindCanvases: bindCanvases,
    clearCanvas: clearCanvas,
    toggleRubric: toggleRubric,
    setOnChangeHook: setOnChangeHook,
    resetStore: resetStore,
    getState: getState,
    onPartInput: onPartInput,
    onToggleCriterion: onToggleCriterion,
    isStateAnswered: isStateAnswered,
    requestAIRubricCheck: requestAIRubricCheck,
    renderPrintableSubparts: renderPrintableSubparts,
    renderPrintableMarkScheme: renderPrintableMarkScheme
  };

  root.CSStructuredFRQ = api;
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }
})(typeof window !== 'undefined' ? window : globalThis);
