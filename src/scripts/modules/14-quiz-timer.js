var _timerInterval = null, _timerRemaining = 0, _timerPaused = false;

function timerSetTime(mins){
  timerStop();
  _timerRemaining = mins * 60;
  var bar = document.getElementById('exam-timer-bar');
  bar.classList.remove('done');
  bar.classList.add('active');
  _timerPaused = false;
  document.getElementById('timerPauseBtn').textContent = '⏸ Pause';
  updateTimerDisplay();
  _timerInterval = setInterval(function(){
    if(!_timerPaused){
      _timerRemaining--;
      updateTimerDisplay();
      if(_timerRemaining <= 0){ timerFinish(); }
    }
  }, 1000);
}
function timerSetCustom(){
  var inp = document.getElementById('timerCustomMin');
  var v = inp ? parseInt(inp.value, 10) : NaN;
  if(!isFinite(v) || v <= 0) return;
  timerSetTime(Math.min(300, v));
}
function timerFinish(){
  clearInterval(_timerInterval); _timerInterval = null;
  var bar = document.getElementById('exam-timer-bar');
  var el = document.getElementById('etd');
  if(el){ el.textContent = "Time's up!"; el.className = 'crit'; }
  bar.classList.add('done');
  setTimeout(function(){ timerStop(); }, 6000);
}
function updateTimerDisplay(){
  var el = document.getElementById('etd');
  if(!el) return;
  var m = Math.floor(Math.abs(_timerRemaining)/60), s = Math.abs(_timerRemaining)%60;
  el.textContent = (m<10?'0':'')+m+':'+(s<10?'0':'')+s;
  el.className = _timerRemaining <= 0 ? 'crit' : _timerRemaining <= 300 ? 'crit' : _timerRemaining <= 600 ? 'warn' : '';
}
function timerPause(){
  _timerPaused = !_timerPaused;
  document.getElementById('timerPauseBtn').textContent = _timerPaused ? '▶ Resume' : '⏸ Pause';
}
function timerStop(){
  clearInterval(_timerInterval); _timerInterval = null;
  var bar = document.getElementById('exam-timer-bar');
  bar.classList.remove('active'); bar.classList.remove('done');
  _timerRemaining = 0;
  var el = document.getElementById('etd'); if(el) el.textContent='00:00';
}

// Auto-show timer bar when a full exam is generated
var _timerObserver = new MutationObserver(function(muts){
  muts.forEach(function(mut){
    mut.addedNodes.forEach(function(node){
      if(node.nodeType===1 && (node.classList.contains('fep-header') || (node.querySelector && node.querySelector('.fep-header')))){
        var bar = document.getElementById('exam-timer-bar');
        if(!bar.classList.contains('active')){
          // Move timer bar next to exam output
          var tgOut = node.closest ? node.closest('.tg-out') : null;
          if(tgOut && tgOut.parentNode){
            tgOut.parentNode.insertBefore(bar, tgOut);
            bar.classList.add('active');
          }
        }
      }
    });
  });
});
document.querySelectorAll('.tg-out').forEach(function(el){
  _timerObserver.observe(el, {childList:true, subtree:true});
});

/* ── PWA / SERVICE WORKER ── */
