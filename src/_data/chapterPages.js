'use strict';

/**
 * src/_data/chapterPages.js (WP-21, WP-22, WP-30)
 *
 * Generates 612 lightweight single-chapter SSG routes across all 31 curriculum tracks:
 *   - 306 English routes:  /{track}/{chapter.id}/index.html
 *   - 306 Arabic routes:   /ar/{track}/{chapter.id}/index.html
 *
 * Also precomputes per-chapter flashcard counts and explorer flags at build time
 * so the browser executes zero whole-DOM crawlers or cloneNode() passes on boot.
 */

const fs = require('fs');
const path = require('path');

const META_FC_TITLES = new Set([
  'format', 'calculator', 'delivery', 'questions', 'duration', 'scoring', 'sections', 'time',
  'التنسيق', 'الآلة الحاسبة', 'طريقة التقديم', 'عدد الأسئلة', 'المدة', 'التصحيح', 'الأقسام', 'الوقت'
]);

function stripHtmlAndMath(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .replace(/\\\[[\s\S]*?\\\]/g, ' ')
    .replace(/\\\([\s\S]*?\\\)/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&middot;/g, '·')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function countChapterFlashcards(ch) {
  let count = 0;
  const blocks = (ch && ch.content && Array.isArray(ch.content.blocks)) ? ch.content.blocks : [];
  for (const b of blocks) {
    if (b.kind === 'callout' && ['def', 'thm', 'formula', 'note', 'example', 'example-card', 'warn'].includes(b.style)) {
      count++;
    } else if (b.kind === 'workedExampleCard') {
      count++;
    } else if (b.kind === 'cards' && Array.isArray(b.cards)) {
      for (const c of b.cards) {
        const tEn = stripHtmlAndMath(c && c.title && (c.title.en || c.title)).toLowerCase();
        if (tEn && !META_FC_TITLES.has(tEn)) count++;
      }
    }
  }
  return count;
}

function extractChapterSummary(ch, locale) {
  const blocks = (ch && ch.content && Array.isArray(ch.content.blocks)) ? ch.content.blocks : [];
  for (const b of blocks) {
    let candidate = '';
    if (b.kind === 'text' && b.body) {
      candidate = (locale === 'ar' && b.body.ar) ? b.body.ar : (b.body.en || '');
    } else if (b.kind === 'callout' && b.body) {
      candidate = (locale === 'ar' && b.body.ar) ? b.body.ar : (b.body.en || '');
    }
    const clean = stripHtmlAndMath(candidate);
    if (clean.length >= 35) {
      return clean.length > 155 ? clean.slice(0, 152).replace(/\s+\S*$/, '') + '…' : clean;
    }
  }
  const titleTxt = (locale === 'ar' && ch.title && ch.title.ar) ? ch.title.ar : ((ch.title && ch.title.en) || ch.id);
  return locale === 'ar'
    ? `شرح تفاعلي وأمثلة محلولة وتمارين تدريبية لدرس ${stripHtmlAndMath(titleTxt)} على منصة ClipSAT.`
    : `Interactive math lesson, worked examples, visual explorers, and practice quiz for ${stripHtmlAndMath(titleTxt)} on ClipSAT.`;
}

function parseTrackUtilityIds(trackId) {
  const njkPath = path.join(__dirname, '..', trackId, 'index.njk');
  const out = {
    practiceSetId: `${trackId}-practice`,
    testGeneratorId: `${trackId}-testgen`,
    downloadsId: `${trackId}-downloads`,
    railNoTrackId: trackId === 'calculus',
  };
  if (fs.existsSync(njkPath)) {
    const src = fs.readFileSync(njkPath, 'utf8');
    const mp = src.match(/practiceSetId\s*=\s*'([^']+)'/);
    const mt = src.match(/testGeneratorId\s*=\s*'([^']+)'/);
    const md = src.match(/downloadsId\s*=\s*'([^']+)'/);
    if (mp) out.practiceSetId = mp[1];
    if (mt) out.testGeneratorId = mt[1];
    if (md) out.downloadsId = md[1];
    if (/railNoTrackId\s*=\s*true/.test(src)) out.railNoTrackId = true;
  }
  return out;
}

module.exports = function () {
  const migrated = require('./migratedContent')();
  const pages = [];

  for (const trackId of Object.keys(migrated).sort()) {
    const track = migrated[trackId];
    const courseMeta = (track.meta && track.meta.meta) || {};
    const courseTitleEn = stripHtmlAndMath((courseMeta.title && courseMeta.title.en) || trackId.toUpperCase());
    const courseTitleAr = stripHtmlAndMath((courseMeta.title && courseMeta.title.ar) || courseTitleEn);
    const utils = parseTrackUtilityIds(trackId);

    for (const locale of ['en', 'ar']) {
      track.chapters.forEach((ch, idx) => {
        const prev = idx > 0 ? track.chapters[idx - 1] : null;
        const next = idx < track.chapters.length - 1 ? track.chapters[idx + 1] : null;
        const chTitleEn = stripHtmlAndMath((ch.title && ch.title.en) || ch.id);
        const chTitleAr = stripHtmlAndMath((ch.title && ch.title.ar) || chTitleEn);
        const chHeading = locale === 'ar' ? chTitleAr : chTitleEn;
        const cTitle = locale === 'ar' ? courseTitleAr : courseTitleEn;
        const blocks = (ch.content && Array.isArray(ch.content.blocks)) ? ch.content.blocks : [];
        const chapterHasExplorer = blocks.some(
          (b) => b.kind === 'explorer' || (b.kind === 'figure' && b.figure && b.figure.type === 'slope_field')
        );
        const flashcardCount = countChapterFlashcards(ch);

        pages.push({
          trackId,
          chapterIndex: idx,
          pageLocale: locale,
          isRtl: locale === 'ar',
          isChapterPage: true,
          activeChapterId: ch.id,
          permalink: locale === 'ar'
            ? `/ar/${trackId}/${ch.id}/index.html`
            : `/${trackId}/${ch.id}/index.html`,
          canonicalPath: locale === 'ar'
            ? `/ar/${trackId}/${ch.id}/`
            : `/${trackId}/${ch.id}/`,
          enAltPath: `/${trackId}/${ch.id}/`,
          arAltPath: `/ar/${trackId}/${ch.id}/`,
          title: `${chHeading} · ${cTitle} · ClipSAT`,
          description: extractChapterSummary(ch, locale),
          courseTitle: cTitle,
          chapterHeading: chHeading,
          prevChapter: prev ? { id: prev.id, num: prev.chapterNumber, title: prev.title } : null,
          nextChapter: next ? { id: next.id, num: next.chapterNumber, title: next.title } : null,
          chapterHasExplorer,
          flashcardCount,
          practiceSetId: utils.practiceSetId,
          practiceSetIcon: (track.practiceSet && track.practiceSet.icon) || '§',
          testGeneratorId: utils.testGeneratorId,
          downloadsId: utils.downloadsId,
          railNoTrackId: utils.railNoTrackId,
        });
      });
    }
  }

  return pages;
};

module.exports.countChapterFlashcards = countChapterFlashcards;
module.exports.extractChapterSummary = extractChapterSummary;
module.exports.stripHtmlAndMath = stripHtmlAndMath;
module.exports.parseTrackUtilityIds = parseTrackUtilityIds;
