"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Archive,
  Box,
  Cloud,
  Database,
  Globe,
  Layers,
  Network,
  Server,
  Shield,
  Terminal,
} from "lucide-react";
import { homelab } from "@/content/homelab";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { scaleIn, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NODE_ICONS = {
  globe: Globe,
  cloud: Cloud,
  shield: Shield,
  layers: Layers,
  terminal: Terminal,
  box: Box,
  network: Network,
  activity: Activity,
  server: Server,
  database: Database,
  archive: Archive,
} as const;

/**
 * RMDC — the signature section.
 *
 * The topology is laid out as four CSS-grid columns with an SVG overlay drawing
 * animated links between them. Using grid for placement (rather than absolute
 * SVG coordinates) means the diagram reflows on mobile into a readable stack
 * instead of overflowing.
 */
export function Homelab() {
  return (
    <section id="homelab" className="section relative overflow-hidden">
      {/* Emerald wash unique to this section, so it reads as "the centrepiece". */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-brand-50/70 via-transparent to-transparent dark:from-brand-400/6"
      />

      <div className="container-page">
        {/* ---------- Header ---------- */}
        <Reveal className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/20 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700 dark:border-brand-400/20 dark:bg-brand-400/10 dark:text-brand-300">
            <span className="size-1.5 rounded-full bg-brand-500" />
            Homelab
          </span>

          <h2 className="mt-6 font-display text-7xl font-extrabold tracking-[-0.05em] sm:text-8xl">
            <span className="text-gradient">{homelab.title}</span>
          </h2>

          <p className="mt-3 font-display text-xl font-semibold sm:text-2xl">
            {homelab.fullName}
          </p>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-brand-700 dark:text-brand-300">
            {homelab.tagline}
          </p>

          <p className="mt-8 max-w-2xl leading-relaxed text-ink-soft">
            {homelab.description}
          </p>
        </Reveal>

        {/* ---------- Metrics ---------- */}
        <motion.dl
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {homelab.metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={scaleIn}
              className="glass rounded-2xl p-5 text-center"
            >
              <dd className="font-display text-3xl font-bold text-brand-600 dark:text-brand-400">
                <Counter
                  value={metric.value}
                  suffix={metric.suffix}
                  decimals={"decimals" in metric ? metric.decimals : 0}
                />
              </dd>
              <dt className="mt-1 text-xs font-medium text-ink-faint">
                {metric.label}
              </dt>
            </motion.div>
          ))}
        </motion.dl>

        {/* ---------- Topology ---------- */}
        <Reveal className="mt-16">
          <div className="glass relative overflow-hidden rounded-[2rem] p-6 sm:p-10">
            <div className="bg-grid absolute inset-0 opacity-60" />

            <div className="relative">
              <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-ink-faint">
                Network topology
              </p>

              <TopologyDiagram />
            </div>
          </div>
        </Reveal>

        {/* ---------- Hardware + services ---------- */}
        {/* items-start: let each card size to its own content. Stretching them
            to a shared height left ~180px of dead space inside the service
            card, which reads as a rendering fault rather than as breathing
            room. Uneven bottoms are the lesser evil here. */}
        <div className="mt-8 grid items-start gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="glass rounded-3xl p-6 sm:p-8">
            <h3 className="font-display text-lg font-bold">Hardware</h3>
            <dl className="mt-5 divide-y divide-[color:var(--color-line)]">
              {homelab.hardware.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <dt className="text-sm text-ink-faint">{row.label}</dt>
                  <dd className="text-right">
                    <span className="text-sm font-semibold">{row.value}</span>
                    <span className="ml-2 text-xs text-ink-faint">{row.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="glass rounded-3xl p-6 sm:p-8">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-lg font-bold">Service inventory</h3>
              <p className="text-xs text-ink-faint">
                <span className="font-semibold text-brand-600 dark:text-brand-400">
                  {homelab.services.filter((s) => s.status === "running").length}
                </span>{" "}
                running ·{" "}
                {homelab.services.filter((s) => s.status === "planned").length} planned
              </p>
            </div>

            <ul className="mt-5 flex flex-wrap gap-2">
              {homelab.services.map((service) => {
                const running = service.status === "running";
                return (
                  <li
                    key={service.name}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      running
                        ? "bg-brand-600 text-white"
                        : "border border-dashed border-line text-ink-faint",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-1.5 rounded-full",
                        running ? "bg-white" : "bg-ink-faint",
                      )}
                    />
                    {service.name}
                    <span className="sr-only">
                      {running ? " — running" : " — planned"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Four-layer topology.
 *
 * Each layer is a column of nodes; the SVG behind them draws flowing dashed
 * links. On small screens the columns stack and the links are hidden, since
 * connectors drawn between stacked rows read as noise.
 */
function TopologyDiagram() {
  return (
    <div className="relative">
      {/* Animated links — desktop only. */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden size-full lg:block"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {LINKS.map((link, i) => (
          <path
            key={i}
            d={link}
            fill="none"
            stroke="var(--color-brand-500)"
            strokeWidth="0.25"
            strokeOpacity="0.45"
            strokeDasharray="1.5 2"
            className="animate-flow"
            style={{ animationDelay: `${i * -0.45}s` }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div className="relative grid gap-8 lg:grid-cols-4 lg:gap-4">
        {homelab.topology.map((layer, layerIndex) => (
          <div key={layer.layer} className="flex flex-col gap-3">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
              {layer.layer}
            </p>

            {layer.nodes.map((node, nodeIndex) => {
              const Icon = NODE_ICONS[node.icon as keyof typeof NODE_ICONS];
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEWPORT}
                  transition={{
                    delay: layerIndex * 0.12 + nodeIndex * 0.06,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="group relative flex items-center gap-3 rounded-2xl border border-line bg-surface-raised/80 px-4 py-3 backdrop-blur transition-colors hover:border-brand-600/40"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-400/10 dark:text-brand-400">
                    <Icon className="size-4" />
                  </span>
                  <span className="truncate text-sm font-semibold">{node.label}</span>

                  {/* Live indicator */}
                  <motion.span
                    aria-hidden
                    className="ml-auto size-1.5 shrink-0 rounded-full bg-brand-500"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: layerIndex * 0.3 + nodeIndex * 0.25,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Link paths in a 0-100 viewBox stretched across the grid.
 * Roughly: edge → compute → platform → storage.
 */
const LINKS = [
  "M 24 30 C 30 30, 32 34, 38 34",
  "M 24 46 C 30 46, 32 50, 38 50",
  "M 24 62 C 30 62, 32 58, 38 58",
  "M 49 34 C 55 34, 57 40, 63 40",
  "M 49 50 C 55 50, 57 46, 63 46",
  "M 49 62 C 55 62, 57 56, 63 56",
  "M 74 40 C 80 40, 82 46, 88 46",
  "M 74 56 C 80 56, 82 52, 88 52",
];
