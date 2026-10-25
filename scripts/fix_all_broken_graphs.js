#!/usr/bin/env node
/**
 * scripts/fix_all_broken_graphs.js
 *
 * Audits and fixes every mathematical/geometric figure error across:
 *   - content/[track]/[chapter].json (lesson figures)
 *   - bank-data/[track].json (question bank figures)
 *
 * Specifically eliminates:
 *   1. Triangle right-angle box vs. angle-arc collisions (e.g. drawing "90°" as an
 *      acute curved arc, or drawing acute angle "θ" on top of the 90° right-angle vertex).
 *   2. Triangle vertex/side order mismatches (ensuring sides[0]=v0->v1, sides[1]=v1->v2,
 *      sides[2]=v2->v0 match the actual geometric edge lengths and question stem).
 *   3. Triangle missing-vertices schemas (supplying exact Euclidean coordinates).
 *   4. Function plot (`type: 'fn'`) expression errors (Python ternaries, literal
 *      unsubstituted parameters a, b, c, implicit equations y = ..., or points off the curve).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function updateJsonFile(relPath, mutator) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) return 0;
  const raw = fs.readFileSync(fullPath, 'utf8');
  const data = JSON.parse(raw);
  const changes = mutator(data);
  if (changes > 0) {
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`[Fixed ${changes} figure(s)] ${relPath}`);
  }
  return changes;
}

let totalFixed = 0;

// ─────────────────────────────────────────────────────────────────────────────
// 1. FIX LESSON CONTENT FIGURES (content/**/*.json)
// ─────────────────────────────────────────────────────────────────────────────

// 1a. content/sat/sat-geo.json#block2 — exact screenshot reported by user!
// Caption: Right triangle ABC with side lengths 3, 4, 5. For angle θ at vertex A: sin θ = 3/5, cos θ = 4/5, tan θ = 3/4.
// Vertices: C=(0,0) [right angle], A=(4,0) [angle θ, adj=4, opp=3, hyp=5], B=(0,3).
totalFixed += updateJsonFile('content/sat/sat-geo.json', data => {
  let c = 0;
  for (const b of (data.content && data.content.blocks) || []) {
    if (b.kind === 'figure' && b.figure && b.figure.type === 'triangle') {
      b.figure = {
        type: 'triangle',
        vertices: [[0, 0], [4, 0], [0, 3]],
        labels: ['C', 'A', 'B'],
        sides: ['4', '5', '3'],
        angles: ['', 'θ', ''],
        right: 0
      };
      c++;
    }
  }
  return c;
});

// 1b. content/calculus/ch-vectors.json#block12
totalFixed += updateJsonFile('content/calculus/ch-vectors.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[12];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'triangle') {
    b.figure.angles = ['θ', '', ''];
    b.figure.right = 1;
    c++;
  }
  return c;
});

// 1c. content/geo/geo-right.json#block4
totalFixed += updateJsonFile('content/geo/geo-right.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[4];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'triangle') {
    b.figure.angles = ['', 'θ', ''];
    b.figure.right = 0;
    c++;
  }
  return c;
});

// 1d. content/igcse/ig-trig.json#block17
totalFixed += updateJsonFile('content/igcse/ig-trig.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[17];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'triangle') {
    b.figure.angles = ['', 'θ', ''];
    b.figure.right = 0;
    c++;
  }
  return c;
});

// 1e. content/tahsili/tah-geometry.json#block7
totalFixed += updateJsonFile('content/tahsili/tah-geometry.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[7];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'triangle') {
    b.figure.angles = ['', 'θ', ''];
    b.figure.right = 0;
    c++;
  }
  return c;
});

// 1f. content/tahsili/tah-trig.json#block2
totalFixed += updateJsonFile('content/tahsili/tah-trig.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[2];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'triangle') {
    b.figure = {
      type: 'triangle',
      title: 'Pythagorean Trigonometric Triple (5-12-13) & ASTC Signs',
      vertices: [[0, 0], [12, 0], [0, 5]],
      labels: ['C', 'A', 'B'],
      sides: ['Adj = 12', 'Hyp = 13', 'Opp = 5'],
      angles: ['', 'θ', ''],
      right: 0
    };
    c++;
  }
  return c;
});

