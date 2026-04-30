import { PageHeader } from "@/components/watch/page-header";
import { RelatedLinks } from "@/components/watch/related-links";
import { Shell } from "@/components/watch/shell";
import { Timeline } from "@/components/watch/timeline";
import { getRouteFlow, timelineEvents } from "@/lib/data";

export default function StoryPage() {
  const flow = getRouteFlow("/app/story")!;
  return (
    <Shell currentPath="/app/story">
      <main className="page-frame pb-24 pt-28 md:pt-32">
        <PageHeader
          flow={flow}
          description="A journey through time, taste, and craftsmanship."
          primaryHref="/app/journey"
          secondaryHref="/app/showroom-2"
        />
        <section className="section-gap border-y py-16 text-center">
          <blockquote className="font-serif text-4xl italic tracking-[-0.04em] text-[var(--foreground)]">
            “Every collection begins with a single memory.”
          </blockquote>
        </section>
        <Timeline events={timelineEvents} />
        <RelatedLinks
          links={[
            { href: "/app/journey", label: "Journey Through Time", blurb: "See the same narrative reorganized as a visual archive timeline." },
            { href: "/app/showroom", label: "Enter Showroom", blurb: "Move from memory into presentation and browse the watches as objects." },
            { href: "/app/appreciations", label: "Share Story", blurb: "Open appreciations and continue the conversation around the archive." },
          ]}
        />
      </main>
    </Shell>
  );
}
