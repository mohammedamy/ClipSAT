'use strict';
const { ri, pick, frac, texFrac, M, co, sg, sgv, nd } = require('./bluebook_core');

const QUAD = 'Equivalent Expressions & Quadratic Equations';
const EXPO = 'Exponentials, Radicals, Polynomials & Rational Expressions';
const NONLIN = 'Nonlinear Functions & Function Notation';
const DESMOS = 'Desmos Graphing Calculator Tactics';

function quadStr(a, b, c, v = 'x') {
  return `${co(a, `${v}^2`)}${sgv(b, v)}${sg(c)}`;
}

const quad = {
  medium: [
    (r) => { const p = ri(r, 1, 9), q = ri(r, 1, 9); if (p === q) return null;
      return { text: `What is the sum of the solutions to the equation ${M(`x^2 - ${p + q}x + ${p * q} = 0`)}?`, ans: String(p + q), dists: nd(p + q, [p * q, -(p + q), p - q]), sol: `Factor: ${M(`(x - ${p})(x - ${q}) = 0`)}, so the solutions are ${p} and ${q}, whose sum is ${p + q}.` }; },
    (r) => { const a = ri(r, 2, 5), b = ri(r, 1, 7);
      return { type: 'mcq', text: `Which expression is equivalent to ${M(`(${a}x + ${b})^2`)}?`, ans: M(quadStr(a * a, 2 * a * b, b * b)), dists: [M(quadStr(a * a, 0, b * b)), M(quadStr(a * a, a * b, b * b)), M(quadStr(a, 2 * a * b, b))], sol: `${M(`(${a}x + ${b})^2 = ${a * a}x^2 + 2(${a}x)(${b}) + ${b * b} = ${quadStr(a * a, 2 * a * b, b * b)}`)}.` }; }
  ],
  hard: [
    (r) => { const k = ri(r, 2, 8);
      return { text: `In the given equation ${M(`x^2 - ${2 * k}x + c = 0`)}, ${M('c')} is a constant. The equation has exactly one real solution. What is the value of ${M('c')}?`, ans: String(k * k), dists: nd(k * k, [2 * k, 4 * k * k, k]), sol: `Exactly one real solution means the discriminant is zero: ${M(`(${2 * k})^2 - 4c = 0`)}, so ${M(`c = ${k * k}`)}.` }; },
    (r) => { const p = ri(r, 1, 6), q = ri(r, -6, -1), a = ri(r, 2, 4);
      return { text: `The function ${M(`f(x) = ${a}(x - ${p})(x + ${-q})`)} is graphed in the ${M('xy')}-plane. What is the ${M('x')}-coordinate of the vertex of the graph?`, ans: String((p + q) / 2), dists: nd((p + q) / 2, [p + q, p, (p - q) / 2]), sol: `The vertex lies midway between the zeros ${p} and ${q}: ${M(`x = \\frac{${p} + (${q})}{2} = ${(p + q) / 2}`)}.` }; },
    (r) => { const a = ri(r, 2, 5), h = ri(r, 1, 6), k = ri(r, -9, 9);
      const b = -2 * a * h, c = a * h * h + k;
      return { text: `The function ${M(`f(x) = ${quadStr(a, b, c)}`)} has a minimum value. What is the minimum value of ${M('f(x)')}?`, ans: String(k), dists: nd(k, [h, c, -k]), sol: `Completing the square: ${M(`f(x) = ${a}(x - ${h})^2${sg(k)}`)}, so the minimum value is ${k}, at ${M(`x = ${h}`)}.` }; }
  ]
};

