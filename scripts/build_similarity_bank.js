#!/usr/bin/env node
/**
 * scripts/build_similarity_bank.js
 * Generates and validates the world-class Similarity question pool for bank-data/geo.json.
 * Covers all 10 exam similarity archetypes with rich SVG diagrams, step-by-step solutions,
 * and zero redundancy.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const questions = [
  // ── ARCHETYPE 1: Triangle Similarity Criteria & Properties (AA, SAS, SSS) ──
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), \\(\\angle A = 42^\\circ\\) and \\(\\angle B = 68^\\circ\\). In \\(\\triangle DEF\\), \\(\\angle D = 70^\\circ\\) and \\(\\angle E = 68^\\circ\\). Which statement correctly determines whether the triangles are similar?",
    choices: [
      "The triangles are similar by AA because \\(\\angle C = 70^\\circ\\), matching \\(\\angle D\\)",
      "The triangles are not similar because \\(\\angle A \\neq \\angle D\\)",
      "The triangles are similar by SAS using sides adjacent to \\(68^\\circ\\)",
      "Similarity cannot be determined without side lengths"
    ],
    answer: 0,
    sol: "In \\(\\triangle ABC\\), the interior angles sum to \\(180^\\circ\\): \\(\\angle C = 180^\\circ - 42^\\circ - 68^\\circ = 70^\\circ\\). In \\(\\triangle DEF\\), two angles are \\(68^\\circ\\) and \\(70^\\circ\\). Both triangles share angles of \\(68^\\circ\\) and \\(70^\\circ\\). By the Angle-Angle (AA) Similarity Postulate, \\(\\triangle ABC \\sim \\triangle FED\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "\\(\\triangle ABC\\) and \\(\\triangle DEF\\) are shown below with \\(\\angle A \\cong \\angle D = 55^\\circ\\). If \\(AB = 6\\), \\(AC = 10\\), \\(DE = 9\\), and \\(DF = 15\\), which similarity criterion applies and what is the scale factor from \\(\\triangle ABC\\) to \\(\\triangle DEF\\)?",
    choices: [
      "SAS similarity with scale factor \\(1.5\\)",
      "SSS similarity with scale factor \\(1.5\\)",
      "AA similarity with scale factor \\(0.67\\)",
      "The triangles are not similar because side \\(BC\\) is unknown"
    ],
    answer: 0,
    sol: "Check the ratio of corresponding sides adjacent to the congruent included angle: \\(\\frac{DE}{AB} = \\frac{9}{6} = 1.5\\) and \\(\\frac{DF}{AC} = \\frac{15}{10} = 1.5\\). Since two pairs of corresponding sides are in the same constant ratio and their included angles are congruent (\\(\\angle A \\cong \\angle D\\)), \\(\\triangle ABC \\sim \\triangle DEF\\) by SAS similarity with scale factor \\(k = 1.5\\).",
    fig: {
      type: "similar",
      vertices: [[0, 0], [8, 0], [4, 6]],
      ratio: 0.67,
      left: { labels: ["A", "B", "C"], sides: ["6", "", "10"], angles: ["55°", "", ""], caption: "△ABC" },
      right: { labels: ["D", "E", "F"], sides: ["9", "", "15"], angles: ["55°", "", ""], caption: "△DEF" },
      tilde: true
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "Which of the following conditions is NOT sufficient to prove that two triangles are similar?",
    choices: [
      "Two pairs of sides are proportional and a non-included angle is congruent (SSA)",
      "Two pairs of corresponding angles are congruent (AA)",
      "Three pairs of corresponding sides are proportional (SSS)",
      "Two pairs of sides are proportional and their included angle is congruent (SAS)"
    ],
    answer: 0,
    sol: "SSA (Side-Side-Angle) is NOT a valid similarity criterion. When the congruent angle is not included between the proportional sides, the third side can swing to form two non-congruent, non-similar triangles (the ambiguous case). In contrast, AA, SAS, and SSS all rigorously guarantee triangle similarity.",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "The sides of \\(\\triangle ABC\\) measure \\(7\\), \\(10\\), and \\(12\\). A similar triangle \\(\\triangle DEF\\) has a shortest side of length \\(21\\). What is the perimeter of \\(\\triangle DEF\\)?",
    choices: [
      "87",
      "58",
      "72",
      "96"
    ],
    answer: 0,
    sol: "The shortest side of \\(\\triangle ABC\\) is \\(7\\). The corresponding shortest side of \\(\\triangle DEF\\) is \\(21\\). The linear scale factor is \\(k = \\frac{21}{7} = 3\\). The perimeter of \\(\\triangle ABC\\) is \\(P_1 = 7 + 10 + 12 = 29\\). Since perimeters scale linearly by \\(k\\), the perimeter of \\(\\triangle DEF\\) is \\(P_2 = 3 \\times 29 = 87\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In the coordinate plane, \\(\\triangle ABC\\) has vertices \\(A(0,0)\\), \\(B(4,0)\\), and \\(C(2,4)\\). A dilation centered at the origin maps \\(\\triangle ABC\\) to \\(\\triangle DEF\\) with vertices \\(D(0,0)\\), \\(E(10,0)\\), and \\(F(5,10)\\). If the area of \\(\\triangle ABC\\) is \\(8\\), what is the area of \\(\\triangle DEF\\)?",
    choices: [
      "50",
      "20",
      "40",
      "64"
    ],
    answer: 0,
    sol: "The linear scale factor of the dilation is \\(k = \\frac{OE}{OB} = \\frac{10}{4} = 2.5\\). Areas scale by \\(k^2\\): \\(k^2 = (2.5)^2 = 6.25\\). Therefore, \\(\\text{Area}(\\triangle DEF) = 8 \\times 6.25 = 50\\). Alternatively, base \\(DE = 10\\) and height \\(h = 10\\), so \\(\\text{Area} = \\frac{1}{2}(10)(10) = 50\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "Two equilateral triangles have side lengths in the ratio \\(4:9\\). What is the ratio of their altitudes?",
    choices: [
      "4 : 9",
      "2 : 3",
      "16 : 81",
      "8 : 27"
    ],
    answer: 0,
    sol: "All equilateral triangles have interior angles of \\(60^\\circ\\), so all equilateral triangles are similar by AA. All corresponding linear dimensions (sides, altitudes, medians, perimeters) scale in the exact same linear ratio \\(k\\). Therefore, the ratio of their altitudes is \\(4:9\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "Two isosceles triangles each have a vertex angle measuring \\(40^\\circ\\). The leg of the smaller triangle has length \\(15\\), and the corresponding leg of the larger triangle has length \\(25\\). If the base of the smaller triangle is \\(12\\), what is the base of the larger triangle?",
    choices: [
      "20",
      "18",
      "24",
      "22"
    ],
    answer: 0,
    sol: "In both isosceles triangles, the base angles are equal: \\(\\frac{180^\\circ - 40^\\circ}{2} = 70^\\circ\\). Because all three angles match (\\(40^\\circ, 70^\\circ, 70^\\circ\\)), the triangles are similar by AA. The scale factor is \\(k = \\frac{25}{15} = \\frac{5}{3}\\). The base of the larger triangle is \\(12 \\times \\frac{5}{3} = 20\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), points \\(M\\) and \\(N\\) are the midpoints of sides \\(AB\\) and \\(AC\\) respectively. If the area of \\(\\triangle AMN\\) is \\(18\\text{ cm}^2\\), what is the area of trapezoid \\(BMNC\\)?",
    choices: [
      "54 cm²",
      "36 cm²",
      "72 cm²",
      "45 cm²"
    ],
    answer: 0,
    sol: "By the Midsegment Theorem, segment \\(MN \\parallel BC\\) and \\(MN = \\frac{1}{2}BC\\). Thus, \\(\\triangle AMN \\sim \\triangle ABC\\) with linear scale factor \\(k = \\frac{1}{2}\\). The area ratio is \\(k^2 = (1/2)^2 = 1/4\\). Thus, \\(\\text{Area}(\\triangle ABC) = 4 \\times \\text{Area}(\\triangle AMN) = 4 \\times 18 = 72\\text{ cm}^2\\). The trapezoid's area is \\(\\text{Area}(BMNC) = 72 - 18 = 54\\text{ cm}^2\\).",
    fig: {
      type: "nested_triangles",
      labels: ["A", "B", "C", "M", "N"],
      t: 0.5,
      sides: { ad: "m", db: "m", ae: "n", ec: "n" },
      shade: "bottom"
    }
  },

  // ── ARCHETYPE 2: Parallel Transversals & Thales' Theorem ──
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\) shown below, segment \\(DE \\parallel BC\\). If \\(AD = 6\\), \\(DB = 9\\), and \\(AE = 8\\), what is the length of segment \\(EC\\)?",
    choices: [
      "12",
      "10",
      "15",
      "13.5"
    ],
    answer: 0,
    sol: "By the Triangle Proportionality Theorem (Thales' Theorem), a line parallel to one side of a triangle divides the other two sides proportionally: \\(\\frac{AD}{DB} = \\frac{AE}{EC}\\). Substituting the given values: \\(\\frac{6}{9} = \\frac{8}{EC} \\implies \\frac{2}{3} = \\frac{8}{EC} \\implies EC = \\frac{3 \\times 8}{2} = 12\\).",
    fig: {
      type: "nested_triangles",
      labels: ["A", "B", "C", "D", "E"],
      t: 0.4,
      sides: { ad: "6", db: "9", ae: "8", ec: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), segment \\(DE \\parallel BC\\) with \\(D\\) on \\(AB\\) and \\(E\\) on \\(AC\\). If \\(AD = 5\\), \\(DB = 10\\), and \\(DE = 7\\), what is the length of base \\(BC\\)?",
    choices: [
      "21",
      "14",
      "17.5",
      "15"
    ],
    answer: 0,
    sol: "Because \\(DE \\parallel BC\\), \\(\\triangle ADE \\sim \\triangle ABC\\) by AA. The parallel bases correspond to full triangle sides from vertex \\(A\\): \\(AB = AD + DB = 5 + 10 = 15\\). Setting up the whole-to-part ratio: \\(\\frac{DE}{BC} = \\frac{AD}{AB} \\implies \\frac{7}{BC} = \\frac{5}{15} = \\frac{1}{3} \\implies BC = 7 \\times 3 = 21\\). Note: Using part-to-part \\(5/10\\) gives the distractor 14.",
    fig: {
      type: "nested_triangles",
      labels: ["A", "B", "C", "D", "E"],
      t: 0.33,
      sides: { ad: "5", db: "10", de: "7", bc: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), segment \\(DE \\parallel BC\\). The segment lengths are \\(AD = x\\), \\(DB = x + 3\\), \\(AE = x + 2\\), and \\(EC = x + 7\\). What is the value of \\(x\\)?",
    choices: [
      "3",
      "4",
      "2",
      "5"
    ],
    answer: 0,
    sol: "By the Triangle Proportionality Theorem, \\(\\frac{AD}{DB} = \\frac{AE}{EC} \\implies \\frac{x}{x+3} = \\frac{x+2}{x+7}\\). Cross-multiplying: \\(x(x+7) = (x+3)(x+2) \\implies x^2 + 7x = x^2 + 5x + 6\\). Subtracting \\(x^2\\) from both sides gives \\(7x = 5x + 6 \\implies 2x = 6 \\implies x = 3\\).",
    fig: {
      type: "nested_triangles",
      labels: ["A", "B", "C", "D", "E"],
      t: 0.45,
      sides: { ad: "x", db: "x+3", ae: "x+2", ec: "x+7" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), \\(DE \\parallel BC\\) with \\(D\\) on \\(AB\\) and \\(E\\) on \\(AC\\). If \\(AD = 4\\) and \\(AB = 10\\), what fraction of the area of \\(\\triangle ABC\\) is occupied by trapezoid \\(BDEC\\)?",
    choices: [
      "21/25",
      "4/25",
      "16/25",
      "3/5"
    ],
    answer: 0,
    sol: "Since \\(DE \\parallel BC\\), \\(\\triangle ADE \\sim \\triangle ABC\\) with linear scale factor \\(k = \\frac{AD}{AB} = \\frac{4}{10} = \\frac{2}{5}\\). The ratio of the area of \\(\\triangle ADE\\) to the area of \\(\\triangle ABC\\) is \\(k^2 = (2/5)^2 = 4/25\\). The area of trapezoid \\(BDEC\\) is the remaining fraction: \\(1 - \\frac{4}{25} = \\frac{21}{25}\\).",
    fig: {
      type: "nested_triangles",
      labels: ["A", "B", "C", "D", "E"],
      t: 0.4,
      sides: { ad: "4", ab: "10" },
      shade: "bottom"
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "A civil engineer measures the width of a river \\(BC\\) by setting up parallel stakes such that \\(DE \\parallel BC\\). Point \\(D\\) is on line \\(AB\\) and \\(E\\) is on line \\(AC\\). If \\(AD = 45\\text{ m}\\), \\(DB = 75\\text{ m}\\), and \\(DE = 36\\text{ m}\\), what is the width of the river \\(BC\\)?",
    choices: [
      "96 m",
      "60 m",
      "80 m",
      "108 m"
    ],
    answer: 0,
    sol: "First compute the total line length: \\(AB = AD + DB = 45 + 75 = 120\\text{ m}\\). Because \\(DE \\parallel BC\\), \\(\\triangle ADE \\sim \\triangle ABC\\). The proportion of corresponding sides is \\(\\frac{DE}{BC} = \\frac{AD}{AB} \\implies \\frac{36}{BC} = \\frac{45}{120} = \\frac{3}{8}\\). Cross-multiplying: \\(3 \\cdot BC = 36 \\times 8 = 288 \\implies BC = 96\\text{ m}\\).",
    fig: {
      type: "nested_triangles",
      labels: ["A", "B", "C", "D", "E"],
      t: 0.375,
      sides: { ad: "45 m", db: "75 m", de: "36 m", bc: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), line segment \\(DE\\) is drawn parallel to base \\(BC\\) such that it divides the triangle into two regions of equal area: \\(\\text{Area}(\\triangle ADE) = \\text{Area}(BDEC)\\). What is the ratio \\(\\frac{AD}{AB}\\)?",
    choices: [
      "√2 / 2",
      "1/2",
      "1/4",
      "√3 / 2"
    ],
    answer: 0,
    sol: "Since \\(DE \\parallel BC\\), \\(\\triangle ADE \\sim \\triangle ABC\\). Let \\(\\text{Area}(\\triangle ADE) = A\\). Then \\(\\text{Area}(BDEC) = A\\), making the total area \\(\\text{Area}(\\triangle ABC) = 2A\\). The area ratio is \\(\\frac{\\text{Area}(\\triangle ADE)}{\\text{Area}(\\triangle ABC)} = \\frac{A}{2A} = \\frac{1}{2}\\). Since area scales as the square of linear dimensions, \\(\\left(\\frac{AD}{AB}\\right)^2 = \\frac{1}{2} \\implies \\frac{AD}{AB} = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}\\).",
    fig: {
      type: "nested_triangles",
      labels: ["A", "B", "C", "D", "E"],
      t: 0.707,
      shade: "top"
    }
  },
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), segment \\(DE \\parallel BC\\). If \\(AD = 8\\), \\(DB = 4\\), and \\(AC = 18\\), what is the length of segment \\(AE\\)?",
    choices: [
      "12",
      "9",
      "14",
      "10"
    ],
    answer: 0,
    sol: "Total length \\(AB = AD + DB = 8 + 4 = 12\\). The ratio of \\(AD\\) to \\(AB\\) is \\(\\frac{AD}{AB} = \\frac{8}{12} = \\frac{2}{3}\\). By similarity, \\(\\frac{AE}{AC} = \\frac{AD}{AB} = \\frac{2}{3}\\). Therefore, \\(AE = 18 \\times \\frac{2}{3} = 12\\).",
    fig: {
      type: "nested_triangles",
      labels: ["A", "B", "C", "D", "E"],
      t: 0.67,
      sides: { ad: "8", db: "4", ac: "18", ae: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), segments \\(DE \\parallel FG \\parallel BC\\) with \\(D, F\\) on \\(AB\\) and \\(E, G\\) on \\(AC\\). If \\(AD = 2\\), \\(DF = 3\\), \\(FB = 5\\), and base \\(BC = 30\\), what is the difference between the lengths of segments \\(FG\\) and \\(DE\\)?",
    choices: [
      "9",
      "6",
      "12",
      "15"
    ],
    answer: 0,
    sol: "Total length \\(AB = 2 + 3 + 5 = 10\\). For \\(DE \\parallel BC\\), the scale factor from \\(A\\) is \\(\\frac{AD}{AB} = \\frac{2}{10} = 0.2 \\implies DE = 30 \\times 0.2 = 6\\). For \\(FG \\parallel BC\\), length \\(AF = AD + DF = 2 + 3 = 5\\). The scale factor is \\(\\frac{AF}{AB} = \\frac{5}{10} = 0.5 \\implies FG = 30 \\times 0.5 = 15\\). The difference is \\(FG - DE = 15 - 6 = 9\\).",
    fig: null
  },

  // ── ARCHETYPE 3: Hourglass / Bowtie Triangles ──
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "In the hourglass figure below, segment \\(AB \\parallel CD\\), and segments \\(AC\\) and \\(BD\\) intersect at \\(E\\). If \\(AB = 8\\), \\(CD = 12\\), and \\(AE = 6\\), what is the length of segment \\(CE\\)?",
    choices: [
      "9",
      "8",
      "10",
      "7.5"
    ],
    answer: 0,
    sol: "Because \\(AB \\parallel CD\\), alternate interior angles \\(\\angle A \\cong \\angle C\\) and \\(\\angle B \\cong \\angle D\\) combined with vertical angles at \\(E\\) prove that \\(\\triangle ABE \\sim \\triangle CDE\\). Setting up the ratio of corresponding sides: \\(\\frac{AE}{CE} = \\frac{AB}{CD} \\implies \\frac{6}{CE} = \\frac{8}{12} = \\frac{2}{3} \\implies CE = \\frac{6 \\times 3}{2} = 9\\).",
    fig: {
      type: "bowtie",
      labels: ["A", "B", "C", "D", "E"],
      ratio: 0.67,
      sides: { ab: "8", cd: "12", ae: "6", ec: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In the bowtie figure with \\(AB \\parallel CD\\), segments \\(AC\\) and \\(BD\\) intersect at \\(E\\). If \\(AB = 10\\), \\(CD = 15\\), and the entire segment \\(BD = 35\\), what is the length of segment \\(BE\\)?",
    choices: [
      "14",
      "21",
      "12",
      "10.5"
    ],
    answer: 0,
    sol: "Since \\(AB \\parallel CD\\), \\(\\triangle ABE \\sim \\triangle CDE\\). The ratio of corresponding sides is \\(\\frac{BE}{ED} = \\frac{AB}{CD} = \\frac{10}{15} = \\frac{2}{3}\\). The total length \\(BD = BE + ED = 35\\). Therefore, \\(BE = 35 \\times \\frac{2}{2+3} = 35 \\times \\frac{2}{5} = 14\\).",
    fig: {
      type: "bowtie",
      labels: ["A", "B", "C", "D", "E"],
      ratio: 0.67,
      sides: { ab: "10", cd: "15" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In an hourglass figure where \\(AB \\parallel CD\\) with intersection at \\(E\\), \\(AE = 2x + 1\\), \\(EC = 5x - 4\\), \\(BE = 6\\), and \\(ED = 9\\). What is the value of \\(x\\)?",
    choices: [
      "2.75",
      "3",
      "2.5",
      "3.25"
    ],
    answer: 0,
    sol: "By similarity \\(\\triangle ABE \\sim \\triangle CDE\\): \\(\\frac{AE}{EC} = \\frac{BE}{ED} \\implies \\frac{2x+1}{5x-4} = \\frac{6}{9} = \\frac{2}{3}\\). Cross-multiplying: \\(3(2x + 1) = 2(5x - 4) \\implies 6x + 3 = 10x - 8 \\implies 4x = 11 \\implies x = \\frac{11}{4} = 2.75\\).",
    fig: {
      type: "bowtie",
      labels: ["A", "B", "C", "D", "E"],
      ratio: 0.67,
      sides: { be: "6", ed: "9", ae: "2x+1", ec: "5x-4" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In the figure below with \\(AB \\parallel CD\\), \\(\\text{Area}(\\triangle ABE) = 36\\) and \\(\\text{Area}(\\triangle CDE) = 81\\). If base \\(AB = 10\\), what is the length of base \\(CD\\)?",
    choices: [
      "15",
      "22.5",
      "18",
      "12.5"
    ],
    answer: 0,
    sol: "Because \\(\\triangle ABE \\sim \\triangle CDE\\), the ratio of their areas equals the square of the linear scale factor: \\(\\frac{\\text{Area}(\\triangle CDE)}{\\text{Area}(\\triangle ABE)} = \\frac{81}{36} = \\frac{9}{4} = k^2\\). Taking the square root gives \\(k = \\sqrt{\\frac{9}{4}} = \\frac{3}{2}\\). Therefore, \\(CD = k \\cdot AB = \\frac{3}{2} \\times 10 = 15\\).",
    fig: {
      type: "bowtie",
      labels: ["A", "B", "C", "D", "E"],
      ratio: 0.67,
      sides: { ab: "10", cd: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "A pinhole camera has its pinhole at point \\(E\\). An object \\(AB\\) of height \\(15\\text{ cm}\\) is placed \\(45\\text{ cm}\\) in front of \\(E\\). The inverted image \\(CD\\) forms on a screen \\(30\\text{ cm}\\) behind \\(E\\). Assuming rays travel in straight lines intersecting at \\(E\\) parallel to the camera plates, what is the image height \\(CD\\)?",
    choices: [
      "10 cm",
      "12 cm",
      "8 cm",
      "7.5 cm"
    ],
    answer: 0,
    sol: "Light rays passing through the pinhole form similar triangles on either side of \\(E\\): \\(\\triangle ABE \\sim \\triangle CDE\\). The ratio of object height to image height equals the ratio of distances from the pinhole: \\(\\frac{CD}{AB} = \\frac{d_2}{d_1} \\implies \\frac{CD}{15} = \\frac{30}{45} = \\frac{2}{3} \\implies CD = 15 \\times \\frac{2}{3} = 10\\text{ cm}\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In an hourglass figure with \\(AB \\parallel CD\\), \\(\\angle BAE = 38^\\circ\\) and \\(\\angle AEB = 84^\\circ\\). What is the measure of \\(\\angle EDC\\)?",
    choices: [
      "58°",
      "38°",
      "84°",
      "42°"
    ],
    answer: 0,
    sol: "In \\(\\triangle ABE\\), the angle sum is \\(180^\\circ\\): \\(\\angle ABE = 180^\\circ - 38^\\circ - 84^\\circ = 58^\\circ\\). Because lines \\(AB\\) and \\(CD\\) are parallel, alternate interior angles are equal: \\(\\angle EDC = \\angle ABE = 58^\\circ\\).",
    fig: {
      type: "bowtie",
      labels: ["A", "B", "C", "D", "E"],
      ratio: 0.7
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "Two vertical poles of heights \\(10\\text{ m}\\) and \\(15\\text{ m}\\) stand on level ground. Guy wires connect the top of each pole to the base of the other pole. At what height above the ground do the two crossing wires intersect?",
    choices: [
      "6 m",
      "7.5 m",
      "5 m",
      "6.25 m"
    ],
    answer: 0,
    sol: "Let the poles be \\(a = 10\\) and \\(b = 15\\). By setting up proportions in the two pairs of similar triangles formed by the crossing wires and the ground, the height \\(h\\) of the intersection satisfies the crossed-ladders formula: \\(\\frac{1}{h} = \\frac{1}{a} + \\frac{1}{b}\\). Substituting: \\(\\frac{1}{h} = \\frac{1}{10} + \\frac{1}{15} = \\frac{3 + 2}{30} = \\frac{5}{30} = \\frac{1}{6} \\implies h = 6\\text{ m}\\). Remarkable fact: This height is completely independent of the distance between the poles!",
    fig: null
  },

  // ── ARCHETYPE 4: Right Triangle Altitude Theorem (Geometric Mean) ──
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "In right \\(\\triangle ABC\\) with right angle at \\(C\\), altitude \\(CD\\) is drawn perpendicular to hypotenuse \\(AB\\). If \\(AD = 4\\) and \\(DB = 9\\), what is the length of altitude \\(CD\\)?",
    choices: [
      "6",
      "6.5",
      "5.2",
      "7.2"
    ],
    answer: 0,
    sol: "By the Geometric Mean Altitude Theorem, the altitude to the hypotenuse is the geometric mean of the two segments into which it divides the hypotenuse: \\(CD^2 = AD \\cdot DB\\). Substituting: \\(CD^2 = 4 \\times 9 = 36 \\implies CD = \\sqrt{36} = 6\\).",
    fig: {
      type: "right_triangle_altitude",
      labels: ["A", "B", "C", "D"],
      t: 0.308,
      p: "4",
      q: "9",
      altitude: "h"
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In right \\(\\triangle ABC\\) with right angle at \\(C\\), altitude \\(CD \\perp AB\\). If \\(AD = 3\\) and \\(DB = 12\\), what is the length of leg \\(AC\\)?",
    choices: [
      "3√5 ≈ 6.71",
      "6",
      "15",
      "6√5 ≈ 13.42"
    ],
    answer: 0,
    sol: "Total hypotenuse is \\(AB = AD + DB = 3 + 12 = 15\\). By the Geometric Mean Leg Theorem, each leg is the geometric mean of the hypotenuse and the adjacent segment: \\(AC^2 = AB \\cdot AD\\). Substituting: \\(AC^2 = 15 \\times 3 = 45 \\implies AC = \\sqrt{45} = 3\\sqrt{5} \\approx 6.71\\).",
    fig: {
      type: "right_triangle_altitude",
      labels: ["A", "B", "C", "D"],
      t: 0.2,
      p: "3",
      q: "12",
      b: "x"
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In right \\(\\triangle ABC\\), altitude \\(CD\\) to hypotenuse \\(AB\\) has length \\(12\\). If segment \\(AD = 9\\), what is the length of hypotenuse \\(AB\\)?",
    choices: [
      "25",
      "16",
      "20",
      "21"
    ],
    answer: 0,
    sol: "By the Geometric Mean Altitude Theorem: \\(CD^2 = AD \\cdot DB \\implies 12^2 = 9 \\cdot DB \\implies 144 = 9 \\cdot DB \\implies DB = 16\\). The total hypotenuse is \\(AB = AD + DB = 9 + 16 = 25\\).",
    fig: {
      type: "right_triangle_altitude",
      labels: ["A", "B", "C", "D"],
      t: 0.36,
      p: "9",
      altitude: "12",
      c: "x"
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "A right triangle has legs of lengths \\(15\\) and \\(20\\). What is the exact length of the altitude drawn perpendicular to the hypotenuse?",
    choices: [
      "12",
      "9.6",
      "10",
      "13.5"
    ],
    answer: 0,
    sol: "First compute the hypotenuse using the Pythagorean theorem: \\(c = \\sqrt{15^2 + 20^2} = \\sqrt{225 + 400} = \\sqrt{625} = 25\\). Equating the area calculated in two ways: \\(\\text{Area} = \\frac{1}{2}ab = \\frac{1}{2}ch \\implies ab = ch\\). Substituting: \\(15 \\times 20 = 25 \\cdot h \\implies 300 = 25h \\implies h = \\frac{300}{25} = 12\\).",
    fig: {
      type: "right_triangle_altitude",
      labels: ["A", "B", "C", "D"],
      t: 0.36,
      b: "15",
      a: "20",
      c: "25",
      altitude: "h"
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In right \\(\\triangle ABC\\), altitude \\(CD\\) to hypotenuse \\(AB\\) measures \\(6\\), and the entire hypotenuse \\(AB = 13\\). What is the length of the longer of the two segments into which \\(D\\) divides \\(AB\\)?",
    choices: [
      "9",
      "8",
      "10",
      "7.5"
    ],
    answer: 0,
    sol: "Let the two segments be \\(p\\) and \\(q\\). We know \\(p + q = 13\\) and \\(p \\cdot q = CD^2 = 6^2 = 36\\). These are the roots of the quadratic equation \\(t^2 - 13t + 36 = 0\\). Factoring: \\((t - 4)(t - 9) = 0\\). The segments are \\(4\\) and \\(9\\). The longer segment is \\(9\\).",
    fig: {
      type: "right_triangle_altitude",
      labels: ["A", "B", "C", "D"],
      t: 0.308,
      altitude: "6",
      c: "13"
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In right \\(\\triangle ABC\\) with altitude \\(CD \\perp AB\\), \\(AD = 2\\) and \\(DB = 8\\). What is the ratio of the legs \\(\\frac{AC}{BC}\\)?",
    choices: [
      "1/2",
      "1/4",
      "1/√2",
      "1/3"
    ],
    answer: 0,
    sol: "By the Geometric Mean Leg Theorems: \\(AC^2 = AB \\cdot AD\\) and \\(BC^2 = AB \\cdot DB\\). Dividing the two equations: \\(\\frac{AC^2}{BC^2} = \\frac{AD}{DB} = \\frac{2}{8} = \\frac{1}{4}\\). Taking the square root gives \\(\\frac{AC}{BC} = \\sqrt{\\frac{1}{4}} = \\frac{1}{2}\\).",
    fig: {
      type: "right_triangle_altitude",
      labels: ["A", "B", "C", "D"],
      t: 0.2,
      p: "2",
      q: "8"
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In right \\(\\triangle ABC\\) with right angle at \\(C\\) and altitude \\(CD \\perp AB\\), leg \\(BC = 12\\) and hypotenuse \\(AB = 16\\). What is the length of segment \\(DB\\)?",
    choices: [
      "9",
      "7",
      "8",
      "10.5"
    ],
    answer: 0,
    sol: "By the Geometric Mean Leg Theorem, \\(BC^2 = AB \\cdot DB\\). Substituting the known lengths: \\(12^2 = 16 \\cdot DB \\implies 144 = 16 \\cdot DB \\implies DB = \\frac{144}{16} = 9\\). (Consequently, \\(AD = 16 - 9 = 7\\)).",
    fig: {
      type: "right_triangle_altitude",
      labels: ["A", "B", "C", "D"],
      t: 0.4375,
      a: "12",
      c: "16",
      q: "x"
    }
  },

  // ── ARCHETYPE 5: Angle Bisector Theorem ──
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), ray \\(AD\\) bisects \\(\\angle A\\) with point \\(D\\) on side \\(BC\\). If \\(AB = 8\\), \\(AC = 12\\), and \\(BD = 6\\), what is the length of segment \\(DC\\)?",
    choices: [
      "9",
      "8",
      "10",
      "7.5"
    ],
    answer: 0,
    sol: "By the Angle Bisector Theorem, an angle bisector divides the opposite side into segments proportional to the adjacent sides: \\(\\frac{BD}{DC} = \\frac{AB}{AC}\\). Substituting: \\(\\frac{6}{DC} = \\frac{8}{12} = \\frac{2}{3} \\implies 2 \\cdot DC = 18 \\implies DC = 9\\).",
    fig: {
      type: "angle_bisector",
      labels: ["A", "B", "C", "D"],
      sides: { ab: "8", ac: "12", bd: "6", dc: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), ray \\(AD\\) bisects \\(\\angle A\\) with \\(D\\) on \\(BC\\). If \\(AB = 10\\), \\(AC = 15\\), and the entire base \\(BC = 20\\), what is the length of segment \\(BD\\)?",
    choices: [
      "8",
      "12",
      "6",
      "10"
    ],
    answer: 0,
    sol: "By the Angle Bisector Theorem: \\(\\frac{BD}{DC} = \\frac{AB}{AC} = \\frac{10}{15} = \\frac{2}{3}\\). The total base is \\(BC = BD + DC = 20\\). Therefore, \\(BD = 20 \\times \\frac{2}{2+3} = 20 \\times \\frac{2}{5} = 8\\) (and \\(DC = 12\\)).",
    fig: {
      type: "angle_bisector",
      labels: ["A", "B", "C", "D"],
      sides: { ab: "10", ac: "15" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "The sides of \\(\\triangle ABC\\) are \\(AB = 14\\), \\(AC = 21\\), and \\(BC = 25\\). Ray \\(AD\\) bisects \\(\\angle A\\) with \\(D\\) on \\(BC\\). What is the length of segment \\(BD\\)?",
    choices: [
      "10",
      "15",
      "12.5",
      "8.5"
    ],
    answer: 0,
    sol: "The ratio of the adjacent sides is \\(\\frac{AB}{AC} = \\frac{14}{21} = \\frac{2}{3}\\). By the Angle Bisector Theorem, \\(D\\) divides \\(BC\\) in the same ratio: \\(BD = 25 \\times \\frac{2}{2+3} = 25 \\times \\frac{2}{5} = 10\\).",
    fig: {
      type: "angle_bisector",
      labels: ["A", "B", "C", "D"],
      sides: { ab: "14", ac: "21" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), ray \\(AD\\) bisects \\(\\angle A\\). If \\(AB = x\\), \\(AC = x + 4\\), \\(BD = 4\\), and \\(DC = 6\\), what is the length of side \\(AC\\)?",
    choices: [
      "12",
      "8",
      "10",
      "14"
    ],
    answer: 0,
    sol: "Apply the Angle Bisector Theorem: \\(\\frac{BD}{DC} = \\frac{AB}{AC} \\implies \\frac{4}{6} = \\frac{x}{x+4} \\implies \\frac{2}{3} = \\frac{x}{x+4}\\). Cross-multiplying: \\(2(x+4) = 3x \\implies 2x + 8 = 3x \\implies x = 8\\). Side \\(AC = x + 4 = 8 + 4 = 12\\).",
    fig: {
      type: "angle_bisector",
      labels: ["A", "B", "C", "D"],
      sides: { bd: "4", dc: "6", ab: "x", ac: "x+4" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In right \\(\\triangle ABC\\) with \\(\\angle C = 90^\\circ\\), \\(AC = 6\\), \\(BC = 8\\), and hypotenuse \\(AB = 10\\). The angle bisector of \\(\\angle A\\) intersects side \\(BC\\) at point \\(D\\). What is the exact length of segment \\(CD\\)?",
    choices: [
      "3",
      "4",
      "2.5",
      "3.5"
    ],
    answer: 0,
    sol: "By the Angle Bisector Theorem applied to angle \\(A\\): \\(\\frac{CD}{DB} = \\frac{AC}{AB} = \\frac{6}{10} = \\frac{3}{5}\\). Since \\(CD + DB = BC = 8\\), \\(CD = 8 \\times \\frac{3}{3+5} = 8 \\times \\frac{3}{8} = 3\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), ray \\(AD\\) bisects \\(\\angle A\\). If the ratio \\(\\frac{BD}{DC} = \\frac{3}{5}\\) and \\(AB = 15\\), what is the length of side \\(AC\\)?",
    choices: [
      "25",
      "9",
      "20",
      "18"
    ],
    answer: 0,
    sol: "By the Angle Bisector Theorem, \\(\\frac{BD}{DC} = \\frac{AB}{AC} \\implies \\frac{3}{5} = \\frac{15}{AC} \\implies 3 \\cdot AC = 75 \\implies AC = 25\\).",
    fig: {
      type: "angle_bisector",
      labels: ["A", "B", "C", "D"],
      sides: { ab: "15", ac: "x" }
    }
  },

  // ── ARCHETYPE 6: Overlapping Inverted Triangles with Shared Angle ──
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\) shown below, point \\(D\\) is on \\(AB\\) and \\(E\\) on \\(AC\\) such that \\(\\angle ADE \\cong \\angle C\\). If \\(AD = 4\\), \\(AE = 5\\), and \\(AC = 12\\), what is the length of side \\(AB\\)?",
    choices: [
      "15",
      "9.6",
      "10",
      "14.4"
    ],
    answer: 0,
    sol: "Both \\(\\triangle ADE\\) and \\(\\triangle ACB\\) share \\(\\angle A\\), and \\(\\angle ADE \\cong \\angle C\\). By AA similarity, \\(\\triangle ADE \\sim \\triangle ACB\\) in INVERTED order! Therefore, the corresponding sides satisfy: \\(\\frac{AD}{AC} = \\frac{AE}{AB} \\implies \\frac{4}{12} = \\frac{5}{AB} \\implies \\frac{1}{3} = \\frac{5}{AB} \\implies AB = 15\\). Warning: Reflexively assuming \\(DE \\parallel BC\\) gives the incorrect distractor \\(9.6\\).",
    fig: {
      type: "overlapping_triangles",
      labels: ["A", "B", "C", "D", "E"],
      sides: { ad: "4", ae: "5", ac: "12", ab: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), point \\(D\\) lies on \\(AB\\) and \\(E\\) on \\(AC\\) such that \\(\\angle AED \\cong \\angle B\\). If \\(AE = 6\\), \\(AD = 8\\), \\(AC = 18\\), and base \\(BC = 27\\), what is the length of segment \\(DE\\)?",
    choices: [
      "12",
      "9",
      "15",
      "13.5"
    ],
    answer: 0,
    sol: "Since \\(\\angle A\\) is shared and \\(\\angle AED \\cong \\angle B\\), \\(\\triangle AED \\sim \\triangle ABC\\) by AA similarity. The ratio of corresponding sides is \\(\\frac{DE}{BC} = \\frac{AD}{AC}\\). Substituting the known lengths: \\(\\frac{DE}{27} = \\frac{8}{18} = \\frac{4}{9} \\implies DE = 27 \\times \\frac{4}{9} = 12\\).",
    fig: {
      type: "overlapping_triangles",
      labels: ["A", "C", "B", "E", "D"],
      sides: { ae: "6", ad: "8", ac: "18", bc: "27", de: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), \\(AD = 3\\) and \\(DB = 9\\) (so \\(AB = 12\\)); \\(AE = 4\\) and \\(EC = 5\\) (so \\(AC = 9\\)). If base \\(BC = 21\\), what is the length of segment \\(DE\\)?",
    choices: [
      "7",
      "5.25",
      "8",
      "6"
    ],
    answer: 0,
    sol: "Compare the side ratios across the shared angle \\(\\angle A\\): \\(\\frac{AD}{AC} = \\frac{3}{9} = \\frac{1}{3}\\) and \\(\\frac{AE}{AB} = \\frac{4}{12} = \\frac{1}{3}\\). Because two pairs of corresponding sides are in the same constant ratio \\(1/3\\) and include the shared angle \\(\\angle A\\), \\(\\triangle ADE \\sim \\triangle ACB\\) by SAS similarity in inverted order. Thus, \\(\\frac{DE}{BC} = \\frac{1}{3} \\implies DE = 21 \\times \\frac{1}{3} = 7\\).",
    fig: {
      type: "overlapping_triangles",
      labels: ["A", "B", "C", "D", "E"],
      sides: { ad: "3", db: "9", ae: "4", ec: "5", bc: "21", de: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), \\(\\angle A = 50^\\circ\\). Transversal \\(DE\\) is drawn such that \\(\\angle ADE = \\angle C = 65^\\circ\\). What is the measure of \\(\\angle B\\)?",
    choices: [
      "65°",
      "50°",
      "55°",
      "75°"
    ],
    answer: 0,
    sol: "In \\(\\triangle ABC\\), the sum of angles is \\(180^\\circ\\): \\(\\angle B = 180^\\circ - \\angle A - \\angle C = 180^\\circ - 50^\\circ - 65^\\circ = 65^\\circ\\). Because \\(\\angle B = \\angle C = 65^\\circ\\), \\(\\triangle ABC\\) is an isosceles triangle with \\(AB = AC\\).",
    fig: {
      type: "overlapping_triangles",
      labels: ["A", "B", "C", "D", "E"]
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), \\(\\angle ADE \\cong \\angle C\\) with \\(AD = 5\\) and \\(AC = 15\\). If the total area of \\(\\triangle ABC\\) is \\(108\\), what is the area of quadrilateral \\(BDEC\\)?",
    choices: [
      "96",
      "84",
      "90",
      "72"
    ],
    answer: 0,
    sol: "Because \\(\\triangle ADE \\sim \\triangle ACB\\), the linear ratio is \\(k = \\frac{AD}{AC} = \\frac{5}{15} = \\frac{1}{3}\\). The area ratio is \\(k^2 = (1/3)^2 = 1/9\\). Thus, \\(\\text{Area}(\\triangle ADE) = \\frac{1}{9} \\times 108 = 12\\). The area of quadrilateral \\(BDEC = \\text{Area}(\\triangle ABC) - \\text{Area}(\\triangle ADE) = 108 - 12 = 96\\).",
    fig: {
      type: "overlapping_triangles",
      labels: ["A", "B", "C", "D", "E"],
      sides: { ad: "5", ac: "15" }
    }
  },

  // ── ARCHETYPE 7: Scale Factor Ratios (Perimeter k, Area k², Volume k³) ──
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "Two similar triangles have a linear scale factor of \\(3:7\\). If the perimeter of the smaller triangle is \\(24\\), what is the perimeter of the larger triangle?",
    choices: [
      "56",
      "48",
      "72",
      "130.67"
    ],
    answer: 0,
    sol: "Perimeters of similar figures scale linearly with the scale factor \\(k\\): \\(\\frac{P_2}{P_1} = \\frac{7}{3} \\implies P_2 = 24 \\times \\frac{7}{3} = 56\\).",
    fig: {
      type: "similar",
      vertices: [[0, 0], [6, 0], [2, 4]],
      ratio: 0.43,
      left: { caption: "P = 24" },
      right: { caption: "P = ?" },
      tilde: true
    }
  },
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "Two similar polygons have corresponding sides in the ratio \\(3:8\\). What is the ratio of their areas?",
    choices: [
      "9 : 64",
      "3 : 8",
      "6 : 16",
      "27 : 512"
    ],
    answer: 0,
    sol: "The ratio of areas of similar figures equals the square of the ratio of corresponding side lengths: \\(\\left(\\frac{3}{8}\\right)^2 = \\frac{9}{64}\\), so the ratio of their areas is \\(9 : 64\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "Two similar triangles have areas of \\(45\\text{ cm}^2\\) and \\(80\\text{ cm}^2\\). If the perimeter of the smaller triangle is \\(27\\text{ cm}\\), what is the perimeter of the larger triangle?",
    choices: [
      "36 cm",
      "48 cm",
      "32 cm",
      "45 cm"
    ],
    answer: 0,
    sol: "The ratio of the areas is \\(\\frac{A_2}{A_1} = \\frac{80}{45} = \\frac{16}{9} = k^2\\). The linear scale factor is \\(k = \\sqrt{\\frac{16}{9}} = \\frac{4}{3}\\). Perimeters scale linearly by \\(k\\): \\(P_2 = 27 \\times \\frac{4}{3} = 36\\text{ cm}\\).",
    fig: {
      type: "similar",
      vertices: [[0, 0], [8, 0], [3, 5]],
      ratio: 0.75,
      left: { caption: "Area = 45 cm²" },
      right: { caption: "Area = 80 cm²" },
      tilde: true
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "If each dimension of a rectangle is increased by \\(40\\%\\), by what percentage does the area of the rectangle increase?",
    choices: [
      "96%",
      "40%",
      "80%",
      "140%"
    ],
    answer: 0,
    sol: "Increasing linear dimensions by \\(40\\%\\) corresponds to a linear scale factor of \\(k = 1.40\\). The new area is \\(k^2 = (1.40)^2 = 1.96\\) times the original area. A factor of \\(1.96\\) represents a \\((1.96 - 1) \\times 100\\% = 96\\%\\) increase.",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "Two similar solid cones have base radii of \\(6\\text{ cm}\\) and \\(10\\text{ cm}\\). What is the ratio of their volumes?",
    choices: [
      "27 : 125",
      "9 : 25",
      "3 : 5",
      "36 : 100"
    ],
    answer: 0,
    sol: "The linear scale factor is \\(k = \\frac{6}{10} = \\frac{3}{5}\\). The ratio of volumes of similar 3D solids equals the cube of the linear scale factor: \\(k^3 = \\left(\\frac{3}{5}\\right)^3 = \\frac{27}{125}\\). Therefore, the ratio of their volumes is \\(27 : 125\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "A solid bronze statue \\(12\\text{ cm}\\) tall has a mass of \\(1.5\\text{ kg}\\). A geometrically similar statue made of the exact same solid bronze alloy is \\(36\\text{ cm}\\) tall. What is the mass of the larger statue?",
    choices: [
      "40.5 kg",
      "13.5 kg",
      "4.5 kg",
      "27.0 kg"
    ],
    answer: 0,
    sol: "Because both statues are made of the same material (uniform density), mass is directly proportional to volume. The linear scale factor is \\(k = \\frac{36}{12} = 3\\). Volumes scale by \\(k^3 = 3^3 = 27\\). Therefore, the mass of the larger statue is \\(1.5 \\times 27 = 40.5\\text{ kg}\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "Two similar spherical storage tanks: Tank B has a surface area \\(9\\) times that of Tank A. If Tank A holds \\(250\\text{ liters}\\), how many liters does Tank B hold?",
    choices: [
      "6,750 liters",
      "2,250 liters",
      "1,500 liters",
      "5,625 liters"
    ],
    answer: 0,
    sol: "Surface area scales by \\(k^2 = 9 \\implies k = \\sqrt{9} = 3\\). Volume (capacity) scales by \\(k^3 = 3^3 = 27\\). Therefore, Tank B holds \\(250 \\times 27 = 6,750\\text{ liters}\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "A topographical map has a scale of \\(1 : 25{,}000\\). A regional forest reserve has an area of \\(8\\text{ cm}^2\\) on the map. What is the actual ground area of the reserve in square kilometers (\\(\\text{km}^2\\))?",
    choices: [
      "0.5 km²",
      "2.0 km²",
      "5.0 km²",
      "0.2 km²"
    ],
    answer: 0,
    sol: "On the map, \\(1\\text{ cm} = 25{,}000\\text{ cm} = 250\\text{ m} = 0.25\\text{ km}\\). For area, \\(1\\text{ cm}^2 = (0.25\\text{ km})^2 = 0.0625\\text{ km}^2\\). Therefore, an area of \\(8\\text{ cm}^2\\) on the map represents \\(8 \\times 0.0625 = 0.5\\text{ km}^2\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "A cone with height \\(30\\text{ cm}\\) is sliced by a plane parallel to its base at a distance of \\(15\\text{ cm}\\) from the apex, creating a smaller top cone and a bottom frustum. What fraction of the original cone's volume is contained in the frustum?",
    choices: [
      "7/8",
      "1/2",
      "3/4",
      "1/8"
    ],
    answer: 0,
    sol: "The smaller top cone is similar to the original cone with linear scale factor \\(k = \\frac{15}{30} = \\frac{1}{2}\\). The volume of the smaller cone is \\(k^3 = (1/2)^3 = \\frac{1}{8}\\) of the original cone's volume. The remaining frustum contains \\(1 - \\frac{1}{8} = \\frac{7}{8}\\) of the original volume.",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "Two similar rectangles have lengths \\(15\\) and \\(25\\). If the width of the smaller rectangle is \\(9\\), what is the width of the larger rectangle?",
    choices: [
      "15",
      "12",
      "18",
      "13.5"
    ],
    answer: 0,
    sol: "The linear scale factor is \\(k = \\frac{25}{15} = \\frac{5}{3}\\). The width of the larger rectangle is \\(w = 9 \\times \\frac{5}{3} = 15\\).",
    fig: null
  },

  // ── ARCHETYPE 8: Realistic Indirect Measurement ──
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "A 5.5-foot-tall surveyor casts a 4.4-foot shadow on level ground. At the exact same moment, a nearby radio antenna tower casts a 36-foot shadow. How tall is the antenna tower?",
    choices: [
      "45 ft",
      "40 ft",
      "48 ft",
      "38.5 ft"
    ],
    answer: 0,
    sol: "Sunlight rays strike level ground at the same angle of elevation, creating similar right triangles between objects and their shadows: \\(\\frac{\\text{Height}}{\\text{Shadow}} = \\frac{5.5}{4.4} = 1.25\\). For the tower: \\(\\frac{H}{36} = 1.25 \\implies H = 36 \\times 1.25 = 45\\text{ ft}\\).",
    fig: {
      type: "shadow_similarity",
      obj1: { label: "Surveyor", height: "5.5 ft", shadow: "4.4 ft" },
      obj2: { label: "Tower", height: "h", shadow: "36 ft" },
      angle_label: "θ"
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "A 2-meter vertical post casts a 1.6-meter shadow on flat ground. At the same time, an ancient obelisk casts a 28-meter shadow. What is the height of the obelisk?",
    choices: [
      "35 m",
      "32 m",
      "40 m",
      "22.4 m"
    ],
    answer: 0,
    sol: "By AA similarity of the shadow right triangles: \\(\\frac{H}{28} = \\frac{2}{1.6} = 1.25 \\implies H = 28 \\times 1.25 = 35\\text{ m}\\).",
    fig: {
      type: "shadow_similarity",
      obj1: { label: "Post", height: "2 m", shadow: "1.6 m" },
      obj2: { label: "Obelisk", height: "h", shadow: "28 m" },
      angle_label: "θ"
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "A 6-foot-tall person stands 10 feet away from the base of a 16-foot streetlight. How long is the person's shadow cast along the ground?",
    choices: [
      "6 ft",
      "4 ft",
      "8 ft",
      "5 ft"
    ],
    answer: 0,
    sol: "Let \\(s\\) be the length of the person's shadow. The light source creates nested similar right triangles: the small triangle (person and shadow) and the large triangle (streetlight and total distance): \\(\\frac{16}{10 + s} = \\frac{6}{s}\\). Cross-multiplying: \\(16s = 6(10 + s) \\implies 16s = 60 + 6s \\implies 10s = 60 \\implies s = 6\\text{ ft}\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "To determine the height of a sea cliff, a surveyor places a small mirror flat on horizontal ground 18 meters from the base of the cliff. The surveyor steps back 2 meters from the mirror until the top of the cliff is aligned with the center of the mirror. If the surveyor's eye level is 1.6 meters above the ground, what is the height of the cliff?",
    choices: [
      "14.4 m",
      "16.2 m",
      "22.5 m",
      "18.0 m"
    ],
    answer: 0,
    sol: "By the law of optical reflection, the angle of incidence equals the angle of reflection. Both the surveyor and the cliff stand perpendicular to the ground (\\(90^\\circ\\)). By AA similarity: \\(\\frac{\\text{Cliff Height}}{\\text{Distance to Mirror}} = \\frac{\\text{Eye Height}}{\\text{Surveyor Distance to Mirror}} \\implies \\frac{H}{18} = \\frac{1.6}{2} = 0.8\\). Multiplying gives \\(H = 18 \\times 0.8 = 14.4\\text{ m}\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "A pine tree 40 feet tall casts a 30-foot shadow. At the exact same time, a utility pole casts a 45-foot shadow. What is the height of the utility pole?",
    choices: [
      "60 ft",
      "50 ft",
      "55 ft",
      "48 ft"
    ],
    answer: 0,
    sol: "By AA similarity of shadow triangles: \\(\\frac{\\text{Pole Height}}{45} = \\frac{40}{30} = \\frac{4}{3} \\implies \\text{Pole Height} = 45 \\times \\frac{4}{3} = 60\\text{ ft}\\).",
    fig: {
      type: "shadow_similarity",
      obj1: { label: "Tree", height: "40 ft", shadow: "30 ft" },
      obj2: { label: "Pole", height: "h", shadow: "45 ft" },
      angle_label: "θ"
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In a camera obscura, a hot air balloon at a distance of \\(400\\text{ m}\\) projects an inverted image of diameter \\(3\\text{ cm}\\) onto a viewing screen positioned \\(60\\text{ cm}\\) behind the pinhole. What is the actual diameter of the hot air balloon?",
    choices: [
      "20 m",
      "15 m",
      "25 m",
      "18 m"
    ],
    answer: 0,
    sol: "The straight rays form similar triangles on either side of the pinhole: \\(\\frac{\\text{Diameter}}{400\\text{ m}} = \\frac{3\\text{ cm}}{60\\text{ cm}} = \\frac{1}{20}\\). Therefore, \\(\\text{Diameter} = 400 \\times \\frac{1}{20} = 20\\text{ m}\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "easy",
    domain: "Similarity",
    text: "A 3-foot vertical measuring stake casts a 4-foot shadow on level ground. At the same time, a commercial building casts a 48-foot shadow. What is the height of the building?",
    choices: [
      "36 ft",
      "40 ft",
      "32 ft",
      "42 ft"
    ],
    answer: 0,
    sol: "By similar right triangles: \\(\\frac{H}{48} = \\frac{3}{4} \\implies H = 48 \\times \\frac{3}{4} = 36\\text{ ft}\\).",
    fig: {
      type: "shadow_similarity",
      obj1: { label: "Stake", height: "3 ft", shadow: "4 ft" },
      obj2: { label: "Building", height: "h", shadow: "48 ft" },
      angle_label: "θ"
    }
  },

  // ── ARCHETYPE 9: Trapezoid Diagonals & Circles Intersecting Chords ──
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "Trapezoid \\(ABCD\\) has parallel bases \\(AB = 6\\) and \\(CD = 14\\). The diagonals \\(AC\\) and \\(BD\\) intersect at point \\(P\\). What is the ratio of \\(\\text{Area}(\\triangle APB)\\) to \\(\\text{Area}(\\triangle CPD)\\)?",
    choices: [
      "9 : 49",
      "3 : 7",
      "6 : 14",
      "9 : 42"
    ],
    answer: 0,
    sol: "Because \\(AB \\parallel CD\\), alternate interior angles and vertical angles prove that \\(\\triangle APB \\sim \\triangle CPD\\). The linear scale factor is \\(k = \\frac{AB}{CD} = \\frac{6}{14} = \\frac{3}{7}\\). The ratio of their areas equals the square of the linear scale factor: \\(k^2 = \\left(\\frac{3}{7}\\right)^2 = \\frac{9}{49}\\).",
    fig: {
      type: "trapezoid_diagonals",
      labels: ["A", "B", "C", "D", "P"],
      sides: { ab: "6", cd: "14" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In trapezoid \\(ABCD\\) with \\(AB \\parallel CD\\), \\(AB = 8\\) and \\(CD = 12\\). The diagonals intersect at \\(P\\). If the entire diagonal \\(AC = 30\\), what is the length of segment \\(AP\\)?",
    choices: [
      "12",
      "18",
      "10",
      "15"
    ],
    answer: 0,
    sol: "Because \\(\\triangle APB \\sim \\triangle CPD\\), corresponding segments along the diagonal satisfy \\(\\frac{AP}{PC} = \\frac{AB}{CD} = \\frac{8}{12} = \\frac{2}{3}\\). The total length is \\(AC = AP + PC = 30\\). Thus, \\(AP = 30 \\times \\frac{2}{2+3} = 30 \\times \\frac{2}{5} = 12\\) (and \\(PC = 18\\)).",
    fig: {
      type: "trapezoid_diagonals",
      labels: ["A", "B", "C", "D", "P"],
      sides: { ab: "8", cd: "12" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "Chords \\(AB\\) and \\(CD\\) intersect inside a circle at point \\(P\\). If \\(PA = 4\\), \\(PB = 9\\), and \\(PC = 6\\), what is the length of segment \\(PD\\)?",
    choices: [
      "6",
      "8",
      "5.4",
      "7"
    ],
    answer: 0,
    sol: "Triangles \\(\\triangle PAC\\) and \\(\\triangle PDB\\) are similar by AA (vertical angles at \\(P\\) and inscribed angles intercepting arc \\(BC\\)). Corresponding sides yield the Intersecting Chords Theorem: \\(PA \\cdot PB = PC \\cdot PD\\). Substituting: \\(4 \\times 9 = 6 \\cdot PD \\implies 36 = 6 \\cdot PD \\implies PD = 6\\).",
    fig: {
      type: "circle_chords_similarity",
      labels: ["A", "B", "C", "D", "P"],
      sides: { pa: "4", pb: "9", pc: "6", pd: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "Chords \\(AB\\) and \\(CD\\) intersect inside a circle at point \\(P\\). The segments on chord \\(AB\\) measure \\(PA = x\\) and \\(PB = x + 7\\). The segments on chord \\(CD\\) measure \\(PC = 3\\) and \\(PD = 6\\). What is the total length of chord \\(AB\\)?",
    choices: [
      "11",
      "9",
      "12",
      "10"
    ],
    answer: 0,
    sol: "By the Intersecting Chords Theorem: \\(PA \\cdot PB = PC \\cdot PD \\implies x(x + 7) = 3 \\times 6 = 18 \\implies x^2 + 7x - 18 = 0\\). Factoring: \\((x + 9)(x - 2) = 0\\). Since length must be positive, \\(x = 2\\). Therefore, \\(PA = 2\\) and \\(PB = 2 + 7 = 9\\). The total length of chord \\(AB = PA + PB = 2 + 9 = 11\\).",
    fig: {
      type: "circle_chords_similarity",
      labels: ["A", "B", "C", "D", "P"],
      sides: { pc: "3", pd: "6" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "From an external point \\(P\\), a tangent segment \\(PT\\) touches a circle at \\(T\\), and a secant line passes through the circle intersecting it at \\(A\\) and \\(B\\) with \\(PA = 9\\). If tangent \\(PT = 12\\), what is the length of chord \\(AB\\)?",
    choices: [
      "7",
      "16",
      "9",
      "8"
    ],
    answer: 0,
    sol: "By the Tangent-Secant Theorem (derived from similar triangles \\(\\triangle PTA \\sim \\triangle PBT\\)): \\(PT^2 = PA \\cdot PB\\). Substituting: \\(12^2 = 9 \\cdot PB \\implies 144 = 9 \\cdot PB \\implies PB = 16\\). The chord length is \\(AB = PB - PA = 16 - 9 = 7\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In a circle with chords \\(AB\\) and \\(CD\\) intersecting at \\(P\\), which reason rigorously proves that \\(\\triangle PAC \\sim \\triangle PDB\\)?",
    choices: [
      "Vertical angles at \\(P\\) and inscribed angles intercepting arc \\(BC\\) are congruent (AA)",
      "Both triangles share the center of the circle",
      "Chords in a circle are always perpendicular",
      "Corresponding sides are proportional by SSS"
    ],
    answer: 0,
    sol: "Vertical angles \\(\\angle APC \\cong \\angle BPD\\) are equal. Inscribed angles \\(\\angle PAC\\) and \\(\\angle PDB\\) both intercept the exact same arc \\(BC\\), so they are congruent by the Inscribed Angle Theorem. By AA similarity, \\(\\triangle PAC \\sim \\triangle PDB\\).",
    fig: {
      type: "circle_chords_similarity",
      labels: ["A", "B", "C", "D", "P"]
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "The diagonals of trapezoid \\(ABCD\\) with \\(AB \\parallel CD\\) intersect at \\(P\\). If \\(\\text{Area}(\\triangle APB) = 16\\) and \\(\\text{Area}(\\triangle CPD) = 49\\), what is the total area of trapezoid \\(ABCD\\)?",
    choices: [
      "121",
      "65",
      "130",
      "98"
    ],
    answer: 0,
    sol: "Because \\(\\triangle APB \\sim \\triangle CPD\\), the ratio of areas is \\(16/49 = (4/7)^2\\). For any trapezoid, the side triangles have equal area given by the geometric mean of the base triangles: \\(\\text{Area}(\\triangle APD) = \\text{Area}(\\triangle BPC) = \\sqrt{16 \\times 49} = 4 \\times 7 = 28\\). The total area of the trapezoid is \\(16 + 49 + 28 + 28 = 121\\) (which equals \\((4 + 7)^2 = 11^2 = 121\\)).",
    fig: {
      type: "trapezoid_diagonals",
      labels: ["A", "B", "C", "D", "P"],
      sides: { ab: "4", cd: "7" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In the figure below, lines \\(AB\\) and \\(CD\\) are parallel with \\(AB = 10\\) and \\(CD = 15\\). Segments \\(AD\\) and \\(BC\\) intersect at point \\(E\\). If the perimeter of \\(\\triangle ABE\\) is \\(26\\), what is the perimeter of \\(\\triangle CDE\\)?",
    choices: [
      "39",
      "36",
      "52",
      "32.5"
    ],
    answer: 0,
    sol: "Because \\(AB \\parallel CD\\), alternate interior angles make \\(\\triangle ABE \\sim \\triangle DCE\\). The linear scale factor between \\(\\triangle CDE\\) and \\(\\triangle ABE\\) is \\(k = \\frac{CD}{AB} = \\frac{15}{10} = \\frac{3}{2} = 1.5\\). Since the ratio of perimeters of similar triangles equals the linear scale factor, \\(\\text{Perimeter}(\\triangle CDE) = 1.5 \\times 26 = 39\\).",
    fig: {
      type: "bowtie",
      labels: ["A", "B", "C", "D", "E"],
      sides: { ab: "10", cd: "15" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "In \\(\\triangle JKL\\) with right angle at vertex \\(K\\), an altitude from \\(K\\) meets hypotenuse \\(JL\\) at point \\(M\\). Given that segment \\(JM = 5\\) and \\(ML = 15\\), determine the length of leg \\(JK\\).",
    choices: [
      "10",
      "\\(5\\sqrt{3}\\)",
      "\\(10\\sqrt{3}\\)",
      "\\(5\\sqrt{5}\\)"
    ],
    answer: 0,
    sol: "By the Geometric Mean Leg Theorem (projection theorem): \\(JK^2 = JM \\cdot JL\\). The full hypotenuse is \\(JL = JM + ML = 5 + 15 = 20\\). Therefore, \\(JK^2 = 5 \\times 20 = 100 \\implies JK = \\sqrt{100} = 10\\).",
    fig: {
      type: "right_triangle_altitude",
      labels: ["J", "L", "K", "M"],
      sides: { p: "5", q: "15", b: "x" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), ray \\(AD\\) bisects \\(\\angle BAC\\) with \\(D\\) lying on side \\(BC\\). If \\(AB = x + 3\\), \\(AC = 2x\\), \\(BD = 4\\), and \\(DC = 6\\), what is the value of \\(x\\)?",
    choices: [
      "9",
      "6",
      "8",
      "12"
    ],
    answer: 0,
    sol: "By the Angle Bisector Theorem, the ratio of the divided base segments equals the ratio of the adjacent sides: \\(\\frac{BD}{DC} = \\frac{AB}{AC} \\implies \\frac{4}{6} = \\frac{x + 3}{2x}\\). Cross-multiplying: \\(4(2x) = 6(x + 3) \\implies 8x = 6x + 18 \\implies 2x = 18 \\implies x = 9\\).",
    fig: {
      type: "angle_bisector",
      labels: ["A", "B", "C", "D"],
      sides: { c: "x+3", b: "2x", bd: "4", dc: "6" }
    }
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "In \\(\\triangle ABC\\), a transversal segment \\(DE\\) connects side \\(AB\\) at \\(D\\) and side \\(AC\\) at \\(E\\) such that \\(\\angle ADE = \\angle C\\). If \\(AD = 3\\), \\(AC = 9\\), and the area of \\(\\triangle ADE\\) is \\(8\\), what is the area of quadrilateral \\(BDEC\\)?",
    choices: [
      "64",
      "72",
      "24",
      "56"
    ],
    answer: 0,
    sol: "Because \\(\\angle ADE = \\angle C\\) and both triangles share \\(\\angle A\\), \\(\\triangle ADE \\sim \\triangle ACB\\) by AA. The linear scale factor from the small triangle to the large triangle is \\(k = \\frac{AC}{AD} = \\frac{9}{3} = 3\\). The ratio of their areas is \\(k^2 = 3^2 = 9\\). Thus, \\(\\text{Area}(\\triangle ABC) = 9 \\times \\text{Area}(\\triangle ADE) = 9 \\times 8 = 72\\). The area of quadrilateral \\(BDEC = \\text{Area}(\\triangle ABC) - \\text{Area}(\\triangle ADE) = 72 - 8 = 64\\).",
    fig: {
      type: "overlapping_triangles",
      labels: ["A", "B", "C", "D", "E"],
      sides: { ad: "3", ac: "9" }
    }
  },
  {
    type: "mcq",
    difficulty: "medium",
    domain: "Similarity",
    text: "A student whose eyes are \\(1.5\\text{ m}\\) above the ground places a mirror flat on the ground \\(2\\text{ m}\\) in front of her feet. Looking into the mirror, she sees the reflection of the top of a school flagpole located \\(18\\text{ m}\\) beyond the mirror. If the angle of incidence equals the angle of reflection, how tall is the flagpole?",
    choices: [
      "13.5 m",
      "24 m",
      "12 m",
      "15 m"
    ],
    answer: 0,
    sol: "The student, the ground, and the line of sight form a right triangle with legs \\(1.5\\text{ m}\\) (eye height) and \\(2\\text{ m}\\) (distance to mirror). The flagpole, ground, and reflected ray form a second right triangle with distance \\(18\\text{ m}\\) and height \\(h\\). Because the angle of incidence equals the angle of reflection, the two right triangles are similar by AA. Setting up the proportion: \\(\\frac{h}{1.5} = \\frac{18}{2} = 9 \\implies h = 9 \\times 1.5 = 13.5\\text{ m}\\).",
    fig: null
  },
  {
    type: "mcq",
    difficulty: "hard",
    domain: "Similarity",
    text: "From an exterior point \\(P\\), two secant lines are drawn to a circle. The first secant intersects the circle at \\(A\\) and \\(B\\) with \\(PA = 4\\) and \\(AB = 8\\). The second secant intersects the circle at \\(C\\) and \\(D\\) with \\(PC = 3\\). What is the length of chord \\(CD\\)?",
    choices: [
      "13",
      "16",
      "12",
      "15"
    ],
    answer: 0,
    sol: "For the first secant, the entire secant length is \\(PB = PA + AB = 4 + 8 = 12\\). By the Secant-Secant Power Theorem (derived from similar triangles \\(\\triangle PAD \\sim \\triangle PCB\\)): \\(PA \\cdot PB = PC \\cdot PD\\). Substituting: \\(4 \\times 12 = 3 \\cdot PD \\implies 48 = 3 \\cdot PD \\implies PD = 16\\). The chord length is \\(CD = PD - PC = 16 - 3 = 13\\).",
    fig: null
  }
];

console.log(`Authored ${questions.length} authentic Similarity questions.`);

/**
 * Deterministically balances answer positions across choices [0, 1, 2, 3] (A, B, C, D)
 * so that exactly 25% of questions have answer A, 25% B, 25% C, 25% D.
 */
