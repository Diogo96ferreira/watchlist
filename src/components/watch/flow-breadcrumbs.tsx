import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FlowConfig, getSectionRoute } from "@/lib/data";

export function FlowBreadcrumbs({ flow }: { flow: FlowConfig }) {
  const sectionHref = getSectionRoute(flow.section);

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
      <Link href={sectionHref}>{flow.section}</Link>
      <ChevronRight className="h-3 w-3" />
      <span className="text-[var(--foreground)]">{flow.title}</span>
    </div>
  );
}
