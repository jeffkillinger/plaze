import { ButtonLink } from "@/src/components/landing/button-link";
import { Container } from "@/src/components/ui/container";
import { defaultScenario } from "@/src/lib/simulator-data";

export function LandingPage() {
  return (
    <main id="top" className="min-h-screen bg-transparent py-8 sm:py-10">
      <Container>
        <header className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="text-lg font-semibold tracking-tight text-slate-950">
              Plaze
            </span>
            <ButtonLink href="/simulator">Open the Simulator</ButtonLink>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-700">
                Stripe Subscription Lifecycle Visualizer
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Understand exactly how Stripe Billing behaves across the full
                subscription lifecycle.
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Plaze is a developer tool for exploring subscription events,
                invoice generation, proration behavior, payment attempts, dunning
                retries, billing anchors, and webhook ordering.
              </p>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                The simulator is the product. Pick a scenario, inspect the event
                timeline, and compare the mocked webhook payloads with the Stripe
                behavior you expect to implement.
              </p>
              <div className="mt-8">
                <ButtonLink href="/simulator">Open the Simulator</ButtonLink>
              </div>
            </div>

            <section className="rounded-[1.8rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(8,145,178,0.08),rgba(255,255,255,0.96))] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
                    Simulator Preview
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
                    {defaultScenario.title}
                  </h2>
                </div>
                <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-600">
                  screenshot-style
                </span>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.25rem] border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-semibold text-slate-950">
                    Timeline snapshot
                  </p>
                  <div className="mt-4 space-y-3">
                    {defaultScenario.timeline.slice(0, 4).map((event) => (
                      <div
                        key={event.id}
                        className="rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-slate-950">
                            {event.name}
                          </p>
                          <span className="font-mono text-xs text-cyan-700">
                            {event.stripeEvent}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-5 text-slate-500">
                          {event.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-4 text-white">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Webhook log
                    </p>
                    <ul className="mt-3 space-y-2 font-mono text-sm text-cyan-100">
                      {defaultScenario.eventLog.slice(0, 4).map((eventName) => (
                        <li
                          key={eventName}
                          className="rounded-lg border border-white/8 bg-white/5 px-3 py-2"
                        >
                          {eventName}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[1.25rem] border border-amber-200 bg-amber-50/80 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-amber-700">
                      Proration delta
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                      $36.00
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Upgrade preview: unused starter time is credited, remaining
                      growth time is charged, and Stripe invoices the net amount.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </header>
      </Container>
    </main>
  );
}
