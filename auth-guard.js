// حماية الصفحات: لو مفيش مستخدم مسجّل يتحوّل لصفحة الدخول
(function(){
  var s=document.currentScript, root=s.getAttribute('data-root')||'';
  var h=document.documentElement; h.style.visibility='hidden';
  function go(){var seg=location.pathname.split('/');var n=root?seg.slice(-2).join('/'):seg.pop();location.replace(root+'login.html?next='+encodeURIComponent(n));}
  if(!window.TA||!TA.auth){go();return;}
  TA.auth.onAuthStateChanged(function(u){
    if(!u){go();return;}
    h.style.visibility='visible';
    var el=document.getElementById('techoraUser'); if(el) el.textContent=u.displayName||u.email||u.phoneNumber||'';
  });
  window.techoraLogout=function(){TA.auth.signOut().then(function(){location.replace(root+'login.html');});};
})();
