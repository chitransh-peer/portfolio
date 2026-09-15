"use client";

import { motion } from "framer-motion";
import { VIEWPORT, revealGroup, revealItem, popItem, drawLine } from "@/lib/motion";

/**
 * Eyebrow for a section: a signal dot, a mono label, and a hairline that
 * draws across the remaining width. Gives every section the same opening
 * beat so the page reads as one rhythm while scrolling.
 */
export default function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`flex items-center gap-3 ${className}`}
      variants={revealGroup(0.09)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <motion.span
        className="h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
        variants={popItem}
      />
      <motion.span
        className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-signal"
        variants={revealItem}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="hairline h-0 flex-1 origin-left border-t"
        variants={drawLine}
      />
    </motion.div>
  );
}