const expo = {
  medium: [
    (r) => { const b = pick(r, [2, 3, 5]), m = ri(r, 2, 4), n = ri(r, 1, 4);
      return { text: `If ${M(`${b}^{x} = ${b ** m}`)}, what is the value of ${M(`${b}^{x + ${n}}`)}?`, ans: String(b ** (m + n)), dists: nd(b ** (m + n), [b ** m + n, b ** m * n, b ** (m * n)]), sol: `${M(`x = ${m}`)}, so ${M(`${b}^{x + ${n}} = ${b}^{${m + n}} = ${b ** (m + n)}`)}.` }; },
    (r) => { const k = ri(r, 2, 9), c = ri(r, 1, 6), x = k * k - c;
      return { text: `If ${M(`\\sqrt{x + ${c}} = ${k}`)}, what is the value of ${M('x')}?`, ans: String(x), dists: nd(x, [k * k, k - c, k * k + c]), sol: `Square both sides: ${M(`x + ${c} = ${k * k}`)}, so ${M(`x = ${x}`)}. Checking: ${M(`\\sqrt{${k * k}} = ${k}`)}.` }; }
  ],
  hard: [
    (r) => { const P = ri(r, 2, 9) * 100, pct = pick(r, [10, 20, 25, 50]);
      return { type: 'mcq', text: `A population of ${P} bacteria increases by ${pct}% every hour. Which function ${M('B')} models the number of bacteria ${M('t')} hours after the population was ${P}?`, ans: M(`B(t) = ${P}(${(1 + pct / 100).toString()})^{t}`), dists: [M(`B(t) = ${P}(0.${pct === 10 ? '10' : pct})^{t}`), M(`B(t) = ${P} + ${pct}t`), M(`B(t) = ${P}(${pct})^{t}`)], sol: `Increasing by ${pct}% multiplies the population by ${1 + pct / 100} each hour, so ${M(`B(t) = ${P}(${1 + pct / 100})^{t}`)}.` }; }
  ]
};

