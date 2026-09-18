"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { FolderX } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCategory } from "@/lib/types";
import { EASE, SPRING, VIEWPORT } from "@/lib/motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SectionLabel from "./motion/SectionLabel";
import TextReveal from "./motion/TextReveal";
import { Reveal } from "./motion/Reveal";

const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Platforms", value: "web" },
  { label: "Websites", value: "website" },
  { label: "AI / ML", value: "ai-ml" },
  { label: "Mobile", value: "mobile" },
  { label: "Other", value: "other" },
];

/* `show` is a function variant so each card can stagger off its grid index
   — both on first scroll-in and whenever a filter admits new cards. */
const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE.out, delay: Math.min(i, 5) * 0.06 },
  }),
  exit: {
    opacity: 0,
    scale: 0.94,
    y: -14,
    transition: { duration: 0.26, ease: EASE.outQuart },
  },
};

export default function ProjectsSection() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  const openProject = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <section id="projects" className="surface-page--sheer border-t hairline">
      <div className="mx-auto max-w-content px-6 py-20">
        <SectionLabel className="mb-8">Work</SectionLabel>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <TextReveal
              as="h2"
              text="What we're building"
              className="font-display text-2xl font-medium text-primary md:text-3xl"
            />
            <Reveal delay={0.25} y={12}>
              <p className="mt-2 text-sm text-muted">
                {/* Swapping the count on its own key makes the number roll
                    rather than blink when a filter changes the total. */}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={visible.length}
                    className="inline-block tabular-nums text-primary"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE.out }}
                  >
                    {visible.length}
                  </motion.span>
                </AnimatePresence>{" "}
                projects, filterable by category.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} y={12}>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const isActive = active === f.value;
                return (
                  <button
                    key={f.value}
                    onClick={() => setActive(f.value)}
                    aria-pressed={isActive}
                    className={`relative rounded-card px-3 py-1.5 text-xs font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-on-signal"
                        : "hairline border text-muted hover:border-signal hover:text-signal"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        className="btn-accent absolute inset-0 rounded-card"
                        transition={SPRING.layout}
                      />
                    )}
                    <span className="relative z-10">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* popLayout pulls exiting cards out of flow immediately, so the
              survivors slide into their new slots instead of waiting. */}
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="show"
                exit="exit"
                viewport={VIEWPORT}
                transition={{ layout: SPRING.layout }}
              >
                <ProjectCard project={project} onViewDetails={setOpenSlug} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {visible.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASE.out }}
              className="surface-card hairline mt-10 flex flex-col items-center gap-3 rounded-card border px-6 py-16 text-center"
            >
              <motion.div
                animate={{ rotate: [0, -8, 8, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: EASE.inOut }}
              >
                <FolderX className="text-muted" size={28} />
              </motion.div>
              <p className="text-sm text-muted">No projects in this category yet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {openProject && (
          <ProjectModal project={openProject} onClose={() => setOpenSlug(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
