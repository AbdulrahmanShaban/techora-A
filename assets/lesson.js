(function(){
var R={
cards:function(x){return'<div class="grid">'+x.items.map(function(i){return'<div class="card"><div class="i">'+i[0]+'</div><h3>'+i[1]+'</h3><p>'+i[2]+'</p></div>'}).join('')+'</div>'},
flip:function(x){return'<div class="grid">'+x.items.map(function(i){return'<button class="card flip"><div class="i">'+i[0]+'</div><h3>'+i[1]+'</h3><div class="h">اضغط لتعرف أكتر</div><div class="b">'+i[2]+'</div></button>'}).join('')+'</div>'},
steps:function(x){return'<div class="flow">'+x.items.map(function(i,n){return'<div class="step"><b>'+(n+1)+'</b><p>'+(i[0]?'<em>'+i[0]+':</em> ':'')+i[1]+'</p></div>'}).join('')+'</div>'},
acc:function(x){return x.items.map(function(i){return'<div class="acc"><button>'+i[0]+'</button><div class="in">'+i[1]+'</div></div>'}).join('')},
code:function(x){return(x.cap?'<div class="cap">'+x.cap+'</div>':'')+'<pre class="code">'+x.t+'</pre>'},
raw:function(x){return x.t},
text:function(x){return'<div class="card"><p>'+x.t+'</p></div>'},
act:function(x){return'<div class="tip'+(x.gold?' k':'')+'">'+(x.k||'💬 نشاط جماعي')+': '+x.t+'</div>'},
code:function(x){return(x.k?'<div class="cap">'+x.k+'</div>':'')+'<pre class="code">'+x.t+'</pre>'},
table:function(x){return'<div style="overflow-x:auto"><table class="tbl"><tr>'+x.head.map(function(h){return'<th>'+h+'</th>'}).join('')+'</tr>'+x.rows.map(function(r){return'<tr>'+r.map(function(c){return'<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</table></div>'}};
var P_={
hero:function(c){var h='<section class="hero"><small>'+c.unit+'</small><h1>'+c.title+'</h1><p>'+c.intro+'</p><ul class="goals">'+c.goals.map(function(g){return'<li>'+g+'</li>'}).join('')+'</ul><a class="bk" href="'+c.pdf+'" target="_blank" rel="noopener">📖 افتح الكتاب المدرسي • '+c.pages+'</a></section>';
 if(c.key){var r=c.root||'';h+='<img class="ban" src="'+r+'assets/img/'+c.key+'.svg" alt="">';if(c.say)h+='<div class="tch"><img src="'+r+'assets/teacher/'+c.key+'.jpg" onerror="this.onerror=null;this.src=\''+r+'assets/teacher/base.jpg\'" alt="مدرّسك"><div class="bub">'+c.say+'</div></div>'}return h},
sec:function(c,s){return(s.h?'<h2 class="s">'+s.h+'</h2>'+(s.l?'<p class="l">'+s.l+'</p>':''):'')+R[s.type](s)},
media:function(c,M){return'<h2 class="s">🖼 صور توضيحية</h2><div class="figs">'+(M.figs||[]).map(function(f){return'<figure class="fig"><img src="'+(c.root||'')+f.src+'" alt="'+f.cap+'" loading="lazy"><figcaption>'+f.cap+'</figcaption></figure>'}).join('')+'</div><h2 class="s">🎬 فيديو تعليمي</h2>'+(M.video?'<a class="vid" href="'+M.video.url+'" target="_blank" rel="noopener"><span class="pl">▶</span><span><b>'+M.video.title+'</b><small>'+M.video.by+' • يفتح على يوتيوب</small></span></a>':'<div class="tip k">لا يتوفر حاليًا فيديو عربي موثوق ومرتبط بمحتوى هذا الدرس، فلم نضع رابطًا غير مؤكد. شاهد الشرح داخل الدرس وفي الكتاب المدرسي.</div>')},
summary:function(c){return'<h2 class="s">الخلاصة</h2><div class="card"><p>'+c.summary+'</p></div><div class="cta"><a class="btn p" href="activity.html">🎮 ابدأ لعبة الدرس</a></div>'}};
function bodyOf(c,st,M){return st.items.map(function(it){return it.k==='hero'?P_.hero(c):it.k==='sec'?P_.sec(c,c.sections[it.i]):it.k==='media'?P_.media(c,M):P_.summary(c)}).join('')}
function wire(m){m.querySelectorAll('.flip').forEach(function(b){b.onclick=function(){b.classList.toggle('open')}});m.querySelectorAll('.acc>button').forEach(function(b){b.onclick=function(){b.parentNode.classList.toggle('open')}})}
window.TLesson={
 /* العرض المتواصل القديم: يُستخدم للمقارنة الحرفية في الاختبار فقط */
 flat:function(c){var M=(window.TMEDIA||{})[c.key],h=P_.hero(c);c.sections.forEach(function(s){h+=P_.sec(c,s)});if(M)h+=P_.media(c,M);return h+P_.summary(c)},
 steps:function(c){var M=(window.TMEDIA||{})[c.key];return TSteps.plan(c,!!M).map(function(s){return{id:s.id,title:s.title,html:bodyOf(c,s,M)}})},
 render:function(c){var m=document.getElementById('app');
  var go=function(){try{build(c,m)}catch(e){console.error(e);m.innerHTML=TLesson.flat(c);wire(m)}};
  m.innerHTML='<div class="stp-load">جارٍ تجهيز الدرس…</div>';
  try{(window.TData&&TData.whenUser?TData.whenUser():Promise.resolve()).then(go,go)}catch(e){go()}}};
function build(c,m){
 var lid=TSteps.lessonIdFromPath(location.pathname)||c.key,S=TLesson.steps(c),N=S.length,st=TSteps.get(lid);
 var first=function(){st=TSteps.get(lid);for(var i=0;i<N;i++)if(!st.done[S[i].id])return i;return N};
 var cur=0;
 var h='<div class="stp" id="stp"><div class="stp-bar" id="stpBar"><div class="stp-top"><b id="stpCnt"></b><span class="stp-pct" id="stpPct"></span></div><div class="stp-track"><i id="stpFill"></i></div><div class="stp-dots" id="stpDots" role="tablist" aria-label="أجزاء الدرس">'+S.map(function(s,i){return'<button type="button" class="stp-dot" data-i="'+i+'" title="'+(i+1)+'. '+s.title.replace(/"/g,'&quot;')+'" aria-label="الجزء '+(i+1)+': '+s.title.replace(/"/g,'&quot;')+'">'+(i+1)+'</button>'}).join('')+'</div></div>'+
  S.map(function(s,i){return'<section class="stp-panel" id="stp-'+s.id+'" data-i="'+i+'" hidden aria-labelledby="stp-t'+i+'"><header class="stp-hd"><small>الجزء '+(i+1)+' من '+N+'</small><h2 id="stp-t'+i+'">'+s.title+'</h2></header><div class="stp-body">'+s.html+'</div></section>'}).join('')+
  '<div class="stp-nav" id="stpNav"><button type="button" class="btn" id="stpPrev">→ السابق</button><button type="button" class="btn p" id="stpDone">✅ إكمال الجزء</button><button type="button" class="btn" id="stpNext">التالي ←</button></div><p class="stp-msg" id="stpMsg" role="status" aria-live="polite"></p></div>';
 m.innerHTML=h;wire(m);
 [].forEach.call(m.querySelectorAll('.stp-panel'),function(p,i){var f=p.querySelector('.stp-body').firstElementChild;if(f&&f.matches('h2.s')&&f.textContent.replace(/\s+/g,' ').trim()===S[i].title)f.classList.add('stp-dup')});
 var $=function(i){return document.getElementById(i)},panels=[].slice.call(m.querySelectorAll('.stp-panel')),dots=[].slice.call(m.querySelectorAll('.stp-dot'));
 var top=document.querySelector('.top');if(top)document.documentElement.style.setProperty('--stph',top.offsetHeight+'px');
 var ids=S.map(function(x){return x.id}),lastIdx=ids.indexOf(TSteps.get(lid).last);
 function allowed(){return Math.min(first(),N-1)}
 function paint(){var f=first(),done=S.filter(function(s){return st.done[s.id]}).length,pct=Math.round(done/N*100);
  $('stpCnt').textContent='الجزء '+(cur+1)+' من '+N+' • أكملت '+done+' من '+N;$('stpPct').textContent=pct+'%';$('stpFill').style.width=pct+'%';
  dots.forEach(function(d,i){var dn=!!st.done[S[i].id],lock=i>f;d.classList.toggle('done',dn);d.classList.toggle('cur',i===cur);d.classList.toggle('lock',lock);d.disabled=lock;d.textContent=dn?'✓':(i+1);d.setAttribute('aria-current',i===cur?'step':'false')});
  panels.forEach(function(p,i){p.hidden=i!==cur});
  var dn=!!st.done[S[cur].id];var b=$('stpDone');b.disabled=dn;b.textContent=dn?'✔ تم إكمال الجزء':'✅ إكمال الجزء';b.classList.toggle('ok',dn);
  $('stpPrev').disabled=cur===0;var nx=$('stpNext');nx.style.display=cur===N-1?'none':'';nx.disabled=!(cur<N-1&&(dn||cur+1<=f));
  nx.classList.toggle('pulse',dn&&cur<N-1);
  $('stpMsg').textContent=done===N?'🎉 أحسنت! أكملت كل أجزاء الدرس. جاهز للعبة؟':(dn?'تم تسجيل هذا الجزء. اضغط «التالي» للمتابعة.':'اقرأ الجزء ثم اضغط «إكمال الجزء» لتسجيله والانتقال للتالي.')}
 function show(i,scroll){i=Math.max(0,Math.min(i,allowed()));cur=i;TSteps.visit(lid,S[i].id,N);paint();
  try{history.replaceState(null,'','#'+S[i].id)}catch(e){}
  if(scroll!==false){var bar=$('stpBar'),y=bar.getBoundingClientRect().top+window.pageYOffset-((top&&top.offsetHeight)||0)-6;window.scrollTo({top:Math.max(0,y),behavior:'smooth'})}}
 $('stpPrev').onclick=function(){show(cur-1)};
 $('stpNext').onclick=function(){if(!$('stpNext').disabled)show(cur+1)};
 $('stpDone').onclick=function(){var r=TSteps.complete(lid,S[cur].id,N);st=TSteps.get(lid);paint();
  if(r.added&&!TSteps.persistent())$('stpMsg').textContent='⚠ تعذّر الحفظ على هذا المتصفح (وضع التصفح الخاص). سيبقى التقدم حتى إغلاق الصفحة فقط.'}
 dots.forEach(function(d){d.onclick=function(){show(+d.dataset.i)}});
 document.addEventListener('keydown',function(e){if(/INPUT|TEXTAREA|SELECT/.test((e.target||{}).tagName||''))return;if(e.key==='ArrowLeft')$('stpNext').onclick();else if(e.key==='ArrowRight')$('stpPrev').onclick()});
 window.addEventListener('hashchange',function(){var x=S.map(function(s){return s.id}).indexOf((location.hash||'').slice(1));if(x>=0&&x!==cur)show(x,false)});
 var hx=ids.indexOf((location.hash||'').slice(1)),f0=first(),start=hx>=0?hx:(f0<N?(lastIdx>=0?Math.min(lastIdx,f0):f0):(lastIdx>=0?lastIdx:0));
 show(start,false)}
})();
