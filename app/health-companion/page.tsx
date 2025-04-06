"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import DashboardLayout from "@/components/DashboardLayout"

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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/health-companion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()
      
      const aiResponse: Message = {
        role: "assistant",
        content: data.response,
      }
      
      setMessages((prev) => [...prev, aiResponse])
    } catch (err: any) {
      setError(err.message)
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: `I'm sorry, I'm having trouble responding right now. ${err.message}` 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatMessageContent = (content: string) => {
    let formattedContent = content.replace(
      /(\d+\.\s+.*?)(?=\n\d+\.|$)/gs,
      '<li class="ml-4 mb-1">$1</li>'
    );
    
    formattedContent = formattedContent.replace(
      /\*\*(.*?)\*\*/g, 
      '<span class="font-bold">$1</span>'
    );
    
    formattedContent = formattedContent.replace(
      /\n+/g, 
      '</p><p class="mt-2">'
    );
    
    formattedContent = `<p>${formattedContent}</p>`;
    
    formattedContent = formattedContent.replace(
      /<p>(<li.*?<\/li>)<\/p>/gs,
      '<ul class="list-disc list-inside my-2">$1</ul>'
    );
    
    return formattedContent;
  };

  return (
    <DashboardLayout>
      <div className="flex min-h-screen flex-col">
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
                <CardDescription>Powered by OpenAI with your personal health data</CardDescription>
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
                        {message.role === "assistant" ? (
                          <div 
                            className="text-sm prose prose-sm max-w-none" 
                            dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                          />
                        ) : (
                          <p className="text-sm">{message.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                        <p className="text-sm flex items-center gap-2">
                          <span className="animate-pulse">●</span>
                          <span className="animate-pulse delay-100">●</span>
                          <span className="animate-pulse delay-200">●</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Input
                    placeholder="Type your question here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button size="icon" onClick={handleSend} disabled={isLoading || !input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {error && (
                  <p className="text-sm text-red-500 mt-2">
                    {error}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}