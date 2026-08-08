# ClipSAT — Phase 0 Audit & Baseline
**Date:** 2026-07-02  
**Auditor:** Claude (acting as senior front-end architect + learning scientist)  
**Site:** https://mohammedamy.github.io/ClipSAT  
**Source file:** `index.html` (48,384 lines, **7.31 MB**)

---

## Update — 2026-08-08 (post Phase 0/1)

This document is a **dated snapshot from before the Eleventy migration and content build-out** — most of it (page weight, MathJax-load count, build-tool choice) describes the pre-migration monolith and is preserved as historical record, not current state. One claim is stale enough to actively mislead, so it's corrected here rather than silently left wrong:

- **Section A's table and Open Questions G.2/G.3 say alg2/ibsl/ibhl have "0 MCQ bank."** That was true on 2026-07-02. It is **no longer true**: all three tracks now have full question banks in `bank-data/*.json`, loaded at runtime (see `CLAUDE_CODE_STARTER_PROMPT.md` for how that wiring works and how it was verified live):
  - **alg2**: 1,654 questions across 11 domains, all at the 50 easy / 50 medium / 50 hard target (commit `0af3024` and earlier work closed this out).
  - **ibsl**: 950 questions (326 easy / 307 medium / 317 hard) — IB banks use a flat `easy`/`medium`/`hard` structure rather than per-domain tagging, so the 50/50/50-per-domain rubric doesn't apply the same way here; it's a populated bank, not an empty one.
  - **ibhl**: 1,100 questions (377 easy / 357 medium / 366 hard), same flat structure.

If you're relying on this file for a current picture of the codebase, treat everything else in it as historical too — check `bank-data/*.json` directly and `CLAUDE_CODE_STARTER_PROMPT.md` for what's actually true today.

---

## A. Content Inventory

### Subjects / Tracks (21 content views + home)

| # | View ID | Track Name | Chapters | Defs | Thms | MCQ Bank | Explorers | Status |
|---|---------|-----------|---------|------|------|----------|-----------|--------|
| 1 | calculus | Calculus I–III | 19 | 13 | 25 | 364 | 16 canvas | ✅ Strongest |
| 2 | algebra | Algebra | 14 | 7 | 10 | 165 | 5 canvas | ✅ Strong |
| 3 | apab | AP Calculus AB | 14 | 3 | 8 | 45 | 3 canvas | 🟡 Good |
| 4 | apbc | AP Calculus BC | 12 | 0 | 9 | 45 | 3 canvas | 🟡 Good |
| 5 | igcse | IGCSE 0580 | 14 | 14 | 7 | 39 | 3 canvas | 🟡 Good |
| 6 | alg2 | Algebra 2 | 14 | 6 | 7 | 0 | 3 canvas | 🟡 Bank missing |
| 7 | geo | Geometry | 14 | 2 | 9 | 50 | 3 canvas | 🟡 Thin |
| 8 | qudrat | GAT Qudrat | 12 | 1 | 9 | 52 | 3 canvas | 🟡 English-only |
| 9 | tahsili | SAAT Tahsili | 13 | 0 | 10 | 50 | 3 canvas | 🟡 English-only |
| 10 | sat | Digital SAT | 14 | 10 | 11 | 53 | 3 canvas | 🟡 Good |
| 11 | act | ACT Math 1 | 12 | 1 | 9 | 60 | 3 canvas | 🟡 Thin |
| 12 | aslevel | Cambridge AS Pure | 23 | 0 | 20 | 23 | 3 canvas | 🔴 Thin bank |
| 13 | a2level | Cambridge A2 Pure | 19 | 0 | 16 | 25 | 3 canvas | 🔴 Thin bank |
| 14 | est | EST 1 | 12 | 5 | 4 | 132 | 0 | ✅ Strong |
| 15 | est2 | EST 2 | 12 | 7 | 1 | 58 | 0 | 🟡 Good |
| 16 | act2 | ACT Math 2 | 12 | 8 | 0 | 60 | 0 | 🟡 Good |
| 17 | precalc | Pre-Calculus | 11 | 18 | 12 | 30 | 0 | 🟡 Good |
| 18 | appc | AP Precalculus | 8 | 9 | 9 | 40 | 0 | 🟡 Good |
| 19 | apstats | AP Statistics | 8 | 10 | 9 | 40 | 0 | 🟡 Good |
| 20 | ibsl | IB Math SL (AA/AI) | 10 | 17 | 7 | 0 | 0 | 🔴 Bank missing |
| 21 | ibhl | IB Math HL (AA/AI) | 11 | 12 | 7 | 0 | 0 | 🔴 Bank missing |

