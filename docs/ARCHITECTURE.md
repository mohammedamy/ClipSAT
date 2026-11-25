# ClipSAT 2.0 — System Architecture

System design, data flow, runtime module boundaries, and security invariants. Metrics below are synchronized directly from `content/*/_meta.json` and `bank-data/*.json` via `scripts/sync-docs.js`.

## Platform Scale Snapshot

<!-- @AUTOGEN:STATS_START -->
- **Curriculum Tracks:** **31** tracks (`content/{track}/_meta.json`)
- **Chapters & Locale-Split SSG Routes:** **306** chapters → **612** indexable EN (`/{track}/{chapter}/`) & AR (`/ar/{track}/{chapter}/`) pages
- **Verified Question Bank (Schema v2):** **49,322** items (**40,604** executable SymPy certificates + **8,718** SHA-256 educator review hashes; 100% 3PL IRT calibrated)
- **Interactive Learning & Exports:** **3,064** bilingual interactive activities, **1,550** chapter practice-set items, **384** topic worksheets, and **768** printable PDFs
<!-- @AUTOGEN:STATS_END -->

## 1. Per-Chapter Locale-Split Static Site Generation (SSG)

All curriculum content lives in `content/{track}/_meta.json` and `content/{track}/{chapter-slug}.json` (validated against `course_schema.json`). During `npm run build`, Eleventy (`src/_data/chapterPages.js` + `src/_includes/layouts/chapter-page.njk`) compiles two isolated static route families so no page ever ships hidden chapters or hidden second-language DOM subtrees:

```text
content/{track}/_meta.json ──┐
content/{track}/{ch}.json ───┼──> migratedContent.js ──> chapterPages.js
content/{track}/_practice-set.json ┘                        │
                                                            ├──> _site/{track}/index.html              (EN syllabus hub)
                                                            ├──> _site/ar/{track}/index.html           (AR RTL syllabus hub)
                                                            ├──> _site/{track}/{ch}/index.html         (306 EN chapter pages, <95 KB)
                                                            └──> _site/ar/{track}/{ch}/index.html      (306 AR chapter pages, <95 KB)
```

- **Build-Time KaTeX SSR (`scripts/katex-ssr.js`):** Pre-renders math expressions with `output: 'htmlAndMathml'` so browsers paint equations on first frame without layout shift while assistive technologies read semantic `<math>` trees.
- **Logical RTL Layout:** Arabic routes render with `<html lang="ar" dir="rtl">`, self-hosted `Noto Sans Arabic`, logical CSS properties (`inset-inline-start/end`), and reciprocal `hreflang="en"` / `hreflang="ar"` / `hreflang="x-default"` SEO tags.

## 2. Canonical Question Banks, Shards & Adaptive Psychometrics

```text
bank-data/{track}.json (Schema v2 + sympy_cert + 3PL irt + calc)
        │
        ├──> CI Gates 1–5 (AJV Schema v2, SymPy symbolic proof, χ² < 4.0, KaTeX strict, AST AR parity)
        │
        └──> build.js shard emitter ──> public/bank-shards/{track}/{topic}.json ──> _site/bank-shards/...
```

- **Lazy Shard Delivery (`02e-question-bank-and-syllabus.js`):** Pages boot with zero bank network requests. Opening a chapter quiz fetches only `/bank-shards/{track}/{topic}.json` (cached by `sw.js` with a bounded LRU cache).
- **2-Stage Adaptive Digital SAT (`17-mock-exam-mode.js` / `window.CSSatAdaptive`):** Administers a 22-item stratified Module 1 (`35%` Algebra, `35%` Advanced Math, `15%` PSDA, `15%` Geometry & Trig; ~`25%` SPR), estimates $\hat{\theta}_{M1}$ via 61-node 3PL Expected A Posteriori (EAP) quadrature, and routes deterministically to the **Hard** ($\hat{\theta}_{M1} \ge 0.15$ or raw $\ge 15/22$) or **Standard** Module 2 pool with scaled `200–800 ± CI` reporting.
- **3PL Bayesian Diagnostic CAT (`27-diagnostic-test.js` / `window.CSDiagnosticCAT`):** Selects items by Maximum Fisher Information with domain-exposure balancing, down-weights `< 2.5s` rapid guesses (`w = 0.15`), stops early once $\text{SEM} \le 0.32$ (`6–15` items), and generates a chapter-linked study plan.
- **Structured Multi-Part FRQ & Proof Engine (`src/scripts/exam/structured-frq.js`):** Supports `(a)(i), (a)(ii), (b)` written questions for AP, IGCSE, A-Level, Edexcel, IB AA/AI, and Olympiad Proof papers with recursive-descent symbolic grading, scratchpad `<canvas>` capture, and `[M1][A1][B1]` partial-credit rubrics.

## 3. Frontend Bundles, Security & Observability

