"use client";

import { useState } from "react";
import { Container } from "@/src/components/ui/container";
import { EventLogPanel } from "@/src/components/simulator/EventLogPanel";
import { ProrationCalculator } from "@/src/components/simulator/ProrationCalculator";
import { ScenarioSelector } from "@/src/components/simulator/ScenarioSelector";
import { Timeline } from "@/src/components/simulator/Timeline";
import { defaultScenario, simulationScenarios } from "@/src/lib/simulator-data";

export function SimulatorShell() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(defaultScenario.id);
  const selectedScenario =
    simulationScenarios.find((scenario) => scenario.id === selectedScenarioId) ??
    defaultScenario;

  const [selectedEventId, setSelectedEventId] = useState(
    selectedScenario.timeline[0]?.id ?? "",
  );

  const selectedEvent =
    selectedScenario.timeline.find((event) => event.id === selectedEventId) ??
    selectedScenario.timeline[0];

  function handleScenarioSelect(scenarioId: string) {
    const scenario =
      simulationScenarios.find((item) => item.id === scenarioId) ?? defaultScenario;

    setSelectedScenarioId(scenario.id);
    setSelectedEventId(scenario.timeline[0]?.id ?? "");
  }

  return (
    <main className="min-h-screen bg-transparent py-8 sm:py-10">
      <Container>
        <header className="rounded-[2rem] border border-slate-200 bg-white/70 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-700">
              Stripe Billing Simulator
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Inspect subscription state transitions before they surprise you in
              production.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Plaze models subscription lifecycle events, invoice creation,
              payment collection, retries, webhook order, and proration math in
              one developer-facing surface.
            </p>
          </div>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-12">
          <div className="min-w-0 xl:col-span-4">
            <ScenarioSelector
              scenarios={simulationScenarios}
              selectedScenarioId={selectedScenario.id}
              onSelect={handleScenarioSelect}
            />
          </div>

          <div className="min-w-0 space-y-6 xl:col-span-8">
            <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,rgba(8,145,178,0.08),rgba(255,255,255,0.92))] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
                Active Scenario
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                {selectedScenario.title}
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                {selectedScenario.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-8">
              <div className="min-w-0 xl:col-span-4">
                <Timeline
                  events={selectedScenario.timeline}
                  selectedEventId={selectedEvent.id}
                  onSelectEvent={setSelectedEventId}
                />
              </div>
              <div className="min-w-0 xl:col-span-4">
                <EventLogPanel
                  eventLog={selectedScenario.eventLog}
                  selectedEvent={selectedEvent}
                />
              </div>
            </div>

            <ProrationCalculator />
          </div>
        </section>
      </Container>
    </main>
  );
}