const nonlin = {
  easy: [
    (r) => { const a = ri(r, 2, 5), b = ri(r, -9, 9), x = ri(r, -4, 4) || 3;
      return { text: `The function ${M('f')} is defined by ${M(`f(x) = ${a}x^2${sg(b)}`)}. What is the value of ${M(`f(${x})`)}?`, ans: String(a * x * x + b), dists: nd(a * x * x + b, [a * x + b, (a * x) ** 2 + b, -a * x * x + b]), sol: `${M(`f(${x}) = ${a}(${x})^2${sg(b)} = ${a * x * x}${sg(b)} = ${a * x * x + b}`)}.` }; },
    (r) => { const a = ri(r, 2, 5), b = ri(r, 1, 9), x = ri(r, 2, 8);
      return { text: `The function ${M('g')} is defined by ${M(`g(x) = ${a}x + ${b}`)}. If ${M(`g(k) = ${a * x + b}`)}, what is the value of ${M('k')}?`, ans: String(x), dists: nd(x, [a * (a * x + b) + b, x + 1, a * x]), sol: `${M(`${a}k + ${b} = ${a * x + b}`)}, so ${M(`${a}k = ${a * x}`)} and ${M(`k = ${x}`)}.` }; }
  ],
  medium: [
    (r) => { const a = ri(r, 2, 4), b = ri(r, -5, 5), c = ri(r, 1, 5), k = ri(r, -3, 3); const g = k * k - c, ans = a * g + b;
      return { text: `The functions ${M('f')} and ${M('g')} are defined by ${M(`f(x) = ${a}x${sg(b)}`)} and ${M(`g(x) = x^2 - ${c}`)}. What is the value of ${M(`f(g(${k}))`)}?`, ans: String(ans), dists: nd(ans, [(a * k + b) ** 2 - c, g, a * k * k + b]), sol: `${M(`g(${k}) = ${k * k} - ${c} = ${g}`)}, then ${M(`f(${g}) = ${a}(${g})${sg(b)} = ${ans}`)}.` }; },
    (r) => { const A = ri(r, 2, 9) * 10, b = pick(r, [2, 3]), t = ri(r, 2, 4);
      return { text: `The function ${M(`P(t) = ${A}(${b})^{t}`)} models the number of visitors to a new website ${M('t')} weeks after launch. According to the model, how many visitors are there after ${t} weeks?`, ans: String(A * b ** t), dists: nd(A * b ** t, [A * b * t, (A * b) ** t > 1e6 ? A * t : (A * b) ** t, A + b ** t]), sol: `${M(`P(${t}) = ${A}(${b})^{${t}} = ${A}(${b ** t}) = ${A * b ** t}`)}.` }; },
    (r) => { const v = pick(r, [32, 48, 64, 80, 96]), s = ri(r, 0, 10) * 2, t = v / 32, hmax = -16 * t * t + v * t + s;
      return { text: `The height, in feet, of a ball ${M('t')} seconds after it is thrown upward is modeled by ${M(`h(t) = -16t^2 + ${v}t${sg(s)}`)}. What is the maximum height, in feet, of the ball?`, ans: String(hmax), dists: nd(hmax, [s, v * t, hmax - s + 1]), sol: `The maximum occurs at ${M(`t = \\frac{${v}}{2(16)} = ${t}`)}. ${M(`h(${t}) = -16(${t * t}) + ${v}(${t})${sg(s)} = ${hmax}`)}.` }; }
  ],
  hard: [
    (r) => { const h = ri(r, 2, 7), c = ri(r, -9, 9), d = ri(r, 1, 5);
      return { text: `The function ${M('f')} is defined by ${M(`f(x) = x^2${sg(c)}`)}. The function ${M('g')} is defined by ${M(`g(x) = f(x - ${h})`)}. What is the value of ${M(`g(${h + d})`)}?`, ans: String(d * d + c), dists: nd(d * d + c, [(h + d) ** 2 + c, (d + 2 * h) ** 2 + c, d * d]), sol: `${M(`g(${h + d}) = f(${h + d} - ${h}) = f(${d}) = ${d * d}${sg(c)} = ${d * d + c}`)}.` }; },
    (r) => { const a = ri(r, 2, 5), b = ri(r, -6, 6), c = ri(r, -9, 9);
      return { text: `For the quadratic function ${M('f')}, ${M(`f(0) = ${c}`)}, ${M(`f(1) = ${a + b + c}`)}, and ${M(`f(-1) = ${a - b + c}`)}. If ${M('f(x) = ax^2 + bx + c')}, where ${M('a')}, ${M('b')}, and ${M('c')} are constants, what is the value of ${M('a')}?`, ans: String(a), dists: nd(a, [b, a + b + c, -a]), sol: `${M(`f(1) + f(-1) = 2a + 2c`)}, so ${M(`${2 * a + 2 * c} = 2a + ${2 * c}`)} and ${M(`a = ${a}`)}.` }; },
    (r) => { const A = pick(r, [64, 80, 96, 128, 160, 192, 240, 320]), h = pick(r, [3, 5, 6, 8, 10, 12]), n = ri(r, 2, 3);
      return { text: `A substance decays so that the amount remaining, in grams, ${M('t')} hours after it is measured is ${M(`A(t) = ${A}\\left(\\frac{1}{2}\\right)^{t/${h}}`)}. How many grams remain ${n * h} hours after it is measured?`, ans: String(A / 2 ** n), dists: nd(A / 2 ** n, [A / (2 * n), A - n * h, A / 2]), sol: `${M(`A(${n * h}) = ${A}\\left(\\frac{1}{2}\\right)^{${n}} = \\frac{${A}}{${2 ** n}} = ${A / 2 ** n}`)}.` }; },
    (r) => { const A = ri(r, 2, 8), b = pick(r, [2, 3]), n = ri(r, 3, 4);
      return { text: `For the exponential function ${M('f')}, ${M(`f(0) = ${A}`)} and ${M(`f(1) = ${A * b}`)}. What is the value of ${M(`f(${n})`)}?`, ans: String(A * b ** n), dists: nd(A * b ** n, [A * b * n, A + (A * b - A) * n, (A * b) ** n > 1e5 ? A * n : (A * b) ** n]), sol: `${M(`f(x) = ${A}(${b})^{x}`)} because the initial value is ${A} and the growth factor is ${M(`\\frac{${A * b}}{${A}} = ${b}`)}. So ${M(`f(${n}) = ${A * b ** n}`)}.` }; },
    (r) => { const p = ri(r, 1, 5), q = ri(r, 1, 5), c = ri(r, 2, 9);
      return { text: `The function ${M('h')} is defined by ${M(`h(x) = (x - ${p})(x + ${q})`)}. The graph of ${M('y = h(x) + ' + c)} in the ${M('xy')}-plane crosses the ${M('y')}-axis at the point ${M('(0, b)')}. What is the value of ${M('b')}?`, ans: String(-p * q + c), dists: nd(-p * q + c, [-p * q, p * q + c, c]), sol: `${M(`h(0) = (-${p})(${q}) = ${-p * q}`)}, so ${M(`b = ${-p * q} + ${c} = ${-p * q + c}`)}.` }; },
    (r) => { const k = ri(r, 2, 6), a = ri(r, 1, 4), x0 = ri(r, 2, 6);
      return { text: `The function ${M('f')} is defined by ${M(`f(x) = ${k}x - ${a}`)}. If ${M(`f(t + 1) = ${k * (x0 + 1) - a}`)}, what is the value of ${M('t')}?`, ans: String(x0), dists: nd(x0, [x0 + 1, x0 - 1, k * x0]), sol: `${M(`${k}(t + 1) - ${a} = ${k * (x0 + 1) - a}`)}, so ${M(`${k}(t + 1) = ${k * (x0 + 1)}`)}, ${M(`t + 1 = ${x0 + 1}`)}, and ${M(`t = ${x0}`)}.` }; }
  ]
};

