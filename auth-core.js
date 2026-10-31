(function(){
  var c=window.TECHORA_FIREBASE||{};
  window.TA={configured:!!(c.apiKey&&c.apiKey.indexOf('PASTE')!==0),auth:null};
  if(window.TA.configured&&window.firebase){
    firebase.initializeApp(c);
    window.TA.auth=firebase.auth();
    window.TA.auth.useDeviceLanguage();
  }
})();
