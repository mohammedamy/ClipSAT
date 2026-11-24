#!/usr/bin/env node
/**
 * scripts/test-interactive-visuals-upgrade.js
 * Verifies the interactive visuals upgrade across:
 *   - sw.js & scripts.njk deduplication + cache-bust integrity
 *   - 02a-plot-canvas-engine.js (Plot polish, toolbar, inspector, 3D damping/toolbar, XP challenges)
 *   - 19-interactive-activities-engine-v1.js (_buildFN Play/Reset/HUD & _buildGP ghost/keyboard cursor in minimal VM)
 *   - 02c-figures.js (zoom controls in figure lightbox)
 *   - src/styles/main.css (responsive, RTL, dark-mode, reduced-motion, slider progress styling)
 */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
let passed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

console.log('── Running Interactive Visuals Upgrade Verification Suite ──');

test('sw.js parses cleanly with a single SW_VERSION declaration', () => {
  const swSrc = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
  const declMatches = swSrc.match(/const\s+SW_VERSION\s*=/g) || [];
  assert.strictEqual(declMatches.length, 1, 'Expected exactly one SW_VERSION declaration in sw.js');
  new vm.Script(swSrc, { filename: 'sw.js' });
});

test('src/_includes/shell/scripts.njk loads shared scripts without duplicates', () => {
  const scriptsSrc = fs.readFileSync(path.join(ROOT, 'src', '_includes', 'shell', 'scripts.njk'), 'utf8');
  for (const mod of ['/js/cloud-sync.js', '/js/engine.js', '/js/study-hub-extras.js']) {
    const hits = scriptsSrc.split(mod).length - 1;
    assert.strictEqual(hits, 1, `Expected ${mod} once in scripts.njk, found ${hits}`);
  }
});

test('02a-plot-canvas-engine.js implements Plot polish, universal toolbar, inspector, XP & 3D controls', () => {
  const src = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02a-plot-canvas-engine.js'), 'utf8');
  new vm.Script(src, { filename: '02a-plot-canvas-engine.js' });

  for (const marker of [
    '_csLastPlot',
    '\\u2212',
    'jumpLim',
    '_syncRangeFill',
    '--val-pct',
    '_wireCanvasInspector',
    'ex-coord-hud',
    'ex-drag-hint',
    'ex-play-btn',
    'ex-reset-btn',
    'ex-expand-btn',
    'ex-snap-btn',
    'cs-ex-focus-open',
    'CSGamify.addXP',
    'controls.enableDamping',
    'ex-3d-toolbar',
    'Auto-Orbit',
    'Reset View'
  ]) {
    assert.ok(src.includes(marker), `02a-plot-canvas-engine.js missing "${marker}"`);
  }
  assert.ok(src.includes('x: e.clientX - rect.left') && !src.includes('canvas.width / rect.width'), 'High-DPR pure CSS pixel coords must be preserved');
});

function makeMinimalEl(tag) {
  const el = {
    tagName: String(tag || 'div').toUpperCase(),
    style: { setProperty: function () {} },
    dataset: {},
    attributes: {},
    children: [],
    listeners: {},
    parentNode: null,
    disabled: false,
    value: '',
    min: '',
    max: '',
    step: '',
    classList: {
      _s: new Set(),
      add: function (...cs) { cs.forEach((c) => this._s.add(c)); },
      remove: function (...cs) { cs.forEach((c) => this._s.delete(c)); },
      contains: function (c) { return this._s.has(c); },
      toggle: function (c, force) {
        if (force === undefined) this._s.has(c) ? this._s.delete(c) : this._s.add(c);
        else force ? this._s.add(c) : this._s.delete(c);
      }
    },
    addEventListener: function (ev, fn) {
      if (!this.listeners[ev]) this.listeners[ev] = [];
      this.listeners[ev].push(fn);
    },
    dispatchEvent: function (ev) {
      const t = typeof ev === 'string' ? ev : ev.type;
      (this.listeners[t] || []).forEach((fn) => fn.call(this, ev));
    },
    click: function (ev) {
      const e = ev || { type: 'click' };
      if (!e.type) e.type = 'click';
      this.dispatchEvent(e);
    },
    getContext: function () {
      return {
        setTransform: function () {},
        clearRect: function () {},
        beginPath: function () {},
        moveTo: function () {},
        lineTo: function () {},
        stroke: function () {},
        fill: function () {},
        arc: function () {},
        fillText: function () {}
      };
    },
    getBoundingClientRect: function () { return { left: 0, top: 0, width: 420, height: 280 }; },
    setAttribute: function (k, v) { this.attributes[k] = String(v); },
    getAttribute: function (k) { return this.attributes[k] !== undefined ? this.attributes[k] : null; },
    removeAttribute: function (k) { delete this.attributes[k]; },
    appendChild: function (c) {
      if (c.parentNode) c.parentNode.removeChild(c);
      c.parentNode = this;
      this.children.push(c);
      return c;
    },
    removeChild: function (c) {
      const i = this.children.indexOf(c);
      if (i >= 0) { this.children.splice(i, 1); c.parentNode = null; }
      return c;
    },
    set className(v) { this.classList._s.clear(); if (v) v.trim().split(/\s+/).forEach((c) => this.classList._s.add(c)); },
    get className() { return Array.from(this.classList._s).join(' '); },
    set textContent(v) { this._txt = String(v); this._html = String(v); this.children = []; },
    get textContent() { return this._txt != null ? this._txt : this.children.map((c) => c.textContent).join(''); },
    set innerHTML(v) {
      this._html = String(v);
      this._txt = String(v).replace(/<[^>]*>/g, '');
      this.children = [];
      const b = /class="([^"]+)"[^>]*>([^<]*)/.exec(this._html);
      if (b) {
        const sp = makeMinimalEl('span');
        sp.className = b[1];
        sp.textContent = b[2];
        this.appendChild(sp);
      }
    },
    get innerHTML() { return this._html || ''; },
    querySelector: function (sel) {
      const cls = sel.startsWith('.') ? sel.slice(1).split('.') : null;
      for (const ch of this.children) {
        if (cls ? cls.every((c) => ch.classList.contains(c)) : ch.tagName.toLowerCase() === sel.toLowerCase()) return ch;
        const f = ch.querySelector(sel);
        if (f) return f;
      }
      return null;
    }
  };
  return el;
}

