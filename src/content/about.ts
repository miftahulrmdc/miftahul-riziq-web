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

  /** Rendered as a grid of small cards beside the narrative. */
  pillars: [
    {
      title: "Reliability first",
      icon: "shield-check",
      body: "Uptime is a design outcome, not luck. Redundancy, monitoring and tested restores — in that order.",
    },
    {
      title: "Security by default",
      icon: "lock",
      body: "Segmented networks, least privilege and TLS everywhere. Secure defaults beat remembering to lock the door.",
    },
    {
      title: "Automate the repeat",
      icon: "workflow",
      body: "If I have configured it twice by hand, it belongs in a script — or better, in version control as code.",
    },
    {
      title: "Document as you build",
      icon: "file-text",
      body: "An undocumented system has exactly one operator. That is a single point of failure with a pulse.",
    },
  ],

  /** Pulled from CLAUDE.md — the honest career trajectory. */
  trajectory: [
    { label: "Infrastructure Engineer", state: "current" },
    { label: "Cloud Engineer", state: "next" },
    { label: "DevOps Engineer", state: "future" },
    { label: "Platform Engineer", state: "future" },
  ],
} as const;
