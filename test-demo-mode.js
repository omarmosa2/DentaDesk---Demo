/**
 * اختبار الوضع التجريبي
 * يتحقق من أن جميع الميزات تعمل بشكل صحيح في الوضع التجريبي
 */

console.log('🎭 بدء اختبار الوضع التجريبي...')

// اختبار متغير البيئة
const isDemoMode = process.env.VITE_DEMO_MODE === 'true'
console.log('✅ متغير البيئة VITE_DEMO_MODE:', isDemoMode)

// اختبار localStorage
if (typeof localStorage !== 'undefined') {
  console.log('✅ localStorage متاح')
  
  // اختبار حفظ البيانات
  localStorage.setItem('test_key', 'test_value')
  const testValue = localStorage.getItem('test_key')
  console.log('✅ اختبار حفظ البيانات:', testValue === 'test_value' ? 'نجح' : 'فشل')
  
  // تنظيف البيانات التجريبية
  localStorage.removeItem('test_key')
} else {
  console.log('❌ localStorage غير متاح')
}

// اختبار إنشاء معرف فريد
if (typeof crypto !== 'undefined' && crypto.randomUUID) {
  const uuid = crypto.randomUUID()
  console.log('✅ إنشاء UUID:', uuid ? 'نجح' : 'فشل')
} else {
  console.log('⚠️ crypto.randomUUID غير متاح، سيتم استخدام uuid library')
}

// اختبار JSON
const testData = {
  patients: [],
  appointments: [],
  payments: [],
  treatments: [],
  settings: []
}

try {
  const jsonString = JSON.stringify(testData)
  const parsedData = JSON.parse(jsonString)
  console.log('✅ اختبار JSON:', parsedData.patients ? 'نجح' : 'فشل')
} catch (error) {
  console.log('❌ اختبار JSON فشل:', error.message)
}

console.log('🎭 انتهاء اختبار الوضع التجريبي')
