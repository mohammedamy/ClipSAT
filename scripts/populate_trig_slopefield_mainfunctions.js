#!/usr/bin/env node
/**
 * scripts/populate_trig_slopefield_mainfunctions.js
 *
 * Idempotently populates and wires universal interactive HTML5 Canvas explorers
 * and 100% bilingual (English + natural Arabic) explanations across all 31 tracks:
 *   1. All 6 Trigonometric Ratios (sin, cos, tan, csc, sec, cot) + All 6 Inverse
 *      Trigonometric Functions (arcsin, arccos, arctan, arccsc, arcsec, arccot)
 *      across all 24 trigonometry tracks (30 chapters).
 *   2. Interactive Slope Field, RK4 Solution & Euler Lab in Calculus (ch-diffeq
 *      upgrade + AP AB, AP BC, A2 Level, and ODEs differential equations chapters).
 *   3. All 9 Main Parent Functions (constant, linear, quadratic, cubic, absolute,
 *      radical, rational, exponential, logarithmic) across all 31 tracks (66 chapters).
 *   4. All 6 Hyperbolic & Inverse Hyperbolic Functions in Calculus tracks (8 chapters).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const EXPLORERS_DIR = path.join(ROOT, 'src', 'scripts', 'explorers');

/* ═══════════════════════════════════════════════════════════════════════════
   1. BLOCK BUILDERS (100% Schema-Compliant & Pure Bilingual EN + AR)
   ═══════════════════════════════════════════════════════════════════════════ */

function buildSixTrigCallout(slug) {
  return {
    kind: 'callout',
    id: 'cs-uge-' + slug + '-trig6-def',
    style: 'def',
    label: {
      en: '● Complete Guide to All 6 Trigonometric Ratios — Unit Circle, Reciprocals, Domains, Periods & Asymptotes',
      ar: '● الدليل الشامل للنسب المثلثية الست — دائرة الوحدة والمقلوبات والمجالات والدورات وخطوط التقارب'
    },
    body: {
      en:
        '<p>For any angle \\(\\theta\\) in standard position whose terminal ray intersects the unit circle \\(x^2 + y^2 = 1\\) at \\(P(\\cos\\theta, \\sin\\theta)\\) (or a right triangle with opposite \\(o\\), adjacent \\(a\\), and hypotenuse \\(h\\)), the <strong>six trigonometric functions</strong> are:</p>' +
        '\\[ \\sin\\theta = y = \\frac{o}{h}, \\qquad \\cos\\theta = x = \\frac{a}{h}, \\qquad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = \\frac{y}{x} = \\frac{o}{a} \\]' +
        '\\[ \\csc\\theta = \\frac{1}{\\sin\\theta} = \\frac{h}{o}, \\qquad \\sec\\theta = \\frac{1}{\\cos\\theta} = \\frac{h}{a}, \\qquad \\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta} = \\frac{x}{y} = \\frac{a}{o} \\]' +
        '<table class="exam-table" style="margin-top:8px"><thead><tr><th>Function</th><th>Domain</th><th>Range</th><th>Period</th><th>Symmetry</th><th>Vertical Asymptotes</th></tr></thead><tbody>' +
        '<tr><td>\\(\\sin\\theta\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\([-1, 1]\\)</td><td>\\(2\\pi\\)</td><td>Odd</td><td>None</td></tr>' +
        '<tr><td>\\(\\cos\\theta\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\([-1, 1]\\)</td><td>\\(2\\pi\\)</td><td>Even</td><td>None</td></tr>' +
        '<tr><td>\\(\\tan\\theta\\)</td><td>\\(\\theta \\neq \\frac{\\pi}{2} + k\\pi\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\(\\pi\\)</td><td>Odd</td><td>\\(\\theta = \\frac{\\pi}{2} + k\\pi\\)</td></tr>' +
        '<tr><td>\\(\\csc\\theta\\)</td><td>\\(\\theta \\neq k\\pi\\)</td><td>\\((-\\infty, -1] \\cup [1, \\infty)\\)</td><td>\\(2\\pi\\)</td><td>Odd</td><td>\\(\\theta = k\\pi\\)</td></tr>' +
        '<tr><td>\\(\\sec\\theta\\)</td><td>\\(\\theta \\neq \\frac{\\pi}{2} + k\\pi\\)</td><td>\\((-\\infty, -1] \\cup [1, \\infty)\\)</td><td>\\(2\\pi\\)</td><td>Even</td><td>\\(\\theta = \\frac{\\pi}{2} + k\\pi\\)</td></tr>' +
        '<tr><td>\\(\\cot\\theta\\)</td><td>\\(\\theta \\neq k\\pi\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\(\\pi\\)</td><td>Odd</td><td>\\(\\theta = k\\pi\\)</td></tr>' +
        '</tbody></table>' +
        '<p style="margin-top:8px"><strong>Pythagorean Identities:</strong> \\(\\sin^2\\theta + \\cos^2\\theta = 1\\), \\(1 + \\tan^2\\theta = \\sec^2\\theta\\), and \\(1 + \\cot^2\\theta = \\csc^2\\theta\\).</p>',
      ar:
        '<p>لأي زاوية \\(\\theta\\) في الوضع القياسي يقطع ضلع انتهائها دائرة الوحدة \\(x^2 + y^2 = 1\\) عند النقطة \\(P(\\cos\\theta, \\sin\\theta)\\) (أو في مثلث قائم الزاوية بمقابل \\(o\\) ومجاور \\(a\\) ووتر \\(h\\))، تُعرَّف <strong>الدوال المثلثية الست</strong> كما يلي:</p>' +
        '\\[ \\sin\\theta = y = \\frac{o}{h}, \\qquad \\cos\\theta = x = \\frac{a}{h}, \\qquad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} = \\frac{y}{x} = \\frac{o}{a} \\]' +
        '\\[ \\csc\\theta = \\frac{1}{\\sin\\theta} = \\frac{h}{o}, \\qquad \\sec\\theta = \\frac{1}{\\cos\\theta} = \\frac{h}{a}, \\qquad \\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta} = \\frac{x}{y} = \\frac{a}{o} \\]' +
        '<table class="exam-table" style="margin-top:8px"><thead><tr><th>الدالة</th><th>المجال</th><th>المدى</th><th>الدورة الأساسية</th><th>التماثل</th><th>خطوط التقارب الرأسية</th></tr></thead><tbody>' +
        '<tr><td>\\(\\sin\\theta\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\([-1, 1]\\)</td><td>\\(2\\pi\\)</td><td>فردية</td><td>لا يوجد</td></tr>' +
        '<tr><td>\\(\\cos\\theta\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\([-1, 1]\\)</td><td>\\(2\\pi\\)</td><td>زوجية</td><td>لا يوجد</td></tr>' +
        '<tr><td>\\(\\tan\\theta\\)</td><td>\\(\\theta \\neq \\frac{\\pi}{2} + k\\pi\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\(\\pi\\)</td><td>فردية</td><td>\\(\\theta = \\frac{\\pi}{2} + k\\pi\\)</td></tr>' +
        '<tr><td>\\(\\csc\\theta\\)</td><td>\\(\\theta \\neq k\\pi\\)</td><td>\\((-\\infty, -1] \\cup [1, \\infty)\\)</td><td>\\(2\\pi\\)</td><td>فردية</td><td>\\(\\theta = k\\pi\\)</td></tr>' +
        '<tr><td>\\(\\sec\\theta\\)</td><td>\\(\\theta \\neq \\frac{\\pi}{2} + k\\pi\\)</td><td>\\((-\\infty, -1] \\cup [1, \\infty)\\)</td><td>\\(2\\pi\\)</td><td>زوجية</td><td>\\(\\theta = \\frac{\\pi}{2} + k\\pi\\)</td></tr>' +
        '<tr><td>\\(\\cot\\theta\\)</td><td>\\(\\theta \\neq k\\pi\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\(\\pi\\)</td><td>فردية</td><td>\\(\\theta = k\\pi\\)</td></tr>' +
        '</tbody></table>' +
        '<p style="margin-top:8px"><strong>متطابقات فيثاغورس المثلثية:</strong> \\(\\sin^2\\theta + \\cos^2\\theta = 1\\)، و\\(1 + \\tan^2\\theta = \\sec^2\\theta\\)، و\\(1 + \\cot^2\\theta = \\csc^2\\theta\\).</p>'
    }
  };
}

