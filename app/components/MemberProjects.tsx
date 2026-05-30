"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { Star, GitFork, ArrowRight, ExternalLink } from "lucide-react";
import { GridPattern } from "./GridPattern";
import { cn } from "@/lib/utils";

const mockProjects = [
  {
    id: 1,
    name: "KCC Next.js Starter",
    author: "Akhil",
    description: "A highly optimized, brutalist Next.js boilerplate tailored for KCC community projects.",
    stats: { stars: 312, forks: 48 },
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=750",
    windowColor: "bg-[#A18CE5]", // Purple
    pillColor: "bg-[#FF8C42]", // Orange
    link: "#"
  },
  {
    id: 2,
    name: "Kerala Transit API",
    author: "Rahul S.",
    description: "An open-source JSON API aggregating public transport schedules across Kerala districts.",
    stats: { stars: 842, forks: 124 },
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&q=80&w=600&h=750",
    windowColor: "bg-[#42A5F5]", // Blue
    pillColor: "bg-[#FFD166]", // Yellow
    link: "#"
  },
  {
    id: 3,
    name: "Malayalam NLP Toolkit",
    author: "Sneha V.",
    description: "A Python library providing advanced tokenization and sentiment analysis for Malayalam text.",
    stats: { stars: 215, forks: 34 },
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=750",
    windowColor: "bg-[#FFD166]", // Yellow
    pillColor: "bg-[#8AC926]", // Green
    link: "#"
  }
];

export default function MemberProjects() {
  const [isLoading] = useState(true);

  return (
    <section id="community-projects" className="scroll-mt-24 px-6 py-28 md:px-12 bg-[#FDFBF7] border-t-[3px] border-black relative overflow-hidden">

      {/* Playful Memphis Grid Pattern */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent)]",
          "opacity-60 stroke-[#FF8C42]/40 fill-transparent"
        )}
      />

      <div className="mx-auto max-w-[1280px] relative z-10">

        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 relative">

          {/* Decorative squiggles and stars could go here */}
          <svg className="absolute -top-10 left-1/2 w-16 h-16 text-[#42A5F5] fill-current animate-[spin_10s_linear_infinite] hidden md:block" viewBox="0 0 100 100">
            <path d="M50 0L60 35L95 35L65 55L75 90L50 70L25 90L35 55L5 35L40 35Z" />
          </svg>

          <div>
            <div className="inline-block border-[3px] border-black bg-[#A18CE5] px-4 py-1 text-xs font-black uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 rounded-full">
              Community Showcase
            </div>
            <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-black uppercase tracking-tight text-black leading-[0.9]">
              Members
              <br />
              <span className="relative inline-block mt-3">
                <span className="relative z-10 bg-[#FFD166] border-[4px] border-black px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-md inline-block -rotate-2">
                  Self Projects
                </span>
                {/* Decorative purple arrow behind text */}
                <svg className="absolute -bottom-6 -right-12 w-16 h-16 text-[#A18CE5] z-0 -rotate-12" viewBox="0 0 100 100" fill="currentColor" stroke="black" strokeWidth="4">
                  <path d="M0 0 L100 50 L0 100 Z" />
                </svg>
              </span>
            </h2>
          </div>
          <p className="max-w-md text-black/80 font-bold text-lg border-l-4 border-black pl-4">
            Discover the amazing open-source tools, libraries, and self projects shipped by developers in the KCC community.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {isLoading ? (
            // Skeleton Loaders
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-concrete shadow-concrete rounded-sm p-4 h-[400px] animate-pulse">
                <div className="w-full h-full bg-black/10 rounded-sm"></div>
              </div>
            ))
          ) : (
            mockProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-concrete p-5 rounded-sm shadow-[10px_10px_20px_rgba(0,0,0,0.5)] border-2 border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_25px_rgba(0,0,0,0.6)] flex flex-col h-full"
              >
                {/* Rivets on outer concrete shell */}
                <div className="rivet top-2 left-2"></div>
                <div className="rivet top-2 right-2"></div>
                <div className="rivet bottom-2 left-2"></div>
                <div className="rivet bottom-2 right-2"></div>

                {/* Inner Screen Bevel */}
                <div className="relative w-full aspect-[4/3] bg-black p-1 rounded-sm shadow-[inset_0px_5px_15px_rgba(0,0,0,0.9)] mb-6 border-b-2 border-r-2 border-white/20">
                  <div className="relative w-full h-full overflow-hidden border border-black/50">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-500"
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    />
                    {/* Scanline overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50"></div>
                  </div>
                </div>

                {/* Metal Nameplate */}
                <div className="relative bg-metal shadow-metal p-3 rounded-sm border border-black/30 mb-4 flex-grow flex flex-col">
                  {/* Small plate rivets */}
                  <div className="rivet top-1 left-1 scale-75"></div>
                  <div className="rivet top-1 right-1 scale-75"></div>
                  <div className="rivet bottom-1 left-1 scale-75"></div>
                  <div className="rivet bottom-1 right-1 scale-75"></div>

                  <h3 className="text-lg font-black text-black/80 text-stamped leading-tight tracking-tight mt-1 text-center">
                    {project.name.toUpperCase()}
                  </h3>
                  
                  <div className="w-full h-px bg-black/20 my-2 shadow-[0_1px_0_rgba(255,255,255,0.5)]"></div>

                  <p className="text-black/70 text-xs font-bold leading-relaxed flex-grow text-center">
                    {project.description}
                  </p>

                  <div className="mt-3 inline-block bg-black/80 text-[#FFD166] px-2 py-1 text-[10px] font-black uppercase tracking-widest shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8)] border border-white/10 self-center">
                    DEV: {project.author}
                  </div>
                </div>

                {/* Bottom Stats/Link Row (Metal Bar) */}
                <div className="relative bg-metal shadow-metal h-10 w-full rounded-sm border border-black/30 flex items-center justify-between px-4 mt-auto">
                  <div className="flex items-center gap-4 text-black/80 text-[10px] font-black text-stamped">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5" />
                      <span>{project.stats.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{project.stats.forks}</span>
                    </div>
                  </div>

                  <Link
                    href={project.link}
                    className="flex items-center justify-center w-6 h-6 rounded-sm bg-black/80 text-[#8AC926] shadow-[inset_1px_1px_3px_rgba(0,0,0,0.8)] border border-white/10 hover:text-white hover:bg-black transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 stroke-[3]" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/projects"
            className="inline-flex h-16 items-center justify-center gap-3 border-[3px] border-black bg-[#A18CE5] px-8 text-lg font-black uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all w-full sm:w-auto rounded-xl"
          >
            View All Projects
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSeeHzA9LoWRRBOkqAYeXTNQnce6RSUi1uf1xZYVhIVKLBJz7Q/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-16 items-center justify-center gap-3 border-[3px] border-black bg-white px-8 text-lg font-black uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all w-full sm:w-auto rounded-xl"
          >
            Submit Project <ExternalLink className="w-5 h-5 stroke-[3]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
