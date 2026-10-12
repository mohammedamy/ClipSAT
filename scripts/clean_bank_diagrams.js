'use strict';

const fs = require('fs');
const path = require('path');

const BANK_DIR = path.join(__dirname, '..', 'bank-data');
const files = fs.readdirSync(BANK_DIR).filter(f => f.endsWith('.json')).sort();

let totalDeleted = 0;
let totalPatched = 0;
const counts = {
  mismatched3D: 0,
  mismatchedTransversal: 0,
  matrixTable: 0,
  sequenceTable: 0,
  unrelatedNormal: 0,
  unrelatedFns: 0,
  mismatchedIntegral: 0,
  polygonOnMatrix: 0,
  rectOnCylinder: 0,
  inequalityNumberline: 0,
  quadraticRootsLeak: 0,
  interceptLeak: 0,
  lineEquationLeak: 0,
  triangleAngleLeak: 0,
  triangleSideLeak: 0,
  circleLeak: 0
};

for (const file of files) {
  const filePath = path.join(BANK_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const isArabic = /qudrat|tahsili/.test(file);
  const xVar = isArabic ? 'س' : 'x';
  const qMark = isArabic ? '؟' : '?';
  const lineLbl = isArabic ? 'المستقيم' : 'Line';
  const centerLbl = isArabic ? 'م' : 'C';
  const radiusLbl = isArabic ? 'نق = ؟' : 'r = ?';
  const diameterLbl = isArabic ? 'ق = ؟' : 'd = ?';

  function cleanQuestion(q) {
    const fig = q.figure || q.fig;
    if (!fig) return false;
    let modified = false;

    const text = q.text || q.q || q.stem || '';
    const cleanText = text.replace(/\\\(|\\\)/g, '');
    const answer = q.choices ? String(q.choices[q.answer] ?? '').trim() : '';
    const cleanAns = answer.replace(/[^0-9a-zA-Z-]/g, '').trim();

    // 1. 3D prism on non-3D questions (e.g. boxplot, probability balls/pens, grocery/boxes)
    if (fig.type === 'geometry_3d') {
      if (/box\s*plot|boxplot|Q_1|IQR|الربيع/i.test(text) ||
          /probability|احتمال|drawn|pens?|balls?|tiles?|صندوق.*كرة/i.test(text) ||
          /cost|price|\$|sells?|bought|شراء|سعر|علب عصير/i.test(text)) {
        delete q.figure;
        delete q.fig;
        counts.mismatched3D++;
        totalDeleted++;
        return true;
      }
    }

    // 2. Transversal with hardcoded 65° or angle mismatch
    if (fig.type === 'transversal') {
      if (fig.labels && fig.labels['1'] === '65°' && !cleanText.includes('65')) {
        delete q.figure;
        delete q.fig;
        counts.mismatchedTransversal++;
        totalDeleted++;
        return true;
      }
    }

    // 3. Matrix Structure table with dimensions in caption
    if (fig.type === 'table' && fig.caption && fig.caption.includes('Matrix Structure')) {
      delete q.figure;
      delete q.fig;
      counts.matrixTable++;
      totalDeleted++;
      return true;
    }

    // 4. Sequence table leaking terms or redundant
    if (fig.type === 'table' && fig.caption && fig.caption.includes('Sequence')) {
      delete q.figure;
      delete q.fig;
      counts.sequenceTable++;
      totalDeleted++;
      return true;
    }

    // 5. Unrelated Normal distribution bell curves
    if (fig.type === 'fn' && (fig.fns || []).some(fn => (fn.fn || '').includes('exp(-0.5') || (fn.label || '').includes('Normal') || fn.label === 'N(0,1)')) {
      if (!/normal distribution|standard normal|\\mu|\\sigma|الانحراف المعياري|التوزيع الطبيعي/i.test(text) ||
          /which parameter|unbiased estimator|sample size|type i error|p-value is|simple random sample|chi-square|significance level|voluntary response|stratified sampling|\\int\\sec/i.test(text)) {
        delete q.figure;
        delete q.fig;
        counts.unrelatedNormal++;
        totalDeleted++;
        return true;
      }
    }

    // 6. Unrelated function graphs / generic curves
    if (fig.type === 'fn' || fig.type === 'function_graph') {
      const fns = fig.fns || [];
      // Trig evaluation with non-trig graph
      if (/\\(?:sin|cos|tan|sec|csc|cot)\b/i.test(text) && !fns.some(fn => /sin|cos|tan|sec|csc|cot/.test(fn.fn || ''))) {
        delete q.figure;
        delete q.fig;
        counts.unrelatedFns++;
        totalDeleted++;
        return true;
      }
      // Integrals with line y = x when integrand is not just x
      if (fns.some(fn => fn.fn === 'x' && fn.label === 'y = x')) {
        if (/\\int|\\displaystyle\\int/i.test(text) && !/\\int.*?\b(x)\b\,dx/i.test(text)) {
          delete q.figure;
          delete q.fig;
          counts.mismatchedIntegral++;
          totalDeleted++;
          return true;
        }
      }
      // Generic parabola on linear or non-quadratic questions
      if (fns.some(fn => (fn.fn || '').includes('(x)*(x)') || (fn.fn || '').includes('x*x') || (fn.fn || '').includes('x**2'))) {
        if (!/x\^2|x\*\*2|x\^\{2\}|parabola|quadratic|vertex|roots|zeros|مكافئ|تربيعية|second degree/i.test(text) ||
            /inverse function of.*2x|determines if a relation is a function|taylor series/i.test(text)) {
          delete q.figure;
          delete q.fig;
          counts.unrelatedFns++;
          totalDeleted++;
          return true;
        }
      }
    }

    // 7. Polygon on matrix determinant question (e.g. ibhl #383)
    if (fig.type === 'polygon' && /\\det\(A\^2\)/.test(text)) {
      delete q.figure;
      delete q.fig;
      counts.polygonOnMatrix++;
      totalDeleted++;
      return true;
    }

    // 8. 2D Rectangle on cylinder volume question (e.g. act #16)
    if (fig.type === 'rect' && /cylinder.*volume/i.test(text)) {
      delete q.figure;
      delete q.fig;
      counts.rectOnCylinder++;
      totalDeleted++;
      return true;
    }

    // 9. Pure solve inequality numberline (directly reveals the solution)
    if (fig.type === 'numberline' && /solve|solutions?|for what values|حل المتباينة|مجموعة حل/i.test(text) && !/number line|graph|shown|figure|خط الأعداد|ممثلة/i.test(text)) {
      delete q.figure;
      delete q.fig;
      counts.inequalityNumberline++;
      totalDeleted++;
      return true;
    }

    // 10. Pure solve quadratic roots leak (diagram plots and labels roots on x-axis)
    if (fig.type === 'fn' && fig.points && fig.points.some(p => p.label && /x\s*=\s*-?\d+/.test(p.label))) {
      if (/solve|root|roots|zeros?|solutions?|أصفار|حل المعادلة|جذور/i.test(text) && !/graph|shown|figure|تمثيل/i.test(text)) {
        delete q.figure;
        delete q.fig;
        counts.quadraticRootsLeak++;
        totalDeleted++;
        return true;
      }
    }

    // 10b. Line intercept questions where figure marks and labels intercept points
    if (fig.type === 'fn' && fig.points && /intercept|مقطع/i.test(text)) {
      if (fig.points.some(p => p.label && /\(0,|-?0\)/.test(p.label))) {
        delete q.figure;
        delete q.fig;
        counts.interceptLeak++;
        totalDeleted++;
        return true;
      }
    }

    // 11. Line slope or equation leaks in function label (y = mx + b)
    if (fig.type === 'fn' && Array.isArray(fig.fns)) {
      if (/slope|equation of (?:the )?line|ميل المستقيم|معادلة المستقيم/i.test(text)) {
        fig.fns.forEach(fn => {
          if (fn.label && /y\s*=\s*-?\d/.test(fn.label)) {
            fn.label = lineLbl;
            counts.lineEquationLeak++;
            totalPatched++;
            modified = true;
          }
        });
      }
    }

    // 12. Triangle angle leaks (replace leaked missing angle with ?)
    if (fig.type === 'triangle' && Array.isArray(fig.angles)) {
      if (cleanAns && !text.includes(cleanAns)) {
        fig.angles = fig.angles.map(a => {
          const c = String(a).replace(/[^0-9]/g, '');
          if (c && c === cleanAns) {
            counts.triangleAngleLeak++;
            totalPatched++;
            modified = true;
            return qMark;
          }
          return a;
        });
      }
    }

    // 12b. Triangle/Polygon sides leak (replace leaked unknown side with variable x)
    if (Array.isArray(fig.sides)) {
      if (cleanAns && cleanAns.length > 0 && !text.includes(cleanAns)) {
        fig.sides = fig.sides.map(s => {
          const cs = String(s).replace(/[^0-9a-zA-Z-]/g, '').trim();
          if (cs === cleanAns) {
            counts.triangleSideLeak++;
            totalPatched++;
            modified = true;
            return xVar;
          }
          return s;
        });
      }
    }

    // 13. Circle center or radius/diameter leaks
    if (fig.type === 'circle') {
      if (cleanAns && cleanAns.length > 0 && !text.includes(cleanAns)) {
        if (/center|المركز/i.test(text) && fig.center && fig.center.includes(cleanAns)) {
          fig.center = centerLbl;
          counts.circleLeak++;
          totalPatched++;
          modified = true;
        }
        if (/radius|نصف القطر/i.test(text) && fig.radius && fig.radius.includes(cleanAns)) {
          fig.radius = radiusLbl;
          counts.circleLeak++;
          totalPatched++;
          modified = true;
        }
        if (/diameter|القطر/i.test(text) && fig.diameter && fig.diameter.includes(cleanAns)) {
          fig.diameter = diameterLbl;
          counts.circleLeak++;
          totalPatched++;
          modified = true;
        }
      }
    }

    return modified;
  }

  let bankModified = false;
  if (Array.isArray(data.pool)) {
    data.pool.forEach(q => { if (cleanQuestion(q)) bankModified = true; });
  } else if (Array.isArray(data)) {
    data.forEach(q => { if (cleanQuestion(q)) bankModified = true; });
  } else {
    for (const lvl of ['easy', 'medium', 'hard']) {
      if (Array.isArray(data[lvl])) {
        data[lvl].forEach(q => { if (cleanQuestion(q)) bankModified = true; });
      }
    }
  }

  if (bankModified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    console.log(`Updated ${file}`);
  }
}

console.log(`\nCleanup Complete:`);
console.log(`- Total Figures Deleted: ${totalDeleted}`);
console.log(`- Total Figures Patched: ${totalPatched}`);
console.log(`Detailed Breakdown:`, JSON.stringify(counts, null, 2));
