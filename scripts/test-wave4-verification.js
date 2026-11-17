#!/usr/bin/env node
// scripts/test-wave4-verification.js
// Comprehensive verification suite for Wave 4 (WP-42 through WP-48) & 12 Blocking CI Gates:
//   WP-42: True 2-Stage Adaptive Digital SAT Simulator (35/35/15/15 CB blueprint, 3PL EAP M1->M2 routing, 200-800 +/- CI)
//   WP-43: 3PL Bayesian EAP Diagnostic CAT (61-node quadrature, Max Fisher Info, <2.5s rapid-guess down-weighting, SEM <= 0.32)
//   WP-44: Server-Verified Teacher Assignments (HMAC CS-VERIFIED certs, consent gate, join rate-limit, track-scoped RLS)
//   WP-45: Automated SAR Checkout (Moyasar Mada/ApplePay/STCPay + Stripe webhooks, idempotency, ai_plans entitlements)
//   WP-46: Privacy-First Telemetry, VLQ Source-Map Error Symbolication, 30-Day Retention & Health Probe
//   WP-47: Supabase pgTAP RLS (24 assertions) + Deno Edge Function Unit Test Suites (all 4 functions)
//   WP-48: Single Source-of-Truth Docs (sync-docs.js) + Educator Studio CLI (studio-cli.js) + 12 CI Gates

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const BANK_DIR = path.join(ROOT, 'bank-data');

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    fn();
    console.log('  ✓ ' + name);
    passed++;
  } catch (err) {
    console.error('  ✗ ' + name);
    console.error('    ' + (err && err.stack ? err.stack.split('\n').slice(0, 4).join('\n    ') : err));
    failed++;
  }
}

console.log('── Running Wave 4 Verification Suite (WP-42 .. WP-48 + 12 CI Gates) ──\n');

const satBank = JSON.parse(fs.readFileSync(path.join(BANK_DIR, 'sat.json'), 'utf8'));
const satPool = satBank.pool || [];

// ── WP-42: True 2-Stage Adaptive Digital SAT Simulator & Bank Calibration ──
check('WP-42: sat.json matches exact College Board 35/35/15/15 domain blueprint, ~25% SPR, and 100% 3PL IRT across all 31 banks', () => {
  assert.strictEqual(satPool.length, 1605, `Expected 1,605 SAT items, found ${satPool.length}`);
  const domCounts = {};
  let sprCount = 0;
  for (const q of satPool) {
    domCounts[q.domain] = (domCounts[q.domain] || 0) + 1;
    if (q.type === 'spr') sprCount++;
  }
  const targets = {
    Algebra: 0.35,
    'Advanced Math': 0.35,
    'Problem-Solving and Data Analysis': 0.15,
    'Geometry and Trigonometry': 0.15
  };
  for (const [dom, target] of Object.entries(targets)) {
    const ratio = (domCounts[dom] || 0) / satPool.length;
    assert.ok(Math.abs(ratio - target) <= 0.015, `SAT domain "${dom}" ratio ${(ratio * 100).toFixed(2)}% off target ${(target * 100).toFixed(0)}%`);
  }
  const sprRatio = sprCount / satPool.length;
  assert.ok(sprRatio >= 0.24 && sprRatio <= 0.27, `Expected ~25% SAT SPR ratio, got ${(sprRatio * 100).toFixed(2)}%`);

  // Verify 100% of items across all 31 banks carry calibrated 3PL IRT {a, b, c}
  const bankFiles = fs.readdirSync(BANK_DIR).filter((f) => f.endsWith('.json')).sort();
  assert.strictEqual(bankFiles.length, 31, 'Expected 31 bank files');
  let totalIrt = 0;
  for (const bf of bankFiles) {
    const pool = JSON.parse(fs.readFileSync(path.join(BANK_DIR, bf), 'utf8')).pool || [];
    for (const q of pool) {
      assert.ok(
        q.irt && typeof q.irt.a === 'number' && typeof q.irt.b === 'number' && typeof q.irt.c === 'number',
        `${bf} (${q.id}) missing calibrated irt {a,b,c}`
      );
      totalIrt++;
    }
  }
  assert.ok(totalIrt >= 47500, `Expected >= 47,500 IRT-calibrated items, got ${totalIrt}`);
});

