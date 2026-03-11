import type { ChangeEvent } from "react";
import type { ProrationInput } from "@/src/lib/calculate-proration-approximation";

type ProrationFormProps = {
  value: ProrationInput;
  onChange: (nextValue: ProrationInput) => void;
};

type FieldConfig = {
  key: keyof ProrationInput;
  label: string;
  min: number;
  step: number;
  helper: string;
};

const fields: FieldConfig[] = [
  {
    key: "oldPriceMonthly",
    label: "Old monthly price",
    min: 0,
    step: 0.01,
    helper: "Monthly price before the plan change.",
  },
  {
    key: "newPriceMonthly",
    label: "New monthly price",
    min: 0,
    step: 0.01,
    helper: "Monthly price after the plan change.",
  },
  {
    key: "cycleDays",
    label: "Billing cycle length in days",
    min: 1,
    step: 1,
    helper: "This approximation assumes a monthly billing cycle.",
  },
  {
    key: "changeDay",
    label: "Change day within cycle",
    min: 0,
    step: 1,
    helper: "Day count already used in the current cycle.",
  },
];

export function ProrationForm({ value, onChange }: ProrationFormProps) {
  function handleChange(
    key: keyof ProrationInput,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const numericValue = Number(event.target.value);
    onChange({
      ...value,
      [key]: Number.isFinite(numericValue) ? numericValue : 0,
    });
  }

  return (
    <section className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
            Input Form
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            Plan Change Proration Explainer
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Estimate the invoice impact of moving from an old plan to a new
            plan partway through a monthly billing cycle.
          </p>
        </div>
        <div className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-800">
          Educational approximation
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label
            key={field.key}
            className="block rounded-[1.1rem] border border-slate-200 bg-slate-50/80 p-4"
          >
            <span className="text-sm font-medium text-slate-900">
              {field.label}
            </span>
            <input
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              type="number"
              min={field.min}
              step={field.step}
              value={value[field.key]}
              onChange={(event) => handleChange(field.key, event)}
            />
            <span className="mt-2 block text-xs leading-5 text-slate-500">
              {field.helper}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
