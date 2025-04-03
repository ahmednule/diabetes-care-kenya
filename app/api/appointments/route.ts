import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        title: true,
        date: true,
        doctorName: true,
        location: true,
        description: true,
      },
    })
    
    return NextResponse.json(appointments)
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const data = await request.json()
    
    // Validate required fields
    if (!data.date || !data.doctorName || !data.title) {
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      )
    }
    
    const appointment = await prisma.appointment.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        location: data.location,
        doctorName: data.doctorName,
        userId: user.id,
      },
    })
    
    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}