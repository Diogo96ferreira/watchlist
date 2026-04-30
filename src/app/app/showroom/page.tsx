import Link from "next/link";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { manuelProfile } from "@/lib/data";
import { ShowroomPanel } from "@/components/watch/showroom-panel";

export default function ShowroomPage() {
  return (
    <Shell currentPath="/app/showroom" immersive>
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <section className="section-gap grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="eyebrow mb-4">Showroom</p>
            <h1 className="display-title">Immersive collection browsing</h1>
            <p className="mt-6 max-w-xl text-[15px] leading-8 text-[var(--muted)]">
              Browse the archive visually, step into Showroom 2.0, open individual watch records and surface 3D-ready references where available.
            </p>
          </div>
          <div className="md:flex md:justify-end">
            <Link
              href="/app/showroom-2"
              className="bg-[var(--foreground)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white"
            >
              Showroom Mode
            </Link>
          </div>
        </section>
        <section className="section-gap">
          <ShowroomPanel watch={manuelProfile.watches[0]} compact />
        </section>
        <RelatedLinks
          links={[
            { href: "/app/showroom-2", label: "Enter Showroom 2.0", blurb: "Move into the full-screen flagship presentation with scroll-led sequencing." },
            { href: "/app/watch/mido-ocean-star-39", label: "Open Watch Detail", blurb: "Jump straight from immersive browsing into the reference dossier." },
            { href: "/app/grails", label: "View Grails", blurb: "Shift from owned and active references to the archive's future ambitions." },
          ]}
        />
      </main>
    </Shell>
  );
}
