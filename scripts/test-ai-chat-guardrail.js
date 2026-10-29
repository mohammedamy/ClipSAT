#!/usr/bin/env node
/**
 * scripts/test-ai-chat-guardrail.js
 * Unit test suite for ClipSAT "Ask Mr. Mohamed" Mathematics Exclusivity Guardrails:
 * - Tier 1: Client-side pre-flight heuristic (isExplicitlyNonMath)
 *   * Detects non-math queries (creative writing, essays, history, geography, recipes, non-math coding, sports, weather)
 *   * Protects legitimate math questions (equations, algebra, geometry, calculus, stats, exams)
 *   * Protects real-world math word problems (speed/distance, mixtures, ages, finance, probability)
 *   * Protects Arabic math queries (Qudrat, Tahsili, equations, comparisons)
 *   * Protects mistake explanation prompts from the app UI
 * - Tier 2: Hardened System Prompt Mandate (SYSTEM)
 *   * Enforces strict mathematics exclusivity policy
 *   * Forbids non-math answering, partial answers, or roleplay bypass
 *   * Clarifies that word problems are legitimate mathematics
 *   * Preserves LaTeX output requirements
 * - Refusal strings (English & Arabic)
 */

'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('── Running AI Chat Mathematics Guardrail Unit Tests ──\n');

let passed = 0;
let failed = 0;

