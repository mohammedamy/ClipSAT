# Cloud voice setup (OpenRouter `fish-audio/s2.1-pro-free:free` via Supabase)

The browser never sees your OpenRouter key. Flow:

```
browser (signed-in user) ──JWT──▶ Supabase Edge Function `tts-proxy` ──secret key──▶ OpenRouter
        ▲                                   │ any failure (429 / 402 / 5xx / timeout / no secret)
        └──── browser voice (Web Speech) ◀──┘  → automatic fallback, nothing breaks
```

## 1. Create a dedicated OpenRouter key
1. https://openrouter.ai/settings/keys → **Create key**, name it `clipsat-tts`.
2. Set a **credit limit** on the key (even for a free model) so a leak can never cost real money.
3. Copy it once. Treat it like a password.

## 2. Put it in Supabase (server-side only)
Never paste the key in chat, code, `.env` files that are committed, or `localStorage`.

**Option A: dashboard (no key in shell history)**
Supabase Dashboard → your project → **Edge Functions → Secrets → Add new secret**
- Name: `OPENROUTER_API_KEY`
- Value: *(paste key)*

**Option B: CLI**
```bash
cd ClipSAT
supabase login
supabase link --project-ref ynnqrxeprxhtdimzwxwx
# read -s keeps the key out of your shell history and the screen
read -s "OR_KEY?OpenRouter key: " && supabase secrets set OPENROUTER_API_KEY="$OR_KEY"; unset OR_KEY
supabase secrets list        # shows the NAME and a digest only, never the value
```

Optional secrets (defaults already match your request):
| Secret | Default | Purpose |
|---|---|---|
| `TTS_MODEL` | `fish-audio/s2.1-pro-free:free` | switch to `fish-audio/s2.1-pro` later without a redeploy of code |
| `TTS_VOICE` | `default` | override with a custom Fish Audio voice id if desired (or `none` to omit) |

## 3. Deploy the function
```bash
supabase functions deploy tts-proxy
```
`verify_jwt = true` is already in `supabase/config.toml`, so only signed-in ClipSAT users can call it.

## 4. Test it (once, from your terminal)
Use a real user access token (browser console on the site while signed in:
`(await ClipSATCloud.getClient().auth.getSession()).data.session.access_token`).
```bash
curl -s -X POST "https://ynnqrxeprxhtdimzwxwx.supabase.co/functions/v1/tts-proxy" \
  -H "Authorization: Bearer <USER_ACCESS_TOKEN>" \
  -H "apikey: <SUPABASE_ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"text":"Add three to both sides of the equation."}' \
  --output /tmp/test.mp3 -w "HTTP %{http_code}\n" && afplay /tmp/test.mp3
```
- `HTTP 200` + audible speech: done.
- `503`: secret not set / typo in the name. `429` or `402`: OpenRouter limit or credits (the site just uses the browser voice).
- `502` with a message about `voice`: set `TTS_VOICE` to a voice id from the model page.
- Logs: Dashboard → Edge Functions → `tts-proxy` → Logs.

## 5. Deploy the site
The updated `_headers` adds `media-src 'self' blob: https:` (without it the browser CSP silently blocks the cloud audio). Deploy `_site/` as usual.

## Safety checklist
- [ ] Key exists only in Supabase secrets (and your password manager).
- [ ] Key has a credit limit on OpenRouter.
- [ ] If the key ever appears in a chat/screenshot/commit: **revoke it on OpenRouter, create a new one, re-run `supabase secrets set`.**
- [ ] `git grep "sk-or-"` returns nothing.

## Behaviour notes
- Used for every hint, worked-solution, explorer and interactive-activity "Explain / Listen" button (all go through `CSVoiceTutor.speak`).
- On a rate-limit / credit / outage failure the cloud voice pauses for 30 min (2 min for other errors) per browser tab session, so later clicks start the browser voice instantly.
- Long explanations are sent in ≤600-char chunks; if a later chunk fails, the rest continues in the browser voice.
- Repeats of the same sentence are cached in memory (no extra API call).
- Per-user opt-out: `localStorage.setItem('clipsat_cloud_voice','0')`.
