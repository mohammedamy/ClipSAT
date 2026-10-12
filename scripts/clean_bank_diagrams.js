'use strict';

const fs = require('fs');
const path = require('path');

const BANK_DIR = path.join(__dirname, '..', 'bank-data');
const files = fs.readdirSync(BANK_DIR).filter(f => f.endsWith('.json')).sort();

let totalRemovedSpecialTrig = 0;
let totalRemovedUnrelatedFn = 0;
let totalPatchedLeaks = 0;

for (const file of files) {
  const filePath = path.join(BANK_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const isArabic = /qudrat|tahsili/.test(file);
  const xVar = isArabic ? 'س' : 'x';

  function cleanQuestion(q) {
    const fig = q.figure || q.fig;
    if (!fig) return false;
    let modified = false;

    const text = q.text || q.q || q.stem || '';
    const answer = q.choices && q.choices[q.answer];
    const figStr = JSON.stringify(fig);

    // 1. Remove solved 30-60-90 or 45-45-90 triangles attached to unit circle trig angle evaluation
    if (fig.type === 'triangle' && (figStr.includes('30°') || figStr.includes('45°') || figStr.includes('60°'))) {
      if (/\\(?:sin|cos|tan|sec|csc|cot)\s*\(\s*(?:30|60|45)\s*(?:\^\s*\\?circ|°|\b)/i.test(text) ||
          /exact value of\s*\\(?:sin|cos|tan)/i.test(text) ||
          /Find\s*\\(?:sin|cos|tan)/i.test(text)) {
        delete q.fig;
        delete q.figure;
        totalRemovedSpecialTrig++;
        return true;
      }
    }

    // 1b. Remove mismatched trig fn graphs (e.g. ibsl easy 14 / medium 1)
    if ((fig.type === 'fn' || fig.type === 'function_graph') && /\\(?:sin|cos|tan)\s*\(/i.test(text)) {
      if (/\\sin\s*\(\s*(?:180|2x)/i.test(text)) {
        delete q.fig;
        delete q.figure;
        totalRemovedUnrelatedFn++;
        return true;
      }
    }

    // 1c. Remove sides on regular polygon when question asks about symmetry, diagonals, or angles
    if (fig.type === 'polygon' && Array.isArray(fig.sides) && /(rotational symmetry|lines of symmetry|عدد الأقطار|مجموع قياسات الزوايا)/i.test(text)) {
      delete fig.sides;
      totalPatchedLeaks++;
      return true;
    }

    // 2. Remove generic parabola (x)*(x) on non-quadratic questions
    if (fig.type === 'fn' && Array.isArray(fig.fns) && fig.fns[0] && fig.fns[0].fn === '(x)*(x)') {
      const isQuad = /x\^2|x\*\*2|parabola|quadratic|vertex/i.test(text);
      if (!isQuad) {
        delete q.fig;
        delete q.figure;
        totalRemovedUnrelatedFn++;
        return true;
      }
    }

    // Remove calculus #2861 line graph on sin integral
    if (fig.type === 'fn' && /\\dfrac\{d\}\{dx\}\\displaystyle\\int/i.test(text)) {
      delete q.fig;
      delete q.figure;
      totalRemovedUnrelatedFn++;
      return true;
    }

    // 3. Patch direct answer leaks in triangle sides: replace leaked unknown with xVar
    if (answer && fig.type === 'triangle' && Array.isArray(fig.sides)) {
      const cleanAns = String(answer).replace(/[^0-9a-zA-Z]/g, '').trim();
      if (cleanAns && cleanAns.length > 0) {
        // If the question text asks for hypotenuse or leg, and does NOT mention the answer value:
        const asksForUnknown = /hypotenuse|leg|length of|what is|find|ما طول|الوتر|الضلع الآخر/i.test(text);
        const textHasAns = text.includes(cleanAns);
        if (asksForUnknown && !textHasAns) {
          fig.sides = fig.sides.map(s => {
            const cleanSide = String(s).replace(/[^0-9a-zA-Z]/g, '').trim();
            if (cleanSide === cleanAns) {
              totalPatchedLeaks++;
              modified = true;
              return xVar;
            }
            return s;
          });
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
console.log(`- Solved special trig triangles removed: ${totalRemovedSpecialTrig}`);
console.log(`- Unrelated function graphs removed: ${totalRemovedUnrelatedFn}`);
console.log(`- Leaked answers patched to variable: ${totalPatchedLeaks}`);
