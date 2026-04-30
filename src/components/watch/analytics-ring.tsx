"use client";

import { useRef } from "react";
import { useGsap } from "@/components/watch/use-gsap";

export function AnalyticsRing({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const circleRef = useRef<SVGCircleElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const radius = 84;
  const circumference = 2 * Math.PI * radius;

  useGsap(
    () => {
      if (!circleRef.current || !valueRef.current) {
        return;
      }

      const element = valueRef.current;
      const target = { value: 0 };
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        element.textContent = String(value);
        circleRef.current.style.strokeDashoffset = `${circumference * 0.28}`;
        return;
      }

      const { gsap } = window;
      if (!gsap) {
        return;
      }

      gsap.fromTo(
        circleRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: circumference * 0.28,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: circleRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.to(target, {
        value,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
        },
        onUpdate: () => {
          element.textContent = `${Math.round(target.value)}`;
        },
      });
    },
    [circumference, value],
  );

  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 220 220">
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="rgba(116,120,120,0.16)"
          strokeWidth="1"
        />
        <circle
          ref={circleRef}
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="rgba(26,28,27,0.9)"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
      <div className="editorial-card flex h-[8.5rem] w-[8.5rem] flex-col items-center justify-center rounded-full bg-white">
        <span ref={valueRef} className="font-serif text-5xl tracking-[-0.05em]">
          0
        </span>
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          {suffix}
        </span>
      </div>
    </div>
  );
}
