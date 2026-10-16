#!/usr/bin/env node
"use strict";

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('── Running Calculator & Floating Desmos Unit Tests ──');

// 1. Verify src/calculator/index.njk
const njkPath = path.join(__dirname, '..', 'src', 'calculator', 'index.njk');
const njkContent = fs.readFileSync(njkPath, 'utf8');

assert(njkContent.includes('Desmos.GraphingCalculator'), 'index.njk must use Desmos.GraphingCalculator');
assert(njkContent.includes('keypad: true'), 'index.njk must enable on-screen keypad');
assert(njkContent.includes('expressions: true'), 'index.njk must enable expressions list');
assert(njkContent.includes('invertedColors: dark'), 'index.njk must support dark mode');
assert(njkContent.includes('apiInstance.setExpression'), 'index.njk must directly apply presets to live calculator');
assert(njkContent.includes('data-mode="distributions"'), 'index.njk must include Distributions mode button');
assert(njkContent.includes('_normCdf') && njkContent.includes('_invNorm'), 'index.njk must implement Normal CDF and invNorm');
assert(njkContent.includes('_binomPdf') && njkContent.includes('_poissonPdf'), 'index.njk must implement Binomial and Poisson');
assert(njkContent.includes('_tCdf') && njkContent.includes('_chi2Cdf'), 'index.njk must implement Student t and Chi-Square');
console.log('  ✓ /calculator/ page uses native Desmos API with keypad, expressions, presets, and statistical distributions suite');

// 2. Verify _site/calculator/index.html compiled output
const siteCalcPath = path.join(__dirname, '..', '_site', 'calculator', 'index.html');
assert(fs.existsSync(siteCalcPath), '_site/calculator/index.html must exist');
const siteCalcContent = fs.readFileSync(siteCalcPath, 'utf8');
assert(siteCalcContent.includes('desmos.com/api/v1.11/calculator.js'), 'Compiled calculator page must include Desmos API script');
console.log('  ✓ Compiled _site/calculator/index.html contains official Desmos API script tag');

// 3. Verify src/scripts/modules/20g-floating-calc.js
const fcPath = path.join(__dirname, '..', 'src', 'scripts', 'modules', '20g-floating-calc.js');
const fcContent = fs.readFileSync(fcPath, 'utf8');

assert(fcContent.includes('_ensureDesmosAPI'), 'Floating calc must have dynamic Desmos API loader');
assert(fcContent.includes('cs-fcalc-max-btn'), 'Floating calc must include maximize/expand button');
assert(fcContent.includes('cs-fcalc-presets-bar'), 'Floating calc must include quick presets bar');
assert(fcContent.includes('cs-fcalc-shield'), 'Floating calc must include drag shield against pointer trapping');
assert(fcContent.includes('_applyFloatingPreset'), 'Floating calc must handle equation presets');
assert(fcContent.includes('setFloatingCalcExpression'), 'Floating calc must expose setFloatingCalcExpression API');
assert(fcContent.includes('_toggleMaximize'), 'Floating calc must implement _toggleMaximize');
assert(fcContent.includes('ResizeObserver'), 'Floating calc must observe resize to auto-fit Desmos canvas');
console.log('  ✓ 20g-floating-calc.js includes Desmos API, maximize, drag shield, presets, and ResizeObserver');

// 4. Verify public/js/engine.js bundle
const enginePath = path.join(__dirname, '..', 'public', 'js', 'engine.js');
const engineContent = fs.readFileSync(enginePath, 'utf8');
assert(engineContent.includes('cs-fcalc-max-btn'), 'engine.js must contain floating calculator maximize button');
assert(engineContent.includes('cs-fcalc-presets-bar'), 'engine.js must contain presets bar');
assert(engineContent.includes('setFloatingCalcExpression'), 'engine.js must contain setFloatingCalcExpression');
console.log('  ✓ public/js/engine.js bundle contains full floating calculator implementation');

console.log('\n✅ All Calculator unit tests passed successfully!\n');
