#!/usr/bin/env node
/**
 * scripts/patch_igcse_duplicates.js
 * 
 * Permanently eliminates all 93 duplicate items in bank-data/igcse.json
 * by replacing them with 93 authentic, high-quality, syllabus-aligned Cambridge IGCSE 0580 questions:
 * - Geometry: 18 questions
 * - Mensuration: 20 questions
 * - Number: 6 questions
 * - Probability & Statistics: 10 questions
 * - Sets & Venn Diagrams: 22 questions
 * - Trigonometry: 17 questions
 */

'use strict';

const fs = require('fs');
const path = require('path');

const BANK_PATH = path.join(__dirname, '..', 'bank-data', 'igcse.json');
const norm = (s) => String(s == null ? '' : s).replace(/\\[()[\]]/g, '').replace(/\s+/g, ' ').trim();

function makeQ(domain, difficulty, text, choices, ansIdx, sol, fig) {
  const cleanChoices = choices.map(c => String(c).trim());
  const qObj = {
    type: 'mcq',
    domain,
    difficulty,
    q: text,
    text,
    choices: cleanChoices,
    answer: ansIdx,
    ans: cleanChoices[ansIdx],
    sol
  };
  if (fig) qObj.fig = fig;
  return qObj;
}

// ── 1. Geometry (18 questions) ───────────────────────────────────────────
const geometryNew = [
  makeQ('Geometry', 'easy',
    'In a regular polygon, the sum of all interior angles is 1440°. How many sides does this polygon have?',
    ['10', '8', '12', '9'], 0,
    'Sum of interior angles = \\( (n - 2) \\times 180^\\circ = 1440^\\circ \\implies n - 2 = 8 \\implies n = 10 \\). [M1 A1]'
  ),
  makeQ('Geometry', 'easy',
    'In a regular polygon, each exterior angle is 24°. How many sides does the polygon have?',
    ['15', '12', '16', '18'], 0,
    'Number of sides = \\( \\frac{360^\\circ}{\\text{exterior angle}} = \\frac{360^\\circ}{24^\\circ} = 15 \\). [M1 A1]'
  ),
  makeQ('Geometry', 'easy',
    'The interior angle of a regular polygon is 160°. How many sides does the polygon have?',
    ['18', '16', '20', '15'], 0,
    'Exterior angle = \\( 180^\\circ - 160^\\circ = 20^\\circ \\). Number of sides = \\( \\frac{360^\\circ}{20^\\circ} = 18 \\). [M1 A1]'
  ),
  makeQ('Geometry', 'easy',
    'Two parallel lines are intersected by a transversal. One of the co-interior angles is 68°. What is the other co-interior angle?',
    ['112°', '68°', '122°', '90°'], 0,
    'Co-interior angles sum to \\( 180^\\circ \\): \\( 180^\\circ - 68^\\circ = 112^\\circ \\). [B1]'
  ),
  makeQ('Geometry', 'easy',
    'Triangle ABC is inscribed in a circle such that AB is a diameter. If angle BAC = 34°, find the size of angle ABC.',
    ['56°', '34°', '66°', '46°'], 0,
    'Angle in a semicircle is \\( 90^\\circ \\) (\\( \\angle ACB = 90^\\circ \\)). \\( \\angle ABC = 180^\\circ - 90^\\circ - 34^\\circ = 56^\\circ \\). [M1 A1]'
  ),
  makeQ('Geometry', 'easy',
    'In a circle, chords AB and CD intersect at point P. If angle ACD = 28°, what is the size of angle ABD?',
    ['28°', '62°', '56°', '152°'], 0,
    'Angles in the same segment subtended by the same arc are equal: \\( \\angle ABD = \\angle ACD = 28^\\circ \\). [B1]'
  ),
  makeQ('Geometry', 'medium',
    'Two tangents TP and TQ are drawn from an external point T to a circle with centre O. If angle PTQ = 46°, find angle POQ.',
    ['134°', '46°', '144°', '90°'], 0,
    'Tangents are perpendicular to radii (\\( \\angle OPT = \\angle OQT = 90^\\circ \\)). In quadrilateral OPTQ, opposite angles sum to \\( 180^\\circ \\): \\( \\angle POQ = 180^\\circ - 46^\\circ = 134^\\circ \\). [M1 A1]'
  ),
  makeQ('Geometry', 'medium',
    'Two tangents TP and TQ are drawn from an external point T to a circle with centre O. If angle PTQ = 50°, find angle TPQ.',
    ['65°', '50°', '75°', '55°'], 0,
    'Tangent lengths from a common external point are equal (\\( TP = TQ \\)). Triangle TPQ is isosceles with vertex angle 50°: \\( \\angle TPQ = \\frac{180^\\circ - 50^\\circ}{2} = 65^\\circ \\). [M1 A1]'
  ),
  makeQ('Geometry', 'medium',
    'A chord of length 24 cm is at a distance of 5 cm from the centre of a circle. What is the radius of the circle?',
    ['13 cm', '12 cm', '14 cm', '15 cm'], 0,
    'The perpendicular from the centre bisects the chord: half length = 12 cm. Radius = \\( \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13 \\text{ cm} \\). [M1 A1]'
  ),
  makeQ('Geometry', 'medium',
    'A circle has radius 17 cm. A chord has length 30 cm. What is the perpendicular distance from the centre of the circle to the chord?',
    ['8 cm', '7 cm', '9 cm', '10 cm'], 0,
    'Half chord = 15 cm. Distance = \\( \\sqrt{17^2 - 15^2} = \\sqrt{289 - 225} = \\sqrt{64} = 8 \\text{ cm} \\). [M1 A1]'
  ),
  makeQ('Geometry', 'easy',
    'In cyclic quadrilateral PQRS, angle PQR = 104°. What is the size of the opposite angle PSR?',
    ['76°', '104°', '86°', '90°'], 0,
    'Opposite angles of a cyclic quadrilateral sum to \\( 180^\\circ \\): \\( \\angle PSR = 180^\\circ - 104^\\circ = 76^\\circ \\). [B1]'
  ),
  makeQ('Geometry', 'medium',
    'Points A, B, and C lie on a circle. Angle ABC = 47°. What is the reflex angle AOC subtended at centre O?',
    ['266°', '94°', '188°', '274°'], 0,
    'Obtuse angle at centre = \\( 2 \\times 47^\\circ = 94^\\circ \\). Reflex angle AOC = \\( 360^\\circ - 94^\\circ = 266^\\circ \\). [M1 A1]'
  ),
  makeQ('Geometry', 'medium',
    'A tangent TA touches a circle at A. Chord AB makes an angle of 38° with TA. Point C lies on the major arc AB. What is angle ACB?',
    ['38°', '142°', '76°', '52°'], 0,
    'By the alternate segment theorem, the angle between the tangent and the chord equals the angle subtended in the alternate segment: \\( \\angle ACB = 38^\\circ \\). [B1]'
  ),
  makeQ('Geometry', 'medium',
    'Two similar triangles have areas in the ratio 16 : 49. What is the ratio of their corresponding perimeters?',
    ['4 : 7', '16 : 49', '2 : 3.5', '256 : 2401'], 0,
    'Ratio of perimeters (linear ratio) = \\( \\sqrt{\\frac{16}{49}} = \\frac{4}{7} \\), so 4 : 7. [M1 A1]'
  ),
  makeQ('Geometry', 'medium',
    'Triangle DEF is an enlargement of triangle ABC with scale factor 2.5. If the area of triangle ABC is 12 cm², what is the area of triangle DEF?',
    ['75 cm²', '30 cm²', '60 cm²', '150 cm²'], 0,
    'Area scale factor = \\( k^2 = 2.5^2 = 6.25 \\). Area of DEF = \\( 12 \\times 6.25 = 75 \\text{ cm}^2 \\). [M1 A1]'
  ),
  makeQ('Geometry', 'easy',
    'An exterior angle of an isosceles triangle is 110°. If the two non-adjacent opposite angles are equal, what is the measure of each of those two angles?',
    ['55°', '70°', '35°', '60°'], 0,
    'Exterior angle equals sum of two opposite interior angles: \\( 2x = 110^\\circ \\implies x = 55^\\circ \\). [M1 A1]'
  ),
  makeQ('Geometry', 'easy',
    'What is the order of rotational symmetry of a regular nonagon (9 sides)?',
    ['9', '18', '3', '1'], 0,
    'A regular polygon with n sides has rotational symmetry of order n: here order = 9. [B1]'
  ),
  makeQ('Geometry', 'medium',
    'A rhombus has diagonals of lengths 10 cm and 24 cm. What is the perimeter of the rhombus?',
    ['52 cm', '48 cm', '68 cm', '34 cm'], 0,
    'Diagonals bisect at right angles: half-diagonals are 5 cm and 12 cm. Side length = \\( \\sqrt{5^2 + 12^2} = 13 \\text{ cm} \\). Perimeter = \\( 4 \\times 13 = 52 \\text{ cm} \\). [M1 A1]'
  )
];

