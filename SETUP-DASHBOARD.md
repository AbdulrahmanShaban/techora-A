# إعداد لوحة التحكم + Firestore + Google Sheets

## 1) Firestore
1. Firebase Console ← Build ← Firestore Database ← Create database (Production mode).
2. تبويب Rules ← امسح المحتوى والصق محتوى ملف `firestore.rules` ← Publish.

## 2) Google Sheets
1. أنشئ Google Sheet جديد ← Extensions ← Apps Script.
2. الصق محتوى `apps-script/Code.gs` وغيّر `FIREBASE_API_KEY` لنفس apiKey في firebase-config.js.
3. Deploy ← New deployment ← Web app ← Execute as: Me ← Who has access: Anyone ← Deploy، وانسخ الرابط.
4. الصق الرابط في `techora-config.js` داخل `url:""`.
5. السكربت لا يقبل أي سجل إلا بتوكن Firebase صالح، ويأخذ الاسم والإيميل من Firebase نفسه.

## 3) النشر
ارفع كل ملفات المجلد (جديد: dashboard.html, techora-config.js, firestore.rules, apps-script/, assets/theme.js, assets/data.js).