function buildSixTrigExplorer(pfx, blockId) {
  const b = {
    kind: 'explorer',
    title: {
      en: '⊙ Explorer · All 6 Trigonometric Ratios (Unit Circle & Wave Graph)',
      ar: '⊙ مستكشف تفاعلي · النسب المثلثية الست جميعاً (دائرة الوحدة والتمثيل الموجي)'
    },
    canvasId: pfx + 'Canvas',
    ariaLabel: {
      en: 'Interactive split-view canvas showing unit circle projections on the left and the Cartesian wave graph of any of the 6 trigonometric ratios (sin, cos, tan, csc, sec, cot) on the right.',
      ar: 'لوحة تفاعلية مزدوجة تعرض إسقاطات دائرة الوحدة يساراً والتمثيل الموجي الديكارتي لأي نسبة من النسب المثلثية الست (sin, cos, tan, csc, sec, cot) يميناً.'
    },
    dataPanel: {
      btnId: pfx + 'DataBtn',
      panelId: pfx + 'DataPanel',
      descId: pfx + 'DataDesc',
      rowsId: pfx + 'DataRows',
      caption: {
        en: 'All 6 trigonometric ratios evaluated across standard benchmark angles and the active angle \\(\\theta\\).',
        ar: 'قيم النسب المثلثية الست عند الزوايا القياسية المرجعية وعند الزاوية النشطة \\(\\theta\\).'
      },
      columns: [
        { en: '\\(\\theta\\)', ar: '\\(\\theta\\)' },
        { en: '\\(\\sin\\theta\\)', ar: '\\(\\sin\\theta\\)' },
        { en: '\\(\\cos\\theta\\)', ar: '\\(\\cos\\theta\\)' },
        { en: '\\(\\tan\\theta\\)', ar: '\\(\\tan\\theta\\)' },
        { en: '\\(\\csc\\theta\\)', ar: '\\(\\csc\\theta\\)' },
        { en: '\\(\\sec\\theta\\)', ar: '\\(\\sec\\theta\\)' },
        { en: '\\(\\cot\\theta\\)', ar: '\\(\\cot\\theta\\)' }
      ]
    },
    controls: [
      {
        id: pfx + 'Fn',
        label: {
          en: 'Select trig ratio:',
          ar: 'اختر النسبة المثلثية:'
        },
        value: 'sin',
        options: [
          { value: 'sin', label: 'sin θ = y (Opposite / Hypotenuse)', selected: true },
          { value: 'cos', label: 'cos θ = x (Adjacent / Hypotenuse)' },
          { value: 'tan', label: 'tan θ = sin θ / cos θ (Opposite / Adjacent)' },
          { value: 'csc', label: 'csc θ = 1 / sin θ (Hypotenuse / Opposite)' },
          { value: 'sec', label: 'sec θ = 1 / cos θ (Hypotenuse / Adjacent)' },
          { value: 'cot', label: 'cot θ = cos θ / sin θ (Adjacent / Opposite)' }
        ],
        ariaLabel: {
          en: 'Select trigonometric function to graph',
          ar: 'اختر الدالة المثلثية لتمثيلها بيانياً'
        }
      },
      {
        id: pfx + 'Theta',
        label: {
          en: 'Angle <b>\\(\\theta\\)</b>:',
          ar: 'الزاوية <b>\\(\\theta\\)</b>:'
        },
        min: -360,
        max: 360,
        value: 60,
        step: 5,
        valueDisplayId: pfx + 'ThetaV',
        valueDisplay: '60°',
        ariaLabel: {
          en: 'Angle theta in degrees',
          ar: 'الزاوية ثيتا بالدرجات'
        }
      },
      {
        id: pfx + 'Amp',
        label: {
          en: 'Amplitude / Scale <b>\\(A\\)</b>:',
          ar: 'السعة / المعامل الرأسي <b>\\(A\\)</b>:'
        },
        min: 0.5,
        max: 2.5,
        value: 1,
        step: 0.25,
        valueDisplayId: pfx + 'AmpV',
        valueDisplay: '1.00',
        ariaLabel: {
          en: 'Amplitude scale A',
          ar: 'معامل السعة الرأسي A'
        }
      },
      {
        id: pfx + 'Freq',
        label: {
          en: 'Frequency <b>\\(B\\)</b>:',
          ar: 'معامل التردد <b>\\(B\\)</b>:'
        },
        min: 0.5,
        max: 3,
        value: 1,
        step: 0.5,
        valueDisplayId: pfx + 'FreqV',
        valueDisplay: '1.00',
        ariaLabel: {
          en: 'Frequency multiplier B',
          ar: 'معامل التردد الزاوي B'
        }
      }
    ],
    readouts: [
      { id: pfx + 'Sin', label: { en: '\\(A\\sin(B\\theta)\\)', ar: '\\(A\\sin(B\\theta)\\)' }, colorClass: 'amber', value: '0.866' },
      { id: pfx + 'Cos', label: { en: '\\(A\\cos(B\\theta)\\)', ar: '\\(A\\cos(B\\theta)\\)' }, colorClass: 'indigo', value: '0.500' },
      { id: pfx + 'Tan', label: { en: '\\(A\\tan(B\\theta)\\)', ar: '\\(A\\tan(B\\theta)\\)' }, value: '1.732' },
      { id: pfx + 'Csc', label: { en: '\\(A\\csc(B\\theta)\\)', ar: '\\(A\\csc(B\\theta)\\)' }, colorClass: 'amber', value: '1.155' },
      { id: pfx + 'Sec', label: { en: '\\(A\\sec(B\\theta)\\)', ar: '\\(A\\sec(B\\theta)\\)' }, colorClass: 'indigo', value: '2.000' },
      { id: pfx + 'Cot', label: { en: '\\(A\\cot(B\\theta)\\)', ar: '\\(A\\cot(B\\theta)\\)' }, value: '0.577' }
    ],
    note: {
      en: 'Click or drag directly on either the unit circle (left) or the wave graph (right) to sweep \\(\\theta\\), switch among all 6 ratios (\\(\\sin, \\cos, \\tan, \\csc, \\sec, \\cot\\)), and observe how reciprocal curves bounce off \\(\\sin\\)/\\(\\cos\\) extrema and form vertical asymptotes at zeros.',
      ar: 'انقر أو اسحب مباشرة على دائرة الوحدة (يساراً) أو التمثيل الموجي (يميناً) لتحريك الزاوية \\(\\theta\\)، وبدّل بين النسب المثلثية الست جميعاً لملاحظة كيف ترتد منحنيات المقلوبات عند القيم القصوى وتكوّن خطوط تقارب رأسية عند الأصفار.'
    }
  };
  if (blockId) b.id = blockId;
  return b;
}

function buildSixInvTrigCallout(slug, isCalc) {
  const derivHeaderEn = isCalc ? '<th>Derivative \\(\\frac{d}{dx}f^{-1}(x)\\)</th>' : '<th>Unit Circle Quadrants</th>';
  const derivHeaderAr = isCalc ? '<th>المشتقة \\(\\frac{d}{dx}f^{-1}(x)\\)</th>' : '<th>أرباع دائرة الوحدة</th>';
  return {
    kind: 'callout',
    id: 'cs-uge-' + slug + '-invtrig6-def',
    style: 'thm',
    label: {
      en: isCalc
        ? '● All 6 Inverse Trigonometric Functions — Principal Branches, Domains, Ranges & Derivatives'
        : '● All 6 Inverse Trigonometric Functions — Restricted Domains & Principal Ranges',
      ar: isCalc
        ? '● الدوال المثلثية العكسية الست جميعاً — الفروع الأساسية والمجالات والمدى والمشتقات'
        : '● الدوال المثلثية العكسية الست جميعاً — المجالات المقيدة والمدى الأساسي'
    },
    body: {
      en:
        '<p>Because the six trigonometric functions are periodic, they are not one-to-one on \\(\\mathbb{R}\\). Restricting each forward function to its canonical <strong>principal branch</strong> makes it strictly monotonic so that a unique inverse exists (whose graph is the reflection of the restricted branch across \\(y = x\\)):</p>' +
        '<table class="exam-table" style="margin-top:6px"><thead><tr><th>Inverse Function</th><th>Equivalent Statement</th><th>Domain of \\(f^{-1}(x)\\)</th><th>Principal Range (Radians)</th>' + derivHeaderEn + '</tr></thead><tbody>' +
        '<tr><td>\\(y = \\arcsin x = \\sin^{-1} x\\)</td><td>\\(\\sin y = x\\)</td><td>\\([-1, 1]\\)</td><td>\\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\)</td><td>' + (isCalc ? '\\(\\dfrac{1}{\\sqrt{1 - x^2}}\\)' : 'Quadrants IV &amp; I') + '</td></tr>' +
        '<tr><td>\\(y = \\arccos x = \\cos^{-1} x\\)</td><td>\\(\\cos y = x\\)</td><td>\\([-1, 1]\\)</td><td>\\([0, \\pi]\\)</td><td>' + (isCalc ? '\\(-\\dfrac{1}{\\sqrt{1 - x^2}}\\)' : 'Quadrants I &amp; II') + '</td></tr>' +
        '<tr><td>\\(y = \\arctan x = \\tan^{-1} x\\)</td><td>\\(\\tan y = x\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\(\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)\\)</td><td>' + (isCalc ? '\\(\\dfrac{1}{1 + x^2}\\)' : 'Quadrants IV &amp; I') + '</td></tr>' +
        '<tr><td>\\(y = \\operatorname{arccsc} x = \\csc^{-1} x\\)</td><td>\\(\\csc y = x\\)</td><td>\\((-\\infty, -1] \\cup [1, \\infty)\\)</td><td>\\(\\left[-\\frac{\\pi}{2}, 0\\right) \\cup \\left(0, \\frac{\\pi}{2}\\right]\\)</td><td>' + (isCalc ? '\\(-\\dfrac{1}{|x|\\sqrt{x^2 - 1}}\\)' : 'Quadrants IV &amp; I') + '</td></tr>' +
        '<tr><td>\\(y = \\operatorname{arcsec} x = \\sec^{-1} x\\)</td><td>\\(\\sec y = x\\)</td><td>\\((-\\infty, -1] \\cup [1, \\infty)\\)</td><td>\\(\\left[0, \\frac{\\pi}{2}\\right) \\cup \\left(\\frac{\\pi}{2}, \\pi\\right]\\)</td><td>' + (isCalc ? '\\(\\dfrac{1}{|x|\\sqrt{x^2 - 1}}\\)' : 'Quadrants I &amp; II') + '</td></tr>' +
        '<tr><td>\\(y = \\operatorname{arccot} x = \\cot^{-1} x\\)</td><td>\\(\\cot y = x\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\((0, \\pi)\\)</td><td>' + (isCalc ? '\\(-\\dfrac{1}{1 + x^2}\\)' : 'Quadrants I &amp; II') + '</td></tr>' +
        '</tbody></table>' +
        '<p style="margin-top:8px"><strong>Reciprocal &amp; Cofunction Identities:</strong> \\(\\operatorname{arccsc}(x) = \\arcsin(1/x)\\) and \\(\\operatorname{arcsec}(x) = \\arccos(1/x)\\) for \\(|x| \\ge 1\\); \\(\\arcsin x + \\arccos x = \\frac{\\pi}{2}\\) and \\(\\arctan x + \\operatorname{arccot} x = \\frac{\\pi}{2}\\).</p>',
      ar:
        '<p>نظراً لأن الدوال المثلثية الست دورية، فإنها ليست متباينة (واحداً لواحد) على \\(\\mathbb{R}\\). بتقييد مجال كل دالة إلى <strong>فرعها الأساسي</strong> تصبح رتيبة تماماً وقابلة للعكس، ويكون تمثيل الدالة العكسية انعكاساً للفرع المقيّد حول المستقيم \\(y = x\\):</p>' +
        '<table class="exam-table" style="margin-top:6px"><thead><tr><th>الدالة العكسية</th><th>الصيغة المكافئة</th><th>مجال \\(f^{-1}(x)\\)</th><th>المدى الأساسي (بالراديان)</th>' + derivHeaderAr + '</tr></thead><tbody>' +
        '<tr><td>\\(y = \\arcsin x = \\sin^{-1} x\\)</td><td>\\(\\sin y = x\\)</td><td>\\([-1, 1]\\)</td><td>\\(\\left[-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right]\\)</td><td>' + (isCalc ? '\\(\\dfrac{1}{\\sqrt{1 - x^2}}\\)' : 'الربعان الرابع والأول') + '</td></tr>' +
        '<tr><td>\\(y = \\arccos x = \\cos^{-1} x\\)</td><td>\\(\\cos y = x\\)</td><td>\\([-1, 1]\\)</td><td>\\([0, \\pi]\\)</td><td>' + (isCalc ? '\\(-\\dfrac{1}{\\sqrt{1 - x^2}}\\)' : 'الربعان الأول والثاني') + '</td></tr>' +
        '<tr><td>\\(y = \\arctan x = \\tan^{-1} x\\)</td><td>\\(\\tan y = x\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\(\\left(-\\frac{\\pi}{2}, \\frac{\\pi}{2}\\right)\\)</td><td>' + (isCalc ? '\\(\\dfrac{1}{1 + x^2}\\)' : 'الربعان الرابع والأول') + '</td></tr>' +
        '<tr><td>\\(y = \\operatorname{arccsc} x = \\csc^{-1} x\\)</td><td>\\(\\csc y = x\\)</td><td>\\((-\\infty, -1] \\cup [1, \\infty)\\)</td><td>\\(\\left[-\\frac{\\pi}{2}, 0\\right) \\cup \\left(0, \\frac{\\pi}{2}\\right]\\)</td><td>' + (isCalc ? '\\(-\\dfrac{1}{|x|\\sqrt{x^2 - 1}}\\)' : 'الربعان الرابع والأول') + '</td></tr>' +
        '<tr><td>\\(y = \\operatorname{arcsec} x = \\sec^{-1} x\\)</td><td>\\(\\sec y = x\\)</td><td>\\((-\\infty, -1] \\cup [1, \\infty)\\)</td><td>\\(\\left[0, \\frac{\\pi}{2}\\right) \\cup \\left(\\frac{\\pi}{2}, \\pi\\right]\\)</td><td>' + (isCalc ? '\\(\\dfrac{1}{|x|\\sqrt{x^2 - 1}}\\)' : 'الربعان الأول والثاني') + '</td></tr>' +
        '<tr><td>\\(y = \\operatorname{arccot} x = \\cot^{-1} x\\)</td><td>\\(\\cot y = x\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\((0, \\pi)\\)</td><td>' + (isCalc ? '\\(-\\dfrac{1}{1 + x^2}\\)' : 'الربعان الأول والثاني') + '</td></tr>' +
        '</tbody></table>' +
        '<p style="margin-top:8px"><strong>متطابقات المقلوبات والدوال المتممة:</strong> \\(\\operatorname{arccsc}(x) = \\arcsin(1/x)\\) و\\(\\operatorname{arcsec}(x) = \\arccos(1/x)\\) لكل \\(|x| \\ge 1\\)؛ وكذلك \\(\\arcsin x + \\arccos x = \\frac{\\pi}{2}\\) و\\(\\arctan x + \\operatorname{arccot} x = \\frac{\\pi}{2}\\).</p>'
    }
  };
}