// ── 2. Mensuration (20 questions) ────────────────────────────────────────
const mensurationNew = [
  makeQ('Mensuration', 'easy',
    'Calculate the volume of a sphere with radius 3 cm in terms of \\( \\pi \\).',
    ['\\( 36\\pi \\text{ cm}^3 \\)', '\\( 12\\pi \\text{ cm}^3 \\)', '\\( 108\\pi \\text{ cm}^3 \\)', '\\( 27\\pi \\text{ cm}^3 \\)'], 0,
    'Volume = \\( \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi (3)^3 = \\frac{4}{3}\\pi (27) = 36\\pi \\text{ cm}^3 \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'easy',
    'Calculate the total surface area of a sphere with radius 5 cm in terms of \\( \\pi \\).',
    ['\\( 100\\pi \\text{ cm}^2 \\)', '\\( 25\\pi \\text{ cm}^2 \\)', '\\( 50\\pi \\text{ cm}^2 \\)', '\\( 125\\pi \\text{ cm}^2 \\)'], 0,
    'Surface Area = \\( 4\\pi r^2 = 4\\pi (5)^2 = 100\\pi \\text{ cm}^2 \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'medium',
    'A solid cylinder has radius 4 cm and height 10 cm. Find its total surface area in terms of \\( \\pi \\).',
    ['\\( 112\\pi \\text{ cm}^2 \\)', '\\( 80\\pi \\text{ cm}^2 \\)', '\\( 96\\pi \\text{ cm}^2 \\)', '\\( 160\\pi \\text{ cm}^2 \\)'], 0,
    'Total SA = \\( 2\\pi r h + 2\\pi r^2 = 2\\pi (4)(10) + 2\\pi (16) = 80\\pi + 32\\pi = 112\\pi \\text{ cm}^2 \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'easy',
    'A cylinder has radius 6 cm and height 15 cm. Find its volume in terms of \\( \\pi \\).',
    ['\\( 540\\pi \\text{ cm}^3 \\)', '\\( 90\\pi \\text{ cm}^3 \\)', '\\( 270\\pi \\text{ cm}^3 \\)', '\\( 180\\pi \\text{ cm}^3 \\)'], 0,
    'Volume = \\( \\pi r^2 h = \\pi (6^2)(15) = 540\\pi \\text{ cm}^3 \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'medium',
    'A cone has base diameter 12 cm and vertical height 8 cm. What is its volume in terms of \\( \\pi \\)?',
    ['\\( 96\\pi \\text{ cm}^3 \\)', '\\( 288\\pi \\text{ cm}^3 \\)', '\\( 48\\pi \\text{ cm}^3 \\)', '\\( 192\\pi \\text{ cm}^3 \\)'], 0,
    'Radius = 6 cm. Volume = \\( \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi (36)(8) = 96\\pi \\text{ cm}^3 \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'easy',
    'A right pyramid has a square base of side 6 cm and a vertical height of 10 cm. What is its volume?',
    ['120 cm³', '360 cm³', '60 cm³', '180 cm³'], 0,
    'Base area = \\( 6 \\times 6 = 36 \\text{ cm}^2 \\). Volume = \\( \\frac{1}{3} \\times \\text{Base} \\times h = \\frac{1}{3} \\times 36 \\times 10 = 120 \\text{ cm}^3 \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'easy',
    'A right triangular prism has a cross-section of a right triangle with legs 5 cm and 12 cm. The length of the prism is 20 cm. What is its volume?',
    ['600 cm³', '1200 cm³', '300 cm³', '450 cm³'], 0,
    'Cross-section area = \\( \\frac{1}{2} \\times 5 \\times 12 = 30 \\text{ cm}^2 \\). Volume = \\( 30 \\times 20 = 600 \\text{ cm}^3 \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'easy',
    'A trapezium has parallel sides of length 7 cm and 11 cm, and a perpendicular height of 6 cm. What is its area?',
    ['54 cm²', '108 cm²', '42 cm²', '66 cm²'], 0,
    'Area = \\( \\frac{1}{2}(a + b)h = \\frac{1}{2}(7 + 11)(6) = \\frac{1}{2}(18)(6) = 54 \\text{ cm}^2 \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'easy',
    'A circle has an area of \\( 49\\pi \\text{ cm}^2 \\). What is its circumference in terms of \\( \\pi \\)?',
    ['\\( 14\\pi \\text{ cm} \\)', '\\( 7\\pi \\text{ cm} \\)', '\\( 28\\pi \\text{ cm} \\)', '\\( 21\\pi \\text{ cm} \\)'], 0,
    'Area = \\( \\pi r^2 = 49\\pi \\implies r = 7 \\text{ cm} \\). Circumference = \\( 2\\pi r = 14\\pi \\text{ cm} \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'easy',
    'An arc of a circle of radius 9 cm subtends an angle of 120° at the centre. Find the arc length in terms of \\( \\pi \\).',
    ['\\( 6\\pi \\text{ cm} \\)', '\\( 3\\pi \\text{ cm} \\)', '\\( 9\\pi \\text{ cm} \\)', '\\( 12\\pi \\text{ cm} \\)'], 0,
    'Arc length = \\( \\frac{120}{360} \\times 2\\pi (9) = \\frac{1}{3} \\times 18\\pi = 6\\pi \\text{ cm} \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'easy',
    'Convert \\( 4.5 \\text{ m}^2 \\) into \\( \\text{cm}^2 \\).',
    ['45,000 cm²', '450 cm²', '4,500 cm²', '450,000 cm²'], 0,
    '\\( 1 \\text{ m}^2 = 100 \\times 100 = 10,000 \\text{ cm}^2 \\). \\( 4.5 \\text{ m}^2 = 4.5 \\times 10,000 = 45,000 \\text{ cm}^2 \\). [B1]'
  ),
  makeQ('Mensuration', 'easy',
    'Convert \\( 8000 \\text{ cm}^3 \\) into litres.',
    ['8 litres', '80 litres', '0.8 litres', '800 litres'], 0,
    '\\( 1 \\text{ litre} = 1000 \\text{ cm}^3 \\). \\( 8000 \\text{ cm}^3 = \\frac{8000}{1000} = 8 \\text{ litres} \\). [B1]'
  ),
  makeQ('Mensuration', 'medium',
    'A solid metal cube of side 6 cm is melted down and recast into smaller cubes of side 2 cm. How many smaller cubes are formed?',
    ['27', '9', '18', '36'], 0,
    'Volume ratio = \\( \\left(\\frac{6}{2}\\right)^3 = 3^3 = 27 \\text{ cubes} \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'medium',
    'A copper wire of diameter 2 mm has a total volume of \\( 50\\pi \\text{ cm}^3 \\). What is the length of the wire in metres?',
    ['50 m', '5 m', '500 m', '25 m'], 0,
    'Radius = 1 mm = 0.1 cm. Cross-sectional area = \\( \\pi (0.1)^2 = 0.01\\pi \\text{ cm}^2 \\). Length = \\( \\frac{50\\pi}{0.01\\pi} = 5000 \\text{ cm} = 50 \\text{ m} \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'medium',
    'A hollow cylindrical pipe has inner radius 3 cm, outer radius 5 cm, and length 20 cm. Find the volume of metal in the pipe in terms of \\( \\pi \\).',
    ['\\( 320\\pi \\text{ cm}^3 \\)', '\\( 160\\pi \\text{ cm}^3 \\)', '\\( 640\\pi \\text{ cm}^3 \\)', '\\( 500\\pi \\text{ cm}^3 \\)'], 0,
    'Volume = \\( \\pi (R^2 - r^2)h = \\pi (5^2 - 3^2)(20) = \\pi (16)(20) = 320\\pi \\text{ cm}^3 \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'medium',
    'A solid hemisphere has volume \\( 18\\pi \\text{ cm}^3 \\). What is its radius?',
    ['3 cm', '6 cm', '9 cm', '2 cm'], 0,
    'Volume of hemisphere = \\( \\frac{2}{3}\\pi r^3 = 18\\pi \\implies r^3 = 27 \\implies r = 3 \\text{ cm} \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'medium',
    'A sector of a circle has central angle 40° and area \\( 16\\pi \\text{ cm}^2 \\). Find the radius of the circle.',
    ['12 cm', '6 cm', '8 cm', '16 cm'], 0,
    'Sector area = \\( \\frac{40}{360} \\times \\pi r^2 = 16\\pi \\implies \\frac{1}{9} r^2 = 16 \\implies r^2 = 144 \\implies r = 12 \\text{ cm} \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'medium',
    'The curved surface area of a cylinder with radius 5 cm is \\( 70\\pi \\text{ cm}^2 \\). What is the height of the cylinder?',
    ['7 cm', '14 cm', '5 cm', '10 cm'], 0,
    'Curved SA = \\( 2\\pi r h = 70\\pi \\implies 2\\pi (5)h = 70\\pi \\implies 10h = 70 \\implies h = 7 \\text{ cm} \\). [M1 A1]'
  ),
  makeQ('Mensuration', 'easy',
    'A rectangular swimming pool is 25 m long, 10 m wide, and has a uniform depth of 2 m. How many cubic metres of water does it hold when completely full?',
    ['500 m³', '250 m³', '1000 m³', '750 m³'], 0,
    'Volume = \\( \\text{length} \\times \\text{width} \\times \\text{depth} = 25 \\times 10 \\times 2 = 500 \\text{ m}^3 \\). [B1]'
  ),
  makeQ('Mensuration', 'medium',
    'Two similar solid cylinders have heights in the ratio 2 : 3. If the total surface area of the smaller cylinder is 40 cm², what is the total surface area of the larger cylinder?',
    ['90 cm²', '60 cm²', '80 cm²', '135 cm²'], 0,
    'Area scale factor = \\( \\left(\\frac{3}{2}\\right)^2 = \\frac{9}{4} \\). Larger area = \\( 40 \\times \\frac{9}{4} = 90 \\text{ cm}^2 \\). [M1 A1]'
  )
];

