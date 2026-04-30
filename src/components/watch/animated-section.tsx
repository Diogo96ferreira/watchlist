"use client";

import { FadeIn } from "./fade-in";

export function AnimatedSection({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeIn className={className} delay={delay}>
      {children}
    </FadeIn>
  );
}
