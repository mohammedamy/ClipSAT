#!/usr/bin/env node
// scripts/ci/validate-schema-v2.mjs — CI Gate #1: Schema v2, Unique ID & Docs Source-of-Truth Gate

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const steps = [
  ['Course JSON Schema & Chapter Integrity', ['scripts/validate-content.js']],
  ['Interactive Activity Data Schema', ['scripts/validate-ix.js']],
  ['Canonical Bank Schema v2 & Global Unique IDs', ['scripts/validate-banks.js']],
  ['Single Source-of-Truth Documentation Sync', ['scripts/sync-docs.js', '--check']]
];

for (const [label, args] of steps) {
  const res = spawnSync(process.execPath, args, { cwd: ROOT, stdio: 'inherit' });
  if (res.status !== 0) {
    console.error(`❌ CI Gate #1 failed at step: ${label}`);
    process.exit(res.status || 1);
  }
}

console.log('✅ CI Gate #1 PASSED: Schema v2, unique IDs, interactive schemas & documentation sync verified.');
