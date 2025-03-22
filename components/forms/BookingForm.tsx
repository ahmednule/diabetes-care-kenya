"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type Appointment = {
  date: Date
  time: string
  doctor: string
  reason: string
}

const doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams"]

export default function BookingForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (appointment: Appointment) => void
  onCancel: () => void
}) {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [doctor, setDoctor] = useState("")
  const [reason, setReason] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !doctor) return
    const appointment: Appointment = {
      date: new Date(date), 
      time,
      doctor,
      reason,
    }
    onSubmit(appointment)
    setDate("")
    setTime("")
    setDoctor("")
    setReason("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <label htmlFor="date" className="block text-sm font-medium">
          Date
        </label>
        <Input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="time" className="block text-sm font-medium">
          Time
        </label>
        <Input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="doctor" className="block text-sm font-medium">
          Doctor
        </label>
        <Select value={doctor} onValueChange={setDoctor}>
          <SelectTrigger>
            <SelectValue placeholder="Select a doctor" />
          </SelectTrigger>
          <SelectContent>
            {doctors.map((doc) => (
              <SelectItem key={doc} value={doc}>
                {doc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="reason" className="block text-sm font-medium">
          Reason for Appointment
        </label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Optional"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit">Book Appointment</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}