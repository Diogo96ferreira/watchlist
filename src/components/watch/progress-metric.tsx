"use client";

import { useRef } from "react";
import { useGsap } from "./use-gsap";

export function ProgressMetric({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);

  useGsap(() => {
    if (!window.gsap || !barRef.current || !valueRef.current) {
      return;
    }

    const barNode = barRef.current;
    const valueNode = valueRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      barNode.style.width = `${value}%`;
      valueNode.textContent = String(value);
      return;
    }

    const state = { value: 0 };
    const barTween = window.gsap.to(barNode, {
      width: `${value}%`,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: barNode, start: "top 90%" },
    });
    const valueTween = window.gsap.to(state, {
      value,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: { trigger: barNode, start: "top 90%" },
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = `${Math.round(state.value)}`;
        }
      },
    });

    return () => {
      barTween.kill();
      valueTween.kill();
      barNode.style.width = `${value}%`;
      valueNode.textContent = String(value);
    };
  }, [value]);

  return (
    <div className="editorial-card p-8">
      <div className="mb-8 flex items-start justify-between gap-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          {label}
        </span>
        <span ref={valueRef} className="font-serif text-3xl tracking-[-0.04em]">
          {value}
        </span>
      </div>
      <div className="h-px w-full bg-[var(--surface-variant)]">
        <div ref={barRef} className="h-px w-0 bg-[var(--foreground)]" />
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{note}</p>
    </div>
  );
}
