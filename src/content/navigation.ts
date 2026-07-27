/**
 * Navigation entries. `id` must match the corresponding <section id="...">,
 * since both the anchor links and the scroll-spy highlight rely on it.
 */
export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "homelab", label: "Homelab" },
  { id: "contact", label: "Contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
