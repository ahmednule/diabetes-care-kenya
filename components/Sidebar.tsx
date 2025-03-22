"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  return (
    <aside className="hidden w-64 border-r bg-muted/40 lg:block">
      <nav className="grid gap-2 p-4 text-sm">
        <Button variant="ghost" className={`justify-start gap-2 ${isActive("/") ? "bg-muted" : ""}`} asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="ghost" className={`justify-start gap-2 ${isActive("/readings") ? "bg-muted" : ""}`} asChild>
          <Link href="/readings">Readings</Link>
        </Button>
        <Button variant="ghost" className={`justify-start gap-2 ${isActive("/appointments") ? "bg-muted" : ""}`} asChild>
          <Link href="/appointments">Appointments</Link>
        </Button>
        <Button variant="ghost" className={`justify-start gap-2 ${isActive("/profile") ? "bg-muted" : ""}`} asChild>
          <Link href="/profile">Profile</Link>
        </Button>
        <Button variant="ghost" className={`justify-start gap-2 ${isActive("/health-companion") ? "bg-muted" : ""}`} asChild>
          <Link href="/health-companion">Health Companion</Link>
        </Button>
      </nav>
    </aside>
  )
}