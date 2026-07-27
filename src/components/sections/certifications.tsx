"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Cloud,
  ExternalLink,
  Layers,
  Network,
  Shield,
  Target,
  Terminal,
} from "lucide-react";
import {
  certifications,
  type Certification,
  type CertStatus,
} from "@/content/certifications";
import { SectionHeading } from "@/components/ui/section-heading";
import { fadeUp, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ICONS = {
  cloud: Cloud,
  terminal: Terminal,
  shield: Shield,
  network: Network,
  layers: Layers,
} as const;

const STATUS_LABEL: Record<CertStatus, string> = {
  earned: "Certified",
  "in-progress": "In progress",
  planned: "Planned",
};

export function Certifications() {
  const earned = certifications.filter((c) => c.status === "earned").length;

  return (
    <section className="section bg-surface-muted/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Certifications"
          title="Credentials &"
          accent="roadmap"
          description={
            earned > 0
              ? "Verified credentials, plus what I'm studying for next."
              : "An honest view of where I'm heading. Nothing here is claimed until it's earned — each card shows its real status."
          }
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, index }: { cert: Certification; index: number }) {
  const Icon = ICONS[cert.icon];
  const isEarned = cert.status === "earned";
  const isActive = cert.status === "in-progress";

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUp}
      transition={{ delay: (index % 3) * 0.08 }}
      className={cn(
        "glass hover-lift group flex flex-col rounded-3xl p-6",
        // Only earned credentials get the solid emerald edge — the visual
        // hierarchy has to match the honesty of the content.
        isEarned && "ring-1 ring-brand-600/30",
        cert.status === "planned" && "opacity-90",
      )}
    >
      <header className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-2xl transition-colors duration-300",
            isEarned
              ? "bg-brand-600 text-white"
              : "bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-400/10 dark:text-brand-400",
          )}
        >
          <Icon className="size-5" />
        </span>

        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
            isEarned && "bg-brand-600 text-white",
            isActive &&
              "border border-brand-600/30 bg-brand-50 text-brand-700 dark:bg-brand-400/10 dark:text-brand-300",
            cert.status === "planned" && "border border-line text-ink-faint",
          )}
        >
          {isEarned ? <BadgeCheck className="size-3" /> : <Target className="size-3" />}
          {STATUS_LABEL[cert.status]}
        </span>
      </header>

      <h3 className="mt-5 font-display text-base font-bold leading-snug">
        {cert.name}
      </h3>

      <p className="mt-1.5 text-sm font-medium text-brand-700 dark:text-brand-300">
        {cert.issuer}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
        {cert.description}
      </p>

      <footer className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="text-xs font-semibold text-ink-faint">{cert.issued}</span>

        {isEarned && cert.credentialUrl ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 transition-colors hover:text-brand-800 dark:text-brand-300"
          >
            Verify
            <ExternalLink className="size-3" />
          </a>
        ) : null}
      </footer>
    </motion.article>
  );
}
