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

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.join(ROOT, reqPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) filePath = path.join(filePath, 'index.html');
    fs.readFile(filePath, (err2, data) => {
      if (err2) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(filePath)] || 'application/octet-stream' });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`e2e static server serving ${ROOT} on http://127.0.0.1:${PORT}`);
});
