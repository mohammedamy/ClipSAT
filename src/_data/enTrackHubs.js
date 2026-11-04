'use strict';

const { countChapterFlashcards } = require('./chapterPages');

module.exports = function () {
  const migrated = require('./migratedContent')();
  const map = {};
  for (const trackId of Object.keys(migrated)) {
    const track = migrated[trackId];
    let totalFc = 0;
    for (const ch of (track.chapters || [])) {
      totalFc += countChapterFlashcards(ch);
    }
    map[trackId] = { flashcardCount: totalFc };
  }
  return map;
};
