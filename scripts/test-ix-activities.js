#!/usr/bin/env node
/* Unit test suite for Interactive Activities Engine v1 (Plan 10, Phase 10.4b).
   Tests numeric entry (num), order-the-steps (ord), and categorize (cat).
   Zero dependencies: `node scripts/test-ix-activities.js`. */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

let failures = 0;
let passes = 0;
function check(desc, cond) {
  if (cond) {
    passes++;
  } else {
    failures++;
    console.error('  ✗ FAIL: ' + desc);
  }
}

// ─── 1. Mock DOM Environment ──────────────────────────────────────────────────
function createMockElement(tagName) {
  const el = {
    tagName: tagName.toUpperCase(),
    style: {},
    dataset: {},
    attributes: {},
    children: [],
    listeners: {},
    parentNode: null,
    disabled: false,
    value: '',
    placeholder: '',
    type: 'text',
    title: '',

    classList: {
      _set: new Set(),
      add: function(...classes) { classes.forEach((c) => this._set.add(c)); },
      remove: function(...classes) { classes.forEach((c) => this._set.delete(c)); },
      contains: function(c) { return this._set.has(c); },
      toggle: function(c, force) {
        if (force === undefined) {
          if (this._set.has(c)) this._set.delete(c);
          else this._set.add(c);
        } else if (force) {
          this._set.add(c);
        } else {
          this._set.delete(c);
        }
      }
    },

    addEventListener: function(event, fn) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(fn);
    },

    dispatchEvent: function(event) {
      const type = typeof event === 'string' ? event : event.type;
      const fns = this.listeners[type] || [];
      fns.forEach((fn) => fn.call(this, event));
    },

    click: function(evt) {
      const e = evt || { type: 'click' };
      if (!e.type) e.type = 'click';
      this.dispatchEvent(e);
    },

    getContext: function() {
      return {
        setTransform: function(){},
        clearRect: function(){},
        beginPath: function(){},
        moveTo: function(){},
        lineTo: function(){},
        stroke: function(){},
        fill: function(){},
        arc: function(){},
        fillText: function(){}
      };
    },

    getBoundingClientRect: function() {
      return { left: 0, top: 0, width: 480, height: 320 };
    },

    focus: function() {},

    setAttribute: function(k, v) { this.attributes[k] = String(v); },
    getAttribute: function(k) { return this.attributes[k] !== undefined ? this.attributes[k] : null; },
    removeAttribute: function(k) { delete this.attributes[k]; },

    appendChild: function(child) {
      if (child.parentNode) child.parentNode.removeChild(child);
      child.parentNode = this;
      this.children.push(child);
      return child;
    },

    removeChild: function(child) {
      const idx = this.children.indexOf(child);
      if (idx >= 0) {
        this.children.splice(idx, 1);
        child.parentNode = null;
      }
      return child;
    },

    remove: function() {
      if (this.parentNode) this.parentNode.removeChild(this);
    },

    set className(val) {
      this.classList._set.clear();
      if (val) val.trim().split(/\s+/).forEach((c) => this.classList._set.add(c));
    },
    get className() {
      return Array.from(this.classList._set).join(' ');
    },

    set textContent(txt) {
      this._text = String(txt);
      this._html = String(txt);
      this.children = [];
    },
    get textContent() {
      if (this._text !== undefined) return this._text;
      return this.children.map((c) => c.textContent).join('');
    },

    set innerHTML(html) {
      this._html = String(html);
      this._text = String(html).replace(/<[^>]*>/g, '');
      this.children = [];
      // Basic extraction of badge or text if present
      const m = /class="([^"]+)"[^>]*>([^<]*)/.exec(html);
      if (m) {
        const badge = createMockElement('span');
        badge.className = m[1];
        badge.textContent = m[2];
        this.appendChild(badge);
      }
    },
    get innerHTML() {
      return this._html || '';
    },

    querySelector: function(sel) {
      return findOne(this, sel);
    },
    querySelectorAll: function(sel) {
      const results = [];
      findAll(this, sel, results);
      return results;
    }
  };
  return el;
}