function buildSixInvTrigExplorer(pfx, blockId, isCalc) {
  const readouts = [
    { id: pfx + 'XOut', label: { en: 'Input \\(x\\)', ar: 'المدخل \\(x\\)' }, value: '0.500' },
    { id: pfx + 'RadOut', label: { en: '\\(\\theta = f^{-1}(x)\\) (rad)', ar: '\\(\\theta = f^{-1}(x)\\) (راديان)' }, colorClass: 'amber', value: '0.524 rad' },
    { id: pfx + 'DegOut', label: { en: '\\(\\theta = f^{-1}(x)\\) (deg)', ar: '\\(\\theta = f^{-1}(x)\\) (درجات)' }, colorClass: 'indigo', value: '30.0°' },
    { id: pfx + 'DomOut', label: { en: 'Domain of \\(f^{-1}\\)', ar: 'مجال \\(f^{-1}\\)' }, value: '[−1, 1]' },
    { id: pfx + 'RangeOut', label: { en: 'Principal Range', ar: 'المدى الأساسي' }, value: '[−π/2, π/2] (−90° to 90°)' },
    { id: pfx + 'CheckOut', label: { en: 'Identity Check \\(f(f^{-1}(x))\\)', ar: 'تحقق المتطابقة \\(f(f^{-1}(x))\\)' }, value: 'sin(0.52) = 0.500' }
  ];
  if (isCalc) {
    readouts.push({
      id: pfx + 'DerivOut',
      label: { en: 'Derivative \\(\\frac{d}{dx}f^{-1}(x)\\)', ar: 'المشتقة \\(\\frac{d}{dx}f^{-1}(x)\\)' },
      colorClass: 'amber',
      value: '1.155  [1 / √(1 − x²)]'
    });
  }
  const b = {
    kind: 'explorer',
    title: {
      en: '⊙ Explorer · All 6 Inverse Trigonometric Functions (Principal Branches & Reflection Across \\(y = x\\))',
      ar: '⊙ مستكشف تفاعلي · الدوال المثلثية العكسية الست (الفروع الأساسية والانعكاس حول \\(y = x\\))'
    },
    canvasId: pfx + 'Canvas',
    ariaLabel: {
      en: 'Interactive graph showing any of the 6 inverse trigonometric functions (arcsin, arccos, arctan, arccsc, arcsec, arccot) alongside its restricted forward branch, mirror line y = x, and unit circle principal range arc.',
      ar: 'تمثيل بياني تفاعلي يعرض أياً من الدوال المثلثية العكسية الست مع فرعها الأصلي المقيد ومستقيم الانعكاس y = x وقوس المدى الأساسي على دائرة الوحدة.'
    },
    dataPanel: {
      btnId: pfx + 'DataBtn',
      panelId: pfx + 'DataPanel',
      descId: pfx + 'DataDesc',
      rowsId: pfx + 'DataRows',
      caption: {
        en: 'Principal branch evaluations for the selected inverse trigonometric function.',
        ar: 'قيم الفرع الأساسي للدالة المثلثية العكسية المختارة.'
      },
      columns: [
        { en: 'Input \\(x\\)', ar: 'المدخل \\(x\\)' },
        { en: '\\(\\theta = f^{-1}(x)\\) (rad)', ar: '\\(\\theta = f^{-1}(x)\\) (راديان)' },
        { en: '\\(\\theta = f^{-1}(x)\\) (deg)', ar: '\\(\\theta = f^{-1}(x)\\) (درجات)' },
        { en: 'Reflected Point on \\(f\\)', ar: 'النقطة المنعكسة على \\(f\\)' }
      ]
    },
    controls: [
      {
        id: pfx + 'Fn',
        label: {
          en: 'Select inverse function:',
          ar: 'اختر الدالة العكسية:'
        },
        value: 'arcsin',
        options: [
          { value: 'arcsin', label: 'y = arcsin(x) = sin⁻¹(x)  |  Domain [−1, 1], Range [−π/2, π/2]', selected: true },
          { value: 'arccos', label: 'y = arccos(x) = cos⁻¹(x)  |  Domain [−1, 1], Range [0, π]' },
          { value: 'arctan', label: 'y = arctan(x) = tan⁻¹(x)  |  Domain (−∞, ∞), Range (−π/2, π/2)' },
          { value: 'arccsc', label: 'y = arccsc(x) = csc⁻¹(x)  |  Domain |x| ≥ 1, Range [−π/2, 0) ∪ (0, π/2]' },
          { value: 'arcsec', label: 'y = arcsec(x) = sec⁻¹(x)  |  Domain |x| ≥ 1, Range [0, π/2) ∪ (π/2, π]' },
          { value: 'arccot', label: 'y = arccot(x) = cot⁻¹(x)  |  Domain (−∞, ∞), Range (0, π)' }
        ],
        ariaLabel: {
          en: 'Select inverse trigonometric function',
          ar: 'اختر الدالة المثلثية العكسية'
        }
      },
      {
        id: pfx + 'X',
        label: {
          en: 'Input value <b>\\(x\\)</b>:',
          ar: 'قيمة المدخل <b>\\(x\\)</b>:'
        },
        min: -3,
        max: 3,
        value: 0.5,
        step: 0.05,
        valueDisplayId: pfx + 'XV',
        valueDisplay: '0.50',
        ariaLabel: {
          en: 'Input value x for inverse trigonometric function',
          ar: 'قيمة المدخل x للدالة المثلثية العكسية'
        }
      }
    ],
    readouts: readouts,
    note: {
      en: 'Drag horizontally on the Cartesian plane or slide \\(x\\) to compare all 6 inverse trig functions (\\(\\arcsin, \\arccos, \\arctan, \\operatorname{arccsc}, \\operatorname{arcsec}, \\operatorname{arccot}\\)). The amber curve \\(y = f^{-1}(x)\\) reflects the dashed restricted branch across \\(y = x\\), while the right pane highlights the exact principal-angle arc on the unit circle.',
      ar: 'اسحب أفقياً على المستوى الديكارتي أو حرّك المنزلق \\(x\\) للمقارنة بين الدوال المثلثية العكسية الست جميعاً. يمثل المنحنى الكهرماني \\(y = f^{-1}(x)\\) انعكاس الفرع المقيّد المتقطع حول \\(y = x\\)، بينما يبرز الجزء الأيمن قوس المدى الأساسي على دائرة الوحدة.'
    }
  };
  if (blockId) b.id = blockId;
  return b;
}

