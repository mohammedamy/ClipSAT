#!/usr/bin/env node
/**
 * scripts/generate-contact-sheets.js
 *
 * Plan 10 Phase 10.6: Visual verification / contact sheet generator.
 *
 * 1. Scans all question banks in bank-data/*.json for all figure types.
 * 2. Compiles an interactive HTML contact sheet (_site/dev-contact-sheets.html)
 *    with instant filtering by track and figure type, dark/light theme toggle,
 *    and full metadata inspection.
 * 3. When called with `--capture`, launches headless Chromium via Playwright,
 *    renders the contact sheet in both light and dark mode, and saves PNGs
 *    to artifacts/contact-sheet-light.png and artifacts/contact-sheet-dark.png.
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const BANK_DATA_DIR = path.join(__dirname, '..', 'bank-data');
const SITE_DIR = path.join(__dirname, '..', '_site');
const ARTIFACTS_DIR = path.join(__dirname, '..', 'artifacts');

function gatherFigures(maxPerTypePerTrack = 2) {
  const tracks = fs.readdirSync(BANK_DATA_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
    .sort();

  const samples = [];
  const typeCounts = {};
  const trackCounts = {};

  tracks.forEach(track => {
    const raw = JSON.parse(fs.readFileSync(path.join(BANK_DATA_DIR, `${track}.json`), 'utf8'));
    const pool = raw.pool || raw.questions || (Array.isArray(raw) ? raw : []);
    const seenTypeInTrack = {};

    pool.forEach((item, idx) => {
      if (!item.fig) return;
      const type = item.fig.type || (typeof item.fig === 'string' ? 'svg_string' : 'unknown');
      typeCounts[type] = (typeCounts[type] || 0) + 1;
      trackCounts[track] = (trackCounts[track] || 0) + 1;

      seenTypeInTrack[type] = (seenTypeInTrack[type] || 0) + 1;
      if (seenTypeInTrack[type] <= maxPerTypePerTrack) {
        samples.push({
          id: `${track}-${type}-${seenTypeInTrack[type]}`,
          track,
          type,
          domain: item.domain || 'general',
          difficulty: item.difficulty || 'M',
          text: String(item.text || '').slice(0, 160),
          fig: item.fig,
          poolIndex: idx,
        });
      }
    });
  });

  // Ensure showcase examples for all new/modern figure types
  const showcaseTypes = [
    {
      type: 'box_plot',
      track: 'showcase',
      domain: 'Statistics',
      difficulty: 'M',
      text: 'Five-number summary box and whisker plot with marked outliers.',
      fig: { type: 'box_plot', title: 'Test Score Distribution', min: 45, q1: 62, med: 74, q3: 88, max: 98, outliers: [30, 105] }
    },
    {
      type: 'histogram',
      track: 'showcase',
      domain: 'Statistics',
      difficulty: 'M',
      text: 'Histogram showing continuous frequency distribution across five bins.',
      fig: { type: 'histogram', title: 'Daily Commute Times', bins: ['0–10', '10–20', '20–30', '30–40', '40–50'], freqs: [4, 14, 22, 11, 5], xlabel: 'Minutes' }
    },
    {
      type: 'dot_plot',
      track: 'showcase',
      domain: 'Statistics',
      difficulty: 'E',
      text: 'Stacked dot plot showing observation counts per integer value.',
      fig: { type: 'dot_plot', title: 'Books Read This Month', data: [0, 1, 1, 2, 2, 2, 2, 3, 3, 4, 5], xlabel: 'Number of Books' }
    },
    {
      type: 'unit_circle',
      track: 'showcase',
      domain: 'Trigonometry',
      difficulty: 'M',
      text: 'Standard unit circle with reference right triangle at terminal angle 45° (π/4).',
      fig: { type: 'unit_circle', title: 'Unit Circle: θ = 45°', angle: 45, showTriangle: true }
    },
    {
      type: 'sinusoid',
      track: 'showcase',
      domain: 'Trigonometry',
      difficulty: 'H',
      text: 'Sinusoid graph with marked amplitude, midline, and wave period.',
      fig: { type: 'sinusoid', title: 'Harmonic Motion: y = 2sin(x) + 1', amp: 2, period: 6.28, midline: 1, fnType: 'sin' }
    },
    {
      type: 'normal_curve',
      track: 'showcase',
      domain: 'Statistics',
      difficulty: 'H',
      text: 'Standard normal distribution with shaded middle 68% probability area (μ ± σ).',
      fig: { type: 'normal_curve', title: 'Normal Distribution: P(-1 < Z < 1)', mean: 0, sd: 1, shade: [-1, 1] }
    },
    {
      type: 'slope_field',
      track: 'showcase',
      domain: 'Calculus',
      difficulty: 'H',
      text: 'Slope field for differential equation dy/dx = x - y with solution curve.',
      fig: { type: 'slope_field', title: 'Slope Field: dy/dx = x - y', fn: 'x - y', xrange: [-3, 3], yrange: [-3, 3], solution: { x0: 0, y0: 1 } }
    },
    {
      type: 'two_way_table',
      track: 'showcase',
      domain: 'Probability',
      difficulty: 'E',
      text: 'Two-way frequency table with highlighted condition cell.',
      fig: { type: 'two_way_table', title: 'High School Activity Survey', rows: ['Grade 10', 'Grade 11', 'Grade 12'], cols: ['Sports', 'Music', 'Drama'], data: [[35, 15, 10], [28, 20, 14], [30, 18, 12]], highlight: { row: 0, col: 0 } }
    }
  ];
  showcaseTypes.forEach((s, idx) => {
    typeCounts[s.type] = (typeCounts[s.type] || 0) + 1;
    trackCounts['showcase'] = (trackCounts['showcase'] || 0) + 1;
    samples.push({
      id: `showcase-${s.type}-${idx + 1}`,
      track: 'showcase',
      type: s.type,
      domain: s.domain,
      difficulty: s.difficulty,
      text: s.text,
      fig: s.fig,
      poolIndex: idx,
    });
  });
  if (!tracks.includes('showcase')) tracks.push('showcase');

  return { samples, typeCounts, trackCounts, tracks };
}

function buildHtml(data) {
  const { samples, typeCounts, trackCounts, tracks } = data;
  const types = Object.keys(typeCounts).sort();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ClipSAT Diagram & Figure Contact Sheet (Plan 10.6)</title>
  <link rel="stylesheet" href="/css/main.css">
  <style>
    body {
      padding: 1.5rem;
      background: var(--bg, #f8fafc);
      color: var(--ink, #0f172a);
      font-family: system-ui, -apple-system, sans-serif;
      transition: background .2s ease, color .2s ease;
    }
    .cs-header {
      max-width: 1280px;
      margin: 0 auto 1.5rem;
      padding: 1.2rem 1.6rem;
      background: var(--paper, #fff);
      border: 1.5px solid var(--border, #e2e8f0);
      border-radius: 12px;
      box-shadow: 0 2px 6px rgba(0,0,0,.03);
    }
    .cs-header h1 {
      margin: 0 0 .4rem;
      font-size: 1.4rem;
      font-weight: 750;
      color: var(--primary, #1e3a8a);
    }
    body.dark .cs-header h1 { color: #93c5fd; }
    .cs-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: .75rem;
      align-items: center;
      margin-top: 1rem;
    }
    .cs-btn {
      padding: .4rem .9rem;
      border: 1.5px solid var(--border, #cbd5e1);
      border-radius: 7px;
      background: var(--paper, #fff);
      color: var(--ink, #1e293b);
      cursor: pointer;
      font-size: .85rem;
      font-weight: 600;
      transition: all .15s ease;
    }
    .cs-btn:hover {
      background: var(--bg-subtle, #f1f5f9);
      border-color: var(--accent, #3b82f6);
    }
    .cs-btn.active {
      background: var(--accent, #2563eb);
      color: #fff;
      border-color: var(--accent, #2563eb);
    }
    .cs-filter-group {
      display: flex;
      flex-wrap: wrap;
      gap: .35rem;
      align-items: center;
      margin-top: .6rem;
    }
    .cs-filter-label {
      font-size: .8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .05em;
      color: var(--muted, #64748b);
      margin-right: .3rem;
    }
    .cs-grid {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.2rem;
    }
    .cs-card {
      background: var(--paper, #fff);
      border: 1.5px solid var(--border, #e2e8f0);
      border-radius: 12px;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      box-shadow: 0 1px 3px rgba(0,0,0,.03);
      transition: transform .15s ease, box-shadow .15s ease;
    }
    .cs-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,.06);
    }
    body.dark .cs-card {
      background: var(--panel, #1e293b);
      border-color: var(--border, #334155);
    }
    .cs-card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: .6rem;
    }
    .cs-badge {
      display: inline-block;
      padding: .2rem .55rem;
      border-radius: 5px;
      font-size: .72rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .cs-badge-track { background: #e0e7ff; color: #3730a3; }
    .cs-badge-type { background: #fef3c7; color: #92400e; }
    body.dark .cs-badge-track { background: rgba(99,102,241,.2); color: #c7d2fe; }
    body.dark .cs-badge-type { background: rgba(245,158,11,.2); color: #fde68a; }
    .cs-fig-wrap {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 180px;
      padding: .6rem;
      background: var(--bg-subtle, #f8fafc);
      border-radius: 8px;
      margin-bottom: .6rem;
      border: 1px dashed var(--border, #cbd5e1);
    }
    body.dark .cs-fig-wrap {
      background: rgba(15,23,42,.4);
      border-color: rgba(255,255,255,.08);
    }
    .cs-fig-wrap svg {
      max-width: 100%;
      height: auto;
      display: block;
    }
    .cs-card-text {
      font-size: .8rem;
      color: var(--muted, #64748b);
      line-height: 1.4;
      max-height: 2.8em;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    body.dark .cs-card-text { color: var(--text-2, #94a3b8); }
    .cs-hidden { display: none !important; }
  </style>
</head>
<body>
  <div class="cs-header">
    <h1>ClipSAT Visual Verification Contact Sheet (Plan 10.6)</h1>
    <p style="margin:0;font-size:.9rem;color:var(--muted,#64748b)">
      Visual audit tool covering <strong>${samples.length}</strong> representative figures across <strong>${Object.keys(trackCounts).length}</strong> tracks and <strong>${types.length}</strong> diagram families.
    </p>

    <div class="cs-toolbar">
      <button type="button" class="cs-btn" id="theme-toggle">🌓 Toggle Dark Mode</button>
      <input type="text" id="search-box" placeholder="Search diagram or track..." style="padding:.4rem .8rem;border:1.5px solid var(--border,#cbd5e1);border-radius:7px;font-size:.85rem;min-width:240px;background:var(--paper,#fff);color:inherit;">
      <span style="font-size:.85rem;color:var(--muted,#64748b);margin-left:auto" id="visible-count">Showing ${samples.length} / ${samples.length}</span>
    </div>

    <div class="cs-filter-group">
      <span class="cs-filter-label">Figure Type:</span>
      <button type="button" class="cs-btn active filter-type" data-type="all">All (${samples.length})</button>
      ${types.map(t => `<button type="button" class="cs-btn filter-type" data-type="${t}">${t} (${typeCounts[t]})</button>`).join('')}
    </div>

    <div class="cs-filter-group">
      <span class="cs-filter-label">Track:</span>
      <button type="button" class="cs-btn active filter-track" data-track="all">All</button>
      ${tracks.filter(t => trackCounts[t]).map(t => `<button type="button" class="cs-btn filter-track" data-track="${t}">${t} (${trackCounts[t]})</button>`).join('')}
    </div>
  </div>

  <div class="cs-grid" id="grid">
    ${samples.map(s => `
      <div class="cs-card" data-track="${s.track}" data-type="${s.type}" id="${s.id}">
        <div class="cs-card-meta">
          <span class="cs-badge cs-badge-track">${s.track}</span>
          <span class="cs-badge cs-badge-type">${s.type}</span>
        </div>
        <div class="cs-fig-wrap" data-fig='${JSON.stringify(s.fig).replace(/'/g, '&apos;')}'></div>
        <div class="cs-card-text">${s.text || s.domain}</div>
      </div>
    `).join('')}
  </div>

  <script src="/js/figures.js"></script>
  <script>
    (function(){
      // Render figures via ClipSAT's renderer
      document.querySelectorAll('.cs-fig-wrap').forEach(function(wrap){
        try {
          var fig = JSON.parse(wrap.getAttribute('data-fig'));
          if (window._renderFig) {
            wrap.innerHTML = window._renderFig(fig);
          }
        } catch(e) {
          wrap.innerHTML = '<span style="color:#ef4444;font-size:.8rem">Error rendering figure</span>';
        }
      });

      // Filter state
      var activeType = 'all';
      var activeTrack = 'all';
      var searchQuery = '';

      function applyFilter() {
        var cards = document.querySelectorAll('.cs-card');
        var visible = 0;
        cards.forEach(function(c){
          var mType = (activeType === 'all' || c.getAttribute('data-type') === activeType);
          var mTrack = (activeTrack === 'all' || c.getAttribute('data-track') === activeTrack);
          var mSearch = (!searchQuery || c.textContent.toLowerCase().indexOf(searchQuery) >= 0);
          if (mType && mTrack && mSearch) {
            c.classList.remove('cs-hidden');
            visible++;
          } else {
            c.classList.add('cs-hidden');
          }
        });
        document.getElementById('visible-count').textContent = 'Showing ' + visible + ' / ' + cards.length;
      }

      document.querySelectorAll('.filter-type').forEach(function(btn){
        btn.addEventListener('click', function(){
          document.querySelectorAll('.filter-type').forEach(function(b){b.classList.remove('active');});
          btn.classList.add('active');
          activeType = btn.getAttribute('data-type');
          applyFilter();
        });
      });

      document.querySelectorAll('.filter-track').forEach(function(btn){
        btn.addEventListener('click', function(){
          document.querySelectorAll('.filter-track').forEach(function(b){b.classList.remove('active');});
          btn.classList.add('active');
          activeTrack = btn.getAttribute('data-track');
          applyFilter();
        });
      });

      var sBox = document.getElementById('search-box');
      if (sBox) {
        sBox.addEventListener('input', function(){
          searchQuery = sBox.value.trim().toLowerCase();
          applyFilter();
        });
      }

      var themeToggle = document.getElementById('theme-toggle');
      if (themeToggle) {
        themeToggle.addEventListener('click', function(){
          document.body.classList.toggle('dark');
        });
      }
    })();
  </script>
</body>
</html>`;
}

async function captureScreenshots() {
  const { chromium } = require('@playwright/test');
  const { createServer } = require('../tests/e2e/static-server');

  if (!fs.existsSync(ARTIFACTS_DIR)) {
    fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
  }

  const server = createServer();
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`[contact-sheet] Serving _site on port ${port}...`);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) {
    browser = await chromium.launch({ channel: 'chrome', headless: true });
  }

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const url = `http://127.0.0.1:${port}/dev-contact-sheets.html`;
  console.log(`[contact-sheet] Loading ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });

  // Light mode screenshot
  const lightPath = path.join(ARTIFACTS_DIR, 'contact-sheet-light.png');
  await page.screenshot({ path: lightPath, fullPage: false });
  console.log(`[contact-sheet] Light mode snapshot saved to: ${lightPath}`);

  // Dark mode screenshot
  await page.evaluate(() => document.body.classList.add('dark'));
  await page.waitForTimeout(400);
  const darkPath = path.join(ARTIFACTS_DIR, 'contact-sheet-dark.png');
  await page.screenshot({ path: darkPath, fullPage: false });
  console.log(`[contact-sheet] Dark mode snapshot saved to: ${darkPath}`);

  await browser.close();
  server.close();
}

async function main() {
  console.log('Gathering figures from bank-data/*.json...');
  const data = gatherFigures(2);
  console.log(`Collected ${data.samples.length} sample figures across ${Object.keys(data.typeCounts).length} types.`);

  const html = buildHtml(data);
  const outPath = path.join(SITE_DIR, 'dev-contact-sheets.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`Contact sheet generated at: ${outPath}`);

  if (process.argv.includes('--capture')) {
    console.log('Capturing Playwright screenshots...');
    await captureScreenshots();
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('Error generating contact sheets:', err);
    process.exit(1);
  });
}

module.exports = { gatherFigures, buildHtml };
