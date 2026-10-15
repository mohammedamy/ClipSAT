#!/usr/bin/env node
/**
 * scripts/generate_qudrat_motion.js
 * Generates 150 authentic, syllabus-aligned Motion, Speed & Work Rate questions
 * (50 Easy, 50 Medium, 50 Hard) to replace the 150 non-math "Test Format & Strategy"
 * trivia questions in bank-data/qudrat.json.
 */

'use strict';

const fs = require('fs');
const path = require('path');

function createQuestion(difficulty, textAr, textEn, choicesArr, correctIdx, solAr, solEn) {
  const choices = choicesArr.map(c => {
    if (typeof c === 'string') return c;
    return `${c.ar}<br><em>${c.en}</em>`;
  });

  const seen = new Set();
  choices.forEach((c, i) => {
    if (seen.has(c)) {
      throw new Error(`Duplicate choice in question: ${c} (question: ${textEn})`);
    }
    seen.add(c);
  });

  return {
    type: 'mcq',
    difficulty: difficulty,
    domain: 'Motion, Speed & Work Rates',
    text: `${textAr}<br><em>${textEn}</em>`,
    choices: choices,
    answer: correctIdx,
    sol: `${solAr} / ${solEn}`
  };
}

const questions = [];

// ==========================================
// 50 EASY QUESTIONS
// ==========================================
// 1-10: Basic Speed, Distance, Time (d = v * t)
const basicDVT = [
  { d: 360, t: 3, v: 120, unit: 'كم/ساعة', unitEn: 'km/h', nameAr: 'سيارة', nameEn: 'car' },
  { d: 450, t: 5, v: 90, unit: 'كم/ساعة', unitEn: 'km/h', nameAr: 'قطار', nameEn: 'train' },
  { d: 240, t: 4, v: 60, unit: 'كم/ساعة', unitEn: 'km/h', nameAr: 'حافلة', nameEn: 'bus' },
  { d: 500, t: 5, v: 100, unit: 'كم/ساعة', unitEn: 'km/h', nameAr: 'شاحنة', nameEn: 'truck' },
  { d: 180, t: 2, v: 90, unit: 'كم/ساعة', unitEn: 'km/h', nameAr: 'دراجة نارية', nameEn: 'motorcycle' },
  { d: 600, t: 6, v: 100, unit: 'كم/ساعة', unitEn: 'km/h', nameAr: 'سيارة', nameEn: 'car' },
  { d: 350, t: 5, v: 70, unit: 'كم/ساعة', unitEn: 'km/h', nameAr: 'سيارة', nameEn: 'car' },
  { d: 480, t: 4, v: 120, unit: 'كم/ساعة', unitEn: 'km/h', nameAr: 'قطار سريع', nameEn: 'bullet train' },
  { d: 280, t: 4, v: 70, unit: 'كم/ساعة', unitEn: 'km/h', nameAr: 'حافلة', nameEn: 'bus' },
  { d: 720, t: 6, v: 120, unit: 'كم/ساعة', unitEn: 'km/h', nameAr: 'سيارة', nameEn: 'car' }
];

basicDVT.forEach((item, idx) => {
  const v = item.v;
  const opts = [
    { ar: `${v} ${item.unit}`, en: `${v} ${item.unitEn}` },
    { ar: `${v - 20} ${item.unit}`, en: `${v - 20} ${item.unitEn}` },
    { ar: `${v + 20} ${item.unit}`, en: `${v + 20} ${item.unitEn}` },
    { ar: `${v + 10} ${item.unit}`, en: `${v + 10} ${item.unitEn}` }
  ];
  const targetAns = opts[0];
  const shuf = [opts[1], opts[0], opts[2], opts[3]]; // correct is index 1
  questions.push(createQuestion(
    'easy',
    `قطعت ${item.nameAr} مسافة \\( ${item.d} \\) كم في زمن قدره \\( ${item.t} \\) ساعات، فما هي سرعتها المتوسطة؟`,
    `A ${item.nameEn} traveled \\( ${item.d} \\) km in \\( ${item.t} \\) hours. What is its average speed?`,
    shuf,
    1,
    `السرعة = المسافة ÷ الزمن = \\( \\frac{${item.d}}{${item.t}} = ${v} \\) كم/ساعة.`,
    `Speed = Distance / Time = \\( ${item.d} / ${item.t} = ${v} \\) km/h.`
  ));
});

// 11-20: Distance = Speed * Time
const distFromVT = [
  { v: 80, t: 3, d: 240 },
  { v: 100, t: 4, d: 400 },
  { v: 90, t: 3, d: 270 },
  { v: 110, t: 2, d: 220 },
  { v: 75, t: 4, d: 300 },
  { v: 120, t: 2.5, d: 300, tStr: '2.5', tAr: 'ساعتين ونصف', tEn: '2.5 hours' },
  { v: 80, t: 4.5, d: 360, tStr: '4.5', tAr: '4 ساعات ونصف', tEn: '4.5 hours' },
  { v: 95, t: 2, d: 190 },
  { v: 85, t: 4, d: 340 },
  { v: 65, t: 4, d: 260 }
];

