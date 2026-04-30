import { AnimatedSection } from "@/components/watch/animated-section";
import { PageHeader } from "@/components/watch/page-header";
import { ProgressMetric } from "@/components/watch/progress-metric";
import { RelatedLinks } from "@/components/watch/related-links";
import { ScoreDisplay } from "@/components/watch/score-display";
import { Shell } from "@/components/watch/shell";
import { getRouteFlow, scoreBreakdown } from "@/lib/data";

export default function CollectionScorePage() {
  const flow = getRouteFlow("/app/collection-score")!;
  return (
    <Shell currentPath="/app/collection-score">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="A subtle prestige index evaluating the archive through diversity, consistency, rarity, condition and personal significance."
          primaryHref="/app/taste-profile"
          secondaryHref="/app/vault-export"
        />
        <section className="section-gap flex flex-col items-center gap-14 md:flex-row md:justify-between">
          <div className="max-w-lg">
            <p className="eyebrow mb-4">Collection Score</p>
            <h2 className="headline-title">The architecture of your archive</h2>
            <p className="mt-6 text-[15px] leading-8 text-[var(--muted)]">
              An empirical reading of how well the collection holds its line while still leaving room for emotional and historical range.
            </p>
          </div>
          <ScoreDisplay value={82} />
        </section>
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {scoreBreakdown.map((metric) => (
            <ProgressMetric key={metric.label} label={metric.label} value={metric.value} note={metric.note} />
          ))}
          <AnimatedSection className="bg-[var(--foreground)] p-8 text-white">
            <p className="eyebrow mb-4 text-white/70">Badge Path</p>
            <h3 className="font-serif text-3xl tracking-[-0.04em]">Connoisseur</h3>
            <p className="mt-4 text-sm leading-7 text-white/75">
              Current standing, with Archivist emerging as the next quiet horizon.
            </p>
          </AnimatedSection>
        </section>
        <section className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {["Collector", "Enthusiast", "Connoisseur", "Archivist"].map((badge, index) => (
            <AnimatedSection
              key={badge}
              className={`border p-10 text-center ${badge === "Connoisseur" ? "border-[var(--foreground)] bg-white" : "opacity-50"}`}
              delay={index * 0.04}
            >
              <p className="font-serif text-2xl tracking-[-0.03em]">{badge}</p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                Tier {index + 1}
              </p>
            </AnimatedSection>
          ))}
        </section>
        <RelatedLinks
          links={[
            { href: "/app/taste-profile", label: "View Taste Profile", blurb: "Continue from score into the dossier that explains the collection's character." },
            { href: "/app/journey", label: "View Journey Through Time", blurb: "Compare the score with the collection's narrative progression." },
            { href: "/app/vault-export", label: "Export Vault Archive", blurb: "Include the score and its breakdown inside the final private report." },
          ]}
        />
      </main>
    </Shell>
  );
}
