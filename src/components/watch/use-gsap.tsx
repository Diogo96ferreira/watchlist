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

    let cleanup: void | (() => void);
    const context = gsap.context(() => {
      cleanup = callback();
    });

    return () => {
      cleanup?.();
      context.revert();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
