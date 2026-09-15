"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Send } from "lucide-react";
import { EASE, SPRING, VIEWPORT, revealGroup, revealItem } from "@/lib/motion";
import SectionLabel from "./motion/SectionLabel";
import TextReveal from "./motion/TextReveal";
import { Reveal } from "./motion/Reveal";

const socials = [
  {
    href: "mailto:contact@peer-consulting.com",
    icon: Mail,
    label: "contact@peer-consulting.com",
    external: false,
  },
  { href: "tel:+17324444645", icon: Phone, label: "+1 (732) 444-4645", external: false },
  {
    href: "https://maps.google.com/?q=20+Jefferson+Plaza,+Princeton,+NJ+08540",
    icon: MapPin,
    label: "20 Jefferson Plaza, Princeton, NJ 08540",
    external: true,
  },
  {
    href: "https://www.linkedin.com/company/peer-consulting",
    icon: Linkedin,
    label: "linkedin.com/company/peer-consulting",
    external: true,
  },
];

const fields = [
  { id: "name", label: "Name", type: "text" as const },
  { id: "email", label: "Work email", type: "email" as const },
  { id: "company", label: "Company", type: "text" as const },
];

/** Circle and tick draw themselves on, rather than cutting in finished. */
function DrawnCheck() {
  return (
    <svg width="44" height="44" viewBox="0 0 52 52" className="text-success" aria-hidden="true">
      <motion.circle
        cx="26"
        cy="26"
        r="23"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE.out }}
      />
      <motion.path
        d="M15 27 l7.5 7.5 L37 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.45, ease: EASE.out }}
      />
    </svg>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire this up to an email service (Resend, Formspree, etc.) or your
    // own API route. For now it just confirms locally.
    setSent(true);
  }

  return (
    <section id="contact" className="surface-page--sheer border-t hairline">
      <div className="mx-auto max-w-content px-6 py-20">
        <SectionLabel className="mb-8">Contact</SectionLabel>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <TextReveal
              as="h2"
              text="Ready to elevate your IT strategy?"
              className="font-display text-2xl font-medium text-primary md:text-3xl"
            />

            <Reveal delay={0.3} y={16}>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Connect with our team to discuss your project needs and discover
                how Peer Consulting Resources can drive your business forward.
              </p>
            </Reveal>

            <motion.div
              className="mt-8 flex flex-col items-start gap-3 text-sm"
              variants={revealGroup(0.08, 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              {socials.map(({ href, icon: Icon, label, external }) => (
                <motion.a
                  key={href}
                  href={href}
                  variants={revealItem}
                  whileHover={{ x: 5 }}
                  transition={SPRING.pointer}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center gap-2 text-primary transition-colors hover:text-signal"
                >
                  <Icon
                    size={16}
                    className="transition-colors duration-300 group-hover:text-signal"
                  />
                  <span className="link-underline">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* `layout` lets the panel resize smoothly when the form is
              replaced by the confirmation, instead of snapping shorter. */}
          <motion.div
            layout
            transition={SPRING.layout}
            className="surface-card hairline h-fit rounded-card border p-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: EASE.out }}
                  className="flex flex-col items-center gap-4 py-6 text-center"
                >
                  <DrawnCheck />
                  <p className="text-sm text-primary">
                    Message received. We&apos;ll reply from contact@peer-consulting.com.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: EASE.out }}
                >
                  <motion.div
                    className="flex flex-col gap-4"
                    variants={revealGroup(0.07, 0.15)}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                  >
                    {fields.map((field) => (
                      <motion.div key={field.id} variants={revealItem}>
                        <label htmlFor={field.id} className="text-xs text-muted">
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          required
                          className="field surface-page hairline mt-1 w-full rounded-card border px-3 py-2 text-sm text-primary"
                        />
                      </motion.div>
                    ))}

                    <motion.div variants={revealItem}>
                      <label htmlFor="message" className="text-xs text-muted">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        className="field surface-page hairline mt-1 w-full resize-none rounded-card border px-3 py-2 text-sm text-primary"
                      />
                    </motion.div>

                    <motion.button
                      variants={revealItem}
                      type="submit"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={SPRING.pointer}
                      className="sheen group flex items-center justify-center gap-2 btn-accent rounded-card px-4 py-2 text-sm font-medium"
                    >
                      Send message
                      <Send
                        size={15}
                        className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
