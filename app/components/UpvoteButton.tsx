"use client";

import { useState, useEffect } from "react";
import { ArrowBigUpDash } from "lucide-react";
import { upvoteProject } from "@/app/actions/upvote";
import { cn } from "@/lib/utils";

interface UpvoteButtonProps {
  projectId: number;
  initialVotes: number;
}

export default function UpvoteButton({ projectId, initialVotes }: UpvoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  // Sync with prop in case it updates from parent
  useEffect(() => {
    setVotes(initialVotes);
  }, [initialVotes]);

  // Check local storage on mount
  useEffect(() => {
    const votedProjects = JSON.parse(localStorage.getItem("votedProjects") || "[]");
    if (votedProjects.includes(projectId)) {
      setHasVoted(true);
    }
  }, [projectId]);

  const handleUpvote = async () => {
    if (hasVoted || isVoting) return;

    // Optimistic update
    setVotes((prev) => prev + 1);
    setHasVoted(true);
    setIsVoting(true);

    try {
      const result = await upvoteProject(projectId);
      if (result.success && result.votes) {
        setVotes(result.votes);
        
        // Save to local storage
        const votedProjects = JSON.parse(localStorage.getItem("votedProjects") || "[]");
        if (!votedProjects.includes(projectId)) {
          votedProjects.push(projectId);
          localStorage.setItem("votedProjects", JSON.stringify(votedProjects));
        }
      } else {
        // Revert on failure
        setVotes((prev) => prev - 1);
        setHasVoted(false);
      }
    } catch (error) {
      console.error("Failed to upvote:", error);
      // Revert on error
      setVotes((prev) => prev - 1);
      setHasVoted(false);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={hasVoted || isVoting}
      className={cn(
        "flex items-center justify-center gap-1.5 h-10 px-3 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all font-black text-black",
        hasVoted 
          ? "bg-[#4CAF50] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]" 
          : "hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      )}
      title={hasVoted ? "You already voted!" : "Upvote this project"}
    >
      <ArrowBigUpDash className={cn("w-5 h-5", hasVoted ? "fill-white text-white" : "fill-transparent text-black")} strokeWidth={hasVoted ? 2 : 2.5} />
      <span className="text-sm">{votes}</span>
    </button>
  );
}
