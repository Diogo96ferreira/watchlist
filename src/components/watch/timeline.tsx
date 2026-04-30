import Link from "next/link";
import { TimelineEvent, getWatchById } from "@/lib/data";
import { AnimatedSection } from "./animated-section";
import { WatchMedia } from "./watch-media";

export function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-5 top-0 hidden w-px bg-[var(--outline)] md:left-1/2 md:block" />
      <div className="space-y-24">
        {events.map((event, index) => {
          const watch = getWatchById(event.watchId);
          const reverse = index % 2 === 1;

          return (
            <AnimatedSection
              key={event.id}
              className="relative grid items-center gap-12 md:grid-cols-2"
              delay={0.06 * index}
            >
              <div className={reverse ? "md:order-2" : ""}>
                <span className="eyebrow mb-4 block">{event.year}</span>
                <h3 className="headline-title text-[2rem]">{watch?.model}</h3>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  {event.label}
                </p>
                <p className="mt-6 max-w-md text-[15px] leading-8 text-[var(--muted)]">
                  {event.note}
                </p>
                <Link
                  href={`/app/watch/${event.watchId}`}
                  className="mt-6 inline-block border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
                >
                  Open Watch Detail
                </Link>
              </div>
              <div className={reverse ? "md:order-1" : ""}>
                <div className="editorial-card p-4">
                  {watch ? <WatchMedia watch={watch} className="aspect-[4/5]" /> : null}
                </div>
              </div>
              <div className="absolute left-1/2 top-4 hidden h-3 w-3 -translate-x-1/2 bg-[var(--foreground)] md:block" />
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}
