"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, VIEWPORT, revealGroup, revealItem } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  /** Travel distance in px. Negative pulls down from above. */
  y?: number;
  x?: number;
  /** Adds a blur-to-sharp pass. Costly to composite — use on headings/media only. */
  blur?: boolean;
  duration?: number;
  className?: string;
};

/** Single element that animates in the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  x = 0,
  blur = false,
  duration = 0.7,
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, ...(blur ? { filter: "blur(8px)" } : null) }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        ...(blur ? { filter: "blur(0px)" } : null),
      }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE.out, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a list so its children cascade instead of arriving together.
 * Children must be `RevealItem` (or any motion element using the same
 * "hidden"/"show" variant names).
 */
export function RevealGroup({
  children,
  stagger = 0.075,
  delayChildren = 0,
  className,
}: {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={revealGroup(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={revealItem}>
      {children}
    </motion.div>
  );
}
