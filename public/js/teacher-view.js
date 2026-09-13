/**
 * ClipSAT Teacher/Parent View  v1.2
 * ════════════════════════════════════════════════════════════════════════
 * Simple class-code roster view on top of cloud-sync.js's Supabase backend
 * (see SUPABASE_SETUP.md + supabase/schema.sql's "classes"/"class_members"
 * tables, and the "teacher reads roster …" RLS policies). No separate
 * "teacher" role — creating a class makes you its owner for that class;
 * any signed-in user can own classes, join others, or both.
 *
 * Each roster row shows overall accuracy plus a "Last active" signal (from
 * chapter_visits) and an expandable "Weakest ▾" list of that student's
 * lowest-accuracy track/domain buckets (from accuracy, kept at track/domain
 * granularity instead of only summed) — the "see aggregate mastery" half of
 * Pillar 3's teacher/parent view.
 *
 * Assignments (supabase/schema.sql's "assignments"/"assignment_completions"
 * tables) cover the other half of that same roadmap line — "assign a
 * chapter/mock exam to a roster": a teacher picks a track + writes a free-
 * text label (e.g. "Chapter 3: Derivatives"), every member of the class
 * sees it under "Classes you've joined" and self-reports done/not done.
 * Completion is a self-report, not derived from accuracy/chapter_visits —
 * the bank/quiz engine has no way to tie one attempt to one assignment, so
 * a checkbox is honest about what it is instead of guessing.
 *
 * Privacy: joining is opt-in (a code the student was given, never
 * auto-shared), the display name shown to a teacher is per-class and
 * optional, and leaving a class immediately cuts off the teacher's read
 * access — enforced server-side by RLS, not by this file.
 *
 * This whole module stays inert (nav button hidden) until cloud-sync.js
 * is configured AND the user is signed in — same "no accounts, nothing
 * changes" guarantee as cloud-sync.js itself.
 *
 * Public API — window.TeacherView
 * ─────────────────────────────────
 *   .openModal() / .closeModal()
 * The individual actions (create/join/leave/delete) are wired directly
 * from the modal's onclick handlers — see the window.tv* functions below.
 */
