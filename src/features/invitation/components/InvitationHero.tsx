import Image from "next/image";
import birthdayArtwork from "@/assets/rezvan-reivanya-halloween.jpg";

export function InvitationHero({
  onContinue,
}: Readonly<{ onContinue: () => void }>) {
  return (
    <section
      className="relative isolate min-h-[70svh] overflow-hidden bg-[#2a160c] lg:min-h-screen"
      aria-label="Happy Birthday Rezvan dan Reivanya"
    >
      <Image
        src={birthdayArtwork}
        alt="Happy Birthday Rezvan dan Reivanya"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center animate-hero-breathe"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#221107]/5 via-transparent to-[#221107]/85" />
      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-5 pb-8 text-center text-white sm:pb-12">
        <p className="rounded-full border border-white/30 bg-[#2a160c]/65 px-4 py-2 text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-sm sm:text-xs">
          Spooky Fun &amp; Bunny Love
        </p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-5 flex size-11 animate-bounce items-center justify-center rounded-full border border-white/50 bg-white/15 text-xl backdrop-blur-sm"
          aria-label="Lihat sapaan undangan"
        >
          ↓
        </button>
      </div>
    </section>
  );
}
