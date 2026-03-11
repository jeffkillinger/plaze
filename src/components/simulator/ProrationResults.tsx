import type {
  ProrationCalculationResult,
  ProrationInput,
  ProrationResult,
} from "@/src/lib/calculate-proration-approximation";

type ProrationResultsProps = {
  input: ProrationInput;
  calculation: ProrationCalculationResult;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatRate(amount: number) {
  return `${formatCurrency(amount)}/day`;
}

function formatDirection(direction: ProrationResult["changeDirection"]) {
  if (direction === "no_change") {
    return "no change";
  }

  return direction;
}

function SummaryCard({ result }: { result: ProrationResult }) {
  if (result.resultType === "amount_due") {
    return (
      <div className="rounded-[1.25rem] border border-amber-200 bg-amber-50/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
          Estimated amount due
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          {formatCurrency(result.netProrationAmount)}
        </p>
      </div>
    );
  }

  if (result.resultType === "credit") {
    return (
      <div className="rounded-[1.25rem] border border-emerald-200 bg-emerald-50/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
          Estimated credit created
        </p>
        <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
          {formatCurrency(Math.abs(result.netProrationAmount))}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
        No net proration adjustment
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
        {formatCurrency(0)}
      </p>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200/80 py-3 last:border-b-0 last:pb-0">
      <dt className="min-w-0 text-sm text-slate-500">{label}</dt>
      <dd className="shrink-0 text-right text-sm font-medium text-slate-950">
        {value}
      </dd>
    </div>
  );
}

export function ProrationResults({
  input,
  calculation,
}: ProrationResultsProps) {
  if (!calculation.ok) {
    return (
      <section className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50/90 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Results Panel
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
          No proration calculated
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          {calculation.message}
        </p>
      </section>
    );
  }

  const { result } = calculation;

  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
            Results Panel
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Estimated invoice impact
          </h2>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
          Net result
        </div>
      </div>

      <div className="mt-6">
        <SummaryCard result={result} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/70 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
            Scenario
          </h3>
          <dl className="mt-3">
            <DataRow
              label="Old plan price"
              value={formatCurrency(input.oldPriceMonthly)}
            />
            <DataRow
              label="New plan price"
              value={formatCurrency(input.newPriceMonthly)}
            />
            <DataRow label="Change day" value={`${input.changeDay}`} />
            <DataRow
              label="Billing cycle length"
              value={`${input.cycleDays} days`}
            />
            <DataRow
              label="Change type"
              value={formatDirection(result.changeDirection)}
            />
          </dl>
        </div>

        <div className="rounded-[1.25rem] border border-slate-200 bg-slate-50/70 p-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-700">
            Breakdown
          </h3>
          <dl className="mt-3">
            <DataRow label="Days used" value={`${result.daysUsed}`} />
            <DataRow label="Days remaining" value={`${result.daysRemaining}`} />
            <DataRow
              label="Old plan daily rate"
              value={formatRate(result.oldDailyRate)}
            />
            <DataRow
              label="New plan daily rate"
              value={formatRate(result.newDailyRate)}
            />
            <DataRow
              label="Unused old plan credit"
              value={formatCurrency(result.unusedOldPlanCredit)}
            />
            <DataRow
              label="Remaining new plan charge"
              value={formatCurrency(result.remainingNewPlanCharge)}
            />
            <DataRow
              label="Net proration amount"
              value={formatCurrency(result.netProrationAmount)}
            />
          </dl>
        </div>
      </div>

      <div className="mt-6 rounded-[1.25rem] border border-slate-200 bg-slate-950 p-4 text-slate-100">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
          Formula Breakdown
        </h3>
        <div className="mt-4 space-y-4 overflow-x-auto font-mono text-xs leading-6 sm:text-sm">
          <div>
            <p className="text-slate-300">Unused old plan credit</p>
            <p>
              ({formatCurrency(input.oldPriceMonthly)} / {input.cycleDays}) x{" "}
              {result.daysRemaining} ={" "}
              {formatCurrency(result.unusedOldPlanCredit)}
            </p>
          </div>
          <div>
            <p className="text-slate-300">Remaining new plan charge</p>
            <p>
              ({formatCurrency(input.newPriceMonthly)} / {input.cycleDays}) x{" "}
              {result.daysRemaining} ={" "}
              {formatCurrency(result.remainingNewPlanCharge)}
            </p>
          </div>
          <div>
            <p className="text-slate-300">Net proration</p>
            <p>
              {formatCurrency(result.remainingNewPlanCharge)} -{" "}
              {formatCurrency(result.unusedOldPlanCredit)} ={" "}
              {formatCurrency(result.netProrationAmount)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