distFromVT.forEach((item, idx) => {
  const d = item.d;
  const timeAr = item.tAr || `\\( ${item.t} \\) ساعات`;
  const timeEn = item.tEn || `\\( ${item.t} \\) hours`;
  const opts = [
    { ar: `${d} كم`, en: `${d} km` },
    { ar: `${d - 40} كم`, en: `${d - 40} km` },
    { ar: `${d + 30} كم`, en: `${d + 30} km` },
    { ar: `${d + 60} كم`, en: `${d + 60} km` }
  ];
  const targetAns = opts[0];
  const shuf = [opts[2], opts[3], opts[0], opts[1]]; // correct is index 2
  questions.push(createQuestion(
    'easy',
    `سار شخص بسرعة منتظمة قدرها \\( ${item.v} \\) كم/ساعة لمدة ${timeAr}، فما المسافة التي قطعها؟`,
    `A person traveled at a constant speed of \\( ${item.v} \\) km/h for ${timeEn}. What distance was covered?`,
    shuf,
    2,
    `المسافة = السرعة × الزمن = \\( ${item.v} \\times ${item.t} = ${d} \\) كم.`,
    `Distance = Speed × Time = \\( ${item.v} \\times ${item.t} = ${d} \\) km.`
  ));
});

// 21-30: Time = Distance / Speed
const timeFromDV = [
  { d: 420, v: 70, t: 6 },
  { d: 540, v: 90, t: 6 },
  { d: 480, v: 80, t: 6 },
  { d: 350, v: 70, t: 5 },
  { d: 600, v: 120, t: 5 },
  { d: 250, v: 50, t: 5 },
  { d: 360, v: 90, t: 4 },
  { d: 280, v: 70, t: 4 },
  { d: 450, v: 75, t: 6 },
  { d: 320, v: 80, t: 4 }
];

timeFromDV.forEach((item, idx) => {
  const t = item.t;
  const opts = [
    { ar: `${t} ساعات`, en: `${t} hours` },
    { ar: `${t + 1} ساعات`, en: `${t + 1} hours` },
    { ar: `${t - 1} ساعات`, en: `${t - 1} hours` },
    { ar: `${t + 2} ساعات`, en: `${t + 2} hours` }
  ];
  const shuf = [opts[0], opts[1], opts[2], opts[3]]; // correct is index 0
  questions.push(createQuestion(
    'easy',
    `تسير شاحنة بسرعة \\( ${item.v} \\) كم/ساعة، كم ساعة تستغرق لقطع مسافة \\( ${item.d} \\) كم؟`,
    `A truck travels at \\( ${item.v} \\) km/h. How many hours will it take to travel \\( ${item.d} \\) km?`,
    shuf,
    0,
    `الزمن = المسافة ÷ السرعة = \\( \\frac{${item.d}}{${item.v}} = ${t} \\) ساعات.`,
    `Time = Distance / Speed = \\( ${item.d} / ${item.v} = ${t} \\) hours.`
  ));
});

// 31-40: Production & Printing Rates
const prodRates = [
  { ratePerMin: 12, timeMin: 15, total: 180, itemAr: 'صفحة', itemEn: 'pages', deviceAr: 'طابعة', deviceEn: 'printer' },
  { ratePerMin: 20, timeMin: 30, total: 600, itemAr: 'علبة', itemEn: 'cans', deviceAr: 'آلة تعبئة', deviceEn: 'packing machine' },
  { ratePerMin: 8, timeMin: 45, total: 360, itemAr: 'قطعة', itemEn: 'parts', deviceAr: 'عامل', deviceEn: 'worker' },
  { ratePerMin: 15, timeMin: 20, total: 300, itemAr: 'صفحة', itemEn: 'pages', deviceAr: 'طابعة ليزر', deviceEn: 'laser printer' },
  { ratePerMin: 25, timeMin: 12, total: 300, itemAr: 'رسالة', itemEn: 'letters', deviceAr: 'جهاز فرز', deviceEn: 'sorting machine' },
  { ratePerMin: 5, timeMin: 60, total: 300, itemAr: 'رغيف', itemEn: 'loaves', deviceAr: 'فرن آلي', deviceEn: 'bakery oven' },
  { ratePerMin: 30, timeMin: 10, total: 300, itemAr: 'نسخة', itemEn: 'copies', deviceAr: 'آلة تصوير', deviceEn: 'photocopier' },
  { ratePerMin: 16, timeMin: 25, total: 400, itemAr: 'صفحة', itemEn: 'pages', deviceAr: 'طابعة', deviceEn: 'printer' },
  { ratePerMin: 14, timeMin: 20, total: 280, itemAr: 'منتج', itemEn: 'products', deviceAr: 'خط إنتاج', deviceEn: 'assembly line' },
  { ratePerMin: 18, timeMin: 15, total: 270, itemAr: 'بطاقة', itemEn: 'cards', deviceAr: 'طابعة بطاقات', deviceEn: 'card printer' }
];

prodRates.forEach((item, idx) => {
  const ans = item.total;
  const opts = [
    { ar: `${ans} ${item.itemAr}`, en: `${ans} ${item.itemEn}` },
    { ar: `${ans - 30} ${item.itemAr}`, en: `${ans - 30} ${item.itemEn}` },
    { ar: `${ans + 40} ${item.itemAr}`, en: `${ans + 40} ${item.itemEn}` },
    { ar: `${ans + 20} ${item.itemAr}`, en: `${ans + 20} ${item.itemEn}` }
  ];
  const shuf = [opts[1], opts[2], opts[0], opts[3]]; // correct is index 2
  questions.push(createQuestion(
    'easy',
    `تنتج ${item.deviceAr} بمعدل \\( ${item.ratePerMin} \\) ${item.itemAr} في الدقيقة الواحدة. فكم تنتج في \\( ${item.timeMin} \\) دقيقة؟`,
    `A ${item.deviceEn} produces at a rate of \\( ${item.ratePerMin} \\) ${item.itemEn} per minute. How many does it produce in \\( ${item.timeMin} \\) minutes?`,
    shuf,
    2,
    `الإنتاج الكلي = المعدل × الزمن = \\( ${item.ratePerMin} \\times ${item.timeMin} = ${ans} \\) ${item.itemAr}.`,
    `Total Output = Rate × Time = \\( ${item.ratePerMin} \\times ${item.timeMin} = ${ans} \\) ${item.itemEn}.`
  ));
});