- **Code Splitting & Private Source Maps:** `build.js` produces `public/js/engine.js` (`< 350 KB`) plus deferred bundles (`mock-exam.js`, `diagnostic-test.js`, `assignment-view.js`, `teacher-view.js`, `shell-modals.js`, `explorers-bundle.js`). Source maps (`.js.map`) and module line tables (`.modules.json`) are written exclusively to `artifacts/sourcemaps/` and resolved offline via `scripts/symbolicate-error.js`.
- **XSS & RCE Elimination:** All dynamic text passes through strict 5-entity `escHtml()` or `DOMPurify.sanitize()`. All dynamic math graphing and answer checking use zero-eval recursive-descent AST parsers. `_headers` enforces strict `Content-Security-Policy` (no `unsafe-eval`), `Strict-Transport-Security`, and `X-Frame-Options: DENY`.
- **Privacy-First Telemetry (`public/js/analytics.js` & `public/js/error-logging.js`):** Consent-gated, cookieless funnel events and PII-redacted error reports with automatic 30-day retention pruning (`prune_old_telemetry()`) and 1-minute external health probing (`scripts/health-check.js`).

## 4. Supabase Cloud Sync, Scoped Teacher LMS & Billing

- **Delta + Tombstone Sync (`public/js/cloud-sync.js`):** Dirty-record delta queue with `deleted_at` soft-delete tombstones prevents resurrected cleared mistakes across devices while cutting sync payloads by >95%.
- **Server-Verified Teacher LMS (`22d-assignment-view.js`, `public/js/teacher-view.js`):** Joining a class via `join_class_by_code` is rate-limited (`8 / 15 min`) and requires explicit student data-sharing consent (`consent_given = true`). Teacher RLS policies scope visibility strictly to the class's `track`. Completed assignments mint server-signed HMAC-SHA256 certificates (`CS-VERIFIED-<uuid>-<sig16>`) stored in `public.assignment_submissions`.
- **Automated Checkout & Entitlements (`supabase/functions/billing-webhook/`):** Verifies Stripe (`Stripe-Signature` with 300s replay window) and Moyasar SAR (`X-Moyasar-Signature` for Mada / Apple Pay / STC Pay) webhooks in constant time, records idempotency in `public.billing_webhook_events`, and provisions Plus (`tier = 'paid'`, `daily_credits = 200`, 30-day trial support) in `public.ai_plans`.

<!-- @AUTOGEN:TRACKS_START -->
### Supported Curriculum Tracks (31 Tracks · 306 Chapters · 49,322 Bank Questions)

| Category | Tracks (Slug, Chapters, Verified Bank Items) |
| :--- | :--- |
| **US & Regional Standardized Testing** | Digital SAT Math (`sat`, 11 ch, 1,605 Qs) · ACT Math (`act`, 9 ch, 1,247 Qs) · ACT 2 Math Level 1 (`act2`, 9 ch, 1,422 Qs) · ACT 2 Math Level 2 (`act2l2`, 8 ch, 1,218 Qs) · EST Math (`est`, 9 ch, 1,248 Qs) · EST 2 Math Level 1 (`est2`, 9 ch, 1,296 Qs) · EST 2 Math Level 2 (`est2l2`, 8 ch, 1,218 Qs) |
| **Saudi National Exams (ETEC / Qiyas)** | GAT Qudrat (`qudrat`, 9 ch, 1,538 Qs) · SAAT Tahsili (`tahsili`, 10 ch, 1,675 Qs) · English GAT & SAAT (Qiyas) (`gaten`, 8 ch, 1,200 Qs) |
| **Advanced Placement (College Board AP)** | AP Calculus AB (`apab`, 11 ch, 1,393 Qs) · AP Calculus BC (`apbc`, 9 ch, 1,200 Qs) · AP Precalculus (`appc`, 8 ch, 1,201 Qs) · AP Statistics (`apstats`, 8 ch, 1,222 Qs) |
| **Cambridge & Pearson Edexcel (IGCSE / A-Level)** | IGCSE 0580 (`igcse`, 10 ch, 1,511 Qs) · Pearson Edexcel IGCSE (4MA1) (`edexcel`, 8 ch, 1,200 Qs) · Additional Mathematics (`addmath`, 8 ch, 1,210 Qs) · AS Level Mathematics (`aslevel`, 20 ch, 2,875 Qs) · A2 Level Mathematics (`a2level`, 16 ch, 2,767 Qs) |
| **International Baccalaureate (IBO)** | IB Math SL (AA/AI) (`ibsl`, 8 ch, 1,212 Qs) · IB Math HL (AA/AI) (`ibhl`, 8 ch, 1,201 Qs) |
| **Mathematical Olympiad & Competitions** | Mathematical Olympiad · NSMO of KSA & KAUST (`olympiad`, 12 ch, 1,910 Qs) |
| **Secondary Mathematics Foundations** | Algebra (`algebra`, 11 ch, 1,686 Qs) · Algebra 2 (`alg2`, 11 ch, 1,732 Qs) · Geometry (`geo`, 11 ch, 1,831 Qs) · Pre-Calculus (`precalc`, 8 ch, 3,021 Qs) |
| **University & Applied STEM Mathematics** | Calculus (`calculus`, 16 ch, 3,294 Qs) · Multivariable Calculus (`mvc`, 8 ch, 1,310 Qs) · Linear Algebra (`linalg`, 8 ch, 1,276 Qs) · Differential Equations (`odes`, 9 ch, 1,403 Qs) · Math for AI & Data Science (`mathai`, 8 ch, 1,200 Qs) |
<!-- @AUTOGEN:TRACKS_END -->
