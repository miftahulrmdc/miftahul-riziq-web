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

  // TODO: when the RMDC site is live, add its URL here and this menu item
  // starts pointing there instead of scrolling to the section below:
  //   { id: "homelab", label: "Homelab", href: "https://rmdc.your-domain.com" },
  { id: "homelab", label: "Homelab" },

  { id: "contact", label: "Contact" },
];
