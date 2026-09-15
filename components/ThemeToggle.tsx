"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { EASE, SPRING } from "@/lib/motion";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    setIsLight(document.body.classList.contains("light"));
  }, []);

  function applyTheme(light: boolean) {
    document.body.classList.toggle("light", light);
    window.localStorage.setItem("theme", light ? "light" : "dark");
  }

  function toggle() {
    const next = !isLight;
    const doc = document as ViewTransitionDocument;

    if (reduced || !doc.startViewTransition || !buttonRef.current) {
      setIsLight(next);
      applyTheme(next);
      return;
    }

    /* The wipe expands from the button to whichever viewport corner is
       furthest away, so it always finishes covering the page. */
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      // flushSync so the DOM is fully updated before the snapshot is taken.
      flushSync(() => setIsLight(next));
      applyTheme(next);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 620,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={SPRING.pointer}
      className="surface-card hairline relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-card border text-primary transition-colors hover:border-signal hover:text-signal"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={isLight ? "moon" : "sun"}
          initial={{ y: 14, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.28, ease: EASE.out }}
          className="flex items-center justify-center"
        >
          {isLight ? <Moon size={16} /> : <Sun size={16} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
