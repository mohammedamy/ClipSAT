// Reads every migrated track under content/{track}/ (docs/CONTENT_MODEL.md) and exposes it to
// templates as migratedContent.{trackId} = { meta, chapters, practiceSet }. A track only needs
// to exist as a content/{track}/ directory with a _meta.json to show up here — no code change
// needed to add the next migrated track.
const fs = require('fs');
const path = require('path');

module.exports = function () {
  const contentRoot = path.join(__dirname, '..', '..', 'content');
  const result = {};
  if (!fs.existsSync(contentRoot)) return result;

  const trackDirs = fs.readdirSync(contentRoot, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const track of trackDirs) {
    const dir = path.join(contentRoot, track.name);
    const metaPath = path.join(dir, '_meta.json');
    if (!fs.existsSync(metaPath)) continue; // not a real migrated track dir

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const practiceSetPath = path.join(dir, '_practice-set.json');
    const practiceSet = fs.existsSync(practiceSetPath) ? JSON.parse(fs.readFileSync(practiceSetPath, 'utf8')) : null;
    const chapterFiles = fs.readdirSync(dir).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
    const chaptersById = {};
    chapterFiles.forEach((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      chaptersById[data.id] = data;
    });
    // chapterOrder (meta._meta.json) is the source of truth for display order — NOT filesystem
    // directory-listing order, which isn't guaranteed to match. scripts/validate-content.js
    // checks every chapterOrder entry has a matching file, so this should never silently drop one,
    // but fail loudly here too rather than rendering an incomplete page if it somehow does.
    const chapters = (meta.chapterOrder || []).map((id) => {
      if (!chaptersById[id]) throw new Error(`migratedContent.js: content/${track.name}/_meta.json's chapterOrder references '${id}' but no matching chapter file exists`);
      return chaptersById[id];
    });

    result[track.name] = { meta, chapters, practiceSet };
  }
  return result;
};
