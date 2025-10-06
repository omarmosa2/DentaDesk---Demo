# دليل النشر - DentaDesk

## نظرة عامة
هذا الدليل يوضح كيفية نشر تطبيق DentaDesk على منصات مختلفة.

## المتطلبات الأساسية
- Node.js 18 أو أحدث
- npm أو yarn
- Git

## 1. النشر على Vercel

### الطريقة الأولى: النشر التلقائي
1. اربط المستودع مع Vercel:
   - اذهب إلى [vercel.com](https://vercel.com)
   - اضغط على "New Project"
   - اختر المستودع من GitHub
   - Vercel سيكتشف الإعدادات تلقائياً

### الطريقة الثانية: النشر اليدوي
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel --prod
```

### إعدادات Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Framework Preset**: Vite

## 2. النشر على Netlify

### الطريقة الأولى: النشر التلقائي
1. اربط المستودع مع Netlify:
   - اذهب إلى [netlify.com](https://netlify.com)
   - اضغط على "New site from Git"
   - اختر المستودع

### الطريقة الثانية: النشر اليدوي
```bash
# تثبيت Netlify CLI
npm i -g netlify-cli

# تسجيل الدخول
netlify login

# النشر
netlify deploy --prod --dir=dist
```

## 3. النشر على GitHub Pages

### إعداد GitHub Actions
1. أنشئ ملف `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. فعّل GitHub Pages في إعدادات المستودع

## 4. النشر على Firebase Hosting

```bash
# تثبيت Firebase CLI
npm i -g firebase-tools

# تسجيل الدخول
firebase login

# تهيئة المشروع
firebase init hosting

# النشر
firebase deploy
```

## 5. النشر على AWS S3 + CloudFront

```bash
# تثبيت AWS CLI
# تكوين AWS credentials

# رفع الملفات
aws s3 sync dist/ s3://your-bucket-name --delete

# إنشاء CloudFront distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## 6. استخدام سكريبت النشر

### للويندوز
```cmd
deploy.bat
```

### للينكس/ماك
```bash
chmod +x deploy.sh
./deploy.sh
```

## 7. إعدادات البيئة

### متغيرات البيئة المطلوبة
أنشئ ملف `.env.local`:

```env
VITE_APP_NAME=DentaDesk
VITE_APP_VERSION=2.1.0
VITE_DEMO_MODE=false
VITE_API_BASE_URL=https://your-api-domain.com
```

### متغيرات Vercel
في لوحة تحكم Vercel، أضف:
- `VITE_APP_NAME`: DentaDesk
- `VITE_APP_VERSION`: 2.1.0
- `VITE_DEMO_MODE`: false

## 8. تحسينات الأداء

### تحسين Vite
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog'],
        }
      }
    }
  }
})
```

### تحسين الصور
- استخدم WebP format
- ضغط الصور قبل الرفع
- استخدم lazy loading

## 9. استكشاف الأخطاء

### مشاكل شائعة

#### خطأ في البناء
```bash
# تنظيف node_modules
rm -rf node_modules package-lock.json
npm install

# إعادة البناء
npm run build
```

#### خطأ في المسارات
تأكد من أن `base: './'` موجود في `vite.config.ts`

#### خطأ في الاستيراد
تأكد من أن جميع المسارات صحيحة وملفات موجودة

## 10. مراقبة الأداء

### أدوات المراقبة
- Vercel Analytics
- Google Analytics
- Sentry للخطأ

### مؤشرات الأداء
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

## 11. النسخ الاحتياطي

### نسخ احتياطي للبيانات
```bash
# نسخ احتياطي لقاعدة البيانات
cp database.db backup/database-$(date +%Y%m%d).db
```

### نسخ احتياطي للمشروع
```bash
# إنشاء أرشيف
tar -czf dentadesk-backup-$(date +%Y%m%d).tar.gz .
```

## 12. الأمان

### إعدادات الأمان
- استخدم HTTPS دائماً
- فعّل CORS بشكل صحيح
- استخدم متغيرات البيئة للأسرار
- فعّل Content Security Policy

### تحديثات الأمان
```bash
# فحص التبعيات
npm audit

# إصلاح المشاكل
npm audit fix
```

---

## الدعم

للحصول على المساعدة في النشر:
- فتح issue في GitHub
- مراجعة الوثائق الرسمية للمنصة
- التواصل مع فريق الدعم

---

**ملاحظة**: تأكد من اختبار التطبيق محلياً قبل النشر على الإنتاج.
