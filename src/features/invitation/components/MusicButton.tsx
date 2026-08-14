type MusicButtonProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

export function MusicButton({
  isPlaying,
  onToggle,
}: Readonly<MusicButtonProps>) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed right-4 bottom-4 z-40 flex size-12 items-center justify-center rounded-full border-2 border-[#f0bc70] bg-[#30190d] text-xl text-[#fff3d4] shadow-[0_10px_30px_rgba(49,22,8,0.3)] transition hover:-translate-y-1 hover:bg-[#9f3f0e] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#d86117] sm:right-6 sm:bottom-6 sm:size-14"
      aria-label={
        isPlaying ? "Matikan musik ulang tahun" : "Putar musik ulang tahun"
      }
      aria-pressed={isPlaying}
    >
      <span
        className={isPlaying ? "animate-music-note" : ""}
        aria-hidden="true"
      >
        {isPlaying ? "♫" : "♪"}
      </span>
    </button>
  );
}
