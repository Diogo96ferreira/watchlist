"use client";

import Link from "next/link";
import { useRef } from "react";
import { AppNavigation } from "@/components/watch/app-navigation";
import { RouteTransition } from "@/components/watch/route-transition";
import { useGsap } from "@/components/watch/use-gsap";
import { getRouteFlow, NavSection } from "@/lib/data";
import { cn } from "@/lib/utils";

function resolveSection(currentPath: string): NavSection {
  if (currentPath === "/") {
    return "Public";
  }
  if (currentPath.startsWith("/manuel-canelas-pais")) {
    return "Public";
  }
  return getRouteFlow(currentPath)?.section ?? "Vault";
}

function resolveHeaderLabel(currentPath: string, currentSection: NavSection) {
  if (currentPath === "/") {
    return "Community";
  }

  if (currentPath.startsWith("/manuel-canelas-pais") || /^\/[^/]+$/.test(currentPath)) {
    return "Collector Profile";
  }

  return currentSection;
}

export function Shell({
  children,
  currentPath,
  immersive = false,
}: {
  children: React.ReactNode;
  currentPath: string;
  immersive?: boolean;
}) {
  const currentSection = resolveSection(currentPath);
  const headerLabel = resolveHeaderLabel(currentPath, currentSection);
  const shellRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!shellRef.current || !headerRef.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      window.gsap.set([shellRef.current, headerRef.current, ambientRef.current], {
        clearProps: "all",
      });
      return;
    }

    window.gsap.fromTo(
      headerRef.current,
      { yPercent: -120, opacity: 0, filter: "blur(12px)" },
      {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      },
    );

    if (ambientRef.current) {
      window.gsap.to(ambientRef.current, {
        backgroundPosition: "100% 0%, 0% 100%, 50% 50%",
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    let lastY = window.scrollY;
    const onScroll = () => {
      const nextY = window.scrollY;
      const scrollingDown = nextY > lastY && nextY > 120;
      lastY = nextY;
      window.gsap.to(headerRef.current, {
        yPercent: scrollingDown ? -115 : 0,
        opacity: scrollingDown ? 0.92 : 1,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [currentPath, immersive]);

  return (
    <div ref={shellRef} className={cn("editorial-shell min-h-screen", immersive && "bg-[#f4f0ea]")}>
      <div ref={ambientRef} className="editorial-shell__ambient" />
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-[rgba(116,120,120,0.16)] bg-[rgba(250,249,247,0.82)] backdrop-blur-xl",
          immersive && "bg-[rgba(245,241,236,0.72)]",
        )}
      >
        <div className="page-frame flex items-center justify-between py-6">
          <Link href="/" className="font-serif text-2xl tracking-[0.18em]">
            WATCH LIST
          </Link>
          <AppNavigation currentSection={currentSection} />
          <div className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)] md:block">
            {headerLabel}
          </div>
        </div>
      </header>
      <RouteTransition>{children}</RouteTransition>
    </div>
  );
}
