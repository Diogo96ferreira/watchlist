import Link from "next/link";
import { CollectorPreview, getWatchById } from "@/lib/data";
import { AvatarPortrait } from "./avatar-portrait";
import { WatchMedia } from "./watch-media";

export function CollectorCard({ collector }: { collector: CollectorPreview }) {
  return (
    <article className="editorial-card group p-10 transition duration-500 hover:translate-y-[-4px]">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <AvatarPortrait
            src={collector.avatarUrl}
            alt={collector.name}
            initials={collector.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
            className="h-16 w-16"
          />
          <div>
            <h3 className="font-serif text-2xl tracking-[-0.03em]">{collector.name}</h3>
            <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
              {collector.personality}
            </p>
          </div>
        </div>
        <span className="bg-[var(--surface-low)] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
          {collector.overlap}
        </span>
      </div>
      <p className="mb-8 text-sm leading-7 text-[var(--muted)] italic">
        {collector.statement}
      </p>
      <div className="mb-8 grid grid-cols-3 gap-3">
        {collector.previewWatchIds.map((watchId) => {
          const watch = getWatchById(watchId);
          return (
            <div key={watchId} className="editorial-card p-3">
              {watch ? <WatchMedia watch={watch} className="h-24 w-full" sizes="160px" /> : null}
              <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {watch?.brand}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        <Link
          href={`/${collector.username}`}
          className="bg-[var(--foreground)] px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition hover:bg-[var(--muted)]"
        >
          View Collection
        </Link>
        <Link
          href="/app/appreciations"
          className="border px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em] transition hover:bg-[var(--surface-low)]"
        >
          Send Appreciation
        </Link>
      </div>
    </article>
  );
}
