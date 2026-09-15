"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { EASE, revealGroup, revealItem } from "@/lib/motion";
import Typewriter, { type Segment } from "./motion/Typewriter";
import Magnetic from "./motion/Magnetic";

const headline: Segment[] = [
  { text: "Powering digital growth through " },
  { text: "trusted technology", accent: true },
  { text: "." },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  /* Everything below the headline waits for the typing to land, rather
     than racing it on a guessed delay. */
  const [typed, setTyped] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="surface-page--sheer relative overflow-hidden"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center md:py-40"
      >
        <motion.p
          className="mb-6 flex items-center gap-2.5 text-sm text-muted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.out, delay: 0.05 }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="pulse-ring absolute inset-0 rounded-full text-success" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Women-owned • Princeton, NJ • Serving NJ, NY & CT
        </motion.p>

        <div className="relative">
          <div aria-hidden="true" className="hero-glow" />
          <Typewriter
            segments={headline}
            startDelay={550}
            speed={40}
            onDone={() => setTyped(true)}
            className="font-display text-4xl font-medium leading-[1.12] text-primary sm:text-5xl md:text-7xl"
          />
        </div>

        <motion.p
          className="mt-7 max-w-xl text-base leading-relaxed text-muted"
          initial={{ opacity: 0, y: 16 }}
          animate={typed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: EASE.out, delay: 0.1 }}
        >
          From strategy to execution, we help organizations across New Jersey,
          New York, and Connecticut build smarter, scale faster, and stay
          ahead. Here is a look at what we have been building.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          variants={revealGroup(0.1, 0.25)}
          initial="hidden"
          animate={typed ? "show" : "hidden"}
        >
          <motion.div variants={revealItem}>
            <Magnetic strength={0.4}>
              <a
                href="#projects"
                className="sheen group flex items-center gap-2 btn-accent rounded-card px-5 py-2.5 text-sm font-medium"
              >
                Explore our work
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={revealItem}>
            <Magnetic strength={0.25}>
              <a
                href="#about"
                className="hairline block rounded-card border px-5 py-2.5 text-sm font-medium text-primary transition-colors duration-300 hover:border-signal hover:text-signal"
              >
                About us
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Two nested elements so the scroll-linked fade and the one-shot
          entrance fade don't both try to own `opacity`. */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.a
          href="#about"
          aria-label="Scroll to the about section"
          className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-signal"
          initial={{ opacity: 0, y: -8 }}
          animate={typed ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: EASE.inOut }}
          >
            <ArrowDown size={14} />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
