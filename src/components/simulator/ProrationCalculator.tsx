import type { ProrationPreview } from "@/src/lib/simulator-data";

type ProrationCalculatorProps = {
  proration?: ProrationPreview;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount / 100);
}

export function ProrationCalculator({
  proration,
}: ProrationCalculatorProps) {
  if (!proration) {
    return (
      <section className="rounded-[1.75rem] border border-dashed border-slate-300 bg-slate-50/80 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Proration Preview
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
          No proration in this scenario
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
          Select an upgrade or downgrade flow to inspect how unused time and
          remaining time affect Stripe billing adjustments.
        </p>
      </section>
    );
  }

  const proratedOldPlan =
    (proration.originalPlanPrice / proration.cycleDays) * proration.daysRemaining;
  const proratedNewPlan =
    (proration.upgradePlanPrice / proration.cycleDays) * proration.daysRemaining;
  const netAmount = proration.prorationCharge - proration.prorationCredit;

  return (
    <section className="rounded-[1.75rem] border border-amber-200 bg-[linear-gradient(180deg,rgba(255,251,235,0.9),rgba(255,255,255,0.95))] p-5 shadow-[0_18px_40px_rgba(245,158,11,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">
            Proration Preview
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            Stripe-style proration breakdown
          </h2>
        </div>
        <span className="rounded-full border border-amber-300 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-amber-800">
          Mid-cycle change
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Metric label="Original plan" value={formatCurrency(proration.originalPlanPrice)} />
        <Metric label="Upgrade plan" value={formatCurrency(proration.upgradePlanPrice)} />
        <Metric label="Days remaining" value={`${proration.daysRemaining} / ${proration.cycleDays}`} />
        <Metric label="Credit" value={formatCurrency(proration.prorationCredit)} />
        <Metric label="Charge" value={formatCurrency(proration.prorationCharge)} />
      </div>

      <div className="mt-5 rounded-[1.25rem] border border-amber-200 bg-white/80 p-4">
        <p className="font-mono text-xs text-slate-500">
          unused_old_plan = ({formatCurrency(proration.originalPlanPrice)} /{" "}
          {proration.cycleDays}) * {proration.daysRemaining} ={" "}
          {formatCurrency(Math.round(proratedOldPlan))}
        </p>
        <p className="mt-2 font-mono text-xs text-slate-500">
          remaining_new_plan = ({formatCurrency(proration.upgradePlanPrice)} /{" "}
          {proration.cycleDays}) * {proration.daysRemaining} ={" "}
          {formatCurrency(Math.round(proratedNewPlan))}
        </p>
        <p className="mt-4 text-sm leading-6 text-slate-700">
          Net immediate invoice impact:{" "}
          <span className="font-semibold text-slate-950">
            {formatCurrency(netAmount)}
          </span>
          . This is a conceptual model of Stripe proration: credit unused time
          on the old price, charge remaining time on the new price, and invoice
          the delta.
        </p>
      </div>
    </section>
  );
}

type MetricProps = {
  label: string;
  value: string;
};

function Metric({ label, value }: MetricProps) {
  return (
    <div className="rounded-[1.1rem] border border-white/70 bg-white p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  );
}
