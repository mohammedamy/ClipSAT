#!/usr/bin/env node
/* Unit test suite for ClipSAT On-Screen Virtual Math Keyboard.
   Zero dependencies: `node scripts/test-math-keyboard.js`. */
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
    selectionStart: 0,
    selectionEnd: 0,

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

    set className(val) {
      this.classList._set.clear();
      if (val) val.trim().split(/\s+/).forEach((c) => this.classList._set.add(c));
    },
    get className() {
      return Array.from(this.classList._set).join(' ');
    },

    setAttribute: function(name, val) {
      this.attributes[name] = String(val);
    },
    getAttribute: function(name) {
      return this.attributes[name] !== undefined ? this.attributes[name] : null;
    },

    addEventListener: function(event, fn) {
      if (!this.listeners[event]) this.listeners[event] = [];
      this.listeners[event].push(fn);
    },

    dispatchEvent: function(event) {
      const type = typeof event === 'string' ? event : event.type;
      const fns = this.listeners[type] || [];
      fns.forEach((fn) => fn.call(this, event));
      return true;
    },

    click: function() {
      this.dispatchEvent({ type: 'click', preventDefault: () => {} });
    },

    focus: function() {
      this.dispatchEvent({ type: 'focus', preventDefault: () => {} });
    },

    setSelectionRange: function(start, end) {
      this.selectionStart = start;
      this.selectionEnd = end;
    },

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

    set textContent(txt) {
      this._text = String(txt);
      this._html = String(txt);
      this.children = [];
    },
    get textContent() {
      if (this._text !== undefined && this.children.length === 0) return this._text;
      return this.children.map((c) => c.textContent).join('');
    },

    set innerHTML(html) {
      this._html = String(html);
      this._text = String(html).replace(/<[^>]*>/g, '');
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
  Event: function(type) { this.type = type; },
  window: {}
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;

vm.createContext(sandbox);
vm.runInContext(answerCheckSrc, sandbox);
vm.runInContext(engineSrc, sandbox);

const ClipSATMathPalette = sandbox.window.ClipSATMathPalette;
const ClipSATVirtualKeypad = sandbox.window.ClipSATVirtualKeypad;

console.log('Testing Virtual Math Keyboard Initialization...');
check('ClipSATMathPalette is exposed on window', typeof ClipSATMathPalette === 'function');
check('ClipSATVirtualKeypad alias is exposed on window', typeof ClipSATVirtualKeypad === 'function');

// ─── 3. Palette Instantiation & Structure ────────────────────────────────────
const container = createMockElement('div');
const input = createMockElement('input');
input.type = 'text';
input.value = '';
container.appendChild(input);

let checkCount = 0;
const pal = ClipSATMathPalette(container, () => input, {
  onCheck: () => { checkCount++; }
});

check('palette element is created and appended', container.children.includes(pal));
check('palette has role=region', pal.getAttribute('role') === 'region');

const toggleBtn = pal.querySelector('.ix-mp-toggle-btn');
check('toggle button exists', toggleBtn != null);
check('toggle button initially collapsed (aria-expanded=false)', toggleBtn.getAttribute('aria-expanded') === 'false');

const body = pal.querySelector('.ix-mp-body');
check('keypad body exists and starts hidden', body != null && body.style.display === 'none');

// ─── 4. Open / Close Behavior ─────────────────────────────────────────────────
toggleBtn.click();
check('clicking toggle opens keypad (body display block)', body.style.display === 'block');
check('palette element has .open class', pal.classList.contains('open'));
check('toggle button has aria-expanded=true', toggleBtn.getAttribute('aria-expanded') === 'true');

const closeBtn = pal.querySelector('.ix-mp-close-btn');
check('close button exists in header', closeBtn != null);
closeBtn.click();
check('clicking close hides keypad', body.style.display === 'none');
check('palette element loses .open class', !pal.classList.contains('open'));

// Re-open for testing keys
pal.open();
check('pal.open() opens keypad', body.style.display === 'block');

// ─── 5. Tab Switching ─────────────────────────────────────────────────────────
const tabBtns = pal.querySelectorAll('.ix-mp-tab-btn');
check('3 tab buttons exist (123, func, sym)', tabBtns.length === 3);

const grids = pal.querySelectorAll('.ix-mp-grid');
check('3 keypad grids exist', grids.length === 3);

// Default is tab '123'
check('tab 1 is active by default', tabBtns[0].classList.contains('active'));
check('grid 1 is visible by default', grids[0].style.display !== 'none');
check('grid 2 is hidden by default', grids[1].style.display === 'none');

// Switch to Functions & Trig
tabBtns[1].click();
check('tab 2 is active after click', tabBtns[1].classList.contains('active'));
check('grid 2 is visible', grids[1].style.display === 'grid');
check('grid 1 is hidden', grids[0].style.display === 'none');

// Switch to Symbols & Calculus
tabBtns[2].click();
check('tab 3 is active after click', tabBtns[2].classList.contains('active'));
check('grid 3 is visible', grids[2].style.display === 'grid');
check('grid 2 is hidden', grids[1].style.display === 'none');

// Switch back to 123
tabBtns[0].click();
check('tab 1 is active again', tabBtns[0].classList.contains('active'));

// ─── 6. Key Actions & Typing ──────────────────────────────────────────────────
console.log('\nTesting Keypad Inputs and Cursor Manipulation...');

function findKey(label) {
  const allKeys = pal.querySelectorAll('.ix-mp-key');
  return allKeys.find((k) => k.textContent === label);
}

function clickKey(label) {
  const k = findKey(label);
  if (!k) throw new Error('Key not found: ' + label);
  k.dispatchEvent({ type: 'mousedown', preventDefault: () => {} });
}

// Clear input
input.value = '';
input.setSelectionRange(0, 0);

// Type '3' then '+' then '5'
clickKey('3');
check('typing 3 sets value', input.value === '3');
check('cursor moved after 3', input.selectionStart === 1);

clickKey('+');
check('typing + appends', input.value === '3+');

clickKey('5');
check('typing 5 appends', input.value === '3+5');

// Navigation ◄ and ►
clickKey('◄');
check('cursor moved left', input.selectionStart === 2);
clickKey('◄');
check('cursor moved left again', input.selectionStart === 1);
clickKey('►');
check('cursor moved right', input.selectionStart === 2);

// Backspace
clickKey('⌫');
check('backspace removed operator +', input.value === '35');
check('cursor at position 1', input.selectionStart === 1);

// Clear button
clickKey('C');
check('clear button emptied field', input.value === '');
check('cursor at 0', input.selectionStart === 0);

// ─── 7. Fractions and Smart Selection Wrapping ────────────────────────────────
console.log('\nTesting Smart Selection Wrapping...');

// Test 1: Empty insertion of fraction
clickKey('a/b');
check('empty a/b inserts ()/()', input.value === '()/()');
// Cursor should be placed inside numerator: position 1
check('cursor inside numerator', input.selectionStart === 1);

// Clear
clickKey('C');

// Test 2: Wrap selected text in fraction
input.value = '2x+1';
input.setSelectionRange(0, 4); // Select '2x+1'
clickKey('a/b');
check('selection wrapped in fraction: (2x+1)/()', input.value === '(2x+1)/()');
// Cursor should be inside denominator
check('cursor inside denominator for immediate input', input.selectionStart === 8);

// Test 3: Wrap selected text in square root
clickKey('C');
input.value = 'x^2+4';
input.setSelectionRange(0, 5); // Select 'x^2+4'
clickKey('√x');
check('selection wrapped in sqrt: sqrt(x^2+4)', input.value === 'sqrt(x^2+4)');

// Test 4: Wrap selected text in parentheses
clickKey('C');
input.value = 'a+b';
input.setSelectionRange(0, 3);
clickKey('( )');
check('selection wrapped in parentheses: (a+b)', input.value === '(a+b)');

// Test 5: Trig function insertion
tabBtns[1].click(); // Functions tab
clickKey('C');
clickKey('sin');
check('sin inserts sin() with cursor inside', input.value === 'sin()' && input.selectionStart === 4);

tabBtns[0].click(); // Back to 123 tab

// ─── 8. Real-time Math Preview Bar ───────────────────────────────────────────
console.log('\nTesting Live Math Preview Bar...');
const prevCnt = pal.querySelector('.ix-mp-preview-cnt');
check('preview content container exists', prevCnt != null);

input.value = '3/4';
container.dispatchEvent({ type: 'input', target: input });
check('preview rendered for 3/4', prevCnt.innerHTML.length > 0 && !prevCnt.innerHTML.includes('Type or tap'));

input.value = '';
container.dispatchEvent({ type: 'input', target: input });
check('empty input shows placeholder in preview', prevCnt.innerHTML.includes('Type or tap'));

// ─── 9. Direct Check Button ──────────────────────────────────────────────────
console.log('\nTesting Direct Check Button...');
const checkBtn = pal.querySelector('.ix-mp-check-btn');
check('check button exists in footer', checkBtn != null);
checkBtn.click();
check('clicking check button triggers onCheck callback', checkCount === 1);

// ─── Final Summary ────────────────────────────────────────────────────────────
console.log(`\nVirtual Math Keyboard test suite: ${passes} passed, ${failures} failed.`);
if (failures > 0) {
  process.exit(1);
} else {
  console.log('✅ All Virtual Math Keyboard tests passed successfully.\n');
}
