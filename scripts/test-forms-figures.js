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

const ptKatexSsrHtmlOnly = formsApi.mathToPlainText('Evaluate <span class="katex" data-tex="\\frac{x^2}{3}"><span class="sr-only">\\frac{x^2}{3}</span><span class="katex-html" aria-hidden="true">x2/3</span></span> now.');
assert.strictEqual(ptKatexSsrHtmlOnly, 'Evaluate x²/3 now.', 'mathToPlainText must extract original LaTeX from HTML-only SSR KaTeX (data-tex + .sr-only) without duplicating text');

const ptBinom = formsApi.mathToPlainText('Find \\(\\binom{n}{2}\\) and \\(\\$50\\).');
assert.strictEqual(ptBinom, 'Find C(n, 2) and $50.', 'mathToPlainText must convert \\binom and preserve escaped \\$');

// 4. Verify HTML-only SSR KaTeX (data-tex) extraction in ClipSATMathImage
const ssrComplex = '<span class="katex" data-tex="\\frac{x+1}{x-1}"><span class="katex-html" aria-hidden="true">x+1/x-1</span></span>';
const ssrSimple = '<span class="katex" data-tex="30^\\circ"><span class="katex-html" aria-hidden="true">30°</span></span>';
assert.strictEqual(mi.hasComplexMath(ssrComplex), true, 'hasComplexMath should extract SSR data-tex complex math');
assert.strictEqual(mi.needsImage(ssrComplex, null, null), true, 'needsImage should flag SSR data-tex complex math');
assert.strictEqual(mi.hasComplexMath(ssrSimple), false, 'hasComplexMath should treat SSR degree angle as simple');
assert.strictEqual(mi.needsChoiceImage('\\(\\frac{3}{5}\\)'), false, 'needsChoiceImage should leave simple numeric fractions as fast plain text');
assert.strictEqual(mi.needsChoiceImage('\\(\\frac{x+1}{x-1}\\)'), true, 'needsChoiceImage should flag algebraic fractions for image rendering');

console.log('  ✓ All quiz modules properly capture figures, FRQs, and full exams in Google Forms');

