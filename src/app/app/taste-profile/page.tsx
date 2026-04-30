import { AnalyticsRing } from "@/components/watch/analytics-ring";
import { FadeIn } from "@/components/watch/fade-in";
import { ProgressBar } from "@/components/watch/progress-bar";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { getRouteFlow, manuelProfile } from "@/lib/data";

export default function TasteProfilePage() {
  const { dossier } = manuelProfile;
  const flow = getRouteFlow("/app/taste-profile")!;

  return (
    <Shell currentPath="/app/taste-profile">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <section className="section-gap max-w-4xl">
          <FadeIn>
            <p className="eyebrow mb-4">{flow.section}</p>
            <h1 className="display-title">{flow.title}</h1>
            <p className="mt-8 max-w-2xl text-[17px] leading-8 text-[var(--muted)] italic">
              “A curated reflection of time.”
            </p>
          </FadeIn>
        </section>

        <div className="grid gap-8 md:grid-cols-12">
          <FadeIn className="editorial-card relative overflow-hidden p-12 md:col-span-8">
            <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.85),transparent_54%),linear-gradient(180deg,rgba(233,232,230,0.9),rgba(227,226,224,0.4))] md:block" />
            <div className="relative max-w-xl">
              <p className="eyebrow mb-6">Collection Personality</p>
              <h2 className="headline-title">{dossier.personalityTitle}</h2>
              <p className="mt-6 text-[15px] leading-8 text-[var(--muted)]">
                {dossier.personalityBody}
              </p>
              <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Established {dossier.established}
              </p>
            </div>
          </FadeIn>

          <FadeIn className="editorial-card flex h-full flex-col justify-between p-10 md:col-span-4" delay={0.1}>
            <div>
              <p className="eyebrow mb-8">Collection Progress</p>
              <div className="mb-5 flex items-end justify-between">
                <p className="font-serif text-2xl tracking-[-0.03em]">{dossier.level.title}</p>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                  Level {dossier.level.level}
                </p>
              </div>
              <ProgressBar value={dossier.level.progress} />
              <p className="mt-4 text-sm leading-7 text-[var(--muted)] italic">
                {dossier.level.note}
              </p>
            </div>
            <div className="mt-10 border-t pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Next Badge
              </p>
              <p className="mt-2 text-lg">{dossier.level.nextBadge}</p>
            </div>
          </FadeIn>

          <FadeIn className="editorial-card p-10 md:col-span-4" delay={0.08}>
            <p className="eyebrow mb-8">Brand Affinity</p>
            <div className="space-y-7">
              {dossier.brandAffinity.map((brand) => (
                <div key={brand.label}>
                  <div className="mb-2 flex items-end justify-between">
                    <p className="font-serif text-2xl tracking-[-0.03em]">{brand.label}</p>
                    <p className="text-sm text-[var(--muted)]">{brand.value}%</p>
                  </div>
                  <div className="h-px bg-[var(--surface-variant)]">
                    <div
                      className="h-px bg-[var(--foreground)]"
                      style={{ width: `${brand.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn className="editorial-card p-12 md:col-span-8" delay={0.14}>
            <p className="eyebrow mb-10">Average Case Size</p>
            <div className="flex flex-col items-center gap-10 md:flex-row md:justify-around">
              <AnalyticsRing value={dossier.caseSize.average} suffix="mm" />
              <div className="grid gap-6 text-center md:text-left">
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Smallest
                  </p>
                  <p className="font-serif text-2xl">{dossier.caseSize.smallest}mm</p>
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    Largest
                  </p>
                  <p className="font-serif text-2xl">{dossier.caseSize.largest}mm</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {dossier.metrics.map((metric, index) => (
            <FadeIn
              key={metric.label}
              className="border-l border-[var(--outline)] px-8 py-6"
              delay={0.08 + index * 0.06}
            >
              <p className="eyebrow mb-4">{metric.label}</p>
              <p className="font-serif text-3xl tracking-[-0.04em]">{metric.value}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{metric.note}</p>
            </FadeIn>
          ))}
        </section>
        <RelatedLinks
          links={[
            { href: "/app/taste-engine", label: "Taste Engine", blurb: "See recommendations shaped by the exact profile emerging here." },
            { href: "/app/collection-score", label: "Collection Score", blurb: "Compare the qualitative dossier with the archive's prestige metrics." },
            { href: "/app/vault-export", label: "Export Archive PDF", blurb: "Move from analysis into the formal report preview and export layer." },
          ]}
        />
      </main>
    </Shell>
  );
}
