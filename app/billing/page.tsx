"use client"

import React, { useState, useEffect } from "react"
import { Check, Info, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import DashboardLayout from "@/components/DashboardLayout"
import { useRouter } from "next/navigation"

type Plan = {
  id: string
  name: string
  price: number
  tokens: number
  period: string
  description: string
  features: string[]
  highlight?: boolean
}

type UserSubscription = {
  plan: string
  status: "active" | "cancelled" | "incomplete" | "trialing" | null
  currentPeriodEnd: string | null
  tokensRemaining: number
  tokensTotal: number
}

export default function BillingPage() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState<"monthly" | "annual">("monthly")
  const [loading, setLoading] = useState(false)
  const [subscription, setSubscription] = useState<UserSubscription>({
    plan: "free",
    status: null,
    currentPeriodEnd: null,
    tokensRemaining: 0,
    tokensTotal: 100
  })

  const plans: Plan[] = [
    {
      id: "free",
      name: "Free",
      price: 0,
      tokens: 100,
      period: "daily",
      description: "Basic access with limited features",
      features: [
        "100 tokens daily",
        "Basic features",
        "Standard support",
        "1 user account"
      ]
    },
    {
      id: "basic",
      name: "Basic",
      price: selectedPeriod === "monthly" ? 2000 : 20000,
      tokens: 100000,
      period: selectedPeriod,
      description: "Everything you need for regular usage",
      features: [
        "100,000 tokens monthly",
        "All basic features",
        "Priority support",
        "5 user accounts",
        "Advanced analytics"
      ],
      highlight: true
    },
    {
      id: "premium",
      name: "Premium",
      price: selectedPeriod === "monthly" ? 3000 : 30000,
      tokens: 200000,
      period: selectedPeriod,
      description: "Professional features for power users",
      features: [
        "200,000 tokens monthly",
        "All premium features",
        "24/7 priority support",
        "Unlimited user accounts",
        "Advanced analytics",
        "Custom integrations",
        "Dedicated account manager"
      ]
    }
  ]

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await fetch('/api/subscription')
        if (response.ok) {
          const data = await response.json()
          setSubscription(data)
        }
      } catch (error) {
        console.error("Error fetching subscription:", error)
      }
    }

    fetchSubscription()
  }, [])

  const handleSubscribe = async (planId: string) => {
    if (planId === subscription.plan) {
      toast({
        title: "Already subscribed",
        description: `You are already on the ${planId} plan.`,
        variant: "default"
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          planId,
          period: selectedPeriod
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { url } = await response.json()

      if (url) {
        router.push(url)
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      toast({
        title: "Error",
        description: "Unable to process your subscription request. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getTokenUsagePercentage = () => {
    if (!subscription.tokensTotal) return 0
    const used = subscription.tokensTotal - subscription.tokensRemaining
    return Math.round((used / subscription.tokensTotal) * 100)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col p-6">
        <h1 className="text-2xl font-semibold mb-6">Billing & Subscription</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              Your current subscription and token usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium capitalize">{subscription.plan} Plan</h3>
                  {subscription.status === "active" && (
                    <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">Active</Badge>
                  )}
                  {subscription.status === "cancelled" && (
                    <Badge variant="outline" className="ml-2 bg-orange-50 text-orange-700 border-orange-200">Cancelled</Badge>
                  )}
                </div>
                {subscription.currentPeriodEnd && (
                  <p className="text-sm text-muted-foreground">
                    Next billing date: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Token Usage</span>
                  <span className="text-sm">{subscription.tokensRemaining} / {subscription.tokensTotal} remaining</span>
                </div>
                <Progress value={getTokenUsagePercentage()} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {subscription.plan === "free" ? "Resets daily at midnight" : "Resets monthly at billing date"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Choose a Plan</h2>
            <Tabs 
              value={selectedPeriod} 
              onValueChange={(v) => setSelectedPeriod(v as "monthly" | "annual")}
              className="w-auto"
            >
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">Annual (10% off)</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-4">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`flex flex-col ${plan.highlight ? 'border-primary shadow-md' : ''}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription className="mt-1">{plan.description}</CardDescription>
                    </div>
                    {plan.highlight && (
                      <Badge>Popular</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">{formatCurrency(plan.price)}</span>
                      <span className="text-sm text-muted-foreground ml-1">
                        /{plan.id === "free" ? "forever" : plan.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {plan.tokens.toLocaleString()} tokens {plan.id === "free" ? "daily" : "monthly"}
                    </p>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.id === subscription.plan ? "outline" : "default"}
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading || (plan.id === subscription.plan && subscription.status === "active")}
                  >
                    {plan.id === subscription.plan && subscription.status === "active" 
                      ? "Current Plan" 
                      : `Subscribe to ${plan.name}`}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="flex items-center mt-6 p-4 border rounded-md bg-blue-50">
            <Info className="h-5 w-5 text-blue-500 mr-2" />
            <p className="text-sm">
              Need a custom plan? <a href="/contact" className="font-medium underline">Contact our sales team</a> for enterprise solutions.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}