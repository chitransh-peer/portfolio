"use client";

/**
 * Seamless infinite scroll.
 *
 * The track renders `items` twice and translates exactly -50%, which
 * lands the second copy precisely where the first began — so the loop
 * repeats with no visible seam and no JS driving it. Hovering pauses.
 *
 * Items are plain strings with a class name rather than a render prop:
 * this is a client component, and callers are server components that
 * cannot pass functions across the boundary.
 */
export default function Marquee({
  items,
  itemClassName = "",
  duration = 42,
  reverse = false,
  className = "",
}: {
  items: string[];
  itemClassName?: string;
  /** Seconds for one full pass. Longer reads calmer. */
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee ${className}`}>
      <div
        className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 gap-2 pr-2"
            /* The duplicate exists only to close the loop visually. */
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <span key={item} className={itemClassName}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
