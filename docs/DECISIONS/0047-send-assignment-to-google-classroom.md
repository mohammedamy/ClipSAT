# ADR 0047 — Send an assignment to Google Classroom as a link

**Date:** 2026-09-29
**Status:** Accepted
**Related:** ADR 0043 (the assignment tool ships with Teacher Mode). `public/js/quiz-capture-ui.js`
records why the site doesn't post to Classroom through its API.

## Context

Teacher Mode's assignment tool (`CSAssign`) picks questions from a course's bank and opens a
printable page. Teachers asked to send an assignment to Google Classroom.

- **Posting through the Classroom API is ruled out.** It needs the restricted
  `classroom.coursework.students` scope. Google requires a paid yearly security assessment
  (CASA, about $540+ a year) before a restricted scope can be used beyond a few named test users.
- **Google's Share to Classroom button needs no scope.** The teacher picks the class in Google's
  own window and posts the link as an assignment. The site already loads its script
  (`platform.js`) in every page header, for the "share this page" button.
- **Classroom can only post a link, so the questions need a page of their own.** Bank questions
  have no ids, and a bank's question order changes when the bank is edited.

## Decision

1. **The assignment tool gets a "Send to Google Classroom" button** (`CSAssign.classroom`,
   `22b-assign-report.js`).
   - It picks the questions the same way as the printable assignment (`pick()`, now shared).
     The picking skips repeated questions and repeated ideas (`05e-redundancy-check.js`).
   - It builds a link such as `/geo/?assign=1v5m154.am1ske…`: the course's page plus one key per
     question.
   - It shows Google's Share to Classroom button, set to *assignment*, for that link. If Google's
     script is not available, it shows a plain link to the same share page instead
     (`classroom.google.com/share?url=…&itemtype=assignment`).
   - It also shows the student link with a Copy button, and a preview.
2. **A question's key is a hash of its text and choices** (FNV-1a, base 36; `CSAssignKey` in
   `22c-assign-link.js`). The printable assignment still shuffles the choices, so a key is
   always computed on the bank's own choice order.
3. **The student view loads only from a link.**
   - `22c-assign-link.js` is in `engine.js`, about 0.7KB.
   - When the URL has `?assign=`, it loads `public/js/assignment-view.js` (`22d`, 5KB).
   - The view shows the questions at the top of the course page. It uses the chapter quiz's markup
     and `cqPick()`, so each answer is marked on the spot and scored like a chapter quiz, with
     figures and math.
   - A question with no valid multiple-choice answer shows a "Show solution" button instead.
   - A key that no longer matches a bank question, for example because the question was edited
     after the link was made, is left out, and the view says how many are missing.
4. **The link uses a query, not a `#hash`,** because the page's router rewrites the hash to
   `#view/<track>/<chapter>` on load.
5. **03's `_maths` (the chapter quiz's LaTeX-aware escaper) moves out of `genChapterQuiz`** to
   the enclosing scope, unchanged, and is exported as `window.CSQuizMath` for the view.

## Consequences

- **Scores are not sent back to Classroom.** The student sees their score and marks the
  assignment done in Classroom. For graded results a teacher can still use the existing
  "Create Google Form" flow, whose Form link can be shared the same way.
- **An assignment link keeps working until one of its questions is edited;** that question
  then drops out of the assignment.
- `engine.js` goes from 274KB to 275KB.
- Tests (`tracks.spec.js`, new):
  - with Teacher Mode on, *Send to Google Classroom* for 5 Geometry questions gives a student
    link with 5 keys and a Classroom share link carrying it with `itemtype=assignment`;
  - opening the student link shows those 5 questions in the link's order, with every figure
    drawn;
  - choosing an answer marks it and counts it;
  - the view is not in `engine.js` and loads only with a link;
  - a link with one unknown key shows the other 2 questions and says 1 is missing;
  - the printable assignment still opens;
  - there are no page errors.
