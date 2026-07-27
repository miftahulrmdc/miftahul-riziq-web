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

  // TODO: the source PDF's font subset contained no glyph for the digit "4",
  // so every 4 was silently dropped during extraction. Retype the real number.
  phone: "+62 822 9933 7687",
  phoneHref: "tel:+6282299337687",

  // TODO: the CV decoded as "miftahulriiziiq@gmail.com" (doubled i's — likely a
  // typo in the PDF itself). Confirm which address you want shown publicly.
  email: "miftahulriiziiq@gmail.com",

  /** Short line under the hero name. */
  tagline:
    "I design, build and operate the infrastructure that production runs on — on-premise and in the cloud.",

  /** Hero paragraph. Kept to three sentences; longer reads as a wall of text. */
  intro:
    "I'm an Infrastructure & Cloud Engineer who works across the full stack of what keeps systems online: Linux and Windows Server administration, VMware virtualisation, network security, monitoring and backup. I care about the parts nobody sees until they break — reverse proxies terminating TLS correctly, firewall rules that are tight without being brittle, backups that have actually been restored at least once. When I'm not doing it at work, I'm doing it in my own rack at home.",

  /** Rendered as animated counters in the hero. */
  stats: [
    { label: "Years in IT", value: 5, suffix: "+" },
    { label: "Services self-hosted", value: 12, suffix: "" },
    { label: "Homelab uptime", value: 99.9, suffix: "%", decimals: 1 },
  ],

  socials: {
    // TODO: replace with your real profile URLs.
    github: "https://github.com/miftahulrmdc",
    linkedin: "https://www.linkedin.com/in/miftahul-riziq-b10544230/",
  },

  /** Drop the real PDF at `public/resume.pdf` to make this link live. */
  resumeUrl: "/resume.pdf",

  education: {
    institution: "Universitas Bina Insani",
    degree: "S1 — Teknik Informatika",
    location: "Bekasi",
    period: "2021", // TODO
  },
} as const;

/**
 * Canonical origin used for metadata, sitemap and Open Graph tags.
 * TODO: point this at your real domain before deploying.
 */
export const SITE_URL = "https://miftahulriziq.com";
