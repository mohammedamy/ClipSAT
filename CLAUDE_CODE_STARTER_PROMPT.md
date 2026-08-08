# ClipSAT — Claude Code starter prompt

Paste everything below this line as your first message in a fresh Claude Code session, run from the repo root (`ClipSAT Site/`).

---

You're continuing work on ClipSAT, an educational math site hosted on GitHub Pages at `https://mohammedamy.github.io/ClipSAT/`. This is an Eleventy 3.x static site generated from a monolithic `index.html` SPA (48,000+ lines — all content, JS engine, and quiz banks live in this one file), plus per-track question banks in `bank-data/*.json` fetched at runtime.

## Build pipeline

1. `node build.js` — reads `index.html`, extracts: CSS → `public/css/main.css`, all inline `<script>` blocks concatenated → `public/js/engine.js`, per-track HTML → `src/_includes/tracks/{id}.html`, and the shared page layout → `src/_includes/base.njk` (this file is a **generated template literal defined inside `build.js`**, the `baseNjk` string — never hand-edit `base.njk` directly, edit the `baseNjk` string in `build.js` instead, then re-run `node build.js`).
2. `npx @11ty/eleventy` — generates `_site/` with one page per track (`/calculus/`, `/algebra/`, etc.) using `base.njk` + the per-track include, plus whatever `.eleventy.js` passthrough-copies verbatim (root-level static pages like `changelog.html`, `rigor-standard.html`, `free-tier-promise.html` **must** be listed there via `addPassthroughCopy(...)` or they silently never reach `_site/` — this bit us once, see below).
3. GitHub Actions (`.github/workflows/deploy.yml`) runs `npm run build` (= step 1 + step 2) on every push to `main` and deploys `_site/` to `gh-pages`. **Nothing needs to be built locally before pushing** — CI does the full extraction + build from whatever's in `index.html`/`build.js` at that commit. Still worth running both steps locally before pushing, to catch a passthrough-copy or template gap before it ships instead of after.

Track IDs: `calculus, algebra, alg2, apab, apbc, igcse, geo, qudrat, tahsili, sat, act, aslevel, a2level, est, est2, act2, precalc, appc, apstats, ibsl, ibhl`

**Golden rule: `index.html` is the only source of truth for content and JS. `public/js/engine.js`, `src/_includes/base.njk`, `src/_includes/tracks/*.html` are all generated — never edit them directly, edit `index.html` or `build.js` and re-run `node build.js`.**

The site's shared footer/nav markup is duplicated in two places by design (the standalone `index.html` and `build.js`'s `baseNjk` string) — a change to one (e.g. a new footer link) needs the identical edit in the other, or track pages and the root page will visibly diverge. This has caused real bugs before (see the chat-widget note below).

## Deploying — branch + PR, not direct push to main

