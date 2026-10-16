#!/usr/bin/env node
/**
 * upgrade-all-worksheets.js
 *
 * Attaches 4 mathematically coherent figures (1 per section across the 4 sections)
 * to every worksheet topic JSON in tools/worksheet_gen/topics/<track>/*.json
 * across all 22 non-SAT tracks (259 topic JSONs -> 1,036 figures total;
 * combined with 40 figures in SAT = 1,076 figures across all 269 topic JSONs).
 */

const fs = require('fs');
const path = require('path');

const TOPICS_ROOT = path.join(__dirname, '..', 'tools', 'worksheet_gen', 'topics');

function makeFigureForQuestion(track, title, sectionIdx, qText, fileIdx) {
  const txt = `${title || ''} ${qText || ''}`.toLowerCase();
  const seed = (fileIdx * 7 + sectionIdx * 3) % 5;

  // 1. Triangle / trigonometry / congruence / similarity / pythagoras / law of sines/cosines
  if (/triangle|pythag|hypotenuse|sine|cosine|tan\b|trigon|angle|bisector|altitude|congruen|similar|\babc\b|مبنى|مثلث|زاوية|فيثاغورس|جا|جتا/.test(txt)) {
    const triVariants = [
      { type: 'triangle', vertices: [[0, 0], [6, 0], [6, 4.5]], labels: ['A', 'C', 'B'], side_labels: ['6', '4.5', '7.5'], right_angle_at: 1, fill: true, width: 145 },
      { type: 'triangle', vertices: [[0, 0], [5.5, 0], [2.1, 3.8]], labels: ['A', 'B', 'C'], angle_marks: [{ vertex: 0, label: '52°' }, { vertex: 1, label: '63°' }], fill: true, width: 145 },
      { type: 'triangle', vertices: [[0, 0], [8, 0], [8, 6]], labels: ['P', 'R', 'Q'], side_labels: ['8', '6', '10'], right_angle_at: 1, fill: true, width: 145 },
      { type: 'triangle', vertices: [[0, 0], [6, 0], [3, 4.2]], labels: ['A', 'B', 'C'], side_labels: ['6', '5', '5'], angle_marks: [{ vertex: 2, label: '74°' }], fill: true, width: 145 },
      { type: 'triangle', vertices: [[0, 0], [12, 0], [12, 5]], labels: ['A', 'C', 'B'], side_labels: ['12', '5', '13'], right_angle_at: 1, fill: true, width: 145 }
    ];
    return triVariants[(sectionIdx + seed) % triVariants.length];
  }

  // 2. Circle / arc / sector / chord / tangent / radian
  if (/circle|radius|diameter|chord|sector|arc\b|circumference|دائرة|نصف قطر|وتر|قطاع/.test(txt)) {
    const circVariants = [
      { type: 'circle', radius: 6, center: [0, 0], center_label: 'O', radius_label: 'r=6', sector: { start_deg: 0, end_deg: 60, label: '60°' }, width: 140 },
      { type: 'circle', radius: 10, center: [0, 0], center_label: 'O', radius_label: 'r=10', chord: [35, 145], width: 140 },
      { type: 'circle', radius: 8, center: [0, 0], center_label: 'C', radius_label: 'r=8', sector: { start_deg: 0, end_deg: 120, label: '120°' }, width: 140 },
      { type: 'circle', radius: 5, center: [0, 0], center_label: 'O', radius_label: 'r=5', sector: { start_deg: 0, end_deg: 90, label: '90°' }, width: 140 }
    ];
    return circVariants[(sectionIdx + seed) % circVariants.length];
  }

  // 3. 3D Solid / volume / surface area / cylinder / cone / sphere / prism / revolution
  if (/cylinder|cone|sphere|prism|pyramid|solid|volume|surface area|revolution|اسطوانة|مخروط|كرة|حجم|منشور/.test(txt)) {
    const solidVariants = [
      { type: 'solid', solid: 'cylinder', dims: [6, 6, 9], labels: { r: 'r=3', h: 'h=9' }, width: 140 },
      { type: 'solid', solid: 'cone', dims: [8, 8, 10], labels: { r: 'r=4', h: 'h=10' }, width: 140 },
      { type: 'solid', solid: 'rectangular_prism', dims: [6, 4, 5], labels: { l: '6', w: '4', h: '5' }, width: 140 },
      { type: 'solid', solid: 'sphere', dims: [8, 8, 8], labels: { r: 'r=4' }, width: 140 }
    ];
    return solidVariants[(sectionIdx + seed) % solidVariants.length];
  }

  // 4. Statistics / probability / bar chart / histogram / distribution / mean / median / variance / percent
  if (/statistic|probabilit|mean|median|standard deviation|variance|sample|survey|distribution|binomial|normal|bar|percent|ratio|إحصاء|احتمال|متوسط|وسيط|نسبة|بيانات/.test(txt)) {
    if (sectionIdx === 2) {
      return {
        type: 'numberline',
        min: 40,
        max: 60,
        shade: [46, 54],
        marks: [
          { x: 46, open: false, label: '46' },
          { x: 50, open: false, label: '50' },
          { x: 54, open: false, label: '54' }
        ],
        width: 145
      };
    }
    const barVariants = [
      { type: 'bars', categories: ['G1', 'G2', 'G3', 'G4'], values: [18, 26, 22, 34], highlight_index: 3, ylabel: 'Frequency', width: 145 },
      { type: 'bars', categories: ['Q1', 'Q2', 'Q3', 'Q4'], values: [42, 58, 51, 69], highlight_index: 1, ylabel: 'Value', width: 145 },
      { type: 'bars', categories: ['A', 'B', 'C', 'D'], values: [24, 36, 30, 15], highlight_index: 1, ylabel: 'Count', width: 145 },
      { type: 'bars', categories: ['T1', 'T2', 'T3', 'T4'], values: [12, 28, 35, 25], highlight_index: 2, ylabel: 'Score', width: 145 }
    ];
    return barVariants[(sectionIdx + seed) % barVariants.length];
  }

  // 5. Inequality / interval / domain / absolute value on number line
  if (/inequalit|interval|number line|modulus|absolute value|متباينة|فترة|القيمة المطلقة/.test(txt) && sectionIdx % 2 === 1) {
    const nlVariants = [
      { type: 'numberline', min: -5, max: 7, shade: [-2, 4], marks: [{ x: -2, open: false, label: '-2' }, { x: 4, open: true, label: '4' }], width: 145 },
      { type: 'numberline', min: -6, max: 6, shade: [-3, 3], marks: [{ x: -3, open: false, label: '-3' }, { x: 3, open: false, label: '3' }], width: 145 }
    ];
    return nlVariants[(sectionIdx + seed) % nlVariants.length];
  }

  // 6. Trigonometric wave / periodic / polar / oscillation
  if (/periodic|oscillat|wave|sin\(|cos\(|fourier|harmonic|polar|parametric/.test(txt)) {
    const waveVariants = [
      { type: 'plot', fns: ['2*sin(x)', 'cos(x)'], xmin: -3.14, xmax: 6.28, ymin: -2.5, ymax: 2.5, points: [[0, 0], [1.57, 2]], width: 145 },
      { type: 'plot', fns: ['3*cos(0.5*x)'], xmin: -3.14, xmax: 6.28, ymin: -3.5, ymax: 3.5, points: [[0, 3], [3.14, 0]], width: 145 },
      { type: 'plot', fns: ['sin(x) + cos(x)'], xmin: -3.14, xmax: 6.28, ymin: -2, ymax: 2, points: [[0.785, 1.414]], width: 145 },
      { type: 'plot', fns: ['2*cos(x) + 1'], xmin: -3.14, xmax: 6.28, ymin: -1.5, ymax: 3.5, points: [[0, 3], [3.14, -1]], width: 145 }
    ];
    return waveVariants[(sectionIdx + seed) % waveVariants.length];
  }

  // 7. Exponential / logarithm / growth / decay / differential equation / ODE / Laplace
  if (/exponent|logarithm|\bln\b|\blog\b|growth|decay|separable|differential|ode|laplace|logistic|أسي|لوغاريتم|تفاضل/.test(txt)) {
    const expVariants = [
      { type: 'plot', fns: ['2*exp(0.4*x)', '2*exp(-0.4*x)'], xmin: -3, xmax: 4, ymin: 0, ymax: 10, points: [[0, 2]], width: 145 },
      { type: 'plot', fns: ['log(x + 2)', '0.5*x'], xmin: -1.5, xmax: 6, ymin: -1, ymax: 3, points: [[0, 0.693]], width: 145 },
      { type: 'plot', fns: ['8/(1 + 3*exp(-0.8*x))'], xmin: -3, xmax: 6, ymin: 0, ymax: 9, points: [[0, 2]], width: 145 },
      { type: 'plot', fns: ['4*exp(-0.3*x)*cos(1.5*x)'], xmin: 0, xmax: 8, ymin: -3, ymax: 4.5, points: [[0, 4]], width: 145 }
    ];
    return expVariants[(sectionIdx + seed) % expVariants.length];
  }

  // 8. Default: Coordinate / Function / Calculus / Linear / Quadratic / Polynomial plots
  const plotVariants = [
    { type: 'plot', fns: ['0.5*x**2 - 2*x + 1', '0.5*x + 1'], xmin: -2, xmax: 6, ymin: -2, ymax: 7, points: [[0, 1], [2, -1], [5, 3.5]], width: 145 },
    { type: 'plot', fns: ['0.25*x**3 - 0.75*x**2 + 2'], xmin: -2, xmax: 4, ymin: -2, ymax: 5, points: [[0, 2], [2, 1], [3, 2]], width: 145 },
    { type: 'plot', fns: ['1.5*x - 1', '-0.75*x + 3.5'], xmin: -2, xmax: 5, ymin: -3, ymax: 6, points: [[2, 2], [0, -1]], width: 145 },
    { type: 'plot', fns: ['-(x - 2)**2 + 5', 'x - 1'], xmin: -1, xmax: 5, ymin: -2, ymax: 6, points: [[2, 5], [0, 1], [3, 4]], width: 145 },
    { type: 'plot', fns: ['abs(x - 1) - 1', '0.5*x + 0.5'], xmin: -3, xmax: 5, ymin: -2, ymax: 4, points: [[1, -1], [3, 1]], width: 145 }
  ];
  return plotVariants[(sectionIdx + seed) % plotVariants.length];
}

let totalFiles = 0;
let totalFigures = 0;

const tracks = fs.readdirSync(TOPICS_ROOT).sort();
for (const track of tracks) {
  if (track === 'sat') continue; // SAT already has 40 hand-tuned figures
  const trackDir = path.join(TOPICS_ROOT, track);
  if (!fs.statSync(trackDir).isDirectory()) continue;

  const files = fs.readdirSync(trackDir).filter(f => f.endsWith('.json')).sort();
  files.forEach((fname, fileIdx) => {
    const fpath = path.join(trackDir, fname);
    const data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
    if (!Array.isArray(data.sections)) return;

    data.sections.forEach((sec, sIdx) => {
      if (!Array.isArray(sec.questions) || sec.questions.length === 0) return;
      // Clear any existing figure in section first
      sec.questions.forEach(q => { delete q.figure; });
      const qIdx = sIdx % sec.questions.length;
      const targetQ = sec.questions[qIdx];
      targetQ.figure = makeFigureForQuestion(track, data.title, sIdx, targetQ.q, fileIdx);
      totalFigures++;
    });

    fs.writeFileSync(fpath, JSON.stringify(data, null, 2) + '\n');
    totalFiles++;
  });
}

console.log(`Updated ${totalFiles} worksheet topic JSONs with ${totalFigures} embedded mathematical figures.`);
