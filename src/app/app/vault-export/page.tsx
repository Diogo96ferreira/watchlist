import { AnimatedSection } from "@/components/watch/animated-section";
import { PageHeader } from "@/components/watch/page-header";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { getRouteFlow } from "@/lib/data";

export default function VaultExportPage() {
  const flow = getRouteFlow("/app/vault-export")!;
  return (
    <Shell currentPath="/app/vault-export">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="A private dossier of your collection, previewed as a structured archive report before export."
          primaryHref="/app/vault"
          secondaryHref="/app/collection-score"
        />
        <section className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <AnimatedSection className="editorial-card h-fit p-8">
            <p className="eyebrow mb-6">Report Contents</p>
            <ul className="space-y-5 text-sm">
              {["Collection Summary", "Market Value", "Watch History", "Servicing Notes", "Grail Status"].map((item) => (
                <li key={item} className="flex items-center justify-between gap-3">
                  <span>{item}</span>
                  <span className="text-[var(--muted)]">Ready</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection className="editorial-card min-h-[1100px] bg-white p-12 md:p-20">
            <div className="mb-20 flex items-start justify-between">
              <div>
                <p className="eyebrow mb-2">Watch List Archive</p>
                <p className="text-sm text-[var(--muted)]">ID: WL-MCP-2026-001</p>
              </div>
              <div className="text-right">
                <p className="eyebrow mb-2">Generated On</p>
                <p className="text-sm">April 30, 2026</p>
              </div>
            </div>
            {[
              "Collection Summary",
              "Market Value",
              "Watch History",
              "Servicing Notes",
              "Grail Status",
            ].map((section, index) => (
              <div key={section} className="mb-16">
                <div className="mb-6 flex items-baseline gap-4">
                  <span className="eyebrow">Sec. {String(index + 1).padStart(2, "0")}</span>
                  <h2 className="headline-title text-[2rem]">{section}</h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
                  Preview content for {section.toLowerCase()}, framed inside the archive-style report layout and ready to become a real Supabase-backed export later.
                </p>
              </div>
            ))}
          </AnimatedSection>
        </section>
        <div className="mt-16 flex justify-center">
          <button className="bg-[var(--foreground)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
            Export Archive PDF
          </button>
        </div>
        <RelatedLinks
          links={[
            { href: "/app/vault", label: "Back to Vault", blurb: "Return to the archive home and continue from the signed-in landing page." },
            { href: "/app/collection-score", label: "Open Collection Score", blurb: "Review the quantitative prestige layer before export." },
            { href: "/app/journey", label: "Journey Through Time", blurb: "Cross-check the report against the collection's narrative timeline." },
          ]}
        />
      </main>
    </Shell>
  );
}
