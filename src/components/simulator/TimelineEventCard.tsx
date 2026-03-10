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
      className={`relative block w-full overflow-hidden rounded-lg border p-5 text-left transition-all ${
        isSelected
          ? "border-cyan-500 bg-white shadow-[0_16px_30px_rgba(8,145,178,0.12)]"
          : "border-slate-200 bg-white/85 hover:border-slate-300 hover:bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 w-full max-w-[420px]">
          <p className="whitespace-normal break-words text-sm font-semibold text-slate-950">
            {event.name}
          </p>
          <p className="mt-1 truncate overflow-hidden text-ellipsis font-mono text-xs text-cyan-700">
            {event.stripeEvent}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600">
          {event.objectType}
        </span>
      </div>
      <p className="mt-4 break-words text-sm text-slate-500">
        {event.timestamp}
      </p>
      <p className="mt-3 whitespace-normal break-words text-sm leading-6 text-slate-600">
        {event.description}
      </p>
    </button>
  );
}