// 41-50: Speed Unit Conversion & Clock Hand Basics
const speedAndClock = [
  { kmh: 72, ms: 20 },
  { kmh: 90, ms: 25 },
  { kmh: 108, ms: 30 },
  { kmh: 54, ms: 15 },
  { kmh: 36, ms: 10 },
  { ms: 15, kmh: 54 },
  { ms: 20, kmh: 72 },
  { ms: 25, kmh: 90 },
  { hr: 3, min: 0, angle: 90 },
  { hr: 6, min: 0, angle: 180 }
];

speedAndClock.slice(0, 5).forEach(item => {
  const ms = item.ms;
  const opts = [
    { ar: `${ms} م/ث`, en: `${ms} m/s` },
    { ar: `${ms - 5} م/ث`, en: `${ms - 5} m/s` },
    { ar: `${ms + 5} م/ث`, en: `${ms + 5} m/s` },
    { ar: `${ms + 10} م/ث`, en: `${ms + 10} m/s` }
  ];
  const shuf = [opts[1], opts[0], opts[2], opts[3]]; // correct is index 1
  questions.push(createQuestion(
    'easy',
    `سيارة تسير بسرعة \\( ${item.kmh} \\) كم/ساعة، كم تبلغ سرعتها بوحدة متر/ثانية؟`,
    `A car is traveling at \\( ${item.kmh} \\) km/h. What is its speed in meters per second?`,
    shuf,
    1,
    `للتحويل من كم/س إلى م/ث نضرب في \\( \\frac{5}{18} \\): \\( ${item.kmh} \\times \\frac{5}{18} = ${ms} \\) م/ث.`,
    `To convert km/h to m/s, multiply by \\( \\frac{5}{18} \\): \\( ${item.kmh} \\times \\frac{5}{18} = ${ms} \\) m/s.`
  ));
});

speedAndClock.slice(5, 8).forEach(item => {
  const kmh = item.kmh;
  const opts = [
    { ar: `${kmh} كم/ساعة`, en: `${kmh} km/h` },
    { ar: `${kmh - 18} كم/ساعة`, en: `${kmh - 18} km/h` },
    { ar: `${kmh + 18} كم/ساعة`, en: `${kmh + 18} km/h` },
    { ar: `${kmh + 10} كم/ساعة`, en: `${kmh + 10} km/h` }
  ];
  const shuf = [opts[2], opts[1], opts[3], opts[0]]; // correct is index 3
  questions.push(createQuestion(
    'easy',
    `يجري عداء بسرعة \\( ${item.ms} \\) م/ث، فما مقدار سرعته بوحدة كم/ساعة؟`,
    `A runner runs at \\( ${item.ms} \\) m/s. What is their speed in km/h?`,
    shuf,
    3,
    `للتحويل من م/ث إلى كم/س نضرب في \\( \\frac{18}{5} \\): \\( ${item.ms} \\times \\frac{18}{5} = ${kmh} \\) كم/ساعة.`,
    `To convert m/s to km/h, multiply by \\( \\frac{18}{5} \\): \\( ${item.ms} \\times \\frac{18}{5} = ${kmh} \\) km/h.`
  ));
});

speedAndClock.slice(8).forEach(item => {
  const deg = item.angle;
  const opts = [
    { ar: `${deg}^\\circ`, en: `${deg}°` },
    { ar: `${deg - 30}^\\circ`, en: `${deg - 30}°` },
    { ar: `${deg + 30}^\\circ`, en: `${deg + 30}°` },
    { ar: `${deg + 15}^\\circ`, en: `${deg + 15}°` }
  ];
  const shuf = [opts[0], opts[1], opts[2], opts[3]]; // correct is index 0
  questions.push(createQuestion(
    'easy',
    `ما مقدار الزاوية الصغرى بين عقربي الساعات والدقائق تمام الساعة \\( ${item.hr}:00 \\)؟`,
    `What is the smaller angle between the hour hand and minute hand at exactly \\( ${item.hr}:00 \\)?`,
    shuf,
    0,
    `كل ساعة تمثل \\( 30^\\circ \\): الزاوية = \\( ${item.hr} \\times 30^\\circ = ${deg}^\\circ \\).`,
    `Each hour represents \\( 30^\\circ \\): Angle = \\( ${item.hr} \\times 30^\\circ = ${deg}^\\circ \\).`
  ));
});