(function () {
  'use strict';

  var _sb = null;

  function getClient() {
    if (_sb) return _sb;
    if (window.ClipSATCloud && window.ClipSATCloud.getClient) _sb = window.ClipSATCloud.getClient();
    return _sb;
  }

  function isReady() {
    return !!(window.ClipSATCloud && window.ClipSATCloud.configured && window.ClipSATCloud.isSignedIn() && getClient());
  }

  function escT(s) { return s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : ''; }

  function setStatus(id, msg, isError) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg || '';
    el.style.color = isError ? '#dc2626' : '';
  }

  function randomCode() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I — avoids ambiguity when read aloud/handwritten
    var out = '';
    for (var i = 0; i < 6; i++) out += chars[Math.floor(Math.random() * chars.length)];
    return out;
  }

  function timeAgo(ms) {
    var diff = Date.now() - ms;
    if (diff < 0) diff = 0;
    var mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + 'm ago';
    var hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + 'h ago';
    var days = Math.floor(hrs / 24);
    if (days < 30) return days + 'd ago';
    var months = Math.floor(days / 30);
    if (months < 12) return months + 'mo ago';
    return Math.floor(months / 12) + 'y ago';
  }

  // Weakest track/domain buckets for one student, worst-accuracy first —
  // same "weakest first" idea as the student's own AccuracyLog.chapterMastery
  // (src/scripts/engine.js), just spanning every track instead of one.
  // Buckets under MIN_ATTEMPTS are dropped so a single lucky/unlucky
  // question doesn't misrepresent a student as mastering or failing a topic.
  function weakestBuckets(bucketMap) {
    if (!bucketMap) return [];
    var MIN_ATTEMPTS = 3;
    return Object.keys(bucketMap).map(function (k) { return bucketMap[k]; })
      .filter(function (b) { return b.t >= MIN_ATTEMPTS; })
      .sort(function (a, b) { return (a.c / a.t) - (b.c / b.t); })
      .slice(0, 3);
  }

  // Track id -> display label, for the "assign to this class" track picker.
  // Keep in sync with content/*/_meta.json's meta.title.en — 23 tracks as
  // of this writing (a newly-launched track needs a line added here too;
  // nothing breaks if one's missing, the picker just shows the raw id).
  var TRACK_LABELS = {
    a2level: 'A2 Level Mathematics', act: 'ACT Math', act2: 'ACT Math 2',
    alg2: 'Algebra 2', algebra: 'Algebra', apab: 'AP Calculus AB',
    apbc: 'AP Calculus BC', appc: 'AP Precalculus', apstats: 'AP Statistics',
    aslevel: 'AS Level Mathematics', calculus: 'Calculus', est: 'EST Math',
    est2: 'EST 2 Math', geo: 'Geometry', ibhl: 'IB Math HL (AA/AI)',
    ibsl: 'IB Math SL (AA/AI)', igcse: 'IGCSE 0580', linalg: 'Linear Algebra',
    mvc: 'Multivariable Calculus', odes: 'Differential Equations',
    precalc: 'Pre-Calculus', qudrat: 'GAT Qudrat', sat: 'Digital SAT Math',
    tahsili: 'SAAT Tahsili'
  };

  function trackOptionsHtml() {
    return Object.keys(TRACK_LABELS).sort(function (a, b) {
      return TRACK_LABELS[a].localeCompare(TRACK_LABELS[b]);
    }).map(function (k) {
      return '<option value="' + k + '">' + escT(TRACK_LABELS[k]) + '</option>';
    }).join('');
  }

  // ── Modal open/close ───────────────────────────────────────────────
  window.openTeacherView = function () {
    var m = document.getElementById('teacher-view-modal');
    if (!m) return;
    m.classList.add('show');
    refreshAll();
  };
  window.closeTeacherView = function () {
    var m = document.getElementById('teacher-view-modal');
    if (m) m.classList.remove('show');
  };

  // ── Create a class (retries once on a code collision — astronomically
  //    unlikely at this scale, but cheap to guard against) ──────────────
  window.tvCreateClass = function () {
    var sb = getClient();
    var input = document.getElementById('tv-create-name');
    var name = input && input.value.trim();
    if (!sb || !name) { setStatus('tv-create-status', 'Enter a class name first.', true); return; }
    setStatus('tv-create-status', 'Creating…');
    var uid = window.ClipSATCloud.currentUserId();
    var attempt = function (triesLeft) {
      var code = randomCode();
      sb.from('classes').insert({ owner_id: uid, name: name, code: code }).select().single()
        .then(function (r) {
          if (r.error) {
            if (triesLeft > 0 && /duplicate|unique/i.test(r.error.message || '')) { attempt(triesLeft - 1); return; }
            setStatus('tv-create-status', r.error.message, true);
            return;
          }
          if (input) input.value = '';
          setStatus('tv-create-status', 'Created — share code: ' + code);
          refreshMyClasses();
        });
    };
    attempt(2);
  };

  // ── Join a class by code ───────────────────────────────────────────
  window.tvJoinClass = function () {
    var sb = getClient();
    var codeInput = document.getElementById('tv-join-code');
    var nameInput = document.getElementById('tv-join-name');
    var code = codeInput && codeInput.value.trim();
    if (!sb || !code) { setStatus('tv-join-status', 'Enter a class code first.', true); return; }
    setStatus('tv-join-status', 'Joining…');
    sb.rpc('join_class_by_code', { p_code: code, p_display_name: nameInput ? nameInput.value.trim() : null })
      .then(function (r) {
        if (r.error) { setStatus('tv-join-status', r.error.message, true); return; }
        var row = r.data && r.data[0];
        setStatus('tv-join-status', row ? ('Joined: ' + row.class_name) : 'Joined!');
        if (codeInput) codeInput.value = '';
        refreshMyMemberships();
      });
  };

  // ── Leave (as a student) / delete (as the owner) ───────────────────
  window.tvLeaveClass = function (classId) {
    var sb = getClient();
    if (!sb || !window.confirm('Leave this class? The teacher will no longer see your progress.')) return;
    var uid = window.ClipSATCloud.currentUserId();
    sb.from('class_members').delete().eq('class_id', classId).eq('student_id', uid)
      .then(function () { refreshMyMemberships(); });
  };
  window.tvDeleteClass = function (classId) {
    var sb = getClient();
    if (!sb || !window.confirm('Delete this class? Students will lose access to it (their own progress is unaffected).')) return;
    sb.from('classes').delete().eq('id', classId)
      .then(function () { refreshMyClasses(); });
  };

  // ── Rendering: classes I own, each with its roster + aggregate accuracy ─
  function refreshMyClasses() {
    var sb = getClient(), out = document.getElementById('tv-my-classes');
    if (!sb || !out) return;
    var uid = window.ClipSATCloud.currentUserId();
    sb.from('classes').select('*').eq('owner_id', uid).order('created_at', { ascending: false })
      .then(function (r) {
        if (r.error || !r.data) { out.innerHTML = ''; return; }
        if (!r.data.length) { out.innerHTML = '<p class="tv-empty">You don’t own any classes yet — create one above.</p>'; return; }
        out.innerHTML = r.data.map(function (c) {
          return '<div class="tv-class-card">'
            + '<div class="tv-class-head"><b>' + escT(c.name) + '</b>'
            + '<span class="tv-code" title="Share this code with students">' + escT(c.code) + '</span>'
            + '<button class="tv-delete" onclick="window.tvDeleteClass(\'' + c.id + '\')" title="Delete class" aria-label="Delete class">🗑</button></div>'
            + '<div class="tv-roster" id="tv-roster-' + c.id + '">Loading roster…</div>'
            + '<div class="tv-assign-section"><h5>Assignments</h5>'
            + '<div id="tv-assign-' + c.id + '">Loading…</div>'
            + '<div class="tv-assign-form">'
            + '<select id="tv-assign-track-' + c.id + '">' + trackOptionsHtml() + '</select>'
            + '<input type="text" id="tv-assign-label-' + c.id + '" placeholder="e.g. Chapter 3: Derivatives">'
            + '<input type="date" id="tv-assign-due-' + c.id + '" title="Due date (optional)">'
            + '<button type="button" class="tv-assign-btn" onclick="window.tvCreateAssignment(\'' + c.id + '\')">Assign</button>'
            + '</div></div>'
            + '</div>';
        }).join('');
        r.data.forEach(function (c) { loadRoster(c.id); loadAssignmentsForTeacher(c.id); });
      });
  }

  function loadRoster(classId) {
    var sb = getClient();
    var el = document.getElementById('tv-roster-' + classId);
    if (!sb || !el) return;
    sb.from('class_members').select('student_id,display_name').eq('class_id', classId)
      .then(function (r) {
        if (r.error) { el.innerHTML = '<p class="tv-empty">' + escT(r.error.message) + '</p>'; return; }
        var members = r.data || [];
        if (!members.length) { el.innerHTML = '<p class="tv-empty">No students yet — share the code above.</p>'; return; }
        var ids = members.map(function (m) { return m.student_id; });
        // Aggregate mastery (Pillar 3 "see aggregate mastery"): overall
        // accuracy from `accuracy`, plus the same rows kept at track/domain
        // granularity so each row can expand into its weakest areas —
        // and `chapter_visits` for a "last active" signal, so a teacher can
        // spot a student who's gone quiet, not just one who's struggling.
        Promise.all([
          sb.from('accuracy').select('user_id,track,domain,correct,total').in('user_id', ids),
          sb.from('chapter_visits').select('user_id,updated_at').in('user_id', ids)
        ]).then(function (results) {
          var ar = results[0], vr = results[1];
          var byUser = {};        // uid -> {c,t} overall
          var bucketsByUser = {}; // uid -> { "track::domain" -> {track,domain,c,t} }
          (ar.data || []).forEach(function (row) {
            var agg = byUser[row.user_id] || { c: 0, t: 0 };
            agg.c += row.correct || 0; agg.t += row.total || 0;
            byUser[row.user_id] = agg;
            var buckets = bucketsByUser[row.user_id] || (bucketsByUser[row.user_id] = {});
            var key = row.track + '::' + row.domain;
            var b = buckets[key] || { track: row.track, domain: row.domain, c: 0, t: 0 };
            b.c += row.correct || 0; b.t += row.total || 0;
            buckets[key] = b;
          });
          var lastActiveByUser = {};
          (vr.data || []).forEach(function (row) {
            var t = row.updated_at ? Date.parse(row.updated_at) : 0;
            if (!lastActiveByUser[row.user_id] || t > lastActiveByUser[row.user_id]) lastActiveByUser[row.user_id] = t;
          });
          el.innerHTML = '<table class="tv-roster-table"><thead><tr><th>Student</th><th>Accuracy</th><th>Last active</th><th></th></tr></thead><tbody>'
            + members.map(function (m, i) {
                var agg = byUser[m.student_id] || { c: 0, t: 0 };
                var pct = agg.t ? Math.round(agg.c / agg.t * 100) : null;
                var label = m.display_name ? escT(m.display_name) : ('Student ' + (i + 1) + ' <span class="tv-anon">(no name shared)</span>');
                var pctStr = pct === null ? '<span class="tv-nodata">no data yet</span>' : (pct + '% <span class="tv-frac">(' + agg.c + '/' + agg.t + ')</span>');
                var color = pct === null ? '' : (pct >= 80 ? '#16a34a' : (pct >= 50 ? '#d97706' : '#dc2626'));
                var lastMs = lastActiveByUser[m.student_id];
                var lastStr = lastMs ? timeAgo(lastMs) : '<span class="tv-nodata">—</span>';
                var weak = weakestBuckets(bucketsByUser[m.student_id]);
                var rowId = 'tv-detail-' + classId + '-' + i;
                var toggle = weak.length
                  ? '<button type="button" class="tv-detail-toggle" onclick="document.getElementById(\'' + rowId + '\').classList.toggle(\'tv-show\')">Weakest ▾</button>'
                  : '';
                var detailRow = '<tr class="tv-detail-row" id="' + rowId + '"><td colspan="4">'
                  + (weak.length ? '<ul class="tv-weak-list">' + weak.map(function (b) {
                      var wp = b.t ? Math.round(b.c / b.t * 100) : 0;
                      return '<li><span class="tv-weak-track">' + escT(b.track) + '</span> — ' + escT(b.domain) + ': <b>' + wp + '%</b> <span class="tv-frac">(' + b.c + '/' + b.t + ')</span></li>';
                    }).join('') + '</ul>' : '')
                  + '</td></tr>';
                return '<tr><td>' + label + '</td><td' + (color ? ' style="color:' + color + ';font-weight:700"' : '') + '>' + pctStr + '</td><td>' + lastStr + '</td><td>' + toggle + '</td></tr>' + detailRow;
              }).join('')
            + '</tbody></table>';
        });
      });
  }

  // ── Assignments: "assign a chapter/mock exam to a roster" ────────────
  function loadAssignmentsForTeacher(classId) {
    var sb = getClient();
    var el = document.getElementById('tv-assign-' + classId);
    if (!sb || !el) return;
    Promise.all([
      sb.from('assignments').select('id,track,label,due_date').eq('class_id', classId).order('created_at', { ascending: false }),
      sb.from('class_members').select('student_id').eq('class_id', classId)
    ]).then(function (results) {
      var ar = results[0], mr = results[1];
      var assignments = ar.data || [];
      var total = (mr.data || []).length;
      if (!assignments.length) { el.innerHTML = '<p class="tv-empty">No assignments yet.</p>'; return; }
      var ids = assignments.map(function (a) { return a.id; });
      sb.from('assignment_completions').select('assignment_id').in('assignment_id', ids)
        .then(function (cr) {
          var doneCount = {};
          (cr.data || []).forEach(function (row) { doneCount[row.assignment_id] = (doneCount[row.assignment_id] || 0) + 1; });
          el.innerHTML = '<ul class="tv-assign-list">' + assignments.map(function (a) {
            var n = doneCount[a.id] || 0;
            var due = a.due_date ? ' <span class="tv-frac">(due ' + escT(a.due_date) + ')</span>' : '';
            return '<li><span class="tv-weak-track">' + escT(TRACK_LABELS[a.track] || a.track) + '</span> — '
              + escT(a.label) + due + ' <span class="tv-frac">(' + n + '/' + total + ' done)</span>'
              + '<button type="button" class="tv-delete" onclick="window.tvDeleteAssignment(\'' + a.id + '\',\'' + classId + '\')" title="Delete assignment" aria-label="Delete assignment">🗑</button></li>';
          }).join('') + '</ul>';
        });
    });
  }

  window.tvCreateAssignment = function (classId) {
    var sb = getClient();
    var trackSel = document.getElementById('tv-assign-track-' + classId);
    var labelInput = document.getElementById('tv-assign-label-' + classId);
    var dueInput = document.getElementById('tv-assign-due-' + classId);
    var track = trackSel && trackSel.value;
    var label = labelInput && labelInput.value.trim();
    if (!sb || !track || !label) return;
    sb.from('assignments').insert({ class_id: classId, track: track, label: label, due_date: (dueInput && dueInput.value) || null })
      .then(function (r) {
        if (r.error) { window.alert(r.error.message); return; }
        if (labelInput) labelInput.value = '';
        if (dueInput) dueInput.value = '';
        loadAssignmentsForTeacher(classId);
      });
  };

  window.tvDeleteAssignment = function (assignmentId, classId) {
    var sb = getClient();
    if (!sb || !window.confirm('Delete this assignment? Students will no longer see it.')) return;
    sb.from('assignments').delete().eq('id', assignmentId)
      .then(function () { loadAssignmentsForTeacher(classId); });
  };

  // ── Rendering: classes I've joined as a student ──────────────────────
  function refreshMyMemberships() {
    var sb = getClient(), out = document.getElementById('tv-my-memberships');
    if (!sb || !out) return;
    var uid = window.ClipSATCloud.currentUserId();
    sb.from('class_members').select('class_id,classes(name,assignments(id,track,label,due_date))').eq('student_id', uid)
      .then(function (r) {
        if (r.error || !r.data || !r.data.length) { out.innerHTML = ''; return; }
        var allAssignmentIds = [];
        r.data.forEach(function (m) {
          ((m.classes && m.classes.assignments) || []).forEach(function (a) { allAssignmentIds.push(a.id); });
        });
        var donePromise = allAssignmentIds.length
          ? sb.from('assignment_completions').select('assignment_id').eq('student_id', uid).in('assignment_id', allAssignmentIds)
          : Promise.resolve({ data: [] });
        donePromise.then(function (dr) {
          var doneSet = {};
          (dr.data || []).forEach(function (row) { doneSet[row.assignment_id] = true; });
          out.innerHTML = '<div class="tv-joined-label">Classes you’ve joined</div>' + r.data.map(function (m) {
            var cname = m.classes ? m.classes.name : 'Class';
            var assigns = (m.classes && m.classes.assignments) || [];
            var assignHtml = assigns.length
              ? '<ul class="tv-assign-list">' + assigns.map(function (a) {
                  var done = !!doneSet[a.id];
                  var due = a.due_date ? ' <span class="tv-frac">(due ' + escT(a.due_date) + ')</span>' : '';
                  return '<li><span class="tv-weak-track">' + escT(TRACK_LABELS[a.track] || a.track) + '</span> — '
                    + escT(a.label) + due
                    + '<button type="button" class="' + (done ? 'tv-done tv-done-yes' : 'tv-done') + '" onclick="window.tvToggleCompletion(\'' + a.id + '\',' + (!done) + ',this)">' + (done ? '✓ Done' : 'Mark done') + '</button></li>';
                }).join('') + '</ul>'
              : '';
            return '<div class="tv-joined-row"><span>' + escT(cname) + '</span>'
              + '<button class="tv-leave" onclick="window.tvLeaveClass(\'' + m.class_id + '\')">Leave</button></div>' + assignHtml;
          }).join('');
        });
      });
  }

  // Toggle one assignment's completion for the current student. `markDone`
  // is the state to move TO (the button's onclick is rewritten in place so
  // the next click flips it again, without a full re-render/re-query).
  window.tvToggleCompletion = function (assignmentId, markDone, btn) {
    var sb = getClient();
    if (!sb) return;
    var uid = window.ClipSATCloud.currentUserId();
    var action = markDone
      ? sb.from('assignment_completions').upsert({ assignment_id: assignmentId, student_id: uid })
      : sb.from('assignment_completions').delete().eq('assignment_id', assignmentId).eq('student_id', uid);
    action.then(function (r) {
      if (r.error || !btn) return;
      btn.textContent = markDone ? '✓ Done' : 'Mark done';
      btn.className = markDone ? 'tv-done tv-done-yes' : 'tv-done';
      btn.setAttribute('onclick', "window.tvToggleCompletion('" + assignmentId + "'," + (!markDone) + ",this)");
    });
  };

  function refreshAll() {
    refreshMyClasses();
    refreshMyMemberships();
  }

  // ── Reveal the nav button once cloud-sync is configured + signed in.
  //    Polls briefly rather than hooking cloud-sync.js's internals — the
  //    typical sign-in flow (magic link) reloads the page anyway, so this
  //    just needs to catch the already-signed-in case on page load. ──
  var tries = 0;
  var poll = setInterval(function () {
    tries++;
    var btn = document.getElementById('teacherViewBtn');
    if (isReady()) {
      if (btn) btn.style.display = '';
      clearInterval(poll);
    } else if (tries > 40) { // ~10s ceiling — stay hidden (not configured, or signed out)
      clearInterval(poll);
    }
  }, 250);

  window.TeacherView = {
    openModal: window.openTeacherView,
    closeModal: window.closeTeacherView
  };
})();
