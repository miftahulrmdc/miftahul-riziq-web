/**
 * ============================================================================
 *  CERTIFICATIONS
 * ============================================================================
 *
 *  ⚠️  No certifications were listed on the source CV, so this is modelled as a
 *  ROADMAP rather than a wall of badges. Recruiters read "target Q3 2026" as
 *  ambition; they read a fabricated credential as a reason to end the process.
 *
 *  When you earn one, move it to `status: "earned"`, fill in `issued` and
 *  `credentialUrl`, and it will render with the verified treatment automatically.
 */

export type CertStatus = "earned" | "in-progress" | "planned";

export interface Certification {
  name: string;
  issuer: string;
  status: CertStatus;
  /** Year earned, or the target window while unearned. */
  issued: string;
  description: string;
  /** Verification link — only rendered when status is "earned". */
  credentialUrl: string | null;
  /** Lucide icon name resolved in the Certifications component. */
  icon: "cloud" | "terminal" | "shield" | "network" | "layers";
}

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    status: "in-progress",
    issued: "Target 2026",
    description:
      "Designing resilient, cost-aware architectures on AWS — VPC design, high availability across availability zones, and the shared responsibility model.",
    credentialUrl: null,
    icon: "cloud",
  },
  {
    name: "Linux Foundation Certified Sysadmin (LFCS)",
    issuer: "The Linux Foundation",
    status: "in-progress",
    issued: "Target 2026",
    description:
      "Hands-on Linux administration: storage and filesystems, systemd service management, networking, users and permissions.",
    credentialUrl: null,
    icon: "terminal",
  },
  {
    name: "Fortinet NSE 4 — Network Security Professional",
    issuer: "Fortinet",
    status: "planned",
    issued: "Planned",
    description:
      "FortiGate firewall policy, VPN topologies, routing and security profiles — formalising skills already used day to day.",
    credentialUrl: null,
    icon: "shield",
  },
  {
    name: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    status: "planned",
    issued: "Planned",
    description:
      "Routing and switching fundamentals, IP services and network access — the vendor-neutral grounding under every other network skill.",
    credentialUrl: null,
    icon: "network",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "CNCF",
    status: "planned",
    issued: "Planned",
    description:
      "Cluster architecture, workload scheduling, networking and troubleshooting — the next step after Docker in the RMDC roadmap.",
    credentialUrl: null,
    icon: "layers",
  },
  {
    name: "HashiCorp Certified: Terraform Associate",
    issuer: "HashiCorp",
    status: "planned",
    issued: "Planned",
    description:
      "Infrastructure as Code — state management, modules and provisioning workflows, to replace click-ops with reviewable commits.",
    credentialUrl: null,
    icon: "layers",
  },
];
