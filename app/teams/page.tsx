import Teams from "../components/Teams";
import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teams",
  description: "Meet the team behind Kerala Coders Cafe.",
};

export default function TeamsPage() {
  return (
    <main className="relative z-10">
      <div className="pt-20">
        <Teams />
      </div>
      <Footer />
    </main>
  );
}
