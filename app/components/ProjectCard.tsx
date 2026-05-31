import Link from "next/link";
import { ExternalLink, Github, Mail } from "lucide-react";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group relative flex flex-col h-full bg-[#F2E8D9] border-[4px] border-black rounded-3xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)]">
      {/* Hanging Tag */}
      <div className={`absolute top-0 right-6 z-20 border-l-[4px] border-r-[4px] border-b-[4px] border-black rounded-b-xl px-3 pt-8 pb-3 min-w-[80px] ${project.pillColor} flex items-end justify-center`}>
        <span className="font-black text-black text-xs whitespace-nowrap tracking-wide">
          @{project.author.replace(' ', '').toLowerCase()}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow relative z-10">
        <h3 className="text-2xl font-black tracking-tight text-black leading-tight mb-4 pr-20 text-left">
          {project.name}
        </h3>

        {/* Icon Section */}
        <div className={`relative w-full h-40 border-[4px] border-black rounded-xl overflow-hidden bg-white mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-all duration-500`}>
          <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent bg-[length:10px_10px]`} />
          <div className={`absolute w-24 h-24 rounded-full ${project.pillColor} blur-xl opacity-80 group-hover:scale-150 transition-transform duration-700`} />
          {project.icon && (
            <project.icon className="w-20 h-20 text-black relative z-10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)]" strokeWidth={2} />
          )}
        </div>

        <div className="flex items-start gap-3 flex-grow text-left">
          <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-white border-[3px] border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mt-0.5">
             <span className="text-black font-bold text-xl">😎</span>
          </div>
          <p className="text-black font-bold text-sm leading-relaxed text-left">
            {project.description}
          </p>
        </div>
      </div>

      {/* Bottom Link Row */}
      <div className="flex items-center justify-end px-6 pb-6 mt-auto z-10">
        <div className="flex items-center gap-2">
          {project.email && (
            <Link
              href={`mailto:${project.email}`}
              className="flex items-center justify-center w-10 h-10 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black"
            >
              <Mail className="w-5 h-5" />
            </Link>
          )}
          {project.github && (
            <Link
              href={project.github}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black"
            >
              <Github className="w-5 h-5" />
            </Link>
          )}
          <Link
            href={project.link}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 bg-[#FFD166] border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black"
          >
            <ExternalLink className="w-5 h-5 stroke-[3]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
