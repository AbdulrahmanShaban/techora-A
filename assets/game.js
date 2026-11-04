/* Techora game engine: levels of mcq | tf | match */
(function(){
var $=function(s,r){return(r||document).querySelector(s)};
function shuf(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
var AC=null,mute=false;function beep(ok){if(mute)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.type=ok?'sine':'sawtooth';o.frequency.value=ok?660:180;if(ok)o.frequency.setValueAtTime(880,AC.currentTime+.09);g.gain.value=.05;o.start();o.stop(AC.currentTime+.18)}catch(e){}}
function toast(t){var d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(function(){d.remove()},1450)}
function confetti(){var c=['🎉','⭐','✨','🟢','💚','🎊'];for(var i=0;i<48;i++){var d=document.createElement('div');d.className='cf';d.textContent=c[i%c.length];d.style.left=Math.random()*100+'vw';d.style.animationDuration=(2+Math.random()*2.2)+'s';d.style.animationDelay=Math.random()*.6+'s';document.body.appendChild(d);(function(x){setTimeout(function(){x.remove()},5200)})(d)}}
function el(h){var d=document.createElement('div');d.innerHTML=h;return d.firstChild}
window.TGame={start:function(cfg){var MAXH=6;var TR={types:{},wrong:[]};function strip(h){return String(h).replace(/<[^>]*>/g,'').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim().slice(0,110)}function track(t,q,ok){var b=TR.types[t]||(TR.types[t]={r:0,t:0});b.t++;if(ok)b.r++;else if(TR.wrong.length<10)TR.wrong.push({q:strip(q),t:t})}
 var root=$(cfg.mount),L=0,I=0,score=0,streak=0,hearts=MAXH,right=0,total=0,best=0,key='techora_best_'+cfg.id,locked=false;
 try{best=+localStorage.getItem(key)||0}catch(e){}
 function totalQ(){return cfg.levels.reduce(function(n,l){return n+(l.type==='match'?l.rounds.reduce(function(m,r){return m+r.length},0):l.type==='order'?l.items.reduce(function(m,r){return m+r.seq.length},0):l.n||l.items.length)},0)}
 var all=totalQ(),done=0,cur=[];
 function hud(){return '<div class="hud"><span>⭐ '+score+'</span><span class="hearts">'+'❤️'.repeat(hearts)+'🖤'.repeat(MAXH-hearts)+'</span><span>المستوى '+(L+1)+' / '+cfg.levels.length+'</span><span>🔥 '+streak+'</span><button class="mu" id="mu">'+(mute?'🔇':'🔊')+'</button></div><div class="bar"><i style="width:'+Math.min(100,Math.round(done/all*100))+'%"></i></div>'}
 function av(){return cfg.avatar?'<img class="av" src="'+cfg.avatar+'" onerror="this.onerror=null;this.src=\''+cfg.avatarFallback+'\'" alt="">':''}
 function intro(){root.innerHTML='<div class="res">'+(av()||'<div class="st">🎮</div>')+'<h2>'+cfg.title+'</h2><p>'+cfg.levels.length+' مستويات • '+all+' سؤال/مهمة • عندك 6 قلوب في كل مستوى</p><p>'+(best?'أعلى نتيجة ليك: <b>'+best+'</b>':'ابدأ وسجّل أول نتيجة!')+'</p><div class="row"><button class="btn p" id="go">ابدأ اللعب ▶</button></div></div>';$('#go').onclick=function(){L=0;score=0;streak=0;right=0;done=0;total=0;TR.types={};TR.wrong=[];startLevel()}}
 function startLevel(){var lv=cfg.levels[L];hearts=MAXH;I=0;
  if(lv.type==='match'){cur=lv.rounds.slice()}else{cur=shuf(lv.items).slice(0,lv.n||lv.items.length)}
  show()}
 function show(){var lv=cfg.levels[L];if(I>=cur.length)return endLevel(true);locked=false;
  if(lv.type==='mcq')return mcq(lv);if(lv.type==='tf')return tf(lv);if(lv.type==='order')return order(lv);match(lv)}
 function head(lv){return hud()+'<div class="q"><div class="lv">'+lv.title+' • '+(I+1)+'/'+cur.length+'</div>'}
 function feedback(ok,why){var f=$('#fb');f.className='fb show '+(ok?'ok':'no');f.innerHTML=(ok?'✅ إجابة صحيحة! ':'❌ مش دقيق. ')+(why||'');$('#nx').classList.add('show')}
 var MSG={3:'🔥 سلسلة 3! كمّل',5:'⚡ 5 ورا بعض! جامد',8:'🚀 8 صح! أسطورة',12:'👑 12 صح! لا يُصدَّق'};
 function score_(ok){total++;if(ok){right++;streak++;score+=10+(streak>=3?5:0);if(MSG[streak])toast(MSG[streak])}else{streak=0;hearts--}done++;beep(ok)}
 function after(){if(hearts<=0){setTimeout(function(){endLevel(false)},600);return false}return true}
 function mcq(lv){var q=cur[I],o=shuf(q.a.map(function(t,i){return{t:t,c:i===q.c}}));
  root.innerHTML=head(lv)+'<h2>'+q.q+'</h2><div class="opts">'+o.map(function(x,i){return'<button class="opt" data-i="'+i+'">'+x.t+'</button>'}).join('')+'</div><div class="fb" id="fb"></div><div class="next" id="nx"><button class="btn p" id="nb">التالي ←</button></div></div>';
  root.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){if(locked)return;locked=true;var x=o[+b.dataset.i];
   root.querySelectorAll('.opt').forEach(function(bb,i){bb.disabled=true;if(o[i].c)bb.classList.add('ok')});
   if(!x.c){b.classList.add('no','shake')}else b.classList.add('pop');score_(x.c);track('mcq',q.q,x.c);feedback(x.c,q.why);hudRefresh();
   $('#nb').onclick=function(){if(after()){I++;show()}}}})}
 function tf(lv){var q=cur[I];
  root.innerHTML=head(lv)+'<h2>'+q.q+'</h2><div class="opts tf"><button class="opt" data-v="1">✔ صح</button><button class="opt" data-v="0">✘ خطأ</button></div><div class="fb" id="fb"></div><div class="next" id="nx"><button class="btn p" id="nb">التالي ←</button></div></div>';
  root.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){if(locked)return;locked=true;var v=b.dataset.v==='1',ok=v===q.c;
   root.querySelectorAll('.opt').forEach(function(bb){bb.disabled=true;if((bb.dataset.v==='1')===q.c)bb.classList.add('ok')});
   if(!ok)b.classList.add('no','shake');else b.classList.add('pop');score_(ok);track('tf',q.q,ok);feedback(ok,q.why);hudRefresh();
   $('#nb').onclick=function(){if(after()){I++;show()}}}})}
 function order(lv){var q=cur[I],opts=shuf(q.seq.map(function(t,i){return{t:t,i:i}})),nxt=0;
  root.innerHTML=head(lv)+'<h2>'+q.q+'</h2><p class="l" style="color:#9db4a7;margin:-8px 0 12px;font-size:13px">اضغط العناصر بالترتيب الصحيح من الأول للآخر</p><div class="opts">'+opts.map(function(x){return'<button class="opt" data-i="'+x.i+'">'+x.t+'</button>'}).join('')+'</div><div class="fb" id="fb"></div><div class="next" id="nx"><button class="btn p" id="nb">التالي ←</button></div></div>';
  root.querySelectorAll('.opt').forEach(function(b){b.onclick=function(){if(locked||b.disabled)return;
   if(+b.dataset.i===nxt){b.disabled=true;b.classList.add('ok','pop');b.insertAdjacentHTML('afterbegin','<b>'+(nxt+1)+'</b>');nxt++;score_(true);track('order',q.q,true);hudRefresh();
    if(nxt===q.seq.length){locked=true;feedback(true,q.why);$('#nb').onclick=function(){if(after()){I++;show()}}}}
   else{b.classList.add('no','shake');setTimeout(function(){b.classList.remove('no','shake')},400);score_(false);track('order',q.q,false);hudRefresh();if(hearts<=0)after()}}})}
 function match(lv){var pairs=cur[I],left=shuf(pairs.map(function(p,i){return{t:p[0],i:i}})),rightC=shuf(pairs.map(function(p,i){return{t:p[1],i:i}})),sel=null,got=0;
  root.innerHTML=head(lv)+'<h2>'+(lv.q||'اربط كل عنصر بما يناسبه')+'</h2><div class="mt"><div class="opts" id="l">'+left.map(function(x){return'<button class="opt" data-i="'+x.i+'">'+x.t+'</button>'}).join('')+'</div><div class="opts" id="r">'+rightC.map(function(x){return'<button class="opt" data-i="'+x.i+'">'+x.t+'</button>'}).join('')+'</div></div><div class="fb" id="fb"></div><div class="next" id="nx"><button class="btn p" id="nb">التالي ←</button></div></div>';
  var Ls=root.querySelectorAll('#l .opt'),Rs=root.querySelectorAll('#r .opt');
  Ls.forEach(function(b){b.onclick=function(){if(b.classList.contains('done'))return;Ls.forEach(function(x){x.classList.remove('sel')});b.classList.add('sel');sel=b}});
  Rs.forEach(function(b){b.onclick=function(){if(!sel||b.classList.contains('done'))return;var ok=sel.dataset.i===b.dataset.i;
   if(ok){sel.classList.remove('sel');sel.classList.add('done');b.classList.add('done');sel=null;got++;score_(true);track('match',lv.q||'توصيل',true);hudRefresh();
    if(got===pairs.length){var f=$('#fb');f.className='fb show ok';f.textContent='✅ ممتاز! ربطت كل العناصر صح.';$('#nx').classList.add('show');$('#nb').onclick=function(){I++;show()}}}
   else{b.classList.add('no','shake');setTimeout(function(){b.classList.remove('no','shake')},400);score_(false);track('match',(lv.q||'توصيل')+': '+(sel?sel.textContent:''),false);hudRefresh();if(hearts<=0){after()}}}})}
 root.addEventListener('click',function(e){if(e.target.id==='mu'){mute=!mute;e.target.textContent=mute?'🔇':'🔊'}});
 function hudRefresh(){var h=$('.hud');if(h){h.outerHTML=hud().split('<div class="bar">')[0]}var b=$('.bar i');if(b)b.style.width=Math.min(100,Math.round(done/all*100))+'%'}
 function endLevel(ok){
  if(!ok){root.innerHTML='<div class="res"><div class="st">💔</div><h2>خلصت القلوب!</h2><p>مفيش مشكلة، المحاولة بتعلّم. جرّب المستوى تاني.</p><div class="row"><button class="btn p" id="rt">إعادة المستوى</button></div></div>';$('#rt').onclick=function(){startLevel()};return}
  if(L<cfg.levels.length-1){root.innerHTML='<div class="res"><div class="st">🎉</div><h2>أنهيت المستوى '+(L+1)+'!</h2><p>نتيجتك لحد دلوقتي: <b>'+score+'</b></p><div class="row"><button class="btn p" id="nl">المستوى التالي ←</button></div></div>';$('#nl').onclick=function(){L++;startLevel()};return}
  final()}
 function final(){var pct=total?right/total:0,st=pct>=.9?3:pct>=.7?2:pct>=.4?1:0,isBest=score>best;
  if(isBest){try{localStorage.setItem(key,score)}catch(e){}}
  if(window.TData&&TData.saveGame)TData.saveGame({id:cfg.id,right:right,total:total,score:score,byType:TR.types,wrong:TR.wrong}).then(function(o){if(o&&o.xpGain>0)TData.toast('+'+o.xpGain+' XP ⚡'+(o.newDone?' • الدرس اتسجّل مكتمل ✅':''))});
  root.innerHTML='<div class="res">'+av()+'<div class="st">'+'⭐'.repeat(st)+'☆'.repeat(3-st)+'</div><h2>'+(st==3?'أسطورة! 🏆':st==2?'شاطر جدًا 👏':st==1?'كويس، حاول تاني 💪':'ذاكر الدرس وارجع 📘')+'</h2><div class="big">'+score+'</div><p>إجابات صحيحة: '+right+' من '+total+(isBest?' • 🎖 رقم قياسي جديد!':'')+'</p><div class="row"><button class="btn p" id="again">العب تاني</button><a class="btn s" href="'+cfg.back+'">← رجوع للدرس</a></div></div>'
  if(st>=2)confetti();$('#again').onclick=function(){intro()}}
 intro()}};
})();
