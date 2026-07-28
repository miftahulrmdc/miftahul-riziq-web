/**
 * ============================================================================
 *  ABOUT — the narrative section.
 * ============================================================================
 *  Written as a story with a turn in it, because "passionate about technology"
 *  is what everyone else's portfolio says.
 */

export const about = {
  eyebrow: "About",
  title: "Who I Am.",
  subtitle: "What I Build.",

  paragraphs: [
    "A Bachelor's degree in Informatics Engineering from Bina Insani University, I have experience as an IT Infrastructure & Cloud Engineer managing both on-premise and cloud-based IT infrastructure. I have experience in Linux and Windows server administration, virtualization, cloud computing, monitoring, backup, and implementing network and infrastructure security.",

    "I am passionate about developing a career in IT Infrastructure, Cloud Engineering, and DevOps. I actively build and develop my personal home lab as a learning tool, technology exploration, and continuous competency improvement. I am committed to continuously learning the latest technologies and implementing best practices in managing secure, reliable, and scalable infrastructure.",
  ],

  /**
   * Rendered as a grid of small cards beside the narrative.
   *
   * Each one names something actually done — a principle with no evidence
   * behind it reads like every other portfolio, and invites an interview
   * question you cannot answer.
   */
  pillars: [
    {
      title: "Reliability first",
      icon: "shield-check",
      body: "Four years keeping production estates inside SLA — VMware clusters on a data centre floor, hybrid infrastructure today. Redundancy, monitoring, and restores that have actually been tested.",
    },
    {
      title: "Security by default",
      icon: "lock",
      body: "FortiGate policy, site-to-site VPN, TLS terminated at the proxy. Segmented networks, so one compromised device reaches nothing else.",
    },
    {
      title: "Visibility before guesswork",
      icon: "activity",
      body: "Nagios, OpManager and Grafana. You cannot operate what you cannot see — I instrument first, then tune.",
    },
    {
      title: "Document as you build",
      icon: "file-text",
      body: "An undocumented system has exactly one operator. I write the runbook as I build — that is the difference between a system and a dependency on me.",
    },
  ],

  /** Pulled from CLAUDE.md — the honest career trajectory. */
  trajectory: [
    { label: "Infrastructure Engineer", state: "current" },
    { label: "Cloud Engineer", state: "next" },
    { label: "DevOps Engineer", state: "future" },
    //{ label: "Platform Engineer", state: "future" },
  ],
} as const;
