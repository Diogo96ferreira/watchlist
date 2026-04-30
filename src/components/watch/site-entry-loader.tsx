"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import WatchLoader from "./WatchLoader";

const INTRO_DURATION_MS = 2200;

export function SiteEntryLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const hasSeenIntro =
      window.sessionStorage.getItem("watch-list-entry-loader-seen") === "true";

    if (hasSeenIntro) {
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(false);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    if (!isVisible) {
      return;
    }

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, INTRO_DURATION_MS);

    const hideTimer = window.setTimeout(() => {
      window.sessionStorage.setItem("watch-list-entry-loader-seen", "true");
      setIsVisible(false);
    }, INTRO_DURATION_MS + 520);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, [isVisible]);

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
        "fixed inset-0 z-[140] flex items-center justify-center bg-[rgba(247,244,239,0.98)] transition duration-700",
        isExiting && "pointer-events-none scale-[1.015] opacity-0 blur-md",
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(233,222,207,0.62),transparent_30%),linear-gradient(180deg,#fbfaf7_0%,#f5f1eb_100%)]" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <WatchLoader className="entry-loader-watch" bg="/loader.png" />
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.36em] text-[var(--muted)]">
          Preparing the catalogue
        </p>
        <p className="mt-4 max-w-md font-serif text-[1.9rem] italic tracking-[-0.03em] text-[var(--foreground)]">
          One measured revolution, then the archive opens.
        </p>
      </div>
    </div>
  );
}
