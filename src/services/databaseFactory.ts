import { DatabaseService } from './databaseService'
import { MockDatabaseService } from './mockDatabaseService'

/**
 * مصنع قاعدة البيانات - يختار بين SQLite والوضع التجريبي
 */
export class DatabaseFactory {
  private static instance: DatabaseService | MockDatabaseService | null = null

  /**
   * الحصول على خدمة قاعدة البيانات المناسبة
   */
  static getDatabaseService(): DatabaseService | MockDatabaseService {
    if (this.instance) {
      return this.instance
    }

    // التحقق من الوضع التجريبي
    const isDemoMode = this.isDemoMode()
    
    if (isDemoMode) {
      console.log('🎭 Demo Mode: Using Mock Database Service')
      this.instance = new MockDatabaseService()
    } else {
      console.log('🗄️ Production Mode: Using SQLite Database Service')
      this.instance = new DatabaseService()
    }

    return this.instance
  }

  /**
   * التحقق من الوضع التجريبي
   */
  private static isDemoMode(): boolean {
    // التحقق من متغير البيئة
    if (typeof __DEMO_MODE__ !== 'undefined') {
      return __DEMO_MODE__ === true
    }

    // التحقق من متغير البيئة في runtime
    if (typeof window !== 'undefined' && window.location) {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('demo') === 'true') {
        return true
      }
    }

    // التحقق من localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const demoMode = localStorage.getItem('VITE_DEMO_MODE')
        if (demoMode === 'true') {
          return true
        }
      } catch (error) {
        console.warn('Failed to check localStorage for demo mode:', error)
      }
    }

    return false
  }

  /**
   * إعادة تعيين المثيل (للاستخدام في الاختبارات)
   */
  static resetInstance(): void {
    this.instance = null
  }

  /**
   * الحصول على معلومات الوضع الحالي
   */
  static getModeInfo(): { isDemo: boolean; mode: string } {
    const isDemo = this.isDemoMode()
    return {
      isDemo,
      mode: isDemo ? 'Demo (Mock Database)' : 'Production (SQLite)'
    }
  }
}

// تصدير دالة مساعدة للحصول على خدمة قاعدة البيانات
export const getDatabaseService = () => DatabaseFactory.getDatabaseService()

// تصدير دالة للتحقق من الوضع التجريبي
export const isDemoMode = () => DatabaseFactory.getModeInfo().isDemo
