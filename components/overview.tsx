"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    date: "Mon",
    "Before Breakfast": 5.8,
    "After Lunch": 7.2,
    "Before Bed": 6.5,
  },
  {
    date: "Tue",
    "Before Breakfast": 6.1,
    "After Lunch": 7.8,
    "Before Bed": 6.3,
  },
  {
    date: "Wed",
    "Before Breakfast": 5.9,
    "After Lunch": 6.9,
    "Before Bed": 6.0,
  },
  {
    date: "Thu",
    "Before Breakfast": 6.3,
    "After Lunch": 7.5,
    "Before Bed": 6.2,
  },
  {
    date: "Fri",
    "Before Breakfast": 5.7,
    "After Lunch": 6.8,
    "Before Bed": 5.9,
  },
  {
    date: "Sat",
    "Before Breakfast": 5.5,
    "After Lunch": 6.5,
    "Before Bed": 5.8,
  },
  {
    date: "Sun",
    "Before Breakfast": 5.6,
    "After Lunch": 6.7,
    "Before Bed": 6.1,
  },
]

export function Overview() {
  return (
    <ChartContainer className="aspect-[4/3] w-full sm:aspect-[2/1]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            domain={[4, 10]}
            className="text-xs"
            label={{ value: "mmol/L", angle: -90, position: "insideLeft", className: "text-xs" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="Before Breakfast"
            stroke="#0ea5e9"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="After Lunch"
            stroke="#f97316"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="Before Bed"
            stroke="#8b5cf6"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltip>
        <ChartTooltipContent className="space-y-1">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry: any) => (
            <div key={entry.dataKey} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-muted-foreground">{entry.dataKey}</span>
              </div>
              <span className="text-xs font-medium">{entry.value} mmol/L</span>
            </div>
          ))}
        </ChartTooltipContent>
      </ChartTooltip>
    )
  }

  return null
}