// ==========================================
// 50 MEDIUM QUESTIONS
// ==========================================
// 51-65: Catch-up Problems (Same direction, different start times/speeds)
// t_catch = (v1 * t0) / (v2 - v1)
const catchUpData = [
  { v1: 60, v2: 80, t0: 2, tAns: 6, dAns: 480 },
  { v1: 70, v2: 90, t0: 2, tAns: 7, dAns: 630 },
  { v1: 80, v2: 100, t0: 1, tAns: 4, dAns: 400 },
  { v1: 60, v2: 90, t0: 2, tAns: 4, dAns: 360 },
  { v1: 50, v2: 75, t0: 3, tAns: 6, dAns: 450 },
  { v1: 80, v2: 120, t0: 1.5, tAns: 3, dAns: 360 },
  { v1: 90, v2: 120, t0: 1, tAns: 3, dAns: 360 },
  { v1: 60, v2: 100, t0: 2, tAns: 3, dAns: 300 },
  { v1: 75, v2: 100, t0: 2, tAns: 6, dAns: 600 },
  { v1: 50, v2: 80, t0: 3, tAns: 5, dAns: 400 },
  { v1: 40, v2: 60, t0: 2, tAns: 4, dAns: 240 },
  { v1: 60, v2: 80, t0: 1, tAns: 3, dAns: 240 },
  { v1: 80, v2: 100, t0: 2, tAns: 8, dAns: 800 },
  { v1: 90, v2: 110, t0: 2, tAns: 9, dAns: 990 },
  { v1: 70, v2: 105, t0: 2, tAns: 4, dAns: 420 }
];

catchUpData.forEach((item, idx) => {
  const t = item.tAns;
  const opts = [
    { ar: `${t} ساعات`, en: `${t} hours` },
    { ar: `${t + 1} ساعات`, en: `${t + 1} hours` },
    { ar: `${t - 1} ساعات`, en: `${t - 1} hours` },
    { ar: `${t + 2} ساعات`, en: `${t + 2} hours` }
  ];
  const shuf = [opts[2], opts[0], opts[1], opts[3]]; // correct is index 1
  questions.push(createQuestion(
    'medium',
    `انطلقت سيارة أولى بسرعة \\( ${item.v1} \\) كم/ساعة، وبعد مرور \\( ${item.t0} \\) ساعة انطلقت سيارة ثانية من نفس المكان وفي نفس الاتجاه بسرعة \\( ${item.v2} \\) كم/ساعة. بعد كم ساعة من انطلاق السيارة الثانية تلتقي بالسيارة الأولى؟`,
    `A first car departed at \\( ${item.v1} \\) km/h. \\( ${item.t0} \\) hours later, a second car departed from the same place in the same direction at \\( ${item.v2} \\) km/h. How many hours after the second car's departure will it catch up with the first?`,
    shuf,
    1,
    `فارق المسافة = \\( ${item.v1} \\times ${item.t0} = ${item.v1 * item.t0} \\) كم. فارق السرعتين = \\( ${item.v2} - ${item.v1} = ${item.v2 - item.v1} \\) كم/ساعة. زمن اللحاق = \\( \\frac{${item.v1 * item.t0}}{${item.v2 - item.v1}} = ${t} \\) ساعات.`,
    `Lead distance = \\( ${item.v1} \\times ${item.t0} = ${item.v1 * item.t0} \\) km. Relative speed = \\( ${item.v2} - ${item.v1} = ${item.v2 - item.v1} \\) km/h. Catch-up time = \\( \\frac{${item.v1 * item.t0}}{${item.v2 - item.v1}} = ${t} \\) hours.`
  ));
});

// 66-80: Meeting Problems (Opposite directions: t = D / (v1 + v2))
const meetingData = [
  { D: 450, v1: 70, v2: 80, t: 3 },
  { D: 560, v1: 60, v2: 80, t: 4 },
  { D: 600, v1: 90, v2: 110, t: 3 },
  { D: 720, v1: 50, v2: 70, t: 6 },
  { D: 500, v1: 45, v2: 55, t: 5 },
  { D: 630, v1: 85, v2: 55, t: 4.5, tStr: '4.5', tAr: '4 ساعات ونصف', tEn: '4.5 hours' },
  { D: 360, v1: 50, v2: 70, t: 3 },
  { D: 480, v1: 55, v2: 65, t: 4 },
  { D: 700, v1: 65, v2: 75, t: 5 },
  { D: 810, v1: 80, v2: 100, t: 4.5, tStr: '4.5', tAr: '4 ساعات ونصف', tEn: '4.5 hours' },
  { D: 390, v1: 60, v2: 70, t: 3 },
  { D: 540, v1: 80, v2: 100, t: 3 },
  { D: 420, v1: 65, v2: 75, t: 3 },
  { D: 640, v1: 75, v2: 85, t: 4 },
  { D: 750, v1: 70, v2: 80, t: 5 }
];

meetingData.forEach((item, idx) => {
  const t = item.t;
  const tStrAr = item.tAr || `${t} ساعات`;
  const tStrEn = item.tEn || `${t} hours`;
  const opts = [
    { ar: tStrAr, en: tStrEn },
    { ar: `${t + 1} ساعات`, en: `${t + 1} hours` },
    { ar: `${t - 1} ساعات`, en: `${t - 1} hours` },
    { ar: `${t + 2} ساعات`, en: `${t + 2} hours` }
  ];
  const shuf = [opts[1], opts[0], opts[2], opts[3]]; // correct is index 1
  questions.push(createQuestion(
    'medium',
    `المسافة بين مدينتين \\( ${item.D} \\) كم. انطلقت سيارة من المدينة الأولى باتجاه الثانية بسرعة \\( ${item.v1} \\) كم/ساعة، وفي نفس الوقت انطلقت سيارة أخرى من المدينة الثانية باتجاه الأولى بسرعة \\( ${item.v2} \\) كم/ساعة. بعد كم ساعة تلتقي السيارتان؟`,
    `The distance between two cities is \\( ${item.D} \\) km. A car left the first city towards the second at \\( ${item.v1} \\) km/h, and at the same time another car left the second city towards the first at \\( ${item.v2} \\) km/h. In how many hours will they meet?`,
    shuf,
    1,
    `مجموع السرعتين = \\( ${item.v1} + ${item.v2} = ${item.v1 + item.v2} \\) كم/ساعة. زمن اللقاء = \\( \\frac{${item.D}}{${item.v1 + item.v2}} = ${t} \\) ساعات.`,
    `Combined speed = \\( ${item.v1} + ${item.v2} = ${item.v1 + item.v2} \\) km/h. Meeting time = \\( \\frac{${item.D}}{${item.v1 + item.v2}} = ${t} \\) hours.`
  ));
});

