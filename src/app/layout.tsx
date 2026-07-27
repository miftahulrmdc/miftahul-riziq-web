import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AnimatedBackground } from "@/components/effects/animated-background";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { ScrollProgress } from "@/components/effects/scroll-progress";
import { LoadingScreen } from "@/components/effects/loading-screen";
import { BackToTop } from "@/components/effects/back-to-top";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { profile, SITE_URL } from "@/content/profile";
import "./globals.css";

// `display: swap` keeps text visible during font load; the CSS variables are
// consumed by --font-sans / --font-display in globals.css.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const DESCRIPTION =
  "Infrastructure & Cloud Engineer specialising in Linux, VMware virtualisation, AWS, FortiGate network security, monitoring and backup. Builder of RMDC — a home data centre run to production standards.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Infrastructure Engineer",
    "Cloud Engineer",
    "DevOps Engineer",
    "Linux",
    "VMware",
    "AWS",
    "FortiGate",
    "Proxmox",
    "Docker",
    "Grafana",
    "Homelab",
    "Miftahul Riziq",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.role}`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060d0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

/** JSON-LD so search engines can read the profile as a Person entity. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.education.institution,
  },
  knowsAbout: [
    "Linux Administration",
    "VMware vSphere",
    "Amazon Web Services",
    "Network Security",
    "Docker",
    "Infrastructure Monitoring",
  ],
  sameAs: [profile.socials.github, profile.socials.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning is required: next-themes sets the theme class on
    // <html> before React hydrates, which would otherwise log a mismatch.
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${manrope.variable}`}>
      <body>
        {/* Framer Motion serialises each component's `initial` variant into the
            SSR markup as inline styles. Without JS those styles are never
            resolved, so every animated element would stay at opacity 0 and the
            page would render blank. Force everything visible in that case —
            inline styles need !important to beat. */}
        <noscript>
          <style>{`
            [style*="opacity:0"], [style*="opacity: 0"] {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Keyboard users land here first. */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>

          <LoadingScreen />
          <AnimatedBackground />
          <ScrollProgress />
          <CursorGlow />

          <Navbar />
          <main id="main">{children}</main>
          <Footer />

          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
