import { WatchEntry } from "@/lib/data";
import { WatchMedia } from "./watch-media";

export function WatchImagePanel({
  watch,
  tall,
  className = "",
  priority,
}: {
  watch: WatchEntry;
  tall?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`editorial-card p-4 ${className}`}>
      <WatchMedia
        watch={watch}
        priority={priority}
        className={`w-full ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}
      />
    </div>
  );
}
