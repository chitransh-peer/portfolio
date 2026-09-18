import SectionLabel from "./motion/SectionLabel";
import TextReveal from "./motion/TextReveal";
import CountUp from "./motion/CountUp";
import Marquee from "./motion/Marquee";
import { Reveal, RevealGroup, RevealItem } from "./motion/Reveal";

/* The numbers we lead with in conversations — kept here so the grid and
   the copy can't drift apart. */
const stats = [
  { value: "15+", label: "Years delivering" },
  { value: "60+", label: "Consultants & engineers" },
  { value: "3", label: "States served" },
  { value: "2010", label: "Founded" },
];

/* Where precision, compliance, and impact matter most. */
const industries = [
  "Public Sector — Local, State & Federal",
  "Financial Services",
  "Healthcare",
  "Pharmaceutical",
  "Retail",
  "Telecom",
  "Utilities",
  "Technology",
];

export default function About() {
  return (
    <section id="about" className="surface-page--sheer border-t hairline">
      <div className="mx-auto max-w-content px-6 py-20">
        <SectionLabel className="mb-8">About</SectionLabel>

        <div className="max-w-2xl">
          <TextReveal
            as="h2"
            text="A women-owned IT consulting firm, headquartered in Princeton, NJ."
            className="font-display text-2xl font-medium text-primary md:text-3xl"
          />
          <Reveal delay={0.25} y={16}>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              For over 15 years we&apos;ve helped public and private sector
              organizations across New Jersey, New York, and Connecticut
              modernize their systems, improve operational efficiency, and put
              solutions in place that scale with the business. Our team —
              software engineers, program and project managers, business
              analysts, designers, and quality analysts — works as an extension
              of yours.
            </p>
          </Reveal>
          <Reveal delay={0.35} y={16}>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Our mission is simple: help our clients build stronger, more
              innovative businesses by providing the technology professionals
              and software services they need. With delivery centers in the U.S.
              and India, we support clients across time zones.
            </p>
          </Reveal>
        </div>

        <RevealGroup
          stagger={0.08}
          delayChildren={0.15}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="surface-card hairline rounded-card border p-5">
              <CountUp
                value={stat.value}
                className="block font-display text-3xl font-medium text-signal"
              />
              <p className="mt-1 text-xs text-muted">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-16 max-w-2xl">
          <TextReveal
            as="h3"
            text="Industries we serve"
            className="font-display text-xl font-medium text-primary"
          />
          <Reveal delay={0.2} y={14}>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We bring focused expertise to sectors where precision, compliance,
              and impact matter most.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={16} className="mt-6">
          <Marquee
            items={industries}
            itemClassName="hairline block whitespace-nowrap rounded-card border px-3 py-1.5 font-mono text-xs text-primary transition-colors duration-300 hover:border-signal hover:text-signal"
          />
        </Reveal>
      </div>
    </section>
  );
}
