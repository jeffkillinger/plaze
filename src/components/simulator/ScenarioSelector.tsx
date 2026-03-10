import type { SimulationScenario } from "@/src/lib/simulator-data";

type ScenarioSelectorProps = {
  scenarios: SimulationScenario[];
  selectedScenarioId: string;
  onSelect: (scenarioId: string) => void;
};

export function ScenarioSelector({
  scenarios,
  selectedScenarioId,
  onSelect,
}: ScenarioSelectorProps) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
            Scenario Selector
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            Pick a Stripe billing path
          </h2>
        </div>
        <div className="self-start rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
          {scenarios.length} presets
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {scenarios.map((scenario) => {
          const isActive = scenario.id === selectedScenarioId;

          return (
            <button
              key={scenario.id}
              type="button"
              onClick={() => onSelect(scenario.id)}
              className={`w-full rounded-[1.25rem] border px-4 py-4 text-left transition-all ${
                isActive
                  ? "border-cyan-500 bg-cyan-50/80 shadow-sm"
                  : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white"
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="break-words text-sm font-semibold text-slate-950">
                    {scenario.title}
                  </p>
                  <p className="mt-2 break-words text-sm leading-6 text-slate-600">
                    {scenario.summary}
                  </p>
                </div>
                <span className="self-start rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  {scenario.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
