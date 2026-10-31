/**
 * Techora — تسجيل عمليات الدخول الناجحة في Google Sheets
 * - يتحقق من توكن Firebase (idToken) عن طريق Identity Toolkit، فلا يعتمد على إخفاء الرابط.
 * - الاسم والإيميل و UID تُؤخذ من رد Firebase الموثوق وليس من المتصفح.
 * - loginId يمنع تكرار نفس السجل عند إعادة المحاولة.
 */
var FIREBASE_API_KEY = 'PASTE_YOUR_FIREBASE_WEB_API_KEY';   // نفس apiKey في firebase-config.js
var SHEET_NAME = 'Logins';
var TZ = 'Africa/Cairo';

function doPost(e) {
  var out = function (o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); };
  try {
    var b = JSON.parse(e.postData.contents);
    if (!b.idToken || !b.loginId || String(b.loginId).length > 80) return out({ ok: false, error: 'bad-request' });

    var r = UrlFetchApp.fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + FIREBASE_API_KEY, {
      method: 'post', contentType: 'application/json', muteHttpExceptions: true,
      payload: JSON.stringify({ idToken: b.idToken })
    });
    if (r.getResponseCode() !== 200) return out({ ok: false, error: 'unauthorized' });
    var u = (JSON.parse(r.getContentText()).users || [])[0];
    if (!u || (b.uid && b.uid !== u.localId)) return out({ ok: false, error: 'unauthorized' });

    var lock = LockService.getScriptLock(); lock.waitLock(15000);
    try {
      var cache = CacheService.getScriptCache(), key = 'li_' + u.localId + '_' + b.loginId;
      if (cache.get(key)) return out({ ok: true, duplicate: true });
      var sh = getSheet_();
      // فحص إضافي ضد التكرار: آخر 200 صف
      var last = sh.getLastRow(), start = Math.max(2, last - 199);
      if (last >= 2) {
        var ids = sh.getRange(start, 7, last - start + 1, 1).getValues();
        for (var i = 0; i < ids.length; i++) if (ids[i][0] === b.loginId) { cache.put(key, '1', 21600); return out({ ok: true, duplicate: true }); }
      }
      var method = ({ 'password': 'إيميل وكلمة مرور', 'google.com': 'Google' })[String(b.method)] || String(b.method || '').slice(0, 30);
      sh.appendRow([new Date(), u.displayName || '', u.email || '', u.localId, method, 'تسجيل دخول ناجح', b.loginId]);
      cache.put(key, '1', 21600);
      return out({ ok: true });
    } finally { lock.releaseLock(); }
  } catch (err) { return out({ ok: false, error: 'server' }); }
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['التاريخ والوقت', 'الاسم', 'البريد الإلكتروني', 'Firebase UID', 'طريقة الدخول', 'الحالة', 'loginId']);
    sh.setFrozenRows(1); sh.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
  }
  return sh;
}