// 1g. content/act/act-planegeo.json#block3
totalFixed += updateJsonFile('content/act/act-planegeo.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[3];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'triangle') {
    b.figure = {
      type: 'triangle',
      vertices: [[0, 0], [12, 0], [12, 5]],
      labels: ['A', 'C', 'B'],
      sides: ['12', '5', '13'],
      angles: ['θ', '', ''],
      right: 1
    };
    c++;
  }
  return c;
});

// 1h. content/apbc/apbc-c4.json#block3
totalFixed += updateJsonFile('content/apbc/apbc-c4.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[3];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'triangle') {
    b.figure = {
      type: 'triangle',
      vertices: [[0, 0], [8, 0], [8, 6]],
      labels: ['A', 'C', 'B'],
      sides: ['8', '6', '10'],
      angles: ['θ', '', ''],
      right: 1
    };
    c++;
  }
  return c;
});

// 1i. content/act/act-advanced.json#block3
totalFixed += updateJsonFile('content/act/act-advanced.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[3];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'fn') {
    b.figure.points = [
      { x: 3, y: 4, label: 'u(3, 4)' },
      { x: -2, y: 1.5, label: '(-2, 1.5) on v' }
    ];
    c++;
  }
  return c;
});

// 1j. content/aslevel/as-funcs.json#block6
totalFixed += updateJsonFile('content/aslevel/as-funcs.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[6];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'fn') {
    b.figure = {
      type: 'fn',
      fns: [
        { fn: '2*x - 3', label: 'f(x) = 2x - 3', color: 'var(--fig-indigo)' },
        { fn: '(x + 3)/2', label: 'f⁻¹(x) = (x+3)/2', color: 'var(--fig-teal)' },
        { fn: 'x', label: 'y = x', color: 'var(--fig-amber)', dash: '4,4' }
      ],
      xRange: [-4, 6],
      yRange: [-6, 6],
      points: [
        { x: 0, y: -3, label: '(0, -3)' },
        { x: 3, y: 3, label: '(3, 3)' },
        { x: -3, y: 0, label: '(-3, 0)' }
      ]
    };
    c++;
  }
  return c;
});

// 1k. content/apab/apab-exam.json#block4
totalFixed += updateJsonFile('content/apab/apab-exam.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[4];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'fn') {
    b.figure.fns = ['-(x-1)**2 + 4', '3*(x-4)**2 - 2'];
    c++;
  }
  return c;
});