// 5. End-to-end mocked createFromQuiz tests: alignment === LEFT & batchUpdate fallback
(async function runMockedFormsCreateTests() {
  const sampleQuiz = {
    title: 'ClipSAT Forms Alignment & Speed Test',
    questions: [
      {
        text: 'In right triangle \\(ABC\\) with \\(\\angle C = 90^\\circ\\), find \\(BC\\).',
        figure: { type: 'right_triangle', labels: ['A', 'B', 'C'] },
        choices: ['32', '\\(\\frac{3}{5}\\)', '34', '8'],
        correctIndex: 0,
        type: 'mcq'
      },
      {
        text: 'Solve \\(2x + 3 = 11\\).',
        choices: ['\\(\\frac{x+1}{x-1}\\)', '\\(x^2 + 1\\)', '4', '5'],
        correctIndex: 2,
        type: 'mcq'
      },
      {
        text: 'Which graph shows a line of positive slope?',
        choices: ['<svg viewBox="0 0 100 100"><line x1="10" y1="90" x2="90" y2="10"/></svg>', 'None'],
        correctIndex: 0,
        type: 'mcq'
      }
    ]
  };

  assert.strictEqual(formsApi.countImageJobs(sampleQuiz), 3,
    'countImageJobs should queue only stem SVG, complex algebraic choice, and SVG choice (3 total, skipping trivial text & numeric fraction)');

  let capturedBatchBody = null;
  let renderedJobs = 0;

  sandbox.window.ClipSATGoogle = {
    configured: true,
    isSignedIn: () => true,
    getToken: () => 'mock-oauth-token-123456'
  };
  const origRender = sandbox.window.ClipSATMathImage.renderQuestionImage;
  sandbox.window.ClipSATMathImage.renderQuestionImage = async (text) => {
    renderedJobs++;
    return { sourceUri: 'https://lh3.googleusercontent.com/d/mock-' + renderedJobs + '=s1200', width: 320, _text: text };
  };
  sandbox.fetch = async (url, opts) => {
    if (url === 'https://forms.googleapis.com/v1/forms') {
      return { ok: true, status: 200, json: async () => ({ formId: 'form-123' }) };
    }
    if (url.endsWith(':batchUpdate')) {
      capturedBatchBody = JSON.parse(opts.body);
      return { ok: true, status: 200, json: async () => ({}) };
    }
    if (url.endsWith('/form-123')) {
      return { ok: true, status: 200, json: async () => ({ formId: 'form-123', responderUri: 'https://docs.google.com/forms/d/e/form-123/viewform' }) };
    }
    throw new Error('Unexpected fetch URL: ' + url);
  };

  const progressStages = [];
  const res1 = await formsApi.createFromQuiz(sampleQuiz, (done, total, stage) => {
    progressStages.push({ done, total, stage });
  });
  assert.strictEqual(res1.formId, 'form-123');
  assert.strictEqual(renderedJobs, 3, 'createFromQuiz should render exact 3 complex/diagram jobs');
  assert(progressStages.some(p => /Uploading|Preparing|Creating Google Form|Adding/.test(p.stage || '')),
    'createFromQuiz should emit informative stage progress updates');
  assert(capturedBatchBody && Array.isArray(capturedBatchBody.requests), 'batchUpdate requests must be captured');

  let foundStemLeft = 0;
  let foundOptionLeft = 0;
  capturedBatchBody.requests.forEach((req) => {
    const item = req.createItem && req.createItem.item;
    if (!item || !item.questionItem) return;
    if (item.questionItem.image) {
      assert.strictEqual(item.questionItem.image.properties.alignment, 'LEFT',
        'Stem questionItem.image alignment must be LEFT');
      foundStemLeft++;
    }
    const opts = item.questionItem.question && item.questionItem.question.choiceQuestion && item.questionItem.question.choiceQuestion.options;
    if (opts) {
      opts.forEach((opt) => {
        if (opt.image) {
          assert.strictEqual(opt.image.properties.alignment, 'LEFT',
            'Choice Option.image alignment must NEVER be CENTER (must be LEFT)');
          assert(opt.image.properties.width <= 360, 'Choice Option.image width must stay bounded');
          foundOptionLeft++;
        }
      });
    }
  });
  assert.strictEqual(foundStemLeft, 1, 'Expected 1 left-aligned stem image');
  assert.strictEqual(foundOptionLeft, 2, 'Expected 2 left-aligned choice images');
  console.log('  ✓ batchUpdate uses alignment: LEFT on both stem and choice images and avoids excessive uploads');

  // Test automatic fallback when Forms API returns HTTP 400 "Drawing must be left aligned"
  let batchAttempts = 0;
  let retryBatchBody = null;
  sandbox.fetch = async (url, opts) => {
    if (url === 'https://forms.googleapis.com/v1/forms') {
      return { ok: true, status: 200, json: async () => ({ formId: 'form-retry' }) };
    }
    if (url.endsWith(':batchUpdate')) {
      batchAttempts++;
      const parsed = JSON.parse(opts.body);
      if (batchAttempts === 1) {
        return {
          ok: false,
          status: 400,
          json: async () => ({ error: { message: 'Drawing must be left aligned' } })
        };
      }
      retryBatchBody = parsed;
      return { ok: true, status: 200, json: async () => ({}) };
    }
    if (url.endsWith('/form-retry')) {
      return { ok: true, status: 200, json: async () => ({ formId: 'form-retry', responderUri: 'https://docs.google.com/forms/d/e/form-retry/viewform' }) };
    }
    throw new Error('Unexpected fetch URL: ' + url);
  };

  const res2 = await formsApi.createFromQuiz(sampleQuiz);
  assert.strictEqual(batchAttempts, 2, 'Should retry batchUpdate once after stripping properties on alignment error');
  assert.strictEqual(res2.formId, 'form-retry', 'Retry should succeed and return formId');
  retryBatchBody.requests.forEach((req) => {
    const item = req.createItem && req.createItem.item;
    if (!item || !item.questionItem) return;
    if (item.questionItem.image) {
      assert.strictEqual(item.questionItem.image.properties, undefined, 'Fallback should omit image.properties on stem');
    }
    const opts = item.questionItem.question && item.questionItem.question.choiceQuestion && item.questionItem.question.choiceQuestion.options;
    if (opts) {
      opts.forEach((opt) => {
        if (opt.image) {
          assert.strictEqual(opt.image.properties, undefined, 'Fallback should omit image.properties on choice option');
        }
      });
    }
  });
  sandbox.window.ClipSATMathImage.renderQuestionImage = origRender;
  console.log('  ✓ batchUpdate self-heals automatically if Forms API ever rejects image alignment properties');
  console.log('✅ All Google Forms figure export tests passed successfully!');
})().catch((err) => {
  console.error('❌ Google Forms test failed:', err);
  process.exit(1);
});
