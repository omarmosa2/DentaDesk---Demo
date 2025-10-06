import { v4 as uuidv4 } from 'uuid'
import type {
  Patient,
  Appointment,
  Payment,
  Treatment,
  InventoryItem,
  ClinicSettings,
  DashboardStats,
  Lab,
  LabOrder
} from '../types'

/**
 * خدمة البيانات الوهمية للوضع التجريبي
 * تستخدم localStorage لتخزين البيانات مؤقتاً
 */
export class MockDatabaseService {
  private storageKey = 'dental_clinic_demo_data'
  public db: any = null // Mock database object for compatibility
  private data: {
    patients: Patient[]
    appointments: Appointment[]
    payments: Payment[]
    treatments: Treatment[]
    inventory: InventoryItem[]
    settings: ClinicSettings[]
    labs: Lab[]
    labOrders: LabOrder[]
    installmentPayments: any[]
    patientImages: any[]
    inventoryUsage: any[]
  }

  constructor() {
    this.data = this.loadFromStorage()
    this.initializeDefaultData()
  }

  /**
   * تحميل البيانات من localStorage
   */
  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.warn('Failed to load data from localStorage:', error)
    }

    return {
      patients: [],
      appointments: [],
      payments: [],
      treatments: this.getDefaultTreatments(),
      inventory: [],
      settings: [this.getDefaultSettings()],
      labs: [],
      labOrders: [],
      installmentPayments: [],
      patientImages: [],
      inventoryUsage: []
    }
  }

  /**
   * حفظ البيانات في localStorage
   */
  private saveToStorage() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data))
    } catch (error) {
      console.warn('Failed to save data to localStorage:', error)
    }
  }

  /**
   * تهيئة البيانات الافتراضية
   */
  private initializeDefaultData() {
    if (this.data.patients.length === 0) {
      // إضافة بعض المرضى التجريبيين
      this.data.patients = [
        {
          id: uuidv4(),
          serial_number: 'P001',
          full_name: 'أحمد محمد علي',
          gender: 'male',
          age: 35,
          patient_condition: 'عادي',
          allergies: 'لا يوجد',
          medical_conditions: 'لا يوجد',
          email: 'ahmed@example.com',
          address: 'دمشق، سوريا',
          notes: 'مريض منتظم',
          phone: '0912345678',
          date_added: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: uuidv4(),
          serial_number: 'P002',
          full_name: 'فاطمة أحمد',
          gender: 'female',
          age: 28,
          patient_condition: 'عادي',
          allergies: 'لا يوجد',
          medical_conditions: 'لا يوجد',
          email: 'fatima@example.com',
          address: 'حلب، سوريا',
          notes: 'تحتاج متابعة',
          phone: '0912345679',
          date_added: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]
    }

    if (this.data.appointments.length === 0) {
      // إضافة بعض المواعيد التجريبية
      const tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      this.data.appointments = [
        {
          id: uuidv4(),
          patient_id: this.data.patients[0].id,
          treatment_id: this.data.treatments[0].id,
          start_time: tomorrow.toISOString(),
          end_time: new Date(tomorrow.getTime() + 30 * 60000).toISOString(),
          status: 'scheduled',
          notes: 'فحص دوري',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          patient: this.data.patients[0],
          treatment: this.data.treatments[0]
        }
      ]
    }

    if (this.data.payments.length === 0) {
      // إضافة بعض المدفوعات التجريبية
      this.data.payments = [
        {
          id: uuidv4(),
          patient_id: this.data.patients[0].id,
          appointment_id: this.data.appointments[0].id,
          amount: 150,
          payment_method: 'نقد',
          payment_date: new Date().toISOString(),
          status: 'completed',
          receipt_number: 'R001',
          description: 'فحص عام',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          patient: this.data.patients[0],
          appointment: this.data.appointments[0]
        }
      ]
    }

    this.saveToStorage()
  }

  /**
   * الحصول على العلاجات الافتراضية
   */
  private getDefaultTreatments(): Treatment[] {
    const now = new Date().toISOString()
    return [
      {
        id: uuidv4(),
        name: 'فحص عام',
        description: 'فحص شامل للأسنان واللثة',
        default_cost: 100,
        duration_minutes: 30,
        category: 'العلاجات الوقائية',
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'تنظيف الأسنان',
        description: 'تنظيف وتلميع الأسنان',
        default_cost: 150,
        duration_minutes: 45,
        category: 'العلاجات الوقائية',
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'حشو الأسنان',
        description: 'حشو الأسنان المتضررة',
        default_cost: 200,
        duration_minutes: 60,
        category: 'الترميمية (المحافظة)',
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'قلع الأسنان',
        description: 'إجراء إزالة الأسنان',
        default_cost: 200,
        duration_minutes: 45,
        category: 'العلاجات الجراحية',
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'تاج الأسنان',
        description: 'إجراء تركيب تاج الأسنان',
        default_cost: 800,
        duration_minutes: 120,
        category: 'التعويضات',
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'علاج العصب',
        description: 'علاج عصب الأسنان',
        default_cost: 600,
        duration_minutes: 90,
        category: 'علاج العصب',
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'تبييض الأسنان',
        description: 'تبييض الأسنان المهني',
        default_cost: 300,
        duration_minutes: 60,
        category: 'العلاجات التجميلية',
        created_at: now,
        updated_at: now
      }
    ]
  }

  /**
   * الحصول على الإعدادات الافتراضية
   */
  private getDefaultSettings(): ClinicSettings {
    const now = new Date().toISOString()
    return {
      id: uuidv4(),
      clinic_name: 'عيادة الأسنان التجريبية',
      doctor_name: 'د. محمد أحمد',
      clinic_address: 'دمشق، سوريا',
      clinic_phone: '0112345678',
      clinic_email: 'info@dentalclinic.com',
      clinic_logo: '',
      currency: 'SYP',
      language: 'ar',
      timezone: 'Asia/Damascus',
      backup_frequency: 'daily',
      auto_save_interval: 300,
      appointment_duration: 30,
      working_hours_start: '08:00',
      working_hours_end: '18:00',
      working_days: 'السبت,الأحد,الاثنين,الثلاثاء,الأربعاء',
      app_password: null,
      password_enabled: 0,
      whatsapp_reminder_enabled: 0,
      whatsapp_reminder_hours_before: 3,
      whatsapp_reminder_minutes_before: 180,
      whatsapp_reminder_message: 'مرحبًا {{patient_name}}، تذكير بموعدك في عيادة الأسنان بتاريخ {{appointment_date}} الساعة {{appointment_time}}. نشكرك على التزامك.',
      whatsapp_reminder_custom_enabled: 0,
      created_at: now,
      updated_at: now
    }
  }

  // ===== عمليات المرضى =====

  async getAllPatients(): Promise<Patient[]> {
    return [...this.data.patients]
  }

  async getPatientById(id: string): Promise<Patient | null> {
    return this.data.patients.find(p => p.id === id) || null
  }

  async createPatient(patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>): Promise<Patient> {
    const now = new Date().toISOString()
    const newPatient: Patient = {
      ...patient,
      id: uuidv4(),
      created_at: now,
      updated_at: now
    }
    
    this.data.patients.push(newPatient)
    this.saveToStorage()
    return newPatient
  }

  async updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | null> {
    const index = this.data.patients.findIndex(p => p.id === id)
    if (index === -1) return null

    this.data.patients[index] = {
      ...this.data.patients[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveToStorage()
    return this.data.patients[index]
  }

  async deletePatient(id: string): Promise<boolean> {
    const initialLength = this.data.patients.length
    
    // حذف المريض
    this.data.patients = this.data.patients.filter(p => p.id !== id)
    
    // حذف المواعيد المرتبطة
    this.data.appointments = this.data.appointments.filter(a => a.patient_id !== id)
    
    // حذف المدفوعات المرتبطة
    this.data.payments = this.data.payments.filter(p => p.patient_id !== id)
    
    this.saveToStorage()
    return this.data.patients.length < initialLength
  }

  async searchPatients(query: string): Promise<Patient[]> {
    const searchTerm = query.toLowerCase()
    return this.data.patients.filter(patient =>
      patient.full_name.toLowerCase().includes(searchTerm) ||
      patient.phone?.toLowerCase().includes(searchTerm) ||
      patient.email?.toLowerCase().includes(searchTerm) ||
      patient.serial_number?.toLowerCase().includes(searchTerm)
    )
  }

  // ===== عمليات المواعيد =====

  async getAllAppointments(): Promise<Appointment[]> {
    return this.data.appointments.map(appointment => ({
      ...appointment,
      patient: this.data.patients.find(p => p.id === appointment.patient_id),
      treatment: this.data.treatments.find(t => t.id === appointment.treatment_id)
    }))
  }

  async createAppointment(appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>): Promise<Appointment> {
    const now = new Date().toISOString()
    const newAppointment: Appointment = {
      ...appointment,
      id: uuidv4(),
      created_at: now,
      updated_at: now
    }
    
    this.data.appointments.push(newAppointment)
    this.saveToStorage()
    return newAppointment
  }

  async updateAppointment(id: string, updates: Partial<Appointment>): Promise<Appointment | null> {
    const index = this.data.appointments.findIndex(a => a.id === id)
    if (index === -1) return null

    this.data.appointments[index] = {
      ...this.data.appointments[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveToStorage()
    return this.data.appointments[index]
  }

  async deleteAppointment(id: string): Promise<boolean> {
    const initialLength = this.data.appointments.length
    this.data.appointments = this.data.appointments.filter(a => a.id !== id)
    
    this.saveToStorage()
    return this.data.appointments.length < initialLength
  }

  async getAppointmentsByPatient(patientId: string): Promise<Appointment[]> {
    return this.data.appointments
      .filter(a => a.patient_id === patientId)
      .map(appointment => ({
        ...appointment,
        patient: this.data.patients.find(p => p.id === appointment.patient_id),
        treatment: this.data.treatments.find(t => t.id === appointment.treatment_id)
      }))
  }

  async checkAppointmentConflict(startTime: string, endTime: string, excludeId?: string): Promise<boolean> {
    const start = new Date(startTime)
    const end = new Date(endTime)
    
    return this.data.appointments.some(appointment => {
      if (excludeId && appointment.id === excludeId) return false
      
      const appointmentStart = new Date(appointment.start_time)
      const appointmentEnd = new Date(appointment.end_time)
      
      return (start < appointmentEnd && end > appointmentStart)
    })
  }

  async ensureToothTreatmentIdColumn(): Promise<void> {
    // Mock implementation - no database columns to ensure
    return Promise.resolve()
  }

  // ===== عمليات المدفوعات =====

  async getAllPayments(): Promise<Payment[]> {
    return this.data.payments.map(payment => ({
      ...payment,
      patient: this.data.patients.find(p => p.id === payment.patient_id),
      appointment: this.data.appointments.find(a => a.id === payment.appointment_id)
    }))
  }

  async createPayment(payment: Omit<Payment, 'id' | 'created_at' | 'updated_at'>): Promise<Payment> {
    const now = new Date().toISOString()
    const newPayment: Payment = {
      ...payment,
      id: uuidv4(),
      created_at: now,
      updated_at: now
    }
    
    this.data.payments.push(newPayment)
    this.saveToStorage()
    return newPayment
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | null> {
    const index = this.data.payments.findIndex(p => p.id === id)
    if (index === -1) return null

    this.data.payments[index] = {
      ...this.data.payments[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveToStorage()
    return this.data.payments[index]
  }

  async deletePayment(id: string): Promise<boolean> {
    const initialLength = this.data.payments.length
    this.data.payments = this.data.payments.filter(p => p.id !== id)
    
    this.saveToStorage()
    return this.data.payments.length < initialLength
  }

  async getPaymentsByPatient(patientId: string): Promise<Payment[]> {
    return this.data.payments
      .filter(p => p.patient_id === patientId)
      .map(payment => ({
        ...payment,
        patient: this.data.patients.find(p => p.id === payment.patient_id),
        appointment: this.data.appointments.find(a => a.id === payment.appointment_id)
      }))
  }

  async getPaymentsByToothTreatment(toothTreatmentId: string): Promise<Payment[]> {
    return this.data.payments
      .filter(p => p.tooth_treatment_id === toothTreatmentId)
      .map(payment => ({
        ...payment,
        patient: this.data.patients.find(p => p.id === payment.patient_id),
        appointment: this.data.appointments.find(a => a.id === payment.appointment_id)
      }))
  }

  async getToothTreatmentPaymentSummary(toothTreatmentId: string): Promise<any> {
    const payments = this.data.payments.filter(p => p.tooth_treatment_id === toothTreatmentId)
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)
    const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)
    
    return {
      totalPaid,
      totalPending,
      paymentCount: payments.length,
      lastPaymentDate: payments.length > 0 ? payments[payments.length - 1].payment_date : null
    }
  }

  async searchPayments(query: string): Promise<Payment[]> {
    const searchTerm = query.toLowerCase()
    return this.data.payments
      .filter(payment => {
        const patient = this.data.patients.find(p => p.id === payment.patient_id)
        const patientName = patient ? patient.full_name : ''
        
        return (
          payment.receipt_number?.toLowerCase().includes(searchTerm) ||
          payment.description?.toLowerCase().includes(searchTerm) ||
          patientName.toLowerCase().includes(searchTerm) ||
          payment.amount.toString().includes(query) ||
          payment.payment_method.toLowerCase().includes(searchTerm) ||
          payment.status.toLowerCase().includes(searchTerm)
        )
      })
      .map(payment => ({
        ...payment,
        patient: this.data.patients.find(p => p.id === payment.patient_id),
        appointment: this.data.appointments.find(a => a.id === payment.appointment_id)
      }))
  }

  // ===== عمليات العلاجات =====

  async getAllTreatments(): Promise<Treatment[]> {
    return [...this.data.treatments]
  }

  async createTreatment(treatment: Omit<Treatment, 'id' | 'created_at' | 'updated_at'>): Promise<Treatment> {
    const now = new Date().toISOString()
    const newTreatment: Treatment = {
      ...treatment,
      id: uuidv4(),
      created_at: now,
      updated_at: now
    }
    
    this.data.treatments.push(newTreatment)
    this.saveToStorage()
    return newTreatment
  }

  async updateTreatment(id: string, updates: Partial<Treatment>): Promise<Treatment | null> {
    const index = this.data.treatments.findIndex(t => t.id === id)
    if (index === -1) return null

    this.data.treatments[index] = {
      ...this.data.treatments[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveToStorage()
    return this.data.treatments[index]
  }

  async deleteTreatment(id: string): Promise<boolean> {
    const initialLength = this.data.treatments.length
    this.data.treatments = this.data.treatments.filter(t => t.id !== id)
    
    this.saveToStorage()
    return this.data.treatments.length < initialLength
  }

  async searchTreatments(query: string): Promise<Treatment[]> {
    const searchTerm = query.toLowerCase()
    return this.data.treatments.filter(treatment =>
      treatment.name.toLowerCase().includes(searchTerm) ||
      treatment.description?.toLowerCase().includes(searchTerm) ||
      treatment.category?.toLowerCase().includes(searchTerm)
    )
  }

  // ===== عمليات الإعدادات =====

  async getSettings(): Promise<ClinicSettings | null> {
    return this.data.settings.length > 0 ? this.data.settings[0] : null
  }

  async updateSettings(settings: Partial<ClinicSettings>): Promise<ClinicSettings> {
    if (this.data.settings.length === 0) {
      this.data.settings = [this.getDefaultSettings()]
    }

    this.data.settings[0] = {
      ...this.data.settings[0],
      ...settings,
      updated_at: new Date().toISOString()
    }
    
    this.saveToStorage()
    return this.data.settings[0]
  }

  // ===== عمليات المخزون =====

  async getAllInventoryItems(): Promise<InventoryItem[]> {
    return [...this.data.inventory]
  }

  async createInventoryItem(item: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>): Promise<InventoryItem> {
    const now = new Date().toISOString()
    const newItem: InventoryItem = {
      ...item,
      id: uuidv4(),
      created_at: now,
      updated_at: now
    }
    
    this.data.inventory.push(newItem)
    this.saveToStorage()
    return newItem
  }

  async updateInventoryItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem | null> {
    const index = this.data.inventory.findIndex(item => item.id === id)
    if (index === -1) return null

    this.data.inventory[index] = {
      ...this.data.inventory[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveToStorage()
    return this.data.inventory[index]
  }

  async deleteInventoryItem(id: string): Promise<boolean> {
    const initialLength = this.data.inventory.length
    this.data.inventory = this.data.inventory.filter(item => item.id !== id)
    
    this.saveToStorage()
    return this.data.inventory.length < initialLength
  }

  async searchInventoryItems(query: string): Promise<InventoryItem[]> {
    const searchTerm = query.toLowerCase()
    return this.data.inventory.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm) ||
      item.category?.toLowerCase().includes(searchTerm) ||
      item.supplier?.toLowerCase().includes(searchTerm)
    )
  }

  async getAllInventoryUsage(): Promise<any[]> {
    return [...this.data.inventoryUsage]
  }

  async createInventoryUsage(usageData: any): Promise<any> {
    const now = new Date().toISOString()
    const usage = {
      ...usageData,
      id: uuidv4(),
      usage_date: usageData.usage_date || now
    }
    
    this.data.inventoryUsage.push(usage)
    this.saveToStorage()
    return usage
  }

  async getInventoryUsageByItem(itemId: string): Promise<any[]> {
    return this.data.inventoryUsage.filter(u => u.inventory_id === itemId)
  }

  async getInventoryUsageByAppointment(appointmentId: string): Promise<any[]> {
    return this.data.inventoryUsage.filter(u => u.appointment_id === appointmentId)
  }

  // ===== إحصائيات لوحة التحكم =====

  async getDashboardStats(): Promise<DashboardStats> {
    const today = new Date().toISOString().split('T')[0]
    const thisMonth = new Date().toISOString().slice(0, 7)

    const todayAppointments = this.data.appointments.filter(a =>
      a.start_time.startsWith(today)
    ).length

    const completedPayments = this.data.payments.filter(p => p.status === 'completed')
    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0)

    const thisMonthPayments = completedPayments.filter(p =>
      p.payment_date.startsWith(thisMonth)
    )
    const thisMonthRevenue = thisMonthPayments.reduce((sum, p) => sum + p.amount, 0)

    const pendingPayments = this.data.payments.filter(p => p.status === 'pending').length
    const lowStockItems = this.data.inventory.filter(i => i.quantity <= i.minimum_stock).length

    return {
      total_patients: this.data.patients.length,
      total_appointments: this.data.appointments.length,
      total_revenue: totalRevenue,
      pending_payments: pendingPayments,
      today_appointments: todayAppointments,
      this_month_revenue: thisMonthRevenue,
      low_stock_items: lowStockItems
    }
  }

  // ===== عمليات المختبرات =====

  async getAllLabs(): Promise<Lab[]> {
    return [...this.data.labs]
  }

  async createLab(lab: Omit<Lab, 'id' | 'created_at' | 'updated_at'>): Promise<Lab> {
    const now = new Date().toISOString()
    const newLab: Lab = {
      ...lab,
      id: uuidv4(),
      created_at: now,
      updated_at: now
    }
    
    this.data.labs.push(newLab)
    this.saveToStorage()
    return newLab
  }

  async getAllLabOrders(): Promise<LabOrder[]> {
    return [...this.data.labOrders]
  }

  async createLabOrder(labOrder: Omit<LabOrder, 'id' | 'created_at' | 'updated_at'>): Promise<LabOrder> {
    const now = new Date().toISOString()
    const newLabOrder: LabOrder = {
      ...labOrder,
      id: uuidv4(),
      created_at: now,
      updated_at: now
    }
    
    this.data.labOrders.push(newLabOrder)
    this.saveToStorage()
    return newLabOrder
  }

  async updateLab(id: string, updates: Partial<Lab>): Promise<Lab | null> {
    const index = this.data.labs.findIndex(l => l.id === id)
    if (index === -1) return null

    this.data.labs[index] = {
      ...this.data.labs[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveToStorage()
    return this.data.labs[index]
  }

  async deleteLab(id: string): Promise<boolean> {
    const initialLength = this.data.labs.length
    this.data.labs = this.data.labs.filter(l => l.id !== id)
    
    this.saveToStorage()
    return this.data.labs.length < initialLength
  }

  async searchLabs(query: string): Promise<Lab[]> {
    const searchTerm = query.toLowerCase()
    return this.data.labs.filter(lab =>
      lab.name.toLowerCase().includes(searchTerm) ||
      lab.contact_person?.toLowerCase().includes(searchTerm) ||
      lab.phone?.toLowerCase().includes(searchTerm) ||
      lab.email?.toLowerCase().includes(searchTerm)
    )
  }

  async getLabOrdersByPatient(patientId: string): Promise<LabOrder[]> {
    return this.data.labOrders.filter(lo => lo.patient_id === patientId)
  }

  async updateLabOrder(id: string, updates: Partial<LabOrder>): Promise<LabOrder | null> {
    const index = this.data.labOrders.findIndex(lo => lo.id === id)
    if (index === -1) return null

    this.data.labOrders[index] = {
      ...this.data.labOrders[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveToStorage()
    return this.data.labOrders[index]
  }

  async deleteLabOrder(id: string): Promise<boolean> {
    const initialLength = this.data.labOrders.length
    this.data.labOrders = this.data.labOrders.filter(lo => lo.id !== id)
    
    this.saveToStorage()
    return this.data.labOrders.length < initialLength
  }

  async searchLabOrders(query: string): Promise<LabOrder[]> {
    const searchTerm = query.toLowerCase()
    return this.data.labOrders.filter(labOrder =>
      labOrder.order_number?.toLowerCase().includes(searchTerm) ||
      labOrder.description?.toLowerCase().includes(searchTerm) ||
      labOrder.status?.toLowerCase().includes(searchTerm)
    )
  }

  // ===== عمليات إضافية =====

  // ===== عمليات الأدوية =====

  async getAllMedications(): Promise<any[]> {
    return []
  }

  async createMedication(medication: any): Promise<any> {
    const now = new Date().toISOString()
    const newMedication = {
      ...medication,
      id: uuidv4(),
      created_at: now,
      updated_at: now
    }
    
    // Add to a medications array if it doesn't exist
    if (!this.data.medications) {
      this.data.medications = []
    }
    this.data.medications.push(newMedication)
    this.saveToStorage()
    return newMedication
  }

  async updateMedication(id: string, updates: any): Promise<any | null> {
    if (!this.data.medications) return null
    
    const index = this.data.medications.findIndex(m => m.id === id)
    if (index === -1) return null

    this.data.medications[index] = {
      ...this.data.medications[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveToStorage()
    return this.data.medications[index]
  }

  async deleteMedication(id: string): Promise<boolean> {
    if (!this.data.medications) return false
    
    const initialLength = this.data.medications.length
    this.data.medications = this.data.medications.filter(m => m.id !== id)
    
    this.saveToStorage()
    return this.data.medications.length < initialLength
  }

  async searchMedications(query: string): Promise<any[]> {
    if (!this.data.medications) return []
    
    const searchTerm = query.toLowerCase()
    return this.data.medications.filter(medication =>
      medication.name?.toLowerCase().includes(searchTerm) ||
      medication.description?.toLowerCase().includes(searchTerm) ||
      medication.category?.toLowerCase().includes(searchTerm)
    )
  }

  // ===== عمليات الوصفات الطبية =====

  async getAllPrescriptions(): Promise<any[]> {
    return []
  }

  async createPrescription(prescription: any): Promise<any> {
    const now = new Date().toISOString()
    const newPrescription = {
      ...prescription,
      id: uuidv4(),
      created_at: now,
      updated_at: now
    }
    
    if (!this.data.prescriptions) {
      this.data.prescriptions = []
    }
    this.data.prescriptions.push(newPrescription)
    this.saveToStorage()
    return newPrescription
  }

  async updatePrescription(id: string, updates: any): Promise<any | null> {
    if (!this.data.prescriptions) return null
    
    const index = this.data.prescriptions.findIndex(p => p.id === id)
    if (index === -1) return null

    this.data.prescriptions[index] = {
      ...this.data.prescriptions[index],
      ...updates,
      updated_at: new Date().toISOString()
    }
    
    this.saveToStorage()
    return this.data.prescriptions[index]
  }

  async deletePrescription(id: string): Promise<boolean> {
    if (!this.data.prescriptions) return false
    
    const initialLength = this.data.prescriptions.length
    this.data.prescriptions = this.data.prescriptions.filter(p => p.id !== id)
    
    this.saveToStorage()
    return this.data.prescriptions.length < initialLength
  }

  async getPrescriptionsByPatient(patientId: string): Promise<any[]> {
    if (!this.data.prescriptions) return []
    return this.data.prescriptions.filter(p => p.patient_id === patientId)
  }

  async searchPrescriptions(query: string): Promise<any[]> {
    if (!this.data.prescriptions) return []
    
    const searchTerm = query.toLowerCase()
    return this.data.prescriptions.filter(prescription =>
      prescription.notes?.toLowerCase().includes(searchTerm) ||
      prescription.status?.toLowerCase().includes(searchTerm)
    )
  }

  // ===== عمليات البحث =====

  async searchAppointments(query: string): Promise<Appointment[]> {
    const searchTerm = query.toLowerCase()
    return this.data.appointments
      .filter(appointment => {
        const patient = this.data.patients.find(p => p.id === appointment.patient_id)
        const patientName = patient ? patient.full_name : ''
        
        return (
          appointment.title?.toLowerCase().includes(searchTerm) ||
          appointment.description?.toLowerCase().includes(searchTerm) ||
          patientName.toLowerCase().includes(searchTerm) ||
          appointment.status?.toLowerCase().includes(searchTerm)
        )
      })
      .map(appointment => ({
        ...appointment,
        patient: this.data.patients.find(p => p.id === appointment.patient_id),
        treatment: this.data.treatments.find(t => t.id === appointment.treatment_id)
      }))
  }

  // ===== عمليات علاجات الأسنان =====

  async getAllToothTreatments(): Promise<any[]> {
    return []
  }

  async getToothTreatmentsByPatient(patientId: string): Promise<any[]> {
    return []
  }

  async getToothTreatmentsByTooth(patientId: string, toothNumber: string): Promise<any[]> {
    return []
  }

  async createToothTreatment(treatment: any): Promise<any> {
    return { id: uuidv4(), ...treatment }
  }

  async updateToothTreatment(id: string, updates: any): Promise<void> {
    // Mock implementation
  }

  async deleteToothTreatment(id: string): Promise<void> {
    // Mock implementation
  }

  async reorderToothTreatments(patientId: string, toothNumber: string, treatmentIds: string[]): Promise<void> {
    // Mock implementation
  }

  // ===== عمليات صور علاجات الأسنان =====

  async getAllToothTreatmentImages(): Promise<any[]> {
    return []
  }

  async getToothTreatmentImagesByTreatment(treatmentId: string): Promise<any[]> {
    return []
  }

  async getToothTreatmentImagesByTooth(patientId: string, toothNumber: string): Promise<any[]> {
    return []
  }

  async createToothTreatmentImage(image: any): Promise<any> {
    return { id: uuidv4(), ...image }
  }

  async deleteToothTreatmentImage(id: string): Promise<void> {
    // Mock implementation
  }

  // ===== عمليات جلسات العلاج =====

  async getAllTreatmentSessions(): Promise<any[]> {
    return []
  }

  async getTreatmentSessionsByTreatment(treatmentId: string): Promise<any[]> {
    return []
  }

  async createTreatmentSession(session: any): Promise<any> {
    return { id: uuidv4(), ...session }
  }

  async updateTreatmentSession(id: string, updates: any): Promise<void> {
    // Mock implementation
  }

  async deleteTreatmentSession(id: string): Promise<any> {
    return { success: true }
  }

  async getTreatmentSessionById(id: string): Promise<any | null> {
    return null
  }

  // ===== عمليات صور العلاج السني =====

  async getAllDentalTreatmentImages(): Promise<any[]> {
    return []
  }

  async getDentalTreatmentImagesByTreatment(treatmentId: string): Promise<any[]> {
    return []
  }

  async createDentalTreatmentImage(image: any): Promise<any> {
    return { id: uuidv4(), ...image }
  }

  async deleteDentalTreatmentImage(id: string): Promise<void> {
    // Mock implementation
  }

  // ===== عمليات احتياجات العيادة =====

  async getAllClinicNeeds(): Promise<any[]> {
    return []
  }

  async createClinicNeed(need: any): Promise<any> {
    return { id: uuidv4(), ...need }
  }

  async updateClinicNeed(id: string, need: any): Promise<any> {
    return { id, ...need }
  }

  async deleteClinicNeed(id: string): Promise<any> {
    return { success: true }
  }

  async searchClinicNeeds(query: string): Promise<any[]> {
    return []
  }

  async getClinicNeedsByStatus(status: string): Promise<any[]> {
    return []
  }

  async getClinicNeedsByPriority(priority: string): Promise<any[]> {
    return []
  }

  async getClinicNeedsStatistics(): Promise<any> {
    return {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0
    }
  }

  // ===== طرق إضافية للتوافق =====

  async forceCheckpoint(): Promise<void> {
    // Mock implementation - no database checkpoint needed
  }

  async clearAllPatients(): Promise<void> {
    this.data.patients = []
    this.saveToStorage()
  }

  async clearAllAppointments(): Promise<void> {
    this.data.appointments = []
    this.saveToStorage()
  }

  async clearAllPayments(): Promise<void> {
    this.data.payments = []
    this.saveToStorage()
  }

  async clearAllTreatments(): Promise<void> {
    this.data.treatments = this.getDefaultTreatments()
    this.saveToStorage()
  }

  async clearAllData(): Promise<void> {
    this.data = {
      patients: [],
      appointments: [],
      payments: [],
      treatments: this.getDefaultTreatments(),
      inventory: [],
      settings: [this.getDefaultSettings()],
      labs: [],
      labOrders: [],
      installmentPayments: [],
      patientImages: [],
      inventoryUsage: [],
      medications: [],
      prescriptions: []
    }
    this.saveToStorage()
  }

  async exportData(): Promise<any> {
    return { ...this.data }
  }

  async importData(data: any): Promise<void> {
    this.data = { ...this.data, ...data }
    this.saveToStorage()
  }

  // ===== طرق مساعدة =====

  isDemoMode(): boolean {
    return true
  }

  getStorageInfo(): { used: number; available: number } {
    try {
      const used = JSON.stringify(this.data).length
      const available = 5 * 1024 * 1024 // 5MB limit for localStorage
      return { used, available }
    } catch {
      return { used: 0, available: 0 }
    }
  }

  // ===== طرق التوافق مع DatabaseService =====

  async initializeAsync(): Promise<void> {
    // Mock implementation - no async initialization needed
    return Promise.resolve()
  }

  async ensureLabOrdersColumns(): Promise<void> {
    // Mock implementation - no database columns to ensure
    return Promise.resolve()
  }

  // Mock database methods for compatibility
  prepare(query: string) {
    return {
      run: () => ({ changes: 0 }),
      get: () => null,
      all: () => []
    }
  }

  pragma(command: string) {
    return null
  }
}
