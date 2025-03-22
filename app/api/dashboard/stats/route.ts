import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Get current user
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's readings
    const readings = await prisma.glucoseReading.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        timestamp: "desc",
      },
    })

    // Calculate average glucose
    let averageGlucose = 0
    if (readings.length > 0) {
      const sum = readings.reduce((acc, reading) => acc + reading.value, 0)
      averageGlucose = Number.parseFloat((sum / readings.length).toFixed(1))
    }

    // Calculate estimated HbA1c (simplified formula)
    const hba1c = Number.parseFloat(((averageGlucose + 2.59) / 1.59).toFixed(1))

    // Count readings from the past week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const readingsThisWeek = await prisma.glucoseReading.count({
      where: {
        userId: user.id,
        timestamp: {
          gte: oneWeekAgo,
        },
      },
    })

    // Determine risk score based on readings
    let riskScore = "Unknown"
    if (readings.length > 0) {
      const highReadings = readings.filter((r) => r.status === "high" || r.status === "very-high").length
      const highReadingsPercentage = (highReadings / readings.length) * 100

      if (highReadingsPercentage > 50) {
        riskScore = "High"
      } else if (highReadingsPercentage > 20) {
        riskScore = "Medium"
      } else {
        riskScore = "Low"
      }
    }

    return NextResponse.json({
      averageGlucose,
      hba1c,
      readingsThisWeek,
      riskScore,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

