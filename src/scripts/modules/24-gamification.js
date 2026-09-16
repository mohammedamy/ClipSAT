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
    },

    /* ══════════════════════════════════════════════════════════════════════════
       D.  TEACHER INTERACTIVE WHITEBOARD

       Was: a single hardcoded 3px red pen, mouse-only, confined to
       drawing only on top of canvas explorers (one overlay per
       .canvas-wrap), no eraser, no way to clear a mistake, and CSS for
       a color toolbar (.wb-toolbar/.wb-tool) that was never actually
       built or wired to anything. Also never reset on leaving Teacher
       Mode, so old ink and an active drawing-mode cursor could persist
       after the teacher turned Teacher Mode back off.

       Now: ONE full-viewport overlay canvas (position:fixed, covers the
       whole screen, not just explorers) with a real floating toolbar —
       pen/highlighter/eraser modes, 5 pen colors, a size slider, undo,
       and a "sweep the board" clear-all — backed by pointer events
       (mouse + touch + stylus in one listener set) and real compositing:
       the eraser genuinely removes pixels via
       globalCompositeOperation:'destination-out' rather than "drawing
       white," so it erases correctly over any background. Explicitly
       gated to Teacher Mode + the whiteboard's own on/off toggle only —
       exitWhiteboard() (called the instant Teacher Mode itself turns
       off, see the MutationObserver hook below) force-deactivates the
       overlay, wipes every stroke, and hides the toolbar, so leaving
       Teacher Mode always hands the mouse straight back to normal page
       interaction with zero leftover state, rather than a board that
       quietly resumes where it left off next time. Undo is a short
       ImageData snapshot stack taken right before each stroke starts,
       capped at 25 steps so it can't grow unbounded during a long lesson.
       ══════════════════════════════════════════════════════════════════════════ */
    wbActive: false,
    wbMode: 'pen',            // 'pen' | 'highlighter' | 'eraser'
    // Pen and highlighter keep their own separate "last color used" so
    // switching tools never loses what you had selected on the other one —
    // a teacher writing in navy pen, then flicking to the highlighter,
    // expects the highlighter to still be on whatever bright color they
    // picked last, not to inherit navy.
    wbPenColor: '#ef4444',
    wbHighlighterColor: '#fde047',
    wbSize: 3,                // 1–10 "base" unit; scaled per mode in _applyStrokeStyle
    _wbColors: ['#ef4444', '#3b82f6', '#1e3a6e', '#16a34a', '#111827'],
    // Deliberately more saturated/vivid than the pen palette above (and at
    // a higher fixed alpha in _applyStrokeStyle) — a highlighter that uses
    // the same muted swatches as the pen just reads as a dim, half-opacity
    // version of the pen color instead of a real highlighter. These are
    // chosen to still hold up against the extra alpha wash: bright yellow,
    // lime, sky, pink, orange.
    _wbHighlighterColors: ['#fde047', '#4ade80', '#22d3ee', '#f472b6', '#fb923c'],
    _wbOverlay: null,          // {canvas, ctx, undo:[ImageData,...]} — one, for the whole screen

    setupWhiteboard: function() {
      this._ensureToolbar();
      if (this._wbOverlay) { this._sizeOverlay(); return; } // already set up from an earlier Teacher Mode session
      var self = this;
      var overlay = document.createElement('canvas');
      overlay.id = 'wbFullOverlay';
      overlay.className = 'wb-overlay';
      document.body.appendChild(overlay);
      var ctx = overlay.getContext('2d');
      var entry = { canvas: overlay, ctx: ctx, undo: [] };
      this._wbOverlay = entry;
      this._sizeOverlay();

      var drawing = false, rectCache = null;
      // clientX/clientY minus the overlay's own bounding rect, cached once
      // per stroke (see pointerdown) — deliberately not e.offsetX/e.offsetY:
      // those are undefined on the synthetic-ish PointerEvent objects
      // getCoalescedEvents() below hands back in some engines, where
      // clientX/clientY are always populated.
      function _wbLocalXY(e) {
        return { x: e.clientX - rectCache.left, y: e.clientY - rectCache.top };
      }
      overlay.addEventListener('pointerdown', function(e) {
        if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return; // left-click only for a mouse
        try { overlay.setPointerCapture(e.pointerId); } catch (err) {}
        drawing = true;
        rectCache = overlay.getBoundingClientRect();
        self._wbSnapshot(entry);
        self._applyStrokeStyle(ctx);
        var pt = _wbLocalXY(e);
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
      });
      overlay.addEventListener('pointermove', function(e) {
        if (!drawing) return;
        // getCoalescedEvents() replays every raw sample the OS captured
        // since the last pointermove (a fast stroke, or a high-sampling-
        // rate stylus/finger, can generate several per animation frame)
        // instead of only the single most-recent point. Without this, a
        // quick stroke degrades into a handful of long straight segments
        // rather than a smooth curve — that gap is what actually reads as
        // "low resolution"/laggy pen input, not the rendering itself.
        var pts = (typeof e.getCoalescedEvents === 'function' && e.getCoalescedEvents()) || null;
        if (!pts || !pts.length) pts = [e];
        for (var i = 0; i < pts.length; i++) {
          var ev = pts[i], pt = _wbLocalXY(ev);
          // Real pressure-sensitive input (stylus/Apple Pencil/S Pen) varies
          // the stroke width like an actual pen, instead of the flat width
          // every mouse/touch/software pointer reports. Mouse pointers
          // always report pressure 0 or the Pointer Events spec's software
          // default of .5, and untouched fingers report .5 too, so this
          // only ever engages for a genuine pressure-capable device.
          if (self.wbMode === 'pen' && ev.pointerType === 'pen' && ev.pressure) {
            ctx.lineWidth = self.wbSize * (0.5 + ev.pressure);
          }
          ctx.lineTo(pt.x, pt.y);
          ctx.stroke();
          // Restart the subpath at the current point each move, so each
          // stroke() call only re-renders the newest segment instead of
          // the whole path-so-far (matters once a stroke has many points).
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
        }
      });
      function stopStroke() {
        if (!drawing) return;
        drawing = false;
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
      }
      overlay.addEventListener('pointerup', stopStroke);
      overlay.addEventListener('pointercancel', stopStroke);
      overlay.addEventListener('pointerleave', stopStroke);

      // Keep the buffer matched to the viewport across a real window
      // resize/orientation change. Skipped mid-stroke so an in-flight
      // resize can't wipe a drawing the teacher is still making.
      window.addEventListener('resize', function() {
        if (!drawing) self._sizeOverlay();
      });

      // Defensive: apply whatever wbActive already is right now. In normal
      // use this is always false here (the Whiteboard button that sets it
      // true isn't even shown until this same setup call has returned —
      // see the MutationObserver hook), but this keeps the overlay's
      // visibility correct regardless of call order rather than assuming it.
      this._applyWBVisibility();
    },

    _sizeOverlay: function() {
      var entry = this._wbOverlay;
      if (!entry) return;
      var overlay = entry.canvas, ctx = entry.ctx;
      // Match the canvas's backing-store resolution to the real device
      // pixel ratio, not just the CSS viewport size. Previously the
      // backing store was sized 1:1 with CSS pixels (innerWidth ×
      // innerHeight), so on any HiDPI/Retina display — the majority of
      // phones/laptops/tablets a teacher actually uses — the browser had
      // to upscale every stroke to cover the larger physical pixel grid,
      // producing visibly soft/blurry ink next to the crisp page text
      // around it. Scaling the backing store by dpr and drawing through a
      // matching ctx transform (so pointer coordinates below stay in
      // familiar CSS-pixel space) fixes that without touching the drawing
      // logic itself.
      //
      // "the pen isn't calibrated" (ink lands visibly off from the real
      // cursor/stylus position, worse the further from the top-left corner
      // you draw): window.innerWidth/innerHeight INCLUDE a classic,
      // reserved-width scrollbar (the default on most desktop Windows/
      // Linux browsers — anything without overlay scrollbars), but the
      // .wb-overlay canvas itself is `position:fixed;inset:0`, which lays
      // out against the viewport MINUS that scrollbar. Sizing the backing
      // store from innerWidth/innerHeight while _wbLocalXY() below maps
      // pointer coordinates from the canvas's own rendered
      // getBoundingClientRect() meant the two disagreed by exactly the
      // scrollbar's width/height on any such browser — invisible in a
      // scrollbar-less/overlay-scrollbar environment (headless Chromium,
      // mac trackpad-scroll settings), but a real, growing-toward-the-
      // edges offset for a teacher on an ordinary Windows/Linux laptop.
      // document.documentElement.clientWidth/clientHeight is the one
      // number that already excludes the scrollbar the same way the
      // canvas's own rendered box does, so both sides of the pointer-
      // mapping math now agree by construction. (Not overlay.
      // getBoundingClientRect() itself: this can run while the overlay is
      // still display:none, before Teacher Mode's first toggle turns it
      // on, where that would read back 0×0.)
      var dpr = window.devicePixelRatio || 1;
      var w = document.documentElement.clientWidth, h = document.documentElement.clientHeight;
      if (entry._cssW === w && entry._cssH === h && entry._dpr === dpr) return;
      var prev = (overlay.width && overlay.height) ? ctx.getImageData(0, 0, overlay.width, overlay.height) : null;
      overlay.width = Math.round(w * dpr);
      overlay.height = Math.round(h * dpr);
      // Setting width/height above resets the canvas's own transform to
      // identity, so putImageData (which always works in raw backing-store
      // pixels regardless of the transform) is unaffected by ordering —
      // but the CSS-pixel transform below must be (re)applied after, for
      // every draw call that follows.
      if (prev) ctx.putImageData(prev, 0, 0); // preserve existing ink across a resize
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      entry._cssW = w; entry._cssH = h; entry._dpr = dpr;
    },

    _applyStrokeStyle: function(ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      if (this.wbMode === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.globalAlpha = 1;
        ctx.lineWidth = this.wbSize * 4;
      } else if (this.wbMode === 'highlighter') {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = this.wbHighlighterColor;
        // A bit more opaque than before (.35 → .42) — paired with the
        // brighter _wbHighlighterColors palette above, this is what
        // actually reads as a real highlighter instead of a washed-out,
        // half-visible version of the pen.
        ctx.globalAlpha = 0.42;
        ctx.lineWidth = this.wbSize * 5;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = this.wbPenColor;
        ctx.globalAlpha = 1;
        ctx.lineWidth = this.wbSize;
      }
    },

    _wbSnapshot: function(entry) {
      try {
        entry.undo.push(entry.ctx.getImageData(0, 0, entry.canvas.width, entry.canvas.height));
        if (entry.undo.length > 25) entry.undo.shift();
      } catch (e) {}
      this._updateToolbarState();
    },

    undoLast: function() {
      var entry = this._wbOverlay;
      if (!entry || !entry.undo.length) return;
      entry.ctx.putImageData(entry.undo.pop(), 0, 0);
      this._updateToolbarState();
    },

    clearAll: function() {
      var entry = this._wbOverlay;
      if (!entry) return;
      // clearRect (like every other draw call) is subject to the dpr
      // ctx.setTransform() applied in _sizeOverlay — clearing (0,0,
      // canvas.width, canvas.height) through that transform would only
      // reach the top-left 1/dpr slice of the actual backing store on a
      // HiDPI screen, leaving the rest of the ink behind. Clear in raw
      // device pixels instead, then restore the CSS-pixel transform for
      // whatever draws next.
      entry.ctx.save();
      entry.ctx.setTransform(1, 0, 0, 1, 0, 0);
      entry.ctx.clearRect(0, 0, entry.canvas.width, entry.canvas.height);
      entry.ctx.restore();
      entry.undo = [];
      this._updateToolbarState();
    },

    // Current color for whichever tool is active — pen and highlighter
    // remember their own last-picked color independently (see wbPenColor/
    // wbHighlighterColor above).
    _activeColor: function() {
      return this.wbMode === 'highlighter' ? this.wbHighlighterColor : this.wbPenColor;
    },

    setWBMode: function(mode) {
      this.wbMode = mode;
      document.querySelectorAll('#wbToolbar .wb-mode-btn').forEach(function(b) {
        b.classList.toggle('on', b.dataset.mode === mode);
      });
      this._rebuildColorSwatches();
      this._updateSizeDot();
    },

    setWBColor: function(color) {
      if (this.wbMode === 'highlighter') this.wbHighlighterColor = color;
      else this.wbPenColor = color;
      document.querySelectorAll('#wbColorGroup .wb-tool').forEach(function(sw) {
        sw.classList.toggle('on', sw.dataset.color === color);
      });
      this._updateSizeDot();
    },

    setWBSize: function(size) {
      this.wbSize = size;
      this._updateSizeDot();
    },

    // Rebuilds the color-swatch row for whichever palette the active mode
    // uses (pen vs. the brighter highlighter set) — called on setup and
    // every time setWBMode() switches tools, since the two tools don't
    // share a palette.
    _rebuildColorSwatches: function() {
      var colorGroup = document.getElementById('wbColorGroup');
      if (!colorGroup) return;
      var self = this;
      var isHighlighter = this.wbMode === 'highlighter';
      var colors = isHighlighter ? this._wbHighlighterColors : this._wbColors;
      var active = this._activeColor();
      colorGroup.innerHTML = '';
      colors.forEach(function(c) {
        var sw = document.createElement('button');
        sw.type = 'button';
        sw.className = 'wb-tool' + (c === active ? ' on' : '');
        sw.style.background = c;
        sw.dataset.color = c;
        sw.title = c;
        sw.setAttribute('aria-label', (isHighlighter ? 'Highlighter color ' : 'Pen color ') + c);
        sw.setAttribute('aria-disabled', this.wbMode === 'eraser' ? 'true' : 'false');
        sw.onclick = function() { self.setWBColor(c); };
        colorGroup.appendChild(sw);
      }, this);
    },

    _updateSizeDot: function() {
      var dot = document.getElementById('wbSizeDot');
      if (!dot) return;
      var mult = this.wbMode === 'eraser' ? 4 : (this.wbMode === 'highlighter' ? 5 : 1);
      var px = Math.max(4, Math.min(28, this.wbSize * mult * 0.6));
      dot.style.width = px + 'px';
      dot.style.height = px + 'px';
      if (this.wbMode === 'eraser') {
        dot.style.background = 'transparent';
        dot.style.border = '2px solid var(--text-2)';
      } else {
        dot.style.background = this._activeColor();
        dot.style.border = 'none';
      }
    },

    _updateToolbarState: function() {
      var hasUndo = !!(this._wbOverlay && this._wbOverlay.undo.length > 0);
      var undoBtn = document.getElementById('wbUndoBtn');
      if (undoBtn) undoBtn.disabled = !hasUndo;
      this._updateSizeDot();
    },

    _ensureToolbar: function() {
      if (document.getElementById('wbToolbar')) return;
      var self = this;
      var bar = document.createElement('div');
      bar.id = 'wbToolbar';
      bar.className = 'wb-toolbar';
      bar.setAttribute('role', 'toolbar');
      bar.setAttribute('aria-label', 'Whiteboard tools');

      var sep = function() { var s = document.createElement('div'); s.className = 'wb-sep'; return s; };

      var modeGroup = document.createElement('div');
      modeGroup.className = 'wb-group';
      [['pen', '✏️', 'Pen'], ['highlighter', '🖍️', 'Highlighter'], ['eraser', '🧽', 'Eraser']].forEach(function(m) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'wb-mode-btn' + (m[0] === self.wbMode ? ' on' : '');
        btn.dataset.mode = m[0];
        btn.title = m[2];
        btn.setAttribute('aria-label', m[2]);
        btn.textContent = m[1];
        btn.onclick = function() { self.setWBMode(m[0]); };
        modeGroup.appendChild(btn);
      });
      bar.appendChild(modeGroup);
      bar.appendChild(sep());

      var colorGroup = document.createElement('div');
      colorGroup.className = 'wb-group';
      colorGroup.id = 'wbColorGroup';
      bar.appendChild(colorGroup);
      bar.appendChild(sep());

      var sizeGroup = document.createElement('div');
      sizeGroup.className = 'wb-group';
      var dot = document.createElement('span');
      dot.className = 'wb-size-dot';
      dot.id = 'wbSizeDot';
      var slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '1'; slider.max = '10'; slider.step = '1';
      slider.value = String(this.wbSize);
      slider.className = 'wb-size-input';
      slider.setAttribute('aria-label', 'Pen size');
      slider.oninput = function() { self.setWBSize(parseInt(this.value, 10)); };
      sizeGroup.appendChild(dot);
      sizeGroup.appendChild(slider);
      bar.appendChild(sizeGroup);
      bar.appendChild(sep());

      var actionGroup = document.createElement('div');
      actionGroup.className = 'wb-group';
      var undoBtn = document.createElement('button');
      undoBtn.type = 'button'; undoBtn.className = 'wb-undo-btn'; undoBtn.id = 'wbUndoBtn';
      undoBtn.textContent = '↺ Undo';
      undoBtn.disabled = true;
      undoBtn.onclick = function() { self.undoLast(); };
      var clearBtn = document.createElement('button');
      clearBtn.type = 'button'; clearBtn.className = 'wb-clear-btn'; clearBtn.id = 'wbClearBtn';
      clearBtn.textContent = '🧹 Clear';
      clearBtn.title = 'Sweep the board clean';
      clearBtn.onclick = function() { self.clearAll(); };
      actionGroup.appendChild(undoBtn);
      actionGroup.appendChild(clearBtn);
      bar.appendChild(actionGroup);

      document.body.appendChild(bar);
      this._rebuildColorSwatches();
      this._updateSizeDot();
    },

    toggleWhiteboard: function() {
      this.wbActive = !this.wbActive;
      this._applyWBVisibility();
    },

    _applyWBVisibility: function() {
      if (this._wbOverlay) this._wbOverlay.canvas.classList.toggle('active', this.wbActive);
      var bar = document.getElementById('wbToolbar');
      if (bar) bar.classList.toggle('active', this.wbActive);
      if (this.wbActive) this._sizeOverlay();
    },

    // Called the instant Teacher Mode itself turns off (see the
    // MutationObserver below) — always force the whiteboard fully off and
    // wipe every stroke, so leaving Teacher Mode hands the mouse straight
    // back to normal page interaction with no leftover ink or drawing
    // state, and re-entering Teacher Mode later always starts with a
    // clean, inactive board rather than silently resuming.
    exitWhiteboard: function() {
      this.wbActive = false;
      if (this._wbOverlay) {
        // See clearAll()'s comment — clear in raw device pixels, not
        // through the dpr ctx transform, so this actually reaches the
        // whole HiDPI backing store instead of just its top-left corner.
        var ctx = this._wbOverlay.ctx, canvas = this._wbOverlay.canvas;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        this._wbOverlay.undo = [];
      }
      this._applyWBVisibility();
      this._updateToolbarState();
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
  var observer = new MutationObserver(function() {
    var isTeacher = document.body.classList.contains('tm-on');
    var wbBtn = document.getElementById('teacherWhiteboardBtn');
    if (wbBtn) wbBtn.style.display = isTeacher ? 'inline-flex' : 'none';
    if (isTeacher) window.CSGamify.setupWhiteboard();
    else window.CSGamify.exitWhiteboard();
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
