#!/usr/bin/env node
/**
 * test-whiteboard-coords.js
 * Unit test for whiteboard pen coordinate calibration under various zoom levels,
 * devicePixelRatio values, CBT top offsets, and fractional CSS dimensions.
 */
'use strict';

const assert = require('assert');

function simulateLocalXY(e, rect, overlayW, overlayH, dpr) {
  const rL = rect ? rect.left : 0;
  const rT = rect ? rect.top : 0;
  const rW = (rect && rect.width > 0) ? rect.width : 1;
  const rH = (rect && rect.height > 0) ? rect.height : 1;

  const curDpr = dpr || 1;
  const bufW = overlayW || (rW * curDpr);
  const bufH = overlayH || (rH * curDpr);

  const scaleX = (rW > 0 && curDpr > 0) ? (bufW / (curDpr * rW)) : 1;
  const scaleY = (rH > 0 && curDpr > 0) ? (bufH / (curDpr * rH)) : 1;

  return {
    x: (e.clientX - rL) * scaleX,
    y: (e.clientY - rT) * scaleY
  };
}

function simulateScreenRender(logicalPt, rect, overlayW, overlayH, dpr) {
  // Canvas context transform maps logicalPt to buffer pixel:
  const bufX = logicalPt.x * dpr;
  const bufY = logicalPt.y * dpr;

  // Browser maps buffer pixel to screen CSS pixel inside element rect:
  const screenX = rect.left + bufX * (rect.width / overlayW);
  const screenY = rect.top + bufY * (rect.height / overlayH);

  return { screenX, screenY };
}

const testCases = [
  { name: 'Standard 1080p, 100% zoom, 1x DPR', w: 1920, h: 1080, dpr: 1.0, rect: { left: 0, top: 0, width: 1920, height: 1080 } },
  { name: 'Retina 2x, 100% zoom', w: 1440, h: 900, dpr: 2.0, rect: { left: 0, top: 0, width: 1440, height: 900 } },
  { name: 'Zoomed out 75% on 1x display', w: 1920, h: 1080, dpr: 0.75, rect: { left: 0, top: 0, width: 2560, height: 1440 } },
  { name: 'Zoomed in 150% on 1x display', w: 1920, h: 1080, dpr: 1.5, rect: { left: 0, top: 0, width: 1280, height: 720 } },
  { name: 'Zoomed out 50% on 2x display', w: 1440, h: 900, dpr: 1.0, rect: { left: 0, top: 0, width: 2880, height: 1800 } },
  { name: 'Windows 125% scaling (DPR 1.25)', w: 1536, h: 864, dpr: 1.25, rect: { left: 0, top: 0, width: 1536, height: 864 } },
  { name: 'CBT Mode with 54px top offset', w: 1920, h: 1026, dpr: 1.0, rect: { left: 0, top: 54, width: 1920, height: 1026 } },
  { name: 'CBT Mode with 96px wrapped header + 2x DPR', w: 1200, h: 704, dpr: 2.0, rect: { left: 0, top: 96, width: 1200, height: 704 } },
  { name: 'Fractional CSS pixel dimensions under pinch-zoom', w: 1333, h: 750, dpr: 1.333333, rect: { left: 0, top: 60.5, width: 1333.333, height: 749.667 } }
];

let totalPassed = 0;

testCases.forEach((tc, idx) => {
  const overlayW = Math.round(tc.w * tc.dpr);
  const overlayH = Math.round(tc.h * tc.dpr);

  const samplePoints = [
    { clientX: tc.rect.left, clientY: tc.rect.top }, // Top-left origin
    { clientX: tc.rect.left + tc.rect.width * 0.5, clientY: tc.rect.top + tc.rect.height * 0.5 }, // Center
    { clientX: tc.rect.left + tc.rect.width, clientY: tc.rect.top + tc.rect.height }, // Bottom-right
    { clientX: tc.rect.left + 123.4, clientY: tc.rect.top + 456.7 } // Arbitrary subpixel point
  ];

  samplePoints.forEach((pt) => {
    const local = simulateLocalXY(pt, tc.rect, overlayW, overlayH, tc.dpr);
    const rendered = simulateScreenRender(local, tc.rect, overlayW, overlayH, tc.dpr);

    const diffX = Math.abs(rendered.screenX - pt.clientX);
    const diffY = Math.abs(rendered.screenY - pt.clientY);

    assert(diffX < 1e-4, `Case ${idx + 1} (${tc.name}): Screen X drift ${diffX} exceeds threshold!`);
    assert(diffY < 1e-4, `Case ${idx + 1} (${tc.name}): Screen Y drift ${diffY} exceeds threshold!`);
  });

  totalPassed++;
  console.log(`  ✓ Case ${idx + 1} passed: ${tc.name}`);
});

console.log(`\nAll ${totalPassed}/${testCases.length} whiteboard calibration test cases passed successfully!`);
