module.exports = function (eleventyConfig) {
  // ── Static assets: copy public/css → _site/css, public/js → _site/js ──────
  eleventyConfig.addPassthroughCopy({ "public/css": "css" });
  eleventyConfig.addPassthroughCopy({ "public/js": "js" });

  // ── Root-level assets needed at the site root ─────────────────────────────
  eleventyConfig.addPassthroughCopy("sw.js");
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("changelog.html");
  eleventyConfig.addPassthroughCopy("clipsat-logo.jpg");

  // ── Question bank supplement files (may 404 gracefully if absent) ─────────
  // These are referenced by the engine but are optional supplements.
  // Eleventy won't error if the source doesn't exist in passthrough.

  // ── Watch for changes to JS/CSS in development ───────────────────────────
  eleventyConfig.addWatchTarget("public/");

  // ── Allow raw HTML in includes to render unescaped ────────────────────────
  eleventyConfig.addFilter("safe", (str) => str);

  // ── Nunjucks: don't throw on undefined variables, don't escape HTML ───────
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: false,
    autoescape: false,
  });

  return {
    // GitHub Pages serves this repo at /ClipSAT/ — all generated URLs get this prefix
    pathPrefix: "/ClipSAT/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "html", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  };
};
