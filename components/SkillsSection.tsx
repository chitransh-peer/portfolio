"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { SPRING, VIEWPORT, revealGroup, revealItem, popItem } from "@/lib/motion";
import SectionLabel from "./motion/SectionLabel";
import TextReveal from "./motion/TextReveal";

export default function SkillsSection() {
  return (
    <section id="skills" className="surface-page--sheer border-t hairline">
      <div className="mx-auto max-w-content px-6 py-20">
        <SectionLabel className="mb-8">Services</SectionLabel>

        <TextReveal
          as="h2"
          text="End-to-end IT solutions, built to move with your business"
          className="font-display text-2xl font-medium text-primary md:text-3xl"
        />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, groupIndex) => (
            <motion.div
              key={group.group}
              variants={revealGroup(0.045, groupIndex * 0.08)}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
            >
              <motion.p
                variants={revealItem}
                className="text-xs font-medium uppercase tracking-wide text-muted"
              >
                {group.group}
              </motion.p>

              {/* Each chip pops in on its own beat, so a dense group reads
                  as a cascade rather than a wall appearing at once. */}
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <motion.span
                    key={item}
                    variants={popItem}
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={SPRING.pointer}
                    className="hairline cursor-default rounded-card border px-3 py-1.5 font-mono text-xs text-primary transition-colors duration-300 hover:border-signal hover:text-signal"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
