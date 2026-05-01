import Link from "next/link";
import { AnalyticsRing } from "@/components/watch/analytics-ring";
import { AnimatedSection } from "@/components/watch/animated-section";
import { AvatarPortrait } from "@/components/watch/avatar-portrait";
import { CollectorCard } from "@/components/watch/collector-card";
import { CommunityCommentCard } from "@/components/watch/community-comment-card";
import { CommunityFeedCard } from "@/components/watch/community-feed-card";
import { CommunityRatingCard } from "@/components/watch/community-rating-card";
import { GrailSpotlight } from "@/components/watch/grail-spotlight";
import { HomeHero } from "@/components/watch/home-hero";
import { ProgressMetric } from "@/components/watch/progress-metric";
import { Shell } from "@/components/watch/shell";
import { StatCard } from "@/components/watch/stat-card";
import { WatchCard } from "@/components/watch/watch-card";
import { WatchMedia } from "@/components/watch/watch-media";
import {
  communityComments,
  communityFeed,
  communityNews,
  communityRatings,
  journalStories,
  manuelProfile,
  similarCollectors,
} from "@/lib/data";

export default function HomePage() {
  const featuredCollector = similarCollectors[0];
  const collectionPreview = manuelProfile.watches.slice(0, 8);
  const featuredWatches = manuelProfile.watches.filter((watch) => watch.status === "Owned").slice(0, 2);
  const featuredWishlist = manuelProfile.watches.filter((watch) => watch.status === "Wishlist").slice(0, 2);
  const featuredGrail = manuelProfile.grail;
  const heroWatch =
    manuelProfile.watches.find((watch) => watch.id === "omega-seamaster-300m") ??
    manuelProfile.watches[0];
  const collectorsInFocus = [
    {
      id: manuelProfile.id,
      username: manuelProfile.username,
      name: manuelProfile.name,
      avatarUrl: manuelProfile.avatarUrl,
      personality: manuelProfile.tasteProfile.personality,
      statement: manuelProfile.tasteProfile.summary,
      overlap: `${manuelProfile.stats.owned} owned / ${manuelProfile.stats.wishlist} wishlist`,
      previewWatchIds: manuelProfile.watches.slice(0, 3).map((watch) => watch.id),
    },
    ...similarCollectors,
  ];

  return (
    <Shell currentPath="/">
      <main className="page-frame pb-24">
        <HomeHero watch={heroWatch} />

        <AnimatedSection className="section-gap">
          <div className="mb-12 grid gap-6 md:grid-cols-[1fr_0.9fr] md:items-end">
            <div>
              <p className="eyebrow mb-4">Collector Community</p>
              <h2 className="headline-title">Not one archive. A network of watch worlds.</h2>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-[var(--muted)] md:justify-self-end">
              Watch List should feel like a place to discover collectors, compare instincts,
              follow evolving wishlists and move through stories, not a single static profile.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {collectorsInFocus.map((collector, index) => (
              <AnimatedSection key={collector.id} delay={(index % 4) * 0.05}>
                <CollectorCard collector={collector} />
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="section-gap">
          <div className="mb-12 grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-end">
            <div>
              <p className="eyebrow mb-4">Community Feed</p>
              <h2 className="headline-title">Collections should be discussed, appreciated and evaluated in motion.</h2>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-[var(--muted)] md:justify-self-end">
              The homepage should feel alive with updates: wishlist moves, grail calls, thoughtful comments and structured appreciation.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {communityFeed.map((entry, index) => (
              <AnimatedSection key={entry.id} className="h-full" delay={(index % 2) * 0.06}>
                <CommunityFeedCard entry={entry} />
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="section-gap">
          <div className="mb-12 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <p className="eyebrow mb-4">Collection Building</p>
              <h2 className="headline-title">Build an owned collection, a live wishlist and a true grail path.</h2>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-[var(--muted)] md:justify-self-end">
              Watch List is meant to help people track what they own, what they are considering,
              and what sits above the wishlist as a longer-horizon grail.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            <AnimatedSection className="editorial-card p-8">
              <p className="eyebrow mb-4">Owned Collection</p>
              <h3 className="font-serif text-[2rem] leading-none tracking-[-0.04em]">What you already live with.</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                The owned side of the vault should feel archival: documented, reviewable and easy for other collectors to understand.
              </p>
              <div className="mt-6 grid gap-4">
                {featuredWatches.map((watch) => (
                  <div key={watch.id} className="editorial-card p-4">
                    <WatchMedia watch={watch} className="h-44 w-full" sizes="280px" />
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="eyebrow mb-1">Owned</p>
                        <p className="font-serif text-[1.35rem] leading-none tracking-[-0.03em]">
                          {watch.brand} {watch.model}
                        </p>
                      </div>
                      <Link href={`/app/watch/${watch.id}`} className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                        Open
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection className="editorial-card p-8" delay={0.05}>
              <p className="eyebrow mb-4">Wishlist</p>
              <h3 className="font-serif text-[2rem] leading-none tracking-[-0.04em]">Targets that are still in active consideration.</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                A wishlist should be dynamic and discussable. Other collectors should be able to react to what belongs next and what does not.
              </p>
              <div className="mt-6 grid gap-4">
                {featuredWishlist.slice(0, 2).map((watch) => (
                  <div key={watch.id} className="editorial-card p-4">
                    <WatchMedia watch={watch} className="h-44 w-full" sizes="280px" />
                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="eyebrow mb-1">Wishlist</p>
                        <p className="font-serif text-[1.35rem] leading-none tracking-[-0.03em]">
                          {watch.brand} {watch.model}
                        </p>
                      </div>
                      <Link href={`/app/watch/${watch.id}`} className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                        Discuss
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection className="editorial-card p-8" delay={0.1}>
              <p className="eyebrow mb-4">Grail</p>
              <h3 className="font-serif text-[2rem] leading-none tracking-[-0.04em]">The single watch that explains the direction of the collection.</h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                A grail is not just a more expensive wishlist entry. It is the long-view answer to what the collection is trying to become.
              </p>
              <div className="mt-6 editorial-card p-4">
                <WatchMedia watch={featuredGrail} className="h-[25rem] w-full" sizes="320px" />
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="eyebrow mb-1">Grail</p>
                    <p className="font-serif text-[1.45rem] leading-none tracking-[-0.03em]">
                      {featuredGrail.brand} {featuredGrail.model}
                    </p>
                  </div>
                  <Link href={`/app/watch/${featuredGrail.id}`} className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                    View thesis
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>

        <section className="section-gap grid gap-8 md:grid-cols-12">
          <AnimatedSection className="editorial-card p-12 md:col-span-7">
            <p className="eyebrow mb-6">Your Taste, Defined</p>
            <h2 className="headline-title">See the shape of your collection as it evolves.</h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-8 text-[var(--muted)]">
              From case-size patterns to brand affinity and wear discipline, the platform should
              make your preferences legible as your vault grows.
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
            <p className="eyebrow mb-8">Collector Signals</p>
            <div className="flex flex-col items-center gap-10 border-b pb-10">
              <AnalyticsRing value={39} suffix="mm" />
              <div className="grid w-full gap-6">
                {[
                  { label: "Top Brand", value: manuelProfile.tasteProfile.topBrand },
                  { label: "Wishlists", value: "Live & Shareable" },
                  { label: "Grail Status", value: "One Clear Target" },
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
                alt="Featured collector"
                initials={manuelProfile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
                className="h-24 w-24 rounded-full"
              />
              <div>
                <p className="eyebrow mb-2">Featured Collector Flow</p>
                <h2 className="headline-title text-[2.4rem]">Profiles should feel alive, not isolated.</h2>
                <p className="mt-2 text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  Public profiles, community signals and evolving wishlists
                </p>
              </div>
            </div>
            <p className="mt-8 text-[15px] leading-8 text-[var(--muted)]">
              Every member should be able to present a collection, maintain a wishlist, and mark a single grail that sits above short-term targets.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-5">
              <StatCard label="Owned" value="Collection" />
              <StatCard label="Wishlist" value="Targets" />
              <StatCard label="Brands" value="Signals" />
              <StatCard label="Grail" value="North Star" />
            </div>
            <Link
              href="/app/similar-collectors"
              className="magnetic-button mt-10 inline-flex bg-[var(--foreground)] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white"
            >
              Browse collectors
            </Link>
          </AnimatedSection>
          <AnimatedSection className="md:col-span-7" delay={0.08}>
            <div className="grid gap-6 md:grid-cols-2">
              <WatchCard watch={featuredWatches[0]} href={`/app/watch/${featuredWatches[0].id}`} />
              <WatchCard watch={featuredWishlist[0]} href={`/app/watch/${featuredWishlist[0].id}`} />
              <WatchCard watch={featuredWishlist[1]} href={`/app/watch/${featuredWishlist[1].id}`} />
              <WatchCard watch={featuredGrail} href={`/app/watch/${featuredGrail.id}`} />
            </div>
          </AnimatedSection>
        </section>

        <section className="section-gap grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <AnimatedSection>
            <div className="mb-8 max-w-2xl">
              <p className="eyebrow mb-4">Ratings And Comments</p>
              <h2 className="headline-title">Community feedback should be structured, not noisy.</h2>
            </div>
            <div className="grid gap-6">
              {communityRatings.map((rating, index) => (
                <AnimatedSection key={rating.id} delay={index * 0.05}>
                  <CommunityRatingCard rating={rating} />
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <div className="mb-8 max-w-xl">
              <p className="eyebrow mb-4">Conversation Layer</p>
              <h2 className="headline-title">Comments should orbit real collection decisions.</h2>
            </div>
            <div className="grid gap-6">
              {communityComments.map((entry, index) => (
                <AnimatedSection key={entry.id} delay={index * 0.05}>
                  <CommunityCommentCard entry={entry} />
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </section>

        <section className="section-gap">
          <div className="mb-10 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="eyebrow mb-4">Journal And News</p>
              <h2 className="headline-title">Models, community picks and editorial signals belong on the front page.</h2>
            </div>
            <p className="max-w-xl text-[15px] leading-8 text-[var(--muted)] md:justify-self-end">
              Stories, appreciations, recommendations and collector signals should make the
              homepage feel active even before someone opens an individual profile.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {communityNews.map((story, index) => (
              <AnimatedSection key={story.id} className="editorial-card p-8" delay={index * 0.05}>
                <p className="eyebrow mb-4">{story.label}</p>
                <h3 className="font-serif text-[1.9rem] leading-none tracking-[-0.04em]">
                  {story.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{story.summary}</p>
                <Link
                  href={story.href}
                  className="mt-8 inline-flex border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
                >
                  Open signal
                </Link>
              </AnimatedSection>
            ))}
            <AnimatedSection className="editorial-card p-8" delay={0.16}>
              <p className="eyebrow mb-4">Editorial Route</p>
              <h3 className="font-serif text-[1.9rem] leading-none tracking-[-0.04em]">
                Collector stories, journal updates and curated pathways.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                The journal remains the slower layer of the platform: longer stories, collection updates and editorial context.
              </p>
              <Link
                href={journalStories[0].route}
                className="mt-8 inline-flex border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
              >
                Open journal
              </Link>
            </AnimatedSection>
          </div>
        </section>

        <section className="section-gap">
          <div className="mb-8 max-w-2xl">
            <p className="eyebrow mb-4">Grail Focus</p>
            <p className="max-w-xl text-[16px] leading-8 text-[var(--muted)]">
              A grail is not just another wishlist item. It is the watch that defines the direction of a collection.
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
          <p className="eyebrow mb-5">Join The Community</p>
          <h2 className="display-title text-[clamp(2.4rem,4vw,4rem)]">Build your vault, then enter the conversation</h2>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-[var(--muted)]">
            Start with what you own, add what you want, separate true grails from everyday targets,
            and connect that story to the rest of the community.
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
