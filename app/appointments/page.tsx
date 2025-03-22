"use client"

import React, { useState } from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/DashboardLayout"
import BookingForm from "@/components/forms/BookingForm"

type Appointment = {
  date: Date
  time: string
  doctor: string
  reason: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false)

  const bookedDates = appointments.map((appt) => appt.date)

  const handleBookAppointment = (newAppointment: Appointment) => {
    setAppointments((prev) => [...prev, newAppointment])
    setIsBookingFormOpen(false)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col p-6">
        <h1 className="text-2xl font-semibold mb-4">Appointments</h1>
        
        <Button
          onClick={() => setIsBookingFormOpen(true)}
          className="mb-4"
        >
          Book Appointment
        </Button>

        {isBookingFormOpen && (
          <BookingForm
            onSubmit={handleBookAppointment}
            onCancel={() => setIsBookingFormOpen(false)}
          />
        )}

        <div className="mt-4">
          <DayPicker
            mode="multiple"
            selected={bookedDates}
            className="border rounded-md p-2"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}