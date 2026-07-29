/**
 * ============================================================================
 *  RMDC — Riziq Mini Data Center
 * ============================================================================
 *  Content for the signature homelab section: the topology diagram nodes and
 *  the service inventory.
 */

/**
 * Everything running (or planned) in the rack. Declared outside `homelab` so
 * the metric counter below can be computed from it.
 */
const services = [
  { name: "Proxmox VE", status: "running" },
  { name: "Ubuntu Server", status: "running" },
  { name: "Docker", status: "running" },
  { name: "aaPanel", status: "running" },
  { name: "Grafana", status: "running" },
  { name: "Nginx", status: "running" },
  { name: "MikroTik RouterOS", status: "running" },
  { name: "Cloudflare", status: "running" },
  { name: "Prometheus", status: "planned" },
  { name: "Node Exporter", status: "planned" },
  { name: "cAdvisor", status: "planned" },
  { name: "Uptime Kuma", status: "planned" },
  { name: "Gitea", status: "planned" },
  { name: "Portainer", status: "planned" },
  { name: "Kubernetes", status: "planned" },
] as const;

const RUNNING_SERVICES = services.filter((s) => s.status === "running").length;

export const homelab = {
  title: "RMDC",
  fullName: "Riziq Mini Data Center",
  tagline: "Built at Home. Ready for Production.",
  description:
    "RMDC (Riziq Mini Data Center) is my personal infrastructure platform designed to simulate enterprise-grade IT operations. It serves as a sandbox where I build, monitor, automate, secure, and maintain production-like environments using modern infrastructure technologies. Every deployment, experiment, failure, and solution contributes to continuous learning and operational excellence.",

  /**
   * Topology layers. The diagram renders these as columns wired together,
   * so ordering here controls left-to-right flow in the SVG.
   */
  topology: [
    {
      layer: "Edge",
      nodes: [
        { id: "internet", label: "Internet", icon: "globe" },
        { id: "cloudflare", label: "Cloudflare", icon: "cloud" },
        { id: "mikrotik", label: "MikroTik hAP lite", icon: "shield" },
      ],
    },
    {
      layer: "Compute",
      nodes: [
        { id: "proxmox", label: "Proxmox VE", icon: "layers" },
        { id: "ubuntu", label: "Ubuntu Server", icon: "terminal" },
        { id: "docker", label: "Docker", icon: "box" },
      ],
    },
    {
      layer: "Platform",
      nodes: [
        { id: "nginx", label: "Nginx Proxy", icon: "network" },
        { id: "grafana", label: "Grafana", icon: "activity" },
        { id: "aapanel", label: "aaPanel", icon: "server" },
      ],
    },
    {
      layer: "Storage",
      nodes: [
        { id: "nvme", label: "NVMe SSD", icon: "database" },
        { id: "lvmthin", label: "LVM-thin Pool", icon: "archive" },
      ],
    },
  ],

  /**
   * Service inventory. `status` drives the coloured pill:
   *  running → emerald, planned → neutral outline.
   */
  services,

  /**
   * Counters shown above the diagram.
   *
   * "Services running" is derived from the list above rather than typed by
   * hand, so the counter and the inventory pills can never disagree.
   */
  metrics: [
    { label: "Services running", value: RUNNING_SERVICES, suffix: "" },
    { label: "Virtual machines", value: 4, suffix: "" },
    { label: "Storage capacity", value: 1, suffix: " TB" },
    { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
  ],
} as const;
