/**
 * ============================================================================
 *  PROFILE — identity, contact details and headline stats.
 * ============================================================================
 *
 *  ⚠️  EDIT ME. Every value tagged `TODO:` below is a placeholder that could
 *  not be recovered from the source CV. Nothing else in the codebase hardcodes
 *  these strings, so changing them here updates the entire site.
 */

export const profile = {
  name: "Miftahul Riziq",
  initials: "MR",
  role: "Infrastructure & Cloud Engineer",

  /** Rotated by the hero typing animation. */
  roles: [
    "Linux Engineer",
    "Cloud Engineer",
    "Infrastructure Engineer",
    "DevOps Enthusiast",
    "AWS Practitioner",
  ],

  location: "Bekasi Utara, Indonesia",

  /**
   * Green pill at the very top of the hero.
   * Change the text here, or set it to null to remove the badge entirely.
   */
  availability: "Building Better Infrastructure",

  // TODO: the source PDF's font subset contained no glyph for the digit "4",
  // so every 4 was silently dropped during extraction. Retype the real number.
  phone: "+62 822 9933 7687",
  phoneHref: "tel:+6282299337687",

  /**
   * WhatsApp deep link, shown in the contact section instead of a plain call
   * link. The number must be international format with digits only — no "+",
   * no spaces, no leading 0 (62… not 062… and not 0822…).
   */
  whatsapp: "https://wa.me/6282299337687",

  /**
   * Web3Forms access key — the contact form posts here and the message lands
   * in the inbox registered at web3forms.com.
   *
   * This key is public by design: it ships in the client bundle and only
   * identifies the destination inbox. It grants no account access.
   *
   * NOTE: the key is registered against the domain "localhost". Before going
   * live, add the real domain in the Web3Forms dashboard or submissions from
   * the deployed site will be rejected.
   */
  web3formsKey: "f8b81ea8-d0d8-4e0e-ab5a-ac810bd926fd",

  // TODO: the CV decoded as "miftahulriiziiq@gmail.com" (doubled i's — likely a
  // typo in the PDF itself). Confirm which address you want shown publicly.
  email: "miftahulriiziiq@gmail.com",

  /** Short line under the hero name. */
  tagline:
    "I design, build and operate the infrastructure that production runs on — on-premise and in the cloud.",

  /** Hero paragraph. Kept to three sentences; longer reads as a wall of text. */
  intro:
    "I build and maintain reliable IT infrastructure across on-premise and cloud environments, ensuring secure, scalable, and high-performing systems. Passionate about Linux, cloud technologies, networking, and continuous learning.",

  /** Rendered as animated counters in the hero. */
  stats: [
    { label: "Years in IT", value: 4, suffix: "+" },
    { label: "Services self-hosted", value: 5, suffix: "" },
    { label: "Homelab uptime", value: 99.9, suffix: "%", decimals: 1 },
  ],

  socials: {
    // TODO: replace with your real profile URLs.
    github: "https://github.com/miftahulrmdc",
    linkedin: "https://www.linkedin.com/in/miftahul-riziq-b10544230/",

    /**
     * The lab's own site — same apex this CV is served from. Shown in the
     * contact section above the location card.
     *
     * Deliberately live before the site is: it is the one link a reviewer
     * clicks expecting to see the infrastructure, so it should not 404 for
     * long. Point the DNS at something — even a holding page listing the
     * stack — rather than leaving it dead.
     */
    rmdc: "https://rmdc.my.id",
  },

  /** Drop the real PDF at `public/resume.pdf` to make this link live. */
  resumeUrl: "/resume.pdf",

  /** Small print in the footer, after the copyright line. */
  footerNote: "Built with Next.js & Tailwind CSS.",

  education: {
    institution: "Universitas Bina Insani",
    degree: "S1 — Teknik Informatika",
    location: "Bekasi",
    period: "2021", // TODO
  },
} as const;

/**
 * Canonical origin used for metadata, sitemap and Open Graph tags.
 *
 * Baked in at build time, not read at runtime — change it here and rebuild,
 * or the deployed site advertises the wrong address. No trailing slash: Next
 * appends paths to it.
 */
export const SITE_URL = "https://miftahul-riziq.rmdc.my.id";
