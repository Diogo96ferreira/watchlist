import { AnimatedSection } from "@/components/watch/animated-section";
import { CollectorCard } from "@/components/watch/collector-card";
import { PageHeader } from "@/components/watch/page-header";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { getRouteFlow, similarCollectors } from "@/lib/data";

export default function SimilarCollectorsPage() {
  const flow = getRouteFlow("/app/similar-collectors")!;

  return (
    <Shell currentPath="/app/similar-collectors">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="Quiet social discovery among collectors whose instincts, silhouettes and long-view curation feel closely aligned with your own."
          primaryHref="/app/journal"
          secondaryHref="/app/appreciations"
        />
        <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {similarCollectors.map((collector, index) => (
            <AnimatedSection key={collector.id} delay={(index % 3) * 0.05}>
              <CollectorCard collector={collector} />
            </AnimatedSection>
          ))}
        </section>
        <RelatedLinks
          links={[
            { href: "/app/appreciations", label: "Send Appreciation", blurb: "Use quiet recognition instead of public commentary." },
            { href: "/app/taste-engine", label: "Back to Taste Engine", blurb: "Return to recommendations and compare social overlap with product suggestions." },
            { href: "/manuel-canelas-pais", label: "Public Profile", blurb: "Step back out into the public-facing collector presence." },
          ]}
        />
      </main>
    </Shell>
  );
}
