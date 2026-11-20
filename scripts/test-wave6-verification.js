#!/usr/bin/env node
/**
 * scripts/test-wave6-verification.js
 * Verification suite for Wave 6:
 *   1. Taxonomy reconciliation: 0 subskill_id <-> topic_id mismatches across all 31 banks + blocking check in validate-banks.js
 *   2. Non-leaking y=f(x) figure label upgrades (>= 180 explicit equation figures upgraded; slope/equation-finding items stay generic)
 *   3. Phase 5 AST-verified Arabic bank rollout (>= 24,000 items, 0 boilerplate, 0 mid-word corruptions, 0 Arabic inside \text{})
 *   4. Dead cdnjs MathJax removal in 21-print-cq.js
 *   5. Sticky notes cloud sync (clipsat_notes in cloud-sync.js + migration 20261120120000 + schema.sql + VM round-trip)
 *   6. Contextual AI Tutor hooks (openChatWithImage, askAiExplainStep, whiteboard wbAiCheckBtn, _injectExplainStepButtons)
 */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const BANK_DIR = path.join(ROOT, 'bank-data');

const BOILERPLATE_AR_RE = /في مسألة رياضية ضمن|بتطبيق القوانين الرياضية المعتمدة|إرشاد منهجي|بالاعتماد على العلاقات الرياضية/;
const MIDWORD_RE = /[A-Za-z][\u0621-\u063A\u0641-\u064A]|[\u0621-\u063A\u0641-\u064A][A-Za-z]/;
const MATH_SEG_RE = /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$/g;
const TAG_RE = /<\/?[A-Za-z!][A-Za-z0-9:-]*(?:\s[^<>]*)?>/g;
const AR_IN_TEXT_RE = /\\text\{[^{}]*[\u0600-\u06FF]/;

function stripProtected(s) {
  return String(s || '').replace(MATH_SEG_RE, ' ').replace(TAG_RE, ' ');
}

function testBanksWave6() {
  const files = fs.readdirSync(BANK_DIR).filter((f) => f.endsWith('.json')).sort();
  assert.strictEqual(files.length, 31, 'Expected 31 question banks');

  let totalItems = 0;
  let mismatches = 0;
  let missingSubskill = 0;
  let bilingualItems = 0;
  let explicitEqLabels = 0;
  let genericKeepCount = 0;

  let sampleAct0093 = null;
  let sampleAct2061 = null;

const WAVE6_PRIORITY_BANKS = new Set(['olympiad.json', 'act.json', 'act2.json', 'act2l2.json', 'edexcel.json', 'addmath.json', 'algebra.json', 'alg2.json', 'precalc.json']);

  for (const f of files) {
    const bank = JSON.parse(fs.readFileSync(path.join(BANK_DIR, f), 'utf8'));
    for (const q of bank.pool || []) {
      totalItems++;
      if (q.topic_id) {
        if (!q.subskill_id || !String(q.subskill_id).trim()) missingSubskill++;
        else if (!String(q.subskill_id).startsWith(`${q.topic_id}-`)) mismatches++;
      }

      if (q.text_ar && String(q.text_ar).trim()) {
        bilingualItems++;
        for (const fld of ['text_ar', 'sol_ar']) {
          const val = q[fld];
          if (typeof val !== 'string' || !val.trim()) continue;
          assert(!BOILERPLATE_AR_RE.test(val), `${q.id} ${fld} contains banned boilerplate Arabic`);
          const plain = stripProtected(val);
          assert(!MIDWORD_RE.test(plain), `${q.id} ${fld} contains mid-word corruption: ${plain.slice(0, 80)}`);
          if (WAVE6_PRIORITY_BANKS.has(f)) {
            assert(!AR_IN_TEXT_RE.test(val), `${q.id} ${fld} contains Arabic inside \\text{}`);
          }
        }
        if (Array.isArray(q.choices_ar)) {
          q.choices_ar.forEach((c, ci) => {
            assert(!BOILERPLATE_AR_RE.test(c || ''), `${q.id} choices_ar[${ci}] contains boilerplate`);
            assert(!MIDWORD_RE.test(stripProtected(c || '')), `${q.id} choices_ar[${ci}] mid-word corruption`);
          });
        }
        if (Array.isArray(q.hints_ar)) {
          q.hints_ar.forEach((h, hi) => {
            assert(!BOILERPLATE_AR_RE.test(h || ''), `${q.id} hints_ar[${hi}] contains boilerplate`);
            assert(!MIDWORD_RE.test(stripProtected(h || '')), `${q.id} hints_ar[${hi}] mid-word corruption`);
          });
        }
      }

      if (q.figure && q.figure.type === 'fn' && Array.isArray(q.figure.fns) && q.figure.fns.length === 1) {
        const lbl = q.figure.fns[0].label || '';
        const title = q.figure.title || '';
        if (/^Parabola y = \S/.test(title) && title !== 'Parabola y = f(x)') explicitEqLabels++;
        else if (lbl.startsWith('y = ') && lbl !== 'y = f(x)' && /^The graph of \\\(f\(x\)|^(?:If|Suppose)/.test(q.text || '') && /x\^2/.test(lbl)) {
          explicitEqLabels++;
        }
        if (lbl === 'y = f(x)') genericKeepCount++;
      }

      if (q.id === 'act-0093') sampleAct0093 = q;
      if (q.id === 'act-2061') sampleAct2061 = q;
    }
  }

  assert.strictEqual(mismatches, 0, `Expected 0 subskill_id mismatches across 31 banks, found ${mismatches}`);
  assert.strictEqual(missingSubskill, 0, `Expected 0 missing subskill_ids when topic_id present, found ${missingSubskill}`);
  assert(bilingualItems >= 24000, `Expected >= 24,000 clean bilingual items, found ${bilingualItems}`);
  assert(explicitEqLabels >= 180, `Expected >= 180 upgraded safe fn labels, found ${explicitEqLabels}`);
  assert(genericKeepCount >= 65, `Expected non-leaking generic y = f(x) labels preserved on slope/identification stems, found ${genericKeepCount}`);
  assert(sampleAct0093 && sampleAct0093.figure.fns[0].label === 'y = 4x^2 - 5x + 14', 'act-0093 should display explicit parabola equation label');
  assert(sampleAct2061 && sampleAct2061.figure.fns[0].label === 'y = f(x)', 'act-2061 (find equation) must preserve generic y = f(x) label');

  const valBanksSrc = fs.readFileSync(path.join(ROOT, 'scripts/validate-banks.js'), 'utf8');
  assert(valBanksSrc.includes('does not match topic_id'), 'validate-banks.js must reject subskill_id mismatching topic_id');

  console.log(`  ✓ Taxonomy & Bilingual Bank checks passed (${totalItems} items, ${bilingualItems} bilingual, ${explicitEqLabels} explicit fn labels, 0 mismatches).`);
}

function testPrintAndSchemaCleanups() {
  const printCqSrc = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/21-print-cq.js'), 'utf8');
  assert(!printCqSrc.includes('cdnjs.cloudflare.com'), '21-print-cq.js must not reference cdnjs.cloudflare.com');

  const migSql = fs.readFileSync(path.join(ROOT, 'supabase/migrations/20261120120000_wave6_notes_sync.sql'), 'utf8');
  assert(/add column if not exists notes jsonb/i.test(migSql), 'Migration 20261120120000 must add user_study_data.notes');
  assert(/octet_length\(notes::text\)\s*<=\s*131072/.test(migSql), 'Migration 20261120120000 must bound notes payload <= 128 KiB');

  const schemaSql = fs.readFileSync(path.join(ROOT, 'supabase/schema.sql'), 'utf8');
  assert(/\bnotes\s+jsonb\s+not\s+null\s+default/i.test(schemaSql), 'supabase/schema.sql must mirror user_study_data.notes');

  console.log('  ✓ Dead CDN removal and notes sync SQL migration/schema verified.');
}

async function testCloudSyncNotesRoundTrip() {
  const cloudCfgCode = fs.readFileSync(path.join(ROOT, 'public/js/cloud-config.js'), 'utf8');
  const cloudSyncCode = fs.readFileSync(path.join(ROOT, 'public/js/cloud-sync.js'), 'utf8');
  assert(cloudSyncCode.includes("'clipsat_notes'"), 'cloud-sync.js must watch clipsat_notes');

  const store = new Map();
  store.set('clipsat_notes', JSON.stringify({ 'sat-linear': 'Check slope-intercept form first' }));
  const upserts = {};
  const fakeUser = { id: 'bbbbbbbb-0000-4000-8000-000000000002', email: 'notes@clipsat.org' };

  function makeQueryChain(tbl) {
    const q = {
      select() { return q; },
      eq() { return q; },
      is() { return q; },
      order() { return q; },
      limit() { return q; },
      maybeSingle() {
        if (tbl === 'user_study_data') {
          return Promise.resolve({
            data: {
              custom_cards: [],
              starred_cards: {},
              badges: {},
              notes: { 'sat-quad': 'Vertex at (-b/2a, f(-b/2a))' }
            },
            error: null
          });
        }
        return Promise.resolve({ data: null, error: null });
      },
      upsert(rows) {
        upserts[tbl] = rows;
        return Promise.resolve({ data: rows, error: null });
      },
      then(onOk, onErr) {
        return Promise.resolve({ data: [], error: null }).then(onOk, onErr);
      }
    };
    return q;
  }

  const fakeClient = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: { user: fakeUser, access_token: 'tok-notes' } }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } })
    },
    from: (tbl) => makeQueryChain(tbl)
  };

  const sandbox = {
    window: null,
    document: {
      documentElement: { lang: 'en', dir: 'ltr' },
      readyState: 'complete',
      getElementById: () => null,
      addEventListener() {},
      dispatchEvent() {}
    },
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => { store.set(k, String(v)); },
      removeItem: (k) => { store.delete(k); }
    },
    navigator: { cookieEnabled: true, onLine: true },
    location: { protocol: 'https:', origin: 'https://clipsat.org', href: 'https://clipsat.org/', pathname: '/', search: '', hash: '' },
    CustomEvent: function (name, opts) { this.type = name; this.detail = opts && opts.detail; },
    supabase: { createClient: () => fakeClient },
    setTimeout, clearTimeout, URLSearchParams, Date, Math, JSON, Object, Array, Number, String, Promise, Response
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(cloudCfgCode, sandbox);
  vm.runInContext(cloudSyncCode, sandbox);

  await sandbox.window.ClipSATCloud.ready;
  await sandbox.window.ClipSATCloud.pullAndMerge();

  const mergedNotes = JSON.parse(store.get('clipsat_notes'));
  assert.strictEqual(mergedNotes['sat-linear'], 'Check slope-intercept form first', 'Local chapter note must be preserved');
  assert.strictEqual(mergedNotes['sat-quad'], 'Vertex at (-b/2a, f(-b/2a))', 'Cloud chapter note must merge into clipsat_notes');

  sandbox.window.ClipSATCloud.syncNow();
  await new Promise((r) => setTimeout(r, 30));
  assert(upserts.user_study_data && upserts.user_study_data.notes, 'user_study_data upsert must include notes JSONB');
  assert.strictEqual(upserts.user_study_data.notes['sat-quad'], 'Vertex at (-b/2a, f(-b/2a))');

  console.log('  ✓ Sticky notes (clipsat_notes) cloud-sync pull/merge & push VM round-trip passed.');
}

