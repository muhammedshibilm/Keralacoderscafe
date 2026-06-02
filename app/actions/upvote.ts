"use server";

import { revalidatePath } from "next/cache";
import { redis } from "@/lib/redis";

const REDIS_KEY = "project:votes";

/**
 * Fetch all project votes
 * Returns a dictionary mapping projectId to its vote count
 */
export async function getProjectVotes(): Promise<Record<number, number>> {
  try {
    const votes = await redis.hgetall<Record<string, number>>(REDIS_KEY);
    
    if (!votes) return {};

    // Convert string keys to numbers
    const formattedVotes: Record<number, number> = {};
    for (const [key, value] of Object.entries(votes)) {
      formattedVotes[Number(key)] = Number(value);
    }
    
    return formattedVotes;
  } catch (error) {
    console.error("Error fetching project votes from Redis:", error);
    return {};
  }
}

/**
 * Increment a project's vote count by 1
 */
export async function upvoteProject(projectId: number) {
  try {
    const newVotes = await redis.hincrby(REDIS_KEY, projectId.toString(), 1);
    
    // Revalidate the paths where the projects are displayed
    revalidatePath("/projects");
    revalidatePath("/");
    
    return { success: true, votes: newVotes };
  } catch (error) {
    console.error(`Error upvoting project ${projectId}:`, error);
    return { success: false, error: "Failed to upvote project" };
  }
}
