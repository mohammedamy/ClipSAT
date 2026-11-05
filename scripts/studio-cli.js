#!/usr/bin/env node
// scripts/studio-cli.js — ClipSAT Educator Studio CLI (WP-48)
//
// Single-command workflow for authoring, validating, AST-translating, SymPy-verifying,
// and sharding curriculum bank questions or chapters without manual script archaeology.
//
// Commands:
//   node scripts/studio-cli.js stats
//   node scripts/studio-cli.js scaffold-item --track <slug> [--type mcq|spr|structured|proof] [--out <file>]
//   node scripts/studio-cli.js validate-item --track <slug> --file <item.json> [--translate-ar]
//   node scripts/studio-cli.js add-item --track <slug> --file <item.json> [--dry-run] [--staging]
//   node scripts/studio-cli.js scaffold-chapter --track <slug> --slug <ch-slug> --title-en "..." --title-ar "..." [--dry-run]

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const Ajv = require('ajv');
const katex = require('katex');
const { collectRepoMetrics, syncDocs } = require('./sync-docs');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const BANK_DIR = path.join(ROOT, 'bank-data');
const SHARDS_DIR = path.join(ROOT, 'public', 'bank-shards');
const STAGING_DIR = path.join(ROOT, 'staging', 'bank-data');

const MENA_BILINGUAL_TRACKS = new Set(['qudrat', 'tahsili', 'gaten', 'sat', 'est', 'est2', 'est2l2', 'igcse']);
const SHADOW_FIELDS = ['correct', 'ans', 'q', 'fig', 'solution', 'exp', 'expl', 'explanation', 'diff', 'ch', 'topic', 'letters'];
const CLIENT_STRIP_KEYS = new Set(['educational_aim', 'exam_archetype', 'sympy_cert', 'educator_review_hash', 'sympy_verified']);

const ITEM_SCHEMA_V2 = {
  type: 'object',
  required: ['id', 'type', 'domain', 'difficulty', 'text', 'sol', 'topic_id', 'hints', 'calc', 'irt'],
  additionalProperties: false,
  properties: {
    id: { type: 'string', minLength: 3 },
    type: { enum: ['mcq', 'spr', 'frq', 'structured', 'proof'] },
    domain: { type: 'string', minLength: 1 },
    difficulty: { enum: ['easy', 'medium', 'hard'] },
    text: { type: 'string', minLength: 3 },
    text_ar: { type: 'string', minLength: 2 },
    sol: { type: 'string', minLength: 3 },
    sol_ar: { type: 'string', minLength: 2 },
    topic_id: { type: 'string', minLength: 1 },
    subskill_id: { type: 'string' },
    subtrack: { type: 'string' },
    educational_aim: { type: 'string' },
    exam_archetype: { type: 'string' },
    choices: { type: 'array', items: { type: 'string', minLength: 1 }, minItems: 2, maxItems: 4 },
    choices_ar: { type: 'array', items: { type: 'string', minLength: 1 }, minItems: 2, maxItems: 4 },
    answer: { type: 'integer', minimum: 0, maximum: 3 },
    sprAnswer: { type: 'string', minLength: 1 },
    finalAnswer: { type: 'string', minLength: 1 },
    hints: { type: 'array', items: { type: 'string', minLength: 12 }, minItems: 3, maxItems: 3 },
    hints_ar: { type: 'array', items: { type: 'string', minLength: 4 }, minItems: 3, maxItems: 3 },
    figure: { type: 'object' },
    marks: { type: 'number' },
    paper: { type: 'string' },
    course: { type: 'string' },
    ibSection: { type: 'string' },
    calc: { type: 'boolean' },
    calculator: { type: 'boolean' },
    sympy_verified: { type: 'boolean' },
    sympy_cert: { type: 'string', minLength: 1 },
    educator_review_hash: { type: 'string', pattern: '^[a-f0-9]{64}$' },
    fixedChoices: { type: 'boolean' },
    qc_col_a: { type: 'string' },
    qc_col_b: { type: 'string' },
    qc_col_a_ar: { type: 'string' },
    qc_col_b_ar: { type: 'string' },
    qc_context: { type: 'string' },
    qc_context_ar: { type: 'string' },
    markScheme: { type: ['string', 'array'] },
    parts: { type: 'array', minItems: 1 },
    irt: {
      type: 'object',
      required: ['a', 'b', 'c'],
      additionalProperties: false,
      properties: {
        a: { type: 'number', minimum: 0.2, maximum: 3.5 },
        b: { type: 'number', minimum: -4.0, maximum: 4.0 },
        c: { type: 'number', minimum: 0.0, maximum: 0.5 }
      }
    }
  }
};

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const validateItemSchema = ajv.compile(ITEM_SCHEMA_V2);

