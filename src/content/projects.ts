/**
 * ============================================================================
 *  PROJECTS
 * ============================================================================
 *
 *  ⚠️  `repo` and `demo` links are placeholders — set them to real URLs, or to
 *  `null` to hide the button entirely (the card handles both cases).
 */

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  /** Lucide icon name resolved in the Projects component. */
  icon: "server" | "cloud" | "terminal" | "shield" | "activity" | "layers" | "database" | "network";
  /** `null` hides the button. */
  repo: string | null;
  demo: string | null;
  /** Highlights this card with the emerald accent treatment. */
  featured?: boolean;
  /** Short outcome line — what actually improved. */
  outcome: string;
}

export const projects: Project[] = [
  {
    title: "RMDC — Riziq Mini Data Center",
    subtitle: "Personal production-grade infrastructure lab",
    description:
      "A home rack run to production standards, not hobby standards. Proxmox VE hypervisor, segmented VLANs, centralised storage on a Synology RS1221+, Cloudflare-fronted ingress and a real backup schedule that gets restore-tested. It is the platform every other project on this page is built on.",
    tags: ["Proxmox VE", "Synology", "Cloudflare", "Docker", "Linux", "Networking"],
    icon: "server",
    repo: null, // TODO
    demo: null,
    featured: true,
    outcome: "Sustains 99.9% uptime across 12 self-hosted services.",
  },
  {
    title: "Monitoring Stack",
    subtitle: "Prometheus + Grafana + Exporters",
    description:
      "Metrics pipeline covering host, container and service layers — Node Exporter for hardware and OS, cAdvisor for containers, Uptime Kuma for black-box checks, all visualised in Grafana with alert rules that page only on symptoms users would notice.",
    tags: ["Prometheus", "Grafana", "Node Exporter", "cAdvisor", "Uptime Kuma"],
    icon: "activity",
    repo: null, // TODO
    demo: null,
    outcome: "Cut mean time to detection from hours to under a minute.",
  },
  {
    title: "Nginx Reverse Proxy & TLS",
    subtitle: "Single ingress for every internal service",
    description:
      "One Nginx entry point terminating TLS for all internal applications, with automated certificate renewal, HTTP/2, security headers and per-service upstream routing. Removes the need to expose any application port directly.",
    tags: ["Nginx", "SSL/TLS", "Let's Encrypt", "DNS", "Security Headers"],
    icon: "shield",
    repo: null, // TODO
    demo: null,
    outcome: "Reduced the public attack surface to a single hardened port.",
  },
  {
    title: "AWS Infrastructure",
    subtitle: "Cloud workloads and networking",
    description:
      "EC2 workloads inside a purpose-built VPC with public and private subnets, least-privilege IAM roles, S3 lifecycle policies for archival, and security groups written as explicit allow-lists rather than inherited defaults.",
    tags: ["AWS", "EC2", "VPC", "S3", "IAM", "Route 53"],
    icon: "cloud",
    repo: null, // TODO
    demo: null,
    outcome: "Hybrid capacity that extends the on-premise estate on demand.",
  },
  {
    title: "Virtualization Lab",
    subtitle: "VMware vSphere & Proxmox VE",
    description:
      "Side-by-side hypervisor environment used to compare enterprise VMware tooling against open-source Proxmox — clustering, live migration, snapshot strategy and resource overcommit behaviour under load.",
    tags: ["VMware vSphere", "vCenter", "Proxmox VE", "KVM", "Clustering"],
    icon: "layers",
    repo: null, // TODO
    demo: null,
    outcome: "Informed the hypervisor choice for the production homelab.",
  },
  {
    title: "Backup & Disaster Recovery",
    subtitle: "3-2-1 strategy on Synology NAS",
    description:
      "Three copies, two media types, one off-site — implemented with scheduled snapshots, versioned retention and periodic restore drills. A backup that has never been restored is a hypothesis, not a backup.",
    tags: ["Synology", "3-2-1", "Snapshots", "Retention", "Restore Testing"],
    icon: "database",
    repo: null, // TODO
    demo: null,
    outcome: "Verified recovery point objective of under 24 hours.",
  },
  {
    title: "Linux Server Deployment",
    subtitle: "Repeatable, hardened baseline",
    description:
      "A standard Ubuntu Server build applied to every new host: SSH key-only access, UFW default-deny, unattended security upgrades, fail2ban, time sync and a monitoring agent — so no two servers drift apart.",
    tags: ["Ubuntu", "SSH Hardening", "UFW", "fail2ban", "systemd"],
    icon: "terminal",
    repo: null, // TODO
    demo: null,
    outcome: "New hosts reach a known-good state in minutes, not hours.",
  },
  {
    title: "Network Segmentation",
    subtitle: "FortiGate VLANs & site-to-site VPN",
    description:
      "Segmented the lab into management, server, IoT and guest VLANs with inter-VLAN policy enforced at the firewall, plus an IPsec site-to-site tunnel for encrypted remote access to internal services.",
    tags: ["FortiGate", "VLAN", "IPsec VPN", "Firewall Policy", "Routing"],
    icon: "network",
    repo: null, // TODO
    demo: null,
    outcome: "Contains blast radius — a compromised IoT device reaches nothing.",
  },
];
