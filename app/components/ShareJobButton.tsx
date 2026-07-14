"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

export default function ShareJobButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Job Opportunity: ${title}`,
          url: url,
        });
        return;
      } catch (err) {
        // Fallback to copy if user cancels or it fails
      }
    }
    
    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 bg-white hover:bg-gray-50 text-slate-500 hover:text-slate-800 border border-gray-200 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
      title="Share this job"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-[#00B9A5]" />
          <span className="text-[#00B9A5]">Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}