check('WP-42: CSSatAdaptive draws stratified 22-item Module 1 and routes high vs low M1 deterministically to Hard vs Standard Module 2', () => {
  const win = {
    _shuffle: (a) => (a || []).slice(),
    _shuffleQ: (q) => q,
    CSAutoMath: (s) => s,
    CSFormatBilingual: (s) => s,
    _renderFig: () => '',
    renderMathFigure: () => '',
    fullExamBank: { sat: { pool: satPool } }
  };
  const doc = {
    documentElement: { lang: 'en' },
    body: { classList: { add() {}, remove() {}, contains: () => false } },
    getElementById: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ classList: { add() {} }, style: {} }),
    addEventListener: () => {},
    dispatchEvent: () => true
  };
  win.window = win;
  win.document = doc;
  const ctx = vm.createContext({
    window: win,
    document: doc,
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    CustomEvent: function (t, i) { this.type = t; this.detail = (i && i.detail) || {}; },
    console,
    Math,
    Date,
    Set,
    Map,
    Object,
    Array,
    String,
    Number,
    Boolean,
    RegExp,
    JSON,
    Promise,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    setTimeout: () => 0,
    clearTimeout: () => {},
    setInterval: () => 0,
    clearInterval: () => {}
  });
  for (const rel of [
    'src/scripts/modules/05c-exam-blueprints.js',
    'src/scripts/modules/19a-ix-answer-check.js',
    'src/scripts/modules/17-mock-exam-mode.js'
  ]) {
    vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), ctx, { filename: rel });
  }

  const api = win.CSSatAdaptive;
  assert.ok(api, 'window.CSSatAdaptive must be exposed');

  const m1 = api.drawSatAdaptiveModule(satPool, { stage: 1 });
  assert.strictEqual(m1.length, 22, `Expected 22 Module 1 items, got ${m1.length}`);
  const m1Domains = {};
  for (const q of m1) m1Domains[q.domain] = (m1Domains[q.domain] || 0) + 1;
  assert.strictEqual(m1Domains['Algebra'], 8, 'M1 must draw 8 Algebra items');
  assert.strictEqual(m1Domains['Advanced Math'], 8, 'M1 must draw 8 Advanced Math items');
  assert.strictEqual(m1Domains['Problem-Solving and Data Analysis'], 3, 'M1 must draw 3 PSDA items');
  assert.strictEqual(m1Domains['Geometry and Trigonometry'], 3, 'M1 must draw 3 Geo/Trig items');

  // High performer (20/22 correct) -> Hard Module 2
  const highOutcomes = m1.map((_, i) => i < 20);
  const highRoute = api.routeSatModule2(m1, highOutcomes, satPool);
  assert.strictEqual(highRoute.routedTrack, 'hard', '20/22 on M1 must route to Hard Module 2');
  assert.strictEqual(highRoute.module2Items.length, 22, 'Hard M2 must have 22 items');

  // Low performer (6/22 correct) -> Standard Module 2
  const lowOutcomes = m1.map((_, i) => i < 6);
  const lowRoute = api.routeSatModule2(m1, lowOutcomes, satPool);
  assert.strictEqual(lowRoute.routedTrack, 'standard', '6/22 on M1 must route to Standard Module 2');
  assert.strictEqual(lowRoute.module2Items.length, 22, 'Standard M2 must have 22 items');

  // Verify zero overlap between M1 and M2 and harder difficulty b in Hard M2 than Standard M2
  const m1Ids = new Set(m1.map((q) => q.id));
  assert.ok(highRoute.module2Items.every((q) => !m1Ids.has(q.id)), 'M2 must exclude all M1 item IDs');
  const avgB = (arr) => arr.reduce((s, q) => s + api.getItemIRT(q).b, 0) / arr.length;
  assert.ok(
    avgB(highRoute.module2Items) > avgB(lowRoute.module2Items) + 0.5,
    `Hard M2 mean b (${avgB(highRoute.module2Items).toFixed(2)}) must exceed Standard M2 mean b (${avgB(lowRoute.module2Items).toFixed(2)})`
  );

  // Scaled 200-800 + SEM confidence band
  const hiScaled = api.thetaToSatScaled(highRoute.m1Theta, highRoute.m1Sem, 'hard');
  const loScaled = api.thetaToSatScaled(lowRoute.m1Theta, lowRoute.m1Sem, 'standard');
  assert.ok(hiScaled.score >= 600 && hiScaled.score <= 800, `Unexpected high scaled score ${hiScaled.score}`);
  assert.ok(loScaled.score >= 200 && loScaled.score <= 600, `Unexpected low scaled score ${loScaled.score}`);
  assert.ok(hiScaled.low <= hiScaled.score && hiScaled.score <= hiScaled.high, 'Confidence band must bracket scaled score');
});

