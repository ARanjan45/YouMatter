import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // ✅ Normalize input (single message OR chat history)
    let contents;
    
    // Accept contents directly (from chatbot)
    if (body.contents) {
      contents = body.contents;
    }
    // Accept messages array format
    else if (Array.isArray(body.messages)) {
      contents = body.messages.map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));
    } 
    // Accept single message format
    else if (typeof body.message === "string") {
      contents = [
        {
          role: "user",
          parts: [{ text: body.message }],
        },
      ];
    } else {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    // 🔄 UPDATED: Use 'gemini-2.5-flash' (Current Stable Model)
    // 'gemini-1.5-flash' is retired.
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { error: errText },
        { status: res.status }
      );
    }

    const data = await res.json();
    
    // Return full data object (chatbot expects this format)
    return NextResponse.json(data);
    
  } catch (err) {
    console.error("Chat API crash:", err);
    return NextResponse.json(
      { error: "Server crashed" },
      { status: 500 }
    );
  }
}