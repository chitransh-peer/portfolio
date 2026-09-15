"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { EASE, SPRING, revealGroup, revealItem } from "@/lib/motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Services" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  /* Scroll spy. The rootMargin narrows the viewport to a band across the
     upper third, so a section becomes "active" as it reaches reading
     position rather than the instant its top edge appears. */
  useEffect(() => {
    const targets = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const topMost = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topMost) setActiveId(topMost.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    /* The open mobile menu also needs the frosted shell, otherwise its
       links sit directly on top of the page content behind them. */
    <header
      className={`nav-shell sticky top-0 z-40 ${
        scrolled || open ? "nav-shell--scrolled" : ""
      }`}
    >
      <motion.nav
        className="mx-auto flex max-w-content items-center justify-between px-6"
        animate={{ paddingTop: scrolled ? 10 : 16, paddingBottom: scrolled ? 10 : 16 }}
        transition={{ duration: 0.35, ease: EASE.out }}
      >
        <motion.a
          href="#top"
          aria-label="Peer Consulting Resources — back to top"
          className="flex items-center transition-transform duration-300 hover:-translate-y-0.5"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE.out }}
        >
          {/* Two cuts of the same lockup: white type for the dark theme,
              original navy for the light one. Swapped in CSS so neither
              flashes on load the way a JS-driven switch would. */}
          <Image
            src="/logos/peer-logo-light.png"
            alt="Peer Consulting Resources"
            width={478}
            height={155}
            priority
            className="logo-on-dark h-9 w-auto sm:h-12"
          />
          <Image
            src="/logos/peer-logo-dark.png"
            alt=""
            aria-hidden="true"
            width={478}
            height={155}
            className="logo-on-light h-9 w-auto sm:h-12"
          />
        </motion.a>

        <motion.div
          className="hidden items-center gap-1 md:flex"
          variants={revealGroup(0.07, 0.15)}
          initial="hidden"
          animate="show"
        >
          {links.map((link) => {
            const active = activeId === link.href.slice(1);
            return (
              <motion.a
                key={link.href}
                href={link.href}
                variants={revealItem}
                className={`relative rounded-card px-3 py-1.5 text-sm transition-colors duration-200 ${
                  active ? "text-signal" : "text-muted hover:text-primary"
                }`}
              >
                {/* One pill shared across links — Framer slides it between
                    them instead of cross-fading two separate boxes. */}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-card bg-signal/10 ring-1 ring-inset ring-signal/25"
                    transition={SPRING.layout}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          className="hidden items-center gap-3 md:flex"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.2 }}
        >
          <ThemeToggle />
        </motion.div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-9 w-9 items-center justify-center text-primary"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={open ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2, ease: EASE.out }}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EASE.out }}
            className="overflow-hidden border-t hairline md:hidden"
          >
            <motion.div
              className="flex flex-col gap-4 px-6 py-4"
              variants={revealGroup(0.06)}
              initial="hidden"
              animate="show"
            >
              {links.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  variants={revealItem}
                  onClick={() => setOpen(false)}
                  className={`link-underline w-fit text-sm transition-colors ${
                    activeId === link.href.slice(1) ? "text-signal" : "text-muted"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
