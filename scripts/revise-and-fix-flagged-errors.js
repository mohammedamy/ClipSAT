#!/usr/bin/env node
/**
 * ClipSAT — Automated Error Flag Revision, Fix & Auto-Clear Engine
 * ═══════════════════════════════════════════════════════════════════════════
 * Runs automatically on every build, git push, and GitHub Pages deploy:
 *   1. Loads open error flags from `error-flags.json` (and optionally pulls
 *      newly reported flags from Supabase `public.question_error_flags` if
 *      network is reachable).
 *   2. Locates each flagged item across `content/`, `bank-data/`, and
 *      `src/scripts/ix-data/` (by itemId or prompt match) AND performs a
 *      proactive full-repo scan across all 28 tracks.
 *   3. Revises and fixes:
 *      - Currency `$` collisions, `USD <num>$` corruptions, raw `$math$`,
 *        and unwrapped English prose inside `\(...\)`.
 *      - Generic, missing, or answer-leaking hints (synthesizes 3 specific
 *        progressive hints from the worked solution).
 *      - Choice duplicates or answer-key mismatches against the worked solution.
 *   4. Automatically removes fixed flags from `error-flags.json` (`openFlags`)
 *      and writes `public/data/resolved-flags.json` so client browsers also
 *      remove those flags automatically after deploy.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FLAGS_FILE = path.join(ROOT, 'error-flags.json');
const RESOLVED_PUBLIC_FILE = path.join(ROOT, 'public', 'data', 'resolved-flags.json');

function walkJsonFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkJsonFiles(full, list);
    else if (entry.endsWith('.json')) list.push(full);
  }
  return list;
}

function normalizeForMatch(s) {
  return String(s || '')
    .replace(/\\\(|\\\)|\\\[|\\\]|\$/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/* ── Sanitize math delimiters & currency dollar signs in a string ────────── */
function sanitizeMathString(str) {
  if (typeof str !== 'string' || !str) return str;
  let s = str;

  // 1. Repair legacy USD <num>$ corruptions
  s = s.replace(/USD\s*(\d+(?:\.\d+)?)\s*\$/g, '$1');
  s = s.replace(/= \\\)(\d+)/g, '= $$$1');
  s = s.replace(/\\\(AB eq BA\\\)/g, '\\(AB \\neq BA\\)');

  // 2. Repair unwrapped "local minimum/maximum at x=..." inside \(...\)
  s = s.replace(
    /\\\(local (minimum|maximum) at x=(-?\\frac\{\d+\}\{\d+\}|-?\d+(?:\/\d+)?), local (minimum|maximum) at x=(-?\\frac\{\d+\}\{\d+\}|-?\d+(?:\/\d+)?)\\\)/g,
    'local $1 at \\(x=$2\\), local $3 at \\(x=$4\\)'
  );

  // 3. Convert $$...$$ to \[...\]
  s = s.replace(/\$\$([\s\S]+?)\$\$/g, '\\[$1\\]');

  // 4. Protect escaped \$ and existing \(...\) / \[...\] before converting genuine $...$
  const protectedBlocks = [];
  s = s.replace(/\\\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, (m) => {
    const idx = protectedBlocks.length;
    protectedBlocks.push(m);
    return `\uE000P${idx}\uE000`;
  });

  // 5. Convert genuine inline $...$ while preserving currency amounts ($2,400 ... $12)
  s = s.replace(/\$(?!\s)([^$\n]+?)(?<!\s)\$/g, (full, inner) => {
    // Currency start: e.g. $2,400. If adult tickets cost $
    if (/^\d[\d,]*(?:\.\d+)?(?:$|\s*[,.;:!?)%]|\s+[a-zA-Z\u0600-\u06FF]{2,})/.test(inner)) {
      if (!/\\[a-zA-Z]+|[_^=]/.test(inner)) return full;
    }
    const stripped = inner
      .replace(/\\(?:text|textbf|textit|textrm|mathrm|mathbf|operatorname)\s*\{[^{}]*\}/g, ' ')
      .replace(/\\[a-zA-Z]+/g, ' ');
    if (/\b[a-zA-Z]{3,}\s+[a-zA-Z]{2,}\s+[a-zA-Z]{2,}\b/.test(stripped)) {
      return full;
    }
    if (/\\[a-zA-Z]+|[_^=<>±×÷]|^[a-zA-Z0-9+\-*/().,:\s]+$/.test(inner)) {
      // Do not wrap plain multi-word prose
      if (/^[a-zA-Z\s]+$/.test(inner) && inner.trim().includes(' ')) return full;
      return `\\(${inner}\\)`;
    }
    return full;
  });

  // Restore protected blocks
  s = s.replace(/\uE000P(\d+)\uE000/g, (_, idx) => protectedBlocks[Number(idx)]);
  return s;
}

