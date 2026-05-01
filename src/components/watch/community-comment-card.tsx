import Link from "next/link";
import { CommunityCommentEntry } from "@/lib/data";
import { AvatarPortrait } from "./avatar-portrait";

export function CommunityCommentCard({ entry }: { entry: CommunityCommentEntry }) {
  return (
    <Link href={entry.href} className="editorial-card block p-8 transition duration-500 hover:translate-y-[-4px]">
      <div className="flex items-center gap-4">
        <AvatarPortrait
          src={entry.authorAvatarUrl}
          alt={entry.authorName}
          initials={entry.authorName
            .split(" ")
            .map((part) => part[0])
            .join("")}
          className="h-14 w-14"
        />
        <div>
          <h3 className="font-serif text-[1.5rem] leading-none tracking-[-0.03em]">{entry.authorName}</h3>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            @{entry.authorUsername}
          </p>
        </div>
      </div>
      <p className="eyebrow mt-6">{entry.targetLabel}</p>
      <p className="mt-4 border-l pl-5 font-serif text-[1.35rem] italic leading-8 tracking-[-0.02em] text-[var(--muted)]">
        {entry.comment}
      </p>
      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
        {entry.timestamp}
      </p>
    </Link>
  );
}
