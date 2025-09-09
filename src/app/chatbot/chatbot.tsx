"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Loader2, Bot, User as UserIcon, Youtube } from 'lucide-react';

interface Message {
  type: 'user' | 'bot' | 'video_suggestion' | 'crisis_response'; // Added crisis_response type
  text: string;
  videos?: Video[]; // Optional array of videos for video_suggestion type
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of messages whenever they update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to detect crisis-related keywords
  const isCrisisMessage = (text: string): boolean => {
    const crisisKeywords = [
      "suicidal", "kill myself", "end my life", "want to die", "harm myself",
      "can't go on", "hopeless", "no point", "give up", "despair", "self-harm"
    ];
    const lowerText = text.toLowerCase();
    return crisisKeywords.some(keyword => lowerText.includes(keyword));
  };

  const fetchYoutubeVideos = async (query: string): Promise<Video[]> => {
    const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 
    const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`;

    try {
      const response = await fetch(YOUTUBE_API_URL);
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.statusText}`);
      }
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        return data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
      return [];
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { type: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const userQuery = input;
    setInput(''); // Clear input immediately

    setIsLoading(true);

    // --- Crisis Response Logic ---
    if (isCrisisMessage(userQuery)) {
      const crisisResponseText = `
        It sounds like you're going through a very difficult time, and your feelings are valid. Please know that you're not alone and help is available.

        It's important to reach out to someone who can provide immediate support. Here are some helplines in India that can help you right now:

        📞 **Kiran Helpline (24/7):** 1800-599-0019
        📞 **AASRA (Mumbai-based, but takes calls from all over - 24/7):** +91 98204 66726
        📞 **Vandrevala Foundation (24/7):** 1860-2662-345 or 1800-2333-330

        Please connect with them immediately. They are there to listen and support you.
      `;
      setMessages((prevMessages) => [...prevMessages, { type: 'crisis_response', text: crisisResponseText }]);
      setIsLoading(false);
      return; // Stop further processing for crisis messages
    }
    // --- End Crisis Response Logic ---

    const MAX_RETRIES = 3;
    let retries = 0;
    let delay = 1000; // 1 second initial delay

    while (retries < MAX_RETRIES) {
      try {
        let chatHistory = [];
        // Construct chat history for the API call
        messages.forEach(msg => {
          chatHistory.push({ role: msg.type === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
        });
        
        // Refined prompt for general mental well-being advice
        chatHistory.push({ role: "user", parts: [{ text: `Provide a helpful, empathetic, and actionable response (around 100-150 words) to the user's message: "${userQuery}". Focus on practical advice, coping strategies, or a supportive perspective. Avoid generic statements and aim for personalized guidance.` }] });
        
        const payload = { contents: chatHistory };
        const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY; 
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;

        const response = await fetch(GEMINI_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          if (result.candidates && result.candidates.length > 0 &&
              result.candidates[0].content && result.candidates[0].content.parts &&
              result.candidates[0].content.parts.length > 0) {
            const botResponseText = result.candidates[0].content.parts[0].text;
            setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: botResponseText }]);

            // --- YouTube Video Suggestion Logic ---
            // Ask Gemini for a YouTube search query based on the user's last message and the bot's response
            const youtubeQueryPayload = {
              contents: [{
                role: "user",
                parts: [{ text: `Based on the user's message "${userQuery}" and the previous bot response, suggest a concise, relevant search query for YouTube videos related to mental well-being. Respond with ONLY the search query, no other text or punctuation.` }]
              }]
            };

            const youtubeQueryResponse = await fetch(GEMINI_API_URL, { // Still using Gemini API for query generation
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(youtubeQueryPayload)
            });

            if (youtubeQueryResponse.ok) {
              const youtubeQueryResult = await youtubeQueryResponse.json();
              const youtubeSearchQuery = youtubeQueryResult.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

              if (youtubeSearchQuery) {
                const videos = await fetchYoutubeVideos(youtubeSearchQuery);
                if (videos.length > 0) {
                  setMessages((prevMessages) => [...prevMessages, { type: 'video_suggestion', text: `Here are some videos about "${youtubeSearchQuery}":`, videos }]);
                }
              }
            } else {
              console.warn("Could not get YouTube search query from Gemini:", youtubeQueryResponse.statusText);
            }
            // --- End YouTube Video Suggestion Logic ---

            setIsLoading(false);
            return; // Success, exit function
          } else {
            setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: "Sorry, I couldn't generate a response for that. Please try rephrasing." }]);
            setIsLoading(false);
            return; // No valid content, exit function
          }
        } else if (response.status === 429 || response.status >= 500) {
          retries++;
          await new Promise(res => setTimeout(res, delay));
          delay *= 2;
        } else {
          throw new Error(`API error: ${response.status} - ${response.statusText}`);
        }
      } catch (error: any) {
        console.error("Error fetching chatbot response:", error);
        setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: `Oops! Something went wrong: ${error.message}. Please try again.` }]);
        setIsLoading(false);
        return; // Exit on unexpected errors
      }
    }
    // If loop finishes, all retries failed
    setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: "I'm having trouble connecting right now. Please try again later." }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Chatbot Toggle Button (still present for general access) */}
      <Button
        className="fixed bottom-6 right-6 z-50 rounded-full p-4 shadow-lg bg-sky-600 hover:bg-sky-700 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-sm h-[70vh] bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-700 bg-zinc-800">
            <h3 className="text-lg font-semibold text-zinc-100">ChatMenti</h3> {/* Updated title */}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close Chatbot">
              <X className="h-5 w-5 text-zinc-400 hover:text-zinc-100" />
            </Button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.length === 0 && (
              <div className="text-center text-zinc-500 mt-10">
                Type a message to start chatting!
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.type === 'bot' && (
                  <div className="flex-shrink-0 mr-2">
                    <Bot className="h-6 w-6 text-emerald-400" />
                  </div>
                )}
                {msg.type === 'user' && (
                  <div className="flex-shrink-0 ml-2">
                    <UserIcon className="h-6 w-6 text-zinc-400" />
                  </div>
                )}
                {msg.type === 'video_suggestion' ? (
                  <div className="max-w-[80%] p-3 rounded-lg bg-zinc-700 text-zinc-100 rounded-bl-none">
                    <p className="font-semibold mb-2">{msg.text}</p>
                    <div className="space-y-3">
                      {msg.videos?.map((video) => (
                        <a
                          key={video.id}
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center bg-zinc-800 rounded-lg overflow-hidden shadow-md hover:bg-zinc-700 transition-colors duration-200"
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-20 h-14 object-cover flex-shrink-0"
                            onError={(e) => { e.currentTarget.src = `https://placehold.co/80x56/334155/E2E8F0?text=No+Image`; }}
                          />
                          <div className="flex-1 p-2 text-sm">
                            <p className="font-medium text-zinc-100 line-clamp-2">{video.title}</p>
                            <p className="text-zinc-400 text-xs flex items-center mt-1">
                              <Youtube className="h-3 w-3 mr-1 text-red-500" /> Watch on YouTube
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : msg.type === 'crisis_response' ? ( // Render crisis response
                  <div className="max-w-[90%] p-3 rounded-lg bg-red-900/60 border border-red-700 text-red-100 rounded-bl-none">
                    <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
                  </div>
                ) : (
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-sky-600 text-white rounded-br-none'
                        : 'bg-zinc-700 text-zinc-100 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center">
                <Bot className="h-6 w-6 mr-2 text-emerald-400" />
                <div className="bg-zinc-700 text-zinc-100 p-3 rounded-lg rounded-bl-none">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Scroll target */}
          </div>

          {/* Chat Input Area */}
          <div className="p-4 border-t border-zinc-700 bg-zinc-800 flex items-center space-x-3">
            <input
              type="text"
              className="flex-grow p-3 bg-zinc-700 border border-zinc-600 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isLoading) {
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
            <Button
              className="bg-sky-600 hover:bg-sky-700 text-white rounded-full p-3"
              onClick={handleSendMessage}
              disabled={isLoading}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
