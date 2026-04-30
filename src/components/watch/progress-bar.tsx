"use client";

import { useRef } from "react";
import { useGsap } from "./use-gsap";

export function ProgressBar({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!ref.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      ref.current.style.width = `${value}%`;
      return;
    }

    window.gsap.fromTo(
      ref.current,
      { width: "0%" },
      {
        width: `${value}%`,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
        },
      },
    );
  }, [value]);

  return (
    <div className="h-1.5 w-full overflow-hidden bg-[var(--surface-variant)]">
      <div ref={ref} className="h-full w-0 bg-[var(--foreground)]" />
    </div>
  );
}
