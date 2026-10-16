#!/usr/bin/env node
/**
 * scripts/generate_act2_est2_math.js
 * Generates 150 authentic, distinct math questions for ACT Math 2 (act2.json)
 * and 150 authentic, distinct math questions for EST II Math 2 (est2.json).
 */

'use strict';

const fs = require('fs');
const path = require('path');

function buildChoices(corr, ...candidates) {
  const choices = [corr];
  const seen = new Set([corr]);
  
  for (const c of candidates) {
    if (c != null && !seen.has(c)) {
      seen.add(c);
      choices.push(c);
      if (choices.length === 4) break;
    }
  }
  
  let offset = 1;
  while (choices.length < 4) {
    let alt;
    if (!isNaN(Number(corr)) && String(corr).trim() !== '') {
      const num = Number(corr);
      alt = String(num + (offset % 2 === 1 ? offset : -offset));
    } else if (typeof corr === 'string' && corr.includes('\\(')) {
      alt = corr.replace(/(\d+)/, (m, d) => String(Number(d) + offset));
    } else {
      alt = `${corr} [Case ${offset}]`;
    }
    if (!seen.has(alt)) {
      seen.add(alt);
      choices.push(alt);
    }
    offset++;
  }
  
  choices.sort(() => 0.5 - Math.random());
  return { choices, answer: choices.indexOf(corr) };
}

function makeQuestion(domain, difficulty, text, choices, correctIdx, sol) {
  const corr = choices[correctIdx];
  const candidates = choices.filter((_, i) => i !== correctIdx);
  const { choices: cleanChoices, answer: cleanAnswer } = buildChoices(corr, ...candidates);
  return {
    type: 'mcq',
    domain,
    difficulty,
    text,
    choices: cleanChoices,
    answer: cleanAnswer,
    sol
  };
}

