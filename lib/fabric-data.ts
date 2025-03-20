// This is a mock implementation of Microsoft Fabric data access
// In a real application, this would connect to Microsoft Fabric services

export interface GlucoseReading {
  id: string
  value: number
  unit: string
  timestamp: string
  label?: string
  status: "low" | "normal" | "high" | "very-high"
}

export interface PatientProfile {
  id: string
  name: string
  age: number
  gender: string
  diagnosisDate: string
  diabetesType: "1" | "2" | "gestational" | "other"
  medications: string[]
  hba1c?: number
  hba1cDate?: string
  bmi?: number
  comorbidities?: string[]
}

// Mock data - in a real app, this would come from Microsoft Fabric
const mockReadings: GlucoseReading[] = [
  {
    id: "1",
    value: 6.2,
    unit: "mmol/L",
    timestamp: "2024-05-15T07:30:00Z",
    label: "Before Breakfast",
    status: "normal",
  },
  {
    id: "2",
    value: 7.8,
    unit: "mmol/L",
    timestamp: "2024-05-14T13:15:00Z",
    label: "After Lunch",
    status: "high",
  },
  {
    id: "3",
    value: 5.9,
    unit: "mmol/L",
    timestamp: "2024-05-14T19:00:00Z",
    label: "Before Dinner",
    status: "normal",
  },
  {
    id: "4",
    value: 6.5,
    unit: "mmol/L",
    timestamp: "2024-05-14T22:00:00Z",
    label: "Before Bed",
    status: "normal",
  },
  {
    id: "5",
    value: 5.4,
    unit: "mmol/L",
    timestamp: "2024-05-13T07:45:00Z",
    label: "Before Breakfast",
    status: "normal",
  },
]

const mockPatientProfile: PatientProfile = {
  id: "12345",
  name: "John Kamau",
  age: 52,
  gender: "male",
  diagnosisDate: "2020-03-15",
  diabetesType: "2",
  medications: ["Metformin 500mg", "Glimepiride 2mg"],
  hba1c: 6.8,
  hba1cDate: "2024-04-10",
  bmi: 27.5,
  comorbidities: ["Hypertension"],
}

// Mock functions to simulate Microsoft Fabric data access
export async function getRecentReadings(limit = 5): Promise<GlucoseReading[]> {
  return mockReadings.slice(0, limit)
}

export async function getReadingsByDateRange(startDate: string, endDate: string): Promise<GlucoseReading[]> {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()

  return mockReadings.filter((reading) => {
    const readingTime = new Date(reading.timestamp).getTime()
    return readingTime >= start && readingTime <= end
  })
}

export async function addGlucoseReading(
  value: number,
  unit: string,
  label?: string,
  timestamp?: string,
): Promise<GlucoseReading> {
  const newReading: GlucoseReading = {
    id: (mockReadings.length + 1).toString(),
    value,
    unit,
    label,
    timestamp: timestamp || new Date().toISOString(),
    status: getReadingStatus(value, unit),
  }

  mockReadings.unshift(newReading)
  return newReading
}

export async function getPatientProfile(patientId: string): Promise<PatientProfile> {
  // In a real app, this would fetch from Microsoft Fabric
  return mockPatientProfile
}

export async function calculateAverageGlucose(days = 7): Promise<number> {
  const now = new Date()
  const pastDate = new Date(now)
  pastDate.setDate(now.getDate() - days)

  const recentReadings = mockReadings.filter((reading) => {
    const readingTime = new Date(reading.timestamp)
    return readingTime >= pastDate && readingTime <= now
  })

  if (recentReadings.length === 0) return 0

  const sum = recentReadings.reduce((acc, reading) => acc + reading.value, 0)
  return Number.parseFloat((sum / recentReadings.length).toFixed(1))
}

export async function estimateHbA1c(): Promise<number> {
  const avgGlucose = await calculateAverageGlucose(90) // 3 months
  // Formula: HbA1c = (Average glucose + 2.59) / 1.59
  return Number.parseFloat(((avgGlucose + 2.59) / 1.59).toFixed(1))
}

function getReadingStatus(value: number, unit: string): "low" | "normal" | "high" | "very-high" {
  if (unit === "mmol/L") {
    if (value < 4.0) return "low"
    if (value <= 7.0) return "normal"
    if (value <= 10.0) return "high"
    return "very-high"
  }

  // For mg/dL
  if (value < 70) return "low"
  if (value <= 126) return "normal"
  if (value <= 180) return "high"
  return "very-high"
}

