#!/usr/bin/env node
'use strict';

/**
 * scripts/test-wave1-verification.js — Wave 1 (WP-10 through WP-20) Verification Suite
 *
 * Verifies every Wave 1 architectural, security, PDPL/Vault, Schema v2, debiasing,
 * strict KaTeX, figure authenticity, worksheet/PDF, and CI gate acceptance criterion.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function exists(rel) {
  return fs.existsSync(path.join(ROOT, rel));
}

console.log('Running Wave 1 Verification Suite (WP-10 through WP-20)...');

// ── WP-10: Root 404.html emitted by Eleventy ────────────────────────────────
{
  const src404 = read('src/404.html');
  assert(
    /permalink:\s*404\.html/.test(src404),
    'WP-10: src/404.html must include permalink: 404.html front matter'
  );
  if (exists('_site')) {
    assert(exists('_site/404.html'), 'WP-10: _site/404.html must exist after Eleventy build');
  }
  console.log('  ✓ WP-10: 404.html front matter & build output verified');
}

// ── WP-11: Strict CSP, Security Headers & First-Party Supabase Edge Proxy ───
{
  const headers = read('_headers');
  assert(headers.includes('Content-Security-Policy:'), 'WP-11: _headers must define Content-Security-Policy');
  assert(!headers.includes('unsafe-eval'), 'WP-11: _headers CSP must not permit unsafe-eval');
  assert(headers.includes('Strict-Transport-Security:'), 'WP-11: _headers must define HSTS');
  assert(headers.includes('X-Frame-Options: DENY'), 'WP-11: _headers must define X-Frame-Options: DENY');
  assert(headers.includes('Referrer-Policy:'), 'WP-11: _headers must define Referrer-Policy');
  assert(headers.includes('Permissions-Policy:'), 'WP-11: _headers must define Permissions-Policy');
  assert(exists('wrangler.toml'), 'WP-11: wrangler.toml must exist for Cloudflare Pages edge deployment');
  assert(
    exists('functions/api/supabase/[[path]].js'),
    'WP-11: Cloudflare Pages first-party Supabase proxy function must exist'
  );
  console.log('  ✓ WP-11: Security headers, strict CSP & edge proxy verified');
}

// ── WP-12: Self-Hosted Fonts/Vendors, WebP Avatar & Engine Bundle Budget ────
{
  const requiredVendors = [
    'public/vendor/fonts/fonts.css',
    'public/vendor/jszip/jszip.min.js',
    'public/vendor/dompurify/purify.min.js',
    'public/vendor/three/three.module.min.js',
    'public/vendor/three/OrbitControls.js',
    'public/vendor/katex/katex.min.css',
    'public/teacher-avatar.webp'
  ];
  for (const v of requiredVendors) {
    assert(exists(v), `WP-12: Required self-hosted asset missing: ${v}`);
  }
  const baseNjk = read('src/_includes/base.njk');
  assert(!baseNjk.includes('fonts.googleapis.com'), 'WP-12: base.njk must not load Google Fonts CDN');
  assert(!baseNjk.includes('cdnjs.cloudflare.com'), 'WP-12: base.njk must not load cdnjs CDN');
  assert(!baseNjk.includes('cdn.jsdelivr.net'), 'WP-12: base.njk must not load jsdelivr CDN');
  assert(!baseNjk.includes('unpkg.com'), 'WP-12: base.njk must not load unpkg CDN');

  const engineBytes = fs.statSync(path.join(ROOT, 'public/js/engine.js')).size;
  assert(
    engineBytes < 350000,
    `WP-12: public/js/engine.js (${engineBytes} bytes) exceeds 350,000-byte ceiling`
  );
  console.log(`  ✓ WP-12: Self-hosted assets & engine.js budget (${(engineBytes / 1024).toFixed(1)} KB < 341.8 KB) verified`);
}

// ── WP-13: Supabase Vault OAuth Encryption, K-12 Consent & Account Deletion ─
{
  const vaultSql = read('supabase/migrations/20261101120000_wave1_vault_oauth_and_pdpl.sql');
  assert(vaultSql.includes('vault.create_secret'), 'WP-13: Vault SQL migration must encrypt tokens via vault.create_secret');
  assert(vaultSql.includes('delete_my_account'), 'WP-13: Vault SQL migration must define delete_my_account() RPC');

  const gToken = read('supabase/functions/google-token/index.ts');
  assert(
    gToken.includes('get_google_refresh_token_admin'),
    'WP-13: google-token Edge Function must read from Vault via get_google_refresh_token_admin'
  );

  const cloudSync = read('public/js/cloud-sync.js');
  assert(cloudSync.includes('upsert_google_refresh_token'), 'WP-13: cloud-sync.js must store tokens in Vault via upsert_google_refresh_token');
  assert(cloudSync.includes('deleteMyAccount'), 'WP-13: cloud-sync.js must expose deleteMyAccount()');
  assert(cloudSync.includes('delete_my_account'), 'WP-13: cloud-sync.js must invoke delete_my_account RPC');
  assert(cloudSync.includes('cloud-auth-age-consent'), 'WP-13: cloud-sync.js must enforce K-12 age/guardian consent gate');

  const appPy = read('app.py');
  assert(/DAILY_QUESTION_LIMIT\s*=\s*20/.test(appPy), 'WP-13: app.py must remain on disk with DAILY_QUESTION_LIMIT = 20');
  console.log('  ✓ WP-13: Supabase Vault encryption, K-12 consent gate & 1-click PDPL deletion verified');
}

// ── WP-14, WP-15, WP-16, WP-18: Canonical Schema v2, Debias, Track Rebuilds & Figures
{
  const SHADOW_FIELDS = ['correct', 'ans', 'q', 'fig', 'solution', 'exp', 'expl', 'explanation', 'diff', 'ch', 'topic', 'letters'];
  const ROBOTIC_RE = /^(?:Let['’]s solve this step[- ]by[- ]step|To solve this problem,\s*let['’]s|Step[- ]by[- ]step solution\s*:)/i;
  const CANNED_PARABOLA_RE = /^x\s*(?:\^|\*\*)\s*2\s*-\s*4$/;

  const bankDir = path.join(ROOT, 'bank-data');
  const bankFiles = fs.readdirSync(bankDir).filter((f) => f.endsWith('.json')).sort();
  assert.strictEqual(bankFiles.length, 31, `WP-14: Expected 31 bank-data/*.json files, found ${bankFiles.length}`);

  const seenIds = new Set();
  const trackStems = {};

  for (const f of bankFiles) {
    const tr = f.replace(/\.json$/, '');
    const bank = JSON.parse(fs.readFileSync(path.join(bankDir, f), 'utf8'));
    assert.strictEqual(bank.schemaVersion, 2, `WP-14: ${f} must have schemaVersion: 2`);
    assert.strictEqual(bank.track, tr, `WP-14: ${f} track mismatch`);
    assert(Array.isArray(bank.pool), `WP-14: ${f} must have top-level pool array`);
    assert(!('sections' in bank), `WP-14: ${f} must not retain legacy sections wrapper`);
    assert(bank.pool.length >= 1200, `WP-16: ${f} has only ${bank.pool.length} items (< 1200)`);

    const counts = [0, 0, 0, 0];
    let mcqTotal = 0;
    let figCount = 0;
    trackStems[tr] = new Set();

    for (const item of bank.pool) {
      assert(item.id && !seenIds.has(item.id), `WP-14: Duplicate or missing ID ${item.id} in ${f}`);
      seenIds.add(item.id);
      for (const sf of SHADOW_FIELDS) {
        assert(!(sf in item), `WP-14: Legacy shadow field "${sf}" found on ${item.id} in ${f}`);
      }
      assert(!ROBOTIC_RE.test(String(item.sol || '').trim()), `WP-15: Robotic filler prefix in ${item.id}`);
      trackStems[tr].add(String(item.text || '').toLowerCase().replace(/\s+/g, ' ').trim());

      if (item.type === 'mcq') {
        assert(item.choices.length >= 2 && item.choices.length <= 4, `WP-14: MCQ ${item.id} must have <= 4 choices`);
        if (item.choices.length === 4) {
          counts[item.answer]++;
          mcqTotal++;
        }
      } else if (item.type === 'spr') {
        assert(typeof item.sprAnswer === 'string' && item.sprAnswer.length > 0, `WP-14: SPR ${item.id} missing sprAnswer`);
      } else if (item.type === 'frq') {
        assert(typeof item.sol === 'string' && item.sol.length > 0, `WP-14: FRQ ${item.id} missing sol`);
      }

      if (item.figure) {
        figCount++;
        const fn = String(item.figure.fn || item.figure.expr || '').trim();
        if (CANNED_PARABOLA_RE.test(fn)) {
          const mentions = /x\^2\s*-\s*4|x²\s*-\s*4|\(x\s*-\s*2\)\(x\s*\+\s*2\)/.test(item.text || '');
          assert(mentions, `WP-18: Canned x^2 - 4 figure in ${item.id}`);
        }
      }
    }

    assert(figCount >= 250, `WP-18: ${f} has only ${figCount} figures (< 250 minimum)`);

    if (mcqTotal >= 40) {
      const expected = mcqTotal / 4;
      const chi2 = counts.reduce((acc, c) => acc + Math.pow(c - expected, 2) / expected, 0);
      assert(chi2 < 4.0, `WP-15: ${f} answer-key chi² = ${chi2.toFixed(2)} (>= 4.0 ceiling)`);
    }
  }

  // WP-16 cross-bank overlap checks (< 5%)
  const overlapPairs = [
    ['gaten', 'qudrat'],
    ['edexcel', 'igcse'],
    ['addmath', 'igcse'],
    ['mathai', 'ibsl']
  ];
  for (const [a, b] of overlapPairs) {
    let shared = 0;
    for (const s of trackStems[a]) {
      if (trackStems[b].has(s)) shared++;
    }
    const ratio = shared / trackStems[a].size;
    assert(ratio < 0.05, `WP-16: Cross-bank overlap ${a}<->${b} is ${(ratio * 100).toFixed(2)}% (>= 5%)`);
  }

  // WP-18 02c-figures.js dummy fallback removal check
  const figSrc = read('src/scripts/modules/02c-figures.js');
  assert(
    !figSrc.includes('a:1, b:1, c:0, C:0, k:1'),
    'WP-18: 02c-figures.js must not silently inject dummy {a:1, b:1, c:0, C:0, k:1} parameters'
  );

  console.log(`  ✓ WP-14/15/16/18: All 31 banks (${seenIds.size.toLocaleString()} items) pass Schema v2, chi² < 4.0, < 5% overlap & >= 250 figures/bank`);
}

// ── WP-19: Worksheets (>= 25 Qs, 0 dups), 768/768 PDFs >= 35 KB & Downloads Cleanup
{
  const satDiag = JSON.parse(read('tools/worksheet_gen/topics/sat/0.01-diagnostic-and-exam-strategy.json'));
  const satQs = satDiag.sections.flatMap((s) => s.questions);
  assert(satQs.length >= 45, `WP-19: sat/0.01 diagnostic must have >= 45 questions, found ${satQs.length}`);

  const tpRoot = path.join(ROOT, 'tools/worksheet_gen/topics');
  let wsCount = 0;
  for (const tr of fs.readdirSync(tpRoot).sort()) {
    const dp = path.join(tpRoot, tr);
    if (!fs.statSync(dp).isDirectory()) continue;
    for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.json'))) {
      wsCount++;
      const ws = JSON.parse(fs.readFileSync(path.join(dp, f), 'utf8'));
      const qs = (ws.sections || []).flatMap((s) => s.questions || []);
      assert(qs.length >= 25, `WP-19: ${tr}/${f} has only ${qs.length} questions (< 25 minimum)`);
      const seen = new Set();
      for (const q of qs) {
        const key = String(q.q || q.text || '').toLowerCase().replace(/\s+/g, ' ').trim();
        assert(!seen.has(key), `WP-19: Intra-worksheet duplicate question in ${tr}/${f}`);
        seen.add(key);
      }
    }
  }

  const dlRoot = path.join(ROOT, 'public/downloads');
  let pdfCount = 0;
  for (const tr of fs.readdirSync(dlRoot).sort()) {
    const dp = path.join(dlRoot, tr);
    if (!fs.statSync(dp).isDirectory()) continue;
    for (const f of fs.readdirSync(dp).filter((x) => x.endsWith('.pdf'))) {
      pdfCount++;
      const sz = fs.statSync(path.join(dp, f)).size;
      assert(sz >= 35000, `WP-19: Stub PDF detected (${sz} bytes < 35 KB): public/downloads/${tr}/${f}`);
    }
  }
  assert(pdfCount >= 768, `WP-19: Expected >= 768 PDFs in public/downloads/, found ${pdfCount}`);
  assert(
    !exists('public/downloads/sat/generate_all_sat_pdfs.ipynb'),
    'WP-19: Stray Jupyter notebook public/downloads/sat/generate_all_sat_pdfs.ipynb must be removed'
  );

  for (const f of fs.readdirSync(path.join(dlRoot, 'linalg')).filter((x) => x.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(dlRoot, 'linalg', f), 'utf8');
    const visibleHtml = html.replace(/<script[\s\S]*?<\/script>/gi, '');
    assert(!visibleHtml.includes('\\('), `WP-19: Raw unrendered \\( math delimiter in public/downloads/linalg/${f}`);
  }

  console.log(`  ✓ WP-19: ${wsCount} worksheets (>= 25 unique Qs each) & ${pdfCount}/${pdfCount} PDFs >= 35 KB verified`);
}

// ── WP-17 & WP-20: Blocking CI Gates & Pre-Push Hook ────────────────────────
{
  assert(exists('scripts/validate-katex-strict.js'), 'WP-17: scripts/validate-katex-strict.js must exist');
  assert(exists('scripts/validate-figures.js'), 'WP-18: scripts/validate-figures.js must exist');

  for (const wf of ['.github/workflows/pr-checks.yml', '.github/workflows/deploy.yml']) {
    const yml = read(wf);
    assert(!/continue-on-error:\s*true/i.test(yml), `WP-20: ${wf} must not use continue-on-error: true`);
    for (const gate of [
      'validate-content.js',
      'validate-ix.js',
      'validate-banks.js',
      'validate-katex-strict.js',
      'validate-figures.js',
      'npm run test:unit'
    ]) {
      assert(yml.includes(gate), `WP-20: ${wf} missing blocking gate "${gate}"`);
    }
  }

  assert(exists('.githooks/pre-push'), 'WP-20: .githooks/pre-push must exist');
  const hookMode = fs.statSync(path.join(ROOT, '.githooks/pre-push')).mode;
  assert((hookMode & 0o111) !== 0, 'WP-20: .githooks/pre-push must be executable (chmod +x)');
  console.log('  ✓ WP-17/20: Strict KaTeX gate, blocking CI workflows & executable .githooks/pre-push verified');
}

console.log('✅ ALL Wave 1 (WP-10 through WP-20) verification checks PASSED!');
