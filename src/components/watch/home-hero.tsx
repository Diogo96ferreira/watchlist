"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { WatchEntry } from "@/lib/data";
import { useGsap } from "./use-gsap";
import { BLUR_DATA_URL } from "@/lib/image-utils";

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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_18%,rgba(255,255,255,0.62),transparent_22%),radial-gradient(circle_at_50%_56%,rgba(17,19,23,0.22),transparent_36%),linear-gradient(180deg,rgba(243,239,232,0.56),rgba(223,217,208,0.62))]" />
            <div className="absolute inset-x-[16%] top-[12%] text-center font-serif text-[clamp(4rem,8vw,8rem)] tracking-[-0.08em] text-[rgba(23,25,28,0.06)]">
              {watch.brand}
            </div>
            <div className="absolute inset-x-[16%] bottom-[10%] h-[22%] rounded-full bg-[rgba(10,12,16,0.18)] blur-3xl" />
            <div className="absolute inset-0 z-10">
              <Image
                src={watch.image}
                alt={`${watch.brand} ${watch.model}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                quality={80}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                className="object-contain p-8 scale-[1.02] md:translate-x-[2%] md:scale-[1.08] drop-shadow-[0_18px_36px_rgba(10,12,16,0.24)]"
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr] z-11">
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
