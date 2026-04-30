"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGsap } from "./use-gsap";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGsap(() => {
    if (!ref.current || !veilRef.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      window.gsap.set([ref.current, veilRef.current], { clearProps: "all" });
      return;
    }

    const timeline = window.gsap.timeline();

    timeline
      .set(veilRef.current, {
        opacity: 1,
        clipPath: "inset(0% 0% 100% 0%)",
      })
      .fromTo(
        ref.current,
        {
          opacity: 0,
          filter: "blur(22px)",
          scale: 0.972,
          y: 36,
          transformOrigin: "50% 0%",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          y: 0,
          duration: 1.25,
          ease: "power3.out",
        },
      )
      .to(
        veilRef.current,
        {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 1.1,
          ease: "power4.inOut",
        },
        0,
      )
      .to(
        veilRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power1.out",
        },
        0.9,
      );
  }, [pathname]);

  return (
    <>
      <div ref={veilRef} className="route-veil" />
      <div ref={ref}>{children}</div>
    </>
  );
}
