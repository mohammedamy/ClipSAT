#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const DOWNLOADS_DIR = path.join(ROOT, 'public/downloads');
const TOPICS_DIR = path.join(ROOT, 'tools/worksheet_gen/topics');

function cleanPdfText(s) {
  if (!s) return '';
  return String(s)
    .replace(/\\[()[\]]/g, '')
    .replace(/[\\()]/g, '')
    .replace(/\\mathbb\{R\}/g, 'R')
    .replace(/\\mathbf\{([a-zA-Z0-9]+)\}/g, '$1')
    .replace(/\\vec\{([a-zA-Z0-9]+)\}/g, '$1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
    .replace(/\\sqrt\{([^}]+)\}/g, 'sqrt($1)')
    .replace(/\\cdot/g, '*')
    .replace(/\\times/g, 'x')
    .replace(/\\pm/g, '+/-')
    .replace(/\\le/g, '<=')
    .replace(/\\ge/g, '>=')
    .replace(/\\ne/g, '!=')
    .replace(/\\in/g, 'in')
    .replace(/\\sim/g, '~')
    .replace(/\\hat\{([a-zA-Z0-9]+)\}/g, '$1^')
    .replace(/\\bar\{([a-zA-Z0-9]+)\}/g, '$1_avg')
    .replace(/\\mathcal\{N\}/g, 'N')
    .replace(/\\mu/g, 'u')
    .replace(/\\sigma/g, 's')
    .replace(/\\lambda/g, 'L')
    .replace(/\\theta/g, 'theta')
    .replace(/\\pi/g, 'pi')
    .replace(/\\partial/g, 'd')
    .replace(/\\nabla/g, 'grad')
    .replace(/\\quad/g, '  ')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function wordWrap(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else {
      cur = cur ? cur + ' ' + w : w;
    }
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

function createPdfDocument(trackName, unitNum, topicTitle, questions, isAnswerKey) {
  const pages = [];
  let curCommands = [];

  function startPage() {
    curCommands = [];
    curCommands.push('0.12 0.23 0.43 rg');
    curCommands.push('50 742 512 2.5 re f');
    curCommands.push('BT /F2 16 Tf 50 752 Td (ClipSAT : ' + cleanPdfText(trackName) + ') Tj ET');
    curCommands.push('0.3 0.35 0.45 rg');
    curCommands.push('BT /F2 11 Tf 50 726 Td (Unit ' + unitNum + ': ' + cleanPdfText(topicTitle) + ') Tj ET');

    if (isAnswerKey) {
      curCommands.push('0.06 0.55 0.28 rg');
      curCommands.push('BT /F2 12 Tf 435 752 Td ([ANSWER KEY]) Tj ET');
    } else {
      curCommands.push('0.4 0.4 0.4 rg');
      curCommands.push('BT /F1 9.5 Tf 375 726 Td (Name: ______________________) Tj ET');
    }

    curCommands.push('0.6 0.65 0.7 rg');
    curCommands.push('50 48 512 0.75 re f');
    curCommands.push('BT /F1 8 Tf 145 36 Td ((c) ClipSAT: By Mr. Mohamed Abdallah +966597688647) Tj ET');
  }

  startPage();
  let curY = 695;

  questions.forEach((q, qIdx) => {
    const rawStem = cleanPdfText(q.text || q.q);
    const stemLines = wordWrap(rawStem, 82);
    const needed = isAnswerKey ? 130 : 95;
    if (curY - needed < 60) {
      pages.push(curCommands.join('\n'));
      startPage();
      curY = 695;
    }

    curCommands.push('0.12 0.23 0.43 rg');
    curCommands.push(`BT /F2 10.5 Tf 50 ${curY} Td (Q${qIdx + 1}.) Tj ET`);

    curCommands.push('0.08 0.1 0.15 rg');
    stemLines.forEach((line, lIdx) => {
      curCommands.push(`BT /F1 10 Tf 78 ${curY - lIdx * 13} Td (${line}) Tj ET`);
    });
    curY -= stemLines.length * 13 + 6;

    const choices = q.choices || [];
    const choiceLetters = ['A', 'B', 'C', 'D'];
    choices.slice(0, 4).forEach((ch, cIdx) => {
      const isCorrect = (cIdx === q.answer);
      const chText = cleanPdfText(ch);
      const colX = (cIdx % 2 === 0) ? 78 : 310;
      const rowY = curY - Math.floor(cIdx / 2) * 15;

      if (isAnswerKey && isCorrect) {
        curCommands.push('0.05 0.52 0.25 rg');
        curCommands.push(`BT /F2 9.5 Tf ${colX} ${rowY} Td ([x] ${choiceLetters[cIdx]}: ${chText.slice(0, 36)}) Tj ET`);
      } else {
        curCommands.push('0.25 0.28 0.32 rg');
        curCommands.push(`BT /F1 9 Tf ${colX} ${rowY} Td ([  ] ${choiceLetters[cIdx]}: ${chText.slice(0, 36)}) Tj ET`);
      }
    });
    curY -= 36;

    if (isAnswerKey) {
      const sol = cleanPdfText(q.sol || q.solution || '');
      const solLines = wordWrap('Solution: ' + sol, 84);
      curCommands.push('0.05 0.48 0.22 rg');
      solLines.forEach((sLine, sIdx) => {
        curCommands.push(`BT /F1 8.5 Tf 78 ${curY - sIdx * 11} Td (${sLine}) Tj ET`);
      });
      curY -= solLines.length * 11 + 10;
    } else {
      curY -= 14;
    }
  });

  pages.push(curCommands.join('\n'));

  const chunks = [];
  const offsets = [];
  function write(str) { chunks.push(Buffer.from(str, 'binary')); }
  function writeBuf(buf) { chunks.push(buf); }
  function totalLen() { return chunks.reduce((acc, c) => acc + c.length, 0); }

  write('%PDF-1.4\n%\xe2\xe3\xcf\xd3\n');

  function addObj(contentBuf) {
    offsets.push(totalLen());
    const objNum = offsets.length;
    write(objNum + ' 0 obj\n');
    writeBuf(contentBuf);
    write('\nendobj\n');
    return objNum;
  }

  const pageStreamObjNums = [];
  const pageObjNums = [];
  const f1Num = 3;
  const f2Num = 4;
  let nextObjNum = 5;

  pages.forEach(() => {
    pageObjNums.push(nextObjNum++);
    pageStreamObjNums.push(nextObjNum++);
  });

  addObj(Buffer.from('<< /Type /Catalog /Pages 2 0 R >>'));
  const kidsStr = pageObjNums.map(n => n + ' 0 R').join(' ');
  addObj(Buffer.from(`<< /Type /Pages /Kids [${kidsStr}] /Count ${pages.length} >>`));
  addObj(Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>'));
  addObj(Buffer.from('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>'));

  pages.forEach((pgContent, pIdx) => {
    const sObjNum = pageStreamObjNums[pIdx];
    const compressed = zlib.deflateSync(Buffer.from(pgContent, 'utf8'));
    addObj(Buffer.from(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents ${sObjNum} 0 R /Resources << /Font << /F1 ${f1Num} 0 R /F2 ${f2Num} 0 R >> >> >>`));
    const streamHeader = '<< /Length ' + compressed.length + ' /Filter /FlateDecode >>\nstream\n';
    const streamTrailer = '\nendstream';
    addObj(Buffer.concat([Buffer.from(streamHeader, 'binary'), compressed, Buffer.from(streamTrailer, 'binary')]));
  });

  const startXref = totalLen();
  let xrefStr = 'xref\n0 ' + (offsets.length + 1) + '\n0000000000 65535 f \n';
  offsets.forEach(off => {
    xrefStr += String(off).padStart(10, '0') + ' 00000 n \n';
  });
  xrefStr += 'trailer\n<< /Size ' + (offsets.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + startXref + '\n%%EOF\n';
  write(xrefStr);

  return Buffer.concat(chunks);
}

// 1. Generate 0.01 Diagnostic & Exam Strategy Worksheets for the 7 tracks with Overview chapters
const OVERVIEW_TRACKS = [
  { id: 'sat', name: 'Digital SAT Math', title: 'Digital SAT Diagnostic & Adaptive Strategy Drill', sub: '20 SPRs + 25 MCQs • Difficulty Progression • Official Digital SAT Curriculum' },
  { id: 'act', name: 'ACT Math', title: 'ACT Math Diagnostic & Pacing Strategy Drill', sub: '60-Minute Pacing & Core Readiness • Official ACT Math Curriculum' },
  { id: 'act2', name: 'ACT Subject Test Math 1', title: 'ACT II Math Level 1 Diagnostic & Strategy Drill', sub: 'Algebra & Geometry Readiness • Official ACT Subject Test Curriculum' },
  { id: 'est', name: 'EST I Math', title: 'EST I Literacy & Quantitative Diagnostic Drill', sub: 'No-Calculator & Calculator Readiness • Official EST I Curriculum' },
  { id: 'est2', name: 'EST II Math Level 1', title: 'EST II Math Level 1 Diagnostic & Strategy Drill', sub: 'Core Subject Readiness • Official EST II Curriculum' },
  { id: 'aslevel', name: 'Cambridge AS Level Math (9709)', title: 'AS-Level 9709 Paper 1/2/4/5 Diagnostic Readiness', sub: 'Pure 1, Mechanics & Statistics Readiness • Cambridge 9709' },
  { id: 'a2level', name: 'Cambridge A2 Level Math (9709)', title: 'A2-Level 9709 Paper 3 & Paper 6 Diagnostic Readiness', sub: 'Pure 3 & Probability/Statistics 2 Readiness • Cambridge 9709' }
];

for (const trk of OVERVIEW_TRACKS) {
  const bankPath = path.join(ROOT, `bank-data/${trk.id}.json`);
  const bank = JSON.parse(fs.readFileSync(bankPath, 'utf8'));
  const pool = Array.isArray(bank.pool) ? bank.pool : (bank.easy || []).concat(bank.medium || []).concat(bank.hard || []);
  const withFigs = pool.filter(q => q.figure || q.fig);
  const chosen = (withFigs.length >= 4 ? withFigs.slice(0, 4).concat(pool.slice(0, 4)) : pool.slice(0, 8)).slice(0, 8);
  const qSubset = chosen.map(q => ({
    text: q.text || q.q || '',
    choices: q.choices || ['A', 'B', 'C', 'D'],
    answer: q.answer !== undefined ? q.answer : (q.correct !== undefined ? q.correct : 0),
    sol: q.sol || '',
    figure: q.figure || q.fig || { type: 'fn', title: 'Diagnostic Function Check', xrange: [-4, 4], yrange: [-4, 8], fns: [{ fn: 'x^2 - 2', label: 'f(x)' }] }
  }));

  const outDir = path.join(DOWNLOADS_DIR, trk.id);
  const topicsTrackDir = path.join(TOPICS_DIR, trk.id);
  if (!fs.existsSync(topicsTrackDir)) fs.mkdirSync(topicsTrackDir, { recursive: true });

  const slug = '0.01-diagnostic-and-exam-strategy';
  const wsFilename = `${slug}-worksheet.pdf`;
  const akFilename = `${slug}-answerkey.pdf`;

  fs.writeFileSync(path.join(outDir, wsFilename), createPdfDocument(trk.name, '0.01', trk.title, qSubset, false));
  fs.writeFileSync(path.join(outDir, akFilename), createPdfDocument(trk.name, '0.01', trk.title, qSubset, true));

  const topicJson = {
    track: trk.id,
    num: '0.01',
    title: trk.title,
    sub: trk.sub,
    sections: [
      {
        heading: `${trk.title} Practice Exercises`,
        questions: qSubset.map(q => ({
          q: q.text,
          choices: q.choices,
          correct: q.answer,
          answer: q.sol,
          figure: q.figure
        }))
      }
    ]
  };
  fs.writeFileSync(path.join(topicsTrackDir, `${slug}.json`), JSON.stringify(topicJson, null, 2), 'utf8');

  const manifestPath = path.join(outDir, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!manifest.some(m => m.worksheet === wsFilename)) {
    manifest.unshift({
      unit: 0,
      num: '0.01',
      lang: 'en',
      title: trk.title,
      sub: trk.sub,
      worksheet: wsFilename,
      answerkey: akFilename
    });
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  }
  console.log(`Added 0.01 diagnostic worksheet & manifest entry for ${trk.id}`);
}

// 2. Sync any unindexed PDF worksheet pairs in linalg, mvc, odes (or any other track) into manifest.json
const allTracks = fs.readdirSync(DOWNLOADS_DIR).filter(d => fs.statSync(path.join(DOWNLOADS_DIR, d)).isDirectory());
for (const t of allTracks) {
  const dir = path.join(DOWNLOADS_DIR, t);
  const manifestPath = path.join(dir, 'manifest.json');
  if (!fs.existsSync(manifestPath)) continue;
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const listed = new Set(manifest.map(m => m.worksheet));
  const pdfs = fs.readdirSync(dir).filter(f => f.endsWith('-worksheet.pdf')).sort();
  let added = 0;
  for (const wsFile of pdfs) {
    if (listed.has(wsFile)) continue;
    const akFile = wsFile.replace('-worksheet.pdf', '-answerkey.pdf');
    if (!fs.existsSync(path.join(dir, akFile))) continue;
    const base = wsFile.replace('-worksheet.pdf', '');
    const m = base.match(/^(\d+)\.(\d+)-(.+)$/);
    const unitNum = m ? parseInt(m[1], 10) : 1;
    let subNum = m ? `${m[1]}.${m[2]}` : '1.02';
    if (manifest.some(entry => entry.num === subNum)) {
      subNum = `${unitNum}.02`;
    }
    const rawTitle = (m ? m[3] : base)
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') + ' (Supplemental Drill)';
    manifest.push({
      unit: unitNum,
      num: subNum,
      lang: 'en',
      title: rawTitle,
      sub: null,
      worksheet: wsFile,
      answerkey: akFile
    });
    added++;
  }
  if (added > 0) {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log(`Synced ${added} supplemental PDF worksheet pairs into ${t}/manifest.json`);
  }
}
