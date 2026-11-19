const { renderChapterMath } = require("./scripts/katex-ssr.js");
const { stampSwVersion } = require("./scripts/stamp-sw-version.js");

module.exports = function (eleventyConfig) {
  // Exclude internal developer preview page from production builds unless explicitly opted in
  if (process.env.CLIPSAT_INCLUDE_DEV_PREVIEW !== "1") {
    eleventyConfig.ignores.add("src/dev-content-preview/**");
  }

  // ── Static assets: copy public/css → _site/css, public/js → _site/js ──────
  eleventyConfig.addPassthroughCopy({ "public/css": "css" });
  eleventyConfig.addPassthroughCopy({ "public/js": "js" });
  eleventyConfig.addPassthroughCopy({ "public/vendor": "vendor" });
  eleventyConfig.addPassthroughCopy({ "public/data": "data" });

  // ── Build-time KaTeX pre-rendering (all 31 tracks + 612 chapter pages) ────
  // Executed sequentially per HTML file in eleventy.after (before stampSwVersion)
  // rather than concurrently across 860+ Promise.all buffers in addTransform,
  // keeping peak V8 heap strictly under 512 MB.
  function compactHtmlSafely(html) {
    const preserved = [];
    const masked = html.replace(
      /<(script|style|pre|textarea)\b[^>]*>[\s\S]*?<\/\1>/gi,
      (m) => {
        const idx = preserved.length;
        preserved.push(m);
        return `\u0000CSPRESERVE_${idx}\u0000`;
      }
    );
    const compacted = masked
      .replace(/<!--(?!\[if)[\s\S]*?-->/g, "")
      .replace(/\n[ \t]+/g, "\n")
      .replace(/\n{2,}/g, "\n")
      .replace(/>\n<(?:\/?(?:div|section|aside|nav|header|footer|main|ul|ol|li|table|thead|tbody|tr|th|td|figure|figcaption|details|summary|p|h[1-6]|span|button|a|svg|path|rect|circle|line|polyline|polygon|g|label|input|select|option|blockquote|header)\b)/gi, (m) => m.replace("\n", ""));
    return compacted.replace(/\u0000CSPRESERVE_(\d+)\u0000/g, (_, i) => preserved[Number(i)]);
  }

  function renderSiteMathSequential(rootDir) {
    const fsMod = require("fs");
    const pathMod = require("path");
    const stack = [rootDir];
    while (stack.length) {
      const cur = stack.pop();
      if (!fsMod.existsSync(cur)) continue;
      for (const ent of fsMod.readdirSync(cur, { withFileTypes: true })) {
        const full = pathMod.join(cur, ent.name);
        if (ent.isDirectory()) {
          if (ent.name === "bank-shards" || ent.name === "worksheet-data" || ent.name === "vendor" || ent.name === "js" || ent.name === "css") continue;
          stack.push(full);
        } else if (ent.isFile() && ent.name.endsWith(".html")) {
          const rel = pathMod.relative(rootDir, full);
          const raw = fsMod.readFileSync(full, "utf8");
          const isDeepRoute = rel.split(pathMod.sep).length >= 3;
          let next = raw;
          if (next.indexOf("\\(") !== -1 || next.indexOf("\\[") !== -1) {
            next = renderChapterMath(next, rel, {
              maxExpressions: isDeepRoute ? 2 : 10,
              maxTexLength: 65,
              skipHiddenContainers: true,
            });
          }
          next = compactHtmlSafely(next);
          if (next !== raw) {
            fsMod.writeFileSync(full, next, "utf8");
          }
        }
      }
    }
  }

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
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addPassthroughCopy("sw.js");
  eleventyConfig.addPassthroughCopy("manifest.json");
  eleventyConfig.addPassthroughCopy("clipsat-logo.jpg");
  eleventyConfig.addPassthroughCopy("teacher-avatar.jpg");
  eleventyConfig.addPassthroughCopy("teacher-avatar.webp");
  eleventyConfig.addPassthroughCopy("clipsat-mark.png");
  eleventyConfig.addPassthroughCopy("clipsat-mark-header.png");
  eleventyConfig.addPassthroughCopy("favicon.png");
  eleventyConfig.addPassthroughCopy("icon-192.png");
  eleventyConfig.addPassthroughCopy("icon-512.png");
  eleventyConfig.addPassthroughCopy("og-image.png");
  eleventyConfig.addPassthroughCopy("robots.txt");
  // WP-23: Offload heavy static data directories (downloads, bank-shards, worksheet-data)
  // to Cloudflare R2 CDN (cdn.clipsat.org) when CLIPSAT_CDN_BASE is set.
  // When no external CDN is configured, bundle bank-shards + worksheet-data + downloads/*/manifest.json
  // directly into _site/ so same-origin fetches succeed on GitHub Pages & local builds.
  const includeLocalShards =
    process.env.CLIPSAT_INCLUDE_LOCAL_SHARDS === "1" ||
    (!process.env.CLIPSAT_CDN_BASE && process.env.CLIPSAT_SKIP_LOCAL_SHARDS !== "1");
  if (includeLocalShards) {
    eleventyConfig.addPassthroughCopy({ "public/bank-shards": "bank-shards" });
    eleventyConfig.addPassthroughCopy({ "public/worksheet-data": "worksheet-data" });
  }
  if (process.env.CLIPSAT_INCLUDE_LOCAL_DOWNLOADS === "1") {
    eleventyConfig.addPassthroughCopy({ "public/downloads": "downloads" });
  }

  // ── Question bank supplement files (may 404 gracefully if absent) ─────────
  // These are referenced by the engine but are optional supplements.
  // Eleventy won't error if the source doesn't exist in passthrough.

  // ── Stamp _site/sw.js's SW_VERSION with a hash of the files it caches ─────
  // Runs after every build, once passthrough copies are written, so a deploy that changes any
  // cached JS/CSS also changes sw.js and reaches returning visitors (Plan 5 Phase 5.017,
  // ADR 0046; scripts/stamp-sw-version.js).
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    renderSiteMathSequential(dir.output);
    if (!process.env.CLIPSAT_CDN_BASE && process.env.CLIPSAT_INCLUDE_LOCAL_DOWNLOADS !== "1") {
      const fsMod = require("fs");
      const pathMod = require("path");
      const dlSrc = pathMod.join(__dirname, "public", "downloads");
      if (fsMod.existsSync(dlSrc)) {
        for (const ent of fsMod.readdirSync(dlSrc, { withFileTypes: true })) {
          if (!ent.isDirectory()) continue;
          const mf = pathMod.join(dlSrc, ent.name, "manifest.json");
          if (fsMod.existsSync(mf)) {
            const destDir = pathMod.join(dir.output, "downloads", ent.name);
            fsMod.mkdirSync(destDir, { recursive: true });
            fsMod.copyFileSync(mf, pathMod.join(destDir, "manifest.json"));
          }
        }
      }
    }
    stampSwVersion(dir.output);
  });

  // ── Watch for changes to JS/CSS in development ───────────────────────────
  eleventyConfig.addWatchTarget("public/");

  // ── Allow raw HTML in includes to render unescaped ────────────────────────
  eleventyConfig.addFilter("safe", (str) => str);
  eleventyConfig.addNunjucksFilter("jsonAttr", function (spec) {
    if (!spec || typeof spec !== "object") return "";
    return JSON.stringify(spec)
      .replace(/&/g, "&amp;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  });

  // ── Build-time Figure pre-rendering (Plan 10.3c) ───────────────────────────
  // Evaluates public/js/figures.js in a mock window environment and adds a
  // renderFig filter to render theme-aware SVG diagrams at build time.
  const fs = require("fs");
  const path = require("path");
  const figuresPath = path.join(__dirname, "public", "js", "figures.js");
  let _renderFigFn = null;
  if (fs.existsSync(figuresPath)) {
    try {
      const vm = require("vm");
      const code = fs.readFileSync(figuresPath, "utf8");
      const figWindow = {};
      vm.runInNewContext(code, {
        window: figWindow,
        Math, Object, Array, Number, String, Boolean, RegExp, Date, JSON,
        parseFloat, parseInt, isNaN, isFinite, console
      });
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
