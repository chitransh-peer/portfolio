"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/** Splits "60+" into 60 and "+", or "2010" into 2010 and "". */
function parse(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { target: Number(match[1]), suffix: match[2] };
}

/**
 * Counts a stat up from zero the first time it scrolls into view.
 *
 * Takes the display string rather than a number so the source of truth
 * stays readable ("60+", "15+") and non-numeric values pass through
 * untouched instead of needing a special case at the call site.
 *
 * The imperative `animate()` bypasses MotionConfig, so reduced motion is
 * checked explicitly here rather than inherited.
 */
export default function CountUp({
  value,
  duration = 1.5,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const parsed = parse(value);

  const [display, setDisplay] = useState(parsed ? `0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed || !inView) return;

    if (reduced) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, parsed.target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${Math.round(v)}${parsed.suffix}`),
    });

    return () => controls.stop();
    // `parsed` is derived from `value`; tracking the string avoids a new
    // object identity retriggering the animation on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, reduced]);

  return (
    /* Tabular figures stop the layout shifting as digit widths change. */
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {parsed ? display : value}
    </span>
  );
}
