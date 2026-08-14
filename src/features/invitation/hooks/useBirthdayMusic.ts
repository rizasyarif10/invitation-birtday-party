import { useEffect, useRef, useState } from "react";

const MELODY = [
  [392, 0.28], [392, 0.18], [440, 0.45], [392, 0.45], [523.25, 0.45], [493.88, 0.8],
  [392, 0.28], [392, 0.18], [440, 0.45], [392, 0.45], [587.33, 0.45], [523.25, 0.8],
  [392, 0.28], [392, 0.18], [783.99, 0.45], [659.25, 0.45], [523.25, 0.45], [493.88, 0.45], [440, 0.8],
  [698.46, 0.28], [698.46, 0.18], [659.25, 0.45], [523.25, 0.45], [587.33, 0.45], [523.25, 0.9],
] as const;

export function useBirthdayMusic() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const loopTimerRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const clearLoop = () => {
    if (loopTimerRef.current !== null) {
      window.clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }
  };

  const scheduleMelody = (context: AudioContext) => {
    let cursor = context.currentTime + 0.08;
    const master = context.createGain();
    master.gain.setValueAtTime(0.12, cursor);
    master.connect(context.destination);

    MELODY.forEach(([frequency, duration]) => {
      const oscillator = context.createOscillator();
      const noteGain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, cursor);
      noteGain.gain.setValueAtTime(0.0001, cursor);
      noteGain.gain.exponentialRampToValueAtTime(0.7, cursor + 0.03);
      noteGain.gain.exponentialRampToValueAtTime(
        0.0001,
        cursor + duration - 0.04,
      );
      oscillator.connect(noteGain);
      noteGain.connect(master);
      oscillator.start(cursor);
      oscillator.stop(cursor + duration);
      cursor += duration + 0.08;
    });

    const delay = Math.max(1_000, (cursor - context.currentTime + 1.8) * 1_000);
    loopTimerRef.current = window.setTimeout(
      () => scheduleMelody(context),
      delay,
    );
  };

  const play = async () => {
    clearLoop();
    const context = audioContextRef.current ?? new window.AudioContext();
    audioContextRef.current = context;
    if (context.state === "suspended") await context.resume();
    scheduleMelody(context);
    setIsPlaying(true);
  };

  const pause = async () => {
    clearLoop();
    const context = audioContextRef.current;
    if (context?.state === "running") await context.suspend();
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      clearLoop();
      void audioContextRef.current?.close();
    };
  }, []);

  return {
    isPlaying,
    play,
    toggle: () => (isPlaying ? void pause() : void play()),
  };
}
