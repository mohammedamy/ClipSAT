/**
 * Mobile Lighthouse audit of the home page and every track page (Plan 5 Phase 5.018).
 *
 * Serves the built _site/ gzip-compressed, the way GitHub Pages serves it (uncompressed, the
 * track pages look 3-5x heavier than they are), runs Lighthouse's default mobile audit on each
 * page, and writes lighthouse-report/summary.md (a table of scores and metrics) plus one JSON
 * report per page.
 *
 *   node scripts/lighthouse-audit.js [--pages=home,geo,...] [--min=0.9]
 *
 * Lighthouse runs through `npx lighthouse@12`, so it is not a project dependency. Set
 * CHROME_PATH if Chrome is not where Lighthouse looks by default. With --min, the script exits
 * non-zero when any page's performance score is below it; without, it only reports.
 * Run from .github/workflows/lighthouse.yml, which has the internet access the page's CDN
 * scripts and fonts need; measured without them, the numbers mean little.
 */
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const SITE = path.join(ROOT, '_site');
const OUT = path.join(ROOT, 'lighthouse-report');
const PORT = Number(process.env.LH_PORT || 8795);
const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')));

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
};
const COMPRESS = new Set(['.html', '.js', '.css', '.json', '.svg']);

function serve() {
  return http.createServer((req, res) => {
    let file = path.join(SITE, decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(SITE)) { res.writeHead(403); res.end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404); res.end(); return; }
      const ext = path.extname(file);
      const headers = { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'max-age=600' };
      if (COMPRESS.has(ext) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
        headers['Content-Encoding'] = 'gzip';
        data = zlib.gzipSync(data);
      }
      res.writeHead(200, headers);
      res.end(data);
    });
  }).listen(PORT, '127.0.0.1');
}

/* the home page plus every track page the build produced (bank-data/ lists the tracks) */
function pages() {
  if (args.pages) return args.pages.split(',');
  const tracks = fs.readdirSync(path.join(ROOT, 'bank-data'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
    .filter((t) => fs.existsSync(path.join(SITE, t, 'index.html')))
    .sort();
  return ['home'].concat(tracks);
}

const pct = (s) => (s == null ? '—' : String(Math.round(s * 100)));

/* async, not execFileSync: the server above runs in this same process and must keep answering */
function run(cmd, argv) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, argv, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`lighthouse exited with ${code}`))));
  });
}

async function audit(page) {
  const url = `http://127.0.0.1:${PORT}/${page === 'home' ? '' : page + '/'}`;
  const out = path.join(OUT, `${page}.json`);
  await run('npx', ['--yes', 'lighthouse@12', url, '--quiet', '--output=json', `--output-path=${out}`,
    '--chrome-flags=--headless=new --no-sandbox']);
  const r = JSON.parse(fs.readFileSync(out, 'utf8'));
  const c = r.categories, a = r.audits;
  return {
    page,
    perf: c.performance.score, a11y: c.accessibility.score, bp: c['best-practices'].score, seo: c.seo.score,
    fcp: a['first-contentful-paint'].displayValue, lcp: a['largest-contentful-paint'].displayValue,
    tbt: a['total-blocking-time'].displayValue, cls: a['cumulative-layout-shift'].displayValue,
    weight: a['total-byte-weight'].displayValue.replace('Total size was ', ''),
  };
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const server = serve();
  const rows = [];
  try {
    for (const p of pages()) {
      try { rows.push(await audit(p)); } catch (e) { rows.push({ page: p, error: String(e.message || e).split('\n')[0] }); }
    }
  } finally {
    server.close();
  }
  const lines = [
    '## Lighthouse (mobile)',
    '',
    '| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS | Weight |',
    '|---|---|---|---|---|---|---|---|---|---|',
    ...rows.map((r) => (r.error
      ? `| ${r.page} | error: ${r.error} | | | | | | | | |`
      : `| ${r.page} | ${pct(r.perf)} | ${pct(r.a11y)} | ${pct(r.bp)} | ${pct(r.seo)} | ${r.fcp} | ${r.lcp} | ${r.tbt} | ${r.cls} | ${r.weight} |`)),
  ];
  const summary = lines.join('\n') + '\n';
  fs.writeFileSync(path.join(OUT, 'summary.md'), summary);
  process.stdout.write(summary);
  if (args.min) {
    const min = Number(args.min);
    const low = rows.filter((r) => r.error || r.perf < min);
    if (low.length) {
      console.error(`Below ${min}: ${low.map((r) => r.page).join(', ')}`);
      process.exit(1);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
