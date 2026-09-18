"use client";

import { motion } from "framer-motion";
import { revealGroup, revealItem } from "@/lib/motion";

const links = [
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="surface-page--sheer border-t hairline">
      <motion.div
        className="mx-auto flex max-w-content flex-col gap-3 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"
        variants={revealGroup(0.06)}
        initial="hidden"
        whileInView="show"
        /* Not the shared VIEWPORT: its -12% bottom margin puts the trigger
           line above the footer, which sits in the last ~65px of the page
           and can never scroll past it — the content would never appear. */
        viewport={{ once: true }}
      >
        <motion.p variants={revealItem}>
          © {new Date().getFullYear()} Peer Consulting Resources, Inc. — Princeton, NJ.
        </motion.p>

        <motion.nav variants={revealItem} aria-label="Footer" className="flex items-center gap-5">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="link-underline hover:text-signal">
              {link.label}
            </a>
          ))}
        </motion.nav>
      </motion.div>
    </footer>
  );
}
