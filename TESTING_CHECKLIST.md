# ClipSAT QA & Testing Checklist

This checklist provides a systematic protocol for validating ClipSAT releases across math accuracy, layout responsiveness, localization, privacy consent, document exports, and automated test pipelines.

---

## 1. 🧮 Mathematical Typesetting & Rigor

- [ ] **KaTeX Server-Side Rendering (SSR):**
  - Verify that equations on initial page load render as HTML/MathML without client-side render lag or layout shift.
  - Verify that no raw LaTeX delimiters (`\(`, `\[`, `$$`) appear in static chapter text.
- [ ] **Dynamic Content Typesetting:**
  - Open a **Diagnostic Assessment** on any track (`window.openDiagnosticTest('sat')`) and confirm questions and choices render equations via KaTeX (`.katex` spans present).
  - Generate an AI or Practice Quiz and ensure questions, options, and solutions render math expressions cleanly.
  - Open the **Mistake Review** modal and confirm that questions, wrong answers, and correct answers render fractions, radicals, and Greek symbols.
- [ ] **Bare / Naked LaTeX Auto-Wrapping:**
  - Verify that naked LaTeX formulas lacking standard delimiters (e.g. `\frac{a}{b}`) are automatically caught by `formatMath()` / `_wm()` and rendered into KaTeX.
- [ ] **Math Inequality Symbol Preservation:**
  - Check that expressions containing inequality operators (e.g. `0 < x < 5`) do not have `<` or `>` swallowed as malformed HTML tags.
- [ ] **Accessibility for Equations (a11y):**
  - Check that wide equations overflowing their display container receive `tabindex="0"`, `role="region"`, and `aria-label="Scrollable math expression"`.

---

## 2. 🌍 Bilingual Localization (RTL / LTR)

- [ ] **Language Toggle (`window.i18n`):**
  - Click the **عربي / EN** toggle button in the header and verify that the document direction flips seamlessly between `dir="ltr"` and `dir="rtl"`.
  - Confirm `lang="ar"` or `lang="en"` is set on the `<html>` root element.
- [ ] **RTL Layout Mirroring:**
  - Ensure margins, paddings, navigation menus, and breadcrumbs mirror correctly in RTL mode.
  - Ensure math expressions inside Arabic text remain strictly LTR (`dir="ltr"` or proper isolation).
- [ ] **Arabic Text Rendering:**
  - Verify Arabic fonts render clearly with proper ligature connections and appropriate line heights.
  - Ensure translated buttons, badges, and domain names display clean copy without fallback placeholders.

---

## 3. 📱 Mobile & Responsive Layouts

- [ ] **Viewport Breakpoints:**
  - Test at mobile (375px), tablet (768px), and desktop (1280px+).
  - Ensure the sidebar/drawer navigation collapses cleanly on mobile into the hamburger menu.
- [ ] **Touch Target Sizing:**
  - Confirm interactive elements (choice buttons, navigation pills, quiz options, modal close buttons) have minimum dimensions of 44×44px.
- [ ] **Table & Explorer Responsiveness:**
  - Check that tables and canvas visualizers do not blow out the horizontal viewport and can be scrolled horizontally when needed.

---

## 4. 📄 Document & Quiz Exports

- [ ] **Microsoft Word (.docx) Export:**
  - Generate a worksheet or practice exam and click **Export DOCX**.
  - Open the downloaded `.docx` in Microsoft Word and confirm equations are rendered as native Word equations (OMML), not low-resolution raster images.
- [ ] **Printable PDF:**
  - Trigger browser print (`Ctrl+P` / `Cmd+P`) on any chapter or exam page.
  - Confirm `@media print` styles remove navbars, sidebars, interactive controls, and dark backgrounds, outputting clean, paginated black-and-white copy.
- [ ] **Teacher Roster Export:**
  - Open Teacher Mode (`window.tvExportCSV` / `window.tvExportExcel`) and verify roster data exports accurately with student IDs, completed topics, and accuracy percentages.

---

## 5. 🤖 AI Tutor & Question Generation Flow

- [ ] **Authentication & Quota:**
  - Verify unauthenticated or anonymous calls receive appropriate prompts to sign in or rate-limit warnings.
  - Ensure daily quota limits (50 calls/day per student) enforce properly in Postgres.
- [ ] **Prompt Safety & Injection Guard:**
  - Test edge function prompt filter against system prompt extraction or override phrases (`ignore all previous instructions`).
- [ ] **Mathematical Output Formatting:**
  - Confirm AI tutor responses render math formulas with KaTeX rather than raw text.

---

## 6. 🍪 Cookie Consent & Privacy Compliance

- [ ] **Consent Banner Prompt:**
  - On first visit (or when cookies are cleared), verify the cookie consent banner displays at the bottom of the screen.
- [ ] **Granular Options:**
  - Test selecting "Accept All", "Reject Non-Essential", or customizing via "Preferences".
  - Verify that preferences persist in `localStorage` under `clipsat_cookie_consent_v1`.
- [ ] **Telemetry Compliance:**
  - Confirm that analytical events (`window.ClipSATAnalytics.track`) do not store cookies or personal identifiers when consent is not granted.

---

## 7. 🧪 Automated Test Verification

Run the following test commands prior to merging any release pull request:

```bash
# 1. Content & Schema Validation
npm run validate-content
npm run validate-ix
npm run validate-banks

# 2. Unit Test Suite
npm run test:unit

# 3. End-to-End & Accessibility Tests
npx playwright test

# 4. Production Build Verification
npm run build
```

### CI Pass Criteria:
- All 3 GitHub Actions checks (`build-and-review-check`, `e2e-and-a11y`, `lighthouse`) must pass with green status.
- Zero high-severity accessibility violations via axe-core.
- Lighthouse performance, accessibility, and SEO scores >= 90.
