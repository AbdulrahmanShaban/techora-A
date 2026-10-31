/* Techora — منطق تحليل أداء الطلاب (بدون واجهة). كل الأرقام تُحسب من نتائج Firestore الفعلية فقط. */
(function(){
var DEF={excellent:90,vgood:80,good:65,pass:60,minAttempts:3,inactiveDays:14};
var TYPES={mcq:'اختيار من متعدد',tf:'صح / خطأ',match:'التوصيل',order:'ترتيب الخطوات'};
var DAY=864e5;
var A=window.TAn={DEF:DEF,TYPES:TYPES,DAY:DAY,
 settings:function(){var s={};try{s=JSON.parse(localStorage.getItem('techora_teacher_settings')||'{}')}catch(e){}var o={};for(var k in DEF)o[k]=(typeof s[k]==='number'&&isFinite(s[k]))?s[k]:DEF[k];return o},
 saveSettings:function(s){try{localStorage.setItem('techora_teacher_settings',JSON.stringify(s))}catch(e){}},
 cat:function(id){return TData.find(id)||{id:id,title:id,grade:id.charAt(1)==='1'?'g1':'g2'}},
 shortTitle:function(id){var c=A.cat(id),i=TData.CAT.indexOf(c);return(c.grade==='g1'?'١':'٢')+'/'+((i<0?0:(c.grade==='g1'?i+1:i-9))) },
 mean:function(a){return a.length?a.reduce(function(x,y){return x+y},0)/a.length:null},
 round:function(x){return x==null?null:Math.round(x)},
 /* تصفية النتائج حسب المرشّحات: grade (all|g1|g2) – lesson – since(ms) – until(ms) */
 filterResults:function(rs,F){F=F||{};return rs.filter(function(r){
  if(F.grade&&F.grade!=='all'&&r.lessonId.indexOf(F.grade)!==0)return false;
  if(F.lesson&&F.lesson!=='all'&&r.lessonId!==F.lesson)return false;
  if(F.since&&r.at<F.since)return false;if(F.until&&r.at>=F.until)return false;return true})},
 stats:function(rs,S){var p=rs.map(function(r){return r.pct});var avg=A.mean(p);
  return{n:rs.length,avg:avg,passRate:rs.length?rs.filter(function(r){return r.pct>=S.pass}).length/rs.length*100:null,last:rs.length?Math.max.apply(null,rs.map(function(r){return r.at})):0,best:p.length?Math.max.apply(null,p):null}},
 /* تصنيف المستوى: لا يُصنَّف الطالب إلا إذا بلغت محاولاته الحد الأدنى */
 level:function(st,S){if(st.n<S.minAttempts)return{key:'na',label:'بيانات غير كافية',cls:'na'};
  var a=st.avg;return a>=S.excellent?{key:'ex',label:'ممتاز',cls:'ex'}:a>=S.vgood?{key:'vg',label:'جيد جدًا',cls:'vg'}:a>=S.good?{key:'gd',label:'جيد',cls:'gd'}:{key:'lw',label:'يحتاج إلى تحسين',cls:'lw'}},
 perLesson:function(rs){var m={};rs.forEach(function(r){var x=m[r.lessonId]||(m[r.lessonId]={id:r.lessonId,n:0,sum:0,best:0,last:0});x.n++;x.sum+=r.pct;x.best=Math.max(x.best,r.pct);x.last=Math.max(x.last,r.at)});
  return Object.keys(m).map(function(k){var x=m[k];x.avg=x.sum/x.n;return x})},
 perType:function(rs){var m={};rs.forEach(function(r){var b=r.byType||{};Object.keys(b).forEach(function(t){var x=m[t]||(m[t]={type:t,r:0,t:0});x.r+=b[t].r||0;x.t+=b[t].t||0})});
  return Object.keys(m).map(function(k){var x=m[k];x.rate=x.t?x.r/x.t*100:null;return x}).filter(function(x){return x.t>0})},
 wrongList:function(rs){var m={};rs.forEach(function(r){(r.wrong||[]).forEach(function(w){var k=w.q;var x=m[k]||(m[k]={q:w.q,t:w.t,n:0,lessons:{}});x.n++;x.lessons[r.lessonId]=1})});
  return Object.keys(m).map(function(k){return m[k]}).sort(function(a,b){return b.n-a.n})},
 /* نقاط القوة والضعف لطالب */
 strengths:function(rs,S){var pl=A.perLesson(rs);return{strong:pl.filter(function(x){return x.avg>=S.vgood}).sort(function(a,b){return b.avg-a.avg}),weak:pl.filter(function(x){return x.avg<S.good}).sort(function(a,b){return a.avg-b.avg}),all:pl}},
 /* الطلاب الذين يحتاجون متابعة، مع السبب */
 followUp:function(stu,rs,S,now){var st=A.stats(rs,S),why=[];now=now||Date.now();
  if(st.n===0)why.push('لم يبدأ أي اختبار');
  else{if(st.n>=S.minAttempts&&st.avg<S.good)why.push('متوسط منخفض ('+A.round(st.avg)+'%)');
   if((now-st.last)/DAY>=S.inactiveDays)why.push('لا نشاط منذ '+Math.floor((now-st.last)/DAY)+' يومًا')}
  return why},
 /* متوسط أسبوعي */
 weekly:function(rs){var m={};rs.forEach(function(r){var d=new Date(r.at);d.setHours(0,0,0,0);d.setDate(d.getDate()-((d.getDay()+1)%7));var k=d.getTime();(m[k]||(m[k]=[])).push(r.pct)});
  return Object.keys(m).map(Number).sort(function(a,b){return a-b}).map(function(k){return{t:k,y:A.mean(m[k]),n:m[k].length}})},
 fmtDate:function(ms){return ms?new Date(ms).toLocaleDateString('ar-EG',{year:'numeric',month:'short',day:'numeric'}):'—'},
 fmtDT:function(ms){return ms?new Date(ms).toLocaleString('ar-EG',{dateStyle:'medium',timeStyle:'short'}):'—'},
 ago:function(ms){if(!ms)return'لا يوجد نشاط';var d=Date.now()-ms,m=Math.floor(d/6e4);if(m<1)return'الآن';if(m<60)return'منذ '+m+' دقيقة';var h=Math.floor(m/60);if(h<24)return'منذ '+h+' ساعة';var dd=Math.floor(h/24);return dd<31?'منذ '+dd+' يوم':A.fmtDate(ms)}
};
})();
