/**
 * ============================================================================
 *  RMDC — Riziq Mini Data Center
 * ============================================================================
 *  Content for the signature homelab section: the topology diagram nodes and
 *  the hardware / service inventory.
 */

export const homelab = {
  title: "RMDC",
  fullName: "Riziq Mini Data Center",
  tagline: "Built at Home. Ready for Production.",
  description:
    "RMDC is not a pile of spare parts in a cupboard. It is a deliberately designed environment — segmented networks, a real hypervisor, centralised storage, monitoring and a tested backup policy — run the way a small production estate is run. It exists so that everything I deploy at work, I have already broken and fixed at home first.",

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
        { id: "fortigate", label: "FortiGate", icon: "shield" },
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
        { id: "synology", label: "Synology NAS", icon: "database" },
        { id: "backup", label: "Backup Vault", icon: "archive" },
      ],
    },
  ],

  /** Physical inventory — rendered as spec rows. */
  hardware: [
    { label: "Hypervisor", value: "Proxmox VE", detail: "Type-1, KVM-based" },
    { label: "Storage", value: "Synology RS1221+", detail: "Rackmount NAS" },
    { label: "Disks", value: "Seagate IronWolf", detail: "NAS-rated, RAID" },
    { label: "Edge", value: "FortiGate", detail: "Firewall & VPN" },
    { label: "DNS / CDN", value: "Cloudflare", detail: "Proxied ingress" },
  ],

  /**
   * Service inventory. `status` drives the coloured pill:
   *  running → emerald, planned → neutral outline.
   */
  services: [
    { name: "Proxmox VE", status: "running" },
    { name: "Ubuntu Server", status: "running" },
    { name: "Docker", status: "running" },
    { name: "aaPanel", status: "running" },
    { name: "Grafana", status: "running" },
    { name: "Nginx", status: "running" },
    { name: "Synology NAS", status: "running" },
    { name: "Cloudflare", status: "running" },
    { name: "Prometheus", status: "planned" },
    { name: "Node Exporter", status: "planned" },
    { name: "cAdvisor", status: "planned" },
    { name: "Uptime Kuma", status: "planned" },
    { name: "Gitea", status: "planned" },
    { name: "Portainer", status: "planned" },
    { name: "Kubernetes", status: "planned" },
  ] as const,

  /** Counters shown above the diagram. */
  metrics: [
    { label: "Services running", value: 8, suffix: "" },
    { label: "Virtual machines", value: 6, suffix: "" },
    { label: "Storage capacity", value: 16, suffix: " TB" },
    { label: "Uptime", value: 99.9, suffix: "%", decimals: 1 },
  ],
} as const;
