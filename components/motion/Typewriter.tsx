"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export type Segment = {
  text: string;
  /** Renders in the signal colour with a soft glow. */
  accent?: boolean;
};

/**
 * Types `segments` out one character at a time, carrying accent styling
 * across the segment boundaries.
 *
 * The finished text is also rendered invisibly underneath to reserve its
 * final box, so the paragraph and buttons below don't get pushed down each
 * time the headline wraps onto a new line.
 */
export default function Typewriter({
  segments,
  speed = 42,
  startDelay = 0,
  className,
  onDone,
}: {
  segments: Segment[];
  /** Base milliseconds per character. */
  speed?: number;
  startDelay?: number;
  className?: string;
  onDone?: () => void;
}) {
  const full = segments.map((s) => s.text).join("");
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (reduced) {
      setCount(full.length);
      onDoneRef.current?.();
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let i = 0;

    /* Uniform timing reads like a machine. Pausing on punctuation and
       jittering everything else makes it read like someone typing. */
    function delayAfter(char: string) {
      if (char === ".") return speed * 9;
      if (char === "," ) return speed * 6;
      if (char === " ") return speed * 1.4;
      return speed * (0.7 + Math.random() * 0.6);
    }

    function tick() {
      i += 1;
      setCount(i);

      if (i >= full.length) {
        onDoneRef.current?.();
        return;
      }
      timer = setTimeout(tick, delayAfter(full[i - 1]));
    }

    setCount(0);
    timer = setTimeout(tick, startDelay);

    return () => clearTimeout(timer);
  }, [full, speed, startDelay, reduced]);

  let remaining = count;
  const typed = segments.map((segment, index) => {
    const take = Math.max(0, Math.min(segment.text.length, remaining));
    remaining -= segment.text.length;
    if (take === 0) return null;

    return (
      <span key={index} className={segment.accent ? "accent-glow" : undefined}>
        {segment.text.slice(0, take)}
      </span>
    );
  });

  const finished = count >= full.length;

  return (
    <h1 className={`relative grid ${className ?? ""}`}>
      {/* Screen readers get the finished line, not a half-typed one. */}
      <span className="sr-only">{full}</span>

      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {full}
      </span>

      <span aria-hidden="true" className="col-start-1 row-start-1">
        {typed}
        <span className="type-caret" />
      </span>

      {/* Chromatic tear. Held back until the line has landed, so the
          glitch never competes with the typing for attention. The copies
          are deliberately unstyled — each layer is a single colour. */}
      {finished && (
        <>
          <span
            aria-hidden="true"
            className="glitch-layer glitch-layer--a col-start-1 row-start-1"
          >
            {full}
          </span>
          <span
            aria-hidden="true"
            className="glitch-layer glitch-layer--b col-start-1 row-start-1"
          >
            {full}
          </span>
        </>
      )}
    </h1>
  );
}
