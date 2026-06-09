"use client";

import React, { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { IconArrowLeft, IconArrowRight, IconQuote, IconStarFilled } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false
}: {
  testimonials: any[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="mx-auto max-w-sm px-4 py-8 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id || index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative"
          >
            <IconQuote className="absolute -top-8 -left-6 w-16 h-16 text-black/5 -z-10" />

            <h3 className="text-3xl font-black text-black">
              {testimonials[active].name}
            </h3>

            <div className="flex items-center gap-4 mt-2">
              <p className="text-sm font-bold text-black/50 uppercase tracking-wider">
                {testimonials[active].designation}
              </p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <IconStarFilled key={i} className="w-4 h-4 text-[#FFD166]" />
                ))}
              </div>
            </div>

            <motion.p className="mt-6 text-lg md:text-xl font-medium text-black/80 leading-relaxed relative z-10 h-[250px] md:h-[320px] overflow-y-auto pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {testimonials[active].quote.split(" ").map((word: string, index: number) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="group/button flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-black bg-[#FFE66D] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <IconArrowLeft className="h-6 w-6 text-black transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              className="group/button flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-black bg-[#00FF85] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <IconArrowRight className="h-6 w-6 text-black transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testimonialsRef = ref(database, '1');
    const unsubscribe = onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const testimonialsList = Object.entries(data).map(([id, value]: [string, any], index) => {
          const avatarColors = ["F4A261", "E76F51", "2A9D8F", "E9C46A", "FFB5A7", "A5FFD6"];
          const bgColor = avatarColors[index % avatarColors.length];
          const name = value.name || "Anonymous";

          return {
            id,
            name: name,
            designation: "Community Member",
            quote: value.testimonial || "No comment.",
            src: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=000&size=500&font-size=0.4&bold=true`,
            ...value,
          };
        });

        testimonialsList.sort((a, b) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });

        setTestimonials(testimonialsList);
      } else {
        setTestimonials([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 bg-[#FDF8F5] relative overflow-hidden" id="testimonials">
      <div className="container mx-auto px-6 relative z-10 pb-16">
        <div className="text-center mb-16">
          <div className="inline-block border-[3px] border-black bg-[#00FF85] px-4 py-1 text-xs font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 rounded-full -rotate-2">
            What They Say
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-tight text-black leading-[0.9]">
            Member
            <br />
            <span className="relative inline-block mt-4 mb-2">
              <span className="relative z-10 bg-[#FFD166] border-[4px] border-black px-6 py-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-md inline-block rotate-2">
                Feedbacks
              </span>
            </span>
          </h2>
        </div>
        {loading ? (
          <div className="flex justify-center py-12 min-h-[400px] items-center">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl max-w-2xl mx-auto flex items-center justify-center min-h-[200px]">
            <p className="text-xl font-bold">No testimonials yet.</p>
          </div>
        ) : (
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        )}
      </div>
    </section>
  );
}
