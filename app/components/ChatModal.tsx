"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Bot, User, Search, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "How do I join KCC? 🚀",
  "What is Toddy Shop Finder? 🍹",
  "Where is your GitHub? 💻",
  "What is the story behind KCC? 📖",
  "How do I showcase my project? ✨"
];

const renderContent = (content: string, onLinkClick: () => void) => {
  // Match absolute URLs or root-relative paths like /join or /toddy-shop-finder...
  const urlRegex = /(https?:\/\/[^\s]+|\/[a-zA-Z0-9-_\/]+)/g;
  const parts = content.split(urlRegex);

  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <Link 
          key={i} 
          href={part} 
          target={part.startsWith('http') ? "_blank" : "_self"}
          onClick={onLinkClick}
          className="text-black font-black underline decoration-2 decoration-[#00D9C0] hover:bg-[#00D9C0] hover:text-black transition-colors"
        >
          {part}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

export default function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the KCC Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Global hotkey CMD+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const sendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const textToSend = overrideText || input;
    if (!textToSend.trim() || isLoading) return;

    if (!overrideText) setInput("");
    
    const newMessages: Message[] = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");
      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantMessage = "";

      // Add an empty assistant message to stream into
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        assistantMessage += chunkValue;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].content = assistantMessage;
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting right now." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-black text-white px-5 py-3 rounded-full font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(0,217,192,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,217,192,1)] transition-all"
      >
        <Sparkles className="w-5 h-5 text-[#00D9C0]" />
        Ask AI
      </button>

      {/* The Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={(e) => {
          if (e.target === e.currentTarget) setIsOpen(false);
        }}>
          <div 
            className="bg-black w-full sm:w-[450px] h-full shadow-2xl flex flex-col overflow-hidden border-l-4 border-[#333] animate-in slide-in-from-right duration-300"
          >
            {/* Header */}
            <div className="bg-black border-b-4 border-[#333] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-[#00D9C0] text-black p-2 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black uppercase text-white leading-none">KCC Assistant</h3>
                  <p className="text-xs font-bold text-white/60 uppercase mt-1 tracking-widest">Ask anything or press CMD+K</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-black hide-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333] ${msg.role === 'assistant' ? 'bg-[#1a1a1a] text-[#00D9C0]' : 'bg-[#00D9C0] text-black'}`}>
                    {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] rounded-xl px-4 py-3 border-2 border-[#333] ${msg.role === 'assistant' ? 'bg-[#1a1a1a] text-white rounded-tl-none shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]' : 'bg-[#00D9C0] text-black rounded-tr-none shadow-[-2px_2px_0px_0px_rgba(255,255,255,0.1)]'}`}>
                    <p className={`text-sm sm:text-base font-medium leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'text-black' : 'text-gray-200'}`}>
                      {renderContent(msg.content, () => setIsOpen(false))}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 border-[#333] bg-[#1a1a1a] text-[#00D9C0]">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-[#1a1a1a] rounded-xl rounded-tl-none px-4 py-3 border-2 border-[#333] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#00D9C0] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#00D9C0] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[#00D9C0] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Buttons */}
            <div className="bg-[#111] p-4 border-t-4 border-[#333]">
              <p className="text-xs font-black uppercase text-white/40 mb-3 tracking-widest">Select a topic to ask:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(undefined, prompt)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-[#1a1a1a] text-white hover:bg-[#00D9C0] hover:text-black hover:border-[#00D9C0] border-2 border-[#333] rounded-full text-sm font-bold transition-colors disabled:opacity-50 disabled:hover:bg-[#1a1a1a]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
