# ClipSAT — Agent & Contributor Orientation

Read this first, every session. All curriculum counts and track tables below are generated from `content/*/_meta.json` via `npm run docs:sync` (`scripts/sync-docs.js`).

## What ClipSAT Is

ClipSAT (`https://clipsat.org`) is a free, bilingual (English LTR + Arabic RTL) mathematics platform maintained by Mr. Mohamed Abdallah.

<!-- @AUTOGEN:STATS_START -->
- **Curriculum Tracks:** **31** tracks (`content/{track}/_meta.json`)
- **Chapters & Locale-Split SSG Routes:** **306** chapters → **612** indexable EN (`/{track}/{chapter}/`) & AR (`/ar/{track}/{chapter}/`) pages
- **Verified Question Bank (Schema v2):** **49,151** items (**35,283** executable SymPy certificates + **13,868** SHA-256 educator review hashes; 100% 3PL IRT calibrated)
- **Interactive Learning & Exports:** **2,816** bilingual interactive activities, **1,550** chapter practice-set items, **384** topic worksheets, and **768** printable PDFs
<!-- @AUTOGEN:STATS_END -->

<!-- @AUTOGEN:TRACKS_START -->
### Supported Curriculum Tracks (31 Tracks · 306 Chapters · 49,151 Bank Questions)

| Category | Tracks (Slug, Chapters, Verified Bank Items) |
| :--- | :--- |
| **US & Regional Standardized Testing** | Digital SAT Math (`sat`, 11 ch, 1,605 Qs) · ACT Math (`act`, 9 ch, 1,247 Qs) · ACT 2 Math Level 1 (`act2`, 9 ch, 1,422 Qs) · ACT 2 Math Level 2 (`act2l2`, 8 ch, 1,218 Qs) · EST Math (`est`, 9 ch, 1,248 Qs) · EST 2 Math Level 1 (`est2`, 9 ch, 1,296 Qs) · EST 2 Math Level 2 (`est2l2`, 8 ch, 1,218 Qs) |
| **Saudi National Exams (ETEC / Qiyas)** | GAT Qudrat (`qudrat`, 9 ch, 1,538 Qs) · SAAT Tahsili (`tahsili`, 10 ch, 1,675 Qs) · English GAT & SAAT (Qiyas) (`gaten`, 8 ch, 1,200 Qs) |
| **Advanced Placement (College Board AP)** | AP Calculus AB (`apab`, 11 ch, 1,393 Qs) · AP Calculus BC (`apbc`, 9 ch, 1,200 Qs) · AP Precalculus (`appc`, 8 ch, 1,201 Qs) · AP Statistics (`apstats`, 8 ch, 1,222 Qs) |
| **Cambridge & Pearson Edexcel (IGCSE / A-Level)** | IGCSE 0580 (`igcse`, 10 ch, 1,511 Qs) · Pearson Edexcel IGCSE (4MA1) (`edexcel`, 8 ch, 1,200 Qs) · Additional Mathematics (`addmath`, 8 ch, 1,210 Qs) · AS Level Mathematics (`aslevel`, 20 ch, 2,875 Qs) · A2 Level Mathematics (`a2level`, 16 ch, 2,767 Qs) |
| **International Baccalaureate (IBO)** | IB Math SL (AA/AI) (`ibsl`, 8 ch, 1,212 Qs) · IB Math HL (AA/AI) (`ibhl`, 8 ch, 1,201 Qs) |
| **Mathematical Olympiad & Competitions** | Mathematical Olympiad · NSMO of KSA & KAUST (`olympiad`, 12 ch, 1,910 Qs) |
| **Secondary Mathematics Foundations** | Algebra (`algebra`, 11 ch, 1,686 Qs) · Algebra 2 (`alg2`, 11 ch, 1,732 Qs) · Geometry (`geo`, 11 ch, 1,831 Qs) · Pre-Calculus (`precalc`, 8 ch, 2,957 Qs) |
| **University & Applied STEM Mathematics** | Calculus (`calculus`, 16 ch, 3,262 Qs) · Multivariable Calculus (`mvc`, 8 ch, 1,286 Qs) · Linear Algebra (`linalg`, 8 ch, 1,252 Qs) · Differential Equations (`odes`, 9 ch, 1,376 Qs) · Math for AI & Data Science (`mathai`, 8 ch, 1,200 Qs) |
<!-- @AUTOGEN:TRACKS_END -->

## Current Architecture (ClipSAT 2.0)

All **31 curriculum tracks** are 100% unified on the canonical JSON + Per-Chapter Locale-Split SSG architecture (zero legacy inline track HTML):

