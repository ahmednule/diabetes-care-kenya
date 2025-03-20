import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function getHealthRecommendation(patientData: any, query: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Based on the following patient data:
        - Recent glucose readings: ${JSON.stringify(patientData.recentReadings)}
        - Medication adherence: ${patientData.medicationAdherence}%
        - Exercise frequency: ${patientData.exerciseFrequency} times per week
        - Diet information: ${patientData.dietInfo}
        
        Provide personalized advice for this question: ${query}
      `,
      system: `
        You are a diabetes health assistant for Kenyan patients. 
        Provide culturally relevant advice that considers:
        - Local healthcare resources
        - Kenyan dietary patterns and available foods
        - Common challenges in diabetes management in Kenya
        - Affordable medication options
        - Practical exercise recommendations
        
        Keep responses concise, practical, and actionable.
      `,
    })

    return text
  } catch (error) {
    console.error("Error generating health recommendation:", error)
    return "I'm sorry, I couldn't process your request at the moment. Please try again later."
  }
}

export async function getPredictiveRiskAnalysis(
  patientData: any,
): Promise<{ riskLevel: string; factors: string[]; recommendations: string[] }> {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
        Analyze the following patient data and provide a diabetes risk assessment:
        - Recent glucose readings: ${JSON.stringify(patientData.recentReadings)}
        - HbA1c: ${patientData.hba1c}%
        - Age: ${patientData.age}
        - BMI: ${patientData.bmi}
        - Family history: ${patientData.familyHistory}
        - Current medications: ${patientData.medications}
        
        Format the response as a JSON object with the following structure:
        {
          "riskLevel": "Low|Medium|High",
          "factors": ["factor1", "factor2", ...],
          "recommendations": ["recommendation1", "recommendation2", ...]
        }
      `,
      system:
        "You are an AI assistant that specializes in diabetes risk assessment. Provide accurate, evidence-based risk analysis.",
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating risk analysis:", error)
    return {
      riskLevel: "Unknown",
      factors: ["Unable to analyze risk factors at this time"],
      recommendations: ["Please consult with your healthcare provider"],
    }
  }
}

