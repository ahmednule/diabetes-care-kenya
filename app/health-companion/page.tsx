"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Activity, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { UserNav } from "@/components/user-nav"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function HealthCompanionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI health companion. How can I help you manage your diabetes today?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response (in a real app, this would call Azure OpenAI)
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: getAIResponse(input),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

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
        <aside className="hidden w-64 border-r bg-muted/40 lg:block">
          <nav className="grid gap-2 p-4 text-sm">
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/readings">Readings</Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/appointments">Appointments</Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2" asChild>
              <Link href="/profile">Profile</Link>
            </Button>
            <Button variant="ghost" className="justify-start gap-2 bg-muted" asChild>
              <Link href="/health-companion">Health Companion</Link>
            </Button>
          </nav>
        </aside>
        <main className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold">Health Companion</h1>
              <p className="text-muted-foreground">
                Ask questions about diabetes management and get personalized advice
              </p>
            </div>
            <Card className="flex flex-1 flex-col">
              <CardHeader>
                <CardTitle>AI Health Assistant</CardTitle>
                <CardDescription>Powered by Azure OpenAI with your health data</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="flex-1 space-y-4 overflow-auto p-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Input
                    placeholder="Type your question here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSend}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

// Simulate AI responses - in a real app, this would call Azure OpenAI
function getAIResponse(input: string): string {
  const inputLower = input.toLowerCase()

  if (inputLower.includes("high blood sugar") || inputLower.includes("hyperglycemia")) {
    return "If you're experiencing high blood sugar (hyperglycemia), drink water to prevent dehydration, take your medication as prescribed, and check your blood sugar regularly. If it remains high, contact your healthcare provider. Based on your recent readings, your risk of sustained hyperglycemia is low."
  }

  if (inputLower.includes("low blood sugar") || inputLower.includes("hypoglycemia")) {
    return "For low blood sugar (hypoglycemia), follow the 15-15 rule: consume 15 grams of carbohydrates, wait 15 minutes, and check your blood sugar again. Good options include glucose tablets, fruit juice, or honey. Your recent readings show you haven't had a hypoglycemic episode in the past month."
  }

  if (inputLower.includes("diet") || inputLower.includes("food") || inputLower.includes("eat")) {
    return "Based on your profile and recent glucose patterns, focus on high-fiber foods like beans, whole grains, and vegetables. Limit refined carbs and added sugars. Consider smaller, more frequent meals to maintain steady glucose levels throughout the day. Your data shows your glucose spikes most after lunch - consider adjusting your midday meal composition."
  }

  if (inputLower.includes("exercise") || inputLower.includes("activity")) {
    return "Regular exercise helps improve insulin sensitivity. Aim for 150 minutes of moderate activity weekly. Your data shows your glucose levels are most stable on days you exercise in the morning. Consider activities like walking, swimming, or cycling that are sustainable and enjoyable."
  }

  if (inputLower.includes("medication") || inputLower.includes("medicine") || inputLower.includes("insulin")) {
    return "Always take your medication as prescribed. Your adherence data shows you've been consistent with your morning dose but occasionally miss your evening medication. Set a reminder to help maintain consistency. If you experience side effects, consult your healthcare provider before making any changes."
  }

  return "I'm here to help with your diabetes management questions. You can ask about blood sugar management, diet recommendations, exercise, medication, or any other aspect of diabetes care. Your data is used to provide personalized advice based on your specific health patterns."
}