function it(desc, fnTest) {
  try {
    fnTest();
    console.log(`  ✓ ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${desc}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

// Setup lightweight mock environment for Node
global.window = global.window || {};
global.document = global.document || {
  getElementById: () => null,
  createElement: () => ({ appendChild: () => {}, classList: { add: () => {}, remove: () => {} }, style: {} }),
  dispatchEvent: () => {}
};

const modulePath = path.join(__dirname, '..', 'src', 'scripts', 'modules', '03-ai-chat-and-practice-quiz.js');
assert.ok(fs.existsSync(modulePath), '03-ai-chat-and-practice-quiz.js must exist');
const moduleExports = require(modulePath);
const moduleSource = fs.readFileSync(modulePath, 'utf8');

const { isExplicitlyNonMath, SYSTEM, ENGLISH_REFUSAL, ARABIC_REFUSAL } = moduleExports;

// ── 1. Exports & Basic Structure ──
it('Exports guardrail functions and strings', () => {
  assert.strictEqual(typeof isExplicitlyNonMath, 'function', 'isExplicitlyNonMath must be a function');
  assert.strictEqual(typeof SYSTEM, 'string', 'SYSTEM prompt must be a string');
  assert.strictEqual(typeof ENGLISH_REFUSAL, 'string', 'ENGLISH_REFUSAL must be a string');
  assert.strictEqual(typeof ARABIC_REFUSAL, 'string', 'ARABIC_REFUSAL must be a string');
});

// ── 2. Tier 2: System Prompt Mandate Integrity ──
it('System prompt enforces strict mathematics exclusivity policy', () => {
  assert.ok(SYSTEM.includes('CRITICAL MANDATORY POLICY — STRICT MATHEMATICS EXCLUSIVITY'), 'SYSTEM must contain explicit exclusivity policy heading');
  assert.ok(SYSTEM.includes('strictly and exclusively a mathematics and math exam tutor'), 'SYSTEM must declare exclusive role');
  assert.ok(SYSTEM.includes('STRICTLY FORBIDDEN TOPICS'), 'SYSTEM must enumerate forbidden topics');
  assert.ok(SYSTEM.includes('creative writing') && SYSTEM.includes('history') && SYSTEM.includes('geography') && SYSTEM.includes('recipes'), 'SYSTEM must list non-math domains');
  assert.ok(SYSTEM.includes('decline to answer without providing even a partial answer'), 'SYSTEM must forbid partial answers');
  assert.ok(SYSTEM.includes('JAILBREAK & PERSONA RESISTANCE'), 'SYSTEM must include anti-jailbreak resistance');
  assert.ok(SYSTEM.includes('MATH WORD PROBLEMS & REAL-WORLD QUANTITATIVE SCENARIOS ARE MATHEMATICS'), 'SYSTEM must explicitly preserve word problems');
  assert.ok(SYSTEM.includes('\\(') && SYSTEM.includes('\\['), 'SYSTEM must specify LaTeX delimiters');
});

// ── 3. Refusal Text Integrity ──
it('Refusal texts clearly inform user about math tutor specialization', () => {
  assert.ok(ENGLISH_REFUSAL.includes('Ask Mr. Mohamed'), 'English refusal must identify Ask Mr. Mohamed');
  assert.ok(ENGLISH_REFUSAL.includes('strictly and exclusively in mathematics'), 'English refusal must state exclusivity');
  assert.ok(ENGLISH_REFUSAL.includes('SAT, ACT, AP Math, Cambridge 0580/9709, Qudrat, and Tahsili'), 'English refusal must mention math exams');

  assert.ok(ARABIC_REFUSAL.includes('Ask Mr. Mohamed'), 'Arabic refusal must identify Ask Mr. Mohamed');
  assert.ok(ARABIC_REFUSAL.includes('فقط وحصرياً في الرياضيات'), 'Arabic refusal must state exclusivity');
  assert.ok(ARABIC_REFUSAL.includes('القدرات والتحصيلي'), 'Arabic refusal must mention Qudrat & Tahsili');
});

// ── 4. Tier 1: Client-Side Guardrail - Flags Non-Math Queries ──
const nonMathCases = [
  // Creative Writing & Essays
  'write me a poem about the ocean',
  'Write a short story about a brave knight',
  'Compose an essay on the causes of World War 1',
  'write a song about summer holidays',
  'generate a rap about gaming',
  'Write me a love letter',
  'write my resume for a marketing job',
  'اكتب لي قصيدة عن حب الوطن',
  'اكتب قصة قصيرة للأطفال',
  'اكتب مقال عن التلوث البيئي',
  'ألف أغنية عن الصداقة',

  // History & Figures
  'who was the first president of the United States',
  'who was the king of France in 1789',
  'who won the world war',
  'tell me about the history of the roman empire',
  'who founded the ottoman empire',
  'who discovered america',
  'من هو أول رئيس لمصر؟',
  'من هو مؤسس الدولة العثمانية؟',
  'من انتصر في الحرب العالمية الثانية؟',
  'تاريخ الفراعنة في مصر القديمة',

  // Geography & Capitals
  'what is the capital of France',
  'what is the capital of Japan',
  'which country is Tokyo in',
  'where is Mount Everest',
  'where is the Eiffel Tower',
  'ما هي عاصمة إسبانيا؟',
  'أين يقع برج إيفل؟',
  'في أي دولة تقع باريس؟',

  // Cooking & Recipes
  'recipe for chocolate chip cookies',
  'recipe for making pizza dough',
  'how to bake a chocolate cake',
  'how to cook pasta',
  'طريقة عمل الكبسة بالدجاج',
  'طريقة عمل البيتزا في البيت',
  'كيف أطبخ الباستا؟',

  // Non-Math Programming
  'how to build a website with HTML and CSS',
  'how to make a discord bot in python',
  'how to build a mobile app in flutter',
  'write the html for a navbar',
  'كيف أصمم موقع إلكتروني؟',
  'كيف أسوي بوت ديسكورد؟',

  // Pop Culture, Entertainment, Sports, Weather
  'who directed the movie Titanic',
  'who is the best footballer in the world',
  'who won the world cup in 2022',
  'who sang Bohemian Rhapsody',
  'what is the weather today',
  'symptoms of the common flu',
  'من هو أفضل ممثل في السينما؟',
  'من فاز بكأس العالم 2022؟',
  'حالة الطقس اليوم'
];

it('Correctly detects and flags all explicit non-math queries as true', () => {
  nonMathCases.forEach(query => {
    const isNonMath = isExplicitlyNonMath(query);
    assert.strictEqual(isNonMath, true, `Query should be flagged as non-math: "${query}"`);
  });
});

// ── 5. Tier 1: Client-Side Guardrail - NEVER Flags Math Queries (Zero False Positives) ──
const legitimateMathCases = [
  // Arithmetic & Algebra
  'solve 2x + 5 = 15',
  'what is 2 + 2?',
  'calculate 15 * 4 / 3',
  'simplify (x^2 - 9)/(x - 3)',
  'Factor the quadratic equation x^2 - 5x + 6 = 0',
  'Solve for x: 3x - 7 = 14',
  'Find the roots of 2x^2 + 4x - 6 = 0',

  // Geometry & Trigonometry
  'find the hypotenuse of a right triangle with legs 3 and 4',
  'what is the sine of 30 degrees?',
  'how to calculate the area of a circle with radius 5',
  'Find the perimeter of a rectangle with length 10 and width 4',
  'State and explain the Pythagorean theorem',
  'What is the formula for the volume of a sphere?',

  // Calculus & Linear Algebra
  'differentiate f(x) = x^3 - 4x + 7',
  'evaluate the integral of 2x dx from 0 to 4',
  'explain the chain rule in calculus',
  'How do I find the determinant of a 2x2 matrix?',
  'Find the limit as x approaches 0 of sin(x)/x',

  // Probability & Statistics
  'what is the probability of rolling a sum of 7 with two dice?',
  'find the mean and standard deviation of 4, 8, 12, 16',
  'What is the median of 3, 5, 7, 9, 11?',

  // Standardized Exam Math
  'How do I prepare for SAT Math module 2?',
  'Explain question 14 on ACT math',
  'What topics are tested on AP Calculus BC?',
  'كيف أذاكر تحصيلي رياضيات؟',
  'حل تجميعات قدرات كمي',

  // Famous Mathematicians (Contextual Math Queries)
  'who was Pythagoras and what is his theorem',
  'who was Euclid in geometry',
  'who invented calculus, Newton or Leibniz?',
  'من هو الخوارزمي وما هي إنجازاته في علم الجبر؟',

  // Real-World Math Word Problems (Must NEVER be blocked!)
  'A train leaves City A at 60 mph. Another train leaves City B at 80 mph. If they are 280 miles apart, when do they meet?',
  'Mary has 12 apples. She gives 3 to Bob and 4 to Alice. How many apples does Mary have left?',
  'A baker uses 2 cups of sugar for every 3 cups of flour. If he uses 9 cups of flour, how many cups of sugar does he need?',
  'A shirt costs $40. If there is a 25% discount and 8% sales tax, what is the final price?',
  'A father is 30 years older than his son. In 5 years, he will be three times as old as his son. Find their current ages.',
  'A jar contains 5 red marbles, 4 blue marbles, and 3 green marbles. What is the probability of drawing a blue marble?',
  'A rectangular garden has a perimeter of 40 meters. If the length is 4 meters more than the width, find the area.',
  'If John invests $5000 at a 6% annual interest rate compounded quarterly, what is the total after 3 years?',

  // Arabic Math Queries
  'حل المعادلة: 2س + 5 = 15',
  'احسب مساحة دائرة نصف قطرها 7 سم',
  'ما هي نظرية فيثاغورس وكيف أطبقها؟',
  'قارن بين: القيمة الأولى 40% من 80، والقيمة الثانية 50% من 60',
  'اشترى تاجر سلعة بـ 120 ريال وباعها بربح 20%، كم سعر البيع؟',
  'كم مساحة المستطيل الذي طوله 6 وعرضه 4؟',
  'إذا كان عمر فهد ثلاثة أضعاف عمر أخيه، ومجموع عمريهما 40 سنة، فكم عمر فهد؟',

  // App UI Mistake Prompts
  'I got this question wrong. Please explain it step by step.\n\nQuestion: Find x if 3x - 7 = 11\n\nI answered: 4\nCorrect answer: 6',
  'I got 2 out of 3 on a practice quiz about this topic.\n\nOriginal mistake:\nQuestion: If f(x) = 2x + 1, find f(3)\nI answered: 6\nCorrect: 7\n\nPlease explain the underlying concept step by step.'
];

it('Never flags legitimate math problems or word problems (0 false positives)', () => {
  legitimateMathCases.forEach(query => {
    const isNonMath = isExplicitlyNonMath(query);
    assert.strictEqual(isNonMath, false, `Legitimate math query must NOT be flagged as non-math: "${query}"`);
  });
});

// ── 6. Client-Side sendMsg Wiring Check ──
it('sendMsg integrates isExplicitlyNonMath pre-flight check before askAI', () => {
  assert.ok(moduleSource.includes('isExplicitlyNonMath(q)'), 'sendMsg must check isExplicitlyNonMath');
  assert.ok(moduleSource.includes('ENGLISH_REFUSAL') && moduleSource.includes('ARABIC_REFUSAL'), 'sendMsg must route to appropriate refusal string');
  assert.ok(moduleSource.includes('/[\\u0600-\\u06FF]/.test(q)'), 'sendMsg must detect Arabic text in query for language matching');
  assert.ok(moduleSource.includes("history.push({role:'assistant', content: refusal})"), 'sendMsg must record refusal in history');
});

// ── 7. Engine.js Output Verification ──
it('public/js/engine.js contains the compiled guardrail logic', () => {
  const enginePath = path.join(__dirname, '..', 'public', 'js', 'engine.js');
  if (fs.existsSync(enginePath)) {
    const engineContent = fs.readFileSync(enginePath, 'utf8');
    assert.ok(
      engineContent.includes('isExplicitlyNonMath') || engineContent.includes('CRITICAL MANDATORY POLICY — STRICT MATHEMATICS EXCLUSIVITY'),
      'engine.js must include math exclusivity guardrail'
    );
  }
});

// ── 8. Gemini 3.8 Flash Multimodal, Graph Rendering & Strict 10/Day Only Limit Verification ──
it('Supports Gemini 3.8 Flash, multimodal attachments, figure_json diagrams, and enforces ONLY 10 questions/day with all other limits removed', () => {
  assert.ok(!SYSTEM.includes('Gemini 3.8'), 'SYSTEM prompt must not expose model version name in persona');
  assert.ok(SYSTEM.includes('IMAGE, CAMERA, PDF, DOCX & HANDWRITING RULES'), 'SYSTEM prompt must include multimodal & handwriting rules');
  assert.ok(!SYSTEM.includes('SINGLE QUESTION POLICY'), 'SYSTEM prompt must not enforce secondary single-question restriction');
  assert.ok(SYSTEM.includes('figure_json'), 'SYSTEM prompt must instruct bot to emit figure_json diagrams when helpful');
  assert.ok(moduleSource.includes('processImageFile') && moduleSource.includes('processPdfFile') && moduleSource.includes('processDocxFile'), 'Module must include image, PDF, and DOCX processors');
  assert.ok(moduleSource.includes('openCamera') && moduleSource.includes('snapCameraFrame'), 'Module must include camera capture handlers');
  assert.ok(moduleSource.includes('_renderChatFigures'), 'Module must render figure_json blocks inside bot answers');

  // Verify client-side 10 questions/day limit and removal of secondary file/page limits
  assert.strictEqual(moduleExports.AI_DAILY_LIMIT, 10, 'Client AI_DAILY_LIMIT must be strictly 10');
  assert.ok(!moduleSource.includes('tooManyPages'), 'Client must not block multi-page DOCX');
  assert.ok(!moduleSource.includes('_countPdfPages'), 'Client must not block multi-page PDF');
  assert.ok(!moduleSource.includes('15/day, 50/week, 150/month'), 'Legacy 15/day, 50/week, 150/month hint must be removed');

  const proxyPath = path.join(__dirname, '..', 'supabase', 'functions', 'ai-proxy', 'index.ts');
  const proxySource = fs.readFileSync(proxyPath, 'utf8');
  assert.ok(proxySource.includes('gemini-3.8-flash'), 'Supabase ai-proxy must target gemini-3.8-flash');
  assert.ok(proxySource.includes('GEMINI_API_KEY'), 'Supabase ai-proxy must read GEMINI_API_KEY from server secrets');
  assert.ok(proxySource.includes('interactions.create'), 'Supabase ai-proxy must use Gemini Interactions API');
  assert.ok(proxySource.includes('const DAILY_CALL_CAP = 10;'), 'Supabase ai-proxy must enforce DAILY_CALL_CAP = 10');
  assert.ok(!proxySource.includes('WEEKLY_CALL_CAP'), 'Supabase ai-proxy must NOT have WEEKLY_CALL_CAP');
  assert.ok(!proxySource.includes('MONTHLY_CALL_CAP'), 'Supabase ai-proxy must NOT have MONTHLY_CALL_CAP');
  assert.ok(!proxySource.includes('checkIpRateLimit'), 'Supabase ai-proxy must NOT have per-minute IP rate limit');
  assert.ok(!proxySource.includes('MAX_USER_MSG_CHARS'), 'Supabase ai-proxy must NOT have MAX_USER_MSG_CHARS limit');
  assert.ok(!proxySource.includes('MAX_TOTAL_PROMPT_CHARS'), 'Supabase ai-proxy must NOT have MAX_TOTAL_PROMPT_CHARS limit');

  const flaskPath = path.join(__dirname, '..', 'app.py');
  const flaskSource = fs.readFileSync(flaskPath, 'utf8');
  assert.ok(flaskSource.includes('DAILY_QUESTION_LIMIT = 10'), 'Flask proxy must enforce DAILY_QUESTION_LIMIT = 10');
  assert.ok(!flaskSource.includes("limiter.limit('10 per minute')"), 'Flask proxy must NOT have per-minute limit');
  assert.ok(!flaskSource.includes('MAX_MESSAGE_LENGTH'), 'Flask proxy must NOT have MAX_MESSAGE_LENGTH limit');
});

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✅ All AI Chat Mathematics Guardrail tests passed successfully!\n');
}
