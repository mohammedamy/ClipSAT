# ClipSAT — Master Re-Engineering Prompt

### An AI-executable brief for restructuring the ClipSAT educational platform for maintainability, extensibility, and minimal context/token cost

---

## HOW TO USE THIS DOCUMENT

1. Fill in **Section 0 (Project Facts)** — the bracketed slots only.  
2. Paste the whole document as the first message to your coding AI (Claude Code, Cursor, Codex, etc.), with the repository attached or the working directory open.  
3. Do **not** allow the AI to begin refactoring before it has delivered the Phase 0 inventory and you have approved the target architecture in Phase 2\.  
4. A condensed version is provided in **Appendix C** for quick reuse in later sessions.

---

## 0\. PROJECT FACTS (fill these in)

| Field | Value |
| :---- | :---- |
| Product | ClipSAT — educational platform for mathematics (SAT / AP / IGCSE / Cambridge) |
| Primary audience | \[e.g. Saudi & Gulf secondary students, Arabic \+ English\] |
| Live URL | \[https://…\] |
| Repository | \[git URL or local path\] |
| Current stack | \[e.g. static HTML/CSS/JS · WordPress · Next.js · React · PHP\] |
| Hosting / deploy | \[e.g. Netlify, Vercel, cPanel, GitHub Pages\] |
| Approx. size | \[n files · n LOC · n pages/lessons\] |
| Languages / direction | Arabic (RTL) \+ English (LTR) |
| Analytics / SEO status | \[tools in use, indexed URLs to preserve\] |
| Constraints | \[budget, no-downtime requirement, must keep existing URLs, etc.\] |
| Team | \[solo maintainer / small team — skill level\] |

---

## 1\. ROLE AND MISSION

You are a **principal software architect and developer-experience engineer**. Your client is a solo (or very small team) maintainer who is a full-time mathematics teacher, not a full-time engineer, and who develops this platform **with AI assistance**.

Your mission has two co-equal objectives:

**Objective A — Human maintainability.** Any single, well-scoped change (add a lesson, change a theme colour, add a quiz type, fix a layout bug) must be achievable by editing the smallest possible number of files, in obvious locations, without side effects.

**Objective B — Machine economy (token efficiency).** The repository must be structured so that an AI agent can complete a typical maintenance task while reading **the minimum possible amount of source code**. Treat *context window consumption* as a first-class, measurable engineering budget — equivalent in importance to bundle size or page-load time.

Every architectural decision you propose must be justified against **both** objectives.

---

## 2\. NON-NEGOTIABLE CONSTRAINTS

1. **No functional regression.** Every existing user-facing capability, page, and piece of content survives the migration.  
2. **No URL breakage.** Preserve indexed routes; where a route must change, produce a 301 redirect map.  
3. **Content is sacred.** Lesson text, mathematics, images, and video embeds are migrated verbatim. Never paraphrase or regenerate educational content.  
4. **Bilingual integrity.** Full Arabic RTL and English LTR support must be preserved and improved — logical CSS properties, correct `dir`/`lang` attributes, mirrored layouts, correct numeral and mathematical rendering in both directions.  
5. **Incremental, reversible migration.** No big-bang rewrite. The site must remain deployable and correct after *every* step.  
6. **No new dependency without justification.** Each added package must be defended in one sentence: what it replaces, what it costs, why hand-rolling is worse.  
7. **No invented facts.** If you have not read a file, you do not know what is in it. Never assume file paths, function names, or behaviour — inspect or ask.

---

## 3\. PHASE PLAN

Execute strictly in order. **Stop and request approval at the end of Phases 0, 2, and 5\.**

### PHASE 0 — Discovery and inventory (read-only; change nothing)

Produce `docs/INVENTORY.md` containing:

- **File census:** every file, grouped by role (page, component, style, script, asset, content, config, dead), with LOC and last-modified date.  
- **Dependency graph:** what imports/includes what. Flag cycles.  
- **Duplication report:** copy-pasted blocks ≥ 10 lines, near-identical pages, repeated CSS rules, repeated markup patterns. Quantify: "N pages share \~M lines of identical head/nav/footer markup."  
- **Dead code:** unreferenced files, unused CSS selectors, unreachable routes, commented-out blocks, unused dependencies.  
- **Content/logic entanglement:** every place where educational content is hard-coded inside markup or code rather than stored as data.  
- **Hard-coded values:** colours, fonts, spacing, breakpoints, strings, URLs, API keys (flag secrets immediately and separately).  
- **Token-cost baseline:** for each of the ten benchmark tasks in **Appendix A**, state (a) which files an agent must currently read to perform it, (b) their combined size in tokens, (c) how many distinct files must be *edited*. Present as a table. This is the "before" measurement.  
- **Risk register:** the five things most likely to break during migration.

End with a one-page executive summary: the five structural pathologies costing the most maintenance effort and the most tokens.

> **Do not propose solutions in Phase 0\.** Diagnose only.

---

### PHASE 1 — Token-efficiency architecture principles

Before designing the file tree, state the principles you will apply, adapted specifically to ClipSAT's stack and size. At minimum, address each of the following and say concretely how it will be implemented here:

1. **Single-entry orientation.** One canonical context file (`AGENTS.md` / `CLAUDE.md`) at the repository root that an agent reads *first and often alone*: what the project is, the directory map, where to make each common kind of change, the conventions, and the commands. Target: **under 200 lines**. It is an index, not an encyclopaedia.  
2. **Locate-by-path, not by search.** Naming and foldering must be so predictable that the correct file can be named from the task description alone, without grep or full-tree reads.  
3. **Small files, one concern.** Hard cap: **≤ 300 LOC** per source file, **≤ 150** preferred for components. A file that must be read in full should be cheap to read in full.  
4. **Content ⟂ presentation ⟂ logic.** Lesson and page content lives in structured data (JSON / YAML / MDX / front-matter or a headless CMS), never inside components. Consequence: adding a lesson touches **one data file and zero code files**.  
5. **Single source of truth for design.** All colour, type, spacing, radius, shadow, and breakpoint values become named tokens in exactly one file, consumed everywhere via CSS custom properties. Consequence: a rebrand is a one-file edit.  
6. **Contracts over implementations.** Every module exposes an explicit, typed, documented interface (TypeScript types or JSDoc) placed at the top of the file. An agent should be able to *use* a module correctly after reading only its first 20 lines.  
7. **Aggressive de-duplication.** Every repeated block becomes a layout, partial, component, template, or generated artefact. Duplication is simultaneously a maintenance bug and a token tax.  
8. **Templating over repetition.** Pages that differ only in data must be generated from a template \+ data, not authored individually.  
9. **Context exclusion.** Provide `.aiignore` / `.cursorignore` / equivalent excluding `node_modules`, lockfiles, build output, minified vendor code, large media, and generated files, so no agent ever wastes context on them.  
10. **Machine-readable structure.** A `docs/ARCHITECTURE.md` plus a compact `docs/MAP.json` (path → purpose → owner-module) that lets an agent resolve "where does X live?" in one small read.  
11. **Task recipes.** `docs/RECIPES.md`: for each of the ten benchmark tasks, an explicit step list naming the exact files to open and edit. This converts open-ended exploration into a bounded lookup.  
12. **Deterministic quality gates.** Formatter, linter, type-checker, and tests configured so an agent can *verify itself* with one command instead of reasoning about correctness from source.

For each principle, state the expected token saving qualitatively (high/medium/low) and the implementation cost.

---

### PHASE 2 — Target architecture proposal (approval gate)

Deliver, and then **stop for approval**:

1. **Stack recommendation.** Either "keep current stack, restructure" or "migrate to X". Justify against: maintainability by a non-full-time engineer, build simplicity, bilingual/RTL support, static-first performance, hosting cost, and — explicitly — how well an AI agent can navigate it. Present **two options** with an honest trade-off table and a clear recommendation. Bias strongly toward the **simplest technology that meets the requirements**; novelty is a liability here.  
2. **Target directory tree,** annotated with one line per directory explaining what belongs there and what does not.  
3. **Content model:** the schema for lessons, courses, quizzes, video entries, and pages — field by field, with types, required/optional, and bilingual handling.  
4. **Component inventory:** the minimal set of UI components, each with its props contract.  
5. **Routing and URL map,** including the 301 redirect table for any change.  
6. **Before → after mapping:** every current file → its destination (or "delete: reason").  
7. **Migration sequence:** ordered work packages, each independently shippable and revertible, each with a rollback note.

---

### PHASE 3 — Foundation build

Establish, in this order: repository scaffolding and config; design token layer; base layout with correct bilingual/RTL handling; the content schema with validation; the core component set; the build and deploy pipeline. Each step ends with a green build.

### PHASE 4 — Content migration

Migrate content mechanically. Where volume justifies it, **write a migration script** rather than hand-porting — and include the script in the repository under `scripts/`. Validate every migrated record against the schema. Produce a diff report proving no content was lost, altered, or silently truncated.

### PHASE 5 — Feature parity verification (approval gate)

Deliver a checklist mapping every capability found in Phase 0 to its verified replacement, with evidence. **Stop for approval** before decommissioning anything.

### PHASE 6 — Quality, performance, accessibility, SEO

Lighthouse targets ≥ 95 for Performance, Accessibility, Best Practices, SEO on both mobile and desktop; WCAG 2.1 AA; correct `hreflang`, canonical tags, structured data (`Course`, `VideoObject`, `FAQPage` where applicable), sitemap, and Open Graph metadata in both languages; image optimisation and lazy loading; font subsetting for Arabic and Latin.

### PHASE 7 — Documentation and agent onboarding

Produce the documentation set defined in **Appendix B**. Optimise it for an AI reader with no prior context: dense, factual, hierarchical, no marketing prose.

### PHASE 8 — Verification of the token objective

Re-measure the ten benchmark tasks from **Appendix A** against the new codebase. Present a before/after table:

| Task | Files to read (before → after) | Tokens to read (before → after) | Files to edit (before → after) |
| :---- | :---- | :---- | :---- |

State the aggregate percentage reduction. **Target: ≥ 70% reduction in tokens-to-read for the median task, and ≤ 3 files edited for any routine content task.** Where a target is missed, say so plainly and propose the remedy.

---

## 4\. WORKING RULES FOR THE AI

- **Ask before assuming.** If a fact is missing (stack, hosting, intent), ask a specific question; do not invent a plausible answer.  
- **Read before writing.** Never modify a file you have not read in this session.  
- **Diffs, not dumps.** Present changes as diffs or targeted file writes. Do not reprint unchanged code.  
- **One work package per turn.** Complete it, report, then wait. Do not chain phases unprompted.  
- **Verify each step:** build passes, lint passes, types pass, site renders. Report the actual command output, not a claim of success.  
- **Flag irreversibility.** Before any deletion, overwrite, or dependency removal, state it explicitly and get confirmation.  
- **Preserve mathematical rendering exactly.** Formulae, equation rendering (MathJax/KaTeX/OMML/images), and diagram assets must render identically or better after migration; test a representative sample explicitly.  
- **Report honestly.** If an approach is failing, say so and propose an alternative rather than accumulating workarounds.  
- **Be concise in prose, complete in artefacts.** Explanations short; deliverable documents thorough.

---

## 5\. DEFINITION OF DONE

The project is complete when **all** of the following hold:

- [ ] Adding a new lesson requires editing exactly one content file, with no code changes.  
- [ ] Changing the brand palette or typeface requires editing exactly one token file.  
- [ ] A new contributor — or a fresh AI session — can become productive by reading only `AGENTS.md` (≤ 200 lines) plus at most two referenced files.  
- [ ] No source file exceeds 300 LOC.  
- [ ] Zero duplicated blocks ≥ 10 lines remain.  
- [ ] All content passes schema validation in CI.  
- [ ] Every one of the ten benchmark tasks has a documented recipe naming its exact files.  
- [ ] Measured tokens-to-read for the median benchmark task fell by ≥ 70%.  
- [ ] Lighthouse ≥ 95 across all four categories, mobile and desktop, in both languages.  
- [ ] All prior URLs resolve (directly or via 301).  
- [ ] `docs/` set complete per Appendix B; build, test, and deploy each run from a single documented command.

---

## APPENDIX A — Benchmark task suite

Use these ten representative maintenance tasks as the measuring instrument in Phases 0 and 8\. Adjust the wording to ClipSAT's real feature set, but keep the count and the spirit.

1. Add a new lesson to an existing course, in Arabic and English.  
2. Add an entirely new course with five lessons.  
3. Change the primary brand colour and heading typeface site-wide.  
4. Add a new question type to the quiz/practice module.  
5. Fix a layout defect that appears only in Arabic RTL on mobile.  
6. Embed a new YouTube/TikTok video into an existing lesson.  
7. Add a new top-level navigation item and its landing page.  
8. Update the site-wide footer (links, contact, social handles).  
9. Add structured data / SEO metadata to a lesson page type.  
10. Translate an existing English-only page into Arabic.

For each: **files to read**, **tokens to read**, **files to edit**, **estimated wall-clock time for a human**.

---

## APPENDIX B — Required documentation set

| File | Purpose | Max length |
| :---- | :---- | :---- |
| `AGENTS.md` (or `CLAUDE.md`) | Single entry point: what, where, how, conventions, commands | 200 lines |
| `docs/ARCHITECTURE.md` | System design, module boundaries, data flow, decisions | 400 lines |
| `docs/MAP.json` | Machine-readable path → purpose index | — |
| `docs/CONTENT_MODEL.md` | Content schemas, field semantics, bilingual rules, worked example | 250 lines |
| `docs/RECIPES.md` | Step-by-step file-level recipes for the ten benchmark tasks | 300 lines |
| `docs/DESIGN_TOKENS.md` | Token names, values, usage rules | 150 lines |
| `docs/DEPLOY.md` | Build, environments, deploy, rollback | 100 lines |
| `docs/DECISIONS/` | One short ADR per significant choice: context, decision, consequences | 1 page each |
| `docs/INVENTORY.md` | Phase 0 baseline (retained as historical record) | — |
| Per-directory `README.md` | 5–10 lines: what lives here, what does not | 10 lines |

Documentation rule: **write for a reader with zero prior context and a limited budget.** Facts over narrative; tables over paragraphs; absolute paths over vague references.

---

## APPENDIX C — Condensed prompt (for later sessions)

> You are a principal architect improving the ClipSAT educational website (\[stack\], \[repo\]). Optimise for two things equally: (1) a solo teacher-maintainer can make any routine change by editing 1–3 obvious files; (2) an AI agent can complete a routine task while reading the minimum possible source code — treat context tokens as a hard engineering budget.  
>   
> Rules: content lives in data files, never in code; all design values in one token file; no file over 300 LOC; zero duplicated blocks ≥ 10 lines; predictable naming so files are locatable by path alone; a ≤ 200-line `AGENTS.md` as the single orientation document; `docs/RECIPES.md` giving exact file-level steps for the ten most common tasks; `.aiignore` excluding build output and vendor code; Arabic RTL and English LTR both first-class; no URL breakage; incremental and reversible migration only.  
>   
> Start with a read-only inventory: file census, dependency graph, duplication report, dead code, hard-coded values, and a baseline measurement of how many files and tokens an agent must read to perform each of these ten tasks: \[list\]. Diagnose only — propose nothing yet. Then stop and wait for my approval before proposing the target architecture.

---

*Prepared for ClipSAT · re-engineering brief · v1.0*  
