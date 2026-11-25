#!/usr/bin/env node
/**
 * ClipSAT Automated Exam-Authenticity Audit Gatekeeper (`npm run audit:exams`).
 * Enforces psychometric, structural, bilingual, diagram/table visual density,
 * and Board/ETEC exam-blueprint parity across the 8 priority curriculum slugs:
 *   sat, qudrat, tahsili, gaten, apab, apbc, precalc, appc.
 *
 * Usage:
 *   node scripts/audit-exam-authenticity.mjs               # Audit all 8 tracks (fail on any gap)
 *   node scripts/audit-exam-authenticity.mjs --track=sat   # Audit single track
 *   node scripts/audit-exam-authenticity.mjs --report      # Print metrics table without failing
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const { validateFigureSpec } = require('./lib/exam-diagrams');

const ROOT = path.join(__dirname, '..');
const TARGET_TRACKS = [
  'sat', 'qudrat', 'tahsili', 'gaten', 'apab', 'apbc', 'precalc', 'appc',
  'act', 'act2', 'act2l2', 'est', 'est2', 'est2l2',
  'apstats', 'igcse', 'edexcel', 'addmath', 'aslevel', 'a2level', 'ibsl', 'ibhl',
  'olympiad', 'algebra', 'alg2', 'geo', 'calculus', 'mvc', 'linalg', 'odes', 'mathai',
];

const args = process.argv.slice(2);
const reportOnly = args.includes('--report') || args.includes('--dry-run');
const trackArg = args.find((a) => a.startsWith('--track='));
const SELECTED_TRACKS = trackArg
  ? trackArg.replace('--track=', '').split(',').map((s) => s.trim()).filter(Boolean)
  : TARGET_TRACKS;

// Load 02c-figures.js once into a VM sandbox to verify real SVG/table rendering
const figSandbox = {
  window: {},
  Math, JSON, Array, Object, Number, String, Boolean, isFinite, isNaN, parseFloat, parseInt, console,
};
figSandbox.window = figSandbox;
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '02c-figures.js'), 'utf8'), figSandbox);

const TABLE_TYPES = new Set(['table', 'two_way_table', 'twoWayTable', 'twowaytable']);

function classifyVisual(item) {
  const fig = item && (item.figure || item.fig);
  const txt = String((item && (item.text || item.q || (item.question && item.question.en))) || '');
  const hasHtmlTable = /<table\b/i.test(txt);
  const hasInlineSvg = /<svg\b/i.test(txt);

  let hasTable = hasHtmlTable;
  let hasSvg = hasInlineSvg;
  let figType = null;
  let figRenderErr = null;

  if (fig && typeof fig === 'object') {
    figType = fig.type || null;
    if (TABLE_TYPES.has(figType)) {
      hasTable = true;
    } else if (figType) {
      hasSvg = true;
    }
    const vErrs = validateFigureSpec(fig);
    if (vErrs.length) {
      figRenderErr = vErrs.join('; ');
    } else {
      try {
        const rendered = figSandbox._renderFig(fig);
        if (!rendered || (!rendered.includes('<svg') && !rendered.includes('<table'))) {
          figRenderErr = `Empty _renderFig output for type "${figType}"`;
        } else if (/NaN|undefined/.test(rendered)) {
          figRenderErr = `Rendered figure contains NaN/undefined (${figType})`;
        }
      } catch (err) {
        figRenderErr = err.message;
      }
    }
  } else if (typeof fig === 'string' && fig.trim()) {
    if (/<table\b/i.test(fig)) hasTable = true;
    else if (/<svg\b/i.test(fig)) hasSvg = true;
  }

  return { hasTable, hasSvg, figType, figRenderErr };
}

function normStem(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\\\(|\\\)|\\\[|\\\]|\$/g, '')
    .replace(/\d+(?:\.\d+)?/g, '#')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function jaccardTokens(a, b) {
  const sa = new Set(String(a || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  const sb = new Set(String(b || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(/\s+/).filter((w) => w.length > 2));
  if (!sa.size || !sb.size) return 0;
  let inter = 0;
  for (const t of sa) if (sb.has(t)) inter++;
  return inter / (sa.size + sb.size - inter);
}

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), 'utf8'));
}

function loadTrackWorksheets(track) {
  const dir = path.join(ROOT, 'tools', 'worksheet_gen', 'topics', track);
  if (!fs.existsSync(dir)) return { files: 0, qCount: 0, svgCount: 0, tableCount: 0, badFigures: [], rawDollarHits: 0 };
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
  let qCount = 0;
  let svgCount = 0;
  let tableCount = 0;
  let rawDollarHits = 0;
  const badFigures = [];

  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    for (const sec of (data.sections || [])) {
      for (const q of (sec.questions || [])) {
        qCount++;
        const qTxt = String(q.q || '');
        if (/\\\$\d|\$\d/.test(qTxt)) rawDollarHits++;
        if (q.figure) {
          const ft = q.figure.type;
          if (TABLE_TYPES.has(ft)) tableCount++;
          else svgCount++;
          const errs = validateFigureSpec(q.figure);
          if (errs.length) badFigures.push(`${f}: ${errs.join(', ')}`);
        } else if (/<table\b/i.test(qTxt)) {
          tableCount++;
        }
      }
    }
  }
  return { files: files.length, qCount, svgCount, tableCount, badFigures, rawDollarHits };
}

function auditTrack(track) {
  const errors = [];
  const meta = readJson(`content/${track}/_meta.json`);
  const bank = readJson(`bank-data/${track}.json`);
  const pset = readJson(`content/${track}/_practice-set.json`);
  const ws = loadTrackWorksheets(track);

  const pool = Array.isArray(bank.pool) ? bank.pool : [];
  if (bank.schemaVersion !== 2) errors.push('Bank schemaVersion must be 2');

  let svgCount = 0;
  let tableCount = 0;
  let qcCount = 0;
  let sprCount = 0;
  let structuredCount = 0;
  let legacyFrqCount = 0;
  let badFigCount = 0;
  let missingCalcBool = 0;
  let arMathTextLeak = 0;
  const skeletonMap = new Map();
  const byChapter = new Map();
  const byDomain = new Map();
  const byDiff = new Map();

  for (const ch of (meta.chapterOrder || [])) {
    byChapter.set(ch, { total: 0, svg: 0, table: 0, qc: 0, structured: 0, calcTrue: 0, calcFalse: 0 });
  }

  for (const q of pool) {
    const ch = q.topic_id || 'MISSING';
    if (!byChapter.has(ch)) {
      byChapter.set(ch, { total: 0, svg: 0, table: 0, qc: 0, structured: 0, calcTrue: 0, calcFalse: 0 });
    }
    const cStat = byChapter.get(ch);
    cStat.total++;

    byDomain.set(q.domain || 'MISSING', (byDomain.get(q.domain || 'MISSING') || 0) + 1);
    byDiff.set(q.difficulty || 'MISSING', (byDiff.get(q.difficulty || 'MISSING') || 0) + 1);

    if (typeof q.calc !== 'boolean') missingCalcBool++;
    else if (q.calc) cStat.calcTrue++;
    else cStat.calcFalse++;

    const vis = classifyVisual(q);
    if (vis.hasSvg) { svgCount++; cStat.svg++; }
    if (vis.hasTable) { tableCount++; cStat.table++; }
    if (vis.figRenderErr) {
      badFigCount++;
      if (badFigCount <= 5) errors.push(`Broken figure in ${q.id}: ${vis.figRenderErr}`);
    }

    if (q.type === 'spr') sprCount++;
    if (q.type === 'structured' || q.type === 'proof') { structuredCount++; cStat.structured++; }
    if (q.type === 'frq') legacyFrqCount++;

    const stemAll = `${q.text || ''} ${q.text_ar || ''}`;
    if (q.qc_col_a || q.qc_col_a_ar || /قارن بين القيمتين|Compare:\s*Quantity\s*A/i.test(stemAll)) {
      qcCount++;
      cStat.qc++;
    }

    const sk = normStem(q.text || q.text_ar || '');
    if (sk.length > 15) skeletonMap.set(sk, (skeletonMap.get(sk) || 0) + 1);

    const arJoined = `${q.text_ar || ''} ${q.sol_ar || ''} ${(q.choices_ar || []).join(' ')}`;
    if (/\\text\{[^}]*[\u0600-\u06FF][^}]*\}/.test(arJoined)) {
      arMathTextLeak++;
    }
  }

  const maxSkeleton = Math.max(0, ...skeletonMap.values());
  const svgPct = pool.length ? (svgCount / pool.length) * 100 : 0;
  const tablePct = pool.length ? (tableCount / pool.length) * 100 : 0;
  const qcPct = pool.length ? (qcCount / pool.length) * 100 : 0;

  if (badFigCount > 0) errors.push(`${badFigCount} broken or unrenderable figures in bank`);
  if (missingCalcBool > 0) errors.push(`${missingCalcBool} items missing boolean 'calc' field`);
  if (arMathTextLeak > 0) errors.push(`${arMathTextLeak} items contain forbidden \\text{Arabic} inside math delimiters`);
  if (ws.badFigures.length > 0) errors.push(`${ws.badFigures.length} broken worksheet figures (first: ${ws.badFigures[0]})`);

  // Check all chapter JSON files exist & count Practice Set stats
  const chapterMissing = (meta.chapterOrder || []).filter((slug) => !fs.existsSync(path.join(ROOT, 'content', track, `${slug}.json`)));
  if (chapterMissing.length) errors.push(`Missing chapter JSON files: ${chapterMissing.join(', ')}`);

  let psetSvg = 0, psetTable = 0;
  for (const item of (pset.items || pset.questions || [])) {
    const vis = classifyVisual(item);
    if (vis.hasSvg) psetSvg++;
    if (vis.hasTable) psetTable++;
    if (vis.figRenderErr) errors.push(`Broken practice-set figure (${item.id || '?'}): ${vis.figRenderErr}`);
  }
  const psetCount = (pset.items || pset.questions || []).length;

  // ── Track-specific authenticity gates ──────────────────────────────────────
  if (track === 'sat') {
    if (pool.length !== 1605) errors.push(`SAT pool length must be 1605 (got ${pool.length})`);
    const expDom = { Algebra: 562, 'Advanced Math': 562, 'Problem-Solving and Data Analysis': 241, 'Geometry and Trigonometry': 240 };
    for (const [d, n] of Object.entries(expDom)) {
      if ((byDomain.get(d) || 0) !== n) errors.push(`SAT domain ${d} expected ${n}, got ${byDomain.get(d) || 0}`);
    }
    if ((byDiff.get('easy') || 0) !== 535 || (byDiff.get('medium') || 0) !== 535 || (byDiff.get('hard') || 0) !== 535) {
      errors.push(`SAT difficulty split must be 535/535/535, got ${byDiff.get('easy')}/${byDiff.get('medium')}/${byDiff.get('hard')}`);
    }
    if (sprCount < 395 || sprCount > 410) errors.push(`SAT SPR count ~25% expected 395–410, got ${sprCount}`);
    const anchor = pool.find((q) => q.id === 'sat-0412');
    if (!anchor || anchor.sprAnswer !== '101') errors.push('SAT anchor sat-0412 must remain sprAnswer="101"');
    if (maxSkeleton > 1) errors.push(`SAT max_skeleton must be 1 (found ${maxSkeleton})`);
    if (svgPct < 35) errors.push(`SAT SVG figure ratio ${svgPct.toFixed(1)}% < 35.0%`);
    if (tablePct < 20) errors.push(`SAT Table ratio ${tablePct.toFixed(1)}% < 20.0%`);

    // Dual-method + Trap note check across SAT solutions
    const missingDesmosOrTrap = pool.filter((q) => !/Desmos|Graphing|Quick Check/i.test(q.sol || '') || !/Trap|Mistake|Caution|Watch out/i.test(q.sol || '')).length;
    if (missingDesmosOrTrap > 0) errors.push(`${missingDesmosOrTrap} SAT items missing dual-method/Desmos or Trap note in sol`);

    // Out-of-scope check
    const bannedRe = /\\int\b|\\frac\{d\}\{dx\}|\\det\b|\\mathbf\{i\}\s*\+\s*\d+\\mathbf\{j\}|3D vector/i;
    const oos = pool.filter((q) => bannedRe.test(`${q.text} ${q.sol}`)).length;
    if (oos > 0) errors.push(`${oos} SAT items contain banned out-of-scope College Board tokens`);

    // Worksheet SAT checks
    if (ws.files !== 11 || ws.qCount !== 495) errors.push(`SAT worksheets expected 11 files / 495 Qs, got ${ws.files} / ${ws.qCount}`);
    if (ws.rawDollarHits > 0) errors.push(`SAT worksheets have ${ws.rawDollarHits} unescaped '$' + digit tokens`);
    const wsVisPct = ws.qCount ? ((ws.svgCount + ws.tableCount) / ws.qCount) * 100 : 0;
    if (wsVisPct < 30) errors.push(`SAT worksheet visual+table density ${wsVisPct.toFixed(1)}% < 30%`);
  }

  if (track === 'qudrat') {
    if (pool.length < 1538) errors.push(`Qudrat pool < 1538 (got ${pool.length})`);
    if (qcPct < 30.0 || qcPct > 32.0) errors.push(`Qudrat QC ratio ${qcPct.toFixed(2)}% outside [30.0%, 32.0%]`);
    const calcViol = pool.filter((q) => q.calc !== false).length;
    if (calcViol > 0) errors.push(`Qudrat has ${calcViol} items with calc != false`);
    const noTactic = pool.filter((q) => !/الطريقة السريعة|تكتيك|فكرة الحل السريع/.test(q.sol_ar || '')).length;
    if (noTactic > 0) errors.push(`${noTactic} Qudrat items missing Quick Tactic section in sol_ar`);
    if (svgPct < 35) errors.push(`Qudrat SVG figure ratio ${svgPct.toFixed(1)}% < 35.0%`);
    if (tablePct < 15) errors.push(`Qudrat Table ratio ${tablePct.toFixed(1)}% < 15.0%`);
    const chGeo = byChapter.get('qud-geometry');
    if (chGeo && (chGeo.svg / Math.max(1, chGeo.total)) * 100 < 65) errors.push('Qudrat Geometry chapter SVG ratio < 65%');
    const chStats = byChapter.get('qud-data');
    if (chStats && (chStats.table / Math.max(1, chStats.total)) * 100 < 55) errors.push('Qudrat Statistics chapter Table ratio < 55%');
  }

  if (track === 'tahsili') {
    if (pool.length < 1675) errors.push(`Tahsili pool < 1675 (got ${pool.length})`);
    const calcViol = pool.filter((q) => q.calc !== false).length;
    if (calcViol > 0) errors.push(`Tahsili has ${calcViol} items with calc != false`);
    if (svgPct < 35) errors.push(`Tahsili SVG figure ratio ${svgPct.toFixed(1)}% < 35.0%`);
    if (tablePct < 15) errors.push(`Tahsili Table ratio ${tablePct.toFixed(1)}% < 15.0%`);
    const chStats = byChapter.get('tah-stats');
    if (chStats && (chStats.table / Math.max(1, chStats.total)) * 100 < 55) errors.push('Tahsili Stats/Prob chapter Table ratio < 55%');
  }

  if (track === 'gaten') {
    const gatItems = pool.filter((q) => (q.subtrack || '').toLowerCase() === 'gat-en' || ((q.topic_id || '').startsWith('ge-') && !(q.topic_id || '').startsWith('ge-saat-')));
    const saatItems = pool.filter((q) => (q.subtrack || '').toLowerCase() === 'saat-en' || (q.topic_id || '').startsWith('ge-saat-') || (q.topic_id || '').startsWith('se-'));
    if (gatItems.length < 600 || saatItems.length < 600) {
      errors.push(`gaten subtracks expected >= 600 gat-en and >= 600 saat-en, got ${gatItems.length} / ${saatItems.length}`);
    }
    const gatQc = gatItems.filter((q) => q.qc_col_a || /Quantity A|Compare Column A/i.test(q.text || '')).length;
    const gatQcPct = gatItems.length ? (gatQc / gatItems.length) * 100 : 0;
    if (gatQcPct < 30.0) errors.push(`gat-en QC ratio ${gatQcPct.toFixed(1)}% < 30.0%`);
    if (svgPct < 35) errors.push(`GATEN SVG figure ratio ${svgPct.toFixed(1)}% < 35.0%`);
    if (tablePct < 15) errors.push(`GATEN Table ratio ${tablePct.toFixed(1)}% < 15.0%`);

    // < 5% stem similarity overlap vs qudrat/tahsili English text
    const qud = readJson('bank-data/qudrat.json').pool || [];
    const tah = readJson('bank-data/tahsili.json').pool || [];
    const arRefEn = [...qud, ...tah].map((q) => q.text || '').filter((s) => s.length > 20);
    let overlapCount = 0;
    for (const q of pool.slice(0, 200)) {
      if (arRefEn.some((ref) => jaccardTokens(q.text, ref) >= 0.85)) overlapCount++;
    }
    if ((overlapCount / 200) * 100 >= 5.0) errors.push(`GATEN sample overlap against qudrat/tahsili >= 5% (${overlapCount}/200)`);
  }

  if (track === 'apab' || track === 'apbc') {
    const minFrq = track === 'apab' ? 90 : 87;
    if (legacyFrqCount > 0) errors.push(`${track} still contains ${legacyFrqCount} legacy 'frq' items instead of 'structured'`);
    if (structuredCount < minFrq) errors.push(`${track} structured 9-pt FRQs expected >= ${minFrq}, got ${structuredCount}`);
    const badFrqs = pool.filter((q) => {
      if (q.type !== 'structured') return false;
      const parts = Array.isArray(q.parts) ? q.parts : [];
      const sumP = parts.reduce((acc, p) => acc + (Number(p.marks) || 0), 0);
      return q.marks !== 9 || parts.length !== 4 || sumP !== 9;
    });
    if (badFrqs.length > 0) errors.push(`${track} has ${badFrqs.length} FRQs not matching 9-point 4-part (a)(b)(c)(d) spec (e.g. ${badFrqs[0].id})`);
    if (svgPct < 35) errors.push(`${track} SVG figure ratio ${svgPct.toFixed(1)}% < 35.0%`);
    if (tablePct < 20) errors.push(`${track} Table ratio ${tablePct.toFixed(1)}% < 20.0%`);
  }

  if (track === 'precalc' || track === 'appc') {
    const minFrq = 64;
    if (legacyFrqCount > 0) errors.push(`${track} still contains ${legacyFrqCount} legacy 'frq' items instead of 6-pt 'structured'`);
    if (structuredCount < minFrq) errors.push(`${track} structured 6-pt FRQs expected >= ${minFrq}, got ${structuredCount}`);
    const badFrqs = pool.filter((q) => {
      if (q.type !== 'structured') return false;
      const parts = Array.isArray(q.parts) ? q.parts : [];
      const sumP = parts.reduce((acc, p) => acc + (Number(p.marks) || 0), 0);
      return q.marks !== 6 || parts.length < 3 || sumP !== 6;
    });
    if (badFrqs.length > 0) errors.push(`${track} has ${badFrqs.length} FRQs not matching 6-point 3–4-part spec (e.g. ${badFrqs[0].id})`);
    if (svgPct < 35) errors.push(`${track} SVG figure ratio ${svgPct.toFixed(1)}% < 35.0%`);
    if (tablePct < 20) errors.push(`${track} Table ratio ${tablePct.toFixed(1)}% < 20.0%`);
    if (track === 'appc') {
      for (const ch of (meta.chapterOrder || [])) {
        if (ch === 'appc-overview') continue;
        const cnt = (byChapter.get(ch) || {}).total || 0;
        if (cnt < 100) errors.push(`APPC chapter ${ch} has only ${cnt} items (expected >= 100, zero empty buckets)`);
      }
    }
  }

  const NEW_ROLLOUT_SET = new Set([
    'act', 'act2', 'act2l2', 'est', 'est2', 'est2l2',
    'apstats', 'igcse', 'edexcel', 'addmath', 'aslevel', 'a2level', 'ibsl', 'ibhl',
    'olympiad', 'algebra', 'alg2', 'geo', 'calculus', 'mvc', 'linalg', 'odes', 'mathai',
  ]);
  const STRUCT_MINS = {
    apstats: 66, igcse: 98, edexcel: 120, addmath: 96, aslevel: 88, a2level: 60,
    ibsl: 157, ibhl: 150, olympiad: 120, mathai: 58, calculus: 32, mvc: 24, linalg: 24, odes: 27,
  };
  if (NEW_ROLLOUT_SET.has(track)) {
    if (legacyFrqCount > 0) errors.push(`${track} still contains ${legacyFrqCount} legacy 'frq' items instead of 'structured'`);
    const minSvg = track === 'geo' ? 45.0 : 35.0;
    if (svgPct < minSvg) errors.push(`${track} SVG figure ratio ${svgPct.toFixed(1)}% < ${minSvg.toFixed(1)}%`);
    const minTbl = (track === 'act' || track === 'est' || track === 'apstats') ? 20.0 : 15.0;
    if (tablePct < minTbl) errors.push(`${track} Table ratio ${tablePct.toFixed(1)}% < ${minTbl.toFixed(1)}%`);
    if (STRUCT_MINS[track] !== undefined) {
      if (structuredCount < STRUCT_MINS[track]) {
        errors.push(`${track} structured/proof FRQs expected >= ${STRUCT_MINS[track]}, got ${structuredCount}`);
      }
      const badFrqs = pool.filter((q) => {
        if (q.type !== 'structured' && q.type !== 'proof') return false;
        const parts = Array.isArray(q.parts) ? q.parts : [];
        const sumP = parts.reduce((acc, p) => acc + (Number(p.marks) || 0), 0);
        return typeof q.marks !== 'number' || parts.length < 3 || sumP !== q.marks;
      });
      if (badFrqs.length > 0) errors.push(`${track} has ${badFrqs.length} invalid multi-part FRQs (e.g. ${badFrqs[0].id})`);
    }
    if (psetSvg < 18 || psetTable < 10) {
      errors.push(`${track} _practice-set.json visuals ${psetSvg} SVGs / ${psetTable} tables below 18/10 floor`);
    }
    if (ws.files === 0 || ws.qCount === 0) errors.push(`${track} missing worksheet topic JSON files`);
    if (ws.rawDollarHits > 0) errors.push(`${track} worksheets have ${ws.rawDollarHits} unescaped '$' + digit tokens`);
    const wsVisPct = ws.qCount ? ((ws.svgCount + ws.tableCount) / ws.qCount) * 100 : 0;
    if (wsVisPct < 30) errors.push(`${track} worksheet visual+table density ${wsVisPct.toFixed(1)}% < 30%`);
  }

  return {
    track,
    total: pool.length,
    svgCount,
    svgPct,
    tableCount,
    tablePct,
    qcPct,
    sprCount,
    structuredCount,
    legacyFrqCount,
    maxSkeleton,
    psetCount,
    psetSvg,
    psetTable,
    wsQ: ws.qCount,
    wsSvg: ws.svgCount,
    wsTable: ws.tableCount,
    errors,
  };
}

let anyFailure = false;
console.log('── ClipSAT Exam-Authenticity Audit Report ────────────────────────────────────');
console.log('Track    | Total | SVG%  | Tbl%  | QC%   | FRQs(Struct/Old) | PSet(S/T) | WS(S/T)   | Status');
console.log('---------|-------|-------|-------|-------|------------------|-----------|-----------|-------');

for (const track of SELECTED_TRACKS) {
  const res = auditTrack(track);
  const ok = res.errors.length === 0;
  if (!ok) anyFailure = true;
  console.log(
    `${track.padEnd(8)} | ${String(res.total).padStart(5)} | ${res.svgPct.toFixed(1).padStart(4)}% | ${res.tablePct.toFixed(1).padStart(4)}% | ${res.qcPct.toFixed(1).padStart(4)}% | ${String(res.structuredCount).padStart(4)} / ${String(res.legacyFrqCount).padEnd(9)} | ${String(res.psetSvg).padStart(2)}/${String(res.psetTable).padEnd(6)} | ${String(res.wsSvg).padStart(3)}/${String(res.wsTable).padEnd(5)} | ${ok ? 'PASS' : `FAIL (${res.errors.length})`}`
  );
  if (!ok) {
    for (const e of res.errors) {
      console.log(`   ✗ [${track}] ${e}`);
    }
  }
}

if (anyFailure && !reportOnly) {
  console.error('\n❌ Exam authenticity audit failed.');
  process.exit(1);
}
console.log(`\n${anyFailure ? '⚠️ Report generated with open authenticity gaps.' : '✅ All audited tracks passed ClipSAT exam-authenticity standards!'}`);
