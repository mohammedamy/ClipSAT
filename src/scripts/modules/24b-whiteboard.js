/* Plan 5, Phase 5.015 — the Teacher Mode whiteboard, split out of
   24-gamification.js (which stays eager: XP/streak tracking writes to
   localStorage on every visit, and flashcards render on page load, so
   neither can wait for an on-demand load). The whiteboard is only
   reachable once Teacher Mode is on, and Teacher Mode itself is already
   deferred (ADR 0028), so this ships as public/js/whiteboard.js and
   24-gamification.js's _ensureWhiteboard() loads it. Its methods are
   merged onto window.CSGamify so every existing call site
   (window.CSGamify.setupWhiteboard() etc.) keeps working unchanged, with
   `this` still bound to CSGamify. Self-contained: it reads and writes only
   its own wb* state and methods. See docs/DECISIONS/0031. */
(function() {
  'use strict';
  if (!window.CSGamify) return;
  var WB = {
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
    wbBgMode: 'none',         // 'none' | 'grid' | 'numberline'
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
      var entry = { canvas: overlay, ctx: ctx, undo: [], strokes: [] };
      this._wbOverlay = entry;
      this._sizeOverlay();

      var drawing = false, rectCache = null, activeStroke = null;
      // Precisely map clientX/clientY into canvas 2D context logical units.
      // Because ctx has setTransform(curDpr, 0, 0, curDpr, 0, 0), any coordinate
      // passed to ctx is multiplied by curDpr into buffer pixels. The browser
      // then renders the buffer pixels onto the display box (rectCache.width × rectCache.height).
      // Under browser zoom, page zoom, display scaling (DPI/Retina), or non-integer CSS pixels,
      // (curDpr * rectCache.width) may not strictly equal overlay.width.
      // Scaling by (bufW / (curDpr * rW)) and (bufH / (curDpr * rH)) guarantees that the ink
      // lands mathematically EXACT at (e.clientX, e.clientY) with zero drift anywhere on screen.
      function _wbLocalXY(e) {
        if (!rectCache || rectCache.width === 0 || rectCache.height === 0) {
          rectCache = overlay.getBoundingClientRect();
        }
        var curDpr = entry._dpr || window.devicePixelRatio || 1;
        var rL = rectCache ? rectCache.left : 0;
        var rT = rectCache ? rectCache.top : 0;
        var rW = (rectCache && rectCache.width > 0) ? rectCache.width : (overlay.clientWidth || window.innerWidth || 1);
        var rH = (rectCache && rectCache.height > 0) ? rectCache.height : (overlay.clientHeight || window.innerHeight || 1);

        var bufW = overlay.width || (rW * curDpr);
        var bufH = overlay.height || (rH * curDpr);

        var scaleX = (rW > 0 && curDpr > 0) ? (bufW / (curDpr * rW)) : 1;
        var scaleY = (rH > 0 && curDpr > 0) ? (bufH / (curDpr * rH)) : 1;

        return {
          x: (e.clientX - rL) * scaleX,
          y: (e.clientY - rT) * scaleY
        };
      }

      overlay.addEventListener('pointerdown', function(e) {
        if (e.button != null && e.button !== 0 && e.pointerType === 'mouse') return; // left-click only for a mouse
        try { overlay.setPointerCapture(e.pointerId); } catch (err) {}
        drawing = true;
        rectCache = overlay.getBoundingClientRect();
        self._applyStrokeStyle(ctx);
        var w0 = ctx.lineWidth;
        if (self.wbMode === 'pen' && e.pointerType === 'pen' && e.pressure) {
          w0 = self.wbSize * (0.5 + e.pressure);
          ctx.lineWidth = w0;
        }
        var pt = _wbLocalXY(e);
        activeStroke = {
          mode: self.wbMode,
          color: self._activeColor(),
          size: self.wbSize,
          pts: [{ x: pt.x, y: pt.y, w: w0 }]
        };
        entry.strokes.push(activeStroke);
        if (entry.strokes.length > 200) entry.strokes.shift();
        entry.undo = entry.strokes;
        self._updateToolbarState();
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
        ctx.lineTo(pt.x + 0.1, pt.y + 0.1);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
      });

      overlay.addEventListener('pointermove', function(e) {
        if (!drawing) return;
        if (e.shiftKey && self.wbMode !== 'eraser' && activeStroke && activeStroke.pts.length >= 1) {
          var p0s = activeStroke.pts[0];
          var rawPt = _wbLocalXY(e);
          var snapped = Math.abs(rawPt.x - p0s.x) >= Math.abs(rawPt.y - p0s.y)
            ? { x: rawPt.x, y: p0s.y, w: activeStroke.size || 3 }
            : { x: p0s.x, y: rawPt.y, w: activeStroke.size || 3 };
          activeStroke.pts = [p0s, snapped];
          self._wbRedrawStrokes();
          self._applyStrokeStyle(ctx);
          return;
        }
        var pts = (typeof e.getCoalescedEvents === 'function' && e.getCoalescedEvents()) || null;
        if (!pts || !pts.length) pts = [e];
        for (var i = 0; i < pts.length; i++) {
          var ev = pts[i], pt = _wbLocalXY(ev);
          var wi = ctx.lineWidth;
          if (self.wbMode === 'pen' && ev.pointerType === 'pen' && ev.pressure) {
            wi = self.wbSize * (0.5 + ev.pressure);
            ctx.lineWidth = wi;
          }
          if (activeStroke) activeStroke.pts.push({ x: pt.x, y: pt.y, w: wi });
          ctx.lineTo(pt.x, pt.y);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
        }
      });

      function stopStroke(e) {
        if (!drawing) return;
        drawing = false;
        activeStroke = null;
        try { if (e && e.pointerId != null) overlay.releasePointerCapture(e.pointerId); } catch (err) {}
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        if (self.wbMode === 'eraser' && self.wbBgMode !== 'none') self._wbRedrawStrokes();
      }
      overlay.addEventListener('pointerup', stopStroke);
      overlay.addEventListener('pointercancel', stopStroke);
      overlay.addEventListener('pointerleave', stopStroke);

      // Forward wheel scrolling to mock exam overlay when open so students can scroll exam questions
      overlay.addEventListener('wheel', function(e) {
        var mockOverlay = document.getElementById('mock-exam-overlay');
        if (mockOverlay && mockOverlay.classList.contains('show')) {
          mockOverlay.scrollTop += e.deltaY;
          e.preventDefault();
        }
      }, { passive: false });

      // Esc key closes the scratchpad; Alt+S toggles it when Teacher Mode or Mock Exam is open
      window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && self.wbActive) {
          self.toggleWhiteboard();
          e.stopPropagation();
        } else if (e.altKey && !e.ctrlKey && !e.metaKey && (e.key === 's' || e.key === 'S')) {
          var mockOpen = document.body.classList.contains('cbt-open') || document.body.classList.contains('teacher-mode');
          if (mockOpen || self.wbActive) {
            e.preventDefault();
            self.toggleWhiteboard();
          }
        }
      });

      // Keep the buffer matched to the viewport across a real window
      // resize/orientation change or zoom change.
      window.addEventListener('resize', function() {
        rectCache = null;
        if (self.wbActive) {
          self._applyWBVisibility();
        } else if (!drawing) {
          self._sizeOverlay();
        }
      });
      window.addEventListener('scroll', function() {
        rectCache = null;
      }, { passive: true });

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
      var topOffset = parseInt(overlay.style.top, 10) || 0;
      var r = (overlay.offsetWidth > 0 && overlay.offsetHeight > 0) ? overlay.getBoundingClientRect() : null;
      var w = (r && r.width > 0) ? Math.round(r.width) : (document.documentElement.clientWidth || window.innerWidth || 100);
      var h = (r && r.height > 0) ? Math.round(r.height) : Math.max(100, (window.innerHeight || document.documentElement.clientHeight || 100) - topOffset);
      if (entry._cssW === w && entry._cssH === h && entry._dpr === dpr && overlay.width && overlay.height) return;
      overlay.width = Math.round(w * dpr);
      overlay.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      entry._cssW = w; entry._cssH = h; entry._dpr = dpr;
      this._wbRedrawStrokes();
    },

    _wbRedrawStrokes: function() {
      var entry = this._wbOverlay;
      if (!entry) return;
      var ctx = entry.ctx;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, entry.canvas.width, entry.canvas.height);
      ctx.restore();
      var strokes = entry.strokes || [];
      for (var i = 0; i < strokes.length; i++) {
        var st = strokes[i];
        if (!st || !st.pts || !st.pts.length) continue;
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        if (st.mode === 'eraser') {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.strokeStyle = 'rgba(0,0,0,1)';
          ctx.globalAlpha = 1;
          ctx.lineWidth = (st.size || 3) * 4;
        } else if (st.mode === 'highlighter') {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = st.color || this.wbHighlighterColor;
          ctx.globalAlpha = 0.42;
          ctx.lineWidth = (st.size || 3) * 5;
        } else {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = st.color || this.wbPenColor;
          ctx.globalAlpha = 1;
          ctx.lineWidth = st.size || 3;
        }
        var p0 = st.pts[0];
        if (st.pts.length === 1) {
          ctx.lineWidth = p0.w || ctx.lineWidth;
          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p0.x + 0.1, p0.y + 0.1);
          ctx.stroke();
        } else {
          for (var j = 1; j < st.pts.length; j++) {
            var a = st.pts[j - 1], b = st.pts[j];
            if (b.w) ctx.lineWidth = b.w;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        ctx.restore();
      }
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      if (this.wbBgMode && this.wbBgMode !== 'none') {
        this._wbDrawBackdrop(ctx, entry._cssW || entry.canvas.width, entry._cssH || entry.canvas.height);
      }
    },

    _wbDrawBackdrop: function(ctx, w, h) {
      if (!w || !h) return;
      var dark = !!(document.body && document.body.classList.contains('dark'));
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.globalAlpha = 1;
      if (this.wbBgMode === 'grid') {
        var step = 32;
        var cx = Math.round(w / 2), cy = Math.round(h / 2);
        ctx.strokeStyle = dark ? 'rgba(148,163,184,0.18)' : 'rgba(100,116,139,0.22)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (var x = cx % step; x <= w; x += step) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
        for (var y = cy % step; y <= h; y += step) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
        ctx.stroke();
        ctx.strokeStyle = dark ? 'rgba(129,140,248,0.55)' : 'rgba(79,70,229,0.45)';
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(0, cy); ctx.lineTo(w, cy);
        ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
        ctx.stroke();
      } else if (this.wbBgMode === 'numberline') {
        var pad = Math.min(48, Math.round(w * 0.08));
        var midY = Math.round(h * 0.5);
        var spanW = Math.max(120, w - 2 * pad);
        var lineCol = dark ? 'rgba(226,232,240,0.8)' : 'rgba(30,41,59,0.75)';
        ctx.strokeStyle = lineCol;
        ctx.fillStyle = lineCol;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pad - 12, midY); ctx.lineTo(w - pad + 12, midY);
        ctx.stroke();
        // Arrowheads
        ctx.beginPath();
        ctx.moveTo(pad - 14, midY); ctx.lineTo(pad - 4, midY - 5); ctx.lineTo(pad - 4, midY + 5); ctx.closePath(); ctx.fill();
        ctx.beginPath();
        ctx.moveTo(w - pad + 14, midY); ctx.lineTo(w - pad + 4, midY - 5); ctx.lineTo(w - pad + 4, midY + 5); ctx.closePath(); ctx.fill();
        ctx.font = '600 12px system-ui,sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        for (var n = -10; n <= 10; n++) {
          var tx = pad + ((n + 10) / 20) * spanW;
          var isZero = n === 0;
          ctx.lineWidth = isZero ? 2.2 : 1.3;
          ctx.beginPath();
          ctx.moveTo(tx, midY - (isZero ? 11 : 7));
          ctx.lineTo(tx, midY + (isZero ? 11 : 7));
          ctx.stroke();
          if (w >= 480 || n % 2 === 0) ctx.fillText(String(n), tx, midY + 13);
        }
      }
      ctx.restore();
    },

    setWBBgMode: function(mode) {
      this.wbBgMode = (this.wbBgMode === mode) ? 'none' : mode;
      this._wbRedrawStrokes();
      this._updateToolbarState();
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
        ctx.globalAlpha = 0.42;
        ctx.lineWidth = this.wbSize * 5;
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = this.wbPenColor;
        ctx.globalAlpha = 1;
        ctx.lineWidth = this.wbSize;
      }
    },

    _wbSnapshot: function() {
      this._updateToolbarState();
    },

    undoLast: function() {
      var entry = this._wbOverlay;
      if (!entry || !entry.strokes || !entry.strokes.length) return;
      entry.strokes.pop();
      entry.undo = entry.strokes;
      this._wbRedrawStrokes();
      this._updateToolbarState();
    },

    clearAll: function() {
      var entry = this._wbOverlay;
      if (!entry) return;
      entry.strokes = [];
      entry.undo = [];
      this._wbRedrawStrokes();
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
      var isDark = document.body.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
      var colors = isHighlighter
        ? this._wbHighlighterColors
        : (isDark ? ['#ef4444', '#38bdf8', '#fbbf24', '#4ade80', '#ffffff'] : this._wbColors);
      var active = this._activeColor();
      if (isDark && active === '#111827') {
        this.wbPenColor = '#ffffff';
        active = '#ffffff';
      }
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
      var aiBtn = document.getElementById('wbAiCheckBtn');
      if (aiBtn) aiBtn.disabled = !hasUndo;
      var undoBtn = document.getElementById('wbUndoBtn');
      if (undoBtn) undoBtn.disabled = !hasUndo;
      var gridBtn = document.getElementById('wbGridBtn');
      if (gridBtn) {
        var gOn = this.wbBgMode === 'grid';
        gridBtn.classList.toggle('on', gOn);
        gridBtn.setAttribute('aria-pressed', gOn ? 'true' : 'false');
      }
      var nlBtn = document.getElementById('wbNumLineBtn');
      if (nlBtn) {
        var nlOn = this.wbBgMode === 'numberline';
        nlBtn.classList.toggle('on', nlOn);
        nlBtn.setAttribute('aria-pressed', nlOn ? 'true' : 'false');
      }
      this._updateSizeDot();
    },

    captureScratchpadDataUrl: function() {
      var entry = this._wbOverlay;
      if (!entry || !entry.canvas || !entry.strokes || !entry.strokes.length) return null;
      var src = entry.canvas;
      var w = src.width || src.clientWidth || 1200;
      var h = src.height || src.clientHeight || 800;
      if (w <= 0 || h <= 0) return null;
      var maxDim = 1600;
      if (w > maxDim || h > maxDim) {
        if (w >= h) { h = Math.max(1, Math.round(h * (maxDim / w))); w = maxDim; }
        else { w = Math.max(1, Math.round(w * (maxDim / h))); h = maxDim; }
      }
      var off = document.createElement('canvas');
      off.width = w;
      off.height = h;
      var ctx = off.getContext('2d');
      if (!ctx) return null;
      var isDark = document.body.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(src, 0, 0, w, h);
      return off.toDataURL('image/jpeg', 0.88);
    },

    checkScratchpadWithAI: function() {
      var dataUrl = this.captureScratchpadDataUrl();
      if (!dataUrl) return false;
      if (this.wbActive) this.toggleWhiteboard();
      var ar = !!(document.documentElement && (document.documentElement.lang === 'ar' || document.body.classList.contains('rtl')));
      var prompt = ar
        ? 'راجع خطوات حلي المكتوبة على السبورة في هذه الصورة، واذكر ما أصبتُ فيه وأرشدني بلطف لأي خطأ أو الخطوة التالية.'
        : 'Please review my handwritten math work from the scratchpad image. Tell me what I got right and gently guide me through any mistake or next step.';
      if (typeof window.openChatWithImage === 'function') {
        return window.openChatWithImage(prompt, dataUrl, 'scratchpad-work.jpg');
      }
      if (typeof window.openChatWith === 'function') {
        window.openChatWith(prompt);
        return true;
      }
      return false;
    },

    _ensureToolbar: function() {
      if (document.getElementById('wbToolbar')) return;
      var self = this;
      var ar = !!(document.documentElement && document.documentElement.lang === 'ar');
      var bar = document.createElement('div');
      bar.id = 'wbToolbar';
      bar.className = 'wb-toolbar';
      if (ar) bar.dir = 'rtl';
      bar.setAttribute('role', 'toolbar');
      bar.setAttribute('aria-label', ar ? 'أدوات السبورة' : 'Whiteboard tools');

      // Drag handle
      var dragHandle = document.createElement('div');
      dragHandle.className = 'wb-drag-handle';
      dragHandle.title = ar ? 'سحب شريط الأدوات' : 'Drag toolbar';
      dragHandle.textContent = '⋮⋮';
      bar.appendChild(dragHandle);

      var isDragging = false, dragStart = { x: 0, y: 0 }, barStart = { x: 0, y: 0 };
      dragHandle.addEventListener('pointerdown', function(e) {
        isDragging = true;
        try { dragHandle.setPointerCapture(e.pointerId); } catch(err) {}
        dragStart = { x: e.clientX, y: e.clientY };
        var rect = bar.getBoundingClientRect();
        barStart = { x: rect.left, y: rect.top };
        bar.style.transform = 'none';
        bar.style.left = barStart.x + 'px';
        bar.style.top = barStart.y + 'px';
        bar.style.bottom = 'auto';
        e.preventDefault();
      });
      dragHandle.addEventListener('pointermove', function(e) {
        if (!isDragging) return;
        var dx = e.clientX - dragStart.x;
        var dy = e.clientY - dragStart.y;
        var maxW = window.innerWidth - bar.offsetWidth - 8;
        var maxH = window.innerHeight - bar.offsetHeight - 8;
        bar.style.left = Math.max(8, Math.min(maxW, barStart.x + dx)) + 'px';
        bar.style.top = Math.max(8, Math.min(maxH, barStart.y + dy)) + 'px';
      });
      function stopDrag(e) {
        if (isDragging) {
          isDragging = false;
          try { dragHandle.releasePointerCapture(e.pointerId); } catch(err) {}
        }
      }
      dragHandle.addEventListener('pointerup', stopDrag);
      dragHandle.addEventListener('pointercancel', stopDrag);

      var sep = function() { var s = document.createElement('div'); s.className = 'wb-sep'; return s; };

      var modeGroup = document.createElement('div');
      modeGroup.className = 'wb-group';
      [['pen', '✏️', ar ? 'قلم (اضغط Shift لخط مستقيم)' : 'Pen (hold Shift for straight lines)'], ['highlighter', '🖍️', ar ? 'تظليل' : 'Highlighter'], ['eraser', '🧽', ar ? 'ممحاة' : 'Eraser']].forEach(function(m) {
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
      slider.setAttribute('aria-label', ar ? 'سُمك القلم' : 'Pen size');
      slider.oninput = function() { self.setWBSize(parseInt(this.value, 10)); };
      sizeGroup.appendChild(dot);
      sizeGroup.appendChild(slider);
      bar.appendChild(sizeGroup);
      bar.appendChild(sep());

      var bgGroup = document.createElement('div');
      bgGroup.className = 'wb-group';
      var gridBtn = document.createElement('button');
      gridBtn.type = 'button'; gridBtn.className = 'wb-mode-btn wb-bg-btn'; gridBtn.id = 'wbGridBtn';
      gridBtn.textContent = ar ? '⊞ شبكة' : '⊞ Grid';
      gridBtn.title = ar ? 'إظهار/إخفاء شبكة الإحداثيات' : 'Toggle coordinate grid';
      gridBtn.setAttribute('aria-pressed', 'false');
      gridBtn.onclick = function() { self.setWBBgMode('grid'); };
      var nlBtn = document.createElement('button');
      nlBtn.type = 'button'; nlBtn.className = 'wb-mode-btn wb-bg-btn'; nlBtn.id = 'wbNumLineBtn';
      nlBtn.textContent = ar ? '↔ خط الأعداد' : '↔ Line';
      nlBtn.title = ar ? 'إظهار/إخفاء خط الأعداد' : 'Toggle number line';
      nlBtn.setAttribute('aria-pressed', 'false');
      nlBtn.onclick = function() { self.setWBBgMode('numberline'); };
      bgGroup.appendChild(gridBtn);
      bgGroup.appendChild(nlBtn);
      bar.appendChild(bgGroup);
      bar.appendChild(sep());

      var actionGroup = document.createElement('div');
      actionGroup.className = 'wb-group';
      var aiBtn = document.createElement('button');
      aiBtn.type = 'button'; aiBtn.className = 'wb-mode-btn wb-ai-btn'; aiBtn.id = 'wbAiCheckBtn';
      aiBtn.textContent = ar ? '🤖 راجع حلي' : '🤖 Check work';
      aiBtn.title = ar ? 'إرسال السبورة للمعلم الذكي لمراجعة خطواتك' : 'Send scratchpad to AI Tutor to check your work';
      aiBtn.disabled = true;
      aiBtn.onclick = function() { self.checkScratchpadWithAI(); };
      var undoBtn = document.createElement('button');
      undoBtn.type = 'button'; undoBtn.className = 'wb-undo-btn'; undoBtn.id = 'wbUndoBtn';
      undoBtn.textContent = ar ? '↺ تراجع' : '↺ Undo';
      undoBtn.disabled = true;
      undoBtn.onclick = function() { self.undoLast(); };
      var clearBtn = document.createElement('button');
      clearBtn.type = 'button'; clearBtn.className = 'wb-clear-btn'; clearBtn.id = 'wbClearBtn';
      clearBtn.textContent = ar ? '🧹 مسح' : '🧹 Clear';
      clearBtn.title = ar ? 'مسح السبورة بالكامل' : 'Sweep the board clean';
      clearBtn.onclick = function() { self.clearAll(); };
      var closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'wb-close-btn';
      closeBtn.id = 'wbCloseBtn';
      closeBtn.textContent = ar ? '✕ إغلاق' : '✕ Close';
      closeBtn.title = ar ? 'إغلاق المسودة (Esc)' : 'Close scratchpad (Esc)';
      closeBtn.onclick = function() { self.toggleWhiteboard(); };
      actionGroup.appendChild(aiBtn);
      actionGroup.appendChild(undoBtn);
      actionGroup.appendChild(clearBtn);
      actionGroup.appendChild(closeBtn);
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
      var mockOverlay = document.getElementById('mock-exam-overlay');
      var isCbt = document.body.classList.contains('cbt-open') || !!(mockOverlay && mockOverlay.classList.contains('show'));
      var mockHdr = document.getElementById('mock-exam-header');
      var cbtScratchBtn = document.getElementById('cbt-scratchpad-btn');

      // Update header button first so any wrap reflow happens before we measure header bottom
      if (cbtScratchBtn) {
        if (this.wbActive) {
          cbtScratchBtn.innerHTML = '✕ Close Scratchpad';
          cbtScratchBtn.style.background = '#dc2626';
          cbtScratchBtn.style.borderColor = '#b91c1c';
          cbtScratchBtn.style.color = '#ffffff';
          cbtScratchBtn.style.fontWeight = '700';
          cbtScratchBtn.setAttribute('aria-expanded', 'true');
        } else {
          cbtScratchBtn.innerHTML = '✏️ Scratchpad';
          cbtScratchBtn.style.background = 'rgba(255,255,255,.15)';
          cbtScratchBtn.style.borderColor = 'rgba(255,255,255,.3)';
          cbtScratchBtn.style.color = '#ffffff';
          cbtScratchBtn.style.fontWeight = 'normal';
          cbtScratchBtn.setAttribute('aria-expanded', 'false');
        }
      }

      if (this._wbOverlay) {
        var canvas = this._wbOverlay.canvas;
        canvas.classList.toggle('active', this.wbActive);
        canvas.classList.toggle('cbt-mode', isCbt);
        if (isCbt && mockHdr) {
          var hdrRect = mockHdr.getBoundingClientRect();
          var hdrH = Math.max(54, Math.ceil(hdrRect.bottom || hdrRect.height || mockHdr.offsetHeight || 54));
          canvas.style.top = hdrH + 'px';
        } else {
          canvas.style.top = '0px';
        }
      }

      var bar = document.getElementById('wbToolbar');
      if (bar) {
        bar.classList.toggle('active', this.wbActive);
        bar.classList.toggle('cbt-mode', isCbt);
        if (this.wbActive) {
          // Clamp bar coordinates within viewport if previously dragged off-screen
          var maxW = window.innerWidth - (bar.offsetWidth || 340) - 10;
          var maxH = window.innerHeight - (bar.offsetHeight || 54) - 10;
          var curL = parseInt(bar.style.left, 10);
          var curT = parseInt(bar.style.top, 10);
          if (!isNaN(curL) && bar.style.left !== '50%') {
            bar.style.left = Math.max(10, Math.min(Math.max(10, maxW), curL)) + 'px';
          }
          if (!isNaN(curT)) {
            bar.style.top = Math.max(10, Math.min(Math.max(10, maxH), curT)) + 'px';
          }
        }
      }

      if (this.wbActive) {
        this._sizeOverlay();
        this._rebuildColorSwatches();
      }
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
  Object.keys(WB).forEach(function(k) { window.CSGamify[k] = WB[k]; });
}());
