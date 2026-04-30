"use client";

import { useRef } from "react";
import { useGsap } from "./use-gsap";

export function StatCard({ label, value }: { label: string; value: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useGsap(() => {
    if (!cardRef.current || !valueRef.current || !window.gsap) {
      return;
    }

    const numericValue = Number(value);
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || Number.isNaN(numericValue)) {
      valueRef.current.textContent = value;
      return;
    }

    const state = { count: 0 };
    const card = cardRef.current;
    const valueNode = valueRef.current;

    const revealTween = window.gsap.fromTo(
      card,
      { opacity: 0, y: 28, filter: "blur(10px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
      },
    );

    const countTween = window.gsap.to(state, {
      count: numericValue,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",
      },
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = `${Math.round(state.count)}`;
        }
      },
    });

    return () => {
      revealTween.kill();
      countTween.kill();
      valueNode.textContent = value;
    };
  }, [value]);

  return (
    <div ref={cardRef} className="border hairline p-8 opacity-0">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
        {label}
      </p>
      <span ref={valueRef} className="serif-stat">
        {value}
      </span>
    </div>
  );
}
