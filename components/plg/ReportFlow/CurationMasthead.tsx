// Shared header for the topic/prompt curation screens (PLG-03, Steps 4-6): these run in
// the foreground before any report exists, so — unlike the finished report's hero — this is
// just the brand name plus a working title, not tied to any nav selection.
export function CurationMasthead({ brand }: { brand: string }) {
  return (
    <div className="px-6 pb-2 pt-11 text-center">
      <div className="mx-auto mb-3 inline-flex items-center rounded-full border border-[var(--plg-hair)] bg-[var(--plg-surface)] px-3.5 py-1.5 text-[12.5px] font-semibold text-[var(--plg-ink)]">
        {brand}
      </div>
      <h1 className="text-2xl font-bold text-[var(--plg-ink)] sm:text-[26px]">
        {brand} Alexa AI visibility report
      </h1>
    </div>
  );
}
