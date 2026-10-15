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
    scope: 'chapter',        // 'chapter' | 'all' | 'starred'
    selectedChapterId: null, // explicit chapter ID if user chose from dropdown
    mode: 'due',             // 'due' | 'practice'
    filterType: 'all',       // 'all' | 'formula' | 'def' | 'thm' | 'example' | 'custom' | 'starred'
    reverseMode: false,      // boolean: swap front and back for active recall
    textSize: 'normal',      // 'normal' | 'large'
    activeQueue: [],

    _slugify: function(s) {
      return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60);
    },

    _starredMap: function() {
      try { return JSON.parse(localStorage.getItem('clipsat_starred_cards') || '{}'); }
      catch (e) { return {}; }
    },

    _saveStarredMap: function(m) {
      try { localStorage.setItem('clipsat_starred_cards', JSON.stringify(m)); } catch (e) {}
    },

    _isStarred: function(id) {
      return !!this._starredMap()[id];
    },

    toggleStarCurrent: function() {
      if (!this.currentCard) return;
      var map = this._starredMap();
      var id = this.currentCard.id;
      if (map[id]) delete map[id];
      else map[id] = true;
      this._saveStarredMap(map);
      this.updateCounters();
      this.loadFlashcard();
    },

    toggleReverseMode: function() {
      this.reverseMode = !this.reverseMode;
      var btn = document.getElementById('fc-reverse-toggle');
      if (btn) btn.classList.toggle('active', this.reverseMode);
      this.loadFlashcard();
    },

    toggleTextSize: function() {
      this.textSize = this.textSize === 'large' ? 'normal' : 'large';
      var sb = document.getElementById('flashcards-sidebar');
      if (sb) sb.classList.toggle('fc-large-text', this.textSize === 'large');
      var btn = document.getElementById('fc-text-size-btn');
      if (btn) btn.classList.toggle('active', this.textSize === 'large');
      try { localStorage.setItem('clipsat_fc_text_size', this.textSize); } catch (e) {}
    },

    toggleAddCustomCard: function() {
      var form = document.getElementById('fc-custom-form');
      if (!form) return;
      var isOpen = form.classList.toggle('open');
      if (isOpen) {
        var fIn = document.getElementById('fc-custom-front');
        if (fIn) { fIn.value = ''; fIn.focus(); }
        var bIn = document.getElementById('fc-custom-back');
        if (bIn) bIn.value = '';
      }
    },

    saveCustomCard: function() {
      var fIn = document.getElementById('fc-custom-front');
      var bIn = document.getElementById('fc-custom-back');
      var tagIn = document.getElementById('fc-custom-tag');
      var front = fIn ? fIn.value.trim() : '';
      var back = bIn ? bIn.value.trim() : '';
      var tag = tagIn ? tagIn.value : 'Formula';
      if (!front || !back) {
        alert(window.i18n && window.i18n.getLocale() === 'ar' ? 'يرجى كتابة نص الوجه والظهر.' : 'Please enter both front and back text.');
        return;
      }
      var track = window.CLIPSAT_TRACK || 'home';
      var chId = this.selectedChapterId || this.getActiveChapterId();
      var customList = [];
      try { customList = JSON.parse(localStorage.getItem('clipsat_custom_cards') || '[]'); } catch (e) {}
      var newCard = {
        id: 'custom:' + track + ':' + Date.now(),
        track: track,
        chapterId: chId,
        f: front,
        b: back,
        tag: tag,
        custom: true,
        createdAt: Date.now()
      };
      customList.push(newCard);
      try { localStorage.setItem('clipsat_custom_cards', JSON.stringify(customList)); } catch (e) {}

      this.toggleAddCustomCard();
      this.buildDeckFromPage();
      this.filterType = 'all';
      this.currentIndex = 0;
      this.loadFlashcard();
    },

    deleteCurrentCustomCard: function() {
      if (!this.currentCard || !this.currentCard.custom) return;
      var confirmMsg = (window.i18n && window.i18n.getLocale() === 'ar')
        ? 'هل أنت متأكد من حذف هذه البطاقة المخصصة؟'
        : 'Delete this custom flashcard?';
      if (window.confirm && !window.confirm(confirmMsg)) return;

      var customList = [];
      try { customList = JSON.parse(localStorage.getItem('clipsat_custom_cards') || '[]'); } catch (e) {}
      var idToDelete = this.currentCard.id;
      customList = customList.filter(function(c) { return c.id !== idToDelete; });
      try { localStorage.setItem('clipsat_custom_cards', JSON.stringify(customList)); } catch (e) {}

      this.buildDeckFromPage();
      this.loadFlashcard();
    },

    setFilterType: function(ft) {
      this.filterType = ft;
      this.currentIndex = 0;
      this.loadFlashcard();
    },

    updateFilterUI: function() {
      var pills = document.querySelectorAll('.fc-filter-pill');
      var self = this;
      pills.forEach(function(p) {
        var type = p.getAttribute('data-filter');
        p.classList.toggle('active', type === self.filterType);
      });
    },

    buildDeckFromPage: function() {
      var track = window.CLIPSAT_TRACK || 'home';
      var cards = [];
      var seen = {};

      function textOf(htmlOrStr) {
        if (!htmlOrStr) return '';
        var d = document.createElement('div');
        d.innerHTML = htmlOrStr;
        return (d.textContent || d.innerText || '').trim();
      }

      function addCard(front, back, tag, chEl, isCustom, customId) {
        if (!front || !back) return;
        var fText = textOf(front);
        var bText = textOf(back);
        if (!fText || !bText) return;
        if (fText.length < 2 || bText.length < 1) return;

        var chTitle = '';
        var chId = '';
        if (chEl) {
          chId = chEl.id || '';
          var h2 = chEl.querySelector('.chead h2, .subject-head h1');
          if (h2) {
            var isAr = window.i18n && window.i18n.getLocale() === 'ar';
            var trg = isAr ? h2.querySelector('.i18n-ar') : h2.querySelector('.i18n-en');
            var rawTitle = trg ? trg.textContent : (h2.innerText || h2.textContent);
            chTitle = (rawTitle || '').replace(/^[^a-zA-Z0-9\u0600-\u06FF]+/,'').trim();
          }
        }

        var slug = window.CSGamify._slugify(fText.slice(0, 40));
        var id = customId || (track + ':' + (chId || 'global') + ':' + tag + ':' + slug);
        if (seen[id]) return;
        seen[id] = 1;

        cards.push({
          id: id,
          f: front,
          b: back,
          tag: tag || 'Formula',
          chapterId: chId,
          chapterTitle: chTitle,
          custom: !!isCustom
        });
      }

      // 1. Formula cards (.fcard)
      document.querySelectorAll('.fcard').forEach(function(el) {
        if (el.closest('#flashcards-sidebar')) return;
        var frontEl = el.querySelector('.ft, .card-title, .lab');
        var front = '';
        if (frontEl) {
          var fClone = frontEl.cloneNode(true);
          fClone.querySelectorAll('button, .copy-eq-btn, .copy-btn').forEach(function(b){ b.remove(); });
          front = fClone.innerHTML.replace(/^[●▲◆■\s]+/, '').trim();
        }
        var backClone = el.cloneNode(true);
        var innerFront = backClone.querySelector('.ft, .card-title, .lab');
        if (innerFront) innerFront.remove();
        backClone.querySelectorAll('button, .copy-eq-btn, .copy-btn').forEach(function(b){ b.remove(); });
        var back = backClone.innerHTML.trim();
        addCard(front, back, 'Formula', el.closest('.chapter'));
      });

      // 2. Definitions (.callout.def)
      document.querySelectorAll('.callout.def').forEach(function(el) {
        var labEl = el.querySelector('.lab');
        var front = '';
        if (labEl) {
          var fClone = labEl.cloneNode(true);
          fClone.querySelectorAll('button, .copy-eq-btn, .copy-btn').forEach(function(b){ b.remove(); });
          front = fClone.innerHTML.replace(/^[●▲◆■\s]+/, '').trim();
        } else {
          front = 'Definition';
        }
        var backClone = el.cloneNode(true);
        var inLab = backClone.querySelector('.lab');
        if (inLab) inLab.remove();
        backClone.querySelectorAll('button, .copy-eq-btn, .copy-btn').forEach(function(b){ b.remove(); });
        var back = backClone.innerHTML.trim();
        addCard(front, back, 'Definition', el.closest('.chapter'));
      });

      // 3. Theorems, laws, rules, and formulas (.callout.thm, .callout.law, .callout.formula, .callout.rule)
      document.querySelectorAll('.callout.thm, .callout.law, .callout.formula, .callout.rule').forEach(function(el) {
        var labEl = el.querySelector('.lab');
        var front = '';
        if (labEl) {
          var fClone = labEl.cloneNode(true);
          fClone.querySelectorAll('button, .copy-eq-btn, .copy-btn').forEach(function(b){ b.remove(); });
          front = fClone.innerHTML.replace(/^[●▲◆■\s]+/, '').trim();
        } else {
          front = 'Theorem';
        }
        var backClone = el.cloneNode(true);
        var inLab = backClone.querySelector('.lab');
        if (inLab) inLab.remove();
        backClone.querySelectorAll('button, .copy-eq-btn, .copy-btn').forEach(function(b){ b.remove(); });
        var back = backClone.innerHTML.trim();
        addCard(front, back, 'Theorem', el.closest('.chapter'));
      });

      // 4. Key Tips and Notes with labels (.callout.tip, .callout.warn)
      document.querySelectorAll('.callout.tip, .callout.warn').forEach(function(el) {
        var labEl = el.querySelector('.lab');
        var front = '';
        if (labEl) {
          var fClone = labEl.cloneNode(true);
          fClone.querySelectorAll('button, .copy-eq-btn, .copy-btn').forEach(function(b){ b.remove(); });
          front = fClone.innerHTML.replace(/^[●▲◆■\s]+/, '').trim();
        }
        var backClone = el.cloneNode(true);
        var inLab = backClone.querySelector('.lab');
        if (inLab) inLab.remove();
        backClone.querySelectorAll('button, .copy-eq-btn, .copy-btn').forEach(function(b){ b.remove(); });
        var back = backClone.innerHTML.trim();
        if (front && textOf(front).length > 3) {
          addCard(front, back, 'Rule', el.closest('.chapter'));
        }
      });

      // 5. Worked Examples (.example, .worked-example, .example-grid)
      document.querySelectorAll('.example, .worked-example, .example-grid').forEach(function(el) {
        if (el.closest('#flashcards-sidebar')) return;
        var labelEl = el.querySelector('.xt, .card-title, p:first-child');
        var front = '';
        if (labelEl) {
          var fClone = labelEl.cloneNode(true);
          fClone.querySelectorAll('button').forEach(function(b){ b.remove(); });
          front = fClone.innerHTML.replace(/^[●▲◆■\s]+/, '').trim();
        } else {
          front = 'Worked Example';
        }
        var clone = el.cloneNode(true);
        var inLab = clone.querySelector('.xt, .card-title');
        if (inLab) inLab.remove();
        clone.querySelectorAll('button, .copy-eq-btn, .copy-btn').forEach(function(b){ b.remove(); });
        var back = clone.innerHTML.trim();
        addCard(front, back, 'Example', el.closest('.chapter'));
      });

      // 6. Practice Problems in lesson (.problem)
      document.querySelectorAll('.chapter .problem').forEach(function(el) {
        if (el.closest('#flashcards-sidebar') || el.closest('#mistake-box')) return;
        var qEl = el.querySelector('.problem-q, .pq, .qt');
        var solEl = el.querySelector('.solution');
        var front = qEl ? qEl.innerHTML.trim() : '';
        var back = solEl ? solEl.innerHTML.trim() : '';
        addCard(front, back, 'Problem', el.closest('.chapter'));
      });

      // 7. Custom Flashcards (saved by user for this track)
      var customCards = [];
      try { customCards = JSON.parse(localStorage.getItem('clipsat_custom_cards') || '[]'); } catch(e) {}
      var activeCh = this.getActiveChapterId();
      var activeChEl = document.getElementById(activeCh);
      customCards.forEach(function(cc) {
        if (cc.track && cc.track !== track && cc.track !== 'all') return;
        var targetChEl = cc.chapterId ? document.getElementById(cc.chapterId) : activeChEl;
        addCard(cc.f, cc.b, cc.tag || 'Custom', targetChEl, true, cc.id);
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
      var any = document.querySelector('.chapter:not(.testgen):not(.downloads):not([id*="testgen"]):not([id*="downloads"])');
      return any ? any.id : '';
    },

    populateLessonSelect: function() {
      var sel = document.getElementById('fc-lesson-select');
      if (!sel) return;
      var track = window.CLIPSAT_TRACK || 'home';
      var activeCh = this.selectedChapterId || this.getActiveChapterId();
      var activeTitle = '';

      var chapters = [];
      document.querySelectorAll('section.chapter').forEach(function(sec) {
        if (sec.classList.contains('testgen') || sec.classList.contains('downloads') ||
            sec.id.indexOf('testgen') !== -1 || sec.id.indexOf('downloads') !== -1) return;
        var h2 = sec.querySelector('.chead h2, .subject-head h1');
        var title = h2 ? h2.textContent.replace(/^[^a-zA-Z\u0600-\u06FF]+/,'').trim() : sec.id;
        if (sec.id === activeCh) activeTitle = title;
        chapters.push({ id: sec.id, title: title });
      });

      var isAr = window.i18n && window.i18n.getLocale() === 'ar';
      var currLabel = (isAr ? '📍 الدرس الحالي' : '📍 Current Lesson') + (activeTitle ? ': ' + activeTitle : '');
      var allLabel = isAr ? '🌐 جميع دروس المسار' : '🌐 All Lessons in Course';
      var starLabel = isAr ? '⭐ المميزة بنجمة' : '⭐ Starred Cards';

      var html = '';
      html += '<option value="__current__"' + (this.scope === 'chapter' && !this.selectedChapterId ? ' selected' : '') + '>' + currLabel + '</option>';
      html += '<option value="__all__"' + (this.scope === 'all' ? ' selected' : '') + '>' + allLabel + '</option>';
      html += '<option value="__starred__"' + (this.scope === 'starred' ? ' selected' : '') + '>' + starLabel + '</option>';

      if (chapters.length) {
        html += '<optgroup label="' + (isAr ? 'دروس المسار' : 'Course Lessons') + '">';
        var self = this;
        chapters.forEach(function(ch, idx) {
          var isSel = (self.scope === 'chapter' && self.selectedChapterId === ch.id);
          html += '<option value="' + ch.id + '"' + (isSel ? ' selected' : '') + '>' + (idx + 1) + '. ' + ch.title + '</option>';
        });
        html += '</optgroup>';
      }

      sel.innerHTML = html;
    },

    onSelectLesson: function(val) {
      if (val === '__current__') {
        this.scope = 'chapter';
        this.selectedChapterId = null;
      } else if (val === '__all__') {
        this.scope = 'all';
        this.selectedChapterId = null;
      } else if (val === '__starred__') {
        this.scope = 'starred';
        this.selectedChapterId = null;
      } else {
        this.scope = 'chapter';
        this.selectedChapterId = val;
        if (window.goChapter) {
          try { window.goChapter(val); } catch (e) {}
        }
      }
      this.currentIndex = 0;
      this.loadFlashcard();
    },

    updateQueue: function() {
      if (this._deckTrack !== (window.CLIPSAT_TRACK || 'home') || !this.srsDeck.length) {
        this.buildDeckFromPage();
      }
      var state = this._srsState();
      var now = Date.now();
      var activeCh = this.selectedChapterId || this.getActiveChapterId();
      var self = this;

      // 1. Filter by lesson scope
      var pool = this.srsDeck;
      if (this.scope === 'chapter' && activeCh) {
        var filtered = pool.filter(function(c) { return c.chapterId === activeCh; });
        if (filtered.length) pool = filtered;
      } else if (this.scope === 'starred') {
        pool = pool.filter(function(c) { return self._isStarred(c.id); });
      }

      // 2. Filter by category
      if (this.filterType === 'formula') {
        pool = pool.filter(function(c) { return c.tag === 'Formula'; });
      } else if (this.filterType === 'def') {
        pool = pool.filter(function(c) { return c.tag === 'Definition'; });
      } else if (this.filterType === 'thm') {
        pool = pool.filter(function(c) { return c.tag === 'Theorem' || c.tag === 'Rule'; });
      } else if (this.filterType === 'example') {
        pool = pool.filter(function(c) { return c.tag === 'Example' || c.tag === 'Problem'; });
      } else if (this.filterType === 'starred') {
        pool = pool.filter(function(c) { return self._isStarred(c.id); });
      } else if (this.filterType === 'custom') {
        pool = pool.filter(function(c) { return c.custom; });
      }

      // 3. Filter by mode (Due vs Practice All)
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
      var starredCount = 0;
      var counts = { all: 0, formula: 0, def: 0, thm: 0, example: 0, custom: 0, starred: 0 };
      var self = this;

      var activeCh = this.selectedChapterId || this.getActiveChapterId();
      var pool = (this.scope === 'chapter' && activeCh)
        ? this.srsDeck.filter(function(c) { return c.chapterId === activeCh; })
        : this.srsDeck;

      pool.forEach(function(c) {
        var s = state[c.id];
        if (!s || s.due <= now) dueCount++;
        if (s && s.interval >= 6) masteredCount++;
        if (self._isStarred(c.id)) { starredCount++; counts.starred++; }
        counts.all++;
        if (c.tag === 'Formula') counts.formula++;
        else if (c.tag === 'Definition') counts.def++;
        else if (c.tag === 'Theorem' || c.tag === 'Rule') counts.thm++;
        else if (c.tag === 'Example' || c.tag === 'Problem') counts.example++;
        if (c.custom) counts.custom++;
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
      var starNum = document.getElementById('fc-starred-num');
      if (starNum) starNum.textContent = starredCount;

      var dueEl = document.getElementById('fc-due-count');
      if (dueEl) dueEl.textContent = dueCount;

      // Update category pill badges
      var bAll = document.getElementById('fc-badge-all'); if (bAll) bAll.textContent = counts.all;
      var bForm = document.getElementById('fc-badge-formula'); if (bForm) bForm.textContent = counts.formula;
      var bDef = document.getElementById('fc-badge-def'); if (bDef) bDef.textContent = counts.def;
      var bThm = document.getElementById('fc-badge-thm'); if (bThm) bThm.textContent = counts.thm;
      var bEx = document.getElementById('fc-badge-example'); if (bEx) bEx.textContent = counts.example;
      var bStar = document.getElementById('fc-badge-starred'); if (bStar) bStar.textContent = counts.starred;
      var bCust = document.getElementById('fc-badge-custom'); if (bCust) bCust.textContent = counts.custom;
    },

    loadFlashcard: function() {
      this.updateQueue();
      this.updateCounters();
      this.updateFilterUI();
      this.populateLessonSelect();

      var stage = document.querySelector('.fc-stage');
      var doneView = document.getElementById('fc-done-view');
      var controlsWrap = document.querySelector('.fc-controls-wrap');
      var frontEl = document.getElementById('fc-front-text');
      var backEl = document.getElementById('fc-back-text');
      var tagEl = document.getElementById('fc-card-tag');
      var backTagEl = document.getElementById('fc-back-tag');
      var chEl = document.getElementById('fc-card-ch');
      var idxEl = document.getElementById('fc-card-idx');
      var progFill = document.getElementById('fc-progress-fill');
      var card = document.getElementById('active-flashcard');
      var trackSubtitle = document.getElementById('fc-track-subtitle');
      var starBtn = document.getElementById('fc-star-btn');
      var starBtnBack = document.getElementById('fc-star-btn-back');
      var delBtn = document.getElementById('fc-delete-btn');

      if (trackSubtitle) {
        var subj = document.querySelector('.subject-head h1, .chead h2');
        var trkName = subj ? subj.textContent.trim() : 'Math Course';
        var activeCh = this.selectedChapterId || this.getActiveChapterId();
        var chSec = activeCh ? document.getElementById(activeCh) : null;
        var chH2 = chSec ? chSec.querySelector('.chead h2') : null;
        var chTitle = chH2 ? chH2.textContent.replace(/^[^a-zA-Z\u0600-\u06FF]+/,'').trim() : '';
        trackSubtitle.textContent = trkName + (chTitle ? ' · ' + chTitle : '');
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
          var isAr = window.i18n && window.i18n.getLocale() === 'ar';
          if (p2) {
            p2.textContent = this.filterType !== 'all'
              ? (isAr ? 'لا توجد بطاقات في هذا التصنيف المحدد.' : 'No cards found in this selected category.')
              : (isAr ? 'أكملت مراجعة جميع البطاقات المجدولة لهذا الدرس اليوم!' : 'You are all caught up on scheduled reviews for this lesson!');
          }
          var btn1 = doneView.querySelector('.fc-btn-primary');
          if (btn1) {
            btn1.style.display = 'inline-block';
            btn1.textContent = isAr ? 'تدريب على جميع البطاقات' : 'Study All Cards Anyway';
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

      var isAr = window.i18n && window.i18n.getLocale() === 'ar';
      var tagLabel = c.tag;
      if (isAr) {
        tagLabel = c.tag === 'Definition' ? 'تعريف'
                 : c.tag === 'Theorem' ? 'مبرهنة'
                 : c.tag === 'Rule' ? 'قاعدة / نصيحة'
                 : c.tag === 'Example' ? 'مثال محلول'
                 : c.tag === 'Problem' ? 'مسألة تدريبية'
                 : c.tag === 'Custom' ? 'بطاقة مخصصة'
                 : 'قانون';
      }

      if (this.reverseMode) {
        if (tagEl) tagEl.textContent = isAr ? 'عكسي: استذكر المفهوم' : 'REVERSE: RECALL CONCEPT';
        if (backTagEl) backTagEl.textContent = tagLabel.toUpperCase();
        if (frontEl) frontEl.innerHTML = c.b;
        if (backEl) backEl.innerHTML = c.f;
      } else {
        if (tagEl) tagEl.textContent = tagLabel.toUpperCase();
        if (backTagEl) backTagEl.textContent = isAr ? 'الإجابة / القانون' : 'ANSWER / RECALL';
        if (frontEl) frontEl.innerHTML = c.f;
        if (backEl) backEl.innerHTML = c.b;
      }

      if (chEl) chEl.textContent = c.chapterTitle || '';

      // Star status
      var starred = this._isStarred(c.id);
      if (starBtn) {
        starBtn.classList.toggle('starred', starred);
        starBtn.textContent = starred ? '★' : '☆';
        starBtn.title = starred ? (isAr ? 'إلغاء التمييز' : 'Unstar card') : (isAr ? 'تمييز بنجمة' : 'Star card');
      }
      if (starBtnBack) {
        starBtnBack.classList.toggle('starred', starred);
        starBtnBack.textContent = starred ? '★' : '☆';
      }

      // Delete custom button
      if (delBtn) {
        delBtn.style.display = c.custom ? 'inline-flex' : 'none';
      }

      if (idxEl) {
        var cardOfTpl = isAr
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
        mastInt.textContent = isAr ? nextDays + '+ أيام' : nextDays + '+ days';
      }

      // Bilingual translation filtering
      if (window.i18n && typeof window.i18n._applyToDOM === 'function' && card) {
        try { window.i18n._applyToDOM(card); } catch(e) {}
      }

      // KaTeX and MathJax rendering for math formulas
      var fcDelims = [
        { left: "$$", right: "$$", display: true },
        { left: "\\[", right: "\\]", display: true },
        { left: "\\(", right: "\\)", display: false },
        { left: "$", right: "$", display: false }
      ];
      if (window.renderMathInElement && card) {
        try {
          window.renderMathInElement(card, {
            delimiters: fcDelims,
            throwOnError: false
          });
        } catch(e) {}
      }
      if (window.MathJax && typeof window.MathJax.typesetPromise === 'function' && card) {
        try { window.MathJax.typesetPromise([card]).catch(function(){}); } catch(e) {}
      }
    },

    flipCard: function() {
      var card = document.getElementById('active-flashcard');
      if (card) {
        card.classList.toggle('flipped');
        if (window.renderMathInElement && card.classList.contains('flipped')) {
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
      }
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
      this.selectedChapterId = null;
      var sel = document.getElementById('fc-lesson-select');
      if (sel) {
        if (s === 'chapter') sel.value = '__current__';
        else if (s === 'all') sel.value = '__all__';
        else if (s === 'starred') sel.value = '__starred__';
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
      this.buildDeckFromPage();
      this.populateLessonSelect();
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
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT')) return;

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
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        window.CSGamify.toggleStarCurrent();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        window.CSGamify.toggleReverseMode();
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

  window.toggleWhiteboard = function() {
    window._ensureWhiteboard().then(function() {
      if (window.CSGamify) {
        if (!document.getElementById('wbToolbar') && window.CSGamify.setupWhiteboard) {
          window.CSGamify.setupWhiteboard();
        }
        if (window.CSGamify.toggleWhiteboard) {
          window.CSGamify.toggleWhiteboard();
        }
      }
    }).catch(function(err) {
      console.warn('Whiteboard failed to initialize:', err);
    });
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