function buildSlopeFieldExplorer(pfx, blockId, defaultFn) {
  const def = defaultFn || 'xmy';
  const opts = [
    { value: 'xmy', label: 'dy/dx = x − y  (Linear ODE → asymptote y = x − 1)' },
    { value: 'y', label: 'dy/dx = y  (Exponential growth y = C·eˣ)' },
    { value: 'x', label: 'dy/dx = x  (Antiderivative parabolas y = ½x² + C)' },
    { value: 'logistic', label: 'dy/dx = 0.5y(1 − y/3)  (Logistic carrying capacity M = 3)' },
    { value: 'parab', label: 'dy/dx = 0.3x² − 0.6y  (Parabolic nullcline)' },
    { value: 'sin', label: 'dy/dx = sin(x) − 0.5y  (Driven sinusoidal ODE)' },
    { value: 'circle', label: 'dy/dx = −x / y  (Implicit circles x² + y² = R²)' }
  ].map(o => (o.value === def ? Object.assign({}, o, { selected: true }) : o));

  const b = {
    kind: 'explorer',
    title: {
      en: '⊙ Explorer · Interactive Slope Field, Particular Solution & Euler Lab',
      ar: '⊙ مستكشف تفاعلي · حقل الميول والحل الخاص وطريقة أويلر العددية'
    },
    canvasId: pfx + 'Canvas',
    ariaLabel: {
      en: 'Interactive slope field where clicking or dragging moves the initial condition (x0, y0), plotting the exact RK4 solution curve, Euler polygonal approximation, and zero-slope nullcline.',
      ar: 'حقل ميول تفاعلي يتيح النقر أو السحب لتحريك الشرط الابتدائي (x0, y0) ورسم منحنى الحل الدقيق وتقريب أويلر المضلع ومنحنى الميل الصفري.'
    },
    dataPanel: {
      btnId: pfx + 'DataBtn',
      panelId: pfx + 'DataPanel',
      descId: pfx + 'DataDesc',
      rowsId: pfx + 'DataRows',
      caption: {
        en: 'Sampled points and slopes along the solution curve passing through \\((x_0, y_0)\\).',
        ar: 'نقاط وميول مختارة على طول منحنى الحل المار بالنقطة \\((x_0, y_0)\\).'
      },
      columns: [
        { en: '\\(x\\)', ar: '\\(x\\)' },
        { en: '\\(y(x)\\) (RK4)', ar: '\\(y(x)\\) (الحل)' },
        { en: 'Slope \\(f(x, y)\\)', ar: 'الميل \\(f(x, y)\\)' }
      ]
    },
    controls: [
      {
        id: pfx + 'Fn',
        label: {
          en: 'Differential Equation:',
          ar: 'المعادلة التفاضلية:'
        },
        value: def,
        options: opts,
        ariaLabel: {
          en: 'Select differential equation dy/dx = f(x, y)',
          ar: 'اختر المعادلة التفاضلية dy/dx = f(x, y)'
        }
      },
      {
        id: pfx + 'X0',
        label: {
          en: 'Initial <b>\\(x_0 =\\)</b>',
          ar: 'الإحداثي الابتدائي <b>\\(x_0 =\\)</b>'
        },
        min: -3.5,
        max: 3.5,
        value: 0,
        step: 0.5,
        valueDisplayId: pfx + 'X0v',
        valueDisplay: '0.0',
        ariaLabel: {
          en: 'Initial x0 coordinate',
          ar: 'الإحداثي السيني الابتدائي x0'
        }
      },
      {
        id: pfx + 'Y0',
        label: {
          en: 'Initial <b>\\(y_0 =\\)</b>',
          ar: 'القيمة الابتدائية <b>\\(y_0 =\\)</b>'
        },
        min: -3.5,
        max: 3.5,
        value: 1,
        step: 0.5,
        valueDisplayId: pfx + 'Y0v',
        valueDisplay: '1.0',
        ariaLabel: {
          en: 'Initial y0 value',
          ar: 'القيمة الابتدائية y0'
        }
      },
      {
        id: pfx + 'H',
        label: {
          en: 'Euler step <b>\\(h =\\)</b>',
          ar: 'خطوة أويلر <b>\\(h =\\)</b>'
        },
        min: 0.1,
        max: 1.0,
        value: 0.5,
        step: 0.1,
        valueDisplayId: pfx + 'Hv',
        valueDisplay: '0.50',
        ariaLabel: {
          en: 'Euler step size h',
          ar: 'طول خطوة طريقة أويلر h'
        }
      },
      {
        id: pfx + 'Euler',
        checkbox: true,
        checked: true,
        label: {
          en: 'Show Euler polygonal approximation',
          ar: 'إظهار تقريب أويلر المضلع'
        },
        ariaLabel: {
          en: 'Toggle Euler approximation curve',
          ar: 'تفعيل أو إخفاء منحنى تقريب أويلر'
        }
      },
      {
        id: pfx + 'Null',
        checkbox: true,
        checked: true,
        label: {
          en: 'Highlight zero-slope nullcline (\\(dy/dx = 0\\))',
          ar: 'إبراز منحنى الميل الصفري (\\(dy/dx = 0\\))'
        },
        ariaLabel: {
          en: 'Toggle zero-slope nullcline',
          ar: 'تفعيل أو إخفاء منحنى الميل الصفري'
        }
      }
    ],
    readouts: [
      { id: pfx + 'Eq', label: { en: 'Active ODE', ar: 'المعادلة التفاضلية' }, value: 'dy/dx = x − y' },
      { id: pfx + 'Pt', label: { en: 'Initial point &amp; slope', ar: 'النقطة الابتدائية والميل' }, colorClass: 'indigo', value: '(0.00, 1.00)  |  slope m₀ = −1.000' },
      { id: pfx + 'Note', label: { en: 'Qualitative behavior', ar: 'السلوك النوعي للحل' }, colorClass: 'amber', value: 'Approaches linear asymptote y = x − 1 as x → ∞' },
      { id: pfx + 'Err', label: { en: 'RK4 vs. Euler at \\(x_0 + 1\\)', ar: 'مقارنة الحل الدقيق بأويلر عند \\(x_0 + 1\\)' }, value: '—' }
    ],
    note: {
      en: 'Click or drag anywhere on the slope field to move \\((x_0, y_0)\\) in real time, and <strong>double-click</strong> to pin multiple family curves for side-by-side comparison. Decrease step \\(h\\) to watch the dashed teal Euler approximation converge to the amber solution curve.',
      ar: 'انقر أو اسحب في أي موضع على حقل الميول لتحريك النقطة الابتدائية \\((x_0, y_0)\\) مباشرة، و<strong>انقر مرتين</strong> لتثبيت عدة منحنيات من عائلة الحلول للمقارنة. قلّل طول الخطوة \\(h\\) لملاحظة تقارب مضلع أويلر المتقطع من منحنى الحل الكهرماني الدقيق.'
    }
  };
  if (blockId) b.id = blockId;
  return b;
}

function buildMainFunctionsCallout(slug) {
  return {
    kind: 'callout',
    id: 'cs-uge-' + slug + '-mainfn-def',
    style: 'def',
    label: {
      en: '● Master Atlas of the 9 Main Parent Functions & Universal Transformation Law',
      ar: '● الأطلس الشامل للدوال الأم التسع وقانون التحويلات الهندسية العام'
    },
    body: {
      en:
        '<p>Every algebraic and elementary transcendental model is built by transforming one of the <strong>nine core parent functions</strong> via \\(g(x) = a\\,f(x - h) + k\\), where \\(|a|\\) scales vertically (reflecting across the \\(x\\)-axis if \\(a < 0\\)), \\(h\\) shifts horizontally, and \\(k\\) shifts vertically:</p>' +
        '<table class="exam-table" style="margin-top:6px"><thead><tr><th>Family</th><th>Transformed Form \\(g(x)\\)</th><th>Domain</th><th>Range (\\(a > 0\\))</th><th>Key Geometric Feature</th></tr></thead><tbody>' +
        '<tr><td><strong>Constant</strong></td><td>\\(f(x) = c\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\(\\{c\\}\\)</td><td>Horizontal line, slope \\(0\\)</td></tr>' +
        '<tr><td><strong>Linear</strong></td><td>\\(a(x - h) + k\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>Constant slope \\(m = a\\), pivot \\((h, k)\\)</td></tr>' +
        '<tr><td><strong>Quadratic</strong></td><td>\\(a(x - h)^2 + k\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\([k, \\infty)\\)</td><td>Parabola vertex \\((h, k)\\), axis \\(x = h\\)</td></tr>' +
        '<tr><td><strong>Cubic</strong></td><td>\\(a(x - h)^3 + k\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>Inflection center \\((h, k)\\), S-curve</td></tr>' +
        '<tr><td><strong>Absolute Value</strong></td><td>\\(a|x - h| + k\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\([k, \\infty)\\)</td><td>V-corner vertex \\((h, k)\\), slopes \\(\\pm a\\)</td></tr>' +
        '<tr><td><strong>Radical</strong></td><td>\\(a\\sqrt{x - h} + k\\)</td><td>\\([h, \\infty)\\)</td><td>\\([k, \\infty)\\)</td><td>Endpoint \\((h, k)\\), half-parabola</td></tr>' +
        '<tr><td><strong>Rational</strong></td><td>\\(\\dfrac{a}{x - h} + k\\)</td><td>\\(x \\neq h\\)</td><td>\\(y \\neq k\\)</td><td>Vertical asymptote \\(x = h\\), horizontal \\(y = k\\)</td></tr>' +
        '<tr><td><strong>Exponential</strong></td><td>\\(a \\cdot 2^{x - h} + k\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\((k, \\infty)\\)</td><td>Horizontal asymptote \\(y = k\\), anchor \\((h, a+k)\\)</td></tr>' +
        '<tr><td><strong>Logarithmic</strong></td><td>\\(a\\ln(x - h) + k\\)</td><td>\\((h, \\infty)\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>Vertical asymptote \\(x = h\\), anchor \\((h+1, k)\\)</td></tr>' +
        '</tbody></table>',
      ar:
        '<p>تُبنى النماذج الجبرية والمتسامية الأساسية من خلال تطبيق التحويل القياسي \\(g(x) = a\\,f(x - h) + k\\) على إحدى <strong>الدوال الأم التسع</strong>، حيث يتحكم \\(|a|\\) في التمدد الرأسي (مع انعكاس حول محور السينات إذا كان \\(a < 0\\))، ويمثل \\(h\\) الإزاحة الأفقية، و\\(k\\) الإزاحة الرأسية:</p>' +
        '<table class="exam-table" style="margin-top:6px"><thead><tr><th>عائلة الدالة</th><th>الصورة المحوّلة \\(g(x)\\)</th><th>المجال</th><th>المدى (\\(a > 0\\))</th><th>السمة الهندسية المميزة</th></tr></thead><tbody>' +
        '<tr><td><strong>الثابتة</strong></td><td>\\(f(x) = c\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\(\\{c\\}\\)</td><td>مستقيم أفقي ميله \\(0\\)</td></tr>' +
        '<tr><td><strong>الخطية</strong></td><td>\\(a(x - h) + k\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>ميل ثابت \\(m = a\\) ونقطة ارتكاز \\((h, k)\\)</td></tr>' +
        '<tr><td><strong>التربيعية</strong></td><td>\\(a(x - h)^2 + k\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\([k, \\infty)\\)</td><td>قطع مكافئ رأسه \\((h, k)\\) ومحوره \\(x = h\\)</td></tr>' +
        '<tr><td><strong>التكعيبية</strong></td><td>\\(a(x - h)^3 + k\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>نقطة انعطاف مركزية \\((h, k)\\)</td></tr>' +
        '<tr><td><strong>القيمة المطلقة</strong></td><td>\\(a|x - h| + k\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\([k, \\infty)\\)</td><td>رأس زاوي على شكل V عند \\((h, k)\\) بميلين \\(\\pm a\\)</td></tr>' +
        '<tr><td><strong>الجذرية</strong></td><td>\\(a\\sqrt{x - h} + k\\)</td><td>\\([h, \\infty)\\)</td><td>\\([k, \\infty)\\)</td><td>نقطة بداية \\((h, k)\\) ومجال مقيّد \\(x \\ge h\\)</td></tr>' +
        '<tr><td><strong>النسبية (المقلوب)</strong></td><td>\\(\\dfrac{a}{x - h} + k\\)</td><td>\\(x \\neq h\\)</td><td>\\(y \\neq k\\)</td><td>تقارب رأسي \\(x = h\\) وتقارب أفقي \\(y = k\\)</td></tr>' +
        '<tr><td><strong>الأسية</strong></td><td>\\(a \\cdot 2^{x - h} + k\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>\\((k, \\infty)\\)</td><td>تقارب أفقي \\(y = k\\) ونقطة ارتكاز \\((h, a+k)\\)</td></tr>' +
        '<tr><td><strong>اللوغاريتمية</strong></td><td>\\(a\\ln(x - h) + k\\)</td><td>\\((h, \\infty)\\)</td><td>\\((-\\infty, \\infty)\\)</td><td>تقارب رأسي \\(x = h\\) ونقطة ارتكاز \\((h+1, k)\\)</td></tr>' +
        '</tbody></table>'
    }
  };
}

