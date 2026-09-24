/**
 * AI-generated tests and papers follow the real exam's blueprint and are reviewed
 * before they are shown (05b-ai-question-verifier.js, 05c-exam-blueprints.js,
 * 05d-blueprint-assembler.js).
 *
 * The AI provider is stubbed. The generation stub reads the slots it is asked for
 * and answers per slot; the review stub reads the questions it is sent and answers
 * per question — so the whole pipeline runs without a network call.
 */
const { test, expect } = require('@playwright/test');

const OK = { in_syllabus: true, level_ok: true, well_posed: true, figure_ok: true, topic_ok: true, difficulty_ok: true, issue: '' };

/* Installs a slot-aware provider stub. `badOnFirstTry(slot)` makes that slot's first
   question fail key consistency; `alwaysBad(slot)` makes every attempt fail. */
async function stubPipeline(page, { enabled = true, badOnFirstTry = 'false', alwaysBad = 'false', offTopic = 'false' } = {}) {
  await page.evaluate(({ enabled, badOnFirstTry, alwaysBad, offTopic, OK }) => {
    const bad1 = new Function('s', 'return ' + badOnFirstTry);
    const badAll = new Function('s', 'return ' + alwaysBad);
    const offT = new Function('s', 'return ' + offTopic);
    const tries = {};
    window.__aiCalls = [];
    window._openrouterEnabled = () => enabled;
    window._openrouterChatMessages = (msgs) => {
      const system = msgs[0].content, user = msgs[1].content;
      window.__aiCalls.push({ system, user });
      if (/examiner/.test(system) && /answer key/.test(system)) {
        const qs = JSON.parse(user.slice(user.indexOf('[')));
        return Promise.resolve(JSON.stringify({ answers: qs.map((q) => {
          const slot = Number((/Slot (\d+)/.exec(q.question) || [])[1]);
          return { i: q.i, choice: 0, value: slot + 2, ...OK, topic_ok: !offT(slot) || (tries[slot] || 0) > 1 };
        }) }));
      }
      const slots = JSON.parse(user.slice(user.indexOf('Slots:') + 6));
      return Promise.resolve(JSON.stringify({ questions: slots.map((s) => {
        tries[s.slot] = (tries[s.slot] || 0) + 1;
        const broken = badAll(s.slot) || (bad1(s.slot) && tries[s.slot] === 1);
        const v = s.slot + 2;
        if (s.type === 'frq') return { slot: s.slot, type: 'frq', text: `Slot ${s.slot} (${s.difficulty}): work out \\(${s.slot}+2\\).`,
          sol: `${s.slot}+2=${v}`, numericAnswer: broken ? v + 1 : v };
        return { slot: s.slot, type: 'mcq', text: `Slot ${s.slot} (${s.difficulty}): what is \\(${s.slot}+2\\)?`,
          choices: [String(v), String(v + 1), String(v + 2), String(v + 3)], answer: 0, sol: `${s.slot}+2=${v}`,
          answerValue: String(broken ? v + 1 : v), choiceValues: [String(v), String(v + 1), String(v + 2), String(v + 3)] };
      }) }));
    };
  }, { enabled, badOnFirstTry, alwaysBad, offTopic, OK });
}

