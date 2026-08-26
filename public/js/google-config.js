/**
 * ClipSAT Google Forms/Classroom integration — public config
 * ════════════════════════════════════════════════════════════════════════
 * SAFE TO COMMIT. A "Web application" OAuth Client ID is a public
 * identifier by design (it only tells Google which registered app is
 * asking) — it is not a secret the way an API key or client *secret*
 * would be. Google enforces the real security boundary server-side via
 * the "Authorized JavaScript origins" list on the OAuth client itself:
 * only page loads from an origin on that allowlist can complete a token
 * request with this Client ID. Never put a client *secret* here — this
 * integration is a pure client-side (no backend) flow and structurally
 * has no use for one; if a setup step ever asks you to generate one,
 * you picked the wrong OAuth client type ("Web application" is correct).
 *
 * Fill this in after creating your Google Cloud project (Forms API +
 * Classroom API enabled, OAuth consent screen configured, a Web
 * application OAuth Client ID created with this site's origin(s)
 * authorized) — see the setup walkthrough for the exact steps.
 *
 * Leaving this untouched (the placeholder client ID below) keeps the
 * whole Google Forms feature completely off — every module that depends
 * on it (google-integration.js, math-image.js, forms-api.js,
 * quiz-capture-ui.js) detects the placeholder and no-ops, so ClipSAT
 * behaves exactly as it does today until you opt in.
 * This is also the feature flag: real visitors never see any
 * "Create Google Form" UI until a real Client ID replaces the
 * placeholder and the site is redeployed.
 */
window.CLIPSAT_GOOGLE_CONFIG = {
  clientId: '671186559851-fj25ijo5lo3vcfdnvmkh7oa04lhkfboo.apps.googleusercontent.com'
};

/* Set to true in a local override (not this checked-in file) to see
   [ClipSATGoogle] debug logs in the console while testing. */
window.CLIPSAT_GOOGLE_DEBUG = false;
