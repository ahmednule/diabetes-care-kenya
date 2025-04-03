import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string) : 10
    const page = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1
    const skip = (page - 1) * limit
    const search = searchParams.get("search") || ""
    
    const where = search ? {
      OR: [
        { title: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { doctorName: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { user: { name: { contains: search, mode: Prisma.QueryMode.insensitive } } },
        { user: { email: { contains: search, mode: Prisma.QueryMode.insensitive } } }
      ]
    } : {}
    
    const appointments = await prisma.appointment.findMany({
      where,
      skip,
      take: limit,
      orderBy: { date: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })
    
    const totalAppointments = await prisma.appointment.count({ where })
    const totalPages = Math.ceil(totalAppointments / limit)
    
    const processedAppointments = appointments.map(appointment => {
      const now = new Date()
      const appointmentDate = new Date(appointment.date)
      const status = appointmentDate < now ? "Completed" : "Upcoming"
      
      return {
        ...appointment,
        status
      }
    })
    
    return NextResponse.json({
      appointments: processedAppointments,
      pagination: {
        total: totalAppointments,
        pages: totalPages,
        page,
        limit
      }
    })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}