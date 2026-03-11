export function MethodologyNote() {
  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(240,249,255,0.95),rgba(255,255,255,0.98))] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
        Methodology
      </p>
      <div className="mt-3 space-y-3 text-sm leading-6 text-slate-700">
        <p>
          This calculator uses a day-based approximation to explain proration
          behavior, not Stripe&apos;s exact billing engine.
        </p>
        <p>
          Stripe calculates prorations from timestamps and the exact seconds
          remaining in the billing period, and invoice currency amounts are
          derived from those second-level calculations.
        </p>
        <p>
          Exact parity with Stripe will be validated in a later iteration using
          Stripe test mode.
        </p>
      </div>
    </section>
  );
}
