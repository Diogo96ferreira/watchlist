"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const INTRO_DURATION_MS = 3000;
const INTRO_EXIT_DURATION_MS = 1200;

export function SiteEntryLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    document.body.dataset.entryIntroState = "pending";

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, INTRO_DURATION_MS);

    const hideTimer = window.setTimeout(() => {
      document.body.dataset.entryIntroState = "ready";
      window.dispatchEvent(new CustomEvent("watchlist:intro-ready"));
      setIsVisible(false);
    }, INTRO_DURATION_MS + INTRO_EXIT_DURATION_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <div
        className={cn(
          "transition-opacity duration-700",
          isVisible ? "opacity-0" : "opacity-100",
        )}
      >
        {children}
      </div>
      {isVisible ? <EntryLoaderOverlay isExiting={isExiting} /> : null}
    </>
  );
}

function EntryLoaderOverlay({ isExiting }: { isExiting: boolean }) {
  return (
    <div
      className={cn(
        "entry-loader-overlay fixed inset-0 z-[140] flex items-center justify-center",
        isExiting && "entry-loader-overlay--exiting pointer-events-none",
      )}
    >
      <div className="entry-loader-overlay__dial-wash" />
      <div className="entry-loader-overlay__home-bloom" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <AudemarsEntryDial />
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.36em] text-white/70">
          Opening the vault
        </p>
        <p className="mt-4 max-w-md font-serif text-[1.9rem] italic tracking-[-0.03em] text-white">
          A final alignment, then the collection reveals itself.
        </p>
      </div>
    </div>
  );
}

function AudemarsEntryDial() {
  const frameRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLSpanElement>(null);
  const minuteRef = useRef<HTMLSpanElement>(null);
  const secondRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!frameRef.current || !window.matchMedia) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopOnly = window.matchMedia("(min-width: 1024px)").matches;
    if (prefersReducedMotion || !desktopOnly) {
      return;
    }

    const frame = frameRef.current;

    const onMove = (event: MouseEvent) => {
      const rect = frame.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      frame.style.transform = `rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(y * -7).toFixed(2)}deg) translate3d(${(x * 10).toFixed(2)}px, ${(y * 8).toFixed(2)}px, 0)`;
    };

    const onLeave = () => {
      frame.style.transform = "";
    };

    frame.addEventListener("mousemove", onMove);
    frame.addEventListener("mouseleave", onLeave);

    return () => {
      frame.removeEventListener("mousemove", onMove);
      frame.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!hourRef.current || !minuteRef.current || !secondRef.current) {
      return;
    }

    const secondNeedle = secondRef.current;
    const minuteNeedle = minuteRef.current;
    const hourNeedle = hourRef.current;
    const hourTranslate = "translate(0px, 0px)";
    const minuteTranslate = "translate(5px, 0px)";
    const secondTranslate = "translate(0px, 0px)";

    const applyClockState = () => {
      const date = new Date();
      const seconds = date.getSeconds();

      secondNeedle.style.transform = `rotate(${seconds * 6}deg) ${secondTranslate}`;
      minuteNeedle.style.transform = `rotate(91deg) ${minuteTranslate}`;
      hourNeedle.style.transform = `rotate(-21deg) ${hourTranslate}`;
    };

    applyClockState();

    const intervalId = window.setInterval(() => {
      const date = new Date();
      const seconds = date.getSeconds();
      secondNeedle.style.transform = `rotate(${seconds * 6}deg) ${secondTranslate}`;
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="entry-loader-ap">
      <div className="entry-loader-ap__halo" />
      <div ref={frameRef} className="entry-loader-ap__frame">
        <Image
          src="/images/loading/APRoyalOak.png"
          alt="Audemars Piguet Royal Oak"
          fill
          priority
          sizes="(max-width: 768px) 82vw, 27rem"
          className="entry-loader-ap__image"
        />
        <div className="entry-loader-ap__hands-layer">
          <div className="entry-loader-ap__hands">
            <span ref={hourRef} className="entry-loader-ap__hand entry-loader-ap__hand--hour hour_needle" />
            <span ref={minuteRef} className="entry-loader-ap__hand entry-loader-ap__hand--minute minute_needle" />
            <span ref={secondRef} className="entry-loader-ap__hand entry-loader-ap__hand--seconds second_needle" />
          </div>
        </div>
      </div>
    </div>
  );
}
