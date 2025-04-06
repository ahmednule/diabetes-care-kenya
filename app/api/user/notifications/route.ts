import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
// import prisma from "@/lib/prisma"

export async function PUT(request: Request) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }
    
    const data = await request.json()
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating notification preferences:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}