1. **Curriculum Store (`content/{track}/`):**
   - `content/{track}/_meta.json` defines `chapterOrder`, bilingual titles/subtitles, `examBoard`, `officialLinks`, `scopeNotice`, and `testGenerator` settings.
   - `content/{track}/{chapter-slug}.json` stores structured `blocks[]` (`callout`, `workedExampleCard`, `practiceProblem`, `table`, `cards`, `text`, `figure`, `explorer`, `syllabusMap`, `seeAlso`) validated against `course_schema.json`.
   - `src/_data/chapterPages.js` + `src/_includes/layouts/chapter-page.njk` generate **612 single-chapter routes** (`/{track}/{chapter}/` in English LTR and `/ar/{track}/{chapter}/` in Arabic RTL, each `< 95 KB` HTML and `< 3,500` DOM nodes), plus lightweight track syllabus hubs (`/{track}/` and `/ar/{track}/`).
2. **Question Banks & Topic Shards (`bank-data/{track}.json` → `public/bank-shards/{track}/`):**
   - Every bank uses **Canonical Schema v2** (`{ schemaVersion: 2, track, pool }`), validated by `scripts/validate-banks.js` and `scripts/quality_engine/verify_bank_sympy.py`.
   - Every item carries an executable SymPy proof certificate (`sympy_cert`) or signed SHA-256 `educator_review_hash`, calibrated 3PL IRT parameters (`irt: { a, b, c }`), and `calc: boolean`.
   - `build.js` emits per-topic shards into `public/bank-shards/{track}/{topic}.json` for lazy on-demand quiz loading (monolithic `bank-data/` is never copied into `_site/`).
3. **Frontend Shell & Lazy Feature Bundles:**
   - Real Nunjucks templates live in `src/_includes/base.njk`, `src/_includes/shell/*.html`, `src/index.njk`, and `src/404.njk`.
   - Core boot scripts concatenate into `public/js/engine.js` (`< 350 KB`), while heavy features load on demand (`mock-exam.js`, `diagnostic-test.js`, `assignment-view.js`, `teacher-view.js`, `shell-modals.js`, `explorers-bundle.js`). Private `.js.map` source maps and module line tables are emitted to `artifacts/sourcemaps/` (never shipped inside `_site/`).
4. **Supabase Backend & Edge Functions (`supabase/`):**
   - Schema & migrations: `supabase/schema.sql` and `supabase/migrations/*.sql`, tested by `supabase/tests/rls_security.test.sql` (pgTAP).
   - Edge Functions: `ai-proxy` (server-locked Socratic math prompt + `use_ai_quota`), `tts-proxy` (1-credit metered TTS), `google-token` (Vault `pgsodium` encrypted refresh tokens), and `billing-webhook` (Stripe + Moyasar SAR checkout & `public.ai_plans` entitlement provisioning).

## Essential Commands

```bash
npm run build        # Full validation + shard/bundle build + Eleventy SSG (_site/ < 70 MiB)
npm run test:unit    # All 28 unit, psychometric, security & Wave 0–4 verification suites
npm run test:e2e     # Playwright Desktop / Mobile / RTL + axe-core WCAG 2.2 AA suite
npm run docs:sync    # Sync @AUTOGEN stats & 31-track table in README/AGENTS/ARCHITECTURE
npm run studio       # Educator Studio CLI (stats | scaffold-item | validate-item | add-item | scaffold-chapter)
npm run item:add     # Shortcut for `node scripts/studio-cli.js add-item`
```

## Non-Negotiable Engineering Guardrails

- **Quarantined Content Edits:** Never mutate `content/` or `bank-data/` inside `npm run build`. Use `npm run item:add` (supports `--dry-run` and `--staging`) when adding or modifying items so Schema v2, strict KaTeX, AST Arabic parity, and SymPy verification run automatically.
- **Zero Dynamic Code Execution:** Never introduce `eval()` or `new Function()` anywhere in `src/` or `public/js/`. Use the recursive-descent math AST parser (`19a-ix-answer-check.js`) and `escHtml()` / `DOMPurify.sanitize()`.
- **Bilingual AST Parity:** Protect all `\(...\)`, `\[...\]`, and HTML tags as immutable `__MATH_k__` tokens when authoring or translating `.ar` strings (`scripts/quality_engine/ast_arabic_translator.py`). Keep Arabic prose outside KaTeX `\text{...}`.
- **Build & Performance Budgets:** `_site/ < 70 MiB`, individual HTML `< 95 KB` & `< 3,500` DOM nodes, `public/js/engine.js < 350,000` bytes, and `src/scripts/modules/02-core-app.js < 350` lines.
- **Documentation Sync:** After adding a track, chapter, or bank item, run `npm run docs:sync`; CI Gate 1 (`scripts/ci/validate-schema-v2.mjs`) fails closed if `README.md`, `AGENTS.md`, or `docs/ARCHITECTURE.md` drift from `content/*/_meta.json`.

## Where to Look Next

- `docs/ARCHITECTURE.md` — Detailed data flow, SSG pagination, adaptive 3PL engines, and security boundaries.
- `docs/CONTENT_MODEL.md` — Chapter `blocks[]` JSON schema and partial rendering rules.
- `docs/RECIPES.md` — Step-by-step recipes for common curriculum and UI tasks.
- `SUPABASE_SETUP.md` — Cloud database, Vault secrets, Moyasar/Stripe webhooks, and RLS setup.
