
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { message } = await req.json();

        // Placeholder Logic - Connect to Gemini/OpenAI here
        // const response = await fetch('AI_API_URL', ...);

        const mockReply = `Use your Brain man, why you are asking me "${message}"? Go study hard!`;

        return NextResponse.json({ reply: mockReply });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to process doubt' }, { status: 500 });
    }
}
