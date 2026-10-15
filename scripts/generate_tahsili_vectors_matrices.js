#!/usr/bin/env node
/**
 * scripts/generate_tahsili_vectors_matrices.js
 * Generates 150 authentic, syllabus-aligned Vectors & Matrices questions
 * (50 Easy, 50 Medium, 50 Hard) to replace the 150 non-math "Test Format & Strategy"
 * trivia questions in bank-data/tahsili.json.
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
    domain: 'Vectors & Matrices',
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
// 1-10: Matrix Dimensions & Element Identification
const matDimData = [
  { r: 2, c: 3, name: 'A' },
  { r: 3, c: 2, name: 'B' },
  { r: 3, c: 4, name: 'C' },
  { r: 4, c: 2, name: 'D' },
  { r: 1, c: 4, name: 'E' },
  { r: 3, c: 3, name: 'F' },
  { r: 2, c: 2, name: 'G' },
  { r: 4, c: 1, name: 'H' },
  { r: 2, c: 4, name: 'K' },
  { r: 3, c: 1, name: 'M' }
];

matDimData.forEach((item, idx) => {
  const ans = `${item.r} \\times ${item.c}`;
  const d1 = (item.r === item.c) ? `${item.r} \\times ${item.c + 1}` : `${item.c} \\times ${item.r}`;
  const d2 = `${item.r + 1} \\times ${item.c}`;
  const d3 = (item.r === item.c) ? `${item.r - 1} \\times ${item.c - 1}` : `${item.r} \\times ${item.c + 1}`;
  const opts = [
    { ar: `\\( ${ans} \\)`, en: `\\( ${ans} \\)` },
    { ar: `\\( ${d1} \\)`, en: `\\( ${d1} \\)` },
    { ar: `\\( ${d2} \\)`, en: `\\( ${d2} \\)` },
    { ar: `\\( ${d3} \\)`, en: `\\( ${d3} \\)` }
  ];
  const shuf = [opts[1], opts[0], opts[2], opts[3]]; // correct is index 1
  questions.push(createQuestion(
    'easy',
    `إذا كانت المصفوفة \\( ${item.name} \\) تحتوي على \\( ${item.r} \\) صفوف و \\( ${item.c} \\) أعمدة، فما هي رتبة المصفوفة \\( ${item.name} \\)؟`,
    `If matrix \\( ${item.name} \\) has \\( ${item.r} \\) rows and \\( ${item.c} \\) columns, what is the order (dimension) of matrix \\( ${item.name} \\)?`,
    shuf,
    1,
    `رتبة المصفوفة = عدد الصفوف \\( \\times \\) عدد الأعمدة = \\( ${ans} \\).`,
    `Matrix dimensions = Rows \\( \\times \\) Columns = \\( ${ans} \\).`
  ));
});

// 11-20: Matrix Addition & Scalar Multiplication
const matAddScalar = [
  { a: 2, b: 5, c: 1, d: 3, k: 2 },
  { a: 3, b: -1, c: 4, d: 2, k: 3 },
  { a: 1, b: 4, c: 2, d: 5, k: 2 },
  { a: 5, b: 2, c: 0, d: 3, k: 4 },
  { a: -2, b: 3, c: 1, d: -4, k: 2 },
  { a: 4, b: 1, c: 3, d: 2, k: 3 },
  { a: 2, b: -3, c: 5, d: 1, k: 2 },
  { a: 1, b: 2, c: 3, d: 4, k: 5 },
  { a: 6, b: 0, c: -2, d: 4, k: 2 },
  { a: 3, b: 2, c: 1, d: -1, k: 3 }
];

matAddScalar.forEach((item, idx) => {
  const ansA = item.k * item.a;
  const ansB = item.k * item.b;
  const ansC = item.k * item.c;
  const ansD = item.k * item.d;
  const opts = [
    { ar: `\\( \\begin{bmatrix} ${ansA} & ${ansB} \\\\ ${ansC} & ${ansD} \\end{bmatrix} \\)`, en: `\\( \\begin{bmatrix} ${ansA} & ${ansB} \\\\ ${ansC} & ${ansD} \\end{bmatrix} \\)` },
    { ar: `\\( \\begin{bmatrix} ${ansA + 1} & ${ansB} \\\\ ${ansC} & ${ansD} \\end{bmatrix} \\)`, en: `\\( \\begin{bmatrix} ${ansA + 1} & ${ansB} \\\\ ${ansC} & ${ansD} \\end{bmatrix} \\)` },
    { ar: `\\( \\begin{bmatrix} ${ansA} & ${ansB - 1} \\\\ ${ansC} & ${ansD} \\end{bmatrix} \\)`, en: `\\( \\begin{bmatrix} ${ansA} & ${ansB - 1} \\\\ ${ansC} & ${ansD} \\end{bmatrix} \\)` },
    { ar: `\\( \\begin{bmatrix} ${item.a} & ${item.b} \\\\ ${item.c} & ${item.d} \\end{bmatrix} \\)`, en: `\\( \\begin{bmatrix} ${item.a} & ${item.b} \\\\ ${item.c} & ${item.d} \\end{bmatrix} \\)` }
  ];
  const shuf = [opts[0], opts[1], opts[2], opts[3]]; // correct is index 0
  questions.push(createQuestion(
    'easy',
    `إذا كانت المصفوفة \\( A = \\begin{bmatrix} ${item.a} & ${item.b} \\\\ ${item.c} & ${item.d} \\end{bmatrix} \\)، فما ناتج ضرب المصفوفة في العدد \\( ${item.k} \\) أي \\( ${item.k}A \\)؟`,
    `If matrix \\( A = \\begin{bmatrix} ${item.a} & ${item.b} \\\\ ${item.c} & ${item.d} \\end{bmatrix} \\), what is the scalar product \\( ${item.k}A \\)?`,
    shuf,
    0,
    `ضرب مصفوفة في عدد ثابت يعني ضرب جميع عناصرها في هذا العدد: \\( ${item.k}A = \\begin{bmatrix} ${ansA} & ${ansB} \\\\ ${ansC} & ${ansD} \\end{bmatrix} \\).`,
    `Multiplying a matrix by a scalar multiplies every element: \\( ${item.k}A = \\begin{bmatrix} ${ansA} & ${ansB} \\\\ ${ansC} & ${ansD} \\end{bmatrix} \\).`
  ));
});

// 21-30: Matrix Equality Solving for x
const matEquality = [
  { xCoeff: 2, cVal: 8, xAns: 4 },
  { xCoeff: 3, cVal: 15, xAns: 5 },
  { xCoeff: 4, cVal: 24, xAns: 6 },
  { xCoeff: 5, cVal: 35, xAns: 7 },
  { xCoeff: 2, cVal: 18, xAns: 9 },
  { xCoeff: 3, cVal: -12, xAns: -4 },
  { xCoeff: 6, cVal: 48, xAns: 8 },
  { xCoeff: 4, cVal: -20, xAns: -5 },
  { xCoeff: 7, cVal: 21, xAns: 3 },
  { xCoeff: 5, cVal: -40, xAns: -8 }
];

matEquality.forEach((item, idx) => {
  const ans = item.xAns;
  const opts = [
    { ar: `\\( x = ${ans} \\)`, en: `\\( x = ${ans} \\)` },
    { ar: `\\( x = ${ans + 2} \\)`, en: `\\( x = ${ans + 2} \\)` },
    { ar: `\\( x = ${ans - 2} \\)`, en: `\\( x = ${ans - 2} \\)` },
    { ar: `\\( x = ${-ans} \\)`, en: `\\( x = ${-ans} \\)` }
  ];
  const shuf = [opts[2], opts[0], opts[1], opts[3]]; // correct is index 1
  questions.push(createQuestion(
    'easy',
    `إذا تساوت المصفوفتان \\( \\begin{bmatrix} ${item.xCoeff}x & 7 \\\\ 1 & 4 \\end{bmatrix} = \\begin{bmatrix} ${item.cVal} & 7 \\\\ 1 & 4 \\end{bmatrix} \\)، فما قيمة \\( x \\)؟`,
    `If the two matrices are equal: \\( \\begin{bmatrix} ${item.xCoeff}x & 7 \\\\ 1 & 4 \\end{bmatrix} = \\begin{bmatrix} ${item.cVal} & 7 \\\\ 1 & 4 \\end{bmatrix} \\), what is the value of \\( x \\)?`,
    shuf,
    1,
    `تتساوى المصفوفتان إذا تساوت العناصر المتناظرة: \\( ${item.xCoeff}x = ${item.cVal} \\Rightarrow x = ${ans} \\).`,
    `Matrices are equal if corresponding entries are equal: \\( ${item.xCoeff}x = ${item.cVal} \\Rightarrow x = ${ans} \\).`
  ));
});

// 31-40: Vector in Component Form AB = <x2 - x1, y2 - y1>
const vectorComponent = [
  { x1: 2, y1: 3, x2: 5, y2: 7, vx: 3, vy: 4 },
  { x1: 1, y1: 4, x2: 7, y2: 9, vx: 6, vy: 5 },
  { x1: 3, y1: 2, x2: 8, y2: 6, vx: 5, vy: 4 },
  { x1: -1, y1: 2, x2: 4, y2: 6, vx: 5, vy: 4 },
  { x1: 2, y1: -3, x2: 6, y2: 1, vx: 4, vy: 4 },
  { x1: 0, y1: 0, x2: 4, y2: 5, vx: 4, vy: 5 },
  { x1: 5, y1: 8, x2: 2, y2: 4, vx: -3, vy: -4 },
  { x1: -2, y1: -1, x2: 3, y2: 5, vx: 5, vy: 6 },
  { x1: 4, y1: 1, x2: 1, y2: 7, vx: -3, vy: 6 },
  { x1: 3, y1: 5, x2: 9, y2: 2, vx: 6, vy: -3 }
];

vectorComponent.forEach((item, idx) => {
  const ans = `\\langle ${item.vx}, ${item.vy} \\rangle`;
  const opts = [
    { ar: `\\( ${ans} \\)`, en: `\\( ${ans} \\)` },
    { ar: `\\( \\langle ${item.vx + 1}, ${item.vy} \\rangle \\)`, en: `\\( \\langle ${item.vx + 1}, ${item.vy} \\rangle \\)` },
    { ar: `\\( \\langle ${item.vx}, ${item.vy - 1} \\rangle \\)`, en: `\\( \\langle ${item.vx}, ${item.vy - 1} \\rangle \\)` },
    { ar: `\\( \\langle ${-item.vx}, ${-item.vy} \\rangle \\)`, en: `\\( \\langle ${-item.vx}, ${-item.vy} \\rangle \\)` }
  ];
  const shuf = [opts[3], opts[1], opts[0], opts[2]]; // correct is index 2
  questions.push(createQuestion(
    'easy',
    `إذا كانت نقطة بداية المتجه \\( A(${item.x1}, ${item.y1}) \\) ونقطة نهايته \\( B(${item.x2}, ${item.y2}) \\)، فما هي الصورة الإحداثية للمتجه \\( \\vec{AB} \\)؟`,
    `If the initial point of a vector is \\( A(${item.x1}, ${item.y1}) \\) and its terminal point is \\( B(${item.x2}, ${item.y2}) \\), what is the component form of \\( \\vec{AB} \\)?`,
    shuf,
    2,
    `الصورة الإحداثية = \\( \\langle x_2 - x_1, y_2 - y_1 \\rangle = \\langle ${item.x2} - (${item.x1}), ${item.y2} - (${item.y1}) \\rangle = ${ans} \\).`,
    `Component form = \\( \\langle x_2 - x_1, y_2 - y_1 \\rangle = ${ans} \\).`
  ));
});

// 41-50: Vector Magnitude ||v|| = sqrt(x^2 + y^2)
const vectorMagnitude = [
  { x: 3, y: 4, mag: 5 },
  { x: 6, y: 8, mag: 10 },
  { x: 5, y: 12, mag: 13 },
  { x: 8, y: 15, mag: 17 },
  { x: 7, y: 24, mag: 25 },
  { x: -3, y: 4, mag: 5 },
  { x: 9, y: 12, mag: 15 },
  { x: -6, y: -8, mag: 10 },
  { x: 12, y: 16, mag: 20 },
  { x: 15, y: 20, mag: 25 }
];

vectorMagnitude.forEach((item, idx) => {
  const m = item.mag;
  const opts = [
    { ar: `\\( ${m} \\)`, en: `\\( ${m} \\)` },
    { ar: `\\( ${m + 2} \\)`, en: `\\( ${m + 2} \\)` },
    { ar: `\\( ${m - 1} \\)`, en: `\\( ${m - 1} \\)` },
    { ar: `\\( ${m * 2} \\)`, en: `\\( ${m * 2} \\)` }
  ];
  const shuf = [opts[0], opts[1], opts[2], opts[3]]; // correct is index 0
  questions.push(createQuestion(
    'easy',
    `ما هو طول (مقدار) المتجه \\( \\vec{v} = \\langle ${item.x}, ${item.y} \\rangle \\)؟`,
    `What is the magnitude (length) of vector \\( \\vec{v} = \\langle ${item.x}, ${item.y} \\rangle \\)?`,
    shuf,
    0,
    `طول المتجه = \\( ||\\vec{v}|| = \\sqrt{x^2 + y^2} = \\sqrt{(${item.x})^2 + (${item.y})^2} = \\sqrt{${m * m}} = ${m} \\).`,
    `Vector magnitude = \\( ||\\vec{v}|| = \\sqrt{x^2 + y^2} = \\sqrt{(${item.x})^2 + (${item.y})^2} = ${m} \\).`
  ));
});

// ==========================================
// 50 MEDIUM QUESTIONS
// ==========================================
// 51-62: Matrix Multiplication Conditions & Products
const matMulData = [
  { r1: 2, c1: 3, r2: 3, c2: 4, resR: 2, resC: 4 },
  { r1: 3, c1: 2, r2: 2, c2: 5, resR: 3, resC: 5 },
  { r1: 1, c1: 3, r2: 3, c2: 1, resR: 1, resC: 1 },
  { r1: 4, c1: 2, r2: 2, c2: 3, resR: 4, resC: 3 },
  { r1: 2, c1: 2, r2: 2, c2: 4, resR: 2, resC: 4 },
  { r1: 3, c1: 1, r2: 1, c2: 3, resR: 3, resC: 3 },
  { r1: 2, c1: 4, r2: 4, c2: 2, resR: 2, resC: 2 },
  { r1: 4, c1: 3, r2: 3, c2: 2, resR: 4, resC: 2 },
  { r1: 3, c1: 3, r2: 3, c2: 1, resR: 3, resC: 1 },
  { r1: 1, c1: 4, r2: 4, c2: 3, resR: 1, resC: 3 },
  { r1: 2, c1: 3, r2: 3, c2: 2, resR: 2, resC: 2 },
  { r1: 5, c1: 2, r2: 2, c2: 1, resR: 5, resC: 1 }
];

matMulData.forEach((item, idx) => {
  const ans = `${item.resR} \\times ${item.resC}`;
  const d1 = `${item.c1} \\times ${item.r2}`;
  const d2 = (item.resR === item.resC) ? `${item.resR + 1} \\times ${item.resC}` : `${item.resC} \\times ${item.resR}`;
  const d3 = 'غير معرفة / Undefined';
  const opts = [
    { ar: `\\( ${ans} \\)`, en: `\\( ${ans} \\)` },
    { ar: `\\( ${d1} \\)`, en: `\\( ${d1} \\)` },
    { ar: `\\( ${d2} \\)`, en: `\\( ${d2} \\)` },
    { ar: `${d3}`, en: `${d3}` }
  ];
  const shuf = [opts[3], opts[0], opts[1], opts[2]]; // correct is index 1
  questions.push(createQuestion(
    'medium',
    `إذا كانت رتبة المصفوفة \\( A \\) هي \\( ${item.r1} \\times ${item.c1} \\) ورتبة المصفوفة \\( B \\) هي \\( ${item.r2} \\times ${item.c2} \\)، فما رتبة المصفوفة الناتجة من الضرب \\( A \\times B \\)؟`,
    `If matrix \\( A \\) has order \\( ${item.r1} \\times ${item.c1} \\) and matrix \\( B \\) has order \\( ${item.r2} \\times ${item.c2} \\), what is the order of the product matrix \\( A \\times B \\)?`,
    shuf,
    1,
    `شرط الضرب محقق لأن عدد أعمدة الأولى (\\( ${item.c1} \\)) يساوي عدد صفوف الثانية (\\( ${item.r2} \\)). رتبة الناتج تكون: صفوف الأولى \\( \\times \\) أعمدة الثانية = \\( ${ans} \\).`,
    `Multiplication is defined because cols of \\( A \\) (\\( ${item.c1} \\)) equals rows of \\( B \\) (\\( ${item.r2} \\)). Resulting order is \\( ${ans} \\).`
  ));
});

// 63-75: Determinants of 2x2 Matrices: det = ad - bc
const det2x2Data = [
  { a: 3, b: 2, c: 1, d: 4, det: 10 },
  { a: 5, b: 3, c: 2, d: 4, det: 14 },
  { a: 6, b: 1, c: 2, d: 3, det: 16 },
  { a: 4, b: -2, c: 3, d: 5, det: 26 },
  { a: 2, b: -3, c: -1, d: 4, det: 5 },
  { a: 7, b: 2, c: 4, d: 1, det: -1 },
  { a: 3, b: 5, c: 2, d: 6, det: 8 },
  { a: 8, b: 3, c: 2, d: 1, det: 2 },
  { a: 4, b: 6, c: 1, d: 2, det: 2 },
  { a: -3, b: 2, c: 4, d: -1, det: -5 },
  { a: 5, b: 2, c: 3, d: 1, det: -1 },
  { a: 6, b: 4, c: 3, d: 5, det: 18 },
  { a: 2, b: 7, c: 1, d: 5, det: 3 }
];

det2x2Data.forEach((item, idx) => {
  const ans = item.det;
  const d1 = ans + 4;
  let d2 = ans - 4;
  let d3 = item.a * item.d + item.b * item.c;
  if (d3 === ans || d3 === d1 || d3 === d2) d3 = ans + 8;
  if (d2 === ans || d2 === d1) d2 = ans - 8;
  const opts = [
    { ar: `\\( ${ans} \\)`, en: `\\( ${ans} \\)` },
    { ar: `\\( ${d1} \\)`, en: `\\( ${d1} \\)` },
    { ar: `\\( ${d2} \\)`, en: `\\( ${d2} \\)` },
    { ar: `\\( ${d3} \\)`, en: `\\( ${d3} \\)` }
  ];
  const shuf = [opts[2], opts[1], opts[0], opts[3]]; // correct is index 2
  questions.push(createQuestion(
    'medium',
    `ما قيمة محددة المصفوفة \\( \\begin{vmatrix} ${item.a} & ${item.b} \\\\ ${item.c} & ${item.d} \\end{vmatrix} \\)؟`,
    `What is the value of the determinant \\( \\begin{vmatrix} ${item.a} & ${item.b} \\\\ ${item.c} & ${item.d} \\end{vmatrix} \\)?`,
    shuf,
    2,
    `قيمة المحددة \\( 2 \\times 2 \\) = حاصل ضرب القطر الرئيسي مطروحاً منه حاصل ضرب القطر الآخر: \\( (${item.a})(${item.d}) - (${item.b})(${item.c}) = ${item.a * item.d} - (${item.b * item.c}) = ${ans} \\).`,
    `Determinant = \\( (${item.a})(${item.d}) - (${item.b})(${item.c}) = ${item.a * item.d} - (${item.b * item.c}) = ${ans} \\).`
  ));
});

// 76-85: Finding k such that Matrix has NO Inverse (det = 0)
const singularKData = [
  { a: 'k', b: 6, c: 2, d: 4, kAns: 3, textK: 'k' },
  { a: 4, b: 8, c: 3, d: 'k', kAns: 6, textK: 'k' },
  { a: 2, b: 'k', c: 3, d: 9, kAns: 6, textK: 'k' },
  { a: 6, b: 4, c: 'k', d: 2, kAns: 3, textK: 'k' },
  { a: 'k', b: 12, c: 3, d: 4, kAns: 9, textK: 'k' },
  { a: 5, b: 10, c: 2, d: 'k', kAns: 4, textK: 'k' },
  { a: 8, b: 'k', c: 4, d: 3, kAns: 6, textK: 'k' },
  { a: 'k', b: 15, c: 2, d: 5, kAns: 6, textK: 'k' },
  { a: 7, b: 14, c: 3, d: 'k', kAns: 6, textK: 'k' },
  { a: 9, b: 'k', c: 3, d: 2, kAns: 6, textK: 'k' }
];

singularKData.forEach((item, idx) => {
  const ans = item.kAns;
  const opts = [
    { ar: `\\( k = ${ans} \\)`, en: `\\( k = ${ans} \\)` },
    { ar: `\\( k = ${ans + 2} \\)`, en: `\\( k = ${ans + 2} \\)` },
    { ar: `\\( k = ${ans - 2} \\)`, en: `\\( k = ${ans - 2} \\)` },
    { ar: `\\( k = 0 \\)`, en: `\\( k = 0 \\)` }
  ];
  const shuf = [opts[0], opts[1], opts[2], opts[3]]; // correct is index 0
  questions.push(createQuestion(
    'medium',
    `ما قيمة \\( k \\) التي تجعل المصفوفة \\( \\begin{bmatrix} ${item.a} & ${item.b} \\\\ ${item.c} & ${item.d} \\end{bmatrix} \\) ليس لها نظير ضربي؟`,
    `What value of \\( k \\) makes the matrix \\( \\begin{bmatrix} ${item.a} & ${item.b} \\\\ ${item.c} & ${item.d} \\end{bmatrix} \\) have no multiplicative inverse?`,
    shuf,
    0,
    `تكون المصفوفة غير قابلة للعكس إذا كانت محددتها تساوي صفراً: \\( \\det = 0 \\Rightarrow ad - bc = 0 \\Rightarrow k = ${ans} \\).`,
    `A matrix has no inverse if its determinant equals zero: \\( \\det = 0 \\Rightarrow ad - bc = 0 \\Rightarrow k = ${ans} \\).`
  ));
});

// 86-93: Unit Vector in Direction of v: u = v / ||v||
const unitVectors = [
  { vx: 3, vy: 4, mag: 5 },
  { vx: 6, vy: 8, mag: 10 },
  { vx: 5, vy: 12, mag: 13 },
  { vx: 8, vy: 15, mag: 17 },
  { vx: -3, vy: 4, mag: 5 },
  { vx: 7, vy: 24, mag: 25 },
  { vx: -5, vy: -12, mag: 13 },
  { vx: 9, vy: 12, mag: 15 }
];

unitVectors.forEach((item, idx) => {
  const ans = `\\left\\langle \\frac{${item.vx}}{${item.mag}}, \\frac{${item.vy}}{${item.mag}} \\right\\rangle`;
  const opts = [
    { ar: `\\( ${ans} \\)`, en: `\\( ${ans} \\)` },
    { ar: `\\( \\left\\langle \\frac{${item.vy}}{${item.mag}}, \\frac{${item.vx}}{${item.mag}} \\right\\rangle \\)`, en: `\\( \\left\\langle \\frac{${item.vy}}{${item.mag}}, \\frac{${item.vx}}{${item.mag}} \\right\\rangle \\)` },
    { ar: `\\( \\left\\langle ${item.vx}, ${item.vy} \\right\\rangle \\)`, en: `\\( \\left\\langle ${item.vx}, ${item.vy} \\right\\rangle \\)` },
    { ar: `\\( \\left\\langle \\frac{1}{${item.mag}}, \\frac{1}{${item.mag}} \\right\\rangle \\)`, en: `\\( \\left\\langle \\frac{1}{${item.mag}}, \\frac{1}{${item.mag}} \\right\\rangle \\)` }
  ];
  const shuf = [opts[2], opts[0], opts[1], opts[3]]; // correct is index 1
  questions.push(createQuestion(
    'medium',
    `ما هو متجه الوحدة \\( \\vec{u} \\) الذي له نفس اتجاه المتجه \\( \\vec{v} = \\langle ${item.vx}, ${item.vy} \\rangle \\)؟`,
    `What is the unit vector \\( \\vec{u} \\) in the direction of \\( \\vec{v} = \\langle ${item.vx}, ${item.vy} \\rangle \\)?`,
    shuf,
    1,
    `متجه الوحدة = المتجه مقسوماً على طوله: \\( ||\\vec{v}|| = ${item.mag} \\Rightarrow \\vec{u} = \\frac{\\vec{v}}{||\\vec{v}||} = ${ans} \\).`,
    `Unit vector = vector divided by its length: \\( ||\\vec{v}|| = ${item.mag} \\Rightarrow \\vec{u} = \\frac{\\vec{v}}{||\\vec{v}||} = ${ans} \\).`
  ));
});

// 94-100: Dot Product in 2D & Orthogonal Vectors (u . v = 0)
const dotProductOrth = [
  { u1: 2, u2: 3, v1: 6, v2: -4, ans: 0, isOrth: true },
  { u1: 3, u2: 4, v1: 2, v2: 5, ans: 26, isOrth: false },
  { u1: 5, u2: -2, v1: 2, v2: 5, ans: 0, isOrth: true },
  { u1: 4, u2: 1, v1: 3, v2: -2, ans: 10, isOrth: false },
  { u1: -3, u2: 6, v1: 4, v2: 2, ans: 0, isOrth: true },
  { u1: 7, u2: 2, v1: 1, v2: 3, ans: 13, isOrth: false },
  { u1: 6, u2: -3, v1: 1, v2: 2, ans: 0, isOrth: true }
];

dotProductOrth.forEach((item, idx) => {
  const ans = item.ans;
  const d1 = ans + 5;
  let d2 = ans - 4;
  let d3 = item.u1 * item.v2 + item.u2 * item.v1;
  if (d3 === ans || d3 === d1 || d3 === d2) d3 = ans + 10;
  if (d2 === ans || d2 === d1) d2 = ans - 8;
  const opts = [
    { ar: `\\( ${ans} \\)`, en: `\\( ${ans} \\)` },
    { ar: `\\( ${d1} \\)`, en: `\\( ${d1} \\)` },
    { ar: `\\( ${d2} \\)`, en: `\\( ${d2} \\)` },
    { ar: `\\( ${d3} \\)`, en: `\\( ${d3} \\)` }
  ];
  const shuf = [opts[1], opts[2], opts[0], opts[3]]; // correct is index 2
  questions.push(createQuestion(
    'medium',
    `أوجد ناتج الضرب الداخلي (النقطي) للمتجهين: \\( \\vec{u} = \\langle ${item.u1}, ${item.u2} \\rangle \\) و \\( \\vec{v} = \\langle ${item.v1}, ${item.v2} \\rangle \\)؟`,
    `Find the dot (inner) product of vectors \\( \\vec{u} = \\langle ${item.u1}, ${item.u2} \\rangle \\) and \\( \\vec{v} = \\langle ${item.v1}, ${item.v2} \\rangle \\)?`,
    shuf,
    2,
    `الضرب الداخلي = \\( u_1 v_1 + u_2 v_2 = (${item.u1})(${item.v1}) + (${item.u2})(${item.v2}) = ${item.u1 * item.v1} + (${item.u2 * item.v2}) = ${ans} \\)${ans === 0 ? ' (المتجهان متعامدان)' : ''}.`,
    `Dot product = \\( u_1 v_1 + u_2 v_2 = ${ans} \\)${ans === 0 ? ' (vectors are orthogonal)' : ''}.`
  ));
});

// ==========================================
// 50 HARD QUESTIONS
// ==========================================
// 101-110: 3x3 Determinants
const det3x3Data = [
  { a: 1, b: 0, c: 2, d: 3, e: 1, f: 0, g: 2, h: 4, i: 1, det: -17 },
  { a: 2, b: 1, c: 0, d: 1, e: 3, f: 2, g: 0, h: 4, i: 1, det: -13 },
  { a: 3, b: 0, c: 1, d: 2, e: 4, f: 0, g: 1, h: 2, i: 3, det: 32 },
  { a: 1, b: 2, c: 3, d: 0, e: 1, f: 4, g: 5, h: 6, i: 0, det: 1 },
  { a: 2, b: 0, c: 1, d: 3, e: 2, f: 0, g: 1, h: 4, i: 2, det: 22 },
  { a: 1, b: 3, c: 2, d: 0, e: 2, f: 1, g: 4, h: 1, i: 0, det: -27 },
  { a: 3, b: 1, c: 2, d: 0, e: 4, f: 1, g: 2, h: 0, i: 1, det: 6 },
  { a: 2, b: 3, c: 1, d: 1, e: 0, f: 2, g: 3, h: 1, i: 0, det: 13 },
  { a: 4, b: 1, c: 0, d: 2, e: 3, f: 1, g: 0, h: 2, i: 5, det: 46 },
  { a: 1, b: 1, c: 1, d: 2, e: 3, f: 1, g: 1, h: 2, i: 4, det: 4 }
];

det3x3Data.forEach((item, idx) => {
  const ans = item.det;
  const opts = [
    { ar: `\\( ${ans} \\)`, en: `\\( ${ans} \\)` },
    { ar: `\\( ${ans + 5} \\)`, en: `\\( ${ans + 5} \\)` },
    { ar: `\\( ${ans - 6} \\)`, en: `\\( ${ans - 6} \\)` },
    { ar: `\\( ${-ans} \\)`, en: `\\( ${-ans} \\)` }
  ];
  const shuf = [opts[3], opts[0], opts[1], opts[2]]; // correct is index 1
  questions.push(createQuestion(
    'hard',
    `احسب قيمة محددة الرتبة الثالثة: \\( \\begin{vmatrix} ${item.a} & ${item.b} & ${item.c} \\\\ ${item.d} & ${item.e} & ${item.f} \\\\ ${item.g} & ${item.h} & ${item.i} \\end{vmatrix} \\)؟`,
    `Evaluate the \\( 3 \\times 3 \\) determinant: \\( \\begin{vmatrix} ${item.a} & ${item.b} & ${item.c} \\\\ ${item.d} & ${item.e} & ${item.f} \\\\ ${item.g} & ${item.h} & ${item.i} \\end{vmatrix} \\)?`,
    shuf,
    1,
    `بالفك عن طريق عناصر الصف الأول: \\( ${item.a}(${item.e * item.i - item.f * item.h}) - ${item.b}(${item.d * item.i - item.f * item.g}) + ${item.c}(${item.d * item.h - item.e * item.g}) = ${ans} \\).`,
    `Expanding along the first row: \\( \\det = ${ans} \\).`
  ));
});

// 111-118: Cramer's Rule for 2x2 Systems
const cramerData = [
  { a1: 2, b1: 1, c1: 7, a2: 1, b2: -1, c2: 2, x: 3, y: 1 },
  { a1: 3, b1: 2, c1: 12, a2: 1, b2: -1, c2: -1, x: 2, y: 3 },
  { a1: 4, b1: 3, c1: 18, a2: 2, b2: 1, c2: 8, x: 3, y: 2 },
  { a1: 5, b1: -2, c1: 16, a2: 2, b2: 3, c2: 14, x: 4, y: 2 },
  { a1: 1, b1: 2, c1: 8, a2: 3, b2: -1, c2: 3, x: 2, y: 3 },
  { a1: 2, b1: 3, c1: 13, a2: 3, b2: -2, c2: 0, x: 2, y: 3 },
  { a1: 3, b1: 1, c1: 11, a2: 2, b2: -3, c2: 0, x: 3, y: 2 },
  { a1: 4, b1: -1, c1: 10, a2: 2, b2: 3, c2: 12, x: 3, y: 2 }
];

cramerData.forEach((item, idx) => {
  const ansX = item.x;
  const opts = [
    { ar: `\\( x = ${ansX} \\)`, en: `\\( x = ${ansX} \\)` },
    { ar: `\\( x = ${ansX + 2} \\)`, en: `\\( x = ${ansX + 2} \\)` },
    { ar: `\\( x = ${ansX - 1} \\)`, en: `\\( x = ${ansX - 1} \\)` },
    { ar: `\\( x = ${-ansX} \\)`, en: `\\( x = ${-ansX} \\)` }
  ];
  const shuf = [opts[2], opts[0], opts[1], opts[3]]; // correct is index 1
  questions.push(createQuestion(
    'hard',
    `باستخدام قاعدة كرامر، ما قيمة المتغير \\( x \\) في النظام الخطي: \\( \\begin{cases} ${item.a1}x + ${item.b1}y = ${item.c1} \\\\ ${item.a2}x ${item.b2 < 0 ? '- ' + (-item.b2) : '+ ' + item.b2}y = ${item.c2} \\end{cases} \\)؟`,
    `Using Cramer's Rule, what is the value of \\( x \\) for the linear system: \\( \\begin{cases} ${item.a1}x + ${item.b1}y = ${item.c1} \\\\ ${item.a2}x ${item.b2 < 0 ? '- ' + (-item.b2) : '+ ' + item.b2}y = ${item.c2} \\end{cases} \\)?`,
    shuf,
    1,
    `محددة المعاملات \\( C = (${item.a1})(${item.b2}) - (${item.b1})(${item.a2}) = ${item.a1 * item.b2 - item.b1 * item.a2} \\). محددة \\( C_x = (${item.c1})(${item.b2}) - (${item.b1})(${item.c2}) = ${item.c1 * item.b2 - item.b1 * item.c2} \\). إذن \\( x = \\frac{C_x}{C} = ${ansX} \\).`,
    `Determinant \\( C = ${item.a1 * item.b2 - item.b1 * item.a2} \\), \\( C_x = ${item.c1 * item.b2 - item.b1 * item.c2} \\). Thus, \\( x = \\frac{C_x}{C} = ${ansX} \\).`
  ));
});

// 119-128: Direction Angle of a Vector (tan theta = y / x)
const dirAngles = [
  { vx: 1, vy: 1, deg: 45, quad: 'الربع الأول' },
  { vx: 0, vy: 5, deg: 90, quad: 'محور الصادات الموجب' },
  { vx: -1, vy: 1, deg: 135, quad: 'الربع الثاني' },
  { vx: -4, vy: 0, deg: 180, quad: 'محور السينات السالب' },
  { vx: -2, vy: -2, deg: 225, quad: 'الربع الثالث' },
  { vx: 0, vy: -3, deg: 270, quad: 'محور الصادات السالب' },
  { vx: 3, vy: -3, deg: 315, quad: 'الربع الرابع' },
  { vx: '\\sqrt{3}', vy: 1, deg: 30, quad: 'الربع الأول', vxNum: Math.sqrt(3) },
  { vx: 1, vy: '\\sqrt{3}', deg: 60, quad: 'الربع الأول', vyNum: Math.sqrt(3) },
  { vx: '-\\sqrt{3}', vy: 1, deg: 150, quad: 'الربع الثاني' }
];

dirAngles.forEach((item, idx) => {
  const deg = item.deg;
  const d1 = (deg + 30) % 360;
  const d2 = (deg >= 45) ? deg - 15 : deg + 45;
  let d3 = (360 - deg) % 360;
  if (d3 === deg || d3 === d1 || d3 === d2) d3 = (deg + 60) % 360;
  const opts = [
    { ar: `\\( ${deg}^\\circ \\)`, en: `\\( ${deg}^\\circ \\)` },
    { ar: `\\( ${d1}^\\circ \\)`, en: `\\( ${d1}^\\circ \\)` },
    { ar: `\\( ${d2}^\\circ \\)`, en: `\\( ${d2}^\\circ \\)` },
    { ar: `\\( ${d3}^\\circ \\)`, en: `\\( ${d3}^\\circ \\)` }
  ];
  const shuf = [opts[0], opts[1], opts[2], opts[3]]; // correct is index 0
  questions.push(createQuestion(
    'hard',
    `ما زاوية اتجاه المتجه \\( \\vec{v} = \\langle ${item.vx}, ${item.vy} \\rangle \\) مع الاتجاه الموجب لمحور السينات؟`,
    `What is the direction angle of vector \\( \\vec{v} = \\langle ${item.vx}, ${item.vy} \\rangle \\) with the positive x-axis?`,
    shuf,
    0,
    `زاوية الاتجاه تحقق \\( \\tan \\theta = \\frac{y}{x} \\) مع مراعاة الربع الذي يقع فيه المتجه: الزاوية = \\( ${deg}^\\circ \\).`,
    `Direction angle satisfies \\( \\tan \\theta = \\frac{y}{x} \\) adjusted for quadrant: angle = \\( ${deg}^\\circ \\).`
  ));
});

// 129-136: Angle Between Two Vectors: cos theta = (u . v) / (||u|| ||v||)
const angleBetweenVectors = [
  { u1: 1, u2: 0, v1: 1, v2: 1, deg: 45 },
  { u1: 2, u2: 0, v1: 0, v2: 5, deg: 90 },
  { u1: 1, u2: 0, v1: -1, v2: 1, deg: 135 },
  { u1: 3, u2: 0, v1: -4, v2: 0, deg: 180 },
  { u1: '\\sqrt{3}', u2: 1, v1: 0, v2: 2, deg: 60, textU: '\\langle \\sqrt{3}, 1 \\rangle', textV: '\\langle 0, 2 \\rangle' },
  { u1: 1, u2: 1, v1: -1, v2: 1, deg: 90 },
  { u1: 3, u2: 4, v1: -4, v2: 3, deg: 90 },
  { u1: 1, u2: 0, v1: '\\sqrt{3}', v2: 1, deg: 30, textU: '\\langle 1, 0 \\rangle', textV: '\\langle \\sqrt{3}, 1 \\rangle' }
];

angleBetweenVectors.forEach((item, idx) => {
  const deg = item.deg;
  const d1 = deg + 30;
  const d2 = (deg - 15 > 0) ? (deg - 15) : (deg + 45);
  let d3 = 180 - deg;
  if (d3 === deg || d3 === d1 || d3 === d2) d3 = deg + 60;
  const opts = [
    { ar: `\\( ${deg}^\\circ \\)`, en: `\\( ${deg}^\\circ \\)` },
    { ar: `\\( ${d1}^\\circ \\)`, en: `\\( ${d1}^\\circ \\)` },
    { ar: `\\( ${d2}^\\circ \\)`, en: `\\( ${d2}^\\circ \\)` },
    { ar: `\\( ${d3}^\\circ \\)`, en: `\\( ${d3}^\\circ \\)` }
  ];
  const shuf = [opts[2], opts[0], opts[1], opts[3]]; // correct is index 1
  const uStr = item.textU || `\\langle ${item.u1}, ${item.u2} \\rangle`;
  const vStr = item.textV || `\\langle ${item.v1}, ${item.v2} \\rangle`;
  questions.push(createQuestion(
    'hard',
    `ما قياس الزاوية \\( \\theta \\) المحصورة بين المتجهين \\( \\vec{u} = ${uStr} \\) و \\( \\vec{v} = ${vStr} \\)؟`,
    `What is the measure of the angle \\( \\theta \\) between vectors \\( \\vec{u} = ${uStr} \\) and \\( \\vec{v} = ${vStr} \\)?`,
    shuf,
    1,
    `قانون جيب تمام الزاوية بين متجهين: \\( \\cos \\theta = \\frac{\\vec{u} \\cdot \\vec{v}}{||\\vec{u}|| \\cdot ||\\vec{v}||} \\Rightarrow \\theta = ${deg}^\\circ \\).`,
    `Angle between vectors formula: \\( \\cos \\theta = \\frac{\\vec{u} \\cdot \\vec{v}}{||\\vec{u}|| \\cdot ||\\vec{v}||} \\Rightarrow \\theta = ${deg}^\\circ \\).`
  ));
});

// 137-144: 3D Distance, Midpoint & Magnitude
const data3D = [
  { p1: '(1, 2, 3)', p2: '(4, 6, 3)', dist: 5 },
  { p1: '(2, -1, 4)', p2: '(2, 3, 1)', dist: 5 },
  { p1: '(0, 0, 0)', p2: '(2, 3, 6)', dist: 7 },
  { p1: '(1, 1, 1)', p2: '(3, 5, 5)', dist: 6 },
  { p1: '(3, 2, -1)', p2: '(7, 2, 2)', dist: 5 },
  { p1: '(0, 0, 0)', p2: '(1, 4, 8)', dist: 9 },
  { p1: '(-2, 3, 1)', p2: '(2, 6, 1)', dist: 5 },
  { p1: '(1, 2, 2)', p2: '(5, 6, 2)', dist: Math.sqrt(32), isExact: '4\\sqrt{2}' }
];

data3D.forEach((item, idx) => {
  const d = item.isExact ? item.isExact : `${item.dist}`;
  const opts = [
    { ar: `\\( ${d} \\)`, en: `\\( ${d} \\)` },
    { ar: `\\( ${item.dist + 2} \\)`, en: `\\( ${item.dist + 2} \\)` },
    { ar: `\\( ${item.dist - 1} \\)`, en: `\\( ${item.dist - 1} \\)` },
    { ar: `\\( ${item.dist * 2} \\)`, en: `\\( ${item.dist * 2} \\)` }
  ];
  const shuf = [opts[1], opts[2], opts[0], opts[3]]; // correct is index 2
  questions.push(createQuestion(
    'hard',
    `ما المسافة بين النقطتين \\( A${item.p1} \\) و \\( B${item.p2} \\) في الفضاء ثلاثي الأبعاد؟`,
    `What is the distance between points \\( A${item.p1} \\) and \\( B${item.p2} \\) in 3-dimensional space?`,
    shuf,
    2,
    `قانون المسافة في الفضاء ثلاثي الأبعاد: \\( d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2} = ${d} \\).`,
    `3D distance formula: \\( d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2} = ${d} \\).`
  ));
});

// 145-150: 3D Cross Product (u x v) & Geometric Area
const crossProduct3D = [
  { u: '\\langle 1, 0, 0 \\rangle', v: '\\langle 0, 1, 0 \\rangle', res: '\\langle 0, 0, 1 \\rangle' },
  { u: '\\langle 0, 1, 0 \\rangle', v: '\\langle 0, 0, 1 \\rangle', res: '\\langle 1, 0, 0 \\rangle' },
  { u: '\\langle 0, 0, 1 \\rangle', v: '\\langle 1, 0, 0 \\rangle', res: '\\langle 0, 1, 0 \\rangle' },
  { u: '\\langle 2, 1, 0 \\rangle', v: '\\langle 0, 1, 2 \\rangle', res: '\\langle 2, -4, 2 \\rangle' },
  { u: '\\langle 1, 2, 3 \\rangle', v: '\\langle 1, 2, 3 \\rangle', res: '\\langle 0, 0, 0 \\rangle' },
  { u: '\\langle 3, 0, 0 \\rangle', v: '\\langle 0, 4, 0 \\rangle', res: '\\langle 0, 0, 12 \\rangle' }
];

crossProduct3D.forEach((item, idx) => {
  const ans = item.res;
  const opts = [
    { ar: `\\( ${ans} \\)`, en: `\\( ${ans} \\)` },
    { ar: `\\( \\langle 1, 1, 1 \\rangle \\)`, en: `\\( \\langle 1, 1, 1 \\rangle \\)` },
    { ar: `\\( \\langle 0, 1, 1 \\rangle \\)`, en: `\\( \\langle 0, 1, 1 \\rangle \\)` },
    { ar: `\\( \\langle 1, 0, 1 \\rangle \\)`, en: `\\( \\langle 1, 0, 1 \\rangle \\)` }
  ];
  const shuf = [opts[0], opts[1], opts[2], opts[3]]; // correct is index 0
  questions.push(createQuestion(
    'hard',
    `أوجد ناتج الضرب الاتجاهي للمتجهين: \\( \\vec{u} = ${item.u} \\) و \\( \\vec{v} = ${item.v} \\)؟`,
    `Find the cross product \\( \\vec{u} \\times \\vec{v} \\) for vectors \\( \\vec{u} = ${item.u} \\) and \\( \\vec{v} = ${item.v} \\)?`,
    shuf,
    0,
    `الضرب الاتجاهي يحسب عبر محددة متجهات الوحدة الأساسية \\( \\vec{i}, \\vec{j}, \\vec{k} \\): \\( \\vec{u} \\times \\vec{v} = ${ans} \\).`,
    `Cross product calculated via expansion with unit vectors \\( \\vec{i}, \\vec{j}, \\vec{k} \\): \\( \\vec{u} \\times \\vec{v} = ${ans} \\).`
  ));
});

console.log(`Generated ${questions.length} questions for Vectors & Matrices.`);
console.log('Easy count:', questions.filter(q => q.difficulty === 'easy').length);
console.log('Medium count:', questions.filter(q => q.difficulty === 'medium').length);
console.log('Hard count:', questions.filter(q => q.difficulty === 'hard').length);

// Read tahsili.json, remove 'Test Format & Strategy', append new questions
const tahPath = path.join(__dirname, '..', 'bank-data', 'tahsili.json');
const tahData = JSON.parse(fs.readFileSync(tahPath, 'utf8'));

const beforeCount = tahData.pool.length;
tahData.pool = tahData.pool.filter(q => q.domain !== 'Test Format & Strategy');
const afterTriviaRemoved = tahData.pool.length;

console.log(`Removed ${beforeCount - afterTriviaRemoved} trivia questions from tahsili.json.`);
tahData.pool = tahData.pool.concat(questions);
console.log(`New tahsili.pool total questions: ${tahData.pool.length}.`);

fs.writeFileSync(tahPath, JSON.stringify(tahData, null, 2) + '\n', 'utf8');
console.log('Successfully updated bank-data/tahsili.json.');
