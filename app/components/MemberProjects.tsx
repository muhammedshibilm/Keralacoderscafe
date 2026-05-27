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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 max-w-4xl mx-auto">
          {isLoading ? (
            // Skeleton Loaders
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="group bg-white border-[3px] border-black rounded-xl overflow-visible flex flex-col h-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                {/* Window Title Bar Skeleton */}
                <div className="w-full h-8 border-b-[3px] border-black bg-gray-200 flex items-center px-3 gap-1.5 rounded-t-lg">
                  <div className="w-2.5 h-2.5 rounded-full border-[2px] border-black bg-gray-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full border-[2px] border-black bg-gray-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full border-[2px] border-black bg-gray-300"></div>
                </div>

                {/* Bottom Half Skeleton */}
                <div className="p-3 md:p-4 flex flex-col flex-grow bg-[#FDFBF7] rounded-b-lg animate-pulse">
                  {/* Image Skeleton */}
                  <div className="relative w-full aspect-[4/3] border-[3px] border-black mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md bg-gray-300">
                    <div className="absolute -bottom-3 right-3 bg-gray-400 border-[2px] border-black px-6 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md z-10"></div>
                  </div>

                  {/* Title Skeleton */}
                  <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>

                  {/* Description Skeleton */}
                  <div className="space-y-2 mb-5 flex-grow">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>

                  {/* Bottom Row Skeleton */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t-[2px] border-black/10">
                    <div className="flex gap-2">
                      <div className="h-4 w-8 bg-gray-300 rounded"></div>
                      <div className="h-4 w-8 bg-gray-300 rounded"></div>
                    </div>
                    <div className="w-7 h-7 rounded-full border-[2px] border-black bg-gray-300"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            mockProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white border-[3px] border-black rounded-xl overflow-visible flex flex-col h-full hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                {/* Window Title Bar */}
                <div className={`w-full h-8 border-b-[3px] border-black ${project.windowColor} flex items-center px-3 gap-1.5 rounded-t-lg`}>
                  <div className="w-2.5 h-2.5 rounded-full border-[2px] border-black bg-[#FF595E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full border-[2px] border-black bg-[#FFD166]"></div>
                  <div className="w-2.5 h-2.5 rounded-full border-[2px] border-black bg-[#8AC926]"></div>
                </div>

                {/* Bottom Half (Content Area) */}
                <div className="p-3 md:p-4 flex flex-col flex-grow bg-[#FDFBF7] rounded-b-lg">

                  {/* Image Container with Floating Pill */}
                  <div className="relative w-full aspect-[4/3] border-[3px] border-black mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-md bg-white">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover rounded-sm"
                      sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                    />
                    {/* Overlapping Author Pill */}
                    <div className={`absolute -bottom-3 right-3 ${project.pillColor} border-[2px] border-black px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-md z-10 flex flex-col`}>
                      <span className="font-black text-black text-xs leading-none">{project.author}</span>
                      <span className="font-bold text-black/70 text-[8px] uppercase tracking-wider mt-0.5">Community Dev</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-black leading-tight tracking-tight mb-2 mt-2">
                    {project.name}
                  </h3>

                  <p className="text-black/70 text-xs font-bold leading-relaxed mb-5 flex-grow">
                    {project.description}
                  </p>

                  {/* Bottom Row: Stats & Action */}
                  <div className="flex items-center justify-between mt-auto pt-3 border-t-[2px] border-black/10">
                    <div className="flex items-center gap-2 text-black text-[10px] font-black">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-black" />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{project.stats.forks}</span>
                      </div>
                    </div>

                    <Link
                      href={project.link}
                      className="flex items-center justify-center w-7 h-7 rounded-full border-[2px] border-black bg-black text-white hover:bg-[#A18CE5] hover:text-black transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                    </Link>
                  </div>
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
            href="https://forms.gle/pcfN9CYgVan2mfrz6"
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
