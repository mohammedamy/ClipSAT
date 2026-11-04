'use strict';

module.exports = {
  eleventyComputed: {
    trackId: (data) => (data.pp ? data.pp.trackId : ''),
    pageLocale: (data) => (data.pp ? data.pp.pageLocale : 'en'),
    isRtl: (data) => Boolean(data.pp && data.pp.isRtl),
    isPracticePage: () => true,
    activeChapterId: (data) => (data.pp ? data.pp.activeChapterId : ''),
    canonicalPath: (data) => (data.pp ? data.pp.canonicalPath : '/'),
    enAltPath: (data) => (data.pp ? data.pp.enAltPath : '/'),
    arAltPath: (data) => (data.pp ? data.pp.arAltPath : ''),
    title: (data) => (data.pp ? data.pp.title : 'ClipSAT'),
    description: (data) => (data.pp ? data.pp.description : ''),
    courseTitle: (data) => (data.pp ? data.pp.courseTitle : ''),
    flashcardCount: (data) => (data.pp && typeof data.pp.flashcardCount === 'number' ? data.pp.flashcardCount : 0),
  },
};
