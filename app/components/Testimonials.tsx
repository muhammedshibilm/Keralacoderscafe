"use client";

import React, { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

interface TestimonialItem {
  id: string;
  name: string;
  designation: string;
  quote: string;
  src: string;
  company?: string;
}

const fallbackTestimonials: TestimonialItem[] = [
  {
    id: "fb-1",
    name: "Abhishek ub",
    designation: "Community Member",
    company: "KCC",
    quote: "Fast reply, always active.",
    src: "https://ui-avatars.com/api/?name=Abhishek+ub&background=F4A261&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-2",
    name: "Aljas",
    designation: "Community Member",
    company: "KCC",
    quote: "Beginner friendly.",
    src: "https://ui-avatars.com/api/?name=Aljas&background=E76F51&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-3",
    name: "Sameer Kongath",
    designation: "Community Member",
    company: "KCC",
    quote: "Always up to date with new tech stacks and updates.",
    src: "https://ui-avatars.com/api/?name=Sameer+Kongath&background=2A9D8F&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-4",
    name: "Jomon Thomas Lobo",
    designation: "Community Member",
    company: "KCC",
    quote: "The community-led projects are amazing to collaborate on.",
    src: "https://ui-avatars.com/api/?name=Jomon+Thomas+Lobo&background=E9C46A&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-5",
    name: "Anto Josu",
    designation: "Community Member",
    company: "KCC",
    quote: "The online meet is my favourite, got a chance to listen to advice from experienced people.",
    src: "https://ui-avatars.com/api/?name=Anto+Josu&background=FFB5A7&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-6",
    name: "Jaykrishna T J",
    designation: "Community Member",
    company: "KCC",
    quote: "Helping mentality of all the members in the group is top-notch.",
    src: "https://ui-avatars.com/api/?name=Jaykrishna+T+J&background=A5FFD6&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-7",
    name: "Hashmil Muhammed",
    designation: "Community Member",
    company: "KCC",
    quote: "The job opportunities provided here are exactly what I liked the most. I look forward to more such opportunities.",
    src: "https://ui-avatars.com/api/?name=Hashmil+Muhammed&background=F8AD9D&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-8",
    name: "Aksa Susan Abraham",
    designation: "Community Member",
    company: "KCC",
    quote: "I get exposed to tech stacks used by great developers here. Though I'm a newbie, I at least get to be familiar with new stacks from those dev conversations.",
    src: "https://ui-avatars.com/api/?name=Aksa+Susan+Abraham&background=A2D2FF&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-9",
    name: "Vijay",
    designation: "Community Member",
    company: "KCC",
    quote: "Lots of new informative and learning stuff is shared, and there are so many active and supportive members.",
    src: "https://ui-avatars.com/api/?name=Vijay&background=BDE0FE&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-10",
    name: "Rasheeque Ahammed Rahim",
    designation: "Community Member",
    company: "KCC",
    quote: "Doubt clearing and getting to learn more interesting topics.",
    src: "https://ui-avatars.com/api/?name=Rasheeque+Ahammed+Rahim&background=C8B6FF&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-11",
    name: "Muhammed Roshan",
    designation: "Community Member",
    company: "KCC",
    quote: "Surrounded by creative mindset people.",
    src: "https://ui-avatars.com/api/?name=Muhammed+Roshan&background=FFC6FF&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-12",
    name: "Affan",
    designation: "Community Member",
    company: "KCC",
    quote: "Fun, friendly, and highly supportive.",
    src: "https://ui-avatars.com/api/?name=Affan&background=E8F0FE&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-13",
    name: "Rayhaan",
    designation: "Community Member",
    company: "KCC",
    quote: "I'm learning new stuff when people clear doubts of other people in the chat.",
    src: "https://ui-avatars.com/api/?name=Rayhaan&background=CAFFBF&color=000&size=150&font-size=0.4&bold=true"
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!database) {
      setLoading(false);
      return;
    }
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
            designation: value.designation || "Community Member",
            company: value.company || "Brand Partner",
            quote: value.testimonial || "No comment.",
            src: value.src || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=000&size=500&font-size=0.4&bold=true`,
          };
        });

        testimonialsList.sort((a, b) => a.name.localeCompare(b.name));
        setTestimonials(testimonialsList);
      } else {
        setTestimonials([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase fetch error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  
  // Triplicate array to ensure a seamless infinite scroll loop regardless of list size
  const scrollingTestimonials = [...displayTestimonials, ...displayTestimonials, ...displayTestimonials];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap");

        .name,
        h1 {
          font-family: "Playfair Display", serif;
        }

        .testimonial-section svg {
          fill: #ea5858;
        }

        @keyframes scroll-up-anim {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.3333%);
          }
        }

        .vertical-scroller {
          animation: scroll-up-anim 25s linear infinite;
        }

        .vertical-scroller:hover {
          animation-play-state: paused;
        }

        @keyframes wave-move-anim {
          0% {
            transform: translateX(-3%) scale(1.06);
          }
          50% {
            transform: translateX(3%) scale(1.06);
          }
          100% {
            transform: translateX(-3%) scale(1.06);
          }
        }

        .bg-wave-animated {
          animation: wave-move-anim 22s ease-in-out infinite;
        }
      `}} />
      <section className="testimonial-section overflow-hidden relative min-h-screen grid grid-cols-1 lg:grid-cols-12 place-content-center lg:place-items-center lg:gap-16 max-w-7xl mx-auto px-6 py-10" id="testimonials">
        {/* Background SVG Wave Pattern with smooth horizontal sliding animation */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <div className="w-full h-full bg-wave-animated">
            <svg id="visual" viewBox="0 0 900 600" preserveAspectRatio="none" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" version="1.1">
              <rect x="0" y="0" width="900" height="600" fill="#ffffff" />
              <path d="M0 171L18.8 179.7C37.7 188.3 75.3 205.7 112.8 207.8C150.3 210 187.7 197 225.2 201.7C262.7 206.3 300.3 228.7 337.8 236.8C375.3 245 412.7 239 450.2 230.5C487.7 222 525.3 211 562.8 206.2C600.3 201.3 637.7 202.7 675.2 213.5C712.7 224.3 750.3 244.7 787.8 242.3C825.3 240 862.7 215 881.3 202.5L900 190L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#69faab" />
              <path d="M0 304L18.8 295C37.7 286 75.3 268 112.8 276C150.3 284 187.7 318 225.2 324C262.7 330 300.3 308 337.8 299.2C375.3 290.3 412.7 294.7 450.2 306.2C487.7 317.7 525.3 336.3 562.8 339C600.3 341.7 637.7 328.3 675.2 321C712.7 313.7 750.3 312.3 787.8 311.8C825.3 311.3 862.7 311.7 881.3 311.8L900 312L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#97fcc0" />
              <path d="M0 427L18.8 424.7C37.7 422.3 75.3 417.7 112.8 410.8C150.3 404 187.7 395 225.2 381.5C262.7 368 300.3 350 337.8 351.8C375.3 353.7 412.7 375.3 450.2 384.7C487.7 394 525.3 391 562.8 384.2C600.3 377.3 637.7 366.7 675.2 364.8C712.7 363 750.3 370 787.8 369C825.3 368 862.7 359 881.3 354.5L900 350L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#bdfed5" />
              <path d="M0 472L18.8 463.3C37.7 454.7 75.3 437.3 112.8 432.7C150.3 428 187.7 436 225.2 437.7C262.7 439.3 300.3 434.7 337.8 433.3C375.3 432 412.7 434 450.2 437.8C487.7 441.7 525.3 447.3 562.8 456C600.3 464.7 637.7 476.3 675.2 477.7C712.7 479 750.3 470 787.8 461.5C825.3 453 862.7 445 881.3 441L900 437L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#dfffea" />
              <path d="M0 496L18.8 498.3C37.7 500.7 75.3 505.3 112.8 503.2C150.3 501 187.7 492 225.2 500.8C262.7 509.7 300.3 536.3 337.8 538.2C375.3 540 412.7 517 450.2 502C487.7 487 525.3 480 562.8 487.5C600.3 495 637.7 517 675.2 521C712.7 525 750.3 511 787.8 502.2C825.3 493.3 862.7 489.7 881.3 487.8L900 486L900 601L881.3 601C862.7 601 825.3 601 787.8 601C750.3 601 712.7 601 675.2 601C637.7 601 600.3 601 562.8 601C525.3 601 487.7 601 450.2 601C412.7 601 375.3 601 337.8 601C300.3 601 262.7 601 225.2 601C187.7 601 150.3 601 112.8 601C75.3 601 37.7 601 18.8 601L0 601Z" fill="#ffffff" />
            </svg>
          </div>
        </div>
        
        <div className="relative z-10 mb-10 lg:mb-0 col-span-6">
          <div className="inline-block border-[3px] border-black bg-[#69faab] px-6 py-2 text-xs font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 -rotate-2">
            What they say
          </div>
          <h1 className="relative z-10 sm:text-6xl text-4xl 2xl:text-7xl font-black sm:leading-none text-black uppercase tracking-tight leading-[0.95]">
            Community
            <br />
            Member
            <br />
            <span className="relative inline-block mt-4">
              <span className="relative z-10 bg-[#FFE66D] border-[4px] border-black px-6 py-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block rotate-2">
                Feedbacks
              </span>
            </span>
          </h1>
        </div>
        
        <div className="relative z-10 col-span-6 w-full max-h-[620px] overflow-hidden rounded-none border-[4px] border-black bg-[#FAFDFD] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-4">
          {loading ? (
            <div className="flex justify-center py-12 min-h-[400px] items-center">
              <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="relative h-[580px] overflow-hidden py-2">
              {/* Fade masks for top and bottom */}
              <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#FAFDFD] to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#FAFDFD] to-transparent z-20 pointer-events-none" />

              <div className="vertical-scroller flex flex-col gap-6">
                {scrollingTestimonials.map((item, idx) => (
                  <div 
                    key={`${item.id}-${idx}`}
                    className="relative z-10 bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col lg:items-center justify-between lg:flex-row gap-10 p-7 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
                  >
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 475.082 475.081" width="25px" height="25px">
                        <g>
                          <g>
                            <path d="M 164.45 219.27 h -63.954 c -7.614 0 -14.087 -2.664 -19.417 -7.994 c -5.327 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.416 -51.678 c 14.276 -14.272 31.503 -21.411 51.678 -21.411 h 18.271 c 4.948 0 9.229 -1.809 12.847 -5.424 c 3.616 -3.617 5.424 -7.898 5.424 -12.847 V 54.819 c 0 -4.948 -1.809 -9.233 -5.424 -12.85 c -3.617 -3.612 -7.898 -5.424 -12.847 -5.424 h -18.271 c -19.797 0 -38.684 3.858 -56.673 11.563 c -17.987 7.71 -33.545 18.132 -46.68 31.267 c -13.134 13.129 -23.553 28.688 -31.262 46.677 C 3.855 144.039 0 162.931 0 182.726 v 200.991 c 0 15.235 5.327 28.171 15.986 38.834 c 10.66 10.657 23.606 15.985 38.832 15.985 h 109.639 c 15.225 0 28.167 -5.328 38.828 -15.985 c 10.657 -10.663 15.987 -23.599 15.987 -38.834 V 274.088 c 0 -15.232 -5.33 -28.168 -15.994 -38.832 C 192.622 224.6 179.675 219.27 164.45 219.27 Z" />
                            <path d="M 459.103 235.256 c -10.656 -10.656 -23.599 -15.986 -38.828 -15.986 h -63.953 c -7.61 0 -14.089 -2.664 -19.41 7.994 c -5.332 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.409 -51.678 c 14.271 -14.272 31.497 -21.411 51.682 -21.411 h 18.267 c 4.949 0 9.233 -1.809 12.848 -5.424 c 3.613 -3.617 5.428 -7.898 5.428 -12.847 V 54.819 c 0 -4.948 -1.814 -9.233 -5.428 -12.85 c -3.614 -3.612 -7.898 -5.424 -12.848 -5.424 h -18.267 c -19.808 0 -38.691 3.858 -56.685 11.563 c -17.984 7.71 -33.537 18.132 -46.672 31.267 c -13.135 13.129 -23.559 28.688 -31.265 46.677 c -7.707 17.987 -11.567 36.879 -11.567 56.674 v 200.991 c 0 15.235 5.332 28.171 15.988 38.834 c 10.657 10.657 23.6 15.985 38.828 15.985 h 109.633 c 15.229 0 28.171 -5.328 38.827 -15.985 c 10.664 -10.663 15.985 -23.599 15.985 -38.834 V 274.088 C 475.082 258.855 469.76 245.92 459.103 235.256 Z" />
                          </g>
                        </g>
                      </svg>
                      <p className="my-3 2xl:text-lg text-gray-900 font-bold">{item.quote}</p>
                      <p className="text-gray-500 font-medium">
                        <span className="name text-gray-900 capitalize font-extrabold">{item.name}</span>
                        {item.designation || item.company ? ` — ${[item.company, item.designation].filter(Boolean).join(", ")}` : ""}
                      </p>
                    </div>
                    <div className="relative shrink-0">
                      <img 
                        src={item.src} 
                        alt={item.name} 
                        className="rounded-full w-24 h-24 object-cover 2xl:w-28 2xl:h-28 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
