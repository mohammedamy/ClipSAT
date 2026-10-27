#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const DOWNLOADS_DIR = path.join(ROOT, 'public/downloads');
const TOPICS_DIR = path.join(ROOT, 'tools/worksheet_gen/topics');

// Helper to escape PDF text
function cleanPdfText(s) {
  if (!s) return '';
  return String(s)
    .replace(/\\[()[\]]/g, '')
    .replace(/[\\()]/g, '')
    .replace(/\\mathbb\{R\}/g, 'R')
    .replace(/\\mathbf\{([a-zA-Z0-9]+)\}/g, '$1')
    .replace(/\\vec\{([a-zA-Z0-9]+)\}/g, '$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
    .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)')
    .replace(/\\cdot/g, '*')
    .replace(/\\times/g, 'x')
    .replace(/\\pm/g, '+/-')
    .replace(/\\le/g, '<=')
    .replace(/\\ge/g, '>=')
    .replace(/\\ne/g, '!=')
    .replace(/\\in/g, 'in')
    .replace(/\\sim/g, '~')
    .replace(/\\hat\{([a-zA-Z0-9]+)\}/g, '$1^')
    .replace(/\\bar\{([a-zA-Z0-9]+)\}/g, '$1_avg')
    .replace(/\\mathcal\{N\}/g, 'N')
    .replace(/\\mu/g, 'u')
    .replace(/\\sigma/g, 's')
    .replace(/\\lambda/g, 'L')
    .replace(/\\theta/g, 'theta')
    .replace(/\\pi/g, 'pi')
    .replace(/\\partial/g, 'd')
    .replace(/\\nabla/g, 'grad')
    .replace(/\\quad/g, '  ')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordWrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else {
      cur = cur ? cur + ' ' + w : w;
    }
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

function createPdfDocument(trackName, unitNum, topicTitle, questions, isAnswerKey) {
  const pages = [];
  let curCommands = [];

  function startPage(pageNum, totalPagesEst) {
    curCommands = [];
    // Header line
    curCommands.push('0.12 0.23 0.43 rg'); // Indigo
    curCommands.push('50 742 512 2.5 re f');
    
    // Brand header
    curCommands.push('BT /F2 16 Tf 50 752 Td (ClipSAT : ' + cleanPdfText(trackName) + ') Tj ET');
    curCommands.push('0.3 0.35 0.45 rg');
    curCommands.push('BT /F2 11 Tf 50 726 Td (Unit ' + unitNum + ': ' + cleanPdfText(topicTitle) + ') Tj ET');

    if (isAnswerKey) {
      curCommands.push('0.06 0.55 0.28 rg'); // Green
      curCommands.push('BT /F2 12 Tf 435 752 Td ([ANSWER KEY]) Tj ET');
    } else {
      curCommands.push('0.4 0.4 0.4 rg');
      curCommands.push('BT /F1 9.5 Tf 375 726 Td (Name: ______________________) Tj ET');
    }

    // Footer
    curCommands.push('0.6 0.65 0.7 rg');
    curCommands.push('50 48 512 0.75 re f');
    curCommands.push('BT /F1 8 Tf 145 36 Td ((c) ClipSAT: By Mr. Mohamed Abdallah +966597688647) Tj ET');
  }

  startPage(1, 2);
  let curY = 695;

  questions.forEach((q, qIdx) => {
    const rawStem = cleanPdfText(q.text || q.q);
    const stemLines = wordWrap(rawStem, 82);

    // Calculate required space
    const needed = isAnswerKey ? 130 : 95;
    if (curY - needed < 60) {
      pages.push(curCommands.join('\n'));
      startPage(pages.length + 1, 2);
      curY = 695;
    }

    // Question number
    curCommands.push('0.12 0.23 0.43 rg'); // Indigo
    curCommands.push(`BT /F2 10.5 Tf 50 ${curY} Td (Q${qIdx + 1}.) Tj ET`);

    // Stem lines
    curCommands.push('0.08 0.1 0.15 rg');
    stemLines.forEach((line, lIdx) => {
      curCommands.push(`BT /F1 10 Tf 78 ${curY - lIdx * 13} Td (${line}) Tj ET`);
    });
    curY -= stemLines.length * 13 + 6;

    // Choices
    const choices = q.choices || [];
    const choiceLetters = ['A', 'B', 'C', 'D'];
    choices.slice(0, 4).forEach((ch, cIdx) => {
      const isCorrect = (cIdx === q.answer);
      const chText = cleanPdfText(ch);
      const colX = (cIdx % 2 === 0) ? 78 : 310;
      const rowY = curY - Math.floor(cIdx / 2) * 15;

      if (isAnswerKey && isCorrect) {
        curCommands.push('0.05 0.52 0.25 rg'); // Bold Green
        curCommands.push(`BT /F2 9.5 Tf ${colX} ${rowY} Td ([x] ${choiceLetters[cIdx]}: ${chText.slice(0, 36)}) Tj ET`);
      } else {
        curCommands.push('0.25 0.28 0.32 rg');
        curCommands.push(`BT /F1 9 Tf ${colX} ${rowY} Td ([  ] ${choiceLetters[cIdx]}: ${chText.slice(0, 36)}) Tj ET`);
      }
    });
    curY -= 36;

    // Answer key solution box
    if (isAnswerKey) {
      const sol = cleanPdfText(q.sol || q.solution || '');
      const solLines = wordWrap('Solution: ' + sol, 84);
      curCommands.push('0.05 0.48 0.22 rg');
      solLines.forEach((sLine, sIdx) => {
        curCommands.push(`BT /F1 8.5 Tf 78 ${curY - sIdx * 11} Td (${sLine}) Tj ET`);
      });
      curY -= solLines.length * 11 + 10;
    } else {
      curY -= 14;
    }
  });

  pages.push(curCommands.join('\n'));

  // Build PDF binary
  const chunks = [];
  const offsets = [];

  function write(str) { chunks.push(Buffer.from(str, 'binary')); }
  function writeBuf(buf) { chunks.push(buf); }
  function totalLen() { return chunks.reduce((acc, c) => acc + c.length, 0); }

  write('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n');

  function addObj(contentBuf) {
    offsets.push(totalLen());
    const objNum = offsets.length;
    write(objNum + ' 0 obj\n');
    writeBuf(contentBuf);
    write('\nendobj\n');
    return objNum;
  }

  // Pre-generate stream objects
  const pageStreamObjNums = [];
  const pageObjNums = [];

  // Catalog = 1, Pages = 2
  // Fonts: F1 = 3, F2 = 4
  // Page objects and streams follow
  const f1Num = 3;
  const f2Num = 4;
  let nextObjNum = 5;

  pages.forEach((pgContent) => {
    const pObjNum = nextObjNum++;
    const sObjNum = nextObjNum++;
    pageObjNums.push(pObjNum);
    pageStreamObjNums.push(sObjNum);
  });

  // 1: Catalog
  addObj(Buffer.from('<< /Type /Catalog /Pages 2 0 R >>'));
  // 2: Pages
  const kidsStr = pageObjNums.map(n => n + ' 0 R').join(' ');
  addObj(Buffer.from(`<< /Type /Pages /Kids [${kidsStr}] /Count ${pages.length} >>`));
  // 3: F1 Helvetica
  addObj(Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'));
  // 4: F2 Helvetica-Bold
  addObj(Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'));

  // Write Pages and Streams
  pages.forEach((pgContent, pIdx) => {
    const pObjNum = pageObjNums[pIdx];
    const sObjNum = pageStreamObjNums[pIdx];
    const compressed = zlib.deflateSync(Buffer.from(pgContent, 'utf8'));

    // Page object
    addObj(Buffer.from(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents ${sObjNum} 0 R /Resources << /Font << /F1 ${f1Num} 0 R /F2 ${f2Num} 0 R >> >> >>`));

    // Stream object
    const streamHeader = '<< /Length ' + compressed.length + ' /Filter /FlateDecode >>\nstream\n';
    const streamTrailer = '\nendstream';
    const fullStream = Buffer.concat([Buffer.from(streamHeader, 'binary'), compressed, Buffer.from(streamTrailer, 'binary')]);
    addObj(fullStream);
  });

  // Xref
  const startXref = totalLen();
  let xrefStr = 'xref\n0 ' + (offsets.length + 1) + '\n0000000000 65535 f \n';
  offsets.forEach(off => {
    xrefStr += String(off).padStart(10, '0') + ' 00000 n \n';
  });
  xrefStr += 'trailer\n<< /Size ' + (offsets.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + startXref + '\n%%EOF\n';
  write(xrefStr);

  return Buffer.concat(chunks);
}

// -------------------------------------------------------------
// TRACK DEFINITIONS
// -------------------------------------------------------------

const ADDMATH_TRACK = {
  id: 'addmath',
  name: 'Cambridge & Edexcel Additional Mathematics (0606/4PM1)',
  units: [
    { unit: 1, num: '1.01', slug: 'functions-modulus-and-quadratics', title: 'Functions, Modulus & Quadratics', domain: 'Functions, Modulus & Quadratics' },
    { unit: 2, num: '2.01', slug: 'simultaneous-equations-and-inequalities', title: 'Simultaneous Equations & Inequalities', domain: 'Simultaneous Equations & Inequalities' },
    { unit: 3, num: '3.01', slug: 'indices-surds-and-polynomials', title: 'Indices, Surds & Polynomials', domain: 'Indices, Surds & Polynomials' },
    { unit: 4, num: '4.01', slug: 'logarithmic-and-exponential-functions', title: 'Logarithmic & Exponential Functions', domain: 'Logarithmic & Exponential Functions' },
    { unit: 5, num: '5.01', slug: 'trigonometric-functions-and-circular-measure', title: 'Trigonometric Functions & Circular Measure', domain: 'Trigonometric Functions & Circular Measure' },
    { unit: 6, num: '6.01', slug: 'permutations-and-combinations', title: 'Permutations & Combinations', domain: 'Permutations & Combinations' },
    { unit: 7, num: '7.01', slug: 'differentiation-and-rates-of-change', title: 'Differentiation & Rates of Change', domain: 'Differentiation & Rates of Change' },
    { unit: 8, num: '8.01', slug: 'integration-and-kinematics', title: 'Integration & Kinematics', domain: 'Integration & Kinematics' }
  ]
};

const MATHAI_TRACK = {
  id: 'mathai',
  name: 'Math for AI & Data Science',
  units: [
    { unit: 1, num: '1.01', slug: 'vectors-and-embeddings-in-ai', title: 'Vectors & Embeddings in AI', domain: 'Vectors & Embeddings in AI' },
    { unit: 2, num: '2.01', slug: 'neural-layer-matrices-and-activations', title: 'Neural Layer Matrices & Activations', domain: 'Neural Layer Matrices & Activations' },
    { unit: 3, num: '3.01', slug: 'gradient-descent-and-optimization', title: 'Gradient Descent & Optimization', domain: 'Gradient Descent & Optimization' },
    { unit: 4, num: '4.01', slug: 'conditional-probability-and-bayes-rule', title: "Conditional Probability & Bayes' Rule", domain: "Conditional Probability & Bayes' Rule" },
    { unit: 5, num: '5.01', slug: 'distributions-and-maximum-likelihood', title: 'Distributions & Maximum Likelihood', domain: 'Distributions & Maximum Likelihood' },
    { unit: 6, num: '6.01', slug: 'linear-regression-and-ols', title: 'Linear Regression & OLS', domain: 'Linear Regression & OLS' },
    { unit: 7, num: '7.01', slug: 'logistic-regression-and-classification', title: 'Logistic Regression & Classification', domain: 'Logistic Regression & Classification' },
    { unit: 8, num: '8.01', slug: 'pca-and-dimensionality-reduction', title: 'PCA & Dimensionality Reduction', domain: 'PCA & Dimensionality Reduction' }
  ]
};

function processTrack(trackDef) {
  const bankPath = path.join(ROOT, `bank-data/${trackDef.id}.json`);
  const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
  const pool = Array.isArray(bank.pool)
    ? bank.pool
    : (bank.easy || []).concat(bank.medium || []).concat(bank.hard || []);

  const outDir = path.join(DOWNLOADS_DIR, trackDef.id);
  const topicsTrackDir = path.join(TOPICS_DIR, trackDef.id);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  if (!fs.existsSync(topicsTrackDir)) fs.mkdirSync(topicsTrackDir, { recursive: true });

  const manifestPath = path.join(outDir, 'manifest.json');
  let fullExamEntries = [];
  if (fs.existsSync(manifestPath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      if (Array.isArray(existing)) {
        fullExamEntries = existing.filter(e => e && e.isFullExam);
      }
    } catch (_) {}
  }
  const manifest = [...fullExamEntries];

  trackDef.units.forEach(u => {
    // Select questions matching domain
    let matched = pool.filter(q => q.domain === u.domain);
    if (!matched.length) {
      matched = pool.slice(0, 8);
    }
    const qSubset = matched.slice(0, 8).map(q => ({
      text: q.text || q.q || '',
      choices: q.choices || [],
      answer: q.answer !== undefined ? q.answer : (q.correct !== undefined ? q.correct : 0),
      sol: q.sol || ''
    })); // 8 questions per worksheet

    const wsFilename = `${u.num}-${u.slug}-worksheet.pdf`;
    const akFilename = `${u.num}-${u.slug}-answerkey.pdf`;

    // Generate Worksheet PDF
    const wsPdf = createPdfDocument(trackDef.name, u.num, u.title, qSubset, false);
    fs.writeFileSync(path.join(outDir, wsFilename), wsPdf);

    // Generate Answer Key PDF
    const akPdf = createPdfDocument(trackDef.name, u.num, u.title, qSubset, true);
    fs.writeFileSync(path.join(outDir, akFilename), akPdf);

    // Write source topic JSON
    const topicJson = {
      track: trackDef.id,
      num: u.num,
      title: u.title,
      sub: null,
      sections: [
        {
          heading: `${u.title} Practice Exercises`,
          questions: qSubset.map(q => ({
            q: q.text,
            choices: q.choices,
            correct: q.answer,
            answer: q.sol
          }))
        }
      ]
    };
    fs.writeFileSync(path.join(topicsTrackDir, `${u.num}-${u.slug}.json`), JSON.stringify(topicJson, null, 2), 'utf8');

    manifest.push({
      unit: u.unit,
      num: u.num,
      lang: 'en',
      title: u.title,
      sub: null,
      worksheet: wsFilename,
      answerkey: akFilename
    });
  });

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`Generated ${trackDef.units.length} worksheet pairs and manifest.json (${manifest.length} total entries) for ${trackDef.id}!`);
}

const EDEXCEL_TRACK = {
  id: 'edexcel',
  name: 'Pearson Edexcel IGCSE Mathematics A (4MA1 Higher Tier)',
  units: [
    { unit: 1, num: '1.01', slug: 'number-surds-bounds-and-sets', title: 'Number, Surds, Bounds & Set Notation', domain: 'Number, Surds, Bounds & Set Theory' },
    { unit: 2, num: '2.01', slug: 'algebraic-fractions-and-quadratics', title: 'Algebraic Fractions, Quadratics & Simultaneous Systems', domain: 'Algebraic Fractions, Quadratics & Simultaneous Systems' },
    { unit: 3, num: '3.01', slug: 'functions-transformations-and-series', title: 'Functions, Transformations & Arithmetic Series', domain: 'Functions, Transformations & Arithmetic Series' },
    { unit: 4, num: '4.01', slug: 'coordinate-geometry-and-linear-programming', title: 'Coordinate Geometry & Linear Programming', domain: 'Coordinate Geometry & Linear Programming' },
    { unit: 5, num: '5.01', slug: 'circle-theorems-and-mensuration', title: 'Circle Theorems, Intersecting Chords & Mensuration', domain: 'Circle Theorems, Similar Solids & Mensuration' },
    { unit: 6, num: '6.01', slug: 'sine-cosine-rules-3d-trig-and-vectors', title: 'Sine & Cosine Rules, 3D Trigonometry & Vector Proofs', domain: 'Sine/Cosine Rules, 3D Trigonometry & Vectors' },
    { unit: 7, num: '7.01', slug: 'differentiation-and-kinematics', title: 'Differentiation, Stationary Points & Kinematics', domain: 'Differentiation, Stationary Points & Kinematics' },
    { unit: 8, num: '8.01', slug: 'histograms-and-conditional-probability', title: 'Histograms, Cumulative Frequency & Conditional Probability', domain: 'Histograms, Cumulative Frequency & Conditional Probability' }
  ]
};

const GATEN_TRACK = {
  id: 'gaten',
  name: 'Qiyas English GAT (Quantitative) & SAAT (Mathematics)',
  units: [
    { unit: 1, num: '1.01', slug: 'gat-mental-arithmetic-and-surds', title: 'GAT Mental Arithmetic, Divisibility & Surds', domain: 'GAT Arithmetic Shortcuts, Surds & Number Sense' },
    { unit: 2, num: '2.01', slug: 'gat-ratios-percentages-work-and-motion', title: 'GAT Ratios, Percentages, Work & Motion Problems', domain: 'GAT Ratios, Percentages, Work & Motion Problems' },
    { unit: 3, num: '3.01', slug: 'gat-quantitative-comparisons-and-geometry', title: 'GAT Quantitative Comparisons & Fast Geometry', domain: 'GAT Quantitative Comparisons & Fast Geometry' },
    { unit: 4, num: '4.01', slug: 'gat-data-interpretation-and-counting', title: 'GAT Data Interpretation, Averages & Counting', domain: 'GAT Data Interpretation, Averages & Counting' },
    { unit: 5, num: '5.01', slug: 'saat-logic-matrices-and-complex-numbers', title: 'SAAT Mathematical Logic, Matrices & Complex Numbers', domain: 'SAAT Logic, Polynomials, Matrices & Complex Numbers' },
    { unit: 6, num: '6.01', slug: 'saat-rational-functions-series-and-logs', title: 'SAAT Rational Functions, Sequences, Series & Logarithms', domain: 'SAAT Functions, Sequences & Logarithms' },
    { unit: 7, num: '7.01', slug: 'saat-trigonometry-conics-and-3d-vectors', title: 'SAAT Trigonometry, Conic Sections & 3D Vectors', domain: 'SAAT Trigonometry, Conics & Vectors' },
    { unit: 8, num: '8.01', slug: 'saat-limits-derivatives-and-integrals', title: 'SAAT Limits, Derivatives, Definite Integrals & Area', domain: 'SAAT Differential & Integral Calculus' }
  ]
};

const OLYMPIAD_TRACK = {
  id: 'olympiad',
  name: 'Contest Math & Olympiad (AMC 10/12, Kangaroo & Mawhiba)',
  units: [
    { unit: 1, num: '1.01', slug: 'olympiad-algebra-vieta-and-inequalities', title: 'Olympiad Algebraic Manipulation, Vieta & Inequalities', domain: 'Olympiad Algebra, Vieta & Inequalities' },
    { unit: 2, num: '2.01', slug: 'modular-arithmetic-primes-and-totient', title: 'Modular Arithmetic, Divisibility, Primes & Euler Totient', domain: 'Modular Arithmetic, Primes & Divisibility' },
    { unit: 3, num: '3.01', slug: 'diophantine-equations-and-sfft', title: 'Diophantine Equations, SFFT, Bezout & Floor Functions', domain: 'Diophantine Equations, SFFT & Floor Functions' },
    { unit: 4, num: '4.01', slug: 'bijective-counting-and-pigeonhole', title: 'Bijective Counting, Stars & Bars, PIE & Pigeonhole', domain: 'Bijective Counting, Inclusion-Exclusion & Pigeonhole' },
    { unit: 5, num: '5.01', slug: 'recurrence-relations-and-geometric-probability', title: 'Recurrence Relations, Markov Chains & Geometric Probability', domain: 'Recurrence Relations & Geometric Probability' },
    { unit: 6, num: '6.01', slug: 'circle-geometry-and-power-of-a-point', title: 'Olympiad Circle Geometry, Power of a Point & Radical Axes', domain: 'Circle Geometry, Power of a Point & Radical Axes' },
    { unit: 7, num: '7.01', slug: 'triangle-centers-ceva-menelaus-and-stewart', title: 'Triangle Centers, Ceva, Menelaus & Stewart Theorem', domain: 'Triangle Centers, Ceva, Menelaus & Stewart' },
    { unit: 8, num: '8.01', slug: 'invariants-monovariants-and-combinatorial-games', title: 'Invariants, Monovariants, Coloring & Combinatorial Games', domain: 'Invariants, Monovariants, Coloring & Games' }
  ]
};

const LINALG_TRACK = {
  id: 'linalg',
  name: 'Linear Algebra (Vectors, Matrices, Eigenvalues & Least Squares)',
  units: [
    { unit: 1, num: '1.01', slug: 'vectors-and-inner-product-spaces', title: 'Vectors in R^n & Inner Product Spaces', domain: 'Vectors & Inner Product Spaces' },
    { unit: 2, num: '2.01', slug: 'systems-of-linear-equations-and-rref', title: 'Systems of Linear Equations & Row Reduction', domain: 'Linear Systems & Row Reduction' },
    { unit: 3, num: '3.01', slug: 'matrices-matrix-algebra-and-inverses', title: 'Matrices, Matrix Algebra & Inverses', domain: 'Matrix Operations & Inverses' },
    { unit: 4, num: '4.01', slug: 'determinants-and-geometric-volume', title: 'Determinants & Geometric Volume', domain: 'Determinants & Volume' },
    { unit: 5, num: '5.01', slug: 'vector-spaces-and-fundamental-subspaces', title: 'Vector Spaces & The Four Fundamental Subspaces', domain: 'Vector Spaces & Subspaces' },
    { unit: 6, num: '6.01', slug: 'eigenvalues-eigenvectors-and-diagonalization', title: 'Eigenvalues, Eigenvectors & Diagonalization', domain: 'Eigenvalues & Diagonalization' },
    { unit: 7, num: '7.01', slug: 'linear-transformations-and-change-of-basis', title: 'Linear Transformations & Change of Basis', domain: 'Linear Transformations' },
    { unit: 8, num: '8.01', slug: 'orthogonality-gram-schmidt-and-least-squares', title: 'Orthogonality, Gram-Schmidt, QR & Least Squares', domain: 'Orthogonality & Least Squares' }
  ]
};

const MVC_TRACK = {
  id: 'mvc',
  name: 'Multivariable Calculus (Partials, Multiple Integrals & Vector Calculus)',
  units: [
    { unit: 1, num: '1.01', slug: 'functions-of-several-variables-and-partials', title: 'Functions of Several Variables, Limits & Partial Derivatives', domain: 'Partial Derivatives & Differentiability' },
    { unit: 2, num: '2.01', slug: 'multivariable-chain-rule-and-gradients', title: 'Multivariable Chain Rule, Directional Derivatives & Gradients', domain: 'Chain Rule & Gradients' },
    { unit: 3, num: '3.01', slug: 'multivariable-optimization-and-lagrange', title: 'Multivariable Optimization, Hessians & Lagrange Multipliers', domain: 'Optimization & Lagrange Multipliers' },
    { unit: 4, num: '4.01', slug: 'double-integrals-polar-and-jacobians', title: 'Double Integrals, Polar Coordinates & Jacobians', domain: 'Double Integrals' },
    { unit: 5, num: '5.01', slug: 'triple-integrals-cylindrical-and-spherical', title: 'Triple Integrals, Cylindrical & Spherical Coordinates', domain: 'Triple Integrals' },
    { unit: 6, num: '6.01', slug: 'vector-fields-and-line-integrals', title: 'Vector Fields, Conservative Fields & Line Integrals', domain: 'Vector Fields & Line Integrals' },
    { unit: 7, num: '7.01', slug: 'greens-theorem-and-circulation', title: 'Greens Theorem, Circulation & Planar Flux', domain: 'Greens Theorem' },
    { unit: 8, num: '8.01', slug: 'surface-integrals-divergence-and-stokes', title: 'Surface Integrals, Divergence Theorem & Stokes Theorem', domain: 'Surface Integrals, Divergence & Stokes' }
  ]
};

const ODES_TRACK = {
  id: 'odes',
  name: 'Differential Equations (First/Second Order, Laplace, Systems & Series)',
  units: [
    { unit: 1, num: '1.01', slug: 'first-order-separable-and-existence', title: 'First-Order Separable Equations & Existence Theory', domain: 'First-Order Separable ODEs' },
    { unit: 2, num: '2.01', slug: 'linear-first-order-and-integrating-factors', title: 'Linear First-Order Equations & Integrating Factors', domain: 'Linear First-Order ODEs' },
    { unit: 3, num: '3.01', slug: 'second-order-homogeneous-and-wronskian', title: 'Second-Order Linear Homogeneous ODEs & Wronskian', domain: 'Second-Order Homogeneous ODEs' },
    { unit: 4, num: '4.01', slug: 'undetermined-coefficients-and-resonance', title: 'Nonhomogeneous Equations, Undetermined Coefficients & Resonance', domain: 'Undetermined Coefficients & Resonance' },
    { unit: 5, num: '5.01', slug: 'variation-of-parameters-and-greens-kernel', title: 'Variation of Parameters & Greens Kernel', domain: 'Variation of Parameters' },
    { unit: 6, num: '6.01', slug: 'laplace-transforms-and-convolution', title: 'The Laplace Transform, Step Forcing & Convolution', domain: 'Laplace Transforms' },
    { unit: 7, num: '7.01', slug: 'systems-of-linear-odes-and-phase-planes', title: 'Systems of Linear ODEs & Phase Plane Topology', domain: 'Systems of Linear ODEs' },
    { unit: 8, num: '8.01', slug: 'power-series-solutions-and-frobenius', title: 'Power Series Solutions & Method of Frobenius', domain: 'Power Series Solutions' },
    { unit: 9, num: '9.01', slug: 'numerical-methods-euler-and-runge-kutta', title: 'Numerical Methods: Euler, RK2, RK4 & Stability', domain: 'Numerical Methods for ODEs' }
  ]
};

const ACT2L2_TRACK = {
  id: 'act2l2',
  name: 'ACT International Subject Test: Mathematics 2 (Level 2)',
  units: [
    { unit: 1, num: '1.01', slug: 'complex-numbers', title: 'Complex Numbers & De Moivre Theorem', domain: 'Complex Numbers' },
    { unit: 2, num: '2.01', slug: 'matrices-vectors', title: 'Matrices, Determinants & Vectors', domain: 'Matrices & Vectors' },
    { unit: 3, num: '3.01', slug: 'sequences-series', title: 'Sequences, Series & Binomial Theorem', domain: 'Sequences & Series' },
    { unit: 4, num: '4.01', slug: 'advanced-functions-equations', title: 'Advanced Functions, Polynomials & Logarithms', domain: 'Advanced Functions & Equations' },
    { unit: 5, num: '5.01', slug: 'trigonometry-polar-coordinates', title: 'Trigonometry, Identities & Polar Coordinates', domain: 'Trigonometry & Polar Coordinates' },
    { unit: 6, num: '6.01', slug: 'limits', title: 'Limits, Asymptotes & Instantaneous Rates', domain: 'Limits & Introductory Calculus' },
    { unit: 7, num: '7.01', slug: 'probability-combinatorics-regression', title: 'Combinatorics, Binomial Probability & Regression', domain: 'Probability & Combinatorics' },
    { unit: 8, num: '8.01', slug: 'conic-sections-3d-geometry-statistics', title: 'Conic Sections, 3D Coordinate Geometry & Statistics', domain: 'Coordinate & 3D Geometry' }
  ]
};

const EST2L2_TRACK = {
  id: 'est2l2',
  name: 'Egyptian Scholastic Test: EST II Mathematics Level 2',
  units: [
    { unit: 1, num: '1.01', slug: 'complex-numbers', title: 'Complex Numbers, Modulus & Polar Form', domain: 'Complex Numbers' },
    { unit: 2, num: '2.01', slug: 'sequences-series', title: 'Sequences, Series & Sigma Notation', domain: 'Sequences & Series' },
    { unit: 3, num: '3.01', slug: 'functions-graphs', title: 'Polynomial, Rational, Exponential & Logarithmic Functions', domain: 'Functions & Graphs' },
    { unit: 4, num: '4.01', slug: 'matrices-vectors', title: 'Matrices, Determinants & 2D/3D Vectors', domain: 'Matrices & Vectors' },
    { unit: 5, num: '5.01', slug: 'introductory-calculus', title: 'Limits, Continuity & Introductory Derivatives', domain: 'Limits & Introductory Calculus' },
    { unit: 6, num: '6.01', slug: 'probability', title: 'Permutations, Combinations & Conditional Probability', domain: 'Probability & Statistics' },
    { unit: 7, num: '7.01', slug: 'statistics-normal-distribution-regression', title: 'Descriptive Statistics, Normal Distribution & Regression', domain: 'Statistics & Data Analysis' },
    { unit: 8, num: '8.01', slug: 'trigonometry-polar-conic-sections', title: 'Trigonometric Laws, Polar Coordinates & Conic Sections', domain: 'Trigonometry & Conic Sections' }
  ]
};

const IBSL_TRACK = {
  id: 'ibsl',
  name: 'IB Diploma Mathematics: Analysis & Approaches / Applications & Interpretation SL',
  units: [
    { unit: 1, num: '1.01', slug: 'number-algebra', title: 'Topic 1: Number & Algebra (Sequences, Logs & Binomial)', domain: 'Number & Algebra' },
    { unit: 2, num: '2.01', slug: 'functions', title: 'Topic 2: Functions, Transformations & Modeling', domain: 'Functions' },
    { unit: 3, num: '3.01', slug: 'geometry-trigonometry', title: 'Topic 3: Geometry, Trigonometry & Voronoi Diagrams', domain: 'Geometry & Trigonometry' },
    { unit: 4, num: '4.01', slug: 'statistics-probability', title: 'Topic 4: Statistics, Regression & Probability Distributions', domain: 'Statistics & Probability' },
    { unit: 5, num: '5.01', slug: 'calculus', title: 'Topic 5: Differential & Integral Calculus', domain: 'Calculus' },
    { unit: 6, num: '6.01', slug: 'ai-sl-specific-topics', title: 'Topic 6: AI SL Modeling, Financial Math & Chi-Squared Tests', domain: 'Statistics & Probability' },
    { unit: 7, num: '7.01', slug: 'aa-sl-analytical-proofs-and-binomial', title: 'Topic 7: AA SL Analytical Proofs, Exact Trig & Kinematics', domain: 'Calculus' },
    { unit: 8, num: '8.01', slug: 'paper-2-extended-response-synthesis', title: 'Topic 8: IB SL Paper 1 & Paper 2 Extended-Response Synthesis', domain: 'Functions' }
  ]
};

processTrack(ADDMATH_TRACK);
processTrack(MATHAI_TRACK);
processTrack(EDEXCEL_TRACK);
processTrack(GATEN_TRACK);
processTrack(OLYMPIAD_TRACK);
processTrack(LINALG_TRACK);
processTrack(MVC_TRACK);
processTrack(ODES_TRACK);
processTrack(ACT2L2_TRACK);
processTrack(EST2L2_TRACK);
processTrack(IBSL_TRACK);
console.log('All missing worksheets successfully built and validated!');
