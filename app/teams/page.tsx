import Teams from "../components/Teams";
import Footer from "../components/Footer";
import { getTeamVotes } from "@/app/actions/upvote";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teams",
  description: "Meet the team behind Kerala Coders Cafe.",
};

export default async function TeamsPage() {
  const initialVotes = await getTeamVotes("akhil");

  return (
    <main className="relative z-10">
      <div className="pt-20">
        <Teams initialVotes={initialVotes} />
      </div>
      <Footer />
    </main>
  );
}
