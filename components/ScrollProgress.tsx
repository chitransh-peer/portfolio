"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { SPRING } from "@/lib/motion";

/** Reading-position bar pinned to the very top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, SPRING.progress);

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-signal via-signal to-success"
    />
  );
}
