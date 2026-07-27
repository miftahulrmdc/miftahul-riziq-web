/**
 * Inline SVG glyphs for the tech stack grid.
 *
 * These are simplified, original marks rather than official brand logos — they
 * inherit `currentColor`, so they theme correctly in light and dark, ship no
 * extra network requests, and avoid redistributing trademarked artwork.
 */

import type { ReactElement, SVGProps } from "react";

// React 19 removed the global JSX namespace, so the return type is spelled out.
type Glyph = (props: SVGProps<SVGSVGElement>) => ReactElement;

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const Linux: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3c2.2 0 3.2 1.8 3.2 4.2 0 1.7.5 2.6 1.4 3.9 1 1.4 1.8 2.6 1.8 4.3 0 2.9-2.6 4.6-6.4 4.6S5.6 18.3 5.6 15.4c0-1.7.8-2.9 1.8-4.3.9-1.3 1.4-2.2 1.4-3.9C8.8 4.8 9.8 3 12 3Z" />
    <circle cx="10.4" cy="7.6" r=".9" fill="currentColor" stroke="none" />
    <circle cx="13.6" cy="7.6" r=".9" fill="currentColor" stroke="none" />
    <path d="M10.8 10.4c.8.7 1.6.7 2.4 0" />
  </svg>
);

const Ubuntu: Glyph = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="6.6" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="7.3" cy="14.7" r="1.7" fill="currentColor" stroke="none" />
    <circle cx="16.7" cy="14.7" r="1.7" fill="currentColor" stroke="none" />
  </svg>
);

const Windows: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M3 6.4 10.3 5.3v6H3zM11.6 5.1 21 3.8v7.5h-9.4zM3 12.7h7.3v6L3 17.6zM11.6 12.7H21v7.5l-9.4-1.3z" />
  </svg>
);

const VMware: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M2.5 8h4l1.8 5.4L10.2 8h3.6l1.8 5.4L17.5 8h4" />
    <path d="M6.5 8l2.2 8M13.8 8l2.2 8" />
  </svg>
);

const Proxmox: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2.6 21 7.3v9.4L12 21.4 3 16.7V7.3z" />
    <path d="M12 7.4v9.2M8.2 9.5l7.6 5M15.8 9.5l-7.6 5" />
  </svg>
);

const Docker: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M3 11.4h15.2c0 3.7-2.4 6.6-6.6 6.6-3.9 0-6.7-1.9-8-4.7" />
    <path d="M5.6 11.4V8.9h2.5v2.5M9.1 11.4V8.9h2.5v2.5M12.6 11.4V8.9h2.5v2.5M9.1 8V5.6h2.5V8" />
    <path d="M18.2 9.6c1 -.6 2.2-.5 2.9.2" />
  </svg>
);

const Kubernetes: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2.8 20 6.6v8.8L12 21.2 4 15.4V6.6z" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M12 3.4v6M12 14.6v6M6 8.4l3.6 2.4M14.4 13.2l4 2.6M18 8.4l-3.6 2.4M9.6 13.2l-4 2.6" />
  </svg>
);

const Aws: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M3.2 8.6h1.6l1.5 5 1.5-5h1.5l1.5 5 1.5-5h1.6" />
    <path d="M16.4 8.6c1.6 0 2.6.6 2.6 1.6s-.9 1.4-2.4 1.7c-1.5.3-2.4.7-2.4 1.7s1 1.6 2.6 1.6c1 0 1.8-.2 2.4-.6" />
    <path d="M3 18.4c3.6 2 8 2.8 12 1.8 1.7-.4 3.3-1.1 4.6-2" />
    <path d="M18.4 17.4c.9-.3 1.9-.4 2.6-.2.3.7.1 1.8-.4 2.7" />
  </svg>
);

const Cloudflare: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M16.6 16.4H5.4a2.6 2.6 0 0 1 .4-5.2h.4a4.4 4.4 0 0 1 8.3-1.6 3 3 0 0 1 4.3 2.7" />
    <path d="M16.6 16.4h3.1a2 2 0 0 0 0-4h-.5" />
  </svg>
);

