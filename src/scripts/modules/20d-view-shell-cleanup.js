(function(){
    document.querySelectorAll('main[id^="view-"]').forEach(function(view){
      var sh = view.querySelector('.subject-head');
      if(!sh) return;

      // Put course name into the existing .rt heading (no extra bar)
      var rail = view.querySelector('.rail');
      var titleText = (sh.querySelector('h1')||{textContent:''}).textContent.trim();
      if(rail && titleText){
        var rtEl = rail.querySelector('p.rt');
        if(rtEl) rtEl.textContent = titleText;
      }

      // Clone meta into testgen section
      var metaDiv = sh.querySelector('.meta');
      var testgenSec = view.querySelector('section.testgen');
      if(metaDiv && testgenSec){
        var clone = metaDiv.cloneNode(true);
        clone.className = 'testgen-meta';
        var chead = testgenSec.querySelector('.chead');
        if(chead && chead.nextSibling){
          testgenSec.insertBefore(clone, chead.nextSibling);
        } else {
          testgenSec.insertBefore(clone, testgenSec.firstChild);
        }
      }
    });
  })();
