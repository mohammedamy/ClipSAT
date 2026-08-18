#!/usr/bin/env node
/**
 * validate-content.js — ClipSAT WP5 (docs/PHASE1-2_TARGET_ARCHITECTURE.md, Phase 1 principle #12)
 *
 * Validates every content/{track}/*.json file against course_schema.json using ajv, and also
 * validates the schema's own `examples` entries (so the schema can't silently drift from its own
 * documentation). Wired into `npm run build` so CI catches a malformed chapter file before it
 * ships, instead of a runtime template failing on missing/misshapen data.
 *
 * There is no content/ directory yet as of WP5 — this gate is intentionally being put in place
 * BEFORE any content exists to validate, so it's already enforced when WP6 (the qudrat pilot
 * migration) starts writing the first real chapter files.
 *
 * Usage: node scripts/validate-content.js   (exit 0 = all valid / nothing to validate, exit 1 = errors)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const ROOT = path.join(__dirname, '..');
const SCHEMA_PATH = path.join(ROOT, 'course_schema.json');
const CONTENT_DIR = path.join(ROOT, 'content');

const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));

// draft-07, matches course_schema.json's $schema
const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

function formatErrors(errors) {
  return errors
    .map((e) => `    ${e.instancePath || '(root)'} ${e.message}${e.params ? ' ' + JSON.stringify(e.params) : ''}`)
    .join('\n');
}

let ok = true;

// 1. Validate the schema's own documented examples — catches the schema and its documentation
//    drifting apart (an example that no longer matches the schema it's supposed to illustrate).
if (Array.isArray(schema.examples)) {
  schema.examples.forEach((example, i) => {
    if (!validate(example)) {
      ok = false;
      console.error(`❌ course_schema.json examples[${i}] (id: ${example.id || '?'}) failed validation:`);
      console.error(formatErrors(validate.errors));
    }
  });
  if (ok) console.log(`✅ course_schema.json's ${schema.examples.length} example(s) validate against itself.`);
}

// 2. Validate every real content file, if content/ exists yet.
let fileCount = 0;
if (fs.existsSync(CONTENT_DIR)) {
  const tracks = fs.readdirSync(CONTENT_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const track of tracks) {
    const trackDir = path.join(CONTENT_DIR, track.name);
    const files = fs.readdirSync(trackDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      fileCount++;
      const filePath = path.join(trackDir, file);
      let data;
      try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        ok = false;
        console.error(`❌ ${path.relative(ROOT, filePath)}: invalid JSON — ${e.message}`);
        continue;
      }
      if (!validate(data)) {
        ok = false;
        console.error(`❌ ${path.relative(ROOT, filePath)} failed schema validation:`);
        console.error(formatErrors(validate.errors));
      }
    }
  }
}

if (fileCount === 0) {
  console.log('ℹ️  No content/{track}/*.json files found yet — nothing to validate (expected until WP6 starts).');
} else {
  console.log(`Checked ${fileCount} content file(s).`);
}

if (!ok) {
  console.error('\nSchema validation failed — see errors above.');
  process.exit(1);
}
console.log('✅ Content validation passed.');
