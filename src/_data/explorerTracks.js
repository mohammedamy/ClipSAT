// Tracks whose canvas explorers ship as their own file (src/scripts/explorers/{track}.js →
// public/js/ex/{track}.js, ADR 0039). base.njk loads a track's file only when it is listed here.
const fs = require('fs');
const path = require('path');

module.exports = function () {
  const dir = path.join(__dirname, '..', 'scripts', 'explorers');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, '')).sort();
};
