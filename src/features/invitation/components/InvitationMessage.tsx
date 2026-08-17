import type { Guest } from "@/features/invitation/types";

export function InvitationMessage({ guest }: Readonly<{ guest: Guest }>) {
  return (
    <section
      id="invitation-message"
      data-reveal
      className="reveal-section relative overflow-hidden bg-[#f3dcb9] px-5 py-16 text-center sm:px-8 lg:py-24"
    >
      <div className="absolute inset-0 opacity-30 paper-pattern" />
      <span
        className="absolute top-8 left-[7%] animate-float-slow text-3xl opacity-35"
        aria-hidden="true"
      >
        🍂
      </span>
      <span
        className="absolute right-[7%] bottom-8 animate-float-reverse text-3xl opacity-40"
        aria-hidden="true"
      >
        🎃
      </span>
      <div className="relative mx-auto max-w-3xl rounded-4xl border border-[#d6b485] bg-[#fff9eb]/90 px-6 py-9 shadow-[0_18px_55px_rgba(81,42,16,0.12)] backdrop-blur-sm sm:px-12 sm:py-12">
        <p className="font-playful text-xl font-black text-[#5b3019] sm:text-2xl">
          Hi There! <span className="text-[#cf560f]">👋</span>
        </p>
        <p className="mt-7 text-[10px] font-black tracking-[0.22em] text-[#9e4613] uppercase">
          To:
        </p>
        <h2 className="font-playful mt-2 text-3xl font-black text-[#32190d] sm:text-4xl">
          {guest.displayName}
        </h2>
        <div className="mx-auto my-6 h-px w-24 bg-[#c17a42]/45" />
        <p className="mx-auto max-w-2xl text-sm leading-7 font-medium text-[#6f4a32] sm:text-base sm:leading-8">
          With great joy, we invite you to join us in celebrating Rezvan and
          Reivanya’s special day.
        </p>
      </div>
    </section>
  );
}
