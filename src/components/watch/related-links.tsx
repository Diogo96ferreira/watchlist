"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGsap } from "./use-gsap";

export function RelatedLinks({
  title = "Continue Through Watch List",
  links,
}: {
  title?: string;
  links: Array<{ href: string; label: string; blurb: string }>;
}) {
  const ref = useRef<HTMLElement>(null);

  useGsap(() => {
    if (!ref.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = ref.current.querySelectorAll("[data-related-card]");

    if (prefersReducedMotion) {
      window.gsap.set(cards, { clearProps: "all" });
      return;
    }

    window.gsap.fromTo(
      cards,
      { opacity: 0, y: 34, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 86%",
        },
      },
    );
  }, [links.length]);

  return (
    <section ref={ref} className="mt-20 border-t pt-10">
      <p className="eyebrow mb-8">{title}</p>
      <div className="grid gap-6 md:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            data-related-card
            className="related-card editorial-card p-8 transition"
          >
            <p className="font-serif text-2xl tracking-[-0.03em]">{link.label}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{link.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
