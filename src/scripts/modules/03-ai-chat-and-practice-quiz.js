(function(){
  var fab=document.getElementById('chatFab'), panel=document.getElementById('chatPanel'),
      body=document.getElementById('chatBody'), input=document.getElementById('chatInput'),
      send=document.getElementById('chatSend'), closeBtn=document.getElementById('chatClose');
  /* NOTE: chatFab/chatPanel markup is not present on the Eleventy-built
     track pages (only in the standalone index.html), so do NOT early-return
     here — everything below through the end of this IIFE (practice-quiz AI
     helpers, genChapterQuiz, sendMsg, askAI, etc.) must still be defined
     even when the chat widget itself is unavailable. Only the DOM event
     wiring at the very end of this IIFE is gated on the chat elements
     actually existing (see _chatUIReady below). */
  var _chatUIReady = !!(fab && panel && body && input && send && closeBtn);

  var history=[], busy=false, greeted=false;
  var SYSTEM=[
    "You are \u201CAsk Mr. Mohamed\u201D, the friendly and encouraging mathematics tutor on Mr. Mohamed Abdallah's ClipSAT study hub (covering IGCSE, A-Level, the Digital SAT, ACT, AP Calculus, and the Saudi Qiyas exams Qudrat and Tahsili). Speak warmly, as Mr. Mohamed's helpful teaching assistant.",
    "Help students understand and solve problems in arithmetic, algebra, geometry, trigonometry, calculus, statistics and probability.",
    "Guidelines:",
    "- Be clear, concise and step-by-step; show the reasoning rather than only the final answer.",
    "- Guide the student through the key steps; give the full worked solution when they ask for it.",
    "- Write ALL mathematics in LaTeX: use \\( ... \\) for inline math and \\[ ... \\] for displayed equations. Never use $ or $$.",
    "- Keep a warm, motivating tone suitable for high-school and early-college students.",
    "- Stay on topic: mathematics and exam preparation. If asked something unrelated, gently steer back to math.",
    "- If a question is ambiguous, ask one short clarifying question.",
    "- Keep answers focused and not overly long; never include anything inappropriate for students."
  ].join("\n");

  function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function fmt(t){
    t=esc(t);
    t=t.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
    t=t.replace(/`([^`]+)`/g,'<code>$1</code>');
    /* Convert newlines to <br>, but never INSIDE a \[ \]/\( \) math
       region. Confirmed live: AI replies routinely put \[ alone on one
       line, the equation on the next, \] on a third — a <br> landing
       right after \[ or right before \] splits the delimiter from its
       content across separate DOM text nodes, which MathJax's typesetter
       then silently fails to recognize as math at all (typesetPromise
       resolves fine, nothing renders — no error to catch). A raw newline
       left inside the math region is harmless; the browser collapses it
       to a space same as any other whitespace, and MathJax doesn't care
       either way. */
    var parts=t.split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/);
    t=parts.map(function(part,i){
      if(i%2===1) return part; // odd indices = the math regions themselves, untouched
      return part.replace(/\n{2,}/g,'<br><br>').replace(/\n/g,'<br>');
    }).join('');
    return t;
  }
  function addMsg(role,text){
    var d=document.createElement('div'); d.className='msg '+(role==='user'?'user':'bot');
    d.innerHTML=fmt(text); body.appendChild(d); body.scrollTop=body.scrollHeight;
    /* Was a single non-retrying check (MathJax.typesetPromise undefined →
       silently gives up forever) — real bug, confirmed live: the chat
       panel is often opened and used within the first second or two of a
       page load, before MathJax has necessarily finished initializing, so
       the very first AI reply (the one most likely to contain real math)
       could permanently render as raw \[ \]/\boxed{} source. _mjRun
       (defined below, same scope — already used elsewhere in this file
       for exactly this reason) retries every 400ms until MathJax is
       actually ready instead of giving up after one check. */
    if(role!=='user') _mjRun(d);
    return d;
  }
  function addTyping(){
    var d=document.createElement('div'); d.className='msg bot';
    d.innerHTML='<span class="typing"><span></span><span></span><span></span></span>';
    body.appendChild(d); body.scrollTop=body.scrollHeight; return d;
  }
  function greet(){
    if(greeted) return; greeted=true;
    addMsg('bot',"Hi, I'm Ask Mr. Mohamed \u2014 your math tutor here on ClipSAT. Ask me about any problem (algebra, geometry, trig, calculus, or an exam question) and I'll walk you through it step by step.");
    var chips=document.createElement('div'); chips.className='chat-chips';
    ["Solve x\u00B2 \u2212 5x + 6 = 0","Explain the chain rule","How do I find a line of best fit?"].forEach(function(q){
      var c=document.createElement('button'); c.type='button'; c.className='chat-chip'; c.textContent=q;
      c.addEventListener('click',function(){ input.value=q; sendMsg(); });
      chips.appendChild(c);
    });
    body.appendChild(chips); body.scrollTop=body.scrollHeight;
  }
  function openPanel(){ panel.classList.add('open'); panel.setAttribute('aria-hidden','false'); fab.style.display='none'; greet(); setTimeout(function(){ input.focus(); },60); }
  function closePanel(){ panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); fab.style.display=''; }

  /* ═══════════════════════════════════════════════════════════════
     SHARED AI PROVIDER
     Every AI feature on the site (this chat tutor, the practice-quiz
     generator below, and the AI test/exam generator further down in
     this file) calls window._openrouterChatMessages(). Swapping models
     or providers in the future means editing only this block. (Function/
     variable names below still say "openrouter" — kept as-is rather than
     renamed across every call site in this 15k-line file from when the
     provider was OpenRouter; only the endpoint/key/model actually change.)

     Two paths, tried in this order:
     1. Personal key (⚙️ API Key, stored in localStorage as clip_or_key) —
        calls Groq DIRECTLY from the browser with the visitor's own key.
        Exposing a key someone typed in themselves isn't a security
        problem, so this path is unaffected by anything below.
     2. No personal key — routes through a Supabase Edge Function
        (supabase/functions/ai-proxy) that holds a real Cerebras key
        server-side and forwards the request. This REQUIRES the visitor
        to be signed in (the same free account already used for
        cross-device progress sync — see cloud-sync.js): the Edge
        Function's auth:'user' mode rejects anything else before the key
        is ever touched, and a per-user daily cap in Postgres bounds
        abuse. This replaced a shared Groq key that used to be embedded
        (base64'd, but never actually secret — anyone could decode it
        from the shipped JS) directly in this file.
     ═══════════════════════════════════════════════════════════════ */
  function personalKey(){ return localStorage.getItem('clip_or_key')||''; }
  var PERSONAL_KEY_URL='https://api.groq.com/openai/v1/chat/completions';
  /* Groq-hosted model, used only for the personal-key path. qwen/qwen3.6-27b —
     verified live against the account's actual /v1/models list
     (2026-08-26). If this model is ever retired, swap it here. */
  var PERSONAL_KEY_MODELS=['qwen/qwen3.6-27b'];
  var AI_PROXY_URL='https://ynnqrxeprxhtdimzwxwx.supabase.co/functions/v1/ai-proxy';

  function callWithPersonalKey(messages, opts, k){
    var body={
      messages:messages,
      temperature: opts.temperature!=null?opts.temperature:0.7,
      max_tokens: opts.maxTokens||2048,
      /* qwen/qwen3.6-27b is a reasoning model that otherwise emits a huge
         <think>...</think> chain-of-thought block BEFORE the real answer —
         confirmed live: with this left unset, a trivial one-sentence
         question burned the entire max_tokens budget on unfinished
         reasoning and returned no actual answer at all (finish_reason
         "length", content = a half-written <think> block). Groq's own
         param for this only accepts 'none' or 'default'; 'none' suppresses
         the trace entirely and returns just the answer, confirmed live too. */
      reasoning_effort:'none'
    };
    if(opts.json) body.response_format={type:'json_object'};
    function tryModel(i){
      if(i>=PERSONAL_KEY_MODELS.length) return Promise.reject(tryModel._lastErr||new Error('AI request failed'));
      body.model=PERSONAL_KEY_MODELS[i];
      return fetch(PERSONAL_KEY_URL,{
        method:'POST', mode:'cors',
        headers:{'Authorization':'Bearer '+k,'Content-Type':'application/json'},
        body:JSON.stringify(body)
      }).then(function(r){
        if(!r.ok){
          return r.json().catch(function(){ return {}; }).then(function(e){
            tryModel._lastErr=new Error((e.error&&e.error.message)||('HTTP '+r.status));
            return tryModel(i+1);
          });
        }
        return r.json().then(function(d){
          return (d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content)||'';
        });
      }, function(err){ tryModel._lastErr=err; return tryModel(i+1); });
    }
    return tryModel(0);
  }

  /* No personal key — go through the Supabase-fronted proxy. Requires a
     real signed-in session; rejects with NOT_SIGNED_IN otherwise (callers
     show a "sign in" prompt for that specific error). Waits on
     ClipSATCloud.ready first so a call made in the first instant after
     page load (before cloud-sync.js's async session check resolves)
     doesn't falsely report "not signed in" for an actually-logged-in
     visitor with a persisted session. */
  function callSharedProxy(messages, opts){
    var cloud=window.ClipSATCloud;
    if(!cloud||!cloud.configured) return Promise.reject(new Error('NOT_SIGNED_IN'));
    return Promise.resolve(cloud.ready).then(function(){
      var client=cloud.getClient&&cloud.getClient();
      if(!client) throw new Error('NOT_SIGNED_IN');
      return client.auth.getSession();
    }).then(function(r){
      var session=r&&r.data&&r.data.session;
      if(!session||!session.access_token) throw new Error('NOT_SIGNED_IN');
      var cfg=window.CLIPSAT_CLOUD_CONFIG||{};
      var body={
        messages:messages,
        temperature: opts.temperature!=null?opts.temperature:0.7,
        maxTokens: opts.maxTokens||2048,
        json: !!opts.json
      };
      return fetch(AI_PROXY_URL,{
        method:'POST', mode:'cors',
        headers:{
          'Authorization':'Bearer '+session.access_token,
          'apikey': cfg.anonKey||'',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
      }).then(function(r){
        return r.json().catch(function(){ return {}; }).then(function(d){
          if(!r.ok) throw new Error(d.error||('HTTP '+r.status));
          return d.content||'';
        });
      });
    });
  }

  /* messages: full [{role,content},...] array (system message included).
     opts: {temperature, maxTokens, json:boolean} — json requests
     response_format:{type:'json_object'} (used by the exam generator). */
  window._openrouterChatMessages=function(messages, opts){
    opts=opts||{};
    var k=personalKey();
    if(k) return callWithPersonalKey(messages, opts, k);
    return callSharedProxy(messages, opts);
  };
  window._openrouterChat=function(system,user,opts){
    return window._openrouterChatMessages([{role:'system',content:system},{role:'user',content:user}],opts);
  };
  window._openrouterEnabled=function(){
    return !!personalKey() || !!(window.ClipSATCloud && window.ClipSATCloud.configured && window.ClipSATCloud.isSignedIn());
  };

  window.openChatWith=function(text){
    openPanel();
    setTimeout(function(){
      input.value=text;
      sendMsg();
    }, 150);
  };
/* ═══════════════════════════════════════════════════════════════
   PRACTICE QUIZ — AI-generated questions on the same trick, triggered by
   "Still unsure" in the mistakes review. The quiz itself lives in
   public/js/practice-quiz.js (03b-practice-quiz.js, Plan 5 Phase 5.015,
   ADR 0036) and loads on first use; this stub is its only entry point.
   ═══════════════════════════════════════════════════════════════ */
var _pqPromise=null;
window._ensurePracticeQuiz=function(){
  if(window.CSPracticeQuiz) return Promise.resolve();
  if(_pqPromise) return _pqPromise;
  _pqPromise=new Promise(function(resolve,reject){
    var s=document.createElement('script');
    s.src='/js/practice-quiz.js';
    s.onload=function(){ window.CSPracticeQuiz?resolve():reject(new Error('practice-quiz.js did not register')); };
    s.onerror=function(){ _pqPromise=null; reject(new Error('practice-quiz.js failed to load')); };
    document.head.appendChild(s);
  });
  return _pqPromise;
};
window.launchPracticeQuiz=function(mistake){
  return window._ensurePracticeQuiz().then(function(){ window.CSPracticeQuiz.launch(mistake); })
    .catch(function(){ alert('The practice quiz could not load. Check your connection and try again.'); });
};

  /* ─── Chapter Quiz ─── */
  /* ── shared MathJax re-render helper (works async or sync) ── */
  function _mjRun(el){
    if(!el) return;
    function _try(){
      try{
        if(window.MathJax){
          if(typeof MathJax.typesetPromise==='function') MathJax.typesetPromise([el]).catch(function(){});
          else if(typeof MathJax.typeset==='function') MathJax.typeset([el]);
          else setTimeout(_try,400);
        } else { setTimeout(_try,400); }
      } catch(e){}
    }
    setTimeout(_try,60);   /* first pass — DOM settled */
    setTimeout(_try,700);  /* safety net — handles slow MathJax init */
  }

  window.genChapterQuiz=function(btn){
    var wrap=btn.closest('.ch-quiz-wrap');
    var out=wrap.querySelector('.cq-out');
    var main=btn.closest('main[id^="view-"]');
    var viewId=main?main.id.replace('view-',''):null;
    var n=parseInt(wrap.querySelector('.cq-count').value,10)||10;
    var lvl=wrap.querySelector('.cq-level').value;
    var bank=window.fullExamBank&&window.fullExamBank[viewId];
    if(!bank){out.innerHTML='<p class="cq-msg">No question bank available for this course yet.</p>';return;}

    /* ── Chapter keyword extraction — heading + definitions + example titles ── */
    var chEl=btn.closest('.chapter');
    var chH2=chEl&&chEl.querySelector('.chead h2');
    var chTitle=chH2?chH2.textContent.trim():'';
    var _kSet={};
    var _stopWords={the:1,and:1,with:1,that:1,this:1,from:1,into:1,their:1,will:1,
      have:1,'for':1,chapter:1,section:1,introduction:1,overview:1,review:1,
      using:1,used:1,about:1,more:1,some:1,over:1,under:1,between:1,through:1};
    function _addKW(str){
      str.toLowerCase().split(/[\s&,\/\-\(\):؛،]+/).forEach(function(w){
        /* strip leading punctuation / digits */
        w=w.replace(/^[\d\.\s]+/,'');
        if(w.length>3 && !_stopWords[w]) _kSet[w]=1;
      });
    }
    /* 1. Chapter heading */
    _addKW(chTitle);
    /* 2. Definition / theorem labels in this chapter */
    if(chEl) chEl.querySelectorAll('.callout.def .lab,.callout.thm .lab').forEach(function(l){ _addKW(l.textContent); });
    /* 3. Example titles */
    if(chEl) chEl.querySelectorAll('.et,.ex-title,.example > .lab').forEach(function(t){ _addKW(t.textContent); });
    /* 4. data-chapter attribute (if set on wrap or chapter element) */
    var _chAttr=(wrap.getAttribute('data-chapter')||'')+' '+(chEl&&chEl.getAttribute('data-chapter')||'');
    _addKW(_chAttr);
    var chWords=Object.keys(_kSet);

    function shuf(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}

    /* ── pool is built below from bank.pool / bank.easy etc. ── */

    function _hesc(s){return String(s).replace(/&(?![a-zA-Z#]\w*;)/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
    /* NOTE: _hesc deliberately leaves \( \) delimiters intact; only bare < > & are escaped */
    function _maths(s){
      /* Smart math renderer:
         - Outside math  → HTML-escape &, <, >
         - Inside math, inside align/matrix/cases env → & is valid column sep, leave it
         - Inside math, NOT in align env → bare & causes MathJax "misplaced &" — replace with \&
         - &amp; from AI JSON → handle correctly in each context
      */
      var ALIGN_ENVS=['align','aligned','matrix','pmatrix','bmatrix','vmatrix','Vmatrix',
                      'array','cases','eqnarray','split','gather','gathered','smallmatrix'];
      var out='', inMath=false, alignDepth=0, i=0, L=s.length;
      while(i<L){
        /* ── enter math ── */
        if(!inMath && s.slice(i,i+2)==='\\('){out+='\\(';i+=2;inMath=true;alignDepth=0;continue;}
        if(!inMath && s.slice(i,i+2)==='\\['){out+='\\[';i+=2;inMath=true;alignDepth=0;continue;}
        /* ── exit math ── */
        if(inMath  && s.slice(i,i+2)==='\\)'){out+='\\)';i+=2;inMath=false;alignDepth=0;continue;}
        if(inMath  && s.slice(i,i+2)==='\\]'){out+='\\]';i+=2;inMath=false;alignDepth=0;continue;}
        /* ── track \begin / \end inside math ── */
        if(inMath && s.slice(i,i+6)==='\\begin'){
          var b1=s.indexOf('{',i+6),e1=s.indexOf('}',b1+1);
          if(b1!==-1&&e1!==-1){
            var en=s.slice(b1+1,e1);
            if(ALIGN_ENVS.some(function(v){return en.indexOf(v)!==-1;})) alignDepth++;
          }
        }
        if(inMath && s.slice(i,i+4)==='\\end'){
          var b2=s.indexOf('{',i+4),e2=s.indexOf('}',b2+1);
          if(b2!==-1&&e2!==-1){
            var en2=s.slice(b2+1,e2);
            if(ALIGN_ENVS.some(function(v){return en2.indexOf(v)!==-1;})&&alignDepth>0) alignDepth--;
          }
        }
        /* ── pass HTML tags through outside math ── */
        if(!inMath && s[i]==='<' && i+1<L && (s[i+1]==='/'||/[a-zA-Z]/.test(s[i+1]))){
          var tj=s.indexOf('>',i);if(tj!==-1){out+=s.slice(i,tj+1);i=tj+1;continue;}
        }
        /* ── handle & (bare or as &amp; entity) ── */
        var c=s[i];
        if(c==='&'){
          /* check if it's already an HTML entity like &amp; &lt; &gt; &nbsp; etc */
          var semi=s.indexOf(';',i+1);
          if(semi!==-1 && semi-i<=8 && /^&[a-zA-Z#0-9]+;/.test(s.slice(i,semi+1))){
            var entity=s.slice(i,semi+1);
            if(entity==='&amp;'){
              /* &amp; from AI: in alignment env keep as &, in plain math escape, outside HTML-safe */
              if(inMath && alignDepth>0) out+='&';
              else if(inMath) out+='\\&';
              else out+='&amp;';
            } else {
              out+=entity; /* other entities (&lt; &gt; &nbsp; etc) pass through */
            }
            i=semi+1; continue;
          }
          /* bare & */
          if(inMath && alignDepth>0) out+='&';    /* valid alignment column sep */
          else if(inMath) out+='\\&';              /* misplaced → LaTeX text amp */
          else out+='&amp;';                       /* HTML context */
        }
        /* Always HTML-escape < and > — even inside math. A raw "<letter"
           (e.g. "0<e<1") gets parsed by the browser as a bogus tag once this
           string is assigned via innerHTML, silently swallowing everything
           up to the next real ">" (see MATH_ERRATA.md). MathJax/KaTeX still
           typesets correctly: the browser decodes &lt;/&gt; back to literal
           characters in the text node before auto-render ever scans it. */
        else if(c==='<') out+='&lt;';
        else if(c==='>') out+='&gt;';
        else out+=c;
        i++;
      }
      return out;
    }

    /* ── build pool ── */
    var pool=[];
    if(bank.pool && bank.pool.length){
      /* pool-format banks (EST, SAT, AP, etc.) */
      var mcq=bank.pool.filter(function(q){return q.type==='mcq'&&q.choices&&q.choices.length;});
      pool = mcq.length ? mcq : bank.pool.filter(function(q){return q.choices&&q.choices.length;});
    } else {
      /* easy/medium/hard format (IB) */
      var _c=function(a,lbl){return (a||[]).map(function(q){return {text:q.q||q.text||'',choices:q.choices||[],answer:q.answer,sol:q.sol||'',domain:q.domain||'',tags:q.tags,level:lbl};});};
      var all=_c(bank.easy,'Easy').concat(_c(bank.medium,'Medium')).concat(_c(bank.hard,'Hard'));
      pool=(lvl==='all')?all:all.filter(function(q){return q.level===lvl;});
      if(!pool.length) pool=all;
    }
    if(!pool.length){out.innerHTML='<p class="cq-msg">No multiple-choice questions in the bank for this course.</p>';return;}

    /* ── validity filter: skip MCQ with bad answer index ── */
    var vp=pool.filter(function(q){
      if(q.choices&&q.choices.length){
        if(q.answer===undefined||q.answer===null||typeof q.answer!=='number') return false;
        if(q.answer<0||q.answer>=q.choices.length) return false;
      }
      return true;
    });
    if(vp.length) pool=vp;

    /* ── level filter (pool-format banks only; IB banks already filtered above) ── */
    if(lvl!=='all' && bank.pool){
      var lf=pool.filter(function(q){
        var d=(q.difficulty||q.diff||q.level||'').toLowerCase();
        return !d||d===lvl.toLowerCase();
      });
      if(lf.length) pool=lf;
    }

    /* ── Chapter relevance, preferred form: the chapter names its exact bank
       domains (content JSON quizWidget.domains → data-quiz-domains). Only those
       domains are used — no keyword guessing, which let generic heading words
       ('functions', 'equations', 'angle', 'right') pull in other chapters'
       questions. ── */
    var _qd=(wrap.getAttribute('data-quiz-domains')||'').split('|').filter(Boolean);
    if(_qd.length){
      var _qdf=pool.filter(function(q){ return _qd.indexOf(q.domain)!==-1; });
      if(!_qdf.length){
        out.innerHTML='<p class="cq-msg">No quiz questions found for <strong>'+_hesc(chTitle||'this chapter')+'<\/strong> at this level.<\/p>';
        return;
      }
      pool=_qdf;
      chWords=[]; /* skip the keyword fallback below */
    }

    /* ── Fallback: keyword relevance, for chapters that don't list their domains ── */
    if(chWords.length){
      var df=pool.filter(function(q){
        var haystack=[
          (q.domain||'').toLowerCase(),
          ((q.tags||[]).join(' ')).toLowerCase(),
          (q.text||q.q||'').toLowerCase().slice(0,400),
          (q.sol||'').toLowerCase().slice(0,100)
        ].join(' ');
        return chWords.some(function(w){ return w.length>4&&haystack.indexOf(w)!==-1; });
      });
      if(df.length>0){
        pool=df; /* strictly use only lesson-relevant questions */
      } else {
        /* No bank questions match this chapter — inform teacher */
        out.innerHTML='<p class="cq-msg" style="padding:14px 16px;background:#fef9c3;border:1px solid #ca8a04;border-radius:6px;color:#713f12">'
          +'No quiz questions found for <strong>'+_hesc(chTitle||'this chapter')+'<\/strong> in the question bank. '
          +'The bank may not yet have coverage for this specific topic.<\/p>';
        return;
      }
    }

    /* ── pick questions ── */
    /* ── no-repeat tracking ── */
    if(!window._cqSeen) window._cqSeen={};
    if(!window._cqSeen[viewId]) window._cqSeen[viewId]=new Set();
    var seen=window._cqSeen[viewId];
    var unseen=pool.filter(function(q,i){return !seen.has(i);});
    if(unseen.length<n){
      /* reset when pool exhausted */
      seen.clear();
      unseen=pool.slice();
    }
    unseen=shuf(unseen);
    /* no repeated questions or ideas in one quiz (05e-redundancy-check.js) */
    var _ideas=window.ClipSATRedundancy?window.ClipSATRedundancy.tracker():null, pick=[];
    for(var _u=0;_u<unseen.length&&pick.length<n;_u++){ if(!_ideas||_ideas.add(unseen[_u])) pick.push(unseen[_u]); }
    /* mark picked as seen (by original index in pool) */
    pick.forEach(function(q){var idx=pool.indexOf(q);if(idx!==-1)seen.add(idx);});

    /* ── render ── */
    var LTR=['A','B','C','D','E'];
    var lvlLabel=lvl==='all'?'All Levels':lvl;
    var h='<div class="cq-paper">';
    h+='<div class="cq-head"><span>Chapter Quiz</span><span class="cq-meta">'+pick.length+' questions &middot; '+lvlLabel+'</span><div style="display:flex;gap:6px;align-items:center;flex-shrink:0"><button class="cq-print-btn" onclick="printCQ(this)" title="Print this quiz">&#128424; Print</button><button class="cq-close-btn" onclick="this.closest(\'.cq-paper\').parentNode.innerHTML=\'\'" title="Close quiz">&times;</button></div></div>';
    var _csCaptureQ=[];
    pick.forEach(function(q,i){
      q=window._shuffleQ?window._shuffleQ(q):q; /* randomize which position holds the correct choice */
      var qtext=_maths(q.text||q.q||'');
      var choices=(q.choices||[]).map(function(c){
        var s=String(c||'');
        /* auto-wrap bare LaTeX (no delimiters) in \( \) so MathJax processes it */
        if(s.indexOf('\\(')===-1&&s.indexOf('\\[')===-1&&/\\[a-zA-Z{([\\]/.test(s)){s='\\('+s+'\\)';}
        return _maths(s);
      });
      var ans=typeof q.answer!=='undefined'?q.answer:(typeof q.ans!=='undefined'?q.ans:0);
      /* Google Forms/Classroom capture — see public/js/quiz-capture-ui.js */
      _csCaptureQ.push({text:q.text||q.q||'',choices:(q.choices||[]).slice(),correctIndex:ans,type:'mcq',points:1});
      h+='<div class="cq-item" data-ans="'+ans+'" data-raw="'+q.text.replace(/"/g,'&quot;').replace(/\n/g,' ')+'">';
      if(q.fig&&window._renderFig) h+='<div class="cq-figure">'+window._renderFig(q.fig)+'</div>';
      h+='<div class="cq-row"><span class="cq-qn">'+(i+1)+'.</span><p class="cq-qt">'+qtext+'</p></div>';
      h+='<ul class="cq-opts">';
      choices.forEach(function(c,ci){
        var rawC=q.choices&&q.choices[ci]?String(q.choices[ci]).replace(/"/g,'&quot;').replace(/\n/g,' '):'';
        h+='<li class="cq-opt" onclick="cqPick(this)" data-raw="'+rawC+'"><span class="cq-lt">'+LTR[ci]+'.</span><span class="cq-ct">'+c+'</span></li>';
      });
      h+='</ul>';
      var _solRaw=(q.sol||q.explanation||'').replace(/"/g,'&quot;').replace(/\n/g,' ');
      if(q.sol||q.explanation) h+='<div class="cq-sol-box" data-raw="'+_solRaw+'"><strong>Solution:</strong> '+_maths(q.sol||q.explanation||'')+'</div>';
      h+='</div>';
    });
    h+='<div class="cq-score-bar">Answered: <strong class="cq-ans-v">0</strong> / '+pick.length+' &nbsp;|&nbsp; Score: <strong class="cq-sv">0</strong> / '+pick.length+'</div>';
    h+='</div>';
    out.innerHTML=h;
    /* hide all solutions initially */
    out.querySelectorAll('.cq-sol-box').forEach(function(s){s.style.display='none';});
    var _typesetOut=function(){
      if(window.MathJax&&MathJax.typesetPromise){
        MathJax.typesetPromise([out]).catch(function(){});
      }
    };
    _typesetOut();
    setTimeout(_typesetOut, 500);
    document.dispatchEvent(new CustomEvent('clipsat:quiz-ready',{detail:{source:'genChapterQuiz',title:(chTitle||'Chapter Quiz'),trackId:viewId,questions:_csCaptureQ,outEl:out}}));
  };

  window.cqPick=function(el){
    var item=el.closest('.cq-item');
    if(item.classList.contains('cq-done')) return; /* already answered */
    item.classList.add('cq-done');
    var ans=parseInt(item.getAttribute('data-ans'),10);
    var opts=item.querySelectorAll('.cq-opt');
    var chosen=Array.prototype.indexOf.call(opts,el);
    opts[ans].classList.add('cq-correct');          /* always highlight correct */
    if(chosen!==ans) el.classList.add('cq-wrong'); /* mark wrong choice */
    item.querySelectorAll('.cq-opt').forEach(function(o){o.style.pointerEvents='none';}); /* lock */
    var sol=item.querySelector('.cq-sol-box');
    if(sol) sol.style.display='block';
    /* update score counters */
    var paper=el.closest('.cq-paper');
    var answered=paper.querySelectorAll('.cq-item.cq-done').length;
    var correct=0;
    paper.querySelectorAll('.cq-item.cq-done').forEach(function(it){
      if(!it.querySelector('.cq-opt.cq-wrong')) correct++;
    });
    var av=paper.querySelector('.cq-ans-v'); if(av) av.textContent=answered;
    var sv=paper.querySelector('.cq-sv'); if(sv) sv.textContent=correct;
    _mjRun(item);
  };


  /* ── AI call (Groq, shared provider defined above) ── */
  function askAI(){
    return window._openrouterChatMessages(
      [{role:'system',content:SYSTEM}].concat(history),
      {maxTokens:1536, temperature:0.7}
    ).then(function(text){ return (text||'').trim(); });
  }

  function sendMsg(){
    var q=(input.value||'').trim(); if(!q||busy) return;
    addMsg('user',q); input.value=''; input.style.height='auto';
    history.push({role:'user',content:q});
    busy=true; send.disabled=true;
    var typing=addTyping();
    askAI().then(function(text){
      typing.remove();
      if(text){ addMsg('bot',text); history.push({role:'assistant',content:text}); }
      else { addMsg('bot',"Hmm, I didn't quite catch that — could you rephrase the question?"); }
    }).catch(function(e){
      typing.remove();
      /* addMsg() routes text through fmt(), which escapes all HTML (only
         bold, code, and newlines are supported as markdown) — a literal
         <button>/<a> tag passed to addMsg renders as visible escaped text,
         not a real clickable element. Build these two messages as raw DOM
         instead, same pattern greet() already uses for its suggestion chips. */
      if(e&&e.message==='NOT_SIGNED_IN'){
        var signInMsg=addMsg('bot','🔒 Sign in to use Ask Mr. Mohamed — it\'s free and only takes an email code.');
        var signInExtra=document.createElement('div');
        signInExtra.style.marginTop='8px';
        signInExtra.innerHTML='<button onclick="window.openCloudAuthModal&&window.openCloudAuthModal()" style="padding:4px 12px;background:var(--indigo);color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:.85em">☁️ Sign in</button><div style="font-size:.85em;opacity:.75;margin-top:6px">Or paste your own free Groq key in ⚙️ API Key below to skip signing in.</div>';
        signInMsg.appendChild(signInExtra); body.scrollTop=body.scrollHeight;
      } else if(e&&e.message==='NO_KEY'){
        var noKeyMsg=addMsg('bot','⚠️ No AI key configured. Open ⚙️ API Key below, paste a free Groq key and click Save.');
        var noKeyExtra=document.createElement('div');
        noKeyExtra.style.marginTop='6px'; noKeyExtra.style.fontSize='.85em';
        noKeyExtra.innerHTML='Get one free at <a href="https://console.groq.com/keys" target="_blank" rel="noopener">console.groq.com/keys</a>.';
        noKeyMsg.appendChild(noKeyExtra); body.scrollTop=body.scrollHeight;
      } else {
        var em=e&&e.message?e.message:'unknown';
        var hint;
        if(em.indexOf('429')>-1){
          hint=' — rate limit reached. Wait a minute and try again, or get your own free key at <a href="https://console.groq.com/keys" target="_blank">console.groq.com/keys</a> and enter it via ⚙️ API Key below.';
        } else if(em==='Failed to fetch'||em.indexOf('abort')>-1){
          hint=' — request timed out or network error. Check your connection, or the shared key may be rate-limited (<a href="https://console.groq.com/keys" target="_blank">get your own free key</a>).';
        } else if(em.indexOf('401')>-1){
          hint=' — invalid API key. Open ⚙️ API Key and enter a valid Groq key.';
        } else if(/does not have access to model|model_not_found|model .* does not exist/i.test(em)){
          /* The shared proxy's OpenAI project can't use the configured model
             (supabase/functions/ai-proxy OPENAI_MODEL) — a server setting,
             not something the student's connection can cause or fix. */
          hint=' — the AI model isn\'t available on the server right now. Please try again later.';
        } else {
          /* Anything else reached here came back from the AI service itself
             (the network-failure cases are handled above), so don't blame
             the student's internet connection for it. */
          hint=' — the AI service returned an error. Please try again in a moment.';
        }
        var errMsg=addMsg('bot','⚠️ AI error:');
        var errExtra=document.createElement('div');
        errExtra.style.marginTop='4px'; errExtra.style.fontSize='.9em';
        errExtra.innerHTML='<code>'+escHtml(em)+'</code>'+hint;
        errMsg.appendChild(errExtra); body.scrollTop=body.scrollHeight;
      }
    }).then(function(){ busy=false; send.disabled=false; input.focus(); });
  }


  if(_chatUIReady){
    fab.addEventListener('click',openPanel);
    closeBtn.addEventListener('click',closePanel);
    send.addEventListener('click',sendMsg);
    input.addEventListener('keydown',function(e){ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); sendMsg(); } });
    input.addEventListener('input',function(){ input.style.height='auto'; input.style.height=Math.min(120,input.scrollHeight)+'px'; });
  }
})();

/* ─────────────────────────────────────────────── */

