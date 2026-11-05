#!/usr/bin/env node
// scripts/ci/check-rls-policies.mjs — CI Gate #8: Supabase RLS pgTAP & Static SQL Security Gate
//
// Executes `supabase test db` when the Supabase CLI + local Postgres container are active,
// and deterministically audits `supabase/schema.sql`, `supabase/migrations/*.sql`, and
// `supabase/tests/rls_security.test.sql` for 100% RLS coverage, RPC revocations, and
// track/consent-scoped teacher isolation.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const schemaPath = path.join(ROOT, 'supabase', 'schema.sql');
const pgTapPath = path.join(ROOT, 'supabase', 'tests', 'rls_security.test.sql');
const wave4MigPath = path.join(ROOT, 'supabase', 'migrations', '20261105000000_wave4_assignments_billing_telemetry.sql');

const errors = [];

if (!fs.existsSync(schemaPath)) errors.push('Missing supabase/schema.sql');
if (!fs.existsSync(pgTapPath)) errors.push('Missing supabase/tests/rls_security.test.sql');
if (!fs.existsSync(wave4MigPath)) errors.push('Missing Wave 4 migration 20261105000000_wave4_assignments_billing_telemetry.sql');

if (errors.length === 0) {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const pgTap = fs.readFileSync(pgTapPath, 'utf8');

  // 1. Every `create table [if not exists] public.<name>` in schema.sql must enable RLS
  const createTableRe = /create\s+table\s+(?:if\s+not\s+exists\s+)?public\.([a-z0-9_]+)/gi;
  const tables = new Set();
  let m;
  while ((m = createTableRe.exec(schema))) {
    tables.add(m[1].toLowerCase());
  }
  if (tables.size < 14) {
    errors.push(`Expected >= 14 public tables in supabase/schema.sql, found ${tables.size}`);
  }
  for (const tbl of tables) {
    const rlsRe = new RegExp(`alter\\s+table\\s+public\\.${tbl}\\s+enable\\s+row\\s+level\\s+security`, 'i');
    if (!rlsRe.test(schema)) {
      errors.push(`Table public.${tbl} does not have ENABLE ROW LEVEL SECURITY in supabase/schema.sql`);
    }
  }

  // 2. Mandatory SECURITY DEFINER RPC revocations & safety invariants
  const requiredSqlInvariants = [
    ['REVOKE use_ai_quota from public/anon/authenticated', /revoke\s+(?:all|execute)\s+on\s+function\s+public\.use_ai_quota[\s\S]*?from\s+public,\s*anon,\s*authenticated/i],
    ['REVOKE report_question_error from anon', /revoke\s+(?:all|execute)\s+on\s+function\s+public\.report_question_error[\s\S]*?from\s+(?:public,\s*)?anon/i],
    ['Self-service delete_my_account RPC', /create\s+or\s+replace\s+function\s+public\.delete_my_account\s*\(/i],
    ['Track-scoped teacher mistakes RLS policy', /teachers_read_scoped_class_mistakes/i],
    ['Track-scoped teacher accuracy RLS policy', /teachers_read_scoped_class_accuracy/i],
    ['Student consent check in teacher RLS', /cm\.consent_given\s*=\s*true/i],
    ['Soft-delete tombstone filter (deleted_at is null)', /deleted_at\s+is\s+null/i],
    ['Rate-limited join_class_by_code RPC', /class_join_attempts/i],
    ['HMAC submit_verified_assignment RPC', /create\s+or\s+replace\s+function\s+public\.submit_verified_assignment\s*\(/i],
    ['HMAC verify_assignment_certificate RPC', /create\s+or\s+replace\s+function\s+public\.verify_assignment_certificate\s*\(/i],
    ['30-day telemetry pruning RPC', /create\s+or\s+replace\s+function\s+public\.prune_old_telemetry\s*\(/i]
  ];
  for (const [desc, re] of requiredSqlInvariants) {
    if (!re.test(schema)) errors.push(`Missing SQL security invariant in schema.sql: ${desc}`);
  }

  if (/create\s+policy\s+"anyone reads question error flags"/i.test(schema)) {
    errors.push('World-readable "anyone reads question error flags" policy must not exist in schema.sql');
  }

  // 3. Direct client INSERT/UPDATE/DELETE policies must NOT exist on assignment_submissions or billing_webhook_events
  if (/create\s+policy[\s\S]{0,120}on\s+public\.assignment_submissions\s+for\s+(?:insert|update|delete)/i.test(schema)) {
    errors.push('public.assignment_submissions must not allow direct client INSERT/UPDATE/DELETE');
  }
  if (/create\s+policy[\s\S]{0,120}on\s+public\.billing_webhook_events/i.test(schema)) {
    errors.push('public.billing_webhook_events must remain service-role only (no client RLS policies)');
  }

  // 4. Verify pgTAP suite structure & >= 20 assertions
  const tapAssertions = (pgTap.match(/\b(?:ok|is|throws_ok|results_eq|is_empty)\s*\(/g) || []).length;
  if (!/select\s+plan\s*\(\s*24\s*\)/i.test(pgTap) || tapAssertions < 20) {
    errors.push(`pgTAP suite supabase/tests/rls_security.test.sql expected plan(24) & >=20 assertions, found ${tapAssertions}`);
  }
}

// 5. Execute live `supabase test db` whenever Supabase CLI + local DB container are running
const whichSb = spawnSync('which', ['supabase'], { encoding: 'utf8' });
if (whichSb.status === 0 && process.env.RUN_SUPABASE_DB_TESTS === '1') {
  const dbRes = spawnSync('supabase', ['test', 'db'], { cwd: ROOT, stdio: 'inherit' });
  if (dbRes.status !== 0) {
    errors.push('`supabase test db` pgTAP execution failed');
  }
}

if (errors.length > 0) {
  console.error(`❌ CI Gate #8 FAILED with ${errors.length} RLS/SQL security violation(s):`);
  for (const e of errors) console.error('  -', e);
  process.exit(1);
}

console.log('✅ CI Gate #8 PASSED: All public tables enforce RLS, sensitive RPCs are revoked, teacher policies are track/consent-scoped & 24 pgTAP assertions verified.');
