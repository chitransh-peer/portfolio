"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/types";
import { SPRING } from "@/lib/motion";
import StatusDot from "./StatusDot";

const MAX_TILT = 6;

export default function ProjectCard({
  project,
  onViewDetails,
}: {
  project: Project;
  onViewDetails: (slug: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* Normalised pointer position within the card, -0.5 → 0.5 on each axis. */
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), SPRING.pointer);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), SPRING.pointer);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    px.set(nx - 0.5);
    py.set(ny - 0.5);

    /* Spotlight position goes straight to CSS custom properties so moving
       the cursor never triggers a React render. */
    ref.current.style.setProperty("--mx", `${nx * 100}%`);
    ref.current.style.setProperty("--my", `${ny * 100}%`);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerCancel={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ y: -6 }}
      transition={SPRING.pointer}
      className="spotlight card-lift surface-card hairline group relative flex h-full flex-col overflow-hidden rounded-card border hover:border-signal"
    >
      <div className="relative h-40 w-full overflow-hidden">
        {/* Shared element: this same layoutId appears in the modal, so the
            thumbnail flies into place instead of the modal popping open. */}
        <motion.div layoutId={`thumb-${project.slug}`} className="absolute inset-0">
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            unoptimized
          />
        </motion.div>

        {/* Scrim deepens the type contrast and lifts slightly on hover. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
      </div>

      <div className="relative z-[2] flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-base font-medium text-primary">{project.name}</h3>
          <StatusDot status={project.status} />
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="hairline rounded border px-1.5 py-0.5 text-muted transition-colors duration-300 group-hover:border-signal/40 group-hover:text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t hairline pt-4">
          <div className="flex gap-3">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} source on GitHub`}
                className="text-muted transition-colors hover:text-signal"
                whileHover={{ y: -2, scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                transition={SPRING.pointer}
              >
                <Github size={16} />
              </motion.a>
            )}
            {project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} live demo`}
                className="text-muted transition-colors hover:text-signal"
                whileHover={{ y: -2, scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                transition={SPRING.pointer}
              >
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>

          <button
            onClick={() => onViewDetails(project.slug)}
            className="flex items-center gap-1 text-xs font-medium text-signal"
          >
            <span className="link-underline">View details</span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
