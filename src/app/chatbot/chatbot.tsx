"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/src/components/ui/button";
import { X, Send, Loader2, Bot, User as UserIcon, Youtube } from "lucide-react";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

interface Message {
  type: "user" | "bot" | "video_suggestion" | "crisis_response";
  text: string;
  videos?: Video[];
}

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

const GEMINI_API_URL = "/api/chat";

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (!isOpen) return null;

  const isCrisis = (text: string) => {
    const keywords = [
      "suicidal",
      "kill myself",
      "want to die",
      "end my life",
      "self harm",
      "give up",
    ];
    return keywords.some(k => text.toLowerCase().includes(k));
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setMessages(prev => [...prev, { type: "user", text: userText }]);
    setLoading(true);

    // 🚨 Crisis handling
    if (isCrisis(userText)) {
      setMessages(prev => [
        ...prev,
        {
          type: "crisis_response",
          text:
            "I'm really sorry you're feeling this way.\n\n" +
            "🇮🇳 India Helplines:\n" +
            "📞 Kiran (24/7): 1800-599-0019\n" +
            "📞 AASRA: +91 9820466726\n\n" +
            "Please reach out. You matter.",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      // 🧠 Gemini main response
      const res = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userText }],
            },
          ],
        }),
      });

      if (!res.ok) throw new Error("Gemini failed");

      const data = await res.json();
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm here with you.";

      setMessages(prev => [...prev, { type: "bot", text: reply }]);

      // 🎥 STEP 1: ask Gemini for a YouTube search query
      const queryRes = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Give ONE short YouTube search query related to: "${userText}". Respond with only the query.`,
                },
              ],
            },
          ],
        }),
      });

      if (!queryRes.ok) return;

      const queryData = await queryRes.json();
      const query =
        queryData.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (!query) return;

      // 🎥 STEP 2: call YOUR backend (/api/youtube)
      const videoRes = await fetch("/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!videoRes.ok) return;

      const videoData = await videoRes.json();

      if (videoData.videos?.length > 0) {
        setMessages(prev => [
          ...prev,
          {
            type: "video_suggestion",
            text: `Helpful videos for "${query}"`,
            videos: videoData.videos,
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { type: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-end justify-end p-6">
      <div className="w-95 h-[70vh] bg-zinc-900 border border-zinc-700 rounded-lg flex flex-col shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-center p-3 border-b border-zinc-700">
          <h3 className="text-zinc-100 font-semibold">ChatMenti</h3>
          <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4 text-zinc-300" />
          </Button>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.type === "bot" && (
                <Bot className="h-5 w-5 mr-2 text-emerald-400" />
              )}
              {m.type === "user" && (
                <UserIcon className="h-5 w-5 ml-2 text-zinc-400" />
              )}

              {m.type === "video_suggestion" ? (
                <div className="bg-zinc-700 p-3 rounded-lg max-w-[85%]">
                  <p className="font-semibold mb-2">{m.text}</p>
                  {m.videos?.map(v => (
                    <a
                      key={v.id}
                      href={v.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex gap-2 mb-2 bg-zinc-800 rounded p-2 hover:bg-zinc-600"
                    >
                      <img
                        src={v.thumbnail}
                        className="w-20 h-14 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm">{v.title}</p>
                        <p className="text-xs text-zinc-400 flex items-center">
                          <Youtube className="h-3 w-3 mr-1 text-red-500" />
                          YouTube
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div
                  className={`p-3 rounded-lg max-w-[85%] ${
                    m.type === "user"
                      ? "bg-sky-600 text-white"
                      : "bg-zinc-700 text-zinc-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center">
              <Bot className="h-5 w-5 mr-2 text-emerald-400" />
              <Loader2 className="animate-spin h-4 w-4" />
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* INPUT */}
        <div className="p-3 border-t border-zinc-700 flex gap-2">
          <input
            className="flex-1 bg-zinc-800 text-white p-2 rounded"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} disabled={loading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
