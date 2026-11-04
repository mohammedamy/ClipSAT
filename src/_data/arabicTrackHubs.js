'use strict';

/**
 * src/_data/arabicTrackHubs.js (WP-21, WP-28, WP-30)
 *
 * Generates 31 native Arabic RTL syllabus hubs at /ar/{track}/index.html
 * with reciprocal hreflang and clean Arabic SEO titles & descriptions.
 */

const { stripHtmlAndMath, countChapterFlashcards, parseTrackUtilityIds } = require('./chapterPages');

module.exports = function () {
  const migrated = require('./migratedContent')();
  const hubs = [];

  for (const trackId of Object.keys(migrated).sort()) {
    const track = migrated[trackId];
    const courseMeta = (track.meta && track.meta.meta) || {};
    const titleAr = stripHtmlAndMath((courseMeta.title && courseMeta.title.ar) || (courseMeta.title && courseMeta.title.en) || trackId);
    const subAr = stripHtmlAndMath((courseMeta.subtitle && courseMeta.subtitle.ar) || '');
    const utils = parseTrackUtilityIds(trackId);
    let totalFc = 0;
    for (const ch of track.chapters) totalFc += countChapterFlashcards(ch);

    hubs.push({
      trackId,
      pageLocale: 'ar',
      isRtl: true,
      isSyllabusHub: true,
      permalink: `/ar/${trackId}/index.html`,
      canonicalPath: `/ar/${trackId}/`,
      enAltPath: `/${trackId}/`,
      arAltPath: `/ar/${trackId}/`,
      title: `${titleAr} · ClipSAT`,
      description: subAr || `دروس تفاعلية وأمثلة محلولة واختبارات محاكاة لمنهج ${titleAr} على منصة ClipSAT.`,
      courseTitle: titleAr,
      flashcardCount: totalFc,
      practiceSetId: utils.practiceSetId,
      practiceSetIcon: (track.practiceSet && track.practiceSet.icon) || '§',
      testGeneratorId: utils.testGeneratorId,
      downloadsId: utils.downloadsId,
      railNoTrackId: utils.railNoTrackId,
    });
  }

  return hubs;
};
