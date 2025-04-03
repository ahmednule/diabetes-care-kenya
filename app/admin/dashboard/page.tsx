// "use client"

// import { useEffect, useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Activity, BarChart3, Calendar, PieChart, Settings, Users } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { UserNav } from "@/components/user-nav"
// import { isAdmin } from "@/lib/auth"

// export default function AdminDashboardPage() {
//   const router = useRouter()
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalReadings: 0,
//     totalAppointments: 0,
//     activeUsers: 0,
//   })

//   useEffect(() => {
//     // Check if user is admin
//     const checkAdmin = async () => {
//       const admin = await isAdmin()
//       if (!admin) {
//         router.push("/dashboard")
//       } else {
//         fetchStats()
//       }
//     }

//     checkAdmin()
//   }, [router])

//   const fetchStats = async () => {
//     try {
//       const response = await fetch("/api/admin/stats")
//       const data = await response.json()
//       setStats(data)
//     } catch (error) {
//       console.error("Error fetching stats:", error)
//     }
//   }

//   return (
//     <div className="flex min-h-screen flex-col">
//       <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
//         <Link href="/" className="flex items-center gap-2 font-semibold">
//           <Activity className="h-6 w-6 text-primary" />
//           <span>DiabetesCare Kenya</span>
//         </Link>
//         <div className="ml-auto flex items-center gap-4">
//           <UserNav />
//         </div>
//       </header>
//       <div className="flex flex-1">
//         <aside className="hidden w-64 border-r bg-muted/40 lg:block">
//           <nav className="grid gap-2 p-4 text-sm">
//             <Button variant="ghost" className="justify-start gap-2 bg-muted" asChild>
//               <Link href="/admin/dashboard">
//                 <BarChart3 className="h-4 w-4" />
//                 Dashboard
//               </Link>
//             </Button>
//             <Button variant="ghost" className="justify-start gap-2" asChild>
//               <Link href="/admin/users">
//                 <Users className="h-4 w-4" />
//                 Users
//               </Link>
//             </Button>
//             <Button variant="ghost" className="justify-start gap-2" asChild>
//               <Link href="/admin/appointments">
//                 <Calendar className="h-4 w-4" />
//                 Appointments
//               </Link>
//             </Button>
//             <Button variant="ghost" className="justify-start gap-2" asChild>
//               <Link href="/admin/settings">
//                 <Settings className="h-4 w-4" />
//                 Settings
//               </Link>
//             </Button>
//           </nav>
//         </aside>
//         <main className="flex-1 p-6">
//           <div className="flex flex-col gap-6">
//             <div className="flex items-center justify-between">
//               <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
//               <Button asChild>
//                 <Link href="/admin/users/new">Add New User</Link>
//               </Button>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalUsers}</div>
//                   <p className="text-xs text-muted-foreground">
//                     <span className="text-green-500">↑ 12%</span> from last month
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">Active Users</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.activeUsers}</div>
//                   <p className="text-xs text-muted-foreground">
//                     <span className="text-green-500">↑ 8%</span> from last month
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">Total Readings</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalReadings}</div>
//                   <p className="text-xs text-muted-foreground">
//                     <span className="text-green-500">↑ 24%</span> from last month
//                   </p>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.totalAppointments}</div>
//                   <p className="text-xs text-muted-foreground">
//                     <span className="text-green-500">↑ 16%</span> from last month
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>