function matchesSingle(el, sel) {
  if (sel.startsWith('.')) {
    const classes = sel.slice(1).split('.');
    return classes.every((c) => el.classList.contains(c));
  }
  if (sel.includes('.')) {
    const [tag, ...classes] = sel.split('.');
    if (tag && el.tagName.toLowerCase() !== tag.toLowerCase()) return false;
    return classes.every((c) => el.classList.contains(c));
  }
  return el.tagName.toLowerCase() === sel.toLowerCase();
}

function findOne(root, sel) {
  for (const child of root.children) {
    if (matchesSingle(child, sel)) return child;
    const found = findOne(child, sel);
    if (found) return found;
  }
  return null;
}

function findAll(root, sel, out) {
  for (const child of root.children) {
    if (matchesSingle(child, sel)) out.push(child);
    findAll(child, sel, out);
  }
}

// ─── 2. Initialize Engine in VM ───────────────────────────────────────────────
const engineSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '19-interactive-activities-engine-v1.js'), 'utf8');
const answerCheckSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'scripts', 'modules', '19a-ix-answer-check.js'), 'utf8');

const sandbox = {
  console: console,
  setTimeout: (fn) => { fn(); },
  clearTimeout: () => {},
  document: {
    createElement: (tag) => createMockElement(tag),
    getElementById: () => null,
    body: createMockElement('body'),
    head: createMockElement('head'),
    readyState: 'complete',
    addEventListener: () => {}
  },
  window: {}
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

vm.createContext(sandbox);
vm.runInContext(answerCheckSrc, sandbox);
vm.runInContext(engineSrc, sandbox);

const ClipSATIX = sandbox.window.ClipSATIX;
check('ClipSATIX is exposed on window', typeof ClipSATIX === 'object');
check('ClipSATIX._buildNUM exists', typeof ClipSATIX._buildNUM === 'function');
check('ClipSATIX._buildORD exists', typeof ClipSATIX._buildORD === 'function');
check('ClipSATIX._buildCAT exists', typeof ClipSATIX._buildCAT === 'function');
check('ClipSATIX._buildGP exists', typeof ClipSATIX._buildGP === 'function');
check('ClipSATIX._buildSE exists', typeof ClipSATIX._buildSE === 'function');
check('ClipSATIX._buildMS exists', typeof ClipSATIX._buildMS === 'function');

// ─── 3. Test Numeric Entry (_buildNUM) ─────────────────────────────────────────
console.log('\nTesting Numeric Entry (_buildNUM)...');
{
  const box = createMockElement('div');
  const cfg = {
    t: 'num',
    ti: 'Find the vertex y-coordinate',
    q: 'Given $f(x) = x^2 - 4x + 7$, calculate the minimum value.',
    a: 3,
    tol: 0.01,
    unit: 'units',
    h: 'Complete the square or use $x = -b/(2a) = 2$.',
    sol: 'At $x = 2$, $f(2) = 4 - 8 + 7 = 3$.'
  };

  ClipSATIX._buildNUM(cfg, box);
  const badge = box.querySelector('.ix-badge.num');
  check('num renders badge with Numeric Entry', badge && badge.textContent === 'Numeric Entry');

  const inp = box.querySelector('.ix-num-inp');
  const unit = box.querySelector('.ix-num-unit');
  const checkBtn = box.querySelector('.ix-sb-go');
  const revealBtn = box.querySelector('.ix-sb-show-ans');
  const res = box.querySelector('.ix-fb');

  check('num renders input, unit, and buttons', inp && unit && checkBtn && revealBtn && res);
  check('num renders unit string', unit && unit.innerHTML === 'units');
  check('reveal button is initially hidden', revealBtn && revealBtn.style.display === 'none');

  // Attempt 1: wrong answer
  inp.value = '5';
  checkBtn.click();
  check('wrong answer marks input as bad', inp.classList.contains('bad'));
  check('feedback shows hint on incorrect try', res.innerHTML.includes('Complete the square'));
  check('reveal button still hidden after 1 attempt', revealBtn.style.display === 'none');

  // Attempt 2: close answer triggers precision note
  inp.value = '3.04';
  checkBtn.click();
  check('close answer triggers precision guidance', res.innerHTML.includes('precision or rounding'));
  check('reveal button appears after 2 attempts', revealBtn.style.display === 'inline-block');

  // Reveal solution test
  revealBtn.click();
  check('clicking reveal fills target answer', inp.value === '3');
  check('input becomes ok and disabled', inp.classList.contains('ok') && inp.disabled === true);
  check('check button is disabled', checkBtn.disabled === true);
  check('feedback includes solution', res.innerHTML.includes('f(2) = 4 - 8 + 7 = 3'));
}

// Test fraction and equivalent math expressions in num
{
  const box = createMockElement('div');
  const cfg = {
    t: 'num',
    ti: 'Evaluate slope',
    a: '1/2',
    tol: 1e-4
  };
  ClipSATIX._buildNUM(cfg, box);
  const inp = box.querySelector('.ix-num-inp');
  const checkBtn = box.querySelector('.ix-sb-go');
  const res = box.querySelector('.ix-fb');

  inp.value = '0.5';
  checkBtn.click();
  check('numeric equivalence: "0.5" accepted for "1/2"', inp.classList.contains('ok') && res.classList.contains('ok'));
}

// ─── 4. Test Order the Steps (_buildORD) ───────────────────────────────────────
console.log('\nTesting Order the Steps (_buildORD)...');
{
  const box = createMockElement('div');
  const originalSteps = [
    'Factor out the GCF: $2(x^2 - 9) = 0$',
    'Factor difference of squares: $2(x - 3)(x + 3) = 0$',
    'Apply Zero Product Property: $x - 3 = 0$ or $x + 3 = 0$',
    'Solve for roots: $x = 3$ or $x = -3$'
  ];
  const cfg = {
    t: 'ord',
    ti: 'Solve $2x^2 - 18 = 0$',
    q: 'Arrange the solution steps in logical order:',
    items: originalSteps
  };

  ClipSATIX._buildORD(cfg, box);
  const badge = box.querySelector('.ix-badge.ord');
  check('ord renders badge with Order the Steps', badge && badge.textContent === 'Order the Steps');

  const list = box.querySelector('.ix-ord-list');
  const items = box.querySelectorAll('.ix-ord-item');
  const checkBtn = box.querySelector('.ix-sb-go');
  const revealBtn = box.querySelector('.ix-sb-show-ans');
  const res = box.querySelector('.ix-fb');

  check('ord renders list of 4 items', items.length === 4);
  check('ord check button exists', checkBtn != null);

  // Initial order must be permuted (not identical to 0, 1, 2, 3)
  const initialIndices = items.map((it) => it.dataset.origIdx);
  const isIdentity = initialIndices.every((idx, i) => Number(idx) === i);
  check('initial items are scrambled (not identity permutation)', !isIdentity);

  // Test Move Down button on first item
  const firstDnBtn = items[0].querySelector('.ix-ord-btn.dn');
  check('first item has down button', firstDnBtn != null);
  const topOrig = items[0].dataset.origIdx;
  firstDnBtn.click();

  const reorderedItems = box.querySelectorAll('.ix-ord-item');
  check('moving item down updates list order', reorderedItems[1].dataset.origIdx === topOrig);

  // Ensure items are not in identity order before testing wrong answer
  const curIndices = Array.from(box.querySelectorAll('.ix-ord-item')).map((it) => Number(it.dataset.origIdx));
  if (curIndices.every((idx, i) => idx === i)) {
    const dn = box.querySelectorAll('.ix-ord-item')[0].querySelector('.ix-ord-btn.dn');
    if (dn) dn.click();
  }

  // Wrong check
  checkBtn.click();
  check('wrong order shows someCorrect count and .no result', res.classList.contains('no'));

  checkBtn.click(); // attempt 2
  check('reveal button appears after 2 attempts', revealBtn.style.display === 'inline-block');

  // Click reveal button
  revealBtn.click();
  const finalItems = box.querySelectorAll('.ix-ord-item');
  const finalIndices = finalItems.map((it) => Number(it.dataset.origIdx));
  check('reveal sorts items into correct 0,1,2,3 order', finalIndices.every((idx, i) => idx === i));
  check('all items marked ok after reveal', finalItems.every((it) => it.classList.contains('ok')));
  check('order check button disabled after completion', checkBtn.disabled === true);
}

// ─── 5. Test Categorize (_buildCAT) ───────────────────────────────────────────
console.log('\nTesting Categorize (_buildCAT)...');
{
  const box = createMockElement('div');
  const cfg = {
    t: 'cat',
    ti: 'Classify Function Types',
    categories: ['Linear', 'Quadratic', 'Exponential'],
    items: [
      { s: '$f(x) = 3x - 5$', cat: 0 },
      { s: '$g(x) = 2x^2 + 4x + 1$', cat: 1 },
      { s: '$h(x) = 4 \\cdot 2^x$', cat: 2 }
    ]
  };

  ClipSATIX._buildCAT(cfg, box);
  const badge = box.querySelector('.ix-badge.cat');
  check('cat renders badge with Categorize', badge && badge.textContent === 'Categorize');

  const itemEls = box.querySelectorAll('.ix-cat-item');
  check('renders 3 categorization items', itemEls.length === 3);

  const pills0 = itemEls[0].querySelectorAll('.ix-cat-pill');
  check('each item has 3 category pills', pills0.length === 3);

  const checkBtn = box.querySelector('.ix-sb-go');
  const revealBtn = box.querySelector('.ix-sb-show-ans');
  const res = box.querySelector('.ix-fb');

  // Check without answering all items
  checkBtn.click();
  check('warns when items are incomplete', res.textContent.includes('categorize all items'));

  // Select wrong category for item 0, correct for items 1 and 2
  pills0[1].click(); // wrong: selected Quadratic for Linear
  check('pill selection sets .sel class', pills0[1].classList.contains('sel'));

  const pills1 = itemEls[1].querySelectorAll('.ix-cat-pill');
  pills1[1].click(); // correct: Quadratic

  const pills2 = itemEls[2].querySelectorAll('.ix-cat-pill');
  pills2[2].click(); // correct: Exponential

  // Attempt 1: check partial
  checkBtn.click();
  check('partial score reported (2 of 3 items correctly placed)', res.innerHTML.includes('2 of 3'));
  check('item 0 marked bad, item 1 marked ok', itemEls[0].classList.contains('bad') && itemEls[1].classList.contains('ok'));

  // Attempt 2
  checkBtn.click();
  check('reveal button appears after 2 attempts', revealBtn.style.display === 'inline-block');

  // Click reveal
  revealBtn.click();
  check('reveal marks all items ok', itemEls.every((el) => el.classList.contains('ok')));
  check('feedback confirms all items correctly categorized', res.innerHTML.includes('correctly categorized'));
  check('check button disabled upon completion', checkBtn.disabled === true);
}

// ─── 6. Test Graph Plotter (_buildGP) ─────────────────────────────────────────
console.log('\nTesting Graph Plotter (_buildGP)...');
{
  const box = createMockElement('div');
  const cfg = {
    t: 'gp',
    ti: 'Plot Parabola Roots and Vertex',
    q: 'Plot the vertex and roots for $y = x^2 - 4x + 3$.',
    xrange: [-2, 6],
    yrange: [-3, 6],
    targets: [
      { label: 'Vertex', target: [2, -1], tol: 0.5 },
      { label: 'Root 1', target: [1, 0], tol: 0.5 },
      { label: 'Root 2', target: [3, 0], tol: 0.5 }
    ],
    curve: 'x**2 - 4*x + 3',
    sol: 'Vertex is at $(2, -1)$ and roots are at $x=1, x=3$.'
  };

  ClipSATIX._buildGP(cfg, box);
  const badge = box.querySelector('.ix-badge.gp');
  check('gp renders badge with Graph Plotter', badge && badge.textContent === 'Graph Plotter');

  const targetsWrap = box.querySelector('.ix-gp-targets');
  const targetPills = box.querySelectorAll('.ix-gp-target-pill');
  check('gp renders 3 target pills', targetPills.length === 3);

  const canvas = box.querySelector('.ix-gp-canvas');
  const checkBtn = box.querySelector('.ix-sb-go');
  const clearBtn = box.querySelector('.ix-gp-btn-clear');
  const revealBtn = box.querySelector('.ix-sb-show-ans');
  const res = box.querySelector('.ix-fb');

  check('gp renders canvas and control buttons', canvas && checkBtn && clearBtn && revealBtn && res);

  // Check before placing points
  checkBtn.click();
  check('checking with 0 points reports someCorrect', res.innerHTML.includes('0 of 3'));

  // Place a point via canvas click
  // x = 2 is at pixel cx = 38 + (2 - (-2))/(6 - (-2)) * (480 - 38 - 20) = 249
  // y = -1 is at pixel cy = 320 - 26 - (-1 - (-3))/(6 - (-3)) * (320 - 20 - 26) ~ 233
  canvas.click({ clientX: 249, clientY: 233 });
  checkBtn.click();
  check('placing vertex matches target 1', res.innerHTML.includes('1 of 3'));

  // Reveal target solution
  revealBtn.click();
  check('reveal sets all target pills ok', targetPills.every((p) => p.classList.contains('ok')));
  check('reveal shows full solution feedback', res.innerHTML.includes('accurately plotted'));
  check('controls disabled after completion', checkBtn.disabled === true && clearBtn.disabled === true);
}

// ─── 7. Test Spot the Error (_buildSE) ─────────────────────────────────────────
console.log('\nTesting Spot the Error (_buildSE)...');
{
  const box = createMockElement('div');
  const cfg = {
    t: 'se',
    ti: 'Find the Flaw in the Solution',
    q: 'Solve $2x^2 = 8x$. A student wrote:',
    steps: [
      { s: '$2x^2 - 8x = 0$' },
      { s: '$2x(x - 4) = 0$' },
      { s: 'Divide both sides by $2x$ to get $x - 4 = 0$' },
      { s: '$x = 4$' }
    ],
    errorStep: 3,
    reasons: [
      'Dividing by variable loses $x = 0$',
      'GCF factoring was incorrect'
    ],
    correctReason: 0,
    sol: 'Step 3 is invalid: dividing by $2x$ assumes $x \\ne 0$, losing the root $x = 0$.'
  };

  ClipSATIX._buildSE(cfg, box);
  const badge = box.querySelector('.ix-badge.se');
  check('se renders badge with Spot the Error', badge && badge.textContent === 'Spot the Error');

  const stepBtns = box.querySelectorAll('.ix-se-step');
  check('se renders 4 steps plus 1 no-error option', stepBtns.length === 5);

  const checkBtn = box.querySelector('.ix-sb-go');
  const revealBtn = box.querySelector('.ix-sb-show-ans');
  const res = box.querySelector('.ix-fb');

  // Attempt without selecting step
  checkBtn.click();
  check('warns when no step selected', res.textContent.includes('select a step first'));

  // Select Step 1 (valid step - incorrect answer)
  stepBtns[0].click();
  check('clicking step 1 sets .sel', stepBtns[0].classList.contains('sel'));

  checkBtn.click();
  check('selecting valid step reports incorrect', res.innerHTML.includes('valid') || res.innerHTML.includes('Not quite'));

  // Select Step 3 (error step)
  stepBtns[2].click();
  check('step 3 is selected', stepBtns[2].classList.contains('sel'));

  // Reason buttons should now be visible
  const reasonBtns = box.querySelectorAll('.ix-se-reason-btn');
  check('reasons list rendered with 2 reasons', reasonBtns.length === 2);

  // Select correct reason (index 0)
  reasonBtns[0].click();
  checkBtn.click();
  check('identifying flaw in step 3 triggers success', res.innerHTML.includes('Step 3') && res.classList.contains('ok'));
  check('error step gains err class', stepBtns[2].classList.contains('err'));
  check('check button disabled upon completion', checkBtn.disabled === true);
}

// ─── 8. Test Examiner Mode (_buildMS) ─────────────────────────────────────────
console.log('\nTesting Examiner Mode (_buildMS)...');
{
  const box = createMockElement('div');
  const cfg = {
    t: 'ms',
    ti: 'Calculus Differentiation Paper',
    q: 'Find the derivative and stationary points of $y = 2x^3 - 9x^2 + 12x$.',
    parts: [
      {
        label: 'Part (a)',
        marks: 2,
        rubric: [
          { code: 'M1', text: 'Differentiate at least two terms' },
          { code: 'A1', text: 'Fully correct derivative $6x^2 - 18x + 12$' }
        ]
      },
      {
        label: 'Part (b)',
        marks: 2,
        rubric: [
          { code: 'M1', text: 'Set derivative to 0 and factor' },
          { code: 'A1', text: 'Roots $x = 1$ and $x = 2$' }
        ]
      }
    ],
    boundaries: [
      { min: 4, grade: 'Grade 9 / A*' },
      { min: 3, grade: 'Grade 8 / A' },
      { min: 2, grade: 'Grade 6 / B' },
      { min: 0, grade: 'Needs Review' }
    ],
    examinerTip: 'Candidates often forget to state the y-coordinates.'
  };

  ClipSATIX._buildMS(cfg, box);
  const badge = box.querySelector('.ix-badge.ms');
  check('ms renders badge with Examiner Mode', badge && badge.textContent === 'Examiner Mode');

  const totalChip = box.querySelector('.ix-ms-total-chip');
  check('total marks chip shows 4 marks', totalChip && totalChip.textContent.includes('4 marks'));

  const toggleBtn = box.querySelector('.ix-ms-btn-toggle');
  const rubricWrap = box.querySelector('.ix-ms-rubric');
  check('rubric is initially hidden', rubricWrap && rubricWrap.style.display === 'none');

  toggleBtn.click();
  check('clicking toggle opens rubric', rubricWrap && rubricWrap.style.display === 'block');

  const markBtns = box.querySelectorAll('.ix-ms-mark-btn');
  check('renders 4 mark toggle buttons', markBtns.length === 4);

  const scoreNum = box.querySelector('.ix-ms-score-num');
  const gradePill = box.querySelector('.ix-ms-grade-pill');
  check('initial score is 0 / 4 (0%)', scoreNum && scoreNum.textContent.includes('0 / 4'));

  // Earn mark 1
  markBtns[0].click();
  check('mark button gains .earned class', markBtns[0].classList.contains('earned'));
  check('score updates to 1 / 4 (25%)', scoreNum.textContent.includes('1 / 4 (25%)'));

  // Earn all 4 marks
  markBtns[1].click();
  markBtns[2].click();
  markBtns[3].click();
  check('score reaches 4 / 4 (100%)', scoreNum.textContent.includes('4 / 4 (100%)'));
  check('projected grade matches Grade 9 / A*', gradePill.textContent.includes('Grade 9'));

  const tipBox = box.querySelector('.ix-ms-tip-box');
  check('examiner tip rendered', tipBox && tipBox.textContent.includes('y-coordinates'));
}

// ─── 9. Summary ───────────────────────────────────────────────────────────────
console.log(`\nInteractive Activities test suite: ${passes} passed, ${failures} failed.`);
if (failures > 0) {
  process.exit(1);
} else {
  console.log('✅ All interactive activities tests passed successfully.\n');
}
