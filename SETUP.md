# تشغيل تسجيل الدخول (Firebase)
1. ادخل console.firebase.google.com > Add project (مجاني).
2. Build > Authentication > Get started > Sign-in method، وفعّل: Email/Password و Google.
3. Authentication > Settings > Authorized domains: ضيف دومين موقعك (مثلا yourname.netlify.app). localhost مضاف تلقائيًا.
4. Project settings > Your apps > Web (</>) وانسخ البيانات في firebase-config.js.
5. (اختياري) Authentication > Templates: عدّل رسالة "Password reset" بالعربي واسم Techora.
ملحوظة: Google/Facebook والاستعادة مش بيشتغلوا لو فتحت الملف مباشرة من الجهاز (file://)؛ استخدم الاستضافة أو localhost.
