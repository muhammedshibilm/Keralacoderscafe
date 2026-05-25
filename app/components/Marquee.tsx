"use client";

import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { communityQuotes } from "./data";

type MarqueeProps = {
  quotes?: string[];
};

const Marquee: React.FC<MarqueeProps> = ({ quotes = communityQuotes }) => {
  const skillsElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skillsElementRef.current) {
      const element = skillsElementRef.current;
      const scrollWidth = element.scrollWidth;
      const animationDuration = scrollWidth / 150; // Much faster speed

      element.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(-${scrollWidth / 2}px)` },
        ],
        {
          duration: animationDuration * 1000,
          easing: "linear",
          iterations: Infinity,
        }
      );
    }
  }, [quotes]);

  return (
    <div className="relative overflow-hidden bg-black border-y-4 border-black py-2 md:py-4 z-20 mt-[96px] sm:mt-[68px] mb-6 shadow-[0_8px_0_0_#000]">
      <div
        id="quotes"
        className="w-max whitespace-nowrap flex will-change-transform"
        ref={skillsElementRef}
      >
        {[1, 2].map((set) => (
          <div key={set} className="flex gap-4 md:gap-12 items-center">
            {quotes.map((quote, index) => (
              <span
                key={`${set}-${index}`}
                className="flex items-center gap-4 md:gap-12 text-3xl md:text-5xl font-black tracking-tighter text-kcc-green uppercase px-2 md:px-6"
              >
                {quote}
                <Star className="w-8 h-8 md:w-12 md:h-12 fill-kcc-green text-kcc-green" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;