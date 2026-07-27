/**
 * ============================================================================
 *  TECH STACK — the icon grid.
 * ============================================================================
 *  Logos are drawn as inline SVG (see components/ui/tech-icon.tsx) so the grid
 *  ships zero image requests and inherits the current theme colour.
 */

export interface TechItem {
  name: string;
  /** Key into the TECH_ICONS map in components/ui/tech-icon.tsx. */
  slug: string;
  category: "os" | "virtualization" | "cloud" | "container" | "network" | "observability" | "tooling";
}

export const techStack: TechItem[] = [
  { name: "Linux", slug: "linux", category: "os" },
  { name: "Ubuntu", slug: "ubuntu", category: "os" },
  { name: "Windows Server", slug: "windows", category: "os" },
  { name: "VMware", slug: "vmware", category: "virtualization" },
  { name: "Proxmox", slug: "proxmox", category: "virtualization" },
  { name: "Docker", slug: "docker", category: "container" },
  { name: "Kubernetes", slug: "kubernetes", category: "container" },
  { name: "AWS", slug: "aws", category: "cloud" },
  { name: "Cloudflare", slug: "cloudflare", category: "cloud" },
  { name: "FortiGate", slug: "fortinet", category: "network" },
  { name: "Nginx", slug: "nginx", category: "network" },
  { name: "Grafana", slug: "grafana", category: "observability" },
  { name: "Prometheus", slug: "prometheus", category: "observability" },
  { name: "Synology", slug: "synology", category: "tooling" },
  { name: "Git", slug: "git", category: "tooling" },
  { name: "GitHub", slug: "github", category: "tooling" },
  { name: "Terraform", slug: "terraform", category: "tooling" },
  { name: "SQL", slug: "sql", category: "tooling" },
];
