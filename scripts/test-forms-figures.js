/**
 * Test Suite for Forms Figure & Math Image Pipeline
 * Verifies that question figures, diagrams, and complex math are properly captured
 * and routed to the Google Forms export pipeline.
 */

const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

console.log('── Running Google Forms Figure Export Tests ──');

// 1. Test MathImage needsImage behavior
const mathImageSrc = fs.readFileSync('public/js/math-image.js', 'utf8');
const sandbox = {
  window: {},
  document: {
    createElement: () => ({ style: { setProperty: () => {} } }),
    head: { appendChild: () => {} },
    body: { appendChild: () => {}, removeChild: () => {} }
  },
  console: console
};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(mathImageSrc, sandbox);

const mi = sandbox.window.ClipSATMathImage;
assert(mi, 'ClipSATMathImage should be registered on window');

// Test needsImage
assert.strictEqual(mi.needsImage('The graph is shown above.', { type: 'fn' }, null), true,
  'needsImage should return true if figure object is present');

assert.strictEqual(mi.needsImage('What is the perimeter?', null, '<svg>...</svg>'), true,
  'needsImage should return true if figureHtml is present');

assert.strictEqual(mi.needsImage('Simple question with x = 3', null, null), false,
  'needsImage should return false for simple text with no figure');

assert.strictEqual(mi.needsImage('Solve for \\(\\frac{x+1}{x-1} = 2\\)', null, null), true,
  'needsImage should return true for complex LaTeX fraction');

console.log('  ✓ ClipSATMathImage.needsImage correctly flags figures and complex math');

// 2. Test forms-api createFromQuiz job queueing
const formsApiSrc = fs.readFileSync('public/js/forms-api.js', 'utf8');
vm.runInContext(formsApiSrc, sandbox);

const formsApi = sandbox.window.ClipSATForms;
assert(formsApi, 'ClipSATForms should be registered on window');

// Test mathToPlainText
const pt1 = formsApi.mathToPlainText('The value of \\(x^2 + 2x + 1\\) is:');
assert.strictEqual(pt1, 'The value of x² + 2x + 1 is:', 'mathToPlainText converts basic powers cleanly');

const ptFrac = formsApi.mathToPlainText('\\dfrac{a}{b}');
assert.strictEqual(ptFrac, 'a/b', 'mathToPlainText converts fractions cleanly');

console.log('  ✓ ClipSATForms.mathToPlainText handles LaTeX transformations accurately');

// 3. Verify bank-exam, ai-test, and chapter-quiz codebases have figure capture
const bankExamCode = fs.readFileSync('src/scripts/modules/02b-bank-exam.js', 'utf8');
assert(bankExamCode.includes('figure:q.figure||null,figureHtml:_fHtml||null'),
  '02b-bank-exam.js must include figure and figureHtml in _csCaptureQ');

const aiTestCode = fs.readFileSync('src/scripts/modules/05a-ai-test.js', 'utf8');
assert(aiTestCode.includes('figure:_aiFig||null,figureHtml:_fHtml||null'),
  '05a-ai-test.js must include figure and figureHtml in _csCaptureQ');

const chapterQuizCode = fs.readFileSync('src/scripts/modules/03-ai-chat-and-practice-quiz.js', 'utf8');
assert(chapterQuizCode.includes('figure:_f||null,figureHtml:_fHtml||null'),
  '03-ai-chat-and-practice-quiz.js must include figure and figureHtml in _csCaptureQ');

const quizCaptureUiCode = fs.readFileSync('public/js/quiz-capture-ui.js', 'utf8');
assert(quizCaptureUiCode.includes('mi.needsImage(q.text, fig, fHtml)'),
  'quiz-capture-ui.js must pass fig and fHtml to needsImage for progress estimation');

console.log('  ✓ All quiz modules properly capture figures in _csCaptureQ');
console.log('✅ All Google Forms figure export tests passed successfully!');