// 81-90: Harmonic Mean Round-Trip Average Speed (2*v1*v2 / (v1 + v2))
const avgSpeedHarmonic = [
  { v1: 60, v2: 40, vAvg: 48 },
  { v1: 120, v2: 80, vAvg: 96 },
  { v1: 90, v2: 60, vAvg: 72 },
  { v1: 100, v2: 60, vAvg: 75 },
  { v1: 120, v2: 60, vAvg: 80 },
  { v1: 80, v2: 120, vAvg: 96 },
  { v1: 150, v2: 100, vAvg: 120 },
  { v1: 75, v2: 50, vAvg: 60 },
  { v1: 60, v2: 30, vAvg: 40 },
  { v1: 90, v2: 45, vAvg: 60 }
];

avgSpeedHarmonic.forEach((item, idx) => {
  const ans = item.vAvg;
  const opts = [
    { ar: `${ans} كم/ساعة`, en: `${ans} km/h` },
    { ar: `${(item.v1 + item.v2) / 2} كم/ساعة`, en: `${(item.v1 + item.v2) / 2} km/h` },
    { ar: `${ans - 6} كم/ساعة`, en: `${ans - 6} km/h` },
    { ar: `${ans + 8} كم/ساعة`, en: `${ans + 8} km/h` }
  ];
  const shuf = [opts[1], opts[2], opts[0], opts[3]]; // correct is index 2
  questions.push(createQuestion(
    'medium',
    `سافر مسافر من الرياض إلى القصيم بسرعة \\( ${item.v1} \\) كم/ساعة، وعاد على نفس الطريق بسرعة \\( ${item.v2} \\) كم/ساعة. ما متوسط سرعته في رحلة الذهاب والإياب معاً؟`,
    `A traveler drove from Riyadh to Qassim at \\( ${item.v1} \\) km/h, and returned along the same route at \\( ${item.v2} \\) km/h. What was the average speed for the entire round trip?`,
    shuf,
    2,
    `السرعة المتوسطة لرحلة الذهاب والإياب = \\( \\frac{2 v_1 v_2}{v_1 + v_2} = \\frac{2 \\times ${item.v1} \\times ${item.v2}}{${item.v1 + item.v2}} = ${ans} \\) كم/ساعة (وليس المتوسط الحسابي العادي).`,
    `Round-trip average speed = \\( \\frac{2 v_1 v_2}{v_1 + v_2} = \\frac{2 \\times ${item.v1} \\times ${item.v2}}{${item.v1 + item.v2}} = ${ans} \\) km/h (harmonic mean, not arithmetic mean).`
  ));
});

// 91-100: Work Together (t1 * t2 / (t1 + t2))
const workTogetherData = [
  { t1: 6, t2: 3, T: 2, jobAr: 'طلاء جدار', jobEn: 'painting a wall' },
  { t1: 4, t2: 12, T: 3, jobAr: 'إنجاز عمل', jobEn: 'completing a project' },
  { t1: 5, t2: 20, T: 4, jobAr: 'حفر خندق', jobEn: 'digging a trench' },
  { t1: 6, t2: 12, T: 4, jobAr: 'صيانة مبنى', jobEn: 'building maintenance' },
  { t1: 10, t2: 15, T: 6, jobAr: 'بناء سور', jobEn: 'building a fence' },
  { t1: 12, t2: 24, T: 8, jobAr: 'تنسيق حديقة', jobEn: 'landscaping a garden' },
  { t1: 8, t2: 24, T: 6, jobAr: 'تصميم موقع', jobEn: 'designing a website' },
  { t1: 15, t2: 30, T: 10, jobAr: 'تعبئة مستودع', jobEn: 'stocking a warehouse' },
  { t1: 20, t2: 30, T: 12, jobAr: 'تنظيف قاعة', jobEn: 'cleaning a hall' },
  { t1: 12, t2: 6, T: 4, jobAr: 'إصلاح طريق', jobEn: 'repairing a road' }
];

