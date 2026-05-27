import type { Metadata } from "next";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Community Projects",
  description: "Explore all open-source projects and ideas from the KCC community.",
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 flex flex-col min-h-screen bg-[#1A1A1A]">
      <div className="flex-grow flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center">
        <span className="inline-block px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#00D9C0] mb-6 border border-[#00D9C0]/30 rounded-full bg-[#00D9C0]/10 shadow-[0_0_15px_rgba(0,217,192,0.2)]">
          Projects Directory
        </span>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-8">
          Coming Soon
        </h1>
        <p className="max-w-xl text-white/60 text-lg font-medium leading-relaxed mb-12">
          We are currently building the full directory of community projects. Check back later or submit your own project to be featured!
        </p>
        <a 
          href="https://forms.google.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#00D9C0] text-black text-sm font-bold hover:bg-[#00E5CB] hover:shadow-[0_0_20px_rgba(0,217,192,0.4)] transition-all"
        >
          Submit Your Project
        </a>
      </div>
      <Footer />
    </main>
  );
}