test.describe('AI tests follow the exam blueprint and are reviewed before they are shown', () => {
  test('a full enhanced-ACT paper matches the blueprint exactly: topics, difficulty, retries and bank fill', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/act/');
    await page.evaluate(() => window.CS_bankReady);
    // slot % 7 == 3 fails once (retried by AI); slot % 11 == 0 always fails (filled from the bank).
    await stubPipeline(page, { badOnFirstTry: 's % 7 === 3', alwaysBad: 's % 11 === 0' });
    await page.evaluate(() => {
      document.querySelector('.tg-source').closest('.testgen').querySelector('button[onclick^="genFullExam"]').click();
    });
    const paper = page.locator('.full-exam-paper');
    await expect(paper.locator('.fep-item')).toHaveCount(45, { timeout: 45000 });

    // Topic counts follow the enhanced ACT's weights: 11 / 18.5 / 18.5 / 18.5 / 13.5 / 20 % of 45.
    const rows = await paper.locator('.bp-table tbody tr').evaluateAll((trs) => trs.map((tr) => [...tr.children].map((td) => td.textContent)));
    expect(rows.map((r) => r[0])).toEqual(['Number & Quantity', 'Algebra', 'Functions', 'Geometry', 'Statistics & Probability', 'Integrating Essential Skills']);
    expect(rows.map((r) => r[2]).map(Number).reduce((a, b) => a + b, 0)).toBe(45);
    expect(rows.map((r) => Number(r[2]))).toEqual([5, expect.any(Number), expect.any(Number), expect.any(Number), 6, 9]);
    expect(rows.slice(1, 4).map((r) => Number(r[2])).sort()).toEqual([8, 8, 9]);
    await expect(paper.locator('.bp-note')).toContainText('16 easy · 18 medium · 11 hard (ordered easy → hard');
    // Slots 0, 11, 22, 33, 44 never pass review, so they come from the bank (4-option items only).
    await expect(paper.locator('.aiq-badge-bank')).toHaveCount(5);
    await expect(paper.locator('.aiq-badge-ok')).toHaveCount(40);
    await expect(paper.locator('.bp-note')).toContainText('5 slots were filled from the checked question bank');
    // Four options on every item (A–D), including bank fills.
    const optionCounts = await paper.locator('.fep-item').evaluateAll((items) => items.map((it) => it.querySelectorAll('.fep-choice').length));
    expect(optionCounts).toEqual(Array(45).fill(4));
    expect(await paper.locator('.fep-cletter', { hasText: 'E' }).count()).toBe(0);

    // ACT runs easy → hard: the slot difficulties rendered in paper order never go down.
    const diffs = await paper.locator('.fep-item .fep-qbody').allTextContents();
    const order = diffs.filter((t) => /Slot \d+ \((easy|medium|hard)\)/.test(t)).map((t) => ({ easy: 0, medium: 1, hard: 2 })[/\((easy|medium|hard)\)/.exec(t)[1]]);
    expect(order.length).toBe(40);
    expect(order).toEqual([...order].sort((a, b) => a - b));

    // Rejected slots were regenerated once: the second round asks only for them.
    const genCalls = (await page.evaluate(() => window.__aiCalls)).filter((c) => /Slots:/.test(c.user));
    const secondRound = genCalls.filter((c) => /"slot":3,/.test(c.user) || /"slot":10,/.test(c.user));
    expect(secondRound.length).toBeGreaterThanOrEqual(2);
  });

  test('a full IGCSE 0580 paper follows the current syllabus: two papers, topic shares and AO balance', async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/igcse/');
    await page.evaluate(() => window.CS_bankReady);
    await stubPipeline(page);
    await page.evaluate(() => {
      document.querySelector('.tg-source').closest('.testgen').querySelector('button[onclick^="genFullExam"]').click();
    });
    const paper = page.locator('.full-exam-paper');
    await expect(paper.locator('.fep-item')).toHaveCount(40, { timeout: 45000 });
    await expect(paper).toContainText('Paper 2 — Non-calculator (Extended)');
    await expect(paper).toContainText('Paper 4 — Calculator (Extended)');

    // Topics weighted by their share of the Extended learning outcomes (31/22/7/13/5/6/8/5/9 of 106).
    const rows = await paper.locator('.bp-table tbody tr').evaluateAll((trs) => trs.map((tr) => [...tr.children].map((td) => td.textContent)));
    expect(rows.map((r) => r[0])).toEqual(['Number', 'Algebra and graphs', 'Coordinate geometry', 'Geometry', 'Mensuration',
      'Trigonometry', 'Transformations and vectors', 'Probability', 'Statistics']);
    expect(rows.map((r) => r[2])).toEqual(['12', '8', '3', '5', '2', '2', '3', '2', '3']);
    // AO1 45 % / AO2 55 % on each 20-question paper.
    await expect(paper.locator('.bp-note')).toContainText('AO1 18 (target 45%) · AO2 22 (target 55%)');

    // Paper 2 slots are non-calculator, Paper 4 slots allow one; matrices are excluded in every prompt.
    const genCalls = (await page.evaluate(() => window.__aiCalls)).filter((c) => /Slots:/.test(c.user));
    const slots = genCalls.flatMap((c) => JSON.parse(c.user.slice(c.user.indexOf('Slots:') + 6)));
    expect(slots).toHaveLength(40);
    expect(slots.every((s) => s.type === 'frq' && /^AO[12] — /.test(s.assessment_objective))).toBe(true);
    expect(slots.filter((s) => s.calculator === 'NOT allowed')).toHaveLength(20);
    expect(genCalls.every((c) => /Matrices and linear programming are not in the current syllabus/.test(c.system + c.user))).toBe(true);
  });

  test('paper structures follow the current exam specifications', async ({ page }) => {
    const want = {
      act: { parts: ['45mcq'], letters: 4 },                              // enhanced ACT
      apab: { parts: ['29mcq', '13mcq', '2frq', '4frq'], letters: 4 },    // May 2027 AP Calculus
      apbc: { parts: ['29mcq', '13mcq', '2frq', '4frq'], letters: 4 },
      appc: { parts: ['29mcq', '13mcq', '2frq', '2frq'], letters: 4 },    // May 2027 AP Precalculus
      apstats: { parts: ['42mcq', '4frq'], letters: 4 },                  // revised AP Statistics
      sat: { parts: ['17mcq', '5frq', '17mcq', '5frq'], letters: 4 },     // Digital SAT with SPR
      ibsl: { parts: ['9frq', '9frq'] },                                  // IB papers are written
      ibhl: { parts: ['10frq', '10frq', '2frq'] },
      igcse: { parts: ['20frq', '20frq'] },
      aslevel: { parts: ['11frq'] },
      act2: { parts: ['50mcq'], letters: 4 },
      est2: { parts: ['50mcq'] },
    };
    await page.goto('/act/');
    const got = await page.evaluate((ids) => Object.fromEntries(ids.map((v) => {
      const spec = window.examSpecs[v];
      const parts = spec.sections.flatMap((s) => s.parts);
      const bp = window.ClipSATBlueprints.get(v);
      const slots = window.ClipSATAssembler.plan(bp, parts, 'all');
      return [v, { parts: parts.map((p) => p.q + p.type), letters: (spec.letters || ['A', 'B', 'C', 'D']).length,
        slots: slots.length, total: parts.reduce((a, p) => a + p.q, 0), topics: bp.topics.map((t) => t.name) }];
    })), Object.keys(want));
    for (const [v, w] of Object.entries(want)) {
      expect(got[v].parts, v).toEqual(w.parts);
      if (w.letters) expect(got[v].letters, v).toBe(w.letters);
      expect(got[v].slots, v).toBe(got[v].total);
    }
    expect(got.apstats.topics).toHaveLength(5);
    // EST II uses the EST Description Document's areas, not its own bank domains.
    expect(got.est2.topics).toEqual(['Numerations and Operations', 'Algebra and Functions', 'Coordinates System',
      'Plane and Solid Shapes', 'Trigonometry', 'Data Analysis, Statistics and Probability']);
    expect(got.aslevel.topics).not.toContain('Kinematics');
    expect(got.aslevel.topics.every((t) => !/mechanic|forces|normal distribution/i.test(t))).toBe(true);
  });

  test('Level 2 subject tests and Tahsili have their own blueprints and exam prompts', async ({ page }) => {
    await page.goto('/act/');
    const got = await page.evaluate(() => ['est2l2', 'act2l2', 'tahsili'].map((v) => {
      const bp = window.ClipSATBlueprints.get(v);
      const slots = window.ClipSATAssembler.plan(bp, [{ q: 50, type: 'mcq' }], 'all');
      return { v, topics: bp.topics.map((t) => t.name), counts: bp.topics.map((t, i) => slots.filter((s) => s.topic === i).length) };
    }));
    const by = Object.fromEntries(got.map((g) => [g.v, g]));
    expect(by.est2l2.counts).toEqual([6, 24, 5, 5, 5, 5]);   // 12 / 48 / 10 × 4 % of 50
    expect(by.act2l2.counts).toEqual([25, 25]);
    expect(by.tahsili.counts).toEqual([24, 14, 4, 3, 5]);   // lessons per part of the syllabus book
  });

  test('EST I papers use the observed topic mix of each section', async ({ page }) => {
    await page.goto('/act/');
    const r = await page.evaluate(() => {
      const bp = window.ClipSATBlueprints.get('est');
      const parts = window.examSpecs.est.sections.flatMap((s) => s.parts);
      const slots = window.ClipSATAssembler.plan(bp, parts, 'all');
      const count = (calc) => bp.topics.map((t, i) => slots.filter((s) => s.calc === calc && s.topic === i).length);
      return { parts: parts.map((p) => p.q + (p.calc ? 'calc' : 'nocalc')), nocalc: count(false), calc: count(true), provisional: !!bp.provisional };
    });
    expect(r.parts).toEqual(['20nocalc', '38calc']);
    expect(r.provisional).toBe(false);
    // Topic counts of the Jan/Oct/Dec 2024 papers, scaled to one paper.
    expect(r.nocalc.reduce((a, b) => a + b, 0)).toBe(20);
    expect(r.calc.reduce((a, b) => a + b, 0)).toBe(38);
    expect(r.nocalc[0]).toBeGreaterThanOrEqual(6);   // no-calculator: mostly linear algebra
    expect(r.nocalc[4]).toBeLessThanOrEqual(1);      // ratios, rates & data sit in the calculator section…
    expect(r.calc[4]).toBeGreaterThanOrEqual(8);
  });

  test('Cambridge 9709 papers weight topics by learning outcomes and follow the AO balance', async ({ page }) => {
    await page.goto('/act/');
    const r = await page.evaluate(() => ['aslevel', 'a2level'].map((v) => {
      const bp = window.ClipSATBlueprints.get(v);
      const parts = window.examSpecs[v].sections.flatMap((s) => s.parts);
      const slots = window.ClipSATAssembler.plan(bp, parts, 'all');
      return { v, provisional: !!bp.provisional, weights: bp.topics.map((t) => t.weight), n: slots.length,
        ao1: slots.filter((s) => s.ao === 'AO1').length, ao2: slots.filter((s) => s.ao === 'AO2').length };
    }));
    // Syllabus 2026–2027 learning outcomes: Paper 1 34, Paper 3 41; AO1/AO2 55/45 on Paper 1, 45/55 on Paper 3.
    expect(r[0]).toEqual({ v: 'aslevel', provisional: false, weights: [5, 5, 5, 2, 5, 4, 4, 4], n: 11, ao1: 6, ao2: 5 });
    expect(r[1].weights).toEqual([5, 4, 2, 3, 6, 3, 6, 4, 8]);
    expect(r[1].provisional).toBe(false);
    expect(r[1].ao1 + r[1].ao2).toBe(10);
    expect(r[1].ao2).toBeGreaterThanOrEqual(r[1].ao1);
  });

  test('a practice test at one level uses only that difficulty and replaces off-topic questions', async ({ page }) => {
    await page.goto('/sat/');
    await page.evaluate(() => window.CS_bankReady);
    await stubPipeline(page, { offTopic: 's === 2' });
    await page.evaluate(() => {
      const box = document.querySelector('.tg-source').closest('.testgen');
      box.querySelector('.tg-count').value = '10';
      const lvl = box.querySelector('.tg-level');
      lvl.value = [...lvl.options].find((o) => /hard|advanced/i.test(o.value)).value;
      window.genTest(box.querySelector('button[onclick^="genTest"]'));
    });
    const out = page.locator('.testgen .tg-out').first();
    await expect(out.locator('.aiq')).toHaveCount(10, { timeout: 30000 });
    await expect(out.locator('.bp-note')).toContainText('0 easy · 0 medium · 10 hard');
    // SAT weights 35/35/15/15 over 10 questions.
    const counts = await out.locator('.bp-table tbody tr td:nth-child(3)').allTextContents();
    expect(counts.map(Number).reduce((a, b) => a + b, 0)).toBe(10);
    // 3.5 / 3.5 / 1.5 / 1.5 rounds to 3–4 algebra, 3–4 advanced math, 1–2 each for the smaller domains.
    expect(counts.map(Number).slice(0, 2).every((c) => c >= 3 && c <= 4)).toBe(true);
    expect(counts.map(Number).slice(2).every((c) => c >= 1 && c <= 2)).toBe(true);
    await expect(out.locator('.bp-note')).toContainText('1 generated question was rejected in review');
  });

  test('the review rules remove wrong, off-syllabus, badly-drawn and unconfirmable questions', async ({ page }) => {
    await page.goto('/act/');
    const res = await page.evaluate(async (OK) => {
      const tri = (pts, sides, extra) => ({ type: 'geometry_2d', shapes: [{ shape: 'triangle', pts, labels: ['A', 'B', 'C'], sides, ...extra }] });
      const qs = [
        { type: 'mcq', text: 'What is 2+3?', choices: ['4', '5', '6', '7'], answer: 1, sol: '5', answerValue: '5', choiceValues: ['4', '5', '6', '7'] },
        { type: 'mcq', text: 'What is 3*3?', choices: ['6', '9', '12', '3'], answer: 0, sol: '9', answerValue: '9', choiceValues: ['6', '9', '12', '3'] },
        { type: 'mcq', text: 'What is 5+5?', choices: ['10', '10', '11', '12'], answer: 0, sol: '10' },
        { type: 'mcq', text: 'What is 7-2?', choices: ['5', '4', '3', '2'], answer: 1, sol: '4', answerValue: '4', choiceValues: ['5', '4', '3', '2'] },
        { type: 'frq', text: 'Compute 3*4.', sol: '12', numericAnswer: 12 },
        { type: 'mcq', text: 'The Kadec quarter theorem concerns?', choices: ['Riesz bases', 'Limits', 'Areas', 'Slopes'], answer: 0, sol: '' },
        { type: 'frq', text: 'Prove that the square root of 2 is irrational.', sol: '...' },
        { type: 'mcq', text: 'What is 9-1?', choices: ['8', '7', '6', '5'], answer: 0, sol: '8' },
        // Screenshot Q7: hypotenuse labelled 4 against a leg of 8; letters written into options.
        { type: 'mcq', text: 'What is the area of the triangle shown?', figure: tri([[0, 0], [8, 0], [0, 4]], ['8', '4', ''], { right_angle: 0 }),
          choices: ['A. 12 square units', 'B. 18 square units', 'C. 24 square units', 'D. 36 square units'], answer: 0, sol: '' },
        // Screenshot Q24: text says legs 6 and 8; figure labels a leg 10 and the hypotenuse 6.
        { type: 'mcq', text: 'A right triangle has legs 6 and 8. Find the hypotenuse.', figure: tri([[0, 0], [8, 0], [0, 6]], ['8', '6', '10'], { right_angle: 0 }),
          choices: ['9', '10', '12', '14'], answer: 1, sol: '' },
        // Screenshot Q14: a linear pair drawn as a triangle (only the reviewer can judge the diagram type).
        { type: 'mcq', text: 'Angles A and B form a linear pair and m∠A = 127°. Find m∠B.', figure: tri([[0, 0], [8, 0], [4, 6]], ['', '', '']),
          choices: ['37°', '53°', '63.5°', '127°'], answer: 1, sol: '' },
        // Control: correctly drawn 3-4-5 right triangle, with "A." prefixes to strip.
        { type: 'mcq', text: 'Find the hypotenuse of the right triangle shown.', figure: tri([[0, 0], [4, 0], [0, 3]], ['4', '', '3'], { right_angle: 0 }),
          choices: ['A. 5', 'B. 6', 'C. 7', 'D. 12'], answer: 0, sol: '5', answerValue: '5', choiceValues: ['5', '6', '7', '12'] },
      ];
      const call = () => Promise.resolve(JSON.stringify({ answers: [
        { i: 0, choice: 1, ...OK }, { i: 3, choice: 0, ...OK }, { i: 4, value: 12, ...OK },
        { i: 5, choice: 0, ...OK, in_syllabus: false }, { i: 6, value: null, ...OK },
        { i: 10, choice: 1, ...OK, figure_ok: false }, { i: 11, choice: 0, ...OK },
      ] }));
      const r = await window.ClipSATVerifyAI.verify(qs, { call, syllabus: 'ACT Math', level: 'all' });
      return { kept: r.kept.map((q) => ({ text: q.text, choices: q.choices })), dropped: r.dropped.map((d) => d.reason) };
    }, OK);
    expect(res.kept.map((q) => q.text)).toEqual(['What is 2+3?', 'Compute 3*4.', 'Find the hypotenuse of the right triangle shown.']);
    expect(res.kept[2].choices).toEqual(['5', '6', '7', '12']);
    expect(res.dropped).toEqual(expect.arrayContaining([
      'the marked option does not match the worked answer',
      'two identical options',
      'the review got a different answer',
      'outside the syllabus',
      'the review could not confirm it',
      'no checkable final answer',
      "the figure's side labels do not match the shape drawn",
      'the figure does not match the question',
    ]));
    expect(res.dropped).toHaveLength(9);
  });

  test('the question bank is used when chosen, or when AI is not available', async ({ page }) => {
    await page.goto('/calculus/');
    await stubPipeline(page, { enabled: true });
    const run = (source) => page.evaluate((source) => {
      const box = document.querySelector('.tg-source').closest('.testgen');
      box.querySelector('.tg-source').value = source;
      window.genTest(box.querySelector('button[onclick^="genTest"]'));
    }, source);
    await expect(page.locator('.tg-source').first()).toHaveValue('ai'); // AI is the default when available
    await run('bank');
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.__aiCalls.length)).toBe(0);
    // Regression: tracks without a full-exam block (calculus is one) had no .tg-out, so this
    // button threw and rendered nothing. It now renders the bank test.
    expect(await page.locator('.testgen .tg-out .problem').count()).toBeGreaterThan(0);

    await stubPipeline(page, { enabled: false });
    await run('ai');
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.__aiCalls.length)).toBe(0);
  });
});
