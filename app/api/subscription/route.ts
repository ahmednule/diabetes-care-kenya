import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: user.id,
      },
    })
    
    if (!subscription) {
      return NextResponse.json({
        plan: "free",
        status: null,
        currentPeriodEnd: null,
        tokensRemaining: 100,
        tokensTotal: 100
      })
    }
    
    return NextResponse.json({
      plan: subscription.planId,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      tokensRemaining: subscription.tokensRemaining,
      tokensTotal: subscription.tokensAllotted
    })
  } catch (error) {
    console.error("Error fetching subscription:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}