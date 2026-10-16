'use strict';
const fs = require('fs');
const path = require('path');

const geoPath = path.join(__dirname, '../bank-data/geo.json');
const geoData = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

const simQuestions = geoData.pool.filter(q => q.domain === 'Similarity');
console.log(`Found ${simQuestions.length} Similarity questions in geo.json.`);

// 1. Redundancy check across the entire Similarity bank
const redundancy = require('../src/scripts/modules/05e-redundancy-check.js');
const repeats = redundancy.findRepeats(simQuestions);
console.log(`Redundancy check across all ${simQuestions.length} questions:`, repeats.length === 0 ? '0 repeats (PASSED)' : `${repeats.length} repeats found`);

if (repeats.length > 0) {
  console.error('Repeats:', JSON.stringify(repeats, null, 2));
  process.exit(1);
}

// 2. Choice distribution check
const choiceCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
simQuestions.forEach(q => {
  choiceCounts[q.answer]++;
});
console.log('Choice distribution:', choiceCounts);

// 3. Archetype & Figure coverage check
const figTypes = {};
let figCount = 0;
simQuestions.forEach(q => {
  if (q.fig && q.fig.type) {
    figTypes[q.fig.type] = (figTypes[q.fig.type] || 0) + 1;
    figCount++;
  }
});
console.log(`Diagram coverage: ${figCount} of ${simQuestions.length} questions have rich SVG diagrams.`);
console.log('Diagram types used:', figTypes);

// 4. Simulate 100 random 10-question quizzes to test real student experience
console.log('Simulating 100 random 10-question chapter quizzes...');
let redundantQuizzes = 0;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

for (let sim = 1; sim <= 100; sim++) {
  // Pick 10 random questions from simQuestions without replacement
  const shuffled = shuffle(simQuestions);
  const quiz = shuffled.slice(0, 10);
  
  // Check if any repeats exist in this 10-question quiz
  const quizRepeats = redundancy.findRepeats(quiz);
  if (quizRepeats.length > 0) {
    redundantQuizzes++;
    console.error(`Simulation ${sim} had ${quizRepeats.length} repeats!`);
  }
}

if (redundantQuizzes === 0) {
  console.log('PASSED: 100 out of 100 simulated 10-question quizzes had ZERO redundancy!');
} else {
  console.error(`FAILED: ${redundantQuizzes} quizzes had redundant questions.`);
  process.exit(1);
}

console.log('ALL SIMILARITY BANK TESTS PASSED PERFECTLY!');
