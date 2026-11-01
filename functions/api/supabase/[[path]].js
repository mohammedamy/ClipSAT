/**
 * Cloudflare Pages Function — First-Party Supabase Reverse Proxy
 * Route: /api/supabase/* -> https://ynnqrxeprxhtdimzwxwx.supabase.co/*
 *
 * Why this exists:
 *   Antivirus anti-tracking Chrome extensions (AVG AntiTrack, Avast AntiTrack,
 *   Norton, Brave Shields) block background XHR/fetch requests to third-party
 *   *.supabase.co domains while allowing all first-party requests to clipsat.org.
 *   When clipsat.org is served behind Cloudflare Pages / Workers, this endpoint
 *   proxies Auth (/auth/v1/*), PostgREST (/rest/v1/*), and Edge Functions
 *   (/functions/v1/*) over first-party HTTPS with strict origin validation.
 */

const UPSTREAM_ORIGIN = 'https://ynnqrxeprxhtdimzwxwx.supabase.co';

const ALLOWED_ORIGINS = new Set([
  'https://clipsat.org',
  'https://www.clipsat.org',
  'http://localhost:8080',
  'http://localhost:3000',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:3000'
]);

const ALLOWED_PREFIXES = ['/auth/v1/', '/rest/v1/', '/functions/v1/'];
const ALLOWED_METHODS = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']);

function getCorsHeaders(origin) {
  const allowedOrigin = (origin && ALLOWED_ORIGINS.has(origin)) ? origin : 'https://clipsat.org';
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info, prefer, range',
    'Access-Control-Expose-Headers': 'content-range, x-supabase-api-version',
    'Vary': 'Origin'
  };
}

export async function onRequest(context) {
  const { request } = context;
  const origin = request.headers.get('Origin') || '';
  const corsHeaders = getCorsHeaders(origin);

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (!ALLOWED_METHODS.has(request.method)) {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  // Enforce strict origin validation on state-mutating requests when Origin is present
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return new Response(JSON.stringify({ error: 'Forbidden origin' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const incomingUrl = new URL(request.url);
  const subPath = incomingUrl.pathname.replace(/^\/api\/supabase/, '') || '/';

  // Prevent path traversal and restrict strictly to public Supabase API surfaces
  if (subPath.includes('..') || !ALLOWED_PREFIXES.some((p) => subPath.startsWith(p))) {
    return new Response(JSON.stringify({ error: 'Invalid proxy path' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const targetUrl = new URL(subPath + incomingUrl.search, UPSTREAM_ORIGIN);

  const forwardHeaders = new Headers();
  const safeForwardList = [
    'accept', 'accept-language', 'apikey', 'authorization',
    'content-type', 'prefer', 'range', 'x-client-info'
  ];
  for (const h of safeForwardList) {
    const val = request.headers.get(h);
    if (val) forwardHeaders.set(h, val);
  }
  const clientIp = request.headers.get('CF-Connecting-IP');
  if (clientIp) forwardHeaders.set('X-Forwarded-For', clientIp);

  const init = {
    method: request.method,
    headers: forwardHeaders,
    redirect: 'manual'
  };
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = request.body;
  }

  const upstreamRes = await fetch(targetUrl.toString(), init);
  const outHeaders = new Headers(upstreamRes.headers);
  Object.entries(corsHeaders).forEach(([k, v]) => outHeaders.set(k, v));

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    statusText: upstreamRes.statusText,
    headers: outHeaders
  });
}
