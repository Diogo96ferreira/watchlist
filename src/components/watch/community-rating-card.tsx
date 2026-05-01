import { CommunityRatingEntry } from "@/lib/data";

export function CommunityRatingCard({ rating }: { rating: CommunityRatingEntry }) {
  return (
    <article className="editorial-card p-8">
      <p className="eyebrow mb-4">Collection Rating</p>
      <h3 className="font-serif text-[1.9rem] leading-none tracking-[-0.03em]">{rating.collectionLabel}</h3>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
        {rating.collectorName}
      </p>
      <div className="mt-8 grid gap-4">
        {rating.metrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-2 flex items-end justify-between gap-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                {metric.label}
              </p>
              <p className="font-serif text-xl tracking-[-0.03em]">{metric.value}</p>
            </div>
            <div className="h-2 bg-[rgba(116,120,120,0.12)]">
              <div className="h-full bg-[var(--foreground)]" style={{ width: `${metric.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm leading-7 text-[var(--muted)] italic">{rating.note}</p>
    </article>
  );
}
