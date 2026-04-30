import { AnimatedSection } from "@/components/watch/animated-section";
import { InsightCard } from "@/components/watch/insight-card";
import { PageHeader } from "@/components/watch/page-header";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { WatchImagePanel } from "@/components/watch/watch-image-panel";
import { getRouteFlow, recommendations, getWatchById } from "@/lib/data";

export default function TasteEnginePage() {
  const flow = getRouteFlow("/app/taste-engine")!;
  const primary = recommendations.find((item) => item.primary)!;
  const alternatives = recommendations.filter((item) => !item.primary);
  const primaryWatch = getWatchById(primary.watchId)!;

  return (
    <Shell currentPath="/app/taste-engine">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="Recommendations shaped by your collection."
          primaryHref="/app/grails"
          secondaryHref="/app/similar-collectors"
        />
        <section className="section-gap grid gap-8 md:grid-cols-12">
          <AnimatedSection className="md:col-span-7">
            <WatchImagePanel watch={primaryWatch} tall priority />
          </AnimatedSection>
          <AnimatedSection className="md:col-span-5 md:flex md:flex-col md:justify-center" delay={0.1}>
            <p className="eyebrow mb-4">Your Next Watch</p>
            <h2 className="headline-title">{primaryWatch.brand}</h2>
            <p className="mt-2 font-serif text-2xl italic tracking-[-0.03em] text-[var(--muted)]">
              {primaryWatch.model}
            </p>
            <div className="editorial-card mt-8 p-8">
              <p className="eyebrow mb-4">Recommendation Reason</p>
              <p className="text-sm leading-7 text-[var(--muted)]">{primary.reason}</p>
            </div>
          </AnimatedSection>
        </section>

        <section className="section-gap grid gap-8 md:grid-cols-3">
          <InsightCard title="You favor vintage divers" body="A strong through-line of purposeful steel watches with calm, tool-led energy is already visible." />
          <InsightCard title="Average case size: 39mm" body="Your archive continues to cluster around balanced, wearable dimensions rather than headline scale." />
          <InsightCard title="Strong affinity for understated steel pieces" body="Even aspirational picks tend to preserve the same restraint and tactile versatility." />
        </section>

        <section>
          <div className="mb-10 flex items-end justify-between">
            <h3 className="headline-title text-[2rem]">Secondary Recommendations</h3>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {alternatives.map((item, index) => {
              const watch = getWatchById(item.watchId)!;
              return (
                <AnimatedSection key={item.id} className="editorial-card p-6" delay={index * 0.05}>
                  <WatchImagePanel watch={watch} tall className="p-3" />
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    Match {item.match}%
                  </p>
                  <h4 className="mt-2 font-serif text-2xl tracking-[-0.03em]">{watch.brand}</h4>
                  <p className="mt-1 text-sm text-[var(--muted)]">{watch.model}</p>
                </AnimatedSection>
              );
            })}
          </div>
        </section>

        <RelatedLinks
          links={[
            { href: "/app/grails", label: "Add to Wishlist", blurb: "Carry the recommendation into the aspirational layer of the product." },
            { href: "/app/similar-collectors", label: "View Similar Collectors", blurb: "Discover collectors whose archives point in a similar direction." },
            { href: "/app/journal", label: "Back to Journal", blurb: "Return to the editorial feed and continue exploring related modules." },
          ]}
        />
      </main>
    </Shell>
  );
}