function resolvePythonBin() {
  for (const cand of [process.env.PYTHON_BIN, '/opt/homebrew/bin/python3', 'python3', 'python']) {
    if (!cand) continue;
    const res = spawnSync(cand, ['-c', 'import sympy'], { encoding: 'utf8' });
    if (res.status === 0) return cand;
  }
  return 'python3';
}

function parseFlags(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const tok = argv[i];
    if (tok.startsWith('--')) {
      const eq = tok.indexOf('=');
      if (eq !== -1) {
        out[tok.slice(2, eq)] = tok.slice(eq + 1);
      } else {
        const key = tok.slice(2);
        const next = argv[i + 1];
        if (next && !next.startsWith('--')) {
          out[key] = next;
          i++;
        } else {
          out[key] = true;
        }
      }
    } else {
      out._.push(tok);
    }
  }
  return out;
}

function computeEducatorReviewHash(item) {
  const targetSig =
    item.type === 'structured' || item.type === 'proof'
      ? JSON.stringify(
          (item.parts || []).map((p) => {
            const sorted = {};
            for (const k of Object.keys(p).sort()) sorted[k] = p[k];
            return sorted;
          })
        )
      : item.type === 'spr'
        ? item.sprAnswer
        : JSON.stringify([item.choices, item.answer]);
  const payload = `clipsat-v2|${item.id}|${item.type}|${item.text}|${targetSig}|${item.sol}`;
  return crypto.createHash('sha256').update(payload, 'utf8').digest('hex');
}

function defaultIRT(item) {
  const diffB = item.difficulty === 'easy' ? -0.9 : item.difficulty === 'hard' ? 1.1 : 0.1;
  const guessC = item.type === 'mcq' ? 0.25 : 0.0;
  return { a: 1.25, b: diffB, c: guessC };
}

