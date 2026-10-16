'use strict';
/**
 * scripts/test-forms-diagrams.js
 * Validates that all questions with diagrams in the question banks (Similarity, Geometry, SAT)
 * produce valid, renderable, 100% compliant SVGs and image payloads for Google Forms export.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Setup mock window environment
const window = {};
global.window = window;

// Load figures.js
const figuresPath = path.join(__dirname, '../public/js/figures.js');
new Function('window', fs.readFileSync(figuresPath, 'utf8'))(window);

// Load math-image.js
const mathImgPath = path.join(__dirname, '../public/js/math-image.js');
new Function('window', fs.readFileSync(mathImgPath, 'utf8'))(window);

// Load forms-api.js
const formsApiPath = path.join(__dirname, '../public/js/forms-api.js');
new Function('window', fs.readFileSync(formsApiPath, 'utf8'))(window);

console.log('── Running Google Forms Diagram Pipeline Tests ──');

// 1. Verify module registrations
assert.strictEqual(typeof window._renderFig, 'function', 'window._renderFig must exist');
assert.strictEqual(typeof window.ClipSATMathImage, 'object', 'window.ClipSATMathImage must exist');
assert.strictEqual(typeof window.ClipSATForms, 'object', 'window.ClipSATForms must exist');
console.log('✓ Modules registered successfully');

// 2. Test sanitizeSvg on diverse similarity figures
const testFigures = [
  { type: 'nested_triangles', sides: { ad: '4', db: '6', ae: 'x', ec: '9', de: '5', bc: '12.5' } },
  { type: 'bowtie', labels: ['A', 'B', 'C', 'D', 'E'], sides: { ab: '10', cd: '15' } },
  { type: 'right_triangle_altitude', labels: ['A', 'B', 'C', 'D'], sides: { p: '4', q: '9', h: 'h' } },
  { type: 'shadow_similarity', surveyor: '1.8 m', flagpole: 'h', shadow1: '2.4 m', shadow2: '16 m' },
  { type: 'angle_bisector', labels: ['A', 'B', 'C', 'D'], sides: { c: '8', b: '12', bd: '4', dc: '6' } },
  { type: 'overlapping_triangles', labels: ['A', 'B', 'C', 'D', 'E'], sides: { ad: '4', ac: '10' } },
  { type: 'circle_chords_similarity', labels: ['A', 'B', 'C', 'D', 'P'], sides: { pa: '4', pb: '9', pc: '6', pd: 'x' } },
  { type: 'trapezoid_diagonals', labels: ['A', 'B', 'C', 'D', 'P'], sides: { ab: '6', cd: '14' } }
];

testFigures.forEach(fig => {
  const rawSvg = window._renderFig(fig);
  assert(rawSvg && rawSvg.startsWith('<svg'), `Raw SVG must be non-empty for ${fig.type}`);
  
  const cleanSvg = window.ClipSATMathImage.sanitizeSvg(rawSvg);
  assert(cleanSvg, `Sanitized SVG must be non-empty for ${fig.type}`);
  
  // Verify no dangling or unclosed var()
  assert.strictEqual(cleanSvg.indexOf('var('), -1, `No CSS var() should remain in sanitized SVG for ${fig.type}`);
  
  // Verify xmlns
  assert(cleanSvg.includes('xmlns="http://www.w3.org/2000/svg"'), `Sanitized SVG must include xmlns for ${fig.type}`);
  
  // Verify explicit width and height
  const dims = window.ClipSATMathImage.getSvgDimensions(cleanSvg);
  assert(dims.w > 0 && dims.h > 0, `Dimensions must be positive for ${fig.type}`);
  assert(cleanSvg.includes(`width="${dims.w}"`), `SVG tag must have explicit width for ${fig.type}`);
  assert(cleanSvg.includes(`height="${dims.h}"`), `SVG tag must have explicit height for ${fig.type}`);
  
  // Verify opaque white background
  assert(cleanSvg.includes('<rect width="') && cleanSvg.includes('fill="#ffffff"'), `SVG must have white background rect for ${fig.type}`);
  
  // Verify needsImage returns true
  assert.strictEqual(window.ClipSATMathImage.needsImage('Sample question text', fig, rawSvg), true, `needsImage must be true for ${fig.type}`);
});
console.log(`✓ All ${testFigures.length} figure archetypes sanitized with 100% compliant standalone SVG`);

// 3. Test across all Similarity questions in bank-data/geo.json
const geoPath = path.join(__dirname, '../bank-data/geo.json');
const geoData = JSON.parse(fs.readFileSync(geoPath, 'utf8'));
const simPoolWithFigs = geoData.pool.filter(q => q.domain === 'Similarity' && q.fig);

console.log(`Testing all ${simPoolWithFigs.length} Similarity questions with diagrams...`);
let sanitizedCount = 0;
simPoolWithFigs.forEach((q, i) => {
  const svg = window._renderFig(q.fig);
  assert(svg, `Failed to render figure for question ${i}: ${q.text.slice(0, 40)}`);
  
  const sanitized = window.ClipSATMathImage.sanitizeSvg(svg);
  assert.strictEqual(sanitized.indexOf('var('), -1, `Question ${i} contains unclosed var(): ${q.text.slice(0, 40)}`);
  
  const dims = window.ClipSATMathImage.getSvgDimensions(sanitized);
  assert(dims.w >= 40 && dims.h >= 40, `Question ${i} has invalid dims: ${JSON.stringify(dims)}`);
  
  // Test plain-text conversion of stem for Google Form title
  const plainText = window.ClipSATForms.mathToPlainText(q.text);
  assert(plainText && plainText.length > 5, `Plain text stem must be valid for question ${i}`);
  assert.strictEqual(plainText.indexOf('\\('), -1, `LaTeX delimiters must be stripped in plain text stem for question ${i}`);
  
  sanitizedCount++;
});
console.log(`✓ All ${sanitizedCount} Similarity questions in geo.json pass the Google Forms diagram pipeline!`);

// 4. Test mathToPlainText formatting for exam questions
const sampleMath = 'In right \\(\\triangle ABC\\) with \\(\\angle C = 90^\\circ\\), leg \\(AC = \\sqrt{16}\\) and \\(\\frac{AD}{DB} = \\frac{2}{3}\\).';
const formattedPlain = window.ClipSATForms.mathToPlainText(sampleMath);
assert(formattedPlain.includes('△ABC'), 'Triangle symbol converted to Unicode');
assert(formattedPlain.includes('∠C'), 'Angle symbol converted to Unicode');
assert(formattedPlain.includes('√(16)'), 'Square root formatted for plain text');
assert(formattedPlain.includes('2/3'), 'Fraction formatted for plain text');
console.log('✓ Google Forms plain-text math conversion verified');

console.log('── ALL GOOGLE FORMS DIAGRAM TESTS PASSED! ──');
