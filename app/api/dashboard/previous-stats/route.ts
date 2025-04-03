import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)
    
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    const previousWeekReadings = await prisma.glucoseReading.findMany({
      where: {
        userId: user.id,
        timestamp: {
          gte: twoWeeksAgo,
          lt: oneWeekAgo,
        },
      },
    })
    
    let averageGlucose = 0
    if (previousWeekReadings.length > 0) {
      const sum = previousWeekReadings.reduce((acc, reading) => acc + reading.value, 0)
      averageGlucose = Number.parseFloat((sum / previousWeekReadings.length).toFixed(1))
    }
    
    const hba1c = Number.parseFloat(((averageGlucose + 2.59) / 1.59).toFixed(1))
    
    const targetReadings = 21
    
    return NextResponse.json({
      averageGlucose,
      hba1c,
      targetReadings,
    })
  } catch (error) {
    console.error("Error fetching previous week stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}