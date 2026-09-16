/* ClipSAT -- site-wide JavaScript engine, real source of truth.
   ============================================================================
   WP10 step 2 (retiring the legacy index.html/build.js extraction pipeline):
   this file used to be regex-extracted from index.html inline <script> blocks
   on every build (concatenated in document order, MathJax config swapped for
   a KaTeX shim in the first block -- both permanent, one-time transforms now
   applied directly below instead of at build time). It is now hand-edited
   directly -- build.js Step 3 just prepends the search index and minifies
   THIS file into public/js/engine.js, it no longer reads index.html for JS
   at all. index.html no longer has any real inline <script> content.

   SEARCH_CHAPTER_INDEX is now GENERATED, not hand-frozen: build.js reads
   every content/{track}/*.json (via src/_data/migratedContent.js, the same
   module Eleventy uses to render the actual pages, so this can't drift from
   what's really on the site) plus each track's practiceSetId/testGeneratorId
   /downloadsId, and prepends `window.SEARCH_CHAPTER_INDEX = [...]` onto this
   file's compiled output (see build.js's "Generate search index" step).
   Each entry also carries `keywords` — short concept phrases (rule names,
   definition/theorem/worked-example labels) harvested from that chapter's
   `cards`/`callout` blocks, so a search for e.g. "chain rule" or "law of
   cosines" can find the right chapter even when that phrase never appears in
   the chapter title itself. The line below is just a safe empty fallback in
   case a stray direct load of this source file (bypassing build.js) ever
   happens — production always ships the generated version ahead of it. */
window.SEARCH_CHAPTER_INDEX = window.SEARCH_CHAPTER_INDEX || [];

/* ══ Teacher-tools Arabic/RTL (Qudrat & Tahsili only) ═══════════════════════
   Every generator below (lesson plan, printed chapter, assignment, progress
   report, quiz/.docx exports) sources its actual question/chapter CONTENT
   straight from the live page or the track's own already-bilingual question
   bank — so on Qudrat/Tahsili in Arabic mode that content is already correct
   once it's harvested. What ISN'T translated is each generator's own
   hardcoded CHROME: section headers, field labels, table headers, button
   text. _ttAr() gates that chrome translation + RTL layout narrowly to these
   two tracks in Arabic mode — every other track's chapter prose and question
   bank is still English-only, so flipping their generated documents' chrome
   to Arabic/RTL around English content would look broken, not bilingual.
   Reads localStorage directly (not the later-declared `_locale` var) so this
   is safe to call from code defined earlier in the file — every call site is
   a user-triggered handler that only runs long after the whole script (incl.
   the i18n setup below) has finished its initial top-to-bottom execution. */
