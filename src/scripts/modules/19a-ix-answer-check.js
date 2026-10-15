/* Typed-answer checking for interactive activities (Plan 10, Phase 10.0).

   The Step Builder used to compare answers after deleting every character that
   wasn't a letter or digit, so "2x-1" matched "2x+1", "-3" matched "3", "x>5"
   matched "x<5" and "1/2" matched "12": sign and operator errors were marked
   correct. This replaces that with:
     1. exact match after light normalisation (spacing, case, ², π, √, LaTeX
        delimiters, \frac/\sqrt, unicode minus), else
     2. relation-aware comparison (=, <, <=, >, >=, != must match; "5<x" is
        accepted for "x>5"; "x=3" is accepted for "3"), else
     3. tuples/lists compared item by item ("(3,2)"; bare lists also unordered), else
     4. numeric equivalence: both sides are parsed by a small expression parser
        (no eval) and compared at several random variable values, so "1/2" =
        "0.5", "2(x+1)" = "2x+2", "4cos^2θ" = "4(cosθ)^2".
   Anything that can't be parsed falls back to the exact match in step 1, so a
   wrong answer is never accepted by being "close enough" as text.
   Exposed as window.ClipSATAnswerCheck; also exported for scripts/test-answer-check.js. */
(function(root){
'use strict';

function canon(s){
  var str = String(s==null?'':s).trim().toLowerCase()
    .replace(/\\[()\[\]]/g,'').replace(/\$/g,'')
    .replace(/\\left|\\right|\\,|\\;|\\!/g,'');

  for(var iter=0; iter<6; iter++){
    var prev = str;
    str = str.replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)');
    str = str.replace(/\\[dt]?frac\{([^{}]+)\}\{([^{}]+)\}/g, '(($1)/($2))');
    if(str === prev) break;
  }

  return str
    .replace(/\\cdot|\\times|[×·∙]/g,'*').replace(/÷/g,'/')
    .replace(/\\pi|π/g,'pi').replace(/\\theta/g,'θ')
    .replace(/\\alpha/g,'α').replace(/\\beta/g,'β').replace(/\\gamma/g,'γ')
    .replace(/\\delta/g,'δ').replace(/\\lambda/g,'λ').replace(/\\mu/g,'μ')
    .replace(/\\sigma/g,'σ').replace(/\\phi/g,'φ').replace(/\\omega/g,'ω')
    .replace(/\\pm|\+-/g,'±')
    .replace(/\\le(q)?\b|≤/g,'<=').replace(/\\ge(q)?\b|≥/g,'>=').replace(/\\neq?\b|≠/g,'!=')
    .replace(/√/g,'sqrt').replace(/²/g,'^2').replace(/³/g,'^3')
    .replace(/[−–—]/g,'-')
    .replace(/_\{([0-9]+)\}|_([0-9]+)/g,function(m,p1,p2){return p1||p2;})
    .replace(/(\d+(?:\.\d+)?)%/g,'(($1)/100)')
    .replace(/\{/g,'(').replace(/\}/g,')')
    .replace(/\\/g,'')
    .replace(/\s+/g,'');
}

/* ── Tiny expression parser → closure. No eval/new Function: user input is parsed. ── */
var FUNCS={sin:Math.sin,cos:Math.cos,tan:Math.tan,sec:function(x){return 1/Math.cos(x);},
  csc:function(x){return 1/Math.sin(x);},cot:function(x){return 1/Math.tan(x);},
  arcsin:Math.asin,arccos:Math.acos,arctan:Math.atan,ln:Math.log,
  log:function(x){return Math.log(x)/Math.LN10;},sqrt:Math.sqrt,cbrt:Math.cbrt,abs:Math.abs,exp:Math.exp};
var NAMES=Object.keys(FUNCS).concat(['pi','inf','infty']).sort(function(a,b){return b.length-a.length;});

function tokenize(s){
  var t=[],i=0,m;
  while(i<s.length){
    var c=s[i],rest=s.slice(i);
    if((m=/^(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(rest))){t.push({k:'n',v:parseFloat(m[0])});i+=m[0].length;continue;}
    if('+-*/^(),|'.indexOf(c)>=0){t.push({k:c});i++;continue;}
    if(/[a-zθα-ω]/.test(c)){
      var name=null;
      for(var j=0;j<NAMES.length;j++) if(rest.indexOf(NAMES[j])===0){name=NAMES[j];break;}
      if(name==='pi'){t.push({k:'n',v:Math.PI});i+=2;continue;}
      if(name==='inf'||name==='infty'){t.push({k:'n',v:Infinity});i+=name.length;continue;}
      if(name){t.push({k:'f',v:name});i+=name.length;continue;}
      if(c==='e'){t.push({k:'n',v:Math.E});i++;continue;}
      var sub=/^[a-zθα-ω](\d+)/.exec(rest);   /* p0, x1: subscripted names, not p·0 */
      if(sub){t.push({k:'v',v:sub[0]});i+=sub[0].length;continue;}
      t.push({k:'v',v:c});i++;continue;
    }
    return null; /* unknown character: not an expression */
  }
  return t;
}

function parse(str){
  var t=tokenize(str),p=0,vars={};
  if(!t||!t.length) return null;
  /* 3+ bare letters in a row is a word ("concaveup"), not x·y·z — don't let anagrams match */
  for(var w=0,run=0;w<t.length;w++){run=t[w].k==='v'?run+1:0;if(run>=3)return null;}
  function peek(){return t[p];}
  function eat(k){if(t[p]&&t[p].k===k){p++;return true;}return false;}
  function startsAtom(tk){return tk&&(tk.k==='n'||tk.k==='v'||tk.k==='f'||tk.k==='(');}
  function expr(){
    var l=term();
    while(peek()&&(peek().k==='+'||peek().k==='-')){
      var op=t[p++].k,r=term();
      l=op==='+'?(function(a,r){return function(e){return a(e)+r(e);};})(l,r)
               :(function(a,r){return function(e){return a(e)-r(e);};})(l,r);
    }
    return l;
  }
  function term(){
    var l=unary();
    for(;;){
      var tk=peek(),r,a=l;
      if(tk&&(tk.k==='*'||tk.k==='/')){p++;r=unary();
        l=tk.k==='*'?(function(a,r){return function(e){return a(e)*r(e);};})(a,r)
                    :(function(a,r){return function(e){return a(e)/r(e);};})(a,r);}
      else if(startsAtom(tk)){r=power();l=(function(a,r){return function(e){return a(e)*r(e);};})(a,r);}
      else return l;
    }
  }
  function unary(){
    if(eat('-')){var u=unary();return function(e){return -u(e);};}
    if(eat('+')) return unary();
    return power();
  }
  function power(){
    var b=atom();
    if(eat('^')){var x=unary();return function(e){return Math.pow(b(e),x(e));};}
    return b;
  }
  function atom(){
    var tk=t[p++];
    if(!tk) throw 0;
    if(tk.k==='n'){var v=tk.v;return function(){return v;};}
    if(tk.k==='v'){var n=tk.v;vars[n]=1;return function(e){return e[n];};}
    if(tk.k==='('){var inner=expr();if(!eat(')'))throw 0;return inner;}
    if(tk.k==='|'){var ab=expr();if(!eat('|'))throw 0;return function(e){return Math.abs(ab(e));};}
    if(tk.k==='f'){
      var f=FUNCS[tk.v],ex=null;
      if(eat('^')) ex=unary();           /* cos^2θ means (cos θ)^2 */
      var arg=power();
      return ex?function(e){return Math.pow(f(arg(e)),ex(e));}:function(e){return f(arg(e));};
    }
    throw 0;
  }
  try{var fn=expr();if(p!==t.length)return null;return {fn:fn,vars:vars};}catch(e){return null;}
}

var POINTS=[0.37,0.81,1.23,1.71,2.29,2.83];
function numEqual(u,a){
  var pu=parse(u),pa=parse(a);
  if(!pu||!pa) return false;
  var names=Object.keys(pu.vars).concat(Object.keys(pa.vars)),valid=0;
  for(var i=0;i<POINTS.length;i++){
    var env={};
    names.forEach(function(n,k){env[n]=POINTS[(i+k*2)%POINTS.length]+0.11*k;});
    var x=pu.fn(env),y=pa.fn(env),fx=isFinite(x),fy=isFinite(y);
    if(!fx&&!fy) continue;           /* both outside their domain here */
    if(fx!==fy) return false;
    if(Math.abs(x-y)>1e-6*Math.max(1,Math.abs(y))) return false;
    valid++;
  }
  return valid>=3;
}

function splitTop(s,sep){
  var out=[],depth=0,cur='';
  for(var i=0;i<s.length;i++){
    var c=s[i];
    if(c==='('||c==='[')depth++;
    else if(c===')'||c===']')depth--;
    if(depth===0&&c===sep){out.push(cur);cur='';}else cur+=c;
  }
  out.push(cur);
  return out;
}
function wrapped(s){
  if(!/^[(\[].*[)\]]$/.test(s)) return false;
  var depth=0;
  for(var i=0;i<s.length;i++){
    if(s[i]==='('||s[i]==='[')depth++;
    else if(s[i]===')'||s[i]===']'){depth--;if(depth===0&&i<s.length-1)return false;}
  }
  return true;
}

var REL=/(<=|>=|!=|<|>|=)/;
var FLIP={'<':'>','>':'<','<=':'>=','>=':'<=','=':'=','!=':'!='};
function valueEqual(u,a){
  if(u===a) return true;
  var ui=wrapped(u)?u.slice(1,-1):u, ai=wrapped(a)?a.slice(1,-1):a;
  var ul=splitTop(ui,','), al=splitTop(ai,',');
  if(al.length>1||ul.length>1){
    if(ul.length!==al.length) return false;
    if(ul.every(function(x,i){return valueEqual(x,al[i]);})) return true;
    if(wrapped(a)) return false;      /* coordinates/tuples: order matters */
    var left=al.slice();               /* bare lists such as roots: any order */
    return ul.every(function(x){
      for(var i=0;i<left.length;i++) if(valueEqual(x,left[i])){left.splice(i,1);return true;}
      return false;
    });
  }
  return numEqual(u,a);
}

function equivalent(user,answer){
  var u=canon(user),a=canon(answer);
  if(!u) return false;
  if(u===a) return true;
  if(u.indexOf('±')!==-1 || a.indexOf('±')!==-1){
    var uExp = u.indexOf('±')!==-1 ? (u.replace(/±/g,'+')+','+u.replace(/±/g,'-')) : u;
    var aExp = a.indexOf('±')!==-1 ? (a.replace(/±/g,'+')+','+a.replace(/±/g,'-')) : a;
    return equivalent(uExp, aExp);
  }
  var us=u.split(REL),as=a.split(REL);
  if(as.length===1&&us.length===3&&us[1]==='='&&/^[a-zθ]$/.test(us[0])) return valueEqual(us[2],a); /* "x=3" for "3" */
  if(us.length===1&&as.length===3&&as[1]==='='&&/^[a-zθ]$/.test(as[0])) return valueEqual(u,as[2]); /* "3" for "x=3" */
  if(us.length===5 && as.length===5){
    if(us[1]===as[1]&&us[3]===as[3]&&valueEqual(us[0],as[0])&&valueEqual(us[2],as[2])&&valueEqual(us[4],as[4])) return true;
    if(FLIP[us[1]]===as[3]&&FLIP[us[3]]===as[1]&&valueEqual(us[0],as[4])&&valueEqual(us[2],as[2])&&valueEqual(us[4],as[0])) return true;
  }
  if(us.length!==as.length) return false;
  if(as.length===1) return valueEqual(u,a);
  if(as.length!==3) return false;
  if(us[1]===as[1]&&valueEqual(us[0],as[0])&&valueEqual(us[2],as[2])) return true;
  return FLIP[us[1]]===as[1]&&valueEqual(us[2],as[0])&&valueEqual(us[0],as[2]);   /* "5<x" for "x>5" */
}

var api={equivalent:equivalent,canon:canon};
root.ClipSATAnswerCheck=api;
if(typeof module==='object'&&module.exports) module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
