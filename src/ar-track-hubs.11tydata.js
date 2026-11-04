'use strict';

module.exports = {
  eleventyComputed: {
    trackId: (data) => (data.hub ? data.hub.trackId : ''),
    pageLocale: () => 'ar',
    isRtl: () => true,
    isSyllabusHub: () => true,
    canonicalPath: (data) => (data.hub ? data.hub.canonicalPath : '/'),
    enAltPath: (data) => (data.hub ? data.hub.enAltPath : '/'),
    arAltPath: (data) => (data.hub ? data.hub.arAltPath : ''),
    title: (data) => (data.hub ? data.hub.title : 'ClipSAT'),
    description: (data) => (data.hub ? data.hub.description : ''),
    courseTitle: (data) => (data.hub ? data.hub.courseTitle : ''),
    flashcardCount: (data) => (data.hub && typeof data.hub.flashcardCount === 'number' ? data.hub.flashcardCount : 0),
  },
};
