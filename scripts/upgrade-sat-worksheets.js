#!/usr/bin/env node
/**
 * Attaches 4 tailored, mathematically accurate figures (1 per section = 40 total)
 * across all 10 SAT worksheet topic JSONs in tools/worksheet_gen/topics/sat/*.json.
 */

const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'tools', 'worksheet_gen', 'topics', 'sat');

const FIGURES = {
  '1.01-linear-equations-and-systems.json': [
    // S1 Q3: 3x - 2y = 14 and x = 2y - 2 -> intersection (8, 5)
    { s: 0, q: 2, figure: { type: 'plot', fns: ['1.5*x - 7', '0.5*x + 1'], xmin: 0, xmax: 10, ymin: -4, ymax: 8, points: [[8, 5]], width: 155 } },
    // S2 Q1: 5x + 3y = 23 and 2x - 3y = 5 -> intersection (4, 1)
    { s: 1, q: 0, figure: { type: 'plot', fns: ['(23 - 5*x)/3', '(2*x - 5)/3'], xmin: -1, xmax: 7, ymin: -3, ymax: 7, points: [[4, 1]], width: 155 } },
    // S3 Q1: ax + b = 5x + 12
    { s: 2, q: 0, figure: { type: 'plot', fns: ['5*x + 12'], xmin: -4, xmax: 2, ymin: -8, ymax: 22, points: [[0, 12], [-2, 2]], width: 155 } },
    // S4 Q3: Press A (40(t+10)) vs Press B (60t) -> intersect at t=20
    { s: 3, q: 2, figure: { type: 'plot', fns: ['40*(x + 10)', '60*x'], xmin: 0, xmax: 30, ymin: 0, ymax: 1800, points: [[20, 1200]], width: 155 } }
  ],
  '2.01-linear-functions-and-inequalities.json': [
    // S1 Q1: Line through (-3, 4) and (5, -8) -> y = -1.5x - 0.5
    { s: 0, q: 0, figure: { type: 'plot', fns: ['-1.5*x - 0.5'], xmin: -5, xmax: 7, ymin: -10, ymax: 6, points: [[-3, 4], [5, -8]], width: 155 } },
    // S2 Q1: 3x + 2y = 10 and perpendicular line y = (2/3)x - 1
    { s: 1, q: 0, figure: { type: 'plot', fns: ['-1.5*x + 5', '(2/3)*x - 1'], xmin: -3, xmax: 6, ymin: -4, ymax: 7, points: [[0, -1]], width: 155 } },
    // S3 Q2: Compound inequality -2 <= x < 7 on numberline
    { s: 2, q: 1, figure: { type: 'numberline', min: -4, max: 9, shade: [-2, 7], marks: [{ x: -2, open: false, label: '-2' }, { x: 7, open: true, label: '7' }], width: 155 } },
    // S4 Q1: System y > 2x - 1 and y <= -x + 5
    { s: 3, q: 0, figure: { type: 'plot', fns: ['2*x - 1', '-x + 5'], xmin: -2, xmax: 5, ymin: -3, ymax: 6, points: [[1, 3]], width: 155 } }
  ],
  '3.01-quadratics-and-nonlinear-equations.json': [
    // S1 Q1: 2x^2 - 11x + 12 = 0
    { s: 0, q: 0, figure: { type: 'plot', fns: ['2*x**2 - 11*x + 12'], xmin: 0, xmax: 5, ymin: -4, ymax: 12, points: [[1.5, 0], [4, 0]], width: 155 } },
    // S2 Q1: y = 3(x - 4)^2 - 7
    { s: 1, q: 0, figure: { type: 'plot', fns: ['3*(x - 4)**2 - 7'], xmin: 1, xmax: 7, ymin: -8, ymax: 14, points: [[4, -7]], width: 155 } },
    // S3 Q1: x^2 - 8x + 16 = 0 tangent at (4, 0)
    { s: 2, q: 0, figure: { type: 'plot', fns: ['x**2 - 8*x + 16'], xmin: 0, xmax: 8, ymin: -2, ymax: 14, points: [[4, 0]], width: 155 } },
    // S4 Q2: y = x^2 + 3 and y = 4x -> intersect at (1, 4) and (3, 12)
    { s: 3, q: 1, figure: { type: 'plot', fns: ['x**2 + 3', '4*x'], xmin: -1, xmax: 5, ymin: 0, ymax: 16, points: [[1, 4], [3, 12]], width: 155 } }
  ],
  '4.01-exponentials-and-polynomials.json': [
    // S1 Q2: 2^(3x - 1) = 32
    { s: 0, q: 1, figure: { type: 'plot', fns: ['2**(3*x - 1)', '32'], xmin: 0, xmax: 2.5, ymin: 0, ymax: 40, points: [[2, 32]], width: 155 } },
    // S2 Q2: A(t) = 500(0.75)^t
    { s: 1, q: 1, figure: { type: 'plot', fns: ['500*(0.75**x)'], xmin: 0, xmax: 6, ymin: 0, ymax: 550, points: [[0, 500], [2, 281.25]], width: 155 } },
    // S3 Q2: P(x) = x^3 - 3x^2 + 4x - 12 has zero at x = 3
    { s: 2, q: 1, figure: { type: 'plot', fns: ['x**3 - 3*x**2 + 4*x - 12'], xmin: -1, xmax: 4, ymin: -16, ymax: 10, points: [[3, 0]], width: 155 } },
    // S4 Q2: y = (x - 3)^2(x + 1) touches x-axis at x = 3
    { s: 3, q: 1, figure: { type: 'plot', fns: ['((x - 3)**2)*(x + 1)'], xmin: -2, xmax: 4.5, ymin: -6, ymax: 18, points: [[-1, 0], [3, 0]], width: 155 } }
  ],
  '5.01-problem-solving-and-data.json': [
    // S1 Q3: Water hose 120 gal in 15 min -> y = 8x
    { s: 0, q: 2, figure: { type: 'plot', fns: ['8*x'], xmin: 0, xmax: 25, ymin: 0, ymax: 200, points: [[15, 120], [20, 160]], width: 155 } },
    // S2 Q1: Price changes $80 -> $96 -> $72
    { s: 1, q: 0, figure: { type: 'bars', categories: ['Orig', '+20%', '-25%'], values: [80, 96, 72], highlight_index: 2, ylabel: 'Price ($)', width: 155 } },
    // S3 Q2: Scatterplot & line of best fit y = 3x + 25 with (6, 47)
    { s: 2, q: 1, figure: { type: 'plot', fns: ['3*x + 25'], xmin: 0, xmax: 10, ymin: 20, ymax: 60, points: [[2, 30], [4, 38], [6, 47], [8, 48]], width: 155 } },
    // S4 Q3: Inverse proportion xy = 72
    { s: 3, q: 2, figure: { type: 'plot', fns: ['72/x'], xmin: 2, xmax: 18, ymin: 0, ymax: 36, points: [[6, 12], [9, 8]], width: 155 } }
  ],
  '6.01-geometry-and-trigonometry.json': [
    // S1 Q1: Triangle ABC with A=48°, B=67°
    { s: 0, q: 0, figure: { type: 'triangle', vertices: [[0, 0], [5, 0], [1.9, 3.2]], labels: ['A', 'B', 'C'], angle_marks: [{ vertex: 0, label: '48°' }, { vertex: 1, label: '67°' }], fill: true, width: 155 } },
    // S2 Q1: Right triangle ABC with sin A = 5/13 (5-12-13)
    { s: 1, q: 0, figure: { type: 'triangle', vertices: [[0, 0], [12, 0], [12, 5]], labels: ['A', 'C', 'B'], side_labels: ['12', '5', '13'], right_angle_at: 1, fill: true, width: 155 } },
    // S3 Q3: Circle radius 10 with chord at distance 6
    { s: 2, q: 2, figure: { type: 'circle', radius: 10, center: [0, 0], center_label: 'O', radius_label: 'r=10', chord: [37, 143], width: 150 } },
    // S4 Q3: Right circular cylinder r=4, h=9
    { s: 3, q: 2, figure: { type: 'solid', solid: 'cylinder', dims: [8, 8, 9], labels: { r: 'r=4', h: 'h=9' }, width: 150 } }
  ],
  '7.01-calculator-and-strategy.json': [
    // S1 Q1: y = 3x^2 - 5x + 2 and y = 4x - 1
    { s: 0, q: 0, figure: { type: 'plot', fns: ['3*x**2 - 5*x + 2', '4*x - 1'], xmin: -0.5, xmax: 3.5, ymin: -3, ymax: 14, points: [[0.4, 0.6], [2.6, 9.4]], width: 155 } },
    // S2 Q3: x^2 + 10x + 25 = 0 tangent to x-axis
    { s: 1, q: 2, figure: { type: 'plot', fns: ['x**2 + 10*x + 25'], xmin: -9, xmax: -1, ymin: -2, ymax: 16, points: [[-5, 0]], width: 155 } },
    // S3 Q3: h(x) = 3x^2 + 4
    { s: 2, q: 2, figure: { type: 'plot', fns: ['3*x**2 + 4'], xmin: -3.5, xmax: 3.5, ymin: 0, ymax: 35, points: [[0, 4], [2, 16], [-3, 31]], width: 155 } },
    // S4 Q1: sqrt(3x + 16) = x - 2 -> intersect at x = 7
    { s: 3, q: 0, figure: { type: 'plot', fns: ['sqrt(3*x + 16)', 'x - 2'], xmin: -2, xmax: 9, ymin: -2, ymax: 8, points: [[7, 5]], width: 155 } }
  ],
  '8.01-functions.json': [
    // S1 Q2: g(x) = sqrt(2x - 8) domain x >= 4
    { s: 0, q: 1, figure: { type: 'plot', fns: ['sqrt(2*x - 8)'], xmin: 2, xmax: 12, ymin: -1, ymax: 5, points: [[4, 0], [6, 2]], width: 155 } },
    // S2 Q2: f(x) = x^2 vs g(x) = -2x^2
    { s: 1, q: 1, figure: { type: 'plot', fns: ['x**2', '-2*x**2'], xmin: -3, xmax: 3, ymin: -12, ymax: 9, points: [[0, 0]], width: 155 } },
    // S3 Q2: f(x) = (4x - 5)/3 and inverse
    { s: 2, q: 1, figure: { type: 'plot', fns: ['(4*x - 5)/3', '(3*x + 5)/4', 'x'], xmin: -2, xmax: 8, ymin: -2, ymax: 8, points: [[5, 5], [7, 6.5]], width: 155 } },
    // S4 Q2: R(p) = -5p^2 + 200p
    { s: 3, q: 1, figure: { type: 'plot', fns: ['-5*x**2 + 200*x'], xmin: 0, xmax: 40, ymin: 0, ymax: 2200, points: [[20, 2000]], width: 155 } }
  ],
  '9.01-statistics-and-sampling.json': [
    // S1 Q1: Data set 4, 7, 8, 11, 14, 16, 24
    { s: 0, q: 0, figure: { type: 'bars', categories: ['v1', 'v2', 'v3', 'Med', 'v5', 'v6', 'v7'], values: [4, 7, 8, 11, 14, 16, 24], highlight_index: 3, ylabel: 'Value', width: 155 } },
    // S2 Q1: Data Set B values 5, 10, 10, 15
    { s: 1, q: 0, figure: { type: 'bars', categories: ['A1-4', 'B1', 'B2', 'B3', 'B4'], values: [10, 5, 10, 10, 15], highlight_index: 4, ylabel: 'Score', width: 155 } },
    // S3 Q2: Random sample representation
    { s: 2, q: 1, figure: { type: 'bars', categories: ['9th', '10th', '11th', '12th'], values: [50, 50, 50, 50], highlight_index: 1, ylabel: 'Sample Size', width: 155 } },
    // S4 Q1: Poll 54% +/- 3.5% -> [50.5, 57.5] on numberline
    { s: 3, q: 0, figure: { type: 'numberline', min: 49, max: 59, shade: [50.5, 57.5], marks: [{ x: 50.5, open: false, label: '50.5%' }, { x: 54, open: false, label: '54%' }, { x: 57.5, open: false, label: '57.5%' }], width: 155 } }
  ],
  '10.01-conditional-probability.json': [
    // S1 Q1: Survey 100 students (HS Online 40, HS In-person 20, MS Online 15, MS In-person 25)
    { s: 0, q: 0, figure: { type: 'bars', categories: ['HS-On', 'HS-In', 'MS-On', 'MS-In'], values: [40, 20, 15, 25], highlight_index: 0, ylabel: 'Students', width: 155 } },
    // S2 Q3: Conference 80 Eng (50 Py) & 40 Mgr (10 Py)
    { s: 1, q: 2, figure: { type: 'bars', categories: ['Eng-Py', 'Eng-Oth', 'Mgr-Py', 'Mgr-Oth'], values: [50, 30, 10, 30], highlight_index: 0, ylabel: 'Attendees', width: 155 } },
    // S3 Q2: 6 Red, 4 Blue marbles
    { s: 2, q: 1, figure: { type: 'bars', categories: ['Red', 'Blue'], values: [6, 4], highlight_index: 0, ylabel: 'Marbles', width: 155 } },
    // S4 Q3: Soccer (20 only), Both (10), Basketball (15 only), Neither (5)
    { s: 3, q: 2, figure: { type: 'bars', categories: ['Soc', 'Both', 'Bask', 'None'], values: [20, 10, 15, 5], highlight_index: 1, ylabel: 'Students', width: 155 } }
  ]
};

let totalAdded = 0;
for (const [fname, specs] of Object.entries(FIGURES)) {
  const fpath = path.join(DIR, fname);
  const data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
  for (const spec of specs) {
    data.sections[spec.s].questions[spec.q].figure = spec.figure;
    totalAdded++;
  }
  fs.writeFileSync(fpath, JSON.stringify(data, null, 2) + '\n');
}

console.log(`Added ${totalAdded} figures across ${Object.keys(FIGURES).length} SAT worksheet topic JSONs.`);
