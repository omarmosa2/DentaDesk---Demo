// Web fallbacks for Electron APIs when running in browser environment

// Mock electronAPI for web environment
export const createWebElectronAPI = () => {
  return {
    settings: {
      get: async () => {
        const stored = localStorage.getItem('dental-clinic-settings')
        if (stored) {
          return JSON.parse(stored)
        }
        return {
          clinic_name: 'عيادة الأسنان',
          clinic_address: 'العنوان',
          clinic_phone: '123-456-7890',
          clinic_email: 'info@dentalclinic.com',
          currency: 'USD',
          language: 'ar',
          useArabicNumerals: false,
          whatsapp_reminder_hours_before: 3,
          whatsapp_reminder_minutes_before: 0,
          whatsapp_reminder_custom_enabled: false,
          isLoaded: true
        }
      },
      update: async (settingsData: any) => {
        const currentSettings = JSON.parse(localStorage.getItem('dental-clinic-settings') || '{}')
        const updatedSettings = { ...currentSettings, ...settingsData }
        localStorage.setItem('dental-clinic-settings', JSON.stringify(updatedSettings))
        return updatedSettings
      }
    },
    patients: {
      getAll: async () => {
        const stored = localStorage.getItem('dental-patients')
        return stored ? JSON.parse(stored) : []
      },
      create: async (patient: any) => {
        const patients = JSON.parse(localStorage.getItem('dental-patients') || '[]')
        const newPatient = { ...patient, id: Date.now().toString() }
        patients.push(newPatient)
        localStorage.setItem('dental-patients', JSON.stringify(patients))
        return newPatient
      },
      update: async (id: string, patient: any) => {
        const patients = JSON.parse(localStorage.getItem('dental-patients') || '[]')
        const index = patients.findIndex((p: any) => p.id === id)
        if (index !== -1) {
          patients[index] = { ...patients[index], ...patient }
          localStorage.setItem('dental-patients', JSON.stringify(patients))
          return patients[index]
        }
        throw new Error('Patient not found')
      },
      delete: async (id: string) => {
        const patients = JSON.parse(localStorage.getItem('dental-patients') || '[]')
        const filtered = patients.filter((p: any) => p.id !== id)
        localStorage.setItem('dental-patients', JSON.stringify(filtered))
        return true
      }
    },
    appointments: {
      getAll: async () => {
        const stored = localStorage.getItem('dental-appointments')
        return stored ? JSON.parse(stored) : []
      },
      create: async (appointment: any) => {
        const appointments = JSON.parse(localStorage.getItem('dental-appointments') || '[]')
        const newAppointment = { ...appointment, id: Date.now().toString() }
        appointments.push(newAppointment)
        localStorage.setItem('dental-appointments', JSON.stringify(appointments))
        return newAppointment
      },
      update: async (id: string, appointment: any) => {
        const appointments = JSON.parse(localStorage.getItem('dental-appointments') || '[]')
        const index = appointments.findIndex((a: any) => a.id === id)
        if (index !== -1) {
          appointments[index] = { ...appointments[index], ...appointment }
          localStorage.setItem('dental-appointments', JSON.stringify(appointments))
          return appointments[index]
        }
        throw new Error('Appointment not found')
      },
      delete: async (id: string) => {
        const appointments = JSON.parse(localStorage.getItem('dental-appointments') || '[]')
        const filtered = appointments.filter((a: any) => a.id !== id)
        localStorage.setItem('dental-appointments', JSON.stringify(filtered))
        return true
      }
    },
    payments: {
      getAll: async () => {
        const stored = localStorage.getItem('dental-payments')
        return stored ? JSON.parse(stored) : []
      },
      create: async (payment: any) => {
        const payments = JSON.parse(localStorage.getItem('dental-payments') || '[]')
        const newPayment = { ...payment, id: Date.now().toString() }
        payments.push(newPayment)
        localStorage.setItem('dental-payments', JSON.stringify(payments))
        return newPayment
      },
      update: async (id: string, payment: any) => {
        const payments = JSON.parse(localStorage.getItem('dental-payments') || '[]')
        const index = payments.findIndex((p: any) => p.id === id)
        if (index !== -1) {
          payments[index] = { ...payments[index], ...payment }
          localStorage.setItem('dental-payments', JSON.stringify(payments))
          return payments[index]
        }
        throw new Error('Payment not found')
      },
      delete: async (id: string) => {
        const payments = JSON.parse(localStorage.getItem('dental-payments') || '[]')
        const filtered = payments.filter((p: any) => p.id !== id)
        localStorage.setItem('dental-payments', JSON.stringify(filtered))
        return true
      }
    },
    whatsappReminders: {
      getSettings: async () => {
        const stored = localStorage.getItem('whatsapp-settings')
        return stored ? JSON.parse(stored) : {
          whatsapp_reminder_enabled: false,
          hours_before: 24,
          minutes_before: 0,
          message: 'تذكير بالموعد',
          custom_enabled: false
        }
      },
      updateSettings: async (settings: any) => {
        localStorage.setItem('whatsapp-settings', JSON.stringify(settings))
        return settings
      }
    }
  }
}

// Initialize web fallbacks if electronAPI is not available
export const initializeWebFallbacks = () => {
  if (typeof window !== 'undefined' && !window.electronAPI) {
    console.log('🌐 Initializing web fallbacks for Electron APIs')
    window.electronAPI = createWebElectronAPI()
  }
}

// Declare global types
declare global {
  interface Window {
    electronAPI?: any
  }
}
