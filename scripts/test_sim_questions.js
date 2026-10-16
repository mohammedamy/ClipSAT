'use strict';
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'build_similarity_bank.js'), 'utf8');
const startIndex = content.indexOf('const questions = [');
const endIndex = content.indexOf('console.log(`Generated ${questions.length}');
const code = content.slice(startIndex, endIndex);

const questions = new Function(code + '\nreturn questions;')();

console.log('Successfully loaded ' + questions.length + ' questions.');

let errors = 0;
for (let i = 0; i < questions.length; i++) {
  const q = questions[i];
  if (!q.text) { console.error(`Missing text at ${i}`); errors++; }
  if (!q.choices || q.choices.length !== 4) { console.error(`Invalid choices at ${i}`); errors++; }
  const uniqueChoices = new Set(q.choices);
  if (uniqueChoices.size !== 4) {
    console.error(`Duplicate choices at ${i}:`, q.choices);
    errors++;
  }
  if (typeof q.answer !== 'number') { console.error(`Invalid answer at ${i}`); errors++; }
  if (!q.sol) { console.error(`Missing sol at ${i}`); errors++; }
}

if (errors === 0) {
  console.log('All basic MCQ properties are 100% valid!');
} else {
  console.log(`Found ${errors} errors.`);
}

const redundancy = require(path.join(__dirname, '../src/scripts/modules/05e-redundancy-check.js'));
console.log('Running ClipSATRedundancy.findRepeats on the 65 questions...');
const repeats = redundancy.findRepeats(questions);
console.log('Repeats found:', repeats.length);
if (repeats.length > 0) {
  console.log('Repeated question details:', JSON.stringify(repeats, null, 2));
} else {
  console.log('PERFECT! 0 repeats found across all 65 questions.');
}

