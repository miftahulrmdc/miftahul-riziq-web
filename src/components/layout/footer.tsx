"use client";

import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { navLinks } from "@/content/navigation";
import { Reveal } from "@/components/ui/reveal";

const QUOTE = "Building reliable infrastructure, one server at a time.";

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: profile.socials.github, label: "GitHub", Icon: Github },
    { href: profile.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <footer className="relative border-t border-line">
      <div className="container-page py-16">
        <Reveal className="flex flex-col items-center gap-10 text-center">
          {/* Monogram */}
          <div className="grid size-14 place-items-center rounded-2xl bg-brand-600 font-display text-lg font-extrabold text-white shadow-[0_8px_24px_-8px_rgb(22_163_74/0.6)]">
            {profile.initials}
          </div>

          <blockquote className="max-w-xl font-display text-xl font-semibold leading-snug sm:text-2xl">
            <span className="text-gradient">&ldquo;{QUOTE}&rdquo;</span>
          </blockquote>

          {/* Secondary nav */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-ink-soft transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                aria-label={label}
                className="glass grid size-11 place-items-center rounded-full text-ink-soft transition-all duration-300 hover:-translate-y-1 hover:text-brand-600 hover:shadow-[var(--shadow-glow)]"
              >
                <Icon className="size-[18px]" />
              </a>
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-3 border-t border-line pt-8 text-sm text-ink-faint sm:flex-row sm:justify-between">
            <p>
              © {year} {profile.name}. All rights reserved.
            </p>
            <p className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {profile.location}
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