function strictKatexCheck(str, fieldLabel, errors) {
  if (typeof str !== 'string' || !str) return;
  const re = /\\\(([\s\S]*?)\\\)|\\\[([\s\S]*?)\\\]|\$\$([\s\S]*?)\$\$/g;
  let m;
  while ((m = re.exec(str))) {
    const tex = (m[1] ?? m[2] ?? m[3] ?? '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
    const displayMode = m[1] === undefined;
    try {
      katex.renderToString(tex, {
        displayMode,
        throwOnError: true,
        strict: 'error',
        trust: false,
        macros: {
          '\\R': '\\mathbb{R}',
          '\\N': '\\mathbb{N}',
          '\\Z': '\\mathbb{Z}',
          '\\Q': '\\mathbb{Q}',
          '\\C': '\\mathbb{C}'
        }
      });
    } catch (e) {
      errors.push(`${fieldLabel}: KaTeX strict error: ${e.message}`);
    }
  }
  const stripped = str
    .replace(/\\\([\s\S]*?\\\)/g, '')
    .replace(/\\\[[\s\S]*?\\\]/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/\\\$|\$\d/g, '');
  if (/\$[^$\n]+\$/.test(stripped)) {
    errors.push(`${fieldLabel}: unescaped currency or single-$ math delimiter detected (use \\(...\\) or \\$)`);
  }
}

function runPythonBridge(item, { translateAr = false } = {}) {
  const py = resolvePythonBin();
  const script = `
import json, sys, os
sys.path.insert(0, os.path.join(${JSON.stringify(ROOT)}, 'scripts', 'quality_engine'))
import verify_bank_sympy as vbs
import ast_arabic_translator as aat

payload = json.loads(sys.stdin.read())
item = payload['item']
do_translate = payload['translateAr']
dom = item.get('domain', '')

if do_translate:
    if not item.get('text_ar'):
        item['text_ar'] = aat.ensure_pure_msa('stem', item['text'], dom)
    if not item.get('sol_ar'):
        item['sol_ar'] = aat.ensure_pure_msa('sol', item['sol'], dom)
    if isinstance(item.get('hints'), list) and not item.get('hints_ar'):
        item['hints_ar'] = [aat.ensure_pure_msa('hint', h, dom) for h in item['hints']]
    if isinstance(item.get('choices'), list) and not item.get('choices_ar'):
        item['choices_ar'] = [aat.ensure_pure_msa('choice', c, dom) for c in item['choices']]

if not item.get('sympy_cert') and not item.get('educator_review_hash'):
    item['educator_review_hash'] = vbs.compute_educator_hash(item)

errs = vbs.verify_item(item)

# Bilingual AST corruption & math parity check when *_ar present
for en_k, ar_k in [('text', 'text_ar'), ('sol', 'sol_ar')]:
    if item.get(ar_k):
        if aat.has_midword_corruption(item[ar_k]):
            errs.append(f"{item.get('id')}: mid-word Latin/Arabic corruption in {ar_k}")
        if aat.extract_math_tokens(item[en_k]) != aat.extract_math_tokens(item[ar_k]):
            errs.append(f"{item.get('id')}: math token mismatch between {en_k} and {ar_k}")

print(json.dumps({'item': item, 'errors': errs}, ensure_ascii=False))
`;
  const res = spawnSync(py, ['-c', script], {
    input: JSON.stringify({ item, translateAr }),
    encoding: 'utf8',
    maxBuffer: 10 * 1024 * 1024
  });
  if (res.status !== 0) {
    throw new Error(`Python verification bridge failed: ${res.stderr || res.stdout}`);
  }
  return JSON.parse(res.stdout);
}

function nextItemId(track, pool) {
  let maxNum = 0;
  const re = new RegExp(`^${track}-(\\d+)$`);
  for (const q of pool) {
    const m = re.exec(q.id || '');
    if (m) maxNum = Math.max(maxNum, parseInt(m[1], 10));
  }
  return `${track}-${String(maxNum + 1).padStart(4, '0')}`;
}

function scaffoldItem({ track, type = 'mcq', rootDir = ROOT }) {
  const metaPath = path.join(rootDir, 'content', track, '_meta.json');
  const bankPath = path.join(rootDir, 'bank-data', `${track}.json`);
  if (!fs.existsSync(metaPath) || !fs.existsSync(bankPath)) {
    throw new Error(`Unknown track "${track}" (expected content/${track}/_meta.json and bank-data/${track}.json)`);
  }
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
  const pool = bank.pool || [];
  const topicId = (meta.chapterOrder && meta.chapterOrder[0]) || `${track}-ch1`;
  const sampleDomain = (pool[0] && pool[0].domain) || 'Algebra';
  const id = nextItemId(track, pool);

  const base = {
    id,
    type,
    topic_id: topicId,
    domain: sampleDomain,
    difficulty: 'medium',
    calc: track !== 'qudrat',
    irt: { a: 1.3, b: 0.1, c: type === 'mcq' ? 0.25 : 0.0 },
    text: 'If \\( 3x - 7 = 14 \\), what is the value of \\( 2x + 1 \\)?',
    sol: 'Add \\( 7 \\) to both sides to get \\( 3x = 21 \\), so \\( x = 7 \\). Substituting gives \\( 2(7) + 1 = 15 \\).',
    hints: [
      'Isolate the linear term \\( 3x \\) by undoing the subtraction of \\( 7 \\).',
      'Divide both sides of \\( 3x = 21 \\) by \\( 3 \\) to determine \\( x \\).',
      'Substitute the value of \\( x \\) into the target expression \\( 2x + 1 \\) and simplify.'
    ]
  };

  if (type === 'spr') {
    base.sprAnswer = '15';
    base.sympy_verified = true;
    base.sympy_cert = 'x = sp.Symbol("x")\nsol_x = sp.solve(sp.Eq(3*x - 7, 14), x)[0]\nEXPECTED = 2*sol_x + 1';
  } else if (type === 'structured' || type === 'proof') {
    base.marks = 4;
    base.parts = [
      {
        label: '(a)',
        prompt: 'Solve \\( 3x - 7 = 14 \\) for \\( x \\).',
        marks: 2,
        answer: '7',
        inputType: 'numeric',
        markScheme: [
          { code: 'M1', criterion: 'Isolates \\( 3x = 21 \\)', marks: 1 },
          { code: 'A1', criterion: 'Obtains \\( x = 7 \\)', marks: 1 }
        ]
      },
      {
        label: '(b)',
        prompt: 'Hence evaluate \\( 2x + 1 \\).',
        marks: 2,
        answer: '15',
        inputType: 'numeric',
        markScheme: [
          { code: 'M1', criterion: 'Substitutes \\( x = 7 \\) into \\( 2x + 1 \\)', marks: 1 },
          { code: 'A1', criterion: 'Obtains \\( 15 \\)', marks: 1 }
        ]
      }
    ];
    base.educator_review_hash = computeEducatorReviewHash(base);
  } else {
    base.choices = ['\\( 11 \\)', '\\( 15 \\)', '\\( 17 \\)', '\\( 21 \\)'];
    base.answer = 1;
    base.sympy_verified = true;
    base.sympy_cert = 'x = sp.Symbol("x")\nsol_x = sp.solve(sp.Eq(3*x - 7, 14), x)[0]\nEXPECTED = 2*sol_x + 1';
  }

  return base;
}

function validateAndPrepareItem(rawItem, { track, translateAr = false, rootDir = ROOT } = {}) {
  const errors = [];
  const item = JSON.parse(JSON.stringify(rawItem));

  for (const sf of SHADOW_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(item, sf)) {
      errors.push(`Forbidden legacy shadow key "${sf}" present`);
    }
  }

  if (typeof item.calc !== 'boolean') {
    item.calc = track !== 'qudrat';
  }
  if (!item.irt || typeof item.irt !== 'object') {
    item.irt = defaultIRT(item);
  }

  if (track) {
    const metaPath = path.join(rootDir, 'content', track, '_meta.json');
    if (!fs.existsSync(metaPath)) {
      errors.push(`Unknown track "${track}"`);
    } else {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      const chapters = new Set(meta.chapterOrder || []);
      if (!item.topic_id) item.topic_id = meta.chapterOrder[0];
      if (!chapters.has(item.topic_id)) {
        errors.push(`topic_id "${item.topic_id}" is not in content/${track}/_meta.json chapterOrder`);
      }
    }
  }

  const mustTranslate = Boolean(translateAr || (track && MENA_BILINGUAL_TRACKS.has(track)));
  const pyRes = runPythonBridge(item, { translateAr: mustTranslate });
  const prepared = pyRes.item;
  errors.push(...pyRes.errors);

  if (!validateItemSchema(prepared)) {
    for (const e of validateItemSchema.errors || []) {
      errors.push(`Schema v2 ${e.instancePath || '/'}: ${e.message}`);
    }
  }

  // Strict KaTeX checks across all math-bearing fields
  strictKatexCheck(prepared.text, `${prepared.id}.text`, errors);
  strictKatexCheck(prepared.text_ar, `${prepared.id}.text_ar`, errors);
  strictKatexCheck(prepared.sol, `${prepared.id}.sol`, errors);
  strictKatexCheck(prepared.sol_ar, `${prepared.id}.sol_ar`, errors);
  for (const [idx, c] of (prepared.choices || []).entries()) {
    strictKatexCheck(c, `${prepared.id}.choices[${idx}]`, errors);
  }
  for (const [idx, h] of (prepared.hints || []).entries()) {
    strictKatexCheck(h, `${prepared.id}.hints[${idx}]`, errors);
  }

  // Hint answer-leak check on hints[0..1]
  const ansToken =
    prepared.type === 'mcq' && Array.isArray(prepared.choices) && Number.isInteger(prepared.answer)
      ? String(prepared.choices[prepared.answer] || '')
      : String(prepared.sprAnswer || prepared.finalAnswer || '');
  const cleanAns = ansToken.replace(/^\\\(|\\\)$/g, '').trim();
  if (cleanAns.length >= 4 && Array.isArray(prepared.hints)) {
    if (String(prepared.hints[0] || '').includes('= ' + cleanAns) || String(prepared.hints[1] || '').includes('= ' + cleanAns)) {
      errors.push(`${prepared.id}: hints[0..1] leaks final answer "${cleanAns}"`);
    }
  }

  return { valid: errors.length === 0, errors, item: prepared };
}

