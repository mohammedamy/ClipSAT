# ClipSAT 📐

**ClipSAT** is a comprehensive, free, bilingual (English LTR & Arabic RTL) mathematics platform created by **Mr. Mohamed Abdallah** (Head of Mathematics). It provides rigorous curriculum notes, worked examples, interactive canvas explorers, question banks, adaptive diagnostic tests, and automated assignment tools across **26 international, standardized, and university mathematics tracks**.

Live at: **[https://mohammedamy.github.io/ClipSAT/](https://mohammedamy.github.io/ClipSAT/)** (and **[clipsat.org](https://clipsat.org)**)

---

## 🎯 Supported Curriculum Tracks (26 Tracks)

| Category | Tracks |
| :--- | :--- |
| **Standardized Testing** | Digital SAT Math, ACT Math, ACT Math 2, EST Math, EST 2 Math, EST 2 Math Level 2 |
| **Advanced Placement (AP)** | AP Calculus AB, AP Calculus BC, AP Precalculus, AP Statistics |
| **British Curriculum** | Cambridge IGCSE 0580, AS Level Mathematics, A2 Level Mathematics |
| **International Baccalaureate** | IB Math SL (AA/AI), IB Math HL (AA/AI) |
| **Saudi National Exams** | GAT Qudrat (قدرات عامة), SAAT Tahsili (تحصيلي علمي) |
| **Secondary Foundations** | Algebra 1, Algebra 2, Geometry, Precalculus |
| **University Mathematics** | Calculus (Single Variable), Multivariable Calculus, Linear Algebra, Differential Equations (ODEs) |

---

## 🏗️ Architecture & Technology Stack

- **Static Site Engine:** [Eleventy (11ty 3.x)](https://www.11ty.dev/) with Nunjucks templates and custom plugins.
- **Frontend Architecture:** Vanilla ES6+ JavaScript and custom Vanilla CSS design tokens (`src/styles/main.css`). No heavy frontend frameworks or CSS utility bloat.
- **Mathematical Typesetting:**
  - **Build-Time SSR:** `scripts/katex-ssr.js` pre-renders equations into accessible HTML/MathML during Eleventy build for instantaneous Largest Contentful Paint (LCP).
  - **Dynamic Typesetting:** KaTeX `renderMathInElement` with complete delimiter support (`\(...\)`, `\[...\]`, `$$...$$`, `$..$`) and MathJax API compatibility shim (`window.MathJax.typesetPromise`) for dynamically injected DOM (chapter quizzes, AI chat, diagnostic assessments, and mistake reviews).
  - **Accessibility (a11y):** Automatic `tabindex="0"`, `role="region"`, and `aria-label="Scrollable math expression"` applied to overflowing equations.
- **Interactive Visualizers:** Over 120 custom HTML5 Canvas mathematical explorers with accessible "View as data" table equivalents (ADR 0038/0039).
- **Backend & Cloud Sync:** [Supabase](https://supabase.com/) Postgres with Row Level Security (RLS) for optional multi-device progress sync (mistakes, SRS flashcards, accuracy trends, class rosters, and assignments).
- **AI Tutoring ("Ask Mr. Mohamed"):** Server-side proxy (`supabase/functions/ai-proxy` or standalone Flask proxy `app.py`) holding API keys securely, with per-IP rate limiting, daily user quotas, and prompt injection filtering.
- **PWA & Offline Capability:** Custom Service Worker (`sw.js`) with hash-based automated cache busting (`scripts/stamp-sw-version.js`).

---

## 🚀 Quick Start & Local Development

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation
```bash
git clone https://github.com/mohammedamy/ClipSAT.git
cd ClipSAT
npm install
```

### Build Commands
```bash
# 1. Run full build (content validation + bundle concatenation + 11ty compile):
npm run build

# 2. Start local development server (serves _site/ at http://localhost:8080):
npm start

# 3. Extract CSS, JS modules, and templates without rebuilding 11ty:
npm run extract
```

### Running Test Suites
```bash
# Run unit test suites (answer checker, figure rendering, interactive activities):
npm run test:unit

# Validate course content, interactive data, and question banks:
npm run validate-content
npm run validate-ix
npm run validate-banks

# Run end-to-end browser tests via Playwright:
npm run test:e2e
```

---

## ☁️ Supabase Cloud & Edge Function Deployment

See [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) for step-by-step database provisioning and table schemas.

### Environment Variables & Secrets

| Variable / Secret | Target Location | Description |
| :--- | :--- | :--- |
| `GROQ_API_KEY` or `OPENAI_API_KEY` | Supabase Secrets (`supabase secrets set`) | API key for the AI tutor proxy |
| `SUPABASE_URL` | `public/js/cloud-config.js` | Public Supabase project URL |
| `SUPABASE_ANON_KEY` | `public/js/cloud-config.js` | Public anon key (protected via Postgres RLS) |
| `ANTHROPIC_API_KEY` | Flask server (`app.py` environment) | Required only if running standalone Python AI backend |

### Deploying Edge Functions
```bash
# Install Supabase CLI if needed
npm install -g supabase

# Link your remote Supabase project
supabase link --project-ref your-project-id

# Set AI provider API key secret
supabase secrets set GROQ_API_KEY=your_groq_api_key_here

# Deploy edge functions
supabase functions deploy ai-proxy
supabase functions deploy google-token
```

---

## 🔒 Privacy, Security & Compliance

- **GDPR & Saudi PDPL Compliance:** Explicit opt-in cookie consent banner with granular preferences (`necessary`, `analytics`, `preferences`) and immediate revocation.
- **Cookieless Telemetry:** First-party, zero-PII event logging (`public/js/analytics.js`) tracks usage without cross-site tracking or third-party cookies.
- **Server-Side API Protection:** Client code never contains AI or cloud provider secrets. Requests route through authenticated Supabase Edge Functions with rate limits and content filters.
- **First-Party Visitor Counter:** Replaced external third-party tracking badges with an in-house Postgres atomic counter (`site_visits` table).

---

## 📖 Key Documentation Index

- [`AGENTS.md`](AGENTS.md) — Architectural overview, content migration guidelines, and contributor orientation.
- [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) — Database schema, RLS policies, email OTP auth, and cloud sync setup.
- [`TESTING_CHECKLIST.md`](TESTING_CHECKLIST.md) — Comprehensive QA checklist covering math, RTL, exports, and automated tests.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — Detailed system design, data flow, and module boundaries.
- [`docs/CONTENT_MODEL.md`](docs/CONTENT_MODEL.md) — Target block-based content schema and Nunjucks rendering.
- [`docs/RECIPES.md`](docs/RECIPES.md) — Step-by-step guides for adding lessons, creating question banks, and updating exams.

---

## 📄 License & Attribution

Designed and maintained by **Mr. Mohamed Abdallah**.  
All rights reserved. Free for educators and students worldwide.
