"use client";

import { MotionConfig } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * `reducedMotion="user"` makes Framer drop transform and layout animations
 * for anyone with the OS preference set, while keeping opacity changes so
 * content still signals that it arrived. CSS-only motion is handled by the
 * media query in globals.css.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: EASE.out, duration: 0.6 }}>
      {children}
    </MotionConfig>
  );
}
