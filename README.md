# DentaDesk - نظام إدارة العيادات السنية

## نظرة عامة
DentaDesk هو نظام شامل لإدارة العيادات السنية يوفر حلول متكاملة لإدارة المرضى، المواعيد، المدفوعات، والتقارير.

## المميزات الرئيسية
- 🏥 إدارة المرضى والملفات الطبية
- 📅 نظام حجز المواعيد المتقدم
- 💰 إدارة المدفوعات والفواتير
- 📊 تقارير شاملة وإحصائيات
- 🔐 نظام أمان متقدم
- 📱 واجهة مستخدم حديثة وسهلة الاستخدام

## التقنيات المستخدمة
- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Radix UI, Tailwind CSS
- **State Management**: Zustand
- **Charts**: Recharts
- **PDF Generation**: jsPDF, PDFKit
- **Excel Export**: ExcelJS
- **QR Codes**: qrcode, jsbarcode

## التثبيت والتشغيل

### المتطلبات
- Node.js 18+ 
- npm أو yarn

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/yourusername/dentadesk.git
cd dentadesk
```

2. **تثبيت التبعيات**
```bash
npm install
```

3. **تشغيل المشروع في وضع التطوير**
```bash
npm run dev
```

4. **بناء المشروع للإنتاج**
```bash
npm run build
```

5. **معاينة الإنتاج**
```bash
npm run preview
```

## النشر على Vercel

### النشر التلقائي
1. اربط المستودع مع Vercel
2. Vercel سيقوم ببناء ونشر المشروع تلقائياً

### النشر اليدوي
```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel --prod
```

## هيكل المشروع

```
src/
├── components/          # مكونات React
├── pages/              # صفحات التطبيق
├── services/           # خدمات API
├── utils/              # أدوات مساعدة
├── types/              # تعريفات TypeScript
├── hooks/              # React Hooks
└── styles/             # ملفات CSS
```

## المتغيرات البيئية

أنشئ ملف `.env.local` في الجذر:

```env
VITE_APP_NAME=DentaDesk
VITE_APP_VERSION=2.1.0
VITE_DEMO_MODE=false
```

## المساهمة

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## الدعم

للحصول على الدعم، يرجى فتح issue في GitHub أو التواصل معنا عبر البريد الإلكتروني.

## الإصدارات

- **v2.1.0** - الإصدار الحالي
- **v2.0.0** - إعادة هيكلة شاملة
- **v1.0.0** - الإصدار الأول

---

تم تطوير هذا المشروع بواسطة فريق DentaDesk 💙