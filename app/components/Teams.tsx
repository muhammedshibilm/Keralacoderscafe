"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Code, Mail, Linkedin, User, Send, ArrowRight } from "lucide-react";
import { upvoteTeamMember } from "@/app/actions/upvote";

export default function Teams({ initialVotes = 0 }: { initialVotes?: number }) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    setVotes(initialVotes);
  }, [initialVotes]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const voted = localStorage.getItem("teamVoted:akhil");
      if (voted) {
        setHasVoted(true);
      }
    }
  }, []);

  const handleLike = async () => {
    if (hasVoted || isVoting) return;
    
    // Optimistic Update
    setVotes((prev) => prev + 1);
    setHasVoted(true);
    setIsVoting(true);

    try {
      const res = await upvoteTeamMember("akhil");
      if (res.success && res.votes !== undefined) {
        setVotes(res.votes);
        localStorage.setItem("teamVoted:akhil", "true");
      } else {
        setVotes((prev) => prev - 1);
        setHasVoted(false);
      }
    } catch (err) {
      console.error("Failed to upvote:", err);
      setVotes((prev) => prev - 1);
      setHasVoted(false);
    } finally {
      setIsVoting(false);
    }
  };

  const triggerCoffeeModal = () => {
    window.dispatchEvent(new Event("open-coffee-modal"));
  };

  return (
    <section
      id="teams"
      className="scroll-mt-24 px-6 py-20 md:px-12 bg-[#F4F4F4] relative overflow-hidden select-none"
    >
      {/* Top Right Dotted Grid Pattern */}
      <div
        className="absolute top-12 right-12 w-64 h-64 pointer-events-none opacity-20 hidden md:block"
        style={{
          backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px"
        }}
      />

      <div className="mx-auto max-w-[1100px] flex flex-col gap-12 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col gap-2">
          <span className="self-start border-2 border-black bg-[#7C5DFA] text-black font-black uppercase text-xs tracking-wider px-3.5 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
            Behind the Cafe
          </span>
          <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.85] tracking-tight text-black uppercase">
            Meet the
          </h2>
          <div className="self-start border-3 border-black bg-[#C0FF00] px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-2">
            <span className="text-[clamp(2.5rem,7vw,4.5rem)] font-black leading-none tracking-tight text-black uppercase">
              Team
            </span>
          </div>
        </div>

        {/* Quote Block */}
        <blockquote className="font-mono text-sm sm:text-base text-black font-black border-l-6 border-[#7C5DFA] pl-4 my-4 uppercase max-w-xl leading-relaxed">
          "Build in public. Learn from peers. Ship real products."
        </blockquote>

        {/* Main Grid: Profile Card & Real Story Card */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 items-start mt-4">
          
          {/* Left Column: Profile Card */}
          <div className="relative w-full max-w-[400px] mx-auto lg:mx-0">
            {/* Green shadow backplate */}
            <div className="absolute inset-0 bg-[#C0FF00] border-2 border-black translate-x-3.5 translate-y-3.5 -z-10" />
            
            {/* Main White Card */}
            <div className="relative border-2 border-black bg-white p-6 flex flex-col gap-6">
              
              {/* Founder Tag */}
              <div className="border-2 border-black bg-[#7C5DFA] text-white font-mono font-black text-xs px-3.5 py-1 flex items-center gap-1 uppercase tracking-wider self-start shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Founder ★
              </div>

              {/* Support / Vote Count Button */}
              <button
                onClick={handleLike}
                disabled={hasVoted || isVoting}
                className={`absolute top-6 right-6 border-2 border-black px-3.5 py-1.5 rounded-full shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3.5px_3.5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1.5 font-mono text-xs font-black select-none ${
                  hasVoted ? "bg-[#C0FF00] text-black border-black" : "bg-white text-black hover:bg-amber-50"
                }`}
                title={hasVoted ? "Supported!" : "Support this team member"}
              >
                <span className="text-sm">🤝🏾</span>
                <span>{votes}</span>
              </button>

              {/* Avatar Image container */}
              <div className="w-36 h-36 rounded-full border-2 border-black bg-[#C0FF00] flex items-center justify-center mx-auto mt-2 overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <User className="h-20 w-20 text-black stroke-[2.5]" />
              </div>

              {/* Name & Active status */}
              <div className="flex items-end justify-between mt-2">
                <div>
                  <h4 className="font-black text-2xl uppercase tracking-tight text-black leading-none">
                    Akhil
                  </h4>
                  <p className="text-xs font-mono text-black/60 mt-1">
                    @atomrobic
                  </p>
                </div>
                <div className="border border-black bg-[#C0FF00] text-black font-mono font-black uppercase text-[10px] tracking-wider px-2 py-0.5 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                  Active
                </div>
              </div>

              {/* Horizontal Line Divider */}
              <div className="border-t-2 border-black" />

              {/* Connect Section */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-black/60">
                  Connect
                </span>
                
                {/* Telegram */}
                <Link
                  href="https://t.me/kerala_coders_cafe_akhil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-black bg-white p-3 flex items-center justify-center gap-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-mono text-xs font-black uppercase tracking-wider text-black"
                >
                  <Send className="h-4 w-4 text-black stroke-[3]" />
                  Telegram @KERALA_CODERS_CAFE
                </Link>
              </div>

            </div>
          </div>

          {/* Right Column: Real Story Card */}
          <div className="relative w-full">
            {/* White card with black shadow */}
            <div className="relative border-2 border-black bg-white p-8 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6">
              
              {/* Header Box & Title */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#7C5DFA] border-2 border-black flex items-center justify-center text-white text-2xl font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] select-none">
                  “
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-black uppercase tracking-tight text-black">
                    The Real Story
                  </h3>
                  <div className="w-10 h-0.5 bg-black mt-1" />
                </div>
              </div>

              {/* Main Narrative Text */}
              <div className="font-mono text-xs md:text-sm leading-relaxed text-black/85 space-y-6 select-text">
                <p>
                  I graduated with a <strong className="font-black text-black">B.A. in History</strong> in 2020. Unsure about my future, I spent two years working in a small sales shop, knowing I wasn't growing.
                </p>
                <p>
                  Determined to change my career, I tried different programs and dropped out twice. I worked part-time during the day to support myself and taught myself web development at night.
                </p>
                <p>
                  Everything changed when I discovered Telegram developer communities. They gave me the guidance, mentorship, and friendships I lacked. Through those connections, I finally landed my first job in the IT industry.
                </p>
                <p className="font-black text-black text-sm md:text-base">
                  Connections can change lives.
                </p>
                <p>
                  Because of that, I started <strong className="font-black text-black">Kerala Coders Cafe</strong>. I wanted to build the kind of community that once helped me—a place where developers learn, support each other, and grow together without feeling alone.
                </p>
                <p>
                  Today, seeing our members find jobs and help one another reminds me why I started this journey. I am deeply grateful to everyone who supported me.
                </p>
                <p className="font-black text-black text-sm md:text-base">
                  Thank you for being part of this journey. ❤️
                </p>
              </div>

              {/* Right aligned Signature */}
              <div className="text-right mt-4 tracking-tight flex flex-col items-end">
                <div className="flex items-center gap-1.5">
                  <span className="font-black uppercase text-xs md:text-sm text-black">— Akhil</span>
                  <span className="inline-block w-1.5 h-5 bg-[#7C5DFA]" />
                </div>
                <span className="text-[10px] md:text-xs font-semibold text-black/50 italic mr-3">Founder, Kerala Coders Cafe</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Social Links Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          
          {/* GitHub Card */}
          <div className="relative group">
            {/* Purple Shadow backplate */}
            <div className="absolute inset-0 bg-[#7C5DFA] border-2 border-black translate-x-2 translate-y-2 -z-10 group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-all" />
            <Link
              href="https://github.com/atomrobic"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-white border-2 border-black p-4 flex items-center justify-between hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-white shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Github className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-mono text-black/50 uppercase">Follow On</span>
                  <span className="text-sm font-black uppercase tracking-tight text-black">Github</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-black stroke-[3]" />
            </Link>
          </div>

          {/* LinkedIn Card */}
          <div className="relative group">
            {/* Green Shadow backplate */}
            <div className="absolute inset-0 bg-[#C0FF00] border-2 border-black translate-x-2 translate-y-2 -z-10 group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-all" />
            <Link
              href="https://www.linkedin.com/in/akhil-a-7186052b5"
              target="_blank"
              rel="noopener noreferrer"
              className="relative bg-white border-2 border-black p-4 flex items-center justify-between hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-white shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Linkedin className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-mono text-black/50 uppercase">Connect On</span>
                  <span className="text-sm font-black uppercase tracking-tight text-black">Linkedin</span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-black stroke-[3]" />
            </Link>
          </div>

          {/* Email Card */}
          <div className="relative group">
            {/* Purple Shadow backplate */}
            <div className="absolute inset-0 bg-[#7C5DFA] border-2 border-black translate-x-2 translate-y-2 -z-10 group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-all" />
            <Link
              href="mailto:keralacoderscafe@gmail.com"
              className="relative bg-white border-2 border-black p-4 flex items-center justify-between hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-white shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Mail className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-[10px] font-mono text-black/50 uppercase">Email Us</span>
                  <span className="text-[11px] font-black tracking-tight text-black truncate">
                    keralacoderscafe@gmail.com
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-black stroke-[3] shrink-0" />
            </Link>
          </div>

          {/* Code Card */}
          <div className="relative group">
            {/* Green Shadow backplate */}
            <div className="absolute inset-0 bg-[#C0FF00] border-2 border-black translate-x-2 translate-y-2 -z-10 group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-all" />
            <div
              className="relative bg-white border-2 border-black p-4 flex items-center justify-between hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center text-white shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Code className="h-5 w-5 stroke-[2.5]" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-mono text-black/50 uppercase">Building</span>
                  <span className="text-sm font-black uppercase tracking-tight text-black">
                    Kcc In Public
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-black stroke-[3]" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
