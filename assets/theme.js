/* Techora CMAT — نظام السمات والألوان (مركزي). السمة الافتراضية: Emerald Pro */
(function(){
var T={
 emerald:{n:'Emerald Pro',d:1,v:{'--bg':'#101713','--panel':'#17251D','--panel2':'#1D2F25','--green':'#16A36A','--mint':'#55E6A5','--accent':'#55E6A5','--text':'#F3F7F4','--soft':'#D3E3D8','--muted':'#A7B9AD','--line':'rgba(85,230,165,.18)','--line2':'#2A4234','--gold':'#FFD66B','--bad':'#FF8A8A','--on-green':'#04140C','--on-gold':'#2A1D00','--glow':'#1A3A2B','--hero1':'#17251D','--hero2':'rgba(22,163,106,.35)','--codebg':'#0C120F'}},
 arctic:{n:'Arctic Green',v:{'--bg':'#FFFFFF','--panel':'#F3F6F4','--panel2':'#FFFFFF','--green':'#16794C','--mint':'#16794C','--accent':'#16794C','--text':'#102D20','--soft':'#2C4A3A','--muted':'#4B6556','--line':'#E0E8E2','--line2':'#E0E8E2','--gold':'#9A6B00','--bad':'#C0392B','--on-green':'#FFFFFF','--on-gold':'#FFFFFF','--glow':'#E3F1E8','--hero1':'#F3F6F4','--hero2':'rgba(22,121,76,.18)','--codebg':'#EEF3F0'}},
 obsidian:{n:'Obsidian Luxe',v:{'--bg':'#090D0B','--panel':'#151C18','--panel2':'#1B241F','--green':'#087F5B','--mint':'#3FCB9B','--accent':'#3FCB9B','--text':'#F5F3EC','--soft':'#DAD7CC','--muted':'#A9AFA6','--line':'rgba(214,182,109,.24)','--line2':'#3A3526','--gold':'#D6B66D','--bad':'#FF8A8A','--on-green':'#FFFFFF','--on-gold':'#1B1405','--glow':'#17261F','--hero1':'#151C18','--hero2':'rgba(214,182,109,.22)','--codebg':'#0D120F'}},
 mono:{n:'Monochrome Green',v:{'--bg':'#FFFFFF','--panel':'#F0F0F0','--panel2':'#FFFFFF','--green':'#11865A','--mint':'#0D6F49','--accent':'#0D6F49','--text':'#252525','--soft':'#3A3A3A','--muted':'#5A5A5A','--line':'#B8B8B8','--line2':'#B8B8B8','--gold':'#8A6400','--bad':'#B3261E','--on-green':'#FFFFFF','--on-gold':'#FFFFFF','--glow':'#EDEDED','--hero1':'#F0F0F0','--hero2':'rgba(17,134,90,.16)','--codebg':'#EDEDED'}}
};
var KEY='techora_theme',DEF='emerald',cur=DEF;
try{var s=localStorage.getItem(KEY);if(s&&T[s])cur=s}catch(e){}
var st=document.createElement('style');st.id='cmat-vars';
function css(n){var v=T[n].v,o=':root{color-scheme:'+(n==='arctic'||n==='mono'?'light':'dark')+';';for(var k in v)o+=k+':'+v[k]+';';return o+'}'+
 'body{background:radial-gradient(ellipse at 80% 0,var(--glow) 0,transparent 36%),var(--bg)!important;color:var(--text)}'+
 '#cmatFab{position:fixed;left:14px;bottom:14px;z-index:9998;font-family:Cairo,system-ui,sans-serif}'+
 '#cmatFab>button{width:46px;height:46px;border-radius:50%;border:1px solid var(--line);background:var(--panel);color:var(--text);font-size:20px;cursor:pointer;box-shadow:0 6px 22px rgba(0,0,0,.3)}'+
 '#cmatPanel{display:none;position:absolute;left:0;bottom:56px;width:236px;padding:12px;border-radius:16px;border:1px solid var(--line);background:var(--panel);box-shadow:0 14px 40px rgba(0,0,0,.35)}'+
 '#cmatPanel.on{display:block}#cmatPanel h4{margin:0 0 8px;font-size:13px;color:var(--muted);font-weight:700}'+
 '#cmatPanel .o{display:flex;align-items:center;gap:10px;width:100%;margin:0 0 6px;padding:9px 10px;border-radius:12px;border:1px solid var(--line);background:transparent;color:var(--text);font:inherit;font-size:14px;font-weight:700;cursor:pointer;text-align:right}'+
 '#cmatPanel .o.sel{border-color:var(--green);background:color-mix(in srgb,var(--green) 16%,transparent)}'+
 '#cmatPanel .sw{display:flex;flex:none}#cmatPanel .sw i{width:14px;height:22px;display:block}#cmatPanel .sw i:first-child{border-radius:0 6px 6px 0}#cmatPanel .sw i:last-child{border-radius:6px 0 0 6px}'+
 '#cmatPanel a{display:block;margin-top:4px;padding:9px 10px;border-radius:12px;background:var(--green);color:var(--on-green);text-align:center;font-weight:800;text-decoration:none;font-size:14px}'}
function apply(n){cur=n;var eff=(document.documentElement.hasAttribute('data-cmat-dark')&&(n==='arctic'||n==='mono'))?'emerald':n;document.documentElement.setAttribute('data-theme',n);st.textContent=css(eff);
 var m=document.querySelector('meta[name=theme-color]');if(!m){m=document.createElement('meta');m.name='theme-color';document.head&&document.head.appendChild(m)}m.content=T[eff].v['--bg'];
 var p=document.getElementById('cmatPanel');if(p)[].forEach.call(p.querySelectorAll('.o'),function(b){b.classList.toggle('sel',b.dataset.t===n)})}
document.documentElement.appendChild(st);apply(cur);
(function(){var me=document.currentScript,b=me&&me.src?me.src.replace(/theme\.js.*$/,''):'';if(!b)return;
 try{document.write('<link rel="stylesheet" href="'+b+'glass.css"><script src="'+b+'glass.js" defer><\/script>')}catch(e){var l=document.createElement('link');l.rel='stylesheet';l.href=b+'glass.css';document.head.appendChild(l);var j=document.createElement('script');j.src=b+'glass.js';j.defer=true;document.head.appendChild(j)}})();
var TT=window.TTheme={list:T,get:function(){return cur},
 set:function(n,save){if(!T[n])return;apply(n);try{localStorage.setItem(KEY,n)}catch(e){}
  if(save!==false&&window.TData&&TData.saveTheme)TData.saveTheme(n)},
 /* اختيار محفوظ على الحساب: يُطبَّق بدون كتابته مجددًا */
 fromCloud:function(n){if(T[n]&&n!==cur){apply(n);try{localStorage.setItem(KEY,n)}catch(e){}}}};
function ui(){if(document.getElementById('cmatFab')||!document.body)return;
 var d=document.createElement('div');d.id='cmatFab';
 var h='<div id="cmatPanel"><h4>🎨 اختر السمة</h4>';
 for(var k in T){var v=T[k].v;h+='<button class="o'+(k===cur?' sel':'')+'" data-t="'+k+'"><span class="sw"><i style="background:'+v['--bg']+';border:1px solid #8886"></i><i style="background:'+v['--green']+'"></i><i style="background:'+(k==='obsidian'?v['--gold']:v['--mint'])+'"></i></span>'+T[k].n+'</button>'}
 var root=(document.querySelector('script[src*="assets/theme.js"]').getAttribute('src')||'').replace('assets/theme.js','');
 var tr=false;try{tr=localStorage.getItem('techora_role')==='teacher'}catch(e){}
 h+='<a href="'+root+(tr?'teacher.html':'dashboard.html')+'">📊 '+(tr?'لوحة المدرّس':'لوحة التحكم')+'</a></div><button id="cmatBtn" aria-label="السمات">🎨</button>';
 d.innerHTML=h;document.body.appendChild(d);
 document.getElementById('cmatBtn').onclick=function(e){e.stopPropagation();document.getElementById('cmatPanel').classList.toggle('on')};
 [].forEach.call(d.querySelectorAll('.o'),function(b){b.onclick=function(){TT.set(b.dataset.t)}});
 document.addEventListener('click',function(e){if(!d.contains(e.target))document.getElementById('cmatPanel').classList.remove('on')})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ui);else ui();
})();
