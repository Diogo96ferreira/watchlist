import Link from "next/link";
import { AnalyticsRing } from "@/components/watch/analytics-ring";
import { AnimatedSection } from "@/components/watch/animated-section";
import { AvatarPortrait } from "@/components/watch/avatar-portrait";
import { GrailSpotlight } from "@/components/watch/grail-spotlight";
import { HomeHero } from "@/components/watch/home-hero";
import { ProgressMetric } from "@/components/watch/progress-metric";
import { Shell } from "@/components/watch/shell";
import { StatCard } from "@/components/watch/stat-card";
import { WatchCard } from "@/components/watch/watch-card";
import { WatchMedia } from "@/components/watch/watch-media";
import { manuelProfile, similarCollectors } from "@/lib/data";

export default function HomePage() {
  const featuredCollector = similarCollectors[0];
  const collectionPreview = manuelProfile.watches.slice(0, 8);
  const featuredWatches = manuelProfile.watches.filter((watch) => watch.status === "Owned").slice(0, 2);
  const featuredWishlist = manuelProfile.watches.filter((watch) => watch.status === "Wishlist").slice(0, 2);
  const heroWatch =
    manuelProfile.watches.find((watch) => watch.id === "omega-seamaster-300m") ??
    manuelProfile.watches[0];

  return (
    <Shell currentPath="/">
      <main className="page-frame pb-24">
        <HomeHero watch={heroWatch} />

        <AnimatedSection className="section-gap">
          <div className="mb-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="eyebrow mb-4">A curated collection</p>
              <h2 className="headline-title">Every piece tells a story.</h2>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-[var(--muted)] md:justify-self-end">
              The collection view is treated like an archive: measured, tactile and designed
              to let each watch breathe.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {collectionPreview.map((watch, index) => (
              <WatchCard
                key={watch.id}
                watch={watch}
                href={`/app/watch/${watch.id}`}
                priority={index < 2}
              />
            ))}
          </div>
        </AnimatedSection>

        <section className="section-gap grid gap-8 md:grid-cols-12">
          <AnimatedSection className="editorial-card p-12 md:col-span-7">
            <p className="eyebrow mb-6">Your taste, defined</p>
            <h2 className="headline-title">Measured Modernist</h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[var(--muted)]">
              A profile shaped by compact proportions, steel restraint and a quiet
              preference for watches that feel considered from every angle.
            </p>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <ProgressMetric
                label="Vintage Diver Lean"
                value={84}
                note="A collector instinctively drawn to purposeful silhouettes and calm tool-watch energy."
              />
              <ProgressMetric
                label="Brand Affinity"
                value={72}
                note="A strong pull toward maisons with heritage, proportion and long-term legitimacy."
              />
              <ProgressMetric
                label="Wear Discipline"
                value={68}
                note="An archive built around watches that can be lived with, not simply displayed."
              />
            </div>
          </AnimatedSection>
          <AnimatedSection className="editorial-card p-10 md:col-span-5" delay={0.08}>
            <p className="eyebrow mb-8">Profile Markers</p>
            <div className="flex flex-col items-center gap-10 border-b pb-10">
              <AnalyticsRing value={39} suffix="mm" />
              <div className="grid w-full gap-6">
                {[
                  { label: "Top Brand", value: manuelProfile.tasteProfile.topBrand },
                  { label: "Wear Frequency", value: "4.6 Days/Wk" },
                  { label: "Collection Tone", value: "Understated Steel" },
                ].map((item) => (
                  <div key={item.label} className="flex items-end justify-between gap-6 border-t pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                      {item.label}
                    </p>
                    <p className="font-serif text-2xl tracking-[-0.03em]">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section className="section-gap grid gap-8 md:grid-cols-12 md:items-start">
          <AnimatedSection className="editorial-card p-10 md:col-span-5">
            <div className="flex items-center gap-5">
              <AvatarPortrait
                src={manuelProfile.avatarUrl}
                alt={manuelProfile.name}
                initials={manuelProfile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
                className="h-24 w-24 rounded-full"
              />
              <div>
                <p className="eyebrow mb-2">Featured Collector</p>
                <h2 className="headline-title text-[2.4rem]">{manuelProfile.name}</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  @{manuelProfile.username}
                </p>
              </div>
            </div>
            <p className="mt-8 text-[15px] leading-8 text-[var(--muted)]">{manuelProfile.bio}</p>
            <div className="mt-10 grid grid-cols-2 gap-5">
              <StatCard label="Owned" value={String(manuelProfile.stats.owned)} />
              <StatCard label="Wishlist" value={String(manuelProfile.stats.wishlist)} />
              <StatCard label="Brands" value={String(manuelProfile.stats.brands)} />
              <StatCard label="Grails" value="1" />
            </div>
            <Link
              href="/manuel-canelas-pais"
              className="magnetic-button mt-10 inline-flex bg-[var(--foreground)] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white"
            >
              View collection
            </Link>
          </AnimatedSection>
          <AnimatedSection className="md:col-span-7" delay={0.08}>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredWatches.concat(featuredWishlist).map((watch) => (
                <WatchCard key={watch.id} watch={watch} href={`/app/watch/${watch.id}`} />
              ))}
            </div>
          </AnimatedSection>
        </section>

        <section className="section-gap">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-4">The grail</p>
            <p className="max-w-xl text-[16px] leading-8 text-[var(--muted)]">
              Some watches are desired. Others define a collection.
            </p>
          </div>
          <GrailSpotlight watch={manuelProfile.grail} />
        </section>

        <section className="section-gap">
          <AnimatedSection className="editorial-card overflow-hidden p-10 text-center md:p-16">
            <div className="mx-auto max-w-4xl">
              <p className="eyebrow mb-6">Enter the showroom</p>
              <h2 className="display-title text-[clamp(2.4rem,5vw,4.4rem)]">
                Experience collections in a more immersive way
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-[var(--muted)]">
                Scroll through watches as if they were presented in a private catalogue,
                with space, atmosphere and craft given proper weight.
              </p>
              <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.3fr_1fr] md:items-center">
                <div className="editorial-card p-4">
                  <WatchMedia watch={featuredCollector ? manuelProfile.watches[0] : manuelProfile.grail} className="aspect-[4/5]" sizes="240px" />
                </div>
                <Link
                  href="/app/showroom-2"
                  className="magnetic-button mx-auto inline-flex border-b border-[var(--foreground)] pb-2 text-[11px] font-semibold uppercase tracking-[0.24em]"
                >
                  Enter the showroom
                </Link>
                <div className="editorial-card p-4">
                  <WatchMedia watch={manuelProfile.grail} className="aspect-[4/5]" sizes="240px" />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </section>

        <AnimatedSection className="border-t py-20 text-center">
          <p className="eyebrow mb-5">Start your collection</p>
          <h2 className="display-title text-[clamp(2.4rem,4vw,4rem)]">Create your vault</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-[var(--muted)]">
            Turn a group of watches into a world with its own narrative, taste profile and showroom.
          </p>
          <div className="mt-10 flex justify-center gap-5">
            <Link
              href="/app/vault"
              className="magnetic-button bg-[var(--foreground)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white"
            >
              Create your vault
            </Link>
            <Link
              href="/app/journal"
              className="border-b border-[var(--foreground)] pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.24em]"
            >
              Discover the journal
            </Link>
          </div>
        </AnimatedSection>
      </main>
    </Shell>
  );
}
