"use client";

import { useRef } from "react";
import { useGsap } from "./use-gsap";

export function ScoreDisplay({ value }: { value: number }) {
  const valueRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!window.gsap || !valueRef.current) {
      return;
    }

    const valueNode = valueRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      valueNode.textContent = String(value);
      return;
    }

    const state = { value: 0 };
    const tween = window.gsap.to(state, {
      value,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: { trigger: valueNode, start: "top 88%" },
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.textContent = `${Math.round(state.value)}`;
        }
      },
    });

    return () => {
      tween.kill();
      valueNode.textContent = String(value);
    };
  }, [value]);

  return (
    <div className="relative flex h-80 w-80 items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-[var(--surface-variant)]" />
      <div className="absolute inset-4 rounded-full border-2 border-[var(--foreground)]/70" />
      <div className="text-center">
        <div ref={valueRef} className="font-serif text-[120px] leading-none tracking-[-0.08em]">
          {value}
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          Curated Score
        </div>
      </div>
    </div>
  );
}
