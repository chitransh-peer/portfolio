"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { SPRING, VIEWPORT, revealGroup, revealItem } from "@/lib/motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="surface-page--sheer border-t hairline">
      <motion.div
        className="mx-auto flex max-w-content flex-col gap-4 px-6 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between"
        variants={revealGroup(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <motion.p variants={revealItem}>
          © {new Date().getFullYear()} Peer Consulting Resources, Inc. — Princeton, NJ.
        </motion.p>

        <motion.div variants={revealItem} className="flex items-center gap-5">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="link-underline hover:text-signal">
              {link.label}
            </a>
          ))}

          <motion.a
            href="#top"
            aria-label="Back to top"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING.pointer}
            className="hairline flex h-7 w-7 items-center justify-center rounded-card border transition-colors hover:border-signal hover:text-signal"
          >
            <ArrowUp size={13} />
          </motion.a>
        </motion.div>
      </motion.div>
    </footer>
  );
}
