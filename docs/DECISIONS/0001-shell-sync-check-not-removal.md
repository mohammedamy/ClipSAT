# ADR 0001 — Guard the header/footer duplication with a build check, don't remove either copy yet

**Date:** 2026-08-18
**Status:** Accepted

## Context

`index.html`'s own `<header class="site">`/`<footer class="site">` and `build.js`'s `baseNjk` template
string's `<header class="site">`/`<footer class="site">` are two independently hand-maintained copies of
the same shell markup. Only the `baseNjk` copy ships — `index.html`'s own header/footer is never served to
a real visitor (confirmed by reading `build.js`'s own comments at the `baseNjk` header/footer). Both files
already carry hand-written warnings telling an editor to mirror any change into the other copy. They drifted
silently once before (a 2026-08-12 audit found 3 missing social icons and a missing Teacher-Mode button),
and while re-auditing for WP3, a **second, still-open drift** was found and fixed in the same PR:
`cloudSignInBtn` and `teacherViewBtn` existed in the shipping (`baseNjk`) copy but not in `index.html`'s.

The target-architecture proposal (`docs/PHASE1-2_TARGET_ARCHITECTURE.md`, WP3) originally described this as
"retire the duplication — make `base.njk` authoritative, stop maintaining a second copy inside `index.html`."
That was written before inspecting the actual markup.

## Decision

**Do not remove `index.html`'s header/footer copy yet.** It's unconfirmed whether it's still used for
direct-preview convenience (opening `index.html` itself in a browser while editing, without running the
full build) — removing it would be a real workflow change made on a guess, not a fact. Instead:

1. Fix the concrete drift found (`cloudSignInBtn`, `teacherViewBtn` added to `index.html`'s copy).
2. Add `scripts/check-shell-sync.js`, wired into `npm run build` (and therefore CI), which fingerprints
   both copies (element ids, external link hrefs, `data-i18n` keys) and fails the build if they diverge.

This converts "silent drift, caught only by manual audit" into "loud drift, caught by every build." It does
not eliminate the duplication itself.

## Consequences

- Zero behavior change to the deployed site (the fix only touched the copy that was never served).
- Any future drift between the two copies now fails `npm run build` / CI immediately, with a specific diff
  of which ids/links/i18n-keys are missing from which copy — no more silent divergence.
- The underlying duplication still exists. A follow-up decision — whether `index.html`'s copy is still
  needed, and if not, retiring it for real (the original WP3 framing) — is still open. Ask the maintainer
  before making that call; this ADR only closes the "silent" part of the risk, not the duplication itself.
