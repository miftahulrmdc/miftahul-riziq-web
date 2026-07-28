import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Homelab } from "@/components/sections/homelab";
import { TechStack } from "@/components/sections/tech-stack";

/**
 * Single-page portfolio.
 *
 * Section order is deliberate: credibility (experience) before the homelab
 * showpiece, so RMDC reads as evidence of an established engineer rather than
 * as a hobby project standing in for professional work.
 *
 * Projects and Skills are intentionally absent — that material is moving to the
 * separate RMDC site. Their components still live under components/sections/,
 * so re-adding a line here brings either one back.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Homelab />
      <TechStack />
      <Certifications />
      <Contact />
    </>
  );
}
