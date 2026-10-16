#!/usr/bin/env node
/**
 * scripts/fix_qudrat_duplicates.js
 * Replaces the 55 exact duplicate items in bank-data/qudrat.json
 * with 55 authentic, high-quality, syllabus-aligned bilingual Qudrat questions.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const BANK_PATH = path.join(__dirname, '..', 'bank-data', 'qudrat.json');
const data = JSON.parse(fs.readFileSync(BANK_PATH, 'utf8'));

function makeQ(difficulty, domain, textAr, textEn, choicesArr, correctIdx, solAr, solEn, fig) {
  const choices = choicesArr.map(c => {
    if (typeof c === 'string') return c;
    return `${c.ar}<br><em>${c.en}</em>`;
  });
  const qObj = {
    type: 'mcq',
    difficulty,
    domain,
    text: `${textAr}<br><em>${textEn}</em>`,
    choices,
    answer: correctIdx,
    sol: `${solAr} / ${solEn}`
  };
  if (fig) qObj.fig = fig;
  return qObj;
}

// ── 1. Ratio item (idx 199) ───────────────────────────────────────────
data.pool[199] = makeQ(
  'medium',
  'Ratios, Proportion & Percentages',
  'إذا كانت نسبة طول مستطيل إلى عرضه هي 5 : 3 ومحيطه 64 سم، فما مساحته؟',
  'If the ratio of the length to width of a rectangle is 5 : 3 and its perimeter is 64 cm, what is its area?',
  [
    { ar: '240 سم²', en: '240 cm²' },
    { ar: '192 سم²', en: '192 cm²' },
    { ar: '320 سم²', en: '320 cm²' },
    { ar: '120 سم²', en: '120 cm²' }
  ],
  0,
  'المحيط = 2(الطول + العرض) = 2(5س + 3س) = 16س = 64 => س = 4. الطول = 20 سم، العرض = 12 سم. المساحة = 20 × 12 = 240 سم².',
  'Perimeter = 2(5x + 3x) = 16x = 64 => x = 4. Length = 20 cm, width = 12 cm. Area = 20 * 12 = 240 cm².'
);

// ── 2. QC item (idx 749) ──────────────────────────────────────────────
data.pool[749] = makeQ(
  'medium',
  'Quantitative Comparisons',
  '<strong>قارن / Compare:</strong><br>القيمة الأولى: محيط دائرة نصف قطرها 5 سم.<br>القيمة الثانية: محيط مربع طول ضلعه 8 سم.',
  'Value A: Circumference of a circle with radius 5 cm.<br>Value B: Perimeter of a square with side length 8 cm.',
  [
    { ar: 'القيمة الأولى أكبر', en: 'Value A is greater' },
    { ar: 'القيمة الثانية أكبر', en: 'Value B is greater' },
    { ar: 'القيمتان متساويتان', en: 'The two values are equal' },
    { ar: 'المعطيات غير كافية', en: 'Information is insufficient' }
  ],
  1,
  'محيط الدائرة = 2 × ط × 5 = 10ط ≈ 31.42 سم. محيط المربع = 4 × 8 = 32 سم. بما أن 32 > 31.42، فإن القيمة الثانية أكبر.',
  'Circle circumference = 2 * pi * 5 = 10pi approx 31.42 cm. Square perimeter = 4 * 8 = 32 cm. Since 32 > 31.42, Value B is greater.'
);

// ── 3. Sequences items (indices 796-813: 18 questions) ────────────────
const seqQuestions = [
  // 1. Fibonacci
  makeQ('easy', 'Sequences & Patterns',
    'ما هو الحد التالي في النمط: \\( 1, 1, 2, 3, 5, 8, 13, \\dots \\)؟',
    'What is the next term in the pattern: \\( 1, 1, 2, 3, 5, 8, 13, \\dots \\)?',
    [{ ar: '21', en: '21' }, { ar: '20', en: '20' }, { ar: '19', en: '19' }, { ar: '26', en: '26' }],
    0, 'متتابعة فيبوناتشي: كل حد هو مجموع الحدين السابقين له. 8 + 13 = 21.', 'Fibonacci sequence: each term is the sum of the preceding two. 8 + 13 = 21.'),
  // 2. Cubes
  makeQ('easy', 'Sequences & Patterns',
    'ما الحد التالي في المتتابعة: \\( 1, 8, 27, 64, \\dots \\)؟',
    'What is the next term in the sequence: \\( 1, 8, 27, 64, \\dots \\)?',
    [{ ar: '125', en: '125' }, { ar: '100', en: '100' }, { ar: '81', en: '81' }, { ar: '216', en: '216' }],
    0, 'نمط مكعبات الأعداد: \\( 1^3, 2^3, 3^3, 4^3, 5^3 = 125 \\).', 'Cubes of integers: 1^3, 2^3, 3^3, 4^3, 5^3 = 125.'),
  // 3. Primes
  makeQ('easy', 'Sequences & Patterns',
    'ما هو العدد التالي في نمط الأعداد الأولية: \\( 2, 3, 5, 7, 11, 13, \\dots \\)؟',
    'What is the next number in the prime sequence: \\( 2, 3, 5, 7, 11, 13, \\dots \\)?',
    [{ ar: '17', en: '17' }, { ar: '15', en: '15' }, { ar: '19', en: '19' }, { ar: '14', en: '14' }],
    0, 'الأعداد الأولية المتتالية: العدد الأولي الذي يلي 13 مباشرة هو 17.', 'Consecutive primes: the prime immediately following 13 is 17.'),
  // 4. Triangular numbers
  makeQ('medium', 'Sequences & Patterns',
    'ما الحد السادس في نمط الأعداد المثلثية: \\( 1, 3, 6, 10, 15, \\dots \\)؟',
    'What is the 6th term in the triangular numbers sequence: \\( 1, 3, 6, 10, 15, \\dots \\)?',
    [{ ar: '21', en: '21' }, { ar: '20', en: '20' }, { ar: '25', en: '25' }, { ar: '18', en: '18' }],
    0, 'الحد النوني = ن(ن + 1) / 2. للحد السادس: 6 × 7 / 2 = 21 (أو إضافة 6 إلى 15).', 'n-th triangular number = n(n+1)/2 = 6 * 7 / 2 = 21 (or 15 + 6 = 21).'),
  // 5. Alternating operations
  makeQ('medium', 'Sequences & Patterns',
    'ما هو الحد التالي في النمط: \\( 2, 5, 10, 13, 26, \\dots \\)؟',
    'What is the next term in the pattern: \\( 2, 5, 10, 13, 26, \\dots \\)?',
    [{ ar: '29', en: '29' }, { ar: '52', en: '52' }, { ar: '30', en: '30' }, { ar: '39', en: '39' }],
    0, 'النمط يتناوب بين إضافة 3 ثم الضرب في 2: 2 (+3) = 5، 5 (×2) = 10، 10 (+3) = 13، 13 (×2) = 26، 26 (+3) = 29.', 'Alternating rule: +3 then *2. 26 + 3 = 29.'),
  // 6. Halving
  makeQ('easy', 'Sequences & Patterns',
    'ما هو الحد التالي في النمط: \\( 128, 64, 32, 16, \\dots \\)؟',
    'What is the next term in the pattern: \\( 128, 64, 32, 16, \\dots \\)?',
    [{ ar: '8', en: '8' }, { ar: '4', en: '4' }, { ar: '10', en: '10' }, { ar: '12', en: '12' }],
    0, 'قسمة كل حد على 2: 16 ÷ 2 = 8.', 'Each term is halved: 16 / 2 = 8.'),
  // 7. Powers of 2
  makeQ('easy', 'Sequences & Patterns',
    'ما هو الحد السابع في المتتابعة الهندسية: \\( 1, 2, 4, 8, 16, \\dots \\)؟',
    'What is the 7th term in the geometric sequence: \\( 1, 2, 4, 8, 16, \\dots \\)?',
    [{ ar: '64', en: '64' }, { ar: '32', en: '32' }, { ar: '128', en: '128' }, { ar: '48', en: '48' }],
    0, 'الحد السابع = \\( 2^6 = 64 \\).', '7th term = 2^6 = 64.'),
  // 8. Powers of 3
  makeQ('medium', 'Sequences & Patterns',
    'ما الحد السادس في المتتابعة: \\( 1, 3, 9, 27, 81, \\dots \\)؟',
    'What is the 6th term in the sequence: \\( 1, 3, 9, 27, 81, \\dots \\)?',
    [{ ar: '243', en: '243' }, { ar: '162', en: '162' }, { ar: '729', en: '729' }, { ar: '324', en: '324' }],
    0, 'الحد السادس = \\( 3^5 = 243 \\).', '6th term = 3^5 = 243.'),
  // 9. Units digit 2^100
  makeQ('hard', 'Sequences & Patterns',
    'ما هو رقم آحاد العدد \\( 2^{100} \\)؟',
    'What is the units digit of \\( 2^{100} \\)?',
    [{ ar: '6', en: '6' }, { ar: '2', en: '2' }, { ar: '4', en: '4' }, { ar: '8', en: '8' }],
    0, 'دورة آحاد قوى 2 هي (2, 4, 8, 6) وتتكرر كل 4 قوى. بما أن 100 تقبل القسمة على 4 بدون باقٍ، فالآحاد هو 6.', 'Units digit of powers of 2 repeats every 4: (2, 4, 8, 6). 100 mod 4 = 0, so units digit is 6.'),
  // 10. Units digit 3^42
  makeQ('hard', 'Sequences & Patterns',
    'ما هو رقم آحاد الناتج في المقدار \\( 3^{42} \\)؟',
    'What is the units digit of \\( 3^{42} \\)?',
    [{ ar: '9', en: '9' }, { ar: '3', en: '3' }, { ar: '7', en: '7' }, { ar: '1', en: '1' }],
    0, 'دورة آحاد قوى 3 هي (3, 9, 7, 1) وتتكرر كل 4 قوى. 42 ÷ 4 = 10 والباقي 2، إذن الآحاد هو 9.', 'Units digit of powers of 3 repeats every 4: (3, 9, 7, 1). 42 mod 4 = 2, so units digit is 9.'),
  // 11. Units digit 7^83
  makeQ('hard', 'Sequences & Patterns',
    'ما هو رقم آحاد العدد \\( 7^{83} \\)؟',
    'What is the units digit of \\( 7^{83} \\)?',
    [{ ar: '3', en: '3' }, { ar: '7', en: '7' }, { ar: '9', en: '9' }, { ar: '1', en: '1' }],
    0, 'دورة آحاد قوى 7 هي (7, 9, 3, 1). 83 ÷ 4 = 20 والباقي 3، إذن رقم الآحاد هو 3.', 'Units digit of powers of 7 repeats every 4: (7, 9, 3, 1). 83 mod 4 = 3, so units digit is 3.'),
  // 12. Clock cycle
  makeQ('medium', 'Sequences & Patterns',
    'إذا كانت الساعة الآن 4:00 مساءً، فكم تكون الساعة بعد 50 ساعة؟',
    'If the current time is 4:00 PM, what time will it be in 50 hours?',
    [{ ar: '6:00 مساءً', en: '6:00 PM' }, { ar: '4:00 مساءً', en: '4:00 PM' }, { ar: '6:00 صباحاً', en: '6:00 AM' }, { ar: '8:00 مساءً', en: '8:00 PM' }],
    0, 'اليوم 24 ساعة: 50 = 24 × 2 + 2 ساعة. بعد 48 ساعة تكون 4:00 مساءً، وبإضافة ساعتين تصبح 6:00 مساءً.', '50 hours = 2 * 24 + 2 hours. After 48 hours it is 4:00 PM, plus 2 hours = 6:00 PM.'),
  // 13. Day cycle
  makeQ('medium', 'Sequences & Patterns',
    'إذا كان اليوم هو الأربعاء، فما هو اليوم الذي كان قبل 25 يوماً؟',
    'If today is Wednesday, what day of the week was it 25 days ago?',
    [{ ar: 'السبت', en: 'Saturday' }, { ar: 'الأحد', en: 'Sunday' }, { ar: 'الجمعة', en: 'Friday' }, { ar: 'الخميس', en: 'Thursday' }],
    0, 'الأسبوع 7 أيام: 25 ÷ 7 = 3 أسابيع والباقي 4 أيام. نرجع 4 أيام للوراء من الأربعاء: الثلاثاء، الإثنين، الأحد، السبت.', '25 mod 7 = 4 days back from Wednesday: Tuesday, Monday, Sunday, Saturday.'),
  // 14. 2n + 1
  makeQ('medium', 'Sequences & Patterns',
    'ما هو الحد التالي في المتتابعة: \\( 3, 7, 15, 31, \\dots \\)؟',
    'What is the next term in the sequence: \\( 3, 7, 15, 31, \\dots \\)?',
    [{ ar: '63', en: '63' }, { ar: '62', en: '62' }, { ar: '47', en: '47' }, { ar: '64', en: '64' }],
    0, 'كل حد ينتج عن ضرب الحد السابق في 2 ثم إضافة 1: 31 × 2 + 1 = 63.', 'Each term is 2n + 1: 31 * 2 + 1 = 63.'),
  // 15. Decreasing differences
  makeQ('medium', 'Sequences & Patterns',
    'ما الحد المفقود في النمط: \\( 60, 58, 54, 48, \\dots \\)؟',
    'What is the next term in the pattern: \\( 60, 58, 54, 48, \\dots \\)?',
    [{ ar: '40', en: '40' }, { ar: '42', en: '42' }, { ar: '44', en: '44' }, { ar: '38', en: '38' }],
    0, 'الفروق تتناقص بمقدار 2 إضافي في كل مرة: -2، -4، -6، -8. إذن 48 - 8 = 40.', 'Decreasing differences: -2, -4, -6, -8 => 48 - 8 = 40.'),
  // 16. Sum 1..100
  makeQ('medium', 'Sequences & Patterns',
    'ما مجموع الأعداد الصحيحة المتتالية من 1 إلى 100؟',
    'What is the sum of consecutive integers from 1 to 100?',
    [{ ar: '5050', en: '5050' }, { ar: '5000', en: '5000' }, { ar: '5100', en: '5100' }, { ar: '4950', en: '4950' }],
    0, 'قانون مجموع المتتابعة الحسابية = ن(ن + 1) / 2 = 100 × 101 / 2 = 5050.', 'Arithmetic sum formula = n(n+1)/2 = 100 * 101 / 2 = 5050.'),
  // 17. Even sum 2..50
  makeQ('hard', 'Sequences & Patterns',
    'ما مجموع الأعداد الزوجية الموجبة من 2 إلى 50؟',
    'What is the sum of positive even numbers from 2 to 50?',
    [{ ar: '650', en: '650' }, { ar: '625', en: '625' }, { ar: '1275', en: '1275' }, { ar: '600', en: '600' }],
    0, '2 + 4 + ... + 50 = 2(1 + 2 + ... + 25) = 2 × (25 × 26 / 2) = 650.', '2(1 + 2 + ... + 25) = 2 * (25 * 26 / 2) = 650.'),
  // 18. Odd sum 1..39
  makeQ('hard', 'Sequences & Patterns',
    'ما مجموع أول 20 عدداً فردياً موجباً \\( (1 + 3 + 5 + \\dots + 39) \\)؟',
    'What is the sum of the first 20 positive odd numbers \\( (1 + 3 + 5 + \\dots + 39) \\)?',
    [{ ar: '400', en: '400' }, { ar: '380', en: '380' }, { ar: '420', en: '420' }, { ar: '200', en: '200' }],
    0, 'مجموع أول ن عدداً فردياً = ن² = 20² = 400.', 'Sum of first n odd numbers = n^2 = 20^2 = 400.')
];

seqQuestions.forEach((q, i) => {
  data.pool[796 + i] = q;
});

// ── 4. Geometry items (indices 562-596: 35 questions) ─────────────────
const geomQuestions = [
  makeQ('medium', 'Geometry & Measurement',
    'دائرة مرسومة داخل مربع طول ضلعه 10 سم بحيث تمس أضلاعه. ما مساحة المنطقة المتبقية داخل المربع وخارج الدائرة؟',
    'A circle is inscribed in a square of side 10 cm. What is the area inside the square but outside the circle?',
    [{ ar: '\\( 100 - 25\\pi \\) سم²', en: '\\( 100 - 25\\pi \\) cm²' }, { ar: '\\( 100 - 100\\pi \\) سم²', en: '\\( 100 - 100\\pi \\) cm²' }, { ar: '\\( 25\\pi \\) سم²', en: '\\( 25\\pi \\) cm²' }, { ar: '\\( 100 - 50\\pi \\) سم²', en: '\\( 100 - 50\\pi \\) cm²' }],
    0, 'مساحة المربع = 10 × 10 = 100 سم². نصف قطر الدائرة = 5 سم، مساحتها = 25ط سم². المساحة المتبقية = 100 - 25ط سم².', 'Square area = 100. Inscribed circle radius = 5, area = 25pi. Remaining area = 100 - 25pi cm².'),

  makeQ('medium', 'Geometry & Measurement',
    'مربع مرسوم داخل دائرة نصف قطرها 6 سم بحيث تقع رؤوسه على محيطها. ما مساحة هذا المربع؟',
    'A square is inscribed in a circle of radius 6 cm. What is the area of the square?',
    [{ ar: '72 سم²', en: '72 cm²' }, { ar: '36 سم²', en: '36 cm²' }, { ar: '144 سم²', en: '144 cm²' }, { ar: '72ط سم²', en: '72pi cm²' }],
    0, 'قطر المربع = قطر الدائرة = 2 × 6 = 12 سم. مساحة المربع بمعلومية قطره = (القطر)² / 2 = 144 / 2 = 72 سم².', 'Diagonal of square = 2r = 12 cm. Area = d^2 / 2 = 144 / 2 = 72 cm².'),

  makeQ('easy', 'Geometry & Measurement',
    'مثلث قائم الزاوية طولا ضلعي القائمة فيه 7 سم و 24 سم. ما طول وتره؟',
    'A right triangle has legs of length 7 cm and 24 cm. What is the length of its hypotenuse?',
    [{ ar: '25 سم', en: '25 cm' }, { ar: '26 سم', en: '26 cm' }, { ar: '31 سم', en: '31 cm' }, { ar: '23 سم', en: '23 cm' }],
    0, 'ثلاثية فيثاغورس الشهيرة: 7، 24، 25. الوتر = جذر(7² + 24²) = جذر(49 + 576) = جذر(625) = 25 سم.', 'Pythagorean triple: 7, 24, 25. Hypotenuse = sqrt(49 + 576) = 25 cm.'),

  makeQ('easy', 'Geometry & Measurement',
    'مثلث قائم الزاوية طول وتره 15 سم وأحد ضلعي القائمة 9 سم. ما مساحة هذا المثلث؟',
    'A right triangle has hypotenuse 15 cm and one leg 9 cm. What is the area of this triangle?',
    [{ ar: '54 سم²', en: '54 cm²' }, { ar: '108 سم²', en: '108 cm²' }, { ar: '67.5 سم²', en: '67.5 cm²' }, { ar: '45 سم²', en: '45 cm²' }],
    0, 'الضلع الآخر = جذر(15² - 9²) = جذر(225 - 81) = 12 سم. المساحة = (9 × 12) / 2 = 54 سم².', 'Other leg = sqrt(225 - 81) = 12 cm. Area = 0.5 * 9 * 12 = 54 cm².'),

  makeQ('medium', 'Geometry & Measurement',
    'مثلث متطابق الأضلاع محيطه 36 سم. ما مساحته؟',
    'An equilateral triangle has a perimeter of 36 cm. What is its area?',
    [{ ar: '\\( 36\\sqrt{3} \\) سم²', en: '\\( 36\\sqrt{3} \\) cm²' }, { ar: '\\( 18\\sqrt{3} \\) سم²', en: '\\( 18\\sqrt{3} \\) cm²' }, { ar: '\\( 72 \\) سم²', en: '\\( 72 \\) cm²' }, { ar: '\\( 144\\sqrt{3} \\) سم²', en: '\\( 144\\sqrt{3} \\) cm²' }],
    0, 'طول الضلع = 36 / 3 = 12 سم. مساحة المثلث المتطابق الأضلاع = (جذر3 / 4) × الضلع² = (جذر3 / 4) × 144 = 36جذر3 سم².', 'Side = 12 cm. Area = (sqrt(3)/4) * 12^2 = 36*sqrt(3) cm².'),

  makeQ('easy', 'Geometry & Measurement',
    'معين طولا قطريه 10 سم و 24 سم. ما مساحته؟',
    'A rhombus has diagonals of lengths 10 cm and 24 cm. What is its area?',
    [{ ar: '120 سم²', en: '120 cm²' }, { ar: '240 سم²', en: '240 cm²' }, { ar: '60 سم²', en: '60 cm²' }, { ar: '68 سم²', en: '68 cm²' }],
    0, 'مساحة المعين = (حاصل ضرب القطرين) / 2 = (10 × 24) / 2 = 120 سم².', 'Rhombus area = (d1 * d2) / 2 = (10 * 24) / 2 = 120 cm².'),

  makeQ('easy', 'Geometry & Measurement',
    'شبه منحرف طول قاعدتيه المتوازيتين 8 سم و 14 سم وارتفاعه 6 سم. ما مساحته؟',
    'A trapezoid has parallel bases of 8 cm and 14 cm, and a height of 6 cm. What is its area?',
    [{ ar: '66 سم²', en: '66 cm²' }, { ar: '132 سم²', en: '132 cm²' }, { ar: '48 سم²', en: '48 cm²' }, { ar: '84 سم²', en: '84 cm²' }],
    0, 'مساحة شبه المنحرف = ((ق1 + ق2) / 2) × ع = ((8 + 14) / 2) × 6 = 11 × 6 = 66 سم².', 'Trapezoid area = ((b1 + b2) / 2) * h = ((8 + 14) / 2) * 6 = 66 cm².'),

  makeQ('medium', 'Geometry & Measurement',
    'أسطوانة دائرية قائمة نصف قطر قاعدتها 4 سم وارتفاعها 10 سم. ما حجمها؟',
    'A right circular cylinder has base radius 4 cm and height 10 cm. What is its volume?',
    [{ ar: '\\( 160\\pi \\) سم³', en: '\\( 160\\pi \\) cm³' }, { ar: '\\( 40\\pi \\) سم³', en: '\\( 40\\pi \\) cm³' }, { ar: '\\( 80\\pi \\) سم³', en: '\\( 80\\pi \\) cm³' }, { ar: '\\( 320\\pi \\) سم³', en: '\\( 320\\pi \\) cm³' }],
    0, 'حجم الأسطوانة = مساحة القاعدة × الارتفاع = ط نق² ع = ط (4)² (10) = 160ط سم³.', 'Cylinder volume = pi * r^2 * h = pi * 16 * 10 = 160pi cm³.'),

  makeQ('medium', 'Geometry & Measurement',
    'أسطوانة دائرية قائمة نصف قطر قاعدتها 3 سم وارتفاعها 7 سم. ما مساحتها الكلية؟',
    'A right circular cylinder has base radius 3 cm and height 7 cm. What is its total surface area?',
    [{ ar: '\\( 60\\pi \\) سم²', en: '\\( 60\\pi \\) cm²' }, { ar: '\\( 42\\pi \\) سم²', en: '\\( 42\\pi \\) cm²' }, { ar: '\\( 51\\pi \\) سم²', en: '\\( 51\\pi \\) cm²' }, { ar: '\\( 63\\pi \\) سم²', en: '\\( 63\\pi \\) cm²' }],
    0, 'المساحة الكلية = 2ط نق (نق + ع) = 2ط (3) (3 + 7) = 6ط × 10 = 60ط سم².', 'Total SA = 2*pi*r(r + h) = 2*pi*3*(10) = 60pi cm².'),

  makeQ('medium', 'Geometry & Measurement',
    'مكعب حجمه 216 سم³. ما مساحته الكلية؟',
    'A cube has a volume of 216 cm³. What is its total surface area?',
    [{ ar: '216 سم²', en: '216 cm²' }, { ar: '144 سم²', en: '144 cm²' }, { ar: '36 سم²', en: '36 cm²' }, { ar: '256 سم²', en: '256 cm²' }],
    0, 'طول الحرف = الجذر التكعيبي لـ 216 = 6 سم. المساحة الكلية = 6 × (طول الحرف)² = 6 × 36 = 216 سم².', 'Side = 6 cm. Total surface area = 6 * 6^2 = 216 cm².'),

  makeQ('medium', 'Geometry & Measurement',
    'مكعب طول ضلعه 5 سم. ما طول قطره الداخلي (قطر المكعب)؟',
    'A cube has a side length of 5 cm. What is the length of its interior body diagonal?',
    [{ ar: '\\( 5\\sqrt{3} \\) سم', en: '\\( 5\\sqrt{3} \\) cm' }, { ar: '\\( 5\\sqrt{2} \\) سم', en: '\\( 5\\sqrt{2} \\) cm' }, { ar: '15 سم', en: '15 cm' }, { ar: '\\( 10\\sqrt{3} \\) سم', en: '\\( 10\\sqrt{3} \\) cm' }],
    0, 'قطر المكعب الداخلي = ل × جذر(3) = 5جذر3 سم.', 'Body diagonal = s * sqrt(3) = 5*sqrt(3) cm.'),

  makeQ('medium', 'Geometry & Measurement',
    'متوازي مستطيلات أبعاده 3 سم و 4 سم و 12 سم. ما طول قطره الداخلي؟',
    'A rectangular prism has dimensions 3 cm, 4 cm, and 12 cm. What is the length of its interior diagonal?',
    [{ ar: '13 سم', en: '13 cm' }, { ar: '19 سم', en: '19 cm' }, { ar: '15 سم', en: '15 cm' }, { ar: '17 سم', en: '17 cm' }],
    0, 'قطر متوازي المستطيلات = جذر(3² + 4² + 12²) = جذر(9 + 16 + 144) = جذر(169) = 13 سم.', 'Body diagonal = sqrt(3^2 + 4^2 + 12^2) = sqrt(169) = 13 cm.'),

  makeQ('hard', 'Geometry & Measurement',
    'كرة نصف قطرها 3 سم. ما حجمها بدلالة \\( \\pi \\)؟',
    'A sphere has radius 3 cm. What is its volume in terms of \\( \\pi \\)?',
    [{ ar: '\\( 36\\pi \\) سم³', en: '\\( 36\\pi \\) cm³' }, { ar: '\\( 12\\pi \\) سم³', en: '\\( 12\\pi \\) cm³' }, { ar: '\\( 27\\pi \\) سم³', en: '\\( 27\\pi \\) cm³' }, { ar: '\\( 108\\pi \\) سم³', en: '\\( 108\\pi \\) cm³' }],
    0, 'حجم الكرة = (4/3) ط نق³ = (4/3) ط (27) = 36ط سم³.', 'Volume = (4/3)*pi*r^3 = (4/3)*pi*27 = 36pi cm³.'),

  makeQ('medium', 'Geometry & Measurement',
    'مخروط دائري قائم نصف قطر قاعدته 6 سم وارتفاعه 8 سم. ما حجمه بدلالة \\( \\pi \\)؟',
    'A right cone has base radius 6 cm and height 8 cm. What is its volume in terms of \\( \\pi \\)?',
    [{ ar: '\\( 96\\pi \\) سم³', en: '\\( 96\\pi \\) cm³' }, { ar: '\\( 288\\pi \\) سم³', en: '\\( 288\\pi \\) cm³' }, { ar: '\\( 48\\pi \\) سم³', en: '\\( 48\\pi \\) cm³' }, { ar: '\\( 32\\pi \\) سم³', en: '\\( 32\\pi \\) cm³' }],
    0, 'حجم المخروط = (1/3) ط نق² ع = (1/3) ط (36) (8) = 96ط سم³.', 'Cone volume = (1/3)*pi*r^2*h = (1/3)*pi*36*8 = 96pi cm³.'),

  makeQ('easy', 'Geometry & Measurement',
    'مخروط قائم نصف قطر قاعدته 5 سم وارتفاعه 12 سم. ما طول راسمه (الارتفاع الجانبي)؟',
    'A cone has base radius 5 cm and height 12 cm. What is its slant height?',
    [{ ar: '13 سم', en: '13 cm' }, { ar: '17 سم', en: '17 cm' }, { ar: '15 سم', en: '15 cm' }, { ar: '14 سم', en: '14 cm' }],
    0, 'الراسم = جذر(نق² + ع²) = جذر(5² + 12²) = جذر(25 + 144) = 13 سم.', 'Slant height = sqrt(r^2 + h^2) = sqrt(25 + 144) = 13 cm.'),

  makeQ('easy', 'Geometry & Measurement',
    'زاويتان متتامتان النسبة بين قياسيهما 2 : 3. ما قياس الزاوية الصغرى؟',
    'Two complementary angles have a ratio of 2 : 3. What is the measure of the smaller angle?',
    [{ ar: '36°', en: '36°' }, { ar: '54°', en: '54°' }, { ar: '30°', en: '30°' }, { ar: '45°', en: '45°' }],
    0, 'مجموع الزاويتين المتتامتين = 90°. مجموع الأجزاء = 5. قيمة الجزء = 90 / 5 = 18°. الزاوية الصغرى = 2 × 18 = 36°.', 'Sum = 90 deg. Parts = 5 => 90 / 5 = 18 deg. Smaller = 2 * 18 = 36 deg.'),

  makeQ('easy', 'Geometry & Measurement',
    'زاويتان متكاملتان والفرق بينهما 40°. ما قياس الزاوية الكبرى؟',
    'Two supplementary angles have a difference of 40°. What is the measure of the larger angle?',
    [{ ar: '110°', en: '110°' }, { ar: '70°', en: '70°' }, { ar: '120°', en: '120°' }, { ar: '100°', en: '100°' }],
    0, 'س + ص = 180°، س - ص = 40°. بالجمع: 2س = 220° => س = 110°.', 'x + y = 180, x - y = 40 => 2x = 220 => x = 110 deg.'),

  makeQ('easy', 'Geometry & Measurement',
    'في مثلث \\( ABC \\)، قياس زاوية خارجية عند الرأس \\( C \\) هو 125°. إذا كان قياس الزاوية \\( A \\) هو 55°، فما قياس الزاوية \\( B \\)؟',
    'In triangle \\( ABC \\), an exterior angle at vertex \\( C \\) is 125°. If angle \\( A = 55^\\circ \\), what is angle \\( B \\)?',
    [{ ar: '70°', en: '70°' }, { ar: '55°', en: '55°' }, { ar: '65°', en: '65°' }, { ar: '80°', en: '80°' }],
    0, 'الزاوية الخارجية للمثلث تساوي مجموع الزاويتين الداخليتين البعيدتين: 125° - 55° = 70°.', 'Exterior angle = sum of two non-adjacent interior angles: 125 - 55 = 70 deg.'),

  makeQ('easy', 'Geometry & Measurement',
    'ما مجموع قياسات الزوايا الداخلية لمضلع سباعي محدب؟',
    'What is the sum of interior angles of a convex heptagon (7 sides)?',
    [{ ar: '900°', en: '900°' }, { ar: '1080°', en: '1080°' }, { ar: '720°', en: '720°' }, { ar: '1260°', en: '1260°' }],
    0, 'المجموع = (ن - 2) × 180° = (7 - 2) × 180° = 5 × 180° = 900°.', 'Sum = (n - 2) * 180 = 5 * 180 = 900 deg.'),

  makeQ('medium', 'Geometry & Measurement',
    'كم عدد أقطار مضلع ثماني محدب؟',
    'How many diagonals does a convex octagon (8 sides) have?',
    [{ ar: '20', en: '20' }, { ar: '24', en: '24' }, { ar: '16', en: '16' }, { ar: '28', en: '28' }],
    0, 'عدد الأقطار = ن(ن - 3) / 2 = 8(5) / 2 = 20 قطراً.', 'Diagonals = n(n - 3) / 2 = 8(5) / 2 = 20.'),

  makeQ('easy', 'Geometry & Measurement',
    'ما قياس الزاوية الخارجية لمضلع عشاري منتظم؟',
    'What is the measure of each exterior angle of a regular decagon (10 sides)?',
    [{ ar: '36°', en: '36°' }, { ar: '144°', en: '144°' }, { ar: '30°', en: '30°' }, { ar: '45°', en: '45°' }],
    0, 'الزاوية الخارجية للمضلع المنتظم = 360° / ن = 360° / 10 = 36°.', 'Exterior angle = 360 / 10 = 36 deg.'),

  makeQ('medium', 'Geometry & Measurement',
    'قطاع دائري نصف قطره 12 سم وزاويته المركزية 60°. ما مساحة هذا القطاع بدلالة \\( \\pi \\)؟',
    'A circular sector has radius 12 cm and central angle 60°. What is its area in terms of \\( \\pi \\)?',
    [{ ar: '\\( 24\\pi \\) سم²', en: '\\( 24\\pi \\) cm²' }, { ar: '\\( 144\\pi \\) سم²', en: '\\( 144\\pi \\) cm²' }, { ar: '\\( 12\\pi \\) سم²', en: '\\( 12\\pi \\) cm²' }, { ar: '\\( 36\\pi \\) سم²', en: '\\( 36\\pi \\) cm²' }],
    0, 'مساحة القطاع = (الزاوية / 360) × ط نق² = (60 / 360) × ط (144) = (1/6) × 144ط = 24ط سم².', 'Sector area = (60/360) * pi * 144 = 24pi cm².'),

  makeQ('medium', 'Geometry & Measurement',
    'دائرة نصف قطرها 10 سم. ما طول القوس المقابل لزاوية مركزية قياسها 72° بدلالة \\( \\pi \\)؟',
    'A circle has radius 10 cm. What is the length of an arc subtending a central angle of 72°?',
    [{ ar: '\\( 4\\pi \\) سم', en: '\\( 4\\pi \\) cm' }, { ar: '\\( 2\\pi \\) سم', en: '\\( 2\\pi \\) cm' }, { ar: '\\( 8\\pi \\) سم', en: '\\( 8\\pi \\) cm' }, { ar: '\\( 10\\pi \\) سم', en: '\\( 10\\pi \\) cm' }],
    0, 'طول القوس = (الزاوية / 360) × 2ط نق = (72 / 360) × 2ط (10) = (1/5) × 20ط = 4ط سم.', 'Arc length = (72/360) * 2*pi*10 = 4pi cm.'),

  makeQ('medium', 'Geometry & Measurement',
    'مثلثان متشابهان نسبة التشابه بين أضلاعهما 3 : 5. إذا كانت مساحة المثلث الأصغر 36 سم²، فما مساحة المثلث الأكبر؟',
    'Two similar triangles have a side ratio of 3 : 5. If the smaller triangle has an area of 36 cm², what is the area of the larger?',
    [{ ar: '100 سم²', en: '100 cm²' }, { ar: '60 سم²', en: '60 cm²' }, { ar: '80 سم²', en: '80 cm²' }, { ar: '120 سم²', en: '120 cm²' }],
    0, 'نسبة المساحات = مربع نسبة الأضلاع = (5/3)² = 25 / 9. مساحة الأكبر = 36 × (25 / 9) = 4 × 25 = 100 سم².', 'Area ratio = (5/3)^2 = 25/9. Larger area = 36 * (25/9) = 100 cm².'),

  makeQ('medium', 'Geometry & Measurement',
    'مجسمان متشابهان النسبة بين أبعادهما 1 : 2. إذا كان حجم الأصغر 15 سم³، فما حجم الأكبر؟',
    'Two similar solids have a linear ratio of 1 : 2. If the smaller solid has volume 15 cm³, what is the volume of the larger?',
    [{ ar: '120 سم³', en: '120 cm³' }, { ar: '60 سم³', en: '60 cm³' }, { ar: '30 سم³', en: '30 cm³' }, { ar: '90 سم³', en: '90 cm³' }],
    0, 'نسبة الحجوم = مكعب نسبة الأبعاد = 2³ = 8. حجم الأكبر = 15 × 8 = 120 سم³.', 'Volume ratio = 2^3 = 8. Larger volume = 15 * 8 = 120 cm³.'),

  makeQ('easy', 'Geometry & Measurement',
    'مثلث ثلاثيني ستيني طول وتره 20 سم. ما طول الضلع المقابل للزاوية 30°؟',
    'A 30°-60°-90° right triangle has hypotenuse 20 cm. What is the length of the side opposite the 30° angle?',
    [{ ar: '10 سم', en: '10 cm' }, { ar: '\\( 10\\sqrt{3} \\) سم', en: '\\( 10\\sqrt{3} \\) cm' }, { ar: '5 سم', en: '5 cm' }, { ar: '15 سم', en: '15 cm' }],
    0, 'في المثلث الثلاثيني الستيني: الضلع المقابل للزاوية 30° يساوي نصف طول الوتر = 20 / 2 = 10 سم.', 'Side opposite 30 deg = 0.5 * hypotenuse = 10 cm.'),

  makeQ('easy', 'Geometry & Measurement',
    'مثلث قائم متطابق الضلعين طول وتره \\( 8\\sqrt{2} \\) سم. ما مساحته؟',
    'An isosceles right triangle has hypotenuse \\( 8\\sqrt{2} \\) cm. What is its area?',
    [{ ar: '32 سم²', en: '32 cm²' }, { ar: '64 سم²', en: '64 cm²' }, { ar: '16 سم²', en: '16 cm²' }, { ar: '48 سم²', en: '48 cm²' }],
    0, 'طول كل ضلع من ضلعي القائمة = 8 سم. المساحة = (8 × 8) / 2 = 32 سم².', 'Legs = 8 cm. Area = 0.5 * 8 * 8 = 32 cm².'),

  makeQ('easy', 'Geometry & Measurement',
    'ما هي نقطة منتصف القطعة المستقيمة الواصلة بين النقطتين \\( (3, 7) \\) و \\( (9, -1) \\)؟',
    'What is the midpoint of the line segment connecting \\( (3, 7) \\) and \\( (9, -1) \\)?',
    [{ ar: '\\( (6, 3) \\)', en: '\\( (6, 3) \\)' }, { ar: '\\( (6, 4) \\)', en: '\\( (6, 4) \\)' }, { ar: '\\( (12, 6) \\)', en: '\\( (12, 6) \\)' }, { ar: '\\( (3, 4) \\)', en: '\\( (3, 4) \\)' }],
    0, 'نقطة المنتصف = ((3 + 9)/2, (7 + (-1))/2) = (12/2, 6/2) = (6, 3).', 'Midpoint = ((3+9)/2, (7-1)/2) = (6, 3).'),

  makeQ('easy', 'Geometry & Measurement',
    'ما المسافة بين النقطتين \\( (2, 3) \\) و \\( (6, 6) \\) في المستوى الإحداثي؟',
    'What is the distance between points \\( (2, 3) \\) and \\( (6, 6) \\) in the coordinate plane?',
    [{ ar: '5', en: '5' }, { ar: '7', en: '7' }, { ar: '4', en: '4' }, { ar: '25', en: '25' }],
    0, 'المسافة = جذر((6 - 2)² + (6 - 3)²) = جذر(4² + 3²) = جذر(16 + 9) = جذر(25) = 5 وحدات.', 'Distance = sqrt((6-2)^2 + (6-3)^2) = sqrt(25) = 5.'),

  makeQ('easy', 'Geometry & Measurement',
    'ما ميل المستقيم المار بالنقطتين \\( (1, 4) \\) و \\( (5, 12) \\)؟',
    'What is the slope of the line passing through \\( (1, 4) \\) and \\( (5, 12) \\)?',
    [{ ar: '2', en: '2' }, { ar: '3', en: '3' }, { ar: '4', en: '4' }, { ar: '0.5', en: '0.5' }],
    0, 'الميل = (12 - 4) / (5 - 1) = 8 / 4 = 2.', 'Slope = (12 - 4) / (5 - 1) = 8 / 4 = 2.'),

  makeQ('medium', 'Geometry & Measurement',
    'سداسي منتظم طول ضلعه 6 سم. ما مساحته بدقة؟',
    'A regular hexagon has a side length of 6 cm. What is its exact area?',
    [{ ar: '\\( 54\\sqrt{3} \\) سم²', en: '\\( 54\\sqrt{3} \\) cm²' }, { ar: '\\( 36\\sqrt{3} \\) سم²', en: '\\( 36\\sqrt{3} \\) cm²' }, { ar: '108 سم²', en: '108 cm²' }, { ar: '\\( 27\\sqrt{3} \\) سم²', en: '\\( 27\\sqrt{3} \\) cm²' }],
    0, 'السداسي المنتظم ينقسم إلى 6 مثلثات متطابقة الأضلاع: 6 × (جذر3 / 4) × 6² = 6 × 9جذر3 = 54جذر3 سم².', 'Hexagon area = 6 * (sqrt(3)/4) * 6^2 = 54*sqrt(3) cm².'),

  makeQ('easy', 'Geometry & Measurement',
    'متوازي أضلاع طول قاعدته 15 سم وارتفاعه العمودي الساقط عليها 8 سم. ما مساحته؟',
    'A parallelogram has a base of 15 cm and a perpendicular height of 8 cm. What is its area?',
    [{ ar: '120 سم²', en: '120 cm²' }, { ar: '60 سم²', en: '60 cm²' }, { ar: '46 سم²', en: '46 cm²' }, { ar: '150 سم²', en: '150 cm²' }],
    0, 'مساحة متوازي الأضلاع = القاعدة × الارتفاع = 15 × 8 = 120 سم².', 'Parallelogram area = base * height = 15 * 8 = 120 cm².'),

  makeQ('medium', 'Geometry & Measurement',
    'دائرة فيها وتر طوله 16 سم ويبعد 6 سم عن مركزها. ما نصف قطر هذه الدائرة؟',
    'A circle contains a chord of length 16 cm that is 6 cm from its center. What is the radius of the circle?',
    [{ ar: '10 سم', en: '10 cm' }, { ar: '12 سم', en: '12 cm' }, { ar: '8 سم', en: '8 cm' }, { ar: '14 سم', en: '14 cm' }],
    0, 'العمود المنصف للوتر يقسمه إلى نصفين كل منهما 8 سم. نصف القطر = جذر(6² + 8²) = 10 سم.', 'Radius = sqrt(6^2 + 8^2) = 10 cm.'),

  makeQ('easy', 'Geometry & Measurement',
    'في دائرة، إذا كان قياس الزاوية المركزية هو 84°، فما قياس الزاوية المحيطية المشتركة معها في نفس القوس؟',
    'In a circle, if a central angle measures 84°, what is the measure of an inscribed angle subtending the same arc?',
    [{ ar: '42°', en: '42°' }, { ar: '84°', en: '84°' }, { ar: '168°', en: '168°' }, { ar: '96°', en: '96°' }],
    0, 'الزاوية المحيطية تساوي نصف قياس الزاوية المركزية المشتركة معها في القوس = 84° / 2 = 42°.', 'Inscribed angle = 0.5 * central angle = 42 deg.'),

  makeQ('medium', 'Geometry & Measurement',
    'دائرة نصف قطرها 5 سم. رسم مماس لها من نقطة خارجية تبعد 13 سم عن مركز الدائرة. ما طول هذا المماس؟',
    'A circle has radius 5 cm. A tangent is drawn from an external point 13 cm from the center. What is the length of this tangent segment?',
    [{ ar: '12 سم', en: '12 cm' }, { ar: '8 سم', en: '8 cm' }, { ar: '14 سم', en: '14 cm' }, { ar: '10 سم', en: '10 cm' }],
    0, 'المماس عمودي على نصف القطر عند نقطة التماس، ويتشكل مثلث قائم الوتر فيه 13 سم ونصف القطر 5 سم: طول المماس = جذر(13² - 5²) = جذر(144) = 12 سم.', 'Tangent = sqrt(13^2 - 5^2) = 12 cm.')
];

geomQuestions.forEach((q, i) => {
  data.pool[562 + i] = q;
});

fs.writeFileSync(BANK_PATH, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('✅ Successfully replaced all 55 duplicate questions in bank-data/qudrat.json!');