function buildMainFunctionsExplorer(pfx, blockId, defaultFn) {
  const def = defaultFn || 'quadratic';
  const rawOpts = [
    { value: 'constant', label: 'Constant:  f(x) = c' },
    { value: 'linear', label: 'Linear:  f(x) = a(x − h) + k' },
    { value: 'quadratic', label: 'Quadratic:  f(x) = a(x − h)² + k' },
    { value: 'cubic', label: 'Cubic:  f(x) = a(x − h)³ + k' },
    { value: 'absolute', label: 'Absolute Value:  f(x) = a|x − h| + k' },
    { value: 'radical', label: 'Radical (Square Root):  f(x) = a√(x − h) + k' },
    { value: 'rational', label: 'Rational (Reciprocal):  f(x) = a/(x − h) + k' },
    { value: 'exponential', label: 'Exponential:  f(x) = a · 2^(x − h) + k' },
    { value: 'logarithmic', label: 'Logarithmic:  f(x) = a · ln(x − h) + k' }
  ];
  const opts = rawOpts.map(o => (o.value === def ? Object.assign({}, o, { selected: true }) : o));

  return {
    kind: 'explorer',
    id: blockId,
    title: {
      en: '⊙ Explorer · Interactive Main Functions & Transformations Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر الدوال الأم التسع والتحويلات الهندسية'
    },
    canvasId: pfx + 'Canvas',
    ariaLabel: {
      en: 'Interactive Cartesian grapher for all 9 main parent functions (constant, linear, quadratic, cubic, absolute, radical, rational, exponential, logarithmic) with draggable anchor (h, k) and scale slider a.',
      ar: 'راسم بياني تفاعلي للدوال الأم التسع جميعاً (الثابتة، الخطية، التربيعية، التكعيبية، القيمة المطلقة، الجذرية، النسبية، الأسية، اللوغاريتمية) مع سحب مباشر للنقطة المحورية (h, k) ومعامل التمدد a.'
    },
    dataPanel: {
      btnId: pfx + 'DataBtn',
      panelId: pfx + 'DataPanel',
      descId: pfx + 'DataDesc',
      rowsId: pfx + 'DataRows',
      caption: {
        en: 'Comparison of parent function \\(f(x)\\) and transformed function \\(g(x) = a\\,f(x - h) + k\\) across integer inputs.',
        ar: 'مقارنة قيم الدالة الأم \\(f(x)\\) والدالة المحوّلة \\(g(x) = a\\,f(x - h) + k\\) عند مدخلات صحيحة.'
      },
      columns: [
        { en: '\\(x\\)', ar: '\\(x\\)' },
        { en: 'Parent \\(f(x)\\)', ar: 'الدالة الأم \\(f(x)\\)' },
        { en: 'Transformed \\(g(x)\\)', ar: 'الدالة المحوّلة \\(g(x)\\)' }
      ]
    },
    controls: [
      {
        id: pfx + 'Fn',
        label: {
          en: 'Function Family:',
          ar: 'عائلة الدالة الأم:'
        },
        value: def,
        options: opts,
        ariaLabel: {
          en: 'Select main parent function family',
          ar: 'اختر عائلة الدالة الأم'
        }
      },
      {
        id: pfx + 'A',
        label: {
          en: 'Scale / Reflection <b>\\(a =\\)</b>',
          ar: 'التمدد / الانعكاس <b>\\(a =\\)</b>'
        },
        min: -3,
        max: 3,
        value: 1,
        step: 0.5,
        valueDisplayId: pfx + 'AV',
        valueDisplay: '1.00',
        ariaLabel: {
          en: 'Vertical stretch and reflection factor a',
          ar: 'معامل التمدد الرأسي والانعكاس a'
        }
      },
      {
        id: pfx + 'H',
        label: {
          en: 'Horizontal Shift <b>\\(h =\\)</b>',
          ar: 'الإزاحة الأفقية <b>\\(h =\\)</b>'
        },
        min: -4,
        max: 4,
        value: 0,
        step: 0.5,
        valueDisplayId: pfx + 'HV',
        valueDisplay: '0.0',
        ariaLabel: {
          en: 'Horizontal translation h',
          ar: 'الإزاحة الأفقية h'
        }
      },
      {
        id: pfx + 'K',
        label: {
          en: 'Vertical Shift <b>\\(k =\\)</b>',
          ar: 'الإزاحة الرأسية <b>\\(k =\\)</b>'
        },
        min: -4,
        max: 4,
        value: 0,
        step: 0.5,
        valueDisplayId: pfx + 'KV',
        valueDisplay: '0.0',
        ariaLabel: {
          en: 'Vertical translation k',
          ar: 'الإزاحة الرأسية k'
        }
      },
      {
        id: pfx + 'Ghost',
        checkbox: true,
        checked: true,
        label: {
          en: 'Show parent function \\(y = f(x)\\) reference curve',
          ar: 'إظهار منحنى الدالة الأم المرجعية \\(y = f(x)\\)'
        },
        ariaLabel: {
          en: 'Toggle parent reference curve',
          ar: 'إظهار أو إخفاء منحنى الدالة الأم'
        }
      }
    ],
    readouts: [
      { id: pfx + 'Eq', label: { en: 'Active Equation', ar: 'المعادلة النشطة' }, colorClass: 'indigo', value: 'f(x) = x²' },
      { id: pfx + 'Dom', label: { en: 'Domain', ar: 'المجال' }, value: '(−∞, ∞)' },
      { id: pfx + 'Rng', label: { en: 'Range', ar: 'المدى' }, colorClass: 'amber', value: '[0, ∞)' },
      { id: pfx + 'Key', label: { en: 'Vertex / Asymptotes', ar: 'الرأس / خطوط التقارب' }, value: 'Vertex (0, 0), Axis x = 0' },
      { id: pfx + 'Int', label: { en: 'Intercepts', ar: 'نقاط التقاطع مع المحورين' }, value: 'y-int: (0, 0) · x-int: (0, 0)' }
    ],
    note: {
      en: 'Switch freely among all 9 main function families and drag directly on the coordinate plane to relocate \\((h, k)\\). Dashed rose/teal lines mark vertical (\\(x = h\\)) and horizontal (\\(y = k\\)) asymptotes for rational, exponential, and logarithmic functions.',
      ar: 'بدّل بحرية بين عائلات الدوال الأم التسع جميعاً واسحب مباشرة على المستوى الإحداثي لتحريك النقطة المحورية \\((h, k)\\). توضح الخطوط المتقطعة خطوط التقارب الرأسية (\\(x = h\\)) والأفقية (\\(y = k\\)) للدوال النسبية والأسية واللوغاريتمية.'
    }
  };
}

function buildHyperbolicCallout(slug) {
  return {
    kind: 'callout',
    id: 'cs-uge-' + slug + '-hyper-def',
    style: 'thm',
    label: {
      en: '● Hyperbolic & Inverse Hyperbolic Functions in Calculus — Definitions, Identities & Derivatives',
      ar: '● الدوال الزائدية وعكسها في التفاضل والتكامل — التعاريف والمتطابقات والمشتقات'
    },
    body: {
      en:
        '<p>Just as circular trigonometric functions parameterize the unit circle \\(x^2 + y^2 = 1\\), the <strong>six hyperbolic functions</strong> parameterize the right branch of the unit hyperbola \\(x^2 - y^2 = 1\\) using combinations of \\(e^x\\) and \\(e^{-x}\\):</p>' +
        '\\[ \\sinh x = \\frac{e^x - e^{-x}}{2}, \\qquad \\cosh x = \\frac{e^x + e^{-x}}{2}, \\qquad \\tanh x = \\frac{\\sinh x}{\\cosh x} = \\frac{e^x - e^{-x}}{e^x + e^{-x}} \\]' +
        '\\[ \\operatorname{csch} x = \\frac{1}{\\sinh x}\\;(x\\neq 0), \\qquad \\operatorname{sech} x = \\frac{1}{\\cosh x}, \\qquad \\coth x = \\frac{\\cosh x}{\\sinh x}\\;(x\\neq 0) \\]' +
        '<table class="exam-table" style="margin-top:8px"><thead><tr><th>Function</th><th>Domain &amp; Range</th><th>Derivative \\(\\frac{d}{dx}\\)</th><th>Logarithmic Inverse &amp; Derivative</th></tr></thead><tbody>' +
        '<tr><td>\\(\\sinh x\\)</td><td>Dom \\(\\mathbb{R}\\), Rng \\(\\mathbb{R}\\)</td><td>\\(\\cosh x\\)</td><td>\\(\\operatorname{arsinh} x = \\ln\\!\\big(x + \\sqrt{x^2+1}\\big)\\), \\(\\frac{1}{\\sqrt{x^2+1}}\\)</td></tr>' +
        '<tr><td>\\(\\cosh x\\)</td><td>Dom \\(\\mathbb{R}\\), Rng \\([1, \\infty)\\)</td><td>\\(\\sinh x\\)</td><td>\\(\\operatorname{arcosh} x = \\ln\\!\\big(x + \\sqrt{x^2-1}\\big)\\;(x\\ge 1)\\), \\(\\frac{1}{\\sqrt{x^2-1}}\\)</td></tr>' +
        '<tr><td>\\(\\tanh x\\)</td><td>Dom \\(\\mathbb{R}\\), Rng \\((-1, 1)\\)</td><td>\\(\\operatorname{sech}^2 x\\)</td><td>\\(\\operatorname{artanh} x = \\frac{1}{2}\\ln\\!\\left(\\frac{1+x}{1-x}\\right)\\;(|x|<1)\\), \\(\\frac{1}{1-x^2}\\)</td></tr>' +
        '<tr><td>\\(\\operatorname{csch} x\\)</td><td>Dom \\(x\\neq 0\\), Rng \\(y\\neq 0\\)</td><td>\\(-\\operatorname{csch} x\\coth x\\)</td><td>Odd reciprocal of \\(\\sinh x\\)</td></tr>' +
        '<tr><td>\\(\\operatorname{sech} x\\)</td><td>Dom \\(\\mathbb{R}\\), Rng \\((0, 1]\\)</td><td>\\(-\\operatorname{sech} x\\tanh x\\)</td><td>Bell-shaped reciprocal of \\(\\cosh x\\)</td></tr>' +
        '<tr><td>\\(\\coth x\\)</td><td>Dom \\(x\\neq 0\\), Rng \\(|y|>1\\)</td><td>\\(-\\operatorname{csch}^2 x\\)</td><td>Horizontal asymptotes \\(y = \\pm 1\\)</td></tr>' +
        '</tbody></table>' +
        '<p style="margin-top:8px"><strong>Fundamental Hyperbolic Identity:</strong> \\(\\cosh^2 x - \\sinh^2 x = 1\\), \\(1 - \\tanh^2 x = \\operatorname{sech}^2 x\\), and \\(\\sinh(2x) = 2\\sinh x\\cosh x\\). Physically, a flexible uniform cable hanging under gravity forms the catenary curve \\(y = a\\cosh(x/a)\\).</p>',
      ar:
        '<p>كما تُمثّل الدوال المثلثية الدائرية دائرة الوحدة \\(x^2 + y^2 = 1\\)، فإن <strong>الدوال الزائدية الست</strong> تُوسِّط الفرع الأيمن للقطع الزائد الواحدي \\(x^2 - y^2 = 1\\) بدلالة الدالتين الأسيتين \\(e^x\\) و\\(e^{-x}\\):</p>' +
        '\\[ \\sinh x = \\frac{e^x - e^{-x}}{2}, \\qquad \\cosh x = \\frac{e^x + e^{-x}}{2}, \\qquad \\tanh x = \\frac{\\sinh x}{\\cosh x} = \\frac{e^x - e^{-x}}{e^x + e^{-x}} \\]' +
        '\\[ \\operatorname{csch} x = \\frac{1}{\\sinh x}\\;(x\\neq 0), \\qquad \\operatorname{sech} x = \\frac{1}{\\cosh x}, \\qquad \\coth x = \\frac{\\cosh x}{\\sinh x}\\;(x\\neq 0) \\]' +
        '<table class="exam-table" style="margin-top:8px"><thead><tr><th>الدالة</th><th>المجال والمدى</th><th>المشتقة \\(\\frac{d}{dx}\\)</th><th>الصيغة اللوغاريتمية للعكس ومشتقتها</th></tr></thead><tbody>' +
        '<tr><td>\\(\\sinh x\\)</td><td>المجال \\(\\mathbb{R}\\)، المدى \\(\\mathbb{R}\\)</td><td>\\(\\cosh x\\)</td><td>\\(\\operatorname{arsinh} x = \\ln\\!\\big(x + \\sqrt{x^2+1}\\big)\\)، \\(\\frac{1}{\\sqrt{x^2+1}}\\)</td></tr>' +
        '<tr><td>\\(\\cosh x\\)</td><td>المجال \\(\\mathbb{R}\\)، المدى \\([1, \\infty)\\)</td><td>\\(\\sinh x\\)</td><td>\\(\\operatorname{arcosh} x = \\ln\\!\\big(x + \\sqrt{x^2-1}\\big)\\;(x\\ge 1)\\)، \\(\\frac{1}{\\sqrt{x^2-1}}\\)</td></tr>' +
        '<tr><td>\\(\\tanh x\\)</td><td>المجال \\(\\mathbb{R}\\)، المدى \\((-1, 1)\\)</td><td>\\(\\operatorname{sech}^2 x\\)</td><td>\\(\\operatorname{artanh} x = \\frac{1}{2}\\ln\\!\\left(\\frac{1+x}{1-x}\\right)\\;(|x|<1)\\)، \\(\\frac{1}{1-x^2}\\)</td></tr>' +
        '<tr><td>\\(\\operatorname{csch} x\\)</td><td>المجال \\(x\\neq 0\\)، المدى \\(y\\neq 0\\)</td><td>\\(-\\operatorname{csch} x\\coth x\\)</td><td>دالة فردية مقلوبة لـ \\(\\sinh x\\)</td></tr>' +
        '<tr><td>\\(\\operatorname{sech} x\\)</td><td>المجال \\(\\mathbb{R}\\)، المدى \\((0, 1]\\)</td><td>\\(-\\operatorname{sech} x\\tanh x\\)</td><td>منحنى جرسي متماثل مقلوب لـ \\(\\cosh x\\)</td></tr>' +
        '<tr><td>\\(\\coth x\\)</td><td>المجال \\(x\\neq 0\\)، المدى \\(|y|>1\\)</td><td>\\(-\\operatorname{csch}^2 x\\)</td><td>خطا تقارب أفقيان \\(y = \\pm 1\\)</td></tr>' +
        '</tbody></table>' +
        '<p style="margin-top:8px"><strong>المتطابقة الزائدية الأساسية:</strong> \\(\\cosh^2 x - \\sinh^2 x = 1\\)، و\\(1 - \\tanh^2 x = \\operatorname{sech}^2 x\\)، و\\(\\sinh(2x) = 2\\sinh x\\cosh x\\). فيزيائياً، يتخذ الكابل المتجانس المعلّق تحت تأثير الجاذبية شكل منحنى السلسلة \\(y = a\\cosh(x/a)\\).</p>'
    }
  };
}

