'use strict';
const { ri, pick, frac, texFrac, M, nd, numStr } = require('./bluebook_core');

const RATIO = 'Ratios, Rates, Proportions, Percentages & Scatterplots';
const STATS = 'One-Variable Statistics, Distributions & Margin of Error';
const PROB = 'Probability, Conditional Probability & Two-Way Tables';
const GEO = 'Area, Volume, Triangles, Circles & Trigonometry';

function list(r, n, lo, hi) { const a = []; for (let i = 0; i < n; i++) a.push(ri(r, lo, hi)); return a; }
const sum = (a) => a.reduce((s, v) => s + v, 0);

const TWT = [
  { intro: 'A group of students was asked whether they prefer to study in the morning or in the evening. The results are shown in the table, by grade level.', rows: ['Grade 10', 'Grade 11'], cols: ['Morning', 'Evening'], who: 'student' },
  { intro: 'A clinic recorded whether patients in a study received a new treatment and whether their symptoms improved. The results are shown in the table.', rows: ['Treatment', 'Placebo'], cols: ['Improved', 'Did not improve'], who: 'patient' },
  { intro: 'A survey asked adults in two neighborhoods whether they support building a new park. The results are shown in the table.', rows: ['Northside', 'Southside'], cols: ['Support', 'Oppose'], who: 'adult' },
  { intro: 'A biologist classified the frogs captured at two ponds by color. The results are shown in the table.', rows: ['Pond A', 'Pond B'], cols: ['Green', 'Brown'], who: 'frog' },
  { intro: 'A bookstore recorded the format of the books it sold in one week, by genre. The results are shown in the table.', rows: ['Fiction', 'Nonfiction'], cols: ['Print', 'Digital'], who: 'book' },
  { intro: 'A city surveyed commuters about how they travel to work, by age group. The results are shown in the table.', rows: ['Under 30', '30 or older'], cols: ['Public transit', 'Car'], who: 'commuter' }
];

function twoWay(r) {
  const ctx = pick(r, TWT);
  const d = [[ri(r, 8, 60), ri(r, 8, 60)], [ri(r, 8, 60), ri(r, 8, 60)]];
  const rt = [d[0][0] + d[0][1], d[1][0] + d[1][1]], ct = [d[0][0] + d[1][0], d[0][1] + d[1][1]], T = rt[0] + rt[1];
  const fig = { type: 'table', headers: ['', ctx.cols[0], ctx.cols[1], 'Total'], rows: [
    [ctx.rows[0], String(d[0][0]), String(d[0][1]), String(rt[0])],
    [ctx.rows[1], String(d[1][0]), String(d[1][1]), String(rt[1])],
    ['Total', String(ct[0]), String(ct[1]), String(T)]] };
  return { ctx, d, rt, ct, T, fig };
}

