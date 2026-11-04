/**
 * src/scripts/exam/structured-frq.ts
 * Multi-Part Structured Free-Response & Proof Engine (Wave 3 — WP-38)
 *
 * TypeScript contract & reference implementation compiled to structured-frq.js
 * for AP Section II, Cambridge IGCSE 0580 / 0606 / 9709, Edexcel 4MA1,
 * IB Math AA/AI SL & HL, and Olympiad Stage-2 Deductive Proof items.
 */

export interface MarkCriterion {
  code: string; // e.g. 'M1', 'A1', 'B1', 'R1'
  criterion: string;
  criterion_ar?: string;
  marks: number;
}

export interface StructuredPart {
  label: string; // e.g. '(a)', '(b)(i)'
  prompt: string;
  prompt_ar?: string;
  marks: number;
  answer?: string;
  tolerances?: number;
  inputType?: 'algebraic' | 'numeric' | 'proof' | 'text';
  markScheme: MarkCriterion[];
}

export interface StructuredQuestion {
  id: string;
  type: 'structured' | 'proof';
  domain: string;
  difficulty: 'easy' | 'medium' | 'hard';
  text: string;
  text_ar?: string;
  sol: string;
  sol_ar?: string;
  marks?: number;
  calc?: boolean;
  paper?: string;
  course?: string;
  ibSection?: string;
  parts: StructuredPart[];
}

export interface StructuredResponseState {
  partInputs: Record<number, string>;
  checkedCriteria: Record<string, boolean>;
  notes?: string;
}

export interface PartGradeResult {
  index: number;
  label: string;
  maxMarks: number;
  earnedMarks: number;
  autoCorrect: boolean;
  userAnswer: string;
  expectedAnswer: string;
}

export interface StructuredGradeSummary {
  awardedMarks: number;
  totalMarks: number;
  ratio: number;
  isFullCredit: boolean;
  isPassingCredit: boolean;
  parts: PartGradeResult[];
}

export interface AnswerChecker {
  equivalent(user: string, expected: string): boolean;
}

export function parseNumericValue(raw: string | number | null | undefined): number {
  if (raw == null) return NaN;
  const s = String(raw)
    .trim()
    .replace(/\\[()\[\]]/g, '')
    .replace(/\$/g, '')
    .replace(/[−–—]/g, '-')
    .replace(/,/g, '')
    .trim();
  if (!s) return NaN;
  if (/^[+-]?\d+(?:\.\d+)?\s*\/\s*[+-]?\d+(?:\.\d+)?$/.test(s)) {
    const [nStr, dStr] = s.split('/');
    const num = parseFloat(nStr);
    const den = parseFloat(dStr);
    return den !== 0 && !Number.isNaN(num) && !Number.isNaN(den) ? num / den : NaN;
  }
  if (/^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(s)) {
    return parseFloat(s);
  }
  return NaN;
}

export function checkPartAnswer(
  userVal: string,
  part: StructuredPart,
  checker?: AnswerChecker
): boolean {
  const u = String(userVal ?? '').trim();
  const exp = part?.answer != null ? String(part.answer).trim() : '';
  if (!u || !exp) return false;

  if (checker && typeof checker.equivalent === 'function') {
    try {
      if (checker.equivalent(u, exp)) return true;
    } catch {
      // Fall through to numeric tolerance comparison
    }
  }

  const tol = typeof part.tolerances === 'number' && part.tolerances >= 0 ? part.tolerances : 1e-3;
  const uNum = parseNumericValue(u);
  const eNum = parseNumericValue(exp);
  if (!Number.isNaN(uNum) && !Number.isNaN(eNum) && Math.abs(uNum - eNum) <= Math.max(tol, 1e-6)) {
    return true;
  }

  return u.toLowerCase().replace(/\s+/g, '') === exp.toLowerCase().replace(/\s+/g, '');
}

export function computeTotalMarks(q: StructuredQuestion): number {
  if (Array.isArray(q.parts) && q.parts.length > 0) {
    const sum = q.parts.reduce((acc, p) => acc + (Number(p.marks) || 1), 0);
    return sum > 0 ? sum : Number(q.marks) || 1;
  }
  return Number(q.marks) || 1;
}

export function gradeStructuredResponse(
  q: StructuredQuestion,
  state: StructuredResponseState,
  checker?: AnswerChecker
): StructuredGradeSummary {
  const parts = Array.isArray(q.parts) ? q.parts : [];
  const totalMarks = computeTotalMarks(q);
  const partInputs = state?.partInputs || {};
  const checkedCriteria = state?.checkedCriteria || {};
  let awardedMarks = 0;
  const partResults: PartGradeResult[] = [];

  for (let pi = 0; pi < parts.length; pi++) {
    const pt = parts[pi];
    const pMarks = Number(pt.marks) || 1;
    const uVal = partInputs[pi] != null ? String(partInputs[pi]) : '';
    const autoCorrect = pt.answer ? checkPartAnswer(uVal, pt, checker) : false;
    const scheme = Array.isArray(pt.markScheme) ? pt.markScheme : [];
    let rubricSum = 0;
    let anyManualCheck = false;

    for (let ci = 0; ci < scheme.length; ci++) {
      if (checkedCriteria[`${pi}:${ci}`]) {
        anyManualCheck = true;
        rubricSum += Number(scheme[ci].marks) || 1;
      }
    }

    const earned = anyManualCheck ? Math.min(pMarks, rubricSum) : (autoCorrect ? pMarks : 0);
    awardedMarks += earned;
    partResults.push({
      index: pi,
      label: pt.label || `(${String.fromCharCode(97 + pi)})`,
      maxMarks: pMarks,
      earnedMarks: earned,
      autoCorrect,
      userAnswer: uVal,
      expectedAnswer: pt.answer || '',
    });
  }

  awardedMarks = Math.min(totalMarks, awardedMarks);
  return {
    awardedMarks,
    totalMarks,
    ratio: totalMarks > 0 ? awardedMarks / totalMarks : 0,
    isFullCredit: awardedMarks >= totalMarks,
    isPassingCredit: totalMarks > 0 ? awardedMarks / totalMarks >= 0.6 : false,
    parts: partResults,
  };
}