workTogetherData.forEach((item, idx) => {
  const T = item.T;
  const opts = [
    { ar: `${T} ساعات`, en: `${T} hours` },
    { ar: `${T + 1} ساعات`, en: `${T + 1} hours` },
    { ar: `${T + 2} ساعات`, en: `${T + 2} hours` },
    { ar: `${(item.t1 + item.t2) / 2} ساعات`, en: `${(item.t1 + item.t2) / 2} hours` }
  ];
  const shuf = [opts[0], opts[1], opts[2], opts[3]]; // correct is index 0
  questions.push(createQuestion(
    'medium',
    `يستطيع العامل الأول إنجاز ${item.jobAr} في \\( ${item.t1} \\) ساعات، بينما ينجزه العامل الثاني في \\( ${item.t2} \\) ساعات بمفرده. إذا عملا معاً، فكم ساعة يستغرقان لإنجاز العمل كاملاً؟`,
    `A first worker can finish ${item.jobEn} in \\( ${item.t1} \\) hours, while a second worker finishes it in \\( ${item.t2} \\) hours alone. If they work together, how many hours will it take them to complete the entire job?`,
    shuf,
    0,
    `زمن العمل المشترك = \\( \\frac{t_1 \\times t_2}{t_1 + t_2} = \\frac{${item.t1} \\times ${item.t2}}{${item.t1 + item.t2}} = \\frac{${item.t1 * item.t2}}{${item.t1 + item.t2}} = ${T} \\) ساعات.`,
    `Combined time = \\( \\frac{t_1 \\times t_2}{t_1 + t_2} = \\frac{${item.t1} \\times ${item.t2}}{${item.t1 + item.t2}} = \\frac{${item.t1 * item.t2}}{${item.t1 + item.t2}} = ${T} \\) hours.`
  ));
});

// ==========================================
// 50 HARD QUESTIONS
// ==========================================
// 101-115: Filling & Draining Tank Problems (1/T = 1/tin - 1/tout)
const tankFillDrain = [
  { tIn: 4, tOut: 6, T: 12 },
  { tIn: 6, tOut: 8, T: 24 },
  { tIn: 3, tOut: 4, T: 12 },
  { tIn: 6, tOut: 9, T: 18 },
  { tIn: 10, tOut: 15, T: 30 },
  { tIn: 8, tOut: 12, T: 24 },
  { tIn: 5, tOut: 10, T: 10 },
  { tIn: 6, tOut: 10, T: 15 },
  { tIn: 12, tOut: 16, T: 48 },
  { tIn: 4, tOut: 5, T: 20 },
  { tIn: 9, tOut: 12, T: 36 },
  { tIn: 8, tOut: 24, T: 12 },
  { tIn: 15, tOut: 20, T: 60 },
  { tIn: 10, tOut: 12, T: 60 },
  { tIn: 6, tOut: 7.5, T: 30 }
];

tankFillDrain.forEach((item, idx) => {
  const T = item.T;
  const d1 = T + 4;
  let d2 = T > 5 ? T - 4 : T + 6;
  let d3 = item.tIn + item.tOut;
  if (d3 === d2 || d3 === T || d3 === d1) d3 = T + 8;
  if (d2 === T || d2 === d1) d2 = T + 10;
  const opts = [
    { ar: `${T} ساعة`, en: `${T} hours` },
    { ar: `${d1} ساعات`, en: `${d1} hours` },
    { ar: `${d2} ساعات`, en: `${d2} hours` },
    { ar: `${d3} ساعات`, en: `${d3} hours` }
  ];
  const shuf = [opts[2], opts[3], opts[0], opts[1]]; // correct is index 2
  questions.push(createQuestion(
    'hard',
    `حنفية أولى تملأ خزاناً في \\( ${item.tIn} \\) ساعات، وصنبور تفريغ في أسفل الخزان يفرغه كاملاً في \\( ${item.tOut} \\) ساعات. إذا فُتحت الحنفية وصنبور التفريغ معاً والخزان فارغ، فكم ساعة يستغرق ملء الخزان بالكامل؟`,
    `An inlet pipe fills a tank in \\( ${item.tIn} \\) hours, while a drainage outlet empties it in \\( ${item.tOut} \\) hours. If both are opened together with the tank initially empty, how many hours will it take to fill the tank completely?`,
    shuf,
    2,
    `معدل الامتلاء الصافي في الساعة = \\( \\frac{1}{${item.tIn}} - \\frac{1}{${item.tOut}} = \\frac{1}{${T}} \\). إذن يستغرق الخزان \\( ${T} \\) ساعة ليمتلئ.`,
    `Net filling rate = \\( \\frac{1}{${item.tIn}} - \\frac{1}{${item.tOut}} = \\frac{1}{${T}} \\) per hour. Therefore, it takes \\( ${T} \\) hours to fill the tank.`
  ));
});

// 116-125: Three Workers / Three Pipes Together (1/T = 1/a + 1/b + 1/c)
const threePipes = [
  { t1: 2, t2: 3, t3: 6, T: 1 },
  { t1: 3, t2: 4, t3: 12, T: 1.5, tStr: '1.5', tAr: 'ساعة ونصف', tEn: '1.5 hours' },
  { t1: 4, t2: 6, t3: 12, T: 2 },
  { t1: 6, t2: 10, t3: 15, T: 3 },
  { t1: 8, t2: 12, t3: 24, T: 4 },
  { t1: 5, t2: 10, t3: 10, T: 2.5, tStr: '2.5', tAr: 'ساعتين ونصف', tEn: '2.5 hours' },
  { t1: 6, t2: 6, t3: 6, T: 2 },
  { t1: 9, t2: 18, t3: 18, T: 4.5, tStr: '4.5', tAr: '4 ساعات ونصف', tEn: '4.5 hours' },
  { t1: 10, t2: 15, t3: 30, T: 5 },
  { t1: 12, t2: 20, t3: 30, T: 6 }
];