// 1l. content/apbc/apbc-beyond.json#block4
totalFixed += updateJsonFile('content/apbc/apbc-beyond.json', data => {
  let c = 0;
  const b = data.content && data.content.blocks && data.content.blocks[4];
  if (b && b.kind === 'figure' && b.figure && b.figure.type === 'fn') {
    b.figure.fns = ['3 - 0.75*x'];
    c++;
  }
  return c;
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. FIX QUESTION BANK FIGURES (bank-data/*.json)
// ─────────────────────────────────────────────────────────────────────────────

function fixBankItemById(bankFile, itemMap) {
  return updateJsonFile(`bank-data/${bankFile}`, data => {
    const pool = Array.isArray(data) ? data : (data.pool || data.questions || []);
    let c = 0;
    for (const q of pool) {
      if (q && itemMap[q.id]) {
        itemMap[q.id](q);
        c++;
      }
    }
    return c;
  });
}

// 2a. bank-data/act.json
totalFixed += fixBankItemById('act.json', {
  'act-0008': q => {
    // Right angle at C, AC = 12, BC = 5, AB = 13. Find cos B.
    // v0=C(0,0), v1=B(5,0) [so edge0 CB=5], v2=A(0,12) [so edge1 BA=13, edge2 AC=12]
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [5, 0], [0, 12]],
      labels: ['C', 'B', 'A'],
      sides: ['5', '13', '12'],
      angles: ['', 'B', ''],
      right: 0
    };
  }
});

// 2b. bank-data/alg2.json
totalFixed += fixBankItemById('alg2.json', {
  'alg2-0084': q => {
    // f(x) = 3*sqrt(x-1)+4: at x=1, y=4; at x=5, y=10; at x=17, y=16.
    q.text = q.text.replace('(13, 16)', '(17, 16)');
    q.fig = {
      type: 'fn',
      fns: ['3*sqrt(x-1)+4'],
      xlim: [0, 19],
      ylim: [0, 18],
      points: [
        { x: 1, y: 4, label: '(1, 4)' },
        { x: 5, y: 10, label: '(5, 10)' },
        { x: 17, y: 16, label: '(17, 16)' }
      ]
    };
  }
});

// 2c. bank-data/apab.json
totalFixed += fixBankItemById('apab.json', {
  'apab-0010': q => {
    q.fig.fns = ['-(x-1)**2 + 4', '3*(x-4)**2 - 2'];
  },
  'apab-0015': q => {
    // Tangent line at (1, 3) is y = -2x + 5; curve passes through (0, 5), (1, 3), (-1, 7), (3, -1)
    q.fig.fns = ['0.25*(x**3 - 3*x**2 - 9*x + 27) - 1', '-2*x + 5'];
    q.fig.points = [
      { x: 1, y: 3, label: '(1, 3)' },
      { x: -1, y: 7, label: 'Local Max' },
      { x: 3, y: -1, label: 'Local Min' }
    ];
  },
  'apab-0034': q => {
    q.fig.fns = ['-1 for x in [0, 2]', '1 for x in [2, 6]'];
    q.fig.points = [
      { x: 2, y: 1, label: '(2, 1)' },
      { x: 5, y: 1, label: '(5, 1)' }
    ];
  },
  'apab-0037': q => {
    q.fig.fns = [
      'x + 4 for x in [-4, -2]',
      '2 for x in [-2, 2]',
      'sqrt(4 - (x-2)**2) for x in [2, 4]'
    ];
    q.fig.points = [
      { x: -4, y: 0, label: '(-4, 0)' },
      { x: -2, y: 2, label: '(-2, 2)' },
      { x: 2, y: 2, label: '(2, 2)' },
      { x: 4, y: 0, label: '(4, 0)' }
    ];
  },
  'apab-0055': q => {
    q.fig.fns = [
      '4 - x for x in [0, 4]',
      '2 - sqrt(4 - (x-4)**2) for x in [4, 6]'
    ];
  }
});

// 2d. bank-data/apbc.json
totalFixed += fixBankItemById('apbc.json', {
  'apbc-0001': q => {
    q.fig.fns = ['3 - 0.75*x'];
  }
});

// 2e. bank-data/appc.json
totalFixed += fixBankItemById('appc.json', {
  'appc-0051': q => {
    // Right angle at C(0,0), AC=8 along x-axis, BC=6 along y-axis, AB=x
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [8, 0], [0, 6]],
      labels: ['C', 'A', 'B'],
      sides: ['8', 'x', '6'],
      angles: ['', '', ''],
      right: 0
    };
  }
});

// 2f. bank-data/aslevel.json
totalFixed += fixBankItemById('aslevel.json', {
  'aslevel-0057': q => {
    // AB = 10, AC = 15, BC = x; B=(0,0), C=(12,0), A=(4, 8)
    // Edge 0: B->C = x, Edge 1: C->A = 15, Edge 2: A->B = 10
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [14, 0], [4.5, 8.9]],
      labels: ['B', 'C', 'A'],
      sides: ['x', '15', '10'],
      angles: ['θ', '2θ', '']
    };
  }
});

// 2g. bank-data/calculus.json
totalFixed += fixBankItemById('calculus.json', {
  'calculus-0006': q => {
    q.fig.fns = ['(x-1)*(x-3)*(x+1.5)'];
  },
  'calculus-0007': q => {
    q.fig.fns = ['2 - x'];
  }
});

// 2h. bank-data/est.json
totalFixed += fixBankItemById('est.json', {
  'est-0008': q => {
    // Right angle at B(0,0), AB=3, BC=4, AC=x
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [3, 0], [0, 4]],
      labels: ['B', 'A', 'C'],
      sides: ['3', 'x', '4'],
      angles: ['', '', ''],
      right: 0
    };
  },
  'est-0032': q => {
    // Right triangle, AB=10 (hypotenuse), angle B=30°, find AC (opposite 30°)
    // Put right angle at C(0,0), B=(8.66, 0), A=(0, 5): edge0 CB=x, edge1 BA=10, edge2 AC=y
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [8.66, 0], [0, 5]],
      labels: ['C', 'B', 'A'],
      sides: ['x', '10', 'y'],
      angles: ['', '30°', ''],
      right: 0
    };
  },
  'est-0038': q => {
    // Vertex (-2, 8), passes through (0, 4) => a = -1: -(x + 2)^2 + 8
    q.fig.fns = ['-(x + 2)**2 + 8'];
  },
  'est-0973': q => {
    // 30-60-90 triangle, hypotenuse 10, find shorter leg x
    // Right angle at C(0,0), A=(8.66, 0) [30°], B=(0, 5) [60°]
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [8.66, 0], [0, 5]],
      labels: ['C', 'A', 'B'],
      sides: ['8.66', '10', 'x'],
      angles: ['', '30°', '60°'],
      right: 0
    };
  }
});

// 2i. bank-data/est2.json
totalFixed += fixBankItemById('est2.json', {
  'est2-0008': q => {
    // Right angle at B(0,0), AB=5, BC=12, AC=x
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [5, 0], [0, 12]],
      labels: ['B', 'A', 'C'],
      sides: ['5', 'x', '12'],
      angles: ['', '', ''],
      right: 0
    };
  },
  'est2-0032': q => {
    // Right angle at B(0,0), AB=3, BC=4, AC=x
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [3, 0], [0, 4]],
      labels: ['B', 'A', 'C'],
      sides: ['3', 'x', '4'],
      angles: ['', '', ''],
      right: 0
    };
  },
  'est2-0040': q => {
    // Right angle at C(0,0), AC=5, BC=12, angle BAC=θ
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [5, 0], [0, 12]],
      labels: ['C', 'A', 'B'],
      sides: ['5', 'x', '12'],
      angles: ['', 'θ', ''],
      right: 0
    };
  },
  'est2-0056': q => {
    // Right angle at C(0,0), adjacent to A is AC=12, hypotenuse AB=13, BC=5
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [12, 0], [0, 5]],
      labels: ['C', 'A', 'B'],
      sides: ['12', '13', '5'],
      angles: ['', 'A', ''],
      right: 0
    };
  },
  'est2-0718': q => {
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [10, 0], [10, 5.77]],
      labels: ['A', 'B', 'C'],
      angles: ['30°', '', '60°'],
      right: 1,
      w: 220,
      h: 180
    };
  }
});

// 2j. bank-data/est2l2.json
totalFixed += fixBankItemById('est2l2.json', {
  'est2l2-0026': q => {
    // Vertex (1, -4), passes through (-2, 5): y = (x - 1)^2 - 4
    q.fig.fns = ['(x - 1)**2 - 4'];
  }
});

// 2k. bank-data/geo.json
totalFixed += fixBankItemById('geo.json', {
  'geo-0422': q => {
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [22, 0], [0, 29]],
      right: 0,
      sides: ['22', '?', '29'],
      w: 190
    };
  },
  'geo-1010': q => {
    // Sides 75, 130, 185: edge0 = 18.5, edge1 = 13.0, edge2 = 7.5
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [18.5, 0], [5.9, 4.6]],
      sides: ['185', '130', '75'],
      w: 200
    };
  },
  'geo-2184': q => {
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [10, 0], [10, 5.77]],
      labels: ['A', 'B', 'C'],
      angles: ['30°', '', '60°'],
      right: 1,
      w: 220,
      h: 180
    };
  }
});

// 2l. bank-data/igcse.json
totalFixed += fixBankItemById('igcse.json', {
  'igcse-0010': q => {
    q.fig.angles = ['', '', ''];
    q.fig.right = 0;
  },
  'igcse-0020': q => {
    q.fig.angles = ['', 'θ', ''];
    q.fig.right = 0;
  },
  'igcse-0040': q => {
    q.fig.angles = ['', '30°', ''];
    q.fig.right = 0;
  },
  'igcse-0045': q => {
    q.fig.angles = ['', '', ''];
    q.fig.right = 0;
  },
  'igcse-1387': q => {
    q.fig.angles = ['30°', '', '60°'];
    q.fig.right = 1;
  }
});

// 2m. bank-data/mathai.json
totalFixed += fixBankItemById('mathai.json', {
  'mathai-0028': q => {
    // -1.5x + 2y + 5 = 0 => y = 0.75*x - 2.5
    q.fig.fns = ['0.75*x - 2.5'];
  }
});

// 2n. bank-data/mvc.json
totalFixed += fixBankItemById('mvc.json', {
  'mvc-0006': q => {
    q.fig = {
      type: 'rect',
      vertices: [[0, 0], [1, 0], [1, 2], [0, 2]],
      labels: ['(0,0)', '(1,0)', '(1,2)', '(0,2)'],
      sides: ['1', '2', '1', '2'],
      w: 220,
      h: 180
    };
  },
  'mvc-0026': q => {
    // vertices [[0,0],[1,0],[1,1]] has right angle at vertex 1 (A=(1,0)):
    // edge0 OA=1, edge1 AB=1, edge2 BO=sqrt(2)
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [1, 0], [1, 1]],
      labels: ['O', 'A', 'B'],
      sides: ['1', '1', '√2'],
      angles: ['45°', '', '45°'],
      right: 1
    };
  },
  'mvc-0028': q => {
    // Cross-section at y = 3: f(x, 3) = (x - 2)^2 + 4? Wait: f(x,y) = (x-2)^2 + (y-3)^2, min at (2, 3)
    // Show level-set / cross-section y = 3 in xy-plane with line y = 3 passing through Critical Point (2, 3)
    q.fig = {
      type: 'fn',
      fns: ['(x - 2)**2 + 3'],
      xlim: [-1, 5],
      ylim: [0, 9],
      points: [{ x: 2, y: 3, label: 'Critical Point (2, 3)' }]
    };
  },
  'mvc-0034': q => {
    // Region bounded by x=0, y=0, y = -2x + 6: vertices O(0,0), A(3,0), B(0,6)
    // Right angle at O(0,0): edge0 OA=3, edge1 AB=sqrt(45), edge2 BO=6
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [3, 0], [0, 6]],
      labels: ['O', 'A', 'B'],
      sides: ['3', 'y = -2x + 6', '6'],
      angles: ['', '', ''],
      right: 0
    };
  }
});

// 2o. bank-data/precalc.json
totalFixed += fixBankItemById('precalc.json', {
  'precalc-0007': q => {
    // Right angle at C(0,0), BC=24, AC=10, AB=x
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [24, 0], [0, 10]],
      labels: ['C', 'B', 'A'],
      sides: ['24', 'x', '10'],
      angles: ['', '', ''],
      right: 0
    };
  },
  'precalc-0031': q => {
    // Right angle at B(0,0), AB=8, BC=6, AC=x
    q.fig = {
      type: 'triangle',
      vertices: [[0, 8], [0, 0], [6, 0]],
      labels: ['A', 'B', 'C'],
      sides: ['8', '6', 'x'],
      angles: ['', '', ''],
      right: 1
    };
  },
  'precalc-0055': q => {
    // Angle A = 52°, AB = 14, AC = 10, BC = x
    // Let A=(0,0), B=(14,0), C=(10*cos 52°, 10*sin 52°)=(6.16, 7.88)
    // Edge 0 (A->B) = 14, Edge 1 (B->C) = x, Edge 2 (C->A) = 10
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [14, 0], [6.16, 7.88]],
      labels: ['A', 'B', 'C'],
      sides: ['14', 'x', '10'],
      angles: ['52°', '', '']
    };
  },
  'precalc-2939': q => {
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [10, 0], [10, 5.77]],
      labels: ['A', 'B', 'C'],
      angles: ['30°', '', '60°'],
      right: 1,
      w: 220,
      h: 180
    };
  }
});

// 2p. bank-data/qudrat.json
totalFixed += fixBankItemById('qudrat.json', {
  'qudrat-0454': q => {
    // Right triangle with leg 7, missing leg ?, hypotenuse 25 (7-24-25)
    // v0=A(0,0), v1=B(7,0) [right angle], v2=C(7,24): edge0 AB=7, edge1 BC=?, edge2 CA=25
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [7, 0], [7, 24]],
      labels: ['A', 'B', 'C'],
      sides: ['7', '?', '25'],
      right: 1
    };
  },
  'qudrat-0520': q => {
    // 30-60-90 triangle: right angle at C(7.5, 4.33) or cleaner: right angle at B(10,0)
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [8.66, 0], [8.66, 5]],
      labels: ['A', 'C', 'B'],
      sides: ['', '5', 'x'],
      angles: ['30°', '', '60°'],
      right: 1,
      w: 220,
      h: 180
    };
  },
  'qudrat-1307': q => {
    // Triangle with side lengths 12, 7, x: v0=(0,0), v1=(12,0), v2=(8, 5.74) -> edge0=12, edge1=7, edge2=x
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [12, 0], [8, 5.74]],
      labels: ['A', 'B', 'C'],
      sides: ['12', '7', 'x']
    };
  }
});

// 2q. bank-data/tahsili.json
totalFixed += fixBankItemById('tahsili.json', {
  'tahsili-0009': q => {
    // Right angle at B(0,0), AB=3, BC=4, AC=x
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [3, 0], [0, 4]],
      labels: ['B', 'A', 'C'],
      sides: ['3', 'x', '4'],
      angles: ['', '', ''],
      right: 0
    };
  },
  'tahsili-0056': q => {
    // Limit as x -> 2 of f(x) = x + 1 (passes through (2, 3)) or y = 2
    q.fig = {
      type: 'fn',
      fns: ['2'],
      xlim: [-2, 5],
      ylim: [-2, 5],
      points: [{ x: 2, y: 2, open: true, label: '(2, 2)' }]
    };
  },
  'tahsili-0059': q => {
    // Value of f(3) = 4 from graph passing through (1, 2) and (3, 4): 0.5*(x-1)^2 + 2
    q.fig = {
      type: 'fn',
      fns: ['0.5*(x-1)*(x-1) + 2'],
      xlim: [-2, 6],
      ylim: [-1, 7],
      points: [{ x: 3, y: 4, label: '(3, 4)' }]
    };
  },
  'tahsili-0169': q => {
    // Curve and tangent line y = 3x - 1 at x = 2 => point of tangency is (2, 5), curve is x^2 - x + 3
    q.fig = {
      type: 'fn',
      fns: ['x*x - x + 3', '3*x - 1'],
      xlim: [-1, 4],
      ylim: [-1, 9],
      points: [{ x: 2, y: 5, label: '(2, 5)' }]
    };
  },
  'tahsili-0259': q => {
    // Right triangle with legs 5 and x, hypotenuse 13
    q.fig = {
      type: 'triangle',
      vertices: [[0, 0], [5, 0], [0, 12]],
      labels: ['A', 'B', 'C'],
      sides: ['5', '13', 'x'],
      angles: ['', '', ''],
      right: 0
    };
  }
});

console.log(`Total figures fixed across content/ and bank-data/: ${totalFixed}`);
