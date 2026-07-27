"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { fadeUp, slideInLeft, VIEWPORT } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something"
          accent="reliable"
          description="Open to Infrastructure, Cloud and DevOps roles. Happy to talk architecture either way."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <ContactDetails />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function ContactDetails() {
  const channels = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: Mail,
    },
    {
      label: "Phone",
      value: profile.phone,
      href: profile.phoneHref,
      Icon: Phone,
    },
    {
      label: "GitHub",
      value: profile.socials.github.replace("https://", ""),
      href: profile.socials.github,
      Icon: Github,
    },
    {
      label: "LinkedIn",
      value: profile.socials.linkedin.replace("https://", ""),
      href: profile.socials.linkedin,
      Icon: Linkedin,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      className="flex flex-col gap-3"
    >
      {channels.map(({ label, value, href, Icon }) => (
        <motion.a
          key={label}
          variants={slideInLeft}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer noopener"
          className="glass hover-lift group flex items-center gap-4 rounded-2xl p-4"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white dark:bg-brand-400/10 dark:text-brand-400">
            <Icon className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-medium text-ink-faint">{label}</span>
            <span className="block truncate text-sm font-semibold">{value}</span>
          </span>
        </motion.a>
      ))}

      {/* Location card. A real embedded map would load third-party scripts and
          leak visitor IPs, so this is a static, privacy-preserving stand-in
          that links out only when the visitor chooses to click. */}
      <motion.div
        variants={slideInLeft}
        className="glass relative overflow-hidden rounded-2xl p-5"
      >
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div className="relative flex items-center gap-4">
          <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
            <MapPin className="size-5" />
            <span className="absolute inset-0 rounded-xl border-2 border-brand-500/50 [animation:pulse-ring_2.6s_ease-out_infinite]" />
          </span>
          <span>
            <span className="block text-xs font-medium text-ink-faint">Based in</span>
            <span className="block text-sm font-semibold">{profile.location}</span>
          </span>
        </div>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(profile.location)}`}
          target="_blank"
          rel="noreferrer noopener"
          className="relative mt-4 inline-block text-xs font-semibold text-brand-700 hover:underline dark:text-brand-300"
        >
          Open in Google Maps →
        </a>
      </motion.div>
    </motion.div>
  );
}

/**
 * Contact form.
 *
 * There is no backend, so rather than faking a success state the form composes
 * a pre-filled message and hands it to the visitor's own mail client. Nothing
 * is transmitted anywhere, and the visitor sees exactly what gets sent.
 *
 * To make this a real API-backed form later, replace `handleSubmit` with a
 * POST to a route handler — the markup and validation already suit that.
 */
function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");

    const body = `${message}\n\n—\n${name}\n${email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  };

  return (
    <Reveal className="glass rounded-3xl p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="name" placeholder="Your name" required />
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
          />
        </div>

        <Field
          label="Subject"
          name="subject"
          placeholder="Infrastructure Engineer role"
          required
        />

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium">Message</span>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell me about the role, the team, and the infrastructure you're running."
            className="resize-y rounded-2xl border border-line bg-surface/60 px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink-faint focus:border-brand-600/50"
          />
        </label>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg">
            <Send />
            Send Message
          </Button>

          {sent ? (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-ink-soft"
              role="status"
            >
              Your mail app should now be open with the message ready to send.
            </motion.p>
          ) : null}
        </div>

        <p className="text-xs text-ink-faint">
          This form opens your own email client — nothing is submitted to a server.
        </p>
      </form>
    </Reveal>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <motion.label variants={fadeUp} className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="h-12 rounded-2xl border border-line bg-surface/60 px-4 text-sm outline-none transition-colors placeholder:text-ink-faint focus:border-brand-600/50"
      />
    </motion.label>
  );
}
