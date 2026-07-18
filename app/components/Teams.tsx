"use client";

import Link from "next/link";
import { Github, Code, Mail, Linkedin, User, Send, ArrowRight } from "lucide-react";

export default function Teams() {
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

              {/* Connect Telegram Section */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-black/60">
                  Connect
                </span>
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
                  I graduated with a <strong className="font-black text-black">B.A. in History</strong> in 2020, right after the COVID pandemic. Like many others, I was unsure about my future. I spent nearly two years without a clear direction, and eventually financial pressure forced me to take a job at a small sales shop.
                </p>
                <p>
                  Even after working there for almost three years, I knew I wasn't growing. I wanted something more from life. I decided to leave my job and completely change my career.
                </p>
                <p>
                  My first attempt was to join a Gulf recruitment program, but I dropped out. Then I enrolled in a web development institute, hoping that would be my path. Unfortunately, I dropped out there too. During the day I worked part-time to support myself, and at night I started teaching myself web development.
                </p>
                <p>
                  That's when everything changed.
                </p>
                <p>
                  I discovered Telegram developer communities. Those groups gave me something I never had before—guidance, support, friendships, and opportunities. Many experienced developers answered my questions, reviewed my work, and encouraged me to keep going. A few of those people became mentors and close friends.
                </p>
                <p>
                  Through the connections I built in those communities, I eventually got my first opportunity in the IT industry.
                </p>
                <p>
                  That experience taught me one important lesson:
                </p>
                <p className="font-black text-black text-sm md:text-base">
                  Connections can change lives.
                </p>
                <p>
                  Because of that, I started <strong className="font-black text-black">Kerala Coders Cafe</strong>. My goal wasn't just to create another developer group. I wanted to build the kind of community that once helped me—a place where people learn together, support each other, share opportunities, and grow without feeling alone.
                </p>
                <p>
                  Today, seeing members find jobs, make connections, learn new skills, and help each other reminds me why I started this journey.
                </p>
                <p>
                  I'm truly grateful for everyone who supported me along the way. Your encouragement, feedback, and trust mean more than words can express.
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
