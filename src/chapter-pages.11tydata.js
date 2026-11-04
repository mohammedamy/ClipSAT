'use strict';

module.exports = {
  eleventyComputed: {
    trackId: (data) => (data.cp ? data.cp.trackId : ''),
    pageLocale: (data) => (data.cp ? data.cp.pageLocale : 'en'),
    isRtl: (data) => Boolean(data.cp && data.cp.isRtl),
    isChapterPage: () => true,
    activeChapterId: (data) => (data.cp ? data.cp.activeChapterId : ''),
    canonicalPath: (data) => (data.cp ? data.cp.canonicalPath : '/'),
    enAltPath: (data) => (data.cp ? data.cp.enAltPath : '/'),
    arAltPath: (data) => (data.cp ? data.cp.arAltPath : ''),
    title: (data) => (data.cp ? data.cp.title : 'ClipSAT'),
    description: (data) => (data.cp ? data.cp.description : ''),
    courseTitle: (data) => (data.cp ? data.cp.courseTitle : ''),
    chapterHeading: (data) => (data.cp ? data.cp.chapterHeading : ''),
    chapterHasExplorer: (data) => Boolean(data.cp && data.cp.chapterHasExplorer),
    flashcardCount: (data) => (data.cp && typeof data.cp.flashcardCount === 'number' ? data.cp.flashcardCount : 0),
  },
};
