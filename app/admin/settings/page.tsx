"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Activity, BarChart3, Calendar, Loader2, Save, Settings, Users } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { UserNav } from "@/components/user-nav"
import { useToast } from "@/hooks/use-toast"
import { isAdmin } from "@/lib/auth"

const systemSettingsSchema = z.object({
  siteName: z.string().min(2, { message: "Site name must be at least 2 characters" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  enableRegistration: z.boolean().default(true),
  enableAI: z.boolean().default(true),
  maintenanceMode: z.boolean().default(false),
  analyticsCode: z.string().optional(),
})

const emailSettingsSchema = z.object({
  smtpServer: z.string().min(2, { message: "SMTP server is required" }),
  smtpPort: z.string().regex(/^\d+$/, { message: "Port must be a number" }),
  smtpUsername: z.string().min(2, { message: "SMTP username is required" }),
  smtpPassword: z.string().min(2, { message: "SMTP password is required" }),
  senderEmail: z.string().email({ message: "Please enter a valid email address" }),
  senderName: z.string().min(2, { message: "Sender name is required" }),
})

export default function AdminSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if user is admin
    const checkAdmin = async () => {
      const admin = await isAdmin()
      if (!admin) {
        router.push("/dashboard")
      }
    }

    checkAdmin()
  }, [router])

  const systemForm = useForm<z.infer<typeof systemSettingsSchema>>({
    resolver: zodResolver(systemSettingsSchema),
    defaultValues: {
      siteName: "DiabetesCare Kenya",
      contactEmail: "contact@diabetescarekenya.com",
      enableRegistration: true,
      enableAI: true,
      maintenanceMode: false,
      analyticsCode: "",
    },
  })

  const emailForm = useForm<z.infer<typeof emailSettingsSchema>>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      smtpServer: "smtp.example.com",
      smtpPort: "587",
      smtpUsername: "notifications@diabetescarekenya.com",
      smtpPassword: "password123",
      senderEmail: "notifications@diabetescarekenya.com",
      senderName: "DiabetesCare Kenya",
    },
  })

  async function onSystemSubmit(values: z.infer<typeof systemSettingsSchema>) {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings updated",
        description: "System settings have been updated successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onEmailSubmit(values: z.infer<typeof emailSettingsSchema>) {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings updated",
        description: "Email settings have been updated successfully",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update settings",
      })
    } finally {
      setIsLoading(false)
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
            <Button variant="ghost" className="justify-start gap-2 bg-muted" asChild>
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
              <h1 className="text-2xl font-semibold">System Settings</h1>
            </div>

            <Tabs defaultValue="system" className="space-y-6">
              <TabsList>
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
              </TabsList>

              <TabsContent value="system">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure general system settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...systemForm}>
                      <form onSubmit={systemForm.handleSubmit(onSystemSubmit)} className="space-y-6">
                        <FormField
                          control={systemForm.control}
                          name="siteName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Site Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>The name of your site as it appears to users</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={systemForm.control}
                          name="contactEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormDescription>
                                The email address used for system notifications and user contact
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid gap-6 md:grid-cols-2">
                          <FormField
                            control={systemForm.control}
                            name="enableRegistration"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">User Registration</FormLabel>
                                  <FormDescription>Allow new users to register on the platform</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={systemForm.control}
                            name="enableAI"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">AI Features</FormLabel>
                                  <FormDescription>Enable AI-powered features and recommendations</FormDescription>
                                </div>
                                <FormControl>
                                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={systemForm.control}
                          name="maintenanceMode"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Maintenance Mode</FormLabel>
                                <FormDescription>
                                  Put the site in maintenance mode (only admins can access)
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={systemForm.control}
                          name="analyticsCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Analytics Code</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Paste your analytics tracking code here"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>Optional: Add Google Analytics or other tracking code</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Settings
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="email">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Settings</CardTitle>
                    <CardDescription>Configure email server settings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...emailForm}>
                      <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                          <FormField
                            control={emailForm.control}
                            name="smtpServer"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SMTP Server</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={emailForm.control}
                            name="smtpPort"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SMTP Port</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          <FormField
                            control={emailForm.control}
                            name="smtpUsername"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SMTP Username</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={emailForm.control}
                            name="smtpPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SMTP Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                          <FormField
                            control={emailForm.control}
                            name="senderEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sender Email</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormDescription>
                                  The email address that will appear in the "From" field
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={emailForm.control}
                            name="senderName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sender Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormDescription>The name that will appear in the "From" field</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Email Settings
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="backup">
                <Card>
                  <CardHeader>
                    <CardTitle>Backup & Restore</CardTitle>
                    <CardDescription>Manage system backups and restoration</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">Create Backup</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create a backup of all system data including users, readings, and appointments
                      </p>
                      <Button>Create Backup</Button>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">Restore from Backup</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Restore system data from a previous backup file
                      </p>
                      <div className="flex items-center gap-4">
                        <Input type="file" />
                        <Button variant="outline">Restore</Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">Scheduled Backups</h3>
                      <p className="text-sm text-muted-foreground mb-4">Configure automatic scheduled backups</p>
                      <div className="flex items-center gap-2 mb-4">
                        <Switch id="auto-backup" />
                        <label htmlFor="auto-backup" className="text-sm font-medium">
                          Enable automatic backups
                        </label>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="text-sm font-medium">Frequency</label>
                          <Select defaultValue="daily">
                            <SelectTrigger>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Retention Period</label>
                          <Select defaultValue="30">
                            <SelectTrigger>
                              <SelectValue placeholder="Select retention period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="7">7 days</SelectItem>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

