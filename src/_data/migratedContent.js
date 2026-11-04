// Reads every migrated track under content/{track}/ (docs/CONTENT_MODEL.md) and exposes it to
// templates as migratedContent.{trackId} = { meta, chapters, practiceSet }.
// Memoized once per process and wrapped in a non-plain prototype class so Eleventy's
// TemplateData.mergeDeep passes it by reference in O(1) instead of deep-cloning 35 MB per page.
'use strict';

const fs = require('fs');
const path = require('path');

class MigratedContentStore {}

let _cachedStore = null;

module.exports = function () {
  if (_cachedStore) return _cachedStore;

  const contentRoot = path.join(__dirname, '..', '..', 'content');
  const store = new MigratedContentStore();
  if (!fs.existsSync(contentRoot)) {
    _cachedStore = store;
    return store;
  }

  const trackDirs = fs.readdirSync(contentRoot, { withFileTypes: true }).filter((d) => d.isDirectory());
  for (const track of trackDirs) {
    const dir = path.join(contentRoot, track.name);
    const metaPath = path.join(dir, '_meta.json');
    if (!fs.existsSync(metaPath)) continue;

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    const practiceSetPath = path.join(dir, '_practice-set.json');
    const practiceSet = fs.existsSync(practiceSetPath) ? JSON.parse(fs.readFileSync(practiceSetPath, 'utf8')) : null;
    const chapterFiles = fs.readdirSync(dir).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
    const chaptersById = {};
    chapterFiles.forEach((f) => {
      const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      chaptersById[data.id] = data;
    });
    const chapters = (meta.chapterOrder || []).map((id) => {
      if (!chaptersById[id]) {
        throw new Error(`migratedContent.js: content/${track.name}/_meta.json's chapterOrder references '${id}' but no matching chapter file exists`);
      }
      return chaptersById[id];
    });

    store[track.name] = { meta, chapters, practiceSet };
  }

  _cachedStore = store;
  return store;
};
