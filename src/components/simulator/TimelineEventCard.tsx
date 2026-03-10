import type { TimelineEvent } from "@/src/lib/simulator-data";

type TimelineEventCardProps = {
  event: TimelineEvent;
  isSelected: boolean;
  onSelect: (eventId: string) => void;
};

export function TimelineEventCard({
  event,
  isSelected,
  onSelect,
}: TimelineEventCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(event.id)}
      className={`relative w-full rounded-[1.25rem] border p-4 text-left transition-all ${
        isSelected
          ? "border-cyan-500 bg-white shadow-[0_16px_30px_rgba(8,145,178,0.12)]"
          : "border-slate-200 bg-white/85 hover:border-slate-300 hover:bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">{event.name}</p>
          <p className="mt-1 font-mono text-xs text-cyan-700">
            {event.stripeEvent}
          </p>
        </div>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-600">
          {event.objectType}
        </span>
      </div>
      <p className="mt-4 text-sm text-slate-500">{event.timestamp}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{event.description}</p>
    </button>
  );
}
