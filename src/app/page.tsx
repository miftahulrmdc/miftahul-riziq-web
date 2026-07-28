import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Homelab } from "@/components/sections/homelab";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { TechStack } from "@/components/sections/tech-stack";

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
