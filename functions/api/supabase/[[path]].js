/**
 * Cloudflare Pages Function — First-Party Supabase Reverse Proxy (/api/supabase/*)
 * Enables 100% same-origin Auth, PostgREST, and Edge Function requests when
 * client-side privacy/anti-tracking extensions block direct *.supabase.co calls.
 */
const DEFAULT_UPSTREAM = 'https://ynnqrxeprxhtdimzwxwx.supabase.co';
const ALLOWED_ORIGINS = new Set([
  'https://clipsat.org',
  'https://www.clipsat.org',
]);

function resolveOrigin(req) {
  const origin = (req.headers.get('origin') || '').trim();
  if (!origin) return 'https://clipsat.org';
  if (ALLOWED_ORIGINS.has(origin)) return origin;
  if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return origin;
  return '';
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const origin = resolveOrigin(request);
  if (!origin) {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const corsHeaders = {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, apikey, x-client-info, content-type, prefer, range',
    'Vary': 'Origin',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const upstreamBase = String((env && env.SUPABASE_UPSTREAM_URL) || DEFAULT_UPSTREAM).replace(/\/+$/, '');
  const subPath = Array.isArray(params.path) ? params.path.join('/') : String(params.path || '');
  const reqUrl = new URL(request.url);
  const targetUrl = `${upstreamBase}/${subPath}${reqUrl.search}`;

  const fwdHeaders = new Headers();
  for (const [k, v] of request.headers.entries()) {
    const lk = k.toLowerCase();
    if (lk === 'host' || lk === 'cf-connecting-ip' || lk === 'x-forwarded-for') continue;
    fwdHeaders.set(k, v);
  }

  const init = {
    method: request.method,
    headers: fwdHeaders,
    redirect: 'manual',
  };
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body;
  }

  const upstreamRes = await fetch(targetUrl, init);
  const resHeaders = new Headers(upstreamRes.headers);
  for (const [k, v] of Object.entries(corsHeaders)) {
    resHeaders.set(k, v);
  }

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    statusText: upstreamRes.statusText,
    headers: resHeaders,
  });
}
