import Image from "next/image";
import birthdayArtwork from "@/assets/rezvan-reivanya-halloween.jpg";
import type { Guest } from "@/features/invitation/types";

type InvitationCoverProps = {
  guest: Guest;
  isOpened: boolean;
  onOpen: () => void;
};

export function InvitationCover({
  guest,
  isOpened,
  onOpen,
}: Readonly<InvitationCoverProps>) {
  return (
    <section
      className={`fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#211006] transform-gpu transition-opacity duration-700 ease-out ${
        isOpened ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDelay: isOpened ? "450ms" : "0ms" }}
      aria-label="Pembuka undangan"
    >
      <Image
        src={birthdayArtwork}
        alt="Ilustrasi Rezvan dan Reivanya dengan dua kelinci dan dekorasi Halloween yang ceria"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center brightness-[0.5] saturate-[0.82] blur-[3px]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#1d0e07]/35" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(28,12,4,0.58)_100%)]" />
      <span
        className="animate-bat-one absolute left-[7%] top-[16%] z-20 text-3xl drop-shadow-lg"
        aria-hidden="true"
      >
        🦇
      </span>
      <span
        className="animate-bat-two absolute right-[8%] top-[21%] z-20 text-2xl drop-shadow-lg"
        aria-hidden="true"
      >
        🦇
      </span>

      <div className="relative z-30 w-full px-5 py-8">
        <div
          className={`cover-card-enter mx-auto w-full max-w-lg transform-gpu overflow-hidden rounded-2xl border border-white/45 bg-[#fff8e9]/95 p-6 text-center shadow-[0_30px_90px_rgba(22,8,2,0.5)] will-change-transform sm:p-9 ${isOpened ? "cover-card-opening" : ""}`}
        >
          <div
            className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl border border-[#d99659]/45 bg-[#f8d8a7] text-2xl shadow-sm"
            aria-hidden="true"
          >
            ✉
          </div>
          <p className="font-playful mb-3 text-base font-black text-[#5c321d] sm:text-lg">
            Assalamu’alaikum Wr. Wb.
          </p>
          <p className="mb-2 text-xs font-black tracking-[0.3em] text-[#a33d0b] uppercase sm:text-sm">
            You’re Invited!
          </p>
          <div className="mx-auto mb-5 max-w-sm rounded-2xl border border-[#d9ae79]/60 bg-white/50 px-4 py-3">
            <p className="text-[9px] font-black tracking-[0.2em] text-[#91603d] uppercase">
              Kepada Yth.
            </p>
            <p className="font-playful mt-1 text-lg font-black text-[#3d2113] sm:text-xl">
              {guest.displayName}
            </p>
          </div>
          <h1 className="font-playful text-3xl leading-tight font-black text-[#2b160c] sm:text-5xl">
            Rezvan &amp; Reivanya&apos;s
            <span className="block text-[#cf560f]">Birthday Party</span>
          </h1>
          <div
            className="mx-auto mt-4 flex items-center justify-center gap-3 text-[#b75518]"
            aria-hidden="true"
          >
            <span className="h-px w-10 bg-current opacity-40" />
            <span>🎃</span>
            <span className="h-px w-10 bg-current opacity-40" />
          </div>
          <p className="mt-3 text-sm font-semibold text-[#70452d]">
            Spooky Fun &amp; Bunny Love
          </p>
          <button
            type="button"
            onClick={onOpen}
            disabled={isOpened}
            className="group mt-5 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#2b170d] px-7 py-3 text-sm font-black tracking-wide text-[#fff6df] shadow-[0_7px_0_#ad4b16] transition hover:-translate-y-1 hover:bg-[#4a2917] hover:shadow-[0_10px_0_#ad4b16] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#d85d13] active:translate-y-1 active:shadow-[0_3px_0_#ad4b16]"
          >
            <span
              className="text-lg transition-transform group-hover:rotate-12"
              aria-hidden="true"
            >
              ✦
            </span>{" "}
            Buka Undangan
          </button>
        </div>
      </div>
    </section>
  );
}
