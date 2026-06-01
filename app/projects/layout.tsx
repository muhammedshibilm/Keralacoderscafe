import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Projects | Kerala Coders Cafe",
  description: "Explore all open-source projects, tools, web apps, and ideas from the KCC community.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