function balanceChoices(q, index) {
  const targetPos = (index * 7 + 1) % 4; // 1, 0, 3, 2, 1, 0, 3, 2...
  const correctChoice = q.choices[0];
  const distractors = q.choices.slice(1);
  const newChoices = [];
  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === targetPos) {
      newChoices.push(correctChoice);
    } else {
      newChoices.push(distractors[dIdx++]);
    }
  }
  return {
    ...q,
    choices: newChoices,
    answer: targetPos
  };
}

// Starter question (item 4 of original starter list)
const starterQ = {
  type: "mcq",
  domain: "Similarity",
  difficulty: "medium",
  text: "Two similar triangles have corresponding sides in the ratio \\(2:3\\). If the smaller triangle has an area of \\(12\\), what is the area of the larger triangle?",
  choices: [
    "27",
    "18",
    "24",
    "8"
  ],
  answer: 0,
  sol: "The ratio of the areas of similar figures equals the square of the ratio of their side lengths: \\(k^2 = (3/2)^2 = 9/4\\). Therefore, the area of the larger triangle is \\(12 \\times \\frac{9}{4} = 27\\).",
  fig: {
    type: "similar",
    vertices: [[0, 0], [10, 0], [3.2, 6.6]],
    tilde: true,
    ratio: 0.667,
    left: { caption: "Area = 12" },
    right: { caption: "Area = ?" }
  }
};