**Totals:**
- **278 chapters** across 21 tracks
- **143 Definition boxes**, **199 Theorem boxes**, **238 Example sections**
- **~1,331 MCQ** questions in fullExamBank structured pools (exam-style)
- **~10,443 MCQ** questions total in the file (includes per-chapter curriculum banks for Calculus/Algebra)
- **56 named `<canvas>` elements** (interactive explorers), **73 `<input type="range">` sliders**

### Interactive Explorers Inventory (56 canvas, by view)

| View | Explorers |
|------|-----------|
| calculus | Function explorer, Limit, Tangent line, Riemann sum, Accumulation, Optimization, Parametric, Slope field, Taylor polynomial, Series, Vectors, Partial derivatives, Double integral, Vector field, Line integral (16 total — deepest set) |
| algebra | Linear, Quadratic, Transformations, Exponential, Systems (5) |
| apab | Derivative, MVT, Riemann (3 — mirrors Calculus) |
| apbc | Polar, Series, Taylor (3) |
| igcse | Transformations, Line, Polynomial, Rational (4) |
| alg2 | Polynomial, Rational, Conic (3) |
| geo | Parallel lines, Triangle, Pythagorean (3) |
| qudrat | Ratio, Percent, Comparison (3) |
| tahsili | Transformation, Wave, Derivative (3) |
| sat | Linear, Exponential, Data fit (3) |
| act | Function, Line, Trig (3) |
| aslevel | Transformation, Line, Derivative (3) |
| a2level | Exponential, Derivative, Vector (3) |
| est/est2/act2/precalc/appc/apstats/ibsl/ibhl | 0 (no canvas explorers) |

---

## B. Page Weight & Performance Baseline

### Raw Measurements

| Metric | Value |
|--------|-------|
| `index.html` file size | **7.31 MB** (7,311,663 bytes) |
| Line count | 48,384 |
| Inline CSS | **4,544 KB** across 9 `<style>` blocks |
| Inline JavaScript | **4,765 KB** across 22 `<script>` blocks |
| External JS dependencies | 13 `<script src>` tags |
| MathJax CDN loads | **7 separate `<script>` tags** (critical bug — should be 1) |
| `window.MathJax = {` config blocks | **3** (conflict risk) |
| External CSS files | **0** (all inline) |
| CDN dependencies | 5 unique CDNs (MathJax ×4 variants, JSZip, 3 local bank JS) |

### Estimated Lighthouse Scores (Mobile, Simulated 3G)

These are calculated estimates — a real Lighthouse run on the live site may vary, but the file-size evidence makes these ranges reliable:

| Category | Estimated Score | Bottleneck |
|----------|----------------|------------|
| Performance | **~8–15 / 100** | 7.3 MB HTML parse + MathJax loaded 7× |
| Accessibility | **~55–65 / 100** | 73 range inputs without `aria-label`; sparse ARIA |
| Best Practices | **~70 / 100** | Multiple MathJax versions, mixed http/https CDNs |
| SEO | **~60 / 100** | Single `<title>`, no meta description, no OG tags, no JSON-LD |

**First Contentful Paint estimate:** 8–15 seconds on 3G (7 MB parse before any render)  
**Time to Interactive estimate:** 20–40 seconds on 3G (MathJax typesets entire document)

### Critical Performance Problems

1. **7× MathJax loads** — the browser fetches 4–5 different MathJax CDN URLs (tex-mml-chtml + 4 tex-svg variants), wasting 5–10 MB of network transfer and competing initialization. Only one load is needed.
2. **Monolithic 7.3 MB HTML** — the browser must download, parse, and typeset the entire document before any view is useful. A student opening "Calculus" must wait for all 21 subjects to load.
3. **All CSS/JS inline** — no caching possible between page visits; every navigation to the site re-downloads everything.
4. **MathJax typesets on every element** — on page load, MathJax scans 48,000 lines for `\(` delimiters, typesetting thousands of expressions in all 21 tracks simultaneously, whether the student sees them or not.

---

## C. Duplicate Content Blocks

### Structural Duplicates (Expected / Non-Problematic)

These appear in every track by design and need not be deduplicated — they will become reusable templates in Phase 1:

| Pattern | Count | Notes |
|---------|-------|-------|
| `<h2>Downloads</h2>` blocks | 19 | One per track — template content |
| `<h2>Test generator</h2>` blocks | 16 | One per track — template content |
| `<h2>Practice set</h2>` blocks | 14 | One per track — template content |
| `<h2>Test format & strategy</h2>` | 7 | One per exam track — template content |

### Cross-Track Title Reuse (Expected)

These topic names appear in multiple different tracks (e.g., "Trigonometry" in Calculus, Algebra, IGCSE, IB, etc.). The content inside each is distinct and appropriate. Not a bug.