// ── 3. Number (6 questions) ──────────────────────────────────────────────
const numberNew = [
  makeQ('Number', 'easy',
    'Convert the recurring decimal \\( 0.\\dot{7} \\) into a fraction in its simplest form.',
    ['\\( \\frac{7}{9} \\)', '\\( \\frac{7}{10} \\)', '\\( \\frac{77}{100} \\)', '\\( \\frac{7}{11} \\)'], 0,
    'Let \\( x = 0.777\\dots \\implies 10x = 7.777\\dots \\implies 9x = 7 \\implies x = \\frac{7}{9} \\). [B1]'
  ),
  makeQ('Number', 'medium',
    'Convert the recurring decimal \\( 0.\\dot{4}\\dot{5} \\) into a fraction in its simplest form.',
    ['\\( \\frac{5}{11} \\)', '\\( \\frac{45}{100} \\)', '\\( \\frac{9}{20} \\)', '\\( \\frac{4}{9} \\)'], 0,
    'Let \\( x = 0.4545\\dots \\implies 100x = 45.4545\\dots \\implies 99x = 45 \\implies x = \\frac{45}{99} = \\frac{5}{11} \\). [M1 A1]'
  ),
  makeQ('Number', 'easy',
    'Write \\( 0.000348 \\) in standard form.',
    ['\\( 3.48 \\times 10^{-4} \\)', '\\( 3.48 \\times 10^{-3} \\)', '\\( 3.48 \\times 10^{-5} \\)', '\\( 34.8 \\times 10^{-5} \\)'], 0,
    'Move decimal point 4 places to the right: \\( 3.48 \\times 10^{-4} \\). [B1]'
  ),
  makeQ('Number', 'medium',
    'Evaluate \\( (3 \\times 10^5) \\times (4 \\times 10^{-2}) \\) and express your answer in standard form.',
    ['\\( 1.2 \\times 10^4 \\)', '\\( 12 \\times 10^3 \\)', '\\( 1.2 \\times 10^3 \\)', '\\( 1.2 \\times 10^5 \\)'], 0,
    '\\( (3 \\times 4) \\times (10^5 \\times 10^{-2}) = 12 \\times 10^3 = 1.2 \\times 10^4 \\). [M1 A1]'
  ),
  makeQ('Number', 'medium',
    'A car travels a distance of 140 km, correct to the nearest 10 km, in a time of 2.0 hours, correct to the nearest 0.1 hour. What is the LOWER bound of the average speed?',
    ['65.85 km/h', '70.00 km/h', '74.36 km/h', '67.50 km/h'], 0,
    'Lower bound of distance = 135 km. Upper bound of time = 2.05 h. Lower bound of speed = \\( \\frac{135}{2.05} \\approx 65.85 \\text{ km/h} \\). [M1 A1]'
  ),
  makeQ('Number', 'easy',
    'Divide $420 in the ratio 2 : 3 : 5. What is the value of the largest share?',
    ['$210', '$126', '$84', '$250'], 0,
    'Total parts = \\( 2 + 3 + 5 = 10 \\). 1 part = $\\( \\frac{420}{10} \\) = $42. Largest share = \\( 5 \\times 42 = \\) $210. [M1 A1]'
  )
];

