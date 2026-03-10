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

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-cyan-700">
                Stripe Subscription Lifecycle Visualizer
              </p>
              <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">
                Understand exactly how Stripe Billing behaves across the full
                subscription lifecycle.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                Simulate subscription events, invoices, prorations, payment
                attempts, and webhook ordering without guessing how the billing
                sequence unfolds.
              </p>
              <p className="mt-4 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                Plaze is a developer tool for exploring subscription events,
                invoice generation, proration behavior, dunning retries, billing
                anchors, and the event payloads your product logic has to handle.
              </p>
            </div>

            <section className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(8,145,178,0.08),rgba(255,255,255,0.96))] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
                    Simulator Preview
                  </p>
                  <h2 className="mt-2 max-w-sm break-words text-xl font-semibold tracking-tight text-slate-950">
                    {defaultScenario.title}
                  </h2>
                </div>
                <span className="shrink-0 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-600">
                  screenshot-style
                </span>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                <div className="min-w-0 rounded-[1.25rem] border border-slate-200 bg-white/90 p-4">
                  <p className="text-sm font-semibold text-slate-950">
                    Timeline snapshot
                  </p>
                  <div className="mt-4 space-y-4">
                    {defaultScenario.timeline.slice(0, 4).map((event) => (
                      <div
                        key={event.id}
                        className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="max-w-[14rem] break-words text-sm font-medium text-slate-950">
                            {event.name}
                          </p>
                          <span className="max-w-[10rem] truncate font-mono text-xs text-cyan-700">
                            {event.stripeEvent}
                          </span>
                        </div>
                        <p className="mt-2 break-words text-xs leading-5 text-slate-500">
                          {event.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="min-w-0 space-y-4">
                  <div className="rounded-[1.25rem] border border-slate-200 bg-slate-950 p-4 text-white">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Webhook log
                    </p>
                    <ul className="mt-3 space-y-2 font-mono text-sm text-cyan-100">
                      {defaultScenario.eventLog.slice(0, 4).map((eventName) => (
                        <li
                          key={eventName}
                          className="truncate overflow-hidden rounded-lg border border-white/8 bg-white/5 px-3 py-2"
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
