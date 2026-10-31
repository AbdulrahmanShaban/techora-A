/* شاشة الترحيب بالفيديو: تظهر مرة واحدة لكل جلسة */
(function(){
  var KEY='techora_welcome_seen',base=document.currentScript.src.replace(/welcome\.js.*$/,'');
  try{if(sessionStorage.getItem(KEY))return}catch(e){}
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var mode=document.currentScript.getAttribute('data-when')||'any',shown=false;
  function show(){
    if(shown)return;shown=true;try{sessionStorage.setItem(KEY,'1')}catch(e){}
    var st=document.createElement('style');
    st.textContent='#tw{position:fixed;inset:0;z-index:2147483600;visibility:visible!important;background:#050807;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;transition:opacity .7s ease;font-family:Cairo,system-ui,sans-serif}#tw.out{opacity:0;pointer-events:none}#tw video{width:min(78vmin,440px);height:auto;border-radius:24px;box-shadow:0 0 80px #5cff9b22}#tw p{margin:0;color:#9db4a7;font-size:15px;opacity:0;transform:translateY(8px);transition:.8s}#tw p.on{opacity:1;transform:none}#tw b{color:#5cff9b}#tw button{position:absolute;top:18px;left:18px;padding:8px 16px;border-radius:99px;border:1px solid #5cff9b55;background:#0b100f99;color:#f1fff7;font:inherit;font-size:13px;font-weight:700;cursor:pointer;opacity:0;transition:.4s}#tw button.on{opacity:1}';
    document.head.appendChild(st);
    var d=document.createElement('div');d.id='tw';
    d.innerHTML='<video muted playsinline autoplay preload="auto" poster="'+base+'video/welcome-poster.jpg"><source src="'+base+'video/welcome.mp4" type="video/mp4"><source src="'+base+'video/welcome.webm" type="video/webm"></video><p dir="rtl">أهلًا بك في <b>Techora</b> • منصة التعلم الرقمي</p><button type="button">تخطي ⏭</button>';
    document.body.appendChild(d);
    var v=d.querySelector('video'),p=d.querySelector('p'),b=d.querySelector('button'),done=false;
    function close(){if(done)return;done=true;d.classList.add('out');setTimeout(function(){d.remove()},800)}
    v.addEventListener('ended',function(){setTimeout(close,900)});
    v.addEventListener('error',close);v.querySelectorAll('source').forEach(function(s){s.addEventListener('error',function(){if(!v.currentSrc)setTimeout(close,300)})});
    v.addEventListener('timeupdate',function(){if(v.currentTime>2.6)p.classList.add('on')});
    b.onclick=close;setTimeout(function(){b.classList.add('on')},800);
    setTimeout(close,12000);
    var pr=v.play();if(pr&&pr.catch)pr.catch(function(){setTimeout(close,1200)});
  }
  function go(){
    if(window.TA&&TA.auth){TA.auth.onAuthStateChanged(function(u){if(mode==='guest'?!u:mode==='user'?!!u:true)show()});setTimeout(function(){if(!shown&&mode==='guest')show()},2500)}
    else show();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go);else go();
})();
