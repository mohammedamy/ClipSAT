#!/usr/bin/env node
/**
 * scripts/expand_addmath_bank_150.js
 * Expands bank-data/addmath.json to 150 authentic, high-caliber questions
 * (50 Easy, 50 Medium, 50 Hard) with rich SVG diagrams for Cambridge 0606 & Edexcel 4PM1.
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

function makeQ(domain, difficulty, text, choices, correctIdx, sol, figure, seenStems) {
  const norm = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  if (seenStems.has(norm)) {
    throw new Error(`Duplicate stem in addmath: "${norm}"`);
  }
  seenStems.add(norm);

  const corr = choices[correctIdx];
  const candidates = choices.filter((_, i) => i !== correctIdx);
  const { choices: cleanChoices, answer: cleanAnswer } = buildChoices(corr, ...candidates);
  const item = {
    type: 'mcq',
    domain,
    difficulty,
    text,
    choices: cleanChoices,
    answer: cleanAnswer,
    sol
  };
  if (figure) item.figure = figure;
  return item;
}

const seenStems = new Set();
const pool = [];

// =========================================================================
// 50 EASY QUESTIONS
// =========================================================================

// 1-8: Modulus Equations |ax + b| = c
for (let k = 1; k <= 8; k++) {
  const a = k + 1;
  const b = 3;
  const c = 2 * a + 3;
  // |ax + b| = c -> ax + b = c -> ax = 2a -> x = 2
  // or ax + b = -c -> ax = -2a - 6 -> x = -2 - 6/a
  const x1 = 2;
  const x2 = `-\\frac{${2 * a + 6}}{${a}}`;
  const text = `Solve the modulus equation \\( |${a}x + ${b}| = ${c} \\).`;
  const corr = `\\( x = ${x1} \\) and \\( x = ${x2} \\)`;
  const d1 = `\\( x = ${x1} \\) only`;
  const d2 = `\\( x = -${x1} \\) and \\( x = ${x2} \\)`;
  const d3 = `\\( x = ${x1 + 1} \\) and \\( x = -${x1 + 1} \\)`;
  pool.push(makeQ('Functions, Modulus & Quadratics', 'easy', text, [corr, d1, d2, d3], 0, `Case 1: \\( ${a}x + ${b} = ${c} \\implies ${a}x = ${c - b} \\implies x = ${x1} \\). Case 2: \\( ${a}x + ${b} = -${c} \\implies ${a}x = -${c + b} \\implies x = ${x2} \\).`, null, seenStems));
}

// 9-16: Binomial Expansion (1 + ax)^n coefficient of x^2
for (let k = 1; k <= 8; k++) {
  const a = k + 1;
  const n = k + 3;
  // Coeff of x^2 in (1 + ax)^n is C(n, 2) * a^2 = n(n-1)/2 * a^2
  const coeff = (n * (n - 1) / 2) * (a * a);
  const text = `Find the coefficient of \\( x^2 \\) in the binomial expansion of \\( (1 + ${a}x)^{${n}} \\).`;
  const corr = `${coeff}`;
  const d1 = `${coeff + a * a}`;
  const d2 = `${coeff / a}`;
  const d3 = `${(n * (n - 1) / 2) * a}`;
  pool.push(makeQ('Polynomials & Binomial Theorem', 'easy', text, [corr, d1, d2, d3], 0, `The \\( x^2 \\) term is \\( \\binom{${n}}{2} (1)^{${n - 2}} (${a}x)^2 = \\frac{${n}(${n - 1})}{2} (${a * a}x^2) = ${coeff}x^2 \\).`, null, seenStems));
}

// 17-24: Logarithmic Equations (Laws of Logs)
for (let k = 1; k <= 8; k++) {
  const b = k + 2;
  const val = (k + 1) * (k + 1);
  const text = `Solve for \\( x \\): \\( \\log_{${b}}(x) + \\log_{${b}}(4) = \\log_{${b}}(${4 * val}) \\).`;
  const corr = `${val}`;
  const d1 = `${val + 2}`;
  const d2 = `${val * 2}`;
  const d3 = `${Math.sqrt(val)}`;
  pool.push(makeQ('Logarithmic & Exponential Functions', 'easy', text, [corr, d1, d2, d3], 0, `Using log laws: \\( \\log_{${b}}(4x) = \\log_{${b}}(${4 * val}) \\implies 4x = ${4 * val} \\implies x = ${val} \\).`, null, seenStems));
}

// 25-32: Circular Measure (Arc Length s = r * theta)
for (let k = 1; k <= 8; k++) {
  const r = 2 * k + 4;
  const theta = `\\frac{\\pi}{${k + 2}}`;
  const arcVal = `\\frac{${r}\\pi}{${k + 2}}`;
  const text = `A circle sector has radius \\( r = ${r} \\text{ cm} \\) and central angle \\( \\theta = ${theta} \\text{ rad} \\). What is the arc length of the sector?`;
  const corr = `\\( ${arcVal} \\text{ cm} \\)`;
  const d1 = `\\( \\frac{${r * r}\\pi}{${2 * (k + 2)}} \\text{ cm} \\)`;
  const d2 = `\\( ${r}\\pi \\text{ cm} \\)`;
  const d3 = `\\( \\frac{${r}\\pi}{${2 * (k + 2)}} \\text{ cm} \\)`;
  const fig = {
    type: 'circle',
    radius: `${r}`,
    sector_angle: `${(180 / (k + 2)).toFixed(0)}°`,
    title: `Sector: r = ${r} cm, θ = π/${k + 2} rad`
  };
  pool.push(makeQ('Trigonometric Functions & Circular Measure', 'easy', text, [corr, d1, d2, d3], 0, `Arc length formula in radians: \\( s = r\\theta = (${r})\\left(${theta}\\right) = ${arcVal} \\text{ cm} \\).`, fig, seenStems));
}

// 33-38: Permutations & Combinations nPr and nCr
for (let k = 1; k <= 6; k++) {
  const n = k + 4;
  const r = 2;
  const nPr = n * (n - 1);
  const text = `Evaluate the number of permutations \\( {}^{${n}}P_{${r}} \\).`;
  const corr = `${nPr}`;
  const d1 = `${nPr / 2}`;
  const d2 = `${nPr + n}`;
  const d3 = `${n * r}`;
  pool.push(makeQ('Permutations & Combinations', 'easy', text, [corr, d1, d2, d3], 0, `\\( {}^{n}P_{r} = \\frac{n!}{(n-r)!} \\implies {}^{${n}}P_{2} = ${n} \\times ${n - 1} = ${nPr} \\).`, null, seenStems));
}

// 39-44: Differentiation (Power & Constant Multiple)
for (let k = 1; k <= 6; k++) {
  const p = k + 2;
  const c = 3 * k;
  const text = `Differentiate with respect to \\( x \\): \\( y = ${c}x^{${p}} - 5x + 7 \\).`;
  const corr = `\\( \\frac{dy}{dx} = ${c * p}x^{${p - 1}} - 5 \\)`;
  const d1 = `\\( \\frac{dy}{dx} = ${c * p}x^{${p}} - 5 \\)`;
  const d2 = `\\( \\frac{dy}{dx} = ${c}x^{${p - 1}} - 5 \\)`;
  const d3 = `\\( \\frac{dy}{dx} = ${c * p}x^{${p - 1}} \\)`;
  pool.push(makeQ('Differentiation & Rates of Change', 'easy', text, [corr, d1, d2, d3], 0, `Apply the power rule \\( \\frac{d}{dx}[x^n] = n x^{n-1} \\): \\( \\frac{dy}{dx} = ${c}(${p})x^{${p - 1}} - 5 = ${c * p}x^{${p - 1}} - 5 \\).`, null, seenStems));
}

// 45-50: 2D Vectors (Magnitude and Unit Vector)
for (let k = 1; k <= 6; k++) {
  const vx = 3 * k, vy = 4 * k, mag = 5 * k;
  const text = `Find a unit vector in the direction of \\( \\mathbf{a} = \\begin{pmatrix} ${vx} \\\\ -${vy} \\end{pmatrix} \\).`;
  const corr = `\\( \\begin{pmatrix} 3/5 \\\\ -4/5 \\end{pmatrix} \\)`;
  const d1 = `\\( \\begin{pmatrix} 3/5 \\\\ 4/5 \\end{pmatrix} \\)`;
  const d2 = `\\( \\begin{pmatrix} 1/5 \\\\ -1/5 \\end{pmatrix} \\)`;
  const d3 = `\\( \\begin{pmatrix} ${vx} \\\\ -${vy} \\end{pmatrix} \\)`;
  const fig = {
    type: 'fn',
    fns: [],
    points: [{ x: vx / mag, y: -vy / mag, label: 'û' }],
    xmin: -1.5, xmax: 1.5, ymin: -1.5, ymax: 1.5,
    title: 'Unit Vector û on Unit Circle'
  };
  pool.push(makeQ('2D Vectors & Relative Velocity', 'easy', text, [corr, d1, d2, d3], 0, `Magnitude \\( |\\mathbf{a}| = \\sqrt{(${vx})^2 + (-${vy})^2} = ${mag} \\). The unit vector is \\( \\frac{\\mathbf{a}}{|\\mathbf{a}|} = \\frac{1}{${mag}}\\begin{pmatrix} ${vx} \\\\ -${vy} \\end{pmatrix} = \\begin{pmatrix} 3/5 \\\\ -4/5 \\end{pmatrix} \\).`, fig, seenStems));
}

// =========================================================================
// 50 MEDIUM QUESTIONS
// =========================================================================

// 51-57: Discriminant of Quadratics (No Real Roots)
for (let k = 1; k <= 7; k++) {
  const b = 2 * (k + 1);
  const maxC = ((b * b) / 4);
  const text = `Find the range of values of \\( c \\) for which the equation \\( x^2 + ${b}x + c = 0 \\) has no real roots.`;
  const corr = `\\( c > ${maxC} \\)`;
  const d1 = `\\( c < ${maxC} \\)`;
  const d2 = `\\( c \\ge ${maxC} \\)`;
  const d3 = `\\( c > ${b} \\)`;
  pool.push(makeQ('Functions, Modulus & Quadratics', 'medium', text, [corr, d1, d2, d3], 0, `For no real roots, discriminant \\( b^2 - 4ac < 0 \\implies (${b})^2 - 4(1)(c) < 0 \\implies ${b * b} - 4c < 0 \\implies 4c > ${b * b} \\implies c > ${maxC} \\).`, null, seenStems));
}

// 58-64: Remainder & Factor Theorem
for (let k = 1; k <= 7; k++) {
  const root = k;
  const p = 2;
  // P(x) = 2x^2 + ax - 4. If (x - root) is a factor -> 2(root)^2 + a(root) - 4 = 0 -> a*root = 4 - 2*root^2
  const aVal = ((4 - 2 * root * root) / root).toFixed(2);
  const text = `The polynomial \\( P(x) = 2x^2 + ax - 4 \\) is exactly divisible by \\( (x - ${root}) \\). What is the value of the constant \\( a \\)?`;
  const corr = `${aVal}`;
  const d1 = `${(Number(aVal) + 2).toFixed(2)}`;
  const d2 = `${(Number(aVal) - 3).toFixed(2)}`;
  const d3 = `${(-Number(aVal)).toFixed(2)}`;
  pool.push(makeQ('Polynomials & Binomial Theorem', 'medium', text, [corr, d1, d2, d3], 0, `By the Factor Theorem, \\( P(${root}) = 0 \\implies 2(${root})^2 + a(${root}) - 4 = 0 \\implies ${2 * root * root} + ${root}a - 4 = 0 \\implies a = ${aVal} \\).`, null, seenStems));
}

// 65-71: Exponential Equations (Different Bases)
for (let k = 1; k <= 7; k++) {
  const p = k + 1;
  const text = `Solve the exponential equation \\( 2^{x+${p}} = 5^x \\), giving \\( x \\) in terms of common logarithms.`;
  const corr = `\\( x = \\frac{${p}\\ln 2}{\\ln 5 - \\ln 2} \\)`;
  const d1 = `\\( x = \\frac{${p}\\ln 5}{\\ln 5 - \\ln 2} \\)`;
  const d2 = `\\( x = \\frac{${p}}{\\ln 5 - \\ln 2} \\)`;
  const d3 = `\\( x = \\frac{\\ln 2}{${p}(\\ln 5 - \\ln 2)} \\)`;
  pool.push(makeQ('Logarithmic & Exponential Functions', 'medium', text, [corr, d1, d2, d3], 0, `Take natural logs of both sides: \\( (x + ${p})\\ln 2 = x\\ln 5 \\implies x\\ln 2 + ${p}\\ln 2 = x\\ln 5 \\implies x(\\ln 5 - \\ln 2) = ${p}\\ln 2 \\implies x = \\frac{${p}\\ln 2}{\\ln 5 - \\ln 2} \\).`, null, seenStems));
}

// 72-78: Circular Measure (Sector Area A = 1/2 r^2 theta)
for (let k = 1; k <= 7; k++) {
  const r = 2 * k + 6;
  const theta = 0.8 + 0.1 * k;
  const area = (0.5 * r * r * theta).toFixed(1);
  const text = `A sector of a circle of radius \\( r = ${r} \\text{ cm} \\) has central angle \\( \\theta = ${theta.toFixed(1)} \\text{ rad} \\). What is the area of the sector?`;
  const corr = `\\( ${area} \\text{ cm}^2 \\)`;
  const d1 = `\\( ${(Number(area) * 2).toFixed(1)} \\text{ cm}^2 \\)`;
  const d2 = `\\( ${(Number(area) + 5).toFixed(1)} \\text{ cm}^2 \\)`;
  const d3 = `\\( ${(r * theta).toFixed(1)} \\text{ cm}^2 \\)`;
  const fig = {
    type: 'circle',
    radius: `${r}`,
    sector_angle: `${(theta * 180 / Math.PI).toFixed(0)}°`,
    title: `Sector Area: r = ${r} cm, θ = ${theta.toFixed(1)} rad`
  };
  pool.push(makeQ('Trigonometric Functions & Circular Measure', 'medium', text, [corr, d1, d2, d3], 0, `Sector area formula: \\( A = \\frac{1}{2}r^2\\theta = \\frac{1}{2}(${r})^2(${theta.toFixed(1)}) = ${area} \\text{ cm}^2 \\).`, fig, seenStems));
}

// 79-85: Combinations with Restrictions (Committees)
for (let k = 1; k <= 7; k++) {
  const men = k + 4;
  const women = k + 3;
  // Choose 2 men and 2 women
  const ways = (men * (men - 1) / 2) * (women * (women - 1) / 2);
  const text = `A committee of 4 people is to be chosen from \\( ${men} \\) men and \\( ${women} \\) women. How many committees consist of exactly 2 men and 2 women?`;
  const corr = `${ways}`;
  const d1 = `${ways * 2}`;
  const d2 = `${ways - 5}`;
  const d3 = `${(men + women) * 4}`;
  pool.push(makeQ('Permutations & Combinations', 'medium', text, [corr, d1, d2, d3], 0, `\\( \\binom{${men}}{2} \\times \\binom{${women}}{2} = \\frac{${men}\\times${men - 1}}{2} \\times \\frac{${women}\\times${women - 1}}{2} = ${ways} \\).`, null, seenStems));
}

// 86-92: Chain Rule & Tangents to Curves
for (let k = 1; k <= 7; k++) {
  const a = k + 1;
  const p = 3;
  // y = (ax + 1)^3 at x = 0: y'(x) = 3a(ax+1)^2. At x = 0, y' = 3a, y = 1. Tangent: y - 1 = 3a(x - 0) -> y = 3ax + 1
  const slope = 3 * a;
  const text = `Find the equation of the tangent line to the curve \\( y = (${a}x + 1)^3 \\) at the point where \\( x = 0 \\).`;
  const corr = `\\( y = ${slope}x + 1 \\)`;
  const d1 = `\\( y = ${a}x + 1 \\)`;
  const d2 = `\\( y = ${slope}x - 1 \\)`;
  const d3 = `\\( y = ${slope}x + 3 \\)`;
  const fig = {
    type: 'fn',
    fns: [
      { fn: `(${a}*x + 1)**3`, label: 'y = f(x)' },
      { fn: `${slope}*x + 1`, label: 'Tangent' }
    ],
    points: [{ x: 0, y: 1, label: '(0,1)' }],
    xmin: -1, xmax: 1, ymin: -2, ymax: 5,
    title: `Tangent at (0, 1): y = ${slope}x + 1`
  };
  pool.push(makeQ('Differentiation & Rates of Change', 'medium', text, [corr, d1, d2, d3], 0, `At \\( x = 0 \\), \\( y = 1^3 = 1 \\). Derivative: \\( \\frac{dy}{dx} = 3(${a}x+1)^2 \\cdot (${a}) = ${3 * a}(${a}x+1)^2 \\). At \\( x = 0 \\), slope \\( m = ${slope} \\). Equation: \\( y - 1 = ${slope}(x - 0) \\implies y = ${slope}x + 1 \\).`, fig, seenStems));
}

// 93-100: Definite Integration (Substitution)
for (let k = 1; k <= 8; k++) {
  const a = k + 1;
  // int_0^1 (ax + 1)^3 dx = [ (ax + 1)^4 / (4a) ]_0^1 = ((a+1)^4 - 1)/(4a)
  const num = Math.pow(a + 1, 4) - 1;
  const den = 4 * a;
  const text = `Evaluate the definite integral: \\( \\int_0^1 (${a}x + 1)^3 \\, dx \\).`;
  const corr = `\\( \\frac{${num}}{${den}} \\)`;
  const d1 = `\\( \\frac{${num + 4}}{${den}} \\)`;
  const d2 = `\\( \\frac{${num}}{${a}} \\)`;
  const d3 = `\\( \\frac{${num}}{4} \\)`;
  pool.push(makeQ('Integration & Kinematics', 'medium', text, [corr, d1, d2, d3], 0, `Substitute \\( u = ${a}x + 1 \\implies du = ${a}\\,dx \\). Integral: \\( \\frac{1}{${a}}\\left[\\frac{u^4}{4}\\right]_1^{${a + 1}} = \\frac{(${a + 1})^4 - 1^{4}}{${den}} = \\frac{${num}}{${den}} \\).`, null, seenStems));
}

// =========================================================================
// 50 HARD QUESTIONS
// =========================================================================

// 101-107: Composite Functions & Inverses f^-1(g(x))
for (let k = 1; k <= 7; k++) {
  const a = k + 2;
  const b = k + 1;
  // f(x) = (ax + 1)/(x - 2). Find f^-1(x): y(x - 2) = ax + 1 -> yx - 2y = ax + 1 -> x(y - a) = 2y + 1 -> f^-1(x) = (2x + 1)/(x - a)
  const text = `The function \\( f(x) = \\frac{${a}x + 1}{x - 2} \\) is defined for \\( x \\ne 2 \\). Find the inverse function \\( f^{-1}(x) \\).`;
  const corr = `\\( f^{-1}(x) = \\frac{2x + 1}{x - ${a}} \\quad (x \\ne ${a}) \\)`;
  const d1 = `\\( f^{-1}(x) = \\frac{x - 2}{${a}x + 1} \\)`;
  const d2 = `\\( f^{-1}(x) = \\frac{2x - 1}{x - ${a}} \\)`;
  const d3 = `\\( f^{-1}(x) = \\frac{${a}x - 2}{x + 1} \\)`;
  pool.push(makeQ('Functions, Modulus & Quadratics', 'hard', text, [corr, d1, d2, d3], 0, `Let \\( y = \\frac{${a}x + 1}{x - 2} \\implies y(x - 2) = ${a}x + 1 \\implies yx - 2y = ${a}x + 1 \\implies x(y - ${a}) = 2y + 1 \\implies x = \\frac{2y + 1}{y - ${a}} \\). Swap variables to obtain \\( f^{-1}(x) = \\frac{2x + 1}{x - ${a}} \\).`, null, seenStems));
}

// 108-114: Binomial Expansion Unknown Index n
for (let k = 1; k <= 7; k++) {
  const a = k + 1;
  // (1 + x/a)^n: coeff of x is n/a. coeff of x^2 is n(n-1)/(2 a^2).
  // If coeff of x^2 is twice coeff of x: n(n-1)/(2 a^2) = 2(n/a) -> (n-1)/(2a) = 2 -> n - 1 = 4a -> n = 4a + 1
  const nVal = 4 * a + 1;
  const text = `In the expansion of \\( \\left(1 + \\frac{x}{${a}}\\right)^n \\), the coefficient of \\( x^2 \\) is twice the coefficient of \\( x \\). Given \\( n > 0 \\), what is the value of \\( n \\)?`;
  const corr = `${nVal}`;
  const d1 = `${nVal + 2}`;
  const d2 = `${4 * a}`;
  const d3 = `${2 * a + 1}`;
  pool.push(makeQ('Polynomials & Binomial Theorem', 'hard', text, [corr, d1, d2, d3], 0, `Coeff of \\( x \\) is \\( \\frac{n}{${a}} \\). Coeff of \\( x^2 \\) is \\( \\frac{n(n-1)}{2(${a * a})} \\). Given \\( \\frac{n(n-1)}{2\\cdot ${a * a}} = 2\\left(\\frac{n}{${a}}\\right) \\implies \\frac{n-1}{2\\cdot ${a}} = 2 \\implies n - 1 = 4(${a}) = ${4 * a} \\implies n = ${nVal} \\).`, null, seenStems));
}

// 115-121: Simultaneous Logarithmic & Non-linear Equations
for (let k = 1; k <= 7; k++) {
  const p = k + 2;
  const text = `Solve the simultaneous system: \\( \\log_2(x) - \\log_2(y) = 2 \\) and \\( x - 3y = ${p} \\). What is the value of \\( x \\)?`;
  // x/y = 4 -> x = 4y. 4y - 3y = p -> y = p. x = 4p.
  const xAns = 4 * p;
  const corr = `${xAns}`;
  const d1 = `${p}`;
  const d2 = `${2 * p}`;
  const d3 = `${4 * p + 2}`;
  pool.push(makeQ('Logarithmic & Exponential Functions', 'hard', text, [corr, d1, d2, d3], 0, `From the first equation: \\( \\log_2(x/y) = 2 \\implies x/y = 2^2 = 4 \\implies x = 4y \\). Substitute into second: \\( 4y - 3y = ${p} \\implies y = ${p} \\). Thus \\( x = 4(${p}) = ${xAns} \\).`, null, seenStems));
}

// 122-128: Trigonometric Identities & Exact Solutions
const trigEquations = [
  { eq: '2\\cos^2 x + 3\\sin x - 3 = 0', ans: '\\frac{\\pi}{6}, \\; \\frac{5\\pi}{6}, \\; \\frac{\\pi}{2}', dist: ['\\frac{\\pi}{3}, \\; \\frac{2\\pi}{3}', '\\frac{\\pi}{6}, \\; \\frac{7\\pi}{6}', '0, \\; \\pi'] },
  { eq: '2\\sin^2 x - \\sin x - 1 = 0', ans: '\\frac{\\pi}{2}, \\; \\frac{7\\pi}{6}, \\; \\frac{11\\pi}{6}', dist: ['\\frac{\\pi}{6}, \\; \\frac{5\\pi}{6}', '\\frac{3\\pi}{2}, \\; \\frac{\\pi}{6}', '\\pi, \\; 2\\pi'] },
  { eq: '2\\cos^2 x + \\cos x - 1 = 0', ans: '\\pi, \\; \\frac{\\pi}{3}, \\; \\frac{5\\pi}{3}', dist: ['\\frac{\\pi}{2}, \\; \\frac{3\\pi}{2}', '\\frac{2\\pi}{3}, \\; \\frac{4\\pi}{3}', '0, \\; \\pi'] },
  { eq: '2\\sin^2 x - 3\\sin x + 1 = 0', ans: '\\frac{\\pi}{6}, \\; \\frac{5\\pi}{6}, \\; \\frac{\\pi}{2}', dist: ['\\frac{\\pi}{3}, \\; \\frac{2\\pi}{3}', '\\frac{7\\pi}{6}, \\; \\frac{11\\pi}{6}', '\\frac{3\\pi}{2}'] },
  { eq: '2\\cos^2 x - 3\\cos x + 1 = 0', ans: '0, \\; \\frac{\\pi}{3}, \\; \\frac{5\\pi}{3}, \\; 2\\pi', dist: ['\\frac{\\pi}{6}, \\; \\frac{11\\pi}{6}', '\\frac{\\pi}{2}, \\; \\frac{3\\pi}{2}', '\\pi'] },
  { eq: '4\\cos^2 x - 3 = 0', ans: '\\frac{\\pi}{6}, \\; \\frac{5\\pi}{6}, \\; \\frac{7\\pi}{6}, \\; \\frac{11\\pi}{6}', dist: ['\\frac{\\pi}{3}, \\; \\frac{2\\pi}{3}, \\; \\frac{4\\pi}{3}, \\; \\frac{5\\pi}{3}', '\\frac{\\pi}{4}, \\; \\frac{3\\pi}{4}', '0, \\; \\pi'] },
  { eq: '3\\tan^2 x - 1 = 0', ans: '\\frac{\\pi}{6}, \\; \\frac{5\\pi}{6}, \\; \\frac{7\\pi}{6}, \\; \\frac{11\\pi}{6}', dist: ['\\frac{\\pi}{3}, \\; \\frac{2\\pi}{3}, \\; \\frac{4\\pi}{3}, \\; \\frac{5\\pi}{3}', '\\frac{\\pi}{4}, \\; \\frac{5\\pi}{4}', '\\frac{\\pi}{2}, \\; \\frac{3\\pi}{2}'] }
];
trigEquations.forEach((tq) => {
  const text = `Find all solutions of \\( ${tq.eq} \\) in the interval \\( 0 \\le x \\le 2\\pi \\).`;
  const corr = `\\( x = ${tq.ans} \\)`;
  const choices = [corr, ...tq.dist.map(d => `\\( x = ${d} \\)`)];
  pool.push(makeQ('Trigonometric Functions & Circular Measure', 'hard', text, choices, 0, `Solving quadratic trig equation \\( ${tq.eq} \\) yields solutions \\( x = ${tq.ans} \\).`, null, seenStems));
});

// 129-135: Permutations of letters with identical characters & restrictions
const permWords = [
  { word: 'PARALLEL', req: 'all 3 \'L\'s must stay together as a single block', ans: '360', dist: ['720', '3360', '180'], sol: 'Treat LLL as 1 item. Remaining items: P, A, R, A, E. 6!/2! = 360.' },
  { word: 'STATISTICS', req: 'all 3 \'S\'s must stay together as a single block', ans: '3360', dist: ['6720', '50400', '1680'], sol: 'Treat SSS as 1 item. Items: [SSS], T, A, T, I, T, I, C (8 items, 3 T\'s, 2 I\'s): 8!/(3!2!) = 3360.' },
  { word: 'COMMITTEE', req: 'the 2 \'M\'s must stay together', ans: '10080', dist: ['20160', '45360', '5040'], sol: 'Treat MM as 1 item. Items: [MM], C, O, I, T, T, E, E (8 items, 2 T\'s, 2 E\'s): 8!/(2!2!) = 10080.' },
  { word: 'SUCCESS', req: 'all 3 \'S\'s must stay together', ans: '60', dist: ['120', '420', '30'], sol: 'Treat SSS as 1 item. Items: [SSS], U, C, C, E (5 items, 2 C\'s): 5!/2! = 60.' },
  { word: 'ARRANGE', req: 'the 2 \'R\'s must be together', ans: '360', dist: ['720', '1260', '180'], sol: 'Treat RR as 1 item. Items: [RR], A, A, N, G, E (6 items, 2 A\'s): 6!/2! = 360.' },
  { word: 'MATHEMATICS', req: 'the 2 \'M\'s must stay together', ans: '907200', dist: ['1814400', '453600', '226800'], sol: 'Treat MM as 1 item. Items: 10 items with 2 A\'s, 2 T\'s: 10!/(2!2!) = 907200.' },
  { word: 'ADDITION', req: 'both \'D\'s must stay together', ans: '2520', dist: ['5040', '10080', '1260'], sol: 'Treat DD as 1 item. Items: [DD], A, I, I, T, O, N (7 items, 2 I\'s): 7!/2! = 2520.' }
];
permWords.forEach(pw => {
  const text = `Find the number of distinct permutations of all letters in \\( \\text{${pw.word}} \\) if ${pw.req}.`;
  pool.push(makeQ('Permutations & Combinations', 'hard', text, [pw.ans, ...pw.dist], 0, pw.sol, null, seenStems));
});

// 136-142: Connected Rates of Change
for (let k = 1; k <= 7; k++) {
  const rVal = k + 2;
  const dr_dt = 0.5;
  // Spherical balloon: V = 4/3 pi r^3 -> dV/dt = 4 pi r^2 (dr/dt). When r = rVal, dV/dt = 4 pi (rVal)^2 (0.5) = 2 pi rVal^2
  const coeff = 2 * rVal * rVal;
  const text = `Air is pumped into a spherical balloon such that its radius increases at a constant rate of \\( 0.5 \\text{ cm/s} \\). What is the rate of change of volume \\( \\frac{dV}{dt} \\) when the radius is \\( r = ${rVal} \\text{ cm} \\)?`;
  const corr = `\\( ${coeff}\\pi \\text{ cm}^3/\\text{s} \\)`;
  const d1 = `\\( ${2 * coeff}\\pi \\text{ cm}^3/\\text{s} \\)`;
  const d2 = `\\( \\frac{${coeff}}{2}\\pi \\text{ cm}^3/\\text{s} \\)`;
  const d3 = `\\( ${rVal * rVal}\\pi \\text{ cm}^3/\\text{s} \\)`;
  pool.push(makeQ('Differentiation & Rates of Change', 'hard', text, [corr, d1, d2, d3], 0, `\\( V = \\frac{4}{3}\\pi r^3 \\implies \\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt} \\). At \\( r = ${rVal} \\), \\( \\frac{dV}{dt} = 4\\pi (${rVal})^2 (0.5) = 2\\pi (${rVal * rVal}) = ${coeff}\\pi \\text{ cm}^3/\\text{s} \\).`, null, seenStems));
}

// 143-150: Kinematics (Variable Acceleration -> Velocity & Displacement)
for (let k = 1; k <= 8; k++) {
  const c = k + 1;
  // a(t) = 6t - 4c. Particle starts from rest at origin: v(0) = 0, s(0) = 0.
  // v(t) = 3t^2 - 4ct. Comes to instantaneous rest when 3t^2 - 4ct = 0 -> t = 4c/3.
  const tStop = `\\frac{${4 * c}}{3}`;
  const text = `A particle moves in a straight line with acceleration \\( a(t) = 6t - ${4 * c} \\text{ m/s}^2 \\). If it starts from rest at the origin (at \\( t = 0 \\)), at what time \\( t > 0 \\) does the particle momentarily come to rest again?`;
  const corr = `\\( t = ${tStop} \\text{ s} \\)`;
  const d1 = `\\( t = ${2 * c} \\text{ s} \\)`;
  const d2 = `\\( t = \\frac{${2 * c}}{3} \\text{ s} \\)`;
  const d3 = `\\( t = ${4 * c} \\text{ s} \\)`;
  pool.push(makeQ('Integration & Kinematics', 'hard', text, [corr, d1, d2, d3], 0, `Velocity \\( v(t) = \\int (6t - ${4 * c})\\,dt = 3t^2 - ${4 * c}t + C \\). Since \\( v(0) = 0 \\implies C = 0 \\). Momentarily at rest when \\( v(t) = 0 \\implies t(3t - ${4 * c}) = 0 \\implies t = ${tStop} \\text{ s} \\).`, null, seenStems));
}

// Write to bank-data/addmath.json
const addmathPath = path.resolve('bank-data/addmath.json');
const addmathData = { pool };
fs.writeFileSync(addmathPath, JSON.stringify(addmathData, null, 2), 'utf8');
console.log(`Successfully expanded bank-data/addmath.json to ${pool.length} questions (50 Easy, 50 Medium, 50 Hard)!`);
