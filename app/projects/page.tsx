import type { Metadata } from "next";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Community Projects",
  description: "Explore all open-source projects and ideas from the KCC community.",
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 flex flex-col min-h-screen bg-white">
      <div className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center max-w-[1280px] mx-auto w-full">
        <span className="inline-block border-2 border-black bg-kcc-green px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
          Projects Directory
        </span>
        <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black uppercase tracking-[-0.05em] text-black mb-8 leading-[0.9]">
          Coming
          <span className="ml-4 inline-block bg-kcc-gold border-4 border-black px-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-2">
            Soon
          </span>
        </h1>
        <p className="max-w-[620px] text-xl font-bold leading-relaxed text-black/80 border-l-8 border-black pl-8 mb-12 text-left bg-black/5 p-4">
          We are currently building the full directory of community projects. Check back later or submit your own project to be featured!
        </p>
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSeeHzA9LoWRRBOkqAYeXTNQnce6RSUi1uf1xZYVhIVKLBJz7Q/viewform" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-16 items-center justify-center gap-3 border-4 border-black bg-kcc-accent px-10 text-lg font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Submit Your Project
        </a>
      </div>
      <Footer />
    </main>
  );
}
