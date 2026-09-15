"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SPRING } from "@/lib/motion";

/**
 * Fixed backdrop behind the whole page: two slowly drifting colour fields,
 * a blueprint grid that fades out below the fold, and a film grain pass.
 *
 * The drift itself is a CSS keyframe on the inner blob; the wrapper owns
 * the scroll parallax. Keeping them on separate elements avoids the two
 * fighting over the same `transform`.
 */
export default function AmbientBackground() {
  const { scrollYProgress } = useScroll();

  const signalY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0vh", "-22vh"]),
    SPRING.progress
  );
  const coolY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0vh", "30vh"]),
    SPRING.progress
  );
  const gridOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <div className="ambient-root" aria-hidden="true">
      <motion.div className="aurora-layer" style={{ y: signalY }}>
        <div className="aurora-blob aurora-blob--signal" />
      </motion.div>

      <motion.div className="aurora-layer" style={{ y: coolY }}>
        <div className="aurora-blob aurora-blob--cool" />
      </motion.div>

      <motion.div className="blueprint-grid" style={{ opacity: gridOpacity }} />

      <div className="crt-scanlines" />
      <div className="film-grain" />
    </div>
  );
}
