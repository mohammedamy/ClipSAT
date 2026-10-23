/* ═══════════════════════════════════════════════════════════════════════════
   13-mistakes-review.js — Adaptive Mistake Deck (Active Recall + 3-Tier Hints)
   Implements Leitner Spaced-Repetition interactive re-testing with multiple
   choice reconstruction, progressive 3-tier hints, root-cause error tagging,
   and 1-click AI follow-up practice quizzes.
   ═══════════════════════════════════════════════════════════════════════════ */
function clearMistakes(){
  var all = (window.ML && typeof window.ML.getAll === 'function') ? window.ML.getAll() : _mistakes;
  if(!confirm('Clear all ' + all.length + ' recorded mistakes?')) return;
  if(window.ML && typeof window.ML.clear === 'function') window.ML.clear();
  _mistakes = []; _saveMistakes();
  var badge = document.getElementById('mistakeBadge');
  if(badge) badge.textContent = '';
  var btn = document.getElementById('mistakeBtn');
  if(btn) btn.textContent = '📋 Mistakes';
  openMistakes();
}

/* Tag-aware escape — preserves real HTML markup (<br>, <strong>, <em>) while escaping bare math < and > */
function escHtml(s){
  if(!s) return '';
  s = String(s);
  var out='', i=0, L=s.length;
  while(i<L){
    if(s[i]==='<' && i+1<L && (s[i+1]==='/' || /[a-zA-Z]/.test(s[i+1]))){
      var tj=s.indexOf('>', i);
      if(tj!==-1){ out+=s.slice(i, tj+1); i=tj+1; continue; }
    }
    var c=s[i];
    if(c==='&') out+='&amp;';
    else if(c==='<') out+='&lt;';
    else if(c==='>') out+='&gt;';
    else out+=c;
    i++;
  }
  return out;
}

/* Reconstruct 4 multiple-choice options for active-recall re-testing of a saved mistake */
function _buildDeckChoices(m){
  var right = String(m.right != null ? m.right : '').trim();
  var wrong = String(m.wrong != null ? m.wrong : '').trim();
  var pool = [];
  if(Array.isArray(m.choices) && m.choices.length >= 2){
    pool = m.choices.slice();
  } else {
    pool = [right];
    if(wrong && wrong !== right) pool.push(wrong);
    /* Pull 2 plausible distractors from the same track's bank if loaded, or numeric perturbations */
    var numMatch = /^[-+]?\d+(?:\.\d+)?$/.exec(right.replace(/\\\(|\\\)|\$/g, '').trim());
    if(numMatch){
      var v = parseFloat(numMatch[0]);
      var cands = [String(v + 1), String(v - 1), String(v * 2), String(-v)];
      for(var i = 0; i < cands.length && pool.length < 4; i++){
        if(pool.indexOf(cands[i]) === -1) pool.push(cands[i]);
      }
    }
  }
  /* Ensure `right` is in pool */
  var hasRight = pool.some(function(c){ return String(c).trim() === right; });
  if(!hasRight && right) pool[0] = right;

  var shuffled = window._shuffle ? window._shuffle(pool.slice()) : pool.slice();
  var ansIdx = 0;
  for(var j = 0; j < shuffled.length; j++){
    if(String(shuffled[j]).trim() === right){ ansIdx = j; break; }
  }
  return { choices: shuffled, ansIdx: ansIdx };
}

window._closeMqReview = function(){
  var o = document.getElementById('mq-review-overlay');
  if(o) o.remove();
};

