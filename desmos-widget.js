/**
 * ClipSAT Desmos Widget  v2.0
 * ─────────────────────────────────────────────────────────────────────────────
 * Embeds the Desmos Graphing Calculator API into designated course views.
 * The calculator is only initialised when its host view is shown, and is
 * destroyed (to free memory) when the student navigates away.
 *
 * Supported views: 'sat', 'act', 'act2', 'digital-sat'
 * (add more to DESMOS_VIEWS below)
 *
 * Integration points
 * ──────────────────
 *  • Listens for 'clipsat:courseLoaded' events from CourseLoader.
 *  • Also patched into the existing showView() function.
 *  • Exposes DesmosWidget.open(viewId) / .close() for manual control.
 *
 * Dependencies
 * ────────────
 *  Add once in index.html <head> (the API loader is async-safe):
 *    <script src="https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
 *  (The key above is Desmos's public demo key — fine for educational use.
 *   Register at https://www.desmos.com/api/calculator/getting-started for production.)
 * ─────────────────────────────────────────────────────────────────────────────
 */

'use strict';

(function (global) {

  /* ── Views where Desmos should appear ── */
  const DESMOS_VIEWS = new Set(['sat', 'act', 'act2', 'digital-sat', 'est', 'est2']);

  /* ── Container IDs injected per view ── */
  const WIDGET_CONTAINER_ID = 'cs-desmos-container';
  const WIDGET_PANEL_ID     = 'cs-desmos-panel';

  let _calculator  = null;   // active Desmos Calculator instance
  let _activeView  = null;   // view ID currently hosting the calculator

  /* ── CSS (injected once) ── */
  function _injectStyles() {
    if (document.getElementById('cs-desmos-styles')) return;
    const style = document.createElement('style');
    style.id = 'cs-desmos-styles';
    style.textContent = `
/* ── Desmos panel ─────────────────────────────────── */
#cs-desmos-panel{
  position:fixed;bottom:80px;right:20px;z-index:900;
  width:min(520px, calc(100vw - 40px));
  background:var(--paper,#fff);
  border:1px solid var(--line,#e5e7eb);
  border-radius:14px;
  box-shadow:0 8px 32px rgba(0,0,0,.12);
  overflow:hidden;
  display:none;
  flex-direction:column;
  resize:both;
  min-width:320px;min-height:300px;
  max-height:80vh;
}
#cs-desmos-panel.visible{display:flex}

/* Panel header */
.cs-desmos-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:10px 16px;
  background:var(--indigo,#4f46e5);color:#fff;
  cursor:move;user-select:none;flex-shrink:0;
}
.cs-desmos-title{font-weight:700;font-size:.9rem}
.cs-desmos-controls{display:flex;gap:6px;align-items:center}
.cs-desmos-btn{
  background:rgba(255,255,255,.2);border:none;color:#fff;
  border-radius:6px;padding:4px 10px;cursor:pointer;font-size:.75rem;
  transition:background .15s;
}
.cs-desmos-btn:hover{background:rgba(255,255,255,.35)}

/* Calculator area */
#cs-desmos-container{
  flex:1;min-height:0;
}

/* Toggle FAB */
#cs-desmos-fab{
  position:fixed;bottom:20px;right:20px;z-index:901;
  width:52px;height:52px;border-radius:50%;
  background:var(--indigo,#4f46e5);color:#fff;
  border:none;font-size:1.4rem;cursor:pointer;
  box-shadow:0 4px 16px rgba(79,70,229,.4);
  display:none;align-items:center;justify-content:center;
  transition:transform .2s,box-shadow .2s;
}
#cs-desmos-fab.visible{display:flex}
#cs-desmos-fab:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(79,70,229,.55)}
#cs-desmos-fab .cs-fab-label{
  position:absolute;right:62px;
  background:var(--ink,#111);color:#fff;
  font-size:.75rem;padding:4px 8px;border-radius:6px;
  white-space:nowrap;pointer-events:none;
  opacity:0;transition:opacity .2s;
}
#cs-desmos-fab:hover .cs-fab-label{opacity:1}

/* Preset buttons */
.cs-desmos-presets{
  display:flex;flex-wrap:wrap;gap:6px;
  padding:8px 12px;background:var(--paper-2,#f9fafb);
  border-bottom:1px solid var(--line,#e5e7eb);
  flex-shrink:0;
}
.cs-preset-btn{
  padding:4px 10px;border-radius:999px;font-size:.75rem;font-weight:600;
  border:1.5px solid var(--indigo,#4f46e5);color:var(--indigo,#4f46e5);
  background:transparent;cursor:pointer;transition:all .15s;
}
.cs-preset-btn:hover{background:var(--indigo,#4f46e5);color:#fff}
`;
    document.head.appendChild(style);
  }

  /* ── Build the panel HTML ── */
  function _buildPanel() {
    if (document.getElementById(WIDGET_PANEL_ID)) return;

    const panel = document.createElement('div');
    panel.id    = WIDGET_PANEL_ID;
    panel.innerHTML = `
      <div class="cs-desmos-header" id="cs-desmos-drag-handle">
        <span class="cs-desmos-title">📊 Desmos Graphing Calculator</span>
        <div class="cs-desmos-controls">
          <button class="cs-desmos-btn" id="cs-desmos-reset-btn" title="Clear graph">Reset</button>
          <button class="cs-desmos-btn" id="cs-desmos-close-btn" title="Close calculator">✕</button>
        </div>
      </div>
      <div class="cs-desmos-presets" id="cs-desmos-presets"></div>
      <div id="${WIDGET_CONTAINER_ID}"></div>`;

    document.body.appendChild(panel);

    // FAB toggle button
    const fab = document.createElement('button');
    fab.id = 'cs-desmos-fab';
    fab.setAttribute('aria-label', 'Open Desmos Calculator');
    fab.innerHTML = '<span>📈</span><span class="cs-fab-label">Graph Calculator</span>';
    document.body.appendChild(fab);

    // Event listeners
    fab.addEventListener('click', DesmosWidget.toggle.bind(DesmosWidget));
    document.getElementById('cs-desmos-close-btn').addEventListener('click', () => DesmosWidget.close());
    document.getElementById('cs-desmos-reset-btn').addEventListener('click', () => {
      if (_calculator) _calculator.setBlank();
    });

    _makeDraggable(panel, document.getElementById('cs-desmos-drag-handle'));
  }

  /* ── Draggable panel ── */
  function _makeDraggable(panel, handle) {
    let startX, startY, origX, origY;
    handle.addEventListener('mousedown', e => {
      startX = e.clientX; startY = e.clientY;
      const rect = panel.getBoundingClientRect();
      origX = rect.left; origY = rect.top;
      panel.style.right = 'auto'; panel.style.bottom = 'auto';
      panel.style.left = origX + 'px'; panel.style.top = origY + 'px';
      const onMove = ev => {
        panel.style.left = (origX + ev.clientX - startX) + 'px';
        panel.style.top  = (origY + ev.clientY - startY) + 'px';
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  /* ── Course-specific preset expressions ── */
  const PRESETS = {
    sat: [
      { label: 'Line',      exprs: [{ latex: 'y = mx + b', sliders: true }] },
      { label: 'Quadratic', exprs: [{ latex: 'y = ax^2 + bx + c' }] },
      { label: 'Systems',   exprs: [{ latex: 'y = 2x + 3' }, { latex: 'y = -x + 6' }] },
      { label: 'Circle',    exprs: [{ latex: '(x-h)^2 + (y-k)^2 = r^2' }] },
    ],
    act: [
      { label: 'Trig',      exprs: [{ latex: 'y = a\\sin(bx + c) + d' }] },
      { label: 'Log',       exprs: [{ latex: 'y = \\log_{b}(x)' }] },
      { label: 'Parabola',  exprs: [{ latex: 'y = a(x-h)^2 + k' }] },
    ],
    default: [
      { label: 'Parabola',  exprs: [{ latex: 'y = x^2' }] },
      { label: 'Sine',      exprs: [{ latex: 'y = \\sin(x)' }] },
      { label: 'Clear',     exprs: [] },
    ],
  };

  function _loadPresets(viewId) {
    const bar      = document.getElementById('cs-desmos-presets');
    if (!bar) return;
    const list     = PRESETS[viewId] || PRESETS.default;
    bar.innerHTML  = list.map((p, i) => `
      <button class="cs-preset-btn" data-preset="${i}">${p.label}</button>`).join('');
    bar.addEventListener('click', e => {
      const btn = e.target.closest('[data-preset]');
      if (!btn || !_calculator) return;
      const preset = list[parseInt(btn.dataset.preset, 10)];
      if (!preset) return;
      _calculator.setBlank();
      preset.exprs.forEach((ex, idx) => {
        _calculator.setExpression({ id: 'p' + idx, ...ex });
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
   * PUBLIC API
   * ═════════════════════════════════════════════════════════════════════════*/

  const DesmosWidget = {

    /**
     * Initialise Desmos for a given view.
     * Safe to call multiple times — no-ops if already active for same view.
     */
    open(viewId) {
      if (!DESMOS_VIEWS.has(viewId)) return;
      _injectStyles();
      _buildPanel();

      const fab   = document.getElementById('cs-desmos-fab');
      const panel = document.getElementById(WIDGET_PANEL_ID);
      if (fab)   fab.classList.add('visible');
      if (panel) panel.classList.add('visible');

      if (_activeView === viewId && _calculator) {
        return; // already running for this view
      }

      // Destroy previous instance if switching views
      this._destroyCalc();

      const container = document.getElementById(WIDGET_CONTAINER_ID);
      if (!container) return;

      if (!global.Desmos || !global.Desmos.GraphingCalculator) {
        container.innerHTML = `
          <div style="padding:24px;text-align:center;color:var(--muted)">
            <p>⚠️ Desmos API not loaded.</p>
            <p style="font-size:.8rem">Add the Desmos script tag to &lt;head&gt;.</p>
          </div>`;
        return;
      }

      _calculator = Desmos.GraphingCalculator(container, {
        expressionsCollapsed : false,
        settingsMenu         : true,
        zoomButtons          : true,
        lockViewport         : false,
        projectorMode        : false,
      });

      _activeView = viewId;
      _loadPresets(viewId);
    },

    close() {
      const panel = document.getElementById(WIDGET_PANEL_ID);
      if (panel) panel.classList.remove('visible');
    },

    toggle() {
      const panel = document.getElementById(WIDGET_PANEL_ID);
      if (!panel) return;
      const visible = panel.classList.toggle('visible');
      if (visible && !_calculator && _activeView) {
        this.open(_activeView);
      }
    },

    /** Destroy the calculator instance to free memory when leaving a view. */
    _destroyCalc() {
      if (_calculator) {
        try { _calculator.destroy(); } catch(e) {}
        _calculator = null;
      }
      _activeView = null;
    },

    /** Call when navigating away from a Desmos-enabled view. */
    teardown() {
      this.close();
      this._destroyCalc();
      const fab = document.getElementById('cs-desmos-fab');
      if (fab) fab.classList.remove('visible');
    },

    /**
     * Plot one or more expressions programmatically.
     * @param {Array<{latex:string}>} exprs
     */
    plot(exprs) {
      if (!_calculator) return;
      exprs.forEach((ex, i) => _calculator.setExpression({ id: 'e' + i, ...ex }));
    }
  };

  /* ── Hook into ClipSAT view events ── */
  document.addEventListener('clipsat:courseLoaded', e => {
    const id = e.detail && e.detail.course && e.detail.course.id;
    if (id && DESMOS_VIEWS.has(id)) {
      DesmosWidget.open(id);
    } else {
      DesmosWidget.teardown();
    }
  });

  /* ── Patch showView to show/hide FAB ── */
  const _origShowView = global.showView;
  if (typeof _origShowView === 'function') {
    global.showView = function(name) {
      _origShowView.apply(this, arguments);
      if (DESMOS_VIEWS.has(name)) {
        _injectStyles();
        _buildPanel();
        DesmosWidget.open(name);
      } else {
        DesmosWidget.teardown();
      }
    };
  }

  global.DesmosWidget = DesmosWidget;

})(window);