As of 2026-08-08, the working pattern is: branch, commit, push the branch, open a PR with `gh pr create`, then merge. (Earlier sessions pushed straight to `main` — don't; the user asked explicitly to switch to PRs going forward.)

```
git checkout -b <short-description>
git add <files> && git commit -m "..."
git push -u origin <branch>
gh pr create --fill
```

Wait ~1–2 min after merge for GitHub Actions, then test live. **Browser caches `js/engine.js` for 10 minutes** (`Cache-Control: max-age=600`) — always hard-reload (Cmd+Shift+R) when verifying a fix, or you'll see stale pre-fix behavior and chase a ghost. `bank-data/*.json` is fetched fresh (no long cache), so content-bank changes show up without the same caveat.

If you get `fatal: cannot lock ref` or `Unable to create .git/index.lock: File exists`, delete stale lock files: `rm -f .git/*.lock .git/refs/heads/*.lock`.

## Where things stand — product roadmap

There's a 10-pillar, 18–24-month product roadmap (Content Excellence, Interactive Learning Tools, Assessment & Analytics, Accessibility & Inclusivity, Technology Infrastructure, Community & Engagement, Data Privacy & Security, Monetization, R&D, Global Expansion) published as a Claude artifact — ask the user for the link if you need the full document; the gist is: Pillars 1/2/4 run continuously, Pillar 5 (accounts/backend) is the hard dependency almost everything else waits on, and the "What NOT to do" guidance is explicit: don't rebuild the explorer engine, don't migrate off static-first hosting, don't build a full LMS before an institutional customer asks for one.

**Backend/accounts (Pillar 5):** partially live — Supabase auth + `cloud-sync.js` mirrors localStorage progress across devices (commit `0882f51`). No payment/billing infrastructure exists yet.

**Monetization (Pillar 8):** policy is drafted, nothing is built. `free-tier-promise.html` states the model: every chapter/proof/explorer across all 21 tracks stays free forever; a separate "ClipSAT Plus" tier (Step-Coach AI tutor, predictive mock-exam scoring, spaced repetition, printable exports) gets a 30-day free trial then $20/year. **This is copy, not code** — there's no trial-day tracking, no Stripe/payment integration, no gating anywhere in the app yet. Both `rigor-standard.html` and `free-tier-promise.html` are marked "Draft v1, pending Mr. Abdallah's sign-off" — check with him before treating either as final.

## Content bank status (Pillar 1)

Every track's `bank-data/*.json` question pool is organized into topic *domains*. The target shape, matching `rigor-standard.html`'s public rubric, is **50 easy + 50 medium + 50 hard per domain**, sympy/CAS-verified, no duplicate text, no distractor that's secretly equal to the correct answer.

As of commit `0af3024` (2026-08-08), **every domain in every track's bank-data file that carries a `difficulty` tag is at 50/50/50** — this was closed out by finishing AP Calculus AB's last 4 partial domains (Chain Rule, Composite Functions, Implicit Differentiation, Inverse Function Derivatives; 546 new questions total). Don't assume there's more of this exact kind of gap-closing work queued up — check current state first:

```python
import json, collections
for f in ["apab","aslevel","a2level","act","act2","...whatever track"]:
    d = json.load(open(f"bank-data/{f}.json"))
    pool = d["pool"] if "pool" in d else d.get("easy",[])+d.get("medium",[])+d.get("hard",[])
    dd = collections.defaultdict(collections.Counter)
    for q in pool:
        diff = q.get("difficulty")
        if diff: dd[q.get("domain","?")][diff] += 1
    gaps = [(k,c) for k,c in dd.items() if not all(c.get(t,0)>=50 for t in ("easy","medium","hard"))]
    print(f, "gaps:", gaps)
```

**Known non-gap, worth a cleanup pass sometime:** several tracks (aslevel: 23, act/act2/apbc/igcse/etc.: fewer) carry legacy single-question "domains" with no `difficulty` tag — leftovers from before the 50/50/50 pattern existed. Most are near-duplicate spellings of an already-complete domain (e.g. a stray `"Differentiation"` next to a complete `"Differentiation & Integration"`). These want *merging into the correct domain name*, not expansion into a duplicate 150-question set. Not urgent, but don't mistake them for real gaps and start authoring content for them.

**`AUDIT.md` is stale** (dated 2026-07-02) — it still says alg2/ibsl/ibhl have "0 MCQ bank," which was true at audit time but is no longer true. Worth a refresh pass if anyone's relying on it as current.

**Content-generation gotchas learned the hard way** (see commit `0af3024`'s message for the full writeup): never call `sp.nsimplify` on a ratio of transcendental values (e.g. `sin`/`cos` of a generic integer) — it can hang for minutes on a PSLQ closed-form search; restrict such points to clean angles instead. Verify every distractor against the *correct answer*, not just against the other distractors — it's easy to accidentally write a "wrong" choice that's algebraically identical to the right one in a different form.

## Docs pages

`rigor-standard.html` and `free-tier-promise.html` are standalone pages (same self-contained style as `changelog.html` — own header, dark-mode toggle, no 11ty dependency) linked from the site-wide footer's "Legal" column. Both are real, deployed pages; both are also explicitly labeled drafts pending sign-off in their own text.

## Known gaps (not bugs, not yet acted on — carried over from an earlier session)

- ~~**Algebra 2 (`alg2`) MCQ bank in the old inline `fullExamBank` structure inside `index.html`** may still show as empty~~ — **investigated 2026-08-08, not a bug.** `fullExamBank` is not a separate legacy inline structure at all; it's populated exclusively by `CS_loadTrackBank()` fetching `bank-data/{trackId}.json` at runtime (`index.html:25676`). Verified live on `https://mohammedamy.github.io/ClipSAT/alg2/`: every one of alg2's 11 chapters' "Generate Quiz" buttons (`genChapterQuiz`, `index.html:27862`) correctly pulls from `bank-data/alg2.json`'s 1,654-question pool via domain-keyword matching, and produces real, correctly-formatted MCQs with solutions. Also verified this still works when `alg2` is reached via client-side SPA navigation (`showView('alg2')`) from a different track's page, not just a direct page load. One genuinely separate, pre-existing, non-bug distinction worth remembering: the **"Test generator"/"Practice set" chapter sections** (`genTest`/`_genTestOriginal`, `index.html:29971`) are NOT bank-data-driven — they scrape a static, hardcoded 50-item free-response `.problem` list baked into each track's HTML. That's a deliberate second content system, true for every track using this chapter template (not alg2-specific), and isn't what "MCQ bank" refers to.
- ~~**The "Ask Mr. Mohamed" chat button never actually appears on track pages**~~ — **investigated 2026-08-08, already fixed.** This was fixed in commit `3a24f86` ("fix: restore missing 'Ask Mr. Mohamed' chat widget on all built pages", 2026-07-03) — `#chatFab`/`#chatPanel` markup has been in the `baseNjk` template in `build.js` (and the generated `src/_includes/base.njk`) since then. Verified live on `https://mohammedamy.github.io/ClipSAT/calculus/`: the button renders (`display:flex`) and the panel exists in the DOM.
- **Untracked files, not yet committed as of 2026-08-08:** `AUDIT.md`, `MATH_ERRATA.md`, `.claude/` are untracked in git. Check `git status` and ask before assuming they're stale or safe to ignore — they may be exactly what the user wants committed next.

## Style/output preferences for this user (Mohamed, math teacher, founder)

- Math deliverables (worksheets, exams) go in `.docx` with **native Word equations (OMML)**, not images or plain LaTeX text — there's a `native-word-equations` skill for this.
- Diagrams/graphs via GeoGebra where applicable.
- Prefers concise, direct responses — minimal narration, no restating what was just done.
- Wants real work pushed via PR (branch + `gh pr create`), not narrated as a plan — this doc's job is to make that possible without re-deriving context from scratch.