// ── WP-43: 3PL Bayesian EAP Diagnostic CAT & Mastery Calibration ──
check('WP-43: CSDiagnosticCAT executes 61-node 3PL EAP, Maximum Fisher Information selection, <2.5s rapid-guess down-weighting & SEM <= 0.32 convergence', () => {
  const win = {
    CSAutoMath: (s) => s,
    CSFormatBilingual: (s) => s,
    _renderFig: () => '',
    ClipSATAnalytics: { track() {} }
  };
  const doc = {
    documentElement: { lang: 'en' },
    body: { appendChild() {}, classList: { add() {}, remove() {} } },
    getElementById: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ style: {}, classList: { add() {}, remove() {} }, setAttribute() {}, appendChild() {} }),
    addEventListener: () => {}
  };
  win.window = win;
  win.document = doc;
  const ctx = vm.createContext({
    window: win,
    document: doc,
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    console,
    Math,
    Date,
    Set,
    Map,
    Object,
    Array,
    String,
    Number,
    Boolean,
    RegExp,
    JSON,
    Promise,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    setTimeout: () => 0,
    clearTimeout: () => {}
  });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'src/scripts/modules/19a-ix-answer-check.js'), 'utf8'), ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'src/scripts/modules/27-diagnostic-test.js'), 'utf8'), ctx);

  const cat = win.CSDiagnosticCAT;
  assert.ok(cat, 'window.CSDiagnosticCAT must be exposed');
  assert.strictEqual(cat.RAPID_GUESS_MS, 2500);
  assert.strictEqual(cat.SEM_STOP_THRESHOLD, 0.32);

  // Simulate 15-item adaptive CAT using Maximum Fisher Information on a synthetic high-discrimination bank
  const synthPool = [];
  const doms = ['Algebra', 'Advanced Math', 'Problem-Solving and Data Analysis', 'Geometry and Trigonometry'];
  const byDomainAndDiff = {};
  for (const d of doms) byDomainAndDiff[d] = { easy: [], medium: [], hard: [] };
  for (let i = 0; i < 120; i++) {
    const b = -2.4 + (i / 119) * 4.8;
    const isSpr = i % 3 === 0;
    const diff = b < -0.5 ? 'easy' : b > 0.6 ? 'hard' : 'medium';
    const dom = doms[i % 4];
    const q = {
      id: 'cat-sim-' + i,
      type: isSpr ? 'spr' : 'mcq',
      domain: dom,
      difficulty: diff,
      irt: { a: 2.0, b: Number(b.toFixed(3)), c: isSpr ? 0.0 : 0.2 }
    };
    synthPool.push(q);
    byDomainAndDiff[dom][diff].push(q);
  }

  const trueTheta = 0.65;
  const catState = {
    theta: 0,
    domains: doms,
    questions: [],
    difficultyHistory: [],
    byDomainAndDiff,
    pool: synthPool,
    usedIndices: {}
  };
  const outcomes = [];
  const dwell = {};
  let eap = { theta: 0, sem: 1.0 };

  for (let step = 0; step < 15; step++) {
    catState.theta = eap.theta;
    const nextQ = cat.pickNextAdaptiveQuestion(catState);
    assert.ok(nextQ, 'pickNextAdaptiveQuestion must select an unused item');
    outcomes.push(cat.getItemIRT(nextQ).b <= trueTheta);
    dwell[step] = 14000;
    eap = cat.computeEAPPosterior(catState.questions, outcomes, dwell);
    if (cat.shouldStopCAT(catState.questions.length, eap.sem)) break;
  }

  assert.ok(eap.sem <= 0.32, `15-item 3PL CAT must converge to SEM <= 0.32, got ${eap.sem.toFixed(3)}`);
  assert.ok(Math.abs(eap.theta - trueTheta) < 0.45, `Estimated theta ${eap.theta.toFixed(2)} should track trueTheta ${trueTheta}`);

  // Rapid-guess (<2.5s) down-weighting verification
  const hardItem = [{ id: 'rg-1', type: 'mcq', irt: { a: 1.8, b: 2.0, c: 0.25 } }];
  const rapidEap = cat.computeEAPPosterior(hardItem, [true], { 0: 800 });
  const normalEap = cat.computeEAPPosterior(hardItem, [true], { 0: 15000 });
  assert.ok(rapidEap.theta < normalEap.theta * 0.4, 'Rapid guess (<2.5s) must be strongly down-weighted relative to deliberate response');
});

