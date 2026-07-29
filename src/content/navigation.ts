/**
 * Navigation entries.
 *
 * By default each item scrolls to the matching <section id="..."> on this page,
 * and `id` drives both the anchor link and the scroll-spy highlight.
 *
 * To point an item at a different website instead, add `href`. The navbar then
 * renders it as an external link (new tab) and drops it from the scroll-spy —
 * see the Homelab entry below for when RMDC gets its own site.
 */
export interface NavLink {
  /** Must match the section id on this page when `href` is not set. */
  id: string;
  label: string;
  /** External URL. Set this to send the item off-site. */
  href?: string;
}

export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },

  // When the RMDC site is live at rmdc.my.id, uncomment the line below and
  // delete the one after it — the item then links out instead of scrolling to
  // the Homelab section. Left off until that site exists: a menu entry
  // pointing at nothing is worse than one that scrolls.
  //   { id: "homelab", label: "Homelab", href: "https://rmdc.my.id" },
  { id: "homelab", label: "Homelab" },

  { id: "contact", label: "Contact" },
];
