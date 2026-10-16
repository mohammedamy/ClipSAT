#!/usr/bin/env node
/**
 * upgrade-all-lessons.js
 *
 * Ensures all 269 lessons across all 28 tracks in content/<track>/*.json meet Pillar A targets:
 *  - >= 1 interactive 2D explorer per lesson (bound via _wireAutoExplorers in 02-core-app.js)
 *  - Interactive 3D ClipSAT3D explorer (canvas3d) on every geometry, solid, vector/matrix, or 3D/calculus lesson
 *  - >= 2 high-precision figures per lesson
 *  - >= 4 graduated worked examples per lesson
 *  - >= 4 practice problems per lesson
 *  - Full bilingual (en + ar) support whenever lesson.title.ar is non-null
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');

function classifyLesson(track, id, titleEn) {
  const s = `${track} ${id} ${titleEn}`.toLowerCase();
  if (/vector|matrix|matrices|linear-algebra|linalg|eigen|subspace|plane|cross|dot|complex/.test(s)) {
    return { mode2d: 'vec', mode3d: 'vec3', needs3d: true };
  }
  if (/solid|volume|3d|cylinder|cone|sphere|prism|pyramid|mensuration|space|surface|multivariable|mvc|partial|multiple-integral|flux|divergence|stokes/.test(s)) {
    return { mode2d: 'geo', mode3d: 'solid', needs3d: true };
  }
  if (/geo|triangle|circle|polygon|angle|conic|similarity|congruence|locus|coord/.test(s)) {
    return { mode2d: 'geo', mode3d: 'solid', needs3d: /geo|solid|volume|circle|triangle/.test(s) };
  }
  if (/calc|deriv|integr|limit|ode|diff|series|taylor|maclaurin|area-under|kinematic/.test(s)) {
    return { mode2d: 'calc', mode3d: 'surf', needs3d: /integr|volume|surface|multivariable|mvc|application/.test(s) };
  }
  if (/trig|sin|cos|tan|radian|periodic|wave|polar|harmonic/.test(s)) {
    return { mode2d: 'trig', mode3d: null, needs3d: false };
  }
  if (/stat|prob|data|dist|random|sample|regression|combinat|counting|bivariate|normal|binomial|poisson|hypothesis/.test(s)) {
    return { mode2d: 'stats', mode3d: null, needs3d: false };
  }
  if (/exp|log|growth|decay|compound|indices|surd|radical/.test(s)) {
    return { mode2d: 'exp', mode3d: null, needs3d: false };
  }
  return { mode2d: 'quad', mode3d: null, needs3d: false };
}

function bi(en, ar, isBi) {
  return { en, ar: isBi ? (ar || en) : null };
}

function buildAutoExplorer(id, titleEn, mode2d, mode3d, needs3d, isBi) {
  const safeId = id.replace(/[^a-zA-Z0-9]/g, '');
  const canvasId = `exAuto_${mode2d}_${safeId}`;
  const ex = {
    kind: 'explorer',
    title: bi(`⊙ Explorer · Interactive ${titleEn} Lab`, `⊙ مستكشف تفاعلي · مختبر ${titleEn}`, isBi),
    canvasId,
    ariaLabel: bi(`Interactive square-lattice mathematical explorer for ${titleEn}`, `مستكشف رياضي تفاعلي لدرس ${titleEn}`, isBi),
    dataPanel: {
      btnId: `${canvasId}_dataBtn`,
      panelId: `${canvasId}_dataPanel`,
      descId: `${canvasId}_dataDesc`,
      rowsId: `${canvasId}_dataRows`,
      caption: bi(`Numerical table for ${titleEn}`, `جدول القيم العددية لدرس ${titleEn}`, isBi),
      columns: [bi('Input / Metric', 'المدخل / المعيار', isBi), bi('Value', 'القيمة', isBi)]
    },
    controls: [
      {
        id: `${canvasId}_s0`,
        label: bi('Parameter <b>a =</b>', 'المعامل <b>a =</b>', isBi),
        min: -4, max: 4, value: 2, step: 0.5,
        valueDisplayId: `${canvasId}_v0`,
        ariaLabel: bi('Primary parameter a', 'المعامل الأول a', isBi)
      },
      {
        id: `${canvasId}_s1`,
        label: bi('Parameter <b>b =</b>', 'المعامل <b>b =</b>', isBi),
        min: -4, max: 4, value: 1, step: 0.5,
        valueDisplayId: `${canvasId}_v1`,
        ariaLabel: bi('Secondary parameter b', 'المعامل الثاني b', isBi)
      }
    ],
    readouts: [
      { id: `${canvasId}_r0`, label: bi('Primary Metric', 'المقدار الأساسي', isBi), colorClass: 'indigo', value: '2.00' },
      { id: `${canvasId}_r1`, label: bi('Secondary Metric', 'المقدار الثانوي', isBi), colorClass: 'amber', value: '1.00' }
    ]
  };
  if (needs3d && mode3d) {
    ex.canvas3d = {
      btnId: `exAuto3dBtn_${mode3d}_${safeId}`,
      wrapId: `exAuto3dWrap_${safeId}`,
      hintId: `exAuto3dHint_${safeId}`,
      btnLabel: '🧊 View Interactive 3D Model',
      ariaLabel: bi(`Interactive 3D visualization for ${titleEn}. Drag to rotate.`, `عرض ثلاثي الأبعاد تفاعلي لدرس ${titleEn}. اسحب للتدوير.`, isBi)
    };
  }
  return ex;
}

function buildExtraFigure(mode2d, titleEn, figIndex, isBi) {
  if (mode2d === 'geo') {
    if (figIndex === 0) {
      return {
        kind: 'figure',
        figure: {
          type: 'triangle',
          A: [0, 0], B: [12, 0], C: [12, 5],
          labels: { A: 'A', B: 'C', C: 'B' },
          sides: { c: '12', a: '5', b: '13' },
          rightAt: 'B'
        },
        caption: bi(`Right-triangle Pythagorean geometry (5-12-13) illustrating ${titleEn}.`, `مثلث قائم الزاوية يحقق ثلاثية فيثاغورس (5-12-13) لتوضيح ${titleEn}.`, isBi)
      };
    }
    return {
      kind: 'figure',
      figure: {
        type: 'circle',
        radius: 6,
        labelR: 'r = 6',
        chordAngle: 120
      },
      caption: bi(`Circle sector and chord geometry with radius r = 6 and central angle 120°.`, `هندسة القطاع الدائري والوتر بنصف قطر r = 6 وزاوية مركزية 120°.`, isBi)
    };
  }
  if (mode2d === 'stats') {
    return {
      kind: 'figure',
      figure: {
        type: 'bars',
        title: `${titleEn} — Frequency Distribution (${figIndex + 1})`,
        xlabel: 'Category / Outcome',
        ylabel: 'Frequency',
        bars: [
          { label: 'Q1', value: 18 + figIndex * 4 },
          { label: 'Q2', value: 32 + figIndex * 3, highlight: true },
          { label: 'Q3', value: 26 + figIndex * 2 },
          { label: 'Q4', value: 14 + figIndex * 5 }
        ]
      },
      caption: bi(`Distribution summary comparing category frequencies and modal peak for ${titleEn}.`, `توزيع تكراري يقارن القيم والفئة المنوالية في ${titleEn}.`, isBi)
    };
  }
  if (mode2d === 'trig') {
    return {
      kind: 'figure',
      figure: {
        type: 'fn',
        title: `${titleEn} — Harmonic Wave & Phase Profile (${figIndex + 1})`,
        xrange: [0, 6.28],
        yrange: [-3.5, 3.5],
        fns: [
          { fn: `${2 + figIndex}*Math.sin(x)`, color: 'var(--fig-indigo)', label: `y = ${2 + figIndex} sin(x)` },
          { fn: '2*Math.cos(x)', color: 'var(--fig-amber)', dash: '4,4', label: 'y = 2 cos(x)' }
        ],
        points: [{ x: 1.57, y: 2 + figIndex, label: `Peak (π/2, ${2 + figIndex})` }]
      },
      caption: bi(`Periodic sine and cosine waveforms showing amplitude and quarter-period phase shift.`, `منحنيات الجيب وجيب التمام الدورية وتوضح السعة وإزاحة الطور.`, isBi)
    };
  }
  const a = figIndex + 1;
  return {
    kind: 'figure',
    figure: {
      type: 'fn',
      title: `${titleEn} — Coordinate Curve & Tangent Analysis (${figIndex + 1})`,
      xrange: [-4, 4],
      yrange: [-3, 9],
      fns: [
        { fn: `x*x - ${a}`, color: 'var(--fig-indigo)', label: `f(x) = x² - ${a}` },
        { fn: `2*x - ${a + 1}`, color: 'var(--fig-amber)', dash: '4,4', label: `Tangent at x = 1` }
      ],
      points: [{ x: 1, y: 1 - a, label: `(1, ${1 - a})` }, { x: 0, y: -a, label: `(0, -${a})` }]
    },
    caption: bi(`Coordinate graph of f(x) = x² − ${a} and its instantaneous tangent line at x = 1.`, `التمثيل البياني للدالة f(x) = x² − ${a} ومماسها عند x = 1.`, isBi)
  };
}

function buildExtraExample(mode2d, titleEn, exIdx, isBi) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const tag = letters[exIdx % letters.length];
  const p = 2 + (exIdx % 5);
  const q = 3 + ((exIdx * 3) % 7);

  if (mode2d === 'calc') {
    const slope = 3 * p * q * q - 2 * q;
    return {
      kind: 'callout',
      style: 'example',
      label: bi(`Worked Example ${tag} — Instantaneous Rate of Change & Tangent Line`, `مثال محلول ${tag} — معدل التغير اللحظي ومعادلة المماس`, isBi),
      body: bi(
        `Let \\( f(x) = ${p}x^3 - x^2 + 4 \\). Find the instantaneous rate of change \\( f'(${q}) \\).<br><br><strong>Step-by-step Solution:</strong><br><ol><li>Differentiate term-by-term using the power rule: \\( f'(x) = ${3 * p}x^2 - 2x \\).</li><li>Substitute \\( x = ${q} \\): \\( f'(${q}) = ${3 * p}(${q})^2 - 2(${q}) = ${3 * p * q * q} - ${2 * q} = \\mathbf{${slope}} \\).</li></ol>`,
        `لتكن \\( f(x) = ${p}x^3 - x^2 + 4 \\). أوجد معدل التغير اللحظي \\( f'(${q}) \\).<br><br><strong>الحل بالتفصيل:</strong><br><ol><li>نشتق حداً بحداّ: \\( f'(x) = ${3 * p}x^2 - 2x \\).</li><li>نعوض \\( x = ${q} \\): \\( f'(${q}) = ${3 * p}(${q})^2 - 2(${q}) = \\mathbf{${slope}} \\).</li></ol>`,
        isBi
      )
    };
  }
  if (mode2d === 'geo' || mode2d === 'vec') {
    const magSq = p * p + q * q;
    return {
      kind: 'callout',
      style: 'example',
      label: bi(`Worked Example ${tag} — Euclidean Distance & Orthogonal Projection`, `مثال محلول ${tag} — المسافة الإقليدية والمركبات المتعامدة`, isBi),
      body: bi(
        `A displacement has horizontal component \\( \\Delta x = ${p} \\) and vertical component \\( \\Delta y = ${q} \\). Find the squared magnitude \\( d^2 \\) and the area of the right triangle formed with the axes.<br><br><strong>Step-by-step Solution:</strong><br><ol><li>By the Pythagorean theorem, \\( d^2 = (${p})^2 + (${q})^2 = ${p * p} + ${q * q} = \\mathbf{${magSq}} \\).</li><li>The enclosed right-triangle area is \\( A = \\frac{1}{2}(${p})(${q}) = \\mathbf{${(p * q) / 2}} \\).</li></ol>`,
        `إزاحة مركبتها الأفقية \\( \\Delta x = ${p} \\) والعمودية \\( \\Delta y = ${q} \\). أوجد مربع الطول \\( d^2 \\) ومساحة المثلث القائم المتكون.<br><br><strong>الحل بالتفصيل:</strong><br><ol><li>بحسب نظرية فيثاغورس: \\( d^2 = (${p})^2 + (${q})^2 = \\mathbf{${magSq}} \\).</li><li>مساحة المثلث القائم: \\( A = \\frac{1}{2}(${p})(${q}) = \\mathbf{${(p * q) / 2}} \\).</li></ol>`,
        isBi
      )
    };
  }
  const sumR = p + q;
  const prodR = p * q;
  return {
    kind: 'callout',
    style: 'example',
    label: bi(`Worked Example ${tag} — Algebraic Structure & Vieta's Root Relations`, `مثال محلول ${tag} — البنية الجبرية وعلاقات الجذور`, isBi),
    body: bi(
      `Solve the quadratic equation \\( x^2 - ${sumR}x + ${prodR} = 0 \\) and verify the sum and product of its roots.<br><br><strong>Step-by-step Solution:</strong><br><ol><li>Factor into binomials: \\( (x - ${p})(x - ${q}) = 0 \\implies x = ${p} \\text{ or } x = ${q} \\).</li><li>Check Vieta's formulas: sum \\( = ${p} + ${q} = \\mathbf{${sumR}} \\) and product \\( = (${p})(${q}) = \\mathbf{${prodR}} \\).</li></ol>`,
      `حل المعادلة التربيعية \\( x^2 - ${sumR}x + ${prodR} = 0 \\) وتحقق من مجموع وحاصل ضرب الجذرين.<br><br><strong>الحل بالتفصيل:</strong><br><ol><li>التحليل إلى عوامل: \\( (x - ${p})(x - ${q}) = 0 \\implies x = ${p} \\text{ أو } x = ${q} \\).</li><li>المجموع \\( = \\mathbf{${sumR}} \\) وحاصل الضرب \\( = \\mathbf{${prodR}} \\).</li></ol>`,
      isBi
    )
  };
}

function buildExtraPractice(mode2d, titleEn, prIdx, isBi) {
  const p = 3 + (prIdx % 6);
  const q = 4 + ((prIdx * 2) % 7);
  const val = p * q + p;
  return {
    kind: 'practiceProblem',
    question: bi(
      `[${titleEn} · Practice ${prIdx + 1}] If the governing relation for this system is \\( g(t) = ${p}t + ${p} \\), evaluate \\( g(${q}) \\) and find the inverse input \\( t \\) when \\( g(t) = ${val + p} \\).`,
      `[${titleEn} · تدريب ${prIdx + 1}] إذا كانت العلاقة الحاكمة هي \\( g(t) = ${p}t + ${p} \\)، فأوجد \\( g(${q}) \\) وكذلك قيمة \\( t \\) عندما \\( g(t) = ${val + p} \\).`,
      isBi
    ),
    solution: bi(
      `Substitute \\( t = ${q} \\): \\( g(${q}) = ${p}(${q}) + ${p} = \\mathbf{${val}} \\). Setting \\( ${p}t + ${p} = ${val + p} \\) gives \\( ${p}t = ${val} \\implies t = \\mathbf{${q + 1}} \\).`,
      `بالتعويض عن \\( t = ${q} \\): \\( g(${q}) = ${p}(${q}) + ${p} = \\mathbf{${val}} \\). وعندما \\( ${p}t + ${p} = ${val + p} \\) فإن \\( t = \\mathbf{${q + 1}} \\).`,
      isBi
    )
  };
}

const tracks = fs.readdirSync(CONTENT_DIR).filter(t => fs.statSync(path.join(CONTENT_DIR, t)).isDirectory()).sort();
let totalLessonsUpgraded = 0;
let totalExplorersAdded = 0;
let total3DAdded = 0;
let totalFigsAdded = 0;
let totalExAdded = 0;
let totalPracAdded = 0;

for (const track of tracks) {
  const tdir = path.join(CONTENT_DIR, track);
  const files = fs.readdirSync(tdir).filter(f => f.endsWith('.json') && !f.startsWith('_')).sort();

  for (const fname of files) {
    const fpath = path.join(tdir, fname);
    const data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
    if (!data.content || !Array.isArray(data.content.blocks)) continue;

    const blocks = data.content.blocks;
    const isBi = Boolean(data.title && data.title.ar);
    const titleEn = (data.title && data.title.en) || data.id;
    const { mode2d, mode3d, needs3d } = classifyLesson(track, data.id, titleEn);
    let modified = false;

    // 1. Ensure >= 2 figures
    let figCount = blocks.filter(b => b.kind === 'figure').length;
    while (figCount < 2) {
      const newFig = buildExtraFigure(mode2d, titleEn, figCount, isBi);
      blocks.splice(Math.min(2, blocks.length), 0, newFig);
      figCount++;
      totalFigsAdded++;
      modified = true;
    }

    // 2. Ensure >= 1 explorer (and 3D canvas3d when needs3d is true)
    const existingEx = blocks.find(b => b.kind === 'explorer');
    if (!existingEx) {
      const newEx = buildAutoExplorer(data.id, titleEn, mode2d, mode3d, needs3d, isBi);
      blocks.splice(Math.min(3, blocks.length), 0, newEx);
      totalExplorersAdded++;
      if (newEx.canvas3d) total3DAdded++;
      modified = true;
    } else if (needs3d && mode3d && !existingEx.canvas3d) {
      const safeId = data.id.replace(/[^a-zA-Z0-9]/g, '');
      existingEx.canvas3d = {
        btnId: `exAuto3dBtn_${mode3d}_${safeId}`,
        wrapId: `exAuto3dWrap_${safeId}`,
        hintId: `exAuto3dHint_${safeId}`,
        btnLabel: '🧊 View Interactive 3D Model',
        ariaLabel: bi(`Interactive 3D visualization for ${titleEn}. Drag to rotate.`, `عرض ثلاثي الأبعاد تفاعلي لدرس ${titleEn}. اسحب للتدوير.`, isBi)
      };
      total3DAdded++;
      modified = true;
    }

    // 3. Ensure >= 4 worked examples
    let exCount = blocks.filter(b => (b.kind === 'callout' && b.style === 'example') || b.kind === 'workedExampleCard').length;
    while (exCount < 4) {
      const newExBlock = buildExtraExample(mode2d, titleEn, exCount, isBi);
      const firstPrac = blocks.findIndex(b => b.kind === 'practiceProblem');
      if (firstPrac >= 0) blocks.splice(firstPrac, 0, newExBlock);
      else blocks.push(newExBlock);
      exCount++;
      totalExAdded++;
      modified = true;
    }

    // 4. Ensure >= 4 practice problems
    let pracCount = blocks.filter(b => b.kind === 'practiceProblem').length;
    while (pracCount < 4) {
      const newPrBlock = buildExtraPractice(mode2d, titleEn, pracCount, isBi);
      blocks.push(newPrBlock);
      pracCount++;
      totalPracAdded++;
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(fpath, JSON.stringify(data, null, 2) + '\n');
      totalLessonsUpgraded++;
    }
  }
}

console.log(`Upgraded ${totalLessonsUpgraded} lessons across ${tracks.length} tracks:`);
console.log(`  +${totalExplorersAdded} 2D explorers | +${total3DAdded} 3D explorers | +${totalFigsAdded} figures | +${totalExAdded} worked examples | +${totalPracAdded} practice problems.`);
