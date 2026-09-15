import type { Variants, Transition } from "framer-motion";

/**
 * Easing curves shared between CSS (globals.css) and Framer so that a
 * CSS hover transition and a JS-driven reveal feel like the same system.
 */
export const EASE = {
  /** Fast departure, long graceful settle. The default for reveals. */
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  outQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  /** Symmetric and mechanical — for layout shifts and wipes. */
  inOut: [0.83, 0, 0.17, 1] as [number, number, number, number],
  /** Slight overshoot. Chips, badges, small affordances only. */
  overshoot: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
};

/** Springs tuned to feel precise rather than bouncy. */
export const SPRING = {
  /** Pointer tracking: tilt, magnetic pull, spotlight. */
  pointer: { stiffness: 260, damping: 26, mass: 0.4 } as Transition,
  /** Layout re-flow when the project grid filters. */
  layout: { type: "spring", stiffness: 340, damping: 38, mass: 0.9 } as Transition,
  /** Modal enter. */
  modal: { type: "spring", stiffness: 300, damping: 32, mass: 0.9 } as Transition,
  /** Scroll progress bar — heavily damped so it never jitters. */
  progress: { stiffness: 140, damping: 28, restDelta: 0.001 } as Transition,
};

/** Viewport config used by every scroll reveal, so thresholds stay consistent. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * Container that only orchestrates timing — it has no visual state of its
 * own, it just staggers whatever children use `revealItem`.
 */
export const revealGroup = (stagger = 0.075, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE.out },
  },
};

/** Chips and badges: scale in with a touch of overshoot. */
export const popItem: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: EASE.overshoot },
  },
};

/**
 * Images reveal by wiping their clip open rather than fading, which reads
 * as more deliberate against the editorial layout.
 */
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1, ease: EASE.out },
  },
};

/** A hairline rule that draws out from its left edge. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.9, ease: EASE.out },
  },
};
