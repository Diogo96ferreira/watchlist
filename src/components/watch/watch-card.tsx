"use client";

import Link from "next/link";
import { useRef } from "react";
import { WatchEntry } from "@/lib/data";
import { StatusBadge } from "./status-badge";
import { WatchMedia } from "./watch-media";
import { useGsap } from "./use-gsap";

export function WatchCard({
  watch,
  href,
  priority,
}: {
  watch: WatchEntry;
  href?: string;
  priority?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!cardRef.current || !mediaRef.current || !metaRef.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      window.gsap.set([cardRef.current, mediaRef.current, metaRef.current], { clearProps: "all" });
      return;
    }

    window.gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 34, filter: "blur(12px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
        },
      },
    );

    const onMove = (event: MouseEvent) => {
      const rect = cardRef.current!.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      window.gsap.to(cardRef.current, {
        rotateY: x * 7,
        rotateX: y * -6,
        y: -10,
        z: 0,
        transformPerspective: 1200,
        duration: 0.7,
        ease: "power3.out",
      });

      window.gsap.to(mediaRef.current, {
        scale: 1.08,
        x: x * 16,
        y: y * 14,
        duration: 0.8,
        ease: "power3.out",
      });

      window.gsap.to(metaRef.current, {
        y: -4,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      window.gsap.to(cardRef.current, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      window.gsap.to(mediaRef.current, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
      });
      window.gsap.to(metaRef.current, {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    const node = cardRef.current;
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, [watch.id]);

  const content = (
    <div ref={cardRef} className="watch-card group cursor-pointer">
      <div className="relative mb-6 aspect-[4/5] overflow-hidden">
        <div className="absolute left-4 top-4 z-10 bg-white/75 px-3 py-1 backdrop-blur-md transition duration-700 group-hover:bg-white/92">
          <StatusBadge status={watch.status} />
        </div>
        <div ref={mediaRef} className="absolute inset-0">
          <WatchMedia watch={watch} priority={priority} className="h-full w-full" />
        </div>
        <div className="watch-card__sheen absolute inset-0" />
      </div>
      <div ref={metaRef} className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          {watch.brand}
        </p>
        <h3 className="font-serif text-[1.35rem] leading-tight tracking-[-0.03em]">
          {watch.model}
        </h3>
        <p className="text-sm text-[var(--muted)]">Ref. {watch.reference}</p>
        <p className="translate-y-2 pt-2 text-sm leading-7 text-[var(--muted)] opacity-0 transition duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          {watch.story}
        </p>
      </div>
      {priority ? <span className="sr-only">priority</span> : null}
    </div>
  );

  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
