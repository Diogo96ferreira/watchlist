import Link from "next/link";
import { AnimatedSection } from "@/components/watch/animated-section";
import { EditorialHero } from "@/components/watch/editorial-hero";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { StatCard } from "@/components/watch/stat-card";
import { WatchImagePanel } from "@/components/watch/watch-image-panel";
import { getRouteFlow, manuelProfile } from "@/lib/data";

export default function VaultPage() {
  const flow = getRouteFlow("/app/vault")!;
  const summaryWatch = manuelProfile.watches[0];
  return (
    <Shell currentPath="/app/vault">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <EditorialHero
          flow={flow}
          eyebrow="Confidential Archive"
          description="A private dossier of your collection, synthesizing current references, future grails and the metrics that shape the archive."
        >
          <Link
            href="/app/vault-export"
            className="bg-[var(--foreground)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[var(--muted)]"
          >
            Export Vault Archive
          </Link>
        </EditorialHero>

        <section className="section-gap grid grid-cols-2 gap-5 md:grid-cols-4">
          <StatCard label="Owned" value={String(manuelProfile.stats.owned)} />
          <StatCard label="Wishlist" value={String(manuelProfile.stats.wishlist)} />
          <StatCard label="Brands" value={String(manuelProfile.stats.brands)} />
          <StatCard label="Curated Score" value="82" />
        </section>

        <section className="grid gap-8 md:grid-cols-12">
          <AnimatedSection className="editorial-card p-12 md:col-span-7">
            <p className="eyebrow mb-4">Collection Summary</p>
            <h2 className="headline-title">Built around craftsmanship</h2>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-[var(--muted)]">
              Manuel&apos;s vault remains concise but unusually coherent: two owned references anchoring a precise wishlist built around proportion, utility and warm long-term refinement.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/app/taste-profile" className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                View Taste Profile
              </Link>
              <Link href="/app/collection-score" className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                Open Collection Score
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection className="md:col-span-5">
            <WatchImagePanel watch={summaryWatch} tall className="h-full" priority />
          </AnimatedSection>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { href: "/app/journey", label: "Journey Through Time", blurb: "Visualize the collection as a progressing timeline of intent." },
            { href: "/app/rotation", label: "Current Rotation", blurb: "Track what the archive becomes in everyday ritual." },
            { href: "/app/story", label: "Collection Story", blurb: "Read the longer personal narrative behind each acquisition." },
            { href: "/app/taste-engine", label: "Taste Engine", blurb: "See what the archive is naturally asking for next." },
          ].map((item, index) => (
            <AnimatedSection key={item.href} className="editorial-card p-8" delay={index * 0.05}>
              <h3 className="font-serif text-2xl tracking-[-0.03em]">{item.label}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.blurb}</p>
              <Link href={item.href} className="mt-6 inline-block border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                Open
              </Link>
            </AnimatedSection>
          ))}
        </section>

        <RelatedLinks
          links={[
            { href: "/app/taste-profile", label: "Taste Profile", blurb: "A quiet analytical readout of how the collection thinks." },
            { href: "/app/vault-export", label: "Vault Archive", blurb: "Preview the dossier before exporting it as a private report." },
            { href: "/app/showroom", label: "Enter Showroom", blurb: "Step out of the archive and into the collection's visual presentation." },
          ]}
        />
      </main>
    </Shell>
  );
}
