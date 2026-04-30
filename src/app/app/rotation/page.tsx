import { AnimatedSection } from "@/components/watch/animated-section";
import { PageHeader } from "@/components/watch/page-header";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { WatchImagePanel } from "@/components/watch/watch-image-panel";
import { getRouteFlow, rotationData, getWatchById } from "@/lib/data";

export default function RotationPage() {
  const flow = getRouteFlow("/app/rotation")!;
  const daily = rotationData[0];
  const dailyWatch = getWatchById(daily.watchId)!;

  return (
    <Shell currentPath="/app/rotation">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="Track what the collector actually wears and how the archive turns from possession into ritual."
          primaryHref="/app/watch/tissot-gentleman-quartz"
          secondaryHref="/app/journal"
        />
        <section className="section-gap grid gap-8 lg:grid-cols-12">
          <AnimatedSection className="editorial-card p-10 lg:col-span-5">
            <p className="eyebrow mb-4">Daily Companion</p>
            <h2 className="headline-title">{dailyWatch.model}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{dailyWatch.reference}</p>
            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <p className="eyebrow mb-2">Wear Frequency</p>
                <p className="font-serif text-3xl">{daily.frequency}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Last Worn</p>
                <p className="font-serif text-3xl">{daily.lastWorn}</p>
              </div>
            </div>
            <p className="mt-10 border-t pt-8 text-sm leading-7 text-[var(--muted)] italic">
              &ldquo;Some pieces are collected. Others become part of the ritual.&rdquo;
            </p>
          </AnimatedSection>
          <AnimatedSection className="lg:col-span-7">
            <WatchImagePanel watch={dailyWatch} tall priority />
          </AnimatedSection>
        </section>
        <section className="grid gap-10 md:grid-cols-3">
          {rotationData.map((entry, index) => {
            const watch = getWatchById(entry.watchId)!;
            return (
              <AnimatedSection key={entry.watchId} className="group" delay={index * 0.05}>
                <WatchImagePanel watch={watch} tall className="p-3" />
                <div className="mt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl tracking-[-0.03em]">{watch.model}</h3>
                      <p className="mt-1 text-sm text-[var(--muted)]">{watch.reference}</p>
                    </div>
                    <span className="border px-2 py-1 text-[10px] uppercase tracking-[0.18em]">
                      {entry.state}
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 border-y py-4">
                    <div>
                      <p className="eyebrow mb-2">Last Worn</p>
                      <p className="text-sm">{entry.lastWorn}</p>
                    </div>
                    <div>
                      <p className="eyebrow mb-2">Frequency</p>
                      <p className="text-sm">{entry.frequency}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)] italic">{entry.note}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </section>
        <RelatedLinks
          links={[
            {
              href: "/app/vault",
              label: "Back to Vault",
              blurb: "Return to the broader private archive and analytics overview.",
            },
            {
              href: "/app/watch/tissot-gentleman-quartz",
              label: "Open Watch Detail",
              blurb: "Go deeper on the current daily companion and its archive record.",
            },
            {
              href: "/app/journey",
              label: "View Wear History",
              blurb: "Follow the collection through time and see how rotation relates to the bigger story.",
            },
          ]}
        />
      </main>
    </Shell>
  );
}
