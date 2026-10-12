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
    currentIndex: 0,
    scope: 'chapter', // 'chapter' | 'all'
    mode: 'due',      // 'due' | 'practice'
    activeQueue: [],

    _slugify: function(s) {
      return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
    },

    buildDeckFromPage: function() {
      var track = window.CLIPSAT_TRACK || 'home';
      var cards = [];
      var seen = {};

      function addCard(front, back, tag, chEl) {
        if (!front || !back) return;
        front = front.trim();
        back = back.trim();
        if (!front || !back) return;
        var slug = window.CSGamify._slugify(front);
        var id = track + ':' + slug;
        if (seen[id]) return;
        seen[id] = 1;

        var chTitle = '';
        var chId = '';
        if (chEl) {
          chId = chEl.id || '';
          var h2 = chEl.querySelector('.chead h2, .subject-head h1');
          if (h2) chTitle = h2.textContent.replace(/^[^a-zA-Z\u0600-\u06FF]+/,'').trim();
        }
        cards.push({
          id: id,
          f: front,
          b: back,
          tag: tag || 'Formula',
          chapterId: chId,
          chapterTitle: chTitle
        });
      }

      // 1. Formula cards (.fcard)
      document.querySelectorAll('.fcard').forEach(function(el) {
        if (el.closest('#flashcards-sidebar')) return;
        var frontEl = el.querySelector('.ft, .card-title, .lab');
        var front = frontEl ? frontEl.textContent.replace(/^[●▲◆■\s]+/, '').replace(/📋\s*Copy\s*LaTeX/gi, '').trim() : '';
        var backClone = el.cloneNode(true);
        var innerFront = backClone.querySelector('.ft, .card-title, .lab');
        if (innerFront) innerFront.remove();
        var back = backClone.innerHTML;
        if (front && back) {
          addCard(front, back, 'Formula', el.closest('.chapter'));
        }
      });

      // 2. Definitions (.callout.def)
      document.querySelectorAll('.callout.def').forEach(function(el) {
        var labEl = el.querySelector('.lab');
        var front = labEl ? labEl.textContent.replace(/^[●▲◆■\s]+/, '').replace(/📋\s*Copy\s*LaTeX/gi, '').trim() : 'Definition';
        var bodyEl = el.querySelector('p, .def-body, .body');
        var back = bodyEl ? bodyEl.innerHTML : '';
        if (front && back) {
          addCard(front, back, 'Definition', el.closest('.chapter'));
        }
      });

      // 3. Theorems, laws, rules, and formulas (.callout.thm, .callout.law, .callout.formula, .callout.rule)
      document.querySelectorAll('.callout.thm, .callout.law, .callout.formula, .callout.rule').forEach(function(el) {
        var labEl = el.querySelector('.lab');
        var front = labEl ? labEl.textContent.replace(/^[●▲◆■\s]+/, '').replace(/📋\s*Copy\s*LaTeX/gi, '').trim() : 'Theorem';
        var bodyEl = el.querySelector('p, .body');
        var back = bodyEl ? bodyEl.innerHTML : '';
        if (front && back) {
          addCard(front, back, 'Theorem', el.closest('.chapter'));
        }
      });

      this.srsDeck = cards;
      this._deckTrack = track;
      this.updateCounters();
    },

    _srsState: function() {
      try { return JSON.parse(localStorage.getItem('clipsat_srs_state') || '{}'); }
      catch (e) { return {}; }
    },

    _saveSrsState: function(state) {
      try { localStorage.setItem('clipsat_srs_state', JSON.stringify(state)); } catch (e) {}
    },

    getActiveChapterId: function() {
      var act = document.querySelector('.chapter.ch-active');
      if (act && act.id) return act.id;
      var any = document.querySelector('.chapter:not(.testgen):not(.testgen *)');
      return any ? any.id : '';
    },

    updateQueue: function() {
      if (this._deckTrack !== (window.CLIPSAT_TRACK || 'home') || !this.srsDeck.length) {
        this.buildDeckFromPage();
      }
      var state = this._srsState();
      var now = Date.now();
      var activeCh = this.getActiveChapterId();

      var pool = this.srsDeck;
      if (this.scope === 'chapter' && activeCh) {
        var filtered = pool.filter(function(c) { return c.chapterId === activeCh; });
        if (filtered.length) pool = filtered;
      }

      if (this.mode === 'due') {
        var dueList = pool.filter(function(c) {
          var s = state[c.id];
          return !s || s.due <= now;
        });
        this.activeQueue = dueList;
      } else {
        this.activeQueue = pool.slice();
      }

      if (this.currentIndex >= this.activeQueue.length) {
        this.currentIndex = 0;
      }
    },

    updateCounters: function() {
      var state = this._srsState();
      var now = Date.now();
      var dueCount = 0;
      var masteredCount = 0;

      this.srsDeck.forEach(function(c) {
        var s = state[c.id];
        if (!s || s.due <= now) dueCount++;
        if (s && s.interval >= 6) masteredCount++;
      });

      var badge = document.getElementById('fc-due-badge');
      if (badge) {
        badge.textContent = dueCount;
        if (dueCount === 0) badge.classList.add('empty');
        else badge.classList.remove('empty');
      }
      var dueNum = document.getElementById('fc-due-num');
      if (dueNum) dueNum.textContent = dueCount;
      var mastNum = document.getElementById('fc-mastered-num');
      if (mastNum) mastNum.textContent = masteredCount;

      var dueEl = document.getElementById('fc-due-count');
      if (dueEl) dueEl.textContent = dueCount;
    },

    loadFlashcard: function() {
      this.updateQueue();
      this.updateCounters();

      var stage = document.querySelector('.fc-stage');
      var doneView = document.getElementById('fc-done-view');
      var controlsWrap = document.querySelector('.fc-controls-wrap');
      var frontEl = document.getElementById('fc-front-text');
      var backEl = document.getElementById('fc-back-text');
      var tagEl = document.getElementById('fc-card-tag');
      var chEl = document.getElementById('fc-card-ch');
      var idxEl = document.getElementById('fc-card-idx');
      var progFill = document.getElementById('fc-progress-fill');
      var card = document.getElementById('active-flashcard');
      var trackSubtitle = document.getElementById('fc-track-subtitle');

      if (trackSubtitle) {
        var subj = document.querySelector('.subject-head h1');
        trackSubtitle.textContent = subj ? subj.textContent.trim() : 'Math Flashcards';
      }

      if (!this.srsDeck.length) {
        this.currentCard = null;
        if (stage) stage.style.display = 'none';
        if (controlsWrap) controlsWrap.style.display = 'none';
        if (doneView) {
          doneView.style.display = 'flex';
          var p = doneView.querySelector('p');
          if (p) p.textContent = (window.i18n && window.i18n.getLocale() === 'ar')
            ? 'افتح أي درس لعرض بطاقات القوانين والمفاهيم الخاصة به.'
            : 'Open a lesson to load its active recall flashcards.';
          var b1 = doneView.querySelector('.fc-btn-primary');
          if (b1) b1.style.display = 'none';
          var b2 = doneView.querySelector('.fc-btn-secondary');
          if (b2) b2.style.display = 'none';
        }
        return;
      }

      if (!this.activeQueue.length) {
        this.currentCard = null;
        if (stage) stage.style.display = 'none';
        if (controlsWrap) controlsWrap.style.display = 'none';
        if (doneView) {
          doneView.style.display = 'flex';
          var p2 = doneView.querySelector('p');
          if (p2) p2.textContent = (window.i18n && window.i18n.getLocale() === 'ar')
            ? 'أكملت مراجعة جميع البطاقات المجدولة لهذا اليوم!'
            : 'You are all caught up on scheduled reviews for this section!';
          var btn1 = doneView.querySelector('.fc-btn-primary');
          if (btn1) {
            btn1.style.display = 'inline-block';
            btn1.textContent = (window.i18n && window.i18n.getLocale() === 'ar')
              ? 'تدريب على جميع البطاقات'
              : 'Study All Cards Anyway';
          }
          var btn2 = doneView.querySelector('.fc-btn-secondary');
          if (btn2) btn2.style.display = 'inline-block';
        }
        return;
      }

      if (stage) stage.style.display = 'flex';
      if (controlsWrap) controlsWrap.style.display = 'flex';
      if (doneView) doneView.style.display = 'none';

      var c = this.activeQueue[this.currentIndex];
      this.currentCard = c;

      if (card) card.classList.remove('flipped');

      if (tagEl) {
        tagEl.textContent = (window.i18n && window.i18n.getLocale() === 'ar')
          ? (c.tag === 'Definition' ? 'تعريف' : (c.tag === 'Theorem' ? 'مبرهنة / قاعدة' : 'قانون'))
          : c.tag.toUpperCase();
      }
      if (chEl) chEl.textContent = c.chapterTitle || '';
      if (frontEl) frontEl.innerHTML = c.f;
      if (backEl) backEl.innerHTML = c.b;

      if (idxEl) {
        var cardOfTpl = (window.i18n && window.i18n.getLocale() === 'ar')
          ? 'بطاقة ' + (this.currentIndex + 1) + ' من ' + this.activeQueue.length
          : 'Card ' + (this.currentIndex + 1) + ' of ' + this.activeQueue.length;
        idxEl.textContent = cardOfTpl;
      }

      if (progFill) {
        var pct = Math.round(((this.currentIndex + 1) / this.activeQueue.length) * 100);
        progFill.style.width = pct + '%';
      }

      // Next interval preview
      var state = this._srsState();
      var prev = state[c.id] || { interval: 0 };
      var nextDays = Math.max(3, prev.interval * 2);
      var mastInt = document.getElementById('fc-master-interval');
      if (mastInt) {
        mastInt.textContent = (window.i18n && window.i18n.getLocale() === 'ar')
          ? nextDays + '+ أيام'
          : nextDays + '+ days';
      }

      // KaTeX rendering for math formulas
      if (window.renderMathInElement && card) {
        try {
          window.renderMathInElement(card, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "\\[", right: "\\]", display: true },
              { left: "\\(", right: "\\)", display: false },
              { left: "$", right: "$", display: false }
            ],
            throwOnError: false
          });
        } catch(e) {}
      }
    },

    flipCard: function() {
      var card = document.getElementById('active-flashcard');
      if (card) card.classList.toggle('flipped');
    },

    recordSRS: function(isCorrect) {
      if (!this.currentCard) return;
      var state = this._srsState();
      var prev = state[this.currentCard.id] || { interval: 0 };
      var nextInterval = isCorrect ? Math.max(3, prev.interval * 2) : 1;
      state[this.currentCard.id] = { due: Date.now() + nextInterval * 86400000, interval: nextInterval };
      this._saveSrsState(state);

      if (isCorrect) {
        this.addXP(15);
      }

      var card = document.getElementById('active-flashcard');
      if (card) card.classList.remove('flipped');

      var self = this;
      setTimeout(function() {
        if (self.mode === 'due') {
          self.loadFlashcard();
        } else {
          self.nextCard();
        }
      }, 250);
    },

    nextCard: function() {
      if (!this.activeQueue.length) return;
      this.currentIndex = (this.currentIndex + 1) % this.activeQueue.length;
      this.loadFlashcard();
    },

    prevCard: function() {
      if (!this.activeQueue.length) return;
      this.currentIndex = (this.currentIndex - 1 + this.activeQueue.length) % this.activeQueue.length;
      this.loadFlashcard();
    },

    shuffleDeck: function() {
      for (var i = this.activeQueue.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.activeQueue[i];
        this.activeQueue[i] = this.activeQueue[j];
        this.activeQueue[j] = temp;
      }
      this.currentIndex = 0;
      this.loadFlashcard();
    },

    setScope: function(s) {
      this.scope = s;
      var bCh = document.getElementById('fc-scope-ch');
      var bAll = document.getElementById('fc-scope-all');
      if (bCh && bAll) {
        if (s === 'chapter') { bCh.classList.add('active'); bAll.classList.remove('active'); }
        else { bAll.classList.add('active'); bCh.classList.remove('active'); }
      }
      this.currentIndex = 0;
      this.loadFlashcard();
    },

    togglePracticeMode: function() {
      this.mode = this.mode === 'due' ? 'practice' : 'due';
      var lbl = document.getElementById('fc-mode-label');
      var btn = document.getElementById('fc-mode-toggle');
      if (lbl) {
        lbl.textContent = this.mode === 'due'
          ? ((window.i18n && window.i18n.getLocale() === 'ar') ? 'المستحق فقط' : 'Due Only')
          : ((window.i18n && window.i18n.getLocale() === 'ar') ? 'تدريب شامل' : 'Practice All');
      }
      if (btn) {
        if (this.mode === 'practice') btn.classList.add('active');
        else btn.classList.remove('active');
      }
      this.currentIndex = 0;
      this.loadFlashcard();
    },

    startPracticeAll: function() {
      this.mode = 'practice';
      var lbl = document.getElementById('fc-mode-label');
      var btn = document.getElementById('fc-mode-toggle');
      if (lbl) lbl.textContent = (window.i18n && window.i18n.getLocale() === 'ar') ? 'تدريب شامل' : 'Practice All';
      if (btn) btn.classList.add('active');
      this.currentIndex = 0;
      this.loadFlashcard();
    },

    resetSRS: function() {
      var confirmMsg = (window.i18n && window.i18n.getLocale() === 'ar')
        ? 'هل تريد إعادة ضبط جدولة مراجعة جميع بطاقات هذا المسار؟'
        : 'Reset review schedule for all cards in this track?';
      if (window.confirm && !window.confirm(confirmMsg)) return;

      var state = this._srsState();
      var track = window.CLIPSAT_TRACK || 'home';
      Object.keys(state).forEach(function(k) {
        if (k.indexOf(track + ':') === 0) delete state[k];
      });
      this._saveSrsState(state);
      this.mode = 'due';
      this.currentIndex = 0;
      this.loadFlashcard();
    },

    openFlashcards: function() {
      this.loadFlashcard();
      var sb = document.getElementById('flashcards-sidebar');
      var bd = document.getElementById('fc-backdrop');
      if (sb) sb.classList.add('open');
      if (bd) bd.classList.add('active');
      document.addEventListener('keydown', window.CSGamify._onKey);
    },

    closeFlashcards: function() {
      var sb = document.getElementById('flashcards-sidebar');
      var bd = document.getElementById('fc-backdrop');
      if (sb) sb.classList.remove('open');
      if (bd) bd.classList.remove('active');
      document.removeEventListener('keydown', window.CSGamify._onKey);
    },

    toggleFlashcards: function() {
      var sb = document.getElementById('flashcards-sidebar');
      if (sb && sb.classList.contains('open')) this.closeFlashcards();
      else this.openFlashcards();
    },

    _onKey: function(e) {
      var sb = document.getElementById('flashcards-sidebar');
      if (!sb || !sb.classList.contains('open')) return;
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        window.CSGamify.closeFlashcards();
      } else if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        window.CSGamify.flipCard();
      } else if (e.key === '1' || e.key === 'ArrowLeft') {
        e.preventDefault();
        window.CSGamify.recordSRS(false);
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        e.preventDefault();
        window.CSGamify.recordSRS(true);
      } else if (e.key === 'ArrowDown' || e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        window.CSGamify.nextCard();
      } else if (e.key === 'ArrowUp' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        window.CSGamify.prevCard();
      }
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

  /* Hook into goChapter to refresh flashcards deck when user changes chapters */
  (function patchGoChapter() {
    var tries = 0;
    var interval = setInterval(function() {
      tries++;
      if (window.goChapter) {
        var origGC = window.goChapter;
        window.goChapter = function(id, view) {
          var res = origGC.apply(this, arguments);
          setTimeout(function() {
            if (window.CSGamify) {
              window.CSGamify.buildDeckFromPage();
              window.CSGamify.updateCounters();
              var sb = document.getElementById('flashcards-sidebar');
              if (sb && sb.classList.contains('open')) {
                window.CSGamify.loadFlashcard();
              }
            }
          }, 100);
          return res;
        };
        clearInterval(interval);
      }
      if (tries > 50) clearInterval(interval);
    }, 100);
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