// -------------------------------------------------------------
// ACT2: Matrices, Vectors & Advanced Trigonometry (150 Qs: 50e, 50m, 50h)
// -------------------------------------------------------------
function generateAct2Questions() {
  const qs = [];
  const domain = 'Matrices, Vectors & Advanced Trigonometry';

  // --- 50 EASY ---
  // 1-10: 2x2 Matrix scalar multiplication
  for (let k = 1; k <= 10; k++) {
    const a = k + 1, b = -k, c = 2 * k + 1, d = 3;
    const s = (k % 4) + 2;
    const text = `Given matrix \\( A = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix} \\), what is the scalar product \\( ${s}A \\)?`;
    const corr = `\\( \\begin{pmatrix} ${s * a} & ${s * b} \\\\ ${s * c} & ${s * d} \\end{pmatrix} \\)`;
    const d1 = `\\( \\begin{pmatrix} ${s * a} & ${b} \\\\ ${c} & ${s * d} \\end{pmatrix} \\)`;
    const d2 = `\\( \\begin{pmatrix} ${a + s} & ${b + s} \\\\ ${c + s} & ${d + s} \\end{pmatrix} \\)`;
    const d3 = `\\( \\begin{pmatrix} ${s * a} & ${-s * b} \\\\ ${s * c} & ${s * d + 1} \\end{pmatrix} \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'easy', text, choices, choices.indexOf(corr), `Multiply each element by \\( ${s} \\): \\( ${s}(${a})=${s * a} \\), \\( ${s}(${b})=${s * b} \\), \\( ${s}(${c})=${s * c} \\), \\( ${s}(${d})=${s * d} \\).`));
  }

  // 11-20: Vector components and magnitude
  const pythTriples = [
    [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41],
    [6, 8, 10], [10, 24, 26], [12, 16, 20], [15, 20, 25], [16, 30, 34]
  ];
  pythTriples.forEach(([vx, vy, mag], idx) => {
    const text = `What is the magnitude of the 2D vector \\( \\mathbf{v} = \\langle ${vx}, -${vy} \\rangle \\)?`;
    const corr = `${mag}`;
    const d1 = `${vx + vy}`;
    const d2 = `${mag * 2}`;
    const d3 = `${mag + (idx % 2 === 0 ? 7 : 9)}`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'easy', text, choices, choices.indexOf(corr), `\\( \\|\\mathbf{v}\\| = \\sqrt{(${vx})^2 + (-${vy})^2} = \\sqrt{${vx * vx + vy * vy}} = ${mag} \\).`));
  });

  // 21-30: Special angle trig values
  const trigAngles = [
    { fn: '\\sin', rad: '\\frac{\\pi}{6}', deg: '30^\\circ', val: '\\frac{1}{2}', dist: ['\\frac{\\sqrt{3}}{2}', '\\frac{\\sqrt{2}}{2}', '1'] },
    { fn: '\\cos', rad: '\\frac{\\pi}{3}', deg: '60^\\circ', val: '\\frac{1}{2}', dist: ['\\frac{\\sqrt{3}}{2}', '\\frac{\\sqrt{2}}{2}', '0'] },
    { fn: '\\tan', rad: '\\frac{\\pi}{4}', deg: '45^\\circ', val: '1', dist: ['\\sqrt{3}', '\\frac{\\sqrt{3}}{3}', '0'] },
    { fn: '\\sin', rad: '\\frac{5\\pi}{6}', deg: '150^\\circ', val: '\\frac{1}{2}', dist: ['-\\frac{1}{2}', '\\frac{\\sqrt{3}}{2}', '-\\frac{\\sqrt{3}}{2}'] },
    { fn: '\\cos', rad: '\\frac{2\\pi}{3}', deg: '120^\\circ', val: '-\\frac{1}{2}', dist: ['\\frac{1}{2}', '-\\frac{\\sqrt{3}}{2}', '\\frac{\\sqrt{3}}{2}'] },
    { fn: '\\tan', rad: '\\frac{3\\pi}{4}', deg: '135^\\circ', val: '-1', dist: ['1', '-\\sqrt{3}', '\\frac{\\sqrt{3}}{3}'] },
    { fn: '\\sin', rad: '\\frac{7\\pi}{6}', deg: '210^\\circ', val: '-\\frac{1}{2}', dist: ['\\frac{1}{2}', '-\\frac{\\sqrt{3}}{2}', '\\frac{\\sqrt{3}}{2}'] },
    { fn: '\\cos', rad: '\\frac{5\\pi}{4}', deg: '225^\\circ', val: '-\\frac{\\sqrt{2}}{2}', dist: ['\\frac{\\sqrt{2}}{2}', '-\\frac{1}{2}', '\\frac{1}{2}'] },
    { fn: '\\cos', rad: '\\pi', deg: '180^\\circ', val: '-1', dist: ['0', '1', '-\\frac{1}{2}'] },
    { fn: '\\sin', rad: '\\frac{3\\pi}{2}', deg: '270^\\circ', val: '-1', dist: ['0', '1', '-\\frac{\\sqrt{2}}{2}'] }
  ];
  trigAngles.forEach(t => {
    const text = `Evaluate the exact trigonometric value: \\( ${t.fn}\\left(${t.rad}\\right) \\).`;
    const corr = t.val;
    const choices = [corr, ...t.dist].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'easy', text, choices, choices.indexOf(corr), `Using reference angles on the unit circle, \\( ${t.rad} = ${t.deg} \\). The exact value is \\( ${corr} \\).`));
  });

  // 31-40: Circle equations & centers
  for (let k = 1; k <= 10; k++) {
    const h = k, r = k + 2;
    const text = `A circle has equation \\( (x - ${h})^2 + (y + ${h + 2})^2 = ${r * r} \\). What are its center and radius?`;
    const corr = `Center \\( (${h}, -${h + 2}) \\), radius \\( ${r} \\)`;
    const d1 = `Center \\( (-${h}, ${h + 2}) \\), radius \\( ${r} \\)`;
    const d2 = `Center \\( (${h}, -${h + 2}) \\), radius \\( ${r * r} \\)`;
    const d3 = `Center \\( (-${h}, ${h + 2}) \\), radius \\( ${r * r} \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'easy', text, choices, choices.indexOf(corr), `Standard form \\( (x-h)^2 + (y-k)^2 = r^2 \\) gives center \\( (${h}, -${h + 2}) \\) and radius \\( r = ${r} \\).`));
  }

  // 41-50: Complex addition / subtraction
  for (let k = 1; k <= 10; k++) {
    const a = 2 * k, b = k + 3, c = k + 1, d = 2 * k + 5;
    const re = a + c;
    const im = b - d;
    const text = `Simplify the expression \\( (${a} + ${b}i) + (${c} - ${d}i) \\).`;
    const corr = `${re} - ${Math.abs(im)}i`;
    const d1 = `${re} + ${Math.abs(im)}i`;
    const d2 = `${a + c + 2} - ${Math.abs(im)}i`;
    const d3 = `${re} - ${Math.abs(im) + 2}i`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'easy', text, choices, choices.indexOf(corr), `Combine real and imaginary parts: \\( (${a} + ${c}) + (${b} - ${d})i = ${corr} \\).`));
  }

  // --- 50 MEDIUM ---
  // 51-60: Determinant of 2x2 matrix
  for (let k = 1; k <= 10; k++) {
    const a = k + 2, b = 3, c = 2, d = k + 5;
    const det = a * d - b * c;
    const text = `Calculate the determinant of the matrix \\( M = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix} \\).`;
    const corr = `${det}`;
    const d1 = `${a * d + b * c}`;
    const d2 = `${det + 5}`;
    const d3 = `${det - 4}`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'medium', text, choices, choices.indexOf(corr), `\\( \\det(M) = ad - bc = (${a})(${d}) - (${b})(${c}) = ${a * d} - ${b * c} = ${det} \\).`));
  }

  // 61-70: Dot product
  for (let k = 1; k <= 10; k++) {
    const u1 = k + 1, u2 = 3;
    const v1 = 2, v2 = k + 4;
    const dot = u1 * v1 + u2 * v2;
    const text = `Compute the dot product \\( \\mathbf{u} \\cdot \\mathbf{v} \\) for \\( \\mathbf{u} = \\langle ${u1}, ${u2} \\rangle \\) and \\( \\mathbf{v} = \\langle ${v1}, ${v2} \\rangle \\).`;
    const corr = `${dot}`;
    const d1 = `${dot + 3}`;
    const d2 = `${dot - 5}`;
    const d3 = `${u1 * v2 + u2 * v1}`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'medium', text, choices, choices.indexOf(corr), `\\( \\mathbf{u} \\cdot \\mathbf{v} = u_1 v_1 + u_2 v_2 = (${u1})(${v1}) + (${u2})(${v2}) = ${u1 * v1} + ${u2 * v2} = ${dot} \\).`));
  }

  // 71-80: Ellipse foci
  for (let k = 1; k <= 10; k++) {
    const a = 5 + k, c = 3 + k;
    const b2 = a * a - c * c;
    const text = `An ellipse has equation \\( \\frac{x^2}{${a * a}} + \\frac{y^2}{${b2}} = 1 \\). What are the coordinates of its foci?`;
    const corr = `\\( (\\pm ${c}, 0) \\)`;
    const d1 = `\\( (0, \\pm ${c}) \\)`;
    const d2 = `\\( (\\pm ${a}, 0) \\)`;
    const d3 = `\\( (\\pm ${c + 1}, 0) \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'medium', text, choices, choices.indexOf(corr), `\\( c^2 = a^2 - b^2 = ${a * a} - ${b2} = ${c * c} \\implies c = ${c} \\). Since \\( a^2 > b^2 \\), foci lie along the \\( x \\)-axis at \\( (\\pm ${c}, 0) \\).`));
  }

  // 81-90: Sinusoidal period and amplitude
  for (let k = 1; k <= 10; k++) {
    const A = k + 3;
    const B = 2 * k + 1;
    const text = `What is the period of the function \\( y = ${A}\\sin(${B}x - \\frac{\\pi}{4}) \\)?`;
    const corr = `\\( \\frac{2\\pi}{${B}} \\)`;
    const d1 = `\\( \\frac{\\pi}{${B}} \\)`;
    const d2 = `\\( ${B}\\pi \\)`;
    const d3 = `\\( \\frac{2\\pi}{${A}} \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'medium', text, choices, choices.indexOf(corr), `Period \\( T = \\frac{2\\pi}{|B|} = \\frac{2\\pi}{${B}} \\).`));
  }

  // 91-100: Double-angle trig identities
  const trigSets = [
    { num: 3, den: 5, quad: 'II', cos: '-4/5', sin2: '-24/25', dist: ['24/25', '-7/25', '7/25'] },
    { num: 5, den: 13, quad: 'II', cos: '-12/13', sin2: '-120/169', dist: ['120/169', '-119/169', '119/169'] },
    { num: 8, den: 17, quad: 'II', cos: '-15/17', sin2: '-240/289', dist: ['240/289', '-161/289', '161/289'] },
    { num: 7, den: 25, quad: 'II', cos: '-24/25', sin2: '-336/625', dist: ['336/625', '-527/625', '527/625'] },
    { num: 1, den: 3, quad: 'I', cos: '2\\sqrt{2}/3', sin2: '4\\sqrt{2}/9', dist: ['-4\\sqrt{2}/9', '7/9', '-7/9'] },
    { num: 1, den: 4, quad: 'I', cos: '\\sqrt{15}/4', sin2: '\\sqrt{15}/8', dist: ['-\\sqrt{15}/8', '7/8', '-7/8'] },
    { num: 2, den: 5, quad: 'I', cos: '\\sqrt{21}/5', sin2: '4\\sqrt{21}/25', dist: ['-4\\sqrt{21}/25', '17/25', '-17/25'] },
    { num: 3, den: 4, quad: 'I', cos: '\\sqrt{7}/4', sin2: '3\\sqrt{7}/8', dist: ['-3\\sqrt{7}/8', '1/8', '-1/8'] },
    { num: 4, den: 5, quad: 'I', cos: '3/5', sin2: '24/25', dist: ['-24/25', '7/25', '-7/25'] },
    { num: 12, den: 13, quad: 'I', cos: '5/13', sin2: '120/169', dist: ['-120/169', '119/169', '-119/169'] }
  ];
  trigSets.forEach((ts, idx) => {
    const text = `If \\( \\sin\\theta = \\frac{${ts.num}}{${ts.den}} \\) in Quadrant ${ts.quad}, find the exact value of \\( \\sin(2\\theta) \\).`;
    const corr = `\\( ${ts.sin2} \\)`;
    const choices = [corr, ...ts.dist.map(d => `\\( ${d} \\)`)].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'medium', text, choices, choices.indexOf(corr), `Using \\( \\cos\\theta = ${ts.cos} \\), \\( \\sin(2\\theta) = 2\\sin\\theta\\cos\\theta = 2\\left(\\frac{${ts.num}}{${ts.den}}\\right)(${ts.cos}) = ${ts.sin2} \\).`));
  });

  // --- 50 HARD ---
  // 101-110: Matrix Inverse of 2x2 with varying non-equal entries
  const invMatrices = [
    { a: 5, b: 2, c: 2, d: 1 }, // det = 1
    { a: 7, b: 3, c: 2, d: 1 }, // det = 1
    { a: 4, b: 3, c: 1, d: 1 }, // det = 1
    { a: 8, b: 3, c: 5, d: 2 }, // det = 1
    { a: 9, b: 4, c: 2, d: 1 }, // det = 1
    { a: 5, b: 3, c: 3, d: 2 }, // det = 1
    { a: 7, b: 4, c: 5, d: 3 }, // det = 1
    { a: 6, b: 5, c: 1, d: 1 }, // det = 1
    { a: 11, b: 4, c: 8, d: 3 }, // det = 1
    { a: 10, b: 3, c: 3, d: 1 }  // det = 1
  ];
  invMatrices.forEach(({ a, b, c, d }) => {
    const text = `Find the inverse of the matrix \\( M = \\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${d} \\end{pmatrix} \\).`;
    const corr = `\\( \\begin{pmatrix} ${d} & -${b} \\\\ -${c} & ${a} \\end{pmatrix} \\)`;
    const d1 = `\\( \\begin{pmatrix} -${d} & ${b} \\\\ ${c} & -${a} \\end{pmatrix} \\)`;
    const d2 = `\\( \\begin{pmatrix} ${a} & -${b} \\\\ -${c} & ${d} \\end{pmatrix} \\)`;
    const d3 = `\\( \\begin{pmatrix} ${d} & ${b} \\\\ ${c} & ${a} \\end{pmatrix} \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'hard', text, choices, choices.indexOf(corr), `\\( \\det(M) = (${a})(${d}) - (${b})(${c}) = 1 \\). Inverse \\( M^{-1} = \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix} = \\begin{pmatrix} ${d} & -${b} \\\\ -${c} & ${a} \\end{pmatrix} \\).`));
  });

  // 111-120: 3D Vector Cross Product
  for (let k = 1; k <= 10; k++) {
    const ay = k + 1;
    const bz = k + 2;
    // u = <1, ay, 0>, v = <0, 1, bz>
    // u x v = i(ay*bz) - j(bz) + k(1) = <ay*bz, -bz, 1>
    const cx = ay * bz, cy = -bz, cz = 1;
    const text = `Given \\( \\mathbf{u} = \\langle 1, ${ay}, 0 \\rangle \\) and \\( \\mathbf{v} = \\langle 0, 1, ${bz} \\rangle \\), what is the cross product \\( \\mathbf{u} \\times \\mathbf{v} \\)?`;
    const corr = `\\( \\langle ${cx}, ${cy}, ${cz} \\rangle \\)`;
    const d1 = `\\( \\langle ${cx}, ${-cy}, ${cz} \\rangle \\)`;
    const d2 = `\\( \\langle -${cx}, ${cy}, -${cz} \\rangle \\)`;
    const d3 = `\\( \\langle ${ay}, ${bz}, 0 \\rangle \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'hard', text, choices, choices.indexOf(corr), `\\( \\mathbf{u} \\times \\mathbf{v} = \\mathbf{i}(${ay}\\cdot ${bz}) - \\mathbf{j}(1\\cdot ${bz}) + \\mathbf{k}(1\\cdot 1) = \\langle ${cx}, ${cy}, ${cz} \\rangle \\).`));
  }

  // 121-130: Hyperbola asymptotes
  for (let k = 1; k <= 10; k++) {
    const a = k + 2, b = k + 1;
    const h = k, v = -k - 1;
    const text = `What are the equations of the asymptotes of the hyperbola \\( \\frac{(x - ${h})^2}{${a * a}} - \\frac{(y + ${k + 1})^2}{${b * b}} = 1 \\)?`;
    const corr = `\\( y + ${k + 1} = \\pm \\frac{${b}}{${a}}(x - ${h}) \\)`;
    const d1 = `\\( y + ${k + 1} = \\pm \\frac{${a}}{${b}}(x - ${h}) \\)`;
    const d2 = `\\( y - ${k + 1} = \\pm \\frac{${b}}{${a}}(x + ${h}) \\)`;
    const d3 = `\\( y = \\pm \\frac{${b}}{${a}}x \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'hard', text, choices, choices.indexOf(corr), `Center \\( (h, k) = (${h}, ${v}) \\), slopes \\( \\pm \\frac{b}{a} = \\pm \\frac{${b}}{${a}} \\). Asymptotes: \\( y + ${k + 1} = \\pm \\frac{${b}}{${a}}(x - ${h}) \\).`));
  }

  // 131-140: De Moivre's Theorem
  for (let k = 1; k <= 10; k++) {
    const n = 4 * k;
    const val = Math.pow(4, k) * (k % 2 === 0 ? 1 : -1);
    const text = `Evaluate \\( (1 + i)^{${n}} \\) using De Moivre's Theorem.`;
    const corr = `${val}`;
    const d1 = `${-val}`;
    const d2 = `${val}i`;
    const d3 = `${Math.pow(2, n)}`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'hard', text, choices, choices.indexOf(corr), `\\( 1 + i = \\sqrt{2}\\operatorname{cis}(\\pi/4) \\). Then \\( (1+i)^{${n}} = (\\sqrt{2})^{${n}}\\operatorname{cis}(${k}\\pi) = 2^{${2 * k}}(${k % 2 === 0 ? 1 : -1}) = ${val} \\).`));
  }

  // 141-150: Vector projection
  for (let k = 1; k <= 10; k++) {
    const ux = 2 * k, uy = k + 1;
    const dot = ux * 3 + uy * 4;
    const text = `Find the vector projection of \\( \\mathbf{u} = \\langle ${ux}, ${uy} \\rangle \\) onto \\( \\mathbf{v} = \\langle 3, 4 \\rangle \\).`;
    const corr = `\\( \\frac{${dot}}{25}\\langle 3, 4 \\rangle \\)`;
    const d1 = `\\( \\frac{${dot}}{5}\\langle 3, 4 \\rangle \\)`;
    const d2 = `\\( \\frac{${dot}}{25}\\langle ${ux}, ${uy} \\rangle \\)`;
    const d3 = `\\( \\frac{${dot + 5}}{25}\\langle 3, 4 \\rangle \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'hard', text, choices, choices.indexOf(corr), `\\( \\text{proj}_{\\mathbf{v}}\\mathbf{u} = \\frac{\\mathbf{u}\\cdot\\mathbf{v}}{\\|\\mathbf{v}\\|^2}\\mathbf{v} = \\frac{${dot}}{25}\\langle 3, 4 \\rangle \\).`));
  }

  return qs;
}

// -------------------------------------------------------------
// EST2: Polar Coordinates, Vectors & Conic Sections (150 Qs: 50e, 50m, 50h)
// -------------------------------------------------------------
function generateEst2Questions() {
  const qs = [];
  const domain = 'Polar Coordinates, Vectors & Conic Sections';

  // --- 50 EASY ---
  // 1-15: Polar to rectangular coordinates
  for (let k = 1; k <= 15; k++) {
    const r = 2 * k + 2;
    const x = r / 2;
    const y = `${x}\\sqrt{3}`;
    const text = `Convert polar coordinates \\( (r, \\theta) = \\left(${r}, \\frac{\\pi}{3}\\right) \\) to rectangular \\( (x, y) \\).`;
    const corr = `\\( (${x}, ${y}) \\)`;
    const d1 = `\\( (${y}, ${x}) \\)`;
    const d2 = `\\( (-${x}, ${y}) \\)`;
    const d3 = `\\( (${x}, -${y}) \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'easy', text, choices, choices.indexOf(corr), `\\( x = ${r}\\cos\\frac{\\pi}{3} = ${x} \\), \\( y = ${r}\\sin\\frac{\\pi}{3} = ${y} \\).`));
  }

  // 16-30: Eccentricity of conics
  for (let k = 1; k <= 15; k++) {
    const e = (0.15 + (k * 0.05)).toFixed(2);
    const text = `A conic section has eccentricity \\( e = ${e} \\). Identify this conic section.`;
    const corr = `Ellipse`;
    const d1 = `Hyperbola`;
    const d2 = `Parabola`;
    const d3 = `Circle`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'easy', text, choices, choices.indexOf(corr), `Since \\( 0 < e < 1 \\), \\( e = ${e} \\) represents an ellipse.`));
  }

  // 31-40: 2D Vector Addition
  for (let k = 1; k <= 10; k++) {
    const ax = k + 2, ay = 3 * k + 1;
    const bx = 5 - k, by = -k - 2;
    const rx = ax + bx, ry = ay + by;
    const text = `For \\( \\mathbf{a} = \\langle ${ax}, ${ay} \\rangle \\) and \\( \\mathbf{b} = \\langle ${bx}, ${by} \\rangle \\), what is \\( \\mathbf{a} + \\mathbf{b} \\)?`;
    const corr = `\\( \\langle ${rx}, ${ry} \\rangle \\)`;
    const d1 = `\\( \\langle ${ax - bx}, ${ay - by} \\rangle \\)`;
    const d2 = `\\( \\langle ${rx + 2}, ${ry - 1} \\rangle \\)`;
    const d3 = `\\( \\langle ${ax * bx}, ${ay * by} \\rangle \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'easy', text, choices, choices.indexOf(corr), `\\( \\mathbf{a} + \\mathbf{b} = \\langle ${ax} + (${bx}), ${ay} + (${by}) \\rangle = \\langle ${rx}, ${ry} \\rangle \\).`));
  }

  // 41-50: Parabola focus & directrix
  for (let k = 1; k <= 10; k++) {
    const p = k + 1;
    const text = `Find the focus and directrix of the parabola \\( y^2 = ${4 * p}x \\).`;
    const corr = `Focus \\( (${p}, 0) \\), Directrix \\( x = -${p} \\)`;
    const d1 = `Focus \\( (0, ${p}) \\), Directrix \\( y = -${p} \\)`;
    const d2 = `Focus \\( (-${p}, 0) \\), Directrix \\( x = ${p} \\)`;
    const d3 = `Focus \\( (${4 * p}, 0) \\), Directrix \\( x = -${4 * p} \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'easy', text, choices, choices.indexOf(corr), `\\( 4p = ${4 * p} \\implies p = ${p} \\). Focus \\( (p, 0) = (${p}, 0) \\), Directrix \\( x = -p = -${p} \\).`));
  }

  // --- 50 MEDIUM ---
  // 51-65: Polar circle equations
  for (let k = 1; k <= 15; k++) {
    const a = 2 * k + 4;
    const rad = a / 2;
    const text = `Identify the Cartesian curve represented by \\( r = ${a}\\cos\\theta \\).`;
    const corr = `Circle of radius \\( ${rad} \\) centered at \\( (${rad}, 0) \\)`;
    const d1 = `Circle of radius \\( ${a} \\) centered at \\( (0, 0) \\)`;
    const d2 = `Ellipse with semi-major axis \\( ${a} \\)`;
    const d3 = `Cardioid with parameter \\( a = ${rad} \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'medium', text, choices, choices.indexOf(corr), `Multiply by \\( r \\): \\( r^2 = ${a}r\\cos\\theta \\implies x^2 + y^2 - ${a}x = 0 \\implies (x - ${rad})^2 + y^2 = ${rad * rad} \\). Center \\( (${rad}, 0) \\), radius \\( ${rad} \\).`));
  }

  // 66-80: Angle between 2D vectors
  for (let k = 1; k <= 15; k++) {
    const text = `Find the angle \\( \\theta \\) between \\( \\mathbf{u} = \\langle ${k}, ${k}\\sqrt{3} \\rangle \\) and \\( \\mathbf{v} = \\langle 0, ${k + 2} \\rangle \\).`;
    const corr = `\\( 30^\\circ \\)`;
    const d1 = `\\( 60^\\circ \\)`;
    const d2 = `\\( 45^\\circ \\)`;
    const d3 = `\\( 90^\\circ \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'medium', text, choices, choices.indexOf(corr), `\\( \\mathbf{u}\\cdot\\mathbf{v} = 0 + ${k}(k+2)\\sqrt{3} \\). \\( \\|\\mathbf{u}\\| = 2k \\), \\( \\|\\mathbf{v}\\| = k+2 \\). \\( \\cos\\theta = \\frac{\\sqrt{3}}{2} \\implies \\theta = 30^\\circ \\).`));
  }

  // 81-90: Parametric trajectory
  for (let k = 1; k <= 10; k++) {
    const v0 = 10 * k + 10;
    const text = `Eliminate \\( t \\) from \\( x = ${v0}t \\) and \\( y = -5t^2 + 20t \\).`;
    const corr = `\\( y = -\\frac{5}{${v0 * v0}}x^2 + \\frac{20}{${v0}}x \\)`;
    const d1 = `\\( y = -5x^2 + 20x \\)`;
    const d2 = `\\( y = -\\frac{1}{${v0}}x^2 + 2x \\)`;
    const d3 = `\\( y = -5\\left(\\frac{x}{${v0}}\\right)^2 + 10x \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'medium', text, choices, choices.indexOf(corr), `Substitute \\( t = x/${v0} \\) into \\( y(t) \\).`));
  }

  // 91-100: Sum of geometric series
  for (let k = 1; k <= 10; k++) {
    const a = 4 * k + 4;
    const sum = a * 2;
    const text = `Find the sum of the infinite series \\( ${a} + \\frac{${a}}{2} + \\frac{${a}}{4} + \\cdots \\).`;
    const corr = `${sum}`;
    const d1 = `${sum + 4}`;
    const d2 = `${sum / 2}`;
    const d3 = `Diverges`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'medium', text, choices, choices.indexOf(corr), `\\( S = \\frac{a}{1 - 1/2} = 2(${a}) = ${sum} \\).`));
  }

  // --- 50 HARD ---
  // 101-115: Polar to Cartesian conic
  for (let k = 1; k <= 15; k++) {
    const p = k + 1;
    const text = `Convert \\( r = \\frac{${2 * p}}{1 - 2\\cos\\theta} \\) to Cartesian form and identify its type.`;
    const corr = `Hyperbola: \\( 3x^2 - y^2 + ${8 * p}x + ${4 * p * p} = 0 \\)`;
    const d1 = `Ellipse: \\( 3x^2 + y^2 = ${4 * p * p} \\)`;
    const d2 = `Parabola: \\( y^2 = 4(${p})x \\)`;
    const d3 = `Circle: \\( x^2 + y^2 = ${p * p} \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'hard', text, choices, choices.indexOf(corr), `\\( e = 2 > 1 \\), so it is a hyperbola. In Cartesian: \\( 3x^2 - y^2 + ${8 * p}x + ${4 * p * p} = 0 \\).`));
  }

  // 116-130: 3D sphere equation
  for (let k = 1; k <= 15; k++) {
    const r = k + 2;
    const text = `Find the equation of a sphere in \\( \\mathbb{R}^3 \\) centered at \\( (${k}, -${k + 1}, 2) \\) with radius \\( ${r} \\).`;
    const corr = `\\( (x - ${k})^2 + (y + ${k + 1})^2 + (z - 2)^2 = ${r * r} \\)`;
    const d1 = `\\( (x + ${k})^2 + (y - ${k + 1})^2 + (z + 2)^2 = ${r * r} \\)`;
    const d2 = `\\( (x - ${k})^2 + (y + ${k + 1})^2 + (z - 2)^2 = ${r} \\)`;
    const d3 = `\\( x^2 + y^2 + z^2 = ${r * r} \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'hard', text, choices, choices.indexOf(corr), `\\( (x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = r^2 \\).`));
  }

  // 131-140: Roots of complex numbers
  for (let k = 1; k <= 10; k++) {
    const r = k + 1;
    const r3 = r * r * r;
    const text = `Find the principal cube root of \\( ${r3}i \\) in polar form.`;
    const corr = `\\( ${r}\\left(\\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6}\\right) \\)`;
    const d1 = `\\( ${r}\\left(\\cos\\frac{\\pi}{2} + i\\sin\\frac{\\pi}{2}\\right) \\)`;
    const d2 = `\\( ${r3}\\left(\\cos\\frac{\\pi}{6} + i\\sin\\frac{\\pi}{6}\\right) \\)`;
    const d3 = `\\( ${r}(\\cos 0 + i\\sin 0) \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'hard', text, choices, choices.indexOf(corr), `\\( ${r3}i = ${r3}\\operatorname{cis}(\\pi/2) \\). Principal cube root: \\( \\sqrt[3]{${r3}}\\operatorname{cis}\\left(\\frac{\\pi/2}{3}\\right) = ${r}\\operatorname{cis}(\\pi/6) \\).`));
  }

  // 141-150: Parametric elimination
  for (let k = 1; k <= 10; k++) {
    const a = k + 2, b = k + 4;
    const text = `Eliminate \\( \\theta \\) from \\( x = ${a}\\sec\\theta \\) and \\( y = ${b}\\tan\\theta \\).`;
    const corr = `\\( \\frac{x^2}{${a * a}} - \\frac{y^2}{${b * b}} = 1 \\)`;
    const d1 = `\\( \\frac{x^2}{${a * a}} + \\frac{y^2}{${b * b}} = 1 \\)`;
    const d2 = `\\( \\frac{y^2}{${b * b}} - \\frac{x^2}{${a * a}} = 1 \\)`;
    const d3 = `\\( x^2 - y^2 = ${a * b} \\)`;
    const choices = [corr, d1, d2, d3].sort(() => 0.5 - Math.random());
    qs.push(makeQuestion(domain, 'hard', text, choices, choices.indexOf(corr), `\\( \\sec^2\\theta - \\tan^2\\theta = 1 \\implies \\frac{x^2}{${a * a}} - \\frac{y^2}{${b * b}} = 1 \\).`));
  }

  return qs;
}

// -------------------------------------------------------------
// Execution & Injection
// -------------------------------------------------------------
function replaceTriviaInBank(bankFile, newQuestions) {
  const filePath = path.resolve('bank-data', bankFile);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const pool = data.pool || [];

  const triviaIndices = [];
  pool.forEach((q, idx) => {
    const dLower = (q.domain || '').toLowerCase();
    if (dLower.includes('strategy') || dLower.includes('format')) {
      triviaIndices.push(idx);
    }
  });

  console.log(`[${bankFile}] Found ${triviaIndices.length} trivia items to replace with ${newQuestions.length} math questions.`);
  if (triviaIndices.length !== newQuestions.length) {
    throw new Error(`Count mismatch for ${bankFile}: found ${triviaIndices.length}, generated ${newQuestions.length}`);
  }

  triviaIndices.forEach((poolIdx, i) => {
    pool[poolIdx] = newQuestions[i];
  });

  data.pool = pool;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`[${bankFile}] Successfully replaced all trivia questions with authentic math items!`);
}

const act2Qs = generateAct2Questions();
replaceTriviaInBank('act2.json', act2Qs);

const est2Qs = generateEst2Questions();
replaceTriviaInBank('est2.json', est2Qs);
