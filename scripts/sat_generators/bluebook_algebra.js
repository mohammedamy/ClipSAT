'use strict';
const { ri, pick, frac, texFrac, M, co, sg, sgv, money, nd } = require('./bluebook_core');

const LIN_EQ = 'Linear Equations in One Variable & Systems of Equations';
const LIN_FN = 'Linear Functions & Linear Inequalities';

const SERVICES = [
  ['A plumber charges', 'hour', 'hours did the job take'],
  ['An electrician charges', 'hour', 'hours did the electrician work'],
  ['A moving company charges', 'mile', 'miles was the move'],
  ['A kayak rental shop charges', 'hour', 'hours was the kayak rented'],
  ['A taxi company charges', 'mile', 'miles was the trip'],
  ['A tutoring center charges', 'session', 'sessions did the student attend']
];
const TICKET_CTX = [
  ['A museum', 'adult tickets', 'student tickets'],
  ['A school play', 'adult tickets', 'child tickets'],
  ['An aquarium', 'general admission tickets', 'senior tickets'],
  ['A science fair', 'exhibitor passes', 'visitor passes'],
  ['A bakery', 'large pies', 'small pies'],
  ['A garden center', 'shrubs', 'flats of flowers']
];

const linEq = {
  easy: [
    (r) => { const a = ri(r, 2, 9), x = ri(r, 2, 14), b = ri(r, 1, 20), c = a * x + b;
      return { text: `If ${M(`${a}x + ${b} = ${c}`)}, what is the value of ${M('x')}?`, ans: String(x), dists: nd(x, [x + 1, (c + b) / a, c - b]), sol: `Subtract ${b} from both sides to get ${M(`${a}x = ${c - b}`)}, then divide by ${a}: ${M(`x = ${x}`)}.` }; },
    (r) => { const a = ri(r, 2, 6), b = ri(r, 1, 9), x = ri(r, b + 1, b + 12), c = a * (x - b);
      return { text: `If ${M(`${a}(x - ${b}) = ${c}`)}, what is the value of ${M('x')}?`, ans: String(x), dists: nd(x, [c / a, x - 2 * b, c - b]), sol: `Divide both sides by ${a}: ${M(`x - ${b} = ${c / a}`)}. Add ${b}: ${M(`x = ${x}`)}.` }; },
    (r) => { const k = ri(r, 2, 6), x = ri(r, 2, 9), m = ri(r, 2, 4);
      return { text: `If ${M(`${k}x = ${k * x}`)}, what is the value of ${M(`${k * m}x`)}?`, ans: String(k * m * x), dists: nd(k * m * x, [x, k * x, m * x]), sol: `Multiply both sides of ${M(`${k}x = ${k * x}`)} by ${m}: ${M(`${k * m}x = ${k * m * x}`)}.` }; },
    (r) => { const [who, unit, ask] = pick(r, SERVICES); const f = ri(r, 3, 12) * 5, rate = ri(r, 3, 15) * 5, h = ri(r, 2, 9), t = f + rate * h;
      return { text: `${who} a one-time fee of ${money(f)} plus ${money(rate)} per ${unit}. If the total charge was ${money(t)}, how many ${ask}?`, ans: String(h), dists: nd(h, [h + 1, Math.round(t / rate), h - 1]), sol: `Let ${M('n')} be the number of ${unit}s. Then ${M(`${f} + ${rate}n = ${t}`)}, so ${M(`${rate}n = ${t - f}`)} and ${M(`n = ${h}`)}.` }; },
    (r) => { const a = ri(r, 2, 6), x = a * ri(r, 2, 8), b = ri(r, 1, 9), c = x / a + b;
      return { text: `If ${M(`\\frac{x}{${a}} + ${b} = ${c}`)}, what is the value of ${M('x')}?`, ans: String(x), dists: nd(x, [c - b, a * c, x + a]), sol: `Subtract ${b}: ${M(`\\frac{x}{${a}} = ${c - b}`)}. Multiply by ${a}: ${M(`x = ${x}`)}.` }; },
    (r) => { const c2 = ri(r, 2, 5), d = c2 + ri(r, 1, 4), x = ri(r, 2, 10), b = ri(r, 1, 15), e = (d - c2) * x + b;
      return { text: `If ${M(`${d}x + ${b} = ${c2}x + ${e}`)}, what is the value of ${M('x')}?`, ans: String(x), dists: nd(x, [(e - b) / (d + c2), e - b, x + 2]), sol: `Subtract ${M(`${c2}x`)} and ${b} from both sides: ${M(`${d - c2}x = ${e - b}`)}, so ${M(`x = ${x}`)}.` }; }
  ],
  medium: [
    (r) => { const k = ri(r, 2, 5), a = ri(r, 2, 7), x = ri(r, 2, 9), c = (a + k) * x;
      return { text: `In the system of equations ${M(`y = ${k}x`)} and ${M(`${a}x + y = ${c}`)}, what is the value of ${M('x')}?`, ans: String(x), dists: nd(x, [k * x, c / a, x + 1]), sol: `Substitute ${M(`y = ${k}x`)}: ${M(`${a}x + ${k}x = ${c}`)}, so ${M(`${a + k}x = ${c}`)} and ${M(`x = ${x}`)}.` }; },
    (r) => { const a = ri(r, 2, 6), b = ri(r, 1, 9), mode = ri(r, 0, 2); const c = mode === 0 ? a * b : a * b + ri(r, 1, 5);
      const ans = mode === 0 ? 'Infinitely many solutions' : 'No solution';
      const opts = ['Exactly one solution', 'Exactly two solutions', 'No solution', 'Infinitely many solutions'];
      return { type: 'mcq', text: `How many solutions does the equation ${M(`${a}(x + ${b}) = ${a}x + ${c}`)} have?`, ans, dists: opts.filter(o => o !== ans).slice(0, 3), sol: `Distributing gives ${M(`${a}x + ${a * b} = ${a}x + ${c}`)}. ${mode === 0 ? 'Both sides are identical, so every real number is a solution.' : `Subtracting ${M(`${a}x`)} leaves ${M(`${a * b} = ${c}`)}, which is false, so there is no solution.`}` }; },
    (r) => { const [place, A, B] = pick(r, TICKET_CTX); const pa = ri(r, 6, 15), pb = ri(r, 2, pa - 2), na = ri(r, 10, 60), nb = ri(r, 10, 60), N = na + nb, R = pa * na + pb * nb;
      return { text: `${place} sold a total of ${N} ${A} and ${B}. Each of the ${A} cost ${money(pa)} and each of the ${B} cost ${money(pb)}. If the total revenue was ${money(R)}, how many ${A} were sold?`, ans: String(na), dists: nd(na, [nb, Math.round(R / pa), na + 5]), sol: `Let ${M('a')} be the number of ${A}. Then ${M(`${pa}a + ${pb}(${N} - a) = ${R}`)}, so ${M(`${pa - pb}a = ${R - pb * N}`)} and ${M(`a = ${na}`)}.` }; },
    (r) => { const n = ri(r, 2, 5), d = n + ri(r, 1, 4), x = d * ri(r, 2, 6), c = ri(r, 1, 9), rhs = (n * x) / d - c;
      return { text: `If ${M(`\\frac{${n}}{${d}}x - ${c} = ${rhs}`)}, what is the value of ${M('x')}?`, ans: String(x), dists: nd(x, [rhs + c, (rhs + c) * n, x - d]), sol: `Add ${c}: ${M(`\\frac{${n}}{${d}}x = ${rhs + c}`)}. Multiply by ${M(`\\frac{${d}}{${n}}`)}: ${M(`x = ${x}`)}.` }; },
    (r) => { const x = ri(r, 1, 9), y = ri(r, 1, 9), a = ri(r, 2, 5), b = ri(r, 1, 4);
      return { text: `If ${M(`${a}x + ${b}y = ${a * x + b * y}`)} and ${M(`${a}x - ${b}y = ${a * x - b * y}`)}, what is the value of ${M('y')}?`, ans: String(y), dists: nd(y, [x, a * x, 2 * y]), sol: `Subtract the second equation from the first: ${M(`${2 * b}y = ${2 * b * y}`)}, so ${M(`y = ${y}`)}.` }; }
  ],
  hard: [
    (r) => { const a = ri(r, 2, 7), b = ri(r, 2, 7), s = a + b; const x = ri(r, -4, 9), y = ri(r, -4, 9);
      return { text: `If ${M(`${a}x + ${b}y = ${a * x + b * y}`)} and ${M(`${b}x + ${a}y = ${b * x + a * y}`)}, what is the value of ${M('x + y')}?`, ans: String(x + y), dists: nd(x + y, [s * (x + y), x - y, x + y + 1]), sol: `Adding the equations gives ${M(`${s}x + ${s}y = ${s * (x + y)}`)}. Dividing by ${s}: ${M(`x + y = ${x + y}`)}.` }; },
    (r) => { const a = ri(r, 2, 6), b = ri(r, 2, 7), m = ri(r, 2, 4), c = ri(r, 3, 20), d = c * m + ri(r, 1, 9);
      return { text: `In the system of equations ${M(`${a}x + ${b}y = ${c}`)} and ${M(`kx + ${b * m}y = ${d}`)}, ${M('k')} is a constant. For what value of ${M('k')} does the system have no solution?`, ans: String(a * m), dists: nd(a * m, [a, b * m, -a * m]), sol: `No solution means parallel lines: the coefficients must be proportional but the constants not. Since ${M(`${b * m} = ${m}(${b})`)}, ${M(`k = ${m}(${a}) = ${a * m}`)}, and ${M(`${d} \\ne ${m}(${c})`)}.` }; },
    (r) => { const p1 = pick(r, [10, 20, 25]), p2 = pick(r, [40, 50, 60]), V = ri(r, 4, 12) * 5, pt = ri(r, 1, 3); const pm = p1 + (p2 - p1) * pt / 4; const x = V * (p2 - pm) / (p2 - p1);
      if (!Number.isInteger(x) || !Number.isInteger(pm)) return null;
      return { text: `A chemist mixes a ${p1}% saline solution with a ${p2}% saline solution to make ${V} liters of a ${pm}% saline solution. How many liters of the ${p1}% solution does the chemist use?`, ans: String(x), dists: nd(x, [V - x, V / 2, x + 5]), sol: `Let ${M('x')} be the liters of ${p1}% solution: ${M(`0.${String(p1).padStart(2, '0')}x + 0.${p2}(${V} - x) = 0.${String(pm).padStart(2, '0')}(${V})`)}. Solving gives ${M(`x = ${x}`)}.` }; },
    (r) => { const a = ri(r, 2, 5), k = ri(r, 2, 9), b = ri(r, 1, 8);
      return { text: `The equation ${M(`${a}(${k}x - ${b}) = ${a * k}x + c`)}, where ${M('c')} is a constant, has infinitely many solutions. What is the value of ${M('c')}?`, ans: String(-a * b), dists: nd(-a * b, [a * b, -b, -k * b]), sol: `Expanding the left side gives ${M(`${a * k}x - ${a * b}`)}. For infinitely many solutions both sides must be identical, so ${M(`c = ${-a * b}`)}.` }; },
    (r) => { const x = ri(r, 2, 9), y = ri(r, 2, 9), a = ri(r, 2, 5), b = ri(r, 2, 5), c = ri(r, 2, 5), d = ri(r, 2, 6); if (a * d === b * c) return null;
      return { text: `\\[ \\begin{cases} ${a}x + ${b}y = ${a * x + b * y} \\\\ ${c}x - ${d}y = ${c * x - d * y} \\end{cases} \\] The solution to the given system of equations is ${M('(x, y)')}. What is the value of ${M('x - y')}?`, ans: String(x - y), dists: nd(x - y, [x + y, y - x, x * y]), sol: `Solving by elimination gives ${M(`x = ${x}`)} and ${M(`y = ${y}`)}, so ${M(`x - y = ${x - y}`)}.` }; }
  ]
};