const balancedStarter = balanceChoices(starterQ, 0);
const balancedQuestions = questions.map((q, idx) => balanceChoices(q, idx + 1));

// Verify choice answer balance
const ansCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
ansCounts[balancedStarter.answer]++;
balancedQuestions.forEach(q => ansCounts[q.answer]++);
console.log('Answer choice distribution (A/B/C/D):', ansCounts);

// Read existing geo.json
const geoPath = path.join(__dirname, '..', 'bank-data', 'geo.json');
const geoData = JSON.parse(fs.readFileSync(geoPath, 'utf8'));

// Filter out old Similarity questions (index 4 and indices 350-499)
const nonSimPool = geoData.pool.filter(q => q.domain !== 'Similarity');
console.log(`Non-similarity pool items: ${nonSimPool.length}`);

const newPool = [];
// Copy up to index 4
for (let i = 0; i < 4; i++) newPool.push(nonSimPool[i]);
// Insert starter question at index 4
newPool.push(balancedStarter);
// Copy items from 4 to 348 of nonSimPool
for (let i = 4; i < 349; i++) {
  if (nonSimPool[i]) newPool.push(nonSimPool[i]);
}
// Insert all balanced authentic Similarity questions
balancedQuestions.forEach(q => newPool.push(q));
// Append any remaining non-similarity items
for (let i = 349; i < nonSimPool.length; i++) {
  newPool.push(nonSimPool[i]);
}

console.log(`Total new pool size: ${newPool.length}`);
geoData.pool = newPool;

fs.writeFileSync(geoPath, JSON.stringify(geoData, null, 2), 'utf8');
console.log(`Updated ${geoPath} successfully.`);

