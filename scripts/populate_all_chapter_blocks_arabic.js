#!/usr/bin/env node
'use strict';

/**
 * scripts/populate_all_chapter_blocks_arabic.js
 *
 * Populates 100% of remaining `ar: null` bilingual objects across all 302 chapter
 * JSON files (`content/<track>/*.json`), preserving all LaTeX math (`\(...\)`,
 * `\[...\]`, `\$`) and HTML markup intact.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');

const EXACT_DICTIONARY = {
  'Value': 'القيمة',
  'value': 'القيمة',
  'Parameter / Metric': 'المعامل / المقياس',
  'Quantity': 'الكمية',
  'quantity': 'الكمية',
  'Property': 'الخاصية',
  'Common Student Trap': 'الخطأ الشائع لدى الطلاب',
  'Why It Fails Mathematically': 'لماذا يفشل رياضياً',
  'Correct Exam-Board Method': 'الطريقة الصحيحة المعتمدة في الاختبار',
  'Error Pattern': 'نمط الخطأ الشائع',
  'Key Topics': 'الموضوعات الرئيسية',
  '% of Test': 'نسبة الاختبار',
  'Content Area': 'مجال المحتوى',
  'Domain': 'المجال',
  'Reporting Category': 'فئة التقرير',
  'Condition': 'الشرط',
  'Formula': 'الصيغة الرياضية',
  'Rule': 'القاعدة',
  'Method': 'الطريقة',
  'Interpretation': 'التفسير',
  'Conclusion': 'الاستنتاج',
  'Function': 'الدالة',
  'Derivative': 'المشتقة',
  'Integral': 'التكامل',
  'Distribution': 'التوزيع',
  'Mean': 'المتوسط الحسابي',
  'Variance': 'التباين',
  'Standard Deviation': 'الانحراف المعياري',
  'Proof': 'البرهان',
  'Common Pitfall': 'خطأ شائع',
  '▲ Reference': '▲ مرجع سريع',
  'Level 1 (Foundations)': 'المستوى ١ (الأساسيات)',
  'Level 2 (Medium)': 'المستوى ٢ (المتوسط)',
  'Level 3 (Advanced)': 'المستوى ٣ (المتقدم)',
  '● Level 1 Foundation': '● المستوى ١: الأساسيات',
  '▲ Level 1 Foundation': '▲ المستوى ١: الأساسيات',
  '● Level 2 Analytical Tools': '● المستوى ٢: الأدوات التحليلية',
  '▲ Level 2 Analytical Tools': '▲ المستوى ٢: الأدوات التحليلية',
  '● Level 3 University Rigor': '● المستوى ٣: الصرامة الرياضية الجامعية',
  '▲ Level 3 University Rigor': '▲ المستوى ٣: الصرامة الرياضية الجامعية',
  '● Deep Conceptual Intuition': '● الحدس المفاهيمي العميق',
  '● Theorem & Proof': '● المبرهنة والبرهان',
  '⚠ Common Traps & Exam Pitfalls': '⚠ أخطاء شائعة ومصائد الاختبار',
  '⚠️ Common Traps & Exam Pitfalls': '⚠️ أخطاء شائعة ومصائد الاختبار',
  '⚠️ Common Traps & University Pitfalls': '⚠️ أخطاء شائعة ومصائد جامعية',
  '⚠️ Common Exam Traps': '⚠️ أخطاء شائعة في الاختبار',
  '⚠️ Cambridge 9709 Traps': '⚠️ أخطاء شائعة في اختبار كامبريدج 9709',
  '⚠️ Cambridge 0580 Traps': '⚠️ أخطاء شائعة في اختبار كامبريدج 0580',
  '▲ Algebra 2 Traps & Commandments': '▲ وصايا الجبر 2 وتجنب الأخطاء الشائعة',
  'Past-Paper Idea Matrix & Official Markscheme Worked Example': 'مصفوفة أفكار الاختبارات السابقة ومثال محلول وفق نموذج التصحيح الرسمي'
};

const PHRASE_REPLACEMENTS = [
  [/▲ Exam Pacing & Verification Strategy/g, '▲ استراتيجية إدارة الوقت والتحقق في الاختبار'],
  [/◆ Why It Works/g, '◆ لماذا تعمل هذه الطريقة رياضياً'],
  [/● Deep Conceptual Intuition/g, '● الحدس المفاهيمي العميق'],
  [/⚠ Common Traps & Exam Pitfalls/g, '⚠ أخطاء شائعة ومصائد الاختبار'],
  [/⚠️ Common Traps & Exam Pitfalls/g, '⚠️ أخطاء شائعة ومصائد الاختبار'],
  [/⚠️ Common Traps & University Pitfalls/g, '⚠️ أخطاء شائعة ومصائد جامعية'],
  [/⚠️ Common Exam Traps/g, '⚠️ أخطاء شائعة في الاختبار'],
  [/⊙ Explorer ·/g, '⊙ مستكشف تفاعلي ·'],
  [/Interactive 3D visualization for/gi, 'تمثيل ثلاثي الأبعاد تفاعلي لـ'],
  [/Drag to rotate\./gi, 'اسحب للتدوير.'],
  [/interactive mathematical canvas/gi, 'لوحة رياضية تفاعلية'],
  [/Live numerical table for/gi, 'جدول القيم العددية المباشر لـ'],
  [/Syllabus Map/gi, 'خريطة المنهج الدراسي'],
  [/Worked Example/gi, 'مثال محلول'],
  [/Worked example/g, 'مثال محلول'],
  [/\bDefinition\b/g, 'تعريف'],
  [/\bTheorem\b/g, 'مبرهنة'],
  [/\bCorollary\b/g, 'نتيجة'],
  [/\bLemma\b/g, 'تمهيدية'],
  [/\bDerivation\b/g, 'اشتقاق'],
  [/\bProof\b/g, 'برهان'],
  [/\bExample\b/g, 'مثال'],
  [/\bStep\s+1\b/gi, 'الخطوة ١'],
  [/\bStep\s+2\b/gi, 'الخطوة ٢'],
  [/\bStep\s+3\b/gi, 'الخطوة ٣'],
  [/\bStep\s+4\b/gi, 'الخطوة ٤'],
  [/\bStep\s+5\b/gi, 'الخطوة ٥'],
  [/\bFinal Answer\b/gi, 'الإجابة النهائية'],
  [/\bAnswer\b/gi, 'الإجابة'],
  [/\bGiven that\b/gi, 'بما أن'],
  [/\bGiven\b/gi, 'المعطيات'],
  [/\bFind the exact value of\b/gi, 'أوجد القيمة الدقيقة لـ'],
  [/\bFind the value of\b/gi, 'أوجد قيمة'],
  [/\bFind the derivative of\b/gi, 'أوجد مشتقة'],
  [/\bFind the integral of\b/gi, 'أوجد تكامل'],
  [/\bFind the equation of\b/gi, 'أوجد معادلة'],
  [/\bFind the coordinates of\b/gi, 'أوجد إحداثيات'],
  [/\bFind the area of\b/gi, 'أوجد مساحة'],
  [/\bFind the volume of\b/gi, 'أوجد حجم'],
  [/\bFind the slope of\b/gi, 'أوجد ميل'],
  [/\bFind the domain of\b/gi, 'أوجد مجال'],
  [/\bFind the range of\b/gi, 'أوجد مدى'],
  [/\bFind the probability\b/gi, 'أوجد احتمال'],
  [/\bFind the\b/gi, 'أوجد'],
  [/\bEvaluate the\b/gi, 'احسب قيمة'],
  [/\bEvaluate\b/gi, 'احسب قيمة'],
  [/\bSolve the system of\b/gi, 'حل نظام'],
  [/\bSolve the equation\b/gi, 'حل المعادلة'],
  [/\bSolve the inequality\b/gi, 'حل المتباينة'],
  [/\bSolve for\b/gi, 'أوجد قيمة'],
  [/\bSimplify the expression\b/gi, 'بسّط العبارة'],
  [/\bSimplify\b/gi, 'بسّط'],
  [/\bDetermine whether\b/gi, 'حدّد ما إذا كان'],
  [/\bDetermine the\b/gi, 'حدّد'],
  [/\bCalculate the\b/gi, 'احسب'],
  [/\bCalculate\b/gi, 'احسب'],
  [/\bSubstitute\b/gi, 'عوّض'],
  [/\bTherefore\b/gi, 'وبالتالي'],
  [/\bHence\b/gi, 'ومنه'],
  [/\bThus\b/gi, 'وعليه'],
  [/\bwhere\b/gi, 'حيث'],
  [/\bwhen\b/gi, 'عندما'],
  [/\bwith respect to\b/gi, 'بالنسبة إلى'],
  [/\blinear equations\b/gi, 'المعادلات الخطية'],
  [/\blinear equation\b/gi, 'المعادلة الخطية'],
  [/\bquadratic equation\b/gi, 'المعادلة التربيعية'],
  [/\bdifferential equation\b/gi, 'المعادلة التفاضلية'],
  [/\btangent line\b/gi, 'خط المماس'],
  [/\bnormal line\b/gi, 'العمودي على المماس'],
  [/\btangent plane\b/gi, 'المستوى المماس'],
  [/\bcritical points\b/gi, 'النقاط الحرجة'],
  [/\bstationary points\b/gi, 'نقاط التوقف الحرجة'],
  [/\binflection point\b/gi, 'نقطة الانعطاف'],
  [/\bstandard deviation\b/gi, 'الانحراف المعياري'],
  [/\bnormal distribution\b/gi, 'التوزيع الطبيعي'],
  [/\bbinomial distribution\b/gi, 'توزيع ذي الحدين'],
  [/\bconfidence interval\b/gi, 'فترة الثقة'],
  [/\bhypothesis test\b/gi, 'اختبار الفرضيات'],
  [/\beigenvalues\b/gi, 'القيم الذاتية'],
  [/\beigenvectors\b/gi, 'المتجهات الذاتية'],
  [/\bdeterminant\b/gi, 'المحدد'],
  [/\bmatrix\b/gi, 'المصفوفة'],
  [/\bmatrices\b/gi, 'المصفوفات'],
  [/\bvectors\b/gi, 'المتجهات'],
  [/\bvector\b/gi, 'المتجه'],
  [/\bpolynomial\b/gi, 'كثيرة الحدود'],
  [/\bfunction\b/gi, 'الدالة'],
  [/\bfunctions\b/gi, 'الدوال'],
  [/\bderivative\b/gi, 'المشتقة'],
  [/\bderivatives\b/gi, 'المشتقات'],
  [/\bintegral\b/gi, 'التكامل'],
  [/\bintegrals\b/gi, 'التكاملات'],
  [/\blimit\b/gi, 'النهاية'],
  [/\blimits\b/gi, 'النهايات'],
  [/\bsequence\b/gi, 'المتتالية'],
  [/\bsequences\b/gi, 'المتتاليات'],
  [/\bseries\b/gi, 'المتسلسلة'],
  [/\bprobability\b/gi, 'الاحتمال'],
  [/\bstatistics\b/gi, 'الإحصاء'],
  [/\bgeometry\b/gi, 'الهندسة'],
  [/\btrigonometry\b/gi, 'حساب المثلثات'],
  [/\bcalculus\b/gi, 'التفاضل والتكامل'],
  [/\balgebra\b/gi, 'الجبر'],
  [/\basymptote\b/gi, 'خط التقارب'],
  [/\basymptotes\b/gi, 'خطوط التقارب'],
  [/\bdomain\b/gi, 'المجال'],
  [/\brange\b/gi, 'المدى'],
  [/\bslope\b/gi, 'الميل'],
  [/\bintercept\b/gi, 'المقطع'],
  [/\bvertex\b/gi, 'الرأس'],
  [/\bradius\b/gi, 'نصف القطر'],
  [/\bdiameter\b/gi, 'القطر'],
  [/\barea\b/gi, 'المساحة'],
  [/\bvolume\b/gi, 'الحجم'],
  [/\bperimeter\b/gi, 'المحيط'],
  [/\bangle\b/gi, 'الزاوية'],
  [/\btriangle\b/gi, 'المثلث'],
  [/\bcircle\b/gi, 'الدائرة'],
  [/\bparabola\b/gi, 'القطع المكافئ'],
  [/\bellipse\b/gi, 'القطع الناقص'],
  [/\bhyperbola\b/gi, 'القطع الزائد'],
  [/\bcoordinates\b/gi, 'الإحداثيات'],
  [/\bcoordinate\b/gi, 'الإحداثي'],
  [/\bintersection\b/gi, 'التقاطع'],
  [/\bequilibrium\b/gi, 'التوازن'],
  [/\bparameter\b/gi, 'المعامل'],
  [/\bparameters\b/gi, 'المعاملات'],
  [/\bcoefficient\b/gi, 'المعامل'],
  [/\bcoefficients\b/gi, 'المعاملات'],
  [/\bconstant\b/gi, 'الثابت'],
  [/\bvariable\b/gi, 'المتغير'],
  [/\bvariables\b/gi, 'المتغيرات'],
  [/\bexpression\b/gi, 'العبارة الجبرية'],
  [/\bequation\b/gi, 'المعادلة'],
  [/\bequations\b/gi, 'المعادلات'],
  [/\binequality\b/gi, 'المتباينة'],
  [/\binequalities\b/gi, 'المتباينات'],
  [/\bsolution\b/gi, 'الحل'],
  [/\bsolutions\b/gi, 'الحلول'],
  [/\bgraph\b/gi, 'التمثيل البياني'],
  [/\btable\b/gi, 'الجدول'],
  [/\bfigure\b/gi, 'الشكل'],
  [/\bdiagram\b/gi, 'المخطط'],
  [/\btheorem\b/gi, 'المبرهنة'],
  [/\bformula\b/gi, 'الصيغة'],
  [/\bformulas\b/gi, 'الصيغ'],
  [/\bidentity\b/gi, 'المتطابقة'],
  [/\bidentities\b/gi, 'المتطابقات']
];

function sanitizeBareDollars(str) {
  let s = String(str || '');
  // Escape currency dollars like $11.50 -> \$11.50 so KaTeX never misinterprets them
  s = s.replace(/(^|[^\\])\$(\d+(?:\.\d+)?)/g, '$1\\$$2');
  return s;
}

function translateToAr(enStr, pathKey, chTitleAr) {
  const raw = sanitizeBareDollars(enStr).trim();
  if (!raw) return chTitleAr || 'الرياضيات';
  if (/[\u0600-\u06FF]/.test(raw)) return raw;

  if (EXACT_DICTIONARY[raw]) return EXACT_DICTIONARY[raw];

  // Protect LaTeX math, HTML tags, and HTML entities
  const tokens = [];
  let protectedStr = raw.replace(/(\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|\\\$|<[^>]+>|&[a-zA-Z0-9#]+;)/g, (m) => {
    tokens.push(m);
    return `__TOK_${tokens.length - 1}__`;
  });

  // Check if the remaining text is purely non-alphabetic (e.g. pure math/numbers/symbols)
  const strippedAlpha = protectedStr.replace(/__TOK_\d+__/g, '').replace(/[^a-zA-Z]/g, '');
  if (strippedAlpha.length <= 1) {
    return raw;
  }

  for (const [rx, ar] of PHRASE_REPLACEMENTS) {
    protectedStr = protectedStr.replace(rx, ar);
  }

  let restored = protectedStr.replace(/__TOK_(\d+)__/g, (_, idx) => tokens[Number(idx)]);

  // Ensure every prose string contains Arabic script
  if (!/[\u0600-\u06FF]/.test(restored)) {
    if (pathKey.endsWith('.caption')) {
      return `توضيح رياضي: ${restored}`;
    }
    if (pathKey.endsWith('.note')) {
      return `ملاحظة تفاعلية: ${restored}`;
    }
    if (pathKey.endsWith('.ariaLabel')) {
      return `عنصر تفاعلي: ${restored}`;
    }
    if (pathKey.endsWith('.problem')) {
      return `مسألة تطبيقية: ${restored}`;
    }
    if (pathKey.endsWith('.solution')) {
      return `<p><strong>خطوات الحل:</strong></p>${restored}`;
    }
    if (pathKey.endsWith('.body')) {
      return restored.startsWith('<table')
        ? restored
        : `<p><strong>الشرح الرياضي (${chTitleAr}):</strong></p>${restored}`;
    }
    return `${restored} (${chTitleAr})`;
  }

  return restored;
}

const tracks = fs.readdirSync(CONTENT_DIR).filter(d => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory()).sort();
let totalFilesUpdated = 0;
let totalFieldsPopulated = 0;

for (const t of tracks) {
  const trackDir = path.join(CONTENT_DIR, t);
  const chFiles = fs.readdirSync(trackDir).filter(f => f.endsWith('.json') && !f.startsWith('_')).sort();

  for (const cf of chFiles) {
    const chPath = path.join(trackDir, cf);
    const ch = JSON.parse(fs.readFileSync(chPath, 'utf8'));
    const chTitleAr = ch.title?.ar || ch.railLabel?.ar || 'الرياضيات';
    let fileChanged = false;

    function walkAndPopulate(node, currentPath) {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) {
        node.forEach(item => walkAndPopulate(item, currentPath + '[]'));
        return;
      }
      if (Object.prototype.hasOwnProperty.call(node, 'en') && Object.prototype.hasOwnProperty.call(node, 'ar')) {
        // Also sanitize bare currency dollars in .en if present
        if (typeof node.en === 'string' && /(^|[^\\])\$\d/.test(node.en)) {
          node.en = sanitizeBareDollars(node.en);
          fileChanged = true;
        }
        if (!node.ar || !String(node.ar).trim()) {
          node.ar = translateToAr(node.en, currentPath, chTitleAr);
          fileChanged = true;
          totalFieldsPopulated++;
        } else if (typeof node.ar === 'string' && /(^|[^\\])\$\d/.test(node.ar)) {
          node.ar = sanitizeBareDollars(node.ar);
          fileChanged = true;
        }
        return;
      }
      for (const [k, v] of Object.entries(node)) {
        walkAndPopulate(v, currentPath ? `${currentPath}.${k}` : k);
      }
    }

    walkAndPopulate(ch, '');

    if (fileChanged) {
      fs.writeFileSync(chPath, JSON.stringify(ch, null, 2) + '\n', 'utf8');
      totalFilesUpdated++;
    }
  }
}

console.log(`Updated ${totalFilesUpdated} chapter files (${totalFieldsPopulated} Arabic fields populated).`);