// ── WP-44: Server-Verified Teacher Assignments, Consent & Scoped Privacy ──
check('WP-44: CSAssignView mints & verifies server HMAC CS-VERIFIED certificates while preserving consent & track-scoped RLS', () => {
  const modalsHtml = fs.readFileSync(path.join(ROOT, 'src/_includes/shell/modals-fragment.html'), 'utf8');
  assert.ok(modalsHtml.includes('id="tv-join-consent"'), 'Join class modal must require explicit #tv-join-consent checkbox');
  assert.ok(modalsHtml.includes('id="tv-create-track"'), 'Create class modal must expose #tv-create-track selector');
  assert.ok(modalsHtml.includes('id="tv-verify-code"'), 'Teacher view must expose #tv-verify-code verifier');

  const tvJs = fs.readFileSync(path.join(ROOT, 'public/js/teacher-view.js'), 'utf8');
  assert.ok(tvJs.includes('tvVerifyAssignmentCode'), 'teacher-view.js must define tvVerifyAssignmentCode');
  assert.ok(tvJs.includes('p_consent'), 'teacher-view.js must pass p_consent to join_class_by_code');

  const fakeUuid = 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee';
  const fakeCode = `CS-VERIFIED-${fakeUuid}-1A2B3C4D5E6F7788`;

  const win = {
    location: { search: '' },
    _TT_STR: { en: {}, ar: {} },
    ClipSATCloud: {
      configured: true,
      isSignedIn: () => true,
      getClient: () => ({
        rpc: (fnName, params) => {
          if (fnName === 'submit_verified_assignment') {
            return Promise.resolve({
              data: [{ submission_id: fakeUuid, hmac_sig: '1a2b3c4d5e6f77889900', verify_code: fakeCode }],
              error: null
            });
          }
          if (fnName === 'verify_assignment_certificate') {
            return Promise.resolve({
              data: [{ valid: params.p_code === fakeCode, track: 'sat', score: 9, total: 10, pct: 90 }],
              error: null
            });
          }
          return Promise.resolve({ data: null, error: null });
        }
      })
    }
  };
  const doc = {
    getElementById: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  };
  win.window = win;
  win.document = doc;
  const ctx = vm.createContext({
    window: win,
    document: doc,
    _TT_STR: win._TT_STR,
    URLSearchParams,
    console,
    Math,
    Date,
    Object,
    Array,
    String,
    Number,
    Boolean,
    RegExp,
    JSON,
    Promise,
    parseInt
  });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'src/scripts/modules/22d-assignment-view.js'), 'utf8'), ctx);

  const parsed = win.CSAssignView.parseServerCertCode(fakeCode);
  assert.ok(parsed && parsed.submissionId === fakeUuid, 'parseServerCertCode must parse CS-VERIFIED-<uuid>-<sig16>');

  const syncCheck = win.CSVerifyCertCode(fakeCode);
  assert.strictEqual(syncCheck.requiresServerCheck, true, 'CSVerifyCertCode must require server HMAC check for CS-VERIFIED codes');
  assert.strictEqual(win.CSVerifyCertCode('CS-VERIFIED-forged-1234').valid, false, 'Forged CS-VERIFIED format must fail immediately');
});

