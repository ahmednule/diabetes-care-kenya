"use client"

import React, { useState } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/DashboardLayout"
import BookingForm from "@/components/forms/BookingForm"

type Appointment = {
  date: Date
  time: string
  doctor: string
  reason: string
}

const localizer = momentLocalizer(moment)

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false)

  const events = appointments.map((appt) => {
    const start = new Date(appt.date)
    const [hours, minutes] = appt.time.split(":").map(Number)
    start.setHours(hours, minutes)
    const end = new Date(start.getTime() + 60 * 60 * 1000)
    return {
      start,
      end,
      title: `Appointment with ${appt.doctor} - ${appt.reason || "No reason provided"}`,
    }
  })

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
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            className="border rounded-md p-2"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}