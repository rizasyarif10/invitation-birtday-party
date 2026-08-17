export function InvitationFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#2b160c] px-5 py-24 text-center text-[#fff1d1] sm:px-8 lg:py-32">
      <div className="absolute inset-0 opacity-20 night-pattern" />
      <span
        className="absolute -bottom-2.5 left-[3%] animate-sway text-7xl sm:text-9xl"
        aria-hidden="true"
      >
        🐰
      </span>
      <span
        className="absolute right-[3%] -bottom-3 animate-sway-reverse text-7xl sm:text-9xl"
        aria-hidden="true"
      >
        🐰
      </span>
      <span
        className="absolute top-10 left-[10%] animate-twinkle text-3xl text-[#f8a642]"
        aria-hidden="true"
      >
        ✦
      </span>
      <span
        className="absolute top-16 right-[11%] animate-twinkle-delayed text-2xl text-[#f8a642]"
        aria-hidden="true"
      >
        ★
      </span>
      <div data-reveal className="relative mx-auto max-w-2xl">
        <p
          data-reveal-item
          className="text-xs font-black tracking-[0.3em] text-[#f6a442] uppercase"
        >
          Spooky Fun &amp; Bunny Love
        </p>
        <h2
          data-reveal-item
          className="font-playful mt-4 text-4xl leading-tight font-black sm:text-6xl"
        >
          Thank You!
        </h2>
        <p
          data-reveal-item
          className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[#dfc09d] sm:text-base"
        >
          We look forward to seeing you all to celebrate Rezvan and Reivanya’s
          special day with us.
        </p>
        <p
          data-reveal-item
          className="font-playful mt-8 text-2xl font-black text-[#ffab42] sm:text-3xl"
        >
          See You at the Party!
        </p>
      </div>
    </footer>
  );
}
