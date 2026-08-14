import Image from "next/image";
import birthdayArtwork from "@/assets/rezvan-reivanya-halloween.jpg";

export function InvitationNotFound() {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#2b160c] px-5 py-12 text-center">
      <Image
        src={birthdayArtwork}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full scale-105 object-cover object-center brightness-[0.42] blur-[5px]"
      />
      <div className="absolute inset-0 bg-[#1d0e07]/35" />
      <section className="cover-card-enter relative z-10 w-full max-w-lg rounded-4xl border border-white/40 bg-[#fff8e9]/92 p-7 shadow-[0_30px_90px_rgba(22,8,2,0.55)] backdrop-blur-xl sm:p-10">
        <div
          className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#f4d29e] text-3xl"
          aria-hidden="true"
        >
          ✉
        </div>
        <p className="mt-6 text-[10px] font-black tracking-[0.24em] text-[#a34512] uppercase">
          Rezvan &amp; Reivanya
        </p>
        <h1 className="font-playful mt-3 text-3xl font-black text-[#32190d] sm:text-4xl">
          Undangan Tidak Ditemukan
        </h1>
        <p className="mt-5 text-sm leading-7 font-medium text-[#75513a]">
          Mohon periksa kembali tautan undangan yang Anda terima atau hubungi
          pihak keluarga.
        </p>
      </section>
    </main>
  );
}
