"use client"

import React, { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Button } from "@/components/ui/button"
import DashboardLayout from "@/components/DashboardLayout"
import BookingForm from "@/components/forms/BookingForm"
import { toast } from "@/components/ui/use-toast"

type Appointment = {
  id: string
  title: string
  date: Date
  doctorName: string
  location: string
}

type NewAppointment = {
  date: Date
  time: string
  doctor: string
  reason: string
  location?: string
}

const localizer = momentLocalizer(moment)

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/appointments')
      
      if (!response.ok) {
        throw new Error('Failed to fetch appointments')
      }
      
      const data = await response.json()
      
      const formattedAppointments = data.map((appointment: any) => ({
        ...appointment,
        date: new Date(appointment.date)
      }))
      
      setAppointments(formattedAppointments)
    } catch (error) {
      console.error("Error fetching appointments:", error)
      toast({
        title: "Error",
        description: "Failed to load appointments. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const events = appointments.map((appt) => {
    const start = new Date(appt.date)
    const end = new Date(start.getTime() + 60 * 60 * 1000)
    return {
      start,
      end,
      title: appt.title || `Appointment with ${appt.doctorName || 'Doctor'}`,
      resource: appt
    }
  })

  const handleBookAppointment = async (newAppointment: NewAppointment) => {
    try {
      const appointmentDate = new Date(newAppointment.date)
      const [hours, minutes] = newAppointment.time.split(":").map(Number)
      appointmentDate.setHours(hours, minutes)
      
      const appointmentData = {
        title: `Appointment with ${newAppointment.doctor}`,
        description: newAppointment.reason,
        date: appointmentDate.toISOString(),
        doctorName: newAppointment.doctor,
        location: newAppointment.location || 'Main Clinic'
      }
      
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create appointment')
      }
      
      fetchAppointments()
      setIsBookingFormOpen(false)
      
      toast({
        title: "Success",
        description: "Your appointment has been booked successfully.",
      })
    } catch (error) {
      console.error("Error booking appointment:", error)
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleEventSelect = (event: any) => {
    const appointment = event.resource
    toast({
      title: appointment.title,
      description: (
        <div className="mt-2">
          <p><strong>Date:</strong> {moment(appointment.date).format('MMMM D, YYYY [at] h:mm A')}</p>
          <p><strong>Doctor:</strong> {appointment.doctorName || 'Not specified'}</p>
          <p><strong>Location:</strong> {appointment.location || 'Main Clinic'}</p>
        </div>
      ),
    })
  }

  return (
    <DashboardLayout>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Appointments</h1>
          <Button
            onClick={() => setIsBookingFormOpen(true)}
          >
            Book Appointment
          </Button>
        </div>
        
        {isBookingFormOpen && (
          <div className="mb-6 p-4 border rounded-md bg-gray-50">
            <BookingForm
              onSubmit={handleBookAppointment}
              onCancel={() => setIsBookingFormOpen(false)}
            />
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center h-80">
            <p>Loading appointments...</p>
          </div>
        ) : (
          <div className="bg-white rounded-md border shadow-sm">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              onSelectEvent={handleEventSelect}
              views={['month', 'week', 'day']}
              defaultView="month"
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}