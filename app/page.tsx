import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Mission from "./components/Mission";
import Contributors from "./components/Contributors";
import Projects from "./components/Projects";
import Guidelines from "./components/Guidelines";
import Founder from "./components/Founder";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative z-10">
      <Marquee />
      <Hero />
      <Mission />
      <Contributors />
      <Projects />
      <Guidelines />
      <Founder />
      <Footer />
    </main>
  );
}


