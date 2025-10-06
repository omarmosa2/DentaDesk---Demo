# سياسة الأمان - DentaDesk

## الإبلاغ عن مشاكل الأمان

نحن نأخذ أمان DentaDesk على محمل الجد. إذا اكتشفت ثغرة أمنية، يرجى إبلاغنا فوراً.

### كيفية الإبلاغ

**لا تفتح issue عامة للثغرات الأمنية!**

بدلاً من ذلك، يرجى:

1. إرسال بريد إلكتروني إلى: security@dentadesk.com
2. أو استخدام GitHub Security Advisories
3. أو التواصل معنا عبر GitHub Discussions

### ما يجب تضمينه في التقرير

- وصف مفصل للثغرة
- خطوات إعادة إنتاج المشكلة
- التأثير المحتمل
- أي حلول مؤقتة معروفة
- معلومات الاتصال (اختياري)

### استجابة الفريق

- سنرد خلال 48 ساعة
- سنعمل على إصلاح المشكلة في أقرب وقت ممكن
- سنعطيك الفضل في اكتشاف الثغرة (إذا رغبت)

## الثغرات المعروفة

### حالياً لا توجد ثغرات أمنية معروفة

إذا اكتشفت ثغرة، يرجى الإبلاغ عنها فوراً.

## إرشادات الأمان للمطورين

### عند المساهمة في الكود

1. **لا تضع أسرار في الكود**
   - استخدم متغيرات البيئة
   - لا ترفع ملفات `.env`
   - استخدم `.gitignore` بشكل صحيح

2. **تحقق من المدخلات**
   - استخدم validation
   - احم من SQL injection
   - احم من XSS attacks

3. **استخدم HTTPS دائماً**
   - في الإنتاج
   - في API calls
   - في authentication

4. **تحديث التبعيات**
   - راجع `npm audit` بانتظام
   - حدث التبعيات القديمة
   - استخدم `npm audit fix`

### أفضل الممارسات

#### إدارة البيانات الحساسة
```typescript
// ❌ خطأ - لا تضع أسرار في الكود
const API_KEY = "sk-1234567890abcdef"

// ✅ صحيح - استخدم متغيرات البيئة
const API_KEY = process.env.VITE_API_KEY
```

#### التحقق من المدخلات
```typescript
// ❌ خطأ - لا تثق في المدخلات
const userInput = req.body.data
const query = `SELECT * FROM users WHERE id = ${userInput}`

// ✅ صحيح - استخدم prepared statements
const userInput = req.body.data
const query = `SELECT * FROM users WHERE id = ?`
const result = await db.query(query, [userInput])
```

#### تشفير البيانات الحساسة
```typescript
// ✅ تشفير كلمات المرور
import bcrypt from 'bcrypt'

const hashedPassword = await bcrypt.hash(password, 10)
const isValid = await bcrypt.compare(password, hashedPassword)
```

## تحديثات الأمان

### كيفية الحصول على التحديثات

1. **اشترك في GitHub notifications**
2. **تابع CHANGELOG.md**
3. **راجع Security Advisories**

### تثبيت التحديثات

```bash
# تحديث التبعيات
npm update

# فحص الثغرات
npm audit

# إصلاح المشاكل
npm audit fix
```

## إعدادات الأمان الموصى بها

### للمطورين

1. **استخدم Git hooks**
   ```bash
   # pre-commit hook
   npm run lint
   npm run test
   ```

2. **فعّل 2FA على GitHub**
3. **استخدم SSH keys**
4. **راجع الكود قبل merge**

### للإنتاج

1. **استخدم HTTPS**
2. **فعّل CORS بشكل صحيح**
3. **استخدم Content Security Policy**
4. **راجع logs بانتظام**
5. **استخدم WAF إذا أمكن**

## التشفير

### البيانات المخزنة
- كلمات المرور: bcrypt
- البيانات الحساسة: AES-256
- الاتصالات: TLS 1.3

### المفاتيح
- استخدم مفاتيح قوية
- غيّر المفاتيح بانتظام
- احفظ المفاتيح في مكان آمن

## النسخ الاحتياطي

### تكرار النسخ الاحتياطي
- يومياً للبيانات المهمة
- أسبوعياً للنسخ الكاملة
- شهرياً للاختبار

### تخزين النسخ الاحتياطي
- في مكان منفصل
- مشفرة
- مع اختبار الاسترداد

## التدريب على الأمان

### للمطورين
- اقرأ OWASP Top 10
- تعلم secure coding practices
- شارك في security training

### للمستخدمين
- استخدم كلمات مرور قوية
- فعّل 2FA
- احذر من phishing

## الاتصال

للأسئلة حول الأمان:
- البريد الإلكتروني: security@dentadesk.com
- GitHub Discussions
- Issues (للمشاكل العامة فقط)

---

**ملاحظة**: هذه السياسة قد تتغير. يرجى مراجعتها بانتظام.
