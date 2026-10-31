#!/usr/bin/env node
/**
 * scripts/fix-explorers-relevance.js
 *
 * Aligns 100% of lesson Explorer blocks and 3D toggles across all 31 tracks:
 * 1. Moves `tahLogicCanvas` from `tahsili/tah-about.json` -> `tahsili/tah-geometry.json`
 *    (fixing corrupted `\to` / `\sim` strings) and wires `tahScoreCanvas` into `tah-about.json`.
 * 2. Moves `appcInvCanvas` from `appc/appc-u4.json` -> `appc/appc-u2b.json` (cleaning Arabic text).
 * 3. Strips generic boilerplate `canvas3d` objects from purely 2D/algebra/stats chapters,
 *    keeping `canvas3d` strictly on genuine 3D / solid / spatial / multivariable explorers.
 * 4. Removes out-of-syllabus `uge_*_hyperCanvas` blocks from `tah-calc1`, `a2l-explog`,
 *    `apbc-c1`, and `ch-foundations`, duplicate `trig6`/`invtrig6` from `as-radians`,
 *    and 3 orphan mount lines in `edexcel.js` & `ibhl.js`.
 * 5. Synchronizes all 75 `uge_*_mainfnCanvas` explorers so `ctrl.value`, `options[].selected`,
 *    `defaultFn` in `src/scripts/explorers/*.js`, `title`, `note`, and initial `readouts`
 *    match each chapter's actual function family.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const EX_DIR = path.join(ROOT, 'src', 'scripts', 'explorers');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
function writeJson(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
}

// ---------------------------------------------------------------------------
// 1. tahsili/tah-about.json <-> tahsili/tah-geometry.json
// ---------------------------------------------------------------------------
{
  const aboutPath = path.join(CONTENT_DIR, 'tahsili', 'tah-about.json');
  const geoPath = path.join(CONTENT_DIR, 'tahsili', 'tah-geometry.json');
  const about = readJson(aboutPath);
  const geo = readJson(geoPath);

  const logicIdx = about.content.blocks.findIndex(
    b => b.kind === 'explorer' && b.canvasId === 'tahLogicCanvas'
  );

  const tahScoreExplorer = {
    kind: 'explorer',
    title: {
      en: '⊙ Explorer · SAAT Tahsili Weighted Admission Composite Lab (30% GPA · 30% Qudrat · 40% Tahsili)',
      ar: '⊙ مستكشف تفاعلي · مختبر النسبة الموزونة للقبول الجامعي (٣٠٪ ثانوي · ٣٠٪ قدرات · ٤٠٪ تحصيلي)'
    },
    canvasId: 'tahScoreCanvas',
    ariaLabel: {
      en: 'Interactive bar chart and slider calculator for the Saudi university weighted admission composite: 30% High School GPA, 30% GAT Qudrat, and 40% SAAT Tahsili',
      ar: 'رسم بياني وحاسبة تفاعلية للنسبة الموزونة للقبول الجامعي: ٣٠٪ المعدل التراكمي للثانوية، ٣٠٪ القدرات العامة، و٤٠٪ الاختبار التحصيلي'
    },
    dataPanel: {
      btnId: 'tahScoreDataBtn',
      panelId: 'tahScoreDataPanel',
      descId: 'tahScoreDataDesc',
      rowsId: 'tahScoreDataRows',
      caption: {
        en: 'Weighted contribution of High School GPA (30%), GAT Qudrat (30%), and SAAT Tahsili (40%) toward the university admission composite.',
        ar: 'مساهمة كل من معدل الثانوية العامة (٣٠٪) والقدرات العامة (٣٠٪) والاختبار التحصيلي (٤٠٪) في النسبة الموزونة للقبول الجامعي.'
      },
      columns: [
        { en: 'Admission Component', ar: 'مكوّن القبول' },
        { en: 'Weighted Points', ar: 'النقاط الموزونة' }
      ]
    },
    controls: [
      {
        id: 'tahScoreGpa',
        valueDisplayId: 'tahScoreGpaV',
        label: {
          en: 'High School GPA (30%) =',
          ar: 'معدل الثانوية العامة (٣٠٪) ='
        },
        ariaLabel: {
          en: 'High School GPA percentage from 50 to 100',
          ar: 'نسبة الثانوية العامة من 50 إلى 100'
        },
        min: 50,
        max: 100,
        value: 95,
        step: 1
      },
      {
        id: 'tahScoreQud',
        valueDisplayId: 'tahScoreQudV',
        label: {
          en: 'GAT Qudrat Score (30%) =',
          ar: 'درجة القدرات العامة (٣٠٪) ='
        },
        ariaLabel: {
          en: 'GAT Qudrat score from 50 to 100',
          ar: 'درجة اختبار القدرات العامة من 50 إلى 100'
        },
        min: 50,
        max: 100,
        value: 88,
        step: 1
      },
      {
        id: 'tahScoreTah',
        valueDisplayId: 'tahScoreTahV',
        label: {
          en: 'SAAT Tahsili Score (40%) =',
          ar: 'درجة الاختبار التحصيلي (٤٠٪) ='
        },
        ariaLabel: {
          en: 'SAAT Tahsili score from 50 to 100',
          ar: 'درجة الاختبار التحصيلي من 50 إلى 100'
        },
        min: 50,
        max: 100,
        value: 90,
        step: 1
      }
    ],
    readouts: [
      {
        id: 'tahScoreComp',
        label: {
          en: 'Weighted Composite',
          ar: 'النسبة الموزونة الكلية'
        },
        colorClass: 'indigo',
        value: '90.90%'
      },
      {
        id: 'tahScoreTahPts',
        label: {
          en: 'Tahsili Share (40%)',
          ar: 'نصيب التحصيلي (٤٠٪)'
        },
        colorClass: 'amber',
        value: '36.00 / 40'
      },
      {
        id: 'tahScoreTier',
        label: {
          en: 'Admission Competitiveness',
          ar: 'مستوى التنافسية'
        },
        value: 'Competitive Engineering Tier'
      }
    ],
    note: {
      en: 'In standard Saudi STEM & Medical university admissions, SAAT Tahsili carries the single largest weight (\\(40\\%\\)): raising your Tahsili score by \\(10\\) points boosts your overall composite by \\(+4.0\\%\\). Drag the bars directly or adjust the sliders to test target scenarios.',
      ar: 'في معادلة القبول الجامعي للتخصصات العلمية والصحية والهندسية، يمتلك الاختبار التحصيلي الوزن الأكبر منفرداً (\\(40\\%\\)): فرفع درجة التحصيلي بمقدار \\(10\\) درجات يرفع النسبة الموزونة الكلية بمقدار \\(+4.0\\%\\). اسحب الأعمدة مباشرةً أو حرّك المنزلقات لتجربة أهدافك.'
    }
  };

  if (logicIdx !== -1) {
    const logicBlock = about.content.blocks[logicIdx];
    logicBlock.dataPanel.caption = {
      en: 'Logical equivalence between Conditional \\(p \\to q\\) and Contrapositive \\(\\sim q \\to \\sim p\\), and between Converse \\(q \\to p\\) and Inverse \\(\\sim p \\to \\sim q\\).',
      ar: 'التكافؤ المنطقي بين العبارة الشرطية \\(p \\to q\\) والمعاكس الإيجابي \\(\\sim q \\to \\sim p\\)، وبين العكس \\(q \\to p\\) والمعكوس \\(\\sim p \\to \\sim q\\).'
    };
    logicBlock.readouts = [
      {
        id: 'tahLogCond',
        label: { en: 'Conditional \\(p \\to q\\)', ar: 'العبارة الشرطية \\(p \\to q\\)' },
        colorClass: 'indigo',
        value: 'F (خاطئة)'
      },
      {
        id: 'tahLogCont',
        label: { en: 'Contrapositive \\(\\sim q \\to \\sim p\\)', ar: 'المعاكس الإيجابي \\(\\sim q \\to \\sim p\\)' },
        colorClass: 'amber',
        value: 'F (خاطئة)'
      },
      {
        id: 'tahLogConv',
        label: { en: 'Converse \\(q \\to p\\) ≡ Inverse', ar: 'العكس \\(q \\to p\\) ≡ المعكوس' },
        value: 'T (صائبة)'
      }
    ];
    logicBlock.note = {
      en: 'High-Frequency Tahsili Rule (Year 1 Reasoning & Proof): A conditional \\(p \\to q\\) is FALSE only when hypothesis \\(p\\) is True and conclusion \\(q\\) is False. A conditional \\(p \\to q\\) and its contrapositive \\(\\sim q \\to \\sim p\\) always share identical truth values.',
      ar: 'قاعدة متكررة جداً في التحصيلي (التبرير والبرهان — أول ثانوي): العبارة الشرطية \\(p \\to q\\) تكون خاطئة في حالة واحدة فقط هي عندما يكون الفرض \\(p\\) صائباً والنتيجة \\(q\\) خاطئة، وتكافئ منطقياً معاكسها الإيجابي \\(\\sim q \\to \\sim p\\) دائماً.'
    };
    about.content.blocks.splice(logicIdx, 1, tahScoreExplorer);

    if (!geo.content.blocks.some(b => b.kind === 'explorer' && b.canvasId === 'tahLogicCanvas')) {
      const seeAlsoIdx = geo.content.blocks.findIndex(b => b.kind === 'seeAlso');
      if (seeAlsoIdx !== -1) geo.content.blocks.splice(seeAlsoIdx, 0, logicBlock);
      else geo.content.blocks.push(logicBlock);
    }
    writeJson(aboutPath, about);
    writeJson(geoPath, geo);
    console.log('✓ Wired tahScoreCanvas in tah-about.json and moved tahLogicCanvas to tah-geometry.json');
  }
}

// ---------------------------------------------------------------------------
// 2. appc/appc-u4.json -> appc/appc-u2b.json (move appcInvCanvas)
// ---------------------------------------------------------------------------
{
  const u4Path = path.join(CONTENT_DIR, 'appc', 'appc-u4.json');
  const u2bPath = path.join(CONTENT_DIR, 'appc', 'appc-u2b.json');
  const u4 = readJson(u4Path);
  const u2b = readJson(u2bPath);

  const invIdx = u4.content.blocks.findIndex(
    b => b.kind === 'explorer' && b.canvasId === 'appcInvCanvas'
  );
  if (invIdx !== -1) {
    const invBlock = u4.content.blocks.splice(invIdx, 1)[0];
    delete invBlock.canvas3d;
    invBlock.title = {
      en: '⊙ Explorer · Inverse Function Symmetry Across \\(y = x\\)',
      ar: '⊙ مستكشف تفاعلي · تناظر الدالة العكسية حول المستقيم \\(y = x\\)'
    };
    invBlock.ariaLabel = {
      en: 'Interactive coordinate explorer comparing f(x) and its inverse f⁻¹(x) reflected across the line y = x',
      ar: 'مستكشف إحداثي تفاعلي يقارن الدالة f(x) ودالتها العكسية f⁻¹(x) بالانعكاس حول المستقيم y = x'
    };
    if (Array.isArray(invBlock.controls)) {
      invBlock.controls.forEach(c => {
        if (c.id === 'appcInvFn') {
          c.label = { en: 'Invertible Function Family:', ar: 'عائلة الدالة القابلة للعكس:' };
          c.ariaLabel = { en: 'Select invertible function family', ar: 'اختر عائلة الدالة القابلة للعكس' };
        }
        if (c.id === 'appcInvA') {
          c.label = { en: 'Probe input <b>\\(a\\)</b>:', ar: 'قيمة المدخل <b>\\(a\\)</b>:' };
          c.ariaLabel = { en: 'Input value a', ar: 'قيمة المدخل a' };
        }
      });
    }
    invBlock.note = {
      en: 'An invertible function \\(f\\) (indigo) and its inverse \\(f^{-1}\\) (amber) reflect symmetrically across the dashed line \\(y = x\\): every point \\((a, f(a))\\) maps to \\((f(a), a)\\).',
      ar: 'تنعكس الدالة القابلة للعكس \\(f\\) (باللون النيلي) ودالتها العكسية \\(f^{-1}\\) (باللون الكهرماني) بتناظر تام حول المستقيم المتقطع \\(y = x\\)؛ إذ تنتقل كل نقطة \\((a, f(a))\\) إلى \\((f(a), a)\\).'
    };

    if (!u2b.content.blocks.some(b => b.kind === 'explorer' && b.canvasId === 'appcInvCanvas')) {
      const seeAlsoIdx = u2b.content.blocks.findIndex(b => b.kind === 'seeAlso');
      if (seeAlsoIdx !== -1) u2b.content.blocks.splice(seeAlsoIdx, 0, invBlock);
      else u2b.content.blocks.push(invBlock);
    }
    writeJson(u4Path, u4);
    writeJson(u2bPath, u2b);
    console.log('✓ Moved appcInvCanvas from appc/appc-u4.json to appc/appc-u2b.json');
  }
}

// ---------------------------------------------------------------------------
// 3. Remove out-of-syllabus hyperCanvas + duplicate as-radians trig6/invtrig6
//    + clean orphan CSMount lines in explorer scripts
// ---------------------------------------------------------------------------
const REMOVE_EXPLORER_CANVASES = new Set([
  'uge_tahcalc1_hyperCanvas',
  'uge_a2lexplog_hyperCanvas',
  'uge_apbcc1_hyperCanvas',
  'uge_chfoundations_hyperCanvas',
  'uge_asradians_trig6Canvas',
  'uge_asradians_invtrig6Canvas'
]);

const ORPHAN_MOUNT_IDS = [
  'uge_tahcalc1_hyperCanvas',
  'uge_a2lexplog_hyperCanvas',
  'uge_apbcc1_hyperCanvas',
  'uge_chfoundations_hyperCanvas',
  'uge_asradians_trig6Canvas',
  'uge_asradians_invtrig6Canvas',
  'uge_edxnumbersurdssets_mainfnCanvas',
  'uge_ibhlt3_trig6Canvas',
  'uge_ibhlt3_invtrig6Canvas'
];

// ---------------------------------------------------------------------------
// 4. Genuine 3D Keep-List (strip generic fake canvas3d everywhere else)
// ---------------------------------------------------------------------------
const KEEP_3D_BTN_IDS = new Set([
  'a2LinePlane3dBtn',
  'exAuto3dBtn_vec3_a2lvectors',
  'actGeo3dBtn',
  'act2l2conics3dstatsCanvas_3dBtn',
  'agSys3dBtn',
  'exAuto3dBtn_surf_apabu8',
  'exAuto3dBtn_vec3_apbcc3',
  'apsNorm3dBtn',
  'exAuto3dBtn_surf_chappint',
  'vec3dBtn',
  'partial3dBtn',
  'double3dBtn',
  'field3dBtn',
  'edxtrig3dvectorsExCanvas_3dBtn',
  'exAuto3dBtn_solid_estgeometry',
  'est2solidsExCanvas_3dBtn',
  'est2l2trigpolarconicsCanvas_3dBtn',
  'gesaattrigconicsExCanvas_3dBtn',
  'geosolidsExCanvas_3dBtn',
  'ibhlCrossBtn',
  'ibhlPlanes3dBtn',
  'exAuto3dBtn_solid_ibslt3',
  'igmensurationExCanvas_3dBtn',
  'exAuto3dBtn_vec3_lavectors',
  'exAuto3dBtn_vec3_lasystems',
  'exAuto3dBtn_vec3_ladeterminants',
  'exAuto3dBtn_vec3_lavectorspaces',
  'aivectorsembeddingsExCanvas_3dBtn',
  'mvcSlice3dBtn',
  'mvcTangent3dBtn',
  'mvcCrit3dBtn',
  'mvcDbl3dBtn',
  'mvctripleintegralsExCanvas_3dBtn',
  'exAuto3dBtn_vec3_mvcvectorfields',
  'mvcgreenstheoremExCanvas_3dBtn',
  'mvcsurfacedivergencestokesExCanvas_3dBtn',
  'exAuto3dBtn_solid_pcconics',
  'exAuto3dBtn_vec3_pcvectors',
  'qudGeo3dBtn',
  'satGeo3dBtn',
  'tahConic3dBtn'
]);

// ---------------------------------------------------------------------------
// 5. Family metadata for all 9 Main Parent Functions (at default a=1, h=0, k=0)
// ---------------------------------------------------------------------------
const FAMILY_META = {
  constant: {
    title: {
      en: '⊙ Explorer · Constant & Linear Parent Functions Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر الدالة الثابتة والخطية وتحويلات الدوال الأم'
    },
    note: {
      en: 'Starts on the <strong>constant family</strong> \\(f(x) = c\\) (horizontal line with zero slope) and lets you compare all 9 parent families under vertical scale \\(a\\) and shifts \\((h, k)\\).',
      ar: 'يبدأ على <strong>الدالة الثابتة</strong> \\(f(x) = c\\) (مستقيم أفقي ميله صفر) مع إمكانية التبديل بين عائلات الدوال الأم التسع وفحص التمدد \\(a\\) والإزاحتين \\((h, k)\\).'
    },
    eq: 'f(x) = 1',
    dom: '(−∞, ∞)',
    rng: '{1}',
    key: 'Horizontal line y = 1, Slope m = 0',
    int: 'y-int: (0, 1) · x-int: none'
  },
  linear: {
    title: {
      en: '⊙ Explorer · Linear Slope-Shift & Parent Functions Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر الدالة الخطية والميل وتحويلات الدوال الأم'
    },
    note: {
      en: 'Starts on the <strong>linear family</strong> \\(f(x) = a(x - h) + k\\) with slope \\(a\\) and anchor point \\((h, k)\\). Drag \\((h, k)\\) directly on the coordinate plane or switch to any of the 9 parent families.',
      ar: 'يبدأ على <strong>الدالة الخطية</strong> \\(f(x) = a(x - h) + k\\) بميل \\(a\\) ونقطة ارتكاز \\((h, k)\\). اسحب النقطة \\((h, k)\\) مباشرةً على المستوى الإحداثي أو بدّل بين عائلات الدوال الأم التسع.'
    },
    eq: 'f(x) = x',
    dom: '(−∞, ∞)',
    rng: '(−∞, ∞)',
    key: 'Anchor (0, 0), Slope m = 1',
    int: 'y-int: (0, 0) · x-int: (0, 0)'
  },
  quadratic: {
    title: {
      en: '⊙ Explorer · Quadratic Vertex Form & Parent Functions Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر صيغة الرأس التربيعية وتحويلات الدوال الأم'
    },
    note: {
      en: 'Starts on the <strong>quadratic family</strong> \\(f(x) = a(x - h)^2 + k\\) with vertex \\((h, k)\\) and axis of symmetry \\(x = h\\). Drag the vertex on the graph or compare across all 9 parent families.',
      ar: 'يبدأ على <strong>الدالة التربيعية</strong> \\(f(x) = a(x - h)^2 + k\\) برأس \\((h, k)\\) ومحور تماثل \\(x = h\\). اسحب الرأس مباشرةً على الرسم أو قارن بين عائلات الدوال الأم التسع.'
    },
    eq: 'f(x) = x²',
    dom: '(−∞, ∞)',
    rng: '[0, ∞)',
    key: 'Vertex (0, 0), Axis x = 0',
    int: 'y-int: (0, 0) · x-int: (0, 0)'
  },
  cubic: {
    title: {
      en: '⊙ Explorer · Cubic Inflection & Polynomial Parent Functions Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر الدالة التكعيبية ونقطة الانعطاف والدوال الأم'
    },
    note: {
      en: 'Starts on the <strong>cubic polynomial family</strong> \\(f(x) = a(x - h)^3 + k\\) centered at its inflection point \\((h, k)\\). Explore end behavior, zero multiplicity, and transformations across all 9 parent functions.',
      ar: 'يبدأ على <strong>الدالة التكعيبية</strong> \\(f(x) = a(x - h)^3 + k\\) المتمركزة عند نقطة الانعطاف \\((h, k)\\). استكشف سلوك الطرفين والأصفار والتحويلات الهندسية عبر الدوال الأم التسع.'
    },
    eq: 'f(x) = x³',
    dom: '(−∞, ∞)',
    rng: '(−∞, ∞)',
    key: 'Inflection point (0, 0)',
    int: 'y-int: (0, 0) · x-int: (0, 0)'
  },
  absolute: {
    title: {
      en: '⊙ Explorer · Absolute Value (Modulus) & Parent Functions Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر دالة القيمة المطلقة وتحويلات الدوال الأم'
    },
    note: {
      en: 'Starts on the <strong>absolute value (modulus) family</strong> \\(f(x) = a|x - h| + k\\) with V-vertex \\((h, k)\\) and symmetric branch slopes \\(\\pm a\\). Drag \\((h, k)\\) or switch between all 9 parent functions.',
      ar: 'يبدأ على <strong>دالة القيمة المطلقة</strong> \\(f(x) = a|x - h| + k\\) ذات الرأس \\((h, k)\\) وفرعي الميل المتناظرين \\(\\pm a\\). اسحب \\((h, k)\\) أو بدّل بين الدوال الأم التسع.'
    },
    eq: 'f(x) = |x|',
    dom: '(−∞, ∞)',
    rng: '[0, ∞)',
    key: 'Corner Vertex (0, 0), Axis x = 0',
    int: 'y-int: (0, 0) · x-int: (0, 0)'
  },
  radical: {
    title: {
      en: '⊙ Explorer · Radical (Square-Root) Domain & Parent Functions Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر الدالة الجذرية ومجالها وتحويلات الدوال الأم'
    },
    note: {
      en: 'Starts on the <strong>square-root radical family</strong> \\(f(x) = a\\sqrt{x - h} + k\\) with domain \\([h, \\infty)\\) and endpoint \\((h, k)\\). Drag \\((h, k)\\) to see how shifts restrict domain and range.',
      ar: 'يبدأ على <strong>الدالة الجذرية</strong> \\(f(x) = a\\sqrt{x - h} + k\\) ذات المجال \\([h, \\infty)\\) ونقطة البداية \\((h, k)\\). اسحب \\((h, k)\\) لملاحظة أثر الإزاحات على المجال والمدى.'
    },
    eq: 'f(x) = √x',
    dom: '[0, ∞)',
    rng: '[0, ∞)',
    key: 'Endpoint (0, 0)',
    int: 'y-int: (0, 0) · x-int: (0, 0)'
  },
  rational: {
    title: {
      en: '⊙ Explorer · Rational Hyperbola, Asymptotes & Parent Functions Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر الدالة النسبية وخطوط التقارب والدوال الأم'
    },
    note: {
      en: 'Starts on the <strong>rational reciprocal family</strong> \\(f(x) = \\dfrac{a}{x - h} + k\\) with vertical asymptote \\(x = h\\) and horizontal asymptote \\(y = k\\). Drag \\((h, k)\\) to move the asymptote crosshairs live.',
      ar: 'يبدأ على <strong>الدالة النسبية (المقلوب)</strong> \\(f(x) = \\dfrac{a}{x - h} + k\\) بخط تقارب رأسي \\(x = h\\) وخط تقارب أفقي \\(y = k\\). اسحب المركز \\((h, k)\\) لتحريك خطي التقارب مباشرةً.'
    },
    eq: 'f(x) = 1/x',
    dom: '(−∞, 0) ∪ (0, ∞)',
    rng: '(−∞, 0) ∪ (0, ∞)',
    key: 'VA: x = 0 · HA: y = 0',
    int: 'y-int: none · x-int: none'
  },
  exponential: {
    title: {
      en: '⊙ Explorer · Exponential Growth/Decay & Parent Functions Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر النمو والاضمحلال الأسي وتحويلات الدوال الأم'
    },
    note: {
      en: 'Starts on the <strong>exponential family</strong> \\(f(x) = a\\cdot 2^{x - h} + k\\) with horizontal asymptote \\(y = k\\) and anchor \\((h, a + k)\\). Drag \\((h, k)\\) or switch to its logarithmic inverse.',
      ar: 'يبدأ على <strong>الدالة الأسية</strong> \\(f(x) = a\\cdot 2^{x - h} + k\\) بخط تقارب أفقي \\(y = k\\) ونقطة مرجعية \\((h, a + k)\\). اسحب \\((h, k)\\) أو انتقل إلى الدالة اللوغاريتمية العكسية.'
    },
    eq: 'f(x) = 2ˣ',
    dom: '(−∞, ∞)',
    rng: '(0, ∞)',
    key: 'HA: y = 0 · Anchor (0, 1)',
    int: 'y-int: (0, 1) · x-int: none'
  },
  logarithmic: {
    title: {
      en: '⊙ Explorer · Logarithmic Domain, Vertical Asymptote & Parent Functions Lab',
      ar: '⊙ مستكشف تفاعلي · مختبر الدالة اللوغاريتمية وخط التقارب الرأسي والدوال الأم'
    },
    note: {
      en: 'Starts on the <strong>logarithmic family</strong> \\(f(x) = a\\ln(x - h) + k\\) with domain \\((h, \\infty)\\), vertical asymptote \\(x = h\\), and anchor \\((h + 1, k)\\). Drag \\((h, k)\\) to inspect domain shifts.',
      ar: 'يبدأ على <strong>الدالة اللوغاريتمية</strong> \\(f(x) = a\\ln(x - h) + k\\) بمجال \\((h, \\infty)\\) وخط تقارب رأسي \\(x = h\\) ونقطة مرجعية \\((h + 1, k)\\). اسحب \\((h, k)\\) لفحص إزاحة المجال.'
    },
    eq: 'f(x) = ln(x)',
    dom: '(0, ∞)',
    rng: '(−∞, ∞)',
    key: 'VA: x = 0 · Anchor (1, 0)',
    int: 'y-int: none · x-int: (1, 0)'
  }
};

const EXPLICIT_MAINFN_OVERRIDES = {
  'sat/sat-linear': 'linear',
  'sat/sat-linfun': 'linear',
  'sat/sat-quad': 'quadratic',
  'sat/sat-functions': 'quadratic',
  'alg2/a2-rational': 'rational',
  'alg2/a2-radical': 'radical',
  'algebra/ag-radicals': 'radical',
  'algebra/ag-rational': 'rational',
  'algebra/ag-exponents': 'cubic',
  'act2/act2-functions': 'rational',
  'act2/act2-precalc': 'logarithmic',
  'act2l2/act2l2-advanced-functions-equations': 'logarithmic',
  'aslevel/as-funcs': 'rational',
  'gaten/ge-saat-algebra-matrices': 'cubic',
  'est/est-algebra': 'linear',
  'est2/est2-algebra': 'cubic',
  'igcse/ig-functions': 'rational',
  'odes/ode-linear': 'exponential',
  'apab/apab-u1': 'rational',
  'apab/apab-u2': 'cubic',
  'calculus/ch-limits': 'rational',
  'apbc/apbc-overview': 'exponential'
};

const PRESERVE_CUSTOM_MAINFN_TITLE = new Set([
  'apstats/aps-u1',
  'mvc/mvc-partials'
]);

let stripped3dCount = 0;
let kept3dCount = 0;
let removedExplorers = 0;
let syncedMainFn = 0;

const tracks = fs.readdirSync(CONTENT_DIR)
  .filter(d => fs.statSync(path.join(CONTENT_DIR, d)).isDirectory() && fs.existsSync(path.join(CONTENT_DIR, d, '_meta.json')))
  .sort();

for (const t of tracks) {
  const meta = readJson(path.join(CONTENT_DIR, t, '_meta.json'));
  const exJsPath = path.join(EX_DIR, `${t}.js`);
  let exJs = fs.readFileSync(exJsPath, 'utf8');
  let exJsModified = false;

  // Strip orphan CSMount lines if any
  for (const orphanId of ORPHAN_MOUNT_IDS) {
    if (exJs.includes(orphanId)) {
      const lines = exJs.split('\n');
      const filtered = lines.filter(line => !(line.includes('CSMount') && line.includes(orphanId)));
      if (filtered.length !== lines.length) {
        exJs = filtered.join('\n');
        exJsModified = true;
      }
    }
  }

  for (const slug of meta.chapterOrder) {
    const chPath = path.join(CONTENT_DIR, t, `${slug}.json`);
    const ch = readJson(chPath);
    let chModified = false;
    const key = `${t}/${slug}`;

    const nextBlocks = [];
    for (const b of ch.content.blocks) {
      if (b.kind === 'explorer' && REMOVE_EXPLORER_CANVASES.has(b.canvasId)) {
        removedExplorers++;
        chModified = true;
        continue;
      }

      if (b.kind === 'explorer' && b.canvas3d) {
        const btnId = b.canvas3d.btnId;
        if (KEEP_3D_BTN_IDS.has(btnId)) {
          kept3dCount++;
        } else {
          delete b.canvas3d;
          stripped3dCount++;
          chModified = true;
        }
      }

      if (b.kind === 'explorer' && /_mainfnCanvas$/.test(b.canvasId || '')) {
        const selCtrl = (b.controls || []).find(c => Array.isArray(c.options));
        if (selCtrl) {
          const targetFn = EXPLICIT_MAINFN_OVERRIDES[key] || selCtrl.value || 'quadratic';
          const fam = FAMILY_META[targetFn];
          if (fam) {
            selCtrl.value = targetFn;
            selCtrl.options.forEach(o => {
              if (o.value === targetFn) o.selected = true;
              else delete o.selected;
            });
            if (!PRESERVE_CUSTOM_MAINFN_TITLE.has(key)) {
              b.title = { en: fam.title.en, ar: fam.title.ar };
            }
            b.note = { en: fam.note.en, ar: fam.note.ar };
            if (Array.isArray(b.readouts)) {
              b.readouts.forEach(r => {
                if (/Eq$/.test(r.id)) r.value = fam.eq;
                else if (/Dom$/.test(r.id)) r.value = fam.dom;
                else if (/Rng$/.test(r.id)) r.value = fam.rng;
                else if (/Key$/.test(r.id)) r.value = fam.key;
                else if (/Int$/.test(r.id)) r.value = fam.int;
              });
            }
            chModified = true;
            syncedMainFn++;

            // Sync defaultFn in src/scripts/explorers/<track>.js
            const re = new RegExp(`(canvasId:\\s*'${b.canvasId}'[^\\n]*?defaultFn:\\s*')[a-z]+(')`);
            if (re.test(exJs)) {
              const updated = exJs.replace(re, (_, p1, p2) => p1 + targetFn + p2);
              if (updated !== exJs) {
                exJs = updated;
                exJsModified = true;
              }
            }
          }
        }
      }

      nextBlocks.push(b);
    }

    if (chModified) {
      ch.content.blocks = nextBlocks;
      writeJson(chPath, ch);
    }
  }

  if (exJsModified) {
    fs.writeFileSync(exJsPath, exJs, 'utf8');
  }
}

console.log(`✓ Removed ${removedExplorers} out-of-syllabus/duplicate UGE explorers`);
console.log(`✓ Stripped ${stripped3dCount} generic 3D toggles; preserved ${kept3dCount} genuine 3D explorers`);
console.log(`✓ Synchronized ${syncedMainFn} Main Parent Functions explorers (HTML select + title + note + readouts + JS defaultFn)`);