/* Graph-based xy-plane problems: the kind of SAT item the built-in Desmos calculator helps with.
   Figures are attached ONLY when the stem says the graph is shown and the solver must read it. */
const desmos = {
  easy: [
    (r) => { const m = ri(r, 1, 3) * pick(r, [1, -1]), b = ri(r, -3, 4), x1 = 2; const ask = pick(r, ['f(0)', 'f(2)', 'slope']);
      const ans = ask === 'f(0)' ? b : (ask === 'f(2)' ? m * x1 + b : m);
      const q = ask === 'slope' ? `What is the slope of the graph of ${M('y = f(x)')}?` : `What is the value of ${M(ask)}?`;
      return { text: `The graph of the linear function ${M('f')} is shown. ${q}`, ans: String(ans), dists: nd(ans, [b, m * x1 + b, m, -ans, ans + 1]), sol: ask === 'slope' ? `The line passes through ${M(`(0, ${b})`)} and ${M(`(2, ${m * 2 + b})`)}, so its slope is ${M(`\\frac{${m * 2 + b} - (${b})}{2 - 0} = ${m}`)}.` : `Read the graph at ${M(`x = ${ask === 'f(0)' ? 0 : 2}`)}: the line passes through ${M(`(${ask === 'f(0)' ? 0 : 2}, ${ans})`)}, so ${M(`${ask} = ${ans}`)}.`,
        fig: { type: 'fn', fns: [`${m}*x + ${b}`], xrange: [-5, 5], yrange: [-8, 8], points: [{ x: 0, y: b }, { x: x1, y: m * x1 + b }] } }; },
    (r) => { const p = ri(r, -4, -1), q = ri(r, 1, 4);
      return { text: `What is the positive ${M('x')}-intercept of the graph of ${M(`y = ${quadStr(1, -(p + q), p * q)}`)} in the ${M('xy')}-plane?`, ans: String(q), dists: nd(q, [-p, p * q, p + q]), sol: `Setting ${M('y = 0')}: ${M(`(x - ${q})(x + ${-p}) = 0`)}, so ${M(`x = ${q}`)} or ${M(`x = ${p}`)}. The positive intercept is ${q}.` }; },
    (r) => { const m1 = ri(r, 1, 4), b1 = ri(r, -5, 5), m2 = -ri(r, 1, 4), x = ri(r, -3, 4), b2 = (m1 - m2) * x + b1;
      return { text: `The graphs of ${M(`y = ${co(m1, 'x')}${sg(b1)}`)} and ${M(`y = ${co(m2, 'x')}${sg(b2)}`)} intersect at the point ${M('(a, b)')} in the ${M('xy')}-plane. What is the value of ${M('a')}?`, ans: String(x), dists: nd(x, [m1 * x + b1, -x, x + 1]), sol: `Set the expressions equal: ${M(`${co(m1, 'x')}${sg(b1)} = ${co(m2, 'x')}${sg(b2)}`)}, giving ${M(`${m1 - m2}x = ${b2 - b1}`)} and ${M(`a = ${x}`)}.` }; }
  ],
  medium: [
    (r) => { const h = ri(r, -3, 3), k = ri(r, -4, 2), a = pick(r, [1, 1, 2]);
      return { text: `The graph of ${M(`y = ${a === 1 ? '' : a}(x - h)^2 + k`)}, where ${M('h')} and ${M('k')} are constants, is shown. What is the value of ${M('h + k')}?`, ans: String(h + k), dists: nd(h + k, [h - k, -h + k, h * k]), sol: `The vertex of the parabola shown is ${M(`(${h}, ${k})`)}, so ${M(`h = ${h}`)}, ${M(`k = ${k}`)}, and ${M(`h + k = ${h + k}`)}.`,
        fig: { type: 'fn', fns: [`${a}*(x - (${h}))**2 + (${k})`], xrange: [-6, 6], yrange: [-6, 8], points: [{ x: h, y: k }] } }; },
    (r) => { const c = ri(r, 1, 9), m = ri(r, 1, 4);
      return { text: `How many points of intersection do the graphs of ${M(`y = x^2 + ${c}`)} and ${M(`y = ${m}x`)} have in the ${M('xy')}-plane?`, ans: String(m * m - 4 * c > 0 ? 2 : (m * m - 4 * c === 0 ? 1 : 0)), dists: ['0', '1', '2', '3'], sol: `Setting ${M(`x^2 + ${c} = ${m}x`)} gives ${M(`x^2 - ${m}x + ${c} = 0`)} with discriminant ${M(`${m * m} - ${4 * c} = ${m * m - 4 * c}`)}, which determines the number of intersections.` }; },
    (r) => { const h = ri(r, -5, 5), k = ri(r, -5, 5), rr = ri(r, 2, 9);
      return { text: `The equation of a circle in the ${M('xy')}-plane is ${M(`(x${sg(-h)})^2 + (y${sg(-k)})^2 = ${rr * rr}`)}. What is the radius of the circle?`, ans: String(rr), dists: nd(rr, [rr * rr, 2 * rr, rr + 1]), sol: `In ${M('(x - h)^2 + (y - k)^2 = r^2')}, ${M(`r^2 = ${rr * rr}`)}, so ${M(`r = ${rr}`)}.` }; }
  ],
  hard: [
    (r) => { const m = ri(r, 1, 4), b = ri(r, -4, 4);
      const c = (m * m) / 4 + b; if (!Number.isInteger(c)) return null;
      return { text: `In the ${M('xy')}-plane, the line ${M(`y = ${co(m, 'x')} - c`)} and the parabola ${M(`y = x^2${sg(-b)}`)} intersect at exactly one point, where ${M('c')} is a constant. What is the value of ${M('c')}?`, ans: String(c), dists: nd(c, [-c, m * m, b]), sol: `Set ${M(`x^2${sg(-b)} = ${co(m, 'x')} - c`)}: ${M(`x^2 - ${co(m, 'x')} + (c${sg(-b)}) = 0`)}. One intersection means the discriminant is 0: ${M(`${m * m} - 4(c${sg(-b)}) = 0`)}, so ${M(`c = ${c}`)}.` }; },
    (r) => { const x1 = ri(r, -4, 0), x2 = ri(r, 1, 4), a = pick(r, [1, -1]);
      return { text: `The graph of ${M(`y = ${a === 1 ? '' : '-'}(x${sg(-x1)})(x${sg(-x2)})`)} intersects the ${M('x')}-axis at the points ${M('(p, 0)')} and ${M('(q, 0)')}. What is the value of ${M('q - p')}, where ${M('q > p')}?`, ans: String(x2 - x1), dists: nd(x2 - x1, [x2 + x1, x1 * x2, x2]), sol: `The ${M('x')}-intercepts are ${x1} and ${x2}, so ${M(`q - p = ${x2} - (${x1}) = ${x2 - x1}`)}.` }; },
    (r) => { const h = ri(r, -6, 6), k = ri(r, -6, 6), rr = ri(r, 2, 8); const D = -2 * h, E = -2 * k, F = h * h + k * k - rr * rr;
      return { text: `The equation ${M(`x^2 + y^2${sgv(D, 'x')}${sgv(E, 'y')}${sg(F)} = 0`)} defines a circle in the ${M('xy')}-plane. What is the radius of the circle?`, ans: String(rr), dists: nd(rr, [rr * rr, Math.abs(F), rr + 2]), sol: `Completing the square: ${M(`(x${sg(-h)})^2 + (y${sg(-k)})^2 = ${rr * rr}`)}, so the radius is ${rr}.` }; }
  ]
};
desmos.medium[1].mcqOnly = true;

module.exports = { QUAD, EXPO, NONLIN, DESMOS, quad, expo, nonlin, desmos };
