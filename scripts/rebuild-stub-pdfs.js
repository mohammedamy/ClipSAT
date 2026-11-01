#!/usr/bin/env node
'use strict';

/**
 * scripts/rebuild-stub-pdfs.js — Wave 1 (WP-19 Part B)
 *
 * Regenerates all < 35 KB stub PDFs under public/downloads/<track>/*.pdf
 * from their canonical tools/worksheet_gen/topics/<track>/<num>-<slug>.json
 * sources using server-side KaTeX + SVG figure rendering + Playwright Chromium.
 */

const fs = require('fs');
const http = require('http');
const path = require('path');
const vm = require('vm');
const katex = require('katex');

let chromium;
try {
  ({ chromium } = require('@playwright/test'));
} catch (_e) {
  ({ chromium } = require('playwright'));
}

const ROOT = path.resolve(__dirname, '..');
const DL_ROOT = path.join(ROOT, 'public', 'downloads');
const TP_ROOT = path.join(ROOT, 'tools', 'worksheet_gen', 'topics');
const PUBLIC_ROOT = path.join(ROOT, 'public');

const origWarn = console.warn;
console.warn = (...args) => {
  if (String(args[0] || '').includes('No character metrics')) return;
  origWarn(...args);
};

// Load 02c-figures.js into a lightweight VM context for server-side SVG rendering
const figVmCtx = {
  window: {},
  console,
  Math,
  Number,
  String,
  Array,
  Object,
  RegExp,
  JSON,
  isNaN,
  isFinite,
  parseFloat,
  parseInt
};
figVmCtx.self = figVmCtx.window;
figVmCtx.globalThis = figVmCtx.window;
vm.runInNewContext(
  fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02c-figures.js'), 'utf8'),
  figVmCtx
);

