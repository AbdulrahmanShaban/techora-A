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
window.TLesson={render:function(c){
 var h='<section class="hero"><small>'+c.unit+'</small><h1>'+c.title+'</h1><p>'+c.intro+'</p><ul class="goals">'+c.goals.map(function(g){return'<li>'+g+'</li>'}).join('')+'</ul><a class="bk" href="'+c.pdf+'" target="_blank" rel="noopener">📖 افتح الكتاب المدرسي • '+c.pages+'</a></section>';
 if(c.key){var r=c.root||'';h+='<img class="ban" src="'+r+'assets/img/'+c.key+'.svg" alt="">';if(c.say)h+='<div class="tch"><img src="'+r+'assets/teacher/'+c.key+'.jpg" onerror="this.onerror=null;this.src=\''+r+'assets/teacher/base.jpg\'" alt="مدرّسك"><div class="bub">'+c.say+'</div></div>'}
 c.sections.forEach(function(s){if(s.h)h+='<h2 class="s">'+s.h+'</h2>'+(s.l?'<p class="l">'+s.l+'</p>':'');h+=R[s.type](s)});
 var M=(window.TMEDIA||{})[c.key];if(M){h+='<h2 class="s">🖼 صور توضيحية</h2><div class="figs">'+(M.figs||[]).map(function(f){return'<figure class="fig"><img src="'+(c.root||'')+f.src+'" alt="'+f.cap+'" loading="lazy"><figcaption>'+f.cap+'</figcaption></figure>'}).join('')+'</div><h2 class="s">🎬 فيديو تعليمي</h2>'+(M.video?'<a class="vid" href="'+M.video.url+'" target="_blank" rel="noopener"><span class="pl">▶</span><span><b>'+M.video.title+'</b><small>'+M.video.by+' • يفتح على يوتيوب</small></span></a>':'<div class="tip k">لا يتوفر حاليًا فيديو عربي موثوق ومرتبط بمحتوى هذا الدرس، فلم نضع رابطًا غير مؤكد. شاهد الشرح داخل الدرس وفي الكتاب المدرسي.</div>')}
 h+='<h2 class="s">الخلاصة</h2><div class="card"><p>'+c.summary+'</p></div><div class="cta"><a class="btn p" href="activity.html">🎮 ابدأ لعبة الدرس</a></div>';
 var m=document.getElementById('app');m.innerHTML=h;
 m.querySelectorAll('.flip').forEach(function(b){b.onclick=function(){b.classList.toggle('open')}});
 m.querySelectorAll('.acc>button').forEach(function(b){b.onclick=function(){b.parentNode.classList.toggle('open')}})}};
})();
