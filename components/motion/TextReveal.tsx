"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

/**
 * Splits text into words and slides each one up out of its own clipping
 * box, so the line assembles itself rather than fading in as a block.
 *
 * A single `useInView` on the wrapper drives every word — relying on
 * per-word viewport detection makes the stagger fire unevenly when the
 * heading straddles the fold.
 */
export default function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  duration = 0.9,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: Tag;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const words = text.split(" ");

  const Wrapper = as as React.ElementType;

  return (
    <Wrapper ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          /* Padding + negative margin keeps descenders from being clipped
             by the overflow mask without changing the layout box. */
          className={`inline-block overflow-hidden pb-[0.14em] align-bottom -mb-[0.14em] ${
            i < words.length - 1 ? "mr-[0.26em]" : ""
          }`}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 0 }}
            transition={{ duration, ease: EASE.out, delay: delay + i * stagger }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Wrapper>
  );
}
