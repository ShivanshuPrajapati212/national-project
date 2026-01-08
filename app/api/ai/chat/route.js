import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        const { message } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ reply: "I'm not fully configured yet. Please ask the admin to set the AI API Key." });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const systemInstruction = "You are a helpful and knowledgeable school AI assistant. You help students with their doubts, explain concepts clearly, and provide study tips. Keep answers concise and encouraging.";

        // Note: For a real chat app, you should maintain history. 
        // For this simple version, we'll just send the current message with system context.
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemInstruction }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to help students with their questions." }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ reply: text });
    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json({ error: 'Failed to process doubt' }, { status: 500 });
    }
}
