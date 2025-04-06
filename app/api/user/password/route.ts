import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { compare, hash } from "bcryptjs"

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    
    const { currentPassword, newPassword } = await request.json()
    
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        password: true,
      },
    })
    
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    const isPasswordValid = await compare(currentPassword, dbUser.password)
    
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Current password is incorrect" }, { status: 400 })
    }
    
    const hashedPassword = await hash(newPassword, 10)
    
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating password:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}