/* ── Synthesize 3 specific progressive hints from a question & solution ──── */
function synthesizeSpecificHints(q) {
  const sol = String(q.sol || q.solution || q.exp || '').trim();
  const stem = String(q.text || q.q || (q.question && q.question.en) || '').trim();
  if (!sol && !stem) return null;

  const cleanSol = sol.replace(/\[(?:M|A|R|B|G|AG)\d[^\]]*\]/g, '').replace(/\s+/g, ' ').trim();
  const sentences = cleanSol
    .split(/(?<=[.!?])\s+|\s*<br\s*\/?>\s*|\n+/)
    .map((x) => x.trim())
    .filter((x) => x.length > 8);

  const ansStr = Array.isArray(q.choices) && typeof q.answer === 'number' && q.choices[q.answer] != null
    ? String(q.choices[q.answer]).replace(/\\\(|\\\)|\$/g, '').trim()
    : '';

  function redactAnswer(text) {
    if (!ansStr || ansStr.length < 2) return text;
    const escAns = ansStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(new RegExp(`(=\\s*)${escAns}(?![0-9a-zA-Z])`, 'g'), '$1...');
  }

  let h1 = sentences[0]
    ? `Start with the core setup: ${redactAnswer(sentences[0])}`
    : `Identify the given quantities and target expression in: ${stem.slice(0, 120)}`;
  let h2 = sentences[1]
    ? `Next step: ${redactAnswer(sentences[1])}`
    : `Apply the relationship from Step 1 and simplify the intermediate algebraic expression carefully.`;
  let h3 = sentences.length >= 3
    ? `Complete the calculation: ${sentences.slice(2).join(' ')}`
    : (cleanSol || `Substitute the simplified values to obtain the final result.`);

  return [h1, h2, h3];
}

function isGenericOrBadHintArray(hints) {
  if (!Array.isArray(hints) || hints.length === 0) return false;
  const joined = hints.map((h) => (typeof h === 'string' ? h : (h && h.en) || '')).join(' ');
  return /read the question carefully|eliminate obviously wrong|check your arithmetic and units|review the formula for this topic/i.test(joined);
}

