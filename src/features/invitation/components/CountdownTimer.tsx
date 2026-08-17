import { EVENT } from "@/features/invitation/config/event";
import { useCountdown } from "@/features/invitation/hooks/useCountdown";

export function CountdownTimer() {
  const countdown = useCountdown();

  return (
    <>
      {/* The lg:grid-cols-2 / xl:grid-cols-4 pair existed only because this card
          used to be a narrow side column; full width keeps all four in a row. */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {countdown.map((item) => (
          <div
            key={item.label}
            data-reveal-item
            className="rounded-2xl border border-[#8f5a35] bg-[#4a2918] px-2 py-5 text-center"
          >
            {/* Keyed on the value so React remounts it on each change, which
                restarts the tick animation. Unchanged units stay still. */}
            <strong
              key={item.value}
              className="countdown-value font-playful block text-3xl text-[#ffad42] sm:text-4xl"
            >
              {item.value}
            </strong>
            <span className="mt-2 block text-[9px] font-black tracking-[0.16em] text-[#f8d3a3] uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs leading-relaxed text-[#d9b58d]">
        {EVENT.dateLabel} · {EVENT.timeLabel}
      </p>
    </>
  );
}