function _ttAr(track){
  var loc = 'en';
  try { loc = localStorage.getItem('clipsat_locale') || 'en'; } catch(e) {}
  /* Optional track override — CSAssign.generate() lets a teacher pick ANY
     course from a dropdown regardless of which page they opened it from, so
     the generated document's language must follow the CHOSEN course, not
     necessarily window.CLIPSAT_TRACK (the current page). Every other call
     site omits this and gets the current-page default. */
  var trk = track || window.CLIPSAT_TRACK || '';
  return loc === 'ar' && (trk === 'qudrat' || trk === 'tahsili');
}
function _ttDir(track){ return _ttAr(track) ? 'rtl' : 'ltr'; }
var _TT_STR = {
  en: {
    printPdf:'🖨 Print / Save PDF', dateLabel:'Date:', teacherCopy:'Teacher Copy', studyNotes:'Study Notes',
    noContentToPrint:'No content found to print.', popupBlocked:'Please allow pop-ups for this site, then try again.',
    navigateFirst:'Navigate to a subject first.',
    assignModalTitle:'📝 Generate Assignment', courseLabel:'Course', questionsLabel:'Questions', difficultyLabel:'Difficulty',
    allLevels:'All Levels', easy:'Easy', medium:'Medium', hard:'Hard',
    genAssignBtn:'Generate Assignment', genAssignKeyBtn:'+ Answer Key',
    noBankFound:'No question bank found for: ', noQuestionsInBankPrefix:'No questions in bank for: ', noQuestionsInBankSuffix:'. Try another course.',
    assignmentDocTitle:'ClipSAT Assignment', assignmentWord:'Assignment',
    studentName:'Student Name', classGrade:'Class / Grade', scoreLabel:'Score',
    questionsHeadingPrefix:'Questions — ', questionsWord:'questions', answerKeyHeading:'Answer Key',
    colNum:'#', colAnswer:'Answer', colQuestionExcerpt:'Question (excerpt)',
    progressReportDocTitle:'ClipSAT Progress Report', progressReportSubtitle:'by Mr. Mohamed — Student Progress Report',
    questionsAttempted:'Questions Attempted', overallAccuracy:'Overall Accuracy', mistakesLogged:'Mistakes Logged',
    strongestTopic:'Strongest Topic', needsMostWork:'Needs Most Work',
    topicMastery:'Topic Mastery', recentScoreHistory:'Recent Score History', recentMistakes:'Recent Mistakes (last 30)',
    colTopic:'Topic', colAttempted:'Attempted', colCorrect:'Correct', colAccuracy:'Accuracy',
    colDate:'Date', colScore:'Score', colPercent:'%', colQuestion:'Question', colYourAnswer:'Your Answer', colCorrectAnswer:'Correct Answer',
    noMasteryYet:'No mastery data yet — complete some quizzes first', noScoreHistoryYet:'No score history yet', noMistakesYet:'No mistakes recorded yet',
    reportFooter:'ClipSAT by Mr. Mohamed — clipsat.com — Generated ',
    understandKeyConcepts:'Understand key concepts in ', lessonPlanDocTitlePrefix:'Lesson Plan — ', lessonPlanLabel:'Lesson Plan',
    durationLabel:'Duration:', classLabel:'Class:', durationPlaceholder:'____ min',
    lessonInfo:'Lesson Information', unitTopic:'Unit / Topic', gradeLevel:'Grade Level',
    curriculumBoard:'Curriculum / Exam Board', priorKnowledge:'Prior Knowledge Required',
    learningObjectives:'Learning Objectives', studentsWillUnderstand:'Students will understand: ',
    studentsWillApply:'Students will apply concepts through worked examples and practice',
    keyVocab:'Key Vocabulary & Concepts', termConcept:'Term / Concept', defDescription:'Definition / Description',
    teachingStrategy:'Teaching Strategy & Resources',
    educationalTools:'Educational Tools', educationalToolsBody:'ClipSAT interactive explorer · GDC / Calculator · Textbook',
    digitalDevices:'Digital Devices', digitalDevicesBody:'Laptop / Tablet with ClipSAT · Projector for class demonstration',
    pedagogicalApproach:'Pedagogical Approach', pedagogicalApproachBody:'Worked examples → Guided practice → Independent problem solving',
    timing:'Timing', timingBody:'10 min intro · 20 min examples · 15 min practice · 5 min wrap-up',
    workedExamples:'Worked Examples', exampleWord:'Example',
    studentNotes:'Student Notes & Observations', practiceAssess:'Practice Problems & Assessment',
    generateQuizFirst:'Generate a quiz first, then export.', docxLoading:'The .docx engine is still loading — please try again in a moment.',
    generatedLabel:'Generated: ', colQuestionChoices:'Question & Choices', colAnswerSolution:'Answer / Solution', colInfo:'Info',
    docxFailAlert:'Sorry — the .docx could not be generated in this browser.',
    couldNotFindLesson:'Could not find the lesson to export.', noProblemsFound:'No practice problems were found to export.',
    learningObjectivesCaps:'LEARNING OBJECTIVES', workedExamplesCaps:'WORKED EXAMPLES', practiceProblemsCaps:'PRACTICE PROBLEMS',
    solutionColon:'Solution:', solutionInline:'Solution:  ', solutionBlank:'Solution: ___________________________________',
    pageWord:'Page ', ofWord:' of ',
    tmTeacherMode:'📐 Teacher Mode', tmLessonPlan:'📋 Lesson Plan', tmPrintChapterPdf:'🖨 Print Chapter (PDF)',
    tmQuizWordExport:'📝 Quiz Word Export', tmChapterDocx:'📄 Chapter .docx', tmAssignment:'📝 Assignment',
    tmProgressReport:'📊 Progress Report', tmOff:'✕ Off'
  },
  ar: {
    printPdf:'🖨 طباعة / حفظ PDF', dateLabel:'التاريخ:', teacherCopy:'نسخة المعلم', studyNotes:'ملاحظات دراسية',
    noContentToPrint:'لم يتم العثور على محتوى للطباعة.', popupBlocked:'يرجى السماح بالنوافذ المنبثقة لهذا الموقع، ثم المحاولة مرة أخرى.',
    navigateFirst:'انتقل إلى مادة أولاً.',
    assignModalTitle:'📝 إنشاء واجب', courseLabel:'المادة', questionsLabel:'عدد الأسئلة', difficultyLabel:'مستوى الصعوبة',
    allLevels:'كل المستويات', easy:'سهل', medium:'متوسط', hard:'صعب',
    genAssignBtn:'إنشاء الواجب', genAssignKeyBtn:'+ نموذج الإجابة',
    noBankFound:'لم يتم العثور على بنك أسئلة لـ: ', noQuestionsInBankPrefix:'لا توجد أسئلة في البنك لـ: ', noQuestionsInBankSuffix:'. جرّب مادة أخرى.',
    assignmentDocTitle:'واجب ClipSAT', assignmentWord:'واجب',
    studentName:'اسم الطالب', classGrade:'الصف / الفصل', scoreLabel:'الدرجة',
    questionsHeadingPrefix:'الأسئلة — ', questionsWord:'سؤالًا', answerKeyHeading:'نموذج الإجابة',
    colNum:'#', colAnswer:'الإجابة', colQuestionExcerpt:'السؤال (مقتطف)',
    progressReportDocTitle:'تقرير تقدم ClipSAT', progressReportSubtitle:'بواسطة الأستاذ محمد — تقرير تقدم الطالب',
    questionsAttempted:'الأسئلة المحلولة', overallAccuracy:'الدقة الإجمالية', mistakesLogged:'الأخطاء المسجّلة',
    strongestTopic:'أقوى موضوع', needsMostWork:'يحتاج إلى تحسين',
    topicMastery:'إتقان الموضوعات', recentScoreHistory:'سجل الدرجات الأخيرة', recentMistakes:'آخر الأخطاء (آخر 30)',
    colTopic:'الموضوع', colAttempted:'المحاولات', colCorrect:'الصحيح', colAccuracy:'الدقة',
    colDate:'التاريخ', colScore:'الدرجة', colPercent:'%', colQuestion:'السؤال', colYourAnswer:'إجابتك', colCorrectAnswer:'الإجابة الصحيحة',
    noMasteryYet:'لا توجد بيانات إتقان بعد — أكمل بعض الاختبارات أولاً', noScoreHistoryYet:'لا يوجد سجل درجات بعد', noMistakesYet:'لم يتم تسجيل أي أخطاء بعد',
    reportFooter:'ClipSAT بواسطة الأستاذ محمد — clipsat.com — أُنشئ في ',
    understandKeyConcepts:'فهم المفاهيم الأساسية في ', lessonPlanDocTitlePrefix:'خطة الدرس — ', lessonPlanLabel:'خطة الدرس',
    durationLabel:'المدة:', classLabel:'الصف:', durationPlaceholder:'____ دقيقة',
    lessonInfo:'معلومات الدرس', unitTopic:'الوحدة / الموضوع', gradeLevel:'المستوى الدراسي',
    curriculumBoard:'المنهج / جهة الامتحان', priorKnowledge:'المعرفة المسبقة المطلوبة',
    learningObjectives:'أهداف التعلّم', studentsWillUnderstand:'سيفهم الطلاب: ',
    studentsWillApply:'سيطبّق الطلاب المفاهيم من خلال أمثلة محلولة وتدريبات',
    keyVocab:'المفردات والمفاهيم الأساسية', termConcept:'المصطلح / المفهوم', defDescription:'التعريف / الوصف',
    teachingStrategy:'استراتيجية التدريس والموارد',
    educationalTools:'الأدوات التعليمية', educationalToolsBody:'أداة ClipSAT التفاعلية · آلة حاسبة بيانية · الكتاب المدرسي',
    digitalDevices:'الأجهزة الرقمية', digitalDevicesBody:'حاسوب محمول / جهاز لوحي مع ClipSAT · جهاز عرض للشرح أمام الفصل',
    pedagogicalApproach:'المنهج التربوي', pedagogicalApproachBody:'أمثلة محلولة ← تدريب موجّه ← حل مسائل مستقل',
    timing:'التوقيت', timingBody:'10 دقائق مقدمة · 20 دقيقة أمثلة · 15 دقيقة تدريب · 5 دقائق ختام',
    workedExamples:'أمثلة محلولة', exampleWord:'مثال',
    studentNotes:'ملاحظات الطالب', practiceAssess:'مسائل تدريبية وتقييم',
    generateQuizFirst:'أنشئ اختبارًا أولاً، ثم صدّره.', docxLoading:'محرك ملفات ‎.docx‎ لا يزال قيد التحميل — يرجى المحاولة مرة أخرى بعد قليل.',
    generatedLabel:'أُنشئ في: ', colQuestionChoices:'السؤال والخيارات', colAnswerSolution:'الإجابة / الحل', colInfo:'معلومات',
    docxFailAlert:'عذرًا — تعذّر إنشاء ملف ‎.docx‎ في هذا المتصفح.',
    couldNotFindLesson:'تعذّر العثور على الدرس لتصديره.', noProblemsFound:'لم يتم العثور على مسائل تدريبية لتصديرها.',
    learningObjectivesCaps:'أهداف التعلّم', workedExamplesCaps:'أمثلة محلولة', practiceProblemsCaps:'مسائل تدريبية',
    solutionColon:'الحل:', solutionInline:'الحل: ', solutionBlank:'الحل: ___________________________________',
    pageWord:'صفحة ', ofWord:' من ',
    tmTeacherMode:'📐 وضع المعلم', tmLessonPlan:'📋 خطة الدرس', tmPrintChapterPdf:'🖨 طباعة الفصل (PDF)',
    tmQuizWordExport:'📝 تصدير الاختبار Word', tmChapterDocx:'📄 الفصل .docx', tmAssignment:'📝 واجب',
    tmProgressReport:'📊 تقرير التقدم', tmOff:'✕ إيقاف'
  }
};
function _tt(key,track){
  var dict = _TT_STR[_ttAr(track) ? 'ar' : 'en'];
  var v = dict ? dict[key] : null;
  return v != null ? v : (_TT_STR.en[key] != null ? _TT_STR.en[key] : key);
}

/* [MathJax config removed — KaTeX used instead] */

/* ─────────────────────────────────────────────── */