const prob = {
  easy: [
    (r) => { const t = twoWay(r), i = ri(r, 0, 1), j = ri(r, 0, 1), ans = frac(t.d[i][j], t.T);
      return { text: `${t.intro || t.ctx.intro} If one ${t.ctx.who} is selected at random from the group, what is the probability that the ${t.ctx.who} is in the category ${t.ctx.rows[i]} and ${t.ctx.cols[j]}?`, ans, dists: nd(ans, [frac(t.d[i][j], t.rt[i]), frac(t.d[i][j], t.ct[j]), frac(t.rt[i], t.T)]), sol: `There are ${t.d[i][j]} such ${t.ctx.who}s out of ${t.T} total, so the probability is ${M(`\\frac{${t.d[i][j]}}{${t.T}} = ${texFrac(ans)}`)}.`, fig: t.fig }; },
    (r) => { const red = ri(r, 2, 12), blue = ri(r, 2, 12), green = ri(r, 2, 12), T = red + blue + green, c = pick(r, [['red', red], ['blue', blue], ['green', green]]), ans = frac(c[1], T);
      return { text: `A bag contains ${red} red tiles, ${blue} blue tiles, and ${green} green tiles. If one tile is selected at random, what is the probability that it is ${c[0]}?`, ans, dists: nd(ans, [frac(c[1], T - c[1]), frac(1, 3), frac(T - c[1], T)]), sol: `There are ${T} tiles, ${c[1]} of which are ${c[0]}: ${M(`\\frac{${c[1]}}{${T}} = ${texFrac(ans)}`)}.` }; }
  ],
  medium: [
    (r) => { const t = twoWay(r), i = ri(r, 0, 1), j = ri(r, 0, 1), ans = frac(t.d[i][j], t.rt[i]);
      return { text: `${t.ctx.intro} If a ${t.ctx.who} in the category ${t.ctx.rows[i]} is selected at random, what is the probability that the ${t.ctx.who} is also in the category ${t.ctx.cols[j]}?`, ans, dists: nd(ans, [frac(t.d[i][j], t.T), frac(t.d[i][j], t.ct[j]), frac(t.d[i][1 - j], t.rt[i])]), sol: `Restrict to the ${t.rt[i]} ${t.ctx.who}s in ${t.ctx.rows[i]}; ${t.d[i][j]} of them are ${t.ctx.cols[j]}: ${M(`\\frac{${t.d[i][j]}}{${t.rt[i]}} = ${texFrac(ans)}`)}.`, fig: t.fig }; },
    (r) => { const p = pick(r, [12, 15, 18, 24, 30, 35, 40]), N = pick(r, [200, 300, 400, 500, 600]);
      return { text: `In a random sample of 100 light bulbs from a factory, ${p} were found to be defective. Based on the sample, how many defective bulbs would be expected in a shipment of ${N} bulbs from the same factory?`, ans: String(p * N / 100), dists: nd(p * N / 100, [N - p * N / 100, p * N / 10, p + N / 100]), sol: `The sample proportion is ${M(`\\frac{${p}}{100}`)}, so the expected number is ${M(`\\frac{${p}}{100}(${N}) = ${p * N / 100}`)}.` }; }
  ],
  hard: [
    (r) => { const t = twoWay(r), i = ri(r, 0, 1), j = ri(r, 0, 1); const hidden = t.fig.rows[i][j + 1]; t.fig.rows[i][j + 1] = '?';
      const ans = frac(t.d[i][j], t.rt[i]); if (hidden === '?') return null;
      return { text: `${t.ctx.intro} One entry in the table is missing. If a ${t.ctx.who} in the category ${t.ctx.rows[i]} is selected at random, what is the probability that the ${t.ctx.who} is in the category ${t.ctx.cols[j]}?`, ans, dists: nd(ans, [frac(t.d[i][1 - j], t.rt[i]), frac(t.d[i][j], t.T), frac(t.d[i][j], t.ct[j])]), sol: `The missing entry is ${M(`${t.rt[i]} - ${t.d[i][1 - j]} = ${t.d[i][j]}`)}. So the probability is ${M(`\\frac{${t.d[i][j]}}{${t.rt[i]}} = ${texFrac(ans)}`)}.`, fig: t.fig }; },
    (r) => { const t = twoWay(r), i = ri(r, 0, 1), j = ri(r, 0, 1), ans = frac(t.d[i][j], t.ct[j]);
      return { text: `${t.ctx.intro} A ${t.ctx.who} will be selected at random from those in the category ${t.ctx.cols[j]}. What is the probability that the ${t.ctx.who} is in the category ${t.ctx.rows[i]}?`, ans, dists: nd(ans, [frac(t.d[i][j], t.rt[i]), frac(t.d[i][j], t.T), frac(t.d[1 - i][j], t.ct[j])]), sol: `There are ${t.ct[j]} ${t.ctx.who}s in ${t.ctx.cols[j]}, of whom ${t.d[i][j]} are in ${t.ctx.rows[i]}: ${M(`\\frac{${t.d[i][j]}}{${t.ct[j]}} = ${texFrac(ans)}`)}.`, fig: t.fig }; },
    (r) => { const t = twoWay(r); const pr0 = t.d[0][0] / t.rt[0], pr1 = t.d[1][0] / t.rt[1]; if (Math.abs(pr0 - pr1) < 0.02) return null;
      const hi = pr0 > pr1 ? 0 : 1; const ans = t.ctx.rows[hi];
      return { type: 'mcq', text: `${t.ctx.intro} For which group is the proportion in the category ${t.ctx.cols[0]} greater?`, ans, dists: [t.ctx.rows[1 - hi], 'The proportions are equal.', 'There is not enough information to compare.'], sol: `${t.ctx.rows[0]}: ${M(`\\frac{${t.d[0][0]}}{${t.rt[0]}} \\approx ${pr0.toFixed(3)}`)}; ${t.ctx.rows[1]}: ${M(`\\frac{${t.d[1][0]}}{${t.rt[1]}} \\approx ${pr1.toFixed(3)}`)}. The larger proportion belongs to ${ans}.`, fig: t.fig }; }
  ]
};