/* Core Adaptive Mistake Deck Session Launcher */
window.launchAdaptiveMistakeDeck = function(opts){
  opts = opts || {};
  var stack = [];
  if(Array.isArray(opts.customStack) && opts.customStack.length){
    stack = opts.customStack.slice();
  } else if(window.ML && typeof window.ML.getAdaptiveDeck === 'function'){
    stack = window.ML.getAdaptiveDeck(opts);
  } else {
    stack = (_mistakes || []).slice(0, 10);
  }

  if(!stack.length){
    alert('No mistakes in your deck yet! Answer some quiz questions first.');
    return;
  }

  closeMistakes();
  var existing = document.getElementById('mq-review-overlay');
  if(existing) existing.remove();
  var ov = document.createElement('div');
  ov.id = 'mq-review-overlay';
  if(window._ensurePracticeQuiz) window._ensurePracticeQuiz().catch(function(){});
  ov.style.cssText = 'position:fixed;inset:0;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,.68);z-index:99500;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto';
  document.body.appendChild(ov);

  var idx = 0;
  var promotedCount = 0;
  var correctCount = 0;

  var _wm = function(s){
    if(typeof window.CSAutoMath === 'function') s = window.CSAutoMath(s);
    if(!s) return '';
    s = String(s);
    if(s.indexOf('\\(')===-1 && s.indexOf('\\[')===-1 && s.indexOf('\\')!==-1) s='\\('+s+'\\)';
    return typeof window.CSQuizMath === 'function' ? window.CSQuizMath(s) : escHtml(s);
  };

  function showCard(){
    if(idx >= stack.length){
      _mistakes = window.ML ? window.ML.getAll() : _mistakes;
      ov.innerHTML = '<div style="background:var(--panel,#fff);border-radius:16px;padding:32px;text-align:center;max-width:480px;width:92%;margin:auto;box-shadow:0 20px 50px rgba(0,0,0,.25)">'
        + '<div style="font-size:2.6rem;margin-bottom:10px">🎯</div>'
        + '<h3 style="color:var(--indigo,#1e3a6e);margin:0 0 8px;font-size:1.3rem">Adaptive Deck Session Complete!</h3>'
        + '<p style="color:var(--muted,#64748b);font-size:.92rem;line-height:1.55;margin:0 0 18px">'
        + 'Answered <b>' + correctCount + ' / ' + stack.length + '</b> correctly on active recall.<br>'
        + 'Promoted <b>' + promotedCount + '</b> card' + (promotedCount !== 1 ? 's' : '') + ' up the Leitner Mastery Boxes.'
        + '</p>'
        + '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">'
        + '<button onclick="window._closeMqReview();window.openMistakes()" style="padding:10px 20px;background:var(--paper-2,#f1f5f9);color:var(--ink,#0f172a);border:1px solid var(--line,#cbd5e1);border-radius:8px;cursor:pointer;font-weight:700">📋 View Mistake Deck</button>'
        + '<button onclick="window._closeMqReview()" style="padding:10px 24px;background:var(--indigo,#1e3a6e);color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700">Done ✓</button>'
        + '</div></div>';
      return;
    }

    var m = stack[idx];
    var box = (m.box >= 1 && m.box <= 4) ? m.box : 1;
    var deckQ = _buildDeckChoices(m);
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    var hintHtml = (window.CSHintEngine && typeof window.CSHintEngine.renderHintWidget === 'function')
      ? window.CSHintEngine.renderHintWidget({
          text: m.q,
          domain: m.domain || m.src || 'Mathematics',
          sol: m.sol || ('The correct answer is ' + m.right + '.'),
          right: m.right,
          hints: m.hints
        }, 'mdeck-' + idx)
      : '';

    var aiPrompt = 'I got this question wrong. Please explain it step by step.\nQuestion: ' + m.q + '\nI answered: ' + m.wrong + '\nCorrect answer: ' + m.right;

    ov.innerHTML = '<div class="m-deck-card" style="background:var(--panel,#fff);border-radius:16px;padding:24px 26px;max-width:600px;width:94%;margin:auto;position:relative;box-shadow:0 20px 50px rgba(0,0,0,.25)">'
      + '<button onclick="window._closeMqReview&&window._closeMqReview()" style="position:absolute;top:12px;right:14px;background:none;border:none;font-size:1.4rem;line-height:1;cursor:pointer;color:var(--muted)" title="Close">&times;</button>'
      + '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px">'
      + '  <span style="font-size:.76rem;font-weight:800;color:var(--indigo,#1e3a6e);background:#e0e7ff;padding:3px 10px;border-radius:999px">Card ' + (idx + 1) + ' of ' + stack.length + '</span>'
      + '  <span id="mdeck-box-badge" style="font-size:.73rem;font-weight:700;padding:3px 9px;border-radius:999px;background:#fef3c7;color:#b45309">Leitner Box ' + box + '/4</span>'
      + (m.domain ? '<span style="font-size:.74rem;color:var(--muted)">&middot; ' + escHtml(m.domain) + '</span>' : '')
      + '</div>'
      + '<div style="font-size:.98rem;line-height:1.65;margin:0 0 14px;color:var(--ink,#0f172a);font-weight:500">' + _wm(m.q || '(Question text)') + '</div>'
      + '<div style="font-size:.76rem;color:#b91c1c;background:#fef2f2;border:1px solid #fecaca;border-radius:7px;padding:6px 10px;margin-bottom:12px">'
      + '  ⚠️ Previously missed (you picked: <strong>' + _wm(m.wrong || '?') + '</strong>) — Re-solve below:'
      + '</div>'
      + '<div id="mdeck-choices" style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px">'
      + deckQ.choices.map(function(ch, ci){
          return '<button type="button" class="mdeck-opt" data-idx="' + ci + '" onclick="window._mdeckPick(' + ci + ')" '
            + 'style="display:flex;align-items:baseline;gap:10px;width:100%;text-align:left;padding:10px 14px;border:1.5px solid var(--line,#cbd5e1);border-radius:10px;background:var(--paper,#fff);color:var(--ink,#0f172a);cursor:pointer;font-size:.9rem;transition:all .15s">'
            + '<span style="font-weight:800;color:var(--indigo,#1e3a6e);min-width:18px">' + (letters[ci] || '•') + '.</span>'
            + '<span style="flex:1">' + _wm(ch) + '</span>'
            + '</button>';
        }).join('')
      + '</div>'
      + hintHtml
      + '<div id="mdeck-after" style="display:none;margin-top:12px">'
      + '  <div id="mdeck-verdict" style="padding:10px 14px;border-radius:9px;margin-bottom:10px;font-size:.88rem"></div>'
      + (m.sol ? '<div style="padding:10px 14px;border-radius:8px;background:var(--paper-2,#f8fafc);border-left:3.5px solid var(--indigo,#1e3a6e);font-size:.85rem;line-height:1.55;margin-bottom:12px"><strong>Worked Solution:</strong><br>' + _wm(m.sol) + '</div>' : '')
      + '  <div style="display:flex;gap:8px;flex-wrap:wrap">'
      + '    <button type="button" onclick="window._mdeckNext()" style="flex:1;padding:10px 16px;background:var(--indigo,#1e3a6e);color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700">' + (idx + 1 < stack.length ? 'Next Card &rarr;' : 'Finish Session ✓') + '</button>'
      + '    <button type="button" onclick="window.mqStillUnsure()" style="padding:10px 14px;background:var(--paper-2,#f1f5f9);color:var(--ink);border:1px solid var(--line,#cbd5e1);border-radius:8px;cursor:pointer;font-weight:600">🔄 5 Similar AI Questions</button>'
      + '  </div>'
      + '</div>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px solid var(--line,#e2e8f0)">'
      + '  <button type="button" onclick="window._closeMqReview();window.openChatWith(this.dataset.p)" data-p="' + aiPrompt.replace(/"/g, '&quot;') + '" style="background:none;border:none;color:#2563eb;font-weight:600;font-size:.8rem;cursor:pointer;padding:4px 0">&#129302; Ask AI Tutor step-by-step</button>'
      + '  <button type="button" id="mdeck-reveal-btn" onclick="window._mdeckPick(-1)" style="background:none;border:none;color:var(--muted);font-size:.78rem;cursor:pointer;padding:4px 0">Reveal answer</button>'
      + '</div>'
      + '</div>';

    if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([ov]).catch(function(){});

    window._mdeckPick = function(chosenIdx){
      var cardEl = ov.querySelector('.m-deck-card');
      var hintsUsed = cardEl ? parseInt(cardEl.getAttribute('data-hints-used') || '0', 10) : 0;
      var isRight = (chosenIdx === deckQ.ansIdx);
      var optsEls = ov.querySelectorAll('.mdeck-opt');
      optsEls.forEach(function(btnEl, bi){
        btnEl.onclick = null;
        btnEl.style.cursor = 'default';
        if(bi === deckQ.ansIdx){
          btnEl.style.background = '#dcfce7';
          btnEl.style.borderColor = '#16a34a';
        } else if(bi === chosenIdx && !isRight){
          btnEl.style.background = '#fee2e2';
          btnEl.style.borderColor = '#dc2626';
        }
      });

      var revBtn = document.getElementById('mdeck-reveal-btn');
      if(revBtn) revBtn.style.display = 'none';

      var updated = (window.ML && typeof window.ML.recordReview === 'function')
        ? window.ML.recordReview(m.id, isRight, hintsUsed)
        : null;
      var newBox = updated ? updated.box : (isRight ? Math.min(4, box + 1) : 1);
      if(isRight){
        correctCount++;
        if(newBox > box) promotedCount++;
      }

      var badgeEl = document.getElementById('mdeck-box-badge');
      if(badgeEl){
        badgeEl.textContent = 'Leitner Box ' + newBox + '/4';
        badgeEl.style.background = isRight ? '#dcfce7' : '#fee2e2';
        badgeEl.style.color = isRight ? '#15803d' : '#b91c1c';
      }

      var verdictEl = document.getElementById('mdeck-verdict');
      if(verdictEl){
        if(isRight){
          verdictEl.style.background = '#f0fdf4';
          verdictEl.style.border = '1px solid #bbf7d0';
          verdictEl.style.color = '#14532d';
          verdictEl.innerHTML = '<strong>✓ Correct!</strong> '
            + (hintsUsed > 0
              ? ('Solved with ' + hintsUsed + ' hint' + (hintsUsed > 1 ? 's' : '') + ' — scheduled for verification review in Box ' + newBox + '.')
              : ('Promoted to <strong>Leitner Box ' + newBox + '</strong>!'));
        } else {
          verdictEl.style.background = '#fef2f2';
          verdictEl.style.border = '1px solid #fecaca';
          verdictEl.style.color = '#7f1d1d';
          verdictEl.innerHTML = '<strong>✗ Not quite.</strong> Correct answer: <strong>' + _wm(m.right) + '</strong>. Kept in <strong>Box 1</strong> for immediate reinforcement.';
        }
      }

      var afterEl = document.getElementById('mdeck-after');
      if(afterEl){
        afterEl.style.display = 'block';
        if(window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([afterEl]).catch(function(){});
      }
    };

    window._mdeckNext = function(){
      idx++;
      showCard();
    };

    window.mqGotIt = function(){
      window._mdeckPick(deckQ.ansIdx);
      window._mdeckNext();
    };

    window.mqStillUnsure = function(){
      window._pqMistake = m;
      if(typeof window.launchPracticeQuiz === 'function') window.launchPracticeQuiz(m);
    };
  }

  showCard();
};

function reviewMistakeAt(startIdx){
  var all = (window.ML && typeof window.ML.getAll === 'function') ? window.ML.getAll() : _mistakes;
  if(!all.length) return;
  var target = all[startIdx] || all[0];
  var rest = all.filter(function(_, i){ return i !== startIdx; }).slice().reverse().slice(0, 9);
  window.launchAdaptiveMistakeDeck({ customStack: [target].concat(rest) });
}

function reviewMistakes(){
  window.launchAdaptiveMistakeDeck({ dueOnly: true, limit: 10 });
}

// Update button count on load
(function(){
  var all = (window.ML && typeof window.ML.getAll === 'function') ? window.ML.getAll() : _mistakes;
  var badge = document.getElementById('mistakeBadge');
  if(badge && all.length > 0) badge.textContent = ' (' + all.length + ')';
  var btn = document.getElementById('mistakeBtn');
  if(btn && all.length > 0) btn.textContent = '📋 Mistakes (' + all.length + ')';
})();

/* ── EXAM TIMER ── */
