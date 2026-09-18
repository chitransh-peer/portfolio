"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Below this width the native scroll feels better than a driven one. */
const MIN_WIDTH = 900;
/** Sticky header height — anchor targets stop clear of it. */
const HEADER_OFFSET = -70;

/**
 * Smooth scrolling on desktop pointers only.
 *
 * Lenis moves the real scroll position rather than transforming a
 * wrapper, so Framer's `useScroll` and every IntersectionObserver on the
 * page keep working untouched.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || coarse || window.innerWidth < MIN_WIDTH) return;

    const lenis = new Lenis({ duration: 1.05 });
    document.documentElement.classList.add("lenis");

    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });

    /* In-page links have to go through Lenis — a native jump would leave
       its internal position out of sync with the document's. */
    function handleAnchorClick(e: MouseEvent) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

      const anchor = (e.target as HTMLElement).closest?.("a");
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || !href.startsWith("#") || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET });
      history.pushState(null, "", href);
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return null;
}