function toClientBankItem(q) {
  const out = {};
  for (const k of Object.keys(q)) {
    if (!CLIENT_STRIP_KEYS.has(k)) out[k] = q[k];
  }
  return out;
}

function rebuildTrackShards(track, rootDir = ROOT) {
  const bankPath = path.join(rootDir, 'bank-data', `${track}.json`);
  const raw = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
  const pool = raw.pool || [];
  const byTopic = {};
  for (const q of pool) {
    const tid = String(q.topic_id || 'general').replace(/[^a-zA-Z0-9_-]/g, '');
    if (!byTopic[tid]) byTopic[tid] = [];
    byTopic[tid].push(toClientBankItem(q));
  }
  const canonicalTopics = Object.keys(byTopic);
  const chapterAliases = {};
  const trackContentDir = path.join(rootDir, 'content', track);
  if (fs.existsSync(trackContentDir)) {
    for (const chFile of fs.readdirSync(trackContentDir)) {
      if (!chFile.endsWith('.json') || chFile.startsWith('_')) continue;
      const ch = JSON.parse(fs.readFileSync(path.join(trackContentDir, chFile), 'utf8'));
      const cid = String(ch.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
      if (!cid || (byTopic[cid] && byTopic[cid].length)) continue;
      const domains = ch.quizWidget && Array.isArray(ch.quizWidget.domains) ? ch.quizWidget.domains : [];
      let matched = domains.length
        ? canonicalTopics.filter((tid) => byTopic[tid].some((q) => q.domain && domains.includes(q.domain)))
        : [];
      if (!matched.length) matched = canonicalTopics.slice(0, 2);
      chapterAliases[cid] = matched;
    }
  }

  const outDir = path.join(rootDir, 'public', 'bank-shards', track);
  fs.mkdirSync(outDir, { recursive: true });
  const topicSummary = {};
  for (const tid of canonicalTopics) {
    const items = byTopic[tid];
    topicSummary[tid] = items.length;
    fs.writeFileSync(path.join(outDir, `${tid}.json`), JSON.stringify({ track, topic_id: tid, count: items.length, pool: items }), 'utf8');
  }
  for (const cid of Object.keys(chapterAliases)) {
    const aliasTopics = chapterAliases[cid];
    topicSummary[cid] = aliasTopics.reduce((acc, t) => acc + (byTopic[t] ? byTopic[t].length : 0), 0);
    fs.writeFileSync(path.join(outDir, `${cid}.json`), JSON.stringify({ track, topic_id: cid, aliasTopics }), 'utf8');
  }
  fs.writeFileSync(
    path.join(outDir, '_index.json'),
    JSON.stringify({
      track,
      schemaVersion: raw.schemaVersion || 2,
      quarantined: Boolean(raw.quarantined),
      total: pool.length,
      canonicalTopics,
      chapterAliases,
      letters: raw.letters || null,
      sections: raw.sections || null,
      topics: topicSummary
    }),
    'utf8'
  );
  return { track, shardTopics: canonicalTopics.length, total: pool.length };
}

function addItemToTrack({ track, rawItem, dryRun = false, staging = false, translateAr = false, rootDir = ROOT }) {
  const bankPath = path.join(rootDir, 'bank-data', `${track}.json`);
  if (!fs.existsSync(bankPath)) {
    throw new Error(`Bank file not found: bank-data/${track}.json`);
  }
  const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
  const candidate = JSON.parse(JSON.stringify(rawItem));
  if (!candidate.id) {
    candidate.id = nextItemId(track, bank.pool || []);
  }

  // Ensure global ID uniqueness across all 31 banks
  for (const bf of fs.readdirSync(path.join(rootDir, 'bank-data')).filter((x) => x.endsWith('.json'))) {
    const b = JSON.parse(fs.readFileSync(path.join(rootDir, 'bank-data', bf), 'utf8'));
    if ((b.pool || []).some((q) => q.id === candidate.id)) {
      return {
        valid: false,
        errors: [`Duplicate item ID "${candidate.id}" already exists in bank-data/${bf}`],
        item: candidate
      };
    }
  }

  const res = validateAndPrepareItem(candidate, { track, translateAr, rootDir });
  if (!res.valid || dryRun) {
    return { ...res, dryRun, writtenTo: null };
  }

  bank.pool.push(res.item);
  if (staging) {
    const stageDir = path.join(rootDir, 'staging', 'bank-data');
    fs.mkdirSync(stageDir, { recursive: true });
    const stagePath = path.join(stageDir, `${track}.json`);
    fs.writeFileSync(stagePath, JSON.stringify(bank, null, 2) + '\n', 'utf8');
    return { ...res, dryRun: false, writtenTo: stagePath };
  }

  fs.writeFileSync(bankPath, JSON.stringify(bank, null, 2) + '\n', 'utf8');
  rebuildTrackShards(track, rootDir);
  syncDocs({ rootDir, checkOnly: false });
  return { ...res, dryRun: false, writtenTo: bankPath };
}

function scaffoldChapter({ track, slug, titleEn, titleAr }) {
  return {
    id: slug,
    slug,
    num: 'New',
    title: { en: titleEn || 'New Chapter', ar: titleAr || 'فصل جديد' },
    chapterTag: { className: 'tag-alg', label: { en: 'Core Topic', ar: 'موضوع أساسي' } },
    quizWidget: { domains: ['Algebra'] },
    content: {
      blocks: [
        {
          kind: 'callout',
          style: 'def',
          title: { en: 'Key Definition', ar: 'تعريف أساسي' },
          body: {
            en: 'State the core mathematical definition using \\( f(x) \\) notation.',
            ar: 'صياغة التعريف الرياضي الأساسي باستعمال الترميز \\( f(x) \\).'
          }
        },
        {
          kind: 'workedExampleCard',
          id: `${slug}-we-1`,
          difficulty: 'medium',
          title: { en: 'Worked Example 1', ar: 'مثال محلول 1' },
          problem: {
            en: 'Solve \\( 2x + 5 = 17 \\).',
            ar: 'أوجد حل المعادلة \\( 2x + 5 = 17 \\).'
          },
          steps: [
            {
              title: { en: 'Isolate the variable term', ar: 'عزل الحد المتغير' },
              body: { en: 'Subtract \\( 5 \\) to obtain \\( 2x = 12 \\).', ar: 'اطرح \\( 5 \\) لتحصل على \\( 2x = 12 \\).' }
            },
            {
              title: { en: 'Divide by the coefficient', ar: 'القسمة على المعامل' },
              body: { en: 'Divide by \\( 2 \\) to get \\( x = 6 \\).', ar: 'اقسم على \\( 2 \\) لتحصل على \\( x = 6 \\).' }
            }
          ],
          answer: { en: '\\( x = 6 \\)', ar: '\\( x = 6 \\)' }
        }
      ]
    }
  };
}

function printHelp() {
  console.log(`ClipSAT Educator Studio CLI (WP-48)

Commands:
  stats                                              Print live 31-track corpus metrics
  scaffold-item --track <slug> [--type mcq|spr|structured|proof] [--out <file>]
  validate-item --track <slug> (--file <json> | --json '<...>') [--translate-ar]
  add-item --track <slug> --file <json> [--dry-run] [--staging] [--translate-ar]
  scaffold-chapter --track <slug> --slug <ch-slug> --title-en "..." --title-ar "..." [--out <file>]
`);
}

if (require.main === module) {
  const flags = parseFlags(process.argv.slice(2));
  const cmd = flags._[0] || 'help';

  try {
    if (cmd === 'stats' || cmd === 'status') {
      const m = collectRepoMetrics(ROOT);
      console.log(
        `ClipSAT Studio — ${m.trackCount} tracks | ${m.chapterCount} chapters (${m.chapterRoutesCount} EN+AR routes) | ` +
          `${m.totalBankItems.toLocaleString()} verified bank items | ${m.totalActivities.toLocaleString()} interactive activities | ` +
          `${m.totalWorksheets} worksheets | ${m.totalPdfs} PDFs`
      );
      process.exit(0);
    }

    if (cmd === 'scaffold-item') {
      if (!flags.track) throw new Error('Missing --track <slug>');
      const tpl = scaffoldItem({ track: flags.track, type: flags.type || 'mcq' });
      const jsonOut = JSON.stringify(tpl, null, 2) + '\n';
      if (flags.out) {
        fs.writeFileSync(path.resolve(flags.out), jsonOut, 'utf8');
        console.log(`✓ Scaffolded ${tpl.type} item ${tpl.id} -> ${flags.out}`);
      } else {
        process.stdout.write(jsonOut);
      }
      process.exit(0);
    }

    if (cmd === 'validate-item') {
      const raw = flags.json
        ? JSON.parse(flags.json)
        : flags.file
          ? JSON.parse(fs.readFileSync(path.resolve(flags.file), 'utf8'))
          : null;
      if (!raw) throw new Error('Provide --file <item.json> or --json \'<...>\'');
      const res = validateAndPrepareItem(raw, {
        track: flags.track,
        translateAr: Boolean(flags['translate-ar'])
      });
      if (!res.valid) {
        console.error('❌ Item validation failed:');
        for (const e of res.errors) console.error('  -', e);
        process.exit(1);
      }
      console.log(`✓ Item ${res.item.id} passed Schema v2, strict KaTeX, AST bilingual parity & SymPy verification.`);
      process.exit(0);
    }

    if (cmd === 'add-item') {
      if (!flags.track) throw new Error('Missing --track <slug>');
      const raw = flags.json
        ? JSON.parse(flags.json)
        : flags.file
          ? JSON.parse(fs.readFileSync(path.resolve(flags.file), 'utf8'))
          : null;
      if (!raw) throw new Error('Provide --file <item.json> or --json \'<...>\'');
      const res = addItemToTrack({
        track: flags.track,
        rawItem: raw,
        dryRun: Boolean(flags['dry-run']),
        staging: Boolean(flags.staging),
        translateAr: Boolean(flags['translate-ar'])
      });
      if (!res.valid) {
        console.error('❌ add-item blocked by quality gates:');
        for (const e of res.errors) console.error('  -', e);
        process.exit(1);
      }
      if (res.dryRun) {
        console.log(`✓ [dry-run] Item ${res.item.id} verified cleanly for track "${flags.track}" (no files modified).`);
      } else {
        console.log(`✓ Added verified item ${res.item.id} -> ${res.writtenTo}`);
      }
      process.exit(0);
    }

    if (cmd === 'scaffold-chapter') {
      if (!flags.track || !flags.slug) throw new Error('Provide --track <slug> and --slug <chapter-slug>');
      const ch = scaffoldChapter({
        track: flags.track,
        slug: flags.slug,
        titleEn: flags['title-en'],
        titleAr: flags['title-ar']
      });
      const jsonOut = JSON.stringify(ch, null, 2) + '\n';
      if (flags.out) {
        fs.writeFileSync(path.resolve(flags.out), jsonOut, 'utf8');
        console.log(`✓ Scaffolded chapter ${ch.slug} -> ${flags.out}`);
      } else {
        process.stdout.write(jsonOut);
      }
      process.exit(0);
    }

    printHelp();
    process.exit(cmd === 'help' || cmd === '--help' ? 0 : 1);
  } catch (err) {
    console.error('❌ Studio CLI error:', err.message);
    process.exit(1);
  }
}

module.exports = {
  computeEducatorReviewHash,
  scaffoldItem,
  validateAndPrepareItem,
  rebuildTrackShards,
  addItemToTrack,
  scaffoldChapter
};
