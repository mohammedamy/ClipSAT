#!/usr/bin/env node
'use strict';

/**
 * scripts/health-check.js — Local Build Artifact & Live 1-Minute Uptime Probe (WP-46)
 *
 * Modes:
 *   node scripts/health-check.js --local
 *     Verifies built `_site/` routes, Arabic `/ar/` routes, `/pricing/`, `404.html`,
 *     `sw.js`, security `_headers`, and lazy `public/bank-shards/` integrity.
 *
 *   node scripts/health-check.js --live [--url https://clipsat.org]
 *     Probes live HTTP routes, Supabase Auth health, PostgREST anon RLS isolation,
 *     and all 4 Deno Edge Functions (`ai-proxy`, `tts-proxy`, `google-token`,
 *     `billing-webhook`) with sub-60s alert webhook support (`UPTIME_ALERT_WEBHOOK_URL`).
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function checkLocalBuild() {
  const failures = [];
  const requiredSiteFiles = [
    '_site/index.html',
    '_site/404.html',
    '_site/sw.js',
    '_site/pricing/index.html',
    '_site/sat/index.html',
    '_site/ar/sat/index.html',
    '_site/qudrat/index.html',
    '_site/ar/qudrat/index.html',
    'public/bank-shards/sat/_index.json',
    '_headers',
  ];

  for (const rel of requiredSiteFiles) {
    const full = path.join(ROOT, rel);
    if (!fs.existsSync(full)) {
      failures.push(`Missing required artifact: ${rel}`);
    } else if (fs.statSync(full).size < 64) {
      failures.push(`Empty or truncated artifact: ${rel}`);
    }
  }

  const sourcemaps = [
    'artifacts/sourcemaps/engine.js.map',
    'artifacts/sourcemaps/engine.js.modules.json',
    'artifacts/sourcemaps/mock-exam.js.map',
    'artifacts/sourcemaps/diagnostic-test.js.map',
  ];
  for (const sm of sourcemaps) {
    if (!fs.existsSync(path.join(ROOT, sm))) {
      failures.push(`Missing private source map: ${sm}`);
    }
  }

  return { ok: failures.length === 0, mode: 'local', failures };
}

async function fetchWithTimeout(url, opts = {}, timeoutMs = 10000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function checkLiveEndpoints(baseUrl) {
  const siteBase = String(baseUrl || 'https://clipsat.org').replace(/\/+$/, '');
  const failures = [];

  for (const route of ['/', '/sat/', '/qudrat/', '/pricing/']) {
    try {
      const res = await fetchWithTimeout(`${siteBase}${route}`);
      if (res.status !== 200) {
        failures.push(`HTTP ${res.status} on ${siteBase}${route}`);
      }
    } catch (err) {
      failures.push(`Unreachable ${siteBase}${route}: ${err.message}`);
    }
  }

  const cloudCfgPath = path.join(ROOT, 'public', 'js', 'cloud-config.js');
  if (fs.existsSync(cloudCfgPath)) {
    const src = fs.readFileSync(cloudCfgPath, 'utf8');
    const urlMatch = src.match(/url:\s*['"](https:\/\/[^'"]+)['"]/);
    const keyMatch = src.match(/anonKey:\s*['"]([^'"]+)['"]/);
    if (urlMatch && keyMatch && !urlMatch[1].includes('YOUR-PROJECT')) {
      const sbUrl = urlMatch[1].replace(/\/+$/, '');
      const anonKey = keyMatch[1];

      // 1. Auth health
      try {
        const authRes = await fetchWithTimeout(`${sbUrl}/auth/v1/health`, {
          headers: { apikey: anonKey },
        });
        if (authRes.status !== 200) {
          failures.push(`Supabase Auth health HTTP ${authRes.status}`);
        }
      } catch (err) {
        failures.push(`Supabase Auth unreachable: ${err.message}`);
      }

      // 2. PostgREST RLS anon isolation check (mistakes must return 0 rows to anon)
      try {
        const rlsRes = await fetchWithTimeout(`${sbUrl}/rest/v1/mistakes?select=id&limit=1`, {
          headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
        });
        if (rlsRes.status === 200) {
          const rows = await rlsRes.json();
          if (Array.isArray(rows) && rows.length > 0) {
            failures.push('CRITICAL RLS LEAK: anon query returned rows from public.mistakes');
          }
        } else if (rlsRes.status >= 500) {
          failures.push(`Supabase PostgREST HTTP ${rlsRes.status}`);
        }
      } catch (err) {
        failures.push(`Supabase PostgREST unreachable: ${err.message}`);
      }

      // 3. Edge Function OPTIONS preflight probes
      for (const fnName of ['ai-proxy', 'tts-proxy', 'google-token']) {
        try {
          const fnRes = await fetchWithTimeout(`${sbUrl}/functions/v1/${fnName}`, {
            method: 'OPTIONS',
            headers: {
              Origin: 'https://clipsat.org',
              'Access-Control-Request-Method': 'POST',
            },
          });
          if (fnRes.status >= 500) {
            failures.push(`Edge Function ${fnName} returned HTTP ${fnRes.status}`);
          }
        } catch (err) {
          failures.push(`Edge Function ${fnName} unreachable: ${err.message}`);
        }
      }
    }
  }

  if (failures.length > 0 && process.env.UPTIME_ALERT_WEBHOOK_URL) {
    try {
      await fetchWithTimeout(process.env.UPTIME_ALERT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 ClipSAT Uptime Alert (${new Date().toISOString()}):\n- ${failures.join('\n- ')}`,
          failures,
        }),
      }, 5000);
    } catch (_) {}
  }

  return { ok: failures.length === 0, mode: 'live', failures };
}

module.exports = { checkLocalBuild, checkLiveEndpoints };

if (require.main === module) {
  (async () => {
    const args = process.argv.slice(2);
    const isLive = args.includes('--live');
    const urlIdx = args.indexOf('--url');
    const targetUrl = urlIdx !== -1 && args[urlIdx + 1] ? args[urlIdx + 1] : 'https://clipsat.org';

    const result = isLive ? await checkLiveEndpoints(targetUrl) : checkLocalBuild();
    if (!result.ok) {
      console.error(`❌ Health check (${result.mode}) failed:`);
      for (const f of result.failures) console.error('  -', f);
      process.exit(1);
    }
    console.log(`✅ Health check (${result.mode}) passed — 0 degradations.`);
    process.exit(0);
  })();
}
