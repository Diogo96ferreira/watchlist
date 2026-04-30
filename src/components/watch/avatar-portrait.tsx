import Image from "next/image";

type AvatarPortraitProps = {
  src?: string;
  alt: string;
  initials: string;
  className?: string;
};

export function AvatarPortrait({
  src,
  alt,
  initials,
  className = "",
}: AvatarPortraitProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[linear-gradient(145deg,#ece1d2,#d8d2cb)] ${className}`}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="96px" className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
          {initials}
        </div>
      )}
    </div>
  );
}
