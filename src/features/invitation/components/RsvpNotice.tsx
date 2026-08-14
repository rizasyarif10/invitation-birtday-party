import type {
  AttendanceValue,
  RsvpFeedback,
} from "@/features/invitation/types";

type RsvpNoticeProps = {
  feedback: RsvpFeedback | null;
  confirmedAttendance: AttendanceValue | null;
};

const FEEDBACK_STYLES = {
  success: {
    container: "border-[#8eba79] bg-[#eff9e9] text-[#38632a]",
    icon: "bg-[#4f7f3d]",
    symbol: "✓",
  },
  error: {
    container: "border-[#d99982] bg-[#fff0eb] text-[#8f321f]",
    icon: "bg-[#b9472f]",
    symbol: "!",
  },
} as const;

const ATTENDANCE_LABELS: Record<AttendanceValue, string> = {
  hadir: "Akan hadir",
  "tidak-hadir": "Belum dapat hadir",
};

function FeedbackNotice({ feedback }: Readonly<{ feedback: RsvpFeedback }>) {
  const style = FEEDBACK_STYLES[feedback.type];
  const isError = feedback.type === "error";

  return (
    <output
      role={isError ? "alert" : undefined}
      aria-live={isError ? undefined : "polite"}
      className={`mb-6 flex min-h-20 items-start gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-bold ${style.container}`}
    >
      <span
        aria-hidden="true"
        className={`grid size-7 shrink-0 place-items-center rounded-full text-sm text-white ${style.icon}`}
      >
        {style.symbol}
      </span>
      <span className="leading-6">{feedback.message}</span>
    </output>
  );
}

function CurrentAttendanceNotice({
  attendance,
}: Readonly<{ attendance: AttendanceValue }>) {
  return (
    <div className="mb-6 flex min-h-20 items-start gap-3 rounded-2xl border border-[#d8bd94] border-l-[#c86420] bg-[#fff7e8] px-4 py-3.5 text-[#69452e]">
      <span
        aria-hidden="true"
        className="grid size-7 shrink-0 place-items-center rounded-full bg-[#f2d6ac] text-sm font-black text-[#99420f]"
      >
        i
      </span>
      <p className="text-sm leading-6 font-semibold">
        <span className="block text-[10px] font-black tracking-[0.14em] text-[#91603d] uppercase">
          Konfirmasi saat ini
        </span>
        <strong className="text-[#8e3e12]">
          {ATTENDANCE_LABELS[attendance]}
        </strong>
        {". Ubah pilihan di bawah jika keputusan Anda berubah."}
      </p>
    </div>
  );
}

export function RsvpNotice({
  feedback,
  confirmedAttendance,
}: Readonly<RsvpNoticeProps>) {
  if (feedback) return <FeedbackNotice feedback={feedback} />;
  if (!confirmedAttendance) return null;

  return <CurrentAttendanceNotice attendance={confirmedAttendance} />;
}
