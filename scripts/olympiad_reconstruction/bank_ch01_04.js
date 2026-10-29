'use strict';

const {
  gcd, lcm, comb, modPow, totient, countDivisors, vpFactorial,
  fracTex, makeItem
} = require('./bank_helpers');

function generateCh01To04(startIdx) {
  let idx = startIdx;
  const items = [];

  // =========================================================================
  // CHAPTER 1: ol-algebraic-techniques (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM1 = 'Olympiad Algebra, Vieta & Inequalities';
  const TOP1 = 'ol-algebraic-techniques';

  // Easy 1..14: Reciprocal Power Sums x + 1/x = k => x^3 + 1/x^3 or x^4 + 1/x^4
  for (let i = 0; i < 14; i++) {
    const k = i + 3; // 3..16
    const deg = (i % 2 === 0) ? 3 : 4;
    const ans = (deg === 3) ? (k * k * k - 3 * k) : ((k * k - 2) * (k * k - 2) - 2);
    const s2 = k * k - 2;
    const fig = (i < 10) ? {
      type: 'fn',
      title: 'Reciprocal Curve g(x) = x + 1/x (x > 0)',
      fns: [{ fn: 'x + 1/x', label: 'g(x) = x + 1/x' }],
      xrange: [0.2, 6],
      yrange: [0, 8]
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP1, domain: DOM1, difficulty: 'easy', subskill: 1,
      archetype: 'Reciprocal Newton Sum',
      text: `Let \\( x \\) be a positive real number satisfying \\( x + \\frac{1}{x} = ${k} \\)${fig ? ' (illustrated on the positive branch of \\( g(x) = x + 1/x \\))' : ''}. Without solving for \\( x \\), find the exact value of \\( x^{${deg}} + \\frac{1}{x^{${deg}}} \\).`,
      correctVal: String(ans),
      distractors: [
        String(deg === 3 ? k * k * k : s2 * s2),
        String(deg === 3 ? k * k * k + 3 * k : s2 * s2 + 2),
        String(ans - k)
      ],
      sol: `Let \\( S_n = x^n + x^{-n} \\) with \\( S_1 = ${k} \\). Squaring gives \\( S_2 = S_1^2 - 2 = ${k}^2 - 2 = ${s2} \\). ${deg === 3 ? `Using \\( S_3 = S_1 S_2 - S_1 = S_1^3 - 3S_1 \\), we obtain \\( ${k}^3 - 3(${k}) = ${ans} \\).` : `Squaring \\( S_2 \\) gives \\( S_4 = S_2^2 - 2 = ${s2}^2 - 2 = ${ans} \\).`}`,
      hints: [
        `Square \\( x + \\frac{1}{x} = ${k} \\) first to compute \\( x^2 + \\frac{1}{x^2} = ${k}^2 - 2 = ${s2} \\).`,
        deg === 3
          ? `Use the identity \\( x^3 + \\frac{1}{x^3} = \\left(x + \\frac{1}{x}\\right)^3 - 3\\left(x + \\frac{1}{x}\\right) \\).`
          : `Square \\( x^2 + \\frac{1}{x^2} = ${s2} \\) and subtract the middle cross-term \\( 2 \\).`,
        `Evaluate the arithmetic carefully to obtain \\( ${ans} \\).`
      ],
      fig
    }));
  }

  // Easy 15..28: Quadratic Vieta Symmetric Sums (r^2 + s^2 + r*s or (r - s)^2)
  for (let i = 0; i < 14; i++) {
    const p = i + 5; // 5..18
    const q = (i % 5) + 2; // 2..6 (discriminant p^2 - 4q >= 25 - 24 = 1 > 0)
    const target = p * p - 3 * q; // r^2 - rs + s^2
    items.push(makeItem({
      idx: idx++, topicId: TOP1, domain: DOM1, difficulty: 'easy', subskill: 2,
      archetype: 'Quadratic Vieta Symmetric Evaluation',
      text: `Let \\( \\alpha \\) and \\( \\beta \\) be the roots of the quadratic polynomial \\( P(t) = t^2 - ${p}t + ${q} \\). Compute the exact symmetric expression \\( \\alpha^2 - \\alpha\\beta + \\beta^2 \\).`,
      correctVal: String(target),
      distractors: [String(p * p - 2 * q), String(p * p - q), String(p * p + q)],
      sol: `By Vieta's formulas for \\( t^2 - ${p}t + ${q} = 0 \\), \\( \\alpha + \\beta = ${p} \\) and \\( \\alpha\\beta = ${q} \\). Rewriting in elementary symmetric polynomials gives \\( \\alpha^2 - \\alpha\\beta + \\beta^2 = (\\alpha + \\beta)^2 - 3\\alpha\\beta = ${p}^2 - 3(${q}) = ${target} \\).`,
      hints: [
        `Extract \\( \\alpha + \\beta = ${p} \\) and \\( \\alpha\\beta = ${q} \\) using Vieta's formulas.`,
        `Express \\( \\alpha^2 - \\alpha\\beta + \\beta^2 \\) as \\( (\\alpha + \\beta)^2 - 3\\alpha\\beta \\).`,
        `Substitute \\( ${p}^2 - 3(${q}) = ${target} \\).`
      ]
    }));
  }

  // Easy 29..40: Sophie Germain Smaller Factor a^4 + 4b^4
  for (let i = 0; i < 12; i++) {
    const a = 2 * i + 3; // 3,5,7..25
    const b = (i % 3) + 2; // 2,3,4
    const fSmall = a * a - 2 * a * b + 2 * b * b;
    const fLarge = a * a + 2 * a * b + 2 * b * b;
    items.push(makeItem({
      idx: idx++, topicId: TOP1, domain: DOM1, difficulty: 'easy', subskill: 3,
      archetype: 'Sophie Germain Identity Factoring',
      text: `Using Sophie Germain's algebraic identity, \\( N = ${a}^4 + 4 \\cdot ${b}^4 \\) factors into two positive integers greater than \\( 1 \\): \\( N = u \\cdot v \\) with \\( u < v \\). What is the value of the smaller factor \\( u \\)?`,
      correctVal: String(fSmall),
      distractors: [String(fLarge), String(a * a - 2 * b * b), String(a * a + 2 * b * b)],
      sol: `By Sophie Germain's identity, \\( a^4 + 4b^4 = (a^2 + 2b^2)^2 - (2ab)^2 = (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2) \\). Substituting \\( a = ${a} \\) and \\( b = ${b} \\) gives \\( u = ${a}^2 - 2(${a})(${b}) + 2(${b}^2) = ${fSmall} \\) and \\( v = ${fLarge} \\).`,
      hints: [
        `Complete the square via the middle term: \\( a^4 + 4b^4 = (a^2 + 2b^2)^2 - (2ab)^2 \\).`,
        `Factor as difference of squares: \\( (a^2 - 2ab + 2b^2)(a^2 + 2ab + 2b^2) \\).`,
        `Evaluate the smaller factor at \\( a = ${a},\\; b = ${b} \\) to get \\( ${fSmall} \\).`
      ]
    }));
  }

  // Medium 1..14: Cubic Newton Sums p_3 = r^3 + s^3 + t^3
  for (let i = 0; i < 14; i++) {
    const e1 = (i % 6) + 3; // 3..8
    const e2 = i + 2;       // 2..15
    const e3 = (i % 5) + 1; // 1..5
    const p2 = e1 * e1 - 2 * e2;
    const p3 = e1 * p2 - e2 * e1 + 3 * e3; // = e1^3 - 3*e1*e2 + 3*e3
    items.push(makeItem({
      idx: idx++, topicId: TOP1, domain: DOM1, difficulty: 'medium', subskill: 1,
      archetype: 'Cubic Vieta & Newton Power Sums',
      text: `Let \\( r, s, t \\) be the three complex roots of the cubic polynomial \\( P(z) = z^3 - ${e1}z^2 + ${e2}z - ${e3} \\). Using Newton's power-sum recurrences, find \\( r^3 + s^3 + t^3 \\).`,
      correctVal: String(p3),
      distractors: [String(e1 * e1 * e1 - 3 * e1 * e2), String(p3 - 3 * e3), String(p2 * e1)],
      sol: `By Vieta's relations, \\( e_1 = ${e1},\\; e_2 = ${e2},\\; e_3 = ${e3} \\). First \\( p_2 = e_1^2 - 2e_2 = ${e1}^2 - 2(${e2}) = ${p2} \\). By Newton's third identity \\( p_3 = e_1^3 - 3e_1 e_2 + 3e_3 = ${e1}^3 - 3(${e1})(${e2}) + 3(${e3}) = ${p3} \\).`,
      hints: [
        `Read off Vieta's elementary symmetric sums: \\( e_1 = ${e1},\\; e_2 = ${e2},\\; e_3 = ${e3} \\).`,
        `Recall Gauss's / Newton's cubic identity: \\( r^3 + s^3 + t^3 - 3rst = (r+s+t)(r^2+s^2+t^2 - rs - st - tr) \\), i.e., \\( p_3 = e_1^3 - 3e_1 e_2 + 3e_3 \\).`,
        `Substitute \\( ${e1}^3 - 3(${e1})(${e2}) + 3(${e3}) = ${p3} \\).`
      ]
    }));
  }

  // Medium 15..28: Weighted 3-Term AM-GM Minimum a*x^2 + b/x on x > 0
  for (let i = 0; i < 14; i++) {
    const k = i + 1; // 1..14
    // Let f(x) = c * x^2 + (2 * c * m^3) / x where minimum is at x = m: f(m) = 3 * c * m^2
    const m = (i % 4) + 1; // 1..4
    const c = Math.floor(i / 4) + 1; // 1..4
    const B = 2 * c * m * m * m;
    const minVal = 3 * c * m * m;
    const fig = (i < 12) ? {
      type: 'fn',
      title: 'Positive Convex Curve on (0, ∞)',
      fns: [{ fn: `${c}*x^2 + ${B}/x`, label: 'h(x)' }],
      xrange: [0.3, m + 4],
      yrange: [0, minVal * 3]
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP1, domain: DOM1, difficulty: 'medium', subskill: 2,
      archetype: 'Weighted Multi-Term AM-GM Optimization',
      text: `Find the exact minimum value of \\( h(x) = ${c === 1 ? '' : c}x^2 + \\frac{${B}}{x} \\) over all positive real numbers \\( x > 0 \\)${fig ? ', shown on the coordinate plot' : ''} (without using derivatives).`,
      correctVal: String(minVal),
      distractors: [String(c + B), String(2 * c * m * m), String(minVal + c * m * m)],
      sol: `To cancel \\( x \\) in the AM-GM product, split the reciprocal term into two equal halves: \\( h(x) = ${c === 1 ? '' : c}x^2 + \\frac{${B / 2}}{x} + \\frac{${B / 2}}{x} \\). By 3-term AM-GM, \\( h(x) \\ge 3\\sqrt[3]{${c}x^2 \\cdot \\frac{${B / 2}}{x} \\cdot \\frac{${B / 2}}{x}} = 3\\sqrt[3]{${c * (B / 2) * (B / 2)}} = ${minVal} \\), with equality achieved at \\( x = ${m} \\).`,
      hints: [
        `Naive 2-term AM-GM leaves \\( \\sqrt{x} \\) uncancelled; split \\( \\frac{${B}}{x} = \\frac{${B / 2}}{x} + \\frac{${B / 2}}{x} \\).`,
        `Apply 3-term AM-GM to \\( ${c === 1 ? '' : c}x^2,\\; \\frac{${B / 2}}{x},\\; \\frac{${B / 2}}{x} \\) so \\( x^2 \\cdot x^{-1} \\cdot x^{-1} = 1 \\).`,
        `Verify equality holds at \\( ${c}x^2 = \\frac{${B / 2}}{x} \\iff x = ${m} \\), giving minimum \\( ${minVal} \\).`
      ],
      fig
    }));
  }

  // Medium 29..40: Conditional Zero-Sum Rational Identity a + b + c = 0
  for (let i = 0; i < 12; i++) {
    const k = i + 2; // multiplier 2..13
    // Ask for k * (a^3 + b^3 + c^3) / (a*b*c) + m when a+b+c = 0
    const offset = (i % 5) + 1;
    const ans = 3 * k + offset;
    items.push(makeItem({
      idx: idx++, topicId: TOP1, domain: DOM1, difficulty: 'medium', subskill: 3,
      archetype: 'Zero-Sum Gauss Cubic Identity',
      text: `Suppose \\( a, b, c \\) are non-zero real numbers satisfying \\( a + b + c = 0 \\). Evaluate the exact constant value of \\[ \\frac{${k}(a^3 + b^3 + c^3)}{abc} + ${offset}. \\]`,
      correctVal: String(ans),
      distractors: [String(offset), String(k + offset), String(-3 * k + offset)],
      sol: `Recall Gauss's identity: \\( a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca) \\). Since \\( a + b + c = 0 \\) and \\( abc \\neq 0 \\), \\( a^3 + b^3 + c^3 = 3abc \\), so \\( \\frac{${k}(3abc)}{abc} + ${offset} = ${3 * k} + ${offset} = ${ans} \\).`,
      hints: [
        `Use Gauss's identity \\( a^3 + b^3 + c^3 - 3abc = (a+b+c)(a^2+b^2+c^2-ab-bc-ca) \\).`,
        `Substitute \\( a + b + c = 0 \\) to deduce \\( \\frac{a^3 + b^3 + c^3}{abc} = 3 \\).`,
        `Compute \\( ${k} \\times 3 + ${offset} = ${ans} \\).`
      ]
    }));
  }

  // Hard 1..14: Titu's Lemma (Engel Form of Cauchy-Schwarz)
  const tituTriples = [
    [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4], [1, 3, 5], [2, 3, 5], [1, 4, 5],
    [2, 4, 5], [3, 4, 5], [1, 2, 5], [1, 3, 6], [2, 3, 7], [2, 5, 7], [3, 5, 6]
  ];
  for (let i = 0; i < 14; i++) {
    const [w1, w2, w3] = tituTriples[i];
    const S = w1 + w2 + w3; // choose x+y+z = S or 2S so minimum is exact integer S!
    const mult = (i % 2 === 0) ? 1 : 2;
    const sumXYZ = (mult === 1) ? S : (S * S);
    const minAns = (mult === 1) ? S : 1;
    // Better: make x + y + z = m where m divides S^2 cleanly, or set x + y + z = S => min = S^2 / S = S, or x + y + z = 1 => min = S^2!
    const rhsSum = (i % 2 === 0) ? 1 : S;
    const exactMin = (i % 2 === 0) ? (S * S) : S;
    items.push(makeItem({
      idx: idx++, topicId: TOP1, domain: DOM1, difficulty: 'hard', subskill: 4,
      archetype: 'Titu\'s Lemma / Engel Cauchy-Schwarz Optimization',
      text: `Let \\( x, y, z \\) be positive real numbers satisfying \\( x + y + z = ${rhsSum} \\). Find the exact minimum value of \\[ \\frac{${w1 * w1}}{x} + \\frac{${w2 * w2}}{y} + \\frac{${w3 * w3}}{z}. \\]`,
      correctVal: String(exactMin),
      distractors: [
        String(w1 * w1 + w2 * w2 + w3 * w3),
        String(exactMin + S),
        String(Math.max(1, exactMin - w2))
      ],
      sol: `By Titu's Lemma (Engel's form of Cauchy-Schwarz), for \\( x, y, z > 0 \\): \\( \\frac{${w1}^2}{x} + \\frac{${w2}^2}{y} + \\frac{${w3}^2}{z} \\ge \\frac{(${w1} + ${w2} + ${w3})^2}{x + y + z} = \\frac{${S}^2}{${rhsSum}} = ${exactMin} \\). Equality is achieved when \\( \\frac{x}{${w1}} = \\frac{y}{${w2}} = \\frac{z}{${w3}} = \\frac{${rhsSum}}{${S}} \\).`,
      hints: [
        `Recognize the numerators as squares \\( ${w1}^2, ${w2}^2, ${w3}^2 \\) over positive denominators \\( x, y, z \\).`,
        `Apply Titu's Lemma: \\( \\sum \\frac{w_i^2}{x_i} \\ge \\frac{(\\sum w_i)^2}{\\sum x_i} \\).`,
        `Substitute \\( w_1 + w_2 + w_3 = ${S} \\) and \\( x + y + z = ${rhsSum} \\) to get \\( ${exactMin} \\).`
      ]
    }));
  }

  // Hard 15..28: Quartic Power Sum p_4 = r^4 + s^4 + t^4 of Depressed Cubic z^3 - q*z - r = 0
  for (let i = 0; i < 14; i++) {
    const q = i + 2; // z^3 - q z - r = 0 => e1 = 0, e2 = -q, e3 = r
    const r = (i % 7) + 1;
    // p1 = 0, p2 = -2*e2 = 2q, p3 = 3*e3 = 3r, p4 = q*p2 + r*p1 = 2*q^2! Wait: let's include non-zero e1 = 1 or 2 so r also participates!
    const e1 = (i % 3) + 1; // 1,2,3
    const e2 = i + 1;       // 1..14
    const e3 = (i % 4) + 1; // 1..4
    // z^3 - e1 z^2 + e2 z - e3 = 0 => z^k = e1 z^{k-1} - e2 z^{k-2} + e3 z^{k-3}
    const p1 = e1;
    const p2 = e1 * p1 - 2 * e2;
    const p3 = e1 * p2 - e2 * p1 + 3 * e3;
    const p4 = e1 * p3 - e2 * p2 + e3 * p1;
    items.push(makeItem({
      idx: idx++, topicId: TOP1, domain: DOM1, difficulty: 'hard', subskill: 5,
      archetype: 'Quartic Newton Sum Recurrence',
      text: `Let \\( x_1, x_2, x_3 \\) be the roots of \\( x^3 - ${e1}x^2 + ${e2}x - ${e3} = 0 \\). Compute the fourth-power sum \\( p_4 = x_1^4 + x_2^4 + x_3^4 \\).`,
      correctVal: String(p4),
      distractors: [String(p2 * p2), String(p4 - e3 * p1), String(p4 + 2 * e2)],
      sol: `From Vieta, \\( e_1 = ${e1},\\; e_2 = ${e2},\\; e_3 = ${e3} \\). Compute \\( p_1 = ${p1} \\), \\( p_2 = e_1 p_1 - 2e_2 = ${p2} \\), and \\( p_3 = e_1 p_2 - e_2 p_1 + 3e_3 = ${p3} \\). Multiplying \\( x^3 = ${e1}x^2 - ${e2}x + ${e3} \\) by \\( x \\) and summing over the roots yields \\( p_4 = ${e1}p_3 - ${e2}p_2 + ${e3}p_1 = ${e1}(${p3}) - ${e2}(${p2}) + ${e3}(${p1}) = ${p4} \\).`,
      hints: [
        `Compute \\( p_1 = ${p1} \\) and \\( p_2 = e_1^2 - 2e_2 = ${p2} \\) first.`,
        `Use Newton's recurrence \\( p_3 = e_1 p_2 - e_2 p_1 + 3e_3 = ${p3} \\).`,
        `Sum \\( x_i^4 = ${e1}x_i^3 - ${e2}x_i^2 + ${e3}x_i \\) to obtain \\( p_4 = ${p4} \\).`
      ]
    }));
  }

  // Hard 29..40: Cauchy-Schwarz Sphere Optimization (Pythagorean quadruples a^2 + b^2 + c^2 = d^2)
  const quadList = [
    [1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [3, 4, 12, 13],
    [2, 6, 9, 11], [4, 4, 7, 9], [2, 5, 14, 15], [1, 6, 18, 19],
    [3, 6, 6, 9], [6, 6, 7, 11], [2, 10, 11, 15], [4, 7, 4, 9]
  ];
  for (let i = 0; i < 12; i++) {
    const [a, b, c, d] = quadList[i];
    const r = (i % 3) + 2; // sphere radius 2, 3, 4
    // Fix sign/order diversity with i: if i>=9 tweak radius r = i - 4 so every stem is 100% unique
    const rad = i + 2;
    const maxVal = d * rad;
    const fig = {
      type: 'geometry_3d',
      solid: 'sphere',
      radius: rad,
      labels: { r: `R = ${rad}` }
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP1, domain: DOM1, difficulty: 'hard', subskill: 6,
      archetype: 'Cauchy-Schwarz 3D Sphere Extremum',
      text: `Real numbers \\( x, y, z \\) lie on the sphere \\( x^2 + y^2 + z^2 = ${rad * rad} \\) of radius \\( R = ${rad} \\). Find the maximum possible value of the linear form \\( L = ${a}x + ${b}y + ${c}z \\).`,
      correctVal: String(maxVal),
      distractors: [String((a + b + c) * rad), String(d * d * rad), String(maxVal - rad)],
      sol: `By the Cauchy-Schwarz Inequality in \\( \\mathbb{R}^3 \\), \\( (${a}x + ${b}y + ${c}z)^2 \\le (${a}^2 + ${b}^2 + ${c}^2)(x^2 + y^2 + z^2) = ${d * d} \\cdot ${rad * rad} = ${maxVal * maxVal} \\). Taking square roots gives \\( L \\le ${maxVal} \\), attained when \\( (x, y, z) = \\frac{${rad}}{${d}}(${a}, ${b}, ${c}) \\).`,
      hints: [
        `Apply Cauchy-Schwarz to vectors \\( \\mathbf{u} = (${a}, ${b}, ${c}) \\) and \\( \\mathbf{v} = (x, y, z) \\).`,
        `Compute \\( \\|\\mathbf{u}\\| = \\sqrt{${a}^2 + ${b}^2 + ${c}^2} = \\sqrt{${d * d}} = ${d} \\).`,
        `Multiply \\( \\|\\mathbf{u}\\| \\cdot \\|\\mathbf{v}\\| = ${d} \\times ${rad} = ${maxVal} \\).`
      ],
      fig
    }));
  }

  // =========================================================================
  // CHAPTER 2: ol-modular-number-theory (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM2 = 'Modular Arithmetic, Primes & Divisibility';
  const TOP2 = 'ol-modular-number-theory';

  // Easy 1..14: Legendre's Formula v_5(N!) trailing zeros
  for (let i = 0; i < 14; i++) {
    const N = 35 + 15 * i; // 35, 50, 65, ..., 230
    const zeros = vpFactorial(N, 5);
    items.push(makeItem({
      idx: idx++, topicId: TOP2, domain: DOM2, difficulty: 'easy', subskill: 1,
      archetype: 'Legendre Valuation & Trailing Zeros',
      text: `Using Legendre's prime-valuation theorem, how many trailing zeros appear at the end of \\( ${N}! \\) in base \\( 10 \\)?`,
      correctVal: String(zeros),
      distractors: [String(Math.floor(N / 5)), String(zeros + 1), String(Math.max(1, zeros - 2))],
      sol: `Since \\( 10 = 2 \\cdot 5 \\) and \\( v_2(${N}!) > v_5(${N}!) \\), the number of trailing zeros equals \\( v_5(${N}!) = \\lfloor ${N}/5 \\rfloor + \\lfloor ${N}/25 \\rfloor + \\lfloor ${N}/125 \\rfloor = ${Math.floor(N / 5)} + ${Math.floor(N / 25)} + ${Math.floor(N / 125)} = ${zeros} \\).`,
      hints: [
        `Trailing zeros of \\( n! \\) equal \\( \\min(v_2(n!), v_5(n!)) = v_5(n!) \\).`,
        `Apply Legendre's formula \\( v_5(${N}!) = \\sum_{k \\ge 1} \\lfloor ${N}/5^k \\rfloor \\).`,
        `Add \\( ${Math.floor(N / 5)} + ${Math.floor(N / 25)} + ${Math.floor(N / 125)} = ${zeros} \\).`
      ]
    }));
  }

  // Easy 15..28: Euler's Totient Function phi(N)
  const totNums = [36, 45, 48, 54, 60, 72, 75, 84, 90, 96, 100, 108, 120, 150];
  for (let i = 0; i < 14; i++) {
    const N = totNums[i];
    const phi = totient(N);
    items.push(makeItem({
      idx: idx++, topicId: TOP2, domain: DOM2, difficulty: 'easy', subskill: 2,
      archetype: 'Euler\'s Totient Function',
      text: `How many integers \\( k \\in \\{1, 2, \\dots, ${N}\\} \\) are relatively prime to \\( ${N} \\) (i.e., find Euler's totient \\( \\varphi(${N}) \\))?`,
      correctVal: String(phi),
      distractors: [String(phi + 4), String(Math.max(2, phi - 4)), String(Math.floor(N / 2))],
      sol: `Using Euler's product formula \\( \\varphi(n) = n \\prod_{p \\mid n}\\left(1 - \\frac{1}{p}\\right) \\) on the prime factorization of \\( ${N} \\), we obtain \\( \\varphi(${N}) = ${phi} \\).`,
      hints: [
        `Factor \\( ${N} \\) into its distinct prime divisors \\( p_1, p_2, \\dots \\).`,
        `Apply \\( \\varphi(n) = n \\prod_{p \\mid n}(1 - 1/p) \\).`,
        `Evaluate the product to get \\( \\varphi(${N}) = ${phi} \\).`
      ]
    }));
  }

  // Easy 29..40: Fermat's Little Theorem Modular Exponentiation
  const fltPrimes = [7, 11, 13, 17, 19, 23, 7, 11, 13, 17, 19, 23];
  for (let i = 0; i < 12; i++) {
    const p = fltPrimes[i];
    const base = (i < 6) ? 2 : 3;
    const remExp = (i % 4) + 1;
    const E = (p - 1) * (12 + i) + remExp;
    const ans = modPow(base, remExp, p);
    items.push(makeItem({
      idx: idx++, topicId: TOP2, domain: DOM2, difficulty: 'easy', subskill: 3,
      archetype: 'Fermat\'s Little Theorem Exponent Reduction',
      text: `Find the remainder when \\( ${base}^{${E}} \\) is divided by the prime \\( ${p} \\).`,
      correctVal: String(ans),
      distractors: [String((ans + 1) % p), String((ans + 2) % p), String((ans + p - 1) % p)],
      sol: `Since \\( \\gcd(${base}, ${p}) = 1 \\) and \\( ${p} \\) is prime, Fermat's Little Theorem gives \\( ${base}^{${p - 1}} \\equiv 1 \\pmod{${p}} \\). Dividing the exponent \\( ${E} \\) by \\( ${p - 1} \\) leaves remainder \\( ${remExp} \\), so \\( ${base}^{${E}} \\equiv ${base}^{${remExp}} \\equiv ${ans} \\pmod{${p}} \\).`,
      hints: [
        `Apply Fermat's Little Theorem: \\( ${base}^{${p - 1}} \\equiv 1 \\pmod{${p}} \\).`,
        `Reduce the exponent \\( ${E} \\) modulo \\( ${p - 1} \\) to get \\( ${remExp} \\).`,
        `Compute \\( ${base}^{${remExp}} \\bmod ${p} = ${ans} \\).`
      ]
    }));
  }

  // Medium 1..14: Chinese Remainder Theorem (2-modulus coprime systems) with numberline figure
  const crtPairs = [
    [5, 7], [5, 9], [7, 9], [7, 11], [8, 11], [9, 11], [7, 13],
    [8, 13], [9, 13], [11, 13], [8, 15], [7, 15], [11, 12], [9, 14]
  ];
  for (let i = 0; i < 14; i++) {
    const [m1, m2] = crtPairs[i];
    const M = m1 * m2;
    const xAns = 13 + 3 * i; // guaranteed < 55 <= M (for i=0, 13 < 35; check M: for [5,7], 13 < 35; [5,9], 16 < 45; all < M!)
    const r1 = xAns % m1;
    const r2 = xAns % m2;
    const fig = {
      type: 'numberline',
      title: `Residue Class x ≡ ${r1} (mod ${m1})`,
      range: [0, m1 * 3],
      marks: [
        { x: r1, open: false, label: String(r1) },
        { x: r1 + m1, open: false, label: String(r1 + m1) },
        { x: r1 + 2 * m1, open: false, label: String(r1 + 2 * m1) }
      ]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP2, domain: DOM2, difficulty: 'medium', subskill: 4,
      archetype: 'Chinese Remainder Theorem',
      text: `Let \\( x \\) be the smallest positive integer satisfying the simultaneous congruences \\( x \\equiv ${r1} \\pmod{${m1}} \\) (whose initial progression is marked on the number line) and \\( x \\equiv ${r2} \\pmod{${m2}} \\). Find \\( x \\).`,
      correctVal: String(xAns),
      distractors: [String(xAns + m1), String(xAns + m2), String(M - xAns)],
      sol: `Write \\( x = ${m1}k + ${r1} \\) and substitute into the second congruence: \\( ${m1}k + ${r1} \\equiv ${r2} \\pmod{${m2}} \\). Solving modulo \\( ${m2} \\) gives the unique residue modulo \\( ${m1} \\cdot ${m2} = ${M} \\), yielding smallest positive solution \\( x = ${xAns} \\) (check: \\( ${xAns} = ${Math.floor(xAns / m1)}\\cdot ${m1} + ${r1} \\) and \\( ${xAns} = ${Math.floor(xAns / m2)}\\cdot ${m2} + ${r2} \\)).`,
      hints: [
        `Parameterize the first congruence as \\( x = ${m1}k + ${r1} \\) for \\( k \\ge 0 \\).`,
        `Substitute into \\( ${m1}k + ${r1} \\equiv ${r2} \\pmod{${m2}} \\) and solve for \\( k \\bmod ${m2} \\).`,
        `Compute \\( x = ${xAns} \\) in \\( \\{1, \\dots, ${M}\\} \\).`
      ],
      fig
    }));
  }

  // Medium 15..28: Linear Congruence Solution Count + Smallest Positive Root
  for (let i = 0; i < 14; i++) {
    const d = (i % 5) + 3; // gcd = 3..7
    const mPrime = 7 + i;  // 7..20
    // choose aPrime coprime to mPrime
    let aPrime = 3;
    while (gcd(aPrime, mPrime) !== 1) aPrime++;
    const a = d * aPrime;
    const m = d * mPrime;
    const b = d * ((i % 4) + 1);
    // Number of incongruent solutions mod m is d! Wait: d is only 3..7 so many would share answer d; instead ask for the SUM of all d incongruent solutions in {0, 1, ..., m-1}!
    // Wait: if x0 is the unique solution in {0, ..., mPrime - 1}, the d solutions are x0 + k * mPrime for k = 0..d-1, whose sum is d * x0 + mPrime * d * (d - 1) / 2! Unique & awesome!
    let x0 = 0;
    while ((aPrime * x0) % mPrime !== ((b / d) % mPrime)) x0++;
    const sumSols = d * x0 + (mPrime * d * (d - 1)) / 2;
    items.push(makeItem({
      idx: idx++, topicId: TOP2, domain: DOM2, difficulty: 'medium', subskill: 5,
      archetype: 'Non-Coprime Linear Congruence Lifting',
      text: `Find the sum of all distinct solutions \\( x \\in \\{0, 1, \\dots, ${m - 1}\\} \\) to the linear congruence \\[ ${a}x \\equiv ${b} \\pmod{${m}}. \\]`,
      correctVal: String(sumSols),
      distractors: [String(x0), String(d * x0), String(sumSols + mPrime)],
      sol: `Here \\( g = \\gcd(${a}, ${m}) = ${d} \\), which divides \\( ${b} \\), so there are \\( ${d} \\) incongruent solutions modulo \\( ${m} \\). Dividing through by \\( ${d} \\) gives \\( ${aPrime}x \\equiv ${b / d} \\pmod{${mPrime}} \\), whose base solution is \\( x_0 = ${x0} \\). Lifting modulo \\( ${m} \\) gives \\( x_k = ${x0} + ${mPrime}k \\) for \\( k = 0, 1, \\dots, ${d - 1} \\), with sum \\( ${d}(${x0}) + ${mPrime}\\frac{${d}(${d - 1})}{2} = ${sumSols} \\).`,
      hints: [
        `Compute \\( g = \\gcd(${a}, ${m}) = ${d} \\) and divide the entire congruence (including the modulus!) by \\( ${d} \\).`,
        `Solve \\( ${aPrime}x \\equiv ${b / d} \\pmod{${mPrime}} \\) to get \\( x_0 = ${x0} \\).`,
        `Sum the \\( ${d} \\) lifted roots \\( ${x0} + ${mPrime}k \\) for \\( 0 \\le k < ${d} \\) to obtain \\( ${sumSols} \\).`
      ]
    }));
  }

  // Medium 29..40: Sum of Positive Divisors sigma(N) for Prime-Power Products
  const sigSpecs = [
    [2, 3, 3, 1], [2, 2, 5, 1], [2, 3, 5, 1], [2, 2, 3, 2], [2, 4, 3, 1], [3, 2, 5, 1],
    [2, 2, 7, 1], [2, 3, 7, 1], [3, 2, 7, 1], [2, 2, 5, 2], [2, 4, 5, 1], [2, 2, 11, 1]
  ];
  for (let i = 0; i < 12; i++) {
    const [p1, e1, p2, e2] = sigSpecs[i];
    const N = Math.pow(p1, e1) * Math.pow(p2, e2);
    const s1 = (Math.pow(p1, e1 + 1) - 1) / (p1 - 1);
    const s2 = (Math.pow(p2, e2 + 1) - 1) / (p2 - 1);
    const sigma = s1 * s2;
    const fig = {
      type: 'table',
      headers: ['Prime Factor', 'Exponent in N', 'Geometric Sum Factor'],
      rows: [
        [`\\( ${p1} \\)`, `\\( ${e1} \\)`, `\\( 1 + \\dots + ${p1}^{${e1}} \\)`],
        [`\\( ${p2} \\)`, `\\( ${e2} \\)`, `\\( 1 + \\dots + ${p2}^{${e2}} \\)`]
      ]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP2, domain: DOM2, difficulty: 'medium', subskill: 6,
      archetype: 'Multiplicative Divisor-Sum Function',
      text: `Using the prime-power decomposition summarized in the table for \\( N = ${N} = ${p1}^{${e1}} \\cdot ${p2}^{${e2}} \\), compute the sum \\( \\sigma(${N}) \\) of ALL positive divisors of \\( ${N} \\).`,
      correctVal: String(sigma),
      distractors: [String(sigma - N), String(s1 + s2), String((e1 + 1) * (e2 + 1) * p1 * p2)],
      sol: `Since \\( \\sigma \\) is multiplicative across coprime prime powers, \\( \\sigma(${p1}^{${e1}} \\cdot ${p2}^{${e2}}) = \\frac{${p1}^{${e1 + 1}} - 1}{${p1} - 1} \\cdot \\frac{${p2}^{${e2 + 1}} - 1}{${p2} - 1} = ${s1} \\times ${s2} = ${sigma} \\).`,
      hints: [
        `Use multiplicativity: \\( \\sigma(${p1}^{${e1}} ${p2}^{${e2}}) = \\sigma(${p1}^{${e1}}) \\cdot \\sigma(${p2}^{${e2}}) \\).`,
        `Compute \\( \\sigma(${p1}^{${e1}}) = ${s1} \\) and \\( \\sigma(${p2}^{${e2}}) = ${s2} \\).`,
        `Multiply \\( ${s1} \\times ${s2} = ${sigma} \\).`
      ],
      fig
    }));
  }

  // Hard 1..14: Wilson's Theorem (p - k)! mod p
  const wilsonPrimes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61];
  for (let i = 0; i < 14; i++) {
    const p = wilsonPrimes[i];
    const k = (i % 3) + 2; // k = 2, 3, 4 => (p-2)! ≡ 1, (p-3)! ≡ (p-1)/2, (p-4)! ≡ inv(-6) mod p
    let factTail = 1; // product_{j=1}^{k-1} (p - j) mod p = (-1)^{k-1} (k-1)! mod p
    for (let j = 1; j < k; j++) factTail = (factTail * (p - j)) % p;
    // (p - 1)! = factTail * (p - k)! ≡ p - 1 (mod p) => (p - k)! ≡ (p - 1) * modPow(factTail, p - 2, p) mod p
    const ans = ((p - 1) * modPow(factTail, p - 2, p)) % p;
    items.push(makeItem({
      idx: idx++, topicId: TOP2, domain: DOM2, difficulty: 'hard', subskill: 7,
      archetype: 'Wilson\'s Theorem Factorial Inversion',
      text: `Given that \\( p = ${p} \\) is prime, find the least non-negative remainder when \\( ${p - k}! \\) is divided by \\( ${p} \\).`,
      correctVal: String(ans),
      distractors: [String(p - ans), String((ans + 1) % p), String((p - 1)) === String(ans) ? '1' : String(p - 1)],
      sol: `By Wilson's Theorem, \\( ${p - 1}! \\equiv -1 \\pmod{${p}} \\). Factoring out the top \\( ${k - 1} \\) terms gives \\( ${p - 1}! = (${p - 1})${k > 2 ? `(${p - 2})` : ''}${k > 3 ? `(${p - 3})` : ''} \\cdot ${p - k}! \\equiv (-1)^{${k - 1}} ${k - 1}! \\cdot ${p - k}! \\equiv -1 \\pmod{${p}} \\). Inverting modulo \\( ${p} \\) yields \\( ${p - k}! \\equiv ${ans} \\pmod{${p}} \\).`,
      hints: [
        `Start with Wilson's Theorem: \\( (${p} - 1)! \\equiv -1 \\pmod{${p}} \\).`,
        `Replace \\( ${p - 1}, \\dots \\) with \\( -1, -2, \\dots \\pmod{${p}} \\) to isolate \\( ${p - k}! \\).`,
        `Invert the small factorial coefficient modulo \\( ${p} \\) to obtain \\( ${ans} \\).`
      ]
    }));
  }

  // Hard 15..28: Lifting the Exponent (LTE) Lemma v_p(a^n - b^n)
  const lteSpecs = [
    [3, 5, 2, 18], [3, 7, 4, 27], [3, 8, 2, 15], [3, 11, 2, 12],
    [5, 7, 2, 25], [5, 11, 1, 20], [5, 13, 3, 50], [5, 26, 1, 15],
    [7, 9, 2, 49], [7, 15, 1, 21], [7, 16, 2, 14], [3, 19, 1, 18],
    [5, 51, 1, 25], [3, 28, 1, 9]
  ];
  for (let i = 0; i < 14; i++) {
    const [p, a, b, n] = lteSpecs[i];
    const diff = a - b;
    let vpDiff = 0, tmp = diff;
    while (tmp % p === 0) { vpDiff++; tmp /= p; }
    let vpN = 0, tmpN = n;
    while (tmpN % p === 0) { vpN++; tmpN /= p; }
    const ans = vpDiff + vpN;
    items.push(makeItem({
      idx: idx++, topicId: TOP2, domain: DOM2, difficulty: 'hard', subskill: 8,
      archetype: 'Lifting the Exponent (LTE) Lemma',
      text: `Find the exact \\( ${p} \\)-adic valuation \\( v_{${p}}(${a}^{${n}} - ${b}^{${n}}) \\) — that is, the largest integer \\( k \\) such that \\( ${p}^k \\) divides \\( ${a}^{${n}} - ${b}^{${n}} \\).`,
      correctVal: String(ans),
      distractors: [String(vpDiff), String(vpN), String(ans + 1)],
      sol: `Since \\( p = ${p} \\) is an odd prime, \\( ${p} \\nmid ${a} \\cdot ${b} \\), and \\( ${a} - ${b} = ${diff} \\) is divisible by \\( ${p} \\), the Lifting the Exponent (LTE) Lemma states \\( v_{${p}}(${a}^{${n}} - ${b}^{${n}}) = v_{${p}}(${a} - ${b}) + v_{${p}}(${n}) = ${vpDiff} + ${vpN} = ${ans} \\).`,
      hints: [
        `Verify the LTE hypotheses for odd prime \\( p = ${p} \\): \\( ${p} \\mid (${a} - ${b}) \\) and \\( ${p} \\nmid ${a}, ${b} \\).`,
        `Apply LTE: \\( v_{${p}}(a^n - b^n) = v_{${p}}(a - b) + v_{${p}}(n) \\).`,
        `Sum \\( v_{${p}}(${diff}) = ${vpDiff} \\) and \\( v_{${p}}(${n}) = ${vpN} \\) to get \\( ${ans} \\).`
      ]
    }));
  }

  // Hard 29..40: Multiplicative Order ord_m(a)
  const ordSpecs = [
    [2, 15], [2, 21], [2, 31], [2, 63], [3, 20], [3, 28],
    [2, 25], [3, 16], [5, 24], [2, 17], [3, 13], [2, 19]
  ];
  for (let i = 0; i < 12; i++) {
    const [a, m] = ordSpecs[i];
    let ord = 1;
    while (modPow(a, ord, m) !== 1) ord++;
    const phi = totient(m);
    items.push(makeItem({
      idx: idx++, topicId: TOP2, domain: DOM2, difficulty: 'hard', subskill: 9,
      archetype: 'Multiplicative Order Modulo m',
      text: `Determine the multiplicative order \\( \\operatorname{ord}_{${m}}(${a}) \\), defined as the smallest positive integer \\( d \\) such that \\( ${a}^d \\equiv 1 \\pmod{${m}} \\).`,
      correctVal: String(ord),
      distractors: [String(phi === ord ? ord * 2 : phi), String(m - 1 === ord ? ord + 2 : m - 1), String(Math.max(1, ord - 1))],
      sol: `By Euler's Theorem, \\( \\operatorname{ord}_{${m}}(${a}) \\) must divide \\( \\varphi(${m}) = ${phi} \\). Testing the divisors of \\( ${phi} \\) in ascending order shows that \\( d = ${ord} \\) is the smallest positive exponent with \\( ${a}^{${ord}} \\equiv 1 \\pmod{${m}} \\).`,
      hints: [
        `Compute \\( \\varphi(${m}) = ${phi} \\); the multiplicative order must divide \\( ${phi} \\).`,
        `Test the positive divisors \\( d \\mid ${phi} \\) from smallest upward.`,
        `Confirm \\( ${a}^{${ord}} \\equiv 1 \\pmod{${m}} \\) and no smaller divisor works.`
      ]
    }));
  }

  // =========================================================================
  // CHAPTER 3: ol-diophantine-equations (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM3 = 'Diophantine Equations, SFFT & Floor Functions';
  const TOP3 = 'ol-diophantine-equations';

  // Easy 1..14: SFFT xy + rx + sy = N (count of positive integer pairs)
  const sfftEasy = [
    [1, 2, 10], [2, 3, 18], [1, 3, 17], [2, 5, 26], [3, 4, 24], [1, 4, 20], [2, 2, 20],
    [3, 5, 33], [4, 5, 40], [1, 5, 25], [2, 7, 34], [3, 7, 39], [1, 6, 30], [2, 4, 32]
  ];
  for (let i = 0; i < 14; i++) {
    const [r, s, N] = sfftEasy[i];
    const K = N + r * s;
    // Count ordered pairs (x, y) in Z^+ x Z^+: x+s > s and y+r > r
    let cnt = 0;
    for (let d = 1; d <= K; d++) {
      if (K % d === 0) {
        const x = d - s;
        const y = (K / d) - r;
        if (x >= 1 && y >= 1) cnt++;
      }
    }
    const fig = (i < 12) ? {
      type: 'fn',
      title: `Hyperbola Branch (x + ${s})(y + ${r}) = ${K}`,
      fns: [{ fn: `${K}/(x + ${s}) - ${r}`, label: 'SFFT Hyperbola' }],
      xrange: [0, Math.min(25, K)],
      yrange: [0, Math.min(25, K)]
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP3, domain: DOM3, difficulty: 'easy', subskill: 1,
      archetype: 'Simon\'s Favorite Factoring Trick (SFFT)',
      text: `How many ordered pairs of POSITIVE integers \\( (x, y) \\) satisfy the bilinear Diophantine equation \\[ xy + ${r}x + ${s}y = ${N} \\]${fig ? ' (corresponding to positive lattice points on the plotted hyperbola)' : ''}?`,
      correctVal: String(cnt),
      distractors: [String(countDivisors(K)), String(cnt + 2), String(Math.max(0, cnt - 1))],
      sol: `Add \\( ${r}\\cdot ${s} = ${r * s} \\) to both sides (SFFT): \\( (x + ${s})(y + ${r}) = ${N} + ${r * s} = ${K} \\). For \\( x, y \\ge 1 \\), we need \\( d = x + ${s} \\ge ${s + 1} \\) and \\( ${K}/d = y + ${r} \\ge ${r + 1} \\). Counting divisors \\( d \\mid ${K} \\) satisfying both inequalities yields exactly \\( ${cnt} \\) positive integer pairs.`,
      hints: [
        `Apply Simon's Favorite Factoring Trick by adding \\( ${r} \\times ${s} = ${r * s} \\) to both sides.`,
        `Factor \\( (x + ${s})(y + ${r}) = ${K} \\) and list the positive divisors of \\( ${K} \\).`,
        `Keep only divisor pairs with \\( x + ${s} > ${s} \\) and \\( y + ${r} > ${r} \\), giving \\( ${cnt} \\).`
      ],
      fig
    }));
  }

  // Easy 15..28: Frobenius Coin / Chicken McNugget Theorem (largest unattainable ab - a - b)
  const coinPairs = [
    [5, 7], [4, 9], [5, 8], [6, 7], [5, 9], [7, 8], [6, 11],
    [7, 9], [8, 9], [5, 12], [7, 10], [8, 11], [9, 10], [7, 12]
  ];
  for (let i = 0; i < 14; i++) {
    const [a, b] = coinPairs[i];
    const frob = a * b - a - b;
    items.push(makeItem({
      idx: idx++, topicId: TOP3, domain: DOM3, difficulty: 'easy', subskill: 2,
      archetype: 'Frobenius Coin / Chicken McNugget Theorem',
      text: `A stamp machine dispenses stamps only in denominations of \\( ${a} \\) SAR and \\( ${b} \\) SAR. What is the LARGEST positive integer postage (in SAR) that CANNOT be formed using non-negative multiples of \\( ${a} \\) and \\( ${b} \\)?`,
      correctVal: String(frob),
      distractors: [String(a * b), String((a - 1) * (b - 1) / 2), String(frob + 1)],
      sol: `Since \\( \\gcd(${a}, ${b}) = 1 \\), the Chicken McNugget (Sylvester–Frobenius) Theorem gives the largest unattainable integer \\( g(${a}, ${b}) = ${a} \\cdot ${b} - ${a} - ${b} = ${frob} \\).`,
      hints: [
        `Verify that \\( \\gcd(${a}, ${b}) = 1 \\) so the Sylvester–Frobenius Theorem applies.`,
        `Recall the largest non-representable integer is \\( ab - a - b \\).`,
        `Compute \\( ${a}(${b}) - ${a} - ${b} = ${frob} \\).`
      ]
    }));
  }

  // Easy 29..40: Difference of Squares x^2 - y^2 = N (sum of x-values over positive integer pairs)
  const diffSqN = [15, 21, 24, 27, 32, 35, 40, 45, 48, 55, 63, 77];
  for (let i = 0; i < 12; i++) {
    const N = diffSqN[i];
    let sumX = 0;
    for (let d = 1; d * d < N; d++) {
      if (N % d === 0) {
        const d2 = N / d;
        if ((d + d2) % 2 === 0) sumX += (d + d2) / 2;
      }
    }
    items.push(makeItem({
      idx: idx++, topicId: TOP3, domain: DOM3, difficulty: 'easy', subskill: 3,
      archetype: 'Difference of Squares Factoring & Parity',
      text: `Find the SUM of all positive integers \\( x \\) for which there exists a positive integer \\( y \\) satisfying \\( x^2 - y^2 = ${N} \\).`,
      correctVal: String(sumX),
      distractors: [String(sumX + 2), String(Math.max(1, sumX - 3)), String(N)],
      sol: `Factor \\( (x - y)(x + y) = ${N} \\) with \\( 0 < x - y < x + y \\) and \\( x - y \\equiv x + y \\pmod 2 \\). For each valid factor pair \\( (d_1, d_2) \\) of \\( ${N} \\) of matching parity, \\( x = \\frac{d_1 + d_2}{2} \\). Summing \\( x \\) across all valid pairs yields \\( ${sumX} \\).`,
      hints: [
        `Factor \\( x^2 - y^2 = (x - y)(x + y) = ${N} \\) with \\( d_1 = x - y < d_2 = x + y \\).`,
        `Keep only factor pairs \\( (d_1, d_2) \\) of the SAME parity so \\( x = (d_1 + d_2)/2 \\) is an integer.`,
        `Sum the resulting \\( x \\)-values to obtain \\( ${sumX} \\).`
      ]
    }));
  }

  // Medium 1..14: Unit Fraction Diophantine 1/x + 1/y = 1/n (ordered positive integer solutions)
  const unitN = [6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 28, 30];
  for (let i = 0; i < 14; i++) {
    const n = unitN[i];
    const ans = countDivisors(n * n);
    items.push(makeItem({
      idx: idx++, topicId: TOP3, domain: DOM3, difficulty: 'medium', subskill: 4,
      archetype: 'Egyptian / Unit-Fraction Diophantine Equation',
      text: `How many ordered pairs of POSITIVE integers \\( (x, y) \\) satisfy the unit-fraction equation \\[ \\frac{1}{x} + \\frac{1}{y} = \\frac{1}{${n}}? \\]`,
      correctVal: String(ans),
      distractors: [String(countDivisors(n)), String((ans + 1) / 2), String(ans - 1)],
      sol: `Clearing denominators gives \\( ${n}(x + y) = xy \\iff xy - ${n}x - ${n}y = 0 \\). Adding \\( ${n}^2 = ${n * n} \\) via SFFT gives \\( (x - ${n})(y - ${n}) = ${n * n} \\). Since \\( x, y > ${n} \\) for all positive solutions, \\( x - ${n} \\) ranges bijectively over all positive divisors of \\( ${n}^2 = ${n * n} \\), giving \\( \\tau(${n * n}) = ${ans} \\) ordered pairs.`,
      hints: [
        `Multiply by \\( ${n}xy \\) and rearrange to \\( xy - ${n}x - ${n}y = 0 \\).`,
        `Add \\( ${n}^2 \\) to both sides: \\( (x - ${n})(y - ${n}) = ${n * n} \\).`,
        `Count the positive divisors \\( \\tau(${n}^2) = ${ans} \\).`
      ]
    }));
  }

  // Medium 15..28: Non-negative Integer Solutions to Linear Diophantine ax + by = N
  for (let i = 0; i < 14; i++) {
    const a = 3 + (i % 4); // 3,4,5,6
    const b = a + 2 + (i % 3); // coprime check
    const aa = (gcd(a, b) === 1) ? a : a + 1;
    const bb = (gcd(aa, b) === 1) ? b : b + 1;
    const N = 40 + 7 * i;
    let cnt = 0;
    for (let x = 0; aa * x <= N; x++) {
      if ((N - aa * x) % bb === 0) cnt++;
    }
    items.push(makeItem({
      idx: idx++, topicId: TOP3, domain: DOM3, difficulty: 'medium', subskill: 5,
      archetype: 'Bounded Linear Diophantine Lattice Count',
      text: `How many ordered pairs of NON-NEGATIVE integers \\( (x, y) \\in \\mathbb{Z}_{\\ge 0}^2 \\) satisfy \\( ${aa}x + ${bb}y = ${N} \\)?`,
      correctVal: String(cnt),
      distractors: [String(cnt + 1), String(Math.max(0, cnt - 1)), String(cnt + 2)],
      sol: `Reduce modulo \\( ${bb} \\): \\( ${aa}x \\equiv ${N} \\pmod{${bb}} \\). Since \\( \\gcd(${aa}, ${bb}) = 1 \\), \\( x \\) belongs to a unique residue class modulo \\( ${bb} \\). Counting all \\( x \\ge 0 \\) in that residue class with \\( ${aa}x \\le ${N} \\) yields exactly \\( ${cnt} \\) non-negative pairs.`,
      hints: [
        `Reduce \\( ${aa}x + ${bb}y = ${N} \\) modulo \\( ${bb} \\) to find the unique residue \\( x_0 \\in \\{0, \\dots, ${bb - 1}\\} \\).`,
        `Write \\( x = x_0 + ${bb}t \\) with \\( t \\ge 0 \\) and enforce \\( y \\ge 0 \\iff ${aa}x \\le ${N} \\).`,
        `Count the valid integers \\( t \\ge 0 \\) to obtain \\( ${cnt} \\).`
      ]
    }));
  }

  // Medium 29..40: Hermite's Floor Identity
  for (let i = 0; i < 12; i++) {
    const n = 5 + i; // 5..16
    const num = 3 * n + (i % (n - 1)) + 1;
    const den = n; // wait: use x = p/q with q not dividing n!
    const p = 17 + 4 * i;
    const q = 3;
    const ans = Math.floor((n * p) / q);
    items.push(makeItem({
      idx: idx++, topicId: TOP3, domain: DOM3, difficulty: 'medium', subskill: 6,
      archetype: 'Hermite\'s Floor Identity',
      text: `Using Hermite's Floor Identity, evaluate the exact integer sum \\[ \\sum_{k=0}^{${n - 1}} \\left\\lfloor \\frac{${p}}{${q}} + \\frac{k}{${n}} \\right\\rfloor. \\]`,
      correctVal: String(ans),
      distractors: [String(n * Math.floor(p / q)), String(ans + 1), String(ans - 1)],
      sol: `Hermite's Identity states that \\( \\sum_{k=0}^{n-1} \\lfloor x + k/n \\rfloor = \\lfloor nx \\rfloor \\) for every real \\( x \\) and positive integer \\( n \\). With \\( n = ${n} \\) and \\( x = \\frac{${p}}{${q}} \\), the sum equals \\( \\left\\lfloor \\frac{${n} \\cdot ${p}}{${q}} \\right\\rfloor = \\left\\lfloor \\frac{${n * p}}{${q}} \\right\\rfloor = ${ans} \\).`,
      hints: [
        `Recognize the standard Hermite sum \\( \\sum_{k=0}^{n-1} \\lfloor x + k/n \\rfloor \\) with \\( n = ${n} \\).`,
        `Apply Hermite's Identity: the sum collapses to \\( \\lfloor nx \\rfloor \\).`,
        `Compute \\( \\lfloor ${n} \\times ${p} / ${q} \\rfloor = ${ans} \\).`
      ]
    }));
  }

  // Hard 1..14: Rational Polynomial Divisibility (n + a) | (n^2 + b*n + c) => largest positive integer n
  for (let i = 0; i < 14; i++) {
    const a = i + 2; // 2..15
    const b = 3;
    const c = 15 + 2 * i;
    // n^2 + b*n + c = (n + a)(n + b - a) + (a^2 - a*b + c)
    const R = a * a - a * b + c; // positive remainder > 0!
    // Largest n + a dividing R is R itself => n_max = R - a!
    const nMax = R - a;
    items.push(makeItem({
      idx: idx++, topicId: TOP3, domain: DOM3, difficulty: 'hard', subskill: 7,
      archetype: 'Polynomial Euclidean Division in Number Theory',
      text: `Find the LARGEST positive integer \\( n \\) such that \\( n + ${a} \\) divides \\( n^2 + ${b}n + ${c} \\).`,
      correctVal: String(nMax),
      distractors: [String(R), String(nMax + a), String(Math.max(1, Math.floor(R / 2) - a))],
      sol: `Perform polynomial division by \\( n + ${a} \\): \\( n^2 + ${b}n + ${c} = (n + ${a})(n + ${b - a}) + (${a}^2 - ${b}(${a}) + ${c}) = (n + ${a})(n ${b - a >= 0 ? '+ ' + (b - a) : '- ' + (a - b)}) + ${R} \\). Thus \\( (n + ${a}) \\mid (n^2 + ${b}n + ${c}) \\iff (n + ${a}) \\mid ${R} \\). The largest divisor of \\( ${R} \\) is \\( ${R} \\) itself, giving \\( n + ${a} = ${R} \\implies n = ${nMax} \\).`,
      hints: [
        `Divide \\( P(n) = n^2 + ${b}n + ${c} \\) by \\( n + ${a} \\) using the Remainder Theorem \\( R = P(-${a}) \\).`,
        `Compute \\( R = (-${a})^2 + ${b}(-${a}) + ${c} = ${R} \\), so \\( (n + ${a}) \\mid ${R} \\).`,
        `Set \\( n + ${a} = ${R} \\) (the largest divisor of \\( ${R} \\)) to get \\( n = ${nMax} \\).`
      ]
    }));
  }

  // Hard 15..28: Floor-Fractional Equation x * floor(x) = N or floor(x) * {x} counts
  // Count real solutions x > 0 to floor(x) * (x - floor(x)) = k / m? Better: count real solutions in [1, M) to {x} = floor(x) / K!
  // Let's check: for integer K >= 15, x - floor(x) = floor(x) / K: since 0 <= {x} < 1, floor(x) can be 0, 1, ..., K - 1! If we ask for POSITIVE real solutions x > 0, floor(x) in {1, 2, ..., K-1} (since floor(x)=0 gives {x}=0 => x=0 not positive!), and the SUM of all positive real solutions is sum_{m=1}^{K-1} m(1 + 1/K) = (K-1)*K/2 * (K+1)/K = (K^2 - 1)/2 when K is odd!!
  for (let i = 0; i < 14; i++) {
    const K = 2 * i + 5; // odd K = 5, 7, 9, ..., 31 => (K^2 - 1)/2 is ALWAYS an exact integer!
    const sumSols = (K * K - 1) / 2;
    items.push(makeItem({
      idx: idx++, topicId: TOP3, domain: DOM3, difficulty: 'hard', subskill: 8,
      archetype: 'Floor & Fractional-Part Decomposition',
      text: `Let \\( \\lfloor x \\rfloor \\) denote the greatest integer \\( \\le x \\) and \\( \\{x\\} = x - \\lfloor x \\rfloor \\) denote the fractional part of \\( x \\). Find the SUM of all POSITIVE real solutions \\( x > 0 \\) to \\[ ${K}\\{x\\} = \\lfloor x \\rfloor. \\]`,
      correctVal: String(sumSols),
      distractors: [String(K - 1), String((K * (K - 1)) / 2), String((K * (K + 1)) / 2)],
      sol: `Write \\( x = m + f \\) with \\( m = \\lfloor x \\rfloor \\in \\mathbb{Z} \\) and \\( 0 \\le f = \\{x\\} < 1 \\). The equation gives \\( f = \\frac{m}{${K}} \\). Since \\( 0 \\le \\frac{m}{${K}} < 1 \\), \\( m \\in \\{0, 1, \\dots, ${K - 1}\\} \\); excluding \\( m = 0 \\) (which gives \\( x = 0 \\not> 0 \\)), the positive solutions are \\( x_m = m + \\frac{m}{${K}} = m\\frac{${K + 1}}{${K}} \\) for \\( m = 1, \\dots, ${K - 1} \\). Their sum is \\( \\frac{${K + 1}}{${K}} \\cdot \\frac{(${K - 1})(${K})}{2} = \\frac{${K}^2 - 1}{2} = ${sumSols} \\).`,
      hints: [
        `Set \\( m = \\lfloor x \\rfloor \\in \\mathbb{Z} \\) so \\( \\{x\\} = m / ${K} \\) must satisfy \\( 0 \\le m / ${K} < 1 \\).`,
        `Identify the \\( ${K - 1} \\) positive solutions \\( x_m = m\\left(1 + \\frac{1}{${K}}\\right) \\) for \\( m = 1, 2, \\dots, ${K - 1} \\).`,
        `Sum \\( m \\) from \\( 1 \\) to \\( ${K - 1} \\) and multiply by \\( \\frac{${K + 1}}{${K}} \\) to get \\( ${sumSols} \\).`
      ]
    }));
  }

  // Hard 29..40: Pell's Equation x^2 - D y^2 = 1 Second Positive Solution x_2 = 2*x_1^2 - 1
  const pellList = [
    [2, 3, 2], [3, 2, 1], [5, 9, 4], [6, 5, 2], [7, 8, 3], [8, 3, 1],
    [10, 19, 6], [11, 10, 3], [12, 7, 2], [14, 15, 4], [15, 4, 1], [17, 33, 8]
  ];
  for (let i = 0; i < 12; i++) {
    const [D, x1, y1] = pellList[i];
    const x2 = 2 * x1 * x1 - 1;
    const y2 = 2 * x1 * y1;
    // Ask for x2 + y2 so each is super rich and tests full Brahmagupta/Pell composition!
    const ans = x2 + y2;
    items.push(makeItem({
      idx: idx++, topicId: TOP3, domain: DOM3, difficulty: 'hard', subskill: 9,
      archetype: 'Pell\'s Equation Quadratic-Field Composition',
      text: `The fundamental (smallest positive) integer solution to Pell's equation \\( x^2 - ${D}y^2 = 1 \\) is \\( (x_1, y_1) = (${x1}, ${y1}) \\). If \\( (x_2, y_2) \\) is the SECOND smallest positive integer solution, find \\( x_2 + y_2 \\).`,
      correctVal: String(ans),
      distractors: [String(x2), String(2 * (x1 + y1)), String(x2 - y2)],
      sol: `In \\( \\mathbb{Z}[\\sqrt{${D}}] \\), all positive solutions to \\( x^2 - ${D}y^2 = 1 \\) are generated by powers of the fundamental unit: \\( x_2 + y_2\\sqrt{${D}} = (${x1} + ${y1}\\sqrt{${D}})^2 = (${x1}^2 + ${D}\\cdot ${y1}^2) + 2(${x1})(${y1})\\sqrt{${D}} \\). Since \\( ${x1}^2 + ${D}\\cdot ${y1}^2 = 2(${x1}^2) - 1 = ${x2} \\) and \\( y_2 = ${y2} \\), we obtain \\( x_2 + y_2 = ${x2} + ${y2} = ${ans} \\).`,
      hints: [
        `Square the fundamental unit \\( x_2 + y_2\\sqrt{${D}} = (${x1} + ${y1}\\sqrt{${D}})^2 \\).`,
        `Match rational and irrational parts: \\( x_2 = ${x1}^2 + ${D}(${y1}^2) = ${x2} \\) and \\( y_2 = 2(${x1})(${y1}) = ${y2} \\).`,
        `Add \\( x_2 + y_2 = ${x2} + ${y2} = ${ans} \\).`
      ]
    }));
  }

  // =========================================================================
  // CHAPTER 4: ol-combinatorics-counting (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM4 = 'Bijective Counting, Inclusion-Exclusion & Pigeonhole';
  const TOP4 = 'ol-combinatorics-counting';

  // Easy 1..14: Stars and Bars with Lower Bounds x_1 + ... + x_k = N, x_i >= b
  for (let i = 0; i < 14; i++) {
    const k = (i % 3) + 3; // 3, 4, 5 variables
    const b = (i % 2) + 1; // lower bound 1 or 2
    const rem = 6 + i;     // excess sum 6..19
    const N = k * b + rem;
    const ans = comb(rem + k - 1, k - 1);
    items.push(makeItem({
      idx: idx++, topicId: TOP4, domain: DOM4, difficulty: 'easy', subskill: 1,
      archetype: 'Stars and Bars Bijection with Lower Bounds',
      text: `How many ordered \\( ${k} \\)-tuples of integers \\( (x_1, \\dots, x_{${k}}) \\) satisfy \\( x_1 + \\dots + x_{${k}} = ${N} \\) subject to \\( x_i \\ge ${b} \\) for every \\( i = 1, \\dots, ${k} \\)?`,
      correctVal: String(ans),
      distractors: [String(comb(N + k - 1, k - 1)), String(comb(rem + k, k)), String(Math.max(1, ans - k))],
      sol: `Shift variables by \\( y_i = x_i - ${b} \\ge 0 \\). Then \\( y_1 + \\dots + y_{${k}} = ${N} - ${k}(${b}) = ${rem} \\). By Stars and Bars, the number of non-negative integer solutions is \\( \\binom{${rem} + ${k} - 1}{${k} - 1} = \\binom{${rem + k - 1}}{${k - 1}} = ${ans} \\).`,
      hints: [
        `Substitute \\( y_i = x_i - ${b} \\ge 0 \\) to absorb the lower bounds.`,
        `Reduce the target sum to \\( ${N} - ${k}(${b}) = ${rem} \\).`,
        `Compute \\( \\binom{${rem} + ${k} - 1}{${k} - 1} = ${ans} \\).`
      ]
    }));
  }

  // Easy 15..28: Convex n-gon Interior Chord Intersections C(n, 4) with Polygon SVG
  for (let i = 0; i < 14; i++) {
    const n = i + 6; // 6..19
    const ans = comb(n, 4);
    const verts = [];
    const labels = [];
    const showV = Math.min(n, 8);
    for (let v = 0; v < showV; v++) {
      const ang = (2 * Math.PI * v) / showV - Math.PI / 2;
      verts.push([Math.round(50 + 38 * Math.cos(ang)), Math.round(50 + 38 * Math.sin(ang))]);
      labels.push(`P${v + 1}`);
    }
    const fig = (i < 12) ? {
      type: 'polygon',
      vertices: verts,
      labels,
      title: `Convex Polygon (${n} Vertices, General Position)`
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP4, domain: DOM4, difficulty: 'easy', subskill: 2,
      archetype: 'Bijective Diagonal Intersection Counting',
      text: `A convex \\( ${n} \\)-gon has no three diagonals concurrent at an interior point. How many interior intersection points are formed by its diagonals?`,
      correctVal: String(ans),
      distractors: [String(comb(n, 2) - n), String(comb(n, 3)), String(ans + n)],
      sol: `Every \\( 4 \\)-element subset of the \\( ${n} \\) vertices forms a unique convex quadrilateral whose two diagonals cross at a unique interior point. By this bijection, the number of interior diagonal intersections is \\( \\binom{${n}}{4} = ${ans} \\).`,
      hints: [
        `Notice that each interior diagonal crossing uses \\( 2 \\) diagonals, hence \\( 4 \\) polygon vertices.`,
        `Every \\( 4 \\) vertices of a convex polygon determine exactly \\( 1 \\) pair of crossing diagonals.`,
        `Evaluate \\( \\binom{${n}}{4} = ${ans} \\).`
      ],
      fig
    }));
  }

  // Easy 29..40: Kaplansky's Non-Adjacent Subset Selection C(n - k + 1, k)
  for (let i = 0; i < 12; i++) {
    const n = 10 + i; // 10..21
    const k = (i % 3) + 3; // 3, 4, 5
    const ans = comb(n - k + 1, k);
    items.push(makeItem({
      idx: idx++, topicId: TOP4, domain: DOM4, difficulty: 'easy', subskill: 3,
      archetype: 'Kaplansky\'s Non-Adjacent Bijection',
      text: `In how many ways can \\( ${k} \\) chairs be chosen from a row of \\( ${n} \\) numbered chairs so that NO two chosen chairs are adjacent?`,
      correctVal: String(ans),
      distractors: [String(comb(n, k)), String(comb(n - k, k)), String(comb(n - k + 2, k))],
      sol: `Place \\( ${n - k} \\) unchosen chairs in a row first; they create \\( ${n - k + 1} \\) gaps (including the two ends). Choosing \\( ${k} \\) distinct gaps for the chosen chairs guarantees non-adjacency bijectively, giving \\( \\binom{${n} - ${k} + 1}{${k}} = \\binom{${n - k + 1}}{${k}} = ${ans} \\) ways.`,
      hints: [
        `Set aside the \\( ${k} \\) chosen chairs, leaving \\( ${n - k} \\) unchosen chairs.`,
        `Count the \\( ${n - k + 1} \\) available slots before, between, and after the unchosen chairs.`,
        `Compute \\( \\binom{${n - k + 1}}{${k}} = ${ans} \\).`
      ]
    }));
  }

  // Medium 1..14: 3-Set Inclusion-Exclusion Divisibility in {1..N}
  const pieTriples = [
    [2, 3, 5, 180], [2, 3, 7, 210], [2, 5, 7, 280], [3, 5, 7, 315],
    [2, 3, 11, 330], [2, 5, 11, 440], [3, 4, 5, 240], [2, 7, 11, 308],
    [3, 5, 8, 360], [2, 3, 13, 390], [3, 7, 10, 420], [4, 5, 7, 420],
    [2, 9, 11, 396], [3, 5, 11, 495]
  ];
  for (let i = 0; i < 14; i++) {
    const [a, b, c, N] = pieTriples[i];
    let cnt = 0;
    for (let x = 1; x <= N; x++) {
      if (x % a === 0 || x % b === 0 || x % c === 0) cnt++;
    }
    const fig = (i < 10) ? {
      type: 'venn',
      sets: [
        { label: `Mult(${a})`, count: Math.floor(N / a) },
        { label: `Mult(${b})`, count: Math.floor(N / b) }
      ],
      overlap: Math.floor(N / lcm(a, b)),
      title: `Pairwise Overlap Mult(${a}) ∩ Mult(${b})`
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP4, domain: DOM4, difficulty: 'medium', subskill: 4,
      archetype: 'Three-Set Principle of Inclusion-Exclusion',
      text: `How many integers in \\( \\{1, 2, \\dots, ${N}\\} \\) are divisible by at least one of \\( ${a},\\; ${b}, \\) or \\( ${c} \\)?`,
      correctVal: String(cnt),
      distractors: [String(N - cnt), String(cnt + Math.floor(N / lcm(lcm(a, b), c))), String(cnt - 4)],
      sol: `By 3-set Inclusion-Exclusion, \\( |A \\cup B \\cup C| = \\lfloor ${N}/${a} \\rfloor + \\lfloor ${N}/${b} \\rfloor + \\lfloor ${N}/${c} \\rfloor - \\lfloor ${N}/${lcm(a, b)} \\rfloor - \\lfloor ${N}/${lcm(a, c)} \\rfloor - \\lfloor ${N}/${lcm(b, c)} \\rfloor + \\lfloor ${N}/${lcm(lcm(a, b), c)} \\rfloor = ${cnt} \\).`,
      hints: [
        `Add single-divisor counts \\( \\lfloor ${N}/${a} \\rfloor + \\lfloor ${N}/${b} \\rfloor + \\lfloor ${N}/${c} \\rfloor \\).`,
        `Subtract pairwise LCM counts for \\( (${a},${b}), (${a},${c}), (${b},${c}) \\).`,
        `Add back the triple LCM count \\( \\lfloor ${N}/${lcm(lcm(a, b), c)} \\rfloor \\) to get \\( ${cnt} \\).`
      ],
      fig
    }));
  }

  // Medium 15..28: Partial Derangements (permutations of n with exactly k fixed points)
  const derD = [1, 0, 1, 2, 9, 44, 265, 1854];
  const derSpecs = [
    [5, 0], [5, 1], [5, 2], [6, 0], [6, 1], [6, 2], [6, 3],
    [7, 1], [7, 2], [7, 3], [7, 4], [8, 3], [8, 4], [8, 5]
  ];
  for (let i = 0; i < 14; i++) {
    const [n, k] = derSpecs[i];
    const ans = comb(n, k) * derD[n - k];
    items.push(makeItem({
      idx: idx++, topicId: TOP4, domain: DOM4, difficulty: 'medium', subskill: 5,
      archetype: 'Derangements & Fixed-Point Counting',
      text: `How many permutations \\( \\pi \\) of \\( \\{1, 2, \\dots, ${n}\\} \\) have EXACTLY \\( ${k} \\) fixed point${k === 1 ? '' : 's'} (i.e., \\( \\pi(j) = j \\) for exactly \\( ${k} \\) indices \\( j \\))?`,
      correctVal: String(ans),
      distractors: [String(comb(n, k) * (derD[n - k] + 1)), String(derD[n - k]), String(ans + comb(n, k))],
      sol: `Choose which \\( ${k} \\) elements are fixed in \\( \\binom{${n}}{${k}} = ${comb(n, k)} \\) ways, and derange the remaining \\( ${n - k} \\) elements completely in \\( D_{${n - k}} = ${derD[n - k]} \\) ways. Multiplying gives \\( ${comb(n, k)} \\times ${derD[n - k]} = ${ans} \\).`,
      hints: [
        `First choose the \\( ${k} \\) fixed positions in \\( \\binom{${n}}{${k}} \\) ways.`,
        `Every remaining element among the other \\( ${n - k} \\) positions must move, counted by the derangement number \\( D_{${n - k}} = ${derD[n - k]} \\).`,
        `Multiply \\( \\binom{${n}}{${k}} D_{${n - k}} = ${ans} \\).`
      ]
    }));
  }

  // Medium 29..40: Hockey-Stick Identity sum_{j=r}^n C(j, r) = C(n+1, r+1)
  for (let i = 0; i < 12; i++) {
    const r = (i % 4) + 2; // 2, 3, 4, 5
    const n = r + 5 + Math.floor(i / 2); // 7..15
    const ans = comb(n + 1, r + 1);
    items.push(makeItem({
      idx: idx++, topicId: TOP4, domain: DOM4, difficulty: 'medium', subskill: 6,
      archetype: 'Hockey-Stick Binomial Identity',
      text: `Evaluate the Pascal-diagonal binomial sum \\[ \\sum_{j=${r}}^{${n}} \\binom{j}{${r}}. \\]`,
      correctVal: String(ans),
      distractors: [String(comb(n, r + 1)), String(comb(n + 1, r)), String(ans - 1)],
      sol: `By the Hockey-Stick (Christmas-Stocking) Identity, \\( \\sum_{j=r}^{n} \\binom{j}{r} = \\binom{n + 1}{r + 1} \\). Substituting \\( n = ${n} \\) and \\( r = ${r} \\) gives \\( \\binom{${n + 1}}{${r + 1}} = ${ans} \\).`,
      hints: [
        `Recall the Hockey-Stick Identity along a column of Pascal's Triangle: \\( \\sum_{j=r}^{n} \\binom{j}{r} = \\binom{n+1}{r+1} \\).`,
        `Substitute \\( n = ${n} \\) and \\( r = ${r} \\) to get \\( \\binom{${n + 1}}{${r + 1}} \\).`,
        `Evaluate \\( \\binom{${n + 1}}{${r + 1}} = ${ans} \\).`
      ]
    }));
  }

  // Hard 1..14: Burnside's Lemma Cyclic Necklaces (rotational equivalence)
  const neckSpecs = [
    [6, 2], [6, 3], [8, 2], [9, 2], [4, 3], [4, 4], [5, 3],
    [7, 2], [10, 2], [6, 4], [8, 3], [5, 4], [7, 3], [12, 2]
  ];
  for (let i = 0; i < 14; i++) {
    const [n, c] = neckSpecs[i];
    let sumFix = 0;
    for (let d = 1; d <= n; d++) {
      if (n % d === 0) {
        sumFix += totient(n / d) * Math.pow(c, d);
      }
    }
    const ans = sumFix / n;
    const fig = (i < 8) ? {
      type: 'circle',
      title: `Cyclic ${n}-Bead Necklace (C_${n} Rotations)`,
      center: 'O',
      radius: `${n} beads`
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP4, domain: DOM4, difficulty: 'hard', subskill: 7,
      archetype: 'Burnside\'s Lemma & Cyclic Symmetry Orbits',
      text: `Using Burnside's Orbit-Counting Lemma, how many rotationally distinct necklaces of \\( ${n} \\) beads can be formed using up to \\( ${c} \\) colors (where two necklaces are identical if one is a rotation of the other, without flipping)?`,
      correctVal: String(ans),
      distractors: [String(Math.ceil(Math.pow(c, n) / n)), String(ans + c), String(Math.max(1, ans - c))],
      sol: `Under the cyclic rotation group \\( C_{${n}} \\), rotation by \\( k \\) steps decomposes into \\( \\gcd(${n}, k) \\) cycles, fixing \\( ${c}^{\\gcd(${n}, k)} \\) colorings. Grouping by \\( d = \\gcd(${n}, k) \\mid ${n} \\) via Burnside's Lemma gives \\( \\frac{1}{${n}}\\sum_{d \\mid ${n}} \\varphi(${n}/d)\\cdot ${c}^d = \\frac{${sumFix}}{${n}} = ${ans} \\).`,
      hints: [
        `Apply Burnside's Lemma over the \\( ${n} \\) rotations in \\( C_{${n}} \\): average the fixed colorings \\( |X^g| \\).`,
        `A rotation by \\( k \\) beads has \\( d = \\gcd(${n}, k) \\) independent cycles, so \\( |X^g| = ${c}^d \\).`,
        `Evaluate \\( \\frac{1}{${n}} \\sum_{d \\mid ${n}} \\varphi(${n}/d) ${c}^d = ${ans} \\).`
      ],
      fig
    }));
  }

  // Hard 15..28: Surjective Functions [n] -> [k] via Inclusion-Exclusion
  const surjSpecs = [
    [4, 3], [5, 3], [5, 4], [6, 3], [6, 4], [6, 5], [7, 3],
    [7, 4], [7, 5], [7, 6], [8, 3], [4, 2], [5, 2], [6, 2]
  ];
  for (let i = 0; i < 14; i++) {
    const [n, k] = surjSpecs[i];
    let ans = 0;
    for (let j = 0; j <= k; j++) {
      const term = comb(k, j) * Math.pow(k - j, n);
      ans += (j % 2 === 0) ? term : -term;
    }
    items.push(makeItem({
      idx: idx++, topicId: TOP4, domain: DOM4, difficulty: 'hard', subskill: 8,
      archetype: 'Surjective Mappings & Stirling Numbers',
      text: `How many SURJECTIVE (onto) functions \\( f: \\{1, 2, \\dots, ${n}\\} \\to \\{1, 2, \\dots, ${k}\\} \\) exist?`,
      correctVal: String(ans),
      distractors: [String(Math.pow(k, n)), String(Math.pow(k, n) - k * Math.pow(k - 1, n)), String(comb(n - 1, k - 1))],
      sol: `By the Principle of Inclusion-Exclusion on the \\( ${k} \\) target elements that could be missed, the number of surjections is \\( \\sum_{j=0}^{${k}} (-1)^j \\binom{${k}}{j}(${k} - j)^{${n}} = ${ans} \\).`,
      hints: [
        `Total unrestricted functions equal \\( ${k}^{${n}} \\); let \\( A_i \\) be functions missing output \\( i \\).`,
        `Apply Inclusion-Exclusion: \\( \\sum_{j=0}^{${k}} (-1)^j \\binom{${k}}{j} (${k} - j)^{${n}} \\).`,
        `Evaluate the alternating sum carefully to get \\( ${ans} \\).`
      ]
    }));
  }

  // Hard 29..40: Vandermonde Convolution / Weighted Binomial Sums sum k^2 C(n, k) = n(n+1) 2^{n-2}
  for (let i = 0; i < 12; i++) {
    const n = i + 5; // 5..16
    const ans = n * (n + 1) * Math.pow(2, n - 2);
    items.push(makeItem({
      idx: idx++, topicId: TOP4, domain: DOM4, difficulty: 'hard', subskill: 9,
      archetype: 'Combinatorial Double-Counting & Committee-Leader Identity',
      text: `By double-counting committees with two (possibly identical) titled roles from \\( ${n} \\) candidates, evaluate the exact weighted binomial sum \\[ \\sum_{k=1}^{${n}} k^2 \\binom{${n}}{k}. \\]`,
      correctVal: String(ans),
      distractors: [String(n * Math.pow(2, n - 1)), String(n * (n - 1) * Math.pow(2, n - 2)), String(n * n * Math.pow(2, n - 1))],
      sol: `Write \\( k^2 = k(k - 1) + k \\). Using \\( k\\binom{n}{k} = n\\binom{n-1}{k-1} \\) and \\( k(k-1)\\binom{n}{k} = n(n-1)\\binom{n-2}{k-2} \\), summing over \\( k \\) gives \\( n(n - 1)2^{n-2} + n 2^{n-1} = n(n + 1)2^{n-2} \\). For \\( n = ${n} \\), this equals \\( ${n}(${n + 1})2^{${n - 2}} = ${ans} \\).`,
      hints: [
        `Interpret \\( k^2 \\binom{${n}}{k} \\) as choosing a subset of \\( k \\) people plus \\( 1 \\) president and \\( 1 \\) treasurer (possibly the same person) from that subset.`,
        `Case 1 (same person): \\( ${n} \\cdot 2^{${n - 1}} \\); Case 2 (two distinct people): \\( ${n}(${n - 1}) \\cdot 2^{${n - 2}} \\).`,
        `Sum both cases: \\( ${n}(${n + 1})2^{${n - 2}} = ${ans} \\).`
      ]
    }));
  }

  return items;
}

module.exports = { generateCh01To04 };
