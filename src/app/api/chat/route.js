import { GenerativeModel } from "@google/generative-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // Validate input
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide a valid prompt" },
        { status: 400 }
      );
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return NextResponse.json(
        { error: "AI service is not configured. Please contact support." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Check if this is a "Think Faster" request
    const isThinkFaster = prompt.startsWith('[THINK_FASTER]');
    let processedPrompt = prompt;
    
    if (isThinkFaster) {
      // Remove the prefix and add instructions for faster response
      processedPrompt = prompt.replace('[THINK_FASTER]', '').trim();
      processedPrompt = `Please provide a concise and quick response to: ${processedPrompt}. Keep it brief but helpful.`;
    }

    // Generate response from user prompt
    const result = await model.generateContent(processedPrompt.trim());
    const response = await result.response;
    const text = response.text();

    if (!text) {
      return NextResponse.json(
        { error: "No response generated from AI service" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      response: text,
      timestamp: new Date().toISOString(),
      mode: isThinkFaster ? "fast" : "normal"
    });

  } catch (error) {
    console.error("Chat API error:", error);
    
    // Handle specific Gemini API errors
    if (error.message?.includes("API_KEY")) {
      return NextResponse.json(
        { error: "Invalid API key. Please check your configuration." },
        { status: 401 }
      );
    }
    
    if (error.message?.includes("quota")) {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again later." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate response. Please try again." },
      { status: 500 }
    );
  }
}