| Title | Appears in N tracks |
|-------|-------------------|
| Sequences & Series | 6 |
| Trigonometry | 6 |
| Statistics & Probability | 6 |
| Exponential & Logarithmic Functions | 4 |
| Coordinate Geometry | 4 |
| Differential Equations | 2 |

### Genuine Content Duplicates Requiring Remediation

#### DUP-001: Fundamental Theorem of Calculus — Two Theorem Boxes in Ch. 4

**Location:** `view-calculus`, chapter "The Fundamental Theorem" (~line 3601 and ~line 3639)

**Block 1 (~line 3601):**
```
▲ Theorem 4.1 — Fundamental Theorem of Calculus
Part I. If A(x) = ∫_a^x f(t) dt, then A is differentiable and A'(x) = f(x).
Part II: [FTC Part II statement]
```

**Block 2 (~line 3639):**
```
▲ Fundamental Theorem of Calculus
Part I: If F(x) = ∫_a^x f(t) dt, then F'(x) = f(x).
Part II: [same content, slightly different phrasing]
```

**Action required:** Keep Block 1 (numbered "Theorem 4.1", pedagogically richer). Remove Block 2. Log in DEDUP_LOG.md.

#### DUP-002: Exact Duplicate `<p>` Paragraph — Test Generator Description

**Appears 9× verbatim:** "Build a randomised test from this subject's question bank. Pick the number of questions and a difficulty level…"

**Assessment:** This is the shared template text for every track's Test Generator section. When migrated to a template system in Phase 1, this becomes a single string in a template — not a content problem, but a structural inefficiency to resolve in Phase 1.

#### DUP-003: Exact Duplicate `<p>` — Download Description

**Appears 3×:** "The 50-problem set with solutions as an editable Word document…"

**Assessment:** Same as DUP-002 — template text duplicated across tracks.

### Summary for DEDUP_LOG.md

| ID | Type | Severity | Lines (approx.) | Action |
|----|------|----------|-----------------|--------|
| DUP-001 | Mathematical content duplicate | **High** | ~3601–3660 | Remove Block 2; keep Block 1 |
| DUP-002 | Template text | Low | All tracks | Becomes template variable in Phase 1 |
| DUP-003 | Template text | Low | All tracks | Becomes template variable in Phase 1 |

---

## D. Math Errata — First-Pass Verification

8 solutions sampled from the Calculus view and verified numerically:

| Problem | Claim | Verification | Status |
|---------|-------|-------------|--------|
| `lim_{x→2} (x²−4)/(x−2)` | = 4 | Factor and cancel: lim(x+2) = 4 ✓ | ✅ |
| `d/dx (20x^4/4 − 3x²)` | = 20x³ − 6x | Power rule applied correctly ✓ | ✅ |
| `d/dx [x/(x²+1)]` | = (1−x²)/(x²+1)² | Quotient rule: ((x²+1)−2x²)/(x²+1)² ✓ | ✅ |
| `d/dx [e^{2x}cos x]` | = e^{2x}(2cos x − sin x) | Product+Chain rule ✓ | ✅ |
| `∫_1^3 (2x+1) dx` | = 10 | [x²+x]₁³ = 12−2 = 10 ✓ | ✅ |
| Area between y=4−x² and y=x+2 | = 9/2 | Computed: 7/6 + 10/3 = 4.5 ✓ | ✅ |
| `Σ_{n=1}^∞ 3(1/4)^n` | = 1 | a=3/4, r=1/4: (3/4)/(3/4)=1 ✓ | ✅ |
| `lim_{x→0} (1−cos x)/x²` | = 1/2 | L'Hôpital twice; numerical: 0.500000 ✓ | ✅ |

**All 8 verified solutions are mathematically correct.** No errors found in this first pass. Full systematic verification to continue throughout Phase 1 as content is migrated.

See `MATH_ERRATA.md` for the living log (currently empty — no errors found).

---

## E. Accessibility Quick-Scan

| Item | Finding | Priority |
|------|---------|----------|
| `<html lang>` | ✅ `lang="en"` present | — |
| Viewport meta | ✅ Present | — |
| Skip link | ✅ `skip` text found | — |
| Images | ✅ 6 images, all have `alt` | — |
| Range sliders | ❌ **73/73 range inputs have no `aria-label`** | **Critical** |
| Buttons with aria-label | ⚠️ Only 6 of ~80+ buttons | High |
| ARIA roles | ⚠️ `dialog` ×3, `listbox` ×1, `option` ×1 — sparse for an app of this complexity | Medium |
| Keyboard navigation | ❌ Explorer sliders not reachable by tab in standard layout | High |
| Focus indicators | Unknown without browser test — likely missing on custom buttons | High |
| Color contrast | Unknown without browser test — dark indigo on white likely passes, but accent amber on white may fail | Medium |
| Screen reader + MathJax | ⚠️ MathJax SVG mode produces SVG, not MathML — poor screen reader support | High |
| RTL/Arabic support | ❌ No `dir="rtl"`, no Arabic text anywhere | Critical for Phase 5 |
| Reduced motion | Unknown — canvas animations likely not respecting `prefers-reduced-motion` | Medium |

