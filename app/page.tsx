import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsSection from "@/components/ProjectsSection";
import FeaturedProject from "@/components/FeaturedProject";
import SkillsSection from "@/components/SkillsSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <ScrollProgress />
      {/* `relative` with no z-index keeps this above the fixed ambient
          layer without trapping the modal in a stacking context. */}
      <main className="relative min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <ProjectsSection />
        <FeaturedProject />
        <SkillsSection />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