threePipes.forEach((item, idx) => {
  const T = item.T;
  const tAr = item.tAr || `${T} ساعات`;
  const tEn = item.tEn || `${T} hours`;
  const opts = [
    { ar: tAr, en: tEn },
    { ar: `${T + 1} ساعات`, en: `${T + 1} hours` },
    { ar: `${T + 2} ساعات`, en: `${T + 2} hours` },
    { ar: `${T + 3} ساعات`, en: `${T + 3} hours` }
  ];
  const shuf = [opts[1], opts[0], opts[2], opts[3]]; // correct is index 1
  questions.push(createQuestion(
    'hard',
    `ثلاث مضخات ماء: الأولى تملأ بركة في \\( ${item.t1} \\) ساعات، والثانية في \\( ${item.t2} \\) ساعات، والثالثة في \\( ${item.t3} \\) ساعة. إذا اشتغلت المضخات الثلاث معاً، ففي كم ساعة تمتلئ البركة؟`,
    `Three water pumps: the first fills a pool in \\( ${item.t1} \\) hours, the second in \\( ${item.t2} \\) hours, and the third in \\( ${item.t3} \\) hours. If all three work together, how many hours will it take to fill the pool?`,
    shuf,
    1,
    `المعدل المشترك = \\( \\frac{1}{${item.t1}} + \\frac{1}{${item.t2}} + \\frac{1}{${item.t3}} = \\frac{1}{${T}} \\). إذن الزمن = ${tAr}.`,
    `Combined rate = \\( \\frac{1}{${item.t1}} + \\frac{1}{${item.t2}} + \\frac{1}{${item.t3}} = \\frac{1}{${T}} \\). Thus, total time = ${tEn}.`
  ));
});

// 126-135: Clock Angle with Minutes Formula (|11/2 M - 30 H|)
const clockAngles = [
  { H: 3, M: 20, deg: 20 },
  { H: 4, M: 30, deg: 45 },
  { H: 8, M: 20, deg: 130 },
  { H: 2, M: 15, deg: 22.5 },
  { H: 7, M: 20, deg: 100 },
  { H: 5, M: 40, deg: 70 },
  { H: 1, M: 10, deg: 25 },
  { H: 9, M: 30, deg: 105 },
  { H: 6, M: 20, deg: 70 },
  { H: 10, M: 10, deg: 115 }
];

clockAngles.forEach((item, idx) => {
  const deg = item.deg;
  const opts = [
    { ar: `${deg}^\\circ`, en: `${deg}°` },
    { ar: `${deg + 15}^\\circ`, en: `${deg + 15}°` },
    { ar: `${deg - 10}^\\circ`, en: `${deg - 10}°` },
    { ar: `${deg + 30}^\\circ`, en: `${deg + 30}°` }
  ];
  const shuf = [opts[2], opts[1], opts[0], opts[3]]; // correct is index 2
  questions.push(createQuestion(
    'hard',
    `ما قياس الزاوية الصغرى بين عقربي الساعات والدقائق عند الساعة \\( ${item.H}:${item.M < 10 ? '0' + item.M : item.M} \\)؟`,
    `What is the measure of the smaller angle between the hour and minute hands at \\( ${item.H}:${item.M < 10 ? '0' + item.M : item.M} \\)?`,
    shuf,
    2,
    `قانون زاوية العقارب = \\( |30 H - 5.5 M| = |30(${item.H}) - 5.5(${item.M})| = ${deg}^\\circ \\).`,
    `Clock angle formula = \\( |30 H - 5.5 M| = |30(${item.H}) - 5.5(${item.M})| = ${deg}^\\circ \\).`
  ));
});

// 136-145: Train Passing Bridge/Tunnel (d = L_train + L_tunnel)
const trainTunnel = [
  { LTrain: 200, LTunnel: 400, vKmh: 72, vMs: 20, tSec: 30 },
  { LTrain: 150, LTunnel: 450, vKmh: 54, vMs: 15, tSec: 40 },
  { LTrain: 300, LTunnel: 600, vKmh: 90, vMs: 25, tSec: 36 },
  { LTrain: 250, LTunnel: 350, vKmh: 72, vMs: 20, tSec: 30 },
  { LTrain: 180, LTunnel: 420, vKmh: 108, vMs: 30, tSec: 20 },
  { LTrain: 240, LTunnel: 480, vKmh: 72, vMs: 20, tSec: 36 },
  { LTrain: 100, LTunnel: 500, vKmh: 54, vMs: 15, tSec: 40 },
  { LTrain: 350, LTunnel: 650, vKmh: 90, vMs: 25, tSec: 40 },
  { LTrain: 120, LTunnel: 280, vKmh: 72, vMs: 20, tSec: 20 },
  { LTrain: 200, LTunnel: 800, vKmh: 90, vMs: 25, tSec: 40 }
];

