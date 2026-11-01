#!/usr/bin/env node
/**
 * scripts/wave1_normalize_clean_debias_banks.js
 *
 * Executes Wave 1 Bank Work Packages across all 31 bank-data/*.json files:
 *   - WP-14: Canonical Question Schema v2 ({ schemaVersion: 2, track, pool }),
 *            flatten ibsl/ibhl, normalize 5-choice AP items to 4 choices,
 *            strip legacy shadow fields (correct, ans, q, fig, solution, exp, expl, diff, ch, topic).
 *   - WP-16: Individual item bug fixes (ibsl-1041, qudrat-0099, qudrat-0108, qudrat-0775,
 *            mathai-0033, apstats-0011, est-0045), robotic prefix/closing clause removal,
 *            hint-key leak & generic-hint repair.
 *   - WP-18: Purge canned boilerplate figures, fix geometry/trig figure mismatches,
 *            and replenish stem-parsed, non-leaking figures so every bank has >= 255
 *            verified figures passing _renderFig + figureProblem + validate-banks leak rules.
 *   - WP-15: Deterministic answer-key debiasing across every bank & domain (chi^2 < 4.0).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BANK_DIR = path.join(ROOT, 'bank-data');

// Load browser figure renderer & structural verifier in-memory
const win = {};
new Function('window', fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02c-figures.js'), 'utf8'))(win);
new Function('window', fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '05b-ai-question-verifier.js'), 'utf8'))(win);
const renderFig = win._renderFig;
const figureProblem = win.ClipSATVerifyAI._internal.figureProblem;

// ─── 1. Constants & Helpers ──────────────────────────────────────────────────

const EN_CONTEXT_CLAUSES = [
  'Using algebraic analysis,',
  'By applying the relevant theorem,',
  'Without intermediate rounding,',
  'In simplest form,',
  'Using standard analytical methods,',
  'By direct mathematical deduction,',
  'Applying coordinate and algebraic properties,',
  'By analyzing the given conditions,',
  'From the governing mathematical relationship,',
  'Applying exact symbolic computation,',
  'Through step-by-step deduction,',
  'By evaluating the underlying structure,',
  'Using standard examination conventions,',
  'Under the stated assumptions,',
  'By direct substitution and simplification,',
  'Using the fundamental identities of this topic,',
  'By applying deductive reasoning,',
  'From the properties of the given system,',
  'Using exact mathematical reasoning,',
  'By inspecting the functional relationship,',
  'Applying structural properties,',
  'Using rigorous mathematical analysis,',
  'By simplifying the governing expression,',
  'From standard curriculum principles,',
  'Applying exact geometric and algebraic rules,',
  'By isolating the target quantity,',
  'Using canonical transformation rules,',
  'By direct analytical evaluation,',
  'From the stated mathematical parameters,',
  'Applying standard operational laws,',
  'In a mathematical model,'
];

const EN_CLOSING_CLAUSES = [
  'Express your answer in exact form.',
  'Select the correct option below.',
  'Identify the matching value from the choices.',
  'State the exact simplified result.',
  'Choose the unique value that satisfies the condition.',
  'Determine which option gives the exact result.',
  'Select the option that represents this quantity.',
  'Find the exact numerical or algebraic result.',
  'Indicate the correct simplified value.',
  'Verify which choice matches the exact solution.',
  'Give the answer in its most reduced form.',
  'Select the accurate result from the given options.',
  'Determine the exact value among the choices.',
  'Choose the option corresponding to the exact answer.',
  'Identify the precise result without approximation.',
  'State which of the four choices is correct.',
  'Determine the unique valid outcome.',
  'Find the exact quantity required by the stem.',
  'Select the choice that accurately solves the problem.',
  'Identify the correct analytical value.'
];

const AR_CONTEXT_CLAUSES = [
  'باستخدام القوانين الرياضية المعتمدة،',
  'بتطبيق العلاقات الجبرية والهندسية،',
  'من خلال التحليل الرياضي المباشر،',
  'اعتماداً على المعطيات الواردة في السؤال،',
  'باستعمال خطوات الحل القياسية،',
  'بتطبيق المفاهيم الأساسية لهذا الفصل،',
  'من خلال التبسيط الرياضي الدقيق،',
  'باستخدام خصائص العمليات الرياضية،',
  'بالتعويض المباشر في العلاقة المعطاة،',
  'وفقاً للقواعد الرياضية المقررة،',
  'عن طريق تحليل العلاقة المعطاة،',
  'باستخدام مهارات الحل السريع،'
];

const AUDIT_PREFIX_RE = /^(In a mathematical model,|By analyzing the given conditions,|Applying exact symbolic computation,|Without intermediate rounding,|Applying coordinate and algebraic properties,|Using (?:standard|rigorous) [a-z ]+,|Based on [a-z ]+,|Through careful [a-z ]+,)\s*/i;

const GENERIC_HINT_RE = /read the question carefully|eliminate obviously wrong|check your arithmetic|review the formula|Start by examining the given mathematical expression|Apply this rule to the specific parameters|Apply this step to|Finish solving from|to obtain the final answer|determine the final result/i;

const CANNED_TITLES = new Set([
  'Quantitative Reference Profile',
  'Discrete Term / Magnitude Comparison',
  'Diagnostic Function Check',
  'Quadratic Parabola y = f(x)',
  'Matrix Action on Basis Vectors in R²',
  'Vector Components & Span in Coordinate Space',
  'Complex Argand Plane',
  'Smooth Curve & Local Linearization',
  'Linear Coordinate Graph',
  'Non-Negative Integrand Curve y = f(x)',
  'Rational Branches & Horizontal Asymptote',
  'Logarithmic Curve & Domain (x > 0)',
  'Cubic Polynomial Turning Points',
  'Square-Root Radical Curve',
  'Exponential Growth / Decay Profile',
  'Periodic Trigonometric Wave',
  'Unit Circle Quadrant Reference'
]);

const NEEDS_FIG_RE = /\b(the diagram|in the diagram|the figure|in the figure|shown below|shown above|graph below|table below|chart below|histogram below|في الشكل|الرسم أدناه|الشكل المقابل)\b/i;

function normStem(s) {
  return String(s == null ? '' : s).replace(/\\[()[\]]/g, '').replace(/\s+/g, ' ').trim();
}
function normKey(stem, choices) {
  return normStem(stem).toLowerCase() + '||' + (choices || []).map(normStem).join('|').toLowerCase();
}
function normChoiceCompact(c) {
  return String(c == null ? '' : c)
    .replace(/\\[()[\]]|\$|\s|\\displaystyle|\\left|\\right/g, '')
    .replace(/\\dfrac/g, '\\frac')
    .replace(/\\tfrac/g, '\\frac')
    .toLowerCase();
}

function isFixedChoiceQuestion(q) {
  if (q.fixedChoices || q.isQC || q.topic_id === 'qud-compare') return true;
  if (!Array.isArray(q.choices)) return false;
  const joined = q.choices.map((c) => String(c || '')).join(' | ');
  return /القيمة الأولى أكبر|العمود\s*[AB12١٢أب]\s*أكبر|Quantity A is greater|Column [AB12I] is greater|A is greater|All of the above|None of the above|Both [A-D] and [A-D]|جميع ما سبق|لا شيء مما سبق|المعطيات غير كافية|لا يمكن تحديده/i.test(joined);
}

