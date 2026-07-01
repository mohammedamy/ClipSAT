/**
 * ClipSAT Storage  v2.0
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised localStorage helpers for:
 *   1. Mistakes Log  — wrong quiz answers, re-queuable for review
 *   2. Quiz Metrics  — per-question attempt/correct counts
 *   3. Progress      — "learned" checkboxes on formulas & worked examples
 *   4. Visited       — which course views the student has opened
 *
 * Exposes: global.ClipSATStorage
 * All methods are synchronous and safe (never throw on corrupted data).
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

(function (global) {

  /* ── Storage keys ── */
  const KEYS = {
    MISTAKES : 'clipsat_mistakes',
    METRICS  : 'clipsat_metrics',
    PROGRESS : 'clipsat_progress',
    VISITED  : 'clipsat_visited',
  };

  /* ── Safe JSON helpers ── */
  function _load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn('[ClipSATStorage] Parse error for key', key, e);
      return fallback;
    }
  }

  function _save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('[ClipSATStorage] Write error for key', key, e);
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   * 1. MISTAKES LOG
   *
   * Schema: Array<MistakeEntry>
   * MistakeEntry {
   *   id          : string  (courseId + '|' + questionId)
   *   courseId    : string
   *   chapterId   : string
   *   questionId  : string
   *   text        : string  (question stem)
   *   answer      : string  (correct key)
   *   chosen      : string  (wrong key student picked)
   *   ts          : number  (timestamp ms)
   *   reviewed    : boolean (true once re-answered correctly in review mode)
   * }
   * ═════════════════════════════════════════════════════════════════════════*/
  const mistakes = {

    _key() { return KEYS.MISTAKES; },

    /** Return all mistake entries, sorted newest first. */
    all() {
      return _load(this._key(), []).sort((a, b) => b.ts - a.ts);
    },

    /**
     * Add or refresh a mistake entry.
     * @param {{ courseId, chapterId, questionId, text, answer, chosen }} entry
     */
    add(entry) {
      const id   = `${entry.courseId}|${entry.questionId}`;
      const list = _load(this._key(), []);
      const idx  = list.findIndex(m => m.id === id);
      const rec  = { ...entry, id, ts: Date.now(), reviewed: false };
      if (idx !== -1) list.splice(idx, 1); // remove old entry, move to top
      list.unshift(rec);
      _save(this._key(), list);
      this._notifyCount();
      return rec;
    },

    /** Mark a mistake as reviewed (answered correctly in review mode). */
    markReviewed(id) {
      const list = _load(this._key(), []);
      const item = list.find(m => m.id === id);
      if (item) {
        item.reviewed = true;
        _save(this._key(), list);
        this._notifyCount();
      }
    },

    /** Remove a mistake by composite id. */
    remove(id) {
      const list = _load(this._key(), []).filter(m => m.id !== id);
      _save(this._key(), list);
      this._notifyCount();
    },

    /** Remove all mistakes for a specific course. */
    clearCourse(courseId) {
      const list = _load(this._key(), []).filter(m => m.courseId !== courseId);
      _save(this._key(), list);
      this._notifyCount();
    },

    /** Remove all mistakes. */
    clearAll() {
      _save(this._key(), []);
      this._notifyCount();
    },

    /** Return only un-reviewed mistakes (queued for "Quiz Me On Mistakes"). */
    pending() {
      return this.all().filter(m => !m.reviewed);
    },

    /** Count of pending (un-reviewed) mistakes. */
    count() {
      return this.pending().length;
    },

    /** Query by course. */
    forCourse(courseId) {
      return this.all().filter(m => m.courseId === courseId);
    },

    /** Dispatch event so UI badge can update. */
    _notifyCount() {
      document.dispatchEvent(
        new CustomEvent('clipsat:mistakesUpdated', {
          detail: { count: this.count() },
          bubbles: true
        })
      );
    }
  };

  /* ═══════════════════════════════════════════════════════════════════════════
   * 2. QUIZ METRICS
   *
   * Schema: { [courseId]: { [questionId]: { attempts: n, correct: n } } }
   * ═════════════════════════════════════════════════════════════════════════*/
  const quizMetrics = {

    _all() { return _load(KEYS.METRICS, {}); },

    /** Record an attempt. */
    record(courseId, questionId, isCorrect) {
      const all = this._all();
      if (!all[courseId])               all[courseId] = {};
      if (!all[courseId][questionId])   all[courseId][questionId] = { attempts: 0, correct: 0 };
      all[courseId][questionId].attempts++;
      if (isCorrect) all[courseId][questionId].correct++;
      _save(KEYS.METRICS, all);
    },

    /** Get stats for one question. Returns { attempts, correct } or null. */
    get(courseId, questionId) {
      const all = this._all();
      return (all[courseId] && all[courseId][questionId]) || null;
    },

    /**
     * Accuracy (0–1) for a course.
     * Returns null if no attempts recorded.
     */
    accuracy(courseId) {
      const all = this._all();
      const course = all[courseId];
      if (!course) return null;
      let attempts = 0, correct = 0;
      Object.values(course).forEach(q => {
        attempts += q.attempts;
        correct  += q.correct;
      });
      return attempts === 0 ? null : correct / attempts;
    },

    clearCourse(courseId) {
      const all = this._all();
      delete all[courseId];
      _save(KEYS.METRICS, all);
    }
  };

  /* ═══════════════════════════════════════════════════════════════════════════
   * 3. PROGRESS CHECKBOXES
   *
   * Tracks which worked examples / key formulas have been checked off.
   * Schema: { [courseId]: { [chapterId]: { [itemId]: true } } }
   * ═════════════════════════════════════════════════════════════════════════*/
  const progress = {

    _all() { return _load(KEYS.PROGRESS, {}); },

    _set(courseId, chapterId, itemId, value) {
      const all = this._all();
      if (!all[courseId])                all[courseId] = {};
      if (!all[courseId][chapterId])     all[courseId][chapterId] = {};
      if (value) {
        all[courseId][chapterId][itemId] = true;
      } else {
        delete all[courseId][chapterId][itemId];
      }
      _save(KEYS.PROGRESS, all);
    },

    toggle(courseId, chapterId, itemId) {
      const current = this.isChecked(courseId, chapterId, itemId);
      this._set(courseId, chapterId, itemId, !current);
      return !current;
    },

    isChecked(courseId, chapterId, itemId) {
      const all = this._all();
      return !!(all[courseId] && all[courseId][chapterId] && all[courseId][chapterId][itemId]);
    },

    /** Return { checked, total } for a chapter. */
    chapterStats(courseId, chapterId) {
      const all    = this._all();
      const chapter = (all[courseId] && all[courseId][chapterId]) || {};
      const checked = Object.keys(chapter).length;
      // total is counted live from the DOM
      const total = document.querySelectorAll('.cs-checkable[data-item-id]').length;
      return { checked, total };
    },

    /**
     * Called by CourseLoader after chapter renders.
     * Attaches checkboxes to .cs-checkable elements and restores state.
     */
    restoreCheckboxes(container, courseId, chapterId) {
      const items = container.querySelectorAll('.cs-checkable[data-item-id]');
      const total = items.length;
      if (!total) return;

      // Create/update progress bar
      let bar = container.querySelector('.cs-progress-wrap');
      if (!bar) {
        bar = document.createElement('div');
        bar.className = 'cs-progress-wrap';
        bar.innerHTML = `
          <div class="cs-progress-label">Progress: <span class="cs-progress-pct">0%</span></div>
          <div class="cs-progress-bar"><div class="cs-progress-fill" style="width:0%"></div></div>`;
        // Insert before the first checkable section heading
        const firstCheckable = container.querySelector('.cs-checkable');
        if (firstCheckable && firstCheckable.parentElement) {
          container.insertBefore(bar, firstCheckable.closest('[class^="cs-"]') || firstCheckable);
        } else {
          container.prepend(bar);
        }
      }

      const updateBar = () => {
        const all     = this._all();
        const chapter = (all[courseId] && all[courseId][chapterId]) || {};
        const checked = Object.keys(chapter).length;
        const pct     = total ? Math.round((checked / total) * 100) : 0;
        bar.querySelector('.cs-progress-pct').textContent = `${pct}%`;
        bar.querySelector('.cs-progress-fill').style.width = pct + '%';
      };

      items.forEach(item => {
        const itemId  = item.dataset.itemId;
        const checked = this.isChecked(courseId, chapterId, itemId);

        // Build checkbox overlay
        const cb = document.createElement('label');
        cb.className = 'cs-item-checkbox';
        cb.title     = checked ? 'Mark as not done' : 'Mark as done';
        cb.innerHTML = `<input type="checkbox" style="position:absolute;opacity:0;width:0;height:0"
                               ${checked ? 'checked' : ''}><span class="cs-cb-icon">${checked ? '✅' : '☐'}</span>`;
        cb.style.cssText = 'display:inline-block;cursor:pointer;margin-left:8px;vertical-align:middle;user-select:none';

        cb.querySelector('input').addEventListener('change', e => {
          const nowChecked = this.toggle(courseId, chapterId, itemId);
          const icon = cb.querySelector('.cs-cb-icon');
          icon.textContent = nowChecked ? '✅' : '☐';
          cb.title = nowChecked ? 'Mark as not done' : 'Mark as done';
          updateBar();
        });

        item.style.position = 'relative';
        item.appendChild(cb);
      });

      updateBar();
    },

    clearCourse(courseId) {
      const all = this._all();
      delete all[courseId];
      _save(KEYS.PROGRESS, all);
    }
  };

  /* ═══════════════════════════════════════════════════════════════════════════
   * 4. VISITED VIEWS
   *
   * Schema: Array<string> of course IDs
   * ═════════════════════════════════════════════════════════════════════════*/
  const visited = {
    all()         { return _load(KEYS.VISITED, []); },
    mark(id)      { const v = this.all(); if (!v.includes(id)) { v.unshift(id); _save(KEYS.VISITED, v); } },
    has(id)       { return this.all().includes(id); },
    clearAll()    { _save(KEYS.VISITED, []); }
  };

  /* ── Expose ── */
  global.ClipSATStorage = { mistakes, quizMetrics, progress, visited };

  /* ── Update mistakes badge on page load ── */
  document.addEventListener('DOMContentLoaded', () => {
    mistakes._notifyCount();
  });

})(window);