const stats = {
  easy: [
    (r) => { const n = pick(r, [5, 6]), a = list(r, n, 4, 30); const m = sum(a) / n; if (!Number.isInteger(m)) return null;
      return { text: `What is the mean of the data set ${M(a.join(', '))}?`, ans: String(m), dists: nd(m, [a.slice().sort((x, y) => x - y)[Math.floor(n / 2)], sum(a), m + 1]), sol: `The sum is ${sum(a)} and there are ${n} values, so the mean is ${M(`\\frac{${sum(a)}}{${n}} = ${m}`)}.` }; },
    (r) => { const a = list(r, 6, 1, 40).sort((x, y) => x - y); const med = (a[2] + a[3]) / 2;
      const sh = a.slice().sort(() => r() - 0.5);
      return { text: `What is the median of the data set ${M(sh.join(', '))}?`, ans: numStr(med), dists: nd(numStr(med), [sh[2], a[2], numStr(sum(a) / 6)]), sol: `In order: ${M(a.join(', '))}. The median is the mean of the middle two values: ${M(`\\frac{${a[2]} + ${a[3]}}{2} = ${numStr(med)}`)}.` }; },
    (r) => { const k = ri(r, 4, 7), m = ri(r, 70, 88), need = ri(r, 80, 98); const prev = m * (k - 1) - 0; const target = (prev + need) / k; if (!Number.isInteger(target)) return null;
      return { text: `A student's mean score on ${k - 1} quizzes is ${m}. What score must the student earn on the next quiz so that the mean of all ${k} quiz scores is ${target}?`, ans: String(need), dists: nd(need, [target, 2 * target - m, need + k]), sol: `The ${k} scores must total ${M(`${k}(${target}) = ${k * target}`)}. The first ${k - 1} total ${M(`${k - 1}(${m}) = ${prev}`)}, so the needed score is ${k * target - prev}.` }; },
    (r) => { const a = list(r, 7, 10, 95); const rg = Math.max(...a) - Math.min(...a);
      return { text: `The list shows the number of minutes 7 students spent on homework last night: ${M(a.join(', '))}. What is the range of the data?`, ans: String(rg), dists: nd(rg, [Math.max(...a), a[6] - a[0], rg + 10]), sol: `Range = maximum − minimum = ${M(`${Math.max(...a)} - ${Math.min(...a)} = ${rg}`)}.` }; }
  ],
  medium: [
    (r) => { const n = ri(r, 5, 11), m = ri(r, 12, 30), v = ri(r, 20, 60); const nm = (n * m + v) / (n + 1); if (!Number.isInteger(nm)) return null;
      return { text: `A data set of ${n} numbers has a mean of ${m}. When the number ${v} is added to the data set, what is the mean of the ${n + 1} numbers?`, ans: String(nm), dists: nd(nm, [(m + v) / 2, m + 1, (n * m + v) / n]), sol: `The original sum is ${M(`${n}(${m}) = ${n * m}`)}. The new sum is ${n * m + v}, so the new mean is ${M(`\\frac{${n * m + v}}{${n + 1}} = ${nm}`)}.` }; },
    (r) => { const n1 = ri(r, 10, 30), n2 = ri(r, 10, 30), m1 = ri(r, 60, 80), m2 = ri(r, 70, 95); const c = (n1 * m1 + n2 * m2) / (n1 + n2); if (!Number.isInteger(c)) return null;
      return { text: `The mean test score of ${n1} students in one class is ${m1}, and the mean test score of ${n2} students in another class is ${m2}. What is the mean test score of all ${n1 + n2} students?`, ans: String(c), dists: nd(c, [(m1 + m2) / 2, m2, c + 2]), sol: `Total points: ${M(`${n1}(${m1}) + ${n2}(${m2}) = ${n1 * m1 + n2 * m2}`)}. Mean: ${M(`\\frac{${n1 * m1 + n2 * m2}}{${n1 + n2}} = ${c}`)}.` }; },
    (r) => { const vals = [0, 1, 2, 3, 4], f = list(r, 5, 1, 9); const T = sum(f), tot = sum(vals.map((v, i) => v * f[i])); const m = tot / T; if (!Number.isInteger(m * 10) ) return null;
      return { text: `The table shows the number of pets owned by each student in a class. What is the mean number of pets per student?`, ans: numStr(m), dists: nd(numStr(m), [numStr(T / 5), 2, numStr(tot / 5)]), sol: `Total pets: ${M(vals.map((v, i) => `${v}(${f[i]})`).join(' + ') + ` = ${tot}`)}; students: ${T}. Mean ${M(`= \\frac{${tot}}{${T}} = ${numStr(m)}`)}.`,
        fig: { type: 'table', headers: ['Number of pets', ...vals.map(String)], rows: [['Number of students', ...f.map(String)]] } }; },
    (r) => { const p = ri(r, 40, 70), moe = ri(r, 2, 5);
      return { type: 'mcq', text: `A random sample of voters in a city found that ${p}% support a proposed ordinance, with an associated margin of error of ${moe} percentage points. Which of the following is the most appropriate conclusion?`, ans: `It is plausible that between ${p - moe}% and ${p + moe}% of all voters in the city support the ordinance.`, dists: [`Exactly ${p}% of all voters in the city support the ordinance.`, `Between ${p - 2 * moe}% and ${p + 2 * moe}% of the voters in the sample support the ordinance.`, `It is plausible that between ${p}% and ${p + moe}% of all voters in the city support the ordinance.`], sol: `A margin of error describes a plausible range for the population value: ${M(`${p}\\% \\pm ${moe}\\%`)}, that is, ${p - moe}% to ${p + moe}%.` }; }
  ],
  hard: [
    (r) => { const n = ri(r, 8, 15), m = ri(r, 20, 40), k = 2, m2 = m - ri(r, 1, 4); const removed = n * m - (n - k) * m2;
      return { text: `The mean of a data set of ${n} numbers is ${m}. When two numbers are removed, the mean of the remaining numbers is ${m2}. What is the sum of the two numbers that were removed?`, ans: String(removed), dists: nd(removed, [m - m2, 2 * m, removed / 2]), sol: `Original sum ${M(`= ${n}(${m}) = ${n * m}`)}; new sum ${M(`= ${n - k}(${m2}) = ${(n - k) * m2}`)}. Removed: ${M(`${n * m} - ${(n - k) * m2} = ${removed}`)}.` }; },
    (r) => { const base = list(r, 9, 20, 40).sort((x, y) => x - y), out = ri(r, 90, 140);
      return { type: 'mcq', text: `A data set consists of the values ${M(base.join(', '))}. If the value ${out} is added to the data set, which statement best describes the change?`, ans: 'The mean increases more than the median increases.', dists: ['The median increases more than the mean increases.', 'The mean and the median increase by the same amount.', 'Neither the mean nor the median changes.'], sol: `An extreme value pulls the mean strongly toward it, but the median moves at most to a neighboring middle value. So the mean increases more.` }; },
    (r) => { const sd = ri(r, 3, 9), add = ri(r, 2, 15);
      return { text: `A data set has a standard deviation of ${sd}. A new data set is formed by adding ${add} to every value in the original data set. What is the standard deviation of the new data set?`, ans: String(sd), dists: nd(sd, [sd + add, sd * add, add]), sol: `Adding the same constant to every value shifts the data without changing its spread, so the standard deviation stays ${sd}.` }; }
  ]
};

