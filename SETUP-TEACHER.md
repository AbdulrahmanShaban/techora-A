# إعداد حسابات المدرّسين (Teacher Dashboard + Student Analytics)

## 1) انشر قواعد Firestore الجديدة (إجباري)
Firebase Console ← Firestore Database ← Rules ← امسح الموجود والصق محتوى `firestore.rules` ← Publish.
> القواعد الجديدة هي اللي بتمنع الطالب من وظائف المدرّس، وبتمنع المدرّس من رؤية أي طالب لم ينضم لفصله.

## 2) ارفع الملفات
ارفع محتوى Techora.zip كله. الجديد: teacher.html, teacher-students.html, teacher-reports.html,
assets/teacher.js, assets/teacher.css, assets/analytics.js وتعديلات login.html, dashboard.html, assets/data.js, assets/game.js.

## 3) حسابك كمدرّس
- حساب جديد: سجّل ← اختر «أنا مدرّس».
- حسابك القديم (بدون نوع): ادخل لوحة الطالب، هتلاقي بطاقة «حدّد نوع حسابك» ← اختر «أنا مدرّس» (مرة واحدة ولا تتغيّر).

## 4) إنشاء فصل وربط الطلاب
المدرّس: لوحة المتابعة ← «فصولي» ← اسم الفصل ← إنشاء ← انسخ الكود.
الطالب: لوحة التحكم ← «فصولي» ← يكتب الكود ← انضم.
المدرّس يرى فقط الطلاب الذين انضمّوا بأنفسهم.

## 5) التقارير PDF
من صفحة التقارير ← إنشاء ← «طباعة / حفظ PDF» ← اختر «حفظ كـ PDF» من نافذة الطباعة.
