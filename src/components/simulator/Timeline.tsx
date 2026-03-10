import type { TimelineEvent } from "@/src/lib/simulator-data";
import { TimelineEventCard } from "@/src/components/simulator/TimelineEventCard";

type TimelineProps = {
  events: TimelineEvent[];
  selectedEventId: string;
  onSelectEvent: (eventId: string) => void;
};

export function Timeline({
  events,
  selectedEventId,
  onSelectEvent,
}: TimelineProps) {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
            Timeline
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
            Billing events in execution order
          </h2>
        </div>
        <div className="shrink-0 self-start rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
          {events.length} events
        </div>
      </div>
      <div className="relative mt-6 w-full max-w-3xl space-y-4 before:absolute before:bottom-4 before:left-[11px] before:top-4 before:w-px before:bg-gradient-to-b before:from-cyan-300 before:to-slate-200">
        {events.map((event) => (
          <div key={event.id} className="relative w-full pl-8">
            <div className="absolute left-0 top-6 h-[22px] w-[22px] rounded-full border-4 border-white bg-cyan-500 shadow-[0_0_0_1px_rgba(14,116,144,0.2)]" />
            <TimelineEventCard
              event={event}
              isSelected={event.id === selectedEventId}
              onSelect={onSelectEvent}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
