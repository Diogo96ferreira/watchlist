"use client";

import { useRef } from "react";
import { FlowConfig } from "@/lib/data";
import { useGsap } from "./use-gsap";

export function EditorialHero({
  flow,
  eyebrow,
  description,
  children,
}: {
  flow: FlowConfig;
  eyebrow?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGsap(() => {
    if (!ref.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = ref.current.querySelectorAll("[data-hero-node]");

    if (prefersReducedMotion) {
      window.gsap.set(nodes, { clearProps: "all" });
      return;
    }

    window.gsap.fromTo(
      nodes,
      { opacity: 0, y: 42, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.15,
        stagger: 0.12,
        ease: "power3.out",
      },
    );
  }, [flow.route]);

  return (
    <section ref={ref} className="section-gap">
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p data-hero-node className="eyebrow mb-4">
            {eyebrow ?? flow.section}
          </p>
          <h1 data-hero-node className="display-title">
            {flow.title}
          </h1>
          {description ? (
            <p data-hero-node className="mt-6 max-w-2xl text-[16px] leading-8 text-[var(--muted)]">
              {description}
            </p>
          ) : null}
        </div>
        {children ? <div data-hero-node className="md:col-span-4 md:flex md:justify-end">{children}</div> : null}
      </div>
    </section>
  );
}