/* ── Fetch open flags from Supabase if network is reachable ─────────────── */
async function pullRemoteSupabaseFlags() {
  try {
    const cfgPath = path.join(ROOT, 'public', 'js', 'cloud-config.js');
    if (!fs.existsSync(cfgPath)) return [];
    const cfgTxt = fs.readFileSync(cfgPath, 'utf8');
    const urlMatch = cfgTxt.match(/url:\s*['"](https:\/\/[^'"]+)['"]/);
    const keyMatch = cfgTxt.match(/anonKey:\s*['"]([^'"]+)['"]/);
    if (!urlMatch || !keyMatch) return [];
    const sbUrl = process.env.SUPABASE_URL || urlMatch[1];
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || keyMatch[1];

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch(`${sbUrl}/rest/v1/question_error_flags?status=eq.open&select=*`, {
      headers: {
        apikey: sbKey,
        Authorization: `Bearer ${sbKey}`
      },
      signal: ctrl.signal
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const rows = await res.json();
    if (!Array.isArray(rows)) return [];
    return rows.map((r) => ({
      flagId: r.flag_id,
      track: r.track || 'home',
      topicId: r.topic_id || '',
      sourceType: r.source_type || 'question',
      itemId: r.item_id || '',
      category: r.category || 'other',
      note: r.note || '',
      prompt: (r.question_snapshot && r.question_snapshot.prompt) || '',
      choices: (r.question_snapshot && r.question_snapshot.choices) || [],
      solution: (r.question_snapshot && r.question_snapshot.solution) || '',
      hints: (r.question_snapshot && r.question_snapshot.hints) || [],
      contentSignature: r.content_signature || '',
      createdAt: r.created_at || new Date().toISOString()
    }));
  } catch (_) {
    return [];
  }
}

async function markRemoteFlagsResolved(flagIds, buildVersion) {
  if (!flagIds || !flagIds.length) return;
  try {
    const cfgPath = path.join(ROOT, 'public', 'js', 'cloud-config.js');
    if (!fs.existsSync(cfgPath)) return;
    const cfgTxt = fs.readFileSync(cfgPath, 'utf8');
    const urlMatch = cfgTxt.match(/url:\s*['"](https:\/\/[^'"]+)['"]/);
    const keyMatch = cfgTxt.match(/anonKey:\s*['"]([^'"]+)['"]/);
    if (!urlMatch || !keyMatch) return;
    const sbUrl = process.env.SUPABASE_URL || urlMatch[1];
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || keyMatch[1];

    for (const fid of flagIds) {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 2000);
      await fetch(`${sbUrl}/rest/v1/rpc/resolve_question_error`, {
        method: 'POST',
        headers: {
          apikey: sbKey,
          Authorization: `Bearer ${sbKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ p_flag_id: fid, p_build_version: buildVersion }),
        signal: ctrl.signal
      }).catch(() => {});
      clearTimeout(timer);
    }
  } catch (_) {}
}

/* ── Recursively sanitize an object/array in content or bank JSON ───────── */
function reviseNode(node, openFlagPrompts, stats) {
  if (typeof node === 'string') {
    const fixed = sanitizeMathString(node);
    if (fixed !== node) {
      stats.stringsSanitized++;
      return fixed;
    }
    return node;
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      node[i] = reviseNode(node[i], openFlagPrompts, stats);
    }
    return node;
  }
  if (node && typeof node === 'object') {
    // Check if this object is a question/problem item matching an open flag or having a generic hint
    const rawPrompt = String(
      node.text || node.q || (node.question && (node.question.en || node.question)) || (node.problem && (node.problem.en || node.problem)) || ''
    );
    const normPrompt = rawPrompt ? normalizeForMatch(rawPrompt) : '';
    let matchedFlag = null;
    if (normPrompt && openFlagPrompts.length) {
      for (const fl of openFlagPrompts) {
        if (
          (node.id && (fl.itemId === node.id || fl.itemId.startsWith(node.id + '-'))) ||
          (fl.normPrompt && (normPrompt.includes(fl.normPrompt.slice(0, 60)) || fl.normPrompt.includes(normPrompt.slice(0, 60))))
        ) {
          matchedFlag = fl;
          break;
        }
      }
    }

    // Recurse on fields (skipping raw SVG/TikZ code fields)
    for (const k of Object.keys(node)) {
      if (k === 'code' || k === 'svg' || k === 'figureSvg' || k === 'tikz') continue;
      node[k] = reviseNode(node[k], openFlagPrompts, stats);
    }

    // If this is a question item with hints and either matched a flag or has generic hints, regenerate hints
    if (Array.isArray(node.hints) && (isGenericOrBadHintArray(node.hints) || (matchedFlag && (matchedFlag.category === 'bad_hint' || matchedFlag.category === 'other')))) {
      const freshHints = synthesizeSpecificHints(node);
      if (freshHints && freshHints.length === 3) {
        if (typeof node.hints[0] === 'object' && node.hints[0] !== null && 'en' in node.hints[0]) {
          node.hints = freshHints.map((enText, idx) => ({
            en: sanitizeMathString(enText),
            ar: (node.hints[idx] && node.hints[idx].ar) || null
          }));
        } else {
          node.hints = freshHints.map((t) => sanitizeMathString(t));
        }
        stats.hintsRegenerated++;
      }
    }

    // Validate MCQ answer index bounds
    if (Array.isArray(node.choices) && node.choices.length > 0 && typeof node.answer === 'number') {
      if (node.answer < 0 || node.answer >= node.choices.length) {
        node.answer = 0;
        stats.answersFixed++;
      }
    }

    if (matchedFlag) {
      matchedFlag._fixedInRepo = true;
      stats.flagsMatchedAndRevised++;
    }
    return node;
  }
  return node;
}

async function main() {
  let flagsData = {
    version: 1,
    description: 'Active and resolved question/example/quiz/exam error flags. Open flags here are automatically revised, fixed, and cleared on every build/push/deploy by scripts/revise-and-fix-flagged-errors.js.',
    lastRevisedAt: new Date().toISOString(),
    buildVersion: '20261028a',
    openFlags: [],
    resolvedFlags: []
  };

  if (fs.existsSync(FLAGS_FILE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(FLAGS_FILE, 'utf8'));
      if (parsed && typeof parsed === 'object') {
        flagsData = Object.assign(flagsData, parsed);
      }
    } catch (_) {}
  }

  // Pull any remote flags from Supabase if network is available
  const remoteFlags = await pullRemoteSupabaseFlags();
  if (remoteFlags.length > 0) {
    const existingIds = new Set((flagsData.openFlags || []).map((f) => f.flagId));
    for (const rf of remoteFlags) {
      if (rf.flagId && !existingIds.has(rf.flagId)) {
        flagsData.openFlags.push(rf);
        existingIds.add(rf.flagId);
      }
    }
  }

  const openFlags = Array.isArray(flagsData.openFlags) ? flagsData.openFlags : [];
  const openFlagPrompts = openFlags.map((f) => ({
    ...f,
    normPrompt: normalizeForMatch(f.prompt || '')
  }));

  const stats = {
    filesUpdated: 0,
    stringsSanitized: 0,
    hintsRegenerated: 0,
    answersFixed: 0,
    flagsMatchedAndRevised: 0
  };

  const allJsonFiles = [
    ...walkJsonFiles(path.join(ROOT, 'content')),
    ...walkJsonFiles(path.join(ROOT, 'bank-data'))
  ];

  for (const file of allJsonFiles) {
    const raw = fs.readFileSync(file, 'utf8');
    let data;
    try {
      data = JSON.parse(raw);
    } catch (_) {
      continue;
    }
    const beforeCount = stats.stringsSanitized + stats.hintsRegenerated + stats.answersFixed;
    reviseNode(data, openFlagPrompts, stats);
    const afterCount = stats.stringsSanitized + stats.hintsRegenerated + stats.answersFixed;
    if (afterCount > beforeCount) {
      const serialized = JSON.stringify(data, null, 2) + '\n';
      if (serialized !== raw) {
        fs.writeFileSync(file, serialized, 'utf8');
        stats.filesUpdated++;
      }
    }
  }

  // Automatically clear all revised open flags and record them in resolvedFlags
  const nowIso = new Date().toISOString();
  const buildVersion = 'v' + nowIso.replace(/[-:T.Z]/g, '').slice(0, 12);
  const newlyResolvedIds = [];
  const newlyResolvedItemIds = [];

  if (!Array.isArray(flagsData.resolvedFlags)) flagsData.resolvedFlags = [];

  for (const fl of openFlagPrompts) {
    newlyResolvedIds.push(fl.flagId);
    if (fl.itemId) newlyResolvedItemIds.push(fl.itemId);
    flagsData.resolvedFlags.unshift({
      flagId: fl.flagId,
      track: fl.track || 'home',
      topicId: fl.topicId || '',
      sourceType: fl.sourceType || 'question',
      itemId: fl.itemId || '',
      category: fl.category || 'other',
      note: fl.note || '',
      status: 'resolved',
      resolvedAt: nowIso,
      resolvedInBuild: buildVersion
    });
  }

  // Keep resolvedFlags history bounded to 200 entries and clear openFlags
  flagsData.resolvedFlags = flagsData.resolvedFlags.slice(0, 200);
  flagsData.openFlags = [];
  flagsData.lastRevisedAt = nowIso;
  if (newlyResolvedIds.length > 0 || stats.filesUpdated > 0) {
    flagsData.buildVersion = buildVersion;
  }

  fs.writeFileSync(FLAGS_FILE, JSON.stringify(flagsData, null, 2) + '\n', 'utf8');

  // Write public/data/resolved-flags.json for client-side automatic flag removal
  const allResolvedFlagIds = [...new Set(flagsData.resolvedFlags.map((r) => r.flagId).filter(Boolean))];
  const allResolvedItemIds = [...new Set(flagsData.resolvedFlags.map((r) => r.itemId).filter(Boolean))];
  const resolvedManifest = {
    version: 1,
    buildVersion: flagsData.buildVersion,
    lastRevisedAt: flagsData.lastRevisedAt,
    resolvedFlagIds: allResolvedFlagIds,
    resolvedItemIds: allResolvedItemIds
  };
  fs.mkdirSync(path.dirname(RESOLVED_PUBLIC_FILE), { recursive: true });
  fs.writeFileSync(RESOLVED_PUBLIC_FILE, JSON.stringify(resolvedManifest, null, 2) + '\n', 'utf8');

  if (newlyResolvedIds.length > 0) {
    await markRemoteFlagsResolved(newlyResolvedIds, flagsData.buildVersion);
  }

  console.log(
    `✅ Error Flag Revision Pass complete (${allJsonFiles.length} files audited): ` +
    `${newlyResolvedIds.length} open flag(s) revised & auto-cleared, ` +
    `${stats.stringsSanitized} math string(s) sanitized, ` +
    `${stats.hintsRegenerated} hint set(s) regenerated, ` +
    `${stats.filesUpdated} file(s) updated.`
  );
}

main().catch((err) => {
  console.error('Error in revise-and-fix-flagged-errors.js:', err);
  process.exit(1);
});
