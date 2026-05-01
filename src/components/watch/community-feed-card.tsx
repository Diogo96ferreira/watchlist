import Link from "next/link";
import { CommunityFeedEntry, getWatchById } from "@/lib/data";
import { AvatarPortrait } from "./avatar-portrait";
import { StatusBadge } from "./status-badge";
import { WatchMedia } from "./watch-media";

export function CommunityFeedCard({ entry }: { entry: CommunityFeedEntry }) {
  const watch = entry.watchId ? getWatchById(entry.watchId) : undefined;

  return (
    <Link
      href={entry.href}
      className="editorial-card group flex h-full flex-col p-8 transition duration-500 hover:translate-y-[-4px]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <AvatarPortrait
            src={entry.actorAvatarUrl}
            alt={entry.actorName}
            initials={entry.actorName
              .split(" ")
              .map((part) => part[0])
              .join("")}
            className="h-14 w-14"
          />
          <div>
            <p className="font-serif text-[1.55rem] leading-none tracking-[-0.03em]">{entry.actorName}</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              @{entry.actorUsername}
            </p>
          </div>
        </div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          {entry.timestamp}
        </p>
      </div>
      <div className="mt-6">
        <StatusBadge status={entry.action === "Grail Call" ? "Grail" : "Added"} />
      </div>
      <h3 className="mt-5 font-serif text-[1.9rem] leading-tight tracking-[-0.03em]">{entry.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{entry.body}</p>
      {watch ? (
        <div className="mt-auto grid grid-cols-[120px_1fr] gap-4 pt-6">
          <WatchMedia watch={watch} className="h-32" sizes="160px" />
          <div className="flex flex-col justify-center">
            <p className="eyebrow mb-2">{watch.status}</p>
            <p className="font-serif text-[1.35rem] leading-none tracking-[-0.03em]">
              {watch.brand} {watch.model}
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{watch.note ?? watch.story}</p>
          </div>
        </div>
      ) : null}
    </Link>
  );
}
