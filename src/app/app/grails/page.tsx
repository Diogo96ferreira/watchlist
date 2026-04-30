import { AnimatedSection } from "@/components/watch/animated-section";
import { PageHeader } from "@/components/watch/page-header";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { WatchCard } from "@/components/watch/watch-card";
import { getRouteFlow, manuelProfile } from "@/lib/data";

export default function GrailsPage() {
  const flow = getRouteFlow("/app/grails")!;
  const grails = manuelProfile.watches.filter((watch) => watch.status === "Wishlist");

  return (
    <Shell currentPath="/app/grails">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="Aspirational references gathered not as impulses, but as long-view targets in the evolution of the vault."
          primaryHref="/app/grail-ceremony"
          secondaryHref="/app/appreciations"
        />
        <section className="section-gap grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {grails.map((watch, index) => (
            <AnimatedSection key={watch.id} delay={(index % 3) * 0.05}>
              <WatchCard watch={watch} href={`/app/watch/${watch.id}`} />
            </AnimatedSection>
          ))}
        </section>
        <RelatedLinks
          links={[
            { href: "/app/grail-ceremony", label: "Grail Ceremony", blurb: "Stage the collection's defining acquisition as a cinematic moment." },
            { href: "/app/showroom-2", label: "View in Showroom", blurb: "See the grail in immersive presentation rather than list form." },
            { href: "/app/appreciations", label: "Share Moment", blurb: "Open appreciations and invite quiet reactions from fellow collectors." },
          ]}
        />
      </main>
    </Shell>
  );
}
