'use strict';

/**
 * src/_data/practicePages.js (WP-21, WP-30)
 *
 * Generates paginated EN & AR practice set routes (20 problems per page max)
 * so every practice route stays comfortably under < 90 KB HTML and < 3,500 DOM nodes.
 *   - /{track}/practice/index.html (and /part-2/, /part-3/ when > 20 items)
 *   - /ar/{track}/practice/index.html (and /part-2/, /part-3/ when > 20 items)
 */

const { stripHtmlAndMath, countChapterFlashcards, parseTrackUtilityIds } = require('./chapterPages');

const ITEMS_PER_PART = 8;

module.exports = function () {
  const migrated = require('./migratedContent')();
  const pages = [];

  for (const trackId of Object.keys(migrated).sort()) {
    const track = migrated[trackId];
    if (!track.practiceSet || !Array.isArray(track.practiceSet.items) || !track.practiceSet.items.length) {
      continue;
    }
    const courseMeta = (track.meta && track.meta.meta) || {};
    const courseTitleEn = stripHtmlAndMath((courseMeta.title && courseMeta.title.en) || trackId.toUpperCase());
    const courseTitleAr = stripHtmlAndMath((courseMeta.title && courseMeta.title.ar) || courseTitleEn);
    const utils = parseTrackUtilityIds(trackId);
    let totalFc = 0;
    for (const ch of track.chapters) totalFc += countChapterFlashcards(ch);

    const allItems = track.practiceSet.items;
    const chunks = [];
    for (let i = 0; i < allItems.length; i += ITEMS_PER_PART) {
      chunks.push({ sliceStart: i, sliceEnd: Math.min(i + ITEMS_PER_PART, allItems.length), items: allItems.slice(i, i + ITEMS_PER_PART) });
    }

    for (const locale of ['en', 'ar']) {
      const locPrefix = locale === 'ar' ? '/ar' : '';
      const practiceParts = chunks.map((chunkObj, idx) => {
        const chunk = chunkObj.items;
        const pNum = idx + 1;
        const firstN = chunk[0] ? chunk[0].number : (idx * ITEMS_PER_PART + 1);
        const lastN = chunk[chunk.length - 1] ? chunk[chunk.length - 1].number : (idx * ITEMS_PER_PART + chunk.length);
        const url = pNum === 1
          ? `${locPrefix}/${trackId}/practice/`
          : `${locPrefix}/${trackId}/practice/part-${pNum}/`;
        const label = locale === 'ar'
          ? `الجزء ${pNum} (${firstN}–${lastN})`
          : `Part ${pNum} (Q${firstN}–Q${lastN})`;
        return { partNum: pNum, url, label, firstN, lastN };
      });

      chunks.forEach((chunkObj, idx) => {
        const pNum = idx + 1;
        const partInfo = practiceParts[idx];
        const enSub = pNum === 1 ? `/${trackId}/practice/` : `/${trackId}/practice/part-${pNum}/`;
        const arSub = pNum === 1 ? `/ar/${trackId}/practice/` : `/ar/${trackId}/practice/part-${pNum}/`;
        const cTitle = locale === 'ar' ? courseTitleAr : courseTitleEn;
        const baseHeadEn = stripHtmlAndMath(track.practiceSet.heading || 'Practice Set');
        const headEn = chunks.length > 1 ? `${baseHeadEn} — Part ${pNum} (Q${partInfo.firstN}–Q${partInfo.lastN})` : baseHeadEn;
        const headAr = chunks.length > 1
          ? `مجموعة تدريبية — الجزء ${pNum} (الأسئلة ${partInfo.firstN}–${partInfo.lastN})`
          : 'مجموعة تدريبية شاملة';

        pages.push({
          trackId,
          sliceStart: chunkObj.sliceStart,
          sliceEnd: chunkObj.sliceEnd,
          pageLocale: locale,
          isRtl: locale === 'ar',
          isPracticePage: true,
          activeChapterId: utils.practiceSetId,
          permalink: locale === 'ar' ? `${arSub}index.html` : `${enSub}index.html`,
          canonicalPath: locale === 'ar' ? arSub : enSub,
          enAltPath: enSub,
          arAltPath: arSub,
          title: locale === 'ar'
            ? `${headAr} · ${cTitle} · ClipSAT`
            : `${headEn} · ${cTitle} · ClipSAT`,
          description: locale === 'ar'
            ? `مسائل تدريبية محلولة خطوة بخطوة (${partInfo.firstN}–${partInfo.lastN}) لمنهج ${cTitle} على منصة ClipSAT.`
            : `Worked exam-style practice problems (Q${partInfo.firstN}–Q${partInfo.lastN}) with step-by-step solutions for ${cTitle} on ClipSAT.`,
          courseTitle: cTitle,
          practiceHeadingEn: headEn,
          practiceHeadingAr: headAr,
          practicePartNum: pNum,
          practiceParts,
          sectionId: utils.practiceSetId,
          flashcardCount: totalFc,
          practiceSetId: utils.practiceSetId,
          practiceSetIcon: track.practiceSet.icon || '§',
          testGeneratorId: utils.testGeneratorId,
          downloadsId: utils.downloadsId,
          railNoTrackId: utils.railNoTrackId,
        });
      });
    }
  }

  return pages;
};
