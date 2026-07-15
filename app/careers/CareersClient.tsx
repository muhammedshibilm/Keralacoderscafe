"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  Search,
  Building2,
  Clock,
  Filter,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Bookmark,
  SlidersHorizontal,
  Compass
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";

interface Job {
  slug: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  location_type: string; // "onsite", "hybrid", "remote"
  job_type: string; // "fulltime", "internship", "parttime", "freelance"
  salary: string;
  tags: string[];
  posted_at: string;
}

interface CareersClientProps {
  initialJobs: Job[];
}

export default function CareersClient({ initialJobs }: CareersClientProps) {
  const router = useRouter();
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    // Avoid double trigger if action button or bookmark is clicked
    const target = e.target as HTMLElement;
    if (target.closest(".action-btn") || target.closest(".bookmark-btn")) {
      return;
    }
    setLoadingSlug(slug);
    router.push(`/careers/${slug}`);
  };

  // Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocType, setSelectedLocType] = useState("all");
  const [selectedJobType, setSelectedJobType] = useState("all");

  // Pagination State
  const [visibleCount, setVisibleCount] = useState(10);

  // Reset pagination when filter criteria change
  useEffect(() => {
    setVisibleCount(10);
  }, [searchQuery, selectedLocType, selectedJobType]);

  // Filter Logic
  const filteredJobs = initialJobs.filter((job) => {
    // Only show jobs from the current calendar month
    try {
      const postDate = new Date(job.posted_at);
      const now = new Date();
      if (postDate.getMonth() !== now.getMonth() || postDate.getFullYear() !== now.getFullYear()) {
        return false;
      }
    } catch {
      return false;
    }

    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocType =
      selectedLocType === "all" ||
      job.location_type.toLowerCase() === selectedLocType.toLowerCase();

    const matchesJobType =
      selectedJobType === "all" ||
      job.job_type.toLowerCase() === selectedJobType.toLowerCase();

    return matchesSearch && matchesLocType && matchesJobType;
  });

  const getLocTypePillStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case "remote": return "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]";
      case "hybrid": return "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]";
      default: return "bg-[#E6F9F6] text-[#00B9A5] border-[#B2F5EA]";
    }
  };

  const getLogoColor = (logo: string) => {
    const colors = [
      "bg-red-200",
      "bg-amber-200",
      "bg-emerald-200",
      "bg-blue-200",
      "bg-indigo-200",
      "bg-violet-200",
      "bg-pink-200"
    ];
    if (!logo) return colors[0];
    const code = logo.charCodeAt(0) + (logo.charCodeAt(1) || 0);
    return colors[code % colors.length];
  };

  const cleanLocation = (loc: string) => {
    if (!loc) return "";
    const parts = loc.split(/[;,]/).map(p => p.trim());
    if (parts.length > 2) {
      const filtered = parts.filter(p =>
        !p.toLowerCase().includes("district") &&
        !p.toLowerCase().includes("division") &&
        !p.toLowerCase().includes("konkan")
      );
      if (filtered.length > 0) {
        return filtered.slice(0, 3).join(", ");
      }
    }
    return loc;
  };

  const formatRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 30) return `${diffDays}d ago`;
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths}m ago`;
    } catch {
      return "Recently";
    }
  };

  const visibleJobs = filteredJobs.slice(0, visibleCount);

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-[#F8FAFC] text-black pt-32 pb-24 px-6 md:px-12 relative overflow-hidden isolate">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2000 1500"
            className="w-full h-full object-cover opacity-60"
          >
            <rect fill="#ffffff" width="2000" height="1500" />
            <defs>
              <rect stroke="#ffffff" strokeWidth="0.6" width="1" height="1" id="s" />
              <pattern id="a" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <use fill="#fcfcfc" href="#s" y="2" />
                <use fill="#fcfcfc" href="#s" x="1" y="2" />
                <use fill="#fafafa" href="#s" x="2" y="2" />
                <use fill="#fafafa" href="#s" />
                <use fill="#f7f7f7" href="#s" x="2" />
                <use fill="#f7f7f7" href="#s" x="1" y="1" />
              </pattern>
              <pattern id="b" width="7" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#f5f5f5">
                  <use href="#s" />
                  <use href="#s" y="5" />
                  <use href="#s" x="1" y="10" />
                  <use href="#s" x="2" y="1" />
                  <use href="#s" x="2" y="4" />
                  <use href="#s" x="3" y="8" />
                  <use href="#s" x="4" y="3" />
                  <use href="#s" x="4" y="7" />
                  <use href="#s" x="5" y="2" />
                  <use href="#s" x="5" y="6" />
                  <use href="#s" x="6" y="9" />
                </g>
              </pattern>
              <pattern id="h" width="5" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#f5f5f5">
                  <use href="#s" y="5" />
                  <use href="#s" y="8" />
                  <use href="#s" x="1" y="1" />
                  <use href="#s" x="1" y="9" />
                  <use href="#s" x="1" y="12" />
                  <use href="#s" x="2" />
                  <use href="#s" x="2" y="4" />
                  <use href="#s" x="3" y="2" />
                  <use href="#s" x="3" y="6" />
                  <use href="#s" x="3" y="11" />
                  <use href="#s" x="4" y="3" />
                  <use href="#s" x="4" y="7" />
                  <use href="#s" x="4" y="10" />
                </g>
              </pattern>
              <pattern id="c" width="17" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#f2f2f2">
                  <use href="#s" y="11" />
                  <use href="#s" x="2" y="9" />
                  <use href="#s" x="5" y="12" />
                  <use href="#s" x="9" y="4" />
                  <use href="#s" x="12" y="1" />
                  <use href="#s" x="16" y="6" />
                </g>
              </pattern>
              <pattern id="d" width="19" height="17" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#ffffff">
                  <use href="#s" y="9" />
                  <use href="#s" x="16" y="5" />
                  <use href="#s" x="14" y="2" />
                  <use href="#s" x="11" y="11" />
                  <use href="#s" x="6" y="14" />
                </g>
                <g fill="#efefef">
                  <use href="#s" x="3" y="13" />
                  <use href="#s" x="9" y="7" />
                  <use href="#s" x="13" y="10" />
                  <use href="#s" x="15" y="4" />
                  <use href="#s" x="18" y="1" />
                </g>
              </pattern>
              <pattern id="e" width="47" height="53" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#F60">
                  <use href="#s" x="2" y="5" />
                  <use href="#s" x="16" y="38" />
                  <use href="#s" x="46" y="42" />
                  <use href="#s" x="29" y="20" />
                </g>
              </pattern>
              <pattern id="f" width="59" height="71" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#F60">
                  <use href="#s" x="33" y="13" />
                  <use href="#s" x="27" y="54" />
                  <use href="#s" x="55" y="55" />
                </g>
              </pattern>
              <pattern id="g" width="139" height="97" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#F60">
                  <use href="#s" x="11" y="8" />
                  <use href="#s" x="51" y="13" />
                  <use href="#s" x="17" y="73" />
                  <use href="#s" x="99" y="57" />
                </g>
              </pattern>
            </defs>
            <rect fill="url(#a)" width="100%" height="100%" />
            <rect fill="url(#b)" width="100%" height="100%" />
            <rect fill="url(#h)" width="100%" height="100%" />
            <rect fill="url(#c)" width="100%" height="100%" />
            <rect fill="url(#d)" width="100%" height="100%" />
            <rect fill="url(#e)" width="100%" height="100%" />
            <rect fill="url(#f)" width="100%" height="100%" />
            <rect fill="url(#g)" width="100%" height="100%" />
          </svg>
        </div>

        <div className="mx-auto max-w-[1280px] relative z-10">

          {/* Illustrative Hero Header */}
          <div className="border border-gray-100 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm mb-12 grid md:grid-cols-[1.2fr_0.8fr] gap-8 relative items-center overflow-hidden">
            <GlyphMatrix className="absolute inset-0 z-0 opacity-40 pointer-events-none" color="#00B9A5" />

            {/* Top Right Label */}
            <div className="absolute top-8 right-8 hidden sm:block z-10">
              <span className="bg-[#1E293B] text-white text-[10px] font-black uppercase tracking-widest rounded-lg px-3 py-1">
                LATEST OPPORTUNITIES
              </span>
            </div>

            <div className="max-w-3xl relative z-10">
              <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" /> JOB PORTAL
              </span>
              <h1 className="text-[clamp(2.2rem,5vw,3.8rem)] font-black leading-[1.05] tracking-tight text-slate-900 uppercase">
                Find your next <br />
                <span className="text-[#00B9A5]">tech role.</span>
              </h1>
              <p className="mt-6 text-slate-500 font-semibold text-sm md:text-base leading-relaxed max-w-xl">
                Explore handpicked engineering, product, and design roles from forward-thinking companies. Empowering builders across Kerala's growing community.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 relative z-20">
                <a
                  href="https://forms.gle/REVtkCeb7DdRkqoDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline inline-flex items-center gap-2 bg-[#00B9A5] hover:bg-[#008F80] px-5 py-3 font-bold text-white text-xs md:text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm"
                >
                  Join Our Talent Pool 🚀
                </a>
                <a
                  href="mailto:keralacoderscafe@gmail.com?subject=Job%20Board%20Submission"
                  className="no-underline inline-flex items-center gap-2 bg-[#004D40] hover:bg-[#002C26] px-5 py-3 font-bold text-white text-xs md:text-sm uppercase tracking-wider rounded-xl transition-all shadow-sm"
                >
                  I'm Hiring 👥
                </a>
              </div>
            </div>

            {/* Illustrative graphic on the right */}
            <div className="relative flex justify-center items-center z-10">
              <img
                src="/careers-hero.png"
                alt="Careers Hero Illustration"
                className="w-full h-auto max-h-[220px] object-contain hidden md:block select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Search and Filters Controls */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto] mb-8">

            {/* Search Input */}
            <div className="border border-gray-100 bg-white p-3 rounded-2xl shadow-sm flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search job title, company, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full font-semibold text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
              />
            </div>

            {/* Location Type Filter */}
            <div className="border border-gray-100 bg-white p-3 rounded-2xl shadow-sm flex items-center gap-3">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="min-w-0 flex-grow">
                <div className="text-[9px] font-bold uppercase text-slate-400 leading-none mb-0.5">Location</div>
                <select
                  value={selectedLocType}
                  onChange={(e) => setSelectedLocType(e.target.value)}
                  className="w-full font-bold text-xs text-slate-700 outline-none bg-transparent cursor-pointer"
                >
                  <option value="all">All Locations</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote Only</option>
                </select>
              </div>
            </div>

            {/* Job Type Filter */}
            <div className="border border-gray-100 bg-white p-3 rounded-2xl shadow-sm flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="min-w-0 flex-grow">
                <div className="text-[9px] font-bold uppercase text-slate-400 leading-none mb-0.5">Type</div>
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-full font-bold text-xs text-slate-700 outline-none bg-transparent cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="fulltime">Full-time</option>
                  <option value="internship">Internship</option>
                  <option value="parttime">Part-time</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
            </div>

            {/* Filter Toggle Button */}
            <button className="bg-slate-900 text-white p-3.5 rounded-2xl flex items-center justify-center border border-slate-900 hover:bg-slate-800 transition-colors shadow-sm cursor-pointer">
              <SlidersHorizontal className="w-5 h-5" />
            </button>

          </div>

          {/* Jobs Listing Container */}
          {filteredJobs.length === 0 ? (
            <div className="border border-gray-100 bg-white p-16 rounded-[2rem] shadow-sm text-center">
              <p className="text-xl font-bold uppercase mb-2">No Openings Found</p>
              <p className="font-semibold text-slate-400 max-w-sm mx-auto text-sm">
                No jobs match "{searchQuery}" with the selected location and type filters. Try adjusting your settings.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
              <div className="flex flex-col gap-4 w-full">
                {visibleJobs.map((job) => {
                  const logoBgColor = getLogoColor(job.logo);
                  return (
                    <div
                      key={job.slug}
                      onClick={(e) => handleCardClick(job.slug, e)}
                      className={`group relative flex flex-col md:flex-row items-start md:items-center bg-white border border-gray-100 rounded-[2rem] shadow-sm p-4 md:p-5 gap-4 md:gap-6 w-full transition-all duration-300 hover:border-slate-200 hover:shadow-md cursor-pointer ${loadingSlug === job.slug ? "opacity-70 cursor-wait" : ""}`}
                    >

                      {/* 1. Category Pill (Leftmost on desktop) */}
                      <div className="hidden md:flex w-[110px] shrink-0 justify-center">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider border rounded-lg ${getLocTypePillStyles(job.location_type)} text-center whitespace-nowrap`}>
                          {job.location_type || "ONSITE"}
                        </span>
                      </div>

                      {/* 2. Icon (Circle with initials) */}
                      <div className="flex shrink-0 items-center justify-center relative">
                        <div className="w-12 h-12 border border-gray-100 rounded-full shadow-sm flex items-center justify-center bg-white overflow-hidden relative">
                          <div className={`absolute inset-0 opacity-20 ${logoBgColor}`} />
                          <span className="text-xs font-black uppercase text-slate-800 relative z-10">{job.logo ? job.logo.substring(0, 3) : "KCC"}</span>
                        </div>
                      </div>

                      {/* 3. Content (Name, Description, Tags) */}
                      <div className="flex flex-col flex-grow min-w-0 py-1 w-full max-w-full overflow-hidden">
                        <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-900 leading-snug">
                          {job.title.replace(new RegExp(`\\s+at\\s+${job.company}`, "i"), "")}
                        </h3>
                        <p className="text-slate-500 font-semibold text-xs md:text-sm leading-snug mt-0.5 flex flex-wrap items-center gap-1">
                          <span>{job.company}</span>
                          <span className="text-slate-300">•</span>
                          <span>{cleanLocation(job.location)}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[#00B9A5] font-bold">{formatRelativeTime(job.posted_at)}</span>
                        </p>

                        {/* Tags list */}
                        {job.tags && job.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {job.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 uppercase">
                                {tag}
                              </span>
                            ))}
                            {job.tags.length > 3 && (
                              <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-black text-slate-500 uppercase">
                                +{job.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* 4. Actions (Right side) */}
                      <div className="shrink-0 flex items-center gap-3 mt-2 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 border-dashed">
                        <span className={`md:hidden text-[9px] font-black uppercase tracking-wider border rounded-lg px-2.5 py-1 ${getLocTypePillStyles(job.location_type)}`}>
                          {job.location_type}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setLoadingSlug(job.slug);
                              router.push(`/careers/${job.slug}`);
                            }}
                            disabled={loadingSlug !== null}
                            className="action-btn no-underline inline-flex items-center gap-1 bg-[#00B9A5] hover:bg-[#008F80] text-white px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
                          >
                            {loadingSlug === job.slug ? (
                              <>
                                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                                Loading...
                              </>
                            ) : (
                              <>
                                Apply Now <ArrowRight className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                          <button
                            className="bookmark-btn flex items-center justify-center w-9 h-9 bg-white border border-gray-200 rounded-xl shadow-sm text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                            title="Save Job"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredJobs.length && (
                <div className="mt-8 flex justify-center w-full">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="w-full text-center border border-[#B2F5EA] bg-[#E6F9F6] py-3.5 font-bold uppercase text-xs md:text-sm tracking-wider text-[#00B9A5] hover:bg-[#D4F7F2] transition-colors rounded-xl cursor-pointer"
                  >
                    Load More Opportunities ({filteredJobs.length - visibleCount} Remaining)
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
