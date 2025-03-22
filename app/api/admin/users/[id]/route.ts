import { NextResponse } from "next/server"
import { isAdmin } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = params.id

    // Delete user
    await prisma.user.delete({
      where: {
        id: userId,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = params.id

    // Get user
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        diabetesType: true,
        phone: true,
        address: true,
        city: true,
        diagnosisDate: true,
        medications: true,
        allergies: true,
        emergencyContact: true,
        emergencyPhone: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if user is admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = params.id
    const data = await request.json()

    // Update user
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        diabetesType: data.diabetesType,
        phone: data.phone,
        address: data.address,
        city: data.city,
        diagnosisDate: data.diagnosisDate ? new Date(data.diagnosisDate) : null,
        medications: data.medications,
        allergies: data.allergies,
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        diabetesType: true,
        createdAt: true,
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

