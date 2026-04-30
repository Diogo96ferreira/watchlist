"use client";

import Link from "next/link";
import { useRef } from "react";
import { WatchEntry } from "@/lib/data";
import { useGsap } from "./use-gsap";
import { WatchMedia } from "./watch-media";

export function HomeHero({ watch }: { watch: WatchEntry }) {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGsap(() => {
    if (!sectionRef.current || !mediaRef.current || !textRef.current || !window.gsap) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const textNodes = textRef.current.querySelectorAll("[data-home-hero]");

    if (prefersReducedMotion) {
      window.gsap.set([mediaRef.current, textNodes], {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
      });
      return;
    }

    const timeline = window.gsap.timeline();
    timeline
      .fromTo(
        mediaRef.current,
        {
          opacity: 0,
          scale: 1.08,
          y: 24,
          filter: "blur(18px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power3.out",
        },
      )
      .fromTo(
        textNodes,
        {
          opacity: 0,
          y: 34,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        },
        0.18,
      );

    window.gsap.to(mediaRef.current, {
      yPercent: -7,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });
  }, [watch.id]);

  return (
    <section ref={sectionRef} className="section-gap pt-28 md:pt-36">
      <div className="grid gap-10 md:grid-cols-12 md:items-center">
        <div ref={textRef} className="md:col-span-5">
          <p data-home-hero className="eyebrow mb-6">
            Curated Watch Worlds
          </p>
          <h1 data-home-hero className="display-title balanced-text">
            Your watch collection, beautifully presented.
          </h1>
          <p data-home-hero className="mt-8 max-w-xl text-[16px] leading-8 text-[var(--muted)]">
            Build your vault. Share your showroom. Discover collectors with refined
            taste.
          </p>
          <div data-home-hero className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <Link
              href="/app/vault"
              className="magnetic-button bg-[var(--foreground)] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white"
            >
              Create your vault
            </Link>
            <Link
              href="/manuel-canelas-pais"
              className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
            >
              Explore collections
            </Link>
          </div>
        </div>
        <div className="md:col-span-7">
          <div
            ref={mediaRef}
            className="editorial-card relative min-h-[34rem] overflow-hidden p-6 md:min-h-[44rem]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_20%,rgba(255,255,255,0.72),transparent_26%),radial-gradient(circle_at_48%_58%,rgba(18,20,24,0.14),transparent_34%),linear-gradient(180deg,rgba(245,242,237,0.72),rgba(228,223,214,0.38))]" />
            <div className="absolute inset-x-[18%] bottom-[10%] h-[20%] rounded-full bg-[rgba(22,24,28,0.16)] blur-[64px]" />
            <WatchMedia
              watch={watch}
              className="relative h-full w-full"
              imageClassName="scale-[1.08] md:translate-x-[3%] md:scale-[1.18] drop-shadow-[0_36px_76px_rgba(15,16,18,0.24)]"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
            <div className="absolute bottom-6 left-6 right-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
              <div className="editorial-card bg-[rgba(250,249,247,0.78)] p-5 backdrop-blur-xl">
                <p className="eyebrow mb-2">Featured Reference</p>
                <p className="font-serif text-[1.7rem] leading-none tracking-[-0.04em]">
                  {watch.brand} {watch.model}
                </p>
                <p className="mt-2 text-sm text-[var(--muted)]">Ref. {watch.reference}</p>
              </div>
              <div className="hidden items-end justify-end md:flex">
                <p className="max-w-[14rem] text-right text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Presented like a private catalogue, built to make every collection feel intentional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
