import Link from "next/link";
import { AnimatedSection } from "@/components/watch/animated-section";
import { AvatarPortrait } from "@/components/watch/avatar-portrait";
import { PageHeader } from "@/components/watch/page-header";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { appreciations, getRouteFlow } from "@/lib/data";

export default function AppreciationsPage() {
  const flow = getRouteFlow("/app/appreciations")!;

  return (
    <Shell currentPath="/app/appreciations">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="Small notes of admiration from fellow collectors."
          primaryHref="/app/journal"
          secondaryHref="/manuel-canelas-pais"
        />
        <div className="space-y-0">
          {appreciations.map((entry, index) => (
            <AnimatedSection
              key={entry.id}
              className="grid gap-6 border-t py-10 md:grid-cols-12"
              delay={index * 0.05}
            >
              <div className="md:col-span-1">
                <AvatarPortrait
                  src={entry.senderAvatarUrl}
                  alt={entry.senderName}
                  initials={entry.senderName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                  className="h-12 w-12"
                />
              </div>
              <div className="md:col-span-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--foreground)]">
                  {entry.senderName}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">{entry.senderRole}</p>
              </div>
              <div className="md:col-span-6">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="bg-[var(--secondary)] px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-white">
                    {entry.reaction}
                  </span>
                  <span className="text-sm text-[var(--muted)]">-</span>
                  <Link
                    href={`/app/watch/${entry.watchId}`}
                    className="font-serif text-xl tracking-[-0.03em]"
                  >
                    {entry.watchLabel}
                  </Link>
                </div>
                <p className="text-[15px] leading-8">{entry.comment}</p>
              </div>
              <div className="md:col-span-2 md:text-right">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  {entry.date}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <button className="bg-[var(--foreground)] px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
            Reply With Appreciation
          </button>
        </div>
        <RelatedLinks
          links={[
            {
              href: "/app/journal",
              label: "Back to Journal",
              blurb: "Return to the editorial feed and continue browsing collection moments.",
            },
            {
              href: "/app/similar-collectors",
              label: "View Sender Profiles",
              blurb: "Discover the collectors behind the notes of admiration.",
            },
            {
              href: "/app/showroom",
              label: "View Referenced Watches",
              blurb: "Re-enter the visual browsing layer to revisit the appreciated pieces.",
            },
          ]}
        />
      </main>
    </Shell>
  );
}
