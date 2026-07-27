import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Homelab } from "@/components/sections/homelab";
import { TechStack } from "@/components/sections/tech-stack";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

/**
 * Single-page portfolio.
 *
 * Section order is deliberate: credibility (experience, skills) before the
 * homelab showpiece, so RMDC reads as evidence of an established engineer
 * rather than as a hobby project standing in for professional work.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Homelab />
      <TechStack />
      <Certifications />
      <Contact />
    </>
  );
}
