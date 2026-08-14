import { EVENT } from "@/features/invitation/config/event";

export function LocationSection() {
  return (
    <section
      data-reveal
      className="reveal-section relative overflow-hidden bg-[#f3dcb9] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="absolute inset-0 opacity-30 paper-pattern" />
      <div className="relative mx-auto max-w-6xl">
        <header className="mb-10 text-center lg:mb-14">
          <p className="text-xs font-black tracking-[0.3em] text-[#a33d0b] uppercase">
            Lokasi Acara
          </p>
          <h2 className="font-playful mt-3 text-4xl font-black text-[#31190e] sm:text-5xl">
            Party Location
          </h2>
        </header>

        <div className="isolate grid overflow-hidden rounded-2xl border border-[#d6b485] bg-[#fff9eb] shadow-[0_24px_70px_rgba(81,42,16,0.16)] sm:rounded-3xl lg:grid-cols-[1.2fr_0.8fr]">
          <div className="h-72 overflow-hidden border-b border-[#d6b485] bg-[#e6ddcf] lg:h-105 lg:border-r lg:border-b-0">
            <iframe
              src={EVENT.googleMapsEmbedUrl}
              title={`Peta lokasi ${EVENT.venue}`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="block size-full border-0"
            />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <span className="mb-5 text-5xl" aria-hidden="true">
              🏚️
            </span>
            <p className="text-[10px] font-black tracking-[0.18em] text-[#a24c19] uppercase">
              Tempat Acara
            </p>
            <h3 className="font-playful mt-2 text-3xl font-black">
              {EVENT.venue}
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#73513b]">
              {EVENT.address}
            </p>
            <a
              href={EVENT.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#a94410] px-6 text-sm font-black text-white shadow-[0_7px_0_#693017] transition hover:-translate-y-1 hover:bg-[#bd5014] hover:shadow-[0_10px_0_#693017] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#d86117] active:translate-y-1 active:shadow-[0_3px_0_#693017]"
            >
              <span aria-hidden="true">↗</span> Buka Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
