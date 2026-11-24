# عدسة - مدونة التصوير

مشروع React + React Router + Vite.

## التشغيل
```bash
npm install
npm run dev
```

## البناء والنشر
```bash
npm run build
```
ملف `vercel.json` موجود عشان الـ routing يشتغل مع Vercel (أي رابط يرجع للـ index).

## الهيكل
- `/` الصفحة الرئيسية
- `/blog` المدونة: بحث، فلترة بالتصنيف (عن طريق query params)، Grid/List، Pagination (6 مقالات في الصفحة)
- `/blog/:slug` تفاصيل التدوينة
- `/about` من نحن
- `*` صفحة 404

البيانات في `src/data/posts.json` وبتتقرأ من `src/data/index.js`.
