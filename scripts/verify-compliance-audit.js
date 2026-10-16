#!/usr/bin/env node
/**
 * scripts/verify-compliance-audit.js
 * Comprehensive automated verification for the 15 compliance & trust audit issues on ClipSAT.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('── Running ClipSAT Compliance & Trust Audit Verification ──\n');

let passed = 0;
let failed = 0;

function check(title, fn) {
  try {
    fn();
    console.log(`  ✓ ${title}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${title}`);
    console.error(`    ${err.message}`);
    failed++;
  }
}

const siteDir = path.join(__dirname, '..', '_site');
const srcDir = path.join(__dirname, '..', 'src');

// 1. Check generated routes exist
const requiredPages = [
  'about/index.html',
  'trust/index.html',
  'pricing/index.html',
  'privacy/index.html',
  'terms/index.html',
  'cookies/index.html',
  'contact/index.html',
  '_headers'
];

requiredPages.forEach(p => {
  check(`File exists in build output: _site/${p}`, () => {
    const fullPath = path.join(siteDir, p);
    assert.ok(fs.existsSync(fullPath), `${p} does not exist in _site`);
    const size = fs.statSync(fullPath).size;
    assert.ok(size > 200, `${p} is too small (${size} bytes)`);
  });
});

// 2. Privacy Policy claims
check('Privacy Policy accurately discloses accounts, Supabase, and IP logging (no false claims)', () => {
  const privacyHtml = fs.readFileSync(path.join(siteDir, 'privacy', 'index.html'), 'utf8');
  assert.ok(!privacyHtml.includes('no user accounts'), 'Privacy policy must not claim no user accounts');
  assert.ok(!privacyHtml.includes('no server-side database'), 'Privacy policy must not claim no server-side database');
  assert.ok(privacyHtml.includes('Supabase'), 'Privacy policy must mention Supabase');
  assert.ok(privacyHtml.includes('IP addresses') || privacyHtml.includes('IP address') || privacyHtml.includes('IP logging'), 'Privacy policy must disclose IP logging');
  assert.ok(privacyHtml.includes('support@clipsat.org'), 'Privacy policy must list support@clipsat.org');
});

// 3. Pricing & Homepage claims
check('Pricing & Homepage replace "100% free forever" with core content free + optional Plus', () => {
  const pricingHtml = fs.readFileSync(path.join(siteDir, 'pricing', 'index.html'), 'utf8');
  assert.ok(pricingHtml.includes('Core content free forever. Optional ClipSAT Plus for cloud sync, unlimited AI tutor, and mock exams.'), 'Pricing must have updated hero copy');
  assert.ok(pricingHtml.includes('14-Day Money-Back Guarantee') || pricingHtml.includes('14-day'), 'Pricing must include 14-day refund policy');
  assert.ok(pricingHtml.includes('Detailed Feature Comparison'), 'Pricing must include comparison table');

  const homeHtml = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
  assert.ok(!homeHtml.includes('100% Free Educational Floor'), 'Home must not claim 100% free educational floor');
  assert.ok(homeHtml.includes('Core Content Free Forever · Optional ClipSAT Plus'), 'Home must include accurate core content copy');
});

// 4. Renamed AI Tutor & Disclaimers
check('AI Tutor renamed to "ClipSAT AI Tutor" with disclaimers across base and modules', () => {
  const baseNjk = fs.readFileSync(path.join(srcDir, '_includes', 'base.njk'), 'utf8');
  assert.ok(baseNjk.includes('ClipSAT AI Tutor'), 'base.njk must include ClipSAT AI Tutor');
  assert.ok(baseNjk.includes('AI-generated; may contain errors; not a substitute for teacher guidance.'), 'base.njk must contain AI disclaimer');

  const aiChatModule = fs.readFileSync(path.join(srcDir, 'scripts', 'modules', '03-ai-chat-and-practice-quiz.js'), 'utf8');
  assert.ok(aiChatModule.includes('ClipSAT AI Tutor'), '03-ai-chat must reference ClipSAT AI Tutor');
  assert.ok(aiChatModule.includes('not a substitute for teacher'), '03-ai-chat must include teacher guidance disclaimer');
});

// 5. Contact page & Facebook removal
check('Contact page includes support@clipsat.org, contact form, and no personal Facebook profile ID', () => {
  const contactHtml = fs.readFileSync(path.join(siteDir, 'contact', 'index.html'), 'utf8');
  assert.ok(contactHtml.includes('support@clipsat.org'), 'Contact must include support@clipsat.org');
  assert.ok(contactHtml.includes('contact-form') || contactHtml.includes('Send Message'), 'Contact must include contact form');
  assert.ok(!contactHtml.includes('61590724705267'), 'Contact page must not link to personal Facebook profile ID');
});

// 6. Security headers & SRI hashes
check('Subresource Integrity (SRI) on external scripts and security headers in _headers', () => {
  const baseNjk = fs.readFileSync(path.join(srcDir, '_includes', 'base.njk'), 'utf8');
  assert.ok(baseNjk.includes('integrity="sha384-5bRuRJz0ZoqKq2KVCixePzyQqDx62ARzcK0IDTaoaPSGFVInFLwFgJh9EkM+gkvc"'), 'KaTeX CSS must have SRI');
  assert.ok(baseNjk.includes('integrity="sha384-XxErEt5JC4iP+lcDWdGKaHhvDDXTn7cb4wucJWzWlz2SzWs+IXGRD/MzzEUl/xBM"'), 'KaTeX JS must have SRI');
  assert.ok(baseNjk.includes('integrity="sha384-v23j4pMVDeH7xAvXGXZ13fnyvkzWhtSRfRqyck9XxhTVPaoqJhCUA1Fzm/BAGbeq"'), 'JSZip must have SRI');

  const cloudSync = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'cloud-sync.js'), 'utf8');
  assert.ok(cloudSync.includes('sha384-NQ7pgq6ZlwjOyyG35KcNV+S72V8RKSQfGaDkztapQETZ+//PM4DpGg3QLDMFDRqY'), 'Supabase loader must have SRI');

  const headers = fs.readFileSync(path.join(siteDir, '_headers'), 'utf8');
  assert.ok(headers.includes('Content-Security-Policy'), '_headers must include CSP');
  assert.ok(headers.includes('X-Content-Type-Options: nosniff'), '_headers must include X-Content-Type-Options');
  assert.ok(headers.includes('Referrer-Policy: strict-origin-when-cross-origin'), '_headers must include Referrer-Policy');
  assert.ok(headers.includes('Permissions-Policy'), '_headers must include Permissions-Policy');
});

// 7. Google Forms permissions
check('Google Forms uploads default to restricted with explicit consent flow', () => {
  const mathImage = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'math-image.js'), 'utf8');
  assert.ok(mathImage.includes('window.ClipSATGoogleFormsConsent === true'), 'math-image must check explicit consent before makePublic');

  const quizUI = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'quiz-capture-ui.js'), 'utf8');
  assert.ok(quizUI.includes('cs-gform-consent-check'), 'quiz-capture-ui must include consent checkbox');
});

// 8. AI Content Disclosure Component
check('AI Content Disclosure Banner / Footnote present on test generator, practice set, and explorers', () => {
  const aiDisclosure = path.join(srcDir, '_includes', 'partials', 'ai-disclosure.njk');
  assert.ok(fs.existsSync(aiDisclosure), 'ai-disclosure.njk must exist');

  const testgen = fs.readFileSync(path.join(srcDir, '_includes', 'partials', 'test-generator.njk'), 'utf8');
  assert.ok(testgen.includes('ai-disclosure.njk'), 'test-generator.njk must include ai-disclosure');

  const practice = fs.readFileSync(path.join(srcDir, '_includes', 'partials', 'practice-set.njk'), 'utf8');
  assert.ok(practice.includes('ai-disclosure.njk'), 'practice-set.njk must include ai-disclosure');

  const explorer = fs.readFileSync(path.join(srcDir, '_includes', 'partials', 'blocks', 'explorer.njk'), 'utf8');
  assert.ok(explorer.includes('AI-assisted, human-reviewed'), 'explorer.njk must have AI footnote');
});

// 9. About and Trust pages accuracy
check('About and Trust pages are independent educator project disclosures without fabricated entities', () => {
  const aboutHtml = fs.readFileSync(path.join(siteDir, 'about', 'index.html'), 'utf8');
  assert.ok(aboutHtml.includes('Mohamed Abdallah'), 'About must feature Mr. Mohamed Abdallah');
  assert.ok(aboutHtml.includes('Independent Educator Project'), 'About must state independent project model');
  assert.ok(!aboutHtml.includes('Testimonial'), 'About must not fabricate testimonials');

  const trustHtml = fs.readFileSync(path.join(siteDir, 'trust', 'index.html'), 'utf8');
  assert.ok(trustHtml.includes('Zero Fabricated Reviews'), 'Trust must explicitly state zero fabricated reviews policy');
  assert.ok(trustHtml.includes('Curriculum Alignment &amp; Mathematical Rigor') || trustHtml.includes('Mathematical Rigor'), 'Trust must cover academic rigor');
  assert.ok(trustHtml.includes('Strict Mathematics Guardrail'), 'Trust must cover AI guardrail');
});

console.log(`\nResults: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All compliance & trust verification checks passed cleanly!');
}
