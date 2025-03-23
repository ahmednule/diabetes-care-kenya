"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Activity, BarChart3, Calendar, MessageSquare,User } from "lucide-react"


export default function Sidebar() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
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
  )
}