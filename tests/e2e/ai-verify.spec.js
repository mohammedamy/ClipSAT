/**
 * AI-generated tests are reviewed before they are shown (05b-ai-question-verifier.js),
 * and only questions the review confirms are shown.
 *
 * The AI provider is stubbed: window._openrouterChatMessages returns a fixed
 * generation reply, then a fixed review reply, so every gate is exercised
 * without a network call:
 *   q0  correct, consistent, review agrees            -> shown
 *   q1  marked option != the worked answerValue        -> removed (key consistency)
 *   q2  two identical options                          -> removed (structure)
 *   q3  key and answerValue agree but are wrong        -> removed (review got a different answer)
 *   q4  numeric FRQ, review agrees                     -> shown
 *   q5  MCQ without choiceValues, review agrees        -> shown
 *   q6  review marks it outside the syllabus           -> removed
 *   q7  FRQ with no checkable final answer             -> removed
 *   q8  review returns no verdict for it               -> removed
 */
const { test, expect } = require('@playwright/test');

const GENERATED = { questions: [
  { type: 'mcq', domain: 'Arithmetic', text: 'What is \\(2+3\\)?', choices: ['4', '5', '6', '7'], answer: 1, sol: '2+3=5', answerValue: '5', choiceValues: ['4', '5', '6', '7'] },
  { type: 'mcq', domain: 'Arithmetic', text: 'What is \\(3\\times 3\\)?', choices: ['6', '9', '12', '3'], answer: 0, sol: '3*3=9', answerValue: '9', choiceValues: ['6', '9', '12', '3'] },
  { type: 'mcq', domain: 'Arithmetic', text: 'What is \\(5+5\\)?', choices: ['10', '10', '11', '12'], answer: 0, sol: '10', answerValue: '10', choiceValues: ['10', '10', '11', '12'] },
  { type: 'mcq', domain: 'Arithmetic', text: 'What is \\(7-2\\)?', choices: ['5', '4', '3', '2'], answer: 1, sol: '7-2=4', answerValue: '4', choiceValues: ['5', '4', '3', '2'] },
  { type: 'frq', domain: 'Arithmetic', text: 'Compute \\(3\\cdot 4\\).', sol: '12', numericAnswer: 12 },
  { type: 'mcq', domain: 'Words', text: 'Which word names a triangle with three equal sides?', choices: ['Scalene', 'Equilateral', 'Right', 'Obtuse'], answer: 1, sol: 'Equilateral' },
  { type: 'mcq', domain: 'Analysis', text: 'The Kadec quarter theorem concerns?', choices: ['Riesz bases', 'Limits', 'Areas', 'Slopes'], answer: 0, sol: 'Riesz bases', answerValue: null },
  { type: 'frq', domain: 'Proof', text: 'Prove that the square root of 2 is irrational.', sol: 'By contradiction...' },
  { type: 'mcq', domain: 'Arithmetic', text: 'What is \\(9-1\\)?', choices: ['8', '7', '6', '5'], answer: 0, sol: '8', answerValue: '8', choiceValues: ['8', '7', '6', '5'] },
] };
const ok = { in_syllabus: true, level_ok: true, well_posed: true, issue: '' };
const REVIEWED = { answers: [
  { i: 0, choice: 1, ...ok }, { i: 3, choice: 0, ...ok }, { i: 4, value: 12, ...ok }, { i: 5, choice: 1, ...ok },
  { i: 6, choice: 0, in_syllabus: false, level_ok: false, well_posed: true, issue: 'graduate functional analysis' },
  { i: 7, value: null, ...ok },
] };

async function stubAI(page, enabled = true) {
  await page.evaluate(({ gen, reviewed, enabled }) => {
    window.__aiCalls = [];
    window._openrouterEnabled = () => enabled;
    window._openrouterChatMessages = (msgs) => {
      const system = msgs[0].content;
      window.__aiCalls.push({ system, user: msgs[1].content });
      return Promise.resolve(JSON.stringify(/examiner/.test(system) && /answer key/.test(system) ? reviewed : gen));
    };
  }, { gen: GENERATED, reviewed: REVIEWED, enabled });
}

// The test-generator section is a hidden chapter until navigated to, so drive its
// controls directly rather than by clicking.
async function runGenTest(page, source) {
  await page.evaluate((source) => {
    const box = document.querySelector('.tg-source').closest('.testgen');
    if (source) box.querySelector('.tg-source').value = source;
    box.querySelector('.tg-count').value = '5';
    window.genTest(box.querySelector('button[onclick^="genTest"]'));
  }, source);
}

