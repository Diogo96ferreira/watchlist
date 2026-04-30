"use client";

import Link from "next/link";
import { useRef } from "react";
import { NavSection } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useGsap } from "./use-gsap";

const navItems: Array<{ href: string; label: NavSection }> = [
  { href: "/app/journal", label: "Journal" },
  { href: "/app/showroom", label: "Showroom" },
  { href: "/app/grails", label: "Grails" },
  { href: "/app/vault", label: "Vault" },
];

export function AppNavigation({
  currentSection,
}: {
  currentSection: NavSection;
}) {
  const navRef = useRef<HTMLElement>(null);

  useGsap(() => {
    if (!navRef.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = navRef.current.querySelectorAll("[data-nav-item]");

    if (prefersReducedMotion) {
      window.gsap.set(items, { clearProps: "all" });
      return;
    }

    window.gsap.fromTo(
      items,
      { opacity: 0, y: -18, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      },
    );

    const cleanups = Array.from(items).map((item) => {
      const onMove = (event: Event) => {
        const mouse = event as MouseEvent;
        const rect = (item as HTMLElement).getBoundingClientRect();
        const x = ((mouse.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((mouse.clientY - rect.top) / rect.height - 0.5) * 8;
        window.gsap.to(item, {
          x,
          y,
          duration: 0.55,
          ease: "power3.out",
        });
      };
      const onLeave = () => {
        window.gsap.to(item, {
          x: 0,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        });
      };

      item.addEventListener("mousemove", onMove);
      item.addEventListener("mouseleave", onLeave);
      return () => {
        item.removeEventListener("mousemove", onMove);
        item.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [currentSection]);

  return (
    <nav ref={navRef} className="hidden items-center gap-10 md:flex">
      {navItems.map((item) => {
        const active = currentSection === item.label;
        return (
          <Link
            key={item.href}
            href={item.href}
            data-nav-item
            className={cn(
              "nav-link relative text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)] transition hover:text-[var(--foreground)]",
              active && "text-[var(--foreground)]",
            )}
          >
            <span className="relative z-10">{item.label}</span>
            <span
              className={cn(
                "absolute -bottom-2 left-0 h-px w-full origin-left bg-[var(--foreground)] transition-transform duration-500",
                active ? "scale-x-100" : "scale-x-0",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
