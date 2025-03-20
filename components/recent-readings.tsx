import { Activity } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const readings = [
  {
    id: 1,
    value: 6.2,
    unit: "mmol/L",
    time: "Today, 7:30 AM",
    label: "Before Breakfast",
    status: "normal",
  },
  {
    id: 2,
    value: 7.8,
    unit: "mmol/L",
    time: "Yesterday, 1:15 PM",
    label: "After Lunch",
    status: "high",
  },
  {
    id: 3,
    value: 5.9,
    unit: "mmol/L",
    time: "Yesterday, 7:00 PM",
    label: "Before Dinner",
    status: "normal",
  },
  {
    id: 4,
    value: 6.5,
    unit: "mmol/L",
    time: "Yesterday, 10:00 PM",
    label: "Before Bed",
    status: "normal",
  },
  {
    id: 5,
    value: 5.4,
    unit: "mmol/L",
    time: "2 days ago, 7:45 AM",
    label: "Before Breakfast",
    status: "normal",
  },
]

export function RecentReadings() {
  return (
    <div className="space-y-4">
      {readings.map((reading) => (
        <Card key={reading.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center">
              <div className={`flex h-full w-2 ${getStatusColor(reading.status)}`}></div>
              <div className="flex flex-1 items-center gap-4 p-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">
                      {reading.value} {reading.unit}
                    </p>
                    <span className="text-xs text-muted-foreground">{reading.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{reading.label}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "low":
      return "bg-blue-500"
    case "normal":
      return "bg-green-500"
    case "high":
      return "bg-orange-500"
    case "very-high":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

