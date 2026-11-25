# ClipSAT 📐

**ClipSAT** is a comprehensive, free, bilingual (English LTR & Arabic RTL) mathematics platform created by **Mr. Mohamed Abdallah** (Head of Mathematics). It provides rigorous curriculum notes, progressive-reveal worked examples, interactive HTML5 Canvas explorers, symbolically verified question banks, 3PL Bayesian adaptive diagnostic tests, Bluebook-style 2-stage adaptive CBT simulators, and server-verified classroom assignment tools across **31 international, standardized, olympiad, and university mathematics tracks**.

Live at: **[https://clipsat.org](https://clipsat.org)** (and **[https://mohammedamy.github.io/ClipSAT/](https://mohammedamy.github.io/ClipSAT/)**)

---

## 📊 Live Corpus & Platform Metrics

<!-- @AUTOGEN:STATS_START -->
- **Curriculum Tracks:** **31** tracks (`content/{track}/_meta.json`)
- **Chapters & Locale-Split SSG Routes:** **306** chapters → **612** indexable EN (`/{track}/{chapter}/`) & AR (`/ar/{track}/{chapter}/`) pages
- **Verified Question Bank (Schema v2):** **49,322** items (**36,950** executable SymPy certificates + **12,372** SHA-256 educator review hashes; 100% 3PL IRT calibrated)
- **Interactive Learning & Exports:** **3,064** bilingual interactive activities, **1,550** chapter practice-set items, **384** topic worksheets, and **768** printable PDFs
<!-- @AUTOGEN:STATS_END -->

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

---

## 🏗️ ClipSAT 2.0 Architecture & Technology Stack

- **Per-Chapter Locale-Split SSG:** [Eleventy (11ty 3.x)](https://www.11ty.dev/) + Nunjucks paginates every curriculum chapter into lightweight English (`/{track}/{chapter}/`) and Arabic (`/ar/{track}/{chapter}/`) routes (`< 95 KB` HTML, `< 3,500` DOM nodes) alongside fast track syllabus hubs (`/{track}/` & `/ar/{track}/`).
- **Frontend & Code-Split Bundles:** Modular ES6+ architecture (`public/js/engine.js` core shell + lazy-loaded feature bundles for `mock-exam.js`, `diagnostic-test.js`, `assignment-view.js`, `teacher-view.js`, and lazy `/bank-shards/{track}/{topic}.json` fetches) with private `.js.map` source maps in `artifacts/sourcemaps/`.
- **Mathematical Typesetting & Symbolic Verification:**
  - **Build-Time SSR & Semantic MathML:** `scripts/katex-ssr.js` pre-renders equations with `output: 'htmlAndMathml'` for zero-CLS rendering and screen-reader accessibility.
  - **Canonical Bank Schema v2 & SymPy Gate:** Every item in `bank-data/*.json` conforms to strict JSON Schema v2, carries an executable `sympy_cert` or SHA-256 `educator_review_hash`, calibrated 3PL IRT parameters (`irt: { a, b, c }`), and `calc: boolean` policy metadata.
- **Exam Fidelity & Adaptive Psychometrics:**
  - **2-Stage Adaptive Digital SAT (`window.CSSatAdaptive`):** Module 1 → Hard/Standard Module 2 routing ($\hat{\theta}_{M1} \ge 0.15$ or raw $\ge 15/22$) with 3PL EAP scaled `200–800 ± CI` scoring.
  - **3PL Bayesian EAP Diagnostic CAT (`window.CSDiagnosticCAT`):** 61-node quadrature, Maximum Fisher Information item selection, `< 2.5s` rapid-guess down-weighting, and subskill study-plan routing.
  - **Multi-Part Structured FRQ & Proof Engine:** Step-by-step `[M1][A1][B1]` mark-scheme rubrics, recursive-descent algebraic equivalence checking (zero `eval` / `new Function`), and scratchpad canvas capture.
- **Supabase Cloud, RLS & Edge Functions:**
  - **Row Level Security & Vault:** Track-scoped teacher RLS with explicit student consent, delta-plus-tombstone (`deleted_at`) multi-device sync, HMAC-SHA256 server-verified assignment certificates (`CS-VERIFIED-...`), and `pgsodium` Vault-encrypted OAuth tokens.
  - **Serverless Edge Suite:** `ai-proxy` (server-owned Socratic prompt + daily credit quota), `tts-proxy` (metered cloud voice), `google-token` (Vault OAuth exchange), and `billing-webhook` (Moyasar SAR Mada/Apple Pay/STC Pay + Stripe global checkout provisioning into `public.ai_plans`).

---

## 🚀 Quick Start, Educator Studio CLI & Verification

### Prerequisites
- **Node.js** >= 20.0.0
- **Python 3.11+** with `sympy` (`pip install sympy`) for symbolic math verification

### Installation & Build
```bash
git clone https://github.com/mohammedamy/ClipSAT.git
cd ClipSAT
npm ci
npm run build
npm start
```

### Educator Studio CLI (`WP-48`)
Add or validate curriculum items and keep documentation synchronized with single commands:
```bash
# View live corpus statistics across all 31 tracks:
npm run studio -- stats

# Scaffold a canonical Schema v2 question template (mcq | spr | structured | proof):
npm run studio -- scaffold-item --track sat --type spr --out /tmp/new-sat-item.json

# Validate Schema v2 + strict KaTeX + AST bilingual parity + SymPy certificate + append & re-shard:
npm run item:add -- --track sat --file /tmp/new-sat-item.json --dry-run

# Synchronize README.md, AGENTS.md, and docs/ARCHITECTURE.md from content/*/_meta.json:
npm run docs:sync
```

### Zero-Regression Test & CI Gate Suite
```bash
# Run all 28 unit & security verification suites:
npm run test:unit

# Run deterministic CI quality gates (Schema v2, SymPy, Psychometrics, KaTeX, Bilingual AST, SAST, RLS, Edge, Budgets):
node scripts/ci/validate-schema-v2.mjs
python3 scripts/ci/verify_bank_sympy.py --all
python3 scripts/ci/check_psychometrics.py
node scripts/ci/check-katex-strict.mjs
python3 scripts/ci/check_bilingual_parity.py
node scripts/ci/validate-figures-and-pdfs.mjs
node scripts/ci/check-no-eval-or-secrets.mjs
node scripts/ci/check-rls-policies.mjs
node scripts/ci/run-edge-tests.mjs
node scripts/ci/check-build-budgets.mjs

# Run Playwright E2E + axe-core WCAG 2.2 AA accessibility suite:
npm run test:e2e
```

---

## ☁️ Supabase Cloud & Edge Function Deployment

See [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) for database migrations, Vault configuration, and RLS policies.

| Secret / Variable | Location | Purpose |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` / `OPENROUTER_API_KEY` / `GROQ_API_KEY` | Supabase Edge Secrets | Upstream LLM keys for `ai-proxy` |
| `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET` | Supabase Edge Secrets | Stripe global checkout & HMAC webhook verification (`billing-webhook`) |
| `MOYASAR_SECRET_KEY` & `MOYASAR_WEBHOOK_SECRET` | Supabase Edge Secrets | Moyasar SAR (Mada / Apple Pay / STC Pay) checkout & webhook verification |
| `SUPABASE_URL` & `SUPABASE_ANON_KEY` | `public/js/cloud-config.js` | Public client config protected by strict Postgres RLS |

---

## 🔒 Privacy, Security & K-12 Compliance

- **Strict CSP & Zero Dynamic Code Execution:** Enforced via `_headers` (no `unsafe-eval`), strict 5-entity `escHtml()`, `DOMPurify.sanitize()`, and a recursive-descent math AST evaluator.
- **GDPR, COPPA & Saudi PDPL Compliance:** K-12 age/guardian gate, `TFCD=1` child-directed ad treatment, granular opt-in consent banner, self-service `delete_my_account()` cascade RPC, and 30-day automatic telemetry pruning (`prune_old_telemetry()`).
- **Cookieless Telemetry & Error Symbolication:** Zero-PII aggregate funnel telemetry (`public/js/analytics.js`) and redacted client error logging symbolicated offline via `scripts/symbolicate-error.js`.

---

## 📖 Key Documentation Index

- [`AGENTS.md`](AGENTS.md) — Contributor & AI agent orientation, canonical file map, and guardrails.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — System design, per-chapter SSG data flow, runtime bundles, and cloud architecture.
- [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md) — Block-based chapter schema and Nunjucks rendering macros.
- [`docs/RECIPES.md`](docs/RECIPES.md) — Step-by-step guides for common curriculum and UI changes.
- [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) — Database schema, migrations, RLS policies, and Edge Function setup.
- [`MATH_ERRATA.md`](MATH_ERRATA.md) — Automated symbolic verification audit & errata log.

---

## 📄 License & Attribution

Designed and maintained by **Mr. Mohamed Abdallah**.
All rights reserved. Free for educators and students worldwide.
