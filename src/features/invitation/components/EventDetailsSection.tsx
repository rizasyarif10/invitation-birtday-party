import { CountdownTimer } from "@/features/invitation/components/CountdownTimer";
import { EVENT_DETAILS } from "@/features/invitation/config/event";
import Image from "next/image";

export function EventDetailsSection() {
  return (
    <section
      id="details"
      className="relative bg-[#fff8e9] px-5 py-20 sm:px-8 lg:py-28"
    >
      <div
        className="pointer-events-none absolute top-12 left-[6%] animate-float-slow text-4xl opacity-40"
        aria-hidden="true"
      >
        🍂
      </div>
      <div
        className="pointer-events-none absolute right-[5%] bottom-10 animate-float-reverse text-4xl opacity-35"
        aria-hidden="true"
      >
        🎃
      </div>
      <div className="mx-auto max-w-6xl">
        <header data-reveal className="reveal-block mb-10 text-center lg:mb-14">
          <p className="text-xs font-black tracking-[0.3em] text-[#a33d0b] uppercase">
            Event Details
          </p>
          <h2 className="font-playful mt-3 text-4xl font-black text-[#31190e] sm:text-5xl lg:text-6xl">
            Save the Date
          </h2>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#dc6518]" />
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          <div
            data-reveal
            className="reveal-block rounded-4xl border border-[#e5c79d] bg-white/75 p-5 shadow-[0_18px_50px_rgba(92,49,20,0.09)] sm:p-8"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {EVENT_DETAILS.map((detail) => (
                <article
                  key={detail.label}
                  data-reveal-item
                  className="group rounded-2xl border border-[#ead3b0] bg-[#fffaf0] p-5 shadow-[0_2px_8px_rgba(92,49,20,0.05)] transition duration-300 ease-out hover:-translate-y-1 hover:border-[#d56a20] hover:shadow-[0_14px_30px_rgba(92,49,20,0.14)]"
                >
                  <div
                    className="mb-4 flex size-11 items-center justify-center rounded-xl bg-[#f6d39d] text-xl transition duration-300 ease-out group-hover:rotate-6 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    <Image
                      src={detail.icon}
                      alt={detail.label}
                      width={30}
                      height={30}
                      priority
                    />
                  </div>
                  <p className="text-[10px] font-black tracking-[0.18em] text-[#a24916] uppercase">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed font-bold text-[#432718]">
                    {detail.value}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div
            data-reveal
            className="reveal-block relative overflow-hidden rounded-4xl bg-[#30190e] p-6 text-[#fff4d8] shadow-[0_20px_60px_rgba(54,25,10,0.22)] sm:p-8"
          >
            <div className="absolute -top-10 -right-8 size-36 rounded-full bg-[#e8701d]/20 blur-2xl" />
            <div className="absolute -bottom-12 -left-10 size-40 rounded-full bg-[#f3b655]/10 blur-2xl" />
            <div className="relative">
              <div className="mb-7 flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  🌙
                </span>
                <div>
                  <p className="text-[10px] font-black tracking-[0.2em] text-[#f7a942] uppercase">
                    Countdown
                  </p>
                  <h3 className="font-playful mt-1 text-xl font-black sm:text-2xl">
                    Counting Down to the Spooky Fun!
                  </h3>
                </div>
              </div>
              <CountdownTimer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
