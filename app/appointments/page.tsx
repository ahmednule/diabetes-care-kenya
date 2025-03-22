"use client"

import React from "react"
import DashboardLayout from "@/components/DashboardLayout"

export default function AppointmentsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col p-6">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <p className="text-muted-foreground">This will be the appointments page</p>
      </div>
    </DashboardLayout>
  )
}