const linFn = {
  easy: [
    (r) => { const x1 = ri(r, -5, 3), x2 = x1 + ri(r, 1, 5), m = ri(r, -4, 5) || 2, b = ri(r, -6, 8), y1 = m * x1 + b, y2 = m * x2 + b;
      return { text: `A line in the ${M('xy')}-plane passes through the points ${M(`(${x1}, ${y1})`)} and ${M(`(${x2}, ${y2})`)}. What is the slope of the line?`, ans: String(m), dists: nd(m, [-m, frac(x2 - x1, y2 - y1), y2 - y1]), sol: `Slope ${M(`= \\frac{${y2} - (${y1})}{${x2} - (${x1})} = \\frac{${y2 - y1}}{${x2 - x1}} = ${m}`)}.` }; },
    (r) => { const a = ri(r, 2, 9), b = ri(r, 2, 6), k = ri(r, -6, 9) || 4;
      return { text: `What is the ${M('y')}-intercept of the graph of ${M(`${a}x + ${b}y = ${b * k}`)} in the ${M('xy')}-plane?`, ans: M(`(0, ${k})`), dists: [M(`(0, ${b * k})`), M(`(${k}, 0)`), M(`(0, ${a * k})`)], type: 'mcq', sol: `Set ${M('x = 0')}: ${M(`${b}y = ${b * k}`)}, so ${M(`y = ${k}`)}. The ${M('y')}-intercept is ${M(`(0, ${k})`)}.` }; },
    (r) => { const m = ri(r, 2, 9), b = ri(r, 5, 40), x = ri(r, 2, 12);
      return { text: `The function ${M(`f(x) = ${m}x + ${b}`)} gives the total cost, in dollars, of renting a bicycle for ${M('x')} hours. What is the value of ${M(`f(${x})`)}?`, ans: String(m * x + b), dists: nd(m * x + b, [m * x, m + b * x, m * (x + b)]), sol: `${M(`f(${x}) = ${m}(${x}) + ${b} = ${m * x + b}`)}.` }; }
  ],
  medium: [
    (r) => { const a = ri(r, 2, 6), b = ri(r, 1, 9), c = a * ri(r, 3, 10) + b + ri(r, 1, a - 1 || 1);
      const lim = (c - b) / a, gi = Math.floor(lim - 1e-9);
      return { text: `What is the greatest integer value of ${M('x')} that satisfies the inequality ${M(`${a}x + ${b} < ${c}`)}?`, ans: String(gi), dists: nd(gi, [gi + 1, Math.ceil(lim) + 1, c - b]), sol: `Subtract ${b}: ${M(`${a}x < ${c - b}`)}, so ${M(`x < ${texFrac(frac(c - b, a))}`)}. The greatest integer less than this is ${gi}.` }; },
    (r) => { const m = ri(r, 2, 6), b = ri(r, -9, 9), p = ri(r, 1, 6);
      return { text: `The linear function ${M('g')} satisfies ${M(`g(0) = ${b}`)} and ${M(`g(${p}) = ${m * p + b}`)}. What is the value of ${M(`g(${2 * p})`)}?`, ans: String(2 * m * p + b), dists: nd(2 * m * p + b, [2 * (m * p + b), m * p + b, 2 * m * p]), sol: `The slope is ${M(`\\frac{${m * p + b} - (${b})}{${p}} = ${m}`)}, so ${M(`g(x) = ${m}x${sg(b)}`)} and ${M(`g(${2 * p}) = ${2 * m * p + b}`)}.` }; },
    (r) => { const w = ri(r, 3, 9) * 5, d = ri(r, 2, 6), t = ri(r, 3, 12);
      return { type: 'mcq', text: `A water tank contains ${w} gallons of water and is drained at a constant rate of ${d} gallons per minute. Which equation gives the number of gallons ${M('G')} in the tank after ${M('t')} minutes?`, ans: M(`G = ${w} - ${d}t`), dists: [M(`G = ${w} + ${d}t`), M(`G = ${d} - ${w}t`), M(`G = ${w}t - ${d}`)], sol: `The tank starts at ${w} gallons and loses ${d} gallons each minute, so ${M(`G = ${w} - ${d}t`)}.` }; }
  ],
  hard: [
    (r) => { const m = ri(r, 2, 5), b = ri(r, -6, 6), x0 = ri(r, -4, 4), y0 = ri(r, -6, 6);
      const ans = frac(-1, m);
      return { text: `Line ${M('\\ell')} is defined by ${M(`y = ${m}x${sg(b)}`)}. Line ${M('k')} is perpendicular to line ${M('\\ell')} and passes through ${M(`(${x0}, ${y0})`)}. What is the slope of line ${M('k')}?`, ans, dists: nd(ans, [String(-m), String(m), frac(1, m)]), sol: `Perpendicular slopes are negative reciprocals. Since the slope of ${M('\\ell')} is ${m}, the slope of ${M('k')} is ${M(texFrac(ans))}.` }; }
  ]
};

module.exports = { LIN_EQ, LIN_FN, linEq, linFn };
