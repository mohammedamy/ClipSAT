#!/usr/bin/env node
/**
 * scripts/fix_remaining_duplicates.js
 * Fixes:
 * 1. 1 duplicate in bank-data/tahsili.json (index 1149)
 * 2. 11 duplicates in bank-data/qudrat.json (indices 843-849 and 896-899)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ── 1. Tahsili Fix (index 1149) ──────────────────────────────────────────
const tahsPath = path.join(ROOT, 'bank-data', 'tahsili.json');
const tahsData = JSON.parse(fs.readFileSync(tahsPath, 'utf8'));

tahsData.pool[1149] = {
  type: 'mcq',
  domain: 'Exponentials & Logarithms',
  text: 'ما حل المعادلة \\( 5^{2x} = 125 \\)؟<br><em>Solve \\( 5^{2x} = 125 \\).</em>',
  choices: [
    '\\( \\frac{3}{2} \\)',
    '\\( \\frac{2}{3} \\)',
    '3',
    '2'
  ],
  answer: 0,
  sol: 'بما أن \\( 125 = 5^3 \\)، فإن \\( 2x = 3 \\implies x = \\frac{3}{2} \\).',
  difficulty: 'medium'
};

fs.writeFileSync(tahsPath, JSON.stringify(tahsData, null, 2) + '\n', 'utf8');
console.log('✅ Updated tahsili.json index 1149.');

// ── 2. Qudrat Fix (indices 843-849, 896-899) ─────────────────────────────
const qudPath = path.join(ROOT, 'bank-data', 'qudrat.json');
const qudData = JSON.parse(fs.readFileSync(qudPath, 'utf8'));

function makeQ(difficulty, domain, textAr, textEn, choicesArr, correctIdx, solAr, solEn) {
  const choices = choicesArr.map(c => {
    if (typeof c === 'string') return c;
    return `${c.ar}<br><em>${c.en}</em>`;
  });
  return {
    type: 'mcq',
    difficulty,
    domain,
    text: `${textAr}<br><em>${textEn}</em>`,
    choices,
    answer: correctIdx,
    sol: `${solAr} / ${solEn}`
  };
}

// 843
qudData.pool[843] = makeQ(
  'medium', 'Sequences & Patterns',
  'ما هو الحد التالي في النمط: \\( 81, 27, 9, 3, \\dots \\)؟',
  'What is the next term in the pattern: \\( 81, 27, 9, 3, \\dots \\)?',
  [{ ar: '1', en: '1' }, { ar: '0', en: '0' }, { ar: '\\( \\frac{1}{3} \\)', en: '1/3' }, { ar: '2', en: '2' }],
  0,
  'قسمة كل حد على 3: 3 ÷ 3 = 1.',
  'Each term is divided by 3: 3 / 3 = 1.'
);

// 844
qudData.pool[844] = makeQ(
  'medium', 'Sequences & Patterns',
  'ما مجموع مضاعفات العدد 5 المحصورة بين 1 و 51: \\( 5 + 10 + 15 + \\dots + 50 \\)؟',
  'What is the sum of multiples of 5 from 5 to 50: \\( 5 + 10 + 15 + \\dots + 50 \\)?',
  [{ ar: '275', en: '275' }, { ar: '250', en: '250' }, { ar: '300', en: '300' }, { ar: '225', en: '225' }],
  0,
  '5 × (1 + 2 + ... + 10) = 5 × (10 × 11 / 2) = 5 × 55 = 275.',
  '5 * (10 * 11 / 2) = 5 * 55 = 275.'
);

// 845
qudData.pool[845] = makeQ(
  'medium', 'Sequences & Patterns',
  'ما هو الحد التالي في النمط: \\( 2, 5, 14, 41, \\dots \\)؟',
  'What is the next term in the pattern: \\( 2, 5, 14, 41, \\dots \\)?',
  [{ ar: '122', en: '122' }, { ar: '120', en: '120' }, { ar: '124', en: '124' }, { ar: '118', en: '118' }],
  0,
  'النمط هو: ضرب الحد في 3 ثم طرح 1: 41 × 3 - 1 = 123 - 1 = 122.',
  'Pattern is * 3 - 1: 41 * 3 - 1 = 122.'
);

// 846
qudData.pool[846] = makeQ(
  'medium', 'Sequences & Patterns',
  'يجلس 6 أشخاص حول طاولة دائرية. كم عدد الطرق المختلفة لجلوسهم؟',
  '6 people sit around a circular table. In how many different ways can they be seated?',
  [{ ar: '120', en: '120' }, { ar: '720', en: '720' }, { ar: '24', en: '24' }, { ar: '60', en: '60' }],
  0,
  'التباديل الدائرية لـ ن عنصر = (ن - 1)! = (6 - 1)! = 5! = 120 طريقة.',
  'Circular permutations of n items = (n - 1)! = 5! = 120.'
);

// 847
qudData.pool[847] = makeQ(
  'medium', 'Sequences & Patterns',
  'ما هو الحد التالي في النمط: \\( 1, 10, 3, 20, 5, 30, \\dots \\)؟',
  'What is the next term in the pattern: \\( 1, 10, 3, 20, 5, 30, \\dots \\)?',
  [{ ar: '7', en: '7' }, { ar: '40', en: '40' }, { ar: '6', en: '6' }, { ar: '35', en: '35' }],
  0,
  'متتابعتان متداخلتان: الحدود الفردية (1, 3, 5, 7) تزيد بمقدار 2، والحدود الزوجية تزيد بمقدار 10. الحد التالي هو فردي: 5 + 2 = 7.',
  'Interleaved sequences: odd positions increase by 2 (1, 3, 5, 7), so the next term is 7.'
);

// 848
qudData.pool[848] = makeQ(
  'medium', 'Sequences & Patterns',
  'ما الحد التالي في المتتابعة: \\( 2, 5, 10, 17, 26, \\dots \\)؟',
  'What is the next term in the sequence: \\( 2, 5, 10, 17, 26, \\dots \\)?',
  [{ ar: '37', en: '37' }, { ar: '35', en: '35' }, { ar: '36', en: '36' }, { ar: '39', en: '39' }],
  0,
  'الحد النوني هو ن² + 1: الحد السادس = 6² + 1 = 37 (أو إضافة 11 إلى 26).',
  'Pattern is n^2 + 1: 6^2 + 1 = 37 (or 26 + 11 = 37).'
);

// 849
qudData.pool[849] = makeQ(
  'medium', 'Sequences & Patterns',
  'تتكرر الكلمة "قدرات" حرفًا حرفًا بصورة دورية: ق د ر ا ت ق د ر ا ت ... ما هو الحرف رقم 58؟',
  'The word "قدرات" (5 letters: Q-D-R-A-T) repeats cyclically. What is the 58th letter?',
  [{ ar: 'ر', en: 'R' }, { ar: 'د', en: 'D' }, { ar: 'ق', en: 'Q' }, { ar: 'ا', en: 'A' }],
  0,
  'طول الدورة 5 أحرف: 58 ÷ 5 = 11 دورة كاملة والباقي 3. الحرف الثالث هو ر.',
  'Period is 5 letters: 58 mod 5 = 3. The 3rd letter is R.'
);

// 896
qudData.pool[896] = makeQ(
  'hard', 'Sequences & Patterns',
  'ما هو رقم آحاد الناتج في المقدار: \\( 4^{2025} \\)؟',
  'What is the units digit of \\( 4^{2025} \\)?',
  [{ ar: '4', en: '4' }, { ar: '6', en: '6' }, { ar: '2', en: '2' }, { ar: '8', en: '8' }],
  0,
  'دورة آحاد قوى 4 هي: إذا كان الأس فردياً فالآحاد 4، وإذا كان الأس زوجياً فالآحاد 6. بما أن 2025 فردي، فالآحاد 4.',
  'Powers of 4 end in 4 for odd exponents and 6 for even exponents. 2025 is odd, so the units digit is 4.'
);

// 897
qudData.pool[897] = makeQ(
  'hard', 'Sequences & Patterns',
  'كم عدد الأصفار في نهاية ناتج مفكوك العدد \\( 25! \\)؟',
  'How many trailing zeros are at the end of \\( 25! \\)?',
  [{ ar: '6', en: '6' }, { ar: '5', en: '5' }, { ar: '4', en: '4' }, { ar: '7', en: '7' }],
  0,
  'عدد الأصفار = [25/5] + [25/25] = 5 + 1 = 6 أصفار.',
  'Number of trailing zeros = floor(25/5) + floor(25/25) = 5 + 1 = 6.'
);

// 898
qudData.pool[898] = makeQ(
  'hard', 'Sequences & Patterns',
  'متتابعة حسابية حدها الثالث يساوي 13 وحدها السابع يساوي 29. ما هو حدها العاشر؟',
  'An arithmetic sequence has 3rd term equal to 13 and 7th term equal to 29. What is its 10th term?',
  [{ ar: '41', en: '41' }, { ar: '39', en: '39' }, { ar: '43', en: '43' }, { ar: '45', en: '45' }],
  0,
  'الأساس د = (29 - 13) / (7 - 3) = 16 / 4 = 4. الحد العاشر = 29 + 3(4) = 41.',
  'Common difference d = (29 - 13)/4 = 4. 10th term = 29 + 3*4 = 41.'
);

// 899
qudData.pool[899] = makeQ(
  'hard', 'Sequences & Patterns',
  'ما مجموع المتسلسلة الهندسية اللانهائية: \\( 18 + 6 + 2 + \\frac{2}{3} + \\dots \\)؟',
  'What is the sum of the infinite geometric series: \\( 18 + 6 + 2 + \\frac{2}{3} + \\dots \\)?',
  [{ ar: '27', en: '27' }, { ar: '26', en: '26' }, { ar: '36', en: '36' }, { ar: '24', en: '24' }],
  0,
  'الحد الأول 18، والأساس 1/3. المجموع = 18 / (1 - 1/3) = 18 / (2/3) = 27.',
  'First term 18, common ratio 1/3. Sum = 18 / (2/3) = 27.'
);

fs.writeFileSync(qudPath, JSON.stringify(qudData, null, 2) + '\n', 'utf8');
console.log('✅ Updated qudrat.json 11 items.');
