"use client";

import Link from "next/link";
import { useRef } from "react";
import { FlowConfig } from "@/lib/data";
import { FlowBreadcrumbs } from "./flow-breadcrumbs";
import { useGsap } from "./use-gsap";

export function PageHeader({
  flow,
  description,
  primaryHref,
  secondaryHref,
}: {
  flow: FlowConfig;
  description: string;
  primaryHref?: string;
  secondaryHref?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGsap(() => {
    if (!ref.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = ref.current.querySelectorAll("[data-header-node]");

    if (prefersReducedMotion) {
      window.gsap.set(nodes, { clearProps: "all" });
      return;
    }

    window.gsap.fromTo(
      nodes,
      { opacity: 0, y: 34, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
      },
    );
  }, [flow.route]);

  return (
    <header ref={ref} className="section-gap">
      <div data-header-node>
        <FlowBreadcrumbs flow={flow} />
      </div>
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p data-header-node className="eyebrow mb-4">
            {flow.section}
          </p>
          <h1 data-header-node className="display-title">
            {flow.title}
          </h1>
          <p data-header-node className="mt-6 max-w-2xl text-[16px] leading-8 text-[var(--muted)]">
            {description}
          </p>
        </div>
        <div data-header-node className="md:col-span-4 md:flex md:justify-end">
          <div className="flex flex-col items-start gap-3 md:items-end">
            {primaryHref ? (
              <Link
                href={primaryHref}
                className="magnetic-button bg-[var(--foreground)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[var(--muted)]"
              >
                {flow.primaryCta}
              </Link>
            ) : null}
            {secondaryHref ? (
              <Link
                href={secondaryHref}
                className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
              >
                {flow.secondaryCta}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
