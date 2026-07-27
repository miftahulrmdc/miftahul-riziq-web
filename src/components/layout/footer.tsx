"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/content/profile";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

/**
 * Minimal single-line footer: copyright on the left, social icons on the right.
 *
 * Deliberately quiet — the Contact section directly above already carries the
 * full set of contact details, so this only needs to close the page off.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: profile.socials.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: profile.socials.github, label: "GitHub", Icon: Github },
    { href: profile.whatsapp, label: "WhatsApp", Icon: WhatsAppIcon },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col items-center justify-between gap-5 py-8 sm:flex-row">
        <p className="text-center text-sm text-ink-faint sm:text-left">
          © {year} {profile.name}. {profile.footerNote}
        </p>

        <ul className="flex items-center gap-2">
          {socials.map(({ href, label, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer noopener"
                aria-label={label}
                className="grid size-9 place-items-center rounded-lg border border-line bg-surface-muted text-ink-faint transition-colors duration-300 hover:border-brand-600/40 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-400/10 dark:hover:text-brand-300"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
