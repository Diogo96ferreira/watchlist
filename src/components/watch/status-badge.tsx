import { cn } from "@/lib/utils";
import { ActivityBadge, ArchiveStatus } from "@/lib/data";

const colors: Record<ArchiveStatus | ActivityBadge, string> = {
  Owned: "bg-[#2d5037]",
  Wishlist: "bg-[#8b6b34]",
  Sold: "bg-[#7c7b78]",
  Added: "bg-[#2d5037]",
  Grail: "bg-[#8b6b34]",
  Archived: "bg-[#7c7b78]",
};

export function StatusBadge({
  status,
  compact = false,
}: {
  status: ArchiveStatus | ActivityBadge;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]",
        compact && "pt-1",
      )}
    >
      <span className={cn("h-[6px] w-[6px]", colors[status])} />
      {status}
    </span>
  );
}