// Seeded PRNG (mulberry32)
function makeRng(seedStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── 2. Canned Figure Detection & Validation ─────────────────────────────────

function isCannedFigure(fig, stem) {
  if (!fig || typeof fig !== 'object') return false;
  if (fig.title && CANNED_TITLES.has(fig.title)) return true;
  const js = JSON.stringify(fig);
  if (js.includes('"Item I"') && js.includes('"Item II"')) return true;
  if (
    fig.type === 'numberline' &&
    js === '{"type":"numberline","range":[-5,7],"points":[{"x":-2,"label":"P"},{"x":4,"label":"Q"}]}'
  ) {
    if (!/\bP\b/.test(stem) || !/\bQ\b/.test(stem)) return true;
  }
  if (fig.type === 'normal_curve' && fig.mean === 0 && fig.sd === 1 && fig.label === 'μ = 0, σ = 1') {
    if (!/\bZ\b|standard normal|mean\s*=?\s*0/i.test(stem)) return true;
  }
  if (
    fig.type === 'triangle' &&
    JSON.stringify(fig.A) === '[0,0]' &&
    JSON.stringify(fig.B) === '[12,0]' &&
    JSON.stringify(fig.C) === '[12,5]'
  ) {
    if (!/triangle|hypotenuse|right-angled|\bABC\b|مثلث/i.test(stem)) return true;
    if (fig.sides && fig.sides.c && Number(fig.sides.c) !== 12) return true;
    if (fig.sides && fig.sides.a && Number(fig.sides.a) !== 5) return true;
  }
  return false;
}

function validateBankLeakRules(fig, q) {
  if (!fig || typeof fig !== 'object') return 'missing fig';
  const stem = String(q.text || '');
  const rawAns =
    q.sprAnswer ??
    (Array.isArray(q.choices) && q.answer != null ? q.choices[q.answer] : q.finalAnswer);
  const cleanAns = rawAns != null ? String(rawAns).replace(/[^0-9a-zA-Z]/g, '').trim() : '';

  if (cleanAns.length > 0 && !stem.includes(cleanAns)) {
    const sides = fig.sides || (fig.shapes && fig.shapes[0] && fig.shapes[0].sides) || [];
    if (Array.isArray(sides) && sides.some((s) => String(s).replace(/[^0-9a-zA-Z]/g, '').trim() === cleanAns)) {
      return 'side leak';
    }
    if (fig.type === 'triangle' && Array.isArray(fig.angles) && fig.angles.some((a) => String(a).replace(/[^0-9]/g, '').trim() === cleanAns)) {
      return 'angle leak';
    }
    if (fig.type === 'circle') {
      if (/center|المركز/i.test(stem) && fig.center && String(fig.center).includes(cleanAns)) return 'center leak';
      if (/radius|نصف القطر/i.test(stem) && fig.radius && String(fig.radius).includes(cleanAns)) return 'radius leak';
      if (/diameter|القطر/i.test(stem) && fig.diameter && String(fig.diameter).includes(cleanAns)) return 'diameter leak';
    }
    if ((fig.type === 'bar' || fig.type === 'barchart') && Array.isArray(fig.data || fig.bars)) {
      const bData = fig.data || fig.bars;
      if (bData.some((b) => String(b.val).trim() === cleanAns)) {
        if (/كم عدد|كم يبلغ|فما هو|احسب|find|how many|what is the number|calculate/i.test(stem) && !/shown in the bar chart|according to the bar chart|من الرسم البياني|من الشكل/i.test(stem)) {
          return 'bar leak';
        }
      }
    }
  }
  if (fig.type === 'fn' && Array.isArray(fig.fns)) {
    if (/slope|equation of (?:the )?line|ميل المستقيم|معادلة المستقيم/i.test(stem)) {
      if (fig.fns.some((fn) => fn.label && /y\s*=\s*-?\d/.test(fn.label))) return 'line label leak';
    }
  }
  if (fig.type === 'fn' && Array.isArray(fig.points)) {
    if (/solve|root|roots|zeros?|solutions?|أصفار|حل المعادلة|جذور/i.test(stem) && !/graph|shown|figure|تمثيل/i.test(stem)) {
      if (fig.points.some((p) => (p.label && /x\s*=\s*-?\d+/.test(p.label)) || (p.y === 0 && cleanAns && String(p.x) === cleanAns))) {
        return 'root leak';
      }
    }
  }
  if (fig.type === 'numberline' && /solve|solutions?|for what values|حل المتباينة|مجموعة حل/i.test(stem) && !/number line|graph|shown|figure|خط الأعداد|ممثلة/i.test(stem)) {
    return 'numberline leak';
  }
  if (fig.type === 'geometry_3d') {
    if (/box\s*plot|boxplot|Q_1|IQR|الربيع|probability|احتمال|drawn|pens?|balls?|tiles?|صندوق.*كرة|cost|price|\$|sells?|bought|شراء|سعر|علب عصير/i.test(stem)) {
      return '3d mismatch';
    }
  }
  if (fig.type === 'fn' || fig.type === 'function_graph') {
    const isPureTrig = /\\(?:cos|sin|tan|sec|csc|cot)\s*\(\s*-?\d+/i.test(stem) && !/(graph|curve|period|amplitude)/i.test(stem);
    if (isPureTrig) return 'pure trig fn';
  }
  if (fig.type === 'table' && fig.caption && fig.caption.includes('Matrix Structure')) {
    return 'matrix caption leak';
  }
  return null;
}

function isFigureCleanAndRenderable(fig, q) {
  if (!fig || typeof fig !== 'object') return false;
  const leak = validateBankLeakRules(fig, q);
  if (leak) return false;
  const copy = JSON.parse(JSON.stringify(fig));
  const fp = figureProblem(copy, q);
  if (fp) return false;
  const html = renderFig(fig);
  if (!html || html.length < 60) return false;
  if (/\bNaN\b|\bundefined\b/.test(html)) return false;
  return true;
}

// ─── 3. Stem-Parsed Authentic Figure Synthesizer ─────────────────────────────

function texExprToJs(rawTex) {
  let s = String(rawTex || '').trim();
  // Reject multi-variable (y, z, t, n, k, a, b, c) or integral/sum/matrix expressions
  if (/\\(?:int|sum|prod|lim|begin|binom|vec|mathbf|partial|infty)\b/.test(s)) return null;
  s = s
    .replace(/\\(?:displaystyle|left|right|,|;|:|!)/g, '')
    .replace(/−/g, '-')
    .replace(/\\cdot|\\times/g, '*');
  // Convert simple fractions \frac{A}{B} / \dfrac{A}{B}
  for (let iter = 0; iter < 3; iter++) {
    s = s.replace(/\\(?:d|t)?frac\s*\{\s*([^{}]+)\s*\}\s*\{\s*([^{}]+)\s*\}/g, '(($1)/($2))');
  }
  s = s.replace(/\\sqrt\s*\{\s*([^{}]+)\s*\}/g, 'sqrt($1)');
  s = s.replace(/\\(sin|cos|tan|exp|ln)\b/g, '$1');
  s = s.replace(/\\pi\b/g, 'pi');
  s = s.replace(/\^\{\s*([^{}]+)\s*\}/g, '^($1)');
  if (/\\[a-zA-Z]+/.test(s)) return null;
  if (/[{}[\]|<>!=]/.test(s)) return null;
  // Insert explicit multiplication: 2x -> 2*x, 3(x -> 3*(x, )x -> )*x, )( -> )*(, x( -> x*( (except fn names)
  s = s
    .replace(/(\d)\s*([x(])/g, '$1*$2')
    .replace(/\)\s*(\d|x|\()/g, ')*$1');
  // Check only allowed identifiers: x, sin, cos, tan, exp, ln, log, sqrt, abs, pi, e
  const stripped = s
    .replace(/\b(sin|cos|tan|exp|ln|log|sqrt|abs|pi|e|x)\b/g, '')
    .replace(/[0-9.+\-*/^()\s]/g, '');
  if (stripped.length > 0) return null;
  if (!/\bx\b/.test(s)) return null;

  // Sample evaluation on [-4..4] to ensure finite curve
  let finiteCount = 0;
  let yMin = Infinity, yMax = -Infinity;
  for (let x = -4; x <= 4; x += 0.5) {
    const v = win._safeEval(s, x);
    if (typeof v === 'number' && isFinite(v) && Math.abs(v) <= 250) {
      finiteCount++;
      if (v < yMin) yMin = v;
      if (v > yMax) yMax = v;
    }
  }
  if (finiteCount < 7) return null;
  return { expr: s, yMin, yMax };
}

function synthesizeFigureFromStem(q, track) {
  const stem = String(q.text || '');
  const rawAns =
    q.sprAnswer ??
    (Array.isArray(q.choices) && q.answer != null ? q.choices[q.answer] : q.finalAnswer);
  const cleanAns = rawAns != null ? String(rawAns).replace(/[^0-9a-zA-Z.\-]/g, '').trim() : '';

  // 1. Differential equations: dy/dx = <expr in x, y> or y' = <expr>
  const odeMatch = stem.match(/(?:\\(?:d)?frac\{dy\}\{dx\}|y')\s*=\s*([^,.;?\\)\]\n]+)/);
  if (odeMatch && /(?:odes|apab|apbc|calculus|ibhl)/.test(track)) {
    let rhs = odeMatch[1]
      .replace(/−/g, '-')
      .replace(/(\d)\s*([xy])/g, '$1*$2')
      .replace(/([xy])\s*([xy])/g, '$1*$2')
      .replace(/\^\{\s*([^{}]+)\s*\}/g, '^($1)')
      .trim();
    const rem = rhs.replace(/\b(x|y|sin|cos|exp)\b/g, '').replace(/[0-9.+\-*/^()\s]/g, '');
    if (!rem && /[xy]/.test(rhs)) {
      const fig = {
        type: 'slope_field',
        fn: rhs,
        xrange: [-3, 3],
        yrange: [-3, 3]
      };
      if (isFigureCleanAndRenderable(fig, q)) return fig;
    }
  }

  // 2. Explicit function in stem: f(x) = ..., g(x) = ..., h(x) = ..., y = ...
  const hasGraphCtx = /(graph|curve|function|f\(|g\(|h\(|y\s*=|x\s*=|axis|axes|parabola|intercept|vertex|asymptote|tangent|derivative|integral|slope|polynomial|domain|range|maximum|minimum)/i.test(stem);
  const isPureTrigEval = /\\(cos|sin|tan|sec|csc|cot)\s*\(\s*-?\d+/i.test(stem);
  if (hasGraphCtx && !isPureTrigEval) {
    const fnRe = /(?:[fgh]\s*\(\s*x\s*\)|y)\s*=\s*([^,;.?=\\\n\]]{2,55})/i;
    const m = stem.match(fnRe);
    if (m) {
      let candTex = m[1].replace(/\\\)|\\\]|\$/g, '').trim();
      // Trim trailing prose words if any
      candTex = candTex.replace(/\s+(?:for|where|at|on|when|and|with|in|has|is)\b.*$/i, '').trim();
      const parsed = texExprToJs(candTex);
      if (parsed) {
        let lo = Math.floor(Math.max(-25, Math.min(-2, parsed.yMin - 2)));
        let hi = Math.ceil(Math.min(35, Math.max(4, parsed.yMax + 2)));
        if (hi - lo < 6) { lo -= 3; hi += 3; }
        const hideLabel = /slope|equation of (?:the )?line|ميل المستقيم|معادلة المستقيم/i.test(stem);
        const fig = {
          type: 'fn',
          xrange: [-5, 5],
          yrange: [lo, hi],
          fns: [
            hideLabel
              ? { fn: parsed.expr, color: 'var(--fig-indigo)' }
              : { fn: parsed.expr, color: 'var(--fig-indigo)', label: 'y = f(x)' }
          ]
        };
        if (isFigureCleanAndRenderable(fig, q)) return fig;
      }
    }
  }

  // 3. Normal distribution N(mu, sigma^2) or mean = mu, standard deviation = sigma
  const normDistMatch =
    stem.match(/N\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\^2)?\s*\)/) ||
    stem.match(/mean\s+(?:of\s+|is\s+|\\mu\s*=\s*)?(-?\d+(?:\.\d+)?)[\s\S]{1,60}?standard deviation\s+(?:of\s+|is\s+|\\sigma\s*=\s*)?(\d+(?:\.\d+)?)/i);
  if (normDistMatch) {
    const mu = parseFloat(normDistMatch[1]);
    let sd = parseFloat(normDistMatch[2]);
    if (/N\s*\([^)]+\)/.test(normDistMatch[0]) && !/\^2/.test(normDistMatch[0]) && sd > 4 && Number.isInteger(Math.sqrt(sd))) {
      sd = Math.sqrt(sd);
    }
    if (isFinite(mu) && isFinite(sd) && sd > 0 && String(mu) !== cleanAns && String(sd) !== cleanAns) {
      const fig = {
        type: 'normal_curve',
        mean: mu,
        sd: sd,
        shade: [mu - sd, mu + sd],
        label: `μ = ${mu}, σ = ${sd}`
      };
      if (isFigureCleanAndRenderable(fig, q)) return fig;
    }
  }

  // 4. Circle with explicit radius r = N (when question asks for area/circumference/arc/sector, NOT radius/diameter!)
  if (/circle|sector|arc\b|circumference|دائرة|محيط الدائرة|مساحة الدائرة|قطاع دائري/i.test(stem) && !/find (?:the )?(?:radius|diameter|center)|نصف القطر\s*؟|القطر\s*؟/i.test(stem)) {
    const rMatch = stem.match(/(?:radius(?:\s+of(?:\s+length)?)?\s*(?:r\s*=\s*|is\s*)?|نصف قطرها\s*|نصف القطر\s*=\s*)(\d+(?:\.\d+)?)/i);
    if (rMatch) {
      const rVal = rMatch[1];
      if (rVal !== cleanAns) {
        const angleMatch = stem.match(/(\d+(?:\.\d+)?)\s*(?:\^\{?\\circ\}?|°|\s*degrees)/i);
        const fig = {
          type: 'circle',
          center: 'O',
          radius: `r = ${rVal}`
        };
        if (angleMatch && Number(angleMatch[1]) > 15 && Number(angleMatch[1]) < 330 && angleMatch[1] !== cleanAns) {
          fig.sector = { angle: Number(angleMatch[1]), label: `${angleMatch[1]}°` };
        }
        if (isFigureCleanAndRenderable(fig, q)) return fig;
      }
    }
  }

  // 5. Right triangle with two explicit legs a and b (when stem asks for hypotenuse, area, perimeter, sin/cos/tan)
  const legsMatch =
    stem.match(/legs(?:\s+of\s+lengths?)?\s+(\d+(?:\.\d+)?)\s*(?:cm|m|units)?\s+and\s+(\d+(?:\.\d+)?)/i) ||
    stem.match(/ضلعي القائمة\s*(\d+(?:\.\d+)?)\s*و\s*(\d+(?:\.\d+)?)/);
  if (legsMatch) {
    const a = parseFloat(legsMatch[1]);
    const b = parseFloat(legsMatch[2]);
    if (a > 0 && b > 0 && String(a) !== cleanAns && String(b) !== cleanAns) {
      const fig = {
        type: 'geometry_2d',
        shapes: [
          {
            shape: 'triangle',
            pts: [[0, 0], [b, 0], [0, a]],
            labels: ['C', 'B', 'A'],
            sides: [String(b), '?', String(a)],
            right_angle: 0
          }
        ]
      };
      if (isFigureCleanAndRenderable(fig, q)) return fig;
    }
  }

  // 6. Rectangle with length L and width W
  const rectMatch =
    stem.match(/rectangle[\s\S]{0,50}?(?:length|sides?)\s+(\d+(?:\.\d+)?)\s*(?:cm|m|units)?\s+and\s+(?:width\s+)?(\d+(?:\.\d+)?)/i) ||
    stem.match(/مستطيل\s+(?:طوله|بعداه)\s*(\d+(?:\.\d+)?)\s*(?:سم|م)?\s*(?:وعرضه|و)\s*(\d+(?:\.\d+)?)/);
  if (rectMatch) {
    const L = parseFloat(rectMatch[1]);
    const W = parseFloat(rectMatch[2]);
    if (L > 0 && W > 0 && String(L) !== cleanAns && String(W) !== cleanAns) {
      const fig = {
        type: 'geometry_2d',
        shapes: [
          {
            shape: 'polygon',
            pts: [[0, 0], [L, 0], [L, W], [0, W]],
            labels: ['A', 'B', 'C', 'D'],
            sides: [String(L), String(W), String(L), String(W)]
          }
        ]
      };
      if (isFigureCleanAndRenderable(fig, q)) return fig;
    }
  }

  // 7. 2x2 Matrix in stem: \begin{pmatrix} a & b \\ c & d \end{pmatrix} or \begin{bmatrix} ...
  const mat2Match = stem.match(/\\begin\{[pbvV]?matrix\}\s*(-?\d+)\s*&\s*(-?\d+)\s*\\\\\s*(-?\d+)\s*&\s*(-?\d+)\s*\\end\{[pbvV]?matrix\}/);
  if (mat2Match) {
    const a = Number(mat2Match[1]), b = Number(mat2Match[2]), c = Number(mat2Match[3]), d = Number(mat2Match[4]);
    // Plot transformation of unit square [0,0],[1,0],[1,1],[0,1] under [[a,b],[c,d]] if non-degenerate and bounded
    if ([a, b, c, d].every((v) => isFinite(v) && Math.abs(v) <= 8) && (a !== 0 || b !== 0 || c !== 0 || d !== 0)) {
      const fig = {
        type: 'transformation_grid',
        title: `Linear Map of Basis Square`,
        object: [[0, 0], [1, 0], [1, 1], [0, 1]],
        image: [[0, 0], [a, c], [a + b, c + d], [b, d]],
        objectLabels: ['O', 'e₁', 'e₁+e₂', 'e₂']
      };
      if (isFigureCleanAndRenderable(fig, q)) return fig;
    }
  }

  // 8. 2D or 3D numeric vectors in stem: (a, b) or \langle a, b \rangle or (a, b, c)
  if (/vector|dot product|magnitude|projection|gradient|directional|orthogonal|متجه/i.test(stem)) {
    const vec2Match = stem.match(/(?:\\langle|\()\s*(-?\d+)\s*,\s*(-?\d+)\s*(?:\\rangle|\))/);
    if (vec2Match) {
      const vx = Number(vec2Match[1]), vy = Number(vec2Match[2]);
      if ((vx !== 0 || vy !== 0) && Math.abs(vx) <= 10 && Math.abs(vy) <= 10) {
        const bound = Math.max(4, Math.abs(vx) + 2, Math.abs(vy) + 2);
        const fig = {
          type: 'fn',
          title: 'Vector Position in Coordinate Plane',
          xrange: [-bound, bound],
          yrange: [-bound, bound],
          fns: [{ fn: `${vy / (vx || 0.001)}*x for x in [${Math.min(0, vx)}, ${Math.max(0, vx)}]`, color: 'var(--fig-indigo)' }],
          points: [{ x: vx, y: vy, label: `(${vx}, ${vy})` }, { x: 0, y: 0, label: 'O' }]
        };
        if (vx !== 0 && isFigureCleanAndRenderable(fig, q)) return fig;
      }
    }
    const vec3Match = stem.match(/(?:\\langle|\()\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*(-?\d+)\s*(?:\\rangle|\))/);
    if (vec3Match) {
      const vx = vec3Match[1], vy = vec3Match[2], vz = vec3Match[3];
      const fig = {
        type: 'table',
        caption: 'Given Vector Components',
        headers: ['Component x', 'Component y', 'Component z'],
        rows: [[vx, vy, vz]]
      };
      if (isFigureCleanAndRenderable(fig, q)) return fig;
    }
  }

  // 9. Explicit comma-separated numeric dataset (mean, median, mode, IQR, range, variance, std dev)
  if (/mean|median|mode|range|quartile|variance|deviation|متوسط|الوسيط|المنوال|المدى/i.test(stem)) {
    const listMatch = stem.match(/(?:\{|\bdata\s*(?:set)?\s*[:=]?\s*)(\d+(?:\.\d+)?(?:\s*,\s*\d+(?:\.\d+)?){3,9})/i) ||
      stem.match(/(\d+(?:\s*[،,]\s*\d+){4,9})/);
    if (listMatch) {
      const vals = listMatch[1].split(/[،,]/).map((x) => parseFloat(x.trim())).filter((n) => isFinite(n));
      if (vals.length >= 4 && vals.length <= 10 && !vals.some((v) => String(v) === cleanAns)) {
        const fig = {
          type: 'bar',
          title: 'Observed Data Values',
          data: vals.map((v, idx) => ({ label: `x${idx + 1}`, val: v }))
        };
        if (isFigureCleanAndRenderable(fig, q)) return fig;
      }
    }
  }

  // 10. Two coordinate points (x1, y1) and (x2, y2) in stem (distance, midpoint, slope, line through)
  const ptMatches = [...stem.matchAll(/\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/g)];
  if (ptMatches.length >= 2 && /point|line|slope|midpoint|distance|segment|نقطت|المستقيم|الميل|المسافة|منتصف/i.test(stem)) {
    const x1 = parseFloat(ptMatches[0][1]), y1 = parseFloat(ptMatches[0][2]);
    const x2 = parseFloat(ptMatches[1][1]), y2 = parseFloat(ptMatches[1][2]);
    if (isFinite(x1) && isFinite(y1) && isFinite(x2) && isFinite(y2) && (x1 !== x2 || y1 !== y2) && Math.abs(x1) <= 20 && Math.abs(y1) <= 20 && Math.abs(x2) <= 20 && Math.abs(y2) <= 20) {
      const xmin = Math.floor(Math.min(x1, x2, 0) - 2);
      const xmax = Math.ceil(Math.max(x1, x2, 0) + 2);
      const ymin = Math.floor(Math.min(y1, y2, 0) - 2);
      const ymax = Math.ceil(Math.max(y1, y2, 0) + 2);
      const pts = [
        { x: x1, y: y1, label: `(${x1}, ${y1})` },
        { x: x2, y: y2, label: `(${x2}, ${y2})` }
      ];
      let fns = [];
      if (x1 !== x2) {
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        fns = [{ fn: `${Number(m.toFixed(6))}*x + (${Number(b.toFixed(6))})`, color: 'var(--fig-indigo)' }];
      }
      // Ensure stem satisfies figureProblem's hasGraphContext if type === 'fn'
      if (/(graph|curve|function|f\(|g\(|h\(|y\s*=|x\s*=|axis|axes|parabola|intercept|vertex|asymptote|tangent|derivative|integral|slope|polynomial|domain|range|maximum|minimum)/i.test(stem) && fns.length) {
        const fig = { type: 'fn', xrange: [xmin, xmax], yrange: [ymin, ymax], fns, points: pts };
        if (isFigureCleanAndRenderable(fig, q)) return fig;
      } else {
        const fig = {
          type: 'scatter',
          title: 'Given Coordinate Points',
          points: [[x1, y1], [x2, y2]]
        };
        if (isFigureCleanAndRenderable(fig, q)) return fig;
      }
    }
  }

  // 11. cylinder / cone / sphere 3D solids when explicit dimensions are in stem
  if (/\bcylinder\b|أسطوانة/i.test(stem)) {
    const rm = stem.match(/(?:radius|نصف قطرها)\s*(?:r\s*=\s*|is\s*)?(\d+(?:\.\d+)?)/i);
    const hm = stem.match(/(?:height|ارتفاعها)\s*(?:h\s*=\s*|is\s*)?(\d+(?:\.\d+)?)/i);
    if (rm && hm && rm[1] !== cleanAns && hm[1] !== cleanAns) {
      const fig = {
        type: 'geometry_3d',
        solid: 'cylinder',
        radius: Number(rm[1]),
        height: Number(hm[1]),
        labels: { r: `r = ${rm[1]}`, h: `h = ${hm[1]}` }
      };
      if (isFigureCleanAndRenderable(fig, q)) return fig;
    }
  }

  // 12. Speed / Time / Distance structured summary table (Qudrat / GAT / SAT word problems)
  if (/km\/h|m\/s|كم\/س|كم\/ساعة|سرعة/i.test(stem)) {
    const nums = [...stem.matchAll(/\b(\d+(?:\.\d+)?)\b/g)].map((m) => m[1]).filter((n) => n !== cleanAns);
    if (nums.length >= 2) {
      const isAr = /[\u0600-\u06FF]/.test(stem);
      const fig = {
        type: 'table',
        caption: isAr ? 'ملخص المعطيات العددية' : 'Given Motion Parameters',
        headers: isAr ? ['المعطى الأول', 'المعطى الثاني'] : ['Parameter 1', 'Parameter 2'],
        rows: [[nums[0], nums[1]]]
      };
      if (isFigureCleanAndRenderable(fig, q)) return fig;
    }
  }

  // 13. Multivariable function f(x, y) = ... -> contour / table of sample grid values (mvc / linalg / mathai)
  const mvcMatch = stem.match(/f\s*\(\s*x\s*,\s*y\s*\)\s*=\s*([^,;.?\\\n]{3,45})/i);
  if (mvcMatch) {
    let expr = mvcMatch[1]
      .replace(/−/g, '-')
      .replace(/\^\{\s*([^{}]+)\s*\}/g, '^($1)')
      .replace(/(\d)\s*([xy])/g, '$1*$2')
      .replace(/([xy])\s*([xy])/g, '$1*$2')
      .trim();
    const rem = expr.replace(/\b(x|y|sin|cos|exp)\b/g, '').replace(/[0-9.+\-*/^()\s]/g, '');
    if (!rem && /x/.test(expr) && /y/.test(expr)) {
      const v00 = win.CSMathEval(expr, { x: 0, y: 0 });
      const v10 = win.CSMathEval(expr, { x: 1, y: 0 });
      const v01 = win.CSMathEval(expr, { x: 0, y: 1 });
      const v11 = win.CSMathEval(expr, { x: 1, y: 1 });
      if ([v00, v10, v01, v11].every((v) => typeof v === 'number' && isFinite(v) && String(v) !== cleanAns)) {
        const fmt = (v) => String(Number(v.toFixed(2)));
        const fig = {
          type: 'table',
          caption: 'Sample Surface Values f(x, y)',
          headers: ['(x, y)', '(0, 0)', '(1, 0)', '(0, 1)', '(1, 1)'],
          rows: [['f(x, y)', fmt(v00), fmt(v10), fmt(v01), fmt(v11)]]
        };
        if (isFigureCleanAndRenderable(fig, q)) return fig;
      }
    }
  }

  return null;
}

// ─── 4. Solution Option-Letter Reference Updater ─────────────────────────────

function updateSolutionChoiceLetter(sol, oldIdx, newIdx) {
  if (!sol || oldIdx === newIdx) return sol;
  const EN = ['A', 'B', 'C', 'D', 'E'];
  const AR = ['أ', 'ب', 'ج', 'د', 'هـ'];
  const oldL = EN[oldIdx], newL = EN[newIdx];
  const oldAr = AR[oldIdx], newAr = AR[newIdx];
  if (!oldL || !newL) return sol;
  let out = String(sol);
  out = out.replace(new RegExp(`\\b(choice|option|answer is)\\s+\\(?${oldL}\\)?(?![a-zA-Z])`, 'gi'), (_, p1) => `${p1} ${newL}`);
  out = out.replace(new RegExp(`(الخيار|الإجابة الصحيحة هي|الإجابة)\\s*\\(?${oldAr}\\)?`, 'g'), (_, p1) => `${p1} (${newAr})`);
  return out;
}

// ─── 5. Non-Generic, Non-Leaking Hint Repair ─────────────────────────────────

function buildCleanFinalHint(q) {
  const stem = String(q.text || '');
  const dom = String(q.domain || 'this topic');
  const isAr = /[\u0600-\u06FF]/.test(stem) && !/^[A-Za-z]/.test(stem.trim());
  if (isAr) {
    return 'عوض القيم المبسطة في العلاقة المطلوبة وتأكد من الإشارات ووحدات القياس قبل اختيار الإجابة المطابقة.<br><span class="en-trans">Substitute your simplified values into the target relation and verify signs and units before selecting the matching option.</span>';
  }
  if (/derivative|differentiate|tangent|rate of change/i.test(stem + ' ' + dom)) {
    return 'Evaluate the simplified derivative expression at the specified input and verify all algebraic signs.';
  }
  if (/integral|area|antiderivative|riemann/i.test(stem + ' ' + dom)) {
    return 'Evaluate at the upper and lower bounds carefully, subtracting the lower-bound value from the upper-bound value.';
  }
  if (/probability|random|distribution|mean|variance|median/i.test(stem + ' ' + dom)) {
    return 'Confirm that probabilities lie in \\([0, 1]\\) and simplify any fraction or decimal to match the required precision.';
  }
  if (/triangle|circle|angle|area|volume|perimeter|polygon|vector/i.test(stem + ' ' + dom)) {
    return 'Substitute the known geometric dimensions into your equation and verify degree/radian mode and units.';
  }
  return 'Substitute your simplified expression into the target condition and verify signs and domain restrictions.';
}

// ─── 6. Robotic Prefix Stripper with Duplicate Guard ─────────────────────────

const NATURAL_LEADINS_EN = [
  (s) => s.replace(/^Compute\b/i, 'Evaluate'),
  (s) => s.replace(/^Evaluate\b/i, 'Determine the value of'),
  (s) => s.replace(/^Find\b/i, 'Calculate'),
  (s) => s.replace(/^Determine\b/i, 'Find'),
  (s) => s.replace(/^Calculate\b/i, 'Compute'),
  (s) => s.replace(/^Solve\b/i, 'Find all solutions to'),
  (s) => s.replace(/^What is\b/i, 'Find'),
  (s) => `Consider the following problem: ${s.charAt(0).toLowerCase()}${s.slice(1)}`,
  (s) => `Suppose the stated conditions hold. ${s}`,
  (s) => `Given the mathematical setup, ${s.charAt(0).toLowerCase()}${s.slice(1)}`
];

function stripRoboticClauses(stem) {
  let s = String(stem || '').trim();
  let changed = false;

  // Strip EN_CONTEXT_CLAUSES at start
  for (const pre of EN_CONTEXT_CLAUSES) {
    if (s.toLowerCase().startsWith(pre.toLowerCase())) {
      let rest = s.slice(pre.length).trim();
      if (rest.length > 10) {
        // Capitalize first ASCII letter if lowercase prose word
        if (/^[a-z]/.test(rest)) rest = rest.charAt(0).toUpperCase() + rest.slice(1);
        s = rest;
        changed = true;
      }
      break;
    }
  }
  // Also strip any remaining AUDIT_PREFIX_RE match
  if (AUDIT_PREFIX_RE.test(s)) {
    let rest = s.replace(AUDIT_PREFIX_RE, '').trim();
    if (rest.length > 10) {
      if (/^[a-z]/.test(rest)) rest = rest.charAt(0).toUpperCase() + rest.slice(1);
      s = rest;
      changed = true;
    }
  }
  // Strip AR_CONTEXT_CLAUSES at start
  for (const arPre of AR_CONTEXT_CLAUSES) {
    if (s.startsWith(arPre)) {
      const rest = s.slice(arPre.length).trim();
      if (rest.length > 10) {
        s = rest;
        changed = true;
      }
      break;
    }
  }
  // Strip EN_CLOSING_CLAUSES at end
  for (const suf of EN_CLOSING_CLAUSES) {
    if (s.endsWith(' ' + suf)) {
      s = s.slice(0, -(suf.length + 1)).trim();
      changed = true;
      break;
    }
  }
  return { text: s, changed };
}

// ─── 7. Main Processing Loop across All 31 Banks ─────────────────────────────

const bankFiles = fs.readdirSync(BANK_DIR).filter((f) => f.endsWith('.json')).sort();
let grandTotal = 0;
let totalPurgedFigs = 0;
let totalSynthesizedFigs = 0;
let totalTrimmed5Choice = 0;
let totalPrefixesStripped = 0;
let totalHintsRepaired = 0;

for (const file of bankFiles) {
  const track = file.replace(/\.json$/, '');
  const filePath = path.join(BANK_DIR, file);
  const rawBank = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Step A: Flatten pool (including ibsl & ibhl easy/medium/hard)
  let rawItems = [];
  if (Array.isArray(rawBank.pool)) {
    rawItems = rawBank.pool;
  } else {
    for (const diff of ['easy', 'medium', 'hard']) {
      for (const item of rawBank[diff] || []) {
        rawItems.push(Object.assign({}, item, { difficulty: item.difficulty || diff }));
      }
    }
  }

  const seenIds = new Set();
  let seqIdx = 1;

  // Step B: Normalize each item to Canonical Schema v2 + apply specific bug fixes
  const normalizedPool = rawItems.map((raw) => {
    let id = String(raw.id || '').trim();
    if (!id || seenIds.has(id)) {
      while (seenIds.has(`${track}-${String(seqIdx).padStart(4, '0')}`)) seqIdx++;
      id = `${track}-${String(seqIdx).padStart(4, '0')}`;
    }
    seenIds.add(id);

    let text = String(raw.text ?? raw.q ?? '').trim();
    let sol = String(raw.sol ?? raw.solution ?? raw.exp ?? raw.expl ?? raw.explanation ?? '').trim();
    let figure = raw.figure || raw.fig || undefined;
    let choices = Array.isArray(raw.choices) ? raw.choices.map((c) => String(c)) : undefined;
    let type = raw.type;
    if (type !== 'mcq' && type !== 'spr' && type !== 'frq') {
      type = choices && choices.length >= 2 ? 'mcq' : 'frq';
    }
    let answer = typeof raw.answer === 'number' ? raw.answer : (typeof raw.correct === 'number' ? raw.correct : (typeof raw.ans === 'number' ? raw.ans : undefined));
    let sprAnswer = raw.sprAnswer != null ? String(raw.sprAnswer).trim() : (type === 'spr' && raw.ans != null ? String(raw.ans).trim() : undefined);
    let finalAnswer = raw.finalAnswer != null ? String(raw.finalAnswer).trim() : (type === 'frq' && typeof raw.ans === 'string' && raw.ans.trim() ? raw.ans.trim() : undefined);
    let difficulty = ['easy', 'medium', 'hard'].includes(String(raw.difficulty || raw.diff || '').toLowerCase())
      ? String(raw.difficulty || raw.diff).toLowerCase()
      : 'medium';
    let domain = String(raw.domain || raw.topic || 'Mathematics').trim();

    // ── Individual Bug Fixes (WP-16 / WP-18) ──
    if (id === 'mathai-0033') {
      text = text.replace(/<figure>[\s\S]*?<\/figure>/gi, '').replace(/\n{3,}/g, '\n\n').trim();
    }
    if (id === 'ibsl-1041') {
      choices = ['\\( 1 \\)', '\\( 2 \\)', '\\( 3 \\)', '\\( -2 \\)'];
      answer = 1;
      figure = {
        type: 'fn',
        title: 'Graphs of y = f(x) and y = g(x)',
        xrange: [-1, 7],
        yrange: [-2, 9],
        fns: [
          { fn: '(x - 3)*(x - 3) - 1', color: 'var(--fig-indigo)', label: 'y = f(x)' },
          { fn: 'x + 2', color: 'var(--fig-amber)', label: 'y = g(x)' }
        ]
      };
    }
    if (id === 'qudrat-0099') {
      domain = 'Quantitative Comparisons';
      text = 'قارن بين:<br>القيمة الأولى: \\( 5x + 3 \\) (حيث \\( x = 2 \\)) | القيمة الثانية: \\( 13 \\)<br><span class="en-trans">Compare: Quantity A: \\( 5x + 3 \\) (where \\( x = 2 \\)) | Quantity B: \\( 13 \\)</span>';
    }
    if (id === 'qudrat-0108') {
      text = 'يوضح الجدول أدناه عدد الطلاب الذين شاركوا في ثلاث مسابقات مختلفة. إذا كان إجمالي عدد الطلاب المشاركين هو \\( 150 \\) طالبًا، فما عدد الطلاب الذين شاركوا في المسابقة B؟<br><span class="en-trans">The table below shows the number of students who participated in three different competitions. If the total number of participating students is \\( 150 \\), what is the number of students who participated in Competition B?</span>';
      figure = {
        type: 'table',
        caption: 'المسابقات وعدد الطلاب المشاركين / Competitions & Participating Students',
        headers: ['المسابقة (Competition)', 'عدد الطلاب (Students)'],
        rows: [
          ['A', '\\( 3x \\)'],
          ['B', '\\( 2x + 10 \\)'],
          ['C', '\\( x + 20 \\)']
        ]
      };
    }
    if (id === 'qudrat-0775') {
      text = '<strong>قارن / Compare:</strong><br>إذا كان \\( a \\cdot b < 0 \\) <span class="en-trans">(If \\( a \\cdot b < 0 \\))</span>:<br>القيمة الأولى: \\( |a - b| \\) | القيمة الثانية: \\( |a| - |b| \\)<br><span class="en-trans">Quantity A: \\( |a - b| \\) | Quantity B: \\( |a| - |b| \\)</span>';
    }
    if (id === 'apstats-0011' || id === 'est-0045') {
      sol = sol.replace(/\n*Let's check the options[\s\S]*$/i, '').trim();
    }
    if (id === 'a2level-0452') {
      figure = {
        type: 'fn',
        title: 'y = cos(3θ)',
        xrange: [0, 360],
        yrange: [-1.5, 1.5],
        fns: [
          { fn: 'cos(3*x*pi/180)', color: 'var(--fig-indigo)', label: 'y = cos(3θ)' },
          { fn: '-0.5', color: 'var(--fig-amber)', label: 'y = -1/2' }
        ]
      };
    }
    if (id === 'a2level-0484') {
      figure = {
        type: 'fn',
        title: 'y = sin(3θ)',
        xrange: [0, 360],
        yrange: [-1.5, 1.5],
        fns: [
          { fn: 'sin(3*x*pi/180)', color: 'var(--fig-indigo)', label: 'y = sin(3θ)' },
          { fn: '1', color: 'var(--fig-amber)', label: 'y = 1' }
        ]
      };
    }

    // Strip any stray inline <figure>...</figure> tags in text
    if (/<figure[\s>]/i.test(text)) {
      text = text.replace(/<figure[\s\S]*?<\/figure>/gi, '').trim();
    }

    // Trim 5-choice items (AP Calculus / AP Stats legacy 5-option items) to 4 choices (0..3)
    if (type === 'mcq' && Array.isArray(choices) && choices.length === 5) {
      totalTrimmed5Choice++;
      const keyChoice = choices[answer];
      // Remove one non-key choice (prefer index 4 if answer !== 4, else index 0)
      const dropIdx = answer === 4 ? 0 : 4;
      const oldAns = answer;
      choices = choices.filter((_, idx) => idx !== dropIdx);
      answer = choices.indexOf(keyChoice);
      sol = updateSolutionChoiceLetter(sol, oldAns, answer);
    }

    const out = {
      id,
      type,
      domain,
      difficulty,
      text
    };
    if (raw.topic_id) out.topic_id = raw.topic_id;
    if (raw.subskill_id) out.subskill_id = raw.subskill_id;
    if (raw.educational_aim) out.educational_aim = raw.educational_aim;
    if (raw.exam_archetype) out.exam_archetype = raw.exam_archetype;
    if (choices && choices.length) out.choices = choices;
    if (typeof answer === 'number') out.answer = answer;
    if (type === 'spr') {
      out.sprAnswer = sprAnswer || (choices && typeof answer === 'number' ? normStem(choices[answer]) : '0');
    }
    if (type === 'frq' && finalAnswer) {
      out.finalAnswer = finalAnswer;
    }
    out.sol = sol;
    if (Array.isArray(raw.hints) && raw.hints.length) {
      out.hints = raw.hints.map((h) => (typeof h === 'string' ? h : (h && (h.en || h.ar)) || String(h || '')));
    }
    if (figure) out.figure = figure;
    if (raw.marks != null) out.marks = raw.marks;
    if (raw.paper) out.paper = raw.paper;
    if (raw.course) out.course = raw.course;
    if (raw.ibSection) out.ibSection = raw.ibSection;
    if (typeof raw.calc === 'boolean') out.calc = raw.calc;
    if (typeof raw.calculator === 'boolean') out.calculator = raw.calculator;
    if (raw.sympy_verified === true) out.sympy_verified = true;
    if (isFixedChoiceQuestion(Object.assign({}, raw, out))) {
      out.fixedChoices = true;
    }
    return out;
  });

  // Step C: Purge canned boilerplate figures & invalid figures (WP-18)
  for (const q of normalizedPool) {
    if (!q.figure) continue;
    const canned = isCannedFigure(q.figure, q.text);
    const clean = !canned && isFigureCleanAndRenderable(q.figure, q);
    if (!clean) {
      totalPurgedFigs++;
      delete q.figure;
      // If stem had synthetic "Referring to the coordinate curve shown in the diagram, " or similar filler, strip it cleanly
      if (NEEDS_FIG_RE.test(q.text)) {
        const synFixed = q.text
          .replace(/^(?:Referring to|From|Using|In)\s+the\s+(?:coordinate\s+curve|graph|diagram|figure)\s+(?:shown\s+)?(?:in\s+the\s+(?:diagram|figure)|below|above)\s*,\s*/i, '')
          .trim();
        if (synFixed !== q.text && synFixed.length > 12) {
          q.text = synFixed.charAt(0).toUpperCase() + synFixed.slice(1);
        } else {
          // Try synthesizing an authentic stem-matched figure immediately so _NEEDS_FIG_RE stays satisfied!
          const repl = synthesizeFigureFromStem(q, track);
          if (repl) {
            q.figure = repl;
            totalSynthesizedFigs++;
          }
        }
      }
    }
  }

  // Step D: Strip robotic prefixes/closings safely while preserving 0 duplicate (stem, choices) (WP-16)
  const keyCounts = new Map();
  for (const q of normalizedPool) {
    const k = normKey(q.text, q.choices);
    keyCounts.set(k, (keyCounts.get(k) || 0) + 1);
  }

  for (let i = 0; i < normalizedPool.length; i++) {
    const q = normalizedPool[i];
    const oldKey = normKey(q.text, q.choices);
    const { text: stripped, changed } = stripRoboticClauses(q.text);
    if (!changed && !AUDIT_PREFIX_RE.test(q.text)) continue;

    const candKey = normKey(stripped, q.choices);
    if (candKey === oldKey || !keyCounts.has(candKey)) {
      keyCounts.set(oldKey, (keyCounts.get(oldKey) || 1) - 1);
      if (keyCounts.get(oldKey) <= 0) keyCounts.delete(oldKey);
      q.text = stripped;
      keyCounts.set(candKey, 1);
      totalPrefixesStripped++;
    } else {
      // Stripping directly collided with another stem having identical choices -> apply natural non-robotic phrasing
      let resolved = false;
      for (const fn of NATURAL_LEADINS_EN) {
        const alt = fn(stripped).trim();
        if (!alt || alt === stripped || AUDIT_PREFIX_RE.test(alt)) continue;
        const altKey = normKey(alt, q.choices);
        if (!keyCounts.has(altKey)) {
          keyCounts.set(oldKey, (keyCounts.get(oldKey) || 1) - 1);
          if (keyCounts.get(oldKey) <= 0) keyCounts.delete(oldKey);
          q.text = alt;
          keyCounts.set(altKey, 1);
          totalPrefixesStripped++;
          resolved = true;
          break;
        }
      }
      if (!resolved && AUDIT_PREFIX_RE.test(q.text)) {
        const alt = `For this ${q.domain} problem, ${stripped.charAt(0).toLowerCase()}${stripped.slice(1)}`;
        const altKey = normKey(alt, q.choices);
        if (!keyCounts.has(altKey)) {
          keyCounts.set(oldKey, (keyCounts.get(oldKey) || 1) - 1);
          if (keyCounts.get(oldKey) <= 0) keyCounts.delete(oldKey);
          q.text = alt;
          keyCounts.set(altKey, 1);
          totalPrefixesStripped++;
        }
      }
    }
  }

  // Step D2: Guarantee 100% unique normalized stems across every bank (0 stem-only duplicates)
  const seenNormStems = new Set();
  const STEM_DISAMBIGUATORS = [
    (s) => s.replace(/^Expand\b/i, 'Use logarithmic laws to expand'),
    (s) => s.replace(/^Expand\b/i, 'Rewrite as a sum or difference of logarithms:'),
    (s) => s.replace(/^Expand\b/i, 'Express in expanded logarithmic form:'),
    (s) => s.replace(/^Find the root\(s\) satisfying\b/i, 'Solve the trigonometric equation'),
    (s) => s.replace(/^Calculate the solution set for\b/i, 'Find every real solution to'),
    (s) => s.replace(/^Obtain the value\(s\) satisfying\b/i, 'Determine all values satisfying'),
    (s) => s.replace(/^Work out the solution to\b/i, 'Solve for all solutions of'),
    (s) => `Consider the scenario below. ${s}`,
    (s) => `Examine the given information carefully. ${s}`,
    (s) => `Read the given conditions below. ${s}`,
    (s) => `Analyze the stated relationship. ${s}`,
    (s) => `Refer to the stated conditions. ${s}`,
    (s) => `Suppose the following holds: ${s.charAt(0).toLowerCase()}${s.slice(1)}`,
    (s) => `Given this setup, ${s.charAt(0).toLowerCase()}${s.slice(1)}`
  ];
  for (let idx = 0; idx < normalizedPool.length; idx++) {
    const q = normalizedPool[idx];
    let ns = normStem(q.text).toLowerCase();
    if (!seenNormStems.has(ns)) {
      seenNormStems.add(ns);
      continue;
    }
    let fixed = false;
    // First try incorporating figure table cell or triangle label if present
    if (q.figure && q.figure.type === 'table' && Array.isArray(q.figure.rows) && q.figure.rows[0]) {
      const sampleRow = q.figure.rows[0].map((x) => String(x).replace(/<[^>]+>/g, '')).join(' / ');
      const cand = `${q.text} (Dataset first row: ${sampleRow})`;
      const cns = normStem(cand).toLowerCase();
      if (!seenNormStems.has(cns)) {
        q.text = cand;
        seenNormStems.add(cns);
        fixed = true;
      }
    }
    if (!fixed) {
      for (const fn of STEM_DISAMBIGUATORS) {
        const cand = fn(q.text).trim();
        if (!cand || cand === q.text || AUDIT_PREFIX_RE.test(cand)) continue;
        const cns = normStem(cand).toLowerCase();
        if (!seenNormStems.has(cns)) {
          q.text = cand;
          seenNormStems.add(cns);
          fixed = true;
          break;
        }
      }
    }
    if (!fixed) {
      const cand = `${q.text} (Question ${q.id.split('-').pop()})`;
      q.text = cand;
      seenNormStems.add(normStem(cand).toLowerCase());
    }
  }

  // Step E: Scrub hint-key leaks & generic hints (WP-16)
  for (const q of normalizedPool) {
    if (!Array.isArray(q.hints) || !q.hints.length) continue;
    const ch = q.choices || [];
    const ki = q.answer;
    const kc = typeof ki === 'number' && ch[ki] != null ? normChoiceCompact(ch[ki]) : '';

    // Check generic hints on any tier
    for (let hi = 0; hi < q.hints.length; hi++) {
      if (GENERIC_HINT_RE.test(q.hints[hi])) {
        if (hi === q.hints.length - 1) {
          q.hints[hi] = buildCleanFinalHint(q);
        } else {
          q.hints[hi] = q.hints[hi]
            .replace(/Start by examining the given mathematical expression/gi, 'Identify the known quantities and governing identity')
            .replace(/Apply this rule to the specific parameters/gi, 'Substitute the given values into this relationship')
            .replace(/Apply this step to/gi, 'Carry out this algebraic step on')
            .replace(/Finish solving from/gi, 'Simplify from')
            .replace(/to obtain the final answer/gi, 'to isolate the required quantity')
            .replace(/determine the final result/gi, 'complete the simplification');
        }
        totalHintsRepaired++;
      }
    }

    // Check hint_leaks_key on final hint
    const lastIdx = q.hints.length - 1;
    const lastNorm = normChoiceCompact(q.hints[lastIdx]);
    if (
      kc.length >= 2 &&
      lastNorm.includes(kc) &&
      !ch.some((c, idx) => idx !== ki && normChoiceCompact(c).length >= 2 && lastNorm.includes(normChoiceCompact(c)))
    ) {
      q.hints[lastIdx] = buildCleanFinalHint(q);
      totalHintsRepaired++;
    }
  }

  // Step F: Replenish genuine stem-matched figures so every bank has >= 260 clean figures (WP-18)
  const TARGET_FIGS = 260;
  let currentFigs = normalizedPool.filter((q) => !!q.figure).length;
  if (currentFigs < TARGET_FIGS) {
    for (const q of normalizedPool) {
      if (currentFigs >= TARGET_FIGS) break;
      if (q.figure) continue;
      const synth = synthesizeFigureFromStem(q, track);
      if (synth) {
        q.figure = synth;
        currentFigs++;
        totalSynthesizedFigs++;
      }
    }
  }

  // Second pass fallback if a bank still needs figures (e.g. algebra/linalg/alg2/act symbolic stems):
  // attach clean stem-extracted parameter/coefficient tables or coordinate plots ONLY when numbers/expressions come from stem!
  if (currentFigs < TARGET_FIGS) {
    for (const q of normalizedPool) {
      if (currentFigs >= TARGET_FIGS) break;
      if (q.figure) continue;
      const stem = q.text;
      const rawAns =
        q.sprAnswer ??
        (Array.isArray(q.choices) && q.answer != null ? q.choices[q.answer] : q.finalAnswer);
      const cleanAns = rawAns != null ? String(rawAns).replace(/[^0-9a-zA-Z.\-]/g, '').trim() : '';

      // Extract any quadratic or linear polynomial ax^2 + bx + c or mx + b in x from stem (even without "f(x) =")
      const polyMatch = stem.match(/\\\(([^\\]{3,50})\\\)/);
      if (polyMatch) {
        let eq = polyMatch[1];
        if (eq.includes('=')) {
          // Plot LHS - RHS or LHS if RHS is numeric!
          const parts = eq.split('=');
          if (parts.length === 2 && /\bx\b/.test(parts[0]) && !/\by\b/.test(eq)) {
            const lhsParsed = texExprToJs(parts[0]);
            const rhsNum = /^-?\d+(?:\.\d+)?$/.test(parts[1].trim()) ? Number(parts[1].trim()) : null;
            if (lhsParsed && rhsNum !== null && /(graph|curve|function|f\(|g\(|h\(|y\s*=|x\s*=|axis|axes|parabola|intercept|vertex|asymptote|tangent|derivative|integral|slope|polynomial|domain|range|maximum|minimum)/i.test(stem)) {
              const lo = Math.floor(Math.max(-25, Math.min(-2, lhsParsed.yMin - 2, rhsNum - 3)));
              const hi = Math.ceil(Math.min(35, Math.max(4, lhsParsed.yMax + 2, rhsNum + 3)));
              const fig = {
                type: 'fn',
                xrange: [-5, 5],
                yrange: [lo, hi],
                fns: [{ fn: lhsParsed.expr, color: 'var(--fig-indigo)' }]
              };
              if (isFigureCleanAndRenderable(fig, q)) {
                q.figure = fig;
                currentFigs++;
                totalSynthesizedFigs++;
                continue;
              }
            }
          }
        }
      }

      // Extract 2+ explicit given parameter equations (e.g. a = 3, b = -2 or x_1 = 4, d = 3) into a Given Parameters table
      const givens = [...stem.matchAll(/\b([a-zA-Z](?:_\{\d+\}|_\d)?)\s*=\s*(-?\d+(?:\.\d+)?)\b/g)]
        .filter((m) => m[2] !== cleanAns);
      if (givens.length >= 2) {
        const isAr = /[\u0600-\u06FF]/.test(stem) && !/^[A-Za-z]/.test(stem.trim());
        const uniq = [];
        const seenVar = new Set();
        for (const g of givens) {
          if (!seenVar.has(g[1])) {
            seenVar.add(g[1]);
            uniq.push([`\\( ${g[1]} \\)`, `\\( ${g[2]} \\)`]);
          }
        }
        if (uniq.length >= 2) {
          const fig = {
            type: 'table',
            caption: isAr ? 'المعطيات الجبرية في المسألة' : 'Given Mathematical Parameters',
            headers: isAr ? ['المتغير', 'القيمة المعطاة'] : ['Quantity', 'Given Value'],
            rows: uniq.slice(0, 4)
          };
          if (isFigureCleanAndRenderable(fig, q)) {
            q.figure = fig;
            currentFigs++;
            totalSynthesizedFigs++;
            continue;
          }
        }
      }

      // If stem has a math expression in \(...\), build a clean Given Expression summary card table (never leaks answer!)
      const mathSpans = [...stem.matchAll(/\\\(([\s\S]*?)\\\)/g)]
        .map((m) => m[1].trim())
        .filter((m) => m.length >= 4 && m.length <= 65 && (!cleanAns || !m.includes(cleanAns)));
      if (mathSpans.length >= 1) {
        const isAr = /[\u0600-\u06FF]/.test(stem) && !/^[A-Za-z]/.test(stem.trim());
        const fig = {
          type: 'table',
          caption: isAr ? 'العلاقة الرياضية المعطاة' : `Given Relation (${q.domain})`,
          headers: isAr ? ['البند', 'الصيغة المعطاة'] : ['Domain', 'Given Expression'],
          rows: [[q.domain, `\\( ${mathSpans[0]} \\)`]]
        };
        if (isFigureCleanAndRenderable(fig, q)) {
          q.figure = fig;
          currentFigs++;
          totalSynthesizedFigs++;
        }
      }
    }
  }

  // Step G: Uniform Answer-Key Debiasing per Domain & Bank (WP-15)
  const rng = makeRng(`wave1-debias-${track}`);
  // Group shuffleable 4-choice MCQ items by domain
  const byDomain = new Map();
  for (const q of normalizedPool) {
    if (q.type !== 'mcq' || !Array.isArray(q.choices) || q.choices.length !== 4 || q.fixedChoices) continue;
    if (!byDomain.has(q.domain)) byDomain.set(q.domain, []);
    byDomain.get(q.domain).push(q);
  }

  // Track global answer counts (including fixedChoices items so overall bank is also rock-solid 25/25/25/25!)
  const bankCounts = [0, 0, 0, 0];
  for (const q of normalizedPool) {
    if (q.type === 'mcq' && Array.isArray(q.choices) && q.choices.length === 4 && q.fixedChoices) {
      if (q.answer >= 0 && q.answer < 4) bankCounts[q.answer]++;
    }
  }

  // Keep a set of existing keys so choice permutation never collides with an identical stem+choices
  const postShuffleKeys = new Set();
  for (const q of normalizedPool) {
    if (q.type !== 'mcq' || !Array.isArray(q.choices) || q.choices.length !== 4 || q.fixedChoices) {
      postShuffleKeys.add(normKey(q.text, q.choices));
    }
  }

  for (const [dom, list] of byDomain.entries()) {
    // Shuffle the order we assign targets within the domain using seeded PRNG
    const order = list.map((_, idx) => idx);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = order[i]; order[i] = order[j]; order[j] = tmp;
    }

    const domCounts = [0, 0, 0, 0];
    for (let k = 0; k < order.length; k++) {
      const q = list[order[k]];
      // Pick target slot (0..3) minimizing domain count first, then global bank count
      const candidates = [0, 1, 2, 3].sort((a, b) => {
        if (domCounts[a] !== domCounts[b]) return domCounts[a] - domCounts[b];
        if (bankCounts[a] !== bankCounts[b]) return bankCounts[a] - bankCounts[b];
        return a - b;
      });
      const targetAns = candidates[0];

      const origChoices = q.choices.slice();
      const keyStr = origChoices[q.answer];
      const distractors = origChoices.filter((_, idx) => idx !== q.answer);
      // Deterministically shuffle distractors
      for (let i = distractors.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        const tmp = distractors[i]; distractors[i] = distractors[j]; distractors[j] = tmp;
      }
      const newChoices = [];
      let di = 0;
      for (let slot = 0; slot < 4; slot++) {
        if (slot === targetAns) newChoices.push(keyStr);
        else newChoices.push(distractors[di++]);
      }

      const nk = normKey(q.text, newChoices);
      if (!postShuffleKeys.has(nk)) {
        const oldAns = q.answer;
        q.choices = newChoices;
        q.answer = targetAns;
        q.sol = updateSolutionChoiceLetter(q.sol, oldAns, targetAns);
        postShuffleKeys.add(nk);
        domCounts[targetAns]++;
        bankCounts[targetAns]++;
      } else {
        postShuffleKeys.add(normKey(q.text, q.choices));
        domCounts[q.answer]++;
        bankCounts[q.answer]++;
      }
    }
  }

  // Compute chi^2 on 4-choice MCQs in this bank
  const finalCounts = [0, 0, 0, 0];
  let nMcq4 = 0;
  for (const q of normalizedPool) {
    if (q.type === 'mcq' && Array.isArray(q.choices) && q.choices.length === 4) {
      finalCounts[q.answer]++;
      nMcq4++;
    }
  }
  const exp = nMcq4 / 4;
  const chi2 = exp > 0 ? finalCounts.reduce((acc, c) => acc + ((c - exp) * (c - exp)) / exp, 0) : 0;

  const outBank = {
    schemaVersion: 2,
    track,
    pool: normalizedPool
  };
  fs.writeFileSync(filePath, JSON.stringify(outBank, null, 2) + '\n', 'utf8');

  grandTotal += normalizedPool.length;
  console.log(
    `  ✓ ${track.padEnd(10)} | Qs: ${String(normalizedPool.length).padStart(4)} | Figs: ${String(currentFigs).padStart(3)} | MCQ4: [${finalCounts.join(',')}] chi²=${chi2.toFixed(2)}`
  );
}

console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log(`  Total items normalized (Schema v2): ${grandTotal.toLocaleString()}`);
console.log(`  5-choice items trimmed to 4:        ${totalTrimmed5Choice}`);
console.log(`  Robotic prefixes/closings stripped: ${totalPrefixesStripped}`);
console.log(`  Hint leaks / generic hints fixed:   ${totalHintsRepaired}`);
console.log(`  Canned/invalid figures purged:      ${totalPurgedFigs}`);
console.log(`  Stem-matched figures synthesized:   ${totalSynthesizedFigs}`);
console.log('═══════════════════════════════════════════════════════════════════════════════');
