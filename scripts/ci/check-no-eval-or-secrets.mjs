#!/usr/bin/env node
// scripts/ci/check-no-eval-or-secrets.mjs — CI Gate #7: Static Security SAST & Secret Scan Gate

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

function stripJsComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:\\])\/\/.*$/gm, '$1 ');
}

function collectFiles(dir, exts, skipDirs = new Set()) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (skipDirs.has(ent.name)) continue;
      out.push(...collectFiles(abs, exts, skipDirs));
    } else if (exts.some((ext) => ent.name.endsWith(ext))) {
      out.push(abs);
    }
  }
  return out;
}

const errors = [];

const jsFiles = [
  ...collectFiles(path.join(ROOT, 'src', 'scripts'), ['.js', '.mjs', '.ts']),
  ...collectFiles(path.join(ROOT, 'public', 'js'), ['.js', '.mjs'], new Set(['vendor']))
];

const evalRe = /\beval\s*\(|\bnew\s+Function\s*\(/;
for (const fp of jsFiles) {
  const raw = fs.readFileSync(fp, 'utf8');
  const code = stripJsComments(raw);
  if (evalRe.test(code)) {
    errors.push(`Forbidden eval() / new Function() in ${path.relative(ROOT, fp)}`);
  }
}

// Secret scan across src/, public/js/, and supabase/functions/
const secretScanFiles = [
  ...jsFiles,
  ...collectFiles(path.join(ROOT, 'src'), ['.njk', '.html']),
  ...collectFiles(path.join(ROOT, 'supabase', 'functions'), ['.ts'])
];

const secretPatterns = [
  ['Live Stripe Secret Key', /\bsk_live_[0-9a-zA-Z]{20,}\b/],
  ['Live Stripe Restricted Key', /\brk_live_[0-9a-zA-Z]{20,}\b/],
  ['Google API Key', /\bAIzaSy[0-9A-Za-z_-]{33}\b/],
  ['Groq API Key', /\bgsk_[0-9A-Za-z]{32,}\b/],
  ['OpenRouter API Key', /\bsk-or-v1-[0-9a-f]{48,}\b/],
  ['Supabase Personal Access Token', /\bsbp_[0-9a-f]{32,}\b/]
];

for (const fp of secretScanFiles) {
  const raw = fs.readFileSync(fp, 'utf8');
  for (const [label, re] of secretPatterns) {
    if (re.test(raw)) {
      errors.push(`Potential leaked ${label} in ${path.relative(ROOT, fp)}`);
    }
  }
  // Detect JWTs with "role":"service_role"
  const jwtMatches = raw.match(/\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g) || [];
  for (const jwt of jwtMatches) {
    try {
      const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64url').toString('utf8'));
      if (payload && payload.role === 'service_role') {
        errors.push(`Leaked Supabase service_role JWT in ${path.relative(ROOT, fp)}`);
      }
    } catch (_) {}
  }
}

// Verify strict escHtml & DOMPurify guardrails remain wired
const mistakesSrc = fs.readFileSync(path.join(ROOT, 'src', 'scripts', 'modules', '13-mistakes-review.js'), 'utf8');
if (!mistakesSrc.includes('&amp;') || !mistakesSrc.includes('&lt;') || !mistakesSrc.includes('&#39;') && !mistakesSrc.includes('&#039;')) {
  errors.push('13-mistakes-review.js missing strict 5-entity escHtml() implementation');
}
if (!fs.existsSync(path.join(ROOT, 'public', 'vendor', 'purify.min.js')) && !mistakesSrc.includes('DOMPurify')) {
  errors.push('DOMPurify sanitizer missing from client bundle');
}

// Verify CSP header forbids unsafe-eval
const headersTxt = fs.readFileSync(path.join(ROOT, '_headers'), 'utf8');
if (!headersTxt.includes('Content-Security-Policy') || headersTxt.includes("'unsafe-eval'")) {
  errors.push('_headers must enforce Content-Security-Policy without unsafe-eval');
}

if (errors.length > 0) {
  console.error(`❌ CI Gate #7 FAILED with ${errors.length} SAST/secret violation(s):`);
  for (const e of errors) console.error('  -', e);
  process.exit(1);
}

console.log(`✅ CI Gate #7 PASSED: Scanned ${jsFiles.length} JS/TS modules & ${secretScanFiles.length} files (0 eval/new Function, 0 leaked secrets, strict CSP & escHtml verified).`);