const Fortinet: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2.8 20 6v6c0 4.4-3.3 7.7-8 9.2-4.7-1.5-8-4.8-8-9.2V6z" />
    <path d="M9 11.6h6M12 8.6v6" />
  </svg>
);

const Nginx: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2.6 20.4 7.4v9.2L12 21.4 3.6 16.6V7.4z" />
    <path d="M9.2 15.4V9l5.6 6V9" />
  </svg>
);

const Grafana: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M3.4 17.6c0-4.8 3-7.6 6.6-7.6" />
    <path d="M12 2.8c-2 1-3 2.6-3 4.6 3.6 0 6.4 2.4 6.4 6.2h5.2c0 4.6-3.8 7.6-8.6 7.6s-8.6-3-8.6-7.6" />
    <circle cx="12" cy="13.6" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

const Prometheus: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M12 2.6c2.6 2.6 3.2 5 1.8 7.2 2 .4 3 1.8 3 3.6 0 3-2.2 5-4.8 5s-4.8-2-4.8-5c0-2.6 1.6-4 2.8-6 1-1.6 1.4-3.2 2-4.8Z" />
    <path d="M6.4 15.4h11.2M7.6 18h8.8" />
  </svg>
);

const Synology: Glyph = (p) => (
  <svg {...base} {...p}>
    <rect x="3.4" y="4.4" width="17.2" height="15.2" rx="2.4" />
    <path d="M3.4 9.4h17.2M3.4 14.4h17.2" />
    <circle cx="7" cy="6.9" r=".8" fill="currentColor" stroke="none" />
    <circle cx="7" cy="11.9" r=".8" fill="currentColor" stroke="none" />
    <circle cx="7" cy="16.9" r=".8" fill="currentColor" stroke="none" />
  </svg>
);

const Git: Glyph = (p) => (
  <svg {...base} {...p}>
    <circle cx="6.4" cy="6.4" r="2.2" />
    <circle cx="6.4" cy="17.6" r="2.2" />
    <circle cx="17.6" cy="10.4" r="2.2" />
    <path d="M6.4 8.6v6.8M8.6 6.4h4.6a2.2 2.2 0 0 1 2.2 2.2v.4" />
  </svg>
);

const GitHub: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M9.4 20.2v-2.6c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.3-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7 1 .7 2v3.6" />
  </svg>
);

const Terraform: Glyph = (p) => (
  <svg {...base} {...p}>
    <path d="M9.6 4.2 14 6.7v5l-4.4-2.5zM14.6 7.4 19 9.9v5l-4.4-2.5zM4.6 6.6 9 9.1v5L4.6 11.6zM9.6 13.4 14 15.9v5l-4.4-2.5z" />
  </svg>
);

const Sql: Glyph = (p) => (
  <svg {...base} {...p}>
    <ellipse cx="12" cy="6.2" rx="7.6" ry="3.2" />
    <path d="M4.4 6.2v11.6c0 1.8 3.4 3.2 7.6 3.2s7.6-1.4 7.6-3.2V6.2" />
    <path d="M4.4 12c0 1.8 3.4 3.2 7.6 3.2s7.6-1.4 7.6-3.2" />
  </svg>
);

/** Slug → glyph. Keys must match `slug` in content/tech-stack.ts. */
export const TECH_ICONS: Record<string, Glyph> = {
  linux: Linux,
  ubuntu: Ubuntu,
  windows: Windows,
  vmware: VMware,
  proxmox: Proxmox,
  docker: Docker,
  kubernetes: Kubernetes,
  aws: Aws,
  cloudflare: Cloudflare,
  fortinet: Fortinet,
  nginx: Nginx,
  grafana: Grafana,
  prometheus: Prometheus,
  synology: Synology,
  git: Git,
  github: GitHub,
  terraform: Terraform,
  sql: Sql,
};

export function TechIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Glyph = TECH_ICONS[slug];
  if (!Glyph) return null;
  return <Glyph className={className} aria-hidden />;
}
