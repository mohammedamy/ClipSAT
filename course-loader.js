/**
 * ClipSAT Course Loader  v2.0
 * ─────────────────────────────────────────────────────────────────────────────
 * Dynamically fetches /courses/{courseId}.json and renders its content into
 * the existing ClipSAT SPA DOM, using MathJax for LaTeX rendering.
 *
 * Public API
 * ──────────
 *   CourseLoader.load(courseId)          → Promise<void>
 *   CourseLoader.renderChapter(chapterIdx) → void
 *   CourseLoader.currentCourse           → object | null
 *
 * The module fires custom DOM events so other modules (router, progress
 * tracker, Desmos widget) can react without tight coupling:
 *   'clipsat:courseLoaded'   — detail: { course }
 *   'clipsat:chapterChanged' — detail: { course, chapter, index }
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

(function (global) {

  /* ── Cache: avoid redundant network hits ── */
  const _cache = {};

  /* ── Active state ── */
  let _course      = null;   // full parsed course object
  let _chapterIdx  = 0;      // currently displayed chapter

  /* ═══════════════════════════════════════════════════════════════════════════
   * INTERNAL HELPERS
   * ═════════════════════════════════════════════════════════════════════════*/

  /** Escape HTML to prevent XSS in text fields. */
  function _esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /** Emit a custom event on document. */
  function _emit(name, detail) {
    document.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));
  }

  /** Find (or create) a container element by selector inside a parent. */
  function _getOrCreate(parent, selector, tag, cls) {
    let el = parent.querySelector(selector);
    if (!el) {
      el = document.createElement(tag || 'div');
      if (cls) el.className = cls;
      parent.appendChild(el);
    }
    return el;
  }

  /** Trigger MathJax re-render on a specific node (graceful if absent). */
  function _typeset(node) {
    if (global.MathJax) {
      if (MathJax.typesetPromise) {
        MathJax.typesetPromise([node]).catch(console.error);
      } else if (MathJax.Hub) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, node]);
      }
    }
  }

  /* ── Spinner ── */
  const _SPINNER_ID = 'cs-dynamic-spinner';

  function _showSpinner(container) {
    _hideSpinner();
    const s = document.createElement('div');
    s.id = _SPINNER_ID;
    s.setAttribute('role', 'status');
    s.setAttribute('aria-label', 'Loading course…');
    s.innerHTML = `
      <div class="cs-spin-ring"></div>
      <p class="cs-spin-label">Loading…</p>`;
    container.innerHTML = '';
    container.appendChild(s);
  }

  function _hideSpinner() {
    const s = document.getElementById(_SPINNER_ID);
    if (s) s.remove();
  }

  /* ── CSS (injected once) ── */
  function _injectStyles() {
    if (document.getElementById('cs-loader-styles')) return;
    const style = document.createElement('style');
    style.id = 'cs-loader-styles';
    style.textContent = `
/* ── Spinner ─────────────────────────────────────────── */
#cs-dynamic-spinner{
  display:flex;flex-direction:column;align-items:center;
  justify-content:center;padding:64px 0;gap:16px;
}
.cs-spin-ring{
  width:48px;height:48px;border-radius:50%;
  border:4px solid var(--faint,#e5e7eb);
  border-top-color:var(--indigo,#4f46e5);
  animation:cs-spin .7s linear infinite;
}
@keyframes cs-spin{to{transform:rotate(360deg)}}
.cs-spin-label{color:var(--muted,#6b7280);font-size:.875rem;margin:0}

/* ── Chapter nav tabs ────────────────────────────────── */
.cs-chapter-tabs{
  display:flex;flex-wrap:wrap;gap:6px;margin-bottom:24px;
}
.cs-chapter-tab{
  padding:6px 14px;border-radius:999px;font-size:.8rem;font-weight:600;
  border:1.5px solid var(--line,#e5e7eb);background:transparent;
  color:var(--muted,#6b7280);cursor:pointer;transition:all .15s;
}
.cs-chapter-tab:hover{border-color:var(--indigo,#4f46e5);color:var(--indigo,#4f46e5)}
.cs-chapter-tab.active{
  background:var(--indigo,#4f46e5);border-color:var(--indigo,#4f46e5);
  color:#fff;
}

/* ── Definitions ─────────────────────────────────────── */
.cs-def-block{
  border-left:3px solid var(--indigo,#4f46e5);
  background:var(--indigo-soft,#ede9fe);
  border-radius:0 8px 8px 0;padding:12px 16px;margin:12px 0;
}
.cs-def-term{font-weight:700;color:var(--indigo,#4f46e5);margin-bottom:4px}
.cs-def-body{color:var(--ink,#111827);margin:0}

/* ── Theorems ────────────────────────────────────────── */
.cs-thm-block{
  border:1.5px solid var(--indigo-2,#a5b4fc);
  border-radius:8px;padding:14px 16px;margin:12px 0;
}
.cs-thm-name{font-weight:700;font-style:italic;margin-bottom:6px}
.cs-thm-statement{margin:0}
.cs-thm-proof{
  margin-top:8px;padding-top:8px;
  border-top:1px dashed var(--line,#e5e7eb);
  font-size:.875rem;color:var(--muted,#6b7280);
}

/* ── Key Formulas ────────────────────────────────────── */
.cs-formulas-grid{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
  gap:12px;margin:12px 0;
}
.cs-formula-card{
  background:var(--paper-2,#f9fafb);border:1px solid var(--line,#e5e7eb);
  border-radius:8px;padding:14px;
}
.cs-formula-label{font-size:.75rem;font-weight:700;text-transform:uppercase;
  letter-spacing:.04em;color:var(--muted,#6b7280);margin-bottom:6px}
.cs-formula-latex{font-size:1rem;text-align:center}

/* ── Worked Examples ─────────────────────────────────── */
.cs-example{
  border:1px solid var(--line,#e5e7eb);border-radius:8px;
  margin:12px 0;overflow:hidden;
}
.cs-example-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:12px 16px;cursor:pointer;background:var(--paper-2,#f9fafb);
  font-weight:600;
}
.cs-example-header:hover{background:var(--faint,#f3f4f6)}
.cs-example-chevron{transition:transform .2s;font-size:.8rem}
.cs-example-header.open .cs-example-chevron{transform:rotate(90deg)}
.cs-example-body{
  max-height:0;overflow:hidden;transition:max-height .35s ease;
}
.cs-example-body.open{max-height:2000px}
.cs-example-inner{padding:16px}
.cs-example-step{
  display:flex;gap:10px;margin-bottom:10px;
}
.cs-step-num{
  flex-shrink:0;width:22px;height:22px;border-radius:50%;
  background:var(--indigo,#4f46e5);color:#fff;
  font-size:.7rem;font-weight:700;
  display:flex;align-items:center;justify-content:center;margin-top:1px;
}
.cs-answer{
  margin-top:10px;padding:8px 14px;
  background:var(--ok,#d1fae5);border-radius:6px;
  font-weight:600;
}

/* ── Quiz ────────────────────────────────────────────── */
.cs-quiz-question{
  margin-bottom:28px;
  padding:16px;
  border:1px solid var(--line,#e5e7eb);
  border-radius:10px;
}
.cs-quiz-stem{font-weight:600;margin-bottom:12px}
.cs-quiz-choices{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px}
.cs-quiz-choice{
  display:flex;align-items:center;gap:10px;
  padding:9px 14px;border-radius:8px;
  border:1.5px solid var(--line,#e5e7eb);cursor:pointer;
  transition:border-color .15s,background .15s;
}
.cs-quiz-choice:hover{border-color:var(--indigo,#4f46e5)}
.cs-quiz-choice.correct{background:#d1fae5;border-color:#059669;color:#065f46}
.cs-quiz-choice.wrong{background:#fee2e2;border-color:#dc2626;color:#991b1b}
.cs-quiz-key{font-weight:700;font-size:.85rem}
.cs-quiz-feedback{
  margin-top:12px;padding:10px 14px;border-radius:6px;
  background:var(--paper-2,#f9fafb);font-size:.875rem;display:none;
}
.cs-quiz-feedback.visible{display:block}
.cs-quiz-feedback ol{margin:8px 0 0 16px;padding:0}
.cs-quiz-feedback li{margin-bottom:4px}

/* ── Progress bar ────────────────────────────────────── */
.cs-progress-wrap{
  margin:8px 0 20px;
}
.cs-progress-label{
  font-size:.8rem;color:var(--muted,#6b7280);margin-bottom:4px;
}
.cs-progress-bar{
  height:6px;background:var(--faint,#f3f4f6);border-radius:999px;overflow:hidden;
}
.cs-progress-fill{
  height:100%;background:var(--indigo,#4f46e5);
  border-radius:999px;transition:width .4s ease;
}
`;
    document.head.appendChild(style);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   * RENDERING
   * ═════════════════════════════════════════════════════════════════════════*/

  /** Render chapter tab pills. */
  function _renderTabs(container, chapters, activeIdx) {
    let tabBar = container.querySelector('.cs-chapter-tabs');
    if (!tabBar) {
      tabBar = document.createElement('nav');
      tabBar.className = 'cs-chapter-tabs';
      tabBar.setAttribute('aria-label', 'Course chapters');
      container.prepend(tabBar);
    }
    tabBar.innerHTML = chapters.map((ch, i) => `
      <button
        class="cs-chapter-tab${i === activeIdx ? ' active' : ''}"
        data-chapter-idx="${i}"
        aria-current="${i === activeIdx ? 'true' : 'false'}"
      >${_esc(ch.title)}</button>
    `).join('');

    tabBar.addEventListener('click', e => {
      const btn = e.target.closest('[data-chapter-idx]');
      if (btn) CourseLoader.renderChapter(Number(btn.dataset.chapterIdx));
    });
  }

  /** Render a definitions section. */
  function _renderDefinitions(parent, defs) {
    if (!defs || !defs.length) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = '<h4 class="cs-section-heading">Definitions</h4>' +
      defs.map(d => `
        <div class="cs-def-block" id="${_esc(d.id || '')}">
          <div class="cs-def-term">${_esc(d.term)}</div>
          <p class="cs-def-body">${d.body || ''}</p>
        </div>
      `).join('');
    parent.appendChild(wrap);
  }

  /** Render theorems. */
  function _renderTheorems(parent, theorems) {
    if (!theorems || !theorems.length) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = '<h4 class="cs-section-heading">Theorems &amp; Rules</h4>' +
      theorems.map(t => `
        <div class="cs-thm-block" id="${_esc(t.id || '')}">
          <div class="cs-thm-name">${_esc(t.name)}</div>
          <p class="cs-thm-statement">${t.statement || ''}</p>
          ${t.proof ? `<div class="cs-thm-proof"><em>Derivation:</em> ${t.proof}</div>` : ''}
          ${t.notes ? `<p style="font-size:.85rem;color:var(--muted)">${_esc(t.notes)}</p>` : ''}
        </div>
      `).join('');
    parent.appendChild(wrap);
  }

  /** Render key formula cards. */
  function _renderFormulas(parent, formulas) {
    if (!formulas || !formulas.length) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = '<h4 class="cs-section-heading">Key Formulas</h4>' +
      '<div class="cs-formulas-grid">' +
      formulas.map(f => `
        <div class="cs-formula-card" id="${_esc(f.id || '')}">
          <div class="cs-formula-label">${_esc(f.label)}</div>
          <div class="cs-formula-latex cs-checkable" data-item-id="${_esc(f.id || f.label)}">\\[${f.latex}\\]</div>
          ${f.notes ? `<p style="font-size:.8rem;color:var(--muted);margin:6px 0 0">${_esc(f.notes)}</p>` : ''}
        </div>
      `).join('') +
      '</div>';
    parent.appendChild(wrap);
  }

  /** Render worked examples (collapsible). */
  function _renderExamples(parent, examples) {
    if (!examples || !examples.length) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = '<h4 class="cs-section-heading">Worked Examples</h4>';
    examples.forEach((ex, i) => {
      const el = document.createElement('div');
      el.className = 'cs-example';
      el.id = ex.id || `ex-${i}`;
      el.innerHTML = `
        <div class="cs-example-header" role="button" aria-expanded="false">
          <span><strong>Example ${i + 1}:</strong> ${ex.problem || ''}</span>
          <span class="cs-example-chevron">▶</span>
        </div>
        <div class="cs-example-body">
          <div class="cs-example-inner cs-checkable" data-item-id="${_esc(ex.id || 'ex-' + i)}">
            ${(ex.steps || []).map((step, si) => `
              <div class="cs-example-step">
                <span class="cs-step-num">${si + 1}</span>
                <span>${step.text || ''}${step.latex ? `\\[${step.latex}\\]` : ''}</span>
              </div>`).join('')}
            ${ex.answer ? `<div class="cs-answer">✓ ${ex.answer}</div>` : ''}
          </div>
        </div>`;
      // Toggle logic
      const header = el.querySelector('.cs-example-header');
      const body   = el.querySelector('.cs-example-body');
      header.addEventListener('click', () => {
        const isOpen = body.classList.toggle('open');
        header.classList.toggle('open', isOpen);
        header.setAttribute('aria-expanded', isOpen);
      });
      wrap.appendChild(el);
    });
    parent.appendChild(wrap);
  }

  /** Render quiz. */
  function _renderQuiz(parent, quiz, courseId, chapterId) {
    if (!quiz || !quiz.questions || !quiz.questions.length) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = '<h4 class="cs-section-heading">Quiz</h4>';

    quiz.questions.forEach((q, qi) => {
      const qDiv = document.createElement('div');
      qDiv.className = 'cs-quiz-question';
      qDiv.dataset.questionId = q.id || `${chapterId}-q${qi}`;

      qDiv.innerHTML = `
        <div class="cs-quiz-stem">${q.text || ''}</div>
        <ul class="cs-quiz-choices">
          ${(q.choices || []).map(c => `
            <li class="cs-quiz-choice" data-key="${_esc(c.key)}" role="button" tabindex="0">
              <span class="cs-quiz-key">${_esc(c.key)}.</span>
              <span>${c.text || ''}</span>
            </li>`).join('')}
        </ul>
        <div class="cs-quiz-feedback">
          <strong>Solution:</strong>
          <ol>${(q.solution || []).map(s => `<li>${s}</li>`).join('')}</ol>
        </div>`;

      // Choice click handler
      const choices  = qDiv.querySelectorAll('.cs-quiz-choice');
      const feedback = qDiv.querySelector('.cs-quiz-feedback');
      let answered   = false;

      choices.forEach(choice => {
        const handler = () => {
          if (answered) return;
          answered = true;
          const chosen = choice.dataset.key;
          const correct = chosen === q.answer;
          choice.classList.add(correct ? 'correct' : 'wrong');
          if (!correct) {
            choices.forEach(c => {
              if (c.dataset.key === q.answer) c.classList.add('correct');
            });
            // Log to mistake store
            if (global.ClipSATStorage) {
              ClipSATStorage.mistakes.add({
                courseId, chapterId,
                questionId: q.id || `${chapterId}-q${qi}`,
                text: q.text,
                answer: q.answer,
                chosen
              });
            }
          }
          feedback.classList.add('visible');
          _typeset(feedback);
        };
        choice.addEventListener('click', handler);
        choice.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') handler(); });
      });

      wrap.appendChild(qDiv);
    });

    parent.appendChild(wrap);
  }

  /** Render the full chapter body. */
  function _renderChapterBody(container, course, idx) {
    const ch = course.chapters[idx];
    if (!ch) return;

    const body = _getOrCreate(container, '.cs-chapter-body', 'div', 'cs-chapter-body');
    body.innerHTML = `
      <header class="cs-chapter-header">
        <h3>${_esc(ch.title)}</h3>
        ${ch.description ? `<p class="cs-chapter-desc">${_esc(ch.description)}</p>` : ''}
      </header>`;

    const c = ch.content || {};

    // Notes blob (Markdown/HTML)
    if (c.notes) {
      const nb = document.createElement('div');
      nb.className = 'cs-notes-block';
      nb.innerHTML = c.notes; // trusted: output from your own pipeline
      body.appendChild(nb);
    }

    _renderDefinitions(body, c.definitions);
    _renderTheorems(body, c.theorems);
    _renderFormulas(body, c.keyFormulas);
    _renderExamples(body, c.workedExamples);
    _renderQuiz(body, ch.quiz, course.id, ch.id);

    // Restore checkbox progress
    if (global.ClipSATStorage) {
      ClipSATStorage.progress.restoreCheckboxes(body, course.id, ch.id);
    }

    _typeset(body);
    _emit('clipsat:chapterChanged', { course, chapter: ch, index: idx });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   * PUBLIC API
   * ═════════════════════════════════════════════════════════════════════════*/

  const CourseLoader = {

    get currentCourse() { return _course; },
    get currentChapterIndex() { return _chapterIdx; },

    /**
     * Load a course by ID.
     * Fetches /courses/{courseId}.json, then renders into the active view.
     * @param {string} courseId  — must match a <main id="view-{courseId}"> element
     * @param {number} [chapterIdx=0]
     * @returns {Promise<void>}
     */
    async load(courseId, chapterIdx = 0) {
      _injectStyles();

      // Find the target view container
      const viewEl = document.getElementById(`view-${courseId}`);
      if (!viewEl) {
        console.warn(`[CourseLoader] No DOM element #view-${courseId} found.`);
        return;
      }

      // Show spinner
      const dynZone = _getOrCreate(viewEl, '.cs-dynamic-zone', 'section', 'cs-dynamic-zone');
      _showSpinner(dynZone);

      try {
        // Cache or fetch
        if (!_cache[courseId]) {
          const res = await fetch(`./courses/${courseId}.json`);
          if (!res.ok) throw new Error(`HTTP ${res.status} for courses/${courseId}.json`);
          _cache[courseId] = await res.json();
        }
        _course     = _cache[courseId];
        _chapterIdx = Math.max(0, Math.min(chapterIdx, (_course.chapters || []).length - 1));

        _hideSpinner();
        dynZone.innerHTML = '';

        // Render tab bar
        _renderTabs(dynZone, _course.chapters, _chapterIdx);

        // Render chapter body
        _renderChapterBody(dynZone, _course, _chapterIdx);

        _emit('clipsat:courseLoaded', { course: _course });

      } catch (err) {
        _hideSpinner();
        dynZone.innerHTML = `
          <div style="padding:40px;text-align:center;color:var(--muted)">
            <p>⚠️ Could not load course data.</p>
            <p style="font-size:.85rem">${_esc(err.message)}</p>
            <button onclick="CourseLoader.load('${_esc(courseId)}')"
                    style="margin-top:12px;padding:8px 20px;border-radius:8px;
                           background:var(--indigo);color:#fff;border:none;cursor:pointer">
              Retry
            </button>
          </div>`;
        console.error('[CourseLoader]', err);
      }
    },

    /**
     * Render a specific chapter (called by tab clicks and the router).
     * Requires a course to already be loaded.
     * @param {number} idx
     */
    renderChapter(idx) {
      if (!_course) return;
      _chapterIdx = Math.max(0, Math.min(idx, _course.chapters.length - 1));

      const viewEl  = document.getElementById(`view-${_course.id}`);
      const dynZone = viewEl && viewEl.querySelector('.cs-dynamic-zone');
      if (!dynZone) return;

      // Update tabs
      dynZone.querySelectorAll('.cs-chapter-tab').forEach((tab, i) => {
        tab.classList.toggle('active', i === _chapterIdx);
        tab.setAttribute('aria-current', i === _chapterIdx ? 'true' : 'false');
      });

      // Re-render body
      const oldBody = dynZone.querySelector('.cs-chapter-body');
      if (oldBody) oldBody.remove();
      _renderChapterBody(dynZone, _course, _chapterIdx);

      // Notify router so hash updates
      _emit('clipsat:chapterChanged', { course: _course, chapter: _course.chapters[_chapterIdx], index: _chapterIdx });
    }
  };

  /* ── Expose globally ── */
  global.CourseLoader = CourseLoader;

})(window);
