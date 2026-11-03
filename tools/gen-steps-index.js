/* يولّد assets/steps-index.js: عدد وهوية خطوات كل درس (يُشغَّل بعد أي تعديل في محتوى الدروس).  node tools/gen-steps-index.js */
const fs=require('fs'),vm=require('vm'),path=require('path'),root=path.join(__dirname,'..');
const sb={window:{}};sb.window.window=sb.window;vm.createContext(sb);
vm.runInContext(fs.readFileSync(path.join(root,'assets/data.js'),'utf8'),sb);
vm.runInContext(fs.readFileSync(path.join(root,'assets/media.js'),'utf8'),sb);
const W=sb.window,out={},rep=[];
W.TData.CAT.forEach(c=>{const html=fs.readFileSync(path.join(root,c.path,'content.html'),'utf8');
 const m=html.match(/TLesson\.render\((.*)\)<\/script>/s);const lesson=JSON.parse(m[1]);
 const plan=W.TSteps.plan(lesson,!!(W.TMEDIA||{})[lesson.key]);
 out[c.id]={n:plan.length,ids:plan.map(s=>s.id),titles:plan.map(s=>s.title)};rep.push(c.id+' → '+plan.length+' أجزاء')});
fs.writeFileSync(path.join(root,'assets/steps-index.js'),'/* مُولَّد آليًا بواسطة tools/gen-steps-index.js — لا تعدّله يدويًا */\nwindow.TSTEPS_INDEX='+JSON.stringify(out)+';\n');
console.log(rep.join('\n'));
