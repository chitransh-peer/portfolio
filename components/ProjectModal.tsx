"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";
import { EASE, SPRING, revealGroup, revealItem } from "@/lib/motion";
import StatusDot from "./StatusDot";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Lock background scroll, padding the body by the scrollbar width so the
     page underneath doesn't jump sideways as the bar disappears. */
  useEffect(() => {
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus();
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-8"
      initial={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0,0,0,0.65)",
      }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(0,0,0,0)" }}
      transition={{ duration: 0.35, ease: EASE.out }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} details`}
    >
      {/* The panel only fades and lifts — scaling it would visibly distort
          the shared thumbnail flying in from the grid. */}
      <motion.div
        className="surface-card hairline max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-card border"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={SPRING.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <motion.div layoutId={`thumb-${project.slug}`} className="absolute inset-0">
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover"
              unoptimized
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/70 to-transparent" />

          <motion.button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close details"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-card bg-graphite/80 text-paper backdrop-blur-sm"
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={SPRING.pointer}
          >
            <X size={16} />
          </motion.button>
        </div>

        <motion.div
          className="p-6"
          variants={revealGroup(0.07, 0.18)}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={revealItem} className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-medium text-primary">{project.name}</h3>
            <StatusDot status={project.status} />
          </motion.div>

          <motion.p
            variants={revealItem}
            className="mt-3 text-sm leading-relaxed text-muted"
          >
            {project.description}
          </motion.p>

          {project.features && project.features.length > 0 && (
            <motion.div variants={revealItem} className="mt-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Key features
              </p>
              <motion.ul
                className="mt-2 space-y-1.5 text-sm text-primary"
                variants={revealGroup(0.06)}
              >
                {project.features.map((f) => (
                  <motion.li key={f} variants={revealItem} className="flex gap-2">
                    <span className="text-signal">–</span>
                    {f}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}

          <motion.div
            variants={revealItem}
            className="mt-5 flex flex-wrap gap-1.5 font-mono text-[11px]"
          >
            {project.stack.map((tech) => (
              <span key={tech} className="hairline rounded border px-1.5 py-0.5 text-muted">
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div variants={revealItem} className="mt-6 flex gap-3 border-t hairline pt-5">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hairline flex items-center gap-2 rounded-card border px-4 py-2 text-sm text-primary transition-colors hover:border-signal hover:text-signal"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.pointer}
              >
                <Github size={16} />
                Repository
              </motion.a>
            )}
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="sheen flex items-center gap-2 btn-accent rounded-card px-4 py-2 text-sm font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.pointer}
              >
                <ExternalLink size={16} />
                Live demo
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
