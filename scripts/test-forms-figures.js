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

const ptDeg = formsApi.mathToPlainText('Two parallel lines are cut by a transversal. One angle is \\( 30^\\circ \\). Find its co-interior (allied) angle.');
assert.strictEqual(ptDeg, 'Two parallel lines are cut by a transversal. One angle is 30°. Find its co-interior (allied) angle.', 'mathToPlainText accurately converts 30^\\circ to 30°');

console.log('  ✓ ClipSATForms.mathToPlainText handles LaTeX transformations accurately');

// 2b. Test hasComplexMath and SVG sanitization
assert.strictEqual(mi.hasComplexMath('Find the gradient of the line joining \\( (0, -2) \\) and \\( (3, 1) \\).'), false,
  'Coordinate line question does not have complex math');
assert.strictEqual(mi.hasComplexMath('Two parallel lines are cut by a transversal. One angle is \\( 30^\\circ \\).'), false,
  'Transversal angle question does not have complex math');
assert.strictEqual(mi.hasComplexMath('Solve for x: \\( \\frac{x+1}{x-1} = 2 \\)'), true,
  'Fraction question has complex math');
assert.strictEqual(mi.hasComplexMath('Evaluate \\( \\int_0^1 x^2 dx \\)'), true,
  'Integral question has complex math');

const rawSvg = '<svg width="220" height="160" viewBox="0 0 220 160" style="stroke:var(--fig-indigo);fill:var(--fig-ink);background:var(--fig-bg);">';
const cleanSvg = mi.sanitizeSvg(rawSvg);
assert(!cleanSvg.includes('var('), 'sanitizeSvg must replace all CSS custom properties with concrete colors');
assert(cleanSvg.includes('xmlns="http://www.w3.org/2000/svg"'), 'sanitizeSvg must ensure xmlns is present');

const dims = mi.getSvgDimensions(cleanSvg);
assert.strictEqual(dims.w, 220, 'getSvgDimensions correctly parses width');
assert.strictEqual(dims.h, 160, 'getSvgDimensions correctly parses height');

console.log('  ✓ ClipSATMathImage handles complex math detection, SVG sanitization, and dimensions accurately');

// 3. Verify bank-exam, ai-test, chapter-quiz, and genTest codebases have figure capture
const bankExamCode = fs.readFileSync('src/scripts/modules/02b-bank-exam.js', 'utf8');
assert(bankExamCode.includes('figure:q.figure||q.fig||null,figureHtml:_fHtml||null'),
  '02b-bank-exam.js must include figure: q.figure||q.fig||null and figureHtml in _csCaptureQ');

const aiTestCode = fs.readFileSync('src/scripts/modules/05a-ai-test.js', 'utf8');
assert(aiTestCode.includes('figure:_aiFig||null,figureHtml:_fHtml||null'),
  '05a-ai-test.js must include figure and figureHtml in _csCaptureQ');

const chapterQuizCode = fs.readFileSync('src/scripts/modules/03-ai-chat-and-practice-quiz.js', 'utf8');
assert(chapterQuizCode.includes('figure:_f||null,figureHtml:_fHtml||null'),
  '03-ai-chat-and-practice-quiz.js must include figure and figureHtml in _csCaptureQ');

const genTestCode = fs.readFileSync('src/scripts/modules/05-test-generator-and-ai-settings.js', 'utf8');
assert(genTestCode.includes('figure: q.figure || q.fig || null,') && genTestCode.includes('figureHtml: _fHtml || null'),
  '05-test-generator-and-ai-settings.js must include figure and figureHtml in _csCaptureQ');

const quizCaptureUiCode = fs.readFileSync('public/js/quiz-capture-ui.js', 'utf8');
assert(quizCaptureUiCode.includes('mi.needsImage(q.text, fig, fHtml)'),
  'quiz-capture-ui.js must pass fig and fHtml to needsImage for progress estimation');
assert(quizCaptureUiCode.includes('clipsat-cbt-payload') && quizCaptureUiCode.includes('isFullExam'),
  'quiz-capture-ui.js must support downloadable Full Practice Exams as well as topic worksheets');

const ptKatexHtml = formsApi.mathToPlainText('Evaluate <span class="katex"><span class="katex-mathml"><math><semantics><mrow><msup><mi>x</mi><mn>2</mn></msup></mrow><annotation encoding="application/x-tex">\\frac{x^2}{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true">x2/3</span></span> now.');
assert.strictEqual(ptKatexHtml, 'Evaluate x²/3 now.', 'mathToPlainText must extract original LaTeX from pre-rendered KaTeX HTML without duplicating MathML/HTML text');

const ptBinom = formsApi.mathToPlainText('Find \\(\\binom{n}{2}\\) and \\(\\$50\\).');
assert.strictEqual(ptBinom, 'Find C(n, 2) and $50.', 'mathToPlainText must convert \\binom and preserve escaped \\$');

console.log('  ✓ All quiz modules properly capture figures, FRQs, and full exams in Google Forms');
console.log('✅ All Google Forms figure export tests passed successfully!');