//             <Tabs defaultValue="users">
//               <TabsList className="grid w-full grid-cols-3">
//                 <TabsTrigger value="users">Recent Users</TabsTrigger>
//                 <TabsTrigger value="readings">Recent Readings</TabsTrigger>
//                 <TabsTrigger value="appointments">Recent Appointments</TabsTrigger>
//               </TabsList>
//               <TabsContent value="users" className="mt-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Recent Users</CardTitle>
//                     <CardDescription>Latest user registrations</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
//                         <div>Name</div>
//                         <div>Email</div>
//                         <div>Diabetes Type</div>
//                         <div>Registered</div>
//                       </div>
//                       <div className="space-y-2">
//                         {/* This would be populated with real data */}
//                         <div className="grid grid-cols-4 items-center gap-4 rounded-md border p-3">
//                           <div>Jane Wanjiku</div>
//                           <div>jane.wanjiku@example.com</div>
//                           <div>Type 2</div>
//                           <div>2 days ago</div>
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4 rounded-md border p-3">
//                           <div>David Omondi</div>
//                           <div>david.omondi@example.com</div>
//                           <div>Type 1</div>
//                           <div>3 days ago</div>
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4 rounded-md border p-3">
//                           <div>Sarah Muthoni</div>
//                           <div>sarah.muthoni@example.com</div>
//                           <div>Gestational</div>
//                           <div>5 days ago</div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="readings" className="mt-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Recent Readings</CardTitle>
//                     <CardDescription>Latest glucose readings across all users</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
//                         <div>User</div>
//                         <div>Value</div>
//                         <div>Status</div>
//                         <div>Label</div>
//                         <div>Time</div>
//                       </div>
//                       <div className="space-y-2">
//                         {/* This would be populated with real data */}
//                         <div className="grid grid-cols-5 items-center gap-4 rounded-md border p-3">
//                           <div>Jane Wanjiku</div>
//                           <div>6.2 mmol/L</div>
//                           <div className="text-green-500">Normal</div>
//                           <div>Before Breakfast</div>
//                           <div>Today, 7:30 AM</div>
//                         </div>
//                         <div className="grid grid-cols-5 items-center gap-4 rounded-md border p-3">
//                           <div>David Omondi</div>
//                           <div>7.8 mmol/L</div>
//                           <div className="text-orange-500">High</div>
//                           <div>After Lunch</div>
//                           <div>Yesterday, 1:15 PM</div>
//                         </div>
//                         <div className="grid grid-cols-5 items-center gap-4 rounded-md border p-3">
//                           <div>Sarah Muthoni</div>
//                           <div>5.9 mmol/L</div>
//                           <div className="text-green-500">Normal</div>
//                           <div>Before Dinner</div>
//                           <div>Yesterday, 7:00 PM</div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="appointments" className="mt-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Recent Appointments</CardTitle>
//                     <CardDescription>Latest scheduled appointments</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
//                         <div>Patient</div>
//                         <div>Doctor</div>
//                         <div>Date & Time</div>
//                         <div>Status</div>
//                       </div>
//                       <div className="space-y-2">
//                         {/* This would be populated with real data */}
//                         <div className="grid grid-cols-4 items-center gap-4 rounded-md border p-3">
//                           <div>Jane Wanjiku</div>
//                           <div>Dr. Wanjiku</div>
//                           <div>May 24, 2024 at 10:00 AM</div>
//                           <div className="text-blue-500">Upcoming</div>
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4 rounded-md border p-3">
//                           <div>David Omondi</div>
//                           <div>Dr. Omondi</div>
//                           <div>May 25, 2024 at 2:30 PM</div>
//                           <div className="text-blue-500">Upcoming</div>
//                         </div>
//                         <div className="grid grid-cols-4 items-center gap-4 rounded-md border p-3">
//                           <div>Sarah Muthoni</div>
//                           <div>Dr. Muthoni</div>
//                           <div>May 22, 2024 at 9:00 AM</div>
//                           <div className="text-green-500">Completed</div>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             </Tabs>

//             <div className="grid gap-6 md:grid-cols-2">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>User Distribution</CardTitle>
//                   <CardDescription>Distribution of users by diabetes type</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center gap-8">
//                     <PieChart className="h-24 w-24 text-primary" />
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2">
//                         <div className="h-3 w-3 rounded-full bg-primary"></div>
//                         <span className="text-sm">Type 2 (65%)</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="h-3 w-3 rounded-full bg-blue-500"></div>
//                         <span className="text-sm">Type 1 (20%)</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="h-3 w-3 rounded-full bg-green-500"></div>
//                         <span className="text-sm">Gestational (10%)</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <div className="h-3 w-3 rounded-full bg-muted"></div>
//                         <span className="text-sm">Other (5%)</span>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>System Status</CardTitle>
//                   <CardDescription>Current system performance</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm">API Health</span>
//                       <span className="text-sm text-green-500">Operational</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm">Database</span>
//                       <span className="text-sm text-green-500">Operational</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm">AI Services</span>
//                       <span className="text-sm text-green-500">Operational</span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <span className="text-sm">Storage</span>
//                       <span className="text-sm text-green-500">Operational</span>
//                     </div>
//                     <Button variant="link" className="p-0 text-primary">
//                       View detailed status
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Activity, BarChart3, Calendar, PieChart, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserNav } from "@/components/user-nav"
import { isAdmin } from "@/lib/auth"

