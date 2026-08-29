<!--
Delete this comment block; keep the sections below. The "Content review" section only matters if this
PR touches content/** or bank-data/** — CI (scripts/check-second-reviewer.js) will fail the build if it
does and no Reviewed-by line is present. See docs/DECISIONS/0025-second-reviewer-process.md.
-->

## What changed

<!-- One or two sentences: what this PR does and why. -->

## Content review

<!-- Only applies if this PR adds/edits anything under content/** or bank-data/**. Skip this whole
section for engine/CSS/infra-only PRs. -->

- [ ] Every new/changed proof or derivation is complete, not asserted
- [ ] At least one worked example accompanies any new theorem/definition
- [ ] Any new figure is load-bearing (per `rigor-standard.html`), not decorative
- [ ] MCQ/FRQ answers are verified correct; no distractor is secretly equal to the correct answer
- [ ] No duplicate question text within the same domain
- [ ] `npm run build` passes locally (schema-validates `content/**` against `course_schema.json`)

**Reviewed-by:** <!-- name/handle of whoever gave this content a second look, other than the PR author -->
