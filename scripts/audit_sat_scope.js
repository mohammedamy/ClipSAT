#!/usr/bin/env node
/* Audits bank-data/sat.json (or the printable SAT HTML exams) against the official
   Digital SAT scope. Prints counts only, so it is safe to run in CI or Colab. */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const CHECKS = {
  sets_venn: /finite sets|cardinality|\\cap\b|\\cup\b|\bVenn\b|\bsubset\b/i,
  lcm_gcd_division: /least common multiple|\blcm\b|\bgcd\b|greatest common (divisor|factor)|division algorithm|prime factorization|quotient and remainder/i,
  linear_programming: /feasible region|objective function|maximize[^.]*profit|minimize[^.]*cost|linear programming/i,
  meta_test_prep: /Desmos|grid-in|student-produced|answer choice|Choices:|process of elimination|time-management|\bpacing\b|calculator|backsolv|plugging|scored as correct/i,
  logs: /\\log|\\ln\b|logarithm/i,
  normal_dist_iqr_boxplot: /normal distribution|z-score|interquartile|\bIQR\b|box ?plot|quartile|bell-shaped/i,
  advanced_trig: /law of (sines|cosines)|sinusoid|amplitude|phase shift|\\sec\b|\\csc\b|\\cot\b|unit circle|reference angle|arcsin|arccos|arctan|\\sin\s*\(?2x|double[- ]angle/i,
  advanced_probability: /permutation|combination|factorial|\\binom|bayes|binomial|P\(A\s*\\mid|mutually exclusive|ways to choose|exactly \d+ heads/i,
  asymptote_piecewise_inverse: /asymptote|piecewise|removable discontinuity|f\^\{-1\}|inverse function|even function|odd function|one-to-one/i,
  procedural_mutation: /scaled constant|K\(y\)|records cell counts|holds for real|restricts the positive integer|Two positive quantities/i
};

function auditBank() {
  const pool = JSON.parse(fs.readFileSync(path.join(ROOT, 'bank-data', 'sat.json'), 'utf8')).pool;
  const res = {};
  for (const [k, re] of Object.entries(CHECKS)) {
    res[k] = pool.filter(q => re.test(`${q.text} ${(q.choices || []).join(' ')} ${q.sol || ''}`)).length;
  }
  const spr = pool.filter(q => q.type === 'spr');
  res.spr_with_choice_wording = spr.filter(q => /which of the following|which statement|which equation|which expression|choices|entry below/i.test(q.text)).length;
  res.spr_bad_answer = spr.filter(q => {
    const a = String(q.sprAnswer || '').trim();
    const ok = /^-?\d+(\.\d+)?$/.test(a) || /^-?\d+\/\d+$/.test(a);
    return !ok || a.length > (a.startsWith('-') ? 6 : 5);
  }).length;
  res.figure_not_referenced = pool.filter(q => q.figure && !/shown|figure|table|graph|scatterplot|bar|diagram/i.test(q.text)).length;
  res.mentions_figure_without_one = pool.filter(q => !q.figure && /\b(shown|the figure|diagram)\b/i.test(q.text)).length;
  const sk = {};
  pool.forEach(q => { const s = String(q.text).replace(/-?\d+(\.\d+)?/g, 'N').replace(/\s+/g, ' '); sk[s] = (sk[s] || 0) + 1; });
  res.max_items_sharing_one_skeleton = Math.max(...Object.values(sk));
  return { total: pool.length, spr: spr.length, ...res };
}

function auditExams() {
  const dir = path.join(ROOT, 'public', 'downloads', 'sat');
  const files = fs.readdirSync(dir).filter(f => /full-exam-digital-sat-math-\d+-exam\.html$/.test(f));
  const totals = Object.fromEntries(Object.keys(CHECKS).map(k => [k, 0]));
  let domainBadgeDesmos = 0, clipsatCom = 0, sprChoices = 0, questionCounts = [];
  for (const f of files) {
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    const body = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
    const qb = [...body.matchAll(/<div class="fep-qbody">([\s\S]*?)<\/div>/g)].map(m => m[1]).join(' ');
    for (const [k, re] of Object.entries(CHECKS)) if (re.test(qb)) totals[k]++;
    if (/fep-domain-tag">[^<]*Desmos/i.test(body)) domainBadgeDesmos++;
    if (/clipsat\.com/i.test(html)) clipsatCom++;
    sprChoices += [...body.matchAll(/data-qtype="spr"[\s\S]*?(?=data-qtype=|$)/g)].filter(m => /class="fep-choices"/.test(m[0].split('cbt-inline-input-wrap')[0])).length;
    questionCounts.push((body.match(/class="fep-item /g) || []).length);
  }
  return { exams: files.length, files_with_banned_topic: totals, desmos_domain_badges: domainBadgeDesmos, clipsat_com: clipsatCom, spr_items_with_choices: sprChoices, question_counts: [...new Set(questionCounts)] };
}

const mode = process.argv[2] || 'bank';
console.log(JSON.stringify(mode === 'exams' ? auditExams() : auditBank(), null, 1));
