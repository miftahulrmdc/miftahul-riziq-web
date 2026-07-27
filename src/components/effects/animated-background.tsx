"use client";

/**
 * Fixed decorative backdrop shared by the whole page:
 *   1. a faint blueprint grid, radially masked so it never shows a hard edge
 *   2. two slow-drifting emerald blobs
 *   3. a sparse particle field
 *
 * Everything here is `pointer-events-none` and `aria-hidden` — it is pure
 * decoration and must never intercept clicks or reach a screen reader.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-surface" />

      {/* Blueprint grid */}
      <div className="bg-grid mask-radial absolute inset-0" />

      {/* Drifting emerald blobs. Heavy blur + low opacity keeps them as
          atmosphere rather than shapes competing with the content. */}
      <div className="animate-blob absolute -left-[10%] top-[-8%] size-[38rem] rounded-full bg-brand-300/25 blur-[120px] dark:bg-brand-500/12" />
      <div
        className="animate-blob absolute -right-[12%] top-[38%] size-[42rem] rounded-full bg-brand-200/30 blur-[130px] dark:bg-brand-600/12"
        style={{ animationDelay: "-8s", animationDuration: "30s" }}
      />
      <div
        className="animate-blob absolute bottom-[-14%] left-[28%] size-[34rem] rounded-full bg-brand-100/40 blur-[110px] dark:bg-brand-400/8"
        style={{ animationDelay: "-16s", animationDuration: "26s" }}
      />

      <ParticleField />

      {/* Top and bottom fades so sections dissolve into the background. */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-surface to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </div>
  );
}

/**
 * Floating particles.
 *
 * Positions are derived from a deterministic hash rather than Math.random(), so
 * the server and client render identical markup — random values would hydrate
 * mismatched and flash on load.
 */
function ParticleField() {
  const particles = Array.from({ length: 28 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const rand = seed / 233280;
    const rand2 = ((i * 4801 + 9973) % 233280) / 233280;

    return {
      left: `${(rand * 100).toFixed(2)}%`,
      top: `${(rand2 * 100).toFixed(2)}%`,
      size: 2 + ((i % 3) as number),
      delay: `-${(rand * 12).toFixed(2)}s`,
      duration: `${(7 + rand2 * 8).toFixed(2)}s`,
      opacity: 0.18 + rand2 * 0.35,
    };
  });

  return (
    <div className="absolute inset-0">
      {particles.map((p, i) => (
        <span
          key={i}
          className="animate-float absolute rounded-full bg-brand-500"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}
