import Link from "next/link";
import { AnimatedSection } from "@/components/watch/animated-section";
import { PageHeader } from "@/components/watch/page-header";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { getRouteFlow, journalStories, manuelProfile } from "@/lib/data";

export default function JournalPage() {
  const flow = getRouteFlow("/app/journal")!;
  return (
    <Shell currentPath="/app/journal">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="A curated editorial feed of collection moments, collector notes and pathways deeper into the private archive."
          primaryHref="/app/story"
          secondaryHref="/app/appreciations"
        />
        <section className="grid gap-6 md:grid-cols-2">
          {journalStories.map((story, index) => (
            <AnimatedSection key={story.id} className="editorial-card p-10" delay={index * 0.06}>
              <p className="eyebrow mb-4">Editorial Flow</p>
              <h2 className="headline-title text-[2.1rem]">{story.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{story.summary}</p>
              <Link
                href={story.route}
                className="mt-8 inline-block border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
              >
                Open
              </Link>
            </AnimatedSection>
          ))}
        </section>
        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {manuelProfile.activities.map((activity, index) => (
            <AnimatedSection key={activity.id} className="border-l border-[var(--outline)] px-8 py-6" delay={0.08 + index * 0.04}>
              <p className="eyebrow mb-3">{activity.badge}</p>
              <p className="text-sm leading-7">{activity.description}</p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {activity.relativeTime}
              </p>
            </AnimatedSection>
          ))}
        </section>
        <RelatedLinks
          links={[
            {
              href: "/app/taste-engine",
              label: "Taste Engine",
              blurb: "Recommendations shaped by the exact character of the current archive.",
            },
            {
              href: "/app/similar-collectors",
              label: "Similar Collectors",
              blurb: "Quiet discovery among collectors whose instincts feel closely aligned.",
            },
            {
              href: "/app/story",
              label: "Collection Story",
              blurb: "The longer narrative behind the watches that now define the vault.",
            },
          ]}
        />
      </main>
    </Shell>
  );
}
