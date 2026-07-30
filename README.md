# Miftahul Riziq — Portfolio

Personal portfolio for an Infrastructure & Cloud Engineer.
Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion.

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

---

## Content status

Contact details, work history and education have been checked against the real
CV and are live. Phone, email and the contact form were verified end to end
against the deployed domain — a message sent from the published site reaches the
Web3Forms inbox.

What remains is judgement, not extraction error. Everything lives in
`src/content/`, so no component needs touching.

| # | File | What to review |
|---|------|----------------|
| 1 | `src/content/profile.ts` | `stats` — "4+ years in IT", "5 services self-hosted", "99.9% homelab uptime" are self-assessed. Be ready to defend each in an interview |
| 2 | `src/content/skills.ts` | `level` values are self-assessed estimates |
| 3 | `src/content/profile.ts` | `education.period` reads "Graduated 2021". Change to a range such as "2017 — 2021" if you would rather show the enrolment year |
| 4 | `src/content/profile.ts` | `socials.github` no longer renders anywhere — the RMDC link took its slot in both the contact section and the footer — but it still feeds the JSON-LD `sameAs` in `layout.tsx` |
| 5 | `src/content/certifications.ts` | Two entries are `completed` (training), the rest `planned`. When you earn a vendor exam, set `status: "earned"` + `credentialUrl` and it renders with the verified treatment automatically |
| 6 | `src/content/projects.ts` | `repo` / `demo` URLs. `null` hides the button — better than a dead link. Note the Projects and Skills sections are not currently rendered (see `app/page.tsx`), so this only matters if you add them back |
| 7 | `src/content/experience.ts` | No role carries `current: true`, so no "Current" badge renders. That is correct while between roles — set it on the newest entry when a new one starts |

Search the repo for `TODO` to find anything still marked.

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
- **No backend of our own for the contact form.** It POSTs to Web3Forms, which
  relays the message to the inbox registered against `profile.web3formsKey`, so
  the visitor needs no mail client. A failed send is always surfaced with the
  error and a fallback address — a form that silently drops a recruiter's
  message is worse than having no form at all.

  The key is public by design: it ships in the client bundle, only identifies
  the destination inbox, and grants no account access. Verified working from the
  deployed domain.

  > If sends start failing with `hCaptcha Token is mandatory for this form`,
  > hCaptcha has been switched on in the Web3Forms dashboard. This form does not
  > send a captcha token — it relies on the `botcheck` honeypot instead, which
  > keeps third-party scripts off the page. Turn hCaptcha back off, or add the
  > widget and pass `h-captcha-response` in the payload.
- **Tech icons are original simplified marks**, not official brand logos — they
  inherit `currentColor` so they theme correctly, and avoid redistributing
  trademarked artwork.

---

## Deploy

The site ships as a container. A Node stage builds the static export; the image
that actually runs is nginx serving those files, carrying no Node runtime, no
`node_modules` and no source code.

```
Internet → Cloudflare → cloudflared (aaPanel VM) → this VM:8080 → nginx:80
```

On the Docker host:

```bash
git clone https://github.com/miftahulrmdc/miftahul-riziq-web.git
cd miftahul-riziq-web
docker compose up -d --build
```

To update after a push:

```bash
git pull && docker compose up -d --build
```

`--build` is not optional. Without it Compose reuses the existing
`miftahul-portfolio:latest` image and the pull changes nothing you can see —
the single most common way a deploy appears to do nothing.

Then check it is serving, not merely running:

```bash
docker compose ps                       # STATUS should read (healthy)
curl -I http://localhost:8080/healthz
```

`(healthy)` comes from the `HEALTHCHECK` in the Dockerfile, which probes
`/healthz` every 30s. A container can be `Up` while nginx has stopped serving.

`docker-compose.yml` builds from source, so this VM needs the repo and enough
memory for `npm ci` + `next build` — roughly 1–2 GB. The next step up is
building the image in CI and pushing it to a registry, leaving the server to
pull a finished artefact: builds stop touching production, and rollback becomes
a tag change rather than a rebuild. Worth doing once deploys are frequent enough
that waiting on a server-side build is the annoying part.

Set `SITE_URL` in `src/content/profile.ts` before going live, or the canonical
URL, Open Graph tags and sitemap will all point at the wrong domain.

> `sharp` (production image optimisation) was skipped at install time because
> npm 11 blocks postinstall scripts by default. The site is SVG/CSS-driven so it
> is not currently needed. If you add photographs, run `npm approve-scripts sharp`.
