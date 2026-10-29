const { renderChapterMath } = require("./scripts/katex-ssr.js");
const { stampSwVersion } = require("./scripts/stamp-sw-version.js");

module.exports = function (eleventyConfig) {
  // ── Static assets: copy public/css → _site/css, public/js → _site/js ──────
  eleventyConfig.addPassthroughCopy({ "public/css": "css" });
  eleventyConfig.addPassthroughCopy({ "public/js": "js" });
  eleventyConfig.addPassthroughCopy({ "public/vendor": "vendor" });
  eleventyConfig.addPassthroughCopy({ "public/data": "data" });

  // ── Build-time KaTeX pre-rendering (all 21 tracks) ────────────────────────
  // See scripts/katex-ssr.js for the full scoping rationale. Runs as a
  // transform (on the FINAL rendered HTML, after _bilingual.njk and every
  // block partial have already expanded) rather than hooking any one
  // template, since math text only exists in its final form at that point.
  // Was gated to Calculus alone for an initial trial (PR #175); verified
  // clean in production (Puppeteer CLS probe + live Lighthouse), then
  // widened here to every page. No per-track allowlist needed — pages with
  // no .chapter element (home, legal pages) already no-op via
  // renderChapterMath's own early return.
  eleventyConfig.addTransform("katex-ssr", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    return renderChapterMath(content, outputPath);
  });

  // ── Root-level assets needed at the site root ─────────────────────────────
  // CNAME tells GitHub Pages the custom domain (clipsat.org). Setting the
  // domain via repo Settings alone isn't durable for an Actions-based Pages
  // deploy (this repo's build_type) — each deploy uploads a fresh artifact,
  // and without this file in it GitHub can silently drop the custom domain
  // back to null on a future deploy. Keeping it in the repo/build output is
  // the same belt-and-suspenders approach classic branch-based Pages deploys
  // get for free via their auto-managed CNAME file.
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("sw.js");
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("changelog.html");
  eleventyConfig.addPassthroughCopy("rigor-standard.html");
  eleventyConfig.addPassthroughCopy("free-tier-promise.html");
  eleventyConfig.addPassthroughCopy("clipsat-logo.jpg");
  eleventyConfig.addPassthroughCopy("teacher-avatar.jpg");
  eleventyConfig.addPassthroughCopy("clipsat-mark.png");
  // Lighthouse "Improve image delivery": header/footer both render this at
  // 22-44px CSS height (main.css .site-logo-img), yet were loading the full
  // 212x240 original (57KB) — this is a 128x144 downscale (26.5KB), still
  // 3-4x oversized for on-page display (retina headroom) and comfortably
  // above what engine.js's docx export embeds it at (_logoSrc() reads the
  // header <img>'s live src — see its own comment). clipsat-mark.png itself
  // is untouched/still passed through above for any future full-res need.
  eleventyConfig.addPassthroughCopy("clipsat-mark-header.png");
  eleventyConfig.addPassthroughCopy("favicon.png");
  eleventyConfig.addPassthroughCopy("icon-192.png");
  eleventyConfig.addPassthroughCopy("icon-512.png");
  eleventyConfig.addPassthroughCopy("og-image.png");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy({ "bank-data": "bank-data" });
  eleventyConfig.addPassthroughCopy({ "public/bank-shards": "bank-shards" });
  eleventyConfig.addPassthroughCopy({ "public/downloads": "downloads" });
  // Worksheet topic JSON for the Google Forms integration's worksheet
  // fast-follow — generated from tools/worksheet_gen/topics/ by build.js's
  // "Step 6" (canonical {num}[-ar].json names; see that step's comment).
  eleventyConfig.addPassthroughCopy({ "public/worksheet-data": "worksheet-data" });

  // ── Question bank supplement files (may 404 gracefully if absent) ─────────
  // These are referenced by the engine but are optional supplements.
  // Eleventy won't error if the source doesn't exist in passthrough.

  // ── Stamp _site/sw.js's SW_VERSION with a hash of the files it caches ─────
  // Runs after every build, once passthrough copies are written, so a deploy that changes any
  // cached JS/CSS also changes sw.js and reaches returning visitors (Plan 5 Phase 5.017,
  // ADR 0046; scripts/stamp-sw-version.js).
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    stampSwVersion(dir.output);
  });

  // ── Watch for changes to JS/CSS in development ───────────────────────────
  eleventyConfig.addWatchTarget("public/");

  // ── Allow raw HTML in includes to render unescaped ────────────────────────
  eleventyConfig.addFilter("safe", (str) => str);

  // ── Build-time Figure pre-rendering (Plan 10.3c) ───────────────────────────
  // Evaluates public/js/figures.js in a mock window environment and adds a
  // renderFig filter to render theme-aware SVG diagrams at build time.
  const fs = require("fs");
  const path = require("path");
  const figuresPath = path.join(__dirname, "public", "js", "figures.js");
  let _renderFigFn = null;
  if (fs.existsSync(figuresPath)) {
    try {
      const code = fs.readFileSync(figuresPath, "utf8");
      const figWindow = {};
      new Function("window", code)(figWindow);
      _renderFigFn = figWindow._renderFig || null;
    } catch (e) {
      console.warn("Could not load figures.js for SSR:", e.message);
    }
  }
  eleventyConfig.addNunjucksFilter("renderFig", function (spec) {
    if (!spec || typeof spec !== "object") return "";
    if (_renderFigFn) {
      try {
        return _renderFigFn(spec);
      } catch (err) {
        console.warn("renderFig error:", err.message);
      }
    }
    return "";
  });

  // ── Nunjucks: don't throw on undefined variables, don't escape HTML ───────
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: false,
    autoescape: false,
  });

  return {
    // Served at the custom domain root (clipsat.org) — no subpath prefix.
    // Was "/ClipSAT/" back when this was hosted at mohammedamy.github.io/ClipSAT/.
    pathPrefix: "/",
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