function buildHyperbolicExplorer(pfx, blockId, defaultFn) {
  const def = defaultFn || 'cosh';
  const rawOpts = [
    { value: 'sinh', label: 'sinh(x) = ½(eˣ − e⁻ˣ)  |  Odd, d/dx = cosh(x)' },
    { value: 'cosh', label: 'cosh(x) = ½(eˣ + e⁻ˣ)  |  Catenary, d/dx = sinh(x)' },
    { value: 'tanh', label: 'tanh(x) = sinh(x)/cosh(x)  |  Asymptotes y = ±a' },
    { value: 'csch', label: 'csch(x) = 1/sinh(x)  |  Reciprocal, x ≠ 0' },
    { value: 'sech', label: 'sech(x) = 1/cosh(x)  |  Bell curve, Range (0, a]' },
    { value: 'coth', label: 'coth(x) = cosh(x)/sinh(x)  |  |y| > a, x ≠ 0' },
    { value: 'arsinh', label: 'arsinh(x) = ln(x + √(x² + 1))  |  Inverse sinh' },
    { value: 'arcosh', label: 'arcosh(x) = ln(x + √(x² − 1))  |  Domain x ≥ 1' },
    { value: 'artanh', label: 'artanh(x) = ½ ln((1+x)/(1−x))  |  Domain |x| < 1' }
  ];
  const opts = rawOpts.map(o => (o.value === def ? Object.assign({}, o, { selected: true }) : o));

  return {
    kind: 'explorer',
    id: blockId,
    title: {
      en: '⊙ Explorer · Hyperbolic & Inverse Hyperbolic Functions Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر الدوال الزائدية والدوال الزائدية العكسية'
    },
    canvasId: pfx + 'Canvas',
    ariaLabel: {
      en: 'Interactive calculus grapher for all 6 hyperbolic functions (sinh, cosh, tanh, csch, sech, coth) and 3 inverse hyperbolic functions (arsinh, arcosh, artanh) showing exponential components, asymptotes, and tangent derivative line.',
      ar: 'مستكشف تفاضلي تفاعلي للدوال الزائدية الست وعكسها يعرض المركّبات الأسية وخطوط التقارب ومستقيم المماس المشتق.'
    },
    dataPanel: {
      btnId: pfx + 'DataBtn',
      panelId: pfx + 'DataPanel',
      descId: pfx + 'DataDesc',
      rowsId: pfx + 'DataRows',
      caption: {
        en: 'Function values and calculus derivatives across sample inputs \\(x\\).',
        ar: 'قيم الدالة الزائدية ومشتقتها عند قيم مختارة للمتغير \\(x\\).'
      },
      columns: [
        { en: '\\(x\\)', ar: '\\(x\\)' },
        { en: '\\(a \\cdot f(x)\\)', ar: '\\(a \\cdot f(x)\\)' },
        { en: 'Derivative \\(a \\cdot f\'(x)\\)', ar: 'المشتقة \\(a \\cdot f\'(x)\\)' }
      ]
    },
    controls: [
      {
        id: pfx + 'Fn',
        label: {
          en: 'Hyperbolic Function:',
          ar: 'اختر الدالة الزائدية:'
        },
        value: def,
        options: opts,
        ariaLabel: {
          en: 'Select hyperbolic or inverse hyperbolic function',
          ar: 'اختر الدالة الزائدية أو العكسية'
        }
      },
      {
        id: pfx + 'A',
        label: {
          en: 'Scale <b>\\(a =\\)</b>',
          ar: 'معامل التمدد <b>\\(a =\\)</b>'
        },
        min: 0.5,
        max: 2.5,
        value: 1,
        step: 0.25,
        valueDisplayId: pfx + 'AV',
        valueDisplay: '1.00',
        ariaLabel: {
          en: 'Vertical scale factor a',
          ar: 'معامل التمدد الرأسي a'
        }
      },
      {
        id: pfx + 'X',
        label: {
          en: 'Tangent probe <b>\\(x_0 =\\)</b>',
          ar: 'نقطة التماس <b>\\(x_0 =\\)</b>'
        },
        min: -3,
        max: 3,
        value: 1,
        step: 0.1,
        valueDisplayId: pfx + 'XV',
        valueDisplay: '1.00',
        ariaLabel: {
          en: 'Probe coordinate x0',
          ar: 'الإحداثي السيني لنقطة التماس x0'
        }
      },
      {
        id: pfx + 'Decomp',
        checkbox: true,
        checked: true,
        label: {
          en: 'Show \\(\\frac{1}{2}e^x, \\pm\\frac{1}{2}e^{-x}\\) decomposition &amp; tangent line',
          ar: 'إظهار التحليل الأسي \\(\\frac{1}{2}e^x, \\pm\\frac{1}{2}e^{-x}\\) ومستقيم المماس'
        },
        ariaLabel: {
          en: 'Toggle exponential components and tangent line',
          ar: 'إظهار أو إخفاء المركبات الأسية ومستقيم المماس'
        }
      }
    ],
    readouts: [
      { id: pfx + 'Eq', label: { en: 'Definition &amp; Derivative', ar: 'التعريف والمشتقة' }, colorClass: 'indigo', value: 'cosh(x) = ½(eˣ + e⁻ˣ)  |  d/dx[cosh x] = sinh x' },
      { id: pfx + 'Val', label: { en: 'Value &amp; Slope at \\(x_0\\)', ar: 'القيمة والميل عند \\(x_0\\)' }, colorClass: 'amber', value: 'f(1.00) = 1.543  ·  f\'(1.00) = 1.175' },
      { id: pfx + 'DomRng', label: { en: 'Domain &amp; Range', ar: 'المجال والمدى' }, value: 'Domain (−∞, ∞), Range [1.00, ∞)' },
      { id: pfx + 'Asym', label: { en: 'Asymptotes &amp; Symmetry', ar: 'خطوط التقارب والتماثل' }, value: 'Minimum (0, 1.00) · Even symmetry' },
      { id: pfx + 'Ident', label: { en: 'Hyperbolic Identity Check', ar: 'تحقق المتطابقة الزائدية' }, value: 'cosh²(1.00) − sinh²(1.00) = 1.000' }
    ],
    note: {
      en: 'Drag horizontally on the graph to slide \\(x_0\\). For \\(\\sinh x\\) and \\(\\cosh x\\), observe how the curve sums the growing \\(\\frac{1}{2}e^x\\) (teal) and decaying \\(\\pm\\frac{1}{2}e^{-x}\\) (slate) exponentials, while \\(\\cosh^2 x - \\sinh^2 x = 1\\) holds identically everywhere.',
      ar: 'اسحب أفقياً على الرسم لتحريك \\(x_0\\). لاحظ في حالتي \\(\\sinh x\\) و\\(\\cosh x\\) كيف ينتج المنحنى من جمع المركّبة الأسية المتزايدة \\(\\frac{1}{2}e^x\\) والمتناقصة \\(\\pm\\frac{1}{2}e^{-x}\\)، مع بقاء المتطابقة \\(\\cosh^2 x - \\sinh^2 x = 1\\) محققة دائماً.'
    }
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. TARGET CURRICULUM MAPS
   ═══════════════════════════════════════════════════════════════════════════ */

const TRIG_CHAPTERS = [
  { track: 'a2level', slug: 'a2l-trig', isCalc: true },
  { track: 'act', slug: 'act-trig', isCalc: false },
  { track: 'act2', slug: 'act2-trig', isCalc: false },
  { track: 'act2l2', slug: 'act2l2-trig-polar', isCalc: false },
  { track: 'addmath', slug: 'am-trigonometry-circular', isCalc: false },
  { track: 'alg2', slug: 'a2-trig', isCalc: false },
  { track: 'apab', slug: 'apab-u3', isCalc: true },
  { track: 'apbc', slug: 'apbc-c1', isCalc: true },
  { track: 'appc', slug: 'appc-u3b', isCalc: false },
  { track: 'aslevel', slug: 'as-trig', isCalc: false },
  { track: 'aslevel', slug: 'as-radians', isCalc: false },
  { track: 'calculus', slug: 'ch-foundations', isCalc: true },
  { track: 'calculus', slug: 'ch-derivatives', isCalc: true },
  { track: 'edexcel', slug: 'edx-trig-3d-vectors', isCalc: false },
  { track: 'est', slug: 'est-trig', isCalc: false },
  { track: 'est2', slug: 'est2-trig', isCalc: false },
  { track: 'est2l2', slug: 'est2l2-trig-polar-conics', isCalc: false },
  { track: 'gaten', slug: 'ge-saat-trig-conics', isCalc: false },
  { track: 'geo', slug: 'geo-right', isCalc: false },
  { track: 'ibhl', slug: 'ibhl-t3', isCalc: false },
  { track: 'ibhl', slug: 'ibhl-aa', isCalc: true },
  { track: 'ibsl', slug: 'ibsl-t3', isCalc: false },
  { track: 'ibsl', slug: 'ibsl-aa', isCalc: false },
  { track: 'igcse', slug: 'ig-trig', isCalc: false },
  { track: 'olympiad', slug: 'ol-triangle-centers-trig', isCalc: false },
  { track: 'precalc', slug: 'pc-circles', isCalc: false },
  { track: 'sat', slug: 'sat-geo', isCalc: false },
  { track: 'tahsili', slug: 'tah-trig', isCalc: false }
];

const SLOPE_FIELD_INJECTIONS = [
  { track: 'apab', slug: 'apab-u7', defaultFn: 'xmy' },
  { track: 'apbc', slug: 'apbc-c2', defaultFn: 'logistic' },
  { track: 'a2level', slug: 'a2l-diffeq', defaultFn: 'xmy' },
  { track: 'odes', slug: 'ode-separable', defaultFn: 'xmy' }
];

const MAIN_FUNCTION_CHAPTERS = [
  { track: 'a2level', slug: 'a2l-functions', defaultFn: 'absolute' },
  { track: 'a2level', slug: 'a2l-explog', defaultFn: 'exponential' },
  { track: 'a2level', slug: 'a2l-algebra', defaultFn: 'rational' },
  { track: 'act', slug: 'act-algebra', defaultFn: 'cubic' },
  { track: 'act', slug: 'act-functions', defaultFn: 'quadratic' },
  { track: 'act', slug: 'act-coordgeo', defaultFn: 'linear' },
  { track: 'act2', slug: 'act2-algebra', defaultFn: 'quadratic' },
  { track: 'act2', slug: 'act2-functions', defaultFn: 'rational' },
  { track: 'act2', slug: 'act2-precalc', defaultFn: 'logarithmic' },
  { track: 'act2l2', slug: 'act2l2-advanced-functions-equations', defaultFn: 'logarithmic' },
  { track: 'addmath', slug: 'am-functions-quadratics', defaultFn: 'quadratic' },
  { track: 'addmath', slug: 'am-polynomials-binomial', defaultFn: 'cubic' },
  { track: 'addmath', slug: 'am-logs-exponentials', defaultFn: 'logarithmic' },
  { track: 'alg2', slug: 'a2-functions', defaultFn: 'absolute' },
  { track: 'alg2', slug: 'a2-quadratics', defaultFn: 'quadratic' },
  { track: 'alg2', slug: 'a2-polynomials', defaultFn: 'cubic' },
  { track: 'alg2', slug: 'a2-rational', defaultFn: 'rational' },
  { track: 'alg2', slug: 'a2-exponential', defaultFn: 'exponential' },
  { track: 'alg2', slug: 'a2-radical', defaultFn: 'radical' },
  { track: 'algebra', slug: 'ag-linear', defaultFn: 'linear' },
  { track: 'algebra', slug: 'ag-quadratics', defaultFn: 'quadratic' },
  { track: 'algebra', slug: 'ag-exponents', defaultFn: 'cubic' },
  { track: 'algebra', slug: 'ag-functions', defaultFn: 'absolute' },
  { track: 'algebra', slug: 'ag-exponential', defaultFn: 'exponential' },
  { track: 'algebra', slug: 'ag-radicals', defaultFn: 'radical' },
  { track: 'algebra', slug: 'ag-rational', defaultFn: 'rational' },
  { track: 'apab', slug: 'apab-u1', defaultFn: 'rational' },
  { track: 'apab', slug: 'apab-u2', defaultFn: 'cubic' },
  { track: 'apbc', slug: 'apbc-overview', defaultFn: 'exponential' },
  { track: 'appc', slug: 'appc-u1', defaultFn: 'cubic' },
  { track: 'appc', slug: 'appc-u1b', defaultFn: 'rational' },
  { track: 'appc', slug: 'appc-u2', defaultFn: 'exponential' },
  { track: 'appc', slug: 'appc-u2b', defaultFn: 'logarithmic' },
  { track: 'apstats', slug: 'aps-u1', defaultFn: 'linear' },
  { track: 'aslevel', slug: 'as-algebra', defaultFn: 'radical' },
  { track: 'aslevel', slug: 'as-functions', defaultFn: 'quadratic' },
  { track: 'aslevel', slug: 'as-coordgeo', defaultFn: 'linear' },
  { track: 'aslevel', slug: 'as-funcs', defaultFn: 'rational' },
  { track: 'calculus', slug: 'ch-foundations', defaultFn: 'quadratic' },
  { track: 'calculus', slug: 'ch-limits', defaultFn: 'rational' },
  { track: 'edexcel', slug: 'edx-number-surds-sets', defaultFn: 'radical' },
  { track: 'edexcel', slug: 'edx-algebra-quadratics', defaultFn: 'quadratic' },
  { track: 'edexcel', slug: 'edx-functions-sequences', defaultFn: 'cubic' },
  { track: 'edexcel', slug: 'edx-coord-geometry', defaultFn: 'linear' },
  { track: 'est', slug: 'est-algebra', defaultFn: 'linear' },
  { track: 'est', slug: 'est-quadratics', defaultFn: 'quadratic' },
  { track: 'est', slug: 'est-functions', defaultFn: 'absolute' },
  { track: 'est', slug: 'est-explog', defaultFn: 'exponential' },
  { track: 'est2', slug: 'est2-algebra', defaultFn: 'cubic' },
  { track: 'est2', slug: 'est2-functions', defaultFn: 'logarithmic' },
  { track: 'est2l2', slug: 'est2l2-functions-graphs', defaultFn: 'rational' },
  { track: 'gaten', slug: 'ge-saat-algebra-matrices', defaultFn: 'cubic' },
  { track: 'gaten', slug: 'ge-saat-functions-logs', defaultFn: 'logarithmic' },
  { track: 'geo', slug: 'geo-coord', defaultFn: 'linear' },
  { track: 'ibhl', slug: 'ibhl-t2', defaultFn: 'absolute' },
  { track: 'ibsl', slug: 'ibsl-t2', defaultFn: 'quadratic' },
  { track: 'igcse', slug: 'ig-algebra', defaultFn: 'quadratic' },
  { track: 'igcse', slug: 'ig-coordinate', defaultFn: 'linear' },
  { track: 'igcse', slug: 'ig-functions', defaultFn: 'rational' },
  { track: 'linalg', slug: 'la-systems', defaultFn: 'linear' },
  { track: 'mathai', slug: 'ai-linear-regression', defaultFn: 'linear' },
  { track: 'mathai', slug: 'ai-logistic-regression', defaultFn: 'exponential' },
  { track: 'mvc', slug: 'mvc-partials', defaultFn: 'quadratic' },
  { track: 'odes', slug: 'ode-linear', defaultFn: 'exponential' },
  { track: 'olympiad', slug: 'ol-algebraic-techniques', defaultFn: 'cubic' },
  { track: 'precalc', slug: 'pc-exp', defaultFn: 'logarithmic' },
  { track: 'precalc', slug: 'pc-rational', defaultFn: 'rational' },
  { track: 'qudrat', slug: 'qud-algebra', defaultFn: 'quadratic' },
  { track: 'sat', slug: 'sat-linear', defaultFn: 'constant' },
  { track: 'sat', slug: 'sat-linfun', defaultFn: 'linear' },
  { track: 'sat', slug: 'sat-quad', defaultFn: 'quadratic' },
  { track: 'sat', slug: 'sat-expoly', defaultFn: 'exponential' },
  { track: 'sat', slug: 'sat-functions', defaultFn: 'radical' },
  { track: 'tahsili', slug: 'tah-algebra', defaultFn: 'absolute' },
  { track: 'tahsili', slug: 'tah-functions', defaultFn: 'rational' },
  { track: 'tahsili', slug: 'tah-explog', defaultFn: 'logarithmic' }
];

const HYPERBOLIC_CHAPTERS = [
  { track: 'calculus', slug: 'ch-foundations', defaultFn: 'cosh' },
  { track: 'calculus', slug: 'ch-derivatives', defaultFn: 'tanh' },
  { track: 'calculus', slug: 'ch-techniques', defaultFn: 'sinh' },
  { track: 'apbc', slug: 'apbc-c1', defaultFn: 'cosh' },
  { track: 'a2level', slug: 'a2l-explog', defaultFn: 'cosh' },
  { track: 'ibhl', slug: 'ibhl-t5', defaultFn: 'sinh' },
  { track: 'odes', slug: 'ode-second-order', defaultFn: 'cosh' },
  { track: 'tahsili', slug: 'tah-calc1', defaultFn: 'sinh' }
];

/* ═══════════════════════════════════════════════════════════════════════════
   3. HELPERS FOR UPDATING CHAPTER JSONS & TRACK EXPLORER JS FILES
   ═══════════════════════════════════════════════════════════════════════════ */

const trackMounts = {}; // track -> string[] of JS mount statements
function addMount(track, codeLine) {
  if (!trackMounts[track]) trackMounts[track] = [];
  if (!trackMounts[track].includes(codeLine)) trackMounts[track].push(codeLine);
}

function cleanIdPart(slug) {
  return slug.replace(/[^a-zA-Z0-9]/g, '');
}

function loadChapter(track, slug) {
  const fp = path.join(CONTENT_DIR, track, slug + '.json');
  if (!fs.existsSync(fp)) throw new Error('Missing chapter file: ' + fp);
  return { fp, data: JSON.parse(fs.readFileSync(fp, 'utf8')) };
}

function saveChapter(fp, data) {
  fs.writeFileSync(fp, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

// Group injections by track/slug so each file is loaded, stripped of old cs-uge-* blocks once, and saved once
const opsByChapter = {};
function queueOp(track, slug, fn) {
  const k = track + '/' + slug;
  if (!opsByChapter[k]) opsByChapter[k] = { track, slug, fns: [] };
  opsByChapter[k].fns.push(fn);
}

function insertBeforeSeeAlso(blocks, newBlocks) {
  let idx = blocks.length;
  for (let i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i].kind === 'seeAlso') idx = i;
  }
  blocks.splice(idx, 0, ...newBlocks);
}

/* --- A. Upgrade precalc/pc-trig & appc/appc-u3 in-place --- */
for (const item of [
  { track: 'precalc', slug: 'pc-trig', trigPfx: 'pcTrig6', invPfx: 'pcInvTrig6' },
  { track: 'appc', slug: 'appc-u3', trigPfx: 'appcTrig6', invPfx: 'appcInvTrig6' }
]) {
  queueOp(item.track, item.slug, (ch) => {
    const blocks = ch.content.blocks;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].kind === 'explorer' && blocks[i].canvasId === item.trigPfx + 'Canvas') {
        blocks[i] = buildSixTrigExplorer(item.trigPfx);
      } else if (blocks[i].kind === 'explorer' && blocks[i].canvasId === item.invPfx + 'Canvas') {
        blocks[i] = buildSixInvTrigExplorer(item.invPfx, null, false);
      }
    }
    // Ensure appc-u3 also has the 6-inverse-trig reference callout right before appcInvTrig6Canvas if absent
    const hasInvCallout = blocks.some(b =>
      b.kind === 'callout' && b.label && b.label.en && b.label.en.includes('All 6 Inverse Trigonometric Functions')
    );
    if (!hasInvCallout) {
      const invIdx = blocks.findIndex(b => b.kind === 'explorer' && b.canvasId === item.invPfx + 'Canvas');
      if (invIdx >= 0) {
        blocks.splice(invIdx, 0, buildSixInvTrigCallout(item.slug, false));
      }
    }
  });
  addMount(
    item.track,
    `window.CSMountSixTrigExplorer && window.CSMountSixTrigExplorer({ canvasId: '${item.trigPfx}Canvas', dataBtnId: '${item.trigPfx}DataBtn', prefix: '${item.trigPfx}' });`
  );
  addMount(
    item.track,
    `window.CSMountSixInvTrigExplorer && window.CSMountSixInvTrigExplorer({ canvasId: '${item.invPfx}Canvas', dataBtnId: '${item.invPfx}DataBtn', prefix: '${item.invPfx}' });`
  );
}

