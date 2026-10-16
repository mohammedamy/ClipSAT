#!/usr/bin/env node
"use strict";

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('── Running Assignment Completion & Verification Unit Tests ──');

const assignViewPath = path.join(__dirname, '..', 'src', 'scripts', 'modules', '22d-assignment-view.js');
assert(fs.existsSync(assignViewPath), '22d-assignment-view.js must exist');
const code = fs.readFileSync(assignViewPath, 'utf8');

// Execute module in simulated window
const mockDoc = {
  getElementById: () => null,
  addEventListener: () => {},
  documentElement: { lang: 'en', dir: 'ltr' }
};
const simWindow = {
  _TT_STR: { en: {}, ar: {} },
  _ttDir: () => 'ltr',
  _tt: (k) => k,
  location: { search: '' }
};

const fn = new Function('window', 'document', '_TT_STR', '_ttDir', '_tt', code);
fn(simWindow, mockDoc, simWindow._TT_STR, simWindow._ttDir, simWindow._tt);

assert.strictEqual(typeof simWindow.CSAssignView, 'object', 'CSAssignView must be exposed on window');
assert.strictEqual(typeof simWindow.CSAssignView.genCertCode, 'function', 'genCertCode must be exported');
assert.strictEqual(typeof simWindow.CSVerifyCertCode, 'function', 'CSVerifyCertCode must be exported on window');

// Test 1: Generate code and verify match
const codeSat = simWindow.CSAssignView.genCertCode('sat', 8, 10);
assert.ok(codeSat.startsWith('CLIP-SAT-8OF10-'), 'Code must format as CLIP-TRACK-SCOREOFN-HEX');
const verified = simWindow.CSVerifyCertCode(codeSat);
assert.strictEqual(verified.valid, true, 'Valid code must pass verification');
assert.strictEqual(verified.track, 'sat', 'Decoded track must match');
assert.strictEqual(verified.score, 8, 'Decoded score must match');
assert.strictEqual(verified.total, 10, 'Decoded total must match');
assert.strictEqual(verified.pct, 80, 'Decoded percentage must match');
console.log('  ✓ genCertCode generates verifiable cryptographic report string');

// Test 2: Anti-tamper detection
// Student tries to edit 8OF10 to 10OF10 without knowing checksum
const tamperedCode = codeSat.replace('8OF10', '10OF10');
const tamperedRes = simWindow.CSVerifyCertCode(tamperedCode);
assert.strictEqual(tamperedRes.valid, false, 'Tampered code must fail verification');
assert.strictEqual(tamperedRes.error, 'Tampered verification code');
console.log('  ✓ CSVerifyCertCode detects and rejects tampered scores');

// Test 3: Formatting error handling
const invalidRes = simWindow.CSVerifyCertCode('INVALID-STRING');
assert.strictEqual(invalidRes.valid, false, 'Malformed string must fail cleanly');
console.log('  ✓ CSVerifyCertCode gracefully handles malformed input');

console.log('\n✅ All Assignment Completion & Verification tests passed successfully!\n');
