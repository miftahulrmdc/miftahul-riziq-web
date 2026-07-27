/**
 * ============================================================================
 *  SKILLS
 * ============================================================================
 *
 *  `level` is a self-assessed 0-100 proficiency, calibrated against the
 *  knowledge levels declared in CLAUDE.md. Keep it honest — an interviewer
 *  will probe anything you put above 80.
 */

export interface Skill {
  name: string;
  level: number;
}

export interface SkillGroup {
  title: string;
  /** Lucide icon name, resolved in the Skills component. */
  icon: "server" | "network" | "cloud" | "activity" | "shield" | "database";
  description: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Infrastructure & OS",
    icon: "server",
    description: "The foundation everything else is deployed onto.",
    skills: [
      { name: "Linux (Ubuntu / Debian)", level: 78 },
      { name: "Windows Server", level: 70 },
      { name: "VMware vSphere & vCenter", level: 75 },
      { name: "Proxmox VE", level: 72 },
      { name: "Nginx / Reverse Proxy", level: 76 },
    ],
  },
  {
    title: "Networking & Security",
    icon: "shield",
    description: "Connectivity that is both reachable and defensible.",
    skills: [
      { name: "FortiGate Firewall", level: 74 },
      { name: "VPN (Site-to-Site)", level: 70 },
      { name: "DNS & SSL/TLS", level: 76 },
      { name: "Routing & Switching", level: 65 },
      { name: "Cloudflare", level: 68 },
    ],
  },
  {
    title: "Cloud & Containers",
    icon: "cloud",
    description: "Where the workloads are heading.",
    skills: [
      { name: "AWS (EC2, S3, IAM, VPC)", level: 62 },
      { name: "Docker & Compose", level: 66 },
      { name: "Docker Networking", level: 58 },
      { name: "Kubernetes", level: 35 },
      { name: "Infrastructure as Code", level: 40 },
    ],
  },
  {
    title: "Monitoring & Operations",
    icon: "activity",
    description: "You cannot operate what you cannot observe.",
    skills: [
      { name: "Grafana", level: 70 },
      { name: "Nagios", level: 65 },
      { name: "ManageEngine OpManager", level: 64 },
      { name: "Prometheus", level: 48 },
      { name: "Backup & Recovery", level: 74 },
    ],
  },
  {
    title: "Storage & Data",
    icon: "database",
    description: "Capacity, redundancy and getting data back.",
    skills: [
      { name: "Synology NAS", level: 78 },
      { name: "RAID & Volume Design", level: 68 },
      { name: "SQL", level: 60 },
      { name: "Disaster Recovery", level: 55 },
    ],
  },
  {
    title: "Ways of Working",
    icon: "network",
    description: "The non-technical half of engineering.",
    skills: [
      { name: "Troubleshooting & Root Cause", level: 82 },
      { name: "Technical Documentation", level: 76 },
      { name: "Git & Version Control", level: 60 },
      { name: "Incident Communication", level: 72 },
    ],
  },
];
