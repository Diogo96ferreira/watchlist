export function LoadingChronograph() {
  return (
    <div className="fixed inset-0 z-[120] flex min-h-screen items-center justify-center bg-[rgba(250,249,247,0.96)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(233,222,207,0.55),transparent_34%),linear-gradient(180deg,#fbfaf7_0%,#f8f6f2_100%)]" />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="chronograph-loader">
          <div className="chronograph-loader__dial">
            <div className="chronograph-loader__ticks" />
            <div className="chronograph-loader__subdial chronograph-loader__subdial--left" />
            <div className="chronograph-loader__subdial chronograph-loader__subdial--right" />
            <div className="chronograph-loader__hand" />
            <div className="chronograph-loader__pin" />
          </div>
        </div>
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.34em] text-[var(--muted)]">
          Calibrating the archive
        </p>
        <p className="mt-4 max-w-sm font-serif text-2xl italic tracking-[-0.03em] text-[var(--foreground)]">
          The next chapter is being wound into place.
        </p>
      </div>
    </div>
  );
}
