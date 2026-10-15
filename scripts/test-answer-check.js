#!/usr/bin/env node
/* Unit test for src/scripts/modules/19a-ix-answer-check.js (Plan 10, Phase 10.0).
   Zero dependencies: `node scripts/test-answer-check.js`. Runs in PR Checks.
   1. Hand-written cases: known wrong answers must be rejected, equivalent forms accepted.
   2. Corpus: every Step Builder answer in src/scripts/ix-data/*.js must accept itself,
      and a sign-flipped mutation of it must be rejected. */
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { equivalent } = require('../src/scripts/modules/19a-ix-answer-check.js');

let failures = 0;
function check(desc, cond) {
  if (!cond) { failures++; console.error('  FAIL ' + desc); }
}

// [student input, expected answer] — every one of these was marked correct by the old grader.
const mustReject = [
  ['2x-1', '2x+1'], ['-3', '3'], ['3', '-3'], ['1/2', '12'], ['12', '1/2'], ['x>5', 'x<5'],
  ['x<=5', 'x<5'], ['3x^2+8x+3', '3x^2-8x+3'], ['(2,3)', '(3,2)'], ['2pi', 'pi/2'],
  ['0.5', '5'], ['x=4', 'x=-4'], ['upconcave', 'concave up'], ['', '0'], ['30', '30pi'],
  ['2/1', '1/2'], ['x+1', 'x-1'], ['4cos^2θ', '4sin^2θ'],
  ['±4', '4'], ['3e4', '300'], ['50%', '5'],
];
const mustAccept = [
  ['2x+1', '2x+1'], [' 2X + 1 ', '2x+1'], ['1+2x', '2x+1'], ['0.5', '1/2'], ['\\frac{1}{2}', '0.5'],
  ['2(x+1)', '2x+2'], ['x²', 'x^2'], ['30π', '30pi'], ['2πr·dr/dt', '2*pi*r*dr/dt'],
  ['4(cosθ)^2', '4cos^2θ'], ['(3, 2)', '(3,2)'], ['5<x', 'x>5'], ['x=3', '3'], ['3', 'x=3'],
  ['−8x', '-8x'], ['√16', '4'], ['\\sqrt{2}/2', '1/sqrt(2)'], ['4, 2', '2,4'], ['x ≥ 1', 'x>=1'],
  ['Concave up', 'concave up'], ['e^0', '1'], ['|−3|', '3'],
  ['\\frac{1}{\\sqrt{x+1}}', '1/sqrt(x+1)'], ['\\frac{\\sqrt{3}}{2}', 'sqrt(3)/2'],
  ['\\frac{1}{2+\\frac{1}{3}}', '3/7'], ['±3', '3, -3'], ['±3', '-3, 3'], ['3, -3', '±3'],
  ['(1±\\sqrt{5})/2', '(1+sqrt(5))/2, (1-sqrt(5))/2'],
  ['3e4', '30000'], ['1.5e-2', '0.015'], ['50%', '0.5'], ['25%', '1/4'],
  ['x_1', 'x1'], ['x_{2}', 'x2'], ['2 < x < 5', '5 > x > 2'],
  ['\\alpha + \\beta', 'α + β'], ['cbrt(27)', '3'],
];
console.log('Hand-written cases');
for (const [u, a] of mustReject) check(`"${u}" must NOT match "${a}"`, !equivalent(u, a));
for (const [u, a] of mustAccept) check(`"${u}" must match "${a}"`, equivalent(u, a));

// Corpus test over the real activity data.
console.log('Corpus: Step Builder answers in src/scripts/ix-data/');
const dir = path.join(__dirname, '..', 'src', 'scripts', 'ix-data');
let steps = 0, mutated = 0;
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js'))) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox);
  const D = {};
  (sandbox.window.__ixData || []).forEach((fn) => fn(D));
  for (const [ch, acts] of Object.entries(D)) {
    for (const act of acts) {
      if (act.t !== 'sb') continue;
      for (const variant of [act.steps, act.steps_ar].filter(Boolean)) {
        for (const s of variant) {
          steps++;
          const a = String(s.a);
          check(`${f} ${ch}: answer "${a}" must accept itself`, equivalent(a, a));
          // Sign-flip mutation: negate the whole answer. Skip zero/symmetric answers where it's still equal.
          const neg = '-(' + a + ')';
          if (/^[(\[]/.test(a) || /[=<>,]/.test(a) || /^0+(\.0+)?$/.test(a)) continue;
          if (!/[0-9a-zθπ]/i.test(a)) continue;
          mutated++;
          check(`${f} ${ch}: "${neg}" must NOT match "${a}"`, !equivalent(neg, a) || /^[^0-9]*$/.test(a) && !/[a-zθπ]/i.test(a));
        }
      }
    }
  }
}
console.log(`  ${steps} Step Builder answers checked, ${mutated} sign-flip mutations checked`);
assert.ok(steps > 0, 'no Step Builder answers found — corpus path is wrong');

if (failures) { console.error(`\n${failures} failure(s)`); process.exit(1); }
console.log('\nAll answer-check tests passed.');
