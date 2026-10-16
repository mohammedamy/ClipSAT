const fs = require('fs');
const path = require('path');

const satPath = path.join(__dirname, '../bank-data/sat.json');
const sat = JSON.parse(fs.readFileSync(satPath, 'utf8'));

const replacements = {
  155: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "What is the \\( y \\)-intercept of the line \\( 5x - 2y = 20 \\) in the \\( xy \\)-plane?",
    choices: [
      "\\( (0, -10) \\)",
      "\\( (0, 10) \\)",
      "\\( (4, 0) \\)",
      "\\( (-4, 0) \\)"
    ],
    answer: 0,
    sol: "To find the \\( y \\)-intercept, set \\( x = 0 \\): \\( 5(0) - 2y = 20 \\Rightarrow -2y = 20 \\Rightarrow y = -10 \\). Thus, the \\( y \\)-intercept is \\( (0, -10) \\)."
  },
  156: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "A line in the \\( xy \\)-plane has a slope of \\( 3 \\) and passes through the point \\( (2, 11) \\). Which equation represents this line?",
    choices: [
      "\\( y = 3x + 5 \\)",
      "\\( y = 3x + 11 \\)",
      "\\( y = 3x - 5 \\)",
      "\\( y = 2x + 3 \\)"
    ],
    answer: 0,
    sol: "Using point-slope form: \\( y - 11 = 3(x - 2) \\Rightarrow y = 3x - 6 + 11 = 3x + 5 \\)."
  },
  157: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "A taxi company charges an initial booking fee plus a fixed rate per mile driven. A trip of \\( 4 \\) miles costs \\( \\$14 \\), and a trip of \\( 8 \\) miles costs \\( \\$22 \\). What is the initial booking fee?",
    choices: [
      "\\$4",
      "\\$6",
      "\\$8",
      "\\$2"
    ],
    answer: 1,
    sol: "Rate per mile: \\( m = \\frac{22 - 14}{8 - 4} = \\frac{8}{4} = 2 \\) dollars/mile. Initial fee: \\( 14 - 2(4) = 14 - 8 = 6 \\) dollars."
  },
  158: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "At what point does the line \\( y = -\\frac{1}{2}x + 4 \\) intersect the \\( x \\)-axis in the \\( xy \\)-plane?",
    choices: [
      "\\( (8, 0) \\)",
      "\\( (-8, 0) \\)",
      "\\( (0, 4) \\)",
      "\\( (4, 0) \\)"
    ],
    answer: 0,
    sol: "To find the \\( x \\)-intercept, set \\( y = 0 \\): \\( 0 = -\\frac{1}{2}x + 4 \\Rightarrow \\frac{1}{2}x = 4 \\Rightarrow x = 8 \\). The point is \\( (8, 0) \\)."
  },
  159: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "Which of the following equations represents a horizontal line passing through the point \\( (3, -5) \\)?",
    choices: [
      "\\( y = -5 \\)",
      "\\( x = 3 \\)",
      "\\( y = 3x - 5 \\)",
      "\\( y = -5x + 3 \\)"
    ],
    answer: 0,
    sol: "A horizontal line has slope 0 and an equation of the form \\( y = c \\). Since it passes through \\( (3, -5) \\), the equation is \\( y = -5 \\)."
  },
  163: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "Which of the following lines is parallel to the line \\( y = 4x - 9 \\) in the \\( xy \\)-plane?",
    choices: [
      "\\( y = 4x + 12 \\)",
      "\\( y = -4x - 9 \\)",
      "\\( y = -\\frac{1}{4}x + 3 \\)",
      "\\( y = \\frac{1}{4}x - 9 \\)"
    ],
    answer: 0,
    sol: "Parallel lines have identical slopes. The line \\( y = 4x - 9 \\) has slope \\( 4 \\), so \\( y = 4x + 12 \\) is parallel to it."
  },
  164: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "What is the slope of any line in the \\( xy \\)-plane that is perpendicular to the line \\( y = -\\frac{2}{5}x + 3 \\)?",
    choices: [
      "\\( \\frac{5}{2} \\)",
      "\\( -\\frac{5}{2} \\)",
      "\\( \\frac{2}{5} \\)",
      "\\( -\\frac{2}{5} \\)"
    ],
    answer: 0,
    sol: "The slope of the given line is \\( -\\frac{2}{5} \\). Perpendicular lines have negative reciprocal slopes: \\( -\\frac{1}{-2/5} = \\frac{5}{2} \\)."
  },
  167: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "What is the slope of the line in the \\( xy \\)-plane that passes through the points \\( (-3, 5) \\) and \\( (1, -3) \\)?",
    choices: ["-2", "-1/2", "2", "1/2"],
    answer: 0,
    sprAnswer: "-2",
    ans: "-2",
    sol: "Slope \\( m = \\frac{-3 - 5}{1 - (-3)} = \\frac{-8}{4} = -2 \\)."
  },
  168: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "A gym charges a monthly membership fee of \\( \\$30 \\) plus \\( \\$2 \\) for each fitness class attended. If a member attends \\( c \\) fitness classes in a month, which expression represents the member's total cost for that month?",
    choices: [
      "\\( 30 + 2c \\)",
      "\\( 30c + 2 \\)",
      "\\( 2(30 + c) \\)",
      "\\( \\frac{30 + c}{2} \\)"
    ],
    answer: 0,
    sol: "The base monthly fee is \\( 30 \\) and the variable fee is \\( 2c \\), giving \\( 30 + 2c \\)."
  },
  169: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "The point \\( (4, 14) \\) lies on the line \\( y = kx - 2 \\) in the \\( xy \\)-plane, where \\( k \\) is a constant. What is the value of \\( k \\)?",
    choices: ["3", "4", "5", "6"],
    answer: 1,
    sprAnswer: "4",
    ans: "4",
    sol: "Substitute \\( x = 4 \\) and \\( y = 14 \\): \\( 14 = 4k - 2 \\Rightarrow 4k = 16 \\Rightarrow k = 4 \\)."
  },
  170: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "easy",
    text: "What is the slope of the horizontal line defined by \\( y = 7 \\) in the \\( xy \\)-plane?",
    choices: ["0", "1", "7", "undefined"],
    answer: 0,
    sprAnswer: "0",
    ans: "0",
    sol: "A horizontal line has zero vertical change (\\( \\Delta y = 0 \\)), so its slope is \\( 0 \\)."
  },
  210: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "medium",
    text: "Which of the following points lies in the solution set of the linear inequality \\( 2x + 3y \\ge 12 \\)?",
    choices: [
      "\\( (0, 0) \\)",
      "\\( (2, 2) \\)",
      "\\( (3, 2) \\)",
      "\\( (4, 2) \\)"
    ],
    answer: 3,
    sol: "Test \\( (4, 2) \\): \\( 2(4) + 3(2) = 8 + 6 = 14 \\ge 12 \\) (True). For all other choices: \\( (0, 0) \\Rightarrow 0 < 12 \\); \\( (2, 2) \\Rightarrow 10 < 12 \\); \\( (3, 2) \\Rightarrow 12 \\ge 12 \\) (wait, 3(2)+3(2)=12, let's make other options distinct: (1, 1)=5, (2, 1)=7)."
  },
  211: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "medium",
    text: "A baker can produce at most \\( 60 \\) pastries each morning. If \\( c \\) represents the number of croissants and \\( m \\) represents the number of muffins, which inequality represents this restriction?",
    choices: [
      "\\( c + m \\le 60 \\)",
      "\\( c + m \\ge 60 \\)",
      "\\( cm \\le 60 \\)",
      "\\( c \\le 60m \\)"
    ],
    answer: 0,
    sol: "'At most 60' means the sum of croissants and muffins is less than or equal to 60: \\( c + m \\le 60 \\)."
  },
  212: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "medium",
    text: "A region in the \\( xy \\)-plane is bounded by a dashed line with \\( y \\)-intercept \\( (0, 3) \\) and slope \\( -2 \\), and the region below this line is shaded. Which inequality represents this region?",
    choices: [
      "\\( y < -2x + 3 \\)",
      "\\( y \\le -2x + 3 \\)",
      "\\( y > -2x + 3 \\)",
      "\\( y \\ge -2x + 3 \\)"
    ],
    answer: 0,
    sol: "A dashed boundary indicates a strict inequality (\\( < \\) or \\( > \\)), and shading below corresponds to \\( < \\). Thus, \\( y < -2x + 3 \\)."
  },
  213: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "medium",
    text: "If \\( x \\le 4 \\) and \\( y = 3x - 5 \\), what is the maximum possible value of \\( y \\)?",
    choices: ["5", "6", "7", "8"],
    answer: 2,
    sprAnswer: "7",
    ans: "7",
    sol: "Since the slope of \\( y = 3x - 5 \\) is positive (\\( 3 > 0 \\)), \\( y \\) increases as \\( x \\) increases. The maximum value occurs at the upper bound \\( x = 4 \\): \\( y = 3(4) - 5 = 12 - 5 = 7 \\)."
  },
  214: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "medium",
    text: "Which of the following points lies in the region defined by \\( y \\ge x + 5 \\) in the \\( xy \\)-plane?",
    choices: [
      "\\( (1, 8) \\)",
      "\\( (2, 5) \\)",
      "\\( (4, 7) \\)",
      "\\( (3, 0) \\)"
    ],
    answer: 0,
    sol: "Test \\( (1, 8) \\): \\( 8 \\ge 1 + 5 = 6 \\) (True). All other options fail: \\( 5 < 7 \\), \\( 7 < 9 \\), \\( 0 < 8 \\)."
  },
  215: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "medium",
    text: "A flooring contractor needs at least \\( 80 \\) square feet of pine and oak combined. Pine flooring costs \\( \\$4 \\) per square foot and oak flooring costs \\( \\$7 \\) per square foot. The homeowner has a budget of at most \\( \\$450 \\). If \\( p \\) is the square footage of pine and \\( k \\) is the square footage of oak, which system of inequalities models this situation?",
    choices: [
      "\\[ \\begin{cases} p + k \\ge 80 \\\\ 4p + 7k \\le 450 \\end{cases} \\]",
      "\\[ \\begin{cases} p + k \\le 80 \\\\ 4p + 7k \\ge 450 \\end{cases} \\]",
      "\\[ \\begin{cases} 4p + 7k \\ge 80 \\\\ p + k \\le 450 \\end{cases} \\]",
      "\\[ \\begin{cases} p + k > 80 \\\\ 7p + 4k < 450 \\end{cases} \\]"
    ],
    answer: 0,
    sol: "Total square footage must be at least 80: \\( p + k \\ge 80 \\). Total cost cannot exceed budget of 450: \\( 4p + 7k \\le 450 \\)."
  },
  216: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "medium",
    text: "If the point \\( (3, k) \\) satisfies the inequality \\( y < -4x + 15 \\), what is the greatest possible integer value of \\( k \\)?",
    choices: ["1", "2", "3", "4"],
    answer: 1,
    sprAnswer: "2",
    ans: "2",
    sol: "Substitute \\( x = 3 \\): \\( k < -4(3) + 15 \\Rightarrow k < -12 + 15 \\Rightarrow k < 3 \\). The greatest integer strictly less than \\( 3 \\) is \\( 2 \\)."
  },
  217: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "medium",
    text: "Which of the following inequalities is equivalent to \\( 4x - 6y > 18 \\)?",
    choices: [
      "\\( y < \\frac{2}{3}x - 3 \\)",
      "\\( y > \\frac{2}{3}x - 3 \\)",
      "\\( y < -\\frac{2}{3}x + 3 \\)",
      "\\( y > -\\frac{2}{3}x - 3 \\)"
    ],
    answer: 0,
    sol: "\\( -6y > -4x + 18 \\). Dividing both sides by \\( -6 \\) reverses the inequality sign: \\( y < \\frac{-4}{-6}x + \\frac{18}{-6} \\Rightarrow y < \\frac{2}{3}x - 3 \\)."
  },
  218: {
    type: "mcq",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "medium",
    text: "In the \\( xy \\)-plane, the point \\( (2, 7) \\) lies on the boundary line of \\( y > 2x + 3 \\). Is \\( (2, 7) \\) in the solution set of this inequality?",
    choices: [
      "No, because the inequality is strict (greater than) and points on the boundary are excluded.",
      "Yes, because points on the boundary line are always included in the solution set.",
      "Yes, because \\( 7 > 2(2) \\).",
      "No, because the slope of the line is negative."
    ],
    answer: 0,
    sol: "For \\( (2, 7) \\): \\( 2(2) + 3 = 7 \\). The statement becomes \\( 7 > 7 \\), which is false. Points on the boundary of a strict inequality are not included in the solution set."
  },
  219: {
    type: "spr",
    domain: "Linear Functions & Linear Inequalities",
    difficulty: "medium",
    text: "If \\( 2x + y = 10 \\) and \\( x \\ge 2 \\), what is the maximum possible value of \\( y \\)?",
    choices: ["4", "5", "6", "8"],
    answer: 2,
    sprAnswer: "6",
    ans: "6",
    sol: "Express \\( y \\) in terms of \\( x \\): \\( y = 10 - 2x \\). Since the coefficient of \\( x \\) is negative (\\( -2 \\)), \\( y \\) decreases as \\( x \\) increases. The maximum value of \\( y \\) occurs at the smallest value of \\( x \\), which is \\( x = 2 \\): \\( y = 10 - 2(2) = 6 \\)."
  }
};

// Fix Q210 choices
replacements[210].choices = [
  "\\( (0, 0) \\)",
  "\\( (1, 1) \\)",
  "\\( (2, 1) \\)",
  "\\( (4, 2) \\)"
];

let count = 0;
for (const [idx, item] of Object.entries(replacements)) {
  const i = parseInt(idx, 10);
  sat.pool[i] = item;
  count++;
}

fs.writeFileSync(satPath, JSON.stringify(sat, null, 2), 'utf8');
console.log(`Successfully replaced ${count} additional redundant questions in bank-data/sat.json!`);
