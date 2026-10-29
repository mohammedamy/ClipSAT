'use strict';

const {
  gcd, comb, fracTex, makeItem
} = require('./bank_helpers');

function generateCh05To08(startIdx) {
  let idx = startIdx;
  const items = [];

  // =========================================================================
  // CHAPTER 5: ol-recurrence-probability (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM5 = 'Recurrence Relations & Geometric Probability';
  const TOP5 = 'ol-recurrence-probability';

  // Easy 1..14: Second-Order Linear Recurrences a_n = (1 + r) a_{n-1} - r a_{n-2}
  for (let i = 0; i < 14; i++) {
    const r = (i % 2 === 0) ? 2 : 3;
    const a0 = (i % 5) + 1;
    const a1 = a0 + Math.floor(i / 2) + 2;
    const nTarget = (i < 7) ? 5 : 6;
    const seq = [a0, a1];
    for (let k = 2; k <= nTarget; k++) {
      seq.push((1 + r) * seq[k - 1] - r * seq[k - 2]);
    }
    const ans = seq[nTarget];
    items.push(makeItem({
      idx: idx++, topicId: TOP5, domain: DOM5, difficulty: 'easy', subskill: 1,
      archetype: 'Characteristic Root Linear Recurrence',
      text: `A sequence \\( \\{a_n\\}_{n \\ge 0} \\) satisfies \\( a_0 = ${a0} \\), \\( a_1 = ${a1} \\), and the linear recurrence \\[ a_n = ${1 + r}a_{n-1} - ${r}a_{n-2} \\quad \\text{for } n \\ge 2. \\] Compute the exact value of \\( a_{${nTarget}} \\).`,
      correctVal: String(ans),
      distractors: [String(seq[nTarget - 1]), String(ans + (a1 - a0)), String(ans - r * (a1 - a0))],
      sol: `The characteristic polynomial \\( t^2 - ${1 + r}t + ${r} = (t - 1)(t - ${r}) \\) has distinct roots \\( 1 \\) and \\( ${r} \\), so \\( a_n = A + B \\cdot ${r}^n \\) (equivalently \\( a_n - a_{n-1} = ${r}(a_{n-1} - a_{n-2}) \\)). Iterating gives \\( a_2 = ${seq[2]},\\; a_3 = ${seq[3]},\\; a_4 = ${seq[4]} \\), up to \\( a_{${nTarget}} = ${ans} \\).`,
      hints: [
        `Factor the characteristic equation \\( t^2 - ${1 + r}t + ${r} = (t - 1)(t - ${r}) = 0 \\).`,
        `Notice first differences form a geometric progression: \\( a_k - a_{k-1} = (${a1 - a0}) \\cdot ${r}^{k-1} \\).`,
        `Sum the differences from \\( a_0 = ${a0} \\) up to \\( k = ${nTarget} \\) to get \\( ${ans} \\).`
      ]
    }));
  }

  // Easy 15..28: First-Return Catalan Decomposition C_a * C_b
  const catPairs = [
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 2],
    [2, 3], [2, 4], [2, 5], [2, 6], [3, 3], [3, 4], [3, 5]
  ];
  const catalan = (n) => Math.round(comb(2 * n, n) / (n + 1));
  for (let i = 0; i < 14; i++) {
    const [a, b] = catPairs[i];
    const N = a + b + 1;
    const ans = catalan(a) * catalan(b);
    const fig = {
      type: 'fn',
      title: `Dyck Lattice Region Below Diagonal y = x on [0, ${N}]`,
      fns: [{ fn: 'x', label: 'Boundary y = x' }],
      points: [{ x: a + 1, y: a + 1, label: `First touch (${a + 1},${a + 1})` }],
      xrange: [0, N + 1],
      yrange: [0, N + 1]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP5, domain: DOM5, difficulty: 'easy', subskill: 2,
      archetype: 'Catalan First-Return Decomposition',
      text: `Consider monotonic lattice paths from \\( (0, 0) \\) to \\( (${N}, ${N}) \\) using unit steps East \\( (1,0) \\) and North \\( (0,1) \\) that never rise above the diagonal \\( y = x \\) shown in the figure. How many such Catalan paths touch the diagonal \\( y = x \\) for the **first** time after \\( (0,0) \\) at the point \\( (${a + 1}, ${a + 1}) \\)?`,
      correctVal: String(ans),
      distractors: [String(catalan(N)), String(catalan(a + 1) * catalan(b)), String(catalan(a) + catalan(b))],
      sol: `To stay strictly below \\( y = x \\) between \\( (0,0) \\) and \\( (${a + 1}, ${a + 1}) \\), the path must begin with an East step to \\( (1,0) \\), traverse a shifted Dyck path of semilength \\( ${a} \\) to \\( (${a + 1}, ${a}) \\) in \\( C_{${a}} = ${catalan(a)} \\) ways, and step North to \\( (${a + 1}, ${a + 1}) \\). The remaining suffix from \\( (${a + 1}, ${a + 1}) \\) to \\( (${N}, ${N}) \\) is any Dyck path of semilength \\( ${b} \\), giving \\( C_{${b}} = ${catalan(b)} \\) ways. By the multiplication rule, there are \\( ${catalan(a)} \\times ${catalan(b)} = ${ans} \\) paths.`,
      hints: [
        `Decompose the path at its first return \\( (${a + 1}, ${a + 1}) \\): the first step must be \\( (0,0) \\to (1,0) \\) and the step into \\( (${a + 1}, ${a + 1}) \\) must come from \\( (${a + 1}, ${a}) \\).`,
        `Count the prefix Dyck paths of semilength \\( ${a} \\) via \\( C_{${a}} = \\frac{1}{${a + 1}}\\binom{${2 * a}}{${a}} = ${catalan(a)} \\).`,
        `Multiply by the unrestricted suffix Dyck paths \\( C_{${b}} = ${catalan(b)} \\) to obtain \\( ${ans} \\).`
      ],
      fig
    }));
  }

  // Easy 29..40: 2D Geometric Probability X + Y <= c on [0, T]^2
  const geoSumCfg = [
    [4, 2], [4, 3], [5, 2], [5, 3], [6, 2], [6, 4],
    [6, 5], [8, 3], [8, 4], [8, 6], [10, 4], [10, 6]
  ];
  for (let i = 0; i < 12; i++) {
    const [T, c] = geoSumCfg[i];
    const num = c * c;
    const den = 2 * T * T;
    const corr = fracTex(num, den);
    const fig = {
      type: 'fn',
      title: `Sample Square [0, ${T}]² with Threshold x + y = ${c}`,
      fns: [{ fn: `${c} - x`, label: `x + y = ${c}` }],
      shade: [{ fn: `${c} - x`, x1: 0, x2: c }],
      xrange: [0, T],
      yrange: [0, T]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP5, domain: DOM5, difficulty: 'easy', subskill: 3,
      archetype: 'Continuous Sample-Space Area Ratio',
      text: `Real numbers \\( X \\) and \\( Y \\) are chosen independently and uniformly at random from the interval \\( [0, ${T}] \\), as illustrated on the coordinate square. What is the exact probability that \\( X + Y \\le ${c} \\)?`,
      correctVal: corr,
      distractors: [fracTex(c, T), fracTex(num, T * T), fracTex(2 * T * T - num, den)],
      sol: `The uniform sample space \\( [0, ${T}]^2 \\) has total area \\( ${T}^2 = ${T * T} \\). Since \\( ${c} \\le ${T} \\), the favorable region \\( X \\ge 0,\\; Y \\ge 0,\\; X + Y \\le ${c} \\) is a right isosceles triangle of legs \\( ${c} \\) and area \\( \\frac{1}{2}(${c})^2 = \\frac{${num}}{2} \\). Dividing by \\( ${T * T} \\) yields \\( ${corr} \\).`,
      hints: [
        `Compute the total area of the uniform sample square \\( [0, ${T}]^2 \\), which is \\( ${T * T} \\).`,
        `Because \\( ${c} \\le ${T} \\), the shaded favorable region \\( X + Y \\le ${c} \\) inside the first quadrant is a right triangle with legs \\( ${c} \\) and \\( ${c} \\).`,
        `Divide the triangle area \\( \\frac{${c}^2}{2} \\) by \\( ${T}^2 \\) and simplify to \\( ${corr} \\).`
      ],
      fig
    }));
  }

  // Medium 1..14: Distinct-Root Characteristic Recurrences
  const charRoots = [
    [2, 3, 1, 4], [2, 3, 2, 5], [2, -1, 3, 3], [2, -1, 1, 5],
    [3, -1, 2, 4], [3, -1, 1, 7], [3, 2, 0, 2], [4, -1, 2, 3],
    [4, -1, 1, 6], [4, 2, 1, 6], [3, -2, 2, 1], [3, -2, 1, 8],
    [5, -2, 2, 3], [5, -1, 1, 5]
  ];
  for (let i = 0; i < 14; i++) {
    const [r1, r2, a0, a1] = charRoots[i];
    const c1 = r1 + r2;
    const c2 = -r1 * r2; // a_n = c1 * a_{n-1} + c2 * a_{n-2}
    const seq = [a0, a1];
    for (let k = 2; k <= 5; k++) seq.push(c1 * seq[k - 1] + c2 * seq[k - 2]);
    const ans = seq[5];
    const rhs = `${c1 === 1 ? '' : c1}a_{n-1} ${c2 >= 0 ? '+ ' + (c2 === 1 ? '' : c2) : '- ' + (Math.abs(c2) === 1 ? '' : Math.abs(c2))}a_{n-2}`;
    items.push(makeItem({
      idx: idx++, topicId: TOP5, domain: DOM5, difficulty: 'medium', subskill: 1,
      archetype: 'Second-Order Characteristic Polynomial',
      text: `Let \\( \\{a_n\\}_{n \\ge 0} \\) satisfy \\( a_0 = ${a0} \\), \\( a_1 = ${a1} \\), and \\[ a_n = ${rhs} \\quad (n \\ge 2). \\] Find the exact value of \\( a_5 \\).`,
      correctVal: String(ans),
      distractors: [String(seq[4]), String(ans + seq[3]), String(c1 * seq[4] - c2 * seq[3])],
      sol: `The characteristic equation \\( t^2 - ${c1}t ${c2 >= 0 ? '- ' + c2 : '+ ' + Math.abs(c2)} = (t - ${r1})(t ${r2 >= 0 ? '- ' + r2 : '+ ' + Math.abs(r2)}) = 0 \\) yields \\( a_n = \\alpha(${r1})^n + \\beta(${r2})^n \\). Equivalently, direct step-by-step evaluation gives \\( a_2 = ${seq[2]},\\; a_3 = ${seq[3]},\\; a_4 = ${seq[4]} \\), and \\( a_5 = ${ans} \\).`,
      hints: [
        `Identify the characteristic roots \\( r_1 = ${r1} \\) and \\( r_2 = ${r2} \\), or compute \\( a_2, a_3, a_4, a_5 \\) recursively.`,
        `First find \\( a_2 = ${seq[2]} \\) and \\( a_3 = ${seq[3]} \\), watching the sign on \\( ${c2}a_{n-2} \\).`,
        `Continue to \\( a_4 = ${seq[4]} \\) and \\( a_5 = ${ans} \\).`
      ]
    }));
  }

  // Medium 15..28: Rendezvous Band Probability |X - Y| <= w on [0, T]^2
  const rendCfg = [
    [60, 15], [60, 20], [60, 12], [60, 10], [60, 30], [40, 10], [40, 15],
    [30, 10], [30, 6], [50, 10], [50, 20], [24, 6], [24, 8], [45, 15]
  ];
  for (let i = 0; i < 14; i++) {
    const [T, w] = rendCfg[i];
    const num = 2 * T * w - w * w;
    const den = T * T;
    const corr = fracTex(num, den);
    const fig = {
      type: 'fn',
      title: `Rendezvous Band |x - y| <= ${w} in [0, ${T}]²`,
      fns: [
        { fn: `x + ${w}`, label: `y = x + ${w}` },
        { fn: `x - ${w}`, label: `y = x - ${w}` }
      ],
      xrange: [0, T],
      yrange: [0, T]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP5, domain: DOM5, difficulty: 'medium', subskill: 2,
      archetype: 'Rendezvous Diagonal-Band Probability',
      text: `Two Olympiad finalists independently arrive at a study lounge at uniformly random times in \\( [0, ${T}] \\) minutes. Each stays for \\( ${w} \\) minutes (or until minute \\( ${T} \\)) before leaving. Using the diagonal band \\( |x - y| \\le ${w} \\) shown in the figure, find the exact probability that they meet.`,
      correctVal: corr,
      distractors: [fracTex(2 * w, T), fracTex((T - w) * (T - w), den), fracTex(T * w, den)],
      sol: `Inside the \\( ${T} \\times ${T} \\) square of area \\( ${den} \\), the complement \\( |X - Y| > ${w} \\) consists of two congruent corner right triangles of leg \\( ${T} - ${w} = ${T - w} \\). Their combined area is \\( (${T - w})^2 = ${(T - w) * (T - w)} \\), so the meeting probability is \\( 1 - \\frac{${(T - w) * (T - w)}}{${den}} = ${corr} \\).`,
      hints: [
        `Plot arrival times \\( (X, Y) \\in [0, ${T}]^2 \\); they meet iff \\( |X - Y| \\le ${w} \\).`,
        `Subtract the two complementary corner triangles \\( X - Y > ${w} \\) and \\( Y - X > ${w} \\), each of leg length \\( ${T - w} \\).`,
        `Compute \\( 1 - \\left(\\frac{${T - w}}{${T}}\\right)^2 = ${corr} \\).`
      ],
      fig
    }));
  }

  // Medium 29..40: Symmetric Random Walk Expected Absorption Time E_k = k(N - k)
  const rwCfg = [
    [6, 2], [6, 3], [7, 2], [7, 3], [8, 3], [8, 4],
    [9, 3], [9, 4], [10, 3], [10, 4], [10, 5], [12, 5]
  ];
  for (let i = 0; i < 12; i++) {
    const [N, k] = rwCfg[i];
    const ans = k * (N - k);
    const fig = {
      type: 'network_graph',
      title: `Symmetric Random Walk on {0, ..., ${N}}`,
      directed: false,
      nodes: [
        { id: '0', label: '0', x: 45, y: 125 },
        { id: 'k', label: String(k), x: 175, y: 125, highlight: true },
        { id: 'N', label: String(N), x: 305, y: 125 }
      ],
      edges: [
        { from: '0', to: 'k', label: 'p = 1/2' },
        { from: 'k', to: 'N', label: 'p = 1/2' }
      ]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP5, domain: DOM5, difficulty: 'medium', subskill: 3,
      archetype: 'Random Walk Expected Stopping Time',
      text: `A particle starts at integer position \\( X_0 = ${k} \\) on the segment \\( \\{0, 1, \\dots, ${N}\\} \\) shown schematically. At each step it moves \\( +1 \\) or \\( -1 \\) with equal probability \\( \\frac{1}{2} \\), stopping as soon as it hits either absorbing boundary \\( 0 \\) or \\( ${N} \\). What is the expected number of steps until absorption?`,
      correctVal: String(ans),
      distractors: [String(N * k), String(ans + N), String((N * N) / 2 | 0)],
      sol: `Let \\( E_x \\) be the expected remaining steps from position \\( x \\). Conditioning on the first step gives \\( E_x = 1 + \\frac{1}{2}E_{x-1} + \\frac{1}{2}E_{x+1} \\), so \\( E_{x+1} - 2E_x + E_{x-1} = -2 \\) with \\( E_0 = E_{${N}} = 0 \\). The unique quadratic solution is \\( E_x = x(${N} - x) \\), yielding \\( E_{${k}} = ${k}(${N - k}) = ${ans} \\).`,
      hints: [
        `Set up first-step conditioning: \\( E_x = 1 + \\frac{1}{2}E_{x-1} + \\frac{1}{2}E_{x+1} \\) with boundary conditions \\( E_0 = E_{${N}} = 0 \\).`,
        `Since the second difference \\( \\Delta^2 E_x = -2 \\) is constant, \\( E_x \\) is a downward quadratic vanishing at \\( 0 \\) and \\( ${N} \\): \\( E_x = x(${N} - x) \\).`,
        `Evaluate at \\( x = ${k} \\): \\( ${k} \\times ${N - k} = ${ans} \\).`
      ],
      fig
    }));
  }

  // Hard 1..14: Markov Expected Flips for Consecutive Runs (HH or HHH) with p = 1/m
  for (let i = 0; i < 14; i++) {
    const m = (i % 7) + 2; // 2..8
    const runLen = (i < 7) ? 2 : 3;
    const ans = (runLen === 2) ? (m * m + m) : (m * m * m + m * m + m);
    const fig = {
      type: 'network_graph',
      title: `Markov Automaton for ${runLen === 2 ? 'HH' : 'HHH'} (p = 1/${m})`,
      directed: true,
      nodes: [
        { id: 'S0', label: 'S0', x: 55, y: 135, highlight: true },
        { id: 'S1', label: 'S1', x: 175, y: 135 },
        { id: 'Goal', label: runLen === 2 ? 'HH' : 'HHH', x: 295, y: 135 }
      ],
      edges: [
        { from: 'S0', to: 'S1', label: `1/${m}`, directed: true },
        { from: 'S1', to: 'S0', label: `${m - 1}/${m}`, curved: 34, directed: true },
        { from: 'S1', to: 'Goal', label: runLen === 2 ? `1/${m}` : '...', directed: true }
      ]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP5, domain: DOM5, difficulty: 'hard', subskill: 1,
      archetype: 'Markov Run-Length Waiting Time',
      text: `A biased coin lands Heads with probability \\( p = \\frac{1}{${m}} \\) and Tails with probability \\( 1 - p = \\frac{${m - 1}}{${m}} \\). Using the Markov state transitions illustrated, find the exact expected number of flips required to observe \\( ${runLen} \\) consecutive Heads (\\( \\text{${runLen === 2 ? 'HH' : 'HHH'}} \\)) for the first time.`,
      correctVal: String(ans),
      distractors: [
        String(runLen === 2 ? m * m : m * m * m),
        String(ans - m),
        String(ans + m * m)
      ],
      sol: `Let \\( e_r \\) denote the expected flips to reach \\( r \\) consecutive Heads. To reach \\( r \\) Heads, we first reach \\( r - 1 \\) Heads (taking \\( e_{r-1} \\) flips on average), then flip once more: with probability \\( \\frac{1}{${m}} \\) we finish, and with probability \\( \\frac{${m - 1}}{${m}} \\) we reset to \\( S_0 \\). Thus \\( e_r = e_{r-1} + 1 + \\frac{${m - 1}}{${m}} e_r \\implies e_r = ${m}(e_{r-1} + 1) \\). Starting from \\( e_0 = 0 \\), \\( e_1 = ${m} \\), \\( e_2 = ${m * m + m} \\)${runLen === 3 ? `, and \\( e_3 = ${ans} \\)` : ''}.`,
      hints: [
        `Let \\( e_k \\) be the expected flips to get \\( k \\) consecutive Heads; condition on the flip immediately following \\( k - 1 \\) Heads.`,
        `Derive the recursion \\( e_k = e_{k-1} + 1 + \\left(1 - \\frac{1}{${m}}\\right)e_k \\), which simplifies to \\( e_k = ${m}(e_{k-1} + 1) \\).`,
        `Evaluate \\( \\sum_{j=1}^{${runLen}} ${m}^j = ${ans} \\).`
      ],
      fig
    }));
  }

  // Hard 15..28: Non-Homogeneous Affine Recurrence a_n = c * a_{n-1} + d
  for (let i = 0; i < 14; i++) {
    const c = (i % 2 === 0) ? 2 : 3;
    const d = (c === 2) ? (i + 2) : (2 * (Math.floor(i / 2) + 1)); // divisible by c - 1!
    const a0 = (i % 4) + 1;
    const n = (c === 2) ? 7 : 5;
    const shift = d / (c - 1);
    const ans = (a0 + shift) * Math.pow(c, n) - shift;
    items.push(makeItem({
      idx: idx++, topicId: TOP5, domain: DOM5, difficulty: 'hard', subskill: 2,
      archetype: 'Fixed-Point Non-Homogeneous Recurrence',
      text: `A sequence \\( \\{a_n\\}_{n \\ge 0} \\) is defined by \\( a_0 = ${a0} \\) and \\[ a_n = ${c}a_{n-1} + ${d} \\quad \\text{for all } n \\ge 1. \\] Using the fixed-point translation \\( b_n = a_n + \\lambda \\), compute \\( a_{${n}} \\).`,
      correctVal: String(ans),
      distractors: [String(a0 * Math.pow(c, n) + n * d), String(ans + shift), String((a0 + shift) * Math.pow(c, n))],
      sol: `Solving \\( a_n + \\lambda = ${c}(a_{n-1} + \\lambda) \\) gives \\( (${c} - 1)\\lambda = ${d} \\implies \\lambda = ${shift} \\). Then \\( b_n = a_n + ${shift} \\) is purely geometric with \\( b_0 = ${a0 + shift} \\) and ratio \\( ${c} \\), so \\( a_{${n}} = ${a0 + shift} \\cdot ${c}^{${n}} - ${shift} = ${ans} \\).`,
      hints: [
        `Shift by a constant \\( \\lambda \\) so \\( a_n + \\lambda = ${c}(a_{n-1} + \\lambda) \\), giving \\( \\lambda = \\frac{${d}}{${c} - 1} = ${shift} \\).`,
        `Recognize \\( b_n = a_n + ${shift} = b_0 \\cdot ${c}^n \\) with \\( b_0 = ${a0 + shift} \\).`,
        `Substitute \\( n = ${n} \\): \\( ${a0 + shift} \\cdot ${c}^{${n}} - ${shift} = ${ans} \\).`
      ]
    }));
  }

  // Hard 29..40: Closed Walks of Length n on Complete Graph K_m
  for (let i = 0; i < 12; i++) {
    const m = Math.floor(i / 3) + 3; // 3, 4, 5, 6
    const n = (i % 3) + 4;           // 4, 5, 6
    const sign = (n % 2 === 0) ? 1 : -1;
    const ans = (Math.pow(m - 1, n) + (m - 1) * sign) / m;
    items.push(makeItem({
      idx: idx++, topicId: TOP5, domain: DOM5, difficulty: 'hard', subskill: 3,
      archetype: 'Coupled Graph-Walk Recurrence on K_m',
      text: `Let \\( K_{${m}} \\) be the complete graph on \\( ${m} \\) labeled vertices, including a starting vertex \\( V_1 \\). At each step of a walk, one moves along an edge to any of the \\( ${m - 1} \\) other vertices (no self-loops). How many walks of length \\( ${n} \\) begin at \\( V_1 \\) and also end back at \\( V_1 \\)?`,
      correctVal: String(ans),
      distractors: [
        String(Math.pow(m - 1, n - 1)),
        String((Math.pow(m - 1, n) - (m - 1) * sign) / m),
        String(ans + (m - 1))
      ],
      sol: `Let \\( A_k \\) be the number of \\( k \\)-step walks ending at \\( V_1 \\), and \\( B_k \\) the total walks ending elsewhere. Since total \\( k \\)-step walks equal \\( A_k + B_k = (${m - 1})^k \\) and \\( A_k = B_{k-1} = (${m - 1})^{k-1} - A_{k-1} \\) with \\( A_0 = 1 \\), solving the linear recurrence yields \\( A_k = \\frac{(${m - 1})^k + (${m - 1})(-1)^k}{${m}} \\). At \\( k = ${n} \\), \\( A_{${n}} = ${ans} \\).`,
      hints: [
        `Notice total \\( k \\)-step walks from \\( V_1 \\) equal \\( (${m - 1})^k \\), and every \\( k \\)-step walk ending at \\( V_1 \\) came from a vertex \\( \\neq V_1 \\) at step \\( k - 1 \\).`,
        `Thus \\( A_k = (${m - 1})^{k-1} - A_{k-1} \\) with \\( A_0 = 1,\\; A_1 = 0 \\).`,
        `Evaluate \\( A_{${n}} = \\frac{(${m - 1})^{${n}} + (${m - 1})(-1)^{${n}}}{${m}} = ${ans} \\).`
      ]
    }));
  }

  // =========================================================================
  // CHAPTER 6: ol-euclidean-circles (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM6 = 'Circle Geometry, Power of a Point & Radical Axes';
  const TOP6 = 'ol-euclidean-circles';

  // Easy 1..14: Intersecting Chords Power of a Point PA * PB = PC * PD
  const chordCfg = [
    [4, 9, 3], [6, 8, 4], [5, 12, 6], [6, 10, 5], [8, 9, 6], [4, 15, 5], [7, 12, 6],
    [9, 10, 6], [8, 15, 10], [6, 14, 7], [9, 12, 4], [10, 12, 8], [6, 15, 9], [8, 12, 6]
  ];
  for (let i = 0; i < 14; i++) {
    const [pa, pb, pc] = chordCfg[i];
    const pd = (pa * pb) / pc;
    const fig = {
      type: 'circle_chords_similarity',
      labels: ['A', 'B', 'C', 'D', 'P'],
      sides: { pa: String(pa), pb: String(pb), pc: String(pc), pd: '?' }
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP6, domain: DOM6, difficulty: 'easy', subskill: 1,
      archetype: 'Intersecting Chords Power of a Point',
      text: `In the circle shown, chords \\( AB \\) and \\( CD \\) intersect internally at point \\( P \\). Given \\( PA = ${pa} \\), \\( PB = ${pb} \\), and \\( PC = ${pc} \\), find the exact segment length \\( PD \\).`,
      correctVal: String(pd),
      distractors: [String(pa + pb - pc), String(pd + 2), String(Math.max(1, pd - 3))],
      sol: `By the Intersecting Chords Theorem (Power of a Point inside a circle), \\( PA \\cdot PB = PC \\cdot PD \\). Substituting gives \\( ${pa} \\cdot ${pb} = ${pc} \\cdot PD \\implies PD = \\frac{${pa * pb}}{${pc}} = ${pd} \\).`,
      hints: [
        `Notice \\( \\triangle PAC \\sim \\triangle PDB \\) by inscribed angles subtending the same arcs.`,
        `Apply Power of a Point: \\( PA \\cdot PB = PC \\cdot PD \\).`,
        `Compute \\( PD = \\frac{${pa} \\times ${pb}}{${pc}} = ${pd} \\).`
      ],
      fig
    }));
  }

  // Easy 15..28: Tangent-Secant Theorem PT^2 = PA * (PA + AB)
  const tanSecCfg = [
    [4, 5], [3, 9], [4, 12], [5, 15], [6, 18], [8, 10], [9, 7],
    [2, 16], [5, 4], [8, 24], [7, 21], [9, 16], [6, 2], [12, 15]
  ];
  for (let i = 0; i < 14; i++) {
    const [pa, ab] = tanSecCfg[i];
    const pb = pa + ab;
    const pt = Math.round(Math.sqrt(pa * pb));
    const fig = {
      type: 'circle',
      title: 'External Point P with Tangent PT & Secant PAB',
      center: 'O'
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP6, domain: DOM6, difficulty: 'easy', subskill: 2,
      archetype: 'Tangent-Secant Power of a Point',
      text: `From an external point \\( P \\) to circle \\( (O) \\) shown, \\( PT \\) is tangent to the circle at \\( T \\) and a secant line through \\( P \\) intersects the circle at \\( A \\) and \\( B \\) (with \\( A \\) between \\( P \\) and \\( B \\)). If \\( PA = ${pa} \\) and the internal chord has length \\( AB = ${ab} \\), find \\( PT \\).`,
      correctVal: String(pt),
      distractors: [String(Math.round(Math.sqrt(pa * ab)) || (pa + 2)), String(pb - pa), String(pt + pa)],
      sol: `First compute the full secant length \\( PB = PA + AB = ${pa} + ${ab} = ${pb} \\) (a classic trap is multiplying \\( PA \\cdot AB \\) instead of \\( PA \\cdot PB \\)). By the Tangent-Secant Theorem, \\( PT^2 = PA \\cdot PB = ${pa} \\cdot ${pb} = ${pa * pb} \\), so \\( PT = ${pt} \\).`,
      hints: [
        `Find the whole secant distance from \\( P \\) to the far intersection \\( B \\): \\( PB = PA + AB = ${pb} \\).`,
        `Apply the Tangent-Secant Power identity \\( PT^2 = PA \\cdot PB \\).`,
        `Take the positive square root of \\( ${pa} \\times ${pb} = ${pa * pb} \\) to get \\( ${pt} \\).`
      ],
      fig
    }));
  }

  // Easy 29..40: Cyclic Quadrilateral & Central-Inscribed Angle Chasing
  for (let i = 0; i < 12; i++) {
    const angA = 62 + 3 * i; // 62..95
    const angDBC = 22 + 2 * i;
    // Cyclic ABCD: angle C = 180 - angA; if also asked angle C - angle DBC or central angle:
    const angC = 180 - angA;
    const ans = angC - angDBC;
    items.push(makeItem({
      idx: idx++, topicId: TOP6, domain: DOM6, difficulty: 'easy', subskill: 3,
      archetype: 'Cyclic Quadrilateral Inscribed Angle Chasing',
      text: `Points \\( A, B, C, D \\) lie in cyclic order on a circle \\( \\omega \\). Suppose \\( \\angle DAB = ${angA}^\\circ \\) and \\( \\angle DBC = ${angDBC}^\\circ \\). What is the degree measure of \\( \\angle BDC \\)?`,
      correctVal: `${ans}^\\circ`,
      distractors: [`${angC}^\\circ`, `${angA - angDBC}^\\circ`, `${180 - angA + angDBC}^\\circ`],
      sol: `Because \\( ABCD \\) is cyclic, opposite angles are supplementary: \\( \\angle BCD = 180^\\circ - \\angle DAB = 180^\\circ - ${angA}^\\circ = ${angC}^\\circ \\). In \\( \\triangle BCD \\), \\( \\angle BDC = 180^\\circ - \\angle BCD - \\angle DBC = 180^\\circ - ${angC}^\\circ - ${angDBC}^\\circ = ${angA - angDBC}^\\circ \\) — wait: \\( 180 - ${angC} = ${angA} \\)! Wait — let's check!`,
      hints: [
        `Use cyclic quadrilateral supplementary angles to find \\( \\angle BCD = 180^\\circ - ${angA}^\\circ = ${angC}^\\circ \\).`,
        `Apply the triangle angle sum in \\( \\triangle BCD \\).`,
        `Compute \\( \\angle BDC \\).`
      ]
    }));
    // Wait: let's fix that arithmetic cleanly right away! 180 - (180 - angA) - angDBC = angA - angDBC!
    const trueAns = angA - angDBC;
    const last = items[items.length - 1];
    const fixed = makeItem({
      idx: idx - 1, topicId: TOP6, domain: DOM6, difficulty: 'easy', subskill: 3,
      archetype: 'Cyclic Quadrilateral Inscribed Angle Chasing',
      text: last.text,
      correctVal: `${trueAns}^\\circ`,
      distractors: [`${angC - angDBC}^\\circ`, `${angC}^\\circ`, `${angA + angDBC}^\\circ`],
      sol: `Since \\( ABCD \\) is cyclic, \\( \\angle BCD = 180^\\circ - \\angle DAB = 180^\\circ - ${angA}^\\circ = ${angC}^\\circ \\) (equivalently, \\( \\angle DAB \\) equals the exterior angle at \\( C \\) of \\( \\triangle BCD \\)). In \\( \\triangle BCD \\), \\( \\angle BDC = 180^\\circ - ${angC}^\\circ - ${angDBC}^\\circ = ${trueAns}^\\circ \\).`,
      hints: [
        `Since \\( ABCD \\) is cyclic, opposite angles sum to \\( 180^\\circ \\): \\( \\angle BCD = 180^\\circ - ${angA}^\\circ = ${angC}^\\circ \\).`,
        `Use the interior angle sum of \\( \\triangle BCD \\): \\( \\angle BDC + \\angle DBC + \\angle BCD = 180^\\circ \\).`,
        `Compute \\( 180^\\circ - ${angC}^\\circ - ${angDBC}^\\circ = ${trueAns}^\\circ \\).`
      ]
    });
    items[items.length - 1] = fixed;
  }

  // Medium 1..14: Ptolemy's Theorem on Cyclic Quadrilaterals AC * BD = AB * CD + BC * DA
  const ptolCfg = [
    // [ab, bc, cd, da, ac] where (ab*cd + bc*da) / ac is clean or rational
    [3, 4, 3, 4, 5], [5, 12, 5, 12, 13], [6, 8, 6, 8, 10], [8, 15, 8, 15, 17],
    [7, 15, 20, 24, 20], [7, 15, 20, 24, 25], [14, 30, 40, 48, 40],
    [9, 12, 9, 12, 15], [5, 5, 6, 8, 7], [10, 10, 12, 16, 14],
    [4, 7, 8, 7, 9], [8, 14, 16, 14, 18], [6, 9, 10, 9, 12], [12, 16, 12, 16, 20]
  ];
  for (let i = 0; i < 14; i++) {
    const [ab, bc, cd, da, ac] = ptolCfg[i];
    const rhs = ab * cd + bc * da;
    const corr = fracTex(rhs, ac);
    const fig = (i < 12) ? {
      type: 'polygon',
      vertices: [[0, 0], [5, 0], [4, 3.4], [0.8, 3.1]],
      labels: ['A', 'B', 'C', 'D'],
      sides: [String(ab), String(bc), String(cd), String(da)]
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP6, domain: DOM6, difficulty: 'medium', subskill: 1,
      archetype: 'Ptolemy Theorem Diagonal Relation',
      text: `Cyclic quadrilateral \\( ABCD \\)${fig ? ' (shown schematically)' : ''} has consecutive side lengths \\( AB = ${ab},\\; BC = ${bc},\\; CD = ${cd},\\; DA = ${da} \\), and diagonal \\( AC = ${ac} \\). By Ptolemy's Theorem, find the exact length of the other diagonal \\( BD \\).`,
      correctVal: corr,
      distractors: [fracTex(Math.abs(ab * cd - bc * da) || (rhs - ac), ac), fracTex(ab * bc + cd * da, ac), String(ac + 2)],
      sol: `By Ptolemy's Theorem on cyclic quadrilateral \\( ABCD \\), the product of the diagonals equals the sum of products of opposite sides: \\[ AC \\cdot BD = AB \\cdot CD + BC \\cdot DA = ${ab}(${cd}) + ${bc}(${da}) = ${rhs}. \\] Dividing by \\( AC = ${ac} \\) gives \\( BD = ${corr} \\).`,
      hints: [
        `Apply Ptolemy's identity for cyclic quadrilateral \\( ABCD \\): \\( AC \\cdot BD = AB \\cdot CD + BC \\cdot DA \\).`,
        `Compute the opposite-side product sum \\( ${ab} \\cdot ${cd} + ${bc} \\cdot ${da} = ${rhs} \\).`,
        `Divide by \\( AC = ${ac} \\) to obtain \\( BD = ${corr} \\).`
      ],
      fig
    }));
  }

  // Medium 15..28: Power of an Interior Point OP^2 = R^2 - PA * PB
  const intPowCfg = [
    [10, 4, 9], [10, 3, 12], [13, 5, 24], [13, 8, 18], [15, 6, 24], [15, 9, 16], [17, 8, 20],
    [17, 13, 15], [20, 7, 35], [20, 12, 23], [25, 10, 40], [25, 9, 25], [26, 12, 48], [29, 16, 25]
  ];
  for (let i = 0; i < 14; i++) {
    const [R, pa, pb] = intPowCfg[i];
    // Wait: let's check R^2 - pa*pb:
    // Let's compute R^2 - pa*pb and make sure OP is exact integer or ask for OP^2 or construct from (R, OP)!
    // Even better: construct from exact integers (R, d) so R^2 - d^2 = (R-d)(R+d) = pa * pb!
    const pairsRD = [
      [10, 6, 4, 16], [10, 8, 3, 12], [13, 5, 8, 18], [13, 12, 5, 5],
      [15, 9, 8, 18], [15, 12, 9, 9], [17, 8, 9, 25], [17, 15, 8, 8],
      [20, 12, 8, 32], [20, 16, 9, 16], [25, 7, 16, 36], [25, 15, 10, 40],
      [25, 20, 15, 15], [26, 10, 16, 36]
    ];
    const [rad, distOP, segA, segB] = pairsRD[i];
    items.push(makeItem({
      idx: idx++, topicId: TOP6, domain: DOM6, difficulty: 'medium', subskill: 2,
      archetype: 'Interior Power & Center Distance',
      text: `Point \\( P \\) lies strictly inside a circle \\( \\omega \\) of radius \\( R = ${rad} \\) centered at \\( O \\). A chord \\( AB \\) passing through \\( P \\) is divided into segments \\( PA = ${segA} \\) and \\( PB = ${segB} \\). Find the exact distance \\( OP \\).`,
      correctVal: String(distOP),
      distractors: [String(rad - segA), String(Math.round(Math.sqrt(segA * segB)) || (distOP + 3)), String(distOP + 4)],
      sol: `The power of interior point \\( P \\) with respect to \\( \\omega \\) satisfies \\( R^2 - OP^2 = PA \\cdot PB \\). Substituting \\( R = ${rad} \\) and \\( PA \\cdot PB = ${segA} \\cdot ${segB} = ${segA * segB} \\) gives \\( OP^2 = ${rad}^2 - ${segA * segB} = ${rad * rad - segA * segB} \\), hence \\( OP = ${distOP} \\).`,
      hints: [
        `Draw the diameter through \\( O \\) and \\( P \\), which splits into segments \\( R - OP \\) and \\( R + OP \\).`,
        `By Power of a Point, \\( (R - OP)(R + OP) = R^2 - OP^2 = PA \\cdot PB \\).`,
        `Compute \\( OP = \\sqrt{${rad}^2 - ${segA} \\cdot ${segB}} = \\sqrt{${distOP * distOP}} = ${distOP} \\).`
      ]
    }));
  }

  // Medium 29..40: Common External Tangent of Two Circles L = sqrt(d^2 - (R - r)^2)
  const extTanCfg = [
    [9, 4, 13], [12, 4, 17], [14, 5, 15], [16, 4, 15], [16, 4, 20], [18, 3, 17],
    [15, 7, 17], [20, 8, 15], [22, 6, 20], [25, 4, 29], [18, 6, 13], [24, 14, 26]
  ];
  for (let i = 0; i < 12; i++) {
    const [R, r, d] = extTanCfg[i];
    const diff = R - r;
    const L = Math.round(Math.sqrt(d * d - diff * diff));
    const fig = {
      type: 'circle',
      title: `Two Circles (R = ${R}, r = ${r}, O₁O₂ = ${d})`,
      center: 'O₁'
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP6, domain: DOM6, difficulty: 'medium', subskill: 3,
      archetype: 'Common External Tangent Right-Triangle Projection',
      text: `Circles \\( \\omega_1 \\) and \\( \\omega_2 \\) (represented in the diagram) have radii \\( R = ${R} \\) and \\( r = ${r} \\), and their centers are separated by \\( O_1 O_2 = ${d} \\). Find the exact length of a common external tangent segment \\( T_1 T_2 \\).`,
      correctVal: String(L),
      distractors: [String(d - diff), String(d + diff), String(L + 3)],
      sol: `Projecting \\( O_2 \\) perpendicularly onto radius \\( O_1 T_1 \\) creates a right triangle with hypotenuse \\( O_1 O_2 = ${d} \\) and legs \\( R - r = ${diff} \\) and \\( T_1 T_2 \\). Thus \\( T_1 T_2 = \\sqrt{${d}^2 - ${diff}^2} = \\sqrt{${L * L}} = ${L} \\).`,
      hints: [
        `Drop a perpendicular from \\( O_2 \\) onto \\( O_1 T_1 \\) to form a rectangle of length \\( T_1 T_2 \\) and a right triangle.`,
        `The right triangle has hypotenuse \\( d = ${d} \\) and leg \\( R - r = ${R} - ${r} = ${diff} \\).`,
        `Evaluate \\( \\sqrt{${d}^2 - ${diff}^2} = ${L} \\).`
      ],
      fig
    }));
  }

  // Hard 1..14: Radical Axis & Radical Center Coordinates
  for (let i = 0; i < 14; i++) {
    const a = i + 2; // 2..15
    const r1Sq = a + 1;
    const r2Sq = 3 * a + 5;
    // omega1: x^2 + y^2 = r1Sq; omega2: (x - 2a)^2 + y^2 = r2Sq => x^2 - 4ax + 4a^2 + y^2 = r2Sq
    // Subtract: 4a*x - 4a^2 = r1Sq - r2Sq = -2a - 4 => 4a*x = 4a^2 - 2a - 4 => x = (2a^2 - a - 2)/(2a)
    // Make x an exact integer! Pick d = 2a, r1^2 - r2^2 = 4a * k!
    const k = (i % 5) - 1; // -1, 0, 1, 2, 3
    const d = 2 * a;
    const R1sq = 4 * a * a + 4 * a * k + 9;
    const R2sq = 9; // Let's check: x^2 + y^2 = R1sq and (x - 2a)^2 + y^2 = R2sq
    // Subtract: 4a*x - 4a^2 = R1sq - R2sq = 4a^2 + 4ak => 4a*x = 8a^2 + 4ak => x = 2a + k? Wait: then x >= 2a!
    // Let R1sq = 2*a*a + 9, R2sq = 2*a*a - 4*a*(i%3) + 9 > 0!
    const m = i % 3; // 0, 1, 2
    const c1Sq = 2 * a * a + 25;
    const c2Sq = 2 * a * a - 4 * a * m + 25;
    // Subtract: x^2 + y^2 - ((x - 2a)^2 + y^2) = 4ax - 4a^2 = c1Sq - c2Sq = 4am => 4ax = 4a^2 + 4am => x = a + m!
    const xRad = a + m;
    items.push(makeItem({
      idx: idx++, topicId: TOP6, domain: DOM6, difficulty: 'hard', subskill: 1,
      archetype: 'Radical Axis Linear Locus',
      text: `In the Cartesian plane, circle \\( \\omega_1 \\) has equation \\( x^2 + y^2 = ${c1Sq} \\) and circle \\( \\omega_2 \\) has equation \\( (x - ${2 * a})^2 + y^2 = ${c2Sq} \\). Their radical axis (the locus of points having equal power with respect to \\( \\omega_1 \\) and \\( \\omega_2 \\)) is the vertical line \\( x = x_0 \\). Find \\( x_0 \\).`,
      correctVal: String(xRad),
      distractors: [String(a), String(a - m - 1), String(2 * a - m)],
      sol: `Equating powers \\( (x^2 + y^2 - ${c1Sq}) = ((x - ${2 * a})^2 + y^2 - ${c2Sq}) \\) cancels \\( x^2 + y^2 \\) and leaves \\[ ${4 * a}x - ${4 * a * a} = ${c1Sq - c2Sq} \\implies ${4 * a}x = ${4 * a * xRad} \\implies x_0 = ${xRad}. \\]`,
      hints: [
        `Recall the power of \\( (x, y) \\) with respect to \\( (x - h)^2 + (y - k)^2 = R^2 \\) is \\( (x - h)^2 + (y - k)^2 - R^2 \\).`,
        `Subtract the two circle equations so \\( x^2 + y^2 \\) cancels: \\( ${4 * a}x - ${4 * a * a} = ${c1Sq} - ${c2Sq} \\).`,
        `Solve the linear equation for \\( x_0 = ${xRad} \\).`
      ]
    }));
  }

  // Hard 15..28: Brahmagupta's Cyclic Quadrilateral Area Formula
  const brahBase = [
    [1, 4, 7, 8, 18],
    [2, 5, 5, 8, 20],
    [7, 15, 20, 24, 234],
    [4, 5, 10, 11, 48], // s=15: 14*10*5*4 = 2800? Wait: let's verify every tuple programmatically!
    [2, 7, 11, 12, 42]
  ];
  // Build 14 verified integer-area cyclic quadrilaterals by scaling exact Brahmagupta primitives!
  const brahPrims = [
    [1, 4, 7, 8, 18],      // s=10: 9*6*3*2 = 324 = 18^2
    [2, 5, 5, 8, 20],      // s=10: 8*5*5*2 = 400 = 20^2
    [1, 5, 5, 7, 12],      // s=9:  8*4*4*2 = 256 = 16^2! Let's compute dynamically!
    [3, 5, 9, 11, 48],     // s=14: 11*9*5*3? 1485 no
    [7, 15, 20, 24, 234]   // s=33: 26*18*13*9 = 54756 = 234^2
  ];
  const validPrims = [
    [1, 4, 7, 8],    // s=10 => sqrt(9*6*3*2) = 18
    [2, 5, 5, 8],    // s=10 => sqrt(8*5*5*2) = 20
    [1, 5, 5, 7],    // s=9  => sqrt(8*4*4*2) = 16
    [4, 7, 9, 12],   // s=16 => sqrt(12*9*7*4)? no. Let's check [3, 4, 3, 4] (rectangle, area 12) or [5, 5, 2, 8] or [7, 15, 20, 24]!
    [7, 15, 20, 24], // s=33 => 234
    [2, 9, 11, 14]   // s=18 => sqrt(16*9*7*4)? no; let's check [3, 8, 13, 14]: s=19 => 16*11*6*5 no; [1, 8, 9, 14]: s=16 => 15*8*7*2 no; [4, 13, 14, 15]?
  ];
  // Let's find exact integer Brahmagupta quads dynamically right here!
  const exactQuads = [];
  for (let a = 1; a <= 15 && exactQuads.length < 14; a++) {
    for (let b = a; b <= 18 && exactQuads.length < 14; b++) {
      for (let c = b; c <= 20 && exactQuads.length < 14; c++) {
        for (let d = Math.max(c, 1); d < a + b + c && d <= 24 && exactQuads.length < 14; d++) {
          if ((a + b + c + d) % 2 !== 0) continue;
          if (a === c && b === d) continue; // skip plain rectangles!
          const s = (a + b + c + d) / 2;
          const prod = (s - a) * (s - b) * (s - c) * (s - d);
          if (prod <= 0) continue;
          const rt = Math.round(Math.sqrt(prod));
          if (rt * rt === prod) exactQuads.push([a, b, c, d, s, rt]);
        }
      }
    }
  }
  for (let i = 0; i < 14; i++) {
    const [a, b, c, d, s, area] = exactQuads[i];
    items.push(makeItem({
      idx: idx++, topicId: TOP6, domain: DOM6, difficulty: 'hard', subskill: 2,
      archetype: 'Brahmagupta Cyclic Quadrilateral Area',
      text: `A cyclic quadrilateral \\( ABCD \\) is inscribed in a circle and has side lengths \\( ${a},\\; ${b},\\; ${c},\\; ${d} \\). Using Brahmagupta's formula, find the exact area \\( [ABCD] \\).`,
      correctVal: String(area),
      distractors: [String(area + s), String(Math.max(4, area - (s - d))), String((a * c + b * d) / 2 | 0)],
      sol: `The semiperimeter is \\( s = \\frac{${a} + ${b} + ${c} + ${d}}{2} = ${s} \\). By Brahmagupta's theorem for a cyclic quadrilateral, \\[ [ABCD] = \\sqrt{(s - a)(s - b)(s - c)(s - d)} = \\sqrt{${s - a} \\cdot ${s - b} \\cdot ${s - c} \\cdot ${s - d}} = \\sqrt{${area * area}} = ${area}. \\]`,
      hints: [
        `Compute the semiperimeter \\( s = \\frac{${a} + ${b} + ${c} + ${d}}{2} = ${s} \\).`,
        `Evaluate the four factors \\( s - a = ${s - a},\\; s - b = ${s - b},\\; s - c = ${s - c},\\; s - d = ${s - d} \\).`,
        `Take the square root of their product \\( ${area * area} \\) to obtain \\( ${area} \\).`
      ]
    }));
  }

  // Hard 29..40: Descartes Circle Theorem (Soddy Kiss-Precise Inner Curvature)
  // k4 = k1 + k2 + k3 + 2 * sqrt(k1*k2 + k2*k3 + k3*k1) where k1*k2 + k2*k3 + k3*k1 = m^2!
  const soddyTriples = [
    [1, 2, 2], [1, 2, 3], [2, 3, 6], [1, 4, 4], [1, 3, 6], [2, 2, 5], // check: 2*2 + 2*5 + 5*2 = 24 no!
  ];
  const exactSoddy = [];
  for (let k1 = 1; k1 <= 12 && exactSoddy.length < 12; k1++) {
    for (let k2 = k1; k2 <= 18 && exactSoddy.length < 12; k2++) {
      for (let k3 = k2; k3 <= 30 && exactSoddy.length < 12; k3++) {
        const val = k1 * k2 + k2 * k3 + k3 * k1;
        const rt = Math.round(Math.sqrt(val));
        if (rt * rt === val) exactSoddy.push([k1, k2, k3, rt]);
      }
    }
  }
  for (let i = 0; i < 12; i++) {
    const [k1, k2, k3, rt] = exactSoddy[i];
    const k4 = k1 + k2 + k3 + 2 * rt;
    items.push(makeItem({
      idx: idx++, topicId: TOP6, domain: DOM6, difficulty: 'hard', subskill: 3,
      archetype: 'Descartes Circle Curvature Theorem',
      text: `Three circles are mutually externally tangent with curvatures (reciprocals of radii, \\( k_i = 1/r_i \\)) equal to \\( k_1 = ${k1},\\; k_2 = ${k2},\\; k_3 = ${k3} \\). A fourth small circle is tucked inside the curvilinear triangle between them, externally tangent to all three. By Descartes' Circle Theorem, what is its curvature \\( k_4 \\)?`,
      correctVal: String(k4),
      distractors: [String(k1 + k2 + k3 + rt), String(Math.abs(k1 + k2 + k3 - 2 * rt)), String(k1 + k2 + k3)],
      sol: `By Descartes' Circle Theorem, \\( (k_1 + k_2 + k_3 + k_4)^2 = 2(k_1^2 + k_2^2 + k_3^2 + k_4^2) \\), whose inner tangent solution is \\[ k_4 = k_1 + k_2 + k_3 + 2\\sqrt{k_1 k_2 + k_2 k_3 + k_3 k_1} = ${k1 + k2 + k3} + 2\\sqrt{${rt * rt}} = ${k4}. \\]`,
      hints: [
        `Recall Descartes' relation \\( k_4 = k_1 + k_2 + k_3 + 2\\sqrt{k_1 k_2 + k_2 k_3 + k_3 k_1} \\) for the inner Soddy circle.`,
        `Compute \\( k_1 k_2 + k_2 k_3 + k_3 k_1 = ${k1 * k2} + ${k2 * k3} + ${k3 * k1} = ${rt * rt} \\).`,
        `Evaluate \\( ${k1 + k2 + k3} + 2(${rt}) = ${k4} \\).`
      ]
    }));
  }

  // =========================================================================
  // CHAPTER 7: ol-triangle-centers-trig (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM7 = 'Triangle Centers, Ceva, Menelaus & Stewart';
  const TOP7 = 'ol-triangle-centers-trig';

  // Easy 1..14: Ceva's Theorem & Mass Points
  const cevaCfg = [
    [1, 2, 1, 3], [2, 3, 1, 4], [3, 4, 2, 5], [1, 4, 3, 2], [2, 5, 3, 4], [3, 5, 1, 2], [4, 5, 2, 3],
    [1, 3, 2, 5], [3, 2, 5, 4], [2, 7, 7, 3], [5, 2, 3, 5], [3, 7, 2, 3], [4, 3, 5, 2], [5, 6, 3, 4]
  ];
  for (let i = 0; i < 14; i++) {
    const [p, q, u, v] = cevaCfg[i];
    // (AF/FB)*(p/q)*(u/v) = 1 => AF/FB = (q*v)/(p*u)
    const corr = fracTex(q * v, p * u);
    const fig = {
      type: 'triangle',
      labels: ['B', 'C', 'A'],
      sides: ['BC', 'CA', 'AB']
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP7, domain: DOM7, difficulty: 'easy', subskill: 1,
      archetype: 'Ceva Concurrent Ratio & Mass Points',
      text: `In \\( \\triangle ABC \\) shown, points \\( D \\in BC \\), \\( E \\in CA \\), and \\( F \\in AB \\) are chosen so that the cevians \\( AD, BE, CF \\) concur at an interior point \\( P \\). Given \\( \\frac{BD}{DC} = \\frac{${p}}{${q}} \\) and \\( \\frac{CE}{EA} = \\frac{${u}}{${v}} \\), find \\( \\frac{AF}{FB} \\).`,
      correctVal: corr,
      distractors: [fracTex(p * u, q * v), fracTex(p * v, q * u), fracTex(q + v, p + u)],
      sol: `By Ceva's Theorem on concurrent cevians \\( AD, BE, CF \\), \\[ \\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = 1 \\implies \\frac{AF}{FB} \\cdot \\frac{${p}}{${q}} \\cdot \\frac{${u}}{${v}} = 1 \\implies \\frac{AF}{FB} = ${corr}. \\]`,
      hints: [
        `Write Ceva's cyclic product around \\( \\triangle ABC \\): \\( \\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = 1 \\).`,
        `Substitute \\( \\frac{BD}{DC} = \\frac{${p}}{${q}} \\) and \\( \\frac{CE}{EA} = \\frac{${u}}{${v}} \\).`,
        `Invert the product \\( \\frac{${p * u}}{${q * v}} \\) and simplify to \\( ${corr} \\).`
      ],
      fig
    }));
  }

  // Easy 15..28: Angle Bisector Theorem BD = a*c / (b + c)
  const bisCfg = [
    [6, 9, 10], [8, 12, 15], [7, 14, 12], [10, 15, 20], [9, 12, 14], [12, 16, 21], [10, 14, 18],
    [15, 20, 14], [8, 10, 9], [12, 18, 15], [9, 15, 16], [14, 21, 15], [16, 24, 25], [11, 22, 18]
  ];
  for (let i = 0; i < 14; i++) {
    const [c, b, a] = bisCfg[i];
    const corr = fracTex(a * c, b + c);
    const fig = {
      type: 'angle_bisector',
      labels: ['A', 'B', 'C', 'D'],
      sides: { ab: String(c), ac: String(b), bd: '?', dc: '?' }
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP7, domain: DOM7, difficulty: 'easy', subskill: 2,
      archetype: 'Internal Angle Bisector Theorem',
      text: `In \\( \\triangle ABC \\) shown, the internal angle bisector of \\( \\angle BAC \\) meets side \\( BC \\) at \\( D \\). If \\( AB = ${c} \\), \\( AC = ${b} \\), and \\( BC = ${a} \\), find the exact segment length \\( BD \\).`,
      correctVal: corr,
      distractors: [fracTex(a * b, b + c), fracTex(a * c, b), fracTex(b + c, a)],
      sol: `By the Angle Bisector Theorem, \\( \\frac{BD}{DC} = \\frac{AB}{AC} = \\frac{${c}}{${b}} \\). Since \\( BD + DC = BC = ${a} \\), \\[ BD = \\frac{${c}}{${c} + ${b}} \\cdot ${a} = ${corr}. \\]`,
      hints: [
        `By the Angle Bisector Theorem, \\( D \\) divides \\( BC \\) in the ratio \\( BD : DC = AB : AC = ${c} : ${b} \\).`,
        `Express \\( BD \\) as the fraction \\( \\frac{${c}}{${c} + ${b}} \\) of the total base \\( BC = ${a} \\).`,
        `Simplify \\( \\frac{${a * c}}{${b + c}} = ${corr} \\).`
      ],
      fig
    }));
  }

  // Easy 29..40: Inradius r = Delta / s on Heronian & Right Triangles
  const inradCfg = [
    [6, 8, 10], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41], [12, 16, 20],
    [13, 14, 15], [10, 17, 21], [13, 20, 21], [15, 20, 25], [20, 21, 29], [26, 28, 30]
  ];
  for (let i = 0; i < 12; i++) {
    const [a, b, c] = inradCfg[i];
    const s = (a + b + c) / 2;
    const area = Math.round(Math.sqrt(s * (s - a) * (s - b) * (s - c)));
    const r = fracTex(area, s);
    items.push(makeItem({
      idx: idx++, topicId: TOP7, domain: DOM7, difficulty: 'easy', subskill: 3,
      archetype: 'Heron Area & Inradius Identity',
      text: `Triangle \\( ABC \\) has side lengths \\( a = ${a},\\; b = ${b},\\; c = ${c} \\). Using \\( \\Delta = r \\cdot s \\), find the exact inradius \\( r \\) of its inscribed circle.`,
      correctVal: r,
      distractors: [fracTex(2 * area, s), fracTex(area, 2 * s), String(Number(r) + 2 || s - c)],
      sol: `The semiperimeter is \\( s = \\frac{${a} + ${b} + ${c}}{2} = ${s} \\). By Heron's formula, \\( \\Delta = \\sqrt{${s}(${s - a})(${s - b})(${s - c})} = ${area} \\). Dividing by \\( s \\) gives \\( r = \\frac{\\Delta}{s} = \\frac{${area}}{${s}} = ${r} \\).`,
      hints: [
        `Compute the semiperimeter \\( s = \\frac{${a} + ${b} + ${c}}{2} = ${s} \\).`,
        `Find the area \\( \\Delta = \\sqrt{s(s-a)(s-b)(s-c)} = ${area} \\).`,
        `Apply \\( r = \\frac{\\Delta}{s} = ${r} \\).`
      ]
    }));
  }

  // Medium 1..14: Menelaus Collinearity Theorem
  for (let i = 0; i < 14; i++) {
    const bd = (i % 4) + 5; // BD on extension of BC: D is beyond C, so BD = BC + CD!
    const cd = (i % 3) + 2; // Let BC = bd - cd > 0, BD = bd, DC = cd!
    const bc = bd - cd;
    const af = (i % 5) + 2;
    const fb = Math.floor(i / 3) + 2;
    // Menelaus: (AF/FB) * (BD/DC) * (CE/EA) = 1 => CE/EA = (FB * DC) / (AF * BD)
    const corr = fracTex(fb * cd, af * bd);
    items.push(makeItem({
      idx: idx++, topicId: TOP7, domain: DOM7, difficulty: 'medium', subskill: 1,
      archetype: 'Menelaus Collinearity Transversal',
      text: `Point \\( D \\) lies on the extension of side \\( BC \\) of \\( \\triangle ABC \\) beyond \\( C \\) such that \\( BC = ${bc} \\) and \\( CD = ${cd} \\). A line through \\( D \\) intersects segment \\( AB \\) at \\( F \\) with \\( \\frac{AF}{FB} = \\frac{${af}}{${fb}} \\) and intersects segment \\( AC \\) at \\( E \\). By Menelaus's Theorem, find \\( \\frac{CE}{EA} \\).`,
      correctVal: corr,
      distractors: [fracTex(fb * cd, af * bc), fracTex(af * bd, fb * cd), fracTex(fb * bc, af * bd)],
      sol: `First note the full exterior distance \\( BD = BC + CD = ${bc} + ${cd} = ${bd} \\) (using \\( BC \\) instead of \\( BD \\) is the classic Menelaus error). Applying Menelaus's Theorem to \\( \\triangle ABC \\) and transversal \\( F-E-D \\) gives \\[ \\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = 1 \\implies \\frac{${af}}{${fb}} \\cdot \\frac{${bd}}{${cd}} \\cdot \\frac{CE}{EA} = 1 \\implies \\frac{CE}{EA} = ${corr}. \\]`,
      hints: [
        `Carefully compute \\( BD = BC + CD = ${bc} + ${cd} = ${bd} \\) before writing the Menelaus ratio.`,
        `Apply Menelaus's Theorem around \\( \\triangle ABC \\): \\( \\frac{AF}{FB} \\cdot \\frac{BD}{DC} \\cdot \\frac{CE}{EA} = 1 \\).`,
        `Solve \\( \\frac{CE}{EA} = \\frac{${fb} \\cdot ${cd}}{${af} \\cdot ${bd}} = ${corr} \\).`
      ]
    }));
  }

  // Medium 15..28: Stewart's Theorem & Apollonius Median Length 4*m_a^2 = 2b^2 + 2c^2 - a^2
  for (let i = 0; i < 14; i++) {
    // Construct clean Stewart configuration: a = m + n, dad + man = bmb + cnc
    const m = (i % 3) + 2;  // BD
    const n = (i % 4) + 3;  // DC
    const a = m + n;
    const c = a + (i % 5) + 1;
    const b = a + Math.floor(i / 3) + 2;
    // Ask for exact rational or integer value of a * d^2 = b^2 * m + c^2 * n - a * m * n!
    const ad2 = b * b * m + c * c * n - a * m * n;
    const dSq = fracTex(ad2, a);
    const fig = {
      type: 'triangle',
      labels: ['B', 'C', 'A'],
      sides: [String(a), String(b), String(c)]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP7, domain: DOM7, difficulty: 'medium', subskill: 2,
      archetype: 'Stewart Theorem Cevian Squared Length',
      text: `In \\( \\triangle ABC \\) shown, \\( BC = ${a} \\), \\( CA = ${b} \\), and \\( AB = ${c} \\). Point \\( D \\) lies on side \\( BC \\) with \\( BD = ${m} \\) and \\( DC = ${n} \\). Using Stewart's Theorem, compute \\( AD^2 \\).`,
      correctVal: dSq,
      distractors: [fracTex(b * b * m + c * c * n, a), fracTex(b * b * n + c * c * m - a * m * n, a), fracTex(ad2 + a * m * n, a)],
      sol: `Let \\( d = AD \\). By Stewart's Theorem (\\( b^2 m + c^2 n = a(d^2 + mn) \\)), where \\( b = CA = ${b} \\) is opposite \\( B \\) (paired with \\( m = BD = ${m} \\)? Wait: let's verify! In Stewart's \\( man + dad = bmb + cnc \\), \\( b = AC \\) is opposite \\( B \\), so \\( b^2 \\) multiplies \\( m = BD \\)! Let's verify via cosine law at \\( D \\): \\( c^2 = d^2 + m^2 - 2dm\\cos\\theta \\) and \\( b^2 = d^2 + n^2 + 2dn\\cos\\theta \\). Multiply first by \\( n \\) and second by \\( m \\): \\( c^2 n + b^2 m = (m+n)d^2 + mn(m+n) = a(d^2 + mn) \\) — verified!). Substituting gives \\( ${a} d^2 = ${b}^2(${m}) + ${c}^2(${n}) - ${a}(${m})(${n}) = ${ad2} \\), so \\( AD^2 = ${dSq} \\).`,
      hints: [
        `Apply Stewart's identity \\( b^2 m + c^2 n = a(d^2 + mn) \\), pairing \\( c = AB = ${c} \\) with \\( n = DC = ${n} \\) and \\( b = AC = ${b} \\) with \\( m = BD = ${m} \\).`,
        `Compute \\( ${b}^2(${m}) + ${c}^2(${n}) - ${a}(${m})(${n}) = ${ad2} \\).`,
        `Divide by \\( a = ${a} \\) to get \\( AD^2 = ${dSq} \\).`
      ],
      fig
    }));
    // Clean up the inline verification note in `sol` so it reads like a polished examiner mark scheme!
    items[items.length - 1].sol = `Let \\( d = AD \\). Applying the Law of Cosines to supplementary angles at \\( D \\) yields Stewart's Theorem \\[ AC^2 \\cdot BD + AB^2 \\cdot DC = BC(AD^2 + BD \\cdot DC). \\] Substituting \\( ${b}^2(${m}) + ${c}^2(${n}) = ${a}(d^2 + ${m}\\cdot ${n}) \\) gives \\( ${a}d^2 = ${ad2} \\), hence \\( AD^2 = ${dSq} \\).`;
    items[items.length - 1].solution = items[items.length - 1].sol;
  }

  // Medium 29..40: Circumradius R = abc / (4 * Delta) on Heronian Triangles
  const heronCfg = [
    [13, 14, 15], [10, 17, 21], [13, 20, 21], [15, 26, 37], [9, 10, 17], [7, 15, 20],
    [26, 28, 30], [20, 34, 42], [25, 29, 36], [17, 25, 28], [13, 13, 10], [17, 17, 16]
  ];
  for (let i = 0; i < 12; i++) {
    const [a, b, c] = heronCfg[i];
    const s = (a + b + c) / 2;
    const area = Math.round(Math.sqrt(s * (s - a) * (s - b) * (s - c)));
    const corr = fracTex(a * b * c, 4 * area);
    items.push(makeItem({
      idx: idx++, topicId: TOP7, domain: DOM7, difficulty: 'medium', subskill: 3,
      archetype: 'Circumradius Extended Sine-Area Formula',
      text: `Find the exact circumradius \\( R \\) of \\( \\triangle ABC \\) with side lengths \\( a = ${a},\\; b = ${b},\\; c = ${c} \\).`,
      correctVal: corr,
      distractors: [fracTex(a * b * c, 2 * area), fracTex(area, s), fracTex(a * b * c, area)],
      sol: `First compute semiperimeter \\( s = ${s} \\) and Heron area \\( \\Delta = \\sqrt{${s}(${s - a})(${s - b})(${s - c})} = ${area} \\). By \\( R = \\frac{abc}{4\\Delta} \\), we obtain \\( R = \\frac{${a} \\cdot ${b} \\cdot ${c}}{4 \\cdot ${area}} = ${corr} \\).`,
      hints: [
        `Calculate the semiperimeter \\( s = ${s} \\) and area \\( \\Delta = ${area} \\) via Heron's formula.`,
        `Recall \\( \\Delta = \\frac{abc}{4R} \\) from \\( \\frac{1}{2}bc\\sin A \\) and \\( \\sin A = \\frac{a}{2R} \\).`,
        `Evaluate \\( R = \\frac{${a * b * c}}{${4 * area}} = ${corr} \\).`
      ]
    }));
  }

  // Hard 1..14: Euler's Distance OI^2 = R(R - 2r)
  for (let i = 0; i < 14; i++) {
    const r = (i % 5) + 2; // 2..6
    const extra = i + 1;   // R - 2r >= 1
    const R = 2 * r + extra;
    const oiSq = R * extra;
    items.push(makeItem({
      idx: idx++, topicId: TOP7, domain: DOM7, difficulty: 'hard', subskill: 1,
      archetype: 'Euler Triangle OI Distance Theorem',
      text: `In \\( \\triangle ABC \\), the circumcircle \\( (O) \\) has radius \\( R = ${R} \\) and the incircle \\( (I) \\) has radius \\( r = ${r} \\). By Euler's Theorem in geometry, what is the exact squared distance \\( OI^2 \\) between the circumcenter and incenter?`,
      correctVal: String(oiSq),
      distractors: [String(R * R - 2 * R * r + r * r), String(R * (R - r)), String((R - r) * (R - r))],
      sol: `By Euler's Triangle Theorem (proved by Power of Point \\( I \\) with respect to \\( (O) \\) and Fact 5 on the arc midpoint), \\[ OI^2 = R(R - 2r) = ${R}(${R} - 2 \\cdot ${r}) = ${R} \\cdot ${extra} = ${oiSq}. \\]`,
      hints: [
        `Recall Euler's formula relating circumradius \\( R \\) and inradius \\( r \\): \\( OI^2 = R^2 - 2Rr = R(R - 2r) \\).`,
        `Check Euler's inequality \\( R \\ge 2r \\): here \\( R - 2r = ${R} - ${2 * r} = ${extra} > 0 \\).`,
        `Multiply \\( ${R} \\times ${extra} = ${oiSq} \\).`
      ]
    }));
  }

  // Hard 15..28: Internal Angle Bisector Length Squared t_a^2 = bc(1 - a^2/(b+c)^2)
  const bisLenCfg = [
    [4, 6, 5], [5, 7, 6], [6, 8, 7], [6, 9, 5], [7, 8, 5], [8, 12, 10], [9, 11, 10],
    [9, 15, 12], [10, 14, 12], [10, 15, 10], [12, 16, 14], [12, 18, 15], [14, 16, 15], [15, 20, 14]
  ];
  for (let i = 0; i < 14; i++) {
    const [c, b, a] = bisLenCfg[i];
    const sumBC = b + c;
    const num = b * c * (sumBC * sumBC - a * a);
    const den = sumBC * sumBC;
    const corr = fracTex(num, den);
    items.push(makeItem({
      idx: idx++, topicId: TOP7, domain: DOM7, difficulty: 'hard', subskill: 2,
      archetype: 'Angle Bisector Length Formula',
      text: `In \\( \\triangle ABC \\), \\( AB = ${c} \\), \\( AC = ${b} \\), and \\( BC = ${a} \\). Let \\( AD \\) be the internal angle bisector of \\( \\angle BAC \\) with \\( D \\in BC \\). Compute the exact value of \\( AD^2 \\).`,
      correctVal: corr,
      distractors: [fracTex(b * c * a * a, den), fracTex(b * c, 2), fracTex(num + b * c * a, den)],
      sol: `By the Angle Bisector Theorem, \\( BD = \\frac{${a}\\cdot ${c}}{${sumBC}} \\) and \\( DC = \\frac{${a}\\cdot ${b}}{${sumBC}} \\). Combining with Stewart's Theorem gives the classic identity \\[ AD^2 = AB \\cdot AC - BD \\cdot DC = ${b}\\cdot ${c}\\left(1 - \\frac{${a}^2}{${sumBC}^2}\\right) = ${corr}. \\]`,
      hints: [
        `Use the Olympiad identity \\( AD^2 = AB \\cdot AC - BD \\cdot DC \\) derived from Stewart's Theorem (or cyclic chord extension).`,
        `Substitute \\( BD = \\frac{ac}{b+c} \\) and \\( DC = \\frac{ab}{b+c} \\) so \\( AD^2 = bc\\left(1 - \\frac{a^2}{(b+c)^2}\\right) \\).`,
        `Evaluate \\( ${b} \\cdot ${c} \\cdot \\frac{${sumBC}^2 - ${a}^2}{${sumBC}^2} = ${corr} \\).`
      ]
    }));
  }

  // Hard 29..40: Routh's Theorem Symmetric Area Ratio [PQR] / [ABC] = (k - 1)^2 / (k^2 + k + 1)
  for (let i = 0; i < 12; i++) {
    const k = i + 2; // 2..13
    const areaBig = (k * k + k + 1) * ((i % 2) + 1);
    const areaInner = (k - 1) * (k - 1) * ((i % 2) + 1);
    const fig = {
      type: 'triangle',
      labels: ['B', 'C', 'A'],
      sides: ['BC', 'CA', 'AB']
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP7, domain: DOM7, difficulty: 'hard', subskill: 3,
      archetype: 'Routh Theorem Central Cevian Triangle Area',
      text: `Triangle \\( ABC \\) (shown) has area \\( ${areaBig} \\). Points \\( D \\in BC \\), \\( E \\in CA \\), and \\( F \\in AB \\) divide the sides cyclically in the same ratio \\( \\frac{BD}{DC} = \\frac{CE}{EA} = \\frac{AF}{FB} = ${k} \\). The cevians \\( AD, BE, CF \\) enclose an interior triangle \\( \\triangle PQR \\). What is the exact area \\( [PQR] \\)?`,
      correctVal: String(areaInner),
      distractors: [String(k * k * ((i % 2) + 1)), String((k * k - 1) * ((i % 2) + 1)), String(Math.max(1, areaBig - 3 * k))],
      sol: `By Routh's Theorem (or subtracting three corner triangles each of area \\( \\frac{${k}}{${k}^2 + ${k} + 1}[ABC] \\) via Menelaus), \\[ \\frac{[PQR]}{[ABC]} = \\frac{(${k} - 1)^2}{${k}^2 + ${k} + 1} = \\frac{${(k - 1) * (k - 1)}}{${k * k + k + 1}}. \\] Multiplying by \\( [ABC] = ${areaBig} \\) yields \\( [PQR] = ${areaInner} \\).`,
      hints: [
        `Apply Menelaus's Theorem (or Routh's Theorem) to find the area of each outer cevian triangle, which is \\( \\frac{k}{k^2 + k + 1}[ABC] \\).`,
        `Subtract the three congruent-ratio outer triangles from \\( 1 \\): \\( 1 - \\frac{3k}{k^2 + k + 1} = \\frac{(k - 1)^2}{k^2 + k + 1} \\).`,
        `Multiply by \\( [ABC] = ${areaBig} \\) at \\( k = ${k} \\) to get \\( ${areaInner} \\).`
      ],
      fig
    }));
  }

  // =========================================================================
  // CHAPTER 8: ol-invariants-extremal (120 Qs: 40 easy, 40 medium, 40 hard)
  // =========================================================================
  const DOM8 = 'Invariants, Monovariants, Coloring & Games';
  const TOP8 = 'ol-invariants-extremal';

  // Easy 1..14: Shifted Sum Invariant (a, b) -> a + b - c on {1, ..., n}
  for (let i = 0; i < 14; i++) {
    const n = i + 10; // 10..23
    const c = (i % 5) + 1;
    const ans = (n * (n + 1)) / 2 - (n - 1) * c;
    items.push(makeItem({
      idx: idx++, topicId: TOP8, domain: DOM8, difficulty: 'easy', subskill: 1,
      archetype: 'Linear Chalkboard Operation Invariant',
      text: `The integers \\( 1, 2, 3, \\dots, ${n} \\) are written on a blackboard. At each step, two numbers \\( a \\) and \\( b \\) are erased and replaced by \\( a + b - ${c} \\). After \\( ${n - 1} \\) steps, a single integer remains. What is that integer?`,
      correctVal: String(ans),
      distractors: [String((n * (n + 1)) / 2 - n * c), String(ans + c), String((n * (n + 1)) / 2)],
      sol: `Notice the quantity \\( I = \\sum (x_i - ${c}) \\) is strictly invariant because \\( (a + b - ${c}) - ${c} = (a - ${c}) + (b - ${c}) \\). Equivalently, each of the \\( ${n - 1} \\) merges decreases the total sum by \\( ${c} \\), so the final number is \\( \\frac{${n}(${n + 1})}{2} - ${n - 1}(${c}) = ${ans} \\).`,
      hints: [
        `Track how the sum \\( S \\) of all numbers on the board changes in a single move \\( \\{a, b\\} \\mapsto a + b - ${c} \\).`,
        `Each move reduces the count of numbers by \\( 1 \\) and reduces \\( S \\) by exactly \\( ${c} \\) (so \\( \\sum(x_i - ${c}) \\) is invariant).`,
        `After \\( ${n - 1} \\) moves from initial sum \\( \\frac{${n}(${n + 1})}{2} \\), the single remaining value is \\( ${ans} \\).`
      ]
    }));
  }

  // Easy 15..28: Parity & Modular Coin/Sign Invariants
  for (let i = 0; i < 14; i++) {
    const total = 2 * i + 15; // odd 15..41
    const negInit = 2 * (i % 5) + 1; // odd number of -1s!
    const kFlip = 2 * ((i % 3) + 1); // flip an even number of signs each step: 2, 4, 6
    // Ask minimum possible number of -1s achievable (since parity of -1s is invariant and odd, min is 1, so max sum of all entries is total - 2!)
    const maxSum = total - 2;
    items.push(makeItem({
      idx: idx++, topicId: TOP8, domain: DOM8, difficulty: 'easy', subskill: 2,
      archetype: 'Parity Product Invariant Optimization',
      text: `Around a circle are written \\( ${total} \\) numbers, each equal to \\( +1 \\) or \\( -1 \\), with exactly \\( ${negInit} \\) of them initially equal to \\( -1 \\). In one move, you may pick any \\( ${kFlip} \\) entries and negate all \\( ${kFlip} \\) of them. What is the **maximum** possible sum of all \\( ${total} \\) numbers around the circle after any sequence of moves?`,
      correctVal: String(maxSum),
      distractors: [String(total), String(total - 4), String(total - 1)],
      sol: `Negating \\( ${kFlip} \\) entries multiplies the total product \\( P = \\prod_{j=1}^{${total}} x_j \\) by \\( (-1)^{${kFlip}} = +1 \\). Since initially there are \\( ${negInit} \\) (an odd number of) \\( -1 \\)'s, \\( P = -1 \\) forever, so we can never reach zero \\( -1 \\)'s! However, reducing pairs of \\( -1 \\)'s leaves a single \\( -1 \\) and \\( ${total - 1} \\) copies of \\( +1 \\), achieving maximum sum \\( ${total - 1} - 1 = ${maxSum} \\).`,
      hints: [
        `Examine the parity of the count of \\( -1 \\)'s (equivalently, the product \\( \\prod x_j \\)) when \\( ${kFlip} \\) signs are flipped.`,
        `Because \\( ${kFlip} \\) is even and \\( ${negInit} \\) is odd, the number of \\( -1 \\)'s is always odd (at least \\( 1 \\)).`,
        `Verify a single \\( -1 \\) is achievable, giving maximum sum \\( (${total} - 1)(+1) + 1(-1) = ${maxSum} \\).`
      ]
    }));
  }

  // Easy 29..40: Cyclic Mod-3 Board Coloring & Tromino Remainder
  for (let i = 0; i < 12; i++) {
    const N = 3 * Math.floor(i / 2) + ((i % 2 === 0) ? 7 : 8); // not divisible by 3: 7,8,10,11,13,14,16,17,19,20,22,23
    // Maximum 1x3 straight trominoes packable on N x N board: floor(N^2 / 3), leaving 1 uncovered cell!
    // Ask: minimum number of unit squares left uncovered when packing non-overlapping 1x3 straight trominoes on an N x N board, OR how many corner positions (out of 4) can that single uncovered square occupy under (r+c) mod 3 & (r-c) mod 3!
    // Even sharper numeric variation: on an M x N board or N x N board, maximum number of non-overlapping 1 x 3 trominoes = (N^2 - 1) / 3!
    const maxTrom = (N * N - 1) / 3;
    const fig = {
      type: 'polygon',
      vertices: [[0, 0], [4, 0], [4, 4], [0, 4]],
      labels: ['(1,1)', `(${N},1)`, `(${N},${N})`, `(1,${N})`],
      sides: [`${N}`, `${N}`, `${N}`, `${N}`]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP8, domain: DOM8, difficulty: 'easy', subskill: 3,
      archetype: 'Modular Grid Coloring Packing Bound',
      text: `An \\( ${N} \\times ${N} \\) square grid (shown schematically) is tiled with as many non-overlapping \\( 1 \\times 3 \\) (or \\( 3 \\times 1 \\)) straight trominoes as possible. What is the maximum number of trominoes that can be placed on the board?`,
      correctVal: String(maxTrom),
      distractors: [String(maxTrom - 1), String(maxTrom + 1), String(N * Math.floor(N / 3))],
      sol: `Since \\( ${N} \\equiv ${N % 3} \\not\\equiv 0 \\pmod{3} \\), \\( ${N}^2 = ${N * N} \\equiv 1 \\pmod{3} \\), so at least \\( 1 \\) cell must remain uncovered, bounding the count by \\( \\frac{${N * N} - 1}{3} = ${maxTrom} \\). Leaving a corner (when \\( ${N} \\equiv 1 \\pmod{3} \\)) or center/valid cyclic cell uncovered partitions the remaining region into \\( 3 \\times k \\) strips, achieving \\( ${maxTrom} \\) trominoes.`,
      hints: [
        `Compute \\( ${N}^2 \\bmod 3 \\): since \\( 3 \\nmid ${N} \\), \\( ${N}^2 \\equiv 1 \\pmod{3} \\).`,
        `Each \\( 1 \\times 3 \\) tromino covers \\( 3 \\) cells, so at most \\( \\lfloor ${N}^2 / 3 \\rfloor = ${maxTrom} \\) can fit.`,
        `Confirm \\( ${maxTrom} \\) is achievable by removing a valid \\( (r \\pm c) \\bmod 3 \\) cell and tiling the residual rectangles.`
      ],
      fig
    }));
  }

  // Medium 1..14: Multiplicative Shifted Invariant (a, b) -> a*b + a + b
  for (let i = 0; i < 14; i++) {
    const s = (i % 4) + 1;  // shift 1..4
    const n = i + 8;        // 8..21 terms: 1/(s+1), 1/(s+2), ..., 1/(s+n)
    // Product of (1 + x_k) for k=1..n is ((s+2)/(s+1)) * ((s+3)/(s+2)) * ... * ((s+n+1)/(s+n)) = (s + n + 1)/(s + 1)
    // Final number is prod(1 + x_k) - 1 = n / (s + 1)!
    const corr = fracTex(n, s + 1);
    items.push(makeItem({
      idx: idx++, topicId: TOP8, domain: DOM8, difficulty: 'medium', subskill: 1,
      archetype: 'Shifted Product Invariant ab + a + b',
      text: `On a chalkboard are written the \\( ${n} \\) fractions \\[ \\frac{1}{${s + 1}},\\; \\frac{1}{${s + 2}},\\; \\dots,\\; \\frac{1}{${s + n}}. \\] Repeatedly, two numbers \\( a \\) and \\( b \\) are erased and replaced by \\( ab + a + b \\) until one number remains. What is the exact final number?`,
      correctVal: corr,
      distractors: [fracTex(s + n + 1, s + 1), fracTex(n, s + 2), fracTex(n + 1, s + 1)],
      sol: `Observe Simon's factorization \\( (ab + a + b) + 1 = (a + 1)(b + 1) \\). Thus the product \\( \\Pi = \\prod (x_k + 1) \\) is strictly invariant! Initially, \\[ \\Pi = \\prod_{k=1}^{${n}} \\left(1 + \\frac{1}{${s} + k}\\right) = \\prod_{k=1}^{${n}} \\frac{${s} + k + 1}{${s} + k} = \\frac{${s + n + 1}}{${s + 1}} \\] by telescoping. Hence the final number \\( x_{\\text{final}} \\) satisfies \\( x_{\\text{final}} + 1 = \\frac{${s + n + 1}}{${s + 1}} \\implies x_{\\text{final}} = ${corr} \\).`,
      hints: [
        `Factor \\( (ab + a + b) + 1 = (a + 1)(b + 1) \\) to discover that \\( \\prod (x_k + 1) \\) never changes.`,
        `Evaluate the initial product \\( \\prod_{k=1}^{${n}} \\frac{${s} + k + 1}{${s} + k} = \\frac{${s + n + 1}}{${s + 1}} \\) by telescoping.`,
        `Subtract \\( 1 \\) from \\( \\frac{${s + n + 1}}{${s + 1}} \\) to obtain \\( ${corr} \\).`
      ]
    }));
  }

  // Medium 15..28: Pile-Splitting Potential Invariant sum C(x_i, 2)
  for (let i = 0; i < 14; i++) {
    const k = (i % 3) + 2; // stop when reduced to k equal piles of size m!
    const m = Math.floor(i / 3) + 3; // 3..7
    const N = k * m;
    const ans = comb(N, 2) - k * comb(m, 2);
    const fig = (i < 12) ? {
      type: 'network_graph',
      title: `Stone-Pile Splitting Potential (N = ${N})`,
      directed: true,
      nodes: [
        { id: 'Root', label: String(N), x: 175, y: 55, highlight: true },
        { id: 'L', label: 'a', x: 95, y: 175 },
        { id: 'R', label: 'b', x: 255, y: 175 }
      ],
      edges: [
        { from: 'Root', to: 'L', label: '+a·b', directed: true },
        { from: 'Root', to: 'R', label: 'a+b=' + N, directed: true }
      ]
    } : null;
    items.push(makeItem({
      idx: idx++, topicId: TOP8, domain: DOM8, difficulty: 'medium', subskill: 2,
      archetype: 'Potential Function Invariant in Splitting Processes',
      text: `You begin with a single pile of \\( ${N} \\) stones${fig ? ' (illustrated)' : ''}. Whenever you split any pile of \\( a + b \\) stones into two smaller piles of \\( a \\) and \\( b \\) stones, you earn \\( a \\cdot b \\) points. Suppose you perform an arbitrary sequence of splits that terminates with exactly \\( ${k} \\) piles of \\( ${m} \\) stones each. What is your total score?`,
      correctVal: String(ans),
      distractors: [String(comb(N, 2)), String(ans + comb(m, 2)), String(k * m * (m - 1))],
      sol: `Note the algebraic identity \\( \\binom{a + b}{2} - \\binom{a}{2} - \\binom{b}{2} = ab \\) (counting pairs with one stone in each sub-pile). Thus \\( \\text{Score} + \\sum \\binom{x_i}{2} \\) is a strict invariant equal to \\( \\binom{${N}}{2} = ${comb(N, 2)} \\). Stopping at \\( ${k} \\) piles of size \\( ${m} \\) gives \\( \\text{Score} = \\binom{${N}}{2} - ${k}\\binom{${m}}{2} = ${comb(N, 2)} - ${k * comb(m, 2)} = ${ans} \\).`,
      hints: [
        `Interpret \\( a \\cdot b \\) combinatorially as the number of stone pairs separated by the split \\( (a + b) \\to (a, b) \\).`,
        `Thus \\( \\text{Score} + \\sum \\binom{x_i}{2} = \\binom{${N}}{2} \\) is invariant regardless of how splits are chosen.`,
        `Compute \\( \\binom{${N}}{2} - ${k}\\binom{${m}}{2} = ${ans} \\).`
      ],
      fig
    }));
  }

  // Medium 29..40: Bachet Subtraction Game S = {1, ..., k} P-Position Count
  for (let i = 0; i < 12; i++) {
    const k = (i % 5) + 3; // 3..7 => period k+1 = 4..8
    const M = 40 + 7 * i;  // pile range 1..M
    const ans = Math.floor(M / (k + 1));
    const fig = {
      type: 'network_graph',
      title: `Subtraction Game S = {1, ..., ${k}} mod ${k + 1}`,
      directed: true,
      nodes: [
        { id: 'P0', label: '0 (P)', x: 60, y: 125, highlight: true },
        { id: 'N1', label: '1..k (N)', x: 185, y: 125 },
        { id: 'Pk', label: `${k + 1} (P)`, x: 300, y: 125, highlight: true }
      ],
      edges: [
        { from: 'N1', to: 'P0', label: 'move to 0', directed: true },
        { from: 'Pk', to: 'N1', label: '-1..-k', directed: true }
      ]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP8, domain: DOM8, difficulty: 'medium', subskill: 3,
      archetype: 'Impartial Subtraction Game P-Positions',
      text: `In a two-player impartial subtraction game (illustrated), a pile starts with \\( n \\) stones (\\( 1 \\le n \\le ${M} \\)), and on each turn a player removes between \\( 1 \\) and \\( ${k} \\) stones inclusive. The player who takes the last stone wins. For how many starting sizes \\( n \\in \\{1, 2, \\dots, ${M}\\} \\) does the **second** player have a guaranteed winning strategy (i.e., \\( n \\) is a P-position)?`,
      correctVal: String(ans),
      distractors: [String(ans + 1), String(Math.floor(M / k)), String(M - ans)],
      sol: `By induction, \\( n = 0 \\) is losing (P-position), \\( 1, \\dots, ${k} \\) can move to \\( 0 \\) (N-positions), and \\( ${k + 1} \\) is forced into \\( \\{1, \\dots, ${k}\\} \\) (P-position). Repeating modulo \\( ${k + 1} \\), \\( n \\) is a P-position iff \\( (${k + 1}) \\mid n \\). In \\( \\{1, \\dots, ${M}\\} \\), there are \\( \\lfloor ${M} / ${k + 1} \\rfloor = ${ans} \\) such multiples.`,
      hints: [
        `Classify small positions \\( n = 0, 1, \\dots, ${k + 1} \\) into N-positions (first player wins) and P-positions (second player wins).`,
        `Prove by induction that \\( n \\) is a P-position iff \\( n \\equiv 0 \\pmod{${k + 1}} \\) (since the second player can mirror each move \\( r \\) with \\( ${k + 1} - r \\)).`,
        `Count multiples of \\( ${k + 1} \\) in \\( [1, ${M}] \\): \\( \\lfloor ${M}/${k + 1} \\rfloor = ${ans} \\).`
      ],
      fig
    }));
  }

  // Hard 1..14: Bouton's Three-Heap Nim Winning Move Size
  const nimHeaps = [
    [3, 5, 7], [4, 7, 9], [5, 8, 11], [6, 9, 13], [7, 10, 14], [5, 9, 15], [6, 11, 14],
    [8, 11, 15], [9, 12, 14], [7, 12, 13], [10, 13, 15], [6, 10, 15], [9, 11, 13], [11, 13, 14]
  ];
  for (let i = 0; i < 14; i++) {
    const [h1, h2, h3] = nimHeaps[i];
    const xorAll = h1 ^ h2 ^ h3;
    // Find stones removed from the LARGEST heap h3 (verify (h3 ^ xorAll) < h3)!
    // Wait: let's find the largest heap index that satisfies (h_j ^ xorAll) < h_j!
    const arr = [h1, h2, h3];
    let winHeapIdx = 2;
    for (let j = 2; j >= 0; j--) {
      if ((arr[j] ^ xorAll) < arr[j]) { winHeapIdx = j; break; }
    }
    const chosenHeap = arr[winHeapIdx];
    const targetLeft = chosenHeap ^ xorAll;
    const removed = chosenHeap - targetLeft;
    const heapName = ['first', 'second', 'third'][winHeapIdx];
    const fig = {
      type: 'network_graph',
      title: `Three-Heap Nim (${h1}, ${h2}, ${h3})`,
      directed: false,
      nodes: [
        { id: 'H1', label: `H₁=${h1}`, x: 70, y: 130, highlight: winHeapIdx === 0 },
        { id: 'H2', label: `H₂=${h2}`, x: 175, y: 130, highlight: winHeapIdx === 1 },
        { id: 'H3', label: `H₃=${h3}`, x: 280, y: 130, highlight: winHeapIdx === 2 }
      ],
      edges: [
        { from: 'H1', to: 'H2', label: '⊕' },
        { from: 'H2', to: 'H3', label: '⊕' }
      ]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP8, domain: DOM8, difficulty: 'hard', subskill: 1,
      archetype: 'Bouton Nim XOR Winning Reduction',
      text: `In normal-play Nim with three heaps of sizes \\( (${h1},\\; ${h2},\\; ${h3}) \\) (illustrated), a winning move exists on the ${heapName} heap (size \\( ${chosenHeap} \\)). How many stones must the first player **remove** from that heap of size \\( ${chosenHeap} \\) to leave a balanced Nim-sum \\( 0 \\) position?`,
      correctVal: String(removed),
      distractors: [String(targetLeft || (removed + 1)), String(xorAll === removed ? removed + 2 : xorAll), String(removed + 1)],
      sol: `Compute the binary Nim-sum \\( X = ${h1} \\oplus ${h2} \\oplus ${h3} = ${xorAll} \\). To restore Nim-sum \\( 0 \\) by playing on the heap of size \\( ${chosenHeap} \\), its new size must be \\( ${chosenHeap} \\oplus ${xorAll} = ${targetLeft} < ${chosenHeap} \\). Therefore, the player must remove \\( ${chosenHeap} - ${targetLeft} = ${removed} \\) stones.`,
      hints: [
        `Compute the bitwise XOR \\( X = ${h1} \\oplus ${h2} \\oplus ${h3} = ${xorAll} \\) in binary.`,
        `To zero out \\( X \\), reduce the heap of size \\( ${chosenHeap} \\) to \\( ${chosenHeap} \\oplus ${xorAll} = ${targetLeft} \\).`,
        `Subtract \\( ${chosenHeap} - ${targetLeft} = ${removed} \\) (do not confuse stones remaining with stones removed!).`
      ],
      fig
    }));
  }

  // Hard 15..28: Sprague-Grundy Sum of Two Restricted Subtraction Games S = {1, 3, 4} (period 7: [0,1,0,1,2,3,2])
  const sg7 = [0, 1, 0, 1, 2, 3, 2];
  for (let i = 0; i < 14; i++) {
    const a = 7 + 2 * i;       // heap 1 size
    const N = 14 + 3 * i;      // count b in {1..N} such that (a, b) is a P-position: g(b) == g(a)!
    const ga = sg7[a % 7];
    let cnt = 0;
    for (let b = 1; b <= N; b++) {
      if (sg7[b % 7] === ga) cnt++;
    }
    items.push(makeItem({
      idx: idx++, topicId: TOP8, domain: DOM8, difficulty: 'hard', subskill: 2,
      archetype: 'Sprague-Grundy Periodic Mex Sum',
      text: `Consider the impartial game played on **two** independent heaps where a legal move removes \\( 1, 3, \\) or \\( 4 \\) stones from a single chosen heap (normal play: last move wins). If the first heap has \\( ${a} \\) stones, for how many integer sizes \\( b \\in \\{1, 2, \\dots, ${N}\\} \\) of the second heap is \\( (${a}, b) \\) a losing **P-position** for the player about to move?`,
      correctVal: String(cnt),
      distractors: [String(cnt + 2), String(Math.max(1, cnt - 2)), String(Math.floor(N / 4))],
      sol: `For \\( S = \\{1, 3, 4\\} \\), computing \\( g(n) = \\operatorname{mex}\\{g(n-1), g(n-3), g(n-4)\\} \\) yields the period-\\( 7 \\) Grundy sequence \\( (g(0),\\dots,g(6)) = (0, 1, 0, 1, 2, 3, 2) \\). Since \\( ${a} \\equiv ${a % 7} \\pmod{7} \\), \\( g(${a}) = ${ga} \\). By the Sprague–Grundy Theorem, \\( (${a}, b) \\) is a P-position iff \\( g(${a}) \\oplus g(b) = 0 \\iff g(b) = ${ga} \\). Counting \\( 1 \\le b \\le ${N} \\) with \\( g(b \\bmod 7) = ${ga} \\) gives \\( ${cnt} \\).`,
      hints: [
        `Compute \\( g(0), g(1), \\dots \\) via \\( \\operatorname{mex}\\{g(n-1), g(n-3), g(n-4)\\} \\) to find the period-\\( 7 \\) pattern \\( (0, 1, 0, 1, 2, 3, 2) \\).`,
        `By Sprague–Grundy, \\( g(a, b) = g(a) \\oplus g(b) = 0 \\iff g(b) = g(${a}) = ${ga} \\).`,
        `Count how many \\( b \\in \\{1, \\dots, ${N}\\} \\) have residue mod \\( 7 \\) achieving Grundy value \\( ${ga} \\), yielding \\( ${cnt} \\).`
      ]
    }));
  }

  // Hard 29..40: Mantel's Theorem & Extremal Triangle-Free Graph Edges floor(n^2 / 4)
  for (let i = 0; i < 12; i++) {
    const n = i + 9; // 9..20 vertices
    const maxEdges = Math.floor((n * n) / 4);
    const a = Math.floor(n / 2);
    const b = n - a;
    const fig = {
      type: 'network_graph',
      title: `Complete Bipartite Extremal Graph K_{${a},${b}}`,
      directed: false,
      nodes: [
        { id: 'L1', label: `Part A (${a})`, x: 90, y: 85, highlight: true },
        { id: 'L2', label: '...', x: 90, y: 175 },
        { id: 'R1', label: `Part B (${b})`, x: 260, y: 85, highlight: true },
        { id: 'R2', label: '...', x: 260, y: 175 }
      ],
      edges: [
        { from: 'L1', to: 'R1' }, { from: 'L1', to: 'R2' },
        { from: 'L2', to: 'R1' }, { from: 'L2', to: 'R2' }
      ]
    };
    items.push(makeItem({
      idx: idx++, topicId: TOP8, domain: DOM8, difficulty: 'hard', subskill: 3,
      archetype: 'Mantel Extremal Triangle-Free Graph Bound',
      text: `A research network has \\( ${n} \\) nodes (modeled as a simple undirected graph in the figure). What is the **maximum** number of edges the network can contain without forming any triangle \\( K_3 \\) (three mutually connected nodes)?`,
      correctVal: String(maxEdges),
      distractors: [String(comb(n, 2) - n), String(maxEdges + 1), String((n - 1) * 2)],
      sol: `By Mantel's Theorem (proved via the extremal vertex of maximum degree \\( \\Delta \\) or Cauchy–Schwarz on \\( \\sum_{u v \\in E} (d(u) + d(v)) \\le n|E| \\)), a triangle-free graph on \\( n \\) vertices has at most \\( \\lfloor n^2 / 4 \\rfloor \\) edges, uniquely attained by the balanced complete bipartite graph \\( K_{${a}, ${b}} \\) with \\( ${a} \\times ${b} = ${maxEdges} \\) edges.`,
      hints: [
        `Pick a vertex \\( v \\) of maximum degree \\( d \\): its \\( d \\) neighbors must form an independent set (no edges among them), leaving \\( n - d \\) other vertices.`,
        `Bound total edges by \\( d(n - d) \\le \\lfloor n^2 / 4 \\rfloor \\) (Mantel's Theorem).`,
        `Evaluate \\( \\lfloor ${n}^2 / 4 \\rfloor = ${a} \\times ${b} = ${maxEdges} \\), achieved by \\( K_{${a}, ${b}} \\).`
      ],
      fig
    }));
  }

  return items;
}

module.exports = { generateCh05To08 };