const ratio = {
  easy: [
    (r) => { const a = ri(r, 2, 5), b = ri(r, 3, 8), k = ri(r, 2, 6);
      return { text: `A recipe uses ${a} cups of flour for every ${b} cups of milk. How many cups of milk are needed with ${a * k} cups of flour?`, ans: String(b * k), dists: nd(b * k, [a * k + (b - a), b + k, a * b]), sol: `Scale factor ${M(`\\frac{${a * k}}{${a}} = ${k}`)}, so milk ${M(`= ${b}(${k}) = ${b * k}`)} cups.` }; }
  ],
  hard: [
    (r) => { const P = ri(r, 4, 20) * 10, up = pick(r, [10, 20, 25, 50]), down = pick(r, [10, 20, 25]); const f = P * (1 + up / 100) * (1 - down / 100); if (!Number.isInteger(f * 100)) return null;
      return { text: `The price of a jacket was ${'\\$'}${P}. The price was increased by ${up}%, and then the new price was decreased by ${down}%. What is the final price, in dollars?`, ans: numStr(f), dists: nd(numStr(f), [numStr(P * (1 + (up - down) / 100)), numStr(P * (1 + up / 100)), numStr(P * (1 - down / 100))]), sol: `${M(`${P}(1.${String(up).padStart(2, '0')})(${(1 - down / 100).toFixed(2)}) = ${numStr(f)}`)}.` }; },
    (r) => { const s = ri(r, 40, 75), t = ri(r, 2, 5);
      return { text: `A car travels at an average speed of ${s} miles per hour. At this rate, how many minutes does it take the car to travel ${s * t / 2} miles?`, ans: String(t * 30), dists: nd(t * 30, [t / 2, t * 60, s * t]), sol: `Time ${M(`= \\frac{${s * t / 2}}{${s}} = ${t / 2}`)} hours ${M(`= ${t * 30}`)} minutes.` }; }
  ]
};

