/**
 * AI-generated tests are checked before they are shown (05b-ai-question-verifier.js).
 *
 * The AI provider is stubbed: window._openrouterChatMessages returns a fixed
 * generation reply, then a fixed "independent re-solve" reply, so every gate
 * is exercised without a network call:
 *   q0  correct, consistent, re-solve agrees        -> kept, "✓ Checked"
 *   q1  marked option != the worked answerValue      -> dropped (gate 2)
 *   q2  two identical options                        -> dropped (gate 1)
 *   q3  key and answerValue agree but are wrong      -> dropped (gate 3, re-solve disagrees)
 *   q4  numeric FRQ, re-solve agrees                 -> kept, "✓ Checked"
 *   q5  MCQ without choiceValues, re-solve agrees    -> kept, "⚠ Unchecked"
 * Also: the default source is the question bank, so no AI call happens unless
 * the visitor picks the AI source.
 */
const { test, expect } = require('@playwright/test');

const GENERATED = { questions: [
  { type: 'mcq', domain: 'Arithmetic', text: 'What is \\(2+3\\)?', choices: ['4', '5', '6', '7'], answer: 1, sol: '2+3=5', answerValue: '5', choiceValues: ['4', '5', '6', '7'] },
  { type: 'mcq', domain: 'Arithmetic', text: 'What is \\(3\\times 3\\)?', choices: ['6', '9', '12', '3'], answer: 0, sol: '3*3=9', answerValue: '9', choiceValues: ['6', '9', '12', '3'] },
  { type: 'mcq', domain: 'Arithmetic', text: 'What is \\(5+5\\)?', choices: ['10', '10', '11', '12'], answer: 0, sol: '10', answerValue: '10', choiceValues: ['10', '10', '11', '12'] },
  { type: 'mcq', domain: 'Arithmetic', text: 'What is \\(7-2\\)?', choices: ['5', '4', '3', '2'], answer: 1, sol: '7-2=4', answerValue: '4', choiceValues: ['5', '4', '3', '2'] },
  { type: 'frq', domain: 'Arithmetic', text: 'Compute \\(3\\cdot 4\\).', sol: '12', numericAnswer: 12 },
  { type: 'mcq', domain: 'Words', text: 'Which word names a triangle with three equal sides?', choices: ['Scalene', 'Equilateral', 'Right', 'Obtuse'], answer: 1, sol: 'Equilateral' },
] };
const SOLVED = { answers: [{ i: 0, choice: 1 }, { i: 3, choice: 0 }, { i: 4, value: 12 }, { i: 5, choice: 1 }] };

async function stubAI(page) {
  await page.evaluate(({ gen, solved }) => {
    window.__aiCalls = [];
    window._openrouterEnabled = () => true;
    window._openrouterChatMessages = (msgs) => {
      const system = msgs[0].content;
      window.__aiCalls.push({ system, user: msgs[1].content });
      return Promise.resolve(JSON.stringify(/answer key/.test(system) && /examiner/.test(system) ? solved : gen));
    };
  }, { gen: GENERATED, solved: SOLVED });
}

test.describe('AI-generated tests are verified before they are shown', () => {
  test('only questions that pass every check are shown, with badges and a summary', async ({ page }) => {
    await page.goto('/calculus/');
    await stubAI(page);
    // The test-generator section is a hidden chapter until navigated to, so drive
    // its controls directly rather than by clicking.
    await page.evaluate(() => {
      const box = document.querySelector('.tg-source').closest('.testgen');
      box.id = box.id || 'tg-under-test';
      box.querySelector('.tg-source').value = 'ai';
      box.querySelector('.tg-count').value = '5';
      window.genTest(box.querySelector('button[onclick^="genTest"]'));
    });
    const out = page.locator('.tg-source').first().locator('xpath=ancestor::*[contains(concat(" ",normalize-space(@class)," ")," testgen ")][1]').locator('.tg-out').first();
    await expect(out.locator('.aiq')).toHaveCount(3, { timeout: 15000 });

    const texts = await out.locator('.aiq .aiq-text').allTextContents();
    expect(texts.join(' ')).toContain('2+3');
    expect(texts.join(' ')).not.toContain('3\\times 3');
    expect(texts.join(' ')).not.toContain('7-2');
    await expect(out.locator('.aiq-badge-ok')).toHaveCount(2);
    await expect(out.locator('.aiq-badge-unchecked')).toHaveCount(1);
    await expect(out.locator('.aiq-verify-summary')).toContainText('3 generated questions were removed');

    // The re-solve call never sees the key or the worked solution.
    const calls = await page.evaluate(() => window.__aiCalls);
    expect(calls).toHaveLength(2);
    const solverUser = calls[1].user;
    expect(solverUser).not.toContain('"answer"');
    expect(solverUser).not.toContain('"sol"');
    expect(solverUser).not.toContain('answerValue');
    // Structurally broken q2 and key-mismatched q1 are not even sent to the re-solve.
    expect(solverUser).not.toContain('5+5');
    expect(solverUser).not.toContain('3\\\\times 3');
  });

  test('the question bank is the default source: no AI call without opting in', async ({ page }) => {
    await page.goto('/calculus/');
    await stubAI(page);
    const sel = page.locator('.testgen .tg-source').first();
    await expect(sel).toHaveValue('bank');
    await page.evaluate(() => {
      const box = document.querySelector('.tg-source').closest('.testgen');
      window.genTest(box.querySelector('button[onclick^="genTest"]'));
    });
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.__aiCalls.length)).toBe(0);
    await expect(page.locator('.tg-out .aiq')).toHaveCount(0);
    // Regression: tracks without a full-exam block (calculus is one) had no .tg-out, so this
    // button threw and rendered nothing. It now renders the bank test.
    expect(await page.locator('.testgen .tg-out .problem').count()).toBeGreaterThan(0);
  });

  test('AI full exam papers are verified the same way', async ({ page }) => {
    await page.goto('/precalc/');
    await stubAI(page);
    await page.evaluate(() => {
      const box = document.querySelector('.tg-source').closest('.testgen');
      box.querySelector('.tg-source').value = 'ai';
      box.querySelector('button[onclick^="genFullExam"]').click();
    });
    const paper = page.locator('.full-exam-paper');
    await expect(paper.locator('.fep-item')).toHaveCount(3, { timeout: 15000 });
    await expect(paper.locator('.aiq-verify-summary')).toContainText('3 generated questions were removed');
    await expect(paper.locator('.aiq-badge-ok')).toHaveCount(2);
  });
});
