export function InsightCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="border-t border-[var(--outline)] pt-5">
      <p className="font-serif text-2xl tracking-[-0.03em]">{title}</p>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{body}</p>
    </div>
  );
}