// ── 4. Probability & Statistics (10 questions) ───────────────────────────
const statsNew = [
  makeQ('Probability & Statistics', 'easy',
    'Two unbiased 6-sided dice are rolled simultaneously. What is the probability that the sum of the numbers shown is equal to 9?',
    ['\\( \\frac{1}{9} \\)', '\\( \\frac{1}{6} \\)', '\\( \\frac{5}{36} \\)', '\\( \\frac{1}{12} \\)'], 0,
    'Favourable pairs summing to 9: (3,6), (4,5), (5,4), (6,3) = 4 outcomes out of 36. Probability = \\( \\frac{4}{36} = \\frac{1}{9} \\). [M1 A1]'
  ),
  makeQ('Probability & Statistics', 'easy',
    'Events A and B are independent. If \\( P(A) = 0.4 \\) and \\( P(B) = 0.7 \\), find \\( P(A \\cap B) \\).',
    ['0.28', '1.10', '0.30', '0.55'], 0,
    'For independent events, \\( P(A \\cap B) = P(A) \\times P(B) = 0.4 \\times 0.7 = 0.28 \\). [B1]'
  ),
  makeQ('Probability & Statistics', 'easy',
    'Events A and B are mutually exclusive. If \\( P(A) = 0.35 \\) and \\( P(B) = 0.45 \\), find \\( P(A \\cup B) \\).',
    ['0.80', '0.1575', '0.70', '0.10'], 0,
    'For mutually exclusive events, \\( P(A \\cup B) = P(A) + P(B) = 0.35 + 0.45 = 0.80 \\). [B1]'
  ),
  makeQ('Probability & Statistics', 'medium',
    'The probability that it rains on any given day is 0.3. What is the probability that it rains on at least one of the next two days?',
    ['0.51', '0.60', '0.09', '0.49'], 0,
    'P(no rain both days) = \\( 0.7 \\times 0.7 = 0.49 \\). P(at least one rain) = \\( 1 - 0.49 = 0.51 \\). [M1 A1]'
  ),
  makeQ('Probability & Statistics', 'easy',
    'A box contains 4 red balls, 5 green balls, and 3 yellow balls. One ball is chosen at random. What is the probability that it is NOT green?',
    ['\\( \\frac{7}{12} \\)', '\\( \\frac{5}{12} \\)', '\\( \\frac{1}{3} \\)', '\\( \\frac{3}{4} \\)'], 0,
    'Total balls = 12. Non-green balls = 4 + 3 = 7. Probability = \\( \\frac{7}{12} \\). [B1]'
  ),
  makeQ('Probability & Statistics', 'medium',
    'The numbers 3, 5, 7, 8, x, 12 have a mean of 8. What is the value of x?',
    ['13', '11', '14', '9'], 0,
    'Total sum = \\( 6 \\times 8 = 48 \\). Known sum = \\( 3 + 5 + 7 + 8 + 12 = 35 \\). \\( x = 48 - 35 = 13 \\). [M1 A1]'
  ),
  makeQ('Probability & Statistics', 'medium',
    'Find the interquartile range (IQR) of the following set of data: 4, 7, 9, 12, 15, 18, 22.',
    ['11', '7', '18', '14'], 0,
    'Lower quartile \\( Q_1 = 7 \\), Upper quartile \\( Q_3 = 18 \\). \\( \\text{IQR} = Q_3 - Q_1 = 18 - 7 = 11 \\). [M1 A1]'
  ),
  makeQ('Probability & Statistics', 'easy',
    'On a cumulative frequency curve representing marks of 120 students, the median mark corresponds to which cumulative frequency?',
    ['60', '30', '90', '100'], 0,
    'Median corresponds to 50% of total frequency: \\( \\frac{120}{2} = 60 \\). [B1]'
  ),
  makeQ('Probability & Statistics', 'medium',
    'In a test, the mean mark of 15 girls was 72, and the mean mark of 10 boys was 68. What was the combined mean mark of all 25 students?',
    ['70.4', '70.0', '70.8', '69.6'], 0,
    'Total marks = \\( (15 \\times 72) + (10 \\times 68) = 1080 + 680 = 1760 \\). Combined mean = \\( \\frac{1760}{25} = 70.4 \\). [M1 A1]'
  ),
  makeQ('Probability & Statistics', 'easy',
    'A student draws a pie chart to represent favourite sports. If 18 out of 72 students chose Basketball, what is the sector angle representing Basketball?',
    ['90°', '45°', '72°', '120°'], 0,
    'Angle = \\( \\frac{18}{72} \\times 360^\\circ = \\frac{1}{4} \\times 360^\\circ = 90^\\circ \\). [M1 A1]'
  )
];

