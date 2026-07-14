"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ANIMATION_DURATION = 500;
const CACHE_KEY = "kcc_announcement_seen";
const CACHE_DURATION = 15 * 24 * 60 * 60 * 1000; // 15 days

export default function AnnouncementPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const lastSeen = localStorage.getItem(CACHE_KEY);
    const loaderSeen = localStorage.getItem("kcc_loader_seen");
    const now = Date.now();

    const startPopup = () => {
      setShouldRender(true);
      const timer = setTimeout(() => setIsVisible(true), 15000); // 15 seconds delay
      return timer;
    };

    if (!lastSeen || now - parseInt(lastSeen) > CACHE_DURATION) {
      if (!loaderSeen) {
        const handleLoaderFinished = () => {
          startPopup();
          window.removeEventListener("kcc_loader_finished", handleLoaderFinished);
        };
        window.addEventListener("kcc_loader_finished", handleLoaderFinished);
        return () => window.removeEventListener("kcc_loader_finished", handleLoaderFinished);
      } else {
        const timer = startPopup();
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(CACHE_KEY, Date.now().toString());
    setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
  };

  const slides = [
    {
      superTitle: "New Open Source Project",
      title: <>TODDY SHOP<br/>FINDER</>,
      subtitle: "Is Started! 🧉",
      description: "Our latest community-driven project is officially live. Help us map Kerala's authentic toddy shops, share quality ratings, and preserve our culinary heritage.",
      buttons: (
        <>
          <Link
            href="/toddy-shop-finder-opensource-project"
            onClick={handleClose}
            className="flex-1 bg-[#124b6e] text-white py-2.5 sm:py-3 font-bold tracking-wide text-xs sm:text-sm hover:bg-[#0e3a53] transition-colors flex justify-center items-center"
          >
            VIEW PROGRESS
          </Link>
          <button
            onClick={handleClose}
            className="flex-1 border-2 border-[#124b6e] text-[#124b6e] py-2.5 sm:py-3 font-bold tracking-wide text-xs sm:text-sm hover:bg-[#124b6e]/5 transition-colors"
          >
            NO THANKS
          </button>
        </>
      )
    },
    {
      superTitle: "Get Featured",
      title: <>SUBMIT YOUR<br/>PROJECT</>,
      subtitle: "പ്രൊജക്റ്റ് ഫീച്ചർ ചെയ്യാം 🚀",
      description: "Built something amazing? Submit your open-source project via our Google Form to get featured on the Kerala Coders Cafe homepage!",
      buttons: (
        <>
          <Link
            href="https://forms.gle/your-google-form-link-here"
            target="_blank"
            onClick={handleClose}
            className="flex-1 bg-[#124b6e] text-white py-2.5 sm:py-3 font-bold tracking-wide text-xs sm:text-sm hover:bg-[#0e3a53] transition-colors flex justify-center items-center"
          >
            SUBMIT FORM
          </Link>
          <Link
            href="/projects"
            onClick={handleClose}
            className="flex-1 border-2 border-[#124b6e] text-[#124b6e] py-2.5 sm:py-3 font-bold tracking-wide text-xs sm:text-sm hover:bg-[#124b6e]/5 transition-colors flex justify-center items-center"
          >
            VIEW PROJECTS
          </Link>
        </>
      )
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-opacity duration-300 ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-lg bg-[#0e3a53] p-4 sm:p-6 shadow-2xl transition-all duration-500 transform overflow-hidden ${isVisible ? "scale-100 translate-y-0" : "scale-90 translate-y-12"}`}
      >
        {/* Abstract Circle Pattern Background (CSS only) */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full border-[10px] border-[#1b5373]"></div>
          <div className="absolute top-20 -right-20 w-64 h-64 rounded-full border-[20px] border-[#1b5373]"></div>
          <div className="absolute -bottom-20 left-10 w-56 h-56 rounded-full border-[15px] border-[#1b5373]"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/50 hover:text-white transition-colors z-10"
        >
          <X className="w-7 h-7 sm:w-8 sm:h-8 font-extralight" strokeWidth={1} />
        </button>

        {/* Slide Controls (Left/Right Arrows) */}
        <button onClick={prevSlide} className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20 p-2">
          <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
        <button onClick={nextSlide} className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-20 p-2">
          <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Inner White Box */}
        <div className="relative bg-white px-4 py-4 sm:px-8 sm:py-6 text-center flex flex-col items-center shadow-lg z-10 overflow-hidden mx-4 sm:mx-8">
          {/* Mock Logo */}
          <div className="flex gap-1 mb-2 sm:mb-3">
             <div className="border-[2px] sm:border-[3px] border-black px-1.5 py-0.5 sm:px-2 font-black text-[0.65rem] sm:text-sm tracking-widest leading-none">K</div>
             <div className="border-[2px] sm:border-[3px] border-black px-1.5 py-0.5 sm:px-2 font-black text-[0.65rem] sm:text-sm tracking-widest leading-none">C</div>
             <div className="border-[2px] sm:border-[3px] border-black px-1.5 py-0.5 sm:px-2 font-black text-[0.65rem] sm:text-sm tracking-widest leading-none">C</div>
          </div>
          
          <div className="relative w-full overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div key={i} className="w-full shrink-0 flex flex-col items-center">
                  <h3 className="font-bold text-[0.7rem] sm:text-[0.8rem] tracking-tight text-black mb-1">
                    {slide.superTitle}
                  </h3>
                  
                  <h2 className="text-[2rem] sm:text-[2.6rem] font-black uppercase tracking-tighter leading-[0.85] text-black mb-2 font-sans scale-y-110">
                    {slide.title}
                  </h2>
                  
                  <p className="font-bold text-[0.85rem] sm:text-[0.9rem] text-black mb-3">
                    {slide.subtitle}
                  </p>

                  <div className="w-full border-2 border-[#124b6e] p-2 sm:p-3 mb-3 text-left bg-gray-50/50">
                    <p className="text-[0.7rem] sm:text-xs font-medium text-gray-600 leading-tight sm:leading-relaxed text-center min-h-[40px] flex items-center justify-center">
                      {slide.description}
                    </p>
                  </div>
                  
                  <div className="flex w-full gap-2">
                    {slide.buttons}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slide Dots */}
          <div className="flex gap-2 mt-3">
            {slides.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${i === currentSlide ? "w-5 sm:w-6 bg-[#124b6e]" : "w-1.5 sm:w-2 bg-gray-300"}`} 
              />
            ))}
          </div>

          <p className="mt-2 text-[0.55rem] sm:text-[0.6rem] text-gray-400">
            Built by the community, for the community.
          </p>
        </div>
      </div>
    </div>
  );
}
