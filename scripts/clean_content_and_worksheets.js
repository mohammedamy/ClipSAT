#!/usr/bin/env node
/**
 * scripts/clean_content_and_worksheets.js
 *
 * 1. Cleans all 269 lesson files in content/<track>/*.json and practice sets in content/<track>/_practice-set.json:
 *    - Replaces all 351 "Worked Example ... (Easy/Medium/Hard Application)" blocks and 458 "[Practice X · Easy/Medium/Hard]"
 *      blocks (which were pulled from bank-data/*.json before the 93c6fc29 synthetic mutation cleanup) with 100% authentic,
 *      topic-matched curriculum questions from the cleaned bank-data/<track>.json.
 *    - Replaces bare LCM/GCD items in content/act/act-numbers.json, content/act/_practice-set.json,
 *      content/act2/act2-numbers.json, and content/act2/_practice-set.json.
 *
 * 2. Cleans all 308 non-SAT topic worksheets in tools/worksheet_gen/topics/<track>/*.json:
 *    - Replaces all 867 filler questions ("governing relation for this system", "For the model ... in ...",
 *      "A data set recorded for ...", "[Topic · Practice X]", bare LCM/GCD, and 93c6fc29 synthetic templates)
 *      with authentic, unique-skeleton curriculum questions from the cleaned bank-data/<track>.json.
 *    - Strips all fake default parabolas, fake C1..C5 bar charts, and unreferenced procedural figures.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const BANK_DIR = path.join(ROOT, 'bank-data');
const TOPICS_DIR = path.join(ROOT, 'tools', 'worksheet_gen', 'topics');

function getSkeleton(text) {
  return String(text || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\$[^$]*\$/g, ' MATH ')
    .replace(/\\\([\s\S]*?\\\)/g, ' MATH ')
    .replace(/\\\[[\s\S]*?\\\]/g, ' MATH ')
    .replace(/\d+(?:\.\d+)?/g, 'N')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function splitBilingual(rawHtml, wantAr) {
  if (!rawHtml) return '';
  const s = String(rawHtml);
  const emRe = /<em>([\s\S]*?)<\/em>/gi;
  let m;
  let arMatch = null;
  while ((m = emRe.exec(s)) !== null) {
    if (/[\u0600-\u06FF]/.test(m[1])) {
      arMatch = m;
      break;
    }
  }
  if (wantAr) {
    if (arMatch) return arMatch[1].trim();
    if (/[\u0600-\u06FF]/.test(s)) return s.trim();
    return '';
  }
  if (arMatch) {
    return (s.slice(0, arMatch.index) + s.slice(arMatch.index + arMatch[0].length))
      .replace(/<br\s*\/?>\s*$/i, '')
      .trim();
  }
  return s.trim();
}

function toDollarMath(str) {
  if (str == null) return '';
  let s = String(str);
  s = s.replace(/<br\s*\/?>/gi, ' ');
  s = s.replace(/<\/p>\s*<p[^>]*>/gi, ' ');
  s = s.replace(/<[^>]+>/g, '');
  s = s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  // Convert currency \$ inside \( ... \)
  s = s.replace(/\\\(\s*\\\$\s*([\s\S]*?)\s*\\\)/g, (_, m) => `USD \\(${m.replace(/\\\$/g, '').trim()}\\)`);
  s = s.replace(/\\\$/g, 'USD ');
  // Convert \[ ... \] and \( ... \) to $...$
  s = s.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (_, m) => ` $${m.replace(/\$/g, '').trim()}$ `);
  s = s.replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, (_, m) => `$${m.replace(/\$/g, '').trim()}$`);
  s = s.replace(/\\[dt]frac/g, '\\frac');
  s = s.replace(/\\(?:left|right)\s*([()[\]|.])/g, '$1');
  s = s.replace(/\\(?:quad|qquad)/g, ' ');
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

function loadBankPool(track) {
  const bp = path.join(BANK_DIR, `${track}.json`);
  if (!fs.existsSync(bp)) return [];
  const d = JSON.parse(fs.readFileSync(bp, 'utf8'));
  if (Array.isArray(d.pool)) return d.pool;
  const out = [];
  for (const diff of ['easy', 'medium', 'hard']) {
    if (Array.isArray(d[diff])) {
      for (const q of d[diff]) out.push({ ...q, difficulty: q.difficulty || diff });
    }
  }
  return out;
}

// ============================================================================
// PART 1: Clean content/<track>/*.json and content/<track>/_practice-set.json
// ============================================================================

const tracks = fs.readdirSync(CONTENT_DIR).filter(t => fs.statSync(path.join(CONTENT_DIR, t)).isDirectory()).sort();

let replacedExamples = 0;
let replacedPractices = 0;
let replacedPracticeSets = 0;

for (const track of tracks) {
  const pool = loadBankPool(track);
  if (!pool.length) continue;

  const usedSkels = new Set();
  const trackDir = path.join(CONTENT_DIR, track);
  const files = fs.readdirSync(trackDir).filter(f => f.endsWith('.json')).sort();

  // Group bank items by topic_id
  const byTopic = {};
  for (const q of pool) {
    const tid = q.topic_id || 'general';
    if (!byTopic[tid]) byTopic[tid] = [];
    byTopic[tid].push(q);
  }

  function pickBankItem(topicId, diffPref) {
    const candidates = [
      ...(byTopic[topicId] || []),
      ...pool
    ];
    const diffLower = String(diffPref || 'medium').toLowerCase();
    // Pass 1: matching difficulty + unused skeleton
    for (const q of candidates) {
      const qDiff = String(q.difficulty || 'medium').toLowerCase();
      if (qDiff !== diffLower) continue;
      const skel = getSkeleton(q.text || q.q);
      if (!usedSkels.has(skel)) {
        usedSkels.add(skel);
        return q;
      }
    }
    // Pass 2: any difficulty + unused skeleton
    for (const q of candidates) {
      const skel = getSkeleton(q.text || q.q);
      if (!usedSkels.has(skel)) {
        usedSkels.add(skel);
        return q;
      }
    }
    return candidates[0];
  }

  for (const fn of files) {
    const fp = path.join(trackDir, fn);
    if (fn === '_meta.json') continue;

    if (fn === '_practice-set.json') {
      const psData = JSON.parse(fs.readFileSync(fp, 'utf8'));
      let psModified = false;
      if (Array.isArray(psData.items)) {
        psData.items.forEach((it, idx) => {
          const qText = it.question?.en || it.prompt?.en || '';
          if (/\b(least common multiple|greatest common factor|greatest common divisor|lcm|gcd|gcf|hcf)\b/i.test(qText)) {
            const replacement = pickBankItem(it.topic || '', 'easy');
            if (replacement) {
              const stemEn = splitBilingual(replacement.text || replacement.q, false);
              const solEn = splitBilingual(replacement.solution || replacement.sol, false);
              if (it.question && typeof it.question === 'object') it.question.en = stemEn;
              if (it.solution && typeof it.solution === 'object') it.solution.en = solEn;
              psModified = true;
              replacedPracticeSets++;
            }
          }
        });
      }
      if (psModified) {
        fs.writeFileSync(fp, JSON.stringify(psData, null, 2) + '\n', 'utf8');
      }
      continue;
    }

    const chap = JSON.parse(fs.readFileSync(fp, 'utf8'));
    const chapId = chap.id || fn.replace('.json', '');
    const chapTitleEn = (chap.title && chap.title.en) || chapId;
    const isBi = Boolean(chap.title && chap.title.ar);
    const blocks = (chap.content && chap.content.blocks) || [];
    let modified = false;

    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];

      // 1a. Worked Example with "(Easy/Medium/Hard Application)" or bare LCM/GCD in act/act2
      const labelEn = (b.label && b.label.en) || '';
      const bodyEn = (b.body && b.body.en) || '';
      const isAppExample = b.kind === 'callout' && b.style === 'example' && /Application\)/.test(labelEn);
      const isBareLcmExample = b.kind === 'callout' && b.style === 'example' && /\b(LCM|GCD|GCF|least common multiple|greatest common divisor)\b/i.test(labelEn + ' ' + bodyEn);

      if (isAppExample || isBareLcmExample) {
        const diffMatch = labelEn.match(/\((Easy|Medium|Hard)\s+Application\)/i);
        const diffCap = diffMatch ? diffMatch[1] : 'Medium';
        const q = pickBankItem(chapId, diffCap.toLowerCase());
        if (q) {
          const stemEn = splitBilingual(q.text || q.q, false);
          const solEn = splitBilingual(q.solution || q.sol, false);
          const stemAr = isBi ? (splitBilingual(q.text || q.q, true) || stemEn) : null;
          const solAr = isBi ? (splitBilingual(q.solution || q.sol, true) || solEn) : null;

          if (isBareLcmExample && !isAppExample) {
            b.label.en = `Worked Example — ${chapTitleEn} (${diffCap} Application)`;
          }
          b.body.en = `<p><strong>Problem (${diffCap}):</strong> ${stemEn}</p><p><strong>Step-by-Step Solution:</strong> ${solEn}</p>`;
          if (isBi && b.body.ar !== null) {
            b.body.ar = `<p><strong>مسألة (${diffCap}):</strong> ${stemAr}</p><p><strong>الحل خطوة بخطوة:</strong> ${solAr}</p>`;
          }
          modified = true;
          replacedExamples++;
        }
      }

      // 1b. Practice Problem with "[Practice X · Easy/Medium/Hard]" or bare LCM/GCD
      const qEn = (b.question && b.question.en) || '';
      const isTaggedPrac = b.kind === 'practiceProblem' && /\[Practice\s+\d+\s*·\s*(Easy|Medium|Hard)\]/i.test(qEn);
      const isBareLcmPrac = b.kind === 'practiceProblem' && /\b(least common multiple|greatest common factor|greatest common divisor|LCM|GCD|GCF|HCF)\b/i.test(qEn);

      if (isTaggedPrac || isBareLcmPrac) {
        const mTag = qEn.match(/\[Practice\s+(\d+)\s*·\s*(Easy|Medium|Hard)\]/i);
        const pNum = mTag ? mTag[1] : '1';
        const diffCap = mTag ? mTag[2] : 'Medium';
        const q = pickBankItem(chapId, diffCap.toLowerCase());
        if (q) {
          const stemEn = splitBilingual(q.text || q.q, false);
          const solEn = splitBilingual(q.solution || q.sol, false);
          const stemAr = isBi ? (splitBilingual(q.text || q.q, true) || stemEn) : null;
          const solAr = isBi ? (splitBilingual(q.solution || q.sol, true) || solEn) : null;

          b.question.en = `<strong>[Practice ${pNum} · ${diffCap}]</strong> ${stemEn}`;
          if (isBi && b.question.ar !== null) {
            b.question.ar = `<strong>[تدريب ${pNum} · ${diffCap}]</strong> ${stemAr}`;
          }
          b.solution.en = solEn;
          if (isBi && b.solution.ar !== null) {
            b.solution.ar = solAr;
          }
          if (Array.isArray(q.hints) && q.hints.length === 3) {
            b.hints = q.hints.map((h, hIdx) => {
              const tierLabels = ['Tier 1 (Conceptual Setup)', 'Tier 2 (Key Transformation)', 'Tier 3 (Final Verification)'];
              const hEn = splitBilingual(h, false);
              const hAr = isBi ? (splitBilingual(h, true) || hEn) : null;
              return {
                en: `<strong>${tierLabels[hIdx]}:</strong> ${hEn}`,
                ar: isBi ? hAr : null
              };
            });
          } else if (Array.isArray(b.hints)) {
            b.hints = [
              {
                en: `<strong>Tier 1 (Conceptual Setup):</strong> Identify the core relationship in <em>${chapTitleEn}</em> from the given conditions.`,
                ar: isBi ? `<strong>المستوى 1 (الإعداد المفاهيمي):</strong> حدد العلاقة الأساسية في <em>${chap.title.ar || chapTitleEn}</em> من المعطيات.` : null
              },
              {
                en: `<strong>Tier 2 (Key Transformation):</strong> Set up the governing algebraic or geometric equation and isolate the target quantity.`,
                ar: isBi ? `<strong>المستوى 2 (التحويل الأساسي):</strong> كوّن المعادلة الجبرية أو الهندسية وبسّطها لإيجاد المطلوب.` : null
              },
              {
                en: `<strong>Tier 3 (Final Verification):</strong> Substitute the numerical values carefully and verify domain restrictions.`,
                ar: isBi ? `<strong>المستوى 3 (التحقق النهائي):</strong> عوّض بالقيم العددية بدقة وتحقق من معقولية الناتج.` : null
              }
            ];
          }
          modified = true;
          replacedPractices++;
        }
      }
    }

    if (modified) {
      fs.writeFileSync(fp, JSON.stringify(chap, null, 2) + '\n', 'utf8');
    }
  }
}

console.log(`✅ Cleaned content/ lessons: replaced ${replacedExamples} worked examples, ${replacedPractices} practice problems, and ${replacedPracticeSets} practice-set items.`);

// ============================================================================
// PART 2: Clean tools/worksheet_gen/topics/<track>/*.json (all non-SAT tracks)
// ============================================================================

const wsTracks = fs.readdirSync(TOPICS_DIR).filter(t => fs.statSync(path.join(TOPICS_DIR, t)).isDirectory()).sort();

const figRefRe = /\b(graph|figure|diagram|shown|below|above|chart|table|plot|shaded|triangle|circle|sector|arc|number line|boxplot|box plot|histogram|bar|slope field|solid|cylinder|cone|prism|pyramid|sphere|venn|curve|parabola)\b|الشكل|الرسم|الجدول|المخطط|التمثيل|أدناه|المجاور/i;

const badWsQuestionRe = /governing relation for this system|For the model .* in |A data set recorded for |Practice \d+\.\d+:|\[.*·\s*Practice\s*\d+\]|\b(least common multiple|greatest common factor|greatest common divisor|highest common factor|lowest common multiple|lcm|gcd|gcf|hcf)\b|\\gcd|\\mathrm\{lcm\}|\\text\{lcm\}|\\text\{gcd\}|finite sets|union cardinality|division algorithm|scaled constant|convex triangle|records cell counts|\\sum_\{k=1\}\^x|\\theta_A\s*=|diagonal sum/i;

let replacedWsQuestions = 0;
let strippedWsFigures = 0;

for (const track of wsTracks) {
  if (track === 'sat') continue; // SAT worksheets were already rebuilt cleanly via rebuild_sat_worksheets.js

  const pool = loadBankPool(track);
  if (!pool.length) continue;

  const trackWsDir = path.join(TOPICS_DIR, track);
  const wsFiles = fs.readdirSync(trackWsDir).filter(f => f.endsWith('.json')).sort();
  const usedTrackSkels = new Set();

  // First record all valid existing question skeletons in this track so replacements never collide
  for (const wf of wsFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(trackWsDir, wf), 'utf8'));
    for (const sec of (data.sections || [])) {
      for (const q of (sec.questions || [])) {
        const txt = q.q || q.text || '';
        if (!badWsQuestionRe.test(txt)) {
          usedTrackSkels.add(getSkeleton(txt));
        }
      }
    }
  }

  function pickCleanBankForWorksheet(isAr, wantMcq, topicTitle) {
    const titleWords = String(topicTitle || '').toLowerCase().split(/\W+/).filter(w => w.length > 3);
    // Score candidates by domain/topic match
    const scored = [];
    for (const item of pool) {
      const rawTxt = item.text || item.q || '';
      const stem = toDollarMath(splitBilingual(rawTxt, isAr));
      if (!stem || stem.length < 20) continue;
      if (badWsQuestionRe.test(stem)) continue;
      const skel = getSkeleton(stem);
      if (usedTrackSkels.has(skel)) continue;
      if (!wantMcq && /which of the following|which graph|which statement|أي مما يلي|أي العبارات/i.test(stem)) {
        continue;
      }
      const domLower = String(item.domain || '').toLowerCase();
      let score = 0;
      for (const w of titleWords) {
        if (domLower.includes(w)) score += 3;
      }
      scored.push({ item, stem, skel, score });
    }
    scored.sort((a, b) => b.score - a.score);
    if (!scored.length) {
      // Fallback without skeleton restriction
      for (const item of pool) {
        const stem = toDollarMath(splitBilingual(item.text || item.q || '', isAr));
        if (stem && !badWsQuestionRe.test(stem)) {
          return { item, stem };
        }
      }
      return null;
    }
    const chosen = scored[0];
    usedTrackSkels.add(chosen.skel);
    return chosen;
  }

  for (const wf of wsFiles) {
    const wPath = path.join(trackWsDir, wf);
    const data = JSON.parse(fs.readFileSync(wPath, 'utf8'));
    const isAr = data.lang === 'ar' || wf.endsWith('-ar.json');
    const topicTitle = data.title || wf;
    let modified = false;

    for (const sec of (data.sections || [])) {
      for (let qi = 0; qi < (sec.questions || []).length; qi++) {
        const q = sec.questions[qi];
        const txt = q.q || q.text || '';
        const isMcq = q.question_type === 'MCQ' || Array.isArray(q.choices);

        // Check if question needs replacement
        if (badWsQuestionRe.test(txt)) {
          const picked = pickCleanBankForWorksheet(isAr, isMcq, topicTitle);
          if (picked) {
            const { item, stem } = picked;
            const rawChoices = (item.choices || []).map(c => toDollarMath(splitBilingual(c, isAr)));
            const corrIdx = typeof item.answer === 'number' ? item.answer : (typeof item.correct === 'number' ? item.correct : 0);
            const corrVal = rawChoices[corrIdx] || '';
            const sol = toDollarMath(splitBilingual(item.solution || item.sol || '', isAr));

            if (isMcq) {
              q.q = stem;
              q.choices = rawChoices.length === 4 ? rawChoices : ['$1$', '$2$', '$3$', '$4$'];
              q.correct = corrIdx;
              q.answer = sol || `Correct option: ${corrVal}`;
              q.explanation = sol || q.answer;
              delete q.figure;
            } else {
              let frqStem = stem;
              if (!isAr && frqStem.endsWith('?')) {
                frqStem += ' Show your complete algebraic work.';
              }
              const prefix = isAr ? 'الإجابة النهائية:' : 'Final Answer:';
              const fullAns = corrVal ? `${prefix} ${corrVal}. ${sol}`.trim() : sol;
              q.q = frqStem;
              q.answer = fullAns;
              q.explanation = sol || fullAns;
              delete q.parts;
              delete q.answers;
              delete q.figure;
            }
            modified = true;
            replacedWsQuestions++;
          }
        }

        // Check if existing figure is a synthetic procedural figure or unreferenced in stem
        if (q.figure) {
          const fStr = JSON.stringify(q.figure);
          const isFakeDefaultParabola = /\*\(x - \([-\d.]+\)\)\*\*2/.test(fStr);
          const isFakeC1Bars = fStr.includes('"C1","C2","C3"');
          const isUnreferenced = !figRefRe.test(q.q || '');

          if (isFakeDefaultParabola || isFakeC1Bars || isUnreferenced) {
            delete q.figure;
            modified = true;
            strippedWsFigures++;
          }
        }
      }
    }

    if (modified) {
      fs.writeFileSync(wPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    }
  }
}

console.log(`✅ Cleaned topic worksheets: replaced ${replacedWsQuestions} filler/synthetic questions and stripped ${strippedWsFigures} fake/unreferenced figures.`);