// ── 5. Sets & Venn Diagrams (22 questions) ───────────────────────────────
const setsNew = [
  makeQ('Sets & Venn Diagrams', 'easy',
    'Universal set \\( \\mathscr{E} = \\{x : x \\in \\mathbb{Z}^+, 1 \\le x \\le 20\\} \\). Set \\( P = \\{x : x \\text{ is a prime number}\\} \\). What is \\( n(P) \\)?',
    ['8', '7', '9', '10'], 0,
    'Primes up to 20 are \\( \\{2, 3, 5, 7, 11, 13, 17, 19\\} \\), so \\( n(P) = 8 \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'Universal set \\( \\mathscr{E} = \\{x : x \\in \\mathbb{Z}^+, 1 \\le x \\le 30\\} \\). Set \\( S = \\{x : x \\text{ is a square number}\\} \\). What is \\( n(S) \\)?',
    ['5', '6', '4', '7'], 0,
    'Square numbers up to 30 are \\( \\{1, 4, 9, 16, 25\\} \\), so \\( n(S) = 5 \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'If set \\( A = \\{1, 2, 3\\} \\) and set \\( B = \\{2, 3, 4, 5\\} \\), find \\( A \\cup B \\).',
    ['\\( \\{1, 2, 3, 4, 5\\} \\)', '\\( \\{2, 3\\} \\)', '\\( \\{1, 4, 5\\} \\)', '\\( \\{1, 2, 3, 2, 3, 4, 5\\} \\)'], 0,
    'Union includes all distinct elements in either set: \\( \\{1, 2, 3, 4, 5\\} \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'If set \\( A = \\{a, b, c, d\\} \\) and set \\( B = \\{c, d, e, f\\} \\), find \\( A \\cap B \\).',
    ['\\( \\{c, d\\} \\)', '\\( \\{a, b, e, f\\} \\)', '\\( \\{a, b, c, d, e, f\\} \\)', '\\( \\emptyset \\)'], 0,
    'Intersection includes only common elements: \\( \\{c, d\\} \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'Which symbol correctly completes the statement: "If every element of set A is also in set B, then A ... B"?',
    ['\\( \\subseteq \\)', '\\( \\in \\)', '\\( \\cup \\)', '\\( \\cap \\)'], 0,
    'The subset symbol is \\( \\subseteq \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'What does the symbol \\( \\emptyset \\) represent in set notation?',
    ['The empty set (null set)', 'The universal set', 'The complement of a set', 'A singleton set'], 0,
    '\\( \\emptyset \\) denotes the empty set with zero elements. [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'medium',
    'In a class of 30 students, 18 play football and 14 play tennis. 5 students play neither sport. How many play BOTH football and tennis?',
    ['7', '5', '9', '8'], 0,
    'Number playing at least one = 30 - 5 = 25. \\( n(F \\cap T) = 18 + 14 - 25 = 7 \\). [M1 A1]'
  ),
  makeQ('Sets & Venn Diagrams', 'medium',
    'In a group of 50 people, 28 like tea, 24 like coffee, and 8 like both. How many like NEITHER tea nor coffee?',
    ['6', '8', '14', '12'], 0,
    'Union = 28 + 24 - 8 = 44. Neither = 50 - 44 = 6. [M1 A1]'
  ),
  makeQ('Sets & Venn Diagrams', 'medium',
    'Given \\( n(\\mathscr{E}) = 45 \\), \\( n(A) = 22 \\), \\( n(B) = 19 \\), and \\( n(A \\cup B) = 33 \\). Find \\( n(A \\cap B) \\).',
    ['8', '12', '10', '6'], 0,
    '\\( n(A \\cap B) = n(A) + n(B) - n(A \\cup B) = 22 + 19 - 33 = 8 \\). [M1 A1]'
  ),
  makeQ('Sets & Venn Diagrams', 'medium',
    'Given \\( n(\\mathscr{E}) = 50 \\), \\( n(A) = 25 \\), and \\( n(A \\cup B) = 40 \\). If \\( A \\) and \\( B \\) are mutually disjoint (\\( A \\cap B = \\emptyset \\)), find \\( n(B) \\).',
    ['15', '25', '10', '20'], 0,
    'For disjoint sets, \\( n(A \\cup B) = n(A) + n(B) \\implies 40 = 25 + n(B) \\implies n(B) = 15 \\). [M1 A1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'If set \\( A \\) has 12 elements, how many subsets of \\( A \\) contain exactly 1 element?',
    ['12', '24', '144', '1'], 0,
    'Each element forms exactly one singleton subset: total = 12. [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'Which set notation describes the region containing elements that belong to set A but DO NOT belong to set B?',
    ['\\( A \\cap B\' \\)', '\\( A\' \\cap B \\)', '\\( (A \\cap B)\' \\)', '\\( A\' \\cup B \\)'], 0,
    'Elements inside A and outside B is \\( A \\cap B\' \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'Which set notation describes the set of elements that belong to NEITHER set A nor set B?',
    ['\\( (A \\cup B)\' \\)', '\\( A\' \\cup B\' \\)', '\\( A \\cap B \\)', '\\( (A \\cap B)\' \\)'], 0,
    'Complement of the union is \\( (A \\cup B)\' \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'medium',
    'According to De Morgan\'s Laws, which expression is always identical to \\( (A \\cup B)\' \\)?',
    ['\\( A\' \\cap B\' \\)', '\\( A\' \\cup B\' \\)', '\\( A \\cap B\' \\)', '\\( A\' \\setminus B\' \\)'], 0,
    'By De Morgan\'s Law, \\( (A \\cup B)\' = A\' \\cap B\' \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'medium',
    'According to De Morgan\'s Laws, which expression is always identical to \\( (A \\cap B)\' \\)?',
    ['\\( A\' \\cup B\' \\)', '\\( A\' \\cap B\' \\)', '\\( A \\cup B\' \\)', '\\( (A \\cup B)\' \\)'], 0,
    'By De Morgan\'s Law, \\( (A \\cap B)\' = A\' \\cup B\' \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'Universal set \\( \\mathscr{E} = \\{x : x \\in \\mathbb{Z}^+, x \\le 15\\} \\). Set \\( A = \\{x : x \\text{ is a multiple of 3}\\} \\) and \\( B = \\{x : x \\text{ is a multiple of 5}\\} \\). Find \\( A \\cap B \\).',
    ['\\( \\{15\\} \\)', '\\( \\{3, 5, 15\\} \\)', '\\( \\{3, 5, 6, 9, 10, 12, 15\\} \\)', '\\( \\emptyset \\)'], 0,
    'Multiples of both 3 and 5 are multiples of 15: only \\( \\{15\\} \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'If set \\( A = \\{2, 4, 6\\} \\) and set \\( B = \\{1, 3, 5\\} \\), what is \\( A \\cap B \\)?',
    ['\\( \\emptyset \\)', '\\( \\{0\\} \\)', '\\( \\{1, 2, 3, 4, 5, 6\\} \\)', '\\( \\{\\emptyset\\} \\)'], 0,
    'They share no elements, so their intersection is the empty set \\( \\emptyset \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'medium',
    'If \\( A \\subset B \\), which of the following is always equal to \\( A \\cap B \\)?',
    ['\\( A \\)', '\\( B \\)', '\\( \\emptyset \\)', '\\( A\' \\)'], 0,
    'Since all elements of A are inside B, \\( A \\cap B = A \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'medium',
    'If \\( A \\subset B \\), which of the following is always equal to \\( A \\cup B \\)?',
    ['\\( B \\)', '\\( A \\)', '\\( \\mathscr{E} \\)', '\\( A \\cap B \\)'], 0,
    'Since all elements of A are inside B, the union is simply \\( B \\). [B1]'
  ),
  makeQ('Sets & Venn Diagrams', 'medium',
    'Set X has 5 distinct elements. How many PROPER subsets does X have?',
    ['31', '32', '30', '25'], 0,
    'A set with n elements has \\( 2^n - 1 \\) proper subsets: \\( 2^5 - 1 = 32 - 1 = 31 \\). [M1 A1]'
  ),
  makeQ('Sets & Venn Diagrams', 'medium',
    'In a Venn diagram, region \\( A \\cap B \\) has 9 elements, \\( A \\cap B\' \\) has 14, and \\( A\' \\cap B \\) has 11. If \\( n(\\mathscr{E}) = 40 \\), find \\( n((A \\cup B)\') \\).',
    ['6', '4', '8', '10'], 0,
    'Total in union = 14 + 9 + 11 = 34. Elements outside = 40 - 34 = 6. [M1 A1]'
  ),
  makeQ('Sets & Venn Diagrams', 'easy',
    'Universal set \\( \\mathscr{E} = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\} \\). Set \\( A = \\{x : x \\text{ is even}\\} \\). What is \\( A\' \\)?',
    ['\\( \\{1, 3, 5, 7, 9\\} \\)', '\\( \\{2, 4, 6, 8, 10\\} \\)', '\\( \\{1, 3, 5, 7\\} \\)', '\\( \\{3, 5, 7, 9\\} \\)'], 0,
    'The complement \\( A\' \\) contains the odd numbers: \\( \\{1, 3, 5, 7, 9\\} \\). [B1]'
  )
];

