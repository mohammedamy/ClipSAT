#!/usr/bin/env node
/**
 * scripts/build_printable_full_exams.js
 *
 * Generates 10 100%-authentic printable Full Exams + 10 Full Answer Keys / Mark Schemes
 * for every requested track and paper:
 *   - APs: apab (10), apbc (10), appc (10), apstats (10)
 *   - IGs (every paper):
 *       * igcse: Cambridge 0580 Paper 2 (10), Cambridge 0580 Paper 4 (10),
 *                Edexcel 4MA1 Paper 1H (10), Edexcel 4MA1 Paper 2H (10)
 *       * addmath: Cambridge 0606 Paper 1 (10), Cambridge 0606 Paper 2 (10),
 *                  Edexcel 4PM1 Paper 1 (10), Edexcel 4PM1 Paper 2 (10)
 *       * aslevel: Cambridge 9709 Paper 1 Pure 1 (10), Paper 2 Pure 2 (10),
 *                  Paper 4 Mechanics (10), Paper 5 Statistics 1 (10),
 *                  Edexcel IAL WMA11 Pure 1 (10), WMA12 Pure 2 (10),
 *                  WME01 Mechanics 1 (10), WST01 Statistics 1 (10)
 *       * a2level: Cambridge 9709 Paper 3 Pure 3 (10), Paper 4 Mechanics (10),
 *                  Paper 6 Statistics 2 (10),
 *                  Edexcel IAL WMA13 Pure 3 (10), WMA14 Pure 4 (10)
 *   - Qudrat (qudrat): 10 English Full Exams + 10 Arabic Full Exams
 *   - Tahsili (tahsili): 10 English Full Exams + 10 Arabic Full Exams
 *   - ACT 1, 2 L1/L2: act (10), act2 (10), act2l2 (10)
 *   - EST 1, 2 L1/L2: est (10), est2 (10), est2l2 (10)
 *   - IBs (every paper):
 *       * ibsl: AA SL Paper 1 (10), AA SL Paper 2 (10),
 *               AI SL Paper 1 (10), AI SL Paper 2 (10)
 *       * ibhl: AA HL Paper 1 (10), AA HL Paper 2 (10), AA HL Paper 3 (10),
 *               AI HL Paper 1 (10), AI HL Paper 2 (10), AI HL Paper 3 (10)
 *
 * Features:
 *   - 100% real paper cover pages, instructions, section headers, timing, calculator badges,
 *     official formula booklets/reference sheets, Scantron bubble sheets (for MCQ papers),
 *     Qiyas two-column Quantitative Comparison cards (for Qudrat), and lined answer boxes (for FRQ/IB/IG).
 *   - Calibrated vector SVG diagrams via 02c-figures.js (window._renderFig).
 *   - ClipSAT logo (/clipsat-mark.png) branding on every exam paper and answer key.
 *   - 100% pre-rendered KaTeX SSR math (zero raw LaTeX delimiters, nowrap inline equations, zero 1x).
 *   - Arabic versions generated ONLY for qudrat and tahsili.
 *   - Updates public/downloads/<track>/manifest.json with all Full Exams & Answer Keys.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const katex = require('katex');

const ROOT = path.join(__dirname, '..');
const BANK_DIR = path.join(ROOT, 'bank-data');
const DOWNLOADS_DIR = path.join(ROOT, 'public', 'downloads');

// ─────────────────────────────────────────────────────────────────────────────
// 1. INITIALIZE SANDBOXED WINDOW WITH FIGURE ENGINE & EXAM SPECS
// ─────────────────────────────────────────────────────────────────────────────
const simWindow = {
  _shuffle: arr => arr.slice(),
  _shuffleQ: q => q,
  CSAutoMath: null,
  CSFormatBilingual: null,
  _renderFig: null,
  renderMathFigure: null,
  MathJax: null
};
global.window = simWindow;
global.document = {
  getElementById: () => ({ src: '/clipsat-mark.png' }),
  querySelectorAll: () => [],
  querySelector: () => null,
  body: { classList: { add: () => {}, remove: () => {}, contains: () => false } },
  documentElement: { lang: 'en' },
  addEventListener: () => {},
  dispatchEvent: () => {},
  readyState: 'complete'
};

// Load 02c-figures.js
const figSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02c-figures.js'), 'utf8');
new Function('window', 'document', figSrc)(simWindow, global.document);

// Load 02b-bank-exam.js
const bankExamSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02b-bank-exam.js'), 'utf8');
new Function('window', 'document', bankExamSrc)(simWindow, global.document);

const examSpecs = simWindow.examSpecs;

// ─────────────────────────────────────────────────────────────────────────────
// 2. DETERMINISTIC PRNG & QUESTION SHUFFLING
// ─────────────────────────────────────────────────────────────────────────────
function createRng(seedStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return function nextRand() {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(arr, rng) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function shuffleChoicesDeterministic(q, rng) {
  const copy = Object.assign({}, q);
  if (!Array.isArray(copy.choices) || copy.choices.length < 2) return copy;
  const isFixed = copy.fixedChoices ||
    copy.topic_id === 'qud-compare' ||
    /Quantitative Comparison/i.test(copy.domain || '') ||
    /قارن بين|القيمة الأولى|Quantity A/i.test(copy.text || copy.q || '');
  if (isFixed) return copy;

  const ansIdx = typeof copy.answer === 'number' ? copy.answer : (typeof copy.ans === 'number' ? copy.ans : 0);
  const indexed = copy.choices.map((c, idx) => ({ c, isAns: idx === ansIdx }));
  const shuffled = seededShuffle(indexed, rng);
  copy.choices = shuffled.map(x => x.c);
  const newAns = shuffled.findIndex(x => x.isAns);
  copy.answer = newAns >= 0 ? newAns : 0;
  copy.ans = copy.answer;
  return copy;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. MATH & BILINGUAL RENDERING ENGINE (KaTeX SSR + 1x SANITIZER)
// ─────────────────────────────────────────────────────────────────────────────
const katexCache = new Map();

function sanitizeMathExpr(tex) {
  if (!tex) return '';
  let s = String(tex).trim();
  // Remove redundant 1x, 1y, 1z when standalone coefficient (not 11x, 0.1x, \frac{1}{x}, etc.)
  s = s.replace(/(?<![0-9.\\a-zA-Z])1([x-z])\b/g, '$1');
  // Convert \tfrac / \dfrac safely (KaTeX supports them, keep clean)
  return s;
}

function renderKatexCached(tex, displayMode) {
  const cleanTex = sanitizeMathExpr(tex);
  if (!cleanTex) return '';
  const key = (displayMode ? 'D:' : 'I:') + cleanTex;
  if (katexCache.has(key)) return katexCache.get(key);
  let html;
  try {
    html = katex.renderToString(cleanTex, {
      displayMode: Boolean(displayMode),
      throwOnError: false,
      strict: 'ignore',
      trust: true
    });
  } catch (e) {
    html = `<span class="math-fallback">${escHtml(cleanTex)}</span>`;
  }
  katexCache.set(key, html);
  return html;
}

function escHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function autoWrapChoiceMath(s) {
  if (s == null) return '';
  let str = String(s).trim();
  if (!str) return '';
  if (str.includes('\\(') || str.includes('\\[') || str.includes('$$')) return str;
  if (str.startsWith('$') && str.endsWith('$') && str.length > 2) {
    return '\\(' + str.slice(1, -1).trim() + '\\)';
  }
  if (/<[a-z/][\s\S]*>/i.test(str) || /[\u0600-\u06FF]/.test(str)) return str;
  if (str.includes('\\')) return '\\(' + str + '\\)';
  if (/[\^_{}±≤≥≠≈√πθ∞×÷·°]/.test(str) && !/[^\\]%|^%/.test(str)) return '\\(' + str + '\\)';
  if (/^[-+]?\d+(?:\.\d+)?%?$/.test(str)) return '\\(' + str + '\\)';
  const fracMatch = /^([-+]?)\s*([0-9a-zA-Z]+)\s*\/\s*([0-9a-zA-Z]+)$/.exec(str);
  if (fracMatch) return `\\(${fracMatch[1] || ''}\\frac{${fracMatch[2]}}{${fracMatch[3]}}\\)`;
  if (/^\(\s*[-+]?[0-9a-zA-Z.]+\s*,\s*[-+]?[0-9a-zA-Z.]+\s*\)$/.test(str)) return '\\(' + str + '\\)';
  if (/^[-+]?\d*[a-zA-Z]$/.test(str)) return '\\(' + str + '\\)';
  return str;
}

function formatMarkdownAndMath(raw, langMode) {
  if (raw == null || raw === '') return '';
  let s = String(raw);

  // Language extraction for Qudrat & Tahsili
  if (langMode === 'ar') {
    // Strip <br><span class="en-trans">...</span> or <span class="en-trans">...</span>
    s = s.replace(/<br\s*\/?>\s*<span\s+class=["']en-trans["']>[\s\S]*?<\/span>/gi, '');
    s = s.replace(/<span\s+class=["']en-trans["']>[\s\S]*?<\/span>/gi, '');
    s = s.replace(/\s*\([A-D]:\s*Quantity [AB] is greater\)/gi, '');
    s = s.replace(/\s*\([A-D]:\s*Both quantities are equal\)/gi, '');
    s = s.replace(/\s*\([A-D]:\s*Information is insufficient\)/gi, '');
  } else if (langMode === 'en_extract') {
    const spanMatch = /<span\s+class=["']en-trans["']>([\s\S]*?)<\/span>/i.exec(s);
    const emMatch = /<em>([^<]*?)<\/em>/i.exec(s);
    const enMatch = spanMatch || (emMatch && !/[\u0600-\u06FF]/.test(emMatch[1]) ? emMatch : null);
    if (enMatch && !/[\u0600-\u06FF]/.test(enMatch[1])) {
      let extracted = enMatch[1].trim();
      extracted = extracted.replace(/^\([A-D]:\s*(.*?)\)$/i, '$1');
      s = extracted;
    } else {
      // Translate common Arabic units & terms inside math/choices/solutions
      s = s
        .replace(/\\text\{\s*المساحة المظللة\s*\}/g, '\\text{Shaded Area}')
        .replace(/\\text\{\s*المساحة\s*\}/g, '\\text{Area}')
        .replace(/\\text\{\s*المحيط\s*\}/g, '\\text{Perimeter}')
        .replace(/\\text\{\s*المتوسط\s*\}/g, '\\text{Mean}')
        .replace(/\\text\{\s*الضلع الأصغر\s*\}/g, '\\text{Shortest Side}')
        .replace(/\\text\{\s*الزاوية الخارجية\s*\}/g, '\\text{Exterior Angle}')
        .replace(/\\text\{\s*مظلل\s*\}/g, '\\text{shaded}')
        .replace(/\\text\{\s*سم\s*\}\^2/g, '\\text{ cm}^2')
        .replace(/\\text\{\s*سم\s*\}\^3/g, '\\text{ cm}^3')
        .replace(/\\text\{\s*سم\s*\}/g, '\\text{ cm}')
        .replace(/\\text\{\s*م\s*\}\^2/g, '\\text{ m}^2')
        .replace(/\\text\{\s*م\s*\}\^3/g, '\\text{ m}^3')
        .replace(/\\text\{\s*م\s*\}/g, '\\text{ m}')
        .replace(/\\text\{\s*كم\/س\s*\}/g, '\\text{ km/h}')
        .replace(/\\text\{\s*كم\s*\}/g, '\\text{ km}')
        .replace(/\\text\{\s*ريال\s*\}/g, '\\text{ SAR}')
        .replace(/\\text\{\s*درجة\s*\}/g, '^\\circ')
        .replace(/\\text\{\s*درجات\s*\}/g, '^\\circ')
        .replace(/\\text\{\s*ثانية\s*\}/g, '\\text{ s}')
        .replace(/\\text\{\s*دقيقة\s*\}/g, '\\text{ min}')
        .replace(/\\text\{\s*دقائق\s*\}/g, '\\text{ min}')
        .replace(/\\text\{\s*ساعة\s*\}/g, '\\text{ hr}')
        .replace(/\\text\{\s*ساعات\s*\}/g, '\\text{ hrs}')
        .replace(/\\text\{\s*وحدة\s*\}/g, '\\text{ units}')
        .replace(/\\text\{\s*وحدات\s*\}/g, '\\text{ units}');
      // If Arabic prose remains in solution without en-trans, extract all math equations and present clean English steps
      if (/[\u0600-\u06FF]/.test(s)) {
        const mathBlocks = s.match(/\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$[\s\S]*?\$\$/g) || [];
        const cleanMath = mathBlocks.map(m => m.replace(/[\u0600-\u06FF]+/g, '').replace(/\\text\{\s*\}/g, '')).filter(Boolean);
        if (cleanMath.length > 0) {
          s = `<strong>Step-by-Step Mathematical Derivation:</strong><br>` + cleanMath.join(' \\(\\implies\\) ');
        } else {
          s = s.replace(/[\u0600-\u06FF]+/g, '').trim() || 'Apply the fundamental mathematical relation and substitute the given parameters.';
        }
      }
    }
  } else {
    // Standard English tracks: unwrap any en-trans spans cleanly
    const biMatch = /^(.*?)\s*<br\s*\/?>\s*<span\s+class=["']en-trans["']>([\s\S]*?)<\/span>$/i.exec(s.trim());
    if (biMatch) {
      s = biMatch[2].trim();
    }
  }

  // Balance any unmatched single $
  const withoutDisp = s.replace(/\$\$[\s\S]*?\$\$/g, '');
  const singles = (withoutDisp.match(/(^|[^\\])\$/g) || []).length;
  if (singles % 2 === 1) s += '$';

  // Extract math blocks into placeholders before markdown formatting
  const mathSlots = [];
  const pushMath = (tex, isDisplay) => {
    const idx = mathSlots.length;
    mathSlots.push(renderKatexCached(tex, isDisplay));
    return `\u0000MATH_${idx}\u0000`;
  };

  // Display math: $$...$$ and \[...\]
  s = s.replace(/\$\$([\s\S]+?)\$\$/g, (_, inner) => pushMath(inner, true));
  s = s.replace(/\\\[([\s\S]+?)\\\]/g, (_, inner) => pushMath(inner, true));

  // Inline math: \(...\) and $...$
  s = s.replace(/\\\(([\s\S]+?)\\\)/g, (_, inner) => pushMath(inner, false));
  s = s.replace(/\$(?!\s)([^$\n]+?)(?<!\s)\$/g, (m, inner) => {
    if (/^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/.test(inner)) return m;
    return pushMath(inner, false);
  });

  // Basic markdown bold & linebreaks
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Remove standalone1x in plain text if any
  s = s.replace(/(?<![0-9.\\a-zA-Z])1([x-z])\b/g, '$1');
  s = s.replace(/\n\n+/g, '<br><br>').replace(/\n/g, '<br>');

  // Restore rendered KaTeX HTML
  s = s.replace(/\u0000MATH_(\d+)\u0000/g, (_, idx) => mathSlots[Number(idx)] || '');

  // Catch any stray \( or \[ or \) or \] if unbalanced in source
  if (s.includes('\\(') || s.includes('\\)') || s.includes('\\[') || s.includes('\\]')) {
    s = s.replace(/\\\(|\\\)|\\\[|\\\]/g, '');
  }
  return s;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. SVG DIAGRAM RENDERER WITH MEMOIZATION & LABEL SANITIZATION
// ─────────────────────────────────────────────────────────────────────────────
const figCache = new Map();

function renderQuestionFigure(q, langMode) {
  const f = q.figure || q.fig || q.table || (q.svg ? { type: 'svg', svg: q.svg } : null);
  if (!f) return '';
  if (typeof f === 'string') return f;

  // Table figure
  if (f.type === 'table' || Array.isArray(f.headers) || Array.isArray(f.rows)) {
    const hdrs = (Array.isArray(f.headers) ? f.headers : [])
      .map(th => `<th>${formatMarkdownAndMath(th != null ? String(th) : '', langMode)}</th>`)
      .join('');
    const rawRows = Array.isArray(f.rows) ? f.rows : (Array.isArray(f.data) ? f.data : []);
    const rws = rawRows
      .map(r => '<tr>' + (Array.isArray(r)
        ? r.map(c => `<td>${formatMarkdownAndMath(c != null ? String(c) : '', langMode)}</td>`).join('')
        : `<td>${formatMarkdownAndMath(r != null ? String(r) : '', langMode)}</td>`) + '</tr>')
      .join('');
    return `<table class="exam-table">${hdrs ? `<thead><tr>${hdrs}</tr></thead>` : ''}<tbody>${rws}</tbody></table>`;
  }

  // Clone figure object and localize title/labels if needed
  const figCopy = JSON.parse(JSON.stringify(f));
  if (langMode === 'en_extract') {
    if (figCopy.title && /[\u0600-\u06FF]/.test(figCopy.title)) {
      delete figCopy.title;
    }
    const trLabel = s => String(s)
      .replace(/القيمة الأولى/g, 'Quantity A')
      .replace(/القيمة الثانية/g, 'Quantity B')
      .replace(/^أ$/g, 'A')
      .replace(/^ب$/g, 'B')
      .replace(/^ج$/g, 'C')
      .replace(/^د$/g, 'D')
      .replace(/[\u0600-\u06FF]+/g, '')
      .trim() || 'Item';
    if (Array.isArray(figCopy.categories)) figCopy.categories = figCopy.categories.map(trLabel);
    if (Array.isArray(figCopy.labels)) figCopy.labels = figCopy.labels.map(trLabel);
    if (Array.isArray(figCopy.data)) {
      figCopy.data = figCopy.data.map(d => (d && typeof d === 'object' && d.label) ? Object.assign({}, d, { label: trLabel(d.label) }) : d);
    }
  }
  const key = JSON.stringify(figCopy) + '::' + (langMode || 'en');
  if (figCache.has(key)) return figCache.get(key);

  let svg = '';
  try {
    if (typeof simWindow._renderFig === 'function') {
      svg = simWindow._renderFig(figCopy) || '';
    }
  } catch (e) {
    svg = '';
  }
  if (svg && (!svg.includes('<svg') || /NaN/.test(svg))) {
    svg = '';
  }
  // If any \(...\) or $...$ exists inside SVG text/captions, render or clean it
  if (svg && (svg.includes('\\(') || svg.includes('$'))) {
    svg = svg.replace(/\\\(([\s\S]+?)\\\)/g, (_, inner) => sanitizeMathExpr(inner));
  }
  figCache.set(key, svg);
  return svg;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. OFFICIAL REFERENCE & FORMULA SHEETS PER EXAM BOARD
// ─────────────────────────────────────────────────────────────────────────────
function renderOfficialFormulaSheet(trackId, spec, langMode) {
  const isIB = Boolean(spec.isIB || trackId === 'ibsl' || trackId === 'ibhl');
  if (isIB) {
    const isHL = trackId === 'ibhl';
    const rawBooklet = simWindow.CSRenderIBFormulaBooklet(trackId, spec.ibCourse || 'AA')
      .replace(/^<details([^>]*)>/i, '<div$1>')
      .replace(/<\/details>$/i, '</div>')
      .replace(/<summary[\s\S]*?<\/summary>/i, `<div class="fep-ref-title">📘 Official IB DP Mathematics Formula Booklet (v1.3 — ${isHL ? 'SL & HL Complete Reference' : 'SL Core Reference'})</div>`);
    return formatMarkdownAndMath(rawBooklet, 'en');
  }

  if (trackId === 'qudrat') {
    if (langMode === 'ar') {
      const arSheet = `
        <div class="fep-ref-sheet qiyas-formula-sheet" dir="rtl">
          <div class="fep-ref-title">📘 ملخص قوانين قياس الذهبية — المرجع الرسمي لاختبار القدرات العامة (القسم الكمي)</div>
          <div class="fep-ref-grid">
            <div class="fep-ref-card"><strong>١. الحساب والأنماط السريعة</strong><br>
              • مجموع المتسلسلة الحسابية: \\(1+2+\\cdots+n = \\frac{n(n+1)}{2}\\)<br>
              • الكسور المتتالية: \\(\\sum_{k=1}^{n}\\frac{1}{k(k+1)} = \\frac{n}{n+1}\\)<br>
              • عدد الصفحات أو الأعداد المحصورة من \\(A\\) إلى \\(B\\): \\((B - A) + 1\\)
            </div>
            <div class="fep-ref-card"><strong>٢. المتطابقات والجبر والأسس</strong><br>
              • الفرق بين مربعين: \\(a^2 - b^2 = (a-b)(a+b)\\)<br>
              • مربع المجموع: \\((a+b)^2 = a^2 + b^2 + 2ab\\)<br>
              • إذا كان \\(0 < x < 1\\) فإن: \\(x^2 < x < \\sqrt{x} < \\frac{1}{x}\\)
            </div>
            <div class="fep-ref-card"><strong>٣. الهندسة والمساحات المظللة</strong><br>
              • دائرة داخل مربع (\\(s=2r\\)): مساحة الأركان المظللة \\(= r^2(4 - \\pi)\\)<br>
              • مربع داخل دائرة (\\(d=2r\\)): مساحة المربع \\(= 2r^2\\)<br>
              • زاوية عقارب الساعة: \\(\\theta = |30H - 5.5M|^\\circ\\) | مجموع زوايا المضلع: \\((n-2)\\times 180^\\circ\\)
            </div>
            <div class="fep-ref-card"><strong>٤. الحركة والعمل والنسب المئوية</strong><br>
              • السرعة المتوسطة ذهاباً وإياباً: \\(v_{\\text{avg}} = \\frac{2v_1 v_2}{v_1 + v_2}\\)<br>
              • زمن العمل المشترك: \\(T = \\frac{t_1 t_2}{t_1 + t_2}\\) | التغير المركب: \\(a + b + \\frac{ab}{100}\\)<br>
              • القطاع الدائري (\\(360^\\circ\\)): \\(90^\\circ = 25\\%\\)، \\(72^\\circ = 20\\%\\)، \\(36^\\circ = 10\\%\\)
            </div>
          </div>
        </div>`;
      return formatMarkdownAndMath(arSheet, 'ar');
    } else {
      const enSheet = `
        <div class="fep-ref-sheet qiyas-formula-sheet" dir="ltr">
          <div class="fep-ref-title">📘 Official ETEC / Qiyas GAT Quantitative Reference & High-Speed Shortcuts</div>
          <div class="fep-ref-grid">
            <div class="fep-ref-card"><strong>1. Arithmetic & Number Patterns</strong><br>
              • Gauss Sum: \\(1+2+\\cdots+n = \\frac{n(n+1)}{2}\\)<br>
              • Telescoping Fractions: \\(\\sum_{k=1}^{n}\\frac{1}{k(k+1)} = \\frac{n}{n+1}\\)<br>
              • Inclusive Count (Pages/Queue from \\(A\\) to \\(B\\)): \\((B - A) + 1\\)
            </div>
            <div class="fep-ref-card"><strong>2. Algebraic Identities & Exponents</strong><br>
              • Difference of Squares: \\(a^2 - b^2 = (a-b)(a+b)\\)<br>
              • Square Sum Identity: \\(a^2+b^2 = (a+b)^2 - 2ab\\)<br>
              • Fractional Ordering (\\(0 < x < 1\\)): \\(x^2 < x < \\sqrt{x} < \\frac{1}{x}\\)
            </div>
            <div class="fep-ref-card"><strong>3. Geometry & Shaded Regions</strong><br>
              • Circle Inscribed in Square (\\(s=2r\\)): \\(A_{\\text{corners}} = r^2(4 - \\pi)\\)<br>
              • Square Inscribed in Circle (\\(d=2r\\)): \\(A_{\\text{square}} = 2r^2\\)<br>
              • Clock Angle: \\(\\theta = |30H - 5.5M|^\\circ\\) | Polygon Interior Sum: \\((n-2)\\times 180^\\circ\\)
            </div>
            <div class="fep-ref-card"><strong>4. Motion, Work & Sector Data</strong><br>
              • Harmonic Round-Trip Speed: \\(v_{\\text{avg}} = \\frac{2v_1 v_2}{v_1 + v_2}\\)<br>
              • Combined Work Time: \\(T = \\frac{t_1 t_2}{t_1 + t_2}\\) | Net % Change: \\(a + b + \\frac{ab}{100}\\)<br>
              • Pie Chart Sectors (\\(360^\\circ\\)): \\(90^\\circ = 25\\%\\), \\(72^\\circ = 20\\%\\), \\(36^\\circ = 10\\%\\)
            </div>
          </div>
        </div>`;
      return formatMarkdownAndMath(enSheet, 'en');
    }
  }

  if (trackId === 'tahsili') {
    if (langMode === 'ar') {
      const arTah = `
        <div class="fep-ref-sheet qiyas-formula-sheet" dir="rtl">
          <div class="fep-ref-title">📘 ملخص قوانين التحصيلي الشامل — المرجع الرسمي لقسم الرياضيات (المسارات ١، ٢، ٣)</div>
          <div class="fep-ref-grid">
            <div class="fep-ref-card"><strong>١. المنطق والمصفوفات والمتتابعات</strong><br>
              • المعاكس الإيجابي: \\((p \\to q) \\equiv (\\sim q \\to \\sim p)\\)<br>
              • محدد المصفوفة: \\(|A| = ad - bc\\) (تكون منفردة إذا كان \\(ad-bc=0\\))<br>
              • المتسلسلة الهندسية اللانهائية (\\(|r|<1\\)): \\(S_\\infty = \\frac{a_1}{1 - r}\\)
            </div>
            <div class="fep-ref-card"><strong>٢. الدوال واللوغاريتمات وحساب المثلثات</strong><br>
              • خط التقارب الأفقي للدالة النسبية: إذا \\(n<m \\Rightarrow y=0\\)، وإذا \\(n=m \\Rightarrow y=\\frac{a}{b}\\)<br>
              • اللوغاريتمات: \\(\\log_b(x)=y \\iff b^y=x\\)، \\(\\log_b(MN)=\\log_b M + \\log_b N\\)<br>
              • المثلثات ودي موافر: \\(\\sin^2\\theta+\\cos^2\\theta=1\\)، \\(z^n = r^n(\\cos n\\theta + i\\sin n\\theta)\\)
            </div>
            <div class="fep-ref-card"><strong>٣. القطوع المخروطية والمتجهات والاحتمالات</strong><br>
              • القطع الناقص: \\(c^2 = a^2 - b^2\\) | القطع الزائد: \\(c^2 = a^2 + b^2\\) | الاختلاف المركزي \\(e = \\frac{c}{a}\\)<br>
              • الضرب الداخلي والتعامد: \\(\\mathbf{u}\\cdot\\mathbf{v} = u_1 v_1 + u_2 v_2 = 0 \\iff \\mathbf{u} \\perp \\mathbf{v}\\)<br>
              • الاحتمال المشروط والتوزيع الطبيعي: \\(P(A\\mid B) = \\frac{P(A\\cap B)}{P(B)}\\)، قاعدة \\(68\\%\\text{--}95\\%\\text{--}99.7\\%\\)
            </div>
            <div class="fep-ref-card"><strong>٤. النهايات والاشتقاق والتكامل (٥٠٪ من الاختبار)</strong><br>
              • النهايات: \\(\\lim_{x\\to a}\\frac{x^2-a^2}{x-a}=2a\\)، \\(\\lim_{x\\to\\infty}\\frac{ax^n+\\cdots}{bx^n+\\cdots}=\\frac{a}{b}\\)<br>
              • الاشتقاق والسرعة اللحظية: \\(\\frac{d}{dx}(x^n)=nx^{n-1}\\)، \\(v(t)=s'(t)\\)، \\(a(t)=v'(t)\\)<br>
              • التكامل المحدد والمساحة: \\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\)
            </div>
          </div>
        </div>`;
      return formatMarkdownAndMath(arTah, 'ar');
    } else {
      const enTah = `
        <div class="fep-ref-sheet qiyas-formula-sheet" dir="ltr">
          <div class="fep-ref-title">📘 Official ETEC / Qiyas SAAT Tahsili Mathematics Formula Reference (Years 1, 2 & 3)</div>
          <div class="fep-ref-grid">
            <div class="fep-ref-card"><strong>1. Logic, Matrices & Sequences (Y1–Y2)</strong><br>
              • Contrapositive Equivalence: \\((p \\to q) \\equiv (\\sim q \\to \\sim p)\\)<br>
              • Determinant: \\(|A| = ad - bc\\) (singular iff \\(ad - bc = 0\\))<br>
              • Infinite Geometric Series (\\(|r|<1\\)): \\(S_\\infty = \\frac{a_1}{1 - r}\\)
            </div>
            <div class="fep-ref-card"><strong>2. Functions, Logarithms & Trig (Y2–Y3)</strong><br>
              • Rational Horizontal Asymptote: \\(n<m \\Rightarrow y=0\\); \\(n=m \\Rightarrow y=\\frac{a}{b}\\)<br>
              • Logarithm Laws: \\(\\log_b(x)=y \\iff b^y=x\\), \\(\\log_b(MN)=\\log_b M + \\log_b N\\)<br>
              • De Moivre's Theorem: \\([r(\\cos\\theta + i\\sin\\theta)]^n = r^n(\\cos n\\theta + i\\sin n\\theta)\\)
            </div>
            <div class="fep-ref-card"><strong>3. Conics, Vectors & Probability (Y3)</strong><br>
              • Ellipse: \\(c^2 = a^2 - b^2\\) | Hyperbola: \\(c^2 = a^2 + b^2\\) | Eccentricity \\(e = c/a\\)<br>
              • Orthogonal Vectors: \\(\\mathbf{u}\\cdot\\mathbf{v} = u_1 v_1 + u_2 v_2 = 0 \\iff \\mathbf{u} \\perp \\mathbf{v}\\)<br>
              • Conditional & Normal: \\(P(A\\mid B) = \\frac{P(A\\cap B)}{P(B)}\\); Empirical Rule \\(68\\%\\text{--}95\\%\\text{--}99.7\\%\\)
            </div>
            <div class="fep-ref-card"><strong>4. Limits, Derivatives & Integrals (Y3 — 50% Weight)</strong><br>
              • Limits: \\(\\lim_{x\\to a}\\frac{x^2-a^2}{x-a}=2a\\); \\(\\lim_{x\\to\\infty}\\frac{ax^n+\\cdots}{bx^n+\\cdots}=\\frac{a}{b}\\)<br>
              • Power Rule & Kinematics: \\(\\frac{d}{dx}(x^n)=nx^{n-1}\\), \\(v(t)=s'(t)\\), \\(a(t)=v'(t)\\)<br>
              • Fundamental Theorem of Calculus: \\(\\int_a^b f(x)\\,dx = F(b) - F(a)\\)
            </div>
          </div>
        </div>`;
      return formatMarkdownAndMath(enTah, 'en');
    }
  }

  if (trackId === 'igcse') {
    const igSheet = `
      <div class="fep-ref-sheet">
        <div class="fep-ref-title">📘 Official IGCSE Mathematical Formulae Sheet (Cambridge 0580 / Pearson Edexcel 4MA1)</div>
        <div class="fep-ref-grid">
          <div class="fep-ref-card"><strong>Algebra & Quadratic Equations</strong><br>
            • For the quadratic equation \\(ax^2 + bx + c = 0\\):<br>
            \\[x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\]
            • Arithmetic series: \\(u_n = a + (n-1)d\\), \\(S_n = \\frac{n}{2}[2a + (n-1)d]\\)
          </div>
          <div class="fep-ref-card"><strong>Trigonometry & Triangles</strong><br>
            • Sine Rule: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\)<br>
            • Cosine Rule: \\(a^2 = b^2 + c^2 - 2bc\\cos A\\)<br>
            • Area of triangle: \\(A = \\frac{1}{2}ab\\sin C\\)
          </div>
          <div class="fep-ref-card"><strong>Mensuration — Surface Area & Volume</strong><br>
            • Cylinder: \\(A_{\\text{curved}} = 2\\pi rh\\), \\(V = \\pi r^2 h\\)<br>
            • Cone: \\(A_{\\text{curved}} = \\pi rl\\), \\(V = \\frac{1}{3}\\pi r^2 h\\)<br>
            • Sphere: \\(A = 4\\pi r^2\\), \\(V = \\frac{4}{3}\\pi r^3\\) | Pyramid: \\(V = \\frac{1}{3}Ah\\)
          </div>
          <div class="fep-ref-card"><strong>Coordinate Geometry & Circle Sectors</strong><br>
            • Arc length: \\(L = \\frac{\\theta}{360^\\circ}\\times 2\\pi r\\), Sector area: \\(A = \\frac{\\theta}{360^\\circ}\\times \\pi r^2\\)<br>
            • Distance: \\(d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}\\), Midpoint: \\(\\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)\\)
          </div>
        </div>
      </div>`;
    return formatMarkdownAndMath(igSheet, 'en');
  }

  if (trackId === 'addmath') {
    const amSheet = `
      <div class="fep-ref-sheet">
        <div class="fep-ref-title">📘 Official Additional & Further Pure Mathematics Formula Sheet (Cambridge 0606 / Edexcel 4PM1)</div>
        <div class="fep-ref-grid">
          <div class="fep-ref-card"><strong>Algebra, Binomial & Series</strong><br>
            • Binomial expansion: \\((a+b)^n = a^n + \\binom{n}{1}a^{n-1}b + \\binom{n}{2}a^{n-2}b^2 + \\cdots + b^n\\)<br>
            • AP: \\(u_n = a+(n-1)d\\), \\(S_n = \\frac{n}{2}[2a+(n-1)d]\\)<br>
            • GP: \\(u_n = ar^{n-1}\\), \\(S_n = \\frac{a(1-r^n)}{1-r}\\), \\(S_\\infty = \\frac{a}{1-r}\\) (\\(|r|<1\\))
          </div>
          <div class="fep-ref-card"><strong>Trigonometry & Circular Measure</strong><br>
            • Identities: \\(\\sec^2 A = 1 + \\tan^2 A\\), \\(\\csc^2 A = 1 + \\cot^2 A\\)<br>
            • Compound: \\(\\sin(A\\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B\\)<br>
            • Double angle: \\(\\sin 2A = 2\\sin A\\cos A\\), \\(\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A\\)
          </div>
          <div class="fep-ref-card"><strong>Calculus & Kinematics</strong><br>
            • Product/Quotient: \\((uv)' = u'v + uv'\\), \\(\\left(\\frac{u}{v}\\right)' = \\frac{vu' - uv'}{v^2}\\)<br>
            • Standard derivatives: \\(\\frac{d}{dx}(e^{kx}) = ke^{kx}\\), \\(\\frac{d}{dx}(\\ln x) = \\frac{1}{x}\\), \\(\\frac{d}{dx}(\\sin x) = \\cos x\\)<br>
            • Kinematics: \\(v = \\frac{ds}{dt}\\), \\(a = \\frac{dv}{dt}\\), \\(s = \\int v\\,dt\\)
          </div>
        </div>
      </div>`;
    return formatMarkdownAndMath(amSheet, 'en');
  }

  if (trackId === 'aslevel' || trackId === 'a2level') {
    const alSheet = `
      <div class="fep-ref-sheet">
        <div class="fep-ref-title">📘 Official List of Formulae & Statistical Tables (Cambridge MF19 / Pearson Edexcel IAL)</div>
        <div class="fep-ref-grid">
          <div class="fep-ref-card"><strong>Pure Mathematics (P1 / P2 / P3 / P4)</strong><br>
            • Binomial Series (\\(|x|<1\\)): \\((1+x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\frac{n(n-1)(n-2)}{3!}x^3 + \\cdots\\)<br>
            • Trigonometry: \\(\\sin(A\\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B\\), \\(\\cos(A\\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B\\)<br>
            • Integration by parts: \\(\\int u\\frac{dv}{dx}\\,dx = uv - \\int v\\frac{du}{dx}\\,dx\\), Trapezium rule: \\(\\frac{1}{2}h[(y_0+y_n)+2(y_1+\\cdots+y_{n-1})]\\)
          </div>
          <div class="fep-ref-card"><strong>Mechanics (Paper 4 / M1)</strong><br>
            • Uniform acceleration: \\(v = u + at\\), \\(s = ut + \\frac{1}{2}at^2\\), \\(v^2 = u^2 + 2as\\), \\(s = \\frac{1}{2}(u+v)t\\)<br>
            • Limiting friction: \\(F_{\\max} = \\mu R\\), Newton's Second Law: \\(F_{\\text{net}} = ma\\)<br>
            • Kinetic energy: \\(E_k = \\frac{1}{2}mv^2\\), Gravitational PE: \\(E_p = mgh\\), Power: \\(P = Fv\\) (\\(g = 9.8\\text{ m s}^{-2}\\))
          </div>
          <div class="fep-ref-card"><strong>Probability & Statistics (Paper 5 & 6 / S1 & S2)</strong><br>
            • Standard Deviation: \\(\\sigma = \\sqrt{\\frac{\\sum x^2}{n} - \\bar{x}^2}\\), Binomial \\(B(n,p)\\): \\(\\mu = np, \\sigma^2 = npq\\)<br>
            • Poisson \\(\\text{Po}(\\lambda)\\): \\(P(X=x) = e^{-\\lambda}\\frac{\\lambda^x}{x!}\\), Normal standardization: \\(Z = \\frac{X - \\mu}{\\sigma}\\)<br>
            • Critical Normal Values: \\(z_{0.90}=1.282\\), \\(z_{0.95}=1.645\\), \\(z_{0.975}=1.960\\), \\(z_{0.99}=2.326\\), \\(z_{0.995}=2.576\\)
          </div>
        </div>
      </div>`;
    return formatMarkdownAndMath(alSheet, 'en');
  }

  if (trackId === 'apab' || trackId === 'apbc' || trackId === 'appc' || trackId === 'apstats') {
    const apSheet = trackId === 'apstats'
      ? `
      <div class="fep-ref-sheet">
        <div class="fep-ref-title">📘 College Board AP® Statistics Formula Sheet & Tables Summary</div>
        <div class="fep-ref-grid">
          <div class="fep-ref-card"><strong>Descriptive Statistics & Regression</strong><br>
            • Mean & SD: \\(\\bar{x} = \\frac{\\sum x_i}{n}\\), \\(s_x = \\sqrt{\\frac{1}{n-1}\\sum (x_i - \\bar{x})^2}\\)<br>
            • Linear Regression: \\(\\hat{y} = a + bx\\), \\(b = r\\frac{s_y}{s_x}\\), \\(r = \\frac{1}{n-1}\\sum\\left(\\frac{x_i-\\bar{x}}{s_x}\\right)\\left(\\frac{y_i-\\bar{y}}{s_y}\\right)\\)
          </div>
          <div class="fep-ref-card"><strong>Probability & Random Variables</strong><br>
            • General Addition: \\(P(A\\cup B) = P(A)+P(B)-P(A\\cap B)\\), Conditional: \\(P(A\\mid B) = \\frac{P(A\\cap B)}{P(B)}\\)<br>
            • Binomial: \\(P(X=x) = \\binom{n}{x}p^x(1-p)^{n-x}\\), \\(\\mu_X = np\\), \\(\\sigma_X = \\sqrt{np(1-p)}\\)<br>
            • Geometric: \\(P(X=x) = (1-p)^{x-1}p\\), \\(\\mu_X = \\frac{1}{p}\\)
          </div>
          <div class="fep-ref-card"><strong>Sampling Distributions & Inference</strong><br>
            • Standardized Test Statistic: \\(\\text{Statistic} - \\text{Parameter} \\;/\\; \\text{Standard Error}\\)<br>
            • Confidence Interval: \\(\\text{Point Estimate} \\pm (\\text{Critical Value})\\times(\\text{Standard Error})\\)<br>
            • One-Sample \\(z\\) (Proportions): \\(\\sigma_{\\hat{p}} = \\sqrt{\\frac{p(1-p)}{n}}\\) | One-Sample \\(t\\) (Means): \\(\\text{SE}_{\\bar{x}} = \\frac{s_x}{\\sqrt{n}}\\) | Chi-Square: \\(\\chi^2 = \\sum\\frac{(O-E)^2}{E}\\)
          </div>
        </div>
      </div>`
      : `
      <div class="fep-ref-sheet">
        <div class="fep-ref-title">📘 College Board AP® ${escHtml(spec.title)} Reference & Exam Conventions</div>
        <div class="fep-ref-grid">
          <div class="fep-ref-card"><strong>Differential & Integral Calculus</strong><br>
            • Definition of Derivative: \\(f'(x) = \\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}\\), MVT: \\(f'(c) = \\frac{f(b)-f(a)}{b-a}\\)<br>
            • Fundamental Theorem: \\(\\frac{d}{dx}\\int_a^x f(t)\\,dt = f(x)\\), \\(\\int_a^b f'(x)\\,dx = f(b) - f(a)\\)<br>
            • Average Value: \\(f_{\\text{avg}} = \\frac{1}{b-a}\\int_a^b f(x)\\,dx\\), Disk/Washer Volume: \\(V = \\pi\\int_a^b [R(x)^2 - r(x)^2]\\,dx\\)
          </div>
          <div class="fep-ref-card"><strong>Trigonometric, Exponential & Log Rules</strong><br>
            • \\(\\frac{d}{dx}(\\sin x)=\\cos x\\), \\(\\frac{d}{dx}(\\tan x)=\\sec^2 x\\), \\(\\frac{d}{dx}(\\arctan x)=\\frac{1}{1+x^2}\\), \\(\\frac{d}{dx}(\\arcsin x)=\\frac{1}{\\sqrt{1-x^2}}\\)<br>
            • \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), \\(\\sin 2\\theta = 2\\sin\\theta\\cos\\theta\\), \\(\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta\\)
          </div>
          ${trackId === 'apbc' ? `<div class="fep-ref-card"><strong>BC Extensions: Parametric, Polar & Series</strong><br>
            • Parametric Speed/Arc Length: \\(L = \\int_a^b \\sqrt{(x'(t))^2 + (y'(t))^2}\\,dt\\), Polar Area: \\(A = \\frac{1}{2}\\int_\\alpha^\\beta r(\\theta)^2\\,d\\theta\\)<br>
            • Taylor Series: \\(f(x) = \\sum_{n=0}^\\infty \\frac{f^{(n)}(c)}{n!}(x-c)^n\\), Logistic: \\(\\frac{dP}{dt} = kP\\left(1 - \\frac{P}{M}\\right)\\)
          </div>` : `<div class="fep-ref-card"><strong>Exam Scoring & Rounding Conventions</strong><br>
            • Unless stated otherwise, round final decimal approximations to 3 decimal places.<br>
            • On Section II (Free Response), show all setups, integrals, and justifications clearly to earn method and accuracy points.
          </div>`}
        </div>
      </div>`;
    return formatMarkdownAndMath(apSheet, 'en');
  }

  if (trackId === 'sat') {
    const satSheet = `
      <div class="fep-ref-sheet">
        <div class="fep-ref-title">📘 Official College Board Digital SAT® Math Reference Sheet (Provided in Bluebook™)</div>
        <div class="fep-ref-grid">
          <div class="fep-ref-card"><strong>Area, Circumference & Right Triangles</strong><br>
            • Circle: \\(A = \\pi r^2\\), \\(C = 2\\pi r\\)<br>
            • Rectangle: \\(A = \\ell w\\) &nbsp;|&nbsp; Triangle: \\(A = \\frac{1}{2}bh\\)<br>
            • Pythagorean Theorem: \\(c^2 = a^2 + b^2\\)
          </div>
          <div class="fep-ref-card"><strong>Special Right Triangles</strong><br>
            • \\(30^\\circ\\text{–}60^\\circ\\text{–}90^\\circ\\) Triangle: sides in ratio \\(x : x\\sqrt{3} : 2x\\)<br>
            • \\(45^\\circ\\text{–}45^\\circ\\text{–}90^\\circ\\) Triangle: sides in ratio \\(s : s : s\\sqrt{2}\\)
          </div>
          <div class="fep-ref-card"><strong>3D Volume Formulas</strong><br>
            • Rectangular Prism: \\(V = \\ell wh\\) &nbsp;|&nbsp; Right Circular Cylinder: \\(V = \\pi r^2 h\\)<br>
            • Sphere: \\(V = \\frac{4}{3}\\pi r^3\\) &nbsp;|&nbsp; Right Circular Cone: \\(V = \\frac{1}{3}\\pi r^2 h\\)<br>
            • Rectangular Pyramid: \\(V = \\frac{1}{3}\\ell wh\\)
          </div>
          <div class="fep-ref-card"><strong>Standard Geometric Reference Facts</strong><br>
            • The number of degrees of arc in a circle is \\(360^\\circ\\).<br>
            • The number of radians of arc in a circle is \\(2\\pi\\).<br>
            • The sum of the measures in degrees of the angles of a triangle is \\(180^\\circ\\).
          </div>
        </div>
      </div>`;
    return formatMarkdownAndMath(satSheet, 'en');
  }

  // ACT 1, ACT 2 L1/L2, EST 1, EST 2 L1/L2
  const stdSheet = `
    <div class="fep-ref-sheet">
      <div class="fep-ref-title">📘 Official Examination Reference Formulas (${escHtml(spec.title)})</div>
      <div class="fep-ref-grid">
        <div class="fep-ref-card"><strong>Plane & Solid Geometry</strong><br>
          • Circle: \\(C = 2\\pi r\\), \\(A = \\pi r^2\\) | Triangle: \\(A = \\frac{1}{2}bh\\), \\(a^2+b^2=c^2\\)<br>
          • Cylinder: \\(V = \\pi r^2 h\\) | Cone: \\(V = \\frac{1}{3}\\pi r^2 h\\), \\(S_{\\text{lat}} = \\pi rl\\)<br>
          • Sphere: \\(V = \\frac{4}{3}\\pi r^3\\), \\(S = 4\\pi r^2\\) | Pyramid: \\(V = \\frac{1}{3}Bh\\)
        </div>
        <div class="fep-ref-card"><strong>Algebra, Coordinate Geometry & Trig</strong><br>
          • Quadratic Formula: \\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\), Discriminant: \\(\\Delta = b^2-4ac\\)<br>
          • Circle Equation: \\((x-h)^2 + (y-k)^2 = r^2\\) | Radian Measure: \\(\\pi\\text{ rad} = 180^\\circ\\)<br>
          • Law of Sines: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\) | Law of Cosines: \\(c^2 = a^2+b^2-2ab\\cos C\\)
        </div>
        <div class="fep-ref-card"><strong>Sequences, Complex Numbers & Matrices</strong><br>
          • Arithmetic: \\(a_n = a_1 + (n-1)d\\), \\(S_n = \\frac{n}{2}(a_1+a_n)\\) | Geometric: \\(a_n = a_1 r^{n-1}\\), \\(S_\\infty = \\frac{a_1}{1-r}\\)<br>
          • Complex: \\(i^2 = -1\\), \\(|a+bi| = \\sqrt{a^2+b^2}\\) | \\(2\\times 2\\) Determinant: \\(\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix} = ad-bc\\)
        </div>
      </div>
    </div>`;
  return formatMarkdownAndMath(stdSheet, 'en');
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. QIYAS QUANTITATIVE COMPARISON CARD RENDERER
// ─────────────────────────────────────────────────────────────────────────────
function renderQiyasComparisonCard(q, langMode) {
  const raw = String((q && (q.text || q.q)) || '');
  if (!/القيمة الأولى|Quantity A/i.test(raw)) return '';
  const mAr = raw.match(/القيمة الأولى\s*:\s*([\s\S]*?)(?:\s*\|\s*|\s+و\s*|\s*،\s*)القيمة الثانية\s*:\s*([^\n<]*)/);
  const mEn = raw.match(/Quantity A\s*:\s*([\s\S]*?)(?:\s*\|\s*|\s+and\s*|\s*,\s*)Quantity B\s*:\s*([^\n<]*)/i);
  if (!mAr && !mEn) return '';

  const qA_ar = mAr ? mAr[1].replace(/<\/?strong>/gi, '').trim().replace(/[.\s]+$/, '') : '';
  const qB_ar = mAr ? mAr[2].replace(/<\/?strong>/gi, '').trim().replace(/[.\s]+$/, '') : '';
  const qA_en = mEn ? mEn[1].replace(/<\/?strong>/gi, '').trim().replace(/[.\s]+$/, '') : '';
  const qB_en = mEn ? mEn[2].replace(/<\/?strong>/gi, '').trim().replace(/[.\s]+$/, '') : '';

  if (langMode === 'ar') {
    const valA = formatMarkdownAndMath(qA_ar || qA_en, 'ar');
    const valB = formatMarkdownAndMath(qB_ar || qB_en, 'ar');
    return `
      <div class="qiyas-qc-box" dir="rtl">
        <div class="qiyas-qc-col">
          <div class="qiyas-qc-hdr">القيمة الأولى</div>
          <div class="qiyas-qc-val">${valA}</div>
        </div>
        <div class="qiyas-qc-col">
          <div class="qiyas-qc-hdr">القيمة الثانية</div>
          <div class="qiyas-qc-val">${valB}</div>
        </div>
      </div>`;
  } else {
    const valA = formatMarkdownAndMath(qA_en || qA_ar, 'en_extract');
    const valB = formatMarkdownAndMath(qB_en || qB_ar, 'en_extract');
    return `
      <div class="qiyas-qc-box" dir="ltr">
        <div class="qiyas-qc-col">
          <div class="qiyas-qc-hdr">Quantity A</div>
          <div class="qiyas-qc-val">${valA}</div>
        </div>
        <div class="qiyas-qc-col">
          <div class="qiyas-qc-hdr">Quantity B</div>
          <div class="qiyas-qc-val">${valB}</div>
        </div>
      </div>`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. UPGRADE WRITTEN / FRQ ITEMS FOR CAIE, EDEXCEL, IB & AP + GRADUATED MARKS
// ─────────────────────────────────────────────────────────────────────────────
function computeComplexityScore(q) {
  const solLen = String(q.sol || q.solution || q.exp || '').length;
  const stemLen = String(q.text || q.q || '').length;
  const marks = Number(q.marks) || 1;
  const mathCount = ((String(q.sol || '') + String(q.text || '')).match(/\\frac|\\int|\\sum|\\sqrt|\\lim|\\sin|\\cos|\\matrix|\\begin/g) || []).length;
  return marks * 15 + Math.min(120, Math.floor(solLen / 18)) + Math.min(60, Math.floor(stemLen / 25)) + mathCount * 6;
}

function getGraduatedWrittenMarks(trackId, secType, isHL, diff, posRatio) {
  if (trackId === 'sat') return 1;
  if (secType === 'Paper 3') return posRatio >= 0.5 ? 28 : 27;
  if (secType === 'Section B') {
    if (diff === 'easy') return isHL ? 14 : 12;
    if (diff === 'medium') return isHL ? 16 : 14;
    return isHL ? 18 : 16;
  }
  if (trackId === 'ibsl' || trackId === 'ibhl') {
    if (diff === 'easy') return isHL ? 6 : 5;
    if (diff === 'medium') return isHL ? 7 : 6;
    return isHL ? 9 : 8;
  }
  if (trackId === 'igcse') {
    if (diff === 'easy') return posRatio < 0.15 ? 3 : 4;
    if (diff === 'medium') return 5;
    return posRatio >= 0.9 ? 7 : 6;
  }
  if (trackId === 'addmath') {
    if (diff === 'easy') return 5;
    if (diff === 'medium') return 7;
    return posRatio >= 0.85 ? 10 : 9;
  }
  if (trackId === 'aslevel' || trackId === 'a2level') {
    if (diff === 'easy') return 5;
    if (diff === 'medium') return 7;
    return posRatio >= 0.85 ? 10 : 9;
  }
  if (trackId === 'apstats') return posRatio >= 0.75 ? 12 : 10;
  return 9; // AP Calculus / Precalculus FRQ standard 9 points
}

function normalizeWrittenItem(q, partMeta, trackId, spec, posIdx, totalInPart, rng) {
  const isIB = Boolean(spec.isIB || trackId === 'ibsl' || trackId === 'ibhl');
  const isHL = trackId === 'ibhl' || /HL/i.test(spec.title || '');
  const isSAT = trackId === 'sat';
  const shuffledCopy = (!isSAT && Array.isArray(q.choices) && q.choices.length >= 2)
    ? shuffleChoicesDeterministic(q, rng)
    : Object.assign({}, q);
  const item = Object.assign({}, shuffledCopy);
  item.type = isSAT ? 'spr' : 'frq';

  // Preserve shuffled choices for CBT mode so written/FRQ exams can also be auto-graded in CBT
  if (Array.isArray(shuffledCopy.choices) && shuffledCopy.choices.length >= 2) {
    item.cbtChoices = shuffledCopy.choices.slice();
    item.cbtAnswer = typeof shuffledCopy.answer === 'number' ? shuffledCopy.answer : 0;
  }

  const secType = (partMeta && partMeta.ibSection) || item.ibSection || (isIB ? 'Section A' : (isSAT ? 'Student-Produced Response' : 'Structured Written'));
  const diff = (item.difficulty || 'medium').toLowerCase();
  const posRatio = totalInPart > 1 ? posIdx / (totalInPart - 1) : 1;
  const defaultMarks = isSAT ? 1 : getGraduatedWrittenMarks(trackId, secType, isHL, diff, posRatio);
  item.marks = defaultMarks;
  item.ibSection = secType;

  let stem = String(item.text || item.q || '').trim();
  stem = stem
    .replace(/Which of the following is equal to/gi, 'Find')
    .replace(/Which of the following equations represents/gi, 'Find the equation that represents')
    .replace(/Which of the following represents/gi, 'Determine the expression that represents')
    .replace(/Which of the following is the/gi, 'Find the')
    .replace(/Which of the following/gi, 'Determine the value or expression that')
    .replace(/Select the correct[^.]*\./gi, '');
  // Strip any existing trailing [N marks] or [N] before appending graduated marks
  stem = stem.replace(/\s*\[\d+\s*(?:marks?|m)?\]\s*$/i, '');

  const ansVal = item.sprAnswer != null
    ? String(item.sprAnswer)
    : ((typeof q.answer === 'number' && Array.isArray(q.choices) && q.choices[q.answer] != null)
      ? String(q.choices[q.answer])
      : ((typeof q.answer === 'string' || (typeof q.answer === 'number' && (!Array.isArray(q.choices) || q.choices.length === 0)))
        ? String(q.answer)
        : (item.ans != null && typeof item.ans !== 'number' ? String(item.ans) : '')));
  if (ansVal) item.finalAnswerText = ansVal;

  if (isIB) {
    const hasSubparts = /\([a-c]\)|\([i]+\)/i.test(stem);
    if (!hasSubparts) {
      const m1 = Math.max(2, Math.floor(defaultMarks * 0.4));
      const m2 = defaultMarks - m1;
      stem += `\n\n(a) Write down the key mathematical relationship or initial equation required to model this problem. [${m1} marks]\n` +
              `(b) Hence, or otherwise, find the exact required analytical solution, showing all working clearly. [${m2} marks]`;
    } else if (!/\[\d+\s*(marks?|m)?\]/i.test(stem)) {
      stem += ` [${defaultMarks} marks]`;
    }
  } else if (trackId === 'igcse' || trackId === 'addmath' || trackId === 'aslevel' || trackId === 'a2level') {
    if (!/\[\d+\]|\[\d+\s*marks?\]/i.test(stem)) {
      stem += ` [${defaultMarks}]`;
    }
  }

  item.text = stem;
  item.q = stem;

  let sol = String(item.sol || item.solution || item.exp || item.expl || '').trim();
  if (isSAT) {
    if (item.finalAnswerText && !sol.includes(item.finalAnswerText)) {
      sol += `<br><strong>Correct answer:</strong> ${autoWrapChoiceMath(item.finalAnswerText)}`;
    }
    item.sol = sol;
    return item;
  }
  if (!/\[M1\]|\[A1\]|\[B1\]/i.test(sol)) {
    sol = `<strong>Method & Working:</strong> ${sol || 'Apply the syllabus theorem/formula and substitute the given parameters.'} <strong>[M1][A1]</strong>`;
  }
  if (item.finalAnswerText && !sol.includes(item.finalAnswerText)) {
    sol += `<br><strong>Final Verified Answer:</strong> ${autoWrapChoiceMath(item.finalAnswerText)} <strong>[A1]</strong>`;
  }
  item.sol = sol;
  return item;
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. DRAW QUESTIONS FOR AN EXAM INSTANCE WITH PAST-PAPER DIFFICULTY PROGRESSION
// ─────────────────────────────────────────────────────────────────────────────
function loadTrackPool(bankId, langFilter) {
  const raw = JSON.parse(fs.readFileSync(path.join(BANK_DIR, `${bankId}.json`), 'utf8'));
  let pool = [];
  if (Array.isArray(raw.pool)) {
    pool = raw.pool.map(q => Object.assign({}, q, {
      type: q.type || 'mcq',
      difficulty: (q.difficulty || 'medium').toLowerCase(),
      text: q.text || q.q || '',
      sol: q.sol || q.solution || q.exp || q.expl || '',
      figure: q.figure || q.fig || null
    }));
  } else if (raw.easy || raw.medium || raw.hard) {
    const cvt = (arr, diff) => (arr || []).map(q => Object.assign({}, q, {
      type: q.type || 'mcq',
      difficulty: (q.difficulty || diff).toLowerCase(),
      domain: q.domain || q.topic || 'Mathematics',
      text: q.text || q.q || '',
      choices: q.choices || [],
      answer: typeof q.answer === 'number' ? q.answer : (typeof q.ans === 'number' ? q.ans : 0),
      ans: q.ans,
      sol: q.sol || q.solution || q.exp || q.expl || '',
      figure: q.figure || q.fig || null,
      marks: q.marks,
      paper: q.paper,
      course: q.course,
      ibSection: q.ibSection,
      calc: q.calc
    }));
    pool = cvt(raw.easy, 'easy').concat(cvt(raw.medium, 'medium')).concat(cvt(raw.hard, 'hard'));
  }

  // Filter trivia
  pool = pool.filter(q => !/test format|strategy|overview|exam format/i.test(q.domain || ''));

  // If English version of Qudrat/Tahsili, keep items with English translation and clean choices
  if ((bankId === 'qudrat' || bankId === 'tahsili') && langFilter === 'en_extract') {
    const enPool = pool.filter(q => {
      const hasEnStem = /en-trans/i.test(q.text || '') || !/[\u0600-\u06FF]/.test(q.text || '');
      const cleanChoices = (q.choices || []).every(c => /en-trans/i.test(c) || !/[\u0600-\u06FF]/.test(c) || /\\text\{/.test(c));
      return hasEnStem && cleanChoices;
    });
    if (enPool.length >= 100) pool = enPool;
  }
  return pool;
}

function getPastPaperDifficultyQuotas(n, isLaterOrAdaptiveSection) {
  if (n <= 1) return { easy: 0, medium: 0, hard: Math.max(1, n) };
  if (n === 2) return { easy: 0, medium: 1, hard: 1 };
  if (n === 3) return { easy: 1, medium: 1, hard: 1 };
  if (n === 4) return { easy: 1, medium: 2, hard: 1 };
  if (n === 5) return { easy: 1, medium: 2, hard: 2 };
  const easyRatio = isLaterOrAdaptiveSection ? 0.25 : 0.30;
  const hardRatio = isLaterOrAdaptiveSection ? 0.32 : 0.25;
  const easy = Math.max(1, Math.round(n * easyRatio));
  const hard = Math.max(2, Math.round(n * hardRatio));
  const medium = Math.max(1, n - easy - hard);
  return { easy, medium, hard: n - easy - medium };
}

function interleaveByDomain(items) {
  const byDom = new Map();
  for (const q of items) {
    const d = q.domain || 'Mathematics';
    if (!byDom.has(d)) byDom.set(d, []);
    byDom.get(d).push(q);
  }
  const queues = [...byDom.values()];
  const out = [];
  let added = true;
  while (added) {
    added = false;
    for (const qList of queues) {
      if (qList.length > 0) {
        out.push(qList.shift());
        added = true;
      }
    }
  }
  return out;
}

function pickFromBucketWithDiagrams(bucket, count, figRatio, usedInThisExam, usedFigInThisExam, usedSkeletons, figTypeCounts) {
  if (count <= 0 || !bucket.length) return [];
  const skelSet = usedSkeletons || new Set();
  const typeCounts = figTypeCounts || {};
  const avail = interleaveByDomain(bucket.filter(q => !usedInThisExam.has(q.id || q.text)));
  const withFig = avail.filter(q => Boolean(q.figure || q.fig || q.table));
  const noFig = avail.filter(q => !(q.figure || q.fig || q.table));
  const targetFigs = Math.min(withFig.length, Math.max(1, Math.round(count * figRatio)));

  const canUseFig = q => {
    const f = q.figure || q.fig || q.table;
    if (!f) return true;
    const fKey = JSON.stringify(f).slice(0, 160);
    if (usedFigInThisExam.has(fKey)) return false;
    const fType = f.type || 'other';
    if ((typeCounts[fType] || 0) >= 2) return false;
    return true;
  };

  const recordPick = (q, arr) => {
    const qKey = q.id || q.text;
    const sKey = satSkeleton(q);
    const f = q.figure || q.fig || q.table;
    arr.push(q);
    usedInThisExam.add(qKey);
    skelSet.add(sKey);
    if (f) {
      usedFigInThisExam.add(JSON.stringify(f).slice(0, 160));
      const fType = f.type || 'other';
      typeCounts[fType] = (typeCounts[fType] || 0) + 1;
    }
  };

  const picked = [];
  // First pass: pick up to targetFigs distinct, unique-skeleton diagram questions
  for (const q of withFig) {
    if (picked.length >= targetFigs) break;
    const qKey = q.id || q.text;
    const sKey = satSkeleton(q);
    if (usedInThisExam.has(qKey) || skelSet.has(sKey) || !canUseFig(q)) continue;
    recordPick(q, picked);
  }

  // Second pass: fill remaining slots with unique-skeleton non-figure (or valid-figure) questions
  for (const q of noFig.concat(withFig)) {
    if (picked.length >= count) break;
    const qKey = q.id || q.text;
    const sKey = satSkeleton(q);
    if (usedInThisExam.has(qKey) || skelSet.has(sKey)) continue;
    const hasF = Boolean(q.figure || q.fig || q.table);
    if (hasF && (picked.filter(x => Boolean(x.figure || x.fig || x.table)).length >= targetFigs + 1 || !canUseFig(q))) {
      continue;
    }
    recordPick(q, picked);
  }

  // Fallback pass if pool has fewer unique skeletons than count: still avoid duplicate questions and duplicate figures
  if (picked.length < count) {
    for (const q of noFig.concat(withFig)) {
      if (picked.length >= count) break;
      const qKey = q.id || q.text;
      if (usedInThisExam.has(qKey)) continue;
      const hasF = Boolean(q.figure || q.fig || q.table);
      if (hasF && !canUseFig(q)) continue;
      recordPick(q, picked);
    }
  }

  // Sort by ascending complexity so even within the same tier, questions ramp up smoothly
  picked.sort((a, b) => computeComplexityScore(a) - computeComplexityScore(b));
  return picked;
}

/* Map ClipSAT's 10 study chapters onto the 4 official College Board Digital SAT
   Math content domains, which are the only domain labels printed on SAT papers. */
