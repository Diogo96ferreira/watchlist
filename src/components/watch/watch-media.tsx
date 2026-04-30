import Image from "next/image";
import { WatchEntry } from "@/lib/data";
import { BLUR_DATA_URL } from "@/lib/image-utils";

type WatchMediaProps = {
  watch: WatchEntry;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
};

export function WatchMedia({
  watch,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
}: WatchMediaProps) {
  return (
    <div
      className={`relative isolate overflow-hidden bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.95),rgba(235,229,222,0.82)_48%,rgba(224,217,209,0.56)_72%,rgba(214,205,196,0.28)_100%)] ${className}`}
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),transparent_24%,rgba(61,53,44,0.08)_100%)]" />
      <div className="absolute inset-x-[12%] top-[8%] z-0 h-[16%] rounded-full bg-white/60 blur-3xl" />
      <div className="absolute inset-x-[16%] bottom-[10%] z-0 h-[16%] rounded-full bg-[rgba(14,16,18,0.12)] blur-2xl" />
      {watch.image ? (
        <Image
          src={watch.image}
          alt={`${watch.brand} ${watch.model}`}
          fill
          priority={priority}
          sizes={sizes}
          quality={75}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className={`relative z-10 object-contain p-6 md:p-8 ${imageClassName}`}
        />
      ) : (
        <div className="watch-image h-full w-full" />
      )}
    </div>
  );
}
