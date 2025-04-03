import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil"
})

const PLANS = {
  basic: {
    monthly: {
      priceId: "price_basic_monthly", 
      amount: 2000 
    },
    annual: {
      priceId: "price_basic_annual", 
      amount: 20000
    }
  },
  premium: {
    monthly: {
      priceId: "price_premium_monthly",
      amount: 3000 
    },
    annual: {
      priceId: "price_premium_annual", 
      amount: 30000 
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { planId, period } = await request.json()
    
    if (
      (planId !== "basic" && planId !== "premium") || 
      (period !== "monthly" && period !== "annual")
    ) {
      return NextResponse.json({ error: "Invalid plan or period" }, { status: 400 })
    }
    
    if (planId === "free") {
      await prisma.subscription.upsert({
        where: { userId: user.id },
        update: {
          planId: "free",
          status: "active",
          tokensAllotted: 100,
          tokensRemaining: 100
        },
        create: {
          userId: user.id,
          planId: "free",
          status: "active",
          tokensAllotted: 100,
          tokensRemaining: 100
        }
      })
      
      return NextResponse.json({ success: true })
    }
    
    const plan = PLANS[planId as keyof typeof PLANS][period as keyof typeof PLANS.basic]
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1
        }
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
      metadata: {
        userId: user.id,
        planId: planId,
        period: period
      }
    })
    
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}