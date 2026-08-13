# ClipSAT Cloud Sync — Setup

This is Roadmap Pillar 5's foundation piece: optional, free-tier-friendly
accounts that let a student's mistake log, flashcard schedule, XP/streak,
and exam date follow them across devices. It's built as a thin layer on
top of the localStorage system ClipSAT already has — nothing existing
changes or breaks if you never finish this setup.

**What's already done (code, in this repo):**
- [`supabase/schema.sql`](supabase/schema.sql) — the database schema + row-level-security policies
- [`public/js/cloud-sync.js`](public/js/cloud-sync.js) — the sync engine (mirrors localStorage ↔ Supabase)
- [`public/js/cloud-config.js`](public/js/cloud-config.js) — where your project's keys go
- A "☁️ Sign in" button + magic-link modal, wired into every track page via `build.js`

**What only you can do** (account creation isn't something I can do on your
behalf): create the Supabase project itself and paste in its keys. That's
steps 1–4 below — about 10 minutes.

---

### 1. Create a Supabase account + project
1. Go to **[supabase.com](https://supabase.com)** → "Start your project" → sign up (GitHub login is fastest).
2. Click **New project**. Name it `clipsat` (or anything), pick a region close to your main audience (e.g. an EU/Middle East region given Qudrat/Tahsili's Gulf audience), set a database password (save it somewhere — you likely won't need it again since we only use the anon key), and create it. Takes ~2 minutes to provision.

### 2. Run the schema
1. In your new project, open **SQL Editor** (left sidebar) → **New query**.
2. Paste the entire contents of [`supabase/schema.sql`](supabase/schema.sql) and click **Run**.
3. You should see `Success. No rows returned.` — this created 4 tables (`profiles`, `mistakes`, `srs_state`, `chapter_visits`), turned on Row Level Security on all of them, and set up the trigger that auto-creates a profile row on signup.

### 3. Turn on email magic-link sign-in
1. **Authentication → Providers** — Email should already be enabled by default. No password field is used; ClipSAT only ever calls `signInWithOtp`, so students get a one-click emailed link, never a password to remember or for you to store.
2. **Authentication → URL Configuration** — add your live site URL (`https://mohammedamy.github.io/ClipSAT` and `https://mohammedamy.github.io/ClipSAT/*`) to the Redirect URLs allow-list, plus `http://localhost:8080/*` (or whatever port `npx @11ty/eleventy --serve` uses) for local testing.

### 4. Copy your keys into the site
1. **Project Settings → API**. Copy the **Project URL** and the **`anon` `public`** key (⚠️ not the `service_role` key — that one is genuinely secret and this static site should never hold it).
2. Open [`public/js/cloud-config.js`](public/js/cloud-config.js) and replace the two placeholder values:
   ```js
   window.CLIPSAT_CLOUD_CONFIG = {
     url: 'https://xxxxxxxxxxxx.supabase.co',
     anonKey: 'eyJhbGciOi...'
   };
   ```
   This file is safe to commit — see the comment at the top of it for why the anon key isn't a secret here (Row Level Security in `schema.sql` is what actually protects the data).

### 5. Build and test locally
```bash
npm run build
npx @11ty/eleventy --serve
```
Open any track page, click **☁️ Sign in** in the header, enter your own email, and confirm the magic link arrives and signs you in (the button should switch to showing your email). Answer a couple of practice questions wrong to populate the mistake log, then check **Table Editor → mistakes** in the Supabase dashboard a few seconds later — you should see rows appear (cloud-sync.js pushes ~4 seconds after a watched localStorage key changes).

### That's it
From here, nothing else in the codebase needs to change for basic sync to work — `cloud-sync.js` already listens for the same localStorage keys every existing ClipSAT feature (mistake log, flashcards, streaks, daily goal, exam countdown) already reads and writes.

### Already-set-up projects: pick up the new `accuracy` table
If your Supabase project was created before this update, it doesn't have the
new `public.accuracy` table yet (Pillar 3 MVP: mastery-by-chapter heatmap +
accuracy trend, in the **📊 Progress** modal). Re-run `schema.sql` — every
statement in it is `create ... if not exists` / `create or replace`, so
running the whole file again is safe and only adds what's missing; it won't
touch or duplicate your existing `profiles`/`mistakes`/`srs_state`/
`chapter_visits` rows.

**Next roadmap steps once this is live** (see Pillar 3 in the roadmap):
- ~~A per-student mastery dashboard reading from these same tables~~ — done: the Progress modal now shows a 14-day accuracy trend and a per-track "weakest chapters" heatmap, both cloud-synced via the new `accuracy` table.
- Teacher/parent view (a `role` column + a "linked students" table — not yet in `schema.sql`)
- Free-response auto-grading and predictive exam scores

**Rollback:** if anything looks wrong, set `public/js/cloud-config.js` back to the placeholder `YOUR-PROJECT` URL — `cloud-sync.js` no-ops immediately and every existing localStorage-only feature keeps working exactly as it did before this change.
