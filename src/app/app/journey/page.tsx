import { AnimatedSection } from "@/components/watch/animated-section";
import { PageHeader } from "@/components/watch/page-header";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { WatchImagePanel } from "@/components/watch/watch-image-panel";
import { getRouteFlow, timelineEvents, getWatchById } from "@/lib/data";

export default function JourneyPage() {
  const flow = getRouteFlow("/app/journey")!;
  const grouped = Object.entries(
    timelineEvents.reduce<Record<string, typeof timelineEvents>>((acc, event) => {
      const key = String(event.year);
      acc[key] ??= [];
      acc[key].push(event);
      return acc;
    }, {}),
  );

  return (
    <Shell currentPath="/app/journey">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="Visualize the collection as a sequence of moments, grouped by acquisition year and marked by the role each watch plays in the archive."
          primaryHref="/app/story"
          secondaryHref="/app/vault-export"
        />
        <div className="space-y-16">
          {grouped.map(([year, events], index) => (
            <AnimatedSection key={year} className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)]" delay={index * 0.05}>
              <div>
                <span className="display-title text-[4rem] opacity-25">{year}</span>
              </div>
              <div className="space-y-6">
                {events.map((event) => {
                  const watch = getWatchById(event.watchId);
                  return (
                    <div key={event.id} className="grid gap-6 border-t pt-6 md:grid-cols-[1fr_280px]">
                      <div>
                        <p className="eyebrow mb-3">{event.label}</p>
                        <h3 className="headline-title text-[2rem]">{watch?.model}</h3>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">{event.note}</p>
                      </div>
                      {watch ? <WatchImagePanel watch={watch} /> : null}
                    </div>
                  );
                })}
              </div>
            </AnimatedSection>
          ))}
        </div>
        <RelatedLinks
          links={[
            { href: "/app/story", label: "Collection Story", blurb: "Continue from the timeline into the personal narrative behind it." },
            { href: "/app/vault-export", label: "Export Vault Archive", blurb: "Preserve the journey as part of the private dossier." },
            { href: "/app/watch/vacheron-constantin-fiftysix", label: "Open Grail Detail", blurb: "Jump directly to the watch that closes the story's current arc." },
          ]}
        />
      </main>
    </Shell>
  );
}