test('19-interactive-activities-engine-v1.js _buildFN & _buildGP render upgraded tools safely in minimal canvas VM', () => {
  const answerSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '19a-ix-answer-check.js'), 'utf8');
  const ixSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '19-interactive-activities-engine-v1.js'), 'utf8');
  const sandbox = {
    console,
    setTimeout: (fn) => fn(),
    clearTimeout: () => {},
    document: {
      createElement: (tag) => makeMinimalEl(tag),
      getElementById: () => null,
      body: makeMinimalEl('body'),
      head: makeMinimalEl('head'),
      readyState: 'complete',
      addEventListener: () => {}
    },
    window: {}
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(answerSrc, sandbox);
  vm.runInContext(ixSrc, sandbox);

  // _buildFN test
  const fnBox = makeMinimalEl('div');
  sandbox.window.ClipSATIX._buildFN({
    t: 'fn',
    ti: 'Quadratic Vertex Shift',
    xrange: [-5, 5],
    yrange: [-4, 8],
    params: [{ name: 'a', label: 'Scale a', min: -2, max: 3, step: 0.5, default: 1 }],
    fns: [{ expr: 'a*x^2 - 2', label: 'f(x)' }]
  }, fnBox);
  assert.ok(fnBox.querySelector('.ix-fn-hud'), '_buildFN must render hover HUD');
  assert.ok(fnBox.querySelector('.ix-fn-play'), '_buildFN must render Play/Pause animation button');
  const rstBtn = fnBox.querySelector('.ix-fn-reset');
  assert.ok(rstBtn, '_buildFN must render Reset button');
  const slider = fnBox.querySelector('input');
  slider.value = '2.5';
  slider.dispatchEvent({ type: 'input', isTrusted: true });
  assert.strictEqual(fnBox.querySelector('.ix-fn-val').textContent, '2.5');
  rstBtn.click();
  assert.strictEqual(fnBox.querySelector('.ix-fn-val').textContent, '1');

  // _buildGP keyboard cursor & hover test
  const gpBox = makeMinimalEl('div');
  sandbox.window.ClipSATIX._buildGP({
    t: 'gp',
    ti: 'Plot Intercept',
    q: 'Plot (2, 0)',
    xrange: [-4, 4],
    yrange: [-4, 4],
    targets: [{ label: 'Root', target: [2, 0], tol: 0.5 }]
  }, gpBox);
  const gpCanvas = gpBox.querySelector('.ix-gp-canvas');
  const gpHud = gpBox.querySelector('.ix-gp-hud');
  gpCanvas.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault: () => {} });
  gpCanvas.dispatchEvent({ type: 'keydown', key: 'ArrowRight', preventDefault: () => {} });
  assert.strictEqual(gpHud.textContent, '(2, 0)');
  gpCanvas.dispatchEvent({ type: 'keydown', key: 'Enter', preventDefault: () => {} });
  gpBox.querySelector('.ix-sb-go').click();
  assert.ok(gpBox.querySelector('.ix-fb').classList.contains('ok'), '_buildGP keyboard plotting must pass target check');
});

test('02c-figures.js provides interactive figure zoom controls', () => {
  const figSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02c-figures.js'), 'utf8');
  for (const m of ['cs-fig-zoom-tools', 'cs-fig-zoom-pct', 'cs-fig-zoom-btn', 'Zoom in figure', 'Zoom out figure']) {
    assert.ok(figSrc.includes(m), `02c-figures.js missing "${m}"`);
  }
});

test('src/styles/main.css styles upgraded explorers, sliders, IX plotters, focus mode, RTL & reduced motion', () => {
  const css = fs.readFileSync(path.join(ROOT, 'src', 'styles', 'main.css'), 'utf8');
  for (const sel of [
    '.ex-tool-btn',
    '.ex-coord-hud',
    '.ex-drag-hint',
    '.explorer.ex-expanded',
    '.ex-focus-backdrop',
    '.ex-3d-toolbar',
    '.ix-fn-toolbar',
    '.cs-fig-zoom-tools',
    'body.rtl .explorer input[type="range"]',
    '@media (prefers-reduced-motion: reduce)'
  ]) {
    assert.ok(css.includes(sel), `main.css missing "${sel}"`);
  }
});

console.log(`\n✅ All ${passed}/6 interactive visuals upgrade tests passed!`);
