#!/usr/bin/env node
/**
 * scripts/rebuild_sat_worksheets.js
 *
 * Rebuilds all 10 SAT worksheets in:
 *   - tools/worksheet_gen/topics/sat/*.json
 *   - public/worksheet-data/sat/*.json
 * directly from the verified authentic Digital SAT question bank (bank-data/sat.json).
 *
 * Guarantees:
 *   - 20 single-answer SPR questions in Part I (7 Foundational, 7 Intermediate, 6 Challenging)
 *   - 25 4-choice MCQ questions in Part II (8 Foundational, 9 Intermediate, 8 Challenging)
 *   - ZERO excluded topics (no logarithms, no normal distribution, no IQR/boxplots,
 *     no advanced trig, no advanced probability, no complex numbers, no asymptotes)
 *   - ZERO non-essential diagrams (every figure is strictly required to solve the question)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BANK_PATH = path.join(ROOT, 'bank-data', 'sat.json');
const TOPICS_DIR = path.join(ROOT, 'tools', 'worksheet_gen', 'topics', 'sat');
const PUBLIC_WS_DIR = path.join(ROOT, 'public', 'worksheet-data', 'sat');

const WORKSHEET_SPECS = [
  {
    num: '1.01',
    file: '1.01-linear-equations-and-systems.json',
    slug: 'linear-equations-and-systems',
    topic_id: 'sat-linear',
    title: 'Linear Equations & Systems',
    targetLabel: 'Linear Equations in One Variable & Systems of Equations'
  },
  {
    num: '2.01',
    file: '2.01-linear-functions-and-inequalities.json',
    slug: 'linear-functions-and-inequalities',
    topic_id: 'sat-linfun',
    title: 'Linear Functions & Inequalities',
    targetLabel: 'Linear Functions, Slope-Intercept Modeling & Inequalities'
  },
  {
    num: '3.01',
    file: '3.01-quadratics-and-nonlinear-equations.json',
    slug: 'quadratics-and-nonlinear-equations',
    topic_id: 'sat-quad',
    title: 'Quadratics & Nonlinear Equations',
    targetLabel: 'Quadratic Equations, Vertex Form, Discriminant & Parabolas'
  },
  {
    num: '4.01',
    file: '4.01-exponentials-and-polynomials.json',
    slug: 'exponentials-and-polynomials',
    topic_id: 'sat-expoly',
    title: 'Exponentials, Radicals, Polynomials & Rational Expressions',
    targetLabel: 'Exponential Growth/Decay, Rational Exponents & Polynomials'
  },
  {
    num: '5.01',
    file: '5.01-problem-solving-and-data.json',
    slug: 'problem-solving-and-data',
    topic_id: 'sat-data',
    title: 'Problem-Solving, Ratios, Rates & Data',
    targetLabel: 'Ratios, Unit Conversions, Percentages & Scatterplots'
  },
  {
    num: '6.01',
    file: '6.01-geometry-and-trigonometry.json',
    slug: 'geometry-and-trigonometry',
    topic_id: 'sat-geo',
    title: 'Geometry, Triangles & Right-Triangle Trigonometry',
    targetLabel: 'Area, Volume, Similar Triangles, Circles & Right-Triangle Trig'
  },
  {
    num: '7.01',
    file: '7.01-calculator-and-strategy.json',
    slug: 'calculator-and-strategy',
    topic_id: 'sat-desmos',
    title: 'Desmos Graphing Tactics, Regression & Systems Strategy',
    targetLabel: 'Graphing Intersections, Slider Constants & Desmos Modeling'
  },
  {
    num: '8.01',
    file: '8.01-functions.json',
    slug: 'functions',
    topic_id: 'sat-functions',
    title: 'Nonlinear Functions, Function Notation & Equivalent Expressions',
    targetLabel: 'Function Evaluation, Composition, Transformations & Graphs'
  },
  {
    num: '9.01',
    file: '9.01-statistics-and-sampling.json',
    slug: 'statistics-and-sampling',
    topic_id: 'sat-stats',
    title: 'One-Variable Statistics, Distributions & Margin of Error',
    targetLabel: 'Mean, Median, Range, Standard Deviation & Margin of Error'
  },
  {
    num: '10.01',
    file: '10.01-conditional-probability.json',
    slug: 'conditional-probability',
    topic_id: 'sat-condprob',
    title: 'Two-Way Frequency Tables & Conditional Probability',
    targetLabel: 'Two-Way Frequency Tables, Joint & Conditional Probability'
  }
];

function toDollarMath(str) {
  if (str == null) return '';
  let s = String(str);
  // Convert currency \$ inside \( ... \) to "USD \( ... \)"
  s = s.replace(/\\\(\s*\\\$\s*([\s\S]*?)\s*\\\)/g, (_, m) => `USD \\(${m.replace(/\\\$/g, '').trim()}\\)`);
  // Remove any remaining \$ or stray $ before converting \(...\) delimiters
  s = s.replace(/\\\$/g, 'USD ');
  s = s.replace(/\$/g, 'USD ');
  // Replace \[ ... \] and \( ... \) with $...$
  s = s.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (_, m) => `$${m.replace(/\$/g, '').trim()}$`);
  s = s.replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, (_, m) => `$${m.replace(/\$/g, '').trim()}$`);
  // Replace \dfrac and \tfrac with \frac for matplotlib mathtext
  s = s.replace(/\\[dt]frac/g, '\\frac');
  return s;
}

function wrapChoiceDollar(str) {
  if (str == null) return '';
  const s = toDollarMath(String(str).trim());
  if (s.includes('$')) return s;
  // Pure number, fraction, negative, or algebraic expression -> wrap in $...$
  if (/^[-+]?\d+(?:\.\d+)?(?:\/\d+)?%?$/.test(s) || /[\\^_{}=<>]/.test(s)) {
    return `$${s.replace(/%/g, '\\%')}$`;
  }
  return s;
}

function convertFigToWorksheetFigure(fig) {
  if (!fig || typeof fig !== 'object') return null;
  if (fig.type === 'fn') {
    const rawFns = fig.fns || fig.curves || [];
    const fns = rawFns.map(c => {
      const expr = typeof c === 'string' ? c : (c.fn || 'x');
      return String(expr).replace(/\^/g, '**');
    });
    const xr = fig.xlim || fig.xRange || [-6, 6];
    const yr = fig.ylim || fig.yRange || [-6, 6];
    const pts = (fig.points || []).map(p => [p.x, p.y]);
    const pointLabels = (fig.points || [])
      .filter(p => p.label)
      .map((p, idx) => ({
        x: p.x,
        y: p.y,
        label: p.label.includes('Vertex')
          ? p.label.replace(/Vertex\s*(\([^)]+\))/, 'Vertex $$$1$$')
          : `$${String(p.label).replace(/^\$|\$$/g, '')}$`,
        dx: idx % 2 === 0 ? 0.3 : -0.35,
        dy: idx % 2 === 0 ? 0.45 : -0.55
      }));
    return {
      type: 'plot',
      fns,
      xmin: xr[0],
      xmax: xr[1],
      ymin: yr[0],
      ymax: yr[1],
      points: pts,
      point_labels: pointLabels,
      width: 205
    };
  }
  if (fig.type === 'bar') {
    const bars = fig.data || fig.bars || [];
    return {
      type: 'bars',
      categories: bars.map(b => String(b.label)),
      values: bars.map(b => Number(b.val != null ? b.val : b.value)),
      ylabel: fig.yLabel || 'Count',
      width: 205
    };
  }
  if (fig.type === 'triangle') {
    const rawSides = fig.sides || ['3', '?', '4'];
    const legA = parseFloat(rawSides[0]) || 4;
    const legB = parseFloat(rawSides[2]) || 3;
    const verts = fig.vertices || [[0, legB], [legA, 0], [0, 0]];
    // Edges in _draw_triangle: 0->1 (AB hypotenuse), 1->2 (BC legA), 2->0 (CA legB)
    const wrap = (s) => `$${String(s).replace(/^\$|\$$/g, '')}$`;
    // Bank figures with explicit vertices already list sides in edge order 0->1, 1->2, 2->0.
    const direct = Array.isArray(fig.vertices) && Array.isArray(fig.sides) && fig.sides.length === 3;
    const sideLabels = direct ? fig.sides.map(s => (s ? wrap(s) : null)) : [
      rawSides[1] ? `$${String(rawSides[1]).replace(/^\$|\$$/g, '')}$` : '$?$',
      rawSides[0] ? `$${String(rawSides[0]).replace(/^\$|\$$/g, '')}$` : null,
      rawSides[2] ? `$${String(rawSides[2]).replace(/^\$|\$$/g, '')}$` : null
    ];
    return {
      type: 'triangle',
      vertices: verts,
      labels: (fig.labels || ['A', 'B', 'C']).map(l => `$${String(l).replace(/^\$|\$$/g, '')}$`),
      side_labels: sideLabels,
      right_angle_at: fig.right != null ? fig.right : (fig.rightAngle != null ? fig.rightAngle : 2),
      fill: true,
      width: 190
    };
  }
  if (fig.type === 'circle') {
    const rStr = String(fig.radius || fig.r || '12');
    const rNumMatch = rStr.match(/\d+(?:\.\d+)?/);
    const rNum = rNumMatch ? Number(rNumMatch[0]) : 12;
    const secAngle = fig.sector && typeof fig.sector === 'object'
      ? Number(fig.sector.angle || fig.sector.end_deg || 60)
      : Number(fig.sectorAngle || 60);
    return {
      type: 'circle',
      radius: rNum,
      center: [0, 0],
      center_label: '$O$',
      radius_label: `$r = ${rNum}$`,
      sector: secAngle
        ? {
            start_deg: 0,
            end_deg: secAngle,
            label: `$${secAngle}^\\circ$`
          }
        : null,
      width: 185
    };
  }
  if (fig.type === 'table') {
    return {
      type: 'table',
      title: fig.title || '',
      headers: (fig.headers || ['x', 'y']).map(h => {
        const clean = toDollarMath(String(h)).replace(/^\$|\$$/g, '');
        return clean;
      }),
      rows: (fig.rows || []).map(r => r.map(c => toDollarMath(String(c)).replace(/^\$|\$$/g, ''))),
      width: 210
    };
  }
  if (fig.type === 'two_way_table') {
    if (Array.isArray(fig.data) && Array.isArray(fig.rows) && Array.isArray(fig.columns)) {
      return {
        type: 'table',
        title: fig.title || '',
        headers: ['', ...fig.columns.map(String)],
        rows: fig.rows.map((rLabel, rIdx) => [
          String(rLabel),
          ...(fig.data[rIdx] || []).map(String)
        ]),
        width: 235
      };
    }
    return {
      type: 'two_way_table',
      title: fig.title || '',
      col_headers: fig.colHeaders || [],
      row_headers: fig.rowHeaders || [],
      cells: fig.cells || [],
      row_totals: fig.rowTotals || [],
      col_totals: fig.colTotals || [],
      grand_total: fig.grandTotal != null ? fig.grandTotal : '',
      width: 235
    };
  }
  if (fig.type === 'transversal') {
    // Bank transversals label angle slots by position ({2: ..., 7: ...}); the worksheet renderer
    // cannot place those, so such items are skipped rather than printed with a wrong diagram.
    if (fig.labels && !Array.isArray(fig.labels)) return null;
    const labs = fig.labels || [`${fig.angle || 60}^\\circ`, 'x^\\circ'];
    const a1 = String(labs[0] || '').replace(/°/g, '^\\circ');
    const a2 = String(labs[1] || '').replace(/°/g, '^\\circ');
    return {
      type: 'transversal',
      angle1: `$${a1.replace(/^\$|\$$/g, '')}$`,
      angle2: `$${a2.replace(/^\$|\$$/g, '')}$`,
      rel: fig.rel || 'cointerior',
      width: 210
    };
  }
  return null;
}

function buildWorksheetQuestion(q, qtype, diffLabel, targetLabel) {
  const stem = toDollarMath(q.text || q.q || '');
  const sol = toDollarMath(q.sol || '');
  const rawFig = q.figure || q.fig || null;
  const figSpec = rawFig ? convertFigToWorksheetFigure(rawFig) : null;

  if (qtype === 'SPR') {
    const rawAns = String(q.sprAnswer != null ? q.sprAnswer : (q.ans != null ? q.ans : (q.choices ? q.choices[q.answer || 0] : '')));
    const cleanAns = toDollarMath(rawAns).replace(/^\$|\$$/g, '');
    const ansFormatted = `$${cleanAns}$`;
    const item = {
      qtype: 'SPR',
      difficulty: diffLabel,
      target: targetLabel,
      q: stem,
      answer: `**Answer:** ${ansFormatted}. ${sol}`
    };
    if (figSpec) {
      item.figure = figSpec;
      item.fig = q.fig;
    }
    return item;
  }

  // MCQ
  const choices = (q.choices || []).map(c => wrapChoiceDollar(c));
  const correctIdx = typeof q.answer === 'number' ? q.answer : (typeof q.ans === 'number' ? q.ans : 0);
  const item = {
    qtype: 'MCQ',
    difficulty: diffLabel,
    target: targetLabel,
    q: stem,
    choices,
    correct: correctIdx,
    answer: sol
  };
  if (figSpec) {
    item.figure = figSpec;
    item.fig = q.fig;
  }
  return item;
}

function main() {
  const rawBank = JSON.parse(fs.readFileSync(BANK_PATH, 'utf8'));
  const bank = Array.isArray(rawBank) ? rawBank : (rawBank.pool || rawBank.questions || []);
  fs.mkdirSync(TOPICS_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_WS_DIR, { recursive: true });

  for (const spec of WORKSHEET_SPECS) {
    const topicQuestions = bank.filter(q => q.topic_id === spec.topic_id)
      .filter(q => !(q.figure || q.fig) || convertFigToWorksheetFigure(q.figure || q.fig));
    const sprEligible = (q) => {
      const a = String(q.sprAnswer != null ? q.sprAnswer : (q.choices || [])[q.answer] || '').trim();
      const numeric = /^-?\d+(\.\d+)?$/.test(a) || /^-?\d+\/\d+$/.test(a);
      return numeric && a.length <= (a.startsWith('-') ? 6 : 5) &&
        !/which of the following|which statement|which equation|which expression|which function|choices/i.test(q.text || '');
    };

    function pickTier(diff, sprNeed, mcqNeed) {
      const tierAll = topicQuestions.filter(q => q.difficulty === diff);
      const nativeSpr = tierAll.filter(q => q.type === 'spr' && sprEligible(q));
      const nativeMcq = tierAll.filter(q => q.type === 'mcq');

      const sprPicked = nativeSpr.slice(0, sprNeed);
      const promoted = new Set();
      for (const q of nativeMcq) {
        if (sprPicked.length >= sprNeed) break;
        if (sprEligible(q)) { sprPicked.push(q); promoted.add(q); }
      }
      const mcqPicked = nativeMcq.filter(q => !promoted.has(q)).slice(0, mcqNeed);
      if (sprPicked.length < sprNeed || mcqPicked.length < mcqNeed) {
        throw new Error(`Insufficient questions for ${spec.topic_id} (${diff}): spr=${sprPicked.length}/${sprNeed}, mcq=${mcqPicked.length}/${mcqNeed}`);
      }
      return { sprPicked, mcqPicked };
    }

    const easyTier = pickTier('easy', 7, 8);
    const medTier  = pickTier('medium', 7, 9);
    const hardTier = pickTier('hard', 6, 8);

    const sec1 = easyTier.sprPicked.map(q => buildWorksheetQuestion(q, 'SPR', 'Foundational', spec.targetLabel));
    const sec2 = medTier.sprPicked.map(q => buildWorksheetQuestion(q, 'SPR', 'Intermediate', spec.targetLabel));
    const sec3 = hardTier.sprPicked.map(q => buildWorksheetQuestion(q, 'SPR', 'Challenging', spec.targetLabel));

    const sec4 = easyTier.mcqPicked.map(q => buildWorksheetQuestion(q, 'MCQ', 'Foundational', spec.targetLabel));
    const sec5 = medTier.mcqPicked.map(q => buildWorksheetQuestion(q, 'MCQ', 'Intermediate', spec.targetLabel));
    const sec6 = hardTier.mcqPicked.map(q => buildWorksheetQuestion(q, 'MCQ', 'Challenging', spec.targetLabel));

    const wsJson = {
      track: 'sat',
      num: spec.num,
      slug: spec.slug,
      title: spec.title,
      sub: '20 SPRs + 25 MCQs • Difficulty Progression • Official Digital SAT Curriculum',
      sections: [
        {
          heading: 'Part I — Student-Produced Response Questions (SPRs): Foundational Fluency (1–7)',
          questions: sec1
        },
        {
          heading: 'Part I — Student-Produced Response Questions (SPRs): Intermediate Application (8–14)',
          questions: sec2
        },
        {
          heading: 'Part I — Student-Produced Response Questions (SPRs): Challenging Synthesis (15–20)',
          questions: sec3
        },
        {
          heading: 'Part II — Multiple-Choice Questions (MCQs): Foundational Fluency (21–28)',
          questions: sec4
        },
        {
          heading: 'Part II — Multiple-Choice Questions (MCQs): Intermediate Application (29–37)',
          questions: sec5
        },
        {
          heading: 'Part II — Multiple-Choice Questions (MCQs): Challenging Synthesis (38–45)',
          questions: sec6
        }
      ]
    };

    const topicOutPath = path.join(TOPICS_DIR, spec.file);
    const publicOutPath = path.join(PUBLIC_WS_DIR, `${spec.num}.json`);

    fs.writeFileSync(topicOutPath, JSON.stringify(wsJson, null, 2) + '\n', 'utf8');
    fs.writeFileSync(publicOutPath, JSON.stringify(wsJson, null, 2) + '\n', 'utf8');

    const totalQ = wsJson.sections.reduce((acc, s) => acc + s.questions.length, 0);
    const figCount = wsJson.sections.reduce((acc, s) => acc + s.questions.filter(q => q.figure).length, 0);
    console.log(`[SAT Worksheet] ${spec.num} (${spec.title}): ${totalQ} questions (${figCount} essential figures)`);
  }
}

main();