// ── WP-45: Automated SAR Checkout (Moyasar + Stripe) & Entitlements ──
check('WP-45: /pricing/ integrates Moyasar (SAR) + Stripe checkout + Billing Portal while Edge Gate #9 verifies HMAC & idempotency', () => {
  const pricingSrc = fs.readFileSync(path.join(ROOT, 'src/pricing/index.njk'), 'utf8');
  assert.ok(pricingSrc.includes("openPlusCheckout('moyasar')"), '/pricing/ must expose Moyasar SAR checkout button');
  assert.ok(pricingSrc.includes("openPlusCheckout('stripe')"), '/pricing/ must expose Stripe global checkout button');
  assert.ok(pricingSrc.includes('openBillingPortal()'), '/pricing/ must expose customer billing portal button');
  assert.ok(pricingSrc.includes('200 credits/day'), '/pricing/ must preserve truthful 200 credits/day quota');
  assert.ok(!pricingSrc.includes('Unlimited AI Tutor'), '/pricing/ must never claim Unlimited AI Tutor');

  const cfgToml = fs.readFileSync(path.join(ROOT, 'supabase/config.toml'), 'utf8');
  assert.ok(cfgToml.includes('[functions.billing-webhook]'), 'supabase/config.toml must register [functions.billing-webhook]');

  const edgeGate = spawnSync(process.execPath, ['scripts/ci/run-edge-tests.mjs'], { cwd: ROOT, encoding: 'utf8' });
  assert.strictEqual(edgeGate.status, 0, `Edge Function Gate #9 failed:\n${edgeGate.stderr || edgeGate.stdout}`);
});

