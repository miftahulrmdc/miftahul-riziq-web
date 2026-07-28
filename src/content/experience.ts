/**
 * ============================================================================
 *  EXPERIENCE — rendered by the vertical timeline.
 * ============================================================================
 *
 *  Bullets are taken from the CV and translated to English.
 *
 *  `period` is a free-text display string. Month + year is the convention on a
 *  CV; switch to exact dates here if you prefer.
 *
 *  Set `current: true` on a role to show the pulsing "Current" badge. Nothing
 *  carries it right now — add it back when a new role starts.
 */

export interface ExperienceItem {
  company: string;
  role: string;
  /** Display string, e.g. "Mar 2023 — Present". */
  period: string;
  location: string;
  /** Shown as a pill on the card. */
  type: string;
  /** Lucide icon name resolved in the Experience component. */
  icon: "server" | "cloud" | "wrench";
  summary: string;
  highlights: string[];
  /** Surfaced as small tags under the bullets. */
  stack: string[];
  /** Marks the card as the current role (adds a pulsing dot). */
  current?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    company: "Syntech Mitra Integrasi",
    role: "Infrastructure & Cloud Engineer",
    period: "Dec 2025 — Jul 2026",
    location: "Bekasi, Indonesia",
    type: "Full-time",
    icon: "cloud",
    summary:
      "Own the availability, security and performance of hybrid infrastructure spanning on-premise hardware and public cloud.",
    highlights: [
      "Operate and maintain hybrid on-premise and cloud IT infrastructure, keeping availability, security and system performance at target.",
      "Configure and manage network connectivity through FortiGate firewalls, including site-to-site VPN tunnels and hardened network access.",
      "Run centralised storage and backup on Synology NAS — shared file services, scheduled backups and restore verification.",
      "Configure Nginx as a reverse proxy with SSL/TLS termination to secure application access.",
      "Manage DNS records, SSL certificates, firewall policy and network routing supporting production applications and services.",
      "Troubleshoot across the whole stack: servers, networking, cloud services and applications.",
      "Implement and manage Amazon Web Services (AWS) workloads.",
    ],
    stack: ["FortiGate", "AWS", "Nginx", "Synology NAS", "Linux", "DNS / SSL", "VPN"],
  },
  {
    company: "IDX Solusi Teknologi Informasi",
    role: "Cloud & Managed Services",
    period: "Oct 2022 — Dec 2025",
    location: "Jakarta Selatan, Indonesia",
    type: "Full-time",
    icon: "server",
    summary:
      "Monitored and maintained enterprise virtualisation and server estates for managed-service customers, on-site at the data centre.",
    highlights: [
      "Monitored server performance, capacity and availability using Nagios, ManageEngine OpManager and Grafana to keep services within SLA.",
      "Installed, configured, administered and maintained VMware vSphere and vCenter virtualisation environments.",
      "Provided technical support and troubleshooting across the VMware estate to protect service stability.",
      "Acted as Data Center Representative, supporting on-site operations and activities according to established procedure.",
      "Performed hardware troubleshooting, maintenance and replacement to keep operational equipment functioning.",
      "Handled and resolved ticketing requests from internal users and customers within agreed targets.",
      "Analysed, validated and reconciled data in the KSEI database using SQL queries to identify and resolve data discrepancies.",
      "Coordinated with related teams through investigation and resolution until data returned to a valid state.",
    ],
    stack: ["VMware vSphere", "vCenter", "Nagios", "OpManager", "Grafana", "SQL", "Data Center"],
  },
  {
    company: "Sultan Metal Forming Indonesia",
    role: "HR & GA Staff",
    period: "Feb 2020 — Jan 2021",
    location: "Cikarang, Indonesia",
    type: "Full-time",
    icon: "wrench",
    summary:
      "Documented and maintained company infrastructure and assets — the first role that pulled me toward IT.",
    highlights: [
      "Maintained and serviced company assets across the site.",
      "Ran scheduled workstation maintenance and company data backups against a defined calendar.",
      "Troubleshot hardware and software issues for staff.",
      "Recorded employee attendance data.",
      "Produced maintenance schedules and reports for operational vehicles.",
      "Prepared accountable periodic reports for management.",
    ],
    stack: ["Asset Management", "Hardware", "Software", "Backup", "Reporting"],
  },
];
