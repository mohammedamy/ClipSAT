/**
 * Stamps sw.js's SW_VERSION with a hash of every file the service worker serves cache-first
 * (Plan 5 Phase 5.017, ADR 0046). Run by .eleventy.js after each build, on _site/sw.js.
 *
 * A browser installs a new service worker only when sw.js's own bytes change, and only a new
 * service worker drops the old caches. SW_VERSION used to be bumped by hand and was missed
 * for weeks, so returning visitors kept a stale engine.js. With the hash in it, sw.js changes
 * whenever any cached file does, and never otherwise.
 */
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

/* Must cover everything sw.js's isShellAsset() matches: the home page, the listed root files,
   and every file under css/ and js/. */
const ROOT_FILES = ['index.html', 'manifest.json', 'clipsat-logo.jpg', 'favicon.png', 'icon-192.png'];
const ASSET_DIRS = ['css', 'js'];
const VERSION_RE = /const SW_VERSION = '([^'-]+)(?:-[0-9a-f]+)?';/;

function walk(root, rel, out) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) return;
  for (const name of fs.readdirSync(abs)) {
    const r = rel + '/' + name;
    if (fs.statSync(path.join(root, r)).isDirectory()) walk(root, r, out);
    else out.add(r);
  }
}

/* roots: directories searched in order, as if laid over each other (the first holding a file
   wins). The build passes just _site; the e2e test lays a simulated deploy over it. */
function readFrom(roots, rel) {
  for (const root of roots) {
    const abs = path.join(root, rel);
    if (fs.existsSync(abs)) return fs.readFileSync(abs);
  }
  return null;
}

function assetHash(roots) {
  const files = new Set();
  for (const root of roots) {
    ROOT_FILES.forEach((f) => { if (fs.existsSync(path.join(root, f))) files.add(f); });
    ASSET_DIRS.forEach((d) => walk(root, d, files));
  }
  const hash = crypto.createHash('sha256');
  for (const rel of [...files].sort()) {
    hash.update(rel + '\0');
    hash.update(readFrom(roots, rel));
    hash.update('\0');
  }
  return hash.digest('hex').slice(0, 12);
}

/* The text of sw.js with SW_VERSION set to "<base>-<hash>". The base is the hand-set part in
   the source file (e.g. v2.1); change it only to force a new version with no file change. */
function stampedSw(roots) {
  const src = readFrom(roots, 'sw.js').toString('utf8');
  const m = VERSION_RE.exec(src);
  if (!m) throw new Error("stamp-sw-version: no `const SW_VERSION = '...';` line in sw.js");
  return src.replace(VERSION_RE, `const SW_VERSION = '${m[1]}-${assetHash(roots)}';`);
}

function stampSwVersion(siteDir) {
  fs.writeFileSync(path.join(siteDir, 'sw.js'), stampedSw([siteDir]));
}

module.exports = { assetHash, stampedSw, stampSwVersion };

if (require.main === module) {
  stampSwVersion(path.join(__dirname, '..', '_site'));
}