// ── 6. Trigonometry (17 questions) ───────────────────────────────────────
const trigNew = [
  makeQ('Trigonometry', 'easy',
    'In right-angled triangle ABC, angle B = 90°, AB = 8 cm, and BC = 15 cm. Find the value of \\( \\sin A \\).',
    ['\\( \\frac{15}{17} \\)', '\\( \\frac{8}{17} \\)', '\\( \\frac{15}{8} \\)', '\\( \\frac{8}{15} \\)'], 0,
    'Hypotenuse \\( AC = \\sqrt{8^2 + 15^2} = 17 \\text{ cm} \\). \\( \\sin A = \\frac{\\text{opposite}}{\\text{hypotenuse}} = \\frac{15}{17} \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'easy',
    'In right-angled triangle PQR, angle Q = 90°, PQ = 5 cm, and QR = 12 cm. Find the value of \\( \\cos P \\).',
    ['\\( \\frac{5}{13} \\)', '\\( \\frac{12}{13} \\)', '\\( \\frac{5}{12} \\)', '\\( \\frac{12}{5} \\)'], 0,
    'Hypotenuse \\( PR = \\sqrt{5^2 + 12^2} = 13 \\text{ cm} \\). \\( \\cos P = \\frac{\\text{adjacent}}{\\text{hypotenuse}} = \\frac{5}{13} \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'easy',
    'In right-angled triangle XYZ, angle Y = 90°, angle X = 30°, and hypotenuse XZ = 18 cm. What is the length of side YZ?',
    ['9 cm', '18 cm', '\\( 9\\sqrt{3} \\text{ cm} \\)', '4.5 cm'], 0,
    'Side opposite 30° is half the hypotenuse: \\( YZ = 18 \\times \\sin 30^\\circ = 18 \\times 0.5 = 9 \\text{ cm} \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'easy',
    'What is the exact value of \\( \\tan 45^\\circ \\)?',
    ['1', '\\( \\frac{1}{\\sqrt{2}} \\)', '\\( \\sqrt{3} \\)', '\\( \\frac{1}{2} \\)'], 0,
    'In an isosceles right-angled triangle, opposite = adjacent, so \\( \\tan 45^\\circ = 1 \\). [B1]'
  ),
  makeQ('Trigonometry', 'easy',
    'What is the exact value of \\( \\cos 60^\\circ \\)?',
    ['0.5', '\\( \\frac{\\sqrt{3}}{2} \\)', '1', '\\( \\frac{1}{\\sqrt{2}} \\)'], 0,
    'From the standard 30-60-90 triangle, \\( \\cos 60^\\circ = \\frac{1}{2} = 0.5 \\). [B1]'
  ),
  makeQ('Trigonometry', 'medium',
    'From the top of a vertical cliff 40 m high, the angle of depression of a boat out at sea is 25°. How far is the boat from the base of the cliff (to 1 decimal place)?',
    ['85.8 m', '95.2 m', '18.7 m', '44.1 m'], 0,
    '\\( \\tan 25^\\circ = \\frac{40}{d} \\implies d = \\frac{40}{\\tan 25^\\circ} \\approx 85.8 \\text{ m} \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'medium',
    'A vertical flagpole casts a shadow 12 m long on horizontal ground when the angle of elevation of the sun is 35°. Calculate the height of the flagpole (to 1 decimal place).',
    ['8.4 m', '17.1 m', '14.6 m', '6.9 m'], 0,
    '\\( h = 12 \\times \\tan 35^\\circ \\approx 12 \\times 0.7002 \\approx 8.4 \\text{ m} \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'medium',
    'In triangle ABC, side a = 7 cm, side b = 9 cm, and angle C = 40°. Calculate the area of triangle ABC to 1 decimal place.',
    ['20.2 cm²', '40.5 cm²', '31.5 cm²', '24.1 cm²'], 0,
    'Area = \\( \\frac{1}{2}ab\\sin C = \\frac{1}{2}(7)(9)\\sin 40^\\circ \\approx 31.5 \\times 0.6428 \\approx 20.2 \\text{ cm}^2 \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'medium',
    'In triangle ABC, side b = 10 cm, angle B = 45°, and angle C = 60°. Calculate the length of side c to 1 decimal place.',
    ['12.2 cm', '8.2 cm', '14.1 cm', '10.5 cm'], 0,
    'By the sine rule: \\( \\frac{c}{\\sin 60^\\circ} = \\frac{10}{\\sin 45^\\circ} \\implies c = \\frac{10 \\sin 60^\\circ}{\\sin 45^\\circ} \\approx 12.2 \\text{ cm} \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'hard',
    'In triangle PQR, side p = 5 cm, side q = 7 cm, and side r = 8 cm. Calculate angle R (to 1 decimal place).',
    ['81.8°', '60.0°', '75.5°', '98.2°'], 0,
    'Cosine rule: \\( \\cos R = \\frac{5^2 + 7^2 - 8^2}{2(5)(7)} = \\frac{25 + 49 - 64}{70} = \\frac{10}{70} = \\frac{1}{7} \\implies R \\approx 81.8^\\circ \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'hard',
    'In triangle ABC, side a = 6 cm, side b = 10 cm, and side c = 14 cm. Find angle C.',
    ['120°', '60°', '150°', '135°'], 0,
    'Cosine rule: \\( \\cos C = \\frac{6^2 + 10^2 - 14^2}{2(6)(10)} = \\frac{36 + 100 - 196}{120} = \\frac{-60}{120} = -0.5 \\implies C = 120^\\circ \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'medium',
    'A ship sails 15 km on a bearing of 060° and then 20 km on a bearing of 150°. How far is the ship from its starting point?',
    ['25 km', '35 km', '22.5 km', '30 km'], 0,
    'The turn creates a right angle: \\( 180^\\circ - (150^\\circ - 60^\\circ) = 90^\\circ \\). Distance = \\( \\sqrt{15^2 + 20^2} = \\sqrt{625} = 25 \\text{ km} \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'easy',
    'A lighthouse L is on a bearing of 085° from a port P. What is the bearing of port P from lighthouse L?',
    ['265°', '095°', '175°', '275°'], 0,
    'Back-bearing differs by 180°: \\( 85^\\circ + 180^\\circ = 265^\\circ \\). [B1]'
  ),
  makeQ('Trigonometry', 'easy',
    'A point B is on a bearing of 310° from point A. What is the bearing of point A from point B?',
    ['130°', '050°', '220°', '140°'], 0,
    'Back-bearing differs by 180°: \\( 310^\\circ - 180^\\circ = 130^\\circ \\). [B1]'
  ),
  makeQ('Trigonometry', 'medium',
    'In a cuboid with dimensions 4 cm by 3 cm by 12 cm, what is the length of the space diagonal?',
    ['13 cm', '19 cm', '15 cm', '14 cm'], 0,
    'Diagonal = \\( \\sqrt{4^2 + 3^2 + 12^2} = \\sqrt{16 + 9 + 144} = \\sqrt{169} = 13 \\text{ cm} \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'hard',
    'In a cuboid with a square base of 8 cm by 8 cm and height 10 cm, calculate the angle that the space diagonal makes with the base (to 1 decimal place).',
    ['41.4°', '51.3°', '36.9°', '45.0°'], 0,
    'Base diagonal = \\( \\sqrt{8^2 + 8^2} = \\sqrt{128} \\approx 11.31 \\text{ cm} \\). \\( \\tan \\theta = \\frac{10}{\\sqrt{128}} \\approx 0.8839 \\implies \\theta \\approx 41.4^\\circ \\). [M1 A1]'
  ),
  makeQ('Trigonometry', 'hard',
    'Given that \\( \\sin x = 0.6 \\) where \\( 90^\\circ < x < 180^\\circ \\) (obtuse angle), find the value of \\( \\cos x \\).',
    ['-0.8', '0.8', '-0.6', '-0.4'], 0,
    'In the second quadrant, cosine is negative: \\( \\cos x = -\\sqrt{1 - 0.6^2} = -\\sqrt{0.64} = -0.8 \\). [M1 A1]'
  )
];

