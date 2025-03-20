import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createYoga } from "graphql-yoga"
import { makeExecutableSchema } from "@graphql-tools/schema"

// Define GraphQL schema
const typeDefs = `
  type GlucoseReading {
    id: ID!
    value: Float!
    unit: String!
    timestamp: String!
    label: String
    status: String!
  }

  type RiskAssessment {
    level: String!
    factors: [String!]
    recommendations: [String!]
  }

  type HealthInsight {
    title: String!
    description: String!
    actionable: Boolean!
  }

  type Query {
    getRecentReadings(limit: Int): [GlucoseReading!]!
    getReadingsByDateRange(startDate: String!, endDate: String!): [GlucoseReading!]!
    getRiskAssessment: RiskAssessment!
    getHealthInsights(limit: Int): [HealthInsight!]!
    getAIResponse(query: String!): String!
  }

  type Mutation {
    addGlucoseReading(value: Float!, unit: String!, label: String, timestamp: String): GlucoseReading!
  }
`

// Sample data - in a real app, this would come from Microsoft Fabric
const readings = [
  {
    id: "1",
    value: 6.2,
    unit: "mmol/L",
    timestamp: "2024-05-15T07:30:00Z",
    label: "Before Breakfast",
    status: "normal",
  },
  {
    id: "2",
    value: 7.8,
    unit: "mmol/L",
    timestamp: "2024-05-14T13:15:00Z",
    label: "After Lunch",
    status: "high",
  },
  {
    id: "3",
    value: 5.9,
    unit: "mmol/L",
    timestamp: "2024-05-14T19:00:00Z",
    label: "Before Dinner",
    status: "normal",
  },
  {
    id: "4",
    value: 6.5,
    unit: "mmol/L",
    timestamp: "2024-05-14T22:00:00Z",
    label: "Before Bed",
    status: "normal",
  },
  {
    id: "5",
    value: 5.4,
    unit: "mmol/L",
    timestamp: "2024-05-13T07:45:00Z",
    label: "Before Breakfast",
    status: "normal",
  },
]

const insights = [
  {
    title: "Consistent Morning Highs",
    description:
      "Your morning glucose readings tend to be higher than normal. Consider adjusting your evening medication or having a protein-rich snack before bed.",
    actionable: true,
  },
  {
    title: "Exercise Impact",
    description:
      "On days you exercise, your glucose levels are more stable. Try to maintain your current exercise routine.",
    actionable: true,
  },
  {
    title: "Medication Effectiveness",
    description: "Your current medication appears to be effectively managing your post-meal glucose spikes.",
    actionable: false,
  },
]

// Resolvers
const resolvers = {
  Query: {
    getRecentReadings: (_: any, { limit = 5 }: { limit: number }) => {
      return readings.slice(0, limit)
    },
    getReadingsByDateRange: (_: any, { startDate, endDate }: { startDate: string; endDate: string }) => {
      const start = new Date(startDate).getTime()
      const end = new Date(endDate).getTime()

      return readings.filter((reading) => {
        const readingTime = new Date(reading.timestamp).getTime()
        return readingTime >= start && readingTime <= end
      })
    },
    getRiskAssessment: () => {
      return {
        level: "Low",
        factors: ["Consistent glucose readings", "Regular exercise", "Medication adherence"],
        recommendations: [
          "Continue current management plan",
          "Schedule regular HbA1c tests",
          "Monitor for any changes in patterns",
        ],
      }
    },
    getHealthInsights: (_: any, { limit = 3 }: { limit: number }) => {
      return insights.slice(0, limit)
    },
    getAIResponse: async (_: any, { query }: { query: string }) => {
      try {
        // In a real app, this would use Azure OpenAI with proper context
        const { text } = await generateText({
          model: openai("gpt-4o"),
          prompt: `You are a diabetes health assistant for a Kenyan patient. 
                  Answer the following question with personalized advice: ${query}`,
          system:
            "You are a helpful AI assistant specializing in diabetes care for Kenyan patients. Provide culturally relevant advice that considers local healthcare resources and dietary patterns.",
        })

        return text
      } catch (error) {
        console.error("Error generating AI response:", error)
        return "I'm sorry, I couldn't process your request at the moment. Please try again later."
      }
    },
  },
  Mutation: {
    addGlucoseReading: (
      _: any,
      { value, unit, label, timestamp }: { value: number; unit: string; label?: string; timestamp?: string },
    ) => {
      const newReading = {
        id: (readings.length + 1).toString(),
        value,
        unit,
        label: label || "",
        timestamp: timestamp || new Date().toISOString(),
        status: getReadingStatus(value, unit),
      }

      readings.unshift(newReading)
      return newReading
    },
  },
}

function getReadingStatus(value: number, unit: string): string {
  if (unit === "mmol/L") {
    if (value < 4.0) return "low"
    if (value <= 7.0) return "normal"
    if (value <= 10.0) return "high"
    return "very-high"
  }

  // For mg/dL
  if (value < 70) return "low"
  if (value <= 126) return "normal"
  if (value <= 180) return "high"
  return "very-high"
}

// Create executable schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

// Create and export the GraphQL handler
const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: {
    Request: Request,
    Response: Response,
  },
})

export { handleRequest as GET, handleRequest as POST }