test.describe('AI-generated tests are reviewed before they are shown', () => {
  test('only questions the review confirms are shown, with a summary of what was removed', async ({ page }) => {
    await page.goto('/calculus/');
    await stubAI(page);
    await expect(page.locator('.tg-source').first()).toHaveValue('ai'); // AI is the default when available
    await runGenTest(page);
    const out = page.locator('.testgen .tg-out').first();
    await expect(out.locator('.aiq')).toHaveCount(3, { timeout: 15000 });

    const texts = (await out.locator('.aiq .aiq-text').allTextContents()).join(' ');
    expect(texts).toContain('2+3');
    expect(texts).toContain('3\\cdot 4');
    expect(texts).toContain('three equal sides');
    for (const gone of ['3\\times 3', '5+5', '7-2', 'Kadec', 'irrational', '9-1']) expect(texts).not.toContain(gone);
    await expect(out.locator('.aiq-badge-ok')).toHaveCount(3);
    const summary = out.locator('.aiq-verify-summary');
    await expect(summary).toContainText('6 generated questions were removed');
    await expect(summary).toContainText('outside the syllabus');
    await expect(summary).toContainText('the review got a different answer');

    // The review sees the syllabus and level, but never the key or the worked solution.
    const calls = await page.evaluate(() => window.__aiCalls);
    expect(calls).toHaveLength(2);
    expect(calls[1].system).toContain('AP Calculus');
    const reviewUser = calls[1].user;
    for (const leak of ['"answer"', '"sol"', 'answerValue', 'numericAnswer']) expect(reviewUser).not.toContain(leak);
    // Structurally broken q2 and key-mismatched q1 are removed before review.
    expect(reviewUser).not.toContain('5+5');
    expect(reviewUser).not.toContain('3\\\\times 3');
  });

  test('the question bank is used when chosen, or when AI is not available', async ({ page }) => {
    await page.goto('/calculus/');
    await stubAI(page, true);
    await runGenTest(page, 'bank');
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.__aiCalls.length)).toBe(0);
    await expect(page.locator('.tg-out .aiq')).toHaveCount(0);
    // Regression: tracks without a full-exam block (calculus is one) had no .tg-out, so this
    // button threw and rendered nothing. It now renders the bank test.
    expect(await page.locator('.testgen .tg-out .problem').count()).toBeGreaterThan(0);

    await stubAI(page, false);
    await runGenTest(page, 'ai');
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.__aiCalls.length)).toBe(0);
  });

  test('the screenshot failures from a full ACT paper are removed or repaired', async ({ page }) => {
    // The three questions reported from a generated ACT paper, reproduced as the model sent them.
    await page.goto('/act/');
    const res = await page.evaluate(async () => {
      const tri = (pts, sides, extra) => ({ type: 'geometry_2d', shapes: [{ shape: 'triangle', pts, labels: ['A', 'B', 'C'], sides, ...extra }] });
      const qs = [
        // Q7: hypotenuse labelled 4 against a leg of 8.
        { type: 'mcq', domain: 'Geometry', text: 'What is the area of the triangle shown?', figure: tri([[0, 0], [8, 0], [0, 4]], ['8', '4', ''], { right_angle: 0 }),
          choices: ['A. 12 square units', 'B. 18 square units', 'C. 24 square units', 'D. 36 square units', 'E. 48 square units'], answer: 0, sol: '', answerValue: '12' },
        // Q24: text says legs 6 and 8, figure labels a leg 10 and the hypotenuse 6.
        { type: 'mcq', domain: 'Geometry', text: 'A right triangle has legs of lengths 6 and 8. What is the length of its hypotenuse?', figure: tri([[0, 0], [8, 0], [0, 6]], ['8', '6', '10'], { right_angle: 0 }),
          choices: ['A. 9', 'B. 10', 'C. 12', 'D. 14', 'E. 16'], answer: 1, sol: '', answerValue: '10', choiceValues: ['9', '10', '12', '14', '16'] },
        // Q14: a linear pair drawn as a triangle (only the reviewer can judge the diagram type).
        { type: 'mcq', domain: 'Geometry', text: 'In the figure, angle A and angle B form a linear pair. If m∠A = 127°, what is m∠B?', figure: tri([[0, 0], [8, 0], [4, 6]], ['', '', ''], { angle_marks: [0, 1] }),
          choices: ['A. 37°', 'B. 53°', 'C. 63.5°', 'D. 127°', 'E. 233°'], answer: 1, sol: '180-127=53', answerValue: '53', choiceValues: ['37', '53', '63.5', '127', '233'] },
        // Control: a correctly drawn and labelled 3-4-5 right triangle.
        { type: 'mcq', domain: 'Geometry', text: 'Find the hypotenuse of the right triangle shown.', figure: tri([[0, 0], [4, 0], [0, 3]], ['4', '', '3'], { right_angle: 0 }),
          choices: ['A. 5', 'B. 6', 'C. 7', 'D. 12'], answer: 0, sol: '5', answerValue: '5', choiceValues: ['5', '6', '7', '12'] },
      ];
      const ok = { in_syllabus: true, level_ok: true, well_posed: true, figure_ok: true };
      const call = () => Promise.resolve(JSON.stringify({ answers: [
        { i: 2, choice: 1, ...ok, figure_ok: false, issue: 'a linear pair is two adjacent angles on a line, not a triangle' },
        { i: 3, choice: 0, ...ok },
      ] }));
      const r = await window.ClipSATVerifyAI.verify(qs, { call, syllabus: 'ACT Math', level: 'all' });
      return { kept: r.kept.map((q) => ({ text: q.text, choices: q.choices })), dropped: r.dropped.map((d) => d.reason) };
    });
    expect(res.kept).toHaveLength(1);
    expect(res.kept[0].text).toContain('hypotenuse of the right triangle shown');
    expect(res.kept[0].choices).toEqual(['5', '6', '7', '12']); // "A. " prefixes stripped
    expect(res.dropped).toEqual(expect.arrayContaining([
      "the figure's side labels do not match the shape drawn",
      'the figure does not match the question',
    ]));
    expect(res.dropped).toHaveLength(3);
  });

  test('AI full exam papers are reviewed the same way', async ({ page }) => {
    await page.goto('/precalc/');
    await stubAI(page);
    await page.evaluate(() => {
      document.querySelector('.tg-source').closest('.testgen').querySelector('button[onclick^="genFullExam"]').click();
    });
    const paper = page.locator('.full-exam-paper');
    await expect(paper.locator('.fep-item')).toHaveCount(3, { timeout: 15000 });
    await expect(paper.locator('.aiq-verify-summary')).toContainText('6 generated questions were removed');
    await expect(paper.locator('.aiq-badge-ok')).toHaveCount(3);
  });
});
