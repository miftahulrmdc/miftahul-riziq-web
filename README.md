# Miftahul Riziq — Portfolio

Personal portfolio for an Infrastructure & Cloud Engineer.
Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion.

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

---

## ⚠️ Before you publish — edit these

Every value below is a placeholder. They are **all** in `src/content/`, so you
never need to touch a component to fix them.

| # | File | What to change |
|---|------|----------------|
| 1 | `src/content/profile.ts` | `phone` — the source PDF's embedded font had **no glyph for the digit `4`**, so every 4 in your number was silently dropped during extraction. Retype it. |
| 2 | `src/content/profile.ts` | `email` — the CV decoded as `miftahulriiziiq@gmail.com` (doubled `i`s, likely a typo in the PDF itself). Currently set to `miftahul.rmdc@gmail.com`. |
| 3 | `src/content/profile.ts` | `socials.github` / `socials.linkedin` |
| 4 | `src/content/profile.ts` | `education.period` — graduation year |
| 5 | `src/content/profile.ts` | `SITE_URL` — your real domain (drives canonical URL, Open Graph, sitemap) |
| 6 | `src/content/profile.ts` | `stats` — "5+ years", "12 services", "99.9% uptime" are estimates |
| 7 | `src/content/experience.ts` | `period` for **Syntech** and **IDX** — absent from the CV |
| 8 | `src/content/experience.ts` | `role` for **Sultan Metal Forming** — not recoverable from the PDF |
| 9 | `src/content/projects.ts` | `repo` / `demo` URLs. `null` hides the button — better than a dead link |
| 10 | `src/content/certifications.ts` | All entries are `in-progress` / `planned`. When you earn one, set `status: "earned"` + `credentialUrl` and it renders with the verified treatment automatically |
| 11 | `src/content/skills.ts` | `level` values are self-assessed estimates |

Search the repo for `TODO` to find them all.

**Resume:** your CV was copied to `public/resume.pdf`, so the download button
already works. Replace that file to update it.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx        Root shell, SEO metadata, JSON-LD, effect mounting
│   ├── page.tsx          Section composition order
│   ├── globals.css       Design tokens + component utilities
│   ├── sitemap.ts        robots.ts
├── content/              ← ALL COPY AND DATA LIVES HERE
├── components/
│   ├── sections/         Hero, About, Experience, Skills, Projects,
│   │                     Homelab (RMDC), TechStack, Certifications, Contact
│   ├── layout/           Navbar, Footer
│   ├── effects/          LoadingScreen, CursorGlow, ScrollProgress,
│   │                     BackToTop, AnimatedBackground
│   ├── ui/               Button, Counter, Reveal, SectionHeading,
│   │                     ThemeToggle, TechIcon, Slot
│   └── providers/        ThemeProvider
├── hooks/                useTypewriter, useScrollSpy
└── lib/                  cn(), shared motion variants
```

### Design system

Colours are defined once in `globals.css` as two ramps (`brand-*`, `ink-*`)
plus a **semantic layer** (`surface`, `ink`, `line`) that is re-pointed under
`.dark`. Components therefore write `bg-surface text-ink` and theme correctly in
both modes without a single `dark:` variant for base colours.

To rebrand, change the `--color-brand-*` values in `@theme` — nothing else.

### Accessibility notes

- `prefers-reduced-motion` disables all decorative animation (`globals.css`)
  and makes counters jump straight to their final value.
- The hero typing animation is `aria-hidden`; a static equivalent is exposed to
  screen readers, since announcing one character at a time is unusable.
- The custom cursor only mounts on fine-pointer devices with motion allowed —
  the native cursor is never hidden from anyone who does not get a replacement.
- Skip-to-content link, keyboard focus rings, `role="meter"` on skill bars.
- A `<noscript>` override forces content visible if JS is unavailable —
  Framer Motion serialises `opacity: 0` into the SSR markup, which would
  otherwise render a blank page.

### Deliberate omissions

- **No embedded Google Map.** It would load third-party scripts and expose
  visitor IPs on page load. The contact section uses a static card that links
  out only on click.
- **No contact-form backend.** The form composes a `mailto:` and hands it to the
  visitor's own mail client, so nothing is silently dropped. To make it real,
  replace `handleSubmit` in `src/components/sections/contact.tsx` with a POST to
  a route handler.
- **Tech icons are original simplified marks**, not official brand logos — they
  inherit `currentColor` so they theme correctly, and avoid redistributing
  trademarked artwork.

---

## Deploy

Push to GitHub, import to Vercel — no configuration needed.
Set `SITE_URL` in `src/content/profile.ts` first, or Open Graph tags will point
at the wrong domain.

> `sharp` (production image optimisation) was skipped at install time because
> npm 11 blocks postinstall scripts by default. The site is SVG/CSS-driven so it
> is not currently needed. If you add photographs, run `npm approve-scripts sharp`.
