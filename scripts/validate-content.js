#!/usr/bin/env node
/**
 * validate-content.js — ClipSAT WP5/WP6 (docs/PHASE1-2_TARGET_ARCHITECTURE.md, Phase 1 principle #12)
 *
 * Validates content/{track}/_meta.json against course_schema.json's courseMeta definition, and every
 * content/{track}/{chapter-slug}.json against its chapter definition — one chapter per file (docs/
 * PHASE1-2_TARGET_ARCHITECTURE.md §2.2), so this deliberately does NOT validate a single whole-course
 * document; there isn't one on disk. Also validates the schema's own top-level `examples` (a whole-course
 * illustration) against the full schema, so the schema and its documentation can't silently drift apart.
 *
 * Wired into `npm run build` so CI catches a malformed chapter file before it ships, instead of a runtime
 * template failing on missing/misshapen data.
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

const ajv = new Ajv({ allErrors: true, strict: false });
ajv.addSchema(schema, schema.$id);
const validateWholeCourse = ajv.compile(schema); // for the schema's own `examples` only
const validateCourseMeta = ajv.compile({ $ref: `${schema.$id}#/definitions/courseMeta` });
const validateChapter = ajv.compile({ $ref: `${schema.$id}#/definitions/chapter` });

function formatErrors(errors) {
  return errors
    .map((e) => `    ${e.instancePath || '(root)'} ${e.message}${e.params ? ' ' + JSON.stringify(e.params) : ''}`)
    .join('\n');
}

let ok = true;

// 1. Validate the schema's own documented examples (whole-course shape, illustration only).
if (Array.isArray(schema.examples)) {
  schema.examples.forEach((example, i) => {
    if (!validateWholeCourse(example)) {
      ok = false;
      console.error(`❌ course_schema.json examples[${i}] (id: ${example.id || '?'}) failed validation:`);
      console.error(formatErrors(validateWholeCourse.errors));
    }
  });
  if (ok) console.log(`✅ course_schema.json's ${schema.examples.length} example(s) validate against itself.`);
}

// 2. Validate every real content file, if content/ exists yet — one chapter per file, plus one
//    _meta.json per track holding course-level metadata.
let metaCount = 0;
let chapterCount = 0;
if (fs.existsSync(CONTENT_DIR)) {
  const tracks = fs.readdirSync(CONTENT_DIR, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const track of tracks) {
    const trackDir = path.join(CONTENT_DIR, track.name);
    const files = fs.readdirSync(trackDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      const filePath = path.join(trackDir, file);
      let data;
      try {
        data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } catch (e) {
        ok = false;
        console.error(`❌ ${path.relative(ROOT, filePath)}: invalid JSON — ${e.message}`);
        continue;
      }
      const isMeta = file === '_meta.json';
      const validator = isMeta ? validateCourseMeta : validateChapter;
      if (isMeta) metaCount++; else chapterCount++;
      if (!validator(data)) {
        ok = false;
        console.error(`❌ ${path.relative(ROOT, filePath)} failed schema validation (${isMeta ? 'courseMeta' : 'chapter'}):`);
        console.error(formatErrors(validator.errors));
      }
    }
  }
}

if (metaCount === 0 && chapterCount === 0) {
  console.log('ℹ️  No content/{track}/*.json files found yet — nothing to validate.');
} else {
  console.log(`Checked ${metaCount} _meta.json file(s) and ${chapterCount} chapter file(s).`);
}

if (!ok) {
  console.error('\nSchema validation failed — see errors above.');
  process.exit(1);
}
console.log('✅ Content validation passed.');
