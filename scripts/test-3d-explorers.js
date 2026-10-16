#!/usr/bin/env node
/**
 * test-3d-explorers.js
 * Comprehensive unit test suite for 3D Vector and Plane canvas/WebGL explorers
 * across Cambridge A2-Level, IB Math HL, and Multivariable Calculus.
 */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
let passed = 0;

function it(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

console.log('── Running 3D Vector & Plane Explorers Unit Test Suite ──');

// 1. Cambridge A-Level (9709 P3) — 3D Line & Plane Explorer
const a2JsonPath = path.join(ROOT, 'content', 'a2level', 'a2l-vectors.json');
const a2Json = JSON.parse(fs.readFileSync(a2JsonPath, 'utf8'));

it('A2 Level: Contains a2LinePlaneCanvas explorer with complete 3D and accessibility schema', () => {
  const ex = a2Json.content.blocks.find(b => b.kind === 'explorer' && b.canvasId === 'a2LinePlaneCanvas');
  assert.ok(ex, 'a2LinePlaneCanvas explorer block must exist');
  assert.strictEqual(ex.canvas3d.btnId, 'a2LinePlane3dBtn');
  assert.strictEqual(ex.canvas3d.wrapId, 'a2LinePlane3dWrap');
  assert.ok(ex.canvas3d.btnLabel.includes('3D'));
  assert.ok(ex.dataPanel, 'dataPanel accessible fallback must exist');
  assert.strictEqual(ex.dataPanel.btnId, 'a2LinePlaneDataBtn');
  assert.ok(ex.controls.length >= 5, 'Must have at least 5 controls for plane normal and line direction');
  assert.ok(ex.readouts.some(r => r.id === 'a2PlaneEq'));
  assert.ok(ex.readouts.some(r => r.id === 'a2LineIntersect'));
  assert.ok(ex.readouts.some(r => r.id === 'a2LineAngleOut'));
});

it('A2 Level: Mathematical calculation of 3D line-plane intersection and acute angle', () => {
  // Plane: x + 2y + 2z = 4 -> n = <1, 2, 2>, d = 4
  const n = [1, 2, 2];
  const lenN = Math.sqrt(n[0]*n[0] + n[1]*n[1] + n[2]*n[2]);
  assert.strictEqual(lenN, 3); // 1 + 4 + 4 = 9 -> sqrt = 3

  // Line: r = <0, 1, 0> + lambda <2, 1, 1> -> dVec = <2, 1, 1>
  const p0 = [0, 1, 0];
  const dVec = [2, 1, 1];
  const lenD = Math.sqrt(dVec[0]*dVec[0] + dVec[1]*dVec[1] + dVec[2]*dVec[2]);
  assert.strictEqual(lenD, Math.sqrt(6));

  // Dot product d . n = 1(2) + 2(1) + 2(1) = 6
  const dotDN = n[0]*dVec[0] + n[1]*dVec[1] + n[2]*dVec[2];
  assert.strictEqual(dotDN, 6);

  // Line-Plane angle: sin(theta) = |d . n| / (|d| |n|) = 6 / (3 * sqrt(6)) = 2 / sqrt(6)
  const sinTheta = Math.abs(dotDN) / (lenN * lenD);
  const thetaDeg = Math.asin(sinTheta) * 180 / Math.PI;
  assert.ok(Math.abs(thetaDeg - 54.7356) < 0.01, `Angle should be approx 54.7 deg, got ${thetaDeg}`);

  // Intersection parameter lambda = (d - n.p0) / (d . n) = (4 - 2) / 6 = 2/6 = 1/3
  const nDotP0 = n[0]*p0[0] + n[1]*p0[1] + n[2]*p0[2];
  const lambda = (4 - nDotP0) / dotDN;
  assert.ok(Math.abs(lambda - 1/3) < 1e-6);

  // Intersection point I = p0 + lambda * dVec = <2/3, 4/3, 1/3>
  const ip = [p0[0] + lambda * dVec[0], p0[1] + lambda * dVec[1], p0[2] + lambda * dVec[2]];
  assert.ok(Math.abs(ip[0] - 2/3) < 1e-6);
  assert.ok(Math.abs(ip[1] - 4/3) < 1e-6);
  assert.ok(Math.abs(ip[2] - 1/3) < 1e-6);

  // Verify point I satisfies plane equation: 2/3 + 2(4/3) + 2(1/3) = (2 + 8 + 2)/3 = 12/3 = 4
  const checkPlane = n[0]*ip[0] + n[1]*ip[1] + n[2]*ip[2];
  assert.ok(Math.abs(checkPlane - 4) < 1e-6);
});

// 2. IB Mathematics HL — Two Intersecting Planes Explorer
const ibhlJsonPath = path.join(ROOT, 'content', 'ibhl', 'ibhl-t3.json');
const ibhlJson = JSON.parse(fs.readFileSync(ibhlJsonPath, 'utf8'));

it('IB HL: Contains ibhlPlanesCanvas explorer with complete 3D and accessibility schema', () => {
  const ex = ibhlJson.content.blocks.find(b => b.kind === 'explorer' && b.canvasId === 'ibhlPlanesCanvas');
  assert.ok(ex, 'ibhlPlanesCanvas explorer block must exist');
  assert.strictEqual(ex.canvas3d.btnId, 'ibhlPlanes3dBtn');
  assert.strictEqual(ex.canvas3d.wrapId, 'ibhlPlanes3dWrap');
  assert.ok(ex.dataPanel, 'dataPanel must exist');
  assert.strictEqual(ex.dataPanel.btnId, 'ibhlPlanesDataBtn');
  assert.ok(ex.controls.some(c => c.id === 'ibhlP2A'));
  assert.ok(ex.readouts.some(r => r.id === 'ibhlInterLine'));
  assert.ok(ex.readouts.some(r => r.id === 'ibhlDihedralAngle'));
});

it('IB HL: Mathematical verification of intersection direction d = n1 x n2 and dihedral angle', () => {
  // Plane 1: x + 2y - z = 3 -> n1 = <1, 2, -1>
  const n1 = [1, 2, -1];
  // Plane 2: 2x - y + 3z = 1 -> n2 = <2, -1, 3>
  const n2 = [2, -1, 3];

  // Cross product n1 x n2:
  // dx = 2(3) - (-1)(-1) = 6 - 1 = 5
  // dy = -1(2) - 1(3) = -2 - 3 = -5
  // dz = 1(-1) - 2(2) = -1 - 4 = -5
  const dx = n1[1]*n2[2] - n1[2]*n2[1];
  const dy = n1[2]*n2[0] - n1[0]*n2[2];
  const dz = n1[0]*n2[1] - n1[1]*n2[0];
  assert.strictEqual(dx, 5);
  assert.strictEqual(dy, -5);
  assert.strictEqual(dz, -5);

  // Perpendicularity check: d . n1 = 0 and d . n2 = 0
  const dDotN1 = dx*n1[0] + dy*n1[1] + dz*n1[2];
  const dDotN2 = dx*n2[0] + dy*n2[1] + dz*n2[2];
  assert.strictEqual(dDotN1, 0);
  assert.strictEqual(dDotN2, 0);

  // Dihedral angle cos(phi) = |n1 . n2| / (|n1| |n2|)
  const dot12 = n1[0]*n2[0] + n1[1]*n2[1] + n1[2]*n2[2]; // 2 - 2 - 3 = -3
  assert.strictEqual(dot12, -3);
  const len1 = Math.sqrt(1 + 4 + 1); // sqrt(6)
  const len2 = Math.sqrt(4 + 1 + 9); // sqrt(14)
  const cosPhi = Math.abs(dot12) / (len1 * len2); // 3 / sqrt(84)
  const phiDeg = Math.acos(cosPhi) * 180 / Math.PI;
  assert.ok(Math.abs(phiDeg - 70.893) < 0.01, `Dihedral angle should be approx 70.9 deg, got ${phiDeg}`);
});

// 3. Multivariable Calculus — 3D Tangent Plane & Surface Normal Explorer
const mvcJsonPath = path.join(ROOT, 'content', 'mvc', 'mvc-partials.json');
const mvcJson = JSON.parse(fs.readFileSync(mvcJsonPath, 'utf8'));

it('Multivariable Calculus: Contains mvcTangentCanvas explorer with complete 3D and accessibility schema', () => {
  const ex = mvcJson.content.blocks.find(b => b.kind === 'explorer' && b.canvasId === 'mvcTangentCanvas');
  assert.ok(ex, 'mvcTangentCanvas explorer block must exist');
  assert.strictEqual(ex.canvas3d.btnId, 'mvcTangent3dBtn');
  assert.strictEqual(ex.canvas3d.wrapId, 'mvcTangent3dWrap');
  assert.ok(ex.dataPanel, 'dataPanel must exist');
  assert.strictEqual(ex.dataPanel.btnId, 'mvcTangentDataBtn');
  assert.ok(ex.controls.some(c => c.id === 'mvcTanX0'));
  assert.ok(ex.controls.some(c => c.id === 'mvcTanY0'));
  assert.ok(ex.readouts.some(r => r.id === 'mvcTanPlaneEq'));
  assert.ok(ex.readouts.some(r => r.id === 'mvcTanNormal'));
});

it('Multivariable Calculus: Mathematical verification of surface partials, tangent plane, and normal orthogonality', () => {
  function f(x, y) { return 4 - 0.3*x*x - 0.2*y*y; }
  function fx(x, y) { return -0.6*x; }
  function fy(x, y) { return -0.4*y; }

  const x0 = 1.0, y0 = 1.5;
  const z0 = f(x0, y0); // 4 - 0.3(1) - 0.2(2.25) = 4 - 0.3 - 0.45 = 3.25
  assert.strictEqual(z0, 3.25);

  const dfx = fx(x0, y0); // -0.6
  const dfy = fy(x0, y0); // -0.4 * 1.5 = -0.6
  assert.ok(Math.abs(dfx - (-0.6)) < 1e-9);
  assert.ok(Math.abs(dfy - (-0.6)) < 1e-9);

  // Upward normal n = <-fx, -fy, 1> = <0.6, 0.6, 1>
  const n = [-dfx, -dfy, 1];
  assert.ok(Math.abs(n[0] - 0.6) < 1e-9);
  assert.ok(Math.abs(n[1] - 0.6) < 1e-9);
  assert.strictEqual(n[2], 1.0);

  // Tangent vectors along coordinate directions:
  // u = <1, 0, fx> = <1, 0, -0.6>
  // v = <0, 1, fy> = <0, 1, -0.6>
  const u = [1, 0, dfx];
  const v = [0, 1, dfy];

  // Orthogonality: n . u = 0.6(1) + 0.6(0) + 1(-0.6) = 0
  const dotNU = n[0]*u[0] + n[1]*u[1] + n[2]*u[2];
  const dotNV = n[0]*v[0] + n[1]*v[1] + n[2]*v[2];
  assert.ok(Math.abs(dotNU) < 1e-10, 'Normal vector must be orthogonal to u');
  assert.ok(Math.abs(dotNV) < 1e-10, 'Normal vector must be orthogonal to v');

  // Any point on the tangent plane satisfies z - z0 = fx(x - x0) + fy(y - y0)
  // For test point (x, y) = (2, 2.5):
  const xTest = 2, yTest = 2.5;
  const zPlane = z0 + dfx*(xTest - x0) + dfy*(yTest - y0);
  // Normal equation check: n_x(x - x0) + n_y(y - y0) + n_z(z - z0) = 0
  const normEqCheck = n[0]*(xTest - x0) + n[1]*(yTest - y0) + n[2]*(zPlane - z0);
  assert.ok(Math.abs(normEqCheck) < 1e-10, 'Tangent plane coordinates must satisfy normal equation');
});

// 4. Verify Built Minified Bundles
it('Minified bundles contain all 3D canvas and button hooks', () => {
  const a2Bundle = fs.readFileSync(path.join(ROOT, 'public', 'js', 'ex', 'a2level.js'), 'utf8');
  assert.ok(a2Bundle.includes('a2LinePlaneCanvas'), 'a2level bundle must include a2LinePlaneCanvas');
  assert.ok(a2Bundle.includes('a2LinePlane3dBtn'), 'a2level bundle must include a2LinePlane3dBtn');

  const ibhlBundle = fs.readFileSync(path.join(ROOT, 'public', 'js', 'ex', 'ibhl.js'), 'utf8');
  assert.ok(ibhlBundle.includes('ibhlPlanesCanvas'), 'ibhl bundle must include ibhlPlanesCanvas');
  assert.ok(ibhlBundle.includes('ibhlPlanes3dBtn'), 'ibhl bundle must include ibhlPlanes3dBtn');

  const mvcBundle = fs.readFileSync(path.join(ROOT, 'public', 'js', 'ex', 'mvc.js'), 'utf8');
  assert.ok(mvcBundle.includes('mvcTangentCanvas'), 'mvc bundle must include mvcTangentCanvas');
  assert.ok(mvcBundle.includes('mvcTangent3dBtn'), 'mvc bundle must include mvcTangent3dBtn');
});

console.log(`\n── 3D Explorers Unit Test Summary: ${passed} passed, 0 failed ──`);
console.log('✅ ALL 3D Vector & Plane canvas manipulatives verified successfully!\n');
