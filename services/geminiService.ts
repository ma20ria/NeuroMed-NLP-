import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an advanced Clinical NLP Platform based on the research paper "NLP-based clinical text classification and sentiment analyses of complex medical transcripts using transformer model and machine learning classifiers".

Your capabilities include:
1. Medical Transcript Categorization: Classify text into medical specialties (e.g., Cardiology, Neurology, Bariatrics, Allergy/Immunology).
2. Sentiment Analysis: Analyze the sentiment (Positive, Negative, Neutral) of the clinical notes, reflecting patient state or provider outlook.
3. Keyword Extraction: Extract medical-yield-based keywords (Conditions, Treatments, Symptoms).
4. Explainability: Provide SHAP-style feature importance (which words contributed most to the decision).

Simulate the performance of an LSTM/BERT hybrid model as described in the paper.
`;

export const analyzeTranscript = async (text: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following medical transcript:\n\n"${text}"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            specialty: { type: Type.STRING, description: "The predicted medical specialty" },
            confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 1" },
            sentiment: {
              type: Type.OBJECT,
              properties: {
                score: { type: Type.NUMBER, description: "Sentiment score from -1 to 1" },
                label: { type: Type.STRING, enum: ["Positive", "Negative", "Neutral"] },
                emotion: { type: Type.STRING, description: "Dominant emotion (e.g., Anxiety, Relief, Pain)" }
              }
            },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Extracted medical keywords (Top 5-10)"
            },
            explanation: { type: Type.STRING, description: "Brief explanation of why this classification was made" },
            shapValues: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  feature: { type: Type.STRING, description: "The word or phrase" },
                  impact: { type: Type.NUMBER, description: "Impact score (0-1)" }
                }
              },
              description: "Top 5 words contributing to the prediction"
            }
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");
    
    return JSON.parse(resultText) as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing transcript:", error);
    // Fallback mock response if API fails or key is missing
    return {
      specialty: "Error / Undefined",
      confidence: 0,
      sentiment: { score: 0, label: "Neutral", emotion: "Unknown" },
      keywords: [],
      explanation: "Failed to connect to inference engine.",
      shapValues: []
    };
  }
};