import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY environment variable.");
  process.exit(1);
}

const client = new GoogleGenAI({ apiKey });

export async function generateGeminiResponse(userPrompt) {
  try {
    const response = await client.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: userPrompt,
    });

    return response.text || "No response received.";
  } catch (err) {
    console.error("Gemini request failed:", err);
    throw new Error("Unable to reach Gemini right now.");
  }
}
