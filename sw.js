/**
 * ClipSAT Service Worker  v2.0
 * ─────────────────────────────────────────────────────────────────────────────
 * Strategy
 * ─────────
 *  SHELL_CACHE   : Cache-first, versioned.  Core app files (index.html, JS,
 *                  CSS, logo).  Updated on every SW version bump.
 *  COURSE_CACHE  : Stale-while-revalidate.  /courses/*.json files.
 *                  Serves cached JSON instantly; refreshes in background.
 *  CDN_CACHE     : Cache-first, long TTL.   KaTeX & MathJax CDN assets.
 *  DYNAMIC_CACHE : Network-first, fallback. Everything else.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const SW_VERSION = 'v2.0.0';

const CACHE = {
  SHELL   : 'clipsat-shell-' + SW_VERSION,
  COURSES : 'clipsat-courses-' + SW_VERSION,
  CDN     : 'clipsat-cdn-' + SW_VERSION,
  DYNAMIC : 'clipsat-dynamic-' + SW_VERSION,
};

/* ── Files to pre-cache on install ── */
var SHELL_ASSETS = [
  './',
  './index.html',
  './sw.js',
  './manifest.json',
  './course-loader.js',
  './router.js',
  './storage.js',
  './desmos-widget.js',
  './clipsat-logo.jpg',
];

/* ── CDN origins whose assets should be cached ── */
var CDN_ORIGINS = [
  'cdn.jsdelivr.net',
  'cdnjs.cloudflare.com',
  'unpkg.com',
  'api.desmos.com',
];

/* ── KaTeX / MathJax assets to pre-cache ── */
var CDN_PRECACHE = [
  'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.js',
  'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css',
  'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/contrib/auto-render.min.js',
];

/* ═══════════════════════════════════════════════════════════════════════════
 * INSTALL
 * ═════════════════════════════════════════════════════════════════════════*/
self.addEventListener('install', function(event) {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE.SHELL).then(function(cache) {
        return cache.addAll(SHELL_ASSETS).catch(function(err) {
          console.warn('[SW] Shell pre-cache partial failure:', err);
        });
      }),
      caches.open(CACHE.CDN).then(function(cache) {
        return Promise.allSettled(
          CDN_PRECACHE.map(function(url) {
            return cache.add(url).catch(function() {});
          })
        );
      })
    ]).then(function() {
      return self.skipWaiting();
    })
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
 * ACTIVATE — delete stale caches
 * ═════════════════════════════════════════════════════════════════════════*/
self.addEventListener('activate', function(event) {
  var validCaches = Object.values(CACHE);
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(k) { return k.startsWith('clipsat-') && !validCaches.includes(k); })
          .map(function(k) { return caches.delete(k); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

/* ═══════════════════════════════════════════════════════════════════════════
 * FETCH
 * ═════════════════════════════════════════════════════════════════════════*/
self.addEventListener('fetch', function(event) {
  var request = event.request;
  var url;
  try { url = new URL(request.url); } catch(e) { return; }

  if (request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;
  if (url.pathname.startsWith('/api/')) return;

  /* CDN → cache-first */
  if (CDN_ORIGINS.some(function(o) { return url.hostname === o; })) {
    event.respondWith(cdnFirst(request));
    return;
  }

  /* Course JSON → stale-while-revalidate */
  if (url.pathname.includes('/courses/') && url.pathname.endsWith('.json')) {
    event.respondWith(staleWhileRevalidate(request, CACHE.COURSES));
    return;
  }

  /* Shell assets → cache-first */
  if (isShellAsset(url)) {
    event.respondWith(cacheFirst(request, CACHE.SHELL));
    return;
  }

  /* Everything else → network-first */
  event.respondWith(networkFirst(request, CACHE.DYNAMIC));
});

/* ═══════════════════════════════════════════════════════════════════════════
 * STRATEGIES
 * ═════════════════════════════════════════════════════════════════════════*/

function cacheFirst(request, cacheName) {
  return caches.open(cacheName).then(function(cache) {
    return cache.match(request).then(function(cached) {
      if (cached) return cached;
      return fetch(request).then(function(response) {
        if (response.ok) cache.put(request, response.clone());
        return response;
      }).catch(function() { return offlineFallback(request); });
    });
  });
}

function cdnFirst(request) {
  return caches.open(CACHE.CDN).then(function(cache) {
    return cache.match(request).then(function(cached) {
      if (cached) return cached;
      return fetch(request).then(function(response) {
        if (response.ok) cache.put(request, response.clone());
        return response;
      }).catch(function() {
        return new Response('/* CDN unavailable offline */', {
          status: 503, headers: { 'Content-Type': 'text/javascript' }
        });
      });
    });
  });
}

function staleWhileRevalidate(request, cacheName) {
  return caches.open(cacheName).then(function(cache) {
    return cache.match(request).then(function(cached) {
      var fetchPromise = fetch(request).then(function(response) {
        if (response.ok) cache.put(request, response.clone());
        return response;
      }).catch(function() { return null; });

      return cached || fetchPromise.then(function(r) { return r || offlineFallback(request); });
    });
  });
}

function networkFirst(request, cacheName) {
  return caches.open(cacheName).then(function(cache) {
    return fetch(request).then(function(response) {
      if (response.ok) cache.put(request, response.clone());
      return response;
    }).catch(function() {
      return cache.match(request).then(function(cached) {
        return cached || offlineFallback(request);
      });
    });
  });
}

function offlineFallback(request) {
  var url = new URL(request.url);

  if (url.pathname.endsWith('.json')) {
    return new Response(JSON.stringify({ offline: true, error: 'No network connection.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  var accept = request.headers.get('Accept') || '';
  if (accept.includes('text/html')) {
    return new Response([
      '<!doctype html><html lang="en"><head>',
      '<meta charset="utf-8"><title>ClipSAT — Offline</title>',
      '<meta name="viewport" content="width=device-width,initial-scale=1">',
      '<style>body{font-family:system-ui,sans-serif;display:flex;align-items:center;',
      'justify-content:center;height:100vh;margin:0;background:#f9fafb}',
      '.box{text-align:center;padding:40px}h1{color:#4f46e5}p{color:#6b7280}</style>',
      '</head><body><div class="box">',
      '<h1>You\'re offline</h1>',
      '<p>ClipSAT needs a connection to load this page.</p>',
      '<p>Your notes, quiz progress, and mistake log are saved locally.</p>',
      '<button onclick="location.reload()" style="margin-top:20px;padding:10px 24px;',
      'background:#4f46e5;color:#fff;border:none;border-radius:8px;cursor:pointer">',
      'Try again</button></div></body></html>'
    ].join(''), { status: 503, headers: { 'Content-Type': 'text/html' } });
  }

  return new Response('', { status: 503 });
}

function isShellAsset(url) {
  return SHELL_ASSETS.some(function(path) {
    try {
      var assetUrl = new URL(path, self.location.origin);
      return assetUrl.pathname === url.pathname;
    } catch(e) { return false; }
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
 * MESSAGE HANDLER
 * ═════════════════════════════════════════════════════════════════════════*/
self.addEventListener('message', function(event) {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CACHE_COURSE') {
    var courseId = event.data.courseId;
    if (!courseId) return;
    var url = new URL('./courses/' + courseId + '.json', self.location.origin).href;
    caches.open(CACHE.COURSES).then(function(cache) {
      fetch(url).then(function(r) { if (r.ok) cache.put(url, r); }).catch(function(){});
    });
  }
});
