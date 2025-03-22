"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Activity,
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Plus,
  Search,
  Settings,
  Trash2,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserNav } from "@/components/user-nav"
import { isAdmin } from "@/lib/auth"

type User = {
  id: string
  name: string
  email: string
  role: string
  diabetesType: string | null
  createdAt: string
}

export default function AdminUsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = async () => {
      const admin = await isAdmin()
      if (!admin) {
        router.push("/dashboard")
      } else {
        fetchUsers()
      }
    }

    checkAdmin()
  }, [router, currentPage, searchQuery, roleFilter])

  const fetchUsers = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/users?page=${currentPage}&search=${searchQuery}&role=${roleFilter}`)
      const data = await response.json()
      setUsers(data.users)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: "DELETE",
        })

        if (response.ok) {
          // Refresh the user list
          fetchUsers()
        } else {
          alert("Failed to delete user")
        }
      } catch (error) {
        console.error("Error deleting user:", error)
        alert("An error occurred while deleting the user")
      }
    }
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
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/admin/dashboard">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 bg-muted" asChild>
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
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">User Management</h1>
              <Button asChild>
                <Link href="/admin/users/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New User
                </Link>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage user accounts in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="USER">Regular Users</SelectItem>
                      <SelectItem value="ADMIN">Administrators</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isLoading ? (
                  <div className="flex h-40 items-center justify-center">
                    <p className="text-muted-foreground">Loading users...</p>
                  </div>
                ) : (
                  <>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-6 border-b bg-muted/50 p-3 text-sm font-medium">
                        <div className="col-span-2">User</div>
                        <div>Role</div>
                        <div>Diabetes Type</div>
                        <div>Joined</div>
                        <div className="text-right">Actions</div>
                      </div>
                      <div className="divide-y">
                        {users.length === 0 ? (
                          <div className="p-4 text-center text-muted-foreground">No users found</div>
                        ) : (
                          users.map((user) => (
                            <div key={user.id} className="grid grid-cols-6 items-center p-3">
                              <div className="col-span-2">
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                              <div>
                                <span
                                  className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                    user.role === "ADMIN"
                                      ? "bg-primary/10 text-primary"
                                      : "bg-muted text-muted-foreground"
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </div>
                              <div>{user.diabetesType || "Not specified"}</div>
                              <div>{new Date(user.createdAt).toLocaleDateString()}</div>
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                  <Link href={`/admin/users/${user.id}`}>
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Link>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only">Previous Page</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Next Page</span>
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