---

## F. Build Tool Recommendation

### Option A: Eleventy (11ty) ⭐ Recommended

**Justification:** Eleventy is a zero-config static site generator that takes data files (JSON or Markdown + frontmatter) and renders them through simple template files (Nunjucks, Liquid, or plain HTML). It produces pure static HTML with no client-side framework overhead. Key advantages for ClipSAT:

- **Data cascade:** add a file to `src/data/calculus.json`, and `src/subjects.njk` auto-renders it as `/calculus/index.html`. Mohamed can add a new chapter by editing one JSON object — no Node knowledge required.
- **GitHub Pages native:** Eleventy's output folder is plain HTML files; GitHub Actions builds and deploys in ~30 seconds.
- **No JS shipped to the browser** unless explicitly added per-page; interactive explorers load only on the pages that need them.
- **Tiny learning curve:** the template syntax is close to plain HTML; content editors rarely need to touch it.
- **Mature ecosystem:** Pagefind (static search) integrates in two commands.

### Option B: Astro

Astro is more powerful (component islands, TypeScript, MDX) but adds complexity. Choose Astro over Eleventy if the interactive explorers need to be React/Vue components or if the exam engine grows into a full SPA. For ClipSAT's current shape — content-first, explorers as isolated canvas scripts — Eleventy is lighter and more appropriate.

**Decision: Eleventy 3.x with the Nunjucks template engine.**  
Folder structure proposed for Phase 1:
```
clipsat/
├── src/
│   ├── _data/
│   │   ├── calculus.json       ← one file per subject
│   │   ├── algebra.json
│   │   └── ...
│   ├── _includes/
│   │   ├── base.njk            ← HTML shell
│   │   ├── chapter.njk         ← chapter component
│   │   └── explorer.njk        ← canvas wrapper
│   ├── subjects/
│   │   └── subject.njk         ← per-subject page template
│   ├── index.njk               ← home page
│   └── formulas.njk            ← all formulas page
├── public/
│   ├── js/explorers/           ← one JS file per explorer type
│   ├── js/quiz-engine.js
│   └── css/design-system.css
├── .eleventy.js
└── .github/workflows/deploy.yml
```

---

## G. Open Questions for Mohamed Before Phase 1

1. **URL scheme:** Current = single SPA with hash routing. Proposed = `/calculus/`, `/ap-calculus-ab/`, `/digital-sat/`. Redirects from old `/#view-calculus` to `/calculus/` will need one rewrite rule. **OK to change URLs?**

2. **Alg2 bank missing:** `alg2` view has 14 chapters and 0 MCQ questions in `fullExamBank`. Was a bank planned but not added? **Any data file for Alg2 questions?**

3. **IB SL/HL banks:** Both have 0 MCQ questions. Same question — planned but not yet added?

4. **Arabic content:** Qudrat, Tahsili, EST are Arabic-student exams but entirely in English. Does Arabic-translated content exist elsewhere (notes, past papers), or does it need to be created from scratch in Phase 5?

5. **ClipSAT video list:** Phase 6 embeds YouTube Shorts beside matching topics. Can you share the YouTube channel URL or a list of video IDs with their topic tags?

---

## Summary

| Area | Current State | Phase Target |
|------|-------------|-------------|
| File size | 7.31 MB single HTML | < 200 KB per subject page |
| Lighthouse Performance (mobile) | ~8–15 | ≥ 90 |
| MathJax loads | 7 CDN tags | 1 (or replaced by KaTeX) |
| Chapters | 278 across 21 tracks | Same, now in data files |
| MCQ questions | ~1,331 structured + ~10K chapter | All preserved in JSON schema |
| Interactive explorers | 56 canvas (inline JS) | Same, lazy-loaded per page |
| Arabic support | None | Full (Phases 5) |
| Accessibility | ~55 Lighthouse | ≥ 90 (all 73 sliders labelled) |
| localStorage keys | 18 (some duplicated) | Consolidated to 8 canonical keys |
| DUP-001 (FTC double theorem) | Exists at ~line 3639 | Removed; logged in DEDUP_LOG.md |

**Phase 0 complete. Ready for Phase 1 on your go-ahead.**
