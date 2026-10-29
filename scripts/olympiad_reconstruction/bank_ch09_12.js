'use strict';

const {
  gcd, comb, totient, countDivisors, vpFactorial, fracTex, makeItem
} = require('./bank_helpers');

function generateCh09To12(startIdx) {
  let idx = startIdx;
  const items = [];

  // =========================================================================
  // CHAPTER 9: ol-nsmo-stage1-2 (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM9 = 'NSMO of KSA: Screening & Regional Qualifiers';
  const TOP9 = 'ol-nsmo-stage1-2';

  // Easy 1..14: [NSMO Stage 1] Conjugate Radical Telescoping Sums
  const radPairs = [
    [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [2, 5], [2, 6],
    [2, 7], [2, 8], [3, 6], [3, 7], [3, 8], [4, 7], [4, 9]
  ];
  for (let i = 0; i < 14; i++) {
    const [m, n] = radPairs[i];
    const a = m * m;
    const b = n * n;
    const ans = n - m;
    items.push(makeItem({
      idx: idx++, topicId: TOP9, domain: DOM9, difficulty: 'easy', subskill: 1,
      archetype: 'NSMO Stage 1 Conjugate Radical Telescoping',
      text: `[NSMO of KSA — Stage 1 Screening] Evaluate the exact telescoping radical sum \\[ \\sum_{k=${a}}^{${b - 1}} \\frac{1}{\\sqrt{k + 1} + \\sqrt{k}}. \\]`,
      correctVal: String(ans),
      distractors: [String(n + m), String(ans + 1), String(b - a)],
      sol: `Rationalizing each denominator by multiplying by \\( \\sqrt{k+1} - \\sqrt{k} \\) gives \\( \\frac{1}{\\sqrt{k+1} + \\sqrt{k}} = \\sqrt{k+1} - \\sqrt{k} \\). Telescoping from \\( k = ${a} \\) to \\( ${b - 1} \\) leaves \\( \\sqrt{${b}} - \\sqrt{${a}} = ${n} - ${m} = ${ans} \\).`,
      hints: [
        `Rationalize the general term using \\( (\\sqrt{k+1} + \\sqrt{k})(\\sqrt{k+1} - \\sqrt{k}) = 1 \\).`,
        `Write the sum as \\( \\sum_{k=${a}}^{${b - 1}} (\\sqrt{k+1} - \\sqrt{k}) \\) so interior radicals cancel.`,
        `Evaluate \\( \\sqrt{${b}} - \\sqrt{${a}} = ${n} - ${m} = ${ans} \\).`
      ]
    }));
  }

  // Easy 15..28: [NSMO Stage 1] Minimum Sum x + y Given gcd(x, y) and lcm(x, y)
  const gcdLcmCfg = [
    [3, 60], [4, 84], [5, 72], [6, 90], [2, 120], [7, 40], [3, 140],
    [5, 126], [4, 150], [6, 56], [8, 45], [9, 28], [5, 108], [7, 72]
  ];
  for (let i = 0; i < 14; i++) {
    const [g, P] = gcdLcmCfg[i];
    const L = g * P;
    // Minimize u + v over u * v = P with gcd(u, v) = 1
    let minUV = P + 1;
    for (let u = 1; u * u <= P; u++) {
      if (P % u === 0) {
        const v = P / u;
        if (gcd(u, v) === 1 && u + v < minUV) minUV = u + v;
      }
    }
    const ans = g * minUV;
    items.push(makeItem({
      idx: idx++, topicId: TOP9, domain: DOM9, difficulty: 'easy', subskill: 2,
      archetype: 'NSMO Stage 1 GCD-LCM Coprime Optimization',
      text: `[NSMO of KSA — Stage 1 Screening] Positive integers \\( x \\) and \\( y \\) satisfy \\( \\gcd(x, y) = ${g} \\) and \\( \\operatorname{lcm}(x, y) = ${L} \\). What is the **minimum** possible value of \\( x + y \\)?`,
      correctVal: String(ans),
      distractors: [String(g * (P + 1)), String(ans + 2 * g), String(Math.max(2 * g, ans - g))],
      sol: `Write \\( x = ${g}u \\) and \\( y = ${g}v \\) with \\( \\gcd(u, v) = 1 \\). Then \\( \\operatorname{lcm}(x, y) = ${g}uv = ${L} \\implies uv = ${P} \\). Among coprime factor pairs of \\( ${P} \\), the pair closest to \\( \\sqrt{${P}} \\) minimizes \\( u + v = ${minUV} \\), giving \\( x + y = ${g}(${minUV}) = ${ans} \\).`,
      hints: [
        `Factor out \\( g = ${g} \\): set \\( x = ${g}u,\\; y = ${g}v \\) with \\( \\gcd(u, v) = 1 \\) so \\( uv = \\frac{${L}}{${g}} = ${P} \\).`,
        `Check factor pairs \\( (u, v) \\) of \\( ${P} \\), keeping only those with \\( \\gcd(u, v) = 1 \\).`,
        `Select the coprime pair minimizing \\( u + v = ${minUV} \\), then multiply by \\( ${g} \\) to get \\( ${ans} \\).`
      ]
    }));
  }

  // Easy 29..40: [NSMO Stage 1] Mawhiba Nested Inscribed Square & Circle Area
  for (let i = 0; i < 12; i++) {
    const s = 2 * (i + 3); // 6, 8, ..., 28
    const r = s / 2;
    const innerArea = (s * s) / 2;
    const fig = {
      type: 'shaded_region',
      variant: 'square_inscribed_circle',
      title: `Mawhiba Inscribed Configuration (Outer Side s = ${s})`,
      side: s,
      r,
      sideLabel: `s = ${s}`,
      rLabel: `r = ${r}`
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP9, domain: DOM9, difficulty: 'easy', subskill: 3,
      archetype: 'Mawhiba Nested Square-Circle Homothety',
      text: `[NSMO of KSA — Stage 1 Screening] As illustrated, a circle \\( \\omega \\) is inscribed in an outer square of side length \\( s = ${s} \\). A smaller inner square \\( Q \\) is then inscribed inside circle \\( \\omega \\). What is the exact area of the inner square \\( Q \\)?`,
      correctVal: String(innerArea),
      distractors: [String(s * s), String(r * r), String((innerArea * 3) / 2)],
      sol: `The circle inscribed in the outer square of side \\( ${s} \\) has diameter \\( d = ${s} \\) (radius \\( r = ${r} \\)). For the inner square \\( Q \\) inscribed in \\( \\omega \\), its diagonal equals the circle's diameter \\( d = ${s} \\), so \\( [Q] = \\frac{d^2}{2} = \\frac{${s}^2}{2} = ${innerArea} \\).`,
      hints: [
        `Note the diameter of the inscribed circle equals the outer square's side \\( s = ${s} \\).`,
        `For the square \\( Q \\) inscribed inside that circle, its **diagonal** (not its side!) equals the diameter \\( ${s} \\).`,
        `Compute \\( [Q] = \\frac{1}{2} \\times ${s}^2 = ${innerArea} \\).`
      ],
      fig
    }));
  }

  // Medium 1..14: [NSMO Stage 2] Partial-Fraction Telescoping Series
  for (let i = 0; i < 14; i++) {
    const c = (i % 5) + 2; // 2..6
    const n = i + 8;       // 8..21
    // sum_{k=1}^n c / ((2k - 1)(2k + 1)) = c * n / (2n + 1)
    const corr = fracTex(c * n, 2 * n + 1);
    items.push(makeItem({
      idx: idx++, topicId: TOP9, domain: DOM9, difficulty: 'medium', subskill: 1,
      archetype: 'NSMO Stage 2 Partial-Fraction Telescoping',
      text: `[NSMO of KSA — Stage 2 Regional] Compute the exact value of the finite series \\[ \\sum_{k=1}^{${n}} \\frac{${c}}{(2k - 1)(2k + 1)}. \\]`,
      correctVal: corr,
      distractors: [fracTex(c * n, 2 * n - 1), fracTex(c, 2 * n + 1), fracTex(2 * c * n, 2 * n + 1)],
      sol: `Using partial fractions, \\( \\frac{${c}}{(2k - 1)(2k + 1)} = \\frac{${c}}{2}\\left(\\frac{1}{2k - 1} - \\frac{1}{2k + 1}\\right) \\). Telescoping from \\( k = 1 \\) to \\( ${n} \\) gives \\[ \\frac{${c}}{2}\\left(1 - \\frac{1}{${2 * n + 1}}\\right) = \\frac{${c}}{2} \\cdot \\frac{${2 * n}}{${2 * n + 1}} = ${corr}. \\]`,
      hints: [
        `Decompose \\( \\frac{1}{(2k-1)(2k+1)} = \\frac{1}{2}\\left(\\frac{1}{2k-1} - \\frac{1}{2k+1}\\right) \\) (remember the \\( \\frac{1}{2} \\) factor!).`,
        `Telescope the sum over \\( k = 1, \\dots, ${n} \\) to retain \\( 1 - \\frac{1}{${2 * n + 1}} \\).`,
        `Multiply by \\( \\frac{${c}}{2} \\) and simplify to \\( ${corr} \\).`
      ]
    }));
  }

  // Medium 15..28: [NSMO Stage 2] Trapezoid Diagonals Area Decomposition [ABCD] = (p + q)^2 * k
  const trapCfg = [
    [1, 2, 3], [1, 3, 2], [2, 3, 2], [2, 5, 1], [3, 4, 2], [3, 5, 1], [1, 4, 2],
    [2, 3, 3], [3, 4, 1], [2, 5, 2], [3, 5, 2], [4, 5, 1], [1, 2, 5], [2, 7, 1]
  ];
  for (let i = 0; i < 14; i++) {
    const [p, q, k] = trapCfg[i];
    const areaABP = p * p * k;
    const totalArea = (p + q) * (p + q) * k;
    const fig = {
      type: 'trapezoid_diagonals',
      labels: ['A', 'B', 'C', 'D', 'P'],
      sides: { ab: `${p}m`, cd: `${q}m` }
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP9, domain: DOM9, difficulty: 'medium', subskill: 2,
      archetype: 'Mawhiba Trapezoid Diagonal Area Ratio',
      text: `[NSMO of KSA — Stage 2 Regional] In trapezoid \\( ABCD \\) shown, \\( AB \\parallel CD \\) with \\( AB : CD = ${p} : ${q} \\), and diagonals \\( AC \\) and \\( BD \\) intersect at \\( P \\). If \\( [ABP] = ${areaABP} \\), find the total area \\( [ABCD] \\) of the trapezoid.`,
      correctVal: String(totalArea),
      distractors: [String((p * p + q * q) * k), String((p + q) * p * k), String(totalArea - p * q * k)],
      sol: `Because \\( AB \\parallel CD \\), \\( \\triangle ABP \\sim \\triangle CDP \\) with ratio \\( ${p} : ${q} \\), so \\( AP : PC = ${p} : ${q} \\) and \\( [CDP] = \\frac{${q}^2}{${p}^2}[ABP] = ${q * q * k} \\). Sharing altitudes with \\( \\triangle ABP \\), the wing triangles satisfy \\( [BCP] = [ADP] = \\frac{${q}}{${p}}[ABP] = ${p * q * k} \\). Summing all four regions gives \\( [ABCD] = (${p} + ${q})^2 \\cdot ${k} = ${totalArea} \\).`,
      hints: [
        `Use \\( \\triangle ABP \\sim \\triangle CDP \\) to get \\( AP : PC = ${p} : ${q} \\) and \\( [CDP] = ${q * q * k} \\).`,
        `Use equal-altitude base ratios along \\( AC \\) and \\( BD \\) to find \\( [BCP] = [ADP] = ${p * q * k} \\).`,
        `Sum \\( ${areaABP} + 2(${p * q * k}) + ${q * q * k} = ${totalArea} \\).`
      ],
      fig
    }));
  }

  // Medium 29..40: [NSMO Stage 2] Structured Digit & Divisibility Combinatorics
  for (let i = 0; i < 12; i++) {
    // 5-digit palindromes abcba divisible by d or with fixed digit sum, or strictly monotone digits!
    // Let's count 4-digit numbers abcd with 1 <= a <= b <= c <= d <= m or a < b < c < d, plus 5-digit palindromes divisible by 3 or 9!
    if (i < 6) {
      const maxD = i + 4; // 4..9: strictly increasing digits from {0, 1, ..., maxD} or {1, ..., maxD+3}
      const poolSize = i + 6; // 6..11? Digits in base 10: pool {1..9} or {0..9} with constraints!
      // Use 5-digit palindromes \overline{abcba} divisible by 9 or 3 or 11? Wait: for 9, 2(a+b)+c === 0 (mod 9): for each (a,b) in {1..9}x{0..9} (90 pairs), how many c in {0..9} satisfy c === -2(a+b) (mod 9)? Wait: c=0 and c=9 BOTH give 0 mod 9! Let's compute by exact brute-force loop in JS!
      const divs = [3, 9, 11, 15, 18, 45];
      const d = divs[i];
      let cnt = 0;
      for (let a = 1; a <= 9; a++) {
        for (let b = 0; b <= 9; b++) {
          for (let c = 0; c <= 9; c++) {
            const val = 10001 * a + 1010 * b + 100 * c;
            if (val % d === 0) cnt++;
          }
        }
      }
      items.push(makeItem({
        idx: idx++, topicId: TOP9, domain: DOM9, difficulty: 'medium', subskill: 3,
        archetype: 'NSMO Palindrome Modular Counting',
        text: `[NSMO of KSA — Stage 2 Regional] How many \\( 5 \\)-digit base-\\( 10 \\) palindromes \\( \\overline{abcba} \\) (with \\( a \\in \\{1, \\dots, 9\\} \\) and \\( b, c \\in \\{0, \\dots, 9\\} \\)) are divisible by \\( ${d} \\)?`,
        correctVal: String(cnt),
        distractors: [String(Math.round(900 / d) + 5), String(cnt + 9), String(Math.max(1, cnt - 10))],
        sol: `A \\( 5 \\)-digit palindrome has the form \\( N = 10001a + 1010b + 100c \\) with \\( 1 \\le a \\le 9 \\) and \\( 0 \\le b, c \\le 9 \\). Imposing the modular condition \\( N \\equiv 0 \\pmod{${d}} \\) (remembering that when a residue is \\( 0 \\pmod 9 \\), both \\( c = 0 \\) and \\( c = 9 \\) contribute!) yields exactly \\( ${cnt} \\) valid palindromes.`,
        hints: [
          `Write the palindrome as \\( N = 10001a + 1010b + 100c \\) with \\( a \\neq 0 \\).`,
          `Reduce \\( N \\) modulo the prime-power factors of \\( ${d} \\) (e.g., digit sum \\( 2a + 2b + c \\) for \\( 3 \\) or \\( 9 \\), alternating sum \\( 2a - 2b + c \\) for \\( 11 \\), last digit \\( a \\) for \\( 2 \\) or \\( 5 \\)).`,
          `Count valid triples \\( (a, b, c) \\) carefully (watching \\( c \\in \\{0, 9\\} \\) for mod \\( 9 \\)) to get \\( ${cnt} \\).`
        ]
      }));
    } else {
      const kLen = (i - 6) + 3; // 3, 4, 5, 6, 7, 8: k-digit positive integers with non-decreasing nonzero digits 1 <= d_1 <= ... <= d_k <= 9
      const ans = comb(9 + kLen - 1, kLen);
      items.push(makeItem({
        idx: idx++, topicId: TOP9, domain: DOM9, difficulty: 'medium', subskill: 3,
        archetype: 'NSMO Monotone-Digit Bijective Counting',
        text: `[NSMO of KSA — Stage 2 Regional] How many \\( ${kLen} \\)-digit positive integers \\( \\overline{d_1 d_2 \\dots d_{${kLen}}} \\) have **non-decreasing** nonzero digits \\( 1 \\le d_1 \\le d_2 \\le \\dots \\le d_{${kLen}} \\le 9 \\)?`,
        correctVal: String(ans),
        distractors: [String(comb(9, kLen)), String(comb(10 + kLen - 1, kLen)), String(ans - 9)],
        sol: `Each non-decreasing \\( ${kLen} \\)-tuple \\( 1 \\le d_1 \\le \\dots \\le d_{${kLen}} \\le 9 \\) corresponds bijectively to a multiset of size \\( ${kLen} \\) chosen from \\( \\{1, 2, \\dots, 9\\} \\) (sorted into unique non-decreasing order). By Stars and Bars, there are \\( \\binom{9 + ${kLen} - 1}{${kLen}} = \\binom{${8 + kLen}}{${kLen}} = ${ans} \\) such integers.`,
        hints: [
          `Observe that once a multiset of \\( ${kLen} \\) digits from \\( \\{1, \\dots, 9\\} \\) is chosen, sorting them into non-decreasing order is unique.`,
          `Apply multiset combinations \\( \\binom{9 + ${kLen} - 1}{${kLen}} \\) (or shift \\( e_j = d_j + j - 1 \\) into strictly increasing subsets).`,
          `Evaluate \\( \\binom{${8 + kLen}}{${kLen}} = ${ans} \\).`
        ]
      }));
    }
  }

  // Hard 1..14: [NSMO Stage 2] Quartic Argand-Identity Telescoping Sum k / (k^4 + k^2 + 1)
  for (let i = 0; i < 14; i++) {
    const n = i + 5; // 5..18
    const corr = fracTex(n * (n + 1), 2 * (n * n + n + 1));
    items.push(makeItem({
      idx: idx++, topicId: TOP9, domain: DOM9, difficulty: 'hard', subskill: 1,
      archetype: 'Quartic Factorization Telescoping Series',
      text: `[NSMO of KSA — Stage 2 Qualifier] Using the quartic factorization \\( k^4 + k^2 + 1 = (k^2 - k + 1)(k^2 + k + 1) \\), evaluate the exact sum \\[ \\sum_{k=1}^{${n}} \\frac{k}{k^4 + k^2 + 1}. \\]`,
      correctVal: corr,
      distractors: [fracTex(n * (n + 1), n * n + n + 1), fracTex(n * n, 2 * (n * n + n + 1)), fracTex(1, n * n + n + 1)],
      sol: `Since \\( (k^2 + k + 1) - (k^2 - k + 1) = 2k \\), \\[ \\frac{k}{k^4 + k^2 + 1} = \\frac{1}{2}\\left(\\frac{1}{k^2 - k + 1} - \\frac{1}{k^2 + k + 1}\\right). \\] Notice \\( (k+1)^2 - (k+1) + 1 = k^2 + k + 1 \\), so the sum telescopes cleanly from \\( k = 1 \\) to \\( ${n} \\): \\[ \\frac{1}{2}\\left(1 - \\frac{1}{${n}^2 + ${n} + 1}\\right) = ${corr}. \\]`,
      hints: [
        `Rewrite the numerator using \\( 2k = (k^2 + k + 1) - (k^2 - k + 1) \\).`,
        `Observe \\( (k+1)^2 - (k+1) + 1 = k^2 + k + 1 \\), so adjacent partial fractions cancel!`,
        `Evaluate \\( \\frac{1}{2}\\left(1 - \\frac{1}{${n * n + n + 1}}\\right) = ${corr} \\).`
      ]
    }));
  }

  // Hard 15..28: [NSMO Stage 2] Right-Triangle Altitude Inradii Theorem r + r_1 + r_2 = h_c
  const pythPrims = [
    [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37]
  ];
  for (let i = 0; i < 14; i++) {
    const scale = (i < 7) ? 1 : 2;
    const [pA, pB, pC] = pythPrims[i % 7];
    const a = pA * scale, b = pB * scale, c = pC * scale;
    const corr = fracTex(a * b, c);
    const fig = {
      type: 'triangle',
      labels: ['B', 'A', 'C'],
      right: 2,
      sides: [String(c), String(b), String(a)]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP9, domain: DOM9, difficulty: 'hard', subskill: 2,
      archetype: 'Right-Triangle Altitude Inradii Sum',
      text: `[NSMO of KSA — Stage 2 Qualifier] Right triangle \\( ABC \\) shown has \\( \\angle C = 90^\\circ \\), legs \\( BC = ${a} \\) and \\( AC = ${b} \\), and hypotenuse \\( AB = ${c} \\). Altitude \\( CD \\) to the hypotenuse partitions \\( \\triangle ABC \\) into \\( \\triangle ACD \\) and \\( \\triangle BCD \\). Let \\( r,\\; r_1,\\; r_2 \\) be the inradii of \\( \\triangle ABC,\\; \\triangle ACD,\\; \\triangle BCD \\) respectively. Find \\( r + r_1 + r_2 \\).`,
      correctVal: corr,
      distractors: [fracTex(a + b - c, 2), fracTex(2 * a * b, c), fracTex(a + b, 2)],
      sol: `Because \\( \\triangle ACD \\sim \\triangle ABC \\sim \\triangle CBD \\) with hypotenuse ratios \\( \\frac{b}{c},\\; 1,\\; \\frac{a}{c} \\), their inradii scale identically: \\( r_1 = \\frac{b}{c}r \\) and \\( r_2 = \\frac{a}{c}r \\). Since \\( r = \\frac{a + b - c}{2} \\), \\[ r + r_1 + r_2 = r\\left(1 + \\frac{a + b}{c}\\right) = \\frac{(a + b - c)(a + b + c)}{2c} = \\frac{a^2 + 2ab + b^2 - c^2}{2c} = \\frac{ab}{c} = ${corr} \\] (remarkably equal to the altitude \\( CD \\)!).`,
      hints: [
        `Use similarity \\( \\triangle ACD \\sim \\triangle CBD \\sim \\triangle ABC \\) so \\( r_1 = \\frac{b}{c}r \\) and \\( r_2 = \\frac{a}{c}r \\).`,
        `Substitute \\( r = \\frac{a + b - c}{2} \\) into \\( r\\left(\\frac{a + b + c}{c}\\right) \\) and use \\( a^2 + b^2 = c^2 \\).`,
        `Simplify \\( \\frac{ab}{c} = \\frac{${a} \\cdot ${b}}{${c}} = ${corr} \\).`
      ],
      fig
    }));
  }

  // Hard 29..40: [NSMO Stage 2] Equal-Floor Integer Equation floor(x / a) = floor(x / (a + 1))
  for (let i = 0; i < 12; i++) {
    const a = i + 4; // 4..15
    const ans = ((a - 1) * (a + 2)) / 2;
    items.push(makeItem({
      idx: idx++, topicId: TOP9, domain: DOM9, difficulty: 'hard', subskill: 3,
      archetype: 'Equal-Quotient Floor Counting',
      text: `[NSMO of KSA — Stage 2 Qualifier] How many **positive** integers \\( x \\ge 1 \\) satisfy the floor equation \\[ \\left\\lfloor \\frac{x}{${a}} \\right\\rfloor = \\left\\lfloor \\frac{x}{${a + 1}} \\right\\rfloor \\; ? \\]`,
      correctVal: String(ans),
      distractors: [String((a * (a + 1)) / 2), String(((a - 1) * a) / 2), String(ans + a)],
      sol: `Let \\( q = \\lfloor x/${a} \\rfloor = \\lfloor x/${a + 1} \\rfloor \\ge 0 \\). Then \\( q(${a}) \\le x < (q+1)${a} \\) and \\( q(${a + 1}) \\le x < (q+1)(${a + 1}) \\), whose intersection for \\( x \\ge 0 \\) is \\( q(${a + 1}) \\le x \\le q${a} + ${a - 1} \\). This contains \\( ${a} - q \\) integers for \\( q = 0, 1, \\dots, ${a - 1} \\) (and \\( 0 \\) for \\( q \\ge ${a} \\)). Excluding \\( x = 0 \\) at \\( q = 0 \\) gives \\( (${a} - 1) + \\sum_{q=1}^{${a - 1}} (${a} - q) = \\frac{${a}(${a + 1})}{2} - 1 = ${ans} \\).`,
      hints: [
        `Condition on the common integer value \\( q = \\lfloor x/${a} \\rfloor = \\lfloor x/${a + 1} \\rfloor \\ge 0 \\).`,
        `Intersect \\( [${a}q, ${a}q + ${a - 1}] \\) with \\( [${a + 1}q, ${a + 1}q + ${a}] \\), giving \\( ${a} - q \\) integers for \\( 0 \\le q \\le ${a - 1} \\).`,
        `Sum \\( \\sum_{q=0}^{${a - 1}}(${a} - q) = \\frac{${a}(${a + 1})}{2} \\) and subtract \\( 1 \\) to exclude \\( x = 0 \\), obtaining \\( ${ans} \\).`
      ]
    }));
  }

  // =========================================================================
  // CHAPTER 10: ol-nsmo-national-finals (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM10 = 'NSMO of KSA: National Finals & Mawhiba IMO Pathway';
  const TOP10 = 'ol-nsmo-national-finals';

  // Easy 1..14: [NSMO Finals] Bilinear Cauchy Functional Equation f(x+y) = f(x) + f(y) + 2c*x*y
  for (let i = 0; i < 14; i++) {
    const c = (i % 4) + 1;
    const f1 = i + 2;
    const n = (i % 6) + 7; // 7..12
    // g(x) = f(x) - c*x^2 is additive on Z => f(x) = c*x^2 + (f1 - c)*x
    const ans = c * n * n + (f1 - c) * n;
    const fig = (i < 12) ? {
      type: 'fn',
      title: 'Quadratic Cauchy Shift g(x) = f(x) - cx²',
      fns: [{ fn: `${f1 - c}*x`, label: 'Linear core g(x)' }],
      xrange: [-3, 6],
      yrange: [-10, Math.max(15, 6 * (f1 - c) + 5)]
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP10, domain: DOM10, difficulty: 'easy', subskill: 1,
      archetype: 'NSMO Bilinear Cauchy Functional Equation',
      text: `[NSMO of KSA — Riyadh Finals] A function \\( f: \\mathbb{Z} \\to \\mathbb{Z} \\) satisfies \\[ f(x + y) = f(x) + f(y) + ${2 * c}xy \\quad \\forall x, y \\in \\mathbb{Z}, \\] together with \\( f(1) = ${f1} \\)${fig ? ' (with additive core \\( g(x) = f(x) - ' + c + 'x^2 \\) plotted)' : ''}. Compute \\( f(${n}) \\).`,
      correctVal: String(ans),
      distractors: [String(f1 * n + c * n * n), String(c * n * n), String(ans - c * n)],
      sol: `Define the auxiliary function \\( g(x) = f(x) - ${c}x^2 \\). Substituting into the functional equation cancels the \\( ${2 * c}xy \\) cross-term, so \\( g(x + y) = g(x) + g(y) \\) on \\( \\mathbb{Z} \\). Since \\( g(1) = f(1) - ${c} = ${f1 - c} \\), \\( g(x) = ${f1 - c}x \\) and \\( f(x) = ${c}x^2 + ${f1 - c}x \\). Thus \\( f(${n}) = ${c}(${n}^2) + (${f1 - c})(${n}) = ${ans} \\).`,
      hints: [
        `Notice \\( (x + y)^2 - x^2 - y^2 = 2xy \\), so subtracting \\( ${c}x^2 \\) absorbs the \\( ${2 * c}xy \\) cross-term.`,
        `Set \\( g(x) = f(x) - ${c}x^2 \\); then \\( g \\) is additive on \\( \\mathbb{Z} \\) with \\( g(1) = ${f1 - c} \\).`,
        `Evaluate \\( f(${n}) = ${c}(${n})^2 + (${f1 - c})(${n}) = ${ans} \\).`
      ],
      fig
    }));
  }

  // Easy 15..28: [NSMO Finals] Multiplicative Order ord_M(a)
  const ordCfg = [
    [2, 15], [2, 21], [2, 31], [3, 20], [3, 28], [2, 45], [5, 24],
    [2, 63], [3, 40], [5, 26], [2, 35], [3, 26], [7, 20], [2, 51]
  ];
  for (let i = 0; i < 14; i++) {
    const [a, M] = ordCfg[i];
    let ord = 1, cur = a % M;
    while (cur !== 1) { cur = (cur * a) % M; ord++; }
    items.push(makeItem({
      idx: idx++, topicId: TOP10, domain: DOM10, difficulty: 'easy', subskill: 2,
      archetype: 'Multiplicative Order & Lagrange Divisibility',
      text: `[NSMO of KSA — Riyadh Finals] Find the multiplicative order \\( \\operatorname{ord}_{${M}}(${a}) \\), i.e., the smallest positive integer \\( d \\) such that \\( ${a}^d \\equiv 1 \\pmod{${M}} \\).`,
      correctVal: String(ord),
      distractors: [String(totient(M) === ord ? ord * 2 : totient(M)), String(Math.max(2, ord - 1)), String(ord + 2)],
      sol: `By Euler's theorem, \\( \\operatorname{ord}_{${M}}(${a}) \\) must divide \\( \\varphi(${M}) = ${totient(M)} \\). Testing the divisors of \\( ${totient(M)} \\) in increasing order (or taking \\( \\operatorname{lcm} \\) of orders modulo the prime-power factors of \\( ${M} \\)) shows \\( d = ${ord} \\) is the minimal positive exponent with \\( ${a}^d \\equiv 1 \\pmod{${M}} \\).`,
      hints: [
        `Recall \\( \\operatorname{ord}_{${M}}(${a}) \\mid \\varphi(${M}) = ${totient(M)} \\) (and more tightly divides Carmichael's \\( \\lambda(${M}) \\)).`,
        `Compute \\( ${a}^k \\bmod ${M} \\) over the divisors of \\( ${totient(M)} \\).`,
        `Verify \\( d = ${ord} \\) is the smallest positive exponent giving \\( 1 \\pmod{${M}} \\).`
      ]
    }));
  }

  // Easy 29..40: [NSMO Finals] Titu's Lemma (Engel Cauchy-Schwarz) Minimum
  const tituCfg = [
    [1, 2, 3, 12], [2, 3, 4, 27], [1, 3, 5, 18], [2, 3, 5, 20], [1, 4, 5, 25], [2, 4, 6, 16],
    [1, 2, 5, 16], [3, 4, 5, 24], [1, 3, 4, 32], [2, 5, 5, 36], [1, 4, 7, 24], [3, 5, 7, 45]
  ];
  for (let i = 0; i < 12; i++) {
    const [w1, w2, w3, S] = tituCfg[i];
    const sumW = w1 + w2 + w3;
    const corr = fracTex(sumW * sumW, S);
    items.push(makeItem({
      idx: idx++, topicId: TOP10, domain: DOM10, difficulty: 'easy', subskill: 3,
      archetype: 'Titu Lemma Engel Cauchy-Schwarz Optimization',
      text: `[NSMO of KSA — Riyadh Finals] Let \\( x, y, z > 0 \\) be positive real numbers satisfying \\( x + y + z = ${S} \\). Using Titu's Lemma (Cauchy–Schwarz in Engel form), find the exact minimum value of \\[ \\frac{${w1 * w1}}{x} + \\frac{${w2 * w2}}{y} + \\frac{${w3 * w3}}{z}. \\]`,
      correctVal: corr,
      distractors: [fracTex(w1 * w1 + w2 * w2 + w3 * w3, S), fracTex(3 * (w1 * w1 + w2 * w2 + w3 * w3), S), fracTex(sumW, S)],
      sol: `By Titu's Lemma, \\[ \\frac{${w1}^2}{x} + \\frac{${w2}^2}{y} + \\frac{${w3}^2}{z} \\ge \\frac{(${w1} + ${w2} + ${w3})^2}{x + y + z} = \\frac{${sumW}^2}{${S}} = ${corr}, \\] with equality achieved when \\( x : y : z = ${w1} : ${w2} : ${w3} \\).`,
      hints: [
        `Apply Titu's Lemma \\( \\sum \\frac{w_i^2}{x_i} \\ge \\frac{(\\sum w_i)^2}{\\sum x_i} \\) with numerators \\( ${w1}^2,\\; ${w2}^2,\\; ${w3}^2 \\).`,
        `Sum the square roots \\( ${w1} + ${w2} + ${w3} = ${sumW} \\), square to \\( ${sumW * sumW} \\), and divide by \\( x + y + z = ${S} \\).`,
        `Simplify the fraction to \\( ${corr} \\).`
      ]
    }));
  }

  // Medium 1..14: [NSMO Finals] Lifting The Exponent (LTE) Lemma v_p(a^n - b^n)
  const lteCfg = [
    // [p, a, b, n] with p odd prime, p | (a - b), p \nmid a*b
    [3, 7, 1, 27], [3, 10, 1, 18], [3, 19, 1, 9], [3, 14, 5, 36], [5, 11, 1, 25],
    [5, 26, 1, 50], [5, 18, 3, 15], // wait: p=5 must NOT divide b=3! Good: 5 \nmid 18 and 5 \nmid 3, 18-3=15 => v_5(15)=1!
    [7, 15, 1, 49], [7, 50, 1, 14], [3, 28, 1, 81], [5, 51, 1, 125], [3, 20, 2, 45],
    [7, 30, 2, 21], [5, 32, 7, 75]
  ];
  const vpInt = (x, p) => { let c = 0, t = Math.abs(x); while (t > 0 && t % p === 0) { c++; t /= p; } return c; };
  for (let i = 0; i < 14; i++) {
    const [p, a, b, n] = lteCfg[i];
    const vDiff = vpInt(a - b, p);
    const vN = vpInt(n, p);
    const ans = vDiff + vN;
    items.push(makeItem({
      idx: idx++, topicId: TOP10, domain: DOM10, difficulty: 'medium', subskill: 1,
      archetype: 'Lifting The Exponent (LTE) Prime Valuation',
      text: `[NSMO of KSA — Riyadh Finals] Let \\( v_${p}(N) \\) denote the exponent of the prime \\( ${p} \\) in the prime factorization of \\( N \\). Using the Lifting The Exponent (LTE) Lemma, compute \\[ v_${p}\\!\\left(${a}^{${n}} - ${b}^{${n}}\\right). \\]`,
      correctVal: String(ans),
      distractors: [String(vDiff * vN || (ans + 1)), String(ans - 1), String(ans + 2)],
      sol: `Verify the LTE hypotheses: \\( p = ${p} \\) is an odd prime, \\( ${p} \\nmid ${a} \\), \\( ${p} \\nmid ${b} \\), and \\( ${p} \\mid (${a} - ${b} = ${a - b}) \\). Therefore, \\[ v_${p}(${a}^{${n}} - ${b}^{${n}}) = v_${p}(${a} - ${b}) + v_${p}(${n}) = ${vDiff} + ${vN} = ${ans}. \\]`,
      hints: [
        `Check the odd-prime LTE hypotheses: \\( ${p} \\nmid ${a},\\; ${p} \\nmid ${b} \\), and \\( ${p} \\mid (${a} - ${b}) \\).`,
        `Apply \\( v_${p}(a^n - b^n) = v_${p}(a - b) + v_${p}(n) \\).`,
        `Add \\( v_${p}(${a - b}) = ${vDiff} \\) and \\( v_${p}(${n}) = ${vN} \\) to get \\( ${ans} \\).`
      ]
    }));
  }

  // Medium 15..28: [NSMO Finals] Orthocenter-Circumradius Identity AH^2 + BC^2 = 4R^2
  const orthoCfg = [
    // [BC, AH, R] where BC^2 + AH^2 = (2R)^2!
    [6, 8, 5], [10, 24, 13], [16, 30, 17], [14, 48, 25], [12, 16, 10], [24, 10, 13], [30, 16, 17],
    [18, 24, 15], [40, 42, 29], [18, 80, 41], [24, 70, 37], [30, 40, 25], [20, 48, 26], [28, 96, 50]
  ];
  for (let i = 0; i < 14; i++) {
    const [bc, ah, R] = orthoCfg[i];
    const fig = {
      type: 'circle',
      title: `Circumcircle (O) of Acute/Obtuse Triangle ABC (R = ${R})`,
      center: 'O',
      labelR: `R = ${R}`
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP10, domain: DOM10, difficulty: 'medium', subskill: 2,
      archetype: 'Orthocenter Distance AH² + BC² = 4R²',
      text: `[NSMO of KSA — Riyadh Finals] Triangle \\( ABC \\) is inscribed in circumcircle \\( (O) \\) of radius \\( R = ${R} \\) (illustrated), and \\( H \\) is its orthocenter. If side \\( BC = ${bc} \\), find the exact distance \\( AH \\) from vertex \\( A \\) to the orthocenter.`,
      correctVal: String(ah),
      distractors: [String(2 * R - bc), String(Math.abs(R - bc / 2) || (ah - 2)), String(ah + 4)],
      sol: `Let \\( A' \\) be the antipode of \\( A \\) on \\( (O) \\) and \\( M_A \\) the midpoint of \\( BC \\). Because \\( BH \\parallel A'C \\) and \\( CH \\parallel A'B \\), \\( BHCA' \\) is a parallelogram, so \\( AH = 2\\,OM_A = 2R|\\cos A| \\) while \\( BC = 2R\\sin A \\). Squaring and adding gives \\( AH^2 + BC^2 = 4R^2 \\), hence \\( AH = \\sqrt{(2\\cdot ${R})^2 - ${bc}^2} = \\sqrt{${4 * R * R - bc * bc}} = ${ah} \\).`,
      hints: [
        `Recall \\( BC = 2R\\sin A \\) and \\( AH = 2\\,OM_A = 2R|\\cos A| \\) (proved via antipode parallelogram \\( BHCA' \\)).`,
        `Square and add: \\( AH^2 + BC^2 = 4R^2(\\cos^2 A + \\sin^2 A) = 4R^2 \\).`,
        `Compute \\( AH = \\sqrt{4(${R})^2 - ${bc}^2} = ${ah} \\).`
      ],
      fig
    }));
  }

  // Medium 29..40: [NSMO Camp] Involution Functional System a*f(x) + b*f(1/x) = c*x
  const invFnCfg = [
    [2, 1, 3, 2], [3, 1, 8, 2], [3, 2, 5, 2], [4, 1, 15, 3], [3, 1, 8, 4], [5, 3, 16, 2],
    [4, 3, 7, 2], [5, 2, 21, 3], [2, -1, 3, 3], [3, -1, 8, 2], [5, 1, 24, 2], [4, -1, 15, 2]
  ];
  for (let i = 0; i < 12; i++) {
    const [a, b, c, x0] = invFnCfg[i];
    // a*f(x) + b*f(1/x) = c*x and b*f(x) + a*f(1/x) = c/x
    // Multiply 1st by a, 2nd by b and subtract: (a^2 - b^2) f(x) = a*c*x - b*c/x = c*(a*x^2 - b)/x
    const num = c * (a * x0 * x0 - b);
    const den = (a * a - b * b) * x0;
    const corr = fracTex(num, den);
    const bTerm = b === 1 ? '+ f(1/x)' : (b === -1 ? '- f(1/x)' : (b > 0 ? `+ ${b}f(1/x)` : `- ${Math.abs(b)}f(1/x)`));
    items.push(makeItem({
      idx: idx++, topicId: TOP10, domain: DOM10, difficulty: 'medium', subskill: 3,
      archetype: 'Reciprocal Involution Functional Equation',
      text: `[NSMO of KSA — Mawhiba IMO Camp] A function \\( f: \\mathbb{R} \\setminus \\{0\\} \\to \\mathbb{R} \\) satisfies \\[ ${a}f(x) ${bTerm} = ${c}x \\quad \\text{for all } x \\neq 0. \\] Find the exact value of \\( f(${x0}) \\).`,
      correctVal: corr,
      distractors: [fracTex(c * x0, a + b), fracTex(c * (a * x0 * x0 + b), den), fracTex(num, a * a - b * b)],
      sol: `Substitute \\( x = ${x0} \\) and \\( x = \\frac{1}{${x0}} \\) to form a \\( 2 \\times 2 \\) linear system in \\( u = f(${x0}) \\) and \\( v = f(1/${x0}) \\): \\[ ${a}u ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}v = ${c * x0}, \\qquad ${b}u + ${a}v = \\frac{${c}}{${x0}}. \\] Eliminating \\( v \\) gives \\( (${a * a - b * b})u = ${a}(${c * x0}) - ${b}\\cdot\\frac{${c}}{${x0}} \\implies f(${x0}) = ${corr} \\).`,
      hints: [
        `Replace \\( x \\) by \\( 1/x \\) (the order-\\( 2 \\) involution) to get a second equation \\( ${b}f(x) + ${a}f(1/x) = \\frac{${c}}{x} \\).`,
        `Eliminate \\( f(1/${x0}) \\) by multiplying the first equation by \\( ${a} \\) and subtracting \\( ${b} \\) times the second.`,
        `Solve \\( (${a}^2 - (${b})^2)f(${x0}) = ${a * c * x0} - \\frac{${b * c}}{${x0}} \\) to obtain \\( ${corr} \\).`
      ]
    }));
  }

  // Hard 1..14: [NSMO Camp] Cyclic Olympiad Inequalities (Shifted Nesbitt & Titu Cyclic)
  for (let i = 0; i < 14; i++) {
    if (i < 7) {
      // Minimum of sum_{cyc} a / (b + k*c)? No: sum_{cyc} (a + m*b + m*c)/(b + c) = sum_{cyc} a/(b+c) + 3m >= 3/2 + 3m!
      const m = i + 1; // 1..7
      // sum_{cyc} (2a + m(b + c)) / (b + c) = 2 * sum a/(b+c) + 3m >= 3 + 3m!
      const ans = 3 + 3 * m;
      items.push(makeItem({
        idx: idx++, topicId: TOP10, domain: DOM10, difficulty: 'hard', subskill: 1,
        archetype: 'Nesbitt Cyclic Inequality Minimum',
        text: `[NSMO of KSA — Mawhiba IMO Camp] Over all positive real numbers \\( a, b, c > 0 \\), find the exact minimum value of the cyclic expression \\[ \\frac{2a + ${m}b + ${m}c}{b + c} + \\frac{2b + ${m}c + ${m}a}{c + a} + \\frac{2c + ${m}a + ${m}b}{a + b}. \\]`,
        correctVal: String(ans),
        distractors: [String(3 * m + 2), String(3 * m + 6), String(fracTex(3 + 6 * m, 2))],
        sol: `Splitting each fraction gives \\[ 2\\left(\\frac{a}{b + c} + \\frac{b}{c + a} + \\frac{c}{a + b}\\right) + ${m} + ${m} + ${m}. \\] By Nesbitt's Inequality (proved by adding \\( 1 \\) to each fraction and applying Cauchy–Schwarz / Titu), \\( \\sum_{\\text{cyc}} \\frac{a}{b + c} \\ge \\frac{3}{2} \\) with equality at \\( a = b = c \\). Hence the minimum is \\( 2\\cdot\\frac{3}{2} + ${3 * m} = ${ans} \\).`,
        hints: [
          `Separate each fraction as \\( \\frac{2a}{b + c} + ${m}\\cdot\\frac{b + c}{b + c} = \\frac{2a}{b + c} + ${m} \\).`,
          `Apply Nesbitt's Inequality \\( \\frac{a}{b+c} + \\frac{b}{c+a} + \\frac{c}{a+b} \\ge \\frac{3}{2} \\).`,
          `Evaluate \\( 2\\left(\\frac{3}{2}\\right) + 3(${m}) = ${ans} \\) at \\( a = b = c \\).`
        ]
      }));
    } else {
      // sum_{cyc} a^2 / (b + c) >= (a + b + c) / 2 when a + b + c = S!
      const S = 2 * (i - 7 + 4); // 8, 10, ..., 20
      const kScale = (i % 3) + 1;
      const ans = (kScale * S) / 2;
      items.push(makeItem({
        idx: idx++, topicId: TOP10, domain: DOM10, difficulty: 'hard', subskill: 1,
        archetype: 'Cyclic Quadratic-Over-Linear Titu Bound',
        text: `[NSMO of KSA — Mawhiba IMO Camp] Let \\( a, b, c > 0 \\) satisfy \\( a + b + c = ${S} \\). Find the exact minimum value of \\[ ${kScale === 1 ? '' : kScale}\\left(\\frac{a^2}{b + c} + \\frac{b^2}{c + a} + \\frac{c^2}{a + b}\\right). \\]`,
        correctVal: String(ans),
        distractors: [String(kScale * S), String(ans - kScale), String(fracTex(kScale * S, 3))],
        sol: `By Titu's Lemma, \\[ \\sum_{\\text{cyc}} \\frac{a^2}{b + c} \\ge \\frac{(a + b + c)^2}{(b + c) + (c + a) + (a + b)} = \\frac{a + b + c}{2} = \\frac{${S}}{2} = ${S / 2}, \\] with equality at \\( a = b = c = \\frac{${S}}{3} \\). Multiplying by \\( ${kScale} \\) yields \\( ${ans} \\).`,
        hints: [
          `Apply Titu's Lemma directly to \\( \\frac{a^2}{b+c} + \\frac{b^2}{c+a} + \\frac{c^2}{a+b} \\).`,
          `Note the denominators sum to \\( 2(a + b + c) \\), simplifying the lower bound to \\( \\frac{a + b + c}{2} \\).`,
          `Substitute \\( a + b + c = ${S} \\) and multiply by \\( ${kScale} \\) to get \\( ${ans} \\).`
        ]
      }));
    }
  }

  // Hard 15..28: [NSMO Camp] Fact 5 (Incenter-Excenter Lemma) & AI * AI_A = AB * AC
  const fact5Cfg = [
    [6, 10, 4], [8, 15, 5], [9, 14, 6], [10, 21, 7], [12, 15, 9], [14, 18, 7], [12, 20, 8],
    [15, 16, 10], [9, 20, 6], [16, 21, 12], [14, 25, 10], [18, 22, 9], [15, 28, 12], [20, 27, 15]
  ];
  for (let i = 0; i < 14; i++) {
    const [ab, ac, ai] = fact5Cfg[i];
    // AI * AI_A = AB * AC => II_A = AI_A - AI = (AB*AC)/AI - AI!
    const aiA = (ab * ac) / ai;
    const iiA = aiA - ai;
    const fig = {
      type: 'triangle',
      labels: ['B', 'C', 'A'],
      sides: ['BC', String(ac), String(ab)]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP10, domain: DOM10, difficulty: 'hard', subskill: 2,
      archetype: 'Incenter-Excenter Lemma (Fact 5) & Bisector Similarity',
      text: `[NSMO of KSA — Mawhiba IMO Camp] In \\( \\triangle ABC \\) shown, \\( AB = ${ab} \\) and \\( AC = ${ac} \\). Let \\( I \\) be the incenter and \\( I_A \\) be the \\( A \\)-excenter (both lying on the internal bisector of \\( \\angle BAC \\)). If \\( AI = ${ai} \\), find the exact distance \\( II_A \\) between the incenter and \\( A \\)-excenter.`,
      correctVal: String(iiA),
      distractors: [String(aiA), String(iiA + ai), String(Math.max(1, ab + ac - 2 * ai))],
      sol: `Because \\( \\angle IB I_A = \\angle IC I_A = 90^\\circ \\), \\( BICI_A \\) is cyclic with diameter \\( II_A \\) centered at the arc midpoint \\( M \\) (Fact 5). Moreover, \\( \\angle AIC = 90^\\circ + \\frac{B}{2} = \\angle ABI_A \\) and \\( \\angle IAC = \\angle BAI_A = \\frac{A}{2} \\), so \\( \\triangle AIC \\sim \\triangle ABI_A \\). Thus \\( AI \\cdot AI_A = AB \\cdot AC = ${ab} \\cdot ${ac} = ${ab * ac} \\implies AI_A = \\frac{${ab * ac}}{${ai}} = ${aiA} \\). Since \\( A, I, I_A \\) are collinear in that order, \\( II_A = AI_A - AI = ${aiA} - ${ai} = ${iiA} \\).`,
      hints: [
        `Prove \\( \\triangle AIC \\sim \\triangle ABI_A \\) using \\( \\angle IAC = \\angle BAI_A = A/2 \\) and \\( \\angle AIC = 90^\\circ + B/2 = \\angle ABI_A \\).`,
        `Deduce \\( AI \\cdot AI_A = AB \\cdot AC \\), giving \\( AI_A = \\frac{${ab} \\times ${ac}}{${ai}} = ${aiA} \\).`,
        `Subtract \\( AI = ${ai} \\) along ray \\( AI_A \\) to obtain \\( II_A = ${aiA} - ${ai} = ${iiA} \\).`
      ],
      fig
    }));
  }

  // Hard 29..40: [NSMO Camp] Turán's Theorem K_{r+1}-Free Extremal Graph Edges
  for (let i = 0; i < 12; i++) {
    const r = (i < 6) ? 3 : 4; // K_4-free (3 parts) or K_5-free (4 parts)
    const q = (i % 6) + 3;     // 3..8 vertices per part
    const n = r * q;
    const ans = comb(r, 2) * q * q;
    const fig = {
      type: 'network_graph',
      title: `Turán Graph T(${n}, ${r}) — K_${r + 1}-Free Extremal`,
      directed: false,
      nodes: [
        { id: 'P1', label: `V₁ (${q})`, x: 75, y: 75, highlight: true },
        { id: 'P2', label: `V₂ (${q})`, x: 275, y: 75, highlight: true },
        { id: 'P3', label: `V₃ (${q})`, x: 175, y: 185, highlight: true }
      ],
      edges: [
        { from: 'P1', to: 'P2', label: `${q}²` },
        { from: 'P2', to: 'P3', label: `${q}²` },
        { from: 'P3', to: 'P1', label: `${q}²` }
      ]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP10, domain: DOM10, difficulty: 'hard', subskill: 3,
      archetype: 'Turán Extremal Clique-Free Graph Theorem',
      text: `[NSMO of KSA — Mawhiba IMO Camp] What is the **maximum** number of edges in a simple graph on \\( n = ${n} \\) vertices that contains no complete subgraph \\( K_{${r + 1}} \\) (illustrated by the balanced \\( ${r} \\)-partite Turán graph)?`,
      correctVal: String(ans),
      distractors: [String(comb(n, 2) - q), String(Math.floor((n * n) / 4)), String(ans - q)],
      sol: `By Turán's Theorem, the unique extremal \\( K_{${r + 1}} \\)-free graph on \\( n = ${n} \\) vertices is the balanced complete \\( ${r} \\)-partite Turán graph \\( T(${n}, ${r}) \\), which partitions the \\( ${n} \\) vertices into \\( ${r} \\) independent parts of size \\( ${q} \\) each. Every pair of parts contributes \\( ${q}^2 \\) edges, giving \\( \\binom{${r}}{2} \\cdot ${q}^2 = ${comb(r, 2)} \\cdot ${q * q} = ${ans} \\) edges.`,
      hints: [
        `Apply Turán's Theorem: to avoid \\( K_{${r + 1}} \\), partition the \\( ${n} \\) vertices into \\( ${r} \\) equal independent parts of size \\( ${q} \\).`,
        `Connect every pair of vertices lying in different parts.`,
        `Count edges across all \\( \\binom{${r}}{2} \\) pairs of parts: \\( ${comb(r, 2)} \\times ${q}^2 = ${ans} \\).`
      ],
      fig
    }));
  }

  // =========================================================================
  // CHAPTER 11: ol-kaust-kmc-qualifier (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM11 = 'KAUST Mathematics Competition: Regional Qualifier';
  const TOP11 = 'ol-kaust-kmc-qualifier';

  // Easy 1..14: [KAUST KMC] Square-Interval Floor Radical Sum sum_{k=1}^{m^2 - 1} floor(sqrt(k))
  for (let i = 0; i < 14; i++) {
    const m = i + 4; // 4..17
    const N = m * m - 1;
    const ans = ((m - 1) * m * (4 * m + 1)) / 6;
    const fig = (i < 12) ? {
      type: 'fn',
      title: `Step Grouping Along y = sqrt(x) up to x = ${N}`,
      fns: [{ fn: 'sqrt(x)', label: 'y = sqrt(x)' }],
      xrange: [0, m * m],
      yrange: [0, m + 1]
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP11, domain: DOM11, difficulty: 'easy', subskill: 1,
      archetype: 'KAUST KMC Square-Block Floor Summation',
      text: `[KAUST KMC — Regional Qualifier] By grouping consecutive perfect-square intervals along \\( y = \\sqrt{x} \\)${fig ? ' shown in the plot' : ''}, compute the exact value of \\[ \\sum_{k=1}^{${N}} \\lfloor \\sqrt{k} \\rfloor. \\]`,
      correctVal: String(ans),
      distractors: [String(ans + m), String(((m - 1) * m * (2 * m - 1)) / 6), String(ans - (m - 1))],
      sol: `For each integer \\( j \\in \\{1, 2, \\dots, ${m - 1}\\} \\), \\( \\lfloor \\sqrt{k} \\rfloor = j \\) holds on \\( j^2 \\le k \\le (j+1)^2 - 1 \\), which contains \\( 2j + 1 \\) integers. Thus \\[ \\sum_{k=1}^{${N}} \\lfloor \\sqrt{k} \\rfloor = \\sum_{j=1}^{${m - 1}} j(2j + 1) = \\frac{(${m - 1})(${m})(4\\cdot ${m} + 1)}{6} = ${ans}. \\]`,
      hints: [
        `Partition \\( \\{1, \\dots, ${N}\\} \\) into blocks \\( [j^2,\\; (j+1)^2 - 1] \\) for \\( j = 1, \\dots, ${m - 1} \\).`,
        `Count integers in block \\( j \\): \\( ((j+1)^2 - 1) - j^2 + 1 = 2j + 1 \\), each contributing \\( j \\).`,
        `Sum \\( \\sum_{j=1}^{${m - 1}} (2j^2 + j) = ${ans} \\).`
      ],
      fig
    }));
  }

  // Easy 15..28: [KAUST KMC] Pick's Theorem on Lattice Right Triangles
  const pickTriCfg = [
    [6, 8], [8, 12], [9, 12], [10, 15], [12, 16], [10, 24], [14, 21],
    [15, 20], [16, 24], [18, 24], [12, 30], [20, 25], [21, 28], [24, 32]
  ];
  for (let i = 0; i < 14; i++) {
    const [W, H] = pickTriCfg[i];
    const area = (W * H) / 2;
    const B = W + H + gcd(W, H);
    const I = area - B / 2 + 1;
    const fig = {
      type: 'polygon',
      vertices: [[0, 0], [W, 0], [0, H]],
      labels: ['(0,0)', `(${W},0)`, `(0,${H})`]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP11, domain: DOM11, difficulty: 'easy', subskill: 2,
      archetype: 'KAUST KMC Pick Theorem Interior Lattice Count',
      text: `[KAUST KMC — Regional Qualifier] Consider the lattice triangle with vertices \\( (0, 0),\\; (${W}, 0),\\; (0, ${H}) \\) shown on the coordinate plane. Using Pick's Theorem, how many integer lattice points lie **strictly inside** this triangle?`,
      correctVal: String(I),
      distractors: [String(I + gcd(W, H)), String(area - (W + H) / 2), String(I - 1)],
      sol: `The triangle has area \\( A = \\frac{1}{2}(${W})(${H}) = ${area} \\). On the three boundary segments, there are \\( ${W} + ${H} + \\gcd(${W}, ${H}) = ${B} \\) boundary lattice points. By Pick's Theorem \\( A = I + \\frac{B}{2} - 1 \\), \\[ I = ${area} - \\frac{${B}}{2} + 1 = ${I}. \\]`,
      hints: [
        `Compute the triangle's area \\( A = \\frac{1}{2}(${W})(${H}) = ${area} \\).`,
        `Count boundary lattice points: \\( B = ${W} + ${H} + \\gcd(${W}, ${H}) = ${B} \\) (the hypotenuse has \\( \\gcd(${W}, ${H}) + 1 \\) points including endpoints).`,
        `Apply Pick's Theorem \\( I = A - \\frac{B}{2} + 1 = ${I} \\).`
      ],
      fig
    }));
  }

  // Easy 29..40: [KAUST KMC] Polynomial Quadratic Remainder R(x) = r*x + s
  for (let i = 0; i < 12; i++) {
    const a = (i % 4) + 2;      // 2..5
    const b = a + Math.floor(i / 4) + 2; // distinct > a
    const r = 2 * i + 3;
    const s = -i - 4;
    const pa = r * a + s;
    const pb = r * b + s;
    const rAt1 = r + s;
    items.push(makeItem({
      idx: idx++, topicId: TOP11, domain: DOM11, difficulty: 'easy', subskill: 3,
      archetype: 'Polynomial Remainder Linear Interpolation',
      text: `[KAUST KMC — Regional Qualifier] A polynomial \\( P(x) \\) leaves remainder \\( ${pa} \\) when divided by \\( x - ${a} \\), and leaves remainder \\( ${pb} \\) when divided by \\( x - ${b} \\). Let \\( R(x) \\) be the remainder when \\( P(x) \\) is divided by \\( (x - ${a})(x - ${b}) \\). Find \\( R(1) \\).`,
      correctVal: String(rAt1),
      distractors: [String(r - s), String(pa - pb), String(rAt1 + a)],
      sol: `Since \\( \\deg(x - ${a})(x - ${b}) = 2 \\), the remainder has linear form \\( R(x) = rx + s \\) with \\( R(${a}) = P(${a}) = ${pa} \\) and \\( R(${b}) = P(${b}) = ${pb} \\). Solving gives slope \\( r = \\frac{${pb} - (${pa})}{${b} - ${a}} = ${r} \\) and \\( s = ${pa} - ${r}(${a}) = ${s} \\). Evaluating at \\( x = 1 \\) gives \\( R(1) = ${r} + (${s}) = ${rAt1} \\).`,
      hints: [
        `Write \\( P(x) = (x - ${a})(x - ${b})Q(x) + rx + s \\) so \\( R(x) = rx + s \\) has degree \\( \\le 1 \\).`,
        `Substitute \\( x = ${a} \\) and \\( x = ${b} \\) using the Remainder Theorem: \\( ${a}r + s = ${pa} \\) and \\( ${b}r + s = ${pb} \\).`,
        `Find \\( r = ${r},\\; s = ${s} \\), then evaluate \\( R(1) = r + s = ${rAt1} \\).`
      ]
    }));
  }

  // Medium 1..14: [KAUST KMC] Monic Auxiliary Polynomial Difference Method
  const fact = (n) => { let r = 1; for (let k = 2; k <= n; k++) r *= k; return r; };
  for (let i = 0; i < 14; i++) {
    const d = (i % 3) + 3; // degree 3, 4, or 5
    const c = Math.floor(i / 3) + 2; // 2..6
    const xEval = d + 1 + (i % 2); // d + 1 or d + 2
    // P(x) monic of degree d with P(k) = c * k for k = 1, 2, ..., d:
    // P(x) - c*x = (x - 1)(x - 2)...(x - d)
    let prod = 1;
    for (let k = 1; k <= d; k++) prod *= (xEval - k);
    const ans = prod + c * xEval;
    items.push(makeItem({
      idx: idx++, topicId: TOP11, domain: DOM11, difficulty: 'medium', subskill: 1,
      archetype: 'KAUST KMC Auxiliary Polynomial Construction',
      text: `[KAUST KMC — Regional Qualifier] Let \\( P(x) \\) be a **monic** polynomial of degree \\( ${d} \\) such that \\( P(k) = ${c}k \\) for every integer \\( k \\in \\{1, 2, \\dots, ${d}\\} \\). Find the exact value of \\( P(${xEval}) \\) (note the classic linear-extrapolation trap \\( ${c * xEval} \\)!).`,
      correctVal: String(ans),
      distractors: [String(c * xEval), String(ans - c * xEval), String(fact(d) + c * d)],
      sol: `Define the auxiliary polynomial \\( Q(x) = P(x) - ${c}x \\). Since \\( P \\) is monic of degree \\( ${d} \\ge 3 \\), \\( Q(x) \\) is also monic of degree \\( ${d} \\) and vanishes at \\( 1, 2, \\dots, ${d} \\). By the Factor Theorem, \\[ P(x) - ${c}x = \\prod_{k=1}^{${d}} (x - k). \\] Substituting \\( x = ${xEval} \\) yields \\( P(${xEval}) = ${prod} + ${c}(${xEval}) = ${ans} \\).`,
      hints: [
        `Do not extrapolate \\( P(x) = ${c}x \\) — \\( P \\) is monic of degree \\( ${d} \\)!`,
        `Construct \\( Q(x) = P(x) - ${c}x \\), which is monic of degree \\( ${d} \\) with roots \\( 1, 2, \\dots, ${d} \\).`,
        `Evaluate \\( P(${xEval}) = \\prod_{k=1}^{${d}}(${xEval} - k) + ${c}(${xEval}) = ${ans} \\).`
      ]
    }));
  }

  // Medium 15..28: [KAUST KMC] Blocked-Hub Lattice Path Complement Counting
  const gridBlockCfg = [
    [4, 4, 2, 2], [5, 4, 2, 2], [5, 5, 2, 3], [6, 4, 3, 2], [6, 5, 3, 2], [6, 6, 3, 3], [5, 3, 2, 1],
    [7, 4, 3, 2], [6, 4, 2, 2], [5, 5, 3, 1], [7, 3, 4, 1], [6, 5, 2, 3], [8, 3, 4, 2], [7, 5, 3, 3]
  ];
  for (let i = 0; i < 14; i++) {
    const [m, n, a, b] = gridBlockCfg[i];
    const total = comb(m + n, m);
    const bad = comb(a + b, a) * comb((m - a) + (n - b), m - a);
    const ans = total - bad;
    items.push(makeItem({
      idx: idx++, topicId: TOP11, domain: DOM11, difficulty: 'medium', subskill: 2,
      archetype: 'KAUST KMC Blocked-Lattice Path Counting',
      text: `[KAUST KMC — Regional Qualifier] On the integer coordinate grid, an autonomous rover travels from \\( (0, 0) \\) to \\( (${m}, ${n}) \\) moving only one unit East \\( (+1, 0) \\) or one unit North \\( (0, +1) \\) per step. Intersection \\( (${a}, ${b}) \\) is closed for maintenance. How many valid shortest paths avoid \\( (${a}, ${b}) \\)?`,
      correctVal: String(ans),
      distractors: [String(total), String(bad), String(total - comb(a + b, a))],
      sol: `Without restrictions there are \\( \\binom{${m} + ${n}}{${m}} = ${total} \\) shortest paths. Any path passing through \\( (${a}, ${b}) \\) splits uniquely into a prefix from \\( (0,0) \\) to \\( (${a},${b}) \\) and a suffix from \\( (${a},${b}) \\) to \\( (${m},${n}) \\), giving \\( \\binom{${a + b}}{${a}}\\binom{${(m - a) + (n - b)}}{${m - a}} = ${bad} \\) blocked paths. Subtracting gives \\( ${total} - ${bad} = ${ans} \\).`,
      hints: [
        `Count unrestricted shortest paths from \\( (0,0) \\) to \\( (${m},${n}) \\): \\( \\binom{${m + n}}{${m}} = ${total} \\).`,
        `Count paths forced through \\( (${a},${b}) \\): \\( \\binom{${a + b}}{${a}} \\times \\binom{${(m - a) + (n - b)}}{${m - a}} = ${bad} \\).`,
        `Subtract \\( ${total} - ${bad} = ${ans} \\).`
      ]
    }));
  }

  // Medium 29..40: [KAUST KMC] Shoelace Area of Lattice Quadrilaterals
  for (let i = 0; i < 12; i++) {
    const x1 = (i % 3) + 4;
    const y1 = 1;
    const x2 = x1 + 2;
    const y2 = (i % 4) + 5;
    const x3 = 1;
    const y3 = y2 + 1;
    // Convex quad (0,0) -> (x1, y1) -> (x2, y2) -> (x3, y3)
    const twoA = Math.abs((0 * y1 - 0 * x1) + (x1 * y2 - y1 * x2) + (x2 * y3 - y2 * x3) + (x3 * 0 - y3 * 0));
    const corr = fracTex(twoA, 2);
    const fig = {
      type: 'polygon',
      vertices: [[0, 0], [x1, y1], [x2, y2], [x3, y3]],
      labels: ['(0,0)', `(${x1},${y1})`, `(${x2},${y2})`, `(${x3},${y3})`]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP11, domain: DOM11, difficulty: 'medium', subskill: 3,
      archetype: 'KAUST KMC Shoelace Lattice Polygon Area',
      text: `[KAUST KMC — Regional Qualifier] Find the exact area of the convex lattice quadrilateral shown with vertices \\( O(0, 0),\\; A(${x1}, ${y1}),\\; B(${x2}, ${y2}),\\; C(${x3}, ${y3}) \\) in counterclockwise order.`,
      correctVal: corr,
      distractors: [fracTex(twoA + 2, 2), String(twoA), fracTex(Math.max(2, twoA - 4), 2)],
      sol: `Applying the Shoelace Theorem around \\( (0,0) \\to (${x1},${y1}) \\to (${x2},${y2}) \\to (${x3},${y3}) \\to (0,0) \\), \\[ 2[OABC] = |(${x1}\\cdot ${y2} - ${y1}\\cdot ${x2}) + (${x2}\\cdot ${y3} - ${y2}\\cdot ${x3})| = |${x1 * y2 - y1 * x2} + ${x2 * y3 - y2 * x3}| = ${twoA}. \\] Dividing by \\( 2 \\) gives \\( [OABC] = ${corr} \\).`,
      hints: [
        `Apply the Shoelace determinant sum \\( 2[OABC] = |\\sum (x_i y_{i+1} - y_i x_{i+1})| \\).`,
        `Because \\( O = (0,0) \\), only the two cross-terms \\( (x_A y_B - y_A x_B) + (x_B y_C - y_B x_C) \\) are non-zero.`,
        `Divide \\( ${twoA} \\) by \\( 2 \\) to obtain \\( ${corr} \\).`
      ],
      fig
    }));
  }

  // Hard 1..14: [KAUST KMC] Reciprocal Polynomial Interpolation P(k) = c / k for k = 1..d+1
  for (let i = 0; i < 14; i++) {
    const d = (i % 4) + 2; // degree 2, 3, 4, 5
    const xEval = d + 2 + Math.floor(i / 4); // d+2, d+3, d+4, d+5
    const c = xEval * fact(d + 1); // ensures exact integer P(xEval)!
    // Q(x) = x*P(x) - c has degree d+1, roots 1..d+1, and Q(0) = -c
    // Since prod_{k=1}^{d+1} (0 - k) = (-1)^{d+1} (d+1)!, leading coeff of Q is (-c) / ((-1)^{d+1}(d+1)!) = (-1)^d c / (d+1)!
    let prod = 1;
    for (let k = 1; k <= d + 1; k++) prod *= (xEval - k);
    const qEval = ((d % 2 === 0) ? 1 : -1) * (c / fact(d + 1)) * prod;
    const pEval = (qEval + c) / xEval; // exact integer!
    items.push(makeItem({
      idx: idx++, topicId: TOP11, domain: DOM11, difficulty: 'hard', subskill: 1,
      archetype: 'KAUST KMC Clearing-Denominators Polynomial Interpolation',
      text: `[KAUST KMC — Regional Qualifier] Let \\( P(x) \\) be a polynomial of degree **at most** \\( ${d} \\) satisfying \\[ P(k) = \\frac{${c}}{k} \\quad \\text{for } k = 1, 2, \\dots, ${d + 1}. \\] Compute the exact value of \\( P(${xEval}) \\).`,
      correctVal: String(pEval),
      distractors: [String(c / xEval), String(Math.abs(pEval) + xEval), String((c / xEval) + prod)],
      sol: `Clear denominators by setting \\( Q(x) = x P(x) - ${c} \\), which has degree at most \\( ${d + 1} \\) and roots \\( 1, 2, \\dots, ${d + 1} \\). Thus \\( Q(x) = A \\prod_{k=1}^{${d + 1}} (x - k) \\). Evaluating at the hidden anchor \\( x = 0 \\) gives \\( -${c} = A(-1)^{${d + 1}} (${d + 1})! \\implies A = ${((d % 2 === 0) ? 1 : -1) * (c / fact(d + 1))} \\). At \\( x = ${xEval} \\), \\( ${xEval} P(${xEval}) - ${c} = ${qEval} \\implies P(${xEval}) = ${pEval} \\).`,
      hints: [
        `Clear denominators to form the polynomial \\( Q(x) = x P(x) - ${c} \\) of degree \\( \\le ${d + 1} \\) with roots \\( 1, \\dots, ${d + 1} \\).`,
        `Find the leading coefficient \\( A \\) of \\( Q(x) = A\\prod_{k=1}^{${d + 1}}(x - k) \\) by plugging in \\( x = 0 \\), where \\( 0 \\cdot P(0) - ${c} = -${c} \\)!`,
        `Evaluate \\( Q(${xEval}) \\) and solve \\( P(${xEval}) = \\frac{Q(${xEval}) + ${c}}{${xEval}} = ${pEval} \\).`
      ]
    }));
  }

  // Hard 15..28: [KAUST KMC] Hermite's Floor Identity sum_{j=0}^{m-1} floor(x + j/m) = floor(m*x)
  for (let i = 0; i < 14; i++) {
    const m = i + 6;       // 6..19 terms
    const num = 3 * i + 7; // x = num / den
    const den = (i % 4) + 3;
    const ans = Math.floor((m * num) / den);
    items.push(makeItem({
      idx: idx++, topicId: TOP11, domain: DOM11, difficulty: 'hard', subskill: 2,
      archetype: 'Hermite Floor Identity Evaluation',
      text: `[KAUST KMC — Regional Qualifier] Using Hermite's Floor Identity, compute the exact value of \\[ \\sum_{j=0}^{${m - 1}} \\left\\lfloor \\frac{${num}}{${den}} + \\frac{j}{${m}} \\right\\rfloor. \\]`,
      correctVal: String(ans),
      distractors: [String(m * Math.floor(num / den)), String(ans + 1), String(Math.max(0, ans - 2))],
      sol: `By Hermite's Identity, for every real \\( x \\) and positive integer \\( m \\), \\[ \\sum_{j=0}^{m-1} \\left\\lfloor x + \\frac{j}{m} \\right\\rfloor = \\lfloor m x \\rfloor. \\] Setting \\( x = \\frac{${num}}{${den}} \\) and \\( m = ${m} \\) gives \\( \\left\\lfloor \\frac{${m} \\cdot ${num}}{${den}} \\right\\rfloor = \\left\\lfloor \\frac{${m * num}}{${den}} \\right\\rfloor = ${ans} \\).`,
      hints: [
        `Recall Hermite's Identity \\( \\sum_{j=0}^{m-1} \\lfloor x + j/m \\rfloor = \\lfloor mx \\rfloor \\).`,
        `Identify \\( x = \\frac{${num}}{${den}} \\) and \\( m = ${m} \\).`,
        `Compute \\( \\left\\lfloor \\frac{${m * num}}{${den}} \\right\\rfloor = ${ans} \\).`
      ]
    }));
  }

  // Hard 29..40: [KAUST KMC] Broken-Stick Bounded-Piece Geometric Probability ((3c - L)/L)^2
  const stickCfg = [
    [12, 6], [12, 5], [15, 6], [15, 7], [18, 7], [18, 8],
    [20, 8], [20, 9], [24, 9], [24, 10], [24, 11], [30, 12]
  ];
  for (let i = 0; i < 12; i++) {
    const [L, c] = stickCfg[i]; // L/3 < c <= L/2
    const num = (3 * c - L) * (3 * c - L);
    const den = L * L;
    const corr = fracTex(num, den);
    const fig = {
      type: 'fn',
      title: `Broken-Stick Cut Simplex on [0, ${L}]²`,
      fns: [
        { fn: 'x', label: 'y = x' },
        { fn: `x + ${c}`, label: `y - x = ${c}` }
      ],
      xrange: [0, L],
      yrange: [0, L]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP11, domain: DOM11, difficulty: 'hard', subskill: 3,
      archetype: 'KAUST KMC Broken-Stick Bounded-Segment Probability',
      text: `[KAUST KMC — Regional Qualifier] A rod of length \\( ${L} \\) is broken at two points \\( X \\) and \\( Y \\) chosen independently and uniformly at random along \\( [0, ${L}] \\) (represented on the coordinate square). What is the exact probability that **all three** resulting pieces have length at most \\( ${c} \\)?`,
      correctVal: corr,
      distractors: [fracTex(3 * c - L, L), fracTex(num, 2 * den), fracTex(c * c, den)],
      sol: `By symmetry of \\( X < Y \\) and \\( Y < X \\), double the favorable area inside \\( 0 \\le X \\le Y \\le ${L} \\). The three pieces have lengths \\( X \\le ${c} \\), \\( Y - X \\le ${c} \\), and \\( ${L} - Y \\le ${c} \\iff Y \\ge ${L - c} \\). Since \\( \\frac{${L}}{3} < ${c} \\le \\frac{${L}}{2} \\), these inequalities cut out a right isosceles triangle with vertices \\( (${L - 2 * c}, ${L - c}) \\), \\( (${c}, ${L - c}) \\), and \\( (${c}, ${2 * c}) \\) of leg \\( 3(${c}) - ${L} = ${3 * c - L} \\) and area \\( \\frac{1}{2}(${3 * c - L})^2 \\). Doubling for both orderings and dividing by \\( ${L}^2 \\) gives \\( \\left(\\frac{${3 * c - L}}{${L}}\\right)^2 = ${corr} \\).`,
      hints: [
        `Assume \\( X < Y \\) (probability \\( \\frac{1}{2} \\), area \\( \\frac{1}{2}${L}^2 \\)) so the three pieces are \\( X,\\; Y - X,\\; ${L} - Y \\).`,
        `Graph \\( X \\le ${c},\\; Y \\le X + ${c},\\; Y \\ge ${L - c} \\): they form a right triangle of leg length \\( ${c} - (${L - 2 * c}) = ${3 * c - L} \\).`,
        `Double the triangle area \\( \\frac{1}{2}(${3 * c - L})^2 \\) and divide by \\( ${L}^2 \\) to obtain \\( ${corr} \\).`
      ],
      fig
    }));
  }

  // =========================================================================
  // CHAPTER 12: ol-kaust-finals-academy (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM12 = 'KAUST Campus Finals & Academy Advanced Synthesis';
  const TOP12 = 'ol-kaust-finals-academy';

  // Easy 1..14: [KAUST Finals] Cyclotomic Roots-of-Unity Product prod_{k=1}^{n-1} (z0 - zeta^k)
  const cycCfg = [
    [5, 2], [6, 2], [7, 2], [8, 2], [9, 2], [4, 3], [5, 3],
    [6, 3], [5, -1], [7, -1], [6, -2], [5, -2], [4, 4], [5, 4]
  ];
  for (let i = 0; i < 14; i++) {
    const [n, z0] = cycCfg[i];
    // (z^n - 1)/(z - 1) = 1 + z + ... + z^{n-1} evaluated at z = z0
    let ans = 0, pwr = 1;
    for (let j = 0; j < n; j++) { ans += pwr; pwr *= z0; }
    const pts = [];
    for (let k = 0; k < n; k++) {
      const ang = (2 * Math.PI * k) / n;
      pts.push({ re: Math.round(Math.cos(ang) * 100) / 100, im: Math.round(Math.sin(ang) * 100) / 100, label: k === 0 ? '1' : (k === 1 ? 'ζ' : '') });
    }
    const fig = {
      type: 'argand',
      title: `${n}th Roots of Unity on Unit Circle |z| = 1`,
      circles: [{ x: 0, y: 0, r: 1, label: '|z|=1' }],
      points: pts,
      polygon: true
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP12, domain: DOM12, difficulty: 'easy', subskill: 1,
      archetype: 'KAUST Cyclotomic Roots-of-Unity Product',
      text: `[KAUST Thuwal Finals] Let \\( \\zeta = e^{2\\pi i / ${n}} \\) be a primitive \\( ${n} \\)-th root of unity (plotted on the Argand diagram). Evaluate the exact complex product \\[ \\prod_{k=1}^{${n - 1}} \\left(${z0} - \\zeta^k\\right). \\]`,
      correctVal: String(ans),
      distractors: [String(Math.pow(z0, n) - 1), String(ans + 1), String(Math.pow(z0, n - 1) + 1)],
      sol: `Because \\( 1, \\zeta, \\zeta^2, \\dots, \\zeta^{${n - 1}} \\) are all \\( ${n} \\) roots of \\( z^{${n}} - 1 \\), dividing out \\( (z - 1) \\) yields the cyclotomic identity \\[ \\prod_{k=1}^{${n - 1}} (z - \\zeta^k) = \\frac{z^{${n}} - 1}{z - 1} = 1 + z + \\dots + z^{${n - 1}}. \\] Substituting \\( z = ${z0} \\) gives \\( ${ans} \\).`,
      hints: [
        `Factor \\( z^{${n}} - 1 = (z - 1)\\prod_{k=1}^{${n - 1}}(z - \\zeta^k) \\).`,
        `Identify \\( \\prod_{k=1}^{${n - 1}}(z - \\zeta^k) = 1 + z + z^2 + \\dots + z^{${n - 1}} \\).`,
        `Evaluate at \\( z = ${z0} \\) to obtain \\( ${ans} \\).`
      ],
      fig
    }));
  }

  // Easy 15..28: [KAUST Team Relay] 3-Seat Campus Finals Relay T1 -> T2 -> T3
  for (let i = 0; i < 14; i++) {
    const k = i + 3;             // Seat 1: x + 1/x = k => T1 = x^2 + 1/x^2 = k^2 - 2
    const T1 = k * k - 2;
    const T2 = countDivisors(T1); // Seat 2: number of positive divisors of T1
    const T3 = comb(T2 + 3, 2);   // Seat 3: number of pairs chosen from T2 + 3 points
    items.push(makeItem({
      idx: idx++, topicId: TOP12, domain: DOM12, difficulty: 'easy', subskill: 2,
      archetype: 'KAUST Three-Seat Team Relay (T₁ → T₂ → T₃)',
      text: `[KAUST Thuwal Finals — Team Relay] In a three-seat KAUST relay:\n- **Seat 1:** Given \\( x + \\frac{1}{x} = ${k} \\), compute \\( T_1 = x^2 + \\frac{1}{x^2} \\).\n- **Seat 2:** Receive \\( T_1 \\) and compute \\( T_2 = \\tau(T_1) \\), the number of positive divisors of \\( T_1 \\).\n- **Seat 3:** Receive \\( T_2 \\) and compute the final answer \\( T_3 = \\binom{T_2 + 3}{2} \\).\nWhat integer \\( T_3 \\) does Seat 3 submit?`,
      correctVal: String(T3),
      distractors: [String(comb(T2 + 2, 2)), String(comb(T2 + 4, 2)), String(T1 + T2)],
      sol: `**Seat 1:** \\( T_1 = ${k}^2 - 2 = ${T1} \\). **Seat 2:** Factoring \\( T_1 = ${T1} \\) gives \\( T_2 = \\tau(${T1}) = ${T2} \\) positive divisors. **Seat 3:** \\( T_3 = \\binom{${T2} + 3}{2} = \\binom{${T2 + 3}}{2} = ${T3} \\).`,
      hints: [
        `Solve Seat 1 first: \\( T_1 = ${k}^2 - 2 = ${T1} \\).`,
        `Pass \\( T_1 = ${T1} \\) to Seat 2 and prime-factorize \\( ${T1} \\) to find \\( T_2 = \\tau(${T1}) = ${T2} \\).`,
        `Evaluate Seat 3: \\( \\binom{${T2 + 3}}{2} = ${T3} \\).`
      ]
    }));
  }

  // Easy 29..40: [KAUST Academy] Bounded Integer Compositions via Generating Functions
  for (let i = 0; i < 12; i++) {
    const m = 3;                 // 3 dice / bounded parts in {1..k}
    const k = (i % 3) + 4;       // max part 4, 5, 6
    const N = k + 3 + Math.floor(i / 2); // sum N
    // Exact coefficient of x^N in (x + x^2 + ... + x^k)^3
    let ways = 0;
    for (let x1 = 1; x1 <= k; x1++) {
      for (let x2 = 1; x2 <= k; x2++) {
        const x3 = N - x1 - x2;
        if (x3 >= 1 && x3 <= k) ways++;
      }
    }
    items.push(makeItem({
      idx: idx++, topicId: TOP12, domain: DOM12, difficulty: 'easy', subskill: 3,
      archetype: 'KAUST Generating Function Bounded Compositions',
      text: `[KAUST Academy] Using the generating function \\( (x + x^2 + \\dots + x^{${k}})^3 = x^3\\left(\\frac{1 - x^{${k}}}{1 - x}\\right)^3 \\), find the number of ordered triples \\( (a, b, c) \\) of integers with \\( 1 \\le a, b, c \\le ${k} \\) such that \\( a + b + c = ${N} \\).`,
      correctVal: String(ways),
      distractors: [String(comb(N - 1, 2)), String(ways + 3), String(Math.max(1, ways - 3))],
      sol: `Expanding \\( x^3(1 - x^{${k}})^3 (1 - x)^{-3} = x^3(1 - 3x^{${k}} + 3x^{${2 * k}} - x^{${3 * k}})\\sum_{j \\ge 0}\\binom{j + 2}{2}x^j \\), extracting \\( [x^{${N}}] \\) gives \\( \\binom{${N - 1}}{2} ${N - 1 - k >= 2 ? `- 3\\binom{${N - 1 - k}}{2}` : ''} = ${ways} \\).`,
      hints: [
        `Factor \\( (x + \\dots + x^{${k}})^3 = x^3(1 - x^{${k}})^3 (1 - x)^{-3} \\).`,
        `Recall \\( [x^r](1 - x)^{-3} = \\binom{r + 2}{2} \\) for \\( r \\ge 0 \\).`,
        `Subtract the upper-bound violation terms from \\( \\binom{${N - 1}}{2} \\) to get \\( ${ways} \\).`
      ]
    }));
  }

  // Medium 1..14: [KAUST Academy] Roots-of-Unity Filter mod 3 Binomial Sums
  for (let i = 0; i < 14; i++) {
    const n = Math.floor(i / 2) + 6; // 6..12
    const rem = i % 3;               // residue 0, 1, or 2 mod 3
    let sum = 0;
    for (let j = 0; j <= n; j++) {
      if (j % 3 === rem) sum += comb(n, j);
    }
    const fig = (i < 12) ? {
      type: 'argand',
      title: 'Cube Roots of Unity Filter {1, ω, ω²}',
      circles: [{ x: 0, y: 0, r: 1, label: '|z|=1' }],
      points: [
        { re: 1, im: 0, label: '1' },
        { re: -0.5, im: 0.87, label: 'ω' },
        { re: -0.5, im: -0.87, label: 'ω²' }
      ],
      polygon: true
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP12, domain: DOM12, difficulty: 'medium', subskill: 1,
      archetype: 'KAUST Academy Roots-of-Unity Filter',
      text: `[KAUST Academy] Applying the Roots-of-Unity Filter with \\( \\omega = e^{2\\pi i / 3} \\)${fig ? ' (shown on the unit circle)' : ''}, compute the exact stepped binomial sum \\[ \\sum_{\\substack{0 \\le j \\le ${n} \\\\ j \\equiv ${rem} \\pmod 3}} \\binom{${n}}{j}. \\]`,
      correctVal: String(sum),
      distractors: [String(Math.floor(Math.pow(2, n) / 3) + (sum === Math.floor(Math.pow(2, n) / 3) ? 2 : 0)), String(sum + 2), String(Math.pow(2, n - 2))],
      sol: `Let \\( P(x) = (1 + x)^{${n}} \\). By the Roots-of-Unity Filter, \\[ \\sum_{j \\equiv ${rem} \\pmod 3} \\binom{${n}}{j} = \\frac{1}{3}\\left(P(1) + \\omega^{-${rem}}P(\\omega) + \\omega^{-${2 * rem}}P(\\omega^2)\\right). \\] Using \\( 1 + \\omega = -\\omega^2 \\) and \\( 1 + \\omega^2 = -\\omega \\), the sum simplifies to \\( \\frac{1}{3}\\left(2^{${n}} + 2\\cos\\frac{(${n} - ${2 * rem})\\pi}{3}\\right) = ${sum} \\).`,
      hints: [
        `Average \\( \\omega^{-${rem}k}(1 + \\omega^k)^{${n}} \\) over \\( k = 0, 1, 2 \\) where \\( 1 + \\omega + \\omega^2 = 0 \\).`,
        `Replace \\( 1 + \\omega = -\\omega^2 = e^{i\\pi/3} \\) and \\( 1 + \\omega^2 = -\\omega = e^{-i\\pi/3} \\).`,
        `Evaluate \\( \\frac{1}{3}\\left(2^{${n}} + 2\\cos\\frac{(${n - 2 * rem})\\pi}{3}\\right) = ${sum} \\).`
      ],
      fig
    }));
  }

  // Medium 15..28: [KAUST Finals] 3D Lagrange Vector Identity ||u x v||^2 = ||u||^2 ||v||^2 - (u . v)^2
  for (let i = 0; i < 14; i++) {
    const normU = (i % 4) + 3;     // 3..6
    const normV = Math.floor(i / 3) + 4; // 4..8
    const dotUV = (i % 5) - 2;     // -2..2 (strictly smaller in abs value than normU*normV)
    const crossSq = normU * normU * normV * normV - dotUV * dotUV;
    items.push(makeItem({
      idx: idx++, topicId: TOP12, domain: DOM12, difficulty: 'medium', subskill: 2,
      archetype: 'KAUST 3D Vector Lagrange Identity',
      text: `[KAUST Thuwal Finals] Vectors \\( \\mathbf{u}, \\mathbf{v} \\in \\mathbb{R}^3 \\) satisfy \\( \\|\\mathbf{u}\\| = ${normU} \\), \\( \\|\\mathbf{v}\\| = ${normV} \\), and \\( \\mathbf{u} \\cdot \\mathbf{v} = ${dotUV} \\). Compute \\( \\|\\mathbf{u} \\times \\mathbf{v}\\|^2 \\) (equivalently \\( 4 \\) times the squared area of the triangle spanned by \\( \\mathbf{u} \\) and \\( \\mathbf{v} \\)).`,
      correctVal: String(crossSq),
      distractors: [String(normU * normU * normV * normV + dotUV * dotUV), String(normU * normV - Math.abs(dotUV)), String(normU * normU * normV * normV)],
      sol: `By Lagrange's 3D identity \\( \\|\\mathbf{u} \\times \\mathbf{v}\\|^2 + (\\mathbf{u} \\cdot \\mathbf{v})^2 = \\|\\mathbf{u}\\|^2 \\|\\mathbf{v}\\|^2 \\) (from \\( \\sin^2\\theta + \\cos^2\\theta = 1 \\)), \\[ \\|\\mathbf{u} \\times \\mathbf{v}\\|^2 = ${normU}^2 \\cdot ${normV}^2 - (${dotUV})^2 = ${normU * normU * normV * normV} - ${dotUV * dotUV} = ${crossSq}. \\]`,
      hints: [
        `Use Lagrange's identity \\( \\|\\mathbf{u} \\times \\mathbf{v}\\|^2 = \\|\\mathbf{u}\\|^2 \\|\\mathbf{v}\\|^2 - (\\mathbf{u} \\cdot \\mathbf{v})^2 \\).`,
        `Compute \\( \\|\\mathbf{u}\\|^2 \\|\\mathbf{v}\\|^2 = ${normU}^2 \\times ${normV}^2 = ${normU * normU * normV * normV} \\).`,
        `Subtract \\( (\\mathbf{u} \\cdot \\mathbf{v})^2 = ${dotUV * dotUV} \\) to get \\( ${crossSq} \\).`
      ]
    }));
  }

  // Medium 29..40: [KAUST Academy] 3D Tetrahedron Volume & De Gua Right-Corner Identity
  for (let i = 0; i < 12; i++) {
    const a = (i % 4) + 2;
    const b = (i % 3) + 3;
    const c = Math.floor(i / 2) + 4;
    // Orthogonal corner tetrahedron OABC with edges OA = 2a, OB = 2b, OC = 2c along x, y, z axes:
    // Volume V = (1/6)(2a)(2b)(2c) = 4abc / 3, OR ask 4*[ABC]^2 via De Gua [ABC]^2 = [OAB]^2 + [OBC]^2 + [OCA]^2!
    // With OA = 2a, OB = 2b, OC = 2c: [OAB] = 2ab, [OBC] = 2bc, [OCA] = 2ca, so [ABC]^2 = 4(a^2 b^2 + b^2 c^2 + c^2 a^2)!
    const areaSq = 4 * (a * a * b * b + b * b * c * c + c * c * a * a);
    const fig = {
      type: 'geometry_3d',
      solid: 'square_pyramid',
      title: 'Right-Corner Spatial Tetrahedron OABC',
      dims: [2 * a, 2 * b, 2 * c],
      labels: { base: `OA=${2 * a}, OB=${2 * b}`, h: `OC=${2 * c}` }
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP12, domain: DOM12, difficulty: 'medium', subskill: 3,
      archetype: 'De Gua 3D Right-Corner Tetrahedron Theorem',
      text: `[KAUST Academy] In three-dimensional Euclidean space (represented schematically), tetrahedron \\( OABC \\) has three mutually orthogonal edges meeting at \\( O \\) with lengths \\( OA = ${2 * a},\\; OB = ${2 * b},\\; OC = ${2 * c} \\). By De Gua's Theorem (the 3D Pythagorean Theorem), compute the exact **squared area** \\( [ABC]^2 \\) of the slant face \\( \\triangle ABC \\).`,
      correctVal: String(areaSq),
      distractors: [String(a * a * b * b + b * b * c * c + c * c * a * a), String(4 * (a * a + b * b + c * c)), String(areaSq / 2)],
      sol: `The three right-triangular coordinate faces have areas \\( [OAB] = \\frac{1}{2}(${2 * a})(${2 * b}) = ${2 * a * b} \\), \\( [OBC] = ${2 * b * c} \\), and \\( [OCA] = ${2 * c * a} \\). By De Gua's Theorem (or \\( \\frac{1}{4}\\|\\overrightarrow{AB} \\times \\overrightarrow{AC}\\|^2 \\)), \\[ [ABC]^2 = [OAB]^2 + [OBC]^2 + [OCA]^2 = (${2 * a * b})^2 + (${2 * b * c})^2 + (${2 * c * a})^2 = ${areaSq}. \\]`,
      hints: [
        `Calculate the areas of the three mutually orthogonal legs faces: \\( [OAB] = ${2 * a * b},\\; [OBC] = ${2 * b * c},\\; [OCA] = ${2 * c * a} \\).`,
        `Apply De Gua's Theorem \\( [ABC]^2 = [OAB]^2 + [OBC]^2 + [OCA]^2 \\) (verified directly via \\( \\frac{1}{2}\\overrightarrow{AB} \\times \\overrightarrow{AC} \\)).`,
        `Sum the three squares to obtain \\( ${areaSq} \\).`
      ],
      fig
    }));
  }

  // Hard 1..14: [KAUST Academy] Restricted Coin-Partition Generating Function [x^N] 1/((1-x^a)(1-x^b)(1-x^c))
  const coinTriples = [
    [1, 2, 5], [1, 2, 3], [1, 3, 5], [1, 2, 4]
  ];
  for (let i = 0; i < 14; i++) {
    const [a, b, c] = coinTriples[i % 4];
    const N = 10 + i; // 10..23
    const dp = new Array(N + 1).fill(0);
    dp[0] = 1;
    for (const coin of [a, b, c]) {
      for (let s = coin; s <= N; s++) dp[s] += dp[s - coin];
    }
    const ans = dp[N];
    items.push(makeItem({
      idx: idx++, topicId: TOP12, domain: DOM12, difficulty: 'hard', subskill: 1,
      archetype: 'KAUST Academy Partition Generating Function',
      text: `[KAUST Academy — Cambridge Summer Prep] Find the coefficient of \\( x^{${N}} \\) in the formal power series expansion of \\[ G(x) = \\frac{1}{(1 - x^{${a}})(1 - x^{${b}})(1 - x^{${c}})}, \\] i.e., the number of non-negative integer solutions \\( (u, v, w) \\) to \\( ${a}u + ${b}v + ${c}w = ${N} \\).`,
      correctVal: String(ans),
      distractors: [String(ans + 2), String(Math.max(1, ans - 2)), String(ans + 4)],
      sol: `Expanding each geometric factor \\( (1 - x^d)^{-1} = \\sum_{k \\ge 0} x^{kd} \\), \\( [x^{${N}}]G(x) \\) counts non-negative triples \\( (u, v, w) \\) with \\( ${a}u + ${b}v + ${c}w = ${N} \\). Case-splitting on \\( w = 0, 1, \\dots, \\lfloor ${N}/${c} \\rfloor \\) and summing \\( \\#\\{(u,v): ${a}u + ${b}v = ${N} - ${c}w\\} \\) yields exactly \\( ${ans} \\).`,
      hints: [
        `Interpret \\( [x^{${N}}]G(x) \\) as the number of non-negative integer solutions to \\( ${a}u + ${b}v + ${c}w = ${N} \\).`,
        `Condition on the largest denomination \\( w = 0, 1, \\dots, \\lfloor ${N}/${c} \\rfloor \\).`,
        `For each \\( w \\), count solutions to \\( ${a}u + ${b}v = ${N} - ${c}w \\) and sum to obtain \\( ${ans} \\).`
      ]
    }));
  }

  // Hard 15..28: [KAUST Grand Relay] Advanced 3-Seat Campus Finals Relay
  for (let i = 0; i < 14; i++) {
    // Seat 1: Cubic Vieta p_3 = r^3 + s^3 + t^3 for z^3 - e1 z^2 + e2 z - e3 = 0
    const e1 = (i % 4) + 3; // 3..6
    const e2 = (i % 3) + 2; // 2..4
    const e3 = (i % 5) + 1; // 1..5
    const T1 = e1 * e1 * e1 - 3 * e1 * e2 + 3 * e3; // always >= 27 - 36 + 3? Check min: e1=3,e2=4,e3=1 => 27 - 36 + 3 = -6! Let's take |T1| + 10 so T1 >= 10!
    const s1Val = Math.abs(T1) + 12;
    // Seat 2: Legendre v_2(s1Val!)
    const T2 = vpFactorial(s1Val, 2);
    // Seat 3: Circumradius or Euler totient + triangular number: phi(T2) + T2
    const T3 = totient(T2) + T2;
    items.push(makeItem({
      idx: idx++, topicId: TOP12, domain: DOM12, difficulty: 'hard', subskill: 2,
      archetype: 'KAUST Grand Finals Three-Seat Synthesis Relay',
      text: `[KAUST Thuwal Finals — Grand Relay] Three team members solve sequentially:\n- **Seat 1:** Let \\( r, s, t \\) be the roots of \\( z^3 - ${e1}z^2 + ${e2}z - ${e3} = 0 \\); pass \\( T_1 = |r^3 + s^3 + t^3| + 12 \\).\n- **Seat 2:** Receive \\( T_1 \\) and pass \\( T_2 = v_2(T_1!) \\), the exponent of \\( 2 \\) in \\( T_1! \\).\n- **Seat 3:** Receive \\( T_2 \\) and submit \\( T_3 = \\varphi(T_2) + T_2 \\), where \\( \\varphi \\) is Euler's totient function.\nWhat final integer \\( T_3 \\) does Seat 3 submit?`,
      correctVal: String(T3),
      distractors: [String(T2 + totient(T2 + 1)), String(2 * T2 - 1), String(T3 + 2)],
      sol: `**Seat 1:** By Newton's cubic sum, \\( r^3 + s^3 + t^3 = ${e1}^3 - 3(${e1})(${e2}) + 3(${e3}) = ${T1} \\), so \\( T_1 = |${T1}| + 12 = ${s1Val} \\). **Seat 2:** By Legendre's formula, \\( T_2 = v_2(${s1Val}!) = ${T2} \\). **Seat 3:** \\( T_3 = \\varphi(${T2}) + ${T2} = ${totient(T2)} + ${T2} = ${T3} \\).`,
      hints: [
        `Seat 1: Use \\( p_3 = e_1^3 - 3e_1 e_2 + 3e_3 = ${T1} \\), giving \\( T_1 = ${s1Val} \\).`,
        `Seat 2: Apply Legendre's formula \\( v_2(${s1Val}!) = \\sum_{k \\ge 1} \\lfloor ${s1Val}/2^k \\rfloor = ${T2} \\).`,
        `Seat 3: Compute \\( \\varphi(${T2}) = ${totient(T2)} \\) and add \\( ${T2} \\) to obtain \\( ${T3} \\).`
      ]
    }));
  }

  // Hard 29..40: [KAUST Academy] Linear-Algebraic Combinatorics over F_2 (Oddtown / Eventown / Twin Oddtown)
  for (let i = 0; i < 12; i++) {
    if (i < 6) {
      // Eventown with distinct subsets: max clubs in an n-citizen town where every club has EVEN size and every pairwise intersection is EVEN = 2^{floor(n/2)}!
      const n = i + 8; // 8..13
      const ans = Math.pow(2, Math.floor(n / 2));
      items.push(makeItem({
        idx: idx++, topicId: TOP12, domain: DOM12, difficulty: 'hard', subskill: 3,
        archetype: 'KAUST Linear-Algebraic Combinatorics over F₂ (Eventown)',
        text: `[KAUST Academy] A research institute has \\( ${n} \\) fellows. A collection of **distinct** committees \\( C_1, \\dots, C_m \\subseteq \\{1, \\dots, ${n}\\} \\) (possibly including the empty committee) is formed such that every committee \\( |C_i| \\) is **even**, and every pairwise intersection \\( |C_i \\cap C_j| \\) is **even**. What is the maximum possible number \\( m \\) of committees?`,
        correctVal: String(ans),
        distractors: [String(n), String(Math.pow(2, Math.ceil(n / 2) + (n % 2 === 0 ? 1 : 0))), String(Math.pow(2, n - 1))],
        sol: `Represent each committee by its incidence vector \\( \\mathbf{v}_i \\in \\mathbb{F}_2^{${n}} \\). The conditions state \\( \\mathbf{v}_i \\cdot \\mathbf{v}_j = 0 \\pmod 2 \\) for all \\( i, j \\), so \\( W = \\operatorname{span}(\\mathbf{v}_1, \\dots, \\mathbf{v}_m) \\) is a self-orthogonal subspace \\( W \\subseteq W^\\perp \\). By Rank-Nullity over \\( \\mathbb{F}_2 \\), \\( \\dim W + \\dim W^\\perp = ${n} \\implies 2\\dim W \\le ${n} \\implies \\dim W \\le \\lfloor ${n}/2 \\rfloor = ${Math.floor(n / 2)} \\). Pairing citizens into \\( \\lfloor ${n}/2 \\rfloor \\) disjoint pairs achieves all \\( 2^{${Math.floor(n / 2)}} = ${ans} \\) vectors in \\( W \\).`,
        hints: [
          `Encode committees as vectors in \\( \\mathbb{F}_2^{${n}} \\); the parity conditions mean \\( W = \\operatorname{span}(\\{\\mathbf{v}_i\\}) \\) satisfies \\( W \\subseteq W^\\perp \\).`,
          `Use \\( \\dim W + \\dim W^\\perp = ${n} \\) to deduce \\( \\dim W \\le \\lfloor ${n}/2 \\rfloor \\), so \\( |W| \\le 2^{\\lfloor ${n}/2 \\rfloor} \\).`,
          `Pair up \\( 2\\lfloor ${n}/2 \\rfloor \\) fellows to achieve \\( m = 2^{${Math.floor(n / 2)}} = ${ans} \\).`
        ]
      }));
    } else {
      // Skew / Bipartite Oddtown or Non-Uniform Fisher / Oddtown variant:
      // Classic Oddtown with k reserved citizens or "Reverse Oddtown" (every club has EVEN size, every distinct intersection |C_i \cap C_j| is ODD!):
      // Let's check Reverse Oddtown (even size, odd pairwise intersections) on n citizens:
      // Add a dummy citizen n+1 to every club => now every club has ODD size, and every pairwise intersection has EVEN size! So m <= n + 1 when n is odd, and m <= n when n is even? Wait: let's verify!
      // Even cleaner & 100% textbook theorem: Uniform Intersection (Fisher's Inequality / Babai-Frankl): m clubs on n citizens where |C_i \cap C_j| = lambda >= 1 for all i != j and clubs are distinct => Gram matrix over R is diag(|C_i| - lambda) + lambda J! Provided |C_i| > lambda, det > 0 so m <= n!
      // Let's ask: On n citizens (n = 15..20), clubs C_1..C_m each have ODD size, pairwise intersections are EVEN, AND every club must omit at least k fixed citizens? No, simply: n = 20 + 3*(i-6) citizens under Oddtown rules + exact Gram rank!
      const n = 18 + 3 * (i - 6); // 18, 21, 24, 27, 30, 33
      items.push(makeItem({
        idx: idx++, topicId: TOP12, domain: DOM12, difficulty: 'hard', subskill: 3,
        archetype: 'Oddtown Linear Independence Bound over F₂',
        text: `[KAUST Academy] In a town of \\( ${n} \\) residents, \\( m \\) clubs \\( C_1, C_2, \\dots, C_m \\) are formed so that (i) every club \\( |C_i| \\) has an **odd** number of members, and (ii) every pair of distinct clubs \\( |C_i \\cap C_j| \\) (\\( i \\neq j \\)) shares an **even** number of members. Using linear independence over \\( \\mathbb{F}_2 \\), what is the maximum possible number of clubs \\( m \\)?`,
        correctVal: String(n),
        distractors: [String(n + 1), String(Math.pow(2, Math.floor(n / 2))), String(comb(n, 2))],
        sol: `Let \\( \\mathbf{v}_1, \\dots, \\mathbf{v}_m \\in \\mathbb{F}_2^{${n}} \\) be the characteristic vectors of the clubs. Over \\( \\mathbb{F}_2 \\), \\( \\mathbf{v}_i \\cdot \\mathbf{v}_i = 1 \\) and \\( \\mathbf{v}_i \\cdot \\mathbf{v}_j = 0 \\) for \\( i \\neq j \\). If \\( \\sum c_i \\mathbf{v}_i = \\mathbf{0} \\), taking the dot product with \\( \\mathbf{v}_k \\) gives \\( c_k = 0 \\) for every \\( k \\). Hence the \\( m \\) vectors are linearly independent in \\( \\mathbb{F}_2^{${n}} \\), forcing \\( m \\le ${n} \\), which is attained by the \\( ${n} \\) singleton clubs.`,
        hints: [
          `Map each club \\( C_i \\) to its \\( 0\\text{-}1 \\) incidence vector \\( \\mathbf{v}_i \\in \\mathbb{F}_2^{${n}} \\).`,
          `Notice the Gram matrix \\( (\\mathbf{v}_i \\cdot \\mathbf{v}_j) \\bmod 2 \\) is the \\( m \\times m \\) identity matrix \\( I_m \\), proving linear independence.`,
          `Since \\( \\dim(\\mathbb{F}_2^{${n}}) = ${n} \\) and singletons work, the maximum is \\( m = ${n} \\).`
        ]
      }));
    }
  }

  return items;
}

module.exports = { generateCh09To12 };
