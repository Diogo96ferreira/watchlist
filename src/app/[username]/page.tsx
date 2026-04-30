import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/watch/fade-in";
import { GrailSpotlight } from "@/components/watch/grail-spotlight";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { StatusBadge } from "@/components/watch/status-badge";
import { StatCard } from "@/components/watch/stat-card";
import { WatchCard } from "@/components/watch/watch-card";
import { AvatarPortrait } from "@/components/watch/avatar-portrait";
import { getProfileByUsername, similarCollectors } from "@/lib/data";

type Props = {
  params: Promise<{ username: string }>;
};

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const profile = getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const owned = profile.watches.filter((watch) => watch.status === "Owned");
  const wishlist = profile.watches.filter((watch) => watch.status === "Wishlist");

  return (
    <Shell currentPath={`/${profile.username}`}>
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <section className="section-gap grid gap-10 md:grid-cols-12 md:items-start">
          <FadeIn className="md:col-span-3">
            <div className="editorial-card mx-auto aspect-square max-w-[240px] overflow-hidden rounded-full p-1 md:mx-0">
              <AvatarPortrait
                src={profile.avatarUrl}
                alt={profile.name}
                initials={profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
                className="h-full w-full rounded-full"
              />
            </div>
          </FadeIn>
          <FadeIn className="md:col-span-6 md:pt-4" delay={0.1}>
            <div className="space-y-5">
              <p className="eyebrow">Collector Profile</p>
              <div>
                <h1 className="display-title balanced-text">{profile.name}</h1>
                <p className="mt-3 text-sm uppercase tracking-[0.26em] text-[var(--muted)]">
                  @{profile.username}
                </p>
              </div>
              <p className="max-w-xl text-[15px] leading-8 text-[var(--muted)]">
                {profile.bio}
              </p>
              <p className="text-sm tracking-[0.12em] text-[var(--muted)]">
                {profile.location}
              </p>
            </div>
          </FadeIn>
          <FadeIn className="md:col-span-3 md:flex md:justify-end md:pt-6" delay={0.16}>
            <Link
              href="/app/showroom-2"
              className="inline-flex items-center border border-[var(--foreground)] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] transition hover:bg-[var(--foreground)] hover:text-white"
            >
              Enter Showroom
            </Link>
          </FadeIn>
        </section>

        <section className="section-gap grid grid-cols-2 gap-5 md:grid-cols-4">
          <StatCard label="Owned" value={String(profile.stats.owned)} />
          <StatCard label="Wishlist" value={String(profile.stats.wishlist)} />
          <StatCard label="Sold" value={String(profile.stats.sold)} />
          <StatCard label="Brands" value={String(profile.stats.brands)} />
        </section>

        <section className="section-gap">
          <GrailSpotlight watch={profile.grail} />
        </section>

        <section className="section-gap">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-3">Collection Preview</p>
              <h2 className="headline-title">Built around craftsmanship</h2>
            </div>
            <Link
              href="/app/vault"
              className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
            >
              View Public Collection
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {owned.concat(wishlist).slice(0, 4).map((watch, index) => (
              <WatchCard
                key={watch.id}
                watch={watch}
                href={`/app/watch/${watch.id}`}
                priority={index < 2}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-8 md:grid-cols-12">
          <FadeIn className="editorial-card p-10 md:col-span-8" delay={0.1}>
            <p className="eyebrow mb-8">Taste Profile</p>
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Top Brand
                </p>
                <p className="serif-stat">{profile.tasteProfile.topBrand}</p>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                  Personality
                </p>
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[var(--foreground)]" />
                  <p className="serif-stat">{profile.tasteProfile.personality}</p>
                </div>
              </div>
            </div>
            <p className="mt-12 border-t pt-8 text-[15px] leading-8 text-[var(--muted)] italic">
              {profile.tasteProfile.summary}
            </p>
          </FadeIn>
          <FadeIn className="editorial-card p-10 md:col-span-4" delay={0.18}>
            <p className="eyebrow mb-8">Recent Activity</p>
            <ul className="space-y-7">
              {profile.activities.map((activity) => (
                <li key={activity.id} className="flex gap-4">
                  <StatusBadge status={activity.badge} compact />
                  <div>
                    <p className="text-sm leading-7 text-[var(--foreground)]">
                      {activity.description}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {activity.relativeTime}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>
        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {similarCollectors.slice(0, 3).map((collector) => (
            <FadeIn key={collector.id} className="editorial-card p-8">
              <p className="eyebrow mb-3">Collectors With Similar Taste</p>
              <h3 className="font-serif text-2xl tracking-[-0.03em]">{collector.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{collector.statement}</p>
            </FadeIn>
          ))}
        </section>
        <RelatedLinks
          title="Public Flow"
          links={[
            { href: "/app/story", label: "Read Collection Story", blurb: "Move from profile surface into the longer narrative of the collection." },
            { href: "/app/appreciations", label: "Send Appreciation", blurb: "Leave a quiet note of admiration instead of a public comment." },
            { href: "/app/vault", label: "Create Your Own Vault", blurb: "Follow the signed-in path and begin building a private archive." },
          ]}
        />
      </main>
    </Shell>
  );
}