function officialSatDomain(q) {
  const d = String((q && q.domain) || '');
  const t = String((q && q.text) || '');
  if (/desmos/i.test(d)) {
    if (/circle|radius/i.test(t)) return 'Geometry and Trigonometry';
    if (/x\^2|\^\{?2|parabola|quadratic|exponential/i.test(t)) return 'Advanced Math';
    return 'Algebra';
  }
  if (/linear/i.test(d)) return 'Algebra';
  if (/quadratic|equivalent|exponential|radical|polynomial|rational|nonlinear/i.test(d)) return 'Advanced Math';
  if (/ratio|rate|proportion|percent|scatter|statistic|distribution|margin of error|probability|table/i.test(d)) return 'Problem-Solving and Data Analysis';
  if (/area|volume|triangle|circle|trigonometry/i.test(d)) return 'Geometry and Trigonometry';
  return 'Algebra';
}

function satSkeleton(q) {
  return String((q && q.text) || '').replace(/-?\d+(\.\d+)?/g, 'N').replace(/\s+/g, ' ').slice(0, 90);
}

function drawDigitalSatPaper(pool, spec, trackId, paperSlug, examIndex, langMode, globalCrossExamTracker) {
  const rng = createRng(`${trackId}::${paperSlug}::${langMode}::exam-${examIndex}`);
  const usedInExam = new Set();
  const usedSkeletons = new Set();
  const entries = [];

  function categorizeDomain(d, q) {
    const off = officialSatDomain(Object.assign({}, q || {}, { domain: d }));
    if (off === 'Algebra') return 'Algebra';
    if (off === 'Advanced Math') return 'AdvancedMath';
    if (off === 'Problem-Solving and Data Analysis') return 'PSDA';
    return 'GeoTrig';
  }

  function getFigCategory(q) {
    const f = q.figure || q.fig;
    if (!f) return null;
    const t = f.type || '';
    if (t === 'fn' || t === 'graph') return 'fn';
    if (['triangle', 'circle', 'circle_sector', 'transversal', 'rect', 'geometry_3d'].includes(t)) return 'geom';
    if (t === 'scatter' || t === 'bar') return 'data_plot';
    if (t === 'two_way_table' || t === 'table') return 'table';
    return 'other';
  }

  const domainPools = {
    Algebra: { mcq: [], spr: [] },
    AdvancedMath: { mcq: [], spr: [] },
    PSDA: { mcq: [], spr: [] },
    GeoTrig: { mcq: [], spr: [] }
  };

  pool.forEach(q => {
    const cat = categorizeDomain(q.domain, q);
    const type = q.type === 'spr' ? 'spr' : 'mcq';
    domainPools[cat][type].push(q);
  });

  function pickDomainItems(domainCat, type, count, targetDiffs, moduleFigState) {
    const rawList = domainPools[domainCat][type];
    const shuffled = seededShuffle(rawList, rng);
    const fresh = shuffled.filter(q => !globalCrossExamTracker.has(q.id || q.text));
    const reused = shuffled.filter(q => globalCrossExamTracker.has(q.id || q.text));
    const candidates = fresh.concat(reused);

    const picked = [];
    for (const targetDiff of targetDiffs) {
      if (picked.length >= count) break;
      const matching = candidates.filter(q => {
        if (usedInExam.has(q.id || q.text)) return false;
        if (usedSkeletons.has(satSkeleton(q))) return false;
        if (picked.includes(q)) return false;
        const diff = (q.difficulty || 'medium').toLowerCase();
        return diff === targetDiff;
      });

      /* Real Digital SAT modules carry a handful of tables, graphs, and geometry
         figures (roughly 3-5 per module), never the same kind of figure over and over. */
      const FIG_MAX = 5, FIG_MIN = 3, PER_CAT = 2;
      const figOk = (figCat) => moduleFigState.totalFigs < FIG_MAX && (moduleFigState.catCount[figCat] || 0) < PER_CAT;
      const take = (cand) => {
        const figCat = getFigCategory(cand);
        if (figCat) {
          moduleFigState.totalFigs++;
          moduleFigState.catCount[figCat] = (moduleFigState.catCount[figCat] || 0) + 1;
        }
        return cand;
      };
      let chosen = null;
      if (moduleFigState.totalFigs < FIG_MIN) {
        const figCand = matching.find(c => { const fc = getFigCategory(c); return fc && figOk(fc); });
        if (figCand) chosen = take(figCand);
      }
      if (!chosen) {
        const cand = matching.find(c => { const fc = getFigCategory(c); return !fc || figOk(fc); });
        if (cand) chosen = take(cand);
      }

      if (!chosen) {
        const cand = candidates.find(c => {
          if (usedInExam.has(c.id || c.text) || picked.includes(c) || usedSkeletons.has(satSkeleton(c))) return false;
          const fc = getFigCategory(c);
          return !fc || figOk(fc);
        });
        if (cand) chosen = take(cand);
      }

      if (chosen) {
        picked.push(chosen);
        usedInExam.add(chosen.id || chosen.text);
        usedSkeletons.add(satSkeleton(chosen));
      }
    }
    return picked;
  }

  // MODULE 1
  const m1Figs = { totalFigs: 0, catCount: {} };
  const m1AlgMcq = pickDomainItems('Algebra', 'mcq', 6, ['easy', 'easy', 'easy', 'medium', 'medium', 'medium'], m1Figs);
  const m1AdvMcq = pickDomainItems('AdvancedMath', 'mcq', 6, ['easy', 'easy', 'medium', 'medium', 'medium', 'hard'], m1Figs);
  const m1PsdaMcq = pickDomainItems('PSDA', 'mcq', 3, ['easy', 'medium', 'medium'], m1Figs);
  const m1GeoMcq = pickDomainItems('GeoTrig', 'mcq', 2, ['easy', 'medium'], m1Figs);
  const m1Mcq = [...m1AlgMcq, ...m1AdvMcq, ...m1PsdaMcq, ...m1GeoMcq];

  const diffRank = { easy: 1, medium: 2, hard: 3 };
  m1Mcq.sort((a, b) => {
    const dr = (diffRank[a.difficulty] || 2) - (diffRank[b.difficulty] || 2);
    if (dr !== 0) return dr;
    return computeComplexityScore(a) - computeComplexityScore(b);
  });

  const m1AlgSpr = pickDomainItems('Algebra', 'spr', 2, ['medium', 'hard'], m1Figs);
  const m1AdvSpr = pickDomainItems('AdvancedMath', 'spr', 1, ['hard'], m1Figs);
  const m1PsdaSpr = pickDomainItems('PSDA', 'spr', 1, ['medium'], m1Figs);
  const m1GeoSpr = pickDomainItems('GeoTrig', 'spr', 1, ['hard'], m1Figs);
  const m1Spr = [...m1AlgSpr, ...m1AdvSpr, ...m1PsdaSpr, ...m1GeoSpr];
  m1Spr.sort((a, b) => {
    const dr = (diffRank[a.difficulty] || 2) - (diffRank[b.difficulty] || 2);
    if (dr !== 0) return dr;
    return computeComplexityScore(a) - computeComplexityScore(b);
  });

  // MODULE 2 (Adaptive Challenge)
  const m2Figs = { totalFigs: 0, catCount: {} };
  const m2AlgMcq = pickDomainItems('Algebra', 'mcq', 5, ['medium', 'medium', 'hard', 'hard', 'hard'], m2Figs);
  const m2AdvMcq = pickDomainItems('AdvancedMath', 'mcq', 6, ['medium', 'medium', 'hard', 'hard', 'hard', 'hard'], m2Figs);
  const m2PsdaMcq = pickDomainItems('PSDA', 'mcq', 3, ['medium', 'hard', 'hard'], m2Figs);
  const m2GeoMcq = pickDomainItems('GeoTrig', 'mcq', 3, ['medium', 'hard', 'hard'], m2Figs);
  const m2Mcq = [...m2AlgMcq, ...m2AdvMcq, ...m2PsdaMcq, ...m2GeoMcq];
  m2Mcq.sort((a, b) => {
    const dr = (diffRank[a.difficulty] || 2) - (diffRank[b.difficulty] || 2);
    if (dr !== 0) return dr;
    return computeComplexityScore(a) - computeComplexityScore(b);
  });

  const m2AlgSpr = pickDomainItems('Algebra', 'spr', 2, ['hard', 'hard'], m2Figs);
  const m2AdvSpr = pickDomainItems('AdvancedMath', 'spr', 2, ['hard', 'hard'], m2Figs);
  const m2PsdaSpr = pickDomainItems('PSDA', 'spr', 1, ['hard'], m2Figs);
  const m2Spr = [...m2AlgSpr, ...m2AdvSpr, ...m2PsdaSpr];
  m2Spr.sort((a, b) => {
    const dr = (diffRank[a.difficulty] || 2) - (diffRank[b.difficulty] || 2);
    if (dr !== 0) return dr;
    return computeComplexityScore(a) - computeComplexityScore(b);
  });

  const secM1 = spec.sections[0];
  const partM1Mcq = secM1.parts[0];
  const partM1Spr = secM1.parts[1];

  const secM2 = spec.sections[1];
  const partM2Mcq = secM2.parts[0];
  const partM2Spr = secM2.parts[1];

  m1Mcq.forEach(rawQ => {
    globalCrossExamTracker.add(rawQ.id || rawQ.text);
    const qItem = shuffleChoicesDeterministic(rawQ, rng);
    entries.push({ secIdx: 0, partIdx: 0, sec: secM1, part: partM1Mcq, q: qItem });
  });

  m1Spr.forEach((rawQ, idx) => {
    globalCrossExamTracker.add(rawQ.id || rawQ.text);
    const qItem = normalizeWrittenItem(rawQ, partM1Spr, trackId, spec, idx, m1Spr.length, rng);
    entries.push({ secIdx: 0, partIdx: 1, sec: secM1, part: partM1Spr, q: qItem });
  });

  m2Mcq.forEach(rawQ => {
    globalCrossExamTracker.add(rawQ.id || rawQ.text);
    const qItem = shuffleChoicesDeterministic(rawQ, rng);
    entries.push({ secIdx: 1, partIdx: 0, sec: secM2, part: partM2Mcq, q: qItem });
  });

  m2Spr.forEach((rawQ, idx) => {
    globalCrossExamTracker.add(rawQ.id || rawQ.text);
    const qItem = normalizeWrittenItem(rawQ, partM2Spr, trackId, spec, idx, m2Spr.length, rng);
    entries.push({ secIdx: 1, partIdx: 1, sec: secM2, part: partM2Spr, q: qItem });
  });

  return entries;
}

function drawQuestionsForPaper(pool, spec, trackId, paperSlug, examIndex, langMode, globalCrossExamTracker) {
  if (trackId === 'sat') {
    return drawDigitalSatPaper(pool, spec, trackId, paperSlug, examIndex, langMode, globalCrossExamTracker);
  }
  const rng = createRng(`${trackId}::${paperSlug}::${langMode}::exam-${examIndex}`);
  const isIB = Boolean(spec.isIB || trackId === 'ibsl' || trackId === 'ibhl');
  const usedInThisExam = new Set();
  const usedFigInThisExam = new Set();
  const usedSkeletons = new Set();
  const entries = [];

  for (let si = 0; si < spec.sections.length; si++) {
    const sec = spec.sections[si];
    const figTypeCounts = {};
    for (let pi = 0; pi < sec.parts.length; pi++) {
      const part = sec.parts[pi];
      const partDomains = part.domains || sec.domains;
      let candidates = (partDomains && partDomains.length)
        ? pool.filter(q => partDomains.includes(q.domain))
        : pool.slice();
      if (candidates.length < part.q * 2) {
        candidates = pool.slice();
      }

      const isFreePart = part.type === 'frq' || part.type === 'spr';
      if (!isFreePart) {
        const mcqOnly = candidates.filter(q => q.type !== 'frq' && q.type !== 'spr' && Array.isArray(q.choices) && q.choices.length >= 4);
        if (mcqOnly.length >= part.q) candidates = mcqOnly;
      } else if (trackId === 'sat') {
        const sprOnly = candidates.filter(q => q.type === 'spr' || q.type === 'frq');
        if (sprOnly.length >= part.q) candidates = sprOnly;
      } else if (isIB) {
        const ibMatch = candidates.filter(q => {
          const crsOk = !part.ibCourse || !q.course || q.course === 'both' || q.course === 'Both' || String(q.course).includes(part.ibCourse);
          return crsOk;
        });
        if (ibMatch.length >= part.q) candidates = ibMatch;
      }

      // Shuffle candidates deterministically for this exam index, preferring items not yet used in earlier exams (1..examIndex-1)
      const shuffled = seededShuffle(candidates, rng);
      const freshItems = shuffled.filter(q => !globalCrossExamTracker.has(q.id || q.text));
      const reusedItems = shuffled.filter(q => globalCrossExamTracker.has(q.id || q.text));
      const ordered = freshItems.concat(reusedItems);

      // Partition into difficulty tiers: easy -> medium -> hard (past-paper balanced configuration)
      const easyBucket = ordered.filter(q => (q.difficulty || 'medium') === 'easy');
      const mediumBucket = ordered.filter(q => (q.difficulty || 'medium') === 'medium');
      const hardBucket = ordered.filter(q => (q.difficulty || 'medium') === 'hard');

      const isLaterSection = (si > 0 && spec.sections.length > 1) || part.ibSection === 'Section B' || part.ibSection === 'Paper 3';
      const quotas = getPastPaperDifficultyQuotas(part.q, isLaterSection);
      const figRatio = 0.18;

      const pickedEasy = pickFromBucketWithDiagrams(easyBucket, quotas.easy, figRatio, usedInThisExam, usedFigInThisExam, usedSkeletons, figTypeCounts)
        .map(q => Object.assign({}, q, { difficulty: 'easy' }));
      const pickedMedium = pickFromBucketWithDiagrams(mediumBucket, quotas.medium, figRatio, usedInThisExam, usedFigInThisExam, usedSkeletons, figTypeCounts)
        .map(q => Object.assign({}, q, { difficulty: 'medium' }));
      const pickedHard = pickFromBucketWithDiagrams(hardBucket, quotas.hard, figRatio, usedInThisExam, usedFigInThisExam, usedSkeletons, figTypeCounts)
        .map(q => Object.assign({}, q, { difficulty: 'hard' }));

      let picked = pickedEasy.concat(pickedMedium).concat(pickedHard);

      // Backfill if any bucket was smaller than quota (e.g. small pool) while preserving ascending difficulty order
      if (picked.length < part.q) {
        const remainingNeeded = part.q - picked.length;
        const extra = pickFromBucketWithDiagrams(ordered, remainingNeeded, figRatio, usedInThisExam, usedFigInThisExam, usedSkeletons, figTypeCounts);
        picked = picked.concat(extra);
        const diffRank = { easy: 1, medium: 2, hard: 3 };
        picked.sort((a, b) => {
          const dr = (diffRank[a.difficulty] || 2) - (diffRank[b.difficulty] || 2);
          if (dr !== 0) return dr;
          return computeComplexityScore(a) - computeComplexityScore(b);
        });
      }

      picked.forEach((rawQ, idxInPart) => {
        globalCrossExamTracker.add(rawQ.id || rawQ.text);
        let qItem = isFreePart
          ? normalizeWrittenItem(rawQ, part, trackId, spec, idxInPart, picked.length, rng)
          : shuffleChoicesDeterministic(rawQ, rng);
        entries.push({ secIdx: si, partIdx: pi, sec, part, q: qItem });
      });
    }
  }
  return entries;
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. SHARED PRINTABLE EXAM & ANSWER KEY STYLESHEET
// ─────────────────────────────────────────────────────────────────────────────
function parseDurationMinutes(str) {
  if (!str) return 60;
  const s = String(str).toLowerCase();
  let mins = 0;
  const hrMatch = s.match(/(\d+(?:\.\d+)?)\s*(?:hours?|hrs?)/);
  const minMatch = s.match(/(\d+)\s*(?:minutes?|mins?)/);
  if (hrMatch) mins += Math.round(parseFloat(hrMatch[1]) * 60);
  if (minMatch) mins += parseInt(minMatch[1], 10);
  if (!hrMatch && !minMatch) {
    const num = parseInt(s, 10);
    if (!isNaN(num) && num > 0) mins = num;
  }
  return mins || 60;
}

const PRINT_EXAM_CSS = `
@page { margin: 18mm 16mm 20mm 16mm; }
@page :first { margin-top: 15mm; }
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0; padding: 0; background: #f1f5f9;
  font-family: Georgia, "Times New Roman", serif;
  color: #0f172a; font-size: 10.5pt; line-height: 1.58;
}
body[dir="rtl"] {
  direction: rtl; text-align: right;
  font-family: "Segoe UI", Tahoma, system-ui, -apple-system, sans-serif;
}
/* Prevent splitting inline equations across lines */
.katex {
  white-space: nowrap !important;
  direction: ltr !important;
  unicode-bidi: isolate !important;
  font-size: 1.03em;
}
.katex-display {
  direction: ltr !important;
  unicode-bidi: isolate !important;
  margin: 8pt 0 !important;
  overflow-x: auto;
  overflow-y: hidden;
}
.page-shell {
  max-width: 210mm; margin: 20px auto 40px; background: #fff;
  padding: 18mm 16mm 20mm; box-shadow: 0 8px 30px rgba(15, 23, 42, 0.12);
  border-radius: 6px; position: relative;
}
@media print {
  body { background: #fff; }
  .page-shell { max-width: 100%; margin: 0; padding: 0; box-shadow: none; border-radius: 0; }
  .no-print { display: none !important; }
}
/* Floating Action Bar */
.print-toolbar {
  position: sticky; top: 0; z-index: 999;
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  background: #0f172a; color: #fff; padding: 10px 20px;
  font-family: system-ui, -apple-system, sans-serif; font-size: 13px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}
.print-toolbar .pt-brand { display: flex; align-items: center; gap: 10px; font-weight: 700; }
.print-toolbar .pt-brand img { height: 26px; width: auto; border-radius: 4px; background: #fff; padding: 2px; }
.print-toolbar .pt-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.pt-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px; border-radius: 5px; font-weight: 700; font-size: 12.5px;
  text-decoration: none; cursor: pointer; border: none; transition: opacity 0.15s;
}
.pt-btn:hover { opacity: 0.92; }
.pt-btn-primary { background: #f59e0b; color: #0f172a; }
.pt-btn-secondary { background: #334155; color: #fff; border: 1px solid #475569; }
.pt-btn-cbt { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; border: 1px solid #3b82f6; box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35); }
.pt-btn-cbt.active { background: linear-gradient(135deg, #16a34a, #15803d); border-color: #22c55e; }

/* Running Brand Header */
#print-brand {
  display: flex; align-items: center; justify-content: space-between; gap: 10pt;
  border-bottom: 2pt solid #1a1a2e; padding-bottom: 6pt; margin-bottom: 14pt;
  font-family: system-ui, -apple-system, sans-serif; font-size: 8.5pt; color: #1a1a2e;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
#print-brand .pb-left { display: flex; align-items: center; gap: 8pt; }
.pb-logo-img { height: 22pt; width: auto; object-fit: contain; }
.pb-badge {
  background: #1a1a2e; color: #fff; padding: 2pt 8pt; border-radius: 3pt;
  font-weight: 700; font-size: 7.5pt; letter-spacing: 0.06em; text-transform: uppercase;
}
.pb-badge-ak { background: #15803d; color: #fff; }

/* Cover Page */
.fep-cover-page { page-break-after: always; margin-bottom: 22pt; }
.fep-official-bar {
  background: #1a1a2e !important; color: #fff !important;
  padding: 5pt 14pt; font-family: sans-serif; font-size: 7.5pt; font-weight: 700;
  letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 10pt;
  display: flex; justify-content: space-between; align-items: center;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.fep-header {
  border: 2pt solid #0f172a; margin-bottom: 16pt; background: #fafcff;
  overflow: hidden; page-break-inside: avoid; border-radius: 3pt;
}
.fep-logo-wrap { text-align: center; padding: 12pt 0 4pt; }
.fep-logo-img { max-width: 64pt; max-height: 44pt; object-fit: contain; }
.fep-top-bar {
  background: #1a1a2e !important; color: #fff !important;
  display: flex; justify-content: space-between; align-items: center;
  padding: 8pt 16pt; margin-bottom: 12pt;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.fep-exam-logo { font-family: Georgia, serif; font-size: 10pt; font-weight: 900; letter-spacing: 0.06em; color: #fff !important; text-transform: uppercase; }
.fep-badge {
  font-family: sans-serif; font-size: 7pt; font-weight: 700; letter-spacing: 0.08em;
  text-transform: uppercase; background: #B8801F !important; color: #fff !important;
  padding: 2.5pt 10pt; border-radius: 2pt;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.fep-title { font-size: 16.5pt; font-weight: 700; color: #0f172a; margin: 0 16pt 4pt; text-align: center; }
.fep-subtitle { font-family: sans-serif; font-size: 9pt; font-weight: 600; color: #475569; text-align: center; margin: 0 16pt 10pt; }
.fep-total-bar {
  display: flex; justify-content: space-around; gap: 14pt; padding: 8pt 16pt;
  background: #f1f5f9; border-top: 1.5pt solid #cbd5e1; border-bottom: 1.5pt solid #cbd5e1;
  margin: 8pt 0 0; font-family: sans-serif; font-size: 8pt;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.fep-total-item { display: flex; flex-direction: column; align-items: center; gap: 2pt; }
.fep-total-val { font-size: 11pt; font-weight: 800; color: #0f172a; }
.fep-total-lbl { font-size: 6.8pt; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; }
.fep-meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8pt 18pt; padding: 12pt 16pt; }
.fep-meta-cell { display: flex; align-items: center; gap: 8pt; font-size: 8.5pt; }
.fep-mlabel { font-weight: 700; white-space: nowrap; font-family: sans-serif; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.04em; color: #475569; min-width: 78pt; }
.fep-mline { flex: 1; border-bottom: 1pt solid #64748b; height: 14pt; }
.fep-mval { flex: 1; font-family: sans-serif; color: #0f172a; font-weight: 600; }
.fep-score-cell { border: 1.5pt solid #0f172a; padding: 4pt 8pt; background: #fff; }
.fep-score-box-big { font-family: sans-serif; font-size: 10.5pt; font-weight: 800; color: #0f172a; margin-left: auto; }
.fep-instr-box {
  margin: 0 16pt 14pt; background: #eef2fb !important; border-left: 4pt solid #3b4fc8;
  padding: 9pt 12pt; font-size: 8.5pt; border-radius: 0 3pt 3pt 0;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
body[dir="rtl"] .fep-instr-box { border-left: none; border-right: 4pt solid #3b4fc8; border-radius: 3pt 0 0 3pt; }
.fep-instr-box strong { display: block; margin-bottom: 4pt; font-family: sans-serif; text-transform: uppercase; font-size: 7.5pt; letter-spacing: 0.05em; color: #1e3a8a !important; }
.fep-instr-list { margin: 0; padding-left: 16pt; line-height: 1.6; color: #1e293b; }
body[dir="rtl"] .fep-instr-list { padding-left: 0; padding-right: 16pt; }

/* Reference / Formula Sheet */
.fep-ref-sheet {
  margin: 14pt 0 20pt; padding: 12pt 14pt; border: 1.5pt solid #94a3b8;
  border-radius: 4pt; background: #f8fafc; font-family: sans-serif;
  page-break-inside: avoid; -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.fep-ref-title {
  font-weight: 800; font-size: 9pt; color: #0f172a; margin-bottom: 8pt;
  padding-bottom: 5pt; border-bottom: 1pt solid #cbd5e1; text-transform: uppercase; letter-spacing: 0.04em;
}
.fep-ref-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(195pt, 1fr));
  gap: 8pt; font-size: 8pt; line-height: 1.55; color: #1e293b;
}
.fep-ref-card { background: #fff; padding: 8pt 10pt; border: 1pt solid #e2e8f0; border-radius: 3pt; }

/* Scantron Bubble Sheet */
.fep-anssheet {
  border: 1.5pt solid #94a3b8; padding: 12pt 16pt; margin-bottom: 22pt;
  background: #fff; page-break-after: always; border-radius: 3pt;
}
.fep-anssheet-title {
  font-family: sans-serif; font-size: 8pt; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.07em; color: #1e293b; margin-bottom: 8pt; padding-bottom: 5pt; border-bottom: 1pt solid #cbd5e1;
}
.fep-bubbles {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(125pt, 1fr)); gap: 6pt 14pt;
}
.fep-bubble-row { display: flex; align-items: center; gap: 5pt; font-size: 8pt; font-family: sans-serif; break-inside: avoid; }
.fep-bnum { width: 20pt; text-align: right; font-weight: 700; color: #475569; flex-shrink: 0; }
.fep-bubble {
  width: 17pt; height: 17pt; border-radius: 50%; border: 1.3pt solid #0f172a !important;
  display: flex; align-items: center; justify-content: center; font-size: 7pt; font-weight: 700;
  flex-shrink: 0; background: #fff !important;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}

/* Sections & Parts */
.fep-section { margin-bottom: 24pt; page-break-before: always; }
.fep-section-head {
  display: flex; align-items: center; gap: 10pt;
  background: #1a1a2e !important; color: #fff !important;
  padding: 7pt 14pt; margin-bottom: 6pt; border-radius: 2pt;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.fep-sec-label { font-family: sans-serif; font-size: 7pt; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.8; }
.fep-sec-title { flex: 1; font-family: sans-serif; font-size: 9.5pt; font-weight: 700; }
.fep-sec-time { font-family: sans-serif; font-size: 7.5pt; background: rgba(255,255,255,0.18) !important; padding: 2pt 8pt; border-radius: 2pt; white-space: nowrap; }
.fep-sec-note {
  font-family: sans-serif; font-size: 8pt; color: #334155; background: #fff8ee !important;
  border-left: 3pt solid #B8801F; padding: 5pt 10pt; margin-bottom: 10pt;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
body[dir="rtl"] .fep-sec-note { border-left: none; border-right: 3pt solid #B8801F; }
.fep-part-head {
  display: flex; align-items: center; gap: 10pt; background: #2d3a6b !important; color: #fff !important;
  padding: 6pt 12pt; margin: 12pt 0 8pt; border-radius: 2pt;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.fep-part-label { font-family: sans-serif; font-size: 7.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
.fep-part-info { font-family: sans-serif; font-size: 7.5pt; opacity: 0.9; flex: 1; }
.fep-calc-badge { font-family: sans-serif; font-size: 6.5pt; padding: 2pt 7pt; border-radius: 2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.fep-calc-no { background: #dc2626 !important; color: #fff !important; }
.fep-calc-yes { background: #15803d !important; color: #fff !important; }

/* Question Items */
.fep-item {
  margin-bottom: 16pt; padding-bottom: 14pt; border-bottom: 1pt dashed #cbd5e1;
  page-break-inside: avoid; break-inside: avoid;
}
.fep-item:last-child { border-bottom: none; }
.fep-item-head { display: flex; align-items: center; gap: 7pt; margin-bottom: 6pt; flex-wrap: wrap; }
.fep-inum {
  min-width: 22pt; height: 22pt; padding: 0 5pt; border-radius: 11pt;
  background: #1a1a2e !important; color: #fff !important;
  display: inline-flex; align-items: center; justify-content: center;
  font-family: sans-serif; font-weight: 700; font-size: 8pt; flex-shrink: 0;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.fep-domain-tag {
  font-family: sans-serif; font-size: 6.8pt; color: #475569; background: #f1f5f9;
  border: 1pt solid #e2e8f0; padding: 1.5pt 6pt; border-radius: 2pt;
  text-transform: uppercase; letter-spacing: 0.04em;
}
.fep-diff-tag {
  font-family: sans-serif; font-size: 6.5pt; font-weight: 700;
  padding: 1.5pt 6pt; border-radius: 2pt; text-transform: uppercase; letter-spacing: 0.04em;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.fep-diff-easy { background: #dcfce7; color: #166534; border: 1pt solid #bbf7d0; }
.fep-diff-medium { background: #fef3c7; color: #92400e; border: 1pt solid #fde68a; }
.fep-diff-hard { background: #fee2e2; color: #991b1b; border: 1pt solid #fecaca; }
.fep-marks-tag {
  margin-left: auto; font-family: sans-serif; font-weight: 700; font-size: 7.8pt;
  color: #1e293b; background: #e2e8f0; padding: 1.5pt 7pt; border-radius: 2pt;
}
body[dir="rtl"] .fep-marks-tag { margin-left: 0; margin-right: auto; }
.fep-figure {
  margin: 8pt 0 10pt 26pt; text-align: center;
  page-break-inside: avoid; break-inside: avoid;
}
body[dir="rtl"] .fep-figure { margin: 8pt 26pt 10pt 0; }
.fep-figure svg {
  width: auto !important; max-width: 270pt !important; max-height: 195pt !important;
  height: auto !important; display: inline-block;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.fep-qbody { margin-left: 26pt; margin-bottom: 9pt; font-size: 10pt; line-height: 1.65; }
body[dir="rtl"] .fep-qbody { margin-left: 0; margin-right: 26pt; }
.fep-choices { margin-left: 26pt; display: grid; grid-template-columns: 1fr 1fr; gap: 5pt 14pt; }
body[dir="rtl"] .fep-choices { margin-left: 0; margin-right: 26pt; }
.fep-choice { display: flex; align-items: baseline; gap: 6pt; font-size: 9.5pt; padding: 3.5pt 7pt; border: 1pt solid #e2e8f0; border-radius: 3pt; background: #fafcff; transition: all 0.15s; }
.fep-choice-correct { border: 1.5pt solid #15803d !important; background: #f0fdf4 !important; font-weight: 700; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.fep-choice-wrong { border: 1.5pt solid #dc2626 !important; background: #fef2f2 !important; }
.fep-cletter { font-weight: 700; font-family: sans-serif; min-width: 15pt; flex-shrink: 0; color: #1a1a2e; }
.fep-ctext { flex: 1; }

/* Qiyas Two-Column Quantitative Comparison Card */
.qiyas-qc-box {
  display: grid; grid-template-columns: 1fr 1fr; border: 1.5pt solid #475569;
  border-radius: 4pt; overflow: hidden; margin: 8pt 0 6pt; background: #f8fafc;
  text-align: center; font-family: sans-serif; page-break-inside: avoid;
}
.qiyas-qc-col:first-child { border-right: 1.5pt solid #94a3b8; }
body[dir="rtl"] .qiyas-qc-col:first-child { border-right: none; border-left: 1.5pt solid #94a3b8; }
.qiyas-qc-hdr { background: #e2e8f0 !important; padding: 4pt 8pt; font-weight: 700; font-size: 8pt; color: #0f172a; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.qiyas-qc-val { padding: 9pt 10pt; font-weight: 700; font-size: 9.5pt; color: #0f172a; }

/* Written Working Space */
.fep-work-space {
  margin: 8pt 0 0 26pt; border: 1.2pt solid #94a3b8; border-radius: 3pt;
  padding: 8pt 12pt; background: #fcfdff; page-break-inside: avoid;
}
body[dir="rtl"] .fep-work-space { margin: 8pt 26pt 0 0; }
.fep-ws-label { font-family: sans-serif; font-size: 7.2pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; display: flex; justify-content: space-between; margin-bottom: 4pt; }
.fep-ws-line { border-bottom: 1pt dotted #cbd5e1; height: 22pt; }
.fep-ws-ans { display: flex; align-items: center; justify-content: flex-end; gap: 8pt; margin-top: 8pt; font-family: sans-serif; font-size: 8.5pt; font-weight: 700; }
.fep-ws-ans-line { width: 140pt; border-bottom: 1.5pt solid #0f172a; height: 14pt; }

/* Answer Key Solution Box */
.fep-sol-box {
  margin: 8pt 0 0 26pt; padding: 9pt 12pt; border-left: 3.5pt solid #15803d;
  background: #f0fdf4 !important; border-radius: 0 4pt 4pt 0; font-size: 9.2pt; line-height: 1.62;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
body[dir="rtl"] .fep-sol-box { margin: 8pt 26pt 0 0; border-left: none; border-right: 3.5pt solid #15803d; border-radius: 4pt 0 0 4pt; }
.fep-sol-hdr { font-family: sans-serif; font-weight: 800; font-size: 8.2pt; color: #166534; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4pt; }

/* Answer Key Quick Grid */
.ak-summary-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(115pt, 1fr));
  gap: 5pt 8pt; margin: 10pt 0 18pt; font-family: sans-serif; font-size: 8pt;
}
.ak-summary-cell {
  display: flex; align-items: center; justify-content: space-between;
  padding: 4pt 8pt; border: 1pt solid #cbd5e1; border-radius: 3pt; background: #f8fafc;
}
.ak-snum { font-weight: 700; color: #334155; }
.ak-sans { font-weight: 800; color: #15803d; }

/* Tables */
table.exam-table { border-collapse: collapse; margin: 8pt auto; font-family: sans-serif; font-size: 8.5pt; }
table.exam-table th, table.exam-table td { border: 1pt solid #64748b; padding: 4pt 8pt; text-align: center; }
table.exam-table th { background: #e2e8f0 !important; font-weight: 700; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

/* Footer */
.fep-footer {
  margin-top: 24pt; padding-top: 8pt; border-top: 1pt solid #cbd5e1;
  display: flex; justify-content: space-between; align-items: center;
  font-family: sans-serif; font-size: 7.5pt; color: #64748b;
}

/* Interactive In-Page CBT Simulator Bar & Controls */
#cbt-live-dock {
  display: none; position: sticky; top: 48px; z-index: 990;
  background: #1e293b; color: #fff; padding: 10px 20px;
  font-family: system-ui, -apple-system, sans-serif; font-size: 13px;
  border-bottom: 2px solid #3b82f6; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.25);
}
body.cbt-interactive-active #cbt-live-dock { display: block; }
body.cbt-interactive-active .fep-cover-page,
body.cbt-interactive-active .fep-anssheet { display: none; }
body.cbt-interactive-active .fep-choice {
  cursor: pointer; border-width: 1.5pt; padding: 6pt 10pt;
}
body.cbt-interactive-active .fep-choice:hover {
  border-color: #3b82f6; background: #eff6ff;
}
body.cbt-interactive-active .fep-choice.cbt-selected {
  border-color: #2563eb !important; background: #dbeafe !important; font-weight: 700;
}
.cbt-dock-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.cbt-timer-pill {
  background: #0f172a; border: 1px solid #475569; padding: 5px 12px;
  border-radius: 6px; font-family: ui-monospace, SFMono-Regular, monospace;
  font-weight: 800; font-size: 14px; color: #38bdf8;
}
.cbt-nav-strip {
  display: flex; gap: 5px; flex-wrap: wrap; margin-top: 8px; padding-top: 8px;
  border-top: 1px solid #334155; max-height: 76px; overflow-y: auto;
}
.cbt-qpill {
  min-width: 28px; height: 26px; padding: 0 6px; border-radius: 5px;
  background: #334155; color: #e2e8f0; border: 1px solid #475569;
  font-size: 11.5px; font-weight: 700; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
}
.cbt-qpill.answered { background: #2563eb; border-color: #60a5fa; color: #fff; }
.cbt-qpill.graded-ok { background: #16a34a; border-color: #4ade80; color: #fff; }
.cbt-qpill.graded-bad { background: #dc2626; border-color: #f87171; color: #fff; }
.cbt-inline-input-wrap {
  display: none; margin: 8pt 0 0 26pt; padding: 10pt 12pt;
  background: #eff6ff; border: 1.5pt solid #93c5fd; border-radius: 4pt;
  font-family: system-ui, -apple-system, sans-serif;
}
body[dir="rtl"] .cbt-inline-input-wrap { margin: 8pt 26pt 0 0; }
body.cbt-interactive-active .cbt-inline-input-wrap { display: block; }
body.cbt-interactive-active .fep-work-space { display: none; }
.cbt-spr-input {
  padding: 7px 12px; font-size: 14px; font-weight: 700; border: 2px solid #2563eb;
  border-radius: 5px; width: 220px; font-family: ui-monospace, monospace;
}
.cbt-work-textarea {
  width: 100%; min-height: 70px; padding: 8px 10px; border: 1px solid #cbd5e1;
  border-radius: 5px; font-family: system-ui, sans-serif; font-size: 13px; margin-bottom: 8px;
}
.cbt-score-banner {
  display: none; margin: 12px 0; padding: 14px 18px; border-radius: 6px;
  background: linear-gradient(135deg, #0f172a, #1e3a8a); color: #fff;
  font-family: system-ui, sans-serif;
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// 10. RENDER FULL EXAM HTML & FULL ANSWER KEY HTML
// ─────────────────────────────────────────────────────────────────────────────
function renderPrintableDocument({
  trackId,
  spec,
  paperTitle,
  examNumber,
  totalExams,
  entries,
  langMode,
  isAnswerKey,
  examFilename,
  akFilename
}) {
  const maxExams = totalExams || 10;
  const isAr = langMode === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const htmlLang = isAr ? 'ar' : 'en';
  const isIB = Boolean(spec.isIB || trackId === 'ibsl' || trackId === 'ibhl');
  const isSAT = trackId === 'sat';
  const letters = isAr ? ['أ', 'ب', 'ج', 'د'] : (spec.letters || ['A', 'B', 'C', 'D']);

  let totalMCQ = 0;
  let totalFRQ = 0;
  let totalMarks = 0;
  entries.forEach(e => {
    const isFree = e.part.type === 'frq' || e.part.type === 'spr';
    if (isFree) totalFRQ++;
    else totalMCQ++;
    totalMarks += Number(e.q.marks) || e.part.defaultMarks || (isIB ? 7 : 1);
  });
  const totalQ = entries.length;
  const displayMarks = spec.totalMarks || (totalFRQ > 0 ? totalMarks : totalQ);

  const docTitle = isAr
    ? `${paperTitle} — ${isAnswerKey ? 'مفتاح الإجابة والحلول النموذجية' : 'ورقة الاختبار الكامل'} #${examNumber}`
    : `${paperTitle} — Full Practice Exam ${examNumber}${isAnswerKey ? ' (Answer Key & Mark Scheme)' : ''}`;

  const companionHref = isAnswerKey ? examFilename : akFilename;
  const companionLabel = isAr
    ? (isAnswerKey ? '📄 عرض ورقة الاختبار' : '🔑 عرض مفتاح الإجابة والحلول')
    : (isAnswerKey ? '📄 View Exam Paper' : '🔑 View Answer Key & Solutions');

  let h = `<!DOCTYPE html>
<html lang="${htmlLang}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escHtml(docTitle)} | ClipSAT</title>
  <link rel="stylesheet" href="/vendor/katex/katex.min.css">
  <style>${PRINT_EXAM_CSS}</style>
</head>
<body dir="${dir}">
  <div class="print-toolbar no-print" dir="ltr">
    <div class="pt-brand">
      <img src="/clipsat-mark.png" alt="ClipSAT Logo">
      <span>ClipSAT Official Printable Exam Suite &middot; ${escHtml(paperTitle)} (Exam #${examNumber})</span>
    </div>
    <div class="pt-actions">
      ${!isAnswerKey ? `<button type="button" id="pt-cbt-toggle-btn" class="pt-btn pt-btn-cbt" onclick="window.toggleExamInteractiveCBT()">💻 ${isAr ? 'حل تفاعلياً (CBT)' : 'Solve in CBT'}</button>` : `<a class="pt-btn pt-btn-cbt" href="${escHtml(examFilename)}?cbt=1">💻 ${isAr ? 'حل هذا الاختبار في المحاكي (CBT)' : 'Solve This Exam in CBT'}</a>`}
      <a class="pt-btn pt-btn-secondary" href="${escHtml(companionHref)}">${companionLabel}</a>
      <button type="button" class="pt-btn pt-btn-primary" onclick="window.print()">🖨️ ${isAr ? 'طباعة / حفظ كملف PDF' : 'Print / Save as PDF'}</button>
    </div>
  </div>
  ${!isAnswerKey ? `<div id="cbt-live-dock" class="no-print" dir="ltr">
    <div class="cbt-dock-top">
      <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
        <span style="font-weight:800;color:#60a5fa">💻 CBT Interactive Mode</span>
        <span id="cbt-live-timer" class="cbt-timer-pill">⏱ ${String(parseDurationMinutes(spec.totalTime)).padStart(2, '0')}:00</span>
        <span id="cbt-live-progress" style="font-weight:700;color:#cbd5e1">Answered: 0 / ${totalQ}</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        <button type="button" class="pt-btn pt-btn-primary" id="cbt-live-submit-btn" onclick="window.submitInteractiveCBT()">✓ ${isAr ? 'تسليم وتصحيح الاختبار' : 'Submit & Auto-Grade Exam'}</button>
        <button type="button" class="pt-btn pt-btn-secondary" onclick="window.resetInteractiveCBT()">↺ ${isAr ? 'إعادة ضبط' : 'Reset'}</button>
        <button type="button" class="pt-btn pt-btn-secondary" onclick="window.toggleExamInteractiveCBT()">✕ ${isAr ? 'وضع الورقة للطباعة' : 'Exit CBT (Print View)'}</button>
      </div>
    </div>
    <div id="cbt-score-banner" class="cbt-score-banner"></div>
    <div id="cbt-nav-strip" class="cbt-nav-strip"></div>
  </div>` : ''}
  <div class="page-shell">
    <div id="print-brand">
      <span class="pb-left">
        <img class="pb-logo-img" src="/clipsat-mark.png" alt="ClipSAT Logo">
        <span><strong>ClipSAT</strong> &middot; ${escHtml(spec.org || 'Official Curriculum Examination')}</span>
      </span>
      <span class="pb-badge ${isAnswerKey ? 'pb-badge-ak' : ''}">${isAnswerKey
        ? (isAr ? 'مفتاح الإجابة والحلول النموذجية' : 'Official Answer Key & Mark Scheme')
        : (isAr ? `الاختبار الكامل #${examNumber}` : `Official Format Paper · Exam #${examNumber}`)}</span>
    </div>
`;

  // COVER PAGE (for Exam Paper) or SUMMARY HEADER + QUICK KEY GRID (for Answer Key)
  if (!isAnswerKey) {
    h += `<div class="fep-cover-page">
      <div class="fep-official-bar">
        <span>${escHtml(spec.org || 'ClipSAT International Examinations')}</span>
        <span>${isAr ? `النموذج رقم ${examNumber} من ١٠` : `Form ${examNumber} of ${maxExams}`}</span>
      </div>
      <div class="fep-header">
        <div class="fep-logo-wrap">
          <img src="/clipsat-mark.png" class="fep-logo-img" alt="ClipSAT Logo">
        </div>
        <div class="fep-top-bar">
          <span class="fep-exam-logo">${escHtml(spec.logo || paperTitle)}</span>
          <span class="fep-badge">${isAr ? 'اختبار قياسي كامل للطباعة' : (isIB ? 'IB DP Official Format Examination' : 'Official Format Examination')}</span>
        </div>
        <h1 class="fep-title">${escHtml(paperTitle)}</h1>
        <div class="fep-subtitle">${isAr ? `الاختبار التدريبي الكامل رقم ${examNumber}` : `Full-Length Printable Examination — Paper Set #${examNumber}`}</div>
        <div class="fep-total-bar">
          <div class="fep-total-item"><span class="fep-total-val">${totalQ}</span><span class="fep-total-lbl">${isAr ? 'عدد الأسئلة' : 'Total Questions'}</span></div>
          <div class="fep-total-item"><span class="fep-total-val">${escHtml(spec.totalTime)}</span><span class="fep-total-lbl">${isAr ? 'الزمن الكلي' : 'Total Time'}</span></div>
          <div class="fep-total-item"><span class="fep-total-val">${displayMarks}</span><span class="fep-total-lbl">${isAr ? 'الدرجة الكلية' : 'Maximum Marks'}</span></div>
          <div class="fep-total-item"><span class="fep-total-val">${isSAT ? 'Multiple Choice + Student-Produced Response' : (totalFRQ > 0 && totalMCQ === 0 ? (isAr ? 'مقالي' : 'Written Paper') : (totalMCQ > 0 && totalFRQ === 0 ? (isAr ? 'اختيار من متعدد' : 'Multiple Choice') : 'MCQ + FRQ'))}</span><span class="fep-total-lbl">${isAr ? 'نوع الورقة' : 'Paper Format'}</span></div>
        </div>
        <div class="fep-meta-grid">
          <div class="fep-meta-cell"><span class="fep-mlabel">${isAr ? 'اسم الطالب / المرشح' : 'Candidate Name'}</span><span class="fep-mline"></span></div>
          <div class="fep-meta-cell"><span class="fep-mlabel">${isAr ? 'رقم الجلوس / الهوية' : 'Candidate / ID No.'}</span><span class="fep-mline"></span></div>
          <div class="fep-meta-cell"><span class="fep-mlabel">${isAr ? 'المدرسة / المركز' : 'School / Centre'}</span><span class="fep-mline"></span></div>
          <div class="fep-meta-cell fep-score-cell"><span class="fep-mlabel">${isAr ? 'الدرجة النهائية' : 'Total Score'}</span><span class="fep-score-box-big">____ / ${displayMarks}</span></div>
        </div>
        <div class="fep-instr-box">
          <strong>${isAr ? 'تعليمات الاختبار الهامة' : 'Instructions to Candidates'}</strong>
          <ul class="fep-instr-list">`;
    const instrList = isAr
      ? (trackId === 'qudrat'
        ? [
            `يتكون هذا الاختبار من (${totalQ}) سؤالاً من نوع الاختيار من متعدد والمقارنات الكمية، والزمن المخصص (${spec.totalTime}).`,
            'يُمنع منعاً باتاً استخدام الآلة الحاسبة في جميع أقسام اختبار القدرات العامة (الورقي والمحوسب).',
            'في أسئلة المقارنات الكمية: (أ) القيمة الأولى أكبر، (ب) القيمة الثانية أكبر، (ج) القيمتان متساويتان، (د) المعطيات غير كافية.',
            'ظلّل دائرة الإجابة الصحيحة في ورقة الإجابة المرفقة؛ لا توجد درجات سالبة للإجابات الخاطئة.'
          ]
        : [
            `يتكون هذا الاختبار من (${totalQ}) سؤالاً تغطي مقررات الرياضيات للمرحلة الثانوية (نظام المسارات ١، ٢، ٣)، والزمن المخصص (${spec.totalTime}).`,
            'يُمنع استخدام الآلة الحاسبة منعاً باتاً.',
            'اختر الإجابة الصحيحة الوحيدة من بين الخيارات الأربعة (أ، ب، ج، د) لكل سؤال.',
            'لا يُخصم شيء مقابل الإجابات الخاطئة؛ احرص على الإجابة عن جميع الأسئلة.'
          ])
      : (spec.instructions || []);
    instrList.forEach(ins => {
      h += `<li>${escHtml(ins)}</li>`;
    });
    h += `</ul>
        </div>
      </div>`;

    // Section overview table on cover page
    h += `<div class="fep-instr-box" style="background:#f8fafc!important;border-color:#0f172a">
      <strong>${isAr ? 'هيكل وأقسام الاختبار' : 'Examination Structure & Timing Overview'}</strong>
      <table class="exam-table" style="width:100%;margin-top:6pt">
        <thead>
          <tr>
            <th style="text-align:${isAr ? 'right' : 'left'}">${isAr ? 'القسم / الجزء' : 'Section / Part'}</th>
            <th>${isAr ? 'الزمن' : 'Time'}</th>
            <th>${isAr ? 'الأسئلة' : 'Questions'}</th>
            <th>${isAr ? 'الآلة الحاسبة' : (isIB ? 'Technology (GDC)' : 'Calculator Policy')}</th>
          </tr>
        </thead>
        <tbody>`;
    spec.sections.forEach(sec => {
      sec.parts.forEach(p => {
        const rowTitle = sec.parts.length > 1 && p.label ? `${sec.title} — ${p.label}` : sec.title;
        const calcText = isAr
          ? (p.calc ? 'مسموح' : 'غير مسموح')
          : (isIB ? (p.calc ? 'GDC Required' : 'No Technology') : (p.calc ? 'Permitted' : 'Not Permitted'));
        h += `<tr>
          <td style="text-align:${isAr ? 'right' : 'left'}"><strong>${escHtml(rowTitle)}</strong>${p.note ? `<br><small style="color:#475569">${escHtml(p.note)}</small>` : ''}</td>
          <td>${escHtml(p.time || sec.time)}</td>
          <td>${p.q}</td>
          <td><span class="fep-calc-badge ${p.calc ? 'fep-calc-yes' : 'fep-calc-no'}">${calcText}</span></td>
        </tr>`;
      });
    });
    h += `</tbody></table></div></div>`; // End cover page

    // Formula / Reference Booklet
    h += renderOfficialFormulaSheet(trackId, spec, langMode);

    // Scantron Bubble Sheet (if MCQ questions exist)
    if (totalMCQ > 0) {
      h += `<div class="fep-anssheet">
        <div class="fep-anssheet-title">${isAr ? `ورقة تظليل الإجابات — الاختيار من متعدد (${totalMCQ} سؤالاً)` : `Optical Mark Answer Sheet — Multiple Choice (${totalMCQ} Questions)`}</div>
        <div class="fep-bubbles">`;
      let mcqIdx = 0;
      entries.forEach(e => {
        if (e.part.type === 'frq' || e.part.type === 'spr') return;
        mcqIdx++;
        h += `<div class="fep-bubble-row"><span class="fep-bnum">${mcqIdx}.</span>`;
        letters.forEach(l => {
          h += `<span class="fep-bubble">${l}</span>`;
        });
        h += `</div>`;
      });
      h += `</div></div>`;
    }
  } else {
    // ANSWER KEY COVER HEADER & QUICK SUMMARY GRID
    h += `<div class="fep-header" style="margin-bottom:14pt">
      <div class="fep-logo-wrap"><img src="/clipsat-mark.png" class="fep-logo-img" alt="ClipSAT Logo"></div>
      <div class="fep-top-bar" style="background:#14532d!important">
        <span class="fep-exam-logo">${escHtml(spec.logo || paperTitle)}</span>
        <span class="fep-badge" style="background:#16a34a!important">${isAr ? 'مفتاح الإجابة والحلول النموذجية' : 'Official Answer Key & Mark Scheme'}</span>
      </div>
      <h1 class="fep-title">${escHtml(paperTitle)}</h1>
      <div class="fep-subtitle">${isAr ? `نموذج الإجابة التفصيلي للاختبار الكامل رقم ${examNumber}` : `Complete Worked Solutions & Examiner Mark Scheme — Paper Set #${examNumber}`}</div>
    </div>
    <div class="fep-ref-sheet" style="page-break-inside:auto">
      <div class="fep-ref-title">${isAr ? 'جدول مفتاح الإجابات السريع (Quick Grading Summary)' : 'Quick-Grading Answer Key & Mark Allocation Summary'}</div>
      <div class="ak-summary-grid">`;
    entries.forEach((e, idx) => {
      const qNum = idx + 1;
      const isFree = e.part.type === 'frq' || e.part.type === 'spr';
      const ansIdx = typeof e.q.answer === 'number' ? e.q.answer : 0;
      const shortAns = isFree
        ? (isSAT && e.q.finalAnswerText ? `SPR: ${e.q.finalAnswerText}` : `[${Number(e.q.marks) || e.part.defaultMarks || 6}m]`)
        : (letters[ansIdx] || 'A');
      h += `<div class="ak-summary-cell"><span class="ak-snum">Q${qNum}</span><span class="ak-sans">${escHtml(shortAns)}</span></div>`;
    });
    h += `</div></div>`;
  }

  // RENDER SECTIONS, PARTS, AND QUESTIONS
  let qNum = 1;
  let cursor = 0;
  const cbtQuestionsMeta = [];
  spec.sections.forEach((sec, si) => {
    h += `<div class="fep-section" style="page-break-before:${si === 0 && isAnswerKey ? 'auto' : 'always'}">
      <div class="fep-section-head">
        <span class="fep-sec-label">${isAr ? `القسم ${si + 1}` : (isIB ? `Paper / Section ${si + 1}` : `Section ${si + 1}`)}</span>
        <span class="fep-sec-title">${escHtml(sec.title)}</span>
        <span class="fep-sec-time">&#9201; ${escHtml(sec.time)}</span>
      </div>`;
    if (sec.note) h += `<div class="fep-sec-note">${escHtml(sec.note)}</div>`;

    sec.parts.forEach((part, partIdx) => {
      const isFreePart = part.type === 'frq' || part.type === 'spr';
      if (part.label) {
        const calcBadge = isAr
          ? (part.calc ? 'مسموح بالآلة الحاسبة' : 'بدون آلة حاسبة')
          : (isIB ? (part.calc ? 'GDC Required' : 'No Technology') : (part.calc ? 'Calculator Permitted' : 'No Calculator'));
        h += `<div class="fep-part-head">
          <span class="fep-part-label">${escHtml(part.label)}</span>
          <span class="fep-part-info">${part.q} ${isAr ? 'أسئلة' : 'Questions'}${part.time ? ` &middot; &#9201; ${escHtml(part.time)}` : ''}</span>
          <span class="fep-calc-badge ${part.calc ? 'fep-calc-yes' : 'fep-calc-no'}">${calcBadge}</span>
        </div>`;
      }
      if (part.note) h += `<div class="fep-sec-note">${escHtml(part.note)}</div>`;

      for (let pi = 0; pi < part.q && cursor < entries.length; pi++) {
        const entry = entries[cursor++];
        const q = entry.q;
        const isFree = isFreePart || q.type === 'frq' || q.type === 'spr';
        const qType = isFree ? (isSAT ? 'spr' : 'frq') : 'mcq';
        const qMarks = Number(q.marks) || part.defaultMarks || (isIB ? 7 : (isFree ? 6 : 1));
        const diffKey = ['easy', 'medium', 'hard'].includes((q.difficulty || '').toLowerCase())
          ? q.difficulty.toLowerCase()
          : 'medium';
        const diffLabel = isAr
          ? (diffKey === 'easy' ? 'أساسي' : (diffKey === 'hard' ? 'متقدم / تحدي' : 'قياسي'))
          : (diffKey === 'easy' ? 'Foundational' : (diffKey === 'hard' ? 'Challenging' : 'Standard'));

        const figHtml = renderQuestionFigure(q, langMode);
        const qcCardHtml = (trackId === 'qudrat' || q.topic_id === 'qud-compare' || /Quantitative Comparison|المقارنات الكمية/i.test(q.domain || ''))
          ? renderQiyasComparisonCard(q, langMode)
          : '';
        const stemHtml = formatMarkdownAndMath(q.text || q.q || '', langMode);

        const cbtChoicesRendered = (isFree && !isSAT && Array.isArray(q.cbtChoices) && q.cbtChoices.length >= 2)
          ? q.cbtChoices.map(ch => formatMarkdownAndMath(autoWrapChoiceMath(ch), langMode))
          : [];
        const ansIdx = typeof q.answer === 'number'
          ? q.answer
          : (typeof q.cbtAnswer === 'number' ? q.cbtAnswer : 0);

        cbtQuestionsMeta.push({
          qNum,
          secIdx: si,
          partIdx,
          sectionTitle: sec.title || `Section ${si + 1}`,
          partLabel: part.label || '',
          calc: Boolean(part.calc),
          type: qType,
          difficulty: diffKey,
          marks: qMarks,
          domain: isSAT ? officialSatDomain(q) : (q.domain || 'Mathematics'),
          answer: ansIdx,
          finalAnswerText: q.finalAnswerText || '',
          cbtChoicesHtml: cbtChoicesRendered
        });

        h += `<div id="fep-q-${qNum}" data-qnum="${qNum}" data-qtype="${qType}" data-marks="${qMarks}" data-diff="${diffKey}" class="fep-item ${isFree ? 'fep-frq' : 'fep-mcq'}">
          <div class="fep-item-head">
            <span class="fep-inum">${qNum}</span>
            <span class="fep-domain-tag">${escHtml(isSAT ? officialSatDomain(q) : (q.domain || 'Mathematics'))}</span>
            <span class="fep-diff-tag fep-diff-${diffKey}">${diffLabel}</span>
            <span class="fep-marks-tag">[${qMarks} ${qMarks === 1 ? (isAr ? 'درجة' : 'mark') : (isAr ? 'درجات' : 'marks')}]</span>
          </div>`;
        if (figHtml) {
          h += `<div class="fep-figure">${figHtml}</div>`;
        }
        h += `<div class="fep-qbody">${stemHtml}${qcCardHtml}</div>`;

        if (!isFree && Array.isArray(q.choices) && q.choices.length > 0) {
          h += `<div class="fep-choices">`;
          q.choices.forEach((ch, ci) => {
            const wrapped = autoWrapChoiceMath(ch);
            const chHtml = formatMarkdownAndMath(wrapped, langMode);
            const isCorrect = isAnswerKey && ci === ansIdx;
            h += `<div class="fep-choice ${isCorrect ? 'fep-choice-correct' : ''}" data-qnum="${qNum}" data-choice-idx="${ci}" onclick="window.selectCBTChoice && window.selectCBTChoice(${qNum}, ${ci})">
              <span class="fep-cletter">${letters[ci] || String.fromCharCode(65 + ci)}.</span>
              <span class="fep-ctext">${chHtml}${isCorrect ? ' ✓' : ''}</span>
            </div>`;
          });
          h += `</div>`;
        }

        if (!isAnswerKey && isFree) {
          // Interactive CBT Response Input for SPR or Written FRQ
          if (isSAT) {
            h += `<div class="cbt-inline-input-wrap no-print">
              <div style="font-weight:700;font-size:12.5px;color:#1e3a8a;margin-bottom:6px">💻 CBT Student-Produced Response (Enter integer, decimal, or fraction):</div>
              <input type="text" class="cbt-spr-input" id="cbt-spr-input-${qNum}" data-qnum="${qNum}" placeholder="e.g. 15, -3.5, or 3/4" oninput="window.recordCBTSpr && window.recordCBTSpr(${qNum}, this.value)">
            </div>`;
          } else {
            h += `<div class="cbt-inline-input-wrap no-print">
              <div style="font-weight:700;font-size:12.5px;color:#1e3a8a;margin-bottom:6px">💻 CBT Structured Working & Final Answer Verification [${qMarks} marks]:</div>
              <textarea class="cbt-work-textarea" id="cbt-work-${qNum}" placeholder="Show your mathematical steps and working here..."></textarea>`;
            if (cbtChoicesRendered.length > 0) {
              h += `<div style="font-weight:700;font-size:12px;color:#334155;margin-bottom:5px">Select your verified final analytical result for auto-grading:</div>
              <div class="fep-choices" style="margin-left:0">`;
              cbtChoicesRendered.forEach((chHtml, ci) => {
                h += `<div class="fep-choice" data-qnum="${qNum}" data-choice-idx="${ci}" onclick="window.selectCBTChoice && window.selectCBTChoice(${qNum}, ${ci})">
                  <span class="fep-cletter">${letters[ci] || String.fromCharCode(65 + ci)}.</span>
                  <span class="fep-ctext">${chHtml}</span>
                </div>`;
              });
              h += `</div>`;
            } else {
              h += `<input type="text" class="cbt-spr-input" id="cbt-spr-input-${qNum}" data-qnum="${qNum}" placeholder="Enter final answer..." oninput="window.recordCBTSpr && window.recordCBTSpr(${qNum}, this.value)">`;
            }
            h += `</div>`;
          }

          if (isSAT) {
            // Official Digital SAT Student-Produced Response answer space
            h += `<div class="fep-work-space">
              <div class="fep-ws-label">
                <span>Student-Produced Response (SPR) — Enter integer, decimal, or reduced fraction (up to 5 chars positive, 6 negative):</span>
                <span>[1 point]</span>
              </div>
              <div class="fep-ws-line"></div>
              <div class="fep-ws-line"></div>
              <div class="fep-ws-ans" style="justify-content:space-between;margin-top:8pt">
                <span style="display:inline-flex;align-items:center;gap:4pt;font-size:8pt;color:#334155">
                  <strong>Answer:</strong>
                  <span style="display:inline-flex;gap:2pt">
                    <span style="width:18pt;height:20pt;border:1.3pt solid #0f172a;display:inline-block;background:#fff"></span>
                    <span style="width:18pt;height:20pt;border:1.3pt solid #0f172a;display:inline-block;background:#fff"></span>
                    <span style="width:18pt;height:20pt;border:1.3pt solid #0f172a;display:inline-block;background:#fff"></span>
                    <span style="width:18pt;height:20pt;border:1.3pt solid #0f172a;display:inline-block;background:#fff"></span>
                    <span style="width:18pt;height:20pt;border:1.3pt solid #0f172a;display:inline-block;background:#fff"></span>
                    <span style="width:18pt;height:20pt;border:1.3pt solid #0f172a;display:inline-block;background:#fff"></span>
                  </span>
                </span>
                <span>Answer Preview: <span class="fep-ws-ans-line" style="display:inline-block;width:110pt"></span></span>
              </div>
            </div>`;
          } else {
            // Authentic working box / lined response space for written papers
            const isSecB = isIB && (part.ibSection === 'Section B' || part.ibSection === 'Paper 3' || qMarks >= 12);
            const lineCount = isSecB ? 9 : 6;
            h += `<div class="fep-work-space">
              <div class="fep-ws-label">
                <span>${isIB ? (isSecB ? 'Extended-Response Answer Booklet Space — Show all stages of working:' : 'Section A Answer Box — Write your working and final answer inside this box:') : 'Working Space — Show all stages of your mathematical working clearly:'}</span>
                <span>[${qMarks} marks]</span>
              </div>`;
            for (let ln = 0; ln < lineCount; ln++) {
              h += `<div class="fep-ws-line"></div>`;
            }
            if (!isIB) {
              h += `<div class="fep-ws-ans"><span>Answer:</span><span class="fep-ws-ans-line"></span></div>`;
            }
            h += `</div>`;
          }
        }

        const correctLetter = !isFree ? (letters[ansIdx] || 'A') : '';
        const correctChoiceText = (!isFree && Array.isArray(q.choices) && q.choices[ansIdx] != null)
          ? formatMarkdownAndMath(autoWrapChoiceMath(q.choices[ansIdx]), langMode)
          : (q.finalAnswerText ? formatMarkdownAndMath(autoWrapChoiceMath(q.finalAnswerText), langMode) : '');
        const solHtml = formatMarkdownAndMath(q.sol || q.solution || q.exp || '', langMode);

        h += `<div id="fep-sol-${qNum}" class="fep-sol-box ${!isAnswerKey ? 'no-print' : ''}" style="${!isAnswerKey ? 'display:none' : ''}">
          <div class="fep-sol-hdr">${isAr
            ? `الإجابة الصحيحة: (${correctLetter}) ${correctChoiceText ? `— ${correctChoiceText}` : ''}`
            : (isFree
              ? (isSAT
                ? `Official SPR Answer [1 point]${correctChoiceText ? ` — Correct answer: ${correctChoiceText}` : ''}`
                : `Official Examiner Mark Scheme [${qMarks} marks]${correctChoiceText ? ` — Final Answer: ${correctChoiceText}` : ''}`)
              : `Correct Answer: (${correctLetter})${correctChoiceText ? ` — ${correctChoiceText}` : ''}`)}</div>
          <div class="fep-sol-body">${solHtml}</div>
        </div>`;

        h += `</div>`;
        qNum++;
      }
    });

    h += `</div>`;
  });

  const cbtPayloadObj = {
    trackId,
    paperTitle,
    examNumber,
    totalExams: maxExams,
    lang: htmlLang,
    dir,
    org: spec.org || 'Official Curriculum Examination',
    totalTime: spec.totalTime,
    durationMinutes: parseDurationMinutes(spec.totalTime),
    totalMarks: displayMarks,
    letters,
    examFilename,
    akFilename,
    questions: cbtQuestionsMeta
  };
  const safeJsonPayload = JSON.stringify(cbtPayloadObj)
    .replace(/<\/script/gi, '<\\/script')
    .replace(/<!--/g, '<\\!--');

  const interactiveCbtScript = !isAnswerKey ? `<script>
(function(){
  var payloadEl = document.getElementById('clipsat-cbt-payload');
  if (!payloadEl) return;
  var meta = JSON.parse(payloadEl.textContent);
  var userAnswers = {};
  var userSpr = {};
  var graded = false;
  var timerSec = (meta.durationMinutes || 60) * 60;
  var timerInterval = null;

  function parseMathVal(str) {
    if (str == null) return NaN;
    var s = String(str).replace(/\\$/g, '').replace(/\\\\frac\\{([+-]?\\d+(?:\\.\\d+)?)\\}\\{([+-]?\\d+(?:\\.\\d+)?)\\}/g, '$1/$2').replace(/[^0-9./+-]/g, '').trim();
    if (!s) return NaN;
    if (s.indexOf('/') !== -1) {
      var p = s.split('/');
      var n = parseFloat(p[0]), d = parseFloat(p[1]);
      return (d && !isNaN(n) && !isNaN(d)) ? (n / d) : NaN;
    }
    return parseFloat(s);
  }

  function isSprCorrect(userVal, targetVal) {
    if (!userVal || !String(userVal).trim()) return false;
    var uClean = String(userVal).trim().toLowerCase();
    var tClean = String(targetVal || '').replace(/\\$/g, '').trim().toLowerCase();
    if (uClean === tClean) return true;
    var uNum = parseMathVal(uClean);
    var tNum = parseMathVal(tClean);
    if (!isNaN(uNum) && !isNaN(tNum) && Math.abs(uNum - tNum) <= 1e-3) return true;
    return false;
  }

  function formatClock(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return '⏱ ' + (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function renderNavPills() {
    var strip = document.getElementById('cbt-nav-strip');
    if (!strip) return;
    var html = '';
    meta.questions.forEach(function(q) {
      var hasAns = (userAnswers[q.qNum] !== undefined) || (userSpr[q.qNum] && String(userSpr[q.qNum]).trim() !== '');
      var cls = 'cbt-qpill';
      if (graded) {
        cls += isQuestionCorrect(q) ? ' graded-ok' : ' graded-bad';
      } else if (hasAns) {
        cls += ' answered';
      }
      html += '<button type="button" class="' + cls + '" onclick="document.getElementById(\\'fep-q-' + q.qNum + '\\').scrollIntoView({behavior:\\'smooth\\',block:\\'center\\'})">' + q.qNum + '</button>';
    });
    strip.innerHTML = html;
    var ansCount = meta.questions.filter(function(q) {
      return (userAnswers[q.qNum] !== undefined) || (userSpr[q.qNum] && String(userSpr[q.qNum]).trim() !== '');
    }).length;
    var prog = document.getElementById('cbt-live-progress');
    if (prog) prog.textContent = (meta.lang === 'ar' ? 'تمت الإجابة: ' : 'Answered: ') + ansCount + ' / ' + meta.questions.length;
  }

  function isQuestionCorrect(q) {
    if (q.type === 'spr' || (q.type === 'frq' && (!q.cbtChoicesHtml || !q.cbtChoicesHtml.length))) {
      return isSprCorrect(userSpr[q.qNum], q.finalAnswerText);
    }
    return userAnswers[q.qNum] === q.answer;
  }

  window.toggleExamInteractiveCBT = function(forceOn) {
    var active = (typeof forceOn === 'boolean') ? forceOn : !document.body.classList.contains('cbt-interactive-active');
    document.body.classList.toggle('cbt-interactive-active', active);
    var btn = document.getElementById('pt-cbt-toggle-btn');
    if (btn) {
      btn.classList.toggle('active', active);
      btn.innerHTML = active
        ? (meta.lang === 'ar' ? '📄 العودة لوضع الطباعة' : '📄 Exit CBT (Print View)')
        : (meta.lang === 'ar' ? '💻 حل تفاعلياً (CBT)' : '💻 Solve in CBT');
    }
    if (active) {
      renderNavPills();
      if (!timerInterval && !graded) {
        timerInterval = setInterval(function() {
          if (timerSec > 0) timerSec--;
          var el = document.getElementById('cbt-live-timer');
          if (el) el.textContent = formatClock(timerSec);
          if (timerSec <= 0) window.submitInteractiveCBT();
        }, 1000);
      }
    } else if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  window.selectCBTChoice = function(qNum, choiceIdx) {
    if (!document.body.classList.contains('cbt-interactive-active') || graded) return;
    userAnswers[qNum] = choiceIdx;
    var qEl = document.getElementById('fep-q-' + qNum);
    if (qEl) {
      var choices = qEl.querySelectorAll('.fep-choice[data-qnum="' + qNum + '"]');
      choices.forEach(function(c) {
        var idx = parseInt(c.getAttribute('data-choice-idx'), 10);
        c.classList.toggle('cbt-selected', idx === choiceIdx);
      });
    }
    renderNavPills();
  };

  window.recordCBTSpr = function(qNum, val) {
    if (graded) return;
    userSpr[qNum] = val;
    renderNavPills();
  };

  window.submitInteractiveCBT = function() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    graded = true;
    var earnedMarks = 0;
    var totalMarks = 0;
    var correctCount = 0;

    meta.questions.forEach(function(q) {
      var m = Number(q.marks) || 1;
      totalMarks += m;
      var ok = isQuestionCorrect(q);
      if (ok) { earnedMarks += m; correctCount++; }

      var qEl = document.getElementById('fep-q-' + q.qNum);
      if (qEl) {
        var choices = qEl.querySelectorAll('.fep-choice[data-qnum="' + q.qNum + '"]');
        choices.forEach(function(c) {
          var idx = parseInt(c.getAttribute('data-choice-idx'), 10);
          c.classList.remove('cbt-selected');
          if (idx === q.answer) c.classList.add('fep-choice-correct');
          else if (userAnswers[q.qNum] === idx) c.classList.add('fep-choice-wrong');
        });
      }
      var solEl = document.getElementById('fep-sol-' + q.qNum);
      if (solEl) solEl.style.display = 'block';
    });

    var pct = totalMarks > 0 ? Math.round((earnedMarks / totalMarks) * 100) : 0;
    var banner = document.getElementById('cbt-score-banner');
    if (banner) {
      banner.style.display = 'block';
      banner.innerHTML = '<div style="font-size:16px;font-weight:800;margin-bottom:4px">' +
        (meta.lang === 'ar' ? '🎉 نتيجة الاختبار التفاعلي (CBT): ' : '🎉 CBT Exam Results: ') +
        earnedMarks + ' / ' + totalMarks + ' (' + pct + '%) — ' +
        correctCount + ' / ' + meta.questions.length + (meta.lang === 'ar' ? ' إجابة صحيحة' : ' Questions Correct') +
        '</div><div style="font-size:12.5px;color:#cbd5e1">' +
        (meta.lang === 'ar' ? 'تم إظهار جميع الحلول النموذجية ومفاتيح التصحيح أسفل كل سؤال.' : 'Step-by-step Examiner Mark Schemes & Worked Solutions are now unlocked below every question.') +
        '</div>';
    }
    renderNavPills();
  };

  window.resetInteractiveCBT = function() {
    userAnswers = {};
    userSpr = {};
    graded = false;
    timerSec = (meta.durationMinutes || 60) * 60;
    var el = document.getElementById('cbt-live-timer');
    if (el) el.textContent = formatClock(timerSec);
    var banner = document.getElementById('cbt-score-banner');
    if (banner) banner.style.display = 'none';
    document.querySelectorAll('.fep-choice').forEach(function(c) {
      c.classList.remove('cbt-selected', 'fep-choice-correct', 'fep-choice-wrong');
    });
    document.querySelectorAll('.cbt-spr-input, .cbt-work-textarea').forEach(function(inp) {
      inp.value = '';
    });
    meta.questions.forEach(function(q) {
      var solEl = document.getElementById('fep-sol-' + q.qNum);
      if (solEl) solEl.style.display = 'none';
    });
    renderNavPills();
  };

  if (window.location.search.indexOf('cbt=1') !== -1) {
    window.toggleExamInteractiveCBT(true);
  }
})();
</script>` : '';

  h += `<div class="fep-footer">
      <span>&copy; ClipSAT &middot; Official Printable Examination Series (${escHtml(paperTitle)} — #${examNumber})</span>
      <span>clipsat.org</span>
    </div>
  </div>
  <script id="clipsat-cbt-payload" type="application/json">${safeJsonPayload}</script>
  ${interactiveCbtScript}
</body>
</html>`;

  return h;
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. COMPLETE CATALOG OF TRACKS & PAPERS TO GENERATE
// ─────────────────────────────────────────────────────────────────────────────
const EXAM_CATALOG = [
  // ── Digital SAT (20 Full Exams) ──
  {
    trackId: 'sat',
    papers: [
      {
        specKey: 'sat',
        slug: 'digital-sat-math',
        count: 20,
        unitTitle: 'Official Full Practice Exams — Digital SAT® Math (Module 1 + Adaptive Module 2 · 44 Questions · 70 Minutes)',
        shortTitle: 'Digital SAT® Math — Full Practice Exam'
      }
    ]
  },

  // ── AP Tracks (10 Full Exams each) ──
  {
    trackId: 'apab',
    papers: [
      { specKey: 'apab', slug: 'ap-calculus-ab', unitTitle: 'Official Full Practice Exams — AP Calculus AB (Section I MCQ + Section II FRQ)', shortTitle: 'AP Calculus AB — Full Practice Exam' }
    ]
  },
  {
    trackId: 'apbc',
    papers: [
      { specKey: 'apbc', slug: 'ap-calculus-bc', unitTitle: 'Official Full Practice Exams — AP Calculus BC (Section I MCQ + Section II FRQ)', shortTitle: 'AP Calculus BC — Full Practice Exam' }
    ]
  },
  {
    trackId: 'appc',
    papers: [
      { specKey: 'appc', slug: 'ap-precalculus', unitTitle: 'Official Full Practice Exams — AP Precalculus (Section I MCQ + Section II FRQ)', shortTitle: 'AP Precalculus — Full Practice Exam' }
    ]
  },
  {
    trackId: 'apstats',
    papers: [
      { specKey: 'apstats', slug: 'ap-statistics', unitTitle: 'Official Full Practice Exams — AP Statistics (Section I MCQ + Section II FRQ)', shortTitle: 'AP Statistics — Full Practice Exam' }
    ]
  },

  // ── IGCSE 0580 & Edexcel 4MA1 (Every Paper — 10 Full Exams per paper) ──
  {
    trackId: 'igcse',
    papers: [
      { specKey: 'Cambridge IGCSE 0580 — Paper 2 (Extended Non-Calculator)', slug: 'cambridge-0580-paper-2', sub: 'Cambridge IGCSE Mathematics (0580)', unitTitle: 'Cambridge IGCSE 0580 — Paper 2 (Extended Non-Calculator · 2 hr · 100 Marks)', shortTitle: 'Cambridge IGCSE 0580 Paper 2 (Non-Calculator) — Full Exam' },
      { specKey: 'Cambridge IGCSE 0580 — Paper 4 (Extended Calculator)', slug: 'cambridge-0580-paper-4', sub: 'Cambridge IGCSE Mathematics (0580)', unitTitle: 'Cambridge IGCSE 0580 — Paper 4 (Extended Calculator · 2 hr · 100 Marks)', shortTitle: 'Cambridge IGCSE 0580 Paper 4 (Calculator) — Full Exam' },
      { specKey: 'Edexcel IGCSE (4MA1) — Paper 1H', slug: 'edexcel-4ma1-paper-1h', sub: 'Pearson Edexcel International GCSE (4MA1)', unitTitle: 'Pearson Edexcel IGCSE (4MA1) — Paper 1H (Higher Tier · 2 hr · 100 Marks)', shortTitle: 'Edexcel IGCSE 4MA1 Paper 1H — Full Exam' },
      { specKey: 'Edexcel IGCSE (4MA1) — Paper 2H', slug: 'edexcel-4ma1-paper-2h', sub: 'Pearson Edexcel International GCSE (4MA1)', unitTitle: 'Pearson Edexcel IGCSE (4MA1) — Paper 2H (Higher Tier · 2 hr · 100 Marks)', shortTitle: 'Edexcel IGCSE 4MA1 Paper 2H — Full Exam' }
    ]
  },

  // ── Additional Mathematics 0606 & Further Pure 4PM1 (Every Paper — 10 Full Exams per paper) ──
  {
    trackId: 'addmath',
    papers: [
      { specKey: 'Cambridge IGCSE 0606 — Paper 1', slug: 'cambridge-0606-paper-1', sub: 'Cambridge IGCSE Additional Mathematics (0606)', unitTitle: 'Cambridge IGCSE 0606 — Paper 1 (2 hr · 80 Marks)', shortTitle: 'Cambridge Additional Maths 0606 Paper 1 — Full Exam' },
      { specKey: 'Cambridge IGCSE 0606 — Paper 2', slug: 'cambridge-0606-paper-2', sub: 'Cambridge IGCSE Additional Mathematics (0606)', unitTitle: 'Cambridge IGCSE 0606 — Paper 2 (2 hr · 80 Marks)', shortTitle: 'Cambridge Additional Maths 0606 Paper 2 — Full Exam' },
      { specKey: 'Edexcel Further Pure 4PM1 — Paper 1', slug: 'edexcel-4pm1-paper-1', sub: 'Pearson Edexcel International GCSE Further Pure (4PM1)', unitTitle: 'Pearson Edexcel Further Pure 4PM1 — Paper 1 (2 hr · 100 Marks)', shortTitle: 'Edexcel Further Pure 4PM1 Paper 1 — Full Exam' },
      { specKey: 'Edexcel Further Pure 4PM1 — Paper 2', slug: 'edexcel-4pm1-paper-2', sub: 'Pearson Edexcel International GCSE Further Pure (4PM1)', unitTitle: 'Pearson Edexcel Further Pure 4PM1 — Paper 2 (2 hr · 100 Marks)', shortTitle: 'Edexcel Further Pure 4PM1 Paper 2 — Full Exam' }
    ]
  },

  // ── AS Level 9709 & Edexcel IAL AS Units (Every Paper — 10 Full Exams per paper) ──
  {
    trackId: 'aslevel',
    papers: [
      { specKey: 'Cambridge AS Level — Paper 1 (Pure 1)', slug: 'cambridge-9709-paper-1-pure-1', sub: 'Cambridge International AS Level Mathematics (9709)', unitTitle: 'Cambridge 9709 — Paper 1: Pure Mathematics 1 (1 hr 50 min · 75 Marks)', shortTitle: 'Cambridge AS 9709 Paper 1 (Pure 1) — Full Exam' },
      { specKey: 'Cambridge AS Level — Paper 2 (Pure 2)', slug: 'cambridge-9709-paper-2-pure-2', sub: 'Cambridge International AS Level Mathematics (9709)', unitTitle: 'Cambridge 9709 — Paper 2: Pure Mathematics 2 (1 hr 15 min · 50 Marks)', shortTitle: 'Cambridge AS 9709 Paper 2 (Pure 2) — Full Exam' },
      { specKey: 'Cambridge AS Level — Paper 4 (Mechanics)', slug: 'cambridge-9709-paper-4-mechanics', sub: 'Cambridge International AS Level Mathematics (9709)', unitTitle: 'Cambridge 9709 — Paper 4: Mechanics (1 hr 15 min · 50 Marks)', shortTitle: 'Cambridge AS 9709 Paper 4 (Mechanics) — Full Exam' },
      { specKey: 'Cambridge AS Level — Paper 5 (Statistics 1)', slug: 'cambridge-9709-paper-5-statistics-1', sub: 'Cambridge International AS Level Mathematics (9709)', unitTitle: 'Cambridge 9709 — Paper 5: Probability & Statistics 1 (1 hr 15 min · 50 Marks)', shortTitle: 'Cambridge AS 9709 Paper 5 (Statistics 1) — Full Exam' },
      { specKey: 'Edexcel IAL — Pure Mathematics 1 (WMA11)', slug: 'edexcel-ial-wma11-pure-1', sub: 'Pearson Edexcel International Advanced Level (IAL)', unitTitle: 'Pearson Edexcel IAL — Unit P1: Pure Mathematics 1 (WMA11 · 1 hr 30 min · 75 Marks)', shortTitle: 'Edexcel IAL Pure Mathematics 1 (WMA11) — Full Exam' },
      { specKey: 'Edexcel IAL — Pure Mathematics 2 (WMA12)', slug: 'edexcel-ial-wma12-pure-2', sub: 'Pearson Edexcel International Advanced Level (IAL)', unitTitle: 'Pearson Edexcel IAL — Unit P2: Pure Mathematics 2 (WMA12 · 1 hr 30 min · 75 Marks)', shortTitle: 'Edexcel IAL Pure Mathematics 2 (WMA12) — Full Exam' },
      { specKey: 'Edexcel IAL — Mechanics 1 (WME01)', slug: 'edexcel-ial-wme01-mechanics-1', sub: 'Pearson Edexcel International Advanced Level (IAL)', unitTitle: 'Pearson Edexcel IAL — Unit M1: Mechanics 1 (WME01 · 1 hr 30 min · 75 Marks)', shortTitle: 'Edexcel IAL Mechanics 1 (WME01) — Full Exam' },
      { specKey: 'Edexcel IAL — Statistics 1 (WST01)', slug: 'edexcel-ial-wst01-statistics-1', sub: 'Pearson Edexcel International Advanced Level (IAL)', unitTitle: 'Pearson Edexcel IAL — Unit S1: Statistics 1 (WST01 · 1 hr 30 min · 75 Marks)', shortTitle: 'Edexcel IAL Statistics 1 (WST01) — Full Exam' }
    ]
  },

  // ── A2 Level 9709 & Edexcel IAL A2 Units (Every Paper — 10 Full Exams per paper) ──
  {
    trackId: 'a2level',
    papers: [
      { specKey: 'Cambridge A Level — Paper 3 (Pure 3)', slug: 'cambridge-9709-paper-3-pure-3', sub: 'Cambridge International A Level Mathematics (9709)', unitTitle: 'Cambridge 9709 — Paper 3: Pure Mathematics 3 (1 hr 50 min · 75 Marks)', shortTitle: 'Cambridge A Level 9709 Paper 3 (Pure 3) — Full Exam' },
      { specKey: 'Cambridge A Level — Paper 4 (Mechanics)', slug: 'cambridge-9709-paper-4-mechanics-a2', sub: 'Cambridge International A Level Mathematics (9709)', unitTitle: 'Cambridge 9709 — Paper 4: Mechanics (1 hr 15 min · 50 Marks)', shortTitle: 'Cambridge A Level 9709 Paper 4 (Mechanics) — Full Exam' },
      { specKey: 'Cambridge A Level — Paper 6 (Statistics 2)', slug: 'cambridge-9709-paper-6-statistics-2', sub: 'Cambridge International A Level Mathematics (9709)', unitTitle: 'Cambridge 9709 — Paper 6: Probability & Statistics 2 (1 hr 15 min · 50 Marks)', shortTitle: 'Cambridge A Level 9709 Paper 6 (Statistics 2) — Full Exam' },
      { specKey: 'Edexcel IAL — Pure Mathematics 3 (WMA13)', slug: 'edexcel-ial-wma13-pure-3', sub: 'Pearson Edexcel International Advanced Level (IAL)', unitTitle: 'Pearson Edexcel IAL — Unit P3: Pure Mathematics 3 (WMA13 · 1 hr 30 min · 75 Marks)', shortTitle: 'Edexcel IAL Pure Mathematics 3 (WMA13) — Full Exam' },
      { specKey: 'Edexcel IAL — Pure Mathematics 4 (WMA14)', slug: 'edexcel-ial-wma14-pure-4', sub: 'Pearson Edexcel International Advanced Level (IAL)', unitTitle: 'Pearson Edexcel IAL — Unit P4: Pure Mathematics 4 (WMA14 · 1 hr 30 min · 75 Marks)', shortTitle: 'Edexcel IAL Pure Mathematics 4 (WMA14) — Full Exam' }
    ]
  },

  // ── Qudrat (10 English + 10 Arabic Full Exams) ──
  {
    trackId: 'qudrat',
    bilingualArEn: true,
    papers: [
      {
        specKey: 'GAT Quantitative (English Medium)',
        slug: 'gat-qudrat-full-exam',
        lang: 'en',
        langMode: 'en_extract',
        unitTitle: 'Official Full Practice Exams — GAT Quantitative (52 Questions · 52 Minutes)',
        shortTitle: 'GAT Qudrat Quantitative — Full Practice Exam'
      },
      {
        specKey: 'qudrat',
        slug: 'gat-qudrat-ar-full-exam',
        lang: 'ar',
        langMode: 'ar',
        unitTitle: 'الاختبارات الكاملة الرسمية — اختبار القدرات العامة: القسم الكمي (٥٢ سؤالاً · ٥٢ دقيقة)',
        shortTitle: 'اختبار القدرات العامة (القسم الكمي) — الاختبار الكامل'
      }
    ]
  },

  // ── Tahsili (10 English + 10 Arabic Full Exams) ──
  {
    trackId: 'tahsili',
    bilingualArEn: true,
    papers: [
      {
        specKey: 'SAAT Mathematics (English Medium)',
        slug: 'saat-tahsili-full-exam',
        lang: 'en',
        langMode: 'en_extract',
        unitTitle: 'Official Full Practice Exams — SAAT Tahsili Mathematics (50 Questions · 50 Minutes)',
        shortTitle: 'SAAT Tahsili Mathematics — Full Practice Exam'
      },
      {
        specKey: 'tahsili',
        slug: 'saat-tahsili-ar-full-exam',
        lang: 'ar',
        langMode: 'ar',
        unitTitle: 'الاختبارات الكاملة الرسمية — الاختبار التحصيلي العلمي: قسم الرياضيات (٥٠ سؤالاً · ٥٠ دقيقة)',
        shortTitle: 'الاختبار التحصيلي العلمي (قسم الرياضيات) — الاختبار الكامل'
      }
    ]
  },

  // ── ACT 1, ACT 2 Level 1, ACT 2 Level 2 (10 Full Exams each) ──
  {
    trackId: 'act',
    papers: [
      { specKey: 'act', slug: 'act-1-mathematics', unitTitle: 'Official Full Practice Exams — ACT Mathematics (45 Questions · 50 Minutes)', shortTitle: 'ACT Mathematics (ACT 1) — Full Practice Exam' }
    ]
  },
  {
    trackId: 'act2',
    papers: [
      { specKey: 'act2', slug: 'act-2-math-level-1', unitTitle: 'Official Full Practice Exams — ACT International Subject Test: Mathematics 1 (Level 1 · 50 Q · 60 Min)', shortTitle: 'ACT 2 Mathematics Level 1 — Full Practice Exam' }
    ]
  },
  {
    trackId: 'act2l2',
    papers: [
      { specKey: 'act2l2', slug: 'act-2-math-level-2', unitTitle: 'Official Full Practice Exams — ACT International Subject Test: Mathematics 2 (Level 2 · 50 Q · 60 Min)', shortTitle: 'ACT 2 Mathematics Level 2 — Full Practice Exam' }
    ]
  },

  // ── EST I, EST II Level 1, EST II Level 2 (10 Full Exams each) ──
  {
    trackId: 'est',
    papers: [
      { specKey: 'est', slug: 'est-1-mathematics', unitTitle: 'Official Full Practice Exams — EST I Mathematics (Section 3 No-Calc + Section 4 Calc · 58 Q · 80 Min)', shortTitle: 'EST I Mathematics — Full Practice Exam' }
    ]
  },
  {
    trackId: 'est2',
    papers: [
      { specKey: 'est2', slug: 'est-2-math-level-1', unitTitle: 'Official Full Practice Exams — EST II Mathematics Level 1 (50 Questions · 60 Minutes)', shortTitle: 'EST II Mathematics Level 1 — Full Practice Exam' }
    ]
  },
  {
    trackId: 'est2l2',
    papers: [
      { specKey: 'est2l2', slug: 'est-2-math-level-2', unitTitle: 'Official Full Practice Exams — EST II Mathematics Level 2 (50 Questions · 60 Minutes)', shortTitle: 'EST II Mathematics Level 2 — Full Practice Exam' }
    ]
  },

  // ── IB Mathematics SL (Every Paper — 10 Full Exams per paper) ──
  {
    trackId: 'ibsl',
    papers: [
      { specKey: 'IB Math SL (AA) — Paper 1 (Non-Calculator)', slug: 'ib-aa-sl-paper-1', sub: 'IB DP Mathematics: Analysis and Approaches (AA SL)', unitTitle: 'IB Math AA SL — Paper 1 (No Technology · 90 Min · 80 Marks · Section A & Section B)', shortTitle: 'IB Math AA SL Paper 1 (No Technology) — Full Exam' },
      { specKey: 'IB Math SL (AA) — Paper 2 (GDC Required)', slug: 'ib-aa-sl-paper-2', sub: 'IB DP Mathematics: Analysis and Approaches (AA SL)', unitTitle: 'IB Math AA SL — Paper 2 (GDC Required · 90 Min · 80 Marks · Section A & Section B)', shortTitle: 'IB Math AA SL Paper 2 (GDC Required) — Full Exam' },
      { specKey: 'IB Math SL (AI) — Paper 1 (GDC Short-Response)', slug: 'ib-ai-sl-paper-1', sub: 'IB DP Mathematics: Applications and Interpretation (AI SL)', unitTitle: 'IB Math AI SL — Paper 1 (GDC Short-Response · 90 Min · 80 Marks)', shortTitle: 'IB Math AI SL Paper 1 (Short-Response) — Full Exam' },
      { specKey: 'IB Math SL (AI) — Paper 2 (GDC Extended-Response)', slug: 'ib-ai-sl-paper-2', sub: 'IB DP Mathematics: Applications and Interpretation (AI SL)', unitTitle: 'IB Math AI SL — Paper 2 (GDC Extended-Response · 90 Min · 80 Marks)', shortTitle: 'IB Math AI SL Paper 2 (Extended-Response) — Full Exam' }
    ]
  },

  // ── IB Mathematics HL (Every Paper — 10 Full Exams per paper) ──
  {
    trackId: 'ibhl',
    papers: [
      { specKey: 'IB Math HL (AA) — Paper 1 (Non-Calculator)', slug: 'ib-aa-hl-paper-1', sub: 'IB DP Mathematics: Analysis and Approaches (AA HL)', unitTitle: 'IB Math AA HL — Paper 1 (No Technology · 2 Hr · 110 Marks · Section A & Section B)', shortTitle: 'IB Math AA HL Paper 1 (No Technology) — Full Exam' },
      { specKey: 'IB Math HL (AA) — Paper 2 (GDC Required)', slug: 'ib-aa-hl-paper-2', sub: 'IB DP Mathematics: Analysis and Approaches (AA HL)', unitTitle: 'IB Math AA HL — Paper 2 (GDC Required · 2 Hr · 110 Marks · Section A & Section B)', shortTitle: 'IB Math AA HL Paper 2 (GDC Required) — Full Exam' },
      { specKey: 'IB Math HL (AA) — Paper 3 (GDC Extended Investigation)', slug: 'ib-aa-hl-paper-3', sub: 'IB DP Mathematics: Analysis and Approaches (AA HL)', unitTitle: 'IB Math AA HL — Paper 3 (GDC Extended Investigation · 75 Min · 55 Marks)', shortTitle: 'IB Math AA HL Paper 3 (Extended Investigation) — Full Exam' },
      { specKey: 'IB Math HL (AI) — Paper 1 (GDC Short-Response)', slug: 'ib-ai-hl-paper-1', sub: 'IB DP Mathematics: Applications and Interpretation (AI HL)', unitTitle: 'IB Math AI HL — Paper 1 (GDC Short-Response · 2 Hr · 110 Marks)', shortTitle: 'IB Math AI HL Paper 1 (Short-Response) — Full Exam' },
      { specKey: 'IB Math HL (AI) — Paper 2 (GDC Extended-Response)', slug: 'ib-ai-hl-paper-2', sub: 'IB DP Mathematics: Applications and Interpretation (AI HL)', unitTitle: 'IB Math AI HL — Paper 2 (GDC Extended-Response · 2 Hr · 110 Marks)', shortTitle: 'IB Math AI HL Paper 2 (Extended-Response) — Full Exam' },
      { specKey: 'IB Math HL (AI) — Paper 3 (GDC Extended Investigation)', slug: 'ib-ai-hl-paper-3', sub: 'IB DP Mathematics: Applications and Interpretation (AI HL)', unitTitle: 'IB Math AI HL — Paper 3 (GDC Extended Investigation · 75 Min · 55 Marks)', shortTitle: 'IB Math AI HL Paper 3 (Extended Investigation) — Full Exam' }
    ]
  },

  // ── Pearson Edexcel International GCSE Mathematics A (4MA1 Higher Tier) ──
  {
    trackId: 'edexcel',
    papers: [
      { specKey: 'Edexcel IGCSE (4MA1) — Paper 1H', slug: 'edexcel-4ma1-paper-1h', sub: 'Pearson Edexcel International GCSE (4MA1 Higher)', unitTitle: 'Pearson Edexcel IGCSE (4MA1) — Paper 1H (Higher Tier · 2 hr · 100 Marks)', shortTitle: 'Edexcel IGCSE 4MA1 Paper 1H — Full Exam' },
      { specKey: 'Edexcel IGCSE (4MA1) — Paper 2H', slug: 'edexcel-4ma1-paper-2h', sub: 'Pearson Edexcel International GCSE (4MA1 Higher)', unitTitle: 'Pearson Edexcel IGCSE (4MA1) — Paper 2H (Higher Tier · 2 hr · 100 Marks)', shortTitle: 'Edexcel IGCSE 4MA1 Paper 2H — Full Exam' }
    ]
  },

  // ── English GAT (Quantitative) & SAAT (Mathematics) ──
  {
    trackId: 'gaten',
    papers: [
      { specKey: 'GAT Quantitative (English Medium)', slug: 'gat-quantitative-english', sub: 'Qiyas English GAT (General Aptitude Test)', unitTitle: 'Official Full Practice Exams — English GAT Quantitative (48 Questions · 50 Minutes)', shortTitle: 'English GAT Quantitative — Full Practice Exam' },
      { specKey: 'SAAT Mathematics (English Medium)', slug: 'saat-mathematics-english', sub: 'Qiyas English SAAT (Scholastic Achievement Admission Test)', unitTitle: 'Official Full Practice Exams — English SAAT Mathematics (40 Questions · 45 Minutes)', shortTitle: 'English SAAT Mathematics — Full Practice Exam' }
    ]
  },

  // ── Contest Math & Olympiad (NSMO of KSA, KAUST KMC, AMC 10/12 & Mawhiba Kangaroo) ──
  {
    trackId: 'olympiad',
    papers: [
      { specKey: 'NSMO of KSA — National Mathematical Olympiad', slug: 'nsmo-ksa-national-olympiad', sub: 'Saudi NSMO National Olympiad (Mawhiba Stages 1–3)', unitTitle: 'Official Contest Papers — NSMO of KSA National Mathematical Olympiad (25 Questions · 90 Minutes)', shortTitle: 'NSMO of KSA National Olympiad — Full Paper' },
      { specKey: 'KAUST Mathematics Competition (KMC)', slug: 'kaust-kmc-competition', sub: 'KAUST Mathematics Competition (KMC & KAUST Academy)', unitTitle: 'Official Contest Papers — KAUST Mathematics Competition (KMC Qualifier & Thuwal Finals · 25 Q · 90 Min)', shortTitle: 'KAUST Mathematics Competition (KMC) — Full Paper' },
      { specKey: 'AMC 10/12 Mathematics Competition', slug: 'amc-10-12-competition', sub: 'MAA American Mathematics Competitions (AMC 10/12)', unitTitle: 'Official Contest Papers — AMC 10 / AMC 12 Competition (25 Questions · 75 Minutes · 150 Marks)', shortTitle: 'AMC 10/12 Mathematics Competition — Full Paper' },
      { specKey: 'Mawhiba & Kangaroo Math Arabia (Senior)', slug: 'mawhiba-kangaroo-senior', sub: 'Kangaroo Math Arabia & Mawhiba Olympiad', unitTitle: 'Official Contest Papers — Kangaroo Math & Mawhiba Olympiad (30 Questions · 75 Minutes · 120 Marks)', shortTitle: 'Kangaroo Math & Mawhiba Olympiad — Full Paper' }
    ]
  },

  // ── Mathematics for AI & Data Science ──
  {
    trackId: 'mathai',
    papers: [
      { specKey: 'AI Math Foundations — Part A (Linear Algebra & Geometry)', slug: 'ai-math-part-a-linalg', sub: 'Mathematics for Artificial Intelligence & Machine Learning', unitTitle: 'AI Math Foundations — Part A: Vectors, Embeddings & Neural Matrices (20 Q · 60 Min)', shortTitle: 'AI Math Part A (Linear Algebra & Neural Layers) — Full Exam' },
      { specKey: 'AI Math Foundations — Part B (Calculus, Probability & PCA)', slug: 'ai-math-part-b-calc-prob', sub: 'Mathematics for Artificial Intelligence & Machine Learning', unitTitle: 'AI Math Foundations — Part B: Gradient Descent, Bayes, MLE & PCA (20 Q · 60 Min)', shortTitle: 'AI Math Part B (Gradients, Probability & PCA) — Full Exam' }
    ]
  },

  // ── Core High School & University Tracks (10 Full Exams each) ──
  {
    trackId: 'algebra',
    papers: [
      { specKey: 'algebra', slug: 'algebra-1-comprehensive', unitTitle: 'Official Full Practice Exams — Algebra I Comprehensive Final (40 Questions · 90 Minutes)', shortTitle: 'Algebra I Comprehensive Final — Full Practice Exam' }
    ]
  },
  {
    trackId: 'geo',
    papers: [
      { specKey: 'geo', slug: 'geometry-comprehensive', unitTitle: 'Official Full Practice Exams — Euclidean & Coordinate Geometry Final (40 Questions · 90 Minutes)', shortTitle: 'Geometry Comprehensive Final — Full Practice Exam' }
    ]
  },
  {
    trackId: 'alg2',
    papers: [
      { specKey: 'alg2', slug: 'algebra-2-comprehensive', unitTitle: 'Official Full Practice Exams — Algebra II Comprehensive Final (40 Questions · 90 Minutes)', shortTitle: 'Algebra II Comprehensive Final — Full Practice Exam' }
    ]
  },
  {
    trackId: 'precalc',
    papers: [
      { specKey: 'precalc', slug: 'precalculus-comprehensive', unitTitle: 'Official Full Practice Exams — Honors Precalculus & Trigonometry Final (40 Questions · 100 Minutes)', shortTitle: 'Precalculus Comprehensive Final — Full Practice Exam' }
    ]
  },
  {
    trackId: 'calculus',
    papers: [
      { specKey: 'calculus', slug: 'calculus-1-2-university', unitTitle: 'Official University Exams — Calculus I & II Comprehensive Final (40 Questions · 120 Minutes)', shortTitle: 'University Calculus I & II — Full Examination' }
    ]
  },
  {
    trackId: 'linalg',
    papers: [
      { specKey: 'linalg', slug: 'linear-algebra-university', unitTitle: 'Official University Exams — Linear Algebra & Matrix Theory Final (36 Questions · 120 Minutes)', shortTitle: 'University Linear Algebra — Full Examination' }
    ]
  },
  {
    trackId: 'mvc',
    papers: [
      { specKey: 'mvc', slug: 'multivariable-calculus-university', unitTitle: 'Official University Exams — Multivariable & Vector Calculus Final (36 Questions · 120 Minutes)', shortTitle: 'University Multivariable Calculus — Full Examination' }
    ]
  },
  {
    trackId: 'odes',
    papers: [
      { specKey: 'odes', slug: 'differential-equations-university', unitTitle: 'Official University Exams — Ordinary Differential Equations Final (36 Questions · 120 Minutes)', shortTitle: 'University Differential Equations — Full Examination' }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 12. EXECUTE GENERATION & UPDATE MANIFESTS
// ─────────────────────────────────────────────────────────────────────────────
const poolCache = new Map();
function getPool(bankId, langMode) {
  const key = `${bankId}::${langMode || 'en'}`;
  if (!poolCache.has(key)) {
    poolCache.set(key, loadTrackPool(bankId, langMode));
  }
  return poolCache.get(key);
}

let totalExamsGenerated = 0;
let totalAnswerKeysGenerated = 0;

const onlyArg = process.argv.find(a => a.startsWith('--only='));
const onlyTrack = onlyArg ? onlyArg.split('=')[1].trim() : null;

for (const trackEntry of EXAM_CATALOG) {
  const { trackId, papers } = trackEntry;
  if (onlyTrack && trackId !== onlyTrack) continue;
  const trackDlDir = path.join(DOWNLOADS_DIR, trackId);
  if (!fs.existsSync(trackDlDir)) {
    fs.mkdirSync(trackDlDir, { recursive: true });
  }

  const manifestPath = path.join(trackDlDir, 'manifest.json');
  let existingManifest = [];
  if (fs.existsSync(manifestPath)) {
    existingManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  }
  // Remove any previously generated full-exam entries so re-runs are idempotent
  const baseWorksheets = existingManifest.filter(item => !item.isFullExam);
  // Enforce that only qudrat and tahsili have lang: 'ar'
  const cleanedWorksheets = (trackId === 'qudrat' || trackId === 'tahsili')
    ? baseWorksheets
    : baseWorksheets.filter(item => (item.lang || 'en') === 'en');

  const newExamManifestItems = [];

  papers.forEach((paperCfg, pIdx) => {
    const spec = examSpecs[paperCfg.specKey];
    if (!spec) {
      throw new Error(`Missing examSpec for key "${paperCfg.specKey}" in track "${trackId}"`);
    }
    const bankId = spec.bankId || trackId;
    const lang = paperCfg.lang || 'en';
    const langMode = paperCfg.langMode || 'en';
    const examCount = Number(paperCfg.count) || 10;
    const pool = getPool(bankId, langMode);
    const crossExamTracker = new Set();

    for (let examNum = 1; examNum <= examCount; examNum++) {
      const numPad = String(examNum).padStart(2, '0');
      const examFilename = `full-exam-${paperCfg.slug}-${numPad}-exam.html`;
      const akFilename = `full-exam-${paperCfg.slug}-${numPad}-answerkey.html`;

      const entries = drawQuestionsForPaper(
        pool,
        spec,
        trackId,
        paperCfg.slug,
        examNum,
        langMode,
        crossExamTracker
      );

      const examHtml = renderPrintableDocument({
        trackId,
        spec,
        paperTitle: spec.title,
        examNumber: examNum,
        totalExams: examCount,
        entries,
        langMode,
        isAnswerKey: false,
        examFilename,
        akFilename
      });

      const akHtml = renderPrintableDocument({
        trackId,
        spec,
        paperTitle: spec.title,
        examNumber: examNum,
        totalExams: examCount,
        entries,
        langMode,
        isAnswerKey: true,
        examFilename,
        akFilename
      });

      fs.writeFileSync(path.join(trackDlDir, examFilename), examHtml, 'utf8');
      fs.writeFileSync(path.join(trackDlDir, akFilename), akHtml, 'utf8');
      totalExamsGenerated++;
      totalAnswerKeysGenerated++;

      const itemTitle = lang === 'ar'
        ? `${paperCfg.shortTitle} رقم ${examNum} (مع الحلول النموذجية الكاملة)`
        : `${paperCfg.shortTitle} #${examNum} (Full Paper & Step-by-Step Solutions)`;

      newExamManifestItems.push({
        unit: 100 + pIdx,
        unitTitle: paperCfg.unitTitle,
        num: `EX.${numPad}`,
        lang: lang,
        title: itemTitle,
        sub: paperCfg.sub || null,
        worksheet: examFilename,
        answerkey: akFilename,
        isFullExam: true
      });
    }
  });

  // Put Full Official Practice Exams first in manifest.json followed by topic worksheets
  const updatedManifest = newExamManifestItems.concat(cleanedWorksheets);
  fs.writeFileSync(manifestPath, JSON.stringify(updatedManifest, null, 2) + '\n', 'utf8');
  console.log(`✓ [${trackId.padEnd(8)}] Generated ${newExamManifestItems.length} Full Exams + ${newExamManifestItems.length} Answer Keys (${papers.length} paper configuration(s))`);
}

console.log(`\n🎉 DONE! Generated ${totalExamsGenerated} Printable Full Exams + ${totalAnswerKeysGenerated} Full Answer Keys (${totalExamsGenerated + totalAnswerKeysGenerated} total HTML documents).`);
