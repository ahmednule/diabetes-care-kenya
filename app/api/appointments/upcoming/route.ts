import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const now = new Date()
    
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
        date: {
          gte: now,
        },
      },
      orderBy: {
        date: "asc",
      },
      take: 3, // Limit to next 3 appointments
      select: {
        id: true,
        title: true,
        date: true,
        doctorName: true,
        location: true,
      },
    })
    
    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Error fetching upcoming appointments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}