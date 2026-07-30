"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";
import { Cloud, Container, Server, Shield } from "lucide-react";
import { TechIcon } from "@/components/ui/tech-icon";

/**
 * Hero illustration: an isometric server rack with orbiting technology cards.
 *
 * Built as CSS 3D + SVG rather than a WebGL scene — it costs a few kilobytes
 * instead of a few hundred, and still reads as dimensional. The whole group
 * tilts toward the pointer via a spring-damped rotation.
 */
export function HeroVisual() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 140,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 140,
    damping: 20,
  });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      aria-hidden
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative mx-auto aspect-square w-full max-w-[34rem]"
      style={{ perspective: 1200 }}
    >
      {/* Emerald glow behind the rack */}
      <div className="absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/20 blur-[100px]" />

      <motion.div
        className="relative size-full"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* ---------- Rack ---------- */}
        <div
          className="absolute left-1/2 top-1/2 w-[15rem] -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translateZ(0px) translate(-50%,-50%)" }}
        >
          <div className="glass rounded-3xl border-2 border-brand-600/15 p-4 shadow-[var(--shadow-lift)]">
            {/* Rack header */}
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                RMDC
              </span>
              <span className="flex gap-1">
                <span className="size-1.5 rounded-full bg-brand-500" />
                <span className="size-1.5 rounded-full bg-brand-400/60" />
                <span className="size-1.5 rounded-full bg-brand-300/50" />
              </span>
            </div>

            {/* Rack units */}
            <div className="flex flex-col gap-2">
              {RACK_UNITS.map((unit, i) => (
                <motion.div
                  key={unit.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.09, duration: 0.5 }}
                  className="flex items-center gap-2.5 rounded-xl border border-line bg-surface-raised/70 px-2.5 py-2.5"
                >
                  <unit.Icon className="size-3.5 shrink-0 text-brand-700 dark:text-brand-400" />
                  <span className="flex-1 truncate text-[10px] font-semibold text-ink-soft">
                    {unit.label}
                  </span>

                  {/* Activity LEDs — offset delays so they blink out of sync,
                      which reads as "live" rather than "animated". */}
                  <span className="flex gap-[3px]">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="size-1 rounded-full bg-brand-500"
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          delay: i * 0.3 + d * 0.22,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Throughput bar */}
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full w-1/3 rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>

        {/* ---------- Orbiting tech cards ---------- */}
        {FLOATING_CARDS.map((card, i) => (
          <motion.div
            key={card.slug}
            className="absolute"
            style={{
              ...card.position,
              transform: `translateZ(${card.depth}px)`,
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 5 + i * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
              className="glass flex items-center gap-2 rounded-2xl px-3.5 py-2.5 shadow-[var(--shadow-soft)]"
            >
              <TechIcon slug={card.slug} className="size-4 text-brand-700 dark:text-brand-400" />
              <span className="text-[11px] font-semibold text-ink">{card.label}</span>
            </motion.div>
          </motion.div>
        ))}

        {/* ---------- Connection lines ---------- */}
        <svg className="absolute inset-0 size-full" viewBox="0 0 400 400" fill="none">
          {CONNECTIONS.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="var(--color-brand-500)"
              strokeWidth="1"
              strokeOpacity="0.28"
              strokeDasharray="4 6"
              className="animate-flow"
              style={{ animationDelay: `${i * -0.7}s` }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

const RACK_UNITS = [
  { label: "Proxmox VE", Icon: Server },
  { label: "Ubuntu Server", Icon: Server },
  { label: "Docker Host", Icon: Container },
  { label: "FortiGate", Icon: Shield },
  { label: "Synology NAS", Icon: Cloud },
] as const;

const FLOATING_CARDS = [
  { slug: "aws", label: "AWS", depth: 90, position: { top: "8%", left: "2%" } },
  { slug: "linux", label: "Linux", depth: 70, position: { top: "22%", right: "0%" } },
  { slug: "docker", label: "Docker", depth: 110, position: { bottom: "24%", left: "-2%" } },
  { slug: "vmware", label: "VMware", depth: 80, position: { bottom: "10%", right: "4%" } },
  { slug: "grafana", label: "Grafana", depth: 60, position: { top: "48%", right: "-4%" } },
] as const;

/** Decorative bezier links between the rack and the floating cards. */
const CONNECTIONS = [
  "M 60 60 C 120 90, 150 140, 190 175",
  "M 350 110 C 300 130, 250 150, 215 180",
  "M 45 290 C 110 270, 155 235, 190 215",
  "M 345 340 C 300 300, 250 250, 218 220",
];
