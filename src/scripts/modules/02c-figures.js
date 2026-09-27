/* The figure renderers, moved verbatim (Plan 5 Phase 5.015, ADR 0045):
   - from 02-core-app.js: the shared FIG_* palette and window._renderFig, which draws
     question-bank figures (chapter quizzes, question-bank papers);
   - from 05-test-generator-and-ai-settings.js: window.renderMathFigure and its SVG renderers
     (function graphs, 2D/3D geometry, charts, number lines), the schema AI tests use. _renderFig
     routes figures in that schema to it.
   Ships as public/js/figures.js. 02's _ensureFigures() loads it the first time a chapter quiz or
   paper needs a figure; _ensureBankExam() (and so _ensureAIExam()) loads it too. */
(function(){
  "use strict";

  /* ===================== FIGURE RENDERER ===================== */
  /* ── Shared figure-rendering palette — brand-consistent across every quiz/exam/worksheet
     figure (mirrors the INDIGO/AMBER/TEAL system already used by the PDF worksheet generator
     in tools/worksheet_gen/generate.py, so a diagram looks the same whether it's on a live
     quiz page or a downloaded worksheet). ── */
  /* declared on window (not a local var) so both this closure and the private
     renderMathFigure/renderGeom2D/renderGeom3D/etc. closure elsewhere in this
     script can see the same palette without needing a second declaration. */
  window.FIG_INDIGO='#1E3A6E'; window.FIG_INDIGO2='#2B5BA8'; window.FIG_INDIGO_FILL='rgba(30,58,110,0.08)';
  window.FIG_INDIGO_FILL2='rgba(43,91,168,0.16)'; window.FIG_AMBER='#C8902A'; window.FIG_AMBER_TEXT='#8A6017';
  window.FIG_AMBER_FILL='rgba(200,144,42,0.16)'; window.FIG_TEAL='#0e9f8f'; window.FIG_INK='#0E1726';
  window.FIG_MUTED='#5a6577'; window.FIG_GRID='#c9d4e8'; window.FIG_BORDER='#dde4f0'; window.FIG_BG='#fbfcfe';
  window.FIG_SERIES=[window.FIG_INDIGO2,window.FIG_AMBER,window.FIG_TEAL,'#8B5CF6','#DB5C6B'];
  var FIG_INDIGO=window.FIG_INDIGO, FIG_INDIGO2=window.FIG_INDIGO2, FIG_INDIGO_FILL=window.FIG_INDIGO_FILL,
      FIG_INDIGO_FILL2=window.FIG_INDIGO_FILL2, FIG_AMBER=window.FIG_AMBER, FIG_AMBER_TEXT=window.FIG_AMBER_TEXT,
      FIG_AMBER_FILL=window.FIG_AMBER_FILL, FIG_TEAL=window.FIG_TEAL, FIG_INK=window.FIG_INK,
      FIG_MUTED=window.FIG_MUTED, FIG_GRID=window.FIG_GRID, FIG_BORDER=window.FIG_BORDER, FIG_BG=window.FIG_BG,
      FIG_SERIES=window.FIG_SERIES;

  window._renderFig=function(fig){
    try{
    if(!fig) return '';
    if(typeof fig==='string') return fig;
    /* one shared entry point: figures authored in the richer renderMathFigure schema
       (function_graph / geometry_2d / geometry_3d / bar_chart / pie / number_line) are
       routed to the same renderers used by the AI test generator, so every figure —
       regardless of which schema authored it — renders through one call surface. */
    if(typeof window.renderMathFigure==='function' &&
       (fig.type==='function_graph'||fig.type==='geometry_2d'||fig.type==='geometry_3d'||
        fig.type==='bar_chart'||fig.type==='pie'||fig.type==='number_line')){
      /* Those renderers emit class="mfig-svg", which is width:100% — sized for the
         AI-test generator's full-width .mfig card. Dropped straight into a
         .cq-figure (chapter quiz) it has no width cap and stretches to the whole
         question column. Wrap it so the figure's own `width` is honored as a cap,
         while still shrinking on narrow screens. */
      var inner=window.renderMathFigure(fig);
      if(!inner) return '';
      var capW=fig.width||260;
      return '<span style="display:inline-block;width:100%;max-width:'+capW+'px">'+inner+'</span>';
    }
    var W=fig.w||260,H=fig.h||200;
    var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:100%;font-family:sans-serif;background:'+FIG_BG+';border-radius:6px;border:1px solid '+FIG_BORDER+'">';
    /* ── coordinate axes + function plots ── */
    if(fig.type==='fn'||fig.type==='axes'){
      var xl=fig.xrange||[-5,5],yl=fig.yrange||[-5,5];
      var pad=38,gw=W-2*pad,gh=H-2*pad;
      var sx=gw/(xl[1]-xl[0]),sy=gh/(yl[1]-yl[0]);
      var ox=pad+(-xl[0])*sx,oy=pad+(yl[1])*sy;
      /* grid */
      s+='<g stroke="'+FIG_GRID+'" stroke-width="0.5">';
      for(var gx=Math.ceil(xl[0]);gx<=xl[1];gx++){var px=pad+(gx-xl[0])*sx;s+='<line x1="'+px+'" y1="'+pad+'" x2="'+px+'" y2="'+(H-pad)+'"/>';}
      for(var gy=Math.ceil(yl[0]);gy<=yl[1];gy++){var py=pad+(yl[1]-gy)*sy;s+='<line x1="'+pad+'" y1="'+py+'" x2="'+(W-pad)+'" y2="'+py+'"/>';}
      s+='</g>';
      /* axes */
      s+='<line x1="'+pad+'" y1="'+oy+'" x2="'+(W-pad)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.5" marker-end="url(#arr)"/>';
      s+='<line x1="'+ox+'" y1="'+(H-pad)+'" x2="'+ox+'" y2="'+pad+'" stroke="'+FIG_INK+'" stroke-width="1.5" marker-end="url(#arr2)"/>';
      s+='<defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="'+FIG_INK+'"/></marker><marker id="arr2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,6 L3,0 L6,6 Z" fill="'+FIG_INK+'"/></marker></defs>';
      /* tick labels — thinned to a round step so a wide window (e.g. -11..11 on a
         240px canvas) doesn't smear 23 overlapping numbers along each axis. The
         GRID stays at every unit; only the labels/ticks step. */
      var _step=function(span,px){
        var room=Math.max(3,Math.floor(px/24));           /* ~24px per label */
        var raw=Math.ceil(span/room);
        return [1,2,5,10,20,25,50,100].find(function(n){return n>=raw;})||Math.ceil(raw/10)*10;
      };
      var stepX=_step(xl[1]-xl[0],gw), stepY=_step(yl[1]-yl[0],gh);
      s+='<g font-size="8" fill="'+FIG_MUTED+'" text-anchor="middle">';
      for(var tx=Math.ceil(xl[0]);tx<=Math.floor(xl[1]);tx++){if(tx===0||tx%stepX!==0)continue;var tpx=pad+(tx-xl[0])*sx;if(tpx<pad+4||tpx>W-pad-4)continue;s+='<text x="'+tpx+'" y="'+(oy+13)+'">'+tx+'</text><line x1="'+tpx+'" y1="'+(oy-3)+'" x2="'+tpx+'" y2="'+(oy+3)+'" stroke="'+FIG_MUTED+'" stroke-width="1"/>';}
      s+='</g><g font-size="8" fill="'+FIG_MUTED+'" text-anchor="end">';
      for(var ty=Math.ceil(yl[0]);ty<=Math.floor(yl[1]);ty++){if(ty===0||ty%stepY!==0)continue;var tpy=pad+(yl[1]-ty)*sy;if(tpy<pad+4||tpy>H-pad-4)continue;s+='<text x="'+(ox-5)+'" y="'+(tpy+3)+'">'+ty+'</text><line x1="'+(ox-3)+'" y1="'+tpy+'" x2="'+(ox+3)+'" y2="'+tpy+'" stroke="'+FIG_MUTED+'" stroke-width="1"/>';}
      s+='</g>';
      /* axis labels */
      s+='<text x="'+(W-pad+10)+'" y="'+(oy+4)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic">x</text>';
      s+='<text x="'+(ox+5)+'" y="'+(pad-8)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic">y</text>';
      /* function curves */
      var COLS=FIG_SERIES;
      (fig.fns||[]).forEach(function(f,fi){
        var col=f.color||COLS[fi%COLS.length];
        var pts=[],steps=300;
        for(var si=0;si<=steps;si++){
          var xx=xl[0]+(xl[1]-xl[0])*si/steps;
          var yy;try{yy=eval(f.fn.replace(/x/g,'('+xx+')'));}catch(e){continue;}
          if(!isFinite(yy)||yy<yl[0]-0.5||yy>yl[1]+0.5){if(pts.length){s+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+col+'" stroke-width="2.2" stroke-linejoin="round"/>';pts=[];}continue;}
          pts.push((pad+(xx-xl[0])*sx).toFixed(1)+','+(pad+(yl[1]-yy)*sy).toFixed(1));
        }
        if(pts.length)s+='<polyline points="'+pts.join(' ')+'" fill="none" stroke="'+col+'" stroke-width="2.2" stroke-linejoin="round"/>';
        if(f.label)s+='<text x="'+(pad+(f.lx!==undefined?f.lx:xl[1]*0.7-xl[0])*sx+pad*(f.lx!==undefined?0:0))+'" y="'+(pad+(yl[1]-(f.ly!==undefined?f.ly:eval(f.fn.replace(/x/g,'('+xl[1]*0.7+')'))))*sy-6)+'" font-size="10" fill="'+col+'" font-style="italic">'+f.label+'</text>';
      });
      /* points */
      (fig.points||[]).forEach(function(p){
        var px=pad+(p.x-xl[0])*sx,py=pad+(yl[1]-p.y)*sy;
        s+='<circle cx="'+px+'" cy="'+py+'" r="'+(p.r||4)+'" fill="'+(p.open?'#fff':(p.color||FIG_INDIGO2))+'" stroke="'+(p.color||FIG_INDIGO2)+'" stroke-width="1.8"/>';
        if(p.label){
          /* flip the label inward for points in the right half, otherwise it
             runs off the canvas and collides with the x-axis label */
          var rh=p.x>(xl[0]+xl[1])/2, aut=p.dx===undefined;
          var ldx=aut?(rh?-8:8):p.dx, anc=(aut&&rh)?'end':'start';
          s+='<text x="'+(px+ldx)+'" y="'+(py+(p.dy||-6))+'" font-size="10" fill="'+FIG_INK+'" text-anchor="'+anc+'">'+p.label+'</text>';
        }
      });
      /* shaded regions */
      (fig.shade||[]).forEach(function(r){
        var steps2=80,pts2=[];
        if(r.fn2){
          /* shade between two curves */
          for(var si2=0;si2<=steps2;si2++){var xx2=r.x1+(r.x2-r.x1)*si2/steps2;var yy2;try{yy2=eval(r.fn.replace(/x/g,'('+xx2+')'));}catch(e){continue;}pts2.push((pad+(xx2-xl[0])*sx).toFixed(1)+','+(pad+(yl[1]-yy2)*sy).toFixed(1));}
          for(var si3=steps2;si3>=0;si3--){var xx3=r.x1+(r.x2-r.x1)*si3/steps2;var yy3;try{yy3=eval(r.fn2.replace(/x/g,'('+xx3+')'));}catch(e){continue;}pts2.push((pad+(xx3-xl[0])*sx).toFixed(1)+','+(pad+(yl[1]-yy3)*sy).toFixed(1));}
        } else {
          for(var si2=0;si2<=steps2;si2++){var xx2=r.x1+(r.x2-r.x1)*si2/steps2;var yy2;try{yy2=eval(r.fn.replace(/x/g,'('+xx2+')'));}catch(e){continue;}pts2.push((pad+(xx2-xl[0])*sx).toFixed(1)+','+(pad+(yl[1]-yy2)*sy).toFixed(1));}
          pts2.push((pad+(r.x2-xl[0])*sx)+','+oy);pts2.push((pad+(r.x1-xl[0])*sx)+','+oy);
        }
        s+='<polygon points="'+pts2.join(' ')+'" fill="'+(r.color||FIG_INDIGO_FILL2)+'"/>';
      });
      /* horizontal/vertical ref lines */
      (fig.hlines||[]).forEach(function(hl){var py2=pad+(yl[1]-hl.y)*sy;s+='<line x1="'+pad+'" y1="'+py2+'" x2="'+(W-pad)+'" y2="'+py2+'" stroke="'+(hl.color||FIG_MUTED)+'" stroke-width="1" stroke-dasharray="'+(hl.dash||'4,3')+'"/>';if(hl.label)s+='<text x="'+(W-pad+4)+'" y="'+(py2+4)+'" font-size="9" fill="'+(hl.color||FIG_MUTED)+'">'+hl.label+'</text>';});
    }
    /* ── triangle ── */
    else if(fig.type==='triangle'){
      var verts=fig.vertices;
      var pad3=32;
      /* if an exterior-angle construction is requested, its extension point(s)
         must be included in the bbox BEFORE scaling, or the auxiliary ray gets
         clipped off canvas. Computed in DATA space, same as the vertices. */
      var extDataPts=[];
      if(fig.ext_angle){
        var eaD=fig.ext_angle, atD=eaD.at;
        if(eaD.mode==='side'){
          var fromD=eaD.from, AD=verts[fromD], BD=verts[atD];
          var dxD=BD[0]-AD[0], dyD=BD[1]-AD[1], lenD=Math.sqrt(dxD*dxD+dyD*dyD)||1, extLenD=lenD*0.65;
          extDataPts.push([BD[0]+dxD/lenD*extLenD, BD[1]+dyD/lenD*extLenD]);
        } else if(eaD.mode==='parallel'){
          var spanD=(Math.max(verts[0][0],verts[1][0],verts[2][0])-Math.min(verts[0][0],verts[1][0],verts[2][0]))*0.55||3;
          extDataPts.push([verts[atD][0]-spanD, verts[atD][1]], [verts[atD][0]+spanD, verts[atD][1]]);
        }
      }
      var bboxPts=[verts[0],verts[1],verts[2]].concat(extDataPts);
      var minx2=Math.min.apply(null,bboxPts.map(function(p){return p[0];})),maxx2=Math.max.apply(null,bboxPts.map(function(p){return p[0];}));
      var miny2=Math.min.apply(null,bboxPts.map(function(p){return p[1];})),maxy2=Math.max.apply(null,bboxPts.map(function(p){return p[1];}));
      var sc3=Math.min((W-2*pad3)/(maxx2-minx2||1),(H-2*pad3)/(maxy2-miny2||1));
      var toS=function(v){return [(v[0]-minx2)*sc3+pad3,H-(v[1]-miny2)*sc3-pad3];};
      var p0=toS(verts[0]),p1=toS(verts[1]),p2=toS(verts[2]);
      var pts3=[p0,p1,p2].map(function(p){return p[0]+','+p[1];}).join(' ');
      s+='<polygon points="'+pts3+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      /* exterior-angle construction: a dashed auxiliary ray plus the resulting
         exterior angle, marked and labelled. 'side' extends an existing side
         past a vertex (classic exterior-angle-theorem figure); 'parallel'
         draws a line through a vertex parallel to the OPPOSITE side (always
         horizontal here, since every triangle in this schema has its base
         v0-v1 laid horizontal by construction) — the alternate-interior-angle
         proof of the same theorem. */
      if(fig.ext_angle){
        var eaP=[p0,p1,p2];
        if(fig.ext_angle.mode==='side'){
          var atP=eaP[fig.ext_angle.at], throughOther=eaP[fig.ext_angle.at===2?(fig.ext_angle.from===0?1:0):(fig.ext_angle.at===0?1:2)];
          var extScreen=toS(extDataPts[0]);
          s+='<line x1="'+atP[0].toFixed(1)+'" y1="'+atP[1].toFixed(1)+'" x2="'+extScreen[0].toFixed(1)+'" y2="'+extScreen[1].toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5,3"/>';
          /* exterior-angle arc: between the extension ray and the side NOT used to extend */
          var thirdIdx=3-fig.ext_angle.at-fig.ext_angle.from;
          var thirdP=eaP[thirdIdx];
          var vA=[extScreen[0]-atP[0],extScreen[1]-atP[1]], vB=[thirdP[0]-atP[0],thirdP[1]-atP[1]];
          var lA=Math.hypot(vA[0],vA[1])||1, lB=Math.hypot(vB[0],vB[1])||1;
          var angA=Math.atan2(vA[1],vA[0]), angB=Math.atan2(vB[1],vB[0]);
          var arR=16, sA=atP[0]+arR*Math.cos(angA), sY=atP[1]+arR*Math.sin(angA);
          var eA=atP[0]+arR*Math.cos(angB), eY=atP[1]+arR*Math.sin(angB);
          var crossD=vA[0]/lA*vB[1]/lB-vA[1]/lA*vB[0]/lB, sweepD=crossD>0?1:0;
          s+='<path d="M'+sA.toFixed(1)+','+sY.toFixed(1)+' A'+arR+','+arR+' 0 0,'+sweepD+' '+eA.toFixed(1)+','+eY.toFixed(1)+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
          var diffD=angB-angA;while(diffD>Math.PI)diffD-=2*Math.PI;while(diffD<-Math.PI)diffD+=2*Math.PI;
          var midD=angA+(crossD>0?1:-1)*Math.abs(diffD)/2;
          s+='<text x="'+(atP[0]+(arR+11)*Math.cos(midD)).toFixed(1)+'" y="'+(atP[1]+(arR+11)*Math.sin(midD)+3).toFixed(1)+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+(fig.ext_angle.label||'?')+'</text>';
        } else if(fig.ext_angle.mode==='parallel'){
          var e1=toS(extDataPts[0]), e2=toS(extDataPts[1]);
          s+='<line x1="'+e1[0].toFixed(1)+'" y1="'+e1[1].toFixed(1)+'" x2="'+e2[0].toFixed(1)+'" y2="'+e2[1].toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5,3"/>';
          var atPp=eaP[fig.ext_angle.at];
          s+='<text x="'+atPp[0].toFixed(1)+'" y="'+(atPp[1]-10).toFixed(1)+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+(fig.ext_angle.label||'?')+'</text>';
        }
      }
      /* right angle */
      if(fig.right!==undefined){
        var ri=fig.right,rv=[p0,p1,p2][ri],others=[[p0,p1,p2][(ri+1)%3],[p0,p1,p2][(ri+2)%3]];
        var v1=[others[0][0]-rv[0],others[0][1]-rv[1]],v2=[others[1][0]-rv[0],others[1][1]-rv[1]];
        var l1=Math.sqrt(v1[0]*v1[0]+v1[1]*v1[1])||1,l2=Math.sqrt(v2[0]*v2[0]+v2[1]*v2[1])||1;
        var u1=[v1[0]/l1*10,v1[1]/l1*10],u2=[v2[0]/l2*10,v2[1]/l2*10];
        s+='<polyline points="'+(rv[0]+u1[0]).toFixed(1)+','+(rv[1]+u1[1]).toFixed(1)+' '+(rv[0]+u1[0]+u2[0]).toFixed(1)+','+(rv[1]+u1[1]+u2[1]).toFixed(1)+' '+(rv[0]+u2[0]).toFixed(1)+','+(rv[1]+u2[1]).toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.5"/>';
      }
      /* equal-side tick marks (optional list of side indices, mirrors the geometry_2d schema) */
      (fig.equal_sides||[]).forEach(function(si){
        var pts9=[p0,p1,p2],a9=pts9[si%3],b9=pts9[(si+1)%3];
        var mx9=(a9[0]+b9[0])/2,my9=(a9[1]+b9[1])/2;
        var ang9=Math.atan2(b9[1]-a9[1],b9[0]-a9[0]),perp9=ang9+Math.PI/2,t9=5;
        s+='<line x1="'+(mx9+Math.cos(perp9)*t9).toFixed(1)+'" y1="'+(my9+Math.sin(perp9)*t9).toFixed(1)+'" x2="'+(mx9-Math.cos(perp9)*t9).toFixed(1)+'" y2="'+(my9-Math.sin(perp9)*t9).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
      });
      /* vertex labels */
      var cx3=(p0[0]+p1[0]+p2[0])/3,cy3=(p0[1]+p1[1]+p2[1])/3;
      (fig.labels||[]).forEach(function(lbl,i){
        if(!lbl)return;
        var pt=[p0,p1,p2][i],dx=pt[0]-cx3,dy=pt[1]-cy3,len=Math.sqrt(dx*dx+dy*dy)||1;
        s+='<text x="'+(pt[0]+dx/len*15)+'" y="'+(pt[1]+dy/len*15+4)+'" font-size="12" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+lbl+'</text>';
      });
      /* side labels */
      (fig.sides||[]).forEach(function(side,i){
        if(!side)return;
        var pts4=[p0,p1,p2],a=pts4[i],b=pts4[(i+1)%3];
        var mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2;
        var dx=b[0]-a[0],dy=b[1]-a[1],len=Math.sqrt(dx*dx+dy*dy)||1;
        var nx=-dy/len*14,ny=dx/len*14;
        s+='<text x="'+(mx+nx).toFixed(1)+'" y="'+(my+ny+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+side+'</text>';
      });
      /* angle arcs with labels */
      (fig.angles||[]).forEach(function(ang,i){
        if(!ang)return;
        var pts5=[p0,p1,p2],rv2=pts5[i];
        var oth1=pts5[(i+1)%3],oth2=pts5[(i+2)%3];
        var v1=[oth1[0]-rv2[0],oth1[1]-rv2[1]],v2=[oth2[0]-rv2[0],oth2[1]-rv2[1]];
        var l1=Math.sqrt(v1[0]*v1[0]+v1[1]*v1[1])||1,l2=Math.sqrt(v2[0]*v2[0]+v2[1]*v2[1])||1;
        var a1=Math.atan2(v1[1],v1[0]),a2=Math.atan2(v2[1],v2[0]);
        var ar=14;
        var sx2=(rv2[0]+ar*Math.cos(a1)).toFixed(1),sy2=(rv2[1]+ar*Math.sin(a1)).toFixed(1);
        var ex2=(rv2[0]+ar*Math.cos(a2)).toFixed(1),ey2=(rv2[1]+ar*Math.sin(a2)).toFixed(1);
        var cross=v1[0]/l1*v2[1]/l2-v1[1]/l1*v2[0]/l2;
        var sweep=cross>0?1:0;
        s+='<path d="M'+sx2+','+sy2+' A'+ar+','+ar+' 0 0,'+sweep+' '+ex2+','+ey2+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
        var diff=a2-a1;while(diff>Math.PI)diff-=2*Math.PI;while(diff<-Math.PI)diff+=2*Math.PI;
        var midA=a1+(cross>0?1:-1)*Math.abs(diff)/2;
        var lx2=(rv2[0]+(ar+9)*Math.cos(midA)).toFixed(1),ly2=(rv2[1]+(ar+9)*Math.sin(midA)+3).toFixed(1);
        s+='<text x="'+lx2+'" y="'+ly2+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+ang+'</text>';
      });
      /* a segment DE parallel to the base, D on side v0-v1 and E on v0-v2 —
         drawn at a FIXED schematic parameter (not the real AD/AB ratio,
         which the question usually gives while leaving EC/AE to solve for)
         so the picture illustrates the Triangle Proportionality Theorem
         setup without its own proportions revealing the unknown length. */
      if(fig.cevian_parallel){
        var cpT=fig.cevian_parallel.t!==undefined?fig.cevian_parallel.t:0.55;
        var cpD=[p0[0]+(p1[0]-p0[0])*cpT, p0[1]+(p1[1]-p0[1])*cpT];
        var cpE=[p0[0]+(p2[0]-p0[0])*cpT, p0[1]+(p2[1]-p0[1])*cpT];
        s+='<line x1="'+cpD[0].toFixed(1)+'" y1="'+cpD[1].toFixed(1)+'" x2="'+cpE[0].toFixed(1)+'" y2="'+cpE[1].toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';
        s+='<circle cx="'+cpD[0].toFixed(1)+'" cy="'+cpD[1].toFixed(1)+'" r="2.6" fill="'+FIG_INK+'"/>';
        s+='<circle cx="'+cpE[0].toFixed(1)+'" cy="'+cpE[1].toFixed(1)+'" r="2.6" fill="'+FIG_INK+'"/>';
        var cpLbl=fig.cevian_parallel.labels||{};
        if(cpLbl.d)s+='<text x="'+cpD[0].toFixed(1)+'" y="'+(cpD[1]+13).toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">D</text>';
        if(cpLbl.e)s+='<text x="'+(cpE[0]+11).toFixed(1)+'" y="'+cpE[1].toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">E</text>';
        var cpMid=function(a,b){return [(a[0]+b[0])/2,(a[1]+b[1])/2];};
        var cpAD=cpMid(p0,cpD), cpDB=cpMid(cpD,p1), cpAE=cpMid(p0,cpE), cpEC=cpMid(cpE,p2);
        [[cpAD,cpLbl.ad],[cpDB,cpLbl.db],[cpAE,cpLbl.ae],[cpEC,cpLbl.ec]].forEach(function(pr){
          if(!pr[1])return;
          s+='<text x="'+pr[0][0].toFixed(1)+'" y="'+(pr[0][1]-6).toFixed(1)+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+pr[1]+'</text>';
        });
      }
    }
    /* ── circle ── */
    /* ── two SIMILAR shapes side by side ──
       Both shapes share one `vertices` list and differ only by `ratio`, so they
       are guaranteed genuinely similar rather than two drawings that merely look
       alike — that similarity IS the mathematical content of these questions.
       Each side carries its own side-labels and caption. */
    else if(fig.type==='similar'){
      var vsim=fig.vertices||[[0,0],[10,0],[0,10]];
      var rt=fig.ratio||0.55, capH=15, padS=16;
      var xsS=vsim.map(function(v){return v[0];}), ysS=vsim.map(function(v){return v[1];});
      var mnx=Math.min.apply(null,xsS), mxx=Math.max.apply(null,xsS);
      var mny=Math.min.apply(null,ysS), mxy=Math.max.apply(null,ysS);
      var bw=(mxx-mnx)||1, bh=(mxy-mny)||1;
      var scS=Math.min((W/2-2*padS)/bw, (H-2*padS-capH)/bh);
      var baseY=H-padS-capH;
      var drawOne=function(cfg,cxc,scale){
        if(!cfg) return '';
        var out='', pts=vsim.map(function(v){
          return [cxc+(v[0]-(mnx+mxx)/2)*scale, baseY-(v[1]-mny)*scale];
        });
        out+='<polygon points="'+pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ')+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        if(fig.right_angle!==undefined&&fig.right_angle!==null){
          var ri=fig.right_angle, v0=pts[ri], vp=pts[(ri+2)%pts.length], vn=pts[(ri+1)%pts.length];
          var n1=[vp[0]-v0[0],vp[1]-v0[1]], n2=[vn[0]-v0[0],vn[1]-v0[1]];
          var l1=Math.hypot(n1[0],n1[1])||1, l2=Math.hypot(n2[0],n2[1])||1, q=8;
          n1=[n1[0]/l1*q,n1[1]/l1*q]; n2=[n2[0]/l2*q,n2[1]/l2*q];
          out+='<polyline points="'+(v0[0]+n1[0]).toFixed(1)+','+(v0[1]+n1[1]).toFixed(1)+' '+(v0[0]+n1[0]+n2[0]).toFixed(1)+','+(v0[1]+n1[1]+n2[1]).toFixed(1)+' '+(v0[0]+n2[0]).toFixed(1)+','+(v0[1]+n2[1]).toFixed(1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.1"/>';
        }
        var cen=[pts.reduce(function(a,p){return a+p[0];},0)/pts.length, pts.reduce(function(a,p){return a+p[1];},0)/pts.length];
        (cfg.sides||[]).forEach(function(sd,i){
          if(!sd) return;
          var a=pts[i], b=pts[(i+1)%pts.length];
          var mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
          var ex=b[0]-a[0], ey=b[1]-a[1], el=Math.hypot(ex,ey)||1;
          var nx=-ey/el, ny=ex/el;
          if((mx+nx-cen[0])*nx+(my+ny-cen[1])*ny<0){nx=-nx;ny=-ny;}
          out+='<text x="'+(mx+nx*12).toFixed(1)+'" y="'+(my+ny*12+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+sd+'</text>';
        });
        /* vertex letter labels (e.g. A,B,C on one shape, D,E,F on the other) */
        (cfg.labels||[]).forEach(function(lbl,i){
          if(!lbl) return;
          var pt=pts[i], dx=pt[0]-cen[0], dy=pt[1]-cen[1], len=Math.hypot(dx,dy)||1;
          out+='<text x="'+(pt[0]+dx/len*14).toFixed(1)+'" y="'+(pt[1]+dy/len*14+4).toFixed(1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+lbl+'</text>';
        });
        /* vertex angle arcs with a value/expression label (mirrors the `triangle` type's `angles`) */
        (cfg.angles||[]).forEach(function(ang,i){
          if(!ang) return;
          var v0=pts[i], oth1=pts[(i+1)%pts.length], oth2=pts[(i+2)%pts.length];
          var v1=[oth1[0]-v0[0],oth1[1]-v0[1]], v2=[oth2[0]-v0[0],oth2[1]-v0[1]];
          var l1=Math.hypot(v1[0],v1[1])||1, l2=Math.hypot(v2[0],v2[1])||1;
          var a1=Math.atan2(v1[1],v1[0]), a2=Math.atan2(v2[1],v2[0]);
          var ar=11;
          var sx=(v0[0]+ar*Math.cos(a1)).toFixed(1), sy=(v0[1]+ar*Math.sin(a1)).toFixed(1);
          var ex2=(v0[0]+ar*Math.cos(a2)).toFixed(1), ey2=(v0[1]+ar*Math.sin(a2)).toFixed(1);
          var cross=v1[0]/l1*v2[1]/l2-v1[1]/l1*v2[0]/l2, sweep=cross>0?1:0;
          out+='<path d="M'+sx+','+sy+' A'+ar+','+ar+' 0 0,'+sweep+' '+ex2+','+ey2+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.2"/>';
          var diff=a2-a1; while(diff>Math.PI)diff-=2*Math.PI; while(diff<-Math.PI)diff+=2*Math.PI;
          var midA=a1+(cross>0?1:-1)*Math.abs(diff)/2;
          var lx=(v0[0]+(ar+10)*Math.cos(midA)).toFixed(1), ly=(v0[1]+(ar+10)*Math.sin(midA)+3).toFixed(1);
          out+='<text x="'+lx+'" y="'+ly+'" font-size="9" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+ang+'</text>';
        });
        /* congruence tick marks — a side/angle carries n perpendicular ticks (or
           n stacked arcs) so a matching count on BOTH shapes shows which parts
           were given congruent; since both shapes share the same `vertices`
           list, index i means the same side/vertex on each, so one fig-level
           list applied identically to both draws is exactly the correspondence
           marking a congruence-postulate figure needs. */
        (fig.tick_sides||[]).forEach(function(ts){
          var i=ts.i, n=ts.n||1;
          var a=pts[i%pts.length], b=pts[(i+1)%pts.length];
          var ex=b[0]-a[0], ey=b[1]-a[1], el=Math.hypot(ex,ey)||1;
          var ux=ex/el, uy=ey/el, px=-uy, py=ux;
          for(var k=0;k<n;k++){
            var t=0.5+(k-(n-1)/2)*0.11;
            var tx=a[0]+ex*t, ty=a[1]+ey*t;
            out+='<line x1="'+(tx-px*5).toFixed(1)+'" y1="'+(ty-py*5).toFixed(1)+'" x2="'+(tx+px*5).toFixed(1)+'" y2="'+(ty+py*5).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6"/>';
          }
        });
        (fig.tick_angles||[]).forEach(function(ta){
          var i=ta.i, n=ta.n||1;
          var v0=pts[i%pts.length], oth1=pts[(i+1)%pts.length], oth2=pts[(i+2)%pts.length];
          var v1=[oth1[0]-v0[0],oth1[1]-v0[1]], v2=[oth2[0]-v0[0],oth2[1]-v0[1]];
          var l1=Math.hypot(v1[0],v1[1])||1, l2=Math.hypot(v2[0],v2[1])||1;
          var a1=Math.atan2(v1[1],v1[0]), a2=Math.atan2(v2[1],v2[0]);
          var cross=v1[0]/l1*v2[1]/l2-v1[1]/l1*v2[0]/l2, sweep=cross>0?1:0;
          for(var k2=0;k2<n;k2++){
            var ar2=8+k2*4;
            var sx2=(v0[0]+ar2*Math.cos(a1)).toFixed(1), sy2=(v0[1]+ar2*Math.sin(a1)).toFixed(1);
            var ex3=(v0[0]+ar2*Math.cos(a2)).toFixed(1), ey3=(v0[1]+ar2*Math.sin(a2)).toFixed(1);
            out+='<path d="M'+sx2+','+sy2+' A'+ar2+','+ar2+' 0 0,'+sweep+' '+ex3+','+ey3+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.3"/>';
          }
        });
        if(cfg.caption) out+='<text x="'+cxc.toFixed(1)+'" y="'+(H-3)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+cfg.caption+'</text>';
        return out;
      };
      s+=drawOne(fig.left, W*0.26, scS*rt);
      s+=drawOne(fig.right, W*0.74, scS);
      if(fig.tilde) s+='<text x="'+(W/2)+'" y="'+(baseY-8)+'" font-size="13" fill="'+FIG_MUTED+'" text-anchor="middle">~</text>';
      s+='</svg>';
      return s;
    }
    /* ── a single-vertex angle relationship: vertical / linear pair / complementary ──
       These are GEOMETRIC FACTS independent of the specific numbers (vertical
       angles are ALWAYS equal by position, a linear pair ALWAYS sums to 180 by
       construction, a complementary split ALWAYS sums to 90 by construction) —
       so a fixed, arbitrary split is truthful for ANY labels, including
       algebraic expressions whose numeric value isn't known until solved. */
    else if(fig.type==='vertex_angles'){
      var vaCx=W/2, vaCy=fig.mode==='complementary'?H*0.82:H/2, vaLen=Math.min(W,H)*0.42;
      var lbv=fig.labels||{};
      /* a line through the centre spanning direction ang1 to direction ang2
         (each endpoint independently placed by the standard polar formula —
         both must use the SAME sign convention or the two ends don't align
         into one straight line through the centre). */
      var vaLine=function(ang1,ang2,col,dash){
        var a1=ang1*Math.PI/180, a2=ang2*Math.PI/180;
        s+='<line x1="'+(vaCx+vaLen*Math.cos(a1)).toFixed(1)+'" y1="'+(vaCy-vaLen*Math.sin(a1)).toFixed(1)+'" x2="'+(vaCx+vaLen*Math.cos(a2)).toFixed(1)+'" y2="'+(vaCy-vaLen*Math.sin(a2)).toFixed(1)+'" stroke="'+(col||FIG_INDIGO)+'" stroke-width="2"'+(dash?' stroke-dasharray="5,3"':'')+'/>';
      };
      var vaLabel=function(midDeg,key,rad){
        if(!lbv[key])return;
        var t=midDeg*Math.PI/180, lx=vaCx+(rad||30)*Math.cos(t), ly=vaCy-(rad||30)*Math.sin(t);
        s+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="600">'+lbv[key]+'</text>';
      };
      if(fig.mode==='vertical'){
        var sl=fig.slant!==undefined?fig.slant:32;
        vaLine(180,0);                                    /* first line, full width, horizontal */
        vaLine(180+sl,sl);                                /* second line through the same centre, slanted */
        s+='<circle cx="'+vaCx+'" cy="'+vaCy+'" r="2.5" fill="'+FIG_INK+'"/>';
        vaLabel(sl/2,'1',26); vaLabel(180+sl/2,'2',26);     /* top / bottom wedge = a true vertical pair */
        vaLabel(90+sl/2,'3',26); vaLabel(270+sl/2,'4',26);  /* the other (also vertical) pair, if labelled */
      } else if(fig.mode==='linear'){
        var sl2=fig.slant!==undefined?fig.slant:55;
        vaLine(180,0);                                    /* the straight line, full width */
        var a3=sl2*Math.PI/180;
        s+='<line x1="'+vaCx.toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+(vaCx+vaLen*0.85*Math.cos(a3)).toFixed(1)+'" y2="'+(vaCy-vaLen*0.85*Math.sin(a3)).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        s+='<circle cx="'+vaCx+'" cy="'+vaCy+'" r="2.5" fill="'+FIG_INK+'"/>';
        vaLabel(sl2/2,'1',24);            /* wedge from 0 to sl2 */
        vaLabel((sl2+180)/2,'2',24);      /* wedge from sl2 to 180 — the two always sum to 180 */
      } else { /* complementary: a right-angle corner (tick-marked) split into two */
        s+='<line x1="'+(vaCx-vaLen*0.85).toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+vaCx.toFixed(1)+'" y2="'+vaCy.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        s+='<line x1="'+vaCx.toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+vaCx.toFixed(1)+'" y2="'+(vaCy-vaLen*0.85).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        var sl4=fig.slant!==undefined?fig.slant:38, a4=sl4*Math.PI/180;
        s+='<line x1="'+vaCx.toFixed(1)+'" y1="'+vaCy.toFixed(1)+'" x2="'+(vaCx+vaLen*0.7*Math.cos(a4)).toFixed(1)+'" y2="'+(vaCy-vaLen*0.7*Math.sin(a4)).toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8"/>';
        s+='<rect x="'+(vaCx-9).toFixed(1)+'" y="'+(vaCy-9).toFixed(1)+'" width="9" height="9" fill="none" stroke="'+FIG_INK+'" stroke-width="1"/>';
        s+='<circle cx="'+vaCx+'" cy="'+vaCy+'" r="2.5" fill="'+FIG_INK+'"/>';
        vaLabel(sl4/2,'1',22);            /* wedge from 0 to sl4 */
        vaLabel((sl4+90)/2,'2',22);       /* wedge from sl4 to 90 — the two always sum to 90 */
      }
      s+='</svg>';
      return s;
    }
    /* ── two parallel lines cut by a transversal ──
       Angles use the standard textbook numbering: 1-4 at the upper
       intersection, 5-8 at the lower, each as upper-left, upper-right,
       lower-left, lower-right. Label positions are computed from the actual
       region BISECTORS rather than fixed offsets, so a label always lands
       inside its own wedge whatever the transversal's slant. */
    else if(fig.type==='transversal'){
      var tAng=fig.angle||72, yA=62, yB=146, mL=22;
      var tdy=yB-yA, tdx=tdy/Math.tan(tAng*Math.PI/180);
      var IA=[W/2-tdx/2, yA], IB=[W/2+tdx/2, yB];
      var tlen=Math.sqrt(tdx*tdx+tdy*tdy), ux=tdx/tlen, uy=tdy/tlen, ext=30;
      /* the two parallel lines */
      [yA,yB].forEach(function(yy){
        s+='<line x1="'+mL+'" y1="'+yy+'" x2="'+(W-mL)+'" y2="'+yy+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        /* matching chevrons = the standard "these are parallel" mark */
        var mx=W-mL-30;
        s+='<polyline points="'+(mx-5)+','+(yy-5)+' '+mx+','+yy+' '+(mx-5)+','+(yy+5)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.6"/>';
      });
      /* the transversal */
      s+='<line x1="'+(IA[0]-ux*ext).toFixed(1)+'" y1="'+(IA[1]-uy*ext).toFixed(1)+'" x2="'+(IB[0]+ux*ext).toFixed(1)+'" y2="'+(IB[1]+uy*ext).toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="2"/>';
      var _bis=function(a,b){var n=[a[0]+b[0],a[1]+b[1]],m=Math.sqrt(n[0]*n[0]+n[1]*n[1])||1;return [n[0]/m,n[1]/m];};
      var L=[-1,0], R=[1,0], U=[-ux,-uy], D=[ux,uy];
      var dirs={UL:_bis(L,U), UR:_bis(U,R), LR:_bis(R,D), LL:_bis(D,L)};
      var slot={1:['UL',IA],2:['UR',IA],3:['LL',IA],4:['LR',IA],
                5:['UL',IB],6:['UR',IB],7:['LL',IB],8:['LR',IB]};
      var lbs=fig.labels||{};
      Object.keys(lbs).forEach(function(k){
        var sl=slot[k]; if(!sl) return;
        var dv=dirs[sl[0]], base=sl[1], rad=fig.lrad||26;
        var hot=(fig.highlight||[]).indexOf(+k)>=0;
        s+='<text x="'+(base[0]+dv[0]*rad).toFixed(1)+'" y="'+(base[1]+dv[1]*rad).toFixed(1)+'" font-size="10" fill="'+(hot?FIG_AMBER_TEXT:FIG_INK)+'" text-anchor="middle" dominant-baseline="middle" font-weight="'+(hot?'700':'400')+'">'+lbs[k]+'</text>';
      });
      s+='</svg>';
      return s;
    }
    else if(fig.type==='circle'){
      /* external-point secant figures need extra room BELOW the circle for the
         external point, so they're anchored high rather than dead-centre. */
      var cx4=W/2,cy4=fig.secant_lines?Math.min(H-40,110):H/2;
      /* when the external point is very far from the circle (large `r`
         multiplier), shrink the circle itself to fit rather than letting the
         point run off the canvas — better a smaller circle than a truncated
         construction. */
      var r=fig.secant_lines?Math.min(Math.min(W,H)/2-30,(H-cy4-24)/(+fig.secant_lines.r)):Math.min(W,H)/2-30;
      /* polar helper: math-convention angles (CCW, 0deg = east) mapped onto the
         SVG's y-down screen space. Because y is flipped, an INCREASING math
         angle sweeps counter-clockwise on screen, which is SVG sweep-flag 0. */
      var _pol=function(a,rad){var t=a*Math.PI/180;return [cx4+(rad===undefined?r:rad)*Math.cos(t), cy4-(rad===undefined?r:rad)*Math.sin(t)];};
      var _span=function(a1,a2){return ((a2-a1)%360+360)%360;};
      /* concentric rings — geometric-probability targets (dartboard, annulus).
         Radii are scaled so the LARGEST maps to the canvas circle, preserving
         their true ratio, which is exactly what the area comparison turns on.
         Drawn largest-first so inner rings layer on top; an inner ring filled
         'base' over an 'amber' one leaves a visible amber annulus between them. */
      if(fig.rings&&fig.rings.length){
        var rmaxR=Math.max.apply(null,fig.rings.map(function(x){return +x.r;}))||1;
        fig.rings.slice().sort(function(a,b){return (+b.r)-(+a.r);}).forEach(function(rg,ri){
          var rr=r*(+rg.r)/rmaxR;
          var fc=rg.fill==='amber'?FIG_AMBER_FILL:(rg.fill==='base'?FIG_INDIGO_FILL:(ri===0?FIG_INDIGO_FILL:'none'));
          s+='<circle cx="'+cx4+'" cy="'+cy4+'" r="'+rr.toFixed(1)+'" fill="'+fc+'" stroke="'+FIG_INDIGO+'" stroke-width="1.7"/>';
          if(rg.label) s+='<text x="'+cx4+'" y="'+(cy4-rr-4).toFixed(1)+'" font-size="10" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+rg.label+'</text>';
        });
      }
      else s+='<circle cx="'+cx4+'" cy="'+cy4+'" r="'+r+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      /* sector wedge (central angle) */
      if(fig.sector){
        var sa=+fig.sector.start_deg||0, sb=(fig.sector.end_deg===undefined?90:+fig.sector.end_deg);
        var sp=_span(sa,sb), pA=_pol(sa), pB=_pol(sb), lg=sp>180?1:0;
        s+='<path d="M'+cx4+','+cy4+' L'+pA[0].toFixed(1)+','+pA[1].toFixed(1)+' A'+r+','+r+' 0 '+lg+' 0 '+pB[0].toFixed(1)+','+pB[1].toFixed(1)+' Z" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="1.6"/>';
        if(fig.sector.label){var lm=_pol(sa+sp/2, r*0.52);s+='<text x="'+lm[0].toFixed(1)+'" y="'+lm[1].toFixed(1)+'" font-size="11" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="600">'+fig.sector.label+'</text>';}
      }
      /* highlighted arc(s) — accepts one {start_deg,end_deg,label} or an array */
      [].concat(fig.arc||[]).forEach(function(ac){
        var aa=+ac.start_deg||0, ab=(ac.end_deg===undefined?90:+ac.end_deg);
        var asp=_span(aa,ab), qA=_pol(aa), qB=_pol(ab), alg=asp>180?1:0;
        s+='<path d="M'+qA[0].toFixed(1)+','+qA[1].toFixed(1)+' A'+r+','+r+' 0 '+alg+' 0 '+qB[0].toFixed(1)+','+qB[1].toFixed(1)+'" fill="none" stroke="'+(ac.color||FIG_AMBER)+'" stroke-width="3.6" stroke-linecap="round"/>';
        if(ac.label){var am=_pol(aa+asp/2, r+14);s+='<text x="'+am[0].toFixed(1)+'" y="'+am[1].toFixed(1)+'" font-size="10" fill="'+(ac.color||FIG_AMBER_TEXT)+'" text-anchor="middle" dominant-baseline="middle">'+ac.label+'</text>';}
      });
      /* chords: [[a1,a2],...] — several chords (e.g. an inscribed angle's two rays) */
      (fig.chords||[]).forEach(function(cd){
        var c1=_pol(+cd[0]),c2=_pol(+cd[1]);
        s+='<line x1="'+c1[0].toFixed(1)+'" y1="'+c1[1].toFixed(1)+'" x2="'+c2[0].toFixed(1)+'" y2="'+c2[1].toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8"/>';
      });
      /* two crossing chords with their four sub-segments labelled — the
         intersecting-chords length relation (AX*XC = BX*XD). Chord AC crosses
         chord BD at their real geometric intersection X; each half is labelled.*/
      if(fig.chord_segs){
        var cs=fig.chord_segs, A=_pol(+cs.c1[0]),C=_pol(+cs.c1[1]),B=_pol(+cs.c2[0]),D=_pol(+cs.c2[1]);
        /* intersection X of segment AC with segment BD */
        var d1x=C[0]-A[0],d1y=C[1]-A[1],d2x=D[0]-B[0],d2y=D[1]-B[1];
        var den=d1x*d2y-d1y*d2x, tX=den?((B[0]-A[0])*d2y-(B[1]-A[1])*d2x)/den:0.5;
        var X=[A[0]+tX*d1x, A[1]+tX*d1y];
        [[A,C],[B,D]].forEach(function(pr){
          s+='<line x1="'+pr[0][0].toFixed(1)+'" y1="'+pr[0][1].toFixed(1)+'" x2="'+pr[1][0].toFixed(1)+'" y2="'+pr[1][1].toFixed(1)+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8"/>';
        });
        s+='<circle cx="'+X[0].toFixed(1)+'" cy="'+X[1].toFixed(1)+'" r="2.5" fill="'+FIG_INK+'"/>';
        var lbl=cs.labels||{};
        [['a',A],['c',C],['b',B],['d',D]].forEach(function(pl){
          if(!lbl[pl[0]])return;
          var m=[(pl[1][0]+X[0])/2,(pl[1][1]+X[1])/2];   /* midpoint of the half-chord */
          var ox=(m[0]-cx4), oy=(m[1]-cy4), ol=Math.sqrt(ox*ox+oy*oy)||1;
          s+='<text x="'+(m[0]+ox/ol*9).toFixed(1)+'" y="'+(m[1]+oy/ol*9+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+lbl[pl[0]]+'</text>';
        });
      }
      /* labelled points ON the circle */
      (fig.points||[]).forEach(function(p){
        var pp=_pol(+p.angle);
        s+='<circle cx="'+pp[0].toFixed(1)+'" cy="'+pp[1].toFixed(1)+'" r="3.4" fill="'+FIG_INK+'"/>';
        if(p.label){var lp=_pol(+p.angle, r+13);s+='<text x="'+lp[0].toFixed(1)+'" y="'+lp[1].toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="middle" font-weight="600">'+p.label+'</text>';}
      });
      /* two secants from a real external point — 'through' gives the exact FAR
         intersection angle of each secant; the NEAR intersection lies on the
         same ray by construction (the point's distance r*rmult and the two
         through-angles come from solving the actual two-secant geometry in
         the enrichment script, not placed independently — that's what makes
         this truthful where the earlier, reverted `secant` type wasn't). */
      if(fig.secant_lines){
        var slx=fig.secant_lines, spR=r*(+slx.r), pAng=270*Math.PI/180;
        var pXY=[cx4+spR*Math.cos(pAng), cy4-spR*Math.sin(pAng)];
        s+='<circle cx="'+pXY[0].toFixed(1)+'" cy="'+pXY[1].toFixed(1)+'" r="3" fill="'+FIG_INK+'"/>';
        if(slx.label)s+='<text x="'+pXY[0].toFixed(1)+'" y="'+(pXY[1]+16).toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+slx.label+'</text>';
        (slx.through||[]).forEach(function(fa){
          var fp=_pol(+fa);
          s+='<line x1="'+pXY[0].toFixed(1)+'" y1="'+pXY[1].toFixed(1)+'" x2="'+fp[0].toFixed(1)+'" y2="'+fp[1].toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6" stroke-dasharray="5,3"/>';
        });
      }
      if(fig.center){s+='<circle cx="'+cx4+'" cy="'+cy4+'" r="3" fill="'+FIG_INDIGO+'"/>';s+='<text x="'+(cx4+7)+'" y="'+(cy4-6)+'" font-size="11" fill="'+FIG_INK+'">'+fig.center+'</text>';}
      if(fig.radius){s+='<line x1="'+cx4+'" y1="'+cy4+'" x2="'+(cx4+r)+'" y2="'+cy4+'" stroke="'+FIG_AMBER+'" stroke-width="1.8" stroke-dasharray="5,3"/>';s+='<text x="'+(cx4+r/2)+'" y="'+(cy4-8)+'" font-size="11" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+fig.radius+'</text>';}
      if(fig.diameter){s+='<line x1="'+(cx4-r)+'" y1="'+cy4+'" x2="'+(cx4+r)+'" y2="'+cy4+'" stroke="'+FIG_INDIGO2+'" stroke-width="1.8" stroke-dasharray="5,3"/>';s+='<text x="'+cx4+'" y="'+(cy4-10)+'" font-size="11" fill="'+FIG_INDIGO2+'" text-anchor="middle">'+fig.diameter+'</text>';}
      if(fig.chord){var ca=fig.chord;s+='<line x1="'+(cx4+r*Math.cos(ca[0]*Math.PI/180))+'" y1="'+(cy4-r*Math.sin(ca[0]*Math.PI/180))+'" x2="'+(cx4+r*Math.cos(ca[1]*Math.PI/180))+'" y2="'+(cy4-r*Math.sin(ca[1]*Math.PI/180))+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';}
      if(fig.label)s+='<text x="'+cx4+'" y="'+(cy4+r+18)+'" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+fig.label+'</text>';
    }
    /* ── bar chart ── */
    else if(fig.type==='bar'){
      var data=fig.data||[],maxv=Math.max.apply(null,data.map(function(d){return d.val||0;}));
      var padL=38,padB=32,padT=12,padR=8,bw=(W-padL-padR)/data.length,barMaxH=H-padT-padB;
      /* y-axis */
      s+='<line x1="'+padL+'" y1="'+padT+'" x2="'+padL+'" y2="'+(H-padB)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      s+='<line x1="'+padL+'" y1="'+(H-padB)+'" x2="'+(W-padR)+'" y2="'+(H-padB)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      /* y grid & labels */
      var ySteps=4;
      for(var ys=0;ys<=ySteps;ys++){var yv=maxv*ys/ySteps,yp=H-padB-(yv/maxv*barMaxH);s+='<line x1="'+(padL-3)+'" y1="'+yp+'" x2="'+(W-padR)+'" y2="'+yp+'" stroke="'+(ys===0?FIG_INK:FIG_GRID)+'" stroke-width="'+(ys===0?'1.5':'0.5')+'"/>';s+='<text x="'+(padL-6)+'" y="'+(yp+3)+'" font-size="8" fill="'+FIG_MUTED+'" text-anchor="end">'+Math.round(yv)+'</text>';}
      data.forEach(function(d,i){
        var bh=(d.val/maxv)*barMaxH,bx=padL+i*bw+bw*0.12,by=H-padB-bh;
        s+='<rect x="'+bx+'" y="'+by+'" width="'+(bw*0.76).toFixed(1)+'" height="'+bh.toFixed(1)+'" fill="'+(d.color||FIG_SERIES[i%FIG_SERIES.length])+'" rx="2" opacity="0.92"/>';
        s+='<text x="'+(padL+(i+0.5)*bw).toFixed(1)+'" y="'+(H-padB+12)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+d.label+'</text>';
        s+='<text x="'+(bx+(bw*0.38)).toFixed(1)+'" y="'+(by-4)+'" font-size="8" fill="'+FIG_INK+'" text-anchor="middle">'+d.val+'</text>';
      });
      if(fig.ylabel)s+='<text x="12" y="'+(H/2)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90 12,'+(H/2)+')">'+fig.ylabel+'</text>';
      if(fig.title)s+='<text x="'+(W/2)+'" y="'+(padT+8)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" font-weight="bold">'+fig.title+'</text>';
    }
    /* ── a grid of dots (marbles/objects in a bag) — `groups` are drawn in
       order so the FIRST `groups[0].n` dots are colored group 0, etc.; this
       is a literal restatement of counts already given in the question text
       (e.g. "18 marbles, 12 red"), not a new computation, so it never
       spoils a probability-from-counts answer. ── */
    else if(fig.type==='dots'){
      var totalD=fig.total||0, groupsD=fig.groups||[];
      var hD=fig.label?H-20:H;
      var colsD=Math.ceil(Math.sqrt(totalD*(W/hD)))||1, rowsD=Math.ceil(totalD/colsD);
      var padD=28, cellW=(W-2*padD)/colsD, cellH=(hD-2*padD)/rowsD, rD=Math.min(cellW,cellH)*0.34;
      if(fig.bag){
        s+='<rect x="'+(padD*0.4)+'" y="'+(padD*0.5)+'" width="'+(W-padD*0.8)+'" height="'+(hD-padD*0.8)+'" rx="16" fill="none" stroke="'+FIG_MUTED+'" stroke-width="1.5" stroke-dasharray="4,3"/>';
      }
      var idxD=0, seqColor=[];
      groupsD.forEach(function(g){for(var k=0;k<g.n;k++)seqColor.push(g.color||FIG_INDIGO2);});
      for(var i=0;i<totalD;i++){
        var col=i%colsD, row=Math.floor(i/colsD);
        var cx=padD+cellW*(col+0.5), cy=padD+cellH*(row+0.5);
        s+='<circle cx="'+cx.toFixed(1)+'" cy="'+cy.toFixed(1)+'" r="'+rD.toFixed(1)+'" fill="'+(seqColor[i]||FIG_GRID)+'" stroke="'+FIG_INK+'" stroke-width="0.8"/>';
      }
      if(fig.label)s+='<text x="'+(W/2)+'" y="'+(H-6)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+fig.label+'</text>';
    }
    /* ── two-circle Venn diagram, GENERIC fixed overlap (not scaled to the
       real P(A and B)) — for independent-event problems where the whole
       point is applying a rule (P(A)*P(B) or P(A)+P(B)-P(A and B)) rather
       than reading an answer off the picture; drawing the true overlap area
       would visually pre-compute the intersection, so like `vertex_angles`
       the fixed shape carries no numeric truth, only the labels do. ── */
    else if(fig.type==='venn'){
      var vcx=W/2, vcy=H/2, vr=Math.min(W,H)*0.28, voff=vr*0.62;
      s+='<circle cx="'+(vcx-voff)+'" cy="'+vcy+'" r="'+vr+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      s+='<circle cx="'+(vcx+voff)+'" cy="'+vcy+'" r="'+vr+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="2"/>';
      s+='<text x="'+(vcx-voff-vr*0.55).toFixed(1)+'" y="'+(vcy-vr*0.55).toFixed(1)+'" font-size="12" font-weight="bold" fill="'+FIG_INDIGO+'" text-anchor="middle">A</text>';
      s+='<text x="'+(vcx+voff+vr*0.55).toFixed(1)+'" y="'+(vcy-vr*0.55).toFixed(1)+'" font-size="12" font-weight="bold" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">B</text>';
      if(fig.textA)s+='<text x="'+(vcx-voff-vr*0.3).toFixed(1)+'" y="'+(vcy+4).toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+fig.textA+'</text>';
      if(fig.textB)s+='<text x="'+(vcx+voff+vr*0.3).toFixed(1)+'" y="'+(vcy+4).toFixed(1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+fig.textB+'</text>';
      if(fig.title)s+='<text x="'+(W/2)+'" y="16" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+fig.title+'</text>';
    }
    /* ── scatter plot ── */
    else if(fig.type==='scatter'){
      var pts6=fig.pts||[],padS=38;
      var xs=pts6.map(function(p){return p[0];}),ys=pts6.map(function(p){return p[1];});
      var xmin=Math.min.apply(null,xs),xmax=Math.max.apply(null,xs),ymin=Math.min.apply(null,ys),ymax=Math.max.apply(null,ys);
      var xpad=(xmax-xmin)*0.1||1,ypad=(ymax-ymin)*0.1||1;
      xmin-=xpad;xmax+=xpad;ymin-=ypad;ymax+=ypad;
      var scx2=(W-2*padS)/(xmax-xmin),scy2=(H-2*padS)/(ymax-ymin);
      s+='<line x1="'+padS+'" y1="'+(H-padS)+'" x2="'+(W-padS)+'" y2="'+(H-padS)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      s+='<line x1="'+padS+'" y1="'+padS+'" x2="'+padS+'" y2="'+(H-padS)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
      pts6.forEach(function(p){var px=(p[0]-xmin)*scx2+padS,py=H-padS-(p[1]-ymin)*scy2;s+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="4" fill="'+(fig.color||FIG_INDIGO2)+'" opacity="0.8"/>';});
      if(fig.line){var lx1=xmin,ly1=fig.line.m*lx1+fig.line.b,lx2=xmax,ly2=fig.line.m*lx2+fig.line.b;var spx1=(lx1-xmin)*scx2+padS,spy1=H-padS-(ly1-ymin)*scy2,spx2=(lx2-xmin)*scx2+padS,spy2=H-padS-(ly2-ymin)*scy2;s+='<line x1="'+spx1+'" y1="'+spy1+'" x2="'+spx2+'" y2="'+spy2+'" stroke="'+FIG_AMBER+'" stroke-width="1.5" stroke-dasharray="5,3"/>';}
      if(fig.xlabel)s+='<text x="'+(W/2)+'" y="'+(H-padS+20)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle">'+fig.xlabel+'</text>';
      if(fig.ylabel)s+='<text x="12" y="'+(H/2)+'" font-size="9" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90 12,'+(H/2)+')">'+fig.ylabel+'</text>';
    }
    /* ── number line ── */
    else if(fig.type==='numberline'){
      var nl=fig.range||[-5,5],padN=30;
      var nlW=W-2*padN,scnl=nlW/(nl[1]-nl[0]);
      var my=H/2;
      s+='<line x1="'+padN+'" y1="'+my+'" x2="'+(W-padN)+'" y2="'+my+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
      /* shaded sub-intervals (favourable region for a length-probability question) */
      (fig.shade||[]).forEach(function(sh){
        var a=padN+(sh[0]-nl[0])*scnl, b=padN+(sh[1]-nl[0])*scnl;
        s+='<line x1="'+a.toFixed(1)+'" y1="'+my+'" x2="'+b.toFixed(1)+'" y2="'+my+'" stroke="'+FIG_AMBER+'" stroke-width="7" stroke-linecap="butt" opacity="0.9"/>';
      });
      for(var ni=Math.ceil(nl[0]);ni<=nl[1];ni++){var npx=padN+(ni-nl[0])*scnl;s+='<line x1="'+npx+'" y1="'+(my-6)+'" x2="'+npx+'" y2="'+(my+6)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';s+='<text x="'+npx+'" y="'+(my+18)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+ni+'</text>';}
      (fig.points||[]).forEach(function(p){var px=padN+(p.x-nl[0])*scnl;s+='<circle cx="'+px+'" cy="'+my+'" r="6" fill="'+(p.open?'#fff':(p.color||FIG_AMBER))+'" stroke="'+(p.color||FIG_AMBER)+'" stroke-width="2"/>';if(p.label)s+='<text x="'+px+'" y="'+(my-14)+'" font-size="10" fill="'+(p.color||FIG_AMBER_TEXT)+'" text-anchor="middle">'+p.label+'</text>';});
      (fig.arrows||[]).forEach(function(a){var ax1=padN+(a.x1-nl[0])*scnl,ax2=padN+(a.x2-nl[0])*scnl;var col=a.color||FIG_INDIGO2;s+='<line x1="'+ax1+'" y1="'+my+'" x2="'+ax2+'" y2="'+my+'" stroke="'+col+'" stroke-width="3" marker-end="url(#nlarr'+a.x2+')"/><defs><marker id="nlarr'+a.x2+'" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="'+col+'"/></marker></defs>';});
    }
    /* ── rectangle / polygon ── */
    else if(fig.type==='rect'||fig.type==='polygon'){
      var verts2=fig.vertices||[[0,0],[fig.w2||4,0],[fig.w2||4,fig.h2||3],[0,fig.h2||3]];
      var padP=30;
      /* if a semicircle is attached, its outward bulge must be included in the
         bbox BEFORE scaling, or it overflows the canvas edge on any side that
         isn't already the polygon's own widest extent (e.g. a wide, short
         rectangle with the semicircle on its narrow end). */
      var bboxSrc=verts2;
      if(fig.semicircle){
        var scI=fig.semicircle.side||0, scN=verts2.length;
        var scA=verts2[scI], scB=verts2[(scI+1)%scN];
        var scDx=scB[0]-scA[0], scDy=scB[1]-scA[1], scLen=Math.sqrt(scDx*scDx+scDy*scDy)||1, scRad=scLen/2;
        var scMx=(scA[0]+scB[0])/2, scMy=(scA[1]+scB[1])/2;
        var scCent=verts2.reduce(function(a,v){return [a[0]+v[0],a[1]+v[1]];},[0,0]);
        scCent=[scCent[0]/scN, scCent[1]/scN];
        var scNx=-scDy/scLen, scNy=scDx/scLen;
        if((scMx+scNx-scCent[0])*scNx+(scMy+scNy-scCent[1])*scNy<0){scNx=-scNx;scNy=-scNy;}
        bboxSrc=verts2.concat([[scMx+scNx*scRad, scMy+scNy*scRad]]);
      }
      var minxP=Math.min.apply(null,bboxSrc.map(function(v){return v[0];})),maxxP=Math.max.apply(null,bboxSrc.map(function(v){return v[0];}));
      var minyP=Math.min.apply(null,bboxSrc.map(function(v){return v[1];})),maxyP=Math.max.apply(null,bboxSrc.map(function(v){return v[1];}));
      var scP=Math.min((W-2*padP)/(maxxP-minxP||1),(H-2*padP)/(maxyP-minyP||1));
      var toSP=function(v){return [(v[0]-minxP)*scP+padP,H-(v[1]-minyP)*scP-padP];};
      var ptsP=verts2.map(function(v){var sv=toSP(v);return sv[0]+','+sv[1];}).join(' ');
      s+='<polygon points="'+ptsP+'" fill="'+FIG_INDIGO_FILL+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      /* an inner region drawn in the SAME data space as the outer polygon, so
         their true area ratio is preserved — the point of a
         "random point lands in the smaller shape" probability question. */
      if(fig.inner&&fig.inner.vertices){
        var ipts=fig.inner.vertices.map(function(v){var sv=toSP(v);return sv[0].toFixed(1)+','+sv[1].toFixed(1);}).join(' ');
        s+='<polygon points="'+ipts+'" fill="'+FIG_AMBER_FILL+'" stroke="'+FIG_AMBER+'" stroke-width="1.7"/>';
        if(fig.inner.label){
          var ic=fig.inner.vertices.reduce(function(a,v){return [a[0]+v[0],a[1]+v[1]];},[0,0]);
          var icm=toSP([ic[0]/fig.inner.vertices.length, ic[1]/fig.inner.vertices.length]);
          s+='<text x="'+icm[0].toFixed(1)+'" y="'+(icm[1]+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+fig.inner.label+'</text>';
        }
      }
      if(fig.labels){fig.labels.forEach(function(lbl,i){var sv=toSP(verts2[i]);s+='<text x="'+(sv[0]+(i%2===0?-14:14))+'" y="'+(sv[1]+(i<2?14:-14))+'" font-size="11" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+lbl+'</text>';});}
      /* per-vertex interior-angle VALUE labels (text only, no arc) — for
         "quadrilateral has three angles X,Y,Z, find the fourth" style
         questions; positioned slightly inward from each vertex toward the
         polygon's centroid so they read as belonging to that corner. */
      if(fig.vertex_angle_labels){
        var vaCenter=verts2.reduce(function(a,v){return [a[0]+v[0],a[1]+v[1]];},[0,0]).map(function(c){return c/verts2.length;});
        var vaCenterS=toSP(vaCenter);
        fig.vertex_angle_labels.forEach(function(lbl,i){
          if(!lbl)return;
          var sv=toSP(verts2[i]);
          var dx=vaCenterS[0]-sv[0], dy=vaCenterS[1]-sv[1], dl=Math.hypot(dx,dy)||1;
          s+='<text x="'+(sv[0]+dx/dl*20).toFixed(1)+'" y="'+(sv[1]+dy/dl*20+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+lbl+'</text>';
        });
      }
      if(fig.sides){var vl=verts2.length;fig.sides.forEach(function(side,i){if(!side)return;var a=toSP(verts2[i]),b=toSP(verts2[(i+1)%vl]);var mx=(a[0]+b[0])/2,my2=(a[1]+b[1])/2;var dx=b[0]-a[0],dy=b[1]-a[1],len=Math.sqrt(dx*dx+dy*dy)||1;var nx=-dy/len*14,ny=dx/len*14;s+='<text x="'+(mx+nx).toFixed(1)+'" y="'+(my2+ny+3).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+side+'</text>';});}
      /* a semicircle attached to one side (diameter = that side's real length,
         since it shares the SAME uniform toSP() scale as the polygon — this is
         what lets a composite-area figure (rectangle + semicircle) stay
         proportionally truthful rather than an arbitrary decorative bump). */
      if(fig.semicircle){
        var scSide=fig.semicircle.side||0, vlS=verts2.length;
        var aS=toSP(verts2[scSide]), bS=toSP(verts2[(scSide+1)%vlS]);
        var dxS=bS[0]-aS[0], dyS=bS[1]-aS[1], dlenS=Math.hypot(dxS,dyS)||1, radS=dlenS/2;
        var midxS=(aS[0]+bS[0])/2, midyS=(aS[1]+bS[1])/2;
        var centS=verts2.reduce(function(acc,v){var sv=toSP(v);return [acc[0]+sv[0],acc[1]+sv[1]];},[0,0]);
        centS=[centS[0]/vlS, centS[1]/vlS];
        var nxS=-dyS/dlenS, nyS=dxS/dlenS;
        if((midxS+nxS-centS[0])*nxS+(midyS+nyS-centS[1])*nyS<0){nxS=-nxS;nyS=-nyS;}
        var sweepS=(dxS*nyS-dyS*nxS)>0?0:1;
        s+='<path d="M'+aS[0].toFixed(1)+','+aS[1].toFixed(1)+' A'+radS.toFixed(1)+','+radS.toFixed(1)+' 0 0,'+sweepS+' '+bS[0].toFixed(1)+','+bS[1].toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
        if(fig.semicircle.label){
          var lxS=midxS+nxS*radS*0.55, lyS=midyS+nyS*radS*0.55;
          s+='<text x="'+lxS.toFixed(1)+'" y="'+(lyS+3).toFixed(1)+'" font-size="9" fill="'+FIG_INDIGO+'" text-anchor="middle">'+fig.semicircle.label+'</text>';
        }
      }
      /* Interior dimension lines in DATA coords (unlike `aux`, which is raw screen
         space and so can't follow an auto-scaled polygon). This is what lets a
         trapezoid/triangle show its height, or a regular n-gon its apothem —
         quantities that are given in the question but are not edges of the shape,
         so without this the figure would silently omit half the given data. */
      (fig.dlines||[]).forEach(function(dl){
        var a=toSP(dl.from),b=toSP(dl.to);
        s+='<line x1="'+a[0].toFixed(1)+'" y1="'+a[1].toFixed(1)+'" x2="'+b[0].toFixed(1)+'" y2="'+b[1].toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.4" stroke-dasharray="5,3"/>';
        if(dl.right){ /* right-angle tick where the dimension line meets the base */
          var ux=(a[0]-b[0]),uy=(a[1]-b[1]),ul=Math.sqrt(ux*ux+uy*uy)||1;ux/=ul;uy/=ul;
          var px=-uy,py=ux,sz=7;
          s+='<polyline points="'+(b[0]+px*sz).toFixed(1)+','+(b[1]+py*sz).toFixed(1)+' '+(b[0]+px*sz+ux*sz).toFixed(1)+','+(b[1]+py*sz+uy*sz).toFixed(1)+' '+(b[0]+ux*sz).toFixed(1)+','+(b[1]+uy*sz).toFixed(1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1"/>';
        }
        if(dl.label){var lx=(a[0]+b[0])/2,ly=(a[1]+b[1])/2;s+='<text x="'+(lx+(dl.dx==null?6:dl.dx)).toFixed(1)+'" y="'+(ly+(dl.dy==null?-3:dl.dy)).toFixed(1)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="start">'+dl.label+'</text>';}
      });
    }
    /* auxiliary dashed lines (drawn on top of everything) */
    (fig.aux||[]).forEach(function(ln){
      s+='<line x1="'+ln.x1+'" y1="'+ln.y1+'" x2="'+ln.x2+'" y2="'+ln.y2+'" stroke="'+(ln.color||FIG_MUTED)+'" stroke-width="'+(ln.w||1.2)+'" stroke-dasharray="'+(ln.dash||'5,3')+'"/>';
      if(ln.label){var mx=(+ln.x1+(+ln.x2))/2,myl=(+ln.y1+(+ln.y2))/2;s+='<text x="'+(mx+(ln.dx||0))+'" y="'+(myl+(ln.dy||-8))+'" font-size="9" fill="'+(ln.color||FIG_MUTED)+'" text-anchor="middle">'+ln.label+'</text>';}
    });
    s+='</svg>';
    return s;
    }catch(e){console.warn('_renderFig:',e);return '';}
  };
})();

(function(){
'use strict';

function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ── SVG Figure Renderer ────────────────────────────────────────── */
function evalFn(expr,x){
  try{
    var e=expr.replace(/\*\*/g,'___POW___');
    e=e.replace(/sin\(/g,'Math.sin(').replace(/cos\(/g,'Math.cos(').replace(/tan\(/g,'Math.tan(')
      .replace(/sqrt\(/g,'Math.sqrt(').replace(/abs\(/g,'Math.abs(').replace(/ln\(/g,'Math.log(')
      .replace(/log10\(/g,'Math.log10(').replace(/log\(/g,'Math.log10(').replace(/exp\(/g,'Math.exp(')
      .replace(/pi/g,'Math.PI').replace(/e(?![0-9a-zA-Z_])/g,'Math.E')
      .replace(/___POW___/g,'**');
    /* eslint-disable no-new-func */
    return (new Function('x','return ('+e+')'))(x);
  }catch(err){return NaN;}
}

function renderMathFigure(spec){
  if(!spec||!spec.type) return '';
  switch(spec.type){
    case 'function_graph': return renderFnGraph(spec);
    case 'geometry_2d':    return renderGeom2D(spec);
    case 'geometry_3d':    return renderGeom3D(spec);
    case 'bar_chart':      return renderBarChart(spec);
    case 'scatter':        return renderScatter(spec);
    case 'pie':            return renderPie(spec);
    case 'number_line':    return renderNumberLine(spec);
    default: return '';
  }
}
window.renderMathFigure = renderMathFigure; // expose to _renderFig, which lives in a separate scope

/* ── Function Graph ─────────────────────────────────── */
function renderFnGraph(s){
  var W=320,H=230,ml=42,mr=20,mt=18,mb=32;
  var pw=W-ml-mr,ph=H-mt-mb;
  var xmin=s.xmin!=null?s.xmin:-5, xmax=s.xmax!=null?s.xmax:5;
  var ymin=s.ymin!=null?s.ymin:-4, ymax=s.ymax!=null?s.ymax:6;
  function sx(mx){return ml+(mx-xmin)/(xmax-xmin)*pw;}
  function sy(my){return mt+ph-(my-ymin)/(ymax-ymin)*ph;}
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Grid
  var xi,yi;
  for(xi=Math.ceil(xmin);xi<=Math.floor(xmax);xi++){
    svg+='<line x1="'+sx(xi).toFixed(1)+'" y1="'+mt+'" x2="'+sx(xi).toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
  }
  for(yi=Math.ceil(ymin);yi<=Math.floor(ymax);yi++){
    svg+='<line x1="'+ml+'" y1="'+sy(yi).toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+sy(yi).toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
  }
  // Axes
  var ax0=Math.max(ml,Math.min(ml+pw,sx(0)));
  var ay0=Math.max(mt,Math.min(mt+ph,sy(0)));
  svg+='<line x1="'+ml+'" y1="'+ay0.toFixed(1)+'" x2="'+(ml+pw+8)+'" y2="'+ay0.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  svg+='<polygon points="'+(ml+pw+8)+','+ay0+' '+(ml+pw+2)+','+(ay0-3)+' '+(ml+pw+2)+','+(ay0+3)+'" fill="'+FIG_INK+'"/>';
  svg+='<line x1="'+ax0.toFixed(1)+'" y1="'+(mt+ph+8)+'" x2="'+ax0.toFixed(1)+'" y2="'+(mt-8)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  svg+='<polygon points="'+ax0+','+(mt-8)+' '+(ax0-3)+','+(mt-2)+' '+(ax0+3)+','+(mt-2)+'" fill="'+FIG_INK+'"/>';
  // Axis labels
  svg+='<text x="'+(ml+pw+10)+'" y="'+(ay0+4)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic">x</text>';
  svg+='<text x="'+(ax0+6)+'" y="'+(mt-10)+'" font-size="11" fill="'+FIG_INK+'" font-style="italic">y</text>';
  // Ticks
  for(xi=Math.ceil(xmin);xi<=Math.floor(xmax);xi++){
    if(xi===0) continue;
    var txs=sx(xi);
    svg+='<line x1="'+txs.toFixed(1)+'" y1="'+(ay0-3)+'" x2="'+txs.toFixed(1)+'" y2="'+(ay0+3)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    if(Math.abs(xi)<=10) svg+='<text x="'+txs.toFixed(1)+'" y="'+(ay0+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+xi+'</text>';
  }
  for(yi=Math.ceil(ymin);yi<=Math.floor(ymax);yi++){
    if(yi===0) continue;
    var tys=sy(yi);
    svg+='<line x1="'+(ax0-3)+'" y1="'+tys.toFixed(1)+'" x2="'+(ax0+3)+'" y2="'+tys.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    if(Math.abs(yi)<=10) svg+='<text x="'+(ax0-6)+'" y="'+(tys+3.5)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+yi+'</text>';
  }
  // Shade region
  if(s.shade){
    var sh=s.shade, a_=sh.a!=null?sh.a:xmin, b_=sh.b!=null?sh.b:xmax;
    var shPts=[],N=200;
    for(var si=0;si<=N;si++){
      var sx_=a_+(b_-a_)*si/N;
      var sy1=sh.from==='fn0'&&s.fns&&s.fns[0]?evalFn(s.fns[0],sx_):0;
      var sy2=sh.to==='fn1'&&s.fns&&s.fns[1]?evalFn(s.fns[1],sx_):(sh.to==='x_axis'?0:0);
      shPts.push([sx(sx_),sy(sy1),sy(sy2)]);
    }
    var shd='M'+shPts[0][0].toFixed(1)+','+shPts[0][2].toFixed(1);
    shd+=shPts.map(function(p){return 'L'+p[0].toFixed(1)+','+p[1].toFixed(1);}).join('');
    shd+=shPts.slice().reverse().map(function(p){return 'L'+p[0].toFixed(1)+','+p[2].toFixed(1);}).join('');
    shd+='Z';
    svg+='<path d="'+shd+'" fill="'+FIG_AMBER_FILL+'" stroke="none"/>';
  }
  // Functions
  var colors=FIG_SERIES;
  (s.fns||[]).forEach(function(fnStr,fi){
    var col=colors[fi%colors.length];
    var seg=[],N=400;
    for(var i=0;i<=N;i++){
      var mx=xmin+(xmax-xmin)*i/N;
      var my=evalFn(fnStr,mx);
      var inRange=isFinite(my)&&my>=ymin-(ymax-ymin)&&my<=ymax+(ymax-ymin);
      if(inRange){seg.push([sx(mx),sy(my)]);}
      else{
        if(seg.length>1){
          svg+='<path d="'+seg.map(function(p,k){return (k===0?'M':'L')+p[0].toFixed(1)+','+p[1].toFixed(1);}).join('')+'" fill="none" stroke="'+col+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
        }
        seg=[];
      }
    }
    if(seg.length>1){
      svg+='<path d="'+seg.map(function(p,k){return (k===0?'M':'L')+p[0].toFixed(1)+','+p[1].toFixed(1);}).join('')+'" fill="none" stroke="'+col+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
    }
  });
  // Key points
  (s.points||[]).forEach(function(pt){
    var px=sx(pt.x||0),py=sy(pt.y!=null?pt.y:0);
    svg+='<circle cx="'+px.toFixed(1)+'" cy="'+py.toFixed(1)+'" r="4" fill="'+FIG_AMBER+'" stroke="#fff" stroke-width="1.5"/>';
    if(pt.label) svg+='<text x="'+(px+7)+'" y="'+(py-5)+'" font-size="9.5" fill="'+FIG_INK+'">'+esc(pt.label)+'</text>';
  });
  // Legend
  var labs=s.labels||[];
  if(labs.length){
    var legX=W-8,legY=mt+6;
    labs.forEach(function(lb,li){
      var col=colors[li%colors.length];
      svg+='<rect x="'+(legX-70)+'" y="'+(legY+li*16-6)+'" width="60" height="15" fill="white" fill-opacity="0.85" rx="3"/>';
      svg+='<line x1="'+(legX-68)+'" y1="'+(legY+li*16)+'" x2="'+(legX-55)+'" y2="'+(legY+li*16)+'" stroke="'+col+'" stroke-width="2"/>';
      svg+='<text x="'+(legX-52)+'" y="'+(legY+li*16+4)+'" font-size="8.5" fill="'+FIG_INK+'">'+esc(lb)+'</text>';
    });
  }
  svg+='</svg>';
  return svg;
}

/* ── 2D Geometry ───────────────────────────────────────── */
function renderGeom2D(s){
  var W=300,H=230,mg=38;
  var shapes=s.shapes||[];
  // Collect all points for auto-scaling
  var allx=[],ally=[];
  shapes.forEach(function(sh){
    (sh.pts||[]).forEach(function(p){allx.push(p[0]);ally.push(p[1]);});
    if(sh.cx!=null){allx.push(sh.cx-sh.r,sh.cx+sh.r);ally.push(sh.cy-sh.r,sh.cy+sh.r);}
  });
  if(!allx.length){allx=[0,4];ally=[0,3];}
  var mxmin=Math.min.apply(null,allx),mxmax=Math.max.apply(null,allx);
  var mymin=Math.min.apply(null,ally),mymax=Math.max.apply(null,ally);
  var dx=mxmax-mxmin||1,dy=mymax-mymin||1;
  mxmin-=dx*0.18;mxmax+=dx*0.18;mymin-=dy*0.18;mymax+=dy*0.18;
  function sx(mx){return mg+(mx-mxmin)/(mxmax-mxmin)*(W-2*mg);}
  function sy(my){return (H-mg)-(my-mymin)/(mymax-mymin)*(H-2*mg);}
  function norm2(v){var l=Math.sqrt(v[0]*v[0]+v[1]*v[1])||1;return [v[0]/l,v[1]/l];}

  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  shapes.forEach(function(sh){
    // POLYGON / TRIANGLE
    if(sh.shape==='triangle'||sh.shape==='polygon'){
      var pts=sh.pts.map(function(p){return [sx(p[0]),sy(p[1])];});
      var pstr=pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ');
      svg+='<polygon points="'+pstr+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2" stroke-linejoin="round"/>';
      // Right angle mark
      if(sh.right_angle!=null){
        var ri=sh.right_angle%pts.length;
        var rp=pts[ri];
        var p1=pts[(ri+1)%pts.length];
        var p2=pts[(ri+pts.length-1)%pts.length];
        var d1=norm2([p1[0]-rp[0],p1[1]-rp[1]]);
        var d2=norm2([p2[0]-rp[0],p2[1]-rp[1]]);
        var s2=12;
        var q1=[rp[0]+d1[0]*s2,rp[1]+d1[1]*s2];
        var q2=[rp[0]+d1[0]*s2+d2[0]*s2,rp[1]+d1[1]*s2+d2[1]*s2];
        var q3=[rp[0]+d2[0]*s2,rp[1]+d2[1]*s2];
        svg+='<path d="M'+q1[0].toFixed(1)+','+q1[1].toFixed(1)+' L'+q2[0].toFixed(1)+','+q2[1].toFixed(1)+' L'+q3[0].toFixed(1)+','+q3[1].toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
      }
      // Angle arcs (non-right angles)
      if(sh.angle_marks){
        sh.angle_marks.forEach(function(ai){
          var ap=pts[ai%pts.length];
          var pp=pts[(ai+pts.length-1)%pts.length];
          var np=pts[(ai+1)%pts.length];
          var d3=norm2([pp[0]-ap[0],pp[1]-ap[1]]);
          var d4=norm2([np[0]-ap[0],np[1]-ap[1]]);
          var r3=14;
          var x1=ap[0]+d3[0]*r3,y1=ap[1]+d3[1]*r3;
          var x2=ap[0]+d4[0]*r3,y2=ap[1]+d4[1]*r3;
          svg+='<path d="M'+x1.toFixed(1)+','+y1.toFixed(1)+' Q'+ap[0]+','+ap[1]+' '+x2.toFixed(1)+','+y2.toFixed(1)+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.4"/>';
        });
      }
      // Side tick marks (equal sides)
      if(sh.equal_sides){
        sh.equal_sides.forEach(function(pair){
          [pair].flat().forEach(function(si){
            var i0=si%pts.length, i1=(si+1)%pts.length;
            var mx=(pts[i0][0]+pts[i1][0])/2,my=(pts[i0][1]+pts[i1][1])/2;
            var ang=Math.atan2(pts[i1][1]-pts[i0][1],pts[i1][0]-pts[i0][0]);
            var perp=ang+Math.PI/2;
            var t=5;
            svg+='<line x1="'+(mx+Math.cos(perp)*t).toFixed(1)+'" y1="'+(my+Math.sin(perp)*t).toFixed(1)+'" x2="'+(mx-Math.cos(perp)*t).toFixed(1)+'" y2="'+(my-Math.sin(perp)*t).toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4"/>';
          });
        });
      }
      // Side labels
      var sides=sh.sides||[];
      sides.forEach(function(lbl,si){
        if(!lbl) return;
        var i0=si%pts.length, i1=(si+1)%pts.length;
        var mx=(pts[i0][0]+pts[i1][0])/2,my2=(pts[i0][1]+pts[i1][1])/2;
        var dx2=pts[i1][0]-pts[i0][0],dy2=pts[i1][1]-pts[i0][1];
        var len=Math.sqrt(dx2*dx2+dy2*dy2)||1;
        var off=14;
        var lx=mx+(-dy2/len)*off, ly=my2+(dx2/len)*off;
        svg+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="11.5" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle" dominant-baseline="middle" font-weight="700">'+esc(lbl)+'</text>';
      });
      // Vertex labels
      var labels=sh.labels||[];
      var cx3=pts.reduce(function(a,p){return a+p[0];},0)/pts.length;
      var cy3=pts.reduce(function(a,p){return a+p[1];},0)/pts.length;
      labels.forEach(function(lbl,li){
        if(li>=pts.length||!lbl) return;
        var lx=pts[li][0],ly=pts[li][1];
        var ox=lx-cx3,oy=ly-cy3,ol=Math.sqrt(ox*ox+oy*oy)||1;
        lx+=ox/ol*16; ly+=oy/ol*16;
        svg+='<text x="'+lx.toFixed(1)+'" y="'+ly.toFixed(1)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="middle" font-weight="700">'+esc(lbl)+'</text>';
      });
    }
    // CIRCLE
    if(sh.shape==='circle'){
      var cxp=sx(sh.cx||0),cyp=sy(sh.cy||0);
      var rp=(sh.r||1)/(mxmax-mxmin)*(W-2*mg);
      svg+='<circle cx="'+cxp.toFixed(1)+'" cy="'+cyp.toFixed(1)+'" r="'+rp.toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      svg+='<circle cx="'+cxp.toFixed(1)+'" cy="'+cyp.toFixed(1)+'" r="3" fill="'+FIG_INK+'"/>';
      if(sh.center_label) svg+='<text x="'+(cxp+6)+'" y="'+(cyp-6)+'" font-size="11.5" fill="'+FIG_INK+'" font-weight="700">'+esc(sh.center_label)+'</text>';
      if(sh.radius_angle!=null){
        var ra=sh.radius_angle*Math.PI/180;
        var rx=cxp+rp*Math.cos(ra),ry=cyp-rp*Math.sin(ra);
        svg+='<line x1="'+cxp.toFixed(1)+'" y1="'+cyp.toFixed(1)+'" x2="'+rx.toFixed(1)+'" y2="'+ry.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.6" stroke-dasharray="5 3"/>';
        if(sh.radius_label){
          var mlx=(cxp+rx)/2+8,mly=(cyp+ry)/2;
          svg+='<text x="'+mlx.toFixed(1)+'" y="'+mly.toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(sh.radius_label)+'</text>';
        }
      }
      if(sh.chord&&sh.chord.length===2){
        svg+='<line x1="'+sx(sh.chord[0][0]).toFixed(1)+'" y1="'+sy(sh.chord[0][1]).toFixed(1)+'" x2="'+sx(sh.chord[1][0]).toFixed(1)+'" y2="'+sy(sh.chord[1][1]).toFixed(1)+'" stroke="'+FIG_TEAL+'" stroke-width="1.8"/>';
      }
      if(sh.tangent){
        var ta=sh.tangent*Math.PI/180;
        var tx=cxp+rp*Math.cos(ta),ty=cyp-rp*Math.sin(ta);
        var tpx=-Math.sin(ta)*25,tpy=-Math.cos(ta)*25;
        svg+='<line x1="'+(tx-tpx).toFixed(1)+'" y1="'+(ty-tpy).toFixed(1)+'" x2="'+(tx+tpx).toFixed(1)+'" y2="'+(ty+tpy).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.8"/>';
      }
    }
    // RECTANGLE
    if(sh.shape==='rectangle'){
      var rx2=sx(sh.x||0),ry2=sy((sh.y||0)+(sh.h||0));
      var rw=(sh.w||4)/(mxmax-mxmin)*(W-2*mg);
      var rh=(sh.h||3)/(mymax-mymin)*(H-2*mg);
      svg+='<rect x="'+rx2.toFixed(1)+'" y="'+ry2.toFixed(1)+'" width="'+rw.toFixed(1)+'" height="'+rh.toFixed(1)+'" fill="'+FIG_INDIGO_FILL2+'" stroke="'+FIG_INDIGO+'" stroke-width="2"/>';
      // dimension labels
      if(sh.width_label){var wlx=rx2+rw/2,wly=ry2+rh+14;svg+='<text x="'+wlx+'" y="'+wly+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(sh.width_label)+'</text>';}
      if(sh.height_label){var hlx=rx2+rw+12,hly=ry2+rh/2;svg+='<text x="'+hlx+'" y="'+hly+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" dominant-baseline="middle" font-weight="600">'+esc(sh.height_label)+'</text>';}
    }
  });

  if(s.title) svg+='<text x="'+W/2+'" y="12" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  svg+='</svg>';
  return svg;
}

/* ── 3D Geometry (isometric projection) ─────────────── */
function renderGeom3D(s){
  var W=300,H=220,cx=W/2,cy=H*0.55;
  var solid=s.solid||'rectangular_prism';
  var dims=s.dims||[4,3,2];
  var lw=dims[0]||4, dw=dims[1]||3, ht=dims[2]||2;
  var sc=Math.min(50,Math.min(W/(lw+dw+2),H/(ht+dw+2))*0.9);
  function iso(ix,iy,iz){
    return{x:cx+(ix-iz)*sc*0.866,y:cy-iy*sc+(ix+iz)*sc*0.5};
  }
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';

  function pt(ix,iy,iz){var p=iso(ix,iy,iz);return p.x.toFixed(1)+','+p.y.toFixed(1);}
  function line3(x1,y1,z1,x2,y2,z2,col,dash){
    var a=iso(x1,y1,z1),b=iso(x2,y2,z2);
    return '<line x1="'+a.x.toFixed(1)+'" y1="'+a.y.toFixed(1)+'" x2="'+b.x.toFixed(1)+'" y2="'+b.y.toFixed(1)+'" stroke="'+(col||FIG_INK)+'" stroke-width="1.8"'+(dash?' stroke-dasharray="5 3"':'')+'/>';
  }
  function face(pts4, fill){
    return '<polygon points="'+pts4.join(' ')+'" fill="'+fill+'" stroke="'+FIG_INDIGO+'" stroke-width="1.5" stroke-linejoin="round"/>';
  }
  /* three-tone face shading (front/right/top), consistent across every solid so the same
     light source reads correctly no matter which shape is drawn */
  var FACE_FRONT=FIG_INDIGO_FILL2, FACE_SIDE='rgba(43,91,168,0.28)', FACE_TOP='rgba(43,91,168,0.10)';

  if(solid==='rectangular_prism'||solid==='cube'){
    var l=lw,w=dw,h=ht;
    // Hidden edges (dashed)
    svg+=line3(0,0,0,l,0,0,FIG_INK,true);
    svg+=line3(0,0,0,0,0,w,FIG_INK,true);
    svg+=line3(0,0,0,0,h,0,FIG_INK,true);
    // Front face (left face in isometric)
    svg+=face([pt(0,0,w),pt(0,h,w),pt(l,h,w),pt(l,0,w)],FACE_FRONT);
    // Right face
    svg+=face([pt(l,0,w),pt(l,h,w),pt(l,h,0),pt(l,0,0)],FACE_SIDE);
    // Top face
    svg+=face([pt(0,h,0),pt(0,h,w),pt(l,h,w),pt(l,h,0)],FACE_TOP);
    // Dimension labels
    var lbs=s.labels||{};
    if(lbs.l){var ml2=iso(l/2,0,w+0.3);svg+='<text x="'+ml2.x.toFixed(1)+'" y="'+(ml2.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs.l)+'</text>';}
    if(lbs.w){var mw2=iso(l+0.3,0,w/2);svg+='<text x="'+(mw2.x+5)+'" y="'+(mw2.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs.w)+'</text>';}
    if(lbs.h){var mh2=iso(l+0.3,h/2,0);svg+='<text x="'+(mh2.x+5)+'" y="'+(mh2.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs.h)+'</text>';}
  }

  /* Cylinder and cone are drawn upright (not isometric), to scale: radius and height keep the
     question's proportions, the base's hidden back half is dashed, and labels sit clear of the
     outline — a radius line on the top face, a height dimension line with end ticks. */
  function upright(rad,hgt){
    var k=Math.min(80/rad,150/hgt), rx=Math.max(28,rad*k), hp=Math.max(40,hgt*k), ry=Math.max(10,rx*0.28);
    var top=(H-hp)/2+ry/2, x0=W/2-22;
    return {cx:x0,top:top,bot:top+hp,rx:rx,ry:ry};
  }
  function arc(f,y,sweep){ return 'M'+(f.cx-f.rx).toFixed(1)+','+y.toFixed(1)+' A'+f.rx.toFixed(1)+' '+f.ry.toFixed(1)+' 0 0 '+sweep+' '+(f.cx+f.rx).toFixed(1)+','+y.toFixed(1); }
  function lbl(x,y,t,anchor){ return '<text x="'+x.toFixed(1)+'" y="'+y.toFixed(1)+'" font-size="12" fill="'+FIG_INDIGO+'" text-anchor="'+(anchor||'middle')+'" dominant-baseline="middle" font-weight="600">'+esc(t)+'</text>'; }
  function dimLine(x,y1,y2,t){
    return '<line x1="'+x.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.3"/>'+
      '<line x1="'+(x-4).toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+(x+4).toFixed(1)+'" y2="'+y1.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.3"/>'+
      '<line x1="'+(x-4).toFixed(1)+'" y1="'+y2.toFixed(1)+'" x2="'+(x+4).toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.3"/>'+
      (t?lbl(x+8,(y1+y2)/2,t,'start'):'');
  }
  function radiusLine(f,y,t,above){
    return '<circle cx="'+f.cx.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="2" fill="'+FIG_INDIGO+'"/>'+
      '<line x1="'+f.cx.toFixed(1)+'" y1="'+y.toFixed(1)+'" x2="'+(f.cx+f.rx).toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4" stroke-dasharray="4 2"/>'+
      (t?lbl(f.cx+f.rx/2,above?(f.ry>=16?y-7:y-f.ry-8):(y+f.ry+12),t):'');
  }
  var L3=s.labels||{};

  if(solid==='cylinder'){
    var cr=+s.radius||lw/2, ch=+s.height||ht, f=upright(cr,ch);
    svg+='<path d="M'+(f.cx-f.rx).toFixed(1)+','+f.top.toFixed(1)+' L'+(f.cx-f.rx).toFixed(1)+','+f.bot.toFixed(1)+' '+arc(f,f.bot,0).replace(/^M[^A]*/,'')+' L'+(f.cx+f.rx).toFixed(1)+','+f.top.toFixed(1)+' Z" fill="'+FACE_SIDE+'" stroke="none"/>';
    svg+='<path d="'+arc(f,f.bot,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
    svg+='<path d="'+arc(f,f.bot,0)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(f.cx-f.rx).toFixed(1)+'" y1="'+f.top.toFixed(1)+'" x2="'+(f.cx-f.rx).toFixed(1)+'" y2="'+f.bot.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(f.cx+f.rx).toFixed(1)+'" y1="'+f.top.toFixed(1)+'" x2="'+(f.cx+f.rx).toFixed(1)+'" y2="'+f.bot.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<ellipse cx="'+f.cx.toFixed(1)+'" cy="'+f.top.toFixed(1)+'" rx="'+f.rx.toFixed(1)+'" ry="'+f.ry.toFixed(1)+'" fill="#eef2fa" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    if(L3.r) svg+=radiusLine(f,f.top,L3.r,true);
    else if(L3.d) svg+='<line x1="'+(f.cx-f.rx).toFixed(1)+'" y1="'+f.top.toFixed(1)+'" x2="'+(f.cx+f.rx).toFixed(1)+'" y2="'+f.top.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.4" stroke-dasharray="4 2"/>'+lbl(f.cx,f.top-f.ry-8,L3.d);
    if(L3.h) svg+=dimLine(f.cx+f.rx+14,f.top,f.bot,L3.h);
  }

  if(solid==='cone'){
    var kr=+s.radius||lw/2, kh=+s.height||ht, g=upright(kr,kh);
    svg+='<path d="M'+(g.cx-g.rx).toFixed(1)+','+g.bot.toFixed(1)+' L'+g.cx.toFixed(1)+','+g.top.toFixed(1)+' L'+(g.cx+g.rx).toFixed(1)+','+g.bot.toFixed(1)+' A'+g.rx.toFixed(1)+' '+g.ry.toFixed(1)+' 0 0 1 '+(g.cx-g.rx).toFixed(1)+','+g.bot.toFixed(1)+' Z" fill="'+FACE_FRONT+'" stroke="none"/>';
    svg+='<path d="'+arc(g,g.bot,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 3"/>';
    svg+='<path d="'+arc(g,g.bot,0)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(g.cx-g.rx).toFixed(1)+'" y1="'+g.bot.toFixed(1)+'" x2="'+g.cx.toFixed(1)+'" y2="'+g.top.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<line x1="'+(g.cx+g.rx).toFixed(1)+'" y1="'+g.bot.toFixed(1)+'" x2="'+g.cx.toFixed(1)+'" y2="'+g.top.toFixed(1)+'" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    if(L3.r) svg+=radiusLine(g,g.bot,'',false)+lbl(g.cx+g.rx+8,g.bot,L3.r,'start');
    if(L3.h){
      svg+='<line x1="'+g.cx.toFixed(1)+'" y1="'+g.top.toFixed(1)+'" x2="'+g.cx.toFixed(1)+'" y2="'+g.bot.toFixed(1)+'" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 2"/>';
      svg+='<polyline points="'+g.cx.toFixed(1)+','+(g.bot-7).toFixed(1)+' '+(g.cx-7).toFixed(1)+','+(g.bot-7).toFixed(1)+' '+(g.cx-7).toFixed(1)+','+g.bot.toFixed(1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1"/>';
      svg+=lbl(g.cx-8,(g.top+g.bot)/2,L3.h,'end');
    }
    if(L3.l) svg+=lbl(g.cx+g.rx/2+10,(g.top+g.bot)/2,L3.l,'start');
  }

  if(solid==='square_pyramid'){
    /* Honors dims[1] as the base depth, so a rectangular base (e.g. a 2x12
       pyramid) draws truthfully instead of silently squaring off and
       contradicting its own "2 x 12" label. dims[0]===dims[1] still gives the
       square pyramid the name implies. */
    var l4=lw,d4=dw,h4=ht;
    var apex4=iso(l4/2,h4,d4/2);
    var bases=[[0,0,0],[l4,0,0],[l4,0,d4],[0,0,d4]];
    var faceColors=[FACE_FRONT,FACE_SIDE,FACE_FRONT,FACE_SIDE];
    for(var fi=0;fi<4;fi++){
      var b1=bases[fi],b2=bases[(fi+1)%4];
      svg+=face([pt(b1[0],b1[1],b1[2]),pt(b2[0],b2[1],b2[2]),apex4.x.toFixed(1)+','+apex4.y.toFixed(1)],faceColors[fi]);
    }
    var lbs4=s.labels||{};
    if(lbs4.base){var mb=iso(l4/2,0,d4+0.5);svg+='<text x="'+mb.x+'" y="'+(mb.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs4.base)+'</text>';}
    if(lbs4.h){svg+='<line x1="'+iso(l4/2,0,d4/2).x+'" y1="'+iso(l4/2,0,d4/2).y+'" x2="'+apex4.x+'" y2="'+apex4.y+'" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="4 2"/><text x="'+(apex4.x+12)+'" y="'+(apex4.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(lbs4.h)+'</text>';}
  }

  if(solid==='triangular_prism'){
    // base triangle in the x-z plane, extruded along y (height ht)
    var l6=lw,d6=dw,h6=ht;
    var baseTri=[[0,0,0],[l6,0,0],[l6/2,0,d6]];
    var topTri=baseTri.map(function(p){return [p[0],h6,p[2]];});
    // hidden bottom edges (dashed)
    svg+=line3(baseTri[0][0],0,baseTri[0][2],baseTri[1][0],0,baseTri[1][2],FIG_INK,true);
    svg+=line3(baseTri[1][0],0,baseTri[1][2],baseTri[2][0],0,baseTri[2][2],FIG_INK,true);
    svg+=line3(baseTri[2][0],0,baseTri[2][2],baseTri[0][0],0,baseTri[0][2],FIG_INK,true);
    // two visible rectangular side faces + one visible triangular end face
    svg+=face([pt(baseTri[0][0],0,baseTri[0][2]),pt(baseTri[1][0],0,baseTri[1][2]),pt(topTri[1][0],h6,topTri[1][2]),pt(topTri[0][0],h6,topTri[0][2])],FACE_FRONT);
    svg+=face([pt(baseTri[1][0],0,baseTri[1][2]),pt(baseTri[2][0],0,baseTri[2][2]),pt(topTri[2][0],h6,topTri[2][2]),pt(topTri[1][0],h6,topTri[1][2])],FACE_SIDE);
    svg+=face([pt(topTri[0][0],h6,topTri[0][2]),pt(topTri[1][0],h6,topTri[1][2]),pt(topTri[2][0],h6,topTri[2][2])],FACE_TOP);
    var lbs6=s.labels||{};
    if(lbs6.base){var mb6=iso((baseTri[0][0]+baseTri[1][0])/2,0,baseTri[0][2]-0.4);svg+='<text x="'+mb6.x.toFixed(1)+'" y="'+(mb6.y+10).toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs6.base)+'</text>';}
    if(lbs6.h){var mh6=iso(l6+0.3,h6/2,0);svg+='<text x="'+(mh6.x+6).toFixed(1)+'" y="'+mh6.y.toFixed(1)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs6.h)+'</text>';}
  }

  if(solid==='sphere'){
    var r5=Math.min(lw,dw,ht)/2;
    var c5=iso(0,r5,0);
    var rp5=r5*sc;
    svg+='<circle cx="'+c5.x.toFixed(1)+'" cy="'+c5.y.toFixed(1)+'" r="'+rp5.toFixed(1)+'" fill="url(#sphereGrad)" stroke="'+FIG_INDIGO+'" stroke-width="1.8"/>';
    svg+='<defs><radialGradient id="sphereGrad" cx="38%" cy="35%"><stop offset="0%" stop-color="#eef2fb"/><stop offset="100%" stop-color="'+FIG_INDIGO2+'" stop-opacity="0.55"/></radialGradient></defs>';
    svg+='<ellipse cx="'+c5.x.toFixed(1)+'" cy="'+c5.y.toFixed(1)+'" rx="'+rp5.toFixed(1)+'" ry="'+(rp5*0.35).toFixed(1)+'" fill="none" stroke="'+FIG_INDIGO+'" stroke-width="1" stroke-dasharray="5 3"/>';
    var lbs5=s.labels||{};
    if(lbs5.r) svg+='<text x="'+(c5.x+rp5/1.4)+'" y="'+(c5.y-rp5/1.4)+'" font-size="11" fill="'+FIG_INDIGO+'" font-weight="600">'+esc(lbs5.r)+'</text>';
  }

  if(solid==='cross_section'){
    // a rectangular prism sliced by a horizontal plane at a given fractional height,
    // showing the cut face — used for volume/cross-section questions (Calc, Geometry)
    var l7=lw,w7=dw,h7=ht,cutFrac=s.cut!=null?s.cut:0.5,ch=h7*cutFrac;
    svg+=line3(0,0,0,l7,0,0,FIG_INK,true);
    svg+=line3(0,0,0,0,0,w7,FIG_INK,true);
    svg+=line3(0,0,0,0,ch,0,FIG_INK,true);
    svg+=face([pt(0,0,w7),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,0,w7)],FACE_FRONT);
    svg+=face([pt(l7,0,w7),pt(l7,ch,w7),pt(l7,ch,0),pt(l7,0,0)],FACE_SIDE);
    // cut face at the top of the visible slice — amber, to draw the eye to what's being measured
    svg+=face([pt(0,ch,0),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,ch,0)],FIG_AMBER_FILL);
    // ghost outline of the full solid above the cut, dashed, so students see what was removed
    svg+='<polygon points="'+[pt(0,ch,0),pt(0,ch,w7),pt(l7,ch,w7),pt(l7,ch,0)].join(' ')+'" fill="none" stroke="'+FIG_AMBER+'" stroke-width="1.6" stroke-dasharray="5 3"/>';
    svg+=line3(0,ch,0,0,h7,0,FIG_MUTED,true);
    svg+=line3(l7,ch,0,l7,h7,0,FIG_MUTED,true);
    svg+=line3(l7,ch,w7,l7,h7,w7,FIG_MUTED,true);
    svg+=line3(0,ch,w7,0,h7,w7,FIG_MUTED,true);
    var lbs7=s.labels||{};
    if(lbs7.l){var ml7=iso(l7/2,0,w7+0.3);svg+='<text x="'+ml7.x.toFixed(1)+'" y="'+(ml7.y+12)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="middle" font-weight="600">'+esc(lbs7.l)+'</text>';}
    if(lbs7.w){var mw7=iso(l7+0.3,0,w7/2);svg+='<text x="'+(mw7.x+5)+'" y="'+(mw7.y+4)+'" font-size="11" fill="'+FIG_INDIGO+'" text-anchor="start" font-weight="600">'+esc(lbs7.w)+'</text>';}
    if(lbs7.h){var mh7=iso(l7+0.3,ch/2,0);svg+='<text x="'+(mh7.x+5)+'" y="'+(mh7.y+4)+'" font-size="11" fill="'+FIG_AMBER_TEXT+'" text-anchor="start" font-weight="600">'+esc(lbs7.h)+'</text>';}
  }

  if(s.title) svg+='<text x="'+W/2+'" y="12" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  svg+='</svg>';
  return svg;
}

/* ── Bar Chart ──────────────────────────────────────── */
function renderBarChart(s){
  var bars=s.bars||[];
  if(!bars.length) return '';
  var W=320,H=210,ml=44,mr=14,mt=22,mb=38;
  var pw=W-ml-mr,ph=H-mt-mb;
  var maxVal=Math.max.apply(null,bars.map(function(b){return b.val||0;}))||1;
  var yScale=Math.ceil(maxVal/5)*5; // round up to nice number
  var bw=Math.min(40,(pw/bars.length)*0.65);
  var gap=(pw-bw*bars.length)/(bars.length+1);
  var colors=FIG_SERIES;
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Title
  if(s.title) svg+='<text x="'+W/2+'" y="14" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  // Y axis grid
  for(var g=0;g<=5;g++){
    var gv=yScale*g/5, gy=mt+ph-(gv/yScale)*ph;
    svg+='<line x1="'+ml+'" y1="'+gy.toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+gy.toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+(ml-5)+'" y="'+(gy+3.5)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+Math.round(gv)+'</text>';
  }
  // Axes
  svg+='<line x1="'+ml+'" y1="'+mt+'" x2="'+ml+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg+='<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+(ml+pw)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  // Axis labels
  if(s.ylabel) svg+='<text x="12" y="'+(mt+ph/2)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90,12,'+(mt+ph/2)+')">'+esc(s.ylabel)+'</text>';
  if(s.xlabel) svg+='<text x="'+(ml+pw/2)+'" y="'+(H-4)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.xlabel)+'</text>';
  // Bars
  bars.forEach(function(b,i){
    var bx=ml+gap+i*(bw+gap);
    var bh=(b.val/yScale)*ph;
    var by=mt+ph-bh;
    var col=colors[i%colors.length];
    svg+='<rect x="'+bx.toFixed(1)+'" y="'+by.toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+bh.toFixed(1)+'" fill="'+col+'" rx="3"/>';
    // Value label on top
    svg+='<text x="'+(bx+bw/2).toFixed(1)+'" y="'+(by-4).toFixed(1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle" font-weight="600">'+b.val+'</text>';
    // Category label
    var lbl=b.label||'';
    svg+='<text x="'+(bx+bw/2).toFixed(1)+'" y="'+(mt+ph+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+esc(lbl)+'</text>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Scatter Plot ───────────────────────────────────── */
function renderScatter(s){
  var pts=s.pts||[];
  if(!pts.length) return '';
  var W=310,H=210,ml=42,mr=18,mt=20,mb=34;
  var pw=W-ml-mr,ph=H-mt-mb;
  var xs=pts.map(function(p){return p[0];}),ys=pts.map(function(p){return p[1];});
  var xmin2=Math.min.apply(null,xs),xmax2=Math.max.apply(null,xs);
  var ymin2=Math.min.apply(null,ys),ymax2=Math.max.apply(null,ys);
  var xpad=(xmax2-xmin2)*0.12||1, ypad=(ymax2-ymin2)*0.15||1;
  xmin2-=xpad;xmax2+=xpad;ymin2-=ypad;ymax2+=ypad;
  function sx2(x){return ml+(x-xmin2)/(xmax2-xmin2)*pw;}
  function sy2(y){return mt+ph-(y-ymin2)/(ymax2-ymin2)*ph;}
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  if(s.title) svg+='<text x="'+W/2+'" y="13" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  // Grid
  var nxg=5,nyg=5;
  for(var gi=0;gi<=nxg;gi++){
    var gx=(xmin2+(xmax2-xmin2)*gi/nxg);
    svg+='<line x1="'+sx2(gx).toFixed(1)+'" y1="'+mt+'" x2="'+sx2(gx).toFixed(1)+'" y2="'+(mt+ph)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+sx2(gx).toFixed(1)+'" y="'+(mt+ph+12)+'" font-size="8.5" fill="'+FIG_INK+'" text-anchor="middle">'+gx.toFixed(0)+'</text>';
  }
  for(var gi2=0;gi2<=nyg;gi2++){
    var gy2=(ymin2+(ymax2-ymin2)*gi2/nyg);
    svg+='<line x1="'+ml+'" y1="'+sy2(gy2).toFixed(1)+'" x2="'+(ml+pw)+'" y2="'+sy2(gy2).toFixed(1)+'" stroke="'+FIG_GRID+'" stroke-width="0.8"/>';
    svg+='<text x="'+(ml-5)+'" y="'+(sy2(gy2)+3)+'" font-size="8.5" fill="'+FIG_INK+'" text-anchor="end">'+gy2.toFixed(0)+'</text>';
  }
  // Axes
  svg+='<line x1="'+ml+'" y1="'+mt+'" x2="'+ml+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  svg+='<line x1="'+ml+'" y1="'+(mt+ph)+'" x2="'+(ml+pw)+'" y2="'+(mt+ph)+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  if(s.xlabel) svg+='<text x="'+(ml+pw/2)+'" y="'+(H-3)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.xlabel)+'</text>';
  if(s.ylabel) svg+='<text x="11" y="'+(mt+ph/2)+'" font-size="10" fill="'+FIG_MUTED+'" text-anchor="middle" transform="rotate(-90,11,'+(mt+ph/2)+')">'+esc(s.ylabel)+'</text>';
  // Trend line
  if(s.trendline&&pts.length>1){
    var n=pts.length;
    var sumx=0,sumy=0,sumxy=0,sumx2=0;
    pts.forEach(function(p){sumx+=p[0];sumy+=p[1];sumxy+=p[0]*p[1];sumx2+=p[0]*p[0];});
    var m2=(n*sumxy-sumx*sumy)/(n*sumx2-sumx*sumx);
    var b2=(sumy-m2*sumx)/n;
    var tx1=xmin2+xpad*0.5,tx2=xmax2-xpad*0.5;
    svg+='<line x1="'+sx2(tx1).toFixed(1)+'" y1="'+sy2(m2*tx1+b2).toFixed(1)+'" x2="'+sx2(tx2).toFixed(1)+'" y2="'+sy2(m2*tx2+b2).toFixed(1)+'" stroke="'+FIG_AMBER+'" stroke-width="1.8" stroke-dasharray="6 3"/>';
  }
  // Points
  pts.forEach(function(p){
    svg+='<circle cx="'+sx2(p[0]).toFixed(1)+'" cy="'+sy2(p[1]).toFixed(1)+'" r="4.5" fill="'+FIG_INDIGO2+'" fill-opacity="0.85" stroke="#fff" stroke-width="1.2"/>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Pie Chart ──────────────────────────────────────── */
function renderPie(s){
  var slices=s.slices||[];
  if(!slices.length) return '';
  var W=300,H=210,cx4=110,cy4=H/2,r6=78;
  var total=slices.reduce(function(a,sl){return a+sl.val;},0)||1;
  var colors=FIG_SERIES;
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  if(s.title) svg+='<text x="'+W/2+'" y="14" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  var ang=-Math.PI/2;
  slices.forEach(function(sl,si){
    var sweep=2*Math.PI*sl.val/total;
    var x1=cx4+r6*Math.cos(ang),y1=cy4+r6*Math.sin(ang);
    var x2=cx4+r6*Math.cos(ang+sweep),y2=cy4+r6*Math.sin(ang+sweep);
    var large=sweep>Math.PI?1:0;
    var col=colors[si%colors.length];
    svg+='<path d="M'+cx4+','+cy4+' L'+x1.toFixed(1)+','+y1.toFixed(1)+' A'+r6+','+r6+' 0 '+large+',1 '+x2.toFixed(1)+','+y2.toFixed(1)+' Z" fill="'+col+'" stroke="#fff" stroke-width="1.5"/>';
    ang+=sweep;
  });
  // Legend (right side)
  var legX=210,legY=H/2-slices.length*9;
  slices.forEach(function(sl,si){
    var col=colors[si%colors.length];
    var pct=Math.round(sl.val/total*100);
    svg+='<rect x="'+legX+'" y="'+(legY+si*20)+'" width="12" height="12" fill="'+col+'" rx="2"/>';
    svg+='<text x="'+(legX+16)+'" y="'+(legY+si*20+10)+'" font-size="10" fill="'+FIG_INK+'">'+esc(sl.label)+' ('+pct+'%)</text>';
  });
  svg+='</svg>';
  return svg;
}

/* ── Number Line ────────────────────────────────────── */
function renderNumberLine(s){
  var W=310,H=90,my=50,ml=28,mr=28;
  var pw=W-ml-mr;
  var mn=s.min!=null?s.min:-5, mx=s.max!=null?s.max:5;
  function sx3(v){return ml+(v-mn)/(mx-mn)*pw;}
  var svg='<svg viewBox="0 0 '+W+' '+H+'" class="mfig-svg" xmlns="http://www.w3.org/2000/svg">';
  svg+='<rect width="'+W+'" height="'+H+'" fill="'+FIG_BG+'" rx="8"/>';
  // Line
  svg+='<line x1="'+ml+'" y1="'+my+'" x2="'+(W-mr)+'" y2="'+my+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  svg+='<polygon points="'+(W-mr)+','+my+' '+(W-mr-7)+','+(my-3)+' '+(W-mr-7)+','+(my+3)+'" fill="'+FIG_INK+'"/>';
  svg+='<polygon points="'+ml+','+my+' '+(ml+7)+','+(my-3)+' '+(ml+7)+','+(my+3)+'" fill="'+FIG_INK+'"/>';
  // Ticks
  for(var tv=Math.ceil(mn);tv<=Math.floor(mx);tv++){
    var tx4=sx3(tv);
    svg+='<line x1="'+tx4.toFixed(1)+'" y1="'+(my-5)+'" x2="'+tx4.toFixed(1)+'" y2="'+(my+5)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    svg+='<text x="'+tx4.toFixed(1)+'" y="'+(my+18)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+tv+'</text>';
  }
  // Shaded regions
  (s.regions||[]).forEach(function(rg){
    var rx1=sx3(rg.from),rx2=sx3(rg.to);
    svg+='<rect x="'+rx1.toFixed(1)+'" y="'+(my-4)+'" width="'+(rx2-rx1).toFixed(1)+'" height="8" fill="'+FIG_INDIGO2+'" fill-opacity="0.28"/>';
    // Endpoints
    svg+='<circle cx="'+rx1.toFixed(1)+'" cy="'+my+'" r="5" fill="'+(rg.closed_left?FIG_INDIGO2:FIG_BG)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2"/>';
    svg+='<circle cx="'+rx2.toFixed(1)+'" cy="'+my+'" r="5" fill="'+(rg.closed_right?FIG_INDIGO2:FIG_BG)+'" stroke="'+FIG_INDIGO2+'" stroke-width="2"/>';
  });
  // Points
  (s.points||[]).forEach(function(pt){
    var px=sx3(pt.x);
    svg+='<circle cx="'+px.toFixed(1)+'" cy="'+my+'" r="5.5" fill="'+(pt.open?FIG_BG:FIG_AMBER)+'" stroke="'+FIG_AMBER+'" stroke-width="2"/>';
    if(pt.label) svg+='<text x="'+px.toFixed(1)+'" y="'+(my-12)+'" font-size="10" fill="'+FIG_AMBER_TEXT+'" text-anchor="middle">'+esc(pt.label)+'</text>';
  });
  if(s.title) svg+='<text x="'+W/2+'" y="14" font-size="11" fill="'+FIG_MUTED+'" text-anchor="middle">'+esc(s.title)+'</text>';
  svg+='</svg>';
  return svg;
}
})();
