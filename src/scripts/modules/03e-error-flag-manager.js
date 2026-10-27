/* ═══════════════════════════════════════════════════════════════════════════
   Module 03e — Universal Error Flag, Auto-Revision & Deploy Sync Manager
   ───────────────────────────────────────────────────────────────────────────
   Provides window.CSErrorFlagManager across every generated & static surface:
   - Lesson Worked Examples (.example, .fcard) & Practice Problems (.problem)
   - Interactive Practice Activities (.ix-box)
   - Chapter Quizzes (.cq-item) & Practice Quiz Modal (#pq-overlay)
   - Full Bank Exams & Section Practice (.fep-item)
   - Topic Test Generator & AI Exam Generator (.aiq)
   - CBT Mock Exam Mode (.mock-q), Diagnostic CAT (.cs-diag-card), Daily Challenge
   - Adaptive Mistake Deck (.m-deck-card)

   Lifecycle:
   1. User clicks "🚩 Report Error" on any example/quiz/exam card and selects
      an issue category (Math/Font, Wrong Answer, Bad Hint/Solution, Figure, Typo).
   2. Manager captures full item snapshot + deterministic contentSignature,
      runs immediate client-side auto-repair on the card (fixing currency-$
      math collisions, broken LaTeX, or generic hints in-place), saves the flag
      to localStorage ('clipsat_error_flags_v1'), and syncs it to Supabase
      (report_question_error RPC + log_client_error fallback).
   3. On every build / git push / deploy, scripts/revise-and-fix-flagged-errors.js
      revises and fixes flagged items in content/, bank-data/, and ix-data/,
      stamps public/data/resolved-flags.json, and clears resolved flags.
   4. On page load and DOM render, syncResolvedFlags() checks /data/resolved-flags.json
      and contentSignatures, automatically removing flags once fixed.
   ═══════════════════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var STORAGE_KEY = 'clipsat_error_flags_v1';
  var BUILD_VERSION = '20261028a';
  var _activePopover = null;
  var _activeTriggerBtn = null;
  var _resolvedManifest = {
    buildVersion: BUILD_VERSION,
    resolvedFlagIds: {},
    resolvedItemIds: {},
    lastRevisedAt: null
  };

  var CATEGORIES = [
    { id: 'math_font',     icon: '🔤', en: 'Strange Font / Math Display', ar: 'خط غريب أو مشكلة في الرموز الرياضية' },
    { id: 'wrong_answer',  icon: '❌', en: 'Wrong Answer / Choice Key',   ar: 'خطأ في الإجابة الصحيحة أو الخيارات' },
    { id: 'bad_hint',      icon: '💡', en: 'Unclear Hint or Solution',    ar: 'تلميح أو شرح غير واضح أو غير مرتبط' },
    { id: 'broken_figure', icon: '📐', en: 'Diagram / Graph / Table',     ar: 'مشكلة في الرسم البياني أو الجدول' },
    { id: 'typo',          icon: '✏️', en: 'Typo / Wording Issue',        ar: 'خطأ مطبعي أو صياغة' }
  ];

  function _isArabicUI(){
    if(window.i18n && typeof window.i18n.getLocale === 'function' && window.i18n.getLocale() === 'ar') return true;
    var tr = window.CLIPSAT_TRACK || '';
    return tr === 'qudrat' || tr === 'tahsili';
  }

  /* Deterministic 32-bit FNV-1a hash for content signatures & fallback IDs */
  function hashString(str){
    var s = String(str || '').replace(/\s+/g, ' ').trim();
    var h = 0x811c9dc5;
    for(var i = 0; i < s.length; i++){
      h ^= s.charCodeAt(i);
      h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
    }
    return ('0000000' + h.toString(16)).slice(-8);
  }

  function _esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Extract clean text with original LaTeX preserved from any DOM node */
  function extractCleanTeXText(el){
    if(!el) return '';
    if(typeof el === 'string') return el.replace(/\s+/g, ' ').trim();
    if(el.getAttribute && el.getAttribute('data-raw')){
      return el.getAttribute('data-raw').replace(/\s+/g, ' ').trim();
    }
    var clone = el.cloneNode(true);
    var junk = [
      '.cs-voice-btn', '.cs-flag-btn', '.cs-flag-badge', '.cs-flag-popover',
      '.cs-hint-btn', '.cs-hint-dots', '.sol-btn', '.sol-toggle', '.aiq-sol-toggle',
      '.btn-intuition-ar', '.copy-eq-btn', '.ix-mp', 'button', 'script', 'style', 'svg'
    ];
    clone.querySelectorAll(junk.join(',')).forEach(function(n){ n.remove(); });
    clone.querySelectorAll('.katex-display, .katex').forEach(function(kEl){
      if(!kEl.parentNode) return;
      var ann = kEl.querySelector('annotation[encoding="application/x-tex"]');
      var tex = ann ? ann.textContent : '';
      if(tex){
        var isDisp = kEl.classList.contains('katex-display');
        var node = document.createTextNode(isDisp ? (' \\[' + tex + '\\] ') : (' \\(' + tex + '\\) '));
        kEl.parentNode.replaceChild(node, kEl);
      } else {
        kEl.querySelectorAll('.katex-html').forEach(function(h){ h.remove(); });
      }
    });
    return (clone.textContent || '').replace(/\s+/g, ' ').trim();
  }

  /* Read and write flags map from localStorage */
  function loadFlagsMap(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return {};
      var parsed = JSON.parse(raw);
      return (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) ? parsed : {};
    } catch(e){
      return {};
    }
  }

  function saveFlagsMap(map){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map || {}));
    } catch(e){}
    _updateQueuePill();
  }

  function getOpenFlags(){
    var map = loadFlagsMap();
    var list = [];
    for(var k in map){
      if(Object.prototype.hasOwnProperty.call(map, k) && map[k] && map[k].status !== 'resolved'){
        list.push(map[k]);
      }
    }
    return list.sort(function(a, b){
      return String(b.createdAt || '').localeCompare(String(a.createdAt || ''));
    });
  }

  /* Locate the enclosing question or example card element */
  var CARD_SELECTOR = [
    '.fep-item',
    '.cq-item',
    '.aiq',
    '.problem',
    '.ix-box',
    '.mock-q',
    '.cs-diag-card',
    '.m-deck-card',
    '#pq-overlay .pq-body',
    '#pq-overlay',
    '#dc-modal-content',
    '.example',
    '.fcard',
    '.callout.warn'
  ].join(', ');

  function findEnclosingCard(el){
    if(!el || !el.closest) return null;
    return el.closest(CARD_SELECTOR);
  }

  /* Determine source type and extract structured snapshot from a card element */
  function extractCardContext(btnOrCard){
    var card = (btnOrCard && btnOrCard.matches && btnOrCard.matches(CARD_SELECTOR))
      ? btnOrCard
      : findEnclosingCard(btnOrCard);
    if(!card) return null;

    var track = card.getAttribute('data-track') || window.CLIPSAT_TRACK || 'home';
    var chapterSec = card.closest ? card.closest('section.chapter[id]') : null;
    var topicId = card.getAttribute('data-topic-id') || (chapterSec ? chapterSec.id : '') || '';

    var sourceType = 'question';
    if(card.classList.contains('fep-item')) sourceType = 'bank-exam';
    else if(card.classList.contains('cq-item')) sourceType = 'chapter-quiz';
    else if(card.classList.contains('aiq')) sourceType = 'ai-exam';
    else if(card.classList.contains('ix-box')) sourceType = 'interactive-ix';
    else if(card.classList.contains('mock-q')) sourceType = 'mock-exam';
    else if(card.classList.contains('cs-diag-card')) sourceType = 'diagnostic-cat';
    else if(card.classList.contains('m-deck-card')) sourceType = 'mistake-deck';
    else if(card.id === 'pq-overlay' || card.classList.contains('pq-body')) sourceType = 'practice-quiz';
    else if(card.id === 'dc-modal-content') sourceType = 'daily-challenge';
    else if(card.classList.contains('problem')) sourceType = 'lesson-problem';
    else if(card.classList.contains('example') || card.classList.contains('fcard') || card.classList.contains('callout')) sourceType = 'lesson-example';

    /* Extract prompt */
    var promptEl = card.querySelector(
      '.fep-qbody, .cq-q, .aiq-text, .problem-q, .pq, .qt, #pq-q, .mock-q-stem, .cs-diag-stem, .mdeck-q, :scope > p'
    ) || card;
    var promptText = extractCleanTeXText(promptEl);

    /* Extract choices if MCQ */
    var choices = [];
    card.querySelectorAll('.fep-choice .fep-ctext, .cq-opt, .aiq-choice span:last-child, .mock-choice-text, .cs-diag-choice-text, .pq-opt, .ix-qc-opt').forEach(function(chEl){
      var t = extractCleanTeXText(chEl);
      if(t) choices.push(t);
    });

    /* Extract solution */
    var solEl = card.querySelector('.fep-sol-block, .cq-sol-box, .aiq-solution, .solution, .mdeck-sol-box, #pq-exp, .ix-sr-steps, .ix-fb');
    var solutionText = solEl ? extractCleanTeXText(solEl) : '';

    /* Extract hints */
    var hints = [];
    card.querySelectorAll('.cs-hint-tier .cs-hint-body, .hint-tier .cs-hint-body, .ix-sb-hint-box').forEach(function(hEl){
      var ht = extractCleanTeXText(hEl);
      if(ht) hints.push(ht);
    });

    /* Determine stable itemId */
    var hintWrap = card.querySelector('.cs-hint-wrap[data-hint-uid]');
    var explicitId = card.getAttribute('data-q-id')
      || card.getAttribute('data-item-id')
      || (hintWrap ? hintWrap.getAttribute('data-hint-uid') : '')
      || card.id
      || '';
    var promptHash = hashString(promptText.slice(0, 240));
    var itemId = explicitId ? (explicitId + '-' + promptHash) : (sourceType + '-' + (topicId || track) + '-' + promptHash);
    var flagId = track + ':' + sourceType + ':' + itemId;
    var contentSignature = hashString([promptText, choices.join('||'), solutionText, hints.join('||')].join('###'));

    return {
      card: card,
      flagId: flagId,
      track: track,
      topicId: topicId,
      sourceType: sourceType,
      itemId: itemId,
      prompt: promptText.slice(0, 1500),
      choices: choices.slice(0, 8),
      solution: solutionText.slice(0, 2000),
      hints: hints.slice(0, 5),
      contentSignature: contentSignature
    };
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Immediate Client-Side Auto-Revision & Verification
     ───────────────────────────────────────────────────────────────────────────
     Repairs broken currency-$ math spans, unwrapped prose in KaTeX, or generic
     hints directly in the live DOM when flagged or inspected.
     ═══════════════════════════════════════════════════════════════════════════ */
  function _rerenderKaTeX(el){
    if(!el) return;
    if(typeof window.renderMathInElement === 'function'){
      try {
        window.renderMathInElement(el, {
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '\\[', right: '\\]', display: true},
            {left: '\\(', right: '\\)', display: false}
          ],
          throwOnError: false
        });
      } catch(e){}
    }
    if(window.MathJax && typeof MathJax.typesetPromise === 'function'){
      MathJax.typesetPromise([el]).catch(function(){});
    }
  }

  function autoReviseCardInDOM(card, category){
    if(!card) return { fixedCount: 0, actions: [] };
    var fixedCount = 0;
    var actions = [];

    /* 1. Check all .katex spans inside card for accidental currency-pair prose rendering */
    card.querySelectorAll('.katex').forEach(function(kEl){
      var ann = kEl.querySelector('annotation[encoding="application/x-tex"]');
      if(!ann) return;
      var tex = ann.textContent || '';
      var stripped = tex.replace(/\\(?:text|textbf|textit|mathrm|mathbf|operatorname)\s*\{[^}]*\}/g, '').replace(/\\[a-zA-Z]+/g, ' ');
      /* Detect currency span like "2,400. If adult tickets cost " or 3+ English prose words without \text */
      if(/^\d[\d,]*(?:\.\d+)?\s*(?:[.,;:!?)%]|\s+[a-zA-Z]{2,})/.test(tex) && /[a-zA-Z]{2,}\s+[a-zA-Z]{2,}/.test(stripped)){
        var txtNode = document.createTextNode('$' + tex + '$');
        if(kEl.parentNode){
          kEl.parentNode.replaceChild(txtNode, kEl);
          fixedCount++;
          if(actions.indexOf('Restored currency dollar prose from math italics') === -1){
            actions.push('Restored currency dollar prose from math italics');
          }
        }
      } else if(/\b[a-zA-Z]{3,}\s+[a-zA-Z]{2,}\s+[a-zA-Z]{2,}\b/.test(stripped)){
        /* Unwrapped English sentence inside math mode */
        var cleanProse = tex
          .replace(/(-?\d+(?:\.\d+)?|\\frac\{[^}]+\}\{[^}]+\}|[a-zA-Z]_\d+|[a-zA-Z]\^\d+)/g, '\\($1\\)');
        var span = document.createElement('span');
        span.innerHTML = cleanProse;
        if(kEl.parentNode){
          kEl.parentNode.replaceChild(span, kEl);
          _rerenderKaTeX(span);
          fixedCount++;
          if(actions.indexOf('Unwrapped prose text inside math mode') === -1){
            actions.push('Unwrapped prose text inside math mode');
          }
        }
      }
    });

    /* 2. Check text nodes for unconverted raw $math$ or USD <num>$ corruptions */
    var walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, null, false);
    var textNodesToFix = [];
    var n;
    while((n = walker.nextNode())){
      var p = n.parentElement;
      if(!p || p.closest('.katex, script, style, textarea, code, pre')) continue;
      var val = n.nodeValue || '';
      if(/USD\s*\d+\s*\$/.test(val) || /\$(?!\s)[^$\n]+?(?<!\s)\$/.test(val)){
        textNodesToFix.push(n);
      }
    }
    textNodesToFix.forEach(function(tNode){
      var orig = tNode.nodeValue || '';
      var updated = orig.replace(/USD\s*(\d+(?:\.\d+)?)\s*\$/g, '$1');
      updated = updated.replace(/\$(?!\s)([^$\n]+?)(?<!\s)\$/g, function(m, inner){
        if(/^\d[\d,]*(?:\.\d+)?(?:$|\s*[,.;:!?)%]|\s+[a-zA-Z\u0600-\u06FF]{2,})/.test(inner)) return m;
        var st = inner.replace(/\\(?:text|textbf|textit|mathrm|mathbf|operatorname)\s*\{[^}]*\}/g, '').replace(/\\[a-zA-Z]+/g, '');
        if(/[a-zA-Z]{3,}\s+[a-zA-Z]{2,}\s+[a-zA-Z]{2,}/.test(st)) return m;
        return '\\(' + inner + '\\)';
      });
      if(updated !== orig){
        tNode.nodeValue = updated;
        if(tNode.parentElement) _rerenderKaTeX(tNode.parentElement);
        fixedCount++;
        if(actions.indexOf('Normalized raw LaTeX math delimiters') === -1){
          actions.push('Normalized raw LaTeX math delimiters');
        }
      }
    });

    /* 3. Re-synthesize progressive hints if bad_hint was reported or hints look generic */
    if((category === 'bad_hint' || category === 'other') && window.CSHintEngine && typeof window.CSHintEngine.buildHints === 'function'){
      var hintWrap = card.querySelector('.cs-hint-wrap');
      if(hintWrap){
        var ctx = extractCardContext(card);
        if(ctx && (ctx.prompt || ctx.solution)){
          var newHints = window.CSHintEngine.buildHints({
            text: ctx.prompt,
            choices: ctx.choices,
            sol: ctx.solution,
            hints: [] /* Force fresh synthesis from the worked solution */
          });
          var tierBodies = hintWrap.querySelectorAll('.cs-hint-tier .cs-hint-body');
          var fmtMath = typeof window.CSQuizMath === 'function' ? window.CSQuizMath : _esc;
          var fmtBi = typeof window.CSFormatBilingual === 'function' ? window.CSFormatBilingual : function(x){ return x; };
          tierBodies.forEach(function(bEl, idx){
            if(newHints[idx]){
              bEl.innerHTML = fmtBi(fmtMath(newHints[idx]));
              _rerenderKaTeX(bEl);
            }
          });
          fixedCount++;
          actions.push('Regenerated 3-tier hints from worked solution');
        }
      }
    }

    /* 4. Re-run KaTeX on the entire card to ensure no unrendered \(...\) or \[...\] remain */
    _rerenderKaTeX(card);

    return { fixedCount: fixedCount, actions: actions };
  }

  /* Verify whether a card in the DOM is clean of known rendering defects */
  function verifyCardClean(card){
    if(!card) return true;
    var hasBrokenKatex = false;
    card.querySelectorAll('.katex').forEach(function(kEl){
      var ann = kEl.querySelector('annotation[encoding="application/x-tex"]');
      if(!ann) return;
      var tex = ann.textContent || '';
      var stripped = tex.replace(/\\(?:text|textbf|textit|mathrm|mathbf|operatorname)\s*\{[^}]*\}/g, '').replace(/\\[a-zA-Z]+/g, ' ');
      if(/^\d[\d,]*(?:\.\d+)?\s*(?:[.,;:!?)%]|\s+[a-zA-Z]{2,})/.test(tex) && /[a-zA-Z]{2,}\s+[a-zA-Z]{2,}/.test(stripped)){
        hasBrokenKatex = true;
      }
    });
    if(hasBrokenKatex) return false;
    if(card.querySelector('.katex-error')) return false;
    return true;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Cloud Sync to Supabase (report_question_error RPC + log_client_error backup)
     ═══════════════════════════════════════════════════════════════════════════ */
  function _syncFlagToCloud(flagRecord){
    var cloud = window.ClipSATCloud;
    if(!cloud || !cloud.configured || !cloud.ready) return;
    cloud.ready.then(function(){
      var sb = cloud.getClient && cloud.getClient();
      if(!sb) return;
      /* 1. Dedicated question_error_flags table RPC */
      sb.rpc('report_question_error', {
        p_flag_id: flagRecord.flagId,
        p_track: flagRecord.track,
        p_topic_id: flagRecord.topicId || null,
        p_source_type: flagRecord.sourceType,
        p_item_id: flagRecord.itemId,
        p_category: flagRecord.category,
        p_note: flagRecord.note || null,
        p_question_snapshot: {
          prompt: flagRecord.prompt,
          choices: flagRecord.choices,
          solution: flagRecord.solution,
          hints: flagRecord.hints
        },
        p_content_signature: flagRecord.contentSignature
      }).then(function(){}, function(){});

      /* 2. Also log through log_client_error so it works even before schema migration is applied */
      sb.rpc('log_client_error', {
        p_message: '[QUESTION_ERROR_FLAG] ' + flagRecord.flagId + ' (' + flagRecord.category + ')' + (flagRecord.note ? ': ' + flagRecord.note : ''),
        p_track: flagRecord.track,
        p_source: 'question-error-flag:' + flagRecord.sourceType + ':' + flagRecord.itemId,
        p_line: 0,
        p_col: 0,
        p_stack: JSON.stringify(flagRecord).slice(0, 3900),
        p_page_url: location.href,
        p_user_agent: navigator.userAgent
      }).then(function(){}, function(){});
    }, function(){});
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Button State & Popover UI
     ═══════════════════════════════════════════════════════════════════════════ */
  function _injectStyles(){
    if(document.getElementById('cs-error-flag-styles')) return;
    var st = document.createElement('style');
    st.id = 'cs-error-flag-styles';
    st.textContent = [
      '.cs-flag-btn{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;border:1px solid var(--border,#cbd5e1);background:var(--paper,#fff);color:var(--muted,#64748b);font-size:.75rem;font-weight:600;cursor:pointer;transition:all .15s ease;line-height:1.2;font-family:var(--sans,sans-serif)}',
      '.cs-flag-btn:hover{border-color:#f59e0b;color:#b45309;background:#fffbeb}',
      '.cs-flag-btn.is-flagged{border-color:#ef4444;background:#fef2f2;color:#b91c1c;font-weight:700}',
      '.cs-flag-btn.is-auto-fixed{border-color:#10b981;background:#ecfdf5;color:#047857;font-weight:700}',
      '.cs-flag-popover{position: fixed;z-index:99999;width:min(340px,calc(100vw - 24px));background:var(--paper,#fff);border:1.5px solid var(--border,#cbd5e1);border-radius:12px;box-shadow:0 12px 32px rgba(15,23,42,.18);padding:14px;font-family:var(--sans,sans-serif);color:var(--ink,#0f172a);font-size:.82rem}',
      '.cs-flag-cat-list{display:flex;flex-direction:column;gap:5px;margin:8px 0}',
      '.cs-flag-cat-btn{display:flex;align-items:center;gap:8px;width:100%;text-align:left;padding:7px 10px;border-radius:8px;border:1px solid var(--border,#e2e8f0);background:var(--paper-2,#f8fafc);color:var(--ink,#1e293b);font-size:.8rem;font-weight:600;cursor:pointer;transition:all .12s}',
      '.cs-flag-cat-btn:hover,.cs-flag-cat-btn.selected{border-color:#f59e0b;background:#fffbeb;color:#92400e}',
      '.cs-flag-note{width:100%;box-sizing:border-box;padding:7px 9px;border-radius:7px;border:1px solid var(--border,#cbd5e1);font-size:.79rem;font-family:inherit;margin-top:4px;background:var(--paper,#fff);color:var(--ink,#0f172a)}',
      '.cs-flag-actions{display:flex;align-items:center;justify-content: flex-end;gap:8px;margin-top:10px}',
      '.cs-flag-submit{padding:6px 13px;border-radius:8px;border:none;background:#dc2626;color:#fff;font-weight:700;font-size:.79rem;cursor:pointer}',
      '.cs-flag-submit:hover{background:#b91c1c}',
      '.cs-flag-cancel{padding:6px 10px;border-radius:8px;border:1px solid var(--border,#cbd5e1);background:transparent;color:var(--muted,#64748b);font-weight:600;font-size:.78rem;cursor:pointer}',
      '.cs-flag-queue-pill{position:fixed;bottom:16px;left:16px;z-index:9990;display:none;align-items:center;gap:6px;padding:7px 13px;border-radius:999px;background:#1e293b;color:#fff;font-size:.78rem;font-weight:700;border:1.5px solid #f59e0b;box-shadow:0 6px 20px rgba(0,0,0,.22);cursor:pointer;font-family:var(--sans,sans-serif)}',
      '@media print{.cs-flag-btn,.cs-flag-popover,.cs-flag-queue-pill{display:none!important}}'
    ].join('\n');
    document.head.appendChild(st);
  }

  function renderFlagButton(uid){
    var isAr = _isArabicUI();
    var idAttr = uid ? (' data-flag-uid="' + _esc(uid) + '"') : '';
    return '<button type="button" class="cs-flag-btn no-print"' + idAttr
      + ' onclick="window.CSErrorFlagManager&&window.CSErrorFlagManager.openReportPopover(this,event)"'
      + ' title="' + (isAr ? 'الإبلاغ عن خطأ في هذا السؤال أو المثال ليتم مراجعته وإصلاحه تلقائياً' : 'Report an error in this question or example for automatic revision & fix') + '"'
      + ' aria-label="' + (isAr ? 'إبلاغ عن خطأ' : 'Report Error') + '">'
      + '<span>🚩</span><span class="cs-flag-lbl">' + (isAr ? 'إبلاغ عن خطأ' : 'Report Error') + '</span>'
      + '</button>';
  }

  function _syncButtonAppearance(btn, card){
    if(!btn) return;
    var ctx = extractCardContext(card || btn);
    if(!ctx) return;
    var map = loadFlagsMap();
    var rec = map[ctx.flagId];
    var isAr = _isArabicUI();
    var lbl = btn.querySelector('.cs-flag-lbl');
    if(rec && rec.status === 'open'){
      /* Check if this flag was already resolved by a newer build or content change */
      if(_shouldAutoClearFlag(rec, ctx)){
        delete map[ctx.flagId];
        saveFlagsMap(map);
        btn.classList.remove('is-flagged');
        btn.classList.add('is-auto-fixed');
        if(lbl) lbl.textContent = isAr ? '✓ تم الإصلاح' : '✓ Fixed';
        setTimeout(function(){
          btn.classList.remove('is-auto-fixed');
          if(lbl) lbl.textContent = isAr ? 'إبلاغ عن خطأ' : 'Report Error';
        }, 3500);
        return;
      }
      btn.classList.add('is-flagged');
      if(lbl) lbl.textContent = isAr ? '🚩 قيد المراجعة' : '🚩 Flagged';
    } else {
      btn.classList.remove('is-flagged', 'is-auto-fixed');
      if(lbl) lbl.textContent = isAr ? 'إبلاغ عن خطأ' : 'Report Error';
    }
  }

  function _shouldAutoClearFlag(rec, currentCtx){
    if(!rec) return false;
    if(_resolvedManifest.resolvedFlagIds[rec.flagId] || _resolvedManifest.resolvedItemIds[rec.itemId]){
      return true;
    }
    /* If the question/solution/hint content changed since the flag was created, the deploy revised it! */
    if(currentCtx && rec.contentSignature && currentCtx.contentSignature && rec.contentSignature !== currentCtx.contentSignature){
      return true;
    }
    /* If buildVersion advanced and the card now passes clean verification */
    if(_resolvedManifest.buildVersion && rec.buildVersion && _resolvedManifest.buildVersion !== rec.buildVersion){
      if(currentCtx && currentCtx.card && verifyCardClean(currentCtx.card)){
        return true;
      }
    }
    return false;
  }

  function closePopover(){
    if(_activePopover && _activePopover.parentNode){
      _activePopover.parentNode.removeChild(_activePopover);
    }
    _activePopover = null;
    _activeTriggerBtn = null;
  }

  function openReportPopover(btn, evt){
    if(evt && typeof evt.stopPropagation === 'function') evt.stopPropagation();
    _injectStyles();
    if(_activePopover && _activeTriggerBtn === btn){
      closePopover();
      return;
    }
    closePopover();
    _activeTriggerBtn = btn;

    var ctx = extractCardContext(btn);
    if(!ctx) return;

    var map = loadFlagsMap();
    var existing = map[ctx.flagId];
    var isAr = _isArabicUI();

    var pop = document.createElement('div');
    pop.className = 'cs-flag-popover no-print';
    pop.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    if(existing && existing.status === 'open'){
      pop.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">'
        + '<strong style="color:#b91c1c;font-size:.86rem">🚩 ' + (isAr ? 'تم تسجيل هذا البلاغ للمراجعة' : 'Flagged for Revision & Fix') + '</strong>'
        + '<button type="button" class="cs-flag-cancel" style="padding:2px 7px" onclick="window.CSErrorFlagManager.closePopover()">✕</button>'
        + '</div>'
        + '<div style="font-size:.78rem;color:var(--muted,#475569);line-height:1.5;margin-bottom:10px">'
        + '<div><strong>ID:</strong> <code>' + _esc(ctx.itemId) + '</code></div>'
        + '<div><strong>' + (isAr ? 'النوع:' : 'Category:') + '</strong> ' + _esc(existing.category) + '</div>'
        + (existing.note ? ('<div><strong>' + (isAr ? 'ملاحظة:' : 'Note:') + '</strong> ' + _esc(existing.note) + '</div>') : '')
        + (existing.autoFixActions && existing.autoFixActions.length
            ? ('<div style="color:#047857;margin-top:4px">✓ ' + _esc(existing.autoFixActions.join('; ')) + '</div>')
            : '<div style="margin-top:4px">' + (isAr ? 'سيتم مراجعة هذا السؤال وإصلاحه وإزالة العلامة تلقائياً عند التحديث/النشر.' : 'Queued for automatic revision & flag removal on build/push/deploy.') + '</div>')
        + '</div>'
        + '<div class="cs-flag-actions">'
        + '<button type="button" class="cs-flag-cancel" data-action="unflag">' + (isAr ? '✓ تم الإصلاح (إزالة العلامة)' : '✓ Fixed (Remove Flag)') + '</button>'
        + '<button type="button" class="cs-flag-submit" style="background:#0f766e" data-action="autofix">' + (isAr ? '🔧 إعادة الفحص والإصلاح الآن' : '🔧 Re-Run Auto-Fix Now') + '</button>'
        + '</div>';

      pop.querySelector('[data-action="unflag"]').onclick = function(){
        removeFlag(ctx.flagId, btn, ctx.card);
        closePopover();
      };
      pop.querySelector('[data-action="autofix"]').onclick = function(){
        var res = autoReviseCardInDOM(ctx.card, existing.category);
        if(res.fixedCount > 0 && verifyCardClean(ctx.card)){
          removeFlag(ctx.flagId, btn, ctx.card);
        }
        closePopover();
      };
    } else {
      var selectedCat = 'math_font';
      var catsHtml = CATEGORIES.map(function(c, idx){
        return '<button type="button" class="cs-flag-cat-btn' + (idx === 0 ? ' selected' : '') + '" data-cat="' + c.id + '">'
          + '<span>' + c.icon + '</span><span>' + (isAr ? c.ar : c.en) + '</span>'
          + '</button>';
      }).join('');

      pop.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">'
        + '<strong style="font-size:.86rem">🚩 ' + (isAr ? 'الإبلاغ عن خطأ في السؤال أو المثال' : 'Report Error in Example / Question') + '</strong>'
        + '<button type="button" class="cs-flag-cancel" style="padding:2px 7px" onclick="window.CSErrorFlagManager.closePopover()">✕</button>'
        + '</div>'
        + '<div style="font-size:.75rem;color:var(--muted,#64748b)">'
        + (isAr ? 'اختر نوع المشكلة ليتم إصلاحها الآن ومراجعتها تلقائياً عند النشر:' : 'Select the issue so it can be revised, fixed, and cleared automatically on deploy:')
        + '</div>'
        + '<div class="cs-flag-cat-list">' + catsHtml + '</div>'
        + '<input type="text" class="cs-flag-note" placeholder="' + (isAr ? 'ملاحظة إضافية أو التصحيح المقترح (اختياري)...' : 'Optional note or expected correction...') + '">'
        + '<div class="cs-flag-actions">'
        + '<button type="button" class="cs-flag-cancel" onclick="window.CSErrorFlagManager.closePopover()">' + (isAr ? 'إلغاء' : 'Cancel') + '</button>'
        + '<button type="button" class="cs-flag-submit" data-action="submit">🚩 ' + (isAr ? 'إبلاغ وإصلاح تلقائي' : 'Flag & Auto-Fix') + '</button>'
        + '</div>';

      var catBtns = pop.querySelectorAll('.cs-flag-cat-btn');
      catBtns.forEach(function(cb){
        cb.onclick = function(){
          catBtns.forEach(function(x){ x.classList.remove('selected'); });
          cb.classList.add('selected');
          selectedCat = cb.getAttribute('data-cat') || 'other';
        };
      });

      var noteInput = pop.querySelector('.cs-flag-note');
      pop.querySelector('[data-action="submit"]').onclick = function(){
        var noteVal = noteInput ? noteInput.value.trim() : '';
        submitFlag(ctx, selectedCat, noteVal, btn);
        closePopover();
      };
    }

    document.body.appendChild(pop);
    _activePopover = pop;

    /* Position popover near trigger button */
    var rect = btn.getBoundingClientRect();
    var popRect = pop.getBoundingClientRect();
    var top = rect.bottom + 8;
    if(top + popRect.height > window.innerHeight - 12){
      top = Math.max(12, rect.top - popRect.height - 8);
    }
    var left = Math.min(Math.max(12, rect.left), window.innerWidth - popRect.width - 12);
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
  }

  function submitFlag(ctx, category, note, btn){
    if(!ctx) return null;
    /* Run immediate client-side auto-repair on the card */
    var repairResult = autoReviseCardInDOM(ctx.card, category);

    /* Re-compute signature before/after */
    var record = {
      flagId: ctx.flagId,
      track: ctx.track,
      topicId: ctx.topicId,
      sourceType: ctx.sourceType,
      itemId: ctx.itemId,
      category: category || 'other',
      note: note || '',
      prompt: ctx.prompt,
      choices: ctx.choices,
      solution: ctx.solution,
      hints: ctx.hints,
      contentSignature: ctx.contentSignature,
      buildVersion: _resolvedManifest.buildVersion || BUILD_VERSION,
      autoFixActions: repairResult.actions || [],
      status: 'open',
      createdAt: new Date().toISOString()
    };

    var map = loadFlagsMap();
    map[ctx.flagId] = record;
    saveFlagsMap(map);

    if(btn) _syncButtonAppearance(btn, ctx.card);
    _syncFlagToCloud(record);
    return record;
  }

  function removeFlag(flagId, btn, card){
    var map = loadFlagsMap();
    if(map[flagId]){
      delete map[flagId];
      saveFlagsMap(map);
    }
    if(btn) _syncButtonAppearance(btn, card);
    /* Also notify Supabase if configured */
    var cloud = window.ClipSATCloud;
    if(cloud && cloud.configured && cloud.ready){
      cloud.ready.then(function(){
        var sb = cloud.getClient && cloud.getClient();
        if(sb){
          sb.rpc('resolve_question_error', {
            p_flag_id: flagId,
            p_build_version: _resolvedManifest.buildVersion || BUILD_VERSION
          }).then(function(){}, function(){});
        }
      }, function(){});
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Floating Flagged Queue Pill & Inspector Modal
     ═══════════════════════════════════════════════════════════════════════════ */
  function _updateQueuePill(){
    if(typeof document === 'undefined' || !document.body) return;
    _injectStyles();
    var pill = document.getElementById('cs-flag-queue-pill');
    var openList = getOpenFlags();
    if(!openList.length){
      if(pill) pill.style.display = 'none';
      return;
    }
    if(!pill){
      pill = document.createElement('button');
      pill.id = 'cs-flag-queue-pill';
      pill.type = 'button';
      pill.className = 'cs-flag-queue-pill no-print';
      pill.onclick = openQueueModal;
      document.body.appendChild(pill);
    }
    var isAr = _isArabicUI();
    pill.innerHTML = '<span>🚩</span><span>'
      + (isAr ? (openList.length + ' بلاغات للمراجعة') : (openList.length + ' Flagged for Fix'))
      + '</span>';
    pill.style.display = 'inline-flex';
  }

  function openQueueModal(){
    var existingModal = document.getElementById('cs-flag-queue-modal');
    if(existingModal) existingModal.remove();
    var openList = getOpenFlags();
    var isAr = _isArabicUI();

    var overlay = document.createElement('div');
    overlay.id = 'cs-flag-queue-modal';
    overlay.className = 'no-print';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:99998;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;padding:16px;font-family:var(--sans,sans-serif)';

    var rowsHtml = openList.length ? openList.map(function(f){
      return '<div style="padding:10px 12px;border:1px solid var(--border,#e2e8f0);border-radius:8px;background:var(--paper-2,#f8fafc);margin-bottom:8px;display:flex;justify-content:space-between;gap:10px;align-items:flex-start">'
        + '<div style="font-size:.79rem;line-height:1.45">'
        + '<div><strong>[' + _esc(f.track.toUpperCase()) + ' · ' + _esc(f.sourceType) + ']</strong> <code>' + _esc(f.itemId) + '</code> — <span style="color:#b91c1c;font-weight:700">' + _esc(f.category) + '</span></div>'
        + '<div style="color:var(--muted,#475569);margin-top:3px">' + _esc((f.prompt || '').slice(0, 140)) + '</div>'
        + (f.note ? ('<div style="color:#0f172a;margin-top:2px"><em>Note:</em> ' + _esc(f.note) + '</div>') : '')
        + '</div>'
        + '<button type="button" class="cs-flag-cancel" data-clear-id="' + _esc(f.flagId) + '" style="white-space:nowrap">✓ Clear</button>'
        + '</div>';
    }).join('') : ('<p style="color:var(--muted,#64748b);font-size:.84rem">' + (isAr ? 'لا توجد بلاغات مفتوحة حالياً.' : 'No open error flags.') + '</p>');

    overlay.innerHTML = '<div style="background:var(--paper,#fff);color:var(--ink,#0f172a);max-width:640px;width:100%;max-height:82vh;border-radius:14px;padding:18px;display:flex;flex-direction:column;box-shadow:0 20px 50px rgba(0,0,0,.25)">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">'
      + '<h3 style="margin:0;font-size:1rem">🚩 ' + (isAr ? 'قائمة الأسئلة والأمثلة المبلّغ عنها (' + openList.length + ')' : 'Flagged Examples, Quizzes & Exams (' + openList.length + ')') + '</h3>'
      + '<button type="button" class="cs-flag-cancel" id="cs-fq-close">✕</button>'
      + '</div>'
      + '<p style="margin:0 0 10px;font-size:.78rem;color:var(--muted,#64748b)">'
      + (isAr
          ? 'تتم مراجعة هذه البلاغات وإصلاحها وإزالة العلامات تلقائياً في كل عملية تحديث أو نشر (Push / Deploy).'
          : 'All flagged items are automatically revised, fixed, and cleared on every build, git push, and deploy.')
      + '</p>'
      + '<div style="overflow-y:auto;flex:1;padding-right:4px">' + rowsHtml + '</div>'
      + '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:12px;flex-wrap:wrap">'
      + '<button type="button" class="cs-flag-cancel" id="cs-fq-export">📋 Copy error-flags.json</button>'
      + '<div style="display:flex;gap:8px">'
      + '<button type="button" class="cs-flag-cancel" id="cs-fq-clear-all">✓ Clear All Resolved</button>'
      + '<button type="button" class="cs-flag-submit" style="background:#0f766e" id="cs-fq-fix-all">🔧 Revise & Fix All in Page</button>'
      + '</div></div></div>';

    document.body.appendChild(overlay);
    overlay.querySelector('#cs-fq-close').onclick = function(){ overlay.remove(); };
    overlay.onclick = function(e){ if(e.target === overlay) overlay.remove(); };

    overlay.querySelectorAll('[data-clear-id]').forEach(function(b){
      b.onclick = function(){
        var id = b.getAttribute('data-clear-id');
        removeFlag(id);
        enhanceContainer(document.body);
        openQueueModal();
      };
    });

    overlay.querySelector('#cs-fq-export').onclick = function(e){
      var payload = JSON.stringify({
        version: 1,
        lastRevisedAt: new Date().toISOString(),
        buildVersion: _resolvedManifest.buildVersion || BUILD_VERSION,
        openFlags: getOpenFlags(),
        resolvedFlags: []
      }, null, 2);
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(payload).then(function(){
          e.target.textContent = '✓ Copied JSON!';
        });
      }
    };

    overlay.querySelector('#cs-fq-clear-all').onclick = function(){
      saveFlagsMap({});
      enhanceContainer(document.body);
      overlay.remove();
    };

    overlay.querySelector('#cs-fq-fix-all').onclick = function(){
      document.querySelectorAll(CARD_SELECTOR).forEach(function(c){
        autoReviseCardInDOM(c, 'other');
      });
      saveFlagsMap({});
      enhanceContainer(document.body);
      overlay.remove();
    };
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     Auto-Inject 🚩 Report Error Buttons into All Examples, Quizzes & Exams
     ═══════════════════════════════════════════════════════════════════════════ */
  function enhanceContainer(root){
    if(typeof document === 'undefined') return;
    _injectStyles();
    var scope = root || document.body;
    if(!scope || !scope.querySelectorAll) return;

    /* 1. Sync any existing .cs-flag-btn buttons */
    scope.querySelectorAll('.cs-flag-btn').forEach(function(btn){
      _syncButtonAppearance(btn);
    });

    /* 2. Attach .cs-flag-btn to any static/dynamic example, problem, quiz, or exam card that lacks one */
    var cards = scope.querySelectorAll(CARD_SELECTOR);
    cards.forEach(function(card, idx){
      if(card.querySelector('.cs-flag-btn')) return;
      /* Skip plain fcards that are formula summary tiles rather than worked examples */
      if(card.classList.contains('fcard') && !card.querySelector('.solution, .we-actions') && !/example|problem|مثال/i.test(card.textContent || '')){
        return;
      }

      var wrapperHtml = renderFlagButton('auto-' + idx);
      var temp = document.createElement('span');
      temp.innerHTML = wrapperHtml;
      var btn = temp.firstElementChild;
      if(!btn) return;

      /* Place button in the cleanest action bar or header inside the card */
      var targetBar = card.querySelector(
        '.cs-hint-wrap > div:first-child, .we-actions, .aiq-head, .fep-item-head, .cs-diag-head, .mock-q-head'
      );
      if(!targetBar && card.classList.contains('problem')){
        var solToggle = card.querySelector('.sol-toggle, .sol-btn');
        if(solToggle && solToggle.parentElement) targetBar = solToggle.parentElement;
      }
      if(!targetBar && card.classList.contains('ix-box')){
        var ixVoice = card.querySelector('.cs-voice-btn');
        if(ixVoice && ixVoice.parentElement) targetBar = ixVoice.parentElement;
      }
      if(targetBar){
        targetBar.appendChild(btn);
      } else {
        var foot = document.createElement('div');
        foot.className = 'cs-flag-bar no-print';
        foot.style.cssText = 'display:flex;justify-content:flex-end;margin-top:8px';
        foot.appendChild(btn);
        card.appendChild(foot);
      }
      _syncButtonAppearance(btn, card);
    });

    _updateQueuePill();
  }

  /* Fetch /data/resolved-flags.json on startup and automatically clear fixed flags */
  function syncResolvedFlags(){
    if(typeof fetch !== 'function') return Promise.resolve();
    return fetch('/data/resolved-flags.json?v=' + Date.now())
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(data){
        if(!data || typeof data !== 'object') return;
        if(data.buildVersion) _resolvedManifest.buildVersion = data.buildVersion;
        if(data.lastRevisedAt) _resolvedManifest.lastRevisedAt = data.lastRevisedAt;
        (data.resolvedFlagIds || []).forEach(function(id){ _resolvedManifest.resolvedFlagIds[id] = true; });
        (data.resolvedItemIds || []).forEach(function(id){ _resolvedManifest.resolvedItemIds[id] = true; });

        var map = loadFlagsMap();
        var changed = false;
        for(var k in map){
          if(Object.prototype.hasOwnProperty.call(map, k)){
            var rec = map[k];
            if(_resolvedManifest.resolvedFlagIds[rec.flagId] || _resolvedManifest.resolvedItemIds[rec.itemId]){
              delete map[k];
              changed = true;
            }
          }
        }
        if(changed) saveFlagsMap(map);
        enhanceContainer(document.body);
      })
      .catch(function(){});
  }

  /* Close popover on outside click or Escape */
  if(typeof document !== 'undefined'){
    document.addEventListener('click', function(e){
      if(_activePopover && !_activePopover.contains(e.target) && (!_activeTriggerBtn || !_activeTriggerBtn.contains(e.target))){
        closePopover();
      }
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && _activePopover) closePopover();
    });

    var _init = function(){
      enhanceContainer(document.body);
      syncResolvedFlags();
      if(typeof MutationObserver === 'function' && document.body){
        var _timer = null;
        var obs = new MutationObserver(function(mutations){
          var shouldRun = false;
          for(var i = 0; i < mutations.length; i++){
            if(mutations[i].addedNodes && mutations[i].addedNodes.length){
              shouldRun = true;
              break;
            }
          }
          if(shouldRun){
            if(_timer) clearTimeout(_timer);
            _timer = setTimeout(function(){ enhanceContainer(document.body); }, 180);
          }
        });
        obs.observe(document.body, { childList: true, subtree: true });
      }
    };

    if(document.readyState === 'loading'){
      document.addEventListener('DOMContentLoaded', _init);
    } else {
      setTimeout(_init, 0);
    }
  }

  window.CSErrorFlagManager = {
    renderFlagButton: renderFlagButton,
    openReportPopover: openReportPopover,
    closePopover: closePopover,
    extractCardContext: extractCardContext,
    autoReviseCardInDOM: autoReviseCardInDOM,
    verifyCardClean: verifyCardClean,
    submitFlag: submitFlag,
    removeFlag: removeFlag,
    getOpenFlags: getOpenFlags,
    openQueueModal: openQueueModal,
    enhanceContainer: enhanceContainer,
    syncResolvedFlags: syncResolvedFlags
  };
})();