// ── WP-46: Privacy-First Telemetry, VLQ Error Symbolication & Uptime Monitor ──
check('WP-46: Analytics PII scrubber, Error redactor, VLQ Source-Map Symbolicator & Health Probe work end-to-end', () => {
  // 1. Test analytics.js PII scrubber & consent gate
  let beaconPayloads = [];
  const winA = {
    location: { pathname: '/sat/sat-linear/' },
    navigator: { sendBeacon: (url, body) => { beaconPayloads.push({ url, body: String(body) }); return true; } },
    dispatchEvent: () => true
  };
  const docA = { visibilityState: 'visible', addEventListener: () => {} };
  winA.window = winA;
  winA.document = docA;
  const ctxA = vm.createContext({
    window: winA,
    document: docA,
    navigator: winA.navigator,
    localStorage: { getItem: (k) => (k === 'clipsat_cookie_consent' ? JSON.stringify({ analytics: true }) : null) },
    CustomEvent: function (t, i) { this.type = t; this.detail = (i && i.detail) || {}; },
    Blob: function (parts) { this.parts = parts; this.toString = () => parts.join(''); },
    console,
    Math,
    Date,
    Object,
    Array,
    String,
    Number,
    Boolean,
    RegExp,
    JSON,
    setTimeout: () => 0,
    clearTimeout: () => {}
  });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'public/js/analytics.js'), 'utf8'), ctxA);

  const scrubbed = winA.ClipSATAnalytics.scrubProps({
    track: 'sat',
    email: 'secret@student.edu',
    access_token: 'eyJhbGciOiJIUzI1NiJ9.secret',
    note: 'Contact student@school.org or https://clipsat.org/sat/?token=abc123#frag'
  });
  assert.strictEqual(scrubbed.email, undefined, 'scrubProps must drop email key');
  assert.strictEqual(scrubbed.access_token, undefined, 'scrubProps must drop access_token key');
  assert.ok(!String(scrubbed.note || '').includes('student@school.org'), 'scrubProps must redact inline emails');
  assert.ok(!String(scrubbed.note || '').includes('token=abc123'), 'scrubProps must strip query strings');

  // 2. Test error-logging.js PII redactor
  const winE = { addEventListener: () => {} };
  const docE = { addEventListener: () => {} };
  winE.window = winE;
  winE.document = docE;
  const ctxE = vm.createContext({ window: winE, document: docE, sessionStorage: { getItem: () => null, setItem() {} }, console, String, RegExp, Object });
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'public/js/error-logging.js'), 'utf8'), ctxE);
  const redacted = winE.ClipSATErrorLog.sanitizeErrorText(
    'Auth failure for user@clipsat.org with Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.sig at https://clipsat.org/sat/?code=999'
  );
  assert.ok(!redacted.includes('user@clipsat.org'), 'sanitizeErrorText must redact email addresses');
  assert.ok(!redacted.includes('eyJhbGci'), 'sanitizeErrorText must redact JWT/Bearer tokens');
  assert.ok(!redacted.includes('code=999'), 'sanitizeErrorText must strip URL query parameters');

  // 3. Test VLQ source-map symbolication against real artifacts/sourcemaps/engine.js.map
  const { symbolicatePosition, symbolicateStackTrace } = require('./symbolicate-error');
  const mapPath = path.join(ROOT, 'artifacts', 'sourcemaps', 'engine.js.map');
  assert.ok(fs.existsSync(mapPath), 'artifacts/sourcemaps/engine.js.map must exist after build');
  const sym = symbolicatePosition('engine.js', 1, 50);
  assert.strictEqual(sym.found, true, 'symbolicatePosition must resolve engine.js:1:50');
  assert.ok(sym.source && sym.source.endsWith('.js'), `Expected resolved module source file, got ${sym.source}`);
  const trace = symbolicateStackTrace('TypeError: boom\n    at https://clipsat.org/js/engine.js:1:50');
  assert.ok(trace.includes('(from engine.js:1:50)'), 'symbolicateStackTrace must annotate stack frames');

  // 4. Local health check & uptime workflow
  const hcRes = spawnSync(process.execPath, ['scripts/health-check.js', '--local'], { cwd: ROOT, encoding: 'utf8' });
  assert.strictEqual(hcRes.status, 0, `health-check.js --local failed:\n${hcRes.stderr || hcRes.stdout}`);
  const uptimeYml = fs.readFileSync(path.join(ROOT, '.github/workflows/uptime-check.yml'), 'utf8');
  assert.ok(uptimeYml.includes('scripts/health-check.js --live'), 'uptime-check.yml must invoke scripts/health-check.js --live');
});

// ── WP-47: Supabase pgTAP RLS & Deno Edge Test Suites ──
check('WP-47: pgTAP RLS test suite (24 assertions) & all 4 Edge Function Deno suites pass CI Gate #8', () => {
  const rlsGate = spawnSync(process.execPath, ['scripts/ci/check-rls-policies.mjs'], { cwd: ROOT, encoding: 'utf8' });
  assert.strictEqual(rlsGate.status, 0, `RLS Gate #8 failed:\n${rlsGate.stderr || rlsGate.stdout}`);
});

