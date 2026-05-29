"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const accentClasses = [
  "bg-white",
  "bg-kcc-accent-yellow-soft/55",
  "bg-kcc-accent-green-soft/60",
  "bg-white",
  "bg-kcc-accent-green-soft/45",
  "bg-kcc-accent-yellow-soft/45",
];

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const REPOS_TO_FETCH = [
          "/api/github?endpoint=repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=50",
          "/api/github?endpoint=repos/KERALACODERSCAFE/Kerala-toddy-finder/contributors?per_page=50",
        ];

        const results = await Promise.allSettled(
          REPOS_TO_FETCH.map((url) =>
            fetch(url).then((r) => (r.ok ? r.json() : Promise.resolve([])))
          )
        );

        const merged = new Map<number, Contributor>();
        for (const result of results) {
          if (result.status !== "fulfilled") continue;
          const list: Contributor[] = Array.isArray(result.value)
            ? result.value
            : [];
          for (const c of list) {
            if (merged.has(c.id)) {
              merged.get(c.id)!.contributions += c.contributions;
            } else {
              merged.set(c.id, { ...c });
            }
          }
        }

        const sorted = Array.from(merged.values()).sort(
          (a, b) => b.contributions - a.contributions
        );
        setContributors(sorted);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  return (
    <main className="relative z-10 pt-32 bg-wavy-lines">
      <section className="px-6 py-12 md:px-12 min-h-screen">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between mb-16">
            <div className="max-w-[750px]">
              <span className="inline-block border-2 border-black bg-kcc-green px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
                All Contributors
              </span>
              <h1 className="mt-5 text-[clamp(2.8rem,6vw,5rem)] font-black leading-[0.92] tracking-[-0.05em] text-black uppercase">
                The Community
                <span className="ml-3 bg-kcc-gold border-3 border-black px-3 py-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] inline-block rotate-1">
                  Wall of Fame
                </span>
              </h1>
              <p className="mt-10 max-w-[620px] text-xl font-bold leading-relaxed text-black/80 border-l-8 border-black pl-8">
                Everyone who has contributed to Kerala Coders Cafe and its affiliated projects, including the Kerala Toddy Finder.
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 self-start">
              <div className="inline-flex items-center gap-3 border-3 border-black bg-white px-5 py-2 text-xs font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="h-3 w-3 border-2 border-black bg-emerald-500" />
                LIVE FROM GITHUB
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="border-2 border-black bg-kcc-accent-yellow-soft/60 px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Keralacoderscafe
                </span>
                <span className="border-2 border-black bg-kcc-gold/60 px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Kerala-toddy-finder
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Layout: Brutalist Table (hidden on md and up) */}
          <div className="md:hidden w-full overflow-x-auto pb-4">
            <table className="w-full border-4 border-black text-left border-collapse bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <thead>
                <tr className="bg-kcc-gold border-b-4 border-black text-black">
                  <th className="p-3 sm:p-4 font-black uppercase text-xs sm:text-sm border-r-4 border-black">Contributor</th>
                  <th className="p-3 sm:p-4 font-black uppercase text-xs sm:text-sm border-r-4 border-black text-center w-20">Commits</th>
                  <th className="p-3 sm:p-4 font-black uppercase text-xs sm:text-sm text-center w-20">Impact</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="border-b-4 border-black last:border-0 animate-pulse">
                        <td className="p-3 sm:p-4 border-r-4 border-black">
                          <div className="flex gap-3 items-center">
                            <div className="h-8 w-8 bg-black/10 rounded-full"></div>
                            <div className="h-4 w-1/2 bg-black/10"></div>
                          </div>
                        </td>
                        <td className="p-3 sm:p-4 border-r-4 border-black"><div className="h-4 w-full bg-black/10"></div></td>
                        <td className="p-3 sm:p-4"><div className="h-4 w-full bg-black/10"></div></td>
                      </tr>
                    ))
                  : contributors.map((contributor, index) => (
                      <tr key={contributor.id} className="border-b-4 border-black last:border-0 hover:bg-black/5 transition-colors">
                        <td className="p-3 sm:p-4 border-r-4 border-black">
                          <Link href={contributor.html_url} target="_blank" rel="noopener" className="flex items-center gap-3">
                            <span className="font-black text-black/50 text-xs w-4">{index + 1}</span>
                            <div className="relative h-8 w-8 sm:h-10 sm:w-10 shrink-0 overflow-hidden border-2 border-black">
                              <Image src={contributor.avatar_url} alt={contributor.login} fill className="object-cover" sizes="40px" />
                            </div>
                            <span className="font-black text-black text-xs sm:text-sm truncate max-w-[120px] hover:underline">
                              {contributor.login}
                            </span>
                          </Link>
                        </td>
                        <td className="p-3 sm:p-4 font-bold text-center border-r-4 border-black text-xs sm:text-sm">
                          {contributor.contributions}
                        </td>
                        <td className="p-3 sm:p-4 font-bold text-center text-xs sm:text-sm text-kcc-accent">
                          {contributor.contributions * 15}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Desktop Layout: Grid (hidden on mobile) */}
          <div className="hidden md:grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 12 }).map((_, index) => (
                  <div
                    key={index}
                    className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="h-16 w-16 animate-pulse border-2 border-black bg-black/10" />
                    <div className="mt-6 h-8 w-2/3 animate-pulse border-2 border-black bg-black/5" />
                    <div className="mt-3 h-5 w-1/2 animate-pulse border-2 border-black bg-black/5" />
                  </div>
                ))
              : contributors.map((contributor, index) => (
                  <Link
                    key={contributor.id}
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener"
                    className={`group border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${
                      accentClasses[index % accentClasses.length]
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Image
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-110"
                          sizes="64px"
                        />
                      </div>

                      <div className="shrink-0 border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        #{String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="mt-5 min-w-0">
                      <h3 className="text-[1.2rem] sm:text-[1.4rem] font-black uppercase tracking-[-0.04em] text-black truncate">
                        {contributor.login}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 border-2 border-black bg-white px-2 py-1 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
                          {contributor.contributions} <span className="opacity-60">COMMITS</span>
                        </span>
                        <span className="inline-flex items-center gap-1 border-2 border-black bg-kcc-green px-2 py-1 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
                          {contributor.contributions * 15} <span className="opacity-60">IMPACT</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 border-b-2 border-black text-xs font-black uppercase text-black">
                      GITHUB PROFILE
                      <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                    </div>
                  </Link>
                ))}
          </div>

          {!loading && contributors.length === 0 ? (
            <div className="mt-12 border-4 border-dashed border-black bg-white p-12 text-center text-lg font-black uppercase">
              CONTRIBUTOR DATA UNAVAILABLE
            </div>
          ) : null}
        </div>
      </section>
      <Footer />
    </main>
  );
}
