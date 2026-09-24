/**
 * Unit tests for scripts/check-second-reviewer.js's findReviewer() (ADR 0025).
 * No browser needed; lives here so it runs in the same suite and CI job.
 */
const { test, expect } = require('@playwright/test');
const { findReviewer } = require('../../scripts/check-second-reviewer.js');

const body = (line) => `## Content review\n\n${line}\n\n---\nfooter`;

test.describe('second-reviewer gate: findReviewer', () => {
  for (const [line, expected] of [
    ['Reviewed-by: Mohamed Abdallah', 'Mohamed Abdallah'],
    ['**Reviewed-by:** Gemini', 'Gemini'],
    ['**Reviewed-by:** **@someone**', '@someone'],
    ['Reviewed-by: Dr. Sara Al-Qahtani', 'Dr. Sara Al-Qahtani'],
  ]) {
    test(`accepts a real name: ${line}`, () => {
      expect(findReviewer(body(line))).toBe(expected);
    });
  }

  for (const line of [
    'Reviewed-by:',
    '**Reviewed-by:** <!-- name/handle of whoever gave this content a second look -->',
    '**Reviewed-by:** _(needed before merge — an independent review pass is planned as a follow-up)_',
    // PR #243: a status note that the earlier checks let through as a "name".
    "**Reviewed-by:** _pending: needs the maintainer's second look at the chapter → domain mapping above_",
    '**Reviewed-by:** awaiting review',
    '**Reviewed-by:** TBD',
    '**Reviewed-by:** n/a',
    '**Reviewed-by:** someone will look at this after the exam season is over and the team is back',
  ]) {
    test(`rejects a placeholder: ${line}`, () => {
      expect(findReviewer(body(line))).toBeNull();
    });
  }

  test('no Reviewed-by line at all', () => {
    expect(findReviewer('## What changed\n\nstuff')).toBeNull();
  });
});
