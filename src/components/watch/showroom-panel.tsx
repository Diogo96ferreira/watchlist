import Link from "next/link";
import { WatchEntry } from "@/lib/data";
import { StatusBadge } from "./status-badge";
import { WatchMedia } from "./watch-media";

export function ShowroomPanel({
  watch,
  compact,
}: {
  watch: WatchEntry;
  compact?: boolean;
}) {
  return (
    <section className="grid min-h-screen items-center gap-8 py-24 md:grid-cols-[0.9fr_1.3fr_0.7fr]">
      <div className="space-y-6">
        <p className="eyebrow">Showroom Edit</p>
        <h2 className={compact ? "headline-title" : "display-title"}>{watch.model}</h2>
        <p className="max-w-md text-[15px] leading-8 text-[var(--muted)]">{watch.story}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-2">Reference</p>
            <p className="font-serif text-2xl">{watch.reference}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Case Size</p>
            <p className="font-serif text-2xl">{watch.caseSize}mm</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge status={watch.status} />
          {watch.has3d ? (
            <span className="border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]">
              3D View
            </span>
          ) : null}
        </div>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.8),transparent_58%)] blur-3xl" />
        <div className="editorial-card h-[72vh] w-full max-w-[560px] p-4">
          <WatchMedia
            watch={watch}
            className="h-full w-full"
            sizes="(max-width: 768px) 100vw, 560px"
            priority={compact}
          />
        </div>
      </div>
      <div className="space-y-5">
        <div className="editorial-card p-6">
          <p className="eyebrow mb-3">Craft Note</p>
          <p className="text-sm leading-7 text-[var(--muted)]">{watch.note ?? watch.story}</p>
        </div>
        <Link
          href={`/app/watch/${watch.id}`}
          className="block border-b border-[var(--foreground)] pb-1 text-[11px] font-semibold uppercase tracking-[0.24em]"
        >
          Open Watch Detail
        </Link>
      </div>
    </section>
  );
}
