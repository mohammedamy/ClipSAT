function _progressSrsState(){
  try{ return JSON.parse(localStorage.getItem('clipsat_srs_state')||'{}'); }catch(e){ return {}; }
}
function _progressVisited(){
  try{ return JSON.parse(localStorage.getItem('clipsat_visited')||'{}'); }catch(e){ return {}; }
}
function computeProgress(){
  var mistakes = (window.ML && window.ML.getAll) ? window.ML.getAll() : [];
  var srs = _progressSrsState();
  var visited = _progressVisited();
  var names = window.VIEW_NAMES || {};
  var byTrack = {};
  function row(id){
    if(!byTrack[id]) byTrack[id] = {id:id, name:names[id]||id, visits:0, mistakes:0, mistakesReviewed:0, cardsTouched:0, cardsMastered:0};
    return byTrack[id];
  }
  Object.keys(visited).forEach(function(id){ row(id).visits = visited[id]||0; });
  mistakes.forEach(function(m){
    if(!m.viewId) return;
    var r = row(m.viewId);
    r.mistakes++;
    if(m.reviewedAt) r.mistakesReviewed++;
  });
  Object.keys(srs).forEach(function(cardId){
    var idx = cardId.indexOf(':');
    if(idx<0) return;
    var r = row(cardId.slice(0,idx));
    r.cardsTouched++;
    if(srs[cardId].interval>=6) r.cardsMastered++;
  });
  var accuracy = (window.AccuracyLog && window.AccuracyLog.trackAccuracy) ? window.AccuracyLog.trackAccuracy() : {};
  Object.keys(accuracy).forEach(function(id){
    var r = row(id);
    r.accCorrect = accuracy[id].correct;
    r.accTotal   = accuracy[id].total;
  });
  var list = Object.keys(byTrack).map(function(id){
    var r = byTrack[id];
    r.reviewPct = r.mistakes ? Math.round(r.mistakesReviewed/r.mistakes*100) : 0;
    r.masteryPct = r.cardsTouched ? Math.round(r.cardsMastered/r.cardsTouched*100) : 0;
    r.accPct = r.accTotal ? Math.round(r.accCorrect/r.accTotal*100) : 0;
    return r;
  }).filter(function(r){ return r.visits>0 || r.mistakes>0 || r.cardsTouched>0 || r.accTotal>0; });
  list.sort(function(a,b){
    var act = function(r){ return r.mistakes + r.cardsTouched + r.visits; };
    return act(b)-act(a);
  });
  return list;
}
function _progressColor(pct){ return pct>=80?'#16a34a':(pct>=50?'#d97706':'#dc2626'); }
window.openProgress = function(){
  try{
    var ov = document.getElementById('progress-overlay');
    if(!ov){ console.warn('ClipSAT: #progress-overlay not found'); return; }
    var list = computeProgress();
    var sumEl   = document.getElementById('progress-summary');
    var trendEl = document.getElementById('progress-trend');
    var listEl  = document.getElementById('progress-list');
    var cntEl   = document.getElementById('progress-count');
    if(!list.length){
      if(cntEl) cntEl.textContent = 'Across your visited tracks';
      if(sumEl) sumEl.innerHTML = '';
      if(trendEl) trendEl.innerHTML = '';
      if(listEl) listEl.innerHTML = '<div id="progress-empty">📈 No activity yet — answer some chapter quiz questions or review flashcards to see your progress here.</div>';
      ov.classList.add('show');
      return;
    }
    if(trendEl && window.AccuracyLog){
      var trend = window.AccuracyLog.dailyTrend(14);
      var hasTrend = trend.some(function(d){ return d.total>0; });
      trendEl.innerHTML = !hasTrend ? '' :
        '<div class="prog-trend-label">Accuracy · last 14 days</div>'
        + '<div class="prog-trend-row">'
        + trend.map(function(d){
            var h = d.total ? Math.max(6, Math.round(d.pct/100*28)) : 2;
            var color = d.total ? _progressColor(d.pct) : 'var(--line)';
            var title = d.total ? (d.date+': '+d.correct+'/'+d.total+' ('+d.pct+'%)') : (d.date+': no activity');
            return '<span class="prog-trend-bar" title="'+title+'" style="height:'+h+'px;background:'+color+'"></span>';
          }).join('')
        + '</div>';
    }
    if(cntEl) cntEl.textContent = list.length + ' track' + (list.length!==1?'s':'') + ' with activity';
    var totalMistakes = list.reduce(function(s,r){ return s+r.mistakes; },0);
    var totalReviewed = list.reduce(function(s,r){ return s+r.mistakesReviewed; },0);
    var totalCards     = list.reduce(function(s,r){ return s+r.cardsTouched; },0);
    var totalMastered  = list.reduce(function(s,r){ return s+r.cardsMastered; },0);
    if(sumEl){
      sumEl.innerHTML =
          '<div class="prog-sum-pill"><b>'+list.length+'</b>Tracks active</div>'
        + '<div class="prog-sum-pill"><b>'+(totalMistakes?Math.round(totalReviewed/totalMistakes*100):0)+'%</b>Mistakes reviewed</div>'
        + '<div class="prog-sum-pill"><b>'+(totalCards?Math.round(totalMastered/totalCards*100):0)+'%</b>Flashcards mastered</div>';
    }
    if(listEl){
      listEl.innerHTML = list.map(function(r){
        var rc = _progressColor(r.reviewPct), mc = _progressColor(r.masteryPct), ac = _progressColor(r.accPct);
        var accRow = r.accTotal
          ? ('<div class="prog-stat"><span class="prog-stat-label">'+r.accCorrect+'/'+r.accTotal+' answered correctly</span>'
             + '<span class="prog-bar-wrap"><span class="prog-bar" style="width:'+r.accPct+'%;background:'+ac+'"></span></span>'
             + '<span class="prog-pct" style="color:'+ac+'">'+r.accPct+'%</span></div>')
          : '';
        var mistakeRow = r.mistakes
          ? ('<div class="prog-stat"><span class="prog-stat-label">'+r.mistakesReviewed+'/'+r.mistakes+' mistakes reviewed</span>'
             + '<span class="prog-bar-wrap"><span class="prog-bar" style="width:'+r.reviewPct+'%;background:'+rc+'"></span></span>'
             + '<span class="prog-pct" style="color:'+rc+'">'+r.reviewPct+'%</span></div>')
          : '';
        var cardRow = r.cardsTouched
          ? ('<div class="prog-stat"><span class="prog-stat-label">'+r.cardsMastered+'/'+r.cardsTouched+' flashcards mastered</span>'
             + '<span class="prog-bar-wrap"><span class="prog-bar" style="width:'+r.masteryPct+'%;background:'+mc+'"></span></span>'
             + '<span class="prog-pct" style="color:'+mc+'">'+r.masteryPct+'%</span></div>')
          : '';
        var heatmap = '';
        if(window.AccuracyLog){
          var chapters = window.AccuracyLog.chapterMastery(r.id).filter(function(c){ return c.total>=2; });
          if(chapters.length){
            heatmap = '<div class="prog-heatmap-label">Weakest chapters</div><div class="prog-heatmap">'
              + chapters.slice(0,6).map(function(c){
                  var cc = _progressColor(c.pct);
                  return '<span class="prog-heat-cell" title="'+c.domain+': '+c.correct+'/'+c.total+' ('+c.pct+'%)" style="background:'+cc+'">'+
                    (c.domain.length>16 ? c.domain.slice(0,15)+'…' : c.domain)+'</span>';
                }).join('')
              + '</div>';
          }
        }
        return '<div class="prog-row">'
          + '<div class="prog-row-head"><span class="prog-track-name">'+r.name+'</span><span class="prog-visits">'+r.visits+' visit'+(r.visits!==1?'s':'')+'</span></div>'
          + accRow + mistakeRow + cardRow + heatmap
          + '</div>';
      }).join('');
    }
    ov.classList.add('show');
  }catch(e){
    var ov2 = document.getElementById('progress-overlay');
    if(ov2) ov2.classList.add('show');
    console.error('openProgress error:', e);
  }
};
function openProgress(){ window.openProgress(); }
function closeProgress(){ document.getElementById('progress-overlay').classList.remove('show'); }

/* ── WORKSHEET LIBRARY — fetches a per-track manifest.json and renders a
   searchable, unit-grouped list of real downloadable worksheet+answer-key
   PDF pairs. Manifest files live at /downloads/<track>/manifest.json. ── */