trainTunnel.forEach((item, idx) => {
  const t = item.tSec;
  const opts = [
    { ar: `${t} ثانية`, en: `${t} seconds` },
    { ar: `${t + 10} ثانية`, en: `${t + 10} seconds` },
    { ar: `${t - 10} ثانية`, en: `${t - 10} seconds` },
    { ar: `${t + 5} ثوانٍ`, en: `${t + 5} seconds` }
  ];
  const shuf = [opts[0], opts[1], opts[2], opts[3]]; // correct is index 0
  questions.push(createQuestion(
    'hard',
    `قطار طوله \\( ${item.LTrain} \\) متر يسير بسرعة منتظمة قدرها \\( ${item.vKmh} \\) كم/ساعة. كم ثانية يستغرق هذا القطار ليعبر نفقاً طوله \\( ${item.LTunnel} \\) متر بالكامل؟`,
    `A train of length \\( ${item.LTrain} \\) m travels at a constant speed of \\( ${item.vKmh} \\) km/h. How many seconds will it take to completely pass through a tunnel of length \\( ${item.LTunnel} \\) m?`,
    shuf,
    0,
    `المسافة الكلية = طول القطار + طول النفق = \\( ${item.LTrain} + ${item.LTunnel} = ${item.LTrain + item.LTunnel} \\) متر. السرعة = \\( ${item.vKmh} \\times \\frac{5}{18} = ${item.vMs} \\) م/ث. الزمن = \\( \\frac{${item.LTrain + item.LTunnel}}{${item.vMs}} = ${t} \\) ثانية.`,
    `Total distance = Train length + Tunnel length = \\( ${item.LTrain} + ${item.LTunnel} = ${item.LTrain + item.LTunnel} \\) m. Speed = \\( ${item.vKmh} \\times \\frac{5}{18} = ${item.vMs} \\) m/s. Time = \\( \\frac{${item.LTrain + item.LTunnel}}{${item.vMs}} = ${t} \\) seconds.`
  ));
});

// 146-150: Circular Track Meeting & Relative Speed
const circTracks = [
  { C: 600, v1: 7, v2: 5, tOpp: 50, tSame: 300, dirAr: 'في اتجاهين متعاكسين', dirEn: 'in opposite directions' },
  { C: 800, v1: 9, v2: 7, tOpp: 50, tSame: 400, dirAr: 'في نفس الاتجاه', dirEn: 'in the same direction' },
  { C: 1200, v1: 15, v2: 10, tOpp: 48, tSame: 240, dirAr: 'في اتجاهين متعاكسين', dirEn: 'in opposite directions' },
  { C: 1000, v1: 14, v2: 6, tOpp: 50, tSame: 125, dirAr: 'في نفس الاتجاه', dirEn: 'in the same direction' },
  { C: 900, v1: 12, v2: 8, tOpp: 45, tSame: 225, dirAr: 'في اتجاهين متعاكسين', dirEn: 'in opposite directions' }
];

circTracks.forEach((item, idx) => {
  const isOpp = item.dirAr.includes('متعاكسين');
  const t = isOpp ? item.tOpp : item.tSame;
  const relSpeed = isOpp ? (item.v1 + item.v2) : (item.v1 - item.v2);
  const opts = [
    { ar: `${t} ثانية`, en: `${t} seconds` },
    { ar: `${t + 25} ثانية`, en: `${t + 25} seconds` },
    { ar: `${t - 15} ثانية`, en: `${t - 15} seconds` },
    { ar: `${t + 40} ثانية`, en: `${t + 40} seconds` }
  ];
  const shuf = [opts[2], opts[3], opts[1], opts[0]]; // correct is index 3
  questions.push(createQuestion(
    'hard',
    `يدور عداءان حول مضمار دائري طوله \\( ${item.C} \\) متر من نفس نقطة البداية. سرعة العداء الأول \\( ${item.v1} \\) م/ث وسرعة الثاني \\( ${item.v2} \\) م/ث، وركضا ${item.dirAr}. بعد كم ثانية يلتقيان لأول مرة؟`,
    `Two runners run around a circular track of circumference \\( ${item.C} \\) m starting from the same point. The first runner's speed is \\( ${item.v1} \\) m/s and the second's is \\( ${item.v2} \\) m/s, running ${item.dirEn}. After how many seconds will they first meet?`,
    shuf,
    3,
    `السرعة النسبية = \\( ${isOpp ? item.v1 + ' + ' + item.v2 : item.v1 + ' - ' + item.v2} = ${relSpeed} \\) م/ث. زمن اللقاء = \\( \\frac{${item.C}}{${relSpeed}} = ${t} \\) ثانية.`,
    `Relative speed = \\( ${isOpp ? item.v1 + ' + ' + item.v2 : item.v1 + ' - ' + item.v2} = ${relSpeed} \\) m/s. Meeting time = \\( \\frac{${item.C}}{${relSpeed}} = ${t} \\) seconds.`
  ));
});

console.log(`Generated ${questions.length} questions for Motion, Speed & Work Rates.`);
console.log('Easy count:', questions.filter(q => q.difficulty === 'easy').length);
console.log('Medium count:', questions.filter(q => q.difficulty === 'medium').length);
console.log('Hard count:', questions.filter(q => q.difficulty === 'hard').length);

// Read qudrat.json, remove 'Test Format & Strategy', append new questions
const qudPath = path.join(__dirname, '..', 'bank-data', 'qudrat.json');
const qudData = JSON.parse(fs.readFileSync(qudPath, 'utf8'));

const beforeCount = qudData.pool.length;
qudData.pool = qudData.pool.filter(q => q.domain !== 'Test Format & Strategy');
const afterTriviaRemoved = qudData.pool.length;

console.log(`Removed ${beforeCount - afterTriviaRemoved} trivia questions from qudrat.json.`);
qudData.pool = qudData.pool.concat(questions);
console.log(`New qudrat.pool total questions: ${qudData.pool.length}.`);

fs.writeFileSync(qudPath, JSON.stringify(qudData, null, 2) + '\n', 'utf8');
console.log('Successfully updated bank-data/qudrat.json.');
