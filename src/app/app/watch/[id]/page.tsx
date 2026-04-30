import Link from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/watch/fade-in";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { StatusBadge } from "@/components/watch/status-badge";
import { WatchImagePanel } from "@/components/watch/watch-image-panel";
import { getWatchById, manuelProfile } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function WatchDetailPage({ params }: Props) {
  const { id } = await params;
  const watch = getWatchById(id);

  if (!watch) {
    notFound();
  }

  const related = manuelProfile.watches.filter(
    (candidate) => candidate.id !== watch.id && candidate.brand === watch.brand,
  );
  const isGrail = watch.id === manuelProfile.grail.id;

  return (
    <Shell currentPath="/app/showroom">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <section className="grid gap-10 md:grid-cols-12">
          <FadeIn className="md:col-span-5 md:pt-8">
            <p className="eyebrow mb-4">Reference Detail</p>
            <h1 className="display-title">{watch.model}</h1>
            <p className="mt-4 text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
              {watch.brand}
            </p>
            <p className="mt-8 max-w-md text-[15px] leading-8 text-[var(--muted)]">
              {watch.story}
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-2">Reference</p>
                <p className="font-serif text-2xl">{watch.reference}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Case Size</p>
                <p className="font-serif text-2xl">{watch.caseSize}mm</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Movement</p>
                <p className="font-serif text-2xl">{watch.movement}</p>
              </div>
              <div>
                <p className="eyebrow mb-2">Status</p>
                <StatusBadge status={watch.status} />
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/app/showroom-2" className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                Back to Showroom
              </Link>
              <Link href="/app/appreciations" className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                Send Appreciation
              </Link>
              <Link href="/app/rotation" className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
                Current Rotation
              </Link>
            </div>
            {watch.has3d ? (
              <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                3D View available in Showroom
              </p>
            ) : null}
          </FadeIn>
          <FadeIn className="md:col-span-7" delay={0.12}>
            <WatchImagePanel
              watch={watch}
              tall
              className="flex min-h-[620px] items-center justify-center p-8"
              priority
            />
          </FadeIn>
        </section>

        {related.length > 0 ? (
          <section className="mt-20">
            <p className="eyebrow mb-6">More From {watch.brand}</p>
            <div className="grid gap-8 md:grid-cols-2">
              {related.map((item) => (
                <div key={item.id} className="editorial-card p-8">
                  <p className="font-serif text-2xl">{item.model}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.reference}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
        <RelatedLinks
          links={[
            { href: "/app/showroom", label: "Return to Showroom", blurb: "Move back into immersive browsing and continue through the collection visually." },
            { href: "/app/appreciations", label: "View Appreciations", blurb: "See the premium social layer built around notes of admiration." },
            {
              href: isGrail ? "/app/grail-ceremony" : "/app/grails",
              label: isGrail ? "Launch Grail Ceremony" : "Open Grails",
              blurb: isGrail
                ? "This reference anchors the archive's grail narrative and can open into the cinematic ceremony."
                : "See how this reference sits relative to the rest of the aspirational list.",
            },
          ]}
        />
      </main>
    </Shell>
  );
}
