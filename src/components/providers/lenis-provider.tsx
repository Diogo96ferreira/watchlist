"use client";

import { ReactLenis } from "lenis/react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.3,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.85,
      }}
    >
      {children}
    </ReactLenis>
  );
}
