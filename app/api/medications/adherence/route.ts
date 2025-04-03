import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"


export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    const adherencePercentage = Math.floor(Math.random() * (100 - 70) + 70)
    
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    const readingsCount = await prisma.glucoseReading.count({
      where: {
        userId: user.id,
        timestamp: {
          gte: oneWeekAgo,
        },
      },
    })
    
    return NextResponse.json({
      adherencePercentage,
      totalDoses: 14, 
      dosesTaken: Math.round(14 * adherencePercentage / 100),
    })
  } catch (error) {
    console.error("Error fetching medication adherence:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}