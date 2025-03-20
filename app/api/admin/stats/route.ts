import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get stats
    const totalUsers = await prisma.user.count()
    const totalReadings = await prisma.glucoseReading.count()
    const totalAppointments = await prisma.appointment.count()

    // Calculate active users (users who have logged in within the last 7 days)
    // In a real app, you would track user logins and calculate this
    const activeUsers = Math.floor(totalUsers * 0.8) // Placeholder: 80% of total users

    return NextResponse.json({
      totalUsers,
      totalReadings,
      totalAppointments,
      activeUsers,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

