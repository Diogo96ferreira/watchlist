import Link from "next/link";
import { PageHeader } from "@/components/watch/page-header";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { WatchImagePanel } from "@/components/watch/watch-image-panel";
import { getRouteFlow, manuelProfile } from "@/lib/data";

export default function GrailCeremonyPage() {
  const flow = getRouteFlow("/app/grail-ceremony")!;
  const grail = manuelProfile.grail;

  return (
    <Shell currentPath="/app/grail-ceremony" immersive>
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="A cinematic moment for the watch that represents the next chapter of the archive."
          primaryHref="/app/showroom-2"
          secondaryHref="/app/appreciations"
        />
        <section className="section-gap text-center">
          <p className="eyebrow mb-4">A New Chapter Begins</p>
          <h2 className="headline-title text-[3rem] italic text-[var(--foreground)]">
            The grail has entered the vault.
          </h2>
          <div className="mx-auto mt-12 max-w-5xl">
            <WatchImagePanel watch={grail} className="bg-[#23211f] p-8" priority />
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 border-y py-10 md:grid-cols-4">
            <div>
              <p className="eyebrow mb-2">Brand</p>
              <p className="font-serif text-2xl">{grail.brand}</p>
            </div>
            <div>
              <p className="eyebrow mb-2">Model</p>
              <p className="font-serif text-2xl">{grail.model}</p>
            </div>
            <div>
              <p className="eyebrow mb-2">Reference</p>
              <p className="font-serif text-2xl">{grail.reference}</p>
            </div>
            <div>
              <p className="eyebrow mb-2">Year</p>
              <p className="font-serif text-2xl">{grail.year}</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link href="/app/showroom-2" className="bg-[var(--foreground)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              View in Showroom
            </Link>
            <Link href="/app/appreciations" className="border px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em]">
              Share Moment
            </Link>
          </div>
        </section>
        <RelatedLinks
          links={[
            { href: "/app/grails", label: "Back to Grails", blurb: "Return to the full aspirational list guiding the vault's future." },
            { href: "/app/showroom-2", label: "Open Showroom 2.0", blurb: "Continue directly into the immersive presentation layer." },
            { href: "/app/watch/vacheron-constantin-fiftysix", label: "Watch Detail", blurb: "Read the full record for the grail reference itself." },
          ]}
        />
      </main>
    </Shell>
  );
}
