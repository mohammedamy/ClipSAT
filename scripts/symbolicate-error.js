#!/usr/bin/env node
'use strict';

/**
 * scripts/symbolicate-error.js — Private Source Map Error Symbolicator (WP-46)
 *
 * Translates minified production stack traces or `bundle.js:line:col` coordinates
 * from `public.client_errors` into exact `src/scripts/modules/<file>.js:line:col`
 * positions using private source maps in `artifacts/sourcemaps/`.
 *
 * Usage:
 *   node scripts/symbolicate-error.js engine.js:1:4250
 *   node scripts/symbolicate-error.js --stack "TypeError: x is null\n at https://clipsat.org/js/mock-exam.js:1:1820"
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SOURCEMAP_DIR = path.join(ROOT, 'artifacts', 'sourcemaps');
const B64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const B64_MAP = {};
for (let i = 0; i < B64_CHARS.length; i++) B64_MAP[B64_CHARS[i]] = i;

function decodeVlqSegment(str, startIdx) {
  let idx = startIdx;
  const values = [];
  while (idx < str.length && str[idx] !== ',' && str[idx] !== ';') {
    let result = 0;
    let shift = 0;
    let continuation = true;
    while (continuation && idx < str.length) {
      const ch = str[idx++];
      const digit = B64_MAP[ch];
      if (digit === undefined) throw new Error(`Invalid Base64 VLQ char: ${ch}`);
      continuation = (digit & 32) !== 0;
      result += (digit & 31) << shift;
      shift += 5;
    }
    const isNeg = (result & 1) === 1;
    const shifted = result >>> 1;
    values.push(isNeg ? -shifted : shifted);
  }
  return { values, nextIdx: idx };
}

function decodeSourceMapLine(mapJson, targetGenLine1Based, targetGenCol0Based) {
  const mappings = String(mapJson.mappings || '');
  const sources = mapJson.sources || [];
  const names = mapJson.names || [];

  let genLine = 1;
  let idx = 0;
  let srcIdx = 0;
  let origLine = 0; // 0-based in V3 spec
  let origCol = 0;
  let nameIdx = 0;

  let bestMatch = null;

  while (idx < mappings.length) {
    if (mappings[idx] === ';') {
      if (genLine === targetGenLine1Based) break;
      genLine++;
      idx++;
      continue;
    }
    let genCol = 0;
    while (idx < mappings.length && mappings[idx] !== ';') {
      if (mappings[idx] === ',') {
        idx++;
        continue;
      }
      const { values, nextIdx } = decodeVlqSegment(mappings, idx);
      idx = nextIdx;
      if (!values.length) continue;

      genCol += values[0];
      if (values.length >= 4) {
        srcIdx += values[1];
        origLine += values[2];
        origCol += values[3];
        if (values.length >= 5) nameIdx += values[4];

        if (genLine === targetGenLine1Based && genCol <= targetGenCol0Based) {
          bestMatch = {
            generatedLine: genLine,
            generatedColumn: genCol,
            source: sources[srcIdx] || null,
            originalLine: origLine + 1,
            originalColumn: origCol,
            name: values.length >= 5 ? (names[nameIdx] || null) : (bestMatch && genCol === bestMatch.generatedColumn ? bestMatch.name : null),
          };
        }
      }
    }
    if (genLine === targetGenLine1Based) break;
  }

  return bestMatch;
}

function resolveModuleOffset(bundleName, originalLine1Based) {
  const offsetsPath = path.join(SOURCEMAP_DIR, `${bundleName}.modules.json`);
  if (!fs.existsSync(offsetsPath)) return null;
  const offsets = JSON.parse(fs.readFileSync(offsetsPath, 'utf8'));
  for (let i = offsets.length - 1; i >= 0; i--) {
    const entry = offsets[i];
    if (originalLine1Based >= entry.startLine) {
      return {
        module: entry.module,
        moduleLine: originalLine1Based - entry.startLine + 1,
      };
    }
  }
  return offsets[0] ? { module: offsets[0].module, moduleLine: originalLine1Based } : null;
}

function symbolicatePosition(bundleFile, line1Based, col1Based, customMapDir) {
  const mapDir = customMapDir || SOURCEMAP_DIR;
  const cleanBundle = path.basename(String(bundleFile || '').split('?')[0].split('#')[0]);
  const mapPath = path.join(mapDir, `${cleanBundle}.map`);
  if (!fs.existsSync(mapPath)) {
    return { found: false, bundle: cleanBundle, reason: `Source map not found: ${mapPath}` };
  }
  const mapJson = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const col0 = Math.max(0, (Number(col1Based) || 1) - 1);
  const hit = decodeSourceMapLine(mapJson, Math.max(1, Number(line1Based) || 1), col0);
  if (!hit) {
    return { found: false, bundle: cleanBundle, reason: 'No VLQ mapping matched position' };
  }

  const modResolved = customMapDir ? null : resolveModuleOffset(cleanBundle, hit.originalLine);
  return {
    found: true,
    bundle: cleanBundle,
    source: modResolved ? modResolved.module : hit.source,
    line: modResolved ? modResolved.moduleLine : hit.originalLine,
    column: hit.originalColumn + 1,
    bundleConcatenatedLine: hit.originalLine,
    symbol: hit.name || null,
  };
}

function symbolicateStackTrace(stackText, customMapDir) {
  const frameRe = /(?:https?:\/\/[^\s/]+)?\/?(?:public\/)?js\/([a-zA-Z0-9._-]+\.js):(\d+):(\d+)/g;
  return String(stackText || '').replace(frameRe, (full, bundle, ln, col) => {
    const sym = symbolicatePosition(bundle, Number(ln), Number(col), customMapDir);
    if (!sym.found) return full;
    const fnLabel = sym.symbol ? ` [${sym.symbol}]` : '';
    return `${sym.source}:${sym.line}:${sym.column}${fnLabel} (from ${bundle}:${ln}:${col})`;
  });
}

module.exports = {
  decodeVlqSegment,
  decodeSourceMapLine,
  symbolicatePosition,
  symbolicateStackTrace,
};

if (require.main === module) {
  const args = process.argv.slice(2);
  if (!args.length) {
    console.error('Usage: node scripts/symbolicate-error.js <bundle.js:line:col | --stack "...">');
    process.exit(1);
  }
  if (args[0] === '--stack') {
    console.log(symbolicateStackTrace(args.slice(1).join(' ')));
    process.exit(0);
  }
  const m = /^([^:]+):(\d+):(\d+)$/.exec(args[0]);
  if (!m) {
    console.log(symbolicateStackTrace(fs.existsSync(args[0]) ? fs.readFileSync(args[0], 'utf8') : args.join(' ')));
    process.exit(0);
  }
  const res = symbolicatePosition(m[1], Number(m[2]), Number(m[3]));
  console.log(JSON.stringify(res, null, 2));
  process.exit(res.found ? 0 : 1);
}
