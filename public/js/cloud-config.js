/**
 * ClipSAT Cloud Sync — public config
 * ════════════════════════════════════════════════════════════════════════
 * SAFE TO COMMIT. Supabase's "anon" key is a public key by design — it
 * only identifies which Supabase project to talk to. Actual access control
 * lives entirely in supabase/schema.sql's Row Level Security policies (a
 * signed-in user can only ever read/write the rows where user_id = their
 * own auth.uid()). Never put a Supabase *service_role* key here — that one
 * really is secret and belongs server-side only, if it's ever needed.
 *
 * Fill these in after creating your Supabase project — see
 * SUPABASE_SETUP.md for the exact, one-time manual steps.
 *
 * Leaving this untouched (the placeholder URL below) keeps cloud sync
 * completely off — cloud-sync.js detects the placeholder and no-ops, so
 * ClipSAT behaves exactly as it does today until you opt in.
 */
window.CLIPSAT_CLOUD_CONFIG = {
  url: 'https://ynnqrxeprxhtdimzwxwx.supabase.co',
  // Supabase's new-format "publishable" key — the direct replacement for the
  // legacy JWT anon key, same public-by-design guarantee (RLS in schema.sql
  // is what actually protects the data).
  anonKey: 'sb_publishable_TSqeSDachPoKNA8quZskkQ_weF1bQZG'
};

/* Set to true in a local override (not this checked-in file) to see
   [ClipSATCloud] debug logs in the console while testing. */
window.CLIPSAT_CLOUD_DEBUG = false;
