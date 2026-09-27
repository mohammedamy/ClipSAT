/**
 * Minimal static file server for _site/, used only by playwright.config.js's
 * webServer. No extra devDependency (http-server, serve, ...) needed for
 * something this small, and it means the e2e suite always serves the exact
 * `npm run build` output, not a dev-mode Eleventy rebuild.
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..', '_site');
const PORT = process.env.E2E_PORT ? Number(process.env.E2E_PORT) : 8791;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
};

/* roots are searched in order, as if laid over each other; service-worker.spec.js lays a
   simulated deploy over _site this way. hits counts requests per path. */
function createServer(roots = [ROOT]) {
  const hits = {};
  const server = http.createServer((req, res) => {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    hits[reqPath] = (hits[reqPath] || 0) + 1;
    const tryRoot = (i) => {
      if (i >= roots.length) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      let filePath = path.join(roots[i], reqPath);
      if (!filePath.startsWith(roots[i])) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      fs.stat(filePath, (err, stat) => {
        if (!err && stat.isDirectory()) filePath = path.join(filePath, 'index.html');
        fs.readFile(filePath, (err2, data) => {
          if (err2) return tryRoot(i + 1);
          res.writeHead(200, { 'Content-Type': TYPES[path.extname(filePath)] || 'application/octet-stream' });
          res.end(data);
        });
      });
    };
    tryRoot(0);
  });
  server.hits = hits;
  return server;
}

module.exports = { createServer, ROOT };

if (require.main === module) {
  createServer().listen(PORT, () => {
    console.log(`e2e static server serving ${ROOT} on http://127.0.0.1:${PORT}`);
  });
}
