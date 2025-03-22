"use client"

import React from "react"
import Link from "next/link"
import { Activity } from "lucide-react"
import { UserNav } from "@/components/user-nav"
import Sidebar from "./Sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
        <Sidebar />
        <main className="flex flex-1 flex-col">
          {children}
        </main>
      </div>
    </div>
  )
}