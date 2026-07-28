/**
 * ============================================================================
 *  CERTIFICATIONS
 * ============================================================================
 *
 *  Four statuses, deliberately distinct:
 *
 *    completed   — a training course finished, certificate issued by the
 *                  training provider. Real and worth showing, but NOT a vendor
 *                  certification, and the card says so.
 *    earned      — a vendor exam passed (CCNA, AWS, CKA…). Gets the "Certified"
 *                  label and a Verify link.
 *    in-progress — actively studying for it.
 *    planned     — on the roadmap, not started.
 *
 *  Keeping training and vendor exams apart matters: a recruiter who reads
 *  "Certified" and then cannot verify it on Credly draws the worst conclusion.
 *  Stated accurately, both are assets.
 */

export type CertStatus = "completed" | "earned" | "in-progress" | "planned";

export interface Certification {
  name: string;
  issuer: string;
  status: CertStatus;
  /** Year obtained, or the target window while unobtained. */
  issued: string;
  description: string;
  /** Verification link. Only rendered for `earned` or `completed`. */
  credentialUrl: string | null;
  /** Lucide icon name resolved in the Certifications component. */
  icon: "cloud" | "terminal" | "shield" | "network" | "layers" | "container";
}

export const certifications: Certification[] = [
  // ------------------------------------------------- obtained, newest first
  {
    name: "Cloud Essential",
    issuer: "INIXINDO",
    status: "completed",
    issued: "2024",
    description:
      "Foundational cloud training — service and deployment models, shared responsibility, and the cost and governance basics behind cloud adoption.",
    // If the provider issues a verification link, or you host a scan of the
    // certificate, put the URL here and a Verify button appears on the card.
    credentialUrl: null,
    icon: "cloud",
  },
  {
    name: "VMware vSphere Admin",
    issuer: "ID Networkers",
    status: "completed",
    issued: "2023",
    description:
      "Instructor-led training on vSphere administration — ESXi hosts, vCenter, virtual networking, storage and resource management. The same estate I was administering day to day at IDXSTI.",
    credentialUrl: null,
    icon: "layers",
  },

  // ----------------------------------------------------------------- roadmap
  {
    name: "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco",
    status: "planned",
    issued: "Planned",
    description:
      "Routing and switching fundamentals, IP services, security basics and automation — the vendor-neutral grounding under every other network skill.",
    credentialUrl: null,
    icon: "network",
  },
  {
    name: "AWS Certified Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    status: "planned",
    issued: "Planned",
    description:
      "Designing resilient, cost-aware architectures on AWS — VPC design, high availability across availability zones, and the shared responsibility model.",
    credentialUrl: null,
    icon: "cloud",
  },
  {
    name: "Docker Certified Associate (DCA)",
    issuer: "Mirantis",
    status: "planned",
    issued: "Planned",
    description:
      "Container images, networking, storage and orchestration — formalising the Docker work already running in RMDC.",
    credentialUrl: null,
    icon: "container",
  },
  {
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "CNCF",
    status: "planned",
    issued: "Planned",
    description:
      "Cluster architecture, workload scheduling, networking and troubleshooting — the step after Docker in the RMDC roadmap.",
    credentialUrl: null,
    icon: "layers",
  },
  {
    name: "Cisco Certified Network Professional (CCNP)",
    issuer: "Cisco",
    status: "planned",
    issued: "Planned",
    description:
      "Advanced enterprise routing, switching and network design — taken after CCNA, which is its prerequisite in practice.",
    credentialUrl: null,
    icon: "network",
  },
];
