import { useState, type SubmitEvent } from "react";
import { AttendanceDropdown } from "@/features/invitation/components/AttendanceDropdown";
import { RsvpNotice } from "@/features/invitation/components/RsvpNotice";
import type {
  AttendanceValue,
  Guest,
  RsvpFeedback,
  RsvpSummary,
} from "@/features/invitation/types";

type RsvpSectionProps = {
  guest: Guest;
  initialRsvp: RsvpSummary | null;
};

export function RsvpSection({
  guest,
  initialRsvp,
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

  const submitRsvp = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!attendance) {
      setFeedback(null);
      setAttendanceError("Silakan pilih konfirmasi kehadiran.");
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
            "Konfirmasi belum dapat disimpan. Silakan coba lagi.",
        });
        return;
      }

      setConfirmedAttendance(attendance);
      setFeedback({
        type: "success",
        message:
          result.message ?? "Terima kasih! Konfirmasi Anda sudah tersimpan.",
      });
    } catch {
      setFeedback({
        type: "error",
        message:
          "Tidak dapat terhubung ke server. Periksa koneksi lalu coba kembali.",
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
            Konfirmasi Kehadiran
          </p>
          <h2 className="font-playful mt-3 text-4xl font-black text-[#31190e] sm:text-5xl">
            Will You Join the Fun?
          </h2>
          <p className="mt-4 text-sm font-semibold text-[#765039]">
            Konfirmasi kehadiran untuk <strong>{guest.displayName}</strong>
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <form
            onSubmit={submitRsvp}
            className="rounded-4xl border border-[#e4c495] bg-white p-6 shadow-[0_20px_60px_rgba(91,46,17,0.1)] sm:p-9"
          >
            <RsvpNotice
              feedback={feedback}
              confirmedAttendance={confirmedAttendance}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-black tracking-wide text-[#5a341f]">
                <span>Nama tamu</span>
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
                <p id="attendance-label">Kehadiran</p>
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
                <span className="block">Keterangan, ucapan dan doa</span>
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
                  placeholder="Tuliskan ucapan terbaik untuk Rezvan dan Reivanya..."
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
              {isSubmitting ? "Mengirim Konfirmasi..." : "Kirim Konfirmasi"}
            </button>
          </form>

          <aside className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-4xl bg-[#df6b1c] p-8 text-center text-[#2b160c] shadow-[0_20px_60px_rgba(105,48,13,0.18)]">
            <span
              className="absolute top-6 left-7 animate-float-slow text-4xl opacity-50"
              aria-hidden="true"
            >
              🦇
            </span>
            <span
              className="absolute right-7 bottom-6 animate-float-reverse text-5xl opacity-70"
              aria-hidden="true"
            >
              🎃
            </span>
            <div className="relative max-w-sm">
              <div
                className="mx-auto flex size-20 animate-gift items-center justify-center rounded-3xl border border-[#7c3210]/15 bg-[#fff1d4] text-4xl shadow-lg"
                aria-hidden="true"
              >
                🎁
              </div>
              <p className="mt-7 text-[10px] font-black tracking-[0.2em] uppercase">
                Informasi Hadiah · Opsional
              </p>
              <h3 className="font-playful mt-2 text-3xl font-black">
                Your Presence Is the Present
              </h3>
              <p className="mt-4 text-sm leading-7 font-semibold text-[#5a2b13]">
                Kehadiran dan doa Anda merupakan hadiah terindah bagi Rezvan dan
                Reivanya.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
