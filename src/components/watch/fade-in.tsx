"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useGsap } from "./use-gsap";

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!ref.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      window.gsap.set(ref.current, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    window.gsap.fromTo(
      ref.current,
      { opacity: 0, y: 42, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.15,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 86%",
        },
      },
    );
  }, [delay]);

  return <div ref={ref} className={cn("opacity-0", className)}>{children}</div>;
}