/* --- B. Inject 6 Trig + 6 Inverse Trig into remaining 28 trig chapters --- */
for (const item of TRIG_CHAPTERS) {
  const base = 'uge_' + cleanIdPart(item.slug);
  const tPfx = base + '_trig6';
  const iPfx = base + '_invtrig6';
  queueOp(item.track, item.slug, (ch) => {
    insertBeforeSeeAlso(ch.content.blocks, [
      buildSixTrigCallout(item.slug),
      buildSixTrigExplorer(tPfx, 'cs-uge-' + item.slug + '-trig6-exp'),
      buildSixInvTrigCallout(item.slug, item.isCalc),
      buildSixInvTrigExplorer(iPfx, 'cs-uge-' + item.slug + '-invtrig6-exp', item.isCalc)
    ]);
  });
  addMount(
    item.track,
    `window.CSMountSixTrigExplorer && window.CSMountSixTrigExplorer({ canvasId: '${tPfx}Canvas', dataBtnId: '${tPfx}DataBtn', prefix: '${tPfx}' });`
  );
  addMount(
    item.track,
    `window.CSMountSixInvTrigExplorer && window.CSMountSixInvTrigExplorer({ canvasId: '${iPfx}Canvas', dataBtnId: '${iPfx}DataBtn', prefix: '${iPfx}' });`
  );
}