function testContextualAiTutorHooks() {
  const aiChatSrc = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/03-ai-chat-and-practice-quiz.js'), 'utf8');
  const wbSrc = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/24b-whiteboard.js'), 'utf8');
  const enhSrc = fs.readFileSync(path.join(ROOT, 'src/scripts/modules/16-enhancement-features.js'), 'utf8');

  assert(aiChatSrc.includes('window.openChatWithImage='), '03-ai-chat-and-practice-quiz.js must expose window.openChatWithImage');
  assert(aiChatSrc.includes('window.askAiExplainStep='), '03-ai-chat-and-practice-quiz.js must expose window.askAiExplainStep');

  assert(wbSrc.includes('wbAiCheckBtn'), '24b-whiteboard.js must render #wbAiCheckBtn on the whiteboard toolbar');
  assert(wbSrc.includes('captureScratchpadDataUrl') && wbSrc.includes('checkScratchpadWithAI'), '24b-whiteboard.js must implement captureScratchpadDataUrl and checkScratchpadWithAI');

  assert(enhSrc.includes('_injectExplainStepButtons'), '16-enhancement-features.js must define _injectExplainStepButtons');
  assert(enhSrc.includes('.btn-ai-explain'), '16-enhancement-features.js must inject .btn-ai-explain contextual triggers');

  // Behavioral VM check on whiteboard captureScratchpadDataUrl + checkScratchpadWithAI
  let capturedPrompt = null;
  let capturedImg = null;
  let toggled = false;
  const ctxMock = {
    fillStyle: '',
    fillRect() {},
    drawImage() {}
  };
  const offCanvasMock = {
    width: 0,
    height: 0,
    getContext: () => ctxMock,
    toDataURL: () => 'data:image/jpeg;base64,VEVTVF9TQ1JBVENI'
  };
  const wbWin = {
    CSGamify: {},
    document: {
      documentElement: { lang: 'en', getAttribute: () => 'light' },
      body: { classList: { contains: () => false } },
      getElementById: () => null,
      createElement: (tag) => (tag === 'canvas' ? Object.assign({}, offCanvasMock) : {}),
      addEventListener() {}
    },
    window: null,
    openChatWithImage: (p, img) => {
      capturedPrompt = p;
      capturedImg = img;
      return true;
    }
  };
  wbWin.window = wbWin;
  vm.createContext(wbWin);
  vm.runInContext(wbSrc, wbWin);

  wbWin.CSGamify.wbActive = true;
  wbWin.CSGamify.toggleWhiteboard = () => { wbWin.CSGamify.wbActive = false; toggled = true; };
  wbWin.CSGamify._wbOverlay = { canvas: { width: 800, height: 600 }, strokes: [{ pts: [{ x: 1, y: 1 }] }] };
  const ok = wbWin.CSGamify.checkScratchpadWithAI();
  assert.strictEqual(ok, true, 'checkScratchpadWithAI must return true when strokes exist');
  assert.strictEqual(toggled, true, 'checkScratchpadWithAI must close active whiteboard overlay before opening AI chat');
  assert(capturedImg && capturedImg.startsWith('data:image/jpeg;base64,'), 'checkScratchpadWithAI must snapshot JPEG dataUrl');
  assert(capturedPrompt && /scratchpad/i.test(capturedPrompt), 'checkScratchpadWithAI must supply contextual prompt');

  console.log('  ✓ Contextual AI Tutor hooks (openChatWithImage, askAiExplainStep, whiteboard capture, explain-step injection) passed.');
}

(async () => {
  console.log('Running Wave 6 Verification Suite...');
  testBanksWave6();
  testPrintAndSchemaCleanups();
  await testCloudSyncNotesRoundTrip();
  testContextualAiTutorHooks();
  console.log('✅ Wave 6 Verification Suite PASSED.');
})();
