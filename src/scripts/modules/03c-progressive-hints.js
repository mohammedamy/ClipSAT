/* ═══════════════════════════════════════════════════════════════════════════
   03c-progressive-hints.js — Universal 3-Tier Progressive Hint Engine
   Provides window.CSHintEngine for Chapter Quizzes (.cq-item), Question Bank
   Practice Tests (.bank-problem), AI Practice Quizzes (#pq-overlay), and the
   Adaptive Mistake Deck (#mq-review-overlay).
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  "use strict";

  var TIER_LABELS = [
    '💡 Hint 1/3 · Concept & Setup',
    '🧭 Hint 2/3 · Key Relationship & Step',
    '🎯 Hint 3/3 · Final Verification Check'
  ];

  var TIER_LABELS_AR = [
    '💡 تلميح ١/٣ · الفكرة وإعداد المسألة',
    '🧭 تلميح ٢/٣ · العلاقة الرياضية والخطوة الأساسية',
    '🎯 تلميح ٣/٣ · التحقق النهائي'
  ];

  function _isArabicText(s){
    return /[\u0600-\u06FF]/.test(String(s || ''));
  }

  /* Redact the final answer token from a sentence so Hint 1/2 never spoil the answer */
  function _redactFinalAnswer(sentence, ansText){
    if(!sentence) return '';
    var out = String(sentence).trim();
    out = out.replace(/(?:Final\s+Answer|Answer|الإجابة\s*النهائية|الإجابة|الجواب)\s*[:=]\s*[^\n.]+/gi, '').trim();
    if(ansText && String(ansText).trim().length >= 2){
      var cleanAns = String(ansText).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      try {
        var re = new RegExp('(=\\s*)' + cleanAns + '(?![0-9a-zA-Z])', 'g');
        out = out.replace(re, '$1…');
      } catch(e){}
    }
    return out;
  }

  /* Synthesize 3 progressive pedagogical hints from a question object or raw stem/solution/domain */
  function buildHints(q){
    if(!q) return [
      'Identify the given quantities and the target variable asked for in the question.',
      'Write down the governing formula or algebraic relationship connecting the given values.',
      'Substitute carefully, check signs and units, and compare with the answer choices.'
    ];

    /* If explicit 3-tier hints array exists on the item (and is not legacy boilerplate), normalize and return it */
    if(Array.isArray(q.hints) && q.hints.length >= 3){
      var joinedH = q.hints.slice(0, 3).map(function(h){
        if(typeof h === 'string') return h;
        if(h && typeof h === 'object') return h.en || h.ar || '';
        return String(h || '');
      });
      if(!/Identify the (?:governing|mathematical|core) relationship|Tier 1 \(Conceptual Setup\)|Focus on what the question asks|Combine the steps above to directly answer/i.test(joinedH.join(' '))){
        return joinedH;
      }
    }

    var stem = String(q.text || q.q || '').trim();
    var sol  = String(q.sol || q.exp || q.expl || q.explanation || '').trim();
    var dom  = String(q.domain || q.topic || 'Mathematics').trim();
    var ansText = '';
    if(typeof q.answer === 'number' && Array.isArray(q.choices) && q.choices[q.answer] != null){
      ansText = String(q.choices[q.answer]);
    } else if(q.right != null){
      ansText = String(q.right);
    } else if(q.ans != null){
      ansText = String(q.ans);
    }

    var isAr = _isArabicText(stem) && !/[a-zA-Z]{4,}/.test(stem.replace(/<[^>]+>/g, ''));

    /* Split solution into meaningful steps */
    var cleanSol = sol
      .replace(/^\s*(?:Official\s+IB\s+Markscheme|Answer|Solution|Explanation)\s*(?:\([^)]*\))?\s*[:—\-]?\s*/i, '')
      .replace(/\*\*\[(?:M1|A1|R1|AG|B1)\]\*\*/g, '')
      .replace(/\[(?:M1|A1|R1|AG|B1)\]/g, '')
      .trim();

    /* Split on sentence boundaries outside math delimiters */
    var rawSteps = [];
    if(cleanSol){
      var buf = '', depth = 0;
      for(var i = 0; i < cleanSol.length; i++){
        var ch = cleanSol[i];
        var two = cleanSol.slice(i, i + 2);
        if(two === '\\(' || two === '\\['){ depth++; buf += two; i++; continue; }
        if(two === '\\)' || two === '\\]'){ depth = Math.max(0, depth - 1); buf += two; i++; continue; }
        if(ch === '$'){ depth = depth ? 0 : 1; buf += ch; continue; }
        if(depth === 0 && (ch === '\n' || (ch === '.' && (i + 1 === cleanSol.length || /\s/.test(cleanSol[i + 1]))))){
          if(ch === '.') buf += '.';
          var trimmed = buf.trim();
          if(trimmed.length > 6) rawSteps.push(trimmed);
          buf = '';
          continue;
        }
        buf += ch;
      }
      if(buf.trim().length > 4) rawSteps.push(buf.trim());
    }

    var h1, h2, h3;
    if(isAr){
      h1 = rawSteps.length >= 1
        ? ('الخطوة الأولى (' + dom + '): ' + _redactFinalAnswer(rawSteps[0], ansText))
        : ('حدد المعطيات الأساسية والمطلوب في مسألة «' + dom + '»، واكتب القانون المناسب.');
      h2 = rawSteps.length >= 2
        ? ('العلاقة والتعويض: ' + _redactFinalAnswer(rawSteps[1], ansText))
        : ('عوّض بالقيم المعطاة في العلاقة الرياضية وبسّط الطرفين خطوة بخطوة مع الانتباه للإشارات.');
      h3 = rawSteps.length >= 3
        ? ('التحقق والاختصار: ' + _redactFinalAnswer(rawSteps.slice(2).join(' '), ansText))
        : ('تحقق من توافق الوحدات والإشارات واستبعد الخيارات غير المنطقية للوصول إلى النتيجة الدقيقة.');
    } else {
      /* Domain-aware fallback concept nudge if solution has only 1 sentence */
      var domNudge = 'Recall the core ' + dom + ' principle that links the given quantities in the prompt.';
      if(/deriv|diff|tangent|rate/i.test(dom + ' ' + stem)){
        domNudge = 'Identify the function to differentiate and decide whether the power, product, quotient, or chain rule applies.';
      } else if(/integr|area|riemann|antideriv/i.test(dom + ' ' + stem)){
        domNudge = 'Set up the antiderivative or definite integral bounds and check whether u-substitution simplifies the integrand.';
      } else if(/trig|sine|cosine|circle|radian/i.test(dom + ' ' + stem)){
        domNudge = 'Sketch the angle/triangle or recall the Pythagorean / double-angle trigonometric identity that connects the given terms.';
      } else if(/prob|stat|normal|binomial|mean|variance/i.test(dom + ' ' + stem)){
        domNudge = 'Identify the distribution or sample space, and write down the formula for the required probability or summary statistic.';
      } else if(/matrix|vector|det|eigen|linear/i.test(dom + ' ' + stem)){
        domNudge = 'Write out the matrix/vector components clearly and apply the definition of determinant, dot product, or linear system reduction.';
      } else if(/quad|poly|factor|root|vertex/i.test(dom + ' ' + stem)){
        domNudge = 'Bring the polynomial/quadratic into standard or vertex form and consider factoring, Vieta\'s formulas, or the discriminant.';
      } else if(/geo|triangle|angle|area|volume|chord|sector/i.test(dom + ' ' + stem)){
        domNudge = 'Label the given lengths and angles on the figure and apply similarity, the Pythagorean theorem, or the area/volume formula.';
      }

      if(rawSteps.length >= 3){
        h1 = _redactFinalAnswer(rawSteps[0], ansText) || domNudge;
        h2 = _redactFinalAnswer(rawSteps[1], ansText) || 'Substitute the known values into the setup equation and isolate the target expression.';
        h3 = _redactFinalAnswer(rawSteps.slice(2).join(' '), ansText) || 'Simplify the final expression carefully and verify the sign and magnitude against the choices.';
      } else if(rawSteps.length === 2){
        h1 = domNudge;
        h2 = _redactFinalAnswer(rawSteps[0], ansText) || 'Substitute the given values into the governing equation.';
        h3 = _redactFinalAnswer(rawSteps[1], ansText) || 'Complete the algebraic simplification to isolate the final value.';
      } else if(rawSteps.length === 1){
        h1 = domNudge;
        h2 = _redactFinalAnswer(rawSteps[0], ansText) || 'Set up the main equation and substitute the given parameters.';
        h3 = 'Simplify the resulting expression step by step and double-check for sign or arithmetic traps.';
      } else {
        h1 = domNudge;
        h2 = 'Substitute the known numerical values or algebraic expressions into the formula and isolate the unknown.';
        h3 = 'Check boundary conditions, signs, and units to confirm which option matches your simplified result.';
      }
    }

    return [h1, h2, h3];
  }

  /* Render HTML for a 3-tier progressive hint bar + collapsible stack inside any question card */
  function renderHintWidget(q, uid){
    var hints = buildHints(q);
    var isAr = _isArabicText(hints[0]);
    var labels = isAr ? TIER_LABELS_AR : TIER_LABELS;
    var fmtMath = typeof window.CSQuizMath === 'function'
      ? window.CSQuizMath
      : (typeof window.esc === 'function' ? window.esc : function(s){ return String(s || ''); });
    var fmtBi = typeof window.CSFormatBilingual === 'function'
      ? window.CSFormatBilingual
      : function(s){ return s; };

    var idAttr = uid ? (' data-hint-uid="' + String(uid).replace(/"/g, '&quot;') + '"') : '';
    var tiersHtml = hints.map(function(hText, idx){
      return '<div class="cs-hint-tier" data-tier="' + (idx + 1) + '" style="display:none;margin-top:8px;padding:9px 13px;border-radius:8px;background:var(--amber-bg,#fffbeb);border-left:3.5px solid #d97706;font-size:.86rem;line-height:1.55;color:var(--ink,#1e293b)">'
        + '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:3px">'
        + '<span style="font-weight:700;font-size:.76rem;text-transform:uppercase;letter-spacing:.04em;color:#b45309">' + labels[idx] + '</span>'
        + '<button type="button" class="cs-voice-btn cs-voice-btn-sm no-print" onclick="window.CSVoiceTutor&&window.CSVoiceTutor.speakTier(this,event)" title="' + (isAr ? 'استمع إلى التلميح' : 'Listen to this hint') + '" aria-label="' + (isAr ? 'استمع إلى التلميح' : 'Listen to this hint') + '"><span>🔊</span></button>'
        + '</div>'
        + '<div class="cs-hint-body">' + fmtBi(fmtMath(hText)) + '</div>'
        + '</div>';
    }).join('');

    return '<div class="cs-hint-wrap no-print"' + idAttr + ' data-hint-step="0" style="margin:10px 0 8px">'
      + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'
      + '<button type="button" class="cs-hint-btn" onclick="window.CSHintEngine.revealNext(this)" '
      + 'style="display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:999px;border:1.5px solid #f59e0b;background:var(--amber-bg,#fffbeb);color:#b45309;font-size:.79rem;font-weight:700;cursor:pointer;transition:all .15s">'
      + '<span>💡</span><span class="cs-hint-btn-lbl">' + (isAr ? 'تلميح تدريجي (١/٣)' : 'Get Hint (1/3)') + '</span>'
      + '</button>'
      + '<button type="button" class="cs-voice-btn no-print" onclick="window.CSVoiceTutor&&window.CSVoiceTutor.speakCurrentHint(this)" title="' + (isAr ? 'استمع إلى التلميح صوتياً' : 'Listen to hint aloud') + '" aria-label="' + (isAr ? 'استمع إلى التلميح صوتياً' : 'Listen to hint aloud') + '"><span>🔊</span><span>' + (isAr ? 'استمع' : 'Listen') + '</span></button>'
      + '<span class="cs-hint-dots" style="display:inline-flex;gap:4px;align-items:center" aria-hidden="true">'
      + '<span class="cs-hdot" style="width:7px;height:7px;border-radius:50%;background:#cbd5e1;display:inline-block"></span>'
      + '<span class="cs-hdot" style="width:7px;height:7px;border-radius:50%;background:#cbd5e1;display:inline-block"></span>'
      + '<span class="cs-hdot" style="width:7px;height:7px;border-radius:50%;background:#cbd5e1;display:inline-block"></span>'
      + '</span>'
      + '</div>'
      + '<div class="cs-hint-list">' + tiersHtml + '</div>'
      + '</div>';
  }

  /* Reveal the next hint tier (1 -> 2 -> 3) when the student clicks the Hint button */
  function revealNext(btn){
    if(!btn) return;
    var wrap = btn.closest('.cs-hint-wrap');
    if(!wrap) return;
    var step = parseInt(wrap.getAttribute('data-hint-step') || '0', 10);
    var nextStep = step + 1;
    var tiers = wrap.querySelectorAll('.cs-hint-tier');
    var dots = wrap.querySelectorAll('.cs-hdot');
    if(nextStep > tiers.length) return;

    wrap.setAttribute('data-hint-step', String(nextStep));
    var targetTier = wrap.querySelector('.cs-hint-tier[data-tier="' + nextStep + '"]');
    if(targetTier){
      targetTier.style.display = 'block';
    }
    if(dots[nextStep - 1]){
      dots[nextStep - 1].style.background = '#f59e0b';
    }

    /* Mark parent question card as having used hints (feeds Adaptive Mistake Deck SRS grading) */
    var qCard = wrap.closest('.cq-item, .bank-problem, .m-deck-card, #pq-overlay');
    if(qCard) qCard.setAttribute('data-hints-used', String(nextStep));

    var lblEl = btn.querySelector('.cs-hint-btn-lbl') || btn;
    var isAr = _isArabicText(targetTier ? targetTier.textContent : '');
    if(nextStep < tiers.length){
      var nextNum = nextStep + 1;
      lblEl.textContent = isAr
        ? ('تلميح تدريجي (' + nextNum + '/٣)')
        : ('Next Hint (' + nextNum + '/' + tiers.length + ')');
    } else {
      lblEl.textContent = isAr ? '✓ تم إظهار جميع التلميحات (٣/٣)' : '✓ All 3 Hints Revealed';
      btn.style.opacity = '0.72';
      btn.style.cursor = 'default';
    }

    if(targetTier && typeof window.renderMathInElement === 'function'){
      try {
        window.renderMathInElement(targetTier, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\)', display: false},
            {left: '$', right: '$', display: false}
          ],
          throwOnError: false
        });
      } catch(e){}
    }
    if(window.MathJax && typeof MathJax.typesetPromise === 'function' && targetTier){
      MathJax.typesetPromise([targetTier]).catch(function(){});
    }
  }

  window.CSHintEngine = {
    buildHints: buildHints,
    renderHintWidget: renderHintWidget,
    revealNext: revealNext
  };
})();