function resolveCssVars(svg) {
  if (!svg) return '';
  return String(svg)
    .replace(/var\(--fig-indigo,\s*var\(--indigo,\s*#1E3A6E\)\)/g, '#1E3A6E')
    .replace(/var\(--fig-indigo-2,\s*var\(--indigo-2,\s*#2B5BA8\)\)/g, '#2B5BA8')
    .replace(/var\(--fig-indigo-soft,\s*var\(--indigo-soft,\s*rgba\(30,58,110,0\.08\)\)\)/g, 'rgba(30,58,110,0.08)')
    .replace(/var\(--fig-indigo-fill2,\s*rgba\(43,91,168,0\.16\)\)/g, 'rgba(43,91,168,0.16)')
    .replace(/var\(--fig-amber,\s*var\(--amber-2,\s*#C8902A\)\)/g, '#C8902A')
    .replace(/var\(--fig-amber-text,\s*var\(--amber-text,\s*#8A6017\)\)/g, '#8A6017')
    .replace(/var\(--fig-amber-soft,\s*var\(--amber-soft,\s*rgba\(200,144,42,0\.16\)\)\)/g, 'rgba(200,144,42,0.16)')
    .replace(/var\(--fig-teal,\s*var\(--teal,\s*#0e9f8f\)\)/g, '#0e9f8f')
    .replace(/var\(--fig-ink,\s*var\(--ink,\s*#0E1726\)\)/g, '#0E1726')
    .replace(/var\(--fig-muted,\s*var\(--muted,\s*#5a6577\)\)/g, '#5a6577')
    .replace(/var\(--fig-grid,\s*var\(--grid,\s*#c9d4e8\)\)/g, '#c9d4e8')
    .replace(/var\(--fig-border,\s*var\(--line,\s*#dde4f0\)\)/g, '#dde4f0')
    .replace(/var\(--fig-bg,\s*var\(--paper,\s*#fbfcfe\)\)/g, '#fbfcfe')
    .replace(/var\(--fig-purple,\s*#8B5CF6\)/g, '#8B5CF6')
    .replace(/var\(--fig-rose,\s*#DB5C6B\)/g, '#DB5C6B');
}

function renderFigureHtml(fig) {
  if (!fig) return '';
  try {
    const raw = figVmCtx.window._renderFig ? figVmCtx.window._renderFig(fig) : '';
    if (!raw || typeof raw !== 'string') return '';
    return `<div class="q-fig">${resolveCssVars(raw)}</div>`;
  } catch (_e) {
    return '';
  }
}

function escHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Render text containing \(...\), \[...\], $$...$$, simple HTML (<br>, <strong>, <em>), and **bold**
function renderRichMath(raw) {
  if (raw == null) return '';
  const str = String(raw);
  const mathPlaceholders = [];

  // Stash math spans before HTML escaping prose
  let i = 0;
  const n = str.length;
  let proseWithTokens = '';

  while (i < n) {
    if (str[i] === '\\' && i + 1 < n) {
      const nx = str[i + 1];
      if (nx === '\\') {
        // Explicit LaTeX line break in prose
        proseWithTokens += '\n';
        i += 2;
        continue;
      }
      if (nx === '$') {
        proseWithTokens += '$';
        i += 2;
        continue;
      }
      if (nx === '(' || nx === '[') {
        const display = nx === '[';
        const closeCh = display ? ']' : ')';
        let j = i + 2;
        let found = -1;
        while (j < n - 1) {
          if (str[j] === '\\') {
            if (str[j + 1] === '\\') {
              j += 2;
              continue;
            }
            if (str[j + 1] === closeCh) {
              found = j;
              break;
            }
          }
          j++;
        }
        if (found !== -1) {
          const tex = str.slice(i + 2, found);
          const html = katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: 'ignore' });
          mathPlaceholders.push(html);
          proseWithTokens += `\uE000${mathPlaceholders.length - 1}\uE001`;
          i = found + 2;
          continue;
        }
      }
    }
    if (str[i] === '$' && str[i + 1] === '$') {
      let j = i + 2;
      let found = -1;
      while (j <= n - 2) {
        if (str[j] === '\\') {
          j += 2;
          continue;
        }
        if (str[j] === '$' && str[j + 1] === '$') {
          found = j;
          break;
        }
        j++;
      }
      if (found !== -1) {
        const tex = str.slice(i + 2, found);
        const html = katex.renderToString(tex, { displayMode: true, throwOnError: false, strict: 'ignore' });
        mathPlaceholders.push(html);
        proseWithTokens += `\uE000${mathPlaceholders.length - 1}\uE001`;
        i = found + 2;
        continue;
      }
    }
    proseWithTokens += str[i];
    i++;
  }

  // Convert safe inline HTML tags to temporary tokens before escaping
  let safe = proseWithTokens
    .replace(/<br\s*\/?>/gi, '\uE010')
    .replace(/<strong>([\s\S]*?)<\/strong>/gi, '\uE011$1\uE012')
    .replace(/<b>([\s\S]*?)<\/b>/gi, '\uE011$1\uE012')
    .replace(/<em>([\s\S]*?)<\/em>/gi, '\uE013$1\uE014')
    .replace(/<\/?(?:p|div|span)[^>]*>/gi, ' ');

  safe = escHtml(safe)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\uE010/g, '<br>')
    .replace(/\uE011/g, '<strong>')
    .replace(/\uE012/g, '</strong>')
    .replace(/\uE013/g, '<em>')
    .replace(/\uE014/g, '</em>')
    .replace(/\n+/g, '<br>');

  return safe.replace(/\uE000(\d+)\uE001/g, (_, idx) => mathPlaceholders[Number(idx)]);
}

const TRACK_LABELS = {
  sat: 'Digital SAT Math',
  act: 'ACT Math',
  act2: 'ACT Subject Test — Math 1',
  act2l2: 'ACT Subject Test — Math 2',
  est: 'EST I — Literacy & Math',
  est2: 'EST II — Math Level 1',
  est2l2: 'EST II — Math Level 2',
  apab: 'AP Calculus AB',
  apbc: 'AP Calculus BC',
  appc: 'AP Precalculus',
  apstats: 'AP Statistics',
  ibsl: 'IB Mathematics SL',
  ibhl: 'IB Mathematics HL',
  mathai: 'IB Math: Applications & Interpretation',
  igcse: 'Cambridge IGCSE Mathematics (0580)',
  addmath: 'Cambridge Additional Mathematics (0606)',
  edexcel: 'Edexcel International GCSE Math (4MA1)',
  aslevel: 'Cambridge AS Level Mathematics (9709)',
  a2level: 'Cambridge A2 Level Mathematics (9709)',
  qudrat: 'Qudrat Quantitative Aptitude',
  tahsili: 'Tahsili Mathematics',
  gaten: 'SAAT / GAT Quantitative (English)',
  kaust: 'KAUST Gifted / Fellowship Prep',
  olympiad: 'Mathematical Olympiad',
  algebra: 'Algebra I & Foundations',
  geo: 'Euclidean & Analytic Geometry',
  alg2: 'Algebra II & Functions',
  precalc: 'Precalculus & Trigonometry',
  calculus: 'University Calculus I–II',
  linalg: 'Linear Algebra',
  mvc: 'Multivariable Calculus',
  odes: 'Ordinary Differential Equations'
};

function extractShortAns(q, letters) {
  if (Array.isArray(q.choices) && q.choices.length > 0 && typeof q.correct === 'number') {
    return letters[q.correct] || 'A';
  }
  const raw = String(q.answer || '');
  const m = raw.match(/^\*\*Answer:\*\*\s*([^.\n]+)/i);
  if (m) return renderRichMath(m[1].trim());
  if (raw.length <= 36) return renderRichMath(raw);
  return 'See Solution';
}

function buildWorksheetHtml(ws, kind, baseUrl) {
  const isKey = kind === 'answerkey';
  const isRtl = ws.lang === 'ar';
  const letters = isRtl ? ['أ', 'ب', 'ج', 'د', 'هـ'] : ['A', 'B', 'C', 'D', 'E'];
  const trackLabel = TRACK_LABELS[ws.track] || String(ws.track || '').toUpperCase();
  const allQuestions = [];
  for (const sec of ws.sections || []) {
    for (const q of sec.questions || []) allQuestions.push({ secHeading: sec.heading || '', q });
  }
  const totalQ = allQuestions.length;

  let summaryGridHtml = '';
  if (isKey) {
    const cells = allQuestions
      .map((item, idx) => {
        const shortA = extractShortAns(item.q, letters);
        return `<div class="ak-cell"><span class="ak-qnum">Q${idx + 1}</span><span class="ak-val">${shortA}</span></div>`;
      })
      .join('');
    summaryGridHtml = `
      <div class="ak-summary-card">
        <div class="ak-summary-title">Quick-Reference Answer Summary (${totalQ} Items)</div>
        <div class="ak-grid">${cells}</div>
      </div>
    `;
  }

  let sectionsHtml = '';
  let qCounter = 0;
  for (const sec of ws.sections || []) {
    const qs = sec.questions || [];
    if (!qs.length) continue;
    let itemsHtml = '';
    for (const q of qs) {
      qCounter++;
      const isMcq = Array.isArray(q.choices) && q.choices.length > 0 && typeof q.correct === 'number';
      const qTypeBadge = q.qtype || (isMcq ? 'MCQ' : 'SPR / Free Response');
      const diffBadge = q.difficulty ? `<span class="q-diff">${escHtml(q.difficulty)}</span>` : '';
      const targetBadge = q.target ? `<span class="q-target">${renderRichMath(q.target)}</span>` : '';
      const stemHtml = renderRichMath(q.q || q.text || '');
      const figHtml = renderFigureHtml(q.figure);

      let partsHtml = '';
      if (Array.isArray(q.parts) && q.parts.length > 0) {
        const partItems = q.parts
          .map((p, pi) => `<div class="q-part"><span class="part-lbl">(${String.fromCharCode(97 + pi)})</span> <span>${renderRichMath(p)}</span></div>`)
          .join('');
        partsHtml = `<div class="q-parts">${partItems}</div>`;
      }

      let choicesHtml = '';
      if (isMcq) {
        const choiceItems = q.choices
          .map((c, ci) => {
            const isRight = isKey && ci === q.correct;
            return `<div class="q-choice${isRight ? ' is-correct' : ''}">
              <span class="c-badge">${letters[ci] || String.fromCharCode(65 + ci)}</span>
              <span class="c-body">${renderRichMath(c)}</span>
              ${isRight ? '<span class="c-check">✓</span>' : ''}
            </div>`;
          })
          .join('');
        choicesHtml = `<div class="q-choices">${choiceItems}</div>`;
      }

      let workOrSolHtml = '';
      if (isKey) {
        let solRaw = q.explanation || q.answer || '';
        if (!solRaw && Array.isArray(q.answers) && q.answers.length > 0) {
          solRaw = q.answers.map((a, ai) => `(${String.fromCharCode(97 + ai)}) ${a}`).join('\n');
        }
        workOrSolHtml = `
          <div class="sol-box">
            <div class="sol-hdr">Worked Solution &amp; Verification</div>
            <div class="sol-body">${renderRichMath(solRaw)}</div>
          </div>
        `;
      } else if (!isMcq) {
        workOrSolHtml = `
          <div class="work-space">
            <div class="work-line"></div>
            <div class="work-line"></div>
            <div class="work-ans-box">Answer: ______________________</div>
          </div>
        `;
      } else {
        workOrSolHtml = `<div class="work-space-compact"></div>`;
      }

      itemsHtml += `
        <article class="q-card">
          <div class="q-top">
            <span class="q-num">${qCounter}</span>
            <span class="q-type">${escHtml(qTypeBadge)}</span>
            ${diffBadge}
            ${targetBadge}
          </div>
          <div class="q-stem">${stemHtml}</div>
          ${figHtml}
          ${partsHtml}
          ${choicesHtml}
          ${workOrSolHtml}
        </article>
      `;
    }

    sectionsHtml += `
      <section class="ws-sec">
        ${sec.heading ? `<h2 class="sec-heading">${renderRichMath(sec.heading)}</h2>` : ''}
        ${itemsHtml}
      </section>
    `;
  }

  return `<!DOCTYPE html>
<html lang="${isRtl ? 'ar' : 'en'}" dir="${isRtl ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <title>${escHtml(ws.title || 'ClipSAT Worksheet')}</title>
  <link rel="stylesheet" href="${baseUrl}/vendor/fonts/fonts.css">
  <link rel="stylesheet" href="${baseUrl}/vendor/katex/katex.min.css">
  <style>
    @page { size: A4; margin: 15mm 14mm 16mm 14mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', 'Cairo', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 9.8pt;
      line-height: 1.48;
      color: #0E1726;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .ws-header {
      border: 1.5px solid #1E3A6E;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    .ws-banner {
      background: linear-gradient(135deg, #1E3A6E 0%, #2B5BA8 100%);
      color: #ffffff;
      padding: 10px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .ws-brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .ws-mark {
      width: 30px;
      height: 30px;
      border-radius: 6px;
      background: #C8902A;
      color: #ffffff;
      font-weight: 800;
      font-size: 14pt;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .ws-track {
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #FDE68A;
      font-weight: 700;
    }
    .ws-title {
      font-size: 13pt;
      font-weight: 800;
      margin: 1px 0 0 0;
      line-height: 1.22;
    }
    .ws-doc-badge {
      background: ${isKey ? '#0e9f8f' : '#C8902A'};
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 8pt;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      white-space: nowrap;
    }
    .ws-meta {
      background: #F8FAFC;
      padding: 7px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 8.5pt;
      color: #334155;
      border-top: 1px solid #dde4f0;
      flex-wrap: wrap;
      gap: 8px;
    }
    .ak-summary-card {
      border: 1px solid #cbd5e1;
      background: #f8fafc;
      border-radius: 7px;
      padding: 9px 12px;
      margin-bottom: 12px;
      break-inside: avoid;
    }
    .ak-summary-title {
      font-size: 8.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #1E3A6E;
      margin-bottom: 6px;
    }
    .ak-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 4px 8px;
    }
    .ak-cell {
      display: flex;
      align-items: baseline;
      gap: 5px;
      font-size: 8.2pt;
      padding: 2px 5px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
    }
    .ak-qnum {
      font-weight: 800;
      color: #1E3A6E;
      flex-shrink: 0;
    }
    .ak-val {
      color: #0f766e;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sec-heading {
      font-size: 10.5pt;
      font-weight: 800;
      color: #1E3A6E;
      margin: 12px 0 8px 0;
      padding: 4px 10px;
      background: #EFF6FF;
      border-left: 4px solid #1E3A6E;
      border-radius: 0 5px 5px 0;
      break-after: avoid;
    }
    [dir="rtl"] .sec-heading {
      border-left: none;
      border-right: 4px solid #1E3A6E;
      border-radius: 5px 0 0 5px;
    }
    .q-card {
      border: 1px solid #dde4f0;
      border-radius: 7px;
      padding: 9px 11px;
      margin-bottom: 9px;
      background: #ffffff;
      break-inside: avoid;
    }
    .q-top {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-bottom: 5px;
      flex-wrap: wrap;
    }
    .q-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 22px;
      height: 22px;
      padding: 0 6px;
      border-radius: 5px;
      background: #1E3A6E;
      color: #ffffff;
      font-weight: 800;
      font-size: 8.5pt;
    }
    .q-type {
      font-size: 7.5pt;
      font-weight: 700;
      text-transform: uppercase;
      color: #2B5BA8;
      background: #EFF6FF;
      padding: 1px 6px;
      border-radius: 4px;
    }
    .q-diff {
      font-size: 7.5pt;
      font-weight: 700;
      color: #8A6017;
      background: #FEF3C7;
      padding: 1px 6px;
      border-radius: 4px;
    }
    .q-target {
      font-size: 7.5pt;
      color: #5a6577;
    }
    .q-stem {
      margin: 4px 0 6px 0;
      color: #0E1726;
    }
    .q-fig {
      margin: 6px auto;
      text-align: center;
      max-width: 280px;
    }
    .q-fig svg {
      max-width: 100%;
      max-height: 165px;
      height: auto;
    }
    .q-parts {
      margin: 5px 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4px 12px;
    }
    .q-part {
      font-size: 9.2pt;
    }
    .part-lbl {
      font-weight: 700;
      color: #1E3A6E;
    }
    .q-choices {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 5px 10px;
      margin-top: 6px;
    }
    .q-choice {
      display: flex;
      align-items: baseline;
      gap: 7px;
      padding: 4px 8px;
      border: 1px solid #e2e8f0;
      border-radius: 5px;
      background: #fbfcfe;
      font-size: 9.2pt;
    }
    .q-choice.is-correct {
      border-color: #0e9f8f;
      background: #ecfdf5;
      font-weight: 600;
    }
    .c-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 999px;
      background: #e2e8f0;
      color: #1E3A6E;
      font-size: 7.8pt;
      font-weight: 800;
      flex-shrink: 0;
    }
    .q-choice.is-correct .c-badge {
      background: #0e9f8f;
      color: #ffffff;
    }
    .c-check {
      margin-left: auto;
      color: #0e9f8f;
      font-weight: 800;
    }
    .work-space {
      margin-top: 7px;
      padding-top: 4px;
    }
    .work-line {
      height: 16px;
      border-bottom: 1px dashed #cbd5e1;
    }
    .work-ans-box {
      margin-top: 5px;
      font-size: 8.2pt;
      font-weight: 700;
      color: #475569;
      text-align: right;
    }
    .work-space-compact {
      height: 4px;
    }
    .sol-box {
      margin-top: 7px;
      padding: 6px 9px;
      background: #f0fdfa;
      border-left: 3px solid #0e9f8f;
      border-radius: 0 5px 5px 0;
      font-size: 8.9pt;
      color: #1e293b;
    }
    [dir="rtl"] .sol-box {
      border-left: none;
      border-right: 3px solid #0e9f8f;
      border-radius: 5px 0 0 5px;
    }
    .sol-hdr {
      font-size: 7.5pt;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f766e;
      margin-bottom: 2px;
    }
    .katex-display {
      margin: 0.45em 0 !important;
    }
  </style>
</head>
<body>
  <header class="ws-header">
    <div class="ws-banner">
      <div class="ws-brand">
        <div class="ws-mark">C</div>
        <div>
          <div class="ws-track">${escHtml(trackLabel)} • Unit ${escHtml(ws.num || '')}</div>
          <h1 class="ws-title">${renderRichMath(ws.title || '')}</h1>
        </div>
      </div>
      <div class="ws-doc-badge">${isKey ? 'Answer Key &amp; Solutions' : 'Practice Worksheet'}</div>
    </div>
    <div class="ws-meta">
      <span>${renderRichMath(ws.sub || `${totalQ} Structured Exam-Style Questions`)}</span>
      ${
        isKey
          ? `<span><strong>Total Questions:</strong> ${totalQ} • Verified Step-by-Step Solutions</span>`
          : `<span><strong>Name:</strong> _______________________ &nbsp; <strong>Date:</strong> ____________ &nbsp; <strong>Score:</strong> _____ / ${totalQ}</span>`
      }
    </div>
  </header>
  ${summaryGridHtml}
  ${sectionsHtml}
</body>
</html>`;
}

function startStaticServer() {
  const mime = {
    '.css': 'text/css; charset=utf-8',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.png': 'image/png',
    '.svg': 'image/svg+xml'
  };
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      const safePath = path.normalize(path.join(PUBLIC_ROOT, urlPath));
      if (!safePath.startsWith(PUBLIC_ROOT) || !fs.existsSync(safePath) || fs.statSync(safePath).isDirectory()) {
        res.statusCode = 404;
        res.end('Not found');
        return;
      }
      const ext = path.extname(safePath).toLowerCase();
      res.setHeader('Content-Type', mime[ext] || 'application/octet-stream');
      fs.createReadStream(safePath).pipe(res);
    });
    srv.listen(0, '127.0.0.1', () => {
      const addr = srv.address();
      resolve({ srv, baseUrl: `http://127.0.0.1:${addr.port}` });
    });
  });
}

async function main() {
  // Discover all < 35 KB PDFs in public/downloads/<track>/*.pdf
  const jobs = [];
  for (const tr of fs.readdirSync(DL_ROOT).sort()) {
    const dp = path.join(DL_ROOT, tr);
    if (!fs.statSync(dp).isDirectory()) continue;
    for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.pdf')).sort()) {
      const pdfPath = path.join(dp, f);
      const sz = fs.statSync(pdfPath).size;
      if (sz >= 35000) continue;
      const m = f.match(/^(.+)-(worksheet|answerkey)\.pdf$/);
      if (!m) continue;
      const base = m[1];
      const kind = m[2];
      let jsonPath = path.join(TP_ROOT, tr, `${base}.json`);
      if (!fs.existsSync(jsonPath)) {
        const numM = base.match(/^([0-9]+\.[0-9]+)-/);
        if (numM && fs.existsSync(path.join(TP_ROOT, tr))) {
          const cand = fs
            .readdirSync(path.join(TP_ROOT, tr))
            .find((x) => x.startsWith(`${numM[1]}-`) && x.endsWith('.json') && !x.endsWith('-ar.json'));
          if (cand) jsonPath = path.join(TP_ROOT, tr, cand);
        }
      }
      if (!fs.existsSync(jsonPath)) {
        throw new Error(`Missing topic JSON for stub PDF: ${pdfPath}`);
      }
      jobs.push({ pdfPath, tr, f, kind, jsonPath });
    }
  }

  console.log(`Found ${jobs.length} stub PDFs (< 35 KB) to regenerate...`);
  if (jobs.length === 0) return;

  const { srv, baseUrl } = await startStaticServer();
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (_e) {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  }

  const CONCURRENCY = 6;
  let completed = 0;
  let idx = 0;

  async function worker() {
    const page = await browser.newPage();
    while (idx < jobs.length) {
      const jobIdx = idx++;
      const job = jobs[jobIdx];
      const ws = JSON.parse(fs.readFileSync(job.jsonPath, 'utf8'));
      const html = buildWorksheetHtml(ws, job.kind, baseUrl);
      await page.setContent(html, { waitUntil: 'networkidle' });
      await page.pdf({
        path: job.pdfPath,
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate: `
          <div style="width:100%; font-family:Inter,sans-serif; font-size:7.5pt; color:#64748b; padding:0 14mm; display:flex; justify-content:space-between;">
            <span>© ClipSAT — clipsat.org | ${escHtml(ws.track ? ws.track.toUpperCase() : '')} ${escHtml(ws.num || '')} (${job.kind === 'answerkey' ? 'Answer Key' : 'Worksheet'})</span>
            <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
          </div>
        `,
        margin: { top: '14mm', right: '13mm', bottom: '15mm', left: '13mm' }
      });
      const newSize = fs.statSync(job.pdfPath).size;
      completed++;
      if (completed % 20 === 0 || completed === jobs.length) {
        console.log(`  [${completed}/${jobs.length}] ${job.tr}/${job.f} -> ${(newSize / 1024).toFixed(1)} KB`);
      }
    }
    await page.close();
  }

  try {
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, jobs.length) }, () => worker()));
  } finally {
    await browser.close();
    srv.close();
  }

  // Final check across ALL PDFs in public/downloads/
  let totalPdfs = 0;
  let under35 = 0;
  for (const tr of fs.readdirSync(DL_ROOT).sort()) {
    const dp = path.join(DL_ROOT, tr);
    if (!fs.statSync(dp).isDirectory()) continue;
    for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.pdf'))) {
      totalPdfs++;
      if (fs.statSync(path.join(dp, f)).size < 35000) under35++;
    }
  }
  console.log(`✓ PDF regeneration complete: ${totalPdfs - under35}/${totalPdfs} PDFs >= 35 KB (${under35} under 35 KB).`);
  if (under35 > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
