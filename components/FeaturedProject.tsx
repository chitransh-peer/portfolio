"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { EASE, VIEWPORT, revealGroup, revealItem, popItem } from "@/lib/motion";
import StatusDot from "./StatusDot";
import SectionLabel from "./motion/SectionLabel";
import Magnetic from "./motion/Magnetic";

export default function FeaturedProject() {
  const project = projects.find((p) => p.featured);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* Image drifts against the page so the frame feels like a window. The
     inner element is oversized to keep the frame filled at both extremes. */
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  if (!project) return null;

  return (
    <section className="surface-page--sheer border-t hairline">
      <div className="mx-auto max-w-content px-6 py-20">
        <SectionLabel className="mb-8">Featured</SectionLabel>

        <div ref={ref} className="mt-6 grid gap-10 md:grid-cols-2 md:items-center">
          <motion.div
            className="relative h-64 overflow-hidden rounded-card md:h-80"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={VIEWPORT}
            transition={{ duration: 1.05, ease: EASE.out }}
          >
            <motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
              <Image
                src={project.thumbnail}
                alt={project.name}
                fill
                className="object-cover"
                unoptimized
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-graphite/50 to-transparent" />
          </motion.div>

          <motion.div
            variants={revealGroup(0.08, 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <motion.div variants={revealItem} className="flex items-center gap-3">
              <h3 className="font-display text-2xl font-medium text-primary">{project.name}</h3>
              <StatusDot status={project.status} />
            </motion.div>

            <motion.p
              variants={revealItem}
              className="mt-4 text-sm leading-relaxed text-muted"
            >
              {project.description}
            </motion.p>

            {project.achievements && (
              <motion.ul
                className="mt-5 space-y-1.5 text-sm text-primary"
                variants={revealGroup(0.08)}
              >
                {project.achievements.map((a) => (
                  <motion.li key={a} variants={revealItem} className="flex gap-2">
                    <span className="text-signal">–</span>
                    {a}
                  </motion.li>
                ))}
              </motion.ul>
            )}

            <motion.div
              className="mt-5 flex flex-wrap gap-1.5 font-mono text-[11px]"
              variants={revealGroup(0.04)}
            >
              {project.stack.map((tech) => (
                <motion.span
                  key={tech}
                  variants={popItem}
                  className="hairline rounded border px-1.5 py-0.5 text-muted"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={revealItem} className="mt-6 flex flex-wrap gap-3">
              {project.githubUrl && (
                <Magnetic strength={0.25}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hairline flex items-center gap-2 rounded-card border px-4 py-2 text-sm text-primary transition-colors duration-300 hover:border-signal hover:text-signal"
                  >
                    <Github size={16} />
                    Repository
                  </a>
                </Magnetic>
              )}
              {project.demoUrl && (
                <Magnetic strength={0.35}>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="sheen group flex items-center gap-2 btn-accent rounded-card px-4 py-2 text-sm font-medium"
                  >
                    <ExternalLink
                      size={16}
                      className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                    Live demo
                  </a>
                </Magnetic>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
