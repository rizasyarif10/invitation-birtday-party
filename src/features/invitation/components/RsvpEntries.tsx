"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import type {
  AttendanceValue,
  RsvpEntry,
} from "@/features/invitation/types";

type RsvpEntriesProps = {
  entries: RsvpEntry[];
};

const attendanceLabels: Record<AttendanceValue, string> = {
  hadir: "Attending",
  "tidak-hadir": "Unable to attend",
};

const RESPONSES_PER_PAGE = 6;

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => void;
};

export function RsvpEntries({ entries }: Readonly<RsvpEntriesProps>) {
  const [visibleCount, setVisibleCount] = useState(RESPONSES_PER_PAGE);

  const updateVisibleCount = (nextCount: number) => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const transitionDocument = document as ViewTransitionDocument;

    if (reduceMotion || !transitionDocument.startViewTransition) {
      setVisibleCount(nextCount);
      return;
    }

    transitionDocument.startViewTransition(() => {
      flushSync(() => setVisibleCount(nextCount));
    });
  };

  if (entries.length === 0) {
    return (
      <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-dashed border-[#d9b98c] bg-white/55 px-6 py-8 text-center">
        <p className="font-playful text-xl font-black text-[#4a2917]">
          No responses yet
        </p>
        <p className="mt-2 text-sm font-medium text-[#87644c]">
          Be the first to share your attendance and warm wishes.
        </p>
      </div>
    );
  }

  const visibleEntries = entries.slice(0, visibleCount);
  const remainingCount = entries.length - visibleEntries.length;
  const nextBatchCount = Math.min(RESPONSES_PER_PAGE, remainingCount);

  return (
    <div className="rsvp-responses-transition mt-14 lg:mt-16">
      <header className="text-center">
        <p className="text-[10px] font-black tracking-[0.24em] text-[#a33d0b] uppercase">
          Guest Responses
        </p>
        <h3 className="font-playful mt-2 text-3xl font-black text-[#31190e] sm:text-4xl">
          Messages from Our Guests
        </h3>
        <p className="mt-2 text-xs font-semibold text-[#87644c]">
          Showing {visibleEntries.length} of {entries.length} responses
        </p>
      </header>

      <ul className="mx-auto mt-7 grid max-w-5xl gap-4 md:grid-cols-2">
        {visibleEntries.map((entry, index) => {
          const isAttending = entry.attendance === "hadir";

          return (
            <li
              key={entry.slug}
              className="rsvp-card-enter rounded-3xl border border-[#e4c495] bg-white p-5 shadow-[0_12px_35px_rgba(91,46,17,0.08)] sm:p-6"
              style={{
                animationDelay: `${(index % RESPONSES_PER_PAGE) * 55}ms`,
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="font-playful flex size-11 shrink-0 items-center justify-center rounded-full bg-[#f6d7aa] text-lg font-black text-[#7d3511]"
                  aria-hidden="true"
                >
                  {entry.displayName.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-playful truncate text-lg font-black text-[#3c2113]">
                    {entry.displayName}
                  </p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-black tracking-wide uppercase ${
                      isAttending
                        ? "bg-[#e1f2d7] text-[#3f6f2b]"
                        : "bg-[#f5dfd7] text-[#9a3f29]"
                    }`}
                  >
                    {attendanceLabels[entry.attendance]}
                  </span>
                </div>
              </div>

              {entry.message && (
                <p className="mt-4 border-t border-[#f0dec3] pt-4 text-sm leading-7 font-medium text-[#73513b]">
                  “{entry.message}”
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {entries.length > RESPONSES_PER_PAGE && (
        <div className="mt-8 flex justify-center">
          {remainingCount > 0 ? (
            <button
              type="button"
              onClick={() =>
                updateVisibleCount(visibleCount + RESPONSES_PER_PAGE)
              }
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#c96424] bg-[#fff8e9] px-6 text-xs font-black tracking-wide text-[#8b3b12] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f9e5c5] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#d86117] active:translate-y-0"
            >
              Show {nextBatchCount} More {nextBatchCount === 1 ? "Response" : "Responses"}
              <span
                className="transition-transform duration-300 group-hover:translate-y-0.5"
                aria-hidden="true"
              >
                ↓
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => updateVisibleCount(RESPONSES_PER_PAGE)}
              className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#c96424] bg-[#fff8e9] px-6 text-xs font-black tracking-wide text-[#8b3b12] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f9e5c5] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#d86117] active:translate-y-0"
            >
              Show Fewer Responses
              <span
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              >
                ↑
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