const newQuestionsByDomain = {
  'Geometry': geometryNew,
  'Mensuration': mensurationNew,
  'Number': numberNew,
  'Probability & Statistics': statsNew,
  'Sets & Venn Diagrams': setsNew,
  'Trigonometry': trigNew
};

function main() {
  const bankData = JSON.parse(fs.readFileSync(BANK_PATH, 'utf8'));
  const pool = bankData.pool || [];

  // Group existing unique items by domain
  const byDom = {};
  const globalSeen = new Set();

  pool.forEach(q => {
    const d = q.domain;
    if (!byDom[d]) byDom[d] = [];
    const k = norm(q.text ?? q.q) + '||' + (q.choices || []).map(norm).join('|');
    if (!globalSeen.has(k)) {
      globalSeen.add(k);
      byDom[d].push(q);
    }
  });

  const finalPool = [];

  for (const dom of Object.keys(byDom).sort()) {
    const existing = byDom[dom];
    const needed = 150 - existing.length;
    console.log(`[${dom.padEnd(28)}] Existing unique: ${existing.length}, Needed: ${needed}`);

    if (needed > 0) {
      const candidates = newQuestionsByDomain[dom] || [];
      let added = 0;
      for (const q of candidates) {
        const k = norm(q.text ?? q.q) + '||' + (q.choices || []).map(norm).join('|');
        if (!globalSeen.has(k)) {
          globalSeen.add(k);
          existing.push(q);
          added++;
          if (existing.length === 150) break;
        }
      }
      console.log(`  -> Added ${added} new unique items to ${dom}. Current total: ${existing.length}`);
    }

    if (existing.length !== 150) {
      throw new Error(`Domain ${dom} has ${existing.length} items (expected 150)!`);
    }

    finalPool.push(...existing);
  }

  // Final sanity check
  const dupCheck = new Map();
  finalPool.forEach((q, idx) => {
    const k = norm(q.text ?? q.q) + '||' + (q.choices || []).map(norm).join('|');
    if (dupCheck.has(k)) {
      throw new Error(`Duplicate detected at item ${idx} with item ${dupCheck.get(k)}: ${k}`);
    }
    dupCheck.set(k, idx);
  });

  bankData.pool = finalPool;
  fs.writeFileSync(BANK_PATH, JSON.stringify(bankData, null, 2) + '\n', 'utf8');
  console.log(`\n🎉 SUCCESS: bank-data/igcse.json updated with ${finalPool.length} 100% UNIQUE questions!`);
}

main();