type User = {
  id: string
  name: string
  email: string
  diabetesType: string | null
  createdAt: string
}

type GlucoseReading = {
  id: string
  value: number
  unit: string
  timestamp: string
  label: string | null
  status: string
  userId: string
  user?: {
    name: string
  }
}

type Appointment = {
  id: string
  title: string
  date: string
  doctorName: string | null
  userId: string
  user?: {
    name: string
  }
  status?: string 
}

type Stats = {
  totalUsers: number
  totalReadings: number
  totalAppointments: number
  activeUsers: number
  usersByType: {
    type: string
    count: number
    percentage: number
  }[]
  monthlyGrowth: {
    users: number
    readings: number
    appointments: number
    activeUsers: number
  }
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalReadings: 0,
    totalAppointments: 0,
    activeUsers: 0,
    usersByType: [],
    monthlyGrowth: {
      users: 0,
      readings: 0,
      appointments: 0,
      activeUsers: 0
    }
  })
  const [recentUsers, setRecentUsers] = useState<User[]>([])
  const [recentReadings, setRecentReadings] = useState<GlucoseReading[]>([])
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const admin = await isAdmin()
        if (!admin) {
          router.push("/dashboard")
        } else {
          fetchDashboardData()
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        setError("Failed to verify admin privileges")
      }
    }

    checkAdmin()
  }, [router])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const [statsRes, usersRes, readingsRes, appointmentsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/users?limit=5"),
        fetch("/api/admin/readings?limit=5"),
        fetch("/api/admin/appointments?limit=5")
      ])

      if (!statsRes.ok || !usersRes.ok || !readingsRes.ok || !appointmentsRes.ok) {
        throw new Error("Failed to fetch dashboard data")
      }

      const [statsData, usersData, readingsData, appointmentsData] = await Promise.all([
        statsRes.json(),
        usersRes.json(),
        readingsRes.json(),
        appointmentsRes.json()
      ])

      setStats(statsData)
      setRecentUsers(usersData.users)
      setRecentReadings(readingsData.readings)
      setRecentAppointments(appointmentsData.appointments)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "Yesterday"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    return `${Math.floor(diffInDays / 30)} months ago`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
              <Link href="/admin/dashboard">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/admin/users">
                <Users className="h-4 w-4" />
                Users
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/admin/appointments">
                <Calendar className="h-4 w-4" />
                Appointments
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/admin/settings">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </Button>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="mt-2 text-sm text-muted-foreground">Loading dashboard data...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center text-red-500">
                <p>{error}</p>
                <Button variant="outline" className="mt-4" onClick={fetchDashboardData}>
                  Retry
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                <Button asChild>
                  <Link href="/admin/users/new">Add New User</Link>
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={`${stats.monthlyGrowth.users >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {stats.monthlyGrowth.users >= 0 ? "↑" : "↓"} {Math.abs(stats.monthlyGrowth.users)}%
                      </span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.activeUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={`${stats.monthlyGrowth.activeUsers >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {stats.monthlyGrowth.activeUsers >= 0 ? "↑" : "↓"} {Math.abs(stats.monthlyGrowth.activeUsers)}%
                      </span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Readings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalReadings}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={`${stats.monthlyGrowth.readings >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {stats.monthlyGrowth.readings >= 0 ? "↑" : "↓"} {Math.abs(stats.monthlyGrowth.readings)}%
                      </span> from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stats.totalAppointments}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className={`${stats.monthlyGrowth.appointments >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {stats.monthlyGrowth.appointments >= 0 ? "↑" : "↓"} {Math.abs(stats.monthlyGrowth.appointments)}%
                      </span> from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="users">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="users">Recent Users</TabsTrigger>
                  <TabsTrigger value="readings">Recent Readings</TabsTrigger>
                  <TabsTrigger value="appointments">Recent Appointments</TabsTrigger>
                </TabsList>
                <TabsContent value="users" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Users</CardTitle>
                      <CardDescription>Latest user registrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                          <div>Name</div>
                          <div>Email</div>
                          <div>Diabetes Type</div>
                          <div>Registered</div>
                        </div>
                        <div className="space-y-2">
                          {recentUsers.length > 0 ? (
                            recentUsers.map((user) => (
                              <div key={user.id} className="grid grid-cols-4 items-center gap-4 rounded-md border p-3">
                                <div>{user.name}</div>
                                <div>{user.email}</div>
                                <div>{user.diabetesType || "Not specified"}</div>
                                <div>{formatRelativeTime(user.createdAt)}</div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-4 text-muted-foreground">No users found</div>
                          )}
                        </div>
                        <Button variant="link" className="p-0" asChild>
                          <Link href="/admin/users">View all users</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="readings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Readings</CardTitle>
                      <CardDescription>Latest glucose readings across all users</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-5 text-sm font-medium text-muted-foreground">
                          <div>User</div>
                          <div>Value</div>
                          <div>Status</div>
                          <div>Label</div>
                          <div>Time</div>
                        </div>
                        <div className="space-y-2">
                          {recentReadings.length > 0 ? (
                            recentReadings.map((reading) => (
                              <div key={reading.id} className="grid grid-cols-5 items-center gap-4 rounded-md border p-3">
                                <div>{reading.user?.name || "Unknown User"}</div>
                                <div>{reading.value} {reading.unit}</div>
                                <div className={`
                                  ${reading.status === 'normal' ? 'text-green-500' : ''}
                                  ${reading.status === 'high' ? 'text-orange-500' : ''}
                                  ${reading.status === 'very-high' ? 'text-red-500' : ''}
                                  ${reading.status === 'low' ? 'text-blue-500' : ''}
                                `}>
                                  {reading.status.charAt(0).toUpperCase() + reading.status.slice(1)}
                                </div>
                                <div>{reading.label || "No label"}</div>
                                <div>{formatRelativeTime(reading.timestamp)}</div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-4 text-muted-foreground">No readings found</div>
                          )}
                        </div>
                        <Button variant="link" className="p-0" asChild>
                          <Link href="/admin/readings">View all readings</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="appointments" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Appointments</CardTitle>
                      <CardDescription>Latest scheduled appointments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-4 text-sm font-medium text-muted-foreground">
                          <div>Patient</div>
                          <div>Doctor</div>
                          <div>Date & Time</div>
                          <div>Status</div>
                        </div>
                        <div className="space-y-2">
                          {recentAppointments.length > 0 ? (
                            recentAppointments.map((appointment) => {
                              const appointmentDate = new Date(appointment.date);
                              const now = new Date();
                              const status = appointmentDate < now ? "Completed" : "Upcoming";
                              
                              return (
                                <div key={appointment.id} className="grid grid-cols-4 items-center gap-4 rounded-md border p-3">
                                  <div>{appointment.user?.name || "Unknown User"}</div>
                                  <div>{appointment.doctorName || "No doctor specified"}</div>
                                  <div>{formatDate(appointment.date)}</div>
                                  <div className={status === "Completed" ? "text-green-500" : "text-blue-500"}>
                                    {status}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center py-4 text-muted-foreground">No appointments found</div>
                          )}
                        </div>
                        <Button variant="link" className="p-0" asChild>
                          <Link href="/admin/appointments">View all appointments</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>User Distribution</CardTitle>
                    <CardDescription>Distribution of users by diabetes type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-8">
                      <PieChart className="h-24 w-24 text-primary" />
                      <div className="space-y-2">
                        {stats.usersByType.length > 0 ? (
                          stats.usersByType.map((type, index) => {
                            const colors = ["bg-primary", "bg-blue-500", "bg-green-500", "bg-orange-500", "bg-purple-500", "bg-muted"];
                            const colorClass = index < colors.length ? colors[index] : colors[colors.length - 1];
                            
                            return (
                              <div key={type.type} className="flex items-center gap-2">
                                <div className={`h-3 w-3 rounded-full ${colorClass}`}></div>
                                <span className="text-sm">
                                  {type.type || "Not specified"} ({type.percentage.toFixed(1)}%)
                                </span>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-sm text-muted-foreground">No data available</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Current system performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Health</span>
                        <span className="text-sm text-green-500">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database</span>
                        <span className="text-sm text-green-500">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">AI Services</span>
                        <span className="text-sm text-green-500">Operational</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Storage</span>
                        <span className="text-sm text-green-500">Operational</span>
                      </div>
                      <Button variant="link" className="p-0 text-primary">
                        View detailed status
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}