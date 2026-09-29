/* Assignment links (ADR 0047). Teacher Mode's "Send to Google Classroom" (22b) builds a link
   such as /geo/?assign=1x2y3z.4a5b6c: the track page plus one key per question. (A query, not a
   #hash: the page's router rewrites the hash to #view/<track>/<chapter> on load.) Opening it
   loads public/js/assignment-view.js (22d), which shows those questions at the top of the page.
   A key is a hash of the question's text and choices, since bank questions have no ids; a
   question edited after the link was made no longer matches, and the view says so. */
(function(){
  'use strict';
  window.CSAssignKey=function(q){
    var s=String(q.text||q.q||q.stem||q.question||'')+'\u0001'+(q.choices||q.options||[]).join('\u0001');
    var h=0x811c9dc5;
    for(var i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0; }
    return h.toString(36);
  };
  function open(){
    if(!/[?&]assign=[0-9a-z.]+/.test(location.search)) return;
    var s=document.createElement('script');
    s.src='/js/assignment-view.js';
    document.head.appendChild(s);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',open); else open();
})();
