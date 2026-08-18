// WP6 pilot verification data source — reads content/qudrat/*.json (the new content system)
// so src/wp6-verify/index.njk can render it through the new partials for side-by-side
// comparison against the live legacy /qudrat/ page. TEMPORARY: remove this file and
// src/wp6-verify/ once WP6's parity verification is complete and reviewed — see
// docs/PHASE1-2_TARGET_ARCHITECTURE.md WP6 status.
const fs = require('fs');
const path = require('path');

module.exports = function () {
  const dir = path.join(__dirname, '..', '..', 'content', 'qudrat');
  const meta = JSON.parse(fs.readFileSync(path.join(dir, '_meta.json'), 'utf8'));
  const practiceSetPath = path.join(dir, '_practice-set.json');
  const practiceSet = fs.existsSync(practiceSetPath) ? JSON.parse(fs.readFileSync(practiceSetPath, 'utf8')) : null;
  const chapterFiles = fs.readdirSync(dir).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
  const chapters = chapterFiles.map((f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')));
  return { meta, chapters, practiceSet };
};
