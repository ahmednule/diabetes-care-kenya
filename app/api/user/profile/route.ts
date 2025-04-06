import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        diabetesType: true,
        diagnosisDate: true,
        medications: true,
        allergies: true,
        emergencyContact: true,
        emergencyPhone: true,
      },
    })
    
    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    return NextResponse.json(userData)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    
    const data = await request.json()
    
    const diagnosisDate = data.diagnosisDate ? new Date(data.diagnosisDate) : undefined
    
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: data.name,
        phone: data.phone,
        address: data.address,
        city: data.city,
        diabetesType: data.diabetesType,
        diagnosisDate: diagnosisDate,
        medications: data.medications,
        allergies: data.allergies,
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
      },
    })
    
    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    })
  } catch (error) {
    console.error("Error updating user profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
