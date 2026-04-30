"use client";

import Link from "next/link";
import { useRef } from "react";
import { WatchEntry } from "@/lib/data";
import { useGsap } from "./use-gsap";
import { WatchMedia } from "./watch-media";

export function GrailSpotlight({ watch }: { watch: WatchEntry }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!sectionRef.current || !mediaRef.current || !contentRef.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = mediaRef.current;
    const content = contentRef.current;
    const glow = glowRef.current;
    const textNodes = content.querySelectorAll("[data-grail-text]");

    if (prefersReducedMotion) {
      window.gsap.set([media, content, textNodes, glow], {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotation: 0,
        filter: "blur(0px)",
        clipPath: "inset(0% 0% 0% 0%)",
      });
      return;
    }

    const intro = window.gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 78%",
      },
    });

    intro
      .fromTo(
        media,
        {
          opacity: 0,
          scale: 1.14,
          rotation: -3,
          filter: "blur(18px)",
          clipPath: "inset(18% 12% 18% 12%)",
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.8,
          ease: "power3.out",
        },
      )
      .fromTo(
        glow,
        { opacity: 0, scale: 0.82 },
        { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" },
        0.12,
      )
      .fromTo(
        textNodes,
        { opacity: 0, y: 36, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          stagger: 0.12,
          ease: "power3.out",
        },
        0.36,
      );

    window.gsap.to(media, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    window.gsap.to(content, {
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.4,
      },
    });

    if (glow) {
      window.gsap.to(glow, {
        scale: 1.06,
        opacity: 0.78,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    const mm = window.matchMedia("(min-width: 1024px)");
    if (!mm.matches) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      if (!sectionRef.current || !glow) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      window.gsap.to(media, {
        x: x * 18,
        y: y * 16,
        rotateY: x * 4,
        rotateX: y * -4,
        transformPerspective: 1200,
        duration: 1.2,
        ease: "power3.out",
      });

      window.gsap.to(glow, {
        x: x * 42,
        y: y * 28,
        duration: 1.4,
        ease: "power3.out",
      });
    };

    const onLeave = () => {
      window.gsap.to(media, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 1.3,
        ease: "power3.out",
      });
      if (glow) {
        window.gsap.to(glow, {
          x: 0,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
        });
      }
    };

    const node = sectionRef.current;
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);

    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={sectionRef} className="grail-spotlight grid overflow-hidden border hairline md:grid-cols-12">
      <div className="relative min-h-[420px] md:col-span-7 md:min-h-[560px]">
        <div ref={glowRef} className="grail-spotlight__glow" />
        <div ref={mediaRef} className="grail-spotlight__media h-full w-full">
          <WatchMedia
            watch={watch}
            className="min-h-[420px] md:min-h-[560px]"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>
      </div>
      <div
        ref={contentRef}
        className="grail-spotlight__content flex flex-col justify-center bg-[rgba(250,249,247,0.92)] p-10 md:col-span-5 md:p-16"
      >
        <p data-grail-text className="eyebrow mb-6">
          My Grail
        </p>
        <h2 data-grail-text className="headline-title">
          {watch.model}
        </h2>
        <blockquote
          data-grail-text
          className="mt-8 border-l pl-6 font-serif text-2xl italic tracking-[-0.03em] text-[var(--muted)]"
        >
          &ldquo;{watch.grailQuote ?? "The piece that keeps time with restraint."}&rdquo;
        </blockquote>
        <p data-grail-text className="mt-8 max-w-md text-sm leading-8 text-[var(--muted)]">
          {watch.story}
        </p>
        <Link
          data-grail-text
          href={`/app/watch/${watch.id}`}
          className="mt-10 w-fit border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
        >
          View Documentation
        </Link>
      </div>
    </div>
  );
}
