"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks } from "@/content/navigation";
import { profile } from "@/content/profile";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_IDS = navLinks.map((l) => l.id);

/**
 * Sticky navigation.
 *
 * Transparent while at the top of the page, then condenses into a frosted bar
 * once scrolled. The active link is tracked by IntersectionObserver and marked
 * with a shared-layout pill that slides between items.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(NAV_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent background scrolling while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-line bg-surface/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Main"
          className="container-page flex h-16 items-center justify-between gap-4 sm:h-20"
        >
          {/* Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5"
            aria-label={`${profile.name} — home`}
          >
            <span className="grid size-10 place-items-center rounded-xl bg-brand-600 font-display text-sm font-extrabold tracking-tight text-white shadow-[0_6px_16px_-6px_rgb(22_163_74/0.7)] transition-transform duration-300 group-hover:scale-105">
              {profile.initials}
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-sm font-bold">{profile.name}</span>
              <span className="mt-0.5 text-[11px] font-medium text-ink-faint">
                {profile.role}
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      isActive
                        ? "text-brand-700 dark:text-brand-300"
                        : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-brand-50 dark:bg-brand-400/12"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={profile.resumeUrl} download>
                <Download />
                Resume
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="grid size-10 place-items-center rounded-full border border-line bg-surface/60 text-ink-soft backdrop-blur transition-colors hover:text-brand-600 lg:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink-950/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            <motion.nav
              aria-label="Mobile"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass absolute inset-x-4 top-24 rounded-3xl p-3 shadow-[var(--shadow-lift)]"
            >
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block rounded-2xl px-4 py-3 text-base font-medium transition-colors",
                        activeId === link.id
                          ? "bg-brand-50 text-brand-700 dark:bg-brand-400/12 dark:text-brand-300"
                          : "text-ink-soft hover:bg-surface-muted hover:text-ink",
                      )}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-2 border-t border-line p-2 pt-3">
                <Button asChild className="w-full">
                  <a href={profile.resumeUrl} download>
                    <Download />
                    Download Resume
                  </a>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
