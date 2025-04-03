import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const status = searchParams.get("status") || undefined
    const userId = searchParams.get("userId") || undefined
    const startDate = searchParams.get("startDate") || undefined
    const endDate = searchParams.get("endDate") || undefined

    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (userId) {
      where.userId = userId
    }
    
    if (startDate && endDate) {
      where.timestamp = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    } else if (startDate) {
      where.timestamp = {
        gte: new Date(startDate),
      }
    } else if (endDate) {
      where.timestamp = {
        lte: new Date(endDate),
      }
    }

    const totalReadings = await prisma.glucoseReading.count({ where })
    const totalPages = Math.ceil(totalReadings / limit)

    const readings = await prisma.glucoseReading.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            diabetesType: true
          }
        }
      },
      orderBy: {
        timestamp: "desc"
      },
      skip: (page - 1) * limit,
      take: limit
    })

    return NextResponse.json({
      readings,
      totalPages,
      currentPage: page,
      totalReadings
    })
  } catch (error) {
    console.error("Error fetching readings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}