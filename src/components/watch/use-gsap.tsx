"use client";

import { DependencyList, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    gsap?: typeof gsap;
  }
}

let registered = false;

export function useGsap(callback: () => void | (() => void), deps: DependencyList) {
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      window.gsap = gsap;
      registered = true;
    }

    const shouldWaitForIntro = document.body?.dataset.entryIntroState === "pending";
    let cleanup: void | (() => void);
    let context: gsap.Context | null = null;

    const runAnimation = () => {
      context = gsap.context(() => {
        cleanup = callback();
      });
    };

    if (shouldWaitForIntro) {
      const onIntroReady = () => {
        runAnimation();
      };

      window.addEventListener("watchlist:intro-ready", onIntroReady, { once: true });

      return () => {
        window.removeEventListener("watchlist:intro-ready", onIntroReady);
        cleanup?.();
        context?.revert();
      };
    }

    runAnimation();

    return () => {
      cleanup?.();
      context?.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
