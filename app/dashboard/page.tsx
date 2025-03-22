"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Activity, BarChart3, Calendar, MessageSquare, PieChart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentReadings } from "@/components/recent-readings"
import { UserNav } from "@/components/user-nav"
import { useAuth } from "@/components/auth-provider"

type DashboardStats = {
  averageGlucose: number
  hba1c: number
  readingsThisWeek: number
  riskScore: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, authenticated, loading, isAdmin } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    averageGlucose: 0,
    hba1c: 0,
    readingsThisWeek: 0,
    riskScore: "Unknown",
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading) {
      if (!authenticated) {
        router.push("/login")
      } else if (isAdmin) {
        router.push("/admin/dashboard")
      } else {
        fetchDashboardData()
      }
    }
  }, [loading, authenticated, isAdmin, router])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/dashboard/stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
          <p className="text-muted-foreground">Please wait while we load your dashboard</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Activity className="h-6 w-6 text-primary" />
          <span>DiabetesCare Kenya</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <UserNav />
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 lg:block">
          <nav className="grid gap-2 p-4 text-sm">
            <Button variant="ghost" className="justify-start gap-2 bg-muted" asChild>
              <Link href="/dashboard">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/readings/new">
                <Activity className="h-4 w-4" />
                Readings
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/appointments">
                <Calendar className="h-4 w-4" />
                Appointments
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/profile">
                <User className="h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/health-companion">
                <MessageSquare className="h-4 w-4" />
                Health Companion
              </Link>
            </Button>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <Button asChild>
                <Link href="/readings/new">Log New Reading</Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Glucose</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.averageGlucose} mmol/L</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">↓ 0.3</span> from last week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">HbA1c Estimate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.hba1c}%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-500">↓ 0.2%</span> from last check
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Readings This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.readingsThisWeek}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-500">↓ 4</span> from target
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.riskScore}</div>
                  <p className="text-xs text-muted-foreground">Based on recent data</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Glucose Trends</CardTitle>
                  <CardDescription>Your glucose readings over the past 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <Overview />
                </CardContent>
              </Card>
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Readings</CardTitle>
                  <CardDescription>Your last 5 glucose readings</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentReadings />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled healthcare visits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Dr. Wanjiku - Diabetes Check</p>
                        <p className="text-xs text-muted-foreground">May 24, 2025 at 10:00 AM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Lab Work - HbA1c Test</p>
                        <p className="text-xs text-muted-foreground">June 2, 2025 at 8:30 AM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Medication Adherence</CardTitle>
                  <CardDescription>Your medication tracking for this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-8">
                    <PieChart className="h-24 w-24 text-primary" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                        <span className="text-sm">Taken as prescribed (86%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-muted"></div>
                        <span className="text-sm">Missed doses (14%)</span>
                      </div>
                      <Button variant="link" className="p-0 text-primary">
                        View medication schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