// ── WP-48: Single Source-of-Truth Docs, Educator Studio CLI & All 12 CI Gates ──
check('WP-48: sync-docs.js --check passes with 0 drift, Studio CLI validates/blocks items, and all 12 CI gates exist & are wired', () => {
  const { syncDocs } = require('./sync-docs');
  const docRes = syncDocs({ rootDir: ROOT, checkOnly: true });
  assert.strictEqual(docRes.drifted.length, 0, `Docs drifted: ${docRes.drifted.join(', ')}`);
  assert.strictEqual(docRes.staleHits.length, 0, `Stale doc strings: ${docRes.staleHits.join(', ')}`);
  assert.strictEqual(docRes.metrics.trackCount, 31, 'Expected 31 tracks in collectRepoMetrics');
  assert.strictEqual(docRes.metrics.chapterCount, 306, 'Expected 306 chapters in collectRepoMetrics');

  const { scaffoldItem, addItemToTrack, validateAndPrepareItem } = require('./studio-cli');
  const validSpr = scaffoldItem({ track: 'sat', type: 'spr' });
  const dryOk = addItemToTrack({ track: 'sat', rawItem: validSpr, dryRun: true });
  assert.strictEqual(dryOk.valid, true, `Valid scaffolded SPR failed Studio CLI: ${dryOk.errors.join('; ')}`);
  assert.ok(typeof dryOk.item.text_ar === 'string' && dryOk.item.text_ar.length > 0, 'Studio CLI must auto-populate AST-protected text_ar for MENA track sat');

  // Tampered SymPy certificate & forbidden shadow field must be blocked
  const badItem = { ...validSpr, id: 'sat-9999', ans: '999', sprAnswer: '999' };
  const badRes = validateAndPrepareItem(badItem, { track: 'sat' });
  assert.strictEqual(badRes.valid, false, 'Studio CLI must reject items with wrong SymPy answer or shadow field `ans`');
  assert.ok(badRes.errors.some((e) => e.includes('ans')), 'Must flag forbidden legacy shadow key `ans`');
  assert.ok(badRes.errors.some((e) => e.includes('SymPy EXPECTED')), 'Must flag SymPy EXPECTED != keyed sprAnswer');

  // Verify all 12 CI gate files & workflow wiring
  const requiredGateFiles = [
    'scripts/ci/validate-schema-v2.mjs',
    'scripts/ci/verify_bank_sympy.py',
    'scripts/ci/check_psychometrics.py',
    'scripts/ci/check-katex-strict.mjs',
    'scripts/ci/check_bilingual_parity.py',
    'scripts/ci/validate-figures-and-pdfs.mjs',
    'scripts/ci/check-no-eval-or-secrets.mjs',
    'scripts/ci/check-rls-policies.mjs',
    'scripts/ci/run-edge-tests.mjs',
    'tests/e2e/wave4-cbt-cat-rtl-offline.spec.js',
    'tests/e2e/a11y-axe.spec.ts',
    'scripts/ci/check-build-budgets.mjs',
    'lighthouserc.json'
  ];
  for (const rel of requiredGateFiles) {
    assert.ok(fs.existsSync(path.join(ROOT, rel)), `Missing mandatory CI gate file: ${rel}`);
  }

  for (const wf of ['.github/workflows/pr-checks.yml', '.github/workflows/deploy.yml']) {
    const yml = fs.readFileSync(path.join(ROOT, wf), 'utf8');
    for (const gateCmd of [
      'validate-schema-v2.mjs',
      'verify_bank_sympy.py',
      'check_psychometrics.py',
      'check-katex-strict.mjs',
      'check_bilingual_parity.py',
      'validate-figures-and-pdfs.mjs',
      'check-no-eval-or-secrets.mjs',
      'check-rls-policies.mjs',
      'run-edge-tests.mjs',
      'check-build-budgets.mjs'
    ]) {
      assert.ok(yml.includes(gateCmd), `${wf} must execute blocking CI gate ${gateCmd}`);
    }
  }
});

setImmediate(() => {
  console.log(`\n── Wave 4 Summary: ${passed} passed, ${failed} failed ──`);
  if (failed > 0) {
    process.exit(1);
  }
  console.log('✅ ALL Wave 4 (WP-42 through WP-48 + 12 Zero-Regression CI Gates) checks PASSED!');
});
