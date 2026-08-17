import { useState, type SubmitEvent } from "react";
import { AttendanceDropdown } from "@/features/invitation/components/AttendanceDropdown";
import { RsvpEntries } from "@/features/invitation/components/RsvpEntries";
import { RsvpNotice } from "@/features/invitation/components/RsvpNotice";
import type {
  AttendanceValue,
  Guest,
  RsvpEntry,
  RsvpFeedback,
  RsvpSummary,
} from "@/features/invitation/types";

type RsvpSectionProps = {
  guest: Guest;
  initialRsvp: RsvpSummary | null;
  initialRsvpEntries: RsvpEntry[];
};

export function RsvpSection({
  guest,
  initialRsvp,
  initialRsvpEntries,
}: Readonly<RsvpSectionProps>) {
  const [attendance, setAttendance] = useState<AttendanceValue | "">(
    initialRsvp?.attendance ?? "",
  );
  const [message, setMessage] = useState(initialRsvp?.message ?? "");
  const [attendanceError, setAttendanceError] = useState("");
  const [feedback, setFeedback] = useState<RsvpFeedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedAttendance, setConfirmedAttendance] =
    useState<AttendanceValue | null>(initialRsvp?.attendance ?? null);
  const [rsvpEntries, setRsvpEntries] = useState(initialRsvpEntries);

  const submitRsvp = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!attendance) {
      setFeedback(null);
      setAttendanceError("Please select your attendance response.");
      document.getElementById("attendance-select")?.focus();
      return;
    }

    setAttendanceError("");
    setFeedback(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: guest.slug,
          attendance,
          message,
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setFeedback({
          type: "error",
          message:
            result.message ??
            "Your response could not be saved. Please try again.",
        });
        return;
      }

      setConfirmedAttendance(attendance);
      setRsvpEntries((currentEntries) => [
        {
          slug: guest.slug,
          displayName: guest.displayName,
          attendance,
          message: message.trim(),
        },
        ...currentEntries.filter((entry) => entry.slug !== guest.slug),
      ]);
      setFeedback({
        type: "success",
        message:
          result.message ?? "Thank you! Your response has been saved.",
      });
    } catch {
      setFeedback({
        type: "error",
        message:
          "Unable to connect to the server. Check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      data-reveal
      className="reveal-section relative bg-[#fff8e9] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center lg:mb-14">
          <p className="text-xs font-black tracking-[0.3em] text-[#a33d0b] uppercase">
            RSVP
          </p>
          <h2 className="font-playful mt-3 text-4xl font-black text-[#31190e] sm:text-5xl">
            Will You Join the Fun?
          </h2>
          <p className="mt-4 text-sm font-semibold text-[#765039]">
            Attendance confirmation for <strong>{guest.displayName}</strong>
          </p>
        </header>

        <form
          onSubmit={submitRsvp}
          className="mx-auto max-w-3xl rounded-4xl border border-[#e4c495] bg-white p-6 shadow-[0_20px_60px_rgba(91,46,17,0.1)] sm:p-9"
        >
          <RsvpNotice
            feedback={feedback}
            confirmedAttendance={confirmedAttendance}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-xs font-black tracking-wide text-[#5a341f]">
              <span>Guest name</span>
              <input
                required
                readOnly
                name="guestName"
                type="text"
                value={guest.displayName}
                className="mt-2 min-h-12 w-full cursor-not-allowed rounded-xl border border-[#dfc29c] bg-[#f3eadb] px-4 text-sm font-semibold text-[#65452f] outline-none"
              />
            </label>

            <div className="text-xs font-black tracking-wide text-[#5a341f]">
              <p id="attendance-label">Attendance</p>
              <AttendanceDropdown
                value={attendance}
                hasError={Boolean(attendanceError)}
                disabled={isSubmitting}
                onChange={(value) => {
                  setAttendance(value);
                  setAttendanceError("");
                  setFeedback(null);
                }}
              />
              {attendanceError && (
                <p
                  role="alert"
                  className="mt-2 text-[11px] font-semibold text-[#b33c27]"
                >
                  {attendanceError}
                </p>
              )}
            </div>

            <label
              htmlFor="rsvp-message"
              className="text-xs font-black tracking-wide text-[#5a341f] sm:col-span-2"
            >
              <span className="block">Message, wishes, and prayers</span>
              <textarea
                id="rsvp-message"
                name="message"
                rows={4}
                maxLength={500}
                disabled={isSubmitting}
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setFeedback(null);
                }}
                placeholder="Share your warm wishes for Rezvan and Reivanya..."
                className="mt-2 w-full resize-none rounded-xl border border-[#dfc29c] bg-[#fffaf0] p-4 text-sm font-semibold outline-none transition placeholder:text-[#aa8e78] focus:border-[#cc5a15] focus:ring-4 focus:ring-[#e57b30]/15 disabled:cursor-wait disabled:opacity-65"
              />
              <span className="mt-1 block text-right text-[10px] font-semibold text-[#9a785f]">
                {message.length}/500
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#2d180d] px-7 text-sm font-black text-[#fff6df] shadow-[0_7px_0_#a74512] transition hover:-translate-y-1 hover:bg-[#4a2917] hover:shadow-[0_10px_0_#a74512] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#d86117] active:translate-y-1 active:shadow-[0_3px_0_#a74512] disabled:cursor-wait disabled:translate-y-0 disabled:opacity-70 disabled:shadow-[0_4px_0_#a74512]"
          >
            <span
              aria-hidden="true"
              className={isSubmitting ? "animate-spin" : ""}
            >
              {isSubmitting ? "◌" : "✦"}
            </span>{" "}
            {isSubmitting ? "Sending Response..." : "Send Response"}
          </button>
        </form>

        <RsvpEntries entries={rsvpEntries} />
      </div>
    </section>
  );
}
