/* Techora Glass — تأثيرات تفاعلية: ميل 3D خفيف + توهّج يتبع المؤشر + تأخير ظهور متدرّج. */
(function(){
var G='.card,.wrap .hero,.acc,.hud,.q,.res,.fig,.vid,.screen-card,.project-card,.float-chip,.lesson,.stat,.clcard,.bd,.rolebtn,.filters,#side';
var T='.screen-card,.project-card,.lesson,.stat,.bd,.vid,.fig,.rolebtn,.card';
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches,calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(document.documentElement.hasAttribute('data-cmat-dark'))return;
function stagger(root){[].forEach.call((root||document).querySelectorAll(G),function(e){if(e.dataset.gi)return;var p=e.parentElement,i=0;if(p){var s=[].filter.call(p.children,function(c){return c.matches(G)});i=Math.min(s.indexOf(e),8)}e.dataset.gi=1;e.style.setProperty('--i',Math.max(i,0))})}
function eligible(e){var r=e.getBoundingClientRect();return e.matches(T)&&r.width<560&&r.height<380}
function init(){stagger();
 if(!fine)return;
 document.addEventListener('pointermove',function(ev){var e=ev.target.closest&&ev.target.closest(G);if(!e)return;var r=e.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width,y=(ev.clientY-r.top)/r.height;
  e.style.setProperty('--mx',(x*100).toFixed(1)+'%');e.style.setProperty('--my',(y*100).toFixed(1)+'%');
  if(!calm&&eligible(e)){e.classList.add('gl-t','gl-hv');e.style.setProperty('--ry',((x-.5)*7).toFixed(2)+'deg');e.style.setProperty('--rx',((.5-y)*6).toFixed(2)+'deg')}},{passive:true});
 document.addEventListener('pointerout',function(ev){var e=ev.target.closest&&ev.target.closest('.gl-t');if(e&&!e.contains(ev.relatedTarget)){e.style.setProperty('--rx','0deg');e.style.setProperty('--ry','0deg');e.classList.remove('gl-hv')}},{passive:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
/* عناصر تُضاف لاحقًا (محتوى الدروس واللعبة) */
if(window.MutationObserver)new MutationObserver(function(m){stagger()}).observe(document.documentElement,{childList:true,subtree:true});
})();
