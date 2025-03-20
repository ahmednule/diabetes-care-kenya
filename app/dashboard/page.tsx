"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentReadings } from "@/components/recent-readings"
import { Header } from "@/app/components/header"
import { Sidebar } from "@/app/components/sidebar"
import { isAuthenticated } from "@/lib/auth"
import { Activity, Calendar, PieChart } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const authenticated = await isAuthenticated()
      if (!authenticated) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="w-64 border-r bg-muted/40" />
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <Button className="shadow-md hover:shadow-lg transition-all">Log New Reading</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Glucose</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">6.2 mmol/L</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="inline-flex items-center text-green-500 mr-1">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      0.3
                    </span>
                    from last week
                  </p>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">HbA1c Estimate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">6.8%</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="inline-flex items-center text-green-500 mr-1">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      0.2%
                    </span>
                    from last check
                  </p>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Readings This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="inline-flex items-center text-red-500 mr-1">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                      4
                    </span>
                    from target
                  </p>
                </CardContent>
              </Card>

              <Card
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full"></div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">Low</div>
                  <p className="text-xs text-muted-foreground mt-1">Based on recent data</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
              <Card
                className="lg:col-span-4 border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: "0.4s" }}
              >
                <CardHeader className="pb-2">
                  <CardTitle>Glucose Trends</CardTitle>
                  <CardDescription>Your glucose readings over the past 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <Overview />
                </CardContent>
              </Card>

              <Card
                className="lg:col-span-3 border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: "0.5s" }}
              >
                <CardHeader className="pb-2">
                  <CardTitle>Recent Readings</CardTitle>
                  <CardDescription>Your last 5 glucose readings</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentReadings />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: "0.6s" }}
              >
                <CardHeader className="pb-2">
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled healthcare visits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Dr. Wanjiku - Diabetes Check</p>
                        <p className="text-xs text-muted-foreground">May 24, 2024 at 10:00 AM</p>
                      </div>
                      <Button variant="outline" size="sm" className="hover:bg-primary/10">
                        Reschedule
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Lab Work - HbA1c Test</p>
                        <p className="text-xs text-muted-foreground">June 2, 2024 at 8:30 AM</p>
                      </div>
                      <Button variant="outline" size="sm" className="hover:bg-primary/10">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className="border-none shadow-lg hover:shadow-xl transition-all duration-300 animate-fadeIn"
                style={{ animationDelay: "0.7s" }}
              >
                <CardHeader className="pb-2">
                  <CardTitle>Medication Adherence</CardTitle>
                  <CardDescription>Your medication tracking for this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-8">
                    <div className="relative">
                      <PieChart className="h-24 w-24 text-primary" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">86%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary"></div>
                        <span className="text-sm">Taken as prescribed (86%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-muted"></div>
                        <span className="text-sm">Missed doses (14%)</span>
                      </div>
                      <Button variant="link" className="p-0 text-primary hover:text-primary/80">
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

