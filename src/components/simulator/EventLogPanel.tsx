import type { TimelineEvent } from "@/src/lib/simulator-data";

type EventLogPanelProps = {
  eventLog: string[];
  selectedEvent: TimelineEvent;
};

export function EventLogPanel({
  eventLog,
  selectedEvent,
}: EventLogPanelProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
        Stripe Event Log
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">
        Webhooks emitted by this scenario
      </h2>

      <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
          Delivery order
        </p>
        <ul className="mt-3 space-y-2 font-mono text-sm text-cyan-100">
          {eventLog.map((eventName, index) => (
            <li
              key={`${eventName}-${index}`}
              className="flex items-center gap-3 rounded-xl border border-white/6 bg-black/10 px-3 py-2"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[11px] text-slate-300">
                {index + 1}
              </span>
              <span>{eventName}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-[#07111f] p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Selected event payload
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              {selectedEvent.stripeEvent}
            </p>
          </div>
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cyan-200">
            {selectedEvent.objectType}
          </span>
        </div>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-white/6 bg-black/20 p-4 text-xs leading-6 text-slate-200">
          <code>{JSON.stringify(selectedEvent.payload, null, 2)}</code>
        </pre>
      </div>
    </section>
  );
}
