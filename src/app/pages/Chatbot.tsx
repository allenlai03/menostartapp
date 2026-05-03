import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft, Send, Bot, Sparkles } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi Sarah! I'm here to help with anything about your symptoms or menopause questions. What's on your mind today?",
    time: "9:00 AM",
  },
];

const quickReplies = [
  "What triggers my hot flashes?",
  "Tips for better sleep",
  "Prepare a doctor report",
  "Explain my ring data",
];

const typingResponses: Record<string, string> = {
  "What triggers my hot flashes?":
    "Based on your 90-day data, your top 3 triggers are:\n\n1. **Poor sleep** (under 6 hours) — 73% correlation with next-day hot flashes\n\n2. **Caffeine after 2 PM** — linked to 45% increase in evening episodes\n\n3. **High stress** (low HRV readings) — 61% correlation\n\nYour ring has also detected that hot, enclosed spaces increase episode severity by about 2x.\n\nWould you like me to set up alerts for these triggers?",
  "Tips for better sleep":
    "Here's a personalized sleep plan based on your patterns:\n\n**Before bed** (start 1 hour before)\n• Lower room temp to 65–68°F — your night sweats decrease 40% at this range\n• Avoid screens 30 min before bed\n• Try the guided relaxation in the app\n\n**During sleep**\n• Your worst disruptions happen between 2–4 AM. A cooling pad may help\n• Your ring will track and report improvements\n\nYour best sleep this month was last Tuesday — 8.2 hours with only 2 disruptions. That day you walked 8,000+ steps and had no caffeine after noon.",
  "Prepare a doctor report":
    "I can generate a comprehensive report for your clinician! It will include:\n\n• **Symptom summary** — frequency, severity, and trends\n• **Biometric data** — heart patterns, temperature, and sleep\n• **Trigger analysis** — your identified triggers and correlations\n• **What's working** — and what isn't\n\nThe report covers the last 30 days. Would you like me to prepare it? You can review before sharing.",
  "Explain my ring data":
    "Your MenoStart ring tracks 3 key signals:\n\n**Heart rhythm** — Measures how your heart rate varies beat-to-beat. Lower variability often means higher stress or a hot flash is coming. Yours is a bit low today.\n\n**Skin temperature** — Tracks your thermal patterns throughout the day. Right now you're about 1°F warmer than your usual baseline.\n\n**Movement** — Helps distinguish hot flashes from exercise and tracks your activity level.\n\nAll three signals feed into our AI to predict hot flashes 15–45 minutes ahead. The more you wear it, the more accurate it gets.",
};

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const responseText =
      typingResponses[text.trim()] ||
      "That's a great question. Based on your health data and symptom history, I'd recommend discussing this with your clinician for personalized medical advice. In the meantime, I can help you prepare a detailed report of your symptoms and trends to bring to your appointment. Would you like me to do that?";

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: responseText,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const renderMessageText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="min-h-full flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-gray-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="w-11 h-11 rounded-xl bg-white shadow-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-800">MenoStart AI</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-sm text-gray-500">Always here for you</p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-5 py-5 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-2xl rounded-br-md"
                  : "bg-white text-gray-700 rounded-2xl rounded-bl-md shadow-sm"
              } px-4 py-3`}
            >
              {msg.role === "assistant" && (
                <div className="flex items-center gap-1.5 mb-2">
                  <Bot className="w-4 h-4 text-rose-400" />
                  <span className="text-xs font-semibold text-rose-400">
                    MenoStart AI
                  </span>
                </div>
              )}
              <p
                className={`text-[15px] leading-relaxed whitespace-pre-line ${
                  msg.role === "user" ? "text-white" : "text-gray-700"
                }`}
              >
                {renderMessageText(msg.text)}
              </p>
              <p
                className={`text-xs mt-2 ${
                  msg.role === "user" ? "text-white/60" : "text-gray-400"
                } text-right`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-md shadow-sm px-4 py-3">
              <div className="flex items-center gap-1.5 mb-2">
                <Bot className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-semibold text-rose-400">
                  MenoStart AI
                </span>
              </div>
              <div className="flex items-center gap-2 py-1">
                <div
                  className="w-2.5 h-2.5 rounded-full bg-gray-300 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2.5 h-2.5 rounded-full bg-gray-300 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2.5 h-2.5 rounded-full bg-gray-300 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick Replies */}
      <div className="px-5 pb-2">
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => sendMessage(reply)}
              className="px-4 py-2.5 bg-white rounded-xl text-sm font-medium text-gray-600 shadow-sm border border-gray-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-colors active:scale-95"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-5 pb-28 pt-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-white rounded-2xl px-4 py-3.5 text-base text-gray-700 placeholder-gray-400 shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-sm disabled:opacity-40 transition-opacity active:scale-95"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
