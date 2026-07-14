"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

export default function FloatingApplyButton({ link }: { link: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past top banner (200px)
      const isScrolledPastTop = window.scrollY > 200;
      // Hide when near the bottom footer/banner so it doesn't overlap
      const isNearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500;
      
      if (isScrolledPastTop && !isNearBottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 w-full bg-white border-t border-gray-200 p-4 pb-safe transition-all duration-300 md:hidden shadow-[0_-4px_15px_rgba(0,0,0,0.05)] ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-full items-center justify-center gap-2 bg-[#064E3B] hover:bg-[#022C22] text-white px-6 rounded-[1rem] no-underline transition-all shadow-sm"
      >
        <span className="font-black uppercase tracking-wider text-sm">
          Apply Now
        </span>
        <ExternalLink className="h-4 w-4 text-white" />
      </a>
    </div>
  );
}