/* --- C. Upgrade calculus/ch-diffeq slopeCanvas in-place + inject Slope Field Explorers --- */
queueOp('calculus', 'ch-diffeq', (ch) => {
  const blocks = ch.content.blocks;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].kind === 'explorer' && blocks[i].canvasId === 'slopeCanvas') {
      blocks[i] = buildSlopeFieldExplorer('slope', null, 'xmy');
      // Also clean up the intro text block directly preceding slopeCanvas
      if (i > 0 && blocks[i - 1].kind === 'text' && blocks[i - 1].body && blocks[i - 1].body.en.includes('slope field')) {
        blocks[i - 1].body = {
          en: 'A <strong>slope field</strong> (direction field) plots short tangent segments of slope \\(f(x, y)\\) across a coordinate grid so you can visualize solution curves without solving analytically first. Choose any differential equation below, click or drag the initial point \\((x_0, y_0)\\) directly on the canvas, double-click to pin multiple family curves, and compare the exact RK4 trajectory against Euler\'s polygonal approximation.',
          ar: 'يرسم <strong>حقل الميول</strong> (حقل الاتجاهات) قطعاً مماسية قصيرة ميلها \\(f(x, y)\\) عبر شبكة الإحداثيات لتصوّر منحنيات الحلول بصرياً حتى قبل حل المعادلة جبرياً. اختر أي معادلة تفاضلية أدناه، وانقر أو اسحب النقطة الابتدائية \\((x_0, y_0)\\) مباشرة على اللوحة، وانقر مرتين لتثبيت عدة منحنيات من عائلة الحلول ومقارنة المسار الدقيق بتقريب أويلر المضلع.'
        };
      }
    }
  }
});
addMount(
  'calculus',
  `window.CSMountSlopeFieldExplorer && window.CSMountSlopeFieldExplorer({ canvasId: 'slopeCanvas', dataBtnId: 'slopeDataBtn', prefix: 'slope', defaultFn: 'xmy' });`
);

for (const item of SLOPE_FIELD_INJECTIONS) {
  const sPfx = 'uge_' + cleanIdPart(item.slug) + '_sf';
  queueOp(item.track, item.slug, (ch) => {
    insertBeforeSeeAlso(ch.content.blocks, [
      buildSlopeFieldExplorer(sPfx, 'cs-uge-' + item.slug + '-sf-exp', item.defaultFn)
    ]);
  });
  addMount(
    item.track,
    `window.CSMountSlopeFieldExplorer && window.CSMountSlopeFieldExplorer({ canvasId: '${sPfx}Canvas', dataBtnId: '${sPfx}DataBtn', prefix: '${sPfx}', defaultFn: '${item.defaultFn}' });`
  );
}

/* --- D. Inject Main Parent Functions Atlas & Interactive Explorer across ALL 31 tracks --- */
for (const item of MAIN_FUNCTION_CHAPTERS) {
  const mPfx = 'uge_' + cleanIdPart(item.slug) + '_mainfn';
  queueOp(item.track, item.slug, (ch) => {
    insertBeforeSeeAlso(ch.content.blocks, [
      buildMainFunctionsCallout(item.slug),
      buildMainFunctionsExplorer(mPfx, 'cs-uge-' + item.slug + '-mainfn-exp', item.defaultFn)
    ]);
  });
  addMount(
    item.track,
    `window.CSMountMainFunctionsExplorer && window.CSMountMainFunctionsExplorer({ canvasId: '${mPfx}Canvas', dataBtnId: '${mPfx}DataBtn', prefix: '${mPfx}', defaultFn: '${item.defaultFn}' });`
  );
}

/* --- E. Inject Hyperbolic & Inverse Hyperbolic Functions in Calculus tracks --- */
for (const item of HYPERBOLIC_CHAPTERS) {
  const hPfx = 'uge_' + cleanIdPart(item.slug) + '_hyper';
  queueOp(item.track, item.slug, (ch) => {
    insertBeforeSeeAlso(ch.content.blocks, [
      buildHyperbolicCallout(item.slug),
      buildHyperbolicExplorer(hPfx, 'cs-uge-' + item.slug + '-hyper-exp', item.defaultFn)
    ]);
  });
  addMount(
    item.track,
    `window.CSMountHyperbolicExplorer && window.CSMountHyperbolicExplorer({ canvasId: '${hPfx}Canvas', dataBtnId: '${hPfx}DataBtn', prefix: '${hPfx}', defaultFn: '${item.defaultFn}' });`
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. EXECUTE JSON UPDATES & EXPLORER JS WIRING
   ═══════════════════════════════════════════════════════════════════════════ */

let updatedChapters = 0;
for (const key of Object.keys(opsByChapter)) {
  const { track, slug, fns } = opsByChapter[key];
  const { fp, data } = loadChapter(track, slug);
  // Idempotent strip of previously generated cs-uge-* blocks
  data.content.blocks = data.content.blocks.filter(b => !(b.id && String(b.id).startsWith('cs-uge-')));
  for (const fn of fns) fn(data);
  saveChapter(fp, data);
  updatedChapters++;
}

const START_MARK = '  /* === AUTO-UNIVERSAL-GRAPH-EXPLORERS-START === */';
const END_MARK = '  /* === AUTO-UNIVERSAL-GRAPH-EXPLORERS-END === */';

let updatedJsFiles = 0;
for (const track of Object.keys(trackMounts).sort()) {
  const jsPath = path.join(EXPLORERS_DIR, track + '.js');
  if (!fs.existsSync(jsPath)) throw new Error('Missing explorer script: ' + jsPath);
  let src = fs.readFileSync(jsPath, 'utf8');

  // Remove any previous auto-generated block
  const sIdx = src.indexOf(START_MARK);
  const eIdx = src.indexOf(END_MARK);
  if (sIdx !== -1 && eIdx !== -1 && eIdx > sIdx) {
    src = src.slice(0, sIdx) + src.slice(eIdx + END_MARK.length).replace(/^\r?\n/, '');
  }

  // In calculus.js, disable legacy slopeCanvas IIFE so CSMountSlopeFieldExplorer owns slopeCanvas cleanly
  if (track === 'calculus') {
    src = src.replace(
      "var canvas=document.getElementById('slopeCanvas'); if(!canvas) return;",
      "var canvas=document.getElementById('slopeCanvas_legacy_disabled'); if(!canvas) return;"
    );
  }
  // In precalc.js and appc.js, comment out legacy non-draggable initSixTrigExplorer/initSixInvTrigExplorer calls
  if (track === 'precalc') {
    src = src.replace(/^\s*initSixTrigExplorer\('pcTrig6'\);\s*$/m, "  /* upgraded via CSMountSixTrigExplorer: pcTrig6 */");
    src = src.replace(/^\s*initSixInvTrigExplorer\('pcInvTrig6'\);\s*$/m, "  /* upgraded via CSMountSixInvTrigExplorer: pcInvTrig6 */");
  }
  if (track === 'appc') {
    src = src.replace(/^\s*initSixTrigExplorer\('appcTrig6'\);\s*$/m, "  /* upgraded via CSMountSixTrigExplorer: appcTrig6 */");
    src = src.replace(/^\s*initSixInvTrigExplorer\('appcInvTrig6'\);\s*$/m, "  /* upgraded via CSMountSixInvTrigExplorer: appcInvTrig6 */");
  }

  const blockLines = [
    START_MARK,
    ...trackMounts[track].map(line => '  ' + line),
    END_MARK
  ].join('\n');

  const closeTag = '})(window.CSExplorerKit);';
  const lastClose = src.lastIndexOf(closeTag);
  if (lastClose === -1) {
    throw new Error('Could not find closing })(window.CSExplorerKit); in ' + jsPath);
  }
  src = src.slice(0, lastClose) + blockLines + '\n' + src.slice(lastClose);
  fs.writeFileSync(jsPath, src, 'utf8');
  updatedJsFiles++;
}

console.log(`✅ Populated ${updatedChapters} chapters and wired ${updatedJsFiles} track explorer scripts!`);
console.log(`   - Trig (6 ratios + 6 inverses): ${TRIG_CHAPTERS.length + 2} chapters across 24 tracks`);
console.log(`   - Slope field interactive labs: ${SLOPE_FIELD_INJECTIONS.length + 1} dedicated labs + 30 enhanced figures`);
console.log(`   - Main functions (9 families):  ${MAIN_FUNCTION_CHAPTERS.length} chapters across all 31 tracks`);
console.log(`   - Hyperbolic trig in Calculus:  ${HYPERBOLIC_CHAPTERS.length} chapters`);
