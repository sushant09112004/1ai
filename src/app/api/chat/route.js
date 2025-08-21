import { GenerativeModel } from "@google/generative-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST (req){
    try {
        const {prompt} = await req.json();

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model  = genAI.getGenerativeModel({model : "gemini-1.5-flash"});

        //generta response from user 

        const response  = await model.generateContent(prompt);
        return NextResponse.json({response : response.response.text()});
    } catch (error) {
        return NextResponse.json({error : "Failed to generate response"},{status : 500})
    }
}