const geo = {
  easy: [
    (r) => { const tr = pick(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]); const [a, b, c] = tr;
      const ang = pick(r, ['A', 'B']), fnc = pick(r, ['sin', 'cos', 'tan']);
      const opp = ang === 'A' ? b : a, adj = ang === 'A' ? a : b;
      const ans = fnc === 'sin' ? frac(opp, c) : (fnc === 'cos' ? frac(adj, c) : frac(opp, adj));
      const nm = { sin: 'opposite side divided by the hypotenuse', cos: 'adjacent side divided by the hypotenuse', tan: 'opposite side divided by the adjacent side' }[fnc];
      return { text: `In the right triangle shown, what is the value of ${M(`\\${fnc} ${ang}`)}?`, ans, dists: nd(ans, [frac(adj, c), frac(opp, c), frac(adj, opp), frac(c, opp)]), sol: `${M(`\\${fnc} ${ang}`)} is the ${nm}. Using the side lengths in the figure, ${M(`\\${fnc} ${ang} = ${texFrac(ans)}`)}.`,
        fig: { type: 'triangle', vertices: [[0, a], [b, 0], [0, 0]], labels: ['A', 'B', 'C'], sides: [String(c), String(b), String(a)], right: 2 } }; },
    (r) => { const v = ri(r, 105, 145), x = ri(r, 4, 15), k = pick(r, [3, 4, 5, 6, 7, 8]); const c = v - k * x; if (c === 0) return null;
      return { text: `In the figure shown, line ${M('\\ell')} is parallel to line ${M('m')}. What is the value of ${M('x')}?`, ans: String(x), dists: nd(x, [Math.round((180 - v - c) / k), v, x + 2]), sol: `The two marked angles are alternate exterior angles, so they are congruent: ${M(`${k}x${c > 0 ? ' + ' + c : ' - ' + (-c)} = ${v}`)}, giving ${M(`x = ${x}`)}.`,
        fig: { type: 'transversal', angle: 180 - v, labels: { 2: `(${k}x${c > 0 ? ' + ' + c : ' - ' + (-c)})°`, 7: `${v}°` } } }; }
  ],
  medium: [
    (r) => { const tr = pick(r, [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), k = ri(r, 1, 3); const [a, b, c] = tr.map(v => v * k);
      return { text: `In right triangle ${M('ABC')}, angle ${M('C')} is a right angle, ${M(`AC = ${a}`)}, and ${M(`BC = ${b}`)}. What is the length of ${M('\\overline{AB}')}?`, ans: String(c), dists: nd(c, [a + b, c + 1, Math.abs(b - a)]), sol: `By the Pythagorean theorem, ${M(`AB = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a + b * b}} = ${c}`)}.` }; },
    (r) => { const rr = ri(r, 2, 7), h = ri(r, 3, 10);
      return { text: `A right circular cylinder has a radius of ${rr} centimeters and a height of ${h} centimeters. The volume of the cylinder is ${M('k\\pi')} cubic centimeters. What is the value of ${M('k')}?`, ans: String(rr * rr * h), dists: nd(rr * rr * h, [2 * rr * h, rr * h, (2 * rr) ** 2 * h]), sol: `${M(`V = \\pi r^2 h = \\pi(${rr})^2(${h}) = ${rr * rr * h}\\pi`)}, so ${M(`k = ${rr * rr * h}`)}.` }; },
    (r) => { const v = ri(r, 100, 140), x = ri(r, 4, 12), k = pick(r, [2, 3, 4, 5]); const acute = 180 - v, c = acute - k * x; if (c === 0) return null;
      return { text: `In the figure shown, parallel lines ${M('\\ell')} and ${M('m')} are intersected by a transversal. What is the value of ${M('x')}?`, ans: String(x), dists: nd(x, [Math.round((v - c) / k), acute, x + 3]), sol: `The angle at line ${M('m')} that corresponds to the ${v}° angle is also ${v}°, and it forms a linear pair with the angle marked ${M(`(${k}x${c > 0 ? ' + ' + c : ' - ' + (-c)})°`)}. So ${M(`(${k}x${c > 0 ? ' + ' + c : ' - ' + (-c)}) + ${v} = 180`)}, and ${M(`x = ${x}`)}.`,
        fig: { type: 'transversal', angle: acute, labels: { 2: `${v}°`, 5: `(${k}x${c > 0 ? ' + ' + c : ' - ' + (-c)})°` } } }; }
  ],
  hard: [
    (r) => { const s1 = ri(r, 2, 6), s2 = s1 + ri(r, 1, 5), A = s1 * s1 * ri(r, 2, 6); const A2 = A * s2 * s2 / (s1 * s1);
      return { text: `Triangle ${M('PQR')} is similar to triangle ${M('XYZ')}, and the ratio of corresponding side lengths is ${M(`${s1} : ${s2}`)}. If the area of triangle ${M('PQR')} is ${A} square units, what is the area, in square units, of triangle ${M('XYZ')}?`, ans: String(A2), dists: nd(A2, [A * s2 / s1, A + s2 - s1, A * s2]), sol: `Areas of similar figures scale by the square of the side ratio: ${M(`${A} \\cdot \\left(\\frac{${s2}}{${s1}}\\right)^2 = ${A2}`)}.` }; },
    (r) => { const deg = pick(r, [40, 60, 72, 90, 120, 144]), rr = ri(r, 3, 10); const k = rr * rr * deg / 360; if (!Number.isInteger(k * 10)) return null;
      return { text: `A circle has a radius of ${rr} inches. A sector of the circle has a central angle of ${M(`${deg}^\\circ`)}. The area of the sector is ${M('k\\pi')} square inches. What is the value of ${M('k')}?`, ans: numStr(k), dists: nd(numStr(k), [numStr(2 * rr * deg / 360), rr * rr, numStr(k * 2)]), sol: `Sector area ${M(`= \\frac{${deg}}{360}\\pi(${rr})^2 = ${numStr(k)}\\pi`)}.` }; }
  ]
};

module.exports = { RATIO, STATS, PROB, GEO, prob, stats, ratio, geo };
