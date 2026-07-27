"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
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
      label: "WhatsApp",
      value: profile.phone,
      href: profile.whatsapp,
      Icon: WhatsAppIcon,
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
      // The grid stretches this column to match the form, but the cards only
      // fill part of it. `grow` shares the leftover height between them so the
      // last card's bottom edge lines up with the form's. Only from lg up —
      // below that the columns stack and there is no height to match.
      className="flex flex-col gap-3 lg:[&>*]:grow"
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

      {/* Location card — display only, no map embed and no outbound link. An
          embedded map would load third-party scripts and expose visitor IPs on
          page load. */}
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
      </motion.div>
    </motion.div>
  );
}

type FormStatus = "idle" | "sending" | "success" | "error";

/**
 * Contact form.
 *
 * Submits to Web3Forms, which relays the message to the inbox registered
 * against `profile.web3formsKey` — so the visitor needs no mail client and the
 * message arrives without any further action from them.
 *
 * Single call to action by design: the WhatsApp card above already covers
 * anyone who would rather message directly, and a second button here would
 * only split attention.
 */
function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  /** Pull the four fields out of whichever form triggered the submit. */
  const readFields = (form: HTMLFormElement) => {
    const data = new FormData(form);
    return {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = readFields(form);

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          ...fields,
          from_name: fields.name,
          // Spread first, then override: prefixing the subject makes portfolio
          // enquiries filterable in the inbox.
          subject: `[Portfolio] ${fields.subject}`,
        }),
      });

      const result = (await res.json()) as { success?: boolean; message?: string };

      if (!res.ok || !result.success) {
        throw new Error(result.message || `Request failed (${res.status})`);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      // Never swallow the failure — a contact form that silently drops a
      // recruiter's message is worse than having no form at all.
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };


  return (
    <Reveal className="glass rounded-3xl p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Honeypot: hidden from people, irresistible to bots. Web3Forms drops
            any submission where this is filled in. */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="hidden"
        />

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

        <div className="flex justify-center pt-1">
          <Button type="submit" size="lg" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <Loader2 className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send />
                Send Message
              </>
            )}
          </Button>
        </div>

        {status === "success" ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="status"
            className="inline-flex items-start gap-2 rounded-xl border border-brand-600/20 bg-brand-50/60 px-3.5 py-2.5 text-sm text-brand-800 dark:border-brand-400/20 dark:bg-brand-400/8 dark:text-brand-200"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            Message sent — thank you. I&rsquo;ll reply to your email shortly.
          </motion.p>
        ) : null}

        {status === "error" ? (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="inline-flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/8 px-3.5 py-2.5 text-sm text-red-700 dark:text-red-300"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <span>
              Couldn&rsquo;t send that ({error}). Please use the WhatsApp button, or
              email me directly at{" "}
              <a href={`mailto:${profile.email}`} className="font-semibold underline">
                {profile.email}
              </a>
              .
            </span>
          </motion.p>
        ) : null}
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
