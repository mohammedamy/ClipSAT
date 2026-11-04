'use strict';

/**
 * src/src.11tydata.js
 * Disables Eleventy's unused collections.all retention across all 860+ pages
 * so Eleventy stays well below the 512 MB V8 heap budget.
 */
module.exports = {
  eleventyExcludeFromCollections: true,
};
