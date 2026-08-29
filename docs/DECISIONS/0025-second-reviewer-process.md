# ADR 0025 — A named-reviewer gate for content changes, not a content-quality bot

**Date:** 2026-08-29
**Status:** Accepted

## Context

The roadmap (`docs/PHASE1-2_TARGET_ARCHITECTURE.md`'s sibling planning doc, Pillar 1) calls for a
"second-reviewer pass: every new proof/derivation gets checked by a subject-matter reviewer other than its
author before publish," scheduled once a paid subject-matter contractor joins around Month 6. Today there
is no such contractor — the team is one founder-teacher plus an AI coding agent — and nothing enforces even
that a second pair of eyes (human or a separate agent session) looked at new theorem/proof/question content
before it merges. `scripts/validate-content.js` already catches *structural* errors (schema mismatches,
malformed JSON) on every build, but it cannot catch a wrong derivation, a mis-keyed correct answer, or a
distractor that's secretly equal to the correct choice — exactly the failure modes the Rigor Standard
(`rigor-standard.html`) exists to prevent. There is also currently no CI at all on pull requests — the only
workflow (`.github/workflows/deploy.yml`) triggers on push to `main`, so a broken build is only caught after
merge.

Two things this decision deliberately does NOT try to do:

- **It does not build an automated content-quality checker.** Verifying a proof is correct or a CAS
  equivalence holds is a real, separate engineering effort (already scoped in the roadmap's Pillar 3 as
  "CAS-assisted symbolic equivalence," not something to bolt on here as a side effect).
  ​`scripts/check-second-reviewer.js` only checks that a *named reviewer distinct from the PR author* is
  recorded — it is a process gate, not a correctness gate.
- **It does not require a second reviewer for infrastructure/engine/CSS changes.** Gating everything would
  slow down a solo maintainer for no rigor benefit; only paths that carry the site's actual pedagogical
  content (`content/**`, `bank-data/**`) trigger it.

## Decision

1. **`docs/RIGOR-REVIEW-CHECKLIST` lives inline in the PR template**, not as a separate doc, so it's seen at
   the moment it matters (opening a PR), not discovered later. Added `.github/pull_request_template.md`
   with a "Content review" section: the Rigor Standard's own bar (complete derivation where one is
   mathematically expected, ≥1 worked example, ≥1 real-world application, load-bearing figures only,
   answers verified correct, no duplicate question text, no self-equal distractor) restated as checkboxes,
   plus a required `Reviewed-by:` line.
2. **`scripts/check-second-reviewer.js`**, run in CI on every pull request: diffs the PR against its base,
   and — only if the diff touches `content/**` or `bank-data/**` — requires the PR body to contain a
   `Reviewed-by: <name>` line naming someone other than the PR's own author (case-insensitive, `@`-stripped
   comparison). No content-path changes → the check is skipped, not failed.
3. **`.github/workflows/pr-checks.yml`**, new — this repo had no `pull_request`-triggered CI at all before
   this change. It runs `npm run build` (the same build CI already runs on push to `main`, including
   `validate-content.js`'s schema check) plus the new reviewer gate, so both structural and process problems
   surface before merge instead of after.

For a two-person team (founder + AI agent), "a reviewer other than the author" can be the founder reviewing
AI-authored content, or one agent session's output reviewed by a separate session/pass — the check only
verifies a distinct name is recorded, it does not (and cannot) verify review actually happened in good
faith. That's a known, accepted limit: the alternative (no gate at all) is worse, and a heavier
identity-verified system isn't justified until the team is larger than two.

## Consequences

- Every PR touching `content/**` or `bank-data/**` now needs a `Reviewed-by:` line naming someone other than
  its author, or CI fails with a message pointing here.
- Every PR, content or not, now gets `npm run build` run against it before merge — closes a real, unrelated
  gap (previously only `push` to `main` ran CI at all).
- This does not replace the roadmap's planned paid subject-matter reviewer; it's the interim, zero-cost
  scaffold until that hire exists. Revisit this ADR once a dedicated reviewer role exists — the gate may
  want to name specific required reviewers per track at that point instead of accepting any distinct name.
- Non-content PRs (engine/CSS/infra) are unaffected — no new friction for the majority of changes.
