(function() {
  'use strict';

  /* ══════════════════════════════════════════════════════════════════════════
     A.  GAMIFICATION ENGINE (XP, LEVELS, STREAKS, BADGES)
     ══════════════════════════════════════════════════════════════════════════ */
  var xp = parseInt(localStorage.getItem('clipsat_xp') || '0');
  var level = Math.floor(xp / 100) + 1;
  var streak = parseInt(localStorage.getItem('clipsat_streak') || '0');

  var Badges = [
    { id: 'apprentice', label: 'Algebra Apprentice', desc: 'Mastered linear equations' },
    { id: 'calc-hero', label: 'Calculus Champion', desc: 'Calculus tangent lines visualizer master' },
    { id: 'streak-star', label: 'Spaced Scholar', desc: 'Maintained a 3-day active streak' },
    { id: 'perfectionist', label: 'Perfect Score', desc: 'Scored 100% on any practice set' }
  ];

  window.CSGamify = {
    addXP: function(amount) {
      xp += amount;
      localStorage.setItem('clipsat_xp', xp);
      var currentLevel = Math.floor(xp / 100) + 1;
      if (currentLevel > level) {
        level = currentLevel;
        this.triggerLevelUp();
      }
      this.updateUI();
    },

    updateUI: function() {
      var xpEl = document.getElementById('nav-xp');
      var streakEl = document.getElementById('nav-streak');
      if (xpEl) xpEl.textContent = xp;
      if (streakEl) streakEl.textContent = streak;
    },

    triggerLevelUp: function() {
      var toast = document.createElement('div');
      toast.className = 'level-up-toast';
      toast.innerHTML = '🎉 <span>LEVEL UP! You are now Level ' + level + '!</span>';
      document.body.appendChild(toast);
      setTimeout(function() { toast.classList.add('show'); }, 100);
      setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 500);
      }, 3500);
    },

    /* ══════════════════════════════════════════════════════════════════════════
       B.  SPACED REPETITION SYSTEM (SRS) FLASHCARDS

       Previously: a hardcoded 4-card deck, identical on every page regardless
       of subject, held only in a plain instance array — "Mastered" spliced a
       card out in memory (never persisted), so reloading the page silently
       reset the whole deck, and mastering all 4 in one sitting permanently
       showed "All cards mastered!" for the rest of the session with no way
       to get more cards. None of that is real spaced repetition.

       Now: the deck is built from the CURRENT track's own .fcard formula
       cards (908 of them across the site — real, subject-relevant material,
       not 4 generic facts), and review scheduling is a real SM-2-lite: each
       card's next-due date is stored in localStorage keyed by a stable id
       (track + front text), "Review" resets the interval to 1 day, "Mastered"
       doubles it (starting at 3 days) — so the deck never runs out and
       actually spaces repetition over real time instead of a single session.
       ══════════════════════════════════════════════════════════════════════════ */
    srsDeck: [],
    _deckTrack: null,
    currentCard: null,

    _slugify: function(s) {
      return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
    },

    buildDeckFromPage: function() {
      var track = window.CLIPSAT_TRACK || 'x';
      var cards = [];
      document.querySelectorAll('.fcard').forEach(function(el) {
        var frontEl = el.querySelector('.ft');
        if (!frontEl) return;
        var front = frontEl.textContent.trim();
        if (!front) return;
        var backClone = el.cloneNode(true);
        var innerFront = backClone.querySelector('.ft');
        if (innerFront) innerFront.remove();
        var back = backClone.innerHTML.trim();
        if (!back) return;
        cards.push({ id: track + ':' + window.CSGamify._slugify(front), f: front, b: back });
      });
      this.srsDeck = cards;
      this._deckTrack = track;
    },

    _srsState: function() {
      try { return JSON.parse(localStorage.getItem('clipsat_srs_state') || '{}'); }
      catch (e) { return {}; }
    },

    _saveSrsState: function(state) {
      try { localStorage.setItem('clipsat_srs_state', JSON.stringify(state)); } catch (e) {}
    },

    _dueCards: function() {
      var state = this._srsState();
      var now = Date.now();
      return this.srsDeck.filter(function(c) {
        var s = state[c.id];
        return !s || s.due <= now;
      });
    },

    loadFlashcard: function() {
      if (this._deckTrack !== (window.CLIPSAT_TRACK || 'x')) this.buildDeckFromPage();
      var frontEl = document.getElementById('fc-front-text');
      var backEl = document.getElementById('fc-back-text');
      var dueEl = document.getElementById('fc-due-count');
      var due = this._dueCards();
      if (dueEl) dueEl.textContent = due.length;
      if (!this.srsDeck.length) {
        this.currentCard = null;
        if (frontEl) frontEl.textContent = 'Open a chapter to load its flashcards';
        if (backEl) backEl.textContent = '';
        return;
      }
      if (!due.length) {
        this.currentCard = null;
        if (frontEl) frontEl.textContent = '🎉 All caught up here!';
        if (backEl) backEl.textContent = 'Come back later for your next scheduled review.';
        return;
      }
      var card = due[Math.floor(Math.random() * due.length)];
      this.currentCard = card;
      if (frontEl) frontEl.textContent = card.f;
      if (backEl) backEl.innerHTML = card.b;
      if (window.MathJax && window.MathJax.typesetPromise) {
        var sb = document.getElementById('flashcards-sidebar');
        if (sb) MathJax.typesetPromise([sb]);
      }
    },

    recordSRS: function(isCorrect) {
      if (!this.currentCard) return;
      var state = this._srsState();
      var prev = state[this.currentCard.id] || { interval: 0 };
      var nextInterval = isCorrect ? Math.max(3, prev.interval * 2) : 1;
      state[this.currentCard.id] = { due: Date.now() + nextInterval * 86400000, interval: nextInterval };
      this._saveSrsState(state);
      if (isCorrect) this.addXP(15);
      var card = document.getElementById('active-flashcard');
      if (card) card.classList.remove('flipped');
      setTimeout(function() { window.CSGamify.loadFlashcard(); }, 300);
    },

    /* ══════════════════════════════════════════════════════════════════════════
       C.  CURRICULUM TEXTBOOK MAPPER
       ══════════════════════════════════════════════════════════════════════════ */
    mapCurriculum: function(val) {
      var railLinks = document.querySelectorAll('aside.rail a');
      if (val === 'default') {
        railLinks.forEach(function(link) { link.style.display = 'block'; });
        return;
      }
      var allowedChapters = {
        'reveal-precalc':    ['calculus', 'algebra', 'precalc'],
        'cambridge-igcse':   ['algebra', 'geo', 'igcse'],
        'collegeboard-sat':  ['algebra', 'geo', 'sat']
      }[val] || [];
      railLinks.forEach(function(link) {
        var m = (link.getAttribute('onclick') || '').match(/showView\('([^']+)'\)/);
        var viewId = m ? m[1] : null;
        link.style.display = (viewId && allowedChapters.indexOf(viewId) === -1) ? 'none' : 'block';
      });
    }
  };

  /* Hook into answer recording to award XP */
  (function patchRecordAnswer() {
    var tries = 0;
    var interval = setInterval(function() {
      tries++;
      if (window._recordAnswer) {
        var orig = window._recordAnswer;
        window._recordAnswer = function(isCorrect) {
          if (isCorrect) window.CSGamify.addXP(10);
          return orig.apply(this, arguments);
        };
        clearInterval(interval);
      }
      if (tries > 50) clearInterval(interval);
    }, 200);
  })();

  /* Hook into Teacher Mode to enable Whiteboard button — and, just as
     importantly, to force the whiteboard fully off (hidden, ink wiped)
     the instant Teacher Mode itself is turned off, rather than leaving a
     stale board/cursor state hanging around. */
  /* The whiteboard itself lives in public/js/whiteboard.js (24b-whiteboard.js,
     Plan 5 Phase 5.015, ADR 0031), loaded on demand. _ensureTeacherMode()
     starts this load in parallel, so it is normally done before Teacher Mode
     is on; every whiteboard call below still goes through it, so a call can
     never hit a method that isn't there yet. */
  var _wbPromise = null;
  window._ensureWhiteboard = function() {
    if (window.CSGamify.setupWhiteboard) return Promise.resolve();
    if (_wbPromise) return _wbPromise;
    _wbPromise = new Promise(function(resolve, reject) {
      var s = document.createElement('script');
      s.src = '/js/whiteboard.js';
      s.onload = function() { resolve(); };
      s.onerror = function() { _wbPromise = null; reject(new Error('whiteboard.js failed to load')); };
      document.head.appendChild(s);
    });
    return _wbPromise;
  };

  var observer = new MutationObserver(function() {
    var isTeacher = document.body.classList.contains('tm-on');
    var wbBtn = document.getElementById('teacherWhiteboardBtn');
    if (wbBtn) wbBtn.style.display = isTeacher ? 'inline-flex' : 'none';
    if (isTeacher) {
      window._ensureWhiteboard().then(function() {
        // Teacher Mode may have been switched off again while the file loaded.
        if (document.body.classList.contains('tm-on')) window.CSGamify.setupWhiteboard();
      }).catch(function() {});
    } else if (window.CSGamify.exitWhiteboard) {
      // Never loaded means there is no board to tear down.
      window.CSGamify.exitWhiteboard();
    }
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  /* Daily streak tracking */
  (function trackStreak() {
    var today = new Date().toDateString();
    var lastVisit = localStorage.getItem('clipsat_last_visit');
    var yesterday = new Date(Date.now() - 86400000).toDateString();
    if (lastVisit === yesterday) {
      streak++;
    } else if (lastVisit !== today) {
      streak = 1;
    }
    localStorage.setItem('clipsat_streak', streak);
    localStorage.setItem('clipsat_last_visit', today);
    if (streak >= 3) window.CSGamify.addXP(20); // streak bonus
  })();

  document.addEventListener('DOMContentLoaded', function() {
    window.CSGamify.updateUI();
    window.CSGamify.loadFlashcard();
  });
}());

/* ══════ Keyboard-accessibility retrofit ══════
   Roadmap Pillar 4 (Accessibility), MVP phase: "Full keyboard-only navigation
   audit of the quiz engine (currently mouse/touch-oriented)."
   This codebase has ~30+ places where a click handler lives on a <div> or
   <span> — home-page track cards, the header brand logo, the flashcard
   flip, the FLASHCARDS sidebar toggle, AI-quiz answer choices, answer-key
   accordions — none of which a real <div> can receive keyboard focus for or
   activate via Enter/Space by default. Hand-patching every one of those call
   sites (several of which build their markup as an HTML string and inject it
   at runtime, so they don't even exist in the DOM at page load) would be
   both tedious and impossible to keep in sync as new ones get added. Instead,
   this watches the whole document once and keeps watching: the moment any
   qualifying element appears — now or injected later by a quiz/chapter/card
   render — it becomes tab-focusable and Enter/Space-activatable, exactly
   once, with no per-feature code changes required anywhere else. */
