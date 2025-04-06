import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { message } = await request.json()
    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }
    
    const [recentReadings, medications, appointments] = await Promise.all([
      prisma.glucoseReading.findMany({
        where: { userId: user.id },
        orderBy: { timestamp: "desc" },
        take: 10,
      }),
      prisma.prescription.findMany({
        where: { userId: user.id, isActive: true },
        include: {
          medicationLogs: {
            orderBy: { timestamp: "desc" },
            take: 5,
          },
        },
      }),
      prisma.appointment.findMany({
        where: {
          userId: user.id,
          date: { gte: new Date() }
        },
        orderBy: { date: "asc" },
        take: 3,
      }),
    ])
    
    let subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    })
    
    if (!subscription) {
      subscription = await prisma.subscription.create({
        data: {
          userId: user.id,
          planId: "free",
          status: "active",
          tokensAllotted: 100,
          tokensRemaining: 100,
          lastTokenReset: new Date()
        }
      });
    } else {
      const lastReset = new Date(subscription.lastTokenReset);
      const today = new Date();
      
      if (lastReset.toDateString() !== today.toDateString()) {
        subscription = await prisma.subscription.update({
          where: { userId: user.id },
          data: { 
            tokensRemaining: 100,
            lastTokenReset: today
          }
        });
      }
    }
    
    if (subscription.tokensRemaining <= 0) {
      return NextResponse.json({
        error: "You've reached your daily limit. Please try again tomorrow."
      }, { status: 403 })
    }
    
    const userContext = {
      diabetesType: user.diabetesType,
      diagnosisDate: user.diagnosisDate,
      glucoseReadings: recentReadings.map(r => ({
        value: r.value,
        unit: r.unit,
        status: r.status,
        timestamp: r.timestamp
      })),
      activeMedications: medications.map(m => ({
        name: m.medicationName,
        dosage: m.dosage,
        frequency: m.frequency,
        adherence: calculateAdherence(m.medicationLogs)
      })),
      upcomingAppointments: appointments.map(a => ({
        title: a.title,
        date: a.date,
        doctor: a.doctorName
      }))
    }
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a helpful diabetes management assistant. Use the following patient context to provide personalized advice:
          ${JSON.stringify(userContext)}
          
          Always be supportive and encouraging. Focus on practical advice based on the patient's actual data.
          If there are concerning patterns in their glucose readings, mention them gently.
          Don't make up information - if you don't have enough context to answer specifically, provide general guidance.
          Keep responses concise and actionable.`
        },
        { role: "user", content: message }
      ],
      max_tokens: 400,
    })
    
    const aiResponse = completion.choices[0].message.content
    
    await prisma.subscription.update({
      where: { userId: user.id },
      data: { tokensRemaining: subscription.tokensRemaining - 10 }
    })
    
    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error("Error processing AI request:", error)
    return NextResponse.json({
      error: "Failed to generate response. Please try again."
    }, { status: 500 })
  }
}

function calculateAdherence(logs: any[]): string {
  if (!logs.length) return "unknown"
  
  const takenCount = logs.filter(log => log.taken).length
  const adherenceRate = (takenCount / logs.length) * 100
  
  if (adherenceRate >= 90) return "excellent"
  if (adherenceRate >= 75) return "good"
  if (adherenceRate >= 50) return "moderate"
  return "poor"
}