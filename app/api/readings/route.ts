import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { value, unit, label, timestamp } = body

    if (!value || !unit) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let status: string
    if (unit === "mmol/L") {
      if (value < 4.0) status = "low"
      else if (value <= 7.0) status = "normal"
      else if (value <= 10.0) status = "high"
      else status = "very-high"
    } else {
      if (value < 70) status = "low"
      else if (value <= 126) status = "normal"
      else if (value <= 180) status = "high"
      else status = "very-high"
    }

    const reading = await prisma.glucoseReading.create({
      data: {
        value,
        unit,
        label,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        status,
        userId: user.id,
      },
    })

    return NextResponse.json(reading)
  } catch (error) {
    console.error("Error adding reading:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const filter: any = {
      userId: user.id,
    }

    if (startDate && endDate) {
      filter.timestamp = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }

    const totalReadings = await prisma.glucoseReading.count({
      where: filter,
    })

    const totalPages = Math.ceil(totalReadings / limit)

    const readings = await prisma.glucoseReading.findMany({
      where: filter,
      orderBy: {
        timestamp: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    })

    return NextResponse.json({
      readings,
      totalPages,
      currentPage: page,
    })
  } catch (error) {
    console.error("Error fetching readings:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

